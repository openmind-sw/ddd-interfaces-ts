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
    protected getAllowedExtensions(): string[] {
        return ['mp4', 'webm'];
    }

    public static create(value: unknown) {
        return new MediaUrlObject(value);
    }
}

const url = (value: unknown) => UrlObject.create(value).value.href;
const mediaUrl = (value: unknown) => MediaUrlObject.create(value).value.href;

test('Test AbstractStringValueObject', () => {
    expect(url('https://test.de/')).toBe('https://test.de/');
    expect(url({ url: 'https://test.de/' })).toBe('https://test.de/');
    expect(mediaUrl('https://test.de/video.mp4')).toBe('https://test.de/video.mp4');
    expect(mediaUrl({ url: 'https://test.de/video.mp4' })).toBe('https://test.de/video.mp4');
    expect(mediaUrl({ contentType: 'video/mp4', url: 'https://test.de/videoUrl' })).toBe('https://test.de/videoUrl');

    expect(() => url('http://test.de/')).toThrow(ValidationException);
    expect(() => mediaUrl('https://test.de/')).toThrow(ValidationException);
    expect(() => mediaUrl('https://test.de/video.exe')).toThrow(ValidationException);
    expect(() => mediaUrl({ contentType: 'exe', url: 'https://test.de/video' })).toThrow(ValidationException);
});
