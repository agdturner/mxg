import {
    get, isNumeric, mapToString, rescale, setToString
} from './util.js';

import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getTag, getEndTag,
    getAttributes, toHTML, getSingularElement, TagWithAttributes, NodeWithNodes, Tag, StringNode, NumberArrayNode, NumberNode
} from './xml.js';

import {
    Molecule, Atom, Bond, EnergyTransferModel, DeltaEDown, DOSCMethod, Property, AtomArray, BondArray, PropertyList, PropertyScalar, PropertyArray, ExtraDOSCMethod, BondRef, HinderedRotorPotential, PotentialPoint, Periodicity, ReservoirSize, ZPE, RotConsts, VibFreqs
} from './molecule.js';

import {
    Reaction, TransitionState, ReactionMolecule, Reactant, Product, MCRCMethod, MesmerILT,
    PreExponential, ActivationEnergy, NInfinity, Tunneling, TInfinity, ExcessReactantConc
} from './reaction.js';

import {
    arrayToString, toNumberArray
} from './util.js';

import {
    getInput, makeCollapsible, getCollapsibleDiv, resizeInputElement, getSelectElement, resizeSelectElement
} from './html.js';

import {
    drawLevel, drawLine, getTextHeight, getTextWidth
} from './canvas.js';

import {
    BathGas, Conditions, ExperimentRate, PTpair, PTs
} from './conditions.js';

import {
    EnergyAboveTheTopHill, GrainSize, ModelParameters
} from './modelParameters.js';

import {
    Control, DiagramEnergyOffset, Eigenvalues, HideInactive, TestDOS, PrintSpeciesProfile,
    TestMicroRates, TestRateConstant, PrintGrainDOS, PrintCellDOS, PrintReactionOperatorColumnSums,
    PrintTunnellingCoefficients, PrintGrainkfE, PrintGrainBoltzmann, PrintGrainkbE
} from './control.js';
import { Mesmer, MoleculeList, ReactionList, Title } from './mesmer.js';

/**
 * Extend the global Window interface so that the functions can be called using:
 * window.loadXML() and window.saveXML()
 */
declare global {
    interface Window {
        loadXML(): void;
        saveXML(): void;
    }
}

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
let margin0: string = "0px";
let margin1: string = "1px";
let margin2: string = "2px";
let margin5: string = "5px";
let margin25: string = "25px";
let margin50: string = "50px";
let margin75: string = "75px";
let margin100: string = "100px";
let margin125: string = "125px";

/**
 * Units for different things.
 */
let unitsEnergy: string[] = ["kJ/mol", "cm-1", "kcal/mol", "Hartree"];
let unitsRotConsts: string[] = ["cm-1", "GHz"];

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
 * The conditions.
 */
let conditions: Conditions;

/**
 * The model parameters.
 */
let modelParameters: ModelParameters;

/**
 * The control.
 */
let control: Control;

/**
 * The filename of the mesmer input file loaded.
 */
let input_xml_filename: string;

/**
 * The load button.
 */
let loadButton: HTMLElement | null;

/**
 * The save button.
 */
let saveButton: HTMLElement | null;

/**
 * The XML title and text elements.
 */
let xml_title: HTMLElement | null;
let xml_text: HTMLElement | null;

/**
 * Load the XML file.
 */
function loadXML() {
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
    }
});


/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */
function parse(xml: XMLDocument) {

    // Process the XML.
    let xml_mesmer: Element = getSingularElement(xml, Mesmer.tagName);
    mesmer = new Mesmer(getAttributes(xml_mesmer));

    // Title.
    let xml_title: HTMLCollectionOf<Element> = xml.getElementsByTagName(Title.tagName) as HTMLCollectionOf<Element>;
    if (xml_title.length != 1) {
        throw new Error('Multiple ' + Title.tagName + ' tags found');
    } else {
        let title = (xml_title[0].childNodes[0].nodeValue as string).trim();
        let titleNode: Title = new Title(getAttributes(xml_title[0]), title);
        let titleElement: HTMLElement = document.getElementById("title") as HTMLElement;
        mesmer.setTitle(titleNode);
        // Create a new div element for the input.
        let divElement = document.createElement("div");
        divElement.style.marginTop = margin1;
        divElement.style.marginBottom = margin1;
        // Create a text node.
        let textNode = document.createTextNode("Title: ");
        divElement.appendChild(textNode);
        // Create a new input element.
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = title;
        inputElement.style.fontSize = fontSize1;
        divElement.appendChild(inputElement);
        // Add the new div element to the parent of the titleElement.
        titleElement.parentNode?.insertBefore(divElement, titleElement);
        // Remove the original titleElement.
        titleElement.parentNode?.removeChild(titleElement);
        resizeInputElement(inputElement, 0);
        console.log("inputElement.value=" + inputElement.value);
        // Add event listener to inputElement.
        inputElement.addEventListener('change', function () {
            if (inputElement.value != title) {
                titleNode.value = inputElement.value;
            }
            resizeInputElement(inputElement, 0);
        });
        // Create a collapsible div for molecules
        let moleculesElement: HTMLElement | null = document.getElementById("molecules");
        if (moleculesElement == null) {
            // Create a molecules section from scratch?
        } else {
            let moleculeListElement: HTMLDivElement = processMoleculeList(xml);
            moleculesElement.appendChild(getCollapsibleDiv(moleculeListElement, "Molecules", "molecules_button", fontSize1, margin0, margin1, margin1, "moleculesList"));
            mesmer.setMoleculeList(new MoleculeList(getAttributes(moleculeListElement), Array.from(molecules.values())));
        }
        // Create a collapsible div for reactions
        let reactionsElement: HTMLElement | null = document.getElementById("reactions");
        if (reactionsElement == null) {
            // Create a reactions section from scratch?
        } else {
            let reactionListElement: HTMLDivElement = processReactionList(xml);
            reactionsElement.appendChild(getCollapsibleDiv(reactionListElement, "Reactions", "reactions_button", fontSize1, margin0, margin1, margin1, "reactionsList"));
            mesmer.setReactionList(new ReactionList(getAttributes(reactionListElement), Array.from(reactions.values())));
        }
        // Display reaction diagram. 
        displayReactionsDiagram();

        // Create a collapsible div for conditions
        let conditionsElement: HTMLElement | null = document.getElementById("conditions");
        if (conditionsElement == null) {
            // Create a conditions section from scratch?
        } else {
            let conditionsListElement: HTMLDivElement = processConditions(xml);
            conditionsElement.appendChild(getCollapsibleDiv(conditionsListElement, "Conditions", "conditions_button", fontSize1, margin0, margin1, margin1, "conditionsList"));
            mesmer.setConditions(conditions);
        }

        // Create a collapsible div for model parameters
        let modelParametersElement: HTMLElement | null = document.getElementById("modelParameters");
        if (modelParametersElement == null) {
            // Create a model parameters section from scratch?
        } else {
            let modelParametersListElement: HTMLDivElement = processModelParameters(xml);
            modelParametersElement.appendChild(getCollapsibleDiv(modelParametersListElement, "Model Parameters", "modelParameters_button", fontSize1, margin0, margin1, margin1, "modelParametersList"));
            mesmer.setModelParameters(modelParameters);
        }

        // Create a collapsible div for control
        let controlElement: HTMLElement | null = document.getElementById("control");
        if (controlElement == null) {
            // Create a control section from scratch?
        } else {
            let controlListElement: HTMLDivElement = processControl(xml);
            controlElement.appendChild(getCollapsibleDiv(controlListElement, "Control", "control_button", fontSize1, margin0, margin1, margin1, "controlList"));
            mesmer.setControl(control);
        }
        // Collapse and set up action listeners for all collapsible content.
        makeCollapsible();
    }
}

