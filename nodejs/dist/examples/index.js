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
var path_1 = __importDefault(require("path"));
var index_1 = require("../index");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var schemaFromAVDL, schemaFromAVSC, schemaFromJSON, accessKeyId, accessKeySecret, groupId, registry, id, payload, encodedPayload, decodedPayload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.avdlToAVSCAsync)(path_1.default.join(__dirname, '../../fixtures/avdl/schema.avdl'))];
            case 1:
                schemaFromAVDL = _a.sent();
                console.log(schemaFromAVDL);
                return [4 /*yield*/, (0, index_1.readAVSCAsync)(path_1.default.join(__dirname, '../../fixtures/avsc/schema.avsc'))];
            case 2:
                schemaFromAVSC = _a.sent();
                console.log(schemaFromAVSC);
                schemaFromJSON = "\n    {\n      \"type\": \"record\",\n      \"name\": \"RandomTest\",\n      \"namespace\": \"examples\",\n      \"fields\": [{ \"type\": \"string\", \"name\": \"fullName\" },{ \"type\": \"string\", \"name\": \"school\" }]\n    }\n  ";
                accessKeyId = '';
                accessKeySecret = '';
                groupId = 'customergroup';
                registry = new index_1.SchemaRegistry({
                    accessKeyId: accessKeyId,
                    accessKeySecret: accessKeySecret,
                    groupId: groupId
                });
                return [4 /*yield*/, registry.register({ type: index_1.SchemaType.AVRO, schema: schemaFromJSON })];
            case 3:
                id = (_a.sent()).id;
                payload = { fullName: 'John Doe', school: 'mid' };
                return [4 /*yield*/, registry.encode(id, payload)
                    // Decode the payload
                ];
            case 4:
                encodedPayload = _a.sent();
                return [4 /*yield*/, registry.decode(encodedPayload)];
            case 5:
                decodedPayload = _a.sent();
                console.log(decodedPayload, 'decode payload');
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXhhbXBsZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsa0NBQXNGO0FBRXRGLENBQUM7Ozs7b0JBSXdCLHFCQUFNLElBQUEsdUJBQWUsRUFBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDLEVBQUE7O2dCQUEvRixjQUFjLEdBQUcsU0FBOEU7Z0JBQ3JHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBSUwscUJBQU0sSUFBQSxxQkFBYSxFQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlDQUFpQyxDQUFDLENBQUMsRUFBQTs7Z0JBQTdGLGNBQWMsR0FBRyxTQUE0RTtnQkFDbkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFHdEIsY0FBYyxHQUFHLDJPQU90QixDQUFBO2dCQUNLLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBRXJCLE9BQU8sR0FBRyxlQUFlLENBQUM7Z0JBQzFCLFFBQVEsR0FBRyxJQUFJLHNCQUFjLENBQUM7b0JBQ2xDLFdBQVcsYUFBQTtvQkFDWCxlQUFlLGlCQUFBO29CQUNmLE9BQU8sU0FBQTtpQkFDUixDQUFDLENBQUM7Z0JBR1kscUJBQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBVSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQTs7Z0JBQWpGLEVBQUUsR0FBSyxDQUFBLFNBQTBFLENBQUEsR0FBL0U7Z0JBR0osT0FBTyxHQUFHLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUE7Z0JBQ2hDLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztvQkFDekQscUJBQXFCO2tCQURvQzs7Z0JBQW5ELGNBQWMsR0FBRyxTQUFrQztnQkFFbEMscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQTs7Z0JBQXRELGNBQWMsR0FBRyxTQUFxQztnQkFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs7OztLQUUvQyxDQUFDLEVBQUUsQ0FBQSJ9