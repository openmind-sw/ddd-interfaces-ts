import { AbstractValueObject } from '../../src/';

export class NumberValue extends AbstractValueObject<number> {
    public static create(value: any): NumberValue {
        return new NumberValue(value);
    }

    protected isValid(value: any): value is number {
        return typeof value == 'number';
    }

    protected normalize(value: any) {
        if (typeof value == 'string') {
            const asNumber = Number(value);
            if (!isNaN(asNumber)) {
                return asNumber;
            }
        }
        return value;
    }
}

export class StringValue extends AbstractValueObject<string> {
    public static create(value: any): StringValue {
        return new StringValue(value);
    }

    protected isValid(value: any): value is string {
        return typeof value == 'string' && value.length > 0;
    }
}

type TObjectValueObject = { valueObject: AbstractValueObject<string> | AbstractValueObject<string>[] };

export class ObjectValueObject extends AbstractValueObject<TObjectValueObject> {
    public static create(value: any): ObjectValueObject {
        return new ObjectValueObject(value);
    }

    protected isValid(value: any): value is TObjectValueObject {
        return true; // we only test json nesting with this
    }
}
