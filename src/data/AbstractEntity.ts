import { AbstractValue } from '@';

type AbstractEntityProps = Record<string, AbstractValue<any> | undefined>

/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 */
export default abstract class AbstractEntity<T extends AbstractEntityProps> {
    protected _values: T;

    constructor(values: T) {
        this._values = values;
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
    public static create<V extends AbstractEntityProps, A extends AbstractEntity<Partial<V>>>(
        this: new (values: V) => A, values: V
    ) {
        return new this(values);
    }
}
