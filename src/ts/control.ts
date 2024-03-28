import {
    Tag, NodeWithNodes, NumberNode, TagWithAttributes, StringNode
} from "./xml";

/**
 * A class for "me:calculateRateCoefficientsOnly".
 */
export class CalculateRateCoefficientsOnly extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:calculateRateCoefficientsOnly";

    constructor() {
        super(CalculateRateCoefficientsOnly.tagName);
    }
}

/**
 * A class for "me:printCellDOS".
 */
export class PrintCellDOS extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printCellDOS";

    constructor() {
        super(PrintCellDOS.tagName);
    }
}

/**
 * A class for "me:printCellTransitionStateFlux".
 */
export class PrintCellTransitionStateFlux extends Tag {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:printCellTransitionStateFlux";

    constructor() {
        super(PrintCellTransitionStateFlux.tagName);
    }
}

/**
 * A class for "me:printReactionOperatorColumnSums".
 */
export class PrintReactionOperatorColumnSums extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printReactionOperatorColumnSums";

    constructor() {
        super(PrintReactionOperatorColumnSums.tagName);
    }
}

/**
 * A class for "me:printGrainBoltzmann".
 */
export class PrintGrainBoltzmann extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printGrainBoltzmann";

    constructor() {
        super(PrintGrainBoltzmann.tagName);
    }
}

/**
 * A class for "me:printGrainDOS".
 */
export class PrintGrainDOS extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printGrainDOS";

    constructor() {
        super(PrintGrainDOS.tagName);
    }
}

/**
 * A class for "me:printGrainkbE".
 */
export class PrintGrainkbE extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printGrainkbE";

    constructor() {
        super(PrintGrainkbE.tagName);
    }
}

/**
 * A class for "me:printGrainkfE".
 */
export class PrintGrainkfE extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printGrainkfE";

    constructor() {
        super(PrintGrainkfE.tagName);
    }
}

/**
 * A class for "me:printTSsos".
 */
export class PrintTSsos extends Tag {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:printTSsos";

    constructor() {
        super(PrintTSsos.tagName);
    }
}

/**
 * A class for "me:printGrainedSpeciesProfile".
 */
export class PrintGrainedSpeciesProfile extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printGrainedSpeciesProfile";

    constructor() {
        super(PrintGrainedSpeciesProfile.tagName);
    }
}

/**
 * A class for "me:printGrainTransitionStateFlux".
 */
export class PrintGrainTransitionStateFlux extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printGrainTransitionStateFlux";

    constructor() {
        super(PrintGrainTransitionStateFlux.tagName);
    }
}

/**
 * A class for "me:printReactionOperatorSize".
 */
export class PrintReactionOperatorSize extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printReactionOperatorSize";

    constructor() {
        super(PrintReactionOperatorSize.tagName);
    }
}

/**
 * A class for "me:printSpeciesProfile".
 */
export class PrintSpeciesProfile extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printSpeciesProfile";

    constructor() {
        super(PrintSpeciesProfile.tagName);
    }
}

/**
 * A class for "me:printPhenomenologicalEvolution".
 */
export class PrintPhenomenologicalEvolution extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printPhenomenologicalEvolution";

    constructor() {
        super(PrintPhenomenologicalEvolution.tagName);
    }
}

/**
 * A class for "me:printTunnelingCoefficients".
 */
export class PrintTunnelingCoefficients extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printTunnelingCoefficients";

    constructor() {
        super(PrintTunnelingCoefficients.tagName);
    }
}

/**
 * A class for "me:printCrossingCoefficients".
 */
export class PrintCrossingCoefficients extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printCrossingCoefficients";

    constructor() {
        super(PrintCrossingCoefficients.tagName);
    }
}

/**
 * A class for "me:testDOS".
 */
export class TestDOS extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:testDOS";

    constructor() {
        super(TestDOS.tagName);
    }
}

/**
 * A class for "me:testRateConstant".
 */
export class TestRateConstants extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:testRateConstants";

    constructor() {
        super(TestRateConstants.tagName);
    }
}

/**
 * A class for "me:useTheSameCellNumberForAllConditions.
 */
export class UseTheSameCellNumberForAllConditions extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:useTheSameCellNumberForAllConditions";

    constructor() {
        super(UseTheSameCellNumberForAllConditions.tagName);
    }
}

/**
 * A class for "me:ForceMacroDetailedBalance".
 */
export class ForceMacroDetailedBalance extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:ForceMacroDetailedBalance";

    constructor() {
        super(ForceMacroDetailedBalance.tagName);
    }
}

/**
 * A class for "me:hideInactive".
 */
export class HideInactive extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:hideInactive";

    constructor() {
        super(HideInactive.tagName);
    }
}

/**
 * A class for "me:calcMethod".
 * Expected to have an attribute "xsi_type" with one of the following values:
 * "simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation", "ThermodynamicTable", "sensitivityAnalysis",
 * "me:simpleCalc", "me:gridSearch", "me:fitting", "me:marquardt", "me:analyticalRepresentation", "me:ThermodynamicTable", "me:sensitivityAnalysis".
 */
export class CalcMethod extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:calcMethod";

    /**
     * The possible values.
     */
    static readonly options: string[] = ["simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation",
        "ThermodynamicTable", "sensitivityAnalysis", "me:simpleCalc", "me:gridSearch", "me:fitting", "me:marquardt",
        "me:analyticalRepresentation", "me:ThermodynamicTable", "me:sensitivityAnalysis"];

    /**
     * @param value The value.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, CalcMethod.tagName);
    }
}

/**
 * A class for "me:SimpleCalc" CalcMethod.
 */
export class CalcMethodSimpleCalc extends CalcMethod {

    /**
     * The xsi_type.
     */
    static readonly xsi_type: string = "me:simpleCalc";

    /**
     * The xsi_type2.
     */
    static readonly xsi_type2: string = "simpleCalc";

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes);
    }
}

/**
 * A class for "me:GridSearch" CalcMethod.
 */
export class CalcMethodGridSearch extends CalcMethod {

    /**
    * The xsi_type.
    */
    static readonly xsi_type: string = "me:gridSearch";

    /**
     * The xsi_type2.
     */
    static readonly xsi_type2: string = "gridSearch";

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes);
    }
}

/**
 * A class for "me:fittingIterations".
 */
export class FittingIterations extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:fittingIterations";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, FittingIterations.tagName, value);
    }
}

/**
 * A class for "me:Fitting" CalcMethod.
 * Nodes:
 * "me:fittingIterations"
 */
export class CalcMethodFitting extends CalcMethod {

    /**
     * The xsi_type.
     */
    static readonly xsi_type: string = "me:fitting";

