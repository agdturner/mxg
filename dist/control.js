"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = exports.DiagramEnergyOffset = exports.HideInactive = exports.Eigenvalues = exports.PrintGrainkbE = exports.PrintGrainBoltzmann = exports.PrintGrainkfE = exports.PrintTunnellingCoefficients = exports.PrintReactionOperatorColumnSums = exports.PrintCellDOS = exports.PrintGrainDOS = exports.TestRateConstant = exports.TestMicroRates = exports.PrintSpeciesProfile = exports.TestDOS = void 0;
const classes_1 = require("./classes");
const html_1 = require("./html");
const xml_1 = require("./xml");
/**
 * A class for me:testDOS.
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
 * A class for me:printSpeciesProfile.
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
 * A class for me:testMicroRates.
 */
class TestMicroRates extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:testMicroRates";
    constructor() {
        super(TestMicroRates.tagName);
    }
}
exports.TestMicroRates = TestMicroRates;
/**
 * A class for me:testRateConstant.
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
 * A class for me:printGrainDOS.
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
 * A class for me:printCellDOS.
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
 * A class for me:printReactionOperatorColumnSums.
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
 * A class for me:printTunnellingCoefficients.
 */
class PrintTunnellingCoefficients extends xml_1.Tag {
    /**
     * The tag name.
     */
    static tagName = "me:printTunnellingCoefficients";
    constructor() {
        super(PrintTunnellingCoefficients.tagName);
    }
}
exports.PrintTunnellingCoefficients = PrintTunnellingCoefficients;
/**
 * A class for me:printGrainkfE.
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
 * A class for me:printGrainBoltzmann.
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
 * A class for me:printGrainkbE.
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
 * A class for me:eigenvalues.
 */
class Eigenvalues extends classes_1.NumberNode {
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
 * A class for me:hideInactive.
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
 * A class for me:diagramEnergyOffset.
 */
class DiagramEnergyOffset extends classes_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:diagramEnergyOffset";
    constructor(attributes, value) {
        super(attributes, DiagramEnergyOffset.tagName, value);
    }
}
exports.DiagramEnergyOffset = DiagramEnergyOffset;
/**
 * A class for the control.
 */
class Control {
    /**
     * The tag name.
     */
    static tagName = "control";
    testDOS;
    printSpeciesProfile;
    testMicroRates;
    testRateConstant;
    printGrainDOS;
    printCellDOS;
    printReactionOperatorColumnSums;
    printTunnellingCoefficients;
    printGrainkfE;
    printGrainBoltzmann;
    printGrainkbE;
    eigenvalues;
    hideInactive;
    diagramEnergyOffset;
    constructor(testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset) {
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
    toXML(pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s = "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:testDOS") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printSpeciesProfile") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:testMicroRates") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:testRateConstant") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printGrainDOS") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printCellDOS") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printReactionOperatorColumnSums") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printTunnellingCoefficients") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printGrainkfE") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printGrainBoltzmann") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:printGrainkbE") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:eigenvalues") + "\n";
        s += padding1 + (0, html_1.getSelfClosingTag)(null, "me:hideInactive");
        s += this.diagramEnergyOffset?.toXML(padding1);
        return (0, xml_1.getTag)(s, "control", undefined, padding, true);
    }
}
exports.Control = Control;
//# sourceMappingURL=control.js.map