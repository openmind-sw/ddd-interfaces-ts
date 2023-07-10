import AbstractValueObject from '../AbstractValueObject';
/**
 * A string list with non-empty strings only
 *
 * Accepted inputs:
 *  - string[]
 *  - undefined (defaults to empty list)
 */
export default abstract class AbstractStringListValueObject extends AbstractValueObject<string[]> {
    protected normalize(value: unknown): unknown;
    protected isValid(value: unknown): value is string[];
}
