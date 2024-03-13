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
    getInput, makeCollapsible, getCollapsibleDiv, resizeInput
} from './html.js';

import {
    drawLevel, drawLine, getTextHeight, getTextWidth
} from './canvas.js';

import {
    BathGas, Conditions, ExperimentRate, PT, PTs
} from './conditions.js';

import {
    EnergyAboveTheTopHill, GrainSize, ModelParameters
} from './modelParameters.js';

import {
    Control, DiagramEnergyOffset, Eigenvalues, HideInactive, TestDOS, PrintSpeciesProfile,
    TestMicroRates, TestRateConstant, PrintGrainDOS, PrintCellDOS, PrintReactionOperatorColumnSums,
    PrintTunnellingCoefficients, PrintGrainkfE, PrintGrainBoltzmann, PrintGrainkbE
} from './control.js';
import { MoleculeList, ReactionList, Title } from './mesmer.js';

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
let fontSize1 = "1.5em";
let fontSize2 = "1.25em";
let fontSize3 = "1.0em";
let fontSize4 = "0.75em";

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
 * The XML text element.
 */
let me_title: HTMLCollectionOf<Element> | null;
let molecules_title: HTMLElement | null;
//let moleculesDiv: HTMLElement | null;
let reactions_title: HTMLElement | null;
let reactionsDiv: HTMLElement | null;
let conditions_title: HTMLElement | null;
let conditions_table: HTMLElement | null;
let modelParameters_title: HTMLElement | null;
let modelParameters_table: HTMLElement | null;
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
    // Title.
    let xml_title: HTMLCollectionOf<Element> = xml.getElementsByTagName(Title.tagName) as HTMLCollectionOf<Element>;
    if (xml_title.length != 1) {
        throw new Error('Multiple ' + Title.tagName + ' tags found');
    } else {
        let title = (xml_title[0].childNodes[0].nodeValue as string).trim();
        let titleNode: Title = new Title(getAttributes(xml_title[0]), title);
        let titleElement: HTMLElement = document.getElementById("title") as HTMLElement;
        // Create a new div element for the input.
        let divElement = document.createElement("div");
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
        resizeInput(inputElement, 0);
        console.log("inputElement.value=" + inputElement.value);
        // Add event listener to inputElement.
        inputElement.addEventListener('change', function () {
            if (inputElement.value != title) {
                titleNode.value = inputElement.value;
            }
            resizeInput(inputElement, 0);
        });

        // Create a collapsible div for molecules
        let moleculesElement: HTMLElement = document.getElementById("molecules") as HTMLElement;
        let moleculeListElement = processMoleculeList(xml);
        moleculesElement.appendChild(getCollapsibleDiv("molecules_button", fontSize1, "Molecules", moleculeListElement, "moleculesList"));

        // Create a collapsible div for reactions
        let reactionsElement: HTMLElement = document.getElementById("reactions") as HTMLElement;
        let reactionListElement = processReactionList(xml);
        reactionsElement.appendChild(getCollapsibleDiv("reactions_button", fontSize1, "Reactions", reactionListElement, "reactionsList"));




        // Collapse and set up action listeners for all collapsible content.
        makeCollapsible();

    }

    /**
     * Generate molecules table.
     */
    //initMolecules(xml);
    //displayMolecules();
    /**
     * Generate reactions table.
     */
    //initReactions(xml);
    //displayReactions();
    //addEventListeners();
    //displayReactionsDiagram();
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
            let collapsibleDiv = getCollapsibleDiv(buttonId, fontSize3, PropertyList.tagName, plDiv, contentDivId);
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl = new PropertyList(getAttributes(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps: HTMLCollectionOf<Element> = xml_PLs[0].getElementsByTagName(Property.tagName);
            for (let j = 0; j < xml_Ps.length; j++) {
                let p: Property = new Property(getAttributes(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                processProperty(p, molecule, xml_Ps[j], plDiv);
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
            processProperty(p, molecule, xml_Ps[0], moleculeDiv);
        }
        moleculeTagNames.delete(Property.tagName);
        // Organise EnergyTransferModel.
        moleculeTagNames.delete(EnergyTransferModel.tagName);
        let xml_ETMs: HTMLCollectionOf<Element> | null = xml_molecules[i].getElementsByTagName(EnergyTransferModel.tagName);
        if (xml_ETMs.length > 0) {
            if (xml_ETMs.length > 1) {
                throw new Error("Expecting 1 or 0 " + EnergyTransferModel.tagName + " but finding " + xml_ETMs.length + "!");
            }
            let etm = new EnergyTransferModel(getAttributes(xml_ETMs[0]));
            processEnergyTransferModel(etm, molecule, xml_ETMs[0], moleculeDiv);
        }
        // Organise DOSCMethod.
        moleculeTagNames.delete(DOSCMethod.tagName);
        let xml_DOSCMethod: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(DOSCMethod.tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length > 1) {
                throw new Error("Expecting 1 or 0 " + DOSCMethod.tagName + " but finding " + xml_DOSCMethod.length + "!");
            }
            let dOSCMethod = new DOSCMethod(getAttributes(xml_DOSCMethod[0]));
            processDOSCMethod(dOSCMethod, molecule, xml_DOSCMethod[0], moleculeDiv);
        }

        // Organise ExtraDOSCMethod.
        moleculeTagNames.delete(ExtraDOSCMethod.tagName);
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName(ExtraDOSCMethod.tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            }
            // Read bondRef.
            let bondRefs: HTMLCollectionOf<Element> = xml_ExtraDOSCMethod[0].getElementsByTagName(BondRef.tagName);
            let bondRef: BondRef | undefined;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                }
                bondRef = new BondRef(getAttributes(bondRefs[0]), getNodeValue(getFirstChildNode(bondRefs[0])));
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials: HTMLCollectionOf<Element> = xml_ExtraDOSCMethod[0].getElementsByTagName(HinderedRotorPotential.tagName);
            let hinderedRotorPotential: HinderedRotorPotential | undefined;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) {
                    throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                }
                // Load PotentialPoints.
                let potentialPoints: PotentialPoint[] = [];
                let xml_potentialPoints: HTMLCollectionOf<Element> = hinderedRotorPotentials[0].getElementsByTagName(PotentialPoint.tagName);
                for (let k = 0; k < xml_potentialPoints.length; k++) {
                    potentialPoints.push(new PotentialPoint(getAttributes(xml_potentialPoints[k])));
                }
                hinderedRotorPotential = new HinderedRotorPotential(getAttributes(hinderedRotorPotentials[0]), potentialPoints);
            }
            // Read periodicities.
            let xml_periodicities: HTMLCollectionOf<Element> = xml_DOSCMethod[0].getElementsByTagName(Periodicity.tagName);
            let periodicity: Periodicity | undefined;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                periodicity = new Periodicity(getAttributes(xml_periodicities[0]),
                    parseFloat(getNodeValue(getFirstChildNode(xml_periodicities[0]))));
            }
            molecule.setExtraDOSCMethod(new ExtraDOSCMethod(getAttributes(xml_DOSCMethod[0]), bondRef, hinderedRotorPotential, periodicity));
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete(ReservoirSize.tagName);
        xml_DOSCMethod = xml_molecules[i].getElementsByTagName(ReservoirSize.tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + xml_DOSCMethod.length);
            }
            molecule.setReservoirSize(new ReservoirSize(getAttributes(xml_DOSCMethod[0]), parseFloat(getNodeValue(getFirstChildNode(xml_DOSCMethod[0])))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
        }
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = getCollapsibleDiv(molecule.tagName + "_" + molecule.id + "_button", fontSize2, molecule.getLabel(),
            moleculeDiv, molecule.tagName + "_" + molecule.id);
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
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */
function processProperty(p: Property, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement) {
    // Handle scalar or array property
    let scalarNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyScalar.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + PropertyScalar.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString: string = getInputString(scalarNodes[0]);
        let value: number = parseFloat(inputString);
        let ps: PropertyScalar = new PropertyScalar(getAttributes(scalarNodes[0]), value);
        p.setProperty(ps);
        let label: string = p.dictRef;
        // Create a new div element for the input.
        let inputDiv: HTMLDivElement = getInput("number", molecule.id + "_" + p.dictRef, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(ps, event.target);
            }
        }, inputString, label);
        moleculeDiv.appendChild(inputDiv);
        let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
        inputElement.value = inputString;
        resizeInput(inputElement);
        inputElement.addEventListener('change', (event) => {
            let eventTarget = event.target as HTMLInputElement;
            inputString = eventTarget.value;
            ps = p.getProperty() as PropertyScalar;
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            resizeInput(inputElement);
        });
    } else {
        let arrayNodes: HTMLCollectionOf<Element> = element.getElementsByTagName(PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString: string = getInputString(arrayNodes[0]);
            let values: number[] = toNumberArray(inputString.split(/\s+/));
            let pa: PropertyArray = new PropertyArray(getAttributes(arrayNodes[0]), values);
            p.setProperty(pa);
            let label: string = p.dictRef;
            // Create a new div element for the input.
            let inputDiv: HTMLDivElement = getInput("text", molecule.id + "_" + p.dictRef, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberArrayNode(pa, event.target);
                }
            }, inputString, label);
            moleculeDiv.appendChild(inputDiv);
            let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
            inputElement.value = inputString;
            resizeInput(inputElement);
            inputElement.addEventListener('change', (event) => {
                let eventTarget = event.target as HTMLInputElement;
                inputString = eventTarget.value;
                pa = p.getProperty() as PropertyArray;
                values = toNumberArray(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                resizeInput(inputElement);
            });
        } else {
            throw new Error("Expecting " + PropertyScalar.tagName + " or " + PropertyArray.tagName);
        }
    }
}


