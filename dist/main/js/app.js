"use strict";
//import { openDB } from 'idb';
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
let memser_a = document.createElement('a');
memser_a.href = mesmer_url;
memser_a.textContent = mesmer_url;
/**
 * 3DMol.
 */
let t3Dmol_url = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement('a');
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;
/**
 * The font sizes for different levels of the GUI.
 */
let fontSize1 = "1.5em";
let fontSize2 = "1.25em";
let fontSize3 = "1.0em";
let fontSize4 = "0.75em";
/**
 * Margins for spacing GUI components.
 */
//let margin0: string = "0px";
let margin1 = "1px";
let margin2 = "2px";
let margin3 = "3px";
let margin5 = "5px";
let margin25 = "25px";
let margin50 = "50px";
let margin75 = "75px";
let margin100 = "100px";
let margin125 = "125px";
let level0 = { marginTop: margin1, marginBottom: margin1 };
let level1 = { marginLeft: margin25, marginTop: margin1, marginBottom: margin1 };
let level2 = { marginLeft: margin50, marginTop: margin1, marginBottom: margin1 };
let level3 = { marginLeft: margin75, marginTop: margin1, marginBottom: margin1 };
let level4 = { marginLeft: margin100, marginTop: margin1, marginBottom: margin1 };
let level5 = { marginLeft: margin125, marginTop: margin1, marginBottom: margin1 };
let boundary1 = { marginLeft: margin1, marginTop: margin1, marginBottom: margin1, marginRight: margin1 };
let boundary3 = { marginLeft: margin3, marginTop: margin3, marginBottom: margin3, marginRight: margin3 };
/**
 * Symbology for the GUI.
 */
let addSymbol = "\uFF0B";
let addString = "add " + addSymbol;
let removeSymbol = "\u2715";
let removeString = "remove " + removeSymbol;
let s_Add_from_spreadsheet = "Add " + addSymbol + " from spreadsheet";
// Selected and deselected symbology.
let selected = " \u2713";
let deselected = " \u2717";
let selectAnotherOption = "Action/select another option...";
// HTML IDs
let menuDivId = 'menu';
let titleDivId = 'title';
let moleculesDivId = 'molecules';
let reactionsDivId = 'reactions';
let conditionsDivId = 'conditions';
let modelParametersDivId = 'modelParameters';
let controlDivId = 'control';
let xmlDivId = 'xml';
// Strings for the GUI.
let s_Input = "Input";
let s_optionOn = 'optionOn';
let s_optionOff = 'optionOff';
// For dark/light mode.
let dark;
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
 * A map of molecules with Molecule.id as key and Molecules as values.
 */
let molecules;
/**
 * For storing the maximum molecule energy in a reaction.
 */
let maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */
let minMoleculeEnergy = Infinity;
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
let rdDivId = addID("reactionsDiagram");
let rdCanvasId = addID("reactionsDiagramCanvas");
//let rd_canvas_width: number = 800;
let rdCanvasHeight = 400;
let rd_lw = 4;
let rd_lwc = 2;
let rd_font = "1em SensSerif";
let popWindow;
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
    let menuDiv = document.getElementById(menuDivId);
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
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 1) + 'px';
        if (popWindow != null) {
            //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
            popWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let s_Decrease_fontsize = 'Decrease fontsize';
    let decreaseFontSizeButton = (0, html_js_1.createButton)(s_Decrease_fontsize, (0, util_js_1.getID)(s_Decrease_fontsize), boundary1);
    decreaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize - 1) + 'px';
        if (popWindow != null) {
            //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
            popWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
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
    let welcomeDiv = (0, html_js_1.createDiv)((0, util_js_1.getID)("Welcome"), boundary1);
    // Create text for welcome.
    let p1 = document.createElement('p');
    welcomeDiv.appendChild(p1);
    p1.textContent = 'Welcome to MXG - a Graphical User Interface (GUI) program to assist MEMSER users in creating, editing \
        and visualising MESMER data. MESMER is the Master Equation Solver for Multi Energy-well Reactions, details can be found \
        at: ';
    p1.appendChild(memser_a);
    p1.style.alignContent = 'center';
    let p2 = document.createElement('p');
    welcomeDiv.appendChild(p2);
    p2.textContent = 'MXG development is funded by the UK Engineering and Physical Sciences Research Council (EPSRC) from January \
    to April 2024.';
    let p3 = document.createElement('p');
    welcomeDiv.appendChild(p3);
    p3.textContent = 'The menu Load button is to be used to select a MESMER file to load (the file loaded will not be modified). \
        MXG reads the file and presents the data it contains so that the user can make changes and use the Save button to generate \
        a new MESMER file. The saved file should have the same content as was loaded except it will contain no comments or blank \
        lines, values will be trimmed of white space, and some numbers may be output in a standard scientific notation if they were \
        not already. The saved file will also reflect any changes specified using the GUI.';
    let p4 = document.createElement('p');
    welcomeDiv.appendChild(p4);
    p4.textContent = 'Between the Load and Save buttons are buttons to increase or decrease the font size. In addition to changing the \
        text size of any text components, this will also redraw the reaction diagram so that the text rendered onto the canvas reflects \
        this change. It is planned to have themes selectable to provide a dark mode rendering and to support users that struggle to \
        distinguish between certain colours.';
    let p5 = document.createElement('p');
    p5.textContent += 'The development is in an alpha release phase and is not recommended for general use. A community release that \
        is to be supported by the MESMER community is scheduled for the end of April 2024. MXG is free and open source software based on \
        free and open source software. The main development GitHub repository is: ';
    p5.appendChild(mxg_a);
    welcomeDiv.appendChild(p5);
    let p6 = document.createElement('p');
    welcomeDiv.appendChild(p6);
    p6.textContent = 'MXG can be used online or installed locally as a Progressive Web App (PWA). A PWA is a type of application \
        software that should work on platforms with a standard-compliant Web browser. PWA installation varies by Web browser/device. \
        Some details to help with installation of the MXG PWA are in the GitHub Repository README.';
    let p7 = document.createElement('p');
    welcomeDiv.appendChild(p7);
    p7.textContent = 'The MESMER file loaded is expected to contain the following child elements of the parent "me:mesmer" \
        element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a \
        child element is missing or there are multiple "me:title", "moleculeList", "reactionList", "me:conditions", or \
        "me:modelParameters" elements, an Error is currently thrown. In the future, the loading and creation of files with \
        multiple "me:conditions" sections will be supported... If you do not have a MESMER file, then feel free to download and \
        use the examples: ';
    p7.appendChild(mxgDataExamples_a);
    document.body.appendChild(welcomeDiv);
    // Create div for instructions.
    let instructionsDiv = (0, html_js_1.createDiv)((0, util_js_1.getID)("Instructions"), boundary1);
    document.body.appendChild(instructionsDiv);
    let p8 = document.createElement('p');
    instructionsDiv.appendChild(p8);
    p8.textContent = 'Upon loading a MESMER file, an input containing the "me:title" value should appear along side a label. \
        The value can be changed using the input. The "me:title" value is used to compose the filename for data saved using \
        the Save button. Characters that are unsuitable for filenames will be replaced with the underscore character "_" in \
        the filename.';
    let p9 = document.createElement('p');
    instructionsDiv.appendChild(p9);
    p9.textContent = 'The "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" details \
        are presented below the "me:title" in a series of buttons. A canvas depicts a well diagram for the reactions. The \
        diagram redraws if an "me:ZPE" property value of a molecule a listed reaction are changed. Below all this is a text \
        representation of the file loaded.';
    let p10 = document.createElement('p');
    instructionsDiv.appendChild(p10);
    p10.textContent = 'The "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" buttons contain \
        a triangular symbol which indicate a collapsed (triangle orientated with a point down: ▼) or expanded (triangle with a point \
        up: ▲) state. Actioning these buttons will either expand or collapse content that should appear or be present below the button.';
    let p11 = document.createElement('p');
    instructionsDiv.appendChild(p11);
    p10.textContent = 'Rendering of molecules with coordinates is provded by 3DMol.js which incorporates code from GLmol, \
        Three.js, and jQuery and is licensed under a BSD-3-Clause license. For more details on 3DMol.js please visit the GitHub \
        repository: ';
    p10.appendChild(t3Dmol_a);
});
/**
 *  Redraw the reactions diagram.
 */
