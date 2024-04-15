
//import { openDB } from 'idb';

import { bigToString, get, getID, isNumeric, mapToString, max, min, numberToString, rescale } from './util.js';

import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getAttributes, getSingularElement,
    NumberArrayNode, NumberNode
} from './xml.js';

import {
    Molecule, Atom, Bond, EnergyTransferModel, DeltaEDown, DOSCMethod, Property, AtomArray, BondArray,
    PropertyList, PropertyScalar, PropertyArray, ExtraDOSCMethod, BondRef, HinderedRotorPotential,
    PotentialPoint, Periodicity, ReservoirSize, ZPE, RotConsts, PropertyMatrix, VibFreqs
} from './molecule.js';

import {
    Reaction, TransitionState, ReactionMolecule, Reactant, Product, MCRCMethod, MesmerILT,
    PreExponential, ActivationEnergy, NInfinity, Tunneling, TInfinity, ExcessReactantConc
} from './reaction.js';

import { arrayToString, toNumberArray } from './util.js';

import {
    createLabelWithInput, getCollapsibleDiv, resizeInputElement, createSelectElement,
    resizeSelectElement, createFlexDiv, createButton, remove, createLabel, createInput, createLabelWithSelect,
    createDiv,
    createLabelWithTextArea,
    resizeTextAreaElement,
    s_button,
    sy_upTriangle,
    sy_downTriangle
} from './html.js';

import { drawLevel, drawLine, getTextHeight, getTextWidth } from './canvas.js';

import {
    BathGas, Conditions, ExperimentalRate, ExperimentalEigenvalue, PTpair, PTs, ExperimentalYield
} from './conditions.js';

import { EnergyAboveTheTopHill, GrainSize, MaxTemperature, ModelParameters } from './modelParameters.js';

import {
    Control, DiagramEnergyOffset, Eigenvalues, HideInactive, TestDOS, PrintSpeciesProfile,
    TestMicroRates, TestRateConstant, PrintGrainDOS, PrintCellDOS, PrintReactionOperatorColumnSums,
    PrintTunnelingCoefficients, PrintGrainkfE, PrintGrainBoltzmann, PrintGrainkbE, CalculateRateCoefficientsOnly,
    PrintCellTransitionStateFlux, PrintTSsos, PrintGrainedSpeciesProfile, PrintGrainTransitionStateFlux,
    PrintReactionOperatorSize, PrintPhenomenologicalEvolution, PrintCrossingCoefficients,
    UseTheSameCellNumberForAllConditions, ForceMacroDetailedBalance, CalcMethod, ShortestTimeOfInterest,
    MaximumEvolutionTime, AutomaticallySetMaxEne, CalcMethodMarquardt, MarquardtIterations, MarquardtTolerance,
    MarquardtDerivDelta, CalcMethodAnalyticalRepresentation, Format, Precision, ChebNumTemp, ChebNumConc,
    ChebMaxTemp, ChebMinTemp, ChebMaxConc, ChebMinConc, ChebTExSize, ChebPExSize, CalcMethodThermodynamicTable,
    Tmin, Tmid, Tstep, Tmax, CalcMethodSimpleCalc, CalcMethodGridSearch, CalcMethodFitting, FittingIterations,
    CalcMethodSensitivityAnalysis, SensitivityAnalysisSamples, SensitivityAnalysisOrder, SensitivityNumVarRedIters,
    SensitivityVarRedMethod
} from './control.js';

import { Mesmer, MoleculeList, ReactionList, Title } from './mesmer.js';
import Big from 'big.js';

//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library

/**
 * MXG.
 */
let mxg_url: string = "https://github.com/agdturner/mxg-pwa";
let mxg_a = document.createElement('a');
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;

/**
 * Example data.
 */
let mxgDataExamples_url: string = "https://github.com/agdturner/mxg-pwa/tree/main/data/examples";
let mxgDataExamples_a = document.createElement('a');
mxgDataExamples_a.href = mxgDataExamples_url;
mxgDataExamples_a.textContent = mxgDataExamples_url;

/**
 * MESMER.
 */
let mesmer_url: string = "https://sourceforge.net/projects/mesmer/";
let mesmer_a = document.createElement('a');
mesmer_a.href = mesmer_url;
mesmer_a.textContent = mesmer_url;

/**
 * EPSRC.
 */
let epsrc_url: string = "https://epsrc.ukri.org/";
let epsrc_a = document.createElement('a');
epsrc_a.href = epsrc_url;
epsrc_a.textContent = "The UK Engineering and Physical Sciences Research Council (EPSRC)";

/**
 * University of Leeds
 */
let uol_url: string = "https://www.leeds.ac.uk/";
let uol_a = document.createElement('a');
uol_a.href = uol_url;
uol_a.textContent = "The University of Leeds";

/**
 * 3DMol.
 */
let t3Dmol_url: string = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement('a');
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;
let t3Dmol_citation_url: string = "http://doi.org/10.1093/bioinformatics/btu829";
let t3Dmol_citation_a = document.createElement('a');
t3Dmol_citation_a.href = t3Dmol_citation_url;
t3Dmol_citation_a.textContent = "doi:10.1093/bioinformatics/btu829";

/**
 * Big.js.
 */
let bigjs_url: string = "https://mikemcl.github.io/big.js/";
let bigjs_a = document.createElement('a');
bigjs_a.href = bigjs_url;
bigjs_a.textContent = bigjs_url;

/**
 * The font sizes for different levels of the GUI.
 */
let fontSize: string = "1.0em";

/**
 * Margins for spacing GUI components.
 */
