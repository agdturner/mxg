"use strict";
//import { openDB } from 'idb';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNumberNode = exports.setNumberArrayNode = exports.getMolecule = void 0;
const util_js_1 = require("./util.js");
const xml_js_1 = require("./xml.js");
const molecule_js_1 = require("./molecule.js");
const reaction_js_1 = require("./reaction.js");
const util_js_2 = require("./util.js");
const html_js_1 = require("./html.js");
const canvas_js_1 = require("./canvas.js");
const conditions_js_1 = require("./conditions.js");
const modelParameters_js_1 = require("./modelParameters.js");
const control_js_1 = require("./control.js");
const mesmer_js_1 = require("./mesmer.js");
const big_js_1 = __importDefault(require("big.js"));
const analysis_js_1 = require("./analysis.js");
const metadata_js_1 = require("./metadata.js");
const defaults_js_1 = require("./defaults.js");
const librarymols_js_1 = require("./librarymols.js");
//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library
/**
 * The filename of the MESMER XML file.
 */
let filename;
/**
 * MXG.
 */
let mxg_url = "https://github.com/agdturner/mxg-pwa";
let mxg_a = document.createElement('a');
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;
/**
 * Example data.
 */
let mxgDataExamples_url = "https://github.com/agdturner/mxg-pwa/tree/main/data/examples";
let mxgDataExamples_a = document.createElement('a');
mxgDataExamples_a.href = mxgDataExamples_url;
mxgDataExamples_a.textContent = mxgDataExamples_url;
/**
 * MESMER.
 */
//let mesmer_url: string = "https://sourceforge.net/projects/mesmer/";
let mesmer_url = "https://github.com/MESMER-kinetics/MESMER-code";
let mesmer_a = document.createElement('a');
mesmer_a.href = mesmer_url;
mesmer_a.textContent = mesmer_url;
/**
 * EPSRC.
 */
let epsrc_url = "https://epsrc.ukri.org/";
let epsrc_a = document.createElement('a');
epsrc_a.href = epsrc_url;
epsrc_a.textContent = "The UK Engineering and Physical Sciences Research Council (EPSRC)";
/**
 * University of Leeds
 */
let uol_url = "https://www.leeds.ac.uk/";
let uol_a = document.createElement('a');
uol_a.href = uol_url;
uol_a.textContent = "The University of Leeds";
/**
 * 3DMol.
 */
let t3Dmol_url = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement('a');
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;
let t3Dmol_citation_url = "http://doi.org/10.1093/bioinformatics/btu829";
let t3Dmol_citation_a = document.createElement('a');
t3Dmol_citation_a.href = t3Dmol_citation_url;
t3Dmol_citation_a.textContent = "doi:10.1093/bioinformatics/btu829";
/**
 * Big.js.
 */
