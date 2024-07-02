"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = exports.PTs = exports.PTpair = exports.ExcessReactantConc = exports.ExperimentalEigenvalue = exports.ExperimentalYield = exports.ExperimentalRate = exports.BathGas = void 0;
const big_js_1 = __importDefault(require("big.js"));
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
 * A class for "me:experimentalRate".
 * The attributes should include:
 * "ref1" string
 * "ref2" string
 * "refReaction" string
 * "error".
 */
class ExperimentalRate extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:experimentalRate";
    /**
     * The key to the ref1 attribute value.
     */
    static s_ref1 = "ref1";
    /**
     * The key to the ref2 attribute value.
     */
    static s_ref2 = "ref2";
    /**
     * The key to the refReaction attribute value.
     */
    static s_refReaction = "refReaction";
    /**
     * The key to the error attribute value.
     */
    static s_error = "error";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExperimentalRate.tagName, value);
        /*
        if (!this.attributes.has(ExperimentalRate.s_ref1)) {
            console.error("ExperimentalRate.constructor: ref1 attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_ref2)) {
            console.error("ExperimentalRate.constructor: ref2 attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_refReaction)) {
            console.error("ExperimentalRate.constructor: refReaction attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_error)) {
            console.error("ExperimentalRate.constructor: error attribute is missing.");
        }
        */
    }
    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */
    getRef1() {
        return this.attributes.get(ExperimentalRate.s_ref1);
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */
    setRef1(ref1) {
        this.attributes.set(ExperimentalRate.s_ref1, ref1);
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */
    getRef2() {
        return this.attributes.get(ExperimentalRate.s_ref2);
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */
    setRef2(ref2) {
        this.attributes.set(ExperimentalRate.s_ref2, ref2);
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */
    getRefReaction() {
        return this.attributes.get(ExperimentalRate.s_refReaction);
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */
    setRefReaction(refReaction) {
        this.attributes.set(ExperimentalRate.s_refReaction, refReaction);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError() {
        return new big_js_1.default(this.attributes.get(ExperimentalRate.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error) {
        this.attributes.set(ExperimentalRate.s_error, error.toString());
    }
}
exports.ExperimentalRate = ExperimentalRate;
/**
 * A class for "me:experimentalYield".
 * The attributes should include:
 * "ref" string
 * "error" Big
 * "yieldTime" Big.
 */
class ExperimentalYield extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:experimentalYield";
    /**
     * The key to the ref attribute value.
     */
    static s_ref = "ref";
    /**
     * The key to the error attribute value.
     */
    static s_error = "error";
    /**
     * The key to the yieldTime attribute value.
     */
    static s_yieldTime = "yieldTime";
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
        return this.attributes.get(ExperimentalYield.s_ref);
    }
    /**
     * Set the ref attribute.
     * @param ref The ref.
     */
    setRef(ref) {
        this.attributes.set(ExperimentalYield.s_ref, ref);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError() {
        return new big_js_1.default(this.attributes.get(ExperimentalYield.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error) {
        this.attributes.set(ExperimentalYield.s_error, error.toString());
    }
    /**
     * @returns The yieldTime attribute or undefined if there is no yieldTime attribute.
     */
    getYieldTime() {
        return new big_js_1.default(this.attributes.get(ExperimentalYield.s_yieldTime));
    }
    /**
     * Set the yieldTime attribute.
     * @param yieldTime The yieldTime.
     */
    setYieldTime(yieldTime) {
        this.attributes.set(ExperimentalYield.s_yieldTime, yieldTime.toString());
    }
}
exports.ExperimentalYield = ExperimentalYield;
/**
 * A class for "me:experimentalEigenvalue".
 * The attributes should include:
 * EigenvalueID:string
 * error: number
 */
class ExperimentalEigenvalue extends xml_js_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:experimentalEigenvalue";
    /**
     * The key to the EigenvalueID attribute value.
     */
    static s_EigenvalueID = "EigenvalueID";
    /**
     * The key to the error attribute value.
     */
    static s_error = "error";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ExperimentalEigenvalue.tagName, value);
        /*
        if (!this.attributes.has(ExperimentalEigenvalue.s_EigenvalueID)) {
            console.error("ExperimentalEigenvalue.constructor: EigenvalueID attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalEigenvalue.s_error)) {
            console.error("ExperimentalEigenvalue.constructor: error attribute is missing.");
        }
        */
    }
    /**
     * @returns The EigenvalueID attribute.
     */
    getEigenvalueID() {
        return this.attributes.get(ExperimentalEigenvalue.s_EigenvalueID);
    }
    /**
     * Set the EigenvalueID attribute.
     * @param EigenvalueID The EigenvalueID.
     */
    setEigenvalueID(EigenvalueID) {
        this.attributes.set(ExperimentalEigenvalue.s_EigenvalueID, EigenvalueID);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError() {
        return new big_js_1.default(this.attributes.get(ExperimentalEigenvalue.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error) {
        this.attributes.set(ExperimentalEigenvalue.s_error, error.toString());
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
     * The key to the percent attribute value.
     */
    static s_percent = "percent";
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
        return this.attributes.get(ExcessReactantConc.s_percent);
    }
    /**
     * Set the percent attribute.
     * @param percent The percent.
     */
    setPercent(percent) {
        this.attributes.set(ExcessReactantConc.s_percent, percent);
    }
}
exports.ExcessReactantConc = ExcessReactantConc;
/**
 * A class for representing a Pressure and Temperature pair with optional additional things: BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
 * The attributes include:
 * units: string
 * P: Big
 * T: Big
 * And optionally:
 * percentExcessReactantConc: Big
 * excessReactantConc: string
 * precision: Big
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
     * The key to the P attribute value.
     */
    static s_P = "P";
    /**
     * The key to the T attribute value.
     */
    static s_T = "T";
    /**
     * The key to the precision attribute value.
     */
    static s_precision = "precision";
    /**
     * The key to the excessReactantConc attribute value.
     */
    static s_excessReactantConc = "excessReactantConc";
    /**
     * The key to the percentExcessReactantConc attribute value.
     */
    static s_percentExcessReactantConc = "percentExcessReactantConc";
    /**
     * The index. Keys are types and values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */
    constructor(attributes, bathGas, experimentRate, experimentalYield, experimentalEigenvalue) {
        super(attributes, PTpair.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set(ExperimentalRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (experimentalYield != undefined) {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(experimentalYield);
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
        let p = this.attributes.get(PTpair.s_P);
        if (p !== undefined) {
            return new big_js_1.default(p);
        }
    }
    /**
     * Set The Pressure
     */
    setP(p) {
        this.attributes.set(PTpair.s_P, p.toString());
    }
    /**
     * @returns The Temperature.
     */
    getT() {
        let t = this.attributes.get(PTpair.s_T);
        if (t !== undefined) {
            return new big_js_1.default(t);
        }
    }
    /**
     * Set The Temperature.
     */
    setT(t) {
        this.attributes.set(PTpair.s_T, t.toString());
    }
    /**
     * @returns The precision attribute or undefined if there is no precision attribute.
     */
    getPrecision() {
        return this.attributes.get(PTpair.s_precision);
    }
    /**
     * Set the precision attribute.
     * @param precision The precision.
     */
    setPrecision(precision) {
        this.attributes.set(PTpair.s_precision, precision);
    }
    /**
     * @returns The bath gas.
     */
    getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) {
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
        if (i != undefined) {
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
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(BathGas.tagName);
        }
    }
    /**
     * @returns The experiment rate.
     */
    getExperimentalRate() {
        let i = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        else {
            return undefined;
        }
    }
    /**
     * @param experimentRate The experiment rate.
     */
    setExperimentalRate(experimentRate) {
        let i = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            this.nodes.set(i, experimentRate);
        }
        else {
            this.index.set(ExperimentalRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * Remove the experiment rate.
     */
    removeExperimentalRate() {
        let i = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalRate.tagName);
        }
    }
    /**
     * @returns The experimental yield.
     */
    getExperimentalYield() {
        let i = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        else {
            return undefined;
        }
    }
    /**
     * @param experimentalYield The experimental yield.
     */
    setExperimentalYield(experimentalYield) {
        let i = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            this.nodes.set(i, experimentalYield);
        }
        else {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
    }
    /**
     * Remove the experimental yield.
     */
    removeExperimentalYield() {
        let i = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalYield.tagName);
        }
    }
    /**
     * @returns The experimental eigenvalue.
     */
    getExperimentalEigenvalue() {
        let i = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        else {
            return undefined;
        }
    }
    /**
     * @param experimentalEigenvalue The experimental eigenvalue.
     */
    setExperimentalEigenvalue(experimentalEigenvalue) {
        let i = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            this.nodes.set(i, experimentalEigenvalue);
        }
        else {
            this.index.set(ExperimentalEigenvalue.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * Remove the experimental eigenvalue.
     */
    removeExperimentalEigenvalue() {
        let i = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalEigenvalue.tagName);
        }
    }
    /**
     * @returns this.attributes.get("excessReactantConc").
     */
    getExcessReactantConc() {
        return this.attributes.get(PTpair.s_excessReactantConc);
    }
    /**
     * this.attributes.set("excessReactantConc", excessReactantConc).
     */
    setExcessReactantConc(excessReactantConc) {
        this.attributes.set(PTpair.s_excessReactantConc, excessReactantConc);
    }
    /**
     * @returns this.attributes.get("percentExcessReactantConc").
     */
    getPercentExcessReactantConc() {
        return this.attributes.get(PTpair.s_percentExcessReactantConc);
    }
    /**
     * this.attributes.set("percentExcessReactantConc", percentExcessReactantConc).
     */
    setPercentExcessReactantConc(percentExcessReactantConc) {
        this.attributes.set(PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
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
    ptps;
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
            this.ptps = pTpairs;
        }
        else {
            this.ptps = [];
        }
    }
    /**
     * Get the PTpair at the given index.
     *
     * @param i The index of the PTpair to return.
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */
    get(i) {
        return this.ptps[i];
    }
    /**
     * Set the PTpair at the given index.
     *
     * @param i The index.
     * @returns The PT pairs.
     */
    set(i, pTpair) {
        this.nodes.set(i, pTpair);
        this.ptps[i] = pTpair;
    }
    /**
     * Add a PTpair.
     *
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */
    add(pTpair) {
        this.addNode(pTpair);
        this.ptps.push(pTpair);
        return this.nodes.size - 1;
    }
    /**
     * Remove the PTpair at the given index.
     *
     * @param i The index.
     */
    remove(i) {
        this.nodes.delete(i);
        this.ptps.splice(i, 1);
    }
    /**
     * Initialise.
     *
     * @param pTPair The PTpair to add.
     */
    init(ptps) {
        this.clear();
        ptps.forEach((ptp) => {
            this.addNode(ptp);
            this.ptps.push(ptp);
        });
    }
    /**
     * Clear.
     */
    clear() {
        this.nodes.clear();
        this.ptps = [];
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
     * The id.
     */
    id;
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
    constructor(attributes, id, bathGases, pTs) {
        super(attributes, Conditions.tagName);
        this.id = id;
        this.index = new Map();
        this.bathGasesIndex = new Map();
        this.bathGases = new Map();
        if (bathGases != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            bathGases.forEach((bathGas) => {
                this.bathGasesIndex.set(bathGas.value, this.nodes.size);
                this.addNode(bathGas);
                this.bathGases.set(bathGas, bathGases.size);
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
            let index = this.bathGases.size;
            this.bathGases.set(bathGas, index);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
            return index;
        }
        else {
            return this.bathGases.get(bathGas);
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
//# sourceMappingURL=xml_conditions.js.map