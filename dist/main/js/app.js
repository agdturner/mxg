"use strict";
//import { openDB } from 'idb';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNumberNode = exports.setNumberArrayNode = void 0;
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
//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library
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
let mesmer_url = "https://sourceforge.net/projects/mesmer/";
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
const s_container = "s_container";
const s_description = "description";
const s_Input = "Input";
const s_optionOn = 'optionOn';
const s_optionOff = 'optionOff';
const s_Remove_sy_remove = "Remove " + sy_remove;
const s_save = "save";
const s_Select = "Select";
const s_selectOption = "Select an option (use keys to cycle through options)...";
const s_table = "table";
// HTML IDs
const menuDivID = 'menu';
const titleDivID = 'title';
const moleculesDivID = 'molecules';
const reactionsDivID = 'reactions';
const reactionsDiagramDivID = 'reactionsDiagram';
const conditionsDivID = 'conditions';
const modelParametersDivID = 'modelParameters';
const controlDivID = 'control';
const xmlDivID = 'xml';
const welcomeDivID = 'welcome';
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
 * For mesmer.
 */
let mesmer;
/**
 * A map of molecules with Molecule ID as key and Molecule as value.
 */
let molecules;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */
let reactions;
/**
 * The Mesmer ids.
 */
let ids = new Set();
/**
 * Add an id to the set of ids.
 * @param parts The parts of the id.
 */
function addID(...parts) {
    let validID = (0, util_js_1.getID)(...parts);
    if (ids.has(validID)) {
        throw new Error(validID + " already exists!");
    }
    ids.add(validID);
    return validID;
}
// IDs for the reactions diagram.
const s_Reactions_Diagram = "Reactions Diagram";
const rdDivID = (0, util_js_1.getID)(s_Reactions_Diagram);
const rdcID = (0, util_js_1.getID)(rdDivID, "Canvas");
//let rd_canvas_width: number = 800;
let rdcHeight = 400;
let rd_lw = 4;
let rd_lwc = 2;
let rd_font = "1em SensSerif";
let rdWindow;
/**
 * Once the DOM is loaded, add a load button.
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
    // Create a menu for the GUI.
    let menuDiv = document.getElementById(menuDivID);
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';
    // Create Load button.
    let s_Load = 'Load';
    let loadButton = (0, html_js_1.createButton)(s_Load, (0, util_js_1.getID)(s_Load), boundary1);
    loadButton.addEventListener('click', (event) => {
        load();
        loadButton.textContent = s_Load;
    });
    menuDiv.appendChild(loadButton);
    // Create style/theme option buttons.
    // Create button to increase the font size.
    let s_Increase_fontsize = 'Increase fontsize';
    let increaseFontSizeButton = (0, html_js_1.createButton)(s_Increase_fontsize, (0, util_js_1.getID)(s_Increase_fontsize), boundary1);
    increaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let s_Decrease_fontsize = 'Decrease fontsize';
    let decreaseFontSizeButton = (0, html_js_1.createButton)(s_Decrease_fontsize, (0, util_js_1.getID)(s_Decrease_fontsize), boundary1);
    decreaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize - 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Create a light/dark mode button.
    let s_Light_Dark_Mode = 'Light/Dark Mode';
    let lightDarkModeButton = (0, html_js_1.createButton)(s_Light_Dark_Mode, (0, util_js_1.getID)(s_Light_Dark_Mode), boundary1);
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
    // Create Save button.
    let s_Save = 'Save';
    let saveButton = (0, html_js_1.createButton)(s_Save, (0, util_js_1.getID)(s_Save), boundary1);
    saveButton.addEventListener('click', saveXML);
    menuDiv.appendChild(saveButton);
    // Welcome.
    let wDiv = document.getElementById(welcomeDivID);
    document.body.appendChild(wDiv);
    // p1.
    let p1 = document.createElement('p');
    wDiv.appendChild(p1);
    p1.appendChild(document.createTextNode('Welcome to MXG - a free and open source program to assist in creating, editing and \
        visualising MESMER program data. The main MXG development repository is: '));
    p1.appendChild(mxg_a);
    p1.appendChild(document.createTextNode('. Details of MESMER - the Master Equation Solver for Multi Energy-well Reactions \
        can be found at: '));
    p1.appendChild(mesmer_a);
    p1.appendChild(document.createTextNode('.'));
    // p2.
    let p2 = document.createElement('p');
    wDiv.appendChild(p2);
    p2.appendChild(document.createTextNode('MXG was originally developed by a team based at '));
    p2.appendChild(uol_a);
    p2.appendChild(document.createTextNode(' funded by '));
    p2.appendChild(epsrc_a);
    p2.appendChild(document.createTextNode(' from January to April 2024.'));
    // p3.
    let p3 = document.createElement('p');
    wDiv.appendChild(p3);
    p3.textContent = 'The Menu contains 6 buttons including the Create and Load buttons which are the two ways to begin. The Create button \
        is to start afresh and allows you to specify the title and input components for a MESMER data input file. Buttons for doing this \
        will appear below the Menu. The Load button is for loading an existing MESMER data file.  If the loaded file is a MESMER output \
        file, output components will be presented after the input components. The Save button is for saving a new MESMER data file. The \
        saved file should have the same content as any loaded file except: it will contain no comments or blank lines, values will be \
        trimmed of white space, and some numbers may be output in a different style (there should be no loss of precision). The saved file \
        should reflect any changes made via the interface. Between the Load and Save buttons are buttons to increase or decrease the \
        font size and to change between a light and dark theme. In addition to increasing or decreasing the font size of text elements, \
        the fontsize buttons will also redraw diagrams with a larger or smaller fontsize respectively.';
    // p4.
    let p4 = document.createElement('p');
    wDiv.appendChild(p4);
    p4.appendChild(document.createTextNode('MXG can be used online and installed locally and used offline as a Progressive Web App (PWA). \
        PWA installation varies by Web browser/device. For guidance please see the MXG main development repository README: '));
    p4.appendChild(mxg_a.cloneNode(true));
    p4.appendChild(document.createTextNode('.'));
    // p5.
    let p5 = document.createElement('p');
    wDiv.appendChild(p5);
    p5.appendChild(document.createTextNode('A MESMER data file is expected to contain the following child elements of the parent \
        "me:mesmer" element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a \
        child element is missing or there are multiple "me:title", "moleculeList", "reactionList", or "me:modelParameters" elements, a \
        warning alert message should appear. The "me:title" value is presented in an input alongside a label. The input can be used to \
        change the value which is also used to compose filenames. Other elements are presented as buttons and initially hidden \
        HTMLDivElements that are made visible by actioning the buttons. These buttons contain a triangular symbol which indicates a \
        collapsed (triangle orientated with a point down: ' + html_js_1.sy_downTriangle + ') or expanded (triangle with a point up: '
        + html_js_1.sy_upTriangle + '.'));
    // p6.
    let p6 = document.createElement('p');
    wDiv.appendChild(p6);
    p6.textContent = ' The Reaction Diagram button expands/collapses a well diagram for the reactions. This diagram should redraw if \
        any "me:ZPE" property value of a molecule is changed. The diagram can be opened in a new Window and saved to a PNG format file.';
    // p7.
    let p7 = document.createElement('p');
    wDiv.appendChild(p7);
    p7.textContent = 'MXG uses 3DMol.js under a BSD-3-Clause licence to visualise molecules with coordinates. For details of \
    3DMol.js please see the GitHub repository: ';
    p7.appendChild(t3Dmol_a);
    p7.appendChild(document.createTextNode('. If you use the 3DMol.js visualisations, please cite: Nicholas Rego and David Koes \
    3Dmol.js: molecular visualization with WebGL Bioinformatics (2015) 31 (8): 1322-1324 '));
    p7.appendChild(t3Dmol_citation_a);
    p7.appendChild(document.createTextNode('.'));
    // p8.
    let p8 = document.createElement('p');
    wDiv.appendChild(p8);
    p8.textContent = 'MXG uses Big.js under an MIT licence to handle numbers. For details of Big.js please see the GitHub repository: ';
    p8.appendChild(bigjs_a);
    p8.appendChild(document.createTextNode('.'));
});
/**
 *  Redraw the reactions diagram.
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
 * Prompts the user for a MESMER XML file, initiates the parsing of the chosen file, and
 * creates a save button for saving a new XML file.
 */
