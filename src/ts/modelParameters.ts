import {
    NodeWithNodes, NumberNode
} from "./classes";

/**
 * A class for measures of grain size.
 */
export class GrainSize extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:grainSize";

    /**
     * @param {string} value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, GrainSize.tagName, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}

/**
 * A class for measures of grain size.
 */
export class EnergyAboveTheTopHill extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:EnergyAboveTheTopHill";

    /**
     * @param {string} value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, EnergyAboveTheTopHill.tagName, value);
    }
}

/**
 * A class for model parameters.
 */
export class ModelParameters extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:modelParameters";

    constructor(grainSize: GrainSize, energyAboveTheTopHill: EnergyAboveTheTopHill) {
        super(new Map<string, string>(), ModelParameters.tagName);
        this.addNode(grainSize);
        this.addNode(energyAboveTheTopHill);
    }

    /**
     * @returns The grain size.
     */
    getGrainSize(): GrainSize {
        return this.nodes.get(0) as GrainSize;
    }

    /**
     * @returns The energy above the top hill.
     */
    getEnergyAboveTheTopHill(): EnergyAboveTheTopHill {
        return this.nodes.get(1) as EnergyAboveTheTopHill;
    }
}