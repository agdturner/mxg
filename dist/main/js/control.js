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
    /**
     * @returns The testDOS or undefined.
     */
    getTestDOS() {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
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
     * @returns The PrintSpeciesProfile or undefined.
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
     * @returns The TestMicroRates or undefined.
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
    /**
     * @returns The TestRateConstant or undefined.
     */
    getTestRateConstant() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */
    setTestRateConstant(testRateConstant) {
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
     * @returns The PrintCellDOS or undefined.
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
     * @returns The PrintReactionOperatorColumnSums or undefined.
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
     * @returns The PrintTunnellingCoefficients or undefined.
     */
    getPrintTunnellingCoefficients() {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        return undefined;
    }
    /**
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     */
    setPrintTunnellingCoefficients(printTunnellingCoefficients) {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.set(i, printTunnellingCoefficients);
        }
        else {
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
     * @returns The PrintGrainBoltzmann or undefined.
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
     * @returns The PrintGrainkbE or undefined.
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
     * @returns The diagramEnergyOffset or undefined.
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
}
exports.Control = Control;
//# sourceMappingURL=control.js.map