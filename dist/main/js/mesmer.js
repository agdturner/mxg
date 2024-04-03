"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mesmer = exports.ControlList = exports.ReactionList = exports.MoleculeList = exports.Title = void 0;
const conditions_js_1 = require("./conditions.js");
const control_js_1 = require("./control.js");
const modelParameters_js_1 = require("./modelParameters.js");
const xml_js_1 = require("./xml.js");
/**
 * The title.
 */
class Title extends xml_js_1.StringNode {
    static tagName = "me:title";
    /**
     * @param value
     */
    constructor(attributes, value) {
        super(attributes, Title.tagName, value);
    }
}
exports.Title = Title;
/**
 * A class for representing a "moleculeList".
 * In the XML, a "moleculeList" node is a child node of the "me:mesmer" node and has "molecule" node children.
 */
class MoleculeList extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "moleculeList";
    /**
     * The index. The keys are the molecule ids and the values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param molecules The molecules.
     */
    constructor(attributes, molecules) {
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
    getMolecule(id) {
        let i = this.index.get(id);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Remove a molecule.
     * @param id The id of the molecule to remove.
     */
    removeMolecule(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a molecule.
     * @param molecule The molecule.
     */
    addMolecule(molecule) {
        let index = this.index.get(molecule.id);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log('Replaced molecule with id ' + molecule.id);
        }
        else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.id, this.nodes.size - 1);
        }
    }
}
exports.MoleculeList = MoleculeList;
/**
 * A class for representing a "reactionList".
 * In the XML, a "reactionList" node is a child node of a "me:mesmer" node and has "reaction" node children.
 */