let bigjs_url = "https://mikemcl.github.io/big.js/";
let bigjs_a = document.createElement('a');
bigjs_a.href = bigjs_url;
bigjs_a.textContent = bigjs_url;
// Set the number toString() format for Big.js. The default is Big.PE = 21, so this change means that Big numbers
// with an order of magnitude of greater than 6 (e.g. 1000000) are presented as 1.0e+7.
big_js_1.default.PE = 7;
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
let level0 = { marginLeft: s_0px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
let level1 = { marginLeft: s_25px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
let boundary1 = { marginLeft: s_1px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_1px };
/**
 * Symbology for the GUI.
 */
// Symbols.
const sy_edit = "\u270E"; // ✎
const sy_add = "\uFF0B"; // ＋
const sy_remove = "\u2715"; // ✕
//const sy_refresh: string = "\u27F3"; // ⟳
const sy_selected = " \u2713"; // ✓
const sy_deselected = " \u2717"; // ✗
// Strings.
const s_Add_sy_add = "Add " + sy_add;
const s_Add_from_spreadsheet = "Add from spreadsheet " + sy_add;
const s_Add_from_library = "Add from library " + sy_add;
const s_analysis = "analysis";
const s_conditions = "conditions";
const s_container = "container";
const s_control = "control";
const s_description = "description";
const s_graph = "graph";
const s_menu = "menu";
const s_metadata = "metadata";
const s_modelParameters = "modelParameters";
const s_molecules = "molecules";
const s_input = "input";
const s_optionOn = 'optionOn';
const s_optionOff = 'optionOff';
const s_reactions = "reactions";
const s_reactionsDiagram = "reactionsDiagram";
const s_Remove_sy_remove = "Remove " + sy_remove;
const s_save = "save";
//const s_select: string = "select";
const s_selectOption = "Select an option (use keys to cycle through options)...";
const s_table = "table";
const s_title = "title";
const s_textarea = "textarea";
const s_undefined = "undefined";
const s_units = "units";
const s_xml = "xml";
const s_welcome = "welcome";
/**
 * allIDs is a set of all IDs used in the GUI.
 * This is used to ensure that all IDs are unique.
 * If an ID is not unique, an error is thrown.
 */
const allIDs = new Set();
/**
 * A set of all IDs to be removed when loading a MESMER file.
 */
const rIDs = new Set();
/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */
function addID(...parts) {
    let validID = (0, util_js_1.getID)(...parts);
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
const menuDivID = addID(s_menu);
const titleDivID = addID(s_title);
const moleculesDivID = addID(s_molecules);
const reactionsDivID = addID(s_reactions);
const reactionsDiagramDivID = addID(s_reactionsDiagram);
const conditionsDivID = addID(s_conditions);
const modelParametersDivID = addID(s_modelParameters);
const controlDivID = addID(s_control);
const metadataListDivID = addID(s_metadata);
const analysisDivID = addID(s_analysis);
const xmlDivID = addID(s_xml);
const welcomeDivID = addID(s_welcome);
// For dark/light mode.
let dark;
// Numbers
const big0 = new big_js_1.default(0);
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
    removeID(iD) {
        rIDs.delete(iD);
        allIDs.delete(iD);
    }
    /**
     * Removes the IDs.
     * @param iD The ID key for the IDs to remove.
     */
    removeIDs(iD) {
        this.ids.get(iD).forEach(id => {
            console.log("remove id " + id);
            rIDs.delete(id);
            allIDs.delete(id);
        });
        this.ids.delete(iD);
    }
}
/**
 * For conditions ID management.
 */
let conditionsIDs = new IDManager();
/**
 * For modelParameters ID management.
 */
let modelParametersIDs = new IDManager();
/**
 * For control ID management.
 */
let controlIDs = new IDManager();
/**
 * For mesmer.
 */
let mesmer;
/**
 * For the defaults loaded from defaults.xml.
 */
let defaults;
/**
 * For storing molecules loaded from files.
 */
let libmols = new Map();
/**
 * A map of molecules with id as key and Molecule as value.
 * If a molecule is removed, it is not deleted from the map.
 */
let molecules;
/**
 * Get the keys of the molecules. The keys are a composite of the molecule ID and the index.
 * @returns The keys of the molecules.
 */
function getMoleculeKeys(molecules) {
    let keys = new Set();
    molecules.forEach((v, k) => {
        keys.add(v.getID() + "-" + k.toString());
    });
    return keys;
}
/**
 * This returns the first molecule found with the given id.
 * @param id The id of the molecule.
 * @returns The first molecule with the id attribute value equal to id.
 */
function getMolecule(id) {
    molecules.forEach((v, k) => {
        if (v.getID() == id) {
            return v;
        }
    });
    return null;
}
exports.getMolecule = getMolecule;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */
let reactions;
/**
 * For storing any scatter plots.
 */
let scatterPlots;
// IDs for the reactions diagram.
const s_Reactions_Diagram = "Reactions Diagram";
const rdDivID = addRID(s_Reactions_Diagram);
const rdcID = addRID(rdDivID, "Canvas");
//let rd_canvas_width: number = 800;
let rdcHeight = 400;
let rd_lw = 4;
let rd_lwc = 2;
let rd_font = "1em SensSerif";
let rdWindow;
// Scatterplot font.
let sp_font = "2em SensSerif";
/**
 * Once the DOM is loaded, add a menu and welcome text.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Update the page styles based on the user's preference.
    document.body.className = dark ? 'dark-mode' : 'light-mode';
    /* It is not allowed to use localStorage with a Service Worker!
    let darkModePreference = localStorage.getItem('darkMode');
    dark = (darkModePreference === 'true');
    console.log("dark=" + dark);
    */
    // Update the page styles based on the user's preference.
    document.body.className = dark ? 'dark-mode' : 'light-mode';
    // Create Menu.
    let menuDiv = document.getElementById(menuDivID);
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';
    // Add Load Molecules button.
    let s_Load_Molecules = 'Load Molecules';
    let lmb = (0, html_js_1.createButton)(s_Load_Molecules, addID(s_Load_Molecules), boundary1);
    menuDiv.appendChild(lmb);
    let lm = new librarymols_js_1.LibraryMolecules();
    lmb.addEventListener('click', async (event) => {
        let ms = await lm.readFile();
        // Add the molecules to the libmols map.
        ms.forEach((v, k) => {
            libmols.set(libmols.size, v);
        });
    });
    // Add Load Defaults button.
    let s_Load_Defaults = 'Load Defaults';
    let ldb = (0, html_js_1.createButton)(s_Load_Defaults, addID(s_Load_Defaults), boundary1);
    ldb.addEventListener('click', (event) => {
        defaults = new defaults_js_1.Defaults();
        defaults.readFile();
    });
    menuDiv.appendChild(ldb);
    // Add Load MESMER File button.
    let s_Load = 'Load MESMER File';
    let lb = (0, html_js_1.createButton)(s_Load, addID(s_Load), boundary1);
    lb.addEventListener('click', (event) => {
        load();
    });
    menuDiv.appendChild(lb);
    // Add style/theme option buttons.
    // Add Increase Fontsize button.
    let s_Increase_Fontsize = 'Increase Fontsize';
    let increaseFontSizeButton = (0, html_js_1.createButton)(s_Increase_Fontsize, addID(s_Increase_Fontsize), boundary1);
    increaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
        }
        redrawReactionsDiagram();
        redrawScatterPlots();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Add Decrease Fontsize button.
    let s_Decrease_Fontsize = 'Decrease Fontsize';
    let decreaseFontSizeButton = (0, html_js_1.createButton)(s_Decrease_Fontsize, addID(s_Decrease_Fontsize), boundary1);
    decreaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize - 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
        }
        redrawReactionsDiagram();
        redrawScatterPlots();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Add Light/Dark Mode button.
    let s_Light_Dark_Mode = 'Light/Dark Mode';
    let lightDarkModeButton = (0, html_js_1.createButton)(s_Light_Dark_Mode, addID(s_Light_Dark_Mode), boundary1);
    lightDarkModeButton.addEventListener('click', () => {
        dark = !dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if (dark) {
            document.body.className = 'dark-mode';
        }
        else {
            document.body.className = 'light-mode';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    // Add Save To MESMER File button.
    let s_Save_MESMER_File = 'Save MESMER File';
    let saveButton = (0, html_js_1.createButton)(s_Save_MESMER_File, addID(s_Save_MESMER_File), boundary1);
    saveButton.addEventListener('click', saveXML);
    menuDiv.appendChild(saveButton);
    // Welcome Text.
    let wDiv = document.getElementById(welcomeDivID);
    document.body.appendChild(wDiv);
    // p1.
    let p1 = document.createElement('p');
    wDiv.appendChild(p1);
    p1.appendChild(document.createTextNode('Welcome to the MESMER XML GUI (MXG) - a free and open source program to assist \
        in creating, editing and visualising MESMER program data for gas phase reaction kinetics. The current MXG development \
        repository is: '));
    p1.appendChild(mxg_a);
    p1.appendChild(document.createTextNode('. Details of MESMER - the Master Equation Solver for Multi Energy-well Reactions \
        can be found at: '));
    p1.appendChild(mesmer_a);
    p1.appendChild(document.createTextNode('.'));
    // p2.
    let p2 = document.createElement('p');
    wDiv.appendChild(p2);
    p2.appendChild(document.createTextNode('MXG is being developed by a team based at '));
    p2.appendChild(uol_a);
    p2.appendChild(document.createTextNode(' funded by '));
    p2.appendChild(epsrc_a);
    p2.appendChild(document.createTextNode('. MXG is a work in progress. Developers are reporting known issues and testing and \
        documenting the program ahead of a version 1.0 community supported release. Whilst the program may have some utility \
        as is and may save MESMER users some time for specific usage scenarios, there are other usage scenarios that it is \
        currently not suitable for. Like MESMER itself, MXG development aims to be driven in part by users helping to document \
        issues, help prioritise feature requests, and submitting patches and pull requests as is normal for openly developed \
        research software.'));
    //p2.appendChild(document.createTextNode(' Work was carried out under the follwoing grants (...).'));
    // p3.
    let p3 = document.createElement('p');
    wDiv.appendChild(p3);
    p3.appendChild(document.createTextNode('MXG runs on on the latest Firefox, Chrome, Edge or Safari Web browsers. It can \
        be used offline if installed as a Progressive Web App (PWA). PWA installation varies by Web browser and device, it \
        should only require user permission and is effectively a form of Web browser bookmark. For guidance please see the \
        MXG main development repository README: '));
    p3.appendChild(mxg_a.cloneNode(true));
    p3.appendChild(document.createTextNode('. MXG may work on small screen devices, but it is recommended to use a device \
        with at least a standard laptop sized screen.'));
    // p4.
    let p4 = document.createElement('p');
    wDiv.appendChild(p4);
    p4.appendChild(document.createTextNode('The Menu contains 7 buttons. The Load MESMER File button is for loading a \
        MESMER XML data file with a "me:mesmer" tag containing: "me:title", "moleculeList", "reactionList", \
        "me:conditions", "me:modelParameters", and "me:control" tags containing further details. A MESMER XML output \
        data file will also have "me:metadataList" and "me:analysis" tags as children of the "me:mesmer" tag. Additional \
        output is located in "moleculeList" and "reactionList" tags. The Load Molecules button is for loading molecule \
        data for selection, modification and for inclusion in saved MESMER files. The Load Defaults button is to load \
        default values. Whilst not necessary, loading defaults is for convenience, as often similar values and the same \
        units as defaults are wanted for specified variables. The Save MESMER File button is for saving a new MESMER XML \
        data file. The file should be saved to the Web browser downloads location. It should contain no comments or extra \
        white space between XML tags with the exception of new lines, tag values should be trimmed of white space, \
        numbers should be output in a particular format (decimals - where numbers with more than 8 digits are output in \
        scientific notation format). There should be: a single "atomArray" tag containing all "atom" tags (each atom \
        should have a unique id attribute); a single "bondArray" tag containing any "bond" tags (each bond should have a \
        unique id attribute); and, a single "propertyList" tag containing all "property" tags for each "molecule" tag in \
        the "moleculeList". The saved file should reflect what is specified via the interface. Between the Load and Save \
        buttons are buttons to increase or decrease the fontsize and to change between a light and dark theme. In \
        addition to increasing or decreasing the fontsize of text elements, the fontsize buttons can be actioned to \
        redraw the reaction diagram and any species plots with a larger or smaller fontsize respectively.'));
    // p5.
    let p5 = document.createElement('p');
    wDiv.appendChild(p5);
    p5.appendChild(document.createTextNode('The "me:title" value is presented in an input alongside an associated label. \
        The input can be used to change the value which is also used to compose filenames for files saved from MXG. \
        Details are presented via buttons which contain a triangular symbol. A triangle orientated with a point down: '
        + html_js_1.sy_downTriangle + ' can be actioned to show more details (if there are any). A triangle orientated with a point \
        up: ' + html_js_1.sy_upTriangle + ' can be actioned to hide those details again.'));
    // p6.
    let p6 = document.createElement('p');
    wDiv.appendChild(p6);
    p6.textContent = 'The Reaction Diagram button shows/hides a well diagram which is redrawn if any molecule "me:ZPE" \
        property value is changed. The diagram can be opened in a new Window and saved to a PNG format file.';
    // p7.
    let p7 = document.createElement('p');
    wDiv.appendChild(p7);
    p7.textContent = 'MXG uses 3DMol.js under a BSD-3-Clause licence to visualise molecules with coordinates. For details \
        of 3DMol.js please see the GitHub repository: ';
    p7.appendChild(t3Dmol_a);
    p7.appendChild(document.createTextNode('. If you use the 3DMol.js visualisations, please cite: Nicholas Rego and \
        David Koes 3Dmol.js: molecular visualization with WebGL Bioinformatics (2015) 31 (8): 1322-1324 '));
    p7.appendChild(t3Dmol_citation_a);
    p7.appendChild(document.createTextNode('.'));
    // p8.
    let p8 = document.createElement('p');
    wDiv.appendChild(p8);
    p8.textContent = 'MXG uses Big.js under an MIT licence to handle numbers. For details of Big.js please see the GitHub \
        repository: ';
    p8.appendChild(bigjs_a);
    p8.appendChild(document.createTextNode('.'));
});
/**
 * Redraw the reactions diagram.
 */
function redrawReactionsDiagram() {
    if (rdWindow == null) {
        let rdCanvas = document.getElementById(rdcID);
        drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    }
    else {
        let c = rdWindow.document.getElementById(rdcID);
        drawReactionDiagram(c, dark, rd_font, rd_lw, rd_lwc);
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
    let xml_mesmer = (0, xml_js_1.getSingularElement)(xml, mesmer_js_1.Mesmer.tagName);
    mesmer = new mesmer_js_1.Mesmer((0, xml_js_1.getAttributes)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName(mesmer_js_1.Title.tagName);
    let title;
    let attributes;
    if (xml_title.length > 0) {
        if (xml_title.length > 1) {
            console.warn('Multiple ' + mesmer_js_1.Title.tagName + ' tags found, using the first.');
        }
        title = xml_title[0].childNodes[0].nodeValue.trim();
        attributes = (0, xml_js_1.getAttributes)(xml_title[0]);
    }
    else {
        title = filename;
        console.warn('No ' + mesmer_js_1.Title.tagName + ' tag found, using the filename: ' + filename + ' as the title.');
        attributes = new Map();
    }
    let titleNode = new mesmer_js_1.Title(attributes, title);
    mesmer.setTitle(titleNode);
    let titleDiv = document.getElementById(titleDivID);
    let lwiId = addRID('titleDiv');
    // Remove any existing lwiId HTMLDivElement.
    remove(lwiId);
    // Create input element.
    let lwi = (0, html_js_1.createLabelWithInput)("text", addRID(lwiId, s_input), boundary1, level0, (event) => {
        let target = event.target;
        titleNode.value = target.value;
        console.log(titleNode.tagName + " changed to " + titleNode.value);
        (0, html_js_1.resizeInputElement)(target);
    }, title, mesmer_js_1.Title.tagName);
    lwi.id = lwiId;
    titleDiv.appendChild(lwi);
    // Molecules.
    let mlDiv = document.getElementById(moleculesDivID);
    let mlDivID = addRID(mesmer_js_1.MoleculeList.tagName);
    // Remove any existing mlDivID HTMLDivElement.
    remove(mlDivID);
    // Create collapsible content.
    let mlcDiv = (0, html_js_1.getCollapsibleDiv)(mlDivID, mlDiv, null, processMoleculeList(xml), mesmer_js_1.MoleculeList.tagName, boundary1, level0);
    //document.body.appendChild(mlcDiv);
    // Reactions.
    let rlDiv = document.getElementById(reactionsDivID);
    let rlDivID = addRID(mesmer_js_1.ReactionList.tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID);
    // Create collapsible content.
    let rlcDiv = (0, html_js_1.getCollapsibleDiv)(rlDivID, rlDiv, null, processReactionList(xml), mesmer_js_1.ReactionList.tagName, boundary1, level0);
    // Reactions Diagram.
    let rddDiv = document.getElementById(reactionsDiagramDivID);
    let rdDivID = addRID(s_Reactions_Diagram);
    // Destroy any existing rdWindow.
    if (rdWindow != null) {
        rdWindow.close();
        rdWindow = null;
    }
    // If rdDiv already exists, remove it.
    remove(rdDivID);
    // Create collapsible content.
    let rdDiv = (0, html_js_1.createDiv)(undefined, level1);
    let rdcDiv = (0, html_js_1.getCollapsibleDiv)(rdDivID, rddDiv, null, rdDiv, s_Reactions_Diagram, boundary1, level0);
    // Create a pop diagram button in its own div.
    let bDivId = addRID(rdDivID, html_js_1.s_button + 's');
    //remove(popButtonDivId);
    let bDiv = (0, html_js_1.createDiv)(bDivId);
    rdDiv.appendChild(bDiv);
    let pbID = addRID(bDivId, html_js_1.s_button);
    let popOutText = "Pop into a new Window";
    let pb = (0, html_js_1.createButton)(popOutText, pbID);
    bDiv.appendChild(pb);
    let rdCanvas = document.createElement('canvas');
    rdCanvas.id = rdcID;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdcHeight;
    rdCanvas.style.border = "1px solid black";
    //rdCanvas.style.margin = "1px";
    drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    // Add action listener to the pop diagram button.
    pb.addEventListener('click', () => {
        //if (rdWindow == null || rdWindow.closed) {
        if (rdWindow == null) {
            let popWindowRDCanvas = document.createElement('canvas');
            popWindowRDCanvas.id = rdcID;
            rdWindow = window.open("", s_Reactions_Diagram, "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            rdWindow.document.body.appendChild(popWindowRDCanvas);
            drawReactionDiagram(popWindowRDCanvas, dark, rd_font, rd_lw, rd_lwc);
            remove(rdcID);
            pb.textContent = "Pop into this Window";
        }
        else {
            rdCanvas = document.createElement('canvas');
            rdCanvas.id = rdcID;
            rdDiv.appendChild(rdCanvas);
            drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
            rdWindow.close();
            rdWindow = null;
            pb.textContent = popOutText;
        }
    });
    addSaveAsPNGButton(rdCanvas, bDiv, null, s_Reactions_Diagram);
    // Conditions.
    let cdlDiv = document.getElementById(conditionsDivID);
    let cdlDivID = addRID(conditions_js_1.Conditions.tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    remove(cdlDivID);
    // Create collapsible content.
    let cdlcDiv = (0, html_js_1.getCollapsibleDiv)(cdlDivID, cdlDiv, null, processConditions(xml), "ConditionsList", boundary1, level0);
    // Model Parameters.
    let mplDiv = document.getElementById(modelParametersDivID);
    let mplDivID = addRID(modelParameters_js_1.ModelParameters.tagName, "list");
    // Remove any existing mpDivID HTMLDivElement.
    remove(mplDivID);
    // Create collapsible content.
    let mplcDiv = (0, html_js_1.getCollapsibleDiv)(mplDivID, mplDiv, null, processModelParameters(xml), "ModelParametersList", boundary1, level0);
    // Control.
    let clDiv = document.getElementById(controlDivID);
    let clDivID = addRID(control_js_1.Control.tagName);
    // Remove any existing clDivID HTMLDivElement.
    remove(clDivID);
    // Create collapsible content.
    let controlcDiv = (0, html_js_1.getCollapsibleDiv)(clDivID, clDiv, null, processControl(xml), "ControlList", boundary1, level0);
    // MetadataList.
    let mdDiv = document.getElementById(metadataListDivID);
    let mdDivID = addRID(metadata_js_1.MetadataList.tagName);
    // Remove any existing mdDivID HTMLDivElement.
    remove(mdDivID);
    // Create collapsible content.
    let mdcDiv = (0, html_js_1.getCollapsibleDiv)(mdDivID, mdDiv, null, processMetadataList(xml), metadata_js_1.MetadataList.tagName, boundary1, level0);
    // Analysis.
    let aDiv = document.getElementById(analysisDivID);
    let aDivID = addRID(analysis_js_1.Analysis.tagName);
    // Remove any existing aDivID HTMLDivElement.
    remove(aDivID);
    // Create collapsible content.
    let acDiv = (0, html_js_1.getCollapsibleDiv)(aDivID, aDiv, null, processAnalysis(xml), analysis_js_1.Analysis.tagName, boundary1, level0);
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml) {
    // Initialise molecules.
    molecules = new Map();
    // Create div to contain the molecules list.
    let mlDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    // Get the XML "moleculeList" element.
    let xml_ml = (0, xml_js_1.getSingularElement)(xml, mesmer_js_1.MoleculeList.tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let mlTagNames = new Set();
    xml_ml.childNodes.forEach(function (node) {
        mlTagNames.add(node.nodeName);
    });
    if (mlTagNames.size != 1) {
        if (!(mlTagNames.size == 2 && mlTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            mlTagNames.forEach(x => console.error(x));
            console.warn("Additional tag names in moleculeList:");
        }
    }
    if (!mlTagNames.has(molecule_js_1.Molecule.tagName)) {
        console.warn("Expecting tags with \"" + molecule_js_1.Molecule.tagName + "\" tagName but there are none!");
        return mlDiv;
    }
    // Process the XML "molecule" elements.
    let xml_ms = xml_ml.getElementsByTagName(molecule_js_1.Molecule.tagName);
    let xml_msl = xml_ms.length;
    console.log("Number of molecules=" + xml_msl);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_msl; i++) {
        // Create a new Molecule.
        let mDivID = addRID(molecule_js_1.Molecule.tagName, i);
        let mDiv = (0, html_js_1.createDiv)(mDivID);
        let attributes = (0, xml_js_1.getAttributes)(xml_ms[i]);
        let m = new molecule_js_1.Molecule(attributes, i);
        molecules.set(i, m);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = addRID(mDivID, s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, null, mDiv, m.getID(), boundary1, level1);
        // Create a set of molecule tag names.
        let moleculeTagNames = new Set();
        let cns = xml_ms[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for (let j = 0; j < cns.length; j++) {
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!moleculeTagNames.has(cn.nodeName)) {
                moleculeTagNames.add(cn.nodeName);
            }
            else {
                // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                if (cn.nodeName != "#text") {
                    console.warn("Another ChildNode with nodeName=" + cn.nodeName);
                    //throw new Error("cn.nodeName appears twice in molecule.");
                }
            }
            //console.log(cn.nodeName);
        }
        // Add edit Name button.
        addEditIDButton(m, mcDiv.querySelector(html_js_1.s_button), mDiv, level1);
        // Description
        mDiv.appendChild(processDescription(addRID(m.getID(), s_description), m.getDescription.bind(m), m.setDescription.bind(m), boundary1, level1));
        // Init metadataList.
        //console.log("Init metadataList.");
        let xml_mls = xml_ms[i].getElementsByTagName(metadata_js_1.MetadataList.tagName);
        if (xml_mls.length > 0) {
            if (xml_mls.length > 1) {
                console.warn("Expecting 1 or 0 " + metadata_js_1.MetadataList.tagName + " but finding " + xml_mls.length + ". Loading the first of these...");
            }
            // Create collapsible MetadataList HTMLDivElement.
            let mlDivID = addRID(mDivID, metadata_js_1.MetadataList.tagName);
            let mlDiv = (0, html_js_1.createDiv)(mlDivID);
            let mlcDivID = addRID(mlDivID, s_container);
            let mlcDiv = (0, html_js_1.getCollapsibleDiv)(mlcDivID, mDiv, null, mlDiv, metadata_js_1.MetadataList.tagName, boundary1, level1);
            let xml_ml = xml_mls[0];
            let xml_ms = xml_ml.getElementsByTagName(metadata_js_1.Metadata.tagName);
            let ml = new metadata_js_1.MetadataList((0, xml_js_1.getAttributes)(xml_mls[0]));
            m.setMetadataList(ml);
            for (let j = 0; j < xml_ms.length; j++) {
                // Create a new Metadata.
                let md = new metadata_js_1.Metadata((0, xml_js_1.getAttributes)(xml_ms[j]));
                mlDiv.appendChild(addMetadata(m, md, ml, addRID(mlDivID, j), boundary1, level1));
                /*
                ml.addMetadata(md);
                let mdDivID = addID(mlDivID, j);
                let mdDiv = createFlexDiv(mdDivID, level1);
                mlDiv.appendChild(mdDiv);
                mdDiv.appendChild(createLabel(m.getID(), boundary1));
                */
            }
            moleculeTagNames.delete(metadata_js_1.MetadataList.tagName);
        }
        // Init atoms.
        let xml_aas = xml_ms[i].getElementsByTagName(molecule_js_1.AtomArray.tagName);
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = addRID(mDivID, molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = addRID(aaDivID, s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, molecule_js_1.AtomArray.tagName, boundary1, level1);
        // There should be at least one atom!
        // Atoms may be in AtomArrays or not.
        // If any AtomArray elements have attributes, there will be a console warning.
        // There will be a single AtomArray containing any Atoms.
        let aa = new molecule_js_1.AtomArray(new Map());
        m.setAtoms(aa);
        for (let j = 0; j < xml_aas.length; j++) {
            let aaa = (0, xml_js_1.getAttributes)(xml_aas[j]);
            if (aaa.size > 0) {
                console.warn("AtomArray attributes lost/ignored: " + (0, util_js_1.mapToString)(aaa));
            }
        }
        let xml_as = xml_ms[i].getElementsByTagName(molecule_js_1.Atom.tagName);
        for (let j = 0; j < xml_as.length; j++) {
            aaDiv.appendChild(addAtom(m, aa, new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_as[j]), m), boundary1, level1));
        }
        aaDiv.appendChild(getAddAtomButton(m, aaDiv, molecule_js_1.Atom.tagName, boundary1, level1));
        moleculeTagNames.delete(molecule_js_1.Atom.tagName);
        // Init bonds.
        let xml_bas = xml_ms[i].getElementsByTagName(molecule_js_1.BondArray.tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = addRID(mDivID, molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = addRID(baDivID, s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, molecule_js_1.BondArray.tagName, boundary1, level1);
        // Bonds may be in BondArrays or not.
        // If any BondArray elements have attributes, there will be a console warning.
        // There will be a single BondArray containing any Bonds.
        let ba = new molecule_js_1.BondArray(new Map());
        m.setBonds(ba);
        for (let j = 0; j < xml_bas.length; j++) {
            let baa = (0, xml_js_1.getAttributes)(xml_bas[j]);
            if (baa.size > 0) {
                console.warn("BondArray attributes lost/ignored: " + (0, util_js_1.mapToString)(baa));
            }
        }
        let xml_bs = xml_ms[i].getElementsByTagName(molecule_js_1.Bond.tagName);
        for (let j = 0; j < xml_bs.length; j++) {
            // Load those bonds that have an id attribute first.
            let b_attributes = (0, xml_js_1.getAttributes)(xml_bs[j]);
            if (b_attributes.has(molecule_js_1.Bond.s_id)) {
                baDiv.appendChild(addBond(m, m.getAtoms().atoms, ba, new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m), boundary1, level1));
            }
        }
        // Load those bonds that do not have an id attribute.
        for (let j = 0; j < xml_bs.length; j++) {
            let b_attributes = (0, xml_js_1.getAttributes)(xml_bs[j]);
            if (!b_attributes.has(molecule_js_1.Bond.s_id)) {
                baDiv.appendChild(addBond(m, m.getAtoms().atoms, ba, new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m), boundary1, level1));
            }
        }
        baDiv.appendChild(getAddBondButton(m, baDiv, molecule_js_1.Bond.tagName, boundary1, level1));
        moleculeTagNames.delete(molecule_js_1.Bond.tagName);
        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID = addRID(mDivID, "viewer");
        let viewerDiv = (0, html_js_1.createDiv)(viewerDivID);
        let viewercDivID = addRID(viewerDivID, s_container);
        let viewercDiv = (0, html_js_1.getCollapsibleDiv)(viewercDivID, mDiv, null, viewerDiv, "viewer", boundary1, level1);
        create3DViewer(m, viewerDiv, boundary1, level1);
        // Init properties.
        let xml_pls = xml_ms[i].getElementsByTagName(molecule_js_1.PropertyList.tagName);
        // Create a new collapsible div for the PropertyList.
        let plDivID = addRID(mDivID, molecule_js_1.PropertyList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID);
        let plcDivID = addRID(plDivID, s_container);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, molecule_js_1.PropertyList.tagName, boundary1, level1);
        // Properties may be in PropertyLists or not.
        // This implementation allows for there to be multiple PropertyList elements.
        // If any PropertyList elements have attributes, there will be a console warning.
        // There will be a single PropertyList containing any Properties.
        let pl = new molecule_js_1.PropertyList(new Map());
        m.setPropertyList(pl);
        for (let j = 0; j < xml_pls.length; j++) {
            let pla = (0, xml_js_1.getAttributes)(xml_pls[j]);
            if (pla.size > 0) {
                console.warn("PropertyList attributes lost/ignored: " + (0, util_js_1.mapToString)(pla));
            }
        }
        let pap = new Set(molecule_js_1.PropertyArray.propertyDictRefs);
        let xml_ps = xml_ms[i].getElementsByTagName(molecule_js_1.Property.tagName);
        for (let j = 0; j < xml_ps.length; j++) {
            // Create a new Property.
            let p = createProperty(pap, pl, xml_ps[j], plDiv, m, boundary1, level1);
            pl.setProperty(p);
        }
        /* This code is currently commented out as it is not wanted yet. The idea is that
        properties would be selectable a bit like controls, and all those not loaded in a
        file would be deselected and selectable. As there could be additional properties
        in future or that are not known about, some way of adding these will likely also be
        wanted...
        // Add Properties not in xml_ps.
        console.log("Molecule " + m.getDescription());
        console.log("pap.size=" + pap.size);
        pap.forEach(function (dictRef) {
            console.log("dictRef=" + dictRef);
            let attributes: Map<string, string> = new Map();
            attributes.set(Property.s_dictRef, dictRef);
            if (dictRef == "me:Hf0") {
                let vs: string = "";
                if (defaults != undefined) {
                    vs = defaults.values.get(dictRef) ?? "";
                }
                let value: Big;
                try {
                    value = new Big(vs);
                } catch (e) {
                    value = new Big("0");
                }
                let s_attributes: Map<string, string> = new Map();
                s_attributes.set("units", "kJ/mol");
                let ps: PropertyScalarNumber = new PropertyScalarNumber(s_attributes, value);
                let p: Property = new Hf0(attributes, ps);

                let iDs: Set<string> = new Set();

                //attributes.set(Hf0.s_units, "kJ/mol");
                addPropertyScalarNumber(s_attributes, iDs, value, Mesmer.energyUnits, pl, p, plDiv, boundary1);
                pl.setProperty(p);
                
                } else if (dictRef == "me:ZPE") {
                    let value: Big = new Big("0");
                    let ps: PropertyScalar = new PropertyScalar(new Map(), value);
                    //let ps: PropertyScalar = new PropertyScalar(new Map(), defaults.get(dictRef));
                    let p: Property = new ZPE(attributes, ps);
                    //plDiv.appendChild(addProperty(dictRef, ps, addID(plDivID, dictRef), boundary1, level1));
 
                    addPropertyScalar(attributes, value, Mesmer.energyUnits, pl, p, plDiv, boundary1);
 
                    pl.setProperty(p);
                
            }
        });
        */
        // Organise EnergyTransferModel.
        let xml_etms = xml_ms[i].getElementsByTagName(molecule_js_1.EnergyTransferModel.tagName);
        if (xml_etms.length > 0) {
            if (xml_etms.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.EnergyTransferModel.tagName + " but finding " + xml_etms.length + "!");
            }
            let etm = new molecule_js_1.EnergyTransferModel((0, xml_js_1.getAttributes)(xml_etms[0]));
            processEnergyTransferModel(etm, m, xml_etms[0], mDiv);
            moleculeTagNames.delete(molecule_js_1.EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_dms = xml_ms[i].getElementsByTagName(molecule_js_1.DOSCMethod.tagName);
        if (xml_dms.length > 0) {
            if (xml_dms.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.DOSCMethod.tagName + " but finding " + xml_dms.length + "!");
            }
            let doscm = new molecule_js_1.DOSCMethod((0, xml_js_1.getAttributes)(xml_dms[0]));
            mDiv.appendChild((0, html_js_1.createLabelWithSelect)(molecule_js_1.DOSCMethod.tagName, molecule_js_1.DOSCMethod.xsi_typeOptions, molecule_js_1.DOSCMethod.tagName, doscm.getXsiType(), m.getID(), boundary1, level1));
            moleculeTagNames.delete(molecule_js_1.DOSCMethod.tagName);
        }
        // Organise DistributionCalcMethod. (Output only)
        let xml_dcms = xml_ms[i].getElementsByTagName(molecule_js_1.DistributionCalcMethod.tagName);
        if (xml_dcms.length > 0) {
            if (xml_dcms.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.DistributionCalcMethod.tagName + " but finding " + xml_dcms.length + "!");
            }
            let dcmAttributes = (0, xml_js_1.getAttributes)(xml_dcms[0]);
            let dcm = new molecule_js_1.DistributionCalcMethod(dcmAttributes);
            m.setDistributionCalcMethod(dcm);
            let dcmDivID = addRID(mDivID, molecule_js_1.DistributionCalcMethod.tagName);
            let dcmDiv = (0, html_js_1.createDiv)(dcmDivID);
            mDiv.appendChild(dcmDiv);
            // Create label.
            dcmDiv.appendChild((0, html_js_1.createLabel)(molecule_js_1.DistributionCalcMethod.tagName + " " + (0, util_js_1.mapToString)(dcmAttributes), level1));
            moleculeTagNames.delete(molecule_js_1.DistributionCalcMethod.tagName);
        }
        // Organise DensityOfStatesList. (Output only)
        let xml_dosl = xml_ms[i].getElementsByTagName(molecule_js_1.DensityOfStatesList.tagName);
        if (xml_dosl.length > 0) {
            if (xml_dosl.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.DensityOfStatesList.tagName + " but finding " + xml_dosl.length + "!");
            }
            let dosl = new molecule_js_1.DensityOfStatesList((0, xml_js_1.getAttributes)(xml_dosl[0]));
            m.setDensityOfStatesList(dosl);
            // Create collapsible div.
            let doslDivID = addRID(mDivID, molecule_js_1.DensityOfStatesList.tagName);
            let doslDiv = (0, html_js_1.createDiv)(doslDivID);
            let doslcDivID = addRID(doslDivID, s_container);
            let doslcDiv = (0, html_js_1.getCollapsibleDiv)(doslcDivID, mDiv, null, doslDiv, molecule_js_1.DensityOfStatesList.tagName, boundary1, level1);
            let xml_dos = xml_dosl[0].getElementsByTagName(molecule_js_1.DensityOfStates.tagName);
            // Organise Description.
            let xml_ds = xml_dosl[0].getElementsByTagName(mesmer_js_1.Description.tagName);
            if (xml_ds.length > 0) {
                if (xml_ds.length > 1) {
                    throw new Error("Expecting 1 or 0 " + mesmer_js_1.Description.tagName + " but finding " + xml_ds.length + "!");
                }
                let ds = new mesmer_js_1.Description((0, xml_js_1.getAttributes)(xml_ds[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ds[0])));
                dosl.setDescription(ds);
            }
            // Organise DensityOfStates.
            //console.log("xml_dos.length=" + xml_dos.length);
            if (xml_dos.length == 0) {
                throw new Error("Expecting 1 or more " + molecule_js_1.DensityOfStates.tagName + " but finding 0!");
            }
            else {
                let t = (0, html_js_1.createTable)(addRID(doslDivID, s_table), level1);
                (0, html_js_1.addTableRow)(t, molecule_js_1.DensityOfStates.header);
                // Append the table to the div.
                doslDiv.appendChild(t);
                for (let j = 0; j < xml_dos.length; j++) {
                    //console.log("j=" + j);
                    let dos = new molecule_js_1.DensityOfStates((0, xml_js_1.getAttributes)(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    let dosDivID = addRID(doslDivID, j);
                    let dosDiv = (0, html_js_1.createFlexDiv)(dosDivID, level1);
                    doslDiv.appendChild(dosDiv);
                    // T.
                    let xml_t = xml_dos[j].getElementsByTagName(mesmer_js_1.T.tagName);
                    if (xml_t.length != 1) {
                        throw new Error("Expecting 1 " + mesmer_js_1.T.tagName + " but finding " + xml_t.length + "!");
                    }
                    else {
                        let t = new mesmer_js_1.T((0, xml_js_1.getAttributes)(xml_t[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_t[0]))));
                        dos.setT(t);
                        //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot = xml_dos[j].getElementsByTagName(molecule_js_1.Qtot.tagName);
                    if (xml_qtot.length != 1) {
                        throw new Error("Expecting 1 " + molecule_js_1.Qtot.tagName + " but finding " + xml_qtot.length + "!");
                    }
                    else {
                        let qtot = new molecule_js_1.Qtot((0, xml_js_1.getAttributes)(xml_qtot[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_qtot[0]))));
                        dos.setQtot(qtot);
                        //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc = xml_dos[j].getElementsByTagName(molecule_js_1.Sumc.tagName);
                    if (xml_sumc.length != 1) {
                        throw new Error("Expecting 1 " + molecule_js_1.Sumc.tagName + " but finding " + xml_sumc.length + "!");
                    }
                    else {
                        let sumc = new molecule_js_1.Sumc((0, xml_js_1.getAttributes)(xml_sumc[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_sumc[0]))));
                        dos.setSumc(sumc);
                        //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg = xml_dos[j].getElementsByTagName(molecule_js_1.Sumg.tagName);
                    if (xml_sumg.length != 1) {
                        throw new Error("Expecting 1 " + molecule_js_1.Sumg.tagName + " but finding " + xml_sumg.length + "!");
                    }
                    else {
                        let sumg = new molecule_js_1.Sumg((0, xml_js_1.getAttributes)(xml_sumg[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_sumg[0]))));
                        dos.setSumg(sumg);
                        //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                    (0, html_js_1.addTableRow)(t, dos.toStringArray());
                    //console.log("dos: " + dos.toString());
                }
                addSaveAsCSVButton(dosl.toCSV, doslDiv, t, m.getID() + "_" + molecule_js_1.DensityOfStatesList.tagName, level1);
            }
            moleculeTagNames.delete(molecule_js_1.DensityOfStatesList.tagName);
        }
        // Organise ThermoTable. (Output only)
        let tttn = molecule_js_1.ThermoTable.tagName;
        let xml_tts = xml_ms[i].getElementsByTagName(tttn);
        if (xml_tts.length > 0) {
            if (xml_tts.length > 1) {
                throw new Error("Expecting 1 or 0 " + tttn + " but finding " + xml_tts.length + "!");
            }
            let tt = new molecule_js_1.ThermoTable((0, xml_js_1.getAttributes)(xml_tts[0]));
            // Create collapsible div.
            let ttDivId = addRID(mDivID, molecule_js_1.ThermoTable.tagName);
            let ttDiv = (0, html_js_1.createDiv)(ttDivId);
            let ttcDivId = addRID(ttDivId, s_container);
            let ttcDiv = (0, html_js_1.getCollapsibleDiv)(ttcDivId, mDiv, null, ttDiv, tttn, boundary1, level1);
            let tvs;
            let tvtn = molecule_js_1.ThermoValue.tagName;
            let xml_tvs = xml_tts[0].getElementsByTagName(tvtn);
            if (xml_tvs.length == 0) {
                throw new Error("Expecting 1 or more " + tvtn + " but finding 0!");
            }
            else {
                tvs = [];
                let t = (0, html_js_1.createTable)(addRID(ttDivId, s_table), level1);
                (0, html_js_1.addTableRow)(t, tt.getHeader());
                for (let j = 0; j < xml_tvs.length; j++) {
                    let tv = new molecule_js_1.ThermoValue((0, xml_js_1.getAttributes)(xml_tvs[j]));
                    tvs.push(tv);
                    (0, html_js_1.addTableRow)(t, tv.toStringArray());
                }
                // Append the table to the div.
                ttDiv.appendChild(t);
                tt.init(tvs);
                addSaveAsCSVButton(tt.toCSV.bind(tt), ttDiv, t, m.getID() + "_" + molecule_js_1.ThermoTable.tagName, level1);
            }
            m.setThermoTable(tt);
            moleculeTagNames.delete(tvtn);
            moleculeTagNames.delete(tttn);
        }
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_ms[i].getElementsByTagName(molecule_js_1.ExtraDOSCMethod.tagName);
        if (xml_edms.length > 0) {
            for (let j = 0; j < xml_edms.length; j++) {
                let edm = new molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(xml_edms[j]));
                // Create collapsible ExtraDOSCMethod HTMLDivElement.
                let edmDivID = addRID(mDivID, molecule_js_1.ExtraDOSCMethod.tagName, j);
                let edmDiv = (0, html_js_1.createDiv)(edmDivID);
                let edmcDivID = addRID(edmDivID, s_container);
                let edmcDiv = (0, html_js_1.getCollapsibleDiv)(edmcDivID, mDiv, null, edmDiv, molecule_js_1.ExtraDOSCMethod.tagName, boundary1, level1);
                // Read bondRef.
                let xml_brs = xml_edms[0].getElementsByTagName(molecule_js_1.BondRef.tagName);
                if (xml_brs.length > 0) {
                    if (xml_brs.length != 1) {
                        throw new Error("Expecting only 1 bondRef, but there are " + xml_brs.length);
                    }
                    let bids = m.getBonds().getBondIds();
                    let br = new molecule_js_1.BondRef((0, xml_js_1.getAttributes)(xml_brs[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_brs[0])));
                    let lws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.BondRef.tagName, bids, molecule_js_1.BondRef.tagName, br.value, m.getID(), boundary1, level1);
                    let select = lws.getElementsByTagName("select")[0];
                    select.classList.add(molecule_js_1.Bond.tagName);
                    edmDiv.appendChild(lws);
                }
                // Read hinderedRotorPotential.
                let xml_hrps = xml_edms[0].getElementsByTagName(molecule_js_1.HinderedRotorPotential.tagName);
                if (xml_hrps.length > 0) {
                    if (xml_hrps.length != 1) {
                        throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hrps.length);
                    }
                    let hrpAttributes = (0, xml_js_1.getAttributes)(xml_hrps[0]);
                    let hrp = new molecule_js_1.HinderedRotorPotential(hrpAttributes);
                    // Create collapsible HinderedRotorPotential HTMLDivElement.
                    let hrpDivID = addRID(edmDivID, molecule_js_1.HinderedRotorPotential.tagName);
                    let hrpDiv = (0, html_js_1.createDiv)(hrpDivID);
                    let hrpcDivID = addRID(hrpDivID, s_container);
                    let hrpcDiv = (0, html_js_1.getCollapsibleDiv)(hrpcDivID, edmDiv, null, hrpDiv, molecule_js_1.HinderedRotorPotential.tagName, boundary1, level1);
                    // Format.
                    let lws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.HinderedRotorPotential.s_format, molecule_js_1.HinderedRotorPotential.formats, molecule_js_1.HinderedRotorPotential.tagName, hrp.getFormat(), addRID(hrpDivID, molecule_js_1.HinderedRotorPotential.s_format), boundary1, level1);
                    hrpDiv.appendChild(lws);
                    // Units.
                    addAnyUnits(mesmer_js_1.Mesmer.energyUnits, hrpAttributes, hrpDiv, lws, addRID(hrpDivID, molecule_js_1.HinderedRotorPotential.s_units), molecule_js_1.HinderedRotorPotential.tagName, boundary1, level1);
                    // ExpansionSize.
                    let es = hrp.getExpansionSize() ?? s_undefined;
                    hrpDiv.appendChild((0, html_js_1.createLabelWithInput)("text", addRID(hrpDivID, molecule_js_1.HinderedRotorPotential.s_expansionSize), boundary1, level1, (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        try {
                            hrp.setExpansionSize(new big_js_1.default(target.value));
                        }
                        catch (e) {
                            alert("Invalid value, resetting...");
                            target.value = hrp.getExpansionSize() ?? s_undefined;
                        }
                        (0, html_js_1.resizeInputElement)(target);
                    }, es, molecule_js_1.HinderedRotorPotential.s_expansionSize));
                    // Add useSineTerms.
                    processUseSineTerms(hrpDiv, hrp, level1);
                    // Load PotentialPoints.
                    // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                    let ppsDivID = addRID(hrpDivID, molecule_js_1.PotentialPoint.tagName);
                    let ppsDiv = (0, html_js_1.createDiv)(ppsDivID);
                    let ppscDivID = addRID(ppsDivID, s_container);
                    let ppscDiv = (0, html_js_1.getCollapsibleDiv)(ppscDivID, mDiv, null, ppsDiv, "PotentialPoints", boundary1, level1);
                    hrpDiv.appendChild(ppscDiv);
                    let pps = [];
                    let xml_pps = xml_hrps[0].getElementsByTagName(molecule_js_1.PotentialPoint.tagName);
                    for (let k = 0; k < xml_pps.length; k++) {
                        let pp = new molecule_js_1.PotentialPoint((0, xml_js_1.getAttributes)(xml_pps[k]));
                        pps.push(pp);
                        let ppDivID = addRID(ppsDivID, k);
                        let ppDiv = (0, html_js_1.createFlexDiv)(ppDivID, level1);
                        ppsDiv.appendChild(ppDiv);
                        let l = (0, html_js_1.createLabel)(molecule_js_1.PotentialPoint.tagName + " " + k, boundary1);
                        ppDiv.appendChild(l);
                        // Process angle
                        let a = pp.getAngle() ?? s_undefined;
                        let anglelwi = (0, html_js_1.createLabelWithInput)("text", addRID(ppDivID, molecule_js_1.PotentialPoint.s_angle), boundary1, boundary1, (event) => {
                            let target = event.target;
                            // Check the input is a number.
                            if ((0, util_js_1.isNumeric)(target.value)) {
                                let value = new big_js_1.default(target.value);
                                pp.setAngle(value);
                            }
                            else {
                                // Reset the input to the current value.
                                alert("Angle input is not a number, resetting...");
                                target.value = pp.getAngle() ?? s_undefined;
                            }
                            (0, html_js_1.resizeInputElement)(target);
                        }, a, molecule_js_1.PotentialPoint.s_angle);
                        ppDiv.appendChild(anglelwi);
                        // Create a new div element for the potential.
                        let potentialLabel = (0, html_js_1.createLabel)(molecule_js_1.PotentialPoint.s_potential, boundary1);
                        ppDiv.appendChild(potentialLabel);
                        let potentialInputElementId = addRID(ppDivID, molecule_js_1.PotentialPoint.s_potential);
                        let potentialInputElement = (0, html_js_1.createInput)("text", potentialInputElementId, boundary1);
                        ppDiv.appendChild(potentialInputElement);
                        let p = pp.getPotential() ?? s_undefined;
                        potentialInputElement.addEventListener('change', (event) => {
                            let target = event.target;
                            // Check the input is a number.
                            if ((0, util_js_1.isNumeric)(target.value)) {
                                let value = new big_js_1.default(target.value);
                                pp.setPotential(value);
                                console.log("Set " + molecule_js_1.PotentialPoint.tagName + " to " + value.toExponential());
                            }
                            else {
                                // Reset the input to the current value.
                                alert("Potential input is not a number, resetting...");
                                potentialInputElement.value = pp.getPotential() ?? s_undefined;
                            }
                            (0, html_js_1.resizeInputElement)(potentialInputElement);
                        });
                        potentialInputElement.value = p;
                        (0, html_js_1.resizeInputElement)(potentialInputElement);
                    }
                    //ppsDiv.appendChild(ppDiv);
                    hrp.setPotentialPoints(pps);
                    edm.setHinderedRotorPotential(hrp);
                }
                // Read periodicities.
                let xml_periodicities = xml_edms[j].getElementsByTagName(molecule_js_1.Periodicity.tagName);
                if (xml_periodicities.length > 0) {
                    if (xml_periodicities.length != 1) {
                        throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                    }
                    let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_periodicities[0]));
                    let periodicity = new molecule_js_1.Periodicity((0, xml_js_1.getAttributes)(xml_periodicities[0]), new big_js_1.default(valueString));
                    edm.setPeriodicity(periodicity);
                    let lwi = (0, html_js_1.createLabelWithInput)("text", addRID(edmDivID, molecule_js_1.Periodicity.tagName), boundary1, level1, (event) => {
                        let target = event.target;
                        valueString = target.value;
                        if ((0, util_js_1.isNumeric)(valueString)) {
                            let value = new big_js_1.default(valueString);
                            periodicity.value = value;
                            edm.getPeriodicity().value = value;
                            console.log("Set " + molecule_js_1.Periodicity.tagName + " to " + value);
                        }
                        else {
                            // Reset the input to the current value.
                            alert("Periodicity input is not a number, resetting...");
                            target.value = periodicity.value.toExponential();
                        }
                    }, valueString, molecule_js_1.Periodicity.tagName);
                    edmDiv.appendChild(lwi);
                }
                m.setExtraDOSCMethod(edm);
                moleculeTagNames.delete(molecule_js_1.ExtraDOSCMethod.tagName);
            }
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete(molecule_js_1.ReservoirSize.tagName);
        let xml_ReservoirSize = xml_ms[i].getElementsByTagName(molecule_js_1.ReservoirSize.tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            }
            let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ReservoirSize[0]));
            let value = new big_js_1.default(valueString);
            let reservoirSizeAttributes = (0, xml_js_1.getAttributes)(xml_ReservoirSize[0]);
            let reservoirSize = new molecule_js_1.ReservoirSize(reservoirSizeAttributes, value);
            m.setReservoirSize(reservoirSize);
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", m.getID() + "_" + molecule_js_1.ReservoirSize.tagName, boundary1, level1, (event) => {
                let target = event.target;
                reservoirSize.value = new big_js_1.default(target.value);
                (0, html_js_1.resizeInputElement)(target);
            }, valueString, molecule_js_1.ReservoirSize.tagName);
            mDiv.appendChild(inputDiv);
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
        }
    }
    // Create an add molecule button.
    let addMoleculeButton = (0, html_js_1.createButton)(s_Add_sy_add, undefined, level1);
    mlDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', () => {
        // Ask the user to specify the molecule ID.
        let id = prompt("Please enter a name for the molecule", "Kr");
        if (id == null) {
            id = "";
        }
        let molecule = new molecule_js_1.Molecule(new Map(), molecules.size);
        molecule.setAtoms(new molecule_js_1.AtomArray(new Map()));
        molecule.setBonds(new molecule_js_1.BondArray(new Map()));
        molecules.set(molecules.size, molecule);
        let moleculeDivID = addRID(molecule_js_1.Molecule.tagName, molecules.size);
        let moleculeDiv = (0, html_js_1.createDiv)(moleculeDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = addRID(moleculeDivID, s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, addMoleculeButton, moleculeDiv, id, boundary1, level1);
        // Add the molecule to the BathGas select elements.
        addOptionByClassName(conditions_js_1.BathGas.tagName, molecule.getID());
        // Add edit Name button.
        addEditIDButton(molecule, mcDiv.querySelector(html_js_1.s_button), moleculeDiv, level1);
        // Description
        moleculeDiv.appendChild(processDescription(addRID(molecule.getID(), s_description), molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), boundary1, level1));
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = addRID(moleculeDivID, molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = addRID(aaDivID, s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, moleculeDiv, null, aaDiv, molecule_js_1.AtomArray.tagName, boundary1, level1);
        aaDiv.appendChild(getAddAtomButton(molecule, aaDiv, molecule_js_1.Atom.tagName, boundary1, level1));
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = addRID(moleculeDivID, molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = addRID(baDivID, s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, moleculeDiv, null, baDiv, molecule_js_1.BondArray.tagName, boundary1, level1);
        baDiv.appendChild(getAddBondButton(molecule, baDiv, molecule_js_1.Bond.tagName, boundary1, level1));
        create3DViewer(molecule, moleculeDiv, boundary1, level1);
        // Create collapsible Properties HTMLDivElement.
        let plDivID = addRID(moleculeDivID, molecule_js_1.PropertyList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID);
        let plcDivID = addRID(plDivID, s_container);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, moleculeDiv, null, plDiv, molecule_js_1.PropertyList.tagName, boundary1, level1);
        // Add code to add propertyArray...
    });
    // Create add from library button.
    let addFromLibraryButton = (0, html_js_1.createButton)(s_Add_from_library, undefined, boundary1);
    mlDiv.appendChild(addFromLibraryButton);
    // Add event listener for the button.
    addFromLibraryButton.addEventListener('click', () => {
        // Create a select element to select a libraryMolecule.
        let selectDivID = (0, util_js_1.getID)(molecule_js_1.Molecule.tagName, "div");
        remove(selectDivID);
        let selectDiv = (0, html_js_1.createDiv)(addRID(selectDivID), level1);
        let options = Array.from(getMoleculeKeys(libmols));
        if (options.length == 0) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        console.log("options.length=" + options.length);
        addOrRemoveInstructions(options, true);
        let selectID = (0, util_js_1.getID)(selectDivID, html_js_1.s_select);
        remove(selectID);
        let select = (0, html_js_1.createSelectElement)(options, "Select molecule", s_selectOption, addRID(selectID), boundary1);
        select.classList.add(molecule_js_1.Molecule.tagName);
        selectDiv.appendChild(select);
        mlDiv.insertBefore(selectDiv, addMoleculeButton);
        selectAnotherOptionEventListener(options, select);
        select.addEventListener('change', (event) => {
            let target = event.target;
            let selectedOption = target.options[target.selectedIndex];
            let mID = selectedOption.value;
            let molecule = libmols.get(parseInt(mID.split("-")[1]));
            molecules.set(molecules.size, molecule);
            // Add molecule to the MoleculeList.
            let moleculeDivID = addRID(molecule_js_1.Molecule.tagName, molecules.size);
            let moleculeDiv = (0, html_js_1.createDiv)(moleculeDivID);
            // Create collapsible Molecule HTMLDivElement.
            let mcDivID = addRID(moleculeDivID, s_container);
            let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, addMoleculeButton, moleculeDiv, molecule.getID(), boundary1, level1);
            // Add the molecule to the BathGas select elements.
            addOptionByClassName(conditions_js_1.BathGas.tagName, molecule.getID());
            // Add edit Name button.
            addEditIDButton(molecule, mcDiv.querySelector(html_js_1.s_button), moleculeDiv, level1);
            // Description
            moleculeDiv.appendChild(processDescription(addRID(molecule.getID(), s_description), molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), boundary1, level1));
            // Create collapsible MetadataList HTMLDivElement.
            let mlistDivID = addRID(moleculeDivID, metadata_js_1.MetadataList.tagName);
            let mlistDiv = (0, html_js_1.createDiv)(mlistDivID, level1);
            let mlistcDivID = addRID(mlistDivID, s_container);
            let mlistcDiv = (0, html_js_1.getCollapsibleDiv)(mlistcDivID, moleculeDiv, null, mlistDiv, metadata_js_1.MetadataList.tagName, boundary1, level1);
            // Add metadata.
            let metadataList = molecule.getMetadataList();
            if (metadataList != undefined) {
                metadataList.getMetadata().forEach((md) => {
                    let mdDiv = (0, html_js_1.createDiv)();
                    mlistDiv.appendChild(mdDiv);
                    mdDiv.appendChild((0, html_js_1.createLabel)(md.getLabelText(), boundary1));
                });
            }
            // Create collapsible AtomArray HTMLDivElement.
            let aaDivID = addRID(moleculeDivID, molecule_js_1.AtomArray.tagName);
            let aaDiv = (0, html_js_1.createDiv)(aaDivID);
            let aacDivID = addRID(aaDivID, s_container);
            let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, moleculeDiv, null, aaDiv, molecule_js_1.AtomArray.tagName, boundary1, level1);
            // Add atoms.
            let aa = molecule.getAtoms();
            if (aa != undefined) {
                aa.atoms.forEach((a) => {
                    aaDiv.appendChild(addAtom(molecule, molecule.getAtoms(), a, boundary1, level1));
                });
            }
            aaDiv.appendChild(getAddAtomButton(molecule, aaDiv, molecule_js_1.Atom.tagName, boundary1, level1));
            // Create collapsible BondArray HTMLDivElement.
            let baDivID = addRID(moleculeDivID, molecule_js_1.BondArray.tagName);
            let baDiv = (0, html_js_1.createDiv)(baDivID);
            let bacDivID = addRID(baDivID, s_container);
            let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, moleculeDiv, null, baDiv, molecule_js_1.BondArray.tagName, boundary1, level1);
            // Add bonds.
            let ba = molecule.getBonds();
            if (ba != undefined) {
                molecule.getBonds().bonds.forEach((b) => {
                    if (aa == undefined) {
                        throw new Error("Atoms are not defined for molecule " + molecule.getID());
                    }
                    baDiv.appendChild(addBond(molecule, aa.atoms, molecule.getBonds(), b, boundary1, level1));
                });
            }
            baDiv.appendChild(getAddBondButton(molecule, baDiv, molecule_js_1.Bond.tagName, boundary1, level1));
            create3DViewer(molecule, moleculeDiv, boundary1, level1);
            // Create collapsible Properties HTMLDivElement.
            let plDivID = addRID(moleculeDivID, molecule_js_1.PropertyList.tagName);
            let plDiv = (0, html_js_1.createDiv)(plDivID);
            let plcDivID = addRID(plDivID, s_container);
            let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, moleculeDiv, null, plDiv, molecule_js_1.PropertyList.tagName, boundary1, level1);
            // Add code to add propertyArray...
            // Remove the select element.
            selectDiv.remove();
        });
    });
    return mlDiv;
}
/**
 * Adds a button to edit the molecule ID.
 * @param molecule
 * @param button
 * @param moleculeDiv
 * @param level
 */
