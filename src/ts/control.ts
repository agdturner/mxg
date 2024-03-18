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
 */
export class CalcMethod extends StringNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:calcMethod";

    /**
     * The possible values.
     */
    static readonly options: string[] = ["simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation",
        "ThermodynamicTable", "sensitivityAnalysis"];

    /**
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, CalcMethod.tagName, value);
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