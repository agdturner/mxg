"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeNode = void 0;
const big_js_1 = require("big.js");
const xml_1 = require("./xml");
/**
 * An abstract class for a range.
 * The attributes may include:
 * "units"
 * "lower"
 * "upper"
 * "stepsize"
 */
class RangeNode extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName;
    /**
     * The key for the units attribute.
     */
    static s_units = "units";
    /**
     * The key for the lower attribute.
     */
    static s_lower = "lower";
    /**
     * The key for the upper attribute.
     */
    static s_upper = "upper";
    /**
     * The key for the stepsize attribute.
     */
    static s_stepsize = "stepsize";
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param value The value.
     */
    constructor(attributes, tagName, value) {
        super(attributes, tagName, value);
    }
    /**
     * @param value The value of the Range.
     */
    setValue(value) {
        this.value = value;
    }
    /**
     * @returns The units of the Range.
     */
    getUnits() {
        return this.attributes.get(RangeNode.s_units);
    }
    /**
     * @param units The units of the Range.
     */
    setUnits(units) {
        this.attributes.set(RangeNode.s_units, units);
    }
    /**
     * Remove the units attribute.
     */
    removeUnits() {
        this.attributes.delete(RangeNode.s_units);
    }
    /**
     * @returns The lower of the Range.
     */
    getLower() {
        let lower = this.attributes.get(RangeNode.s_lower);
        if (lower != undefined) {
            return new big_js_1.Big(lower);
        }
    }
    /**
     * @param lower The lower of the Range.
     */
    setLower(lower) {
        this.attributes.set(RangeNode.s_lower, lower.toString());
    }
    /**
     * Remove the lower attribute.
     */
    removeLower() {
        this.attributes.delete(RangeNode.s_lower);
    }
    /**
     * @returns The upper of the Range.
     */
    getUpper() {
        let upper = this.attributes.get(RangeNode.s_upper);
        if (upper != undefined) {
            return new big_js_1.Big(upper);
        }
    }
    /**
     * @param upper The upper of the Range.
     */
    setUpper(upper) {
        this.attributes.set(RangeNode.s_upper, upper.toString());
    }
    /**
     * Remove the upper attribute.
     */
    removeUpper() {
        this.attributes.delete(RangeNode.s_upper);
    }
    /**
     * @returns The stepsize of the Range.
     */
    getStepsize() {
        let stepsize = this.attributes.get(RangeNode.s_stepsize);
        if (stepsize != undefined) {
            return new big_js_1.Big(stepsize);
        }
    }
    /**
     * @param stepsize The stepsize of the Range.
     */
    setStepsize(stepsize) {
        this.attributes.set(RangeNode.s_stepsize, stepsize.toString());
    }
    /**
     * Remove the stepsize attribute.
     */
    removeStepsize() {
        this.attributes.delete(RangeNode.s_stepsize);
    }
}
exports.RangeNode = RangeNode;
//# sourceMappingURL=xml_range.js.map