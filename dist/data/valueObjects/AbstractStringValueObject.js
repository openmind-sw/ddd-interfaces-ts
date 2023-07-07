"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A string object that can optionally be empty
 */
class AbstractStringValueObject extends AbstractValueObject_1.default {
    normalize(value) {
        if (this.allowEmpty() && value == undefined) {
            return '';
        }
        return value;
    }
    isValid(value) {
        return typeof value == 'string' && (this.allowEmpty() || value.length > 0);
    }
}
exports.default = AbstractStringValueObject;
//# sourceMappingURL=AbstractStringValueObject.js.map