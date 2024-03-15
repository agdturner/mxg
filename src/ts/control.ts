import {
    Tag, NodeWithNodes, NumberNode
} from "./xml";

/**
 * A class for me:testDOS.
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
 * A class for me:printSpeciesProfile.
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
 * A class for me:testMicroRates.
 */
export class TestMicroRates extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:testMicroRates";

    constructor() {
        super(TestMicroRates.tagName);
    }
}

/**
 * A class for me:testRateConstant.
 */
export class TestRateConstant extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:testRateConstant";

    constructor() {
        super(TestRateConstant.tagName);
    }
}

/**
 * A class for me:printGrainDOS.
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
 * A class for me:printCellDOS.
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
 * A class for me:printReactionOperatorColumnSums.
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
 * A class for me:printTunnellingCoefficients.
 */
export class PrintTunnellingCoefficients extends Tag {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:printTunnellingCoefficients";

    constructor() {
        super(PrintTunnellingCoefficients.tagName);
    }
}

/**
 * A class for me:printGrainkfE.
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
 * A class for me:printGrainBoltzmann.
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
 * A class for me:printGrainkbE.
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
 * A class for me:eigenvalues.
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
 * A class for me:hideInactive.
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
 * A class for me:diagramEnergyOffset.
 */
export class DiagramEnergyOffset extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:diagramEnergyOffset";

    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, DiagramEnergyOffset.tagName, value);
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
     * @param testDOS The testDOS.
     * @param printSpeciesProfile The printSpeciesProfile.
     * @param testMicroRates The testMicroRates.
     * @param testRateConstant T
     * @param printGrainDOS The printGrainDOS.
     * @param printCellDOS The printCellDOS.
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     * @param printGrainkfE The printGrainkfE.
     * @param printGrainBoltzmann The printGrainBoltzmann.
     * @param printGrainkbE The printGrainkbE.
     * @param eigenvalues The eigenvalues.
     * @param hideInactive The hideInactive.
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */
    constructor(attributes: Map<string,string>, testDOS?: TestDOS, printSpeciesProfile?: PrintSpeciesProfile, 
        testMicroRates?: TestMicroRates, testRateConstant?: TestRateConstant, printGrainDOS?: PrintGrainDOS, 
        printCellDOS?: PrintCellDOS, printReactionOperatorColumnSums?: PrintReactionOperatorColumnSums, 
        printTunnellingCoefficients?: PrintTunnellingCoefficients, printGrainkfE?: PrintGrainkfE, 
        printGrainBoltzmann?: PrintGrainBoltzmann, printGrainkbE?: PrintGrainkbE, eigenvalues?: Eigenvalues, 
        hideInactive?: HideInactive, diagramEnergyOffset?: DiagramEnergyOffset) {
        super(attributes, Control.tagName);
        this.index = new Map<string, number>();
        if (testDOS != undefined) {
            this.addNode(testDOS);
            this.index.set(TestDOS.tagName, this.index.size);
        }
        if (printSpeciesProfile != undefined) {
            this.addNode(printSpeciesProfile);
            this.index.set(PrintSpeciesProfile.tagName, this.index.size);
        }
        if (testMicroRates != undefined) {
            this.addNode(testMicroRates);
            this.index.set(TestMicroRates.tagName, this.index.size);
        }
        if (testRateConstant != undefined) {
            this.addNode(testRateConstant);
            this.index.set(TestRateConstant.tagName, this.index.size);
        }
        if (printGrainDOS != undefined) {
            this.addNode(printGrainDOS);
            this.index.set(PrintGrainDOS.tagName, this.index.size);
        }
        if (printCellDOS != undefined) {
            this.addNode(printCellDOS);
            this.index.set(PrintCellDOS.tagName, this.index.size);
        }
        if (printReactionOperatorColumnSums != undefined) {
            this.addNode(printReactionOperatorColumnSums);
            this.index.set(PrintReactionOperatorColumnSums.tagName, this.index.size);
        }
        if (printTunnellingCoefficients != undefined) {
            this.addNode(printTunnellingCoefficients);
            this.index.set(PrintTunnellingCoefficients.tagName, this.index.size);
        }
        if (printGrainkfE != undefined) {
            this.addNode(printGrainkfE);
            this.index.set(PrintGrainkfE.tagName, this.index.size);
        }
        if (printGrainBoltzmann != undefined) {
            this.addNode(printGrainBoltzmann);
            this.index.set(PrintGrainBoltzmann.tagName, this.index.size);
        }
        if (printGrainkbE != undefined) {
            this.addNode(printGrainkbE);
            this.index.set(PrintGrainkbE.tagName, this.index.size);
        }
        if (eigenvalues != undefined) {
            this.addNode(eigenvalues);
            this.index.set(Eigenvalues.tagName, this.index.size);
        }
        if (hideInactive != undefined) {
            this.addNode(hideInactive);
            this.index.set(HideInactive.tagName, this.index.size);
        }
        if (diagramEnergyOffset != undefined) {
            this.addNode(diagramEnergyOffset);
            this.index.set(DiagramEnergyOffset.tagName, this.index.size);
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
     * @returns The PrintSpeciesProfile or undefined.
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
     * @returns The TestMicroRates or undefined.
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

    /**
     * @returns The TestRateConstant or undefined.
     */
    getTestRateConstant(): TestRateConstant | undefined {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as TestRateConstant;
        }
        return undefined;
    }

    /**
     * @param testRateConstant The testRateConstant.
     */
    setTestRateConstant(testRateConstant: TestRateConstant) {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            this.nodes.set(i, testRateConstant);
        } else {
            this.index.set(TestRateConstant.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }

    /**
     * Remove the testRateConstant.
     */
    removeTestRateConstant() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestRateConstant.tagName);
        }
    }

    /**
     * @returns The PrintGrainDOS or undefined.
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
     * @returns The PrintCellDOS or undefined.
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
     * @returns The PrintReactionOperatorColumnSums or undefined.
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
     * @returns The PrintTunnellingCoefficients or undefined.
     */
    getPrintTunnellingCoefficients(): PrintTunnellingCoefficients | undefined {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as PrintTunnellingCoefficients;
        }
        return undefined;
    }

    /**
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     */
    setPrintTunnellingCoefficients(printTunnellingCoefficients: PrintTunnellingCoefficients) {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.set(i, printTunnellingCoefficients);
        } else {
            this.index.set(PrintTunnellingCoefficients.tagName, this.nodes.size);
            this.addNode(printTunnellingCoefficients);
        }
    }

    /**
     * Remove the printTunnellingCoefficients.
     */
    removePrintTunnellingCoefficients() {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintTunnellingCoefficients.tagName);
        }
    }

    /**
     * @returns The PrintGrainkfE or undefined.
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
     * @returns The PrintGrainBoltzmann or undefined.
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
     * @returns The PrintGrainkbE or undefined.
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
     * @returns The diagramEnergyOffset or undefined.
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

}