declare class EventbridgeSchemaRegistryError extends Error {
    constructor(error: any);
}
declare class EventbridgeApiResponseError extends EventbridgeSchemaRegistryError {
}
declare class EventbridgeSchemaRegistryArgumentError extends EventbridgeSchemaRegistryError {
}
declare class EventbridgeSchemaRegistryValidationError extends EventbridgeSchemaRegistryError {
    paths: string[][];
    constructor(error: any, paths: string[][]);
}
export { EventbridgeSchemaRegistryArgumentError, EventbridgeSchemaRegistryValidationError, EventbridgeApiResponseError };