/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml: XMLDocument): HTMLDivElement {
    // Create div to contain the molecules list.
    let moleculeListDiv: HTMLDivElement = document.createElement("div");
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
        let moleculeDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
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
            let buttonId: string = molecule.id + "_" + PropertyList.tagName;
            let contentDivId: string = molecule.id + "_" + PropertyList.tagName + "_";
            let collapsibleDiv: HTMLDivElement = getCollapsibleDiv(plDiv, PropertyList.tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
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
                    processProperty(p, unitsEnergy, molecule, xml_Ps[j], plDiv, margin75);
                } else if (p.dictRef == RotConsts.dictRef) {
                    processProperty(p, unitsRotConsts, molecule, xml_Ps[j], plDiv, margin75);
                } else {
                    processProperty(p, undefined, molecule, xml_Ps[j], plDiv, margin75);
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
                processProperty(p, unitsEnergy, molecule, xml_Ps[0], moleculeDiv, margin75);
            } else if (p.dictRef == RotConsts.dictRef) {
                processProperty(p, unitsRotConsts, molecule, xml_Ps[0], moleculeDiv, margin75);
            } else {
                processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, margin75);
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
            processDOSCMethod(dOSCMethod, molecule, margin50, moleculeDiv);
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
            let buttonId: string = molecule.id + "_" + ExtraDOSCMethod.tagName;
            let contentDivId: string = molecule.id + "_" + ExtraDOSCMethod.tagName + "_";
            let extraDOSCMethodCollapsibleDiv: HTMLDivElement = getCollapsibleDiv(extraDOSCMethodDiv, ExtraDOSCMethod.tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            moleculeDiv.appendChild(extraDOSCMethodCollapsibleDiv);
            // Read bondRef.
            let xml_bondRefs: HTMLCollectionOf<Element> = xml_ExtraDOSCMethod[0].getElementsByTagName(BondRef.tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                }
                let container: HTMLDivElement = document.createElement("div");
                container.style.marginLeft = margin75;
                container.style.marginTop = margin1;
                container.style.marginBottom = margin1;
                let label: HTMLLabelElement = document.createElement("label");
                label.textContent = BondRef.tagName + ": ";
                container.appendChild(label);
                let bondRef: BondRef = new BondRef(getAttributes(xml_bondRefs[0]), getNodeValue(getFirstChildNode(xml_bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
                // Create a HTMLSelectElement to select the bondRef.
                let bondIds : Set<string> = (molecule.getBonds() as BondArray).getBondIds();
                let selectElement: HTMLSelectElement = getSelectElement(bondIds, bondRef.value, molecule.id + "_" + BondRef.tagName);
                selectElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLSelectElement) {
                        bondRef.value = event.target.value;
                        resizeSelectElement(event.target);
                    }
                });
                resizeSelectElement(selectElement);
                container.appendChild(selectElement);
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
                let hinderedRotorPotentialDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
                let buttonId: string = molecule.id + "_" + HinderedRotorPotential.tagName;
                let contentDivId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName;
                let hinderedRotorPotentialCollapsibleDiv: HTMLDivElement = getCollapsibleDiv(hinderedRotorPotentialDiv, HinderedRotorPotential.tagName, buttonId, fontSize3, margin75, margin1, margin1, contentDivId);
                //hinderedRotorPotentialCollapsibleDiv.style.marginLeft = margin100;
                hinderedRotorPotentialCollapsibleDiv.style.marginTop = margin1;
                hinderedRotorPotentialCollapsibleDiv.style.marginBottom = margin1;
                extraDOSCMethodDiv.appendChild(hinderedRotorPotentialCollapsibleDiv);
                // Formats
                let formatLabel: HTMLLabelElement = document.createElement("label");
                formatLabel.style.marginLeft = margin100;
                formatLabel.style.marginTop = margin1;
                formatLabel.style.marginBottom = margin1;
                formatLabel.textContent = "Format: ";
                hinderedRotorPotentialDiv.appendChild(formatLabel);
                let selectElement: HTMLSelectElement = getSelectElement(HinderedRotorPotential.formats, 
                    hinderedRotorPotential.format, molecule.id + "_" + HinderedRotorPotential.tagName);
                selectElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLSelectElement) {
                        hinderedRotorPotential.format = event.target.value;
                        resizeSelectElement(event.target);
                    }
                });
                resizeSelectElement(selectElement);
                hinderedRotorPotentialDiv.appendChild(selectElement);
                // Add any units.
                let unitsLabel: HTMLLabelElement = document.createElement("label");
                unitsLabel.textContent = "Units: ";
                unitsLabel.style.marginLeft = margin2;
                unitsLabel.style.marginTop = margin1;
                unitsLabel.style.marginBottom = margin1;
                hinderedRotorPotentialDiv.appendChild(unitsLabel);
                addAnyUnits(HinderedRotorPotential.units, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, 
                    molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName, 
                    HinderedRotorPotential.tagName, margin2, margin1, margin1);
                // Add expansionSize.
                let expansionSizeLabel: HTMLLabelElement = document.createElement("label");
                expansionSizeLabel.style.marginLeft = margin2;
                expansionSizeLabel.style.marginTop = margin1;
                expansionSizeLabel.style.marginBottom = margin1;
                expansionSizeLabel.textContent = "Expansion size: ";
                hinderedRotorPotentialDiv.appendChild(expansionSizeLabel);
                let expansionSizeInputElement: HTMLInputElement = document.createElement("input");
                expansionSizeInputElement.type = "number";
                expansionSizeInputElement.style.marginLeft = margin2;
                expansionSizeInputElement.style.marginTop = margin1;
                expansionSizeInputElement.style.marginBottom = margin1;
                expansionSizeInputElement.id = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_expansionSize";
                expansionSizeInputElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        // Check the input is a number.
                        if (isNumeric(event.target.value)) {
                            hinderedRotorPotential.setExpansionSize(parseInt(event.target.value));
                        } else {
                            // Reset the input to the current value.
                            alert("Expansion size input is not a number, resetting...");
                            expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                            console.warn("Expansion size input is not a number.");
                        }
                        resizeInputElement(expansionSizeInputElement);
                    }
                });
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                resizeInputElement(expansionSizeInputElement);
                hinderedRotorPotentialDiv.appendChild(expansionSizeInputElement);
                // Add useSineTerms.
                let useSineTermsLabel: HTMLLabelElement = document.createElement("label");
                useSineTermsLabel.style.marginLeft = margin2;
                useSineTermsLabel.style.marginTop = margin1;
                useSineTermsLabel.style.marginBottom = margin1;
                useSineTermsLabel.textContent = "Use sine terms: ";
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInput: HTMLInputElement = document.createElement("input");
                useSineTermsInput.type = "checkbox";
                useSineTermsInput.style.marginLeft = margin2;
                useSineTermsInput.style.marginTop = margin1;
                useSineTermsInput.style.marginBottom = margin1;
                useSineTermsInput.id = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_useSineTerms";
                useSineTermsInput.checked = hinderedRotorPotential.getUseSineTerms();
                useSineTermsInput.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        hinderedRotorPotential.setUseSineTerms(event.target.checked);
                    }
                });
                hinderedRotorPotentialDiv.appendChild(useSineTermsInput);
                // Load PotentialPoints.
                // Create a new collapsible div for the potential points.
                let potentialPointsDiv: HTMLDivElement = document.createElement("div");
                let potentialPointButtonId: string = molecule.id + "_" + HinderedRotorPotential.tagName + "_" + PotentialPoint.tagName;
                let potentialPointContentDivId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_" + PotentialPoint.tagName;
                let potentialPointCollapsibleDiv: HTMLDivElement = getCollapsibleDiv(potentialPointsDiv, PotentialPoint.tagName,
                     potentialPointButtonId, fontSize3, margin100, margin1, margin1, potentialPointContentDivId);
                hinderedRotorPotentialDiv.appendChild(potentialPointCollapsibleDiv);
                let potentialPoints: PotentialPoint[] = [];
                let xml_potentialPoints: HTMLCollectionOf<Element> = xml_hinderedRotorPotentials[0].getElementsByTagName(PotentialPoint.tagName);
                for (let k = 0; k < xml_potentialPoints.length; k++) {
                    let potentialPoint: PotentialPoint = new PotentialPoint(getAttributes(xml_potentialPoints[k]));
                    potentialPoints.push(potentialPoint);
                    let potentialPointDiv: HTMLDivElement = document.createElement("div");
                    potentialPointDiv.style.marginLeft = margin125;
                    potentialPointDiv.style.marginTop = margin1;
                    potentialPointDiv.style.marginBottom = margin1;
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    potentialPointDiv.style.display = 'flex';
                    // Process angle
                    let angleLabel: HTMLLabelElement = document.createElement("label");
                    angleLabel.textContent = "Angle: ";
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElement: HTMLInputElement = document.createElement("input");
                    angleInputElement.type = "number";
                    angleInputElement.style.marginLeft = margin2;
                    angleInputElement.style.marginTop = margin1;
                    angleInputElement.style.marginBottom = margin1;
                    angleInputElement.id = molecule.id + "_" + PotentialPoint.tagName + "_angle";
                    angleInputElement.addEventListener('change', (event) => {
                        if (event.target instanceof HTMLInputElement) {
                            // Check the input is a number.
                            if (isNumeric(event.target.value)) {
                                potentialPoint.setAngle(parseFloat(event.target.value));
                            } else {
                                // Reset the input to the current value.
                                alert("Angle input is not a number, resetting...");
                                angleInputElement.value = potentialPoint.getAngle().toString();
                                console.warn("Angle input is not a number.");
                            }
                            resizeInputElement(angleInputElement);
                        }
                    });
                    angleInputElement.value = potentialPoint.getAngle().toString();
                    resizeInputElement(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel: HTMLLabelElement = document.createElement("label");
                    potentialLabel.style.marginLeft = margin2;
                    potentialLabel.style.marginTop = margin1;
                    potentialLabel.style.marginBottom = margin1;
                    potentialLabel.textContent = "Potential: ";
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElement: HTMLInputElement = document.createElement("input");
                    potentialInputElement.style.marginLeft = margin2;
                    potentialInputElement.style.marginTop = margin1;
                    potentialInputElement.style.marginBottom = margin1;
                    potentialInputElement.type = "number";
                    potentialInputElement.id = molecule.id + "_" + PotentialPoint.tagName + "_potential";
                    potentialInputElement.addEventListener('change', (event) => {
                        if (event.target instanceof HTMLInputElement) {
                            // Check the input is a number.
                            if (isNumeric(event.target.value)) {
                                potentialPoint.setPotential(parseFloat(event.target.value));
                            } else {
                                // Reset the input to the current value.
                                alert("Potential input is not a number, resetting...");
                                potentialInputElement.value = potentialPoint.getPotential().toString();
                                console.warn("Potential input is not a number.");
                            }
                            resizeInputElement(potentialInputElement);
                        }
                    });
                    potentialInputElement.value = potentialPoint.getPotential().toString();
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
                // Create a container for the periodicity.
                let container: HTMLDivElement = document.createElement("div");
                container.style.marginLeft = margin75;
                container.style.marginTop = margin1;
                container.style.marginBottom = margin1;
                let label: HTMLLabelElement = document.createElement("label");
                label.textContent = Periodicity.tagName + ": ";
                container.appendChild(label);
                // Create a new div element for the input.
                let inputDiv: HTMLDivElement = getInput("number", molecule.id + "_" + Periodicity.tagName, (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        periodicity.value = parseFloat(event.target.value);
                    }
                }, valueString, Periodicity.tagName);
                container.appendChild(inputDiv);
                extraDOSCMethodDiv.appendChild(container);
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
            molecule.setReservoirSize(new ReservoirSize(getAttributes(xml_ReservoirSize[0]), parseFloat(valueString)));
            
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {

            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));

            //throw new Error("Unexpected tags in molecule.");
        }
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = getCollapsibleDiv(moleculeDiv, molecule.getLabel(), molecule.tagName + "_" + molecule.id + "_button",
            fontSize2, margin25, margin1, margin1,
            molecule.tagName + "_" + molecule.id);
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}

