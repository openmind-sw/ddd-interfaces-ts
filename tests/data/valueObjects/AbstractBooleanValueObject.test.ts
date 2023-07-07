import { AbstractBooleanValueObject, ValidationException } from '../../../src';

class TrueBooleanObject extends AbstractBooleanValueObject {
    protected getDefaultValue() {
        return true;
    }

    public static create(value: unknown) {
        return new TrueBooleanObject(value);
    }
}

class FalseBooleanObject extends AbstractBooleanValueObject {
    protected getDefaultValue() {
        return false;
    }

    public static create(value: unknown) {
        return new FalseBooleanObject(value);
    }
}

const trueBoolean = (value: unknown) => TrueBooleanObject.create(value).value;
const falseBoolean = (value: unknown) => FalseBooleanObject.create(value).value;

test('Test AbstractBooleanValueObject', () => {
    expect(trueBoolean(true)).toBe(true);
    expect(trueBoolean('true')).toBe(true);
    expect(trueBoolean('FALSE')).toBe(false);

    expect(trueBoolean(undefined)).toBe(true);
    expect(trueBoolean('')).toBe(true);

    expect(falseBoolean(undefined)).toBe(false);
    expect(falseBoolean('')).toBe(false);

    expect(() => trueBoolean('test')).toThrow(ValidationException);
    expect(() => trueBoolean([])).toThrow(ValidationException);
});
