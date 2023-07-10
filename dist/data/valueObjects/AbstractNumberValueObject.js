"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A number object that automatically converts strings
 *
 * Accepted inputs:
 *  - number (except NaN)
 *  - string (converted to number)
 */
class AbstractNumberValueObject extends AbstractValueObject_1.default {
    normalize(value) {
        return typeof value == 'string' ? Number(value) : value;
    }
    isValid(value) {
        return typeof value == 'number' && !isNaN(value);
    }
}
exports.default = AbstractNumberValueObject;
//# sourceMappingURL=AbstractNumberValueObject.js.map