import AbstractValueObject from '../AbstractValueObject';

/**
 * A string list with non-empty strings only
 */
export default abstract class AbstractStringListValueObject extends AbstractValueObject<string[]> {
    protected normalize(value: unknown): unknown {
        if (value == undefined) {
            return [];
        }
        if (Array.isArray(value)) {
            // remove empty strings
            return value.filter((v: unknown) => v != undefined && (typeof v != 'string' || v.length > 0));
        }
        return value;
    }

    protected isValid(value: unknown): value is string[] {
        if (Array.isArray(value)) {
            // fail on other values than strings
            return value.every(v => typeof v == 'string');
        }
        return false;
    }
}