/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xml: string) {
    //console.log("xml=" + xml);
    if (xml_title != null) {
        xml_title.innerHTML = input_xml_filename;
    }
    if (xml_text != null) {
        xml_text.innerHTML = toHTML(xml);
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
function processProperty(p: Property, units: string[] | undefined, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement, margin: string) {
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
        let inputDiv: HTMLDivElement = getInput("number", molecule.id + "_" + p.dictRef, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(ps, event.target);
            }
        }, inputString, label);
        inputDiv.style.marginLeft = margin;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
        inputElement.value = inputString;
        resizeInputElement(inputElement);
        inputElement.addEventListener('change', (event) => {
            let eventTarget = event.target as HTMLInputElement;
            inputString = eventTarget.value;
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
                displayReactionsDiagram();
            }
        });
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, margin2, margin1, margin1);
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
            let inputDiv: HTMLDivElement = getInput("text", molecule.id + "_" + p.dictRef, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberArrayNode(pa, event.target);
                }
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = margin1;
            inputDiv.style.marginBottom = margin1;
            let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
            inputElement.value = inputString;
            resizeInputElement(inputElement);
            inputElement.addEventListener('change', (event) => {
                let eventTarget = event.target as HTMLInputElement;
                inputString = eventTarget.value;
                pa = p.getProperty() as PropertyArray;
                values = toNumberArray(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                resizeInputElement(inputElement);
            });
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, margin2, margin1, margin1);
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
    id: string, tagOrDictRef: string, marginLeft: string, marginTop: string, marginBottom: string) {
    if (units != undefined) {
        let unitsSelectElement: HTMLSelectElement | undefined = getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            unitsSelectElement.style.marginLeft = marginLeft;
            unitsSelectElement.style.marginTop = marginTop;
            unitsSelectElement.style.marginBottom = marginBottom;
            inputDiv.appendChild(unitsSelectElement);
        }
    } else {
        let units: string | undefined = attributes.get("units");
        if (units != undefined) {
            let label: HTMLLabelElement = document.createElement('label');
            label.textContent = units;
            label.style.marginLeft = marginLeft;
            label.style.marginTop = marginTop;
            label.style.marginBottom = marginBottom;
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
        let selectElement: HTMLSelectElement = getSelectElement(units, "Units", id);
        // Set the initial value to the units.
        selectElement.value = psUnits;
        // Add event listener to selectElement.
        resizeSelectElement(selectElement);
        selectElement.addEventListener('change', (event) => {
            if (event.target instanceof HTMLSelectElement) {
                attributes.set("units", event.target.value);
                console.log("Set " + tagOrDictRef + " units to " + event.target.value);
            }
            resizeSelectElement(selectElement);
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
function processDOSCMethod(dOSCMethod: DOSCMethod, molecule: Molecule, margin: string, moleculeDiv: HTMLDivElement): void {
    let label: HTMLLabelElement = document.createElement('label');
    label.textContent = DOSCMethod.tagName + ": ";
    let container: HTMLDivElement = document.createElement('div');
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options: string[] = ["ClassicalRotors", "me:QMRotors", "QMRotors"];
    let selectElement: HTMLSelectElement = getSelectElement(options, "DOSCMethod", molecule.id + "_" + 'Select_DOSCMethod');
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
    container.style.marginTop = margin1;
    container.style.marginBottom = margin1;
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
        let buttonId: string = molecule.id + "_" + EnergyTransferModel.tagName;
        let contentDivId: string = molecule.id + "_" + EnergyTransferModel.tagName + "_";
        let collapsibleDiv = getCollapsibleDiv(etmDiv, EnergyTransferModel.tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
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
            let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberNode(deltaEDown, event.target);
                }
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = margin1;
            inputDiv.style.marginBottom = margin1;
            etmDiv.appendChild(inputDiv);
            let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
            inputElement.value = inputString;
            resizeInputElement(inputElement);
            inputElement.addEventListener('change', (event) => {
                let eventTarget = event.target as HTMLInputElement;
                inputString = eventTarget.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                resizeInputElement(inputElement);
            });
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
    let inputId: string = input.id;
    let inputString: string = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        let input = document.getElementById(inputId) as HTMLInputElement;
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
        let input = document.getElementById(inputId) as HTMLInputElement;
        input.value = arrayToString(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        console.log("Changed " + node.tagName + " from: \"" + inputString + "\" to: \"" + arrayToString(node.values, " ") + "\"");
        //console.log("molecule=" + molecule);
    } else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        let input = document.getElementById(inputId) as HTMLInputElement;
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
    let inputId: string = input.id;
    //let moleculeID: string = inputId.split("_")[0];
    //let molecule: Molecule | undefined = molecules.get(moleculeID);
    //if (molecule != undefined) {
    if (isNumeric(input.value)) {
        let inputNumber: number = parseFloat(input.value);
        node.value = inputNumber;
        console.log("Value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        let inputElement = document.getElementById(inputId) as HTMLInputElement;
        inputElement.value = node.value.toString();
    }
    //console.log("molecule=" + molecule);
    //}
}

(window as any).set = setNumberNode;

/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml: XMLDocument): HTMLDivElement {
    // Create div to contain the reaction list.
    let reactionListDiv: HTMLDivElement = document.createElement("div");
    reactionListDiv.style.marginTop = margin1;
    reactionListDiv.style.marginBottom = margin1;
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
        let reactionDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        // Set attributes.
        let attributes: Map<string, string> = getAttributes(xml_reactions[i]);
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
        let reaction = new Reaction(attributes);
        reactions.set(reaction.id, reaction);

        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Reactant.tagName);
        reactionTagNames.delete(Reactant.tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new div for the reactants.
            let reactantsDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
            let reactants: Reactant[] = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                let reactant: Reactant = new Reactant(getAttributes(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
                let label: HTMLLabelElement = document.createElement('label');
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options: string[] = ["deficientReactant", "excessReactant", "modelled"];
                let selectElement: HTMLSelectElement = getSelectElement(options, "Role", molecule.ref + "_" + 'Select_Role');
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
                container.style.marginLeft = margin75;
                container.style.marginTop = margin1;
                container.style.marginBottom = margin1;
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let buttonId: string = reaction.id + "_" + Reactant.tagName;
            let contentDivId: string = reaction.id + "_" + Reactant.tagName + "_";
            let collapsibleDiv: HTMLDivElement = getCollapsibleDiv(reactantsDiv, "Reactants", buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
                // Create a new div for the role.
                let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
                let label: HTMLLabelElement = document.createElement('label');
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options: string[] = ["modelled", "sink"];
                let selectElement: HTMLSelectElement = getSelectElement(options, "Role", molecule.ref + "_" + 'Select_Role');
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
                container.style.marginLeft = margin75;
                container.style.marginTop = margin1;
                container.style.marginBottom = margin1;
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create a new collapsible div for the products.
            let buttonId: string = reaction.id + "_" + Product.tagName;
            let contentDivId: string = reaction.id + "_" + Product.tagName + "_";
            let collapsibleDiv: HTMLDivElement = getCollapsibleDiv(productsDiv, "Products", buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
            let selectElement: HTMLSelectElement = getSelectElement(options, "Tunneling", reaction.id + "_" + 'Select_Tunneling');
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
            container.style.marginLeft = margin50;
            container.style.marginTop = margin1;
            container.style.marginBottom = margin1;
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
                let label: HTMLLabelElement = document.createElement('label');
                label.textContent = molecule.ref + " role: transitionState";
                label.style.marginLeft = margin75;
                label.style.marginTop = margin1;
                label.style.marginBottom = margin1;
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let buttonId: string = reaction.id + "_" + TransitionState.tagName;
            let contentDivId: string = reaction.id + "_" + TransitionState.tagName + "_";
            let collapsibleDiv: HTMLDivElement = getCollapsibleDiv(transitionStatesDiv, "Transition States", buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
                                let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(preExponential, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target as HTMLInputElement;
                                    inputString = eventTarget.value;
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + PreExponential.tagName,
                                    PreExponential.tagName, margin2, margin1, margin1);
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
                                let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(activationEnergy, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target as HTMLInputElement;
                                    inputString = eventTarget.value;
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + ActivationEnergy.tagName,
                                    ActivationEnergy.tagName, margin2, margin1, margin1);
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
                                let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(tInfinity, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target as HTMLInputElement;
                                    inputString = eventTarget.value;
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + TInfinity.tagName,
                                    TInfinity.tagName, margin2, margin1, margin1);
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
                                let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(nInfinity, event.target);
                                    }
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let eventTarget = event.target as HTMLInputElement;
                                    inputString = eventTarget.value;
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + MesmerILT.xsiType + "_" + NInfinity.tagName, NInfinity.tagName,
                                    margin2, margin1, margin1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let buttonId: string = reaction.id + "_" + MCRCMethod.tagName;
                        let contentDivId: string = reaction.id + "_" + MCRCMethod.tagName + "_";
                        let collapsibleDiv: HTMLDivElement = getCollapsibleDiv(mCRCMethodDiv, MCRCMethod.tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
                        reactionDiv.appendChild(collapsibleDiv);
                    } else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                } else {
                    mCRCMethod = new MCRCMethod(mCRCMethodAttributes);
                    let mCRCMethodLabel: HTMLLabelElement = document.createElement('label');
                    mCRCMethodLabel.textContent = MCRCMethod.tagName + ": " + mCRCMethodAttributes.get("name") as string;
                    mCRCMethodLabel.style.marginLeft = margin50;
                    mCRCMethodLabel.style.marginTop = margin1;
                    mCRCMethodLabel.style.marginBottom = margin1;
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
            let excessReactantConc: ExcessReactantConc | undefined;
            let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_excessReactantConc[0])));
            excessReactantConc = new ExcessReactantConc(getAttributes(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
        }
        // Create a new collapsible div for the reaction.
        let collapsibleDiv = getCollapsibleDiv(reactionDiv, reaction.id + "(" + reaction.getLabel() + ")", reaction.tagName + "_" + reaction.id + "_button",
            fontSize2, margin25, margin1, margin1, reaction.tagName + "_" + reaction.id);
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(collapsibleDiv);
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
    let conditionsDiv: HTMLDivElement = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_conditions: Element = getSingularElement(xml, Conditions.tagName);
    conditions = new Conditions(getAttributes(xml_conditions));

    // Process any "bathGas" elements that are immediate children of xml_conditions.
    let xml_bathGases: Element[] = Array.from(xml_conditions.children).filter(child => child.tagName === BathGas.tagName);
    if (xml_bathGases.length > 0) {
        if (xml_bathGases.length > 1) {
            throw new Error("Expecting 1 " + BathGas.tagName + " but finding " + xml_bathGases.length + "!");
        }
        let attributes: Map<string, string> = getAttributes(xml_bathGases[0]);
        let moleculeID: string = getNodeValue(getFirstChildNode(xml_bathGases[0]));
        let bathGas: BathGas = new BathGas(attributes, moleculeID);
        console.log("bathGas" + bathGas.toString());
        conditions.setBathGas(bathGas);
        let containerDiv: HTMLDivElement = document.createElement("div");
        let bathGasLabel: HTMLLabelElement = document.createElement('label');
            bathGasLabel.textContent = BathGas.tagName + ": ";
            containerDiv.appendChild(bathGasLabel);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs: Set<string> = new Set(molecules.keys());
        let selectElement: HTMLSelectElement = getSelectElement(Array.from(moleculeIDs), BathGas.tagName, Conditions.tagName + "_" + BathGas.tagName);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener('change', (event) => {
            if (event.target instanceof HTMLSelectElement) {
                bathGas.value = event.target.value;
                console.log("Set " + PTpair.tagName + "_" + BathGas.tagName + " to " + event.target.value);
                resizeSelectElement(event.target);
            }
        });
        resizeSelectElement(selectElement);
        containerDiv.style.marginLeft = margin25;
        containerDiv.style.marginTop = margin1;
        containerDiv.style.marginBottom = margin1;
        containerDiv.appendChild(selectElement);
        conditionsDiv.appendChild(containerDiv);
    }
    // PTs
    let xml_PTss: HTMLCollectionOf<Element> = xml_conditions.getElementsByTagName(PTs.tagName);
    if (xml_PTss.length > 0) {
        if (xml_PTss.length > 1) {
            throw new Error("Expecting 1 " + PTs.tagName + " but finding " + xml_PTss.length + "!");
        }
        let pTsDiv: HTMLDivElement = document.createElement("div");
        conditionsDiv.appendChild(pTsDiv);
        let attributes: Map<string, string> = getAttributes(xml_PTss[0]);
        // Create a new collapsible div for the PTs.
        let buttonId: string = PTs.tagName + "_button";
        let contentDivId: string = PTs.tagName + "_";
        let collapsibleDiv = getCollapsibleDiv(pTsDiv, PTs.tagName, buttonId, fontSize2, margin25, margin1, margin1, contentDivId);
        conditionsDiv.appendChild(collapsibleDiv);
        let xml_PTPairs: HTMLCollectionOf<Element> = xml_PTss[0].getElementsByTagName(PTpair.tagName);
        if (xml_PTPairs.length == 0) {
            throw new Error("Expecting 1 or more " + PTpair.tagName + " but finding 0!");
        } else {
            let pTs: PTs = new PTs(attributes);
            for (let i = 0; i < xml_PTPairs.length; i++) {
                let pTPair = new PTpair(getAttributes(xml_PTPairs[i]));
                // Create a container div for P, T and units.
                let containerDiv: HTMLDivElement = document.createElement("div");
                containerDiv.style.display = 'flex';
                containerDiv.style.marginLeft = margin50;
                containerDiv.style.marginTop = margin1;
                containerDiv.style.marginBottom = margin1;
                pTsDiv.appendChild(containerDiv);
                // Add any optional BathGas
                let xml_bathGass: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(BathGas.tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) {
                        console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    }
                    // Add a label for the BathGas.
                    let bathGasLabel: HTMLLabelElement = document.createElement('label');
                    bathGasLabel.textContent = BathGas.tagName + ": ";
                    containerDiv.appendChild(bathGasLabel);
                    let bathGasValue = getNodeValue(getFirstChildNode(xml_bathGass[0]));
                    let bathGas: BathGas = new BathGas(getAttributes(xml_bathGass[0]), bathGasValue);
                    pTPair.setBathGas(bathGas);
                    // Create a HTMLSelectInput for the BathGas.
                    // Get the ids of all the molecules.
                    let moleculeIDs: Set<string> = new Set(molecules.keys());
                    let selectElement: HTMLSelectElement = getSelectElement(Array.from(moleculeIDs), BathGas.tagName, PTpair.tagName + "_" + BathGas.tagName);
                    // Set the initial value.
                    selectElement.value = bathGas.value;
                    // Add event listener to selectElement.
                    selectElement.addEventListener('change', (event) => {
                        if (event.target instanceof HTMLSelectElement) {
                            bathGas.value = event.target.value;
                            console.log("Set " + PTpair.tagName + "_" + BathGas.tagName + " to " + event.target.value);
                            resizeSelectElement(event.target);
                        }
                    });
                    resizeSelectElement(selectElement);
                    containerDiv.appendChild(selectElement);
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
                    let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                        if (event.target instanceof HTMLInputElement) {
                            setNumberNode(experimentRate, event.target);
                        }
                    }, experimentRate.value.toString(), ExperimentRate.tagName);
                    inputDiv.style.marginTop = margin1;
                    inputDiv.style.marginBottom = margin1;
                    containerDiv.appendChild(inputDiv);
                }
                // Create a new input element for the P.
                let p: number = pTPair.getP();
                let pId: string = PTpair.tagName + "_" + "P";
                let t: number = pTPair.getT();
                let tId: string = PTpair.tagName + "_" + "T";
                // Add the P input element to the container.
                let pInputDiv: HTMLDivElement = getInput("number", pId, (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        if (isNumeric(event.target.value)) {
                            pTPair.setP(parseFloat(event.target.value));
                            console.log("Set P to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            let inputElement = document.getElementById(pId) as HTMLInputElement;
                            inputElement.value = pTPair.getP().toString();
                        }
                        resizeInputElement(event.target);
                    }
                }, p.toString(), "P");
                let pInputElement: HTMLInputElement = pInputDiv.querySelector('input') as HTMLInputElement;
                pInputElement.value = p.toString();
                resizeInputElement(pInputElement);
                pInputDiv.style.marginLeft = margin5;
                pInputDiv.style.marginTop = margin1;
                pInputDiv.style.marginBottom = margin1;
                containerDiv.appendChild(pInputDiv);
                // Add the T input element to the container.
                let tInputDiv: HTMLDivElement = getInput("number", tId, (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        if (isNumeric(event.target.value)) {
                            pTPair.setT(parseFloat(event.target.value));
                            console.log("Set T to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            let inputElement = document.getElementById(tId) as HTMLInputElement;
                            inputElement.value = pTPair.getT().toString();
                        }
                        resizeInputElement(event.target);
                    }
                }, t.toString(), "T");
                let tInputElement: HTMLInputElement = tInputDiv.querySelector('input') as HTMLInputElement;
                tInputElement.value = t.toString();
                resizeInputElement(tInputElement);
                tInputDiv.style.marginLeft = margin5;
                tInputDiv.style.marginTop = margin1;
                tInputDiv.style.marginBottom = margin1;
                containerDiv.appendChild(tInputDiv);
                // Add any units to the container.
                addAnyUnits(undefined, getAttributes(xml_PTPairs[i]), containerDiv, PTpair.tagName, PTpair.tagName, margin2, margin1, margin1);
                pTs.addPTpair(pTPair);
                // Add the pTPairDiv to the pTsDiv.
                pTsDiv.appendChild(containerDiv);
            }
            // Create an add button to add a new PTPair.
            let addButton: HTMLButtonElement = document.createElement("button");
            addButton.textContent = "Add";
            addButton.style.marginLeft = margin50;
            addButton.style.marginTop = margin1;
            addButton.style.marginBottom = margin1;
            pTsDiv.appendChild(addButton);
            // Add event listener to the addButton.
            addButton.addEventListener('click', () => {
                let pTPairAttributes: Map<string, string> = new Map();
                pTPairAttributes.set("units", "Torr");
                let pTPair: PTpair = new PTpair(pTPairAttributes);
                // add the new pTPair to the PTs.
                pTs.addPTpair(pTPair);
                let pTPairDiv: HTMLDivElement = document.createElement("div");
                pTPairDiv.style.marginLeft = margin25;
                pTPairDiv.style.marginTop = margin1;
                pTPairDiv.style.marginBottom = margin1;
                pTsDiv.insertBefore(pTPairDiv, addButton);
                let containerDiv: HTMLDivElement = document.createElement("div");
                containerDiv.style.display = 'flex';
                let pInputDiv: HTMLDivElement = getInput("number", PTpair.tagName + "_" + "P", (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        if (isNumeric(event.target.value)) {
                            pTPair.setP(parseFloat(event.target.value));
                            console.log("Set P to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            event.target.value = pTPair.getP().toString();
                        }
                        resizeInputElement(event.target);
                    }
                }, pTPair.getP().toString(), "P");
                let pInputElement: HTMLInputElement = pInputDiv.querySelector('input') as HTMLInputElement;
                pInputElement.value = pTPair.getP().toString();
                resizeInputElement(pInputElement);
                pInputDiv.style.marginLeft = margin25;
                pInputDiv.style.marginTop = margin1;
                pInputDiv.style.marginBottom = margin1;
                containerDiv.appendChild(pInputDiv);
                let tInputDiv: HTMLDivElement = getInput("number", PTpair.tagName + "_" + "T", (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        if (isNumeric(event.target.value)) {
                            pTPair.setT(parseFloat(event.target.value));
                            console.log("Set T to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            event.target.value = pTPair.getT().toString();
                        }
                        resizeInputElement(event.target);
                    }
                }, pTPair.getT().toString(), "T");
                let tInputElement: HTMLInputElement = tInputDiv.querySelector('input') as HTMLInputElement;
                tInputElement.value = pTPair.getT().toString();
                resizeInputElement(tInputElement);
                tInputDiv.style.marginLeft = margin5;
                tInputDiv.style.marginTop = margin1;
                tInputDiv.style.marginBottom = margin1;
                containerDiv.appendChild(tInputDiv);
                addAnyUnits(undefined, pTPairAttributes, containerDiv, PTpair.tagName, PTpair.tagName, margin2, margin1, margin1);
                pTPairDiv.appendChild(containerDiv);
            });
            // Create an add multiple button to add multiple PTPairs.
            let addMultipleButton: HTMLButtonElement = document.createElement("button");
            addMultipleButton.textContent = "Add from spreadsheet";
            addMultipleButton.style.marginLeft = margin50;
            addMultipleButton.style.marginTop = margin1;
            addMultipleButton.style.marginBottom = margin1;
            pTsDiv.appendChild(addMultipleButton);
            // Add event listener to the addMultipleButton.
            addMultipleButton.addEventListener('click', () => {
                // Add a new text input for the user to paste the PTPairs.
                let inputDiv: HTMLDivElement = document.createElement("div");
                inputDiv.style.display = 'flex';
                let inputElement: HTMLInputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.style.marginLeft = margin50;
                inputElement.style.marginTop = margin1;
                inputElement.style.marginBottom = margin1;
                inputDiv.appendChild(inputElement);
                pTsDiv.insertBefore(inputDiv, addButton);
                // Add an event listener to the inputElement.
                inputElement.addEventListener('change', () => {
                    console.log("inputElement.value=" + inputElement.value);
                    console.log("inputElement.value.length=" + inputElement.value.length);
                    if (inputElement.value.length > 0) {
                        let pTPairsArray: string[] = inputElement.value.split(" ");
                        console.log("pTPairsArray.length=" + pTPairsArray.length);
                        for (let i = 0; i < pTPairsArray.length; i++) {
                            let pTPairAttributes: Map<string, string> = new Map();
                            pTPairAttributes.set("units", "Torr");
                            let pTPair: PTpair = new PTpair(pTPairAttributes);
                            let pTPairArray: string[] = pTPairsArray[i].split("\t");
                            if (pTPairArray.length == 2) {
                                let p: number = parseFloat(pTPairArray[0]);
                                let t: number = parseFloat(pTPairArray[1]);
                                pTPair.setP(p);
                                pTPair.setT(t);
                                console.log("pTPair=" + pTPair);
                            } else {
                                console.warn("pTPairArray.length=" + pTPairArray.length);
                            }
                            let containerDiv: HTMLDivElement = document.createElement("div");
                            containerDiv.style.display = 'flex';
                            containerDiv.style.marginLeft = margin50;
                            let pInputDiv: HTMLDivElement = getInput("number", PTpair.tagName + "_" + "P", (event) => {
                                if (event.target instanceof HTMLInputElement) {
                                    if (isNumeric(event.target.value)) {
                                        pTPair.setP(parseFloat(event.target.value));
                                        console.log("Set P to " + event.target.value);
                                    } else {
                                        alert("Value is not numeric, resetting...");
                                        event.target.value = pTPair.getP().toString();
                                    }
                                    resizeInputElement(event.target);
                                }
                            }, pTPair.getP().toString(), "P");
                            let pInputElement: HTMLInputElement = pInputDiv.querySelector('input') as HTMLInputElement;
                            pInputElement.value = pTPair.getP().toString();
                            resizeInputElement(pInputElement);
                            pInputDiv.style.marginTop = margin1;
                            pInputDiv.style.marginBottom = margin1;
                            containerDiv.appendChild(pInputDiv);
                            let tInputDiv: HTMLDivElement = getInput("number", PTpair.tagName + "_" + "T", (event) => {
                                if (event.target instanceof HTMLInputElement) {
                                    if (isNumeric(event.target.value)) {
                                        pTPair.setT(parseFloat(event.target.value));
                                        console.log("Set T to " + event.target.value);
                                    } else {
                                        alert("Value is not numeric, resetting...");
                                        event.target.value = pTPair.getT().toString();
                                    }
                                    resizeInputElement(event.target);
                                }
                            }, pTPair.getT().toString(), "T");
                            let tInputElement: HTMLInputElement = tInputDiv.querySelector('input') as HTMLInputElement;
                            tInputElement.value = pTPair.getT().toString();
                            resizeInputElement(tInputElement);
                            tInputDiv.style.marginLeft = margin5;
                            tInputDiv.style.marginTop = margin1;
                            tInputDiv.style.marginBottom = margin1;
                            containerDiv.appendChild(tInputDiv);
                            addAnyUnits(undefined, pTPairAttributes, containerDiv, PTpair.tagName, PTpair.tagName, margin2, margin1, margin1);
                            console.log(addButton);  // Check the value of addButton
                            console.log(pTsDiv);  // Check the value of pTsDiv
                            pTsDiv.insertBefore(containerDiv, addButton);
                            pTs.addPTpair(pTPair);
                        }
                        //pTs.addPTpairs(pTPairs);
                        pTsDiv.removeChild(inputDiv);
                    }
                });
            });
            conditions.setPTs(pTs);
        }
    }
    return conditionsDiv;
}

/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function processModelParameters(xml: XMLDocument): HTMLDivElement {
    console.log(ModelParameters.tagName);
    // Create div to contain the modelParameters.
    let modelParametersDiv: HTMLDivElement = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_modelParameters: Element = getSingularElement(xml, ModelParameters.tagName);
    modelParameters = new ModelParameters(getAttributes(xml_modelParameters));
    // Process any "me:grainSize" elements.
    let xml_grainSizess: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(GrainSize.tagName);
    if (xml_grainSizess.length > 0) {
        if (xml_grainSizess.length > 1) {
            throw new Error("Expecting 1 " + BathGas.tagName + " but finding " + xml_grainSizess.length + "!");
        }
        let attributes: Map<string, string> = getAttributes(xml_grainSizess[0]);
        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_grainSizess[0])));
        let grainSize: GrainSize = new GrainSize(attributes, value);
        modelParameters.setGrainSize(grainSize);
        let grainSizeDiv: HTMLDivElement = document.createElement("div");
        grainSizeDiv.style.display = 'flex';
        // Create a new div for the grainSize.
        let id = ModelParameters.tagName + "_" + GrainSize.tagName;
        let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(grainSize, event.target);
                resizeInputElement(event.target);
            }
        }, value.toString(), GrainSize.tagName);
        resizeInputElement(inputDiv.querySelector('input') as HTMLInputElement);
        inputDiv.style.marginLeft = margin25;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        grainSizeDiv.appendChild(inputDiv);
        // Add any units
        addAnyUnits(undefined, attributes, grainSizeDiv, ModelParameters.tagName + "_" + GrainSize.tagName, GrainSize.tagName, margin2, margin1, margin1);
        modelParametersDiv.appendChild(grainSizeDiv);
    }
    // Process any "me:energyAboveTheTopHill" elements.
    let xml_energyAboveTheTopHill: Element = getSingularElement(xml_modelParameters, EnergyAboveTheTopHill.tagName);
    let energyAboveTheTopHill: EnergyAboveTheTopHill = new EnergyAboveTheTopHill(getAttributes(xml_energyAboveTheTopHill),
        parseFloat(getNodeValue(getFirstChildNode(xml_energyAboveTheTopHill))));
    modelParameters.setEnergyAboveTheTopHill(energyAboveTheTopHill);
    // Create a new div for the energyAboveTheTopHill.
    let id = ModelParameters.tagName + "_" + EnergyAboveTheTopHill.tagName;
    let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(energyAboveTheTopHill, event.target);
            resizeInputElement(event.target);
        }
    }, energyAboveTheTopHill.value.toString(), EnergyAboveTheTopHill.tagName);
    resizeInputElement(inputDiv.querySelector('input') as HTMLInputElement);
    inputDiv.style.marginLeft = margin25;
    inputDiv.style.marginTop = margin1;
    inputDiv.style.marginBottom = margin1;
    modelParametersDiv.appendChild(inputDiv);
    return modelParametersDiv;
}

