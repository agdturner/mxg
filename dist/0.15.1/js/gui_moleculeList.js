"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddMoleculeButton = getAddMoleculeButton;
exports.initialiseProperties = initialiseProperties;
exports.setPropertyScalarNumber = setPropertyScalarNumber;
exports.setValues = setValues;
exports.setPropertyArrayOrMatrix = setPropertyArrayOrMatrix;
exports.getAddFromLibraryButton = getAddFromLibraryButton;
exports.setMoleculeID = setMoleculeID;
exports.processMoleculeList = processMoleculeList;
exports.createPropertyAndDiv = createPropertyAndDiv;
exports.processProperty = processProperty;
exports.processPropertyString = processPropertyString;
exports.create3DViewer = create3DViewer;
exports.addProperty1 = addProperty1;
exports.addPropertyScalarNumber1 = addPropertyScalarNumber1;
exports.processNumberArrayOrMatrix = processNumberArrayOrMatrix;
exports.setNumberArrayNode = setNumberArrayNode;
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
        if (mid == undefined) {
            return;
        }
        console.log("mid=" + mid);
        let m = new xml_molecule_js_1.Molecule(new Map(), mid);
        m.setID(mid);
        molecules.set(mid, m);
        //m.label = mid;
        //addMolecule(m, molecules);
        m.setAtoms(new xml_molecule_js_1.AtomArray(new Map()));
        m.setBonds(new xml_molecule_js_1.BondArray(new Map()));
        let mDivID = mIDM.addID(xml_molecule_js_1.Molecule.tagName, mid);
        let mDiv = (0, html_js_1.createDiv)(mDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, app_js_1.s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, addMoleculeButton, mDiv, mid, app_js_1.boundary1, app_js_1.level1);
        // Add the molecule to the BathGas select elements.
        (0, app_js_1.addOptionByClassName)(xml_conditions_js_1.BathGas.tagName, mid);
        // Add Edit ID button.
        addEditIDButton(m, molecules, mcDiv.querySelector(html_js_1.s_button), mIDM, mDiv, app_js_1.level1);
        // Add description.
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, app_js_1.s_description), mIDM, m.getDescription.bind(m), m.setDescription.bind(m), app_js_1.boundary1, app_js_1.level1));
        // Add atomArray.
        let aaDivID = mIDM.addID(mDivID, xml_molecule_js_1.AtomArray.tagName);
        let aaDiv = (0, html_js_1.createDiv)(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, app_js_1.s_container);
        let aacDiv = (0, html_js_1.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, xml_molecule_js_1.AtomArray.tagName, app_js_1.boundary1, app_js_1.level1);
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, xml_molecule_js_1.Atom.tagName, app_js_1.boundary1, app_js_1.level1));
        // Add bondArray.
        let baDivID = mIDM.addID(mDivID, xml_molecule_js_1.BondArray.tagName);
        let baDiv = (0, html_js_1.createDiv)(baDivID);
        let bacDivID = mIDM.addID(baDivID, app_js_1.s_container);
        let bacDiv = (0, html_js_1.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, xml_molecule_js_1.BondArray.tagName, app_js_1.boundary1, app_js_1.level1);
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, xml_molecule_js_1.Bond.tagName, app_js_1.boundary1, app_js_1.level1));
        create3DViewer(mIDM, m, mDiv, app_js_1.boundary1, app_js_1.level1);
        // Add properties.
        let plDivID = mIDM.addID(mDivID, xml_molecule_js_1.PropertyList.tagName);
        let plDiv = (0, html_js_1.createDiv)(plDivID);
        let plcDivID = mIDM.addID(plDivID, app_js_1.s_container);
        let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, xml_molecule_js_1.PropertyList.tagName, app_js_1.boundary1, app_js_1.level1);
        let pl = m.getPropertyList();
        if (pl == undefined) {
            console.log("PropertyList is undefined for molecule " + m.getLabel());
            pl = new xml_molecule_js_1.PropertyList(new Map());
            m.setPropertyList(pl);
        }
        console.log("pl.index.size" + pl.index.size);
        initialiseProperties(true, m, mIDM, plDiv, pl);
        // Add me:EnergyTransferModel.
        let etmDivID = mIDM.addID(mDivID, xml_molecule_js_1.EnergyTransferModel.tagName);
        let etmDiv = (0, html_js_1.createDiv)(etmDivID);
        let etmcDivID = mIDM.addID(etmDivID, app_js_1.s_container);
        let etmcDiv = (0, html_js_1.getCollapsibleDiv)(etmcDivID, mDiv, null, etmDiv, xml_molecule_js_1.EnergyTransferModel.tagName, app_js_1.boundary1, app_js_1.level1);
        let etm = m.getEnergyTransferModel();
        if (etm == undefined) {
            etm = new xml_molecule_js_1.EnergyTransferModel(new Map());
            m.setEnergyTransferModel(etm);
        }
        console.log("etm.index.size" + etm.nodes.size);
        // Add an add me.deltaEDown button.
        let addDeltaEDownButton = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, (0, util_js_1.getID)(etmDivID, xml_molecule_js_1.DeltaEDown.tagName, app_js_1.s_Add_sy_add, html_js_1.s_button), app_js_1.level1);
        etmDiv.appendChild(addDeltaEDownButton);
        addDeltaEDownButton.addEventListener('click', () => {
            let value = app_js_1.big0;
            let ded = new xml_molecule_js_1.DeltaEDown(new Map(), value);
            let index = etm.addDeltaEDown(ded);
            let dedDivID = mIDM.addID(etmDivID, xml_molecule_js_1.DeltaEDown.tagName, etm.nodes.size);
            let dedDiv = (0, html_js_1.createFlexDiv)(dedDivID);
            etmDiv.insertBefore(dedDiv, addDeltaEDownButton);
            let lwi = (0, html_js_1.createLabelWithInput)(xml_molecule_js_1.DeltaEDown.tagName, dedDivID, app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                // Check the input is a number.
                if ((0, util_js_1.isNumeric)(target.value)) {
                    value = new big_js_1.default(target.value);
                    ded.setValue(value);
                }
                else {
                    // Reset.
                    alert("Input is not a number, resetting...");
                    target.value = ded.value.toString() ?? app_js_1.s_undefined;
                }
                (0, html_js_1.resizeInputElement)(target);
            }, ded.value.toString(), xml_molecule_js_1.DeltaEDown.tagName);
            dedDiv.appendChild(lwi);
            // Add a remove me.deltaEDown button.
            (0, app_js_1.addRemoveButton)(dedDiv, app_js_1.boundary1, () => {
                etm.removeDeltaEDown(index);
                etmDiv.removeChild(dedDiv);
            });
        });
        /*
        // Add me:DOSCMethod.
        let doscm: DOSCMethod | undefined = m.getDOSCMethod();
        if (doscm == undefined) {
            doscm = new DOSCMethod(new Map());
            m.setDOSCMethod(doscm);
        }
        mDiv.appendChild(
            createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                doscm.getXsiType(), mIDM.addID(mDivID, DOSCMethod.tagName), boundary1, level1));
        */
        /*
        addDOSCMethod(m, mIDM, plDiv, pl);
        // Add me:ExtraDOSCMethod
        addExtraDOSCMethod(m, mIDM, plDiv, pl);
        // Add me:Periodicity
        addPeriodicity(m, mIDM, plDiv, pl);
        // Add me:PotentialPoint
        addPotentialPoint(m, mIDM, plDiv, pl);
        // Add me:ReservoirSize
        addReservoirSize(m, mIDM, plDiv, pl);
        */
        // Add me:States
        let statesDivID = mIDM.addID(mDivID, xml_molecule_js_1.States.tagName);
        let statesDiv = (0, html_js_1.createDiv)(statesDivID);
        let statescDivID = mIDM.addID(statesDivID, app_js_1.s_container);
        let statescDiv = (0, html_js_1.getCollapsibleDiv)(statescDivID, mDiv, null, statesDiv, xml_molecule_js_1.States.tagName, app_js_1.boundary1, app_js_1.level1);
        let states = m.getStates();
        if (states == undefined) {
            states = new xml_molecule_js_1.States(new Map());
            m.setStates(states);
        }
        console.log("states.index.size" + states.nodes.size);
        // Add an add me:State button.
        addAddStateButton(mIDM, statesDiv, states, statesDivID, app_js_1.level1);
        // Add a remove molecule button.
        (0, app_js_1.addRemoveButton)(mDiv, app_js_1.level1, () => {
            removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m);
        });
    });
    return addMoleculeButton;
}
/**
 * Adds an add state button.
 * @param mIDM The IDManager for molecule divs.
 * @param statesDiv The States HTMLDivElement.
 * @param states The States.
 * @param statesDivID The States div ID.
 * @param margin The margin.
 */
