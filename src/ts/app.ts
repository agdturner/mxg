
//import { openDB } from 'idb';

import {
    arrayToString, bigArrayToString, get, getID, isNumeric, mapToString, max, min, rescale, toNumberArray
} from './util.js';

import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getAttributes, getSingularElement,
    NumberArrayNode, NumberNode
} from './xml.js';

import {
    Molecule, Property, PropertyList, PropertyScalarString, PropertyScalarNumber, PropertyArray, PropertyMatrix,
    ZPE
} from './xml_molecule.js';

import {
    Reaction, TransitionState, ReactionMolecule, Reactant, Product, MCRCMethod, MesmerILT, PreExponential,
    ActivationEnergy, NInfinity, Tunneling, TInfinity, ExcessReactantConc, CanonicalRateList, Kinf, Val, Rev, Keq
} from './xml_reaction.js';

import { createMenu } from './gui_menu.js';

import {
    createLabelWithInput, getCollapsibleDiv, resizeInputElement, createSelectElement, resizeSelectElement,
    createFlexDiv, createButton, createLabel, createInput, createLabelWithSelect, createDiv,
    createLabelWithTextArea, resizeTextAreaElement, s_button, sy_upTriangle, sy_downTriangle, createTextArea,
    createTable, addTableRow, s_select
} from './html.js';

import { drawLevel, drawLine, getTextHeight, getTextWidth } from './canvas.js';

import {
    BathGas, Conditions, ExperimentalRate, ExperimentalEigenvalue, PTpair, PTs, ExperimentalYield
} from './xml_conditions.js';

import { EnergyAboveTheTopHill, GrainSize, MaxTemperature, ModelParameters } from './xml_modelParameters.js';

import {
    Control, DiagramEnergyOffset, Eigenvalues, HideInactive, TestDOS, PrintSpeciesProfile, TestMicroRates, TestRateConstant,
    PrintGrainDOS, PrintCellDOS, PrintReactionOperatorColumnSums, PrintTunnelingCoefficients, PrintGrainkfE,
    PrintGrainBoltzmann, PrintGrainkbE, CalculateRateCoefficientsOnly, PrintCellTransitionStateFlux, PrintTSsos,
    PrintGrainedSpeciesProfile, PrintGrainTransitionStateFlux, PrintReactionOperatorSize, PrintPhenomenologicalEvolution,
    PrintCrossingCoefficients, UseTheSameCellNumberForAllConditions, ForceMacroDetailedBalance, CalcMethod,
    ShortestTimeOfInterest, MaximumEvolutionTime, AutomaticallySetMaxEne, CalcMethodMarquardt, MarquardtIterations,
    MarquardtTolerance, MarquardtDerivDelta, CalcMethodAnalyticalRepresentation, Format, Precision, ChebNumTemp, ChebNumConc,
    ChebMaxTemp, ChebMinTemp, ChebMaxConc, ChebMinConc, ChebTExSize, ChebPExSize, CalcMethodThermodynamicTable,
    Tmin, Tmid, Tstep, Tmax, CalcMethodSimpleCalc, CalcMethodGridSearch, CalcMethodFitting, FittingIterations,
    CalcMethodSensitivityAnalysis, SensitivityAnalysisSamples, SensitivityAnalysisOrder, SensitivityNumVarRedIters,
    SensitivityVarRedMethod
} from './xml_control.js';

import { Mesmer, MoleculeList, ReactionList, Title, T, Description } from './xml_mesmer.js';
import Big from 'big.js';
import { Analysis, Eigenvalue, EigenvalueList, FirstOrderLoss, FirstOrderRate, Pop, Population, PopulationList, RateList } from './xml_analysis.js';
import { DCCreator, MetadataList, DCSource, DCDate, DCContributor, Metadata } from './xml_metadata.js';
import { Defaults } from './defaults.js';
import { getAddFromLibraryButton, getAddMoleculeButton, processMoleculeList } from './gui_moleculeList.js';
import { getAddReactionButton, processReactionList } from './gui_reactionList.js';
import { createAddConditionsButton, processConditions } from './gui_ConditionsList.js';
import { createAddModelParametersButton, processModelParameters } from './gui_ModelParametersList.js';
import { createAddControlButton, processControl } from './gui_ControlList.js';
import { createReactionDiagram, drawReactionDiagram } from './gui_reactionDiagram.js';
//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library

/**
 * Big.js.
 */
// Set the number toString() format for Big.js. The default is Big.PE = 21, so this change means that Big numbers
// with an order of magnitude of greater than 6 (e.g. 1000000) are presented as 1.0e+7.
Big.PE = 7;

/**
 * The filename of the MESMER XML file.
 */
let filename: string;

/**
 * fontSize is set to a relative measure so that component text is resizeable.
 */
let fontSize: string = "1.0em";

/**
 * Margins for spacing GUI components.
 */
