import { Big } from 'big.js';
import { Molecule, ZPE } from './xml_molecule.js';
import { TagWithAttributes, NodeWithNodes, NumberNode, Tag, NumberArrayNode, StringNode, getAttribute } from './xml.js';
import { Description, T } from './xml_mesmer.js';

/**
 * A reference to a molecule, not to be confused with a Molecule.
 * The attribute "ref" is the same as a Molecule ID for a molecule in the XML "moleculeList".
 * The attribute "role" is the role of the molecule in the reaction. Expected values are:
 * ["deficientReactant", "excessReactant", "modelled", "transitionState", "sink"], but this may depend 
 * on whether the molecule is a reactant, product or transition state.
 * In the XML, a "molecule" node is a child of a "reactant", "product" or "me:transitionState" node.
 */
export class ReactionMolecule extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "molecule";

    /**
     * The ref string.
     */
    static readonly s_ref: string = "ref";

    /**
     * The role string.
     */
    static readonly s_role: string = "role";

    /**
     * The ref attribute.
     */
    private ref: string;

    /**
     * The role attribute.
     */
    private role: string;

    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, ReactionMolecule.tagName);
        this.ref = attributes.get(ReactionMolecule.s_ref) as string;
        this.role = attributes.get(ReactionMolecule.s_role) as string;
    }

    /**
     * @returns The ref attribute.
     */
    getRef(): string {
        return this.ref;
    }

    /**
     * @param ref The ref attribute.
     */
    setRef(ref: string): void {
        this.ref = ref;
        this.attributes.set("ref", ref);
    }

    /**
     * @returns The role attribute.
     */
    getRole(): string {
        return this.role;
    }

    /**
     * @param role The role of the molecule in the reaction.
     */
    setRole(role: string): void {
        this.role = role;
        this.attributes.set("role", role);
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
    static readonly s_deficientReactant = "deficientReactant";
    static readonly s_excessReactant = "excessReactant";
    static readonly s_modelled = "modelled";
    static readonly roleOptions: string[] = [Reactant.s_deficientReactant, Reactant.s_excessReactant, Reactant.s_modelled];

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
     * The role.
     */
    static readonly role: string = "transitionState";

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
 * In the XML, the "me:val" node is a child of a "me:kinf" node.
 */
export class Val extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:val";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, Val.tagName, value);
    }
}

/**
 * In the XML, the "me:rev" node is a child of a "me:kinf" node.
 */
export class Rev extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:rev";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, Rev.tagName, value);
    }
}

/**
 * In the XML, the "me:val" node is a child of a "me:kinf" node.
 */
export class Keq extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:Keq";

    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, Keq.tagName, value);
    }
}

/**
 * In the XML, the "me:kinf" node is a child of a "me:canonicalRateList" node.
 */
