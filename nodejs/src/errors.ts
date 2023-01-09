class EventbridgeSchemaRegistryError extends Error {
  constructor(error: any) {
    super(error.message || error)
    this.name = this.constructor.name
  }
}

class EventbridgeSchemaRegistryInvalidSchemaError extends EventbridgeSchemaRegistryError { }
class EventbridgeApiResponseError extends EventbridgeSchemaRegistryError { }
class EventbridgeSchemaRegistryArgumentError extends EventbridgeSchemaRegistryError { }
class EventbridgeSchemaRegistryValidationError extends EventbridgeSchemaRegistryError {
  public paths: string[][]

  constructor(error: any, paths: string[][]) {
    super(error)
    this.paths = paths
  }
}

export {
  EventbridgeSchemaRegistryError,
  EventbridgeSchemaRegistryArgumentError,
  EventbridgeSchemaRegistryValidationError,
  EventbridgeApiResponseError,
  EventbridgeSchemaRegistryInvalidSchemaError
}