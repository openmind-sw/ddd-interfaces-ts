"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A Date object that automatically converts numbers and strings
 *
 * Accepted inputs:
 *  - number (as unix timestamp)
 *  - string (anything Date understands)
 *  - Date
 */
class AbstractDateValueObject extends AbstractValueObject_1.default {
    toString() {
        return this._value.toISOString();
    }
    flat() {
        return this.toString();
    }
    normalize(value) {
        try {
            if (typeof value == 'number' && !isNaN(value)) {
                return new Date(value);
            }
            if (typeof value == 'string') {
                return new Date(value);
            }
        }
        catch { }
        return value;
    }
    isValid(value) {
        return value instanceof Date && !isNaN(value);
    }
}
exports.default = AbstractDateValueObject;
//# sourceMappingURL=AbstractDateValueObject.js.map