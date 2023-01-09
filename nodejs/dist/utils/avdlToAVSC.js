"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.avdlToAVSCAsync = exports.avdlToAVSC = void 0;
var fs = __importStar(require("fs"));
var avsc_1 = require("avsc");
var errors_1 = require("../errors");
var cache;
var merge = Object.assign;
var isObject = function (obj) { return obj && typeof obj === 'object'; };
var isIterable = function (obj) {
    return isObject(obj) && typeof obj.map !== 'undefined';
};
var isFieldArray = function (field) {
    return isObject(field) && isObject(field.type) && field.type.type === 'array';
};
var combine = function (rootType, types) {
    if (!rootType.fields) {
        return rootType;
    }
    var find = function (name) {
        if (typeof name === 'string') {
            name = name.toLowerCase();
        }
        var typeToCombine = types.find(function (t) {
            var names = [];
            if (t.namespace) {
                names.push("".concat(t.namespace, "."));
            }
            names.push(t.name.toLowerCase());
            return names.join('') === name;
        });
        if (!typeToCombine || cache[typeToCombine.name]) {
            return null;
        }
        cache[typeToCombine.name] = 1;
        return combine(typeToCombine, types);
    };
    var combinedFields = rootType.fields.map(function (field) {
        if (isFieldArray(field)) {
            var typeToCombine_1 = find(field.type.items);
            return typeToCombine_1
                ? merge(field, { type: merge(field.type, { items: typeToCombine_1 }) })
                : field;
        }
        else if (isIterable(field.type)) {
            var type = field.type.map(function (unionType) {
                if (isObject(unionType)) {
                    var typeToCombine_2 = find(unionType.items);
                    return typeToCombine_2 ? merge(unionType, { items: typeToCombine_2 }) : unionType;
                }
                else {
                    return find(unionType) || unionType;
                }
            });
            return merge(field, { type: type });
        }
        var typeToCombine = find(field.type);
        return typeToCombine ? merge(field, { type: typeToCombine }) : field;
    });
    return merge(rootType, { fields: combinedFields });
};
function avdlToAVSC(path) {
    cache = {};
    var protocol = (0, avsc_1.readProtocol)(fs.readFileSync(path, 'utf8'));
    return merge({ namespace: protocol.namespace }, combine(protocol.types.pop(), protocol.types));
}
exports.avdlToAVSC = avdlToAVSC;
function avdlToAVSCAsync(path) {
    return __awaiter(this, void 0, void 0, function () {
        var protocol;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cache = {};
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            (0, avsc_1.assembleProtocol)(path, function (err, schema) {
                                if (err) {
                                    reject(new errors_1.EventbridgeSchemaRegistryError("".concat(err.message, ". Caused by: ").concat(err.path)));
                                }
                                else {
                                    resolve(schema);
                                }
                            });
                        })];
                case 1:
                    protocol = _a.sent();
                    return [2 /*return*/, merge({ namespace: protocol.namespace }, combine(protocol.types.pop(), protocol.types))];
            }
        });
    });
}
exports.avdlToAVSCAsync = avdlToAVSCAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZkbFRvQVZTQy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdmRsVG9BVlNDLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXdCO0FBQ3hCLDZCQUFxRDtBQUVyRCxvQ0FBMEQ7QUFrQjFELElBQUksS0FBVSxDQUFBO0FBQ2QsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUMzQixJQUFNLFFBQVEsR0FBRyxVQUFDLEdBQVksSUFBaUIsT0FBQSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUE5QixDQUE4QixDQUFBO0FBQzdFLElBQU0sVUFBVSxHQUFHLFVBQUMsR0FBWTtJQUM5QixPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEtBQUssV0FBVztBQUEvQyxDQUErQyxDQUFBO0FBQ2pELElBQU0sWUFBWSxHQUFHLFVBQUMsS0FBYztJQUNsQyxPQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU87QUFBdEUsQ0FBc0UsQ0FBQTtBQUV4RSxJQUFNLE9BQU8sR0FBRyxVQUFDLFFBQWEsRUFBRSxLQUFVO0lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ3BCLE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBRUQsSUFBTSxJQUFJLEdBQUcsVUFBQyxJQUFTO1FBQ3JCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDMUI7UUFFRCxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMs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