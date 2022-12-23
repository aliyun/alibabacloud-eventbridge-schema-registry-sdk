import { Schema, AvroSchema, SchemaType, SchemaHelper, EventbridgeSchema } from './@types';
export declare const schemaTypeFromString: (schemaTypeString: string) => SchemaType;
export declare const helperTypeFromSchemaType: (schemaType?: SchemaType) => SchemaHelper;
export declare const schemaFromEventbridgeSchema: (eventbridgeSchema: EventbridgeSchema) => Schema | AvroSchema;
