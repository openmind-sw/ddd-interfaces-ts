import AbstractValueObject from '../AbstractValueObject';
/**
 * A boolean object with a configurable default value
 *
 * Accepted inputs:
 *  - boolean
 *  - 'true' / 'false'
 *  - undefined / '' (use default)
 */
export default abstract class AbstractBooleanValueObject extends AbstractValueObject<boolean> {
    /**
     * Default value if undefined or empty string
     * @protected
     */
    protected abstract getDefaultValue(): boolean;
    protected normalize(value: unknown): unknown;
    protected isValid(value: unknown): value is boolean;
}