/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */
function processDOSCMethod(dOSCMethod: DOSCMethod, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement) {
    // Create a HTMLSelectElement to select the DOSCMethod.
    let selectElement: HTMLSelectElement = document.createElement('select');
    selectElement.name = 'DOSCMethod';
    selectElement.id = 'DOSCMethod-select';
    let optionCR: HTMLOptionElement = document.createElement('option');
    optionCR.value = "ClassicalRotors";
    optionCR.text = "ClassicalRotors";
    selectElement.appendChild(optionCR);
    let optionQMR: HTMLOptionElement = document.createElement('option');
    optionQMR.value = "QMRotors";
    optionQMR.text = "QMRotors";
    selectElement.appendChild(optionQMR);
    moleculeDiv.appendChild(selectElement);
    // Set the initial value to the DOSCMethod.
    selectElement.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    selectElement.addEventListener('change', (event) => {
        if (event.target instanceof HTMLSelectElement) {
            dOSCMethod.setXsiType(event.target.value);
            console.log("Set DOSCMethod to " + event.target.value);
            molecule.setDOSCMethod(dOSCMethod);
        }
    });
    molecule.setDOSCMethod(dOSCMethod);
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
        let etmDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        let buttonId: string = molecule.id + "_" + EnergyTransferModel.tagName;
        let contentDivId: string = molecule.id + "_" + EnergyTransferModel.tagName + "_";
        let collapsibleDiv = getCollapsibleDiv(buttonId, fontSize3, EnergyTransferModel.tagName, etmDiv, contentDivId);
        moleculeDiv.appendChild(collapsibleDiv);
        let deltaEDowns: DeltaEDown[] = [];
        for (let k = 0; k < xml_deltaEDowns.length; k++) {
            let inputString: string = getInputString(xml_deltaEDowns[k]);
            let value: number = parseFloat(inputString);
            let deltaEDown: DeltaEDown = new DeltaEDown(getAttributes(xml_deltaEDowns[k]), value);
            deltaEDowns.push(deltaEDown);
            let label: string = DeltaEDown.tagName;
            // Create a new div element for the input.
            let id = molecule.id + "_" + EnergyTransferModel.tagName + "_" + DeltaEDown.tagName + "_" + k;
            let inputDiv: HTMLDivElement = getInput("number", id, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberNode(deltaEDown, event.target);
                }
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
            inputElement.value = inputString;
            resizeInput(inputElement);
            inputElement.addEventListener('change', (event) => {
                let eventTarget = event.target as HTMLInputElement;
                inputString = eventTarget.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                resizeInput(inputElement);
            });
        }
        let etm = new EnergyTransferModel(getAttributes(element), deltaEDowns);
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
            let reactants: Reactant[] = [];
            for (let j = 0; j < xml_reactants.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                reactants.push(new Reactant(getAttributes(xml_reactants[j]),
                    new ReactionMolecule(getAttributes(xml_molecule))));
            }
            reaction.setReactants(reactants);
        }
        // Load products.
        let xml_products: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Product.tagName);
        reactionTagNames.delete(Product.tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            let products: Product[] = [];
            for (let j = 0; j < xml_products.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_products[j], Molecule.tagName);
                products.push(new Product(getAttributes(xml_products[j]),
                    new ReactionMolecule(getAttributes(xml_reaction))));
                processProduct(etm, molecule, xml_ETMs[0], moleculeDiv);
            }
            reaction.setProducts(products);
        }
        // Load transition states.
        let xml_transitionStates: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(TransitionState.tagName);
        //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
        if (xml_transitionStates.length > 0) {
            let transitionStates: TransitionState[] = [];
            for (let j = 0; j < xml_transitionStates.length; j++) {
                let xml_molecule: Element = getFirstElement(xml_transitionStates[j], Molecule.tagName);
                transitionStates.push(new TransitionState(getAttributes(xml_transitionStates[j]),
                    new ReactionMolecule(getAttributes(xml_molecule))));
            }
            reaction.setTransitionStates(transitionStates);
        }
        //console.log("transitionStates=" + transitionStates);
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
        let tunneling: Tunneling | undefined;
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) {
                throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
            }
            tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
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
                let mCRCMethod: MCRCMethod;
                let mCRCMethodAttributes: Map<string, string> = getAttributes(xml_MCRCMethod[0]);
                let name: string | undefined = mCRCMethodAttributes.get("name");
                //console.log(MCRCMethod.tagName + " name=" + name);
                if (name == undefined || name == MesmerILT.xsiType2) {
                    let type: string = mCRCMethodAttributes.get("xsi:type") as string;
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    if (type == MesmerILT.xsiType || type == MesmerILT.xsiType2) {
                        let preExponential: PreExponential | undefined;
                        let xml_preExponential: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(PreExponential.tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_preExponential[0])));
                                preExponential = new PreExponential(getAttributes(xml_preExponential[0]), value);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let activationEnergy: ActivationEnergy | undefined;
                        let xml_activationEnergy: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(ActivationEnergy.tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_activationEnergy[0])));
                                activationEnergy = new ActivationEnergy(getAttributes(xml_activationEnergy[0]), value);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let tInfinity: TInfinity | undefined;
                        let xml_tInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(TInfinity.tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_tInfinity[0])));
                                tInfinity = new NInfinity(getAttributes(xml_tInfinity[0]), value);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let nInfinity: NInfinity | undefined;
                        let xml_nInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(NInfinity.tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_nInfinity[0])));
                                nInfinity = new NInfinity(getAttributes(xml_nInfinity[0]), value);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        mCRCMethod = new MesmerILT(mCRCMethodAttributes, preExponential, activationEnergy, tInfinity, nInfinity);
                    } else {
                        throw new Error("Unexpected xsi:type=" + type);
                    }
                } else {
                    mCRCMethod = new MCRCMethod(mCRCMethodAttributes);
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
        let collapsibleDiv = getCollapsibleDiv(reaction.tagName + "_" + reaction.id + "_button", fontSize2, reaction.getLabel(),
            reactionDiv, reaction.tagName + "_" + reaction.id);
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(collapsibleDiv);
    }
    return reactionListDiv;
}

