import AbstractValueObject from './AbstractValueObject';

type AbstractEntityProps = Record<'id', AbstractValueObject<any>> &
    Record<string, AbstractValueObject<any> | undefined>;

/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 */
export default abstract class AbstractEntity<T extends AbstractEntityProps> {
    protected _values: T;

    public get id() {
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
     * Default create method for the class.
     *
     * When using optional properties, this method must be overwritten in the concrete class
     * with the concrete props and class, e.g.:
     * ```
     * type RealEntityProps = { requiredProp: RealValue, optionalProp?: RealValue };
     *
     * class RealEntity extends AbstractEntity<RealEntityProps> {
     *     public static create<RealEntityProps, RealEntity>(
     *         this: new (values: RealEntityProps) => RealEntity, values: RealEntityProps
     *     ) {
     *         return new this(values)
     *     }
     * }
     * ```
     * @param values: a record of string, AbstractValue pairs, record props might be optional
     */
    public static create<V extends AbstractEntityProps, A extends AbstractEntity<V>>(
        this: new (values: V) => A,
        values: V,
    ) {
        return new this(values);
    }
}
