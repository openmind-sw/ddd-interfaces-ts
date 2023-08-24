import { AbstractEntity } from '../../src';
import { NumberValue, StringValue } from './AbstractValueExamples';

type RealEntityProps = { id: StringValue; another?: NumberValue; someList?: StringValue[] };

export class RealEntity extends AbstractEntity<StringValue, RealEntityProps> {
    public static create(values: RealEntityProps): RealEntity {
        return new RealEntity(values);
    }

    public get another() {
        return this._values.another;
    }

    public get someList() {
        return this._values.someList;
    }
}

type NestedEntityProps = { id: StringValue; nested: AbstractEntity<StringValue, NestedEntityProps> | StringValue };

export class NestedEntity extends AbstractEntity<StringValue, NestedEntityProps> {
    public static create(values: NestedEntityProps): NestedEntity {
        return new NestedEntity(values);
    }

    public get nested() {
        return this._values.nested;
    }
}
