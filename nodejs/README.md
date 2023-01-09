### 第一种用法
注册一个标准schema，并且返回id，然后根据id和schema规范进行编解码
```js
import SchemaRegistry from '@alicloud/schema-registry-sdk';

const groupId = 'avro-schema-group';
// From an avsc file
// const schemaFromAVSC = await readAVSCAsync(path.join(__dirname, '.path/to/schema.avsc'));

// From an avdl file
// const schemaFromAVDL = await avdlToAVSCAsync('path/to/protocol.avdl');

const schema = `
  {
    "type": "record",
    "name": "RandomTest",
    "namespace": "examples",
    "fields": [{ "type": "string", "name": "fullName" },{ "type": "string", "name": "school" }]
  }
`
const registry = new SchemaRegistry({
    accessKeyId: '<your ak>',
    accessKeySecret: '<your sk>',
    groupId
});

const { id } = await registry.register({ type: SchemaType.AVRO, schema });

// // Encode using the uploaded schema
const payload = { fullName: 'John Doe', school: 'mid' }
const encodedPayload = await registry.encode(id, payload)
// Decode the payload
const decodedPayload = await registry.decode(encodedPayload);

```

### 第二种用法
根据schemaname 获取id，然后根据id和schema规范进行编解码

```js
import SchemaRegistry from '@alicloud/schema-registry-sdk';

const groupId = 'avro-schema-group';

const registry = new SchemaRegistry({
    accessKeyId: '<your ak>',
    accessKeySecret: '<your sk>',
    groupId
});

const id = await registry.getLatestSchemaId('examples.RandomTest');

// // Encode using the uploaded schema
const payload = { fullName: 'John Doe', school: 'mid' }
const encodedPayload = await registry.encode(id, payload)
// Decode the payload
const decodedPayload = await registry.decode(encodedPayload);

```


### 其他注册schema并返回id的方法

```js
import SchemaRegistry from '@alicloud/schema-registry-sdk';

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
    accessKeyId: '<your ak>',
    accessKeySecret: '<your sk>',
    groupId
});

const {id} = await registry.getRegistryIdBySchema('examples.RandomTest',schema);

// // Encode using the uploaded schema
const payload = { fullName: 'John Doe', school: 'mid' }
const encodedPayload = await registry.encode(id, payload)
// Decode the payload
const decodedPayload = await registry.decode(encodedPayload);

```