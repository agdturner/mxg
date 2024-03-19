"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelParameters = exports.MaxTemperature = exports.EnergyAboveTheTopHill = exports.AutomaticallySetMaxEne = exports.GrainSize = void 0;
const xml_js_1 = require("./xml.js");
/**
 * A class for "me:grainSize".
 */
class GrainSize extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:grainSize";
    /**
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, GrainSize.tagName, value);
    }
}
exports.GrainSize = GrainSize;
/**
 * A class for "me:automaticallySetMaxEne".
 */
class AutomaticallySetMaxEne extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:automaticallySetMaxEne";
    /**
     * @para attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, AutomaticallySetMaxEne.tagName, value);
    }
}
exports.AutomaticallySetMaxEne = AutomaticallySetMaxEne;
/**
 * A class for "me:energyAboveTheTopHill".
 */
class EnergyAboveTheTopHill extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:energyAboveTheTopHill";
    /**
     * @para attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, EnergyAboveTheTopHill.tagName, value);
    }
}
exports.EnergyAboveTheTopHill = EnergyAboveTheTopHill;
/**
 * A class for "me:maxTemperature".
 */
class MaxTemperature extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:maxTemperature";
    /**
     * @para attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, MaxTemperature.tagName, value);
    }
}
exports.MaxTemperature = MaxTemperature;
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
    constructor(attributes, grainSize, automaticallySetMaxEne, energyAboveTheTopHill, maxTemperature) {
        super(attributes, ModelParameters.tagName);
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (automaticallySetMaxEne != undefined) {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
        if (maxTemperature != undefined) {
            this.index.set(MaxTemperature.tagName, this.nodes.size);
            this.addNode(maxTemperature);
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
     * @returns The automatically set max energy or undefined.
     */
    getAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param automaticallySetMaxEne The automatically set max energy.
     */
    setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i) {
            this.nodes.set(i, automaticallySetMaxEne);
        }
        else {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
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
    /**
     * @returns The max temperature or undefined.
     */
    getMaxTemperature() {
        let i = this.index.get(MaxTemperature.tagName);
        if (i) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param maxTemperature The max temperature.
     */
    setMaxTemperature(maxTemperature) {
        let i = this.index.get(MaxTemperature.tagName);
        if (i) {
            this.nodes.set(i, maxTemperature);
        }
        else {
            this.index.set(MaxTemperature.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
}
exports.ModelParameters = ModelParameters;
//# sourceMappingURL=modelParameters.js.map