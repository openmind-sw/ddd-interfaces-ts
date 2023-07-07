import AbstractValueObject from '../AbstractValueObject';
/**
 * A string list with non-empty strings only
 */
export default abstract class AbstractStringListValueObject extends AbstractValueObject<string[]> {
    protected normalize(value: unknown): unknown;
    protected isValid(value: unknown): value is string[];
}
