"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.min = exports.max = exports.bigToString = exports.numberToString = exports.isNumeric = exports.toNumberArray = exports.setToString = exports.arrayToString = exports.mapToString = exports.rescale = exports.getID = exports.get = void 0;
const big_js_1 = __importDefault(require("big.js"));
/**
 * Get the value mapped to the key.
 * @param map The map to search in.
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */
function get(map, key) {
    if (!map.has(key)) {
        throw new Error(`Key ${key} not found in map`);
    }
    return map.get(key);
}
exports.get = get;
/**
 * For getting a valid HTML id. HTML id attribute values must contain at least one character and must not
 * contain any space characters. They also cannot start with a digit, two hyphens, or a hyphen followed by
 * a digit.
 * @param parts The parts of the ID.
 * @return A string ID composed of the parts joined by the delimiter.
 */
function getID(...parts) {
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
exports.getID = getID;
/**
 * Linearly rescale a value from one range to another.
 * @param min The minimum value of the original range.
 * @param range The original range.
 * @param newMin The minimum value of the new range.
 * @param newRange The new range.
 * @param value The value to rescale.
 * @returns The rescaled value.
 */
function rescale(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return ((value - min) * (newRange) / (range + 0.0)) + newMin;
}
exports.rescale = rescale;
/**
 * For convertina a map to a string.
 * @param map The map to convert to a string.
 * @param delimiter The (optional) delimiter.
 * @returns A string representation of all the entries in the map.
 */
function mapToString(map, delimiter) {
    if (map == null) {
        return "";
    }
    if (delimiter == undefined) {
        delimiter = ', ';
    }
    return Array.from(map.entries()).map(([key, value]) => `${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(delimiter);
}
exports.mapToString = mapToString;
/**
 * For converting an array to a string.
 * @param {any[]} array The array to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */
function arrayToString(array, delimiter) {
    if (delimiter == undefined) {
        delimiter = ', ';
    }
    return array.map((value) => value == null ? "null" : value.toString()).join(delimiter);
}
exports.arrayToString = arrayToString;
/**
 * For converting an array to a string.
 * @param {any[]} set The set to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */
function setToString(set, delimiter) {
    if (delimiter == undefined) {
        delimiter = ', ';
    }
    return Array.from(set).map((value) => value == null ? "null" : value.toString()).join(delimiter);
}
exports.setToString = setToString;
/**
 * For converting a string array to a number array.
 * @param {string[]} s The string to convert to a number array.
 * @returns A number array.
 */
function toNumberArray(s) {
    let r = [];
    for (let i = 0; i < s.length; i++) {
        if (isNumeric(s[i])) {
            r.push(parseFloat(s[i]));
            //} else {
            //    throw new Error(`toNumberArray: ${s[i]} is not a number`);
        }
    }
    return r;
}
exports.toNumberArray = toNumberArray;
/**
 * @param s The string to check.
 * @returns true iff s is a number.
 */
function isNumeric(s) {
    if (s === "") {
        return false;
    }
    return !isNaN(Number(s));
}
exports.isNumeric = isNumeric;
/**
 * For converting a number to a string.
 * @param n The number to convert to a string.
 */
function numberToString(n) {
    return bigToString(new big_js_1.default(n));
}
exports.numberToString = numberToString;
/**
 * For converting a number to a string.
 * @param n The number to convert to a string.
 */
function bigToString(x) {
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
    let parts = x.toFixed().split('.');
    // Get the integer part.
    //let integer: string = parts[0];
    // Get the fractional part.
    let fractional = parts[1];
    return x.toFixed(fractional.length);
}
exports.bigToString = bigToString;
/**
 * @param x A number to check.
 * @param y Another number to check.
 * @returns The maximum of x and y.
 */
function max(x, y) {
    if (x == null) {
        return y;
    }
    if (x.lt(y)) {
        return y;
    }
    return x;
}
exports.max = max;
/**
 * @param x A number to check.
 * @param y Another number to check.
 * @returns The minimum of x and y.
 */
function min(x, y) {
    if (x == null) {
        return y;
    }
    if (x.gt(y)) {
        return y;
    }
    return x;
}
exports.min = min;
//# sourceMappingURL=util.js.map