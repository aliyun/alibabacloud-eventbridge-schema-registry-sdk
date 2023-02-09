"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidParse = require('uuid-parse');
exports.default = (buffer) => ({
    magicByte: buffer.slice(0, 1),
    uuid: uuidParse.unparse(buffer.slice(1, 17)),
    payload: buffer.slice(17, buffer.length),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lyZURlY29kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3dpcmVEZWNvZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLGtCQUFlLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDekMsQ0FBQyxDQUFBIn0=