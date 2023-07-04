import { ValidationException } from '../exceptions';
import { quoteString } from '../utils';

/**
 * Use this as a basis for value classes
 * @param A The inner value's type
 */
export default abstract class AbstractValueObject<A> {
    protected readonly _value: A;

    public get value(): A {
        return this._value;
    }

    /**
     * Create a new instance from any input by normalizing and validating it.
     * Use create() instead of this function.
     * @param value
     */
    protected constructor(value: any) {
        const normalized = this.normalize(value);
        let inputValid = false;
        try {
            inputValid = this.isValid(normalized);
        } catch (e) {
            throw new ValidationException(
                this.constructor.name + '.constructor',
                this.validationErrorMessage(value),
                undefined,
                e as Error,
            );
        }
        if (!inputValid) {
            throw new ValidationException(this.constructor.name + '.constructor', this.validationErrorMessage(value));
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
    public static create(value: any): AbstractValueObject<unknown> {
        throw new Error('Not implemented');
    }

    /**
     * Use the inner value's toString method
     */
    public toString(): string {
        return String(this._value);
    }

    /**
     * Convert the inner value to JSON string
     */
    public toJSON(): string {
        return JSON.stringify(this._value);
    }

    /**
     * Normalize the value before validating it. E.g. transform to other types.
     * Only override if required.
     * @protected
     */
    protected normalize(value: any): any {
        return value;
    }

    /**
     * Type guard to validate an arbitrary value
     * @param value Any input value
     * @protected
     */
    protected abstract isValid(value: any): value is A;

    /**
     * Error message for validation failures
     * @param value
     * @protected
     */
    protected validationErrorMessage(value: any): string {
        return `Unexpected value for ${this.constructor.name}: ${quoteString(value)}`;
    }
}
