"use strict";
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
/**
 * The font sizes for different levels of the GUI.
 */
let fontSize1 = "1.5em";
let fontSize2 = "1.25em";
let fontSize3 = "1.0em";
let fontSize4 = "0.75em";
/**
 * The margins for different levels of the GUI.
 */
let margin1 = "0px";
let margin2 = "25px";
let margin3 = "50px";
let margin4 = "75px";
/**
 * The margin to space out components
 */
let marginTop = "1px";
let marginBottom = "1px";
/**
 * Units for different things.
 */
let unitsEnergy = ["kJ/mol", "cm-1", "kcal/mol", "Hartree"];
let unitsRotConsts = ["cm-1", "GHz"];
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
let reactions = new Map();
/**
 * The filename of the mesmer input file loaded.
 */
let input_xml_filename;
/**
 * The load button.
 */
let loadButton;
/**
 * The save button.
 */
let saveButton;
/**
 * The XML text element.
 */
let me_title;
let molecules_title;
//let moleculesDiv: HTMLElement | null;
let reactions_title;
let reactionsDiv;
let conditions_title;
let conditions_table;
let modelParameters_title;
let modelParameters_table;
let xml_title;
let xml_text;
/**
 * Load the XML file.
 */
function loadXML() {
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
            input_xml_filename = file.name;
            if (xml_text != null) {
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
                            displayXML(contents);
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
        }
    };
    inputElement.click();
    // Add event listener to load button.
    loadButton = document.getElementById('load_button');
    if (loadButton != null) {
        //loadButton.addEventListener('click', reload);
        loadButton.addEventListener('click', loadXML);
    }
    // Ensure save button is displayed.
    saveButton = document.getElementById('saveButton');
    if (saveButton != null) {
        saveButton.style.display = 'inline';
    }
}
/**
 * Once the DOM is loaded, set up the elements.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    // Initialise elements
    xml_title = document.getElementById("xml_title");
    xml_text = document.getElementById("xml_text");
    // Set up for XML loading.
    window.loadXML = function () {
        loadXML();
        //reload();
    };
});
/**
 * Parse the XML.
 * @param {XMLDocument} xml
 */
