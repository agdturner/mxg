"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s_Reactions_Diagram = exports.libmols = exports.defaults = exports.mesmer = exports.IDManager = exports.big0 = exports.reactionsDiagramDivID = exports.menuDivID = exports.s_viewer = exports.s_units = exports.s_undefined = exports.s_Tunneling = exports.s_textarea = exports.s_Transition_States = exports.s_table = exports.s_selectOption = exports.s_save = exports.s_Remove_sy_remove = exports.s_reactions = exports.s_Reactants = exports.s_Products = exports.s_optionOff = exports.s_optionOn = exports.s_molecules = exports.s_input = exports.s_description = exports.s_container = exports.s_Add_from_spreadsheet = exports.s_Add_from_library = exports.s_Add_sy_add = exports.sy_selected = exports.sy_deselected = exports.sy_edit = exports.sy_add = exports.boundary1 = exports.level1 = exports.level0 = void 0;
exports.addID = addID;
exports.addRID = addRID;
exports.remove = remove;
exports.setLibmols = setLibmols;
exports.addMolecule = addMolecule;
exports.getMoleculeKeys = getMoleculeKeys;
exports.getMolecule = getMolecule;
exports.startAfresh = startAfresh;
exports.redrawReactionsDiagram = redrawReactionsDiagram;
exports.load = load;
exports.removeOptionByClassName = removeOptionByClassName;
exports.addOptionByClassName = addOptionByClassName;
exports.addOrRemoveInstructions = addOrRemoveInstructions;
exports.processNumber = processNumber;
exports.addRemoveButton = addRemoveButton;
exports.processString = processString;
exports.addAnyUnits = addAnyUnits;
exports.getN = getN;
exports.selectAnotherOptionEventListener = selectAnotherOptionEventListener;
exports.saveXML = saveXML;
exports.addSaveAsPNGButton = addSaveAsPNGButton;
exports.addSaveAsCSVButton = addSaveAsCSVButton;
exports.setNumberNode = setNumberNode;
// Imports from MXG modules.
const util_js_1 = require("./util.js");
const xml_js_1 = require("./xml.js");
const html_js_1 = require("./html.js");
const gui_menu_js_1 = require("./gui_menu.js");
const xml_conditions_js_1 = require("./xml_conditions.js");
const xml_modelParameters_js_1 = require("./xml_modelParameters.js");
const xml_control_js_1 = require("./xml_control.js");
const xml_mesmer_js_1 = require("./xml_mesmer.js");
const xml_analysis_js_1 = require("./xml_analysis.js");
const xml_metadata_js_1 = require("./xml_metadata.js");
const defaults_js_1 = require("./defaults.js");
const gui_moleculeList_js_1 = require("./gui_moleculeList.js");
const gui_reactionList_js_1 = require("./gui_reactionList.js");
const gui_ConditionsList_js_1 = require("./gui_ConditionsList.js");
const gui_ModelParametersList_js_1 = require("./gui_ModelParametersList.js");
const gui_ControlList_js_1 = require("./gui_ControlList.js");
const gui_reactionDiagram_js_1 = require("./gui_reactionDiagram.js");
// Imports from 3rd party modules.
//import { openDB } from 'idb';
const big_js_1 = require("big.js");
//import * as $3Dmol from '$3Dmol';
/**
 * Big.js.
 */
// Set the number toString() format for Big.js. The default is Big.PE = 21, so this change means that Big numbers
// with an order of magnitude of greater than 6 (e.g. 1000000) are presented as 1.0e+7.
big_js_1.Big.PE = 7;
/**
 * The filename of the MESMER XML file.
 */
let filename;
/**
 * fontSize is set to a relative measure so that component text is resizeable.
 */
let fontSize = "1.0em";
/**
 * Margins for spacing GUI components.
 */
