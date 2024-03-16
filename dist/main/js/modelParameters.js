"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelParameters = exports.EnergyAboveTheTopHill = exports.GrainSize = void 0;
const xml_js_1 = require("./xml.js");
/**
 * A class for measures of grain size.
 */
class GrainSize extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:grainSize";
    /**
     * @param {string} value The value.
     */
    constructor(attributes, value) {
        super(attributes, GrainSize.tagName, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}
exports.GrainSize = GrainSize;
/**
 * A class for measures of grain size.
 */
class EnergyAboveTheTopHill extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:energyAboveTheTopHill";
    /**
     * @param {string} value The value.
     */
    constructor(attributes, value) {
        super(attributes, EnergyAboveTheTopHill.tagName, value);
    }
}
exports.EnergyAboveTheTopHill = EnergyAboveTheTopHill;
/**
 * A class for model parameters.
 */
class ModelParameters extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:modelParameters";
    /**
     * The index.
     */
    index;
    constructor(attributes, grainSize, energyAboveTheTopHill) {
        super(attributes, ModelParameters.tagName);
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }
    /**
     * @returns The grain size or undefined.
     */
    getGrainSize() {
        let i = this.index.get(GrainSize.tagName);
        if (i) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param grainSize The grain size.
     */
    setGrainSize(grainSize) {
        let i = this.index.get(GrainSize.tagName);
        if (i) {
            this.nodes.set(i, grainSize);
        }
        else {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
    }
    /**
     * @returns The energy above the top hill or undefined.
     */
    getEnergyAboveTheTopHill() {
        let i = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param energyAboveTheTopHill The energy above the top hill.
     */
    setEnergyAboveTheTopHill(energyAboveTheTopHill) {
        let i = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i) {
            this.nodes.set(i, energyAboveTheTopHill);
        }
        else {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }
}
exports.ModelParameters = ModelParameters;
//# sourceMappingURL=modelParameters.js.map