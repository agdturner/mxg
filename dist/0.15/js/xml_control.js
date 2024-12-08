"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensitivityNumVarRedIters = exports.SensitivityAnalysisOrder = exports.SensitivityAnalysisSamples = exports.CalcMethodThermodynamicTable = exports.Tstep = exports.Tmax = exports.Tmid = exports.Tmin = exports.CalcMethodAnalyticalRepresentation = exports.ChebPExSize = exports.ChebTExSize = exports.ChebMinConc = exports.ChebMaxConc = exports.ChebMinTemp = exports.ChebMaxTemp = exports.ChebNumConc = exports.ChebNumTemp = exports.Precision = exports.Format = exports.UseTraceWeighting = exports.CalcMethodMarquardt = exports.MarquardtDerivDelta = exports.MarquardtTolerance = exports.MarquardtIterations = exports.CalcMethodFitting = exports.FittingIterations = exports.CalcMethodGridSearch = exports.CalcMethodSimpleCalc = exports.CalcMethod = exports.HideInactive = exports.ForceMacroDetailedBalance = exports.UseTheSameCellNumberForAllConditions = exports.TestRateConstant = exports.TestDOS = exports.PrintCrossingCoefficients = exports.PrintTunnelingCoefficients = exports.PrintPhenomenologicalEvolution = exports.PrintSpeciesProfile = exports.PrintReactionOperatorSize = exports.PrintGrainTransitionStateFlux = exports.PrintGrainedSpeciesProfile = exports.PrintTSsos = exports.PrintGrainkfE = exports.PrintGrainkbE = exports.PrintGrainDOS = exports.PrintGrainBoltzmann = exports.PrintReactionOperatorColumnSums = exports.PrintCellTransitionStateFlux = exports.PrintCellDOS = exports.CalculateRateCoefficientsOnly = void 0;
exports.Control = exports.TestMicroRates = exports.DiagramEnergyOffset = exports.AutomaticallySetMaxEne = exports.MaximumEvolutionTime = exports.ShortestTimeOfInterest = exports.Eigenvalues = exports.CalcMethodSensitivityAnalysis = exports.SensitivityVarRedMethod = void 0;
const big_js_1 = __importDefault(require("big.js"));
const xml_1 = require("./xml");
/**
 * A class for "me:calculateRateCoefficientsOnly".
 */
class CalculateRateCoefficientsOnly extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:calculateRateCoefficientsOnly";
    constructor() {
        super(CalculateRateCoefficientsOnly.tagName);
    }
}
exports.CalculateRateCoefficientsOnly = CalculateRateCoefficientsOnly;
/**
 * A class for "me:printCellDOS".
 */
class PrintCellDOS extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printCellDOS";
    constructor() {
        super(PrintCellDOS.tagName);
    }
}
exports.PrintCellDOS = PrintCellDOS;
/**
 * A class for "me:printCellTransitionStateFlux".
 */
class PrintCellTransitionStateFlux extends xml_1.Tag {
    /**
    * The tag name.
    */
    static tagName = "me:printCellTransitionStateFlux";
    constructor() {
        super(PrintCellTransitionStateFlux.tagName);
    }
}
exports.PrintCellTransitionStateFlux = PrintCellTransitionStateFlux;
/**
 * A class for "me:printReactionOperatorColumnSums".
 */
class PrintReactionOperatorColumnSums extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printReactionOperatorColumnSums";
    constructor() {
        super(PrintReactionOperatorColumnSums.tagName);
    }
}
exports.PrintReactionOperatorColumnSums = PrintReactionOperatorColumnSums;
/**
 * A class for "me:printGrainBoltzmann".
 */
class PrintGrainBoltzmann extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printGrainBoltzmann";
    constructor() {
        super(PrintGrainBoltzmann.tagName);
    }
}
exports.PrintGrainBoltzmann = PrintGrainBoltzmann;
/**
 * A class for "me:printGrainDOS".
 */
class PrintGrainDOS extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printGrainDOS";
    constructor() {
        super(PrintGrainDOS.tagName);
    }
}
exports.PrintGrainDOS = PrintGrainDOS;
/**
 * A class for "me:printGrainkbE".
 */
class PrintGrainkbE extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printGrainkbE";
    constructor() {
        super(PrintGrainkbE.tagName);
    }
}
exports.PrintGrainkbE = PrintGrainkbE;
/**
 * A class for "me:printGrainkfE".
 */
