import AbstractValueObject from '../AbstractValueObject';
/**
 * A URL object that automatically converts strings and can be checked for extensions
 *
 * Accepted inputs:
 *  - URL Object
 *  - URL as string (will check file extension)
 *  - { url: 'https://someVideo.url/withoutExt', contentType?: 'videoUrl' } (will check contentType)
 */
export default abstract class AbstractURLValueObject extends AbstractValueObject<URL> {
    protected _extension?: string;
    /**
     * Optionally check for file extensions
     * @protected
     */
    protected abstract getAllowedExtensions(): string[] | undefined;
    protected normalize(value: unknown): any;
    protected isValid(value: unknown): value is URL;
}