function parse(xml) {
    // Title.
    let xml_title = xml.getElementsByTagName(mesmer_js_1.Title.tagName);
    if (xml_title.length != 1) {
        throw new Error('Multiple ' + mesmer_js_1.Title.tagName + ' tags found');
    }
    else {
        let title = xml_title[0].childNodes[0].nodeValue.trim();
        let titleNode = new mesmer_js_1.Title((0, xml_js_1.getAttributes)(xml_title[0]), title);
        let titleElement = document.getElementById("title");
        // Create a new div element for the input.
        let divElement = document.createElement("div");
        divElement.style.marginTop = marginTop;
        divElement.style.marginBottom = marginBottom;
        // Create a text node.
        let textNode = document.createTextNode("Title: ");
        divElement.appendChild(textNode);
        // Create a new input element.
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = title;
        // Apply CSS styles to make the input text appear like a h1.
        inputElement.style.fontSize = fontSize1;
        divElement.appendChild(inputElement);
        // Add the new div element to the parent of the titleElement.
        titleElement.parentNode?.insertBefore(divElement, titleElement);
        // Remove the original titleElement.
        titleElement.parentNode?.removeChild(titleElement);
        (0, html_js_1.resizeInputElement)(inputElement, 0);
        console.log("inputElement.value=" + inputElement.value);
        // Add event listener to inputElement.
        inputElement.addEventListener('change', function () {
            if (inputElement.value != title) {
                titleNode.value = inputElement.value;
            }
            (0, html_js_1.resizeInputElement)(inputElement, 0);
        });
        // Create a collapsible div for molecules
        let moleculesElement = document.getElementById("molecules");
        let moleculeListElement = processMoleculeList(xml);
        moleculesElement.appendChild((0, html_js_1.getCollapsibleDiv)(moleculeListElement, "Molecules", "molecules_button", fontSize1, margin1, marginTop, marginBottom, "moleculesList"));
        // Create a collapsible div for reactions
        let reactionsElement = document.getElementById("reactions");
        let reactionListElement = processReactionList(xml);
        reactionsElement.appendChild((0, html_js_1.getCollapsibleDiv)(reactionListElement, "Reactions", "reactions_button", fontSize1, margin1, marginTop, marginBottom, "reactionsList"));
        // Display reaction diagram. 
        displayReactionsDiagram();
        // Collapse and set up action listeners for all collapsible content.
        (0, html_js_1.makeCollapsible)();
    }
    /**
     * Generate conditions table.
     */
    //initConditions(xml);
    //displayConditions();
    /**
     * Generate parameters table.
     */
    //initModelParameters(xml);
    //displayModelParameters();
    /**
     * Generate control table.
     */
    //initControl(xml);
    //displayControl();
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml) {
    // Create div to contain the molecules list.
    let moleculeListDiv = document.createElement("div");
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
            let buttonId = molecule.id + "_" + molecule_js_1.PropertyList.tagName;
            let contentDivId = molecule.id + "_" + molecule_js_1.PropertyList.tagName + "_";
            let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(plDiv, molecule_js_1.PropertyList.tagName, buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
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
                    processProperty(p, unitsEnergy, molecule, xml_Ps[j], plDiv, margin4);
                }
                else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
                    processProperty(p, unitsRotConsts, molecule, xml_Ps[j], plDiv, margin4);
                }
                else {
                    processProperty(p, undefined, molecule, xml_Ps[j], plDiv, margin4);
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
                processProperty(p, unitsEnergy, molecule, xml_Ps[0], moleculeDiv, margin4);
            }
            else if (p.dictRef == molecule_js_1.RotConsts.dictRef) {
                processProperty(p, unitsRotConsts, molecule, xml_Ps[0], moleculeDiv, margin4);
            }
            else {
                processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, margin4);
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
            processEnergyTransferModel(etm, molecule, xml_ETMs[0], moleculeDiv, margin4);
            moleculeTagNames.delete(molecule_js_1.EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_DOSCMethod = xml_molecules[i].getElementsByTagName(molecule_js_1.DOSCMethod.tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length > 1) {
                throw new Error("Expecting 1 or 0 " + molecule_js_1.DOSCMethod.tagName + " but finding " + xml_DOSCMethod.length + "!");
            }
            let dOSCMethod = new molecule_js_1.DOSCMethod((0, xml_js_1.getAttributes)(xml_DOSCMethod[0]));
            processDOSCMethod(dOSCMethod, molecule, margin3, moleculeDiv);
            moleculeTagNames.delete(molecule_js_1.DOSCMethod.tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName(molecule_js_1.ExtraDOSCMethod.tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            }
            console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");
            let extraDOSCMethod = new molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let buttonId = molecule.id + "_" + molecule_js_1.ExtraDOSCMethod.tagName;
            let contentDivId = molecule.id + "_" + molecule_js_1.ExtraDOSCMethod.tagName + "_";
            let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(extraDOSCMethodDiv, molecule_js_1.ExtraDOSCMethod.tagName, buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
            moleculeDiv.appendChild(collapsibleDiv);
            // Read bondRef.
            let bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName(molecule_js_1.BondRef.tagName);
            let bondRef;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                }
                bondRef = new molecule_js_1.BondRef((0, xml_js_1.getAttributes)(bondRefs[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName(molecule_js_1.HinderedRotorPotential.tagName);
            let hinderedRotorPotential;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) {
                    throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                }
                // Load PotentialPoints.
                let potentialPoints = [];
                let xml_potentialPoints = hinderedRotorPotentials[0].getElementsByTagName(molecule_js_1.PotentialPoint.tagName);
                for (let k = 0; k < xml_potentialPoints.length; k++) {
                    potentialPoints.push(new molecule_js_1.PotentialPoint((0, xml_js_1.getAttributes)(xml_potentialPoints[k])));
                }
                hinderedRotorPotential = new molecule_js_1.HinderedRotorPotential((0, xml_js_1.getAttributes)(hinderedRotorPotentials[0]), potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }
            // Read periodicities.
            let xml_periodicities = xml_DOSCMethod[0].getElementsByTagName(molecule_js_1.Periodicity.tagName);
            let periodicity;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                periodicity = new molecule_js_1.Periodicity((0, xml_js_1.getAttributes)(xml_periodicities[0]), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_periodicities[0]))));
                extraDOSCMethod.setPeriodicity(periodicity);
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
            console.warn("ReservoirSize detected: This is not displayed in the GUI - more coding needed!");
            molecule.setReservoirSize(new molecule_js_1.ReservoirSize((0, xml_js_1.getAttributes)(xml_ReservoirSize[0]), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ReservoirSize[0])))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
        }
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(moleculeDiv, molecule.getLabel(), molecule.tagName + "_" + molecule.id + "_button", fontSize2, margin2, marginTop, marginBottom, molecule.tagName + "_" + molecule.id);
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xml) {
    //console.log("xml=" + xml);
    if (xml_title != null) {
        xml_title.innerHTML = input_xml_filename;
    }
    if (xml_text != null) {
        xml_text.innerHTML = (0, xml_js_1.toHTML)(xml);
    }
}
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 * @param margin The margin.
 */
