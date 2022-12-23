import {
  AvroSchema,
  RawAvroSchema,
  AvroOptions,
  EventbridgeSchema,
  SchemaHelper,
  ProtocolOptions,
  AvroEventbridgeSchema,
  EventbridgeSubject,
} from './@types'
import { EventbridgeSchemaRegistryArgumentError } from './errors'
import avro, { ForSchemaOptions, Schema, Type } from 'avsc'
import { SchemaResponse, SchemaType } from './@types'

type TypeHook = (schema: Schema, opts: ForSchemaOptions) => Type
export default class AvroHelper implements SchemaHelper {
  private getRawAvroSchema(schema: EventbridgeSchema): RawAvroSchema {
    return (typeof schema.schema === 'string'
      ? JSON.parse(schema.schema)
      : schema.schema) as RawAvroSchema
  }

  public getAvroSchema(schema: EventbridgeSchema | RawAvroSchema, opts?: AvroOptions) {
    const rawSchema: RawAvroSchema = this.isRawAvroSchema(schema)
      ? schema
      : this.getRawAvroSchema(schema)
    // @ts-ignore TODO: Fix typings for Schema...
    const addReferencedSchemas = (userHook?: TypeHook): TypeHook => (
      schema: avro.Schema,
      opts: ForSchemaOptions,
    ) => {
      const avroOpts = opts as AvroOptions
      avroOpts?.referencedSchemas?.forEach(subSchema => {
        const rawSubSchema = this.getRawAvroSchema(subSchema)
        avroOpts.typeHook = userHook
        avro.Type.forSchema(rawSubSchema, avroOpts)
      })
      if (userHook) {
        return userHook(schema, opts)
      }
    }
    const avroSchema = avro.Type.forSchema(rawSchema, {
      ...opts,
      typeHook: addReferencedSchemas(opts?.typeHook),
    })
    return avroSchema
  }

  public validate(avroSchema: AvroSchema): void {
    if (!avroSchema.name) {
      throw new EventbridgeSchemaRegistryArgumentError(`Invalid name: ${avroSchema.name}`)
    }
  }
  public getSubject(
    schema: AvroEventbridgeSchema,
    // @ts-ignore
    avroSchema: AvroSchema,
    separator: string,
  ): EventbridgeSubject {
    const rawSchema: RawAvroSchema = this.getRawAvroSchema(schema)

    if (!rawSchema.namespace) {
      throw new EventbridgeSchemaRegistryArgumentError(`Invalid namespace: ${rawSchema.namespace}`)
    }

    const subject: EventbridgeSubject = {
      name: [rawSchema.namespace, rawSchema.name].join(separator),
    }
    return subject
  }

  private isRawAvroSchema(schema: EventbridgeSchema | RawAvroSchema): schema is RawAvroSchema {
    const asRawAvroSchema = schema as RawAvroSchema
    return asRawAvroSchema.name != null && asRawAvroSchema.type != null
  }

  public toEventbridgeSchema(data: SchemaResponse): AvroEventbridgeSchema {
    return { type: SchemaType.AVRO, schema: data.Content.replace(/\&quot\;/g, '\"'), references: data.References }
  }

  updateOptionsFromSchemaReferences(
    referencedSchemas: AvroEventbridgeSchema[],
    options: ProtocolOptions = {},
  ): ProtocolOptions {
    return { ...options, [SchemaType.AVRO]: { ...options[SchemaType.AVRO], referencedSchemas } }
  }
}
