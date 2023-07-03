import { AbstractEntity } from '../../src';
import { NumberValue, StringOnlyValue } from './AbstractValueExamples';

type RealEntityProps = { id: StringOnlyValue; another?: NumberValue };

export class RealEntity extends AbstractEntity<RealEntityProps> {
    public static create<RealEntityProps, RealEntity>(
        this: new (values: RealEntityProps) => RealEntity,
        values: RealEntityProps,
    ) {
        return new this(values);
    }

    public get another() {
        return this._values.another;
    }
}
