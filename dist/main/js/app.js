"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVibFreqs = exports.setRotConst = exports.setEnergy = void 0;
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
// Expected XML tags strings.
let me_title_s = 'me:title';
/**
 * For storing me.title.
 */
let title;
/**
 * For storing the XML root start tag.
 */
let mesmerStartTag;
/**
 * For storing the XML root end tag.
 */
let mesmerEndTag;
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
 * The header of the XML file.
 */
const header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
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
let moleculesDiv;
let reactions_title;
let reactions_table;
let reactions_diagram_title;
let conditions_title;
let conditions_table;
let modelParameters_title;
let modelParameters_table;
let xml_title;
let xml_text;
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
 * Parses xml to initilise molecules.
 * @param {XMLDocument} xml The XML document.
 */
function initMolecules(xml) {
    let moleculeList_s = 'moleculeList';
    console.log("Read and store " + moleculeList_s);
    let xml_moleculeList = (0, xml_js_1.getSingularElement)(xml, moleculeList_s);
    // Set molecules_title.
    molecules_title = document.getElementById("molecules_title");
    if (molecules_title != null) {
        molecules_title.innerHTML = "Molecules";
    }
    // xml_moleculeList should have one or more molecule elements and no other elements.
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
    let xml_molecules = xml_moleculeList.getElementsByTagName(molecule_js_1.Molecule.tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    // Process each molecule.
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf like this.
    for (let i = 0; i < xml_molecules.length; i++) {
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
        // Init propertiesNode.
        let propertiesNode;
        // There can be an individual property not in a propertyList.
        let xml_PLs = xml_molecules[i].getElementsByTagName(molecule_js_1.PropertyList.tagName);
        if (xml_PLs.length > 1) {
            throw new Error("Expecting 1 or 0 " + molecule_js_1.PropertyList.tagName + " but finding " + xml_PLs.length + "!");
        }
        if (xml_PLs.length == 1) {
            let xml_PL = xml_PLs[0];
            let xml_Ps = xml_PL.getElementsByTagName(molecule_js_1.Property.tagName);
            if (xml_Ps.length < 2) {
                throw new Error("Expecting 2 or more " + molecule_js_1.Property.tagName + " in " + molecule_js_1.PropertyList.tagName + ", but finding " + xml_Ps.length + "!");
            }
            let properties = new Map();
            for (let j = 0; j < xml_Ps.length; j++) {
                let property = getProperty(xml_Ps[j]);
                let dictRef = property.attributes.get("dictRef");
                properties.set(dictRef, property);
            }
            propertiesNode = new molecule_js_1.PropertyList((0, xml_js_1.getAttributes)(xml_PL), properties);
            moleculeTagNames.delete(molecule_js_1.PropertyList.tagName);
        }
        else {
            let xml_Ps = xml_molecules[i].getElementsByTagName(molecule_js_1.Property.tagName);
            if (xml_Ps.length > 1) {
                throw new Error("Expecting 1 " + molecule_js_1.Property.tagName + " but finding " + xml_Ps.length + ". Should these be in a " + molecule_js_1.PropertyList.tagName + "?");
            }
            propertiesNode = getProperty(xml_Ps[0]);
        }
        moleculeTagNames.delete(molecule_js_1.Property.tagName);
        let els;
        // Read energyTransferModel
        moleculeTagNames.delete(molecule_js_1.EnergyTransferModel.tagName);
        let energyTransferModel = undefined;
        els = xml_molecules[i].getElementsByTagName(molecule_js_1.EnergyTransferModel.tagName);
        if (els != null) {
            if (els.length > 0) {
                if (els.length != 1) {
                    throw new Error("energyTransferModel length=" + els.length);
                }
                let xml_deltaEDown = els[0].getElementsByTagName(molecule_js_1.DeltaEDown.tagName);
                if (xml_deltaEDown != null) {
                    let deltaEDowns = [];
                    for (let k = 0; k < xml_deltaEDown.length; k++) {
                        let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_deltaEDown[k])));
                        let deltaEDown = new molecule_js_1.DeltaEDown((0, xml_js_1.getAttributes)(xml_deltaEDown[k]), value);
                        deltaEDowns.push(deltaEDown);
                    }
                    energyTransferModel = new molecule_js_1.EnergyTransferModel((0, xml_js_1.getAttributes)(els[0]), deltaEDowns);
                }
            }
        }
        // Read DOSCMethod
        moleculeTagNames.delete(molecule_js_1.DOSCMethod.tagName);
        let dOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName(molecule_js_1.DOSCMethod.tagName);
        if (els != null) {
            let el = els[0];
            if (el != null) {
                dOSCMethod = new molecule_js_1.DOSCMethod((0, xml_js_1.getAttributes)(el));
            }
        }
        // Read ExtraDOSCMethod.
        moleculeTagNames.delete(molecule_js_1.ExtraDOSCMethod.tagName);
        let extraDOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName(molecule_js_1.ExtraDOSCMethod.tagName);
        if (els.length > 0) {
            if (els.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + els.length);
            }
            // Read bondRef.
            let bondRefs = els[0].getElementsByTagName(molecule_js_1.BondRef.tagName);
            let bondRef;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                }
                bondRef = new molecule_js_1.BondRef((0, xml_js_1.getAttributes)(bondRefs[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(bondRefs[0])));
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials = els[0].getElementsByTagName(molecule_js_1.HinderedRotorPotential.tagName);
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
            }
            // Read periodicities.
            let xml_periodicities = els[0].getElementsByTagName(molecule_js_1.Periodicity.tagName);
            let periodicity;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                periodicity = new molecule_js_1.Periodicity((0, xml_js_1.getAttributes)(xml_periodicities[0]), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_periodicities[0]))));
            }
            extraDOSCMethod = new molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(els[0]), bondRef, hinderedRotorPotential, periodicity);
        }
        // Read reservoirSize.
        moleculeTagNames.delete(molecule_js_1.ReservoirSize.tagName);
        let reservoirSize;
        els = xml_molecules[i].getElementsByTagName(molecule_js_1.ReservoirSize.tagName);
        if (els.length > 0) {
            if (els.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + els.length);
            }
            reservoirSize = new molecule_js_1.ReservoirSize((0, xml_js_1.getAttributes)(els[0]), parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(els[0]))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
        }
        // Create molecule.
        let molecule = new molecule_js_1.Molecule(attributes, atomsNode, bondsNode, propertiesNode, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize);
        //console.log(molecule.toString());
        molecules.set(molecule.id, molecule);
    }
}
function addEventListenersToMolecules() {
    // Add event listeners to molecules.
    molecules.forEach(function (molecule, id) {
        // Energy input.
        let energyKey = id + "_energy";
        let energyInput = document.getElementById(energyKey);
        if (energyInput) {
            (0, html_js_1.resizeInput)(energyInput);
            energyInput.addEventListener('change', (event) => {
                let eventTarget = event.target;
                let inputValue = eventTarget.value;
                molecule.setEnergy(parseFloat(inputValue));
                console.log("Set energy of " + id + " to " + inputValue + " kJ/mol");
                (0, html_js_1.resizeInput)(energyInput);
            });
        }
        // RotConsts input.
        let rotConstsKey = id + "_rotConsts";
        let rotConstsInput = document.getElementById(rotConstsKey);
        if (rotConstsInput) {
            (0, html_js_1.resizeInput)(rotConstsInput);
            rotConstsInput.addEventListener('change', (event) => {
                let eventTarget = event.target;
                let inputValue = eventTarget.value;
                let rotConsts = [];
                let values = inputValue.split(/\s+/);
                values.forEach(function (value) {
                    rotConsts.push(parseFloat(value));
                });
                molecule.setRotConsts(rotConsts);
                console.log("Set rotConsts of " + id + " to " + inputValue);
                (0, html_js_1.resizeInput)(rotConstsInput);
            });
        }
        // VibFreqs input.
        let vibFreqsKey = id + "_vibFreqs";
        let vibFreqsInput = document.getElementById(vibFreqsKey);
        if (vibFreqsInput) {
            (0, html_js_1.resizeInput)(vibFreqsInput);
            vibFreqsInput.addEventListener('change', (event) => {
                let eventTarget = event.target;
                let inputValue = eventTarget.value;
                let vibFreqs = [];
                let values = inputValue.split(/\s+/);
                values.forEach(function (value) {
                    vibFreqs.push(parseFloat(value));
                });
                molecule.setVibFreqs(vibFreqs);
                console.log("Set vibFreqs of " + id + " to " + inputValue);
                (0, html_js_1.resizeInput)(vibFreqsInput);
            });
        }
    });
}
/**
 * @param xml_property The XML property element.
 * @returns The property.
 */
