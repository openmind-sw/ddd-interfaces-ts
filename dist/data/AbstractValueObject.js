"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const utils_1 = require("../utils");
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
            throw new exceptions_1.ValidationException(this.constructor.name + '.constructor', this.validationErrorMessage(value), undefined, e);
        }
        if (!inputValid) {
            throw new exceptions_1.ValidationException(this.constructor.name + '.constructor', this.validationErrorMessage(value));
        }
        this._value = normalized;
    }
    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(value: any): ConcreteValueObject {
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
    /**
     * Error message for validation failures
     * @param value
     * @protected
     */
    validationErrorMessage(value) {
        return `Unexpected value for ${this.constructor.name}: ${(0, utils_1.quoteString)(value)}`;
    }
}
exports.default = AbstractValueObject;
//# sourceMappingURL=AbstractValueObject.js.map