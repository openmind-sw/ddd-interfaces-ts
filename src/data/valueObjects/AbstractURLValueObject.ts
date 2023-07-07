import { getUrlExtension } from '../../utils';
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

    protected normalize(value: unknown): any {
        if (typeof value == 'string') {
            try {
                return new URL(value);
            } catch {
                // pass
            }
        }
        return value;
    }

    protected isValid(value: unknown): value is URL {
        if (value == undefined) {
            throw new Error('Empty value');
        }
        if (!(value instanceof URL)) {
            throw new Error('Unhandled type');
        }
        if (value.protocol != 'https:') {
            throw new Error(`Unsupported protocol`);
        }
        if (this.getAllowedExtensions != undefined) {
            const extension = getUrlExtension(value.href);
            const allowed = this.getAllowedExtensions();
            if (allowed != undefined && (extension == undefined || !allowed.includes(extension))) {
                throw new Error(`Unsupported file extension`);
            }
        }
        return true;
    }
}
