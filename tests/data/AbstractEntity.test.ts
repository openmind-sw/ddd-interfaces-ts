import { RealEntity } from './AbstractEntityExamples';
import { NumberValue, StringOnlyValue } from './AbstractValueExamples';

test('Test entity composition', () => {
    const id = StringOnlyValue.create('Some-UUID');
    expect(RealEntity.create({ id }).id.value).toBe('Some-UUID');
    expect(RealEntity.create({ id, another: undefined }).id.value).toBe('Some-UUID');
    expect(RealEntity.create({ id, another: NumberValue.create(123) }).another?.value).toBe(123);
});