export class Kinf extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:kinf";

    /**
     * The index for the nodes.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param t The t.
     * @param val The val.
     * @param rev The rev.
     * @param Keq The Keq.
     */
    constructor(attributes: Map<string, string>, t?: T, val?: Val, rev?: Rev, keq?: Keq) {
        super(attributes, Kinf.tagName);
        this.index = new Map();
        if (t != undefined) {
            this.index.set(T.tagName, this.nodes.size);
            this.addNode(t);
        }
        if (val != undefined) {
            this.index.set(Val.tagName, this.nodes.size);
            this.addNode(val);
        }
        if (rev != undefined) {
            this.index.set(Rev.tagName, this.nodes.size);
            this.addNode(rev);
        }
        if (keq != undefined) {
            this.index.set(Keq.tagName, this.nodes.size);
            this.addNode(keq);
        }
    }

    /**
     * @returns The T node or undefined if it does not exist.
     */
    getT(): T | undefined {
        let i: number | undefined = this.index.get(T.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as T;
    }

    /**
     * @param t The T node.
     */
    setT(t: T): void {
        let i = this.index.get(T.tagName);
        if (i == undefined) {
            this.index.set(T.tagName, this.nodes.size);
            this.addNode(t);
        } else {
            this.nodes.set(i, t);
        }
    }

    /**
     * @returns The Val node or undefined if it does not exist.
     */
    getVal(): Val | undefined {
        let i: number | undefined = this.index.get(Val.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Val;
    }

    /**
     * @param val The Val node.
     */
    setVal(val: Val): void {
        let i = this.index.get(Val.tagName);
        if (i == undefined) {
            this.index.set(Val.tagName, this.nodes.size);
            this.addNode(val);
        } else {
            this.nodes.set(i, val);
        }
    }

    /**
     * @returns The Rev node or undefined if it does not exist.
     */
    getRev(): Rev | undefined {
        let i: number | undefined = this.index.get(Rev.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Rev;
    }

    /**
     * @param rev The Rev node.
     */
    setRev(rev: Rev): void {
        let i = this.index.get(Rev.tagName);
        if (i == undefined) {
            this.index.set(Rev.tagName, this.nodes.size);
            this.addNode(rev);
        } else {
            this.nodes.set(i, rev);
        }
    }

    /**
     * @returns The Keq node or undefined if it does not exist.
     */
    getKeq(): Keq | undefined {
        let i: number | undefined = this.index.get(Keq.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Keq;
    }

    /**
     * @param keq The Keq node.
     */
    setKeq(keq: Keq): void {
        let i = this.index.get(Keq.tagName);
        if (i == undefined) {
            this.index.set(Keq.tagName, this.nodes.size);
            this.addNode(keq);
        } else {
            this.nodes.set(i, keq);
        }
    }

    /**
    * The header.
    */
    getHeader(): string[] {
        let header: string[] = [];
        header.push("T (" + this.getT()?.attributes.get("units") + ")");
        header.push("kf (" + this.getVal()?.attributes.get("units") + ")");
        header.push("krev (" + this.getRev()?.attributes.get("units") + ")");
        header.push("Keq (" + this.getKeq()?.attributes.get("units") + ")");
        return header;
    }

    /**
     * @returns The Kinf as a string[].
     */
    toStringArray(): string[] {
        let t: T = this.getT()!;
        let val: Val = this.getVal()!;
        let rev: Rev = this.getRev()!;
        let keq: Keq = this.getKeq()!;
        //return [t.getValue().toString(), val.getValue().toString(), rev.getValue().toString(), keq.getValue().toString()];
        return [t.value.toString(), val.value.toString(), rev.value.toString(), keq.value.toString()];
    }

    /**
     * @returns The Kinf as a CSV string.
     */
    toCSV() {
        return this.toStringArray().join(",");
    }
}

/**
 * In the XML, the "me:canonicalRateList" node is a child of a "reaction" node.
 */
export class CanonicalRateList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:canonicalRateList";

    /**
     * The index for the nodes.
     */
    index: Map<string, number>;

    /**
     * The Kinf index. The key is the index of the Kinf node, the value is the index of the Kinf node in the nodes array.
     */
    kinfIndex: Map<number, number>;

    /**
     * @param attributes The attributes.
     * @param canonicalRate The canonical rate.
     */
    constructor(attributes: Map<string, string>, description?: Description, kinfs?: Kinf[]) {
        super(attributes, CanonicalRateList.tagName);
        this.index = new Map();
        this.kinfIndex = new Map();
        if (description != undefined) {
            this.index.set(Description.tagName, this.nodes.size);
            this.addNode(description);
        }
        if (kinfs != undefined) {
            kinfs.forEach(kinf => {
                this.kinfIndex.set(this.nodes.size, this.nodes.size);
                this.addNode(kinf);
            });
        }
    }

    /**
     * @returns The Description node or undefined if it does not exist.
     */
    getDescription(): Description | undefined {
        let i: number | undefined = this.index.get(Description.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Description;
    }

    /**
     * @param description The Description node.
     */
    setDescription(description: Description): void {
        let i = this.index.get(Description.tagName);
        if (i == undefined) {
            this.index.set(Description.tagName, this.nodes.size);
            this.addNode(description);
        } else {
            this.nodes.set(i, description);
        }
    }

    /**
     * @returns The Kinf nodes.
     */
    getKinfs(): Kinf[] {
        return Array.from(this.kinfIndex.values()).map(index => this.nodes.get(index) as Kinf);
    }

    /**
     * @param kinf The Kinf node.
     */
    addKinf(kinf: Kinf): void {
        this.kinfIndex.set(this.kinfIndex.size, this.nodes.size);
        this.addNode(kinf);
    }

    /**
     * @returns The CanonicalRateList as a CSV string.
     */
    toCSV(): string {
        let csv: string = "";
        let first: boolean = true;
        this.getKinfs().forEach((k) => {
            if (first) {
                first = false;
                csv += k.getHeader().join(",") + "\n";
            }
            csv += k.toCSV() + "\n";
        });
        return csv;
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
     * @param canonicalRateList The canonical rate list (optional).
     */
    constructor(attributes: Map<string, string>,
        reactants?: Map<string, Reactant>, products?: Map<string, Product>, tunneling?: Tunneling,
        transitionStates?: Map<string, TransitionState>, mCRCMethod?: MCRCMethod,
        excessReactantConc?: ExcessReactantConc, canonicalRateList?: CanonicalRateList) {
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
            reactants.forEach((r, key) => {
                this.reactantsIndex.set(r.getMolecule().getRef(), this.nodes.size);
                this.addNode(r);
            });
            this.index.set(Reactant.tagName, this.reactantsIndex);
        }
        if (products != undefined) {
            products.forEach((p, key) => {
                this.productsIndex.set(p.getMolecule().getRef(), this.nodes.size);
                this.addNode(p);
            });
            this.index.set(Product.tagName, this.productsIndex);
        }
        if (tunneling != undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach((t, key) => {
                this.transitionStatesIndex.set(t.getMolecule().getRef(), this.nodes.size);
                this.addNode(t);
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
        if (canonicalRateList != undefined) {
            this.index.set(CanonicalRateList.tagName, this.nodes.size);
            this.addNode(canonicalRateList);
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
            map.set((this.nodes.get(v) as ReactionMolecule).getRef(), v as number);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }

    /**
     * @returns The reactants.
     */
    getReactants(): Map<string, Reactant> {
        let i: Map<string, number> | number | undefined = this.index.get(Reactant.tagName);
        if (i == undefined) {
            return new Map();
        }
        let reactants: Map<string, Reactant> = new Map();
        if (i instanceof Map) {
            (i as Map<string, number>).forEach((index, ref) => {
                reactants.set(ref, this.nodes.get(index) as Reactant);
            });
        } else {
            let r: Reactant = this.nodes.get(i) as Reactant;
            reactants.set(r.getMolecule().getRef(), r);
        }
        return reactants;
    }

    /**
     * Set the reactants.
     */
    setReactants(reactants: Map<string, Reactant>): void {
        reactants.forEach((reactant, key) => {
            this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
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
        this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
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
    getProducts(): Map<string, Product> {
        /*
        let i: Map<string, number> | number | undefined = this.index.get(Product.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index) as Product);
        } else {
            return [this.nodes.get(i) as Product];
        }*/
        let i: Map<string, number> | number | undefined = this.index.get(Product.tagName);
        if (i == undefined) {
            return new Map();
        }
        let products: Map<string, Product> = new Map();
        if (i instanceof Map) {
            (i as Map<string, number>).forEach((index, ref) => {
                products.set(ref, this.nodes.get(index) as Product);
            });
        } else {
            let r: Product = this.nodes.get(i) as Product;
            products.set(r.getMolecule().getRef(), r);
        }
        return products;
    }

    /**
     * Set the products.
     */
    setProducts(products: Map<string, Product>): void {
        products.forEach((product, key) => {
            this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
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
        this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
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
    getTransitionStates(): Map<string, TransitionState> {
        let i: Map<string, number> | number | undefined = this.index.get(TransitionState.tagName);
        if (i == undefined) {
            return new Map();
        }
        let transitionStates: Map<string, TransitionState> = new Map();
        if (i instanceof Map) {
            (i as Map<string, number>).forEach((index, ref) => {
                transitionStates.set(ref, this.nodes.get(index) as TransitionState);
            });
        } else {
            let r: TransitionState = this.nodes.get(i) as TransitionState;
            transitionStates.set(r.getMolecule().getRef(), r);
        }
        return transitionStates;
    }

    /**
     * Set the transition states.
     */
    setTransitionStates(transitionStates: Map<string, TransitionState>): void {
        transitionStates.forEach((transitionState, key) => {
            this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
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
        this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
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
     * @returns The canonical rate list or undefined if it does not exist.
     */
    getCanonicalRateList(): CanonicalRateList | undefined {
        let i: Map<string, number> | number | undefined = this.index.get(CanonicalRateList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i as number) as CanonicalRateList;
    }

    /**
     * Set the canonical rate list or create it if it is undefined.
     */
    setCanonicalRateList(canonicalRateList: CanonicalRateList): void {
        let i = this.index.get(CanonicalRateList.tagName);
        if (i == undefined) {
            this.index.set(CanonicalRateList.tagName, this.nodes.size);
            this.addNode(canonicalRateList);
        } else {
            if (i instanceof Map) {
                throw new Error("CanonicalRateList is a map and it is assumed there would be only 1!");
            } else {
                this.nodes.set(i, canonicalRateList);
            }
        }
    }

    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */
    getReactantsLabel(): string {
        return Array.from(this.getReactants().values()).map(reactant => reactant.getMolecule().getRef()).join(' + ');
    }

    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel(): string {
        //return this.getProducts().map(product => product.getMolecule().getRef()).join(' + ');
        return Array.from(this.getProducts().values()).map(product => product.getMolecule().getRef()).join(' + ');
    }

    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */
    getLabel(): string {
        let label: string = this.id + ' (' + this.getReactantsLabel() + ' -> ' + this.getProductsLabel() + ')';
        return label;
    }

    /**
     * Returns the total energy of all reactants.
     * @returns The total energy of all reactants.
     */
    getReactantsEnergy(retrieveMolecule: Function, molecules: Map<string, Molecule>): Big {
        // Sum up the energy values of all the reactants in the reaction
        return Array.from(this.getReactants().values()).map(reactant => {
            let ref: string = reactant.getMolecule().getRef();
            //console.log("ref=\"" + ref + "\"");
            let molecule: Molecule = retrieveMolecule(ref, molecules);
            if (molecule == undefined) {
                throw new Error(`Molecule with ref ${ref} not found`);
            }
            return molecule.getEnergy();
        }).reduce((a, b) => a.add(b), new Big(0));
    }

    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy(retrieveMolecule: Function, molecules: Map<string, Molecule>): Big {
        // Sum up the energy values of all the products in the reaction
        //return Array.from(this.getProducts()).map(product => {
        return Array.from(this.getProducts().values()).map(product => {
            let ref: string = product.getMolecule().getRef();
            //console.log("ref=\"" + ref + "\"");
            let molecule: Molecule = retrieveMolecule(ref, molecules);
            if (molecule == undefined) {
                throw new Error(`Molecule with ref ${ref} not found`);
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