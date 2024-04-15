import Big from 'big.js';
import {
    Molecule, ZPE
} from './molecule.js';

import {
    TagWithAttributes, NodeWithNodes, NumberNode, Tag, NumberArrayNode, StringNode
} from './xml.js';

/**
 * A reference to a molecule, not to be confused with a Molecule.
 * The attribute "ref" is the same as a Molecule ID for a molecule in the XML "moleculeList".
 * The attribute "role" is the role of the molecule in the reaction. Expected values are:
 * ["deficientReactant", "excessReactant", "modelled", "transitionState", "sink"], but this may depend on whether the molecule is a reactant, product or transition state.
 * In the XML, a "molecule" node is a child of a "reactant", "product" or "me:transitionState" node.
 */
export class ReactionMolecule extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "molecule";

    /**
     * The ref attribute.
     */
    ref: string;

    /**
     * The role attribute.
     */
    role: string;

    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, ReactionMolecule.tagName);
        this.ref = attributes.get("ref") as string;
        this.role = attributes.get("role") as string;
    }

    /**
     * @param role The role of the molecule in the reaction.
     */
    setRole(role: string): void {
        this.role = role;
    }

}

/**
 * A molecule that reacts in a reaction.
 * In the XML, a "reactant" node is a child of the "reaction" node and has a child "molecule" node.
 */
export class Reactant extends NodeWithNodes {
    
    /**
     * The tag name.
     */
    static readonly tagName: string = "reactant";

    /**
     * The role options.
     */
    static readonly roleOptions: string[] = ["deficientReactant", "excessReactant", "modelled"];

    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */
    constructor(attributes: Map<string, string>, molecule: ReactionMolecule) {
        super(attributes, Reactant.tagName);
        this.addNode(molecule);
    }

    /**
     * @returns The molecule.
     */
    getMolecule(): ReactionMolecule {
        return this.nodes.get(0) as ReactionMolecule;
    }
}

/**
 * A molecule produced in a reaction.
 * In the XML, a "product" node is a child of the "reaction" node and has a child "molecule" node.
 */
export class Product extends NodeWithNodes {
    
    /**
     * The tag name.
     */
    static readonly tagName: string = "product";

    /**
     * The role options.
     */
    static readonly roleOptions: string[] = ["modelled", "sink"];

    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */
    constructor(attributes: Map<string, string>, molecule: ReactionMolecule) {
        super(attributes, Product.tagName);
        this.addNode(molecule);
    }

    /**
     * @returns The molecule.
     */
    getMolecule(): ReactionMolecule {
        return this.nodes.get(0) as ReactionMolecule;
    }

}

/**
 * A molecule that is a transition state in a reaction.
 * In the XML, a "me:transitionState" node is a child of the "reaction" node and has a child "molecule" node.
 */
export class TransitionState extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:transitionState";

    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */
    constructor(attributes: Map<string, string>, molecule: ReactionMolecule) {
        super(attributes, TransitionState.tagName);
        this.addNode(molecule);
    }

    /**
     * @returns The molecule.
     */
    getMolecule(): ReactionMolecule {
        return this.nodes.get(0) as ReactionMolecule;
    }
}

/**
 * In the XML, a "me:preExponential" node is a child of a "me:MCRCMethod" node.
 */
export class PreExponential extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:preExponential";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, PreExponential.tagName, value);
    }
}

/**
 * In the XML, a "me:activationEnergy" node is a child of a "me:MCRCMethod" node.
 */
export class ActivationEnergy extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:activationEnergy";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, ActivationEnergy.tagName, value);
    }
}

/**
 * In the XML, a "me:TInfinity" node is a child of a "me:MCRCMethod" node.
 */
export class TInfinity extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:TInfinity";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, TInfinity.tagName, value);
    }
}

/**
 * In the XML, a "me:nInfinity" node is a child of a "me:MCRCMethod" node.
 */
export class NInfinity extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:nInfinity";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, NInfinity.tagName, value);
    }
}

/**
 * Extended classes indicate how microcanonical rate constant is to be treated.
 * In the XML, a "me:MCRCMethod" node is a child of a "reaction" node.
 * A simple MCRCMethod has an attribute name="RRKM".
 * There are extended classed representing more complicated MCRCMethods:
 * "me:MesmerILT"
 * "LandauZenerCrossing"
 * "ZhuNakamuraCrossing"
 * "me:CanonicalRateCoefficient"
 * "DefinedSumOfStates"
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
 * The Inverse Laplace Transform (ILT) type of microcanonical rate constant.
 */
export class MesmerILT extends MCRCMethod {

    /**
     * The xsiType.
     */
    static readonly xsiType: string = "me:MesmerILT";

    /**
     * The tag name.
     */
    static readonly xsiType2: string = "MesmerILT";

