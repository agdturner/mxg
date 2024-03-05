"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = exports.PTs = exports.PTpair = exports.ExperimentRate = exports.BathGas = void 0;
const xml_js_1 = require("./xml.js");
/**
 * A class for representing a bath gas reaction molecule.
 */
class BathGas extends xml_js_1.StringNode {
    /**
     * The tag name.
     */
    static tagName = "me:bathGas";
    /**
     * The molecules.
     */
    molecules;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} moleculeID The moleculeID.
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes, moleculeID, molecules) {
        super(attributes, BathGas.tagName, moleculeID);
        this.molecules = molecules;
    }
    getMolecule() {
        return this.molecules.get(this.value);
    }
}
exports.BathGas = BathGas;
/**
 * A class for representing an experiment rate.
 */
class ExperimentRate extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:experimentRate";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExperimentRate.tagName, value);
    }
}
exports.ExperimentRate = ExperimentRate;
/**
 * A class for representing a Pressure and Temperature pair.
 */
class PTpair extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:PTpair";
    /**
     * The index. Keys are types and values are the node indexes.
     */
    index;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {BathGas | undefined} bathGas The bath gas.
     * @param {ExperimentRate | undefined} experimentRate The experiment rate.
     */
    constructor(attributes, bathGas, experimentRate) {
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
    getP() {
        let p = this.attributes.get("P");
        if (p) {
            return parseFloat(p);
        }
        else {
            throw new Error("P is undefined");
        }
    }
    /**
     * Set The Pressure
     */
    setP(p) {
        this.attributes.set("P", p.toString());
    }
    /**
     * @returns The Temperature.
     */
    getT() {
        let t = this.attributes.get("T");
        if (t) {
            return parseFloat(t);
        }
        else {
            throw new Error("T is undefined");
        }
    }
    /**
     * Set The Temperature.
     */
    setT(t) {
        this.attributes.set("T", t.toString());
    }
    /**
     * @returns The bath gas.
     */
    getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i) {
            return this.nodes.get(i);
        }
        else {
            return undefined;
        }
    }
    /**
     * @returns The experiment rate.
     */
    getExperimentRate() {
        let i = this.index.get(ExperimentRate.tagName);
        if (i) {
            return this.nodes.get(i);
        }
        else {
            return undefined;
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
     * @param {PTpair[]} pTpairs The PT pairs.
     */
    constructor(attributes, pTpairs) {
        super(attributes, PTs.tagName);
        pTpairs.forEach((pTpair) => {
            this.addNode(pTpair);
        });
        this.pTpairs = pTpairs;
    }
}
exports.PTs = PTs;
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