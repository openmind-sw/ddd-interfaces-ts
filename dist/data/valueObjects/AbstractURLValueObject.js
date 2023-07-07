"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A URL object that automatically converts strings and can be checked for extensions
 */
class AbstractURLValueObject extends AbstractValueObject_1.default {
    normalize(value) {
        if (typeof value == 'string') {
            try {
                return new URL(value);
            }
            catch {
                // pass
            }
        }
        return value;
    }
    isValid(value) {
        if (value == undefined) {
            throw new Error('Empty value');
        }
        if (!(value instanceof URL)) {
            throw new Error('Unhandled type');
        }
        if (value.protocol != 'https:') {
            throw new Error(`Unsupported protocol`);
        }
        if (this.getAllowedExtensions != undefined) {
            const extension = (0, utils_1.getUrlExtension)(value.href);
            const allowed = this.getAllowedExtensions();
            if (allowed != undefined && (extension == undefined || !allowed.includes(extension))) {
                throw new Error(`Unsupported file extension`);
            }
        }
        return true;
    }
}
exports.default = AbstractURLValueObject;
//# sourceMappingURL=AbstractURLValueObject.js.map