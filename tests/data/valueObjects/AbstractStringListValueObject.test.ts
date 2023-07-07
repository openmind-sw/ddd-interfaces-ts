import { AbstractStringListValueObject, ValidationException } from '../../../src';

class StringListObject extends AbstractStringListValueObject {
    public static create(value: unknown) {
        return new StringListObject(value);
    }
}

const stringList = (value: unknown) => StringListObject.create(value).value;

test('Test AbstractStringListValueObject', () => {
    expect(stringList(['1', '2', '3', '4'])).toHaveLength(4);
    expect(stringList(['1', '2', '', '4', undefined, '6'])).toHaveLength(4);
    expect(stringList(undefined)).toHaveLength(0);

    expect(() => stringList(['1', 2, '3', 4])).toThrow(ValidationException);
    expect(() => stringList('test')).toThrow(ValidationException);
    expect(() => stringList([[]])).toThrow(ValidationException);
});
