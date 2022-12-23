import { SchemaRegistry } from '../index';
import { SchemaType } from '../@types';
(async () => {
  // const uuid = 'cccc8b3a-4ad4-4e3f-ab0a-520bbf7bc3a3';
  const groupId = 'avro-schema-group';

  const schema = `
  {
    "type": "record",
    "name": "RandomTest",
    "namespace": "examples",
    "fields": [{ "type": "string", "name": "fullName" },{ "type": "string", "name": "school" }]
  }
`
  const registry = new SchemaRegistry({
    accessKeyId: '',
    accessKeySecret: '',
    groupId
  });

  // const id = await registry.getLatestSchemaId('examples.RandomTest');
  const { id } = await registry.register({ type: SchemaType.AVRO, schema });

  // // Encode using the uploaded schema
  const payload = { fullName: 'John Doe', school: 'mid' }
  const encodedPayload = await registry.encode(id, payload)
  // Decode the payload
  const decodedPayload = await registry.decode(encodedPayload);
  console.log(decodedPayload, 'decode payload');

})()

