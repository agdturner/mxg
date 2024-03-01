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

    getTestDOS(): TestDOS | undefined {
        const index = this.index.get(TestDOS.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as TestDOS;
        }
        return undefined;
    }

    getPrintSpeciesProfile(): PrintSpeciesProfile | undefined {
        const index = this.index.get(PrintSpeciesProfile.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintSpeciesProfile;
        }
        return undefined;
    }

    getTestMicroRates(): TestMicroRates | undefined {
        const index = this.index.get(TestMicroRates.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as TestMicroRates;
        }
        return undefined;
    }

    getTestRateConstant(): TestRateConstant | undefined {
        const index = this.index.get(TestRateConstant.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as TestRateConstant;
        }
        return undefined;
    }

    getPrintGrainDOS(): PrintGrainDOS | undefined {
        const index = this.index.get(PrintGrainDOS.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintGrainDOS;
        }
        return undefined;
    }

    getPrintCellDOS(): PrintCellDOS | undefined {
        const index = this.index.get(PrintCellDOS.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintCellDOS;
        }
        return undefined;
    }

    getPrintReactionOperatorColumnSums(): PrintReactionOperatorColumnSums | undefined {
        const index = this.index.get(PrintReactionOperatorColumnSums.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintReactionOperatorColumnSums;
        }
        return undefined;
    }

    getPrintTunnellingCoefficients(): PrintTunnellingCoefficients | undefined {
        const index = this.index.get(PrintTunnellingCoefficients.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintTunnellingCoefficients;
        }
        return undefined;
    }

    getPrintGrainkfE(): PrintGrainkfE | undefined {
        const index = this.index.get(PrintGrainkfE.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintGrainkfE;
        }
        return undefined;
    }

    getPrintGrainBoltzmann(): PrintGrainBoltzmann | undefined {
        const index = this.index.get(PrintGrainBoltzmann.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintGrainBoltzmann;
        }
        return undefined;
    }

    getPrintGrainkbE(): PrintGrainkbE | undefined {
        const index = this.index.get(PrintGrainkbE.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as PrintGrainkbE;
        }
        return undefined;
    }

    getEigenvalues(): Eigenvalues | undefined {
        const index = this.index.get(Eigenvalues.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as Eigenvalues;
        }
        return undefined;
    }

    getHideInactive(): HideInactive | undefined {
        const index = this.index.get(HideInactive.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as HideInactive;
        }
        return undefined;
    }

    getDiagramEnergyOffset(): DiagramEnergyOffset | undefined {
        const index = this.index.get(DiagramEnergyOffset.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index) as DiagramEnergyOffset;
        }
        return undefined;
    }

}