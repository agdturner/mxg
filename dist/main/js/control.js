"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = exports.TestMicroRates = exports.DiagramEnergyOffset = exports.AutomaticallySetMaxEne = exports.MaximumEvolutionTime = exports.ShortestTimeOfInterest = exports.Eigenvalues = exports.CalcMethod = exports.HideInactive = exports.ForceMacroDetailedBalance = exports.UseTheSameCellNumberForAllConditions = exports.TestRateConstants = exports.TestDOS = exports.PrintCrossingCoefficients = exports.PrintTunnelingCoefficients = exports.PrintPhenomenologicalEvolution = exports.PrintSpeciesProfile = exports.PrintReactionOperatorSize = exports.PrintGrainTransitionStateFlux = exports.PrintGrainedSpeciesProfile = exports.PrintTSsos = exports.PrintGrainkfE = exports.PrintGrainkbE = exports.PrintGrainDOS = exports.PrintGrainBoltzmann = exports.PrintReactionOperatorColumnSums = exports.PrintCellTransitionStateFlux = exports.PrintCellDOS = exports.CalculateRateCoefficientsOnly = void 0;
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
class TestRateConstants extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:testRateConstants";
    constructor() {
        super(TestRateConstants.tagName);
    }
}
exports.TestRateConstants = TestRateConstants;
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
 * A class for "me:ForceMacroDetailedBalance".
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
 */
class CalcMethod extends xml_1.StringNode {
    /**
     * The tag name.
     */
    static tagName = "me:calcMethod";
    /**
     * The possible values.
     */
    static options = ["simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation",
        "ThermodynamicTable", "sensitivityAnalysis"];
    /**
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, CalcMethod.tagName, value);
    }
}
exports.CalcMethod = CalcMethod;
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
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, TestMicroRates.tagName);
        this.tMin = parseFloat(attributes.get("Tmin"));
        this.tMax = parseFloat(attributes.get("Tmax"));
        this.tStep = parseFloat(attributes.get("Tstep"));
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
     * The index. A map from the tag name to the index of the node in the nodes array.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, Control.tagName);
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
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */
    setTestRateConstants(testRateConstant) {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) {
            this.nodes.set(i, testRateConstant);
        }
        else {
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
     * @param MaximumEvolutionTime The MaximumEvolutionTime.
     */
    setMaximumEvolutionTime(MaximumEvolutionTime) {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            this.nodes.set(i, MaximumEvolutionTime);
        }
        else {
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
//# sourceMappingURL=control.js.map