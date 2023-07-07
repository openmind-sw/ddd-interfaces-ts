import AbstractValueObject from '../AbstractValueObject';
/**
 * A string object that can optionally be empty
 */
export default abstract class AbstractStringValueObject extends AbstractValueObject<string> {
    /**
     * Allow empty strings, convert undefined to ''
     * @protected
     */
    protected abstract allowEmpty(): boolean;
    protected normalize(value: unknown): unknown;
    protected isValid(value: unknown): value is string;
}
