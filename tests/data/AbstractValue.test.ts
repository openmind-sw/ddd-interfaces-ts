import { NumberValue, StringOnlyValue } from './AbstractValueExamples';

test('Test value', () => {
    expect(NumberValue.create(123).value).toBe(123);
    expect(NumberValue.create('456').value).toBe(456);
    expect(StringOnlyValue.create('MyTestString').value).toBe('MyTestString');
});

test('Test validation', () => {
    expect(() => NumberValue.create('value')).toThrow("Invalid input: expected number, got 'value'");
    expect(() => StringOnlyValue.create(123)).toThrow("Invalid input: expected string, got '123'");
    expect(() => StringOnlyValue.create(false)).toThrow("Invalid input: expected string, got 'false'");
    expect(() => StringOnlyValue.create('')).toThrow("Invalid input: expected string, got ''");
});

test('Test toJSON()', () => {
    expect(StringOnlyValue.create('hello world').toJSON()).toBe('"hello world"');
    expect(NumberValue.create(123).toJSON()).toBe('123');
});
