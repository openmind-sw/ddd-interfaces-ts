import { ValidationException } from '../../src';
import { NumberValue, ObjectValueObject, StringValue } from './AbstractValueExamples';

test('Test value', () => {
    expect(NumberValue.create(123).value).toBe(123);
    expect(NumberValue.create('456').value).toBe(456);
    expect(StringValue.create('MyTestString').value).toBe('MyTestString');
});

test('Test validation', () => {
    expect(() => NumberValue.create('value')).toThrow(ValidationException);
    expect(() => StringValue.create(123)).toThrow(ValidationException);
    expect(() => StringValue.create(false)).toThrow(ValidationException);
    expect(() => StringValue.create('')).toThrow(ValidationException);
});

test('Test toJSON()', () => {
    expect(JSON.stringify(NumberValue.create(123))).toBe('123');
    expect(JSON.stringify(StringValue.create('hello world'))).toBe('"hello world"');
    expect(JSON.stringify(ObjectValueObject.create({ valueObject: StringValue.create('foobar') }))).toBe(
        '{"valueObject":"foobar"}',
    );
    expect(
        JSON.stringify(
            ObjectValueObject.create({ valueObject: [StringValue.create('foo'), StringValue.create('bar')] }),
        ),
    ).toBe('{"valueObject":["foo","bar"]}');
});