function processProperty(p, units, molecule, element, moleculeDiv, margin) {
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
        let inputDiv = (0, html_js_1.getInput)("number", molecule.id + "_" + p.dictRef, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(ps, event.target);
            }
        }, inputString, label);
        inputDiv.style.marginLeft = margin;
        inputDiv.style.marginTop = marginTop;
        inputDiv.style.marginBottom = marginBottom;
        let inputElement = inputDiv.querySelector('input');
        inputElement.value = inputString;
        (0, html_js_1.resizeInputElement)(inputElement);
        inputElement.addEventListener('change', (event) => {
            let eventTarget = event.target;
            inputString = eventTarget.value;
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
                displayReactionsDiagram();
            }
        });
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef);
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
            let inputDiv = (0, html_js_1.getInput)("text", molecule.id + "_" + p.dictRef, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberArrayNode(pa, event.target);
                }
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = marginTop;
            inputDiv.style.marginBottom = marginBottom;
            let inputElement = inputDiv.querySelector('input');
            inputElement.value = inputString;
            (0, html_js_1.resizeInputElement)(inputElement);
            inputElement.addEventListener('change', (event) => {
                let eventTarget = event.target;
                inputString = eventTarget.value;
                pa = p.getProperty();
                values = (0, util_js_2.toNumberArray)(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                (0, html_js_1.resizeInputElement)(inputElement);
            });
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef);
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
function addAnyUnits(units, attributes, inputDiv, id, tagOrDictRef) {
    if (units != undefined) {
        let unitsSelectElement = getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            inputDiv.appendChild(unitsSelectElement);
        }
    }
    else {
        let units = attributes.get("units");
        if (units != undefined) {
            let label = document.createElement('label');
            label.textContent = units;
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
function getUnitsSelectElement(units, attributes, id, tagOrDictRef) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let selectElement = (0, html_js_1.getSelectElement)(units, "Units", id);
        // Set the initial value to the units.
        selectElement.value = psUnits;
        // Add event listener to selectElement.
        (0, html_js_1.resizeSelectElement)(selectElement);
        selectElement.addEventListener('change', (event) => {
            if (event.target instanceof HTMLSelectElement) {
                attributes.set("units", event.target.value);
                console.log("Set " + tagOrDictRef + " units to " + event.target.value);
            }
            (0, html_js_1.resizeSelectElement)(selectElement);
        });
        return selectElement;
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
function processDOSCMethod(dOSCMethod, molecule, margin, moleculeDiv) {
    let label = document.createElement('label');
    label.textContent = molecule_js_1.DOSCMethod.tagName + ": ";
    let container = document.createElement('div');
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options = ["ClassicalRotors", "QMRotors"];
    let selectElement = (0, html_js_1.getSelectElement)(options, "DOSCMethod", molecule.id + "_" + 'Select_DOSCMethod');
    // Set the initial value to the DOSCMethod.
    selectElement.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    selectElement.addEventListener('change', (event) => {
        if (event.target instanceof HTMLSelectElement) {
            dOSCMethod.setXsiType(event.target.value);
            console.log("Set DOSCMethod to " + event.target.value);
        }
    });
    molecule.setDOSCMethod(dOSCMethod);
    container.appendChild(selectElement);
    container.style.marginLeft = margin;
    container.style.marginTop = marginTop;
    container.style.marginBottom = marginBottom;
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
        let buttonId = molecule.id + "_" + molecule_js_1.EnergyTransferModel.tagName;
        let contentDivId = molecule.id + "_" + molecule_js_1.EnergyTransferModel.tagName + "_";
        let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(etmDiv, molecule_js_1.EnergyTransferModel.tagName, buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
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
            let inputDiv = (0, html_js_1.getInput)("number", id, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberNode(deltaEDown, event.target);
                }
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = marginTop;
            inputDiv.style.marginBottom = marginBottom;
            etmDiv.appendChild(inputDiv);
            let inputElement = inputDiv.querySelector('input');
            inputElement.value = inputString;
            (0, html_js_1.resizeInputElement)(inputElement);
            inputElement.addEventListener('change', (event) => {
                let eventTarget = event.target;
                inputString = eventTarget.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, html_js_1.resizeInputElement)(inputElement);
            });
            let unitsLabel = document.createElement('label');
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
function setNumberArrayNode(node, input) {
    let inputId = input.id;
    let inputString = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        let input = document.getElementById(inputId);
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
        let input = document.getElementById(inputId);
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
        let input = document.getElementById(inputId);
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
    let inputId = input.id;
    //let moleculeID: string = inputId.split("_")[0];
    //let molecule: Molecule | undefined = molecules.get(moleculeID);
    //if (molecule != undefined) {
    if ((0, util_js_1.isNumeric)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log("Value set to " + inputNumber);
    }
    else {
        alert("Value is not numeric, resetting...");
        let inputElement = document.getElementById(inputId);
        inputElement.value = node.value.toString();
    }
    //console.log("molecule=" + molecule);
    //}
}
exports.setNumberNode = setNumberNode;
window.set = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml) {
    // Create div to contain the reaction list.
    let reactionListDiv = document.createElement("div");
    reactionListDiv.style.marginTop = marginTop;
    reactionListDiv.style.marginBottom = marginBottom;
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
        let reactionDiv = document.createElement("div");
        // Set attributes.
        let attributes = (0, xml_js_1.getAttributes)(xml_reactions[i]);
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
        let reaction = new reaction_js_1.Reaction(attributes);
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
                let container = document.createElement("div");
                let label = document.createElement('label');
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options = ["deficientReactant", "excessReactant"];
                let selectElement = (0, html_js_1.getSelectElement)(options, "Role", molecule.ref + "_" + 'Select_Role');
                // Set the initial value.
                selectElement.value = molecule.role;
                // Add event listener to selectElement.
                selectElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
                });
                container.appendChild(selectElement);
                container.style.marginLeft = margin4;
                container.style.marginTop = marginTop;
                container.style.marginBottom = marginBottom;
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let buttonId = reaction.id + "_" + reaction_js_1.Reactant.tagName;
            let contentDivId = reaction.id + "_" + reaction_js_1.Reactant.tagName + "_";
            let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(reactantsDiv, "Reactants", buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
                // Create a new div for the role.
                let container = document.createElement("div");
                let label = document.createElement('label');
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options = ["modelled", "sink"];
                let selectElement = (0, html_js_1.getSelectElement)(options, "Role", molecule.ref + "_" + 'Select_Role');
                // Set the initial value.
                selectElement.value = molecule.role;
                // Add event listener to selectElement.
                selectElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
                });
                container.appendChild(selectElement);
                container.style.marginLeft = margin4;
                container.style.marginTop = marginTop;
                container.style.marginBottom = marginBottom;
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create a new collapsible div for the products.
            let buttonId = reaction.id + "_" + reaction_js_1.Product.tagName;
            let contentDivId = reaction.id + "_" + reaction_js_1.Product.tagName + "_";
            let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(productsDiv, "Products", buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
        }
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(reaction_js_1.Tunneling.tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            let tunneling = new reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            // Create a new div for the tunneling.
            let container = document.createElement("div");
            let label = document.createElement('label');
            label.textContent = reaction_js_1.Tunneling.tagName + ": ";
            container.appendChild(label);
            // Create a HTMLSelectElement to select the Tunneling.
            let options = ["Eckart", "WKB"];
            let selectElement = (0, html_js_1.getSelectElement)(options, "Tunneling", reaction.id + "_" + 'Select_Tunneling');
            // Set the initial value.
            selectElement.value = tunneling.getName();
            // Add event listener to selectElement.
            selectElement.addEventListener('change', (event) => {
                if (event.target instanceof HTMLSelectElement) {
                    tunneling.setName(event.target.value);
                    console.log("Set Tunneling to " + event.target.value);
                }
            });
            container.appendChild(selectElement);
            container.style.marginLeft = margin3;
            container.style.marginTop = marginTop;
            container.style.marginBottom = marginBottom;
            reactionDiv.appendChild(container);
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
                let label = document.createElement('label');
                label.textContent = molecule.ref + " role: transitionState";
                label.style.marginLeft = margin4;
                label.style.marginTop = marginTop;
                label.style.marginBottom = marginBottom;
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let buttonId = reaction.id + "_" + reaction_js_1.TransitionState.tagName;
            let contentDivId = reaction.id + "_" + reaction_js_1.TransitionState.tagName + "_";
            let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(transitionStatesDiv, "Transition States", buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
                                let inputDiv = (0, html_js_1.getInput)("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(preExponential, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin4;
                                inputDiv.style.marginTop = marginTop;
                                inputDiv.style.marginBottom = marginBottom;
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.PreExponential.tagName, reaction_js_1.PreExponential.tagName);
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
                                let inputDiv = (0, html_js_1.getInput)("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(activationEnergy, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin4;
                                inputDiv.style.marginTop = marginTop;
                                inputDiv.style.marginBottom = marginBottom;
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.ActivationEnergy.tagName, reaction_js_1.ActivationEnergy.tagName);
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
                                let inputDiv = (0, html_js_1.getInput)("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(tInfinity, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin4;
                                inputDiv.style.marginTop = marginTop;
                                inputDiv.style.marginBottom = marginBottom;
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.TInfinity.tagName, reaction_js_1.TInfinity.tagName);
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
                                let inputDiv = (0, html_js_1.getInput)("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(nInfinity, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin4;
                                inputDiv.style.marginTop = marginTop;
                                inputDiv.style.marginBottom = marginBottom;
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + reaction_js_1.MesmerILT.xsiType + "_" + reaction_js_1.NInfinity.tagName, reaction_js_1.NInfinity.tagName);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let buttonId = reaction.id + "_" + reaction_js_1.MCRCMethod.tagName;
                        let contentDivId = reaction.id + "_" + reaction_js_1.MCRCMethod.tagName + "_";
                        let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(mCRCMethodDiv, reaction_js_1.MCRCMethod.tagName, buttonId, fontSize3, margin3, marginTop, marginBottom, contentDivId);
                        reactionDiv.appendChild(collapsibleDiv);
                    }
                    else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                }
                else {
                    mCRCMethod = new reaction_js_1.MCRCMethod(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement('label');
                    mCRCMethodLabel.textContent = reaction_js_1.MCRCMethod.tagName + ": " + mCRCMethodAttributes.get("name");
                    mCRCMethodLabel.style.marginLeft = margin3;
                    mCRCMethodLabel.style.marginTop = marginTop;
                    mCRCMethodLabel.style.marginBottom = marginBottom;
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
            let excessReactantConc;
            let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_excessReactantConc[0])));
            excessReactantConc = new reaction_js_1.ExcessReactantConc((0, xml_js_1.getAttributes)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
        }
        // Create a new collapsible div for the reaction.
        let collapsibleDiv = (0, html_js_1.getCollapsibleDiv)(reactionDiv, reaction.id + "(" + reaction.getLabel() + ")", reaction.tagName + "_" + reaction.id + "_button", fontSize2, margin2, marginTop, marginBottom, reaction.tagName + "_" + reaction.id);
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(collapsibleDiv);
    }
    return reactionListDiv;
}
let conditions;
/**
 * Parse xml to initialise conditions.
 * @param {XMLDocument} xml The XML document.
 */
