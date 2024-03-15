import {
    NodeWithNodes, NumberNode
} from "./xml.js";

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
    static readonly tagName: string = "me:energyAboveTheTopHill";

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

    /**
     * The index.
     */
    index: Map<string, number>;

    constructor(attributes: Map<string, string> | undefined, grainSize?: GrainSize, energyAboveTheTopHill?: EnergyAboveTheTopHill) {
        super(attributes, ModelParameters.tagName);
        this.index = new Map<string, number>();
        if (grainSize != undefined) {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }

    /**
     * @returns The grain size or undefined.
     */
    getGrainSize(): GrainSize | undefined {
        let i: number | undefined = this.index.get(GrainSize.tagName);
        if (i) {
            return this.nodes.get(i) as GrainSize;
        }
    }

    /**
     * @param grainSize The grain size.
     */
    setGrainSize(grainSize: GrainSize) {
        let i: number | undefined = this.index.get(GrainSize.tagName);
        if (i) {
            this.nodes.set(i, grainSize);
        } else {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
    }

    /**
     * @returns The energy above the top hill or undefined.
     */
    getEnergyAboveTheTopHill(): EnergyAboveTheTopHill | undefined {
        let i: number | undefined = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i) {
            return this.nodes.get(i) as EnergyAboveTheTopHill;
        }
    }

    /**
     * @param energyAboveTheTopHill The energy above the top hill.
     */
    setEnergyAboveTheTopHill(energyAboveTheTopHill: EnergyAboveTheTopHill) {
        let i: number | undefined = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i) {
            this.nodes.set(i, energyAboveTheTopHill);
        } else {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }
}