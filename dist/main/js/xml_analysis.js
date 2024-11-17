"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analysis = exports.RateList = exports.SecondOrderRate = exports.FirstOrderRate = exports.FirstOrderLoss = exports.PopulationList = exports.Population = exports.Pop = exports.EigenvalueList = exports.Eigenvalue = void 0;
const xml_mesmer_js_1 = require("./xml_mesmer.js");
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
 * Attributes include:
 * number
 * selection
 * Child nodes include:
 * me:eigenvalue
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
        if (eigenvalues) {
            eigenvalues.forEach((eigenvalue) => {
                this.addNode(eigenvalue);
            });
        }
    }
    /**
     * Add an eigenvalue.
     */
    addEigenvalue(e) {
        this.addNode(e);
    }
}
exports.EigenvalueList = EigenvalueList;
/**
 * In the XML, the "me:pop" element is a child of the "population" element.
 * Attributes include:
 * ref (A reference to the species (molecule).)
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
 * time
 * logTime
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
    /**
     * Add a pop.
     */
    addPop(p) {
        this.addNode(p);
    }
}
exports.Population = Population;
/**
 * In the XML, the "me:populationList" element is a child of the "analysis" element.
 * Attributes include:
 * T (Temperature)
 * conc (Concentration)
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
        if (populations) {
            populations.forEach((population) => {
                this.addNode(population);
            });
        }
    }
    /**
     * Add a population.
     */
    addPopulation(p) {
        this.addNode(p);
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
 * In the XML, the "me:firstOrderRate" element is a child of the "me:rateList" element.
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
        super(attributes, FirstOrderRate.tagName, value);
    }
}
exports.FirstOrderRate = FirstOrderRate;
/**
 * In the XML, the "me:secondOrderRate" element is a child of the "me:rateList" element.
 * Attributes include:
 * fromRef, toRef, reactionType
 */
