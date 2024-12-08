"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.getID = getID;
exports.rescale = rescale;
exports.mapToString = mapToString;
exports.arrayToString = arrayToString;
exports.setToString = setToString;
exports.toNumberArray = toNumberArray;
exports.isNumeric = isNumeric;
exports.bigArrayToString = bigArrayToString;
exports.max = max;
exports.min = min;
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
/**
 * For converting a string array to a number array.
 * @param {string[]} s The string to convert to a number array.
 * @returns A number array.
 * @throws An error if any string in the array is not a number.
 */
function toNumberArray(s) {
    let r = [];
    for (let i = 0; i < s.length; i++) {
        r.push(new big_js_1.default(s[i]));
    }
    return r;
}
/**
 * @param s The string to check.
 * @returns true iff s is a number.
 */
function isNumeric(s) {
    try {
        let x = new big_js_1.default(s);
        return true;
    }
    catch (e) {
        return false;
    }
}
/**
 * For converting a string array to a number array.
 * @param xs The string to convert to a number array.
 * @returns A number array.
 */
function bigArrayToString(s, delimiter) {
    if (delimiter == undefined) {
        delimiter = ' ';
    }
    return s.map((value) => value.toString()).join(delimiter);
}
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
//# sourceMappingURL=util.js.map