    /**
     * The index for the nodes. 
     */
    index: Map<string, number>;

    /**
     * Should any parameters be specified as being optional?
     * @param attributes The attributes.
     * @param preExponential The pre-exponential factor (optional).
     * @param activationEnergy The activation energy (optional).
     * @param tInfinity The TInfinity (optional).
     * @param nInfinity The nInfinity (optional).
     */
    constructor(attributes: Map<string, string>, preExponential?: PreExponential,
        activationEnergy?: ActivationEnergy, tInfinity?: TInfinity, nInfinity?: NInfinity) {
        super(attributes);
        this.index = new Map<string, number>();
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
    getPreExponential(): PreExponential | undefined {
        let i: number | undefined = this.index.get(PreExponential.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as PreExponential;
    }

    /**
     * @param preExponential The pre-exponential factor.
     */
    setPreExponential(preExponential: PreExponential): void {
        let i = this.index.get(PreExponential.tagName);
        if (i == undefined) {
            this.index.set(PreExponential.tagName, this.nodes.size);
            this.addNode(preExponential);
        } else {
            this.nodes.set(i, preExponential);
        }
    }

    /**
     * @returns The activation energy or undefined if it does not exist.
     */
    getActivationEnergy(): ActivationEnergy | undefined {
        let i: number | undefined = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as ActivationEnergy;
    }

    /**
     * @param activationEnergy The activation energy.
     */
    setActivationEnergy(activationEnergy: ActivationEnergy): void {
        let i = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) {
            this.index.set(ActivationEnergy.tagName, this.nodes.size);
            this.addNode(activationEnergy);
        } else {
            this.nodes.set(i, activationEnergy);
        }
    }

    /**
     * @returns The TInfinity or undefined if it does not exist.
     */
    getTInfinity(): TInfinity | undefined {
        let i: number | undefined = this.index.get(TInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as TInfinity;
    }

    /**
     * @param tInfinity The TInfinity.
     */
    setTInfinity(tInfinity: TInfinity): void {
        let i = this.index.get(TInfinity.tagName);
        if (i == undefined) {
            this.index.set(TInfinity.tagName, this.nodes.size);
            this.addNode(tInfinity);
        } else {
            this.nodes.set(i, tInfinity);
        }
    }

    /**
     * @returns The NInfinity or undefined if it does not exist.
     */
    getNInfinity(): NInfinity | undefined {
        let i: number | undefined = this.index.get(NInfinity.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as NInfinity;
    }

    /**
     * @param nInfinity The NInfinity.
     */
    setNInfinity(nInfinity: NInfinity): void {
        let i = this.index.get(NInfinity.tagName);
        if (i == undefined) {
            this.index.set(NInfinity.tagName, this.nodes.size);
            this.addNode(nInfinity);
        } else {
            this.nodes.set(i, nInfinity);
        }
    }
}

/**
 * In the XML, the "me:tunneling" node is a child of a "reaction" node.
 * The "name" attribute is one of: [Eckart, WKB].
 */
export class Tunneling extends TagWithAttributes {
    
    /**
     * The tag name.
     */
    static readonly tagName: string = "me:tunneling";

    /**
     * The options.
     */
    static readonly options: string[] = ["Eckart", "WKB"];

    /**
     * The key to the name attribute value.
     */
    static readonly s_name: string = "name";

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Tunneling.tagName);
    }

    /**
     * @returns The name of the tunneling method.
     */
    getName(): string {
        return this.attributes.get(Tunneling.s_name) as string;
    }

    /**
     * @param The name of the tunneling method.
     */
    setName(name: string): void {
        this.attributes.set(Tunneling.s_name, name);
    }
}

/**
 * In the XML, the "me:excessReactantConc" node is a child of a "reaction" node.
 */
export class ExcessReactantConc extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:excessReactantConc";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, ExcessReactantConc.tagName, value);
    }
}

/**
 * A class for representing a reaction.
 */
