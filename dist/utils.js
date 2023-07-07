"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlExtension = exports.quoteString = void 0;
/**
 * Converts anything to a string and adds single quotes if input was already a string
 * @param value: the value to convert
 */
function quoteString(value) {
    return typeof value == 'string' ? `'${value}'` : String(value);
}
exports.quoteString = quoteString;
/**
 * Return the file extension from an url string
 * @param url
 */
function getUrlExtension(url) {
    return url?.split(/[#?]/)[0]?.split('.').pop()?.trim();
}
exports.getUrlExtension = getUrlExtension;
//# sourceMappingURL=utils.js.map