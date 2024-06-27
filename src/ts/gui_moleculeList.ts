import Big from 'big.js';
import { sy_add, s_Add_sy_add, addMolecule, addRID, level1, s_container, boundary1, addOptionByClassName, s_description, 
    mesmer, s_save, remove, getMolecule, getMoleculeKeys, libmols, removeOptionByClassName, addOrRemoveInstructions, 
    s_selectOption, selectAnotherOptionEventListener, sy_edit, sy_deselected, sy_selected, s_input, s_optionOff, s_optionOn, 
    processNumber, addRemoveButton, processPropertyScalarNumber, setNumberNode, processPropertyScalarString, s_table, 
    addSaveAsCSVButton, s_undefined, addAnyUnits, s_Add_from_library, IDManager, s_viewer } from './app.js';
import { BathGas } from './xml_conditions.js';
import {
    createLabelWithInput, getCollapsibleDiv, resizeInputElement, createSelectElement, resizeSelectElement,
    createFlexDiv, createButton, createLabel, createInput, createLabelWithSelect, createDiv,
    createLabelWithTextArea, resizeTextAreaElement, s_button, sy_upTriangle, sy_downTriangle, createTextArea,
    createTable, addTableRow, s_select } from './html.js';
import { Description, Mesmer, MoleculeList, T } from './xml_mesmer.js';
import { MetadataList, Metadata } from './xml_metadata.js';
import { Atom, AtomArray, Bond, BondArray, BondRef, DOSCMethod, DeltaEDown, DensityOfStates, DensityOfStatesList, 
    DistributionCalcMethod, EinsteinAij, EinsteinBij, EnergyTransferModel, Epsilon, ExtraDOSCMethod, FrequenciesScaleFactor, 
    Hessian, Hf0, Hf298, HfAT0, HinderedRotorPotential, MW, Molecule, Periodicity, PotentialPoint, Property, PropertyArray, 
    PropertyList, Qtot, ReservoirSize, RotConsts, Sigma, SpinMultiplicity, Sumc, Sumg, SymmetryNumber, TSOpticalSymmetryNumber, 
    ThermoTable, ThermoValue, VibFreqs, ZPE } from './xml_molecule.js';
import { getID, isNumeric, mapToString } from './util.js';
import { getSingularElement, getAttributes, getNodeValue, getFirstChildNode, getInputString } from './xml.js';
import { get } from 'http';

/**
 * Create an add molecule button.
 * @param mlDiv The MoleculeList HTMLDivElement.
 * @param mIDM The IDManager for molecule divs.
 * @param molecules The molecules map.
 * @returns The add molecule button.
 */
export function getAddMoleculeButton(mlDiv: HTMLDivElement, mIDM: IDManager,
    molecules: Map<string, Molecule>): HTMLButtonElement {
    let addMoleculeButton: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    mlDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', () => {
        let mid: string = "Kr";
        let m: Molecule = new Molecule(new Map(), mid);
        mid = setMoleculeID(mid, m, molecules);
        addMolecule(m, molecules);
        m.setAtoms(new AtomArray(new Map()));
        m.setBonds(new BondArray(new Map()));
        let mDivID: string = mIDM.addID(Molecule.tagName, mid);
        let mDiv: HTMLDivElement = createDiv(mDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, s_container);
        let mcDiv: HTMLDivElement = getCollapsibleDiv(mcDivID, mlDiv, addMoleculeButton, mDiv, mid, boundary1, level1);
        // Add the molecule to the BathGas select elements.
        addOptionByClassName(BathGas.tagName, mid);
        // Add edit Name button.
        addEditIDButton(m, mcDiv.querySelector(s_button) as HTMLButtonElement, mIDM, mDiv, level1);
        // Description
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, s_description), mIDM, m.getDescription.bind(m),
            m.setDescription.bind(m), boundary1, level1));
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID: string = mIDM.addID(mDivID, AtomArray.tagName);
        let aaDiv: HTMLDivElement = createDiv(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, s_container);
        let aacDiv: HTMLDivElement = getCollapsibleDiv(aacDivID, mDiv, null, aaDiv, AtomArray.tagName, boundary1, level1);
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, Atom.tagName, boundary1, level1));
        // Create collapsible BondArray HTMLDivElement.
        let baDivID: string = mIDM.addID(mDivID, BondArray.tagName);
        let baDiv: HTMLDivElement = createDiv(baDivID);
        let bacDivID = mIDM.addID(baDivID, s_container);
        let bacDiv: HTMLDivElement = getCollapsibleDiv(bacDivID, mDiv, null, baDiv, BondArray.tagName, boundary1, level1);
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, Bond.tagName, boundary1, level1));
        create3DViewer(mIDM, m, mDiv, boundary1, level1);
        // Create collapsible Properties HTMLDivElement.
        let plDivID: string = mIDM.addID(mDivID, PropertyList.tagName);
        let plDiv: HTMLDivElement = createDiv(plDivID);
        let plcDivID = mIDM.addID(plDivID, s_container);
        let plcDiv: HTMLDivElement = getCollapsibleDiv(plcDivID, mDiv, null, plDiv, PropertyList.tagName, boundary1, level1);
        // Add code to add propertyArray...
        // Add a remove molecule button.
        addRemoveButton(mDiv, level1, () => {
            mlDiv.removeChild(mcDiv);
            mIDM.removeIDs(mDivID);
            mIDM.removeIDs(getID(mDivID, s_description));
            mIDM.removeIDs(getID(mDivID, AtomArray.tagName));
            mIDM.removeIDs(getID(mDivID, BondArray.tagName));
            mIDM.removeIDs(getID(mDivID, s_viewer));
            mIDM.removeIDs(getID(mDivID, PropertyList.tagName));
            molecules.delete(m.getID());
        });
    });
    return addMoleculeButton;
}

/**
 * Create an add from library button.
 * @param mlDiv The MoleculeList HTMLDivElement.
 * @param amb The add molecule button.
 * @param molecules The molecules map.
 * @returns The add from library button.
 */
