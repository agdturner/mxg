
//import { openDB } from 'idb';

//import * as $3Dmol from '3dmol';

import { get, isNumeric, rescale } from './util.js';

import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getAttributes,
    getSingularElement, NumberArrayNode, NumberNode
} from './xml.js';

import {
    Molecule, Atom, Bond, EnergyTransferModel, DeltaEDown, DOSCMethod, Property, AtomArray, BondArray,
    PropertyList, PropertyScalar, PropertyArray, ExtraDOSCMethod, BondRef, HinderedRotorPotential,
    PotentialPoint, Periodicity, ReservoirSize, ZPE, RotConsts, VibFreqs
} from './molecule.js';

import {
    Reaction, TransitionState, ReactionMolecule, Reactant, Product, MCRCMethod, MesmerILT,
    PreExponential, ActivationEnergy, NInfinity, Tunneling, TInfinity, ExcessReactantConc
} from './reaction.js';

import { arrayToString, toNumberArray } from './util.js';

import {
    createLabelWithInput, makeCollapsible, getCollapsibleDiv, resizeInputElement, createSelectElement,
    resizeSelectElement, createFlexDiv, createButton, remove, createLabel, createInput, createLabelWithSelect,
    createDiv, createButtonWithLabel
} from './html.js';

import { drawLevel, drawLine, getTextHeight, getTextWidth } from './canvas.js';

import { BathGas, Conditions, ExperimentRate, PTpair, PTs } from './conditions.js';

import { EnergyAboveTheTopHill, GrainSize, MaxTemperature, ModelParameters } from './modelParameters.js';

