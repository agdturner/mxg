import {
    mapToString
} from './util.js';

import {
    Molecule, MoleculeRef
} from './molecule.js';

import {
    TagWithAttributes, NodeWithNodes, NumberNode, getTag
} from './xml.js';



/**
 * A class for representing a reactant.
 * This is a molecule often with a role in a reaction.
 */
export class Reactant extends MoleculeRef {

    /**
     * The tag name.
     */
    static readonly tagName: string = "reactant";

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes: Map<string, string>, molecule: TagWithAttributes,
        molecules: Map<string, Molecule>) {
        super(attributes, Reactant.tagName, molecule, molecules);
    }
}

/**
 * A class for representing a product.
 * This is a molecule produced in a reaction.
 */
export class Product extends MoleculeRef {

    /**
     * The tag name.
     */
    static readonly tagName: string = "product";

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes: Map<string, string>, molecule: TagWithAttributes,
        molecules: Map<string, Molecule>) {
        super(attributes, Product.tagName, molecule, molecules);
    }

}

/**
 * A class for representing a transition state.
 */
export class TransitionState extends MoleculeRef {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:transitionState";

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes: Map<string, string>, molecule: TagWithAttributes,
        molecules: Map<string, Molecule>) {
        super(attributes, Product.tagName, molecule, molecules);
    }
}


/**
 * A class for representing the Arrhenius pre-exponential factor.
 */
export class PreExponential extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:preExponential";

    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, PreExponential.tagName, value);
    }
}

/**
 * A class for representing the Arrhenius activation energy factor.
 */
export class ActivationEnergy extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:activationEnergy";

    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ActivationEnergy.tagName, value);
    }
}

/**
 * A class for representing the reference temperature.
 */
export class TInfinity extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:TInfinity";

    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, TInfinity.tagName, value);
    }
}

/**
 * A class for representing the modified Arrhenius parameter factor.
 */
export class NInfinity extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:nInfinity";

    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, NInfinity.tagName, value);
    }
}

/**
 * A class for representing tunneling.
 */
export class Tunneling extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:tunneling";

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Tunneling.tagName);
    }
}

/**
 * A class for representing the MCRCMethod specifications.
 * Extended classes indicate how microcanonical rate constant is to be treated.
 */
export class MCRCMethod extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:MCRCMethod";

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, MCRCMethod.tagName);
    }
}

/**
 * A class for representing the inverse Laplace transform (ILT) type of microcanonical rate constant.
 */
