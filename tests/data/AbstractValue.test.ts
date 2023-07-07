import { ValidationException } from '../../src';
import { NumberValue, StringValue } from './AbstractValueExamples';

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
    expect(NumberValue.create(123).toJSON()).toBe('123');
    expect(StringValue.create('hello world').toJSON()).toBe('"hello world"');
});
