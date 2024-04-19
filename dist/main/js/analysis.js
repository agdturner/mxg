"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analysis = exports.RateList = exports.FirstOrderRate = exports.FirstOrderLoss = exports.PopulationList = exports.Population = exports.Pop = exports.EigenvalueList = exports.Eigenvalue = void 0;
const mesmer_js_1 = require("./mesmer.js");
const xml_js_1 = require("./xml.js");
/**
 * In the XML, the "me:eigenvalue" element is a child of the "me:eigenvalueList" element.
 */
class Eigenvalue extends xml_js_1.NumberNode {
    /**
     * Tag name.
     */
    static tagName = 'me:eigenvalue';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, value) {
        super(attributes, Eigenvalue.tagName, value);
    }
}
exports.Eigenvalue = Eigenvalue;
/**
 * In the XML, the "me:eigenvalueList" element is a child of the "analysis" element.
 * , and the rateList tag is a child of the analysis tag.
 */
class EigenvalueList extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'me:eigenvalueList';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, eigenvalues) {
        super(attributes, EigenvalueList.tagName);
    }
}
exports.EigenvalueList = EigenvalueList;
/**
 * In the XML, the "me:pop" element is a child of the "population" element.
 * Attributes include:
 * ref
 */
class Pop extends xml_js_1.NumberNode {
    /**
     * Tag name.
     */
    static tagName = 'me:pop';
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Pop.tagName, value);
    }
}
exports.Pop = Pop;
/**
 * In the XML, the "me:population" element is a child of the "populationList" element.
 * Attributes include:
 * time, logTime
 * Child elements include:
 * me:pop
 */
class Population extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'me:population';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, pops) {
        super(attributes, Population.tagName);
    }
}
exports.Population = Population;
/**
 * In the XML, the "me:populationList" element is a child of the "analysis" element.
 * Attributes include:
 * Child elements include:
 * me:population
 */
class PopulationList extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'me:populationList';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, populations) {
        super(attributes, PopulationList.tagName);
    }
}
exports.PopulationList = PopulationList;
/**
 * In the XML, the "me:firstOrderLoss" element is a child of the "me:rateList" element.
 * Attributes include:
 * ref
 */
class FirstOrderLoss extends xml_js_1.NumberNode {
    /**
     * Tag name.
     */
    static tagName = 'me:firstOrderLoss';
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, FirstOrderLoss.tagName, value);
    }
}
exports.FirstOrderLoss = FirstOrderLoss;
/**
 * In the XML, the "me:firstOrderLoss" element is a child of the "me:rateList" element.
 * Attributes include:
 * fromRef, toRef, reactionType
 */
class FirstOrderRate extends xml_js_1.NumberNode {
    /**
     * Tag name.
     */
    static tagName = 'me:firstOrderRate';
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, FirstOrderLoss.tagName, value);
    }
}
exports.FirstOrderRate = FirstOrderRate;
/**
 * In the XML, the "me:rateList" element is a child of the "analysis" element.
 * Attributes include:
 * T, conc, bathGas, units
 * Child elements include:
 * me:firstOrderLoss
 * me:firstOrderRate
 */
class RateList extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'me:rateList';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, firstOrderLosses, firstOrderRates) {
        super(attributes, Analysis.tagName);
    }
}
exports.RateList = RateList;
/**
 * In the XML, the "me:analysis" element is a child of the "me:mesmer" element.
 * Attributes include:
 * calculated
 * Child elements include:
 * me:description
 * And one or more sets of:
 *  me:eigenvalueList
 *  me:populationList
 *  me:rateList
 */
class Analysis extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'me:analysis';
    /**
     * The index.
     */
    index;
    /**
     * The EigenvalueList index.
     */
    elIndex;
    /**
     * The PopulationList index.
     */
    plIndex;
    /**
     * The RateList index.
     */
    rlIndex;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, description, els, pls, rls) {
        super(attributes, Analysis.tagName);
        this.index = new Map();
        if (description) {
            this.index.set(mesmer_js_1.Description.tagName, this.nodes.size);
            this.addNode(description);
        }
        this.elIndex = new Map();
        if (els) {
            els.forEach((el) => {
                this.index.set(EigenvalueList.tagName, this.nodes.size);
                this.elIndex.set(this.elIndex.size, this.nodes.size);
                this.addNode(el);
            });
        }
        this.plIndex = new Map();
        if (pls) {
            pls.forEach((pl) => {
                this.index.set(PopulationList.tagName, this.nodes.size);
                this.plIndex.set(this.plIndex.size, this.nodes.size);
                this.addNode(pl);
            });
        }
        this.rlIndex = new Map();
        if (rls) {
            rls.forEach((rl) => {
                this.index.set(RateList.tagName, this.nodes.size);
                this.rlIndex.set(this.rlIndex.size, this.nodes.size);
                this.addNode(rl);
            });
        }
    }
    /**
     * Get the description.
     */
    getDescription() {
        if (this.index.has(mesmer_js_1.Description.tagName)) {
            let i = this.index.get(mesmer_js_1.Description.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param description The description.
     */
    setDescription(description) {
        if (this.index.has(mesmer_js_1.Description.tagName)) {
            let i = this.index.get(mesmer_js_1.Description.tagName);
            this.nodes.set(i, description);
        }
        else {
            this.index.set(mesmer_js_1.Description.tagName, this.nodes.size);
            this.addNode(description);
        }
    }
    /**
     * Get the eigenvalue list.
     */
    getEigenvalueList() {
        if (this.index.has(EigenvalueList.tagName)) {
            let i = this.index.get(EigenvalueList.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param eigenvalueList The eigenvalue list.
     */
    setEigenvalueList(eigenvalueList) {
        if (this.index.has(EigenvalueList.tagName)) {
            let i = this.index.get(EigenvalueList.tagName);
            this.nodes.set(i, eigenvalueList);
        }
        else {
            this.index.set(EigenvalueList.tagName, this.nodes.size);
            this.addNode(eigenvalueList);
        }
    }
    /**
     * Get the population list.
     */
    getPopulationList() {
        if (this.index.has(PopulationList.tagName)) {
            let i = this.index.get(PopulationList.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param populationList The population list.
     */
    setPopulationList(populationList) {
        if (this.index.has(PopulationList.tagName)) {
            let i = this.index.get(PopulationList.tagName);
            this.nodes.set(i, populationList);
        }
        else {
            this.index.set(PopulationList.tagName, this.nodes.size);
            this.addNode(populationList);
        }
    }
    /**
     * Get the rate list.
     */
    getRateList() {
        if (this.index.has(RateList.tagName)) {
            let i = this.index.get(RateList.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param rateList The rate list.
     */
    setRateList(rateList) {
        if (this.index.has(RateList.tagName)) {
            let i = this.index.get(RateList.tagName);
            this.nodes.set(i, rateList);
        }
        else {
            this.index.set(RateList.tagName, this.nodes.size);
            this.addNode(rateList);
        }
    }
}
exports.Analysis = Analysis;
//# sourceMappingURL=analysis.js.map