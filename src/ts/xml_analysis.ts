
import { Description } from './xml_mesmer.js';
import { NodeWithNodes, NumberNode } from './xml.js';

/**
 * In the XML, the "me:eigenvalue" element is a child of the "me:eigenvalueList" element.
 */
export class Eigenvalue extends NumberNode {

    /**
     * Tag name.
     */
    public static tagName = 'me:eigenvalue';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, Eigenvalue.tagName, value);
    }
}

/**
 * In the XML, the "me:eigenvalueList" element is a child of the "analysis" element.
 * Attributes include:
 * number
 * selection
 * Child nodes include:
 * me:eigenvalue
 */
export class EigenvalueList extends NodeWithNodes {

    /**
     * Tag name.
     */
    public static tagName = 'me:eigenvalueList'

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, eigenvalues?: Eigenvalue[]) {
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
    public addEigenvalue(e: Eigenvalue): void {
        this.addNode(e);
    }

}

/**
 * In the XML, the "me:pop" element is a child of the "population" element.
 * Attributes include:
 * ref (A reference to the species (molecule).)
 */
export class Pop extends NumberNode {

    /**
     * Tag name.
     */
    public static tagName = 'me:pop';

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, Pop.tagName, value);
    }
}

/**
 * In the XML, the "me:population" element is a child of the "populationList" element.
 * Attributes include:
 * time
 * logTime
 * Child elements include:
 * me:pop
 */
export class Population extends NodeWithNodes {

    /**
     * Tag name.
     */
    public static tagName = 'me:population';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, pops?: Pop[]) {
        super(attributes, Population.tagName);
    }

    /**
     * Add a pop.
     */
    public addPop(p: Pop): void {
        this.addNode(p);
    }
}

/**
 * In the XML, the "me:populationList" element is a child of the "analysis" element.
 * Attributes include:
 * T (Temperature)
 * conc (Concentration)
 * Child elements include:
 * me:population
 */
export class PopulationList extends NodeWithNodes {

    /**
     * Tag name.
     */
    public static tagName = 'me:populationList';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, populations?: Population[]) {
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
    public addPopulation(p: Population): void {
        this.addNode(p);
    }

}

/**
 * In the XML, the "me:firstOrderLoss" element is a child of the "me:rateList" element.
 * Attributes include:
 * ref
 */
export class FirstOrderLoss extends NumberNode {

    /**
     * Tag name.
     */
    public static tagName = 'me:firstOrderLoss';

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, FirstOrderLoss.tagName, value);
    }
}

/**
 * In the XML, the "me:firstOrderRate" element is a child of the "me:rateList" element.
 * Attributes include:
 * fromRef, toRef, reactionType
 */
export class FirstOrderRate extends NumberNode {

    /**
     * Tag name.
     */
    public static tagName = 'me:firstOrderRate';

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, FirstOrderRate.tagName, value);
    }
}

/**
 * In the XML, the "me:secondOrderRate" element is a child of the "me:rateList" element.
 * Attributes include:
 * fromRef, toRef, reactionType
 */
export class SecondOrderRate extends NumberNode {

    /**
     * Tag name.
     */
    public static tagName = 'me:secondOrderRate';

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, SecondOrderRate.tagName, value);
    }
}

/**
 * In the XML, the "me:rateList" element is a child of the "analysis" element.
 * Attributes include:
 * T, conc, bathGas, units
 * Child elements include:
 * me:firstOrderLoss
 * me:firstOrderRate
 */
export class RateList extends NodeWithNodes {

    /**
     * Tag name.
     */
    public static tagName = 'me:rateList';

    /**
     * The index.
     */
    index: Map<string, number>;
    
    /**
     * The first order loss index.
     */
    folIndex: Map<number, number>;

    /**
     * The first order losses.
     */
    fols: FirstOrderLoss[];

    /**
     * The first order rate index.
     */
    forIndex: Map<number, number>;

    /**
     * The first order rates.
     */
    fors: FirstOrderRate[];

    /**
     * The second order rate index.
     */
    sorIndex: Map<number, number>;

