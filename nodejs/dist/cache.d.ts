import { AvroSchema, Schema, SchemaType } from './@types';
type CacheEntry = {
    type: SchemaType;
    schema: Schema | AvroSchema;
};
export default class Cache {
    registryIdBySubject: {
        [key: string]: number;
    };
    schemasByRegistryId: {
        [key: string]: CacheEntry;
    };
    constructor();
    getLatestRegistryId: (subject: string) => number | undefined;
    setLatestRegistryId: (subject: string, id: number) => number;
    getSchema: (uuid: string) => CacheEntry | undefined;
    setSchema: (uuid: string, type: SchemaType, schema: Schema) => CacheEntry;
    clear: () => void;
}
export {};