class PrintGrainkfE extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printGrainkfE";
    constructor() {
        super(PrintGrainkfE.tagName);
    }
}
exports.PrintGrainkfE = PrintGrainkfE;
/**
 * A class for "me:printTSsos".
 */
class PrintTSsos extends xml_1.Tag {
    /**
    * The tag name.
    */
    static tagName = "me:printTSsos";
    constructor() {
        super(PrintTSsos.tagName);
    }
}
exports.PrintTSsos = PrintTSsos;
/**
 * A class for "me:printGrainedSpeciesProfile".
 */
class PrintGrainedSpeciesProfile extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printGrainedSpeciesProfile";
    constructor() {
        super(PrintGrainedSpeciesProfile.tagName);
    }
}
exports.PrintGrainedSpeciesProfile = PrintGrainedSpeciesProfile;
/**
 * A class for "me:printGrainTransitionStateFlux".
 */
class PrintGrainTransitionStateFlux extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printGrainTransitionStateFlux";
    constructor() {
        super(PrintGrainTransitionStateFlux.tagName);
    }
}
exports.PrintGrainTransitionStateFlux = PrintGrainTransitionStateFlux;
/**
 * A class for "me:printReactionOperatorSize".
 */
class PrintReactionOperatorSize extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printReactionOperatorSize";
    constructor() {
        super(PrintReactionOperatorSize.tagName);
    }
}
exports.PrintReactionOperatorSize = PrintReactionOperatorSize;
/**
 * A class for "me:printSpeciesProfile".
 */
class PrintSpeciesProfile extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printSpeciesProfile";
    constructor() {
        super(PrintSpeciesProfile.tagName);
    }
}
exports.PrintSpeciesProfile = PrintSpeciesProfile;
/**
 * A class for "me:printPhenomenologicalEvolution".
 */
class PrintPhenomenologicalEvolution extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printPhenomenologicalEvolution";
    constructor() {
        super(PrintPhenomenologicalEvolution.tagName);
    }
}
exports.PrintPhenomenologicalEvolution = PrintPhenomenologicalEvolution;
/**
 * A class for "me:printTunnelingCoefficients".
 */
class PrintTunnelingCoefficients extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printTunnelingCoefficients";
    constructor() {
        super(PrintTunnelingCoefficients.tagName);
    }
}
exports.PrintTunnelingCoefficients = PrintTunnelingCoefficients;
/**
 * A class for "me:printCrossingCoefficients".
 */
class PrintCrossingCoefficients extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printCrossingCoefficients";
    constructor() {
        super(PrintCrossingCoefficients.tagName);
    }
}
exports.PrintCrossingCoefficients = PrintCrossingCoefficients;
/**
 * A class for "me:testDOS".
 */
class TestDOS extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:testDOS";
    constructor() {
        super(TestDOS.tagName);
    }
}
exports.TestDOS = TestDOS;
/**
 * A class for "me:testRateConstant".
 */
class TestRateConstant extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:testRateConstant";
    constructor() {
        super(TestRateConstant.tagName);
    }
}
exports.TestRateConstant = TestRateConstant;
/**
 * A class for "me:useTheSameCellNumberForAllConditions.
 */
class UseTheSameCellNumberForAllConditions extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:useTheSameCellNumberForAllConditions";
    constructor() {
        super(UseTheSameCellNumberForAllConditions.tagName);
    }
}
exports.UseTheSameCellNumberForAllConditions = UseTheSameCellNumberForAllConditions;
/**
 * A class for "me:ForceMacroDetailedBalance.
 */
class ForceMacroDetailedBalance extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:ForceMacroDetailedBalance";
    constructor() {
        super(ForceMacroDetailedBalance.tagName);
    }
}
exports.ForceMacroDetailedBalance = ForceMacroDetailedBalance;
/**
 * A class for "me:hideInactive".
 */
class HideInactive extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:hideInactive";
    constructor() {
        super(HideInactive.tagName);
    }
}
exports.HideInactive = HideInactive;
/**
 * A class for "me:calcMethod".
 * Expected to have an attribute "xsi_type" or "name" with one of the following values:
 * "simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation", "ThermodynamicTable", "sensitivityAnalysis",
 * "me:simpleCalc", "me:gridSearch", "me:fitting", "me:marquardt", "me:analyticalRepresentation", "me:ThermodynamicTable", "me:sensitivityAnalysis".
 */
