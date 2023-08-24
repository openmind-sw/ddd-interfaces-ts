"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * Use this as a basis for entity classes
 *
 * When extending, you must create appropriate getter methods for each property. Types will be inferred automatically.
 * @param I The id's type, must be an AbstractValueObject.
 * @param T The concrete entities props. Must include id with the same type.
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
        const values = Object.keys(this._values)
            .map(v => {
            const value = this._values[v];
            return (v +
                ': ' +
                (Array.isArray(value)
                    ? `[${value.map(v => (0, utils_1.quoteString)(v.value)).join(', ')}]`
                    : (value instanceof (AbstractEntity) ? value.toString() : (0, utils_1.quoteString)(value?.value))));
        })
            .join(', ');
        return `{ ${values} }`;
    }
    /**
     * Convert inner values to a flat object
     */
    flat() {
        return Object.fromEntries(Object.keys(this._values).map(v => {
            const value = this._values[v];
            return [v, Array.isArray(value) ? value.map(v => v.flat()) : value?.flat()];
        }));
    }
    /**
     * Convert the inner values to JSON string
     */
    toJSON() {
        return this.flat();
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
    static create(values) {
        throw new Error('Not implemented');
    }
}
exports.default = AbstractEntity;
//# sourceMappingURL=AbstractEntity.js.map