let s_0px: string = "0px";
let s_1px: string = "1px";
let s_25px: string = "25px";
let level0 = { marginLeft: s_0px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
let level1 = { marginLeft: s_25px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_0px };
let boundary1 = { marginLeft: s_1px, marginTop: s_1px, marginBottom: s_1px, marginRight: s_1px };

/**
 * Symbology for the GUI.
 */
// Symbols.
const sy_edit: string = "\u270E"; // ✎
const sy_add: string = "\uFF0B"; // ＋
const sy_remove: string = "\u2715"; // ✕
//const sy_refresh: string = "\u27F3"; // ⟳
const sy_selected: string = " \u2713"; // ✓
const sy_deselected: string = " \u2717"; // ✗

// Strings.
const s_Add_sy_add: string = "Add " + sy_add;
const s_Add_from_spreadsheet: string = "Add from spreadsheet " + sy_add;
const s_container = "s_container";
const s_description: string = "description";
const s_Input: string = "Input";
const s_optionOn = 'optionOn';
const s_optionOff = 'optionOff';
const s_Remove_sy_remove: string = "Remove " + sy_remove;
const s_save: string = "save";
const s_Select: string = "Select";
const s_selectOption: string = "Select an option (use keys to cycle through options)...";

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
let dark: boolean;

// Numbers
const big0: Big = new Big(0);

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
let mesmer: Mesmer;

/**
 * A map of molecules with Molecule ID as key and Molecule as value.
 */
let molecules: Map<string, Molecule>;

/**
 * For storing the maximum molecule energy in a reaction.
 */
let maxMoleculeEnergy: Big;

/**
 * For storing the minimum molecule energy in a reaction.
 */
let minMoleculeEnergy: Big;

/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */
let reactions: Map<string, Reaction>;

/**
 * The Mesmer ids.
 */
let ids: Set<string> = new Set();

/**
 * Add an id to the set of ids.
 * @param parts The parts of the id.
 */
function addID(...parts: any[]): string {
    let validID: string = getID(...parts);
    if (ids.has(validID)) {
        throw new Error(validID + " already exists!");
    }
    ids.add(validID);
    return validID;
}

// IDs for the reactions diagram.
const s_ReactionsDiagram: string = "Reactions Diagram";
const rdDivID: string = getID(s_ReactionsDiagram);
const rdcID: string = getID(rdDivID, "Canvas");
//let rd_canvas_width: number = 800;
let rdcHeight: number = 400;
let rd_lw: number = 4;
let rd_lwc: number = 2;
let rd_font: string = "1em SensSerif";
let rdWindow: Window | null;

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
    let menuDiv: HTMLDivElement = document.getElementById(menuDivID) as HTMLDivElement;
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';

    // Create Load button.
    let s_Load: string = 'Load';
    let loadButton = createButton(s_Load, getID(s_Load), boundary1);
    loadButton.addEventListener('click', (event: MouseEvent) => {
        load();
        loadButton.textContent = s_Load;
    });
    menuDiv.appendChild(loadButton);
    // Create style/theme option buttons.
    // Create button to increase the font size.
    let s_Increase_fontsize: string = 'Increase fontsize';
    let increaseFontSizeButton = createButton(s_Increase_fontsize, getID(s_Increase_fontsize), boundary1);
    increaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let s_Decrease_fontsize: string = 'Decrease fontsize';
    let decreaseFontSizeButton = createButton(s_Decrease_fontsize, getID(s_Decrease_fontsize), boundary1);
    decreaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize - 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Create a light/dark mode button.
    let s_Light_Dark_Mode = 'Light/Dark Mode';
    let lightDarkModeButton = createButton(s_Light_Dark_Mode, getID(s_Light_Dark_Mode), boundary1);
    lightDarkModeButton.addEventListener('click', () => {
        dark = !dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if (dark) {
            document.body.className = 'dark-mode';
        } else {
            document.body.className = 'light-mode';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    // Create Save button.
    let s_Save: string = 'Save';
    let saveButton = createButton(s_Save, getID(s_Save), boundary1);
    saveButton.addEventListener('click', saveXML);
    menuDiv.appendChild(saveButton);

    // Welcome.
    let wDiv: HTMLDivElement = document.getElementById(welcomeDivID) as HTMLDivElement;
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
        collapsed (triangle orientated with a point down: ' + sy_downTriangle + ') or expanded (triangle with a point up: '
        + sy_upTriangle + '.'));
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
        let rdCanvas: HTMLCanvasElement = document.getElementById(rdcID) as HTMLCanvasElement;
        drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    } else {
        let c: HTMLCanvasElement = rdWindow.document.getElementById(rdcID) as HTMLCanvasElement;
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
        remove(id, ids);
    });
    if (molecules != null) {
        molecules.clear();
    }
    if (reactions != null) {
        reactions.clear();
    }
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
            let inputFilename: string = file.name;
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
function parse(xml: XMLDocument) {
    console.log("parse: " + xml);

    // Process the XML.
    let xml_mesmer: Element = getSingularElement(xml, Mesmer.tagName);
    mesmer = new Mesmer(getAttributes(xml_mesmer));

    // Title.
    let xml_title: HTMLCollectionOf<Element> = xml.getElementsByTagName(Title.tagName) as HTMLCollectionOf<Element>;
    if (xml_title.length != 1) {
        throw new Error('Multiple ' + Title.tagName + ' tags found');
    } else {
        let title: string = (xml_title[0].childNodes[0].nodeValue as string).trim();
        let titleNode: Title = new Title(getAttributes(xml_title[0]), title);
        mesmer.setTitle(titleNode);
        let titleDiv: HTMLDivElement = document.getElementById(titleDivID) as HTMLDivElement;
        let lwiId: string = addID('titleDiv');
        // Remove any existing lwiId HTMLDivElement.
        remove(lwiId, ids);
        // Create input element.
        let lwi: HTMLDivElement = createLabelWithInput("text", getID(lwiId, s_Input), boundary1, level0,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                titleNode.value = target.value;
                console.log(titleNode.tagName + " changed to " + titleNode.value);
                resizeInputElement(target);
            }, title, Title.tagName);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }

    // Molecules.
    let mlDiv: HTMLDivElement = document.getElementById(moleculesDivID) as HTMLDivElement;
    let mlDivID = addID(MoleculeList.tagName);
    // Remove any existing mlDivID HTMLDivElement.
    remove(mlDivID, ids);
    // Create collapsible content.
    let mlcDiv: HTMLDivElement = getCollapsibleDiv(mlDivID, mlDiv, null, processMoleculeList(xml),
        MoleculeList.tagName, boundary1, level0);
    mesmer.setMoleculeList(new MoleculeList(new Map(), Array.from(molecules.values())));

    // Reactions.
    let rlDiv: HTMLDivElement = document.getElementById(reactionsDivID) as HTMLDivElement;
    let rlDivID: string = addID(ReactionList.tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID, ids);
    // Create collapsible content.
    let rlcDiv: HTMLDivElement = getCollapsibleDiv(rlDivID, rlDiv, null, processReactionList(xml),
        ReactionList.tagName, boundary1, level0);
    mesmer.setReactionList(new ReactionList(new Map(), Array.from(reactions.values())));

    // Reactions Diagram.
    let rddDiv: HTMLDivElement = document.getElementById(reactionsDiagramDivID) as HTMLDivElement;
    let rdDivID: string = addID(s_ReactionsDiagram);
    // Destroy any existing rdWindow.
    if (rdWindow != null) {
        rdWindow.close();
        rdWindow = null;
    }
    // If rdDiv already exists, remove it.
    remove(rdDivID, ids);
    // Create collapsible content.
    let rdDiv: HTMLDivElement = createDiv(undefined, level1);
    let rdcDiv: HTMLDivElement = getCollapsibleDiv(rdDivID, rddDiv, null, rdDiv,
        s_ReactionsDiagram, boundary1, level0);
    // Create a pop diagram button in its own div.
    let popButtonDivId = getID(rdDivID, 'pop');
    //remove(popButtonDivId);
    let popButtonDiv = createDiv(popButtonDivId);
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = getID(popButtonDivId, s_button);
    let popOutText: string = "Pop into a new Window";
    let popButton: HTMLButtonElement = createButton(popOutText, popButtonID);
    popButtonDiv.appendChild(popButton);
    let rdCanvas: HTMLCanvasElement = document.createElement('canvas');
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
            let popWindowRDCanvas: HTMLCanvasElement = document.createElement('canvas');
            popWindowRDCanvas.id = rdcID;
            rdWindow = window.open("", s_ReactionsDiagram, "width=" + rdCanvas.width + ", height=" + rdCanvas.height) as Window;
            rdWindow.document.body.appendChild(popWindowRDCanvas);
            drawReactionDiagram(popWindowRDCanvas, dark, rd_font, rd_lw, rd_lwc);
            remove(rdcID, ids);
            popButton.textContent = "Pop into this Window";
        } else {
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
    let saveButtonID = getID('saveButton');
    let saveButton: HTMLButtonElement = createButton("Save as PNG", saveButtonID, boundary1);
    popButtonDiv.appendChild(saveButton);
    saveButton.addEventListener('click', () => {
        let dataURL = rdCanvas.toDataURL();
        let a = document.createElement('a');
        a.href = dataURL;
        let title: string = mesmer.getTitle()?.value as string;
        a.download = (title + s_ReactionsDiagram).replace(/[^a-z0-9]/gi, '_') + ".png";
        a.click();
    });

    // Conditions.
    let cdlDiv: HTMLDivElement = document.getElementById(conditionsDivID) as HTMLDivElement;
    let cdlDivID: string = addID(Conditions.tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    remove(cdlDivID, ids);
    // Create collapsible content.
    let cdlcDiv: HTMLDivElement = getCollapsibleDiv(cdlDivID, cdlDiv, null, processConditions(xml),
        "ConditionsList", boundary1, level0);

    // Model Parameters.
    let mpDiv: HTMLDivElement = document.getElementById(modelParametersDivID) as HTMLDivElement;
    let mpDivID: string = addID(ModelParameters.tagName);
    // Remove any existing mpDivID HTMLDivElement.
    remove(mpDivID, ids);
    // Create collapsible content.
    let mpcDiv: HTMLDivElement = getCollapsibleDiv(mpDivID, mpDiv, null, processModelParameters(xml),
        ModelParameters.tagName, boundary1, level0);

    // Control.
    let clDiv: HTMLDivElement = document.getElementById(controlDivID) as HTMLDivElement;
    let clDivID: string = addID(Control.tagName);
    // Remove any existing clDivID HTMLDivElement.
    remove(clDivID, ids);
    // Create collapsible content.
    let controlcDiv: HTMLDivElement = getCollapsibleDiv(clDivID, clDiv, null, processControl(xml),
        "ControlList", boundary1, level0);
}

/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml: XMLDocument): HTMLDivElement {
    // Initialise molecules.
    molecules = new Map();
    // Create div to contain the molecules list.
    let moleculeListDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "moleculeList" element.
    let xml_moleculeList: Element = getSingularElement(xml, MoleculeList.tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let moleculeListTagNames: Set<string> = new Set();
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
    if (!moleculeListTagNames.has(Molecule.tagName)) {
        throw new Error("Expecting tags with \"" + Molecule.tagName + "\" tagName but there are none!");
    }
    // Process the XML "molecule" elements.
    let xml_molecules: HTMLCollectionOf<Element> = xml_moleculeList.getElementsByTagName(Molecule.tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_molecules.length; i++) {
        let moleculeDivID: string = getID(Molecule.tagName, i);
        let moleculeDiv: HTMLDivElement = createDiv(moleculeDivID);
        // Set attributes.
        let attributes: Map<string, string> = getAttributes(xml_molecules[i]);
        // Get the molecule id.
        let moleculeId: string | undefined = attributes.get(Molecule.s_id);
        if (moleculeId == undefined) {
            throw new Error(Molecule.s_id + ' is undefined');
        }
        // Create molecule.
        let molecule = new Molecule(attributes, moleculeId);
        molecules.set(moleculeId, molecule);
        // Create collapsible Molecule HTMLDivElement.
        let moleculecDivID = getID(moleculeDivID, s_container);
        let mcDiv: HTMLDivElement = getCollapsibleDiv(moleculecDivID, moleculeListDiv, null, moleculeDiv,
            moleculeId, boundary1, level1);
        // Create a set of molecule tag names.
        let moleculeTagNames: Set<string> = new Set();
        let cns: NodeListOf<ChildNode> = xml_molecules[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for (let j = 0; j < cns.length; j++) {
            let cn: ChildNode = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!moleculeTagNames.has(cn.nodeName)) {
                moleculeTagNames.add(cn.nodeName);
            } else {
                // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                if (cn.nodeName != "#text") {
                    console.warn("Another ChildNode with nodeName=" + cn.nodeName);
                    //throw new Error("cn.nodeName appears twice in molecule.");
                }
            }
            //console.log(cn.nodeName);
        }
        // Add edit Name button.
        addEditIDButton(molecule, mcDiv.querySelector(s_button) as HTMLButtonElement, moleculeDiv, level1);
        // Description
        moleculeDiv.appendChild(processDescription(getID(molecule.getID(), s_description), molecule.getDescription.bind(molecule),
            molecule.setDescription.bind(molecule), boundary1, level1));
        // Init atoms.
        //console.log("Init atoms.");
        let aa: AtomArray = new AtomArray(new Map()); // To be reinitialised if there is an AtomArray.
        // There can be an individual atom not in an atom array, or an atom array.
        let xml_aas: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(AtomArray.tagName);
        if (xml_aas.length > 1) {
            throw new Error("Expecting 1 or 0 " + AtomArray.tagName + " but finding " + xml_aas.length + "!");
        }
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID: string = getID(moleculeDivID, AtomArray.tagName);
        let aaDiv: HTMLDivElement = createDiv(aaDivID);
        let aacDivID = getID(aaDivID, s_container);
        let aacDiv: HTMLDivElement = getCollapsibleDiv(aacDivID, moleculeDiv, null, aaDiv, AtomArray.tagName, boundary1, level1);
        if (xml_aas.length == 1) {
            let xml_aa = xml_aas[0];
            let xml_as: HTMLCollectionOf<Element> = xml_aa.getElementsByTagName(Atom.tagName);
            if (xml_as.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + AtomArray.tagName + ", but finding " + xml_as.length + "!");
            }
            aa = new AtomArray(getAttributes(xml_aa));
            molecule.setAtoms(aa);
            for (let j = 0; j < xml_as.length; j++) {
                //console.log("j=" + j);
                // Create a new Atom.
                let a: Atom = new Atom(getAttributes(xml_as[j]), molecule);
                let aID: string = aa.addAtom(a);
                let aDivID = getID(aaDivID, j);
                let aDiv = createFlexDiv(aDivID, level1);
                aaDiv.appendChild(aDiv);
                aDiv.appendChild(createLabel(aID, boundary1));
                // elementType.
                processElementType(a, aDiv, false, boundary1);
                // coordinates.
                processCoordinates(a, aDiv, boundary1);
                addRemoveButton(aDiv, boundary1, removeAtom, molecule, aID);
            }
            moleculeTagNames.delete(AtomArray.tagName);
        } else {
            let xml_as: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Atom.tagName);
            if (xml_as.length == 1) {
                aa = new AtomArray(new Map());
                aa.addAtom(new Atom(getAttributes(xml_as[0]), molecule));
                molecule.setAtoms(aa);
            } else if (xml_as.length > 1) {
                throw new Error("Expecting 1 " + Atom.tagName + " but finding " + xml_as.length
                    + ". Should these be in an " + AtomArray.tagName + "?");
            }
        }
        //console.log("atomsNode=" + atomsNode);
        aaDiv.appendChild(getAddAtomButton(molecule, aaDiv, Atom.tagName, boundary1, level1));
        moleculeTagNames.delete(Atom.tagName);
        // Init bonds.
        let ba: BondArray = new BondArray(new Map()); // This will be replaced if there is an BondArray.=
        // Function to be used to remove a bond.
        let removeBond = (id: string) => molecule.getBonds().removeBond(id);
        // There can be an individual bond not in a bond array, or a bond array.
        // There may be only 1 bond in a BondArray.
        let xml_bas: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(BondArray.tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID: string = getID(moleculeDivID, BondArray.tagName);
        let baDiv: HTMLDivElement = createDiv(baDivID);
        let bacDivID = getID(baDivID, s_container);
        let bacDiv: HTMLDivElement = getCollapsibleDiv(bacDivID, moleculeDiv, null, baDiv, BondArray.tagName, boundary1, level1);
        if (xml_bas.length > 0) {
            if (xml_bas.length > 1) {
                throw new Error("Expecting 1 or 0 " + BondArray.tagName + " but finding " + xml_bas.length + "!");
            }
            let xml_bs: HTMLCollectionOf<Element> = xml_bas[0].getElementsByTagName(Bond.tagName);
            ba = new BondArray(getAttributes(xml_bas[0]));
            for (let j = 0; j < xml_bs.length; j++) {
                // Create a new Bond.
                let b: Bond = new Bond(getAttributes(xml_bs[j]), molecule);
                let bID: string = ba.addBond(b);
                let bdivID = getID(baDivID, j);
                let bDiv: HTMLDivElement = createFlexDiv(bdivID, level1);
                baDiv.appendChild(bDiv);
                bDiv.appendChild(createLabel(bID, boundary1));
                // atomRefs2.
                processAtomRefs2(molecule, bDiv, b, boundary1);
                // order.
                processOrder(bDiv, b, boundary1);
                addRemoveButton(bDiv, boundary1, removeBond, bID);
            }
            molecule.setBonds(ba);
            moleculeTagNames.delete(BondArray.tagName);
        } else {
            let xml_bonds: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Bond.tagName);
            if (xml_bonds.length > 0) {
                if (xml_bonds.length > 1) {
                    throw new Error("Expecting 1 " + Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + BondArray.tagName + "?");
                }
                ba = new BondArray(new Map());
                ba.addBond(new Bond(getAttributes(xml_bonds[0]), molecule));
                molecule.setBonds(ba);
            }
        }
        baDiv.appendChild(getAddBondButton(molecule, moleculeId, baDiv, Bond.tagName, boundary1, level1));
        moleculeTagNames.delete(Bond.tagName);

        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID: string = getID(moleculeDivID, "viewer");
        let viewerDiv: HTMLDivElement = createDiv(viewerDivID);
        let viewercDivID = getID(viewerDivID, s_container);
        let viewercDiv: HTMLDivElement = getCollapsibleDiv(viewercDivID, moleculeDiv, null, viewerDiv,
            "viewer", boundary1, level1);
        create3DViewer(molecule, viewerDiv, boundary1, level1);

        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_pls: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(PropertyList.tagName);
        if (xml_pls.length > 1) {
            throw new Error("Expecting 1 or 0 " + PropertyList.tagName + " but finding " + xml_pls.length + "!");
        }
        if (xml_pls.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDivID: string = getID(moleculeDivID, PropertyList.tagName);
            let plDiv: HTMLDivElement = createDiv(plDivID);
            let plcDivID = getID(plDivID, s_container);
            let plcDiv: HTMLDivElement = getCollapsibleDiv(plcDivID, moleculeDiv, null, plDiv, PropertyList.tagName, boundary1, level1);
            // Create a new PropertyList.
            let pl: PropertyList = new PropertyList(getAttributes(xml_pls[0]));
            molecule.setProperties(pl);
            let xml_ps: HTMLCollectionOf<Element> = xml_pls[0].getElementsByTagName(Property.tagName);
            for (let j = 0; j < xml_ps.length; j++) {
                // Create a new Property.
                let p: Property = createProperty(xml_ps[j], plDiv, molecule, boundary1, level1);
                pl.setProperty(p);
            }
            moleculeTagNames.delete(PropertyList.tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_ps: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Property.tagName);
            if (xml_ps.length != 1) {
                throw new Error("Expecting 1 " + Property.tagName + " but finding " + xml_ps.length
                    + ". Should these be in a " + PropertyList.tagName + "?");
            }
            // Create a new Property.
            let p: Property = createProperty(xml_ps[0], moleculeDiv, molecule, boundary1, level1);
            molecule.setProperties(p);
            moleculeTagNames.delete(Property.tagName);
        }
        // Organise EnergyTransferModel.
        let xml_etms: HTMLCollectionOf<Element> | null = xml_molecules[i].getElementsByTagName(EnergyTransferModel.tagName);
        if (xml_etms.length > 0) {
            if (xml_etms.length > 1) {
                throw new Error("Expecting 1 or 0 " + EnergyTransferModel.tagName + " but finding " + xml_etms.length + "!");
            }
            let etm = new EnergyTransferModel(getAttributes(xml_etms[0]));
            processEnergyTransferModel(etm, molecule, xml_etms[0], moleculeDiv);
            moleculeTagNames.delete(EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_dms: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(DOSCMethod.tagName);
        if (xml_dms.length > 0) {
            if (xml_dms.length > 1) {
                throw new Error("Expecting 1 or 0 " + DOSCMethod.tagName + " but finding " + xml_dms.length + "!");
            }
            let doscm = new DOSCMethod(getAttributes(xml_dms[0]));
            moleculeDiv.appendChild(
                createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                    doscm.getXsiType(), molecule.getID(), boundary1, level1));
            moleculeTagNames.delete(DOSCMethod.tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_molecules[i].getElementsByTagName(ExtraDOSCMethod.tagName);
        if (xml_edms.length > 0) {
            if (xml_edms.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_edms.length);
            }
            let edm: ExtraDOSCMethod = new ExtraDOSCMethod(getAttributes(xml_dms[0]));
            // Create collapsible ExtraDOSCMethod HTMLDivElement.
            let edmDivID: string = getID(moleculeDivID, ExtraDOSCMethod.tagName);
            let edmDiv: HTMLDivElement = createDiv(edmDivID);
            let edmcDivID = getID(edmDivID, s_container);
            let edmcDiv: HTMLDivElement = getCollapsibleDiv(edmcDivID, moleculeDiv, null, edmDiv,
                ExtraDOSCMethod.tagName, boundary1, level1);
            // Read bondRef.
            let xml_brs: HTMLCollectionOf<Element> = xml_edms[0].getElementsByTagName(BondRef.tagName);
            if (xml_brs.length > 0) {
                if (xml_brs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + xml_brs.length);
                }
                let bids: string[] = (molecule.getBonds() as BondArray).getBondIds();
                let br: BondRef = new BondRef(getAttributes(xml_brs[0]), getNodeValue(getFirstChildNode(xml_brs[0])));
                let lws: HTMLDivElement = createLabelWithSelect(BondRef.tagName, bids, BondRef.tagName,
                    br.value, molecule.getID(), boundary1, level1);
                let select: HTMLSelectElement = lws.getElementsByTagName("select")[0];
                select.classList.add(Bond.tagName);
                edmDiv.appendChild(lws);
            }
            // Read hinderedRotorPotential.
            let xml_hrps: HTMLCollectionOf<Element> = xml_edms[0].getElementsByTagName(HinderedRotorPotential.tagName);
            if (xml_hrps.length > 0) {
                if (xml_hrps.length != 1) {
                    throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hrps.length);
                }
                let hrpAttributes: Map<string, string> = getAttributes(xml_hrps[0]);
                let hrp: HinderedRotorPotential = new HinderedRotorPotential(hrpAttributes);
                // Create collapsible HinderedRotorPotential HTMLDivElement.
                let hrpDivID: string = getID(edmDivID, HinderedRotorPotential.tagName);
                let hrpDiv: HTMLDivElement = createDiv(hrpDivID);
                let hrpcDivID = getID(hrpDivID, s_container);
                let hrpcDiv: HTMLDivElement = getCollapsibleDiv(hrpcDivID, edmDiv, null, hrpDiv,
                    HinderedRotorPotential.tagName, boundary1, level1);
                // Format.
                hrpDiv.appendChild(createLabelWithSelect(HinderedRotorPotential.s_format,
                    HinderedRotorPotential.formats, HinderedRotorPotential.tagName, hrp.getFormat(),
                    getID(hrpDivID, HinderedRotorPotential.s_format), boundary1, level1));
                // Units.
                addAnyUnits(Mesmer.energyUnits, hrpAttributes, hrpDiv,
                    getID(hrpDivID, HinderedRotorPotential.s_units), HinderedRotorPotential.tagName, boundary1, level1);
                // ExpansionSize.
                hrpDiv.appendChild(createLabelWithInput("number",
                    getID(hrpDivID, HinderedRotorPotential.s_expansionSize), boundary1, level1, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        // Check the input is a number.
                        if (isNumeric(target.value)) {
                            hrp.setExpansionSize(parseInt(target.value));
                        } else {
                            // Reset the input to the current value.
                            alert(HinderedRotorPotential.s_expansionSize + " input is not a number, resetting...");
                            target.value = hrp.getExpansionSize().toString();
                        }
                        resizeInputElement(target);
                    }, hrp.getExpansionSize().toExponential(), HinderedRotorPotential.s_expansionSize));

                // Add useSineTerms.
                processUseSineTerms(hrpDiv, hrp, level1);

                // Load PotentialPoints.
                // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                let ppsDivID: string = getID(moleculeDivID, HinderedRotorPotential.tagName, PotentialPoint.tagName);
                let ppsDiv: HTMLDivElement = createDiv(ppsDivID);
                let ppscDivID = getID(ppsDivID, s_container);
                let ppscDiv: HTMLDivElement = getCollapsibleDiv(ppscDivID, moleculeDiv, null, ppsDiv,
                    "PotentialPoints", boundary1, level1);
                hrpDiv.appendChild(ppscDiv);

                let pps: PotentialPoint[] = [];
                let xml_pps: HTMLCollectionOf<Element> = xml_hrps[0].getElementsByTagName(PotentialPoint.tagName);
                for (let k = 0; k < xml_pps.length; k++) {
                    let pp: PotentialPoint = new PotentialPoint(getAttributes(xml_pps[k]));
                    pps.push(pp);
                    let ppDivID = getID(ppsDivID, PotentialPoint.tagName, k);
                    let ppDiv: HTMLDivElement = createFlexDiv(ppDivID, level1);
                    ppsDiv.appendChild(ppDiv);
                    let l: HTMLLabelElement = createLabel(PotentialPoint.tagName + " " + k, boundary1);
                    ppDiv.appendChild(l);
                    // Process angle
                    let anglelwi: HTMLDivElement = createLabelWithInput("number", getID(ppDivID, PotentialPoint.s_angle), boundary1, boundary1,
                        (event: Event) => {
                            let target = event.target as HTMLInputElement;
                            // Check the input is a number.
                            if (isNumeric(target.value)) {
                                let value: number = parseFloat(target.value);
                                pp.setAngle(value);
                            } else {
                                // Reset the input to the current value.
                                alert("Angle input is not a number, resetting...");
                                target.value = pp.getAngle().toExponential();
                            }
                            resizeInputElement(target);
                        }, pp.getAngle().toExponential(), PotentialPoint.s_angle);
                    ppDiv.appendChild(anglelwi);
                    // Create a new div element for the potential.
                    let potentialLabel: HTMLLabelElement = createLabel(PotentialPoint.s_potential, boundary1);
                    ppDiv.appendChild(potentialLabel);
                    let potentialInputElementId = getID(ppDivID, PotentialPoint.s_potential);
                    let potentialInputElement: HTMLInputElement = createInput("number", potentialInputElementId, boundary1);
                    ppDiv.appendChild(potentialInputElement);
                    potentialInputElement.addEventListener('change', (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        // Check the input is a number.
                        if (isNumeric(target.value)) {
                            let value: number = parseFloat(target.value);
                            pp.setPotential(value);
                            console.log("Set " + PotentialPoint.tagName + " to " + value.toExponential());
                        } else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = pp.getPotential().toExponential();
                        }
                        resizeInputElement(potentialInputElement);
                    });
                    potentialInputElement.value = pp.getPotential().toExponential();
                    resizeInputElement(potentialInputElement);
                }
                //ppsDiv.appendChild(ppDiv);
                hrp.setPotentialPoints(pps);
                edm.setHinderedRotorPotential(hrp);
            }

            // Read periodicities.
            let xml_periodicities: HTMLCollectionOf<Element> = xml_dms[0].getElementsByTagName(Periodicity.tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                let valueString: string = getNodeValue(getFirstChildNode(xml_periodicities[0]));
                let periodicity: Periodicity = new Periodicity(getAttributes(xml_periodicities[0]), new Big(valueString));
                edm.setPeriodicity(periodicity);
                let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.getID() + "_" + Periodicity.tagName,
                    boundary1, level1, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        valueString = target.value;
                        if (isNumeric(valueString)) {
                            let value: Big = new Big(valueString);
                            periodicity.value = value;
                            (edm.getPeriodicity() as Periodicity).value = value;
                            console.log("Set " + Periodicity.tagName + " to " + value);
                        } else {
                            // Reset the input to the current value.
                            alert("Periodicity input is not a number, resetting...");
                            target.value = periodicity.value.toExponential();
                        }
                    }, valueString, Periodicity.tagName);
                edmDiv.appendChild(inputDiv);
            }
            molecule.setExtraDOSCMethod(edm);
            moleculeTagNames.delete(ExtraDOSCMethod.tagName);
        }

        // Organise ReservoirSize.
        moleculeTagNames.delete(ReservoirSize.tagName);
        let xml_ReservoirSize = xml_molecules[i].getElementsByTagName(ReservoirSize.tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            }
            let valueString: string = getNodeValue(getFirstChildNode(xml_ReservoirSize[0]));
            let value: Big = new Big(valueString);
            let reservoirSizeAttributes: Map<string, string> = getAttributes(xml_ReservoirSize[0]);
            let reservoirSize: ReservoirSize = new ReservoirSize(reservoirSizeAttributes, value);
            molecule.setReservoirSize(reservoirSize);
            let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.getID() + "_" + ReservoirSize.tagName,
                boundary1, level1, (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    reservoirSize.value = new Big(target.value);
                    resizeInputElement(target);
                }, valueString, ReservoirSize.tagName);
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
        let molstarDiv: HTMLDivElement = document.createElement("div");
        molstarDiv.id = getID(molecule.getID(), "molstar");
        moleculeDiv.appendChild(molstarDiv);
    }
    // Create an add molecule button.
    let addMoleculeButton: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    moleculeListDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', () => {
        // Ask the user to specify the molecule ID.
        let moleculeId: string | null = prompt("Please enter a name for the molecule", "Kr");
        let molecule: Molecule = new Molecule(new Map(), moleculeId!);
        molecules.set(moleculeId!, molecule);
        let moleculeDivID: string = getID(Molecule.tagName, molecules.size);
        let moleculeDiv: HTMLDivElement = createDiv(moleculeDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = getID(moleculeDivID, s_container);
        let mcDiv: HTMLDivElement = getCollapsibleDiv(mcDivID, moleculeListDiv, addMoleculeButton, moleculeDiv,
            moleculeId!, boundary1, level1);
        // Add the molecule to the BathGas select elements.
        addOptionByClassName(BathGas.tagName, molecule.getID());
        // Add edit Name button.
        addEditIDButton(molecule, mcDiv.querySelector(s_button) as HTMLButtonElement, moleculeDiv, level1);
        // Description
        moleculeDiv.appendChild(processDescription(getID(molecule.getID(), s_description), molecule.getDescription.bind(molecule),
            molecule.setDescription.bind(molecule), boundary1, level1));
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID: string = getID(moleculeDivID, AtomArray.tagName);
        let aaDiv: HTMLDivElement = createDiv(aaDivID);
        let aacDivID = getID(aaDivID, s_container);
        let aacDiv: HTMLDivElement = getCollapsibleDiv(aacDivID, moleculeDiv, null, aaDiv, AtomArray.tagName, boundary1, level1);
        aaDiv.appendChild(getAddAtomButton(molecule, aaDiv, Atom.tagName, boundary1, level1));
        // Create collapsible BondArray HTMLDivElement.
        let baDivID: string = getID(moleculeDivID, BondArray.tagName);
        let baDiv: HTMLDivElement = createDiv(baDivID);
        let bacDivID = getID(baDivID, s_container);
        let bacDiv: HTMLDivElement = getCollapsibleDiv(bacDivID, moleculeDiv, null, baDiv, BondArray.tagName, boundary1, level1);
        baDiv.appendChild(getAddBondButton(molecule, moleculeId!, baDiv, Bond.tagName, boundary1, level1));
        create3DViewer(molecule, moleculeDiv, boundary1, level1);
        // Create collapsible Properties HTMLDivElement.
        let plDivID: string = getID(moleculeDivID, PropertyList.tagName);
        let plDiv: HTMLDivElement = createDiv(plDivID);
        let plcDivID = getID(plDivID, s_container);
        let plcDiv: HTMLDivElement = getCollapsibleDiv(plcDivID, moleculeDiv, null, plDiv, PropertyList.tagName, boundary1, level1);
        // More code to add here...
    });
    return moleculeListDiv;
}