export function getAddFromLibraryButton(mlDiv: HTMLDivElement, amb: HTMLButtonElement, mIDM: IDManager,
    molecules: Map<string, Molecule>): HTMLButtonElement {
    let addFromLibraryButton: HTMLButtonElement = createButton(s_Add_from_library, undefined, boundary1);
    mlDiv.appendChild(addFromLibraryButton);
    // Add event listener for the button.
    addFromLibraryButton.addEventListener('click', () => {
        // Create a select element to select a libraryMolecule.
        let selectDivID: string = getID(Molecule.tagName, "div");
        remove(selectDivID);
        let selectDiv: HTMLDivElement = createDiv(mIDM.addID(selectDivID), level1);
        let options: string[] = Array.from(getMoleculeKeys(libmols));
        if (options.length == 0) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        console.log("options.length=" + options.length);
        addOrRemoveInstructions(options, true);
        let selectID: string = getID(selectDivID, s_select);
        remove(selectID);
        let select: HTMLSelectElement = createSelectElement(options, "Select molecule", s_selectOption,
            mIDM.addID(selectID), boundary1);
        select.classList.add(Molecule.tagName);
        selectDiv.appendChild(select);
        mlDiv.insertBefore(selectDiv, amb);
        selectAnotherOptionEventListener(options, select);
        select.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            let selectedOption: HTMLOptionElement = target.options[target.selectedIndex];
            let label: string = selectedOption.value;
            let molecule: Molecule = getMolecule(label, libmols)!;
            let mid: string = molecule.getID();
            mid = setMoleculeID(mid, molecule, molecules);
            molecules.set(mid, molecule);
            // Add molecule to the MoleculeList.
            let mDivID: string = mIDM.addID(Molecule.tagName, molecules.size);
            let moleculeDiv: HTMLDivElement = createDiv(mDivID);
            // Create collapsible Molecule HTMLDivElement.
            let mcDivID = mIDM.addID(mDivID, s_container);
            let mcDiv: HTMLDivElement = getCollapsibleDiv(mcDivID, mlDiv, amb, moleculeDiv,
                molecule.getLabel(), boundary1, level1);
            // Add the molecule to the BathGas select elements.
            addOptionByClassName(BathGas.tagName, molecule.getID());
            // Add edit Name button.
            addEditIDButton(molecule, mcDiv.querySelector(s_button) as HTMLButtonElement, mIDM, moleculeDiv, level1);
            // Description
            moleculeDiv.appendChild(processDescription(mIDM.addID(mDivID, s_description), mIDM,
                molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), boundary1, level1));
            // Create collapsible MetadataList HTMLDivElement.
            let mlistDivID: string = mIDM.addID(mDivID, MetadataList.tagName);
            let mlistDiv: HTMLDivElement = createDiv(mlistDivID, level1);
            let mlistcDivID = mIDM.addID(mlistDivID, s_container);
            let mlistcDiv: HTMLDivElement = getCollapsibleDiv(mlistcDivID, moleculeDiv, null, mlistDiv, MetadataList.tagName, boundary1, level1);
            // Add metadata.
            let metadataList: MetadataList | undefined = molecule.getMetadataList();
            if (metadataList != undefined) {
                metadataList.getMetadata().forEach((md) => {
                    let mdDiv = createDiv();
                    mlistDiv.appendChild(mdDiv);
                    mdDiv.appendChild(createLabel(md.getLabelText(), boundary1));
                });
            }
            // Create collapsible AtomArray HTMLDivElement.
            let aaDivID: string = mIDM.addID(mDivID, AtomArray.tagName);
            let aaDiv: HTMLDivElement = createDiv(aaDivID);
            let aacDivID = mIDM.addID(aaDivID, s_container);
            let aacDiv: HTMLDivElement = getCollapsibleDiv(aacDivID, moleculeDiv, null, aaDiv, AtomArray.tagName, boundary1, level1);
            // Add atoms.
            let aa = molecule.getAtoms();
            if (aa != undefined) {
                aa.atoms.forEach((a) => {
                    aaDiv.appendChild(addAtom(mIDM, molecule, aaDivID, molecule.getAtoms(), a, boundary1, level1));
                });
            }
            aaDiv.appendChild(getAddAtomButton(mIDM, molecule, aaDiv, Atom.tagName, boundary1, level1));
            // Create collapsible BondArray HTMLDivElement.
            let baDivID: string = mIDM.addID(mDivID, BondArray.tagName);
            let baDiv: HTMLDivElement = createDiv(baDivID);
            let bacDivID = mIDM.addID(baDivID, s_container);
            let bacDiv: HTMLDivElement = getCollapsibleDiv(bacDivID, moleculeDiv, null, baDiv, BondArray.tagName, boundary1, level1);
            // Add bonds.
            let ba: BondArray = molecule.getBonds();
            if (ba != undefined) {
                molecule.getBonds().bonds.forEach((b: Bond) => {
                    if (aa == undefined) {
                        throw new Error("Atoms are not defined for molecule " + molecule.getLabel());
                    }
                    baDiv.appendChild(addBond(mIDM, molecule, baDivID, aa.atoms, molecule.getBonds(), b, boundary1, level1));
                });
            }
            baDiv.appendChild(getAddBondButton(mIDM, molecule, baDiv, Bond.tagName, boundary1, level1));
            create3DViewer(mIDM, molecule, moleculeDiv, boundary1, level1);
            // Create collapsible Properties HTMLDivElement.
            let plDivID: string = mIDM.addID(mDivID, PropertyList.tagName);
            let plDiv: HTMLDivElement = createDiv(plDivID);
            let plcDivID = mIDM.addID(plDivID, s_container);
            let plcDiv: HTMLDivElement = getCollapsibleDiv(plcDivID, moleculeDiv, null, plDiv, PropertyList.tagName, boundary1, level1);
            // Add code to add propertyArray...
            // Remove the select element.
            selectDiv.remove();
            // Add a remove molecule button.
            addRemoveButton(moleculeDiv, level1, () => {
                mlDiv.removeChild(mcDiv);
                mIDM.removeIDs(mDivID);
                mIDM.removeIDs(getID(mDivID, s_description));
                mIDM.removeIDs(getID(mDivID, AtomArray.tagName));
                mIDM.removeIDs(getID(mDivID, BondArray.tagName));
                mIDM.removeIDs(getID(mDivID, s_viewer));
                mIDM.removeIDs(getID(mDivID, PropertyList.tagName));
                molecules.delete(molecule.getID());
            });
        });
    });
    return addFromLibraryButton;
}

/**
 * For setting the molecule ID.
 * 
 * @param mid The initial molecule ID before checks.
 * @param molecule The molecule to set the ID foradd.
 * @param molecules The molecules map.
 * @returns The molecule ID set.
 */
function setMoleculeID(mid: string, molecule: Molecule, molecules: Map<string, Molecule>): string {
    while (true) {
        // Ask the user to specify the molecule ID.
        let mid2: string | null = prompt("Please enter a name for the molecule", mid);
        if (mid2 == null) {
            alert("The molecule ID cannot be null.");
        } else if (molecules.has(mid2)) {
            alert("The molecule ID " + mid + " is already in use.");
        } else {
            mid = mid2;
            molecule.setID(mid);
            return mid;
        }
    }
}

/**
 * Adds a button to edit the molecule ID.
 * @param molecule 
 * @param button 
 * @param mDiv 
 * @param level 
 */
