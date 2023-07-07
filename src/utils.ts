/**
 * Converts anything to a string and adds single quotes if input was already a string
 * @param value: the value to convert
 */
export function quoteString(value: unknown): string {
    return typeof value == 'string' ? `'${value}'` : String(value);
}

/**
 * Return the file extension from an url string
 * @param url
 */
export function getUrlExtension(url?: string): string | undefined {
    return url?.split(/[#?]/)[0]?.split('.').pop()?.trim();
}
