import { AbstractValueObject } from '../../src/';

export class StringOnlyValue extends AbstractValueObject<string> {
    protected isValid(value: any): value is string {
        return typeof value == 'string' && value.length > 0;
    }

    protected validationErrorMessage(value: any): string {
        return `Invalid input: expected string, got '${value}'`;
    }
}

export class NumberValue extends AbstractValueObject<number> {
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
