"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const AbstractValueObject_1 = __importDefault(require("../AbstractValueObject"));
/**
 * A URL object that automatically converts strings and can be checked for extensions
 *
 * Accepted inputs:
 *  - URL Object
 *  - URL as string (will check file extension)
 *  - { url: 'https://someVideo.url/withoutExt', contentType?: 'videoUrl' } (will check contentType)
 */
class AbstractURLValueObject extends AbstractValueObject_1.default {
    _extension;
    toString() {
        return this.value.href;
    }
    flat() {
        return this.toString();
    }
    normalize(value) {
        // get extension
        if (typeof value == 'object') {
            if (value?.contentType != undefined) {
                this._extension = value.contentType.split('/')[1];
            }
            else if (value?.url != undefined) {
                this._extension = (0, utils_1.getUrlExtension)(value.url);
            }
        }
        else if (typeof value == 'string') {
            this._extension = (0, utils_1.getUrlExtension)(value);
        }
        // get url
        let urlValue = value;
        if (typeof value == 'object' && value?.url != undefined) {
            urlValue = value.url;
        }
        if (typeof urlValue == 'string') {
            try {
                return new URL(urlValue);
            }
            catch {
                // ignore
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
            const allowed = this.getAllowedExtensions();
            if (allowed != undefined && (this._extension == undefined || !allowed.includes(this._extension))) {
                throw new Error(`Unsupported file extension`);
            }
        }
        return true;
    }
}
exports.default = AbstractURLValueObject;
//# sourceMappingURL=AbstractURLValueObject.js.map