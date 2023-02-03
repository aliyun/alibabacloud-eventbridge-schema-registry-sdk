"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.CONFLUENT_MAGIC_BYTE = exports.ALICLOUD_MAGIC_BYTE = void 0;
var uuidParse = require('uuid-parse');
// const DEFAULT_OFFSET = 0
exports.ALICLOUD_MAGIC_BYTE = Buffer.alloc(1).fill(0xFF);
exports.CONFLUENT_MAGIC_BYTE = Buffer.alloc(1).fill(0x00);
var encode = function (uuid, payload) {
    // const uuidBuffer = Buffer.alloc(16)
    var bytes = uuidParse.parse(uuid); // 
    var buf = Buffer.from(bytes);
    // uuidBuffer.write(bytes, DEFAULT_OFFSET);
    return Buffer.concat([exports.ALICLOUD_MAGIC_BYTE, buf, payload]);
};
exports.encode = encode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lyZUVuY29kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3dpcmVFbmNvZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QywyQkFBMkI7QUFDZCxRQUFBLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELFFBQUEsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsSUFBTSxNQUFNLEdBQUcsVUFBQyxJQUFZLEVBQUUsT0FBZTtJQUNsRCxzQ0FBc0M7SUFDdEMsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7SUFDeEMsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQiwyQ0FBMkM7SUFDM0MsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsMkJBQW1CLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFBO0FBTlksUUFBQSxNQUFNLFVBTWxCIn0=