declare class EventbridgeSchemaRegistryError extends Error {
    constructor(error: any);
}
declare class EventbridgeSchemaRegistryInvalidSchemaError extends EventbridgeSchemaRegistryError {
}
declare class EventbridgeApiResponseError extends EventbridgeSchemaRegistryError {
}
declare class EventbridgeSchemaRegistryArgumentError extends EventbridgeSchemaRegistryError {
}
declare class EventbridgeSchemaRegistryValidationError extends EventbridgeSchemaRegistryError {
    paths: string[][];
    constructor(error: any, paths: string[][]);
}
export { EventbridgeSchemaRegistryError, EventbridgeSchemaRegistryArgumentError, EventbridgeSchemaRegistryValidationError, EventbridgeApiResponseError, EventbridgeSchemaRegistryInvalidSchemaError };