function addEditIDButton(molecule, button, moleculeDiv, level) {
    let s_editName = sy_edit + " Edit id";
    let editNameButtonID = addRID(moleculeDiv.id, s_editName, html_js_1.s_button);
    let editNameButton = (0, html_js_1.createButton)(s_editName, editNameButtonID, level);
    moleculeDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', () => {
        let newMoleculeId = prompt("Please enter a name for the molecule:", molecule.getID());
        if (newMoleculeId != null) {
            let mid = (0, util_js_1.getID)(newMoleculeId, molecule.id);
            // Update the BathGas select elements.
            addOptionByClassName(conditions_js_1.BathGas.tagName, mid);
            let omid = (0, util_js_1.getID)(molecule.getID(), molecule.id);
            removeOptionByClassName(conditions_js_1.BathGas.tagName, omid);
            molecule.setID(mid);
            button.textContent = mid + " " + html_js_1.sy_upTriangle;
        }
        //}
    });
}
/**
 * Process description.
 * @param id The id.
 * @param decription The description.
 * @param getter The getter function to call.
 * @param setter The setter function to call.
 * @param margin The boundary.
 */
function processDescription(id, getter, setter, marginComponent, marginDiv) {
    let div = (0, html_js_1.createFlexDiv)(undefined, marginDiv);
    let buttonTextContentSelected = s_description + sy_selected;
    let buttonTextContentDeselected = s_description + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, addRID(id, html_js_1.s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = addRID(id, s_description, s_input);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addDescription(div, inputId, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addDescription(div, inputId, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param value The description value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 */
function addDescription(div, id, value, setter, boundary) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value;
    }
    let input = (0, html_js_1.createInput)("text", id, boundary);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setter(target.value);
        console.log(id + " changed from " + value + " to " + target.value);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 *
 * Creates and returns a button for adding a new atom. This will add a new atom div to the atomArrayDiv. The atom div added
 * will have: label (atom id); editable details (elementType, x3, y3, z3); and a remove button. Select elements that allow
 * for selecting atoms are updated so options reflect any added or removed atoms.
 *
 * @param molecule The molecule.
 * @param aaDiv The atom array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */
function getAddAtomButton(molecule, aaDiv, typeID, boundary, level) {
    // Create an add atom button.
    let button = (0, html_js_1.createButton)(s_Add_sy_add, addRID(molecule.getID(), "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes = new Map();
        let a = new molecule_js_1.Atom(attributes, molecule);
        //let aID: string = molecule.getAtoms().addAtom(a);
        aaDiv.insertBefore(addAtom(molecule, molecule.getAtoms(), a, boundary, level), button);
    });
    return button;
}
function addMetadata(m, md, ml, mdDivID, boundary, level) {
    ml.addMetadata(md);
    let mdDiv = (0, html_js_1.createFlexDiv)(mdDivID, level1);
    mdDiv.appendChild((0, html_js_1.createLabel)(m.getID(), boundary1));
    return mdDiv;
}
/**
 * Adds an atom.
 *
 * @param molecule The molecule.
 * @param a The atom to add.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns A new div for the atom.
 */
function addAtom(molecule, aa, a, boundary, level) {
    let aID = aa.addAtom(a, a.getID());
    let aDivID = addRID(molecule.getID(), aID);
    let aDiv = (0, html_js_1.createFlexDiv)(aDivID, level);
    aDiv.appendChild((0, html_js_1.createLabel)(aID, boundary));
    let aIDs = new Set();
    // elementType.
    processElementType(a, aDiv, aIDs, true, boundary);
    // Coordinates.
    processCoordinates(a, aDiv, aIDs, boundary, boundary);
    addRemoveButton(aDiv, boundary, removeAtom, molecule, aID, aIDs);
    // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
    addOptionByClassName(molecule_js_1.Bond.s_atomRefs2, aID);
    return aDiv;
}
/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param id The atom id to remove.
 */
function removeAtom(molecule, id, aIDs) {
    molecule.getAtoms().removeAtom(id);
    aIDs.forEach((x) => {
        console.log("Removing " + x);
        remove(x);
    });
    removeOptionByClassName(molecule_js_1.Bond.s_atomRefs2, id);
    molecule.getBonds().bonds.forEach((bond) => {
        let atomRefs2 = bond.getAtomRefs2();
        let atomRefs = atomRefs2.split(" ");
        if (atomRefs[0] == atomRefs[1]) {
            let bondId = bond.getID();
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            removeOptionByClassName(molecule_js_1.Bond.tagName, bondId);
            // remove the bondDiv element.
            let bID = (0, util_js_1.getID)(molecule.getID(), bondId);
            let bondDiv = document.getElementById(bID);
            if (bondDiv == null) {
                throw new Error("Bond div with id " + bID + " not found.");
            }
            else {
                bondDiv.remove();
            }
        }
    });
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
 * Creates and returns a button for adding a new bond. This will add a new bond div to the bondArrayDiv. The bond div added
 * will have: label (bond id); editable details (atomRefs2 and order); and a remove button. Select elements that allow for
 * selecting bonds are updated so options reflect any added or removed bonds.
 *
 * @param molecule The molecule.
 * @param baDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */
function getAddBondButton(molecule, baDiv, typeID, boundary, level) {
    // Create an add button.
    let id = addRID(baDiv.id, typeID, html_js_1.s_button);
    let button = (0, html_js_1.createButton)(s_Add_sy_add, id, level);
    button.addEventListener('click', () => {
        let atoms = molecule.getAtoms().atoms;
        if (atoms.size < 2) {
            alert("There must be at least 2 atoms to create a bond.");
            return;
        }
        let attributes = new Map();
        let atomRefs2 = Array.from(atoms.keys()).slice(0, 2).join(" ");
        attributes.set(molecule_js_1.Bond.s_atomRefs2, atomRefs2);
        let b = new molecule_js_1.Bond(attributes, molecule);
        baDiv.insertBefore(addBond(molecule, atoms, molecule.getBonds(), b, boundary, level), button);
    });
    baDiv.appendChild(button);
    return button;
}
/**
 * Add a bond.
 * @param molecule The molecule.
 * @param atoms The atoms.
 * @param b The bond.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The a new div for the bond.
 */
function addBond(molecule, atoms, ba, b, boundary, level) {
    let bID = ba.addBond(b, b.getID());
    let bDivID = (0, util_js_1.getID)(molecule.getID(), bID);
    //let bDivID: string = addRID(molecule.getID(), bID);
    let bDiv = (0, html_js_1.createFlexDiv)(bDivID, level);
    bDiv.appendChild((0, html_js_1.createLabel)(bID, boundary));
    // atomRefs2.
    processAtomRefs2(molecule, bDiv, b, boundary);
    // order.
    processOrder(bDiv, b, boundary);
    // Add to the classlists so that bondDivs involving particular atoms can be found.
    Array.from(atoms.keys()).forEach((atomId) => {
        bDiv.classList.add(atomId);
    });
    // Add remove button.
    let removeBond = (id) => molecule.getBonds().removeBond(id);
    addRemoveButton(bDiv, boundary, removeBond, bID);
    // Get elements with Bond className. These select elements are to be updated to include the new bond option.
    addOptionByClassName(molecule_js_1.Bond.tagName, bID);
    return bDiv;
}
/**
 * For processing the atomRefs2 of a Bond.
 *
 * @param molecule The molecule.
 * @param bDiv The bond div.
 * @param bond The bond.
 * @param inputId The input id.
 * @param margin The margin for the components.
 */
function processAtomRefs2(molecule, bDiv, bond, margin) {
    //let id = addRID(bDiv.id, Bond.s_atomRefs2);
    let id = (0, util_js_1.getID)(bDiv.id, molecule_js_1.Bond.s_atomRefs2);
    //bIDs.add(id);
    let atomRefs2 = bond.getAtomRefs2();
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    let alwsID = (0, util_js_1.getID)(id, 0);
    //let alwsID: string = addRID(id, 0);
    //bIDs.add(alwsID);
    let alws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.Bond.s_atomRefs2 + "[0]", atomRefOptions, molecule_js_1.Atom.tagName, atomRefs[0], alwsID, margin, margin);
    let aselect = alws.querySelector('select');
    aselect.classList.add(molecule_js_1.Bond.s_atomRefs2);
    aselect.addEventListener('change', (event) => {
        let target = event.target;
        let atomRefs2 = target.value + " " + atomRefs[1];
        console.log(molecule_js_1.Bond.s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, html_js_1.resizeSelectElement)(target);
    });
    aselect.value = atomRefs[0];
    (0, html_js_1.resizeSelectElement)(aselect);
    bDiv.appendChild(alws);
    // blws.
    let blwsID = (0, util_js_1.getID)(id, 1);
    //let blwsID: string = addRID(id, 1);
    //bIDs.add(blwsID);
    let blws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.Bond.s_atomRefs2 + "[1]", atomRefOptions, molecule_js_1.Atom.tagName, atomRefs[1], blwsID, margin, margin);
    let bselect = blws.querySelector('select');
    bselect.classList.add(molecule_js_1.Bond.s_atomRefs2);
    bselect.addEventListener('change', (event) => {
        let target = event.target;
        let atomRefs2 = atomRefs[0] + " " + target.value;
        console.log(molecule_js_1.Bond.s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, html_js_1.resizeSelectElement)(target);
    });
    bselect.value = atomRefs[1];
    (0, html_js_1.resizeSelectElement)(bselect);
    bDiv.appendChild(blws);
}
function addProperty(dictRef, ps, id, boundary, level) {
    let pDiv = (0, html_js_1.createFlexDiv)(id, level);
    pDiv.appendChild((0, html_js_1.createLabel)(dictRef, boundary));
    // value.
    let value = ps.getValue();
    //let value: string = ps.value;
    let valueInputId = addRID(id, s_input);
    let valueInput = (0, html_js_1.createInput)("text", valueInputId, boundary);
    pDiv.appendChild(valueInput);
    valueInput.addEventListener('change', (event) => {
        let target = event.target;
        ps.setValue(new big_js_1.default(target.value));
        //ps.value = target.value;
        (0, html_js_1.resizeInputElement)(target);
    });
    valueInput.value = value.toString();
    (0, html_js_1.resizeInputElement)(valueInput);
    return pDiv;
}
function addPropertyScalarNumber(attributes, iDs, value, units, pl, p, plDiv, boundary) {
    let ps = p.getProperty();
    ps.setValue = function (value) {
        ps.value = value;
        //console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + value);
        if (p.dictRef == molecule_js_1.ZPE.dictRef) {
            // Update the molecule energy diagram.
            redrawReactionsDiagram();
        }
    }.bind(ps);
    ps.value = value;
    if (p.dictRef == molecule_js_1.ZPE.dictRef) {
        // Update the molecule energy diagram.
        redrawReactionsDiagram();
    }
    let id = addRID(plDiv.id, p.dictRef);
    console.log("div ID " + id);
    let div = processNumber(id, iDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, () => pl.removeProperty(p.dictRef), boundary1, level1);
    console.log("unitsID " + addRID(id, molecule_js_1.PropertyScalarNumber.s_units));
    addAnyUnits(units, attributes, div, div.querySelector(s_input), (0, util_js_1.getID)(id, molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, boundary, boundary);
    plDiv.appendChild(div);
}
/**
 * @param pl The PropertyList.
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(pap, pl, xml, plDiv, molecule, boundary, level) {
    let p = new molecule_js_1.Property((0, xml_js_1.getAttributes)(xml));
    pap.delete(p.dictRef);
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == molecule_js_1.ZPE.dictRef) {
        // "me:ZPE", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.Hf0.dictRef) {
        // "me:Hf0", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.HfAT0.dictRef) {
        // "me:HfAT0", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.Hf298.dictRef) {
        // "me:Hf298", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
        // "me:rotConsts", array, Mesmer.frequencyUnits.
        processPropertyScalarNumber(pl, p, mesmer_js_1.Mesmer.frequencyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.SymmetryNumber.dictRef) {
        // "me:symmetryNumber", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.TSOpticalSymmetryNumber.dictRef) {
        // "me:TSOpticalSymmetryNumber", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.FrequenciesScaleFactor.dictRef) {
        // "me:frequenciesScaleFactor", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.VibFreqs.dictRef) {
        // "me:vibFreqs", array, cm-1.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.MW.dictRef) {
        // "me:MW", scalar, amu.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.SpinMultiplicity.dictRef) {
        // "me:spinMultiplicity", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.Epsilon.dictRef) {
        // "me:epsilon", scalar, K (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.Sigma.dictRef) {
        // "me:sigma", scalar, Å (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.Hessian.dictRef) {
        // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.EinsteinAij.dictRef) {
        // "me:EinsteinAij", array, s-1 (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.EinsteinBij.dictRef) {
        // "me:EinsteinBij", array, m3/J/s2 (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else {
        processPropertyScalarString(pl, p, molecule, xml, plDiv, boundary, level);
    }
    return p;
}
/**
 * For processing the elementType of an Atom.
 * @param a The atom.
 * @param aDiv The atom div which is appended to.
 * @param first If true, an option is added with instructions for the selection.
 * @param margin The margin for the components.
 * @returns A HTMLDivElement containing the HTMLLabelElement and HTMLSelectElement elements.
 */
function processElementType(a, aDiv, aIDs, first, margin) {
    let elementType = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = mesmer_js_1.Mesmer.elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = s_selectOption;
        addOrRemoveInstructions(selectTypes, first);
        //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    let id = addRID(aDiv.id, molecule_js_1.Atom.s_elementType);
    aIDs.add(id);
    let lws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.Atom.s_elementType, selectTypes, molecule_js_1.Atom.s_elementType, elementType, id, margin, margin);
    let select = lws.querySelector('select');
    select.addEventListener('change', (event) => {
        let target = event.target;
        a.setElementType(target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    select.value = elementType;
    (0, html_js_1.resizeSelectElement)(select);
    selectAnotherOptionEventListener(selectTypes, select);
    aDiv.appendChild(lws);
    return lws;
}
/**
 * @param options The options.
 * @param add If true then a new option is added with an instruction to select another option.
 * If false then this option is removed if it is present.
 */
function addOrRemoveInstructions(options, add) {
    if (add) {
        options.push(s_selectOption);
    }
    else {
        // remove selectOption if present.
        let index = options.indexOf(s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
}
/**
 * Process atom coordinates.
 * @param a The atom.
 * @param aDiv The atom div.
 * @param margin The margin.
 */
function processCoordinates(a, aDiv, aIDs, marginComponent, margin) {
    let id;
    id = addRID(aDiv.id, molecule_js_1.Atom.s_x3);
    aIDs.add(id);
    aDiv.appendChild(processNumber(id, aIDs, molecule_js_1.Atom.s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    id = addRID(aDiv.id, molecule_js_1.Atom.s_y3);
    aIDs.add(id);
    aDiv.appendChild(processNumber(id, aIDs, molecule_js_1.Atom.s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    id = addRID(aDiv.id, molecule_js_1.Atom.s_z3);
    aIDs.add(id);
    aDiv.appendChild(processNumber(id, aIDs, molecule_js_1.Atom.s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
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
function processNumber(id, iDs, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, html_js_1.createFlexDiv)(id, margin);
    let buttonTextContentSelected = name + sy_selected;
    let buttonTextContentDeselected = name + sy_deselected;
    let idb = addRID(id, html_js_1.s_button);
    iDs.add(idb);
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = addRID(id, name, s_input);
    iDs.add(inputId);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addNumber(div, inputId, name, value, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addNumber(div, inputId, name, value, getter, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // 
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
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
function addNumber(div, id, name, value, getter, setter, boundary) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value.toString();
    }
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, html_js_1.createInput)("text", id, boundary);
    input.addEventListener('change', (event) => {
        let target = event.target;
        try {
            setter(new big_js_1.default(target.value));
            console.log(name + " changed from " + value + " to " + target.value);
        }
        catch (e) {
            alert("Input invalid, resetting...");
            target.value = getter().toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
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
function processNumberArray(id, name, pa, getter, setter, remover, marginComponent, margin) {
    let div = (0, html_js_1.createFlexDiv)(undefined, margin);
    let buttonTextContentSelected = name + sy_selected;
    let buttonTextContentDeselected = name + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, addRID(id, html_js_1.s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = addRID(id, name, s_input);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addNumberArray(div, inputId, name, value, pa, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addNumberArray(div, inputId, name, value, pa, getter, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
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
function addNumberArray(div, id, name, values, pa, getter, setter, boundary) {
    let valueString;
    if (values == undefined) {
        valueString = "";
    }
    else {
        valueString = (0, util_js_1.bigArrayToString)(values);
    }
    let ta = (0, html_js_1.createTextArea)(id, boundary);
    ta.addEventListener('change', (event) => {
        let target = event.target;
        setNumberArrayNode(pa, ta);
        (0, html_js_1.resizeTextAreaElement)(target);
    });
    ta.value = valueString;
    (0, html_js_1.resizeTextAreaElement)(ta);
    div.appendChild(ta);
}
/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */
function addRemoveButton(div, margin, removeFunction, ...args) {
    let button = (0, html_js_1.createButton)(s_Remove_sy_remove, undefined, margin);
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
function processString(id, iDs, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, html_js_1.createFlexDiv)(id, margin);
    let buttonTextContentSelected = name + sy_selected;
    let buttonTextContentDeselected = name + sy_deselected;
    let idb = addRID(id, html_js_1.s_button);
    iDs.add(idb);
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = addRID(id, name, s_input);
    iDs.add(inputId);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addString(div, inputId, name, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
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
            // 
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
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
function addString(div, id, name, value, setter, boundary) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value.toString();
    }
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, html_js_1.createInput)("text", id, boundary);
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
 * Process an order.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param margin The margin for components.
 */
function processOrder(bondDiv, bond, margin) {
    //let id = addRID(bondDiv.id, Bond.s_order);
    let id = (0, util_js_1.getID)(bondDiv.id, molecule_js_1.Bond.s_order);
    let div = (0, html_js_1.createFlexDiv)(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = molecule_js_1.Bond.s_order + sy_selected;
    let buttonTextContentDeselected = molecule_js_1.Bond.s_order + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addOrder(div, bond, id, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(id) == null) {
            if (value == undefined) {
                value = 1;
            }
            addOrder(div, bond, id, value, margin);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * @param div The div to add the input to.
 * @param bond The bond.
 * @param id The id.
 * @param value The order value.
 * @param boundary The boundary.
 */
function addOrder(div, bond, id, value, boundary) {
    let valueString = value.toString();
    let select = (0, html_js_1.createSelectElement)(molecule_js_1.Bond.orderOptions, molecule_js_1.Bond.s_order, valueString, id, boundary);
    select.addEventListener('change', (event) => {
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log(molecule_js_1.Bond.s_order + " changed from " + valueString + " to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    select.value = valueString;
    (0, html_js_1.resizeSelectElement)(select);
    select.id = id;
    div.appendChild(select);
}
/**
 * Process an order.
 * @param hrpDiv The HinderedRotorPotential div.
 * @param margin The margin for components.
 */
function processUseSineTerms(hrpDiv, hrp, margin) {
    let id = addRID(hrpDiv.id, molecule_js_1.HinderedRotorPotential.s_useSineTerms);
    let buttonTextContentSelected = molecule_js_1.HinderedRotorPotential.s_useSineTerms + sy_selected;
    let buttonTextContentDeselected = molecule_js_1.HinderedRotorPotential.s_useSineTerms + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, margin);
    hrpDiv.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (hrp.getUseSineTerms() == true) {
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (hrp.getUseSineTerms() == false) {
            hrp.setUseSineTerms(true);
            button.textContent = buttonTextContentSelected;
        }
        else {
            hrp.setUseSineTerms(false);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * Creates a 3D viewer for the molecule and adds this to the moleculeDiv.
 *
 * @param molecule The molecule.
 * @param moleculeDiv The molecule div.
 * @param boundary The margin for the viewer.
 * @param level The margin for the viewer container div.
 */
function create3DViewer(molecule, moleculeDiv, boundary, level) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID = addRID(molecule.getID(), "viewerContainer");
    let viewerContainerDiv = (0, html_js_1.createDiv)(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID = addRID(molecule.getID(), "viewer");
    let showAtomLabels = false;
    let showBondLabels = false;
    // Create the GLViewer viewer.
    function createViewer(
    //cameraPosition: any, cameraOrientation: any, zoomLevel: any, 
    showAtomLabels, showBondLabels) {
        let viewerDiv = (0, html_js_1.createDiv)(viewerDivID, boundary);
        viewerDiv.className = "mol-container";
        viewerContainerDiv.appendChild(viewerDiv);
        let config = { backgroundColor: 'grey' };
        let viewer = $3Dmol.createViewer(viewerDiv, config);
        // Set the viewer style to stick and ball.
        viewer.setStyle({ stick: {} });
        // Create a 3Dmol viewer control to turn labels on and off.
        molecule.getAtoms().atoms.forEach(function (atom) {
            let et = atom.getElementType();
            let color;
            if (et == undefined) {
                color = 'Purple';
            }
            else {
                color = mesmer_js_1.Mesmer.atomColors.get(et) || 'Purple';
            }
            //let am: number = Mesmer.atomMasses.get(atom.getElementType()) || 1;
            let radius;
            if (et == undefined) {
                radius = 100;
            }
            else {
                radius = mesmer_js_1.Mesmer.atomRadii.get(atom.getElementType()) || 100;
            }
            let ax = atom.getX3()?.toNumber() || 0;
            let ay = atom.getY3()?.toNumber() || 0;
            let az = atom.getZ3()?.toNumber() || 0;
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: 0.3 * am / 10.0, color: color });
            viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: radius / 110.0, color: color });
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: (radius * (am ** (1 / 3.0))) / 275.0, color: color });
            if (showAtomLabels) {
                viewer.addLabel(atom.getID(), { position: { x: ax, y: ay, z: az } });
            }
        });
        //console.log("molecule.getBonds().bonds.size " + molecule.getBonds().bonds.size);
        molecule.getBonds().bonds.forEach(function (bond) {
            //console.log("bond.atomRefs2 " + bond.getAtomRefs2());
            let ids = bond.getAtomRefs2().split(" ");
            let aa = molecule.getAtoms();
            let a0 = aa.getAtom(ids[0]);
            let a1 = aa.getAtom(ids[1]);
            let order = bond.getOrder() || 1;
            let color = mesmer_js_1.Mesmer.bondColors.get(order) || 'Purple';
            // a0.
            let a0x = a0.getX3()?.toNumber() || 0;
            let a0y = a0.getY3()?.toNumber() || 0;
            let a0z = a0.getZ3()?.toNumber() || 0;
            // a1.
            let a1x = a1.getX3()?.toNumber() || 0;
            let a1y = a1.getY3()?.toNumber() || 0;
            let a1z = a1.getZ3()?.toNumber() || 0;
            viewer.addCylinder({ start: { x: a0x, y: a0y, z: a0z }, end: { x: a1x, y: a1y, z: a1z }, radius: 0.06 * order, color: color });
            if (showBondLabels) {
                viewer.addLabel(bond.getID(), { position: { x: (a0x + a1x) / 2, y: (a0y + a1y) / 2, z: (a0z + a1z) / 2 } });
            }
        });
        viewer.zoomTo();
        viewer.render();
        /*
        if (cameraPosition != undefined) {
            viewer.setCameraPosition(cameraPosition);
        }
        if (cameraOrientation != undefined) {
            viewer.setCameraOrientation(cameraOrientation);
        }
        if (zoomLevel != undefined) {
            viewer.zoom(zoomLevel, 2000);
        } else {
            viewer.zoom(0.8, 2000);
        }
        return viewer;
        */
        viewer.zoom(0.8, 2000);
        return viewer;
    }
    // Add a redraw button.
    let redrawButton = (0, html_js_1.createButton)("Draw/Redraw", undefined);
    let viewer;
    redrawButton.addEventListener('click', () => {
        remove(viewerDivID);
        viewer = createViewer(
        //undefined, undefined, undefined, 
        showAtomLabels, showBondLabels);
    });
    viewerContainerDiv.appendChild(redrawButton);
    // Helper function to create a label button for hiding or showing labels on the viewer.
    function createLabelButton(label, id, showState, updateState) {
        let button = (0, html_js_1.createButton)((showState ? "Hide " : "Show ") + label, id, boundary);
        button.addEventListener('click', () => {
            if (showState) {
                button.textContent = "Show " + label;
                showState = false;
            }
            else {
                button.textContent = "Hide " + label;
                showState = true;
            }
            /*
            let cameraPosition = viewer.getCameraPosition();
            let cameraOrientation = viewer.getCameraOrientation();
            let zoomLevel = viewer.getZoomLevel();
            */
            updateState(showState);
            remove(viewerDivID);
            viewer = createViewer(
            //cameraPosition, cameraOrientation, zoomLevel,
            showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, addRID(molecule.getID(), s_Atom_Labels), showAtomLabels, newState => showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, addRID(molecule.getID(), s_Bond_Labels), showBondLabels, newState => showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton = (0, html_js_1.createButton)("Save as PNG", addRID(molecule.getID(), s_save), boundary1);
    saveButton.addEventListener('click', () => {
        //viewer.pngURI({ backgroundColor: 'white', download: true });
        let canvas = viewer.pngURI();
        let a = document.createElement('a');
        a.href = canvas;
        let title = mesmer.getTitle()?.value;
        a.download = title.replace(/[^a-z0-9]/gi, '_') + 'mol.png';
        document.body.appendChild(a); // Append the anchor to the body.
        a.click(); // Programmatically click the anchor to trigger the download.
        document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
        console.log('Save Image');
    });
    viewerContainerDiv.appendChild(saveButton);
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
    let xml2Div = (0, html_js_1.createDiv)(xml2DivID, level1);
    let xmlcDiv = (0, html_js_1.getCollapsibleDiv)(xml2DivID, xmlDiv, null, xml2Div, xmlFilename, boundary1, level0);
    let xmlPre = document.createElement("pre");
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
function processPropertyScalarNumber(pl, p, units, molecule, element, plDiv, boundary, level) {
    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs = new Set();
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName(molecule_js_1.PropertyScalarNumber.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + molecule_js_1.PropertyScalarNumber.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString = (0, xml_js_1.getInputString)(scalarNodes[0]);
        let value = new big_js_1.default(inputString);
        let psAttributes = (0, xml_js_1.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new molecule_js_1.PropertyScalarNumber(psAttributes, value);
        p.setProperty(ps);
        ps.setValue = function (value) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + value);
            if (p.dictRef == molecule_js_1.ZPE.dictRef) {
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        }.bind(ps);
        let div = processNumber(addRID(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, () => pl.removeProperty(p.dictRef), boundary1, level1);
        addAnyUnits(units, psAttributes, div, div.querySelector(s_input), addRID(plDiv.id, p.dictRef, molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, boundary, boundary);
        plDiv.appendChild(div);
    }
    else {
        // PropertyArray.
        let arrayNodes = element.getElementsByTagName(molecule_js_1.PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + molecule_js_1.PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString = (0, xml_js_1.getInputString)(arrayNodes[0]);
            if (inputString != "") {
                let values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
                let paAttributes = (0, xml_js_1.getAttributes)(arrayNodes[0]);
                let pa = new molecule_js_1.PropertyArray(paAttributes, values);
                p.setProperty(pa);
                let div = processNumberArray(addRID(plDiv.id, p.dictRef), p.dictRef, pa, pa.getValues.bind(pa), pa.setValues, () => pl.removeProperty(p.dictRef), boundary1, level1);
                addAnyUnits(units, paAttributes, div, div.querySelector(s_textarea), addRID(plDiv.id, p.dictRef, molecule_js_1.PropertyArray.s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(div);
            }
        }
        else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName(molecule_js_1.PropertyMatrix.tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) {
                    throw new Error("Expecting 1 " + molecule_js_1.PropertyMatrix.tagName + " but finding " + matrixNodes.length + "!");
                }
                let inputString = (0, xml_js_1.getInputString)(matrixNodes[0]);
                let values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
                let pmAttributes = (0, xml_js_1.getAttributes)(matrixNodes[0]);
                let pm = new molecule_js_1.PropertyMatrix(pmAttributes, values);
                p.setProperty(pm);
                let label = p.dictRef;
                // Create a new div element for the input.
                let inputDiv = (0, html_js_1.createLabelWithTextArea)(addRID(plDiv.id, p.dictRef), boundary, level, (event) => {
                    let target = event.target;
                    setNumberArrayNode(pm, target);
                }, inputString, label);
                let ta = inputDiv.querySelector('textarea');
                ta.value = inputString;
                (0, html_js_1.resizeTextAreaElement)(ta);
                ta.addEventListener('change', (event) => {
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + inputString);
                    //resizeInputElement(inputElement);
                    (0, html_js_1.resizeTextAreaElement)(ta);
                });
                addAnyUnits(units, pmAttributes, inputDiv, ta, addRID(plDiv.id, p.dictRef, html_js_1.s_select, "Units"), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            }
            else {
                throw new Error("Expecting " + molecule_js_1.PropertyScalarNumber.tagName + ", " + molecule_js_1.PropertyArray.tagName + " or "
                    + molecule_js_1.PropertyMatrix.tagName + " but finding none!");
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
function processPropertyScalarString(pl, p, molecule, element, plDiv, boundary, level) {
    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs = new Set();
    // PropertyScalarString.
    let scalarNodes = element.getElementsByTagName(molecule_js_1.PropertyScalarString.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + molecule_js_1.PropertyScalarString.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString = (0, xml_js_1.getInputString)(scalarNodes[0]);
        let psAttributes = (0, xml_js_1.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new molecule_js_1.PropertyScalarString(psAttributes, inputString);
        p.setProperty(ps);
        ps.setValue = function (value) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + value);
            if (p.dictRef == molecule_js_1.ZPE.dictRef) {
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        }.bind(ps);
        let div = processString(addRID(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, () => pl.removeProperty(p.dictRef), boundary1, level1);
        plDiv.appendChild(div);
    }
    else {
        console.log("Expecting " + molecule_js_1.PropertyScalarString.tagName + " but finding none!");
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
function addAnyUnits(units, attributes, divToAddTo, elementToInsertBefore, id, tagOrDictRef, boundary, level) {
    if (units != undefined) {
        let lws = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level);
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
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */
function processEnergyTransferModel(etm, molecule, element, moleculeDiv) {
    let xml_deltaEDowns = element.getElementsByTagName(molecule_js_1.DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmdivID = addRID(molecule.getID(), molecule_js_1.EnergyTransferModel.tagName);
        let etmDiv = document.createElement("div");
        let etmcDivID = addRID(etmdivID, s_container);
        let etmcDiv = (0, html_js_1.getCollapsibleDiv)(etmcDivID, moleculeDiv, null, etmDiv, molecule_js_1.EnergyTransferModel.tagName, boundary1, level1);
        let deltaEDowns = [];
        for (let k = 0; k < xml_deltaEDowns.length; k++) {
            let inputString = (0, xml_js_1.getInputString)(xml_deltaEDowns[k]);
            let value = new big_js_1.default(inputString);
            let deltaEDownAttributes = (0, xml_js_1.getAttributes)(xml_deltaEDowns[k]);
            let deltaEDown = new molecule_js_1.DeltaEDown(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = molecule_js_1.DeltaEDown.tagName;
            // Create a new div element for the input.
            let id = addRID(etmdivID, molecule_js_1.DeltaEDown.tagName, k);
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                let target = event.target;
                setNumberNode(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(new big_js_1.default(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, html_js_1.resizeInputElement)(target);
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel = document.createElement('label');
            unitsLabel.textContent = "units cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
/**
 * Set a molecule property array when the input value is changed.
 * @param node The NumberArayNode.
 * @param ta The HTMLTextAreaElement.
 */
function setNumberArrayNode(node, ta) {
    let inputString = ta.value.trim();
    let originalValues = (0, util_js_2.arrayToString)(node.values, " ");
    if (inputString == "") {
        alert("Empty input resetting...");
        ta.value = originalValues;
        return;
    }
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function (value) {
        if (!(0, util_js_1.isNumeric)(value)) {
            success = false;
        }
        else {
            values.push(new big_js_1.default(value));
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
        console.log("Changed " + node.tagName + " from: \"" + originalValues + "\" to: \"" + (0, util_js_2.arrayToString)(node.values, " ") + "\"");
        //console.log("molecule=" + molecule);
    }
    else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        ta.value = originalValues;
    }
}
exports.setNumberArrayNode = setNumberArrayNode;
/**
 * Set a molecule number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */
function setNumberNode(node, input) {
    try {
        let value = new big_js_1.default(input.value);
        //node.setValue(value);
        node.value = value;
    }
    catch (e) {
        alert("Value invalid, resetting...");
    }
    input.value = node.value.toString();
}
exports.setNumberNode = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml) {
    // Initialise reactions.
    reactions = new Map();
    // Create div to contain the reaction list.
    let reactionListDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    // Get the XML "reactionList" element.
    let xml_reactionList = (0, xml_js_1.getSingularElement)(xml, mesmer_js_1.ReactionList.tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames = new Set();
    xml_reactionList.childNodes.forEach(function (node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size != 1) {
        if (!(reactionListTagNames.size == 2 && reactionListTagNames.has("#text"))) {
            console.error("reactionListTagNames:");
            reactionListTagNames.forEach(x => console.error(x));
            throw new Error("Additional tag names in reactionList:");
        }
    }
    if (!reactionListTagNames.has(reaction_js_1.Reaction.tagName)) {
        throw new Error("Expecting tags with \"" + reaction_js_1.Reaction.tagName + "\" tagName but there are none!");
    }
    // Process the XML "reaction" elements.
    let xml_reactions = xml_reactionList.getElementsByTagName(reaction_js_1.Reaction.tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_reactions.length; i++) {
        // Set attributes.
        let reactionAttributes = (0, xml_js_1.getAttributes)(xml_reactions[i]);
        // Create reaction.
        let reaction = new reaction_js_1.Reaction(reactionAttributes);
        reactions.set(reaction.id, reaction);
        let reactionTagNames = new Set();
        let cns = xml_reactions[i].childNodes;
        // Create a new div for the reaction.
        let reactionDivID = addRID(reaction_js_1.Reaction.tagName, i);
        let reactionDiv = (0, html_js_1.createDiv)(reactionDivID);
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for (let j = 0; j < cns.length; j++) {
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!reactionTagNames.has(cn.nodeName)) {
                reactionTagNames.add(cn.nodeName);
            }
            else {
                // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                if (cn.nodeName != "#text") {
                    console.warn("Another ChildNode with nodeName=" + cn.nodeName);
                    //throw new Error("cn.nodeName appears twice in molecule.");
                }
            }
            //console.log(cn.nodeName);
        }
        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants = xml_reactions[i].getElementsByTagName(reaction_js_1.Reactant.tagName);
        reactionTagNames.delete(reaction_js_1.Reactant.tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new collapsible div for the reactants.
            let rsDivID = addRID(reactionDivID, reaction_js_1.Reactant.tagName);
            let rsDiv = (0, html_js_1.createDiv)(rsDivID);
            let rscDivID = addRID(rsDivID, s_container);
            let rscDiv = (0, html_js_1.getCollapsibleDiv)(rscDivID, reactionDiv, null, rsDiv, "Reactants", boundary1, level1);
            let reactants = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let reactantDivID = addRID(rsDivID, reaction_js_1.Reactant.tagName, j);
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_reactants[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let reactant = new reaction_js_1.Reactant((0, xml_js_1.getAttributes)(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.getRef() + " role", reaction_js_1.Reactant.roleOptions, "Role", molecule.getRole(), addRID(reactantDivID, html_js_1.s_select), boundary1, level1);
                lws.querySelector('select')?.addEventListener('change', (event) => {
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, html_js_1.resizeSelectElement)(target);
                });
                rsDiv.appendChild(lws);
            }
            reaction.setReactants(reactants);
        }
        // Load products.
        let xml_products = xml_reactions[i].getElementsByTagName(reaction_js_1.Product.tagName);
        reactionTagNames.delete(reaction_js_1.Product.tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            // Create collapsible div for the products.
            let psDivID = addRID(reactionDivID, reaction_js_1.Product.tagName);
            let psDiv = (0, html_js_1.createDiv)(psDivID);
            let pscDivID = addRID(psDivID, s_container);
            let pscDiv = (0, html_js_1.getCollapsibleDiv)(pscDivID, reactionDiv, null, psDiv, "Products", boundary1, level1);
            let products = [];
            for (let j = 0; j < xml_products.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_products[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let product = new reaction_js_1.Product((0, xml_js_1.getAttributes)(xml_products[j]), molecule);
                products.push(product);
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.getRef() + " role", reaction_js_1.Product.roleOptions, molecule.getRole(), molecule.getRef(), addRID(psDivID, j, "Role"), boundary1, level1);
                let select = lws.querySelector('select');
                select.value = molecule.getRole();
                select.addEventListener('change', (event) => {
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, html_js_1.resizeSelectElement)(target);
                });
                (0, html_js_1.resizeSelectElement)(select);
                psDiv.appendChild(lws);
            }
            reaction.setProducts(products);
        }
        // Create a new collapsible div for the reaction.
        let reactioncDivID = addRID(reactionDivID, s_container);
        let reactioncDiv = (0, html_js_1.getCollapsibleDiv)(reactioncDivID, reactionListDiv, null, reactionDiv, reaction.id + " (" + reaction.getLabel() + ")", boundary1, level1);
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(reaction_js_1.Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling = new reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws = (0, html_js_1.createLabelWithSelect)(reaction_js_1.Tunneling.tagName, reaction_js_1.Tunneling.options, "Tunneling", tunneling.getName(), addRID(reactionDivID, reaction_js_1.Tunneling.tagName), boundary1, level1);
            lws.querySelector('select')?.addEventListener('change', (event) => {
                let target = event.target;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
                (0, html_js_1.resizeSelectElement)(target);
            });
            reactionDiv.appendChild(lws);
        }
        // Load transition states.
        let xml_transitionStates = xml_reactions[i].getElementsByTagName(reaction_js_1.TransitionState.tagName);
        //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
        if (xml_transitionStates.length > 0) {
            // Create collapsible div.
            let tsDivID = addRID(reactionDivID, reaction_js_1.TransitionState.tagName);
            let tsDiv = (0, html_js_1.createDiv)(tsDivID);
            let tscDivID = addRID(tsDivID, s_container);
            let tscDiv = (0, html_js_1.getCollapsibleDiv)(tscDivID, reactionDiv, null, tsDiv, "Transition States", boundary1, level1);
            let transitionStates = [];
            for (let j = 0; j < xml_transitionStates.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_transitionStates[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let transitionState = new reaction_js_1.TransitionState((0, xml_js_1.getAttributes)(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label = (0, html_js_1.createLabel)(molecule.getRef() + " role transitionState", level1);
                tsDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
        }
        // Load MCRCMethod.
        //console.log("Load MCRCMethod...");
        let xml_MCRCMethod = xml_reactions[i].getElementsByTagName(reaction_js_1.MCRCMethod.tagName);
        //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
        //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
        if (xml_MCRCMethod.length > 0) {
            if (xml_MCRCMethod.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.MCRCMethod.tagName + " but finding " + xml_MCRCMethod.length + "!");
            }
            else {
                let mm;
                let mmAttributes = (0, xml_js_1.getAttributes)(xml_MCRCMethod[0]);
                let name = mmAttributes.get("name");
                let mmDivId = addRID(reactionDivID, reaction_js_1.MCRCMethod.tagName);
                let mmDiv = (0, html_js_1.createDiv)(mmDivId);
                if (name == undefined || name == reaction_js_1.MesmerILT.xsiType2) {
                    // Create a collapsible div.
                    let mmcDivId = addRID(mmDivId, s_container);
                    let mmcDiv = (0, html_js_1.getCollapsibleDiv)(mmcDivId, reactionDiv, null, mmDiv, reaction_js_1.MCRCMethod.tagName, boundary1, level1);
                    reactionDiv.appendChild(mmcDiv);
                    //console.log(MCRCMethod.tagName + " name=" + name);
                    let type = mmAttributes.get("xsi:type");
                    mm = new reaction_js_1.MesmerILT(mmAttributes);
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    if (type == reaction_js_1.MesmerILT.xsiType || type == reaction_js_1.MesmerILT.xsiType2) {
                        let xml_pe = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.PreExponential.tagName);
                        if (xml_pe != null) {
                            if (xml_pe[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_pe[0]);
                                let value = new big_js_1.default(inputString);
                                let peAttributes = (0, xml_js_1.getAttributes)(xml_pe[0]);
                                let pe = new reaction_js_1.PreExponential(peAttributes, value);
                                mm.setPreExponential(pe);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", addRID(mmDivId, reaction_js_1.PreExponential.tagName, s_input), boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(pe, target);
                                }, inputString, reaction_js_1.PreExponential.tagName);
                                mmDiv.appendChild(lwi);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, html_js_1.resizeInputElement)(input);
                                input.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    pe.value = new big_js_1.default(inputString);
                                    console.log(reaction_js_1.PreExponential.tagName + " changed to " + inputString);
                                    (0, html_js_1.resizeInputElement)(input);
                                });
                                addAnyUnits(undefined, peAttributes, lwi, null, addRID(mmDivId, reaction_js_1.PreExponential.tagName), reaction_js_1.PreExponential.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_ae = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.ActivationEnergy.tagName);
                        if (xml_ae != null) {
                            if (xml_ae[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_ae[0]);
                                let value = new big_js_1.default(inputString);
                                let aeAttributes = (0, xml_js_1.getAttributes)(xml_ae[0]);
                                let ae = new reaction_js_1.ActivationEnergy(aeAttributes, value);
                                mm.setActivationEnergy(ae);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", addRID(mmDivId, reaction_js_1.ActivationEnergy.tagName, s_input), boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(ae, target);
                                }, inputString, reaction_js_1.ActivationEnergy.tagName);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, html_js_1.resizeInputElement)(input);
                                input.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    ae.value = new big_js_1.default(inputString);
                                    console.log(reaction_js_1.ActivationEnergy.tagName + " changed to " + inputString);
                                    (0, html_js_1.resizeInputElement)(input);
                                });
                                addAnyUnits(undefined, aeAttributes, lwi, null, addRID(mmDivId, reaction_js_1.ActivationEnergy.tagName), reaction_js_1.ActivationEnergy.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_ti = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.TInfinity.tagName);
                        if (xml_ti != null) {
                            if (xml_ti[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_ti[0]);
                                let value = new big_js_1.default(inputString);
                                let tiAttributes = (0, xml_js_1.getAttributes)(xml_ti[0]);
                                let ti = new reaction_js_1.TInfinity(tiAttributes, value);
                                mm.setTInfinity(ti);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", addRID(mmDivId, reaction_js_1.TInfinity.tagName, s_input), boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(ti, target);
                                }, inputString, reaction_js_1.TInfinity.tagName);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, html_js_1.resizeInputElement)(input);
                                input.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    ti.value = new big_js_1.default(inputString);
                                    console.log(reaction_js_1.TInfinity.tagName + " changed to " + inputString);
                                    (0, html_js_1.resizeInputElement)(input);
                                });
                                addAnyUnits(undefined, tiAttributes, lwi, null, addRID(mmDivId, reaction_js_1.TInfinity.tagName), reaction_js_1.TInfinity.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_ni = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.NInfinity.tagName);
                        if (xml_ni != null) {
                            if (xml_ni[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_ni[0]);
                                let value = new big_js_1.default(inputString);
                                let niAttributes = (0, xml_js_1.getAttributes)(xml_ni[0]);
                                let ni = new reaction_js_1.NInfinity(niAttributes, value);
                                mm.setNInfinity(ni);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", addRID(mmDivId, reaction_js_1.NInfinity.tagName, s_input), boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(ni, target);
                                }, inputString, reaction_js_1.NInfinity.tagName);
                                mmDiv.appendChild(lwi);
                                let inputElement = lwi.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    ni.value = new big_js_1.default(inputString);
                                    console.log(reaction_js_1.NInfinity.tagName + " set to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, niAttributes, lwi, null, addRID(mmDivId, reaction_js_1.NInfinity.tagName), reaction_js_1.NInfinity.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                    }
                    else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                }
                else {
                    mm = new reaction_js_1.MCRCMethod(mmAttributes);
                    let mCRCMethodLabel = document.createElement('label');
                    mCRCMethodLabel.textContent = reaction_js_1.MCRCMethod.tagName + ": " + mmAttributes.get("name");
                    Object.assign(mCRCMethodLabel.style, level1);
                    mmDiv.appendChild(mCRCMethodLabel);
                    reactionDiv.appendChild(mmDiv);
                }
                reaction.setMCRCMethod(mm);
            }
        }
        // me:excessReactantConc
        let xml_erc = xml_reactions[i].getElementsByTagName(reaction_js_1.ExcessReactantConc.tagName);
        //console.log("n_me:excessReactantConc=" + xml_erc.length);
        if (xml_erc.length > 0) {
            if (xml_erc.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.ExcessReactantConc.tagName + " but finding " + xml_erc.length + "!");
            }
            let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_erc[0])));
            let erc = new reaction_js_1.ExcessReactantConc((0, xml_js_1.getAttributes)(xml_erc[0]), value);
            reaction.setExcessReactantConc(erc);
            let id = addRID(reactionDivID, reaction_js_1.ExcessReactantConc.tagName);
            let lwi = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                let target = event.target;
                setNumberNode(erc, target);
            }, value.toExponential(), reaction_js_1.ExcessReactantConc.tagName);
            reactionDiv.appendChild(lwi);
        }
        // me:canonicalRateList
        let xml_crl = xml_reactions[i].getElementsByTagName(reaction_js_1.CanonicalRateList.tagName);
        //console.log("n_me:canonicalRateList=" + xml_crl.length);
        if (xml_crl.length > 0) {
            if (xml_crl.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.CanonicalRateList.tagName + " but finding " + xml_crl.length + "!");
            }
            let clr_attributes = (0, xml_js_1.getAttributes)(xml_crl[0]);
            let crl = new reaction_js_1.CanonicalRateList(clr_attributes);
            reaction.setCanonicalRateList(crl);
            // Create a new collapsible div for the canonicalRateList.
            let crlDivID = addRID(reactionDivID, reaction_js_1.CanonicalRateList.tagName);
            let crlDiv = (0, html_js_1.createDiv)(crlDivID);
            let crlcDivID = addRID(crlDivID, s_container);
            let crlcDiv = (0, html_js_1.getCollapsibleDiv)(crlcDivID, reactionDiv, null, crlDiv, reaction_js_1.CanonicalRateList.tagName, boundary1, level1);
            reactionDiv.appendChild(crlcDiv);
            //let id = addID(reaction.id, CanonicalRateList.tagName);
            // me:description.
            let xml_d = xml_crl[0].getElementsByTagName(mesmer_js_1.Description.tagName);
            //console.log("xml_d.length=" + xml_d.length);
            if (xml_d.length > 0) {
                if (xml_d.length > 1) {
                    throw new Error("Expecting 1 " + mesmer_js_1.Description.tagName + " but finding " + xml_d.length + "!");
                }
                let description = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_d[0]));
                //console.log("description=" + description);
                crl.setDescription(new mesmer_js_1.Description((0, xml_js_1.getAttributes)(xml_d[0]), description));
                let l = (0, html_js_1.createLabel)(description + " (" + (0, util_js_1.mapToString)(clr_attributes) + ")", boundary1);
                let ldiv = (0, html_js_1.createDiv)(undefined, level1);
                ldiv.appendChild(l);
                crlDiv.appendChild(ldiv);
            }
            // me:kinf.
            let xml_k = xml_crl[0].getElementsByTagName(reaction_js_1.Kinf.tagName);
            //console.log("xml_k.length=" + xml_k.length);
            if (xml_k.length > 0) {
                // Create a table for the kinf.
                let t = (0, html_js_1.createTable)(addRID(crlDivID, reaction_js_1.Kinf.tagName, s_table), level1);
                crlDiv.appendChild(t);
                for (let j = 0; j < xml_k.length; j++) {
                    let k = new reaction_js_1.Kinf((0, xml_js_1.getAttributes)(xml_k[j]));
                    crl.addKinf(k);
                    // T.
                    let xml_T = xml_k[j].getElementsByTagName(mesmer_js_1.T.tagName);
                    //console.log("xml_T.length=" + xml_T.length);
                    if (xml_T.length > 0) {
                        if (xml_T.length > 1) {
                            throw new Error("Expecting 1 " + mesmer_js_1.T.tagName + " but finding " + xml_T.length + "!");
                        }
                        let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_T[0])));
                        k.setT(new mesmer_js_1.T((0, xml_js_1.getAttributes)(xml_T[0]), value));
                    }
                    // Val.
                    let xml_Val = xml_k[j].getElementsByTagName(reaction_js_1.Val.tagName);
                    //console.log("xml_Val.length=" + xml_Val.length);
                    if (xml_Val.length > 0) {
                        if (xml_Val.length > 1) {
                            throw new Error("Expecting 1 " + reaction_js_1.Val.tagName + " but finding " + xml_Val.length + "!");
                        }
                        let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_Val[0])));
                        k.setVal(new reaction_js_1.Val((0, xml_js_1.getAttributes)(xml_Val[0]), value));
                    }
                    // Rev.
                    let xml_Rev = xml_k[j].getElementsByTagName(reaction_js_1.Rev.tagName);
                    //console.log("xml_Rev.length=" + xml_Rev.length);
                    if (xml_Rev.length > 0) {
                        if (xml_Rev.length > 1) {
                            throw new Error("Expecting 1 " + reaction_js_1.Rev.tagName + " but finding " + xml_Rev.length + "!");
                        }
                        let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_Rev[0])));
                        k.setRev(new reaction_js_1.Rev((0, xml_js_1.getAttributes)(xml_Rev[0]), value));
                    }
                    // Keq.
                    let xml_Keq = xml_k[j].getElementsByTagName(reaction_js_1.Keq.tagName);
                    //console.log("xml_Keq.length=" + xml_Keq.length);
                    if (xml_Keq.length > 0) {
                        if (xml_Keq.length > 1) {
                            throw new Error("Expecting 1 " + reaction_js_1.Keq.tagName + " but finding " + xml_Keq.length + "!");
                        }
                        let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_Keq[0])));
                        k.setKeq(new reaction_js_1.Keq((0, xml_js_1.getAttributes)(xml_Keq[0]), value));
                    }
                    if (j == 0) {
                        // It maybe that only the first kinf contains unit details!
                        (0, html_js_1.addTableRow)(t, k.getHeader());
                    }
                    (0, html_js_1.addTableRow)(t, k.toStringArray());
                }
                addSaveAsCSVButton(crl.toCSV.bind(crl), crlDiv, t, reaction.id + "_" + reaction_js_1.CanonicalRateList.tagName, level1);
            }
        }
    }
    return reactionListDiv;
}
/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */
function processConditions(xml) {
    console.log(conditions_js_1.Conditions.tagName);
    // Create a div for the conditionss.
    let conditionssDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    // Get the XML "me:conditions" element.
    let xml_conditionss = xml.getElementsByTagName(conditions_js_1.Conditions.tagName);
    for (let i = 0; i < xml_conditionss.length; i++) {
        let xml_conditions = xml_conditionss[i];
        // Create a collapsible div for each conditions.
        let cDivID = addRID(conditions_js_1.Conditions.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        let ccDivID = addRID(cDivID, s_container);
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, conditionssDiv, null, cDiv, conditions_js_1.Conditions.tagName + " " + i.toString(), boundary1, level1);
        let conditions = addConditions((0, xml_js_1.getAttributes)(xml_conditions), i);
        handleBathGases(conditions, cDiv, xml_conditions);
        handlePTs(conditions, cDiv, xml_conditions);
        // Add a remove conditions button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the conditions.
            remove(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    }
    // Create an add button to add a conditions.
    createAddConditionsButton(conditionssDiv);
    return conditionssDiv;
}
/**
 * @param conditions The conditions.
 * @param cDiv The conditions div.
 * @param conditionsIndex The conditions index.
 * @param xml_conditions The XML conditions.
 */
function handleBathGases(conditions, cDiv, xml_conditions) {
    // Bath Gases
    // Create a collapsible div.
    let bsDivID = conditionsIDs.addID(cDiv.id, conditions_js_1.BathGas.tagName);
    let bsDiv = (0, html_js_1.createDiv)(bsDivID);
    let bscDivID = conditionsIDs.addID(cDiv.id, conditions_js_1.BathGas.tagName, s_container);
    let bscDiv = (0, html_js_1.getCollapsibleDiv)(bscDivID, cDiv, null, bsDiv, conditions_js_1.BathGas.tagName, boundary1, level1);
    // Add add button.
    let addBathGasButton = (0, html_js_1.createButton)(s_Add_sy_add, conditionsIDs.addID(cDiv.id, conditions_js_1.BathGas.tagName, html_js_1.s_button), level1);
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas = new conditions_js_1.BathGas(new Map(), s_selectOption);
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div = (0, html_js_1.createFlexDiv)(undefined, level1);
        let id = conditionsIDs.addID(cDiv.id, conditions_js_1.BathGas.tagName, bathGasIndex.toString());
        let select = createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), bathGas, true, id);
        select.classList.add(conditions_js_1.BathGas.tagName);
        div.appendChild(select);
        addRemoveButton(div, boundary1, (bathGas) => {
            bsDiv.removeChild(div);
            conditionsIDs.removeID(id),
                conditions.removeBathGas(bathGas);
        });
        bsDiv.insertBefore(div, addBathGasButton);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases = Array.from(xml_conditions.children).filter(child => child.tagName === conditions_js_1.BathGas.tagName);
        if (xml_bathGases.length > 0) {
            for (let i = 0; i < xml_bathGases.length; i++) {
                let attributes = (0, xml_js_1.getAttributes)(xml_bathGases[i]);
                let moleculeID = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGases[i]));
                let bathGas = new conditions_js_1.BathGas(attributes, moleculeID);
                //console.log("bathGas " + bathGas.toString());
                let bathGasIndex = conditions.addBathGas(bathGas);
                let id = conditionsIDs.addID(cDiv.id, conditions_js_1.BathGas.tagName, bathGasIndex.toString());
                let div = (0, html_js_1.createFlexDiv)(id, level1);
                div.appendChild(createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), bathGas, false, id));
                addRemoveButton(div, boundary1, (bathGas) => {
                    bsDiv.removeChild(div);
                    conditionsIDs.removeID(id);
                    conditions.removeBathGas(bathGas);
                });
                bsDiv.insertBefore(div, addBathGasButton);
            }
        }
        else {
            let div = (0, html_js_1.createFlexDiv)(undefined, level1);
            let id = conditionsIDs.addID(cDiv.id, conditions_js_1.BathGas.tagName, 0);
            div.appendChild(createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), undefined, false, id));
            addRemoveButton(div, boundary1, (bathGas) => {
                bsDiv.removeChild(div);
                conditionsIDs.removeID(id);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
    }
}
/**
 *
 * @param conditions
 * @param cDiv
 * @param xml_conditions
 * @param level
 * @param nextLevel
 */
function handlePTs(conditions, cDiv, xml_conditions) {
    // PTs
    let moleculeKeys = getMoleculeKeys(molecules);
    // Create collapsible div.
    let pTsDivId = conditionsIDs.addID(cDiv.id, conditions_js_1.PTs.tagName);
    let pTsDiv = (0, html_js_1.createDiv)(pTsDivId);
    let pTscDivId = conditionsIDs.addID(cDiv.id, pTsDivId, s_container);
    let pTscDiv = (0, html_js_1.getCollapsibleDiv)(pTscDivId, cDiv, null, pTsDiv, conditions_js_1.PTs.tagName, boundary1, level1);
    let pTs;
    if (xml_conditions) {
        let xml_PTss = xml_conditions.getElementsByTagName(conditions_js_1.PTs.tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) {
                throw new Error("Expecting 1 " + conditions_js_1.PTs.tagName + " but finding " + xml_PTss.length + "!");
            }
            let attributes = (0, xml_js_1.getAttributes)(xml_PTss[0]);
            let xml_PTpairs = xml_PTss[0].getElementsByTagName(conditions_js_1.PTpair.tagName);
            if (xml_PTpairs.length == 0) {
                throw new Error("Expecting 1 or more " + conditions_js_1.PTpair.tagName + " but finding 0!");
            }
            else {
                pTs = new conditions_js_1.PTs(attributes);
                for (let i = 0; i < xml_PTpairs.length; i++) {
                    let pTpairAttributes = (0, xml_js_1.getAttributes)(xml_PTpairs[i]);
                    //console.log("pTpairAttributes=" + mapToString(pTpairAttributes));
                    let pTpair = new conditions_js_1.PTpair(pTpairAttributes);
                    pTs.add(pTpair);
                    // BathGas.
                    let xml_bathGass = xml_PTpairs[i].getElementsByTagName(conditions_js_1.BathGas.tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) {
                            console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        }
                        pTpair.setBathGas(new conditions_js_1.BathGas((0, xml_js_1.getAttributes)(xml_bathGass[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGass[0]))));
                    }
                    // ExperimentRate.
                    let xml_ers = xml_PTpairs[i].getElementsByTagName(conditions_js_1.ExperimentalRate.tagName);
                    if (xml_ers.length > 0) {
                        if (xml_ers.length > 1) {
                            console.warn("xml_experimentRates.length=" + xml_ers.length);
                        }
                        pTpair.setExperimentalRate(new conditions_js_1.ExperimentalRate((0, xml_js_1.getAttributes)(xml_ers[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ers[0])).trim())));
                    }
                    // ExperimentalYield.
                    let xml_eys = xml_PTpairs[i].getElementsByTagName(conditions_js_1.ExperimentalYield.tagName);
                    if (xml_eys.length > 0) {
                        if (xml_eys.length > 1) {
                            console.warn("xml_experimentalYields.length=" + xml_eys.length);
                        }
                        pTpair.setExperimentalYield(new conditions_js_1.ExperimentalYield((0, xml_js_1.getAttributes)(xml_eys[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_eys[0])).trim())));
                    }
                    // ExperimentalEigenvalue.
                    let xml_ees = xml_PTpairs[i].getElementsByTagName(conditions_js_1.ExperimentalEigenvalue.tagName);
                    if (xml_ees.length > 0) {
                        if (xml_ees.length > 1) {
                            console.warn("xml_experimentalEigenvalues.length=" + xml_ees.length);
                        }
                        pTpair.setExperimentalEigenvalue(new conditions_js_1.ExperimentalEigenvalue((0, xml_js_1.getAttributes)(xml_ees[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ees[0])).trim())));
                    }
                    // Create pTpairDiv.
                    pTsDiv.appendChild(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, i, moleculeKeys, level1));
                }
            }
        }
        else {
            pTs = new conditions_js_1.PTs(new Map());
        }
    }
    else {
        pTs = new conditions_js_1.PTs(new Map());
    }
    conditions.setPTs(pTs);
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = (0, html_js_1.createDiv)(undefined, level1);
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton = (0, html_js_1.createButton)(s_Add_sy_add, undefined, boundary1);
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', () => {
        // Create a new PTpair.
        let pTpairAttributes = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair = new conditions_js_1.PTpair(pTpairAttributes);
        let pTpairIndex = pTs.add(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, html_js_1.createButton)(s_Add_from_spreadsheet, undefined, boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, html_js_1.createFlexDiv)(undefined, level1);
        let addFromSpreadsheetId = addRID(conditions_js_1.PTs.tagName, "addFromSpreadsheet");
        let input = (0, html_js_1.createInput)("text", addFromSpreadsheetId, level1);
        div.appendChild(input);
        pTsDiv.insertBefore(div, pTsButtonsDiv);
        // Add an event listener to the inputElement.
        input.addEventListener('change', () => {
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray = input.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTpairsArray[0].split("\t").forEach((value, i) => {
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for (let i = 1; i < pTpairsArray.length; i++) {
                    let pTpairArray = pTpairsArray[i].split("\t");
                    let pIndex = index.get("P");
                    let p = new big_js_1.default(pTpairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTpairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair = new conditions_js_1.PTpair(pTpairAttributes);
                    pTs.add(pTpair);
                    let tIndex = index.get("T");
                    let t = new big_js_1.default(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has(conditions_js_1.PTpair.s_excessReactantConc)) {
                        let excessReactantConIndex = index.get(conditions_js_1.PTpair.s_excessReactantConc);
                        let excessReactantConc = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set(conditions_js_1.PTpair.s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has(conditions_js_1.PTpair.s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex = index.get(conditions_js_1.PTpair.s_percentExcessReactantConc);
                        let percentExcessReactantConc = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set(conditions_js_1.PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has(conditions_js_1.PTpair.s_precision)) {
                        console.log("index.has(PTpair.s_precision)");
                        let precisionIndex = index.get(conditions_js_1.PTpair.s_precision);
                        let precision = pTpairArray[precisionIndex];
                        pTpairAttributes.set(conditions_js_1.PTpair.s_precision, precision);
                        //console.log("precision=" + precision);
                    }
                    if (index.has(conditions_js_1.BathGas.tagName)) {
                        let bathGasIndex = index.get(conditions_js_1.BathGas.tagName);
                        let bathGas = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new conditions_js_1.BathGas(new Map(), bathGas));
                    }
                    if (index.has(conditions_js_1.ExperimentalRate.tagName)) {
                        let eri = index.get(conditions_js_1.ExperimentalRate.tagName);
                        let er = pTpairArray[eri];
                        if (er.length > 0) {
                            pTpairAttributes.set(conditions_js_1.ExperimentalRate.tagName, er);
                            pTpair.setExperimentalRate(new conditions_js_1.ExperimentalRate(new Map(), new big_js_1.default(er)));
                            // Set the attributes of the experimentalRate.
                            // ref1.
                            let err1i = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_ref1);
                            let err1 = pTpairArray[err1i];
                            pTpair.getExperimentalRate()?.setRef1(err1);
                            // ref2.
                            let err2i = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_ref2);
                            let err2 = pTpairArray[err2i];
                            pTpair.getExperimentalRate()?.setRef2(err2);
                            // refReaction.
                            let errri = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_refReaction);
                            let errr = pTpairArray[errri];
                            pTpair.getExperimentalRate()?.setRefReaction(errr);
                            // error.
                            let erei = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_error);
                            let ere = pTpairArray[erei];
                            pTpair.getExperimentalRate()?.setError(new big_js_1.default(ere));
                        }
                    }
                    if (index.has(conditions_js_1.ExperimentalYield.tagName)) {
                        let eyi = index.get(conditions_js_1.ExperimentalYield.tagName);
                        let ey = pTpairArray[eyi];
                        if (ey.length > 0) {
                            pTpair.setExperimentalYield(new conditions_js_1.ExperimentalYield(new Map(), new big_js_1.default(ey)));
                            // Set the attributes of the experimentalYield.
                            // ref.
                            let eyri = index.get(conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_ref);
                            let eyr = pTpairArray[eyri];
                            pTpair.getExperimentalYield()?.setRef(eyr);
                            // yieldTime.
                            let eyyti = index.get(conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_yieldTime);
                            let eyyt = pTpairArray[eyyti];
                            pTpair.getExperimentalYield()?.setYieldTime(new big_js_1.default(eyyt));
                            // error.
                            let eyei = index.get(conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_error);
                            let eye = pTpairArray[eyei];
                            pTpair.getExperimentalYield()?.setError(new big_js_1.default(eye));
                        }
                    }
                    if (index.has(conditions_js_1.ExperimentalEigenvalue.tagName)) {
                        let eei = index.get(conditions_js_1.ExperimentalEigenvalue.tagName);
                        let ee = pTpairArray[eei];
                        if (ee.length > 0) {
                            pTpair.setExperimentalEigenvalue(new conditions_js_1.ExperimentalEigenvalue(new Map(), new big_js_1.default(ee)));
                            // Set the attributes of the experimentalEigenvalue.
                            // EigenvalueID.
                            let eeeidi = index.get(conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.s_EigenvalueID);
                            let eeeid = pTpairArray[eeeidi];
                            pTpair.getExperimentalEigenvalue()?.setEigenvalueID(eeeid);
                            // error.
                            let eeei = index.get(conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.s_error);
                            let eee = pTpairArray[eeei];
                            pTpair.getExperimentalEigenvalue()?.setError(new big_js_1.default(eee));
                        }
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex = pTs.ptps.length - 1;
                    // Create a new div for the PTpair.
                    pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton = (0, html_js_1.createButton)("Remove All", undefined, boundary1);
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener('click', () => {
        pTs.clear();
        // Remove all elements before the pTsButtonsDiv.
        let child = pTsDiv.firstChild;
        while (child != null && child != pTsButtonsDiv) {
            let nextSibling = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
}
/**
 * @param controlsDiv
 * @param level The level.
 * @returns A button.
 */
function createAddConditionsButton(conditionssDiv) {
    let button = (0, html_js_1.createButton)(s_Add_sy_add, undefined, level1);
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        // Create collapsible div.
        let cDivID = addRID(conditions_js_1.Conditions.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        let ccDivID = addRID(cDivID, s_container);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_js_1.getID)(conditions_js_1.Conditions.tagName, (i - 1).toString(), s_container));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) {
                    elementToInsertBefore = nextElementSibling;
                }
                else {
                    elementToInsertBefore = button;
                }
            }
            else {
                elementToInsertBefore = button;
            }
        }
        else {
            elementToInsertBefore = button;
        }
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, conditionssDiv, elementToInsertBefore, cDiv, conditions_js_1.Conditions.tagName + " " + i.toString(), boundary1, level1);
        // Add the conditions
        let conditions = addConditions(new Map(), i);
        handleBathGases(conditions, cDiv, null);
        handlePTs(conditions, cDiv, null);
        // Add a remove conditions button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the conditions.
            remove(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    });
    return button;
}
/**
 * Add and return a new conditions.
 */
function addConditions(attributes, i) {
    let conditions = new conditions_js_1.Conditions(attributes, i);
    mesmer.addConditions(conditions);
    return conditions;
}
/**
 * @param pTs The PTs.
 * @param pTsDiv The PTs div.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param pTIndex The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */
function createPTpairDiv(pTs, pTsDiv, pTpair, cDivID, pTIndex, moleculeKeys, level) {
    let pTpairDiv = (0, html_js_1.createFlexDiv)(addRID(pTsDiv.id, pTIndex), level);
    addPorT(pTpairDiv, conditions_js_1.PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits(mesmer_js_1.Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, null, conditions_js_1.PTpair.tagName, conditions_js_1.PTpair.tagName, boundary1, level1);
    addPorT(pTpairDiv, conditions_js_1.PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    //let id: string = conditionsIDs.addID(cDivID, pTsDiv.id, pTIndex.toString());
    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, addID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, conditions_js_1.PTpair.s_excessReactantConc, createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    addPercentExcessReactantConc(pTpairDiv, pTpair);
    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, addID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, conditions_js_1.PTpair.s_precision, createPrecisionSelectElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_precision, createPrecisionSelectElement,
    //    (pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // BathGas.
    //addButtonWithToggle(pTpairDiv, pTpair, BathGas.tagName, addID(id, BathGas.tagName),
    //    [pTpair, moleculeKeys, true], createBathGasSelectElement);
    addBathGas(pTpairDiv, pTpair, moleculeKeys);
    /*
    addAttribute(pTpairDiv, pTpair, pTIndex, BathGas.tagName, createBathGasSelectElement,
        (pTpair, attribute) => pTpair.getBathGas() !== undefined,  (pTpair, attribute) => pTpair.getBathGas(), moleculeKeys
    );
    */
    // ExperimentalRate.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalRate.tagName, addID(id, ExperimentalRate.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalRateDetails);
    //addExperimentalRate(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, conditions_js_1.ExperimentalRate.tagName, (pTpair) => pTpair.getExperimentalRate(), createExperimentalRateDetails);
    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, addID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, conditions_js_1.ExperimentalYield.tagName, (pTpair) => pTpair.getExperimentalYield(), createExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, addID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, conditions_js_1.ExperimentalEigenvalue.tagName, (pTpair) => pTpair.getExperimentalEigenvalue(), createExperimentalEigenvalueDetails);
    // Function to be used to remove a PTpair.
    let removePTpair = (pTpairDiv, i, pTpair) => {
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) {
            pTs.remove(i);
        }
        pTpair.removeBathGas();
    };
    addRemoveButton(pTpairDiv, boundary1, removePTpair, pTpairDiv, pTIndex, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */
function addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, html_js_1.createLabelWithInput)("text", conditions_js_1.PTpair.tagName + "_" + name, boundary1, level0, (event) => {
        let target = event.target;
        try {
            setter(new big_js_1.default(target.value));
            console.log(`Set ${name} to ${target.value}`);
        }
        catch (e) {
            alert("Invalid input, resetting...");
            input.value = getValue(getter);
        }
        (0, html_js_1.resizeInputElement)(target);
    }, getValue(getter), name);
    let input = lwi.querySelector('input');
    input.value = getValue(getter);
    (0, html_js_1.resizeInputElement)(input);
    pTpairDiv.appendChild(lwi);
}
function getValue(getter) {
    let value = getter();
    if (value !== undefined) {
        return value.toString();
    }
    else {
        return "";
    }
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 */
function addPercentExcessReactantConc(pTpairDiv, pTpair) {
    let id = addRID(pTpairDiv.id, conditions_js_1.PTpair.s_percentExcessReactantConc);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.appendChild(div);
    let attribute = conditions_js_1.PTpair.s_percentExcessReactantConc;
    let buttonTextContentSelected = attribute + sy_selected;
    let buttonTextContentDeselected = attribute + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, addRID(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
    }
    else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
        }
        else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param conditionsIndex The conditions index.
 * @param pTIndex The pTindex.
 * @param attribute The attribute.
 * @param createInputElement The function to create the input element.
 */
function addAttribute(pTpairDiv, pTpair, attribute, createInputElement) {
    let id = addRID(pTpairDiv.id, attribute);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = attribute + sy_selected;
    let buttonTextContentDeselected = attribute + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, addRID(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = addRID(id, s_input);
    if (pTpair.attributes.has(attribute)) {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        let input = createInputElement(iid, pTpair);
        div.insertBefore(input, button.nextSibling);
    }
    else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = createInputElement(iid, pTpair);
            div.insertBefore(input, button.nextSibling);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            remove(iid);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */
function addBathGas(pTpairDiv, pTpair, moleculeKeys) {
    let id = addRID(pTpairDiv.id, conditions_js_1.BathGas.tagName);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.appendChild(div);
    let tagName = conditions_js_1.BathGas.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, addRID(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = addRID(id, s_input);
    let bathGas = pTpair.getBathGas();
    if (bathGas == undefined) {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    else {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) {
            console.warn("moleculeKeys does not contain " + bathGas.value);
        }
        div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false));
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            remove(iid);
        }
    });
}
/**
 *
 * @param pTpairDiv
 * @param pTpair
 * @param conditionsIndex
 * @param pTIndex
 * @param tagName
 * @param getAttribute
 * @param createElement
 */
function addExperimentalElement(pTpairDiv, pTpair, pTIndex, tagName, getAttribute, createElement) {
    let id = addRID(pTpairDiv.id, tagName);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, addRID(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = addRID(id, s_input);
    if (getAttribute(pTpair) == undefined) {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    else {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        div.appendChild(createElement(iid, pTpair, pTIndex));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createElement(iid, pTpair, pTIndex));
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            remove(iid);
        }
    });
}
/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */
function createPrecisionSelectElement(id, pTpair) {
    let value;
    if (pTpair.attributes.has(conditions_js_1.PTpair.s_precision)) {
        value = pTpair.attributes.get(conditions_js_1.PTpair.s_precision);
    }
    else {
        value = mesmer_js_1.Mesmer.precisionOptions[0];
    }
    let select = (0, html_js_1.createSelectElement)(mesmer_js_1.Mesmer.precisionOptions, conditions_js_1.PTpair.s_precision, value, id, boundary1);
    select.addEventListener('change', (event) => {
        let target = event.target;
        pTpair.setPrecision(target.value);
        console.log("Set " + conditions_js_1.PTpair.s_precision + " to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    (0, html_js_1.resizeSelectElement)(select);
    return select;
}
/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */
function createExcessReactantConcInputElement(id, pTpair) {
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    let value;
    if (pTpair.attributes.has(conditions_js_1.PTpair.s_excessReactantConc)) {
        value = pTpair.attributes.get(conditions_js_1.PTpair.s_excessReactantConc);
    }
    else {
        value = NaN.toString();
    }
    console.log(conditions_js_1.PTpair.s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener('change', (event) => {
        let target = event.target;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + conditions_js_1.PTpair.s_excessReactantConc + " to " + target.value);
        (0, html_js_1.resizeInputElement)(target);
    });
    (0, html_js_1.resizeInputElement)(input);
    return input;
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */
function createBathGasSelectElement(id, pTpair, bathGas, first) {
    //console.log("createBathGasSelectElement");
    //console.log("pTpair " + pTpair.toString());
    let select = createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), bathGas, first, id);
    //select.id = id;
    select.addEventListener('change', (event) => {
        let target = event.target;
        pTpair.setBathGas(new conditions_js_1.BathGas(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    (0, html_js_1.resizeSelectElement)(select);
    return select;
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 * @param first True if this is the first selection, flase otherwise?
 * @param id The id used to generate other ids.
 */
function createSelectElementBathGas(options, bathGas, first, id) {
    let value;
    if (first) {
        options.push(s_selectOption);
    }
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    if (bathGas == undefined) {
        bathGas = new conditions_js_1.BathGas(new Map(), s_selectOption);
        value = s_selectOption;
    }
    else {
        value = bathGas.value;
    }
    let select = (0, html_js_1.createSelectElement)(options, conditions_js_1.BathGas.tagName, value, addRID(id, html_js_1.s_select), boundary1);
    select.classList.add(conditions_js_1.BathGas.tagName);
    selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event) => {
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as " + conditions_js_1.BathGas.tagName);
        (0, html_js_1.resizeSelectElement)(target);
    });
    select.value = value;
    (0, html_js_1.resizeSelectElement)(select);
    return select;
}
function createExperimentalRateDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, pTpair => pTpair.getExperimentalRate(), (pTpair, value) => pTpair.setExperimentalRate(value), conditions_js_1.ExperimentalRate, [
        {
            tagName: conditions_js_1.ExperimentalRate.tagName, type: "number",
            eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalRate(), target),
            valueGetter: () => pTpair.getExperimentalRate().value.toString()
        },
        {
            tagName: conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_ref1, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef1(target.value),
            valueGetter: () => pTpair.getExperimentalRate().getRef1()
        },
        {
            tagName: conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_ref2, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef2(target.value),
            valueGetter: () => pTpair.getExperimentalRate().getRef2()
        },
        {
            tagName: conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_refReaction, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRefReaction(target.value),
            valueGetter: () => pTpair.getExperimentalRate().getRefReaction()
        },
        {
            tagName: conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setError(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalRate().getError().toString()
        }
    ]);
}
function createExperimentalYieldDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, pTpair => pTpair.getExperimentalYield(), (pTpair, value) => pTpair.setExperimentalYield(value), conditions_js_1.ExperimentalYield, [
        {
            tagName: conditions_js_1.ExperimentalYield.tagName, type: "number",
            eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalYield(), target),
            valueGetter: () => pTpair.getExperimentalYield().value.toString()
        },
        {
            tagName: conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_ref, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setRef(target.value),
            valueGetter: () => pTpair.getExperimentalYield().getRef()
        },
        {
            tagName: conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_yieldTime, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setYieldTime(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalYield().getYieldTime().toString()
        },
        {
            tagName: conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setError(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalYield().getError().toString()
        }
    ]);
}
function createExperimentalEigenvalueDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, pTpair => pTpair.getExperimentalEigenvalue(), (pTpair, value) => pTpair.setExperimentalEigenvalue(value), conditions_js_1.ExperimentalEigenvalue, [
        {
            tagName: conditions_js_1.ExperimentalEigenvalue.tagName, type: "number",
            eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalEigenvalue(), target),
            valueGetter: () => pTpair.getExperimentalEigenvalue().value.toString()
        },
        {
            tagName: conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.s_EigenvalueID, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
            valueGetter: () => pTpair.getExperimentalEigenvalue().getEigenvalueID()
        },
        {
            tagName: conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setError(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalEigenvalue().getError().toString()
        }
    ]);
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param getExperimental The getter.
 * @param setExperimental The setter.
 * @param ExperimentalClass The class.
 * @param details The details.
 * @returns HTMLDivElement.
 */
function addExperimentalDetails(pTpair, id, getExperimental, setExperimental, ExperimentalClass, details) {
    let div = (0, html_js_1.createDiv)(undefined, boundary1);
    div.id = id;
    let experimental = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), big0);
        setExperimental(pTpair, experimental);
    }
    for (let detail of details) {
        let detailId = id + "_" + detail.tagName;
        div.appendChild((0, html_js_1.createLabelWithInput)(detail.type, detailId, boundary1, level0, (event) => {
            let target = event.target;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            (0, html_js_1.resizeInputElement)(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function processModelParameters(xml) {
    console.log(modelParameters_js_1.ModelParameters.tagName);
    // Create a div for the modelParameterss.
    let mpsDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    let xml_mps = xml.getElementsByTagName(modelParameters_js_1.ModelParameters.tagName);
    for (let i = 0; i < xml_mps.length; i++) {
        // Create a collapsible div for the model parameters.
        let mpDivID = addRID(modelParameters_js_1.ModelParameters.tagName, i.toString());
        let mpDiv = (0, html_js_1.createDiv)(mpDivID, boundary1);
        let mpcDivID = addRID(mpDivID, s_container);
        let mpcDiv = (0, html_js_1.getCollapsibleDiv)(mpcDivID, mpsDiv, null, mpDiv, modelParameters_js_1.ModelParameters.tagName + " " + i.toString(), boundary1, level1);
        let mp = addModelParameters((0, xml_js_1.getAttributes)(xml_mps[i]), i);
        processGrainSize(mp, xml_mps[i], mpDiv);
        //setGrainSize(mp, xml_mps[i], mpDiv);
        processModelParametersN(mp, xml_mps[i], mpDiv, control_js_1.AutomaticallySetMaxEne, mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne);
        processModelParametersN(mp, xml_mps[i], mpDiv, modelParameters_js_1.EnergyAboveTheTopHill, mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill);
        processModelParametersN(mp, xml_mps[i], mpDiv, modelParameters_js_1.MaxTemperature, mp.setMaxTemperature, mp.removeMaxTemperature);
        // Add a remove modelParameters button.
        let removeButton = addRemoveButton(mpDiv, level1, mesmer.removeModelParameters.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the modelParameters.
            remove(mpcDivID);
            modelParametersIDs.removeIDs(mpDivID);
        });
    }
    // Create an add button to add a modelParameters.
    createAddModelParametersButton(mpsDiv);
    return mpsDiv;
}
/**
 * Add and return a new modelParameters.
 */
function addModelParameters(attributes, i) {
    let mp = new modelParameters_js_1.ModelParameters(attributes, i);
    mesmer.addModelParameters(mp);
    return mp;
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function processGrainSize(mps, xml_mps, mpsDiv) {
    let tagName = modelParameters_js_1.GrainSize.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, html_js_1.createFlexDiv)(id, level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, html_js_1.s_button), boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, s_input);
    let gs;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
            let value = new big_js_1.default(valueString);
            gs = new modelParameters_js_1.GrainSize((0, xml_js_1.getAttributes)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, mesmer_js_1.Mesmer.energyUnits);
            button.classList.toggle(s_optionOff);
        }
        else {
            gs = getDefaultGrainsize(tagName);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    }
    else {
        gs = getDefaultGrainsize(tagName);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!mps.index.has(modelParameters_js_1.GrainSize.tagName)) {
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, mesmer_js_1.Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        }
        else {
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, util_js_1.getID)(idi, s_units))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function setGrainSize(mps, xml_mps, mpsDiv) {
    let tagName = modelParameters_js_1.GrainSize.tagName;
    let div = addGrainSize(mps, mpsDiv);
    // Save the current display style of the div
    let originalDisplay = div.style.display;
    // Make the div visible
    div.style.display = "block";
    let input = div.querySelector('input');
    // restore the original display style
    div.style.display = originalDisplay;
    //let input: HTMLInputElement = document.getElementById(getID(mpsDiv.id, tagName, s_input)) as HTMLInputElement;
    let xml = xml_mps.getElementsByTagName(tagName);
    if (xml.length > 0) {
        if (xml.length > 1) {
            console.warn("More than one GrainSize found in XML. The first is used!");
        }
        let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = new big_js_1.default(valueString);
        mps.getGrainSize().value = value;
        if (input !== null) {
            input.value = valueString;
            (0, html_js_1.resizeInputElement)(input);
        }
        else {
            console.warn("GrainSize input element not found.");
        }
    }
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function addGrainSize(mps, mpsDiv) {
    let tagName = modelParameters_js_1.GrainSize.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, html_js_1.createFlexDiv)(id, level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, html_js_1.s_button), boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, s_input);
    let gs;
    button.textContent = buttonTextContentDeselected;
    button.classList.toggle(s_optionOn);
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!mps.index.has(modelParameters_js_1.GrainSize.tagName)) {
            console.log("Adding GrainSize input");
            gs = getDefaultGrainsize(tagName);
            mps.setGrainSize(gs);
            createInputModelParameters(mps, div, gs, idi, gs.value.toString(), mps.setGrainSize, mesmer_js_1.Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        }
        else {
            console.log("Removing GrainSize input");
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, util_js_1.getID)(idi, s_units))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
    //button.click();
    return div;
}
function getDefaultGrainsize(tagName) {
    let value;
    let attributes;
    if (defaults != undefined) {
        let valueString = defaults.values.get(tagName) ?? "";
        if (valueString == "") {
            value = big0;
        }
        else {
            value = new big_js_1.default(valueString);
        }
        attributes = defaults.attributess.get(tagName) ?? new Map();
    }
    else {
        console.log(tagName + " set using hardcoded default.");
        value = new big_js_1.default(101);
        attributes = new Map();
        attributes.set(s_units, "cm-1");
    }
    return new modelParameters_js_1.GrainSize(attributes, value);
}
/**
 * Process numerical modelParameters.
 * @param mps The ModelParameters.
 * @param mpsDiv The modelParameters div.
 * @param xml_mps The xml modelParameters.
 */
function processModelParametersN(mps, xml_mps, mpsDiv, mpt, setModelParameter, removeModelParameter) {
    let tagName = mpt.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, html_js_1.createFlexDiv)(id, level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, html_js_1.s_button), boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, s_input);
    let mp;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
            let value = new big_js_1.default(valueString);
            mp = new mpt((0, xml_js_1.getAttributes)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.classList.toggle(s_optionOff);
        }
        else {
            valueString = "";
            mp = new mpt(new Map(), big0);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    }
    else {
        valueString = "";
        mp = new mpt(new Map(), big0);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the ModelParameter already exists
        if (!mps.index.has(tagName)) {
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        }
        else {
            //valueString = mp.value.toExponential();
            removeModelParameter();
            remove(idi);
            modelParametersIDs.removeID(idi);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * @param mps The model parameters.
 * @param div The div.
 * @param element The element.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 * @param setElementMethod The method to set the element.
 * @param units The units.
 */
function createInputModelParameters(mps, div, element, id, valueString, setElementMethod, units) {
    setElementMethod.call(mps, element);
    let input = (0, html_js_1.createInput)("text", id, boundary1);
    div.appendChild(input);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(element, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    addAnyUnits(units, element.attributes, div, input, (0, util_js_1.getID)(id, s_units), element.constructor.tagName, boundary1, boundary1);
}
/**
 * @param controlsDiv
 * @param level The level.
 * @returns A button.
 */
function createAddModelParametersButton(mpsDiv) {
    let button = (0, html_js_1.createButton)(s_Add_sy_add, undefined, level1);
    let tn = modelParameters_js_1.ModelParameters.tagName;
    mpsDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = mesmer.getNextModelParametersID();
        console.log("Add " + tn + i.toString());
        // Create collapsible div.
        let mpDivID = addRID(tn, i.toString());
        let mpDiv = (0, html_js_1.createDiv)(mpDivID, boundary1);
        let mpcDivID = addRID(mpDivID, s_container);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_js_1.getID)(tn, (i - 1).toString(), s_container));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == mpsDiv) {
                    elementToInsertBefore = nextElementSibling;
                }
                else {
                    elementToInsertBefore = button;
                }
            }
            else {
                elementToInsertBefore = button;
            }
        }
        else {
            elementToInsertBefore = button;
        }
        let mpcDiv = (0, html_js_1.getCollapsibleDiv)(mpcDivID, mpsDiv, elementToInsertBefore, mpDiv, tn + " " + i.toString(), boundary1, level1);
        // Add the modelParameters.
        let mp = addModelParameters(new Map(), i);
        addGrainSize(mp, mpDiv);
        processModelParametersN(mp, null, mpDiv, control_js_1.AutomaticallySetMaxEne, mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne);
        processModelParametersN(mp, null, mpDiv, modelParameters_js_1.EnergyAboveTheTopHill, mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill);
        processModelParametersN(mp, null, mpDiv, modelParameters_js_1.MaxTemperature, mp.setMaxTemperature, mp.removeMaxTemperature);
        // Add a remove modelParameters button.
        let removeButton = addRemoveButton(mpDiv, level1, mesmer.removeModelParameters.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the modelParameters.
            remove(mpcDivID);
            modelParametersIDs.removeIDs(mpDivID);
        });
    });
    return button;
}
/**
 * Parses xml to initialise controls.
 * @param xml The XML document.
 * @returns The controls div.
 *
 * Tag control options:
 * me:calculateRateCoefficientsOnly
 * me:printCellDOS
 * me:printCellTransitionStateFlux
 * me:printReactionOperatorColumnSums
 * me:printGrainBoltzmann
 * me:printGrainDOS
 * me:printGrainkbE
 * me:printGrainkfE
 * me:printTSsos
 * me:printGrainedSpeciesProfile
 * me:printGrainTransitionStateFlux
 * me:printReactionOperatorSize
 * me:printSpeciesProfile
 * me:printPhenomenologicalEvolution
 * me:printTunnelingCoefficients
 * me:printCrossingCoefficients
 * me:testDOS
 * me:testRateConstants
 * me:useTheSameCellNumberForAllConditions
 * me:hideInactive
 * me:ForceMacroDetailedBalance
 *
 * TagWithAttribute control options:
 * me:testMicroRates
 *
 * StringNode control options:
 * me:calcMethod "simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation", "ThermodynamicTable", "sensitivityAnalysis"
 *
 * NumberNode control options:
 * me:eigenvalues
 * me:shortestTimeOfInterest
 * me:MaximumEvolutionTime
 * me:automaticallySetMaxEne
 * me:diagramEnergyOffset
 */