/**
 * Parses xml to initialise controls.
 * @param xml The XML document.
 * @returns The controls div.
 */
function processControl(xml: XMLDocument): HTMLDivElement {
    console.log(Control.tagName);
    // Create div to contain the controls.
    let controlsDiv: HTMLDivElement = document.createElement("div");
    // Get the XML "me:control" element.
    let xml_control: Element = getSingularElement(xml, Control.tagName);
    control = new Control(getAttributes(xml_control));
    // me:testDOS
    let testDOSDiv: HTMLDivElement = document.createElement("div");
    testDOSDiv.style.display = 'flex';
    testDOSDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(testDOSDiv);
    let xml_testDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestDOS.tagName);
    // Create a input checkbox for the TestDOS.
    let testDOSLabel: HTMLLabelElement = document.createElement("label");
    testDOSDiv.appendChild(testDOSLabel);
    testDOSLabel.textContent = TestDOS.tagName;
    let testDOSInput: HTMLInputElement = document.createElement("input");
    testDOSDiv.appendChild(testDOSInput);
    testDOSInput.type = "checkbox";
    testDOSInput.id = TestDOS.tagName;
    testDOSInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setTestDOS(new TestDOS());
            } else {
                control.removeTestDOS();
            }
        }
    });
    if (xml_testDOS.length == 1) {
        testDOSInput.checked = true;
        control.setTestDOS(new TestDOS());
    } else {
        if (xml_testDOS.length > 1) {
            console.warn("xml_testDOS.length=" + xml_testDOS.length);
        }
    }
    // me:printSpeciesProfile
    let printSpeciesProfileDiv: HTMLDivElement = document.createElement("div");
    printSpeciesProfileDiv.style.display = 'flex';
    printSpeciesProfileDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printSpeciesProfileDiv);
    let xml_printSpeciesProfile: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintSpeciesProfile.tagName);
    // Create a input checkbox for the PrintSpeciesProfile.
    let printSpeciesProfileLabel: HTMLLabelElement = document.createElement("label");
    printSpeciesProfileDiv.appendChild(printSpeciesProfileLabel);
    printSpeciesProfileLabel.textContent = PrintSpeciesProfile.tagName;
    let printSpeciesProfileInput: HTMLInputElement = document.createElement("input");
    printSpeciesProfileDiv.appendChild(printSpeciesProfileInput);
    printSpeciesProfileInput.type = "checkbox";
    printSpeciesProfileInput.id = PrintSpeciesProfile.tagName;
    printSpeciesProfileInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintSpeciesProfile(new PrintSpeciesProfile());
            } else {
                control.removePrintSpeciesProfile();
            }
        }
    });
    if (xml_printSpeciesProfile.length == 1) {
        printSpeciesProfileInput.checked = true;
        control.setTestDOS(new PrintSpeciesProfile());
    } else {
        if (xml_testDOS.length > 1) {
            console.warn("xml_printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
        }
    }
    // me:testMicroRates
    let testMicroRatesDiv: HTMLDivElement = document.createElement("div");
    testMicroRatesDiv.style.display = 'flex';
    testMicroRatesDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(testMicroRatesDiv);
    let xml_testMicroRates: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestMicroRates.tagName);
    // Create a input checkbox for the TestMicroRates.
    let testMicroRatesLabel: HTMLLabelElement = document.createElement("label");
    testMicroRatesDiv.appendChild(testMicroRatesLabel);
    testMicroRatesLabel.textContent = TestMicroRates.tagName;
    let testMicroRatesInput: HTMLInputElement = document.createElement("input");
    testMicroRatesDiv.appendChild(testMicroRatesInput);
    testMicroRatesInput.type = "checkbox";
    testMicroRatesInput.id = TestMicroRates.tagName;
    testMicroRatesInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setTestMicroRates(new TestMicroRates());
            } else {
                control.removeTestMicroRates();
            }
        }
    });
    if (xml_testMicroRates.length == 1) {
        testMicroRatesInput.checked = true;
        control.setTestMicroRates(new TestMicroRates());
    } else {
        if (xml_testMicroRates.length > 1) {
            console.warn("xml_testMicroRates.length=" + xml_testMicroRates.length);
        }
    }
    // me:testRateConstant
    let testRateConstantDiv: HTMLDivElement = document.createElement("div");
    testRateConstantDiv.style.display = 'flex';
    testRateConstantDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(testRateConstantDiv);
    let xml_testRateConstant: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestRateConstant.tagName);
    // Create a input checkbox for the TestRateConstant.
    let testRateConstantLabel: HTMLLabelElement = document.createElement("label");
    testRateConstantDiv.appendChild(testRateConstantLabel);
    testRateConstantLabel.textContent = TestRateConstant.tagName;
    let testRateConstantInput: HTMLInputElement = document.createElement("input");
    testRateConstantDiv.appendChild(testRateConstantInput);
    testRateConstantInput.type = "checkbox";
    testRateConstantInput.id = TestRateConstant.tagName;
    testRateConstantInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setTestRateConstant(new TestRateConstant());
            } else {
                control.removeTestRateConstant();
            }
        }
    });
    if (xml_testRateConstant.length == 1) {
        testRateConstantInput.checked = true;
        control.setTestRateConstant(new TestRateConstant());
    } else {
        if (xml_testRateConstant.length > 1) {
            console.warn("xml_testRateConstant.length=" + xml_testRateConstant.length);
        }
    }
    // me:printGrainDOS
    let printGrainDOSDiv: HTMLDivElement = document.createElement("div");
    printGrainDOSDiv.style.display = 'flex';
    printGrainDOSDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainDOSDiv);
    let xml_printGrainDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainDOS.tagName);
    // Create a input checkbox for the PrintGrainDOS.
    let printGrainDOSLabel: HTMLLabelElement = document.createElement("label");
    printGrainDOSDiv.appendChild(printGrainDOSLabel);
    printGrainDOSLabel.textContent = PrintGrainDOS.tagName;
    let printGrainDOSInput: HTMLInputElement = document.createElement("input");
    printGrainDOSDiv.appendChild(printGrainDOSInput);
    printGrainDOSInput.type = "checkbox";
    printGrainDOSInput.id = PrintGrainDOS.tagName;
    printGrainDOSInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainDOS(new PrintGrainDOS());
            } else {
                control.removePrintGrainDOS();
            }
        }
    });
    if (xml_printGrainDOS.length == 1) {
        printGrainDOSInput.checked = true;
        control.setPrintGrainDOS(new PrintGrainDOS());
    } else {
        if (xml_printGrainDOS.length > 1) {
            console.warn("xml_printGrainDOS.length=" + xml_printGrainDOS.length);
        }
    }
    // me:printCellDOS
    let printCellDOSDiv: HTMLDivElement = document.createElement("div");
    printCellDOSDiv.style.display = 'flex';
    printCellDOSDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printCellDOSDiv);
    let xml_printCellDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintCellDOS.tagName);
    // Create a input checkbox for the PrintCellDOS.
    let printCellDOSLabel: HTMLLabelElement = document.createElement('label');
    printCellDOSDiv.appendChild(printCellDOSLabel);
    printCellDOSLabel.textContent = PrintCellDOS.tagName;
    let printCellDOSInput: HTMLInputElement = document.createElement('input');
    printCellDOSDiv.appendChild(printCellDOSInput);
    printCellDOSInput.type = "checkbox";
    printCellDOSInput.id = PrintCellDOS.tagName;
    printCellDOSInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintCellDOS(new PrintCellDOS());
            } else {
                control.removePrintCellDOS();
            }
        }
    });
    if (xml_printCellDOS.length == 1) {
        printCellDOSInput.checked = true;
        control.setPrintCellDOS(new PrintCellDOS());
    } else {
        if (xml_printCellDOS.length > 1) {
            console.warn("xml_printCellDOS.length=" + xml_printCellDOS.length);
        }
    }
    // me:printReactionOperatorColumnSums
    let printReactionOperatorColumnSumsDiv: HTMLDivElement = document.createElement('div');
    printReactionOperatorColumnSumsDiv.style.display = 'flex';
    printReactionOperatorColumnSumsDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printReactionOperatorColumnSumsDiv);
    let xml_printReactionOperatorColumnSums: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintReactionOperatorColumnSums.tagName);
    // Create a input checkbox for the PrintReactionOperatorColumnSums.
    let printReactionOperatorColumnSumsLabel: HTMLLabelElement = document.createElement('label');
    printReactionOperatorColumnSumsDiv.appendChild(printReactionOperatorColumnSumsLabel);
    printReactionOperatorColumnSumsLabel.textContent = PrintReactionOperatorColumnSums.tagName;
    let printReactionOperatorColumnSumsInput: HTMLInputElement = document.createElement('input');
    printReactionOperatorColumnSumsDiv.appendChild(printReactionOperatorColumnSumsInput);
    printReactionOperatorColumnSumsInput.type = "checkbox";
    printReactionOperatorColumnSumsInput.id = PrintReactionOperatorColumnSums.tagName;
    printReactionOperatorColumnSumsInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintReactionOperatorColumnSums(new PrintReactionOperatorColumnSums());
            } else {
                control.removePrintReactionOperatorColumnSums();
            }
        }
    });
    if (xml_printReactionOperatorColumnSums.length == 1) {
        printReactionOperatorColumnSumsInput.checked = true;
        control.setPrintReactionOperatorColumnSums(new PrintReactionOperatorColumnSums());
    } else {
        if (xml_printReactionOperatorColumnSums.length > 1) {
            console.warn("xml_printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
        }
    }
    // me:printTunnellingCoefficients
    let printTunnellingCoefficientsDiv: HTMLDivElement = document.createElement('div');
    printTunnellingCoefficientsDiv.style.display = 'flex';
    printTunnellingCoefficientsDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printTunnellingCoefficientsDiv);
    let xml_printTunnellingCoefficients: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintTunnellingCoefficients.tagName);
    // Create a input checkbox for the PrintTunnellingCoefficients.
    let printTunnellingCoefficientsLabel: HTMLLabelElement = document.createElement('label');
    printTunnellingCoefficientsDiv.appendChild(printTunnellingCoefficientsLabel);
    printTunnellingCoefficientsLabel.textContent = PrintTunnellingCoefficients.tagName;
    let printTunnellingCoefficientsInput: HTMLInputElement = document.createElement('input');
    printTunnellingCoefficientsDiv.appendChild(printTunnellingCoefficientsInput);
    printTunnellingCoefficientsInput.type = "checkbox";
    printTunnellingCoefficientsInput.id = PrintTunnellingCoefficients.tagName;
    printTunnellingCoefficientsInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintTunnellingCoefficients(new PrintTunnellingCoefficients());
            } else {
                control.removePrintTunnellingCoefficients();
            }
        }
    });
    if (xml_printTunnellingCoefficients.length == 1) {
        printTunnellingCoefficientsInput.checked = true;
        control.setPrintTunnellingCoefficients(new PrintTunnellingCoefficients());
    } else {
        if (xml_printTunnellingCoefficients.length > 1) {
            console.warn("xml_printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
        }
    }
    // me:printGrainkfE
    let printGrainkfEDiv: HTMLDivElement = document.createElement('div');
    printGrainkfEDiv.style.display = 'flex';
    printGrainkfEDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainkfEDiv);
    let xml_printGrainkfE: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainkfE.tagName);
    // Create a input checkbox for the PrintGrainkfE.
    let printGrainkfELabel: HTMLLabelElement = document.createElement('label');
    printGrainkfEDiv.appendChild(printGrainkfELabel);
    printGrainkfELabel.textContent = PrintGrainkfE.tagName;
    let printGrainkfEInput: HTMLInputElement = document.createElement('input');
    printGrainkfEDiv.appendChild(printGrainkfEInput);
    printGrainkfEInput.type = "checkbox";
    printGrainkfEInput.id = PrintGrainkfE.tagName;
    printGrainkfEInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainkfE(new PrintGrainkfE());
            } else {
                control.removePrintGrainkfE();
            }
        }
    });
    // me:printGrainBoltzmann
    let printGrainBoltzmannDiv: HTMLDivElement = document.createElement('div');
    printGrainBoltzmannDiv.style.display = 'flex';
    printGrainBoltzmannDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainBoltzmannDiv);
    let xml_printGrainBoltzmann: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainBoltzmann.tagName);
    // Create a input checkbox for the PrintGrainBoltzmann.
    let printGrainBoltzmannLabel: HTMLLabelElement = document.createElement('label');
    printGrainBoltzmannDiv.appendChild(printGrainBoltzmannLabel);
    printGrainBoltzmannLabel.textContent = PrintGrainBoltzmann.tagName;
    let printGrainBoltzmannInput: HTMLInputElement = document.createElement('input');
    printGrainBoltzmannDiv.appendChild(printGrainBoltzmannInput);
    printGrainBoltzmannInput.type = "checkbox";
    printGrainBoltzmannInput.id = PrintGrainBoltzmann.tagName;
    printGrainBoltzmannInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainBoltzmann(new PrintGrainBoltzmann());
            } else {
                control.removePrintGrainBoltzmann();
            }
        }
    });
    // me:printGrainkbE
    let printGrainkbEDiv: HTMLDivElement = document.createElement('div');
    printGrainkbEDiv.style.display = 'flex';
    printGrainkbEDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainkbEDiv);
    let xml_printGrainkbE: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainkbE.tagName);
    // Create a input checkbox for the PrintGrainkbE.
    let printGrainkbELabel: HTMLLabelElement = document.createElement('label');
    printGrainkbEDiv.appendChild(printGrainkbELabel);
    printGrainkbELabel.textContent = PrintGrainkbE.tagName;
    let printGrainkbEInput: HTMLInputElement = document.createElement('input');
    printGrainkbEDiv.appendChild(printGrainkbEInput);
    printGrainkbEInput.type = "checkbox";
    printGrainkbEInput.id = PrintGrainkbE.tagName;
    printGrainkbEInput.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainkbE(new PrintGrainkbE());
            } else {
                control.removePrintGrainkbE();
            }
        }
    });
    // me:eigenvalues
    let xml_eigenvalues: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(Eigenvalues.tagName);
    if (xml_eigenvalues.length == 1) {
        let eigenvalues: Eigenvalues = new Eigenvalues(getAttributes(xml_eigenvalues[0]), parseFloat(getNodeValue(getFirstChildNode(xml_eigenvalues[0]))));
        control.setEigenvalues(eigenvalues);
        // Create a new div for the eigenvalues.
        let id = Control.tagName + "_" + Eigenvalues.tagName;
        let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(eigenvalues, event.target);
                resizeInputElement(event.target);
            }
        }, eigenvalues.value.toString(), Eigenvalues.tagName);
        resizeInputElement(inputDiv.querySelector('input') as HTMLInputElement);
        inputDiv.style.marginLeft = margin25;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        controlsDiv.appendChild(inputDiv);
    } else {
        console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    }
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(DiagramEnergyOffset.tagName);
    if (xml_diagramEnergyOffset.length == 1) {
        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_diagramEnergyOffset[0])));
        let diagramEnergyOffset: DiagramEnergyOffset = new DiagramEnergyOffset(getAttributes(xml_diagramEnergyOffset[0]), value);
        control.setDiagramEnergyOffset(diagramEnergyOffset);
        // Create a new div for the diagramEnergyOffset.
        let id = Control.tagName + "_" + DiagramEnergyOffset.tagName;
        let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(diagramEnergyOffset, event.target);
                resizeInputElement(event.target);
            }
        }, value.toString(), DiagramEnergyOffset.tagName);
        resizeInputElement(inputDiv.querySelector('input') as HTMLInputElement);
        inputDiv.style.marginLeft = margin25;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        controlsDiv.appendChild(inputDiv);
    } else {
        console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    }
    return controlsDiv;
}

