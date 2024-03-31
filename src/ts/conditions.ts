import {
    NodeWithNodes, NumberNode, StringNode
} from "./xml.js";

/**
 * A class for "me:bathGas".
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
    constructor(attributes: Map<string, string>, moleculeID: string) {
        super(attributes, BathGas.tagName, moleculeID);
    }
}

/**
 * A class for "me:experimentalRate".
 * The attributes must include:
 * "ref1" string
 * "ref2" string
 * "refReaction" string
 * "error".
 */
export class ExperimentalRate extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:experimentalRate";

    /**
     * The key to the ref1 attribute value.
     */
    static readonly s_ref1: string = "ref1";

    /**
     * The key to the ref2 attribute value.
     */
    static readonly s_ref2: string = "ref2";

    /**
     * The key to the refReaction attribute value.
     */
    static readonly s_refReaction: string = "refReaction";

    /**
     * The key to the error attribute value.
     */
    static readonly s_error: string = "error";

    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ExperimentalRate.tagName, value);
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
    }

    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */
    getRef1(): string {
        return this.attributes.get(ExperimentalRate.s_ref1) as string;
    }

    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */
    setRef1(ref1: string) {
        this.attributes.set(ExperimentalRate.s_ref1, ref1);
    }

    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */
    getRef2(): string {
        return this.attributes.get(ExperimentalRate.s_ref2) as string;
    }

    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */
    setRef2(ref2: string) {
        this.attributes.set(ExperimentalRate.s_ref2, ref2);
    }

    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */
    getRefReaction(): string {
        return this.attributes.get(ExperimentalRate.s_refReaction) as string;
    }

    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */
    setRefReaction(refReaction: string) {
        this.attributes.set(ExperimentalRate.s_refReaction, refReaction);
    }

    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError(): number {
        return parseFloat(this.attributes.get(ExperimentalRate.s_error) as string);
    }

    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error: number) {
        this.attributes.set(ExperimentalRate.s_error, error.toString());
    }
}

/**
 * A class for "me:experimentalYield".
 * The attributes must include:
 * "ref" string
 * "error" number
 * "yieldTime" number.
 */
export class ExperimentalYield extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:experimentalYield";

    /**
     * The key to the ref attribute value.
     */
    static readonly s_ref: string = "ref";

    /**
     * The key to the error attribute value.
     */
    static readonly s_error: string = "error";

    /**
     * The key to the yieldTime attribute value.
     */
    static readonly s_yieldTime: string = "yieldTime";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ExperimentalYield.tagName, value);
    }

    /**
     * @returns The ref attribute or undefined if there is no ref attribute.
     */
    getRef(): string {
        return this.attributes.get(ExperimentalYield.s_ref) as string;
    }

    /**
     * Set the ref attribute.
     * @param ref The ref.
     */
    setRef(ref: string) {
        this.attributes.set(ExperimentalYield.s_ref, ref);
    }

    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError(): number {
        return parseFloat(this.attributes.get(ExperimentalYield.s_error) as string);
    }

    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error: number) {
        this.attributes.set(ExperimentalYield.s_error, error.toString());
    }

    /**
     * @returns The yieldTime attribute or undefined if there is no yieldTime attribute.
     */
    getYieldTime(): number {
        return parseFloat(this.attributes.get(ExperimentalYield.s_yieldTime) as string);
    }

    /**
     * Set the yieldTime attribute.
     * @param yieldTime The yieldTime.
     */
    setYieldTime(yieldTime: number) {
        this.attributes.set(ExperimentalYield.s_yieldTime, yieldTime.toString());
    }
}

/**
 * A class for "me:experimentalEigenvalue".
 * The attributes must include:
 * EigenvalueID:string
 * error: number
 */
export class ExperimentalEigenvalue extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:experimentalEigenvalue";

    /**
     * The key to the EigenvalueID attribute value.
     */
    static readonly s_EigenvalueID = "EigenvalueID";

    /**
     * The key to the error attribute value.
     */
    static readonly s_error: string = "error";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ExperimentalEigenvalue.tagName, value);
        if (!this.attributes.has(ExperimentalEigenvalue.s_EigenvalueID)) {
            console.error("ExperimentalEigenvalue.constructor: EigenvalueID attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalEigenvalue.s_error)) {
            console.error("ExperimentalEigenvalue.constructor: error attribute is missing.");
        }
    }

    /**
     * @returns The EigenvalueID attribute.
     */
    getEigenvalueID(): string {
        return this.attributes.get(ExperimentalEigenvalue.s_EigenvalueID) as string;
    }

    /**
     * Set the EigenvalueID attribute.
     * @param EigenvalueID The EigenvalueID.
     */
    setEigenvalueID(EigenvalueID: string) {
        this.attributes.set(ExperimentalEigenvalue.s_EigenvalueID, EigenvalueID);
    }

    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError(): number {
        return parseFloat(this.attributes.get(ExperimentalEigenvalue.s_error) as string);
    }

    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error: number) {
        this.attributes.set(ExperimentalEigenvalue.s_error, error.toString());
    }

}

