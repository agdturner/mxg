
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
    resizeSelectElement, createFlexDiv, createButton, remove, createLabel, createInputWithFunction, createInput, createLabelWithSelectElement as createLabelWithSelect, createDiv, createLabelWithButton
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
    MaximumEvolutionTime, AutomaticallySetMaxEne
} from './control.js';

import { Mesmer, MoleculeList, ReactionList, Title } from './mesmer.js';

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
let selected: string = "\u2713 [SELECTED] Action to unselect.";
let notSelected: string = "\u2717 [NOT SELECTED] Action to select.";
let selectedLoadedValueText: string = " The appended input(s) display loaded value(s) that can be changed:";
let unselectedText: string = " Then use the appended input to specify.";
let selectedValueText: string = " Or use the appended input(s) to specify:";

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
 * Once the DOM is loaded, add a load button.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create load button
    let loadButton = createButton('Load', boundary1);
    loadButton.addEventListener('click', load);
    // Append loadButton to menu and set the display style of the menu.
    let menuDiv: HTMLDivElement = document.getElementById('menu') as HTMLDivElement;
    if (menuDiv) {
        menuDiv.appendChild(loadButton);
    }
    menuDiv.style.display = 'flex';
});

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
            // Create save button.
            let saveButtonId = 'saveButtonId';
            remove(saveButtonId);
            let saveButton = createButton('Save', boundary1);
            saveButton.id = saveButtonId;
            saveButton.addEventListener('click', saveXML);
            let menuDiv: HTMLDivElement = document.getElementById('menu') as HTMLDivElement;
            menuDiv.appendChild(saveButton);
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
        let titleElement: HTMLElement = document.getElementById("title") as HTMLElement;
        let titleString: string = titleNode.value;
        mesmer.setTitle(titleNode);
        let titleId = 'titleId';
        // Remove any existing titleDiv.
        remove(titleId);
        // Create input element.
        let titleDiv: HTMLDivElement = createLabelWithInput("text", titleId + "Input", boundary1, level0, (event) => {
            if (event.target instanceof HTMLInputElement) {
                titleNode.value = event.target.value;
                console.log(titleNode.tagName + " changed to " + titleNode.value);
                resizeInputElement(event.target);
            }
        }, titleString, "Title", fontSize1);
        titleDiv.id = titleId;
        //let input: HTMLInputElement = titleDiv.querySelector('input') as HTMLInputElement;
        //input.style.fontSize = fontSize1;
        //input.value = titleString;
        //resizeInputElement(input, 0);
        // Insert.
        titleElement.parentNode?.insertBefore(titleDiv, titleElement);
    }

    // Molecules.
    let moleculesElement: HTMLElement | null = document.getElementById("molecules");
    let moleculesDivId = 'moleculesDivId';
    // If there is an existing moleculesDiv remove it.
    remove(moleculesDivId);
    if (moleculesElement == null) {
        // Create a molecules section from scratch?
    } else {
        let moleculesDiv: HTMLDivElement = processMoleculeList(xml);
        moleculesDiv.id = moleculesDivId;
        moleculesElement.appendChild(
            getCollapsibleDiv({
                content: moleculesDiv,
                buttonLabel: "Molecules",
                buttonFontSize: fontSize1,
                boundary: boundary1,
                level: level0,
                contentDivId: moleculesDivId
            })
        );
        mesmer.setMoleculeList(new MoleculeList(getAttributes(moleculesDiv), Array.from(molecules.values())));
    }

    // Reactions.
    let reactionsElement: HTMLElement | null = document.getElementById("reactions");
    let reactionsDivId = 'reactionsDivId';
    // If there is an existing reactionsDiv remove it.
    remove(reactionsDivId);
    if (reactionsElement == null) {
        // Create a reactions section from scratch?
    } else {
        let reactionsDiv: HTMLDivElement = processReactionList(xml);
        reactionsDiv.id = reactionsDivId;
        reactionsElement.appendChild(
            getCollapsibleDiv({
                content: reactionsDiv,
                buttonLabel: "Reactions",
                buttonFontSize: fontSize1,
                boundary: boundary1,
                level: level0,
                contentDivId: reactionsDivId
            })
        );
        mesmer.setReactionList(new ReactionList(getAttributes(reactionsDiv), Array.from(reactions.values())));
    }

    // Display reaction diagram. 
    displayReactionsDiagram();

    // Conditions
    let conditionsElement: HTMLElement | null = document.getElementById("conditions");
    let conditionsDivId = 'conditionsDivId';
    // If there is an existing conditionsDiv remove it.
    remove(conditionsDivId);
    if (conditionsElement == null) {
        // Create a conditions section from scratch?
    } else {
        let conditionsDiv: HTMLDivElement = processConditions(xml);
        conditionsDiv.id = conditionsDivId;
        conditionsElement.appendChild(
            getCollapsibleDiv({
                content: conditionsDiv,
                buttonLabel: "Conditions",
                buttonFontSize: fontSize1,
                boundary: boundary1,
                level: level0,
                contentDivId: conditionsDivId
            })
        );
    }

    // Model Parameters.
    let modelParametersElement: HTMLElement | null = document.getElementById("modelParameters");
    let modelParametersDivId = 'modelParametersDivId';
    // If there is an existing modelParametersDiv remove it.
    remove(modelParametersDivId);
    if (modelParametersElement == null) {
        // Create a model parameters section from scratch?
    } else {
        let modelParametersDiv: HTMLDivElement = processModelParameters(xml);
        modelParametersDiv.id = modelParametersDivId;
        modelParametersElement.appendChild(
            getCollapsibleDiv({
                content: modelParametersDiv,
                buttonLabel: "Model Parameters",
                buttonFontSize: fontSize1,
                boundary: boundary1,
                level: level0,
                contentDivId: modelParametersDivId
            })
        );
    }

    // Control.
    let controlElement: HTMLElement | null = document.getElementById("control");
    let controlDivId = 'controlDivId';
    // If there is an existing controlDiv remove it.
    remove(controlDivId);
    if (controlElement == null) {
        // Create a control section from scratch?
    } else {
        let controlDiv: HTMLDivElement = processControl(xml);
        controlDiv.id = controlDivId;
        controlElement.appendChild(
            getCollapsibleDiv({
                content: controlDiv,
                buttonLabel: "Control",
                buttonFontSize: fontSize1,
                boundary: boundary1,
                level: level0,
                contentDivId: controlDivId
            })
        );
    }

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
                let selectElement: HTMLSelectElement = createSelectElement(bondIds, bondRef.value, molecule.id + "_" + BondRef.tagName, boundary1);
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
                let selectElement: HTMLSelectElement = createSelectElement(HinderedRotorPotential.formats,
                    hinderedRotorPotential.format, molecule.id + "_" + HinderedRotorPotential.tagName, boundary1);
                selectElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLSelectElement) {
                        hinderedRotorPotential.format = event.target.value;
                        resizeSelectElement(event.target);
                    }
                });
                resizeSelectElement(selectElement);
                hinderedRotorPotentialDiv.appendChild(selectElement);
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
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                expansionSizeInputElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        // Check the input is a number.
                        if (isNumeric(event.target.value)) {
                            hinderedRotorPotential.setExpansionSize(parseInt(event.target.value));
                        } else {
                            // Reset the input to the current value.
                            alert("Expansion size input is not a number, resetting...");
                            expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                        }
                        resizeInputElement(expansionSizeInputElement);
                    }
                });
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                resizeInputElement(expansionSizeInputElement);
                hinderedRotorPotentialDiv.appendChild(expansionSizeInputElement);
                // Add useSineTerms.
                let useSineTermsLabel: HTMLLabelElement = createLabel("Use sine terms:", boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId: string = molecule.id + "_" + DOSCMethod.tagName + "_" + HinderedRotorPotential.tagName + "_useSineTerms";
                let useSineTermsInput: HTMLInputElement = createInput("checkbox", useSineTermsInputId, boundary1);
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
                    angleInputElement.addEventListener('change', (event) => {
                        if (event.target instanceof HTMLInputElement) {
                            // Check the input is a number.
                            if (isNumeric(event.target.value)) {
                                let value: number = parseFloat(event.target.value);
                                potentialPoint.setAngle(parseFloat(event.target.value));
                            } else {
                                // Reset the input to the current value.
                                alert("Angle input is not a number, resetting...");
                                angleInputElement.value = potentialPoint.getAngle().toString();
                            }
                            resizeInputElement(angleInputElement);
                        }
                    });
                    angleInputElement.value = potentialPoint.getAngle().toString();
                    resizeInputElement(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel: HTMLLabelElement = createLabel("Potential:", boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = molecule.id + "_" + PotentialPoint.tagName + "_potential";
                    let potentialInputElement: HTMLInputElement = createInput("number", potentialInputElementId, boundary1);
                    potentialInputElement.addEventListener('change', (event) => {
                        if (event.target instanceof HTMLInputElement) {
                            // Check the input is a number.
                            if (isNumeric(event.target.value)) {
                                let value: number = parseFloat(event.target.value);
                                potentialPoint.setPotential(value);
                                console.log("Set " + PotentialPoint.tagName + " to " + value.toString());
                            } else {
                                // Reset the input to the current value.
                                alert("Potential input is not a number, resetting...");
                                potentialInputElement.value = potentialPoint.getPotential().toString();
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
                let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.id + "_" + Periodicity.tagName, boundary1, level3, (event) => {
                    if (event.target instanceof HTMLInputElement) {
                        valueString = event.target.value;
                        if (isNumeric(valueString)) {
                            let value: number = parseFloat(valueString);
                            periodicity.value = value;
                            (extraDOSCMethod.getPeriodicity() as Periodicity).value = value;
                            console.log("Set " + Periodicity.tagName + " to " + value);
                        } else {
                            // Reset the input to the current value.
                            alert("Periodicity input is not a number, resetting...");
                            event.target.value = periodicity.value.toString();
                        }
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
            let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.id + "_" + ReservoirSize.tagName, boundary1, level2, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    reservoirSize.value = parseFloat(event.target.value);
                    resizeInputElement(event.target);
                }
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
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
) {
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
        let inputDiv: HTMLDivElement = createLabelWithInput("number", molecule.id + "_" + p.dictRef, boundary1, level, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(ps, event.target);
            }
        }, inputString, label);
        let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
        //inputElement.value = inputString;
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
            let inputDiv: HTMLDivElement = createLabelWithInput("text", molecule.id + "_" + p.dictRef, boundary, level, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberArrayNode(pa, event.target);
                }
            }, inputString, label);
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
        let selectElement: HTMLSelectElement = createSelectElement(units, "Units", id, boundary1);
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
function processDOSCMethod(dOSCMethod: DOSCMethod, molecule: Molecule, moleculeDiv: HTMLDivElement): void {
    let label: HTMLLabelElement = document.createElement('label');
    label.textContent = DOSCMethod.tagName + ": ";
    let container: HTMLDivElement = document.createElement('div');
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options: string[] = ["ClassicalRotors", "me:QMRotors", "QMRotors"];
    let selectElement: HTMLSelectElement = createSelectElement(options, "DOSCMethod", molecule.id + "_" + 'Select_DOSCMethod', boundary1);
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
            let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberNode(deltaEDown, event.target);
                    inputString = event.target.value;
                    deltaEDowns[k].setValue(parseFloat(inputString));
                    console.log("Set " + id + " to " + inputString);
                    resizeInputElement(event.target);
                }
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
        input.value = node.value.toString();
    }
}

(window as any).set = setNumberNode;

/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
function processReactionList(xml: XMLDocument): HTMLDivElement {
    // Create div to contain the reaction list.
    let reactionListDiv: HTMLDivElement = createFlexDiv(boundary1);
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
                let selectElement: HTMLSelectElement = createSelectElement(options, "Role", molecule.ref + "_" + 'Select_Role', boundary1);
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
                selectElement.addEventListener('change', (event) => {
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
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
            let selectElement: HTMLSelectElement = createSelectElement(options, "Tunneling", reaction.id + "_" + 'Select_Tunneling', boundary1);
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
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(preExponential, event.target);
                                    }
                                }, inputString, label);
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
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(activationEnergy, event.target);
                                    }
                                }, inputString, label);
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
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(tInfinity, event.target);
                                    }
                                }, inputString, label);
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
                                let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3, (event) => {
                                    if (event.target instanceof HTMLInputElement) {
                                        setNumberNode(nInfinity, event.target);
                                    }
                                }, inputString, label);
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
            let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level2, (event) => {
                if (event.target instanceof HTMLInputElement) {
                    setNumberNode(excessReactantConc, event.target);
                }
            }, value.toString(), ExcessReactantConc.tagName);
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
    let conditionsDiv: HTMLDivElement = document.createElement("div");
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
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs: Set<string> = new Set(molecules.keys());
        let selectElement: HTMLSelectElement = createSelectElement(Array.from(moleculeIDs), BathGas.tagName,
            Conditions.tagName + "_" + BathGas.tagName, boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener('change', (event) => {
            if (event.target instanceof HTMLSelectElement) {
                bathGas.value = event.target.value;
                console.log("Added " + event.target.value + " as a " + BathGas.tagName);
                resizeSelectElement(event.target);
            }
        });
        selectElement.style.marginLeft = margin2;
        resizeSelectElement(selectElement);
        containerDiv.appendChild(selectElement);
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
            // Create a HTMLSelectInput for the BathGas.
            // Get the ids of all the molecules.
            let moleculeIDs: Set<string> = new Set(molecules.keys());
            let selectElement: HTMLSelectElement = createSelectElement(Array.from(moleculeIDs), BathGas.tagName, Conditions.tagName + "_" + BathGas.tagName, boundary1);
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
                    // Create a HTMLSelectInput for the BathGas.
                    // Get the ids of all the molecules.
                    let moleculeIDs: Set<string> = new Set(molecules.keys());
                    let selectElement: HTMLSelectElement = createSelectElement(Array.from(moleculeIDs), BathGas.tagName, PTpair.tagName + "_" + BathGas.tagName, boundary1);
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
                    pTPairDiv.appendChild(selectElement);
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
                    let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level0, (event) => {
                        if (event.target instanceof HTMLInputElement) {
                            setNumberNode(experimentRate, event.target);
                        }
                    }, experimentRate.value.toString(), ExperimentRate.tagName);
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
    let pInputDiv: HTMLDivElement = createLabelWithInput("number", PTpair.tagName + "_" + "P", boundary1, level0, (event) => {
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
    containerDiv.appendChild(pInputDiv);
}

/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */
function addT(containerDiv: HTMLDivElement, pTPair: PTpair): void {
    let tInputDiv: HTMLDivElement = createLabelWithInput("number", PTpair.tagName + "_" + "T", boundary1, level0, (event) => {
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
        excessReactantConcInput.addEventListener('change', (event) => {
            if (event.target instanceof HTMLInputElement) {
                pTPair.setExcessReactantConc(event.target.value);
                console.log("Set excessReactantConc to " + event.target.value);
                resizeInputElement(event.target);
            }
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
        percentExcessReactantConcInput.addEventListener('change', (event) => {
            if (event.target instanceof HTMLInputElement) {
                pTPair.setPercentExcessReactantConc(event.target.value);
                console.log("Set percentExcessReactantConc to " + event.target.value);
                resizeInputElement(event.target);
            }
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
        precisionInput.addEventListener('change', (event) => {
            if (event.target instanceof HTMLInputElement) {
                pTPair.setPrecision(event.target.value);
                console.log("Set Precision to " + event.target.value);
                resizeInputElement(event.target);
            }
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
        // Get the ids of all the molecules.
        let moleculeIDs: Set<string> = new Set(molecules.keys());
        let selectElement: HTMLSelectElement = createSelectElement(Array.from(moleculeIDs), BathGas.tagName,
            PTs.tagName + "_" + BathGas.tagName, boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener('change', (event) => {
            if (event.target instanceof HTMLSelectElement) {
                bathGas.value = event.target.value;
                console.log("Added " + event.target.value + " as a " + BathGas.tagName);
                resizeSelectElement(event.target);
            }
        });
        resizeSelectElement(selectElement);
        bathGasDiv.appendChild(selectElement);
        pTPairDiv.insertBefore(bathGasDiv, button);
        pTPairDiv.removeChild(button);
    });
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
        let inputDiv: HTMLDivElement = createLabelWithInput("number", id, boundary1, level3, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(experimentRate, event.target);
            }
        }, "", ExperimentRate.tagName);
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
    let modelParametersDiv: HTMLDivElement = document.createElement("div");
    let xml_modelParameters: Element = getSingularElement(xml, ModelParameters.tagName);
    let modelParameters: ModelParameters = new ModelParameters(getAttributes(xml_modelParameters));
    mesmer.setModelParameters(modelParameters);
    processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);



    // Process any "me:automaticallySetMaxEne" element.
    let xml_automaticallySetMaxEnes: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(AutomaticallySetMaxEne.tagName);
    if (xml_automaticallySetMaxEnes.length > 0) {
        if (xml_automaticallySetMaxEnes.length > 1) {
            throw new Error("Expecting 1 " + AutomaticallySetMaxEne.tagName + " but finding " + xml_automaticallySetMaxEnes.length + "!");
        }
        let automaticallySetMaxEneAttributes: Map<string, string> = getAttributes(xml_automaticallySetMaxEnes[0]);
        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_automaticallySetMaxEnes[0])));
        let automaticallySetMaxEne: AutomaticallySetMaxEne = new AutomaticallySetMaxEne(automaticallySetMaxEneAttributes, value);
        modelParameters.setAutomaticallySetMaxEne(automaticallySetMaxEne);
        // Create a new div for the automaticallySetMaxEne.
        let automaticallySetMaxEneId = ModelParameters.tagName + "_" + AutomaticallySetMaxEne.tagName;
        let lwi: HTMLDivElement = createLabelWithInput("number", automaticallySetMaxEneId, boundary1, level1, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(automaticallySetMaxEne, event.target);
                resizeInputElement(event.target);
            }
        }, value.toString(), AutomaticallySetMaxEne.tagName);
        // Add any units. 
        addAnyUnits(undefined, automaticallySetMaxEneAttributes, lwi, ModelParameters.tagName + "_" + AutomaticallySetMaxEne.tagName, AutomaticallySetMaxEne.tagName, boundary1);
        modelParametersDiv.appendChild(lwi);
    }

    // Process any "me:energyAboveTheTopHill" element.
    let xml_energyAboveTheTopHills: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(EnergyAboveTheTopHill.tagName);
    if (xml_energyAboveTheTopHills.length > 0) {
        if (xml_energyAboveTheTopHills.length > 1) {
            throw new Error("Expecting 1 " + EnergyAboveTheTopHill.tagName + " but finding " + xml_energyAboveTheTopHills.length + "!");
        }
        let energyAboveTheTopHillAttributes: Map<string, string> = getAttributes(xml_energyAboveTheTopHills[0]);
        let energyAboveTheTopHillValue: number = parseFloat(getNodeValue(getFirstChildNode(xml_energyAboveTheTopHills[0])));
        let energyAboveTheTopHill: EnergyAboveTheTopHill = new EnergyAboveTheTopHill(energyAboveTheTopHillAttributes,
            energyAboveTheTopHillValue);
        modelParameters.setEnergyAboveTheTopHill(energyAboveTheTopHill);
        // Create a new div for the energyAboveTheTopHill.
        let energyAboveTheTopHillId = ModelParameters.tagName + "_" + EnergyAboveTheTopHill.tagName;
        let lwi: HTMLDivElement = createLabelWithInput("number", energyAboveTheTopHillId, boundary1, level1, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(energyAboveTheTopHill, event.target);
                resizeInputElement(event.target);
            }
        }, energyAboveTheTopHill.value.toString(), EnergyAboveTheTopHill.tagName);
        // Add any units. The default units are "kT".
        addAnyUnits(["kT"], energyAboveTheTopHillAttributes, lwi, ModelParameters.tagName + "_" + EnergyAboveTheTopHill.tagName, EnergyAboveTheTopHill.tagName, boundary1);
        modelParametersDiv.appendChild(lwi);
    }

    // Process any "me:maxTemperature" element.
    let xml_maxTemperatures: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(MaxTemperature.tagName);
    if (xml_maxTemperatures.length > 0) {
        if (xml_maxTemperatures.length > 1) {
            throw new Error("Expecting 1 " + MaxTemperature.tagName + " but finding " + xml_maxTemperatures.length + "!");
        }
        let maxTemperatureAttributes: Map<string, string> = getAttributes(xml_maxTemperatures[0]);
        let maxTemperatureValue: number = parseFloat(getNodeValue(getFirstChildNode(xml_maxTemperatures[0])));
        let maxTemperature: MaxTemperature = new MaxTemperature(maxTemperatureAttributes, maxTemperatureValue);
        modelParameters.setMaxTemperature(maxTemperature);
        // Create a new div for the maxTemperature.
        let maxTemperatureId = ModelParameters.tagName + "_" + MaxTemperature.tagName;
        let lwi: HTMLDivElement = createLabelWithInput("number", maxTemperatureId, boundary1, level1, (event) => {
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(maxTemperature, event.target);
                resizeInputElement(event.target);
            }
        }, maxTemperature.value.toString(), MaxTemperature.tagName);
        // Add any units
        addAnyUnits(undefined, maxTemperatureAttributes, lwi, ModelParameters.tagName + "_" + MaxTemperature.tagName, MaxTemperature.tagName, boundary1);
        modelParametersDiv.appendChild(lwi);
    }

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
    let xml: HTMLCollectionOf<Element> = xml_modelParameters.getElementsByTagName(GrainSize.tagName);

    let gs: GrainSize;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        gs = new GrainSize(getAttributes(xml[0]), value);
        modelParameters.setGrainSize(gs);
    } else {
        valueString = "";
        gs = new GrainSize(new Map(), NaN);
    }
    // Create a input checkbox for the DiagramEnergyOffset.
    let id = ModelParameters.tagName + "_" + GrainSize.tagName + "_checkbox";
    let idI = ModelParameters.tagName + "_" + GrainSize.tagName + "_input";
    let idS = ModelParameters.tagName + "_" + GrainSize.tagName + "_SelectUnits";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createGrainSizeInput(modelParameters, div, gs, idI, idS, valueString);
            } else {
                modelParameters.removeGrainSize();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
                e = document.getElementById(idS) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", GrainSize.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createGrainSizeInput(modelParameters, div, gs, idI, idS, valueString);
    }
}

