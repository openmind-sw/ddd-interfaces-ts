"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 * @param I: the id's type, must be an AbstractValueObject.
 * @param T: the concrete entities props. Must include id with the same type.
 */
class AbstractEntity {
    _values;
    get id() {
        return this._values.id;
    }
    constructor(values) {
        this._values = values;
    }
    /**
     * Print entity with all inner values
     */
    toString() {
        const quoteString = (value) => (typeof value == 'string' ? `'${value}'` : String(value));
        const values = Object.keys(this._values)
            .map(v => v + ': ' + quoteString(this._values[v]?.value))
            .join(', ');
        return `{ ${values} }`;
    }
    /**
     * Convert the inner values to JSON string
     */
    toJSON() {
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
    static create(values) {
        throw new Error('Not implemented');
    }
}
exports.default = AbstractEntity;
//# sourceMappingURL=AbstractEntity.js.map