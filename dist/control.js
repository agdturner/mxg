"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = exports.DiagramEnergyOffset = exports.HideInactive = exports.Eigenvalues = exports.PrintGrainkbE = exports.PrintGrainBoltzmann = exports.PrintGrainkfE = exports.PrintTunnellingCoefficients = exports.PrintReactionOperatorColumnSums = exports.PrintCellDOS = exports.PrintGrainDOS = exports.TestRateConstant = exports.TestMicroRates = exports.PrintSpeciesProfile = exports.TestDOS = void 0;
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
class DiagramEnergyOffset extends xml_1.NumberNode {
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
    constructor(attributes, testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset) {
        super(attributes, Control.tagName);
        this.index = new Map();
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
    getTestDOS() {
        const index = this.index.get(TestDOS.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintSpeciesProfile() {
        const index = this.index.get(PrintSpeciesProfile.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getTestMicroRates() {
        const index = this.index.get(TestMicroRates.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getTestRateConstant() {
        const index = this.index.get(TestRateConstant.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintGrainDOS() {
        const index = this.index.get(PrintGrainDOS.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintCellDOS() {
        const index = this.index.get(PrintCellDOS.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintReactionOperatorColumnSums() {
        const index = this.index.get(PrintReactionOperatorColumnSums.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintTunnellingCoefficients() {
        const index = this.index.get(PrintTunnellingCoefficients.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintGrainkfE() {
        const index = this.index.get(PrintGrainkfE.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintGrainBoltzmann() {
        const index = this.index.get(PrintGrainBoltzmann.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getPrintGrainkbE() {
        const index = this.index.get(PrintGrainkbE.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getEigenvalues() {
        const index = this.index.get(Eigenvalues.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getHideInactive() {
        const index = this.index.get(HideInactive.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
    getDiagramEnergyOffset() {
        const index = this.index.get(DiagramEnergyOffset.tagName) ?? -1;
        if (index !== -1) {
            return this.nodes.get(index);
        }
        return undefined;
    }
}
exports.Control = Control;
//# sourceMappingURL=control.js.map