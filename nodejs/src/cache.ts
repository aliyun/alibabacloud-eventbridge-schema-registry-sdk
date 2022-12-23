import { AvroSchema, Schema, SchemaType } from './@types'

type CacheEntry = { type: SchemaType; schema: Schema | AvroSchema }

export default class Cache {
  registryIdBySubject: { [key: string]: number }
  schemasByRegistryId: { [key: string]: CacheEntry }

  constructor() {
    this.registryIdBySubject = {}
    this.schemasByRegistryId = {}
  }

  getLatestRegistryId = (subject: string): number | undefined => this.registryIdBySubject[subject]

  setLatestRegistryId = (subject: string, id: number): number => {
    this.registryIdBySubject[subject] = id

    return this.registryIdBySubject[subject]
  }

  getSchema = (uuid: string): CacheEntry | undefined => this.schemasByRegistryId[uuid]

  setSchema = (uuid: string, type: SchemaType, schema: Schema): CacheEntry => {
    this.schemasByRegistryId[uuid] = { type, schema }

    return this.schemasByRegistryId[uuid]
  }

  clear = (): void => {
    this.registryIdBySubject = {}
    this.schemasByRegistryId = {}
  }
}
