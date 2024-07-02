"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create3DViewer = exports.processMoleculeList = exports.setMoleculeID = exports.getAddFromLibraryButton = exports.getAddMoleculeButton = void 0;
const big_js_1 = __importDefault(require("big.js"));
const app_js_1 = require("./app.js");
const xml_conditions_js_1 = require("./xml_conditions.js");
const html_js_1 = require("./html.js");
const xml_mesmer_js_1 = require("./xml_mesmer.js");
const xml_metadata_js_1 = require("./xml_metadata.js");
const xml_molecule_js_1 = require("./xml_molecule.js");
const util_js_1 = require("./util.js");
const xml_js_1 = require("./xml.js");
/**
 * Create an add molecule button.
 * @param mlDiv The MoleculeList HTMLDivElement.
 * @param mIDM The IDManager for molecule divs.
 * @param molecules The molecules map.
 * @returns The add molecule button.
 */
function getAddMoleculeButton(mlDiv, mIDM, molecules) {
    let addMoleculeButton = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, undefined, app_js_1.level1);
    mlDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', () => {
        let mid = setMoleculeID(true, undefined, undefined, molecules);
        console.log("mid=" + mid);
        let m = new xml_molecule_js_1.Molecule(new Map(), mid);
        m.setID(mid);
        (0, app_js_1.addMolecule)(m, molecules);
        m.setAtoms(new xml_molecule_js_1.AtomArray(new Map()));
        m.setBonds(new xml_molecule_js_1.BondArray(new Map()));
        let mDivID = mIDM.addID(xml_molecule_js_1.Molecule.tagName, mid);
        let mDiv = (0, html_js_1.createDiv)(mDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, app_js_1.s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, addMoleculeButton, mDiv, mid, app_js_1.boundary1, app_js_1.level1);
        // Add the molecule to the BathGas select elements.
        (0, app_js_1.addOptionByClassName)(xml_conditions_js_1.BathGas.tagName, mid);
        // Add edit Name button.
        addEditIDButton(m, mcDiv.querySelector(html_js_1.s_button), mIDM, mDiv, app_js_1.level1);
        // Description
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, app_js_1.s_description), mIDM, m.getDescription.bind(m), m.setDescription.bind(m), app_js_1.boundary1, app_js_1.level1));
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = mIDM.addID(mDivID, xml_molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, app_js_1.s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, xml_molecule_js_1.AtomArray.tagName, app_js_1.boundary1, app_js_1.level1);
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, xml_molecule_js_1.Atom.tagName, app_js_1.boundary1, app_js_1.level1));
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = mIDM.addID(mDivID, xml_molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = mIDM.addID(baDivID, app_js_1.s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, xml_molecule_js_1.BondArray.tagName, app_js_1.boundary1, app_js_1.level1);
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, xml_molecule_js_1.Bond.tagName, app_js_1.boundary1, app_js_1.level1));
        create3DViewer(mIDM, m, mDiv, app_js_1.boundary1, app_js_1.level1);
        // Create collapsible Properties HTMLDivElement.
        let plDivID = mIDM.addID(mDivID, xml_molecule_js_1.PropertyList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID);
        let plcDivID = mIDM.addID(plDivID, app_js_1.s_container);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, xml_molecule_js_1.PropertyList.tagName, app_js_1.boundary1, app_js_1.level1);
        // Add code to add propertyArray...
        // Add a remove molecule button.
        (0, app_js_1.addRemoveButton)(mDiv, app_js_1.level1, () => {
            removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m);
        });
    });
    return addMoleculeButton;
}
exports.getAddMoleculeButton = getAddMoleculeButton;
/**
 * Create an add from library button.
 * @param mlDiv The MoleculeList HTMLDivElement.
 * @param amb The add molecule button.
 * @param molecules The molecules map.
 * @returns The add from library button.
 */
function getAddFromLibraryButton(mlDiv, amb, mIDM, molecules) {
    let addFromLibraryButton = (0, html_js_1.createButton)(app_js_1.s_Add_from_library, undefined, app_js_1.boundary1);
    mlDiv.appendChild(addFromLibraryButton);
    // Add event listener for the button.
    addFromLibraryButton.addEventListener('click', () => {
        // Create a select element to select a libraryMolecule.
        let selectDivID = (0, util_js_1.getID)(xml_molecule_js_1.Molecule.tagName, "div");
        (0, app_js_1.remove)(selectDivID);
        let selectDiv = (0, html_js_1.createDiv)(mIDM.addID(selectDivID), app_js_1.level1);
        let options = Array.from((0, app_js_1.getMoleculeKeys)(app_js_1.libmols));
        if (options.length == 0) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        console.log("options.length=" + options.length);
        (0, app_js_1.addOrRemoveInstructions)(options, true);
        let selectID = (0, util_js_1.getID)(selectDivID, html_js_1.s_select);
        (0, app_js_1.remove)(selectID);
        let select = (0, html_js_1.createSelectElement)(options, "Select molecule", app_js_1.s_selectOption, mIDM.addID(selectID), app_js_1.boundary1);
        select.classList.add(xml_molecule_js_1.Molecule.tagName);
        selectDiv.appendChild(select);
        mlDiv.insertBefore(selectDiv, amb);
        (0, app_js_1.selectAnotherOptionEventListener)(options, select);
        select.addEventListener('change', (event) => {
            let target = event.target;
            let selectedOption = target.options[target.selectedIndex];
            let label = selectedOption.value;
            let molecule = (0, app_js_1.getMolecule)(label, app_js_1.libmols);
            let mid = molecule.getID();
            mid = setMoleculeID(true, mid, molecule, molecules);
            molecules.set(mid, molecule);
            // Add molecule to the MoleculeList.
            let mDivID = mIDM.addID(xml_molecule_js_1.Molecule.tagName, molecules.size);
            let moleculeDiv = (0, html_js_1.createDiv)(mDivID);
            // Create collapsible Molecule HTMLDivElement.
            let mcDivID = mIDM.addID(mDivID, app_js_1.s_container);
            let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, amb, moleculeDiv, molecule.getLabel(), app_js_1.boundary1, app_js_1.level1);
            // Add the molecule to the BathGas select elements.
            (0, app_js_1.addOptionByClassName)(xml_conditions_js_1.BathGas.tagName, molecule.getID());
            // Add edit Name button.
            addEditIDButton(molecule, mcDiv.querySelector(html_js_1.s_button), mIDM, moleculeDiv, app_js_1.level1);
            // Description
            moleculeDiv.appendChild(processDescription(mIDM.addID(mDivID, app_js_1.s_description), mIDM, molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), app_js_1.boundary1, app_js_1.level1));
            // Create collapsible MetadataList HTMLDivElement.
            let mlistDivID = mIDM.addID(mDivID, xml_metadata_js_1.MetadataList.tagName);
            let mlistDiv = (0, html_js_1.createDiv)(mlistDivID, app_js_1.level1);
            let mlistcDivID = mIDM.addID(mlistDivID, app_js_1.s_container);
            let mlistcDiv = (0, html_js_1.getCollapsibleDiv)(mlistcDivID, moleculeDiv, null, mlistDiv, xml_metadata_js_1.MetadataList.tagName, app_js_1.boundary1, app_js_1.level1);
            // Add metadata.
            let metadataList = molecule.getMetadataList();
            if (metadataList != undefined) {
                metadataList.getMetadata().forEach((md) => {
                    let mdDiv = (0, html_js_1.createDiv)();
                    mlistDiv.appendChild(mdDiv);
                    mdDiv.appendChild((0, html_js_1.createLabel)(md.getLabelText(), app_js_1.boundary1));
                });
            }
            // Create collapsible AtomArray HTMLDivElement.
            let aaDivID = mIDM.addID(mDivID, xml_molecule_js_1.AtomArray.tagName);
            let aaDiv = (0, html_js_1.createDiv)(aaDivID);
            let aacDivID = mIDM.addID(aaDivID, app_js_1.s_container);
            let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, moleculeDiv, null, aaDiv, xml_molecule_js_1.AtomArray.tagName, app_js_1.boundary1, app_js_1.level1);
            // Add atoms.
            let aa = molecule.getAtoms();
            if (aa != undefined) {
                aa.atoms.forEach((a) => {
                    aaDiv.appendChild(addAtom(mIDM, molecule, aaDivID, molecule.getAtoms(), a, app_js_1.boundary1, app_js_1.level1));
                });
            }
            aaDiv.appendChild(getAddAtomButton(mIDM, molecule, aaDiv, xml_molecule_js_1.Atom.tagName, app_js_1.boundary1, app_js_1.level1));
            // Create collapsible BondArray HTMLDivElement.
            let baDivID = mIDM.addID(mDivID, xml_molecule_js_1.BondArray.tagName);
            let baDiv = (0, html_js_1.createDiv)(baDivID);
            let bacDivID = mIDM.addID(baDivID, app_js_1.s_container);
            let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, moleculeDiv, null, baDiv, xml_molecule_js_1.BondArray.tagName, app_js_1.boundary1, app_js_1.level1);
            // Add bonds.
            let ba = molecule.getBonds();
            if (ba != undefined) {
                molecule.getBonds().bonds.forEach((b) => {
                    if (aa == undefined) {
                        throw new Error("Atoms are not defined for molecule " + molecule.getLabel());
                    }
                    baDiv.appendChild(addBond(mIDM, molecule, baDivID, aa.atoms, molecule.getBonds(), b, app_js_1.boundary1, app_js_1.level1));
                });
            }
            baDiv.appendChild(getAddBondButton(mIDM, molecule, baDiv, xml_molecule_js_1.Bond.tagName, app_js_1.boundary1, app_js_1.level1));
            create3DViewer(mIDM, molecule, moleculeDiv, app_js_1.boundary1, app_js_1.level1);
            // Create collapsible Properties HTMLDivElement.
            let plDivID = mIDM.addID(mDivID, xml_molecule_js_1.PropertyList.tagName);
            let plDiv = (0, html_js_1.createDiv)(plDivID);
            let plcDivID = mIDM.addID(plDivID, app_js_1.s_container);
            let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, moleculeDiv, null, plDiv, xml_molecule_js_1.PropertyList.tagName, app_js_1.boundary1, app_js_1.level1);
            // Add code to add propertyArray...
            // Remove the select element.
            selectDiv.remove();
            // Add a remove molecule button.
            (0, app_js_1.addRemoveButton)(moleculeDiv, app_js_1.level1, () => {
                removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, molecule);
            });
        });
    });
    return addFromLibraryButton;
}
exports.getAddFromLibraryButton = getAddFromLibraryButton;
/**
 * For setting the molecule ID.
 *
 * @param ask If true, the user is prompted to enter the molecule ID. If false, the molecule ID is set to the mid parameter
 * which must not be undefined.
 * @param mid The initial molecule ID before checks.
 * @param molecule The molecule to set the ID foradd.
 * @param molecules The molecules map.
 * @returns The molecule ID set.
 */
