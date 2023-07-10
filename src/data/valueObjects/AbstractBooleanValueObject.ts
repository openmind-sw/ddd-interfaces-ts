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

    protected normalize(value: unknown): unknown {
        if (value == undefined) {
            return this.getDefaultValue();
        }
        if (typeof value == 'string') {
            if (value.length == 0) {
                return this.getDefaultValue();
            }
            if (value.toLowerCase() == 'true') {
                return true;
            }
            if (value.toLowerCase() == 'false') {
                return false;
            }
        }
        return value;
    }

    protected isValid(value: unknown): value is boolean {
        return typeof value == 'boolean';
    }
}