function initConditions(xml) {
    console.log(conditions_js_1.Conditions.tagName);
    let xml_conditions = (0, xml_js_1.getSingularElement)(xml, conditions_js_1.Conditions.tagName);
    // Set conditions_title.
    conditions_title = document.getElementById("conditions_title");
    if (conditions_title != null) {
        conditions_title.innerHTML = "Conditions";
    }
    // BathGas
    let xml_bathGas = (0, xml_js_1.getFirstElement)(xml_conditions, conditions_js_1.BathGas.tagName);
    let attributes = (0, xml_js_1.getAttributes)(xml_bathGas);
    let moleculeID = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGas));
    let bathGas = new conditions_js_1.BathGas(attributes, moleculeID, molecules);
    // PTs
    let xml_PTs = (0, xml_js_1.getSingularElement)(xml_conditions, 'me:PTs');
    let xml_PTPairs = xml_PTs.getElementsByTagName(conditions_js_1.PT.tagName);
    // Process each PTpair.
    let pTs = [];
    for (let i = 0; i < xml_PTPairs.length; i++) {
        // Add optional BathGas
        let xml_bathGass = xml_PTPairs[i].getElementsByTagName(conditions_js_1.BathGas.tagName);
        let pTBathGas;
        if (xml_bathGass.length > 0) {
            if (xml_bathGass.length > 1) {
                console.warn("xml_bathGass.length=" + xml_bathGass.length);
            }
            pTBathGas = new conditions_js_1.BathGas((0, xml_js_1.getAttributes)(xml_bathGass[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_bathGass[0])), molecules);
            console.log("pTBathGas" + pTBathGas.toString());
        }
        // Add optional ExperimentRate
        let xml_experimentRates = xml_PTPairs[i].getElementsByTagName(conditions_js_1.ExperimentRate.tagName);
        let experimentRate;
        if (xml_experimentRates.length > 0) {
            if (xml_experimentRates.length > 1) {
                console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
            }
            experimentRate = new conditions_js_1.ExperimentRate((0, xml_js_1.getAttributes)(xml_experimentRates[0]), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_experimentRates[0]))));
            console.log("experimentRate" + experimentRate.toString());
        }
        pTs.push(new conditions_js_1.PT((0, xml_js_1.getAttributes)(xml_PTPairs[i]), pTBathGas, experimentRate));
        //console.log(pTs[i].toString()); // For debugging.
    }
    conditions = new conditions_js_1.Conditions((0, xml_js_1.getAttributes)(xml_conditions), bathGas, new conditions_js_1.PTs((0, xml_js_1.getAttributes)(xml_PTs), pTs));
}
let modelParameters;
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function initModelParameters(xml) {
    console.log(modelParameters_js_1.ModelParameters.tagName);
    let xml_modelParameters = (0, xml_js_1.getSingularElement)(xml, modelParameters_js_1.ModelParameters.tagName);
    // Set modelParameters_title.
    modelParameters_title = document.getElementById("modelParameters_title");
    if (modelParameters_title != null) {
        modelParameters_title.innerHTML = "Model Parameters";
    }
    // GrainSize
    let xml_grainSize = (0, xml_js_1.getSingularElement)(xml_modelParameters, modelParameters_js_1.GrainSize.tagName);
    let attributes = (0, xml_js_1.getAttributes)(xml_grainSize);
    let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_grainSize)));
    let grainSize = new modelParameters_js_1.GrainSize(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill = (0, xml_js_1.getSingularElement)(xml_modelParameters, modelParameters_js_1.EnergyAboveTheTopHill.tagName);
    let energyAboveTheTopHill = new modelParameters_js_1.EnergyAboveTheTopHill((0, xml_js_1.getAttributes)(xml_energyAboveTheTopHill), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_energyAboveTheTopHill))));
    modelParameters = new modelParameters_js_1.ModelParameters(grainSize, energyAboveTheTopHill);
}
let control;
/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */
function initControl(xml) {
    console.log(control_js_1.Control.tagName);
    let xml_control = (0, xml_js_1.getSingularElement)(xml, control_js_1.Control.tagName);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) {
        control_title.innerHTML = "Control";
    }
    // me:testDOS
    let xml_testDOS = xml_control.getElementsByTagName(control_js_1.TestDOS.tagName);
    let testDOS;
    if (xml_testDOS.length == 1) {
        testDOS = new control_js_1.TestDOS();
    }
    else {
        if (xml_testDOS.length > 1) {
            console.warn("testDOS.length=" + xml_testDOS.length);
        }
    }
    // me:printSpeciesProfile
    let xml_printSpeciesProfile = xml_control.getElementsByTagName(control_js_1.PrintSpeciesProfile.tagName);
    let printSpeciesProfile;
    if (xml_printSpeciesProfile.length == 1) {
        printSpeciesProfile = new control_js_1.PrintSpeciesProfile();
    }
    else {
        if (xml_printSpeciesProfile.length > 1) {
            console.warn("printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
        }
    }
    // me:testMicroRates
    let xml_testMicroRates = xml_control.getElementsByTagName(control_js_1.TestMicroRates.tagName);
    let testMicroRates;
    if (xml_testMicroRates.length == 1) {
        testMicroRates = new control_js_1.TestMicroRates();
    }
    else {
        if (xml_testMicroRates.length > 1) {
            console.warn("testMicroRates.length=" + xml_testMicroRates.length);
        }
    }
    // me:testRateConstant
    let xml_testRateConstant = xml_control.getElementsByTagName(control_js_1.TestRateConstant.tagName);
    let testRateConstant;
    if (xml_testRateConstant.length == 1) {
        testRateConstant = new control_js_1.TestRateConstant();
    }
    else {
        if (xml_testRateConstant.length > 1) {
            console.warn("testRateConstant.length=" + xml_testRateConstant.length);
        }
    }
    // me:printGrainDOS
    let xml_printGrainDOS = xml_control.getElementsByTagName(control_js_1.PrintGrainDOS.tagName);
    let printGrainDOS;
    if (xml_printGrainDOS.length == 1) {
        printGrainDOS = new control_js_1.PrintGrainDOS();
    }
    else {
        if (xml_printGrainDOS.length > 1) {
            console.warn("printGrainDOS.length=" + xml_printGrainDOS.length);
        }
    }
    // me:printCellDOS
    let xml_printCellDOS = xml_control.getElementsByTagName(control_js_1.PrintCellDOS.tagName);
    let printCellDOS;
    if (xml_printCellDOS.length == 1) {
        printCellDOS = new control_js_1.PrintCellDOS();
    }
    else {
        if (xml_printCellDOS.length > 1) {
            console.warn("printCellDOS.length=" + xml_printCellDOS.length);
        }
    }
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName(control_js_1.PrintReactionOperatorColumnSums.tagName);
    let printReactionOperatorColumnSums;
    if (xml_printReactionOperatorColumnSums.length == 1) {
        printReactionOperatorColumnSums = new control_js_1.PrintReactionOperatorColumnSums();
    }
    else {
        if (xml_printReactionOperatorColumnSums.length > 1) {
            console.warn("printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
        }
    }
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName(control_js_1.PrintTunnellingCoefficients.tagName);
    let printTunnellingCoefficients;
    if (xml_printTunnellingCoefficients.length == 1) {
        printTunnellingCoefficients = new control_js_1.PrintTunnellingCoefficients();
    }
    else {
        if (xml_printTunnellingCoefficients.length > 1) {
            console.warn("printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
        }
    }
    // me:printGrainkfE
    let xml_printGrainkfE = xml_control.getElementsByTagName(control_js_1.PrintGrainkfE.tagName);
    let printGrainkfE;
    if (xml_printGrainkfE.length == 1) {
        printGrainkfE = new control_js_1.PrintGrainkfE();
    }
    else {
        if (xml_printGrainkfE.length > 1) {
            console.warn("printGrainkfE.length=" + xml_printGrainkfE.length);
        }
    }
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName(control_js_1.PrintGrainBoltzmann.tagName);
    let printGrainBoltzmann;
    if (xml_printGrainBoltzmann.length == 1) {
        printGrainBoltzmann = new control_js_1.PrintGrainBoltzmann();
    }
    else {
        if (xml_printGrainBoltzmann.length > 1) {
            console.warn("printGrainBoltzmann.length=" + xml_printGrainBoltzmann.length);
        }
    }
    // me:printGrainkbE
    let xml_printGrainkbE = xml_control.getElementsByTagName(control_js_1.PrintGrainkbE.tagName);
    let printGrainkbE;
    if (xml_printGrainkbE.length == 1) {
        printGrainkbE = new control_js_1.PrintGrainkbE();
    }
    else {
        if (xml_printGrainkbE.length > 1) {
            console.warn("printGrainkbE.length=" + xml_printGrainkbE.length);
        }
    }
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName(control_js_1.Eigenvalues.tagName);
    let eigenvalues;
    if (xml_eigenvalues.length == 1) {
        eigenvalues = new control_js_1.Eigenvalues((0, xml_js_1.getAttributes)(xml_eigenvalues[0]), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_eigenvalues[0]))));
    }
    else {
        console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    }
    // me:hideInactive
    let xml_hideInactive = xml_control.getElementsByTagName(control_js_1.HideInactive.tagName);
    let hideInactive;
    if (xml_hideInactive.length == 1) {
        hideInactive = new control_js_1.HideInactive();
    }
    else {
        console.warn("hideInactive.length=" + xml_hideInactive.length);
    }
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName(control_js_1.DiagramEnergyOffset.tagName);
    let diagramEnergyOffset;
    if (xml_diagramEnergyOffset.length == 1) {
        let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new control_js_1.DiagramEnergyOffset((0, xml_js_1.getAttributes)(xml_diagramEnergyOffset[0]), value);
    }
    else {
        console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    }
    control = new control_js_1.Control((0, xml_js_1.getAttributes)(xml_control), testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
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
    // TODO: Set styles depending on dark/light mode settings of users browser and not hard code.
    //let white = "white";
    let black = "black";
    let green = "green";
    let red = "red";
    let blue = "blue";
    //let yellow = "yellow";
    let orange = "orange";
    let background = "black";
    let foreground = "white";
    const ctx = canvas.getContext("2d");
    //ctx.fillStyle = background;
    // Get text height for font size.
    let th = (0, canvas_js_1.getTextHeight)(ctx, "Aj", font);
    //console.log("th=" + th);
    // Go through reactions:
    // 1. Create sets of reactants, end products, intermediate products and transition states.
    // 2. Create maps of orders and energies.
    // 3. Calculate maximum energy.
    let reactants = new Set();
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
            reactants.add(reactantsLabel);
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
        let energyRescaled = (0, util_js_1.rescale)(energyMin, energyRange, 0, canvas.height, energy);
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
    let canvasHeightWithBorder = canvas.height + (4 * th) + (2 * lw);
    //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
    let originalCanvasHeight = canvas.height;
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
                (0, canvas_js_1.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, util_js_1.get)(transitionStatesOutXY, transitionStateLabel);
                (0, canvas_js_1.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            });
        }
        else {
            (0, canvas_js_1.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
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
/**
 * Display reactions table.
 */
function displayReactions() {
    if (reactions.size == 0) {
        return;
    }
    reactions.forEach(function (reaction, id) {
        //console.log("id=" + id);
        //console.log("reactions=" + reactions);
        // Create reactions div.
        let div = document.createElement("div");
        // Properties.
        reaction.index.forEach(function (value, key) {
        });
    });
    /*
    if (reactions.size == 0) {
        return;
    }
    // Prepare table headings.
    let reactionsTable = getTH(["ID", "Reactants", "Products", "Transition State",
        "PreExponential", "Activation Energy", "TInfinity", "NInfinity"]);
    reactions.forEach(function (reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        let reactants: string = reaction.getReactantsLabel() || "";
        let products: string = reaction.getProductsLabel() || "";
        let transitionState: string = "";
        let preExponential: string = "";
        let activationEnergy: string = "";
        let tInfinity: string = "";
        let nInfinity: string = "";
        let tSs: Map<string, TransitionState> | TransitionState | undefined = reaction.transitionStates;
        //console.log("tSs=" + tSs);
        if (tSs != undefined) {
            if (tSs instanceof Map) {
                // Join all names together.
                tSs.forEach(function (ts) {
                    let name: string | undefined = ts.getRef();
                    if (name != null) {
                        transitionState = name + " ";
                    }
                });
            } else {
                let ts: TransitionState = tSs as TransitionState;
                let name: string | undefined = ts.getRef();
                if (name != null) {
                    transitionState = name;
                }
            }
        }
        let mCRCMethod: MCRCMethod | undefined = reaction.getMCRCMethod();
        //console.log("mCRCMethod=" + mCRCMethod);
        //console.log("typeof mCRCMethod=" + typeof mCRCMethod);
        if (mCRCMethod != undefined) {
            if (mCRCMethod instanceof MesmerILT) {
                let mp: PreExponential | undefined = mCRCMethod.getPreExponential();
                if (mp != undefined) {
                    preExponential = mp.value.toString() + " "
                        + mp.attributes.get("units");
                }
                let ae: ActivationEnergy | undefined = mCRCMethod.getActivationEnergy();
                if (ae != undefined) {
                    activationEnergy = ae.value.toString() + " "
                        + ae.attributes.get("units");
                }
                let ti: TInfinity | undefined = mCRCMethod.getTInfinity();
                if (ti != undefined) {
                    tInfinity = ti.value.toString();
                }
                let ni: NInfinity | undefined = mCRCMethod.getNInfinity();
                if (ni != undefined) {
                    nInfinity = ni.value.toString();
                }
            } else {
                if (mCRCMethod.attributes.get("name") == "RRKM") {
                } else {
                    console.log("Unexpected mCRCMethod: " + mCRCMethod);
                    throw new Error("Unexpected mCRCMethod: " + mCRCMethod);
                }
            }
        }
        // Complete table creation.
        reactionsTable += getTR(getTD(id) + getTD(reactants) + getTD(products) + getTD(transitionState)
            + getTD(preExponential, true) + getTD(activationEnergy, true) + getTD(tInfinity, true)
            + getTD(nInfinity, true));
        reactions_table = document.getElementById("reactions_table");
        if (reactions_table !== null) {
            reactions_table.innerHTML = reactionsTable;
        }
    });
    */
}
/**
 * Display reactions diagram.
 */
function displayReactionsDiagram() {
    if (reactions.size > 0) {
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, dark, font, lw, lwc);
        }
    }
}
/**
 * Display conditions.
 */