function processControl(xml) {
    console.log(control_js_1.Control.tagName);
    // Create a div for the controls.
    let controlsDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    // Get the XML "me:control" element.
    let xml_controls = xml.getElementsByTagName(control_js_1.Control.tagName);
    for (let i = 0; i < xml_controls.length; i++) {
        //console.log("Control " + i);
        let xml_control = xml_controls[i];
        // Create a collapsible divfor the control.
        let cDivID = addRID(control_js_1.Control.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        controlsDiv.appendChild(cDiv);
        let ccDivID = addRID(cDivID, s_container);
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, controlsDiv, null, cDiv, control_js_1.Control.tagName + " " + i.toString(), boundary1, level1);
        let control = addControl((0, xml_js_1.getAttributes)(xml_control), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, html_js_1.createFlexDiv)(undefined, level1);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button) => {
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, null, level1);
        handleCalcMethod(control, cDiv, xml_control, level1);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, onOffControls, xml_control, level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // me:ForceMacroDetailedBalance
        let xml_fdb = xml_control.getElementsByTagName(control_js_1.ForceMacroDetailedBalance.tagName);
        if (xml_fdb.length == 1) {
            let fdb_attributes = (0, xml_js_1.getAttributes)(xml_fdb[0]);
            let s = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_fdb[0]));
            //console.log("ForceMacroDetailedBalance: " + s);
            // Maybe there is no value for the ForceMacroDetailedBalance?
            let fdb = new control_js_1.ForceMacroDetailedBalance(fdb_attributes, s);
            control.setForceMacroDetailedBalance(fdb);
            let fdbDiv = (0, html_js_1.createFlexDiv)(controlIDs.addID(cDivID, control_js_1.ForceMacroDetailedBalance.tagName), level1);
            cDiv.appendChild(fdbDiv);
            let fdbl = (0, html_js_1.createLabel)(control_js_1.ForceMacroDetailedBalance.tagName + " " + (0, util_js_1.mapToString)(fdb_attributes) + " " + s, boundary1);
            fdbDiv.appendChild(fdbl);
        }
        // Add a remove control button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            remove(ccDivID);
            controlIDs.removeIDs(cDivID);
        });
    }
    // Create an add button to add a control.
    createAddControlButton(controlsDiv, level1);
    return controlsDiv;
}
/**
 * @param control The control.
 * @return An array of the on/off control options.
 */
