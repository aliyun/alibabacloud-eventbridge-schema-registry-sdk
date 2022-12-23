"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.MAGIC_BYTE = void 0;
var uuidParse = require('uuid-parse');
// const DEFAULT_OFFSET = 0
exports.MAGIC_BYTE = Buffer.alloc(1);
var encode = function (uuid, payload) {
    // const uuidBuffer = Buffer.alloc(16)
    var bytes = uuidParse.parse(uuid); // 
    var buf = Buffer.from(bytes);
    // uuidBuffer.write(bytes, DEFAULT_OFFSET);
    return Buffer.concat([exports.MAGIC_BYTE, buf, payload]);
};
exports.encode = encode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lyZUVuY29kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL3dpcmVFbmNvZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QywyQkFBMkI7QUFFZCxRQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRWxDLElBQU0sTUFBTSxHQUFHLFVBQUMsSUFBWSxFQUFFLE9BQWU7SUFDbEQsc0NBQXNDO0lBRXRDLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQ3hDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsMkNBQTJDO0lBQzNDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7QUFDbEQsQ0FBQyxDQUFBO0FBUFksUUFBQSxNQUFNLFVBT2xCIn0=