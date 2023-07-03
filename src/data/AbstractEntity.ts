import AbstractValueObject from './AbstractValueObject';

type AbstractEntityProps<I> = Record<'id', I> & Record<string, AbstractValueObject<any> | undefined>;

/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 */
export default abstract class AbstractEntity<I extends AbstractValueObject<any>, T extends AbstractEntityProps<I>> {
    protected _values: T;

    public get id(): I {
        return this._values.id;
    }

    constructor(values: T) {
        this._values = values;
    }

    /**
     * Print entity with all inner values
     */
    public toString(): string {
        const quoteString = (value: any) => (typeof value == 'string' ? `'${value}'` : String(value));
        const values = Object.keys(this._values)
            .map(v => v + ': ' + quoteString(this._values[v]?.value))
            .join(', ');
        return `{ ${values} }`;
    }

    /**
     * Convert the inner values to JSON string
     */
    public toJSON(): string {
        return JSON.stringify(Object.fromEntries(Object.keys(this._values).map(v => [v, this._values[v]?.value])));
    }

    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(this: any, values: ConcreteEntityProps): ConcreteEntity {
     *     return new this(values);
     * }
     * ```
     * @param values: a record of string, AbstractValue pairs, record props might be optional
     */
    public static create(this: any, values: AbstractEntityProps<any>): AbstractEntity<any, AbstractEntityProps<any>> {
        throw new Error('Not implemented');
    }
}
