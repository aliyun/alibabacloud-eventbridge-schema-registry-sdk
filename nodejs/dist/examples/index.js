"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const index_1 = require("../index");
(async () => {
    // From an avdl file
    const schemaFromAVDL = await (0, index_1.avdlToAVSCAsync)(path_1.default.join(__dirname, '../../fixtures/avdl/schema.avdl'));
    console.log(schemaFromAVDL);
    // From an avdl file
    const schemaFromAVSC = await (0, index_1.readAVSCAsync)(path_1.default.join(__dirname, '../../fixtures/avsc/schema.avsc'));
    console.log(schemaFromAVSC);
    const schemaFromJSON = `
    {
      "type": "record",
      "name": "RandomTest",
      "namespace": "examples",
      "fields": [{ "type": "string", "name": "fullName" },{ "type": "string", "name": "school" }]
    }
  `;
    const accessKeyId = '';
    const accessKeySecret = '';
    const groupId = 'test-group';
    const registry = new index_1.SchemaRegistry({
        accessKeyId,
        accessKeySecret,
        groupId
    });
    // const id = await registry.getLatestSchemaId('examples.RandomTest');
    const { id } = await registry.register({ type: index_1.SchemaType.AVRO, schema: schemaFromJSON });
    // // Encode using the uploaded schema
    const payload = { fullName: 'John Doe', school: 'mid' };
    const encodedPayload = await registry.encode(id, payload);
    // Decode the payload
    const decodedPayload = await registry.decode(encodedPayload);
    console.log(decodedPayload, 'decode payload');
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXhhbXBsZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsb0NBQXNGO0FBRXRGLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFHVixvQkFBb0I7SUFDcEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFBLHVCQUFlLEVBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFHNUIsb0JBQW9CO0lBQ3BCLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBQSxxQkFBYSxFQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztJQUNwRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRzVCLE1BQU0sY0FBYyxHQUFHOzs7Ozs7O0dBT3RCLENBQUE7SUFDRCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBRTNCLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQztJQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLHNCQUFjLENBQUM7UUFDbEMsV0FBVztRQUNYLGVBQWU7UUFDZixPQUFPO0tBQ1IsQ0FBQyxDQUFDO0lBRUgsc0VBQXNFO0lBQ3RFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFFMUYsc0NBQXNDO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUE7SUFDdkQsTUFBTSxjQUFjLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN6RCxxQkFBcUI7SUFDckIsTUFBTSxjQUFjLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQSJ9