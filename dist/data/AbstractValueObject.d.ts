/**
 * Use this as a basis for value classes
 * @param A The inner value's type
 */
export default abstract class AbstractValueObject<A> {
    protected readonly _value: A;
    get value(): A;
    /**
     * Create a new instance from any input by normalizing and validating it.
     * Use create() instead of this function.
     * @param value
     */
    protected constructor(value: any);
    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(value: any): ConcreteValueObject {
     *     return new ConcreteValueObject(value);
     * }
     * ```
     * @param value Any arbitrary value
     */
    static create(value: any): AbstractValueObject<unknown>;
    /**
     * Use the inner value's toString method
     */
    toString(): string;
    /**
     * Convert the inner value to JSON string
     */
    toJSON(): string;
    /**
     * Normalize the value before validating it. E.g. transform to other types.
     * Only override if required.
     * @protected
     */
    protected normalize(value: any): any;
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
    protected validationExceptionMessage(value: any): string;
}