let s_0px: string = "0px";
let s_1px: string = "1px";
let s_25px: string = "25px";
export let level0 = { marginLeft: s_0px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
export let level1 = { marginLeft: s_25px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
export let boundary1 = { marginLeft: s_1px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_1px };

/**
 * Symbology for the GUI.
 */
// Symbols.
export const sy_add: string = "\uFF0B"; // ＋
export const sy_edit: string = "\u270E"; // ✎
export const sy_deselected: string = " \u2717"; // ✗
//const sy_refresh: string = "\u27F3"; // ⟳
const sy_remove: string = "\u2715"; // ✕
export const sy_selected: string = " \u2713"; // ✓

// Strings.
export const s_Add_sy_add: string = "Add " + sy_add;
export const s_Add_from_library: string = "Add from library " + sy_add;
export const s_Add_from_spreadsheet: string = "Add from spreadsheet " + sy_add;
const s_analysis: string = "analysis";
const s_conditions: string = "conditions";
export const s_container: string = "container";
const s_control: string = "control";
export const s_description: string = "description";
const s_graph: string = "graph";
const s_menu: string = "menu";
const s_metadata: string = "metadata";
const s_modelParameters: string = "modelParameters";
export const s_molecules: string = "molecules";
export const s_input: string = "input";
export const s_optionOn = 'optionOn';
export const s_optionOff = 'optionOff';
export const s_reactions: string = "reactions";
const s_reactionsDiagram: string = "reactionsDiagram";
export const s_Remove_sy_remove: string = "Remove " + sy_remove;
export const s_save: string = "save";
//const s_select: string = "select";
export const s_selectOption: string = "Select an option (use keys to cycle through options)...";
export const s_table: string = "table";
const s_title: string = "title";
const s_textarea: string = "textarea";
export const s_undefined: string = "undefined";
export const s_units: string = "units";
const s_xml: string = "xml";
export const s_viewer: string = "viewer";
const s_welcome: string = "welcome";

/**
 * allIDs is a set of all IDs used in the GUI.
 * This is used to ensure that all IDs are unique.
 * If an ID is not unique, an error is thrown.
 */
const allIDs: Set<string> = new Set<string>();

/**
 * A set of all IDs to be removed when loading a MESMER file.
 */
const rIDs: Set<string> = new Set<string>();

/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */
export function addID(...parts: (string | number)[]): string {
    let validID: string = getID(...parts);
    if (allIDs.has(validID)) {
        throw new Error(validID + " already exists!");
    }
    allIDs.add(validID);
    //console.log("addID: \"" + validID + "\"");
    return validID;
}

/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */
export function addRID(...parts: (string | number)[]): string {
    let validID: string = addID(...parts);
    rIDs.add(validID);
    return validID;
}

/**
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 */
export function remove(id: string) {
    let e: HTMLElement | null = document.getElementById(id);
    if (e != null) {
        e.remove();
    }
    rIDs.delete(id);
    allIDs.delete(id);
}

// index.html IDs
export const menuDivID: string = addID(s_menu);
const titleDivID: string = addID(s_title);
const moleculesDivID: string = addID(s_molecules);
const reactionsDivID: string = addID(s_reactions);
const reactionsDiagramDivID: string = addID(s_reactionsDiagram);
const conditionsDivID: string = addID(s_conditions);
const modelParametersDivID: string = addID(s_modelParameters);
const controlDivID: string = addID(s_control);
const metadataListDivID: string = addID(s_metadata);
const analysisDivID: string = addID(s_analysis);
const xmlDivID: string = addID(s_xml);
//const welcomeDivID: string = addID(s_welcome);

// For dark/light mode.
let dark: boolean;

// Numbers
export const big0: Big = new Big(0);

/*
const db = await openDB('my-db', 1, {
    upgrade(db) {
        db.createObjectStore('keyval');
    },
});

let darkModePreference = await db.get('keyval', 'darkMode');
dark = (darkModePreference === 'true');
console.log("dark=" + dark);
*/

/**
 * For ID management.
 */
export class IDManager {

    /**
     * A map of IDs with the key ID as the key and a set of IDs as the value.
     */
    private ids: Map<string, Set<string>> = new Map();

    /**
     * Adds an ID to the map.
     * @param iD The key ID.
     * @param parts The parts of the ID to be created.
     * @returns The ID created.
     */
    addID(iD: string, ...parts: (string | number)[]): string {
        let id: string = addRID(iD, ...parts);
        if (!this.ids.has(iD)) {
            this.ids.set(iD, new Set());
        }
        this.ids.get(iD)?.add(id);
        return id;
    }

    /**
     * Remove the IDs to the map.
     * @param iD The key ID.
     * @param parts The parts of the ID to be created.
     * @returns The ID created.
     */
    private removeID(iD: string): void {
        rIDs.delete(iD);
        allIDs.delete(iD);
    }

    /**
     * Removes the IDs.
     * @param iD The ID key for the IDs to remove.
     */
    removeIDs(iD: string): void {
        if (!this.ids.has(iD)) {
            return;
        }
        this.ids.get(iD)!.forEach(id => {
            console.log("remove id " + id);
            this.removeID(id);
        });
        this.ids.delete(iD);
    }

    /**
     * Remove all IDs.
     */
    removeAllIDs(): void {
        this.ids.forEach((value, key) => {
            this.removeIDs(key);
        }); 
    }
}

/**
 * For moleculeList Div ID management.
 */
let mIDM: IDManager = new IDManager();

/**
 * For reactionList Div ID management.
 */
let rIDM: IDManager = new IDManager();

/**
 * For conditionsList Div ID management.
 */
let conditionsIDM: IDManager = new IDManager();

/**
 * For ModelParametersList Div ID management.
 */
let mpIDM: IDManager = new IDManager();

/**
 * For ControlList Div ID management.
 */
let controlIDM: IDManager = new IDManager();

/**
 * For mesmer.
 */
export let mesmer: Mesmer;

/**
 * For the defaults loaded from defaults.xml.
 */
export let defaults: Defaults = new Defaults();

/**
 * For storing molecules loaded from files.
 */
export let libmols: Map<string, Molecule> = new Map();

/**
 * Adds a molecule to the map of molecules.
 * The molecule label is updated if the molecule attribute id is not unique. 
 * @param m The molecule to add
 * @param ms The map of molecules to add the molecule to.
 */
export function addMolecule(m: Molecule, ms: Map<string, Molecule>): void {
    let id: string = m.getID();
    let n: number = 1;
    while (ms.has(m.id)) {
        m.id = m.id + n;
        n++;
    }
    ms.set(m.id, m);
}

/**
 * A map of molecules with id as key and Molecule as value.
 * The key is a composite of the molecule ID and the index.
 */
let molecules: Map<string, Molecule> = new Map();

/**
 * Get the keys of the molecules. The keys are a composite of the molecule ID and the index.
 * @returns The keys of the molecules.
 */
export function getMoleculeKeys(molecules: Map<string, Molecule>): Set<string> {
    let keys: Set<string> = new Set();
    molecules.forEach((v, k) => {
        let id = v.getID();
        if (keys.has(id)) {
            keys.add(id + "-" + k.toString());
        } else {
            keys.add(id);
        }
    });
    return keys;
}

/**
 * This returns the molecule found with the given label from ms.
 * @param label The label of the molecule to find.
 * @param ms The map of molecules to search.
 * @returns The molecule with the lable in ms.
 */
export function getMolecule(label: string, ms: Map<string, Molecule>): Molecule | null {
    for (let [key, value] of ms) {
        if (value.label == label) {
            return value;
        }
    }
    return null;
}

/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */
let reactions: Map<string, Reaction> = new Map();

/**
 * For storing any scatter plots.
 */
let scatterPlots: ScatterPlot[];

/**
 * Reaction Diagram variables.
 */
// IDs.
export const s_Reactions_Diagram: string = "Reactions Diagram";
const rdDivID: string = addRID(s_Reactions_Diagram);
const rdcID: string = addRID(rdDivID, "Canvas");
//let rd_canvas_width: number = 800;
let rdcHeight: number = 400;
let rd_lw: number = 4; // Line width of reactants, transition states and products.
let rd_lwc: number = 2; // Line width of connectors.
let rd_font: string = "1em SensSerif";
let rdWindow: Window | null;

// Scatterplot font.
let sp_font: string = "2em SensSerif";

/**
 * Once the DOM is loaded, add the menu and collapsed buttons for content
 */
document.addEventListener('DOMContentLoaded', () => {

    // Update the page styles based on the user's preference.
    document.body.className = dark ? 'dark-mode' : 'light-mode';

    /* It is not allowed to use localStorage with a Service Worker!
    let darkModePreference = localStorage.getItem('darkMode');
    dark = (darkModePreference === 'true');
    console.log("dark=" + dark);
    */

    // Initialise mesmer.
    let mesmerAttributes: Map<string, string> = new Map();
    mesmerAttributes.set("xmlns", "http://www.xml-cml.org/schema");
    mesmerAttributes.set("xmlns:me", "http://www.chem.leeds.ac.uk/mesmer");
    mesmerAttributes.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    mesmer = new Mesmer(mesmerAttributes);

    // Create the menu.
    createMenu();

    // Title.
    let title: string = "Example_title";
    let attributes: Map<string, string> = new Map<string, string>();
    createTitle(title, attributes);

    // Molecules.
    let moleculesDiv: HTMLDivElement = document.getElementById(moleculesDivID) as HTMLDivElement;
    let mlDivID = addRID(MoleculeList.tagName);
    let mlDiv: HTMLDivElement = createDiv(mlDivID);
    moleculesDiv.appendChild(mlDiv);
    // Create collapsible content.
    let mlcDiv: HTMLDivElement = getCollapsibleDiv(mlDivID, moleculesDiv, null, mlDiv,
        MoleculeList.tagName, boundary1, level0);
    // Add add molecule button.
    let mb: HTMLButtonElement = getAddMoleculeButton(mlDiv, mIDM, molecules);
    // Add add from library button.
    let lb: HTMLButtonElement = getAddFromLibraryButton(mlDiv, mb, mIDM, molecules);

    // Reactions.
    let reactionsDiv: HTMLDivElement = document.getElementById(reactionsDivID) as HTMLDivElement;
    let rlDivID: string = addRID(ReactionList.tagName);
    let rlDiv: HTMLDivElement = createDiv(rlDivID);
    reactionsDiv.appendChild(rlDiv);
    // Create collapsible content.
    let rlcDiv: HTMLDivElement = getCollapsibleDiv(rlDivID, reactionsDiv, null, rlDiv,
        ReactionList.tagName, boundary1, level0);
    // Add add reaction button.
    let rb: HTMLButtonElement = getAddReactionButton(rlDiv, reactions, molecules);

    // Reactions Diagram.
    let rddDiv: HTMLDivElement = document.getElementById(reactionsDiagramDivID) as HTMLDivElement;
    let rdDiv: HTMLDivElement = createDiv(undefined, level1);
    rddDiv.appendChild(rdDiv);
    // Create collapsible content.
    let rdcDiv: HTMLDivElement = getCollapsibleDiv(rdDivID, rddDiv, null, rdDiv,
        s_Reactions_Diagram, boundary1, level0);
    createReactionDiagram(rdDiv, rdcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, false);

    // Conditions.
    let conditionsDiv: HTMLDivElement = document.getElementById(conditionsDivID) as HTMLDivElement;
    let cdlDivID: string = addRID(Conditions.tagName);
    let cdlDiv: HTMLDivElement = createDiv(cdlDivID);
    conditionsDiv.appendChild(cdlDiv);
    // Create a div for the conditionss.
    let conditionssDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Create an add button to add a conditions.
    createAddConditionsButton(conditionssDiv, conditionsIDM, molecules);
    // Create collapsible content.
    let cdlcDiv: HTMLDivElement = getCollapsibleDiv(cdlDivID, cdlDiv, null, conditionssDiv,
        "ConditionsList", boundary1, level0);

    // Model Parameters.
    let modelParametersDiv: HTMLDivElement = document.getElementById(modelParametersDivID) as HTMLDivElement;
    let mplDivID: string = addRID(ModelParameters.tagName, "list");
    let mplDiv: HTMLDivElement = createDiv(mplDivID);
    modelParametersDiv.appendChild(mplDiv);
    // Create a div for the model parameterss.
    let modelParameterssDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Create an add button to add a model parameters.
    createAddModelParametersButton(modelParameterssDiv, mpIDM);
    // Create collapsible content.
    let mplcDiv: HTMLDivElement = getCollapsibleDiv(mplDivID, mplDiv, null, modelParameterssDiv,
        "ModelParametersList", boundary1, level0);

    // Control.
    let controlDiv: HTMLDivElement = document.getElementById(controlDivID) as HTMLDivElement;
    let clDivID: string = addRID(Control.tagName);
    let clDiv: HTMLDivElement = createDiv(clDivID);
    controlDiv.appendChild(clDiv);
    // Create a div for the controls.
    let controlsDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Create an add button to add a control.
    createAddControlButton(controlsDiv, controlIDM);
    // Create collapsible content.
    let controlcDiv: HTMLDivElement = getCollapsibleDiv(clDivID, clDiv, null, controlsDiv,
        "ControlList", boundary1, level0);

    /*
    // MetadataList.
    let metadataListDiv: HTMLDivElement = document.getElementById(metadataListDivID) as HTMLDivElement;
    let mdDivID: string = addRID(MetadataList.tagName);
    let mdDiv: HTMLDivElement = createDiv(mdDivID);
    metadataListDiv.appendChild(mdDiv);
    // Create collapsible content.
    let mdcDiv: HTMLDivElement = getCollapsibleDiv(mdDivID, metadataListDiv, null, mdDiv,
        MetadataList.tagName, boundary1, level0);

    // Analysis.
    let analysisDiv: HTMLDivElement = document.getElementById(analysisDivID) as HTMLDivElement;
    let aDivID: string = addRID(Analysis.tagName);
    let aDiv: HTMLDivElement = createDiv(aDivID);
    analysisDiv.appendChild(aDiv);
    // Create collapsible content.
    let acDiv: HTMLDivElement = getCollapsibleDiv(aDivID, analysisDiv, null, aDiv,
        Analysis.tagName, boundary1, level0);

    // XML.
    let xmlDiv: HTMLDivElement = document.getElementById(xmlDivID) as HTMLDivElement;
    let xDivID: string = addRID(s_xml, 2);
    let xDiv: HTMLDivElement = createDiv(xDivID);
    xmlDiv.appendChild(xDiv);
    // Create collapsible content.
    let xcDiv: HTMLDivElement = getCollapsibleDiv(xDivID, xmlDiv, null, xDiv,
        s_xml, boundary1, level0);
    */
});

/**
 * Create the title input.
 */
function createTitle(title: string, attributes: Map<string, string>) {
    let titleNode: Title = new Title(attributes, title);
    mesmer.setTitle(titleNode);
    let titleDiv: HTMLDivElement = document.getElementById(titleDivID) as HTMLDivElement;
    let lwiId: string = addRID('titleDiv');
    // Remove any existing lwiId HTMLDivElement.
    remove(lwiId);
    // Create input element.
    let lwi: HTMLDivElement = createLabelWithInput("text", addRID(lwiId, s_input), boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            resizeInputElement(target);
        }, title, Title.tagName);
    lwi.id = lwiId;
    titleDiv.appendChild(lwi);
}

/**
 * Redraw the reactions diagram.
 */
function redrawReactionsDiagram() {
    if (rdWindow == null) {
        let rdCanvas: HTMLCanvasElement = document.getElementById(rdcID) as HTMLCanvasElement;
        drawReactionDiagram(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    } else {
        let c: HTMLCanvasElement = rdWindow.document.getElementById(rdcID) as HTMLCanvasElement;
        drawReactionDiagram(c, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    }
}

/**
 * Redraw any scatterplots.
 */
function redrawScatterPlots(): void {
    scatterPlots.forEach((scatterPlot) => {
        scatterPlot.draw(sp_font);
    });
}

/**
 * Prompts the user for a MESMER XML file, and initiates the parsing of the chosen file.
 */
export function load() {
    // Before loading a new file, remove any existing content and initialise any data containers.
    rIDs.forEach((id) => {
        remove(id);
    });
    if (molecules != null) {
        molecules.clear();
    }
    if (reactions != null) {
        reactions.clear();
    }
    scatterPlots = [];
    // Create a file input element to prompt the user to select a file.
    let input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.onchange = function () {
        if (input.files) {
            for (let i = 0; i < input.files.length; i++) {
                console.log("inputElement.files[" + i + "]=" + input.files[i]);
            }
            let file: File | null = input.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            filename = file.name;
            let reader = new FileReader();
            let chunkSize = 1024 * 1024; // 1MB
            let start = 0;
            let contents = '';
            reader.onload = function (e) {
                if (e.target == null) {
                    throw new Error('Event target is null');
                }
                contents += (e.target as FileReader).result as string;
                if (file != null) {
                    if (start < file.size) {
                        // Read the next chunk
                        let blob = file.slice(start, start + chunkSize);
                        reader.readAsText(blob);
                        start += chunkSize;
                    } else {
                        // All chunks have been read
                        contents = contents.trim();
                        displayXML(filename, contents);
                        let parser = new DOMParser();
                        let xml = parser.parseFromString(contents, "text/xml");
                        parse(xml);
                    }
                }
            };
            // Read the first chunk
            let blob = file.slice(start, start + chunkSize);
            reader.readAsText(blob);
            start += chunkSize;
        }
    };
    input.click();
}

/**
 * Parse an XMLDocument and create the mesmer object.
 * @param xml The XML.
 */
function parse(xml: XMLDocument) {
    console.log("parse: " + xml);

    // Process the XML.
    let xml_mesmer: Element = getSingularElement(xml, Mesmer.tagName);
    mesmer = new Mesmer(getAttributes(xml_mesmer));

    // Title.
    let xml_title: HTMLCollectionOf<Element> = xml.getElementsByTagName(Title.tagName) as HTMLCollectionOf<Element>;
    let title: string;
    let attributes: Map<string, string>;
    if (xml_title.length > 0) {
        if (xml_title.length > 1) {
            console.warn('Multiple ' + Title.tagName + ' tags found, using the first.');
        }
        title = (xml_title[0].childNodes[0].nodeValue as string).trim();
        attributes = getAttributes(xml_title[0]);
    } else {
        title = filename
        console.warn('No ' + Title.tagName + ' tag found, using the filename: ' + filename + ' as the title.');
        attributes = new Map<string, string>();
    }
    createTitle(title, attributes);

    // Molecules.
    let mlDiv: HTMLDivElement = document.getElementById(moleculesDivID) as HTMLDivElement;
    let mlDivID = addRID(MoleculeList.tagName);
    // Remove any existing mlDivID HTMLDivElement.
    remove(mlDivID);
    // Create collapsible content.
    let mlcDiv: HTMLDivElement = getCollapsibleDiv(mlDivID, mlDiv, null, processMoleculeList(xml, mIDM, molecules),
        MoleculeList.tagName, boundary1, level0);
    //document.body.appendChild(mlcDiv);

    // Reactions.
    let rlDiv: HTMLDivElement = document.getElementById(reactionsDivID) as HTMLDivElement;
    let rlDivID: string = addRID(ReactionList.tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID);
    // Create collapsible content.
    let rlcDiv: HTMLDivElement = getCollapsibleDiv(rlDivID, rlDiv, null, processReactionList(xml, reactions, molecules),
        ReactionList.tagName, boundary1, level0);

    // Reactions Diagram.
    let rddDiv: HTMLDivElement = document.getElementById(reactionsDiagramDivID) as HTMLDivElement;
    let rdDivID: string = addRID(s_Reactions_Diagram);
    // Destroy any existing rdWindow.
    if (rdWindow != null) {
        rdWindow.close();
        rdWindow = null;
    }
    // If rdDiv already exists, remove it.
    remove(rdDivID);
    // Create collapsible content.
    let rdDiv: HTMLDivElement = createDiv(undefined, level1);
    let rdcDiv: HTMLDivElement = getCollapsibleDiv(rdDivID, rddDiv, null, rdDiv,
        s_Reactions_Diagram, boundary1, level0);
    createReactionDiagram(rdDiv, rdcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, true);

    // Conditions.
    let cdlDiv: HTMLDivElement = document.getElementById(conditionsDivID) as HTMLDivElement;
    let cdlDivID: string = addRID(Conditions.tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    remove(cdlDivID);
    // Create collapsible content.
    let cdlcDiv: HTMLDivElement = getCollapsibleDiv(cdlDivID, cdlDiv, null, processConditions(xml, conditionsIDM, molecules),
        "ConditionsList", boundary1, level0);

    // Model Parameters.
    let mplDiv: HTMLDivElement = document.getElementById(modelParametersDivID) as HTMLDivElement;
    let mplDivID: string = addRID(ModelParameters.tagName, "list");
    // Remove any existing mpDivID HTMLDivElement.
    remove(mplDivID);
    // Create collapsible content.
    let mplcDiv: HTMLDivElement = getCollapsibleDiv(mplDivID, mplDiv, null, processModelParameters(xml, mpIDM),
        "ModelParametersList", boundary1, level0);

    // Control.
    let clDiv: HTMLDivElement = document.getElementById(controlDivID) as HTMLDivElement;
    let clDivID: string = addRID(Control.tagName);
    // Remove any existing clDivID HTMLDivElement.
    remove(clDivID);
    // Create collapsible content.
    let controlcDiv: HTMLDivElement = getCollapsibleDiv(clDivID, clDiv, null, processControl(xml, controlIDM),
        "ControlList", boundary1, level0);

    // MetadataList.
    // Check if xml contains metadata.
    if (xml.getElementsByTagName(MetadataList.tagName).length > 0) {
        let mdDiv: HTMLDivElement = document.getElementById(metadataListDivID) as HTMLDivElement;
        let mdDivID: string = addRID(MetadataList.tagName);
        // Remove any existing mdDivID HTMLDivElement.
        remove(mdDivID);
        // Create collapsible content.
        let mdcDiv: HTMLDivElement = getCollapsibleDiv(mdDivID, mdDiv, null, processMetadataList(xml),
            MetadataList.tagName, boundary1, level0);
    }

    // Analysis.
    // Check if xml contains analysis.
    if (xml.getElementsByTagName(Analysis.tagName).length > 0) {
        let aDiv: HTMLDivElement = document.getElementById(analysisDivID) as HTMLDivElement;
        let aDivID: string = addRID(Analysis.tagName);
        // Remove any existing aDivID HTMLDivElement.
        remove(aDivID);
        // Create collapsible content.
        let acDiv: HTMLDivElement = getCollapsibleDiv(aDivID, aDiv, null, processAnalysis(xml),
            Analysis.tagName, boundary1, level0);
    }
}

/**
 * @param className The className of Elements to update
 * @param optionToRemove The option value to remove.
 */
export function removeOptionByClassName(className: string, optionToRemove: string): void {
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] instanceof HTMLSelectElement) {
            let options: HTMLOptionsCollection = (elements[i] as HTMLSelectElement).options;
            let selectValue: string = (elements[i] as HTMLSelectElement).value;
            Array.from(options).forEach((option) => {
                if (option.value == optionToRemove) {
                    option.remove();
                    if (selectValue == optionToRemove) {
                        // Create a new event
                        let event = new Event('change');
                        // Dispatch the event
                        (elements[i] as HTMLSelectElement).dispatchEvent(event);
                    }
                }
            });
        }
    }
}

/**
 * @param className The className of Elements to update
 * @param optionToAdd  The option value to add.
 */
export function addOptionByClassName(className: string, optionToAdd: string): void {
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    console.log("n elements with className " + className + "=" + elements.length);
    for (let i = 0; i < elements.length; i++) {
        let select: HTMLSelectElement = elements[i] as HTMLSelectElement;
        if (elements[i] instanceof HTMLSelectElement) {
            let option: HTMLOptionElement = document.createElement('option');
            option.value = optionToAdd;
            option.text = optionToAdd;
            select.add(option);
        }
    }
}

/**
 * Add a Property.
 * @param dictRef The dictRef.
 * @param ps The PropertyScalar.
 * @param id The id.
 * @param boundary The boundary.
 * @param level The level. 
 * @returns A div element.
 */
export function addProperty(dictRef: string, ps: PropertyScalarNumber, id: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let pDiv: HTMLDivElement = createFlexDiv(id, level);
    pDiv.appendChild(createLabel(dictRef, boundary));
    // value.
    let value: Big = ps.getValue();
    //let value: string = ps.value;
    let valueInputId: string = addRID(id, s_input);
    let valueInput: HTMLInputElement = createInput("text", valueInputId, boundary);
    pDiv.appendChild(valueInput);
    valueInput.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        ps.setValue(new Big(target.value));
        //ps.value = target.value;
        resizeInputElement(target);
    });
    valueInput.value = value.toString();
    resizeInputElement(valueInput);
    return pDiv;
}

