
//import { openDB } from 'idb';

import { get, getID, isNumeric, mapToString, rescale } from './util.js';

import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getAttributes, getSingularElement,
    NumberArrayNode, NumberNode
} from './xml.js';

import {
    Molecule, Atom, Bond, EnergyTransferModel, DeltaEDown, DOSCMethod, Property, AtomArray, BondArray,
    PropertyList, PropertyScalar, PropertyArray, ExtraDOSCMethod, BondRef, HinderedRotorPotential,
    PotentialPoint, Periodicity, ReservoirSize, ZPE, RotConsts, VibFreqs, PropertyMatrix
} from './molecule.js';

import {
    Reaction, TransitionState, ReactionMolecule, Reactant, Product, MCRCMethod, MesmerILT,
    PreExponential, ActivationEnergy, NInfinity, Tunneling, TInfinity, ExcessReactantConc
} from './reaction.js';

import { arrayToString, toNumberArray } from './util.js';

import {
    createLabelWithInput, getCollapsibleDiv, resizeInputElement, createSelectElement,
    resizeSelectElement, createFlexDiv, createButton, remove, createLabel, createInput, createLabelWithSelect,
    createDiv
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
let memser_a = document.createElement('a');
memser_a.href = mesmer_url;
memser_a.textContent = mesmer_url;

/**
 * 3DMol.
 */
let t3Dmol_url: string = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement('a');
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;

/**
 * The font sizes for different levels of the GUI.
 */
let fontSize1: string = "1.5em";
let fontSize2: string = "1.25em";
let fontSize3: string = "1.0em";
let fontSize4: string = "0.75em";

/**
 * Margins for spacing GUI components.
 */
//let margin0: string = "0px";
let margin1: string = "1px";
let margin2: string = "2px";
let margin3: string = "3px";
let margin5: string = "5px";
let margin25: string = "25px";
let margin50: string = "50px";
let margin75: string = "75px";
let margin100: string = "100px";
let margin125: string = "125px";
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
let addSymbol: string = "\uFF0B";
let addString: string = "add " + addSymbol;
let removeSymbol: string = "\u2715";
let removeString: string = "remove " + removeSymbol;
let refreshSymbol: string = "\u27F3";
let refreshString: string = "refresh " + refreshSymbol;
let s_Add_from_spreadsheet: string = "Add " + addSymbol + " from spreadsheet";

// Selected and deselected symbology.
let selected: string = " \u2713";
let deselected: string = " \u2717";
let selectOption: string = "Select an option (use keys to cycle through options)...";

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
let s_Input: string = "Input";
let s_optionOn = 'optionOn';
let s_optionOff = 'optionOff';

// For dark/light mode.
let dark: boolean;

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
 * A map of molecules with Molecule.id as key and Molecules as values.
 */
let molecules: Map<string, Molecule>;

/**
 * For storing the maximum molecule energy in a reaction.
 */
let maxMoleculeEnergy: number = -Infinity;

/**
 * For storing the minimum molecule energy in a reaction.
 */
let minMoleculeEnergy: number = Infinity;

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
function addID(...parts: string[]): string {
    let validID: string = getID(...parts);
    if (ids.has(validID)) {
        throw new Error(validID + " already exists!");
    }
    ids.add(validID);
    return validID;
}

// IDs for the reactions diagram.
let rdDivId: string = addID("reactionsDiagram");
let rdCanvasId: string = addID("reactionsDiagramCanvas");
//let rd_canvas_width: number = 800;
let rdCanvasHeight: number = 400;
let rd_lw: number = 4;
let rd_lwc: number = 2;
let rd_font: string = "1em SensSerif";
let popWindow: Window | null;

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
    let menuDiv: HTMLDivElement = document.getElementById(menuDivId) as HTMLDivElement;
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
        if (popWindow != null) {
            //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
            popWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
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
        if (popWindow != null) {
            //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
            popWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
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

    let welcomeDiv: HTMLDivElement = createDiv(getID("Welcome"), boundary1);
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
    let instructionsDiv: HTMLDivElement = createDiv(getID("Instructions"), boundary1);
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
        let rdCanvas: HTMLCanvasElement = document.getElementById(rdCanvasId) as HTMLCanvasElement;
        drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    } else {
        let c: HTMLCanvasElement = popWindow.document.getElementById(rdCanvasId) as HTMLCanvasElement;
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
    maxMoleculeEnergy = -Infinity;
    minMoleculeEnergy = Infinity;
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
        let titleDiv: HTMLDivElement = document.getElementById(titleDivId) as HTMLDivElement;
        let lwiId: string = addID('titleDiv');
        // Create input element.
        let lwi: HTMLDivElement = createLabelWithInput("text", addID(lwiId, "Input"), boundary1, level0,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                titleNode.value = target.value;
                console.log(titleNode.tagName + " changed to " + titleNode.value);
                resizeInputElement(target);
            }, title, Title.tagName, fontSize1);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }

    // Molecules.
    let moleculesDiv: HTMLDivElement = document.getElementById(moleculesDivId) as HTMLDivElement;
    let moleculesListDivId = addID('moleculesList');
    // If the moleculesListDiv already exists, remove it.
    remove(moleculesListDivId, ids);
    let moleculeListDiv: HTMLDivElement = processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    getCollapsibleDiv({
        divToAddTo: moleculesDiv,
        elementToInsertBefore: null,
        content: moleculeListDiv,
        buttonLabel: "Molecules",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: moleculeListDiv.id
    });
    //mesmer.setMoleculeList(new MoleculeList(getAttributes(moleculeListDiv), Array.from(molecules.values())));
    mesmer.setMoleculeList(new MoleculeList(new Map(), Array.from(molecules.values())));

    // Reactions.
    let reactionsDiv: HTMLDivElement = document.getElementById(reactionsDivId) as HTMLDivElement;
    let reactionsListDivId: string = addID('reactionsList');
    // If the reactionsListDiv already exists, remove it.
    remove(reactionsListDivId, ids);
    let reactionsListDiv: HTMLDivElement = processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    getCollapsibleDiv({
        divToAddTo: reactionsDiv,
        elementToInsertBefore: null,
        content: reactionsListDiv,
        buttonLabel: "Reactions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: reactionsListDiv.id
    });
    //mesmer.setReactionList(new ReactionList(getAttributes(reactionsDiv), Array.from(reactions.values())));
    mesmer.setReactionList(new ReactionList(new Map(), Array.from(reactions.values())));

    // Add the reactions diagram canvas.
    // Destroy any existing reactions diagram.
    // Check for popWindow.
    if (popWindow != null) {
        popWindow.close();
        popWindow = null;
    }
    // If rdDiv already exists, remove it.
    remove(rdDivId);
    // Create a new rdDiv and append it.
    let rdDiv: HTMLDivElement = createDiv(rdDivId, boundary1);
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = addID('popButtonDivId');
    //remove(popButtonDivId);
    let popButtonDiv = createDiv(popButtonDivId, boundary1);
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = addID("popButtonId");
    // If the popButton already exists, remove it.
    //remove(popButtonID);
    let popButton: HTMLButtonElement = createButton("Pop out diagram into a new window", popButtonID, boundary1);
    popButtonDiv.appendChild(popButton);
    // If the canvas already exists, remove it.
    //remove(rdCanvasId);
    let rdCanvas: HTMLCanvasElement = document.createElement('canvas');
    rdCanvas.id = rdCanvasId;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdCanvasHeight;
    rdCanvas.style.border = "1px solid black";
    drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener('click', () => {
        if (popWindow == null) {
            let popWindowRDCanvas: HTMLCanvasElement = document.createElement('canvas');
            popWindowRDCanvas.id = rdCanvasId;
            popWindow = window.open("", "Reactions Diagram", "width=" + rdCanvas.width + ", height=" + rdCanvas.height) as Window;
            popWindow.document.body.appendChild(popWindowRDCanvas);
            drawReactionDiagram(popWindowRDCanvas, dark, rd_font, rd_lw, rd_lwc);
            remove(rdCanvasId, ids);
            popButton.textContent = "Pop back reaction diagram";
        } else {
            rdCanvas = document.createElement('canvas');
            rdCanvas.id = rdCanvasId;
            rdDiv.appendChild(rdCanvas);
            drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
            popWindow.close();
            popWindow = null;
            popButton.textContent = "Pop out reaction diagram to a new window";
        }
    });

    // Conditions.
    let conditionsDiv: HTMLDivElement = document.getElementById(conditionsDivId) as HTMLDivElement;
    let conditionssDivId: string = addID(conditionsDivId, 'conditionss');
    // If the conditionssDiv already exists, remove it.
    remove(conditionssDivId);
    let conditionssDiv: HTMLDivElement = processConditions(xml);
    conditionssDiv.id = conditionssDivId;
    getCollapsibleDiv({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: conditionssDiv,
        buttonLabel: "Conditions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: conditionssDiv.id
    });

    // Model Parameters.
    let modelParametersDiv: HTMLDivElement = document.getElementById(modelParametersDivId) as HTMLDivElement;
    let modelParametersListDivId: string = addID('modelParametersList');
    // If the modelParametersListDiv already exists, remove it.
    remove(modelParametersListDivId);
    let modelParametersListDiv: HTMLDivElement = processModelParameters(xml);
    modelParametersListDiv.id = 'modelParametersList';
    getCollapsibleDiv({
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
    let controlDiv: HTMLDivElement = document.getElementById(controlDivId) as HTMLDivElement;
    let controlsDivId: string = addID(controlDivId, 'controls');
    // If the controlsDiv already exists, remove it.
    remove(controlsDivId);
    let controlsDiv: HTMLDivElement = processControl(xml);
    controlsDiv.id = controlsDivId;
    getCollapsibleDiv({
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
        let moleculeDiv: HTMLDivElement = document.createElement("div");
        // Set attributes.
        let attributes: Map<string, string> = getAttributes(xml_molecules[i]);
        // Get the molecule id.
        let moleculeId: string | undefined = attributes.get(Molecule.s_id);
        if (moleculeId == undefined) {
            throw new Error(Molecule.s_id + ' is undefined');
        }
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

        // Create molecule.
        let molecule = new Molecule(attributes, moleculeId);

        molecules.set(moleculeId, molecule);

        // Init atoms.
        let atomArray: AtomArray = new AtomArray(new Map()); // This will be replaced if there is an AtomArray.
        // Function to be used to remove an atom.
        let removeAtom = (id: string) => molecule.getAtoms().removeAtom(id);
        // There can be an individual atom not in an atom array, or an atom array.
        let xml_atomArrays: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(AtomArray.tagName);
        if (xml_atomArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + AtomArray.tagName + " but finding " + xml_atomArrays.length + "!");
        }
        // Create a new collapsible div for the AtomArray.
        let atomArrayDiv: HTMLDivElement = getCollapsibleContentDiv(moleculeId, moleculeDiv, null, AtomArray.tagName, AtomArray.tagName,
            boundary1, level2, fontSize3);
        //let atomArrayDiv: HTMLDivElement = createAtomArrayDiv(moleculeId, moleculeDiv, boundary1, level2);
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms: HTMLCollectionOf<Element> = xml_atomArray.getElementsByTagName(Atom.tagName);
            if (xml_atoms.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + AtomArray.tagName + ", but finding " + xml_atoms.length + "!");
            }
            atomArray = new AtomArray(getAttributes(xml_atomArray));
            molecule.setAtoms(atomArray);
            for (let j = 0; j < xml_atoms.length; j++) {
                // Create a new Atom.
                let atom: Atom = new Atom(getAttributes(xml_atoms[j]));
                let atomId: string = atomArray.addAtom(atom);
                //console.log("atomId=" + atomId);
                // Add the atomDiv to the atomArrayDiv.
                let atomDiv: HTMLDivElement = createFlexDiv(undefined, level3);
                atomArrayDiv.appendChild(atomDiv);
                let inputId: string = getID(moleculeId, atomId);
                atomDiv.appendChild(createLabel(atomId, boundary1));
                // elementType.
                processElementType(inputId, atom, atomDiv, false, boundary1, boundary1);
                // coordinates.
                processCoordinates(inputId, atom, atomDiv, boundary1, boundary1);
                addRemoveButton(atomDiv, boundary1, removeAtom, atomId);
            }
            moleculeTagNames.delete(AtomArray.tagName);
        } else {
            let xml_atoms: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Atom.tagName);
            if (xml_atoms.length == 1) {
                atomArray = new AtomArray(new Map());
                atomArray.addAtom(new Atom(getAttributes(xml_atoms[0])));
                molecule.setAtoms(atomArray);
            } else if (xml_atoms.length > 1) {
                throw new Error("Expecting 1 " + Atom.tagName + " but finding " + xml_atoms.length + ". Should these be in an " + AtomArray.tagName + "?");
            }
        }
        atomArrayDiv.appendChild(getAddAtomButton(molecule, moleculeId, atomArrayDiv, Atom.tagName, boundary1, level3, fontSize4));
        //console.log("atomsNode=" + atomsNode);
        moleculeTagNames.delete(Atom.tagName);

        // Init bondsNode.
        let bondArray: BondArray = new BondArray(new Map()); // This will be replaced if there is an BondArray.
        // Function to be used to remove an bond.
        let removeBond = (id: string) => molecule.getBonds().removeBond(id);
        // There can be an individual bond not in a bond array, or a bond array.
        // There may be only 1 bond in a BondArray.
        let xml_bondArrays: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(BondArray.tagName);
        // Create a new collapsible div for the BondArray.
        let bondArrayDiv: HTMLDivElement = getCollapsibleContentDiv(moleculeId, moleculeDiv, null, BondArray.tagName, BondArray.tagName,
            boundary1, level2, fontSize3);
        if (xml_bondArrays.length > 0) {
            if (xml_bondArrays.length > 1) {
                throw new Error("Expecting 1 or 0 " + BondArray.tagName + " but finding " + xml_bondArrays.length + "!");
            }
            let xml_bonds: HTMLCollectionOf<Element> = xml_bondArrays[0].getElementsByTagName(Bond.tagName);
            bondArray = new BondArray(getAttributes(xml_bondArrays[0]));
            for (let j = 0; j < xml_bonds.length; j++) {
                // Create a new Bond.
                let bond: Bond = new Bond(getAttributes(xml_bonds[j]));
                let bondId: string = bondArray.addBond(bond);
                // Add the bondDiv to the bondArrayDiv.
                let bondDiv: HTMLDivElement = createFlexDiv(undefined, level3);
                bondArrayDiv.appendChild(bondDiv);
                let inputId: string = getID(moleculeId, bondId);
                bondDiv.appendChild(createLabel(bondId, boundary1));
                // atomRefs2.
                processAtomsRefs2(molecule, bondDiv, bond, inputId, boundary1);
                // order.
                processOrder(bondDiv, bond, inputId, Bond.s_order, boundary1);
                addRemoveButton(bondDiv, boundary1, removeBond, bondId);
                addRefreshButton(molecule, bondDiv, inputId, boundary1);
            }
            molecule.setBonds(bondArray);
            moleculeTagNames.delete(BondArray.tagName);
        } else {
            let xml_bonds: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Bond.tagName);
            if (xml_bonds.length > 0) {
                if (xml_bonds.length > 1) {
                    throw new Error("Expecting 1 " + Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + BondArray.tagName + "?");
                }
                bondArray = new BondArray(new Map());
                bondArray.addBond(new Bond(getAttributes(xml_bonds[0])));
                molecule.setBonds(bondArray);
            }
        }
        bondArrayDiv.appendChild(getAddBondButton(molecule, moleculeId, bondArrayDiv, Bond.tagName, boundary1, level3));
        moleculeTagNames.delete(Bond.tagName);



        // Add a 3Dmol.js viewer.
        // Create a new div for the viewer.
        let viewerContainerDivID: string = addID(moleculeId, "viewerContainer");
        let viewerContainerDiv: HTMLDivElement = createDiv(viewerContainerDivID, level2);
        moleculeDiv.appendChild(viewerContainerDiv);
        let viewerDivID: string = addID(moleculeId, "viewer");
        function create3DViewer(): void {
            let viewerDiv: HTMLDivElement = createDiv(viewerDivID, level2);
            viewerDiv.className = "mol-container";
            viewerContainerDiv.appendChild(viewerDiv);
            let config = { backgroundColor: 'grey' };
            let viewer = $3Dmol.createViewer(viewerDiv, config);
            // Set the viewer style to stick and ball.
            viewer.setStyle({ stick: {} });
            // Create a 3Dmol viewer control to turn labels on and off.
            (atomArray as AtomArray).atoms.forEach(function (atom) {
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
                    radius = 1;
                } else {
                    radius = Mesmer.atomRadii.get(atom.getElementType()!) || 1;
                }
                let ax: number = atom.getX3() || 0;
                let ay: number = atom.getY3() || 0;
                let az: number = atom.getZ3() || 0;
                //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: 0.3 * am / 10.0, color: color });
                viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: radius / 110.0, color: color });
                //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: (radius * (am ** (1 / 3.0))) / 275.0, color: color });
                //viewer.addLabel(atom.getElementType(), { position: { x: ax, y: ay, z: az } });
            });
            (bondArray as BondArray).bonds.forEach(function (bond) {
                let atomIds: string[] = bond.atomRefs2.split(" ");
                let atom1: Atom = atomArray.getAtom(atomIds[0]) as Atom;
                let atom2: Atom = atomArray.getAtom(atomIds[1]) as Atom;
                let order: number = bond.getOrder() || 1;
                let color: string = Mesmer.bondColors.get(order) || 'Purple';

                let a1x: number = atom1.getX3() || 0;
                let a1y: number = atom1.getY3() || 0;
                let a1z: number = atom1.getZ3() || 0;

                let a2x: number = atom2.getX3() || 0;
                let a2y: number = atom2.getY3() || 0;
                let a2z: number = atom2.getZ3() || 0;
                viewer.addCylinder({ start: { x: a1x, y: a1y, z: a1z }, end: { x: a2x, y: a2y, z: a2z }, radius: 0.06 * order, color: color });
            });
            viewer.zoomTo();
            viewer.render();
            viewer.zoom(0.8, 2000);
        }
        // Add a redraw button.
        let redrawButton: HTMLButtonElement = createButton("Draw/Redraw", undefined);
        redrawButton.addEventListener('click', () => {
            remove(viewerDivID, ids);
            create3DViewer();
        });
        viewerContainerDiv.appendChild(redrawButton);



        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_PLs: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(PropertyList.tagName);
        if (xml_PLs.length > 1) {
            throw new Error("Expecting 1 or 0 " + PropertyList.tagName + " but finding " + xml_PLs.length + "!");
        }
        if (xml_PLs.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
            let contentDivId: string = molecule.id + "_" + PropertyList.tagName + "_";
            getCollapsibleDiv({
                divToAddTo: moleculeDiv,
                elementToInsertBefore: null,
                content: plDiv,
                buttonLabel: PropertyList.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            // Create a new PropertyList.
            let pl: PropertyList = new PropertyList(getAttributes(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps: HTMLCollectionOf<Element> = xml_PLs[0].getElementsByTagName(Property.tagName);
            for (let j = 0; j < xml_Ps.length; j++) {
                // Create a new Property.
                let p: Property = createProperty(xml_Ps[j], plDiv, molecule, boundary1, level3);
                pl.setProperty(p);
            }
            moleculeTagNames.delete(PropertyList.tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Property.tagName);
            if (xml_Ps.length != 1) {
                throw new Error("Expecting 1 " + Property.tagName + " but finding " + xml_Ps.length + ". Should these be in a " + PropertyList.tagName + "?");
            }
            // Create a new Property.
            let p: Property = createProperty(xml_Ps[0], moleculeDiv, molecule, boundary1, level2);
            molecule.setProperties(p);
            moleculeTagNames.delete(Property.tagName);
        }
        // Organise EnergyTransferModel.
        let xml_ETMs: HTMLCollectionOf<Element> | null = xml_molecules[i].getElementsByTagName(EnergyTransferModel.tagName);
        if (xml_ETMs.length > 0) {
            if (xml_ETMs.length > 1) {
                throw new Error("Expecting 1 or 0 " + EnergyTransferModel.tagName + " but finding " + xml_ETMs.length + "!");
            }
            let etm = new EnergyTransferModel(getAttributes(xml_ETMs[0]));
            processEnergyTransferModel(etm, molecule, xml_ETMs[0], moleculeDiv, margin75);
            moleculeTagNames.delete(EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_DOSCMethod: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(DOSCMethod.tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length > 1) {
                throw new Error("Expecting 1 or 0 " + DOSCMethod.tagName + " but finding " + xml_DOSCMethod.length + "!");
            }
            let dOSCMethod = new DOSCMethod(getAttributes(xml_DOSCMethod[0]));
            moleculeDiv.appendChild(
                createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                    dOSCMethod.getXsiType(), molecule.id, boundary1, level2));
            moleculeTagNames.delete(DOSCMethod.tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName(ExtraDOSCMethod.tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            }
            let extraDOSCMethod: ExtraDOSCMethod = new ExtraDOSCMethod(getAttributes(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
            let contentDivId: string = molecule.id + "_" + ExtraDOSCMethod.tagName + "_";
            getCollapsibleDiv({
                divToAddTo: moleculeDiv,
                elementToInsertBefore: null,
                content: extraDOSCMethodDiv,
                buttonLabel: ExtraDOSCMethod.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            // Read bondRef.
            let xml_bondRefs: HTMLCollectionOf<Element> = xml_ExtraDOSCMethod[0].getElementsByTagName(BondRef.tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                }
                let bondIds: string[] = (molecule.getBonds() as BondArray).getBondIds();
                let bondRef: BondRef = new BondRef(getAttributes(xml_bondRefs[0]), getNodeValue(getFirstChildNode(xml_bondRefs[0])));
                extraDOSCMethodDiv.appendChild(createLabelWithSelect(BondRef.tagName, bondIds, BondRef.tagName,
                    bondRef.value, molecule.id, boundary1, level3));
            }
            // Read hinderedRotorPotential.
            let xml_hinderedRotorPotentials: HTMLCollectionOf<Element> = xml_ExtraDOSCMethod[0].getElementsByTagName(HinderedRotorPotential.tagName);
            if (xml_hinderedRotorPotentials.length > 0) {
                if (xml_hinderedRotorPotentials.length != 1) {
                    throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hinderedRotorPotentials.length);
                }
                let hinderedRotorPotentialAttributes: Map<string, string> = getAttributes(xml_hinderedRotorPotentials[0]);
                let hinderedRotorPotential: HinderedRotorPotential = new HinderedRotorPotential(hinderedRotorPotentialAttributes);
                // Create a new collapsible div for the HinderedRotorPotential.
                let hinderedRotorPotentialDiv: HTMLDivElement = createFlexDiv(undefined, level4);
                let contentDivId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName;
                getCollapsibleDiv({
                    divToAddTo: extraDOSCMethodDiv,
                    elementToInsertBefore: null,
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: HinderedRotorPotential.tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level3,
                    contentDivId: contentDivId
                });
                // Format.
                hinderedRotorPotentialDiv.appendChild(createLabelWithSelect(HinderedRotorPotential.s_format,
                    HinderedRotorPotential.formats, HinderedRotorPotential.tagName, hinderedRotorPotential.getFormat(),
                    contentDivId, boundary1, boundary1));
                // Units.
                addAnyUnits(Mesmer.energyUnits, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv,
                    contentDivId, HinderedRotorPotential.tagName, boundary1);
                // ExpansionSize.
                hinderedRotorPotentialDiv.appendChild(createLabelWithInput("number",
                    contentDivId + "_" + HinderedRotorPotential.s_expansionSize, boundary1, boundary1, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        // Check the input is a number.
                        if (isNumeric(target.value)) {
                            hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                        } else {
                            // Reset the input to the current value.
                            alert(HinderedRotorPotential.s_expansionSize + " input is not a number, resetting...");
                            target.value = hinderedRotorPotential.getExpansionSize().toExponential();
                        }
                        resizeInputElement(target);
                    }, hinderedRotorPotential.getExpansionSize().toExponential(), HinderedRotorPotential.s_expansionSize));

                // Add useSineTerms.
                let useSineTermsLabel: HTMLLabelElement = createLabel(HinderedRotorPotential.s_useSineTerms, boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId: string = getID(molecule.id, DOSCMethod.tagName, HinderedRotorPotential.tagName, HinderedRotorPotential.s_useSineTerms);
                let useSineTermsInput: HTMLInputElement = createInput("checkbox", useSineTermsInputId, boundary1);
                useSineTermsInput.checked = hinderedRotorPotential.getUseSineTerms();
                useSineTermsInput.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    hinderedRotorPotential.setUseSineTerms(target.checked);
                });
                hinderedRotorPotentialDiv.appendChild(useSineTermsInput);
                // Load PotentialPoints.
                // Create a new collapsible div for the potential points.
                let potentialPointsDiv: HTMLDivElement = document.createElement("div");
                let potentialPointContentDivId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_" + PotentialPoint.tagName;
                let potentialPointCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
                    divToAddTo: hinderedRotorPotentialDiv,
                    elementToInsertBefore: null,
                    content: potentialPointsDiv,
                    buttonLabel: PotentialPoint.tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level4,
                    contentDivId: potentialPointContentDivId
                });
                hinderedRotorPotentialDiv.appendChild(potentialPointCollapsibleDiv);
                let potentialPoints: PotentialPoint[] = [];
                let xml_potentialPoints: HTMLCollectionOf<Element> = xml_hinderedRotorPotentials[0].getElementsByTagName(PotentialPoint.tagName);
                for (let k = 0; k < xml_potentialPoints.length; k++) {
                    let potentialPoint: PotentialPoint = new PotentialPoint(getAttributes(xml_potentialPoints[k]));
                    potentialPoints.push(potentialPoint);
                    let potentialPointDiv: HTMLDivElement = createFlexDiv(undefined, level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel: HTMLLabelElement = createLabel(PotentialPoint.s_angle, boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId: string = getID(molecule.id, PotentialPoint.tagName, PotentialPoint.s_angle);
                    let angleInputElement: HTMLInputElement = createInput("number", angleInputElementId, boundary1);
                    angleInputElement.addEventListener('change', (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        // Check the input is a number.
                        if (isNumeric(target.value)) {
                            let value: number = parseFloat(target.value);
                            potentialPoint.setAngle(value);
                        } else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            angleInputElement.value = potentialPoint.getAngle().toExponential();
                        }
                        resizeInputElement(angleInputElement);
                    });
                    angleInputElement.value = potentialPoint.getAngle().toExponential();
                    resizeInputElement(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel: HTMLLabelElement = createLabel(PotentialPoint.s_potential, boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = getID(molecule.id, PotentialPoint.tagName, PotentialPoint.s_potential);
                    let potentialInputElement: HTMLInputElement = createInput("number", potentialInputElementId, boundary1);
                    potentialInputElement.addEventListener('change', (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        // Check the input is a number.
                        if (isNumeric(target.value)) {
                            let value: number = parseFloat(target.value);
                            potentialPoint.setPotential(value);
                            console.log("Set " + PotentialPoint.tagName + " to " + value.toExponential());
                        } else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = potentialPoint.getPotential().toExponential();
                        }
                        resizeInputElement(potentialInputElement);
                    });
                    potentialInputElement.value = potentialPoint.getPotential().toExponential();
                    resizeInputElement(potentialInputElement);
                    potentialPointDiv.appendChild(potentialInputElement);
                    potentialPointsDiv.appendChild(potentialPointDiv);
                }
                potentialPointCollapsibleDiv.appendChild(potentialPointsDiv);
                hinderedRotorPotential.setPotentialPoints(potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }

            // Read periodicities.
            let xml_periodicities: HTMLCollectionOf<Element> = xml_DOSCMethod[0].getElementsByTagName(Periodicity.tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                let valueString: string = getNodeValue(getFirstChildNode(xml_periodicities[0]));
                let periodicity: Periodicity = new Periodicity(getAttributes(xml_periodicities[0]), parseFloat(valueString));
                extraDOSCMethod.setPeriodicity(periodicity);
                let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.id + "_" + Periodicity.tagName,
                    boundary1, level3, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        valueString = target.value;
                        if (isNumeric(valueString)) {
                            let value: number = parseFloat(valueString);
                            periodicity.value = value;
                            (extraDOSCMethod.getPeriodicity() as Periodicity).value = value;
                            console.log("Set " + Periodicity.tagName + " to " + value);
                        } else {
                            // Reset the input to the current value.
                            alert("Periodicity input is not a number, resetting...");
                            target.value = periodicity.value.toExponential();
                        }
                    }, valueString, Periodicity.tagName);
                extraDOSCMethodDiv.appendChild(inputDiv);
            }
            molecule.setExtraDOSCMethod(extraDOSCMethod);
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
            let value: number = parseFloat(valueString);
            let reservoirSizeAttributes: Map<string, string> = getAttributes(xml_ReservoirSize[0]);
            let reservoirSize: ReservoirSize = new ReservoirSize(reservoirSizeAttributes, value);
            molecule.setReservoirSize(reservoirSize);
            let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.id + "_" + ReservoirSize.tagName,
                boundary1, level2, (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    reservoirSize.value = parseFloat(target.value);
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
        molstarDiv.id = molecule.id + "_molstar";
        moleculeDiv.appendChild(molstarDiv);

        // Create a new collapsible div for the molecule.
        getCollapsibleDiv({
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
    // Create an add molecule button.
    let addMoleculeButton: HTMLButtonElement = createButton(addString, undefined, level1);
    moleculeListDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', () => {
        // Ask the user to specify the molecule ID.
        let moleculeId: string | null = prompt("Please enter the chemical formular:", "IDNotSpecified");
        let molecule: Molecule = new Molecule(new Map(), moleculeId!);
        molecules.set(moleculeId!, molecule);
        let moleculeDiv: HTMLDivElement = createDiv(moleculeId!, level1);
        moleculeListDiv.insertBefore(moleculeDiv, addMoleculeButton);
        // Create a new collapsible div for the molecule.
        getCollapsibleDiv({
            divToAddTo: moleculeListDiv,
            elementToInsertBefore: addMoleculeButton,
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: molecule.tagName + "_" + moleculeId
        });
        // Atoms.
        let atomArrayDiv: HTMLDivElement = getCollapsibleContentDiv(moleculeId!, moleculeDiv, null, AtomArray.tagName, AtomArray.tagName,
            boundary1, level1, fontSize2);
        atomArrayDiv.appendChild(getAddAtomButton(molecule, moleculeId!, atomArrayDiv, Atom.tagName, boundary1, level2, fontSize2));
        // Bonds.
        let bondArrayDiv: HTMLDivElement = getCollapsibleContentDiv(moleculeId!, moleculeDiv, null, BondArray.tagName, BondArray.tagName,
            boundary1, level1, fontSize2);
        bondArrayDiv.appendChild(getAddBondButton(molecule, moleculeId!, bondArrayDiv, Bond.tagName, boundary1, level2));
        // Properties.
        let propertiesDiv: HTMLDivElement = getCollapsibleContentDiv(moleculeId!, moleculeDiv, null, Property.tagName, Property.tagName,
            boundary1, level1, fontSize2);
        //propertiesDiv.appendChild(getAddPropertyButton(molecule, moleculeId!, propertiesDiv, Property.tagName, boundary1, level2, fontSize2));    


    });
    return moleculeListDiv;
}

/**
 * 
 * @param moleculeId The molecule id.
 * @param divToAddTo The div to add to.
 * @param elementToInsertBefore The element to insert before.
 * @param buttonLabel The button label.
 * @param typeID The type (used to compile an id along with moleculeId).
 * @param boundary The boundary.
 * @param level The level.
 * @param buttonFontSize The button font size.
 * @returns The content div of the collapsible.
 */
function getCollapsibleContentDiv(moleculeId: string, divToAddTo: HTMLDivElement, elementToInsertBefore: HTMLElement | null,
    buttonLabel: string, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    buttonFontSize: string): HTMLDivElement {
    let div: HTMLDivElement = document.createElement("div");
    getCollapsibleDiv({
        divToAddTo: divToAddTo,
        elementToInsertBefore: elementToInsertBefore,
        content: div,
        buttonLabel: buttonLabel,
        buttonFontSize: buttonFontSize,
        boundary: boundary,
        level: level,
        contentDivId: getID(moleculeId, typeID)
    });
    return div;
}

function getAddAtomButton(molecule: Molecule, moleculeId: string, atomArrayDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    fontSize: string): HTMLButtonElement {
    // Create an add atom button.
    let addAtomButton: HTMLButtonElement = createButton(addString, getID(moleculeId, "Add" + typeID + "Button"), level);
    addAtomButton.addEventListener('click', () => {
        let attributes: Map<string, string> = new Map();
        let atom: Atom = new Atom(attributes);
        let atomId: string = molecule.getAtoms().addAtom(atom);
        let atomDiv: HTMLDivElement = createFlexDiv(undefined, level);
        let inputId: string = getID(moleculeId, atomId);
        atomDiv.appendChild(createLabel(atomId, boundary));
        // elementType.
        processElementType(inputId, atom, atomDiv, true, boundary, boundary);
        // Coordinates.
        processCoordinates(inputId, atom, atomDiv, boundary, boundary);
        let removeAtom = (id: string) => molecule.getAtoms().removeAtom(id);
        addRemoveButton(atomDiv, boundary, removeAtom, atomId);
        atomArrayDiv.insertBefore(atomDiv, addAtomButton);
    });
    return addAtomButton;
}

function getAddBondButton(molecule: Molecule, moleculeId: string, bondArrayDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    // Create an add button.
    let button: HTMLButtonElement = createButton(addString, getID(moleculeId, "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes: Map<string, string> = new Map();
        attributes.set(Bond.s_atomRefs2, "Please specify " + Bond.s_atomRefs2);
        let bond: Bond = new Bond(attributes);
        let bondId: string = molecule.getBonds().addBond(bond);
        let bondDiv: HTMLDivElement = createFlexDiv(undefined, level);
        bondArrayDiv.insertBefore(bondDiv, button);
        let inputId: string = moleculeId + "_" + bondId;
        bondDiv.appendChild(createLabel(bondId, boundary));
        // atomRefs2.
        processAtomsRefs2(molecule, bondDiv, bond, inputId, boundary);
        // order.
        processOrder(bondDiv, bond, inputId, Bond.s_order, boundary);
        let removeBond = (id: string) => molecule.getBonds().removeBond(id);
        addRemoveButton(bondDiv, boundary, removeBond, bondId);
        addRefreshButton(molecule, bondDiv, inputId, boundary1);
    });
    bondArrayDiv.appendChild(button);
    return button;
}

function reprocessAtomRefs2(molecule: Molecule, inputId: string) {
        // a.
        let aID = getID(inputId, Bond.s_atomRefs2, "0");
        let aselect: HTMLSelectElement = document.getElementById(aID) as HTMLSelectElement;
        // Change the options.
        let atomRefOptions: string[] = Array.from((molecule.getAtoms() as AtomArray).atoms.keys());
        let av: string = "";
        if (aselect != null) {
            av = aselect.value;
            aselect.innerHTML = "";
        }
        atomRefOptions.forEach((option) => {
            let oe: HTMLOptionElement = document.createElement('option');
            oe.value = option;
            oe.text = option;
            if (aselect != null) {
                aselect.add(oe);
            }
        });
        if (aselect != null) {
            aselect.value = av;
        }

        // b.
        let bID = getID(inputId, Bond.s_atomRefs2, "1");
        let bselect: HTMLSelectElement = document.getElementById(bID) as HTMLSelectElement;
        let bv: string = "";
        if (bselect != null) {
            bv = bselect.value;
            bselect.innerHTML = "";
        }
        atomRefOptions.forEach((option) => {
            let oe: HTMLOptionElement = document.createElement('option');
            oe.value = option;
            oe.text = option;
            if (bselect != null) {
                bselect.add(oe);
            }
        });
        if (bselect != null) {
            bselect.value = bv;
        }
    }

function processAtomsRefs2(molecule: Molecule, bondDiv: HTMLDivElement, bond: Bond, inputId: string, 
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let atomRefs2: string = bond.atomRefs2;
    let atomRefs: string[] = atomRefs2.split(" ");
    let atomRefOptions: string[] = Array.from((molecule.getAtoms() as AtomArray).atoms.keys());    
    // alws.
    let alws: HTMLDivElement = createLabelWithSelect(Bond.s_atomRefs2 + "[0]", atomRefOptions, Atom.tagName, atomRefs[0], 
        getID(inputId, Bond.s_atomRefs2, "0"), boundary, boundary);
    let aselect: HTMLSelectElement = alws.querySelector('select') as HTMLSelectElement;
    aselect.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        bond.setAtomRefs2(target.value + " " + atomRefs[1]);
        resizeSelectElement(target);
    });
    aselect.value = atomRefs[0];
    resizeSelectElement(aselect);
    bondDiv.appendChild(alws);
    // blws.
    let blws: HTMLDivElement = createLabelWithSelect(Bond.s_atomRefs2 + "[1]", atomRefOptions, Atom.tagName, atomRefs[1], 
        getID(inputId, Bond.s_atomRefs2, "1"), boundary, boundary);
    let bselect: HTMLSelectElement = blws.querySelector('select') as HTMLSelectElement;
    bselect.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        bond.setAtomRefs2(atomRefs[0] + " " + target.value);
        resizeSelectElement(target);
    });
    bselect.value = atomRefs[1];
    resizeSelectElement(bselect);
    bondDiv.appendChild(blws);
}

function getAddProperty(molecule: Molecule, moleculeId: string, bondArrayDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    fontSize: string): HTMLButtonElement {
    // Create an add button.
    let button: HTMLButtonElement = createButton(addString, getID(moleculeId, "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes: Map<string, string> = new Map();
        attributes.set(Bond.s_atomRefs2, "Please specify " + Bond.s_atomRefs2);
        let bond: Bond = new Bond(attributes);
        let bondId: string = molecule.getBonds().addBond(bond);
        let bondDiv: HTMLDivElement = createFlexDiv(undefined, level);
        bondArrayDiv.insertBefore(bondDiv, button);
        let inputId: string = getID(moleculeId, bondId);
        bondDiv.appendChild(createLabel(bondId, boundary));
        // atomRefs2.
        processAtomsRefs2(molecule, bondDiv, bond, inputId, boundary);
        // order.
        processOrder(bondDiv, bond, inputId, Bond.s_order, boundary);
        let removeBond = (id: string) => molecule.getBonds().removeBond(id);
        addRemoveButton(bondDiv, boundary, removeBond, bondId);
        addRefreshButton(molecule, bondDiv, inputId, boundary);
    });
    bondArrayDiv.appendChild(button);
    return button;
}

/**
 * @param xml The xml element.
 * @param div The div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(xml: Element, div: HTMLDivElement, molecule: Molecule,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): Property {
    let p: Property = new Property(getAttributes(xml));
    if (p.dictRef == ZPE.dictRef) {
        processProperty(p, Mesmer.energyUnits, molecule, xml, div, boundary, level);
    } else if (p.dictRef == RotConsts.dictRef) {
        processProperty(p, Mesmer.frequencyUnits, molecule, xml, div, boundary, level);
    } else {
        processProperty(p, undefined, molecule, xml, div, boundary, level);
    }
    return p;
}



function processElementType(inputId: string, atom: Atom, atomDiv: HTMLDivElement, first: boolean,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) : HTMLDivElement {
        let elementType: string | undefined = atom.getElementType();
        //console.log("Atom.s_elementType " + elementType);
        let selectTypes: string[] = Atom.elementTypes;
        // Select.
        if (elementType == undefined) {
            elementType = selectOption;
            selectTypes = doSelectOption(Atom.elementTypes, first);
            //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
        }
        let lws: HTMLDivElement = createLabelWithSelect(Atom.s_elementType, selectTypes, Atom.s_elementType,
        elementType!, getID(inputId, Atom.s_elementType), boundary, level);
        let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
        select.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            atom.setElementType(target.value);
            resizeSelectElement(target);
        });
        select.value = elementType;
        resizeSelectElement(select);
        selectAnotherOptionEventListener(selectTypes, select);
        atomDiv.appendChild(lws);
        return lws;
}

function doSelectOption(options: string[], first: boolean) : string[] {
        if (first) {
            options.push(selectOption);
        } else {
            // remove selectOption if present.
            let index = options.indexOf(selectOption);
            if (index > -1) {
                options.splice(index, 1);
            }
        }
        return options;
    }


/**
 * Process atom coordinates.
 * @param inputId The input id.
 * @param atom The atom.
 * @param atomDiv The atom div.
 */
function processCoordinates(inputId: string, atom: Atom, atomDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let x3id: string = inputId + "_" + Atom.s_x3;
    processCoordinate(atom, atomDiv, x3id, Atom.s_x3, atom.getX3.bind(atom), atom.setX3.bind(atom), boundary, level);
    let y3id: string = inputId + "_" + Atom.s_y3;
    processCoordinate(atom, atomDiv, y3id, Atom.s_y3, atom.getY3.bind(atom), atom.setY3.bind(atom), boundary, level);
    let z3id: string = inputId + "_" + Atom.s_z3;
    processCoordinate(atom, atomDiv, z3id, Atom.s_z3, atom.getZ3.bind(atom), atom.setZ3.bind(atom), boundary, level);
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
function processCoordinate(atom: Atom, atomDiv: HTMLDivElement, id: string, coordinate: string,
    getter: () => number | undefined, setter: (value: number) => void,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let div: HTMLDivElement = createFlexDiv(undefined, boundary);
    atomDiv.appendChild(div);
    let buttonTextContentSelected: string = coordinate + selected;
    let buttonTextContentDeselected: string = coordinate + deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let value: number | undefined = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addCoordinate(div, atom, getID(id, "Input"), value, setter, coordinate, boundary);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the AtomArray already exists
        if (document.getElementById(id) == null) {
            addCoordinate(div, atom, id, NaN, setter, coordinate, boundary);
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
 * @param atom The atom.
 * @param id The id.
 * @param value The coordinate value.
 * @param setter The setter function to call on the atom.
 * @param coordinate The coordinate name.
 * @param boundary The boundary.
 * @param level The level.
 */
function addCoordinate(div: HTMLDivElement, atom: Atom, id: string, value: number,
    setter: (value: number) => void, coordinate: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let valueString: string = (value || NaN).toString();
    let input: HTMLInputElement = createInput("text", id, boundary);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setter(parseFloat(target.value));
        console.log(coordinate + " has changed from " + value + " to " + target.value);
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
    let button: HTMLButtonElement = createButton(removeString, undefined, margin);
    div.appendChild(button);
    button.addEventListener('click', () => {
        removeFunction(...args);
        div.remove();
    });
    return button;
}

function addRefreshButton(molecule: Molecule, bondDiv: HTMLDivElement, inputId: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let button: HTMLButtonElement = createButton(refreshString, undefined, margin);
    bondDiv.appendChild(button);
    button.addEventListener('click', () => {
        reprocessAtomRefs2(molecule, inputId);
    });

}

/**
 * Process an order.
 * @param bond The bond.
 * @param bondDiv The bond div.
 * @param inputId The input id.
 * @param order The order name.
 */
function processOrder(bondDiv: HTMLDivElement, bond: Bond, inputId: string, order: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let orderId: string = getID(inputId, Bond.s_order);
    let div: HTMLDivElement = createFlexDiv(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected: string = order + selected;
    let buttonTextContentDeselected: string = order + deselected;
    let button = createButton(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let value: number | undefined = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addOrder(div, bond, orderId, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        if (document.getElementById(orderId) == null) {
            addOrder(div, bond, orderId, 1, margin);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove any existing div.
            document.getElementById(orderId)?.remove();
            console.log("Removed " + orderId);
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
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xmlFilename: string, xml: string) {
    let xmlDiv: HTMLDivElement = document.getElementById(xmlDivId) as HTMLDivElement;
    // xmlHeading
    let xmlHeadingId: string = "xmlHeading";
    remove(xmlHeadingId, ids);
    let xmlHeading: HTMLHeadingElement = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId: string = "xmlParagraph";
    remove(xmlParagraphId, ids);
    let xmlPre: HTMLPreElement = document.createElement("pre");
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
function processProperty(p: Property, units: string[] | undefined, molecule: Molecule, element: Element, div: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    // PropertyScalar.
    let scalarNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyScalar.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + PropertyScalar.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString: string = getInputString(scalarNodes[0]);
        let value: number = parseFloat(inputString);
        let psAttributes: Map<string, string> = getAttributes(scalarNodes[0]);
        let ps: PropertyScalar = new PropertyScalar(psAttributes, value);
        p.setProperty(ps);
        let label: string = p.dictRef;
        // Create a new div element for the input.
        let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.id + "_" + p.dictRef,
            boundary1, level, (event: Event) => {
                let target = event.target as HTMLInputElement;
                setNumberNode(ps, target);
            }, inputString, label);
        let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
        //inputElement.value = inputString;
        resizeInputElement(inputElement);
        inputElement.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            inputString = target.value;
            ps = p.getProperty() as PropertyScalar;
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            resizeInputElement(inputElement);
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
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
        div.appendChild(inputDiv);
    } else {
        // PropertyArray.
        let arrayNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString: string = getInputString(arrayNodes[0]);
            let values: number[] = toNumberArray(inputString.split(/\s+/));
            let paAttributes: Map<string, string> = getAttributes(arrayNodes[0]);
            let pa: PropertyArray = new PropertyArray(paAttributes, values);
            p.setProperty(pa);
            let label: string = p.dictRef;
            // Create a new div element for the input.
            let inputDiv: HTMLDivElement = createLabelWithInput("text", molecule.id + "_" + p.dictRef,
                boundary, level, (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    setNumberArrayNode(pa, target);
                }, inputString, label);
            let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
            inputElement.value = inputString;
            resizeInputElement(inputElement);
            inputElement.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLInputElement;
                inputString = target.value;
                pa = p.getProperty() as PropertyArray;
                values = toNumberArray(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                resizeInputElement(inputElement);
            });
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
            div.appendChild(inputDiv);
        } else {
            // PropertyMatrix.
            let matrixNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyMatrix.tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) {
                    throw new Error("Expecting 1 " + PropertyMatrix.tagName + " but finding " + matrixNodes.length + "!");
                }
                let inputString: string = getInputString(matrixNodes[0]);
                let values: number[] = toNumberArray(inputString.split(/\s+/));
                let pmAttributes: Map<string, string> = getAttributes(matrixNodes[0]);
                let pm: PropertyMatrix = new PropertyMatrix(pmAttributes, values);
                p.setProperty(pm);
                let label: string = p.dictRef;
                // Create a new div element for the input.
                let inputDiv: HTMLDivElement = createLabelWithInput("text", molecule.id + "_" + p.dictRef,
                    boundary, level, (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        setNumberArrayNode(pm, target);
                    }, inputString, label);
                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                inputElement.value = inputString;
                resizeInputElement(inputElement);
                inputElement.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    inputString = target.value;
                    pm = p.getProperty() as PropertyMatrix;
                    values = toNumberArray(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                    resizeInputElement(inputElement);
                });
                addAnyUnits(units, pmAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
                div.appendChild(inputDiv);
            } else {
                throw new Error("Expecting " + PropertyScalar.tagName + ", " + PropertyArray.tagName + " or "
                    + PropertyMatrix.tagName + " but finding none!");
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
function addAnyUnits(units: string[] | undefined, attributes: Map<string, string>, inputDiv: HTMLDivElement,
    id: string, tagOrDictRef: string, boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    if (units != undefined) {
        let lws: HTMLDivElement | undefined = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef);
        if (lws != undefined) {
            inputDiv.appendChild(lws);
        }
    } else {
        let attributesUnits: string | undefined = attributes.get("units");
        if (attributesUnits != undefined) {
            let label: HTMLLabelElement = createLabel("units " + attributesUnits, boundary);
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
function getUnitsLabelWithSelect(units: string[], attributes: Map<string, string>, id: string, tagOrDictRef: string): HTMLDivElement | undefined {
    let psUnits: string | undefined = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws: HTMLDivElement = createLabelWithSelect("units", units, "units", psUnits, id, boundary1, boundary1);
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
function processEnergyTransferModel(etm: EnergyTransferModel, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement, margin: string) {
    let xml_deltaEDowns: HTMLCollectionOf<Element> = element.getElementsByTagName(DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        let contentDivId: string = molecule.id + "_" + EnergyTransferModel.tagName;
        getCollapsibleDiv({
            divToAddTo: moleculeDiv,
            elementToInsertBefore: null,
            content: etmDiv,
            buttonLabel: EnergyTransferModel.tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        let deltaEDowns: DeltaEDown[] = [];
        for (let k = 0; k < xml_deltaEDowns.length; k++) {
            let inputString: string = getInputString(xml_deltaEDowns[k]);
            let value: number = parseFloat(inputString);
            let deltaEDownAttributes: Map<string, string> = getAttributes(xml_deltaEDowns[k]);
            let deltaEDown: DeltaEDown = new DeltaEDown(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label: string = DeltaEDown.tagName;
            // Create a new div element for the input.
            let id = molecule.id + "_" + EnergyTransferModel.tagName + "_" + DeltaEDown.tagName + "_" + k;
            let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    setNumberNode(deltaEDown, target);
                    inputString = target.value;
                    deltaEDowns[k].setValue(parseFloat(inputString));
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

//(window as any).setNumberArrayNode = setNumberArrayNode;

/**
 * Set a molecule number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */
export function setNumberNode(node: NumberNode, input: HTMLInputElement): void {
    if (isNumeric(input.value)) {
        let inputNumber: number = parseFloat(input.value);
        node.value = inputNumber;
        console.log(node.tagName + " value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        input.value = node.value.toExponential();
    }
}

//(window as any).set = setNumberNode;

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
        let reactionDiv: HTMLDivElement = createDiv(undefined, boundary1);
        // Set attributes.
        let reactionAttributes: Map<string, string> = getAttributes(xml_reactions[i]);
        let reactionTagNames: Set<string> = new Set();
        let cns: NodeListOf<ChildNode> = xml_reactions[i].childNodes;
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

        // Create reaction.
        let reaction = new Reaction(reactionAttributes);
        reactions.set(reaction.id, reaction);

        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Reactant.tagName);
        reactionTagNames.delete(Reactant.tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new div for the reactants.
            let reactantsDiv: HTMLDivElement = document.createElement("div");
            let reactants: Reactant[] = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let reactant: Reactant = new Reactant(getAttributes(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let lws: HTMLDivElement = createLabelWithSelect(molecule.ref + " role", Reactant.roleOptions, "Role",
                    molecule.role, molecule.ref, boundary1, level3);
                lws.querySelector('select')?.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    resizeSelectElement(target);
                });
                reactantsDiv.appendChild(lws);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let contentDivId: string = reaction.id + "_" + Reactant.tagName;
            getCollapsibleDiv({
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
        let xml_products: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Product.tagName);
        reactionTagNames.delete(Product.tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            let productsDiv: HTMLDivElement = document.createElement("div");
            let products: Product[] = [];
            for (let j = 0; j < xml_products.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_products[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let product: Product = new Product(getAttributes(xml_products[j]), molecule);
                products.push(product);
                let lws: HTMLDivElement = createLabelWithSelect(molecule.ref + " role", Product.roleOptions, molecule.role,
                    molecule.ref, "Role", boundary1, level3);
                let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
                select.value = molecule.role;
                select.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    resizeSelectElement(target);
                });
                resizeSelectElement(select);
                productsDiv.appendChild(lws);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId: string = reaction.id + "_" + Product.tagName;
            getCollapsibleDiv({
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
        let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling: Tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws: HTMLDivElement = createLabelWithSelect(Tunneling.tagName, Tunneling.options, "Tunneling", tunneling.getName(),
                reaction.id, boundary1, level3);
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
            let transitionStatesDiv: HTMLDivElement = document.createElement("div");
            let transitionStates: TransitionState[] = [];
            for (let j = 0; j < xml_transitionStates.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_transitionStates[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let transitionState: TransitionState = new TransitionState(getAttributes(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label: HTMLLabelElement = createLabel(molecule.ref + " role transitionState", level3);
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let contentDivId: string = reaction.id + "_" + TransitionState.tagName;
            getCollapsibleDiv({
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
                        let xml_preExponential: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(PreExponential.tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let inputString: string = getInputString(xml_preExponential[0]);
                                let value: number = parseFloat(inputString);
                                let preExponentialAttributes: Map<string, string> = getAttributes(xml_preExponential[0]);
                                let preExponential: PreExponential = new PreExponential(preExponentialAttributes, value);
                                (mCRCMethod as MesmerILT).setPreExponential(preExponential);
                                let label: string = PreExponential.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + PreExponential.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3,
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
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + PreExponential.tagName,
                                    PreExponential.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_activationEnergy: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(ActivationEnergy.tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let inputString: string = getInputString(xml_activationEnergy[0]);
                                let value: number = parseFloat(inputString);
                                let activationEnergyAttributes: Map<string, string> = getAttributes(xml_activationEnergy[0]);
                                let activationEnergy: ActivationEnergy = new ActivationEnergy(activationEnergyAttributes, value);
                                (mCRCMethod as MesmerILT).setActivationEnergy(activationEnergy);
                                let label: string = ActivationEnergy.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + ActivationEnergy.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3,
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
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + ActivationEnergy.tagName,
                                    ActivationEnergy.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_tInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(TInfinity.tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let inputString: string = getInputString(xml_tInfinity[0]);
                                let value: number = parseFloat(inputString);
                                let tInfinityAttributes: Map<string, string> = getAttributes(xml_tInfinity[0]);
                                let tInfinity: TInfinity = new TInfinity(tInfinityAttributes, value);
                                (mCRCMethod as MesmerILT).setTInfinity(tInfinity);
                                let label: string = TInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + TInfinity.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3,
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
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + TInfinity.tagName,
                                    TInfinity.tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_nInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(NInfinity.tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let inputString: string = getInputString(xml_nInfinity[0]);
                                let value: number = parseFloat(inputString);
                                let nInfinityAttributes: Map<string, string> = getAttributes(xml_nInfinity[0]);
                                let nInfinity: NInfinity = new NInfinity(nInfinityAttributes, value);
                                (mCRCMethod as MesmerILT).setNInfinity(nInfinity);
                                let label: string = NInfinity.tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + MesmerILT.tagName + "_" + NInfinity.tagName;
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3,
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
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + NInfinity.tagName, NInfinity.tagName,
                                    boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let contentDivId: string = reaction.id + "_" + MCRCMethod.tagName;
                        getCollapsibleDiv({
                            divToAddTo: reactionDiv,
                            elementToInsertBefore: null,
                            content: mCRCMethodDiv,
                            buttonLabel: MCRCMethod.tagName,
                            buttonFontSize: fontSize3,
                            boundary: boundary1,
                            level: level2,
                            contentDivId: contentDivId
                        });
                    } else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                } else {
                    mCRCMethod = new MCRCMethod(mCRCMethodAttributes);
                    let mCRCMethodLabel: HTMLLabelElement = document.createElement('label');
                    mCRCMethodLabel.textContent = MCRCMethod.tagName + ": " + mCRCMethodAttributes.get("name") as string;
                    Object.assign(mCRCMethodLabel.style, level2);
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
            let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_excessReactantConc[0])));
            let excessReactantConc: ExcessReactantConc = new ExcessReactantConc(getAttributes(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
            let id = reaction.id + "_" + ExcessReactantConc.tagName;
            let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level2,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    setNumberNode(excessReactantConc, target);
                }, value.toExponential(), ExcessReactantConc.tagName);
            reactionDiv.appendChild(inputDiv);
        }

        // Create a new collapsible div for the reaction and append to the reactionListDiv.
        getCollapsibleDiv({
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
function processConditions(xml: XMLDocument): HTMLDivElement {
    console.log(Conditions.tagName);
    // Create a div for the conditionss.
    let conditionssDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "me:conditions" element.
    let xml_conditionss: HTMLCollectionOf<Element> = xml.getElementsByTagName(Conditions.tagName);
    for (let i = 0; i < xml_conditionss.length; i++) {
        let xml_conditions: Element = xml_conditionss[i];
        // Create div to contain the conditions.
        let conditionsID: string = getID(Conditions.tagName, i.toString());
        let conditionsDiv: HTMLDivElement = createDiv(conditionsID, boundary1);
        let conditions: Conditions = addConditions(getAttributes(xml_conditions), conditionsDiv, null, conditionssDiv, i);
        let level = level2;
        let nextLevel = level3;
        handleBathGases(conditions, conditionsDiv, xml_conditions, level, nextLevel);
        handlePTs(conditions, conditionsDiv, xml_conditions, level, nextLevel);
        // Add a remove conditions button.
        let removeButton: HTMLButtonElement = addRemoveButton(conditionsDiv, level, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the conditions.
            remove(conditionsID, ids);
        });
    }
    // Create an add button to add a conditions.
    createAddConditionsButton(conditionssDiv, level2, level3);
    return conditionssDiv;
}


function handleBathGases(conditions: Conditions, conditionsDiv: HTMLDivElement, xml_conditions: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string },
    nextLevel: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {

    // Bath Gases
    let bathGasesDiv: HTMLDivElement = document.createElement("div");
    conditionsDiv.appendChild(bathGasesDiv);
    // Add collapsible div.
    getCollapsibleDiv({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: bathGasesDiv,
        buttonLabel: BathGas.tagName,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level,
        contentDivId: BathGas.tagName
    });

    // Add add button.
    let addBathGasButton: HTMLButtonElement = createButton(addString, undefined, nextLevel);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas: BathGas = new BathGas(new Map(), selectOption);
        conditions.addBathGas(bathGas);
        let div: HTMLDivElement = createFlexDiv(undefined, nextLevel);
        div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true));
        addRemoveButton(div, boundary1, (bathGas) => {
            bathGasesDiv.removeChild(div);
            conditions.removeBathGas(bathGas);
        });
        bathGasesDiv.insertBefore(div, addBathGasButton);
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
                conditions.addBathGas(bathGas);
                let div: HTMLDivElement = createFlexDiv(undefined, nextLevel);
                div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, false));
                addRemoveButton(div, boundary1, (bathGas) => {
                    bathGasesDiv.removeChild(div);
                    conditions.removeBathGas(bathGas);
                });
                bathGasesDiv.insertBefore(div, addBathGasButton);
            }
        } else {
            let div: HTMLDivElement = createFlexDiv(undefined, nextLevel);
            div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), undefined, true));
            addRemoveButton(div, boundary1, (bathGas) => {
                bathGasesDiv.removeChild(div);
                conditions.removeBathGas(bathGas);
            });
            bathGasesDiv.insertBefore(div, addBathGasButton);
        }
    }
}

function handlePTs(conditions: Conditions, conditionsDiv: HTMLDivElement, xml_conditions: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string },
    nextLevel: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {
    // PTs
    let moleculeKeys: Set<string> = new Set(molecules.keys());
    // Create a new div for the PTs.
    let pTsDiv: HTMLDivElement = createDiv(undefined, boundary1);
    conditionsDiv.appendChild(pTsDiv);
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
                        let bathGasValue = getNodeValue(getFirstChildNode(xml_bathGass[0]));
                        let bathGas: BathGas = new BathGas(getAttributes(xml_bathGass[0]), bathGasValue);
                        pTpair.setBathGas(bathGas);
                    }
                    // ExperimentRate.
                    let xml_experimentRates: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalRate.tagName);
                    if (xml_experimentRates.length > 0) {
                        if (xml_experimentRates.length > 1) {
                            console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                        }
                        let valueString: string = getNodeValue(getFirstChildNode(xml_experimentRates[0]));
                        let experimentRate: ExperimentalRate = new ExperimentalRate(getAttributes(xml_experimentRates[0]), parseFloat(valueString));
                        pTpair.setExperimentalRate(experimentRate);
                    }
                    // ExperimentalYield.
                    let xml_experimentalYields: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalYield.tagName);
                    if (xml_experimentalYields.length > 0) {
                        if (xml_experimentalYields.length > 1) {
                            console.warn("xml_experimentalYields.length=" + xml_experimentalYields.length);
                        }
                        let valueString: string = getNodeValue(getFirstChildNode(xml_experimentalYields[0]));
                        let experimentalYield: ExperimentalYield = new ExperimentalYield(getAttributes(xml_experimentalYields[0]), parseFloat(valueString));
                        pTpair.setExperimentalYield(experimentalYield);
                    }
                    // ExperimentalEigenvalue.
                    let xml_experimentalEigenvalues: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalEigenvalue.tagName);
                    if (xml_experimentalEigenvalues.length > 0) {
                        if (xml_experimentalEigenvalues.length > 1) {
                            console.warn("xml_experimentalEigenvalues.length=" + xml_experimentalEigenvalues.length);
                        }
                        let valueString: string = getNodeValue(getFirstChildNode(xml_experimentalEigenvalues[0]));
                        let experimentalEigenvalue: ExperimentalEigenvalue = new ExperimentalEigenvalue(getAttributes(xml_experimentalEigenvalues[0]), parseFloat(valueString));
                        pTpair.setExperimentalEigenvalue(experimentalEigenvalue);
                    }
                    // Create pTpairDiv.
                    createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, i, moleculeKeys, nextLevel);
                }
            }
        } else {
            pTs = new PTs(new Map());
        }
    } else {
        pTs = new PTs(new Map());
    }
    conditions.setPTs(pTs);
    // Add collapsible div.
    getCollapsibleDiv({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: pTsDiv,
        buttonLabel: PTs.tagName,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level,
        contentDivId: BathGas.tagName
    });
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = createDiv(undefined, nextLevel);
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton: HTMLButtonElement = createButton(addString, undefined, boundary1);
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
        createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, pTpairIndex, moleculeKeys, nextLevel);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton: HTMLButtonElement = createButton(s_Add_from_spreadsheet, undefined, boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div: HTMLDivElement = createFlexDiv(undefined, nextLevel);
        let addFromSpreadsheetId = PTs.tagName + "_" + "addFromSpreadsheet";
        let input: HTMLInputElement = createInput("text", addFromSpreadsheetId, nextLevel);
        div.appendChild(input);
        pTsDiv.insertBefore(div, addButton);
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
                        pTpair.setExperimentalRate(new ExperimentalRate(new Map(), parseFloat(experimentalRate)));
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
                        pTpair.setExperimentalYield(new ExperimentalYield(new Map(), parseFloat(experimentalYield)));
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
                        pTpair.setExperimentalEigenvalue(new ExperimentalEigenvalue(new Map(), parseFloat(experimentalEigenvalue)));
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
                    createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, pTpairIndex, moleculeKeys, nextLevel);
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
function createAddConditionsButton(conditionssDiv: HTMLDivElement,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string },
    nextLevel: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): HTMLButtonElement {
    let button: HTMLButtonElement = createButton("Add Conditions", undefined, level1);
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event: MouseEvent) => {
        let i: number = mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        let conditionsID: string = getID(Conditions.tagName, i.toString());
        let conditionsDiv: HTMLDivElement = createDiv(conditionsID, boundary1);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore: Element | null;
        if (i > 0) {
            let aboveElement = document.getElementById(getID(Conditions.tagName, (i - 1).toString())) as Element;
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
        // Add the conditions
        let conditions: Conditions = addConditions(new Map(), conditionsDiv, elementToInsertBefore, conditionssDiv, i);
        handleBathGases(conditions, conditionsDiv, null, level, nextLevel);
        handlePTs(conditions, conditionsDiv, null, level, nextLevel);
        // Add a remove conditions button.
        let removeButton: HTMLButtonElement = addRemoveButton(conditionsDiv, level2, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the control.
            remove(conditionsID, ids);
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
    getCollapsibleDiv({
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
 * @param pTIndex The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */
function createPTpairDiv(pTs: PTs, pTsDiv: HTMLDivElement, pTpair: PTpair, conditionsDivId: string, pTIndex: number,
    moleculeKeys: Set<string>,
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let pTpairDiv: HTMLDivElement = createFlexDiv(undefined, level);
    pTsDiv.append(pTpairDiv);
    addPorT(pTpairDiv, PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits(Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, PTpair.tagName, PTpair.tagName, boundary1);
    addPorT(pTpairDiv, PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    let id: string = getID(conditionsDivId, PTpair.tagName, pTIndex.toString());
    // ExcessReactantConc.
    addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, getID(id, PTpair.s_excessReactantConc),
        [pTpair], createExcessReactantConcInputElement);
    // PercentExcessReactantConc.
    addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    // Precision.
    addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, getID(id, PTpair.s_precision),
        [pTpair], createPrecisionSelectElement);
    // BathGas.
    addButtonWithToggle(pTpairDiv, pTpair, BathGas.tagName, getID(id, BathGas.tagName),
        [pTpair, moleculeKeys, true], createBathGasSelectElement);
    // ExperimentalRate.
    addButtonWithToggle(pTpairDiv, pTpair, ExperimentalRate.tagName, getID(id, ExperimentalRate.tagName),
        [undefined, pTpair, pTIndex], addExperimentalRateDetails);
    // ExperimentalYield.
    addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, getID(id, ExperimentalYield.tagName),
        [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, getID(id, ExperimentalEigenvalue.tagName),
        [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
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
 * @param attribute The attribute.
 * @param id The id for any created element.
 * @param handlerArgs The arguments for the handler.
 * @param handler The handler function that creates any element.
 */
function addButtonWithToggle(pTpairDiv: HTMLDivElement, pTpair: PTpair, attribute: string, id?: string,
    handlerArgs?: any[], handler?: (id: string, ...args: any[]) => HTMLInputElement | HTMLSelectElement | HTMLDivElement): void {
    let div: HTMLDivElement = createDiv(undefined, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected: string = attribute + selected;
    let buttonTextContentDeselected: string = attribute + deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary1);
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
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
            if (handler) {
                if (id != undefined && handlerArgs != undefined) {
                    if (handler == createBathGasSelectElement) {
                        let bathGas: BathGas | undefined = pTpair.getBathGas();
                        if (bathGas == undefined) {
                            button.textContent = buttonTextContentDeselected;
                        } else {
                            button.textContent = buttonTextContentSelected;
                            if (handlerArgs[1].has(bathGas.value) == false) {
                                console.warn("moleculeKeys does not contain " + bathGas.value);
                            }
                            div.appendChild(handler(id, bathGas, true));
                        }
                        let input: HTMLInputElement | HTMLSelectElement | HTMLDivElement = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    } else {
                        let input: HTMLInputElement | HTMLSelectElement | HTMLDivElement = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    }
                }
            }
        } else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
            if (id) {
                // Remove the element.
                remove(id, ids);
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
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */
function createPrecisionSelectElement(id: string, pTpair: PTpair): HTMLSelectElement {
    let value: string;
    if (pTpair.attributes.has(PTpair.s_precision)) {
        value = pTpair.attributes.get(PTpair.s_precision) as string;
        console.log("precision value=" + value);

        console.log("pTpair.attributes" + mapToString(pTpair.attributes));

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
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */
function createBathGasSelectElement(id: string, pTpair: PTpair, bathGas: BathGas | undefined, first: boolean): HTMLSelectElement {
    console.log("createBathGasSelectElement");
    console.log("pTpair " + pTpair.toString());
    let select: HTMLSelectElement = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, first);
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
 */
function createSelectElementBathGas(options: string[], bathGas: BathGas | undefined, first: boolean): HTMLSelectElement {
    let value: string;
    if (first) {
        options.push(selectOption);
    } else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    if (bathGas == undefined) {
        bathGas = new BathGas(new Map(), selectOption);
        value = selectOption;
    } else {
        value = bathGas.value;
    }
    let select: HTMLSelectElement = createSelectElement(options, BathGas.tagName, value,
        PTs.tagName, boundary1);
    selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        (bathGas as BathGas).value = target.value;
        console.log("Added " + target.value + " as a " + BathGas.tagName);
        resizeSelectElement(target);
    });
    select.value = value;
    resizeSelectElement(select);
    return select;
}


function addExperimentalRateDetails(id: string, pTpair: PTpair, index: number): HTMLDivElement {
    console.log("addExperimentalRateDetails");
    console.log("pTpair " + pTpair.toString());
    return addExperimentalDetails(
        pTpair,
        PTpair.tagName + "_" + ExperimentalRate.tagName + "_" + index,
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

function addExperimentalYieldDetails(id: string, pTpair: PTpair, index: number): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        PTpair.tagName + "_" + ExperimentalYield.tagName + "_" + index,
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

function addExperimentalEigenvalueDetails(id: string, pTpair: PTpair, index: number): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        PTpair.tagName + "_" + ExperimentalEigenvalue.tagName + "_" + index,
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
    ExperimentalClass: { new(attributes: Map<string, any>, value: number): T },
    details: {
        tagName: string, type: string, eventHandler: (event: Event, target: HTMLInputElement) => void,
        valueGetter: () => string, label?: string
    }[]): HTMLDivElement {
    let div = createDiv(undefined, boundary1);
    div.id = id;
    let experimental: T | undefined = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), NaN);
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
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
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
        let value: number = parseFloat(valueString);
        gs = new GrainSize(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, Mesmer.energyUnits);
        button.classList.toggle(s_optionOff);
    } else {
        valueString = "";
        gs = new GrainSize(new Map(), NaN);
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
function processModelParametersN<T extends { new(attributes: Map<string, string>, value: number): any; tagName: string }>(
    modelParameters: ModelParameters, xml_modelParameters: Element, modelParametersDiv: HTMLDivElement, ModelParameterType: T,
    setModelParameter: (mp: InstanceType<T>) => void, removeModelParameter: () => void): void {
    let div: HTMLDivElement = createFlexDiv(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = ModelParameterType.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
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
        let value: number = parseFloat(valueString);
        mp = new ModelParameterType(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
        button.classList.toggle(s_optionOff);
    } else {
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
        let level = level2;
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls: Map<string, HTMLButtonElement> = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, controlDiv, i, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
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
        handleCalcMethod(control, controlDiv, i, xml_control, level);
        getControlItems(control).forEach(item => {
            handleControl(control, controlDiv, i, onOffControls, xml_control, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton: HTMLButtonElement = addRemoveButton(controlDiv, level2, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the control.
            remove(controlID, ids);
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
    let button: HTMLButtonElement = createButton("Add Control", undefined, level1);
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
        let removeButton: HTMLButtonElement = addRemoveButton(controlDiv, level2, mesmer.removeControl.bind(mesmer), i);
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
    getCollapsibleDiv({
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
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
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
        id = getID(Control.tagName, index.toString(), s_Input);
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
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = getID(Control.tagName, CalcMethod.tagName, i.toString());
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
            cm = getCalcMethod(control, div, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId, divCm);
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
                options.push(selectOption);
            }
            // Remove any existing select.
            remove(divCmDetailsSelectId);
            remove(divCmDetailsId);
            // Create the select element.
            let select: HTMLSelectElement = createSelectElementCalcMethod(control, div, options, tagName, selectOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeCalcMethod();
            // Remove any existing div.
            remove(divCmDetailsSelectId);
            remove(divCmDetailsId);
            button.textContent = buttonTextContentDeselected;
        }
        console.log("button.classList " + button.classList);
        console.log("button.className " + button.className);
        button.classList.toggle(s_optionOn)
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
function handleTestMicroRates(control: Control, controlDiv: HTMLDivElement, xml_control: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {
    let div: HTMLDivElement = createFlexDiv(undefined, level);
    controlDiv.appendChild(div);
    let tagName: string = TestMicroRates.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
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
function getCalcMethod(control: Control, div: HTMLDivElement, xml: HTMLCollectionOf<Element>, options: string[],
    attributes: Map<string, string>, tagName: string, xsi_type: string,
    divCmDetailsId: string, divCmDetailsSelectId: string, divCm: HTMLDivElement): CalcMethod {
    let cm: CalcMethod;
    // Create the select element.
    let select: HTMLSelectElement = createSelectElementCalcMethod(control, div, options, tagName, xsi_type, divCmDetailsId,
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
                let value: number = parseFloat(getNodeValue(getFirstChildNode(fi_xml[0])));
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
    let fittingIterations: MarquardtIterations = cm.getFittingIterations() || new FittingIterations(new Map(), NaN);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild(createLabelWithInput("number", divCmDetails.id + "_FittingIterations_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                fittingIterations.value = parseInt(target.value);
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
    function createLabelWithInputForObject(obj: { value: number, tagName: string }, divCmDetails: HTMLElement,
        boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
        level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
        let id = getID(divCmDetails.id, obj.tagName, "Input");
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                obj.value = parseFloat(target.value);
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
    let marquardtIterations: MarquardtIterations = cm.getMarquardtIterations() || new MarquardtIterations(new Map(), NaN);
    cm.setMarquardtIterations(marquardtIterations);
    createLabelWithInputForObject(marquardtIterations, divCmDetails, boundary1, level0);
    // MarquardtTolerance.
    let marquardtTolerance: MarquardtTolerance = cm.getMarquardtTolerance() || new MarquardtTolerance(new Map(), NaN);
    cm.setMarquardtTolerance(marquardtTolerance);
    createLabelWithInputForObject(marquardtTolerance, divCmDetails, boundary1, level0);
    // MarquardtDerivDelta.
    let marquardtDerivDelta: MarquardtDerivDelta = cm.getMarquardtDerivDelta() || new MarquardtDerivDelta(new Map(), NaN);
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
    let chebNumTemp: ChebNumTemp = cm.getChebNumTemp() || new ChebNumTemp(new Map(), NaN);
    cm.setChebNumTemp(chebNumTemp);
    divCmDetails.appendChild(createLabelWithInput("number", divCmDetails.id + "_ChebNumTemp_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebNumTemp.value = parseFloat(target.value);
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
    processNumberElement(SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), SensitivityAnalysisSamples.tagName);
    processNumberElement(SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), SensitivityAnalysisOrder.tagName);
    processNumberElement(SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod: SensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    divCmDetails.appendChild(createLabelWithSelect(SensitivityVarRedMethod.tagName, SensitivityVarRedMethod.options,
        SensitivityVarRedMethod.tagName, SensitivityVarRedMethod.options[0], divCmDetails.id, boundary1, boundary1));
    // Add event listener for the select element.
    let select: HTMLSelectElement = divCmDetails.querySelector('select') as HTMLSelectElement;
    select?.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        sensitivityVarRedMethod.value = target.value;
        console.log("Set SensitivityVarRedMethod to " + target.value);
        resizeSelectElement(target);
    });
}

/**
 * @param options The options.
 * @param select The select element.
 */
function selectAnotherOptionEventListener(options: string[], select: HTMLSelectElement) {
    select.addEventListener('click', (event: MouseEvent) => {
        if (options[options.length - 1] == selectOption) {
            options.pop();
        }
        let lastIndex: number = select.options.length - 1;
        if (select.options[lastIndex].value == selectOption) {
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
        divCmDetails = createFlexDiv(undefined, boundary1);
        divCmDetails.id = divCmDetails.id;
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
 * @param fontSize The fontSize to use.
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
        let energies: Map<string, number> = new Map();
        let i: number = 0;
        let energyMin: number = Number.MAX_VALUE;
        let energyMax: number = Number.MIN_VALUE;
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
                let energy: number = reaction.getReactantsEnergy(molecules);
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
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
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
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
                            energy = molecules.get(ref)?.getEnergy() ?? 0;
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
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
        let energyRange: number = energyMax - energyMin;
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
            let energyRescaled: number = rescale(energyMin, energyRange, 0, rdCanvasHeight, energy);
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
        let canvasHeightWithBorder = rdCanvasHeight + (4 * th) + (2 * lw);
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdCanvasHeight;
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
            let energyRescaled: number = rescale(energyMin, energyRange, 0, originalCanvasHeight, energy);
            let x0: number = get(reactantsInXY, value)[0];
            let y: number = energyRescaled + lw;
            let x1: number = get(reactantsOutXY, value)[0];
            let energyString: string = energy.toString();
            drawLevel(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function (value) {
            let energy: number = get(energies, value);
            let energyRescaled: number = rescale(energyMin, energyRange, 0, originalCanvasHeight, energy);
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
            let energyRescaled: number = rescale(energyMin, energyRange, 0, originalCanvasHeight, energy);
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