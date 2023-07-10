"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A boolean object with a configurable default value
 *
 * Accepted inputs:
 *  - boolean
 *  - 'true' / 'false'
 *  - undefined / '' (use default)
 */
class AbstractBooleanValueObject extends AbstractValueObject_1.default {
    normalize(value) {
        if (value == undefined) {
            return this.getDefaultValue();
        }
        if (typeof value == 'string') {
            if (value.length == 0) {
                return this.getDefaultValue();
            }
            if (value.toLowerCase() == 'true') {
                return true;
            }
            if (value.toLowerCase() == 'false') {
                return false;
            }
        }
        return value;
    }
    isValid(value) {
        return typeof value == 'boolean';
    }
}
exports.default = AbstractBooleanValueObject;
//# sourceMappingURL=AbstractBooleanValueObject.js.map