class SecondOrderRate extends xml_js_1.NumberNode {
    /**
     * Tag name.
     */
    static tagName = 'me:secondOrderRate';
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, SecondOrderRate.tagName, value);
    }
}
exports.SecondOrderRate = SecondOrderRate;
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
     * The index.
     */
    index;
    /**
     * The first order loss index.
     */
    folIndex;
    /**
     * The first order losses.
     */
    fols;
    /**
     * The first order rate index.
     */
    forIndex;
    /**
     * The first order rates.
     */
    fors;
    /**
     * The second order rate index.
     */
    sorIndex;
    /**
     * The second order rates.
     */
    sors;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, firstOrderLosses, firstOrderRates, secondOrderRates) {
        super(attributes, RateList.tagName);
        this.index = new Map();
        this.folIndex = new Map();
        if (firstOrderLosses) {
            let i = 0;
            firstOrderLosses.forEach((fol) => {
                this.index.set(FirstOrderLoss.tagName + i.toString(), this.nodes.size);
                this.folIndex.set(this.folIndex.size, this.nodes.size);
                this.addNode(fol);
                i++;
            });
            this.fols = firstOrderLosses;
        }
        else {
            this.fols = [];
        }
        this.forIndex = new Map();
        if (firstOrderRates) {
            let i = 0;
            firstOrderRates.forEach((forr) => {
                this.index.set(FirstOrderRate.tagName + i.toString(), this.nodes.size);
                this.forIndex.set(this.forIndex.size, this.nodes.size);
                this.addNode(forr);
                i++;
            });
            this.fors = firstOrderRates;
        }
        else {
            this.fors = [];
        }
        this.sorIndex = new Map();
        if (secondOrderRates) {
            let i = 0;
            secondOrderRates.forEach((sor) => {
                this.index.set(SecondOrderRate.tagName + i.toString(), this.nodes.size);
                this.sorIndex.set(this.sorIndex.size, this.nodes.size);
                this.addNode(sor);
                i++;
            });
            this.sors = secondOrderRates;
        }
        else {
            this.sors = [];
        }
    }
    /**
     * Set temperature.
     * @param T The temperature.
     */
    setTemperature(T) {
        this.attributes.set('T', T.toString());
    }
    /**
     * Set concentration.
     * @param conc The concentration.
     */
    setConcentration(conc) {
        this.attributes.set('conc', conc.toString());
    }
    /**
     * Set bath gas.
     * @param bathGas The bath gas.
     */
    setBathGas(bathGas) {
        this.attributes.set('bathGas', bathGas);
    }
    /**
     * Set units.
     * @param units The units.
     */
    setUnits(units) {
        this.attributes.set('units', units);
    }
    /**
     * Add a first order loss.
     */
    addFirstOrderLoss(f) {
        this.folIndex.set(this.folIndex.size, this.nodes.size);
        this.index.set(FirstOrderLoss.tagName + this.folIndex.size.toString(), this.nodes.size);
        this.fols.push(f);
        this.addNode(f);
    }
    /**
     * Add a first order rate.
     */
    addFirstOrderRate(f) {
        this.forIndex.set(this.forIndex.size, this.nodes.size);
        this.index.set(FirstOrderRate.tagName + this.forIndex.size.toString(), this.nodes.size);
        this.fors.push(f);
        this.addNode(f);
    }
    /**
     * Add a second order rate.
     */
    addSecondOrderRate(s) {
        this.sorIndex.set(this.sorIndex.size, this.nodes.size);
        this.index.set(SecondOrderRate.tagName + this.sorIndex.size.toString(), this.nodes.size);
        this.sors.push(s);
        this.addNode(s);
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
     * The EigenvalueList.
     */
    els;
    /**
     * The PopulationList index.
     */
    plIndex;
    /**
     * The PopulationList.
     */
    pls;
    /**
     * The RateList index.
     */
    rlIndex;
    /**
     * The RateList.
     */
    rls;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, description, els, pls, rls) {
        super(attributes, RateList.tagName);
        this.index = new Map();
        if (description) {
            this.index.set(xml_mesmer_js_1.Description.tagName, this.nodes.size);
            this.addNode(description);
        }
        this.elIndex = new Map();
        if (els) {
            els.forEach((el) => {
                this.index.set(EigenvalueList.tagName, this.nodes.size);
                this.elIndex.set(this.elIndex.size, this.nodes.size);
                this.addNode(el);
            });
            this.els = els;
        }
        else {
            this.els = [];
        }
        this.plIndex = new Map();
        if (pls) {
            pls.forEach((pl) => {
                this.index.set(PopulationList.tagName, this.nodes.size);
                this.plIndex.set(this.plIndex.size, this.nodes.size);
                this.addNode(pl);
            });
            this.pls = pls;
        }
        else {
            this.pls = [];
        }
        this.rlIndex = new Map();
        if (rls) {
            rls.forEach((rl) => {
                this.index.set(RateList.tagName, this.nodes.size);
                this.rlIndex.set(this.rlIndex.size, this.nodes.size);
                this.addNode(rl);
            });
            this.rls = rls;
        }
        else {
            this.rls = [];
        }
    }
    /**
     * Get the description.
     */
    getDescription() {
        if (this.index.has(xml_mesmer_js_1.Description.tagName)) {
            let i = this.index.get(xml_mesmer_js_1.Description.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param description The description.
     */
    setDescription(description) {
        if (this.index.has(xml_mesmer_js_1.Description.tagName)) {
            let i = this.index.get(xml_mesmer_js_1.Description.tagName);
            this.nodes.set(i, description);
        }
        else {
            this.index.set(xml_mesmer_js_1.Description.tagName, this.nodes.size);
            this.addNode(description);
        }
    }
    /**
     * @param eigenvalueList The eigenvalue list.
     */
    addEigenvalueList(eigenvalueList) {
        this.elIndex.set(this.elIndex.size, this.nodes.size);
        this.addNode(eigenvalueList);
        this.els.push(eigenvalueList);
    }
    /**
     * @param populationList The population list.
     */
    addPopulationList(populationList) {
        this.plIndex.set(this.plIndex.size, this.nodes.size);
        this.addNode(populationList);
        this.pls.push(populationList);
    }
    /**
     * @param rateList The rate list.
     */
    addRateList(rateList) {
        this.rlIndex.set(this.rlIndex.size, this.nodes.size);
        this.addNode(rateList);
        this.rls.push(rateList);
    }
}
exports.Analysis = Analysis;
//# sourceMappingURL=xml_analysis.js.map