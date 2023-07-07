import { AbstractStringValueObject, ValidationException } from '../../../src';

class EmptyStringObject extends AbstractStringValueObject {
    protected allowEmpty() {
        return true;
    }

    public static create(value: unknown) {
        return new EmptyStringObject(value);
    }
}

class NonEmptyStringObject extends AbstractStringValueObject {
    protected allowEmpty() {
        return false;
    }

    public static create(value: unknown) {
        return new NonEmptyStringObject(value);
    }
}

const emptyString = (value: unknown) => EmptyStringObject.create(value).value;
const nonEmptyString = (value: unknown) => NonEmptyStringObject.create(value).value;

test('Test AbstractStringValueObject', () => {
    expect(emptyString('test')).toBe('test');
    expect(emptyString('')).toBe('');
    expect(emptyString(undefined)).toBe('');

    expect(nonEmptyString('test')).toBe('test');
    expect(() => nonEmptyString('')).toThrow(ValidationException);
    expect(() => nonEmptyString(undefined)).toThrow(ValidationException);
});