function getControlOptionsSimple(control) {
    return [
        { class: control_js_1.CalculateRateCoefficientsOnly, setMethod: control.setCalculateRateCoefficientsOnly, removeMethod: control.removeCalculateRateCoefficientsOnly },
        { class: control_js_1.PrintCellDOS, setMethod: control.setPrintCellDOS, removeMethod: control.removePrintCellDOS },
        { class: control_js_1.PrintCellTransitionStateFlux, setMethod: control.setPrintCellTransitionStateFlux, removeMethod: control.removePrintCellTransitionStateFlux },
        { class: control_js_1.PrintReactionOperatorColumnSums, setMethod: control.setPrintReactionOperatorColumnSums, removeMethod: control.removePrintReactionOperatorColumnSums },
        { class: control_js_1.PrintGrainBoltzmann, setMethod: control.setPrintGrainBoltzmann, removeMethod: control.removePrintGrainBoltzmann },
        { class: control_js_1.PrintGrainDOS, setMethod: control.setPrintGrainDOS, removeMethod: control.removePrintGrainDOS },
        { class: control_js_1.PrintGrainkbE, setMethod: control.setPrintGrainkbE, removeMethod: control.removePrintGrainkbE },
        { class: control_js_1.PrintGrainkfE, setMethod: control.setPrintGrainkfE, removeMethod: control.removePrintGrainkfE },
        { class: control_js_1.PrintTSsos, setMethod: control.setPrintTSsos, removeMethod: control.removePrintTSsos },
        { class: control_js_1.PrintGrainedSpeciesProfile, setMethod: control.setPrintGrainedSpeciesProfile, removeMethod: control.removePrintGrainedSpeciesProfile },
        { class: control_js_1.PrintGrainTransitionStateFlux, setMethod: control.setPrintGrainTransitionStateFlux, removeMethod: control.removePrintGrainTransitionStateFlux },
        { class: control_js_1.PrintReactionOperatorSize, setMethod: control.setPrintReactionOperatorSize, removeMethod: control.removePrintReactionOperatorSize },
        { class: control_js_1.PrintSpeciesProfile, setMethod: control.setPrintSpeciesProfile, removeMethod: control.removePrintSpeciesProfile },
        { class: control_js_1.PrintPhenomenologicalEvolution, setMethod: control.setPrintPhenomenologicalEvolution, removeMethod: control.removePrintPhenomenologicalEvolution },
        { class: control_js_1.PrintTunnelingCoefficients, setMethod: control.setPrintTunnelingCoefficients, removeMethod: control.removePrintTunnelingCoefficients },
        { class: control_js_1.PrintCrossingCoefficients, setMethod: control.setPrintCrossingCoefficients, removeMethod: control.removePrintCrossingCoefficients },
        { class: control_js_1.TestDOS, setMethod: control.setTestDOS, removeMethod: control.removeTestDOS },
        { class: control_js_1.TestRateConstant, setMethod: control.setTestRateConstants, removeMethod: control.removeTestRateConstants },
        { class: control_js_1.UseTheSameCellNumberForAllConditions, setMethod: control.setUseTheSameCellNumberForAllConditions, removeMethod: control.removeUseTheSameCellNumberForAllConditions },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        { class: control_js_1.ForceMacroDetailedBalance, setMethod: control.setForceMacroDetailedBalance, removeMethod: control.removeForceMacroDetailedBalance },
    ];
}
/**
 * @param control The control.
 * @return An array of the control items.
 */