class ReactionList extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "reactionList";
    /**
     * The index. The keys are the reaction ids and the values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param reactions The reactions.
     */
    constructor(attributes, reactions) {
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
    getReaction(id) {
        let i = this.index.get(id);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Remove a reaction.
     * @param id The id of the reaction to remove.
     */
    removeReaction(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a reaction.
     * @param reaction The reaction.
     */
    addReaction(reaction) {
        let index = this.index.get(reaction.id);
        if (index !== undefined) {
            this.nodes.set(index, reaction);
            console.log('Replaced reaction with id ' + reaction.id);
        }
        else {
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        }
    }
}
exports.ReactionList = ReactionList;
/**
 * A class for representing a "controlList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "control" node is a child node of a "me:mesmer" node and there is no "controlList".
 */
class ControlList extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "controlList";
    /**
     * The index. The keys are the control ids and the values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param controls The controls.
     */
    constructor(attributes, controls) {
        super(attributes, ControlList.tagName);
        this.index = new Map();
        if (controls != undefined) {
            controls.forEach(control => {
                this.nodes.set(this.nodes.size, control);
                this.index.set(control.id, this.nodes.size - 1);
            });
        }
    }
    /**
     * @param id The id of the control.
     * @returns The control.
     */
    getControl(id) {
        let i = this.index.get(id);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */
    removeControl(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a control.
     * @param control The control.
     */
    addControl(control) {
        let index = this.index.get(control.id);
        if (index !== undefined) {
            this.nodes.set(index, control);
            console.log('Replaced control with id ' + control.id);
        }
        else {
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        }
    }
}
exports.ControlList = ControlList;
/**
 * The "me:mesmer" node contains a "me:title", "moleculeList", "reactionList", "me:conditions",
 * "me:modelParameters" and "me:control".
 */
class Mesmer extends xml_js_1.NodeWithNodes {
    static tagName = "me:mesmer";
    /**
     * Precision options.
     */
    static precisionOptions = ["d", "dd", "qd", "double", "double-double", "quad-double"];
    /**
     * Pressure units.
     */
    static pressureUnits = ["Torr", "PPCC", "atm", "mbar", "psi", "mols/cc"];
    /**
     * Energy units.
     */
    static energyUnits = ["kJ/mol", "cm-1", "wavenumber", "kcal/mol", "Hartree", "au"];
    /**
     * Frequency units.
     */
    static frequencyUnits = ["cm-1", "GHz", "amuA^2"];
    /**
     * Atomic mass map for atoms. The keys are element symbols, the values are the atomic mass according to a periodic table.
     * (This is initialised in the constructor.)
     */
    static atomMasses = new Map();
    /**
     * Atomic radius map for atoms. The keys are element symbols, the values are the atomic radii according to a periodic table.
     * (This is initialised in the constructor.)
     */
    static atomRadii = new Map();
    /**
     * Colour map for atoms. The keys are element symbols, the values are the colours the element is assigned.
     * (This is initialised in the constructor.)
     */
    static atomColors = new Map();
    /**
     * Colour map for bonds. The keys are bond order, the values are the colours the bond order is assigned.
     * (This is initialised in the constructor.)
     */
    static bondColors = new Map();
    /**
     * The header of the XML file.
     */
    static header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
    /**
     * The index. The keys are the node names and the values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param moleculeList The molecule list.
     * @param reactionList The reaction list.
     * @param conditions The conditions.
     * @param modelParameters The model parameters.
     * @param controls The controls.
     */
    constructor(attributes, title, moleculeList, reactionList, conditions, modelParameters, controls /*controlList?: ControlList*/) {
        super(attributes, Mesmer.tagName);
        let elements = ["H", "O", "C", "N", "Cl", "S", "Ph", "Fe"];
        let colors = ["White", "Red", "DarkGrey", "Blue", "Green", "Yellow", "Orange", "Brown"];
        for (let i = 0; i < elements.length; i++) {
            Mesmer.atomColors.set(elements[i], colors[i]);
        }
        // Atomic mass units (amu)
        let masses = [1.00784, 15.999, 12.011, 14.007, 35.453, 32.06, 77.845, 55.845]; // Atomic masses (see https://en.wikipedia.org/wiki/Periodic_table).
        for (let i = 0; i < elements.length; i++) {
            Mesmer.atomMasses.set(elements[i], masses[i]);
        }
        // Picometers (pm),
        let radii = [37, 66, 67, 56, 99, 102, 110, 124]; // Calculated radii between two atoms of the same type in a molecule (https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)).
        for (let i = 0; i < elements.length; i++) {
            Mesmer.atomRadii.set(elements[i], radii[i]);
        }
        let bondOrders = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
        colors = ["Black", "Red", "DarkRed", "Blue", "DarkBlue", "Green", "DarkGreen", "Yellow", "DarkYellow", "Orange", "DarkOrange"];
        for (let i = 0; i < bondOrders.length; i++) {
            Mesmer.bondColors.set(bondOrders[i], colors[i]);
        }
        this.index = new Map();
        if (title != undefined) {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (moleculeList != undefined) {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
        if (reactionList != undefined) {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
        if (conditions != undefined) {
            this.index.set(conditions_js_1.Conditions.tagName, this.nodes.size);
            this.addNode(conditions);
        }
        if (modelParameters != undefined) {
            this.index.set(modelParameters_js_1.ModelParameters.tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
        if (controls != undefined) {
            this.index.set(modelParameters_js_1.ModelParameters.tagName, this.nodes.size);
            controls.forEach(control => {
                this.addNode(control);
            });
        }
        /*
        if (controlList != undefined) {
            this.index.set(ControlList.tagName, this.nodes.size);
            this.addNode(controlList);
        }
        */
    }
    /**
     * @returns The title.
     */
    getTitle() {
        let i = this.index.get(Title.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Set the title.
     * @param title The title.
     */
    setTitle(title) {
        let i = this.index.get(Title.tagName);
        if (i != undefined) {
            this.nodes.set(i, title);
        }
        else {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * @returns The molecule list.
     */
    getMoleculeList() {
        let i = this.index.get(MoleculeList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Set the molecule list.
     * @param moleculeList The molecule list.
     */
    setMoleculeList(moleculeList) {
        let i = this.index.get(MoleculeList.tagName);
        if (i != undefined) {
            this.nodes.set(i, moleculeList);
        }
        else {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
    }
    /**
     * @returns The reaction list.
     */
    getReactionList() {
        let i = this.index.get(ReactionList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Set the reaction list.
     * @param reactionList The reaction list.
     */
    setReactionList(reactionList) {
        let i = this.index.get(ReactionList.tagName);
        if (i != undefined) {
            this.nodes.set(i, reactionList);
        }
        else {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
    }
    /**
     * @returns The conditions.
     */
    getConditions() {
        let i = this.index.get(conditions_js_1.Conditions.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Set the conditions.
     * @param conditions The conditions.
     */
    setConditions(conditions) {
        let i = this.index.get(conditions_js_1.Conditions.tagName);
        if (i != undefined) {
            this.nodes.set(i, conditions);
        }
        else {
            this.index.set(conditions_js_1.Conditions.tagName, this.nodes.size);
            this.addNode(conditions);
        }
    }
    /**
     * @returns The model parameters.
     */
    getModelParameters() {
        let i = this.index.get(modelParameters_js_1.ModelParameters.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i);
    }
    /**
     * Set the model parameters.
     * @param modelParameters The model parameters.
     */
    setModelParameters(modelParameters) {
        let i = this.index.get(modelParameters_js_1.ModelParameters.tagName);
        if (i != undefined) {
            this.nodes.set(i, modelParameters);
        }
        else {
            this.index.set(modelParameters_js_1.ModelParameters.tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
    }
    /**
     * @returns The control list.
     */
    /*
    getControlList() {
        let i: number | undefined = this.index.get(ControlList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as ControlList;
    }
    */
    /**
     * Set the control list.
     * @param controlList The control list.
     */
    /*
    setControlList(controlList: ControlList) {
        let i: number | undefined = this.index.get(ControlList.tagName);
        if (i != undefined) {
            this.nodes.set(i, controlList);
        } else {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(controlList);
        }
    }
    */
    /**
     * Add a control.
     * @param control The control.
     */
    addControl(control) {
        let i = this.index.get(control_js_1.Control.tagName + control.id);
        if (i != undefined) {
            this.nodes.set(i, control);
        }
        else {
            this.index.set(control_js_1.Control.tagName, this.nodes.size);
            this.addNode(control);
        }
    }
}
exports.Mesmer = Mesmer;
//# sourceMappingURL=mesmer.js.map