function addAddStateButton(mIDM, statesDiv, states, statesDivID, margin) {
    let addStateButton = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, (0, util_js_1.getID)(statesDivID, xml_molecule_js_1.State.tagName, app_js_1.s_Add_sy_add, html_js_1.s_button), margin);
    statesDiv.appendChild(addStateButton);
    addStateButton.addEventListener('click', () => {
        let stateAttributes = new Map();
        stateAttributes.set(xml_molecule_js_1.State.s_energy, "0");
        stateAttributes.set(xml_molecule_js_1.State.s_degeneracy, "0");
        let stateId = states.getNextId();
        let state = new xml_molecule_js_1.State(stateAttributes, stateId);
        console.log("stateId=" + stateId);
        let index = states.addState(state);
        let stateDivID = mIDM.addID(statesDivID, xml_molecule_js_1.State.tagName, state.id);
        let stateDiv = (0, html_js_1.createFlexDiv)(stateDivID);
        statesDiv.insertBefore(stateDiv, addStateButton);
        // Add energy.
        let energyDivID = mIDM.addID(stateDivID, xml_molecule_js_1.State.s_energy);
        let energyDiv = (0, html_js_1.createFlexDiv)(energyDivID);
        stateDiv.appendChild(energyDiv);
        let energyValue = state.getEnergy();
        let elwi = (0, html_js_1.createLabelWithInput)(xml_molecule_js_1.State.s_energy, energyDivID, app_js_1.boundary1, app_js_1.level1, (event) => {
            let target = event.target;
            // Check the input is a number.
            if ((0, util_js_1.isNumeric)(target.value)) {
                energyValue = new big_js_1.default(target.value);
                state.setEnergy(energyValue);
            }
            else {
                // Reset.
                alert("Input is not a number, resetting...");
                target.value = energyValue.toString() ?? app_js_1.s_undefined;
            }
            (0, html_js_1.resizeInputElement)(target);
        }, energyValue.toString(), xml_molecule_js_1.State.s_energy);
        energyDiv.appendChild(elwi);
        // Add degeneracy.
        let degeneracyDivID = mIDM.addID(stateDivID, xml_molecule_js_1.State.s_degeneracy);
        let degeneracyDiv = (0, html_js_1.createFlexDiv)(degeneracyDivID);
        stateDiv.appendChild(degeneracyDiv);
        let degeneracyValue = state.getDegeneracy();
        let dlwi = (0, html_js_1.createLabelWithInput)(xml_molecule_js_1.State.s_degeneracy, degeneracyDivID, app_js_1.boundary1, app_js_1.boundary1, (event) => {
            let target = event.target;
            // Check the input is a number.
            if ((0, util_js_1.isNumeric)(target.value)) {
                degeneracyValue = new big_js_1.default(target.value);
                state.setDegeneracy(degeneracyValue);
            }
            else {
                // Reset.
                alert("Input is not a number, resetting...");
                target.value = degeneracyValue.toString() ?? app_js_1.s_undefined;
            }
            (0, html_js_1.resizeInputElement)(target);
        }, degeneracyValue.toString(), xml_molecule_js_1.State.s_degeneracy);
        degeneracyDiv.appendChild(dlwi);
        // Add a remove me:State button.
        (0, app_js_1.addRemoveButton)(stateDiv, app_js_1.boundary1, () => {
            states.removeState(index);
            statesDiv.removeChild(stateDiv);
        });
    });
}
/**
 * Initialises the properties for a molecule.
 * @param deslect If true the button is clicked and the property removed.
 * @param m The molecule.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 */
function initialiseProperties(deselect, m, mIDM, plDiv, pl) {
    // "me:ZPE", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.ZPE.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
    //console.log("pl.index.size" + pl.index.size);
    //console.log("Property " + m.getPropertyList()!.getProperty(ZPE.dictRef)?.toString);
    // "me:Hf0", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Hf0.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
    // "me:HfAT0", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.HfAT0.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
    // "me:Hf298", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Hf298.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
    // "me:rotConsts", array, Mesmer.frequencyUnits.
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.RotConsts.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
    // "me:symmetryNumber", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.SymmetryNumber.dictRef, undefined);
    // "me:TSOpticalSymmetryNumber", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef, undefined);
    // "me:frequenciesScaleFactor", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.FrequenciesScaleFactor.dictRef, undefined);
    // "me:vibFreqs", array, cm-1.
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.VibFreqs.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
    // "me:MW", scalar, amu.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.MW.dictRef, xml_mesmer_js_1.Mesmer.massUnits);
    // "me:spinMultiplicity", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.SpinMultiplicity.dictRef, undefined);
    // "me:epsilon", scalar, K (fixed).
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Epsilon.dictRef, xml_mesmer_js_1.Mesmer.temperatureUnits);
    // "me:sigma", scalar, Å (fixed).
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Sigma.dictRef, xml_mesmer_js_1.Mesmer.lengthUnits);
    // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
    addPropertyMatrix(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.Hessian.dictRef, xml_mesmer_js_1.Mesmer.hessianUnits);
    // "me:EinsteinAij", array, s-1 (fixed).
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.EinsteinAij.dictRef, xml_mesmer_js_1.Mesmer.EinsteinAUnits);
    // "me:EinsteinBij", array, m3/J/s2 (fixed).
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.EinsteinBij.dictRef, xml_mesmer_js_1.Mesmer.EinsteinBUnits);
    // "me:electronicExcitation">, scalar, cm-1.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.ElectronicExcitation.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
}
/**
 * @param deselect If true the button is clicked and the propert removed.
 * @param m The molecule.
 * @param mIDM The molecule IDManager.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 * @param dictRef The dictRef.
 * @param units The units.
 */