function getControlItems(control) {
    return [
        { class: control_js_1.Eigenvalues, setMethod: control.setEigenvalues, removeMethod: control.removeEigenvalues },
        { class: control_js_1.ShortestTimeOfInterest, setMethod: control.setShortestTimeOfInterest, removeMethod: control.removeShortestTimeOfInterest },
        { class: control_js_1.MaximumEvolutionTime, setMethod: control.setMaximumEvolutionTime, removeMethod: control.removeMaximumEvolutionTime },
        { class: control_js_1.AutomaticallySetMaxEne, setMethod: control.setAutomaticallySetMaxEne, removeMethod: control.removeAutomaticallySetMaxEne },
        { class: control_js_1.DiagramEnergyOffset, setMethod: control.setDiagramEnergyOffset, removeMethod: control.removeDiagramEnergyOffset },
    ];
}
/**
 * @param controlsDiv
 * @param level The level.
 * @returns A button.
 */
function createAddControlButton(controlsDiv, level) {
    let button = (0, html_js_1.createButton)(s_Add_sy_add, undefined, level1);
    controlsDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = mesmer.getNextControlID();
        console.log("Add Control " + i.toString());
        let cDivID = addRID(control_js_1.Control.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_js_1.getID)(control_js_1.Control.tagName, (i - 1).toString(), s_container));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) {
                    elementToInsertBefore = nextElementSibling;
                }
                else {
                    elementToInsertBefore = button;
                }
            }
            else {
                elementToInsertBefore = button;
            }
        }
        else {
            elementToInsertBefore = button;
        }
        // Create a collapsible div for each conditions.
        let ccDivID = addRID(cDivID, s_container);
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, controlsDiv, elementToInsertBefore, cDiv, control_js_1.Control.tagName + " " + i.toString(), boundary1, level1);
        // Add the control
        let control = addControl(new Map(), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, html_js_1.createFlexDiv)(undefined, level);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button) => {
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, null, level);
        handleCalcMethod(control, cDiv, null, level);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, onOffControls, null, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            remove(ccDivID);
            controlIDs.removeIDs(cDivID);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */
function addControl(attributes, i) {
    let control = new control_js_1.Control(attributes, i);
    mesmer.addControl(control);
    return control;
}
/**
 * @param control The control.
 * @param div The div.
 * @param obj The object.
 * @param setControlMethod The set control method.
 * @param id The id for the input.
 * @param valueString The value string.
 */
function createInputControlItem(control, div, obj, setControlMethod, id, valueString) {
    setControlMethod.call(control, obj);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(obj, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 *
 * @param control The control.
 * @param cDiv The control div.
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */
function handleControl(control, cDiv, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
    let tagName = ControlClass.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (onOffControls) {
        onOffControls.set(tagName, button);
    }
    let controlInstance;
    let div;
    let id;
    if (level) {
        id = controlIDs.addID(cDiv.id, tagName);
        div = (0, html_js_1.createFlexDiv)(id, level);
        cDiv.appendChild(div);
        div.appendChild(button);
        id = controlIDs.addID(cDiv.id, id, s_input);
    }
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
                let value = new big_js_1.default(valueString);
                controlInstance = new ControlClass((0, xml_js_1.getAttributes)(xml[0]), value);
                createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
            }
            else {
                controlInstance = new ControlClass((0, xml_js_1.getAttributes)(xml[0]));
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(s_optionOff);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    }
    else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    button.addEventListener('click', (event) => {
        if (!control.index.has(tagName)) {
            if (handleInput) {
                createInputControlItem(control, div, controlInstance, setControlMethod, id, "");
            }
            else {
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
        }
        else {
            if (handleInput) {
                remove(id);
            }
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */
function handleCalcMethod(control, cDiv, xml_control, level) {
    //console.log("handleCalcMethod " + (xml_control == null));
    let div = (0, html_js_1.createFlexDiv)(undefined, level);
    cDiv.appendChild(div);
    let tagName = control_js_1.CalcMethod.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = controlIDs.addID(cDiv.id, tagName);
    let divCm = (0, html_js_1.createFlexDiv)(divCmId, boundary1);
    div.appendChild(divCm);
    let options = control_js_1.CalcMethod.options;
    let divCmDetailsId = controlIDs.addID(cDiv.id, divCmId, "details");
    let divCmDetailsSelectId = controlIDs.addID(cDiv.id, divCmDetailsId, "select");
    let cm;
    let first = true;
    if (xml_control != null) {
        //let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagNameNS("http://www.chem.leeds.ac.uk/mesmer", "calcMethod");
        let xml = xml_control.getElementsByTagName(tagName);
        //console.log("xml.length " + xml.length);
        if (xml.length > 0) {
            if (xml.length > 1) {
                throw new Error("More than one CalcMethod element.");
            }
            let attributes = (0, xml_js_1.getAttributes)(xml[0]);
            let xsi_type = attributes.get("xsi:type");
            cm = getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
        }
        else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    }
    else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                if (options[options.length - 1] != s_selectOption) {
                    options.push(s_selectOption);
                }
            }
            // Remove select.
            //remove(divCmId);
            remove(divCmDetailsId);
            remove(divCmDetailsSelectId);
            // Create the select element.
            let select = createSelectElementCalcMethod(control, div, options, tagName, s_selectOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(s_optionOn);
            button.classList.toggle(s_optionOff);
        }
        else {
            if (control.getCalcMethod() != null) {
                control.removeCalcMethod();
                // Remove any existing div.
                //remove(divCmId);
                remove(divCmDetailsId);
                //console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
                //console.log("button.textContent " + button.textContent);
                remove(divCmDetailsSelectId);
                button.textContent = buttonTextContentDeselected;
                button.classList.toggle(s_optionOn);
                button.classList.toggle(s_optionOff);
            }
        }
    });
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */
function handleTestMicroRates(control, cDiv, xml_control, level) {
    let tagName = control_js_1.TestMicroRates.tagName;
    let divID = controlIDs.addID(cDiv.id, tagName);
    let div = (0, html_js_1.createFlexDiv)(divID, level);
    cDiv.appendChild(div);
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(tagName, controlIDs.addID(cDiv.id, tagName, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let idTmax = controlIDs.addID(cDiv.id, tagName, control_js_1.Tmax.tagName);
    let idTmin = controlIDs.addID(cDiv.id, tagName, control_js_1.Tmin.tagName);
    let idTstep = controlIDs.addID(cDiv.id, tagName, control_js_1.Tstep.tagName);
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
        }
        else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    }
    else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        }
        else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 */
function createTestMicroRates(control, div, xml_tmr, idTmax, idTmin, idTstep) {
    let attributes;
    let tmr;
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) {
            throw new Error("More than one TestMicroRates element.");
        }
        attributes = (0, xml_js_1.getAttributes)(xml_tmr[0]);
        tmr = new control_js_1.TestMicroRates(attributes);
    }
    else {
        attributes = new Map();
        attributes.set("Tmax", "0"); // These should load from some kind of default...
        attributes.set("Tmin", "0");
        attributes.set("Tstep", "0");
        tmr = new control_js_1.TestMicroRates(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, html_js_1.createLabelWithInput)("text", idTmax + "_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        try {
            tmr.setTmax(new big_js_1.default(target.value));
            console.log("Set Tmax to " + target.value);
        }
        catch (e) {
            alert("Invalid input, resetting...");
            target.value = tMax.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tMax.toString(), "Tmax");
    tMaxlwi.id = idTmax;
    (0, html_js_1.resizeInputElement)(tMaxlwi.querySelector('input'));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, html_js_1.createLabelWithInput)("number", idTmin + "_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmr.setTmin(new big_js_1.default(target.value));
            console.log("Set Tmin to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tMin.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tMin.toString(), "Tmin");
    tMinlwi.id = idTmin;
    (0, html_js_1.resizeInputElement)(tMinlwi.querySelector('input'));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, html_js_1.createLabelWithInput)("text", idTstep + "_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmr.setTstep(new big_js_1.default(target.value));
            console.log("Set Tstep to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tStep.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tStep.toString(), "Tstep");
    tSteplwi.id = idTstep;
    (0, html_js_1.resizeInputElement)(tSteplwi.querySelector('input'));
    div.appendChild(tSteplwi);
}
/**
 * Get the CalcMethod from the XML.
 * @param control The control.
 * @param divCm The div cm.
 * @param xml The xml.
 * @param options The options.
 * @param attributes The attributes.
 * @param tagName The tag name.
 * @param xsi_type The xsi:type.
 * @param divCmDetailsId The div cm details id.
 * @param divCmDetailsSelectId The div cm details select id.
 * @returns The CalcMethod.
 */
function getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId) {
    //console.log("getCalcMethod");
    let cm;
    // Create the select element.
    let select = createSelectElementCalcMethod(control, divCm, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails = (0, html_js_1.createFlexDiv)(undefined, boundary1);
    divCmDetails.id = divCmDetailsId;
    divCm.appendChild(divCmDetails);
    if (xsi_type == control_js_1.CalcMethodSimpleCalc.xsi_type || xsi_type == control_js_1.CalcMethodSimpleCalc.xsi_type2) {
        //console.log("CalcMethodSimpleCalc");
        cm = new control_js_1.CalcMethodSimpleCalc(attributes);
    }
    else if (xsi_type == control_js_1.CalcMethodGridSearch.xsi_type || xsi_type == control_js_1.CalcMethodGridSearch.xsi_type2) {
        cm = new control_js_1.CalcMethodGridSearch(attributes);
    }
    else if (xsi_type == control_js_1.CalcMethodFitting.xsi_type || xsi_type == control_js_1.CalcMethodFitting.xsi_type2) {
        let cmf = new control_js_1.CalcMethodFitting(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml = xml[0].getElementsByTagName(control_js_1.FittingIterations.tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(fi_xml[0])));
                let fittingIterations = new control_js_1.FittingIterations((0, xml_js_1.getAttributes)(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            }
            else {
                throw new Error("More than one FittingIterations element.");
            }
        }
        processCalcMethodFitting(divCmDetails, cmf);
    }
    else if (xsi_type == control_js_1.CalcMethodMarquardt.xsi_type || xsi_type == control_js_1.CalcMethodMarquardt.xsi_type2) {
        let cmm = new control_js_1.CalcMethodMarquardt(attributes);
        cm = cmm;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = control_js_1.MarquardtIterations.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(elementXml[0])));
                    let instance = new ClassConstructor((0, xml_js_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, control_js_1.MarquardtIterations, cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, control_js_1.MarquardtTolerance, cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, control_js_1.MarquardtDerivDelta, cmm.setMarquardtDerivDelta.bind(cmm));
        processCalcMethodMarquardt(divCmDetails, cmm);
    }
    else if (xsi_type == control_js_1.CalcMethodAnalyticalRepresentation.xsi_type || xsi_type == control_js_1.CalcMethodAnalyticalRepresentation.xsi_type2) {
        let cmar = new control_js_1.CalcMethodAnalyticalRepresentation(attributes);
        cm = cmar;
        function processElement(xml, ClassConstructor, setterMethod, isNumber) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(elementXml[0]));
                    if (isNumber) {
                        if (value != undefined) {
                            value = new big_js_1.default(value);
                        }
                    }
                    let instance = new ClassConstructor((0, xml_js_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, control_js_1.Format, cmar.setFormat.bind(cmar), true);
        processElement(xml, control_js_1.Precision, cmar.setPrecision.bind(cmar), false);
        processElement(xml, control_js_1.ChebNumTemp, cmar.setChebNumTemp.bind(cmar), true);
        processElement(xml, control_js_1.ChebNumConc, cmar.setChebNumConc.bind(cmar), true);
        processElement(xml, control_js_1.ChebMaxTemp, cmar.setChebMaxTemp.bind(cmar), true);
        processElement(xml, control_js_1.ChebMinTemp, cmar.setChebMinTemp.bind(cmar), true);
        processElement(xml, control_js_1.ChebMaxConc, cmar.setChebMaxConc.bind(cmar), true);
        processElement(xml, control_js_1.ChebMinConc, cmar.setChebMinConc.bind(cmar), true);
        processElement(xml, control_js_1.ChebTExSize, cmar.setChebTExSize.bind(cmar), true);
        processElement(xml, control_js_1.ChebPExSize, cmar.setChebPExSize.bind(cmar), true);
        processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    }
    else if (xsi_type == control_js_1.CalcMethodThermodynamicTable.xsi_type || xsi_type == control_js_1.CalcMethodThermodynamicTable.xsi_type2) {
        let cmtt = new control_js_1.CalcMethodThermodynamicTable(attributes);
        cm = cmtt;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(elementXml[0])));
                    let instance = new ClassConstructor((0, xml_js_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, control_js_1.Tmin, cmtt.setTmin.bind(cmtt));
        processElement(xml, control_js_1.Tmid, cmtt.setTmid.bind(cmtt));
        processElement(xml, control_js_1.Tmax, cmtt.setTmax.bind(cmtt));
        processElement(xml, control_js_1.Tstep, cmtt.setTstep.bind(cmtt));
        processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    }
    else if (xsi_type == control_js_1.CalcMethodSensitivityAnalysis.xsi_type || xsi_type == control_js_1.CalcMethodSensitivityAnalysis.xsi_type2) {
        let cmsa = new control_js_1.CalcMethodSensitivityAnalysis(attributes);
        cm = cmsa;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(elementXml[0]));
                    if (value != undefined) {
                        value = new big_js_1.default(value);
                    }
                    let instance = new ClassConstructor((0, xml_js_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, control_js_1.SensitivityAnalysisSamples, cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement(xml, control_js_1.SensitivityAnalysisOrder, cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement(xml, control_js_1.SensitivityNumVarRedIters, cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement(xml, control_js_1.SensitivityVarRedMethod, cmsa.setSensitivityVarRedMethod.bind(cmsa));
        processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    }
    else {
        // If there is a name attribute instead, try this in place of the xsi:type.
        let name = attributes.get("name");
        if (name != undefined && name !== xsi_type) {
            attributes.set("xsi:type", name);
            console.warn(`Using name attribute as xsi:type: ${name}`);
            return getCalcMethod(control, divCm, xml, options, attributes, tagName, name, divCmDetailsId, divCmDetailsSelectId);
        }
        else {
            throw new Error(`Unable to determine calculation method for xsi_type: ${xsi_type}`);
        }
    }
    return cm;
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */
function processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fittingIterations = cm.getFittingIterations() || new control_js_1.FittingIterations(new Map(), big0);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetails.id + "_FittingIterations_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            fittingIterations.value = new big_js_1.default(target.value);
            console.log("Set FittingIterations to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = fittingIterations.value.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, fittingIterations.value.toString(), control_js_1.FittingIterations.tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */
function processCalcMethodMarquardt(divCmDetails, cm) {
    function createLabelWithInputForObject(obj, divCmDetails, boundary, level) {
        let id = addRID(divCmDetails.id, obj.tagName, "Input");
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event) => {
            let target = event.target;
            // Check the value is a number.
            if ((0, util_js_1.isNumeric)(target.value)) {
                obj.value = new big_js_1.default(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            }
            else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            (0, html_js_1.resizeInputElement)(target);
        };
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let marquardtIterations = cm.getMarquardtIterations() || new control_js_1.MarquardtIterations(new Map(), big0);
    cm.setMarquardtIterations(marquardtIterations);
    createLabelWithInputForObject(marquardtIterations, divCmDetails, boundary1, level0);
    // MarquardtTolerance.
    let marquardtTolerance = cm.getMarquardtTolerance() || new control_js_1.MarquardtTolerance(new Map(), big0);
    cm.setMarquardtTolerance(marquardtTolerance);
    createLabelWithInputForObject(marquardtTolerance, divCmDetails, boundary1, level0);
    // MarquardtDerivDelta.
    let marquardtDerivDelta = cm.getMarquardtDerivDelta() || new control_js_1.MarquardtDerivDelta(new Map(), big0);
    cm.setMarquardtDerivDelta(marquardtDerivDelta);
    createLabelWithInputForObject(marquardtDerivDelta, divCmDetails, boundary1, level0);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */
function processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new control_js_1.Format(new Map(), control_js_1.Format.options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor, getter, setter, tagName, options) {
        let element = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement = (0, html_js_1.createLabelWithSelect)(tagName, options, tagName, element.value, divCmDetails.id, boundary1, boundary1);
        lwsElement.querySelector('select')?.addEventListener('change', (event) => {
            let target = event.target;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            (0, html_js_1.resizeSelectElement)(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement(control_js_1.Format, cm.getFormat.bind(cm), cm.setFormat.bind(cm), control_js_1.Format.tagName, control_js_1.Format.options);
    processSelectElement(control_js_1.Format, () => format.getRateUnits(), format.setRateUnits.bind(format), control_js_1.Format.rateUnits, control_js_1.Format.rateUnitsOptions);
    processSelectElement(control_js_1.Precision, cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), control_js_1.Precision.tagName, mesmer_js_1.Mesmer.precisionOptions);
    // "me:chebNumTemp", "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("text", divCmDetails.id + `_${tagName}_input`, boundary1, level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement(control_js_1.ChebNumTemp, cm.getChebNumTemp.bind(cm), cm.setChebNumTemp.bind(cm), control_js_1.ChebNumTemp.tagName);
    processElement(control_js_1.ChebNumConc, cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), control_js_1.ChebNumConc.tagName);
    processElement(control_js_1.ChebMaxTemp, cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), control_js_1.ChebMaxTemp.tagName);
    processElement(control_js_1.ChebMinTemp, cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), control_js_1.ChebMinTemp.tagName);
    processElement(control_js_1.ChebMaxConc, cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), control_js_1.ChebMaxConc.tagName);
    processElement(control_js_1.ChebMinConc, cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), control_js_1.ChebMinConc.tagName);
    processElement(control_js_1.ChebTExSize, cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), control_js_1.ChebTExSize.tagName);
    processElement(control_js_1.ChebPExSize, cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), control_js_1.ChebPExSize.tagName);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */
function processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("text", divCmDetails.id + `_${tagName}_input`, boundary1, level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement(control_js_1.Tmin, cm.getTmin.bind(cm), cm.setTmin.bind(cm), control_js_1.Tmin.tagName);
    processElement(control_js_1.Tmid, cm.getTmid.bind(cm), cm.setTmid.bind(cm), control_js_1.Tmid.tagName);
    processElement(control_js_1.Tmax, cm.getTmax.bind(cm), cm.setTmax.bind(cm), control_js_1.Tmax.tagName);
    processElement(control_js_1.Tstep, cm.getTstep.bind(cm), cm.setTstep.bind(cm), control_js_1.Tstep.tagName);
}
function handleEvent(element, tagName) {
    return (event) => {
        let target = event.target;
        try {
            element.value = new big_js_1.default(target.value);
        }
        catch (e) {
            alert("Invalid input value " + target.value + " , resetting...");
            target.value = element.value.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    };
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */
function processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("text", addRID(divCmDetails.id, tagName, s_input), boundary1, level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processNumberElement(control_js_1.SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), control_js_1.SensitivityAnalysisSamples.tagName);
    processNumberElement(control_js_1.SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), control_js_1.SensitivityAnalysisOrder.tagName);
    processNumberElement(control_js_1.SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), control_js_1.SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new control_js_1.SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName = control_js_1.SensitivityVarRedMethod.tagName;
    divCmDetails.appendChild((0, html_js_1.createLabelWithSelect)(tagName, control_js_1.SensitivityVarRedMethod.options, tagName, control_js_1.SensitivityVarRedMethod.options[0], addRID(divCmDetails.id, tagName, 'select'), boundary1, boundary1));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector('select');
    select?.addEventListener('change', (event) => {
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log(tagName + " set to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
}
/**
 * @param options The options.
 * @param select The select element.
 */
function selectAnotherOptionEventListener(options, select) {
    select.addEventListener('click', (event) => {
        if (options[options.length - 1] == s_selectOption) {
            options.pop();
        }
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == s_selectOption) {
            select.remove(lastIndex);
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param id The id for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */
function createSelectElementCalcMethod(control, div, options, tagName, value, divCmDetailsId, divCmDetailsSelectId) {
    let select = (0, html_js_1.createSelectElement)(options, tagName, value, divCmDetailsSelectId, boundary1);
    div.appendChild(select);
    selectAnotherOptionEventListener(options, select);
    select.addEventListener('change', (event) => {
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) {
            divCmDetails.remove();
        }
        divCmDetails = (0, html_js_1.createFlexDiv)(divCmDetailsId, boundary1);
        div.appendChild(divCmDetails);
        let target = event.target;
        let value = target.value;
        let attributes = new Map();
        attributes.set("xsi:type", value);
        if (value == control_js_1.CalcMethodSimpleCalc.xsi_type || value == control_js_1.CalcMethodSimpleCalc.xsi_type2) {
            // "me:simpleCalc", "simpleCalc".
            control.setCalcMethod(new control_js_1.CalcMethodSimpleCalc(attributes));
        }
        else if (value == control_js_1.CalcMethodGridSearch.xsi_type || value == control_js_1.CalcMethodGridSearch.xsi_type2) {
            // "me:gridSearch", "gridSearch".
            control.setCalcMethod(new control_js_1.CalcMethodGridSearch(attributes));
        }
        else if (value == control_js_1.CalcMethodFitting.xsi_type || value == control_js_1.CalcMethodFitting.xsi_type2) {
            let cm = new control_js_1.CalcMethodFitting(attributes);
            control.setCalcMethod(cm);
            processCalcMethodFitting(divCmDetails, cm);
        }
        else if (value == control_js_1.CalcMethodMarquardt.xsi_type || value == control_js_1.CalcMethodMarquardt.xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm = new control_js_1.CalcMethodMarquardt(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(divCmDetails, cm);
        }
        else if (value == control_js_1.CalcMethodAnalyticalRepresentation.xsi_type || value == control_js_1.CalcMethodAnalyticalRepresentation.xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm = new control_js_1.CalcMethodAnalyticalRepresentation(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        }
        else if (value == control_js_1.CalcMethodThermodynamicTable.xsi_type || value == control_js_1.CalcMethodThermodynamicTable.xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm = new control_js_1.CalcMethodThermodynamicTable(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(divCmDetails, cm);
        }
        else if (value == control_js_1.CalcMethodSensitivityAnalysis.xsi_type || value == control_js_1.CalcMethodSensitivityAnalysis.xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm = new control_js_1.CalcMethodSensitivityAnalysis(new Map());
            control.setCalcMethod(cm);
            processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        }
        else {
            throw new Error("Unknown CalcMethod type.");
        }
        (0, html_js_1.resizeSelectElement)(target);
    });
    return select;
}
/**
 * Parses xml to initialise metadataList.
 * @param xml The XML document.
 */
function processMetadataList(xml) {
    console.log(metadata_js_1.MetadataList.tagName);
    let mlDiv = (0, html_js_1.createDiv)(addRID(metadata_js_1.MetadataList.tagName, 0), boundary1);
    let xml_mls = xml.getElementsByTagName(metadata_js_1.MetadataList.tagName);
    if (xml_mls.length > 0) {
        if (xml_mls.length > 1) {
            throw new Error("More than one MetadataList element.");
        }
        let ml = new metadata_js_1.MetadataList((0, xml_js_1.getAttributes)(xml_mls[0]));
        mesmer.setMetadataList(ml);
        function handleElement(tagName, constructor, setter) {
            let xml_elements = xml_mls[0].getElementsByTagName(tagName);
            if (xml_elements.length > 0) {
                if (xml_elements.length == 1) {
                    let s = (0, xml_js_1.getFirstChildNode)(xml_elements[0])?.nodeValue ?? "";
                    let n = new constructor((0, xml_js_1.getAttributes)(xml_elements[0]), s);
                    let cDiv = (0, html_js_1.createDiv)(undefined, level1);
                    mlDiv.appendChild(cDiv);
                    cDiv.appendChild((0, html_js_1.createLabel)(n.tagName + " " + s, boundary1));
                    //console.log(n.tagName + " " + s);
                    setter.call(ml, n);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        handleElement(metadata_js_1.DCSource.tagName, metadata_js_1.DCSource, ml.setSource);
        handleElement(metadata_js_1.DCCreator.tagName, metadata_js_1.DCCreator, ml.setCreator);
        handleElement(metadata_js_1.DCDate.tagName, metadata_js_1.DCDate, ml.setDate);
        handleElement(metadata_js_1.DCContributor.tagName, metadata_js_1.DCContributor, ml.setContributor);
    }
    return mlDiv;
}
/**
 * Parses xml to initialise analysis.
 * @param xml The XML document.
 */
function processAnalysis(xml) {
    console.log(analysis_js_1.Analysis.tagName);
    let aDivID = addRID(analysis_js_1.Analysis.tagName, 0);
    let aDiv = (0, html_js_1.createDiv)(aDivID, boundary1);
    let xml_as = xml.getElementsByTagName(analysis_js_1.Analysis.tagName);
    if (xml_as.length > 0) {
        if (xml_as.length > 1) {
            throw new Error("More than one Analysis element.");
        }
        let a = new analysis_js_1.Analysis((0, xml_js_1.getAttributes)(xml_as[0]));
        mesmer.setAnalysis(a);
        // "me:description".
        let xml_d = xml_as[0].getElementsByTagName(mesmer_js_1.Description.tagName);
        if (xml_d.length > 0) {
            if (xml_d.length == 1) {
                let s = (0, xml_js_1.getFirstChildNode)(xml_d[0])?.nodeValue ?? "";
                let d = new mesmer_js_1.Description((0, xml_js_1.getAttributes)(xml_d[0]), s);
                let dDiv = (0, html_js_1.createDiv)(addRID(aDivID, mesmer_js_1.Description.tagName), level1);
                aDiv.appendChild(dDiv);
                dDiv.appendChild((0, html_js_1.createLabel)(d.tagName + " " + s, boundary1));
                a.setDescription(d);
            }
            else {
                throw new Error("More than one Description element.");
            }
        }
        // "me:eigenvalueList".
        let xml_el = xml_as[0].getElementsByTagName(analysis_js_1.EigenvalueList.tagName);
        // Create a new collapsible div for the EigenvalueLists.
        let elDivID = addRID(aDivID, analysis_js_1.EigenvalueList.tagName);
        let elDiv = (0, html_js_1.createDiv)(elDivID, level1);
        let elcDiv = (0, html_js_1.getCollapsibleDiv)(elDivID, aDiv, null, elDiv, analysis_js_1.EigenvalueList.tagName + "s", boundary1, level1);
        if (xml_el.length > 0) {
            for (let i = 0; i < xml_el.length; i++) {
                let el_attributes = (0, xml_js_1.getAttributes)(xml_el[i]);
                let el = new analysis_js_1.EigenvalueList(el_attributes);
                let labelText = el.tagName + " " + i.toString() + " " + (0, util_js_1.mapToString)(el_attributes);
                // Create a new collapsible div for the EigenvalueList.
                let eDivID = addRID(elDiv.id, i.toString());
                let eDiv = (0, html_js_1.createDiv)(elDivID, level1);
                let ecDiv = (0, html_js_1.getCollapsibleDiv)(eDivID, elDiv, null, eDiv, labelText, boundary1, level0);
                //eDiv.appendChild(createLabel(labelText, boundary1));
                a.addEigenvalueList(el);
                // "me:eigenvalue".
                let evs = [];
                let xml_ei = xml_el[i].getElementsByTagName(analysis_js_1.Eigenvalue.tagName);
                if (xml_ei.length > 0) {
                    for (let j = 0; j < xml_ei.length; j++) {
                        let ev = new big_js_1.default((0, xml_js_1.getFirstChildNode)(xml_ei[j])?.nodeValue);
                        evs.push(ev);
                        el.addEigenvalue(new analysis_js_1.Eigenvalue((0, xml_js_1.getAttributes)(xml_ei[j]), ev));
                    }
                }
                eDiv.appendChild((0, html_js_1.createLabel)((0, util_js_2.arrayToString)(evs, ", "), boundary1));
            }
        }
        // "me:populationList".
        let xml_pl = xml_as[0].getElementsByTagName(analysis_js_1.PopulationList.tagName);
        // Create a new collapsible div for the PopulationLists.
        let plDivID = addRID(aDivID, analysis_js_1.PopulationList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID, level1);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plDivID, aDiv, null, plDiv, analysis_js_1.PopulationList.tagName + "s", boundary1, level1);
        if (xml_pl.length > 0) {
            // Create a new collapsible div for the PopulationList.
            for (let i = 0; i < xml_pl.length; i++) {
                let pl_attributes = (0, xml_js_1.getAttributes)(xml_pl[i]);
                let T = pl_attributes.get("T") != undefined ? new big_js_1.default(pl_attributes.get("T")) : big0;
                let conc = pl_attributes.get("conc") != undefined ? new big_js_1.default(pl_attributes.get("conc")) : big0;
                let pl = new analysis_js_1.PopulationList(pl_attributes);
                let labelText = pl.tagName + " " + i.toString() + " " + (0, util_js_1.mapToString)(pl_attributes);
                let plDivID = addRID(aDiv.id, analysis_js_1.PopulationList.tagName, i.toString());
                // Create a new collapsible div for the EigenvalueList.
                let pDivID = addRID(plDivID, i.toString());
                let pDiv = (0, html_js_1.createDiv)(plDivID, level1);
                let pcDiv = (0, html_js_1.getCollapsibleDiv)(pDivID, plDiv, null, pDiv, labelText, boundary1, level0);
                a.addPopulationList(pl);
                // "me:population".
                //let lt_ref_pop : Map<Big, Map<string, Big>> = new Map(); // Change to calculate the log of the time when creating the plots.
                let t_ref_pop = new Map();
                let refs = [];
                refs.push("time");
                let xml_pn = xml_pl[i].getElementsByTagName(analysis_js_1.Population.tagName);
                if (xml_pn.length > 0) {
                    for (let j = 0; j < xml_pn.length; j++) {
                        let pn_attributes = (0, xml_js_1.getAttributes)(xml_pn[j]);
                        let population = new analysis_js_1.Population(pn_attributes, []);
                        pl.addPopulation(population);
                        let t = pn_attributes.get("time") != undefined ? new big_js_1.default(pn_attributes.get("time")) : big0;
                        //let lt: Big = pn_attributes.get("logTime") != undefined ? new Big(pn_attributes.get("logTime") as string) : big0; 
                        let ref_pop = new Map();
                        //lt_ref_pop.set(lt, ref_pop);
                        t_ref_pop.set(t, ref_pop);
                        let xml_pop = xml_pn[j].getElementsByTagName(analysis_js_1.Pop.tagName);
                        if (xml_pop.length > 0) {
                            for (let k = 0; k < xml_pop.length; k++) {
                                let pop_attributes = (0, xml_js_1.getAttributes)(xml_pop[k]);
                                let ref = pop_attributes.get("ref");
                                if (j == 0) {
                                    refs.push(ref);
                                }
                                let p = new big_js_1.default((0, xml_js_1.getFirstChildNode)(xml_pop[k])?.nodeValue);
                                let pop = new analysis_js_1.Pop(pop_attributes, p);
                                population.addPop(pop);
                                ref_pop.set(ref, p);
                            }
                        }
                    }
                }
                // Create graph.
                let graphDiv = (0, html_js_1.createDiv)(addRID(pDivID, s_graph), boundary1);
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
                let tableDiv = (0, html_js_1.createDiv)(addRID(pDivID, s_table), boundary1);
                pDiv.appendChild(tableDiv);
                let tab = (0, html_js_1.createTable)(addRID(plDivID, s_table), boundary1);
                (0, html_js_1.addTableRow)(tab, refs);
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
                addSaveAsCSVButton(() => tableToCSV(tab), pDiv, tableDiv, labelText, boundary1);
            }
        }
        // me:rateList.
        let xml_rl = xml_as[0].getElementsByTagName(analysis_js_1.RateList.tagName);
        // Create a new collapsible div for the RateLists.
        let rlDivID = addRID(aDivID, analysis_js_1.RateList.tagName);
        let rlDiv = (0, html_js_1.createDiv)(rlDivID, level1);
        let rlcDiv = (0, html_js_1.getCollapsibleDiv)(rlDivID, aDiv, null, rlDiv, analysis_js_1.RateList.tagName + "s", boundary1, level1);
        if (xml_rl.length > 0) {
            // Create Table.
            let tableDiv = (0, html_js_1.createDiv)(addRID(rlDivID, s_table), boundary1);
            rlDiv.appendChild(tableDiv);
            let tab = (0, html_js_1.createTable)(addRID(plDivID, s_table), boundary1);
            // Table Header
            let th = ["T", "conc"];
            for (let i = 0; i < xml_rl.length; i++) {
                let rl_attributes = (0, xml_js_1.getAttributes)(xml_rl[i]);
                let values = [];
                values.push(rl_attributes.get("T"));
                values.push(rl_attributes.get("conc"));
                /*if (i == 0) {
                    Array.from(rl_attributes.keys()).forEach((key) => {
                        refs.push(key);
                    });
                }*/
                let rl = new analysis_js_1.RateList(rl_attributes);
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
                let xml_for = xml_rl[i].getElementsByTagName(analysis_js_1.FirstOrderRate.tagName);
                if (xml_for.length > 0) {
                    //console.log("me:firstOrderRate length " + xml_for.length);
                    for (let j = 0; j < xml_for.length; j++) {
                        let forate_attributes = (0, xml_js_1.getAttributes)(xml_for[j]);
                        if (i == 0) {
                            let fromRef = forate_attributes.get("fromRef");
                            let toRef = forate_attributes.get("toRef");
                            th.push(fromRef + "->" + toRef);
                        }
                        let s = ((0, xml_js_1.getFirstChildNode)(xml_for[j])?.nodeValue ?? "").trim();
                        values.push(s);
                        let forate = new analysis_js_1.FirstOrderRate(forate_attributes, new big_js_1.default(s));
                        rl.addFirstOrderRate(forate);
                    }
                }
                // "me:firstOrderLoss".
                let xml_fol = xml_rl[i].getElementsByTagName(analysis_js_1.FirstOrderLoss.tagName);
                if (xml_fol.length > 0) {
                    //console.log("me:firstOrderLoss length " + xml_fol.length);
                    for (let j = 0; j < xml_fol.length; j++) {
                        let fol_attributes = (0, xml_js_1.getAttributes)(xml_fol[j]);
                        if (i == 0) {
                            Array.from(fol_attributes.values()).forEach((v) => {
                                th.push("loss of " + v);
                            });
                        }
                        let s = ((0, xml_js_1.getFirstChildNode)(xml_fol[j])?.nodeValue ?? "").trim();
                        values.push(s);
                        let fol = new analysis_js_1.FirstOrderLoss(fol_attributes, new big_js_1.default(s));
                        rl.addFirstOrderLoss(fol);
                    }
                }
                if (i == 0) {
                    (0, html_js_1.addTableRow)(tab, th);
                }
                (0, html_js_1.addTableRow)(tab, values);
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
 * Create a diagram.
 * @param canvas The canvas.
 * @param dark True for dark mode.
 * @param font The font to use.
 * @param lw The line width of reactants, transition states and products.
 * @param lwc The line width color to use.
 */
function drawReactionDiagram(canvas, dark, font, lw, lwc) {
    console.log("drawReactionDiagram");
    if (canvas != null) {
        // Set foreground and background colors.
        let foreground;
        let background;
        let blue;
        let orange;
        if (dark) {
            foreground = "lightgrey";
            background = "darkgrey";
            blue = "lightblue";
            orange = "orange";
        }
        else {
            foreground = "darkgrey";
            background = "lightgrey";
            blue = "blue";
            orange = "darkorange";
        }
        let green = "green";
        let red = "red";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
        //ctx.fillStyle = background;
        // Make font bold.
        ctx.font = "bold " + font;
        // Get text height for font size.
        let th = (0, canvas_js_1.getTextHeight)(ctx, "Aj", ctx.font);
        //console.log("th=" + th);
        // Go through reactions:
        // 1. Create sets of reactants, end products, intermediate products and transition states.
        // 2. Create maps of orders and energies.
        // 3. Calculate maximum energy.
        let reactants = [];
        let products = new Set();
        let intProducts = new Set();
        let transitionStates = new Set();
        let orders = new Map();
        let energies = new Map();
        let i = 0;
        let energyMin;
        let energyMax;
        reactions.forEach(function (reaction, id) {
            // Get TransitionStates.
            let reactionTransitionStates = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            if (reactantsLabel != undefined) {
                reactants.push(reactantsLabel);
                if (products.has(reactantsLabel)) {
                    intProducts.add(reactantsLabel);
                }
                let energy = reaction.getReactantsEnergy(getMolecule);
                energyMin = (0, util_js_1.min)(energyMin, energy);
                energyMax = (0, util_js_1.max)(energyMax, energy);
                energies.set(reactantsLabel, energy);
                if (!orders.has(reactantsLabel)) {
                    orders.set(reactantsLabel, i);
                    i++;
                }
            }
            let productsLabel = reaction.getProductsLabel();
            if (productsLabel != undefined) {
                products.add(productsLabel);
                let energy = reaction.getProductsEnergy(getMolecule);
                energyMin = (0, util_js_1.min)(energyMin, energy);
                energyMax = (0, util_js_1.max)(energyMax, energy);
                energies.set(productsLabel, energy);
                if (orders.has(productsLabel)) {
                    i--;
                    let j = (0, util_js_1.get)(orders, productsLabel);
                    // Move product to end and shift everything back.
                    orders.forEach(function (value, key) {
                        if (value > j) {
                            orders.set(key, value - 1);
                        }
                    });
                    // Insert transition states.
                    if (reactionTransitionStates != undefined) {
                        reactionTransitionStates.forEach(function (ts) {
                            let ref = ts.getMolecule().getRef();
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = getMolecule(ref)?.getEnergy() ?? big0;
                            energyMin = (0, util_js_1.min)(energyMin, energy);
                            energyMax = (0, util_js_1.max)(energyMax, energy);
                            energies.set(ref, energy);
                            i++;
                        });
                        orders.set(productsLabel, i);
                        i++;
                    }
                }
                else {
                    if (reactionTransitionStates != undefined) {
                        reactionTransitionStates.forEach(function (ts) {
                            let ref = ts.getMolecule().getRef();
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = getMolecule(ref)?.getEnergy() ?? big0;
                            energyMin = (0, util_js_1.min)(energyMin, energy);
                            energyMax = (0, util_js_1.max)(energyMax, energy);
                            energies.set(ref, energy);
                            i++;
                        });
                    }
                    orders.set(productsLabel, i);
                    i++;
                }
            }
        });
        //console.log("orders=" + mapToString(orders));
        //console.log("energies=" + mapToString(energies));
        //console.log("energyMax=" + energyMax);
        //console.log("energyMin=" + energyMin);
        let energyRange = (energyMax.minus(energyMin)).toNumber();
        //console.log("energyRange=" + energyRange);
        //console.log("reactants=" + reactants);
        //console.log("products=" + products);
        //console.log("transitionStates=" + transitionStates);
        // Create a lookup from order to label.
        let reorders = [];
        orders.forEach(function (value, key) {
            reorders[value] = key;
        });
        //console.log("reorders=" + arrayToString(reorders));
        // Iterate through the reorders:
        // 1. Capture coordinates for connecting lines.
        // 2. Store maximum x.
        let x0 = 0;
        let y0;
        let x1;
        let y1;
        let xmax = 0;
        let tw;
        let textSpacing = 5; // Spacing between end of line and start of text.
        let stepSpacing = 10; // Spacing between steps.
        let reactantsInXY = new Map();
        let reactantsOutXY = new Map();
        let productsInXY = new Map();
        let productsOutXY = new Map();
        let transitionStatesInXY = new Map();
        let transitionStatesOutXY = new Map();
        reorders.forEach(function (value) {
            //console.log("value=" + value + ".");
            //console.log("energies=" + mapToString(energies));
            let energy = (0, util_js_1.get)(energies, value);
            let energyRescaled = (0, util_js_1.rescale)(energyMin.toNumber(), energyRange, 0, rdcHeight, energy);
            // Get text width.
            tw = Math.max((0, canvas_js_1.getTextWidth)(ctx, energy.toString(), font), (0, canvas_js_1.getTextWidth)(ctx, value, font));
            x1 = x0 + tw + textSpacing;
            y0 = energyRescaled + lw;
            y1 = y0;
            // Draw horizontal line and add label.
            // (The drawing is now not done here but done later so labels are on top of lines, but
            // the code is left here commented out for code comprehension.)
            //drawLevel(ctx, green, 4, x0, y0, x1, y1, th, value);
            reactantsInXY.set(value, [x0, y0]);
            reactantsOutXY.set(value, [x1, y1]);
            if (products.has(value)) {
                productsInXY.set(value, [x0, y0]);
                productsOutXY.set(value, [x1, y1]);
            }
            if (transitionStates.has(value)) {
                transitionStatesInXY.set(value, [x0, y0]);
                transitionStatesOutXY.set(value, [x1, y1]);
            }
            x0 = x1 + stepSpacing;
            xmax = x1;
        });
        // Set canvas width to maximum x.
        canvas.width = xmax;
        //console.log("canvas.width=" + canvas.width);
        // Set canvas height to maximum energy plus the label.
        let canvasHeightWithBorder = rdcHeight + (4 * th) + (2 * lw);
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdcHeight;
        // Update the canvas height.
        canvas.height = canvasHeightWithBorder;
        // Set the transformation matrix.
        //ctx.transform(1, 0, 0, 1, 0, canvasHeightWithBorder);
        ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder);
        // Go through reactions and draw connecting lines.
        reactions.forEach(function (reaction, id) {
            //console.log("id=" + id);
            //console.log("reaction=" + reaction);
            // Get TransitionState if there is one.
            let reactionTransitionStates = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            let productsLabel = reaction.getProductsLabel();
            let reactantOutXY = (0, util_js_1.get)(reactantsOutXY, reactantsLabel);
            let productInXY = (0, util_js_1.get)(productsInXY, productsLabel);
            if (reactionTransitionStates.length > 0) {
                reactionTransitionStates.forEach(function (ts) {
                    let transitionStateLabel = ts.getMolecule().getRef();
                    let transitionStateInXY = (0, util_js_1.get)(transitionStatesInXY, transitionStateLabel);
                    (0, canvas_js_1.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                    let transitionStateOutXY = (0, util_js_1.get)(transitionStatesOutXY, transitionStateLabel);
                    (0, canvas_js_1.drawLine)(ctx, foreground, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
                });
            }
            else {
                (0, canvas_js_1.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
            }
        });
        // Draw horizontal lines and labels.
        // (This is done last so that the labels are on top of the vertical lines.)
        reactants.forEach(function (value) {
            let energy = (0, util_js_1.get)(energies, value);
            let energyRescaled = (0, util_js_1.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, util_js_1.get)(reactantsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_js_1.get)(reactantsOutXY, value)[0];
            let energyString = energy.toString();
            (0, canvas_js_1.drawLevel)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function (value) {
            let energy = (0, util_js_1.get)(energies, value);
            let energyRescaled = (0, util_js_1.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, util_js_1.get)(productsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_js_1.get)(productsOutXY, value)[0];
            let energyString = energy.toString();
            if (intProducts.has(value)) {
                (0, canvas_js_1.drawLevel)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
            }
            else {
                (0, canvas_js_1.drawLevel)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
            }
        });
        transitionStates.forEach(function (value) {
            let energy = (0, util_js_1.get)(energies, value);
            let energyRescaled = (0, util_js_1.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, util_js_1.get)(transitionStatesInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_js_1.get)(transitionStatesOutXY, value)[0];
            let energyString = energy.toString();
            (0, canvas_js_1.drawLevel)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
        });
    }
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
    if (mesmer == null) {
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
        let mesmerOrdered = new mesmer_js_1.Mesmer(mesmer.attributes);
        mesmerOrdered.setTitle(mesmer.getTitle());
        mesmerOrdered.setMoleculeList(new mesmer_js_1.MoleculeList(new Map(), Array.from(molecules.values())));
        mesmerOrdered.setReactionList(new mesmer_js_1.ReactionList(new Map(), Array.from(reactions.values())));
        mesmerOrdered.setConditionss(mesmer.getConditionss());
        mesmerOrdered.setModelParameterss(mesmer.getModelParameterss());
        mesmerOrdered.setControls(mesmer.getControls());
        let mdl = mesmer.getMetadataList();
        if (mdl != undefined) {
            mesmerOrdered.setMetadataList(mdl);
        }
        let analysis = mesmer.getAnalysis();
        if (analysis != undefined) {
            mesmerOrdered.setAnalysis(analysis);
        }
        console.log("saveXML");
        const pad = "  ";
        let xmlData = mesmer_js_1.Mesmer.header + mesmerOrdered.toXML(pad, "");
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
    let saveButton = (0, html_js_1.createButton)("Save as PNG", saveButtonID, boundary1);
    if (elementToInsertBefore != null) {
        divToAddTo.insertBefore(saveButton, elementToInsertBefore);
    }
    else {
        divToAddTo.appendChild(saveButton);
    }
    saveButton.addEventListener('click', () => {
        let dataURL = canvas.toDataURL();
        let title = mesmer.getTitle()?.value;
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
    let bID = addRID(divToAddTo.id, html_js_1.s_button, s_save);
    let b = (0, html_js_1.createButton)("Save as CSV", bID, margin);
    divToAddTo.insertBefore(b, elementToInsertBefore);
    b.addEventListener('click', () => {
        let csv = toCSV();
        let title = mesmer.getTitle()?.value;
        let fn = getFilename(title + "_" + name) + ".csv";
        saveDataAsFile(csv, 'text/csv', fn);
        console.log("Saved " + fn);
    });
}
//# sourceMappingURL=app.js.map