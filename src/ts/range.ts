import Big from "big.js";
import { NumberNode } from "./xml";

/**
 * An abstract class for a range.
 * The attributes may include:
 * "units"
 * "lower"
 * "upper"
 * "stepsize"
 */
export abstract class RangeNode extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string;

    /**
     * The key for the units attribute.
     */
    static readonly s_units: string = "units";

    /**
     * The key for the lower attribute.
     */
    static readonly s_lower: string = "lower";

    /**
     * The key for the upper attribute.
     */
    static readonly s_upper: string = "upper";

    /**
     * The key for the stepsize attribute.
     */
    static readonly s_stepsize: string = "stepsize";

    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, tagName: string, value: Big) {
        super(attributes, tagName, value);
    }

    /**
     * @param value The value of the Range.
     */
    setValue(value: Big): void {
        this.value = value;
    }

    /**
     * @returns The units of the Range.
     */
    getUnits(): string | undefined {
        return this.attributes.get(RangeNode.s_units);
    }

    /**
     * @param units The units of the Range.
     */
    setUnits(units: string): void {
        this.attributes.set(RangeNode.s_units, units);
    }

    /**
     * Remove the units attribute.
     */
    removeUnits(): void {
        this.attributes.delete(RangeNode.s_units);
    }

    /**
     * @returns The lower of the Range.
     */
    getLower(): Big | undefined {
        let lower: string | undefined = this.attributes.get(RangeNode.s_lower);
        if (lower != undefined) {
            return new Big(lower);
        }
    }

    /**
     * @param lower The lower of the Range.
     */
    setLower(lower: Big): void {
        this.attributes.set(RangeNode.s_lower, lower.toString());
    }

    /**
     * Remove the lower attribute.
     */
    removeLower(): void {
        this.attributes.delete(RangeNode.s_lower);
    }

    /**
     * @returns The upper of the Range.
     */
    getUpper(): Big | undefined {
        let upper: string | undefined = this.attributes.get(RangeNode.s_upper);
        if (upper != undefined) {
            return new Big(upper);
        }
    }

    /**
     * @param upper The upper of the Range.
     */
    setUpper(upper: Big): void {
        this.attributes.set(RangeNode.s_upper, upper.toString());
    }

    /**
     * Remove the upper attribute.
     */
    removeUpper(): void {
        this.attributes.delete(RangeNode.s_upper);
    }

    /**
     * @returns The stepsize of the Range.
     */
    getStepsize(): Big | undefined {
        let stepsize: string | undefined = this.attributes.get(RangeNode.s_stepsize);
        if (stepsize != undefined) {
            return new Big(stepsize);
        }
    }

    /**
     * @param stepsize The stepsize of the Range.
     */
    setStepsize(stepsize: Big): void {
        this.attributes.set(RangeNode.s_stepsize, stepsize.toString());
    }

    /**
     * Remove the stepsize attribute.
     */
    removeStepsize(): void {
        this.attributes.delete(RangeNode.s_stepsize);
    }
}