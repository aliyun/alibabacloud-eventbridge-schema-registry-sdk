import path from 'path';
import { SchemaRegistry, SchemaType, readAVSCAsync, avdlToAVSCAsync } from '../index';

(async () => {


  // From an avdl file
  const schemaFromAVDL = await avdlToAVSCAsync(path.join(__dirname, '../../fixtures/avdl/schema.avdl'));
  console.log(schemaFromAVDL);


  // From an avdl file
  const schemaFromAVSC = await readAVSCAsync(path.join(__dirname, '../../fixtures/avsc/schema.avsc'));
  console.log(schemaFromAVSC);


  const schemaFromJSON = `
    {
      "type": "record",
      "name": "RandomTest",
      "namespace": "examples",
      "fields": [{ "type": "string", "name": "fullName" },{ "type": "string", "name": "school" }]
    }
  `
  const accessKeyId = '';
  const accessKeySecret = '';

  const groupId = 'customergroup';
  const registry = new SchemaRegistry({
    accessKeyId,
    accessKeySecret,
    groupId
  });

  // const id = await registry.getLatestSchemaId('examples.RandomTest');
  const { id } = await registry.register({ type: SchemaType.AVRO, schema: schemaFromJSON });

  // // Encode using the uploaded schema
  const payload = { fullName: 'John Doe', school: 'mid' }
  const encodedPayload = await registry.encode(id, payload)
  // Decode the payload
  const decodedPayload = await registry.decode(encodedPayload);
  console.log(decodedPayload, 'decode payload');

})()

