/**
 * Converts anything to a string and adds single quotes if input was already a string
 * @param value: the value to convert
 */
export function quoteString(value: any): string {
    return typeof value == 'string' ? `'${value}'` : String(value);
}
