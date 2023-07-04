import { NumberValue, StringValue } from './AbstractValueExamples';

test('Test value', () => {
    expect(NumberValue.create(123).value).toBe(123);
    expect(NumberValue.create('456').value).toBe(456);
    expect(StringValue.create('MyTestString').value).toBe('MyTestString');
});

test('Test validation', () => {
    expect(() => NumberValue.create('value')).toThrow("Unexpected value for NumberValue: 'value'");
    expect(() => StringValue.create(123)).toThrow("Unexpected value for StringValue: 123");
    expect(() => StringValue.create(false)).toThrow("Unexpected value for StringValue: false");
    expect(() => StringValue.create('')).toThrow("Unexpected value for StringValue: ''");
});

test('Test toJSON()', () => {
    expect(NumberValue.create(123).toJSON()).toBe('123');
    expect(StringValue.create('hello world').toJSON()).toBe('"hello world"');
});