    /**
     * The xsi_type2.
     */
    static readonly xsi_type2: string = "fitting";

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, fittingIterations?: FittingIterations) {
        super(attributes);
        if (fittingIterations != undefined) {
            this.addNode(fittingIterations);
        }
    }

    /**
     * @returns The fittingIterations or undefined.
     */
    getFittingIterations(): FittingIterations | undefined {
        return this.nodes.get(0) as FittingIterations;
    }

    /**
     * @param fittingIterations The fittingIterations.
     */
    setFittingIterations(fittingIterations: FittingIterations) {
        this.nodes.set(0, fittingIterations);
    }

    /**
     * Remove the fittingIterations.
     */
    removeFittingIterations() {
        this.nodes.delete(0);
    }
}

/**
 * A class for "me:MarquardtIterations".
 */
export class MarquardtIterations extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:MarquardtIterations";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, MarquardtIterations.tagName, value);
    }
}

/**
 * A class for "me:MarquardtTolerance".
 */
export class MarquardtTolerance extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:MarquardtTolerance";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, MarquardtTolerance.tagName, value);
    }
}

/**
 * A class for "me:MarquardtDerivDelta".
 */
export class MarquardtDerivDelta extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:MarquardtDerivDelta";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, MarquardtDerivDelta.tagName, value);
    }
}

export class CalcMethodMarquardt extends CalcMethod {

    /**
     * The tag name.
     */
    static readonly xsi_type: string = "me:marquardt";

    /**
     * The tag name.
     */
    static readonly xsi_type2: string = "marquardt";

    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, marquardtIterations?: MarquardtIterations,
        marquardtTolerance?: MarquardtTolerance, marquardtDerivDelta?: MarquardtDerivDelta) {
        super(attributes);
        this.index = new Map<string, number>();
        if (marquardtIterations != undefined) {
            this.index.set(MarquardtIterations.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
        if (marquardtTolerance != undefined) {
            this.index.set(MarquardtTolerance.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
        if (marquardtDerivDelta != undefined) {
            this.index.set(MarquardtDerivDelta.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }


    /**
     * @returns The marquardtIterations or undefined.
     */
    getMarquardtIterations(): MarquardtIterations | undefined {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as MarquardtIterations;
        }
    }

    /**
     * @param marquardtIterations The marquardtIterations.
     */
    setMarquardtIterations(marquardtIterations: MarquardtIterations) {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) {
            this.nodes.set(i, marquardtIterations);
        } else {
            this.index.set(MarquardtIterations.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
    }

    /**
     * Remove the marquardtIterations.
     */
    removeMarquardtIterations() {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MarquardtIterations.tagName);
        }
    }

    /**
     * @returns The marquardtTolerance or undefined.
     */
    getMarquardtTolerance(): MarquardtTolerance | undefined {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as MarquardtTolerance;
        }
    }

    /**
     * @param marquardtTolerance The marquardtTolerance.
     */
    setMarquardtTolerance(marquardtTolerance: MarquardtTolerance) {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) {
            this.nodes.set(i, marquardtTolerance);
        } else {
            this.index.set(MarquardtTolerance.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
    }

    /**
     * Remove the marquardtTolerance.
     */
    removeMarquardtTolerance() {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MarquardtTolerance.tagName);
        }
    }

    /**
     * @returns The marquardtDerivDelta or undefined.
     */
    getMarquardtDerivDelta(): MarquardtDerivDelta | undefined {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as MarquardtDerivDelta;
        }
    }

    /**
     * @param marquardtDerivDelta The marquardtDerivDelta.
     */
    setMarquardtDerivDelta(marquardtDerivDelta: MarquardtDerivDelta) {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) {
            this.nodes.set(i, marquardtDerivDelta);
        } else {
            this.index.set(MarquardtDerivDelta.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }

    /**
     * Remove the marquardtDerivDelta.
     */
    removeMarquardtDerivDelta() {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MarquardtDerivDelta.tagName);
        }
    }
}

/**
 * A class for "me:useTraceWeighting".
 */
export class UseTraceWeighting extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:useTraceWeighting";

    constructor() {
        super(UseTraceWeighting.tagName);
    }
}

/**
 * A class for "me:format".
 * The attributes may have the following keys:
 * "representation" (with known value: "Plog")
 * "rateUnits" (with known values: "cm3mole-1s-1", "cm3molecule-1s-1")
 * Values include:
 * "cantera", "chemkin"
 */
export class Format extends StringNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:format";

    /**
     * The options.
     */
    static readonly options: string[] = ["cantera", "chemkin"];

    /**
     * The rateUnits.
     */
    static readonly rateUnits: string = "rateUnits";

    /**
     * The rateUnits options.
     */
    static readonly rateUnitsOptions: string[] = ["cm3mole-1s-1", "cm3molecule-1s-1"];

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Format.tagName, value);
    }

    /**
     * @returns The value of the "rateUnits" attribute or undefined.
     */
    getRateUnits(): string | undefined {
        return this.attributes.get(Format.rateUnits);
    }

    /**
     * @param rateUnits The value of the "rateUnits" attribute.
     */
    setRateUnits(rateUnits: string) {
        this.attributes.set(Format.rateUnits, rateUnits);
    }

    /**
     * Remove the "rateUnits" attribute.
     */
    removeRateUnits() {
        this.attributes.delete(Format.rateUnits);
    }
}

/**
 * A class for "me:precision".
 * Known values include:
 * "d", "dd", "qd", "double", "double-double" or "quad-double"
 */
export class Precision extends StringNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:precision";

    /**
     * The options.
     */
    static readonly options: string[] = ["d", "dd", "qd", "double", "double-double", "quad-double"];

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Precision.tagName, value);
    }
}

/**
 * A class for "me:chebNumTemp".
 */
export class ChebNumTemp extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebNumTemp";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebNumTemp.tagName, value);
    }
}

/**
 * A class for "me:chebNumConc".
 */
export class ChebNumConc extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebNumConc";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebNumConc.tagName, value);
    }
}

/**
 * A class for "me:chebMaxTemp".
 */
export class ChebMaxTemp extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebMaxTemp";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebMaxTemp.tagName, value);
    }
}

/**
 * A class for "me:chebMinTemp".
 */
export class ChebMinTemp extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebMinTemp";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebMinTemp.tagName, value);
    }
}

/**
 * A class for "me:chebMaxConc".
 * Known attributes include:
 * "units" (known values include "atm").
 */
export class ChebMaxConc extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebMaxConc";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebMaxConc.tagName, value);
    }

    /**
     * @returns The units.
     */
    getUnits(): string | undefined {
        return this.attributes.get("units");
    }

    /**
     * @param units The units.
     */
    setUnits(units: string) {
        this.attributes.set("units", units);
    }
}