function getProperty(xml_property) {
    let attribs = (0, xml_js_1.getAttributes)(xml_property);
    let children = xml_property.children;
    if (children.length != 1) {
        throw new Error("Expecting 1 child but finding " + children.length);
    }
    let nodeAttributes = (0, xml_js_1.getAttributes)(children[0]);
    let nodeName = children[0].nodeName; // Expecting scalar or array
    let textContent = children[0].textContent;
    if (textContent == null) {
        console.error("nodeName");
        throw new Error('textContent is null');
    }
    textContent = textContent.trim();
    let dictRef = attribs.get("dictRef");
    //console.log("dictRef=" + dictRef);
    if (dictRef == null) {
        throw new Error('dictRef is null');
    }
    //console.log("fcnn=" + fcnn);
    if (nodeName == molecule_js_1.PropertyScalar.tagName) {
        let value = parseFloat(textContent);
        return new molecule_js_1.Property(attribs, new molecule_js_1.PropertyScalar(nodeAttributes, value));
    }
    else if (nodeName == molecule_js_1.PropertyArray.tagName) {
        return new molecule_js_1.Property(attribs, new molecule_js_1.PropertyArray(nodeAttributes, (0, util_js_2.toNumberArray)(textContent.split(/\s+/)), " "));
    }
    else if (nodeName == "matrix") {
        throw new Error("Unexpected nodeName: " + nodeName);
    }
    else {
        throw new Error("Unexpected nodeName: " + nodeName);
    }
}
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
                    if (!e.target) {
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
 * Set the title.
 * @param {XMLDocument} xml The XML document.
 */
function setTitle(xml) {
    me_title = xml.getElementsByTagName(me_title_s);
    if (me_title == null) {
        throw new Error(me_title_s + ' not found');
    }
    else {
        if (me_title.length != 1) {
            throw new Error('Multiple ' + me_title_s + ' elements found');
        }
        else {
            title = me_title[0].childNodes[0].nodeValue;
            title = title.trim();
            console.log("Title=" + title);
            let e = document.getElementById("title");
            if (e != null) {
                e.innerHTML = title;
            }
        }
    }
}
/**
 * Parse the XML.
 * @param {XMLDocument} xml
 */
function parse(xml) {
    /**
     * Set mesmer_xml start tag.
     */
    mesmerStartTag = "\n";
    let documentElement = xml.documentElement;
    if (documentElement == null) {
        throw new Error("Document element not found");
    }
    else {
        let tagName = documentElement.tagName;
        mesmerStartTag += "<" + tagName;
        console.log(tagName);
        mesmerEndTag = (0, xml_js_1.getEndTag)(tagName, "", true);
        let first = true;
        let pad = " ".repeat(tagName.length + 2);
        let names = documentElement.getAttributeNames();
        names.forEach(function (name) {
            let attribute = documentElement.getAttribute(name);
            let na = `${name}="${attribute}"`;
            if (first) {
                first = false;
                mesmerStartTag += " " + na;
            }
            else {
                mesmerStartTag += "\n" + pad + na;
            }
        });
        mesmerStartTag += ">";
        //console.log(mesmerStartTag);
    }
    /**
     *  Set title.
     */
    setTitle(xml);
    /**
     * Generate molecules table.
     */
    initMolecules(xml);
    displayMolecules();
    addEventListenersToMolecules();
    /**
     * Generate reactions table.
     */
    initReactions(xml);
    displayReactionsTable();
    displayReactionsDiagram();
    /**
     * Generate conditions table.
     */
    initConditions(xml);
    displayConditions();
    /**
     * Generate parameters table.
     */
    initModelParameters(xml);
    displayModelParameters();
    /**
     * Generate control table.
     */
    initControl(xml);
    displayControl();
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
    let xml_PTPairs = xml_PTs.getElementsByTagName(conditions_js_1.PTpair.tagName);
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
        pTs.push(new conditions_js_1.PTpair((0, xml_js_1.getAttributes)(xml_PTPairs[i]), pTBathGas, experimentRate));
        //console.log(pTs[i].toString()); // For debugging.
    }
    conditions = new conditions_js_1.Conditions((0, xml_js_1.getAttributes)(xml_conditions), bathGas, new conditions_js_1.PTs((0, xml_js_1.getAttributes)(xml_PTs), pTs));
}
let modelParameters;
/**
 * Parses xml to initialise modelParameters.
 * @param {XMLDocument} xml The XML document.
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
 * Parses xml to initialise reactions.
 * @param {XMLDocument} xml The XML document.
 */
