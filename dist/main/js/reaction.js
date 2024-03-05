"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = exports.ExcessReactantConc = exports.ZhuNakamuraCrossing = exports.MesmerILT = exports.MCRCMethod = exports.Tunneling = exports.NInfinity = exports.TInfinity = exports.ActivationEnergy = exports.PreExponential = exports.TransitionState = exports.Product = exports.Reactant = void 0;
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
        super(attributes, TransitionState.tagName, molecule, molecules);
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
class MesmerILT extends MCRCMethod {
    /**
     * The xsiType.
     */
    static xsiType = "me:MesmerILT";
    /**
     * The tag name.
     */
    static xsiType2 = "MesmerILT";
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
        super(attributes);
        this.index = new Map();
        if (preExponential != undefined) {
            this.index.set(PreExponential.tagName, this.index.size);
            this.addNode(preExponential);
        }
        if (activationEnergy != undefined) {
            this.index.set(ActivationEnergy.tagName, this.index.size);
            this.addNode(activationEnergy);
        }
        if (tInfinity != undefined) {
            this.index.set(TInfinity.tagName, this.index.size);
            this.addNode(tInfinity);
        }
        if (nInfinity != undefined) {
            this.index.set(NInfinity.tagName, this.index.size);
            this.addNode(nInfinity);
        }
    }
    /**
     * @returns The pre-exponential factor or undefined if it does not exist.
     */
    getPreExponential() {
        let i = this.index.get(PreExponential.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * @returns The activation energy or undefined if it does not exist.
     */
    getActivationEnergy() {
        let i = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * @returns The TInfinity or undefined if it does not exist.
     */
    getTInfinity() {
        let i = this.index.get(TInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * @returns The NInfinity or undefined if it does not exist.
     */
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
class ExcessReactantConc extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:excessReactantConc";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, ExcessReactantConc.tagName, value);
    }
}
exports.ExcessReactantConc = ExcessReactantConc;
/**
 * A class for representing a reaction.
 */
class Reaction extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "reaction";
    /**
     * The index for the nodes. The key is the type of node, the value is the index of the node in the nodes array.
     */
    index;
    /**
     * The reactants.
     */
    reactants;
    /**
     * The products.
     */
    products;
    /**
     * The transition states.
     */
    transitionStates;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant> | Reactant | undefined} reactants The reactants in the reaction.
     * @param {Map<string, Product> | Product | undefined} products The products of the reaction.
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     * @param {Map<string, TransitionState> | TransitionState | undefined} transitionStates The transition states (optional).
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {ExcessReactantConc | undefined} excessReactantConc The excess reactant concentration (optional).
     */
    constructor(attributes, id, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc) {
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.reactants = reactants;
        //console.log("Construct reaction:");
        if (reactants instanceof Map) {
            //console.log("Map of reactants");
            reactants.forEach(reactant => {
                this.addToIndex(Reactant.tagName, reactant);
                this.addNode(reactant);
                //console.log("Added reactant " + reactant);
                //console.log("index.size: " + this.index.size);
                //console.log("nodes.size: " + this.nodes.size);
            });
        }
        else {
            //console.log("Individual reactant");
            if (reactants != undefined) {
                //this.addToIndex(Reactant.tagName, reactants);
                this.index.set(Reactant.tagName, this.nodes.size);
                this.addNode(reactants);
                //console.log("Added reactant " + reactants);
                //console.log("index.size: " + this.index.size);
                //console.log("nodes.size: " + this.nodes.size);
            }
        }
        this.products = products;
        if (products instanceof Map) {
            //console.log("Map of products");
            products.forEach(product => {
                this.addToIndex(Product.tagName, product);
                this.addNode(product);
                //console.log("Added product " + product);
                //console.log("index.size: " + this.index.size);
                //console.log("nodes.size: " + this.nodes.size);
            });
        }
        else {
            if (products != undefined) {
                //console.log("Individual product");
                //this.addToIndex(Product.tagName, products);
                this.index.set(Product.tagName, this.nodes.size);
                this.addNode(products);
                //console.log("Added product " + products);
                //console.log("index.size: " + this.index.size);
                //console.log("nodes.size: " + this.nodes.size);
            }
        }
        if (tunneling) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        this.transitionStates = transitionStates;
        if (transitionStates instanceof Map) {
            //console.log("Map of transition states");
            transitionStates.forEach(transitionState => {
                this.addToIndex(TransitionState.tagName, transitionState);
                this.addNode(transitionState);
                //console.log("Added transition state " + transitionState);
                //console.log("index.size: " + this.index.size);
                //console.log("nodes.size: " + this.nodes.size);
            });
        }
        else {
            if (transitionStates != undefined) {
                //console.log("Individual transition state");
                //this.addToIndex(TransitionState.tagName, transitionStates);
                this.index.set(TransitionState.tagName, this.nodes.size);
                this.addNode(transitionStates);
                //console.log("Added transition state " + transitionStates);
                //console.log("index.size: " + this.index.size);
                //console.log("nodes.size: " + this.nodes.size);
            }
        }
        if (mCRCMethod != undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
    }
    /**
     * Add a node to the index.
     * @returns 0 or 1 depeding on if the index has a new entry.
     */
    addToIndex(tagName, moleculeRef) {
        let value0 = this.index.get(tagName);
        if (value0 == undefined) {
            this.index.set(tagName, this.nodes.size);
        }
        else if (value0 instanceof Map) {
            value0.set(moleculeRef.getRef(), this.nodes.size);
        }
        else {
            let map = new Map();
            map.set(this.nodes.get(value0).getRef(), value0);
            map.set(moleculeRef.getRef(), this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The id of the reaction.
     */
    getID() {
        return this.attributes.get("id");
    }
    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */
    getMCRCMethod() {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * @returns The tunneling node or undefined if it does not exist.
     */
    getTunneling() {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */
    getExcessReactantConc() {
        let i = this.index.get(ExcessReactantConc.tagName);
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
        if (this.reactants == undefined) {
            return undefined;
        }
        else if (this.reactants instanceof Map) {
            return Array.from(this.reactants.keys()).join(' + ');
        }
        else {
            return this.reactants.getRef();
        }
    }
    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */
    getReactantsEnergy() {
        if (this.reactants instanceof Map) {
            return Array.from(this.reactants.values()).map(reactant => reactant.getMolecule().getEnergy()).reduce((a, b) => a + b, 0);
        }
        return 0;
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel() {
        if (this.products == undefined) {
            return undefined;
        }
        else if (this.products instanceof Map) {
            return Array.from(this.products.keys()).join(' + ');
        }
        else {
            return this.products.getRef();
        }
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy() {
        if (this.products instanceof Map) {
            return Array.from(this.products.values()).map(product => product.getMolecule().getEnergy()).reduce((a, b) => a + b, 0);
        }
        return 0;
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