let conditions: Conditions;

/**
 * Parse xml to initialise conditions.
 * @param {XMLDocument} xml The XML document.
 */
function initConditions(xml: XMLDocument): void {
    console.log(Conditions.tagName);
    let xml_conditions: Element = getSingularElement(xml, Conditions.tagName);
    // Set conditions_title.
    conditions_title = document.getElementById("conditions_title");
    if (conditions_title != null) {
        conditions_title.innerHTML = "Conditions";
    }
    // BathGas
    let xml_bathGas: Element = getFirstElement(xml_conditions, BathGas.tagName);
    let attributes: Map<string, string> = getAttributes(xml_bathGas);
    let moleculeID: string = getNodeValue(getFirstChildNode(xml_bathGas));
    let bathGas: BathGas = new BathGas(attributes, moleculeID, molecules);
    // PTs
    let xml_PTs: Element = getSingularElement(xml_conditions, 'me:PTs');
    let xml_PTPairs: HTMLCollectionOf<Element> = xml_PTs.getElementsByTagName(PT.tagName);
    // Process each PTpair.
    let pTs: PT[] = [];
    for (let i = 0; i < xml_PTPairs.length; i++) {
        // Add optional BathGas
        let xml_bathGass: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(BathGas.tagName);
        let pTBathGas: BathGas | undefined;
        if (xml_bathGass.length > 0) {
            if (xml_bathGass.length > 1) {
                console.warn("xml_bathGass.length=" + xml_bathGass.length);
            }
            pTBathGas = new BathGas(getAttributes(xml_bathGass[0]), getNodeValue(getFirstChildNode(xml_bathGass[0])), molecules);
            console.log("pTBathGas" + pTBathGas.toString());
        }
        // Add optional ExperimentRate
        let xml_experimentRates: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(ExperimentRate.tagName);
        let experimentRate: ExperimentRate | undefined;
        if (xml_experimentRates.length > 0) {
            if (xml_experimentRates.length > 1) {
                console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
            }
            experimentRate = new ExperimentRate(getAttributes(xml_experimentRates[0]), parseFloat(getNodeValue(getFirstChildNode(xml_experimentRates[0]))));
            console.log("experimentRate" + experimentRate.toString());
        }
        pTs.push(new PT(getAttributes(xml_PTPairs[i]), pTBathGas, experimentRate));
        //console.log(pTs[i].toString()); // For debugging.
    }
    conditions = new Conditions(getAttributes(xml_conditions), bathGas, new PTs(getAttributes(xml_PTs), pTs));
}