import {
    Control, DiagramEnergyOffset, Eigenvalues, HideInactive, TestDOS, PrintSpeciesProfile,
    TestMicroRates, TestRateConstants, PrintGrainDOS, PrintCellDOS, PrintReactionOperatorColumnSums,
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

/**
 * MXG.
 */
let mxg_url: string = "https://github.com/agdturner/mxg-pwa";
let mxg_a = document.createElement('a');
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;

/**
 * MESMER.
 */
let mesmer_url: string = "https://sourceforge.net/projects/mesmer/";
let memser_a = document.createElement('a');
memser_a.href = mesmer_url;
memser_a.textContent = mesmer_url;

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
let addString: string = "add";
let addSymbol: string = "\uFF0B";
let removeString: string = "remove";
let removeSymbol: string = "\u2715";
let s_Add_from_spreadsheet: string = "Add from spreadsheet";

// Selected and deselected symbology.
let selected: string = " \u2713";
let deselected: string = " \u2717";
let selectAnotherOption: string = "Action/select another option...";


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
let molecules: Map<string, Molecule> = new Map();

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
let reactions: Map<string, Reaction> = new Map();

/**
 * The reactions diagram ids.
 */
let rdDivId: string = "reactionsDiagram";
let rdCanvasId: string = "reactionsDiagramCanvas";
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
    let menuDiv: HTMLDivElement = document.getElementById('menu') as HTMLDivElement;
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';
    // Create Load button.
    let loadButton = createButton('Load', boundary1);
    loadButton.addEventListener('click', (event: MouseEvent) => {
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
    let increaseFontSizeButton = createButton("Increase Font Size", boundary1);
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
    let decreaseFontSizeButton = createButton("Decrease Font Size", boundary1);
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
    let lightDarkModeButton = createButton("Light/Dark Mode", boundary1);
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
    let saveButtonId = 'saveButtonId';
    remove(saveButtonId);
    let saveButton = createButton('Save', boundary1);
    saveButton.id = saveButtonId;
    saveButton.addEventListener('click', saveXML);
    saveButton.style.fontSize = '1em'; // Set the font size with a relative unit.
    menuDiv.appendChild(saveButton);

    let welcomeDiv: HTMLDivElement = createDiv(boundary1);
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
    let instructionsDiv: HTMLDivElement = createDiv(boundary1);
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
    let inputElement: HTMLInputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.onchange = function () {
        if (inputElement.files) {
            for (let i = 0; i < inputElement.files.length; i++) {
                console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            }
            let file: File | null = inputElement.files[0];
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
    inputElement.click();
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
        let titleId = 'title';
        let titleDiv: HTMLDivElement = document.getElementById(titleId) as HTMLDivElement;
        let lwiId: string = 'titleDiv';
        // If the lwi div already exists, remove it.
        remove(lwiId);
        // Create input element.
        let lwi: HTMLDivElement = createLabelWithInput("text", lwiId + "Input", boundary1, level0,
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
    let moleculesDivId = 'molecules';
    let moleculesDiv: HTMLElement = document.getElementById(moleculesDivId) as HTMLElement;
    let moleculesListDivId = 'moleculesList';
    // If the moleculeListDiv already exists, remove it.
    remove(moleculesListDivId);
    let moleculeListDiv: HTMLDivElement = processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    moleculesDiv.appendChild(
        getCollapsibleDiv({
            content: moleculeListDiv,
            buttonLabel: "Molecules",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: moleculeListDiv.id
        })
    );
    mesmer.setMoleculeList(new MoleculeList(getAttributes(moleculeListDiv), Array.from(molecules.values())));

    // Reactions.
    let reactionsDivId = 'reactions';
    let reactionsDiv: HTMLDivElement = document.getElementById(reactionsDivId) as HTMLDivElement;
    let reactionsListDivId: string = 'reactionsList';
    // If the reactionsListDiv already exists, remove it.
    remove(reactionsListDivId);
    let reactionsListDiv: HTMLDivElement = processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    reactionsDiv.appendChild(
        getCollapsibleDiv({
            content: reactionsListDiv,
            buttonLabel: "Reactions",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: reactionsListDiv.id
        })
    );
    mesmer.setReactionList(new ReactionList(getAttributes(reactionsDiv), Array.from(reactions.values())));

    // Add the reactions diagram canvas.
    // Destroy any existing reactions diagram.
    // Check for popWindow.
    if (popWindow != null) {
        popWindow.close();
        popWindow = null;
    }
    // If rdDiv already exists, remove it.
    let rdDiv: HTMLElement | null = document.getElementById(rdDivId);
    if (rdDiv != null) {
        rdDiv.parentNode?.removeChild(rdDiv);
    }
    // Create a new rdDiv and append it.
    rdDiv = createDiv(boundary1);
    rdDiv.id = rdDivId;
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = 'popButtonDivId';
    // If the popButtonDiv already exists, remove it.
    remove(popButtonDivId);
    let popButtonDiv = createDiv(boundary1);
    popButtonDiv.id = popButtonDivId;
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = "popButtonId";
    // If the popButton already exists, remove it.
    remove(popButtonID);
    let popButton: HTMLButtonElement = createButton("Pop out diagram into a new window", boundary1);
    popButton.id = popButtonID;
    popButtonDiv.appendChild(popButton);
    let existingCanvas: HTMLElement | null = document.getElementById(rdCanvasId);
    if (existingCanvas) {
        existingCanvas.remove();
    }
    let rdCanvas: HTMLCanvasElement = document.createElement('canvas');
    rdCanvas.id = rdCanvasId;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdCanvasHeight;
    rdCanvas.style.border = "1px solid black";
    drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener('click', () => {
        let cid = rdCanvasId + "clone";
        if (popWindow == null) {
            /**
             * Cloning is necessary for Chrome.
             */
            let c: HTMLCanvasElement = (rdCanvas as HTMLCanvasElement).cloneNode(true) as HTMLCanvasElement;
            c.id = cid;
            popWindow = window.open("", "Reactions Diagram", "width=" + c.width + ", height=" + c.height) as Window;
            popWindow.document.body.appendChild(c);
            drawReactionDiagram(c, dark, rd_font, rd_lw, rd_lwc);
            remove(rdCanvasId);
            popButton.textContent = "Pop back reaction diagram";
        } else {
            /**
             * Cloning is necessary for Chrome.
             */
            let c: HTMLCanvasElement = popWindow.document.getElementById(rdCanvasId) as HTMLCanvasElement;
            rdCanvas = c.cloneNode(true) as HTMLCanvasElement;
            rdCanvas.id = rdCanvasId;
            if (rdDiv != null) {
                rdDiv.appendChild(rdCanvas);
            }
            drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
            popWindow.close();
            popWindow = null;
            popButton.textContent = "Pop out reaction diagram to a new window";
        }
    });

    // Conditions
    let conditionsDivId = 'conditions';
    let conditionsDiv: HTMLDivElement = document.getElementById(conditionsDivId) as HTMLDivElement;
    let conditionsListDivId = 'conditionsList';
    // If the conditionsListDiv already exists, remove it.
    remove(conditionsListDivId);
    let conditionsListDiv: HTMLDivElement = processConditions(xml);
    conditionsListDiv.id = conditionsListDivId;
    conditionsDiv.appendChild(
        getCollapsibleDiv({
            content: conditionsListDiv,
            buttonLabel: "Conditions",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: conditionsListDiv.id
        })
    );

    // Model Parameters.
    let modelParametersDivId = 'modelParameters';
    let modelParametersDiv: HTMLDivElement = document.getElementById(modelParametersDivId) as HTMLDivElement;
    let modelParametersListDiv: HTMLDivElement = processModelParameters(xml);
    modelParametersListDiv.id = 'modelParametersList';
    // If the modelParametersListDiv already exists, remove it.
    remove(modelParametersListDiv.id);
    modelParametersDiv.appendChild(
        getCollapsibleDiv({
            content: modelParametersListDiv,
            buttonLabel: "Model Parameters",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: modelParametersListDiv.id
        })
    );

    // Control.
    let controlDivId = 'control';
    let controlDiv: HTMLDivElement = document.getElementById(controlDivId) as HTMLDivElement;
    let controlListDiv: HTMLDivElement = processControl(xml);
    controlListDiv.id = 'controlList';
    // If the controlListDiv already exists, remove it.
    remove(controlListDiv.id);
    controlDiv.appendChild(
        getCollapsibleDiv({
            content: controlListDiv,
            buttonLabel: "Control",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: controlListDiv.id
        })
    );

    // Initiate action listeners for collapsible content.
    makeCollapsible();
}

/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml: XMLDocument): HTMLDivElement {
    // Create div to contain the molecules list.
    let moleculeListDiv: HTMLDivElement = createDiv(boundary1);
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
        //});
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));
        // Init atomsNode.
        let atomsNode: AtomArray | Atom | undefined;
        // There can be an individual atom not in an atom array, or an attom array.
        let xml_atomArrays: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(AtomArray.tagName);
        if (xml_atomArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + AtomArray.tagName + " but finding " + xml_atomArrays.length + "!");
        }
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms: HTMLCollectionOf<Element> = xml_atomArray.getElementsByTagName(Atom.tagName);
            if (xml_atoms.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + AtomArray.tagName + ", but finding " + xml_atoms.length + "!");
            }
            let atoms: Atom[] = [];
            for (let j = 0; j < xml_atoms.length; j++) {
                atoms.push(new Atom(getAttributes(xml_atoms[j])));
            }
            atomsNode = new AtomArray(getAttributes(xml_atomArray), atoms);
            moleculeTagNames.delete(AtomArray.tagName);
        } else {
            let xml_atoms: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Atom.tagName);
            if (xml_atoms.length == 1) {
                atomsNode = new Atom(getAttributes(xml_atoms[0]));
            } else if (xml_atoms.length > 1) {
                throw new Error("Expecting 1 " + Atom.tagName + " but finding " + xml_atoms.length + ". Should these be in an " + AtomArray.tagName + "?");
            }
        }
        //console.log("atomsNode=" + atomsNode);
        moleculeTagNames.delete(Atom.tagName);
        // Init bondsNode.
        let bondsNode: BondArray | Bond | undefined;
        // There can be an individual bond not in a bond array, or a bond array.
        let xml_bondArrays: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(BondArray.tagName);
        if (xml_bondArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + BondArray.tagName + " but finding " + xml_bondArrays.length + "!");
        }
        if (xml_bondArrays.length == 1) {
            let xml_bondArray = xml_bondArrays[0];
            let xml_bonds: HTMLCollectionOf<Element> = xml_bondArray.getElementsByTagName(Bond.tagName);
            // There may be only 1 bond in a BondArray.
            let bonds: Bond[] = [];
            for (let j = 0; j < xml_bonds.length; j++) {
                bonds.push(new Bond(getAttributes(xml_bonds[j])));
            }
            bondsNode = new BondArray(getAttributes(xml_bondArray), bonds);
            moleculeTagNames.delete(BondArray.tagName);
        } else {
            let xml_bonds: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Bond.tagName);
            if (xml_bonds.length == 1) {
                bondsNode = new Bond(getAttributes(xml_bonds[0]));
            } else if (xml_bonds.length > 1) {
                throw new Error("Expecting 1 " + Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + BondArray.tagName + "?");
            }
        }
        moleculeTagNames.delete(Bond.tagName);

        // Create molecule.
        let molecule = new Molecule(attributes, atomsNode, bondsNode);
        molecules.set(molecule.id, molecule);

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
            let collapsibleDiv: HTMLDivElement = getCollapsibleDiv({
                content: plDiv,
                buttonLabel: PropertyList.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl: PropertyList = new PropertyList(getAttributes(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps: HTMLCollectionOf<Element> = xml_PLs[0].getElementsByTagName(Property.tagName);
            for (let j = 0; j < xml_Ps.length; j++) {
                let p: Property = new Property(getAttributes(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                if (p.dictRef == ZPE.dictRef) {
                    processProperty(p, ZPE.units, molecule, xml_Ps[j], plDiv, boundary1, level3);
                } else if (p.dictRef == RotConsts.dictRef) {
                    processProperty(p, RotConsts.units, molecule, xml_Ps[j], plDiv, boundary1, level3);
                } else {
                    processProperty(p, undefined, molecule, xml_Ps[j], plDiv, boundary1, level3);
                }
            }
            moleculeTagNames.delete(PropertyList.tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Property.tagName);
            if (xml_Ps.length != 1) {
                throw new Error("Expecting 1 " + Property.tagName + " but finding " + xml_Ps.length + ". Should these be in a " + PropertyList.tagName + "?");
            }
            // Create a new Property.
            let p: Property = new Property(getAttributes(xml_Ps[0]));
            molecule.setProperties(p);
            if (p.dictRef == ZPE.dictRef) {
                processProperty(p, ZPE.units, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            } else if (p.dictRef == RotConsts.dictRef) {
                processProperty(p, RotConsts.units, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            } else {
                processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            }
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
            processDOSCMethod(dOSCMethod, molecule, moleculeDiv);
            moleculeTagNames.delete(DOSCMethod.tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName(ExtraDOSCMethod.tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            }

            //console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");

            let extraDOSCMethod: ExtraDOSCMethod = new ExtraDOSCMethod(getAttributes(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
            let contentDivId: string = molecule.id + "_" + ExtraDOSCMethod.tagName + "_";
            let extraDOSCMethodCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
                content: extraDOSCMethodDiv,
                buttonLabel: ExtraDOSCMethod.tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(extraDOSCMethodCollapsibleDiv);
            // Read bondRef.
            let xml_bondRefs: HTMLCollectionOf<Element> = xml_ExtraDOSCMethod[0].getElementsByTagName(BondRef.tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                }
                let container: HTMLDivElement = createFlexDiv(level3);
                let label: HTMLLabelElement = document.createElement("label");
                label.textContent = BondRef.tagName + ": ";
                container.appendChild(label);
                let bondRef: BondRef = new BondRef(getAttributes(xml_bondRefs[0]), getNodeValue(getFirstChildNode(xml_bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
                // Create a HTMLSelectElement to select the bondRef.
                let bondIds: Set<string> = (molecule.getBonds() as BondArray).getBondIds();
                let select: HTMLSelectElement = createSelectElement(bondIds, BondRef.tagName, bondRef.value, molecule.id + "_" + BondRef.tagName, boundary1);
                select.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    bondRef.value = target.value;
                    resizeSelectElement(target);
                });
                resizeSelectElement(select);
                container.appendChild(select);
                extraDOSCMethodDiv.appendChild(container);
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
                let hinderedRotorPotentialDiv: HTMLDivElement = createFlexDiv(boundary1);
                let contentDivId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName;
                let hinderedRotorPotentialCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: HinderedRotorPotential.tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level3,
                    contentDivId: contentDivId
                });
                extraDOSCMethodDiv.appendChild(hinderedRotorPotentialCollapsibleDiv);
                // Formats
                let formatLabel: HTMLLabelElement = createLabel("Format:", level4);
                hinderedRotorPotentialDiv.appendChild(formatLabel);
                let select: HTMLSelectElement = createSelectElement(HinderedRotorPotential.formats, HinderedRotorPotential.tagName,
                    hinderedRotorPotential.format, molecule.id + "_" + HinderedRotorPotential.tagName, boundary1);
                select.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    hinderedRotorPotential.format = target.value;
                    resizeSelectElement(target);
                });
                hinderedRotorPotentialDiv.appendChild(select);
                // Add any units.
                let unitsLabel: HTMLLabelElement = createLabel("Units:", boundary1);
                hinderedRotorPotentialDiv.appendChild(unitsLabel);
                addAnyUnits(HinderedRotorPotential.units, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv,
                    molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName,
                    HinderedRotorPotential.tagName, boundary1);
                // Add expansionSize.
                let expansionSizeLabel: HTMLLabelElement = createLabel("Expansion size:", boundary1);
                hinderedRotorPotentialDiv.appendChild(expansionSizeLabel);
                let expansionSizeInputElementId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_expansionSize";
                let expansionSizeInputElement: HTMLInputElement = createInput("number", expansionSizeInputElementId, boundary1);
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                expansionSizeInputElement.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    // Check the input is a number.
                    if (isNumeric(target.value)) {
                        hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                    } else {
                        // Reset the input to the current value.
                        alert("Expansion size input is not a number, resetting...");
                        expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                    }
                    resizeInputElement(expansionSizeInputElement);
                });
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                resizeInputElement(expansionSizeInputElement);
                hinderedRotorPotentialDiv.appendChild(expansionSizeInputElement);
                // Add useSineTerms.
                let useSineTermsLabel: HTMLLabelElement = createLabel("Use sine terms:", boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_useSineTerms";
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
                    let potentialPointDiv: HTMLDivElement = createFlexDiv(level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel: HTMLLabelElement = createLabel("Angle:", boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId: string = molecule.id + "_" + PotentialPoint.tagName + "_angle";
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
                    let potentialLabel: HTMLLabelElement = createLabel("Potential:", boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = molecule.id + "_" + PotentialPoint.tagName + "_potential";
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
        let collapsibleDiv = getCollapsibleDiv({
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
function displayXML(xmlFilename: string, xml: string) {
    let xmlDiv: HTMLDivElement = document.getElementById("xml") as HTMLDivElement;
    // xmlHeading
    let xmlHeadingId: string = "xmlHeading";
    remove(xmlHeadingId);
    let xmlHeading: HTMLHeadingElement = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId: string = "xmlParagraph";
    remove(xmlParagraphId);
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
 * @param moleculeDiv The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */
function processProperty(p: Property, units: string[] | undefined, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    // Handle scalar or array property
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
        moleculeDiv.appendChild(inputDiv);
    } else {
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
            moleculeDiv.appendChild(inputDiv);
        } else {
            throw new Error("Expecting " + PropertyScalar.tagName + " or " + PropertyArray.tagName);
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
        let unitsSelectElement: HTMLSelectElement | undefined = getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            Object.assign(unitsSelectElement.style, boundary);
            inputDiv.appendChild(unitsSelectElement);
        }
    } else {
        let attributesUnits: string | undefined = attributes.get("units");
        if (attributesUnits != undefined) {
            let label: HTMLLabelElement = createLabel(attributesUnits, boundary);
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
function getUnitsSelectElement(units: string[], attributes: Map<string, string>, id: string, tagOrDictRef: string): HTMLSelectElement | undefined {
    let psUnits: string | undefined = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let select: HTMLSelectElement = createSelectElement(units, "Units", psUnits, id, boundary1);
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
        return select;
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
function processDOSCMethod(dOSCMethod: DOSCMethod, molecule: Molecule, moleculeDiv: HTMLDivElement): void {
    let label: HTMLLabelElement = document.createElement('label');
    label.textContent = DOSCMethod.tagName + ": ";
    let container: HTMLDivElement = document.createElement('div');
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options: string[] = ["ClassicalRotors", "me:QMRotors", "QMRotors"];
    let select: HTMLSelectElement = createSelectElement(options, DOSCMethod.tagName, dOSCMethod.tagName, molecule.id + "_" + 'Select_DOSCMethod', boundary1);
    // Set the initial value to the DOSCMethod.
    select.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        dOSCMethod.setXsiType(target.value);
        console.log("Set DOSCMethod to " + target.value);
        resizeSelectElement(target);
    });
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
function processEnergyTransferModel(etm: EnergyTransferModel, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement, margin: string) {
    let xml_deltaEDowns: HTMLCollectionOf<Element> = element.getElementsByTagName(DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        let contentDivId: string = molecule.id + "_" + EnergyTransferModel.tagName;
        let collapsibleDiv = getCollapsibleDiv({
            content: etmDiv,
            buttonLabel: EnergyTransferModel.tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        moleculeDiv.appendChild(collapsibleDiv);
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
            unitsLabel.textContent = "cm-1";
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

(window as any).setNumberArrayNode = setNumberArrayNode;

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

(window as any).set = setNumberNode;

/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml: XMLDocument): HTMLDivElement {
    // Create div to contain the reaction list.
    let reactionListDiv: HTMLDivElement = createDiv(boundary1);
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
        let reactionDiv: HTMLDivElement = createDiv(boundary1);
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
                let container: HTMLDivElement = document.createElement("div");
                let label: HTMLLabelElement = document.createElement('label');
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options: string[] = ["deficientReactant", "excessReactant", "modelled"];
                let select: HTMLSelectElement = createSelectElement(options, "Role", reactant.getMolecule().role, molecule.ref + "_" + 'Select_Role', boundary1);
                // Set the initial value.
                select.value = molecule.role;
                // Add event listener to selectElement.
                select.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    resizeSelectElement(target);
                });
                container.appendChild(select);
                Object.assign(container.style, level3);
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let contentDivId: string = reaction.id + "_" + Reactant.tagName;
            let reactantCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
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
                let options: string[] = ["modelled", "sink"];
                let container: HTMLDivElement = createLabelWithSelect(molecule.ref + " role:", options,
                    molecule.ref + "_" + 'Select_Role', "Role", boundary1, level3);
                let selectElement: HTMLSelectElement = container.querySelector('select') as HTMLSelectElement;
                selectElement.value = molecule.role;
                selectElement.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                });
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId: string = reaction.id + "_" + Product.tagName;
            let productCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
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
        let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling: Tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            // Create a new div for the tunneling.
            let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
            let label: HTMLLabelElement = document.createElement('label');
            label.textContent = Tunneling.tagName + ": ";
            container.appendChild(label);
            // Create a HTMLSelectElement to select the Tunneling.
            let options: string[] = ["Eckart", "WKB"];
            let selectElement: HTMLSelectElement = createSelectElement(options, "Tunneling", tunneling.getName(),
                reaction.id + "_" + 'Select_Tunneling', boundary1);
            // Set the initial value.
            selectElement.value = tunneling.getName();
            // Add event listener to selectElement.
            selectElement.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLSelectElement;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
                resizeSelectElement(target);
            });
            container.appendChild(selectElement);
            Object.assign(container.style, level2);
            reactionDiv.appendChild(container);
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
                let label: HTMLLabelElement = createLabel(molecule.ref + " role: transitionState", level3);
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let contentDivId: string = reaction.id + "_" + TransitionState.tagName;
            let transitionStatesCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
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
                        let mCRCMethodCollapsibleDiv: HTMLDivElement = getCollapsibleDiv({
                            content: mCRCMethodDiv,
                            buttonLabel: MCRCMethod.tagName,
                            buttonFontSize: fontSize3,
                            boundary: boundary1,
                            level: level2,
                            contentDivId: contentDivId
                        });
                        reactionDiv.appendChild(mCRCMethodCollapsibleDiv);
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

        // Create a new collapsible div for the reaction.
        let reactionCollapsibleDiv = getCollapsibleDiv({
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
function processConditions(xml: XMLDocument): HTMLDivElement {
    console.log(Conditions.tagName);
    // Create div to contain the conditions.
    let conditionsDiv: HTMLDivElement = createDiv(boundary1);
    // Get the XML "moleculeList" element.
    let xml_conditions: Element = getSingularElement(xml, Conditions.tagName);
    let conditions: Conditions = new Conditions(getAttributes(xml_conditions));
    mesmer.setConditions(conditions);

    // Bath Gases
    let bathGasesDiv: HTMLDivElement = document.createElement("div");
    conditionsDiv.appendChild(bathGasesDiv);
    // Add collapsible div.
    conditionsDiv.appendChild(getCollapsibleDiv({
        content: bathGasesDiv,
        buttonLabel: BathGas.name,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: BathGas.tagName
    }));

    // Add add button.
    let addBathGasButton: HTMLButtonElement = createButton(addString, level2);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas: BathGas = new BathGas(new Map(), "");
        conditions.addBathGas(bathGas);
        let containerDiv: HTMLDivElement = createFlexDiv(level2);
        let bathGasLabel: HTMLLabelElement = createLabel(BathGas.tagName, boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Add HTMLSelectInput for the BathGas.
        containerDiv.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas));
        // Add a remove button.
        let removeButton: HTMLButtonElement = createButton(removeString, boundary1);
        removeButton.addEventListener('click', () => {
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
        containerDiv.appendChild(removeButton);
        bathGasesDiv.appendChild(containerDiv);
    });

    // Process any "bathGas" elements that are immediate children of xml_conditions.
    let xml_bathGases: Element[] = Array.from(xml_conditions.children).filter(child => child.tagName === BathGas.tagName);
    if (xml_bathGases.length > 0) {
        for (let i = 0; i < xml_bathGases.length; i++) {
            let attributes: Map<string, string> = getAttributes(xml_bathGases[i]);
            let moleculeID: string = getNodeValue(getFirstChildNode(xml_bathGases[i]));
            let bathGas: BathGas = new BathGas(attributes, moleculeID);
            console.log("bathGas" + bathGas.toString());
            conditions.addBathGas(bathGas);
            let containerDiv: HTMLDivElement = createFlexDiv(level2);
            let bathGasLabel: HTMLLabelElement = createLabel(BathGas.tagName, boundary1);
            containerDiv.appendChild(bathGasLabel);
            containerDiv.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas));
            // Add a remove button.
            let removeButton: HTMLButtonElement = createButton(removeString, boundary1);
            removeButton.addEventListener('click', () => {
                bathGasesDiv.removeChild(containerDiv);
                conditions.removeBathGas(bathGas);
            });
            containerDiv.appendChild(removeButton);
            bathGasesDiv.appendChild(containerDiv);
        }
    }

    // PTs
    let pTsDiv: HTMLDivElement = document.createElement("div");
    conditionsDiv.appendChild(pTsDiv);
    let pTs: PTs = new PTs(new Map());
    // Add collapsible div.
    conditionsDiv.appendChild(getCollapsibleDiv({
        content: pTsDiv,
        buttonLabel: PTs.name,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: BathGas.tagName
    }));
    // Create an add button to add a new PTpair.
    let addButton: HTMLButtonElement = createButton(addString, level2);
    pTsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', () => {
        // Create a new PTpair.
        let pTPairAttributes: Map<string, string> = new Map();
        pTPairAttributes.set("units", "Torr");
        let pTPair: PTpair = new PTpair(pTPairAttributes);
        let pTPairIndex: number = pTs.addPTpair(pTPair);
        let pTPairDiv: HTMLDivElement = createFlexDiv(level2);
        addP(pTPairDiv, pTPair);
        addT(pTPairDiv, pTPair);
        addAnyUnits(undefined, pTPairAttributes, pTPairDiv, PTpair.tagName, PTpair.tagName, boundary1);
        // Create an add button for adding details.
        let addDetailsButton: HTMLButtonElement = createButton(addString + " details", boundary1);
        pTPairDiv.appendChild(addDetailsButton);
        // Add event listener to the addDetailsButton.
        addDetailsButton.addEventListener('click', () => {
            let detailsDiv: HTMLDivElement = document.createElement("div");
            addExcessReactantConc(pTPairDiv, pTPair);
            addPercentExcessReactantConc(pTPairDiv, pTPair);
            addPrecision(pTPairDiv, pTPair);
            addBathGas(pTPairDiv, pTPair);
            addExperimentRateButton(pTPairDiv, pTPair);

            pTPairDiv.insertBefore(detailsDiv, addDetailsButton);
            pTPairDiv.removeChild(addDetailsButton);
        });


        /*
        addExperimentRateButton.addEventListener('click', () => {
            let experimentRateDiv: HTMLDivElement = document.createElement("div");
            let experimentRate: ExperimentRate = new ExperimentRate(new Map(), NaN);
            pTPair.setExperimentRate(experimentRate);
            let experimentRateLabel: HTMLLabelElement = document.createElement('label');
            experimentRateLabel.textContent = ExperimentRate.tagName + ": ";
            experimentRateDiv.appendChild(experimentRateLabel);
            pTPairDiv.insertBefore(experimentRateDiv, addExperimentRateButton);
            pTPairDiv.removeChild(addExperimentRateButton);
        });
        pTPairDiv.appendChild(addExperimentRateDiv);
        */


        // Add a remove button.
        let removeButton: HTMLButtonElement = createButton(removeString, boundary1);
        removeButton.addEventListener('click', () => {
            pTsDiv.removeChild(pTPairDiv);
            pTs.removePTpair(pTPairIndex);
            pTPair.removeBathGas();
        });
        pTPairDiv.appendChild(removeButton);
        pTsDiv.appendChild(pTPairDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton: HTMLButtonElement = createButton(s_Add_from_spreadsheet, boundary1);
    pTsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let inputDiv: HTMLDivElement = createFlexDiv(level2);
        let addFromSpreadsheetId = PTs.tagName + "_" + "addFromSpreadsheet";
        let inputElement: HTMLInputElement = createInput("text", addFromSpreadsheetId, level2);
        inputDiv.appendChild(inputElement);
        pTsDiv.insertBefore(inputDiv, addButton);
        // Add an event listener to the inputElement.
        inputElement.addEventListener('change', () => {
            console.log("inputElement.value=" + inputElement.value);
            console.log("inputElement.value.length=" + inputElement.value.length);
            if (inputElement.value.length > 0) {
                let pTPairsArray: string[] = inputElement.value.split(" ");
                // Is there a header?
                let index: Map<string, number> = new Map();
                pTPairsArray[0].split("\t").forEach((value, i) => {
                    index.set(value, i);
                });
                console.log("pTPairsArray.length=" + pTPairsArray.length);
                for (let i = 1; i < pTPairsArray.length; i++) {
                    let pTPairAttributes: Map<string, string> = new Map();
                    pTPairAttributes.set("units", "Torr");
                    let pTPair: PTpair = new PTpair(pTPairAttributes);
                    let pTPairArray: string[] = pTPairsArray[i].split("\t");
                    let pIndex: number = index.get("P") as number;
                    let tIndex: number = index.get("T") as number;
                    let bathGasIndex: number = index.get("me:bathGas") as number;
                    let p: number = parseFloat(pTPairArray[pIndex]);
                    let t: number = parseFloat(pTPairArray[tIndex]);
                    pTPair.setP(p);
                    pTPair.setT(t);
                    if (index.has("me:bathGas")) {
                        let bathGas: string = pTPairArray[bathGasIndex];
                        pTPair.setBathGas(new BathGas(new Map(), bathGas));
                    }
                    console.log("pTPair=" + pTPair);
                    let pTPairDiv: HTMLDivElement = createFlexDiv(level2);
                    addP(pTPairDiv, pTPair);
                    addT(pTPairDiv, pTPair);
                    addAnyUnits(undefined, pTPairAttributes, pTPairDiv, PTpair.tagName, PTpair.tagName, boundary1);
                    addExcessReactantConc(pTPairDiv, pTPair);
                    addPercentExcessReactantConc(pTPairDiv, pTPair);
                    addPrecision(pTPairDiv, pTPair);
                    addBathGas(pTPairDiv, pTPair);
                    console.log(addButton);  // Check the value of addButton
                    console.log(pTsDiv);  // Check the value of pTsDiv
                    pTsDiv.insertBefore(pTPairDiv, addButton);
                    pTs.addPTpair(pTPair);
                }
                //pTs.addPTpairs(pTPairs);
                pTsDiv.removeChild(inputDiv);
            }
        });
    });

    let xml_PTss: HTMLCollectionOf<Element> = xml_conditions.getElementsByTagName(PTs.tagName);
    if (xml_PTss.length > 0) {
        if (xml_PTss.length > 1) {
            throw new Error("Expecting 1 " + PTs.tagName + " but finding " + xml_PTss.length + "!");
        }
        let pTsDiv: HTMLDivElement = document.createElement("div");
        conditionsDiv.appendChild(pTsDiv);
        let attributes: Map<string, string> = getAttributes(xml_PTss[0]);
        let xml_PTPairs: HTMLCollectionOf<Element> = xml_PTss[0].getElementsByTagName(PTpair.tagName);
        if (xml_PTPairs.length == 0) {
            throw new Error("Expecting 1 or more " + PTpair.tagName + " but finding 0!");
        } else {
            let pTs: PTs = new PTs(attributes);
            for (let i = 0; i < xml_PTPairs.length; i++) {
                let pTPair = new PTpair(getAttributes(xml_PTPairs[i]));
                // Create a container div for P, T and units.
                let pTPairDiv: HTMLDivElement = createFlexDiv(level2);
                pTsDiv.appendChild(pTPairDiv);
                // Add any optional BathGas
                let xml_bathGass: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(BathGas.tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) {
                        console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    }
                    // Add a label for the BathGas.
                    let bathGasLabel: HTMLLabelElement = document.createElement('label');
                    bathGasLabel.textContent = BathGas.tagName + ": ";
                    pTPairDiv.appendChild(bathGasLabel);
                    let bathGasValue = getNodeValue(getFirstChildNode(xml_bathGass[0]));
                    let bathGas: BathGas = new BathGas(getAttributes(xml_bathGass[0]), bathGasValue);
                    pTPair.setBathGas(bathGas);
                    pTPairDiv.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas));
                }
                // Add any optional ExperimentRate
                let xml_experimentRates: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(ExperimentRate.tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) {
                        console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    }
                    let valueString: string = getNodeValue(getFirstChildNode(xml_experimentRates[0]));
                    let experimentRate: ExperimentRate = new ExperimentRate(getAttributes(xml_experimentRates[0]), parseFloat(valueString));
                    pTPair.setExperimentRate(experimentRate);
                    // Create a new div for the ExperimentRate.
                    let id = PTpair.tagName + "_" + ExperimentRate.tagName;
                    let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level0,
                        (event: Event) => {
                            let target = event.target as HTMLInputElement;
                            setNumberNode(experimentRate, target);
                        }, experimentRate.value.toExponential(), ExperimentRate.tagName);
                    pTPairDiv.appendChild(inputDiv);
                }
                addP(pTPairDiv, pTPair);
                addT(pTPairDiv, pTPair);
                addAnyUnits(undefined, getAttributes(xml_PTPairs[i]), pTPairDiv, PTpair.tagName, PTpair.tagName, boundary1);
                addExcessReactantConc(pTPairDiv, pTPair);
                addPercentExcessReactantConc(pTPairDiv, pTPair);
                addPrecision(pTPairDiv, pTPair);
                addBathGas(pTPairDiv, pTPair);

                pTs.addPTpair(pTPair);
                // Add the pTPairDiv to the pTsDiv.
                pTsDiv.appendChild(pTPairDiv);
            }
            conditions.setPTs(pTs);
        }
    }
    return conditionsDiv;
}

/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */
function addP(containerDiv: HTMLDivElement, pTPair: PTpair): void {
    let pInputDiv: HTMLDivElement = createLabelWithInput("number", PTpair.tagName + "_" + "P",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            if (isNumeric(target.value)) {
                pTPair.setP(parseFloat(target.value));
                console.log("Set P to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = pTPair.getP().toExponential();
            }
            resizeInputElement(target);
        }, pTPair.getP().toExponential(), "P");
    let pInputElement: HTMLInputElement = pInputDiv.querySelector('input') as HTMLInputElement;
    pInputElement.value = pTPair.getP().toExponential();
    resizeInputElement(pInputElement);
    containerDiv.appendChild(pInputDiv);
}

/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */
function addT(containerDiv: HTMLDivElement, pTPair: PTpair): void {
    let tInputDiv: HTMLDivElement = createLabelWithInput("number", PTpair.tagName + "_" + "T",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            if (isNumeric(target.value)) {
                pTPair.setT(parseFloat(target.value));
                console.log("Set T to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = pTPair.getT().toExponential();
            }
            resizeInputElement(target);
        }, pTPair.getT().toExponential(), "T");
    let tInputElement: HTMLInputElement = tInputDiv.querySelector('input') as HTMLInputElement;
    tInputElement.value = pTPair.getT().toExponential();
    resizeInputElement(tInputElement);
    containerDiv.appendChild(tInputDiv);
}

/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addExcessReactantConc(pTPairDiv: HTMLDivElement, pTPair: PTpair): void {
    let button: HTMLButtonElement = createButton(addString + " " + ExcessReactantConc.tagName, boundary1);
    pTPairDiv.append(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener('click', () => {
        let excessReactantConcLabel: HTMLLabelElement = document.createElement('label');
        excessReactantConcLabel.textContent = "excessReactantConc: ";
        pTPairDiv.appendChild(excessReactantConcLabel);
        let excessReactantConcInput: HTMLInputElement = createInput("number", PTpair.tagName + "_" + ExcessReactantConc.tagName, boundary1) as HTMLInputElement;
        excessReactantConcInput.value = NaN.toString();
        excessReactantConcInput.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            pTPair.setExcessReactantConc(target.value);
            console.log("Set excessReactantConc to " + target.value);
            resizeInputElement(target);
        });
        resizeInputElement(excessReactantConcInput);
        pTPairDiv.appendChild(excessReactantConcInput);
        // Add a remove button.
        let removeButton: HTMLButtonElement = createButton(removeSymbol, boundary1);
        removeButton.addEventListener('click', () => {
            pTPairDiv.removeChild(excessReactantConcLabel);
            pTPairDiv.removeChild(excessReactantConcInput);
            pTPairDiv.removeChild(removeButton);
            addExcessReactantConc(pTPairDiv, pTPair)
        });
        pTPairDiv.appendChild(removeButton);
        // Remove the add button.
        pTPairDiv.removeChild(button);
    });
}

/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addPercentExcessReactantConc(pTPairDiv: HTMLDivElement, pTPair: PTpair): void {
    let button: HTMLButtonElement = createButton(addString + " percentExcessReactantConc", boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener('click', () => {
        let percentExcessReactantConcLabel: HTMLLabelElement = document.createElement('label');
        percentExcessReactantConcLabel.textContent = "percentExcessReactantConc: ";
        pTPairDiv.appendChild(percentExcessReactantConcLabel);
        let percentExcessReactantConcInput: HTMLInputElement = createInput("number", PTpair.tagName + "_" + "percentExcessReactantConc", boundary1) as HTMLInputElement;
        percentExcessReactantConcInput.value = NaN.toString();
        percentExcessReactantConcInput.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            pTPair.setPercentExcessReactantConc(target.value);
            console.log("Set percentExcessReactantConc to " + target.value);
            resizeInputElement(target);
        });
        resizeInputElement(percentExcessReactantConcInput);
        pTPairDiv.appendChild(percentExcessReactantConcInput);
    });
}

/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addPrecision(pTPairDiv: HTMLDivElement, pTPair: PTpair): void {
    let button: HTMLButtonElement = createButton(addString + " " + "precision", boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener('click', () => {
        let precisionLabel: HTMLLabelElement = document.createElement('label');
        precisionLabel.textContent = "Precision: ";
        pTPairDiv.appendChild(precisionLabel);
        let precisionInput: HTMLInputElement = createInput("number", PTpair.tagName + "_" + "precision", boundary1) as HTMLInputElement;
        precisionInput.value = NaN.toString();
        precisionInput.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            pTPair.setPrecision(target.value);
            console.log("Set Precision to " + target.value);
            resizeInputElement(target);
        });
        resizeInputElement(precisionInput);
        pTPairDiv.appendChild(precisionInput);
    });
}

/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addBathGas(pTPairDiv: HTMLDivElement, pTPair: PTpair): void {
    let button: HTMLButtonElement = createButton(addString + " " + BathGas.tagName, boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener('click', () => {
        let bathGasDiv: HTMLDivElement = document.createElement("div");
        let bathGas: BathGas = new BathGas(new Map(), "");
        pTPair.setBathGas(bathGas);
        let bathGasLabel: HTMLLabelElement = document.createElement('label');
        bathGasLabel.textContent = BathGas.tagName + ": ";
        bathGasDiv.appendChild(bathGasLabel);
        pTPairDiv.insertBefore(bathGasDiv, button);
        // Create a HTMLSelectInput for the BathGas.
        let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas);
        // Set the initial value.
        select.value = bathGas.value;
        // Add event listener to selectElement.
        select.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            bathGas.value = target.value;
            console.log("Added " + target.value + " as a " + BathGas.tagName);
            resizeSelectElement(target);
        });
        bathGasDiv.appendChild(select);
        pTPairDiv.insertBefore(bathGasDiv, button);
        pTPairDiv.removeChild(button);
    });
}

