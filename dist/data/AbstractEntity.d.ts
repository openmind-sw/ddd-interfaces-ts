import AbstractValueObject from './AbstractValueObject';
type AbstractEntityProps<I> = Record<'id', I> & Record<string, AbstractValueObject<any> | undefined>;
/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 * @param I: the id's type, must be an AbstractValueObject.
 * @param T: the concrete entities props. Must include id with the same type.
 */
export default abstract class AbstractEntity<I extends AbstractValueObject<any>, T extends AbstractEntityProps<I>> {
    protected _values: T;
    get id(): I;
    constructor(values: T);
    /**
     * Print entity with all inner values
     */
    toString(): string;
    /**
     * Convert the inner values to JSON string
     */
    toJSON(): string;
    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(this: any, values: ConcreteEntityProps): ConcreteEntity {
     *     return new this(values);
     * }
     * ```
     * @param values: a record of string, AbstractValue pairs, record props might be optional
     */
    static create(this: any, values: AbstractEntityProps<any>): AbstractEntity<any, AbstractEntityProps<any>>;
}
export {};