import Big from 'big.js';

/**
 * Get the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */
export function get(map: Map<any, any>, key: any): any {
    if (!map.has(key)) {
        throw new Error(`Key ${key} not found in map`);
    }
    return map.get(key);
}

/**
 * For getting a valid HTML id. HTML id attribute values must contain at least one character and must not 
 * contain any space characters. They also cannot start with a digit, two hyphens, or a hyphen followed by
 * a digit.
 * @param parts The parts of the ID.
 * @return A string ID composed of the parts joined by the delimiter.
 */
export function getID(...parts: any[]): string {
    // Convert the components to strings.
    let sparts = parts.map((part) => part.toString());
    // Join the parts with a hyphen.
    let id = sparts.join("-");
    // Replace any character that is not a letter (upper or lower case), a digit, a hyphen, or an underscore 
    // with an underscore. 
    let validId = id.replace(/[^a-zA-Z-_0-9]/g, '_');
    // If the first character is a digit, two hyphens, or a hyphen followed by a digit, add an underscore to 
    // the beginning of the ID.
    if (/^[0-9]|^--|-^[0-9]/.test(validId)) {
        validId = '_' + validId;
    }
    return validId;
}

/**
 * Linearly rescale a value from one range to another.
 * @param min The minimum value of the original range.
 * @param range The original range.
 * @param newMin The minimum value of the new range.
 * @param newRange The new range.
 * @param value The value to rescale.
 * @returns The rescaled value.
 */
export function rescale(min: number, range: number, newMin: number, newRange: number, value: number): number {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return ((value - min) * (newRange) / (range + 0.0)) + newMin;
}

/**
 * For convertina a map to a string.
 * @param map The map to convert to a string.
 * @param delimiter The (optional) delimiter.
 * @returns A string representation of all the entries in the map.
 */
export function mapToString(map: Map<any, any>, delimiter?: string): string {
    if (map == null) {
        return "";
    }
    if (delimiter == undefined) {
        delimiter = ', ';
    }
    return Array.from(map.entries()).map(([key, value]) =>
        `${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(delimiter);
}

/**
 * For converting an array to a string.
 * @param {any[]} array The array to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */
export function arrayToString(array: any[], delimiter?: string): string {
    if (delimiter == undefined) {
        delimiter = ', ';
    }
    return array.map((value) => value == null ? "null" : value.toString()).join(delimiter);
}

/**
 * For converting an array to a string.
 * @param {any[]} set The set to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */
export function setToString(set: Set<any>, delimiter?: string): string {
    if (delimiter == undefined) {
        delimiter = ', ';
    }
    return Array.from(set).map((value) => value == null ? "null" : value.toString()).join(delimiter);
}

/**
 * For converting a string array to a number array.
 * @param {string[]} s The string to convert to a number array.
 * @returns A number array.
 */
export function toNumberArray(s: string[]): Big[] {
    let r: Big[] = [];
    for (let i = 0; i < s.length; i++) {
        if (isNumeric(s[i])) {
            r.push(new Big(s[i]));
        }
    }
    return r;
}

/**
 * @param s The string to check.
 * @returns true iff s is a number.
 */
export function isNumeric(s: string): boolean {
    if (s === "") {
        return false;
    }
    return !isNaN(Number(s))
}

/**
 * For converting a number to a string.
 * @param n The number to convert to a string.
 */
export function numberToString(n: string): string {
    return bigToString(new Big(n));
}

/**
 * For converting a number to a string.
 * @param n The number to convert to a string.
 */
export function bigToString(x: Big): string {
    if (x.eq(0)) {
        return "0";
    }
    if (x.abs().gte(Number.MAX_SAFE_INTEGER)) {
        return x.toExponential();
    }
    if (x.abs().lt(0.0001)) {
        return x.toExponential();
    }
    // Get the integer and fractional parts.
    let parts: string[] = x.toFixed().split('.');
    // Get the integer part.
    //let integer: string = parts[0];
    // Get the fractional part.
    let fractional: string = parts[1];
    return x.toFixed(fractional.length);
}

/**
 * @param x A number to check.
 * @param y Another number to check.
 * @returns The maximum of x and y.
 */
export function max(x: Big | null, y: Big): Big {
    if (x == null) {
        return y;
    }
    if (x.lt(y)) {
        return y;
    }
    return x;
}

/**
 * @param x A number to check.
 * @param y Another number to check.
 * @returns The minimum of x and y.
 */
export function min(x: Big | null, y: Big): Big {
    if (x == null) {
        return y;
    }
    if (x.gt(y)) {
        return y;
    }
    return x;
}