function displayConditions() {
    /*
    let bathGas_element: HTMLElement | null = document.getElementById("bathGas");
    if (bathGas_element != null) {
        bathGas_element.innerHTML = "Bath Gas " + conditions.getBathGas().value;
    }
    let pTs_element: HTMLElement | null = document.getElementById("PT_table");
    let th: string[] = ["P", "T"];
    // If PTs contain BathGas
    let hasBathGas: boolean = conditions.getPTs().pTpairs.some(pair => {
        return pair.getBathGas() != undefined;
    });
    if (hasBathGas) {
        th.push("BathGas");
    }
    // Check if PTs contain ExperimentRate
    let hasExperimentRate: boolean = conditions.getPTs().pTpairs.some(pair => {
        return pair.getExperimentRate() != undefined;
    });
    if (hasExperimentRate) {
        th.push("ExperimentRate");
    }
    let table: string = getTH(th);
    if (pTs_element != null) {
        conditions.getPTs().pTpairs.forEach(function (pTpair) {
            table += getTR(getTD(pTpair.getP().toString()) + getTD(pTpair.getT().toString()));
            if (hasBathGas) {
                table += getTD(pTpair.getBathGas()?.toString() ?? '');
            }
            if (hasExperimentRate) {
                table += getTD(pTpair.getExperimentRate()?.toString() ?? '');
            }
        });
        pTs_element.innerHTML = table;
    }
    */
}
/**
 * Display modelParameters.
 */