export class Reaction extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "reaction";

    /**
     * The key to the id attribute value.
     */
    static readonly s_id: string = "id";

    /**
     * The index for the nodes.
     * The key is the type of node.
     * The value is the index of the node in the nodes array or if there are multiple nodes of this type, 
     * the value is a Map where the key of the map is the dictRef of the Node and the value is the respective node index for that specific thing.
     */
    index: Map<string, number | Map<string, number>>;

    /**
     * The reactants index.
     * The key is the ref of the reactant.
     * The value is the index of the reactant in the nodes array.
     */
    reactantsIndex: Map<string, number>;

    /**
     * The products index.
     * The key is the ref of the product.
     * The value is the index of the product in the nodes array.
     */
    productsIndex: Map<string, number>;

    /**
     * The transition states index.
     * The key is the ref of the transition state.
     * The value is the index of the transition state in the nodes array.
     */
    transitionStatesIndex: Map<string, number>;

    /**
     * The id of the reaction.
     */
    id: string;

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
    constructor(attributes: Map<string, string>,
        reactants?: Reactant[], products?: Product[], tunneling?: Tunneling,
        transitionStates?: TransitionState[], mCRCMethod?: MCRCMethod,
        excessReactantConc?: ExcessReactantConc) {
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.reactantsIndex = new Map();
        this.productsIndex = new Map();
        this.transitionStatesIndex = new Map();
        let id: string | undefined = attributes.get(Reaction.s_id);
        if (id == undefined) {
            throw new Error(Reaction.s_id + ' is undefined!');
        }
        this.id = id;
        if (reactants != undefined) {
            reactants.forEach(reactant => {
                this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
                this.addNode(reactant);
            });
            this.index.set(Reactant.tagName, this.reactantsIndex);
        }
        if (products != undefined) {
            products.forEach(product => {
                this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
                this.addNode(product);
            });
            this.index.set(Product.tagName, this.productsIndex);
        }
        if (tunneling != undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach(transitionState => {
                this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
                this.addNode(transitionState);
            });
            this.index.set(TransitionState.tagName, this.transitionStatesIndex);
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
    addToIndex(tagName: string, node: NodeWithNodes): void {
        let v: Map<string, number> | number | undefined = this.index.get(tagName);
        if (v == undefined) {
            this.index.set(tagName, this.nodes.size);
        } else if (v instanceof Map) {
            (v as Map<string, number>).set(node.tagName, this.nodes.size);
        } else {
            let map: Map<string, number> = new Map<string, number>();
            map.set((this.nodes.get(v) as ReactionMolecule).ref, v as number);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }

    /**
     * @returns The reactants.
     */
    getReactants(): Reactant[] {
        let i: Map<string, number> | number | undefined = this.index.get(Reactant.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index) as Reactant);
        } else {
            return [this.nodes.get(i) as Reactant];
        }
    }

    /**
     * Set the reactants.
     */
    setReactants(reactants: Reactant[]): void {
        reactants.forEach(reactant => {
            this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
            this.addNode(reactant);
        });
        this.index.set(Reactant.tagName, this.reactantsIndex);
    }

    /**
     * @returns A particular Reactant.
     * @param ref The ref of the reactant to return.
     * @returns The reactant at the given index.
     */
    getReactant(ref: string): Reactant {
        let index: number | undefined = this.reactantsIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Reactant with ref ${ref} not found`);
        }
        return this.nodes.get(index) as Reactant;
    }

    /**
     * @param reactant The reactant to add.
     */
    addReactant(reactant: Reactant): void {
        this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
        this.addNode(reactant);
    }

    /**
     * @param ref The ref of the reactant to remove.
     */
    removeReactant(ref: string): void {
        let index: number | undefined = this.reactantsIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Reactant with ref ${ref} not found`);
        } else {
            this.nodes.delete(index);
            this.reactantsIndex.delete(ref);
        }
    }

    /**
     * @returns The products.
     */
    getProducts(): Product[] {
        let i: Map<string, number> | number | undefined = this.index.get(Product.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index) as Product);
        } else {
            return [this.nodes.get(i) as Product];
        }
    }

    /**
     * Set the products.
     */
    setProducts(products: Product[]): void {
        products.forEach(product => {
            this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
            this.addNode(product);
        });
        this.index.set(Product.tagName, this.productsIndex);
    }

    /**
     * @returns A particular Product.
     * @param ref The ref of the product to return.
     * @returns The product at the given index.
     */
    getProduct(ref: string): Product {
        let index: number | undefined = this.productsIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Product with ref ${ref} not found`);
        }
        return this.nodes.get(index) as Product;
    }

    /**
     * @param product The product to add.
     */
    addProduct(product: Product): void {
        this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
        this.addNode(product);
    }

    /**
     * @param ref The ref of the product to remove.
     */
    removeProduct(ref: string): void {
        let index: number | undefined = this.productsIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Product with ref ${ref} not found`);
        } else {
            this.nodes.delete(index);
            this.productsIndex.delete(ref);
        }
    }

    /**
     * @returns The tunneling node or undefined if it does not exist.
     */
    getTunneling(): Tunneling | undefined {
        let i: Map<string, number> | number | undefined = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i as number) as Tunneling;
    }

    /**
     * Set the tunneling node or create it if it is undefined.
     */
    setTunneling(tunneling: Tunneling): void {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        } else {
            if (i instanceof Map) {
                throw new Error("Tunneling is a map and it is assumed there would be only 1!");
            } else {
                this.nodes.set(i, tunneling);
            }
        }
    }

    /**
     * @returns The transition states.
     */
    getTransitionStates(): TransitionState[] {
        let i: Map<string, number> | number | undefined = this.index.get(TransitionState.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index) as TransitionState);
        } else {
            return [this.nodes.get(i) as TransitionState];
        }
    }

    /**
     * Set the transition states.
     */
    setTransitionStates(transitionStates: TransitionState[]): void {
        transitionStates.forEach(transitionState => {
            this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
            this.addNode(transitionState);
        });
        this.index.set(TransitionState.tagName, this.transitionStatesIndex);
    }

    /**
     * @returns A particular TransitionState.
     * @param ref The ref of the transition state to return.
     * @returns The transition state at the given index.
     */
    getTransitionState(ref: string): TransitionState {
        let index: number | undefined = this.transitionStatesIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Transition state with ref ${ref} not found`);
        }
        return this.nodes.get(index) as TransitionState;
    }

    /**
     * @param transitionState The transition state to add.
     */
    addTransitionState(transitionState: TransitionState): void {
        this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
        this.addNode(transitionState);
    }

    /**
     * @param ref The ref of the transition state to remove.
     */
    removeTransitionState(ref: string): void {
        let index: number | undefined = this.transitionStatesIndex.get(ref);
        if (index == undefined) {
            throw new Error(`Transition State with ref ${ref} not found`);
        } else {
            this.nodes.delete(index);
            this.transitionStatesIndex.delete(ref);
        }
    }

    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */
    getMCRCMethod(): MCRCMethod | undefined {
        let i: Map<string, number> | number | undefined = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i as number) as MCRCMethod;
    }

    /**
     * Set the MCRCMethod node or create it if it is undefined.
     */
    setMCRCMethod(mCRCMethod: MCRCMethod): void {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        } else {
            if (i instanceof Map) {
                throw new Error("MCRCMethod is a map and it is assumed there would be only 1!");
            } else {
                this.nodes.set(i, mCRCMethod);
            }
        }
    }

    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */
    getExcessReactantConc(): ExcessReactantConc | undefined {
        let i: Map<string, number> | number | undefined = this.index.get(ExcessReactantConc.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i as number) as ExcessReactantConc;
    }

    /**
     * Set the excess reactant concentration or create it if it is undefined.
     */
    setExcessReactantConc(excessReactantConc: ExcessReactantConc): void {
        let i = this.index.get(ExcessReactantConc.tagName);
        if (i == undefined) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        } else {
            if (i instanceof Map) {
                throw new Error("ExcessReactantConc is a map and it is assumed there would be only 1!");
            } else {
                this.nodes.set(i, excessReactantConc);
            }
        }
    }

    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */
    getReactantsLabel(): string {
        return this.getReactants().map(reactant => reactant.getMolecule().ref).join(' + ');
    }

    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel(): string {
        return this.getProducts().map(product => product.getMolecule().ref).join(' + ');
    }

    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */
    getLabel(): string {
        let label: string = this.getReactantsLabel() + ' -> ' + this.getProductsLabel();
        return label;
    }

    /**
     * Returns the total energy of all reactants.
     * @returns The total energy of all reactants.
     */
    getReactantsEnergy(molecules: Map<string, Molecule>): Big {
        // Sum up the energy values of all the reactants in the reaction
        return Array.from(this.getReactants()).map(reactant => {
            let molecule = molecules.get(reactant.getMolecule().ref);
            if (molecule == undefined) {
                throw new Error(`Molecule with ref ${reactant.getMolecule().ref} not found`);
            }
            return molecule.getEnergy();
        }).reduce((a, b) => a.add(b), new Big(0));
    }

    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy(molecules: Map<string, Molecule>): Big {
        // Sum up the energy values of all the products in the reaction
        return Array.from(this.getProducts()).map(product => {
            let molecule = molecules.get(product.getMolecule().ref);
            if (molecule == undefined) {
                throw new Error(`Molecule with ref ${product.getMolecule().ref} not found`);
            }
            return molecule.getEnergy();
        }).reduce((a, b) => a.add(b), new Big(0));
    }

    /**
     * @param tagName The tag name.
     * @param dictRef The dictRef.
     * @returns The node with the tag name and dictRef or undefined if it does not exist.
     */
    get(tagName: string, dictRef: string): NodeWithNodes | TagWithAttributes | Tag | undefined {
        if (this.index.has(tagName)) {
            let i: number | Map<string, number> | undefined = this.index.get(tagName);
            if (i != undefined) {
                if (i instanceof Map) {
                    let nodeIndex: number | undefined = i.get(dictRef);
                    if (nodeIndex != undefined) {
                        return this.nodes.get(nodeIndex);
                    }
                } else {
                    return this.nodes.get(i);
                }
            }
        }
    }

}