/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param gs The grain size.
 * @param id The id.
 * @param idS The id for the select units.
 * @param valueString The value string.
 */
function createGrainSizeInput(modelParameters: ModelParameters, div: HTMLDivElement, gs: GrainSize,
    id: string, idS: string, valueString: string): void {
    modelParameters.setGrainSize(gs);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(gs, event.target);
            resizeInputElement(event.target);
        }
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
    addAnyUnits(ZPE.units, gs.attributes, div, idS, GrainSize.tagName, boundary1);
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
    let controlsDiv: HTMLDivElement = document.createElement("div");
    // Get the XML "me:control" element.
    let xml_control: Element = getSingularElement(xml, Control.tagName);
    let control: Control = new Control(getAttributes(xml_control));
    mesmer.setControl(control);
    processCalculateRateCoefficientsOnly(control, controlsDiv, xml_control);
    processPrintCellDOS(control, controlsDiv, xml_control);
    processPrintCellTransitionStateFlux(control, controlsDiv, xml_control);
    processPrintReactionOperatorColumnSums(control, controlsDiv, xml_control);
    processPrintGrainBoltzmann(control, controlsDiv, xml_control);
    processPrintGrainDOS(control, controlsDiv, xml_control);
    processPrintGrainkbE(control, controlsDiv, xml_control);
    processPrintGrainkfE(control, controlsDiv, xml_control);
    processPrintTSsos(control, controlsDiv, xml_control);
    processPrintGrainedSpeciesProfile(control, controlsDiv, xml_control);
    processPrintGrainTransitionStateFlux(control, controlsDiv, xml_control);
    processPrintReactionOperatorSize(control, controlsDiv, xml_control);
    processPrintSpeciesProfile(control, controlsDiv, xml_control);
    processPrintPhenomenologicalEvolution(control, controlsDiv, xml_control);
    processPrintTunnelingCoefficients(control, controlsDiv, xml_control);
    processPrintCrossingCoefficients(control, controlsDiv, xml_control);
    processTestDOS(control, controlsDiv, xml_control);
    processTestRateConstants(control, controlsDiv, xml_control);
    processUseTheSameCellNumberForAllConditions(control, controlsDiv, xml_control);
    processHideInactive(control, controlsDiv, xml_control);
    processForceMacroDetailedBalance(control, controlsDiv, xml_control);
    processTestMicroRates(control, controlsDiv, xml_control);
    processCalcMethod(control, controlsDiv, xml_control);
    processEigenvalues(control, controlsDiv, xml_control);
    processShortestTimeOfInterest(control, controlsDiv, xml_control);
    processMaximumEvolutionTime(control, controlsDiv, xml_control);
    processAutomaticallySetMaxEne(control, controlsDiv, xml_control);
    processDiagramEnergyOffset(control, controlsDiv, xml_control);
    return controlsDiv;
}

