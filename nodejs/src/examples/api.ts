import API from '../api/index.pop';
import { SchemaType } from '../index';
const accessKeySecret = '';
const accessKeyId = '';
const api = new API({ accessKeySecret, accessKeyId });
(async () => {
    await api.createSchemaGroup({
        groupId: 'eventbridge',
        schemaFormat: SchemaType.AVRO
    });

    // const result = await api.getSchemaGroup('eventbridge');
    // console.log(result,'result');
})()