let modelParameters: ModelParameters;

/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function initModelParameters(xml: XMLDocument): void {
    console.log(ModelParameters.tagName);
    let xml_modelParameters: Element = getSingularElement(xml, ModelParameters.tagName);
    // Set modelParameters_title.
    modelParameters_title = document.getElementById("modelParameters_title");
    if (modelParameters_title != null) {
        modelParameters_title.innerHTML = "Model Parameters";
    }
    // GrainSize
    let xml_grainSize: Element = getSingularElement(xml_modelParameters, GrainSize.tagName);
    let attributes: Map<string, string> = getAttributes(xml_grainSize);
    let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_grainSize)));
    let grainSize: GrainSize = new GrainSize(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill: Element = getSingularElement(xml_modelParameters, EnergyAboveTheTopHill.tagName);
    let energyAboveTheTopHill: EnergyAboveTheTopHill = new EnergyAboveTheTopHill(getAttributes(xml_energyAboveTheTopHill),
        parseFloat(getNodeValue(getFirstChildNode(xml_energyAboveTheTopHill))));

    modelParameters = new ModelParameters(grainSize, energyAboveTheTopHill);
}

let control: Control;

/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */
function initControl(xml: XMLDocument): void {
    console.log(Control.tagName);
    let xml_control: Element = getSingularElement(xml, Control.tagName);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) {
        control_title.innerHTML = "Control";
    }
    // me:testDOS
    let xml_testDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestDOS.tagName);
    let testDOS: TestDOS | undefined;
    if (xml_testDOS.length == 1) {
        testDOS = new TestDOS();
    } else {
        if (xml_testDOS.length > 1) {
            console.warn("testDOS.length=" + xml_testDOS.length);
        }
    }
    // me:printSpeciesProfile
    let xml_printSpeciesProfile: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintSpeciesProfile.tagName);
    let printSpeciesProfile: PrintSpeciesProfile | undefined;
    if (xml_printSpeciesProfile.length == 1) {
        printSpeciesProfile = new PrintSpeciesProfile();
    } else {
        if (xml_printSpeciesProfile.length > 1) {
            console.warn("printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
        }
    }
    // me:testMicroRates
    let xml_testMicroRates: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestMicroRates.tagName);
    let testMicroRates: TestMicroRates | undefined;
    if (xml_testMicroRates.length == 1) {
        testMicroRates = new TestMicroRates();
    } else {
        if (xml_testMicroRates.length > 1) {
            console.warn("testMicroRates.length=" + xml_testMicroRates.length);
        }
    }
    // me:testRateConstant
    let xml_testRateConstant: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestRateConstant.tagName);
    let testRateConstant: TestRateConstant | undefined;
    if (xml_testRateConstant.length == 1) {
        testRateConstant = new TestRateConstant();
    } else {
        if (xml_testRateConstant.length > 1) {
            console.warn("testRateConstant.length=" + xml_testRateConstant.length);
        }
    }
    // me:printGrainDOS
    let xml_printGrainDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainDOS.tagName);
    let printGrainDOS: PrintGrainDOS | undefined;
    if (xml_printGrainDOS.length == 1) {
        printGrainDOS = new PrintGrainDOS();
    } else {
        if (xml_printGrainDOS.length > 1) {
            console.warn("printGrainDOS.length=" + xml_printGrainDOS.length);
        }
    }
    // me:printCellDOS
    let xml_printCellDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintCellDOS.tagName);
    let printCellDOS: PrintCellDOS | undefined;
    if (xml_printCellDOS.length == 1) {
        printCellDOS = new PrintCellDOS();
    } else {
        if (xml_printCellDOS.length > 1) {
            console.warn("printCellDOS.length=" + xml_printCellDOS.length);
        }
    }
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintReactionOperatorColumnSums.tagName);
    let printReactionOperatorColumnSums: PrintReactionOperatorColumnSums | undefined;
    if (xml_printReactionOperatorColumnSums.length == 1) {
        printReactionOperatorColumnSums = new PrintReactionOperatorColumnSums();
    } else {
        if (xml_printReactionOperatorColumnSums.length > 1) {
            console.warn("printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
        }
    }
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintTunnellingCoefficients.tagName);
    let printTunnellingCoefficients: PrintTunnellingCoefficients | undefined;
    if (xml_printTunnellingCoefficients.length == 1) {
        printTunnellingCoefficients = new PrintTunnellingCoefficients();
    } else {
        if (xml_printTunnellingCoefficients.length > 1) {
            console.warn("printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
        }
    }
    // me:printGrainkfE
    let xml_printGrainkfE: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainkfE.tagName);
    let printGrainkfE: PrintGrainkfE | undefined;
    if (xml_printGrainkfE.length == 1) {
        printGrainkfE = new PrintGrainkfE();
    } else {
        if (xml_printGrainkfE.length > 1) {
            console.warn("printGrainkfE.length=" + xml_printGrainkfE.length);
        }
    }
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainBoltzmann.tagName);
    let printGrainBoltzmann: PrintGrainBoltzmann | undefined;
    if (xml_printGrainBoltzmann.length == 1) {
        printGrainBoltzmann = new PrintGrainBoltzmann();
    } else {
        if (xml_printGrainBoltzmann.length > 1) {
            console.warn("printGrainBoltzmann.length=" + xml_printGrainBoltzmann.length);
        }
    }
    // me:printGrainkbE
    let xml_printGrainkbE: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainkbE.tagName);
    let printGrainkbE: PrintGrainkbE | undefined;
    if (xml_printGrainkbE.length == 1) {
        printGrainkbE = new PrintGrainkbE();
    } else {
        if (xml_printGrainkbE.length > 1) {
            console.warn("printGrainkbE.length=" + xml_printGrainkbE.length);
        }
    }
    // me:eigenvalues
    let xml_eigenvalues: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(Eigenvalues.tagName);
    let eigenvalues: Eigenvalues | undefined;
    if (xml_eigenvalues.length == 1) {
        eigenvalues = new Eigenvalues(getAttributes(xml_eigenvalues[0]), parseFloat(getNodeValue(getFirstChildNode(xml_eigenvalues[0]))));
    } else {
        console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    }
    // me:hideInactive
    let xml_hideInactive: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(HideInactive.tagName);
    let hideInactive: HideInactive | undefined;
    if (xml_hideInactive.length == 1) {
        hideInactive = new HideInactive();
    } else {
        console.warn("hideInactive.length=" + xml_hideInactive.length);
    }
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(DiagramEnergyOffset.tagName);
    let diagramEnergyOffset: DiagramEnergyOffset | undefined;
    if (xml_diagramEnergyOffset.length == 1) {
        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new DiagramEnergyOffset(getAttributes(xml_diagramEnergyOffset[0]), value);
    } else {
        console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    }
    control = new Control(getAttributes(xml_control), testDOS, printSpeciesProfile, testMicroRates, testRateConstant,
        printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE,
        printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
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
        if (reactionTransitionStates != undefined) {
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



function getLabel(key: string, twa: TagWithAttributes): string {
    let attributes: Map<string, string> | undefined = twa.attributes;
    let label: string = key;
    if (attributes != undefined) {
        label += " " + mapToString(attributes, " ");
    }
    return label.trim();
}

/**
 * Display molecules.
 */
function displayMolecules(): void {
    /*
    if (molecules.size == 0) {
        return;
    }
    molecules.forEach(function (molecule, id) {
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        // Create molecule div.
        let div = document.createElement("div");
        // Go through each node
        molecule.nodes.forEach(function (node) {
            if (node instanceof NodeWithNodes) {
                processNodeWithNodes(molecule.tagName, id, div, node);
            } else if (node instanceof StringNode) {
                processStringNode(molecule.tagName, id, div, "", node);
            } else if (node instanceof NumberArrayNode) {
                processNumberArrayNode(molecule.tagName, id, div, "", node);
            } else if (node instanceof NumberNode) {
                processNumberNode(molecule.tagName, id, div, "", node);
            } else if (node instanceof TagWithAttributes) {
                processTagWithAttributes(molecule.tagName, id, div, "", node);
            } else {
                processTag(molecule.tagName, id, div, node);
            }
        });
        let moleculeDetailDiv = getCollapsibleDiv(div, molecule.getLabel(), id + "_details", "molecule");
        moleculesDiv = document.getElementById("moleculesList");
        if (moleculesDiv !== null) {
            let parentElement = document.getElementById('molecules');
            if (parentElement != undefined) {
                parentElement.appendChild(moleculeDetailDiv);
            }
        }
    });
    makeCollapsible();
        */
}

/**
 * Display reactions table.
 */
function displayReactions(): void {
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
function displayReactionsDiagram(): void {
    if (reactions.size > 1) {
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
 * Display conditions.
 */
function displayConditions(): void {
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
function displayModelParameters(): void {
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
function displayControl(): void {
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

    const pad: string = "  ";
    const padding2: string = pad.repeat(2);


    // Create moleculeList.
    let moleculeList: string = "";
    molecules.forEach(function (molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
        //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = getTag(moleculeList, "moleculeList", undefined, pad, true);

    // Create reactionList.
    let reactionList: string = "";
    reactions.forEach(function (reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
        //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = getTag(reactionList, "reactionList", undefined, pad, true);

    // Create me.Conditions
    //    let xml_conditions: string = conditions.toXML(pad, pad);

    // Create modelParameters
    //   let xml_modelParameters: string = modelParameters.toXML(pad, pad);

    // create me.control
    //   let xml_control: string = control.toXML(pad, pad);

    // Create a new Blob object from the data
    let blob = new Blob([moleculeList, reactionList],
        { type: "text/plain" });
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

}