/**
 * @param options The options.
 * @param bathGas The bath gas.
 */
function createSelectElementBathGas(options: string[], bathGas: BathGas): HTMLSelectElement {
    let select: HTMLSelectElement = createSelectElement(options, BathGas.tagName, bathGas.value,
        PTs.tagName + "_" + BathGas.tagName, boundary1);
    // Set the initial value.
    select.value = bathGas.value;
    // Add event listener to selectElement.
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as a " + BathGas.tagName);
        resizeSelectElement(target);
    });
    return select;
}

/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */
function addExperimentRateButton(pTPairDiv: HTMLDivElement, pTPair: PTpair): void {
    let button: HTMLButtonElement = createButton(addString + " " + ExperimentRate.tagName, boundary1);
    //let addExperimentRateDiv: HTMLDivElement = document.createElement("div");
    //addExperimentRateDiv.appendChild(addExperimentRateButton);
    // Add event listener to the addExperimentRateButton.
    button.addEventListener('click', () => {
        let experimentRateDiv: HTMLDivElement = document.createElement("div");
        experimentRateDiv.style.marginLeft = margin5;
        let experimentRate: ExperimentRate = new ExperimentRate(new Map(), NaN);
        pTPair.setExperimentRate(experimentRate);
        // Create a new div element for the input.
        let id = PTpair.tagName + "_" + ExperimentRate.tagName;
        let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                setNumberNode(experimentRate, target);
                resizeInputElement(target);
            }, "", ExperimentRate.tagName);
        experimentRateDiv.appendChild(inputDiv);
        pTPairDiv.insertBefore(experimentRateDiv, button);
        pTPairDiv.removeChild(button);
    });
    /*
    pTsDiv.appendChild(button);
    pTPairDiv.appendChild(button);
    // Add the pTPairDiv to the pTsDiv.
    pTsDiv.insertBefore(pTPairDiv, addButton);
    */
}

