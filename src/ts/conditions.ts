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
 * A class for "me:experimentRate".
 * The attributes may include ref1, ref2, refReaction, and error.
 */
export class ExperimentRate extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:experimentRate";

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
        super(attributes, ExperimentRate.tagName, value);
    }

    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */
    getRef1(): string | undefined {
        return this.attributes.get(ExperimentRate.s_ref1);
    }

    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */
    setRef1(ref1: string) {
        this.attributes.set(ExperimentRate.s_ref1, ref1);
    }

    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */
    getRef2(): string | undefined {
        return this.attributes.get(ExperimentRate.s_ref2);
    }

    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */
    setRef2(ref2: string) {
        this.attributes.set(ExperimentRate.s_ref2, ref2);
    }

    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */
    getRefReaction(): string | undefined {
        return this.attributes.get(ExperimentRate.s_refReaction);
    }

    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */
    setRefReaction(refReaction: string) {
        this.attributes.set(ExperimentRate.s_refReaction, refReaction);
    }

    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */
    getError(): number | undefined {
        let error: string | undefined = this.attributes.get(ExperimentRate.s_error);
        if (error != undefined) {
            return parseFloat(error);
        }
    }

    /**
     * Set the error attribute.
     * @param error The error.
     */
    setError(error: number) {
        this.attributes.set(ExperimentRate.s_error, error.toString());
    }
}

/**
 * A class for "me:experimentalYield".
 * The attributes may include:
 * ref:string
 * error: number
 * yieldTime: number.
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
    getRef(): string | undefined {
        return this.attributes.get(ExperimentalYield.s_ref);
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
    getError(): number | undefined {
        let error: string | undefined = this.attributes.get(ExperimentalYield.s_error);
        if (error != undefined) {
            return parseFloat(error);
        }
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
    getYieldTime(): number | undefined {
        let yieldTime: string | undefined = this.attributes.get(ExperimentalYield.s_yieldTime);
        if (yieldTime) {
            return parseFloat(yieldTime);
        }
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
 * The attributes may include:
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
    }

    /**
     * @returns The EigenvalueID attribute or undefined if there is no EigenvalueID attribute.
     */
    getEigenvalueID(): string | undefined {
        return this.attributes.get(ExperimentalEigenvalue.s_EigenvalueID);
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
    getError(): number | undefined {
        let error: string | undefined = this.attributes.get(ExperimentalEigenvalue.s_error);
        if (error != undefined) {
            return parseFloat(error);
        }
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
     * The precision attribute potential values.
     */
    static readonly precisions: string[] = ["d", "dd", "qd", "double", "double-double", "quad-double"];

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
    constructor(attributes: Map<string, string>, bathGas?: BathGas, experimentRate?: ExperimentRate,
        excessReactantConc?: ExperimentalYield, experimentalEigenvalue?: ExperimentalEigenvalue) {
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
    getExperimentRate(): ExperimentRate | undefined {
        let i: number | undefined = this.index.get(ExperimentRate.tagName);
        if (i != undefined) {
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
        if (i != undefined) {
            this.nodes.set(i, experimentRate);
        } else {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }

    /**
     * Remove the experiment rate.
     */
    removeExperimentRate() {
        let i: number | undefined = this.index.get(ExperimentRate.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentRate.tagName);
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
     * Remove the PT at the given index.
     * @param i The index.
     */
    removePTpair(i: number): void {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
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