function addPropertyScalar(deselect, m, mIDM, plDiv, pl, dictRef, units) {
    let pAttributes;
    let psAttributes;
    let ps;
    let p;
    let div;
    pAttributes = new Map();
    pAttributes.set(xml_molecule_js_1.Property.s_dictRef, dictRef);
    psAttributes = new Map();
    if (units != undefined) {
        psAttributes.set(xml_molecule_js_1.PropertyScalarNumber.s_units, units[0]);
    }
    ps = new xml_molecule_js_1.PropertyScalarNumber(psAttributes, app_js_1.big0);
    p = new xml_molecule_js_1.Property(pAttributes, ps);
    m.getPropertyList().setProperty(p);
    console.log("pl.index.size" + pl.index.size);
    div = (0, app_js_1.processNumber)(plDiv.id, mIDM, dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
    (0, app_js_1.addAnyUnits)(units, psAttributes, div, div.querySelector(app_js_1.s_input), (0, app_js_1.addRID)(plDiv.id, dictRef, xml_molecule_js_1.PropertyScalarNumber.s_units), dictRef, app_js_1.boundary1, app_js_1.boundary1);
    plDiv.appendChild(div);
    // Deselect
    if (deselect) {
        let b = div.querySelector(html_js_1.s_button);
        b.click();
        pl.removeProperty(dictRef);
    }
    return div;
}
/**
 *
 * @param p The property.
 * @param ps The property scalar number.
 */
function setPropertyScalarNumber(dictRef, pl, ps, value) {
    if (pl.getProperty(dictRef) == undefined) {
        let pAttributes;
        let p;
        pAttributes = new Map();
        pAttributes.set(xml_molecule_js_1.Property.s_dictRef, dictRef);
        p = new xml_molecule_js_1.Property(pAttributes, ps);
        pl.setProperty(p);
        console.log("Set property " + dictRef);
    }
    else {
        console.log("Property " + dictRef + " already exists.");
    }
    //console.log("Value " + ps.getValue());
    ps.setValue.bind(ps)(value);
    if (dictRef == xml_molecule_js_1.ZPE.dictRef || dictRef == xml_molecule_js_1.Hf0.dictRef || dictRef == xml_molecule_js_1.HfAT0.dictRef || dictRef == xml_molecule_js_1.Hf298.dictRef) {
        (0, app_js_1.redrawReactionsDiagram)();
    }
    //console.log("Value " + ps.getValue());
}
/**
 * @param deselect If true the button is clicked and the propert removed.
 * @param m The molecule.
 * @param mIDM The molecule IDManager.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 * @param dictRef The dictRef.
 * @param units The units.
 */
function addPropertyArray(deselect, setSize, m, mIDM, plDiv, pl, dictRef, units) {
    let pAttributes;
    let paAttributes;
    let pa;
    let p;
    let div;
    pAttributes = new Map();
    pAttributes.set(xml_molecule_js_1.Property.s_dictRef, dictRef);
    paAttributes = new Map();
    if (units != undefined) {
        paAttributes.set(xml_molecule_js_1.PropertyScalarNumber.s_units, units[0]);
    }
    // Init values.
    let values = [];
    if (setSize) {
        setValues(dictRef, values);
    }
    pa = new xml_molecule_js_1.PropertyArray(paAttributes, values);
    p = new xml_molecule_js_1.Property(pAttributes, pa);
    m.getPropertyList().setProperty(p);
    console.log("pl.index.size" + pl.index.size);
    div = processNumberArrayOrMatrix(plDiv, mIDM, dictRef, pa, pa.getValues.bind(pa), (values) => setPropertyArrayOrMatrix(dictRef, pl, pa, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
    (0, app_js_1.addAnyUnits)(units, paAttributes, div, div.querySelector(app_js_1.s_input), (0, app_js_1.addRID)(plDiv.id, dictRef, xml_molecule_js_1.PropertyScalarNumber.s_units), dictRef, app_js_1.boundary1, app_js_1.boundary1);
    plDiv.appendChild(div);
    // Deselect
    if (deselect) {
        let b = div.querySelector(html_js_1.s_button);
        b.click();
        pl.removeProperty(dictRef);
    }
}
/**
 * Asks the user for the size and initialises values.
 * @param dictRef The dictRef.
 * @param values The values to be initialised.
 */
function setValues(dictRef, values) {
    let n = (0, app_js_1.getN)("Please enter the number of elements in the " + dictRef + " array");
    for (let i = 0; i < n; i++) {
        values.push(app_js_1.big0);
    }
}
/**
 *
 * @param p The property.
 * @param paom The property array.
 */
function setPropertyArrayOrMatrix(dictRef, pl, paom, values) {
    if (pl.getProperty(dictRef) == undefined) {
        let pAttributes;
        let p;
        pAttributes = new Map();
        pAttributes.set(xml_molecule_js_1.Property.s_dictRef, dictRef);
        p = new xml_molecule_js_1.Property(pAttributes, paom);
        //setValues(dictRef, values);
        pl.setProperty(p);
        console.log("Set property " + dictRef);
    }
    else {
        console.log("Property " + dictRef + " already exists.");
    }
    console.log("Value " + paom.getValues());
    paom.setValues.bind(paom)(values);
    console.log("Value " + paom.getValues());
}
/**
 * @param deselect If true the button is clicked and the propert removed.
 * @param m The molecule.
 * @param mIDM The molecule IDManager.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 * @param dictRef The dictRef.
 * @param units The units.
 */
function addPropertyMatrix(deselect, setSize, m, mIDM, plDiv, pl, dictRef, units) {
    let pAttributes;
    let pmAttributes;
    let pm;
    let p;
    let div;
    pAttributes = new Map();
    pAttributes.set(xml_molecule_js_1.Property.s_dictRef, dictRef);
    pmAttributes = new Map();
    if (units != undefined) {
        pmAttributes.set(xml_molecule_js_1.PropertyScalarNumber.s_units, units[0]);
    }
    // Init values.
    let values = [];
    if (setSize) {
        setValues(dictRef, values);
    }
    pm = new xml_molecule_js_1.PropertyMatrix(pmAttributes, values);
    p = new xml_molecule_js_1.Property(pAttributes, pm);
    m.getPropertyList().setProperty(p);
    console.log("pl.index.size" + pl.index.size);
    div = processNumberArrayOrMatrix(plDiv, mIDM, dictRef, pm, pm.getValues.bind(pm), (values) => setPropertyArrayOrMatrix(dictRef, pl, pm, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
    (0, app_js_1.addAnyUnits)(units, pmAttributes, div, div.querySelector(app_js_1.s_input), (0, app_js_1.addRID)(plDiv.id, dictRef, xml_molecule_js_1.PropertyScalarNumber.s_units), dictRef, app_js_1.boundary1, app_js_1.boundary1);
    plDiv.appendChild(div);
    // Deselect
    if (deselect) {
        let b = div.querySelector(html_js_1.s_button);
        b.click();
        pl.removeProperty(dictRef);
    }
}
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
        let selectDivID = mIDM.addID(xml_molecule_js_1.Molecule.tagName, "div");
        (0, app_js_1.remove)(selectDivID);
        let selectDiv = (0, html_js_1.createDiv)(selectDivID, app_js_1.level1);
        if (app_js_1.libmols == undefined) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        let options = Array.from((0, app_js_1.getMoleculeKeys)(app_js_1.libmols));
        if (options.length == 0) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        console.log("options.length=" + options.length);
        (0, app_js_1.addOrRemoveInstructions)(options, true);
        let selectID = mIDM.addID(selectDivID, html_js_1.s_select);
        (0, app_js_1.remove)(selectID);
        let select = (0, html_js_1.createSelectElement)(options, "Select molecule", app_js_1.s_selectOption, selectID, app_js_1.boundary1);
        select.classList.add(xml_molecule_js_1.Molecule.tagName);
        selectDiv.appendChild(select);
        mlDiv.insertBefore(selectDiv, amb);
        (0, app_js_1.selectAnotherOptionEventListener)(options, select);
        select.addEventListener('change', (event) => {
            let target = event.target;
            let selectedOption = target.options[target.selectedIndex];
            let label = selectedOption.value;
            let molecule = app_js_1.libmols.get(label);
            //let molecule: Molecule = getMolecule(label, libmols)!;
            let mid = molecule.getID();
            while (true) {
                mid = setMoleculeID(true, mid, molecule, molecules);
                if (mid != undefined) {
                    break;
                }
            }
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
            addEditIDButton(molecule, molecules, mcDiv.querySelector(html_js_1.s_button), mIDM, moleculeDiv, app_js_1.level1);
            // Description
            moleculeDiv.appendChild(processDescription(mIDM.addID(mDivID, app_js_1.s_description), mIDM, molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), app_js_1.boundary1, app_js_1.level1));
            // Create collapsible MetadataList HTMLDivElement.
            let mlistDivID = mIDM.addID(mDivID, xml_metadata_js_1.MetadataList.tagName);
            let mlistDiv = (0, html_js_1.createDiv)(mlistDivID, app_js_1.level1);
            //let mlistcDivID = mIDM.addID(mlistDivID, s_container);
            let mlistcDivID = (0, util_js_1.getID)(mlistDivID, app_js_1.s_container);
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
                    aaDiv.appendChild(addAtom(false, mIDM, molecule, aaDivID, aa, a, app_js_1.boundary1, app_js_1.level1));
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
                ba.bonds.forEach((b) => {
                    if (aa == undefined) {
                        throw new Error("Atoms are not defined for molecule " + molecule.getLabel());
                    }
                    baDiv.appendChild(addBond(false, mIDM, molecule, baDivID, aa.atoms, ba, b, app_js_1.boundary1, app_js_1.level1));
                });
            }
            baDiv.appendChild(getAddBondButton(mIDM, molecule, baDiv, xml_molecule_js_1.Bond.tagName, app_js_1.boundary1, app_js_1.level1));
            create3DViewer(mIDM, molecule, moleculeDiv, app_js_1.boundary1, app_js_1.level1);
            // Create collapsible Properties HTMLDivElement.
            let plDivID = mIDM.addID(mDivID, xml_molecule_js_1.PropertyList.tagName);
            let plDiv = (0, html_js_1.createDiv)(plDivID);
            let plcDivID = mIDM.addID(plDivID, app_js_1.s_container);
            let plcDiv = (0, html_js_1.getCollapsibleDiv)(plcDivID, moleculeDiv, null, plDiv, xml_molecule_js_1.PropertyList.tagName, app_js_1.boundary1, app_js_1.level1);
            let pl = molecule.getPropertyList();
            let properties = pl.getProperties();
            //console.log("properties.size=" + properties.size);
            let dictRefs = new Set(properties.keys());
            //console.log("Molecule " + molecule.getDescription());
            let pID;
            let deselect = true;
            // "me:ZPE", scalar, Mesmer.energyUnits.
            if (!dictRefs.has(xml_molecule_js_1.ZPE.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.ZPE.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.ZPE.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.ZPE.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.energyUnits, ps.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:Hf0", scalar, Mesmer.energyUnits.
            if (!dictRefs.has(xml_molecule_js_1.Hf0.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.Hf0.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Hf0.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.Hf0.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.energyUnits, ps.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:HfAT0", scalar, Mesmer.energyUnits.
            if (!dictRefs.has(xml_molecule_js_1.HfAT0.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.HfAT0.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.HfAT0.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.HfAT0.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.energyUnits, ps.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:Hf298", scalar, Mesmer.energyUnits.
            if (!dictRefs.has(xml_molecule_js_1.Hf298.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.Hf298.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Hf298.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.Hf298.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.energyUnits, ps.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:rotConsts", array, Mesmer.frequencyUnits.
            if (!dictRefs.has(xml_molecule_js_1.RotConsts.dictRef)) {
                addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, xml_molecule_js_1.RotConsts.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.RotConsts.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.RotConsts.dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.frequencyUnits, pa.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:symmetryNumber", scalar, No units.
            if (!dictRefs.has(xml_molecule_js_1.SymmetryNumber.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.SymmetryNumber.dictRef, undefined);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.SymmetryNumber.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.SymmetryNumber.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                plDiv.appendChild(div);
            }
            // "me:TSOpticalSymmetryNumber", scalar, No units.
            if (!dictRefs.has(xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef, undefined);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                plDiv.appendChild(div);
            }
            // "me:frequenciesScaleFactor", scalar, No units.
            if (!dictRefs.has(xml_molecule_js_1.FrequenciesScaleFactor.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.FrequenciesScaleFactor.dictRef, undefined);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.FrequenciesScaleFactor.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.FrequenciesScaleFactor.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                plDiv.appendChild(div);
            }
            // "me:vibFreqs", array, cm-1.
            if (!dictRefs.has(xml_molecule_js_1.VibFreqs.dictRef)) {
                addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, xml_molecule_js_1.VibFreqs.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.VibFreqs.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.VibFreqs.dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.frequencyUnits, pa.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:MW", scalar, amu.
            if (!dictRefs.has(xml_molecule_js_1.MW.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.MW.dictRef, xml_mesmer_js_1.Mesmer.massUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.MW.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.MW.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.massUnits, ps.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:spinMultiplicity", scalar, No units.
            if (!dictRefs.has(xml_molecule_js_1.SpinMultiplicity.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.SpinMultiplicity.dictRef, undefined);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.SpinMultiplicity.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.SpinMultiplicity.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                plDiv.appendChild(div);
            }
            // "me:epsilon", scalar, K (fixed).
            if (!dictRefs.has(xml_molecule_js_1.Epsilon.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.Epsilon.dictRef, xml_mesmer_js_1.Mesmer.temperatureUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Epsilon.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.Epsilon.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                plDiv.appendChild(div);
            }
            // "me:sigma", scalar, Å (fixed).
            if (!dictRefs.has(xml_molecule_js_1.Sigma.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.Sigma.dictRef, xml_mesmer_js_1.Mesmer.lengthUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Sigma.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.Sigma.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                plDiv.appendChild(div);
            }
            // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
            if (!dictRefs.has(xml_molecule_js_1.Hessian.dictRef)) {
                addPropertyMatrix(deselect, false, molecule, mIDM, plDiv, pl, xml_molecule_js_1.Hessian.dictRef, xml_mesmer_js_1.Mesmer.hessianUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Hessian.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.Hessian.dictRef);
                let pm = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pm, pm.getValues.bind(pm), (values) => setPropertyArrayOrMatrix(p.dictRef, pl, pm, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.hessianUnits, pm.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:EinsteinAij", array, s-1 (fixed).
            if (!dictRefs.has(xml_molecule_js_1.EinsteinAij.dictRef)) {
                addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, xml_molecule_js_1.EinsteinAij.dictRef, xml_mesmer_js_1.Mesmer.EinsteinAUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.EinsteinAij.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.EinsteinAij.dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.EinsteinAUnits, pa.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:EinsteinBij", array, m3/J/s2 (fixed).
            if (!dictRefs.has(xml_molecule_js_1.EinsteinBij.dictRef)) {
                addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, xml_molecule_js_1.EinsteinBij.dictRef, xml_mesmer_js_1.Mesmer.EinsteinBUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.EinsteinBij.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.EinsteinBij.dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.EinsteinBUnits, pa.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            // "me:ElectronicExcitation", scalar, cm-1.
            if (!dictRefs.has(xml_molecule_js_1.ElectronicExcitation.dictRef)) {
                addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, xml_molecule_js_1.ElectronicExcitation.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
            }
            else {
                pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.ElectronicExcitation.dictRef);
                let p = pl.getProperty(xml_molecule_js_1.ElectronicExcitation.dictRef);
                let ps = p.getProperty();
                let div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
                (0, app_js_1.addAnyUnits)(xml_mesmer_js_1.Mesmer.frequencyUnits, ps.attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, app_js_1.boundary1, app_js_1.boundary1);
                plDiv.appendChild(div);
            }
            /*
            // Add me:DOSCMethod.
            let doscm: DOSCMethod | undefined = molecule.getDOSCMethod();
            if (doscm == undefined) {
                doscm = new DOSCMethod(new Map());
                molecule.setDOSCMethod(doscm);
            }
            moleculeDiv.appendChild(
                createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                doscm.getXsiType(), mIDM.addID(mDivID, DOSCMethod.tagName), boundary1, level1));
            */
            // Organise States.
            let ssDivID = mIDM.addID(mDivID, xml_molecule_js_1.State.tagName);
            let ssDiv = (0, html_js_1.createDiv)(ssDivID);
            let sscDivID = mIDM.addID(ssDivID, app_js_1.s_container);
            let sscDiv = (0, html_js_1.getCollapsibleDiv)(sscDivID, moleculeDiv, null, ssDiv, xml_molecule_js_1.States.tagName, app_js_1.boundary1, app_js_1.level1);
            // Add states.
            let states = molecule.getStates();
            if (states != undefined) {
                states.getStates().forEach((s) => {
                    console.log(s.toString());
                    // Add state.
                    let sDivID = (0, util_js_1.getID)(ssDivID, xml_molecule_js_1.State.tagName, s.id);
                    let sDiv = (0, html_js_1.createFlexDiv)(sDivID);
                    ssDiv.appendChild(sDiv);
                    // Add energy.
                    let energyDivID = mIDM.addID(sDivID, xml_molecule_js_1.State.s_energy);
                    let energy = s.getEnergy();
                    let elwi = (0, html_js_1.createLabelWithInput)(xml_molecule_js_1.State.s_energy, energyDivID, app_js_1.boundary1, app_js_1.level1, (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, util_js_1.isNumeric)(target.value)) {
                            energy = new big_js_1.default(target.value);
                            s.setEnergy(energy);
                        }
                        else {
                            // Reset.
                            alert("Input is not a number, resetting...");
                            target.value = energy.toString() ?? app_js_1.s_undefined;
                        }
                        (0, html_js_1.resizeInputElement)(target);
                    }, energy.toString(), xml_molecule_js_1.State.s_energy);
                    sDiv.appendChild(elwi);
                    // Add degeneracy.
                    let degeneracyDivID = mIDM.addID(sDivID, xml_molecule_js_1.State.s_degeneracy);
                    let degeneracy = s.getDegeneracy();
                    let dlwi = (0, html_js_1.createLabelWithInput)(xml_molecule_js_1.State.s_degeneracy, degeneracyDivID, app_js_1.boundary1, app_js_1.boundary1, (event) => {
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, util_js_1.isNumeric)(target.value)) {
                            degeneracy = new big_js_1.default(target.value);
                            s.setDegeneracy(degeneracy);
                        }
                        else {
                            // Reset.
                            alert("Input is not a number, resetting...");
                            target.value = degeneracy.toString() ?? app_js_1.s_undefined;
                        }
                        (0, html_js_1.resizeInputElement)(target);
                    }, degeneracy.toString(), xml_molecule_js_1.State.s_degeneracy);
                    sDiv.appendChild(dlwi);
                    // Add a remove state button.
                    (0, app_js_1.addRemoveButton)(sDiv, app_js_1.boundary1, () => {
                        states.removeState(s.id);
                        sDiv.remove();
                    });
                    /*
                    // Add a move up button.
                    sDiv.appendChild(getMoveUpButton(mIDM, molecule, ssDiv, State.tagName, sDiv, s));
                    // Add a move down button.
                    sDiv.appendChild(getMoveDownButton(mIDM, molecule, ssDiv, State.tagName, sDiv, s));
                    */
                });
            }
            // Add an add state button.
            //ssDiv.appendChild(getAddStateButton(mIDM, molecule, ssDiv, State.tagName, boundary1, level1));
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
/**
 * For setting the molecule ID.
 *
 * @param ask If true, the user is prompted to enter the molecule ID. If false, the molecule ID is set to the mid parameter
 * which must not be undefined.
 * @param mid The initial molecule ID before checks.
 * @param molecule The molecule to set the ID for.
 * @param molecules The molecules map.
 * @returns The molecule ID set.
 */
function setMoleculeID(ask, mid, molecule, molecules) {
    let mid2;
    while (true) {
        // Ask the user to specify the molecule ID.
        if (ask) {
            mid2 = prompt("Please enter a name for the molecule", mid);
        }
        else {
            mid2 = mid;
        }
        if (mid2 == null) {
            //alert("The molecule ID cannot be null.");
            return undefined;
        }
        else if (mid2 == "") {
            alert("The molecule ID cannot be empty.");
        }
        else if (molecules.has(mid2)) {
            //if (mid == mid2) {
            //    if (molecule != undefined) {
            //        molecule.setID(mid);
            //        molecules.set(mid, molecule);
            //    }
            //    return mid;
            //} else {
            alert("The molecule ID " + mid2 + " is already in use.");
            ask = true;
            //}
        }
        else {
            mid = mid2;
            if (molecule != undefined) {
                molecule.setID(mid);
                molecules.set(mid, molecule);
            }
            return mid;
        }
    }
}
/**
 * Adds a button to edit the molecule ID.
 * @param molecule The molecule.
 * @param molecules The molecules map.
 * @param button The button to add the event listener to.
 * @param mDiv
 * @param level
 */
function addEditIDButton(molecule, molecules, button, mIDM, mDiv, level) {
    let s_editName = app_js_1.sy_edit + " Edit id";
    let editNameButtonID = mIDM.addID(mDiv.id, s_editName, html_js_1.s_button);
    let editNameButton = (0, html_js_1.createButton)(s_editName, editNameButtonID, level);
    mDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', () => {
        let mid = molecule.getID();
        // Update the BathGas select elements.
        (0, app_js_1.removeOptionByClassName)(xml_conditions_js_1.BathGas.tagName, molecule.getID());
        molecules.delete(mid);
        while (true) {
            mid = setMoleculeID(true, mid, molecule, molecules);
            if (mid != undefined) {
                break;
            }
        }
        // Update the BathGas select elements.
        (0, app_js_1.addOptionByClassName)(xml_conditions_js_1.BathGas.tagName, mid);
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
 * @param margin The margin.
 */
function addDescription(div, id, value, setter, margin) {
    let valueString;
    if (value == undefined) {
        valueString = "";
    }
    else {
        valueString = value;
    }
    let input = (0, html_js_1.createInput)("text", id, margin);
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
        aaDiv.insertBefore(addAtom(true, mIDM, molecule, aaDiv.id, molecule.getAtoms(), a, boundary, level), button);
    });
    return button;
}
/**
 * Adds metadata.
 * @param m The molecule.
 * @param md The metadata.
 * @param ml The metadata list.
 * @param mdDivID The metadata div id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The metadata div.
 */
function addMetadata(m, md, ml, mdDivID, boundary, level) {
    ml.addMetadata(md);
    let mdDiv = (0, html_js_1.createFlexDiv)(mdDivID, level);
    mdDiv.appendChild((0, html_js_1.createLabel)(m.getLabel(), boundary));
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
function addAtom(addToArray, mIDM, molecule, aaDivID, aa, a, boundary, level) {
    let aID;
    if (addToArray) {
        aID = aa.addAtom(a, a.getID());
    }
    else {
        aID = a.getID();
    }
    //let aDivID: string = mIDM.addID(aaDivID, aID);
    let aDivID = (0, util_js_1.getID)(aaDivID, aID);
    let aDiv = (0, html_js_1.createFlexDiv)(aDivID, level);
    aDiv.appendChild((0, html_js_1.createLabel)(aID, boundary));
    // elementType.
    processElementType(mIDM, a, aDiv, true, boundary);
    // Coordinates.
    processCoordinates(mIDM, a, aDiv, boundary, boundary);
    (0, app_js_1.addRemoveButton)(aDiv, boundary, removeAtom, molecule, aID, mIDM);
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
function processElementType(mIDM, a, aDiv, first, margin) {
    let elementType = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = xml_mesmer_js_1.Mesmer.elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = app_js_1.s_selectOption;
        (0, app_js_1.addOrRemoveInstructions)(selectTypes, first);
        //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    //let id = mIDM.addID(aDiv.id, Atom.s_elementType);
    let id = (0, util_js_1.getID)(aDiv.id, xml_molecule_js_1.Atom.s_elementType);
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
 * @param aIDs The atom ids.
 * @param marginComponent The margin for the components.
 * @param margin The margin.
 */
function processCoordinates(mIDM, a, aDiv, marginComponent, margin) {
    let id;
    //id = mIDM.addID(aDiv.id, Atom.s_x3);
    id = (0, util_js_1.getID)(aDiv.id, xml_molecule_js_1.Atom.s_x3);
    aDiv.appendChild((0, app_js_1.processNumber)(id, mIDM, xml_molecule_js_1.Atom.s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    //id = mIDM.addID(aDiv.id, Atom.s_y3);
    id = (0, util_js_1.getID)(aDiv.id, xml_molecule_js_1.Atom.s_y3);
    aDiv.appendChild((0, app_js_1.processNumber)(id, mIDM, xml_molecule_js_1.Atom.s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    //id = mIDM.addID(aDiv.id, Atom.s_z3);
    id = (0, util_js_1.getID)(aDiv.id, xml_molecule_js_1.Atom.s_z3);
    aDiv.appendChild((0, app_js_1.processNumber)(id, mIDM, xml_molecule_js_1.Atom.s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
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
        baDiv.insertBefore(addBond(true, mIDM, molecule, baDiv.id, atoms, molecule.getBonds(), b, boundary, level), button);
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
function addBond(addToArray, mIDM, molecule, baDivID, atoms, ba, b, boundary, level) {
    let bID;
    if (addToArray) {
        bID = ba.addBond(b, b.getID());
    }
    else {
        bID = b.getID();
    }
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
    //let id = mIDM.addID(bDiv.id, Bond.s_atomRefs2);
    let id = (0, util_js_1.getID)(bDiv.id, xml_molecule_js_1.Bond.s_atomRefs2);
    //bIDs.add(id);
    let atomRefs2 = bond.getAtomRefs2();
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    //let alwsID: string = mIDM.addID(id, 0);
    let alwsID = (0, util_js_1.getID)(id, 0);
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
    //let blwsID: string = mIDM.addID(id, 1);
    let blwsID = (0, util_js_1.getID)(id, 1);
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
    //let id = mIDM.addID(bondDiv.id, Bond.s_order);
    let id = (0, util_js_1.getID)(bondDiv.id, xml_molecule_js_1.Bond.s_order);
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
        (0, app_js_1.addMolecule)(false, m, molecules);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, app_js_1.s_container);
        let mcDiv = (0, html_js_1.getCollapsibleDiv)(mcDivID, mlDiv, null, mDiv, m.getLabel(), app_js_1.boundary1, app_js_1.level1);
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
        addEditIDButton(m, molecules, mcDiv.querySelector(html_js_1.s_button), mIDM, mDiv, app_js_1.level1);
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
            aaDiv.appendChild(addAtom(true, mIDM, m, aaDivID, aa, new xml_molecule_js_1.Atom((0, xml_js_1.getAttributes)(xml_as[j]), m), app_js_1.boundary1, app_js_1.level1));
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
                baDiv.appendChild(addBond(true, mIDM, m, baDivID, m.getAtoms().atoms, ba, new xml_molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m), app_js_1.boundary1, app_js_1.level1));
            }
        }
        // Load those bonds that do not have an id attribute.
        for (let j = 0; j < xml_bs.length; j++) {
            let b_attributes = (0, xml_js_1.getAttributes)(xml_bs[j]);
            if (!b_attributes.has(xml_molecule_js_1.Bond.s_id)) {
                baDiv.appendChild(addBond(true, mIDM, m, baDivID, m.getAtoms().atoms, ba, new xml_molecule_js_1.Bond((0, xml_js_1.getAttributes)(xml_bs[j]), m), app_js_1.boundary1, app_js_1.level1));
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
        // Properties may be in a PropertyList or not.
        if (xml_pls.length > 1) {
            console.warn("Expecting 1 or 0 " + xml_molecule_js_1.PropertyList.tagName + " but finding " + xml_pls.length + ". Loading the first of these...");
        }
        let dictRefs = new Set();
        let dictRefMap = new Map();
        let pl;
        let xml_ps;
        if (xml_pls.length > 0) {
            pl = new xml_molecule_js_1.PropertyList((0, xml_js_1.getAttributes)(xml_pls[0]));
            xml_ps = xml_pls[0].getElementsByTagName(xml_molecule_js_1.Property.tagName);
            // Init dictRefs
            for (let j = 0; j < xml_ps.length; j++) {
                let p = new xml_molecule_js_1.Property((0, xml_js_1.getAttributes)(xml_ps[j]));
                dictRefs.add(p.dictRef);
                dictRefMap.set(p.dictRef, j);
            }
        }
        else {
            pl = new xml_molecule_js_1.PropertyList(new Map());
        }
        m.setPropertyList(pl);
        moleculeTagNames.delete(xml_molecule_js_1.PropertyList.tagName);
        let pID;
        let deselect = false;
        // "me:ZPE", scalar, Mesmer.energyUnits.
        if (!dictRefs.has(xml_molecule_js_1.ZPE.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.ZPE.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.ZPE.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.ZPE.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            // Get button from div and click
            //let button: HTMLButtonElement = plDiv.querySelector(s_button) as HTMLButtonElement;
            //button.click();
            /*
            let p: Property = pl.getProperty(ZPE.dictRef) as Property;
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:Hf0", scalar, Mesmer.energyUnits.
        if (!dictRefs.has(xml_molecule_js_1.Hf0.dictRef)) {
            let div = addPropertyScalar(true, m, mIDM, plDiv, pl, xml_molecule_js_1.Hf0.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
            // Click the button.
            //let b: HTMLButtonElement = div.querySelector(s_button)!;
            //b!.click();
            //pl.removeProperty(SpinMultiplicity.dictRef);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Hf0.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.Hf0.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let p: Property = pl.getProperty(Hf0.dictRef) as Property;
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:HfAT0", scalar, Mesmer.energyUnits.
        if (!dictRefs.has(xml_molecule_js_1.HfAT0.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.HfAT0.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.HfAT0.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.HfAT0.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:Hf298", scalar, Mesmer.energyUnits.
        if (!dictRefs.has(xml_molecule_js_1.Hf298.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Hf298.dictRef, xml_mesmer_js_1.Mesmer.energyUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Hf298.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.Hf298.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:rotConsts", array, Mesmer.frequencyUnits.
        if (!dictRefs.has(xml_molecule_js_1.RotConsts.dictRef)) {
            addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.RotConsts.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.RotConsts.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.RotConsts.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.frequencyUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:symmetryNumber", scalar, No units.
        if (!dictRefs.has(xml_molecule_js_1.SymmetryNumber.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.SymmetryNumber.dictRef, undefined);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.SymmetryNumber.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.SymmetryNumber.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */
        }
        // "me:TSOpticalSymmetryNumber", scalar, No units.
        if (!dictRefs.has(xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef, undefined);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */
        }
        // "me:frequenciesScaleFactor", scalar, No units.
        if (!dictRefs.has(xml_molecule_js_1.FrequenciesScaleFactor.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.FrequenciesScaleFactor.dictRef, undefined);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.FrequenciesScaleFactor.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.FrequenciesScaleFactor.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */
        }
        // "me:vibFreqs", array, cm-1.
        if (!dictRefs.has(xml_molecule_js_1.VibFreqs.dictRef)) {
            addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.VibFreqs.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.VibFreqs.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.VibFreqs.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.frequencyUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:MW", scalar, amu.
        if (!dictRefs.has(xml_molecule_js_1.MW.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.MW.dictRef, xml_mesmer_js_1.Mesmer.massUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.MW.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.MW.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.massUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:spinMultiplicity", scalar, No units.
        if (!dictRefs.has(xml_molecule_js_1.SpinMultiplicity.dictRef)) {
            let div = addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.SpinMultiplicity.dictRef, undefined);
            // Click the button.
            let b = div.querySelector(html_js_1.s_button);
            b.click();
            pl.removeProperty(xml_molecule_js_1.SpinMultiplicity.dictRef);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.SpinMultiplicity.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.SpinMultiplicity.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */
        }
        // "me:epsilon", scalar, K (fixed).
        if (!dictRefs.has(xml_molecule_js_1.Epsilon.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Epsilon.dictRef, xml_mesmer_js_1.Mesmer.temperatureUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Epsilon.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.Epsilon.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */
        }
        // "me:sigma", scalar, Å (fixed).
        if (!dictRefs.has(xml_molecule_js_1.Sigma.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.Sigma.dictRef, xml_mesmer_js_1.Mesmer.lengthUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Sigma.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.Sigma.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */
        }
        // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
        if (!dictRefs.has(xml_molecule_js_1.Hessian.dictRef)) {
            addPropertyMatrix(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.Hessian.dictRef, xml_mesmer_js_1.Mesmer.hessianUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.Hessian.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.Hessian.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let pm: PropertyMatrix = p.getProperty() as PropertyMatrix;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pm, pm.getValues.bind(pm),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pm, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.hessianUnits, pm.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:EinsteinAij", array, s-1 (fixed).
        if (!dictRefs.has(xml_molecule_js_1.EinsteinAij.dictRef)) {
            addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.EinsteinAij.dictRef, xml_mesmer_js_1.Mesmer.EinsteinAUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.EinsteinAij.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.EinsteinAij.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.EinsteinAUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:EinsteinBij", array, m3/J/s2 (fixed).
        if (!dictRefs.has(xml_molecule_js_1.EinsteinBij.dictRef)) {
            addPropertyArray(deselect, false, m, mIDM, plDiv, pl, xml_molecule_js_1.EinsteinBij.dictRef, xml_mesmer_js_1.Mesmer.EinsteinBUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.EinsteinBij.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.EinsteinBij.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.EinsteinBUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        // "me:electronicExcitation", scalar, cm-1.
        if (!dictRefs.has(xml_molecule_js_1.ElectronicExcitation.dictRef)) {
            addPropertyScalar(deselect, m, mIDM, plDiv, pl, xml_molecule_js_1.ElectronicExcitation.dictRef, xml_mesmer_js_1.Mesmer.frequencyUnits);
        }
        else {
            pID = (0, util_js_1.getID)(plDiv.id, xml_molecule_js_1.ElectronicExcitation.dictRef);
            let j = dictRefMap.get(xml_molecule_js_1.ElectronicExcitation.dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, app_js_1.boundary1, app_js_1.level1);
            /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.frequencyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */
        }
        moleculeTagNames.delete(xml_molecule_js_1.PropertyList.tagName);
        moleculeTagNames.delete(xml_molecule_js_1.Property.tagName);
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
                (0, html_js_1.addTableHeaderRow)(t, xml_molecule_js_1.DensityOfStates.header);
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
                (0, html_js_1.addTableHeaderRow)(t, tt.getHeader());
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
        // Organise States.
        let xml_states = xml_ms[i].getElementsByTagName(xml_molecule_js_1.States.tagName);
        let ssDivID = mIDM.addID(mDivID, xml_molecule_js_1.State.tagName);
        let ssDiv = (0, html_js_1.createDiv)(ssDivID);
        let sscDivID = mIDM.addID(ssDivID, app_js_1.s_container);
        let sscDiv = (0, html_js_1.getCollapsibleDiv)(sscDivID, mDiv, null, ssDiv, xml_molecule_js_1.States.tagName, app_js_1.boundary1, app_js_1.level1);
        if (xml_states.length > 0) {
            if (xml_states.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_js_1.States.tagName + " but finding " + xml_states.length + "!");
            }
            let ss = new xml_molecule_js_1.States((0, xml_js_1.getAttributes)(xml_states[0]));
            //let state: State[] = [];
            let xml_ss = xml_states[0].getElementsByTagName(xml_molecule_js_1.State.tagName);
            for (let j = 0; j < xml_ss.length; j++) {
                let s = new xml_molecule_js_1.State((0, xml_js_1.getAttributes)(xml_ss[j]), j);
                //state.push(s);
                ss.addState(s);
                //let sDivID = mIDM.addID(ssDivID, State.tagName, j);
                //let sDiv: HTMLDivElement = createDiv(sDivID, level1);
                //ssDiv.appendChild(sDiv);
            }
            m.setStates(ss);
            moleculeTagNames.delete(xml_molecule_js_1.State.tagName);
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
function createPropertyAndDiv(pl, xml, plDiv, molecule, mIDM, boundary, level) {
    let p = new xml_molecule_js_1.Property((0, xml_js_1.getAttributes)(xml));
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == xml_molecule_js_1.ZPE.dictRef) {
        // "me:ZPE", scalar, Mesmer.energyUnits.
        processProperty(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Hf0.dictRef) {
        // "me:Hf0", scalar, Mesmer.energyUnits.
        processProperty(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.HfAT0.dictRef) {
        // "me:HfAT0", scalar, Mesmer.energyUnits.
        processProperty(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Hf298.dictRef) {
        // "me:Hf298", scalar, Mesmer.energyUnits.
        processProperty(pl, p, xml_mesmer_js_1.Mesmer.energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.RotConsts.dictRef) {
        // "me:rotConsts", array, Mesmer.frequencyUnits.
        processProperty(pl, p, xml_mesmer_js_1.Mesmer.frequencyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.SymmetryNumber.dictRef) {
        // "me:symmetryNumber", scalar, No units.
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.TSOpticalSymmetryNumber.dictRef) {
        // "me:TSOpticalSymmetryNumber", scalar, No units.
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.FrequenciesScaleFactor.dictRef) {
        // "me:frequenciesScaleFactor", scalar, No units.
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.VibFreqs.dictRef) {
        // "me:vibFreqs", array, cm-1.
        processProperty(pl, p, xml_mesmer_js_1.Mesmer.frequencyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.MW.dictRef) {
        // "me:MW", scalar, amu.
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.SpinMultiplicity.dictRef) {
        // "me:spinMultiplicity", scalar, No units.
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Epsilon.dictRef) {
        // "me:epsilon", scalar, K (fixed).
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Sigma.dictRef) {
        // "me:sigma", scalar, Å (fixed).
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.Hessian.dictRef) {
        // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.EinsteinAij.dictRef) {
        // "me:EinsteinAij", array, s-1 (fixed).
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else if (p.dictRef == xml_molecule_js_1.EinsteinBij.dictRef) {
        // "me:EinsteinBij", array, m3/J/s2 (fixed).
        processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    }
    else {
        processPropertyString(pl, p, molecule, xml, plDiv, boundary, level);
    }
    pl.setProperty(p);
    return p;
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
function processProperty(pl, p, units, molecule, mIDM, element, plDiv, boundary, level) {
    let pID = mIDM.addID((0, util_js_1.getID)(plDiv.id, p.dictRef));
    let div;
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName(xml_molecule_js_1.PropertyScalarNumber.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + xml_molecule_js_1.PropertyScalarNumber.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString = (0, xml_js_1.getInputString)(scalarNodes[0]);
        let value = new big_js_1.default(inputString);
        let psAttributes = (0, xml_js_1.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new xml_molecule_js_1.PropertyScalarNumber(psAttributes, value);
        p.setProperty(ps);
        ps.setValue = function (value) {
            ps.value = value;
            if (p.dictRef == xml_molecule_js_1.ZPE.dictRef || p.dictRef == xml_molecule_js_1.Hf0.dictRef || p.dictRef == xml_molecule_js_1.HfAT0.dictRef || p.dictRef == xml_molecule_js_1.Hf298.dictRef) {
                // Update the molecule energy diagram.
                (0, app_js_1.redrawReactionsDiagram)();
            }
        }.bind(ps);
        div = (0, app_js_1.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
        (0, app_js_1.addAnyUnits)(units, psAttributes, div, div.querySelector(app_js_1.s_input), mIDM.addID(pID, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, boundary, boundary);
        plDiv.appendChild(div);
        // click
        //let button: HTMLButtonElement = div.querySelector('button') as HTMLButtonElement;
        //button.click();
    }
    else {
        // PropertyArray.
        let arrayNodes = element.getElementsByTagName(xml_molecule_js_1.PropertyArray.tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) {
                throw new Error("Expecting 1 " + xml_molecule_js_1.PropertyArray.tagName + " but finding " + arrayNodes.length + "!");
            }
            let inputString = (0, xml_js_1.getInputString)(arrayNodes[0]);
            if (inputString == "") {
                console.warn("inputString is empty setting to 0!");
                inputString = "0";
            }
            let values = (0, util_js_1.toNumberArray)(inputString.split(/\s+/));
            let paAttributes = (0, xml_js_1.getAttributes)(arrayNodes[0]);
            let pa = new xml_molecule_js_1.PropertyArray(paAttributes, values);
            p.setProperty(pa);
            div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), pa.setValues, () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
            (0, app_js_1.addAnyUnits)(units, paAttributes, div, div.querySelector(app_js_1.s_textarea), mIDM.addID(pID, xml_molecule_js_1.PropertyArray.s_units), p.dictRef, boundary, boundary);
            plDiv.appendChild(div);
        }
        else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName(xml_molecule_js_1.PropertyMatrix.tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) {
                    throw new Error("Expecting 1 " + xml_molecule_js_1.PropertyMatrix.tagName + " but finding " + matrixNodes.length + "!");
                }
                //addPropertyMatrix(false, molecule, mIDM, plDiv, pl, p.dictRef, units);
                let inputString = (0, xml_js_1.getInputString)(matrixNodes[0]);
                let values = (0, util_js_1.toNumberArray)(inputString.split(/\s+/));
                let pmAttributes = (0, xml_js_1.getAttributes)(matrixNodes[0]);
                let pm = new xml_molecule_js_1.PropertyMatrix(pmAttributes, values);
                p.setProperty(pm);
                let label = p.dictRef;
                // Create a new div element for the input.
                let inputDiv = (0, html_js_1.createLabelWithTextArea)(pID, boundary, level, (event) => {
                    let target = event.target;
                    setNumberArrayNode(false, p.dictRef, pm, target);
                }, inputString, label);
                let ta = inputDiv.querySelector('textarea');
                ta.value = inputString;
                (0, html_js_1.resizeTextAreaElement)(ta);
                ta.addEventListener('change', (event) => {
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, util_js_1.toNumberArray)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + inputString);
                    //resizeInputElement(inputElement);
                    (0, html_js_1.resizeTextAreaElement)(ta);
                });
                (0, app_js_1.addAnyUnits)(units, pmAttributes, inputDiv, ta, mIDM.addID(pID, xml_molecule_js_1.PropertyArray.s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            }
            else {
                throw new Error("Expecting " + xml_molecule_js_1.PropertyScalarNumber.tagName + ", " + xml_molecule_js_1.PropertyArray.tagName + " or "
                    + xml_molecule_js_1.PropertyMatrix.tagName + " but finding none!");
            }
        }
    }
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
function processPropertyString(pl, p, molecule, element, plDiv, boundary, level) {
    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs = new Set();
    // PropertyScalarString.
    let scalarNodes = element.getElementsByTagName(xml_molecule_js_1.PropertyScalarString.tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) {
            throw new Error("Expecting 1 " + xml_molecule_js_1.PropertyScalarString.tagName + " but finding " + scalarNodes.length + "!");
        }
        let inputString = (0, xml_js_1.getInputString)(scalarNodes[0]);
        let psAttributes = (0, xml_js_1.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new xml_molecule_js_1.PropertyScalarString(psAttributes, inputString);
        p.setProperty(ps);
        ps.setValue = function (value) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + value);
            if (p.dictRef == xml_molecule_js_1.ZPE.dictRef || p.dictRef == xml_molecule_js_1.Hf0.dictRef || p.dictRef == xml_molecule_js_1.HfAT0.dictRef || p.dictRef == xml_molecule_js_1.Hf298.dictRef) {
                // Update the molecule energy diagram.
                (0, app_js_1.redrawReactionsDiagram)();
            }
        }.bind(ps);
        let div = (0, app_js_1.processString)((0, app_js_1.addRID)(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
        plDiv.appendChild(div);
    }
    else {
        console.log("Expecting " + xml_molecule_js_1.PropertyScalarString.tagName + " but finding none!");
    }
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
    function createViewer(position, rotation, zoomLevel, showAtomLabels, showBondLabels) {
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
        if (position != undefined) {
            console.log("position", position);
            viewer.position = position;
        }
        else {
            console.log("position", viewer.position);
        }
        if (rotation != undefined) {
            console.log("rotation", rotation);
            viewer.rotation = rotation;
        }
        else {
            console.log("rotation", viewer.rotation);
        }
        if (zoomLevel != undefined) {
            console.log("zoom", zoomLevel);
            viewer.zoomLevel = zoomLevel;
        }
        else {
            console.log("zoom", viewer.zoomLevel);
        }
        viewer.zoomTo();
        viewer.render();
        //viewer.zoom(0.8, 2000);
        return viewer;
    }
    // Add a redraw button.
    let redrawButton = (0, html_js_1.createButton)("Draw/Redraw", undefined);
    let viewer;
    redrawButton.addEventListener('click', () => {
        (0, app_js_1.remove)(viewerDivID);
        if (viewer == undefined) {
            viewer = createViewer(undefined, undefined, undefined, showAtomLabels, showBondLabels);
        }
        else {
            viewer = createViewer(viewer.position, viewer.rotation, viewer.zoom, showAtomLabels, showBondLabels);
        }
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
            let position = viewer.position;
            let rotation = viewer.rotation;
            let zoomLevel = viewer.zoomLevel;
            updateState(showState);
            (0, app_js_1.remove)(viewerDivID);
            viewer = createViewer(position, rotation, zoomLevel, showAtomLabels, showBondLabels);
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
/**
 * Add a Property.
 * @param dictRef The dictRef.
 * @param ps The PropertyScalar.
 * @param id The id.
 * @param boundary The boundary.
 * @param level The level.
 * @returns A div element.
 */
function addProperty1(dictRef, ps, id, boundary, level) {
    let pDiv = (0, html_js_1.createFlexDiv)(id, level);
    pDiv.appendChild((0, html_js_1.createLabel)(dictRef, boundary));
    // value.
    let value = ps.getValue();
    //let value: string = ps.value;
    let valueInputId = (0, app_js_1.addRID)(id, app_js_1.s_input);
    let valueInput = (0, html_js_1.createInput)("text", valueInputId, boundary);
    pDiv.appendChild(valueInput);
    valueInput.addEventListener('change', (event) => {
        let target = event.target;
        ps.setValue(new big_js_1.default(target.value));
        //ps.value = target.value;
        (0, html_js_1.resizeInputElement)(target);
    });
    valueInput.value = value.toString();
    (0, html_js_1.resizeInputElement)(valueInput);
    return pDiv;
}
/**
 * Add a PropertyScalarNumber.
 * @param attributes The attributes.
 * @param mIDM The molecule IDManager.
 * @param value The value.
 * @param units The units.
 * @param pl The PropertyList.
 * @param p The Property.
 * @param plDiv The PropertyList div.
 * @param boundary The boundary.
 */
function addPropertyScalarNumber1(attributes, mIDM, value, units, pl, p, plDiv, boundary) {
    let ps = p.getProperty();
    ps.setValue = function (value) {
        ps.value = value;
        if (p.dictRef == xml_molecule_js_1.ZPE.dictRef || p.dictRef == xml_molecule_js_1.Hf0.dictRef || p.dictRef == xml_molecule_js_1.HfAT0.dictRef || p.dictRef == xml_molecule_js_1.Hf298.dictRef) {
            // Update the molecule energy diagram.
            (0, app_js_1.redrawReactionsDiagram)();
        }
    }.bind(ps);
    ps.value = value;
    if (p.dictRef == xml_molecule_js_1.ZPE.dictRef || p.dictRef == xml_molecule_js_1.Hf0.dictRef || p.dictRef == xml_molecule_js_1.HfAT0.dictRef || p.dictRef == xml_molecule_js_1.Hf298.dictRef) {
        // Update the molecule energy diagram.
        (0, app_js_1.redrawReactionsDiagram)();
    }
    let id = (0, app_js_1.addRID)(plDiv.id, p.dictRef);
    console.log("div ID " + id);
    let div = (0, app_js_1.processNumber)(id, mIDM, p.dictRef, ps.getValue.bind(ps), (value) => setPropertyScalarNumber(p.dictRef, pl, ps, value), () => pl.removeProperty(p.dictRef), app_js_1.boundary1, app_js_1.level1);
    console.log("unitsID " + (0, app_js_1.addRID)(id, xml_molecule_js_1.PropertyScalarNumber.s_units));
    (0, app_js_1.addAnyUnits)(units, attributes, div, div.querySelector(app_js_1.s_input), (0, util_js_1.getID)(id, xml_molecule_js_1.PropertyScalarNumber.s_units), p.dictRef, boundary, boundary);
    plDiv.appendChild(div);
}
/**
 * Process a numerical variable.
 * @param id The id.
 * @param mIDM The .
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */
function processNumberArrayOrMatrix(plDiv, mIDM, name, pa, getter, setter, remover, marginComponent, margin) {
    let divID = (0, util_js_1.getID)(plDiv.id, name);
    let div = (0, html_js_1.createFlexDiv)(divID, margin);
    let buttonTextContentSelected = name + app_js_1.sy_selected;
    let buttonTextContentDeselected = name + app_js_1.sy_deselected;
    //let id: string = mIDM.addID(plDiv.id, name);
    //let idb = mIDM.addID(divID, s_button);
    let idb = (0, util_js_1.getID)(divID, html_js_1.s_button);
    let button = (0, html_js_1.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(app_js_1.s_optionOn);
    button.classList.add(app_js_1.s_optionOff);
    //let inputId: string = mIDM.addID(divID, s_input)
    let inputId = (0, util_js_1.getID)(divID, app_js_1.s_input);
    let values = getter();
    if (values == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_js_1.s_optionOn);
    }
    else {
        addNumberArray(div, inputId, name, values, pa, getter, setter, marginComponent);
        //plDiv.appendChild(div);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(app_js_1.s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        if (document.getElementById(inputId) == null) {
            addNumberArray(div, inputId, name, values, pa, getter, setter, marginComponent);
            //plDiv.appendChild(div);
            button.textContent = buttonTextContentSelected;
        }
        else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            remover();
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
 * @param name The name of the input.
 * @param values The numerical values.
 * @param paom The PropertyArray or PropertyMatrix.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param boundary The boundary for the text area.
 */
function addNumberArray(div, id, name, values, paom, getter, setter, boundary) {
    let valueString;
    if (values == undefined) {
        valueString = "";
    }
    else {
        valueString = (0, util_js_1.bigArrayToString)(values);
    }
    let ta = (0, html_js_1.createTextArea)(id, boundary);
    ta.addEventListener('change', (event) => {
        let target = event.target;
        let values = setNumberArrayNode(true, name, paom, ta);
        try {
            setter(values);
            console.log(name + " changed from " + valueString + " to " + target.value);
        }
        catch (e) {
            alert("Input invalid, resetting...");
            target.value = getter().toString();
        }
        (0, html_js_1.resizeTextAreaElement)(target);
    });
    ta.value = valueString;
    (0, html_js_1.resizeTextAreaElement)(ta);
    div.appendChild(ta);
}
/**
 * @param inputString The input string.
 * @param defaultValues The default values.
 * @returns The input string converted to a numerical Big[] or the defaultValues.
 */
function toBigArray(inputString, defaultValues) {
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function (value) {
        if (!(0, util_js_1.isNumeric)(value)) {
            success = false;
        }
        else {
            values.push(new big_js_1.default(value));
        }
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        return defaultValues;
    }
    return values;
}
/**
 * Set a molecule property array when the input value is changed.
 * @param setSize If true then the the size of the number array can be set.
 * @param dictRef The dictRef.
 * @param node The NumberArayNode.
 * @param ta The HTMLTextAreaElement.
 */
function setNumberArrayNode(setSize, dictRef, node, ta) {
    let inputString = ta.value.trim();
    let originalValues = (0, util_js_1.arrayToString)(node.values, " ");
    //if (node.getValues().length == 0) {
    //let values: Big[] = [];
    //setValues(dictRef, values);
    //node.setValues(values);
    //}
    if (inputString == "") {
        alert("Empty input resetting...");
        ta.value = originalValues;
        return node.values;
    }
    let values = toBigArray(inputString, node.values);
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        node.setValues(values);
        console.log("Changed " + node.tagName + " from: \"" + originalValues + "\" to: \"" + (0, util_js_1.arrayToString)(node.values, " ") + "\"");
        //console.log("molecule=" + molecule);
    }
    else {
        if (setSize) {
            //let values: Big[] = [];
            //setValues(dictRef, values);
            node.setValues(values);
            console.log("Changed " + node.tagName + " from: \"" + originalValues + "\" to: \"" + (0, util_js_1.arrayToString)(node.values, " ") + "\"");
        }
        else {
            alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
            ta.value = originalValues;
        }
    }
    return node.values;
}
//# sourceMappingURL=gui_moleculeList.js.map