function redrawReactionsDiagram() {
    if (popWindow == null) {
        let rdCanvas = document.getElementById(rdCanvasId);
        drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    }
    else {
        let c = popWindow.document.getElementById(rdCanvasId);
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
    maxMoleculeEnergy = -Infinity;
    minMoleculeEnergy = Infinity;
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
        let titleDiv = document.getElementById(titleDivId);
        let lwiId = addID('titleDiv');
        // Create input element.
        let lwi = (0, html_js_1.createLabelWithInput)("text", addID(lwiId, "Input"), boundary1, level0, (event) => {
            let target = event.target;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            (0, html_js_1.resizeInputElement)(target);
        }, title, mesmer_js_1.Title.tagName, fontSize1);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }
    // Molecules.
    let moleculesDiv = document.getElementById(moleculesDivId);
    let moleculesListDivId = addID('moleculesList');
    // If the moleculesListDiv already exists, remove it.
    (0, html_js_1.remove)(moleculesListDivId, ids);
    let moleculeListDiv = processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: moleculesDiv,
        elementToInsertBefore: null,
        content: moleculeListDiv,
        buttonLabel: "Molecules",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: moleculeListDiv.id
    });
    mesmer.setMoleculeList(new mesmer_js_1.MoleculeList((0, xml_js_1.getAttributes)(moleculeListDiv), Array.from(molecules.values())));
    // Reactions.
    let reactionsDiv = document.getElementById(reactionsDivId);
    let reactionsListDivId = addID('reactionsList');
    // If the reactionsListDiv already exists, remove it.
    (0, html_js_1.remove)(reactionsListDivId, ids);
    let reactionsListDiv = processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: reactionsDiv,
        elementToInsertBefore: null,
        content: reactionsListDiv,
        buttonLabel: "Reactions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: reactionsListDiv.id
    });
    mesmer.setReactionList(new mesmer_js_1.ReactionList((0, xml_js_1.getAttributes)(reactionsDiv), Array.from(reactions.values())));
    // Add the reactions diagram canvas.
    // Destroy any existing reactions diagram.
    // Check for popWindow.
    if (popWindow != null) {
        popWindow.close();
        popWindow = null;
    }
    // If rdDiv already exists, remove it.
    (0, html_js_1.remove)(rdDivId);
    // Create a new rdDiv and append it.
    let rdDiv = (0, html_js_1.createDiv)(rdDivId, boundary1);
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = addID('popButtonDivId');
    //remove(popButtonDivId);
    let popButtonDiv = (0, html_js_1.createDiv)(popButtonDivId, boundary1);
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = addID("popButtonId");
    // If the popButton already exists, remove it.
    //remove(popButtonID);
    let popButton = (0, html_js_1.createButton)("Pop out diagram into a new window", popButtonID, boundary1);
    popButtonDiv.appendChild(popButton);
    // If the canvas already exists, remove it.
    //remove(rdCanvasId);
    let rdCanvas = document.createElement('canvas');
    rdCanvas.id = rdCanvasId;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdCanvasHeight;
    rdCanvas.style.border = "1px solid black";
    drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener('click', () => {
        if (popWindow == null) {
            let popWindowRDCanvas = document.createElement('canvas');
            popWindowRDCanvas.id = rdCanvasId;
            popWindow = window.open("", "Reactions Diagram", "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            popWindow.document.body.appendChild(popWindowRDCanvas);
            drawReactionDiagram(popWindowRDCanvas, dark, rd_font, rd_lw, rd_lwc);
            (0, html_js_1.remove)(rdCanvasId, ids);
            popButton.textContent = "Pop back reaction diagram";
        }
        else {
            rdCanvas = document.createElement('canvas');
            rdCanvas.id = rdCanvasId;
            rdDiv.appendChild(rdCanvas);
            drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
            popWindow.close();
            popWindow = null;
            popButton.textContent = "Pop out reaction diagram to a new window";
        }
    });
    // Conditions
    let conditionsDiv = document.getElementById(conditionsDivId);
    let conditionsListDivId = addID('conditionsList');
    // If the conditionsListDiv already exists, remove it.
    (0, html_js_1.remove)(conditionsListDivId);
    let conditionsListDiv = processConditions(xml);
    conditionsListDiv.id = conditionsListDivId;
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: conditionsListDiv,
        buttonLabel: "Conditions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: conditionsListDiv.id
    });
    // Model Parameters.
    let modelParametersDiv = document.getElementById(modelParametersDivId);
    let modelParametersListDivId = addID('modelParametersList');
    // If the modelParametersListDiv already exists, remove it.
    (0, html_js_1.remove)(modelParametersListDivId);
    let modelParametersListDiv = processModelParameters(xml);
    modelParametersListDiv.id = 'modelParametersList';
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: modelParametersDiv,
        elementToInsertBefore: null,
        content: modelParametersListDiv,
        buttonLabel: "Model Parameters",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: modelParametersListDiv.id
    });
    // Control.
    let controlDiv = document.getElementById(controlDivId);
    let controlsDivId = addID(controlDivId, 'controls');
    // If the controlsDiv already exists, remove it.
    (0, html_js_1.remove)(controlsDivId);
    let controlsDiv = processControl(xml);
    controlsDiv.id = controlsDivId;
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: controlDiv,
        elementToInsertBefore: null,
        content: controlsDiv,
        buttonLabel: "Controls",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: controlsDiv.id
    });
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
    let moleculeListDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    // Get the XML "moleculeList" element.
    let xml_moleculeList = (0, xml_js_1.getSingularElement)(xml, mesmer_js_1.MoleculeList.tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let moleculeListTagNames = new Set();
    xml_moleculeList.childNodes.forEach(function (node) {
        moleculeListTagNames.add(node.nodeName);
    });
    if (moleculeListTagNames.size != 1) {
        if (!(moleculeListTagNames.size == 2 && moleculeListTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            moleculeListTagNames.forEach(x => console.error(x));
            throw new Error("Additional tag names in moleculeList:");
        }
    }
    if (!moleculeListTagNames.has(molecule_js_1.Molecule.tagName)) {
        throw new Error("Expecting tags with \"" + molecule_js_1.Molecule.tagName + "\" tagName but there are none!");
    }
    // Process the XML "molecule" elements.
    let xml_molecules = xml_moleculeList.getElementsByTagName(molecule_js_1.Molecule.tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_molecules.length; i++) {
        let moleculeDiv = document.createElement("div");
        // Set attributes.
        let attributes = (0, xml_js_1.getAttributes)(xml_molecules[i]);
        // Get the molecule id.
        let moleculeId = attributes.get(molecule_js_1.Molecule.s_id);
        if (moleculeId == undefined) {
            throw new Error(molecule_js_1.Molecule.s_id + ' is undefined');
        }
        let moleculeTagNames = new Set();
        let cns = xml_molecules[i].childNodes;
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
        // Create molecule.
        let molecule = new molecule_js_1.Molecule(attributes, moleculeId);
        molecules.set(moleculeId, molecule);
        // Molecule characteristics.
        let moleculeHasCoordinates = false;
        // Init atoms.
        let atomArray = new molecule_js_1.AtomArray(new Map()); // This will be replaced if there is an AtomArray.
        // Function to be used to remove an atom.
        let removeAtom = (id) => molecule.getAtoms().removeAtom(id);
        // There can be an individual atom not in an atom array, or an atom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName(molecule_js_1.AtomArray.tagName);
        if (xml_atomArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.AtomArray.tagName + " but finding " + xml_atomArrays.length + "!");
        }
        // Create a new collapsible div for the AtomArray.
        let atomArrayDiv = document.createElement("div");
        let contentDivId = moleculeId + "_" + molecule_js_1.AtomArray.tagName;
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: moleculeDiv,
            elementToInsertBefore: null,
            content: atomArrayDiv,
            buttonLabel: molecule_js_1.AtomArray.tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms = xml_atomArray.getElementsByTagName(molecule_js_1.Atom.tagName);
            if (xml_atoms.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + molecule_js_1.AtomArray.tagName + ", but finding " + xml_atoms.length + "!");
            }
            atomArray = new molecule_js_1.AtomArray((0, xml_js_1.getAttributes)(xml_atomArray));
            molecule.setAtoms(atomArray);
            for (let j = 0; j < xml_atoms.length; j++) {
                // Create a new Atom.
                let atom = new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_atoms[j]));
                let atomId = atomArray.addAtom(atom);
                //console.log("atomId=" + atomId);
                // Add the atomDiv to the atomArrayDiv.
                let atomDiv = (0, html_js_1.createFlexDiv)(undefined, level3);
                atomArrayDiv.appendChild(atomDiv);
                let inputId = moleculeId + "_" + atomId;
                /**
                let atomIdlwi: HTMLDivElement = createLabelWithInput("text", inputId + "_" + Atom.s_id, boundary1, boundary1,
                    (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        let newAtomId: string = target.value;
                        if (atomArray.atoms.has(target.value)) {
                            console.warn("Atom with id " + target.value + " already exists!");
                            newAtomId = atomArray.getNextAtomID();
                        }
                        atom.setId(newAtomId);
                        atomArray.atoms.set(newAtomId, atom);
                        atomArray.index.set(newAtomId, atomArray.index.get(atomId) as number);
                        atomArray.index.delete(atomId);
                        console.log("The id has changed from " + atomId + " to " + newAtomId);
                        resizeInputElement(target);
                    }, atomId, Atom.s_id, fontSize3);
                atomDiv.appendChild(atomIdlwi);
                **/
                atomDiv.appendChild((0, html_js_1.createLabel)(molecule_js_1.Atom.s_id + " " + atomId, boundary1));
                // elementType.
                let elementType = atom.getElementType();
                let elementTypelwi = (0, html_js_1.createLabelWithInput)("text", inputId + "_" + molecule_js_1.Atom.s_elementType, boundary1, boundary1, (event) => {
                    let target = event.target;
                    atom.setElementType(target.value);
                    console.log("The elementType has changed from " + elementType + " to " + target.value);
                    (0, html_js_1.resizeInputElement)(target);
                }, elementType, molecule_js_1.Atom.s_elementType, fontSize3);
                atomDiv.appendChild(elementTypelwi);
                // Coordinates.
                moleculeHasCoordinates = processCoordinates(inputId, atom, atomDiv);
                addRemoveButton(atomDiv, boundary1, removeAtom, atomId);
            }
            moleculeTagNames.delete(molecule_js_1.AtomArray.tagName);
        }
        else {
            let xml_atoms = xml_molecules[i].getElementsByTagName(molecule_js_1.Atom.tagName);
            if (xml_atoms.length == 1) {
                atomArray = new molecule_js_1.AtomArray(new Map());
                atomArray.addAtom(new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_atoms[0])));
                molecule.setAtoms(atomArray);
            }
            else if (xml_atoms.length > 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Atom.tagName + " but finding " + xml_atoms.length + ". Should these be in an " + molecule_js_1.AtomArray.tagName + "?");
            }
        }
        // Create an add atom button.
        let addAtomButton = (0, html_js_1.createButton)(addString, undefined, level3);
        addAtomButton.style.fontSize = fontSize4;
        addAtomButton.addEventListener('click', () => {
            let attributes = new Map();
            attributes.set(molecule_js_1.Atom.s_elementType, "Please specify an " + molecule_js_1.Atom.s_elementType);
            let atom = new molecule_js_1.Atom(attributes);
            //let atomId: string = atomArray.addAtom(atom);
            let atomId = molecule.getAtoms().addAtom(atom);
            let atomDiv = (0, html_js_1.createFlexDiv)(undefined, level3);
            let inputId = moleculeId + "_" + atomId;
            atomDiv.appendChild((0, html_js_1.createLabel)(molecule_js_1.Atom.s_id + " " + atomId, boundary1));
            let elementType = atom.getElementType();
            let elementTypelwi = (0, html_js_1.createLabelWithInput)("text", inputId + "_" + molecule_js_1.Atom.s_elementType, boundary1, boundary1, (event) => {
                let target = event.target;
                atom.setElementType(target.value);
                console.log("The elementType has changed to " + target.value);
                (0, html_js_1.resizeInputElement)(target);
            }, elementType, molecule_js_1.Atom.s_elementType, fontSize3);
            atomDiv.appendChild(elementTypelwi);
            // Coordinates.
            moleculeHasCoordinates = processCoordinates(inputId, atom, atomDiv);
            addRemoveButton(atomDiv, boundary1, removeAtom, atomId);
            atomArrayDiv.insertBefore(atomDiv, addAtomButton);
        });
        atomArrayDiv.appendChild(addAtomButton);
        //console.log("atomsNode=" + atomsNode);
        moleculeTagNames.delete(molecule_js_1.Atom.tagName);
        // Init bondsNode.
        let bondArray = new molecule_js_1.BondArray(new Map()); // This will be replaced if there is an BondArray.
        // Function to be used to remove an bond.
        let removeBond = (id) => molecule.getBonds().removeBond(id);
        // There can be an individual bond not in a bond array, or a bond array.
        // There may be only 1 bond in a BondArray.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName(molecule_js_1.BondArray.tagName);
        // Create a new collapsible div for the BondArray.
        let bondArrayDiv = document.createElement("div");
        let bondArrayContentDivId = moleculeId + "_" + molecule_js_1.BondArray.tagName;
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: moleculeDiv,
            elementToInsertBefore: null,
            content: bondArrayDiv,
            buttonLabel: molecule_js_1.BondArray.tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: bondArrayContentDivId
        });
        if (xml_bondArrays.length > 0) {
            if (xml_bondArrays.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.BondArray.tagName + " but finding " + xml_bondArrays.length + "!");
            }
            let xml_bonds = xml_bondArrays[0].getElementsByTagName(molecule_js_1.Bond.tagName);
            bondArray = new molecule_js_1.BondArray((0, xml_js_1.getAttributes)(xml_bondArrays[0]));
            for (let j = 0; j < xml_bonds.length; j++) {
                // Create a new Bond.
                let bond = new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bonds[j]));
                let bondId = bondArray.addBond(bond);
                // Add the bondDiv to the bondArrayDiv.
                let bondDiv = (0, html_js_1.createFlexDiv)(undefined, level3);
                bondArrayDiv.appendChild(bondDiv);
                let inputId = moleculeId + "_" + bondId;
                bondDiv.appendChild((0, html_js_1.createLabel)(molecule_js_1.Bond.s_id + " " + bondId, boundary1));
                // atomRefs2.
                let atomRefs2 = bond.atomRefs2;
                let atomRefs2lwi = (0, html_js_1.createLabelWithInput)("text", inputId + "_" + molecule_js_1.Bond.s_atomRefs2, boundary1, boundary1, (event) => {
                    let target = event.target;
                    bond.setAtomRefs2(target.value);
                    console.log("The " + molecule_js_1.Bond.s_atomRefs2 + " has changed from " + atomRefs2 + " to " + target.value);
                    (0, html_js_1.resizeInputElement)(target);
                }, atomRefs2, molecule_js_1.Bond.s_atomRefs2, fontSize3);
                bondDiv.appendChild(atomRefs2lwi);
                // order.
                let orderId = inputId + "_" + molecule_js_1.Bond.s_order;
                processOrder(bond, bondDiv, orderId, molecule_js_1.Bond.s_order);
                addRemoveButton(bondDiv, boundary1, removeBond, bondId);
            }
            molecule.setBonds(bondArray);
            moleculeTagNames.delete(molecule_js_1.BondArray.tagName);
        }
        else {
            let xml_bonds = xml_molecules[i].getElementsByTagName(molecule_js_1.Bond.tagName);
            if (xml_bonds.length > 0) {
                if (xml_bonds.length > 1) {
                    throw new Error("Expecting 1 " + molecule_js_1.Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + molecule_js_1.BondArray.tagName + "?");
                }
                bondArray = new molecule_js_1.BondArray(new Map());
                bondArray.addBond(new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bonds[0])));
                molecule.setBonds(bondArray);
            }
        }
        moleculeTagNames.delete(molecule_js_1.Bond.tagName);
        // Add a 3Dmol.js viewer.
        // Create a new div for the viewer.
        if (moleculeHasCoordinates) {
            let viewerDiv = (0, html_js_1.createDiv)(undefined, level2);
            let viewerDivId = moleculeId + "_viewer";
            viewerDiv.id = viewerDivId;
            viewerDiv.className = "mol-container";
            moleculeDiv.appendChild(viewerDiv);
            let config = { backgroundColor: 'grey' };
            let viewer = $3Dmol.createViewer(viewerDiv, config);
            // Set the viewer style to stick and ball.
            viewer.setStyle({ stick: {} });
            // Create a 3Dmol viewer control to turn labels on and off.
            atomArray.atoms.forEach(function (atom) {
                let color = mesmer_js_1.Mesmer.atomColors.get(atom.getElementType()) || 'Purple';
                let am = mesmer_js_1.Mesmer.atomMasses.get(atom.getElementType()) || 1;
                let radius = mesmer_js_1.Mesmer.atomRadii.get(atom.getElementType()) || 1;
                //viewer.addSphere({ center: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() }, radius: 0.3 * am / 10.0, color: color });
                //viewer.addSphere({ center: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() }, radius: radius / 110.0, color: color });
                viewer.addSphere({ center: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() }, radius: (radius * (am ** (1 / 3.0))) / 275.0, color: color });
                //viewer.addLabel(atom.getElementType(), { position: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() } });
            });
            bondArray.bonds.forEach(function (bond) {
                let atomIds = bond.atomRefs2.split(" ");
                let atom1 = atomArray.getAtom(atomIds[0]);
                let atom2 = atomArray.getAtom(atomIds[1]);
                let order = bond.getOrder() || 1;
                let color = mesmer_js_1.Mesmer.bondColors.get(order) || 'Purple';
                viewer.addCylinder({ start: { x: atom1.getX3(), y: atom1.getY3(), z: atom1.getZ3() }, end: { x: atom2.getX3(), y: atom2.getY3(), z: atom2.getZ3() }, radius: 0.02 * order, color: color });
            });
            viewer.zoomTo();
            viewer.render();
            viewer.zoom(0.8, 2000);
        }
        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_PLs = xml_molecules[i].getElementsByTagName(molecule_js_1.PropertyList.tagName);
        if (xml_PLs.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.PropertyList.tagName + " but finding " + xml_PLs.length + "!");
        }
        if (xml_PLs.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + molecule_js_1.PropertyList.tagName + "_";
            (0, html_js_1.getCollapsibleDiv)({
                divToAddTo: moleculeDiv,
                elementToInsertBefore: null,
                content: plDiv,
                buttonLabel: molecule_js_1.PropertyList.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            // Create a new PropertyList.
            let pl = new molecule_js_1.PropertyList((0, xml_js_1.getAttributes)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName(molecule_js_1.Property.tagName);
            for (let j = 0; j < xml_Ps.length; j++) {
                // Create a new Property.
                let p = createProperty(xml_Ps[j], plDiv, molecule, boundary1, level3);
                pl.setProperty(p);
            }
            moleculeTagNames.delete(molecule_js_1.PropertyList.tagName);
        }
        else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName(molecule_js_1.Property.tagName);
            if (xml_Ps.length != 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Property.tagName + " but finding " + xml_Ps.length + ". Should these be in a " + molecule_js_1.PropertyList.tagName + "?");
            }
            // Create a new Property.
            let p = createProperty(xml_Ps[0], moleculeDiv, molecule, boundary1, level2);
            molecule.setProperties(p);
            moleculeTagNames.delete(molecule_js_1.Property.tagName);
        }
        // Organise EnergyTransferModel.
        let xml_ETMs = xml_molecules[i].getElementsByTagName(molecule_js_1.EnergyTransferModel.tagName);
        if (xml_ETMs.length > 0) {
            if (xml_ETMs.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.EnergyTransferModel.tagName + " but finding " + xml_ETMs.length + "!");
            }
            let etm = new molecule_js_1.EnergyTransferModel((0, xml_js_1.getAttributes)(xml_ETMs[0]));
            processEnergyTransferModel(etm, molecule, xml_ETMs[0], moleculeDiv, margin75);
            moleculeTagNames.delete(molecule_js_1.EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_DOSCMethod = xml_molecules[i].getElementsByTagName(molecule_js_1.DOSCMethod.tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.DOSCMethod.tagName + " but finding " + xml_DOSCMethod.length + "!");
            }
            let dOSCMethod = new molecule_js_1.DOSCMethod((0, xml_js_1.getAttributes)(xml_DOSCMethod[0]));
            moleculeDiv.appendChild((0, html_js_1.createLabelWithSelect)(molecule_js_1.DOSCMethod.tagName, molecule_js_1.DOSCMethod.xsi_typeOptions, molecule_js_1.DOSCMethod.tagName, dOSCMethod.getXsiType(), molecule.id, boundary1, level2));
            moleculeTagNames.delete(molecule_js_1.DOSCMethod.tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName(molecule_js_1.ExtraDOSCMethod.tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            }
            let extraDOSCMethod = new molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + molecule_js_1.ExtraDOSCMethod.tagName + "_";
            (0, html_js_1.getCollapsibleDiv)({
                divToAddTo: moleculeDiv,
                elementToInsertBefore: null,
                content: extraDOSCMethodDiv,
                buttonLabel: molecule_js_1.ExtraDOSCMethod.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            // Read bondRef.
            let xml_bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName(molecule_js_1.BondRef.tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                }
                let bondIds = molecule.getBonds().getBondIds();
                let bondRef = new molecule_js_1.BondRef((0, xml_js_1.getAttributes)(xml_bondRefs[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bondRefs[0])));
                extraDOSCMethodDiv.appendChild((0, html_js_1.createLabelWithSelect)(molecule_js_1.BondRef.tagName, bondIds, molecule_js_1.BondRef.tagName, bondRef.value, molecule.id, boundary1, level3));
            }
            // Read hinderedRotorPotential.
            let xml_hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName(molecule_js_1.HinderedRotorPotential.tagName);
            if (xml_hinderedRotorPotentials.length > 0) {
                if (xml_hinderedRotorPotentials.length != 1) {
                    throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hinderedRotorPotentials.length);
                }
                let hinderedRotorPotentialAttributes = (0, xml_js_1.getAttributes)(xml_hinderedRotorPotentials[0]);
                let hinderedRotorPotential = new molecule_js_1.HinderedRotorPotential(hinderedRotorPotentialAttributes);
                // Create a new collapsible div for the HinderedRotorPotential.
                let hinderedRotorPotentialDiv = (0, html_js_1.createFlexDiv)(undefined, level4);
                let contentDivId = molecule.id + "_" + molecule_js_1.DOSCMethod.tagName + "_" + molecule_js_1.HinderedRotorPotential.tagName;
                (0, html_js_1.getCollapsibleDiv)({
                    divToAddTo: extraDOSCMethodDiv,
                    elementToInsertBefore: null,
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: molecule_js_1.HinderedRotorPotential.tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level3,
                    contentDivId: contentDivId
                });
                // Format.
                hinderedRotorPotentialDiv.appendChild((0, html_js_1.createLabelWithSelect)(molecule_js_1.HinderedRotorPotential.s_format, molecule_js_1.HinderedRotorPotential.formats, molecule_js_1.HinderedRotorPotential.tagName, hinderedRotorPotential.getFormat(), contentDivId, boundary1, boundary1));
                // Units.
                addAnyUnits(mesmer_js_1.Mesmer.energyUnits, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, contentDivId, molecule_js_1.HinderedRotorPotential.tagName, boundary1);
                // ExpansionSize.
                hinderedRotorPotentialDiv.appendChild((0, html_js_1.createLabelWithInput)("number", contentDivId + "_" + molecule_js_1.HinderedRotorPotential.s_expansionSize, boundary1, boundary1, (event) => {
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, util_js_1.isNumeric)(target.value)) {
                        hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                    }
                    else {
                        // Reset the input to the current value.
                        alert(molecule_js_1.HinderedRotorPotential.s_expansionSize + " input is not a number, resetting...");
                        target.value = hinderedRotorPotential.getExpansionSize().toExponential();
                    }
                    (0, html_js_1.resizeInputElement)(target);
                }, hinderedRotorPotential.getExpansionSize().toExponential(), molecule_js_1.HinderedRotorPotential.s_expansionSize));
                // Add useSineTerms.
                let useSineTermsLabel = (0, html_js_1.createLabel)("Use sine terms:", boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId = (0, util_js_1.getID)(molecule.id, molecule_js_1.DOSCMethod.tagName, molecule_js_1.HinderedRotorPotential.tagName, molecule_js_1.HinderedRotorPotential.s_useSineTerms);
                let useSineTermsInput = (0, html_js_1.createInput)("checkbox", useSineTermsInputId, boundary1);
                useSineTermsInput.checked = hinderedRotorPotential.getUseSineTerms();
                useSineTermsInput.addEventListener('change', (event) => {
                    let target = event.target;
                    hinderedRotorPotential.setUseSineTerms(target.checked);
                });
                hinderedRotorPotentialDiv.appendChild(useSineTermsInput);
                // Load PotentialPoints.
                // Create a new collapsible div for the potential points.
                let potentialPointsDiv = document.createElement("div");
                let potentialPointContentDivId = molecule.id + "_" + molecule_js_1.DOSCMethod.tagName + "_" + molecule_js_1.HinderedRotorPotential.tagName + "_" + molecule_js_1.PotentialPoint.tagName;
                let potentialPointCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                    divToAddTo: hinderedRotorPotentialDiv,
                    elementToInsertBefore: null,
                    content: potentialPointsDiv,
                    buttonLabel: molecule_js_1.PotentialPoint.tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level4,
                    contentDivId: potentialPointContentDivId
                });
                hinderedRotorPotentialDiv.appendChild(potentialPointCollapsibleDiv);
                let potentialPoints = [];
                let xml_potentialPoints = xml_hinderedRotorPotentials[0].getElementsByTagName(molecule_js_1.PotentialPoint.tagName);
                for (let k = 0; k < xml_potentialPoints.length; k++) {
                    let potentialPoint = new molecule_js_1.PotentialPoint((0, xml_js_1.getAttributes)(xml_potentialPoints[k]));
                    potentialPoints.push(potentialPoint);
                    let potentialPointDiv = (0, html_js_1.createFlexDiv)(undefined, level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel = (0, html_js_1.createLabel)("Angle:", boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId = molecule.id + "_" + molecule_js_1.PotentialPoint.tagName + "_angle";
                    let angleInputElement = (0, html_js_1.createInput)("number", angleInputElementId, boundary1);
                    angleInputElement.addEventListener('change', (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, util_js_1.isNumeric)(target.value)) {
                            let value = parseFloat(target.value);
                            potentialPoint.setAngle(value);
                        }
                        else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            angleInputElement.value = potentialPoint.getAngle().toExponential();
                        }
                        (0, html_js_1.resizeInputElement)(angleInputElement);
                    });
                    angleInputElement.value = potentialPoint.getAngle().toExponential();
                    (0, html_js_1.resizeInputElement)(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, html_js_1.createLabel)("Potential:", boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = molecule.id + "_" + molecule_js_1.PotentialPoint.tagName + "_potential";
                    let potentialInputElement = (0, html_js_1.createInput)("number", potentialInputElementId, boundary1);
                    potentialInputElement.addEventListener('change', (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, util_js_1.isNumeric)(target.value)) {
                            let value = parseFloat(target.value);
                            potentialPoint.setPotential(value);
                            console.log("Set " + molecule_js_1.PotentialPoint.tagName + " to " + value.toExponential());
                        }
                        else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = potentialPoint.getPotential().toExponential();
                        }
                        (0, html_js_1.resizeInputElement)(potentialInputElement);
                    });
                    potentialInputElement.value = potentialPoint.getPotential().toExponential();
                    (0, html_js_1.resizeInputElement)(potentialInputElement);
                    potentialPointDiv.appendChild(potentialInputElement);
                    potentialPointsDiv.appendChild(potentialPointDiv);
                }
                potentialPointCollapsibleDiv.appendChild(potentialPointsDiv);
                hinderedRotorPotential.setPotentialPoints(potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }
            // Read periodicities.
            let xml_periodicities = xml_DOSCMethod[0].getElementsByTagName(molecule_js_1.Periodicity.tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_periodicities[0]));
                let periodicity = new molecule_js_1.Periodicity((0, xml_js_1.getAttributes)(xml_periodicities[0]), parseFloat(valueString));
                extraDOSCMethod.setPeriodicity(periodicity);
                let inputDiv = (0, html_js_1.createLabelWithInput)("number", molecule.id + "_" + molecule_js_1.Periodicity.tagName, boundary1, level3, (event) => {
                    let target = event.target;
                    valueString = target.value;
                    if ((0, util_js_1.isNumeric)(valueString)) {
                        let value = parseFloat(valueString);
                        periodicity.value = value;
                        extraDOSCMethod.getPeriodicity().value = value;
                        console.log("Set " + molecule_js_1.Periodicity.tagName + " to " + value);
                    }
                    else {
                        // Reset the input to the current value.
                        alert("Periodicity input is not a number, resetting...");
                        target.value = periodicity.value.toExponential();
                    }
                }, valueString, molecule_js_1.Periodicity.tagName);
                extraDOSCMethodDiv.appendChild(inputDiv);
            }
            molecule.setExtraDOSCMethod(extraDOSCMethod);
            moleculeTagNames.delete(molecule_js_1.ExtraDOSCMethod.tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete(molecule_js_1.ReservoirSize.tagName);
        let xml_ReservoirSize = xml_molecules[i].getElementsByTagName(molecule_js_1.ReservoirSize.tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            }
            let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ReservoirSize[0]));
            let value = parseFloat(valueString);
            let reservoirSizeAttributes = (0, xml_js_1.getAttributes)(xml_ReservoirSize[0]);
            let reservoirSize = new molecule_js_1.ReservoirSize(reservoirSizeAttributes, value);
            molecule.setReservoirSize(reservoirSize);
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", molecule.id + "_" + molecule_js_1.ReservoirSize.tagName, boundary1, level2, (event) => {
                let target = event.target;
                reservoirSize.value = parseFloat(target.value);
                (0, html_js_1.resizeInputElement)(target);
            }, valueString, molecule_js_1.ReservoirSize.tagName);
            moleculeDiv.appendChild(inputDiv);
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
        molstarDiv.id = molecule.id + "_molstar";
        moleculeDiv.appendChild(molstarDiv);
        // Create a new collapsible div for the molecule.
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: moleculeListDiv,
            elementToInsertBefore: null,
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: molecule.tagName + "_" + molecule.id
        });
    }
    return moleculeListDiv;
}
/**
 * @param xml The xml element.
 * @param div The div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(xml, div, molecule, boundary, level) {
    let p = new molecule_js_1.Property((0, xml_js_1.getAttributes)(xml));
    if (p.dictRef == molecule_js_1.ZPE.dictRef) {
        processProperty(p, mesmer_js_1.Mesmer.energyUnits, molecule, xml, div, boundary, level);
    }
    else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
        processProperty(p, mesmer_js_1.Mesmer.frequencyUnits, molecule, xml, div, boundary, level);
    }
    else {
        processProperty(p, undefined, molecule, xml, div, boundary, level);
    }
    return p;
}
/**
 * Process atom coordinates.
 * @param inputId The input id.
 * @param atom The atom.
 * @param atomDiv The atom div.
 */