/**
 * Set the check box.
 * @param input The input div.
 * @param xml_control The xml.
 */
function setCheck(input: HTMLDivElement, xml: HTMLCollectionOf<Element>): boolean {
    let cb = input.querySelector('input') as HTMLInputElement;
    if (xml.length > 0) {
        if (xml.length > 1) {
            console.error("xml.length=" + xml.length);
        }
        cb.checked = true;
        return true;
    }
    return false;
}

/**
 * Process "me:calculateRateCoefficientsOnly".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processCalculateRateCoefficientsOnly(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + CalculateRateCoefficientsOnly.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setCalculateRateCoefficientsOnly(new CalculateRateCoefficientsOnly());
            } else {
                control.removeCalculateRateCoefficientsOnly();
            }
        }
    }, "", CalculateRateCoefficientsOnly.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(CalculateRateCoefficientsOnly.tagName))) {
        control.setCalculateRateCoefficientsOnly(new CalculateRateCoefficientsOnly());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printCellDOS".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintCellDOS(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintCellDOS.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintCellDOS(new PrintCellDOS());
            } else {
                control.removePrintCellDOS();
            }
        }
    }, "", PrintCellDOS.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintCellDOS.tagName))) {
        control.setPrintCellDOS(new PrintCellDOS());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printCellTransitionStateFlux".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintCellTransitionStateFlux(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintCellTransitionStateFlux.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintCellTransitionStateFlux(new PrintCellTransitionStateFlux());
            } else {
                control.removePrintCellTransitionStateFlux();
            }
        }
    }, "", PrintCellTransitionStateFlux.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintCellTransitionStateFlux.tagName))) {
        control.setPrintCellTransitionStateFlux(new PrintCellTransitionStateFlux());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printReactionOperatorColumnSums".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintReactionOperatorColumnSums(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintReactionOperatorColumnSums.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintReactionOperatorColumnSums(new PrintReactionOperatorColumnSums());
            } else {
                control.removePrintReactionOperatorColumnSums();
            }
        }
    }, "", PrintReactionOperatorColumnSums.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintReactionOperatorColumnSums.tagName))) {
        control.setPrintReactionOperatorColumnSums(new PrintReactionOperatorColumnSums());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printGrainBoltzmann".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintGrainBoltzmann(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintGrainBoltzmann.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainBoltzmann(new PrintGrainBoltzmann());
            } else {
                control.removePrintGrainBoltzmann();
            }
        }
    }, "", PrintGrainBoltzmann.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintGrainBoltzmann.tagName))) {
        control.setPrintGrainBoltzmann(new PrintGrainBoltzmann());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printGrainDOS".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintGrainDOS(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintGrainDOS.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainDOS(new PrintGrainDOS());
            } else {
                control.removePrintGrainDOS();
            }
        }
    }, "", PrintGrainDOS.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintGrainDOS.tagName))) {
        control.setPrintGrainDOS(new PrintGrainDOS());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printGrainkbE".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintGrainkbE(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintGrainkbE.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainkbE(new PrintGrainkbE());
            } else {
                control.removePrintGrainkbE();
            }
        }
    }, "", PrintGrainkbE.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintGrainkbE.tagName))) {
        control.setPrintGrainkbE(new PrintGrainkbE());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printGrainkfE".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintGrainkfE(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintGrainkfE.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainkfE(new PrintGrainkfE());
            } else {
                control.removePrintGrainkfE();
            }
        }
    }, "", PrintGrainkfE.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintGrainkfE.tagName))) {
        control.setPrintGrainkfE(new PrintGrainkfE());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printTSsos".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintTSsos(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintTSsos.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintTSsos(new PrintTSsos());
            } else {
                control.removePrintTSsos();
            }
        }
    }, "", PrintTSsos.tagName);
    setCheck(input, xml_control.getElementsByTagName(PrintTSsos.tagName));
    if (setCheck(input, xml_control.getElementsByTagName(PrintTSsos.tagName))) {
        control.setPrintTSsos(new PrintTSsos());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printGrainedSpeciesProfile".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintGrainedSpeciesProfile(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintGrainedSpeciesProfile.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainedSpeciesProfile(new PrintGrainedSpeciesProfile());
            } else {
                control.removePrintGrainedSpeciesProfile();
            }
        }
    }, "", PrintGrainedSpeciesProfile.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintGrainedSpeciesProfile.tagName))) {
        control.setPrintGrainedSpeciesProfile(new PrintGrainedSpeciesProfile());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printGrainTransitionStateFlux".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintGrainTransitionStateFlux(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintGrainTransitionStateFlux.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintGrainTransitionStateFlux(new PrintGrainTransitionStateFlux());
            } else {
                control.removePrintGrainTransitionStateFlux();
            }
        }
    }, "", PrintGrainTransitionStateFlux.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintGrainTransitionStateFlux.tagName))) {
        control.setPrintGrainTransitionStateFlux(new PrintGrainTransitionStateFlux());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printReactionOperatorSize".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintReactionOperatorSize(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintReactionOperatorSize.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintReactionOperatorSize(new PrintReactionOperatorSize());
            } else {
                control.removePrintReactionOperatorSize();
            }
        }
    }, "", PrintReactionOperatorSize.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintReactionOperatorSize.tagName))) {
        control.setPrintReactionOperatorSize(new PrintReactionOperatorSize());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printSpeciesProfile".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintSpeciesProfile(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintSpeciesProfile.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintSpeciesProfile(new PrintSpeciesProfile());
            } else {
                control.removePrintSpeciesProfile();
            }
        }
    }, "", PrintSpeciesProfile.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintSpeciesProfile.tagName))) {
        control.setPrintSpeciesProfile(new PrintSpeciesProfile());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printPhenomenologicalEvolution".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintPhenomenologicalEvolution(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintPhenomenologicalEvolution.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintPhenomenologicalEvolution(new PrintPhenomenologicalEvolution());
            } else {
                control.removePrintPhenomenologicalEvolution();
            }
        }
    }, "", PrintPhenomenologicalEvolution.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintPhenomenologicalEvolution.tagName))) {
        control.setPrintPhenomenologicalEvolution(new PrintPhenomenologicalEvolution());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printTunnelingCoefficients".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintTunnelingCoefficients(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintTunnelingCoefficients.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintTunnelingCoefficients(new PrintTunnelingCoefficients());
            } else {
                control.removePrintTunnelingCoefficients();
            }
        }
    }, "", PrintTunnelingCoefficients.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintTunnelingCoefficients.tagName))) {
        control.setPrintTunnelingCoefficients(new PrintTunnelingCoefficients());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:printCrossingCoefficients".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processPrintCrossingCoefficients(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + PrintCrossingCoefficients.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setPrintCrossingCoefficients(new PrintCrossingCoefficients());
            } else {
                control.removePrintCrossingCoefficients();
            }
        }
    }, "", PrintCrossingCoefficients.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(PrintCrossingCoefficients.tagName))) {
        control.setPrintCrossingCoefficients(new PrintCrossingCoefficients());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:testDOS".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processTestDOS(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + TestDOS.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setTestDOS(new TestDOS());
            } else {
                control.removeTestDOS();
            }
        }
    }, "", TestDOS.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(TestDOS.tagName))) {
        control.setTestDOS(new TestDOS());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:testRateConstants".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processTestRateConstants(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + TestRateConstants.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setTestRateConstants(new TestRateConstants());
            } else {
                control.removeTestRateConstants();
            }
        }
    }, "", TestRateConstants.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(TestRateConstants.tagName))) {
        control.setTestRateConstants(new TestRateConstants());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:useTheSameCellNumberForAllConditions".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processUseTheSameCellNumberForAllConditions(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + UseTheSameCellNumberForAllConditions.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setUseTheSameCellNumberForAllConditions(new UseTheSameCellNumberForAllConditions());
            } else {
                control.removeUseTheSameCellNumberForAllConditions();
            }
        }
    }, "", UseTheSameCellNumberForAllConditions.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(UseTheSameCellNumberForAllConditions.tagName))) {
        control.setUseTheSameCellNumberForAllConditions(new UseTheSameCellNumberForAllConditions());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:hideInactive".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processHideInactive(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + HideInactive.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setHideInactive(new HideInactive());
            } else {
                control.removeHideInactive();
            }
        }
    }, "", HideInactive.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(HideInactive.tagName))) {
        control.setHideInactive(new HideInactive());
    }
    controlsDiv.appendChild(input);
}

/**
 * Process "me:forceMacroDetailedBalance".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processForceMacroDetailedBalance(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let id = Control.tagName + "_" + ForceMacroDetailedBalance.tagName + "_checkbox";
    let input: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level1, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                control.setForceMacroDetailedBalance(new ForceMacroDetailedBalance());
            } else {
                control.removeForceMacroDetailedBalance();
            }
        }
    }, "", ForceMacroDetailedBalance.tagName);
    if (setCheck(input, xml_control.getElementsByTagName(ForceMacroDetailedBalance.tagName))) {
        control.setForceMacroDetailedBalance(new ForceMacroDetailedBalance());
    }
    controlsDiv.appendChild(input);
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
    let id = Control.tagName + "_" + TestMicroRates.tagName + "_checkbox";
    let idTmax = Control.tagName + "_" + TestMicroRates.tagName + "_Tmax";
    let idTmin = Control.tagName + "_" + TestMicroRates.tagName + "_Tmin";
    let idTstep = Control.tagName + "_" + TestMicroRates.tagName + "_Tstep";
    let xml_tmr: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestMicroRates.tagName);
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createTestMicroRates(div, xml_tmr, idTmax, idTmin, idTstep, control);
            } else {
                control.removeTestMicroRates();
                // Remove any existing Tmax.
                let e: HTMLDivElement;
                e = document.getElementById(idTmax) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
                // Remove any existing Tmin.
                e = document.getElementById(idTmin) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
                // Remove any existing Tstep.
                e = document.getElementById(idTstep) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", TestMicroRates.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml_tmr)) {
        createTestMicroRates(div, xml_tmr, idTmax, idTmin, idTstep, control);
    }
}

/**
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 * @param control The control.
 */
