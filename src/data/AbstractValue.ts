/**
 * Use this as a basis for value classes
 */
export default abstract class AbstractValue<A> {
    protected _value: A;

    public get value(): A {
        return this._value;
    }

    /**
     * Create a new instance from any input by normalizing and validating it.
     * Use create() instead of this function.
     * @param value
     */
    constructor(value: any) {
        const normalized = this.normalize(value);
        let inputValid = false;
        try {
            inputValid = this.isValid(normalized);
        } catch (e) {
            throw new Error(`${this.validationErrorMessage(value)}: ${e}`);
        }
        if (!inputValid) {
            throw new Error(this.validationErrorMessage(value));
        }
        this._value = normalized;
    }

    /**
     * Default create method for the class
     * @param value: an arbitrary value
     */
    public static create<V, A extends AbstractValue<V>>(this: new (value: V) => A, value: any) {
        return new this(value);
    }

    /**
     * Use the inner values toString method
     */
    public toString(): string {
        return String(this._value);
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
     * @param value: any input value
     * @protected
     */
    protected abstract isValid(value: any): value is A;

    /**
     * Error message for validation failures
     * @param value
     * @protected
     */
    protected abstract validationErrorMessage(value: any): string;
}
