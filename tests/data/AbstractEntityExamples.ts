import { AbstractEntity } from '../../src';
import { NumberValue, StringValue } from './AbstractValueExamples';

type RealEntityProps = { id: StringValue; another?: NumberValue };

export class RealEntity extends AbstractEntity<StringValue, RealEntityProps> {
    public static create(values: RealEntityProps): RealEntity {
        return new RealEntity(values);
    }

    public get another() {
        return this._values.another;
    }
}
