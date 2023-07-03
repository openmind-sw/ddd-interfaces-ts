import { AbstractValueObject } from '../../src/';

export class NumberValue extends AbstractValueObject<number> {
    public static create(this: any, value: any): NumberValue {
        return new this(value);
    }

    protected isValid(value: any): value is number {
        return typeof value == 'number';
    }

    protected validationErrorMessage(value: any): string {
        return `Invalid input: expected number, got '${value}'`;
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
    public static create(this: any, value: any): StringValue {
        return new this(value);
    }

    protected isValid(value: any): value is string {
        return typeof value == 'string' && value.length > 0;
    }

    protected validationErrorMessage(value: any): string {
        return `Invalid input: expected string, got '${value}'`;
    }
}