class CalcMethod extends xml_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:calcMethod";
    /**
     * The possible values.
     */
    static options = ["simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation",
        "ThermodynamicTable", "sensitivityAnalysis", "me:simpleCalc", "me:gridSearch", "me:fitting", "me:marquardt",
        "me:analyticalRepresentation", "me:ThermodynamicTable", "me:sensitivityAnalysis"];
    /**
     * @param value The value.
     */
    constructor(attributes) {
        super(attributes, CalcMethod.tagName);
    }
}
exports.CalcMethod = CalcMethod;
/**
 * A class for "me:SimpleCalc" CalcMethod.
 */
class CalcMethodSimpleCalc extends CalcMethod {
    /**
     * The xsi_type.
     */
    static xsi_type = "me:simpleCalc";
    /**
     * The xsi_type2.
     */
    static xsi_type2 = "simpleCalc";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes);
    }
}
exports.CalcMethodSimpleCalc = CalcMethodSimpleCalc;
/**
 * A class for "me:GridSearch" CalcMethod.
 */
class CalcMethodGridSearch extends CalcMethod {
    /**
    * The xsi_type.
    */
    static xsi_type = "me:gridSearch";
    /**
     * The xsi_type2.
     */
    static xsi_type2 = "gridSearch";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes);
    }
}
exports.CalcMethodGridSearch = CalcMethodGridSearch;
/**
 * A class for "me:fittingIterations".
 */
class FittingIterations extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:fittingIterations";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, FittingIterations.tagName, value);
    }
}
exports.FittingIterations = FittingIterations;
/**
 * A class for "me:Fitting" CalcMethod.
 * Nodes:
 * "me:fittingIterations"
 */
class CalcMethodFitting extends CalcMethod {
    /**
     * The xsi_type.
     */
    static xsi_type = "me:fitting";
    /**
     * The xsi_type2.
     */
    static xsi_type2 = "fitting";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, fittingIterations) {
        super(attributes);
        if (fittingIterations != undefined) {
            this.addNode(fittingIterations);
        }
    }
    /**
     * @returns The fittingIterations or undefined.
     */
    getFittingIterations() {
        return this.nodes.get(0);
    }
    /**
     * @param fittingIterations The fittingIterations.
     */
    setFittingIterations(fittingIterations) {
        this.nodes.set(0, fittingIterations);
    }
    /**
     * Remove the fittingIterations.
     */
    removeFittingIterations() {
        this.nodes.delete(0);
    }
}
exports.CalcMethodFitting = CalcMethodFitting;
/**
 * A class for "me:MarquardtIterations".
 */
class MarquardtIterations extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:MarquardtIterations";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, MarquardtIterations.tagName, value);
    }
}
exports.MarquardtIterations = MarquardtIterations;
/**
 * A class for "me:MarquardtTolerance".
 */
class MarquardtTolerance extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:MarquardtTolerance";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, MarquardtTolerance.tagName, value);
    }
}
exports.MarquardtTolerance = MarquardtTolerance;
/**
 * A class for "me:MarquardtDerivDelta".
 */
