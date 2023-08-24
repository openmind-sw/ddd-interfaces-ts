"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const utils_1 = require("../utils");
const index_1 = require("./index");
/**
 * Use this as a basis for value classes
 * @param A The inner value's type
 */
class AbstractValueObject {
    _value;
    get value() {
        return this._value;
    }
    /**
     * Create a new instance from any input by normalizing and validating it.
     * Use create() instead of this function.
     * @param value
     */
    constructor(value) {
        const normalized = this.normalize(value);
        let inputValid = false;
        try {
            inputValid = this.isValid(normalized);
        }
        catch (e) {
            throw new exceptions_1.ValidationException(this.constructor.name + '.constructor', this.validationExceptionMessage(value, e.message), undefined, e);
        }
        if (!inputValid) {
            throw new exceptions_1.ValidationException(this.constructor.name + '.constructor', this.validationExceptionMessage(value));
        }
        this._value = normalized;
    }
    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(value: unknown): ConcreteValueObject {
     *     return new ConcreteValueObject(value);
     * }
     * ```
     * @param value Any arbitrary value
     */
    static create(value) {
        throw new Error('Not implemented');
    }
    /**
     * Use the inner value's toString method
     */
    toString() {
        return String(this._value);
    }
    /**
     * Convert inner values to a flat object
     */
    flat() {
        if (this._value == undefined) {
            return this._value;
        }
        if (Array.isArray(this._value)) {
            return this._value.map(v => v instanceof AbstractValueObject || v instanceof index_1.AbstractEntity ? v.flat() : v);
        }
        if (typeof this._value == 'object') {
            return Object.fromEntries(Object.keys(this._value).map(k => {
                const v = this._value[k];
                return [k, v instanceof AbstractValueObject || v instanceof index_1.AbstractEntity ? v.flat() : v];
            }));
        }
        return this._value;
    }
    /**
     * Convert the inner value to JSON string
     */
    toJSON() {
        return this.flat();
    }
    /**
     * Normalize the value before validating it. E.g. transform to other types.
     * Only override if required.
     * @protected
     */
    normalize(value) {
        return value;
    }
    /**
     * Get class name of implementing class.
     * When extending an already concrete class, this needs to be overwritten to return the correct class name.
     * @protected
     */
    className() {
        return this.constructor.name;
    }
    /**
     * Error message for validation failures
     * @param value
     * @param message
     * @protected
     */
    validationExceptionMessage(value, message) {
        return (`Unexpected value for ${this.constructor.name}: ${(0, utils_1.quoteString)(value)}` + (message ? ` (${message})` : ''));
    }
}
exports.default = AbstractValueObject;
//# sourceMappingURL=AbstractValueObject.js.map