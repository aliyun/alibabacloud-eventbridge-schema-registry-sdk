import { AvroSchema, RawAvroSchema, AvroOptions, EventbridgeSchema, SchemaHelper, ProtocolOptions, AvroEventbridgeSchema, EventbridgeSubject } from './@types';
import avro from 'avsc';
import { SchemaResponse } from './@types';
export default class AvroHelper implements SchemaHelper {
    private getRawAvroSchema;
    getAvroSchema(schema: EventbridgeSchema | RawAvroSchema, opts?: AvroOptions): avro.Type;
    validate(avroSchema: AvroSchema): void;
    getSubject(schema: AvroEventbridgeSchema, avroSchema: AvroSchema, separator: string): EventbridgeSubject;
    private isRawAvroSchema;
    toEventbridgeSchema(data: SchemaResponse): AvroEventbridgeSchema;
    updateOptionsFromSchemaReferences(referencedSchemas: AvroEventbridgeSchema[], options?: ProtocolOptions): ProtocolOptions;
}
