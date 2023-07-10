import AbstractValueObject from '../AbstractValueObject';

/**
 * A string object that can optionally be empty
 *
 * Accepted inputs:
 *  - string
 *  - undefined (if allowEmpty() set to true)
 */
export default abstract class AbstractStringValueObject extends AbstractValueObject<string> {
    /**
     * Allow empty strings, convert undefined to ''
     * @protected
     */
    protected abstract allowEmpty(): boolean;

    protected normalize(value: unknown): unknown {
        if (this.allowEmpty() && value == undefined) {
            return '';
        }
        return value;
    }

    protected isValid(value: unknown): value is string {
        return typeof value == 'string' && (this.allowEmpty() || value.length > 0);
    }
}
