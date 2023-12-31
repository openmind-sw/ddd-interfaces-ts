import { ValidationException } from '../exceptions';
import { quoteString } from '../utils';
import { AbstractEntity } from './index';

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
    protected constructor(value: unknown) {
        const normalized = this.normalize(value);
        let inputValid = false;
        try {
            inputValid = this.isValid(normalized);
        } catch (e) {
            throw new ValidationException(
                this.constructor.name + '.constructor',
                this.validationExceptionMessage(value, (e as Error).message),
                undefined,
                e as Error,
            );
        }
        if (!inputValid) {
            throw new ValidationException(
                this.constructor.name + '.constructor',
                this.validationExceptionMessage(value),
            );
        }
        this._value = normalized as A;
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
    public static create(value: unknown): AbstractValueObject<unknown> {
        throw new Error('Not implemented');
    }

    /**
     * Use the inner value's toString method
     */
    public toString(): string {
        return String(this._value);
    }

    /**
     * Convert inner values to a flat object
     */
    public flat(): unknown {
        if (this._value == undefined) {
            return this._value;
        }
        if (Array.isArray(this._value)) {
            return this._value.map(v =>
                v instanceof AbstractValueObject || v instanceof AbstractEntity ? v.flat() : v,
            );
        }
        if (typeof this._value == 'object') {
            return Object.fromEntries(
                Object.keys(this._value).map(k => {
                    const v = (this._value as Record<string, unknown>)[k];
                    return [k, v instanceof AbstractValueObject || v instanceof AbstractEntity ? v.flat() : v];
                }),
            );
        }
        return this._value;
    }

    /**
     * Convert the inner value to JSON string
     */
    public toJSON(): unknown {
        return this.flat();
    }

    /**
     * Normalize the value before validating it. E.g. transform to other types.
     * Only override if required.
     * @protected
     */
    protected normalize(value: unknown): unknown {
        return value;
    }

    /**
     * Type guard to validate an arbitrary value
     * @param value Any input value
     * @protected
     */
    protected abstract isValid(value: unknown): value is A;

    /**
     * Get class name of implementing class.
     * When extending an already concrete class, this needs to be overwritten to return the correct class name.
     * @protected
     */
    protected className(): string {
        return this.constructor.name;
    }

    /**
     * Error message for validation failures
     * @param value
     * @param message
     * @protected
     */
    protected validationExceptionMessage(value: unknown, message?: string): string {
        return (
            `Unexpected value for ${this.constructor.name}: ${quoteString(value)}` + (message ? ` (${message})` : '')
        );
    }
}