/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function processModelParameters(xml: XMLDocument): HTMLDivElement {
    console.log(ModelParameters.tagName);
    let modelParametersDiv: HTMLDivElement = createDiv(boundary1);
    let xml_modelParameters: Element = getSingularElement(xml, ModelParameters.tagName);
    let modelParameters: ModelParameters = new ModelParameters(getAttributes(xml_modelParameters));
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
function processGrainSize(modelParameters: ModelParameters, xml_modelParameters: Element, modelParametersDiv: HTMLDivElement) {
    let div: HTMLDivElement = createFlexDiv(level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = GrainSize.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(tagName);
    let button = createButton(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
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
        createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        gs = new GrainSize(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!modelParameters.index.has(GrainSize.tagName)) {
            createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            document.getElementById(id)?.remove();
            document.getElementById(ids)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createGrainSizeInput(modelParameters: ModelParameters, div: HTMLDivElement, gs: GrainSize,
    id: string, ids: string, valueString: string): void {
    modelParameters.setGrainSize(gs);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(gs, event.target);
            resizeInputElement(event.target);
        }
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
    addAnyUnits(ZPE.units, gs.attributes, div, ids, GrainSize.tagName, boundary1);
}

/**
 * Process "me:automaticallySetMaxEne".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processAutomaticallySetMaxEneModelParameters(modelParameters: ModelParameters, xml_modelParameters: Element,
    modelParametersDiv: HTMLDivElement): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = AutomaticallySetMaxEne.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(tagName);
    let button = createButton(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(button);
    let id = ModelParameters.tagName + "_" + tagName + "_input";
    let ids = ModelParameters.tagName + "_" + tagName + "_select";
    let asme: AutomaticallySetMaxEne;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        asme = new AutomaticallySetMaxEne(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        asme = new AutomaticallySetMaxEne(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the AutomaticallySetMaxEne already exists
        if (!modelParameters.index.has(AutomaticallySetMaxEne.tagName)) {
            createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = asme.value.toExponential();
            modelParameters.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createAutomaticallySetMaxEneInputModelParameters(modelParameters: ModelParameters, div: HTMLDivElement, asme: AutomaticallySetMaxEne,
    id: string, ids: string, valueString: string) {
    modelParameters.setAutomaticallySetMaxEne(asme);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(asme, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
    addAnyUnits(ZPE.units, asme.attributes, div, ids, AutomaticallySetMaxEne.tagName, boundary1);
}

/**
 * Process "me:energyAboveTheTopHill".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processEnergyAboveTheTopHill(modelParameters: ModelParameters, xml_modelParameters: Element, modelParametersDiv: HTMLDivElement): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = EnergyAboveTheTopHill.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(tagName);
    let button = createButton(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(button);
    let id = ModelParameters.tagName + "_" + tagName + "_input";
    let ids = ModelParameters.tagName + "_" + tagName + "_select";
    let eatth: EnergyAboveTheTopHill;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        eatth = new EnergyAboveTheTopHill(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        eatth = new EnergyAboveTheTopHill(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the EnergyAboveTheTopHill already exists
        if (!modelParameters.index.has(EnergyAboveTheTopHill.tagName)) {
            createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = eatth.value.toExponential();
            modelParameters.removeEnergyAboveTheTopHill();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createEnergyAboveTheTopHillInput(modelParameters: ModelParameters, div: HTMLDivElement, eatth: EnergyAboveTheTopHill,
    id: string, ids: string, valueString: string): void {
    modelParameters.setEnergyAboveTheTopHill(eatth);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(eatth, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
    addAnyUnits(ZPE.units, eatth.attributes, div, ids, EnergyAboveTheTopHill.tagName, boundary1);
}

/**
 * Process "me:maxTemperature".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */
function processMaxTemperature(modelParameters: ModelParameters, xml_modelParameters: Element, modelParametersDiv: HTMLDivElement): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    modelParametersDiv.appendChild(div);
    let tagName: string = MaxTemperature.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(tagName);
    let button = createButton(tagName, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(button);
    let id = ModelParameters.tagName + "_" + tagName + "_input";
    let ids = ModelParameters.tagName + "_" + tagName + "_select";
    let mt: MaxTemperature;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        mt = new MaxTemperature(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        mt = new MaxTemperature(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the MaxTemperature already exists
        if (!modelParameters.index.has(MaxTemperature.tagName)) {
            createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = mt.value.toExponential();
            modelParameters.removeMaxTemperature();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createMaxTemperatureInput(modelParameters: ModelParameters, div: HTMLDivElement, mt: MaxTemperature, id: string,
    ids: string, valueString: string): void {
    modelParameters.setMaxTemperature(mt);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(mt, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
    addAnyUnits(undefined, mt.attributes, div, ids, MaxTemperature.tagName, boundary1);
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
    // Create div to contain the controls.
    let controlsDiv: HTMLDivElement = createDiv(boundary1);
    // Get the XML "me:control" element.
    let xml_control: Element = getSingularElement(xml, Control.tagName);
    let control: Control = new Control(getAttributes(xml_control));
    mesmer.setControl(control);
    // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
    let onOffControls: Map<string, HTMLButtonElement> = new Map();
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
    let onOffControlsDiv: HTMLDivElement = createFlexDiv(level1);
    let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
    orderedOnOffControls.forEach((button: HTMLButtonElement) => {
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
function processCalculateRateCoefficientsOnly(control: Control, onOffControls: Map<string, HTMLButtonElement>,
    xml_control: Element): void {
    let tagName: string = CalculateRateCoefficientsOnly.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let crco: CalculateRateCoefficientsOnly = new CalculateRateCoefficientsOnly();
    if (xml.length == 1) {
        control.setCalculateRateCoefficientsOnly(crco);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the CalculateRateCoefficientsOnly already exists
        if (!control.index.has(CalculateRateCoefficientsOnly.tagName)) {
            control.setCalculateRateCoefficientsOnly(crco);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeCalculateRateCoefficientsOnly();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintCellDOS(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintCellDOS.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pcd: PrintCellDOS = new PrintCellDOS();
    if (xml.length == 1) {
        control.setPrintCellDOS(pcd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintCellDOS already exists
        if (!control.index.has(PrintCellDOS.tagName)) {
            control.setPrintCellDOS(pcd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintCellDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintCellTransitionStateFlux(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintCellTransitionStateFlux.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pctsf: PrintCellTransitionStateFlux = new PrintCellTransitionStateFlux();
    if (xml.length == 1) {
        control.setPrintCellTransitionStateFlux(pctsf);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintCellTransitionStateFlux already exists
        if (!control.index.has(PrintCellTransitionStateFlux.tagName)) {
            control.setPrintCellTransitionStateFlux(pctsf);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintCellTransitionStateFlux();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintReactionOperatorColumnSums(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintReactionOperatorColumnSums.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let proc: PrintReactionOperatorColumnSums = new PrintReactionOperatorColumnSums();
    if (xml.length == 1) {
        control.setPrintReactionOperatorColumnSums(proc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintReactionOperatorColumnSums already exists
        if (!control.index.has(PrintReactionOperatorColumnSums.tagName)) {
            control.setPrintReactionOperatorColumnSums(proc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintReactionOperatorColumnSums();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintGrainBoltzmann(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintGrainBoltzmann.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgb: PrintGrainBoltzmann = new PrintGrainBoltzmann();
    if (xml.length == 1) {
        control.setPrintGrainBoltzmann(pgb);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintGrainBoltzmann already exists
        if (!control.index.has(PrintGrainBoltzmann.tagName)) {
            control.setPrintGrainBoltzmann(pgb);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintGrainBoltzmann();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintGrainDOS(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintGrainDOS.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgd: PrintGrainDOS = new PrintGrainDOS();
    if (xml.length == 1) {
        control.setPrintGrainDOS(pgd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintGrainDOS already exists
        if (!control.index.has(PrintGrainDOS.tagName)) {
            control.setPrintGrainDOS(pgd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintGrainDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintGrainkbE(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintGrainkbE.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgkbE: PrintGrainkbE = new PrintGrainkbE();
    if (xml.length == 1) {
        control.setPrintGrainkbE(pgkbE);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintGrainkbE already exists
        if (!control.index.has(PrintGrainkbE.tagName)) {
            control.setPrintGrainkbE(pgkbE);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintGrainkbE();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintGrainkfE(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintGrainkfE.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgkfE: PrintGrainkfE = new PrintGrainkfE();
    if (xml.length == 1) {
        control.setPrintGrainkfE(pgkfE);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintGrainkfE already exists
        if (!control.index.has(PrintGrainkfE.tagName)) {
            control.setPrintGrainkfE(pgkfE);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintGrainkfE();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintTSsos(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintTSsos.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pts: PrintTSsos = new PrintTSsos();
    if (xml.length == 1) {
        control.setPrintTSsos(pts);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintTSsos already exists
        if (!control.index.has(PrintTSsos.tagName)) {
            control.setPrintTSsos(pts);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintTSsos();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintGrainedSpeciesProfile(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintGrainedSpeciesProfile.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgsp: PrintGrainedSpeciesProfile = new PrintGrainedSpeciesProfile();
    if (xml.length == 1) {
        control.setPrintGrainedSpeciesProfile(pgsp);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintGrainedSpeciesProfile already exists
        if (!control.index.has(PrintGrainedSpeciesProfile.tagName)) {
            control.setPrintGrainedSpeciesProfile(pgsp);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintGrainedSpeciesProfile();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintGrainTransitionStateFlux(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintGrainTransitionStateFlux.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pgtsf: PrintGrainTransitionStateFlux = new PrintGrainTransitionStateFlux();
    if (xml.length == 1) {
        control.setPrintGrainTransitionStateFlux(pgtsf);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintGrainTransitionStateFlux already exists
        if (!control.index.has(PrintGrainTransitionStateFlux.tagName)) {
            control.setPrintGrainTransitionStateFlux(pgtsf);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintGrainTransitionStateFlux();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintReactionOperatorSize(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintReactionOperatorSize.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pros: PrintReactionOperatorSize = new PrintReactionOperatorSize();
    if (xml.length == 1) {
        control.setPrintReactionOperatorSize(pros);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintReactionOperatorSize already exists
        if (!control.index.has(PrintReactionOperatorSize.tagName)) {
            control.setPrintReactionOperatorSize(pros);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintReactionOperatorSize();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintSpeciesProfile(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintSpeciesProfile.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let psp: PrintSpeciesProfile = new PrintSpeciesProfile();
    if (xml.length == 1) {
        control.setPrintSpeciesProfile(psp);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintSpeciesProfile already exists
        if (!control.index.has(PrintSpeciesProfile.tagName)) {
            control.setPrintSpeciesProfile(psp);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintSpeciesProfile();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintPhenomenologicalEvolution(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintPhenomenologicalEvolution.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let ppe: PrintPhenomenologicalEvolution = new PrintPhenomenologicalEvolution();
    if (xml.length == 1) {
        control.setPrintPhenomenologicalEvolution(ppe);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintPhenomenologicalEvolution already exists
        if (!control.index.has(PrintPhenomenologicalEvolution.tagName)) {
            control.setPrintPhenomenologicalEvolution(ppe);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintPhenomenologicalEvolution();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintTunnelingCoefficients(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintTunnelingCoefficients.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let ptc: PrintTunnelingCoefficients = new PrintTunnelingCoefficients();
    if (xml.length == 1) {
        control.setPrintTunnelingCoefficients(ptc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintTunnelingCoefficients already exists
        if (!control.index.has(PrintTunnelingCoefficients.tagName)) {
            control.setPrintTunnelingCoefficients(ptc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintTunnelingCoefficients();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processPrintCrossingCoefficients(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = PrintCrossingCoefficients.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let pcc: PrintCrossingCoefficients = new PrintCrossingCoefficients();
    if (xml.length == 1) {
        control.setPrintCrossingCoefficients(pcc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the PrintCrossingCoefficients already exists
        if (!control.index.has(PrintCrossingCoefficients.tagName)) {
            control.setPrintCrossingCoefficients(pcc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removePrintCrossingCoefficients();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processTestDOS(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = TestDOS.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let tdos: TestDOS = new TestDOS();
    if (xml.length == 1) {
        control.setTestDOS(tdos);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the TestDOS already exists
        if (!control.index.has(TestDOS.tagName)) {
            control.setTestDOS(tdos);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeTestDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processTestRateConstants(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = TestRateConstants.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let trc: TestRateConstants = new TestRateConstants();
    if (xml.length == 1) {
        control.setTestRateConstants(trc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the TestRateConstants already exists
        if (!control.index.has(TestRateConstants.tagName)) {
            control.setTestRateConstants(trc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeTestRateConstants();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processUseTheSameCellNumberForAllConditions(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = UseTheSameCellNumberForAllConditions.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let utsnfac: UseTheSameCellNumberForAllConditions = new UseTheSameCellNumberForAllConditions();
    if (xml.length == 1) {
        control.setUseTheSameCellNumberForAllConditions(utsnfac);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the UseTheSameCellNumberForAllConditions already exists
        if (!control.index.has(UseTheSameCellNumberForAllConditions.tagName)) {
            control.setUseTheSameCellNumberForAllConditions(utsnfac);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeUseTheSameCellNumberForAllConditions();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processForceMacroDetailedBalance(control: Control, onOffControls: Map<string, HTMLButtonElement>, xml_control: Element): void {
    let tagName: string = ForceMacroDetailedBalance.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    onOffControls.set(tagName, button);
    let fmd: ForceMacroDetailedBalance = new ForceMacroDetailedBalance();
    if (xml.length == 1) {
        control.setForceMacroDetailedBalance(fmd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the ForceMacroDetailedBalance already exists
        if (!control.index.has(ForceMacroDetailedBalance.tagName)) {
            control.setForceMacroDetailedBalance(fmd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeForceMacroDetailedBalance();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function processTestMicroRates(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = TestMicroRates.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(tagName, boundary1);
    button.id = Control.tagName + "_" + tagName;
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let idTmax = Control.tagName + "_" + tagName + "_Tmax";
    let idTmin = Control.tagName + "_" + tagName + "_Tmin";
    let idTstep = Control.tagName + "_" + tagName + "_Tstep";
    if (xml.length == 1) {
        button.textContent = buttonTextContentSelected;
        createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
        button.classList.toggle('optionOff');
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createTestMicroRates(control: Control, div: HTMLDivElement, xml_tmr: HTMLCollectionOf<Element>,
    idTmax: string, idTmin: string, idTstep: string): void {
    let attributes: Map<string, string>;
    let tmr: TestMicroRates;
    if (xml_tmr.length == 1) {
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
 * Process "me:calcMethod".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processCalcMethod(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = CalcMethod.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let divCmId = Control.tagName + "_" + tagName;
    let detailsDivId = divCmId + "_details";
    let divCm: HTMLDivElement = createFlexDiv(boundary1);
    divCm.id = divCmId;
    div.appendChild(divCm);
    let options: string[] = CalcMethod.options;
    let ids = divCmId + "_select";
    let cm: CalcMethod;
    if (xml.length > 0) {
        if (xml.length > 1) {
            throw new Error("More than one CalcMethod element.");
        }
        button.classList.toggle('optionOff');
        button.textContent = buttonTextContentSelected;
        let attributes: Map<string, string> = getAttributes(xml[0]);
        let xsi_type: string = attributes.get("xsi:type") as string;
        // Create the select element.
        let select: HTMLSelectElement = createSelectElementCalcMethod(control, div, detailsDivId, options, tagName, xsi_type, ids);
        divCm.appendChild(select);
        if (xsi_type == CalcMethodSimpleCalc.xsi_type) {
            cm = new CalcMethodSimpleCalc(attributes);
            // Set the select element to the correct value.
            select.value = xsi_type;
        } else if (xsi_type == CalcMethodGridSearch.xsi_type) {
            cm = new CalcMethodGridSearch(attributes);
            // Set the select element to the correct value.
            select.value = xsi_type;
        } else if (xsi_type == CalcMethodFitting.xsi_type) {
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
            // Set the select element to the correct value.
            select.value = xsi_type;
            // Add the details div.
            let detailsDiv: HTMLDivElement = createFlexDiv(boundary1);
            detailsDiv.id = detailsDivId;
            divCm.appendChild(detailsDiv);
            processCalcMethodFitting(detailsDiv, cmf, detailsDivId);
        } else if (xsi_type == CalcMethodMarquardt.xsi_type) {
            let cmm: CalcMethodMarquardt = new CalcMethodMarquardt(attributes);
            cm = cmm;
            // MarquardtIterations.
            let mi_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(MarquardtIterations.tagName);
            if (mi_xml.length > 0) {
                if (mi_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(mi_xml[0])));
                    let marquardtIterations: MarquardtIterations = new MarquardtIterations(getAttributes(mi_xml[0]), value);
                    cmm.setMarquardtIterations(marquardtIterations);
                } else {
                    throw new Error("More than one MarquardtIterations element.");
                }
            }
            // MarquardtTolerance.
            let mt_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(MarquardtTolerance.tagName);
            if (mt_xml.length > 0) {
                if (mt_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(mt_xml[0])));
                    let marquardtTolerance: MarquardtTolerance = new MarquardtTolerance(getAttributes(mt_xml[0]), value);
                    cmm.setMarquardtTolerance(marquardtTolerance);
                } else {
                    throw new Error("More than one MarquardtTolerance element.");
                }
            }
            // MarquardtDerivDelta.
            let mdd_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(MarquardtDerivDelta.tagName);
            if (mdd_xml.length > 0) {
                if (mdd_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(mdd_xml[0])));
                    let marquardtDerivDelta: MarquardtDerivDelta = new MarquardtDerivDelta(getAttributes(mdd_xml[0]), value);
                    cmm.setMarquardtDerivDelta(marquardtDerivDelta);
                } else {
                    throw new Error("More than one MarquardtDerivDelta element.");
                }
            }
            // Add the details div.
            let detailsDiv: HTMLDivElement = createFlexDiv(boundary1);
            detailsDiv.id = detailsDivId;
            divCm.appendChild(detailsDiv);
            processCalcMethodMarquardt(detailsDiv, cmm, detailsDivId);
        } else if (xsi_type == CalcMethodAnalyticalRepresentation.xsi_type) {
            let cmar: CalcMethodAnalyticalRepresentation = new CalcMethodAnalyticalRepresentation(attributes);
            cm = cmar;
            // Format.
            let format_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(Format.tagName);
            if (format_xml.length > 0) {
                if (format_xml.length == 1) {
                    let value: string = getNodeValue(getFirstChildNode(format_xml[0]));
                    let format: Format = new Format(getAttributes(format_xml[0]), value);
                    cmar.setFormat(format);
                } else {
                    throw new Error("More than one Format element.");
                }
            }
            // Precision.
            let precision_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(Precision.tagName);
            if (precision_xml.length > 0) {
                if (precision_xml.length == 1) {
                    let value: string = getNodeValue(getFirstChildNode(precision_xml[0]));
                    let precision: Precision = new Precision(getAttributes(precision_xml[0]), value);
                    cmar.setPrecision(precision);
                } else {
                    throw new Error("More than one Precision element.");
                }
            }
            // ChebNumTemp.
            let chebNumTemp_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebNumTemp.tagName);
            if (chebNumTemp_xml.length > 0) {
                if (chebNumTemp_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebNumTemp_xml[0])));
                    let chebNumTemp: ChebNumTemp = new ChebNumTemp(getAttributes(chebNumTemp_xml[0]), value);
                    cmar.setChebNumTemp(chebNumTemp);
                } else {
                    throw new Error("More than one ChebNumTemp element.");
                }
            }
            // ChebNumConc.
            let chebNumConc_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebNumConc.tagName);
            if (chebNumConc_xml.length > 0) {
                if (chebNumConc_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebNumConc_xml[0])));
                    let chebNumConc: ChebNumConc = new ChebNumConc(getAttributes(chebNumConc_xml[0]), value);
                    cmar.setChebNumConc(chebNumConc);
                } else {
                    throw new Error("More than one ChebNumConc element.");
                }
            }
            // ChebMaxTemp.
            let chebMaxTemp_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebMaxTemp.tagName);
            if (chebMaxTemp_xml.length > 0) {
                if (chebMaxTemp_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebMaxTemp_xml[0])));
                    let chebMaxTemp: ChebMaxTemp = new ChebMaxTemp(getAttributes(chebMaxTemp_xml[0]), value);
                    cmar.setChebMaxTemp(chebMaxTemp);
                } else {
                    throw new Error("More than one ChebMaxTemp element.");
                }
            }
            // ChebMinTemp.
            let chebMinTemp_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebMinTemp.tagName);
            if (chebMinTemp_xml.length > 0) {
                if (chebMinTemp_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebMinTemp_xml[0])));
                    let chebMinTemp: ChebMinTemp = new ChebMinTemp(getAttributes(chebMinTemp_xml[0]), value);
                    cmar.setChebMinTemp(chebMinTemp);
                } else {
                    throw new Error("More than one ChebMinTemp element.");
                }
            }
            // ChebMaxConc.
            let chebMaxConc_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebMaxConc.tagName);
            if (chebMaxConc_xml.length > 0) {
                if (chebMaxConc_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebMaxConc_xml[0])));
                    let chebMaxConc: ChebMaxConc = new ChebMaxConc(getAttributes(chebMaxConc_xml[0]), value);
                    cmar.setChebMaxConc(chebMaxConc);
                } else {
                    throw new Error("More than one ChebMaxConc element.");
                }
            }
            // ChebMinConc.
            let chebMinConc_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebMinConc.tagName);
            if (chebMinConc_xml.length > 0) {
                if (chebMinConc_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebMinConc_xml[0])));
                    let chebMinConc: ChebMinConc = new ChebMinConc(getAttributes(chebMinConc_xml[0]), value);
                    cmar.setChebMinConc(chebMinConc);
                } else {
                    throw new Error("More than one ChebMinConc element.");
                }
            }
            // ChebTExSize.
            let chebTExSize_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebTExSize.tagName);
            if (chebTExSize_xml.length > 0) {
                if (chebTExSize_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebTExSize_xml[0])));
                    let chebTExSize: ChebTExSize = new ChebTExSize(getAttributes(chebTExSize_xml[0]), value);
                    cmar.setChebTExSize(chebTExSize);
                } else {
                    throw new Error("More than one ChebTExSize element.");
                }
            }
            // ChebPExSize.
            let chebPExSize_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(ChebPExSize.tagName);
            if (chebPExSize_xml.length > 0) {
                if (chebPExSize_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(chebPExSize_xml[0])));
                    let chebPExSize: ChebPExSize = new ChebPExSize(getAttributes(chebPExSize_xml[0]), value);
                    cmar.setChebPExSize(chebPExSize);
                } else {
                    throw new Error("More than one ChebPExSize element.");
                }
            }
        } else if (xsi_type == CalcMethodThermodynamicTable.xsi_type) {
            let cmtt: CalcMethodThermodynamicTable = new CalcMethodThermodynamicTable(attributes);
            cm = cmtt;
            // Tmin.
            let tmin_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(Tmin.tagName);
            if (tmin_xml.length > 0) {
                if (tmin_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(tmin_xml[0])));
                    let tmin: Tmin = new Tmin(getAttributes(tmin_xml[0]), value);
                    cmtt.setTmin(tmin);
                } else {
                    throw new Error("More than one Tmin element.");
                }
            }
            // Tmid.
            let tmid_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(Tmid.tagName);
            if (tmid_xml.length > 0) {
                if (tmid_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(tmid_xml[0])));
                    let tmid: Tmid = new Tmid(getAttributes(tmid_xml[0]), value);
                    cmtt.setTmid(tmid);
                } else {
                    throw new Error("More than one Tmid element.");
                }
            }
            // Tmax.
            let tmax_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(Tmax.tagName);
            if (tmax_xml.length > 0) {
                if (tmax_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(tmax_xml[0])));
                    let tmax: Tmax = new Tmax(getAttributes(tmax_xml[0]), value);
                    cmtt.setTmax(tmax);
                } else {
                    throw new Error("More than one Tmax element.");
                }
            }
            // Tstep.
            let tstep_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(Tstep.tagName);
            if (tstep_xml.length > 0) {
                if (tstep_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(tstep_xml[0])));
                    let tstep: Tstep = new Tstep(getAttributes(tstep_xml[0]), value);
                    cmtt.setTstep(tstep);
                } else {
                    throw new Error("More than one Tstep element.");
                }
            }
        } else if (xsi_type == CalcMethodSensitivityAnalysis.xsi_type) {
            let cmsa: CalcMethodSensitivityAnalysis = new CalcMethodSensitivityAnalysis(attributes);
            cm = cmsa;
            // SensitivityAnalysisSamples.
            let sas_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(SensitivityAnalysisSamples.tagName);
            if (sas_xml.length > 0) {
                if (sas_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(sas_xml[0])));
                    let sensitivityAnalysisSamples: SensitivityAnalysisSamples = new SensitivityAnalysisSamples(getAttributes(sas_xml[0]), value);
                    cmsa.setSensitivityAnalysisSamples(sensitivityAnalysisSamples);
                } else {
                    throw new Error("More than one SensitivityAnalysisSamples element.");
                }
            }
            // SensitivityAnalysisOrder.
            let sao_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(SensitivityAnalysisOrder.tagName);
            if (sao_xml.length > 0) {
                if (sao_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(sao_xml[0])));
                    let sensitivityAnalysisOrder: SensitivityAnalysisOrder = new SensitivityAnalysisOrder(getAttributes(sao_xml[0]), value);
                    cmsa.setSensitivityAnalysisOrder(sensitivityAnalysisOrder);
                } else {
                    throw new Error("More than one SensitivityAnalysisOrder element.");
                }
            }
            // SensitivityNumVarRedIters.
            let snvri_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(SensitivityNumVarRedIters.tagName);
            if (snvri_xml.length > 0) {
                if (snvri_xml.length == 1) {
                    let value: number = parseFloat(getNodeValue(getFirstChildNode(snvri_xml[0])));
                    let sensitivityNumVarRedIters: SensitivityNumVarRedIters = new SensitivityNumVarRedIters(getAttributes(snvri_xml[0]), value);
                    cmsa.setSensitivityNumVarRedIters(sensitivityNumVarRedIters);
                } else {
                    throw new Error("More than one SensitivityNumVarRedIters element.");
                }
            }
            // SensitivityVarRedMethod.
            let svrm_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(SensitivityVarRedMethod.tagName);
            if (svrm_xml.length > 0) {
                if (svrm_xml.length == 1) {
                    let value: string = getNodeValue(getFirstChildNode(svrm_xml[0]));
                    let sensitivityVarRedMethod: SensitivityVarRedMethod = new SensitivityVarRedMethod(getAttributes(svrm_xml[0]), value);
                    cmsa.setSensitivityVarRedMethod(sensitivityVarRedMethod);
                }
            }
        } else {
            throw new Error("Unknown xsi:type: " + xsi_type);
        }
        control.setCalcMethod(cm);
        // The select element should have 

    } else {
        button.classList.toggle('optionOn');
        button.textContent = buttonTextContentDeselected;
    }
    let first: boolean = true;
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                options.push(selectAnotherOption);
            }
            // Remove any existing select.
            document.getElementById(ids)?.remove();
            document.getElementById(detailsDivId)?.remove();
            // Create the select element.
            let select: HTMLSelectElement = createSelectElementCalcMethod(control, div, detailsDivId, options, tagName, selectAnotherOption, ids);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            control.removeCalcMethod();
            // Remove any existing div.
            document.getElementById(ids)?.remove();
            document.getElementById(detailsDivId)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
            button.classList.toggle('optionOff');
        }
    });
}

/**
 * @param detailsDiv The details div.
 * @param cm The CalcMethodFitting.
 * @param detailsDivId The details div id.
 */
function processCalcMethodFitting(detailsDiv: HTMLDivElement, cm: CalcMethodFitting, detailsDivId: string) {
    // FittingIterations.
    let fittingIterations: MarquardtIterations = cm.getFittingIterations() || new FittingIterations(new Map(), NaN);
    cm.setFittingIterations(fittingIterations);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_FittingIterations_input", boundary1, level0,
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
 * @param detailsDiv The details div.
 * @param cm The CalcMethodMarquardt.
 * @param detailsDivId The details div id.
 */
function processCalcMethodMarquardt(detailsDiv: HTMLDivElement, cm: CalcMethodMarquardt, detailsDivId: string) {
    // MarquardtIterations.
    let marquardtIterations: MarquardtIterations = cm.getMarquardtIterations() || new MarquardtIterations(new Map(), NaN);
    cm.setMarquardtIterations(marquardtIterations);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_MarquardtIterations_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                marquardtIterations.value = parseInt(target.value);
                console.log("Set MarquardtIterations to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = marquardtIterations.value.toString();
            }
            resizeInputElement(target);
        }, marquardtIterations.value.toString(), MarquardtIterations.tagName));
    // MarquardtTolerance.
    let marquardtTolerance: MarquardtTolerance = cm.getMarquardtTolerance() || new MarquardtTolerance(new Map(), NaN);
    cm.setMarquardtTolerance(marquardtTolerance);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_MarquardtTolerance_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                marquardtTolerance.value = parseFloat(target.value);
                console.log("Set MarquardtTolerance to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = marquardtTolerance.value.toString();
            }
            resizeInputElement(target);
        }, marquardtTolerance.value.toString(), MarquardtTolerance.tagName));
    // MarquardtDerivDelta.
    let marquardtDerivDelta: MarquardtDerivDelta = cm.getMarquardtDerivDelta() || new MarquardtDerivDelta(new Map(), NaN);
    cm.setMarquardtDerivDelta(marquardtDerivDelta);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_MarquardtDerivDelta_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                marquardtDerivDelta.value = parseFloat(target.value);
                console.log("Set MarquardtDerivDelta to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = marquardtDerivDelta.value.toString();
            }
            resizeInputElement(target);
        }, marquardtDerivDelta.value.toString(), MarquardtDerivDelta.tagName));
}

/**
 * @param detailsDiv The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 * @param detailsDivId The details div id.
 */
function processCalcMethodAnalyticalRepresentation(detailsDiv: HTMLDivElement, cm: CalcMethodAnalyticalRepresentation, detailsDivId: string) {
    // "me:format".
    let format: Format = cm.getFormat() || new Format(new Map(), Format.options[0]);
    // Format value.
    cm.setFormat(format);
    let lwsFormat: HTMLDivElement = createLabelWithSelect(Format.tagName, Format.options, Format.tagName, format.value,
        detailsDivId + Format.tagName + "_select", boundary1, boundary1);
    lwsFormat.querySelector('select')?.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        format.value = target.value;
        console.log("Set Format to " + target.value);
        resizeSelectElement(target);
    });
    detailsDiv.appendChild(lwsFormat);
    // Format rateUnits.
    let value = Format.rateUnitsOptions[0];
    format.setRateUnits(value);
    let lwsFormatRateUnits: HTMLDivElement = createLabelWithSelect(Format.rateUnits, Format.rateUnitsOptions, Format.rateUnits,
        value, detailsDivId + Format.rateUnits + "_select", boundary1, boundary1);
    lwsFormatRateUnits.querySelector('select')?.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        format.setRateUnits(target.value);
        console.log("Set Format rateUnits to " + target.value);
        resizeSelectElement(target);
    });
    detailsDiv.appendChild(lwsFormatRateUnits);
    // "me:precision".
    let precision: Precision = cm.getPrecision() || new Precision(new Map(), Precision.options[0]);
    cm.setPrecision(precision);
    let lwsPrecision: HTMLDivElement = createLabelWithSelect(Precision.tagName, Precision.options, Precision.tagName, precision.value,
        detailsDivId + Precision.tagName + "_select", boundary1, boundary1);
    lwsPrecision.querySelector('select')?.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        precision.value = target.value;
        console.log("Set Precision to " + target.value);
        resizeSelectElement(target);
    });
    detailsDiv.appendChild(lwsPrecision);
    // "me:chebNumTemp".
    let chebNumTemp: ChebNumTemp = cm.getChebNumTemp() || new ChebNumTemp(new Map(), NaN);
    cm.setChebNumTemp(chebNumTemp);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebNumTemp_input", boundary1, level0,
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
    // "me:chebNumConc".
    let chebNumConc: ChebNumConc = cm.getChebNumConc() || new ChebNumConc(new Map(), NaN);
    cm.setChebNumConc(chebNumConc);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebNumConc_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebNumConc.value = parseFloat(target.value);
                console.log("Set ChebNumConc to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebNumConc.value.toString(), ChebNumConc.tagName));
    // "me:chebMaxTemp".
    let chebMaxTemp: ChebMaxTemp = cm.getChebMaxTemp() || new ChebMaxTemp(new Map(), NaN);
    cm.setChebMaxTemp(chebMaxTemp);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebMaxTemp_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebMaxTemp.value = parseFloat(target.value);
                console.log("Set ChebMaxTemp to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebMaxTemp.value.toString(), ChebMaxTemp.tagName));
    // "me:chebMinTemp".
    let chebMinTemp: ChebMinTemp = cm.getChebMinTemp() || new ChebMinTemp(new Map(), NaN);
    cm.setChebMinTemp(chebMinTemp);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebMinTemp_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebMinTemp.value = parseFloat(target.value);
                console.log("Set ChebMinTemp to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebMinTemp.value.toString(), ChebMinTemp.tagName));
    // "me:chebMaxConc".
    let chebMaxConc: ChebMaxConc = cm.getChebMaxConc() || new ChebMaxConc(new Map(), NaN);
    cm.setChebMaxConc(chebMaxConc);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebMaxConc_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebMaxConc.value = parseFloat(target.value);
                console.log("Set ChebMaxConc to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebMaxConc.value.toString(), ChebMaxConc.tagName));
    // "me:chebMinConc".
    let chebMinConc: ChebMinConc = cm.getChebMinConc() || new ChebMinConc(new Map(), NaN);
    cm.setChebMinConc(chebMinConc);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebMinConc_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebMinConc.value = parseFloat(target.value);
                console.log("Set ChebMinConc to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebMinConc.value.toString(), ChebMinConc.tagName));
    // "me:chebTExSize".
    let chebTExSize: ChebTExSize = cm.getChebTExSize() || new ChebTExSize(new Map(), NaN);
    cm.setChebTExSize(chebTExSize);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebTExSize_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebTExSize.value = parseFloat(target.value);
                console.log("Set ChebTExSize to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebTExSize.value.toString(), ChebTExSize.tagName));
    // "me:chebPExSize".
    let chebPExSize: ChebPExSize = cm.getChebPExSize() || new ChebPExSize(new Map(), NaN);
    cm.setChebPExSize(chebPExSize);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_ChebPExSize_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                chebPExSize.value = parseFloat(target.value);
                console.log("Set ChebPExSize to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, chebPExSize.value.toString(), ChebPExSize.tagName));
}

/**
 * @param detailsDiv The details div.
 * @param cm The CalcMethodThermodynamicTable.
 * @param detailsDivId The details div id.
 */
function processCalcMethodThermodynamicTable(detailsDiv: HTMLDivElement, cm: CalcMethodThermodynamicTable, detailsDivId: string) {
    // "me:Tmin".
    let tmin: Tmin = cm.getTmin() || new Tmin(new Map(), NaN);
    cm.setTmin(tmin);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_Tmin_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmin.value = parseFloat(target.value);
                console.log("Set Tmin to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, tmin.value.toString(), Tmin.tagName));
    // "me:Tmid".
    let tmid: Tmid = cm.getTmid() || new Tmid(new Map(), NaN);
    cm.setTmid(tmid);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_Tmid_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmid.value = parseFloat(target.value);
                console.log("Set Tmid to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, tmid.value.toString(), Tmid.tagName));
    // "me:Tmax".
    let tmax: Tmax = cm.getTmax() || new Tmax(new Map(), NaN);
    cm.setTmax(tmax);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_Tmax_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmax.value = parseFloat(target.value);
                console.log("Set Tmax to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, tmax.value.toString(), Tmax.tagName));
    // "me:Tstep".
    let tstep: Tstep = cm.getTstep() || new Tstep(new Map(), NaN);
    cm.setTstep(tstep);
    detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_Tstep_input", boundary1, level0,
        (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tstep.value = parseFloat(target.value);
                console.log("Set Tstep to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            resizeInputElement(target);
        }, tstep.value.toString(), Tstep.tagName));
}
/**
 * 
 * @param control 
 * @param div 
 * @param detailsDivId 
 * @param options 
 * @param tagName 
 * @param value 
 * @param ids 
 * @returns 
 */
function createSelectElementCalcMethod(control: Control, div: HTMLDivElement, detailsDivId: string, options: string[],
    tagName: string, value: string, ids: string): HTMLSelectElement {
    let select: HTMLSelectElement = createSelectElement(options, tagName, value, ids, boundary1);
    div.appendChild(select);
    select.addEventListener('click', (event: MouseEvent) => {
        if (options[options.length - 1] == selectAnotherOption) {
            options.pop();
        }
        let lastIndex: number = select.options.length - 1;
        if (select.options[lastIndex].value == selectAnotherOption) {
            select.remove(lastIndex);
        }
    });
    select.addEventListener('change', (event: Event) => {
        // Remove any existing div.
        let detailsDiv: HTMLDivElement = document.getElementById(detailsDivId) as HTMLDivElement;
        if (detailsDiv != null) {
            detailsDiv.remove();
        }
        detailsDiv = createFlexDiv(boundary1);
        detailsDiv.id = detailsDivId;
        div.appendChild(detailsDiv);
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
            processCalcMethodFitting(detailsDiv, cm, detailsDivId);
        } else if (value == CalcMethodMarquardt.xsi_type || value == CalcMethodMarquardt.xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm: CalcMethodMarquardt = new CalcMethodMarquardt(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(detailsDiv, cm, detailsDivId);
        } else if (value == CalcMethodAnalyticalRepresentation.xsi_type || value == CalcMethodAnalyticalRepresentation.xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm: CalcMethodAnalyticalRepresentation = new CalcMethodAnalyticalRepresentation(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(detailsDiv, cm, detailsDivId);
        } else if (value == CalcMethodThermodynamicTable.xsi_type || value == CalcMethodThermodynamicTable.xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm: CalcMethodThermodynamicTable = new CalcMethodThermodynamicTable(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(detailsDiv, cm, detailsDivId);

        } else if (value == CalcMethodSensitivityAnalysis.xsi_type || value == CalcMethodSensitivityAnalysis.xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm: CalcMethodSensitivityAnalysis = new CalcMethodSensitivityAnalysis(new Map());
            control.setCalcMethod(cm);
            // "me:sensitivityAnalysisSamples".
            detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_SensitivityAnalysisSamples_input", boundary1, level0,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    // Check the value is a number.
                    if (isNumeric(target.value)) {
                        cm.setSensitivityAnalysisSamples(new SensitivityAnalysisSamples(new Map(), parseFloat(target.value)));
                        console.log("Set SensitivityAnalysisSamples to " + target.value);
                    } else {
                        alert("Value is not numeric, resetting...");
                        target.value = NaN.toString();
                    }
                    resizeInputElement(target);
                }, NaN.toString(), SensitivityAnalysisSamples.tagName));
            // "me:sensitivityAnalysisOrder".
            detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_SensitivityAnalysisOrder_input", boundary1, level0,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    // Check the value is a number.
                    if (isNumeric(target.value)) {
                        cm.setSensitivityAnalysisOrder(new SensitivityAnalysisOrder(new Map(), parseFloat(target.value)));
                        console.log("Set SensitivityAnalysisOrder to " + target.value);
                    } else {
                        alert("Value is not numeric, resetting...");
                        target.value = NaN.toString();
                    }
                    resizeInputElement(target);
                }, NaN.toString(), SensitivityAnalysisOrder.tagName));
            // "me:sensitivityNumVarRedIters".
            detailsDiv.appendChild(createLabelWithInput("number", detailsDivId + "_SensitivityNumVarRedIters_input", boundary1, level0,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    // Check the value is a number.
                    if (isNumeric(target.value)) {
                        cm.setSensitivityNumVarRedIters(new SensitivityNumVarRedIters(new Map(), parseFloat(target.value)));
                        console.log("Set SensitivityNumVarRedIters to " + target.value);
                    } else {
                        alert("Value is not numeric, resetting...");
                        target.value = NaN.toString();
                    }
                    resizeInputElement(target);
                }, NaN.toString(), SensitivityNumVarRedIters.tagName));
            // "me:sensitivityVarRedMethod".
            detailsDiv.appendChild(createLabelWithInput("text", detailsDivId + "_SensitivityVarRedMethod_input", boundary1, level0,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    cm.setSensitivityVarRedMethod(new SensitivityVarRedMethod(new Map(), target.value));
                    console.log("Set SensitivityVarRedMethod to " + target.value);
                    resizeInputElement(target);
                }, "", SensitivityVarRedMethod.tagName));
        } else {
            throw new Error("Unknown CalcMethod type.");
        }
        resizeSelectElement(target);
    });
    return select;
}
/**
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processEigenvalues(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = Eigenvalues.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = Control.tagName + "_" + tagName + "_input";
    let eigenvalues: Eigenvalues;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        eigenvalues = new Eigenvalues(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createEigenValuesInput(control, div, eigenvalues, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        eigenvalues = new Eigenvalues(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the Eigenvalues already exists
        if (!control.index.has(Eigenvalues.tagName)) {
            createEigenValuesInput(control, div, eigenvalues, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = eigenvalues.value.toExponential();
            control.removeEigenvalues();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createEigenValuesInput(control: Control, div: HTMLDivElement, eigenvalues: Eigenvalues, id: string, valueString: string): void {
    control.setEigenvalues(eigenvalues);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(eigenvalues, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * Process "me:shortestTimeOfInterest".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processShortestTimeOfInterest(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = ShortestTimeOfInterest.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = Control.tagName + "_" + tagName + "_input";
    let stoi: ShortestTimeOfInterest;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        stoi = new ShortestTimeOfInterest(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createShortestTimeOfInterest(control, div, stoi, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        stoi = new ShortestTimeOfInterest(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the ShortestTimeOfInterest already exists
        if (!control.index.has(ShortestTimeOfInterest.tagName)) {
            createShortestTimeOfInterest(control, div, stoi, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = stoi.value.toExponential();
            control.removeShortestTimeOfInterest();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createShortestTimeOfInterest(control: Control, div: HTMLDivElement, stoi: ShortestTimeOfInterest,
    id: string, valueString: string) {
    control.setShortestTimeOfInterest(stoi);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(stoi, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * Process "me:MaximumEvolutionTime".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processMaximumEvolutionTime(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = MaximumEvolutionTime.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = Control.tagName + "_" + tagName + "_input";
    let met: MaximumEvolutionTime;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        met = new MaximumEvolutionTime(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createMaximumEvolutionTimeInput(control, div, met, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        met = new MaximumEvolutionTime(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the MaximumEvolutionTime already exists
        if (!control.index.has(MaximumEvolutionTime.tagName)) {
            createMaximumEvolutionTimeInput(control, div, met, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = met.value.toExponential();
            control.removeMaximumEvolutionTime();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createMaximumEvolutionTimeInput(control: Control, div: HTMLDivElement, met: MaximumEvolutionTime,
    id: string, valueString: string) {
    control.setMaximumEvolutionTime(met);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(met, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * Process "me:automaticallySetMaxEne".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processAutomaticallySetMaxEneControl(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = AutomaticallySetMaxEne.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = Control.tagName + "_" + tagName + "_input";
    let asme: AutomaticallySetMaxEne;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        asme = new AutomaticallySetMaxEne(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        asme = new AutomaticallySetMaxEne(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the AutomaticallySetMaxEne already exists
        if (!control.index.has(AutomaticallySetMaxEne.tagName)) {
            createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = asme.value.toExponential();
            control.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createAutomaticallySetMaxEneInputControl(control: Control, div: HTMLDivElement, asme: AutomaticallySetMaxEne,
    id: string, valueString: string) {
    control.setAutomaticallySetMaxEne(asme);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(asme, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * Process me:diagramEnergyOffset.
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processDiagramEnergyOffset(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let tagName: string = DiagramEnergyOffset.tagName;
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let id = Control.tagName + "_" + tagName + "_input";
    let deo: DiagramEnergyOffset;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        deo = new DiagramEnergyOffset(getAttributes(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        deo = new DiagramEnergyOffset(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the DiagramEnergyOffset already exists
        if (!control.index.has(DiagramEnergyOffset.tagName)) {
            createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = deo.value.toExponential();
            control.removeDiagramEnergyOffset();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle('optionOn')
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
function createDiagramEnergyOffsetInput(control: Control, div: HTMLDivElement,
    deo: DiagramEnergyOffset, id: string, valueString: string) {
    control.setDiagramEnergyOffset(deo);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(deo, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
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
    console.log("saveXML");
    const pad: string = "  ";
    // Create a Blob object from the data
    let blob = new Blob([Mesmer.header, mesmer.toXML(pad, pad)],
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