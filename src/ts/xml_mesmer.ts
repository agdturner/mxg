import { Analysis } from "./xml_analysis.js";
import { Conditions } from "./xml_conditions.js";
import { Control } from "./xml_control.js";
import { MetadataList } from "./xml_metadata.js";
import { ModelParameters } from "./xml_modelParameters.js";
import { Molecule } from "./xml_molecule.js";
import { Reaction } from "./xml_reaction.js";
import { arrayToString, mapToString } from "./util.js";
import { NodeWithNodes, NumberNode, StringNode } from "./xml.js";

/**
 * The title.
 */
export class Title extends StringNode {

    static readonly tagName: string = "me:title";

    /**
     * @param value 
     */
    constructor(attributes: Map<string, string>, value: string) {
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
                this.index.set(molecule.getID(), this.nodes.size - 1);
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
        let mID: string = molecule.getID();
        let index = this.index.get(mID);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log('Replaced molecule with id ' + mID);
        } else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(mID, this.nodes.size - 1);
        }
    }

    /**
     * Update a molecule id.
     * @param oldId The old id.
     * @param newId The new id.
     */
    /*
    updateMoleculeId(oldId: string, newId: string) {
        let i: number | undefined = this.index.get(oldId);
        if (i != undefined) {
            let molecule = this.nodes.get(i) as Molecule;
            molecule.setID(newId);
            this.index.delete(oldId);
            this.index.set(newId, i);
        }
    }*/
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

    /**
     * @returns The next control id.
     */
    getNextReactionID(): number {
        let id = 1;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.index.keys()).sort((a, b) => {
            // Extract the number parts from the keys
            let matchA = a.match(/\d+/);
            let matchB = b.match(/\d+/);
            let numberA = matchA ? parseInt(matchA[0]) : 0;
            let numberB = matchB ? parseInt(matchB[0]) : 0;
            // Compare the number parts
            return numberA - numberB;
        });
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key) => {
            let key2 = parseInt(key.match(/\d+/)![0]);
            if (key2 > id) {
                return id;
            }
            id++;
        });
        return id;
    }
}

/**
 * A class for representing a "conditionsList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "conditions" node is a child node of a "me:mesmer" node and there is no "conditionsList".
 */
export class ConditionsList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "conditionsList";

    /**
     * The index. The keys are the conditions ids and the values are the node indexes.
     */
    index: Map<number, number>;

    /**
     * @param attributes The attributes.
     * @param conditionss The conditions.
     */
    constructor(attributes: Map<string, string>, conditionss?: Conditions[]) {
        super(attributes, ControlList.tagName);
        this.index = new Map();
        if (conditionss != undefined) {
            conditionss.forEach(conditions => {
                this.nodes.set(this.nodes.size, conditions);
                this.index.set(conditions.id, this.nodes.size - 1);
            });
        }
    }

    /**
     * @param id The id of the control.
     * @returns The conditions.
     */
    getConditions(id: number): Conditions | undefined {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            return this.nodes.get(i) as Conditions;
        }
    }

    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */
    removeConditions(id: number): void {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }

    /**
     * Add a conditions.
     * @param conditions The conditions.
     */
    addConditions(conditions: Conditions): void {
        let index = this.index.get(conditions.id);
        if (index != undefined) {
            this.nodes.set(index, conditions);
            console.log('Replaced conditions with id ' + conditions.id);
        } else {
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        }
    }
}

/**
 * A class for representing a "modelParametersList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "modelParameters" node is a child node of a "me:mesmer" node and there is no "modelParametersList".
 */
