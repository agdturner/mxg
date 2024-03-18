import {
    NodeWithNodes, NumberNode
} from "./xml.js";

/**
 * A class for "me:grainSize".
 */
export class GrainSize extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:grainSize";

    /**
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, GrainSize.tagName, value);
    }
}

/**
 * A class for "me:automaticallySetMaxEne".
 */
export class AutomaticallySetMaxEne extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:automaticallySetMaxEne";

    /**
     * @para attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, AutomaticallySetMaxEne.tagName, value);
    }
}

/**
 * A class for "me:energyAboveTheTopHill".
 */
export class EnergyAboveTheTopHill extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:energyAboveTheTopHill";

    /**
     * @para attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, EnergyAboveTheTopHill.tagName, value);
    }
}

/**
 * A class for "me:maxTemperature".
 */
export class MaxTemperature extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:maxTemperature";

    /**
     * @para attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, MaxTemperature.tagName, value);
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

    constructor(attributes: Map<string, string> | undefined, grainSize?: GrainSize, 
        automaticallySetMaxEne?: AutomaticallySetMaxEne, energyAboveTheTopHill?: EnergyAboveTheTopHill,
        maxTemperature?: MaxTemperature) {
        super(attributes, ModelParameters.tagName);
        this.index = new Map<string, number>();
        if (grainSize != undefined) {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (automaticallySetMaxEne != undefined) {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
        if (maxTemperature != undefined) {
            this.index.set(MaxTemperature.tagName, this.nodes.size);
            this.addNode(maxTemperature);
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
     * @returns The automatically set max energy or undefined.
     */
    getAutomaticallySetMaxEne(): AutomaticallySetMaxEne | undefined {
        let i: number | undefined = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i) {
            return this.nodes.get(i) as AutomaticallySetMaxEne;
        }
    }

    /**
     * @param automaticallySetMaxEne The automatically set max energy.
     */
    setAutomaticallySetMaxEne(automaticallySetMaxEne: AutomaticallySetMaxEne) {
        let i: number | undefined = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i) {
            this.nodes.set(i, automaticallySetMaxEne);
        } else {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
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

    /**
     * @returns The max temperature or undefined.
     */
    getMaxTemperature(): MaxTemperature | undefined {
        let i: number | undefined = this.index.get(MaxTemperature.tagName);
        if (i) {
            return this.nodes.get(i) as MaxTemperature;
        }
    }

    /**
     * @param maxTemperature The max temperature.
     */
    setMaxTemperature(maxTemperature: MaxTemperature) {
        let i: number | undefined = this.index.get(MaxTemperature.tagName);
        if (i) {
            this.nodes.set(i, maxTemperature);
        } else {
            this.index.set(MaxTemperature.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
}