class MarquardtDerivDelta extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:MarquardtDerivDelta";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, MarquardtDerivDelta.tagName, value);
    }
}
exports.MarquardtDerivDelta = MarquardtDerivDelta;
class CalcMethodMarquardt extends CalcMethod {
    /**
     * The tag name.
     */
    static xsi_type = "me:marquardt";
    /**
     * The tag name.
     */
    static xsi_type2 = "marquardt";
    static MarquardtDerivDeltaDefault = "1.e-03";
    static MarquardtTolerance = "1.e-03";
    static MarquardtLambda = "1.0";
    static MarquardtLambdaScale = "10.0";
    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, marquardtIterations, marquardtTolerance, marquardtDerivDelta) {
        super(attributes);
        this.index = new Map();
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
    getMarquardtIterations() {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param marquardtIterations The marquardtIterations.
     */
    setMarquardtIterations(marquardtIterations) {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) {
            this.nodes.set(i, marquardtIterations);
        }
        else {
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
    getMarquardtTolerance() {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param marquardtTolerance The marquardtTolerance.
     */
    setMarquardtTolerance(marquardtTolerance) {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) {
            this.nodes.set(i, marquardtTolerance);
        }
        else {
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
    getMarquardtDerivDelta() {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param marquardtDerivDelta The marquardtDerivDelta.
     */
    setMarquardtDerivDelta(marquardtDerivDelta) {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) {
            this.nodes.set(i, marquardtDerivDelta);
        }
        else {
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
exports.CalcMethodMarquardt = CalcMethodMarquardt;
/**
 * A class for "me:useTraceWeighting".
 */
class UseTraceWeighting extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:useTraceWeighting";
    constructor() {
        super(UseTraceWeighting.tagName);
    }
}
exports.UseTraceWeighting = UseTraceWeighting;
/**
 * A class for "me:format".
 * The attributes may have the following keys:
 * "representation" (with known value: "Plog")
 * "rateUnits" (with known values: "cm3mole-1s-1", "cm3molecule-1s-1")
 * Values include:
 * "cantera", "chemkin"
 */
class Format extends xml_1.StringNode {
    /**
    * The tag name.
    */
    static tagName = "me:format";
    /**
     * The options.
     */
    static options = ["cantera", "chemkin"];
    /**
     * The rateUnits.
     */
    static rateUnits = "rateUnits";
    /**
     * The rateUnits options.
     */
    static rateUnitsOptions = ["cm3mole-1s-1", "cm3molecule-1s-1"];
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Format.tagName, value);
    }
    /**
     * @returns The value of the "rateUnits" attribute or undefined.
     */
    getRateUnits() {
        return this.attributes.get(Format.rateUnits);
    }
    /**
     * @param rateUnits The value of the "rateUnits" attribute.
     */
    setRateUnits(rateUnits) {
        this.attributes.set(Format.rateUnits, rateUnits);
    }
    /**
     * Remove the "rateUnits" attribute.
     */
    removeRateUnits() {
        this.attributes.delete(Format.rateUnits);
    }
}
exports.Format = Format;
/**
 * A class for "me:precision".
 * Known values include:
 * "d", "dd", "qd", "double", "double-double" or "quad-double"
 */
class Precision extends xml_1.StringNode {
    /**
    * The tag name.
    */
    static tagName = "me:precision";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Precision.tagName, value);
    }
}
exports.Precision = Precision;
/**
 * A class for "me:chebNumTemp".
 */
class ChebNumTemp extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebNumTemp";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebNumTemp.tagName, value);
    }
}
exports.ChebNumTemp = ChebNumTemp;
/**
 * A class for "me:chebNumConc".
 */
class ChebNumConc extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebNumConc";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebNumConc.tagName, value);
    }
}
exports.ChebNumConc = ChebNumConc;
/**
 * A class for "me:chebMaxTemp".
 */
class ChebMaxTemp extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebMaxTemp";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebMaxTemp.tagName, value);
    }
}
exports.ChebMaxTemp = ChebMaxTemp;
/**
 * A class for "me:chebMinTemp".
 */
class ChebMinTemp extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebMinTemp";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebMinTemp.tagName, value);
    }
}
exports.ChebMinTemp = ChebMinTemp;
/**
 * A class for "me:chebMaxConc".
 * Known attributes include:
 * "units" (known values include "atm").
 */
class ChebMaxConc extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebMaxConc";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebMaxConc.tagName, value);
    }
    /**
     * @returns The units.
     */
    getUnits() {
        return this.attributes.get("units");
    }
    /**
     * @param units The units.
     */
    setUnits(units) {
        this.attributes.set("units", units);
    }
}
exports.ChebMaxConc = ChebMaxConc;
/**
 * A class for "me:chebMinConc".
 */
class ChebMinConc extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebMinConc";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebMinConc.tagName, value);
    }
}
exports.ChebMinConc = ChebMinConc;
/**
 * A class for "me:chebTExSize".
 */
class ChebTExSize extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebTExSize";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebTExSize.tagName, value);
    }
}
exports.ChebTExSize = ChebTExSize;
/**
 * A class for "me:chebPExSize".
 */