/**
 * A class for "me:chebMinConc".
 */
export class ChebMinConc extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebMinConc";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebMinConc.tagName, value);
    }
}

/**
 * A class for "me:chebTExSize".
 */
export class ChebTExSize extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebTExSize";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebTExSize.tagName, value);
    }
}

/**
 * A class for "me:chebPExSize".
 */
export class ChebPExSize extends NumberNode {

    /**
    * The tag name.
    */
    static readonly tagName: string = "me:chebPExSize";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ChebPExSize.tagName, value);
    }
}

/**
 * A class for "me:analyticalRepresentation" CalcMethod.
 * Expected to have attributes:
 * "xsi_type" with the value "me:analyticalRepresentation".
 * Nodes:
 * "me:format"
 * If the "me:format" attribute "representation" is "Plog" then the following nodes are expected:
 * "me:plogNumTemp"
 * "me:plogMaxTemp"
 * "me:plogMinTemp"
 * "me:plogConcs" which may have multiple "me:plogConc" values.
 * If the "me:format" attribute "representation" is not specified, then the following nodes are expected:
 * "me:precision"
 * "me:chebNumTemp"
 * "me:chebNumConc"
 * "me:chebMaxTemp"
 * "me:chebMinTemp"
 * "me:chebMaxConc"
 * "me:chebMinConc"
 * "me:chebTExSize"
 * "me:chebPExSize"
 */
export class CalcMethodAnalyticalRepresentation extends CalcMethod {

    /**
     * The tag name.
     */
    static readonly xsi_type: string = "me:analyticalRepresentation";

    /**
     * The tag name.
     */
    static readonly xsi_type2: string = "analyticalRepresentation";

    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, format?: Format, precision?: Precision, chebNumTemp?: ChebNumTemp,
        chebNumConc?: ChebNumConc, chebMaxTemp?: ChebMaxTemp, chebMinTemp?: ChebMinTemp, chebMaxConc?: ChebMaxConc,
        chebMinConc?: ChebMinConc, chebTExSize?: ChebTExSize, chebPExSize?: ChebPExSize) {
        super(attributes);
        this.index = new Map<string, number>();
        if (format != undefined) {
            this.index.set(Format.tagName, this.nodes.size);
            this.addNode(format);
        }
        if (precision != undefined) {
            this.index.set(Precision.tagName, this.nodes.size);
            this.addNode(precision);
        }
        if (chebNumTemp != undefined) {
            this.index.set(ChebNumTemp.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
        if (chebNumConc != undefined) {
            this.index.set(ChebNumConc.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
        if (chebMaxTemp != undefined) {
            this.index.set(ChebMaxTemp.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
        if (chebMinTemp != undefined) {
            this.index.set(ChebMinTemp.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
        if (chebMaxConc != undefined) {
            this.index.set(ChebMaxConc.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
        if (chebMinConc != undefined) {
            this.index.set(ChebMinConc.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
        if (chebTExSize != undefined) {
            this.index.set(ChebTExSize.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
        if (chebPExSize != undefined) {
            this.index.set(ChebPExSize.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }

    /**
     * @returns The format or undefined.
     */
    getFormat(): Format | undefined {
        let i = this.index.get(Format.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Format;
        }
    }

    /**
     * @param format The format.
     */
    setFormat(format: Format) {
        let i = this.index.get(Format.tagName);
        if (i != undefined) {
            this.nodes.set(i, format);
        } else {
            this.index.set(Format.tagName, this.nodes.size);
            this.addNode(format);
        }
    }

    /**
     * Remove the format.
     */
    removeFormat() {
        let i = this.index.get(Format.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Format.tagName);
        }
    }

    /**
     * @returns The precision or undefined.
     */
    getPrecision(): Precision | undefined {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Precision;
        }
    }

    /**
     * @param precision The precision.
     */
    setPrecision(precision: Precision) {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) {
            this.nodes.set(i, precision);
        } else {
            this.index.set(Precision.tagName, this.nodes.size);
            this.addNode(precision);
        }
    }

    /**
     * Remove the precision.
     */
    removePrecision() {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Precision.tagName);
        }
    }

    /**
     * @returns The chebNumTemp or undefined.
     */
    getChebNumTemp(): ChebNumTemp | undefined {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebNumTemp;
        }
    }

    /**
     * @param chebNumTemp The chebNumTemp.
     */
    setChebNumTemp(chebNumTemp: ChebNumTemp) {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebNumTemp);
        } else {
            this.index.set(ChebNumTemp.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
    }

    /**
     * Remove the chebNumTemp.
     */
    removeChebNumTemp() {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebNumTemp.tagName);
        }
    }

    /**
     * @returns The chebNumConc or undefined.
     */
    getChebNumConc(): ChebNumConc | undefined {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebNumConc;
        }
    }

    /**
     * @param chebNumConc The chebNumConc.
     */
    setChebNumConc(chebNumConc: ChebNumConc) {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebNumConc);
        } else {
            this.index.set(ChebNumConc.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
    }

    /**
     * Remove the chebNumConc.
     */
    removeChebNumConc() {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebNumConc.tagName);
        }
    }

    /**
     * @returns The chebMaxTemp or undefined.
     */
    getChebMaxTemp(): ChebMaxTemp | undefined {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebMaxTemp;
        }
    }

    /**
     * @param chebMaxTemp The chebMaxTemp.
     */
    setChebMaxTemp(chebMaxTemp: ChebMaxTemp) {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMaxTemp);
        } else {
            this.index.set(ChebMaxTemp.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
    }

    /**
     * Remove the chebMaxTemp.
     */
    removeChebMaxTemp() {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMaxTemp.tagName);
        }
    }

    /**
     * @returns The chebMinTemp or undefined.
     */
    getChebMinTemp(): ChebMinTemp | undefined {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebMinTemp;
        }
    }

    /**
     * @param chebMinTemp The chebMinTemp.
     */
    setChebMinTemp(chebMinTemp: ChebMinTemp) {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMinTemp);
        } else {
            this.index.set(ChebMinTemp.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
    }

    /**
     * Remove the chebMinTemp.
     */
    removeChebMinTemp() {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMinTemp.tagName);
        }
    }

    /**
     * @returns The chebMaxConc or undefined.
     */
    getChebMaxConc(): ChebMaxConc | undefined {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebMaxConc;
        }
    }

    /**
     * @param chebMaxConc The chebMaxConc.
     */
    setChebMaxConc(chebMaxConc: ChebMaxConc) {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMaxConc);
        } else {
            this.index.set(ChebMaxConc.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
    }

    /**
     * Remove the chebMaxConc.
     */
    removeChebMaxConc() {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMaxConc.tagName);
        }
    }

    /**
     * @returns The chebMinConc or undefined.
     */
    getChebMinConc(): ChebMinConc | undefined {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebMinConc;
        }
    }

    /**
     * @param chebMinConc The chebMinConc.
     */
    setChebMinConc(chebMinConc: ChebMinConc) {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMinConc);
        } else {
            this.index.set(ChebMinConc.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
    }

    /**
     * Remove the chebMinConc.
     */
    removeChebMinConc() {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMinConc.tagName);
        }
    }

    /**
     * @returns The chebTExSize or undefined.
     */
    getChebTExSize(): ChebTExSize | undefined {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebTExSize;
        }
    }

    /**
     * @param chebTExSize The chebTExSize.
     */
    setChebTExSize(chebTExSize: ChebTExSize) {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebTExSize);
        } else {
            this.index.set(ChebTExSize.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
    }

    /**
     * Remove the chebTExSize.
     */
    removeChebTExSize() {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebTExSize.tagName);
        }
    }

    /**
     * @returns The chebPExSize or undefined.
     */
    getChebPExSize(): ChebPExSize | undefined {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ChebPExSize;
        }
    }

    /**
     * @param chebPExSize The chebPExSize.
     */
    setChebPExSize(chebPExSize: ChebPExSize) {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebPExSize);
        } else {
            this.index.set(ChebPExSize.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }

    /**
     * Remove the chebPExSize.
     */
    removeChebPExSize() {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebPExSize.tagName);
        }
    }
}

