"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = exports.BathGas = exports.PTs = exports.PTpair = void 0;
const xml_js_1 = require("./xml.js");
const molecule_js_1 = require("./molecule.js");
/**
 * A class for representing a Pressure and Temperature pair.
 */
class PTpair extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "PTpair";
    /**
     * The pressure also stored as a string in the attributes.
     */
    P;
    /**
     * The temperature also stored as a string in the attributes.
     */
    T;
    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, PTpair.tagName);
        let p = attributes.get("P");
        if (p) {
            this.P = parseFloat(p);
        }
        else {
            throw new Error("P is undefined");
        }
        let t = attributes.get("T");
        if (t) {
            this.T = parseFloat(t);
        }
        else {
            throw new Error("T is undefined");
        }
    }
}
exports.PTpair = PTpair;
/**
 * A class for representing a set of Pressure and Temperature pairs.
 */
class PTs extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:PTs";
    /**
     * The PT pairs.
     */
    pTpairs;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PTpair[]} PTpairs The PT pairs.
     */
    constructor(attributes, pTpairs) {
        super(attributes, PTs.tagName);
        pTpairs.forEach((v) => {
            this.addNode(v);
        });
        this.pTpairs = pTpairs;
    }
}
exports.PTs = PTs;
/**
 * A class for representing a bath gas reaction molecule.
 */
class BathGas extends molecule_js_1.MoleculeRef {
    /**
     * The tag name.
     */
    static tagName = "me:bathGas";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes, molecule, molecules) {
        super(attributes, BathGas.tagName, molecule, molecules);
    }
}
exports.BathGas = BathGas;
/**
 * A class for representing the experiment conditions.
 */
class Conditions extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:conditions";
    /**
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */
    constructor(attributes, bathGas, pTs) {
        super(attributes, Conditions.tagName);
        this.addNode(bathGas);
        this.addNode(pTs);
    }
    /**
     * @returns The bath gas.
     */
    getBathGas() {
        return this.nodes.get(0);
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */
    getPTs() {
        return this.nodes.get(1);
    }
}
exports.Conditions = Conditions;
//# sourceMappingURL=conditions.js.map