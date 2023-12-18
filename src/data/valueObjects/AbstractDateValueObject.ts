import AbstractValueObject from '../AbstractValueObject';

/**
 * A Date object that automatically converts numbers and strings
 *
 * Accepted inputs:
 *  - number (as unix timestamp)
 *  - string (anything Date understands)
 *  - Date
 */
export default abstract class AbstractDateValueObject extends AbstractValueObject<Date> {
    public toString(): string {
        return this._value.toISOString();
    }

    public flat(): string {
        return this.toString();
    }

    protected normalize(value: unknown) {
        try {
            if (typeof value == 'number' && !isNaN(value)) {
                return new Date(value);
            }
            if (typeof value == 'string') {
                return new Date(value);
            }
        } catch {}
        return value;
    }

    protected isValid(value: unknown): value is Date {
        return value instanceof Date && !isNaN(value as unknown as number);
    }
}
