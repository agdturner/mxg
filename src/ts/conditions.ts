import {
    TagWithAttributes, NodeWithNodes, NumberNode, StringNode
} from "./xml.js";

import {
    Molecule, MoleculeRef
} from "./molecule.js";

/**
 * A class for representing a Pressure and Temperature pair.
 */
export class PTpair extends TagWithAttributes {

    /**
     * The tag name.
     */
    static tagName: string = "me:PTpair";

    /**
     * The pressure also stored as a string in the attributes.
     */
    P: number;

    /**
     * The temperature also stored as a string in the attributes.
     */
    T: number;

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, PTpair.tagName);
        let p: string | undefined = attributes.get("P");
        if (p) {
            this.P = parseFloat(p);
        } else {
            throw new Error("P is undefined");
        }
        let t: string | undefined = attributes.get("T");
        if (t) {
            this.T = parseFloat(t);
        } else {
            throw new Error("T is undefined");
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
     * @param {PTpair[]} PTpairs The PT pairs.
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