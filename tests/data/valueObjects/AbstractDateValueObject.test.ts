import { AbstractDateValueObject, ValidationException } from '../../../src';

class DateObject extends AbstractDateValueObject {
    public static create(value: unknown) {
        return new DateObject(value);
    }
}

const date = (value: unknown) => DateObject.create(value).toString();

test('Test AbstractDateValueObject', () => {
    expect(date(123)).toBe('1970-01-01T00:00:00.123Z');
    expect(date(1000000000000)).toBe('2001-09-09T01:46:40.000Z');

    expect(date('2023-08-22T08:23:42.693Z')).toBe('2023-08-22T08:23:42.693Z');
    expect(date('2023-08-22')).toBe('2023-08-22T00:00:00.000Z');

    expect(() => date(NaN)).toThrow(ValidationException);
    expect(() => date('test')).toThrow(ValidationException);
    expect(() => date([])).toThrow(ValidationException);
});