function createTestMicroRates(div: HTMLDivElement, xml_tmr: HTMLCollectionOf<Element>,
    idTmax: string, idTmin: string, idTstep: string, control: Control): void {
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
    // Tmax.
    let tMax: number = tmr.getTmax();
    let tMaxlwi: HTMLDivElement = createLabelWithInput("number", idTmax + "_input", boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            // Check the value is a number.
            if (isNumeric(event.target.value)) {
                tmr.setTmax(parseFloat(event.target.value));
                console.log("Set Tmax to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = tMax.toString();
            }
            resizeInputElement(event.target);
        }
    }, tMax.toString(), "Tmax");
    tMaxlwi.id = idTmax;
    resizeInputElement(tMaxlwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin: number = tmr.getTmin();
    let tMinlwi: HTMLDivElement = createLabelWithInput("number", idTmin + "_input", boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            // Check the value is a number.
            if (isNumeric(event.target.value)) {
                tmr.setTmin(parseFloat(event.target.value));
                console.log("Set Tmin to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = tMax.toString();
            }
            resizeInputElement(event.target);
        }
    }, tMin.toString(), "Tmin");
    tMinlwi.id = idTmin;
    resizeInputElement(tMinlwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep: number = tmr.getTstep();
    let tSteplwi: HTMLDivElement = createLabelWithInput("number", idTstep + "_input", boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            // Check the value is a number.
            if (isNumeric(event.target.value)) {
                tmr.setTstep(parseFloat(event.target.value));
                console.log("Set Tstep to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = tMax.toString();
            }
            resizeInputElement(event.target);
        }
    }, tStep.toString(), "Tstep");
    tSteplwi.id = idTstep;
    resizeInputElement(tSteplwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tSteplwi);
    control.setTestMicroRates(tmr);
}

