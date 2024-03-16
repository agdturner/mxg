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
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     */
    constructor(attributes: Map<string, string> | undefined, moleculeID: string) {
        super(attributes, BathGas.tagName, moleculeID);
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

    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError(): number | undefined {
        if (this.attributes != undefined) {
            let error: string | undefined = this.attributes.get("error");
            if (error) {
                return parseFloat(error);
            }
        }
    }

    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error: number) {
        if (this.attributes != undefined) {
            this.attributes.set("error", error.toString());
        }
    }

}

/**
 * A class for representing a Pressure and Temperature pair with optional BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
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
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
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
        if (this.attributes != undefined) {
            let p: string | undefined = this.attributes.get("P");
            if (p != undefined) {
                return parseFloat(p);
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
            if (t != undefined) {
                return parseFloat(t);
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
     * @param attributes The attributes.
     * @param pTs The PTs.
     */
    constructor(attributes: Map<string, string>, pTs?: PTpair[]) {
        super(attributes, PTs.tagName);
        if (pTs) {
            pTs.forEach((pTpair) => {
                this.addNode(pTpair);
            });
        }
    }

    /**
     * @param i The index of the PTpair to return. 
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */
    getPTpair(i: number): PTpair | undefined {
        return this.nodes.get(i) as PTpair;
    }

    /**
     * Set the PT at the given index.
     * @param i The index.
     * @returns The PT pairs.
     */
    setPTpair(i: number, pT: PTpair): void {
        this.nodes.set(i, pT);
    }

    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */
    addPTpair(pT: PTpair): void {
        this.addNode(pT);
    }

    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */
    addPTpairs(pTs: PTpair[]): void {
        pTs.forEach((pT) => {
            this.addNode(pT);
        });
    }

    /**
     * Remove the PT at the given index.
     * @param i The index.
     */
    removePTpair(i: number): void {
        this.nodes.delete(i);
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
     * The index. The keys are the node names and the values are the node indexes.
     */
    index : Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */
    constructor(attributes: Map<string, string> | undefined, bathGas?: BathGas, pTs?: PTs) {
        super(attributes, Conditions.tagName);
        this.index = new Map();
        if (bathGas) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (pTs) {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }

    /**
     * @returns The bath gas.
     */
    getBathGas(): BathGas | undefined {
        let i: number | undefined = this.index.get(BathGas.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as BathGas;
        }
    }

    /**
     * @param bathGas The bath gas.
     */
    setBathGas(bathGas: BathGas) {
        let i: number | undefined = this.index.get(BathGas.tagName);
        if (i != undefined) {
            this.nodes.set(i, bathGas);
        } else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }

    /**
     * @returns The Pressure and Temperature pairs.
     */
    getPTs(): PTs | undefined {
        let i: number | undefined = this.index.get(PTs.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PTs;
        }
    }

    /**
     * @param pTs The PTs.
     */
    setPTs(pTs: PTs) {
        let i: number | undefined = this.index.get(PTs.tagName);
        if (i != undefined) {
            this.nodes.set(i, pTs);
        } else {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
}