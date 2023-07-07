import AbstractValueObject from '../AbstractValueObject';

/**
 * A number object that automatically converts strings
 */
export default abstract class AbstractNumberValueObject extends AbstractValueObject<number> {
    protected normalize(value: unknown) {
        return typeof value == 'string' ? Number(value) : value;
    }

    protected isValid(value: unknown): value is number {
        return typeof value == 'number' && !isNaN(value);
    }
}
