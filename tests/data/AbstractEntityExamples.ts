import { AbstractEntity } from '../../src';
import { NumberValue, StringValue } from './AbstractValueExamples';

type RealEntityProps = { id: StringValue; another?: NumberValue };

export class RealEntity extends AbstractEntity<StringValue, RealEntityProps> {
    public static create(this: any, values: RealEntityProps): RealEntity {
        return new this(values);
    }

    public get another() {
        return this._values.another;
    }
}
