import {
    TagWithAttributes, NodeWithNodes, NumberNode, StringNode
} from "./xml.js";

import {
    Molecule, MoleculeRef
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
    molecules: Map<string, Molecule>

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} moleculeID The moleculeID.
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes: Map<string, string>, moleculeID: string,
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
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value. 
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ExperimentRate.tagName, value);
    }
}

/**
 * A class for representing a Pressure and Temperature pair.
 */
export class PTpair extends NodeWithNodes {

    /**
     * The tag name.
     */
    static tagName: string = "me:PTpair";

    /**
     * The index. Keys are types and values are the node indexes.
     */
    index: Map<string, number>;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {BathGas | undefined} bathGas The bath gas.
     * @param {ExperimentRate | undefined} experimentRate The experiment rate.
     */
    constructor(attributes: Map<string, string>, bathGas?: BathGas, experimentRate?: ExperimentRate) {
        super(attributes, PTpair.tagName);
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
        let p: string | undefined = this.attributes.get("P");
        if (p) {
            return parseFloat(p);
        } else {
            throw new Error("P is undefined");
        }
    }

    /**
     * Set The Pressure
     */
    setP(p: number) {
        this.attributes.set("P", p.toString());
    }

    /**
     * @returns The Temperature.
     */
    getT(): number {
        let t: string | undefined = this.attributes.get("T");
        if (t) {
            return parseFloat(t);
        } else {
            throw new Error("T is undefined");
        }
    }
    
    /**
     * Set The Temperature.
     */
    setT(t: number) {
        this.attributes.set("T", t.toString());
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
     * The PT pairs.
     */
    pTpairs: PTpair[]

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PTpair[]} pTpairs The PT pairs.
     */
    constructor(attributes: Map<string, string>, pTpairs: PTpair[]) {
        super(attributes, PTs.tagName);
        pTpairs.forEach((pTpair) => {
            this.addNode(pTpair);
        });
        this.pTpairs = pTpairs;
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
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */
    constructor(attributes: Map<string, string>, bathGas: BathGas, pTs: PTs) {
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