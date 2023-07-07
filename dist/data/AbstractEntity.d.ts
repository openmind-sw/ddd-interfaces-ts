import AbstractValueObject from './AbstractValueObject';
type AbstractEntityProps<I> = Record<'id', I> & Record<string, AbstractValueObject<any> | undefined>;
/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 * @param I The id's type, must be an AbstractValueObject.
 * @param T The concrete entities props. Must include id with the same type.
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
     * Convert inner values to a flat object
     */
    flat(): {
        [key: string]: unknown;
    };
    /**
     * Convert the inner values to JSON string
     */
    toJSON(): string;
    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(values: ConcreteEntityProps): ConcreteEntity {
     *     return new ConcreteEntity(values);
     * }
     * ```
     * @param values A record of string, AbstractValue pairs, record props might be optional
     */
    static create(values: AbstractEntityProps<any>): AbstractEntity<any, AbstractEntityProps<any>>;
}
export {};
