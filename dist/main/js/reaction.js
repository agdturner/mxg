"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = exports.ExcessReactantConc = exports.Tunneling = exports.MesmerILT = exports.MCRCMethod = exports.NInfinity = exports.TInfinity = exports.ActivationEnergy = exports.PreExponential = exports.TransitionState = exports.Product = exports.Reactant = exports.ReactionMolecule = void 0;
const xml_js_1 = require("./xml.js");
/**
 * A reference to a molecule, not to be confused with a Molecule.
 * The attribute "ref" is the same as a Molecule ID for a molecule in the XML "moleculeList".
 */
class ReactionMolecule extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "molecule";
    /**
     * The ref attribute.
     */
    ref;
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */
    constructor(attributes) {
        super(attributes, ReactionMolecule.tagName);
        this.ref = attributes.get("ref");
    }
}
exports.ReactionMolecule = ReactionMolecule;
/**
 * A molecule that reacts in a reaction.
 * In the XML, a "reactant" node is a child of the "reaction" node and has a child "molecule" node.
 */
class Reactant extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "reactant";
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */
    constructor(attributes, molecule) {
        super(attributes, Reactant.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */
    getMolecule() {
        return this.nodes.get(0);
    }
}
exports.Reactant = Reactant;
/**
 * A molecule produced in a reaction.
 * In the XML, a "product" node is a child of the "reaction" node and has a child "molecule" node.
 */
class Product extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "product";
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */
    constructor(attributes, molecule) {
        super(attributes, Product.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */
    getMolecule() {
        return this.nodes.get(0);
    }
}
exports.Product = Product;
/**
 * A molecule that is a transition state in a reaction.
 * In the XML, a "me:transitionState" node is a child of the "reaction" node and has a child "molecule" node.
 */
class TransitionState extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:transitionState";
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */
    constructor(attributes, molecule) {
        super(attributes, TransitionState.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */
    getMolecule() {
        return this.nodes.get(0);
    }
}
exports.TransitionState = TransitionState;
/**
 * In the XML, a "me:preExponential" node is a child of a "me:MCRCMethod" node.
 */
class PreExponential extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:preExponential";
    /**
     * @param attributes The attributes.
     * @param value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, PreExponential.tagName, value);
    }
}
exports.PreExponential = PreExponential;
/**
 * In the XML, a "me:activationEnergy" node is a child of a "me:MCRCMethod" node.
 */
class ActivationEnergy extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:activationEnergy";
    /**
     * @param attributes The attributes.
     * @param value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, ActivationEnergy.tagName, value);
    }
}
exports.ActivationEnergy = ActivationEnergy;
/**
 * In the XML, a "me:TInfinity" node is a child of a "me:MCRCMethod" node.
 */
class TInfinity extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:TInfinity";
    /**
     * @param attributes The attributes.
     * @param value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, TInfinity.tagName, value);
    }
}
exports.TInfinity = TInfinity;
/**
 * In the XML, a "me:nInfinity" node is a child of a "me:MCRCMethod" node.
 */
class NInfinity extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:nInfinity";
    /**
     * @param attributes The attributes.
     * @param value The value of the factor.
     */
    constructor(attributes, value) {
        super(attributes, NInfinity.tagName, value);
    }
}
exports.NInfinity = NInfinity;
/**
 * Extended classes indicate how microcanonical rate constant is to be treated.
 * In the XML, a "me:MCRCMethod" node is a child of a "reaction" node.
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
 * The Inverse Laplace Transform (ILT) type of microcanonical rate constant.
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
     * Should any parameters be specified as being optional?
     * @param attributes The attributes.
     * @param preExponential The pre-exponential factor (optional).
     * @param activationEnergy The activation energy (optional).
     * @param tInfinity The TInfinity (optional).
     * @param nInfinity The nInfinity (optional).
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
 * In the XML, the "me:tunneling" node is a child of a "reaction" node.
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
 * In the XML, the "me:excessReactantConc" node is a child of a "reaction" node.
 */
class ExcessReactantConc extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:excessReactantConc";
    /**
     * @param attributes The attributes.
     * @param value The value of the factor.
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
     * The index for the nodes.
     * The key is the type of node.
     * The value is the index of the node in the nodes array or if there are multiple nodes of this type,
     * the value is a Map where the key of the map is the dictRef of the Node and the value is the respective node index for that specific thing.
     */
    index;
    /**
     * The reactants index.
     * The key is the ref of the reactant.
     * The value is the index of the reactant in the nodes array.
     */
    reactantsIndex;
    /**
     * The products index.
     * The key is the ref of the product.
     * The value is the index of the product in the nodes array.
     */
    productsIndex;
    /**
     * The transition states index.
     * The key is the ref of the transition state.
     * The value is the index of the transition state in the nodes array.
     */
    transitionStatesIndex;
    /**
     * The id of the reaction.
     */
    id;
    /**
     * @param attributes The attributes.
     * @param id The id of the reaction.
     * @param reactants The reactants in the reaction.
     * @param products The products of the reaction.
     * @param tunneling The tunneling (optional).
     * @param transitionStates The transition states (optional).
     * @param mCRCMethod The MCRCMethod (optional).
     * @param excessReactantConc The excess reactant concentration (optional).
     */
    constructor(attributes, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc) {
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.reactantsIndex = new Map();
        this.productsIndex = new Map();
        this.transitionStatesIndex = new Map();
        let id = attributes.get("id");
        if (id == undefined) {
            throw new Error("Reaction id is undefined");
        }
        this.id = id;
        if (reactants != undefined) {
            reactants.forEach(reactant => {
                this.addNode(reactant);
                this.addToIndex(Reactant.tagName, reactant);
                this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size - 1);
            });
        }
        if (products != undefined) {
            products.forEach(product => {
                this.addToIndex(Product.tagName, product);
                this.addNode(product);
                this.productsIndex.set(product.getMolecule().ref, this.nodes.size - 1);
            });
        }
        if (tunneling != undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach(transitionState => {
                this.addToIndex(Product.tagName, transitionState);
                this.addNode(transitionState);
                this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size - 1);
            });
        }
        if (mCRCMethod != undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc != undefined) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
    }
    /**
     * Add a node to the index.
     */
    addToIndex(tagName, node) {
        let v = this.index.get(tagName);
        if (v == undefined) {
            this.index.set(tagName, this.nodes.size);
        }
        else if (v instanceof Map) {
            v.set(node.tagName, this.nodes.size);
        }
        else {
            let map = new Map();
            map.set(this.nodes.get(v).ref, v);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The reactants.
     */
    getReactants() {
        let i = this.index.get(Reactant.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index));
        }
        else {
            return [this.nodes.get(i)];
        }
    }
    /**
     * Set the reactants.
     */
    setReactants(reactants) {
        reactants.forEach(reactant => {
            this.addNode(reactant);
            this.addToIndex(Reactant.tagName, reactant);
            this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size - 1);
        });
    }
    /**
     * @returns A particular Reactant.
     * @param ref The ref of the reactant to return.
     * @returns The reactant at the given index.
     */
    getReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Reactant with ref ${ref} not found`);
        }
        return this.nodes.get(index);
    }
    /**
     * @param reactant The reactant to add.
     */
    addReactant(reactant) {
        this.addNode(reactant);
        this.addToIndex(Reactant.tagName, reactant);
        this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size - 1);
    }
    /**
     * @param ref The ref of the reactant to remove.
     */
    removeReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index != undefined) {
            this.nodes.delete(index);
            this.reactantsIndex.delete(ref);
        }
    }
    /**
     * @returns The products.
     */
    getProducts() {
        let i = this.index.get(Product.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index));
        }
        else {
            return [this.nodes.get(i)];
        }
    }
    /**
     * Set the products.
     */
    setProducts(products) {
        products.forEach(product => {
            this.addToIndex(Product.tagName, product);
            this.addNode(product);
            this.productsIndex.set(product.getMolecule().ref, this.nodes.size - 1);
        });
    }
    /**
     * @returns A particular Product.
     * @param ref The ref of the product to return.
     * @returns The product at the given index.
     */
    getProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Product with ref ${ref} not found`);
        }
        return this.nodes.get(index);
    }
    /**
     * @param product The product to add.
     */
    addProduct(product) {
        this.addNode(product);
        this.addToIndex(Product.tagName, product);
        this.productsIndex.set(product.getMolecule().ref, this.nodes.size - 1);
    }
    /**
     * @param ref The ref of the product to remove.
     */
    removeProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index != undefined) {
            this.nodes.delete(index);
            this.productsIndex.delete(ref);
        }
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
     * Set the tunneling node or create it if it is undefined.
     */
    setTunneling(tunneling) {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        else {
            if (i instanceof Map) {
                throw new Error("Tunneling is a map and it is assumed there would be only 1!");
            }
            else {
                this.nodes.set(i, tunneling);
            }
        }
    }
    /**
     * @returns The transition states.
     */
    getTransitionStates() {
        let i = this.index.get(TransitionState.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index));
        }
        else {
            return [this.nodes.get(i)];
        }
    }
    /**
     * Set the transition states.
     */
    setTransitionStates(transitionStates) {
        transitionStates.forEach(transitionState => {
            this.addToIndex(TransitionState.tagName, transitionState);
            this.addNode(transitionState);
            this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size - 1);
        });
    }
    /**
     * @returns A particular TransitionState.
     * @param ref The ref of the transition state to return.
     * @returns The transition state at the given index.
     */
    getTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Transition state with ref ${ref} not found`);
        }
        return this.nodes.get(index);
    }
    /**
     * @param transitionState The transition state to add.
     */
    addTransitionState(transitionState) {
        this.addNode(transitionState);
        this.addToIndex(TransitionState.tagName, transitionState);
        this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size - 1);
    }
    /**
     * @param ref The ref of the transition state to remove.
     */
    removeTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index != undefined) {
            this.nodes.delete(index);
            this.transitionStatesIndex.delete(ref);
        }
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
     * Set the MCRCMethod node or create it if it is undefined.
     */
    setMCRCMethod(mCRCMethod) {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        else {
            if (i instanceof Map) {
                throw new Error("MCRCMethod is a map and it is assumed there would be only 1!");
            }
            else {
                this.nodes.set(i, mCRCMethod);
            }
        }
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
     * Set the excess reactant concentration or create it if it is undefined.
     */
    setExcessReactantConc(excessReactantConc) {
        let i = this.index.get(ExcessReactantConc.tagName);
        if (i == undefined) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
        else {
            if (i instanceof Map) {
                throw new Error("ExcessReactantConc is a map and it is assumed there would be only 1!");
            }
            else {
                this.nodes.set(i, excessReactantConc);
            }
        }
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */
    getReactantsLabel() {
        return this.getReactants().map(reactant => reactant.getMolecule().ref).join(' + ');
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel() {
        return this.getProducts().map(product => product.getMolecule().ref).join(' + ');
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */
    getLabel() {
        let label = this.getReactantsLabel() + ' -> ' + this.getProductsLabel();
        return label;
    }
    /**
     * Returns the total energy of all reactants.
     * @returns The total energy of all reactants.
     */
    getReactantsEnergy(molecules) {
        // Sum up the energy values of all the reactants in the reaction
        return Array.from(this.getReactants()).map(reactant => {
            let molecule = molecules.get(reactant.getMolecule().ref);
            if (molecule == undefined) {
                throw new Error(`Molecule with ref ${reactant.getMolecule().ref} not found`);
            }
            return molecule.getEnergy();
        }).reduce((a, b) => a + b, 0);
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy(molecules) {
        // Sum up the energy values of all the products in the reaction
        return Array.from(this.getProducts()).map(product => {
            let molecule = molecules.get(product.getMolecule().ref);
            if (molecule == undefined) {
                throw new Error(`Molecule with ref ${product.getMolecule().ref} not found`);
            }
            return molecule.getEnergy();
        }).reduce((a, b) => a + b, 0);
    }
    /**
     * @param tagName The tag name.
     * @param dictRef The dictRef.
     * @returns The node with the tag name and dictRef or undefined if it does not exist.
     */
    get(tagName, dictRef) {
        if (this.index.has(tagName)) {
            let i = this.index.get(tagName);
            if (i != undefined) {
                if (i instanceof Map) {
                    let nodeIndex = i.get(dictRef);
                    if (nodeIndex != undefined) {
                        return this.nodes.get(nodeIndex);
                    }
                }
                else {
                    return this.nodes.get(i);
                }
            }
        }
    }
}
exports.Reaction = Reaction;
//# sourceMappingURL=reaction.js.map