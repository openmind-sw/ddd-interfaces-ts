import { RealEntity } from './AbstractEntityExamples';
import { NumberValue, StringValue } from './AbstractValueExamples';

test('Test entity composition', () => {
    const id = StringValue.create('Some-UUID');
    expect(RealEntity.create({ id }).id.value).toBe('Some-UUID');
    expect(RealEntity.create({ id, another: undefined }).id.value).toBe('Some-UUID');
    expect(RealEntity.create({ id, another: NumberValue.create(123) }).another?.value).toBe(123);
});

test('Test toString()', () => {
    const id = StringValue.create('Some-UUID');
    expect(
        RealEntity.create({
            id,
            another: NumberValue.create(123),
        }).toString(),
    ).toBe("{ id: 'Some-UUID', another: 123 }");
    expect(RealEntity.create({ id, another: undefined }).toString()).toBe("{ id: 'Some-UUID', another: undefined }");
});

test('Test toJSON()', () => {
    const id = StringValue.create('Some-UUID');
    expect(RealEntity.create({ id, another: NumberValue.create(123) }).toJSON()).toBe(
        '{"id":"Some-UUID","another":123}',
    );
    expect(RealEntity.create({ id, another: undefined }).toJSON()).toBe('{"id":"Some-UUID"}');
});
