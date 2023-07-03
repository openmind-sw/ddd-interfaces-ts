import { NumberValue, StringValue } from './AbstractValueExamples';

test('Test value', () => {
    expect(NumberValue.create(123).value).toBe(123);
    expect(NumberValue.create('456').value).toBe(456);
    expect(StringValue.create('MyTestString').value).toBe('MyTestString');
});

test('Test validation', () => {
    expect(() => NumberValue.create('value')).toThrow("Invalid input: expected number, got 'value'");
    expect(() => StringValue.create(123)).toThrow("Invalid input: expected string, got '123'");
    expect(() => StringValue.create(false)).toThrow("Invalid input: expected string, got 'false'");
    expect(() => StringValue.create('')).toThrow("Invalid input: expected string, got ''");
});

test('Test toJSON()', () => {
    expect(NumberValue.create(123).toJSON()).toBe('123');
    expect(StringValue.create('hello world').toJSON()).toBe('"hello world"');
});