function processCoordinates(inputId, atom, atomDiv) {
    let x3id = inputId + "_" + molecule_js_1.Atom.s_x3;
    processCoordinate(atom, atomDiv, x3id, molecule_js_1.Atom.s_x3, atom.getX3.bind(atom), atom.setX3.bind(atom));
    let y3id = inputId + "_" + molecule_js_1.Atom.s_y3;
    processCoordinate(atom, atomDiv, y3id, molecule_js_1.Atom.s_y3, atom.getY3.bind(atom), atom.setY3.bind(atom));
    let z3id = inputId + "_" + molecule_js_1.Atom.s_z3;
    processCoordinate(atom, atomDiv, z3id, molecule_js_1.Atom.s_z3, atom.getZ3.bind(atom), atom.setZ3.bind(atom));
    // If the atom has coordinates, set moleculeHasCoordinates to true.
    if (atom.hasCoordinates()) {
        return true;
    }
    return false;
}
/**
 * Process a coordinate.
 * @param atom The atom.
 * @param atomDiv The atom div.
 * @param id The id for the coordinate.
 * @param coordinate The coordinate name.
 * @param getter The getter function to call on the atom.
 * @param setter The setter function to call on the atom.
 * @param logMessage The message to log when the value changes.
 */
function processCoordinate(atom, atomDiv, id, coordinate, getter, setter) {
    let div = (0, html_js_1.createFlexDiv)(undefined, boundary1);
    atomDiv.appendChild(div);
    let buttonTextContentSelected = coordinate + selected;
    let buttonTextContentDeselected = coordinate + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addCoordinate(div, atom, id + "_input", value, setter, coordinate, boundary1);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the AtomArray already exists
        if (document.getElementById(id) == null) {
            addCoordinate(div, atom, id, NaN, setter, coordinate, boundary1);
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
 * @param atom The atom.
 * @param id The id.
 * @param value The coordinate value.
 * @param setter The setter function to call on the atom.
 * @param coordinate The coordinate name.
 * @param boundary The boundary.
 * @param level The level.
 */
function addCoordinate(div, atom, id, value, setter, coordinate, boundary) {
    let valueString = (value || NaN).toExponential();
    let input = (0, html_js_1.createInput)("text", id, boundary);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setter(parseFloat(target.value));
        console.log(coordinate + " has changed from " + value + " to " + target.value);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
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
    let button = (0, html_js_1.createButton)(removeString, undefined, margin);
    div.appendChild(button);
    button.style.fontSize = fontSize4;
    button.addEventListener('click', () => {
        removeFunction(...args);
        div.remove();
    });
    return button;
}
/**
 * Process an order.
 * @param bond The bond.
 * @param bondDiv The bond div.
 * @param orderId The order id.
 * @param order The order name.
 */
function processOrder(bond, bondDiv, orderId, order) {
    let div = (0, html_js_1.createFlexDiv)(undefined, boundary1);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = order + selected;
    let buttonTextContentDeselected = order + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    else {
        addOrder(div, bond, orderId, value, boundary1);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the AtomArray already exists
        if (document.getElementById(orderId) == null) {
            addOrder(div, bond, orderId, NaN, boundary1);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove any existing div.
            document.getElementById(orderId)?.remove();
            console.log("Removed " + orderId);
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
    let valueString = (value || NaN).toExponential();
    let input = (0, html_js_1.createInput)("text", id + "_input", boundary);
    input.addEventListener('change', (event) => {
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log("Bond order changed from " + value + " to " + target.value);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    input.id = id;
    div.appendChild(input);
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById(xmlDivId);
    // xmlHeading
    let xmlHeadingId = "xmlHeading";
    (0, html_js_1.remove)(xmlHeadingId, ids);
    let xmlHeading = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId = "xmlParagraph";
    (0, html_js_1.remove)(xmlParagraphId, ids);
    let xmlPre = document.createElement("pre");
    xmlPre.textContent = xml;
    xmlDiv.appendChild(xmlPre);
}
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param div The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */
function processProperty(p, units, molecule, element, div, boundary, level) {
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName(molecule_js_1.PropertyScalar.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + molecule_js_1.PropertyScalar.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString = (0, xml_js_1.getInputString)(scalarNodes[0]);
        let value = parseFloat(inputString);
        let psAttributes = (0, xml_js_1.getAttributes)(scalarNodes[0]);
        let ps = new molecule_js_1.PropertyScalar(psAttributes, value);
        p.setProperty(ps);
        let label = p.dictRef;
        // Create a new div element for the input.
        let inputDiv = (0, html_js_1.createLabelWithInput)("number", molecule.id + "_" + p.dictRef, boundary1, level, (event) => {
            let target = event.target;
            setNumberNode(ps, target);
        }, inputString, label);
        let inputElement = inputDiv.querySelector('input');
        //inputElement.value = inputString;
        (0, html_js_1.resizeInputElement)(inputElement);
        inputElement.addEventListener('change', (event) => {
            let target = event.target;
            inputString = target.value;
            ps = p.getProperty();
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            (0, html_js_1.resizeInputElement)(inputElement);
            if (p.dictRef == molecule_js_1.ZPE.dictRef) {
                // Update the min and max molecule energy.
                if (value < minMoleculeEnergy) {
                    minMoleculeEnergy = value;
                }
                if (value > maxMoleculeEnergy) {
                    maxMoleculeEnergy = value;
                }
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        });
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
        div.appendChild(inputDiv);
    }
    else {
        // PropertyArray.
        let arrayNodes = element.getElementsByTagName(molecule_js_1.PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + molecule_js_1.PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString = (0, xml_js_1.getInputString)(arrayNodes[0]);
            let values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
            let paAttributes = (0, xml_js_1.getAttributes)(arrayNodes[0]);
            let pa = new molecule_js_1.PropertyArray(paAttributes, values);
            p.setProperty(pa);
            let label = p.dictRef;
            // Create a new div element for the input.
            let inputDiv = (0, html_js_1.createLabelWithInput)("text", molecule.id + "_" + p.dictRef, boundary, level, (event) => {
                let target = event.target;
                setNumberArrayNode(pa, target);
            }, inputString, label);
            let inputElement = inputDiv.querySelector('input');
            inputElement.value = inputString;
            (0, html_js_1.resizeInputElement)(inputElement);
            inputElement.addEventListener('change', (event) => {
                let target = event.target;
                inputString = target.value;
                pa = p.getProperty();
                values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                (0, html_js_1.resizeInputElement)(inputElement);
            });
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
            div.appendChild(inputDiv);
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
                let inputDiv = (0, html_js_1.createLabelWithInput)("text", molecule.id + "_" + p.dictRef, boundary, level, (event) => {
                    let target = event.target;
                    setNumberArrayNode(pm, target);
                }, inputString, label);
                let inputElement = inputDiv.querySelector('input');
                inputElement.value = inputString;
                (0, html_js_1.resizeInputElement)(inputElement);
                inputElement.addEventListener('change', (event) => {
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                    (0, html_js_1.resizeInputElement)(inputElement);
                });
                addAnyUnits(units, pmAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
                div.appendChild(inputDiv);
            }
            else {
                throw new Error("Expecting " + molecule_js_1.PropertyScalar.tagName + ", " + molecule_js_1.PropertyArray.tagName + " or "
                    + molecule_js_1.PropertyMatrix.tagName + " but finding none!");
            }
        }
    }
}
/**
 * If there are a choice of units, then add a new select element to display/select them.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param inputDiv The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 */
function addAnyUnits(units, attributes, inputDiv, id, tagOrDictRef, boundary) {
    if (units != undefined) {
        let lws = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef);
        if (lws != undefined) {
            inputDiv.appendChild(lws);
        }
    }
    else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, html_js_1.createLabel)("units " + attributesUnits, boundary);
            inputDiv.appendChild(label);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */
function getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws = (0, html_js_1.createLabelWithSelect)("units", units, "units", psUnits, id, boundary1, boundary1);
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
function processEnergyTransferModel(etm, molecule, element, moleculeDiv, margin) {
    let xml_deltaEDowns = element.getElementsByTagName(molecule_js_1.DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmDiv = document.createElement("div");
        let contentDivId = molecule.id + "_" + molecule_js_1.EnergyTransferModel.tagName;
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: moleculeDiv,
            elementToInsertBefore: null,
            content: etmDiv,
            buttonLabel: molecule_js_1.EnergyTransferModel.tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        let deltaEDowns = [];
        for (let k = 0; k < xml_deltaEDowns.length; k++) {
            let inputString = (0, xml_js_1.getInputString)(xml_deltaEDowns[k]);
            let value = parseFloat(inputString);
            let deltaEDownAttributes = (0, xml_js_1.getAttributes)(xml_deltaEDowns[k]);
            let deltaEDown = new molecule_js_1.DeltaEDown(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = molecule_js_1.DeltaEDown.tagName;
            // Create a new div element for the input.
            let id = molecule.id + "_" + molecule_js_1.EnergyTransferModel.tagName + "_" + molecule_js_1.DeltaEDown.tagName + "_" + k;
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level3, (event) => {
                let target = event.target;
                setNumberNode(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
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
 * @param input The input element.
 */
function setNumberArrayNode(node, input) {
    let inputString = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        input.value = (0, util_js_2.arrayToString)(node.values, " ");
        return;
    }
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function (value) {
        if (!(0, util_js_1.isNumeric)(value)) {
            success = false;
        }
        values.push(parseFloat(value));
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        input.value = (0, util_js_2.arrayToString)(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        console.log("Changed " + node.tagName + " from: \"" + inputString + "\" to: \"" + (0, util_js_2.arrayToString)(node.values, " ") + "\"");
        //console.log("molecule=" + molecule);
    }
    else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        input.value = (0, util_js_2.arrayToString)(node.values, " ");
    }
}
exports.setNumberArrayNode = setNumberArrayNode;
//(window as any).setNumberArrayNode = setNumberArrayNode;
/**
 * Set a molecule number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */
function setNumberNode(node, input) {
    if ((0, util_js_1.isNumeric)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log(node.tagName + " value set to " + inputNumber);
    }
    else {
        alert("Value is not numeric, resetting...");
        input.value = node.value.toExponential();
    }
}
exports.setNumberNode = setNumberNode;
//(window as any).set = setNumberNode;
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
        let reactionDiv = (0, html_js_1.createDiv)(undefined, boundary1);
        // Set attributes.
        let reactionAttributes = (0, xml_js_1.getAttributes)(xml_reactions[i]);
        let reactionTagNames = new Set();
        let cns = xml_reactions[i].childNodes;
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
        // Create reaction.
        let reaction = new reaction_js_1.Reaction(reactionAttributes);
        reactions.set(reaction.id, reaction);
        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants = xml_reactions[i].getElementsByTagName(reaction_js_1.Reactant.tagName);
        reactionTagNames.delete(reaction_js_1.Reactant.tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new div for the reactants.
            let reactantsDiv = document.createElement("div");
            let reactants = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_reactants[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let reactant = new reaction_js_1.Reactant((0, xml_js_1.getAttributes)(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.ref + " role", reaction_js_1.Reactant.roleOptions, "Role", molecule.role, molecule.ref, boundary1, level3);
                lws.querySelector('select')?.addEventListener('change', (event) => {
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, html_js_1.resizeSelectElement)(target);
                });
                reactantsDiv.appendChild(lws);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let contentDivId = reaction.id + "_" + reaction_js_1.Reactant.tagName;
            (0, html_js_1.getCollapsibleDiv)({
                divToAddTo: reactionDiv,
                elementToInsertBefore: null,
                content: reactantsDiv,
                buttonLabel: "Reactants",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
        }
        // Load products.
        let xml_products = xml_reactions[i].getElementsByTagName(reaction_js_1.Product.tagName);
        reactionTagNames.delete(reaction_js_1.Product.tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            let productsDiv = document.createElement("div");
            let products = [];
            for (let j = 0; j < xml_products.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_products[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let product = new reaction_js_1.Product((0, xml_js_1.getAttributes)(xml_products[j]), molecule);
                products.push(product);
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.ref + " role", reaction_js_1.Product.roleOptions, molecule.role, molecule.ref, "Role", boundary1, level3);
                let select = lws.querySelector('select');
                select.value = molecule.role;
                select.addEventListener('change', (event) => {
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, html_js_1.resizeSelectElement)(target);
                });
                (0, html_js_1.resizeSelectElement)(select);
                productsDiv.appendChild(lws);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId = reaction.id + "_" + reaction_js_1.Product.tagName;
            (0, html_js_1.getCollapsibleDiv)({
                divToAddTo: reactionDiv,
                elementToInsertBefore: null,
                content: productsDiv,
                buttonLabel: "Products",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
        }
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(reaction_js_1.Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling = new reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws = (0, html_js_1.createLabelWithSelect)(reaction_js_1.Tunneling.tagName, reaction_js_1.Tunneling.options, "Tunneling", tunneling.getName(), reaction.id, boundary1, level3);
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
            let transitionStatesDiv = document.createElement("div");
            let transitionStates = [];
            for (let j = 0; j < xml_transitionStates.length; j++) {
                let xml_molecule = (0, xml_js_1.getFirstElement)(xml_transitionStates[j], molecule_js_1.Molecule.tagName);
                let molecule = new reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                let transitionState = new reaction_js_1.TransitionState((0, xml_js_1.getAttributes)(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label = (0, html_js_1.createLabel)(molecule.ref + " role: transitionState", level3);
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let contentDivId = reaction.id + "_" + reaction_js_1.TransitionState.tagName;
            (0, html_js_1.getCollapsibleDiv)({
                divToAddTo: reactionDiv,
                elementToInsertBefore: null,
                content: transitionStatesDiv,
                buttonLabel: "Transition States",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
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
                        let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.PreExponential.tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_preExponential[0]);
                                let value = parseFloat(inputString);
                                let preExponentialAttributes = (0, xml_js_1.getAttributes)(xml_preExponential[0]);
                                let preExponential = new reaction_js_1.PreExponential(preExponentialAttributes, value);
                                mCRCMethod.setPreExponential(preExponential);
                                let label = reaction_js_1.PreExponential.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.PreExponential.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level3, (event) => {
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
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.PreExponential.tagName, reaction_js_1.PreExponential.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.ActivationEnergy.tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_activationEnergy[0]);
                                let value = parseFloat(inputString);
                                let activationEnergyAttributes = (0, xml_js_1.getAttributes)(xml_activationEnergy[0]);
                                let activationEnergy = new reaction_js_1.ActivationEnergy(activationEnergyAttributes, value);
                                mCRCMethod.setActivationEnergy(activationEnergy);
                                let label = reaction_js_1.ActivationEnergy.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.ActivationEnergy.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level3, (event) => {
                                    let target = event.target;
                                    setNumberNode(activationEnergy, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.ActivationEnergy.tagName, reaction_js_1.ActivationEnergy.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.TInfinity.tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_tInfinity[0]);
                                let value = parseFloat(inputString);
                                let tInfinityAttributes = (0, xml_js_1.getAttributes)(xml_tInfinity[0]);
                                let tInfinity = new reaction_js_1.TInfinity(tInfinityAttributes, value);
                                mCRCMethod.setTInfinity(tInfinity);
                                let label = reaction_js_1.TInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.TInfinity.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level3, (event) => {
                                    let target = event.target;
                                    setNumberNode(tInfinity, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.TInfinity.tagName, reaction_js_1.TInfinity.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.NInfinity.tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_nInfinity[0]);
                                let value = parseFloat(inputString);
                                let nInfinityAttributes = (0, xml_js_1.getAttributes)(xml_nInfinity[0]);
                                let nInfinity = new reaction_js_1.NInfinity(nInfinityAttributes, value);
                                mCRCMethod.setNInfinity(nInfinity);
                                let label = reaction_js_1.NInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + reaction_js_1.MesmerILT.tagName + "_" + reaction_js_1.NInfinity.tagName;
                                let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level3, (event) => {
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
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.NInfinity.tagName, reaction_js_1.NInfinity.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let contentDivId = reaction.id + "_" + reaction_js_1.MCRCMethod.tagName;
                        (0, html_js_1.getCollapsibleDiv)({
                            divToAddTo: reactionDiv,
                            elementToInsertBefore: null,
                            content: mCRCMethodDiv,
                            buttonLabel: reaction_js_1.MCRCMethod.tagName,
                            buttonFontSize: fontSize3,
                            boundary: boundary1,
                            level: level2,
                            contentDivId: contentDivId
                        });
                    }
                    else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                }
                else {
                    mCRCMethod = new reaction_js_1.MCRCMethod(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement('label');
                    mCRCMethodLabel.textContent = reaction_js_1.MCRCMethod.tagName + ": " + mCRCMethodAttributes.get("name");
                    Object.assign(mCRCMethodLabel.style, level2);
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
            let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_excessReactantConc[0])));
            let excessReactantConc = new reaction_js_1.ExcessReactantConc((0, xml_js_1.getAttributes)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
            let id = reaction.id + "_" + reaction_js_1.ExcessReactantConc.tagName;
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level2, (event) => {
                let target = event.target;
                setNumberNode(excessReactantConc, target);
            }, value.toExponential(), reaction_js_1.ExcessReactantConc.tagName);
            reactionDiv.appendChild(inputDiv);
        }
        // Create a new collapsible div for the reaction and append to the reactionListDiv.
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: reactionListDiv,
            elementToInsertBefore: null,
            content: reactionDiv,
            buttonLabel: reaction.id + "(" + reaction.getLabel() + ")",
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: reaction.tagName + "_" + reaction.id
        });
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
    console.log(control_js_1.Control.tagName);
    // Get the XML "me:conditions" element.
    let xml_conditionss = xml.getElementsByTagName(conditions_js_1.Conditions.tagName);
    let conditionssDiv = (0, html_js_1.createDiv)(undefined, boundary1);
    for (let i = 0; i < xml_conditionss.length; i++) {
        let xml_conditions = xml_conditionss[i];
        // Create div to contain theconditions.
        let conditionsDiv = (0, html_js_1.createDiv)((0, util_js_1.getID)(conditions_js_1.Conditions.tagName, i.toString()), boundary1);
        let conditions = addConditions((0, xml_js_1.getAttributes)(xml_conditions), conditionsDiv, null, conditionssDiv, i);
        let level = level2;
        let nextLevel = level3;
        // Load conditions.
        // Bath Gases
        let bathGasesDiv = document.createElement("div");
        conditionsDiv.appendChild(bathGasesDiv);
        // Add collapsible div.
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: conditionsDiv,
            elementToInsertBefore: null,
            content: bathGasesDiv,
            buttonLabel: conditions_js_1.BathGas.tagName,
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level,
            contentDivId: conditions_js_1.BathGas.tagName
        });
        // Add add button.
        let addBathGasButton = (0, html_js_1.createButton)(addString, undefined, nextLevel);
        bathGasesDiv.appendChild(addBathGasButton);
        addBathGasButton.addEventListener('click', () => {
            let bathGas = new conditions_js_1.BathGas(new Map(), selectAnotherOption);
            conditions.addBathGas(bathGas);
            let div = (0, html_js_1.createFlexDiv)(undefined, nextLevel);
            div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true));
            addRemoveButton(div, boundary1, (bathGas) => {
                bathGasesDiv.removeChild(div);
                conditions.removeBathGas(bathGas);
            });
            bathGasesDiv.insertBefore(div, addBathGasButton);
        });
        // Process any "bathGas" elements that are immediate children of xml_conditions.
        let xml_bathGases = Array.from(xml_conditions.children).filter(child => child.tagName === conditions_js_1.BathGas.tagName);
        if (xml_bathGases.length > 0) {
            for (let i = 0; i < xml_bathGases.length; i++) {
                let attributes = (0, xml_js_1.getAttributes)(xml_bathGases[i]);
                let moleculeID = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGases[i]));
                let bathGas = new conditions_js_1.BathGas(attributes, moleculeID);
                console.log("bathGas" + bathGas.toString());
                conditions.addBathGas(bathGas);
                let div = (0, html_js_1.createFlexDiv)(undefined, nextLevel);
                div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true));
                addRemoveButton(div, boundary1, (bathGas) => {
                    bathGasesDiv.removeChild(div);
                    conditions.removeBathGas(bathGas);
                });
                bathGasesDiv.insertBefore(div, addBathGasButton);
            }
        }
        // PTs
        let moleculeKeys = new Set(molecules.keys());
        // Create a new div for the PTs.
        let pTsDiv = (0, html_js_1.createDiv)(undefined, boundary1);
        conditionsDiv.appendChild(pTsDiv);
        let pTs;
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
                    pTs.addPTpair(pTpair);
                    // BathGas.
                    let xml_bathGass = xml_PTpairs[i].getElementsByTagName(conditions_js_1.BathGas.tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) {
                            console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        }
                        let bathGasValue = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGass[0]));
                        let bathGas = new conditions_js_1.BathGas((0, xml_js_1.getAttributes)(xml_bathGass[0]), bathGasValue);
                        pTpair.setBathGas(bathGas);
                    }
                    // ExperimentRate.
                    let xml_experimentRates = xml_PTpairs[i].getElementsByTagName(conditions_js_1.ExperimentalRate.tagName);
                    if (xml_experimentRates.length > 0) {
                        if (xml_experimentRates.length > 1) {
                            console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                        }
                        let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_experimentRates[0]));
                        let experimentRate = new conditions_js_1.ExperimentalRate((0, xml_js_1.getAttributes)(xml_experimentRates[0]), parseFloat(valueString));
                        pTpair.setExperimentalRate(experimentRate);
                    }
                    // ExperimentalYield.
                    let xml_experimentalYields = xml_PTpairs[i].getElementsByTagName(conditions_js_1.ExperimentalYield.tagName);
                    if (xml_experimentalYields.length > 0) {
                        if (xml_experimentalYields.length > 1) {
                            console.warn("xml_experimentalYields.length=" + xml_experimentalYields.length);
                        }
                        let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_experimentalYields[0]));
                        let experimentalYield = new conditions_js_1.ExperimentalYield((0, xml_js_1.getAttributes)(xml_experimentalYields[0]), parseFloat(valueString));
                        pTpair.setExperimentalYield(experimentalYield);
                    }
                    // ExperimentalEigenvalue.
                    let xml_experimentalEigenvalues = xml_PTpairs[i].getElementsByTagName(conditions_js_1.ExperimentalEigenvalue.tagName);
                    if (xml_experimentalEigenvalues.length > 0) {
                        if (xml_experimentalEigenvalues.length > 1) {
                            console.warn("xml_experimentalEigenvalues.length=" + xml_experimentalEigenvalues.length);
                        }
                        let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_experimentalEigenvalues[0]));
                        let experimentalEigenvalue = new conditions_js_1.ExperimentalEigenvalue((0, xml_js_1.getAttributes)(xml_experimentalEigenvalues[0]), parseFloat(valueString));
                        pTpair.setExperimentalEigenvalue(experimentalEigenvalue);
                    }
                    // Create pTpairDiv.
                    createPTpairDiv(pTs, pTsDiv, pTpair, i, moleculeKeys, nextLevel);
                }
            }
        }
        else {
            pTs = new conditions_js_1.PTs(new Map());
        }
        conditions.setPTs(pTs);
        // Add collapsible div.
        (0, html_js_1.getCollapsibleDiv)({
            divToAddTo: conditionsDiv,
            elementToInsertBefore: null,
            content: pTsDiv,
            buttonLabel: conditions_js_1.PTs.tagName,
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level,
            contentDivId: conditions_js_1.BathGas.tagName
        });
        // Create an add button to add a new PTpair.
        let addButton = (0, html_js_1.createButton)(addString, undefined, nextLevel);
        pTsDiv.appendChild(addButton);
        // Add event listener to the addButton.
        addButton.addEventListener('click', () => {
            // Create a new PTpair.
            let pTpairAttributes = new Map();
            pTpairAttributes.set("units", "Torr");
            let pTpair = new conditions_js_1.PTpair(pTpairAttributes);
            let pTpairIndex = pTs.addPTpair(pTpair);
            console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
            // Create a new div for the PTpair.
            createPTpairDiv(pTs, pTsDiv, pTpair, pTpairIndex, moleculeKeys, nextLevel);
        });
        // Create an add from spreadsheet button to add multiple PTPairs.
        let addMultipleButton = (0, html_js_1.createButton)(s_Add_from_spreadsheet, undefined, boundary1);
        pTsDiv.appendChild(addMultipleButton);
        // Add event listener to the addMultipleButton.
        addMultipleButton.addEventListener('click', () => {
            // Add a new text input for the user to paste the PTPairs.
            let div = (0, html_js_1.createFlexDiv)(undefined, nextLevel);
            let addFromSpreadsheetId = conditions_js_1.PTs.tagName + "_" + "addFromSpreadsheet";
            let inputElement = (0, html_js_1.createInput)("text", addFromSpreadsheetId, nextLevel);
            div.appendChild(inputElement);
            pTsDiv.insertBefore(div, addButton);
            // Add an event listener to the inputElement.
            inputElement.addEventListener('change', () => {
                console.log("inputElement.value=" + inputElement.value);
                console.log("inputElement.value.length=" + inputElement.value.length);
                if (inputElement.value.length > 0) {
                    let pTpairsArray = inputElement.value.split(" ");
                    // Is there a header?
                    let index = new Map();
                    pTpairsArray[0].split("\t").forEach((value, i) => {
                        index.set(value, i);
                    });
                    console.log("pTpairsArray.length=" + pTpairsArray.length);
                    for (let i = 1; i < pTpairsArray.length; i++) {
                        let pTpairArray = pTpairsArray[i].split("\t");
                        let pIndex = index.get("P");
                        let p = parseFloat(pTpairArray[pIndex]);
                        let unitsIndex = index.get("units");
                        let pTpairAttributes = new Map();
                        if (index.has("units")) {
                            let units = pTpairArray[unitsIndex];
                            pTpairAttributes.set("units", units);
                        }
                        let pTpair = new conditions_js_1.PTpair(pTpairAttributes);
                        pTs.addPTpair(pTpair);
                        let tIndex = index.get("T");
                        let t = parseFloat(pTpairArray[tIndex]);
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
                            let experimentalRateIndex = index.get(conditions_js_1.ExperimentalRate.tagName);
                            let experimentalRate = pTpairArray[experimentalRateIndex];
                            pTpairAttributes.set(conditions_js_1.ExperimentalRate.tagName, experimentalRate);
                            pTpair.setExperimentalRate(new conditions_js_1.ExperimentalRate(new Map(), parseFloat(experimentalRate)));
                            // Set the attributes of the experimentalRate.
                            // ref1.
                            let experimentalRateRef1Index = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_ref1);
                            let experimentalRateRef1 = pTpairArray[experimentalRateRef1Index];
                            pTpair.getExperimentalRate()?.setRef1(experimentalRateRef1);
                            // ref2.
                            let experimentalRateRef2Index = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_ref2);
                            let experimentalRateRef2 = pTpairArray[experimentalRateRef2Index];
                            pTpair.getExperimentalRate()?.setRef2(experimentalRateRef2);
                            // refReaction.
                            let experimentalRateRefReactionIndex = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_refReaction);
                            let experimentalRateRefReaction = pTpairArray[experimentalRateRefReactionIndex];
                            pTpair.getExperimentalRate()?.setRefReaction(experimentalRateRefReaction);
                            // error.
                            let experimentalRateErrorIndex = index.get(conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.s_error);
                            let experimentalRateError = pTpairArray[experimentalRateErrorIndex];
                            pTpair.getExperimentalRate()?.setError(parseFloat(experimentalRateError));
                        }
                        if (index.has(conditions_js_1.ExperimentalYield.tagName)) {
                            let experimentalYieldIndex = index.get(conditions_js_1.ExperimentalYield.tagName);
                            let experimentalYield = pTpairArray[experimentalYieldIndex];
                            pTpair.setExperimentalYield(new conditions_js_1.ExperimentalYield(new Map(), parseFloat(experimentalYield)));
                            // Set the attributes of the experimentalYield.
                            // ref.
                            let experimentalYieldRefIndex = index.get(conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_ref);
                            let experimentalYieldRef = pTpairArray[experimentalYieldRefIndex];
                            pTpair.getExperimentalYield()?.setRef(experimentalYieldRef);
                            // yieldTime.
                            let experimentalYieldYieldTimeIndex = index.get(conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_yieldTime);
                            let experimentalYieldYieldTime = pTpairArray[experimentalYieldYieldTimeIndex];
                            pTpair.getExperimentalYield()?.setYieldTime(parseFloat(experimentalYieldYieldTime));
                            // error.
                            let experimentalYieldErrorIndex = index.get(conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_error);
                            let experimentalYieldError = pTpairArray[experimentalYieldErrorIndex];
                            pTpair.getExperimentalYield()?.setError(parseFloat(experimentalYieldError));
                        }
                        if (index.has(conditions_js_1.ExperimentalEigenvalue.tagName)) {
                            let experimentalEigenvalueIndex = index.get(conditions_js_1.ExperimentalEigenvalue.tagName);
                            let experimentalEigenvalue = pTpairArray[experimentalEigenvalueIndex];
                            pTpair.setExperimentalEigenvalue(new conditions_js_1.ExperimentalEigenvalue(new Map(), parseFloat(experimentalEigenvalue)));
                            // Set the attributes of the experimentalEigenvalue.
                            // EigenvalueID.
                            let experimentalEigenvalueEigenvalueIDIndex = index.get(conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.s_EigenvalueID);
                            let experimentalEigenvalueEigenvalueID = pTpairArray[experimentalEigenvalueEigenvalueIDIndex];
                            pTpair.getExperimentalEigenvalue()?.setEigenvalueID(experimentalEigenvalueEigenvalueID);
                            // error.
                            let experimentalEigenvalueErrorIndex = index.get(conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.s_error);
                            let experimentalEigenvalueError = pTpairArray[experimentalEigenvalueErrorIndex];
                            pTpair.getExperimentalEigenvalue()?.setError(parseFloat(experimentalEigenvalueError));
                        }
                        //console.log("pTpair=" + pTpair);
                        let pTpairIndex = pTs.pTpairs.length - 1;
                        // Create a new div for the PTpair.
                        createPTpairDiv(pTs, pTsDiv, pTpair, pTpairIndex, moleculeKeys, nextLevel);
                    }
                    pTsDiv.removeChild(div);
                }
            });
        });
        // Add a remove all button.
        let removeAllButton = (0, html_js_1.createButton)("Remove All", undefined, boundary1);
        pTsDiv.appendChild(removeAllButton);
        removeAllButton.addEventListener('click', () => {
            pTs.removePTpairs();
            // Remove all elements before the add button.
            let child = pTsDiv.firstChild;
            while (child != null && child != addButton) {
                let nextSibling = child.nextSibling;
                pTsDiv.removeChild(child);
                child = nextSibling;
            }
        });
    }
    // Create an add conditions button.
    createAddConditionsButton(conditionssDiv, level1);
    return conditionssDiv;
}
/**
 * @param controlsDiv
 * @param level The level.
 * @returns A button.
 */