function displayModelParameters() {
    /*
    let modelParameters_element: HTMLElement | null = document.getElementById("modelParameters_table");
    let table: string = getTH(["Parameter", "Value"]);
    table += getTR(getTD("Grain Size") + getTD(modelParameters.getGrainSize().value.toString()));
    table += getTR(getTD("Energy Above The Top Hill") + getTD(modelParameters.getEnergyAboveTheTopHill().value.toString()));

    if (modelParameters_element != null) {
        modelParameters_element.innerHTML = table;
    }
    */
}
/**
 * Display control.
 */
function displayControl() {
    /*
    let control_table_element: HTMLElement | null = document.getElementById("control_table");
    let table: string = getTH(["Control", "Value"]);
    // TestDOS
    let testDOS: TestDOS | undefined = control.getTestDOS();
    if (testDOS != undefined) {
        table += getTR(getTD(TestDOS.tagName) + getTD(""));
    }
    // PrintSpeciesProfile
    let printSpeciesProfile: PrintSpeciesProfile | undefined = control.getPrintSpeciesProfile();
    if (printSpeciesProfile != undefined) {
        table += getTR(getTD(PrintSpeciesProfile.tagName) + getTD(""));
    }
    // TestMicroRates
    let testMicroRates: TestMicroRates | undefined = control.getTestMicroRates();
    if (testMicroRates != undefined) {
        table += getTR(getTD(TestMicroRates.tagName) + getTD(""));
    }
    // TestRateConstant
    let testRateConstant: TestRateConstant | undefined = control.getTestRateConstant();
    if (testRateConstant != undefined) {
        table += getTR(getTD(TestRateConstant.tagName) + getTD(""));
    }
    // PrintGrainDOS
    let printGrainDOS: PrintGrainDOS | undefined = control.getPrintGrainDOS();
    if (printGrainDOS != undefined) {
        table += getTR(getTD(PrintGrainDOS.tagName) + getTD(""));
    }
    // PrintCellDOS
    let printCellDOS: PrintCellDOS | undefined = control.getPrintCellDOS();
    if (printCellDOS != undefined) {
        table += getTR(getTD(PrintCellDOS.tagName) + getTD(""));
    }
    // PrintReactionOperatorColumnSums
    let printReactionOperatorColumnSums: PrintReactionOperatorColumnSums | undefined = control.getPrintReactionOperatorColumnSums();
    if (printReactionOperatorColumnSums != undefined) {
        table += getTR(getTD(PrintReactionOperatorColumnSums.tagName) + getTD(""));
    }
    // PrintTunnellingCoefficients
    let printTunnellingCoefficients: PrintTunnellingCoefficients | undefined = control.getPrintTunnellingCoefficients();
    if (printTunnellingCoefficients != undefined) {
        table += getTR(getTD(PrintTunnellingCoefficients.tagName) + getTD(""));
    }
    // PrintGrainkfE
    let printGrainkfE: PrintGrainkfE | undefined = control.getPrintGrainkfE();
    if (printGrainkfE != undefined) {
        table += getTR(getTD(PrintGrainkfE.tagName) + getTD(""));
    }
    // PrintGrainBoltzmann
    let printGrainBoltzmann: PrintGrainBoltzmann | undefined = control.getPrintGrainBoltzmann();
    if (printGrainBoltzmann != undefined) {
        table += getTR(getTD(PrintGrainBoltzmann.tagName) + getTD(""));
    }
    // PrintGrainkbE
    let printGrainkbE: PrintGrainkbE | undefined = control.getPrintGrainkbE();
    if (printGrainkbE != undefined) {
        table += getTR(getTD(PrintGrainkbE.tagName) + getTD(""));
    }
    // Eigenvalues
    let eigenvalues: Eigenvalues | undefined = control.getEigenvalues();
    if (eigenvalues != undefined) {
        table += getTR(getTD(Eigenvalues.tagName) + getTD(eigenvalues.value.toString()));
    }
    // HideInactive
    let hideInactive: HideInactive | undefined = control.getHideInactive();
    if (hideInactive != undefined) {
        table += getTR(getTD(HideInactive.tagName) + getTD(""));
    }
    // DiagramEnergyOffset
    let diagramEnergyOffset: DiagramEnergyOffset | undefined = control.getDiagramEnergyOffset();
    if (diagramEnergyOffset != undefined) {
        table += getTR(getTD(DiagramEnergyOffset.tagName) + getTD(diagramEnergyOffset.value.toString()));
    }
    // Set the table.
    if (control_table_element != null) {
        control_table_element.innerHTML = table;
    }
    */
}
/**
 * Save to XML file.
 */