/**
 * A class for "me:excessReactantConc".
 * The attributes may include:
 * percent: string ("true" or "false")
 */
export class ExcessReactantConc extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:excessReactantConc";

    /**
     * The key to the percent attribute value.
     */
    static readonly s_percent: string = "percent";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ExcessReactantConc.tagName, value);
    }

    /**
     * @returns The percent attribute or undefined if there is no percent attribute.
     */
    getPercent(): string | undefined {
        return this.attributes.get(ExcessReactantConc.s_percent);
    }

    /**
     * Set the percent attribute.
     * @param percent The percent.
     */
    setPercent(percent: string) {
        this.attributes.set(ExcessReactantConc.s_percent, percent);
    }
}

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
export class PTpair extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:PTpair";

    /**
     * The key to the P attribute value.
     */
    static readonly s_P: string = "P";

    /**
     * The key to the T attribute value.
     */
    static readonly s_T: string = "T";

    /**
     * The key to the precision attribute value.
     */
    static readonly s_precision: string = "precision";

    /**
     * The key to the excessReactantConc attribute value.
     */
    static readonly s_excessReactantConc = "excessReactantConc";

    /**
     * The key to the percentExcessReactantConc attribute value.
     */
    static readonly s_percentExcessReactantConc = "percentExcessReactantConc";

    /**
     * The index. Keys are types and values are the node indexes.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */
    constructor(attributes: Map<string, string>, bathGas?: BathGas, experimentRate?: ExperimentalRate,
        experimentalYield?: ExperimentalYield, experimentalEigenvalue?: ExperimentalEigenvalue) {
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
    getP(): number {
        let p: string | undefined = this.attributes.get(PTpair.s_P);
        if (p != undefined) {
            return parseFloat(p);
        }
        return NaN;
    }

    /**
     * Set The Pressure
     */
    setP(p: number) {
        this.attributes.set(PTpair.s_P, p.toString());
    }

    /**
     * @returns The Temperature.
     */
    getT(): number {
        let t: string | undefined = this.attributes.get(PTpair.s_T);
        if (t != undefined) {
            return parseFloat(t);
        }
        return NaN;
    }

    /**
     * Set The Temperature.
     */
    setT(t: number) {
        this.attributes.set(PTpair.s_T, t.toString());
    }

    /**
     * @returns The precision attribute or undefined if there is no precision attribute.
     */
    getPrecision(): string | undefined {
        return this.attributes.get(PTpair.s_precision);
    }

    /**
     * Set the precision attribute.
     * @param precision The precision.
     */
    setPrecision(precision: string) {
        this.attributes.set(PTpair.s_precision, precision);
    }

    /**
     * @returns The bath gas.
     */
    getBathGas(): BathGas | undefined {
        let i: number | undefined = this.index.get(BathGas.tagName);
        if (i != undefined) {
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
        if (i != undefined) {
            this.nodes.set(i, bathGas);
        } else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }

    /**
     * Remove the bath gas.
     */
    removeBathGas() {
        let i: number | undefined = this.index.get(BathGas.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(BathGas.tagName);
        }
    }

    /**
     * @returns The experiment rate.
     */
    getExperimentalRate(): ExperimentalRate | undefined {
        let i: number | undefined = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ExperimentalRate;
        } else {
            return undefined;
        }
    }

    /**
     * @param experimentRate The experiment rate.
     */
    setExperimentalRate(experimentRate: ExperimentalRate) {
        let i: number | undefined = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            this.nodes.set(i, experimentRate);
        } else {
            this.index.set(ExperimentalRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }

    /**
     * Remove the experiment rate.
     */
    removeExperimentalRate() {
        let i: number | undefined = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalRate.tagName);
        }
    }

    /**
     * @returns The experimental yield.
     */
    getExperimentalYield(): ExperimentalYield | undefined {
        let i: number | undefined = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ExperimentalYield;
        } else {
            return undefined;
        }
    }

    /**
     * @param experimentalYield The experimental yield.
     */
    setExperimentalYield(experimentalYield: ExperimentalYield) {
        let i: number | undefined = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            this.nodes.set(i, experimentalYield);
        } else {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
    }

    /**
     * Remove the experimental yield.
     */
    removeExperimentalYield() {
        let i: number | undefined = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalYield.tagName);
        }
    }

    /**
     * @returns The experimental eigenvalue.
     */
    getExperimentalEigenvalue(): ExperimentalEigenvalue | undefined {
        let i: number | undefined = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ExperimentalEigenvalue;
        } else {
            return undefined;
        }
    }

    /**
     * @param experimentalEigenvalue The experimental eigenvalue.
     */
    setExperimentalEigenvalue(experimentalEigenvalue: ExperimentalEigenvalue) {
        let i: number | undefined = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            this.nodes.set(i, experimentalEigenvalue);
        } else {
            this.index.set(ExperimentalEigenvalue.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }

    /**
     * Remove the experimental eigenvalue.
     */
    removeExperimentalEigenvalue() {
        let i: number | undefined = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalEigenvalue.tagName);
        }
    }

    /**
     * @returns this.attributes.get("excessReactantConc").
     */
    getExcessReactantConc(): string | undefined {
        return this.attributes.get(PTpair.s_excessReactantConc);
    }

    /**
     * this.attributes.set("excessReactantConc", excessReactantConc).
     */
    setExcessReactantConc(excessReactantConc: string) {
        this.attributes.set(PTpair.s_excessReactantConc, excessReactantConc);
    }

    /**
     * @returns this.attributes.get("percentExcessReactantConc").
     */
    getPercentExcessReactantConc(): string | undefined {
        return this.attributes.get(PTpair.s_percentExcessReactantConc);
    }

    /**
     * this.attributes.set("percentExcessReactantConc", percentExcessReactantConc).
     */
    setPercentExcessReactantConc(percentExcessReactantConc: string) {
        this.attributes.set(PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
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
     * The Pressure and Temperature pairs.
     */
    pTpairs: PTpair[];

    /**
     * @param attributes The attributes.
     * @param pTs The PTs.
     */
    constructor(attributes: Map<string, string>, pTpairs?: PTpair[]) {
        super(attributes, PTs.tagName);
        if (pTpairs != undefined) {
            pTpairs.forEach((pTpair) => {
                this.addNode(pTpair);
            });
            this.pTpairs = pTpairs;
        } else {
            this.pTpairs = [];
        }
    }

    /**
     * @param i The index of the PTpair to return. 
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */
    getPTpair(i: number): PTpair {
        return this.pTpairs[i];
    }

    /**
     * Set the PT at the given index.
     * @param i The index.
     * @returns The PT pairs.
     */
    setPTpair(i: number, pTpair: PTpair): void {
        this.nodes.set(i, pTpair);
        this.pTpairs[i] = pTpair;
    }

    /**
     * Add a PTpair.
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */
    addPTpair(pTpair: PTpair): number {
        this.addNode(pTpair);
        this.pTpairs.push(pTpair);
        return this.nodes.size - 1;
    }

    /**
     * Remove the PT at the given index.
     * @param i The index.
     */
    removePTpair(i: number): void {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
    }

    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */
    setPTpairs(pTpairs: PTpair[]): void {
        this.nodes.clear();
        pTpairs.forEach((pTpair) => {
            this.addNode(pTpair);
            this.pTpairs.push(pTpair);
        });
    }
    
    /**
     * Remove all PT pairs.
     */
    removePTpairs(): void {
        this.nodes.clear();
        this.pTpairs = [];
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
    index: Map<string, number | Map<string, number>>;

    /**
     * The bath gases index. The keys are the molecule IDs and the values are the node indexes.
     */
    bathGasesIndex: Map<string, number>;

    /**
     * The bath gases.
     */
    bathGases: Set<BathGas>;

    /**
     * @param attributes The attributes.
     * @param bathGases The bath gases.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */
    constructor(attributes: Map<string, string>, bathGases?: Set<BathGas>, pTs?: PTs) {
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
    getBathGases(): Set<BathGas> {
        return this.bathGases;
    }

    /**
     * @param bathGas The bath gas to add.
     */
    addBathGas(bathGas: BathGas) {
        if (!this.bathGases.has(bathGas)) {
            this.bathGases.add(bathGas);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
        }
    }

    /**
     * @param bathGas The bath gas to remove.
     */
    removeBathGas(bathGas: BathGas) {
        if (this.bathGases.has(bathGas)) {
            this.bathGases.delete(bathGas);
            this.nodes.delete(this.bathGasesIndex.get(bathGas.value) as number);
        } else {
            console.warn("Conditions.removeBathGas: bathGas not found to remove.");
        }
    }

    /**
     * @returns The Pressure and Temperature pairs.
     */
    getPTs(): PTs | undefined {
        let i: number | undefined = this.index.get(PTs.tagName) as number;
        if (i != undefined) {
            return this.nodes.get(i) as PTs;
        }
    }

    /**
     * @param pTs The PTs.
     */
    setPTs(pTs: PTs) {
        let i: number | undefined = this.index.get(PTs.tagName) as number;
        if (i != undefined) {
            this.nodes.set(i, pTs);
        } else {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
}