/**
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processCalcMethod(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let id = Control.tagName + "_" + CalcMethod.tagName + "_checkbox";
    let idI = Control.tagName + "_" + CalcMethod.tagName + "_input";
    let xml_cm: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(CalcMethod.tagName);
    let cm: CalcMethod;
    if (xml_cm.length == 1) {
        cm = new CalcMethod(getAttributes(xml_cm[0]), getNodeValue(getFirstChildNode(xml_cm[0])));
    } else {
        cm = new CalcMethod(new Map(), "");
    }
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createCalcMethodInput(control, div, cm, idI, cm.value);
            } else {
                control.removeTestMicroRates();
                // Remove any existing CalcMethod select.
                let e: HTMLDivElement;
                e = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", CalcMethod.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml_cm)) {
        createCalcMethodInput(control, div, cm, idI, cm.value);
    }
    */
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(CalcMethod.tagName);
    let lwb = createLabelWithButton(CalcMethod.tagName, "", boundary1, boundary1);
    let button: HTMLButtonElement = lwb.querySelector('button') as HTMLButtonElement;
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(lwb);
    let id = Control.tagName + "_" + CalcMethod.tagName + "_input";
    let cm: CalcMethod;
    if (xml.length == 1) {
        let value: string = getNodeValue(getFirstChildNode(xml[0]));
        cm = new CalcMethod(getAttributes(xml[0]), value);
        button.textContent = selected + selectedLoadedValueText;
        createCalcMethodInput(control, div, cm, id, value);
        button.classList.toggle('optionOff');
    } else {
        cm = new CalcMethod(new Map(), "Please use the dropdown to select a value...");
        button.textContent = notSelected + unselectedText;
        button.classList.toggle('optionOn');
    }
    let valueString: string = cm.value;
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(CalcMethod.tagName)) {
            createCalcMethodInput(control, div, cm, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = cm.value;
            control.removeCalcMethod();
            // Remove any existing div.
            let e: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            if (e != null) {
                e.remove();
            }
            button.textContent = notSelected + unselectedText;
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
function createCalcMethodInput(control: Control, div: HTMLDivElement, cm: CalcMethod, id: string, valueString: string): void {
    let options: string[] =  CalcMethod.options;
    options.push("Please use the dropdown to select a value...");
    let select: HTMLSelectElement = createSelectElement(options, valueString, id, boundary1);
    select.addEventListener('change', (event) => {
        if (event.target instanceof HTMLSelectElement) {
            cm.value = event.target.value;
            resizeSelectElement(event.target);
        }
    });
    select.value = valueString;
    resizeSelectElement(select);
    div.appendChild(select);
    control.setCalcMethod(cm);
}

/**
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */
function processEigenvalues(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(Eigenvalues.tagName);
    let eigenvalues: Eigenvalues;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        eigenvalues = new Eigenvalues(getAttributes(xml[0]), value);
        control.setEigenvalues(eigenvalues);
    } else {
        valueString = "";
        eigenvalues = new Eigenvalues(new Map(), NaN);
    }
    // Create a input checkbox for the Eigenvalues.
    let id = Control.tagName + "_" + Eigenvalues.tagName + "_checkbox";
    let idI = Control.tagName + "_" + Eigenvalues.tagName + "_input";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createEigenValuesInput(control, div, eigenvalues, idI, valueString);
            } else {
                control.removeEigenvalues();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", Eigenvalues.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createEigenValuesInput(control, div, eigenvalues, idI, valueString);
    }
    */
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(Eigenvalues.tagName);
    let lwb = createLabelWithButton(Eigenvalues.tagName, "", boundary1, boundary1);
    let button: HTMLButtonElement = lwb.querySelector('button') as HTMLButtonElement;
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(lwb);
    let id = Control.tagName + "_" + Eigenvalues.tagName + "_input";
    let eigenvalues: Eigenvalues;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        eigenvalues = new Eigenvalues(getAttributes(xml[0]), value);
        control.setEigenvalues(eigenvalues);
        button.textContent = selected + selectedLoadedValueText;
        createEigenValuesInput(control, div, eigenvalues, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        eigenvalues = new Eigenvalues(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the Eigenvalues already exists
        if (!control.index.has(Eigenvalues.tagName)) {
            createEigenValuesInput(control, div, eigenvalues, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = eigenvalues.value.toString();
            control.removeEigenvalues();
            // Remove any existing div.
            let e: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            if (e != null) {
                e.remove();
            }
            button.textContent = notSelected + unselectedText;
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
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(eigenvalues, event.target);
            resizeInputElement(event.target);
        }
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
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(ShortestTimeOfInterest.tagName);
    let stoi: ShortestTimeOfInterest;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        stoi = new ShortestTimeOfInterest(getAttributes(xml[0]), value);
        control.setShortestTimeOfInterest(stoi);
    } else {
        valueString = "";
        stoi = new ShortestTimeOfInterest(new Map(), NaN);
    }
    // Create a input checkbox for the ShortestTimeOfInterest.
    let id = Control.tagName + "_" + ShortestTimeOfInterest.tagName + "_checkbox";
    let idI = Control.tagName + "_" + ShortestTimeOfInterest.tagName + "_input";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createShortestTimeOfInterest(control, div, stoi, idI, valueString);
            } else {
                control.removeShortestTimeOfInterest();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", ShortestTimeOfInterest.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createShortestTimeOfInterest(control, div, stoi, idI, valueString);
    }
    */
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(ShortestTimeOfInterest.tagName);
    let lwb = createLabelWithButton(ShortestTimeOfInterest.tagName, "", boundary1, boundary1);
    let button: HTMLButtonElement = lwb.querySelector('button') as HTMLButtonElement;
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(lwb);
    let id = Control.tagName + "_" + ShortestTimeOfInterest.tagName + "_input";
    let stoi: ShortestTimeOfInterest;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        stoi = new ShortestTimeOfInterest(getAttributes(xml[0]), value);
        control.setShortestTimeOfInterest(stoi);
        button.textContent = selected + selectedLoadedValueText;
        createShortestTimeOfInterest(control, div, stoi, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        stoi = new ShortestTimeOfInterest(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the ShortestTimeOfInterest already exists
        if (!control.index.has(ShortestTimeOfInterest.tagName)) {
            createShortestTimeOfInterest(control, div, stoi, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = stoi.value.toString();
            control.removeShortestTimeOfInterest();
            // Remove any existing div.
            let e: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            if (e != null) {
                e.remove();
            }
            button.textContent = notSelected + unselectedText;
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
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(stoi, event.target);
            resizeInputElement(event.target);
        }
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
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(MaximumEvolutionTime.tagName);
    let met: MaximumEvolutionTime;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        met = new MaximumEvolutionTime(getAttributes(xml[0]), value);
        control.setMaximumEvolutionTime(met);
    } else {
        valueString = "";
        met = new MaximumEvolutionTime(new Map(), NaN);
    }
    // Create a input checkbox for the MaximumEvolutionTime.
    let id = Control.tagName + "_" + MaximumEvolutionTime.tagName + "_checkbox";
    let idI = Control.tagName + "_" + MaximumEvolutionTime.tagName + "_input";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createMaximumEvolutionTimeInput(control, div, met, idI, valueString);
            } else {
                control.removeMaximumEvolutionTime();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", MaximumEvolutionTime.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createMaximumEvolutionTimeInput(control, div, met, idI, valueString);
    }
    */
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(MaximumEvolutionTime.tagName);
    let lwb = createLabelWithButton(MaximumEvolutionTime.tagName, "", boundary1, boundary1);
    let button: HTMLButtonElement = lwb.querySelector('button') as HTMLButtonElement;
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(lwb);
    let id = Control.tagName + "_" + MaximumEvolutionTime.tagName + "_input";
    let met: MaximumEvolutionTime;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        met = new MaximumEvolutionTime(getAttributes(xml[0]), value);
        control.setMaximumEvolutionTime(met);
        button.textContent = selected + selectedLoadedValueText;
        createMaximumEvolutionTimeInput(control, div, met, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        met = new MaximumEvolutionTime(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the MaximumEvolutionTime already exists
        if (!control.index.has(MaximumEvolutionTime.tagName)) {
            createMaximumEvolutionTimeInput(control, div, met, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = met.value.toString();
            control.removeMaximumEvolutionTime();
            // Remove any existing div.
            let e: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            if (e != null) {
                e.remove();
            }
            button.textContent = notSelected + unselectedText;
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
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(met, event.target);
            resizeInputElement(event.target);
        }
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
function processAutomaticallySetMaxEne(control: Control, controlsDiv: HTMLDivElement, xml_control: Element): void {
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(AutomaticallySetMaxEne.tagName);
    let lwb = createLabelWithButton(AutomaticallySetMaxEne.tagName, "", boundary1, boundary1);
    let button: HTMLButtonElement = lwb.querySelector('button') as HTMLButtonElement;
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(lwb);
    let id = Control.tagName + "_" + AutomaticallySetMaxEne.tagName + "_input";
    let asme: AutomaticallySetMaxEne;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        asme = new AutomaticallySetMaxEne(getAttributes(xml[0]), value);
        control.setAutomaticallySetMaxEne(asme);
        button.textContent = selected + selectedLoadedValueText;
        createAutomaticallySetMaxEneInput(control, div, asme, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        asme = new AutomaticallySetMaxEne(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the AutomaticallySetMaxEne already exists
        if (!control.index.has(AutomaticallySetMaxEne.tagName)) {
            createAutomaticallySetMaxEneInput(control, div, asme, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = asme.value.toString();
            control.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            let e: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            if (e != null) {
                e.remove();
            }
            button.textContent = notSelected + unselectedText;
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
function createAutomaticallySetMaxEneInput(control: Control, div: HTMLDivElement, asme: AutomaticallySetMaxEne,
    id: string, valueString: string) {
    control.setAutomaticallySetMaxEne(asme);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(asme, event.target);
            resizeInputElement(event.target);
        }
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
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(DiagramEnergyOffset.tagName);
    let lwb = createLabelWithButton(DiagramEnergyOffset.tagName, "", boundary1, boundary1);
    let button: HTMLButtonElement = lwb.querySelector('button') as HTMLButtonElement;
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    div.appendChild(lwb);
    let id = Control.tagName + "_" + DiagramEnergyOffset.tagName + "_input";
    let deo: DiagramEnergyOffset;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        deo = new DiagramEnergyOffset(getAttributes(xml[0]), value);
        control.setDiagramEnergyOffset(deo);
        button.textContent = selected + selectedLoadedValueText;
        createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        button.classList.toggle('optionOff');
    } else {
        valueString = "";
        deo = new DiagramEnergyOffset(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle('optionOn');
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the DiagramEnergyOffset already exists
        if (!control.index.has(DiagramEnergyOffset.tagName)) {
            createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle('optionOff');
            button.classList.toggle('optionOn');
        } else {
            valueString = deo.value.toString();
            control.removeDiagramEnergyOffset();
            // Remove any existing div.
            let e: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
            if (e != null) {
                e.remove();
            }
            button.textContent = notSelected + unselectedText;
            button.classList.toggle('optionOn')
            button.classList.toggle('optionOff');
        }
    });
    /*
    // Checkbox to toggle the DiagramEnergyOffset.
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createDiagramEnergyOffsetInput(control, div, deo, idI, valueString);
            } else {
                control.removeDiagramEnergyOffset();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", DiagramEnergyOffset.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        lwi.textContent = "Hide Diagram Energy Offset";
    }
    */
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
    input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(deo, event.target);
            resizeInputElement(event.target);
        }
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
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
        let reactionsDiv: HTMLDivElement = document.getElementById("reactions") as HTMLDivElement;
        let id = "reactionsDiagram";
        // Remove any existing canvas.
        let existingCanvas: HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement;
        if (existingCanvas != null) {
            existingCanvas.remove();
        }
        // Create a new canvas.
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.id = id;
        canvas.width = 800;
        canvas.height = 400;
        canvas.style.border = "1px solid black";
        let font: string = "14px Arial";
        let dark: boolean = true;
        let lw: number = 4;
        let lwc: number = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, dark, font, lw, lwc);
        }
        // Add the canvas to the document.
        reactionsDiv.appendChild(canvas);
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