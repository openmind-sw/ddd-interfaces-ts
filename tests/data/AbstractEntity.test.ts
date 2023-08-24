import { NestedEntity, RealEntity } from './AbstractEntityExamples';
import { NumberValue, StringValue } from './AbstractValueExamples';

const someList = [StringValue.create('Hello'), StringValue.create('World')];

test('Test entity composition', () => {
    const id = StringValue.create('Some-UUID');
    expect(RealEntity.create({ id }).id.value).toBe('Some-UUID');
    expect(RealEntity.create({ id, another: undefined }).id.value).toBe('Some-UUID');
    expect(RealEntity.create({ id, another: NumberValue.create(123) }).another?.value).toBe(123);
    expect(RealEntity.create({ id, someList }).someList).toHaveLength(2);
});

test('Test toString()', () => {
    const id = StringValue.create('Some-UUID');
    expect(
        RealEntity.create({
            id,
            another: NumberValue.create(123),
            someList,
        }).toString(),
    ).toBe("{ id: 'Some-UUID', another: 123, someList: ['Hello', 'World'] }");
    expect(
        RealEntity.create({
            id,
            another: undefined,
            someList: undefined,
        }).toString(),
    ).toBe("{ id: 'Some-UUID', another: undefined, someList: undefined }");
});

test('Test toJSON()', () => {
    const id = StringValue.create('Some-UUID');
    expect(JSON.stringify(RealEntity.create({ id, another: NumberValue.create(123), someList }))).toBe(
        '{"id":"Some-UUID","another":123,"someList":["Hello","World"]}',
    );
    expect(JSON.stringify(RealEntity.create({ id, another: undefined, someList: undefined }))).toBe(
        '{"id":"Some-UUID"}',
    );
    expect(
        JSON.stringify(
            NestedEntity.create({
                id,
                nested: NestedEntity.create({ id, nested: StringValue.create('value') }),
            }),
        ),
    ).toBe('{"id":"Some-UUID","nested":{"id":"Some-UUID","nested":"value"}}');
});