    /**
     * The second order rates.
     */
    sors: SecondOrderRate[];

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, firstOrderLosses?: FirstOrderLoss[], firstOrderRates?: FirstOrderRate[],
        secondOrderRates?: SecondOrderRate[]) {
        super(attributes, RateList.tagName);
        this.index = new Map();
        this.folIndex = new Map();
        if (firstOrderLosses) {
            let i: number = 0;
            firstOrderLosses.forEach((fol) => {
                this.index.set(FirstOrderLoss.tagName + i.toString(), this.nodes.size);
                this.folIndex.set(this.folIndex.size, this.nodes.size);
                this.addNode(fol);
                i++;
            });
            this.fols = firstOrderLosses;
        } else {
            this.fols = [];
        }
        this.forIndex = new Map();
        if (firstOrderRates) {
            let i: number = 0;
            firstOrderRates.forEach((forr) => {
                this.index.set(FirstOrderRate.tagName + i.toString(), this.nodes.size);
                this.forIndex.set(this.forIndex.size, this.nodes.size);
                this.addNode(forr);
                i++;
            });
            this.fors = firstOrderRates;
        } else {
            this.fors = [];
        }
        this.sorIndex = new Map();
        if (secondOrderRates) {
            let i: number = 0;
            secondOrderRates.forEach((sor) => {
                this.index.set(SecondOrderRate.tagName + i.toString(), this.nodes.size);
                this.sorIndex.set(this.sorIndex.size, this.nodes.size);
                this.addNode(sor);
                i++;
            });
            this.sors = secondOrderRates;
        } else {
            this.sors = [];
        }
    }

    /**
     * Set temperature.
     * @param T The temperature.
     */
    public setTemperature(T: Big): void {
        this.attributes.set('T', T.toString());
    }

    /**
     * Set concentration.
     * @param conc The concentration.
     */
    public setConcentration(conc: Big): void {
        this.attributes.set('conc', conc.toString());
    }

    /**
     * Set bath gas.
     * @param bathGas The bath gas.
     */
    public setBathGas(bathGas: string): void {
        this.attributes.set('bathGas', bathGas);
    }

    /**
     * Set units.
     * @param units The units.
     */
    public setUnits(units: string): void {
        this.attributes.set('units', units);
    }

    /**
     * Add a first order loss.
     */
    public addFirstOrderLoss(f: FirstOrderLoss): void {
        this.folIndex.set(this.folIndex.size, this.nodes.size);
        this.index.set(FirstOrderLoss.tagName + this.folIndex.size.toString(), this.nodes.size);
        this.fols.push(f);
        this.addNode(f);
    }

    /**
     * Add a first order rate.
     */
    public addFirstOrderRate(f: FirstOrderRate): void {
        this.forIndex.set(this.forIndex.size, this.nodes.size);
        this.index.set(FirstOrderRate.tagName + this.forIndex.size.toString(), this.nodes.size);
        this.fors.push(f);
        this.addNode(f);
    }

    /**
     * Add a second order rate.
     */
    public addSecondOrderRate(s: SecondOrderRate): void {
        this.sorIndex.set(this.sorIndex.size, this.nodes.size);
        this.index.set(SecondOrderRate.tagName + this.sorIndex.size.toString(), this.nodes.size);
        this.sors.push(s);
        this.addNode(s);
    }
}

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
export class Analysis extends NodeWithNodes {

    /**
     * Tag name.
     */
    public static tagName = 'me:analysis';

    /**
     * The index.
     */
    index: Map<string, number | Map<number, number>>;

    /**
     * The EigenvalueList index.
     */
    elIndex: Map<number, number>;

    /**
     * The EigenvalueList.
     */
    els: EigenvalueList[]

    /**
     * The PopulationList index.
     */
    plIndex: Map<number, number>;

    /**
     * The PopulationList.
     */
    pls: PopulationList[];

    /**
     * The RateList index.
     */
    rlIndex: Map<number, number>;

    /**
     * The RateList.
     */
    rls: RateList[];

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, description?: Description, els?: EigenvalueList[], 
        pls?: PopulationList[], rls?: RateList[]) {
        super(attributes, RateList.tagName);
        this.index = new Map();
        if (description) {
            this.index.set(Description.tagName, this.nodes.size);
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
        } else {
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
        } else {
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
        } else {
            this.rls = [];
        }
    }

    /**
     * Get the description.
     */
    public getDescription(): Description | undefined {
        if (this.index.has(Description.tagName)) {
            let i: number = this.index.get(Description.tagName)! as number;
            return this.nodes.get(i) as Description;
        }
    }

    /**
     * @param description The description.
     */
    setDescription(description: Description) {
        if (this.index.has(Description.tagName)) {
            let i: number = this.index.get(Description.tagName)! as number;
            this.nodes.set(i, description);
        } else {
            this.index.set(Description.tagName, this.nodes.size);
            this.addNode(description);
        }
    }

    /**
     * @param eigenvalueList The eigenvalue list.
     */
    addEigenvalueList(eigenvalueList: EigenvalueList) {
        this.elIndex.set(this.elIndex.size, this.nodes.size);
        this.addNode(eigenvalueList);
        this.els.push(eigenvalueList);
    }

    /**
     * @param populationList The population list.
     */
    addPopulationList(populationList: PopulationList) {
        this.plIndex.set(this.plIndex.size, this.nodes.size);
        this.addNode(populationList);
        this.pls.push(populationList);
    }

    /**
     * @param rateList The rate list.
     */
    addRateList(rateList: RateList) {
        this.rlIndex.set(this.rlIndex.size, this.nodes.size);
        this.addNode(rateList);
        this.rls.push(rateList);
    }
}