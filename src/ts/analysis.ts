
import { Description } from './mesmer.js';
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
 * , and the rateList tag is a child of the analysis tag.
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
    }
}

/**
 * In the XML, the "me:pop" element is a child of the "population" element.
 * Attributes include:
 * ref
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
 * time, logTime
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
}

/**
 * In the XML, the "me:populationList" element is a child of the "analysis" element.
 * Attributes include:
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
 * In the XML, the "me:firstOrderLoss" element is a child of the "me:rateList" element.
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
        super(attributes, FirstOrderLoss.tagName, value);
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
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, firstOrderLosses?: FirstOrderLoss[], firstOrderRates?: FirstOrderRate[]) {
        super(attributes, Analysis.tagName);
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
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, description: Description, eigenvalueLists: EigenvalueList[], 
        populationLists: PopulationList[], rateLists: RateList[]) {
        super(attributes, Analysis.tagName);
    }
}