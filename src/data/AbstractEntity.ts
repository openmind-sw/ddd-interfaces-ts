import { ValidationException } from '../exceptions';
import { quoteString } from '../utils';
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
        const values = Object.keys(this._values)
            .map(v => v + ': ' + quoteString(this._values[v]?.value))
            .join(', ');
        return `{ ${values} }`;
    }

    /**
     * Convert inner values to a flat object
     */
    public flat(): { [key: string]: any } {
        return Object.fromEntries(Object.keys(this._values).map(v => [v, this._values[v]?.value]));
    }

    /**
     * Convert the inner values to JSON string
     */
    public toJSON(): string {
        return JSON.stringify(this.flat());
    }

    /**
     * Default create method for the class. Must be overwritten in the concrete class:
     * ```
     * public static create(values: ConcreteEntityProps): ConcreteEntity {
     *     return new ConcreteEntity(values);
     * }
     * ```
     * @param values A record of string, AbstractValue pairs, record props might be optional
     */
    public static create(this: any, values: AbstractEntityProps<any>): AbstractEntity<any, AbstractEntityProps<any>> {
        throw new Error('Not implemented');
    }
}
