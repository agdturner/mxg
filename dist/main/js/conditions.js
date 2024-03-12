"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = exports.PTs = exports.PT = exports.ExperimentRate = exports.BathGas = void 0;
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
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     * @param molecules The molecules.
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
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExperimentRate.tagName, value);
    }
}
exports.ExperimentRate = ExperimentRate;
/**
 * A class for representing a Pressure and Temperature pair with optional BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
 */
class PT extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:PTpair";
    /**
     * The index. Keys are types and values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */
    constructor(attributes, bathGas, experimentRate) {
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
    getP() {
        if (this.attributes != undefined) {
            let p = this.attributes.get("P");
            if (p) {
                return parseFloat(p);
            }
            else {
                throw new Error("P is undefined");
            }
        }
        return NaN;
    }
    /**
     * Set The Pressure
     */
    setP(p) {
        if (this.attributes != undefined) {
            this.attributes.set("P", p.toString());
        }
    }
    /**
     * @returns The Temperature.
     */
    getT() {
        if (this.attributes != undefined) {
            let t = this.attributes.get("T");
            if (t) {
                return parseFloat(t);
            }
            else {
                throw new Error("T is undefined");
            }
        }
        return NaN;
    }
    /**
     * Set The Temperature.
     */
    setT(t) {
        if (this.attributes != undefined) {
            this.attributes.set("T", t.toString());
        }
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
     * @param bathGas The bath gas.
     */
    setBathGas(bathGas) {
        let i = this.index.get(BathGas.tagName);
        if (i) {
            this.nodes.set(i, bathGas);
        }
        else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
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
    /**
     * @param experimentRate The experiment rate.
     */
    setExperimentRate(experimentRate) {
        let i = this.index.get(ExperimentRate.tagName);
        if (i) {
            this.nodes.set(i, experimentRate);
        }
        else {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
}
exports.PT = PT;
/**
 * A class for representing a set of Pressure and Temperature pairs.
 */
class PTs extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:PTs";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PT[]} pTs The PTs.
     */
    constructor(attributes, pTs) {
        super(attributes, PTs.tagName);
        pTs.forEach((pTpair) => {
            this.addNode(pTpair);
        });
    }
    /**
     * @param index The index of the PT pair to return.
     * @returns The PT pair at the given index.
     */
    getPTpair(index) {
        return this.nodes.get(index);
    }
    /**
     * Set the PT at the given index.
     * @returns The PT pairs.
     */
    setPTpair(index, pT) {
        this.nodes.set(index, pT);
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     * @returns The index of the PT added.
     */
    addPTpair(pT) {
        return this.addNode(pT);
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
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
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