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
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     */
    constructor(attributes, moleculeID) {
        super(attributes, BathGas.tagName, moleculeID);
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
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError() {
        if (this.attributes != undefined) {
            let error = this.attributes.get("error");
            if (error) {
                return parseFloat(error);
            }
        }
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error) {
        if (this.attributes != undefined) {
            this.attributes.set("error", error.toString());
        }
    }
}
exports.ExperimentRate = ExperimentRate;
/**
 * A class for representing a Pressure and Temperature pair with optional BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
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
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
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
        if (this.attributes != undefined) {
            let p = this.attributes.get("P");
            if (p != undefined) {
                return parseFloat(p);
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
            if (t != undefined) {
                return parseFloat(t);
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
     * @param attributes The attributes.
     * @param pTs The PTs.
     */
    constructor(attributes, pTs) {
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
    getPTpair(i) {
        return this.nodes.get(i);
    }
    /**
     * Set the PT at the given index.
     * @param i The index.
     * @returns The PT pairs.
     */
    setPTpair(i, pT) {
        this.nodes.set(i, pT);
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */
    addPTpair(pT) {
        this.addNode(pT);
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */
    addPTpairs(pTs) {
        pTs.forEach((pT) => {
            this.addNode(pT);
        });
    }
    /**
     * Remove the PT at the given index.
     * @param i The index.
     */
    removePTpair(i) {
        this.nodes.delete(i);
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
     * The index. The keys are the node names and the values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */
    constructor(attributes, bathGas, pTs) {
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
    getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param bathGas The bath gas.
     */
    setBathGas(bathGas) {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) {
            this.nodes.set(i, bathGas);
        }
        else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */
    getPTs() {
        let i = this.index.get(PTs.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param pTs The PTs.
     */
    setPTs(pTs) {
        let i = this.index.get(PTs.tagName);
        if (i != undefined) {
            this.nodes.set(i, pTs);
        }
        else {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
}
exports.Conditions = Conditions;
//# sourceMappingURL=conditions.js.map