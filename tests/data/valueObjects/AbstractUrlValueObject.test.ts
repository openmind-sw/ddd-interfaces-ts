import { AbstractURLValueObject, ValidationException } from '../../../src';

class UrlObject extends AbstractURLValueObject {
    public static create(value: unknown) {
        return new UrlObject(value);
    }

    protected getAllowedExtensions(): undefined {
        return undefined;
    }
}

class MediaUrlObject extends AbstractURLValueObject {
    public static create(value: unknown) {
        return new MediaUrlObject(value);
    }

    protected getAllowedExtensions(): string[] {
        return ['mp4', 'webm'];
    }
}

const url = (value: unknown) => UrlObject.create(value).value.href;
const mediaUrl = (value: unknown) => MediaUrlObject.create(value).value.href;

test('Test AbstractStringValueObject', () => {
    expect(url('https://test.de/')).toBe('https://test.de/');
    expect(mediaUrl('https://test.de/video.mp4')).toBe('https://test.de/video.mp4');

    expect(() => url('http://test.de/')).toThrow(ValidationException);
    expect(() => mediaUrl('https://test.de/')).toThrow(ValidationException);
    expect(() => mediaUrl('https://test.de/video.exe')).toThrow(ValidationException);
});
