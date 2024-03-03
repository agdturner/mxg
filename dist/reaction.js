"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = exports.ZhuNakamuraCrossing = exports.MesmerILT = exports.MCRCMethod = exports.Tunneling = exports.NInfinity = exports.TInfinity = exports.ActivationEnergy = exports.PreExponential = exports.TransitionState = exports.Product = exports.Reactant = void 0;
const molecule_js_1 = require("./molecule.js");
const xml_js_1 = require("./xml.js");
/**
 * A class for representing a reactant - a molecule that reacts in a reaction.
 */
class Reactant extends molecule_js_1.MoleculeRef {
    /**
     * The tag name.
     */
    static tagName = "reactant";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes, molecule, molecules) {
        super(attributes, Reactant.tagName, molecule, molecules);
    }
}
exports.Reactant = Reactant;
/**
 * A class for representing a product - a molecule produced in a reaction.
 */
class Product extends molecule_js_1.MoleculeRef {
    /**
     * The tag name.
     */
    static tagName = "product";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes, molecule, molecules) {
        super(attributes, Product.tagName, molecule, molecules);
    }
}
exports.Product = Product;
/**
 * A class for representing a transition state - a molecule that is a transition state in a reaction.
 */
class TransitionState extends molecule_js_1.MoleculeRef {
    /**
     * The tag name.
     */
    static tagName = "me:transitionState";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes, molecule, molecules) {
        super(attributes, Product.tagName, molecule, molecules);
    }
}
exports.TransitionState = TransitionState;
/**
 * A class for representing the Arrhenius pre-exponential factor.
 */
class PreExponential extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:preExponential";
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, PreExponential.tagName, value);
    }
}
exports.PreExponential = PreExponential;
/**
 * A class for representing the Arrhenius activation energy factor.
 */
class ActivationEnergy extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:activationEnergy";
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, ActivationEnergy.tagName, value);
    }
}
exports.ActivationEnergy = ActivationEnergy;
/**
 * A class for representing the reference temperature.
 */
class TInfinity extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:TInfinity";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, TInfinity.tagName, value);
    }
}
exports.TInfinity = TInfinity;
/**
 * A class for representing the modified Arrhenius parameter factor.
 */
class NInfinity extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:nInfinity";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, NInfinity.tagName, value);
    }
}
exports.NInfinity = NInfinity;
/**
 * A class for representing tunneling.
 */
class Tunneling extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:tunneling";
    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, Tunneling.tagName);
    }
}
exports.Tunneling = Tunneling;
/**
 * A class for representing the MCRCMethod specifications.
 * Extended classes indicate how microcanonical rate constant is to be treated.
 */
class MCRCMethod extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:MCRCMethod";
    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, MCRCMethod.tagName);
    }
}
exports.MCRCMethod = MCRCMethod;
/**
 * A class for representing the inverse Laplace transform (ILT) type of microcanonical rate constant.
 */
class MesmerILT extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:MesmerILT";
    /**
     * The index for the nodes.
     */
    index;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */
    constructor(attributes, preExponential, activationEnergy, tInfinity, nInfinity) {
        super(attributes, "me:MesmerILT");
        this.index = new Map();
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
    getPreExponential() {
        let i = this.index.get(PreExponential.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    getActivationEnergy() {
        let i = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    getTInfinity() {
        let i = this.index.get(TInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    getNInfinity() {
        let i = this.index.get(NInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
}
exports.MesmerILT = MesmerILT;
/**
 * A class for representing the Zhu-Nakamura crossing MCRCMethod.
 */
class ZhuNakamuraCrossing extends MCRCMethod {
    harmonicReactantDiabat_FC;
    harmonicReactantDiabat_XO;
    harmonicProductDiabat_DE;
    exponentialProductDiabat_A;
    exponentialProductDiabat_B;
    exponentialProductDiabat_DE;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} harmonicReactantDiabat_FC The harmonic reactant diabatic FC.
     * @param {number} harmonicReactantDiabat_XO The harmonic reactant diabatic XO.
     * @param {number} harmonicProductDiabat_DE The harmonic product diabatic DE.
     * @param {number} exponentialProductDiabat_A The exponential product diabatic A.
     * @param {number} exponentialProductDiabat_B The exponential product diabatic B.
     * @param {number} exponentialProductDiabat_DE The exponential product diabatic DE.
     */
    constructor(attributes, harmonicReactantDiabat_FC, harmonicReactantDiabat_XO, harmonicProductDiabat_DE, exponentialProductDiabat_A, exponentialProductDiabat_B, exponentialProductDiabat_DE) {
        super(attributes);
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
}
exports.ZhuNakamuraCrossing = ZhuNakamuraCrossing;
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
class Reaction extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "reaction";
    /**
     * The index for the nodes.
     */
    index;
    /**
     * The id of the reaction. This is also stored in the attributes, but is hee for convenience...
     */
    id;
    /**
     * The reactants.
     */
    reactants;
    /**
     * The products.
     */
    products;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Reactant[]} reactants The reactants in the reaction.
     * @param {Product[]} products The products of the reaction.
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {TransitionState | undefined} transitionState The transition state (optional).
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     */
    constructor(attributes, id, reactants, products, mCRCMethod, transitionState, tunneling) {
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.id = id;
        this.reactants = reactants;
        reactants.forEach(reactant => {
            this.addNode(reactant);
            this.addToIndex(Reactant.tagName, this.index.size);
        });
        this.products = products;
        products.forEach(product => {
            this.addNode(product);
            this.addToIndex(Product.tagName, this.index.size);
        });
        if (mCRCMethod != undefined) {
            this.addNode(mCRCMethod);
            this.index.set(MCRCMethod.tagName, this.index.size);
        }
        if (transitionState) {
            this.addNode(transitionState);
            this.index.set(TransitionState.tagName, this.index.size);
        }
        if (tunneling) {
            this.addNode(tunneling);
            this.index.set(Tunneling.tagName, this.index.size);
        }
    }
    /**
     * Add a node to the index.
     * @param {string} key The key.
     * @param {number} value The value.
     */
    addToIndex(key, value) {
        let value0 = this.index.get(key);
        if (value0 == undefined) {
            this.index.set(key, value);
        }
        else if (typeof value0 === 'number') {
            let map = new Map();
            map.set(key, value0);
            map.set(key, value);
            this.index.set(key, map);
        }
        else {
            value0.set(key, value);
        }
    }
    getTransitionState() {
        let i = this.index.get(TransitionState.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    getMCRCMethod() {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    getTunneling() {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */
    getReactantsLabel() {
        return this.reactants.map(reactant => reactant.getRef()).join(' + ');
    }
    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */
    getReactantsEnergy() {
        return this.reactants.map(reactant => reactant.getMolecule().getEnergy()).reduce((a, b) => a + b, 0);
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel() {
        return this.products.map(product => product.getRef()).join(' + ');
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy() {
        return this.products.map(product => product.getMolecule().getEnergy()).reduce((a, b) => a + b, 0);
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */
    getLabel() {
        let label = this.getReactantsLabel() + ' -> ' + this.getProductsLabel();
        return label;
    }
}
exports.Reaction = Reaction;
//# sourceMappingURL=reaction.js.map