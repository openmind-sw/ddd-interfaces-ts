import { getUrlExtension } from '../../utils';
import AbstractValueObject from '../AbstractValueObject';

type contentTypeUrl = { contentType: string; url: string };

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

    protected normalize(value: unknown): any {
        // get extension
        if (typeof value == 'object') {
            if ((value as contentTypeUrl)?.contentType != undefined) {
                this._extension = (value as contentTypeUrl).contentType.split('/')[1];
            } else if ((value as contentTypeUrl)?.url != undefined) {
                this._extension = getUrlExtension((value as contentTypeUrl).url);
            }
        } else if (typeof value == 'string') {
            this._extension = getUrlExtension(value);
        }

        // get url
        let urlValue = value;
        if (typeof value == 'object' && (value as contentTypeUrl)?.url != undefined) {
            urlValue = (value as contentTypeUrl).url;
        }
        if (typeof urlValue == 'string') {
            try {
                return new URL(urlValue);
            } catch {
                // ignore
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
            const allowed = this.getAllowedExtensions();
            if (allowed != undefined && (this._extension == undefined || !allowed.includes(this._extension))) {
                throw new Error(`Unsupported file extension`);
            }
        }
        return true;
    }
}