window.saveXML = function () {
    console.log("saveXML");
    const pad = "  ";
    const padding2 = pad.repeat(2);
    // Create moleculeList.
    let moleculeList = "";
    molecules.forEach(function (molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
        //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = (0, xml_js_1.getTag)(moleculeList, "moleculeList", undefined, pad, true);
    // Create reactionList.
    let reactionList = "";
    reactions.forEach(function (reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
        //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = (0, xml_js_1.getTag)(reactionList, "reactionList", undefined, pad, true);
    // Create me.Conditions
    //    let xml_conditions: string = conditions.toXML(pad, pad);
    // Create modelParameters
    //   let xml_modelParameters: string = modelParameters.toXML(pad, pad);
    // create me.control
    //   let xml_control: string = control.toXML(pad, pad);
    // Create a new Blob object from the data
    let blob = new Blob([moleculeList, reactionList], { type: "text/plain" });
    //     let blob = new Blob([moleculeList, reactionList,
    //         xml_conditions, xml_modelParameters, xml_control],
    //         { type: "text/plain" });
    // Create a new object URL for the blob
    let url = URL.createObjectURL(blob);
    // Create a new 'a' element
    let a = document.createElement("a");
    // Set the href and download attributes for the 'a' element
    a.href = url;
    a.download = input_xml_filename; // Replace with your desired filename
    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();
    // Remove the 'a' element after the download starts
    document.body.removeChild(a);
};
//# sourceMappingURL=app.js.map