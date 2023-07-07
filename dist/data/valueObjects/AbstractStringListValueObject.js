"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A string list with non-empty strings only
 */
class AbstractStringListValueObject extends AbstractValueObject_1.default {
    normalize(value) {
        if (value == undefined) {
            return [];
        }
        if (Array.isArray(value)) {
            // remove empty strings
            return value.filter((v) => v != undefined && (typeof v != 'string' || v.length > 0));
        }
        return value;
    }
    isValid(value) {
        if (Array.isArray(value)) {
            // fail on other values than strings
            return value.every(v => typeof v == 'string');
        }
        return false;
    }
}
exports.default = AbstractStringListValueObject;
//# sourceMappingURL=AbstractStringListValueObject.js.map