"use strict";
//import { openDB } from 'idb';
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNumberNode = exports.setNumberArrayNode = void 0;
//import * as $3Dmol from '3dmol';
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
/**
 * MXG.
 */
let mxg_url = "https://github.com/agdturner/mxg-pwa";
let mxg_a = document.createElement('a');
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;
/**
 * MESMER.
 */
let mesmer_url = "https://sourceforge.net/projects/mesmer/";
let memser_a = document.createElement('a');
memser_a.href = mesmer_url;
memser_a.textContent = mesmer_url;
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
let addString = "add";
let addSymbol = "\uFF0B";
let removeString = "remove";
let removeSymbol = "\u2715";
let s_Add_from_spreadsheet = "Add from spreadsheet";
// Selected and deselected symbology.
let selected = " \u2713";
let deselected = " \u2717";
let selectAnotherOption = "Action/select another option...";
// IDs
let divCmId = control_js_1.Control.tagName + "_" + control_js_1.CalcMethod.tagName;
let divCmDetailsId = divCmId + "_details";
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
let molecules = new Map();
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
 * The reactions diagram ids.
 */
let rdDivId = "reactionsDiagram";
let rdCanvasId = "reactionsDiagramCanvas";
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
    let menuDiv = document.getElementById('menu');
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';
    // Create Load button.
    let loadButton = (0, html_js_1.createButton)('Load', boundary1);
    loadButton.addEventListener('click', (event) => {
        load();
        loadButton.textContent = 'Load';
    });
    loadButton.style.fontSize = '1em'; // Set the font size with a relative unit.
    menuDiv.appendChild(loadButton);
    /*
    // Create GitHub repository URL button.
    let gitHubRepositoryButtonId = 'gitHubRepositoryButtonId';
    remove(gitHubRepositoryButtonId);
    let gitHubRepositoryButton = createButton(gitHubRepositoryURL, boundary1);
    gitHubRepositoryButton.id = gitHubRepositoryButtonId;
    gitHubRepositoryButton.addEventListener('click', () => {
        window.open(gitHubRepositoryURL, '_blank');
    });
    menuDiv.appendChild(gitHubRepositoryButton);
    */
    // Create style/theme option buttons.
    // Create button to increase the font size.
    let increaseFontSizeButton = (0, html_js_1.createButton)("Increase Font Size", boundary1);
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
    let decreaseFontSizeButton = (0, html_js_1.createButton)("Decrease Font Size", boundary1);
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
    let lightDarkModeButton = (0, html_js_1.createButton)("Light/Dark Mode", boundary1);
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
    let saveButtonId = 'saveButtonId';
    (0, html_js_1.remove)(saveButtonId);
    let saveButton = (0, html_js_1.createButton)('Save', boundary1);
    saveButton.id = saveButtonId;
    saveButton.addEventListener('click', saveXML);
    saveButton.style.fontSize = '1em'; // Set the font size with a relative unit.
    menuDiv.appendChild(saveButton);
    let welcomeDiv = (0, html_js_1.createDiv)(boundary1);
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
    p2.textContent = 'MXG development is being funded by the UK Engineering and Physical Sciences Research Council (EPSRC).';
    let p3 = document.createElement('p');
    welcomeDiv.appendChild(p3);
    p3.textContent = 'There is a menu above containing buttons. Use the Load button to select a MESMER file to load (the file \
        will not be modified). MXG reads the file and presents the data it contains so that the user can make changes and use \
        the Save button to generate a new MESMER file. The saved file should have the same content as was loaded except it \
        will contain no comments, values will be trimmed of white space, and number formats will be in a standard \
        scientific notation if they were not already. The saved file will also reflect any changes specified using the GUI.';
    let p4 = document.createElement('p');
    welcomeDiv.appendChild(p4);
    p4.textContent = 'MXG is designed to be user-friendly and accessible. Between the Load and Save buttons are buttons to \
        increase or decrease the font size. It is planned to have themes selectable to provide a dark mode rendering and to \
        support users without normal colour vision.The development is in an alpha release phase, is undergoing testing, and \
        is not recommended for general use. A community release with ongoing support from MESMER developers is scheduled for \
        the end of April 2024. MXG is free and open source software based and free and open source software. The main \
        development GitHub repository is: ';
    p4.appendChild(mxg_a);
    let p5 = document.createElement('p');
    p5.textContent += 'Please feel free to explore the code and have a play with MXG.';
    welcomeDiv.appendChild(p5);
    let p6 = document.createElement('p');
    welcomeDiv.appendChild(p6);
    p6.textContent = 'MXG can be installed locally as a Progressive Web App (PWA). A PWA is a type of application software \
    that works on any platform with a standards-compliant Web browser. PWA installation varies by Web browser/device. \
    Some details to help with installation of the MXG PWA are in the GitHub Repository README. Please refer to that \
    README for further details. Below the menu is a section for instructions on how to use MXG.';
    let p7 = document.createElement('p');
    welcomeDiv.appendChild(p7);
    p7.textContent = 'The MESMER file loaded is expected to contain the following child elements of the parent "me:mesmer" \
    element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a \
    child element is missing or there are multiple of the same, an Error is currently thrown. MXG should support files \
    loaded with multiple "me:contol" sections soon...';
    document.body.appendChild(welcomeDiv);
    // Create div for instructions.
    let instructionsDiv = (0, html_js_1.createDiv)(boundary1);
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
    let inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.onchange = function () {
        if (inputElement.files) {
            for (let i = 0; i < inputElement.files.length; i++) {
                console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            }
            let file = inputElement.files[0];
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
    inputElement.click();
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
        let titleId = 'title';
        let titleDiv = document.getElementById(titleId);
        let lwiId = 'titleDiv';
        // If the lwi div already exists, remove it.
        (0, html_js_1.remove)(lwiId);
        // Create input element.
        let lwi = (0, html_js_1.createLabelWithInput)("text", lwiId + "Input", boundary1, level0, (event) => {
            let target = event.target;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            (0, html_js_1.resizeInputElement)(target);
        }, title, mesmer_js_1.Title.tagName, fontSize1);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }
    // Molecules.
    let moleculesDivId = 'molecules';
    let moleculesDiv = document.getElementById(moleculesDivId);
    let moleculesListDivId = 'moleculesList';
    // If the moleculeListDiv already exists, remove it.
    (0, html_js_1.remove)(moleculesListDivId);
    let moleculeListDiv = processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    moleculesDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: moleculeListDiv,
        buttonLabel: "Molecules",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: moleculeListDiv.id
    }));
    mesmer.setMoleculeList(new mesmer_js_1.MoleculeList((0, xml_js_1.getAttributes)(moleculeListDiv), Array.from(molecules.values())));
    // Reactions.
    let reactionsDivId = 'reactions';
    let reactionsDiv = document.getElementById(reactionsDivId);
    let reactionsListDivId = 'reactionsList';
    // If the reactionsListDiv already exists, remove it.
    (0, html_js_1.remove)(reactionsListDivId);
    let reactionsListDiv = processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    reactionsDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: reactionsListDiv,
        buttonLabel: "Reactions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: reactionsListDiv.id
    }));
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
    let rdDiv = (0, html_js_1.createDiv)(boundary1);
    rdDiv.id = rdDivId;
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = 'popButtonDivId';
    // If the popButtonDiv already exists, remove it.
    //remove(popButtonDivId);
    let popButtonDiv = (0, html_js_1.createDiv)(boundary1);
    popButtonDiv.id = popButtonDivId;
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = "popButtonId";
    // If the popButton already exists, remove it.
    //remove(popButtonID);
    let popButton = (0, html_js_1.createButton)("Pop out diagram into a new window", boundary1);
    popButton.id = popButtonID;
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
            (0, html_js_1.remove)(rdCanvasId);
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
    let conditionsDivId = 'conditions';
    let conditionsDiv = document.getElementById(conditionsDivId);
    let conditionsListDivId = 'conditionsList';
    // If the conditionsListDiv already exists, remove it.
    (0, html_js_1.remove)(conditionsListDivId);
    let conditionsListDiv = processConditions(xml);
    conditionsListDiv.id = conditionsListDivId;
    conditionsDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: conditionsListDiv,
        buttonLabel: "Conditions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: conditionsListDiv.id
    }));
    // Model Parameters.
    let modelParametersDivId = 'modelParameters';
    let modelParametersDiv = document.getElementById(modelParametersDivId);
    let modelParametersListDiv = processModelParameters(xml);
    modelParametersListDiv.id = 'modelParametersList';
    // If the modelParametersListDiv already exists, remove it.
    (0, html_js_1.remove)(modelParametersListDiv.id);
    modelParametersDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: modelParametersListDiv,
        buttonLabel: "Model Parameters",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: modelParametersListDiv.id
    }));
    // Control.
    let controlDivId = 'control';
    let controlDiv = document.getElementById(controlDivId);
    let controlListDiv = processControl(xml);
    controlListDiv.id = 'controlList';
    // If the controlListDiv already exists, remove it.
    (0, html_js_1.remove)(controlListDiv.id);
    controlDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: controlListDiv,
        buttonLabel: "Control",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: controlListDiv.id
    }));
    // Initiate action listeners for collapsible content.
    (0, html_js_1.makeCollapsible)();
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml) {
    // Create div to contain the molecules list.
    let moleculeListDiv = (0, html_js_1.createDiv)(boundary1);
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
        //});
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));
        // Init atomsNode.
        let atomsNode;
        // There can be an individual atom not in an atom array, or an attom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName(molecule_js_1.AtomArray.tagName);
        if (xml_atomArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.AtomArray.tagName + " but finding " + xml_atomArrays.length + "!");
        }
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms = xml_atomArray.getElementsByTagName(molecule_js_1.Atom.tagName);
            if (xml_atoms.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + molecule_js_1.AtomArray.tagName + ", but finding " + xml_atoms.length + "!");
            }
            let atoms = [];
            for (let j = 0; j < xml_atoms.length; j++) {
                atoms.push(new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_atoms[j])));
            }
            atomsNode = new molecule_js_1.AtomArray((0, xml_js_1.getAttributes)(xml_atomArray), atoms);
            moleculeTagNames.delete(molecule_js_1.AtomArray.tagName);
        }
        else {
            let xml_atoms = xml_molecules[i].getElementsByTagName(molecule_js_1.Atom.tagName);
            if (xml_atoms.length == 1) {
                atomsNode = new molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_atoms[0]));
            }
            else if (xml_atoms.length > 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Atom.tagName + " but finding " + xml_atoms.length + ". Should these be in an " + molecule_js_1.AtomArray.tagName + "?");
            }
        }
        //console.log("atomsNode=" + atomsNode);
        moleculeTagNames.delete(molecule_js_1.Atom.tagName);
        // Init bondsNode.
        let bondsNode;
        // There can be an individual bond not in a bond array, or a bond array.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName(molecule_js_1.BondArray.tagName);
        if (xml_bondArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.BondArray.tagName + " but finding " + xml_bondArrays.length + "!");
        }
        if (xml_bondArrays.length == 1) {
            let xml_bondArray = xml_bondArrays[0];
            let xml_bonds = xml_bondArray.getElementsByTagName(molecule_js_1.Bond.tagName);
            // There may be only 1 bond in a BondArray.
            let bonds = [];
            for (let j = 0; j < xml_bonds.length; j++) {
                bonds.push(new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bonds[j])));
            }
            bondsNode = new molecule_js_1.BondArray((0, xml_js_1.getAttributes)(xml_bondArray), bonds);
            moleculeTagNames.delete(molecule_js_1.BondArray.tagName);
        }
        else {
            let xml_bonds = xml_molecules[i].getElementsByTagName(molecule_js_1.Bond.tagName);
            if (xml_bonds.length == 1) {
                bondsNode = new molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bonds[0]));
            }
            else if (xml_bonds.length > 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + molecule_js_1.BondArray.tagName + "?");
            }
        }
        moleculeTagNames.delete(molecule_js_1.Bond.tagName);
        // Create molecule.
        let molecule = new molecule_js_1.Molecule(attributes, atomsNode, bondsNode);
        molecules.set(molecule.id, molecule);
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
            let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                content: plDiv,
                buttonLabel: molecule_js_1.PropertyList.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl = new molecule_js_1.PropertyList((0, xml_js_1.getAttributes)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName(molecule_js_1.Property.tagName);
            for (let j = 0; j < xml_Ps.length; j++) {
                let p = new molecule_js_1.Property((0, xml_js_1.getAttributes)(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                if (p.dictRef == molecule_js_1.ZPE.dictRef) {
                    processProperty(p, mesmer_js_1.Mesmer.energyUnits, molecule, xml_Ps[j], plDiv, boundary1, level3);
                }
                else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
                    processProperty(p, mesmer_js_1.Mesmer.frequencyUnits, molecule, xml_Ps[j], plDiv, boundary1, level3);
                }
                else {
                    processProperty(p, undefined, molecule, xml_Ps[j], plDiv, boundary1, level3);
                }
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
            let p = new molecule_js_1.Property((0, xml_js_1.getAttributes)(xml_Ps[0]));
            molecule.setProperties(p);
            if (p.dictRef == molecule_js_1.ZPE.dictRef) {
                processProperty(p, mesmer_js_1.Mesmer.energyUnits, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            }
            else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
                processProperty(p, mesmer_js_1.Mesmer.frequencyUnits, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            }
            else {
                processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            }
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
            processDOSCMethod(dOSCMethod, molecule, moleculeDiv);
            moleculeTagNames.delete(molecule_js_1.DOSCMethod.tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName(molecule_js_1.ExtraDOSCMethod.tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            }
            //console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");
            let extraDOSCMethod = new molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + molecule_js_1.ExtraDOSCMethod.tagName + "_";
            let extraDOSCMethodCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                content: extraDOSCMethodDiv,
                buttonLabel: molecule_js_1.ExtraDOSCMethod.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(extraDOSCMethodCollapsibleDiv);
            // Read bondRef.
            let xml_bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName(molecule_js_1.BondRef.tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                }
                let container = (0, html_js_1.createFlexDiv)(level3);
                let label = document.createElement("label");
                label.textContent = molecule_js_1.BondRef.tagName + ": ";
                container.appendChild(label);
                let bondRef = new molecule_js_1.BondRef((0, xml_js_1.getAttributes)(xml_bondRefs[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
                // Create a HTMLSelectElement to select the bondRef.
                let bondIds = molecule.getBonds().getBondIds();
                let select = (0, html_js_1.createSelectElement)(bondIds, molecule_js_1.BondRef.tagName, bondRef.value, molecule.id + "_" + molecule_js_1.BondRef.tagName, boundary1);
                select.addEventListener('change', (event) => {
                    let target = event.target;
                    bondRef.value = target.value;
                    (0, html_js_1.resizeSelectElement)(target);
                });
                (0, html_js_1.resizeSelectElement)(select);
                container.appendChild(select);
                extraDOSCMethodDiv.appendChild(container);
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
                let hinderedRotorPotentialDiv = (0, html_js_1.createFlexDiv)(boundary1);
                let contentDivId = molecule.id + "_" + molecule_js_1.DOSCMethod.tagName + "_" + molecule_js_1.HinderedRotorPotential.tagName;
                let hinderedRotorPotentialCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: molecule_js_1.HinderedRotorPotential.tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level3,
                    contentDivId: contentDivId
                });
                extraDOSCMethodDiv.appendChild(hinderedRotorPotentialCollapsibleDiv);
                // Formats
                let formatLabel = (0, html_js_1.createLabel)("Format:", level4);
                hinderedRotorPotentialDiv.appendChild(formatLabel);
                let select = (0, html_js_1.createSelectElement)(molecule_js_1.HinderedRotorPotential.formats, molecule_js_1.HinderedRotorPotential.tagName, hinderedRotorPotential.format, molecule.id + "_" + molecule_js_1.HinderedRotorPotential.tagName, boundary1);
                select.addEventListener('change', (event) => {
                    let target = event.target;
                    hinderedRotorPotential.format = target.value;
                    (0, html_js_1.resizeSelectElement)(target);
                });
                hinderedRotorPotentialDiv.appendChild(select);
                // Add any units.
                let unitsLabel = (0, html_js_1.createLabel)("Units:", boundary1);
                hinderedRotorPotentialDiv.appendChild(unitsLabel);
                addAnyUnits(mesmer_js_1.Mesmer.energyUnits, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, molecule.id + "_" + molecule_js_1.DOSCMethod.tagName + "_" + molecule_js_1.HinderedRotorPotential.tagName, molecule_js_1.HinderedRotorPotential.tagName, boundary1);
                // Add expansionSize.
                let expansionSizeLabel = (0, html_js_1.createLabel)("Expansion size:", boundary1);
                hinderedRotorPotentialDiv.appendChild(expansionSizeLabel);
                let expansionSizeInputElementId = molecule.id + "_" + molecule_js_1.DOSCMethod.tagName + "_" + molecule_js_1.HinderedRotorPotential.tagName + "_expansionSize";
                let expansionSizeInputElement = (0, html_js_1.createInput)("number", expansionSizeInputElementId, boundary1);
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                expansionSizeInputElement.addEventListener('change', (event) => {
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, util_js_1.isNumeric)(target.value)) {
                        hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                    }
                    else {
                        // Reset the input to the current value.
                        alert("Expansion size input is not a number, resetting...");
                        expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                    }
                    (0, html_js_1.resizeInputElement)(expansionSizeInputElement);
                });
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                (0, html_js_1.resizeInputElement)(expansionSizeInputElement);
                hinderedRotorPotentialDiv.appendChild(expansionSizeInputElement);
                // Add useSineTerms.
                let useSineTermsLabel = (0, html_js_1.createLabel)("Use sine terms:", boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId = molecule.id + "_" + molecule_js_1.DOSCMethod.tagName + "_" + molecule_js_1.HinderedRotorPotential.tagName + "_useSineTerms";
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
                    let potentialPointDiv = (0, html_js_1.createFlexDiv)(level5);
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
        let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: molecule.tagName + "_" + molecule.id
        });
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById("xml");
    // xmlHeading
    let xmlHeadingId = "xmlHeading";
    (0, html_js_1.remove)(xmlHeadingId);
    let xmlHeading = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId = "xmlParagraph";
    (0, html_js_1.remove)(xmlParagraphId);
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
 * @param moleculeDiv The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */
function processProperty(p, units, molecule, element, moleculeDiv, boundary, level) {
    // Handle scalar or array property
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
        moleculeDiv.appendChild(inputDiv);
    }
    else {
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
            moleculeDiv.appendChild(inputDiv);
        }
        else {
            throw new Error("Expecting " + molecule_js_1.PropertyScalar.tagName + " or " + molecule_js_1.PropertyArray.tagName);
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
        let unitsLabelWithSelect = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef);
        if (unitsLabelWithSelect != undefined) {
            inputDiv.appendChild(unitsLabelWithSelect);
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
 * @param margin The margin.
 * @param moleculeDiv The molecule div.
 */
function processDOSCMethod(dOSCMethod, molecule, moleculeDiv) {
    let label = document.createElement('label');
    label.textContent = molecule_js_1.DOSCMethod.tagName + ": ";
    let container = document.createElement('div');
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let select = (0, html_js_1.createSelectElement)(molecule_js_1.DOSCMethod.xsi_typeOptions, molecule_js_1.DOSCMethod.tagName, dOSCMethod.tagName, molecule.id + "_" + 'Select_DOSCMethod', boundary1);
    // Set the initial value to the DOSCMethod.
    select.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    select.addEventListener('change', (event) => {
        let target = event.target;
        dOSCMethod.setXsiType(target.value);
        console.log("Set DOSCMethod to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    (0, html_js_1.resizeSelectElement)(select);
    molecule.setDOSCMethod(dOSCMethod);
    container.appendChild(select);
    Object.assign(container.style, level2);
    moleculeDiv.appendChild(container);
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
        let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
            content: etmDiv,
            buttonLabel: molecule_js_1.EnergyTransferModel.tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        moleculeDiv.appendChild(collapsibleDiv);
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
 * @param dictRef The dictionary reference of the property.
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
window.setNumberArrayNode = setNumberArrayNode;
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
window.set = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml) {
    // initialise reactions
    reactions = new Map();
    // Create div to contain the reaction list.
    let reactionListDiv = (0, html_js_1.createDiv)(boundary1);
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
        let reactionDiv = (0, html_js_1.createDiv)(boundary1);
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
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.ref + " role", reaction_js_1.Reactant.roleOptions, "Role", molecule.role, molecule.ref + "_" + 'Select_Role', boundary1, level3);
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
            let reactantCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                content: reactantsDiv,
                buttonLabel: "Reactants",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(reactantCollapsibleDiv);
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
                let lws = (0, html_js_1.createLabelWithSelect)(molecule.ref + " role", reaction_js_1.Product.roleOptions, molecule.role, molecule.ref + "_" + 'Select_Role', "Role", boundary1, level3);
                let select = lws.querySelector('select');
                select.value = molecule.role;
                select.addEventListener('change', (event) => {
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, html_js_1.resizeSelectElement)(target);
                });
                productsDiv.appendChild(lws);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId = reaction.id + "_" + reaction_js_1.Product.tagName;
            let productCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                content: productsDiv,
                buttonLabel: "Products",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(productCollapsibleDiv);
        }
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(reaction_js_1.Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling = new reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws = (0, html_js_1.createLabelWithSelect)(reaction_js_1.Tunneling.tagName, reaction_js_1.Tunneling.options, "Tunneling", tunneling.getName(), reaction.id + "_" + 'Select_Tunneling', boundary1, level3);
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
            let transitionStatesCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                content: transitionStatesDiv,
                buttonLabel: "Transition States",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(transitionStatesCollapsibleDiv);
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
                        let mCRCMethodCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
                            content: mCRCMethodDiv,
                            buttonLabel: reaction_js_1.MCRCMethod.tagName,
                            buttonFontSize: fontSize3,
                            boundary: boundary1,
                            level: level2,
                            contentDivId: contentDivId
                        });
                        reactionDiv.appendChild(mCRCMethodCollapsibleDiv);
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
        // Create a new collapsible div for the reaction.
        let reactionCollapsibleDiv = (0, html_js_1.getCollapsibleDiv)({
            content: reactionDiv,
            buttonLabel: reaction.id + "(" + reaction.getLabel() + ")",
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: reaction.tagName + "_" + reaction.id
        });
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(reactionCollapsibleDiv);
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
    // Create div to contain the conditions.
    let conditionsDiv = (0, html_js_1.createDiv)(boundary1);
    // Get the XML "moleculeList" element.
    let xml_conditions = (0, xml_js_1.getSingularElement)(xml, conditions_js_1.Conditions.tagName);
    let conditions = new conditions_js_1.Conditions((0, xml_js_1.getAttributes)(xml_conditions));
    mesmer.setConditions(conditions);
    // Bath Gases
    let bathGasesDiv = document.createElement("div");
    conditionsDiv.appendChild(bathGasesDiv);
    // Add collapsible div.
    conditionsDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: bathGasesDiv,
        buttonLabel: conditions_js_1.BathGas.name,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: conditions_js_1.BathGas.tagName
    }));
    // Add add button.
    let addBathGasButton = (0, html_js_1.createButton)(addString, level2);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas = new conditions_js_1.BathGas(new Map(), "");
        conditions.addBathGas(bathGas);
        let containerDiv = (0, html_js_1.createFlexDiv)(level2);
        let bathGasLabel = (0, html_js_1.createLabel)(conditions_js_1.BathGas.tagName, boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Add HTMLSelectInput for the BathGas.
        containerDiv.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas));
        // Add a remove button.
        let removeButton = (0, html_js_1.createButton)(removeString, boundary1);
        removeButton.addEventListener('click', () => {
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
        containerDiv.appendChild(removeButton);
        bathGasesDiv.appendChild(containerDiv);
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
            let div = (0, html_js_1.createFlexDiv)(level2);
            let bathGasLabel = (0, html_js_1.createLabel)(conditions_js_1.BathGas.tagName, boundary1);
            div.appendChild(bathGasLabel);
            div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas));
            // Add a remove button.
            let removeButton = (0, html_js_1.createButton)(removeString, boundary1);
            removeButton.addEventListener('click', () => {
                bathGasesDiv.removeChild(div);
                conditions.removeBathGas(bathGas);
            });
            div.appendChild(removeButton);
            bathGasesDiv.appendChild(div);
        }
    }
    // PTs
    let pTsDiv = (0, html_js_1.createDiv)(boundary1);
    conditionsDiv.appendChild(pTsDiv);
    let pTs;
    let xml_PTss = xml_conditions.getElementsByTagName(conditions_js_1.PTs.tagName);
    if (xml_PTss.length > 0) {
        if (xml_PTss.length > 1) {
            throw new Error("Expecting 1 " + conditions_js_1.PTs.tagName + " but finding " + xml_PTss.length + "!");
        }
        let attributes = (0, xml_js_1.getAttributes)(xml_PTss[0]);
        let xml_PTPairs = xml_PTss[0].getElementsByTagName(conditions_js_1.PTpair.tagName);
        if (xml_PTPairs.length == 0) {
            throw new Error("Expecting 1 or more " + conditions_js_1.PTpair.tagName + " but finding 0!");
        }
        else {
            pTs = new conditions_js_1.PTs(attributes);
            for (let i = 0; i < xml_PTPairs.length; i++) {
                let pTPair = new conditions_js_1.PTpair((0, xml_js_1.getAttributes)(xml_PTPairs[i]));
                pTs.addPTpair(pTPair);
                // Create a container div for P, T and units.
                let pTPairDiv = (0, html_js_1.createFlexDiv)(level2);
                pTsDiv.appendChild(pTPairDiv);
                addP(pTPairDiv, pTPair);
                addAnyUnits(mesmer_js_1.Mesmer.pressureUnits, (0, xml_js_1.getAttributes)(xml_PTPairs[i]), pTPairDiv, conditions_js_1.PTpair.tagName, conditions_js_1.PTpair.tagName, boundary1);
                addT(pTPairDiv, pTPair);
                addExcessReactantConc(pTPairDiv, pTPair);
                addPercentExcessReactantConc(pTPairDiv, pTPair);
                addPrecision(pTPairDiv, pTPair);
                // Add any optional BathGas
                let xml_bathGass = xml_PTPairs[i].getElementsByTagName(conditions_js_1.BathGas.tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) {
                        console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    }
                    let bathGasValue = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGass[0]));
                    let bathGas = new conditions_js_1.BathGas((0, xml_js_1.getAttributes)(xml_bathGass[0]), bathGasValue);
                    pTPair.setBathGas(bathGas);
                }
                addBathGas(pTPairDiv, pTPair, i);
                // Add any optional ExperimentRate
                let xml_experimentRates = xml_PTPairs[i].getElementsByTagName(conditions_js_1.ExperimentRate.tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) {
                        console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    }
                    let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_experimentRates[0]));
                    let experimentRate = new conditions_js_1.ExperimentRate((0, xml_js_1.getAttributes)(xml_experimentRates[0]), parseFloat(valueString));
                    pTPair.setExperimentRate(experimentRate);
                    // Create a new div for the ExperimentRate.
                    let id = conditions_js_1.PTpair.tagName + "_" + conditions_js_1.ExperimentRate.tagName;
                    let lwi = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level0, (event) => {
                        let target = event.target;
                        setNumberNode(experimentRate, target);
                    }, experimentRate.value.toExponential(), conditions_js_1.ExperimentRate.tagName);
                    pTPairDiv.appendChild(lwi);
                }
                // Add a remove button.
                let removeButton = (0, html_js_1.createButton)(removeString, boundary1);
                removeButton.addEventListener('click', () => {
                    pTsDiv.removeChild(pTPairDiv);
                    pTs.removePTpair(i);
                    pTPair.removeBathGas();
                });
                pTPairDiv.appendChild(removeButton);
            }
        }
    }
    else {
        pTs = new conditions_js_1.PTs(new Map());
    }
    conditions.setPTs(pTs);
    // Add collapsible div.
    conditionsDiv.appendChild((0, html_js_1.getCollapsibleDiv)({
        content: pTsDiv,
        buttonLabel: conditions_js_1.PTs.name,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: conditions_js_1.BathGas.tagName
    }));
    // Create an add button to add a new PTpair.
    let addButton = (0, html_js_1.createButton)(addString, level2);
    pTsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', () => {
        // Create a new PTpair.
        let pTPairAttributes = new Map();
        pTPairAttributes.set("units", "Torr");
        let pTPair = new conditions_js_1.PTpair(pTPairAttributes);
        let pTPairIndex = pTs.addPTpair(pTPair);
        console.log("Added new pTPair pTPairIndex=" + pTPairIndex);
        let pTPairDiv = (0, html_js_1.createFlexDiv)(level2);
        pTsDiv.appendChild(pTPairDiv);
        addP(pTPairDiv, pTPair);
        addAnyUnits(mesmer_js_1.Mesmer.pressureUnits, pTPairAttributes, pTPairDiv, conditions_js_1.PTpair.tagName, conditions_js_1.PTpair.tagName, boundary1);
        addT(pTPairDiv, pTPair);
        addExcessReactantConc(pTPairDiv, pTPair);
        addPercentExcessReactantConc(pTPairDiv, pTPair);
        addPrecision(pTPairDiv, pTPair);
        addBathGas(pTPairDiv, pTPair, pTPairIndex);
        addExperimentRateButton(pTPairDiv, pTPair);
        // Add a remove button.
        let removeButton = (0, html_js_1.createButton)(removeString, boundary1);
        removeButton.addEventListener('click', () => {
            pTsDiv.removeChild(pTPairDiv);
            pTs.removePTpair(pTPairIndex);
        });
        pTPairDiv.appendChild(removeButton);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, html_js_1.createButton)(s_Add_from_spreadsheet, boundary1);
    pTsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, html_js_1.createFlexDiv)(level2);
        let addFromSpreadsheetId = conditions_js_1.PTs.tagName + "_" + "addFromSpreadsheet";
        let inputElement = (0, html_js_1.createInput)("text", addFromSpreadsheetId, level2);
        div.appendChild(inputElement);
        pTsDiv.insertBefore(div, addButton);
        // Add an event listener to the inputElement.
        inputElement.addEventListener('change', () => {
            console.log("inputElement.value=" + inputElement.value);
            console.log("inputElement.value.length=" + inputElement.value.length);
            if (inputElement.value.length > 0) {
                let pTPairsArray = inputElement.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTPairsArray[0].split("\t").forEach((value, i) => {
                    index.set(value, i);
                });
                console.log("pTPairsArray.length=" + pTPairsArray.length);
                for (let i = 1; i < pTPairsArray.length; i++) {
                    let pTPairArray = pTPairsArray[i].split("\t");
                    let pIndex = index.get("P");
                    let p = parseFloat(pTPairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTPairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTPairArray[unitsIndex];
                        pTPairAttributes.set("units", units);
                    }
                    let pTPair = new conditions_js_1.PTpair(pTPairAttributes);
                    pTs.addPTpair(pTPair);
                    let bathGasIndex = index.get("me:bathGas");
                    let tIndex = index.get("T");
                    let t = parseFloat(pTPairArray[tIndex]);
                    pTPair.setP(p);
                    pTPair.setT(t);
                    let precisionIndex = index.get("precision");
                    if (index.has("precision")) {
                        let precision = pTPairArray[precisionIndex];
                        pTPairAttributes.set("precision", precision);
                    }
                    if (index.has("me:bathGas")) {
                        let bathGas = pTPairArray[bathGasIndex];
                        pTPair.setBathGas(new conditions_js_1.BathGas(new Map(), bathGas));
                    }
                    console.log("pTPair=" + pTPair);
                    let pTPairDiv = (0, html_js_1.createFlexDiv)(level2);
                    pTsDiv.appendChild(pTPairDiv);
                    addP(pTPairDiv, pTPair);
                    addAnyUnits(mesmer_js_1.Mesmer.pressureUnits, pTPairAttributes, pTPairDiv, conditions_js_1.PTpair.tagName, conditions_js_1.PTpair.tagName, boundary1);
                    addT(pTPairDiv, pTPair);
                    addPercentExcessReactantConc(pTPairDiv, pTPair);
                    addExcessReactantConc(pTPairDiv, pTPair);
                    addPrecision(pTPairDiv, pTPair);
                    addBathGas(pTPairDiv, pTPair, i);
                    console.log(addButton); // Check the value of addButton
                    console.log(pTsDiv); // Check the value of pTsDiv
                    pTsDiv.insertBefore(pTPairDiv, addButton);
                    // Add a remove button.
                    let removeButton = (0, html_js_1.createButton)(removeString, boundary1);
                    removeButton.addEventListener('click', () => {
                        pTsDiv.removeChild(pTPairDiv);
                        pTs.removePTpair(i);
                        pTPair.removeBathGas();
                    });
                    pTPairDiv.appendChild(removeButton);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    return conditionsDiv;
}
/**
 * @param pTPairDiv The container div.
 * @param pTPair The PTpair.
 */
function addP(pTPairDiv, pTPair) {
    let lwi = (0, html_js_1.createLabelWithInput)("number", conditions_js_1.PTpair.tagName + "_" + "P", boundary1, level0, (event) => {
        let target = event.target;
        if ((0, util_js_1.isNumeric)(target.value)) {
            pTPair.setP(parseFloat(target.value));
            console.log("Set P to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = pTPair.getP().toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, pTPair.getP().toExponential(), "P");
    let input = lwi.querySelector('input');
    input.value = pTPair.getP().toString();
    (0, html_js_1.resizeInputElement)(input);
    pTPairDiv.appendChild(lwi);
}
/**
 * @param pTPairDiv The container div.
 * @param pTPair The PTpair.
 */
function addT(pTPairDiv, pTPair) {
    let lwi = (0, html_js_1.createLabelWithInput)("number", conditions_js_1.PTpair.tagName + "_" + "T", boundary1, level0, (event) => {
        let target = event.target;
        if ((0, util_js_1.isNumeric)(target.value)) {
            pTPair.setT(parseFloat(target.value));
            console.log("Set T to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = pTPair.getT().toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, pTPair.getT().toExponential(), "T");
    let input = lwi.querySelector('input');
    input.value = pTPair.getT().toString();
    (0, html_js_1.resizeInputElement)(input);
    pTPairDiv.appendChild(lwi);
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addPercentExcessReactantConc(pTPairDiv, pTPair) {
    let div = (0, html_js_1.createDiv)(boundary1);
    pTPairDiv.append(div);
    let attribute = "percentExcessReactantConc";
    let buttonTextContentSelected = attribute + selected;
    let buttonTextContentDeselected = attribute + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    button.classList.toggle('optionOn');
    let id = conditions_js_1.PTpair.tagName + "_" + attribute + "_input";
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle('optionOn');
        button.classList.toggle('optionOff');
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTPair.attributes.set(attribute, "true");
        }
        else {
            button.textContent = buttonTextContentDeselected;
            pTPair.attributes.delete(attribute);
        }
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addExcessReactantConc(pTPairDiv, pTPair) {
    let div = (0, html_js_1.createDiv)(boundary1);
    pTPairDiv.append(div);
    let attribute = "excessReactantConc";
    let buttonTextContentSelected = attribute + selected;
    let buttonTextContentDeselected = attribute + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    button.classList.toggle('optionOn');
    let id = conditions_js_1.PTpair.tagName + "_" + attribute + "_input";
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle('optionOn');
        button.classList.toggle('optionOff');
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = (0, html_js_1.createInput)("number", id, boundary1);
            input.value = NaN.toString();
            input.addEventListener('change', (event) => {
                let target = event.target;
                pTPair.setExcessReactantConc(target.value);
                console.log("Set excessReactantConc to " + target.value);
                (0, html_js_1.resizeInputElement)(target);
            });
            (0, html_js_1.resizeInputElement)(input);
            div.insertBefore(input, button.nextSibling);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            document.getElementById(id)?.remove();
        }
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addPrecision(pTPairDiv, pTPair) {
    let div = (0, html_js_1.createDiv)(boundary1);
    pTPairDiv.append(div);
    let tagName = "precision";
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    button.classList.toggle('optionOn');
    let id = conditions_js_1.PTpair.tagName + "_" + tagName + "_select";
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle('optionOn');
        button.classList.toggle('optionOff');
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let lws = (0, html_js_1.createLabelWithSelect)("precision", mesmer_js_1.Mesmer.precisionOptions, "precision", mesmer_js_1.Mesmer.precisionOptions[0], id, boundary1, boundary1);
            let select = lws.querySelector('select');
            select.addEventListener('change', (event) => {
                let target = event.target;
                pTPair.setPrecision(target.value);
                console.log("Set precision to " + target.value);
                (0, html_js_1.resizeSelectElement)(target);
            });
            (0, html_js_1.resizeSelectElement)(select);
            div.insertBefore(select, button.nextSibling);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            document.getElementById(id)?.remove();
        }
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 * @param i The index.
 */
function addBathGas(pTPairDiv, pTPair, i) {
    let div = (0, html_js_1.createDiv)(boundary1);
    pTPairDiv.append(div);
    let tagName = conditions_js_1.BathGas.tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let bathGas = pTPair.getBathGas();
    let id = conditions_js_1.PTpair.tagName + "_" + tagName + "_select" + "_" + i;
    if (bathGas == undefined) {
        button.classList.toggle('optionOn');
        button.textContent = buttonTextContentDeselected;
    }
    else {
        button.classList.toggle('optionOff');
        button.textContent = buttonTextContentSelected;
        let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas);
        select.id = id;
        select.addEventListener('change', (event) => {
            let target = event.target;
            pTPair.setBathGas(new conditions_js_1.BathGas(new Map(), target.value));
            console.log("Set bathGas to " + target.value);
            (0, html_js_1.resizeSelectElement)(target);
        });
        (0, html_js_1.resizeSelectElement)(select);
        div.appendChild(select);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle('optionOn');
        button.classList.toggle('optionOff');
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            // Remove the select element.
            (0, html_js_1.remove)(id);
            let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas);
            select.id = id;
            select.addEventListener('change', (event) => {
                let target = event.target;
                pTPair.setBathGas(new conditions_js_1.BathGas(new Map(), target.value));
                console.log("Set bathGas to " + target.value);
                (0, html_js_1.resizeSelectElement)(target);
            });
            (0, html_js_1.resizeSelectElement)(select);
            div.appendChild(select);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            document.getElementById(id)?.remove();
        }
    });
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 */
function createSelectElementBathGas(options, bathGas) {
    if (bathGas == undefined) {
        bathGas = new conditions_js_1.BathGas(new Map(), "");
    }
    let value = bathGas == undefined ? selectAnotherOption : bathGas.value;
    let select = (0, html_js_1.createSelectElement)(options, conditions_js_1.BathGas.tagName, value, conditions_js_1.PTs.tagName + "_" + conditions_js_1.BathGas.tagName, boundary1);
    // Add event listener to selectElement.
    select.addEventListener('change', (event) => {
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as a " + conditions_js_1.BathGas.tagName);
        (0, html_js_1.resizeSelectElement)(target);
    });
    (0, html_js_1.resizeSelectElement)(select);
    return select;
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addExperimentRateButton(pTPairDiv, pTPair) {
    let button = (0, html_js_1.createButton)(addString + " " + conditions_js_1.ExperimentRate.tagName, boundary1);
    //let addExperimentRateDiv: HTMLDivElement = document.createElement("div");
    //addExperimentRateDiv.appendChild(addExperimentRateButton);
    // Add event listener to the addExperimentRateButton.
    button.addEventListener('click', () => {
        let experimentRateDiv = document.createElement("div");
        experimentRateDiv.style.marginLeft = margin5;
        let experimentRate = new conditions_js_1.ExperimentRate(new Map(), NaN);
        pTPair.setExperimentRate(experimentRate);
        // Create a new div element for the input.
        let id = conditions_js_1.PTpair.tagName + "_" + conditions_js_1.ExperimentRate.tagName;
        let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, boundary1, level3, (event) => {
            let target = event.target;
            setNumberNode(experimentRate, target);
            (0, html_js_1.resizeInputElement)(target);
        }, "", conditions_js_1.ExperimentRate.tagName);
        experimentRateDiv.appendChild(inputDiv);
        pTPairDiv.insertBefore(experimentRateDiv, button);
        pTPairDiv.removeChild(button);
    });
}
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function processModelParameters(xml) {
    console.log(modelParameters_js_1.ModelParameters.tagName);
    let modelParametersDiv = (0, html_js_1.createDiv)(boundary1);
    let xml_modelParameters = (0, xml_js_1.getSingularElement)(xml, modelParameters_js_1.ModelParameters.tagName);
    let modelParameters = new modelParameters_js_1.ModelParameters((0, xml_js_1.getAttributes)(xml_modelParameters));
    mesmer.setModelParameters(modelParameters);
    processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    processAutomaticallySetMaxEneModelParameters(modelParameters, xml_modelParameters, modelParametersDiv);
    processEnergyAboveTheTopHill(modelParameters, xml_modelParameters, modelParametersDiv);
    processMaxTemperature(modelParameters, xml_modelParameters, modelParametersDiv);
    return modelParametersDiv;
}
/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */
function processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    modelParametersDiv.appendChild(div);
    let tagName = modelParameters_js_1.GrainSize.tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, html_js_1.createButton)(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
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
        createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        gs = new modelParameters_js_1.GrainSize(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!modelParameters.index.has(modelParameters_js_1.GrainSize.tagName)) {
            createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            document.getElementById(id)?.remove();
            document.getElementById(ids)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param gs The grain size.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */
function createGrainSizeInput(modelParameters, div, gs, id, ids, valueString) {
    modelParameters.setGrainSize(gs);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(gs, event.target);
            (0, html_js_1.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits(mesmer_js_1.Mesmer.energyUnits, gs.attributes, div, ids, modelParameters_js_1.GrainSize.tagName, boundary1);
}
/**
 * Process "me:automaticallySetMaxEne".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processAutomaticallySetMaxEneModelParameters(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    modelParametersDiv.appendChild(div);
    let tagName = control_js_1.AutomaticallySetMaxEne.tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, html_js_1.createButton)(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(button);
    let id = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_input";
    let ids = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_select";
    let asme;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        asme = new control_js_1.AutomaticallySetMaxEne((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        asme = new control_js_1.AutomaticallySetMaxEne(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the AutomaticallySetMaxEne already exists
        if (!modelParameters.index.has(control_js_1.AutomaticallySetMaxEne.tagName)) {
            createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = asme.value.toExponential();
            modelParameters.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param modelParameters The ModelParameters.
 * @param div The div.
 * @param asme The automatically set max energy.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */
function createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString) {
    modelParameters.setAutomaticallySetMaxEne(asme);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(asme, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits(mesmer_js_1.Mesmer.energyUnits, asme.attributes, div, ids, control_js_1.AutomaticallySetMaxEne.tagName, boundary1);
}
/**
 * Process "me:energyAboveTheTopHill".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processEnergyAboveTheTopHill(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    modelParametersDiv.appendChild(div);
    let tagName = modelParameters_js_1.EnergyAboveTheTopHill.tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, html_js_1.createButton)(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(button);
    let id = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_input";
    let ids = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_select";
    let eatth;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        eatth = new modelParameters_js_1.EnergyAboveTheTopHill((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        eatth = new modelParameters_js_1.EnergyAboveTheTopHill(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the EnergyAboveTheTopHill already exists
        if (!modelParameters.index.has(modelParameters_js_1.EnergyAboveTheTopHill.tagName)) {
            createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = eatth.value.toExponential();
            modelParameters.removeEnergyAboveTheTopHill();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param eatth The energy above the top hill.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */
function createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString) {
    modelParameters.setEnergyAboveTheTopHill(eatth);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(eatth, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits(mesmer_js_1.Mesmer.energyUnits, eatth.attributes, div, ids, modelParameters_js_1.EnergyAboveTheTopHill.tagName, boundary1);
}
/**
 * Process "me:maxTemperature".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processMaxTemperature(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    modelParametersDiv.appendChild(div);
    let tagName = modelParameters_js_1.MaxTemperature.tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, html_js_1.createButton)(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(button);
    let id = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_input";
    let ids = modelParameters_js_1.ModelParameters.tagName + "_" + tagName + "_select";
    let mt;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        mt = new modelParameters_js_1.MaxTemperature((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        mt = new modelParameters_js_1.MaxTemperature(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the MaxTemperature already exists
        if (!modelParameters.index.has(modelParameters_js_1.MaxTemperature.tagName)) {
            createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = mt.value.toExponential();
            modelParameters.removeMaxTemperature();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param mt The max temperature.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */
function createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString) {
    modelParameters.setMaxTemperature(mt);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(mt, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits(undefined, mt.attributes, div, ids, modelParameters_js_1.MaxTemperature.tagName, boundary1);
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
    // Create div to contain the controls.
    let controlsDiv = (0, html_js_1.createDiv)(boundary1);
    // Get the XML "me:control" element.
    let xml_control = (0, xml_js_1.getSingularElement)(xml, control_js_1.Control.tagName);
    let control = new control_js_1.Control((0, xml_js_1.getAttributes)(xml_control));
    mesmer.setControl(control);
    // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
    let onOffControls = new Map();
    processCalculateRateCoefficientsOnly(control, onOffControls, xml_control);
    processPrintCellDOS(control, onOffControls, xml_control);
    processPrintCellTransitionStateFlux(control, onOffControls, xml_control);
    processPrintReactionOperatorColumnSums(control, onOffControls, xml_control);
    processPrintGrainBoltzmann(control, onOffControls, xml_control);
    processPrintGrainDOS(control, onOffControls, xml_control);
    processPrintGrainkbE(control, onOffControls, xml_control);
    processPrintGrainkfE(control, onOffControls, xml_control);
    processPrintTSsos(control, onOffControls, xml_control);
    processPrintGrainedSpeciesProfile(control, onOffControls, xml_control);
    processPrintGrainTransitionStateFlux(control, onOffControls, xml_control);
    processPrintReactionOperatorSize(control, onOffControls, xml_control);
    processPrintSpeciesProfile(control, onOffControls, xml_control);
    processPrintPhenomenologicalEvolution(control, onOffControls, xml_control);
    processPrintTunnelingCoefficients(control, onOffControls, xml_control);
    processPrintCrossingCoefficients(control, onOffControls, xml_control);
    processTestDOS(control, onOffControls, xml_control);
    processTestRateConstants(control, onOffControls, xml_control);
    processUseTheSameCellNumberForAllConditions(control, onOffControls, xml_control);
    processForceMacroDetailedBalance(control, onOffControls, xml_control);
    // Create a div for the on/off controls.
    let onOffControlsDiv = (0, html_js_1.createFlexDiv)(level1);
    let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
    orderedOnOffControls.forEach((button) => {
        onOffControlsDiv.appendChild(button);
    });
    controlsDiv.appendChild(onOffControlsDiv);
    // Controls with additional things to set.
    processTestMicroRates(control, controlsDiv, xml_control);
    processCalcMethod(control, controlsDiv, xml_control);
    processEigenvalues(control, controlsDiv, xml_control);
    processShortestTimeOfInterest(control, controlsDiv, xml_control);
    processMaximumEvolutionTime(control, controlsDiv, xml_control);
    processAutomaticallySetMaxEneControl(control, controlsDiv, xml_control);
    processDiagramEnergyOffset(control, controlsDiv, xml_control);
    return controlsDiv;
}
/**
 * Process "me:calculateRateCoefficientsOnly".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processCalculateRateCoefficientsOnly(control, onOffControls, xml_control) {
    let tagName = control_js_1.CalculateRateCoefficientsOnly.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let crco = new control_js_1.CalculateRateCoefficientsOnly();
    if (xml.length == 1) {
        control.setCalculateRateCoefficientsOnly(crco);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the CalculateRateCoefficientsOnly already exists
        if (!control.index.has(control_js_1.CalculateRateCoefficientsOnly.tagName)) {
            control.setCalculateRateCoefficientsOnly(crco);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removeCalculateRateCoefficientsOnly();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printCellDOS".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintCellDOS(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintCellDOS.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pcd = new control_js_1.PrintCellDOS();
    if (xml.length == 1) {
        control.setPrintCellDOS(pcd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintCellDOS already exists
        if (!control.index.has(control_js_1.PrintCellDOS.tagName)) {
            control.setPrintCellDOS(pcd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintCellDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printCellTransitionStateFlux".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintCellTransitionStateFlux(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintCellTransitionStateFlux.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pctsf = new control_js_1.PrintCellTransitionStateFlux();
    if (xml.length == 1) {
        control.setPrintCellTransitionStateFlux(pctsf);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintCellTransitionStateFlux already exists
        if (!control.index.has(control_js_1.PrintCellTransitionStateFlux.tagName)) {
            control.setPrintCellTransitionStateFlux(pctsf);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintCellTransitionStateFlux();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printReactionOperatorColumnSums".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintReactionOperatorColumnSums(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintReactionOperatorColumnSums.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let proc = new control_js_1.PrintReactionOperatorColumnSums();
    if (xml.length == 1) {
        control.setPrintReactionOperatorColumnSums(proc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintReactionOperatorColumnSums already exists
        if (!control.index.has(control_js_1.PrintReactionOperatorColumnSums.tagName)) {
            control.setPrintReactionOperatorColumnSums(proc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintReactionOperatorColumnSums();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printGrainBoltzmann".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintGrainBoltzmann(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintGrainBoltzmann.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgb = new control_js_1.PrintGrainBoltzmann();
    if (xml.length == 1) {
        control.setPrintGrainBoltzmann(pgb);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintGrainBoltzmann already exists
        if (!control.index.has(control_js_1.PrintGrainBoltzmann.tagName)) {
            control.setPrintGrainBoltzmann(pgb);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintGrainBoltzmann();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printGrainDOS".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintGrainDOS(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintGrainDOS.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgd = new control_js_1.PrintGrainDOS();
    if (xml.length == 1) {
        control.setPrintGrainDOS(pgd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintGrainDOS already exists
        if (!control.index.has(control_js_1.PrintGrainDOS.tagName)) {
            control.setPrintGrainDOS(pgd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintGrainDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printGrainkbE".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintGrainkbE(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintGrainkbE.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgkbE = new control_js_1.PrintGrainkbE();
    if (xml.length == 1) {
        control.setPrintGrainkbE(pgkbE);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintGrainkbE already exists
        if (!control.index.has(control_js_1.PrintGrainkbE.tagName)) {
            control.setPrintGrainkbE(pgkbE);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintGrainkbE();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printGrainkfE".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintGrainkfE(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintGrainkfE.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgkfE = new control_js_1.PrintGrainkfE();
    if (xml.length == 1) {
        control.setPrintGrainkfE(pgkfE);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintGrainkfE already exists
        if (!control.index.has(control_js_1.PrintGrainkfE.tagName)) {
            control.setPrintGrainkfE(pgkfE);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintGrainkfE();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printTSsos".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintTSsos(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintTSsos.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pts = new control_js_1.PrintTSsos();
    if (xml.length == 1) {
        control.setPrintTSsos(pts);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintTSsos already exists
        if (!control.index.has(control_js_1.PrintTSsos.tagName)) {
            control.setPrintTSsos(pts);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintTSsos();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printGrainedSpeciesProfile".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintGrainedSpeciesProfile(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintGrainedSpeciesProfile.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgsp = new control_js_1.PrintGrainedSpeciesProfile();
    if (xml.length == 1) {
        control.setPrintGrainedSpeciesProfile(pgsp);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintGrainedSpeciesProfile already exists
        if (!control.index.has(control_js_1.PrintGrainedSpeciesProfile.tagName)) {
            control.setPrintGrainedSpeciesProfile(pgsp);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintGrainedSpeciesProfile();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printGrainTransitionStateFlux".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintGrainTransitionStateFlux(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintGrainTransitionStateFlux.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgtsf = new control_js_1.PrintGrainTransitionStateFlux();
    if (xml.length == 1) {
        control.setPrintGrainTransitionStateFlux(pgtsf);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintGrainTransitionStateFlux already exists
        if (!control.index.has(control_js_1.PrintGrainTransitionStateFlux.tagName)) {
            control.setPrintGrainTransitionStateFlux(pgtsf);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintGrainTransitionStateFlux();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printReactionOperatorSize".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintReactionOperatorSize(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintReactionOperatorSize.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pros = new control_js_1.PrintReactionOperatorSize();
    if (xml.length == 1) {
        control.setPrintReactionOperatorSize(pros);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintReactionOperatorSize already exists
        if (!control.index.has(control_js_1.PrintReactionOperatorSize.tagName)) {
            control.setPrintReactionOperatorSize(pros);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintReactionOperatorSize();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printSpeciesProfile".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintSpeciesProfile(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintSpeciesProfile.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let psp = new control_js_1.PrintSpeciesProfile();
    if (xml.length == 1) {
        control.setPrintSpeciesProfile(psp);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintSpeciesProfile already exists
        if (!control.index.has(control_js_1.PrintSpeciesProfile.tagName)) {
            control.setPrintSpeciesProfile(psp);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintSpeciesProfile();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printPhenomenologicalEvolution".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintPhenomenologicalEvolution(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintPhenomenologicalEvolution.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let ppe = new control_js_1.PrintPhenomenologicalEvolution();
    if (xml.length == 1) {
        control.setPrintPhenomenologicalEvolution(ppe);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintPhenomenologicalEvolution already exists
        if (!control.index.has(control_js_1.PrintPhenomenologicalEvolution.tagName)) {
            control.setPrintPhenomenologicalEvolution(ppe);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintPhenomenologicalEvolution();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printTunnelingCoefficients".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintTunnelingCoefficients(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintTunnelingCoefficients.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let ptc = new control_js_1.PrintTunnelingCoefficients();
    if (xml.length == 1) {
        control.setPrintTunnelingCoefficients(ptc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintTunnelingCoefficients already exists
        if (!control.index.has(control_js_1.PrintTunnelingCoefficients.tagName)) {
            control.setPrintTunnelingCoefficients(ptc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintTunnelingCoefficients();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:printCrossingCoefficients".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processPrintCrossingCoefficients(control, onOffControls, xml_control) {
    let tagName = control_js_1.PrintCrossingCoefficients.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pcc = new control_js_1.PrintCrossingCoefficients();
    if (xml.length == 1) {
        control.setPrintCrossingCoefficients(pcc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the PrintCrossingCoefficients already exists
        if (!control.index.has(control_js_1.PrintCrossingCoefficients.tagName)) {
            control.setPrintCrossingCoefficients(pcc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removePrintCrossingCoefficients();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:testDOS".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processTestDOS(control, onOffControls, xml_control) {
    let tagName = control_js_1.TestDOS.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let tdos = new control_js_1.TestDOS();
    if (xml.length == 1) {
        control.setTestDOS(tdos);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the TestDOS already exists
        if (!control.index.has(control_js_1.TestDOS.tagName)) {
            control.setTestDOS(tdos);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removeTestDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:testRateConstants".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processTestRateConstants(control, onOffControls, xml_control) {
    let tagName = control_js_1.TestRateConstants.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let trc = new control_js_1.TestRateConstants();
    if (xml.length == 1) {
        control.setTestRateConstants(trc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the TestRateConstants already exists
        if (!control.index.has(control_js_1.TestRateConstants.tagName)) {
            control.setTestRateConstants(trc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removeTestRateConstants();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:useTheSameCellNumberForAllConditions".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processUseTheSameCellNumberForAllConditions(control, onOffControls, xml_control) {
    let tagName = control_js_1.UseTheSameCellNumberForAllConditions.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let utsnfac = new control_js_1.UseTheSameCellNumberForAllConditions();
    if (xml.length == 1) {
        control.setUseTheSameCellNumberForAllConditions(utsnfac);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the UseTheSameCellNumberForAllConditions already exists
        if (!control.index.has(control_js_1.UseTheSameCellNumberForAllConditions.tagName)) {
            control.setUseTheSameCellNumberForAllConditions(utsnfac);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removeUseTheSameCellNumberForAllConditions();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:forceMacroDetailedBalance".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */
function processForceMacroDetailedBalance(control, onOffControls, xml_control) {
    let tagName = control_js_1.ForceMacroDetailedBalance.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let fmd = new control_js_1.ForceMacroDetailedBalance();
    if (xml.length == 1) {
        control.setForceMacroDetailedBalance(fmd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the ForceMacroDetailedBalance already exists
        if (!control.index.has(control_js_1.ForceMacroDetailedBalance.tagName)) {
            control.setForceMacroDetailedBalance(fmd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removeForceMacroDetailedBalance();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processTestMicroRates(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.TestMicroRates.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(tagName, boundary1);
    button.id = control_js_1.Control.tagName + "_" + tagName;
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let idTmax = control_js_1.Control.tagName + "_" + tagName + "_Tmax";
    let idTmin = control_js_1.Control.tagName + "_" + tagName + "_Tmin";
    let idTstep = control_js_1.Control.tagName + "_" + tagName + "_Tstep";
    if (xml.length == 1) {
        button.textContent = buttonTextContentSelected;
        createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
        button.classList.toggle('optionOff');
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
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
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
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
    if (xml_tmr.length == 1) {
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
 * Process "me:calcMethod".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processCalcMethod(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.CalcMethod.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    // Add the div for the CalcMethod.    
    let divCm = (0, html_js_1.createFlexDiv)(boundary1);
    divCm.id = divCmId;
    div.appendChild(divCm);
    let options = control_js_1.CalcMethod.options;
    let ids = divCmDetailsId + "_select";
    let cm;
    if (xml.length > 0) {
        if (xml.length > 1) {
            throw new Error("More than one CalcMethod element.");
        }
        button.classList.toggle('optionOff');
        button.textContent = buttonTextContentSelected;
        let attributes = (0, xml_js_1.getAttributes)(xml[0]);
        let xsi_type = attributes.get("xsi:type");
        // Create the select element.
        let select = createSelectElementCalcMethod(control, div, options, tagName, xsi_type, ids);
        // Set the select element to the correct value.
        select.value = xsi_type;
        divCm.appendChild(select);
        // Add the details div.
        let divCmDetails = (0, html_js_1.createFlexDiv)(boundary1);
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
            // MarquardtIterations.
            let mi_xml = xml[0].getElementsByTagName(control_js_1.MarquardtIterations.tagName);
            if (mi_xml.length > 0) {
                if (mi_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(mi_xml[0])));
                    let marquardtIterations = new control_js_1.MarquardtIterations((0, xml_js_1.getAttributes)(mi_xml[0]), value);
                    cmm.setMarquardtIterations(marquardtIterations);
                }
                else {
                    throw new Error("More than one MarquardtIterations element.");
                }
            }
            // MarquardtTolerance.
            let mt_xml = xml[0].getElementsByTagName(control_js_1.MarquardtTolerance.tagName);
            if (mt_xml.length > 0) {
                if (mt_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(mt_xml[0])));
                    let marquardtTolerance = new control_js_1.MarquardtTolerance((0, xml_js_1.getAttributes)(mt_xml[0]), value);
                    cmm.setMarquardtTolerance(marquardtTolerance);
                }
                else {
                    throw new Error("More than one MarquardtTolerance element.");
                }
            }
            // MarquardtDerivDelta.
            let mdd_xml = xml[0].getElementsByTagName(control_js_1.MarquardtDerivDelta.tagName);
            if (mdd_xml.length > 0) {
                if (mdd_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(mdd_xml[0])));
                    let marquardtDerivDelta = new control_js_1.MarquardtDerivDelta((0, xml_js_1.getAttributes)(mdd_xml[0]), value);
                    cmm.setMarquardtDerivDelta(marquardtDerivDelta);
                }
                else {
                    throw new Error("More than one MarquardtDerivDelta element.");
                }
            }
            processCalcMethodMarquardt(divCmDetails, cmm);
        }
        else if (xsi_type == control_js_1.CalcMethodAnalyticalRepresentation.xsi_type || xsi_type == control_js_1.CalcMethodAnalyticalRepresentation.xsi_type2) {
            let cmar = new control_js_1.CalcMethodAnalyticalRepresentation(attributes);
            cm = cmar;
            // Format.
            let format_xml = xml[0].getElementsByTagName(control_js_1.Format.tagName);
            if (format_xml.length > 0) {
                if (format_xml.length == 1) {
                    let value = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(format_xml[0]));
                    let format = new control_js_1.Format((0, xml_js_1.getAttributes)(format_xml[0]), value);
                    cmar.setFormat(format);
                }
                else {
                    throw new Error("More than one Format element.");
                }
            }
            // Precision.
            let precision_xml = xml[0].getElementsByTagName(control_js_1.Precision.tagName);
            if (precision_xml.length > 0) {
                if (precision_xml.length == 1) {
                    let value = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(precision_xml[0]));
                    let precision = new control_js_1.Precision((0, xml_js_1.getAttributes)(precision_xml[0]), value);
                    cmar.setPrecision(precision);
                }
                else {
                    throw new Error("More than one Precision element.");
                }
            }
            // ChebNumTemp.
            let chebNumTemp_xml = xml[0].getElementsByTagName(control_js_1.ChebNumTemp.tagName);
            if (chebNumTemp_xml.length > 0) {
                if (chebNumTemp_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebNumTemp_xml[0])));
                    let chebNumTemp = new control_js_1.ChebNumTemp((0, xml_js_1.getAttributes)(chebNumTemp_xml[0]), value);
                    cmar.setChebNumTemp(chebNumTemp);
                }
                else {
                    throw new Error("More than one ChebNumTemp element.");
                }
            }
            // ChebNumConc.
            let chebNumConc_xml = xml[0].getElementsByTagName(control_js_1.ChebNumConc.tagName);
            if (chebNumConc_xml.length > 0) {
                if (chebNumConc_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebNumConc_xml[0])));
                    let chebNumConc = new control_js_1.ChebNumConc((0, xml_js_1.getAttributes)(chebNumConc_xml[0]), value);
                    cmar.setChebNumConc(chebNumConc);
                }
                else {
                    throw new Error("More than one ChebNumConc element.");
                }
            }
            // ChebMaxTemp.
            let chebMaxTemp_xml = xml[0].getElementsByTagName(control_js_1.ChebMaxTemp.tagName);
            if (chebMaxTemp_xml.length > 0) {
                if (chebMaxTemp_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebMaxTemp_xml[0])));
                    let chebMaxTemp = new control_js_1.ChebMaxTemp((0, xml_js_1.getAttributes)(chebMaxTemp_xml[0]), value);
                    cmar.setChebMaxTemp(chebMaxTemp);
                }
                else {
                    throw new Error("More than one ChebMaxTemp element.");
                }
            }
            // ChebMinTemp.
            let chebMinTemp_xml = xml[0].getElementsByTagName(control_js_1.ChebMinTemp.tagName);
            if (chebMinTemp_xml.length > 0) {
                if (chebMinTemp_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebMinTemp_xml[0])));
                    let chebMinTemp = new control_js_1.ChebMinTemp((0, xml_js_1.getAttributes)(chebMinTemp_xml[0]), value);
                    cmar.setChebMinTemp(chebMinTemp);
                }
                else {
                    throw new Error("More than one ChebMinTemp element.");
                }
            }
            // ChebMaxConc.
            let chebMaxConc_xml = xml[0].getElementsByTagName(control_js_1.ChebMaxConc.tagName);
            if (chebMaxConc_xml.length > 0) {
                if (chebMaxConc_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebMaxConc_xml[0])));
                    let chebMaxConc = new control_js_1.ChebMaxConc((0, xml_js_1.getAttributes)(chebMaxConc_xml[0]), value);
                    cmar.setChebMaxConc(chebMaxConc);
                }
                else {
                    throw new Error("More than one ChebMaxConc element.");
                }
            }
            // ChebMinConc.
            let chebMinConc_xml = xml[0].getElementsByTagName(control_js_1.ChebMinConc.tagName);
            if (chebMinConc_xml.length > 0) {
                if (chebMinConc_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebMinConc_xml[0])));
                    let chebMinConc = new control_js_1.ChebMinConc((0, xml_js_1.getAttributes)(chebMinConc_xml[0]), value);
                    cmar.setChebMinConc(chebMinConc);
                }
                else {
                    throw new Error("More than one ChebMinConc element.");
                }
            }
            // ChebTExSize.
            let chebTExSize_xml = xml[0].getElementsByTagName(control_js_1.ChebTExSize.tagName);
            if (chebTExSize_xml.length > 0) {
                if (chebTExSize_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebTExSize_xml[0])));
                    let chebTExSize = new control_js_1.ChebTExSize((0, xml_js_1.getAttributes)(chebTExSize_xml[0]), value);
                    cmar.setChebTExSize(chebTExSize);
                }
                else {
                    throw new Error("More than one ChebTExSize element.");
                }
            }
            // ChebPExSize.
            let chebPExSize_xml = xml[0].getElementsByTagName(control_js_1.ChebPExSize.tagName);
            if (chebPExSize_xml.length > 0) {
                if (chebPExSize_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(chebPExSize_xml[0])));
                    let chebPExSize = new control_js_1.ChebPExSize((0, xml_js_1.getAttributes)(chebPExSize_xml[0]), value);
                    cmar.setChebPExSize(chebPExSize);
                }
                else {
                    throw new Error("More than one ChebPExSize element.");
                }
            }
            processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
        }
        else if (xsi_type == control_js_1.CalcMethodThermodynamicTable.xsi_type || xsi_type == control_js_1.CalcMethodThermodynamicTable.xsi_type2) {
            let cmtt = new control_js_1.CalcMethodThermodynamicTable(attributes);
            cm = cmtt;
            // Tmin.
            let tmin_xml = xml[0].getElementsByTagName(control_js_1.Tmin.tagName);
            if (tmin_xml.length > 0) {
                if (tmin_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(tmin_xml[0])));
                    let tmin = new control_js_1.Tmin((0, xml_js_1.getAttributes)(tmin_xml[0]), value);
                    cmtt.setTmin(tmin);
                }
                else {
                    throw new Error("More than one Tmin element.");
                }
            }
            // Tmid.
            let tmid_xml = xml[0].getElementsByTagName(control_js_1.Tmid.tagName);
            if (tmid_xml.length > 0) {
                if (tmid_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(tmid_xml[0])));
                    let tmid = new control_js_1.Tmid((0, xml_js_1.getAttributes)(tmid_xml[0]), value);
                    cmtt.setTmid(tmid);
                }
                else {
                    throw new Error("More than one Tmid element.");
                }
            }
            // Tmax.
            let tmax_xml = xml[0].getElementsByTagName(control_js_1.Tmax.tagName);
            if (tmax_xml.length > 0) {
                if (tmax_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(tmax_xml[0])));
                    let tmax = new control_js_1.Tmax((0, xml_js_1.getAttributes)(tmax_xml[0]), value);
                    cmtt.setTmax(tmax);
                }
                else {
                    throw new Error("More than one Tmax element.");
                }
            }
            // Tstep.
            let tstep_xml = xml[0].getElementsByTagName(control_js_1.Tstep.tagName);
            if (tstep_xml.length > 0) {
                if (tstep_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(tstep_xml[0])));
                    let tstep = new control_js_1.Tstep((0, xml_js_1.getAttributes)(tstep_xml[0]), value);
                    cmtt.setTstep(tstep);
                }
                else {
                    throw new Error("More than one Tstep element.");
                }
            }
            processCalcMethodThermodynamicTable(divCmDetails, cmtt);
        }
        else if (xsi_type == control_js_1.CalcMethodSensitivityAnalysis.xsi_type || xsi_type == control_js_1.CalcMethodSensitivityAnalysis.xsi_type2) {
            let cmsa = new control_js_1.CalcMethodSensitivityAnalysis(attributes);
            cm = cmsa;
            // SensitivityAnalysisSamples.
            let sas_xml = xml[0].getElementsByTagName(control_js_1.SensitivityAnalysisSamples.tagName);
            if (sas_xml.length > 0) {
                if (sas_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(sas_xml[0])));
                    let sensitivityAnalysisSamples = new control_js_1.SensitivityAnalysisSamples((0, xml_js_1.getAttributes)(sas_xml[0]), value);
                    cmsa.setSensitivityAnalysisSamples(sensitivityAnalysisSamples);
                }
                else {
                    throw new Error("More than one SensitivityAnalysisSamples element.");
                }
            }
            // SensitivityAnalysisOrder.
            let sao_xml = xml[0].getElementsByTagName(control_js_1.SensitivityAnalysisOrder.tagName);
            if (sao_xml.length > 0) {
                if (sao_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(sao_xml[0])));
                    let sensitivityAnalysisOrder = new control_js_1.SensitivityAnalysisOrder((0, xml_js_1.getAttributes)(sao_xml[0]), value);
                    cmsa.setSensitivityAnalysisOrder(sensitivityAnalysisOrder);
                }
                else {
                    throw new Error("More than one SensitivityAnalysisOrder element.");
                }
            }
            // SensitivityNumVarRedIters.
            let snvri_xml = xml[0].getElementsByTagName(control_js_1.SensitivityNumVarRedIters.tagName);
            if (snvri_xml.length > 0) {
                if (snvri_xml.length == 1) {
                    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(snvri_xml[0])));
                    let sensitivityNumVarRedIters = new control_js_1.SensitivityNumVarRedIters((0, xml_js_1.getAttributes)(snvri_xml[0]), value);
                    cmsa.setSensitivityNumVarRedIters(sensitivityNumVarRedIters);
                }
                else {
                    throw new Error("More than one SensitivityNumVarRedIters element.");
                }
            }
            // SensitivityVarRedMethod.
            let svrm_xml = xml[0].getElementsByTagName(control_js_1.SensitivityVarRedMethod.tagName);
            if (svrm_xml.length > 0) {
                if (svrm_xml.length == 1) {
                    let value = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(svrm_xml[0]));
                    let sensitivityVarRedMethod = new control_js_1.SensitivityVarRedMethod((0, xml_js_1.getAttributes)(svrm_xml[0]), value);
                    cmsa.setSensitivityVarRedMethod(sensitivityVarRedMethod);
                }
            }
            processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
        }
        else {
            throw new Error("Unknown xsi:type: " + xsi_type);
        }
        control.setCalcMethod(cm);
        // The select element should have 
    }
    else {
        button.classList.toggle('optionOn');
        button.textContent = buttonTextContentDeselected;
    }
    let first = true;
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                options.push(selectAnotherOption);
            }
            // Remove any existing select.
            document.getElementById(ids)?.remove();
            document.getElementById(divCmDetailsId)?.remove();
            // Create the select element.
            let select = createSelectElementCalcMethod(control, div, options, tagName, selectAnotherOption, ids);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            control.removeCalcMethod();
            // Remove any existing div.
            document.getElementById(ids)?.remove();
            document.getElementById(divCmDetailsId)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */
function processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fittingIterations = cm.getFittingIterations() || new control_js_1.FittingIterations(new Map(), NaN);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_FittingIterations_input", boundary1, level0, (event) => {
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
    // MarquardtIterations.
    let marquardtIterations = cm.getMarquardtIterations() || new control_js_1.MarquardtIterations(new Map(), NaN);
    cm.setMarquardtIterations(marquardtIterations);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_MarquardtIterations_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            marquardtIterations.value = parseInt(target.value);
            console.log("Set MarquardtIterations to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = marquardtIterations.value.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, marquardtIterations.value.toString(), control_js_1.MarquardtIterations.tagName));
    // MarquardtTolerance.
    let marquardtTolerance = cm.getMarquardtTolerance() || new control_js_1.MarquardtTolerance(new Map(), NaN);
    cm.setMarquardtTolerance(marquardtTolerance);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_MarquardtTolerance_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            marquardtTolerance.value = parseFloat(target.value);
            console.log("Set MarquardtTolerance to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = marquardtTolerance.value.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, marquardtTolerance.value.toString(), control_js_1.MarquardtTolerance.tagName));
    // MarquardtDerivDelta.
    let marquardtDerivDelta = cm.getMarquardtDerivDelta() || new control_js_1.MarquardtDerivDelta(new Map(), NaN);
    cm.setMarquardtDerivDelta(marquardtDerivDelta);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_MarquardtDerivDelta_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            marquardtDerivDelta.value = parseFloat(target.value);
            console.log("Set MarquardtDerivDelta to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = marquardtDerivDelta.value.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, marquardtDerivDelta.value.toString(), control_js_1.MarquardtDerivDelta.tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */
function processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new control_js_1.Format(new Map(), control_js_1.Format.options[0]);
    // Format value.
    cm.setFormat(format);
    let lwsFormat = (0, html_js_1.createLabelWithSelect)(control_js_1.Format.tagName, control_js_1.Format.options, control_js_1.Format.tagName, format.value, divCmDetailsId + control_js_1.Format.tagName + "_select", boundary1, boundary1);
    lwsFormat.querySelector('select')?.addEventListener('change', (event) => {
        let target = event.target;
        format.value = target.value;
        console.log("Set Format to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    divCmDetails.appendChild(lwsFormat);
    // Format rateUnits.
    let value = control_js_1.Format.rateUnitsOptions[0];
    format.setRateUnits(value);
    let lwsFormatRateUnits = (0, html_js_1.createLabelWithSelect)(control_js_1.Format.rateUnits, control_js_1.Format.rateUnitsOptions, control_js_1.Format.rateUnits, value, divCmDetailsId + control_js_1.Format.rateUnits + "_select", boundary1, boundary1);
    lwsFormatRateUnits.querySelector('select')?.addEventListener('change', (event) => {
        let target = event.target;
        format.setRateUnits(target.value);
        console.log("Set Format rateUnits to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    divCmDetails.appendChild(lwsFormatRateUnits);
    // "me:precision".
    let precision = cm.getPrecision() || new control_js_1.Precision(new Map(), mesmer_js_1.Mesmer.precisionOptions[0]);
    cm.setPrecision(precision);
    let lwsPrecision = (0, html_js_1.createLabelWithSelect)(control_js_1.Precision.tagName, mesmer_js_1.Mesmer.precisionOptions, control_js_1.Precision.tagName, precision.value, divCmDetailsId + control_js_1.Precision.tagName + "_select", boundary1, boundary1);
    lwsPrecision.querySelector('select')?.addEventListener('change', (event) => {
        let target = event.target;
        precision.value = target.value;
        console.log("Set Precision to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    divCmDetails.appendChild(lwsPrecision);
    // "me:chebNumTemp".
    let chebNumTemp = cm.getChebNumTemp() || new control_js_1.ChebNumTemp(new Map(), NaN);
    cm.setChebNumTemp(chebNumTemp);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebNumTemp_input", boundary1, level0, (event) => {
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
    // "me:chebNumConc".
    let chebNumConc = cm.getChebNumConc() || new control_js_1.ChebNumConc(new Map(), NaN);
    cm.setChebNumConc(chebNumConc);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebNumConc_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebNumConc.value = parseFloat(target.value);
            console.log("Set ChebNumConc to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebNumConc.value.toString(), control_js_1.ChebNumConc.tagName));
    // "me:chebMaxTemp".
    let chebMaxTemp = cm.getChebMaxTemp() || new control_js_1.ChebMaxTemp(new Map(), NaN);
    cm.setChebMaxTemp(chebMaxTemp);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebMaxTemp_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebMaxTemp.value = parseFloat(target.value);
            console.log("Set ChebMaxTemp to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebMaxTemp.value.toString(), control_js_1.ChebMaxTemp.tagName));
    // "me:chebMinTemp".
    let chebMinTemp = cm.getChebMinTemp() || new control_js_1.ChebMinTemp(new Map(), NaN);
    cm.setChebMinTemp(chebMinTemp);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebMinTemp_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebMinTemp.value = parseFloat(target.value);
            console.log("Set ChebMinTemp to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebMinTemp.value.toString(), control_js_1.ChebMinTemp.tagName));
    // "me:chebMaxConc".
    let chebMaxConc = cm.getChebMaxConc() || new control_js_1.ChebMaxConc(new Map(), NaN);
    cm.setChebMaxConc(chebMaxConc);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebMaxConc_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebMaxConc.value = parseFloat(target.value);
            console.log("Set ChebMaxConc to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebMaxConc.value.toString(), control_js_1.ChebMaxConc.tagName));
    // "me:chebMinConc".
    let chebMinConc = cm.getChebMinConc() || new control_js_1.ChebMinConc(new Map(), NaN);
    cm.setChebMinConc(chebMinConc);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebMinConc_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebMinConc.value = parseFloat(target.value);
            console.log("Set ChebMinConc to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebMinConc.value.toString(), control_js_1.ChebMinConc.tagName));
    // "me:chebTExSize".
    let chebTExSize = cm.getChebTExSize() || new control_js_1.ChebTExSize(new Map(), NaN);
    cm.setChebTExSize(chebTExSize);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebTExSize_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebTExSize.value = parseFloat(target.value);
            console.log("Set ChebTExSize to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebTExSize.value.toString(), control_js_1.ChebTExSize.tagName));
    // "me:chebPExSize".
    let chebPExSize = cm.getChebPExSize() || new control_js_1.ChebPExSize(new Map(), NaN);
    cm.setChebPExSize(chebPExSize);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_ChebPExSize_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            chebPExSize.value = parseFloat(target.value);
            console.log("Set ChebPExSize to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, chebPExSize.value.toString(), control_js_1.ChebPExSize.tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */
function processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin".
    let tmin = cm.getTmin() || new control_js_1.Tmin(new Map(), NaN);
    cm.setTmin(tmin);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_Tmin_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmin.value = parseFloat(target.value);
            console.log("Set Tmin to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tmin.value.toString(), control_js_1.Tmin.tagName));
    // "me:Tmid".
    let tmid = cm.getTmid() || new control_js_1.Tmid(new Map(), NaN);
    cm.setTmid(tmid);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_Tmid_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmid.value = parseFloat(target.value);
            console.log("Set Tmid to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tmid.value.toString(), control_js_1.Tmid.tagName));
    // "me:Tmax".
    let tmax = cm.getTmax() || new control_js_1.Tmax(new Map(), NaN);
    cm.setTmax(tmax);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_Tmax_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tmax.value = parseFloat(target.value);
            console.log("Set Tmax to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tmax.value.toString(), control_js_1.Tmax.tagName));
    // "me:Tstep".
    let tstep = cm.getTstep() || new control_js_1.Tstep(new Map(), NaN);
    cm.setTstep(tstep);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_Tstep_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            tstep.value = parseFloat(target.value);
            console.log("Set Tstep to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, tstep.value.toString(), control_js_1.Tstep.tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */
function processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples".
    let sensitivityAnalysisSamples = cm.getSensitivityAnalysisSamples() || new control_js_1.SensitivityAnalysisSamples(new Map(), NaN);
    cm.setSensitivityAnalysisSamples(sensitivityAnalysisSamples);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_SensitivityAnalysisSamples_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            sensitivityAnalysisSamples.value = parseFloat(target.value);
            console.log("Set SensitivityAnalysisSamples to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, sensitivityAnalysisSamples.value.toString(), control_js_1.SensitivityAnalysisSamples.tagName));
    // "me:sensitivityAnalysisOrder".
    let sensitivityAnalysisOrder = cm.getSensitivityAnalysisOrder() || new control_js_1.SensitivityAnalysisOrder(new Map(), NaN);
    cm.setSensitivityAnalysisOrder(sensitivityAnalysisOrder);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_SensitivityAnalysisOrder_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            sensitivityAnalysisOrder.value = parseFloat(target.value);
            console.log("Set SensitivityAnalysisOrder to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, sensitivityAnalysisOrder.value.toString(), control_js_1.SensitivityAnalysisOrder.tagName));
    // "me:sensitivityNumVarRedIters".
    let sensitivityNumVarRedIters = cm.getSensitivityNumVarRedIters() || new control_js_1.SensitivityNumVarRedIters(new Map(), NaN);
    cm.setSensitivityNumVarRedIters(sensitivityNumVarRedIters);
    divCmDetails.appendChild((0, html_js_1.createLabelWithInput)("number", divCmDetailsId + "_SensitivityNumVarRedIters_input", boundary1, level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_js_1.isNumeric)(target.value)) {
            sensitivityNumVarRedIters.value = parseFloat(target.value);
            console.log("Set SensitivityNumVarRedIters to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, html_js_1.resizeInputElement)(target);
    }, sensitivityNumVarRedIters.value.toString(), control_js_1.SensitivityNumVarRedIters.tagName));
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new control_js_1.SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    divCmDetails.appendChild((0, html_js_1.createLabelWithSelect)(control_js_1.SensitivityVarRedMethod.tagName, control_js_1.SensitivityVarRedMethod.options, control_js_1.SensitivityVarRedMethod.tagName, control_js_1.SensitivityVarRedMethod.options[0], divCmDetailsId + control_js_1.SensitivityVarRedMethod.tagName + "_select", boundary1, boundary1));
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
 * @param control The control.
 * @param div The div.
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param ids The idfor the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */
function createSelectElementCalcMethod(control, div, options, tagName, value, ids) {
    let select = (0, html_js_1.createSelectElement)(options, tagName, value, ids, boundary1);
    div.appendChild(select);
    select.addEventListener('click', (event) => {
        if (options[options.length - 1] == selectAnotherOption) {
            options.pop();
        }
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == selectAnotherOption) {
            select.remove(lastIndex);
        }
    });
    select.addEventListener('change', (event) => {
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) {
            divCmDetails.remove();
        }
        divCmDetails = (0, html_js_1.createFlexDiv)(boundary1);
        divCmDetails.id = divCmDetailsId;
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
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processEigenvalues(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.Eigenvalues.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = control_js_1.Control.tagName + "_" + tagName + "_input";
    let eigenvalues;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        eigenvalues = new control_js_1.Eigenvalues((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createEigenValuesInput(control, div, eigenvalues, id, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        eigenvalues = new control_js_1.Eigenvalues(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the Eigenvalues already exists
        if (!control.index.has(control_js_1.Eigenvalues.tagName)) {
            createEigenValuesInput(control, div, eigenvalues, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = eigenvalues.value.toExponential();
            control.removeEigenvalues();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param eigenvalues The eigenvalues.
 * @param id The id.
 * @param valueString The value string.
 */
function createEigenValuesInput(control, div, eigenvalues, id, valueString) {
    control.setEigenvalues(eigenvalues);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(eigenvalues, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:shortestTimeOfInterest".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processShortestTimeOfInterest(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.ShortestTimeOfInterest.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = control_js_1.Control.tagName + "_" + tagName + "_input";
    let stoi;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        stoi = new control_js_1.ShortestTimeOfInterest((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createShortestTimeOfInterest(control, div, stoi, id, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        stoi = new control_js_1.ShortestTimeOfInterest(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the ShortestTimeOfInterest already exists
        if (!control.index.has(control_js_1.ShortestTimeOfInterest.tagName)) {
            createShortestTimeOfInterest(control, div, stoi, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = stoi.value.toExponential();
            control.removeShortestTimeOfInterest();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param stoi The shortest time of interest.
 * @param id The id.
 * @param valueString The value string.
 */
function createShortestTimeOfInterest(control, div, stoi, id, valueString) {
    control.setShortestTimeOfInterest(stoi);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(stoi, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:MaximumEvolutionTime".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processMaximumEvolutionTime(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.MaximumEvolutionTime.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = control_js_1.Control.tagName + "_" + tagName + "_input";
    let met;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        met = new control_js_1.MaximumEvolutionTime((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createMaximumEvolutionTimeInput(control, div, met, id, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        met = new control_js_1.MaximumEvolutionTime(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the MaximumEvolutionTime already exists
        if (!control.index.has(control_js_1.MaximumEvolutionTime.tagName)) {
            createMaximumEvolutionTimeInput(control, div, met, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = met.value.toExponential();
            control.removeMaximumEvolutionTime();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param met The maximum evolution time.
 * @param id The id.
 * @param valueString The value string.
 */
function createMaximumEvolutionTimeInput(control, div, met, id, valueString) {
    control.setMaximumEvolutionTime(met);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(met, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:automaticallySetMaxEne".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processAutomaticallySetMaxEneControl(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.AutomaticallySetMaxEne.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = control_js_1.Control.tagName + "_" + tagName + "_input";
    let asme;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        asme = new control_js_1.AutomaticallySetMaxEne((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        asme = new control_js_1.AutomaticallySetMaxEne(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the AutomaticallySetMaxEne already exists
        if (!control.index.has(control_js_1.AutomaticallySetMaxEne.tagName)) {
            createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = asme.value.toExponential();
            control.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param asme The automatically set max energy.
 * @param id The id.
 * @param valueString The value string.
 */
function createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString) {
    control.setAutomaticallySetMaxEne(asme);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(asme, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process me:diagramEnergyOffset.
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processDiagramEnergyOffset(control, controlsDiv, xml_control) {
    let div = (0, html_js_1.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let tagName = control_js_1.DiagramEnergyOffset.tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = control_js_1.Control.tagName + "_" + tagName + "_input";
    let deo;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        deo = new control_js_1.DiagramEnergyOffset((0, xml_js_1.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        button.classList.toggle('optionOff');
    }
    else {
        valueString = "";
        deo = new control_js_1.DiagramEnergyOffset(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the DiagramEnergyOffset already exists
        if (!control.index.has(control_js_1.DiagramEnergyOffset.tagName)) {
            createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        }
        else {
            valueString = deo.value.toExponential();
            control.removeDiagramEnergyOffset();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn');
            button.classList.toggle('optionOff');
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param deo The diagram energy offset.
 * @param id The id.
 * @param valueString The value string.
 */
function createDiagramEnergyOffsetInput(control, div, deo, id, valueString) {
    control.setDiagramEnergyOffset(deo);
    let input = (0, html_js_1.createInput)("number", id, boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setNumberNode(deo, target);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
    div.appendChild(input);
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
    console.log("saveXML");
    const pad = "  ";
    // Create a Blob object from the data
    let blob = new Blob([mesmer_js_1.Mesmer.header, mesmer.toXML(pad, pad)], { type: "text/plain" });
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
//# sourceMappingURL=app.js.map