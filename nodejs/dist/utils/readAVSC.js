"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAVSCAsync = exports.readAVSC = void 0;
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var errors_1 = require("../errors");
var readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
var ENCODING = 'utf-8';
function isValidSchema(rawSchema) {
    return ('name' in rawSchema &&
        'type' in rawSchema &&
        rawSchema.type === 'record' &&
        'fields' in rawSchema);
}
function validatedSchema(path, rawSchema) {
    if (!isValidSchema(rawSchema)) {
        throw new errors_1.EventbridgeSchemaRegistryInvalidSchemaError("".concat(path, " is not recognized as a valid AVSC file (expecting valid top-level name, type and fields attributes)"));
    }
    return rawSchema;
}
function readAVSC(path) {
    var rawSchema = JSON.parse(fs_1.default.readFileSync(path, ENCODING));
    return validatedSchema(path, rawSchema);
}
exports.readAVSC = readAVSC;
function readAVSCAsync(path) {
    return __awaiter(this, void 0, void 0, function () {
        var rawSchema, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, readFileAsync(path, ENCODING)];
                case 1:
                    rawSchema = _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, validatedSchema(path, rawSchema)];
            }
        });
    });
}
exports.readAVSCAsync = readAVSCAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFWU0MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVhZEFWU0MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW1CO0FBQ25CLDZCQUFnQztBQUdoQyxvQ0FBdUU7QUFFdkUsSUFBTSxhQUFhLEdBQUcsSUFBQSxnQkFBUyxFQUFDLFlBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM1QyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUE7QUFFeEIsU0FBUyxhQUFhLENBQUMsU0FBYztJQUNuQyxPQUFPLENBQ0wsTUFBTSxJQUFJLFNBQVM7UUFDbkIsTUFBTSxJQUFJLFNBQVM7UUFDbkIsU0FBUyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzNCLFFBQVEsSUFBSSxTQUFTLENBQ3RCLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsSUFBWSxFQUFFLFNBQWM7SUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksb0RBQTJDLENBQ25ELFVBQUcsSUFBSSx5R0FBc0csQ0FDOUcsQ0FBQTtLQUNGO0lBQ0QsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ25DLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUM3RCxPQUFPLGVBQWUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDekMsQ0FBQztBQUhELDRCQUdDO0FBRUQsU0FBc0IsYUFBYSxDQUFDLElBQVk7Ozs7OztvQkFDNUIsS0FBQSxDQUFBLEtBQUEsSUFBSSxDQUFBLENBQUMsS0FBSyxDQUFBO29CQUFDLHFCQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUE7O29CQUExRCxTQUFTLEdBQUcsY0FBVyxTQUFtQyxFQUFDO29CQUNqRSxzQkFBTyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFBOzs7O0NBQ3hDO0FBSEQsc0NBR0MifQ==