/**
 * Add a PropertyScalarNumber.
 * @param attributes The attributes.
 * @param iDs The set of IDs to add to.
 * @param value The value.
 * @param units The units.
 * @param pl The PropertyList.
 * @param p The Property.
 * @param plDiv The PropertyList div.
 * @param boundary The boundary.
 */
export function addPropertyScalarNumber(attributes: Map<string, string>, iDs: Set<string>, value: Big,
    units: string[] | undefined, pl: PropertyList, p: Property, plDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
    ps.setValue = function (value: Big) {
        ps.value = value;
        if (p.dictRef == ZPE.dictRef) {
            // Update the molecule energy diagram.
            redrawReactionsDiagram();
        }
    }.bind(ps);
    ps.value = value;
    if (p.dictRef == ZPE.dictRef) {
        // Update the molecule energy diagram.
        redrawReactionsDiagram();
    }
    let id: string = addRID(plDiv.id, p.dictRef);
    console.log("div ID " + id);
    let div: HTMLDivElement = processNumber(id, iDs, p.dictRef, ps.getValue.bind(ps), ps.setValue,
        () => pl.removeProperty(p.dictRef), boundary1, level1);
    console.log("unitsID " + addRID(id, PropertyScalarNumber.s_units));
    addAnyUnits(units, attributes, div, div.querySelector(s_input) as HTMLElement, getID(id, PropertyScalarNumber.s_units), p.dictRef, boundary, boundary);
    plDiv.appendChild(div);
}