/**
 * A class for "me:Tmin" CalcMethod.
 */
export class Tmin extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:Tmin";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, Tmin.tagName, value);
    }
}

/**
 * A class for "me:Tmid" CalcMethod.
 */
export class Tmid extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:Tmid";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, Tmid.tagName, value);
    }
}

/**
 * A class for "me:Tmax" CalcMethod.
 */
export class Tmax extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:Tmax";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, Tmax.tagName, value);
    }
}

/**
 * A class for "me:Tstep" CalcMethod.
 */
export class Tstep extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:Tstep";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, Tmin.tagName, value);
    }
}

/**
 * A class for "me:ThermodynamicTable" CalcMethod.
 * Expected to have attributes:
 * "xsi_type" with the value "me:ThermodynamicTable";
 * "units" with known values "kJ/mol".
 * Nodes:
 * "me:Tmin", "me:Tmid", "me:Tmax", "me:Tstep".
 */
export class CalcMethodThermodynamicTable extends CalcMethod {

    /**
     * The tag name.
     */
    static readonly xsi_type: string = "me:ThermodynamicTable";

    /**
     * The tag name.
     */
    static readonly xsi_type2: string = "ThermodynamicTable";

    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, tmin?: Tmin, tmid?: Tmid, tmax?: Tmax, tstep?: Tstep) {
        super(attributes);
        this.index = new Map<string, number>();
        if (tmin != undefined) {
            this.index.set(Tmin.tagName, this.nodes.size);
            this.addNode(tmin);
        }
        if (tmid != undefined) {
            this.index.set(Tmid.tagName, this.nodes.size);
            this.addNode(tmid);
        }
        if (tmax != undefined) {
            this.index.set(Tmax.tagName, this.nodes.size);
            this.addNode(tmax);
        }
        if (tstep != undefined) {
            this.index.set(Tstep.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }

    /**
     * @returns The tmin or undefined.
     */
    getTmin(): Tmin | undefined {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Tmin;
        }
    }

    /**
     * @param tmin The tmin.
     */
    setTmin(tmin: Tmin) {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) {
            this.nodes.set(i, tmin);
        } else {
            this.index.set(Tmin.tagName, this.nodes.size);
            this.addNode(tmin);
        }
    }

    /**
     * Remove the tmin.
     */
    removeTmin() {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tmin.tagName);
        }
    }

    /**
     * @returns The tmid or undefined.
     */
    getTmid(): Tmid | undefined {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Tmid;
        }
    }

    /**
     * @param tmid The tmid.
     */
    setTmid(tmid: Tmid) {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) {
            this.nodes.set(i, tmid);
        } else {
            this.index.set(Tmid.tagName, this.nodes.size);
            this.addNode(tmid);
        }
    }

    /**
     * Remove the tmid.
     */
    removeTmid() {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tmid.tagName);
        }
    }

    /**
     * @returns The tmax or undefined.
     */
    getTmax(): Tmax | undefined {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Tmax;
        }
    }

    /**
     * @param tmax The tmax.
     */
    setTmax(tmax: Tmax) {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) {
            this.nodes.set(i, tmax);
        } else {
            this.index.set(Tmax.tagName, this.nodes.size);
            this.addNode(tmax);
        }
    }

    /**
     * Remove the tmax.
     */
    removeTmax() {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tmax.tagName);
        }
    }

    /**
     * @returns The tstep or undefined.
     */
    getTstep(): Tstep | undefined {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Tstep;
        }
    }

    /**
     * @param tstep The tstep.
     */
    setTstep(tstep: Tstep) {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) {
            this.nodes.set(i, tstep);
        } else {
            this.index.set(Tstep.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }

    /**
     * Remove the tstep.
     */
    removeTstep() {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tstep.tagName);
        }
    }
}

/**
 * A class for "me:sensitivityAnalysisSamples".
 */
export class SensitivityAnalysisSamples extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:sensitivityAnalysisSamples";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, SensitivityAnalysisSamples.tagName, value);
    }

}

/**
 * A class for "me:sensitivityAnalysisOrder".
 */
export class SensitivityAnalysisOrder extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:sensitivityAnalysisOrder";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, SensitivityAnalysisOrder.tagName, value);
    }
}

/**
 * A class for "me:sensitivityNumVarRedIters".
 */
export class SensitivityNumVarRedIters extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:sensitivityNumVarRedIters";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, SensitivityNumVarRedIters.tagName, value);
    }
}

/**
 * A class for "sensitivityVarRedMethod".
 */
export class SensitivityVarRedMethod extends StringNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:sensitivityVarRedMethod";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, SensitivityVarRedMethod.tagName, value);
    }

}

/**
 * A class for "me:sensitivityAnalysis".
 * Nodes:
 * "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters", "me:sensitivityVarRedMethod".
 */
export class CalcMethodSensitivityAnalysis extends CalcMethod {

    /**
    * The xsi_type.
    */
    static readonly xsi_type: string = "me:sensitivityAnalysis";

