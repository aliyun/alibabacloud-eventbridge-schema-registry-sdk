"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidParse = require('uuid-parse');
exports.default = (function (buffer) { return ({
    magicByte: buffer.slice(0, 1),
    uuid: uuidParse.unparse(buffer.slice(1, 17)),
    payload: buffer.slice(17, buffer.length),
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lyZURlY29kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3dpcmVEZWNvZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLG1CQUFlLFVBQUMsTUFBYyxJQUFLLE9BQUEsQ0FBQztJQUNsQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO0NBQ3pDLENBQUMsRUFKaUMsQ0FJakMsRUFBQSJ9