function setMoleculeID(ask, mid, molecule, molecules) {
    while (true) {
        // Ask the user to specify the molecule ID.
        let mid2;
        if (ask) {
            mid2 = prompt("Please enter a name for the molecule", mid);
        }
        else {
            mid2 = mid;
        }
        if (mid2 == null) {
            alert("The molecule ID cannot be null.");
        }
        else if (molecules.has(mid2)) {
            alert("The molecule ID " + mid2 + " is already in use.");
        }
        else {
            mid = mid2;
            if (molecule != undefined) {
                molecule.setID(mid);
            }
            return mid;
        }
    }
}
exports.setMoleculeID = setMoleculeID;
/**
 * Adds a button to edit the molecule ID.
 * @param molecule
 * @param button
 * @param mDiv
 * @param level
 */
function addEditIDButton(molecule, button, mIDM, mDiv, level) {
    let s_editName = app_js_1.sy_edit + " Edit id";
    let editNameButtonID = mIDM.addID(mDiv.id, s_editName, html_js_1.s_button);
    let editNameButton = (0, html_js_1.createButton)(s_editName, editNameButtonID, level);
    mDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', () => {
        let newMoleculeId = prompt("Please edit the molecule ID:", molecule.getID());
        if (newMoleculeId == null) {
            newMoleculeId = "";
        }
        // Update the BathGas select elements.
        (0, app_js_1.removeOptionByClassName)(xml_conditions_js_1.BathGas.tagName, molecule.getID());
        molecule.setID(newMoleculeId);
        (0, app_js_1.addOptionByClassName)(xml_conditions_js_1.BathGas.tagName, molecule.getID());
        button.textContent = molecule.getLabel() + " " + html_js_1.sy_upTriangle;
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
function processDescription(id, mIDM, getter, setter, marginComponent, marginDiv) {
    let div = (0, html_js_1.createFlexDiv)(undefined, marginDiv);
    let buttonTextContentSelected = app_js_1.s_description + app_js_1.sy_selected;
    let buttonTextContentDeselected = app_js_1.s_description + app_js_1.sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, mIDM.addID(id, html_js_1.s_button), marginComponent);
    div.appendChild(button);
    button.classList.add(app_js_1.s_optionOn);
    button.classList.add(app_js_1.s_optionOff);
    let inputId = mIDM.addID(id, app_js_1.s_description, app_js_1.s_input);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_js_1.s_optionOn);
    }
    else {
        addDescription(div, inputId, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(app_js_1.s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addDescription(div, inputId, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_js_1.s_optionOn);
        button.classList.toggle(app_js_1.s_optionOff);
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
function addDescription(div, id, value, setter, boundary) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value;
    }
    let input = (0, html_js_1.createInput)("text", id, boundary);
    input.addEventListener('change', (event) => {
        let target = event.target;
        setter(target.value);
        console.log(id + " changed from " + value + " to " + target.value);
        (0, html_js_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_js_1.resizeInputElement)(input);
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
function getAddAtomButton(mIDM, molecule, aaDiv, typeID, boundary, level) {
    // Create an add atom button.
    let button = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, mIDM.addID(aaDiv.id, "Add" + typeID + "Button"), level);
    button.addEventListener('click', () => {
        let attributes = new Map();
        let a = new xml_molecule_js_1.Atom(attributes, molecule);
        //let aID: string = molecule.getAtoms().addAtom(a);
        aaDiv.insertBefore(addAtom(mIDM, molecule, aaDiv.id, molecule.getAtoms(), a, boundary, level), button);
    });
    return button;
}
function addMetadata(m, md, ml, mdDivID, boundary, level) {
    ml.addMetadata(md);
    let mdDiv = (0, html_js_1.createFlexDiv)(mdDivID, app_js_1.level1);
    mdDiv.appendChild((0, html_js_1.createLabel)(m.getLabel(), app_js_1.boundary1));
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
function addAtom(mIDM, molecule, aaDivID, aa, a, boundary, level) {
    let aID = aa.addAtom(a, a.getID());
    let aDivID = mIDM.addID(aaDivID, aID);
    let aDiv = (0, html_js_1.createFlexDiv)(aDivID, level);
    aDiv.appendChild((0, html_js_1.createLabel)(aID, boundary));
    let aIDs = new Set();
    // elementType.
    processElementType(mIDM, a, aDiv, aIDs, true, boundary);
    // Coordinates.
    processCoordinates(mIDM, a, aDiv, aIDs, boundary, boundary);
    (0, app_js_1.addRemoveButton)(aDiv, boundary, removeAtom, molecule, aID, aIDs);
    // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
    (0, app_js_1.addOptionByClassName)(xml_molecule_js_1.Bond.s_atomRefs2, aID);
    return aDiv;
}
/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param aID The atom id to remove.
 */
function removeAtom(molecule, aID, aIDs) {
    molecule.getAtoms().removeAtom(aID);
    aIDs.forEach((x) => {
        console.log("Removing " + x);
        (0, app_js_1.remove)(x);
    });
    (0, app_js_1.removeOptionByClassName)(xml_molecule_js_1.Bond.s_atomRefs2, aID);
    molecule.getBonds().bonds.forEach((bond) => {
        let atomRefs2 = bond.getAtomRefs2();
        let atomRefs = atomRefs2.split(" ");
        if (atomRefs[0] == atomRefs[1]) {
            let bondId = bond.getID();
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            (0, app_js_1.removeOptionByClassName)(xml_molecule_js_1.Bond.tagName, bondId);
            // remove the bondDiv element.
            let bID = (0, util_js_1.getID)(xml_molecule_js_1.Molecule.tagName, molecule.id, xml_molecule_js_1.BondArray.tagName, bondId);
            let bondDiv = document.getElementById(bID);
            if (bondDiv == null) {
                throw new Error("Bond div with id " + bID + " not found.");
            }
            else {
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
function processElementType(mIDM, a, aDiv, aIDs, first, margin) {
    let elementType = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = xml_mesmer_js_1.Mesmer.elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = app_js_1.s_selectOption;
        (0, app_js_1.addOrRemoveInstructions)(selectTypes, first);
        //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    let id = mIDM.addID(aDiv.id, xml_molecule_js_1.Atom.s_elementType);
    aIDs.add(id);
    let lws = (0, html_js_1.createLabelWithSelect)(xml_molecule_js_1.Atom.s_elementType, selectTypes, xml_molecule_js_1.Atom.s_elementType, elementType, id, margin, margin);
    let select = lws.querySelector('select');
    select.addEventListener('change', (event) => {
        let target = event.target;
        a.setElementType(target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    select.value = elementType;
    (0, html_js_1.resizeSelectElement)(select);
    (0, app_js_1.selectAnotherOptionEventListener)(selectTypes, select);
    aDiv.appendChild(lws);
    return lws;
}
/**
 * Process atom coordinates.
 * @param a The atom.
 * @param aDiv The atom div.
 * @param margin The margin.
 */
function processCoordinates(mIDM, a, aDiv, aIDs, marginComponent, margin) {
    let id;
    id = mIDM.addID(aDiv.id, xml_molecule_js_1.Atom.s_x3);
    aIDs.add(id);
    aDiv.appendChild((0, app_js_1.processNumber)(id, aIDs, xml_molecule_js_1.Atom.s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    id = mIDM.addID(aDiv.id, xml_molecule_js_1.Atom.s_y3);
    aIDs.add(id);
    aDiv.appendChild((0, app_js_1.processNumber)(id, aIDs, xml_molecule_js_1.Atom.s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    id = mIDM.addID(aDiv.id, xml_molecule_js_1.Atom.s_z3);
    aIDs.add(id);
    aDiv.appendChild((0, app_js_1.processNumber)(id, aIDs, xml_molecule_js_1.Atom.s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
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
function getAddBondButton(mIDM, molecule, baDiv, typeID, boundary, level) {
    // Create an add button.
    let id = mIDM.addID(baDiv.id, typeID, html_js_1.s_button);
    let button = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, id, level);
    button.addEventListener('click', () => {
        let atoms = molecule.getAtoms().atoms;
        if (atoms.size < 2) {
            alert("There must be at least 2 atoms to create a bond.");
            return;
        }
        let attributes = new Map();
        let atomRefs2 = Array.from(atoms.keys()).slice(0, 2).join(" ");
        attributes.set(xml_molecule_js_1.Bond.s_atomRefs2, atomRefs2);
        let b = new xml_molecule_js_1.Bond(attributes, molecule);
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
function addBond(mIDM, molecule, baDivID, atoms, ba, b, boundary, level) {
    let bID = ba.addBond(b, b.getID());
    let bDivID = (0, util_js_1.getID)(baDivID, bID);
    let bDiv = (0, html_js_1.createFlexDiv)(bDivID, level);
    bDiv.appendChild((0, html_js_1.createLabel)(bID, boundary));
    // atomRefs2.
    processAtomRefs2(mIDM, molecule, bDiv, b, boundary);
    // order.
    processOrder(mIDM, bDiv, b, boundary);
    // Add to the classlists so that bondDivs involving particular atoms can be found.
    Array.from(atoms.keys()).forEach((atomId) => {
        bDiv.classList.add(atomId);
    });
    // Add remove button.
    let removeBond = (id) => molecule.getBonds().removeBond(id);
    (0, app_js_1.addRemoveButton)(bDiv, boundary, removeBond, bID);
    // Get elements with Bond className. These select elements are to be updated to include the new bond option.
    (0, app_js_1.addOptionByClassName)(xml_molecule_js_1.Bond.tagName, bID);
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
function processAtomRefs2(mIDM, molecule, bDiv, bond, margin) {
    let id = mIDM.addID(bDiv.id, xml_molecule_js_1.Bond.s_atomRefs2);
    //bIDs.add(id);
    let atomRefs2 = bond.getAtomRefs2();
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    let alwsID = mIDM.addID(id, 0);
    //bIDs.add(alwsID);
    let alws = (0, html_js_1.createLabelWithSelect)(xml_molecule_js_1.Bond.s_atomRefs2 + "[0]", atomRefOptions, xml_molecule_js_1.Atom.tagName, atomRefs[0], alwsID, margin, margin);
    let aselect = alws.querySelector('select');
    aselect.classList.add(xml_molecule_js_1.Bond.s_atomRefs2);
    aselect.addEventListener('change', (event) => {
        let target = event.target;
        let atomRefs2 = target.value + " " + atomRefs[1];
        console.log(xml_molecule_js_1.Bond.s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, html_js_1.resizeSelectElement)(target);
    });
    aselect.value = atomRefs[0];
    (0, html_js_1.resizeSelectElement)(aselect);
    bDiv.appendChild(alws);
    // blws.
    let blwsID = mIDM.addID(id, 1);
    //bIDs.add(blwsID);
    let blws = (0, html_js_1.createLabelWithSelect)(xml_molecule_js_1.Bond.s_atomRefs2 + "[1]", atomRefOptions, xml_molecule_js_1.Atom.tagName, atomRefs[1], blwsID, margin, margin);
    let bselect = blws.querySelector('select');
    bselect.classList.add(xml_molecule_js_1.Bond.s_atomRefs2);
    bselect.addEventListener('change', (event) => {
        let target = event.target;
        let atomRefs2 = atomRefs[0] + " " + target.value;
        console.log(xml_molecule_js_1.Bond.s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, html_js_1.resizeSelectElement)(target);
    });
    bselect.value = atomRefs[1];
    (0, html_js_1.resizeSelectElement)(bselect);
    bDiv.appendChild(blws);
}
/**
 * Process an order.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param margin The margin for components.
 */
function processOrder(mIDM, bondDiv, bond, margin) {
    let id = mIDM.addID(bondDiv.id, xml_molecule_js_1.Bond.s_order);
    let div = (0, html_js_1.createFlexDiv)(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = xml_molecule_js_1.Bond.s_order + app_js_1.sy_selected;
    let buttonTextContentDeselected = xml_molecule_js_1.Bond.s_order + app_js_1.sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add(app_js_1.s_optionOn);
    button.classList.add(app_js_1.s_optionOff);
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_js_1.s_optionOn);
    }
    else {
        addOrder(div, bond, id, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(app_js_1.s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(id) == null) {
            if (value == undefined) {
                value = 1;
            }
            addOrder(div, bond, id, value, margin);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_js_1.s_optionOn);
        button.classList.toggle(app_js_1.s_optionOff);
    });
}
/**
 * @param div The div to add the input to.
 * @param bond The bond.
 * @param id The id.
 * @param value The order value.
 * @param boundary The boundary.
 */
function addOrder(div, bond, id, value, boundary) {
    let valueString = value.toString();
    let select = (0, html_js_1.createSelectElement)(xml_molecule_js_1.Bond.orderOptions, xml_molecule_js_1.Bond.s_order, valueString, id, boundary);
    select.addEventListener('change', (event) => {
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log(xml_molecule_js_1.Bond.s_order + " changed from " + valueString + " to " + target.value);
        (0, html_js_1.resizeSelectElement)(target);
    });
    select.value = valueString;
    (0, html_js_1.resizeSelectElement)(select);
    select.id = id;
    div.appendChild(select);
}
/**
 * Process an order.
 * @param hrpDiv The HinderedRotorPotential div.
 * @param margin The margin for components.
 */
function processUseSineTerms(mIDM, hrpDiv, hrp, margin) {
    let id = mIDM.addID(hrpDiv.id, xml_molecule_js_1.HinderedRotorPotential.s_useSineTerms);
    let buttonTextContentSelected = xml_molecule_js_1.HinderedRotorPotential.s_useSineTerms + app_js_1.sy_selected;
    let buttonTextContentDeselected = xml_molecule_js_1.HinderedRotorPotential.s_useSineTerms + app_js_1.sy_deselected;
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, undefined, margin);
    hrpDiv.appendChild(button);
    button.classList.add(app_js_1.s_optionOn);
    button.classList.add(app_js_1.s_optionOff);
    if (hrp.getUseSineTerms() == true) {
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(app_js_1.s_optionOff);
    }
    else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_js_1.s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (hrp.getUseSineTerms() == false) {
            hrp.setUseSineTerms(true);
            button.textContent = buttonTextContentSelected;
        }
        else {
            hrp.setUseSineTerms(false);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_js_1.s_optionOn);
        button.classList.toggle(app_js_1.s_optionOff);
    });
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */
function processMoleculeList(xml, mIDM, molecules) {
    // Create div to contain the molecules list.
    let mlDiv = (0, html_js_1.createDiv)(undefined, app_js_1.boundary1);
    // Get the XML "moleculeList" element.
    let xml_ml = (0, xml_js_1.getSingularElement)(xml, xml_mesmer_js_1.MoleculeList.tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let mlTagNames = new Set();
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
    if (!mlTagNames.has(xml_molecule_js_1.Molecule.tagName)) {
        console.warn("Expecting tags with \"" + xml_molecule_js_1.Molecule.tagName + "\" tagName but there are none! Please add molecules to the moleculeList.");
        // Add add molecule button.
        let amb = mlDiv.appendChild(getAddMoleculeButton(mlDiv, mIDM, molecules));
        // Add add from library button.
        mlDiv.appendChild(getAddFromLibraryButton(mlDiv, amb, mIDM, molecules));
        return mlDiv;
    }
    // Process the XML "molecule" elements.
    let xml_ms = xml_ml.getElementsByTagName(xml_molecule_js_1.Molecule.tagName);
    let xml_msl = xml_ms.length;
    console.log("Number of molecules=" + xml_msl);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for (let i = 0; i < xml_msl; i++) {
        // Create a new Molecule.
        let mDivID = mIDM.addID(xml_molecule_js_1.Molecule.tagName, i);
        let mDiv = (0, html_js_1.createDiv)(mDivID);
        let attributes = (0, xml_js_1.getAttributes)(xml_ms[i]);
        let m = new xml_molecule_js_1.Molecule(attributes, attributes.get(xml_molecule_js_1.Molecule.s_id));
        (0, app_js_1.addMolecule)(m, molecules);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, app_js_1.s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, null, mDiv, m.label, app_js_1.boundary1, app_js_1.level1);
        // Create a set of molecule tag names.
        let moleculeTagNames = new Set();
        let cns = xml_ms[i].childNodes;
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
        // Add edit Name button.
        addEditIDButton(m, mcDiv.querySelector(html_js_1.s_button), mIDM, mDiv, app_js_1.level1);
        // Description
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, app_js_1.s_description), mIDM, m.getDescription.bind(m), m.setDescription.bind(m), app_js_1.boundary1, app_js_1.level1));
        // Init metadataList.
        //console.log("Init metadataList.");
        let xml_mls = xml_ms[i].getElementsByTagName(xml_metadata_js_1.MetadataList.tagName);
        if (xml_mls.length > 0) {
            if (xml_mls.length > 1) {
                console.warn("Expecting 1 or 0 " + xml_metadata_js_1.MetadataList.tagName + " but finding " + xml_mls.length + ". Loading the first of these...");
            }
            // Create collapsible MetadataList HTMLDivElement.
            let mdlDivID = mIDM.addID(mDivID, xml_metadata_js_1.MetadataList.tagName);
            let mdlDiv = (0, html_js_1.createDiv)(mdlDivID);
            let mdlcDivID = mIDM.addID(mdlDivID, app_js_1.s_container);
            let mdlcDiv = (0, html_js_1.getCollapsibleDiv)(mdlcDivID, mDiv, null, mdlDiv, xml_metadata_js_1.MetadataList.tagName, app_js_1.boundary1, app_js_1.level1);
            let xml_ml = xml_mls[0];
            let xml_ms = xml_ml.getElementsByTagName(xml_metadata_js_1.Metadata.tagName);
            let ml = new xml_metadata_js_1.MetadataList((0, xml_js_1.getAttributes)(xml_mls[0]));
            m.setMetadataList(ml);
            for (let j = 0; j < xml_ms.length; j++) {
                // Create a new Metadata.
                let md = new xml_metadata_js_1.Metadata((0, xml_js_1.getAttributes)(xml_ms[j]));
                mdlDiv.appendChild(addMetadata(m, md, ml, mIDM.addID(mdlDivID, j), app_js_1.boundary1, app_js_1.level1));
            }
            moleculeTagNames.delete(xml_metadata_js_1.MetadataList.tagName);
        }
        // Init atoms.
        let xml_aas = xml_ms[i].getElementsByTagName(xml_molecule_js_1.AtomArray.tagName);
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = mIDM.addID(mDivID, xml_molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, app_js_1.s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, xml_molecule_js_1.AtomArray.tagName, app_js_1.boundary1, app_js_1.level1);
        // There should be at least one atom!
        // Atoms may be in AtomArrays or not.
        // If any AtomArray elements have attributes, there will be a console warning.
        // There will be a single AtomArray containing any Atoms.
        let aa = new xml_molecule_js_1.AtomArray(new Map());
        m.setAtoms(aa);
        for (let j = 0; j < xml_aas.length; j++) {
            let aaa = (0, xml_js_1.getAttributes)(xml_aas[j]);
            if (aaa.size > 0) {
                console.warn("AtomArray attributes lost/ignored: " + (0, util_js_1.mapToString)(aaa));
            }
        }
        let xml_as = xml_ms[i].getElementsByTagName(xml_molecule_js_1.Atom.tagName);
        for (let j = 0; j < xml_as.length; j++) {
            aaDiv.appendChild(addAtom(mIDM, m, aaDivID, aa, new xml_molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_as[j]), m), app_js_1.boundary1, app_js_1.level1));
        }
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, xml_molecule_js_1.Atom.tagName, app_js_1.boundary1, app_js_1.level1));
        moleculeTagNames.delete(xml_molecule_js_1.Atom.tagName);
        // Init bonds.
        let xml_bas = xml_ms[i].getElementsByTagName(xml_molecule_js_1.BondArray.tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = mIDM.addID(mDivID, xml_molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = mIDM.addID(baDivID, app_js_1.s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, xml_molecule_js_1.BondArray.tagName, app_js_1.boundary1, app_js_1.level1);
        // Bonds may be in BondArrays or not.
        // If any BondArray elements have attributes, there will be a console warning.
        // There will be a single BondArray containing any Bonds.
        let ba = new xml_molecule_js_1.BondArray(new Map());
        m.setBonds(ba);
        for (let j = 0; j < xml_bas.length; j++) {
            let baa = (0, xml_js_1.getAttributes)(xml_bas[j]);
            if (baa.size > 0) {
                console.warn("BondArray attributes lost/ignored: " + (0, util_js_1.mapToString)(baa));
            }
        }
        let xml_bs = xml_ms[i].getElementsByTagName(xml_molecule_js_1.Bond.tagName);
        for (let j = 0; j < xml_bs.length; j++) {
            // Load those bonds that have an id attribute first.
            let b_attributes = (0, xml_js_1.getAttributes)(xml_bs[j]);
            if (b_attributes.has(xml_molecule_js_1.Bond.s_id)) {
                baDiv.appendChild(addBond(mIDM, m, baDivID, m.getAtoms().atoms, ba, new xml_molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m), app_js_1.boundary1, app_js_1.level1));
            }
        }
        // Load those bonds that do not have an id attribute.
        for (let j = 0; j < xml_bs.length; j++) {
            let b_attributes = (0, xml_js_1.getAttributes)(xml_bs[j]);
            if (!b_attributes.has(xml_molecule_js_1.Bond.s_id)) {
                baDiv.appendChild(addBond(mIDM, m, baDivID, m.getAtoms().atoms, ba, new xml_molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m), app_js_1.boundary1, app_js_1.level1));
            }
        }
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, xml_molecule_js_1.Bond.tagName, app_js_1.boundary1, app_js_1.level1));
        moleculeTagNames.delete(xml_molecule_js_1.Bond.tagName);
        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID = mIDM.addID(mDivID, app_js_1.s_viewer);
        let viewerDiv = (0, html_js_1.createDiv)(viewerDivID);
        let viewercDivID = mIDM.addID(viewerDivID, app_js_1.s_container);
        let viewercDiv = (0, html_js_1.getCollapsibleDiv)(viewercDivID, mDiv, null, viewerDiv, app_js_1.s_viewer, app_js_1.boundary1, app_js_1.level1);
        create3DViewer(mIDM, m, viewerDiv, app_js_1.boundary1, app_js_1.level1);
        // Init properties.
        let xml_pls = xml_ms[i].getElementsByTagName(xml_molecule_js_1.PropertyList.tagName);
        // Create a new collapsible div for the PropertyList.
        let plDivID = mIDM.addID(mDivID, xml_molecule_js_1.PropertyList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID);
        let plcDivID = mIDM.addID(plDivID, app_js_1.s_container);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, xml_molecule_js_1.PropertyList.tagName, app_js_1.boundary1, app_js_1.level1);
        // Properties may be in PropertyLists or not.
        // This implementation allows for there to be multiple PropertyList elements.
        // If any PropertyList elements have attributes, there will be a console warning.
        // There will be a single PropertyList containing any Properties.
        let pl = new xml_molecule_js_1.PropertyList(new Map());
        m.setPropertyList(pl);
        for (let j = 0; j < xml_pls.length; j++) {
            let pla = (0, xml_js_1.getAttributes)(xml_pls[j]);
            if (pla.size > 0) {
                console.warn("PropertyList attributes lost/ignored: " + (0, util_js_1.mapToString)(pla));
            }
        }
        let pap = new Set(xml_molecule_js_1.PropertyArray.propertyDictRefs);
        let xml_ps = xml_ms[i].getElementsByTagName(xml_molecule_js_1.Property.tagName);
        for (let j = 0; j < xml_ps.length; j++) {
            // Create a new Property.
            let p = createProperty(pap, pl, xml_ps[j], plDiv, m, app_js_1.boundary1, app_js_1.level1);
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
        let xml_etms = xml_ms[i].getElementsByTagName(xml_molecule_js_1.EnergyTransferModel.tagName);
        if (xml_etms.length > 0) {
            if (xml_etms.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_js_1.EnergyTransferModel.tagName + " but finding " + xml_etms.length + "!");
            }
            let etm = new xml_molecule_js_1.EnergyTransferModel((0, xml_js_1.getAttributes)(xml_etms[0]));
            processEnergyTransferModel(mIDM, etm, m, xml_etms[0], mDiv);
            moleculeTagNames.delete(xml_molecule_js_1.EnergyTransferModel.tagName);
        }
        // Organise DOSCMethod.
        let xml_dms = xml_ms[i].getElementsByTagName(xml_molecule_js_1.DOSCMethod.tagName);
        if (xml_dms.length > 0) {
            if (xml_dms.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_js_1.DOSCMethod.tagName + " but finding " + xml_dms.length + "!");
            }
            let doscm = new xml_molecule_js_1.DOSCMethod((0, xml_js_1.getAttributes)(xml_dms[0]));
            mDiv.appendChild((0, html_js_1.createLabelWithSelect)(xml_molecule_js_1.DOSCMethod.tagName, xml_molecule_js_1.DOSCMethod.xsi_typeOptions, xml_molecule_js_1.DOSCMethod.tagName, doscm.getXsiType(), mIDM.addID(mDivID, xml_molecule_js_1.DOSCMethod.tagName), app_js_1.boundary1, app_js_1.level1));
            moleculeTagNames.delete(xml_molecule_js_1.DOSCMethod.tagName);
        }
        // Organise DistributionCalcMethod. (Output only)
        let xml_dcms = xml_ms[i].getElementsByTagName(xml_molecule_js_1.DistributionCalcMethod.tagName);
        if (xml_dcms.length > 0) {
            if (xml_dcms.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_js_1.DistributionCalcMethod.tagName + " but finding " + xml_dcms.length + "!");
            }
            let dcmAttributes = (0, xml_js_1.getAttributes)(xml_dcms[0]);
            let dcm = new xml_molecule_js_1.DistributionCalcMethod(dcmAttributes);
            m.setDistributionCalcMethod(dcm);
            let dcmDivID = mIDM.addID(mDivID, xml_molecule_js_1.DistributionCalcMethod.tagName);
            let dcmDiv = (0, html_js_1.createDiv)(dcmDivID);
            mDiv.appendChild(dcmDiv);
            // Create label.
            dcmDiv.appendChild((0, html_js_1.createLabel)(xml_molecule_js_1.DistributionCalcMethod.tagName + " " + (0, util_js_1.mapToString)(dcmAttributes), app_js_1.level1));
            moleculeTagNames.delete(xml_molecule_js_1.DistributionCalcMethod.tagName);
        }
        // Organise DensityOfStatesList. (Output only)
        let xml_dosl = xml_ms[i].getElementsByTagName(xml_molecule_js_1.DensityOfStatesList.tagName);
        if (xml_dosl.length > 0) {
            if (xml_dosl.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_js_1.DensityOfStatesList.tagName + " but finding " + xml_dosl.length + "!");
            }
            let dosl = new xml_molecule_js_1.DensityOfStatesList((0, xml_js_1.getAttributes)(xml_dosl[0]));
            m.setDensityOfStatesList(dosl);
            // Create collapsible div.
            let doslDivID = mIDM.addID(mDivID, xml_molecule_js_1.DensityOfStatesList.tagName);
            let doslDiv = (0, html_js_1.createDiv)(doslDivID);
            let doslcDivID = mIDM.addID(doslDivID, app_js_1.s_container);
            let doslcDiv = (0, html_js_1.getCollapsibleDiv)(doslcDivID, mDiv, null, doslDiv, xml_molecule_js_1.DensityOfStatesList.tagName, app_js_1.boundary1, app_js_1.level1);
            let xml_dos = xml_dosl[0].getElementsByTagName(xml_molecule_js_1.DensityOfStates.tagName);
            // Organise Description.
            let xml_ds = xml_dosl[0].getElementsByTagName(xml_mesmer_js_1.Description.tagName);
            if (xml_ds.length > 0) {
                if (xml_ds.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_mesmer_js_1.Description.tagName + " but finding " + xml_ds.length + "!");
                }
                let ds = new xml_mesmer_js_1.Description((0, xml_js_1.getAttributes)(xml_ds[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ds[0])));
                dosl.setDescription(ds);
            }
            // Organise DensityOfStates.
            //console.log("xml_dos.length=" + xml_dos.length);
            if (xml_dos.length == 0) {
                throw new Error("Expecting 1 or more " + xml_molecule_js_1.DensityOfStates.tagName + " but finding 0!");
            }
            else {
                let t = (0, html_js_1.createTable)(mIDM.addID(doslDivID, app_js_1.s_table), app_js_1.level1);
                (0, html_js_1.addTableRow)(t, xml_molecule_js_1.DensityOfStates.header);
                // Append the table to the div.
                doslDiv.appendChild(t);
                for (let j = 0; j < xml_dos.length; j++) {
                    //console.log("j=" + j);
                    let dos = new xml_molecule_js_1.DensityOfStates((0, xml_js_1.getAttributes)(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    let dosDivID = mIDM.addID(doslDivID, j);
                    let dosDiv = (0, html_js_1.createFlexDiv)(dosDivID, app_js_1.level1);
                    doslDiv.appendChild(dosDiv);
                    // T.
                    let xml_t = xml_dos[j].getElementsByTagName(xml_mesmer_js_1.T.tagName);
                    if (xml_t.length != 1) {
                        throw new Error("Expecting 1 " + xml_mesmer_js_1.T.tagName + " but finding " + xml_t.length + "!");
                    }
                    else {
                        let t = new xml_mesmer_js_1.T((0, xml_js_1.getAttributes)(xml_t[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_t[0]))));
                        dos.setT(t);
                        //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot = xml_dos[j].getElementsByTagName(xml_molecule_js_1.Qtot.tagName);
                    if (xml_qtot.length != 1) {
                        throw new Error("Expecting 1 " + xml_molecule_js_1.Qtot.tagName + " but finding " + xml_qtot.length + "!");
                    }
                    else {
                        let qtot = new xml_molecule_js_1.Qtot((0, xml_js_1.getAttributes)(xml_qtot[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_qtot[0]))));
                        dos.setQtot(qtot);
                        //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc = xml_dos[j].getElementsByTagName(xml_molecule_js_1.Sumc.tagName);
                    if (xml_sumc.length != 1) {
                        throw new Error("Expecting 1 " + xml_molecule_js_1.Sumc.tagName + " but finding " + xml_sumc.length + "!");
                    }
                    else {
                        let sumc = new xml_molecule_js_1.Sumc((0, xml_js_1.getAttributes)(xml_sumc[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_sumc[0]))));
                        dos.setSumc(sumc);
                        //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg = xml_dos[j].getElementsByTagName(xml_molecule_js_1.Sumg.tagName);
                    if (xml_sumg.length != 1) {
                        throw new Error("Expecting 1 " + xml_molecule_js_1.Sumg.tagName + " but finding " + xml_sumg.length + "!");
                    }
                    else {
                        let sumg = new xml_molecule_js_1.Sumg((0, xml_js_1.getAttributes)(xml_sumg[0]), new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_sumg[0]))));
                        dos.setSumg(sumg);
                        //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                    (0, html_js_1.addTableRow)(t, dos.toStringArray());
                    //console.log("dos: " + dos.toString());
                }
                (0, app_js_1.addSaveAsCSVButton)(dosl.toCSV, doslDiv, t, m.getID() + "_" + xml_molecule_js_1.DensityOfStatesList.tagName, app_js_1.level1);
            }
            moleculeTagNames.delete(xml_molecule_js_1.DensityOfStatesList.tagName);
        }
        // Organise ThermoTable. (Output only)
        let tttn = xml_molecule_js_1.ThermoTable.tagName;
        let xml_tts = xml_ms[i].getElementsByTagName(tttn);
        if (xml_tts.length > 0) {
            if (xml_tts.length > 1) {
                throw new Error("Expecting 1 or 0 " + tttn + " but finding " + xml_tts.length + "!");
            }
            let tt = new xml_molecule_js_1.ThermoTable((0, xml_js_1.getAttributes)(xml_tts[0]));
            // Create collapsible div.
            let ttDivId = mIDM.addID(mDivID, xml_molecule_js_1.ThermoTable.tagName);
            let ttDiv = (0, html_js_1.createDiv)(ttDivId);
            let ttcDivId = mIDM.addID(ttDivId, app_js_1.s_container);
            let ttcDiv = (0, html_js_1.getCollapsibleDiv)(ttcDivId, mDiv, null, ttDiv, tttn, app_js_1.boundary1, app_js_1.level1);
            let tvs;
            let tvtn = xml_molecule_js_1.ThermoValue.tagName;
            let xml_tvs = xml_tts[0].getElementsByTagName(tvtn);
            if (xml_tvs.length == 0) {
                throw new Error("Expecting 1 or more " + tvtn + " but finding 0!");
            }
            else {
                tvs = [];
                let t = (0, html_js_1.createTable)(mIDM.addID(ttDivId, app_js_1.s_table), app_js_1.level1);
                (0, html_js_1.addTableRow)(t, tt.getHeader());
                for (let j = 0; j < xml_tvs.length; j++) {
                    let tv = new xml_molecule_js_1.ThermoValue((0, xml_js_1.getAttributes)(xml_tvs[j]));
                    tvs.push(tv);
                    (0, html_js_1.addTableRow)(t, tv.toStringArray());
                }
                // Append the table to the div.
                ttDiv.appendChild(t);
                tt.init(tvs);
                (0, app_js_1.addSaveAsCSVButton)(tt.toCSV.bind(tt), ttDiv, t, mIDM.addID(m.getID(), xml_molecule_js_1.ThermoTable.tagName), app_js_1.level1);
            }
            m.setThermoTable(tt);
            moleculeTagNames.delete(tvtn);
            moleculeTagNames.delete(tttn);
        }
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_ms[i].getElementsByTagName(xml_molecule_js_1.ExtraDOSCMethod.tagName);
        if (xml_edms.length > 0) {
            for (let j = 0; j < xml_edms.length; j++) {
                let edm = new xml_molecule_js_1.ExtraDOSCMethod((0, xml_js_1.getAttributes)(xml_edms[j]));
                // Create collapsible ExtraDOSCMethod HTMLDivElement.
                let edmDivID = mIDM.addID(mDivID, xml_molecule_js_1.ExtraDOSCMethod.tagName, j);
                let edmDiv = (0, html_js_1.createDiv)(edmDivID);
                let edmcDivID = mIDM.addID(edmDivID, app_js_1.s_container);
                let edmcDiv = (0, html_js_1.getCollapsibleDiv)(edmcDivID, mDiv, null, edmDiv, xml_molecule_js_1.ExtraDOSCMethod.tagName, app_js_1.boundary1, app_js_1.level1);
                // Read bondRef.
                let xml_brs = xml_edms[j].getElementsByTagName(xml_molecule_js_1.BondRef.tagName);
                if (xml_brs.length > 0) {
                    if (xml_brs.length != 1) {
                        throw new Error("Expecting only 1 bondRef, but there are " + xml_brs.length);
                    }
                    let bids = m.getBonds().getBondIds();
                    let br = new xml_molecule_js_1.BondRef((0, xml_js_1.getAttributes)(xml_brs[0]), (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_brs[0])));
                    let lws = (0, html_js_1.createLabelWithSelect)(xml_molecule_js_1.BondRef.tagName, bids, xml_molecule_js_1.BondRef.tagName, br.value, mIDM.addID(edmDivID, xml_molecule_js_1.BondRef.tagName), app_js_1.boundary1, app_js_1.level1);
                    let select = lws.getElementsByTagName("select")[0];
                    select.classList.add(xml_molecule_js_1.Bond.tagName);
                    edmDiv.appendChild(lws);
                }
                // Read hinderedRotorPotential.
                let xml_hrps = xml_edms[j].getElementsByTagName(xml_molecule_js_1.HinderedRotorPotential.tagName);
                if (xml_hrps.length > 0) {
                    if (xml_hrps.length != 1) {
                        throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hrps.length);
                    }
                    let hrpAttributes = (0, xml_js_1.getAttributes)(xml_hrps[0]);
                    let hrp = new xml_molecule_js_1.HinderedRotorPotential(hrpAttributes);
                    // Create collapsible HinderedRotorPotential HTMLDivElement.
                    let hrpDivID = mIDM.addID(edmDivID, xml_molecule_js_1.HinderedRotorPotential.tagName);
                    let hrpDiv = (0, html_js_1.createDiv)(hrpDivID);
                    let hrpcDivID = mIDM.addID(hrpDivID, app_js_1.s_container);
                    let hrpcDiv = (0, html_js_1.getCollapsibleDiv)(hrpcDivID, edmDiv, null, hrpDiv, xml_molecule_js_1.HinderedRotorPotential.tagName, app_js_1.boundary1, app_js_1.level1);
                    // Format.
                    let lws = (0, html_js_1.createLabelWithSelect)(xml_molecule_js_1.HinderedRotorPotential.s_format, xml_molecule_js_1.HinderedRotorPotential.formats, xml_molecule_js_1.HinderedRotorPotential.tagName, hrp.getFormat(), mIDM.addID(hrpDivID, xml_molecule_js_1.HinderedRotorPotential.s_format), app_js_1.boundary1, app_js_1.level1);
                    hrpDiv.appendChild(lws);
                    // Units.
                    (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.energyUnits, hrpAttributes, hrpDiv, lws, mIDM.addID(hrpDivID, xml_molecule_js_1.HinderedRotorPotential.s_units), xml_molecule_js_1.HinderedRotorPotential.tagName, app_js_1.boundary1, app_js_1.level1);
                    // ExpansionSize.
                    let es = hrp.getExpansionSize() ?? app_js_1.s_undefined;
                    hrpDiv.appendChild((0, html_js_1.createLabelWithInput)("text", mIDM.addID(hrpDivID, xml_molecule_js_1.HinderedRotorPotential.s_expansionSize), app_js_1.boundary1, app_js_1.level1, (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        try {
                            console.log("Setting " + xml_molecule_js_1.HinderedRotorPotential.s_expansionSize + " to " + target.value);
                            hrp.setExpansionSize(new big_js_1.default(target.value));
                        }
                        catch (e) {
                            alert("Invalid value, resetting...");
                            target.value = hrp.getExpansionSize() ?? app_js_1.s_undefined;
                        }
                        (0, html_js_1.resizeInputElement)(target);
                    }, es, xml_molecule_js_1.HinderedRotorPotential.s_expansionSize));
                    // Add useSineTerms.
                    processUseSineTerms(mIDM, hrpDiv, hrp, app_js_1.level1);
                    // Load PotentialPoints.
                    // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                    let ppsDivID = mIDM.addID(hrpDivID, xml_molecule_js_1.PotentialPoint.tagName);
                    let ppsDiv = (0, html_js_1.createDiv)(ppsDivID);
                    let ppscDivID = mIDM.addID(ppsDivID, app_js_1.s_container);
                    let ppscDiv = (0, html_js_1.getCollapsibleDiv)(ppscDivID, mDiv, null, ppsDiv, "PotentialPoints", app_js_1.boundary1, app_js_1.level1);
                    hrpDiv.appendChild(ppscDiv);
                    let pps = [];
                    let xml_pps = xml_hrps[0].getElementsByTagName(xml_molecule_js_1.PotentialPoint.tagName);
                    for (let k = 0; k < xml_pps.length; k++) {
                        let pp = new xml_molecule_js_1.PotentialPoint((0, xml_js_1.getAttributes)(xml_pps[k]));
                        pps.push(pp);
                        let ppDivID = mIDM.addID(ppsDivID, k);
                        let ppDiv = (0, html_js_1.createFlexDiv)(ppDivID, app_js_1.level1);
                        ppsDiv.appendChild(ppDiv);
                        let l = (0, html_js_1.createLabel)(xml_molecule_js_1.PotentialPoint.tagName + " " + k, app_js_1.boundary1);
                        ppDiv.appendChild(l);
                        // Process angle
                        let a = pp.getAngle() ?? app_js_1.s_undefined;
                        let anglelwi = (0, html_js_1.createLabelWithInput)("text", mIDM.addID(ppDivID, xml_molecule_js_1.PotentialPoint.s_angle), app_js_1.boundary1, app_js_1.boundary1, (event) => {
                            let target = event.target;
                            // Check the input is a number.
                            if ((0, util_js_1.isNumeric)(target.value)) {
                                let value = new big_js_1.default(target.value);
                                pp.setAngle(value);
                            }
                            else {
                                // Reset the input to the current value.
                                alert("Angle input is not a number, resetting...");
                                target.value = pp.getAngle() ?? app_js_1.s_undefined;
                            }
                            (0, html_js_1.resizeInputElement)(target);
                        }, a, xml_molecule_js_1.PotentialPoint.s_angle);
                        ppDiv.appendChild(anglelwi);
                        // Create a new div element for the potential.
                        let potentialLabel = (0, html_js_1.createLabel)(xml_molecule_js_1.PotentialPoint.s_potential, app_js_1.boundary1);
                        ppDiv.appendChild(potentialLabel);
                        let potentialInputElementId = mIDM.addID(ppDivID, xml_molecule_js_1.PotentialPoint.s_potential);
                        let potentialInputElement = (0, html_js_1.createInput)("text", potentialInputElementId, app_js_1.boundary1);
                        ppDiv.appendChild(potentialInputElement);
                        let p = pp.getPotential() ?? app_js_1.s_undefined;
                        potentialInputElement.addEventListener('change', (event) => {
                            let target = event.target;
                            // Check the input is a number.
                            if ((0, util_js_1.isNumeric)(target.value)) {
                                let value = new big_js_1.default(target.value);
                                pp.setPotential(value);
                                console.log("Set " + xml_molecule_js_1.PotentialPoint.tagName + " to " + value.toExponential());
                            }
                            else {
                                // Reset the input to the current value.
                                alert("Potential input is not a number, resetting...");
                                potentialInputElement.value = pp.getPotential() ?? app_js_1.s_undefined;
                            }
                            (0, html_js_1.resizeInputElement)(potentialInputElement);
                        });
                        potentialInputElement.value = p;
                        (0, html_js_1.resizeInputElement)(potentialInputElement);
                    }
                    //ppsDiv.appendChild(ppDiv);
                    hrp.setPotentialPoints(pps);
                    edm.setHinderedRotorPotential(hrp);
                }
                // Read periodicities.
                let xml_periodicities = xml_edms[j].getElementsByTagName(xml_molecule_js_1.Periodicity.tagName);
                if (xml_periodicities.length > 0) {
                    if (xml_periodicities.length != 1) {
                        throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                    }
                    let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_periodicities[0]));
                    let periodicity = new xml_molecule_js_1.Periodicity((0, xml_js_1.getAttributes)(xml_periodicities[0]), new big_js_1.default(valueString));
                    edm.setPeriodicity(periodicity);
                    let lwi = (0, html_js_1.createLabelWithInput)("text", mIDM.addID(edmDivID, xml_molecule_js_1.Periodicity.tagName), app_js_1.boundary1, app_js_1.level1, (event) => {
                        let target = event.target;
                        valueString = target.value;
                        if ((0, util_js_1.isNumeric)(valueString)) {
                            let value = new big_js_1.default(valueString);
                            periodicity.value = value;
                            edm.getPeriodicity().value = value;
                            console.log("Set " + xml_molecule_js_1.Periodicity.tagName + " to " + value);
                        }
                        else {
                            // Reset the input to the current value.
                            alert("Periodicity input is not a number, resetting...");
                            target.value = periodicity.value.toExponential();
                        }
                    }, valueString, xml_molecule_js_1.Periodicity.tagName);
                    edmDiv.appendChild(lwi);
                }
                m.setExtraDOSCMethod(j, edm);
                moleculeTagNames.delete(xml_molecule_js_1.ExtraDOSCMethod.tagName);
            }
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete(xml_molecule_js_1.ReservoirSize.tagName);
        let xml_ReservoirSize = xml_ms[i].getElementsByTagName(xml_molecule_js_1.ReservoirSize.tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            }
            let valueString = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_ReservoirSize[0]));
            let value = new big_js_1.default(valueString);
            let reservoirSizeAttributes = (0, xml_js_1.getAttributes)(xml_ReservoirSize[0]);
            let reservoirSize = new xml_molecule_js_1.ReservoirSize(reservoirSizeAttributes, value);
            m.setReservoirSize(reservoirSize);
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", m.getID() + "_" + xml_molecule_js_1.ReservoirSize.tagName, app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                reservoirSize.value = new big_js_1.default(target.value);
                (0, html_js_1.resizeInputElement)(target);
            }, valueString, xml_molecule_js_1.ReservoirSize.tagName);
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
        (0, app_js_1.addRemoveButton)(mDiv, app_js_1.level1, () => {
            removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m);
        });
    }
    // Create an add molecule button.
    let mb = getAddMoleculeButton(mlDiv, mIDM, molecules);
    // Create add from library button.
    let lb = getAddFromLibraryButton(mlDiv, mb, mIDM, molecules);
    return mlDiv;
}
exports.processMoleculeList = processMoleculeList;
/**
 * Remove a molecule.
 * @param mlDiv The MoleculeList div.
 * @param mcDiv The MoleculeContainer div.
 * @param mIDM The molecule IDManager.
 * @param molecules The molecules.
 * @param mDivID The molecule div ID.
 * @param m The molecule.
 */
function removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m) {
    mlDiv.removeChild(mcDiv);
    //mlDiv.removeChild(mDiv);
    mIDM.removeIDs(mDivID);
    mIDM.removeIDs((0, util_js_1.getID)(mDivID, app_js_1.s_description));
    mIDM.removeIDs((0, util_js_1.getID)(mDivID, xml_molecule_js_1.AtomArray.tagName));
    mIDM.removeIDs((0, util_js_1.getID)(mDivID, xml_molecule_js_1.BondArray.tagName));
    mIDM.removeIDs((0, util_js_1.getID)(mDivID, app_js_1.s_viewer));
    mIDM.removeIDs((0, util_js_1.getID)(mDivID, xml_molecule_js_1.PropertyList.tagName));
    molecules.delete(m.getID());
}
/**
 * @param pl The PropertyList.
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */
function createProperty(pap, pl, xml, plDiv, molecule, boundary, level) {
    let p = new xml_molecule_js_1.Property((0, xml_js_1.getAttributes)(xml));
    pap.delete(p.dictRef);
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == xml_molecule_js_1.ZPE.dictRef) {
        // "me:ZPE", scalar, Mesmer.energyUnits.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Hf0.dictRef) {
        // "me:Hf0", scalar, Mesmer.energyUnits.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.HfAT0.dictRef) {
        // "me:HfAT0", scalar, Mesmer.energyUnits.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Hf298.dictRef) {
        // "me:Hf298", scalar, Mesmer.energyUnits.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.RotConsts.dictRef) {
        // "me:rotConsts", array, Mesmer.frequencyUnits.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, xml_mesmer_js_1.Mesmer.frequencyUnits, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.SymmetryNumber.dictRef) {
        // "me:symmetryNumber", scalar, No units.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef) {
        // "me:TSOpticalSymmetryNumber", scalar, No units.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.FrequenciesScaleFactor.dictRef) {
        // "me:frequenciesScaleFactor", scalar, No units.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.VibFreqs.dictRef) {
        // "me:vibFreqs", array, cm-1.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.MW.dictRef) {
        // "me:MW", scalar, amu.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.SpinMultiplicity.dictRef) {
        // "me:spinMultiplicity", scalar, No units.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Epsilon.dictRef) {
        // "me:epsilon", scalar, K (fixed).
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Sigma.dictRef) {
        // "me:sigma", scalar, Å (fixed).
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Hessian.dictRef) {
        // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.EinsteinAij.dictRef) {
        // "me:EinsteinAij", array, s-1 (fixed).
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.EinsteinBij.dictRef) {
        // "me:EinsteinBij", array, m3/J/s2 (fixed).
        (0, app_js_1.processPropertyScalarNumber)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    }
    else {
        (0, app_js_1.processPropertyScalarString)(pl, p, molecule, xml, plDiv, boundary, level);
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
function processEnergyTransferModel(mIDM, etm, molecule, element, moleculeDiv) {
    let xml_deltaEDowns = element.getElementsByTagName(xml_molecule_js_1.DeltaEDown.tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmdivID = mIDM.addID(moleculeDiv.id, xml_molecule_js_1.EnergyTransferModel.tagName);
        let etmDiv = document.createElement("div");
        let etmcDivID = mIDM.addID(etmdivID, app_js_1.s_container);
        let etmcDiv = (0, html_js_1.getCollapsibleDiv)(etmcDivID, moleculeDiv, null, etmDiv, xml_molecule_js_1.EnergyTransferModel.tagName, app_js_1.boundary1, app_js_1.level1);
        let deltaEDowns = [];
        for (let k = 0; k < xml_deltaEDowns.length; k++) {
            let inputString = (0, xml_js_1.getInputString)(xml_deltaEDowns[k]);
            let value = new big_js_1.default(inputString);
            let deltaEDownAttributes = (0, xml_js_1.getAttributes)(xml_deltaEDowns[k]);
            let deltaEDown = new xml_molecule_js_1.DeltaEDown(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = xml_molecule_js_1.DeltaEDown.tagName;
            // Create a new div element for the input.
            let id = mIDM.addID(etmdivID, xml_molecule_js_1.DeltaEDown.tagName, k);
            let inputDiv = (0, html_js_1.createLabelWithInput)("number", id, app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                (0, app_js_1.setNumberNode)(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(new big_js_1.default(inputString));
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
 * Creates a 3D viewer for the molecule and adds this to the moleculeDiv.
 *
 * @param molecule The molecule.
 * @param moleculeDiv The molecule div.
 * @param boundary The margin for the viewer.
 * @param level The margin for the viewer container div.
 */
function create3DViewer(mIDM, molecule, moleculeDiv, boundary, level) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID = mIDM.addID(moleculeDiv.id, app_js_1.s_viewer, app_js_1.s_container);
    let viewerContainerDiv = (0, html_js_1.createDiv)(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID = mIDM.addID(moleculeDiv.id, app_js_1.s_viewer);
    let showAtomLabels = false;
    let showBondLabels = false;
    // Create the GLViewer viewer.
    function createViewer(
    //cameraPosition: any, cameraOrientation: any, zoomLevel: any, 
    showAtomLabels, showBondLabels) {
        let viewerDiv = (0, html_js_1.createDiv)(viewerDivID, boundary);
        viewerDiv.className = "mol-container";
        viewerContainerDiv.appendChild(viewerDiv);
        let config = { backgroundColor: 'grey' };
        let viewer = $3Dmol.createViewer(viewerDiv, config);
        // Set the viewer style to stick and ball.
        viewer.setStyle({ stick: {} });
        // Create a 3Dmol viewer control to turn labels on and off.
        molecule.getAtoms().atoms.forEach(function (atom) {
            let et = atom.getElementType();
            let color;
            if (et == undefined) {
                color = 'Purple';
            }
            else {
                color = xml_mesmer_js_1.Mesmer.atomColors.get(et) || 'Purple';
            }
            //let am: number = Mesmer.atomMasses.get(atom.getElementType()) || 1;
            let radius;
            if (et == undefined) {
                radius = 100;
            }
            else {
                radius = xml_mesmer_js_1.Mesmer.atomRadii.get(atom.getElementType()) || 100;
            }
            let ax = atom.getX3()?.toNumber() || 0;
            let ay = atom.getY3()?.toNumber() || 0;
            let az = atom.getZ3()?.toNumber() || 0;
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
            let ids = bond.getAtomRefs2().split(" ");
            let aa = molecule.getAtoms();
            let a0 = aa.getAtom(ids[0]);
            let a1 = aa.getAtom(ids[1]);
            let order = bond.getOrder() || 1;
            let color = xml_mesmer_js_1.Mesmer.bondColors.get(order) || 'Purple';
            // a0.
            let a0x = a0.getX3()?.toNumber() || 0;
            let a0y = a0.getY3()?.toNumber() || 0;
            let a0z = a0.getZ3()?.toNumber() || 0;
            // a1.
            let a1x = a1.getX3()?.toNumber() || 0;
            let a1y = a1.getY3()?.toNumber() || 0;
            let a1z = a1.getZ3()?.toNumber() || 0;
            viewer.addCylinder({ start: { x: a0x, y: a0y, z: a0z }, end: { x: a1x, y: a1y, z: a1z }, radius: 0.06 * order, color: color });
            if (showBondLabels) {
                viewer.addLabel(bond.getID(), { position: { x: (a0x + a1x) / 2, y: (a0y + a1y) / 2, z: (a0z + a1z) / 2 } });
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
    let redrawButton = (0, html_js_1.createButton)("Draw/Redraw", undefined);
    let viewer;
    redrawButton.addEventListener('click', () => {
        (0, app_js_1.remove)(viewerDivID);
        viewer = createViewer(
        //undefined, undefined, undefined, 
        showAtomLabels, showBondLabels);
    });
    viewerContainerDiv.appendChild(redrawButton);
    // Helper function to create a label button for hiding or showing labels on the viewer.
    function createLabelButton(label, id, showState, updateState) {
        let button = (0, html_js_1.createButton)((showState ? "Hide " : "Show ") + label, id, boundary);
        button.addEventListener('click', () => {
            if (showState) {
                button.textContent = "Show " + label;
                showState = false;
            }
            else {
                button.textContent = "Hide " + label;
                showState = true;
            }
            /*
            let cameraPosition = viewer.getCameraPosition();
            let cameraOrientation = viewer.getCameraOrientation();
            let zoomLevel = viewer.getZoomLevel();
            */
            updateState(showState);
            (0, app_js_1.remove)(viewerDivID);
            viewer = createViewer(
            //cameraPosition, cameraOrientation, zoomLevel,
            showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, mIDM.addID(viewerDivID, s_Atom_Labels), showAtomLabels, newState => showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, mIDM.addID(viewerDivID, s_Bond_Labels), showBondLabels, newState => showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton = (0, html_js_1.createButton)("Save as PNG", mIDM.addID(viewerDivID, app_js_1.s_save), app_js_1.boundary1);
    saveButton.addEventListener('click', () => {
        //viewer.pngURI({ backgroundColor: 'white', download: true });
        let canvas = viewer.pngURI();
        let a = document.createElement('a');
        a.href = canvas;
        let title = app_js_1.mesmer.getTitle()?.value;
        a.download = title.replace(/[^a-z0-9]/gi, '_') + 'mol.png';
        document.body.appendChild(a); // Append the anchor to the body.
        a.click(); // Programmatically click the anchor to trigger the download.
        document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
        console.log('Save Image');
    });
    viewerContainerDiv.appendChild(saveButton);
}
exports.create3DViewer = create3DViewer;
//# sourceMappingURL=gui_moleculeList.js.map