function initReactions(xml) {
    let reactionList_s = 'reactionList';
    console.log(reactionList_s);
    let xml_reactionList = (0, xml_js_1.getSingularElement)(xml, reactionList_s);
    let xml_reactions = xml_reactionList.getElementsByTagName(reaction_js_1.Reaction.tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    // Process each reaction.
    if (xml_reactions_length == 0) {
        //return;
        throw new Error("No reactions: There should be at least 1!");
    }
    // Set reactions_title.
    reactions_title = document.getElementById("reactions_title");
    if (reactions_title != null) {
        reactions_title.innerHTML = "Reactions";
    }
    for (let i = 0; i < xml_reactions_length; i++) {
        let attributes = (0, xml_js_1.getAttributes)(xml_reactions[i]);
        let reactionID = attributes.get("id");
        if (reactionID == null) {
            throw new Error("reactionID is null");
        }
        if (reactionID != null) {
            console.log("id=" + reactionID);
            // Load reactants.
            let reactants;
            let xml_reactants = xml_reactions[i].getElementsByTagName(reaction_js_1.Reactant.tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            if (xml_reactants.length > 0) {
                if (xml_reactants.length < 2) {
                    let xml_molecule = (0, xml_js_1.getFirstElement)(xml_reactants[0], molecule_js_1.Molecule.tagName);
                    let twa = new xml_js_1.TagWithAttributes((0, xml_js_1.getAttributes)(xml_molecule), molecule_js_1.Molecule.tagName);
                    reactants = new reaction_js_1.Reactant((0, xml_js_1.getAttributes)(xml_reactants[0]), twa, molecules);
                }
                else {
                    reactants = new Map();
                    for (let j = 0; j < xml_reactants.length; j++) {
                        let xml_molecule = (0, xml_js_1.getFirstElement)(xml_reactants[j], molecule_js_1.Molecule.tagName);
                        let twa = new xml_js_1.TagWithAttributes((0, xml_js_1.getAttributes)(xml_molecule), molecule_js_1.Molecule.tagName);
                        let reactant = new reaction_js_1.Reactant((0, xml_js_1.getAttributes)(xml_reactants[j]), twa, molecules);
                        reactants.set(reactant.getRef(), reactant);
                    }
                }
            }
            // Load products.
            let products;
            let xml_products = xml_reactions[i].getElementsByTagName(reaction_js_1.Product.tagName);
            //console.log("xml_products.length=" + xml_products.length);
            if (xml_products.length > 0) {
                if (xml_products.length < 2) {
                    let xml_molecule = (0, xml_js_1.getFirstElement)(xml_products[0], molecule_js_1.Molecule.tagName);
                    let twa = new xml_js_1.TagWithAttributes((0, xml_js_1.getAttributes)(xml_molecule), molecule_js_1.Molecule.tagName);
                    products = new reaction_js_1.Product((0, xml_js_1.getAttributes)(xml_products[0]), twa, molecules);
                }
                else {
                    products = new Map();
                    for (let j = 0; j < xml_products.length; j++) {
                        let xml_molecule = (0, xml_js_1.getFirstElement)(xml_products[j], molecule_js_1.Molecule.tagName);
                        let twa = new xml_js_1.TagWithAttributes((0, xml_js_1.getAttributes)(xml_molecule), molecule_js_1.Molecule.tagName);
                        let product = new reaction_js_1.Product((0, xml_js_1.getAttributes)(xml_products[j]), twa, molecules);
                        products.set(product.getRef(), product);
                    }
                }
            }
            // Load transition states.
            //console.log("Load  transition states...");
            let xml_transitionState = xml_reactions[i].getElementsByTagName(reaction_js_1.TransitionState.tagName);
            let transitionStates;
            if (xml_transitionState.length > 0) {
                if (xml_transitionState.length < 2) {
                    let xml_molecule = xml_transitionState[0].getElementsByTagName(molecule_js_1.Molecule.tagName)[0];
                    let twa = new xml_js_1.TagWithAttributes((0, xml_js_1.getAttributes)(xml_molecule), molecule_js_1.Molecule.tagName);
                    transitionStates = new reaction_js_1.TransitionState((0, xml_js_1.getAttributes)(xml_transitionState[0]), twa, molecules);
                }
                else {
                    transitionStates = new Map();
                    for (let j = 0; j < xml_transitionState.length; j++) {
                        let xml_molecule = xml_transitionState[j].getElementsByTagName(molecule_js_1.Molecule.tagName)[0];
                        let twa = new xml_js_1.TagWithAttributes((0, xml_js_1.getAttributes)(xml_molecule), molecule_js_1.Molecule.tagName);
                        let transitionState = new reaction_js_1.TransitionState((0, xml_js_1.getAttributes)(xml_transitionState[j]), twa, molecules);
                        transitionStates.set(transitionState.getRef(), transitionState);
                    }
                }
            }
            //console.log("transitionStates=" + transitionStates);
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName(reaction_js_1.Tunneling.tagName);
            let tunneling;
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) {
                    throw new Error("Expecting 1 " + reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
                }
                tunneling = new reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
            }
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let mCRCMethod;
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName(reaction_js_1.MCRCMethod.tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) {
                    throw new Error("Expecting 1 " + reaction_js_1.MCRCMethod.tagName + " but finding " + xml_MCRCMethod.length + "!");
                }
                else {
                    let mCRCMethodAttributes = (0, xml_js_1.getAttributes)(xml_MCRCMethod[0]);
                    let name = mCRCMethodAttributes.get("name");
                    //console.log(MCRCMethod.tagName + " name=" + name);
                    if (name == undefined || name == reaction_js_1.MesmerILT.xsiType2) {
                        let type = mCRCMethodAttributes.get("xsi:type");
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        if (type != undefined) {
                            if (type == reaction_js_1.MesmerILT.xsiType || type == reaction_js_1.MesmerILT.xsiType2) {
                                let preExponential;
                                let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.PreExponential.tagName);
                                if (xml_preExponential != null) {
                                    if (xml_preExponential[0] != null) {
                                        let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_preExponential[0])));
                                        preExponential = new reaction_js_1.PreExponential((0, xml_js_1.getAttributes)(xml_preExponential[0]), value);
                                    }
                                }
                                //console.log("preExponential " + preExponential);
                                let activationEnergy;
                                let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.ActivationEnergy.tagName);
                                if (xml_activationEnergy != null) {
                                    if (xml_activationEnergy[0] != null) {
                                        let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_activationEnergy[0])));
                                        activationEnergy = new reaction_js_1.ActivationEnergy((0, xml_js_1.getAttributes)(xml_activationEnergy[0]), value);
                                    }
                                }
                                //console.log("activationEnergy " + activationEnergy);
                                let tInfinity;
                                let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.TInfinity.tagName);
                                if (xml_tInfinity != null) {
                                    if (xml_tInfinity[0] != null) {
                                        let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_tInfinity[0])));
                                        tInfinity = new reaction_js_1.NInfinity((0, xml_js_1.getAttributes)(xml_tInfinity[0]), value);
                                    }
                                }
                                //console.log("tInfinity " + tInfinity);
                                let nInfinity;
                                let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName(reaction_js_1.NInfinity.tagName);
                                if (xml_nInfinity != null) {
                                    if (xml_nInfinity[0] != null) {
                                        let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_nInfinity[0])));
                                        nInfinity = new reaction_js_1.NInfinity((0, xml_js_1.getAttributes)(xml_nInfinity[0]), value);
                                    }
                                }
                                //console.log("nInfinity " + nInfinity);
                                mCRCMethod = new reaction_js_1.MesmerILT(mCRCMethodAttributes, preExponential, activationEnergy, tInfinity, nInfinity);
                            }
                        }
                    }
                    else {
                        mCRCMethod = new reaction_js_1.MCRCMethod(mCRCMethodAttributes);
                    }
                }
            }
            // Load excessReactantConc
            let xml_excessReactantConc = xml_reactions[i].getElementsByTagName(reaction_js_1.ExcessReactantConc.tagName);
            let excessReactantConc;
            if (xml_excessReactantConc.length > 0) {
                if (xml_excessReactantConc.length > 1) {
                    throw new Error("Expecting 1 " + reaction_js_1.ExcessReactantConc.tagName + " but finding " + xml_excessReactantConc.length + "!");
                }
                let value = parseFloat((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_excessReactantConc[0])));
                excessReactantConc = new reaction_js_1.ExcessReactantConc((0, xml_js_1.getAttributes)(xml_excessReactantConc[0]), value);
            }
            // Create reaction.
            let reaction = new reaction_js_1.Reaction(attributes, reactionID, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc);
            reactions.set(reactionID, reaction);
            //console.log("reaction=" + reaction);
        }
    }
}
/**
 * Create a diagram.
 * @param {Map<string, Molecule>} molecules The molecules.
 * @param {Map<string, Reaction>} reactions The reactions.
 * @param {boolean} dark True for dark mode.
 * @returns {HTMLCanvasElement} The diagram.
 * @param {string} font The font to use.
 * @param {number} lw The line width of reactants, transition states and products.
 * @param {string} lwc The line width color to use.
 */
function drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc) {
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
        let reactionTransitionStates = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.add(reactantsLabel);
            if (products.has(reactantsLabel)) {
                intProducts.add(reactantsLabel);
            }
            let energy = reaction.getReactantsEnergy();
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
            let energy = reaction.getProductsEnergy();
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
                    if (reactionTransitionStates instanceof Map) {
                        reactionTransitionStates.forEach(function (ts, id) {
                            let tsn = ts.getRef();
                            transitionStates.add(tsn);
                            orders.set(tsn, i);
                            energy = ts.getMolecule().getEnergy();
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
                            energies.set(tsn, energy);
                            i++;
                        });
                    }
                    else {
                        let ts = reactionTransitionStates;
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    }
                    orders.set(productsLabel, i);
                    i++;
                }
            }
            else {
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) {
                        reactionTransitionStates.forEach(function (ts, id) {
                            let tsn = ts.getRef();
                            transitionStates.add(tsn);
                            orders.set(tsn, i);
                            energy = ts.getMolecule().getEnergy();
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
                            energies.set(tsn, energy);
                            i++;
                        });
                    }
                    else {
                        let ts = reactionTransitionStates;
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    }
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
        let reactionTransitionStates = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, util_js_1.get)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, util_js_1.get)(productsInXY, productsLabel);
        if (reactionTransitionStates != undefined) {
            if (reactionTransitionStates instanceof Map) {
                reactionTransitionStates.forEach(function (ts, id) {
                    let transitionState = ts;
                    let transitionStateLabel = transitionState.getRef();
                    let transitionStateInXY = (0, util_js_1.get)(transitionStatesInXY, transitionStateLabel);
                    (0, canvas_js_1.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                    let transitionStateOutXY = (0, util_js_1.get)(transitionStatesOutXY, transitionStateLabel);
                    (0, canvas_js_1.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
                });
            }
            else {
                let transitionState = reactionTransitionStates;
                let transitionStateLabel = transitionState.getRef();
                let transitionStateInXY = (0, util_js_1.get)(transitionStatesInXY, transitionStateLabel);
                (0, canvas_js_1.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, util_js_1.get)(transitionStatesOutXY, transitionStateLabel);
                (0, canvas_js_1.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            }
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
        let v;
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
 * Display molecules.
 */
function displayMolecules() {
    if (molecules.size == 0) {
        return;
    }
    molecules.forEach(function (molecule, id) {
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        // Energy.
        let energyNumber = molecule.getEnergy();
        let energy;
        if (energyNumber == null) {
            energy = "";
        }
        else {
            energy = energyNumber.toString();
        }
        let energyInputDiv = (0, html_js_1.getInput)("number", id + "_energy", (event) => {
            if (event.target instanceof HTMLInputElement) {
                setEnergy(event.target);
            }
        }, energy, "Energy");
        //console.log("energy=" + energy);
        // Rotation Constants.
        let rotationConstants = "";
        let rotConsts = molecule.getRotConsts();
        if (rotConsts != undefined) {
            rotationConstants = (0, util_js_2.arrayToString)(rotConsts, " ");
        }
        let rotConstsDiv = (0, html_js_1.getInput)("text", id + "_rotConst", (event) => {
            if (event.target instanceof HTMLInputElement) {
                setRotConst(event.target);
            }
        }, rotationConstants, "Rotation Constants");
        //console.log("rotationConstants=" + rotationConstants);
        // Vibration Frequencies.
        let vibrationFrequencies = "";
        let vibFreqs = molecule.getVibFreqs();
        if (vibFreqs != undefined) {
            vibrationFrequencies = (0, util_js_2.arrayToString)(vibFreqs, " ");
        }
        let vibFreqsDiv = (0, html_js_1.getInput)("text", id + "_vibFreqs", (event) => {
            if (event.target instanceof HTMLInputElement) {
                setVibFreqs(event.target);
            }
        }, vibrationFrequencies, "Vibration Frequencies");
        //console.log("vibrationFrequencies=" + vibrationFrequencies);
        // Create molecule detail div.
        let div = document.createElement("div");
        div.appendChild(energyInputDiv);
        div.appendChild(rotConstsDiv);
        div.appendChild(vibFreqsDiv);
        let moleculeDetailDiv = (0, html_js_1.getCollapsibleDiv)(div, id, id + "_details", "molecule");
        //let div2 = document.createElement("div");
        //moleculeDetailDiv.appendChild(div2);
        moleculesDiv = document.getElementById("moleculesList");
        if (moleculesDiv !== null) {
            let parentElement = document.getElementById('molecules');
            if (parentElement) {
                parentElement.appendChild(moleculeDetailDiv);
            }
        }
    });
    (0, html_js_1.makeCollapsible)();
}
/**
 * Display reactions table.
 */
function displayReactionsTable() {
    if (reactions.size == 0) {
        return;
    }
    // Prepare table headings.
    let reactionsTable = (0, html_js_1.getTH)(["ID", "Reactants", "Products", "Transition State",
        "PreExponential", "Activation Energy", "TInfinity", "NInfinity"]);
    reactions.forEach(function (reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        let reactants = reaction.getReactantsLabel() || "";
        let products = reaction.getProductsLabel() || "";
        let transitionState = "";
        let preExponential = "";
        let activationEnergy = "";
        let tInfinity = "";
        let nInfinity = "";
        let tSs = reaction.transitionStates;
        //console.log("tSs=" + tSs);
        if (tSs != undefined) {
            if (tSs instanceof Map) {
                // Join all names together.
                tSs.forEach(function (ts) {
                    let name = ts.getRef();
                    if (name != null) {
                        transitionState = name + " ";
                    }
                });
            }
            else {
                let ts = tSs;
                let name = ts.getRef();
                if (name != null) {
                    transitionState = name;
                }
            }
        }
        let mCRCMethod = reaction.getMCRCMethod();
        //console.log("mCRCMethod=" + mCRCMethod);
        //console.log("typeof mCRCMethod=" + typeof mCRCMethod);
        if (mCRCMethod != undefined) {
            if (mCRCMethod instanceof reaction_js_1.MesmerILT) {
                let mp = mCRCMethod.getPreExponential();
                if (mp != undefined) {
                    preExponential = mp.value.toString() + " "
                        + mp.attributes.get("units");
                }
                let ae = mCRCMethod.getActivationEnergy();
                if (ae != undefined) {
                    activationEnergy = ae.value.toString() + " "
                        + ae.attributes.get("units");
                }
                let ti = mCRCMethod.getTInfinity();
                if (ti != undefined) {
                    tInfinity = ti.value.toString();
                }
                let ni = mCRCMethod.getNInfinity();
                if (ni != undefined) {
                    nInfinity = ni.value.toString();
                }
            }
            else {
                if (mCRCMethod.attributes.get("name") == "RRKM") {
                }
                else {
                    console.log("Unexpected mCRCMethod: " + mCRCMethod);
                    throw new Error("Unexpected mCRCMethod: " + mCRCMethod);
                }
            }
        }
        // Complete table creation.
        reactionsTable += (0, html_js_1.getTR)((0, html_js_1.getTD)(id) + (0, html_js_1.getTD)(reactants) + (0, html_js_1.getTD)(products) + (0, html_js_1.getTD)(transitionState)
            + (0, html_js_1.getTD)(preExponential, true) + (0, html_js_1.getTD)(activationEnergy, true) + (0, html_js_1.getTD)(tInfinity, true)
            + (0, html_js_1.getTD)(nInfinity, true));
        reactions_table = document.getElementById("reactions_table");
        if (reactions_table !== null) {
            reactions_table.innerHTML = reactionsTable;
        }
    });
}
/**
 * Display reactions diagram.
 */
function displayReactionsDiagram() {
    if (reactions.size > 1) {
        // Set reactions_diagram_title.
        reactions_diagram_title = document.getElementById("reactions_diagram_title");
        if (reactions_diagram_title != null) {
            reactions_diagram_title.innerHTML = "Diagram";
        }
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc);
        }
    }
}
/**
 * Display conditions.
 */
function displayConditions() {
    let bathGas_element = document.getElementById("bathGas");
    if (bathGas_element != null) {
        bathGas_element.innerHTML = "Bath Gas " + conditions.getBathGas().value;
    }
    let pTs_element = document.getElementById("PT_table");
    let th = ["P", "T"];
    // If PTs contain BathGas
    let hasBathGas = conditions.getPTs().pTpairs.some(pair => {
        return pair.getBathGas() != undefined;
    });
    if (hasBathGas) {
        th.push("BathGas");
    }
    // Check if PTs contain ExperimentRate
    let hasExperimentRate = conditions.getPTs().pTpairs.some(pair => {
        return pair.getExperimentRate() != undefined;
    });
    if (hasExperimentRate) {
        th.push("ExperimentRate");
    }
    let table = (0, html_js_1.getTH)(th);
    if (pTs_element != null) {
        conditions.getPTs().pTpairs.forEach(function (pTpair) {
            table += (0, html_js_1.getTR)((0, html_js_1.getTD)(pTpair.getP().toString()) + (0, html_js_1.getTD)(pTpair.getT().toString()));
            if (hasBathGas) {
                table += (0, html_js_1.getTD)(pTpair.getBathGas()?.toString() ?? '');
            }
            if (hasExperimentRate) {
                table += (0, html_js_1.getTD)(pTpair.getExperimentRate()?.toString() ?? '');
            }
        });
        pTs_element.innerHTML = table;
    }
}
/**
 * Display modelParameters.
 */
function displayModelParameters() {
    let modelParameters_element = document.getElementById("modelParameters_table");
    let table = (0, html_js_1.getTH)(["Parameter", "Value"]);
    table += (0, html_js_1.getTR)((0, html_js_1.getTD)("Grain Size") + (0, html_js_1.getTD)(modelParameters.getGrainSize().value.toString()));
    table += (0, html_js_1.getTR)((0, html_js_1.getTD)("Energy Above The Top Hill") + (0, html_js_1.getTD)(modelParameters.getEnergyAboveTheTopHill().value.toString()));
    if (modelParameters_element != null) {
        modelParameters_element.innerHTML = table;
    }
}
/**
 * Display control.
 */
function displayControl() {
    let control_table_element = document.getElementById("control_table");
    let table = (0, html_js_1.getTH)(["Control", "Value"]);
    // TestDOS
    let testDOS = control.getTestDOS();
    if (testDOS != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.TestDOS.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintSpeciesProfile
    let printSpeciesProfile = control.getPrintSpeciesProfile();
    if (printSpeciesProfile != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintSpeciesProfile.tagName) + (0, html_js_1.getTD)(""));
    }
    // TestMicroRates
    let testMicroRates = control.getTestMicroRates();
    if (testMicroRates != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.TestMicroRates.tagName) + (0, html_js_1.getTD)(""));
    }
    // TestRateConstant
    let testRateConstant = control.getTestRateConstant();
    if (testRateConstant != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.TestRateConstant.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintGrainDOS
    let printGrainDOS = control.getPrintGrainDOS();
    if (printGrainDOS != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintGrainDOS.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintCellDOS
    let printCellDOS = control.getPrintCellDOS();
    if (printCellDOS != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintCellDOS.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintReactionOperatorColumnSums
    let printReactionOperatorColumnSums = control.getPrintReactionOperatorColumnSums();
    if (printReactionOperatorColumnSums != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintReactionOperatorColumnSums.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintTunnellingCoefficients
    let printTunnellingCoefficients = control.getPrintTunnellingCoefficients();
    if (printTunnellingCoefficients != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintTunnellingCoefficients.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintGrainkfE
    let printGrainkfE = control.getPrintGrainkfE();
    if (printGrainkfE != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintGrainkfE.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintGrainBoltzmann
    let printGrainBoltzmann = control.getPrintGrainBoltzmann();
    if (printGrainBoltzmann != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintGrainBoltzmann.tagName) + (0, html_js_1.getTD)(""));
    }
    // PrintGrainkbE
    let printGrainkbE = control.getPrintGrainkbE();
    if (printGrainkbE != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.PrintGrainkbE.tagName) + (0, html_js_1.getTD)(""));
    }
    // Eigenvalues
    let eigenvalues = control.getEigenvalues();
    if (eigenvalues != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.Eigenvalues.tagName) + (0, html_js_1.getTD)(eigenvalues.value.toString()));
    }
    // HideInactive
    let hideInactive = control.getHideInactive();
    if (hideInactive != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.HideInactive.tagName) + (0, html_js_1.getTD)(""));
    }
    // DiagramEnergyOffset
    let diagramEnergyOffset = control.getDiagramEnergyOffset();
    if (diagramEnergyOffset != undefined) {
        table += (0, html_js_1.getTR)((0, html_js_1.getTD)(control_js_1.DiagramEnergyOffset.tagName) + (0, html_js_1.getTD)(diagramEnergyOffset.value.toString()));
    }
    // Set the table.
    if (control_table_element != null) {
        control_table_element.innerHTML = table;
    }
}
/**
 * Set the energy of a molecule when the energy input value is changed.
 * @param input The input element.
 */