export class ModelParametersList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "modelParametersList";

    /**
     * The index. The keys are the modelParameters ids and the values are the node indexes.
     */
    index: Map<number, number>;

    /**
     * @param attributes The attributes.
     * @param modelParameterss The modelParameters.
     */
    constructor(attributes: Map<string, string>, modelParameterss?: ModelParameters[]) {
        super(attributes, ModelParametersList.tagName);
        this.index = new Map();
        if (modelParameterss != undefined) {
            modelParameterss.forEach(modelParameters => {
                this.nodes.set(this.nodes.size, modelParameters);
                this.index.set(modelParameters.id, this.nodes.size - 1);
            });
        }
    }

    /**
     * @param id The id of the modelParameters.
     * @returns The modelParameters.
     */
    getModelParameters(id: number): ModelParameters | undefined {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            return this.nodes.get(i) as ModelParameters;
        }
    }

    /**
     * Remove a modelParameters.
     * @param id The id of the modelParameters to remove.
     */
    removeModelParameters(id: number): void {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }

    /**
     * Add a modelParameters.
     * @param modelParameters The modelParameters.
     */
    addModelParameters(modelParameters: ModelParameters): void {
        let index = this.index.get(modelParameters.id);
        if (index != undefined) {
            this.nodes.set(index, modelParameters);
            console.log('Replaced modelParameters with id ' + modelParameters.id);
        } else {
            this.nodes.set(this.nodes.size, modelParameters);
            this.index.set(modelParameters.id, this.nodes.size - 1);
        }
    }
}


/**
 * A class for representing a "controlList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "control" node is a child node of a "me:mesmer" node and there is no "controlList".
 */