function addEditIDButton(molecule: Molecule, button: HTMLButtonElement, mIDM: IDManager, mDiv: HTMLDivElement,
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let s_editName: string = sy_edit + " Edit id";
    let editNameButtonID: string = mIDM.addID(mDiv.id, s_editName, s_button);
    let editNameButton: HTMLButtonElement = createButton(s_editName, editNameButtonID, level);
    mDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', () => {
        let newMoleculeId: string | null = prompt("Please edit the molecule ID:", molecule.getID());
        if (newMoleculeId == null) {
            newMoleculeId = "";
        }
        // Update the BathGas select elements.
        removeOptionByClassName(BathGas.tagName, molecule.getID());
        molecule.setID(newMoleculeId);
        addOptionByClassName(BathGas.tagName, molecule.getID());
        button.textContent = molecule.getLabel() + " " + sy_upTriangle;
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
function processDescription(id: string, mIDM: IDManager, getter: () => string | undefined, setter: (value: string) => void,
    marginComponent: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    marginDiv: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, marginDiv);
    let buttonTextContentSelected: string = s_description + sy_selected;
    let buttonTextContentDeselected: string = s_description + sy_deselected;
    let button = createButton(buttonTextContentDeselected, mIDM.addID(id, s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId: string = mIDM.addID(id, s_description, s_input)
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
 * 
 * Creates and returns a button for adding a new atom. This will add a new atom div to the atomArrayDiv. The atom div added
 * will have: label (atom id); editable details (elementType, x3, y3, z3); and a remove button. Select elements that allow 
 * for selecting atoms are updated so options reflect any added or removed atoms.
 * 
 * @param molecule The molecule.
 * @param aaDiv The atom array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */
function getAddAtomButton(mIDM: IDManager, molecule: Molecule, aaDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    // Create an add atom button.
    let button: HTMLButtonElement = createButton(s_Add_sy_add, mIDM.addID(aaDiv.id, "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes: Map<string, string> = new Map();
        let a: Atom = new Atom(attributes, molecule);
        //let aID: string = molecule.getAtoms().addAtom(a);
        aaDiv.insertBefore(addAtom(mIDM, molecule, aaDiv.id, molecule.getAtoms(), a, boundary, level), button);
    });
    return button;
}

function addMetadata(m: Molecule, md: Metadata, ml: MetadataList, mdDivID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    ml.addMetadata(md);
    let mdDiv = createFlexDiv(mdDivID, level1);
    mdDiv.appendChild(createLabel(m.getLabel(), boundary1));
    return mdDiv;
}

/**
 * Adds an atom.
 * 
 * @param molecule The molecule.
 * @param a The atom to add.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns A new div for the atom.
 */
function addAtom(mIDM: IDManager, molecule: Molecule, aaDivID: string, aa: AtomArray, a: Atom,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let aID: string = aa.addAtom(a, a.getID());
    let aDivID: string = mIDM.addID(aaDivID, aID);
    let aDiv: HTMLDivElement = createFlexDiv(aDivID, level);
    aDiv.appendChild(createLabel(aID, boundary));
    let aIDs: Set<string> = new Set();
    // elementType.
    processElementType(mIDM, a, aDiv, aIDs, true, boundary);
    // Coordinates.
    processCoordinates(mIDM, a, aDiv, aIDs, boundary, boundary);
    addRemoveButton(aDiv, boundary, removeAtom, molecule, aID, aIDs);
    // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
    addOptionByClassName(Bond.s_atomRefs2, aID);
    return aDiv;
}

/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param aID The atom id to remove.
 */
function removeAtom(molecule: Molecule, aID: string, aIDs: Set<string>) {
    molecule.getAtoms().removeAtom(aID);
    aIDs.forEach((x) => {
        console.log("Removing " + x);
        remove(x);
    });
    removeOptionByClassName(Bond.s_atomRefs2, aID);
    molecule.getBonds().bonds.forEach((bond) => {
        let atomRefs2: string = bond.getAtomRefs2();
        let atomRefs: string[] = atomRefs2.split(" ");
        if (atomRefs[0] == atomRefs[1]) {
            let bondId = bond.getID()!;
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            removeOptionByClassName(Bond.tagName, bondId);
            // remove the bondDiv element.
            let bID: string = getID(Molecule.tagName, molecule.id, BondArray.tagName, bondId);
            let bondDiv: HTMLElement | null = document.getElementById(bID);
            if (bondDiv == null) {
                throw new Error("Bond div with id " + bID + " not found.");
            } else {
                bondDiv.remove();
            }
        }
    });
}

/**
 * For processing the elementType of an Atom.
 * @param a The atom.
 * @param aDiv The atom div which is appended to.
 * @param first If true, an option is added with instructions for the selection.
 * @param margin The margin for the components.
 * @returns A HTMLDivElement containing the HTMLLabelElement and HTMLSelectElement elements.
 */
function processElementType(mIDM: IDManager, a: Atom, aDiv: HTMLDivElement, aIDs: Set<string>, first: boolean,
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
    let id = mIDM.addID(aDiv.id, Atom.s_elementType);
    aIDs.add(id);
    let lws: HTMLDivElement = createLabelWithSelect(Atom.s_elementType, selectTypes, Atom.s_elementType,
        elementType!, id, margin, margin);
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
 * Process atom coordinates.
 * @param a The atom.
 * @param aDiv The atom div.
 * @param margin The margin.
 */
function processCoordinates(mIDM: IDManager, a: Atom, aDiv: HTMLDivElement, aIDs: Set<string>,
    marginComponent: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let id: string;
    id = mIDM.addID(aDiv.id, Atom.s_x3);
    aIDs.add(id);
    aDiv.appendChild(processNumber(id, aIDs, Atom.s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    id = mIDM.addID(aDiv.id, Atom.s_y3);
    aIDs.add(id);
    aDiv.appendChild(processNumber(id, aIDs, Atom.s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    id = mIDM.addID(aDiv.id, Atom.s_z3);
    aIDs.add(id);
    aDiv.appendChild(processNumber(id, aIDs, Atom.s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
}

/**
 * Creates and returns a button for adding a new bond. This will add a new bond div to the bondArrayDiv. The bond div added
 * will have: label (bond id); editable details (atomRefs2 and order); and a remove button. Select elements that allow for 
 * selecting bonds are updated so options reflect any added or removed bonds.
 * 
 * @param molecule The molecule.
 * @param baDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */
function getAddBondButton(mIDM: IDManager, molecule: Molecule, baDiv: HTMLDivElement, typeID: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    // Create an add button.
    let id = mIDM.addID(baDiv.id, typeID, s_button);
    let button: HTMLButtonElement = createButton(s_Add_sy_add, id, level);
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
        baDiv.insertBefore(addBond(mIDM, molecule, baDiv.id, atoms, molecule.getBonds(), b, boundary, level), button);
    });
    baDiv.appendChild(button);
    return button;
}

/**
 * Add a bond.
 * @param molecule The molecule.
 * @param atoms The atoms.
 * @param b The bond.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The a new div for the bond.
 */
function addBond(mIDM: IDManager, molecule: Molecule, baDivID: string, atoms: Map<string, Atom>, ba: BondArray, b: Bond,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let bID = ba.addBond(b, b.getID());
    let bDivID: string = getID(baDivID, bID);
    let bDiv: HTMLDivElement = createFlexDiv(bDivID, level);
    bDiv.appendChild(createLabel(bID, boundary));
    // atomRefs2.
    processAtomRefs2(mIDM, molecule, bDiv, b, boundary);
    // order.
    processOrder(mIDM, bDiv, b, boundary);
    // Add to the classlists so that bondDivs involving particular atoms can be found.
    Array.from(atoms.keys()).forEach((atomId: string) => {
        bDiv.classList.add(atomId);
    });
    // Add remove button.
    let removeBond = (id: string) => molecule.getBonds().removeBond(id);
    addRemoveButton(bDiv, boundary, removeBond, bID);
    // Get elements with Bond className. These select elements are to be updated to include the new bond option.
    addOptionByClassName(Bond.tagName, bID);
    return bDiv;
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
function processAtomRefs2(mIDM: IDManager, molecule: Molecule, bDiv: HTMLDivElement, bond: Bond,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    let id = mIDM.addID(bDiv.id, Bond.s_atomRefs2);
    //bIDs.add(id);
    let atomRefs2: string | undefined = bond.getAtomRefs2();
    let atomRefs: string[] = atomRefs2.split(" ");
    let atomRefOptions: string[] = Array.from((molecule.getAtoms() as AtomArray).atoms.keys());
    // alws.
    let alwsID: string = mIDM.addID(id, 0);
    //bIDs.add(alwsID);
    let alws: HTMLDivElement = createLabelWithSelect(Bond.s_atomRefs2 + "[0]", atomRefOptions, Atom.tagName, atomRefs[0],
        alwsID, margin, margin);
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
    let blwsID: string = mIDM.addID(id, 1);
    //bIDs.add(blwsID);
    let blws: HTMLDivElement = createLabelWithSelect(Bond.s_atomRefs2 + "[1]", atomRefOptions, Atom.tagName, atomRefs[1],
        blwsID, margin, margin);
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
 * Process an order.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param margin The margin for components.
 */
function processOrder(mIDM: IDManager, bondDiv: HTMLDivElement, bond: Bond,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let id = mIDM.addID(bondDiv.id, Bond.s_order);
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
function processUseSineTerms(mIDM: IDManager, hrpDiv: HTMLDivElement, hrp: HinderedRotorPotential,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): void {
    let id = mIDM.addID(hrpDiv.id, HinderedRotorPotential.s_useSineTerms);
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
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
export function processMoleculeList(xml: XMLDocument, mIDM: IDManager, 
    molecules: Map<string, Molecule>): HTMLDivElement {
    // Create div to contain the molecules list.
    let mlDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "moleculeList" element.
    let xml_ml: Element = getSingularElement(xml, MoleculeList.tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let mlTagNames: Set<string> = new Set();
    xml_ml.childNodes.forEach(function (node) {
        mlTagNames.add(node.nodeName);
    });
    if (mlTagNames.size != 1) {
        if (!(mlTagNames.size == 2 && mlTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            mlTagNames.forEach(x => console.error(x));
            console.warn("Additional tag names in moleculeList:");
        }
    }
    if (!mlTagNames.has(Molecule.tagName)) {
        console.warn("Expecting tags with \"" + Molecule.tagName + "\" tagName but there are none! Please add molecules to the moleculeList.");
        // Add add molecule button.
        let amb: HTMLButtonElement = mlDiv.appendChild(getAddMoleculeButton(mlDiv, mIDM, molecules));
        // Add add from library button.
        mlDiv.appendChild(getAddFromLibraryButton(mlDiv, amb, mIDM, molecules));
        return mlDiv;
    }
    // Process the XML "molecule" elements.
    let xml_ms: HTMLCollectionOf<Element> = xml_ml.getElementsByTagName(Molecule.tagName);
    let xml_msl = xml_ms.length;
    console.log("Number of molecules=" + xml_msl);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_msl; i++) {
        // Create a new Molecule.
        let mDivID: string = mIDM.addID(Molecule.tagName, i);
        let mDiv: HTMLDivElement = createDiv(mDivID);
        let attributes: Map<string, string> = getAttributes(xml_ms[i]);
        let m = new Molecule(attributes, attributes.get(Molecule.s_id) as string);
        addMolecule(m, molecules);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, s_container);
        let mcDiv: HTMLDivElement = getCollapsibleDiv(mcDivID, mlDiv, null, mDiv, m.label, boundary1, level1);
        // Create a set of molecule tag names.
        let moleculeTagNames: Set<string> = new Set();
        let cns: NodeListOf<ChildNode> = xml_ms[i].childNodes;
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
        addEditIDButton(m, mcDiv.querySelector(s_button) as HTMLButtonElement, mIDM, mDiv, level1);
        // Description
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, s_description), mIDM, m.getDescription.bind(m),
            m.setDescription.bind(m), boundary1, level1));

        // Init metadataList.
        //console.log("Init metadataList.");
        let xml_mls: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(MetadataList.tagName);
        if (xml_mls.length > 0) {
            if (xml_mls.length > 1) {
                console.warn("Expecting 1 or 0 " + MetadataList.tagName + " but finding " + xml_mls.length + ". Loading the first of these...");
            }
            // Create collapsible MetadataList HTMLDivElement.
            let mdlDivID: string = mIDM.addID(mDivID, MetadataList.tagName);
            let mdlDiv: HTMLDivElement = createDiv(mdlDivID);
            let mdlcDivID = mIDM.addID(mdlDivID, s_container);
            let mdlcDiv: HTMLDivElement = getCollapsibleDiv(mdlcDivID, mDiv, null, mdlDiv, MetadataList.tagName, boundary1, level1);
            let xml_ml: Element = xml_mls[0];
            let xml_ms: HTMLCollectionOf<Element> = xml_ml.getElementsByTagName(Metadata.tagName);
            let ml: MetadataList = new MetadataList(getAttributes(xml_mls[0]));
            m.setMetadataList(ml);
            for (let j = 0; j < xml_ms.length; j++) {
                // Create a new Metadata.
                let md: Metadata = new Metadata(getAttributes(xml_ms[j]));
                mdlDiv.appendChild(addMetadata(m, md, ml, mIDM.addID(mdlDivID, j), boundary1, level1));
            }
            moleculeTagNames.delete(MetadataList.tagName);
        }

        // Init atoms.
        let xml_aas: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(AtomArray.tagName);
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID: string = mIDM.addID(mDivID, AtomArray.tagName);
        let aaDiv: HTMLDivElement = createDiv(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, s_container);
        let aacDiv: HTMLDivElement = getCollapsibleDiv(aacDivID, mDiv, null, aaDiv, AtomArray.tagName, boundary1, level1);
        // There should be at least one atom!
        // Atoms may be in AtomArrays or not.
        // If any AtomArray elements have attributes, there will be a console warning.
        // There will be a single AtomArray containing any Atoms.
        let aa: AtomArray = new AtomArray(new Map());
        m.setAtoms(aa);
        for (let j = 0; j < xml_aas.length; j++) {
            let aaa = getAttributes(xml_aas[j]);
            if (aaa.size > 0) {
                console.warn("AtomArray attributes lost/ignored: " + mapToString(aaa));
            }
        }
        let xml_as: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(Atom.tagName);
        for (let j = 0; j < xml_as.length; j++) {
            aaDiv.appendChild(addAtom(mIDM, m, aaDivID, aa, new Atom(getAttributes(xml_as[j]), m), boundary1, level1));
        }
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, Atom.tagName, boundary1, level1));
        moleculeTagNames.delete(Atom.tagName);

        // Init bonds.
        let xml_bas: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(BondArray.tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID: string = mIDM.addID(mDivID, BondArray.tagName);
        let baDiv: HTMLDivElement = createDiv(baDivID);
        let bacDivID = mIDM.addID(baDivID, s_container);
        let bacDiv: HTMLDivElement = getCollapsibleDiv(bacDivID, mDiv, null, baDiv, BondArray.tagName, boundary1, level1);
        // Bonds may be in BondArrays or not.
        // If any BondArray elements have attributes, there will be a console warning.
        // There will be a single BondArray containing any Bonds.
        let ba: BondArray = new BondArray(new Map());
        m.setBonds(ba);
        for (let j = 0; j < xml_bas.length; j++) {
            let baa = getAttributes(xml_bas[j]);
            if (baa.size > 0) {
                console.warn("BondArray attributes lost/ignored: " + mapToString(baa));
            }
        }
        let xml_bs: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(Bond.tagName);
        for (let j = 0; j < xml_bs.length; j++) {
            // Load those bonds that have an id attribute first.
            let b_attributes: Map<string, string> = getAttributes(xml_bs[j]);
            if (b_attributes.has(Bond.s_id)) {
                baDiv.appendChild(addBond(mIDM, m, baDivID, m.getAtoms().atoms, ba, new Bond(getAttributes(xml_bs[j]), m), boundary1, level1));
            }
        }
        // Load those bonds that do not have an id attribute.
        for (let j = 0; j < xml_bs.length; j++) {
            let b_attributes: Map<string, string> = getAttributes(xml_bs[j]);
            if (!b_attributes.has(Bond.s_id)) {
                baDiv.appendChild(addBond(mIDM, m, baDivID, m.getAtoms().atoms, ba, new Bond(getAttributes(xml_bs[j]), m), boundary1, level1));
            }
        }
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, Bond.tagName, boundary1, level1));
        moleculeTagNames.delete(Bond.tagName);

        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID: string = mIDM.addID(mDivID, s_viewer);
        let viewerDiv: HTMLDivElement = createDiv(viewerDivID);
        let viewercDivID = mIDM.addID(viewerDivID, s_container);
        let viewercDiv: HTMLDivElement = getCollapsibleDiv(viewercDivID, mDiv, null, viewerDiv,
            s_viewer, boundary1, level1);
        create3DViewer(mIDM, m, viewerDiv, boundary1, level1);

        // Init properties.
        let xml_pls: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(PropertyList.tagName);
        // Create a new collapsible div for the PropertyList.
        let plDivID: string = mIDM.addID(mDivID, PropertyList.tagName);
        let plDiv: HTMLDivElement = createDiv(plDivID);
        let plcDivID = mIDM.addID(plDivID, s_container);
        let plcDiv: HTMLDivElement = getCollapsibleDiv(plcDivID, mDiv, null, plDiv, PropertyList.tagName, boundary1, level1);
        // Properties may be in PropertyLists or not.
        // This implementation allows for there to be multiple PropertyList elements.
        // If any PropertyList elements have attributes, there will be a console warning.
        // There will be a single PropertyList containing any Properties.
        let pl: PropertyList = new PropertyList(new Map());
        m.setPropertyList(pl);
        for (let j = 0; j < xml_pls.length; j++) {
            let pla = getAttributes(xml_pls[j]);
            if (pla.size > 0) {
                console.warn("PropertyList attributes lost/ignored: " + mapToString(pla));
            }
        }
        let pap: Set<string> = new Set(PropertyArray.propertyDictRefs);
        let xml_ps: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(Property.tagName);
        for (let j = 0; j < xml_ps.length; j++) {
            // Create a new Property.
            let p: Property = createProperty(pap, pl, xml_ps[j], plDiv, m, boundary1, level1);
            pl.setProperty(p);
        }

        /* This code is currently commented out as it is not wanted yet. The idea is that  
        properties would be selectable a bit like controls, and all those not loaded in a 
        file would be deselected and selectable. As there could be additional properties 
        in future or that are not known about, some way of adding these will likely also be 
        wanted...
        // Add Properties not in xml_ps.
        console.log("Molecule " + m.getDescription());
        console.log("pap.size=" + pap.size);
        pap.forEach(function (dictRef) {
            console.log("dictRef=" + dictRef);
            let attributes: Map<string, string> = new Map();
            attributes.set(Property.s_dictRef, dictRef);
            if (dictRef == "me:Hf0") {
                let vs: string = "";
                if (defaults != undefined) {
                    vs = defaults.values.get(dictRef) ?? "";
                }
                let value: Big;
                try {
                    value = new Big(vs);
                } catch (e) {
                    value = new Big("0");
                }
                let s_attributes: Map<string, string> = new Map();
                s_attributes.set("units", "kJ/mol");
                let ps: PropertyScalarNumber = new PropertyScalarNumber(s_attributes, value);
                let p: Property = new Hf0(attributes, ps);

                let iDs: Set<string> = new Set();

                //attributes.set(Hf0.s_units, "kJ/mol");
                addPropertyScalarNumber(s_attributes, iDs, value, Mesmer.energyUnits, pl, p, plDiv, boundary1);
                pl.setProperty(p);
                
                } else if (dictRef == "me:ZPE") {
                    let value: Big = new Big("0");
                    let ps: PropertyScalar = new PropertyScalar(new Map(), value);
                    //let ps: PropertyScalar = new PropertyScalar(new Map(), defaults.get(dictRef));
                    let p: Property = new ZPE(attributes, ps);
                    //plDiv.appendChild(addProperty(dictRef, ps, addID(plDivID, dictRef), boundary1, level1));
 
                    addPropertyScalar(attributes, value, Mesmer.energyUnits, pl, p, plDiv, boundary1);
 
                    pl.setProperty(p);
                
            }
        });
        */
        // Organise EnergyTransferModel.
        let xml_etms: HTMLCollectionOf<Element> | null = xml_ms[i].getElementsByTagName(EnergyTransferModel.tagName);
        if (xml_etms.length > 0) {
            if (xml_etms.length > 1) {
                throw new Error("Expecting 1 or 0 " + EnergyTransferModel.tagName + " but finding " + xml_etms.length + "!");
            }
            let etm = new EnergyTransferModel(getAttributes(xml_etms[0]));
            processEnergyTransferModel(mIDM, etm, m, xml_etms[0], mDiv);
            moleculeTagNames.delete(EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_dms: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(DOSCMethod.tagName);
        if (xml_dms.length > 0) {
            if (xml_dms.length > 1) {
                throw new Error("Expecting 1 or 0 " + DOSCMethod.tagName + " but finding " + xml_dms.length + "!");
            }
            let doscm = new DOSCMethod(getAttributes(xml_dms[0]));
            mDiv.appendChild(
                createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                    doscm.getXsiType(), mIDM.addID(mDivID, DOSCMethod.tagName), boundary1, level1));
            moleculeTagNames.delete(DOSCMethod.tagName);
        }
        // Organise DistributionCalcMethod. (Output only)
        let xml_dcms: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(DistributionCalcMethod.tagName);
        if (xml_dcms.length > 0) {
            if (xml_dcms.length > 1) {
                throw new Error("Expecting 1 or 0 " + DistributionCalcMethod.tagName + " but finding " + xml_dcms.length + "!");
            }
            let dcmAttributes: Map<string, string> = getAttributes(xml_dcms[0]);
            let dcm = new DistributionCalcMethod(dcmAttributes);
            m.setDistributionCalcMethod(dcm);
            let dcmDivID: string = mIDM.addID(mDivID, DistributionCalcMethod.tagName);
            let dcmDiv: HTMLDivElement = createDiv(dcmDivID);
            mDiv.appendChild(dcmDiv);
            // Create label.
            dcmDiv.appendChild(createLabel(DistributionCalcMethod.tagName + " " + mapToString(dcmAttributes), level1));
            moleculeTagNames.delete(DistributionCalcMethod.tagName);
        }
        // Organise DensityOfStatesList. (Output only)
        let xml_dosl: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(DensityOfStatesList.tagName);
        if (xml_dosl.length > 0) {
            if (xml_dosl.length > 1) {
                throw new Error("Expecting 1 or 0 " + DensityOfStatesList.tagName + " but finding " + xml_dosl.length + "!");
            }
            let dosl = new DensityOfStatesList(getAttributes(xml_dosl[0]));
            m.setDensityOfStatesList(dosl);
            // Create collapsible div.
            let doslDivID: string = mIDM.addID(mDivID, DensityOfStatesList.tagName);
            let doslDiv: HTMLDivElement = createDiv(doslDivID);
            let doslcDivID = mIDM.addID(doslDivID, s_container);
            let doslcDiv: HTMLDivElement = getCollapsibleDiv(doslcDivID, mDiv, null, doslDiv, DensityOfStatesList.tagName, boundary1, level1);
            let xml_dos: HTMLCollectionOf<Element> = xml_dosl[0].getElementsByTagName(DensityOfStates.tagName);
            // Organise Description.
            let xml_ds: HTMLCollectionOf<Element> = xml_dosl[0].getElementsByTagName(Description.tagName);
            if (xml_ds.length > 0) {
                if (xml_ds.length > 1) {
                    throw new Error("Expecting 1 or 0 " + Description.tagName + " but finding " + xml_ds.length + "!");
                }
                let ds = new Description(getAttributes(xml_ds[0]), getNodeValue(getFirstChildNode(xml_ds[0])));
                dosl.setDescription(ds);
            }
            // Organise DensityOfStates.
            //console.log("xml_dos.length=" + xml_dos.length);
            if (xml_dos.length == 0) {
                throw new Error("Expecting 1 or more " + DensityOfStates.tagName + " but finding 0!");
            } else {
                let t: HTMLTableElement = createTable(mIDM.addID(doslDivID, s_table), level1);
                addTableRow(t, DensityOfStates.header);
                // Append the table to the div.
                doslDiv.appendChild(t);
                for (let j = 0; j < xml_dos.length; j++) {
                    //console.log("j=" + j);
                    let dos = new DensityOfStates(getAttributes(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    let dosDivID = mIDM.addID(doslDivID, j);
                    let dosDiv = createFlexDiv(dosDivID, level1);
                    doslDiv.appendChild(dosDiv);
                    // T.
                    let xml_t: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(T.tagName);
                    if (xml_t.length != 1) {
                        throw new Error("Expecting 1 " + T.tagName + " but finding " + xml_t.length + "!");
                    } else {
                        let t = new T(getAttributes(xml_t[0]), new Big(getNodeValue(getFirstChildNode(xml_t[0]))));
                        dos.setT(t);
                        //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(Qtot.tagName);
                    if (xml_qtot.length != 1) {
                        throw new Error("Expecting 1 " + Qtot.tagName + " but finding " + xml_qtot.length + "!");
                    } else {
                        let qtot = new Qtot(getAttributes(xml_qtot[0]), new Big(getNodeValue(getFirstChildNode(xml_qtot[0]))));
                        dos.setQtot(qtot);
                        //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(Sumc.tagName);
                    if (xml_sumc.length != 1) {
                        throw new Error("Expecting 1 " + Sumc.tagName + " but finding " + xml_sumc.length + "!");
                    } else {
                        let sumc = new Sumc(getAttributes(xml_sumc[0]), new Big(getNodeValue(getFirstChildNode(xml_sumc[0]))));
                        dos.setSumc(sumc);
                        //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(Sumg.tagName);
                    if (xml_sumg.length != 1) {
                        throw new Error("Expecting 1 " + Sumg.tagName + " but finding " + xml_sumg.length + "!");
                    } else {
                        let sumg = new Sumg(getAttributes(xml_sumg[0]), new Big(getNodeValue(getFirstChildNode(xml_sumg[0]))));
                        dos.setSumg(sumg);
                        //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                    addTableRow(t, dos.toStringArray());
                    //console.log("dos: " + dos.toString());
                }
                addSaveAsCSVButton(dosl.toCSV, doslDiv, t, m.getID() + "_" + DensityOfStatesList.tagName, level1);
            }
            moleculeTagNames.delete(DensityOfStatesList.tagName);
        }
        // Organise ThermoTable. (Output only)
        let tttn: string = ThermoTable.tagName;
        let xml_tts: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(tttn);
        if (xml_tts.length > 0) {
            if (xml_tts.length > 1) {
                throw new Error("Expecting 1 or 0 " + tttn + " but finding " + xml_tts.length + "!");
            }
            let tt = new ThermoTable(getAttributes(xml_tts[0]));
            // Create collapsible div.
            let ttDivId: string = mIDM.addID(mDivID, ThermoTable.tagName);
            let ttDiv: HTMLDivElement = createDiv(ttDivId);
            let ttcDivId = mIDM.addID(ttDivId, s_container);
            let ttcDiv: HTMLDivElement = getCollapsibleDiv(ttcDivId, mDiv, null, ttDiv, tttn, boundary1, level1);
            let tvs: ThermoValue[];
            let tvtn: string = ThermoValue.tagName;
            let xml_tvs: HTMLCollectionOf<Element> = xml_tts[0].getElementsByTagName(tvtn);
            if (xml_tvs.length == 0) {
                throw new Error("Expecting 1 or more " + tvtn + " but finding 0!");
            } else {
                tvs = [];
                let t: HTMLTableElement = createTable(mIDM.addID(ttDivId, s_table), level1);
                addTableRow(t, tt.getHeader());
                for (let j = 0; j < xml_tvs.length; j++) {
                    let tv = new ThermoValue(getAttributes(xml_tvs[j]));
                    tvs.push(tv);
                    addTableRow(t, tv.toStringArray());
                }
                // Append the table to the div.
                ttDiv.appendChild(t);
                tt.init(tvs);
                addSaveAsCSVButton(tt.toCSV.bind(tt), ttDiv, t, mIDM.addID(m.getID(), ThermoTable.tagName), level1);
            }
            m.setThermoTable(tt);
            moleculeTagNames.delete(tvtn);
            moleculeTagNames.delete(tttn);
        }
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_ms[i].getElementsByTagName(ExtraDOSCMethod.tagName);
        if (xml_edms.length > 0) {
            for (let j = 0; j < xml_edms.length; j++) {
                let edm: ExtraDOSCMethod = new ExtraDOSCMethod(getAttributes(xml_edms[j]));
                // Create collapsible ExtraDOSCMethod HTMLDivElement.
                let edmDivID: string = mIDM.addID(mDivID, ExtraDOSCMethod.tagName, j);
                let edmDiv: HTMLDivElement = createDiv(edmDivID);
                let edmcDivID = mIDM.addID(edmDivID, s_container);
                let edmcDiv: HTMLDivElement = getCollapsibleDiv(edmcDivID, mDiv, null, edmDiv,
                    ExtraDOSCMethod.tagName, boundary1, level1);
                // Read bondRef.
                let xml_brs: HTMLCollectionOf<Element> = xml_edms[j].getElementsByTagName(BondRef.tagName);
                if (xml_brs.length > 0) {
                    if (xml_brs.length != 1) {
                        throw new Error("Expecting only 1 bondRef, but there are " + xml_brs.length);
                    }
                    let bids: string[] = (m.getBonds() as BondArray).getBondIds();
                    let br: BondRef = new BondRef(getAttributes(xml_brs[0]), getNodeValue(getFirstChildNode(xml_brs[0])));
                    let lws: HTMLDivElement = createLabelWithSelect(BondRef.tagName, bids, BondRef.tagName,
                        br.value, mIDM.addID(edmDivID, BondRef.tagName), boundary1, level1);
                    let select: HTMLSelectElement = lws.getElementsByTagName("select")[0];
                    select.classList.add(Bond.tagName);
                    edmDiv.appendChild(lws);
                }
                // Read hinderedRotorPotential.
                let xml_hrps: HTMLCollectionOf<Element> = xml_edms[j].getElementsByTagName(HinderedRotorPotential.tagName);
                if (xml_hrps.length > 0) {
                    if (xml_hrps.length != 1) {
                        throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hrps.length);
                    }
                    let hrpAttributes: Map<string, string> = getAttributes(xml_hrps[0]);
                    let hrp: HinderedRotorPotential = new HinderedRotorPotential(hrpAttributes);
                    // Create collapsible HinderedRotorPotential HTMLDivElement.
                    let hrpDivID: string = mIDM.addID(edmDivID, HinderedRotorPotential.tagName);
                    let hrpDiv: HTMLDivElement = createDiv(hrpDivID);
                    let hrpcDivID = mIDM.addID(hrpDivID, s_container);
                    let hrpcDiv: HTMLDivElement = getCollapsibleDiv(hrpcDivID, edmDiv, null, hrpDiv,
                        HinderedRotorPotential.tagName, boundary1, level1);
                    // Format.
                    let lws = createLabelWithSelect(HinderedRotorPotential.s_format,
                        HinderedRotorPotential.formats, HinderedRotorPotential.tagName, hrp.getFormat(),
                        mIDM.addID(hrpDivID, HinderedRotorPotential.s_format), boundary1, level1)
                    hrpDiv.appendChild(lws);
                    // Units.
                    addAnyUnits(Mesmer.energyUnits, hrpAttributes, hrpDiv, lws,
                        mIDM.addID(hrpDivID, HinderedRotorPotential.s_units), HinderedRotorPotential.tagName, boundary1, level1);
                    // ExpansionSize.
                    let es: string = hrp.getExpansionSize() ?? s_undefined;
                    hrpDiv.appendChild(createLabelWithInput("text",
                        mIDM.addID(hrpDivID, HinderedRotorPotential.s_expansionSize), boundary1, level1, (event: Event) => {
                            let target = event.target as HTMLInputElement;
                            // Check the input is a number.
                            try {
                                console.log("Setting " + HinderedRotorPotential.s_expansionSize + " to " + target.value);
                                hrp.setExpansionSize(new Big(target.value));
                            } catch (e) {
                                alert("Invalid value, resetting...");
                                target.value = hrp.getExpansionSize() ?? s_undefined;
                            }
                            resizeInputElement(target);
                        }, es, HinderedRotorPotential.s_expansionSize));

                    // Add useSineTerms.
                    processUseSineTerms(mIDM, hrpDiv, hrp, level1);

                    // Load PotentialPoints.
                    // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                    let ppsDivID: string = mIDM.addID(hrpDivID, PotentialPoint.tagName);
                    let ppsDiv: HTMLDivElement = createDiv(ppsDivID);
                    let ppscDivID = mIDM.addID(ppsDivID, s_container);
                    let ppscDiv: HTMLDivElement = getCollapsibleDiv(ppscDivID, mDiv, null, ppsDiv,
                        "PotentialPoints", boundary1, level1);
                    hrpDiv.appendChild(ppscDiv);

                    let pps: PotentialPoint[] = [];
                    let xml_pps: HTMLCollectionOf<Element> = xml_hrps[0].getElementsByTagName(PotentialPoint.tagName);
                    for (let k = 0; k < xml_pps.length; k++) {
                        let pp: PotentialPoint = new PotentialPoint(getAttributes(xml_pps[k]));
                        pps.push(pp);
                        let ppDivID = mIDM.addID(ppsDivID, k);
                        let ppDiv: HTMLDivElement = createFlexDiv(ppDivID, level1);
                        ppsDiv.appendChild(ppDiv);
                        let l: HTMLLabelElement = createLabel(PotentialPoint.tagName + " " + k, boundary1);
                        ppDiv.appendChild(l);
                        // Process angle
                        let a: string = pp.getAngle() ?? s_undefined;
                        let anglelwi: HTMLDivElement = createLabelWithInput("text", mIDM.addID(ppDivID, PotentialPoint.s_angle), boundary1, boundary1,
                            (event: Event) => {
                                let target = event.target as HTMLInputElement;
                                // Check the input is a number.
                                if (isNumeric(target.value)) {
                                    let value: Big = new Big(target.value);
                                    pp.setAngle(value);
                                } else {
                                    // Reset the input to the current value.
                                    alert("Angle input is not a number, resetting...");
                                    target.value = pp.getAngle() ?? s_undefined;
                                }
                                resizeInputElement(target);
                            }, a, PotentialPoint.s_angle);
                        ppDiv.appendChild(anglelwi);
                        // Create a new div element for the potential.
                        let potentialLabel: HTMLLabelElement = createLabel(PotentialPoint.s_potential, boundary1);
                        ppDiv.appendChild(potentialLabel);
                        let potentialInputElementId = mIDM.addID(ppDivID, PotentialPoint.s_potential);
                        let potentialInputElement: HTMLInputElement = createInput("text", potentialInputElementId, boundary1);
                        ppDiv.appendChild(potentialInputElement);
                        let p: string = pp.getPotential() ?? s_undefined;
                        potentialInputElement.addEventListener('change', (event: Event) => {
                            let target = event.target as HTMLInputElement;
                            // Check the input is a number.
                            if (isNumeric(target.value)) {
                                let value: Big = new Big(target.value);
                                pp.setPotential(value);
                                console.log("Set " + PotentialPoint.tagName + " to " + value.toExponential());
                            } else {
                                // Reset the input to the current value.
                                alert("Potential input is not a number, resetting...");
                                potentialInputElement.value = pp.getPotential() ?? s_undefined;
                            }
                            resizeInputElement(potentialInputElement);
                        });
                        potentialInputElement.value = p;
                        resizeInputElement(potentialInputElement);
                    }
                    //ppsDiv.appendChild(ppDiv);
                    hrp.setPotentialPoints(pps);
                    edm.setHinderedRotorPotential(hrp);
                }
                // Read periodicities.
                let xml_periodicities: HTMLCollectionOf<Element> = xml_edms[j].getElementsByTagName(Periodicity.tagName);
                if (xml_periodicities.length > 0) {
                    if (xml_periodicities.length != 1) {
                        throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                    }
                    let valueString: string = getNodeValue(getFirstChildNode(xml_periodicities[0]));
                    let periodicity: Periodicity = new Periodicity(getAttributes(xml_periodicities[0]), new Big(valueString));
                    edm.setPeriodicity(periodicity);
                    let lwi: HTMLDivElement = createLabelWithInput("text", mIDM.addID(edmDivID, Periodicity.tagName),
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
                    edmDiv.appendChild(lwi);
                }
                m.setExtraDOSCMethod(j, edm);
                moleculeTagNames.delete(ExtraDOSCMethod.tagName);
            }
        }

        // Organise ReservoirSize.
        moleculeTagNames.delete(ReservoirSize.tagName);
        let xml_ReservoirSize = xml_ms[i].getElementsByTagName(ReservoirSize.tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            }
            let valueString: string = getNodeValue(getFirstChildNode(xml_ReservoirSize[0]));
            let value: Big = new Big(valueString);
            let reservoirSizeAttributes: Map<string, string> = getAttributes(xml_ReservoirSize[0]);
            let reservoirSize: ReservoirSize = new ReservoirSize(reservoirSizeAttributes, value);
            m.setReservoirSize(reservoirSize);
            let inputDiv: HTMLDivElement = createLabelWithInput("number", m.getID() + "_" + ReservoirSize.tagName,
                boundary1, level1, (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    reservoirSize.value = new Big(target.value);
                    resizeInputElement(target);
                }, valueString, ReservoirSize.tagName);
            mDiv.appendChild(inputDiv);
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
        }
        // Add a remove molecule button.
        addRemoveButton(mDiv, level1, () => {
            mlDiv.removeChild(mcDiv);
            //mlDiv.removeChild(mDiv);
            mIDM.removeIDs(mDivID);
            mIDM.removeIDs(getID(mDivID, s_description));
            mIDM.removeIDs(getID(mDivID, AtomArray.tagName));
            mIDM.removeIDs(getID(mDivID, BondArray.tagName));
            mIDM.removeIDs(getID(mDivID, s_viewer));
            mIDM.removeIDs(getID(mDivID, PropertyList.tagName));
            molecules.delete(m.getID());
        });
    }

    // Create an add molecule button.
    let mb: HTMLButtonElement = getAddMoleculeButton(mlDiv, mIDM, molecules);

    // Create add from library button.
    let lb: HTMLButtonElement = getAddFromLibraryButton(mlDiv, mb, mIDM, molecules);
    return mlDiv;
}

/**
 * @param pl The PropertyList.
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(pap: Set<string>, pl: PropertyList, xml: Element, plDiv: HTMLDivElement, molecule: Molecule,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): Property {
    let p: Property = new Property(getAttributes(xml));
    pap.delete(p.dictRef);
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == ZPE.dictRef) {
        // "me:ZPE", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == Hf0.dictRef) {
        // "me:Hf0", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == HfAT0.dictRef) {
        // "me:HfAT0", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == Hf298.dictRef) {
        // "me:Hf298", scalar, Mesmer.energyUnits.
        processPropertyScalarNumber(pl, p, Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == RotConsts.dictRef) {
        // "me:rotConsts", array, Mesmer.frequencyUnits.
        processPropertyScalarNumber(pl, p, Mesmer.frequencyUnits, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == SymmetryNumber.dictRef) {
        // "me:symmetryNumber", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == TSOpticalSymmetryNumber.dictRef) {
        // "me:TSOpticalSymmetryNumber", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == FrequenciesScaleFactor.dictRef) {
        // "me:frequenciesScaleFactor", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == VibFreqs.dictRef) {
        // "me:vibFreqs", array, cm-1.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == MW.dictRef) {
        // "me:MW", scalar, amu.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == SpinMultiplicity.dictRef) {
        // "me:spinMultiplicity", scalar, No units.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == Epsilon.dictRef) {
        // "me:epsilon", scalar, K (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == Sigma.dictRef) {
        // "me:sigma", scalar, Å (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == Hessian.dictRef) {
        // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == EinsteinAij.dictRef) {
        // "me:EinsteinAij", array, s-1 (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else if (p.dictRef == EinsteinBij.dictRef) {
        // "me:EinsteinBij", array, m3/J/s2 (fixed).
        processPropertyScalarNumber(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    } else {
        processPropertyScalarString(pl, p, molecule, xml, plDiv, boundary, level);
    }
    return p;
}



/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */
function processEnergyTransferModel(mIDM: IDManager, etm: EnergyTransferModel, molecule: Molecule, element: Element, moleculeDiv: HTMLDivElement) {
    let xml_deltaEDowns: HTMLCollectionOf<Element> = element.getElementsByTagName(DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmdivID: string = mIDM.addID(moleculeDiv.id, EnergyTransferModel.tagName);
        let etmDiv: HTMLDivElement = document.createElement("div") as HTMLDivElement;
        let etmcDivID = mIDM.addID(etmdivID, s_container);
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
            let id = mIDM.addID(etmdivID, DeltaEDown.tagName, k);
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
 * Creates a 3D viewer for the molecule and adds this to the moleculeDiv.
 * 
 * @param molecule The molecule.
 * @param moleculeDiv The molecule div.
 * @param boundary The margin for the viewer.
 * @param level The margin for the viewer container div.
 */
export function create3DViewer(mIDM: IDManager, molecule: Molecule, moleculeDiv: HTMLDivElement,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID: string = mIDM.addID(moleculeDiv.id, s_viewer, s_container);
    let viewerContainerDiv: HTMLDivElement = createDiv(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID: string = mIDM.addID(moleculeDiv.id, s_viewer);
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
                viewer.addLabel(atom.getID(), { position: { x: ax, y: ay, z: az } });
            }
        });
        //console.log("molecule.getBonds().bonds.size " + molecule.getBonds().bonds.size);
        molecule.getBonds().bonds.forEach(function (bond) {
            //console.log("bond.atomRefs2 " + bond.getAtomRefs2());
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
                viewer.addLabel(bond.getID()!, { position: { x: (a0x + a1x) / 2, y: (a0y + a1y) / 2, z: (a0z + a1z) / 2 } });
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
        remove(viewerDivID);
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
            remove(viewerDivID);
            viewer = createViewer(
                //cameraPosition, cameraOrientation, zoomLevel,
                showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels: string = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, mIDM.addID(viewerDivID, s_Atom_Labels), showAtomLabels,
        newState => showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels: string = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, mIDM.addID(viewerDivID, s_Bond_Labels), showBondLabels,
        newState => showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton: HTMLButtonElement = createButton("Save as PNG", mIDM.addID(viewerDivID, s_save), boundary1);
    saveButton.addEventListener('click', () => {
        //viewer.pngURI({ backgroundColor: 'white', download: true });
        let canvas = viewer.pngURI();
        let a = document.createElement('a');
        a.href = canvas;
        let title: string = mesmer.getTitle()?.value as string;
        a.download = title.replace(/[^a-z0-9]/gi, '_') + 'mol.png';
        document.body.appendChild(a); // Append the anchor to the body.
        a.click(); // Programmatically click the anchor to trigger the download.
        document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
        console.log('Save Image');
    });
    viewerContainerDiv.appendChild(saveButton);
}