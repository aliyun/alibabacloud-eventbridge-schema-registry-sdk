"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidParse = require('uuid-parse');
const SchemaRegistry_1 = __importDefault(require("./SchemaRegistry"));
const _types_1 = require("./@types");
const groupId = 'avro-schema-group';
const schemaRegistryArgs = {
    accessKeyId: '<your ak>',
    accessKeySecret: '<your sk>',
    groupId
};
const testSchema = `
  {
    "type": "record",
    "name": "RandomTest",
    "namespace": "examples",
    "fields": [{ "type": "string", "name": "fullName" }]
  }
`;
describe('SchemaRegistry', () => {
    let schemaRegistry;
    beforeEach(async () => {
        schemaRegistry = new SchemaRegistry_1.default(schemaRegistryArgs);
    });
    describe('when register', () => {
        let id = '';
        beforeEach(async () => {
            const data = await schemaRegistry.register({ type: _types_1.SchemaType.AVRO, schema: testSchema });
            id = data.id;
        });
        it('should return schema id and converted to 16-bit binary', async () => {
            const parsedId = uuidParse.parse(id); // 
            expect(parsedId.length).toEqual(16);
        });
        it('should be able to encode/decode', async () => {
            const obj = { fullName: 'John Doe' };
            const buffer = await schemaRegistry.encode(id, obj);
            const resultObj = await schemaRegistry.decode(buffer);
            expect(resultObj).toEqual(obj);
        });
    });
    describe('get latestSchema from name', () => {
        let id = '';
        beforeEach(async () => {
            id = await schemaRegistry.getLatestSchemaId('examples.RandomTest');
        });
        it('should return schema id and converted to 16-bit binary', async () => {
            const parsedId = uuidParse.parse(id); // 
            expect(parsedId.length).toEqual(16);
        });
        it('should be able to encode/decode', async () => {
            const obj = { fullName: 'John Doe' };
            const buffer = await schemaRegistry.encode(id, obj);
            const resultObj = await schemaRegistry.decode(buffer);
            expect(resultObj).toEqual(obj);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hUmVnaXN0cnkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TY2hlbWFSZWdpc3RyeS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLHNFQUE4QztBQUM5QyxxQ0FBc0M7QUFFdEMsTUFBTSxPQUFPLEdBQUcsbUJBQW1CLENBQUM7QUFDcEMsTUFBTSxrQkFBa0IsR0FBRztJQUN2QixXQUFXLEVBQUUsV0FBVztJQUN4QixlQUFlLEVBQUUsV0FBVztJQUM1QixPQUFPO0NBQ1YsQ0FBQTtBQUNELE1BQU0sVUFBVSxHQUFHOzs7Ozs7O0NBT2xCLENBQUE7QUFDRCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO0lBQzVCLElBQUksY0FBOEIsQ0FBQTtJQUVsQyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDbEIsY0FBYyxHQUFHLElBQUksd0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBRTNELENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDM0IsSUFBSSxFQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNsQixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDMUYsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDcEUsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUc7WUFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDN0MsTUFBTSxHQUFHLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUE7WUFFcEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNuRCxNQUFNLFNBQVMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtRQUN4QyxJQUFJLEVBQUUsR0FBVyxFQUFFLENBQUM7UUFDcEIsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2xCLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3BFLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHO1lBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzdDLE1BQU0sR0FBRyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFBO1lBRXBDLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRXJELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIn0=