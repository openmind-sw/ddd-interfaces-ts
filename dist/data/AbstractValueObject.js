"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Use this as a basis for value classes
 * @param A: The inner value's type
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
            throw new Error(`${this.validationErrorMessage(value)}: ${e}`);
        }
        if (!inputValid) {
            throw new Error(this.validationErrorMessage(value));
        }
        this._value = normalized;
    }
    /**
     * Default create method for the class. Must be overwritten in the concrete class:
        * ```
     * public static create(this: any, value: any): ConcreteValueObject {
     *     return new this(values);
     * }
     * ```
     * @param value: any arbitrary value
     */
    static create(value) {
        throw new Error("Not implemented");
    }
    /**
     * Use the inner value's toString method
     */
    toString() {
        return String(this._value);
    }
    /**
     * Convert the inner value to JSON string
     */
    toJSON() {
        return JSON.stringify(this._value);
    }
    /**
     * Normalize the value before validating it. E.g. transform to other types.
     * Only override if required.
     * @protected
     */
    normalize(value) {
        return value;
    }
}
exports.default = AbstractValueObject;
//# sourceMappingURL=AbstractValueObject.js.map