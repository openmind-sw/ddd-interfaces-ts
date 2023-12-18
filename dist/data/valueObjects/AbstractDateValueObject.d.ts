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
    toString(): string;
    flat(): string;
    protected normalize(value: unknown): unknown;
    protected isValid(value: unknown): value is Date;
}
