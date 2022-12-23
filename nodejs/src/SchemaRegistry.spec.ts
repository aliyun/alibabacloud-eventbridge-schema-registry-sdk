const uuidParse = require('uuid-parse');
import SchemaRegistry from './SchemaRegistry';
import { SchemaType } from './@types';

const groupId = 'avro-schema-group';
const schemaRegistryArgs = {
    accessKeyId: '<your ak>',
    accessKeySecret: '<your sk>',
    groupId
}
const testSchema = `
  {
    "type": "record",
    "name": "RandomTest",
    "namespace": "examples",
    "fields": [{ "type": "string", "name": "fullName" }]
  }
`
describe('SchemaRegistry', () => {
    let schemaRegistry: SchemaRegistry

    beforeEach(async () => {
        schemaRegistry = new SchemaRegistry(schemaRegistryArgs)

    });
    describe('when register', () => {
        let id: string = '';
        beforeEach(async () => {
            const data = await schemaRegistry.register({ type: SchemaType.AVRO, schema: testSchema });
            id = data.id;
        });

        it('should return schema id and converted to 16-bit binary', async () => {
            const parsedId = uuidParse.parse(id); // 
            expect(parsedId.length).toEqual(16);
        });
        it('should be able to encode/decode', async () => {
            const obj = { fullName: 'John Doe' }

            const buffer = await schemaRegistry.encode(id, obj)
            const resultObj = await schemaRegistry.decode(buffer)

            expect(resultObj).toEqual(obj)
        })
    })

    describe('get latestSchema from name', () => {
        let id: string = '';
        beforeEach(async () => {
            id = await schemaRegistry.getLatestSchemaId('examples.RandomTest');
        });
        it('should return schema id and converted to 16-bit binary', async () => {
            const parsedId = uuidParse.parse(id); // 
            expect(parsedId.length).toEqual(16);
        });
        it('should be able to encode/decode', async () => {
            const obj = { fullName: 'John Doe' }

            const buffer = await schemaRegistry.encode(id, obj)
            const resultObj = await schemaRegistry.decode(buffer)

            expect(resultObj).toEqual(obj)
        })
    })
})