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
Object.defineProperty(exports, "__esModule", { value: true });
exports.avdlToAVSCAsync = exports.avdlToAVSC = void 0;
const fs = __importStar(require("fs"));
const avsc_1 = require("avsc");
const errors_1 = require("../errors");
let cache;
const merge = Object.assign;
const isObject = (obj) => obj && typeof obj === 'object';
const isIterable = (obj) => isObject(obj) && typeof obj.map !== 'undefined';
const isFieldArray = (field) => isObject(field) && isObject(field.type) && field.type.type === 'array';
const combine = (rootType, types) => {
    if (!rootType.fields) {
        return rootType;
    }
    const find = (name) => {
        if (typeof name === 'string') {
            name = name.toLowerCase();
        }
        const typeToCombine = types.find((t) => {
            const names = [];
            if (t.namespace) {
                names.push(`${t.namespace}.`);
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
    const combinedFields = rootType.fields.map((field) => {
        if (isFieldArray(field)) {
            const typeToCombine = find(field.type.items);
            return typeToCombine
                ? merge(field, { type: merge(field.type, { items: typeToCombine }) })
                : field;
        }
        else if (isIterable(field.type)) {
            const type = field.type.map((unionType) => {
                if (isObject(unionType)) {
                    const typeToCombine = find(unionType.items);
                    return typeToCombine ? merge(unionType, { items: typeToCombine }) : unionType;
                }
                else {
                    return find(unionType) || unionType;
                }
            });
            return merge(field, { type });
        }
        const typeToCombine = find(field.type);
        return typeToCombine ? merge(field, { type: typeToCombine }) : field;
    });
    return merge(rootType, { fields: combinedFields });
};
function avdlToAVSC(path) {
    cache = {};
    const protocol = (0, avsc_1.readProtocol)(fs.readFileSync(path, 'utf8'));
    return merge({ namespace: protocol.namespace }, combine(protocol.types.pop(), protocol.types));
}
exports.avdlToAVSC = avdlToAVSC;
async function avdlToAVSCAsync(path) {
    cache = {};
    const protocol = await new Promise((resolve, reject) => {
        (0, avsc_1.assembleProtocol)(path, (err, schema) => {
            if (err) {
                reject(new errors_1.EventbridgeSchemaRegistryError(`${err.message}. Caused by: ${err.path}`));
            }
            else {
                resolve(schema);
            }
        });
    });
    return merge({ namespace: protocol.namespace }, combine(protocol.types.pop(), protocol.types));
}
exports.avdlToAVSCAsync = avdlToAVSCAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZkbFRvQVZTQy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdmRsVG9BVlNDLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXdCO0FBQ3hCLCtCQUFxRDtBQUVyRCxzQ0FBMEQ7QUFrQjFELElBQUksS0FBVSxDQUFBO0FBQ2QsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUMzQixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVksRUFBYyxFQUFFLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQTtBQUM3RSxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVksRUFBbUIsRUFBRSxDQUNuRCxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQTtBQUNqRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWMsRUFBa0IsRUFBRSxDQUN0RCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUE7QUFFeEUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFhLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDcEIsT0FBTyxRQUFRLENBQUE7S0FDaEI7SUFFRCxNQUFNLElBQUksR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO1FBQ3pCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7U0FDMUI7UUFFRCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDMUMsTUFBTSxLQUFLLEdBQUcs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