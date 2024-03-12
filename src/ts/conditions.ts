import {
    TagWithAttributes, NodeWithNodes, NumberNode, StringNode
} from "./xml.js";

import {
    Molecule
} from "./molecule.js";

/**
 * A class for representing a bath gas reaction molecule.
 */
export class BathGas extends StringNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:bathGas";

    /**
     * The molecules.
     */
    molecules: Map<string, Molecule>;

    /**
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     * @param molecules The molecules.
     */
    constructor(attributes: Map<string, string> | undefined, moleculeID: string,
        molecules: Map<string, Molecule>) {
        super(attributes, BathGas.tagName, moleculeID);
        this.molecules = molecules;
    }

    getMolecule(): Molecule {
        return this.molecules.get(this.value) as Molecule;
    }
}

/**
 * A class for representing an experiment rate.
 */
export class ExperimentRate extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:experimentRate";

    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */
    constructor(attributes: Map<string, string> | undefined, value: number) {
        super(attributes, ExperimentRate.tagName, value);
    }
}

/**
 * A class for representing a Pressure and Temperature pair with optional BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
 */
export class PT extends NodeWithNodes {

    /**
     * The tag name.
     */
    static tagName: string = "me:PTpair";

    /**
     * The index. Keys are types and values are the node indexes.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */
    constructor(attributes: Map<string, string>, bathGas?: BathGas, experimentRate?: ExperimentRate) {
        super(attributes, PT.tagName);
        this.index = new Map();
        if (bathGas) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate) {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }

    /**
     * @returns The Pressure.
     */
    getP(): number {
        if (this.attributes != undefined) {
            let p: string | undefined = this.attributes.get("P");
            if (p) {
                return parseFloat(p);
            } else {
                throw new Error("P is undefined");
            }
        }
        return NaN;
    }

    /**
     * Set The Pressure
     */
    setP(p: number) {
        if (this.attributes != undefined) {
            this.attributes.set("P", p.toString());
        }
    }

    /**
     * @returns The Temperature.
     */
    getT(): number {
        if (this.attributes != undefined) {
            let t: string | undefined = this.attributes.get("T");
            if (t) {
                return parseFloat(t);
            } else {
                throw new Error("T is undefined");
            }
        }
        return NaN;
    }

    /**
     * Set The Temperature.
     */
    setT(t: number) {
        if (this.attributes != undefined) {
            this.attributes.set("T", t.toString());
        }
    }

    /**
     * @returns The bath gas.
     */
    getBathGas(): BathGas | undefined {
        let i: number | undefined = this.index.get(BathGas.tagName);
        if (i) {
            return this.nodes.get(i) as BathGas;
        } else {
            return undefined;
        }
    }

    /**
     * @param bathGas The bath gas.
     */
    setBathGas(bathGas: BathGas) {
        let i: number | undefined = this.index.get(BathGas.tagName);
        if (i) {
            this.nodes.set(i, bathGas);
        } else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }

    /**
     * @returns The experiment rate.
     */
    getExperimentRate(): ExperimentRate | undefined {
        let i: number | undefined = this.index.get(ExperimentRate.tagName);
        if (i) {
            return this.nodes.get(i) as ExperimentRate;
        } else {
            return undefined;
        }
    }

    /**
     * @param experimentRate The experiment rate.
     */
    setExperimentRate(experimentRate: ExperimentRate) {
        let i: number | undefined = this.index.get(ExperimentRate.tagName);
        if (i) {
            this.nodes.set(i, experimentRate);
        } else {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
}

/**
 * A class for representing a set of Pressure and Temperature pairs.
 */
export class PTs extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:PTs";

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PT[]} pTs The PTs.
     */
    constructor(attributes: Map<string, string>, pTs: PT[]) {
        super(attributes, PTs.tagName);
        pTs.forEach((pTpair) => {
            this.addNode(pTpair);
        });
    }

    /**
     * @param index The index of the PT pair to return.
     * @returns The PT pair at the given index.
     */
    getPTpair(index: number): PT {
        return this.nodes.get(index) as PT;
    }

    /**
     * Set the PT at the given index.
     * @returns The PT pairs.
     */
    setPTpair(index: number, pT: PT): void {
        this.nodes.set(index, pT);
    }

    /**
     * Add a PT.
     * @param pTPair The PT to add.
     * @returns The index of the PT added.
     */
    addPTpair(pT: PT): number {
        return this.addNode(pT);
    }
}

/**
 * A class for representing the experiment conditions.
 */
export class Conditions extends NodeWithNodes {

    /**
     * The tag name.
     */
    static tagName: string = "me:conditions";

    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */
    constructor(attributes: Map<string, string> | undefined, bathGas: BathGas, pTs: PTs) {
        super(attributes, Conditions.tagName);
        this.addNode(bathGas);
        this.addNode(pTs);
    }

    /**
     * @returns The bath gas.
     */
    getBathGas(): BathGas {
        return this.nodes.get(0) as BathGas;
    }

    /**
     * @returns The Pressure and Temperature pairs.
     */
    getPTs(): PTs {
        return this.nodes.get(1) as PTs;
    }
}