export class MesmerILT extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:MesmerILT";

    /**
     * The index for the nodes. 
     */
    index: Map<string, number>;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */
    constructor(attributes: Map<string, string>, preExponential: PreExponential | undefined,
        activationEnergy: ActivationEnergy | undefined, tInfinity: TInfinity | undefined,
        nInfinity: NInfinity | undefined) {
        super(attributes, "me:MesmerILT");
        this.index = new Map<string, number>();
        if (preExponential != undefined) {
            this.index.set(preExponential.tagName, this.index.size);
            this.addNode(preExponential);
        }
        if (activationEnergy != undefined) {
            this.index.set(activationEnergy.tagName, this.index.size);
            this.addNode(activationEnergy);
        }
        if (tInfinity != undefined) {
            this.index.set(tInfinity.tagName, this.index.size);
            this.addNode(tInfinity);
        }
        if (nInfinity != undefined) {
            this.index.set(nInfinity.tagName, this.index.size);
            this.addNode(nInfinity);
        }
    }

    getPreExponential(): PreExponential | undefined {
        let i: number | undefined = this.index.get(PreExponential.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as PreExponential;
    }

    getActivationEnergy(): ActivationEnergy | undefined {
        let i: number | undefined = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as ActivationEnergy;
    }

    getTInfinity(): TInfinity | undefined {
        let i: number | undefined = this.index.get(TInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as TInfinity;
    }

    getNInfinity(): NInfinity | undefined {
        let i: number | undefined = this.index.get(NInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as NInfinity;
    }
}

/**
 * A class for representing the Zhu-Nakamura crossing MCRCMethod.
 */
export class ZhuNakamuraCrossing extends MCRCMethod {
    harmonicReactantDiabat_FC: number;
    harmonicReactantDiabat_XO: number;
    harmonicProductDiabat_DE: number;
    exponentialProductDiabat_A: number;
    exponentialProductDiabat_B: number;
    exponentialProductDiabat_DE: number;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} harmonicReactantDiabat_FC The harmonic reactant diabatic FC.
     * @param {number} harmonicReactantDiabat_XO The harmonic reactant diabatic XO.
     * @param {number} harmonicProductDiabat_DE The harmonic product diabatic DE.
     * @param {number} exponentialProductDiabat_A The exponential product diabatic A.
     * @param {number} exponentialProductDiabat_B The exponential product diabatic B.
     * @param {number} exponentialProductDiabat_DE The exponential product diabatic DE.
     */
    constructor(attributes: Map<string, string>,
        harmonicReactantDiabat_FC: number,
        harmonicReactantDiabat_XO: number,
        harmonicProductDiabat_DE: number,
        exponentialProductDiabat_A: number,
        exponentialProductDiabat_B: number,
        exponentialProductDiabat_DE: number) {
        super(attributes);
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
    toString() {
        return `ZhuNakamuraCrossing(${super.toString()}, ` +
            `harmonicReactantDiabat_FC(${this.harmonicReactantDiabat_FC.toString()}), ` +
            `harmonicReactantDiabat_XO(${this.harmonicReactantDiabat_XO.toString()}), ` +
            `harmonicProductDiabat_DE(${this.harmonicProductDiabat_DE.toString()}), ` +
            `exponentialProductDiabat_A(${this.exponentialProductDiabat_A.toString()}), ` +
            `exponentialProductDiabat_B(${this.exponentialProductDiabat_B.toString()}), ` +
            `exponentialProductDiabat_DE(${this.exponentialProductDiabat_DE.toString()}))`;
    }
}

/**
 * A class for representing the sum of states.
 * @param {string} units The units of energy.
 * @param {boolean} angularMomentum The angular momentum attribute.
 * @param {boolean} noLogSpline The no log spline attribute.
 * @param {SumOfStatesPoint[]} sumOfStatesPoints The sum of states points.
 */
/*
export class SumOfStates extends NumberWithAttributes {
    units: string;
    angularMomentum: boolean;
    noLogSpline: boolean;
    sumOfStatesPoints: SumOfStatesPoint[];
    constructor(units: string, angularMomentum: boolean, noLogSpline: boolean, sumOfStatesPoints: SumOfStatesPoint[]) {
        this.units = units;
        this.angularMomentum = angularMomentum;
        this.noLogSpline = noLogSpline;
        this.sumOfStatesPoints = sumOfStatesPoints;
    }
    toString() {
        return `SumOfStates(` +
            `units(${this.units}), ` +
            `angularMomentum(${this.angularMomentum.toString()}), ` +
            `noLogSpline(${this.noLogSpline.toString()}), ` +
            `sumOfStatesPoints(${arrayToString(this.sumOfStatesPoints, " ")}))`;
    }
}
*/

/**
 * A class for representing a sum of states point.
 * @param {number} value The value of the point.
 * @param {number} energy The energy of the point.
 * @param {number} angMomMag The angular momentum magnitude of the point.
 */
/*
export class SumOfStatesPoint {
    value: number;
    energy: number;
    angMomMag: number;
    constructor(value: number, energy: number, angMomMag: number) {
        this.value = value;
        this.energy = energy;
        this.angMomMag = angMomMag;
    }
    toString() {
        return `SumOfStatesPoint(` +
            `value(${this.value}), ` +
            `energy(${this.energy.toString()}), ` +
            `angMomMag(${this.angMomMag.toString()}))`;
    }
}
*/

/**
 * A class for representing the DefinedSumOfStates MCRCMethod.
 * @param {string} name The name or xsi:type of the method.
 * @param {SumOfStates} sumOfStates The sum of states.
 */
/*
export class DefinedSumOfStates extends MCRCMethod {
    sumOfStates: SumOfStates;

    constructor(name: string, sumOfStates: SumOfStates) {
        super(name);
        this.sumOfStates = sumOfStates;
    }
    toString() {
        return `DefinedSumOfStates(${super.toString()}, ` +
            `sumOfStates(${this.sumOfStates.toString()}))`;
    }
}
*/

/**
 * A class for representing a reaction.
 */
export class Reaction extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "reaction";

    /**
     * The index for the nodes. 
     */
    index : Map<string, number>;
    
    /**
     * The id of the reaction. This is also stored in the attributes, but is hee for convenience...
     */
    id: string;

    /**
     * The reactants in the reaction.
     */
    reactants: Map<string, Reactant>;

    /**
     * The products of the reaction.
     */
    products: Map<string, Product>;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant>} reactants The reactants in the reaction.
     * @param {Map<string, Product>} products The products of the reaction.
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {TransitionState | undefined} transitionState The transition state (optional).
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     */
    constructor(attributes: Map<string, string>, id: string,
        reactants: Map<string, Reactant>, products: Map<string, Product>,
        mCRCMethod?: MCRCMethod | undefined,
        transitionState?: TransitionState | undefined,
        tunneling?: Tunneling | undefined) {
        super(attributes, Reaction.tagName);
        this.index = new Map<string, number>();
        this.id = id;
        this.reactants = reactants;
        this.products = products;
        if (mCRCMethod != undefined) {
            this.addNode(mCRCMethod);
            this.index.set(mCRCMethod.tagName, this.index.size);
        }
        if (transitionState) {
            this.addNode(transitionState);
            this.index.set(transitionState.tagName, this.index.size);
        }
        if (tunneling) {
            this.addNode(tunneling);
            this.index.set(tunneling.tagName, this.index.size);
        }
    }

    getTransitionState(): TransitionState | undefined {
        let i: number | undefined = this.index.get(TransitionState.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as TransitionState;
    }

    getMCRCMethod(): MCRCMethod | undefined {
        let i: number | undefined = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as MCRCMethod;
    }

    getTunneling(): Tunneling | undefined {
        let i: number | undefined = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Tunneling;
    }

    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */
    getReactantsLabel(): string {
        return Array.from(this.reactants.values()).map(reactant => reactant.getRef()).join(' + ');
    }

    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */
    getReactantsEnergy(): number {
        return Array.from(this.reactants.values()).map(reactant => reactant.getMolecule().getEnergy()).reduce((a, b) => a + b, 0);
    }

    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel(): string {
        return Array.from(this.products.values()).map(product => product.getRef()).join(' + ');
    }

    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy(): number {
        return Array.from(this.products.values()).map(product => product.getMolecule().getEnergy()).reduce((a, b) => a + b, 0);
    }

    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */
    getLabel(): string {
        let label: string = this.getReactantsLabel() + ' -> ' + this.getProductsLabel();
        return label;
    }
}