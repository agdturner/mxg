import { 
    NumberNode
 } from "./classes";

import {
    getSelfClosingTag
} from "./html";

import {
    Tag, getTag
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
export class Control {

    /**
     * The tag name.
     */
    static readonly tagName: string = "control";

    testDOS: TestDOS | undefined;
    printSpeciesProfile: PrintSpeciesProfile | undefined;
    testMicroRates: TestMicroRates | undefined;
    testRateConstant: TestRateConstant | undefined;
    printGrainDOS: PrintGrainDOS | undefined;
    printCellDOS: PrintCellDOS | undefined;
    printReactionOperatorColumnSums: PrintReactionOperatorColumnSums | undefined;
    printTunnellingCoefficients: PrintTunnellingCoefficients | undefined;
    printGrainkfE: PrintGrainkfE | undefined;
    printGrainBoltzmann: PrintGrainBoltzmann | undefined;
    printGrainkbE: PrintGrainkbE | undefined;
    eigenvalues: Eigenvalues | undefined;
    hideInactive: HideInactive | undefined;
    diagramEnergyOffset: DiagramEnergyOffset | undefined;
    constructor(testDOS?: TestDOS, printSpeciesProfile?: PrintSpeciesProfile, testMicroRates?: TestMicroRates,
        testRateConstant?: TestRateConstant, printGrainDOS?: PrintGrainDOS, printCellDOS?: PrintCellDOS, 
        printReactionOperatorColumnSums?: PrintReactionOperatorColumnSums, 
        printTunnellingCoefficients?: PrintTunnellingCoefficients,
        printGrainkfE?: PrintGrainkfE, printGrainBoltzmann?: PrintGrainBoltzmann,
        printGrainkbE?: PrintGrainkbE, eigenvalues?: Eigenvalues, hideInactive?: HideInactive,
        diagramEnergyOffset?: DiagramEnergyOffset) {
        this.testDOS = testDOS;
        this.printSpeciesProfile = printSpeciesProfile;
        this.testMicroRates = testMicroRates;
        this.testRateConstant = testRateConstant;
        this.printGrainDOS = printGrainDOS;
        this.printCellDOS = printCellDOS;
        this.printReactionOperatorColumnSums = printReactionOperatorColumnSums;
        this.printTunnellingCoefficients = printTunnellingCoefficients;
        this.printGrainkfE = printGrainkfE;
        this.printGrainBoltzmann = printGrainBoltzmann;
        this.printGrainkbE = printGrainkbE;
        this.eigenvalues = eigenvalues;
        this.hideInactive = hideInactive;
        this.diagramEnergyOffset = diagramEnergyOffset;
    }
    toString() {
        return `Control(` +
            `testDOS(${this.testDOS?.toString()}), ` +
            `printSpeciesProfile(${this.printSpeciesProfile?.toString()}), ` +
            `testMicroRates(${this.testMicroRates?.toString()}), ` +
            `testRateConstant(${this.testRateConstant?.toString()}), ` +
            `printGrainDOS(${this.printGrainDOS?.toString()}), ` +
            `printCellDOS(${this.printCellDOS?.toString()}), ` +
            `printReactionOperatorColumnSums(${this.printReactionOperatorColumnSums?.toString()}), ` +
            `printTunnellingCoefficients(${this.printTunnellingCoefficients?.toString()}), ` +
            `printGrainkfE(${this.printGrainkfE?.toString()}), ` +
            `printGrainBoltzmann(${this.printGrainBoltzmann?.toString()}), ` +
            `printGrainkbE(${this.printGrainkbE?.toString()}), ` +
            `eigenvalues(${this.eigenvalues?.toString()}), ` +
            `hideInactive(${this.hideInactive?.toString()}))`;
    }

    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad: string, padding?: string): string {
        let padding1: string = "";
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s: string = "\n";
        s += padding1 + getSelfClosingTag(null, "me:testDOS") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printSpeciesProfile") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:testMicroRates") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:testRateConstant") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainDOS") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printCellDOS") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printReactionOperatorColumnSums") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printTunnellingCoefficients") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainkfE") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainBoltzmann") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainkbE") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:eigenvalues") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:hideInactive");
        s += this.diagramEnergyOffset?.toXML(padding1);
        return getTag(s, "control", undefined, padding, true);
    }
}