function setEnergy(input) {
    let id_energy = input.id;
    let moleculeID = id_energy.split("_")[0];
    let molecule = molecules.get(moleculeID);
    if (molecule) {
        if ((0, util_js_1.isNumeric)(input.value)) {
            let inputNumber = parseFloat(input.value);
            molecule.setEnergy(inputNumber);
            console.log("Energy of " + moleculeID + " set to " + inputNumber);
        }
        else {
            alert("Energy input for " + moleculeID + " is not numeric, resetting...");
            let inputElement = document.getElementById(id_energy);
            inputElement.value = molecule.getEnergy().toString();
        }
        //console.log("molecule=" + molecule);
    }
}
exports.setEnergy = setEnergy;
window.setEnergy = setEnergy;
/**
 * Set the rotation constants of a molecule when the rotation constants input value is changed.
 * @param input The input element.
 */
function setRotConst(input) {
    let id_rotConst = input.id;
    let moleculeID = id_rotConst.split("_")[0];
    let molecule = molecules.get(moleculeID);
    if (molecule) {
        let inputString = input.value;
        let values = inputString.split(/\s+/);
        let rotConsts = molecule.getRotConsts();
        //console.log("rotConsts=" + rotConsts);
        if (rotConsts) {
            let nRotConsts = rotConsts.length;
            let success = true;
            values.forEach(function (value) {
                if (!(0, util_js_1.isNumeric)(value)) {
                    success = false;
                }
            });
            if (!success) {
                alert("A rotation constant for " + moleculeID + " is not a number, resetting...");
                let inputElement = document.getElementById(id_rotConst);
                inputElement.value = (0, util_js_2.arrayToString)(rotConsts, " ");
                return;
            }
            if (values.length == nRotConsts) {
                let rotConstsNew = inputString.split(" ").map(Number);
                molecule.setRotConsts(rotConstsNew);
                console.log("Rotation constants of " + moleculeID + " changed from: " + rotConsts + " to: " + rotConstsNew);
                //console.log("molecule=" + molecule);
            }
            else {
                alert("Expecting " + nRotConsts + " rotation constants for " + moleculeID + " but finding " + values.length + " resetting...");
                let inputElement = document.getElementById(id_rotConst);
                inputElement.value = (0, util_js_2.arrayToString)(rotConsts, " ");
            }
        }
    }
}
exports.setRotConst = setRotConst;
window.setRotConst = setRotConst;
/**
 * Set the vibration frequencies of a molecule when the vibration frequencies input value is changed.
 * @param input The input element.
 */