/**
 * Adds a button to edit the molecule ID.
 * @param molecule 
 * @param button 
 * @param moleculeDiv 
 * @param level 
 */
function addEditIDButton(molecule: Molecule, button: HTMLButtonElement, moleculeDiv: HTMLDivElement,
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let s_editName: string = sy_edit + " Edit id";
    let editNameButtonID: string = getID(moleculeDiv.id, s_editName, s_button);
    let editNameButton: HTMLButtonElement = createButton(s_editName, editNameButtonID, level);
    moleculeDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', () => {
        let newMoleculeId: string | null = prompt("Please enter a name for the molecule:", molecule.getID());
        if (newMoleculeId != null) {
            let mid: string = getID(newMoleculeId) // This ensures that all special chars are handled.
            // Update the BathGas select elements.
            addOptionByClassName(BathGas.tagName, mid);
            removeOptionByClassName(BathGas.tagName, molecule.getID());
            molecules.set(mid, molecule);
            molecules.delete(molecule.getID());
            molecule.setID(mid);
            moleculeDiv.id = mid;
            button.textContent = newMoleculeId + " " + sy_upTriangle;
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
function processDescription(id: string, getter: () => string | undefined, setter: (value: string) => void,
    marginComponent: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    marginDiv: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, marginDiv);
    let buttonTextContentSelected: string = s_description + sy_selected;
    let buttonTextContentDeselected: string = s_description + sy_deselected;
    let button = createButton(buttonTextContentDeselected, getID(id, s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId: string = getID(id, s_description, s_Input)
    let value: string | undefined = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addDescription(div, inputId, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(inputId) == null) {
            addDescription(div, inputId, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
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
 * @param value The description value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 */
function addDescription(div: HTMLDivElement, id: string, value: string | undefined,
    setter: (value: string) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string;
    if (value == undefined) {
        valueString = "";
    } else {
        valueString = value;
    }
    let input: HTMLInputElement = createInput("text", id, boundary);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setter(target.value);
        console.log(id + " changed from " + value + " to " + target.value);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
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
function getAddAtomButton(molecule: Molecule, aaDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    // Create an add atom button.
    let button: HTMLButtonElement = createButton(s_Add_sy_add, getID(molecule.getID(), "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes: Map<string, string> = new Map();
        let a: Atom = new Atom(attributes, molecule);
        let aID: string = molecule.getAtoms().addAtom(a);
        let aDivID: string = getID(molecule.getID(), aID);
        let aDiv: HTMLDivElement = createFlexDiv(aDivID, level);
        aDiv.appendChild(createLabel(aID, boundary));
        // elementType.
        processElementType(a, aDiv, true, boundary);
        // Coordinates.
        processCoordinates(a, aDiv, boundary);
        addRemoveButton(aDiv, boundary, removeAtom, molecule, aID);
        aaDiv.insertBefore(aDiv, button);
        // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
        addOptionByClassName(Bond.s_atomRefs2, aID);
    });
    return button;
}

/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param id The atom id to remove.
 */
function removeAtom(molecule: Molecule, id: string) {
    molecule.getAtoms().removeAtom(id);
    molecule.getBonds().bonds.forEach((bond) => {
        let atomRefs2: string = bond.getAtomRefs2();
        let atomRefs: string[] = atomRefs2.split(" ");
        if (atomRefs[0] == id || atomRefs[1] == id) {
            let bondId = bond.getId()!;
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            // Remove any bondDiv elements with a reference to id.
            let bondDivs: HTMLCollectionOf<Element> = document.getElementsByClassName(id);
            //console.log("bondDivs.length=" + bondDivs.length);
            for (let i = 0; i < bondDivs.length; i++) {
                bondDivs[i].remove();
            }

        }
    });
    removeOptionByClassName(Bond.s_atomRefs2, id);
}

/**
 * @param className The className of Elements to update
 * @param optionToRemove The option value to remove.
 */
function removeOptionByClassName(className: string, optionToRemove: string): void {
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] instanceof HTMLSelectElement) {
            let options: HTMLOptionsCollection = (elements[i] as HTMLSelectElement).options;
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
function addOptionByClassName(className: string, optionToAdd: string): void {
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    //console.log("n elements with className " + className + "=" + elements.length);    
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
function getAddBondButton(molecule: Molecule, moleculeId: string, bondArrayDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    // Create an add button.
    let button: HTMLButtonElement = createButton(s_Add_sy_add, getID(moleculeId, "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let atoms: Map<string, Atom> = molecule.getAtoms().atoms;
        if (atoms.size < 2) {
            alert("There must be at least 2 atoms to create a bond.");
            return;
        }
        let attributes: Map<string, string> = new Map();
        let atomRefs2: string = Array.from(atoms.keys()).slice(0, 2).join(" ");
        attributes.set(Bond.s_atomRefs2, atomRefs2);
        let b: Bond = new Bond(attributes, molecule);
        let bID: string = molecule.getBonds().addBond(b);
        let bDiv: HTMLDivElement = createFlexDiv(getID(moleculeId, bID), level);
        // Add to the classlists so that bondDivs involving particular atoms can be found.
        Array.from(atoms.keys()).forEach((atomId: string) => {
            bDiv.classList.add(atomId);
        });
        bondArrayDiv.insertBefore(bDiv, button);
        bDiv.appendChild(createLabel(bID, boundary));
        // atomRefs2.
        processAtomRefs2(molecule, bDiv, b, boundary);
        // order.
        processOrder(bDiv, b, boundary);
        let removeBond = (id: string) => molecule.getBonds().removeBond(id);
        addRemoveButton(bDiv, boundary, removeBond, bID);
        // Get elements with Bond className. These select elements are to be updated to include the new bond option.
        addOptionByClassName(Bond.tagName, bID);
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
function processAtomRefs2(molecule: Molecule, bDiv: HTMLDivElement, bond: Bond,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let id = getID(bDiv.id, Bond.s_atomRefs2);
    let atomRefs2: string | undefined = bond.getAtomRefs2();
    let atomRefs: string[] = atomRefs2.split(" ");
    let atomRefOptions: string[] = Array.from((molecule.getAtoms() as AtomArray).atoms.keys());
    // alws.
    let alws: HTMLDivElement = createLabelWithSelect(Bond.s_atomRefs2 + "[0]", atomRefOptions, Atom.tagName, atomRefs[0],
        getID(id, 0), margin, margin);
    let aselect: HTMLSelectElement = alws.querySelector('select') as HTMLSelectElement;
    aselect.classList.add(Bond.s_atomRefs2);
    aselect.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        let atomRefs2: string = target.value + " " + atomRefs[1];
        console.log(Bond.s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        resizeSelectElement(target);
    });
    aselect.value = atomRefs[0];
    resizeSelectElement(aselect);
    bDiv.appendChild(alws);
    // blws.
    let blws: HTMLDivElement = createLabelWithSelect(Bond.s_atomRefs2 + "[1]", atomRefOptions, Atom.tagName, atomRefs[1],
        getID(id, 1), margin, margin);
    let bselect: HTMLSelectElement = blws.querySelector('select') as HTMLSelectElement;
    bselect.classList.add(Bond.s_atomRefs2);
    bselect.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        let atomRefs2: string = atomRefs[0] + " " + target.value;
        console.log(Bond.s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        resizeSelectElement(target);
    });
    bselect.value = atomRefs[1];
    resizeSelectElement(bselect);
    bDiv.appendChild(blws);
}

/**
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(xml: Element, plDiv: HTMLDivElement, molecule: Molecule,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): Property {
    let p: Property = new Property(getAttributes(xml));
    if (p.dictRef == ZPE.dictRef) {
        processProperty(p, Mesmer.energyUnits, molecule, xml, plDiv, false, boundary, level);
    } else if (p.dictRef == RotConsts.dictRef) {
        processProperty(p, Mesmer.frequencyUnits, molecule, xml, plDiv, false, boundary, level);
    } else if (p.dictRef == VibFreqs.dictRef) {
        console.log("VibFreqs");
        processProperty(p, undefined, molecule, xml, plDiv, true, boundary, level);
    } else {
        processProperty(p, undefined, molecule, xml, plDiv, false, boundary, level);
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
function processElementType(a: Atom, aDiv: HTMLDivElement, first: boolean,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let elementType: string | undefined = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes: string[] = Mesmer.elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = s_selectOption;
        addOrRemoveInstructions(selectTypes, first);
        //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    let lws: HTMLDivElement = createLabelWithSelect(Atom.s_elementType, selectTypes, Atom.s_elementType,
        elementType!, getID(aDiv.id, Atom.s_elementType), margin, margin);
    let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        a.setElementType(target.value);
        resizeSelectElement(target);
    });
    select.value = elementType;
    resizeSelectElement(select);
    selectAnotherOptionEventListener(selectTypes, select);
    aDiv.appendChild(lws);
    return lws;
}

/**
 * @param options The options.
 * @param add If true then a new option is added with an instruction to select another option.
 * If false then this option is removed if it is present.
 */
function addOrRemoveInstructions(options: string[], add: boolean): void {
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
 * Process atom coordinates.
 * @param id The id.
 * @param a The atom.
 * @param aDiv The atom div.
 */
function processCoordinates(a: Atom, aDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    processCoordinate(aDiv, getID(aDiv.id, Atom.s_x3), Atom.s_x3, a.getX3.bind(a), a.setX3.bind(a), boundary);
    processCoordinate(aDiv, getID(aDiv.id, Atom.s_y3), Atom.s_y3, a.getY3.bind(a), a.setY3.bind(a), boundary);
    processCoordinate(aDiv, getID(aDiv.id, Atom.s_z3), Atom.s_z3, a.getZ3.bind(a), a.setZ3.bind(a), boundary);
}

/**
 * Process a coordinate.
 * @param aDiv The atom div.
 * @param id The id for the coordinate.
 * @param coordinate The coordinate name.
 * @param getter The getter function to call on the atom.
 * @param setter The setter function to call on the atom.
 * @param boundary The boundary.
 */
function processCoordinate(aDiv: HTMLDivElement, id: string, coordinate: string,
    getter: () => Big | undefined, setter: (value: Big) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let div: HTMLDivElement = createFlexDiv(undefined, boundary);
    aDiv.appendChild(div);
    let buttonTextContentSelected: string = coordinate + sy_selected;
    let buttonTextContentDeselected: string = coordinate + sy_deselected;
    let button = createButton(buttonTextContentDeselected, getID(id, s_button), boundary);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId: string = getID(id, coordinate, s_Input)
    let value: Big | undefined = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addCoordinate(div, inputId, value, setter, boundary);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(inputId) == null) {
            addCoordinate(div, inputId, value, setter, boundary);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
}

/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param value The coordinate value.
 * @param setter The setter function to call on the atom.
 * @param boundary The boundary.
 * @param level The level.
 */
function addCoordinate(div: HTMLDivElement, id: string, value: Big | undefined,
    setter: (value: Big) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string;
    if (value == undefined) {
        valueString = "";
    } else {
        valueString = value.toString();
    }
    let input: HTMLInputElement = createInput("number", id, boundary);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setter(new Big(target.value));
        console.log("Coordinate changed from " + value + " to " + target.value);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */
function addRemoveButton(div: HTMLDivElement,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    removeFunction: (...args: any[]) => void, ...args: any[]): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Remove_sy_remove, undefined, margin);
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
function processOrder(bondDiv: HTMLDivElement, bond: Bond,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let id = getID(bondDiv.id, Bond.s_order);
    let div: HTMLDivElement = createFlexDiv(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected: string = Bond.s_order + sy_selected;
    let buttonTextContentDeselected: string = Bond.s_order + sy_deselected;
    let button = createButton(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let value: number | undefined = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addOrder(div, bond, id, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(id) == null) {
            if (value == undefined) {
                value = 1;
            }
            addOrder(div, bond, id, value, margin);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
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
function addOrder(div: HTMLDivElement, bond: Bond, id: string, value: number,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string = value.toString();
    let select: HTMLSelectElement = createSelectElement(Bond.orderOptions, Bond.s_order, valueString, id, boundary);
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        bond.setOrder(parseFloat(target.value));
        console.log(Bond.s_order + " changed from " + valueString + " to " + target.value);
        resizeSelectElement(target);
    });
    select.value = valueString;
    resizeSelectElement(select);
    select.id = id;
    div.appendChild(select);
}

/**
 * Process an order.
 * @param hrpDiv The HinderedRotorPotential div.
 * @param margin The margin for components.
 */
function processUseSineTerms(hrpDiv: HTMLDivElement, hrp: HinderedRotorPotential,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let id = getID(hrpDiv.id, HinderedRotorPotential.s_useSineTerms);
    let buttonTextContentSelected: string = HinderedRotorPotential.s_useSineTerms + sy_selected;
    let buttonTextContentDeselected: string = HinderedRotorPotential.s_useSineTerms + sy_deselected;
    let button = createButton(buttonTextContentDeselected, undefined, margin);
    hrpDiv.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (hrp.getUseSineTerms() == true) {
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (hrp.getUseSineTerms() == false) {
            hrp.setUseSineTerms(true);
            button.textContent = buttonTextContentSelected;
        } else {
            hrp.setUseSineTerms(false);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
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
function create3DViewer(molecule: Molecule, moleculeDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID: string = getID(molecule.getID(), "viewerContainer");
    let viewerContainerDiv: HTMLDivElement = createDiv(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID: string = getID(molecule.getID(), "viewer");
    let showAtomLabels: boolean = false;
    let showBondLabels: boolean = false;
    // Create the GLViewer viewer.
    function createViewer(
        //cameraPosition: any, cameraOrientation: any, zoomLevel: any, 
        showAtomLabels: boolean, showBondLabels: boolean): any {
        let viewerDiv: HTMLDivElement = createDiv(viewerDivID, boundary);
        viewerDiv.className = "mol-container";
        viewerContainerDiv.appendChild(viewerDiv);
        let config = { backgroundColor: 'grey' };
        let viewer = $3Dmol.createViewer(viewerDiv, config);
        // Set the viewer style to stick and ball.
        viewer.setStyle({ stick: {} });
        // Create a 3Dmol viewer control to turn labels on and off.
        molecule.getAtoms().atoms.forEach(function (atom) {
            let et: string | undefined = atom.getElementType();
            let color: string;
            if (et == undefined) {
                color = 'Purple';
            } else {
                color = Mesmer.atomColors.get(et) || 'Purple';
            }
            //let am: number = Mesmer.atomMasses.get(atom.getElementType()) || 1;
            let radius: number;
            if (et == undefined) {
                radius = 100;
            } else {
                radius = Mesmer.atomRadii.get(atom.getElementType()!) || 100;
            }
            let ax: number = atom.getX3()?.toNumber() || 0;
            let ay: number = atom.getY3()?.toNumber() || 0;
            let az: number = atom.getZ3()?.toNumber() || 0;
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
            let ids: string[] = bond.getAtomRefs2().split(" ");
            let aa: AtomArray = molecule.getAtoms();
            let a0: Atom = aa.getAtom(ids[0]) as Atom;
            let a1: Atom = aa.getAtom(ids[1]) as Atom;
            let order: number = bond.getOrder() || 1;
            let color: string = Mesmer.bondColors.get(order) || 'Purple';
            // a0.
            let a0x: number = a0.getX3()?.toNumber() || 0;
            let a0y: number = a0.getY3()?.toNumber() || 0;
            let a0z: number = a0.getZ3()?.toNumber() || 0;
            // a1.
            let a1x: number = a1.getX3()?.toNumber() || 0;
            let a1y: number = a1.getY3()?.toNumber() || 0;
            let a1z: number = a1.getZ3()?.toNumber() || 0;
            viewer.addCylinder({ start: { x: a0x, y: a0y, z: a0z }, end: { x: a1x, y: a1y, z: a1z }, radius: 0.06 * order, color: color });
            if (showBondLabels) {
                viewer.addLabel(bond.getId()!, { position: { x: (a0x + a1x) / 2, y: (a0y + a1y) / 2, z: (a0z + a1z) / 2 } });
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
    let redrawButton: HTMLButtonElement = createButton("Draw/Redraw", undefined);
    let viewer: any;
    redrawButton.addEventListener('click', () => {
        remove(viewerDivID, ids);
        viewer = createViewer(
            //undefined, undefined, undefined, 
            showAtomLabels, showBondLabels);
    });
    viewerContainerDiv.appendChild(redrawButton);
    // Helper function to create a label button for hiding or showing labels on the viewer.
    function createLabelButton(label: string, id: string, showState: boolean, updateState: (newState: boolean) => void) {
        let button = createButton((showState ? "Hide " : "Show ") + label, id, boundary);
        button.addEventListener('click', () => {
            if (showState) {
                button.textContent = "Show " + label;
                showState = false;
            } else {
                button.textContent = "Hide " + label;
                showState = true;
            }
            /*
            let cameraPosition = viewer.getCameraPosition();
            let cameraOrientation = viewer.getCameraOrientation();
            let zoomLevel = viewer.getZoomLevel();
            */
            updateState(showState);
            remove(viewerDivID, ids);
            viewer = createViewer(
                //cameraPosition, cameraOrientation, zoomLevel,
                showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels: string = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, getID(molecule.getID(), s_Atom_Labels), showAtomLabels,
        newState => showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels: string = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, getID(molecule.getID(), s_Bond_Labels), showBondLabels,
        newState => showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton: HTMLButtonElement = createButton("Save as PNG", getID(molecule.getID(), s_save), boundary1);
    saveButton.addEventListener('click', () => {
        //viewer.pngURI({ backgroundColor: 'white', download: true });
        let canvas = viewer.pngURI();
        let a = document.createElement('a');
        a.href = canvas;
        a.download = 'mol.png';
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
function displayXML(xmlFilename: string, xml: string) {
    let xmlDiv: HTMLDivElement = document.getElementById(xmlDivID) as HTMLDivElement;
    let xml2DivID = addID(xmlDivID, 2);
    // Remove any existing mlDivID HTMLDivElement.
    remove(xml2DivID, ids);
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
function processProperty(p: Property, units: string[] | undefined, molecule: Molecule, element: Element, plDiv: HTMLDivElement,
    textArea: boolean,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    // PropertyScalar.
    let scalarNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyScalar.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + PropertyScalar.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString: string = getInputString(scalarNodes[0]);
        let value: Big = new Big(inputString);
        let psAttributes: Map<string, string> = getAttributes(scalarNodes[0]);
        let ps: PropertyScalar = new PropertyScalar(psAttributes, value);
        p.setProperty(ps);
        let lwi: HTMLDivElement = createLabelWithInput("number", getID(plDiv.id, p.dictRef),
            boundary, level, (event: Event) => {
                let target = event.target as HTMLInputElement;
                setNumberNode(ps, target);
            }, inputString, p.dictRef);
        let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
        resizeInputElement(input);
        input.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            inputString = target.value;
            ps = p.getProperty() as PropertyScalar;
            ps.value = new Big(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + inputString);
            resizeInputElement(input);
            if (p.dictRef == ZPE.dictRef) {
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
        addAnyUnits(units, psAttributes, lwi, getID(plDiv.id, p.dictRef, PropertyScalar.s_units), p.dictRef, boundary, boundary);
        plDiv.appendChild(lwi);
    } else {
        // PropertyArray.
        let arrayNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString: string = getInputString(arrayNodes[0]);
            let values: Big[] = toNumberArray(inputString.split(/\s+/));
            let paAttributes: Map<string, string> = getAttributes(arrayNodes[0]);
            let pa: PropertyArray = new PropertyArray(paAttributes, values);
            let psAttributes: Map<string, string> = getAttributes(arrayNodes[0]);
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
                let inputDiv: HTMLDivElement = createLabelWithTextArea(getID(plDiv.id, p.dictRef),
                    boundary, level, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        setNumberArrayNode(pm, target);
                    }, inputString, label);
                let ta: HTMLTextAreaElement = inputDiv.querySelector('textarea') as HTMLTextAreaElement;
                ta.value = inputString;
                resizeTextAreaElement(ta);
                ta.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    inputString = target.value;
                    pm = p.getProperty() as PropertyMatrix;
                    values = toNumberArray(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.getID() + " to " + inputString);
                    //resizeInputElement(inputElement);
                    resizeTextAreaElement(ta);
                });
                addAnyUnits(units, pmAttributes, inputDiv, getID(plDiv.id, p.dictRef, s_Select, "Units"), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            } else {
                throw new Error("Expecting " + PropertyScalar.tagName + ", " + PropertyArray.tagName + " or "
                    + PropertyMatrix.tagName + " but finding none!");
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
function addAnyUnits(units: string[] | undefined, attributes: Map<string, string>, divToAppendTo: HTMLDivElement,
    id: string, tagOrDictRef: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    if (units != undefined) {
        let lws: HTMLDivElement | undefined = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level);
        if (lws != undefined) {
            divToAppendTo.appendChild(lws);
        }
    } else {
        let attributesUnits: string | undefined = attributes.get("units");
        if (attributesUnits != undefined) {
            let label: HTMLLabelElement = createLabel("units " + attributesUnits, level);
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
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */
function processEnergyTransferModel(etm: EnergyTransferModel, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement) {
    let xml_deltaEDowns: HTMLCollectionOf<Element> = element.getElementsByTagName(DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmdivID: string = getID(molecule.getID(), EnergyTransferModel.tagName);
        let etmDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        let etmcDivID = getID(etmdivID, s_container);
        let etmcDiv: HTMLDivElement = getCollapsibleDiv(etmcDivID, moleculeDiv, null, etmDiv, EnergyTransferModel.tagName, boundary1, level1);
        let deltaEDowns: DeltaEDown[] = [];
        for (let k = 0; k < xml_deltaEDowns.length; k++) {
            let inputString: string = getInputString(xml_deltaEDowns[k]);
            let value: Big = new Big(inputString);
            let deltaEDownAttributes: Map<string, string> = getAttributes(xml_deltaEDowns[k]);
            let deltaEDown: DeltaEDown = new DeltaEDown(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label: string = DeltaEDown.tagName;
            // Create a new div element for the input.
            let id = molecule.getID() + "_" + EnergyTransferModel.tagName + "_" + DeltaEDown.tagName + "_" + k;
            let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    setNumberNode(deltaEDown, target);
                    inputString = target.value;
                    deltaEDowns[k].setValue(new Big(inputString));
                    console.log("Set " + id + " to " + inputString);
                    resizeInputElement(target);
                }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel: HTMLLabelElement = document.createElement('label');
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
export function setNumberArrayNode(node: NumberArrayNode, input: HTMLInputElement): void {
    let inputString: string = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        input.value = arrayToString(node.values, " ");
        return;
    }
    let inputStrings: string[] = inputString.split(/\s+/);
    let values: number[] = [];
    let success: boolean = true;
    inputStrings.forEach(function (value) {
        if (!isNumeric(value)) {
            success = false;
        }
        values.push(parseFloat(value));
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        input.value = arrayToString(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        console.log("Changed " + node.tagName + " from: \"" + inputString + "\" to: \"" + arrayToString(node.values, " ") + "\"");
        //console.log("molecule=" + molecule);
    } else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        input.value = arrayToString(node.values, " ");
    }
}

/**
 * Set a molecule number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */
export function setNumberNode(node: NumberNode, input: HTMLInputElement): void {
    if (isNumeric(input.value)) {
        node.value = new Big(input.value);
        //console.log(node.tagName + " value set to " + node.value);
    } else {
        alert("Value is not numeric, resetting...");
        input.value = bigToString(node.value);
    }
}

/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml: XMLDocument): HTMLDivElement {
    // Initialise reactions.
    reactions = new Map();
    // Create div to contain the reaction list.
    let reactionListDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "reactionList" element.
    let xml_reactionList: Element = getSingularElement(xml, ReactionList.tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames: Set<string> = new Set();
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
    if (!reactionListTagNames.has(Reaction.tagName)) {
        throw new Error("Expecting tags with \"" + Reaction.tagName + "\" tagName but there are none!");
    }
    // Process the XML "reaction" elements.
    let xml_reactions: HTMLCollectionOf<Element> = xml_reactionList.getElementsByTagName(Reaction.tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_reactions.length; i++) {
        // Set attributes.
        let reactionAttributes: Map<string, string> = getAttributes(xml_reactions[i]);
        // Create reaction.
        let reaction = new Reaction(reactionAttributes);
        reactions.set(reaction.id, reaction);
        let reactionTagNames: Set<string> = new Set();
        let cns: NodeListOf<ChildNode> = xml_reactions[i].childNodes;
        // Create a new div for the reaction.
        let reactionDivID: string = getID(Reaction.tagName, i);
        let reactionDiv: HTMLDivElement = createDiv(reactionDivID);
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for (let j = 0; j < cns.length; j++) {
            let cn: ChildNode = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!reactionTagNames.has(cn.nodeName)) {
                reactionTagNames.add(cn.nodeName);
            } else {
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
        let xml_reactants: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Reactant.tagName);
        reactionTagNames.delete(Reactant.tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new collapsible div for the reactants.
            let rsDivID: string = getID(reaction.id, Reactant.tagName);
            let rsDiv: HTMLDivElement = createDiv(rsDivID);
            let rscDivID = getID(rsDivID, s_container);
            let rscDiv: HTMLDivElement = getCollapsibleDiv(rscDivID, reactionDiv, null, rsDiv, "Reactants", boundary1, level1);
            let reactants: Reactant[] = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let reactantDivID = getID(reaction.id, Reactant.tagName, j);
                let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let reactant: Reactant = new Reactant(getAttributes(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let lws: HTMLDivElement = createLabelWithSelect(molecule.ref + " role", Reactant.roleOptions, "Role",
                    molecule.role, getID(reactantDivID, s_Select), boundary1, level1);
                lws.querySelector('select')?.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    resizeSelectElement(target);
                });
                rsDiv.appendChild(lws);
            }
            reaction.setReactants(reactants);
        }
        // Load products.
        let xml_products: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Product.tagName);
        reactionTagNames.delete(Product.tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            // Create collapsible div for the products.
            let psDivID: string = getID(reactionDivID, Product.tagName);
            let psDiv: HTMLDivElement = createDiv(psDivID);
            let pscDivID = getID(psDivID, s_container);
            let pscDiv: HTMLDivElement = getCollapsibleDiv(pscDivID, reactionDiv, null, psDiv,
                "Products", boundary1, level1);
            let products: Product[] = [];
            for (let j = 0; j < xml_products.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_products[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let product: Product = new Product(getAttributes(xml_products[j]), molecule);
                products.push(product);
                let lws: HTMLDivElement = createLabelWithSelect(molecule.ref + " role", Product.roleOptions, molecule.role,
                    molecule.ref, "Role", boundary1, level1);
                let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
                select.value = molecule.role;
                select.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    resizeSelectElement(target);
                });
                resizeSelectElement(select);
                psDiv.appendChild(lws);
            }
            reaction.setProducts(products);
        }
        // Create a new collapsible div for the reaction.
        let reactioncDivID = getID(reactionDivID, s_container);
        let reactioncDiv: HTMLDivElement = getCollapsibleDiv(reactioncDivID, reactionListDiv, null, reactionDiv,
            reaction.id + " (" + reaction.getLabel() + ")", boundary1, level1);

        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling: Tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws: HTMLDivElement = createLabelWithSelect(Tunneling.tagName, Tunneling.options, "Tunneling", tunneling.getName(),
                reaction.id, boundary1, level1);
            lws.querySelector('select')?.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLSelectElement;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
                resizeSelectElement(target);
            });
            reactionDiv.appendChild(lws);
        }
        // Load transition states.
        let xml_transitionStates: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(TransitionState.tagName);
        //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
        if (xml_transitionStates.length > 0) {
            // Create collapsible div.
            let tsDivID: string = getID(reactionDivID, Product.tagName);
            let tsDiv: HTMLDivElement = createDiv(tsDivID);
            let tscDivID = getID(tsDivID, s_container);
            let tscDiv: HTMLDivElement = getCollapsibleDiv(tscDivID, reactionDiv, null, tsDiv,
                "Transition States", boundary1, level1);
            let transitionStates: TransitionState[] = [];
            for (let j = 0; j < xml_transitionStates.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_transitionStates[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let transitionState: TransitionState = new TransitionState(getAttributes(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label: HTMLLabelElement = createLabel(molecule.ref + " role transitionState", level1);
                tsDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
        }
        // Load MCRCMethod.
        //console.log("Load MCRCMethod...");
        let xml_MCRCMethod: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(MCRCMethod.tagName);
        //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
        //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
        if (xml_MCRCMethod.length > 0) {
            if (xml_MCRCMethod.length > 1) {
                throw new Error("Expecting 1 " + MCRCMethod.tagName + " but finding " + xml_MCRCMethod.length + "!");
            } else {
                let mCRCMethodDiv: HTMLDivElement = document.createElement("div");
                let mCRCMethod: MCRCMethod;
                let mCRCMethodAttributes: Map<string, string> = getAttributes(xml_MCRCMethod[0]);
                let name: string | undefined = mCRCMethodAttributes.get("name");
                //console.log(MCRCMethod.tagName + " name=" + name);
                if (name == undefined || name == MesmerILT.xsiType2) {
                    let type: string = mCRCMethodAttributes.get("xsi:type") as string;
                    mCRCMethod = new MesmerILT(mCRCMethodAttributes);
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    if (type == MesmerILT.xsiType || type == MesmerILT.xsiType2) {
                        // Create a collapsible div.
                        let mDivId: string = getID(reaction.id, MCRCMethod.tagName);
                        let mDiv: HTMLDivElement = createDiv(mDivId);
                        let mcDivId = getID(mDivId, s_container);
                        let mcDiv: HTMLDivElement = getCollapsibleDiv(mcDivId, reactionDiv, null, mDiv, MCRCMethod.tagName, boundary1, level1);
                        reactionDiv.appendChild(mcDiv);
                        let xml_preExponential: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(PreExponential.tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let inputString: string = getInputString(xml_preExponential[0]);
                                let value: Big = new Big(inputString);
                                let preExponentialAttributes: Map<string, string> = getAttributes(xml_preExponential[0]);
                                let preExponential: PreExponential = new PreExponential(preExponentialAttributes, value);
                                (mCRCMethod as MesmerILT).setPreExponential(preExponential);
                                let label: string = PreExponential.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + PreExponential.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(preExponential, target);
                                    }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    preExponential.value = new Big(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + PreExponential.tagName,
                                    PreExponential.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_activationEnergy: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(ActivationEnergy.tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let inputString: string = getInputString(xml_activationEnergy[0]);
                                let value: Big = new Big(inputString);
                                let activationEnergyAttributes: Map<string, string> = getAttributes(xml_activationEnergy[0]);
                                let activationEnergy: ActivationEnergy = new ActivationEnergy(activationEnergyAttributes, value);
                                (mCRCMethod as MesmerILT).setActivationEnergy(activationEnergy);
                                let label: string = ActivationEnergy.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + ActivationEnergy.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(activationEnergy, target);
                                    }, inputString, label);
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    activationEnergy.value = new Big(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + ActivationEnergy.tagName,
                                    ActivationEnergy.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_tInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(TInfinity.tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let inputString: string = getInputString(xml_tInfinity[0]);
                                let value: Big = new Big(inputString);
                                let tInfinityAttributes: Map<string, string> = getAttributes(xml_tInfinity[0]);
                                let tInfinity: TInfinity = new TInfinity(tInfinityAttributes, value);
                                (mCRCMethod as MesmerILT).setTInfinity(tInfinity);
                                let label: string = TInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + TInfinity.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(tInfinity, target);
                                    }, inputString, label);
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    tInfinity.value = new Big(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + TInfinity.tagName,
                                    TInfinity.tagName, boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_nInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(NInfinity.tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let inputString: string = getInputString(xml_nInfinity[0]);
                                let value: Big = new Big(inputString);
                                let nInfinityAttributes: Map<string, string> = getAttributes(xml_nInfinity[0]);
                                let nInfinity: NInfinity = new NInfinity(nInfinityAttributes, value);
                                (mCRCMethod as MesmerILT).setNInfinity(nInfinity);
                                let label: string = NInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + NInfinity.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(nInfinity, target);
                                    }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    nInfinity.value = new Big(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + NInfinity.tagName, NInfinity.tagName,
                                    boundary1, level1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                    } else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                } else {
                    mCRCMethod = new MCRCMethod(mCRCMethodAttributes);
                    let mCRCMethodLabel: HTMLLabelElement = document.createElement('label');
                    mCRCMethodLabel.textContent = MCRCMethod.tagName + ": " + mCRCMethodAttributes.get("name") as string;
                    Object.assign(mCRCMethodLabel.style, level1);
                    mCRCMethodDiv.appendChild(mCRCMethodLabel);
                    reactionDiv.appendChild(mCRCMethodDiv);
                }
                reaction.setMCRCMethod(mCRCMethod);
            }
        }

        // Load excessReactantConc
        let xml_excessReactantConc = xml_reactions[i].getElementsByTagName(ExcessReactantConc.tagName);
        if (xml_excessReactantConc.length > 0) {
            if (xml_excessReactantConc.length > 1) {
                throw new Error("Expecting 1 " + ExcessReactantConc.tagName + " but finding " + xml_excessReactantConc.length + "!");
            }
            let value: Big = new Big(getNodeValue(getFirstChildNode(xml_excessReactantConc[0])));
            let excessReactantConc: ExcessReactantConc = new ExcessReactantConc(getAttributes(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
            let id = reaction.id + "_" + ExcessReactantConc.tagName;
            let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    setNumberNode(excessReactantConc, target);
                }, value.toExponential(), ExcessReactantConc.tagName);
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
function processConditions(xml: XMLDocument): HTMLDivElement {
    console.log(Conditions.tagName);
    // Create a div for the conditionss.
    let conditionssDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "me:conditions" element.
    let xml_conditionss: HTMLCollectionOf<Element> = xml.getElementsByTagName(Conditions.tagName);
    for (let i = 0; i < xml_conditionss.length; i++) {
        let xml_conditions: Element = xml_conditionss[i];
        // Create a collapsible div for each conditions.
        let cDivID: string = getID(Conditions.tagName, i.toString());
        let cDiv: HTMLDivElement = createDiv(cDivID, boundary1);
        let ccDivID = getID(cDivID, s_container);
        let ccDiv: HTMLDivElement = getCollapsibleDiv(ccDivID, conditionssDiv, null, cDiv, Conditions.tagName + " " + i.toString(),
            boundary1, level1);
        let conditions: Conditions = addConditions(getAttributes(xml_conditions), cDiv, null, conditionssDiv, i);
        handleBathGases(conditions, cDiv, i, xml_conditions);
        handlePTs(conditions, cDiv, i, xml_conditions);
        // Add a remove conditions button.
        let removeButton: HTMLButtonElement = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the conditions.
            remove(ccDivID, ids);
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
function handleBathGases(conditions: Conditions, conditionsDiv: HTMLDivElement, conditionsIndex: number, xml_conditions: Element | null): void {

    // Bath Gases
    // Create a collapsible div.
    let bsDivID: string = getID(Conditions.tagName, conditionsIndex.toString(), BathGas.tagName);
    let bsDiv: HTMLDivElement = createDiv(bsDivID);
    let bscDivID = getID(bsDivID, s_container);
    let bscDiv: HTMLDivElement = getCollapsibleDiv(bscDivID, conditionsDiv, null, bsDiv, BathGas.tagName, boundary1, level1);
    // Add add button.
    let addBathGasButton: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas: BathGas = new BathGas(new Map(), s_selectOption);
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div: HTMLDivElement = createFlexDiv(undefined, level1);
        let id: string = getID(bsDivID, bathGasIndex.toString());
        let select: HTMLSelectElement = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true, id);
        select.classList.add(BathGas.tagName);
        div.appendChild(select);
        addRemoveButton(div, boundary1, (bathGas) => {
            bsDiv.removeChild(div);
            conditions.removeBathGas(bathGas);
        });
        bsDiv.insertBefore(div, addBathGasButton);
    });

    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases: Element[] = Array.from(xml_conditions.children).filter(child => child.tagName === BathGas.tagName);
        if (xml_bathGases.length > 0) {
            for (let i = 0; i < xml_bathGases.length; i++) {
                let attributes: Map<string, string> = getAttributes(xml_bathGases[i]);
                let moleculeID: string = getNodeValue(getFirstChildNode(xml_bathGases[i]));
                let bathGas: BathGas = new BathGas(attributes, moleculeID);
                console.log("bathGas" + bathGas.toString());
                let bathGasIndex = conditions.addBathGas(bathGas);
                let id: string = getID(bsDivID, bathGasIndex.toString());
                let div: HTMLDivElement = createFlexDiv(id, level1);
                div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, false, id));
                addRemoveButton(div, boundary1, (bathGas) => {
                    bsDiv.removeChild(div);
                    conditions.removeBathGas(bathGas);
                });
                bsDiv.insertBefore(div, addBathGasButton);
            }
        } else {
            let id: string = getID(bsDivID, "0");
            let div: HTMLDivElement = createFlexDiv(getID(bsDivID, 0), level1);
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
function handlePTs(conditions: Conditions, conditionsDiv: HTMLDivElement, conditionsIndex: number, xml_conditions: Element | null): void {
    // PTs
    let moleculeKeys: Set<string> = new Set(molecules.keys());
    // Create collapsible div.
    let pTsDivId: string = getID(conditionsDiv.id, conditionsIndex.toString(), PTs.tagName);
    let pTsDiv: HTMLDivElement = createDiv(pTsDivId);
    let pTscDivId = getID(pTsDivId, s_container);
    let pTscDiv: HTMLDivElement = getCollapsibleDiv(pTscDivId, conditionsDiv, null, pTsDiv, PTs.tagName, boundary1, level1);
    let pTs: PTs;
    if (xml_conditions) {
        let xml_PTss: HTMLCollectionOf<Element> = xml_conditions.getElementsByTagName(PTs.tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) {
                throw new Error("Expecting 1 " + PTs.tagName + " but finding " + xml_PTss.length + "!");
            }
            let attributes: Map<string, string> = getAttributes(xml_PTss[0]);
            let xml_PTpairs: HTMLCollectionOf<Element> = xml_PTss[0].getElementsByTagName(PTpair.tagName);
            if (xml_PTpairs.length == 0) {
                throw new Error("Expecting 1 or more " + PTpair.tagName + " but finding 0!");
            } else {
                pTs = new PTs(attributes);
                for (let i = 0; i < xml_PTpairs.length; i++) {
                    let pTpairAttributes: Map<string, string> = getAttributes(xml_PTpairs[i]);
                    console.log("pTpairAttributes=" + mapToString(pTpairAttributes));
                    let pTpair = new PTpair(pTpairAttributes);
                    pTs.addPTpair(pTpair);
                    // BathGas.
                    let xml_bathGass: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(BathGas.tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) {
                            console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        }
                        pTpair.setBathGas(new BathGas(getAttributes(xml_bathGass[0]),
                            getNodeValue(getFirstChildNode(xml_bathGass[0]))));
                    }
                    // ExperimentRate.
                    let xml_ers: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalRate.tagName);
                    if (xml_ers.length > 0) {
                        if (xml_ers.length > 1) {
                            console.warn("xml_experimentRates.length=" + xml_ers.length);
                        }
                        pTpair.setExperimentalRate(new ExperimentalRate(getAttributes(xml_ers[0]),
                            new Big(getNodeValue(getFirstChildNode(xml_ers[0])).trim())));
                    }
                    // ExperimentalYield.
                    let xml_eys: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalYield.tagName);
                    if (xml_eys.length > 0) {
                        if (xml_eys.length > 1) {
                            console.warn("xml_experimentalYields.length=" + xml_eys.length);
                        }
                        pTpair.setExperimentalYield(new ExperimentalYield(getAttributes(xml_eys[0]),
                            new Big(getNodeValue(getFirstChildNode(xml_eys[0])).trim())));
                    }
                    // ExperimentalEigenvalue.
                    let xml_ees: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalEigenvalue.tagName);
                    if (xml_ees.length > 0) {
                        if (xml_ees.length > 1) {
                            console.warn("xml_experimentalEigenvalues.length=" + xml_ees.length);
                        }
                        pTpair.setExperimentalEigenvalue(new ExperimentalEigenvalue(getAttributes(xml_ees[0]),
                            new Big(getNodeValue(getFirstChildNode(xml_ees[0])).trim())));
                    }
                    // Create pTpairDiv.
                    pTsDiv.append(createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, conditionsIndex, i, moleculeKeys, level1));
                }
            }
        } else {
            pTs = new PTs(new Map());
        }
    } else {
        pTs = new PTs(new Map());
    }
    conditions.setPTs(pTs);
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = createDiv(undefined, level1);
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton: HTMLButtonElement = createButton(s_Add_sy_add, undefined, boundary1);
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', () => {
        // Create a new PTpair.
        let pTpairAttributes: Map<string, string> = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair: PTpair = new PTpair(pTpairAttributes);
        let pTpairIndex: number = pTs.addPTpair(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, conditionsIndex, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton: HTMLButtonElement = createButton(s_Add_from_spreadsheet, undefined, boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div: HTMLDivElement = createFlexDiv(undefined, level1);
        let addFromSpreadsheetId = getID(PTs.tagName, "addFromSpreadsheet");
        let input: HTMLInputElement = createInput("text", addFromSpreadsheetId, level1);
        div.appendChild(input);
        pTsDiv.insertBefore(div, pTsButtonsDiv);
        // Add an event listener to the inputElement.
        input.addEventListener('change', () => {
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray: string[] = input.value.split(" ");
                // Is there a header?
                let index: Map<string, number> = new Map();
                pTpairsArray[0].split("\t").forEach((value, i) => {
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for (let i = 1; i < pTpairsArray.length; i++) {
                    let pTpairArray: string[] = pTpairsArray[i].split("\t");
                    let pIndex: number = index.get("P") as number;
                    let p: number = parseFloat(pTpairArray[pIndex]);
                    let unitsIndex: number = index.get("units") as number;
                    let pTpairAttributes: Map<string, string> = new Map();
                    if (index.has("units")) {
                        let units: string = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair: PTpair = new PTpair(pTpairAttributes);
                    pTs.addPTpair(pTpair);
                    let tIndex: number = index.get("T") as number;
                    let t: number = parseFloat(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has(PTpair.s_excessReactantConc)) {
                        let excessReactantConIndex: number = index.get(PTpair.s_excessReactantConc) as number;
                        let excessReactantConc: string = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set(PTpair.s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has(PTpair.s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex: number = index.get(PTpair.s_percentExcessReactantConc) as number;
                        let percentExcessReactantConc: string = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set(PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has(PTpair.s_precision)) {
                        console.log("index.has(PTpair.s_precision)");
                        let precisionIndex: number = index.get(PTpair.s_precision) as number;
                        let precision: string = pTpairArray[precisionIndex];
                        pTpairAttributes.set(PTpair.s_precision, precision);
                        //console.log("precision=" + precision);
                    }
                    if (index.has(BathGas.tagName)) {
                        let bathGasIndex: number = index.get(BathGas.tagName) as number;
                        let bathGas: string = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new BathGas(new Map(), bathGas));
                    }
                    if (index.has(ExperimentalRate.tagName)) {
                        let experimentalRateIndex: number = index.get(ExperimentalRate.tagName) as number;
                        let experimentalRate: string = pTpairArray[experimentalRateIndex];
                        pTpairAttributes.set(ExperimentalRate.tagName, experimentalRate);
                        pTpair.setExperimentalRate(new ExperimentalRate(new Map(), new Big(experimentalRate)));
                        // Set the attributes of the experimentalRate.
                        // ref1.
                        let experimentalRateRef1Index = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref1) as number;
                        let experimentalRateRef1 = pTpairArray[experimentalRateRef1Index];
                        pTpair.getExperimentalRate()?.setRef1(experimentalRateRef1);
                        // ref2.
                        let experimentalRateRef2Index = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref2) as number;
                        let experimentalRateRef2 = pTpairArray[experimentalRateRef2Index];
                        pTpair.getExperimentalRate()?.setRef2(experimentalRateRef2);
                        // refReaction.
                        let experimentalRateRefReactionIndex = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_refReaction) as number;
                        let experimentalRateRefReaction = pTpairArray[experimentalRateRefReactionIndex];
                        pTpair.getExperimentalRate()?.setRefReaction(experimentalRateRefReaction);
                        // error.
                        let experimentalRateErrorIndex = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_error) as number;
                        let experimentalRateError = pTpairArray[experimentalRateErrorIndex];
                        pTpair.getExperimentalRate()?.setError(parseFloat(experimentalRateError));
                    }
                    if (index.has(ExperimentalYield.tagName)) {
                        let experimentalYieldIndex: number = index.get(ExperimentalYield.tagName) as number;
                        let experimentalYield: string = pTpairArray[experimentalYieldIndex];
                        pTpair.setExperimentalYield(new ExperimentalYield(new Map(), new Big(experimentalYield)));
                        // Set the attributes of the experimentalYield.
                        // ref.
                        let experimentalYieldRefIndex = index.get(ExperimentalYield.tagName + "_" + ExperimentalYield.s_ref) as number;
                        let experimentalYieldRef = pTpairArray[experimentalYieldRefIndex];
                        pTpair.getExperimentalYield()?.setRef(experimentalYieldRef);
                        // yieldTime.
                        let experimentalYieldYieldTimeIndex = index.get(ExperimentalYield.tagName + "_" + ExperimentalYield.s_yieldTime) as number;
                        let experimentalYieldYieldTime = pTpairArray[experimentalYieldYieldTimeIndex];
                        pTpair.getExperimentalYield()?.setYieldTime(parseFloat(experimentalYieldYieldTime));
                        // error.
                        let experimentalYieldErrorIndex = index.get(ExperimentalYield.tagName + "_" + ExperimentalYield.s_error) as number;
                        let experimentalYieldError = pTpairArray[experimentalYieldErrorIndex];
                        pTpair.getExperimentalYield()?.setError(parseFloat(experimentalYieldError));
                    }
                    if (index.has(ExperimentalEigenvalue.tagName)) {
                        let experimentalEigenvalueIndex: number = index.get(ExperimentalEigenvalue.tagName) as number;
                        let experimentalEigenvalue: string = pTpairArray[experimentalEigenvalueIndex];
                        pTpair.setExperimentalEigenvalue(new ExperimentalEigenvalue(new Map(), new Big(experimentalEigenvalue)));
                        // Set the attributes of the experimentalEigenvalue.
                        // EigenvalueID.
                        let experimentalEigenvalueEigenvalueIDIndex = index.get(ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_EigenvalueID) as number;
                        let experimentalEigenvalueEigenvalueID = pTpairArray[experimentalEigenvalueEigenvalueIDIndex];
                        pTpair.getExperimentalEigenvalue()?.setEigenvalueID(experimentalEigenvalueEigenvalueID);
                        // error.
                        let experimentalEigenvalueErrorIndex = index.get(ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_error) as number;
                        let experimentalEigenvalueError = pTpairArray[experimentalEigenvalueErrorIndex];
                        pTpair.getExperimentalEigenvalue()?.setError(parseFloat(experimentalEigenvalueError));
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex: number = pTs.pTpairs.length - 1;
                    // Create a new div for the PTpair.
                    pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, conditionsIndex, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton: HTMLButtonElement = createButton("Remove All", undefined, boundary1);
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener('click', () => {
        pTs.removePTpairs();
        // Remove all elements before the pTsButtonsDiv.
        let child: Node | null = pTsDiv.firstChild;
        while (child != null && child != pTsButtonsDiv) {
            let nextSibling: Node | null = child.nextSibling;
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
function createAddConditionsButton(conditionssDiv: HTMLDivElement): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event: MouseEvent) => {
        let i: number = mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        // Create collapsible div.
        let cDivID: string = getID(Conditions.tagName, i.toString());
        let cDiv: HTMLDivElement = createDiv(cDivID, boundary1);
        let ccDivID = getID(cDivID, s_container);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore: Element | null;
        if (i > 0) {
            let aboveElement = document.getElementById(getID(Conditions.tagName, (i - 1).toString(), s_container)) as Element;
            let nextElementSibling: Element | null = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) {
                    elementToInsertBefore = nextElementSibling;
                } else {
                    elementToInsertBefore = button;
                }
            } else {
                elementToInsertBefore = button;
            }
        } else {
            elementToInsertBefore = button;
        }
        let ccDiv: HTMLDivElement = getCollapsibleDiv(ccDivID, conditionssDiv, elementToInsertBefore, cDiv,
            Conditions.tagName + " " + i.toString(), boundary1, level1);
        // Add the conditions
        let conditions: Conditions = addConditions(new Map(), cDiv, elementToInsertBefore, conditionssDiv, i);
        handleBathGases(conditions, cDiv, i, null);
        handlePTs(conditions, cDiv, i, null);
        // Add a remove conditions button.
        let removeButton: HTMLButtonElement = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the conditions.
            remove(ccDivID, ids);
        });
    });
    return button;
}

/**
 * Add and return a new conditions.
 */
function addConditions(attributes: Map<string, string>, conditionsDiv: HTMLDivElement, elementToInsertBefore: Element | null,
    conditionssDiv: HTMLDivElement, i: number): Conditions {
    let conditions: Conditions = new Conditions(attributes, i);
    mesmer.addConditions(conditions);
    let contentDivId: string = getID(Conditions.tagName, i.toString());

    /*
    getCollapsibleDiv({
        divToAddTo: conditionssDiv,
        elementToInsertBefore: elementToInsertBefore,
        content: conditionsDiv,
        buttonLabel: "Conditions " + i.toString(),
        buttonId: getID(contentDivId, s_button),
        margin: level1,
        contentDivId: contentDivId
    });
    */
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
function createPTpairDiv(pTs: PTs, pTsDiv: HTMLDivElement, pTpair: PTpair, conditionsDivId: string, conditionsIndex: number, pTIndex: number,
    moleculeKeys: Set<string>,
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let pTpairDiv: HTMLDivElement = createFlexDiv(undefined, level);
    addPorT(pTpairDiv, PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits(Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, PTpair.tagName, PTpair.tagName, boundary1, level1);
    addPorT(pTpairDiv, PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    let id: string = getID(conditionsDivId, PTpair.tagName, pTIndex.toString());

    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, getID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, conditionsIndex, pTIndex, PTpair.s_excessReactantConc, createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);

    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    addPercentExcessReactantConc(pTpairDiv, pTpair, conditionsIndex, pTIndex);

    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, getID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, conditionsIndex, pTIndex, PTpair.s_precision, createPrecisionSelectElement);
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
    addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, ExperimentalRate.tagName,
        (pTpair) => pTpair.getExperimentalRate(), createExperimentalRateDetails);

    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, getID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, ExperimentalYield.tagName,
        (pTpair) => pTpair.getExperimentalYield(), createExperimentalYieldDetails
    );

    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, getID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, conditionsIndex, pTIndex, ExperimentalYield.tagName,
        (pTpair) => pTpair.getExperimentalEigenvalue(), createExperimentalEigenvalueDetails
    );

    // Function to be used to remove a PTpair.
    let removePTpair: (pTpairDiv: HTMLDivElement, i: number | undefined, pTpair: PTpair) => void = (pTpairDiv, i, pTpair) => {
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) {
            pTs.removePTpair(i);
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
function addPorT(pTpairDiv: HTMLDivElement, name: string, getter: () => number, setter: (value: number) => void): void {
    let lwi: HTMLDivElement = createLabelWithInput("number", PTpair.tagName + "_" + name,
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            if (isNumeric(target.value)) {
                setter(parseFloat(target.value));
                console.log(`Set ${name} to ${target.value}`);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = getter().toString();
            }
            resizeInputElement(target);
        }, getter().toExponential(), name);
    let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
    input.value = getter().toString();
    resizeInputElement(input);
    pTpairDiv.appendChild(lwi);
}

/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param conditionsIndex The conditions index.
 * @param pTIndex The pTindex.
 */
function addPercentExcessReactantConc(pTpairDiv: HTMLDivElement, pTpair: PTpair, conditionsIndex: number, pTIndex: number): void {
    let id: string = getID(conditionsIndex.toString(), pTIndex.toString(), PTpair.s_percentExcessReactantConc);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.append(div);
    let attribute: string = PTpair.s_percentExcessReactantConc;
    let buttonTextContentSelected: string = attribute + sy_selected;
    let buttonTextContentDeselected: string = attribute + sy_deselected;
    let button = createButton(buttonTextContentDeselected, getID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
        } else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
        }
    });
}

function addAttribute(pTpairDiv: HTMLDivElement, pTpair: PTpair, conditionsIndex: number, pTIndex: number, attribute: string,
    createInputElement: (id: string, pTpair: PTpair) => HTMLInputElement | HTMLSelectElement): void {
    let id: string = getID(conditionsIndex.toString(), pTIndex.toString(), attribute);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected: string = attribute + sy_selected;
    let buttonTextContentDeselected: string = attribute + sy_deselected;
    let button = createButton(buttonTextContentDeselected, getID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = getID(id, s_Input);
    if (pTpair.attributes.has(attribute)) {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        let input = createInputElement(iid, pTpair);
        div.insertBefore(input, button.nextSibling);
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = createInputElement(iid, pTpair);
            div.insertBefore(input, button.nextSibling);
        } else {
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
function addBathGas(pTpairDiv: HTMLDivElement, pTpair: PTpair, conditionsIndex: number, pTIndex: number, moleculeKeys: Set<string>): void {
    let id: string = getID(conditionsIndex.toString(), pTIndex.toString(), BathGas.tagName);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.append(div);
    let tagName: string = BathGas.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, getID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = getID(id, s_Input);
    let bathGas: BathGas | undefined = pTpair.getBathGas();
    if (bathGas == undefined) {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) {
            console.warn("moleculeKeys does not contain " + bathGas.value);
        }
        div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            remove(iid);
        }
    });
}

function addExperimentalElement(
    pTpairDiv: HTMLDivElement,
    pTpair: PTpair,
    conditionsIndex: number, pTIndex: number,
    tagName: string,
    getAttribute: (pTpair: PTpair) => any,
    createElement: (id: string, pTpair: PTpair, i: number) => HTMLElement
): void {
    let id: string = getID(conditionsIndex.toString(), pTIndex.toString(), tagName);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, getID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = getID(id, s_Input);
    if (getAttribute(pTpair) == undefined) {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        div.appendChild(createElement(iid, pTpair, pTIndex));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createElement(iid, pTpair, pTIndex));
        } else {
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
function createPrecisionSelectElement(id: string, pTpair: PTpair): HTMLSelectElement {
    let value: string;
    if (pTpair.attributes.has(PTpair.s_precision)) {
        value = pTpair.attributes.get(PTpair.s_precision) as string;
    } else {
        value = Mesmer.precisionOptions[0];
    }
    let select: HTMLSelectElement = createSelectElement(Mesmer.precisionOptions, PTpair.s_precision, value, id, boundary1);
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        pTpair.setPrecision(target.value);
        console.log("Set " + PTpair.s_precision + " to " + target.value);
        resizeSelectElement(target);
    });
    resizeSelectElement(select);
    return select;
}

/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */
function createExcessReactantConcInputElement(id: string, pTpair: PTpair): HTMLInputElement {
    let input: HTMLInputElement = createInput("number", id, boundary1);
    let value: string;
    if (pTpair.attributes.has(PTpair.s_excessReactantConc)) {
        value = pTpair.attributes.get(PTpair.s_excessReactantConc) as string;
    } else {
        value = NaN.toString();
    }
    console.log(PTpair.s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + PTpair.s_excessReactantConc + " to " + target.value);
        resizeInputElement(target);
    });
    resizeInputElement(input);
    return input;
}

/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */
function createBathGasSelectElement(id: string, pTpair: PTpair, bathGas: BathGas | undefined, first: boolean): HTMLSelectElement {
    //console.log("createBathGasSelectElement");
    //console.log("pTpair " + pTpair.toString());
    let select: HTMLSelectElement = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, first, id);
    select.id = id;
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        pTpair.setBathGas(new BathGas(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        resizeSelectElement(target);
    });
    resizeSelectElement(select);
    return select;
}

/**
 * @param options The options.
 * @param bathGas The bath gas.
 * @param first True if this is the first selection, flase otherwise?
 * @param id The id used to generate other ids.
 */
function createSelectElementBathGas(options: string[], bathGas: BathGas | undefined, first: boolean, id: string): HTMLSelectElement {
    let value: string;
    if (first) {
        options.push(s_selectOption);
    } else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    if (bathGas == undefined) {
        bathGas = new BathGas(new Map(), s_selectOption);
        value = s_selectOption;
    } else {
        value = bathGas.value;
    }
    let select: HTMLSelectElement = createSelectElement(options, BathGas.tagName, value, getID(id, s_Select), boundary1);
    select.classList.add(BathGas.tagName);
    selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        (bathGas as BathGas).value = target.value;
        console.log("Added " + target.value + " as " + BathGas.tagName);
        resizeSelectElement(target);
    });
    select.value = value;
    resizeSelectElement(select);
    return select;
}

function createExperimentalRateDetails(id: string, pTpair: PTpair): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        id,
        pTpair => pTpair.getExperimentalRate(),
        (pTpair, value) => pTpair.setExperimentalRate(value),
        ExperimentalRate,
        [
            {
                tagName: ExperimentalRate.tagName, type: "number",
                eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalRate() as ExperimentalRate, target),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).value.toString()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref1, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef1(target.value),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getRef1()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref2, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef2(target.value),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getRef2()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_refReaction, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRefReaction(target.value),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getRefReaction()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_error, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setError(parseFloat(target.value)),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getError().toString()
            }
        ]
    );
}

function createExperimentalYieldDetails(id: string, pTpair: PTpair): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        id,
        pTpair => pTpair.getExperimentalYield(),
        (pTpair, value) => pTpair.setExperimentalYield(value),
        ExperimentalYield,
        [
            {
                tagName: ExperimentalYield.tagName, type: "number",
                eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalYield() as ExperimentalYield, target),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).value.toString()
            },
            {
                tagName: ExperimentalYield.tagName + "_" + ExperimentalYield.s_ref, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalYield()?.setRef(target.value),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).getRef()
            },
            {
                tagName: ExperimentalYield.tagName + "_" + ExperimentalYield.s_yieldTime, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalYield()?.setYieldTime(parseFloat(target.value)),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).getYieldTime().toString()
            },
            {
                tagName: ExperimentalYield.tagName + "_" + ExperimentalYield.s_error, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalYield()?.setError(parseFloat(target.value)),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).getError().toString()
            }
        ]
    );
}

function createExperimentalEigenvalueDetails(id: string, pTpair: PTpair): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        id,
        pTpair => pTpair.getExperimentalEigenvalue(),
        (pTpair, value) => pTpair.setExperimentalEigenvalue(value),
        ExperimentalEigenvalue,
        [
            {
                tagName: ExperimentalEigenvalue.tagName, type: "number",
                eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue, target),
                valueGetter: () => (pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue).value.toString()
            },
            {
                tagName: ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_EigenvalueID, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
                valueGetter: () => (pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue).getEigenvalueID()
            },
            {
                tagName: ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_error, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setError(parseFloat(target.value)),
                valueGetter: () => (pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue).getError().toString()
            }
        ]
    );
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
function addExperimentalDetails<T extends ExperimentalRate | ExperimentalYield | ExperimentalEigenvalue>(
    pTpair: PTpair,
    id: string,
    getExperimental: (pTpair: PTpair) => T | undefined,
    setExperimental: (pTpair: PTpair, value: T) => void,
    ExperimentalClass: { new(attributes: Map<string, any>, value: Big): T },
    details: {
        tagName: string, type: string, eventHandler: (event: Event, target: HTMLInputElement) => void,
        valueGetter: () => string, label?: string
    }[]): HTMLDivElement {
    let div = createDiv(undefined, boundary1);
    div.id = id;
    let experimental: T | undefined = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), big0);
        setExperimental(pTpair, experimental);
    }
    for (let detail of details) {
        let detailId = id + "_" + detail.tagName;
        div.appendChild(createLabelWithInput(detail.type, detailId, boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            resizeInputElement(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}

/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function processModelParameters(xml: XMLDocument): HTMLDivElement {
    console.log(ModelParameters.tagName);
    let modelParametersDiv: HTMLDivElement = createDiv(undefined, boundary1);
    let xml_modelParameters: Element = getSingularElement(xml, ModelParameters.tagName);
    let modelParameters: ModelParameters = new ModelParameters(getAttributes(xml_modelParameters));
    mesmer.setModelParameters(modelParameters);
    processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, AutomaticallySetMaxEne,
        modelParameters.setAutomaticallySetMaxEne, modelParameters.removeAutomaticallySetMaxEne);
    processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, EnergyAboveTheTopHill,
        modelParameters.setEnergyAboveTheTopHill, modelParameters.removeEnergyAboveTheTopHill);
    processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, MaxTemperature,
        modelParameters.setMaxTemperature, modelParameters.removeMaxTemperature);
    return modelParametersDiv;
}

/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */
function processGrainSize(modelParameters: ModelParameters, xml_modelParameters: Element, modelParametersDiv: HTMLDivElement) {
    let div: HTMLDivElement = createFlexDiv(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = GrainSize.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(tagName);
    let button = createButton(tagName, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let id = ModelParameters.tagName + "_" + tagName + "_input";
    let ids = ModelParameters.tagName + "_" + tagName + "_select";
    let gs: GrainSize;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: Big = new Big(valueString);
        gs = new GrainSize(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, Mesmer.energyUnits);
        button.classList.toggle(s_optionOff);
    } else {
        valueString = "";
        gs = new GrainSize(new Map(), big0);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!modelParameters.index.has(GrainSize.tagName)) {
            createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            document.getElementById(id)?.remove();
            document.getElementById(ids)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
}

/**
 * Process numerical modelParameters.
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processModelParametersN<T extends { new(attributes: Map<string, string>, value: Big): any; tagName: string }>(
    modelParameters: ModelParameters, xml_modelParameters: Element, modelParametersDiv: HTMLDivElement, ModelParameterType: T,
    setModelParameter: (mp: InstanceType<T>) => void, removeModelParameter: () => void): void {
    let div: HTMLDivElement = createFlexDiv(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = ModelParameterType.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(tagName);
    let button = createButton(tagName, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let id = ModelParameters.tagName + "_" + tagName + "_input";
    let ids = ModelParameters.tagName + "_" + tagName + "_select";
    let mp: InstanceType<T>;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: Big = new Big(valueString);
        mp = new ModelParameterType(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
        button.classList.toggle(s_optionOff);
    } else {
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
        } else {
            valueString = mp.value.toExponential();
            removeModelParameter();
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
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
function createInputModelParameters(modelParameters: ModelParameters, div: HTMLDivElement, element: any,
    id: string, ids: string, valueString: string, setElementMethod: (value: any) => void, units: any): void {
    setElementMethod.call(modelParameters, element);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(element, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
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
function processControl(xml: XMLDocument): HTMLDivElement {
    console.log(Control.tagName);
    // Create a div for the controls.
    let controlsDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "me:control" element.
    let xml_controls: HTMLCollectionOf<Element> = xml.getElementsByTagName(Control.tagName);
    for (let i = 0; i < xml_controls.length; i++) {
        let xml_control: Element = xml_controls[i];
        // Create div to contain the control.
        let controlID: string = getID(Control.tagName, i.toString());
        let controlDiv: HTMLDivElement = createDiv(controlID, boundary1);
        let control: Control = addControl(getAttributes(xml_control), controlDiv, null, controlsDiv, i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls: Map<string, HTMLButtonElement> = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, controlDiv, i, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv: HTMLDivElement = createFlexDiv(undefined, level1);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button: HTMLButtonElement) => {
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, controlDiv, null, level1);
        handleCalcMethod(control, controlDiv, i, xml_control, level1);
        getControlItems(control).forEach(item => {
            handleControl(control, controlDiv, i, onOffControls, xml_control, level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton: HTMLButtonElement = addRemoveButton(controlDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the control.
            remove(controlID, ids);
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
function getControlOptionsSimple(control: Control): { class: any, setMethod: (value: any) => void, removeMethod: () => void }[] {
    return [
        { class: CalculateRateCoefficientsOnly, setMethod: control.setCalculateRateCoefficientsOnly, removeMethod: control.removeCalculateRateCoefficientsOnly },
        { class: PrintCellDOS, setMethod: control.setPrintCellDOS, removeMethod: control.removePrintCellDOS },
        { class: PrintCellTransitionStateFlux, setMethod: control.setPrintCellTransitionStateFlux, removeMethod: control.removePrintCellTransitionStateFlux },
        { class: PrintReactionOperatorColumnSums, setMethod: control.setPrintReactionOperatorColumnSums, removeMethod: control.removePrintReactionOperatorColumnSums },
        { class: PrintGrainBoltzmann, setMethod: control.setPrintGrainBoltzmann, removeMethod: control.removePrintGrainBoltzmann },
        { class: PrintGrainDOS, setMethod: control.setPrintGrainDOS, removeMethod: control.removePrintGrainDOS },
        { class: PrintGrainkbE, setMethod: control.setPrintGrainkbE, removeMethod: control.removePrintGrainkbE },
        { class: PrintGrainkfE, setMethod: control.setPrintGrainkfE, removeMethod: control.removePrintGrainkfE },
        { class: PrintTSsos, setMethod: control.setPrintTSsos, removeMethod: control.removePrintTSsos },
        { class: PrintGrainedSpeciesProfile, setMethod: control.setPrintGrainedSpeciesProfile, removeMethod: control.removePrintGrainedSpeciesProfile },
        { class: PrintGrainTransitionStateFlux, setMethod: control.setPrintGrainTransitionStateFlux, removeMethod: control.removePrintGrainTransitionStateFlux },
        { class: PrintReactionOperatorSize, setMethod: control.setPrintReactionOperatorSize, removeMethod: control.removePrintReactionOperatorSize },
        { class: PrintSpeciesProfile, setMethod: control.setPrintSpeciesProfile, removeMethod: control.removePrintSpeciesProfile },
        { class: PrintPhenomenologicalEvolution, setMethod: control.setPrintPhenomenologicalEvolution, removeMethod: control.removePrintPhenomenologicalEvolution },
        { class: PrintTunnelingCoefficients, setMethod: control.setPrintTunnelingCoefficients, removeMethod: control.removePrintTunnelingCoefficients },
        { class: PrintCrossingCoefficients, setMethod: control.setPrintCrossingCoefficients, removeMethod: control.removePrintCrossingCoefficients },
        { class: TestDOS, setMethod: control.setTestDOS, removeMethod: control.removeTestDOS },
        { class: TestRateConstant, setMethod: control.setTestRateConstants, removeMethod: control.removeTestRateConstants },
        { class: UseTheSameCellNumberForAllConditions, setMethod: control.setUseTheSameCellNumberForAllConditions, removeMethod: control.removeUseTheSameCellNumberForAllConditions },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        { class: ForceMacroDetailedBalance, setMethod: control.setForceMacroDetailedBalance, removeMethod: control.removeForceMacroDetailedBalance },
    ];
}

/**
 * @param control The control.
 * @return An array of the control items.
 */

function getControlItems(control: Control): { class: any, setMethod: (value: any) => void, removeMethod: () => void }[] {
    return [
        { class: Eigenvalues, setMethod: control.setEigenvalues, removeMethod: control.removeEigenvalues },
        { class: ShortestTimeOfInterest, setMethod: control.setShortestTimeOfInterest, removeMethod: control.removeShortestTimeOfInterest },
        { class: MaximumEvolutionTime, setMethod: control.setMaximumEvolutionTime, removeMethod: control.removeMaximumEvolutionTime },
        { class: AutomaticallySetMaxEne, setMethod: control.setAutomaticallySetMaxEne, removeMethod: control.removeAutomaticallySetMaxEne },
        { class: DiagramEnergyOffset, setMethod: control.setDiagramEnergyOffset, removeMethod: control.removeDiagramEnergyOffset },
    ];
}

/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */
function createAddControlButton(controlsDiv: HTMLDivElement,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    controlsDiv.appendChild(button);
    button.addEventListener('click', (event: MouseEvent) => {
        let i: number = mesmer.getNextControlID();
        console.log("Add Control " + i.toString());
        let controlID: string = getID(Control.tagName, i.toString());
        let controlDiv: HTMLDivElement = createDiv(controlID, boundary1);
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore: Element | null;
        if (i > 0) {
            let aboveElement = document.getElementById(getID(Control.tagName, (i - 1).toString())) as Element;
            let nextElementSibling: Element | null = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) {
                    elementToInsertBefore = nextElementSibling;
                } else {
                    elementToInsertBefore = button;
                }
            } else {
                elementToInsertBefore = button;
            }
        } else {
            elementToInsertBefore = button;
        }
        // Add the control
        let control: Control = addControl(new Map(), controlDiv, elementToInsertBefore, controlsDiv, i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls: Map<string, HTMLButtonElement> = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, controlDiv, i, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv: HTMLDivElement = createFlexDiv(undefined, level);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button: HTMLButtonElement) => {
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, controlDiv, null, level);
        handleCalcMethod(control, controlDiv, i, null, level);
        getControlItems(control).forEach(item => {
            handleControl(control, controlDiv, i, onOffControls, null, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton: HTMLButtonElement = addRemoveButton(controlDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the control.
            remove(controlID, ids);
        });
    });
    return button;
}

/**
 * Add and return a new control.
 */
function addControl(attributes: Map<string, string>, controlDiv: HTMLDivElement, elementToInsertBefore: Element | null,
    controlsDiv: HTMLDivElement, i: number): Control {
    let control: Control = new Control(attributes, i);
    mesmer.addControl(control);
    let contentDivId: string = getID(Control.tagName, i.toString());

    /*
    getCollapsibleDiv({
        divToAddTo: controlsDiv,
        elementToInsertBefore: elementToInsertBefore,
        content: controlDiv,
        buttonLabel: "Control " + i.toString(),
        buttonId: getID(contentDivId, s_button),
        margin: level1,
        contentDivId: contentDivId
    });
    */
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
function createInputControlItem(control: Control, div: HTMLDivElement, obj: any,
    setControlMethod: (value: any) => void, id: string, valueString: string) {
    setControlMethod.call(control, obj);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(obj, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
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
function handleControl(control: Control, controlDiv: HTMLDivElement, index: number, onOffControls: Map<string, HTMLButtonElement> | null,
    xml_control: Element | null, level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string } | null,
    ControlClass: any, setControlMethod: (value: any) => void, removeControlMethod: () => void, handleInput: boolean = false): void {
    let tagName: string = ControlClass.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (onOffControls) {
        onOffControls.set(tagName, button);
    }
    let controlInstance: any;
    let div: HTMLDivElement;
    let id: string;

    if (level) {
        div = createFlexDiv(undefined, level);
        controlDiv.appendChild(div);
        div.appendChild(button);
        id = getID(Control.tagName, tagName, s_Input);
    }

    if (xml_control) {
        let xml: HTMLCollectionOf<Element> = xml_control!.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = getNodeValue(getFirstChildNode(xml[0]));
                let value: number = parseFloat(valueString);
                controlInstance = new ControlClass(getAttributes(xml[0]), value);
                createInputControlItem(control, div!, controlInstance, setControlMethod, id!, valueString);
            } else {
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(s_optionOff);
        } else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    } else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }

    button.addEventListener('click', (event: MouseEvent) => {
        if (!control.index.has(tagName)) {
            if (handleInput) {
                createInputControlItem(control, div!, controlInstance, setControlMethod, id!, "");
            } else {
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
        } else {
            if (handleInput) {
                remove(id!);
            }
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
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
function handleCalcMethod(control: Control, controlDiv: HTMLDivElement, i: number, xml_control: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {
    let div: HTMLDivElement = createFlexDiv(undefined, level);
    controlDiv.appendChild(div);
    let tagName: string = CalcMethod.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = getID(Control.tagName, tagName, i.toString());
    let divCm: HTMLDivElement = createFlexDiv(divCmId, boundary1);
    div.appendChild(divCm);
    let options: string[] = CalcMethod.options;
    let divCmDetailsId = getID(divCmId, "details");
    let divCmDetailsSelectId = getID(divCmDetailsId, "select");
    let cm: CalcMethod;
    let first: boolean = true;

    if (xml_control) {
        let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
        if (xml.length > 0) {
            if (xml.length > 1) {
                throw new Error("More than one CalcMethod element.");
            }
            let attributes: Map<string, string> = getAttributes(xml[0]);
            let xsi_type: string = attributes.get("xsi:type") as string;
            cm = getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }

    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
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
            let select: HTMLSelectElement = createSelectElementCalcMethod(control, div, options, tagName, s_selectOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(s_optionOn)
            button.classList.toggle(s_optionOff);
        } else {
            if (control.getCalcMethod() != null) {
                control.removeCalcMethod();
                // Remove any existing div.
                //remove(divCmId);
                remove(divCmDetailsId);
                console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
                console.log("button.textContent " + button.textContent);
                remove(divCmDetailsSelectId);
                button.textContent = buttonTextContentDeselected;
                button.classList.toggle(s_optionOn)
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
function handleTestMicroRates(control: Control, controlDiv: HTMLDivElement, xml_control: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {
    let div: HTMLDivElement = createFlexDiv(undefined, level);
    controlDiv.appendChild(div);
    let tagName: string = TestMicroRates.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(tagName, undefined, boundary1);
    button.id = Control.tagName + "_" + tagName;
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let idTmax = Control.tagName + "_" + tagName + "_Tmax";
    let idTmin = Control.tagName + "_" + tagName + "_Tmin";
    let idTstep = Control.tagName + "_" + tagName + "_Tstep";
    if (xml_control) {
        let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
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
function createTestMicroRates(control: Control, div: HTMLDivElement, xml_tmr: HTMLCollectionOf<Element> | null,
    idTmax: string, idTmin: string, idTstep: string): void {
    let attributes: Map<string, string>;
    let tmr: TestMicroRates;
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) {
            throw new Error("More than one TestMicroRates element.");
        }
        attributes = getAttributes(xml_tmr[0]);
        tmr = new TestMicroRates(attributes);
    } else {
        attributes = new Map<string, string>();
        attributes.set("Tmax", "");
        attributes.set("Tmin", "");
        attributes.set("Tstep", "");
        tmr = new TestMicroRates(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax: number = tmr.getTmax();
    let tMaxlwi: HTMLDivElement = createLabelWithInput("number", idTmax + "_input",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmr.setTmax(parseFloat(target.value));
                console.log("Set Tmax to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = tMax.toExponential();
            }
            resizeInputElement(target);
        }, tMax.toExponential(), "Tmax");
    tMaxlwi.id = idTmax;
    resizeInputElement(tMaxlwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin: number = tmr.getTmin();
    let tMinlwi: HTMLDivElement = createLabelWithInput("number", idTmin + "_input",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmr.setTmin(parseFloat(target.value));
                console.log("Set Tmin to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = tMax.toExponential();
            }
            resizeInputElement(target);
        }, tMin.toExponential(), "Tmin");
    tMinlwi.id = idTmin;
    resizeInputElement(tMinlwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep: number = tmr.getTstep();
    let tSteplwi: HTMLDivElement = createLabelWithInput("number", idTstep + "_input",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmr.setTstep(parseFloat(target.value));
                console.log("Set Tstep to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = tMax.toExponential();
            }
            resizeInputElement(target);
        }, tStep.toExponential(), "Tstep");
    tSteplwi.id = idTstep;
    resizeInputElement(tSteplwi.querySelector('input') as HTMLInputElement);
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
function getCalcMethod(control: Control, divCm: HTMLDivElement, xml: HTMLCollectionOf<Element>, options: string[],
    attributes: Map<string, string>, tagName: string, xsi_type: string,
    divCmDetailsId: string, divCmDetailsSelectId: string): CalcMethod {
    let cm: CalcMethod;
    // Create the select element.
    let select: HTMLSelectElement = createSelectElementCalcMethod(control, divCm, options, tagName, xsi_type, divCmDetailsId,
        divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails: HTMLDivElement = createFlexDiv(undefined, boundary1);
    divCmDetails.id = divCmDetailsId;
    divCm.appendChild(divCmDetails);
    if (xsi_type == CalcMethodSimpleCalc.xsi_type || xsi_type == CalcMethodSimpleCalc.xsi_type2) {
        cm = new CalcMethodSimpleCalc(attributes);
    } else if (xsi_type == CalcMethodGridSearch.xsi_type || xsi_type == CalcMethodGridSearch.xsi_type2) {
        cm = new CalcMethodGridSearch(attributes);
    } else if (xsi_type == CalcMethodFitting.xsi_type || xsi_type == CalcMethodFitting.xsi_type2) {
        let cmf: CalcMethodFitting = new CalcMethodFitting(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(FittingIterations.tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value: Big = new Big(getNodeValue(getFirstChildNode(fi_xml[0])));
                let fittingIterations: FittingIterations = new FittingIterations(getAttributes(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            } else {
                throw new Error("More than one FittingIterations element.");
            }
        }
        processCalcMethodFitting(divCmDetails, cmf);
    } else if (xsi_type == CalcMethodMarquardt.xsi_type || xsi_type == CalcMethodMarquardt.xsi_type2) {
        let cmm: CalcMethodMarquardt = new CalcMethodMarquardt(attributes);
        cm = cmm;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = MarquardtIterations.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(elementXml[0])));
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, MarquardtIterations, cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, MarquardtTolerance, cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, MarquardtDerivDelta, cmm.setMarquardtDerivDelta.bind(cmm));
        processCalcMethodMarquardt(divCmDetails, cmm);
    } else if (xsi_type == CalcMethodAnalyticalRepresentation.xsi_type || xsi_type == CalcMethodAnalyticalRepresentation.xsi_type2) {
        let cmar: CalcMethodAnalyticalRepresentation = new CalcMethodAnalyticalRepresentation(attributes);
        cm = cmar;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = ClassConstructor.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: any = getNodeValue(getFirstChildNode(elementXml[0]));
                    if (!isNaN(parseFloat(value))) {
                        value = parseFloat(value);
                    }
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, Format, cmar.setFormat.bind(cmar));
        processElement(xml, Precision, cmar.setPrecision.bind(cmar));
        processElement(xml, ChebNumTemp, cmar.setChebNumTemp.bind(cmar));
        processElement(xml, ChebNumConc, cmar.setChebNumConc.bind(cmar));
        processElement(xml, ChebMaxTemp, cmar.setChebMaxTemp.bind(cmar));
        processElement(xml, ChebMinTemp, cmar.setChebMinTemp.bind(cmar));
        processElement(xml, ChebMaxConc, cmar.setChebMaxConc.bind(cmar));
        processElement(xml, ChebMinConc, cmar.setChebMinConc.bind(cmar));
        processElement(xml, ChebTExSize, cmar.setChebTExSize.bind(cmar));
        processElement(xml, ChebPExSize, cmar.setChebPExSize.bind(cmar));
        processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    } else if (xsi_type == CalcMethodThermodynamicTable.xsi_type || xsi_type == CalcMethodThermodynamicTable.xsi_type2) {
        let cmtt: CalcMethodThermodynamicTable = new CalcMethodThermodynamicTable(attributes);
        cm = cmtt;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = ClassConstructor.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(elementXml[0])));
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, Tmin, cmtt.setTmin.bind(cmtt));
        processElement(xml, Tmid, cmtt.setTmid.bind(cmtt));
        processElement(xml, Tmax, cmtt.setTmax.bind(cmtt));
        processElement(xml, Tstep, cmtt.setTstep.bind(cmtt));
        processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    } else if (xsi_type == CalcMethodSensitivityAnalysis.xsi_type || xsi_type == CalcMethodSensitivityAnalysis.xsi_type2) {
        let cmsa: CalcMethodSensitivityAnalysis = new CalcMethodSensitivityAnalysis(attributes);
        cm = cmsa;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = ClassConstructor.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: any = getNodeValue(getFirstChildNode(elementXml[0]));
                    if (!isNaN(parseFloat(value))) {
                        value = parseFloat(value);
                    }
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, SensitivityAnalysisSamples, cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement(xml, SensitivityAnalysisOrder, cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement(xml, SensitivityNumVarRedIters, cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement(xml, SensitivityVarRedMethod, cmsa.setSensitivityVarRedMethod.bind(cmsa));
        processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    } else {
        throw new Error("Unknown xsi:type: " + xsi_type);
    }
    return cm;
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */
function processCalcMethodFitting(divCmDetails: HTMLDivElement, cm: CalcMethodFitting) {
    // FittingIterations.
    let fittingIterations: MarquardtIterations = cm.getFittingIterations() || new FittingIterations(new Map(), big0);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild(createLabelWithInput("number", divCmDetails.id + "_FittingIterations_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                fittingIterations.value = new Big(target.value);
                console.log("Set FittingIterations to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = fittingIterations.value.toString();
            }
            resizeInputElement(target);
        }, fittingIterations.value.toString(), FittingIterations.tagName));
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */
function processCalcMethodMarquardt(divCmDetails: HTMLDivElement, cm: CalcMethodMarquardt) {
    function createLabelWithInputForObject(obj: { value: Big, tagName: string }, divCmDetails: HTMLElement,
        boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
        level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
        let id = getID(divCmDetails.id, obj.tagName, "Input");
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                obj.value = new Big(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            resizeInputElement(target);
        };
        divCmDetails.appendChild(createLabelWithInput("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let marquardtIterations: MarquardtIterations = cm.getMarquardtIterations() || new MarquardtIterations(new Map(), big0);
    cm.setMarquardtIterations(marquardtIterations);
    createLabelWithInputForObject(marquardtIterations, divCmDetails, boundary1, level0);
    // MarquardtTolerance.
    let marquardtTolerance: MarquardtTolerance = cm.getMarquardtTolerance() || new MarquardtTolerance(new Map(), big0);
    cm.setMarquardtTolerance(marquardtTolerance);
    createLabelWithInputForObject(marquardtTolerance, divCmDetails, boundary1, level0);
    // MarquardtDerivDelta.
    let marquardtDerivDelta: MarquardtDerivDelta = cm.getMarquardtDerivDelta() || new MarquardtDerivDelta(new Map(), big0);
    cm.setMarquardtDerivDelta(marquardtDerivDelta);
    createLabelWithInputForObject(marquardtDerivDelta, divCmDetails, boundary1, level0);
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */
function processCalcMethodAnalyticalRepresentation(divCmDetails: HTMLDivElement, cm: CalcMethodAnalyticalRepresentation) {
    // "me:format".
    let format: Format = cm.getFormat() || new Format(new Map(), Format.options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string, options: string[]) {
        let element: any = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement: HTMLDivElement = createLabelWithSelect(tagName, options, tagName, element.value,
            divCmDetails.id, boundary1, boundary1);
        lwsElement.querySelector('select')?.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            resizeSelectElement(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement(Format, cm.getFormat.bind(cm), cm.setFormat.bind(cm), Format.tagName, Format.options);
    processSelectElement(Format, () => format.getRateUnits(), format.setRateUnits.bind(format), Format.rateUnits, Format.rateUnitsOptions);
    processSelectElement(Precision, cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), Precision.tagName, Mesmer.precisionOptions);
    // "me:chebNumTemp".
    let chebNumTemp: ChebNumTemp = cm.getChebNumTemp() || new ChebNumTemp(new Map(), big0);
    cm.setChebNumTemp(chebNumTemp);
    divCmDetails.appendChild(createLabelWithInput("number", divCmDetails.id + "_ChebNumTemp_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebNumTemp.value = new Big(target.value);
                console.log("Set ChebNumTemp to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebNumTemp.value.toString(), ChebNumTemp.tagName));
    // "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string) {
        let element: any = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild(createLabelWithInput("number", divCmDetails.id + `_${tagName}_input`, boundary1, level0,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                // Check the value is a number.
                if (isNumeric(target.value)) {
                    element.value = parseFloat(target.value);
                    console.log(`Set ${tagName} to ` + target.value);
                } else {
                    alert("Value is not numeric, resetting...");
                    target.value = NaN.toString();
                }
                resizeInputElement(target);
            }, element.value.toString(), tagName));
    }
    processElement(ChebNumConc, cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), ChebNumConc.tagName);
    processElement(ChebMaxTemp, cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), ChebMaxTemp.tagName);
    processElement(ChebMinTemp, cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), ChebMinTemp.tagName);
    processElement(ChebMaxConc, cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), ChebMaxConc.tagName);
    processElement(ChebMinConc, cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), ChebMinConc.tagName);
    processElement(ChebTExSize, cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), ChebTExSize.tagName);
    processElement(ChebPExSize, cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), ChebPExSize.tagName);
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */
function processCalcMethodThermodynamicTable(divCmDetails: HTMLDivElement, cm: CalcMethodThermodynamicTable) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string) {
        let element: any = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild(createLabelWithInput("number", divCmDetails.id + `_${tagName}_input`, boundary1, level0,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                // Check the value is a number.
                if (isNumeric(target.value)) {
                    element.value = parseFloat(target.value);
                    console.log(`Set ${tagName} to ` + target.value);
                } else {
                    alert("Value is not numeric, resetting...");
                    target.value = NaN.toString();
                }
                resizeInputElement(target);
            }, element.value.toString(), tagName));
    }
    processElement(Tmin, cm.getTmin.bind(cm), cm.setTmin.bind(cm), Tmin.tagName);
    processElement(Tmid, cm.getTmid.bind(cm), cm.setTmid.bind(cm), Tmid.tagName);
    processElement(Tmax, cm.getTmax.bind(cm), cm.setTmax.bind(cm), Tmax.tagName);
    processElement(Tstep, cm.getTstep.bind(cm), cm.setTstep.bind(cm), Tstep.tagName);
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */
function processCalcMethodSensitivityAnalysis(divCmDetails: HTMLDivElement, cm: CalcMethodSensitivityAnalysis) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string) {
        let element: any = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild(createLabelWithInput("number", getID(divCmDetails.id, tagName, s_Input), boundary1, level0,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                // Check the value is a number.
                if (isNumeric(target.value)) {
                    element.value = parseFloat(target.value);
                    console.log(`Set ${tagName} to ` + target.value);
                } else {
                    alert("Value is not numeric, resetting...");
                    target.value = NaN.toString();
                }
                resizeInputElement(target);
            }, element.value.toString(), tagName));
    }
    processNumberElement(SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), SensitivityAnalysisSamples.tagName);
    processNumberElement(SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), SensitivityAnalysisOrder.tagName);
    processNumberElement(SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod: SensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName: string = SensitivityVarRedMethod.tagName;
    divCmDetails.appendChild(createLabelWithSelect(tagName, SensitivityVarRedMethod.options, tagName, SensitivityVarRedMethod.options[0],
        getID(divCmDetails.id, tagName, 'select'), boundary1, boundary1));
    // Add event listener for the select element.
    let select: HTMLSelectElement = divCmDetails.querySelector('select') as HTMLSelectElement;
    select?.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        sensitivityVarRedMethod.value = target.value;
        console.log(tagName + " set to " + target.value);
        resizeSelectElement(target);
    });
}

/**
 * @param options The options.
 * @param select The select element.
 */
function selectAnotherOptionEventListener(options: string[], select: HTMLSelectElement) {
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
 * @param control The control.
 * @param div The div. 
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param id The id for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */
function createSelectElementCalcMethod(control: Control, div: HTMLDivElement, options: string[],
    tagName: string, value: string, divCmDetailsId: string, divCmDetailsSelectId: string): HTMLSelectElement {
    let select: HTMLSelectElement = createSelectElement(options, tagName, value, divCmDetailsSelectId, boundary1);
    div.appendChild(select);
    selectAnotherOptionEventListener(options, select);
    select.addEventListener('change', (event: Event) => {
        // Remove any existing div.
        let divCmDetails: HTMLDivElement = document.getElementById(divCmDetailsId) as HTMLDivElement;
        if (divCmDetails != null) {
            divCmDetails.remove();
        }
        divCmDetails = createFlexDiv(divCmDetailsId, boundary1);
        div.appendChild(divCmDetails);
        let target = event.target as HTMLSelectElement;
        let value: string = target.value;
        let attributes: Map<string, string> = new Map();
        attributes.set("xsi:type", value);
        if (value == CalcMethodSimpleCalc.xsi_type || value == CalcMethodSimpleCalc.xsi_type2) {
            // "me:simpleCalc", "simpleCalc".
            control.setCalcMethod(new CalcMethodSimpleCalc(attributes));
        } else if (value == CalcMethodGridSearch.xsi_type || value == CalcMethodGridSearch.xsi_type2) {
            // "me:gridSearch", "gridSearch".
            control.setCalcMethod(new CalcMethodGridSearch(attributes));
        } else if (value == CalcMethodFitting.xsi_type || value == CalcMethodFitting.xsi_type2) {
            let cm: CalcMethodFitting = new CalcMethodFitting(attributes);
            control.setCalcMethod(cm);
            processCalcMethodFitting(divCmDetails, cm);
        } else if (value == CalcMethodMarquardt.xsi_type || value == CalcMethodMarquardt.xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm: CalcMethodMarquardt = new CalcMethodMarquardt(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(divCmDetails, cm);
        } else if (value == CalcMethodAnalyticalRepresentation.xsi_type || value == CalcMethodAnalyticalRepresentation.xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm: CalcMethodAnalyticalRepresentation = new CalcMethodAnalyticalRepresentation(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        } else if (value == CalcMethodThermodynamicTable.xsi_type || value == CalcMethodThermodynamicTable.xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm: CalcMethodThermodynamicTable = new CalcMethodThermodynamicTable(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(divCmDetails, cm);
        } else if (value == CalcMethodSensitivityAnalysis.xsi_type || value == CalcMethodSensitivityAnalysis.xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm: CalcMethodSensitivityAnalysis = new CalcMethodSensitivityAnalysis(new Map());
            control.setCalcMethod(cm);
            processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        } else {
            throw new Error("Unknown CalcMethod type.");
        }
        resizeSelectElement(target);
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
function drawReactionDiagram(canvas: HTMLCanvasElement | null, dark: boolean, font: string, lw: number, lwc: number): void {
    console.log("drawReactionDiagram");
    if (canvas != null) {
        // Set foreground and background colors.
        let foreground: string;
        let background: string;
        let blue: string;
        let orange: string;
        if (dark) {
            foreground = "lightgrey";
            background = "darkgrey";
            blue = "lightblue";
            orange = "orange";
        } else {
            foreground = "darkgrey";
            background = "lightgrey";
            blue = "blue";
            orange = "darkorange";
        }
        let green = "green";
        let red = "red";
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
        //ctx.fillStyle = background;
        // Make font bold.
        ctx.font = "bold " + font;
        // Get text height for font size.
        let th = getTextHeight(ctx, "Aj", ctx.font);
        //console.log("th=" + th);
        // Go through reactions:
        // 1. Create sets of reactants, end products, intermediate products and transition states.
        // 2. Create maps of orders and energies.
        // 3. Calculate maximum energy.
        let reactants: string[] = [];
        let products: Set<string> = new Set();
        let intProducts: Set<string> = new Set();
        let transitionStates: Set<string> = new Set();
        let orders: Map<string, number> = new Map();
        let energies: Map<string, Big> = new Map();
        let i: number = 0;
        let energyMin: Big;
        let energyMax: Big;
        reactions.forEach(function (reaction, id) {
            // Get TransitionStates.
            let reactionTransitionStates: TransitionState[] = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel: string | undefined = reaction.getReactantsLabel();
            if (reactantsLabel != undefined) {
                reactants.push(reactantsLabel);
                if (products.has(reactantsLabel)) {
                    intProducts.add(reactantsLabel);
                }
                let energy: Big = reaction.getReactantsEnergy(molecules);
                energyMin = min(energyMin, energy);
                energyMax = max(energyMax, energy);
                energies.set(reactantsLabel, energy);
                if (!orders.has(reactantsLabel)) {
                    orders.set(reactantsLabel, i);
                    i++;
                }
            }
            let productsLabel: string | undefined = reaction.getProductsLabel();
            if (productsLabel != undefined) {
                products.add(productsLabel);
                let energy = reaction.getProductsEnergy(molecules);
                energyMin = min(energyMin, energy);
                energyMax = max(energyMax, energy);
                energies.set(productsLabel, energy);
                if (orders.has(productsLabel)) {
                    i--;
                    let j: number = get(orders, productsLabel);
                    // Move product to end and shift everything back.
                    orders.forEach(function (value, key) {
                        if (value > j) {
                            orders.set(key, value - 1);
                        }
                    });
                    // Insert transition states.
                    if (reactionTransitionStates != undefined) {
                        reactionTransitionStates.forEach(function (ts) {
                            let ref: string = ts.getMolecule().ref;
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = molecules.get(ref)?.getEnergy() ?? big0;
                            energyMin = min(energyMin, energy);
                            energyMax = max(energyMax, energy);
                            energies.set(ref, energy);
                            i++;
                        });
                        orders.set(productsLabel, i);
                        i++
                    }
                } else {
                    if (reactionTransitionStates != undefined) {
                        reactionTransitionStates.forEach(function (ts) {
                            let ref: string = ts.getMolecule().ref;
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = molecules.get(ref)?.getEnergy() ?? big0;
                            energyMin = min(energyMin, energy);
                            energyMax = max(energyMax, energy);
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
        let energyRange: number = (energyMax!.minus(energyMin!)).toNumber();
        //console.log("energyRange=" + energyRange);
        //console.log("reactants=" + reactants);
        //console.log("products=" + products);
        //console.log("transitionStates=" + transitionStates);
        // Create a lookup from order to label.
        let reorders: string[] = [];
        orders.forEach(function (value, key) {
            reorders[value] = key;
        });
        //console.log("reorders=" + arrayToString(reorders));
        // Iterate through the reorders:
        // 1. Capture coordinates for connecting lines.
        // 2. Store maximum x.
        let x0: number = 0;
        let y0: number;
        let x1: number;
        let y1: number;
        let xmax: number = 0;
        let tw: number;
        let textSpacing: number = 5; // Spacing between end of line and start of text.
        let stepSpacing: number = 10; // Spacing between steps.
        let reactantsInXY: Map<string, number[]> = new Map();
        let reactantsOutXY: Map<string, number[]> = new Map();
        let productsInXY: Map<string, number[]> = new Map();
        let productsOutXY: Map<string, number[]> = new Map();
        let transitionStatesInXY: Map<string, number[]> = new Map();
        let transitionStatesOutXY: Map<string, number[]> = new Map();
        reorders.forEach(function (value) {
            //console.log("value=" + value + ".");
            //console.log("energies=" + mapToString(energies));
            let energy: number = get(energies, value);
            let energyRescaled: number = rescale(energyMin.toNumber(), energyRange, 0, rdcHeight, energy);
            // Get text width.
            tw = Math.max(getTextWidth(ctx, energy.toString(), font), getTextWidth(ctx, value, font));
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
        ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder)
        // Go through reactions and draw connecting lines.
        reactions.forEach(function (reaction, id) {
            //console.log("id=" + id);
            //console.log("reaction=" + reaction);
            // Get TransitionState if there is one.
            let reactionTransitionStates: TransitionState[] = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel: string | undefined = reaction.getReactantsLabel();
            let productsLabel: string | undefined = reaction.getProductsLabel();
            let reactantOutXY: number[] = get(reactantsOutXY, reactantsLabel);
            let productInXY: number[] = get(productsInXY, productsLabel);
            if (reactionTransitionStates.length > 0) {
                reactionTransitionStates.forEach(function (ts) {
                    let transitionStateLabel: string = ts.getMolecule().ref;
                    let transitionStateInXY: number[] = get(transitionStatesInXY, transitionStateLabel);
                    drawLine(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0],
                        transitionStateInXY[1]);
                    let transitionStateOutXY: number[] = get(transitionStatesOutXY, transitionStateLabel);
                    drawLine(ctx, foreground, lwc, transitionStateOutXY[0], transitionStateOutXY[1],
                        productInXY[0], productInXY[1]);
                });
            } else {
                drawLine(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1],
                    productInXY[0], productInXY[1]);
            }
        });
        // Draw horizontal lines and labels.
        // (This is done last so that the labels are on top of the vertical lines.)
        reactants.forEach(function (value) {
            let energy: number = get(energies, value);
            let energyRescaled: number = rescale(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0: number = get(reactantsInXY, value)[0];
            let y: number = energyRescaled + lw;
            let x1: number = get(reactantsOutXY, value)[0];
            let energyString: string = energy.toString();
            drawLevel(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function (value) {
            let energy: number = get(energies, value);
            let energyRescaled: number = rescale(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0: number = get(productsInXY, value)[0];
            let y: number = energyRescaled + lw;
            let x1: number = get(productsOutXY, value)[0];
            let energyString: string = energy.toString();
            if (intProducts.has(value)) {
                drawLevel(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
            } else {
                drawLevel(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
            }
        });
        transitionStates.forEach(function (value) {
            let energy: number = get(energies, value);
            let energyRescaled: number = rescale(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0: number = get(transitionStatesInXY, value)[0];
            let y: number = energyRescaled + lw;
            let x1: number = get(transitionStatesOutXY, value)[0];
            let energyString: string = energy.toString();
            drawLevel(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
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
    } else {
        console.log("saveXML");
        const pad: string = "  ";
        // Create a Blob object from the data
        let blob = new Blob([Mesmer.header, mesmer.toXML(pad, "")],
            { type: "text/plain" });
        // Create a new object URL for the blob
        let url = URL.createObjectURL(blob);
        // Create a new 'a' element
        let a = document.createElement("a");
        // Set the href and download attributes for the 'a' element
        a.href = url;
        let title: string = mesmer.getTitle()?.value as string;
        a.download = title.replace(/[^a-z0-9]/gi, '_') + ".xml";
        // Append the 'a' element to the body and click it to start the download
        document.body.appendChild(a);
        a.click();
        // Remove the 'a' element after the download starts
        document.body.removeChild(a);
    }
}