    /**
     * The xsi_type2.
     */
    static readonly xsi_type2: string = "sensitivityAnalysis";

    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, sensitivityAnalysisSamples?: SensitivityAnalysisSamples,
        sensitivityAnalysisOrder?: SensitivityAnalysisOrder, sensitivityNumVarRedIters?: SensitivityNumVarRedIters,
        sensitivityVarRedMethod?: SensitivityVarRedMethod) {
        super(attributes);
        this.index = new Map<string, number>();
        if (sensitivityAnalysisSamples != undefined) {
            this.index.set(SensitivityAnalysisSamples.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
        if (sensitivityAnalysisOrder != undefined) {
            this.index.set(SensitivityAnalysisOrder.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
        if (sensitivityNumVarRedIters != undefined) {
            this.index.set(SensitivityNumVarRedIters.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
        if (sensitivityVarRedMethod != undefined) {
            this.index.set(SensitivityVarRedMethod.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }

    /**
     * @returns The sensitivityAnalysisSamples or undefined.
     */
    getSensitivityAnalysisSamples(): SensitivityAnalysisSamples | undefined {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as SensitivityAnalysisSamples;
        }
    }

    /**
     * @param sensitivityAnalysisSamples The sensitivityAnalysisSamples.
     */
    setSensitivityAnalysisSamples(sensitivityAnalysisSamples: SensitivityAnalysisSamples) {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityAnalysisSamples);
        } else {
            this.index.set(SensitivityAnalysisSamples.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
    }

    /**
     * Remove the sensitivityAnalysisSamples.
     */
    removeSensitivityAnalysisSamples() {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityAnalysisSamples.tagName);
        }
    }

    /**
     * @returns The sensitivityAnalysisOrder or undefined.
     */
    getSensitivityAnalysisOrder(): SensitivityAnalysisOrder | undefined {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as SensitivityAnalysisOrder;
        }
    }

    /**
     * @param sensitivityAnalysisOrder The sensitivityAnalysisOrder.
     */
    setSensitivityAnalysisOrder(sensitivityAnalysisOrder: SensitivityAnalysisOrder) {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityAnalysisOrder);
        } else {
            this.index.set(SensitivityAnalysisOrder.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
    }

    /**
     * Remove the sensitivityAnalysisOrder.
     */
    removeSensitivityAnalysisOrder() {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityAnalysisOrder.tagName);
        }
    }

    /**
     * @returns The sensitivityNumVarRedIters or undefined.
     */
    getSensitivityNumVarRedIters(): SensitivityNumVarRedIters | undefined {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as SensitivityNumVarRedIters;
        }
    }

    /**
     * @param sensitivityNumVarRedIters The sensitivityNumVarRedIters.
     */
    setSensitivityNumVarRedIters(sensitivityNumVarRedIters: SensitivityNumVarRedIters) {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityNumVarRedIters);
        } else {
            this.index.set(SensitivityNumVarRedIters.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
    }

    /**
     * Remove the sensitivityNumVarRedIters.
     */
    removeSensitivityNumVarRedIters() {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityNumVarRedIters.tagName);
        }
    }

    /**
     * @returns The sensitivityVarRedMethod or undefined.
     */
    getSensitivityVarRedMethod(): SensitivityVarRedMethod | undefined {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as SensitivityVarRedMethod;
        }
    }

    /**
     * @param sensitivityVarRedMethod The sensitivityVarRedMethod.
     */
    setSensitivityVarRedMethod(sensitivityVarRedMethod: SensitivityVarRedMethod) {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityVarRedMethod);
        } else {
            this.index.set(SensitivityVarRedMethod.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }

    /**
     * Remove the sensitivityVarRedMethod.
     */
    removeSensitivityVarRedMethod() {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityVarRedMethod.tagName);
        }
    }
}

/**
 * A class for "me:eigenvalues".
 */
export class Eigenvalues extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:eigenvalues";

    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, Eigenvalues.tagName, value);
    }
}

/**
 * A class for "me:shortestTimeOfInterest".
 */
export class ShortestTimeOfInterest extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:shortestTimeOfInterest";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ShortestTimeOfInterest.tagName, value);
    }
}

/**
 * A class for "me:MaximumEvolutionTime".
 */
export class MaximumEvolutionTime extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:MaximumEvolutionTime";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, MaximumEvolutionTime.tagName, value);
    }
}

/**
 * A class for "me:automaticallySetMaxEne".
 */
export class AutomaticallySetMaxEne extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:automaticallySetMaxEne";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, AutomaticallySetMaxEne.tagName, value);
    }
}

/**
 * A class for "me:diagramEnergyOffset".
 */
export class DiagramEnergyOffset extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:diagramEnergyOffset";

    /**
      * @param attributes The attributes.
      * @param value The value.
      */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, DiagramEnergyOffset.tagName, value);
    }
}

/**
 * A class for "me:testMicroRates".
 * Expected numerical attributes: Tmin, Tmax, Tstep.
 */
export class TestMicroRates extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:testMicroRates";

    /**
     * The minimum temperature.
     */
    tMin: number;

    /**
     * The maximum temperature.
     */
    tMax: number;

    /**
     * The temperature step.
     */
    tStep: number;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, TestMicroRates.tagName);
        this.tMin = parseFloat(attributes.get("Tmin") as string);
        this.tMax = parseFloat(attributes.get("Tmax") as string);
        this.tStep = parseFloat(attributes.get("Tstep") as string);
    }

    /**
     * @returns The maximum temperature.
     */
    getTmin(): number {
        return this.tMin;
    }

    /**
     * @param tMin The minimum temperature.
     */
    setTmin(tMin: number) {
        this.tMin = tMin;
        this.attributes?.set("Tmin", tMin.toString());
    }

    /**
     * @returns The maximum temperature.
     */
    getTmax(): number {
        return this.tMax;
    }

    /**
     * @param tMax The maximum temperature.
     */
    setTmax(tMax: number) {
        this.tMax = tMax;
        this.attributes?.set("Tmax", tMax.toString());
    }

    /**
     * @returns The temperature step.
     */
    getTstep(): number {
        return this.tStep;
    }

    /**
     * @param tStep The temperature step.
     */
    setTstep(tStep: number) {
        this.tStep = tStep;
        this.attributes?.set("Tstep", tStep.toString());
    }
}

/**
 * A class for the control.
 */