function setVibFreqs(input) {
    let id_vibFreqs = input.id;
    let moleculeID = id_vibFreqs.split("_")[0];
    let molecule = molecules.get(moleculeID);
    if (molecule) {
        let inputString = input.value;
        let values = inputString.split(/\s+/);
        let vibFreqs = molecule.getVibFreqs();
        //console.log("vibFreqs=" + vibFreqs);
        if (vibFreqs) {
            let nVibFreqs = vibFreqs.length;
            let success = true;
            values.forEach(function (value) {
                if (!(0, util_js_1.isNumeric)(value)) {
                    success = false;
                }
            });
            if (!success) {
                alert("A vibration frequency for " + moleculeID + " is not a number, resetting...");
                let inputElement = document.getElementById(id_vibFreqs);
                inputElement.value = (0, util_js_2.arrayToString)(vibFreqs, " ");
                return;
            }
            if (values.length == nVibFreqs) {
                let vibFreqsNew = inputString.split(" ").map(Number);
                molecule.setVibFreqs(vibFreqsNew);
                console.log("Vibration frequencies of " + moleculeID + " changed from: " + vibFreqs + " to: " + vibFreqsNew);
                //console.log("molecule=" + molecule);
            }
            else {
                alert("Expecting " + nVibFreqs + " vibration frequencies for " + moleculeID + " but finding " + values.length + " resetting...");
                let inputElement = document.getElementById(id_vibFreqs);
                inputElement.value = (0, util_js_2.arrayToString)(vibFreqs, " ");
            }
        }
    }
}
exports.setVibFreqs = setVibFreqs;
window.setVibFreqs = setVibFreqs;
/**
 * Save to XML file.
 */
window.saveXML = function () {
    console.log("saveXML");
    const pad = "  ";
    let level;
    const padding2 = pad.repeat(2);
    // Create me.title.
    let title_xml = "\n" + pad + (0, xml_js_1.getTag)(title, "me:title");
    // Create moleculeList.
    level = 2;
    let moleculeList = "";
    molecules.forEach(function (molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
        //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = (0, xml_js_1.getTag)(moleculeList, "moleculeList", undefined, pad, true);
    // Create reactionList.
    level = 2;
    let reactionList = "";
    reactions.forEach(function (reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
        //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = (0, xml_js_1.getTag)(reactionList, "reactionList", undefined, pad, true);
    // Create me.Conditions
    let xml_conditions = conditions.toXML(pad, pad);
    // Create modelParameters
    let xml_modelParameters = modelParameters.toXML(pad, pad);
    // create me.control
    let xml_control = control.toXML(pad, pad);
    // Create a new Blob object from the data
    let blob = new Blob([header, mesmerStartTag, title_xml, moleculeList, reactionList,
        xml_conditions, xml_modelParameters, xml_control, mesmerEndTag], { type: "text/plain" });
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