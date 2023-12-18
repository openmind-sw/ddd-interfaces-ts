import { AbstractNumberValueObject, ValidationException } from '../../../src';

class NumberObject extends AbstractNumberValueObject {
    public static create(value: unknown) {
        return new NumberObject(value);
    }
}

const number = (value: unknown) => NumberObject.create(value).value;

const t = NumberObject.create(123).flat()

test('Test AbstractNumberValueObject', () => {
    expect(NumberObject.create(123).flat()).toBe(123);
    expect(number(123)).toBe(123);
    expect(number('456')).toBe(456);

    expect(() => number(NaN)).toThrow(ValidationException);
    expect(() => number('test')).toThrow(ValidationException);
    expect(() => number([])).toThrow(ValidationException);
});