function createAddConditionsButton(conditionssDiv, level) {
    let button = (0, html_js_1.createButton)("Add Conditions", undefined, level1);
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        let conditionsID = (0, util_js_1.getID)(conditions_js_1.Conditions.tagName, i.toString());
        let conditionsDiv = (0, html_js_1.createDiv)(conditionsID, boundary1);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_js_1.getID)(conditions_js_1.Conditions.tagName, (i - 1).toString()));
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
        // Add the control
        let conditions = addConditions(new Map(), conditionssDiv, elementToInsertBefore, conditionssDiv, i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        /*
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, conditionsDiv, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv: HTMLDivElement = createFlexDiv(undefined, level);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button: HTMLButtonElement) => {
            onOffControlsDiv.appendChild(button);
        });
        conditionsDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleControl(control, conditionsDiv, onOffControls, null, level, TestMicroRates, control.setTestMicroRates, control.removeTestMicroRates);
        handleCalcMethod(control, conditionsDiv, i, null, level);
        getControlItems(control).forEach(item => {
            handleControl(control, conditionsDiv, onOffControls, null, level, item.class, item.setMethod, item.removeMethod);
        });
        */
        // Add a remove conditions button.
        let removeButton = addRemoveButton(conditionsDiv, level2, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, html_js_1.remove)(conditionsID, ids);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */
function addConditions(attributes, conditionsDiv, elementToInsertBefore, conditionssDiv, i) {
    let conditions = new conditions_js_1.Conditions(attributes, i);
    mesmer.addConditions(conditions);
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: conditionssDiv,
        elementToInsertBefore: elementToInsertBefore,
        content: conditionsDiv,
        buttonLabel: "Conditions " + i.toString(),
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: conditionsDiv.id
    });
    return conditions;
}
/**
 * @param pTs The PTs.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param index The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */
function createPTpairDiv(pTs, pTsDiv, pTpair, index, moleculeKeys, level) {
    let pTpairDiv = (0, html_js_1.createFlexDiv)(undefined, level);
    pTsDiv.appendChild(pTpairDiv);
    addPorT(pTpairDiv, conditions_js_1.PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits(mesmer_js_1.Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, conditions_js_1.PTpair.tagName, conditions_js_1.PTpair.tagName, boundary1);
    addPorT(pTpairDiv, conditions_js_1.PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    // ExcessReactantConc.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.PTpair.s_excessReactantConc, conditions_js_1.PTpair.tagName + "_" + conditions_js_1.PTpair.s_excessReactantConc + index, [pTpair], createExcessReactantConcInputElement);
    // PercentExcessReactantConc.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.PTpair.s_percentExcessReactantConc);
    // Precision.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.PTpair.s_precision, conditions_js_1.PTpair.tagName + "_" + conditions_js_1.PTpair.s_precision + index, [pTpair], createPrecisionSelectElement);
    // BathGas.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.BathGas.tagName, conditions_js_1.PTpair.tagName + "_" + conditions_js_1.BathGas.tagName + index, [pTpair, moleculeKeys, true], createBathGasSelectElement);
    // ExperimentalRate.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.ExperimentalRate.tagName, conditions_js_1.ExperimentalRate.tagName + "_" + conditions_js_1.ExperimentalRate.tagName + index, [undefined, pTpair, index], addExperimentalRateDetails);
    // ExperimentalYield.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.ExperimentalYield.tagName, conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.tagName + index, [undefined, pTpair, index], addExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    addButtonWithToggle(pTpairDiv, pTpair, conditions_js_1.ExperimentalEigenvalue.tagName, conditions_js_1.ExperimentalEigenvalue.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.tagName + index, [undefined, pTpair, index], addExperimentalEigenvalueDetails);
    // Function to be used to remove a PTpair.
    let removePTpair = (pTpairDiv, i, pTpair) => {
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) {
            pTs.removePTpair(i);
        }
        pTpair.removeBathGas();
    };
    addRemoveButton(pTpairDiv, boundary1, removePTpair, pTpairDiv, index, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */
function addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, html_js_1.createLabelWithInput)("number", conditions_js_1.PTpair.tagName + "_" + name, boundary1, level0, (event) => {
        let target = event.target;
        if ((0, util_js_1.isNumeric)(target.value)) {
            setter(parseFloat(target.value));
            console.log(`Set ${name} to ${target.value}`);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = getter().toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, getter().toExponential(), name);
    let input = lwi.querySelector('input');
    input.value = getter().toString();
    (0, html_js_1.resizeInputElement)(input);
    pTpairDiv.appendChild(lwi);
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param attribute The attribute.
 * @param id The id for any created element.
 * @param handlerArgs The arguments for the handler.
 * @param handler The handler function that creates any element.
 */
function addButtonWithToggle(pTpairDiv, pTpair, attribute, id, handlerArgs, handler) {
    let div = (0, html_js_1.createDiv)(undefined, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected = attribute + selected;
    let buttonTextContentDeselected = attribute + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
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
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
            if (handler) {
                if (id != undefined && handlerArgs != undefined) {
                    if (handler == createBathGasSelectElement) {
                        let bathGas = pTpair.getBathGas();
                        if (bathGas == undefined) {
                            button.textContent = buttonTextContentDeselected;
                        }
                        else {
                            button.textContent = buttonTextContentSelected;
                            if (handlerArgs[1].has(bathGas.value) == false) {
                                console.warn("moleculeKeys does not contain " + bathGas.value);
                            }
                            div.appendChild(handler(id, bathGas, true));
                        }
                        let input = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    }
                    else {
                        let input = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    }
                }
            }
        }
        else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
            if (id) {
                // Remove the element.
                (0, html_js_1.remove)(id, ids);
            }
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
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
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */
function createBathGasSelectElement(id, pTpair, bathGas, first) {
    console.log("createBathGasSelectElement");
    console.log("pTpair " + pTpair.toString());
    let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, first);
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
 */
function createSelectElementBathGas(options, bathGas, first) {
    let value;
    if (first) {
        options.push(selectAnotherOption);
    }
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(selectAnotherOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    if (bathGas == undefined) {
        bathGas = new conditions_js_1.BathGas(new Map(), selectAnotherOption);
        value = selectAnotherOption;
    }
    else {
        value = bathGas.value;
    }
    let select = (0, html_js_1.createSelectElement)(options, conditions_js_1.BathGas.tagName, value, conditions_js_1.PTs.tagName, boundary1);
    selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event) => {
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as a " + conditions_js_1.BathGas.tagName);
        (0, html_js_1.resizeSelectElement)(target);
    });
    select.value = value;
    (0, html_js_1.resizeSelectElement)(select);
    return select;
}
function addExperimentalRateDetails(id, pTpair, index) {
    console.log("addExperimentalRateDetails");
    console.log("pTpair " + pTpair.toString());
    return addExperimentalDetails(pTpair, conditions_js_1.PTpair.tagName + "_" + conditions_js_1.ExperimentalRate.tagName + "_" + index, pTpair => pTpair.getExperimentalRate(), (pTpair, value) => pTpair.setExperimentalRate(value), conditions_js_1.ExperimentalRate, [
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
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setError(parseFloat(target.value)),
            valueGetter: () => pTpair.getExperimentalRate().getError().toString()
        }
    ]);
}
function addExperimentalYieldDetails(id, pTpair, index) {
    return addExperimentalDetails(pTpair, conditions_js_1.PTpair.tagName + "_" + conditions_js_1.ExperimentalYield.tagName + "_" + index, pTpair => pTpair.getExperimentalYield(), (pTpair, value) => pTpair.setExperimentalYield(value), conditions_js_1.ExperimentalYield, [
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
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setYieldTime(parseFloat(target.value)),
            valueGetter: () => pTpair.getExperimentalYield().getYieldTime().toString()
        },
        {
            tagName: conditions_js_1.ExperimentalYield.tagName + "_" + conditions_js_1.ExperimentalYield.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setError(parseFloat(target.value)),
            valueGetter: () => pTpair.getExperimentalYield().getError().toString()
        }
    ]);
}
function addExperimentalEigenvalueDetails(id, pTpair, index) {
    return addExperimentalDetails(pTpair, conditions_js_1.PTpair.tagName + "_" + conditions_js_1.ExperimentalEigenvalue.tagName + "_" + index, pTpair => pTpair.getExperimentalEigenvalue(), (pTpair, value) => pTpair.setExperimentalEigenvalue(value), conditions_js_1.ExperimentalEigenvalue, [
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
            eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setError(parseFloat(target.value)),
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
        experimental = new ExperimentalClass(new Map(), NaN);
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
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
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
        let value = parseFloat(valueString);
        gs = new modelParameters_js_1.GrainSize((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, mesmer_js_1.Mesmer.energyUnits);
        button.classList.toggle(s_optionOff);
    }
    else {
        valueString = "";
        gs = new modelParameters_js_1.GrainSize(new Map(), NaN);
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
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
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
        let value = parseFloat(valueString);
        mp = new ModelParameterType((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
        button.classList.toggle(s_optionOff);
    }
    else {
        valueString = "";
        mp = new ModelParameterType(new Map(), NaN);
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
    });
    button.classList.toggle(s_optionOn);
    button.classList.toggle(s_optionOff);
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
    addAnyUnits(units, element.attributes, div, ids, element.constructor.tagName, boundary1);
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
        // Create div to contain the control.
        let controlID = (0, util_js_1.getID)(control_js_1.Control.tagName, i.toString());
        let controlDiv = (0, html_js_1.createDiv)(controlID, boundary1);
        let control = addControl((0, xml_js_1.getAttributes)(xml_control), controlDiv, null, controlsDiv, i);
        let level = level2;
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, controlDiv, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, html_js_1.createFlexDiv)(undefined, level);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button) => {
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, controlDiv, null, level);
        handleCalcMethod(control, controlDiv, i, xml_control, level);
        getControlItems(control).forEach(item => {
            handleControl(control, controlDiv, onOffControls, xml_control, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = addRemoveButton(controlDiv, level2, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, html_js_1.remove)(controlID, ids);
        });
    }
    // Create an add button to add a control.
    createAddControlButton(controlsDiv, level2);
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
    let button = (0, html_js_1.createButton)("Add Control", undefined, level1);
    controlsDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = mesmer.getNextControlID();
        console.log("Add Control " + i.toString());
        let controlID = (0, util_js_1.getID)(control_js_1.Control.tagName, i.toString());
        let controlDiv = (0, html_js_1.createDiv)(controlID, boundary1);
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_js_1.getID)(control_js_1.Control.tagName, (i - 1).toString()));
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
        // Add the control
        let control = addControl(new Map(), controlDiv, elementToInsertBefore, controlsDiv, i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, controlDiv, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, html_js_1.createFlexDiv)(undefined, level);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button) => {
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, controlDiv, null, level);
        handleCalcMethod(control, controlDiv, i, null, level);
        getControlItems(control).forEach(item => {
            handleControl(control, controlDiv, onOffControls, null, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = addRemoveButton(controlDiv, level2, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, html_js_1.remove)(controlID, ids);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */
function addControl(attributes, controlDiv, elementToInsertBefore, controlsDiv, i) {
    let control = new control_js_1.Control(attributes, i);
    mesmer.addControl(control);
    (0, html_js_1.getCollapsibleDiv)({
        divToAddTo: controlsDiv,
        elementToInsertBefore: elementToInsertBefore,
        content: controlDiv,
        buttonLabel: "Control " + i.toString(),
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: controlDiv.id
    });
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
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */
function handleControl(control, controlDiv, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
    let tagName = ControlClass.tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
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
        id = control_js_1.Control.tagName + "_" + tagName + "_input";
    }
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
                let value = parseFloat(valueString);
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
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = (0, util_js_1.getID)(control_js_1.Control.tagName, control_js_1.CalcMethod.tagName, i.toString());
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
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
            let attributes = (0, xml_js_1.getAttributes)(xml[0]);
            let xsi_type = attributes.get("xsi:type");
            cm = getCalcMethod(control, div, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId, divCm);
            control.setCalcMethod(cm);
        }
        else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                options.push(selectAnotherOption);
            }
            // Remove any existing select.
            (0, html_js_1.remove)(divCmDetailsSelectId);
            (0, html_js_1.remove)(divCmDetailsId);
            // Create the select element.
            let select = createSelectElementCalcMethod(control, div, options, tagName, selectAnotherOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
        }
        else {
            control.removeCalcMethod();
            // Remove any existing div.
            (0, html_js_1.remove)(divCmDetailsSelectId);
            (0, html_js_1.remove)(divCmDetailsId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
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
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
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
            button.textContent = buttonTextContentSelected;
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle(s_optionOff);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
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
    let tMaxlwi = (0, html_js_1.createLabelWithInput)("number", idTmax + "_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmr.setTmax(parseFloat(target.value));
            console.log("Set Tmax to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tMax.toExponential(), "Tmax");
    tMaxlwi.id = idTmax;
    (0, html_js_1.resizeInputElement)(tMaxlwi.querySelector('input'));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, html_js_1.createLabelWithInput)("number", idTmin + "_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmr.setTmin(parseFloat(target.value));
            console.log("Set Tmin to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tMin.toExponential(), "Tmin");
    tMinlwi.id = idTmin;
    (0, html_js_1.resizeInputElement)(tMinlwi.querySelector('input'));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, html_js_1.createLabelWithInput)("number", idTstep + "_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmr.setTstep(parseFloat(target.value));
            console.log("Set Tstep to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tStep.toExponential(), "Tstep");
    tSteplwi.id = idTstep;
    (0, html_js_1.resizeInputElement)(tSteplwi.querySelector('input'));
    div.appendChild(tSteplwi);
}
/**
 * Get the CalcMethod from the XML.
 * @param control The control.
 * @param div div.
 * @param xml The xml.
 * @param options The options.
 * @param attributes The attributes.
 * @param tagName The tag name.
 * @param xsi_type The xsi:type.
 * @param divCmDetailsId The div cm details id.
 * @param divCmDetailsSelectId The div cm details select id.
 * @param divCm The div cm.
 * @returns The CalcMethod.
 */
function getCalcMethod(control, div, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId, divCm) {
    let cm;
    // Create the select element.
    let select = createSelectElementCalcMethod(control, div, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
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
                let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(fi_xml[0])));
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
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(elementXml[0])));
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
                    if (!isNaN(parseFloat(value))) {
                        value = parseFloat(value);
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
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(elementXml[0])));
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
                    if (!isNaN(parseFloat(value))) {
                        value = parseFloat(value);
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
    let fittingIterations = cm.getFittingIterations() || new control_js_1.FittingIterations(new Map(), NaN);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetails.id + "_FittingIterations_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            fittingIterations.value = parseInt(target.value);
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
                obj.value = parseFloat(target.value);
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
    let marquardtIterations = cm.getMarquardtIterations() || new control_js_1.MarquardtIterations(new Map(), NaN);
    cm.setMarquardtIterations(marquardtIterations);
    createLabelWithInputForObject(marquardtIterations, divCmDetails, boundary1, level0);
    // MarquardtTolerance.
    let marquardtTolerance = cm.getMarquardtTolerance() || new control_js_1.MarquardtTolerance(new Map(), NaN);
    cm.setMarquardtTolerance(marquardtTolerance);
    createLabelWithInputForObject(marquardtTolerance, divCmDetails, boundary1, level0);
    // MarquardtDerivDelta.
    let marquardtDerivDelta = cm.getMarquardtDerivDelta() || new control_js_1.MarquardtDerivDelta(new Map(), NaN);
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
    // "me:chebNumTemp".
    let chebNumTemp = cm.getChebNumTemp() || new control_js_1.ChebNumTemp(new Map(), NaN);
    cm.setChebNumTemp(chebNumTemp);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetails.id + "_ChebNumTemp_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebNumTemp.value = parseFloat(target.value);
            console.log("Set ChebNumTemp to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebNumTemp.value.toString(), control_js_1.ChebNumTemp.tagName));
    // "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetails.id + `_${tagName}_input`, boundary1, level0, (event) => {
            let target = event.target;
            // Check the value is a number.
            if ((0, util_js_1.isNumeric)(target.value)) {
                element.value = parseFloat(target.value);
                console.log(`Set ${tagName} to ` + target.value);
            }
            else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            (0, html_js_1.resizeInputElement)(target);
        }, element.value.toString(), tagName));
    }
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
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetails.id + `_${tagName}_input`, boundary1, level0, (event) => {
            let target = event.target;
            // Check the value is a number.
            if ((0, util_js_1.isNumeric)(target.value)) {
                element.value = parseFloat(target.value);
                console.log(`Set ${tagName} to ` + target.value);
            }
            else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            (0, html_js_1.resizeInputElement)(target);
        }, element.value.toString(), tagName));
    }
    processElement(control_js_1.Tmin, cm.getTmin.bind(cm), cm.setTmin.bind(cm), control_js_1.Tmin.tagName);
    processElement(control_js_1.Tmid, cm.getTmid.bind(cm), cm.setTmid.bind(cm), control_js_1.Tmid.tagName);
    processElement(control_js_1.Tmax, cm.getTmax.bind(cm), cm.setTmax.bind(cm), control_js_1.Tmax.tagName);
    processElement(control_js_1.Tstep, cm.getTstep.bind(cm), cm.setTstep.bind(cm), control_js_1.Tstep.tagName);
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
        divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetails.id + `_${tagName}_input`, boundary1, level0, (event) => {
            let target = event.target;
            // Check the value is a number.
            if ((0, util_js_1.isNumeric)(target.value)) {
                element.value = parseFloat(target.value);
                console.log(`Set ${tagName} to ` + target.value);
            }
            else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            (0, html_js_1.resizeInputElement)(target);
        }, element.value.toString(), tagName));
    }
    processNumberElement(control_js_1.SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), control_js_1.SensitivityAnalysisSamples.tagName);
    processNumberElement(control_js_1.SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), control_js_1.SensitivityAnalysisOrder.tagName);
    processNumberElement(control_js_1.SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), control_js_1.SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new control_js_1.SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    divCmDetails.appendChild((0, html_js_1.createLabelWithSelect)(control_js_1.SensitivityVarRedMethod.tagName, control_js_1.SensitivityVarRedMethod.options, control_js_1.SensitivityVarRedMethod.tagName, control_js_1.SensitivityVarRedMethod.options[0], divCmDetails.id, boundary1, boundary1));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector('select');
    select?.addEventListener('change', (event) => {
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log("Set SensitivityVarRedMethod to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
}
/**
 * @param options The options.
 * @param select The select element.
 */
function selectAnotherOptionEventListener(options, select) {
    select.addEventListener('click', (event) => {
        if (options[options.length - 1] == selectAnotherOption) {
            options.pop();
        }
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == selectAnotherOption) {
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
        divCmDetails = (0, html_js_1.createFlexDiv)(undefined, boundary1);
        divCmDetails.id = divCmDetails.id;
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
 * @param fontSize The fontSize to use.
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
        let energyMin = Number.MAX_VALUE;
        let energyMax = Number.MIN_VALUE;
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
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
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
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
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
                            energy = molecules.get(ref)?.getEnergy() ?? 0;
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
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
                            energy = molecules.get(ref)?.getEnergy() ?? 0;
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
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
        let energyRange = energyMax - energyMin;
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
            let energyRescaled = (0, util_js_1.rescale)(energyMin, energyRange, 0, rdCanvasHeight, energy);
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
        let canvasHeightWithBorder = rdCanvasHeight + (4 * th) + (2 * lw);
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdCanvasHeight;
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
            let energyRescaled = (0, util_js_1.rescale)(energyMin, energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, util_js_1.get)(reactantsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_js_1.get)(reactantsOutXY, value)[0];
            let energyString = energy.toString();
            (0, canvas_js_1.drawLevel)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function (value) {
            let energy = (0, util_js_1.get)(energies, value);
            let energyRescaled = (0, util_js_1.rescale)(energyMin, energyRange, 0, originalCanvasHeight, energy);
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
            let energyRescaled = (0, util_js_1.rescale)(energyMin, energyRange, 0, originalCanvasHeight, energy);
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