/**
 * Create a diagram.
 * @param canvas The canvas.
 * @param dark True for dark mode.
 * @param font The font to use.
 * @param lw The line width of reactants, transition states and products.
 * @param lwc The line width color to use.
 */
function drawReactionDiagram(canvas: HTMLCanvasElement, dark: boolean, font: string, lw: number, lwc: number): void {
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
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    //ctx.fillStyle = background;
    // Get text height for font size.
    let th = getTextHeight(ctx, "Aj", font);
    //console.log("th=" + th);
    // Go through reactions:
    // 1. Create sets of reactants, end products, intermediate products and transition states.
    // 2. Create maps of orders and energies.
    // 3. Calculate maximum energy.
    let reactants: Set<string> = new Set();
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
            reactants.add(reactantsLabel);
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
        let energyRescaled: number = rescale(energyMin, energyRange, 0, canvas.height, energy);
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
    let canvasHeightWithBorder = canvas.height + (4 * th) + (2 * lw);
    //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
    let originalCanvasHeight = canvas.height;
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
                drawLine(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0],
                    transitionStateInXY[1]);
                let transitionStateOutXY: number[] = get(transitionStatesOutXY, transitionStateLabel);
                drawLine(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1],
                    productInXY[0], productInXY[1]);
            });
        } else {
            drawLine(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1],
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

/**
 * Display reactions diagram.
 */
function displayReactionsDiagram(): void {
    if (reactions.size > 0) {
        // Display the diagram.
        let canvas: HTMLCanvasElement | null = document.getElementById("reactions_diagram") as HTMLCanvasElement;
        let font: string = "14px Arial";
        let dark: boolean = true;
        let lw: number = 4;
        let lwc: number = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, dark, font, lw, lwc);
        }
    }
}

/**
 * Save to XML file.
 */
window.saveXML = function () {
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
    a.download = input_xml_filename; // Replace with the desired filename...
    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();
    // Remove the 'a' element after the download starts
    document.body.removeChild(a);
}