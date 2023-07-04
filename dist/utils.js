"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteString = void 0;
/**
 * Converts anything to a string and adds single quotes if input was already a string
 * @param value: the value to convert
 */
function quoteString(value) {
    return typeof value == 'string' ? `'${value}'` : String(value);
}
exports.quoteString = quoteString;
//# sourceMappingURL=utils.js.map