export class Control extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:control";

    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Control.tagName);
        this.index = new Map<string, number>();
    }

    /**
     * @returns The calculateRateCoefficientsOnly or undefined.
     */
    getCalculateRateCoefficientsOnly(): CalculateRateCoefficientsOnly | undefined {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as CalculateRateCoefficientsOnly;
        }
        return undefined;
    }

    /**
     * @param calculateRateCoefficientsOnly The calculateRateCoefficientsOnly.
     */
    setCalculateRateCoefficientsOnly(calculateRateCoefficientsOnly: CalculateRateCoefficientsOnly) {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) {
            this.nodes.set(i, calculateRateCoefficientsOnly);
        } else {
            this.index.set(CalculateRateCoefficientsOnly.tagName, this.nodes.size);
            this.addNode(calculateRateCoefficientsOnly);
        }
    }

    /**
     * Remove the calculateRateCoefficientsOnly.
     */
    removeCalculateRateCoefficientsOnly() {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(CalculateRateCoefficientsOnly.tagName);
        }
    }

    /**
     * @returns The printCellDOS or undefined.
     */
    getPrintCellDOS(): PrintCellDOS | undefined {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintCellDOS;
        }
        return undefined;
    }

    /**
     * @param printCellDOS The printCellDOS.
     */
    setPrintCellDOS(printCellDOS: PrintCellDOS) {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) {
            this.nodes.set(i, printCellDOS);
        } else {
            this.index.set(PrintCellDOS.tagName, this.nodes.size);
            this.addNode(printCellDOS);
        }
    }

    /**
     * Remove the printCellDOS.
     */
    removePrintCellDOS() {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintCellDOS.tagName);
        }
    }

    /**
     * @returns The printCellTransitionStateFlux or undefined.
     */
    getPrintCellTransitionStateFlux(): PrintCellTransitionStateFlux | undefined {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintCellTransitionStateFlux;
        }
        return undefined;
    }

    /**
     * @param printCellTransitionStateFlux The printCellTransitionStateFlux.
     */
    setPrintCellTransitionStateFlux(printCellTransitionStateFlux: PrintCellTransitionStateFlux) {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.set(i, printCellTransitionStateFlux);
        } else {
            this.index.set(PrintCellTransitionStateFlux.tagName, this.nodes.size);
            this.addNode(printCellTransitionStateFlux);
        }
    }

    /**
     * Remove the printCellTransitionStateFlux.
     */
    removePrintCellTransitionStateFlux() {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintCellTransitionStateFlux.tagName);
        }
    }

    /**
     * @returns The printReactionOperatorColumnSums or undefined.
     */
    getPrintReactionOperatorColumnSums(): PrintReactionOperatorColumnSums | undefined {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintReactionOperatorColumnSums;
        }
        return undefined;
    }

    /**
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     */
    setPrintReactionOperatorColumnSums(printReactionOperatorColumnSums: PrintReactionOperatorColumnSums) {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) {
            this.nodes.set(i, printReactionOperatorColumnSums);
        } else {
            this.index.set(PrintReactionOperatorColumnSums.tagName, this.nodes.size);
            this.addNode(printReactionOperatorColumnSums);
        }
    }

    /**
     * Remove the printReactionOperatorColumnSums.
     */
    removePrintReactionOperatorColumnSums() {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintReactionOperatorColumnSums.tagName);
        }
    }

    /**
     * @returns The printGrainBoltzmann or undefined.
     */
    getPrintGrainBoltzmann(): PrintGrainBoltzmann | undefined {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintGrainBoltzmann;
        }
        return undefined;
    }

    /**
     * @param printGrainBoltzmann The printGrainBoltzmann.
     */
    setPrintGrainBoltzmann(printGrainBoltzmann: PrintGrainBoltzmann) {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainBoltzmann);
        } else {
            this.index.set(PrintGrainBoltzmann.tagName, this.nodes.size);
            this.addNode(printGrainBoltzmann);
        }
    }

    /**
     * Remove the printGrainBoltzmann.
     */
    removePrintGrainBoltzmann() {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainBoltzmann.tagName);
        }
    }

    /**
     * @returns The printGrainDOS or undefined.
     */
    getPrintGrainDOS(): PrintGrainDOS | undefined {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintGrainDOS;
        }
        return undefined;
    }

    /**
     * @param printGrainDOS The printGrainDOS.
     */
    setPrintGrainDOS(printGrainDOS: PrintGrainDOS) {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainDOS);
        } else {
            this.index.set(PrintGrainDOS.tagName, this.nodes.size);
            this.addNode(printGrainDOS);
        }
    }

    /**
     * Remove the printGrainDOS.
     */
    removePrintGrainDOS() {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainDOS.tagName);
        }
    }

    /**
     * @returns The printGrainkbE or undefined.
     */
    getPrintGrainkbE(): PrintGrainkbE | undefined {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintGrainkbE;
        }
        return undefined;
    }

    /**
     * @param printGrainkbE The printGrainkbE.
     */
    setPrintGrainkbE(printGrainkbE: PrintGrainkbE) {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainkbE);
        } else {
            this.index.set(PrintGrainkbE.tagName, this.nodes.size);
            this.addNode(printGrainkbE);
        }
    }

    /**
     * Remove the printGrainkbE.
     */
    removePrintGrainkbE() {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainkbE.tagName);
        }
    }

    /**
     * @returns The printGrainkfE or undefined.
     */
    getPrintGrainkfE(): PrintGrainkfE | undefined {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintGrainkfE;
        }
        return undefined;
    }

    /**
     * @param printGrainkfE The printGrainkfE.
     */
    setPrintGrainkfE(printGrainkfE: PrintGrainkfE) {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainkfE);
        } else {
            this.index.set(PrintGrainkfE.tagName, this.nodes.size);
            this.addNode(printGrainkfE);
        }
    }

    /**
     * Remove the printGrainkfE.
     */
    removePrintGrainkfE() {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainkfE.tagName);
        }
    }

    /**
     * @returns The printTSsos or undefined.
     */
    getPrintTSsos(): PrintTSsos | undefined {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintTSsos;
        }
        return undefined;
    }

    /**
     * @param printTSsos The printTSsos.
     */
    setPrintTSsos(printTSsos: PrintTSsos) {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) {
            this.nodes.set(i, printTSsos);
        } else {
            this.index.set(PrintTSsos.tagName, this.nodes.size);
            this.addNode(printTSsos);
        }
    }

    /**
     * Remove the printTSsos.
     */
    removePrintTSsos() {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintTSsos.tagName);
        }
    }

    /**
     * @returns The printGrainedSpeciesProfile or undefined.
     */
    getPrintGrainedSpeciesProfile(): PrintGrainedSpeciesProfile | undefined {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintGrainedSpeciesProfile;
        }
        return undefined;
    }

    /**
     * @param printGrainedSpeciesProfile The printGrainedSpeciesProfile.
     */
    setPrintGrainedSpeciesProfile(printGrainedSpeciesProfile: PrintGrainedSpeciesProfile) {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainedSpeciesProfile);
        } else {
            this.index.set(PrintGrainedSpeciesProfile.tagName, this.nodes.size);
            this.addNode(printGrainedSpeciesProfile);
        }
    }

    /**
     * Remove the printGrainedSpeciesProfile.
     */
    removePrintGrainedSpeciesProfile() {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainedSpeciesProfile.tagName);
        }
    }

    /**
     * @returns The printGrainTransitionStateFlux or undefined.
     */
    getPrintGrainTransitionStateFlux(): PrintGrainTransitionStateFlux | undefined {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintGrainTransitionStateFlux;
        }
        return undefined;
    }

    /**
     * @param printGrainTransitionStateFlux The printGrainTransitionStateFlux.
     */
    setPrintGrainTransitionStateFlux(printGrainTransitionStateFlux: PrintGrainTransitionStateFlux) {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainTransitionStateFlux);
        } else {
            this.index.set(PrintGrainTransitionStateFlux.tagName, this.nodes.size);
            this.addNode(printGrainTransitionStateFlux);
        }
    }

    /**
     * Remove the printGrainTransitionStateFlux.
     */
    removePrintGrainTransitionStateFlux() {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainTransitionStateFlux.tagName);
        }
    }

    /**
     * @returns The printReactionOperatorSize or undefined.
     */
    getPrintReactionOperatorSize(): PrintReactionOperatorSize | undefined {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintReactionOperatorSize;
        }
        return undefined;
    }

    /**
     * @param printReactionOperatorSize The printReactionOperatorSize.
     */
    setPrintReactionOperatorSize(printReactionOperatorSize: PrintReactionOperatorSize) {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) {
            this.nodes.set(i, printReactionOperatorSize);
        } else {
            this.index.set(PrintReactionOperatorSize.tagName, this.nodes.size);
            this.addNode(printReactionOperatorSize);
        }
    }

    /**
     * Remove the printReactionOperatorSize.
     */
    removePrintReactionOperatorSize() {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintReactionOperatorSize.tagName);
        }
    }

    /**
     * @returns The printSpeciesProfile or undefined.
     */
    getPrintSpeciesProfile(): PrintSpeciesProfile | undefined {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintSpeciesProfile;
        }
        return undefined;
    }

    /**
     * @param printSpeciesProfile The printSpeciesProfile.
     */
    setPrintSpeciesProfile(printSpeciesProfile: PrintSpeciesProfile) {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.set(i, printSpeciesProfile);
        } else {
            this.index.set(PrintSpeciesProfile.tagName, this.nodes.size);
            this.addNode(printSpeciesProfile);
        }
    }

    /**
     * Remove the printSpeciesProfile.
     */
    removePrintSpeciesProfile() {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintSpeciesProfile.tagName);
        }
    }

    /**
     * @returns The printPhenomenologicalEvolution or undefined.
     */
    getPrintPhenomenologicalEvolution(): PrintPhenomenologicalEvolution | undefined {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintPhenomenologicalEvolution;
        }
        return undefined;
    }

    /**
     * @param printPhenomenologicalEvolution The printPhenomenologicalEvolution.
     */
    setPrintPhenomenologicalEvolution(printPhenomenologicalEvolution: PrintPhenomenologicalEvolution) {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) {
            this.nodes.set(i, printPhenomenologicalEvolution);
        } else {
            this.index.set(PrintPhenomenologicalEvolution.tagName, this.nodes.size);
            this.addNode(printPhenomenologicalEvolution);
        }
    }

    /**
     * Remove the printPhenomenologicalEvolution.
     */
    removePrintPhenomenologicalEvolution() {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintPhenomenologicalEvolution.tagName);
        }
    }

    /**
     * @returns The printTunnelingCoefficients or undefined.
     */
    getPrintTunnelingCoefficients(): PrintTunnelingCoefficients | undefined {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintTunnelingCoefficients;
        }
        return undefined;
    }

    /**
     * @param printTunnelingCoefficients The printTunnelingCoefficients.
     */
    setPrintTunnelingCoefficients(printTunnelingCoefficients: PrintTunnelingCoefficients) {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.set(i, printTunnelingCoefficients);
        } else {
            this.index.set(PrintTunnelingCoefficients.tagName, this.nodes.size);
            this.addNode(printTunnelingCoefficients);
        }
    }

    /**
     * Remove the printTunnelingCoefficients.
     */
    removePrintTunnelingCoefficients() {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintTunnelingCoefficients.tagName);
        }
    }

    /**
     * @returns The printCrossingCoefficients or undefined.
     */
    getPrintCrossingCoefficients(): PrintCrossingCoefficients | undefined {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintCrossingCoefficients;
        }
        return undefined;
    }

    /**
     * @param printCrossingCoefficients The printCrossingCoefficients.
     */
    setPrintCrossingCoefficients(printCrossingCoefficients: PrintCrossingCoefficients) {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.set(i, printCrossingCoefficients);
        } else {
            this.index.set(PrintCrossingCoefficients.tagName, this.nodes.size);
            this.addNode(printCrossingCoefficients);
        }
    }

    /**
     * Remove the printCrossingCoefficients.
     */
    removePrintCrossingCoefficients() {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintCrossingCoefficients.tagName);
        }
    }

    /**
     * @returns The testDOS or undefined.
     */
    getTestDOS(): TestDOS | undefined {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as TestDOS;
        }
        return undefined;
    }

    /**
     * @param testDOS The testDOS.
     */
    setTestDOS(testDOS: TestDOS) {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            this.nodes.set(i, testDOS);
        } else {
            this.index.set(TestDOS.tagName, this.nodes.size);
            this.addNode(testDOS);
        }
    }

    /**
     * Remove the testDOS.
     */
    removeTestDOS() {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestDOS.tagName);
        }
    }

    /**
     * @returns The testRateConstant or undefined.
     */
    getTestRateConstants(): TestRateConstants | undefined {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as TestRateConstants;
        }
        return undefined;
    }

    /**
     * @param testRateConstant The testRateConstant.
     */
    setTestRateConstants(testRateConstant: TestRateConstants) {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) {
            this.nodes.set(i, testRateConstant);
        } else {
            this.index.set(TestRateConstants.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }

    /**
     * Remove the testRateConstant.
     */
    removeTestRateConstants() {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestRateConstants.tagName);
        }
    }

    /**
     * @returns The useTheSameCellNumberForAllConditions or undefined.
     */
    getUseTheSameCellNumberForAllConditions(): UseTheSameCellNumberForAllConditions | undefined {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as UseTheSameCellNumberForAllConditions;
        }
        return undefined;
    }

    /**
     * @param useTheSameCellNumberForAllConditions The useTheSameCellNumberForAllConditions.
     */
    setUseTheSameCellNumberForAllConditions(useTheSameCellNumberForAllConditions: UseTheSameCellNumberForAllConditions) {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) {
            this.nodes.set(i, useTheSameCellNumberForAllConditions);
        } else {
            this.index.set(UseTheSameCellNumberForAllConditions.tagName, this.nodes.size);
            this.addNode(useTheSameCellNumberForAllConditions);
        }
    }

    /**
     * Remove the useTheSameCellNumberForAllConditions.
     */
    removeUseTheSameCellNumberForAllConditions() {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(UseTheSameCellNumberForAllConditions.tagName);
        }
    }

    /**
     * @returns The hideInactive or undefined.
     */
    getHideInactive(): HideInactive | undefined {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as HideInactive;
        }
        return undefined;
    }

    /**
     * @param hideInactive The hideInactive.
     */
    setHideInactive(hideInactive: HideInactive) {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) {
            this.nodes.set(i, hideInactive);
        } else {
            this.index.set(HideInactive.tagName, this.nodes.size);
            this.addNode(hideInactive);
        }
    }

    /**
     * Remove the hideInactive.
     */
    removeHideInactive() {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(HideInactive.tagName);
        }
    }

    /**
     * @returns The ForceMacroDetailedBalance or undefined.
     */
    getForceMacroDetailedBalance(): ForceMacroDetailedBalance | undefined {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ForceMacroDetailedBalance;
        }
        return undefined;
    }

    /**
     * @param forceMacroDetailedBalance The forceMacroDetailedBalance.
     */
    setForceMacroDetailedBalance(forceMacroDetailedBalance: ForceMacroDetailedBalance) {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) {
            this.nodes.set(i, forceMacroDetailedBalance);
        } else {
            this.index.set(ForceMacroDetailedBalance.tagName, this.nodes.size);
            this.addNode(forceMacroDetailedBalance);
        }
    }

    /**
     * Remove the forceMacroDetailedBalance.
     */
    removeForceMacroDetailedBalance() {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ForceMacroDetailedBalance.tagName);
        }
    }

    /**
     * @returns The calcMethod or undefined.
     */
    getCalcMethod(): CalcMethod | undefined {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as CalcMethod;
        }
        return undefined;
    }

    /**
     * @param calcMethod The calcMethod.
     */
    setCalcMethod(calcMethod: CalcMethod) {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) {
            this.nodes.set(i, calcMethod);
        } else {
            this.index.set(CalcMethod.tagName, this.nodes.size);
            this.addNode(calcMethod);
        }
    }

    /**
     * Remove the calcMethod.
     */
    removeCalcMethod() {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(CalcMethod.tagName);
        }
    }

    /**
     * @returns The eigenvalues or undefined.
     */
    getEigenvalues(): Eigenvalues | undefined {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Eigenvalues;
        }
        return undefined;
    }

    /**
     * @param eigenvalues The eigenvalues.
     */
    setEigenvalues(eigenvalues: Eigenvalues) {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) {
            this.nodes.set(i, eigenvalues);
        } else {
            this.index.set(Eigenvalues.tagName, this.nodes.size);
            this.addNode(eigenvalues);
        }
    }

    /**
     * Remove the eigenvalues.
     */
    removeEigenvalues() {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Eigenvalues.tagName);
        }
    }

    /**
     * @returns The shortestTimeOfInterest.
     */
    getShortestTimeOfInterest(): ShortestTimeOfInterest | undefined {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ShortestTimeOfInterest;
        }
        return undefined;
    }

    /**
     * @param shortestTimeOfInterest The shortestTimeOfInterest.
     */
    setShortestTimeOfInterest(shortestTimeOfInterest: ShortestTimeOfInterest) {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) {
            this.nodes.set(i, shortestTimeOfInterest);
        } else {
            this.index.set(ShortestTimeOfInterest.tagName, this.nodes.size);
            this.addNode(shortestTimeOfInterest);
        }
    }

    /**
     * Remove the shortestTimeOfInterest.
     */
    removeShortestTimeOfInterest() {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ShortestTimeOfInterest.tagName);
        }
    }

    /**
     * @returns The MaximumEvolutionTime.
     */
    getMaximumEvolutionTime(): MaximumEvolutionTime | undefined {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as MaximumEvolutionTime;
        }
        return undefined;
    }

    /**
     * @param MaximumEvolutionTime The MaximumEvolutionTime.
     */
    setMaximumEvolutionTime(MaximumEvolutionTime: MaximumEvolutionTime) {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            this.nodes.set(i, MaximumEvolutionTime);
        } else {
            this.index.set(MaximumEvolutionTime.tagName, this.nodes.size);
            this.addNode(MaximumEvolutionTime);
        }
    }

    /**
     * Remove the MaximumEvolutionTime.
     */
    removeMaximumEvolutionTime() {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MaximumEvolutionTime.tagName);
        }
    }

    /**
     * @returns The automaticallySetMaxEne.
     */
    getAutomaticallySetMaxEne(): AutomaticallySetMaxEne | undefined {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as AutomaticallySetMaxEne;
        }
        return undefined;
    }

    /**
     * @param automaticallySetMaxEne The automaticallySetMaxEne.
     */
    setAutomaticallySetMaxEne(automaticallySetMaxEne: AutomaticallySetMaxEne) {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            this.nodes.set(i, automaticallySetMaxEne);
        } else {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }

    /**
     * Remove the automaticallySetMaxEne.
     */
    removeAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(AutomaticallySetMaxEne.tagName);
        }
    }

    /**
     * @returns The diagramEnergyOffset.
     */
    getDiagramEnergyOffset(): DiagramEnergyOffset | undefined {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as DiagramEnergyOffset;
        }
        return undefined;
    }

    /**
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */
    setDiagramEnergyOffset(diagramEnergyOffset: DiagramEnergyOffset) {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) {
            this.nodes.set(i, diagramEnergyOffset);
        } else {
            this.index.set(DiagramEnergyOffset.tagName, this.nodes.size);
            this.addNode(diagramEnergyOffset);
        }
    }

    /**
     * Remove the diagramEnergyOffset.
     */
    removeDiagramEnergyOffset() {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(DiagramEnergyOffset.tagName);
        }
    }

    /**
     * @returns The testMicroRates or undefined.
     */
    getTestMicroRates(): TestMicroRates | undefined {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as TestMicroRates;
        }
        return undefined;
    }

    /**
     * @param testMicroRates The testMicroRates.
     */
    setTestMicroRates(testMicroRates: TestMicroRates) {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) {
            this.nodes.set(i, testMicroRates);
        } else {
            this.index.set(TestMicroRates.tagName, this.nodes.size);
            this.addNode(testMicroRates);
        }
    }

    /**
     * Remove the testMicroRates.
     */
    removeTestMicroRates() {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestMicroRates.tagName);
        }
    }

}