let s_0px = "0px";
let s_1px = "1px";
let s_25px = "25px";
exports.level0 = { marginLeft: s_0px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
exports.level1 = { marginLeft: s_25px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
exports.boundary1 = { marginLeft: s_1px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_1px };
/**
 * Symbology for the GUI.
 */
// Symbols.
exports.sy_add = "\uFF0B"; // ＋
exports.sy_edit = "\u270E"; // ✎
exports.sy_deselected = " \u2717"; // ✗
//const sy_refresh: string = "\u27F3"; // ⟳
const sy_remove = "\u2715"; // ✕
exports.sy_selected = " \u2713"; // ✓
// Strings.
exports.s_Add_sy_add = "Add " + exports.sy_add;
exports.s_Add_from_library = "Add from library " + exports.sy_add;
exports.s_Add_from_spreadsheet = "Add from spreadsheet " + exports.sy_add;
const s_analysis = "analysis";
const s_conditions = "conditions";
exports.s_container = "container";
const s_control = "control";
exports.s_description = "description";
const s_graph = "graph";
exports.s_input = "input";
const s_menu = "menu";
const s_metadata = "metadata";
const s_modelParameters = "modelParameters";
exports.s_molecules = "molecules";
exports.s_optionOn = 'optionOn';
exports.s_optionOff = 'optionOff';
exports.s_Products = "Products";
exports.s_Reactants = "Reactants";
exports.s_reactions = "reactions";
const s_reactionsDiagram = "reactionsDiagram";
exports.s_Remove_sy_remove = "Remove " + sy_remove;
exports.s_save = "save";
//const s_select: string = "select";
exports.s_selectOption = "Select an option (press a letter key to cycle through options for it)...";
exports.s_table = "table";
const s_title = "title";
exports.s_Transition_States = "Transition States";
exports.s_textarea = "textarea";
exports.s_Tunneling = "Tunneling";
exports.s_undefined = "undefined";
exports.s_units = "units";
const s_xml = "xml";
exports.s_viewer = "viewer";
const s_welcome = "welcome";
/**
 * allIDs is a set of all IDs used in the GUI.
 * This is used to ensure that all IDs are unique.
 * If an ID is not unique, an error is thrown.
 */
let allIDs = new Set();
/**
 * A set of all IDs to be removed when loading a MESMER file.
 */
let rIDs = new Set();
/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */
function addID(...parts) {
    let validID = (0, util_js_1.getID)(...parts);
    if (allIDs.has(validID)) {
        throw new Error(validID + " already exists!");
        //console.warn(validID + " already exists!");
    }
    allIDs.add(validID);
    //console.log("addID: \"" + validID + "\"");
    return validID;
}
/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */
function addRID(...parts) {
    let validID = addID(...parts);
    rIDs.add(validID);
    return validID;
}
/**
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 */
function remove(id) {
    let e = document.getElementById(id);
    if (e != null) {
        e.remove();
    }
    rIDs.delete(id);
    allIDs.delete(id);
}
// index.html IDs
exports.menuDivID = addID(s_menu);
const titleDivID = addID(s_title);
const moleculesDivID = addID(exports.s_molecules);
const reactionsDivID = addID(exports.s_reactions);
exports.reactionsDiagramDivID = addID(s_reactionsDiagram);
const conditionsDivID = addID(s_conditions);
const modelParametersDivID = addID(s_modelParameters);
const controlDivID = addID(s_control);
const metadataListDivID = addID(s_metadata);
const analysisDivID = addID(s_analysis);
const xmlDivID = addID(s_xml);
//const welcomeDivID: string = addID(s_welcome);
// For dark/light mode.
let dark = false;
// Numbers
exports.big0 = new big_js_1.Big(0);
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
class IDManager {
    /**
     * A map of IDs with the key ID as the key and a set of IDs as the value.
     */
    ids = new Map();
    /**
     * Adds an ID to the map.
     * @param iD The key ID.
     * @param parts The parts of the ID to be created.
     * @returns The ID created.
     */
    addID(iD, ...parts) {
        let id = addRID(iD, ...parts);
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
    removeID(iD) {
        rIDs.delete(iD);
        allIDs.delete(iD);
    }
    /**
     * Removes the IDs.
     * @param iD The ID key for the IDs to remove.
     */
    removeIDs(iD) {
        if (!this.ids.has(iD)) {
            return;
        }
        this.ids.get(iD).forEach(id => {
            console.log("remove id " + id);
            this.removeID(id);
        });
        this.ids.delete(iD);
    }
    /**
     * Remove all IDs.
     */
    removeAllIDs() {
        this.ids.forEach((value, key) => {
            this.removeIDs(key);
        });
    }
}
exports.IDManager = IDManager;
/**
 * For moleculeList Div ID management.
 */
let mIDM;
/**
 * For reactionList Div ID management.
 */
let rIDM;
/**
 * For conditionsList Div ID management.
 */
let conditionsIDM;
/**
 * For ModelParametersList Div ID management.
 */
let mpIDM;
/**
 * For ControlList Div ID management.
 */
let controlIDM;
/**
 * For initialising the libmols map.
 * @param m The map of molecules to set.
 */
function setLibmols(m) {
    exports.libmols = m;
}
/**
 * Adds a molecule to the map of molecules.
 * The molecule label is updated if the molecule attribute id is not unique.
 * @param m The molecule to add
 * @param ms The map of molecules to add the molecule to.
 */
function addMolecule(ask, m, ms) {
    let mid;
    while (true) {
        mid = (0, gui_moleculeList_js_1.setMoleculeID)(ask, m.getID(), m, ms);
        if (mid != undefined) {
            break;
        }
    }
    ms.set(mid, m);
}
/**
 * A map of molecules with id as key and Molecule as value.
 * The key is a composite of the molecule ID and the index.
 */
let molecules;
/**
 * Get the keys of the molecules. The keys are a composite of the molecule ID and the index.
 * @returns The keys of the molecules.
 */
function getMoleculeKeys(molecules) {
    let keys = new Set();
    molecules.forEach((v, k) => {
        let id = v.getID();
        if (keys.has(id)) {
            keys.add(id + "-" + k.toString());
        }
        else {
            keys.add(id);
        }
    });
    return keys;
}
/**
 * This returns the molecule found with the given label from ms.
 * @param id The id of the molecule to find.
 * @param ms The map of molecules to search.
 * @returns The molecule with the lable in ms.
 */
function getMolecule(id, ms) {
    for (let [key, value] of ms) {
        //if (value.label == label) {
        if (value.id == id) {
            return value;
        }
    }
    return null;
}
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */
let reactions;
/**
 * For storing any scatter plots.
 */
let scatterPlots;
/**
 * Reaction Diagram variables.
 */
// IDs.
exports.s_Reactions_Diagram = "Reactions Diagram";
const rddDivID = addRID(exports.s_Reactions_Diagram);
const rddcID = addRID(rddDivID, "Canvas");
//let rd_canvas_width: number = 800;
let rdcHeight = 400;
let rd_lw = 4; // Line width of reactants, transition states and products.
let rd_lwc = 2; // Line width of connectors.
let rd_font = "1em SensSerif";
let rdWindow = null;
// Scatterplot font.
let sp_font = "2em SensSerif";
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
    let mesmerAttributes = new Map();
    mesmerAttributes.set("xmlns", "http://www.xml-cml.org/schema");
    mesmerAttributes.set("xmlns:me", "http://www.chem.leeds.ac.uk/mesmer");
    mesmerAttributes.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    exports.mesmer = new xml_mesmer_js_1.Mesmer(mesmerAttributes);
    // Create the menu.
    (0, gui_menu_js_1.createMenu)();
    // StartAfresh
    startAfresh();
});
/**
 * (Re)Initialise the main GUI and IDManagers.
 */
function initialise() {
    // Clear content.
    rIDs.forEach(id => {
        remove(id);
    });
    // Initialise
    rIDs = new Set();
    mIDM = new IDManager();
    rIDM = new IDManager();
    conditionsIDM = new IDManager();
    mpIDM = new IDManager();
    controlIDM = new IDManager();
    // libmols is not reinitialised on purpose. To completely start again, reload the app.
    //libmols = new Map();
    exports.defaults = new defaults_js_1.Defaults();
    molecules = new Map();
    reactions = new Map();
    scatterPlots = [];
}
/**
 * Load interface.
 */
function startAfresh() {
    initialise();
    // Title.
    let title = "Example_title";
    let attributes = new Map();
    createTitle(title, attributes);
    // Molecules.
    let moleculesDiv = document.getElementById(moleculesDivID);
    let mlDivID = addRID(xml_mesmer_js_1.MoleculeList.tagName);
    let mlDiv = (0, html_js_1.createDiv)(mlDivID);
    moleculesDiv.appendChild(mlDiv);
    // Create collapsible content.
    let mlcDiv = (0, html_js_1.getCollapsibleDiv)(mlDivID, moleculesDiv, null, mlDiv, xml_mesmer_js_1.MoleculeList.tagName, exports.boundary1, exports.level0);
    // Add add molecule button.
    let mb = (0, gui_moleculeList_js_1.getAddMoleculeButton)(mlDiv, mIDM, molecules);
    // Add add from library button.
    let lb = (0, gui_moleculeList_js_1.getAddFromLibraryButton)(mlDiv, mb, mIDM, molecules);
    // Reaction List.
    let rlDivID = addRID(xml_mesmer_js_1.ReactionList.tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID);
    createReactionList((0, html_js_1.createDiv)(rlDivID));
    // Reactions Diagram.
    (0, gui_reactionDiagram_js_1.createReactionDiagram)(rddcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, true);
    // Conditions.
    let conditionsDiv = document.getElementById(conditionsDivID);
    let cdlDivID = addRID(xml_conditions_js_1.Conditions.tagName);
    let cdlDiv = (0, html_js_1.createDiv)(cdlDivID);
    conditionsDiv.appendChild(cdlDiv);
    // Create a div for the conditionss.
    let conditionssDiv = (0, html_js_1.createDiv)(undefined, exports.boundary1);
    // Create an add button to add a conditions.
    (0, gui_ConditionsList_js_1.createAddConditionsButton)(conditionssDiv, conditionsIDM, molecules);
    // Create collapsible content.
    let cdlcDiv = (0, html_js_1.getCollapsibleDiv)(cdlDivID, cdlDiv, null, conditionssDiv, "ConditionsList", exports.boundary1, exports.level0);
    // Model Parameters.
    let modelParametersDiv = document.getElementById(modelParametersDivID);
    let mplDivID = addRID(xml_modelParameters_js_1.ModelParameters.tagName, "list");
    let mplDiv = (0, html_js_1.createDiv)(mplDivID);
    modelParametersDiv.appendChild(mplDiv);
    // Create a div for the model parameterss.
    let modelParameterssDiv = (0, html_js_1.createDiv)(undefined, exports.boundary1);
    // Create an add button to add a model parameters.
    (0, gui_ModelParametersList_js_1.createAddModelParametersButton)(modelParameterssDiv, mpIDM);
    // Create collapsible content.
    let mplcDiv = (0, html_js_1.getCollapsibleDiv)(mplDivID, mplDiv, null, modelParameterssDiv, "ModelParametersList", exports.boundary1, exports.level0);
    // Control.
    let controlDiv = document.getElementById(controlDivID);
    let clDivID = addRID(xml_control_js_1.Control.tagName);
    let clDiv = (0, html_js_1.createDiv)(clDivID);
    controlDiv.appendChild(clDiv);
    // Create a div for the controls.
    let controlsDiv = (0, html_js_1.createDiv)(undefined, exports.boundary1);
    // Create an add button to add a control.
    (0, gui_ControlList_js_1.createAddControlButton)(controlsDiv, controlIDM);
    // Create collapsible content.
    let controlcDiv = (0, html_js_1.getCollapsibleDiv)(clDivID, clDiv, null, controlsDiv, "ControlList", exports.boundary1, exports.level0);
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
}
/**
 * Create the title input.
 */
function createTitle(title, attributes) {
    let titleNode = new xml_mesmer_js_1.Title(attributes, title);
    exports.mesmer.setTitle(titleNode);
    let titleDiv = document.getElementById(titleDivID);
    let lwiId = addRID('titleDiv');
    // Remove any existing lwiId HTMLDivElement.
    remove(lwiId);
    // Create input element.
    let lwi = (0, html_js_1.createLabelWithInput)("text", addRID(lwiId, exports.s_input), exports.boundary1, exports.level0, (event) => {
        let target = event.target;
        titleNode.value = target.value;
        console.log(titleNode.tagName + " changed to " + titleNode.value);
        (0, html_js_1.resizeInputElement)(target);
    }, title, xml_mesmer_js_1.Title.tagName);
    lwi.id = lwiId;
    titleDiv.appendChild(lwi);
}
/**
 * Create the Reaction List.
 * @param rlDiv The reactionList div.
 */
function createReactionList(rlDiv) {
    let reactionsDiv = document.getElementById(reactionsDivID);
    let rlDivID = addRID(xml_mesmer_js_1.ReactionList.tagName);
    //let rlDiv: HTMLDivElement = createDiv(rlDivID);
    reactionsDiv.appendChild(rlDiv);
    // Create collapsible content.
    let rlcDiv = (0, html_js_1.getCollapsibleDiv)(rlDivID, reactionsDiv, null, rlDiv, xml_mesmer_js_1.ReactionList.tagName, exports.boundary1, exports.level0);
    // Add add reaction button.
    let rb = (0, gui_reactionList_js_1.getAddReactionButton)(rIDM, rlDiv, reactions, molecules);
}
/**
 * Redraw the reactions diagram.
 */
function redrawReactionsDiagram() {
    if (rdWindow == null) {
        let rdCanvas = document.getElementById(rddcID);
        (0, gui_reactionDiagram_js_1.drawReactionDiagram)(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    }
    else {
        let c = rdWindow.document.getElementById(rddcID);
        (0, gui_reactionDiagram_js_1.drawReactionDiagram)(c, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    }
}
/**
 * Redraw any scatterplots.
 */
function redrawScatterPlots() {
    scatterPlots.forEach((scatterPlot) => {
        scatterPlot.draw(sp_font);
    });
}
/**
 * Prompts the user for a MESMER XML file, and initiates the parsing of the chosen file.
 */
function load() {
    // Before loading a new file, remove existing content and initialise data containers.
    initialise();
    // Create a file input element to prompt the user to select a file.
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = function () {
        if (input.files) {
            for (let i = 0; i < input.files.length; i++) {
                console.log("inputElement.files[" + i + "]=" + input.files[i]);
            }
            let file = input.files[0];
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
                contents += e.target.result;
                if (file != null) {
                    if (start < file.size) {
                        // Read the next chunk
                        let blob = file.slice(start, start + chunkSize);
                        reader.readAsText(blob);
                        start += chunkSize;
                    }
                    else {
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
function parse(xml) {
    console.log("parse: " + xml);
    // Process the XML.
    let xml_mesmer = (0, xml_js_1.getSingularElement)(xml, xml_mesmer_js_1.Mesmer.tagName);
    exports.mesmer = new xml_mesmer_js_1.Mesmer((0, xml_js_1.getAttributes)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName(xml_mesmer_js_1.Title.tagName);
    let title;
    let attributes;
    if (xml_title.length > 0) {
        if (xml_title.length > 1) {
            console.warn('Multiple ' + xml_mesmer_js_1.Title.tagName + ' tags found, using the first.');
        }
        title = xml_title[0].childNodes[0].nodeValue.trim();
        attributes = (0, xml_js_1.getAttributes)(xml_title[0]);
    }
    else {
        title = filename;
        console.warn('No ' + xml_mesmer_js_1.Title.tagName + ' tag found, using the filename: ' + filename + ' as the title.');
        attributes = new Map();
    }
    createTitle(title, attributes);
    // moleculeList.
    let mlDiv = document.getElementById(moleculesDivID);
    let mlDivID = addRID(xml_mesmer_js_1.MoleculeList.tagName);
    // Remove any existing mlDivID HTMLDivElement.
    remove(mlDivID);
    // Create collapsible content.
    let mlcDiv = (0, html_js_1.getCollapsibleDiv)(mlDivID, mlDiv, null, (0, gui_moleculeList_js_1.processMoleculeList)(xml, mIDM, molecules), xml_mesmer_js_1.MoleculeList.tagName, exports.boundary1, exports.level0);
    //document.body.appendChild(mlcDiv);
    // Reaction List.
    let rlDivID = addRID(xml_mesmer_js_1.ReactionList.tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID);
    createReactionList((0, gui_reactionList_js_1.processReactionList)(xml, rIDM, rlDivID, reactions, molecules));
    // Reactions Diagram.
    (0, gui_reactionDiagram_js_1.createReactionDiagram)(rddcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, true);
    // ConditionsList.
    let cdlDiv = document.getElementById(conditionsDivID);
    let cdlDivID = addRID(xml_conditions_js_1.Conditions.tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    remove(cdlDivID);
    // Create collapsible content.
    let cdlcDiv = (0, html_js_1.getCollapsibleDiv)(cdlDivID, cdlDiv, null, (0, gui_ConditionsList_js_1.processConditions)(xml, conditionsIDM, molecules), "ConditionsList", exports.boundary1, exports.level0);
    // ModelParametersList.
    let mplDiv = document.getElementById(modelParametersDivID);
    let mplDivID = addRID(xml_modelParameters_js_1.ModelParameters.tagName, "list");
    // Remove any existing mpDivID HTMLDivElement.
    remove(mplDivID);
    // Create collapsible content.
    let mplcDiv = (0, html_js_1.getCollapsibleDiv)(mplDivID, mplDiv, null, (0, gui_ModelParametersList_js_1.processModelParameters)(xml, mpIDM), "ModelParametersList", exports.boundary1, exports.level0);
    // ControlList.
    let clDiv = document.getElementById(controlDivID);
    let clDivID = addRID(xml_control_js_1.Control.tagName);
    // Remove any existing clDivID HTMLDivElement.
    remove(clDivID);
    // Create collapsible content.
    let controlcDiv = (0, html_js_1.getCollapsibleDiv)(clDivID, clDiv, null, (0, gui_ControlList_js_1.processControl)(xml, controlIDM), "ControlList", exports.boundary1, exports.level0);
    // MetadataList.
    // Check if xml contains metadata.
    if (xml.getElementsByTagName(xml_metadata_js_1.MetadataList.tagName).length > 0) {
        let mdDiv = document.getElementById(metadataListDivID);
        let mdDivID = addRID(xml_metadata_js_1.MetadataList.tagName);
        // Remove any existing mdDivID HTMLDivElement.
        remove(mdDivID);
        // Create collapsible content.
        let mdcDiv = (0, html_js_1.getCollapsibleDiv)(mdDivID, mdDiv, null, processMetadataList(xml), xml_metadata_js_1.MetadataList.tagName, exports.boundary1, exports.level0);
    }
    // Analysis.
    // Check if xml contains analysis.
    if (xml.getElementsByTagName(xml_analysis_js_1.Analysis.tagName).length > 0) {
        let aDiv = document.getElementById(analysisDivID);
        let aDivID = addRID(xml_analysis_js_1.Analysis.tagName);
        // Remove any existing aDivID HTMLDivElement.
        remove(aDivID);
        // Create collapsible content.
        let acDiv = (0, html_js_1.getCollapsibleDiv)(aDivID, aDiv, null, processAnalysis(xml), xml_analysis_js_1.Analysis.tagName, exports.boundary1, exports.level0);
    }
}
/**
 * @param className The className of Elements to update
 * @param optionToRemove The option value to remove.
 */
function removeOptionByClassName(className, optionToRemove) {
    let elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] instanceof HTMLSelectElement) {
            let options = elements[i].options;
            let selectValue = elements[i].value;
            Array.from(options).forEach((option) => {
                if (option.value == optionToRemove) {
                    option.remove();
                    if (selectValue == optionToRemove) {
                        // Create a new event
                        let event = new Event('change');
                        // Dispatch the event
                        elements[i].dispatchEvent(event);
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
function addOptionByClassName(className, optionToAdd) {
    let elements = document.getElementsByClassName(className);
    console.log("n elements with className " + className + "=" + elements.length);
    for (let i = 0; i < elements.length; i++) {
        let select = elements[i];
        if (elements[i] instanceof HTMLSelectElement) {
            let option = document.createElement('option');
            option.value = optionToAdd;
            option.text = optionToAdd;
            select.add(option);
        }
    }
}
/**
 * For adding or removing s_selectOption.
 * @param options The options.
 * @param add If true then a new option is added with an instruction to select another option.
 * If false then this option is removed if it is present.
 */
function addOrRemoveInstructions(options, add) {
    if (add) {
        options.push(exports.s_selectOption);
    }
    else {
        // remove selectOption if present.
        let index = options.indexOf(exports.s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
}
/**
 * Process a numerical variable.
 * @param id The id.
 * @param tIDM The IDManager.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 * @returns A div element.
 */
function processNumber(id, tIDM, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, html_js_1.createFlexDiv)(id, margin);
    let buttonTextContentSelected = name + exports.sy_selected;
    let buttonTextContentDeselected = name + exports.sy_deselected;
    //let idb: string = tIDM.addID(id, name, s_button);
    let idb = (0, util_js_1.getID)(id, name, html_js_1.s_button);
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(exports.s_optionOn);
    button.classList.add(exports.s_optionOff);
    //let inputId: string = tIDM.addID(id, name, s_input)
    let inputId = (0, util_js_1.getID)(id, name, exports.s_input);
    let value = getter();
    if (value == undefined) {
        //remover(name);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(exports.s_optionOn);
    }
    else {
        addNumber(div, inputId, name, value, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(exports.s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            console.log("Adding " + inputId);
            addNumber(div, inputId, name, value, getter, setter, marginComponent);
            // Invoke the setter function.
            let input = div.querySelector(exports.s_input);
            // Enact a change event on input.
            if (value != undefined) {
                input.value = value.toString();
            }
            let event = new Event('change');
            input.dispatchEvent(event);
            //setter;
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing HTMLElement.
            document.getElementById(inputId)?.remove();
            // Remove node.
            //remover();
            remover(name);
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(exports.s_optionOn);
        button.classList.toggle(exports.s_optionOff);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param margin The boundary.
 * @param level The level.
 */
function addNumber(div, id, name, value, getter, setter, margin) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value.toString();
    }
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, html_js_1.createInput)("text", id, margin);
    input.addEventListener('click', (event) => {
        valueString = input.value;
    });
    input.addEventListener('change', (event) => {
        let target = event.target;
        try {
            let value2 = target.value;
            if (value2 == "") {
                value2 = "0";
            }
            setter(new big_js_1.Big(value2));
            console.log(name + " changed from " + valueString + " to " + target.value);
        }
        catch (e) {
            alert("Input invalid, resetting...");
            let value2 = getter();
            if (value2 != undefined) {
                target.value = value2.toString();
            }
        }
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    //setter(new Big(valueString));
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */
function addRemoveButton(div, margin, removeFunction, ...args) {
    let button = (0, html_js_1.createButton)(exports.s_Remove_sy_remove, undefined, margin);
    div.appendChild(button);
    button.addEventListener('click', () => {
        removeFunction(...args);
        div.remove();
        remove(div.id);
    });
    return button;
}
/**
 * Process a string variable.
 * @param id The id.
 * @param iDs The set of IDs to add to.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param remover The remover function.
 * @param marginComponent The margin component.
 * @param margin The margin.
 */
function processString(id, iDs, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, html_js_1.createFlexDiv)(id, margin);
    let buttonTextContentSelected = name + exports.sy_selected;
    let buttonTextContentDeselected = name + exports.sy_deselected;
    let idb = addRID(id, html_js_1.s_button);
    iDs.add(idb);
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(exports.s_optionOn);
    button.classList.add(exports.s_optionOff);
    let inputId = addRID(id, name, exports.s_input);
    iDs.add(inputId);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(exports.s_optionOn);
    }
    else {
        addString(div, inputId, name, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(exports.s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addString(div, inputId, name, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // Remove node.
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(exports.s_optionOn);
        button.classList.toggle(exports.s_optionOff);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param margin The boundary.
 * @param level The level.
 */
function addString(div, id, name, value, setter, margin) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value.toString();
    }
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, html_js_1.createInput)("text", id, margin);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setter(target.value);
        console.log(name + " changed from " + value + " to " + target.value);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById(xmlDivID);
    let xml2DivID = addRID(xmlDivID, 2);
    // Remove any existing mlDivID HTMLDivElement.
    remove(xml2DivID);
    // Create collapsible content.
    let xml2Div = (0, html_js_1.createDiv)(xml2DivID, exports.level1);
    let xmlcDiv = (0, html_js_1.getCollapsibleDiv)(xml2DivID, xmlDiv, null, xml2Div, xmlFilename, exports.boundary1, exports.level0);
    let xmlPre = document.createElement("pre");
    xmlPre.textContent = xml;
    xml2Div.appendChild(xmlPre);
}
/**
 * If there is a choice of units, then a HTMLDivElement is appended containing an HTMLLabelElement and a HTMLSelectElement.
 * If there is no choice of units, a HTMLLabelElement is appended.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param divToAddTo The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @param margin The boundary.
 * @param level The level.
 */
function addAnyUnits(units, attributes, divToAddTo, elementToInsertBefore, id, tagOrDictRef, margin, level) {
    if (units != undefined) {
        let lws = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, margin, level);
        if (lws != undefined) {
            divToAddTo.insertBefore(lws, elementToInsertBefore);
        }
    }
    else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, html_js_1.createLabel)("units " + attributesUnits, level);
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
function getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws = (0, html_js_1.createLabelWithSelect)("units", units, "units", psUnits, id, boundary, level);
        let select = lws.querySelector('select');
        // Set the initial value to the units.
        select.value = psUnits;
        // Add event listener to selectElement.
        (0, html_js_1.resizeSelectElement)(select);
        select.addEventListener('change', (event) => {
            let target = event.target;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
            (0, html_js_1.resizeSelectElement)(target);
        });
        return lws;
    }
    return undefined;
}
/**
 * For getting a positive integer.
 * @param message The message for the user prompt.
 * @returns A positive integer.
 */
function getN(message) {
    let n = 0;
    let nset = false;
    while (!nset) {
        let nString = prompt(message, "0");
        if (nString != null) {
            if ((0, util_js_1.isNumeric)(nString)) {
                n = parseInt(nString);
                if (n > 0) {
                    nset = true;
                }
            }
        }
    }
    return n;
}
/**
 * @param options The options.
 * @param select The select element.
 */
function selectAnotherOptionEventListener(options, select) {
    select.addEventListener('click', (event) => {
        if (options[options.length - 1] == exports.s_selectOption) {
            options.pop();
        }
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == exports.s_selectOption) {
            select.remove(lastIndex);
        }
    });
}
/**
 * Parses xml to initialise metadataList.
 * @param xml The XML document.
 */
function processMetadataList(xml) {
    console.log(xml_metadata_js_1.MetadataList.tagName);
    let mlDiv = (0, html_js_1.createDiv)(addRID(xml_metadata_js_1.MetadataList.tagName, 0), exports.boundary1);
    let xml_mls = xml.getElementsByTagName(xml_metadata_js_1.MetadataList.tagName);
    if (xml_mls.length > 0) {
        if (xml_mls.length > 1) {
            console.warn("More than one MetadataList element - showing the last.");
        }
        let ml = new xml_metadata_js_1.MetadataList((0, xml_js_1.getAttributes)(xml_mls[xml_mls.length - 1]));
        exports.mesmer.setMetadataList(ml);
        function handleElement(tagName, constructor, setter) {
            let xml_elements = xml_mls[xml_mls.length - 1].getElementsByTagName(tagName);
            if (xml_elements.length > 0) {
                if (xml_elements.length == 1) {
                    let s = (0, xml_js_1.getFirstChildNode)(xml_elements[0])?.nodeValue ?? "";
                    let n = new constructor((0, xml_js_1.getAttributes)(xml_elements[0]), s);
                    let cDiv = (0, html_js_1.createDiv)(undefined, exports.level1);
                    mlDiv.appendChild(cDiv);
                    cDiv.appendChild((0, html_js_1.createLabel)(n.tagName + " " + s, exports.boundary1));
                    //console.log(n.tagName + " " + s);
                    setter.call(ml, n);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        handleElement(xml_metadata_js_1.DCSource.tagName, xml_metadata_js_1.DCSource, ml.setSource);
        handleElement(xml_metadata_js_1.DCCreator.tagName, xml_metadata_js_1.DCCreator, ml.setCreator);
        handleElement(xml_metadata_js_1.DCDate.tagName, xml_metadata_js_1.DCDate, ml.setDate);
        handleElement(xml_metadata_js_1.DCContributor.tagName, xml_metadata_js_1.DCContributor, ml.setContributor);
    }
    return mlDiv;
}
/**
 * Parses xml to initialise analysis.
 * @param xml The XML document.
 */
function processAnalysis(xml) {
    console.log(xml_analysis_js_1.Analysis.tagName);
    let aDivID = addRID(xml_analysis_js_1.Analysis.tagName, 0);
    let aDiv = (0, html_js_1.createDiv)(aDivID, exports.boundary1);
    let xml_as = xml.getElementsByTagName(xml_analysis_js_1.Analysis.tagName);
    if (xml_as.length > 0) {
        if (xml_as.length > 1) {
            throw new Error("More than one Analysis element.");
        }
        let a = new xml_analysis_js_1.Analysis((0, xml_js_1.getAttributes)(xml_as[0]));
        exports.mesmer.setAnalysis(a);
        // "me:description".
        let xml_d = xml_as[0].getElementsByTagName(xml_mesmer_js_1.Description.tagName);
        if (xml_d.length > 0) {
            if (xml_d.length == 1) {
                let s = (0, xml_js_1.getFirstChildNode)(xml_d[0])?.nodeValue ?? "";
                let d = new xml_mesmer_js_1.Description((0, xml_js_1.getAttributes)(xml_d[0]), s);
                let dDiv = (0, html_js_1.createDiv)(addRID(aDivID, xml_mesmer_js_1.Description.tagName), exports.level1);
                aDiv.appendChild(dDiv);
                dDiv.appendChild((0, html_js_1.createLabel)(d.tagName + " " + s, exports.boundary1));
                a.setDescription(d);
            }
            else {
                throw new Error("More than one Description element.");
            }
        }
        // "me:eigenvalueList".
        let xml_el = xml_as[0].getElementsByTagName(xml_analysis_js_1.EigenvalueList.tagName);
        // Create a new collapsible div for the EigenvalueLists.
        let elDivID = addRID(aDivID, xml_analysis_js_1.EigenvalueList.tagName);
        let elDiv = (0, html_js_1.createDiv)(elDivID, exports.level1);
        let elcDiv = (0, html_js_1.getCollapsibleDiv)(elDivID, aDiv, null, elDiv, xml_analysis_js_1.EigenvalueList.tagName + "s", exports.boundary1, exports.level1);
        if (xml_el.length > 0) {
            for (let i = 0; i < xml_el.length; i++) {
                let el_attributes = (0, xml_js_1.getAttributes)(xml_el[i]);
                let el = new xml_analysis_js_1.EigenvalueList(el_attributes);
                let labelText = el.tagName + " " + i.toString() + " " + (0, util_js_1.mapToString)(el_attributes);
                // Create a new collapsible div for the EigenvalueList.
                let eDivID = addRID(elDiv.id, i.toString());
                let eDiv = (0, html_js_1.createDiv)(elDivID, exports.level1);
                let ecDiv = (0, html_js_1.getCollapsibleDiv)(eDivID, elDiv, null, eDiv, labelText, exports.boundary1, exports.level0);
                //eDiv.appendChild(createLabel(labelText, boundary1));
                a.addEigenvalueList(el);
                // "me:eigenvalue".
                let evs = [];
                let xml_ei = xml_el[i].getElementsByTagName(xml_analysis_js_1.Eigenvalue.tagName);
                if (xml_ei.length > 0) {
                    for (let j = 0; j < xml_ei.length; j++) {
                        let ev = new big_js_1.Big((0, xml_js_1.getFirstChildNode)(xml_ei[j])?.nodeValue);
                        evs.push(ev);
                        el.addEigenvalue(new xml_analysis_js_1.Eigenvalue((0, xml_js_1.getAttributes)(xml_ei[j]), ev));
                    }
                }
                eDiv.appendChild((0, html_js_1.createLabel)((0, util_js_1.arrayToString)(evs, ", "), exports.boundary1));
            }
        }
        // "me:populationList".
        let xml_pl = xml_as[0].getElementsByTagName(xml_analysis_js_1.PopulationList.tagName);
        // Create a new collapsible div for the PopulationLists.
        let plDivID = addRID(aDivID, xml_analysis_js_1.PopulationList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID, exports.level1);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plDivID, aDiv, null, plDiv, xml_analysis_js_1.PopulationList.tagName + "s", exports.boundary1, exports.level1);
        if (xml_pl.length > 0) {
            // Create a new collapsible div for the PopulationList.
            for (let i = 0; i < xml_pl.length; i++) {
                let pl_attributes = (0, xml_js_1.getAttributes)(xml_pl[i]);
                let T = pl_attributes.get("T") != undefined ? new big_js_1.Big(pl_attributes.get("T")) : exports.big0;
                let conc = pl_attributes.get("conc") != undefined ? new big_js_1.Big(pl_attributes.get("conc")) : exports.big0;
                let pl = new xml_analysis_js_1.PopulationList(pl_attributes);
                let labelText = pl.tagName + " " + i.toString() + " " + (0, util_js_1.mapToString)(pl_attributes);
                let plDivID = addRID(aDiv.id, xml_analysis_js_1.PopulationList.tagName, i.toString());
                // Create a new collapsible div for the EigenvalueList.
                let pDivID = addRID(plDivID, i.toString());
                let pDiv = (0, html_js_1.createDiv)(plDivID, exports.level1);
                let pcDiv = (0, html_js_1.getCollapsibleDiv)(pDivID, plDiv, null, pDiv, labelText, exports.boundary1, exports.level0);
                a.addPopulationList(pl);
                // "me:population".
                //let lt_ref_pop : Map<Big, Map<string, Big>> = new Map(); // Change to calculate the log of the time when creating the plots.
                let t_ref_pop = new Map();
                let refs = [];
                refs.push("time");
                let xml_pn = xml_pl[i].getElementsByTagName(xml_analysis_js_1.Population.tagName);
                if (xml_pn.length > 0) {
                    for (let j = 0; j < xml_pn.length; j++) {
                        let pn_attributes = (0, xml_js_1.getAttributes)(xml_pn[j]);
                        let population = new xml_analysis_js_1.Population(pn_attributes, []);
                        pl.addPopulation(population);
                        let t = pn_attributes.get("time") != undefined ? new big_js_1.Big(pn_attributes.get("time")) : exports.big0;
                        //let lt: Big = pn_attributes.get("logTime") != undefined ? new Big(pn_attributes.get("logTime") as string) : big0; 
                        let ref_pop = new Map();
                        //lt_ref_pop.set(lt, ref_pop);
                        t_ref_pop.set(t, ref_pop);
                        let xml_pop = xml_pn[j].getElementsByTagName(xml_analysis_js_1.Pop.tagName);
                        if (xml_pop.length > 0) {
                            for (let k = 0; k < xml_pop.length; k++) {
                                let pop_attributes = (0, xml_js_1.getAttributes)(xml_pop[k]);
                                let ref = pop_attributes.get("ref");
                                if (j == 0) {
                                    refs.push(ref);
                                }
                                let p = new big_js_1.Big((0, xml_js_1.getFirstChildNode)(xml_pop[k])?.nodeValue);
                                let pop = new xml_analysis_js_1.Pop(pop_attributes, p);
                                population.addPop(pop);
                                ref_pop.set(ref, p);
                            }
                        }
                    }
                }
                // Create graph.
                let graphDiv = (0, html_js_1.createDiv)(addRID(pDivID, s_graph), exports.boundary1);
                pDiv.appendChild(graphDiv);
                let canvas = document.createElement('canvas');
                graphDiv.appendChild(canvas);
                // Create an scatter plot.
                let scatterPlot = new ScatterPlot(canvas, t_ref_pop, sp_font);
                // Add the scatter plot to the collection.
                scatterPlots.push(scatterPlot);
                //scatterPlot.draw();
                // Add a save to PNG button.
                addSaveAsPNGButton(canvas, pDiv, graphDiv, labelText);
                // Create Table.
                let tableDiv = (0, html_js_1.createDiv)(addRID(pDivID, exports.s_table), exports.boundary1);
                pDiv.appendChild(tableDiv);
                let tab = (0, html_js_1.createTable)(addRID(plDivID, exports.s_table), exports.boundary1);
                (0, html_js_1.addTableHeaderRow)(tab, refs);
                t_ref_pop.forEach((ref_pop, t) => {
                    let row = [];
                    row.push(t.toString());
                    ref_pop.forEach((p, ref) => {
                        row.push(p.toString());
                    });
                    (0, html_js_1.addTableRow)(tab, row);
                });
                tableDiv.appendChild(tab);
                // Insert a save as csv button.
                addSaveAsCSVButton(() => tableToCSV(tab), pDiv, tableDiv, labelText, exports.boundary1);
            }
        }
        // me:rateList.
        let xml_rl = xml_as[0].getElementsByTagName(xml_analysis_js_1.RateList.tagName);
        // Create a new collapsible div for the RateLists.
        let rlDivID = addRID(aDivID, xml_analysis_js_1.RateList.tagName);
        let rlDiv = (0, html_js_1.createDiv)(rlDivID, exports.level1);
        let rlcDiv = (0, html_js_1.getCollapsibleDiv)(rlDivID, aDiv, null, rlDiv, xml_analysis_js_1.RateList.tagName + "s", exports.boundary1, exports.level1);
        if (xml_rl.length > 0) {
            for (let i = 0; i < xml_rl.length; i++) {
                let rle_attributes = (0, xml_js_1.getAttributes)(xml_rl[i]);
                let rle_attributesKeys = Array.from(rle_attributes.keys());
                let rle_values = [];
                for (let j = 0; j < rle_attributesKeys.length; j++) {
                    rle_values.push(rle_attributes.get(rle_attributesKeys[j]));
                }
                let rl = new xml_analysis_js_1.RateList(rle_attributes);
                let t = rle_attributes.get("T");
                rl.setTemperature(new big_js_1.Big(t));
                let conc = rle_attributes.get("conc");
                rl.setConcentration(new big_js_1.Big(conc));
                let bathGas = rle_attributes.get("bathGas");
                rl.setBathGas(bathGas);
                let units = rle_attributes.get("units");
                rl.setUnits(units);
                a.addRateList(rl);
                //let labelText: string = rl.tagName + " " + i.toString() + " " + mapToString(rle_attributes);
                let labelText = rl.tagName + " " + i.toString() + " T(" + t + "(K)) conc(" + rle_attributes.get("conc") + "(molec/cm3)) bathGas(" + bathGas + ")";
                // Create a new collapsible div for the RateList.
                let rleDivID = addID(rlDivID, i.toString());
                let rleDiv = (0, html_js_1.createDiv)(rleDivID);
                rlDiv.appendChild(rleDiv);
                let rlecDiv = (0, html_js_1.getCollapsibleDiv)(rleDivID, rlDiv, null, rleDiv, labelText, exports.boundary1, exports.level0);
                let keys;
                let values;
                // "me:firstOrderLoss".
                // Create a new collapsible div for the FirstOrderLosses.
                let folDivID = addID(rleDivID, xml_analysis_js_1.FirstOrderLoss.tagName);
                let folDiv = (0, html_js_1.createDiv)(folDivID);
                rleDiv.appendChild(folDiv);
                let folcDiv = (0, html_js_1.getCollapsibleDiv)(folDivID, rleDiv, null, folDiv, xml_analysis_js_1.FirstOrderLoss.tagName, exports.boundary1, exports.level1);
                let xml_fol = xml_rl[i].getElementsByTagName(xml_analysis_js_1.FirstOrderLoss.tagName);
                let folTable = (0, html_js_1.createTable)(folDivID, exports.boundary1);
                let folTableDiv = (0, html_js_1.createDiv)(addRID(folDivID, exports.s_table), exports.level1);
                folTableDiv.appendChild(folTable);
                folDiv.appendChild(folTableDiv);
                for (let j = 0; j < xml_fol.length; j++) {
                    let fol_attributes = (0, xml_js_1.getAttributes)(xml_fol[j]);
                    if (j == 0) {
                        // header
                        keys = Array.from(fol_attributes.keys());
                        /*
                        let keys2 = Array.from(fol_attributes.keys());
                        // In keys2, replace "ref" to be "reactant/product".
                        keys2 = keys2.map((key) => {
                            if (key == "ref") {
                                return "reactant/product";
                            } else {
                                return key;
                            }
                        });
                        keys2.push("kloss/" + units);
                        addTableHeaderRow(folTable, keys2);
                        */
                        keys.push("kloss/" + units);
                        (0, html_js_1.addTableHeaderRow)(folTable, keys);
                    }
                    values = Array.from(fol_attributes.values());
                    // Check lengths.
                    //if (keys!.length != values!.length) {
                    if (keys.length - 1 != values.length) {
                        console.error("FirstOrderLoss values0!.length != values!.length");
                    }
                    let s = ((0, xml_js_1.getFirstChildNode)(xml_fol[j])?.nodeValue ?? "").trim();
                    let fol = new xml_analysis_js_1.FirstOrderLoss(fol_attributes, new big_js_1.Big(s));
                    rl.addFirstOrderLoss(fol);
                    for (let k = 0; k < keys.length; k++) {
                        // Check reference.
                        if (keys[k] == values[k]) {
                            values.push(fol_attributes.get(values[k]));
                        }
                        else {
                            console.log("FirstOrderLoss values0![k] != values![k]");
                        }
                    }
                    values.push(s);
                    (0, html_js_1.addTableRow)(folTable, values);
                }
                // Insert a save as csv button.
                addSaveAsCSVButton(() => tableToCSV(folTable), folDiv, folTableDiv, "First Order Losses", exports.level1);
                // "me:firstOrderRate".
                // Create a new collapsible div for the FirstOrderRates.
                let forDivID = addID(rleDivID, xml_analysis_js_1.FirstOrderRate.tagName);
                let forDiv = (0, html_js_1.createDiv)(forDivID);
                rleDiv.appendChild(forDiv);
                let forcDiv = (0, html_js_1.getCollapsibleDiv)(forDivID, rleDiv, null, forDiv, xml_analysis_js_1.FirstOrderRate.tagName, exports.boundary1, exports.level1);
                let xml_for = xml_rl[i].getElementsByTagName(xml_analysis_js_1.FirstOrderRate.tagName);
                let forTable = (0, html_js_1.createTable)(forDivID, exports.boundary1);
                let forTableDiv = (0, html_js_1.createDiv)(addRID(forDivID, exports.s_table), exports.level1);
                forTableDiv.appendChild(forTable);
                forDiv.appendChild(forTableDiv);
                for (let j = 0; j < xml_for.length; j++) {
                    let for_attributes = (0, xml_js_1.getAttributes)(xml_for[j]);
                    //let fromRef: string = for_attributes.get("fromRef") as string;
                    //let toRef: string = for_attributes.get("toRef") as string;
                    if (j == 0) {
                        // header
                        keys = Array.from(for_attributes.keys());
                        let keys2 = Array.from(for_attributes.keys());
                        // In keys2, replace "fromRef" to be "reactant" and "toRef" to be "product".
                        keys2 = keys2.map((key) => {
                            if (key == "fromRef") {
                                return "reactant";
                            }
                            else if (key == "toRef") {
                                return "product";
                            }
                            else {
                                return key;
                            }
                        });
                        keys2.push("k/" + units);
                        (0, html_js_1.addTableHeaderRow)(forTable, keys2);
                    }
                    values = Array.from(for_attributes.values());
                    // Check lengths.
                    if (keys.length != values.length) {
                        console.error("FirstOrderLoss values0!.length != values!.length");
                    }
                    let s = ((0, xml_js_1.getFirstChildNode)(xml_for[j])?.nodeValue ?? "").trim();
                    let forate = new xml_analysis_js_1.FirstOrderRate(for_attributes, new big_js_1.Big(s));
                    rl.addFirstOrderRate(forate);
                    for (let k = 0; k < keys.length; k++) {
                        // Check reference.
                        if (keys[k] == values[k]) {
                            values.push(for_attributes.get(values[k]));
                        }
                        else {
                            console.log("FirstOrderRate values0![k] != values![k]");
                        }
                    }
                    values.push(s);
                    (0, html_js_1.addTableRow)(forTable, values);
                }
                // Insert a save as csv button.
                addSaveAsCSVButton(() => tableToCSV(forTable), forDiv, forTableDiv, "First Order Rates", exports.level1);
                // "me:secondOrderRate".
                // Create a new collapsible div for the SecondOrderRates.
                let sorDivID = addID(rleDivID, xml_analysis_js_1.SecondOrderRate.tagName);
                let sorDiv = (0, html_js_1.createDiv)(sorDivID);
                rleDiv.appendChild(sorDiv);
                let sorcDiv = (0, html_js_1.getCollapsibleDiv)(sorDivID, rleDiv, null, sorDiv, xml_analysis_js_1.SecondOrderRate.tagName, exports.boundary1, exports.level1);
                let xml_sor = xml_rl[i].getElementsByTagName(xml_analysis_js_1.SecondOrderRate.tagName);
                let sorTable = (0, html_js_1.createTable)(sorDivID, exports.boundary1);
                let sorTableDiv = (0, html_js_1.createDiv)(addRID(sorDivID, exports.s_table), exports.level1);
                sorTableDiv.appendChild(sorTable);
                sorDiv.appendChild(sorTableDiv);
                for (let j = 0; j < xml_sor.length; j++) {
                    let sor_attributes = (0, xml_js_1.getAttributes)(xml_sor[j]);
                    //let fromRef: string = sor_attributes.get("fromRef") as string;
                    //let toRef: string = sor_attributes.get("toRef") as string;
                    if (j == 0) {
                        // header
                        keys = Array.from(sor_attributes.keys());
                        let keys2 = Array.from(sor_attributes.keys());
                        // In keys2, replace "fromRef" to be "reactant" and "toRef" to be "product".
                        keys2 = keys2.map((key) => {
                            if (key == "fromRef") {
                                return "reactant";
                            }
                            else if (key == "toRef") {
                                return "product";
                            }
                            else {
                                return key;
                            }
                        });
                        keys2.push("k/cm3molecule-1" + units);
                        (0, html_js_1.addTableHeaderRow)(sorTable, keys2);
                    }
                    values = Array.from(sor_attributes.values());
                    // Check lengths.
                    if (keys.length != values.length) {
                        console.error("SecondOrderRate values0!.length != values!.length");
                    }
                    let s = ((0, xml_js_1.getFirstChildNode)(xml_sor[j])?.nodeValue ?? "").trim();
                    let sorate = new xml_analysis_js_1.SecondOrderRate(sor_attributes, new big_js_1.Big(s));
                    rl.addSecondOrderRate(sorate);
                    for (let k = 0; k < keys.length; k++) {
                        // Check reference.
                        if (keys[k] == values[k]) {
                            values.push(sor_attributes.get(values[k]));
                        }
                        else {
                            console.log("SecondOrderRate values0![k] != values![k]");
                        }
                    }
                    values.push(s);
                    (0, html_js_1.addTableRow)(sorTable, values);
                }
                // Insert a save as csv button.
                addSaveAsCSVButton(() => tableToCSV(sorTable), sorDiv, sorTableDiv, "Second Order Rates", exports.level1);
            }
        }
    }
    return aDiv;
}
/**
 * A class for creating a scatter plot.
 */
class ScatterPlot {
    canvas;
    data;
    constructor(canvas, data, font) {
        this.canvas = canvas;
        this.data = data;
        // Create a new scatter plot.
        this.draw(font);
    }
    /**
     * Draw the scatter plot.
     */
    draw(font) {
        this.canvas.width = 800; // Set the width of the canvas
        this.canvas.height = 400; // Set the height of the canvas
        const ctx = this.canvas.getContext("2d");
        //const ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;        
        ctx.font = font;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas.
        let width = this.canvas.width;
        let height = this.canvas.height;
        let xMin = Number.MAX_VALUE;
        let xMax = Number.MIN_VALUE;
        //let yMin: number = Number.MAX_VALUE;
        //let yMax: number = Number.MIN_VALUE;
        let yMin = 0;
        let yMax = 1;
        let maxRefWidth = 0;
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
        let yTicks = 2;
        let yTickSpacing = 1;
        let maxTickLabelWidth = 0;
        for (let i = 0; i < yTicks; i++) {
            let yTick = 1 - i * yTickSpacing;
            let tickLabelWidth = ctx.measureText(yTick.toString()).width;
            maxTickLabelWidth = Math.max(maxTickLabelWidth, tickLabelWidth);
        }
        // Calculate the height of the largest tick label
        let metrics = ctx.measureText('0');
        let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let xmargin = (th * 4);
        // Set the margin based on the width of the largest tick label
        let ymargin = maxTickLabelWidth + th + 20; // Add 20 for some extra space
        let x0 = ymargin;
        let y0 = height - (ymargin + (th * 3));
        let x1 = width - (xmargin + maxRefWidth + 20);
        let y1 = xmargin;
        let xScale = (x1 - x0) / (xMax - xMin);
        let yScale = (y1 - y0) / (yMax - yMin);
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
        let refToColor = new Map();
        // Draw data points.
        this.data.forEach((ref_pop, x) => {
            // Define a reference id for each color
            let i = 0;
            ref_pop.forEach((p, ref) => {
                let logx = Math.log10(x.toNumber());
                let xPixel = x0 + ((logx - xMin) * xScale);
                let pn = p.toNumber();
                if (pn < 1) {
                    let yPixel = y0 + ((pn - yMin) * yScale);
                    if (yPixel > 0) {
                        ctx.beginPath();
                        ctx.arc(xPixel, yPixel, 2, 0, 2 * Math.PI); // Points
                        // Use the ref index to select a color
                        let color = colors[i % colors.length];
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
        let xLabel = "log10(time/secs)";
        ctx.fillText(xLabel, x0 + (x1 - x0) / 2, y0 + xmargin / 2);
        // Draw y-axis labels.
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        let yLabel = "fractional population";
        ctx.fillText(yLabel, -y0 - (y1 - y0) / 2, x0 - ymargin);
        ctx.restore();
        // Draw x-axis ticks.
        let xrange = xMax - xMin;
        //console.log("xrange=" + xrange);
        let orderOfMagnitude = Math.floor(Math.log10(xrange));
        //console.log("orderOfMagnitude=" + orderOfMagnitude);
        let xTickSpacing = Math.abs(Math.ceil(xrange / Math.pow(10, orderOfMagnitude)));
        //console.log("xTickSpacing=" + xTickSpacing);
        let i = Math.ceil(xMin / xTickSpacing);
        let xTick = i * xTickSpacing;
        ;
        // Draw x-axis ticks > 0.
        while (xTick < xMax) {
            //console.log("xTick=" + xTick);
            let xPixel = x0 + ((xTick - xMin) * xScale); // Convert xTick to pixel scale
            ctx.beginPath();
            ctx.moveTo(xPixel, y0);
            ctx.lineTo(xPixel, y0 + 5);
            ctx.stroke();
            ctx.fillText(xTick.toString(), xPixel, y0 + 5);
            xTick += xTickSpacing;
        }
        // Draw y-axis ticks.
        for (let i = 0; i < yTicks; i++) {
            let yTick = y0 - i * yTickSpacing;
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
function tableToCSV(t) {
    let csv = "";
    let rows = t.rows;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.cells;
        for (let j = 0; j < cells.length; j++) {
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
function saveDataAsFile(data, dataType, filename, isDataURL = false) {
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
function saveXML() {
    if (exports.mesmer == null) {
        alert("No Mesmer object to save.");
        return;
    }
    else {
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
        let mesmerOrdered = new xml_mesmer_js_1.Mesmer(exports.mesmer.attributes);
        mesmerOrdered.setTitle(exports.mesmer.getTitle());
        if (molecules != undefined) {
            mesmerOrdered.setMoleculeList(new xml_mesmer_js_1.MoleculeList(new Map(), Array.from(molecules.values())));
        }
        if (reactions != undefined) {
            mesmerOrdered.setReactionList(new xml_mesmer_js_1.ReactionList(new Map(), Array.from(reactions.values())));
        }
        if (exports.mesmer.getConditionss() != undefined) {
            mesmerOrdered.setConditionss(exports.mesmer.getConditionss());
        }
        if (exports.mesmer.getModelParameterss() != undefined) {
            mesmerOrdered.setModelParameterss(exports.mesmer.getModelParameterss());
        }
        if (exports.mesmer.getControls() != undefined) {
            mesmerOrdered.setControls(exports.mesmer.getControls());
        }
        let mdl = exports.mesmer.getMetadataList();
        if (mdl != undefined) {
            mesmerOrdered.setMetadataList(mdl);
        }
        let analysis = exports.mesmer.getAnalysis();
        if (analysis != undefined) {
            mesmerOrdered.setAnalysis(analysis);
        }
        console.log("saveXML");
        const pad = "  ";
        let xmlData = xml_mesmer_js_1.Mesmer.header + mesmerOrdered.toXML(pad, "");
        let title = mesmerOrdered.getTitle()?.value;
        saveDataAsFile(xmlData, 'text/xml', getFilename(title) + ".xml");
    }
}
/**
 * Convert name into a filename.
 */
function getFilename(name) {
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
function addSaveAsPNGButton(canvas, divToAddTo, elementToInsertBefore, name) {
    // Add a save button to save the canvas as an image.
    let saveButtonID = addRID(divToAddTo.id, 'saveButton');
    let saveButton = (0, html_js_1.createButton)("Save as PNG", saveButtonID, exports.boundary1);
    if (elementToInsertBefore != null) {
        divToAddTo.insertBefore(saveButton, elementToInsertBefore);
    }
    else {
        divToAddTo.appendChild(saveButton);
    }
    saveButton.addEventListener('click', () => {
        let dataURL = canvas.toDataURL();
        let title = exports.mesmer.getTitle()?.value;
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
function addSaveAsCSVButton(toCSV, divToAddTo, elementToInsertBefore, name, margin) {
    let bID = addRID(divToAddTo.id, html_js_1.s_button, exports.s_save);
    let b = (0, html_js_1.createButton)("Save as CSV", bID, margin);
    divToAddTo.insertBefore(b, elementToInsertBefore);
    b.addEventListener('click', () => {
        let csv = toCSV();
        let title = exports.mesmer.getTitle()?.value;
        let fn = getFilename(title + "_" + name) + ".csv";
        saveDataAsFile(csv, 'text/csv', fn);
        console.log("Saved " + fn);
    });
}
/**
 * Set a number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */
function setNumberNode(node, input) {
    try {
        let value = new big_js_1.Big(input.value);
        //node.setValue(value);
        node.value = value;
    }
    catch (e) {
        alert("Value invalid, resetting...");
    }
    input.value = node.value.toString();
}
//# sourceMappingURL=app.js.map