export class ControlList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "controlList";

    /**
     * The index. The keys are the control ids and the values are the node indexes.
     */
    index: Map<number, number>;

    /**
     * @param attributes The attributes.
     * @param controls The controls.
     */
    constructor(attributes: Map<string, string>, controls?: Control[]) {
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
    getControl(id: number): Control | undefined {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            return this.nodes.get(i) as Control;
        }
    }

    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */
    removeControl(id: number): void {
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }

    /**
     * Add a control.
     * @param control The control.
     */
    addControl(control: Control): void {
        let index = this.index.get(control.id);
        if (index !== undefined) {
            this.nodes.set(index, control);
            console.log('Replaced control with id ' + control.id);
        } else {
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
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
     * Precision options.
     */
    static readonly precisionOptions: string[] = ["d", "dd", "qd", "double", "double-double", "quad-double"];

    /**
     * Pressure units.
     */
    static readonly pressureUnits: string[] = ["Torr", "PPCC", "atm", "mbar", "psi", "mols/cc"];

    /**
     * Energy units.
     */
    static readonly energyUnits: string[] = ["kJ/mol", "kJ per mol", "cm-1", "wavenumber", "kcal/mol", "kcal per mol", "Hartree", "au"];

    /**
     * Frequency units.
     */
    static readonly frequencyUnits: string[] = ["cm-1", "GHz", "amuA^2"];

    /**
     * The atoms with 1 to 118 protons inclusive. (source: https://query.wikidata.org/#SELECT%20%3Felement%20%3Fsymbol%20%20%3Fprotons%0AWHERE%0A%7B%0A%20%20%3Felement%20wdt%3AP31%20wd%3AQ11344%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP1086%20%3Fprotons%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP246%20%3Fsymbol%20.%0A%7D%0A%0AORDER%20BY%20%3Fprotons)
     */
    static readonly elementTypes: string[] = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
        "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb",
        "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu",
        "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At",
        "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh",
        "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];

    /**
     * Atomic mass map for atoms. The keys are element symbols, the values are the atomic mass according to a periodic table.
     * (This is initialised in the constructor.)
     */
    static readonly atomMasses: Map<string, number> = new Map();

    /**
     * Atomic radius map for atoms. The keys are element symbols, the values are the atomic radii according to a periodic table.
     * (This is initialised in the constructor.)
     */
    static readonly atomRadii: Map<string, number> = new Map();

    /**
     * Colour map for atoms. The keys are element symbols, the values are the colours the element is assigned.
     * (This is initialised in the constructor.)
     */
    static readonly atomColors: Map<string, string> = new Map();

    /**
     * Colour map for bonds. The keys are bond order, the values are the colours the bond order is assigned.
     * (This is initialised in the constructor.)
     */
    static readonly bondColors: Map<number, string> = new Map();

    /**
     * The header of the XML file.
     */
    static header: string = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;

    /**
     * The index. The keys are the node names and the values are the node indexes.
     */
    index: Map<string, number>;

    /**
     * The conditions index. The keys are the conditions ids and the values are the node indexes.
     */
    conditionsIndex: Map<number, number>;

    /**
     * The modelParameters index. The keys are the modelParameters ids and the values are the node indexes.
     */
    modelParametersIndex: Map<number, number>;

    /**
     * The control index. The keys are the control ids and the values are the node indexes.
     */
    controlIndex: Map<number, number>;

    /**
     * @param attributes The attributes.
     * @param moleculeList The molecule list.
     * @param reactionList The reaction list.
     * @param conditions The conditions.
     * @param modelParameters The model parameters.
     * @param controls The controls.
     */
    constructor(attributes: Map<string, string>, title?: Title, moleculeList?: MoleculeList, reactionList?: ReactionList,
        conditionss?: Conditions[], modelParameterss?: ModelParameters[], controls?: Control[], metadataList?: MetadataList,
        analysis?: Analysis) {
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
        this.conditionsIndex = new Map();
        if (conditionss != undefined) {
            conditionss.forEach(conditions => {
                this.index.set(Conditions.tagName + conditions.id, this.nodes.size);
                this.conditionsIndex.set(conditions.id, this.nodes.size);
                this.addNode(conditions);
            });
        }
        this.modelParametersIndex = new Map();
        if (modelParameterss != undefined) {
            modelParameterss.forEach(modelParameters => {
                this.index.set(ModelParameters.tagName + modelParameters.id, this.nodes.size);
                this.modelParametersIndex.set(modelParameters.id, this.nodes.size);
                this.addNode(modelParameters);
            });
        }
        this.controlIndex = new Map();
        if (controls != undefined) {
            controls.forEach(control => {
                this.index.set(Control.tagName + control.id, this.nodes.size);
                this.controlIndex.set(control.id, this.nodes.size);
                this.addNode(control);
            });
        }
        if (metadataList != undefined) {
            this.index.set(MetadataList.tagName, this.nodes.size);
            this.addNode(metadataList);
        }
        if (analysis != undefined) {
            this.index.set(Analysis.tagName, this.nodes.size);
            this.addNode(analysis);
        }
    }

    /**
     * @returns The title.
     */
    getTitle(): Title | undefined {
        let i: number | undefined = this.index.get(Title.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Title;
        }
    }

    /**
     * Set the title.
     * @param title The title.
     */
    setTitle(title: Title): void {
        let i: number | undefined = this.index.get(Title.tagName);
        if (i != undefined) {
            this.nodes.set(i, title);
        } else {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
    }

    /**
     * @returns The molecule list.
     */
    getMoleculeList(): MoleculeList {
        let i: number | undefined = this.index.get(MoleculeList.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as MoleculeList;
        } else {
            let moleculeList = new MoleculeList(new Map());
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
            return moleculeList;
        }
    }

    /**
     * Set the molecule list.
     * @param moleculeList The molecule list.
     */
    setMoleculeList(moleculeList: MoleculeList): void {
        let i: number | undefined = this.index.get(MoleculeList.tagName);
        if (i != undefined) {
            this.nodes.set(i, moleculeList);
        } else {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
    }

    /**
     * @returns The next control id.
     *
    getNextReactionID(): number {
        let id = 1;
        if (this.getReactionList() == undefined) {
            return id;
        }
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.getReactionList()!.index.keys()).sort((a, b) => {
            // Extract the number parts from the keys
            let matchA = a.match(/\d+/);
            let matchB = b.match(/\d+/);
            let numberA = matchA ? parseInt(matchA[0]) : 0;
            let numberB = matchB ? parseInt(matchB[0]) : 0;
            // Compare the number parts
            return numberA - numberB;
        });
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key) => {
            let key2 = parseInt(key.match(/\d+/)![0]);
            if (key2 > id) {
                return id;
            }
            id++;
        });
        return id;
    }

    /**
     * @param reaction The reaction to add.
     *
    addReaction(reaction: Reaction) {
        let id = Reaction.tagName + reaction.id;
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.set(i, reaction);
        } else {
            this.index.set(id, this.nodes.size);
            this.addNode(reaction);
        }
    }

    /**
     * @param reactionID The id of the reaction to remove.
     *
    removeReaction(reactionID: number) {
        let i: number | undefined = this.index.get(Reaction.tagName + reactionID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Reaction.tagName + reactionID);
        }
    }

    /**
     * @returns The reaction list.
     */
    getReactionList(): ReactionList {
        let i: number | undefined = this.index.get(ReactionList.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as ReactionList;
        } else {
            let reactionList = new ReactionList(new Map());
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
            return reactionList;
        }
    }

    /**
     * Set the reaction list.
     * @param reactionList The reaction list.
     */
    setReactionList(reactionList: ReactionList): void {
        let i: number | undefined = this.index.get(ReactionList.tagName);
        if (i != undefined) {
            this.nodes.set(i, reactionList);
        } else {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
    }

    /**
     * Add a Conditions.
     * @param conditions The Conditions.
     */
    addConditions(conditions: Conditions): void {
        let id = Conditions.tagName + conditions.id;
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.set(i, conditions);
        } else {
            this.index.set(id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        }
    }

    /**
     * @param conditionsID The id of the conditions.
     * @returns The conditions for the conditionsID.
     */
    getConditions(conditionsID: number): Conditions | undefined {
        let i: number | undefined = this.conditionsIndex.get(conditionsID);
        if (i != undefined) {
            return this.nodes.get(i) as Conditions;
        }
    }

    /**
     * @returns The conditions as a Conditions[].
     */
    getConditionss(): Conditions[] {
        let conditionss: Conditions[] = [];
        this.conditionsIndex.forEach((index, conditionsID) => {
            conditionss.push(this.nodes.get(index) as Conditions);
        });
        return conditionss;
    }

    /**
     * Set the conditions.
     * @param conditionss The Conditions[].
     */
    setConditionss(conditionss: Conditions[]) {
        conditionss.forEach(conditions => {
            this.addConditions(conditions);
        });
    }

    /**
     * @returns The next control id.
     */
    getNextConditionsID(): number {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.conditionsIndex.keys()).sort((a, b) => a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key) => {
            if (key > id) {
                return id;
            }
            id++;
        });
        return id;
    }

    /**
     * Remove a conditions.
     * @param conditionsID The id of the conditions to remove.
     */
    removeConditions(conditionsID: number) {
        let i: number | undefined = this.conditionsIndex.get(conditionsID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Conditions.tagName + conditionsID);
            this.conditionsIndex.delete(conditionsID);
        }
    }
    
    /**
     * Add a ModelParameters.
     * @param modelParameters The ModelParameters.
     */
    addModelParameters(modelParameters: ModelParameters) {
        let id = ModelParameters.tagName + modelParameters.id;
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.set(i, modelParameters);
        } else {
            this.index.set(id, this.nodes.size);
            this.modelParametersIndex.set(modelParameters.id, this.nodes.size);
            this.addNode(modelParameters);
        }
    }

    /**
     * @param modelParametersID The id of the modelParameters.
     * @returns The modelParameters for the modelParametersID.
     */
    getModelParameters(modelParametersID: number): ModelParameters | undefined {
        let i: number | undefined = this.modelParametersIndex.get(modelParametersID);
        if (i != undefined) {
            return this.nodes.get(i) as ModelParameters;
        }
    }

    /**
     * @returns The modelParameters as a ModelParameters[].
     */
    getModelParameterss(): ModelParameters[] {
        let modelParameterss: ModelParameters[] = [];
        this.modelParametersIndex.forEach((index, modelParametersID) => {
            modelParameterss.push(this.nodes.get(index) as ModelParameters);
        });
        return modelParameterss;
    }

    /**
     * Set the modelParameters.
     * @param modelParameterss The ModelParameters[].
     */
    setModelParameterss(modelParameterss: ModelParameters[]) {
        modelParameterss.forEach(modelParameters => {
            this.addModelParameters(modelParameters);
        });
    }

    /**
     * @returns The next modelParameters id.
     */
    getNextModelParametersID(): number {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.modelParametersIndex.keys()).sort((a, b) => a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key) => {
            if (key > id) {
                return id;
            }
            id++;
        });
        return id;
    }

    /**
     * Remove a modelParameters.
     * @param modelParametersID The id of the modelParameters to remove.
     */
    removeModelParameters(modelParametersID: number) {
        let i: number | undefined = this.modelParametersIndex.get(modelParametersID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ModelParameters.tagName + modelParametersID);
            this.modelParametersIndex.delete(modelParametersID);
        }
    }

    /**
     * Add a Control.
     * @param control The Control.
     */
    addControl(control: Control) {
        let id = Control.tagName + control.id;
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.set(i, control);
        } else {
            this.index.set(id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        }
    }

    /**
     * @returns The control.
     */
    getControl(controlID: number) {
        let i: number | undefined = this.controlIndex.get(controlID);
        if (i != undefined) {
            return this.nodes.get(i) as Control;
        }
    }

    /**
     * @returns The controls.
     */
    getControls(): Control[] {
        let controls: Control[] = [];
        this.controlIndex.forEach((index, controlID) => {
            controls.push(this.nodes.get(index) as Control);
        });
        return controls;
    }

    /**
     * Set the controls.
     * @param controls The controls.
     */
    setControls(controls: Control[]) {
        controls.forEach(control => {
            this.addControl(control);
        });
    }

    /**
     * @returns The next control id.
     */
    getNextControlID(): number {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.controlIndex.keys()).sort((a, b) => a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key) => {
            if (key > id) {
                return id;
            }
            id++;
        });
        return id;
    }

    /**
     * Remove a control.
     * @param controlID The id of the control to remove.
     */
    removeControl(controlID: number) {
        let i: number | undefined = this.controlIndex.get(controlID);
        //console.log("removeControl " + controlID + " " + i);
        //console.log("controlIndex " + arrayToString(Array.from(this.controlIndex.keys())));
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Control.tagName + controlID);
            this.controlIndex.delete(controlID);
        }
    }

    /**
     * @returns The metadata list.
     */
    getMetadataList(): MetadataList | undefined {
        let i: number | undefined = this.index.get(MetadataList.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as MetadataList;
        }
    }

    /**
     * @param metadataList The metadata list.
     */
    setMetadataList(metadataList: MetadataList) {
        let i: number | undefined = this.index.get(MetadataList.tagName);
        if (i != undefined) {
            this.nodes.set(i, metadataList);
        } else {
            this.index.set(MetadataList.tagName, this.nodes.size);
            this.addNode(metadataList);
        }
    }

    /**
     * @returns The analysis.
     */
    getAnalysis(): Analysis | undefined {
        let i: number | undefined = this.index.get(Analysis.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Analysis;
        }
    }

    /**
     * @param analysis The analysis.
     */
    setAnalysis(analysis: Analysis) {
        let i: number | undefined = this.index.get(Analysis.tagName);
        if (i != undefined) {
            this.nodes.set(i, analysis);
        } else {
            this.index.set(Analysis.tagName, this.nodes.size);
            this.addNode(analysis);
        }
    }
}

/**
 * In the XML, a "me:description" node is a child node of a "me:densityOfStatesList" node.
 */
export class Description extends StringNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:description";

    /**
     * @param attributes The attributes.
     * @param description The description.
     */
    constructor(attributes: Map<string, string>, description: string) {
        super(attributes, Description.tagName, description);
    }
}

/**
 * In the XML, a "me:T" node is a child node of a "me:densityOfStates" node. 
 */
export class T extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:T";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: Big) {
        super(attributes, T.tagName, value);
    }
}