/**
 * For adding or removing s_selectOption.
 * @param options The options.
 * @param add If true then a new option is added with an instruction to select another option.
 * If false then this option is removed if it is present.
 */
export function addOrRemoveInstructions(options: string[], add: boolean): void {
    if (add) {
        options.push(s_selectOption);
    } else {
        // remove selectOption if present.
        let index = options.indexOf(s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
}

/**
 * Process a numerical variable.
 * @param id The id.
 * @param iDs The set of IDs to add to.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */
export function processNumber(id: string, iDs: Set<string>, name: string,
    getter: () => Big | undefined, setter: (value: Big) => void, remover: () => void,
    marginComponent: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(id, margin);
    let buttonTextContentSelected: string = name + sy_selected;
    let buttonTextContentDeselected: string = name + sy_deselected;
    let idb = addRID(id, s_button);
    iDs.add(idb);
    let button = createButton(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId: string = addRID(id, name, s_input)
    iDs.add(inputId);
    let value: Big | undefined = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addNumber(div, inputId, name, value, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(inputId) == null) {
            addNumber(div, inputId, name, value, getter, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // 
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
    return div;
}

/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 * @param level The level.
 */
function addNumber(div: HTMLDivElement, id: string, name: string, value: Big | undefined,
    getter: () => Big | undefined, setter: (value: Big) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string;
    if (value == undefined) {
        valueString = "";
    } else {
        valueString = value.toString();
    }
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input: HTMLInputElement = createInput("text", id, boundary);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        try {
            setter(new Big(target.value));
            console.log(name + " changed from " + value + " to " + target.value);
        } catch (e) {
            alert("Input invalid, resetting...");
            target.value = getter()!.toString();
        }
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * Process a numerical variable.
 * @param div The div.
 * @param id The id.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */
function processNumberArray(id: string, name: string, pa: PropertyArray,
    getter: () => Big[] | undefined, setter: (values: Big[]) => void, remover: () => void,
    marginComponent: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, margin);
    let buttonTextContentSelected: string = name + sy_selected;
    let buttonTextContentDeselected: string = name + sy_deselected;
    let button = createButton(buttonTextContentDeselected, addRID(id, s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId: string = addRID(id, name, s_input)
    let value: Big[] | undefined = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addNumberArray(div, inputId, name, value, pa, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(inputId) == null) {
            addNumberArray(div, inputId, name, value, pa, getter, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
    return div;
}

/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 * @param level The level.
 */
function addNumberArray(div: HTMLDivElement, id: string, name: string, values: Big[] | undefined,
    pa: PropertyArray, getter: () => Big[] | undefined, setter: (value: Big[]) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string;
    if (values == undefined) {
        valueString = "";
    } else {
        valueString = bigArrayToString(values);
    }
    let ta: HTMLTextAreaElement = createTextArea(id, boundary);
    ta.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLTextAreaElement;
        setNumberArrayNode(pa, ta)
        resizeTextAreaElement(target);
    });
    ta.value = valueString;
    resizeTextAreaElement(ta);
    div.appendChild(ta);
}

/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */
export function addRemoveButton(div: HTMLDivElement,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    removeFunction: (...args: any[]) => void, ...args: any[]): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Remove_sy_remove, undefined, margin);
    div.appendChild(button);
    button.addEventListener('click', () => {
        removeFunction(...args);
        div.remove();
        remove(div.id);
    });
    return button;
}

/**
 * Process a numerical variable.
 * @param id The id.
 * @param iDs The set of IDs to add to.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */
function processString(id: string, iDs: Set<string>, name: string,
    getter: () => string | undefined, setter: (value: string) => void, remover: () => void,
    marginComponent: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(id, margin);
    let buttonTextContentSelected: string = name + sy_selected;
    let buttonTextContentDeselected: string = name + sy_deselected;
    let idb = addRID(id, s_button);
    iDs.add(idb);
    let button = createButton(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId: string = addRID(id, name, s_input)
    iDs.add(inputId);
    let value: string | undefined = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addString(div, inputId, name, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(inputId) == null) {
            addString(div, inputId, name, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // 
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
    return div;
}

/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 * @param level The level.
 */
function addString(div: HTMLDivElement, id: string, name: string, value: string | undefined,
    setter: (value: string) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string;
    if (value == undefined) {
        valueString = "";
    } else {
        valueString = value.toString();
    }
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input: HTMLInputElement = createInput("text", id, boundary);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setter(target.value);
        console.log(name + " changed from " + value + " to " + target.value);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xmlFilename: string, xml: string) {
    let xmlDiv: HTMLDivElement = document.getElementById(xmlDivID) as HTMLDivElement;
    let xml2DivID = addRID(xmlDivID, 2);
    // Remove any existing mlDivID HTMLDivElement.
    remove(xml2DivID);
    // Create collapsible content.
    let xml2Div: HTMLDivElement = createDiv(xml2DivID, level1);
    let xmlcDiv: HTMLDivElement = getCollapsibleDiv(xml2DivID, xmlDiv, null, xml2Div,
        xmlFilename, boundary1, level0);
    let xmlPre: HTMLPreElement = document.createElement("pre");
    xmlPre.textContent = xml;
    xml2Div.appendChild(xmlPre);
}

/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param plDiv The PropertyList div.
 * @param textArea If true, a text area is created rather than an input.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */
export function processPropertyScalarNumber(pl: PropertyList, p: Property, units: string[] | undefined, molecule: Molecule, element: Element,
    plDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {

    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs: Set<string> = new Set<string>();

    // PropertyScalar.
    let scalarNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyScalarNumber.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + PropertyScalarNumber.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString: string = getInputString(scalarNodes[0]);
        let value: Big = new Big(inputString);
        let psAttributes: Map<string, string> = getAttributes(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps: PropertyScalarNumber = new PropertyScalarNumber(psAttributes, value);
        p.setProperty(ps);
        ps.setValue = function (value: Big) {
            ps.value = value;
            if (p.dictRef == ZPE.dictRef) {
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        }.bind(ps);
        let div: HTMLDivElement = processNumber(addRID(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue,
            () => pl.removeProperty(p.dictRef), boundary1, level1);
        addAnyUnits(units, psAttributes, div, div.querySelector(s_input) as HTMLElement, addRID(plDiv.id, p.dictRef, PropertyScalarNumber.s_units), p.dictRef, boundary, boundary);
        plDiv.appendChild(div);
    } else {
        // PropertyArray.
        let arrayNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString: string = getInputString(arrayNodes[0]);
            if (inputString != "") {
                let values: Big[] | undefined = toNumberArray(inputString.split(/\s+/));
                let paAttributes: Map<string, string> = getAttributes(arrayNodes[0]);
                let pa: PropertyArray = new PropertyArray(paAttributes, values);
                p.setProperty(pa);
                let div: HTMLDivElement = processNumberArray(addRID(plDiv.id, p.dictRef), p.dictRef, pa, pa.getValues.bind(pa), pa.setValues,
                    () => pl.removeProperty(p.dictRef), boundary1, level1);
                addAnyUnits(units, paAttributes, div, div.querySelector(s_textarea) as HTMLElement, addRID(plDiv.id, p.dictRef, PropertyArray.s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(div);
            }
        } else {
            // PropertyMatrix.
            let matrixNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyMatrix.tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) {
                    throw new Error("Expecting 1 " + PropertyMatrix.tagName + " but finding " + matrixNodes.length + "!");
                }
                let inputString: string = getInputString(matrixNodes[0]);
                let values: Big[] = toNumberArray(inputString.split(/\s+/));
                let pmAttributes: Map<string, string> = getAttributes(matrixNodes[0]);
                let pm: PropertyMatrix = new PropertyMatrix(pmAttributes, values);
                p.setProperty(pm);
                let label: string = p.dictRef;
                // Create a new div element for the input.
                let inputDiv: HTMLDivElement = createLabelWithTextArea(addRID(plDiv.id, p.dictRef),
                    boundary, level, (event: Event) => {
                        let target = event.target as HTMLTextAreaElement;
                        setNumberArrayNode(pm, target);
                    }, inputString, label);
                let ta: HTMLTextAreaElement = inputDiv.querySelector('textarea') as HTMLTextAreaElement;
                ta.value = inputString;
                resizeTextAreaElement(ta);
                ta.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLTextAreaElement;
                    inputString = target.value;
                    pm = p.getProperty() as PropertyMatrix;
                    values = toNumberArray(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + inputString);
                    //resizeInputElement(inputElement);
                    resizeTextAreaElement(ta);
                });
                addAnyUnits(units, pmAttributes, inputDiv, ta, addRID(plDiv.id, p.dictRef, s_select, "Units"), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            } else {
                throw new Error("Expecting " + PropertyScalarNumber.tagName + ", " + PropertyArray.tagName + " or "
                    + PropertyMatrix.tagName + " but finding none!");
            }
        }
    }
}

/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param plDiv The PropertyList div.
 * @param textArea If true, a text area is created rather than an input.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */
export function processPropertyScalarString(pl: PropertyList, p: Property, molecule: Molecule, element: Element,
    plDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {

    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs: Set<string> = new Set<string>();

    // PropertyScalarString.
    let scalarNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyScalarString.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + PropertyScalarString.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString: string = getInputString(scalarNodes[0]);
        let psAttributes: Map<string, string> = getAttributes(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps: PropertyScalarString = new PropertyScalarString(psAttributes, inputString);
        p.setProperty(ps);
        ps.setValue = function (value: string) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + value);
            if (p.dictRef == ZPE.dictRef) {
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        }.bind(ps);
        let div: HTMLDivElement = processString(addRID(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue,
            () => pl.removeProperty(p.dictRef), boundary1, level1);
        plDiv.appendChild(div);
    } else {
        console.log("Expecting " + PropertyScalarString.tagName + " but finding none!");
    }
}

/**
 * If there is a choice of units, then a HTMLDivElement is appended containing an HTMLLabelElement and a HTMLSelectElement.
 * If there is no choice of units, a HTMLLabelElement is appended.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param divToAddTo The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @param boundary The boundary.
 * @param level The level.
 */
export function addAnyUnits(units: string[] | undefined, attributes: Map<string, string>, divToAddTo: HTMLDivElement,
    elementToInsertBefore: HTMLElement | null, id: string, tagOrDictRef: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    if (units != undefined) {
        let lws: HTMLDivElement | undefined = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level);
        if (lws != undefined) {
            divToAddTo.insertBefore(lws, elementToInsertBefore);
        }
    } else {
        let attributesUnits: string | undefined = attributes.get("units");
        if (attributesUnits != undefined) {
            let label: HTMLLabelElement = createLabel("units " + attributesUnits, level);
            divToAddTo.insertBefore(label, elementToInsertBefore);
        }
    }
}

/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */
function getUnitsLabelWithSelect(units: string[], attributes: Map<string, string>, id: string, tagOrDictRef: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement | undefined {
    let psUnits: string | undefined = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws: HTMLDivElement = createLabelWithSelect("units", units, "units", psUnits, id, boundary, level);
        let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
        // Set the initial value to the units.
        select.value = psUnits;
        // Add event listener to selectElement.
        resizeSelectElement(select);
        select.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
            resizeSelectElement(target);
        });
        return lws;
    }
    return undefined;
}

/**
 * Set a molecule property array when the input value is changed.
 * @param node The NumberArayNode.
 * @param ta The HTMLTextAreaElement.
 */
export function setNumberArrayNode(node: NumberArrayNode, ta: HTMLTextAreaElement): void {
    let inputString: string = ta.value.trim();
    let originalValues = arrayToString(node.values, " ");
    if (inputString == "") {
        alert("Empty input resetting...");
        ta.value = originalValues;
        return;
    }
    let inputStrings: string[] = inputString.split(/\s+/);
    let values: Big[] = [];
    let success: boolean = true;
    inputStrings.forEach(function (value) {
        if (!isNumeric(value)) {
            success = false;
        } else {
            values.push(new Big(value));
        }
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        ta.value = originalValues;
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        node.setValues(values);
        console.log("Changed " + node.tagName + " from: \"" + originalValues + "\" to: \"" + arrayToString(node.values, " ") + "\"");
        //console.log("molecule=" + molecule);
    } else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        ta.value = originalValues;
    }
}

/**
 * Set a molecule number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */
export function setNumberNode(node: NumberNode, input: HTMLInputElement): void {
    try {
        let value: Big = new Big(input.value);
        //node.setValue(value);
        node.value = value;
    } catch (e) {
        alert("Value invalid, resetting...");
    }
    input.value = node.value.toString();
}

/**
 * @param options The options.
 * @param select The select element.
 */
export function selectAnotherOptionEventListener(options: string[], select: HTMLSelectElement) {
    select.addEventListener('click', (event: MouseEvent) => {
        if (options[options.length - 1] == s_selectOption) {
            options.pop();
        }
        let lastIndex: number = select.options.length - 1;
        if (select.options[lastIndex].value == s_selectOption) {
            select.remove(lastIndex);
        }
    });
}

/**
 * Parses xml to initialise metadataList.
 * @param xml The XML document.
 */
function processMetadataList(xml: XMLDocument): HTMLDivElement {
    console.log(MetadataList.tagName);
    let mlDiv: HTMLDivElement = createDiv(addRID(MetadataList.tagName, 0), boundary1);
    let xml_mls: HTMLCollectionOf<Element> = xml.getElementsByTagName(MetadataList.tagName);
    if (xml_mls.length > 0) {
        if (xml_mls.length > 1) {
            throw new Error("More than one MetadataList element.");
        }
        let ml: MetadataList = new MetadataList(getAttributes(xml_mls[0]));
        mesmer.setMetadataList(ml);
        function handleElement(tagName: string, constructor: any, setter: any) {
            let xml_elements: HTMLCollectionOf<Element> = xml_mls[0].getElementsByTagName(tagName);
            if (xml_elements.length > 0) {
                if (xml_elements.length == 1) {
                    let s: string = getFirstChildNode(xml_elements[0])?.nodeValue ?? "";
                    let n = new constructor(getAttributes(xml_elements[0]), s);
                    let cDiv: HTMLDivElement = createDiv(undefined, level1);
                    mlDiv.appendChild(cDiv);
                    cDiv.appendChild(createLabel(n.tagName + " " + s, boundary1));
                    //console.log(n.tagName + " " + s);
                    setter.call(ml, n);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        handleElement(DCSource.tagName, DCSource, ml.setSource);
        handleElement(DCCreator.tagName, DCCreator, ml.setCreator);
        handleElement(DCDate.tagName, DCDate, ml.setDate);
        handleElement(DCContributor.tagName, DCContributor, ml.setContributor);
    }
    return mlDiv;
}

/**
 * Parses xml to initialise analysis.
 * @param xml The XML document.
 */
function processAnalysis(xml: XMLDocument): HTMLDivElement {
    console.log(Analysis.tagName);
    let aDivID: string = addRID(Analysis.tagName, 0);
    let aDiv: HTMLDivElement = createDiv(aDivID, boundary1);
    let xml_as: HTMLCollectionOf<Element> = xml.getElementsByTagName(Analysis.tagName);
    if (xml_as.length > 0) {
        if (xml_as.length > 1) {
            throw new Error("More than one Analysis element.");
        }
        let a: Analysis = new Analysis(getAttributes(xml_as[0]));
        mesmer.setAnalysis(a);
        // "me:description".
        let xml_d: HTMLCollectionOf<Element> = xml_as[0].getElementsByTagName(Description.tagName);
        if (xml_d.length > 0) {
            if (xml_d.length == 1) {
                let s: string = getFirstChildNode(xml_d[0])?.nodeValue ?? "";
                let d: Description = new Description(getAttributes(xml_d[0]), s);
                let dDiv: HTMLDivElement = createDiv(addRID(aDivID, Description.tagName), level1);
                aDiv.appendChild(dDiv);
                dDiv.appendChild(createLabel(d.tagName + " " + s, boundary1));
                a.setDescription(d);
            } else {
                throw new Error("More than one Description element.");
            }
        }
        // "me:eigenvalueList".
        let xml_el: HTMLCollectionOf<Element> = xml_as[0].getElementsByTagName(EigenvalueList.tagName);
        // Create a new collapsible div for the EigenvalueLists.
        let elDivID = addRID(aDivID, EigenvalueList.tagName);
        let elDiv: HTMLDivElement = createDiv(elDivID, level1);
        let elcDiv: HTMLDivElement = getCollapsibleDiv(elDivID, aDiv, null, elDiv,
            EigenvalueList.tagName + "s", boundary1, level1);
        if (xml_el.length > 0) {
            for (let i: number = 0; i < xml_el.length; i++) {
                let el_attributes: Map<string, string> = getAttributes(xml_el[i]);
                let el: EigenvalueList = new EigenvalueList(el_attributes);
                let labelText: string = el.tagName + " " + i.toString() + " " + mapToString(el_attributes);
                // Create a new collapsible div for the EigenvalueList.
                let eDivID: string = addRID(elDiv.id, i.toString());
                let eDiv: HTMLDivElement = createDiv(elDivID, level1);
                let ecDiv: HTMLDivElement = getCollapsibleDiv(eDivID, elDiv, null, eDiv,
                    labelText, boundary1, level0);
                //eDiv.appendChild(createLabel(labelText, boundary1));
                a.addEigenvalueList(el);
                // "me:eigenvalue".
                let evs: Big[] = [];
                let xml_ei: HTMLCollectionOf<Element> = xml_el[i].getElementsByTagName(Eigenvalue.tagName);
                if (xml_ei.length > 0) {
                    for (let j: number = 0; j < xml_ei.length; j++) {
                        let ev: Big = new Big(getFirstChildNode(xml_ei[j])?.nodeValue as string);
                        evs.push(ev);
                        el.addEigenvalue(new Eigenvalue(getAttributes(xml_ei[j]), ev));
                    }
                }
                eDiv.appendChild(createLabel(arrayToString(evs, ", "), boundary1));
            }
        }
        // "me:populationList".
        let xml_pl: HTMLCollectionOf<Element> = xml_as[0].getElementsByTagName(PopulationList.tagName);
        // Create a new collapsible div for the PopulationLists.
        let plDivID = addRID(aDivID, PopulationList.tagName);
        let plDiv: HTMLDivElement = createDiv(plDivID, level1);
        let plcDiv: HTMLDivElement = getCollapsibleDiv(plDivID, aDiv, null, plDiv,
            PopulationList.tagName + "s", boundary1, level1);
        if (xml_pl.length > 0) {
            // Create a new collapsible div for the PopulationList.
            for (let i: number = 0; i < xml_pl.length; i++) {
                let pl_attributes: Map<string, string> = getAttributes(xml_pl[i]);

                let T: Big = pl_attributes.get("T") != undefined ? new Big(pl_attributes.get("T") as string) : big0;
                let conc: Big = pl_attributes.get("conc") != undefined ? new Big(pl_attributes.get("conc") as string) : big0;

                let pl: PopulationList = new PopulationList(pl_attributes);
                let labelText: string = pl.tagName + " " + i.toString() + " " + mapToString(pl_attributes);
                let plDivID: string = addRID(aDiv.id, PopulationList.tagName, i.toString());
                // Create a new collapsible div for the EigenvalueList.
                let pDivID: string = addRID(plDivID, i.toString());
                let pDiv: HTMLDivElement = createDiv(plDivID, level1);
                let pcDiv: HTMLDivElement = getCollapsibleDiv(pDivID, plDiv, null, pDiv,
                    labelText, boundary1, level0);
                a.addPopulationList(pl);

                // "me:population".
                //let lt_ref_pop : Map<Big, Map<string, Big>> = new Map(); // Change to calculate the log of the time when creating the plots.
                let t_ref_pop: Map<Big, Map<string, Big>> = new Map();
                let refs: string[] = [];
                refs.push("time");

                let xml_pn: HTMLCollectionOf<Element> = xml_pl[i].getElementsByTagName(Population.tagName);
                if (xml_pn.length > 0) {
                    for (let j: number = 0; j < xml_pn.length; j++) {
                        let pn_attributes: Map<string, string> = getAttributes(xml_pn[j]);

                        let population: Population = new Population(pn_attributes, []);
                        pl.addPopulation(population);

                        let t: Big = pn_attributes.get("time") != undefined ? new Big(pn_attributes.get("time") as string) : big0;
                        //let lt: Big = pn_attributes.get("logTime") != undefined ? new Big(pn_attributes.get("logTime") as string) : big0; 

                        let ref_pop: Map<string, Big> = new Map();

                        //lt_ref_pop.set(lt, ref_pop);
                        t_ref_pop.set(t, ref_pop);

                        let xml_pop: HTMLCollectionOf<Element> = xml_pn[j].getElementsByTagName(Pop.tagName);
                        if (xml_pop.length > 0) {
                            for (let k: number = 0; k < xml_pop.length; k++) {
                                let pop_attributes: Map<string, string> = getAttributes(xml_pop[k]);
                                let ref: string = pop_attributes.get("ref") as string;
                                if (j == 0) {
                                    refs.push(ref);
                                }
                                let p: Big = new Big(getFirstChildNode(xml_pop[k])?.nodeValue as string);
                                let pop: Pop = new Pop(pop_attributes, p);
                                population.addPop(pop);
                                ref_pop.set(ref, p);
                            }
                        }
                    }
                }
                // Create graph.
                let graphDiv: HTMLDivElement = createDiv(addRID(pDivID, s_graph), boundary1);
                pDiv.appendChild(graphDiv);
                let canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
                graphDiv.appendChild(canvas);
                // Create an scatter plot.
                let scatterPlot: ScatterPlot = new ScatterPlot(canvas, t_ref_pop, sp_font);
                // Add the scatter plot to the collection.
                scatterPlots.push(scatterPlot);
                //scatterPlot.draw();
                // Add a save to PNG button.
                addSaveAsPNGButton(canvas, pDiv, graphDiv, labelText);

                // Create Table.
                let tableDiv: HTMLDivElement = createDiv(addRID(pDivID, s_table), boundary1);
                pDiv.appendChild(tableDiv);
                let tab = createTable(addRID(plDivID, s_table), boundary1);
                addTableRow(tab, refs);
                t_ref_pop.forEach((ref_pop, t) => {
                    let row: string[] = [];
                    row.push(t.toString());
                    ref_pop.forEach((p, ref) => {
                        row.push(p.toString());
                    });
                    addTableRow(tab, row);
                });
                tableDiv.appendChild(tab);
                // Insert a save as csv button.
                addSaveAsCSVButton(() => tableToCSV(tab), pDiv, tableDiv, labelText, boundary1);
            }
        }
        // me:rateList.
        let xml_rl: HTMLCollectionOf<Element> = xml_as[0].getElementsByTagName(RateList.tagName);
        // Create a new collapsible div for the RateLists.
        let rlDivID = addRID(aDivID, RateList.tagName);
        let rlDiv: HTMLDivElement = createDiv(rlDivID, level1);
        let rlcDiv: HTMLDivElement = getCollapsibleDiv(rlDivID, aDiv, null, rlDiv,
            RateList.tagName + "s", boundary1, level1);
        if (xml_rl.length > 0) {
            // Create Table.
            let tableDiv: HTMLDivElement = createDiv(addRID(rlDivID, s_table), boundary1);
            rlDiv.appendChild(tableDiv);
            let tab = createTable(addRID(plDivID, s_table), boundary1);
            // Table Header
            let th: string[] = ["T", "conc"];
            for (let i: number = 0; i < xml_rl.length; i++) {
                let rl_attributes: Map<string, string> = getAttributes(xml_rl[i]);
                let values: string[] = [];
                values.push(rl_attributes.get("T") as string);
                values.push(rl_attributes.get("conc") as string);
                /*if (i == 0) {
                    Array.from(rl_attributes.keys()).forEach((key) => {
                        refs.push(key);
                    });
                }*/
                let rl: RateList = new RateList(rl_attributes);
                a.addRateList(rl);
                /*
                let labelText: string = rl.tagName + " " + i.toString() + " " + mapToString(rl_attributes);
                let rlDivID: string = addID(aDiv.id, RateList.tagName, i.toString());
                // Create a new collapsible div for the RateList.
                let rDivID: string = addID(rlDivID, i.toString());
                let rDiv: HTMLDivElement = createDiv(rlDivID, level1);
                let rcDiv: HTMLDivElement = getCollapsibleDiv(rDivID, rlDiv, null, rDiv,
                    labelText, boundary1, level0);
                */
                // "me:firstOrderRate".
                let xml_for: HTMLCollectionOf<Element> = xml_rl[i].getElementsByTagName(FirstOrderRate.tagName);
                if (xml_for.length > 0) {
                    //console.log("me:firstOrderRate length " + xml_for.length);
                    for (let j: number = 0; j < xml_for.length; j++) {
                        let forate_attributes: Map<string, string> = getAttributes(xml_for[j]);
                        if (i == 0) {
                            let fromRef: string = forate_attributes.get("fromRef") as string;
                            let toRef: string = forate_attributes.get("toRef") as string;
                            th.push(fromRef + "->" + toRef);
                        }
                        let s: string = (getFirstChildNode(xml_for[j])?.nodeValue ?? "").trim();
                        values.push(s);
                        let forate: FirstOrderRate = new FirstOrderRate(forate_attributes, new Big(s));
                        rl.addFirstOrderRate(forate);
                    }
                }
                // "me:firstOrderLoss".
                let xml_fol: HTMLCollectionOf<Element> = xml_rl[i].getElementsByTagName(FirstOrderLoss.tagName);
                if (xml_fol.length > 0) {
                    //console.log("me:firstOrderLoss length " + xml_fol.length);
                    for (let j: number = 0; j < xml_fol.length; j++) {
                        let fol_attributes: Map<string, string> = getAttributes(xml_fol[j]);
                        if (i == 0) {
                            Array.from(fol_attributes.values()).forEach((v) => {
                                th.push("loss of " + v);
                            });
                        }
                        let s: string = (getFirstChildNode(xml_fol[j])?.nodeValue ?? "").trim();
                        values.push(s);
                        let fol: FirstOrderLoss = new FirstOrderLoss(fol_attributes, new Big(s));
                        rl.addFirstOrderLoss(fol);
                    }
                }
                if (i == 0) {
                    addTableRow(tab, th);
                }
                addTableRow(tab, values);
                //rDiv.appendChild(createDiv(undefined, boundary1).appendChild(createLabel(th.join(","), boundary1)));
                //rDiv.appendChild(createDiv(undefined, boundary1).appendChild(createLabel(values.join(","), boundary1)));
            }
            //console.log(refs);
            tableDiv.appendChild(tab);
            // Insert a save as csv button.
            addSaveAsCSVButton(() => tableToCSV(tab), rlDiv, tableDiv, "Bartis-Widom Phenomenological Rate Coefficients", boundary1);
        }
    }
    return aDiv;
}

/**
 * A class for creating a scatter plot.
 */
class ScatterPlot {

    private canvas: HTMLCanvasElement;
    private data: Map<Big, Map<string, Big>>;

    constructor(canvas: HTMLCanvasElement, data: Map<Big, Map<string, Big>>, font: string) {
        this.canvas = canvas;
        this.data = data;
        // Create a new scatter plot.
        this.draw(font);
    }

    /**
     * Draw the scatter plot.
     */
    draw(font: string): void {
        this.canvas.width = 800; // Set the width of the canvas
        this.canvas.height = 400; // Set the height of the canvas
        const ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        //const ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;        
        ctx.font = font;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas.
        let width: number = this.canvas.width;
        let height: number = this.canvas.height;
        let xMin: number = Number.MAX_VALUE;
        let xMax: number = Number.MIN_VALUE;
        //let yMin: number = Number.MAX_VALUE;
        //let yMax: number = Number.MIN_VALUE;
        let yMin: number = 0;
        let yMax: number = 1;
        let maxRefWidth: number = 0;
        this.data.forEach((ref_pop, x) => {
            let logx = Math.log10(x.toNumber());
            xMin = Math.min(xMin, logx);
            xMax = Math.max(xMax, logx);
            ref_pop.forEach((p, ref) => {
                maxRefWidth = Math.max(maxRefWidth, ctx.measureText(ref).width);
            });
            /*
            ref_pop.forEach((p, ref) => {
                yMin = Math.min(yMin, p.toNumber());
                yMax = Math.max(yMax, p.toNumber());
            });
            */
        });

        // Calculate the width of the largest tick label
        let yTicks: number = 2;
        let yTickSpacing: number = 1;
        let maxTickLabelWidth = 0;
        for (let i: number = 0; i < yTicks; i++) {
            let yTick: number = 1 - i * yTickSpacing;
            let tickLabelWidth = ctx.measureText(yTick.toString()).width;
            maxTickLabelWidth = Math.max(maxTickLabelWidth, tickLabelWidth);
        }
        // Calculate the height of the largest tick label
        let metrics = ctx.measureText('0');
        let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let xmargin: number = (th * 4);
        // Set the margin based on the width of the largest tick label
        let ymargin: number = maxTickLabelWidth + th + 20; // Add 20 for some extra space
        let x0: number = ymargin;
        let y0: number = height - (ymargin + (th * 3));
        let x1: number = width - (xmargin + maxRefWidth + 20);
        let y1: number = xmargin;

        let xScale: number = (x1 - x0) / (xMax - xMin);
        let yScale: number = (y1 - y0) / (yMax - yMin);
        // Draw x-axis.
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y0);
        ctx.stroke();
        // Draw y-axis.
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0, y1);
        ctx.stroke();
        // Define an array of colors for different styles
        let colors = ["red", "green", "blue", "orange", "purple", "grey", "cyan", "magenta", "lightblue", "lightgreen", "pink", "yellow", "brown", "black"];
        let refToColor: Map<string, string> = new Map();
        // Draw data points.
        this.data.forEach((ref_pop, x) => {
            // Define a reference id for each color
            let i: number = 0;
            ref_pop.forEach((p, ref) => {
                let logx = Math.log10(x.toNumber());
                let xPixel: number = x0 + ((logx - xMin) * xScale);
                let pn: number = p.toNumber();
                if (pn < 1) {
                    let yPixel: number = y0 + ((pn - yMin) * yScale);
                    if (yPixel > 0) {
                        ctx.beginPath();
                        ctx.arc(xPixel, yPixel, 2, 0, 2 * Math.PI); // Points
                        // Use the ref index to select a color
                        let color: string = colors[i % colors.length];
                        refToColor.set(ref, color);
                        ctx.fillStyle = color;
                        ctx.fill();
                    }
                }
                i++;
            });
        });
        // Draw x-axis labels.
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        let xLabel: string = "log10(time/secs)";
        ctx.fillText(xLabel, x0 + (x1 - x0) / 2, y0 + xmargin / 2);
        // Draw y-axis labels.
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        let yLabel: string = "fractional population";
        ctx.fillText(yLabel, -y0 - (y1 - y0) / 2, x0 - ymargin);
        ctx.restore();
        // Draw x-axis ticks.
        let xrange: number = xMax - xMin;
        //console.log("xrange=" + xrange);
        let orderOfMagnitude = Math.floor(Math.log10(xrange));
        //console.log("orderOfMagnitude=" + orderOfMagnitude);
        let xTickSpacing: number = Math.abs(Math.ceil(xrange / Math.pow(10, orderOfMagnitude)));
        //console.log("xTickSpacing=" + xTickSpacing);
        let i: number = Math.ceil(xMin / xTickSpacing);
        let xTick: number = i * xTickSpacing;;
        // Draw x-axis ticks > 0.
        while (xTick < xMax) {
            //console.log("xTick=" + xTick);
            let xPixel: number = x0 + ((xTick - xMin) * xScale); // Convert xTick to pixel scale
            ctx.beginPath();
            ctx.moveTo(xPixel, y0);
            ctx.lineTo(xPixel, y0 + 5);
            ctx.stroke();
            ctx.fillText(xTick.toString(), xPixel, y0 + 5);
            xTick += xTickSpacing;
        }
        // Draw y-axis ticks.
        for (let i: number = 0; i < yTicks; i++) {
            let yTick: number = y0 - i * yTickSpacing;
            ctx.beginPath();
            ctx.moveTo(x0, yTick);
            ctx.lineTo(x0 - 5, yTick);
            ctx.stroke();
        }
        // Add a legend.
        // Calculate the maxiimum text height of a ref.
        let maxth = 0;
        refToColor.forEach((color, ref) => {
            let metrics = ctx.measureText(ref);
            let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            maxth = Math.max(maxth, th);
        });

        // Calculate the position of the legend.
        let legendX = x1 + 20; // Position the legend 20 pixels to the right of the graph
        let legendY = y1; // Position the legend at the top of the graph
        let legendYSpacing = maxth; // Adjust as needed

        // Draw a legend for each ref.
        i = 0;
        refToColor.forEach((color, ref) => {

            let legendYPos = legendY + i * legendYSpacing;
            ctx.fillStyle = color;
            ctx.fillRect(legendX, legendYPos, maxth / 2, maxth / 2); // Draw a small rectangle of the ref's color

            ctx.fillStyle = "black";
            ctx.fillText(ref, legendX + th + (ctx.measureText(ref).width / 2), legendYPos - maxth / 2); // Draw the ref's name
            i++;

        });
    }
}


/**
 * Convert an HTMLTableElement to a CSV string.
 */
function tableToCSV(t: HTMLTableElement): string {
    let csv: string = "";
    let rows: HTMLCollectionOf<HTMLTableRowElement> = t.rows;
    for (let i: number = 0; i < rows.length; i++) {
        let row: HTMLTableRowElement = rows[i];
        let cells: HTMLCollectionOf<HTMLTableCellElement> = row.cells;
        for (let j: number = 0; j < cells.length; j++) {
            csv += cells[j].textContent;
            if (j < cells.length - 1) {
                csv += ",";
            }
        }
        csv += "\n";
    }
    return csv;
}

/**
 * For saving data to a file.
 * 
 * @param data The data.
 * @param dataType The data type.
 * @param filename The filename.
 * @param isDataURL A boolean indicating whether the data is a data URL.
 */
function saveDataAsFile(data: string, dataType: string, filename: string, isDataURL: boolean = false) {
    let a = document.createElement('a');
    a.href = isDataURL ? data : `data:${dataType};charset=utf-8,` + encodeURIComponent(data);
    a.download = filename;
    document.body.appendChild(a); // Append the anchor to the body.
    a.click(); // Programmatically click the anchor to trigger the download.
    document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
}

/**
 * Save the Mesmer object as XML.
 */
export function saveXML() {
    if (mesmer == null) {
        alert("No Mesmer object to save.");
        return;
    } else {
        /**
         * Organise mesmer nodes to be in order:
         * title
         * moleculeList
         * reactionList
         * conditions
         * modelParameters
         * control
         * metadataList
         * analysis
         */
        let mesmerOrdered: Mesmer = new Mesmer(mesmer.attributes);
        mesmerOrdered.setTitle(mesmer.getTitle()!);
        if (molecules != undefined) {
            mesmerOrdered.setMoleculeList(new MoleculeList(new Map(), Array.from(molecules.values())));
        }
        if (reactions != undefined) {
            mesmerOrdered.setReactionList(new ReactionList(new Map(), Array.from(reactions.values())));
        }
        if (mesmer.getConditionss() != undefined) {
            mesmerOrdered.setConditionss(mesmer.getConditionss());
        }
        if (mesmer.getModelParameterss() != undefined) {
            mesmerOrdered.setModelParameterss(mesmer.getModelParameterss());
        }
        if (mesmer.getControls() != undefined) {
            mesmerOrdered.setControls(mesmer.getControls());
        }
        let mdl: MetadataList | undefined = mesmer.getMetadataList();
        if (mdl != undefined) {
            mesmerOrdered.setMetadataList(mdl);
        }
        let analysis: Analysis | undefined = mesmer.getAnalysis();
        if (analysis != undefined) {
            mesmerOrdered.setAnalysis(analysis);
        }
        console.log("saveXML");
        const pad: string = "  ";
        let xmlData = Mesmer.header + mesmerOrdered.toXML(pad, "");
        let title: string = mesmerOrdered.getTitle()?.value as string;
        saveDataAsFile(xmlData, 'text/xml', getFilename(title) + ".xml");
    }
}

/**
 * Convert name into a filename.
 */
function getFilename(name: string): string {
    return name.replace(/[^a-z0-9]/gi, '_');
}

/**
 * Create and append a Save as PNG button.
 * 
 * @param canvas The canvas to save as an image.
 * @param divToAddTo The div to add the button to.
 * @param elementToInsertBefore The element to insert before.
 * @param name The name to be appended to the file.
 */
export function addSaveAsPNGButton(canvas: HTMLCanvasElement, divToAddTo: HTMLElement, elementToInsertBefore: HTMLElement | null, name: string) {
    // Add a save button to save the canvas as an image.
    let saveButtonID = addRID(divToAddTo.id, 'saveButton');
    let saveButton: HTMLButtonElement = createButton("Save as PNG", saveButtonID, boundary1);
    if (elementToInsertBefore != null) {
        divToAddTo.insertBefore(saveButton, elementToInsertBefore);
    } else {
        divToAddTo.appendChild(saveButton);
    }
    saveButton.addEventListener('click', () => {
        let dataURL = canvas.toDataURL();
        let title: string = mesmer.getTitle()?.value as string;
        saveDataAsFile(dataURL, 'image/png', getFilename(title + "_" + name) + ".png", true);
    });
}

/**
 * Create and append a Save as CSV button.
 * 
 * @param toCSV The function to convert to CSV.
 * @param divToAddTo The div to add the button to.
 * @param elementToInsertBefore The element to insert before.
 * @param name The name to be appended to the file.
 */
export function addSaveAsCSVButton(toCSV: Function, divToAddTo: HTMLElement, elementToInsertBefore: HTMLElement, name: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let bID = addRID(divToAddTo.id, s_button, s_save);
    let b: HTMLButtonElement = createButton("Save as CSV", bID, margin);
    divToAddTo.insertBefore(b, elementToInsertBefore);
    b.addEventListener('click', () => {
        let csv: string = toCSV();
        let title: string = mesmer.getTitle()?.value as string;
        let fn: string = getFilename(title + "_" + name) + ".csv";
        saveDataAsFile(csv, 'text/csv', fn);
        console.log("Saved " + fn);
    });
}