function load() {
    // Before loading a new file, remove any existing content.
    ids.forEach((id) => {
        (0, html_js_1.remove)(id, ids);
    });
    if (molecules != null) {
        molecules.clear();
    }
    if (reactions != null) {
        reactions.clear();
    }
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
            let inputFilename = file.name;
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
                        displayXML(inputFilename, contents);
                        let parser = new DOMParser();
                        let xml = parser.parseFromString(contents, "text/xml");
                        parse(xml);
                        /*
                        // Sending to the server for validation is no longer implemented as there is currently no server.
                        // Send XML to the server
                        fetch('http://localhost:1234/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/xml',
                            },
                            body: contents,
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then(data => {
                                console.log('Server response:', data);
                            })
                            .catch(error => {
                                console.error('There was a problem with the fetch operation:', error);
                            });
                        */
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
    if (xml_title.length != 1) {
        throw new Error('Multiple ' + mesmer_js_1.Title.tagName + ' tags found');
    }
    else {
        let title = xml_title[0].childNodes[0].nodeValue.trim();
        let titleNode = new mesmer_js_1.Title((0, xml_js_1.getAttributes)(xml_title[0]), title);
        mesmer.setTitle(titleNode);
        let titleDiv = document.getElementById(titleDivID);
        let lwiId = addID('titleDiv');
        // Remove any existing lwiId HTMLDivElement.
        (0, html_js_1.remove)(lwiId, ids);
        // Create input element.
        let lwi = (0, html_js_1.createLabelWithInput)("text", (0, util_js_1.getID)(lwiId, s_Input), boundary1, level0, (event) => {
            let target = event.target;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            (0, html_js_1.resizeInputElement)(target);
        }, title, mesmer_js_1.Title.tagName);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }
    // Molecules.
    let mlDiv = document.getElementById(moleculesDivID);
    let mlDivID = addID(mesmer_js_1.MoleculeList.tagName);
    // Remove any existing mlDivID HTMLDivElement.
    (0, html_js_1.remove)(mlDivID, ids);
    // Create collapsible content.
    let mlcDiv = (0, html_js_1.getCollapsibleDiv)(mlDivID, mlDiv, null, processMoleculeList(xml), mesmer_js_1.MoleculeList.tagName, boundary1, level0);
    mesmer.setMoleculeList(new mesmer_js_1.MoleculeList(new Map(), Array.from(molecules.values())));
    // Reactions.
    let rlDiv = document.getElementById(reactionsDivID);
    let rlDivID = addID(mesmer_js_1.ReactionList.tagName);
    // Remove any existing rlDivID HTMLDivElement.
    (0, html_js_1.remove)(rlDivID, ids);
    // Create collapsible content.
    let rlcDiv = (0, html_js_1.getCollapsibleDiv)(rlDivID, rlDiv, null, processReactionList(xml), mesmer_js_1.ReactionList.tagName, boundary1, level0);
    mesmer.setReactionList(new mesmer_js_1.ReactionList(new Map(), Array.from(reactions.values())));
    // Reactions Diagram.
    let rddDiv = document.getElementById(reactionsDiagramDivID);
    let rdDivID = addID(s_Reactions_Diagram);
    // Destroy any existing rdWindow.
    if (rdWindow != null) {
        rdWindow.close();
        rdWindow = null;
    }
    // If rdDiv already exists, remove it.
    (0, html_js_1.remove)(rdDivID, ids);
    // Create collapsible content.
    let rdDiv = (0, html_js_1.createDiv)(undefined, level1);
    let rdcDiv = (0, html_js_1.getCollapsibleDiv)(rdDivID, rddDiv, null, rdDiv, s_Reactions_Diagram, boundary1, level0);
    // Create a pop diagram button in its own div.
    let popButtonDivId = (0, util_js_1.getID)(rdDivID, 'pop');
    //remove(popButtonDivId);
    let popButtonDiv = (0, html_js_1.createDiv)(popButtonDivId);
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = (0, util_js_1.getID)(popButtonDivId, html_js_1.s_button);
    let popOutText = "Pop into a new Window";
    let popButton = (0, html_js_1.createButton)(popOutText, popButtonID);
    popButtonDiv.appendChild(popButton);
    let rdCanvas = document.createElement('canvas');
    rdCanvas.id = rdcID;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdcHeight;
    rdCanvas.style.border = "1px solid black";
    //rdCanvas.style.margin = "1px";
    drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener('click', () => {
        if (rdWindow == null) {
            let popWindowRDCanvas = document.createElement('canvas');
            popWindowRDCanvas.id = rdcID;
            rdWindow = window.open("", s_Reactions_Diagram, "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            rdWindow.document.body.appendChild(popWindowRDCanvas);
            drawReactionDiagram(popWindowRDCanvas, dark, rd_font, rd_lw, rd_lwc);
            (0, html_js_1.remove)(rdcID, ids);
            popButton.textContent = "Pop into this Window";
        }
        else {
            rdCanvas = document.createElement('canvas');
            rdCanvas.id = rdcID;
            rdDiv.appendChild(rdCanvas);
            drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
            rdWindow.close();
            rdWindow = null;
            popButton.textContent = popOutText;
        }
    });
    // Add a save button to save the canvas as an image.
    let saveButtonID = (0, util_js_1.getID)('saveButton');
    let saveButton = (0, html_js_1.createButton)("Save as PNG", saveButtonID, boundary1);
    popButtonDiv.appendChild(saveButton);
    saveButton.addEventListener('click', () => {
        let dataURL = rdCanvas.toDataURL();
        let a = document.createElement('a');
        a.href = dataURL;
        let title = mesmer.getTitle()?.value;
        a.download = (title + s_Reactions_Diagram).replace(/[^a-z0-9]/gi, '_') + ".png";
        a.click();
    });
    // Conditions.
    let cdlDiv = document.getElementById(conditionsDivID);
    let cdlDivID = addID(conditions_js_1.Conditions.tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    (0, html_js_1.remove)(cdlDivID, ids);
    // Create collapsible content.
    let cdlcDiv = (0, html_js_1.getCollapsibleDiv)(cdlDivID, cdlDiv, null, processConditions(xml), "ConditionsList", boundary1, level0);
    // Model Parameters.
    let mpDiv = document.getElementById(modelParametersDivID);
    let mpDivID = addID(modelParameters_js_1.ModelParameters.tagName);
    // Remove any existing mpDivID HTMLDivElement.
    (0, html_js_1.remove)(mpDivID, ids);
    // Create collapsible content.
    let mpcDiv = (0, html_js_1.getCollapsibleDiv)(mpDivID, mpDiv, null, processModelParameters(xml), modelParameters_js_1.ModelParameters.tagName, boundary1, level0);
    // Control.
    let clDiv = document.getElementById(controlDivID);
    let clDivID = addID(control_js_1.Control.tagName);
    // Remove any existing clDivID HTMLDivElement.
    (0, html_js_1.remove)(clDivID, ids);
    // Create collapsible content.
    let controlcDiv = (0, html_js_1.getCollapsibleDiv)(clDivID, clDiv, null, processControl(xml), "ControlList", boundary1, level0);
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
            throw new Error("Additional tag names in moleculeList:");
        }
    }
    if (!mlTagNames.has(molecule_js_1.Molecule.tagName)) {
        throw new Error("Expecting tags with \"" + molecule_js_1.Molecule.tagName + "\" tagName but there are none!");
    }
    // Process the XML "molecule" elements.
    let xml_ms = xml_ml.getElementsByTagName(molecule_js_1.Molecule.tagName);
    let xml_msl = xml_ms.length;
    console.log("Number of molecules=" + xml_msl);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_msl; i++) {
        let mDivID = (0, util_js_1.getID)(molecule_js_1.Molecule.tagName, i);
        let mDiv = (0, html_js_1.createDiv)(mDivID);
        // Set attributes.
        let attributes = (0, xml_js_1.getAttributes)(xml_ms[i]);
        // Get the molecule id.
        let mID = attributes.get(molecule_js_1.Molecule.s_id);
        if (mID == undefined) {
            throw new Error(molecule_js_1.Molecule.s_id + ' is undefined');
        }
        // Create molecule.
        let m = new molecule_js_1.Molecule(attributes, mID);
        molecules.set(mID, m);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = (0, util_js_1.getID)(mDivID, s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, null, mDiv, mID, boundary1, level1);
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
        mDiv.appendChild(processDescription((0, util_js_1.getID)(m.getID(), s_description), m.getDescription.bind(m), m.setDescription.bind(m), boundary1, level1));
        // Init atoms.
        //console.log("Init atoms.");
        // There can be an individual atom not in an atom array, or an atom array.
        let xml_aas = xml_ms[i].getElementsByTagName(molecule_js_1.AtomArray.tagName);
        if (xml_aas.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.AtomArray.tagName + " but finding " + xml_aas.length + "!");
        }
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = (0, util_js_1.getID)(mDivID, molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = (0, util_js_1.getID)(aaDivID, s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, molecule_js_1.AtomArray.tagName, boundary1, level1);
        if (xml_aas.length == 1) {
            let xml_aa = xml_aas[0];
            let xml_as = xml_aa.getElementsByTagName(molecule_js_1.Atom.tagName);
            if (xml_as.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + molecule_js_1.AtomArray.tagName + ", but finding " + xml_as.length + "!");
            }
            let aa = new molecule_js_1.AtomArray((0, xml_js_1.getAttributes)(xml_aa));
            m.setAtoms(aa);
            for (let j = 0; j < xml_as.length; j++) {
                //console.log("j=" + j);
                // Create a new Atom.
                let a = new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_as[j]), m);
                let aID = aa.addAtom(a);
                let aDivID = (0, util_js_1.getID)(aaDivID, j);
                let aDiv = (0, html_js_1.createFlexDiv)(aDivID, level1);
                aaDiv.appendChild(aDiv);
                aDiv.appendChild((0, html_js_1.createLabel)(aID, boundary1));
                // elementType.
                processElementType(a, aDiv, false, boundary1);
                // coordinates.
                processCoordinates(a, aDiv, boundary1, boundary1);
                addRemoveButton(aDiv, boundary1, removeAtom, m, aID);
            }
            moleculeTagNames.delete(molecule_js_1.AtomArray.tagName);
        }
        else {
            let xml_as = xml_ms[i].getElementsByTagName(molecule_js_1.Atom.tagName);
            if (xml_as.length == 1) {
                let aa = new molecule_js_1.AtomArray(new Map());
                aa.addAtom(new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_as[0]), m));
                m.setAtoms(aa);
            }
            else if (xml_as.length > 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Atom.tagName + " but finding " + xml_as.length
                    + ". Should these be in an " + molecule_js_1.AtomArray.tagName + "?");
            }
        }
        //console.log("atomsNode=" + atomsNode);
        aaDiv.appendChild(getAddAtomButton(m, aaDiv, molecule_js_1.Atom.tagName, boundary1, level1));
        moleculeTagNames.delete(molecule_js_1.Atom.tagName);
        // Init bonds.
        let ba = new molecule_js_1.BondArray(new Map()); // This will be replaced if there is an BondArray.=
        // Function to be used to remove a bond.
        let removeBond = (id) => m.getBonds().removeBond(id);
        // There can be an individual bond not in a bond array, or a bond array.
        // There may be only 1 bond in a BondArray.
        let xml_bas = xml_ms[i].getElementsByTagName(molecule_js_1.BondArray.tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = (0, util_js_1.getID)(mDivID, molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = (0, util_js_1.getID)(baDivID, s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, molecule_js_1.BondArray.tagName, boundary1, level1);
        if (xml_bas.length > 0) {
            if (xml_bas.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.BondArray.tagName + " but finding " + xml_bas.length + "!");
            }
            let xml_bs = xml_bas[0].getElementsByTagName(molecule_js_1.Bond.tagName);
            ba = new molecule_js_1.BondArray((0, xml_js_1.getAttributes)(xml_bas[0]));
            for (let j = 0; j < xml_bs.length; j++) {
                // Create a new Bond.
                let b = new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m);
                let bID = ba.addBond(b);
                let bdivID = (0, util_js_1.getID)(baDivID, j);
                let bDiv = (0, html_js_1.createFlexDiv)(bdivID, level1);
                baDiv.appendChild(bDiv);
                bDiv.appendChild((0, html_js_1.createLabel)(bID, boundary1));
                // atomRefs2.
                processAtomRefs2(m, bDiv, b, boundary1);
                // order.
                processOrder(bDiv, b, boundary1);
                addRemoveButton(bDiv, boundary1, removeBond, bID);
            }
            m.setBonds(ba);
            moleculeTagNames.delete(molecule_js_1.BondArray.tagName);
        }
        else {
            let xml_bonds = xml_ms[i].getElementsByTagName(molecule_js_1.Bond.tagName);
            if (xml_bonds.length > 0) {
                if (xml_bonds.length > 1) {
                    throw new Error("Expecting 1 " + molecule_js_1.Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + molecule_js_1.BondArray.tagName + "?");
                }
                ba = new molecule_js_1.BondArray(new Map());
                ba.addBond(new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bonds[0]), m));
                m.setBonds(ba);
            }
        }
        baDiv.appendChild(getAddBondButton(m, mID, baDiv, molecule_js_1.Bond.tagName, boundary1, level1));
        moleculeTagNames.delete(molecule_js_1.Bond.tagName);
        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID = (0, util_js_1.getID)(mDivID, "viewer");
        let viewerDiv = (0, html_js_1.createDiv)(viewerDivID);
        let viewercDivID = (0, util_js_1.getID)(viewerDivID, s_container);
        let viewercDiv = (0, html_js_1.getCollapsibleDiv)(viewercDivID, mDiv, null, viewerDiv, "viewer", boundary1, level1);
        create3DViewer(m, viewerDiv, boundary1, level1);
        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_pls = xml_ms[i].getElementsByTagName(molecule_js_1.PropertyList.tagName);
        if (xml_pls.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.PropertyList.tagName + " but finding " + xml_pls.length + "!");
        }
        if (xml_pls.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDivID = (0, util_js_1.getID)(mDivID, molecule_js_1.PropertyList.tagName);
            let plDiv = (0, html_js_1.createDiv)(plDivID);
            let plcDivID = (0, util_js_1.getID)(plDivID, s_container);
            let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, molecule_js_1.PropertyList.tagName, boundary1, level1);
            // Create a new PropertyList.
            let pl = new molecule_js_1.PropertyList((0, xml_js_1.getAttributes)(xml_pls[0]));
            m.setPropertyList(pl);
            let xml_ps = xml_pls[0].getElementsByTagName(molecule_js_1.Property.tagName);
            for (let j = 0; j < xml_ps.length; j++) {
                // Create a new Property.
                let p = createProperty(pl, xml_ps[j], plDiv, m, boundary1, level1);
                pl.setProperty(p);
            }
            moleculeTagNames.delete(molecule_js_1.PropertyList.tagName);
        }
        else {
            // There is a Property on its own. For simplicity, this will be stored in a PropertyList.
            // Create a new PropertyList.
            let pl = new molecule_js_1.PropertyList(new Map());
            m.setPropertyList(pl);
            let xml_ps = xml_ms[i].getElementsByTagName(molecule_js_1.Property.tagName);
            if (xml_ps.length != 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Property.tagName + " but finding " + xml_ps.length
                    + ". Should these be in a " + molecule_js_1.PropertyList.tagName + "?");
            }
            // Create a new Property.
            let p = createProperty(pl, xml_ps[0], mDiv, m, boundary1, level1);
            pl.setProperty(p);
            moleculeTagNames.delete(molecule_js_1.Property.tagName);
        }
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
        // Organise ThermoTable.
        let tttn = molecule_js_1.ThermoTable.tagName;
        let xml_tts = xml_ms[i].getElementsByTagName(tttn);
        if (xml_tts.length > 0) {
            if (xml_tts.length > 1) {
                throw new Error("Expecting 1 or 0 " + tttn + " but finding " + xml_tts.length + "!");
            }
            let tt = new molecule_js_1.ThermoTable((0, xml_js_1.getAttributes)(xml_tts[0]));
            // Create collapsible div.
            let ttDivId = (0, util_js_1.getID)(mDivID, molecule_js_1.ThermoTable.tagName);
            let ttDiv = (0, html_js_1.createDiv)(ttDivId);
            let ttcDivId = (0, util_js_1.getID)(ttDivId, s_container);
            let ttcDiv = (0, html_js_1.getCollapsibleDiv)(ttcDivId, mDiv, null, ttDiv, tttn, boundary1, level1);
            let tvs;
            let tvtn = molecule_js_1.ThermoValue.tagName;
            let xml_tvs = xml_tts[0].getElementsByTagName(tvtn);
            if (xml_tvs.length == 0) {
                throw new Error("Expecting 1 or more " + tvtn + " but finding 0!");
            }
            else {
                tvs = [];
                tt.init(tvs);
                let t = (0, html_js_1.createTable)((0, util_js_1.getID)(ttDivId, s_table), level1);
                (0, html_js_1.addTableRow)(t, tt.getHeader());
                for (let j = 0; j < xml_tvs.length; j++) {
                    let tv = new molecule_js_1.ThermoValue((0, xml_js_1.getAttributes)(xml_tvs[j]));
                    tvs.push(tv);
                    (0, html_js_1.addTableRow)(t, tv.toStringArray());
                }
                ttDiv.appendChild(t);
                // Add a button to save the table as a CSV file.
                let saveButtonID = (0, util_js_1.getID)(ttDivId, html_js_1.s_button);
                let saveButton = (0, html_js_1.createButton)("Save as CSV", saveButtonID, boundary1);
                ttDiv.appendChild(saveButton);
                saveButton.addEventListener('click', () => {
                    let csv = tt.toCSV();
                    let a = document.createElement('a');
                    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                    let title = mesmer.getTitle()?.value;
                    a.download = title.replace(/[^a-z0-9]/gi, '_') + "_" + mID + "_" + molecule_js_1.ThermoTable.tagName + ".csv";
                    document.body.appendChild(a); // Append the anchor to the body.
                    a.click(); // Programmatically click the anchor to trigger the download.
                    document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
                });
            }
            m.setThermoTable(tt);
            moleculeTagNames.delete(tvtn);
            moleculeTagNames.delete(tttn);
        }
        /*
reactionList
    reaction
        me:canonicalRateList
            me:kinf
            me:T
            me:val
            me:rev
            me:Keq

control
  me:ForceMacroDetailedBalance

me:analysis
  me:rateList
        */
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_ms[i].getElementsByTagName(molecule_js_1.ExtraDOSCMethod.tagName);
        if (xml_edms.length > 0) {
            if (xml_edms.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_edms.length);
            }
            let edm = new molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(xml_dms[0]));
            // Create collapsible ExtraDOSCMethod HTMLDivElement.
            let edmDivID = (0, util_js_1.getID)(mDivID, molecule_js_1.ExtraDOSCMethod.tagName);
            let edmDiv = (0, html_js_1.createDiv)(edmDivID);
            let edmcDivID = (0, util_js_1.getID)(edmDivID, s_container);
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
                let hrpDivID = (0, util_js_1.getID)(edmDivID, molecule_js_1.HinderedRotorPotential.tagName);
                let hrpDiv = (0, html_js_1.createDiv)(hrpDivID);
                let hrpcDivID = (0, util_js_1.getID)(hrpDivID, s_container);
                let hrpcDiv = (0, html_js_1.getCollapsibleDiv)(hrpcDivID, edmDiv, null, hrpDiv, molecule_js_1.HinderedRotorPotential.tagName, boundary1, level1);
                // Format.
                hrpDiv.appendChild((0, html_js_1.createLabelWithSelect)(molecule_js_1.HinderedRotorPotential.s_format, molecule_js_1.HinderedRotorPotential.formats, molecule_js_1.HinderedRotorPotential.tagName, hrp.getFormat(), (0, util_js_1.getID)(hrpDivID, molecule_js_1.HinderedRotorPotential.s_format), boundary1, level1));
                // Units.
                addAnyUnits(mesmer_js_1.Mesmer.energyUnits, hrpAttributes, hrpDiv, (0, util_js_1.getID)(hrpDivID, molecule_js_1.HinderedRotorPotential.s_units), molecule_js_1.HinderedRotorPotential.tagName, boundary1, level1);
                // ExpansionSize.
                hrpDiv.appendChild((0, html_js_1.createLabelWithInput)("text", (0, util_js_1.getID)(hrpDivID, molecule_js_1.HinderedRotorPotential.s_expansionSize), boundary1, level1, (event) => {
                    let target = event.target;
                    // Check the input is a number.
                    try {
                        hrp.setExpansionSize(new big_js_1.default(target.value));
                    }
                    catch (e) {
                        alert("Invalid value, resetting...");
                        target.value = hrp.getExpansionSize().toString();
                    }
                    (0, html_js_1.resizeInputElement)(target);
                }, hrp.getExpansionSize().toString(), molecule_js_1.HinderedRotorPotential.s_expansionSize));
                // Add useSineTerms.
                processUseSineTerms(hrpDiv, hrp, level1);
                // Load PotentialPoints.
                // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                let ppsDivID = (0, util_js_1.getID)(mDivID, molecule_js_1.HinderedRotorPotential.tagName, molecule_js_1.PotentialPoint.tagName);
                let ppsDiv = (0, html_js_1.createDiv)(ppsDivID);
                let ppscDivID = (0, util_js_1.getID)(ppsDivID, s_container);
                let ppscDiv = (0, html_js_1.getCollapsibleDiv)(ppscDivID, mDiv, null, ppsDiv, "PotentialPoints", boundary1, level1);
                hrpDiv.appendChild(ppscDiv);
                let pps = [];
                let xml_pps = xml_hrps[0].getElementsByTagName(molecule_js_1.PotentialPoint.tagName);
                for (let k = 0; k < xml_pps.length; k++) {
                    let pp = new molecule_js_1.PotentialPoint((0, xml_js_1.getAttributes)(xml_pps[k]));
                    pps.push(pp);
                    let ppDivID = (0, util_js_1.getID)(ppsDivID, molecule_js_1.PotentialPoint.tagName, k);
                    let ppDiv = (0, html_js_1.createFlexDiv)(ppDivID, level1);
                    ppsDiv.appendChild(ppDiv);
                    let l = (0, html_js_1.createLabel)(molecule_js_1.PotentialPoint.tagName + " " + k, boundary1);
                    ppDiv.appendChild(l);
                    // Process angle
                    let anglelwi = (0, html_js_1.createLabelWithInput)("text", (0, util_js_1.getID)(ppDivID, molecule_js_1.PotentialPoint.s_angle), boundary1, boundary1, (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, util_js_1.isNumeric)(target.value)) {
                            let value = new big_js_1.default(target.value);
                            pp.setAngle(value);
                        }
                        else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            target.value = pp.getAngle().toExponential();
                        }
                        (0, html_js_1.resizeInputElement)(target);
                    }, pp.getAngle().toExponential(), molecule_js_1.PotentialPoint.s_angle);
                    ppDiv.appendChild(anglelwi);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, html_js_1.createLabel)(molecule_js_1.PotentialPoint.s_potential, boundary1);
                    ppDiv.appendChild(potentialLabel);
                    let potentialInputElementId = (0, util_js_1.getID)(ppDivID, molecule_js_1.PotentialPoint.s_potential);
                    let potentialInputElement = (0, html_js_1.createInput)("text", potentialInputElementId, boundary1);
                    ppDiv.appendChild(potentialInputElement);
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
                            potentialInputElement.value = pp.getPotential().toExponential();
                        }
                        (0, html_js_1.resizeInputElement)(potentialInputElement);
                    });
                    potentialInputElement.value = pp.getPotential().toExponential();
                    (0, html_js_1.resizeInputElement)(potentialInputElement);
                }
                //ppsDiv.appendChild(ppDiv);
                hrp.setPotentialPoints(pps);
                edm.setHinderedRotorPotential(hrp);
            }
            // Read periodicities.
            let xml_periodicities = xml_dms[0].getElementsByTagName(molecule_js_1.Periodicity.tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_periodicities[0]));
                let periodicity = new molecule_js_1.Periodicity((0, xml_js_1.getAttributes)(xml_periodicities[0]), new big_js_1.default(valueString));
                edm.setPeriodicity(periodicity);
                let inputDiv = (0, html_js_1.createLabelWithInput)("text", m.getID() + "_" + molecule_js_1.Periodicity.tagName, boundary1, level1, (event) => {
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
                edmDiv.appendChild(inputDiv);
            }
            m.setExtraDOSCMethod(edm);
            moleculeTagNames.delete(molecule_js_1.ExtraDOSCMethod.tagName);
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
        // Create a molstar molecule visualisation
        let molstarDiv = document.createElement("div");
        molstarDiv.id = (0, util_js_1.getID)(m.getID(), "molstar");
        mDiv.appendChild(molstarDiv);
    }
    // Create an add molecule button.
    let addMoleculeButton = (0, html_js_1.createButton)(s_Add_sy_add, undefined, level1);
    mlDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', () => {
        // Ask the user to specify the molecule ID.
        let moleculeId = prompt("Please enter a name for the molecule", "Kr");
        let molecule = new molecule_js_1.Molecule(new Map(), moleculeId);
        molecules.set(moleculeId, molecule);
        let moleculeDivID = (0, util_js_1.getID)(molecule_js_1.Molecule.tagName, molecules.size);
        let moleculeDiv = (0, html_js_1.createDiv)(moleculeDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = (0, util_js_1.getID)(moleculeDivID, s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, addMoleculeButton, moleculeDiv, moleculeId, boundary1, level1);
        // Add the molecule to the BathGas select elements.
        addOptionByClassName(conditions_js_1.BathGas.tagName, molecule.getID());
        // Add edit Name button.
        addEditIDButton(molecule, mcDiv.querySelector(html_js_1.s_button), moleculeDiv, level1);
        // Description
        moleculeDiv.appendChild(processDescription((0, util_js_1.getID)(molecule.getID(), s_description), molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), boundary1, level1));
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = (0, util_js_1.getID)(moleculeDivID, molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = (0, util_js_1.getID)(aaDivID, s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, moleculeDiv, null, aaDiv, molecule_js_1.AtomArray.tagName, boundary1, level1);
        aaDiv.appendChild(getAddAtomButton(molecule, aaDiv, molecule_js_1.Atom.tagName, boundary1, level1));
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = (0, util_js_1.getID)(moleculeDivID, molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = (0, util_js_1.getID)(baDivID, s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, moleculeDiv, null, baDiv, molecule_js_1.BondArray.tagName, boundary1, level1);
        baDiv.appendChild(getAddBondButton(molecule, moleculeId, baDiv, molecule_js_1.Bond.tagName, boundary1, level1));
        create3DViewer(molecule, moleculeDiv, boundary1, level1);
        // Create collapsible Properties HTMLDivElement.
        let plDivID = (0, util_js_1.getID)(moleculeDivID, molecule_js_1.PropertyList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID);
        let plcDivID = (0, util_js_1.getID)(plDivID, s_container);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, moleculeDiv, null, plDiv, molecule_js_1.PropertyList.tagName, boundary1, level1);
        // More code to add here...
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
    let editNameButtonID = (0, util_js_1.getID)(moleculeDiv.id, s_editName, html_js_1.s_button);
    let editNameButton = (0, html_js_1.createButton)(s_editName, editNameButtonID, level);
    moleculeDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', () => {
        let newMoleculeId = prompt("Please enter a name for the molecule:", molecule.getID());
        if (newMoleculeId != null) {
            let mid = (0, util_js_1.getID)(newMoleculeId); // This ensures that all special chars are handled.
            // Update the BathGas select elements.
            addOptionByClassName(conditions_js_1.BathGas.tagName, mid);
            removeOptionByClassName(conditions_js_1.BathGas.tagName, molecule.getID());
            molecules.set(mid, molecule);
            molecules.delete(molecule.getID());
            molecule.setID(mid);
            moleculeDiv.id = mid;
            button.textContent = newMoleculeId + " " + html_js_1.sy_upTriangle;
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
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = (0, util_js_1.getID)(id, s_description, s_Input);
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
 * Creates and returns a button for adding a new atom div to the atomArrayDiv. The atom div added
 * will have: label (atom id); (editable details); and a remove button.
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
    let button = (0, html_js_1.createButton)(s_Add_sy_add, (0, util_js_1.getID)(molecule.getID(), "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes = new Map();
        let a = new molecule_js_1.Atom(attributes, molecule);
        let aID = molecule.getAtoms().addAtom(a);
        let aDivID = (0, util_js_1.getID)(molecule.getID(), aID);
        let aDiv = (0, html_js_1.createFlexDiv)(aDivID, level);
        aDiv.appendChild((0, html_js_1.createLabel)(aID, boundary));
        // elementType.
        processElementType(a, aDiv, true, boundary);
        // Coordinates.
        processCoordinates(a, aDiv, boundary, boundary);
        addRemoveButton(aDiv, boundary, removeAtom, molecule, aID);
        aaDiv.insertBefore(aDiv, button);
        // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
        addOptionByClassName(molecule_js_1.Bond.s_atomRefs2, aID);
    });
    return button;
}
/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param id The atom id to remove.
 */
function removeAtom(molecule, id) {
    molecule.getAtoms().removeAtom(id);
    molecule.getBonds().bonds.forEach((bond) => {
        let atomRefs2 = bond.getAtomRefs2();
        let atomRefs = atomRefs2.split(" ");
        if (atomRefs[0] == id || atomRefs[1] == id) {
            let bondId = bond.getId();
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            // Remove any bondDiv elements with a reference to id.
            let bondDivs = document.getElementsByClassName(id);
            //console.log("bondDivs.length=" + bondDivs.length);
            for (let i = 0; i < bondDivs.length; i++) {
                bondDivs[i].remove();
            }
        }
    });
    removeOptionByClassName(molecule_js_1.Bond.s_atomRefs2, id);
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
            Array.from(options).forEach((option) => {
                if (option.value == optionToRemove) {
                    option.remove();
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
    //console.log("n elements with className " + className + "=" + elements.length);    
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
 * Creates and returns a button for adding a new bond div to the bondArrayDiv. The bond div added
 * will have: label (bond id); editable details (atomRefs2 and order); and, remove and refresh buttons.
 *
 * @param molecule The molecule.
 * @param bondArrayDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */
function getAddBondButton(molecule, moleculeId, bondArrayDiv, typeID, boundary, level) {
    // Create an add button.
    let button = (0, html_js_1.createButton)(s_Add_sy_add, (0, util_js_1.getID)(moleculeId, "Add" + typeID + "Button"), level);
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
        let bID = molecule.getBonds().addBond(b);
        let bDiv = (0, html_js_1.createFlexDiv)((0, util_js_1.getID)(moleculeId, bID), level);
        // Add to the classlists so that bondDivs involving particular atoms can be found.
        Array.from(atoms.keys()).forEach((atomId) => {
            bDiv.classList.add(atomId);
        });
        bondArrayDiv.insertBefore(bDiv, button);
        bDiv.appendChild((0, html_js_1.createLabel)(bID, boundary));
        // atomRefs2.
        processAtomRefs2(molecule, bDiv, b, boundary);
        // order.
        processOrder(bDiv, b, boundary);
        let removeBond = (id) => molecule.getBonds().removeBond(id);
        addRemoveButton(bDiv, boundary, removeBond, bID);
        // Get elements with Bond className. These select elements are to be updated to include the new bond option.
        addOptionByClassName(molecule_js_1.Bond.tagName, bID);
    });
    bondArrayDiv.appendChild(button);
    return button;
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
    let id = (0, util_js_1.getID)(bDiv.id, molecule_js_1.Bond.s_atomRefs2);
    let atomRefs2 = bond.getAtomRefs2();
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    let alws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.Bond.s_atomRefs2 + "[0]", atomRefOptions, molecule_js_1.Atom.tagName, atomRefs[0], (0, util_js_1.getID)(id, 0), margin, margin);
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
    let blws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.Bond.s_atomRefs2 + "[1]", atomRefOptions, molecule_js_1.Atom.tagName, atomRefs[1], (0, util_js_1.getID)(id, 1), margin, margin);
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
/**
 * @param pl The PropertyList.
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(pl, xml, plDiv, molecule, boundary, level) {
    let p = new molecule_js_1.Property((0, xml_js_1.getAttributes)(xml));
    console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == molecule_js_1.ZPE.dictRef) {
        processProperty(pl, p, mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
        processProperty(pl, p, mesmer_js_1.Mesmer.frequencyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.VibFreqs.dictRef) {
        console.log("VibFreqs");
        processProperty(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else {
        processProperty(pl, p, undefined, molecule, xml, plDiv, boundary, level);
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
function processElementType(a, aDiv, first, margin) {
    let elementType = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = mesmer_js_1.Mesmer.elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = s_selectOption;
        addOrRemoveInstructions(selectTypes, first);
        //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    let lws = (0, html_js_1.createLabelWithSelect)(molecule_js_1.Atom.s_elementType, selectTypes, molecule_js_1.Atom.s_elementType, elementType, (0, util_js_1.getID)(aDiv.id, molecule_js_1.Atom.s_elementType), margin, margin);
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
function processCoordinates(a, aDiv, marginComponent, margin) {
    aDiv.appendChild(processNumber((0, util_js_1.getID)(aDiv.id, molecule_js_1.Atom.s_x3), molecule_js_1.Atom.s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    aDiv.appendChild(processNumber((0, util_js_1.getID)(aDiv.id, molecule_js_1.Atom.s_y3), molecule_js_1.Atom.s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    aDiv.appendChild(processNumber((0, util_js_1.getID)(aDiv.id, molecule_js_1.Atom.s_z3), molecule_js_1.Atom.s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
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
function processNumber(id, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, html_js_1.createFlexDiv)(undefined, margin);
    let buttonTextContentSelected = name + sy_selected;
    let buttonTextContentDeselected = name + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = (0, util_js_1.getID)(id, name, s_Input);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addNumber(div, inputId, name, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addNumber(div, inputId, name, value, setter, marginComponent);
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
function addNumber(div, id, name, value, setter, boundary) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value.toString();
    }
    let input = (0, html_js_1.createInput)("number", id, boundary);
    input.addEventListener('change', (event) => {
        let target = event.target;
        try {
            setter(new big_js_1.default(target.value));
            console.log(name + " changed from " + value + " to " + target.value);
        }
        catch (e) {
            alert("Input invalid, resetting...");
            target.value = valueString;
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
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = (0, util_js_1.getID)(id, name, s_Input);
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
    });
    return button;
}
/**
 * Process an order.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param margin The margin for components.
 */
function processOrder(bondDiv, bond, margin) {
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
    let id = (0, util_js_1.getID)(hrpDiv.id, molecule_js_1.HinderedRotorPotential.s_useSineTerms);
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
    let viewerContainerDivID = (0, util_js_1.getID)(molecule.getID(), "viewerContainer");
    let viewerContainerDiv = (0, html_js_1.createDiv)(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID = (0, util_js_1.getID)(molecule.getID(), "viewer");
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
                viewer.addLabel(atom.getId(), { position: { x: ax, y: ay, z: az } });
            }
        });
        console.log("molecule.getBonds().bonds.size " + molecule.getBonds().bonds.size);
        molecule.getBonds().bonds.forEach(function (bond) {
            console.log("bond.atomRefs2 " + bond.getAtomRefs2());
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
                viewer.addLabel(bond.getId(), { position: { x: (a0x + a1x) / 2, y: (a0y + a1y) / 2, z: (a0z + a1z) / 2 } });
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
        (0, html_js_1.remove)(viewerDivID, ids);
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
            (0, html_js_1.remove)(viewerDivID, ids);
            viewer = createViewer(
            //cameraPosition, cameraOrientation, zoomLevel,
            showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, (0, util_js_1.getID)(molecule.getID(), s_Atom_Labels), showAtomLabels, newState => showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, (0, util_js_1.getID)(molecule.getID(), s_Bond_Labels), showBondLabels, newState => showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton = (0, html_js_1.createButton)("Save as PNG", (0, util_js_1.getID)(molecule.getID(), s_save), boundary1);
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
    let xml2DivID = addID(xmlDivID, 2);
    // Remove any existing mlDivID HTMLDivElement.
    (0, html_js_1.remove)(xml2DivID, ids);
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
function processProperty(pl, p, units, molecule, element, plDiv, boundary, level) {
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName(molecule_js_1.PropertyScalar.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + molecule_js_1.PropertyScalar.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString = (0, xml_js_1.getInputString)(scalarNodes[0]);
        let value = new big_js_1.default(inputString);
        let psAttributes = (0, xml_js_1.getAttributes)(scalarNodes[0]);
        let ps = new molecule_js_1.PropertyScalar(psAttributes, value);
        p.setProperty(ps);
        ps.setValue = function (value) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + value);
            if (p.dictRef == molecule_js_1.ZPE.dictRef) {
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        }.bind(ps);
        let div = processNumber((0, util_js_1.getID)(plDiv.id, p.dictRef), p.dictRef, ps.getValue.bind(ps), ps.setValue, () => pl.removeProperty(p.dictRef), boundary1, level1);
        addAnyUnits(units, psAttributes, div, (0, util_js_1.getID)(plDiv.id, p.dictRef, molecule_js_1.PropertyScalar.s_units), p.dictRef, boundary, boundary);
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
                //pl.addNode(pa);
                /*
                pa.setValues = function (values: Big[]) {
                    if (p.dictRef == RotConsts.dictRef || p.dictRef == VibFreqs.dictRef) {
                        setNumberArrayNode(pa, ta: HTMLTextAreaElement)
                        if (values.length != pa.values.length) {
                            alert("The number of values should be " + pa.values.length + "");
                        } else {
                            pa.values = values;
                        }
                    }
                    console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + values);
                }.bind(pa);
                */
                let div = processNumberArray((0, util_js_1.getID)(plDiv.id, p.dictRef), p.dictRef, pa, pa.getValues.bind(pa), pa.setValues, () => pl.removeProperty(p.dictRef), boundary1, level1);
                addAnyUnits(units, paAttributes, div, (0, util_js_1.getID)(plDiv.id, p.dictRef, molecule_js_1.PropertyScalar.s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(div);
            }
            /*
            if (textArea) {
                let lwta: HTMLDivElement = createLabelWithTextArea(getID(plDiv.id, p.dictRef),
                    boundary, level, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        setNumberArrayNode(pa, target);
                    }, inputString, p.dictRef);
                let ta: HTMLTextAreaElement = lwta.querySelector('textarea') as HTMLTextAreaElement;
                resizeTextAreaElement(ta);
                ta.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    inputString = target.value;
                    pa = p.getProperty() as PropertyArray;
                    pa.values = toNumberArray(inputString.split(/\s+/));
                    console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + inputString);
                    resizeTextAreaElement(ta);
                });
                addAnyUnits(units, psAttributes, lwta, getID(plDiv.id, p.dictRef, PropertyScalar.s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(lwta);
            } else {
                p.setProperty(pa);
                let lwi: HTMLDivElement = createLabelWithInput("text", getID(plDiv.id, p.dictRef),
                    boundary, level, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        setNumberArrayNode(pa, target);
                    }, inputString, p.dictRef);
                let inputElement: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
                inputElement.value = inputString;
                resizeInputElement(inputElement);
                inputElement.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    inputString = target.value;
                    pa = p.getProperty() as PropertyArray;
                    pa.values = toNumberArray(inputString.split(/\s+/));
                    console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + inputString);
                    resizeInputElement(inputElement);
                });
                addAnyUnits(units, paAttributes, lwi, getID(plDiv.id, p.dictRef, s_Select, "Units"), p.dictRef, boundary, boundary);
                plDiv.appendChild(lwi);
            }
            */
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
                let inputDiv = (0, html_js_1.createLabelWithTextArea)((0, util_js_1.getID)(plDiv.id, p.dictRef), boundary, level, (event) => {
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
                addAnyUnits(units, pmAttributes, inputDiv, (0, util_js_1.getID)(plDiv.id, p.dictRef, s_Select, "Units"), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            }
            else {
                throw new Error("Expecting " + molecule_js_1.PropertyScalar.tagName + ", " + molecule_js_1.PropertyArray.tagName + " or "
                    + molecule_js_1.PropertyMatrix.tagName + " but finding none!");
            }
        }
    }
}
/**
 * If there is a choice of units, then a HTMLDivElement is appended containing an HTMLLabelElement and a HTMLSelectElement.
 * If there is no choice of units, a HTMLLabelElement is appended.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param divToAppendTo The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @param boundary The boundary.
 * @param level The level.
 */
function addAnyUnits(units, attributes, divToAppendTo, id, tagOrDictRef, boundary, level) {
    if (units != undefined) {
        let lws = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level);
        if (lws != undefined) {
            divToAppendTo.appendChild(lws);
        }
    }
    else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, html_js_1.createLabel)("units " + attributesUnits, level);
            divToAppendTo.appendChild(label);
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
        let etmdivID = (0, util_js_1.getID)(molecule.getID(), molecule_js_1.EnergyTransferModel.tagName);
        let etmDiv = document.createElement("div");
        let etmcDivID = (0, util_js_1.getID)(etmdivID, s_container);
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
            let id = (0, util_js_1.getID)(etmdivID, molecule_js_1.DeltaEDown.tagName, k);
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
        node.setValue(value);
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
        let reactionDivID = (0, util_js_1.getID)(reaction_js_1.Reaction.tagName, i);
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
            let rsDivID = (0, util_js_1.getID)(reaction.id, reaction_js_1.Reactant.tagName);
            let rsDiv = (0, html_js_1.createDiv)(rsDivID);
            let rscDivID = (0, util_js_1.getID)(rsDivID, s_container);
            let rscDiv = (0, html_js_1.getCollapsibleDiv)(rscDivID, reactionDiv, null, rsDiv, "Reactants", boundary1, level1);
            let reactants = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let reactantDivID = (0, util_js_1.getID)(reaction.id, reaction_js_1.Reactant.tagName, j);
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_reactants[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let reactant = new reaction_js_1.Reactant((0, xml_js_1.getAttributes)(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.ref + " role", reaction_js_1.Reactant.roleOptions, "Role", molecule.role, (0, util_js_1.getID)(reactantDivID, s_Select), boundary1, level1);
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
            let psDivID = (0, util_js_1.getID)(reactionDivID, reaction_js_1.Product.tagName);
            let psDiv = (0, html_js_1.createDiv)(psDivID);
            let pscDivID = (0, util_js_1.getID)(psDivID, s_container);
            let pscDiv = (0, html_js_1.getCollapsibleDiv)(pscDivID, reactionDiv, null, psDiv, "Products", boundary1, level1);
            let products = [];
            for (let j = 0; j < xml_products.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_products[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let product = new reaction_js_1.Product((0, xml_js_1.getAttributes)(xml_products[j]), molecule);
                products.push(product);
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.ref + " role", reaction_js_1.Product.roleOptions, molecule.role, molecule.ref, "Role", boundary1, level1);
                let select = lws.querySelector('select');
                select.value = molecule.role;
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
        let reactioncDivID = (0, util_js_1.getID)(reactionDivID, s_container);
        let reactioncDiv = (0, html_js_1.getCollapsibleDiv)(reactioncDivID, reactionListDiv, null, reactionDiv, reaction.id + " (" + reaction.getLabel() + ")", boundary1, level1);
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(reaction_js_1.Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling = new reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws = (0, html_js_1.createLabelWithSelect)(reaction_js_1.Tunneling.tagName, reaction_js_1.Tunneling.options, "Tunneling", tunneling.getName(), reaction.id, boundary1, level1);
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
            let tsDivID = (0, util_js_1.getID)(reactionDivID, reaction_js_1.Product.tagName);
            let tsDiv = (0, html_js_1.createDiv)(tsDivID);
            let tscDivID = (0, util_js_1.getID)(tsDivID, s_container);
            let tscDiv = (0, html_js_1.getCollapsibleDiv)(tscDivID, reactionDiv, null, tsDiv, "Transition States", boundary1, level1);
            let transitionStates = [];
            for (let j = 0; j < xml_transitionStates.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_transitionStates[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let transitionState = new reaction_js_1.TransitionState((0, xml_js_1.getAttributes)(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label = (0, html_js_1.createLabel)(molecule.ref + " role transitionState", level1);
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
                let mCRCMethodDiv = document.createElement("div");
                let mCRCMethod;
                let mCRCMethodAttributes = (0, xml_js_1.getAttributes)(xml_MCRCMethod[0]);
                let name = mCRCMethodAttributes.get("name");
                //console.log(MCRCMethod.tagName + " name=" + name);
                if (name == undefined || name == reaction_js_1.MesmerILT.xsiType2) {
                    let type = mCRCMethodAttributes.get("xsi:type");
                    mCRCMethod = new reaction_js_1.MesmerILT(mCRCMethodAttributes);
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    if (type == reaction_js_1.MesmerILT.xsiType || type == reaction_js_1.MesmerILT.xsiType2) {
                        // Create a collapsible div.
                        let mDivId = (0, util_js_1.getID)(reaction.id, reaction_js_1.MCRCMethod.tagName);
                        let mDiv = (0, html_js_1.createDiv)(mDivId);
                        let mcDivId = (0, util_js_1.getID)(mDivId, s_container);
                        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivId, reactionDiv, null, mDiv, reaction_js_1.MCRCMethod.tagName, boundary1, level1);
                        reactionDiv.appendChild(mcDiv);
                        let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.PreExponential.tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_preExponential[0]);
                                let value = new big_js_1.default(inputString);
                                let preExponentialAttributes = (0, xml_js_1.getAttributes)(xml_preExponential[0]);
                                let preExponential = new reaction_js_1.PreExponential(preExponentialAttributes, value);
                                mCRCMethod.setPreExponential(preExponential);
                                let label = reaction_js_1.PreExponential.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.PreExponential.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(preExponential, target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    preExponential.value = new big_js_1.default(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.PreExponential.tagName, reaction_js_1.PreExponential.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.ActivationEnergy.tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_activationEnergy[0]);
                                let value = new big_js_1.default(inputString);
                                let activationEnergyAttributes = (0, xml_js_1.getAttributes)(xml_activationEnergy[0]);
                                let activationEnergy = new reaction_js_1.ActivationEnergy(activationEnergyAttributes, value);
                                mCRCMethod.setActivationEnergy(activationEnergy);
                                let label = reaction_js_1.ActivationEnergy.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.ActivationEnergy.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(activationEnergy, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    activationEnergy.value = new big_js_1.default(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.ActivationEnergy.tagName, reaction_js_1.ActivationEnergy.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.TInfinity.tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_tInfinity[0]);
                                let value = new big_js_1.default(inputString);
                                let tInfinityAttributes = (0, xml_js_1.getAttributes)(xml_tInfinity[0]);
                                let tInfinity = new reaction_js_1.TInfinity(tInfinityAttributes, value);
                                mCRCMethod.setTInfinity(tInfinity);
                                let label = reaction_js_1.TInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.TInfinity.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(tInfinity, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    tInfinity.value = new big_js_1.default(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.TInfinity.tagName, reaction_js_1.TInfinity.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.NInfinity.tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_nInfinity[0]);
                                let value = new big_js_1.default(inputString);
                                let nInfinityAttributes = (0, xml_js_1.getAttributes)(xml_nInfinity[0]);
                                let nInfinity = new reaction_js_1.NInfinity(nInfinityAttributes, value);
                                mCRCMethod.setNInfinity(nInfinity);
                                let label = reaction_js_1.NInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.NInfinity.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                                    let target = event.target;
                                    setNumberNode(nInfinity, target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    nInfinity.value = new big_js_1.default(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.NInfinity.tagName, reaction_js_1.NInfinity.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                    }
                    else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                }
                else {
                    mCRCMethod = new reaction_js_1.MCRCMethod(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement('label');
                    mCRCMethodLabel.textContent = reaction_js_1.MCRCMethod.tagName + ": " + mCRCMethodAttributes.get("name");
                    Object.assign(mCRCMethodLabel.style, level1);
                    mCRCMethodDiv.appendChild(mCRCMethodLabel);
                    reactionDiv.appendChild(mCRCMethodDiv);
                }
                reaction.setMCRCMethod(mCRCMethod);
            }
        }
        // Load excessReactantConc
        let xml_excessReactantConc = xml_reactions[i].getElementsByTagName(reaction_js_1.ExcessReactantConc.tagName);
        if (xml_excessReactantConc.length > 0) {
            if (xml_excessReactantConc.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.ExcessReactantConc.tagName + " but finding " + xml_excessReactantConc.length + "!");
            }
            let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_excessReactantConc[0])));
            let excessReactantConc = new reaction_js_1.ExcessReactantConc((0, xml_js_1.getAttributes)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
            let id = reaction.id + "_" + reaction_js_1.ExcessReactantConc.tagName;
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level1, (event) => {
                let target = event.target;
                setNumberNode(excessReactantConc, target);
            }, value.toExponential(), reaction_js_1.ExcessReactantConc.tagName);
            reactionDiv.appendChild(inputDiv);
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
        let cDivID = (0, util_js_1.getID)(conditions_js_1.Conditions.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        let ccDivID = (0, util_js_1.getID)(cDivID, s_container);
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, conditionssDiv, null, cDiv, conditions_js_1.Conditions.tagName + " " + i.toString(), boundary1, level1);
        let conditions = addConditions((0, xml_js_1.getAttributes)(xml_conditions), i);
        handleBathGases(conditions, cDiv, i, xml_conditions);
        handlePTs(conditions, cDiv, i, xml_conditions);
        // Add a remove conditions button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the conditions.
            (0, html_js_1.remove)(ccDivID, ids);
        });
    }
    // Create an add button to add a conditions.
    createAddConditionsButton(conditionssDiv);
    return conditionssDiv;
}
/**
 * @param conditions The conditions.
 * @param conditionsDiv The conditions div.
 * @param conditionsIndex The conditions index.
 * @param xml_conditions The XML conditions.
 */
function handleBathGases(conditions, conditionsDiv, conditionsIndex, xml_conditions) {
    // Bath Gases
    // Create a collapsible div.
    let bsDivID = (0, util_js_1.getID)(conditions_js_1.Conditions.tagName, conditionsIndex.toString(), conditions_js_1.BathGas.tagName);
    let bsDiv = (0, html_js_1.createDiv)(bsDivID);
    let bscDivID = (0, util_js_1.getID)(bsDivID, s_container);
    let bscDiv = (0, html_js_1.getCollapsibleDiv)(bscDivID, conditionsDiv, null, bsDiv, conditions_js_1.BathGas.tagName, boundary1, level1);
    // Add add button.
    let addBathGasButton = (0, html_js_1.createButton)(s_Add_sy_add, undefined, level1);
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas = new conditions_js_1.BathGas(new Map(), s_selectOption);
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div = (0, html_js_1.createFlexDiv)(undefined, level1);
        let id = (0, util_js_1.getID)(bsDivID, bathGasIndex.toString());
        let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true, id);
        select.classList.add(conditions_js_1.BathGas.tagName);
        div.appendChild(select);
        addRemoveButton(div, boundary1, (bathGas) => {
            bsDiv.removeChild(div);
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
                console.log("bathGas" + bathGas.toString());
                let bathGasIndex = conditions.addBathGas(bathGas);
                let id = (0, util_js_1.getID)(bsDivID, bathGasIndex.toString());
                let div = (0, html_js_1.createFlexDiv)(id, level1);
                div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, false, id));
                addRemoveButton(div, boundary1, (bathGas) => {
                    bsDiv.removeChild(div);
                    conditions.removeBathGas(bathGas);
                });
                bsDiv.insertBefore(div, addBathGasButton);
            }
        }
        else {
            let id = (0, util_js_1.getID)(bsDivID, "0");
            let div = (0, html_js_1.createFlexDiv)((0, util_js_1.getID)(bsDivID, 0), level1);
            div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), undefined, false, id));
            addRemoveButton(div, boundary1, (bathGas) => {
                bsDiv.removeChild(div);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
    }
}
/**
 *
 * @param conditions
 * @param conditionsDiv
 * @param conditionsIndex
 * @param xml_conditions
 * @param level
 * @param nextLevel
 */
function handlePTs(conditions, conditionsDiv, conditionsIndex, xml_conditions) {
    // PTs
    let moleculeKeys = new Set(molecules.keys());
    // Create collapsible div.
    let pTsDivId = (0, util_js_1.getID)(conditionsDiv.id, conditionsIndex.toString(), conditions_js_1.PTs.tagName);
    let pTsDiv = (0, html_js_1.createDiv)(pTsDivId);
    let pTscDivId = (0, util_js_1.getID)(pTsDivId, s_container);
    let pTscDiv = (0, html_js_1.getCollapsibleDiv)(pTscDivId, conditionsDiv, null, pTsDiv, conditions_js_1.PTs.tagName, boundary1, level1);
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
                    console.log("pTpairAttributes=" + (0, util_js_1.mapToString)(pTpairAttributes));
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
                    pTsDiv.append(createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, conditionsIndex, i, moleculeKeys, level1));
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
        pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, conditionsIndex, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, html_js_1.createButton)(s_Add_from_spreadsheet, undefined, boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, html_js_1.createFlexDiv)(undefined, level1);
        let addFromSpreadsheetId = (0, util_js_1.getID)(conditions_js_1.PTs.tagName, "addFromSpreadsheet");
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
                    pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, conditionsIndex, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
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
        let cDivID = (0, util_js_1.getID)(conditions_js_1.Conditions.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        let ccDivID = (0, util_js_1.getID)(cDivID, s_container);
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
        handleBathGases(conditions, cDiv, i, null);
        handlePTs(conditions, cDiv, i, null);
        // Add a remove conditions button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the conditions.
            (0, html_js_1.remove)(ccDivID, ids);
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
function createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDivId, conditionsIndex, pTIndex, moleculeKeys, level) {
    let pTpairDiv = (0, html_js_1.createFlexDiv)(undefined, level);
    addPorT(pTpairDiv, conditions_js_1.PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits(mesmer_js_1.Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, conditions_js_1.PTpair.tagName, conditions_js_1.PTpair.tagName, boundary1, level1);
    addPorT(pTpairDiv, conditions_js_1.PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    let id = (0, util_js_1.getID)(conditionsDivId, conditions_js_1.PTpair.tagName, pTIndex.toString());
    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, getID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, conditionsIndex, pTIndex, conditions_js_1.PTpair.s_excessReactantConc, createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    addPercentExcessReactantConc(pTpairDiv, pTpair, conditionsIndex, pTIndex);
    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, getID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, conditionsIndex, pTIndex, conditions_js_1.PTpair.s_precision, createPrecisionSelectElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_precision, createPrecisionSelectElement,
    //    (pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // BathGas.
    //addButtonWithToggle(pTpairDiv, pTpair, BathGas.tagName, getID(id, BathGas.tagName),
    //    [pTpair, moleculeKeys, true], createBathGasSelectElement);
    addBathGas(pTpairDiv, pTpair, conditionsIndex, pTIndex, moleculeKeys);
    /*
    addAttribute(pTpairDiv, pTpair, pTIndex, BathGas.tagName, createBathGasSelectElement,
        (pTpair, attribute) => pTpair.getBathGas() !== undefined,  (pTpair, attribute) => pTpair.getBathGas(), moleculeKeys
    );
    */
    // ExperimentalRate.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalRate.tagName, getID(id, ExperimentalRate.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalRateDetails);
    //addExperimentalRate(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, conditions_js_1.ExperimentalRate.tagName, (pTpair) => pTpair.getExperimentalRate(), createExperimentalRateDetails);
    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, getID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, conditions_js_1.ExperimentalYield.tagName, (pTpair) => pTpair.getExperimentalYield(), createExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, getID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, conditions_js_1.ExperimentalYield.tagName, (pTpair) => pTpair.getExperimentalEigenvalue(), createExperimentalEigenvalueDetails);
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
 * @param conditionsIndex The conditions index.
 * @param pTIndex The pTindex.
 */
function addPercentExcessReactantConc(pTpairDiv, pTpair, conditionsIndex, pTIndex) {
    let id = (0, util_js_1.getID)(conditionsIndex.toString(), pTIndex.toString(), conditions_js_1.PTpair.s_percentExcessReactantConc);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.append(div);
    let attribute = conditions_js_1.PTpair.s_percentExcessReactantConc;
    let buttonTextContentSelected = attribute + sy_selected;
    let buttonTextContentDeselected = attribute + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), boundary1);
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
function addAttribute(pTpairDiv, pTpair, conditionsIndex, pTIndex, attribute, createInputElement) {
    let id = (0, util_js_1.getID)(conditionsIndex.toString(), pTIndex.toString(), attribute);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected = attribute + sy_selected;
    let buttonTextContentDeselected = attribute + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = (0, util_js_1.getID)(id, s_Input);
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
            (0, html_js_1.remove)(iid);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */
function addBathGas(pTpairDiv, pTpair, conditionsIndex, pTIndex, moleculeKeys) {
    let id = (0, util_js_1.getID)(conditionsIndex.toString(), pTIndex.toString(), conditions_js_1.BathGas.tagName);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.append(div);
    let tagName = conditions_js_1.BathGas.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = (0, util_js_1.getID)(id, s_Input);
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
            (0, html_js_1.remove)(iid);
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
function addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, tagName, getAttribute, createElement) {
    let id = (0, util_js_1.getID)(conditionsIndex.toString(), pTIndex.toString(), tagName);
    let div = (0, html_js_1.createDiv)(id, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, (0, util_js_1.getID)(id, html_js_1.s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = (0, util_js_1.getID)(id, s_Input);
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
            (0, html_js_1.remove)(iid);
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
    let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, first, id);
    select.id = id;
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
    let select = (0, html_js_1.createSelectElement)(options, conditions_js_1.BathGas.tagName, value, (0, util_js_1.getID)(id, s_Select), boundary1);
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
    let modelParametersDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    let xml_modelParameters = (0, xml_js_1.getSingularElement)(xml, modelParameters_js_1.ModelParameters.tagName);
    let modelParameters = new modelParameters_js_1.ModelParameters((0, xml_js_1.getAttributes)(xml_modelParameters));
    mesmer.setModelParameters(modelParameters);
    processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, control_js_1.AutomaticallySetMaxEne, modelParameters.setAutomaticallySetMaxEne, modelParameters.removeAutomaticallySetMaxEne);
    processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, modelParameters_js_1.EnergyAboveTheTopHill, modelParameters.setEnergyAboveTheTopHill, modelParameters.removeEnergyAboveTheTopHill);
    processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, modelParameters_js_1.MaxTemperature, modelParameters.setMaxTemperature, modelParameters.removeMaxTemperature);
    return modelParametersDiv;
}
/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */
function processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, html_js_1.createFlexDiv)(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName = modelParameters_js_1.GrainSize.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, html_js_1.createButton)(tagName, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let id = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_input";
    let ids = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_select";
    let gs;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = new big_js_1.default(valueString);
        gs = new modelParameters_js_1.GrainSize((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, mesmer_js_1.Mesmer.energyUnits);
        button.classList.toggle(s_optionOff);
    }
    else {
        valueString = "";
        gs = new modelParameters_js_1.GrainSize(new Map(), big0);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!modelParameters.index.has(modelParameters_js_1.GrainSize.tagName)) {
            createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, mesmer_js_1.Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        }
        else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            document.getElementById(id)?.remove();
            document.getElementById(ids)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * Process numerical modelParameters.
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, ModelParameterType, setModelParameter, removeModelParameter) {
    let div = (0, html_js_1.createFlexDiv)(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName = ModelParameterType.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, html_js_1.createButton)(tagName, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let id = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_input";
    let ids = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_select";
    let mp;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = new big_js_1.default(valueString);
        mp = new ModelParameterType((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
        button.classList.toggle(s_optionOff);
    }
    else {
        valueString = "";
        mp = new ModelParameterType(new Map(), big0);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the ModelParameter already exists
        if (!modelParameters.index.has(tagName)) {
            createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        }
        else {
            valueString = mp.value.toExponential();
            removeModelParameter();
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param element The element.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 * @param setElementMethod The method to set the element.
 * @param units The units.
 */
function createInputModelParameters(modelParameters, div, element, id, ids, valueString, setElementMethod, units) {
    setElementMethod.call(modelParameters, element);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(element, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits(units, element.attributes, div, ids, element.constructor.tagName, boundary1, level1);
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
        let xml_control = xml_controls[i];
        // Create a collapsible divfor the control.
        let cDivID = (0, util_js_1.getID)(control_js_1.Control.tagName, i.toString());
        let cDiv = (0, html_js_1.createDiv)(cDivID, boundary1);
        controlsDiv.appendChild(cDiv);
        let ccDivID = (0, util_js_1.getID)(cDivID, s_container);
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, controlsDiv, null, cDiv, control_js_1.Control.tagName + " " + i.toString(), boundary1, level1);
        let control = addControl((0, xml_js_1.getAttributes)(xml_control), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, i, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
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
        handleCalcMethod(control, cDiv, i, xml_control, level1);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, i, onOffControls, xml_control, level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, html_js_1.remove)(ccDivID, ids);
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
        let cDivID = (0, util_js_1.getID)(control_js_1.Control.tagName, i.toString());
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
        let ccDivID = (0, util_js_1.getID)(cDivID, s_container);
        let ccDiv = (0, html_js_1.getCollapsibleDiv)(ccDivID, controlsDiv, elementToInsertBefore, cDiv, control_js_1.Control.tagName + " " + i.toString(), boundary1, level1);
        // Add the control
        let control = addControl(new Map(), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, i, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
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
        handleCalcMethod(control, cDiv, i, null, level);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, i, onOffControls, null, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = addRemoveButton(cDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, html_js_1.remove)(ccDivID, ids);
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
 * @param controlDiv The control div.
 * @param index The index.
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */
function handleControl(control, controlDiv, index, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
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
        div = (0, html_js_1.createFlexDiv)(undefined, level);
        controlDiv.appendChild(div);
        div.appendChild(button);
        id = (0, util_js_1.getID)(control_js_1.Control.tagName, tagName, s_Input);
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
                (0, html_js_1.remove)(id);
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
 * @param controlDiv The control div.
 * @param i The index.
 * @param xml_control The xml control.
 * @param level The level.
 */
function handleCalcMethod(control, controlDiv, i, xml_control, level) {
    let div = (0, html_js_1.createFlexDiv)(undefined, level);
    controlDiv.appendChild(div);
    let tagName = control_js_1.CalcMethod.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = (0, util_js_1.getID)(control_js_1.Control.tagName, tagName, i.toString());
    let divCm = (0, html_js_1.createFlexDiv)(divCmId, boundary1);
    div.appendChild(divCm);
    let options = control_js_1.CalcMethod.options;
    let divCmDetailsId = (0, util_js_1.getID)(divCmId, "details");
    let divCmDetailsSelectId = (0, util_js_1.getID)(divCmDetailsId, "select");
    let cm;
    let first = true;
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
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
            (0, html_js_1.remove)(divCmDetailsId);
            (0, html_js_1.remove)(divCmDetailsSelectId);
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
                (0, html_js_1.remove)(divCmDetailsId);
                console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
                console.log("button.textContent " + button.textContent);
                (0, html_js_1.remove)(divCmDetailsSelectId);
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
 * @param controlDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */
function handleTestMicroRates(control, controlDiv, xml_control, level) {
    let div = (0, html_js_1.createFlexDiv)(undefined, level);
    controlDiv.appendChild(div);
    let tagName = control_js_1.TestMicroRates.tagName;
    let buttonTextContentSelected = tagName + sy_selected;
    let buttonTextContentDeselected = tagName + sy_deselected;
    let button = (0, html_js_1.createButton)(tagName, undefined, boundary1);
    button.id = control_js_1.Control.tagName + "_" + tagName;
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let idTmax = control_js_1.Control.tagName + "_" + tagName + "_Tmax";
    let idTmin = control_js_1.Control.tagName + "_" + tagName + "_Tmin";
    let idTstep = control_js_1.Control.tagName + "_" + tagName + "_Tstep";
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
        attributes.set("Tmax", "");
        attributes.set("Tmin", "");
        attributes.set("Tstep", "");
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
        processElement(xml, control_js_1.Format, cmar.setFormat.bind(cmar));
        processElement(xml, control_js_1.Precision, cmar.setPrecision.bind(cmar));
        processElement(xml, control_js_1.ChebNumTemp, cmar.setChebNumTemp.bind(cmar));
        processElement(xml, control_js_1.ChebNumConc, cmar.setChebNumConc.bind(cmar));
        processElement(xml, control_js_1.ChebMaxTemp, cmar.setChebMaxTemp.bind(cmar));
        processElement(xml, control_js_1.ChebMinTemp, cmar.setChebMinTemp.bind(cmar));
        processElement(xml, control_js_1.ChebMaxConc, cmar.setChebMaxConc.bind(cmar));
        processElement(xml, control_js_1.ChebMinConc, cmar.setChebMinConc.bind(cmar));
        processElement(xml, control_js_1.ChebTExSize, cmar.setChebTExSize.bind(cmar));
        processElement(xml, control_js_1.ChebPExSize, cmar.setChebPExSize.bind(cmar));
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
        throw new Error("Unknown xsi:type: " + xsi_type);
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
        let id = (0, util_js_1.getID)(divCmDetails.id, obj.tagName, "Input");
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
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("text", (0, util_js_1.getID)(divCmDetails.id, tagName, s_Input), boundary1, level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processNumberElement(control_js_1.SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), control_js_1.SensitivityAnalysisSamples.tagName);
    processNumberElement(control_js_1.SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), control_js_1.SensitivityAnalysisOrder.tagName);
    processNumberElement(control_js_1.SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), control_js_1.SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new control_js_1.SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName = control_js_1.SensitivityVarRedMethod.tagName;
    divCmDetails.appendChild((0, html_js_1.createLabelWithSelect)(tagName, control_js_1.SensitivityVarRedMethod.options, tagName, control_js_1.SensitivityVarRedMethod.options[0], (0, util_js_1.getID)(divCmDetails.id, tagName, 'select'), boundary1, boundary1));
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
                let energy = reaction.getReactantsEnergy(molecules);
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
                let energy = reaction.getProductsEnergy(molecules);
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
                            let ref = ts.getMolecule().ref;
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = molecules.get(ref)?.getEnergy() ?? big0;
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
                            let ref = ts.getMolecule().ref;
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = molecules.get(ref)?.getEnergy() ?? big0;
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
                    let transitionStateLabel = ts.getMolecule().ref;
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
 * Save to XML file.
 */
function saveXML() {
    if (mesmer == null) {
        alert("No Mesmer object to save.");
        return;
    }
    else {
        console.log("saveXML");
        const pad = "  ";
        // Create a Blob object from the data
        let blob = new Blob([mesmer_js_1.Mesmer.header, mesmer.toXML(pad, "")], { type: "text/plain" });
        // Create a new object URL for the blob
        let url = URL.createObjectURL(blob);
        // Create a new 'a' element
        let a = document.createElement("a");
        // Set the href and download attributes for the 'a' element
        a.href = url;
        let title = mesmer.getTitle()?.value;
        a.download = title.replace(/[^a-z0-9]/gi, '_') + ".xml";
        // Append the 'a' element to the body and click it to start the download
        document.body.appendChild(a);
        a.click();
        // Remove the 'a' element after the download starts
        document.body.removeChild(a);
    }
}
//# sourceMappingURL=app.js.map