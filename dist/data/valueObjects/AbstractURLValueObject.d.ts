import AbstractValueObject from '../AbstractValueObject';
/**
 * A URL object that automatically converts strings and can be checked for extensions
 */
export default abstract class AbstractURLValueObject extends AbstractValueObject<URL> {
    /**
     * Optionally check for file extensions
     * @protected
     */
    protected abstract getAllowedExtensions(): string[] | undefined;
    protected normalize(value: unknown): any;
    protected isValid(value: unknown): value is URL;
}
