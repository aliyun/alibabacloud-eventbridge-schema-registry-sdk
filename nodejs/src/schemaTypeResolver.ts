
import {
    Schema,
    AvroSchema,
    SchemaType,
    SchemaHelper,
    EventbridgeSchema
} from './@types'

import { EventbridgeSchemaRegistryArgumentError } from './errors';
import AvroHelper from './AvroHelper';
const helperTypeFromSchemaTypeMap: Record<string, SchemaHelper> = {}
export const schemaTypeFromString = (schemaTypeString: string) => {
    switch (schemaTypeString) {
        case 'AVRO':
        case undefined:
            return SchemaType.AVRO
    }
}

export const helperTypeFromSchemaType = (
    schemaType: SchemaType = SchemaType.AVRO,
): SchemaHelper => {
    const schemaTypeStr = schemaType.toString()

    if (!helperTypeFromSchemaTypeMap[schemaTypeStr]) {
        let helper
        switch (schemaType) {
            case SchemaType.AVRO: {
                helper = new AvroHelper()
                break
            }
            default:
                throw new EventbridgeSchemaRegistryArgumentError('invalid schemaType')
        }
        helperTypeFromSchemaTypeMap[schemaTypeStr] = helper
    }
    return helperTypeFromSchemaTypeMap[schemaTypeStr]
}

export const schemaFromEventbridgeSchema = (
    eventbridgeSchema: EventbridgeSchema
): Schema | AvroSchema => {
    try {
        let schema: Schema
        switch (eventbridgeSchema.type) {
            case SchemaType.AVRO: {

                schema = (helperTypeFromSchemaType(eventbridgeSchema.type) as AvroHelper).getAvroSchema(
                    eventbridgeSchema,
                )
                break
            }

            default:
                throw new EventbridgeSchemaRegistryArgumentError('invalid schemaType')
        }

        return schema
    } catch (err) {
        throw new EventbridgeSchemaRegistryArgumentError(err.message)
    }
}
