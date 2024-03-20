"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = exports.PTs = exports.PTpair = exports.ExcessReactantConc = exports.ExperimentalEigenvalue = exports.ExperimentalYield = exports.ExperimentRate = exports.BathGas = void 0;
const xml_js_1 = require("./xml.js");
/**
 * A class for "me:bathGas".
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
 * A class for "me:experimentRate".
 * The attributes may include ref1, ref2, refReaction, and error.
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
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */
    getRef1() {
        if (this.attributes != undefined) {
            return this.attributes.get("ref1");
        }
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */
    setRef1(ref1) {
        if (this.attributes != undefined) {
            this.attributes.set("ref1", ref1);
        }
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */
    getRef2() {
        if (this.attributes != undefined) {
            return this.attributes.get("ref2");
        }
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */
    setRef2(ref2) {
        if (this.attributes != undefined) {
            this.attributes.set("ref2", ref2);
        }
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */
    getRefReaction() {
        if (this.attributes != undefined) {
            return this.attributes.get("refReaction");
        }
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */
    setRefReaction(refReaction) {
        if (this.attributes != undefined) {
            this.attributes.set("refReaction", refReaction);
        }
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
 * A class for "me:experimentalYield".
 * The attributes may include:
 * ref:string
 * error: number
 * yieldTime: number.
 */
class ExperimentalYield extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:experimentalYield";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExperimentalYield.tagName, value);
    }
    /**
     * @returns The ref attribute or undefined if there is no ref attribute.
     */
    getRef() {
        if (this.attributes != undefined) {
            return this.attributes.get("ref");
        }
    }
    /**
     * Set the ref attribute.
     * @param ref The ref.
     */
    setRef(ref) {
        if (this.attributes != undefined) {
            this.attributes.set("ref", ref);
        }
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
    /**
     * @returns The yieldTime attribute or undefined if there is no yieldTime attribute.
     */
    getYieldTime() {
        if (this.attributes != undefined) {
            let yieldTime = this.attributes.get("yieldTime");
            if (yieldTime) {
                return parseFloat(yieldTime);
            }
        }
    }
    /**
     * Set the yieldTime attribute.
     * @param yieldTime The yieldTime.
     */
    setYieldTime(yieldTime) {
        if (this.attributes != undefined) {
            this.attributes.set("yieldTime", yieldTime.toString());
        }
    }
}
exports.ExperimentalYield = ExperimentalYield;
/**
 * A class for "me:experimentalEigenvalue".
 * The attributes may include:
 * EigenvalueID:string
 * error: number
 */
class ExperimentalEigenvalue extends xml_js_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:experimentalEigenvalue";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExperimentalEigenvalue.tagName, value);
    }
    /**
     * @returns The EigenvalueID attribute or undefined if there is no EigenvalueID attribute.
     */
    getEigenvalueID() {
        if (this.attributes != undefined) {
            return this.attributes.get("EigenvalueID");
        }
    }
    /**
     * Set the EigenvalueID attribute.
     * @param EigenvalueID The EigenvalueID.
     */
    setEigenvalueID(EigenvalueID) {
        if (this.attributes != undefined) {
            this.attributes.set("EigenvalueID", EigenvalueID);
        }
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
exports.ExperimentalEigenvalue = ExperimentalEigenvalue;
/**
 * A class for "me:excessReactantConc".
 * The attributes may include:
 * percent: string ("true" or "false")
 */
class ExcessReactantConc extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:excessReactantConc";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExcessReactantConc.tagName, value);
    }
    /**
     * @returns The percent attribute or undefined if there is no percent attribute.
     */
    getPercent() {
        if (this.attributes != undefined) {
            return this.attributes.get("percent");
        }
    }
    /**
     * Set the percent attribute.
     * @param percent The percent.
     */
    setPercent(percent) {
        if (this.attributes != undefined) {
            this.attributes.set("percent", percent);
        }
    }
}
exports.ExcessReactantConc = ExcessReactantConc;
/**
 * A class for representing a Pressure and Temperature pair with optional additional things: BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
 * The attributes include:
 * units: string
 * P: number
 * T: number
 * And optionally:
 * percentExcessReactantConc: number
 * excessReactantConc: string
 * precision: number
 * bathGas: string
 * If excessReactantConc="true" then the node contains a node of type "me:excessReactantConc".
 *
 */
class PTpair extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:PTpair";
    /**
     * The precision attribute potential values.
     */
    static precisions = ["d", "dd", "qd", "double", "double-double", "quad-double"];
    /**
     * The index. Keys are types and values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */
    constructor(attributes, bathGas, experimentRate, excessReactantConc, experimentalEigenvalue) {
        super(attributes, PTpair.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (excessReactantConc != undefined) {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
        if (experimentalEigenvalue != undefined) {
            this.index.set(ExperimentalEigenvalue.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
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
     * @returns The precision attribute or undefined if there is no precision attribute.
     */
    getPrecision() {
        if (this.attributes != undefined) {
            return this.attributes.get("precision");
        }
    }
    /**
     * Set the precision attribute.
     * @param precision The precision.
     */
    setPrecision(precision) {
        if (this.attributes != undefined) {
            this.attributes.set("precision", precision);
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
     * Remove the bath gas.
     */
    removeBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i) {
            this.nodes.delete(i);
            this.index.delete(BathGas.tagName);
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
    /**
     * Remove the experiment rate.
     */
    removeExperimentRate() {
        let i = this.index.get(ExperimentRate.tagName);
        if (i) {
            this.nodes.delete(i);
            this.index.delete(ExperimentRate.tagName);
        }
    }
    /**
     * @returns this.attributes.get("excessReactantConc").
     */
    getExcessReactantConc() {
        if (this.attributes != undefined) {
            return this.attributes.get("excessReactantConc");
        }
    }
    /**
     * this.attributes.set("excessReactantConc", excessReactantConc).
     */
    setExcessReactantConc(excessReactantConc) {
        if (this.attributes != undefined) {
            this.attributes.set("excessReactantConc", excessReactantConc);
        }
    }
    /**
     * @returns this.attributes.get("percentExcessReactantConc").
     */
    getPercentExcessReactantConc() {
        if (this.attributes != undefined) {
            return this.attributes.get("percentExcessReactantConc");
        }
    }
    /**
     * this.attributes.set("percentExcessReactantConc", percentExcessReactantConc).
     */
    setPercentExcessReactantConc(percentExcessReactantConc) {
        if (this.attributes != undefined) {
            this.attributes.set("percentExcessReactantConc", percentExcessReactantConc);
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
     * The Pressure and Temperature pairs.
     */
    pTpairs;
    /**
     * @param attributes The attributes.
     * @param pTs The PTs.
     */
    constructor(attributes, pTpairs) {
        super(attributes, PTs.tagName);
        if (pTpairs != undefined) {
            pTpairs.forEach((pTpair) => {
                this.addNode(pTpair);
            });
            this.pTpairs = pTpairs;
        }
        else {
            this.pTpairs = [];
        }
    }
    /**
     * @param i The index of the PTpair to return.
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */
    getPTpair(i) {
        return this.pTpairs[i];
    }
    /**
     * Set the PT at the given index.
     * @param i The index.
     * @returns The PT pairs.
     */
    setPTpair(i, pTpair) {
        this.nodes.set(i, pTpair);
        this.pTpairs[i] = pTpair;
    }
    /**
     * Add a PTpair.
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */
    addPTpair(pTpair) {
        this.addNode(pTpair);
        this.pTpairs.push(pTpair);
        return this.nodes.size - 1;
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */
    setPTpairs(pTpairs) {
        this.nodes.clear();
        pTpairs.forEach((pTpair) => {
            this.addNode(pTpair);
            this.pTpairs.push(pTpair);
        });
    }
    /**
     * Remove the PT at the given index.
     * @param i The index.
     */
    removePTpair(i) {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
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
     * The bath gases index. The keys are the molecule IDs and the values are the node indexes.
     */
    bathGasesIndex;
    /**
     * The bath gases.
     */
    bathGases;
    /**
     * @param attributes The attributes.
     * @param bathGases The bath gases.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */
    constructor(attributes, bathGases, pTs) {
        super(attributes, Conditions.tagName);
        this.index = new Map();
        this.bathGasesIndex = new Map();
        this.bathGases = new Set();
        if (bathGases != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            bathGases.forEach((bathGas) => {
                this.bathGasesIndex.set(bathGas.value, this.nodes.size);
                this.addNode(bathGas);
                this.bathGases.add(bathGas);
            });
        }
        if (pTs != undefined) {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
    /**
     * @returns The bath gases.
     */
    getBathGases() {
        return this.bathGases;
    }
    /**
     * @param bathGas The bath gas to add.
     */
    addBathGas(bathGas) {
        if (!this.bathGases.has(bathGas)) {
            this.bathGases.add(bathGas);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @param bathGas The bath gas to remove.
     */
    removeBathGas(bathGas) {
        if (this.bathGases.has(bathGas)) {
            this.bathGases.delete(bathGas);
            this.nodes.delete(this.bathGasesIndex.get(bathGas.value));
        }
        else {
            console.warn("Conditions.removeBathGas: bathGas not found to remove.");
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