class ChebPExSize extends xml_1.NumberNode {
    /**
    * The tag name.
    */
    static tagName = "me:chebPExSize";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ChebPExSize.tagName, value);
    }
}
exports.ChebPExSize = ChebPExSize;
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
class CalcMethodAnalyticalRepresentation extends CalcMethod {
    /**
     * The tag name.
     */
    static xsi_type = "me:analyticalRepresentation";
    /**
     * The tag name.
     */
    static xsi_type2 = "analyticalRepresentation";
    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, format, precision, chebNumTemp, chebNumConc, chebMaxTemp, chebMinTemp, chebMaxConc, chebMinConc, chebTExSize, chebPExSize) {
        super(attributes);
        this.index = new Map();
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
    getFormat() {
        let i = this.index.get(Format.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param format The format.
     */
    setFormat(format) {
        let i = this.index.get(Format.tagName);
        if (i != undefined) {
            this.nodes.set(i, format);
        }
        else {
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
    getPrecision() {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param precision The precision.
     */
    setPrecision(precision) {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) {
            this.nodes.set(i, precision);
        }
        else {
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
    getChebNumTemp() {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebNumTemp The chebNumTemp.
     */
    setChebNumTemp(chebNumTemp) {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebNumTemp);
        }
        else {
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
    getChebNumConc() {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebNumConc The chebNumConc.
     */
    setChebNumConc(chebNumConc) {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebNumConc);
        }
        else {
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
    getChebMaxTemp() {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebMaxTemp The chebMaxTemp.
     */
    setChebMaxTemp(chebMaxTemp) {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMaxTemp);
        }
        else {
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
    getChebMinTemp() {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebMinTemp The chebMinTemp.
     */
    setChebMinTemp(chebMinTemp) {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMinTemp);
        }
        else {
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
    getChebMaxConc() {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebMaxConc The chebMaxConc.
     */
    setChebMaxConc(chebMaxConc) {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMaxConc);
        }
        else {
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
    getChebMinConc() {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebMinConc The chebMinConc.
     */
    setChebMinConc(chebMinConc) {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebMinConc);
        }
        else {
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
    getChebTExSize() {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebTExSize The chebTExSize.
     */
    setChebTExSize(chebTExSize) {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebTExSize);
        }
        else {
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
    getChebPExSize() {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param chebPExSize The chebPExSize.
     */
    setChebPExSize(chebPExSize) {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) {
            this.nodes.set(i, chebPExSize);
        }
        else {
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
exports.CalcMethodAnalyticalRepresentation = CalcMethodAnalyticalRepresentation;
/**
 * A class for "me:Tmin" CalcMethod.
 */
class Tmin extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:Tmin";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Tmin.tagName, value);
    }
}
exports.Tmin = Tmin;
/**
 * A class for "me:Tmid" CalcMethod.
 */
class Tmid extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:Tmid";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Tmid.tagName, value);
    }
}
exports.Tmid = Tmid;
/**
 * A class for "me:Tmax" CalcMethod.
 */
class Tmax extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:Tmax";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Tmax.tagName, value);
    }
}
exports.Tmax = Tmax;
/**
 * A class for "me:Tstep" CalcMethod.
 */
class Tstep extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:Tstep";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Tstep.tagName, value);
    }
}
exports.Tstep = Tstep;
/**
 * A class for "me:ThermodynamicTable" CalcMethod.
 * Expected to have attributes:
 * "xsi_type" with the value "me:ThermodynamicTable";
 * "units" with known values "kJ/mol".
 * Nodes:
 * "me:Tmin", "me:Tmid", "me:Tmax", "me:Tstep".
 */
class CalcMethodThermodynamicTable extends CalcMethod {
    /**
     * The tag name.
     */
    static xsi_type = "me:ThermodynamicTable";
    /**
     * The tag name.
     */
    static xsi_type2 = "ThermodynamicTable";
    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, tmin, tmid, tmax, tstep) {
        super(attributes);
        this.index = new Map();
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
    getTmin() {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param tmin The tmin.
     */
    setTmin(tmin) {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) {
            this.nodes.set(i, tmin);
        }
        else {
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
    getTmid() {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param tmid The tmid.
     */
    setTmid(tmid) {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) {
            this.nodes.set(i, tmid);
        }
        else {
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
    getTmax() {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param tmax The tmax.
     */
    setTmax(tmax) {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) {
            this.nodes.set(i, tmax);
        }
        else {
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
    getTstep() {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param tstep The tstep.
     */
    setTstep(tstep) {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) {
            this.nodes.set(i, tstep);
        }
        else {
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
exports.CalcMethodThermodynamicTable = CalcMethodThermodynamicTable;
/**
 * A class for "me:sensitivityAnalysisSamples".
 */
class SensitivityAnalysisSamples extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:sensitivityAnalysisSamples";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, SensitivityAnalysisSamples.tagName, value);
    }
}
exports.SensitivityAnalysisSamples = SensitivityAnalysisSamples;
/**
 * A class for "me:sensitivityAnalysisOrder".
 */
class SensitivityAnalysisOrder extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:sensitivityAnalysisOrder";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, SensitivityAnalysisOrder.tagName, value);
    }
}
exports.SensitivityAnalysisOrder = SensitivityAnalysisOrder;
/**
 * A class for "me:sensitivityNumVarRedIters".
 */
class SensitivityNumVarRedIters extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:sensitivityNumVarRedIters";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, SensitivityNumVarRedIters.tagName, value);
    }
}
exports.SensitivityNumVarRedIters = SensitivityNumVarRedIters;
/**
 * A class for "sensitivityVarRedMethod".
 */
class SensitivityVarRedMethod extends xml_1.StringNode {
    /**
     * The tag name.
     */
    static tagName = "me:sensitivityVarRedMethod";
    /**
     * The options.
     */
    static options = ["AdditiveControl", "RatioControl"];
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, SensitivityVarRedMethod.tagName, value);
    }
}
exports.SensitivityVarRedMethod = SensitivityVarRedMethod;
/**
 * A class for "me:sensitivityAnalysis".
 * Nodes:
 * "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters", "me:sensitivityVarRedMethod".
 */
class CalcMethodSensitivityAnalysis extends CalcMethod {
    /**
    * The xsi_type.
    */
    static xsi_type = "me:sensitivityAnalysis";
    /**
     * The xsi_type2.
     */
    static xsi_type2 = "sensitivityAnalysis";
    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, sensitivityAnalysisSamples, sensitivityAnalysisOrder, sensitivityNumVarRedIters, sensitivityVarRedMethod) {
        super(attributes);
        this.index = new Map();
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
    getSensitivityAnalysisSamples() {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param sensitivityAnalysisSamples The sensitivityAnalysisSamples.
     */
    setSensitivityAnalysisSamples(sensitivityAnalysisSamples) {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityAnalysisSamples);
        }
        else {
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
    getSensitivityAnalysisOrder() {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param sensitivityAnalysisOrder The sensitivityAnalysisOrder.
     */
    setSensitivityAnalysisOrder(sensitivityAnalysisOrder) {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityAnalysisOrder);
        }
        else {
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
    getSensitivityNumVarRedIters() {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param sensitivityNumVarRedIters The sensitivityNumVarRedIters.
     */
    setSensitivityNumVarRedIters(sensitivityNumVarRedIters) {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityNumVarRedIters);
        }
        else {
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
    getSensitivityVarRedMethod() {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param sensitivityVarRedMethod The sensitivityVarRedMethod.
     */
    setSensitivityVarRedMethod(sensitivityVarRedMethod) {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) {
            this.nodes.set(i, sensitivityVarRedMethod);
        }
        else {
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
exports.CalcMethodSensitivityAnalysis = CalcMethodSensitivityAnalysis;
/**
 * A class for "me:eigenvalues".
 */
class Eigenvalues extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:eigenvalues";
    constructor(attributes, value) {
        super(attributes, Eigenvalues.tagName, value);
    }
}
exports.Eigenvalues = Eigenvalues;
/**
 * A class for "me:shortestTimeOfInterest".
 */
class ShortestTimeOfInterest extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:shortestTimeOfInterest";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ShortestTimeOfInterest.tagName, value);
    }
}
exports.ShortestTimeOfInterest = ShortestTimeOfInterest;
/**
 * A class for "me:MaximumEvolutionTime".
 */
class MaximumEvolutionTime extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:MaximumEvolutionTime";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, MaximumEvolutionTime.tagName, value);
    }
}
exports.MaximumEvolutionTime = MaximumEvolutionTime;
/**
 * A class for "me:automaticallySetMaxEne".
 */
class AutomaticallySetMaxEne extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:automaticallySetMaxEne";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, AutomaticallySetMaxEne.tagName, value);
    }
}
exports.AutomaticallySetMaxEne = AutomaticallySetMaxEne;
/**
 * A class for "me:diagramEnergyOffset".
 */
class DiagramEnergyOffset extends xml_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:diagramEnergyOffset";
    /**
      * @param attributes The attributes.
      * @param value The value.
      */
    constructor(attributes, value) {
        super(attributes, DiagramEnergyOffset.tagName, value);
    }
}
exports.DiagramEnergyOffset = DiagramEnergyOffset;
/**
 * A class for "me:testMicroRates".
 * Expected numerical attributes: Tmin, Tmax, Tstep.
 */
class TestMicroRates extends xml_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:testMicroRates";
    /**
     * The minimum temperature.
     */
    tMin;
    /**
     * The maximum temperature.
     */
    tMax;
    /**
     * The temperature step.
     */
    tStep;
    static s_Tmin = "Tmin";
    static s_Tmax = "Tmax";
    static s_Tstep = "Tstep";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, TestMicroRates.tagName);
        this.tMin = new big_js_1.default(attributes.get(TestMicroRates.s_Tmin));
        this.tMax = new big_js_1.default(attributes.get(TestMicroRates.s_Tmax));
        this.tStep = new big_js_1.default(attributes.get(TestMicroRates.s_Tstep));
    }
    /**
     * @returns The maximum temperature.
     */
    getTmin() {
        return this.tMin;
    }
    /**
     * @param tMin The minimum temperature.
     */
    setTmin(tMin) {
        this.tMin = tMin;
        this.attributes?.set("Tmin", tMin.toString());
    }
    /**
     * @returns The maximum temperature.
     */
    getTmax() {
        return this.tMax;
    }
    /**
     * @param tMax The maximum temperature.
     */
    setTmax(tMax) {
        this.tMax = tMax;
        this.attributes?.set("Tmax", tMax.toString());
    }
    /**
     * @returns The temperature step.
     */
    getTstep() {
        return this.tStep;
    }
    /**
     * @param tStep The temperature step.
     */
    setTstep(tStep) {
        this.tStep = tStep;
        this.attributes?.set("Tstep", tStep.toString());
    }
}
exports.TestMicroRates = TestMicroRates;
/**
 * A class for the control.
 */
class Control extends xml_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:control";
    /**
     * The id.
     */
    id;
    /**
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, id) {
        super(attributes, Control.tagName);
        this.id = id;
        this.index = new Map();
    }
    /**
     * @returns The calculateRateCoefficientsOnly or undefined.
     */
    getCalculateRateCoefficientsOnly() {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param calculateRateCoefficientsOnly The calculateRateCoefficientsOnly.
     */
    setCalculateRateCoefficientsOnly(calculateRateCoefficientsOnly) {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) {
            this.nodes.set(i, calculateRateCoefficientsOnly);
        }
        else {
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
    getPrintCellDOS() {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printCellDOS The printCellDOS.
     */
    setPrintCellDOS(printCellDOS) {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) {
            this.nodes.set(i, printCellDOS);
        }
        else {
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
    getPrintCellTransitionStateFlux() {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printCellTransitionStateFlux The printCellTransitionStateFlux.
     */
    setPrintCellTransitionStateFlux(printCellTransitionStateFlux) {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.set(i, printCellTransitionStateFlux);
        }
        else {
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
    getPrintReactionOperatorColumnSums() {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     */
    setPrintReactionOperatorColumnSums(printReactionOperatorColumnSums) {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) {
            this.nodes.set(i, printReactionOperatorColumnSums);
        }
        else {
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
    getPrintGrainBoltzmann() {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printGrainBoltzmann The printGrainBoltzmann.
     */
    setPrintGrainBoltzmann(printGrainBoltzmann) {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainBoltzmann);
        }
        else {
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
    getPrintGrainDOS() {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printGrainDOS The printGrainDOS.
     */
    setPrintGrainDOS(printGrainDOS) {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainDOS);
        }
        else {
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
    getPrintGrainkbE() {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printGrainkbE The printGrainkbE.
     */
    setPrintGrainkbE(printGrainkbE) {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainkbE);
        }
        else {
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
    getPrintGrainkfE() {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printGrainkfE The printGrainkfE.
     */
    setPrintGrainkfE(printGrainkfE) {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainkfE);
        }
        else {
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
    getPrintTSsos() {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printTSsos The printTSsos.
     */
    setPrintTSsos(printTSsos) {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) {
            this.nodes.set(i, printTSsos);
        }
        else {
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
    getPrintGrainedSpeciesProfile() {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printGrainedSpeciesProfile The printGrainedSpeciesProfile.
     */
    setPrintGrainedSpeciesProfile(printGrainedSpeciesProfile) {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainedSpeciesProfile);
        }
        else {
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
    getPrintGrainTransitionStateFlux() {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printGrainTransitionStateFlux The printGrainTransitionStateFlux.
     */
    setPrintGrainTransitionStateFlux(printGrainTransitionStateFlux) {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.set(i, printGrainTransitionStateFlux);
        }
        else {
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
    getPrintReactionOperatorSize() {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printReactionOperatorSize The printReactionOperatorSize.
     */
    setPrintReactionOperatorSize(printReactionOperatorSize) {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) {
            this.nodes.set(i, printReactionOperatorSize);
        }
        else {
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
    getPrintSpeciesProfile() {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printSpeciesProfile The printSpeciesProfile.
     */
    setPrintSpeciesProfile(printSpeciesProfile) {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.set(i, printSpeciesProfile);
        }
        else {
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
    getPrintPhenomenologicalEvolution() {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printPhenomenologicalEvolution The printPhenomenologicalEvolution.
     */
    setPrintPhenomenologicalEvolution(printPhenomenologicalEvolution) {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) {
            this.nodes.set(i, printPhenomenologicalEvolution);
        }
        else {
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
    getPrintTunnelingCoefficients() {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printTunnelingCoefficients The printTunnelingCoefficients.
     */
    setPrintTunnelingCoefficients(printTunnelingCoefficients) {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.set(i, printTunnelingCoefficients);
        }
        else {
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
    getPrintCrossingCoefficients() {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printCrossingCoefficients The printCrossingCoefficients.
     */
    setPrintCrossingCoefficients(printCrossingCoefficients) {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.set(i, printCrossingCoefficients);
        }
        else {
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
    getTestDOS() {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param testDOS The testDOS.
     */
    setTestDOS(testDOS) {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            this.nodes.set(i, testDOS);
        }
        else {
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
    getTestRateConstants() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */
    setTestRateConstants(testRateConstant) {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            this.nodes.set(i, testRateConstant);
        }
        else {
            this.index.set(TestRateConstant.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */
    removeTestRateConstants() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestRateConstant.tagName);
        }
    }
    /**
     * @returns The useTheSameCellNumberForAllConditions or undefined.
     */
    getUseTheSameCellNumberForAllConditions() {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param useTheSameCellNumberForAllConditions The useTheSameCellNumberForAllConditions.
     */
    setUseTheSameCellNumberForAllConditions(useTheSameCellNumberForAllConditions) {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) {
            this.nodes.set(i, useTheSameCellNumberForAllConditions);
        }
        else {
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
    getHideInactive() {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param hideInactive The hideInactive.
     */
    setHideInactive(hideInactive) {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) {
            this.nodes.set(i, hideInactive);
        }
        else {
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
    getForceMacroDetailedBalance() {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param forceMacroDetailedBalance The forceMacroDetailedBalance.
     */
    setForceMacroDetailedBalance(forceMacroDetailedBalance) {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) {
            this.nodes.set(i, forceMacroDetailedBalance);
        }
        else {
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
    getCalcMethod() {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param calcMethod The calcMethod.
     */
    setCalcMethod(calcMethod) {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) {
            this.nodes.set(i, calcMethod);
        }
        else {
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
    getEigenvalues() {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param eigenvalues The eigenvalues.
     */
    setEigenvalues(eigenvalues) {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) {
            this.nodes.set(i, eigenvalues);
        }
        else {
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
    getShortestTimeOfInterest() {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param shortestTimeOfInterest The shortestTimeOfInterest.
     */
    setShortestTimeOfInterest(shortestTimeOfInterest) {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) {
            this.nodes.set(i, shortestTimeOfInterest);
        }
        else {
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
    getMaximumEvolutionTime() {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param maximumEvolutionTime The MaximumEvolutionTime.
     */
    setMaximumEvolutionTime(maximumEvolutionTime) {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            this.nodes.set(i, maximumEvolutionTime);
        }
        else {
            this.index.set(MaximumEvolutionTime.tagName, this.nodes.size);
            this.addNode(maximumEvolutionTime);
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
    getAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param automaticallySetMaxEne The automaticallySetMaxEne.
     */
    setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            this.nodes.set(i, automaticallySetMaxEne);
        }
        else {
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
    getDiagramEnergyOffset() {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */
    setDiagramEnergyOffset(diagramEnergyOffset) {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) {
            this.nodes.set(i, diagramEnergyOffset);
        }
        else {
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
    getTestMicroRates() {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param testMicroRates The testMicroRates.
     */
    setTestMicroRates(testMicroRates) {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) {
            this.nodes.set(i, testMicroRates);
        }
        else {
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
exports.Control = Control;
//# sourceMappingURL=xml_control.js.map