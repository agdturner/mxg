import { Conditions } from "./conditions.js";
import { Control } from "./control.js";
import { ModelParameters } from "./modelParameters.js";
import { Molecule } from "./molecule.js";
import { Reaction } from "./reaction.js";
import { NodeWithNodes, StringNode } from "./xml.js";

/**
 * The header of the XML file.
 */
const header: string = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;

/**
 * The title.
 */
export class Title extends StringNode {

    static readonly tagName: string = "me:title";

    /**
     * @param value 
     */
    constructor(attributes:  Map<string, string>, value: string) {
        super(attributes, Title.tagName, value);
    }

}


/**
 * A class for representing a "moleculeList".
 * In the XML, a "moleculeList" node is a child node of the "me:mesmer" node and has "molecule" node children.
 */
export class MoleculeList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "moleculeList";

    /**
     * The index. The keys are the molecule ids and the values are the node indexes.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param molecules The molecules.
     */
    constructor(attributes: Map<string, string>, molecules?: Molecule[]) {
        super(attributes, MoleculeList.tagName);
        this.index = new Map();
        if (molecules != undefined) {
            molecules.forEach(molecule => {
                this.nodes.set(this.nodes.size, molecule);
                this.index.set(molecule.id, this.nodes.size - 1);
            });
        }
    }

    /**
     * @param id The id of the molecule.
     * @returns The molecule.
     */
    getMolecule(id: string): Molecule | undefined {
        let i: number | undefined = this.index.get(id);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Molecule;
    }

    /**
     * Remove a molecule.
     * @param id The id of the molecule to remove.
     */
    removeMolecule(id: string): void {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }

    /**
     * Add a molecule.
     * @param molecule The molecule.
     */
    addMolecule(molecule: Molecule): void {
        let index = this.index.get(molecule.id);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log('Replaced molecule with id ' + molecule.id);
        } else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.id, this.nodes.size - 1);
        }
    }
}

/**
 * A class for representing a "reactionList".
 * In the XML, a "reactionList" node is a child node of a "me:mesmer" node and has "reaction" node children.
 */
export class ReactionList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "reactionList";

    /**
     * The index. The keys are the reaction ids and the values are the node indexes.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param reactions The reactions.
     */
    constructor(attributes: Map<string, string>, reactions?: Reaction[]) {
        super(attributes, ReactionList.tagName);
        this.index = new Map();
        if (reactions != undefined) {
            reactions.forEach(reaction => {
                this.nodes.set(this.nodes.size, reaction);
                this.index.set(reaction.id, this.nodes.size - 1);
            });
        }
    }

    /**
     * @param id The id of the reaction.
     * @returns The reaction.
     */
    getReaction(id: string): Reaction | undefined {
        let i: number | undefined = this.index.get(id);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Reaction;
    }

    /**
     * Remove a reaction.
     * @param id The id of the reaction to remove.
     */
    removeReaction(id: string): void {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }

    /**
     * Add a reaction.
     * @param reaction The reaction.
     */
    addReaction(reaction: Reaction): void {
        let index = this.index.get(reaction.id);
        if (index !== undefined) {
            this.nodes.set(index, reaction);
            console.log('Replaced reaction with id ' + reaction.id);
        } else {
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        }
    }
}

/**
 * The "me:mesmer" node contains a "me:title", "moleculeList", "reactionList", "me:conditions", 
 * "me:modelParameters" and "me:control".
 */
export class Mesmer extends NodeWithNodes {

    static readonly tagName: string = "me:mesmer";

    /**
     * The index. The keys are the node names and the values are the node indexes.
     */
    index: Map<string, number>;

    constructor(attributes: Map<string, string>, moleculeList?: MoleculeList, reactionList?: ReactionList,
        conditions?: Conditions, modelParameters?: ModelParameters, control?: Control) {
        super(attributes, Mesmer.tagName);
        this.index = new Map();
        if (moleculeList != undefined) {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
        if (reactionList != undefined) {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
        if (conditions != undefined) {
            this.index.set(Conditions.tagName, this.nodes.size);
            this.addNode(conditions);
        }
        if (modelParameters != undefined) {
            this.index.set(ModelParameters.tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
        if (control != undefined) {
            this.index.set(Control.tagName, this.nodes.size);
            this.addNode(control);
        }
    }

    /**
     * @returns The molecule list.
     */
    getMoleculeList() {
        let i: number | undefined = this.index.get(MoleculeList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as MoleculeList;
    }

    /**
     * Set the molecule list.
     * @param moleculeList The molecule list.
     */
    setMoleculeList(moleculeList: MoleculeList) {
        let i: number | undefined = this.index.get(MoleculeList.tagName);
        if (i != undefined) {
            this.nodes.set(i, moleculeList);
        } else {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
    }

    /**
     * @returns The reaction list.
     */
    getReactionList() {
        let i: number | undefined = this.index.get(ReactionList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as ReactionList;
    }

    /**
     * Set the reaction list.
     * @param reactionList The reaction list.
     */
    setReactionList(reactionList: ReactionList) {
        let i: number | undefined = this.index.get(ReactionList.tagName);
        if (i != undefined) {
            this.nodes.set(i, reactionList);
        } else {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
    }

    /**
     * @returns The conditions.
     */
    getConditions() {
        let i: number | undefined = this.index.get(Conditions.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Conditions;
    }

    /**
     * Set the conditions.
     * @param conditions The conditions.
     */
    setConditions(conditions: Conditions) {
        let i: number | undefined = this.index.get(Conditions.tagName);
        if (i != undefined) {
            this.nodes.set(i, conditions);
        } else {
            this.index.set(Conditions.tagName, this.nodes.size);
            this.addNode(conditions);
        }
    }

    /**
     * @returns The model parameters.
     */
    getModelParameters() {
        let i: number | undefined = this.index.get(ModelParameters.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as ModelParameters;
    }

    /**
     * Set the model parameters.
     * @param modelParameters The model parameters.
     */
    setModelParameters(modelParameters: ModelParameters) {
        let i: number | undefined = this.index.get(ModelParameters.tagName);
        if (i != undefined) {
            this.nodes.set(i, modelParameters);
        } else {
            this.index.set(ModelParameters.tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
    }

    /**
     * @returns The control.
     */
    getControl() {
        let i: number | undefined = this.index.get(Control.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as Control;
    }

    /**
     * Set the control.
     * @param control The control.
     */
    setControl(control: Control) {
        let i: number | undefined = this.index.get(Control.tagName);
        if (i != undefined) {
            this.nodes.set(i, control);
        } else {
            this.index.set(Control.tagName, this.nodes.size);
            this.addNode(control);
        }
    }
}