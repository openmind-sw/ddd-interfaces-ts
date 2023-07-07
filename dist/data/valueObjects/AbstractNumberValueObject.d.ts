import AbstractValueObject from '../AbstractValueObject';
/**
 * A number object that automatically converts strings
 */
export default abstract class AbstractNumberValueObject extends AbstractValueObject<number> {
    protected normalize(value: unknown): unknown;
    protected isValid(value: unknown): value is number;
}
