"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processConditions = processConditions;
exports.createAddConditionsButton = createAddConditionsButton;
const big_js_1 = __importDefault(require("big.js"));
const app_1 = require("./app");
const xml_conditions_1 = require("./xml_conditions");
const html_1 = require("./html");
const xml_mesmer_1 = require("./xml_mesmer");
const util_1 = require("./util");
const xml_1 = require("./xml");
/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */
function processConditions(xml, conditionsIDs, molecules) {
    console.log(xml_conditions_1.Conditions.tagName);
    // Create a div for the conditionss.
    let conditionssDiv = (0, html_1.createDiv)(undefined, app_1.boundary1);
    // Get the XML "me:conditions" element.
    let xml_conditionss = xml.getElementsByTagName(xml_conditions_1.Conditions.tagName);
    for (let i = 0; i < xml_conditionss.length; i++) {
        let xml_conditions = xml_conditionss[i];
        // Create a collapsible div for each conditions.
        let cDivID = (0, app_1.addRID)(xml_conditions_1.Conditions.tagName, i.toString());
        let cDiv = (0, html_1.createDiv)(cDivID, app_1.boundary1);
        let ccDivID = (0, app_1.addRID)(cDivID, app_1.s_container);
        let ccDiv = (0, html_1.getCollapsibleDiv)(ccDivID, conditionssDiv, null, cDiv, xml_conditions_1.Conditions.tagName + " " + i.toString(), app_1.boundary1, app_1.level1);
        let conditions = addConditions((0, xml_1.getAttributes)(xml_conditions), i);
        handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        // Add a remove conditions button.
        let removeButton = (0, app_1.addRemoveButton)(cDiv, app_1.level1, app_1.mesmer.removeConditions.bind(app_1.mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the conditions.
            (0, app_1.remove)(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    }
    // Create an add button to add a conditions.
    createAddConditionsButton(conditionssDiv, conditionsIDs, molecules);
    return conditionssDiv;
}
/**
 * @param conditions The conditions.
 * @param cDiv The conditions div.
 * @param conditionsIndex The conditions index.
 * @param xml_conditions The XML conditions.
 */
function handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules) {
    // Bath Gases
    // Create a collapsible div.
    let bsDivID = conditionsIDs.addID(cDiv.id, xml_conditions_1.BathGas.tagName);
    let bsDiv = (0, html_1.createDiv)(bsDivID);
    let bscDivID = conditionsIDs.addID(cDiv.id, xml_conditions_1.BathGas.tagName, app_1.s_container);
    let bscDiv = (0, html_1.getCollapsibleDiv)(bscDivID, cDiv, null, bsDiv, xml_conditions_1.BathGas.tagName, app_1.boundary1, app_1.level1);
    // Add add button.
    let addBathGasButton = (0, html_1.createButton)(app_1.s_Add_sy_add, conditionsIDs.addID(cDiv.id, xml_conditions_1.BathGas.tagName, html_1.s_button), app_1.level1);
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas = new xml_conditions_1.BathGas(new Map(), app_1.s_selectOption);
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div = (0, html_1.createFlexDiv)(undefined, app_1.level1);
        let id = conditionsIDs.addID(cDiv.id, xml_conditions_1.BathGas.tagName, bathGasIndex.toString());
        let select = createSelectElementBathGas(Array.from((0, app_1.getMoleculeKeys)(molecules)), bathGas, true, id);
        select.classList.add(xml_conditions_1.BathGas.tagName);
        div.appendChild(select);
        (0, app_1.addRemoveButton)(div, app_1.boundary1, (bathGas) => {
            bsDiv.removeChild(div);
            conditionsIDs.removeIDs(id),
                conditions.removeBathGas(bathGas);
        });
        bsDiv.insertBefore(div, addBathGasButton);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases = Array.from(xml_conditions.children).filter(child => child.tagName === xml_conditions_1.BathGas.tagName);
        if (xml_bathGases.length > 0) {
            for (let i = 0; i < xml_bathGases.length; i++) {
                let attributes = (0, xml_1.getAttributes)(xml_bathGases[i]);
                let moleculeID = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_bathGases[i]));
                let bathGas = new xml_conditions_1.BathGas(attributes, moleculeID);
                //console.log("bathGas " + bathGas.toString());
                let bathGasIndex = conditions.addBathGas(bathGas);
                let id = conditionsIDs.addID(cDiv.id, xml_conditions_1.BathGas.tagName, bathGasIndex.toString());
                let div = (0, html_1.createFlexDiv)(id, app_1.level1);
                div.appendChild(createSelectElementBathGas(Array.from((0, app_1.getMoleculeKeys)(molecules)), bathGas, false, id));
                (0, app_1.addRemoveButton)(div, app_1.boundary1, (bathGas) => {
                    bsDiv.removeChild(div);
                    conditionsIDs.removeIDs(id);
                    conditions.removeBathGas(bathGas);
                });
                bsDiv.insertBefore(div, addBathGasButton);
            }
        }
        else {
            let div = (0, html_1.createFlexDiv)(undefined, app_1.level1);
            let id = conditionsIDs.addID(cDiv.id, xml_conditions_1.BathGas.tagName, 0);
            div.appendChild(createSelectElementBathGas(Array.from((0, app_1.getMoleculeKeys)(molecules)), undefined, false, id));
            (0, app_1.addRemoveButton)(div, app_1.boundary1, (bathGas) => {
                bsDiv.removeChild(div);
                conditionsIDs.removeIDs(id);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
    }
}
/**
 *
 * @param conditions
 * @param cDiv
 * @param xml_conditions
 * @param level
 * @param nextLevel
 */
function handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules) {
    // PTs
    let moleculeKeys = (0, app_1.getMoleculeKeys)(molecules);
    // Create collapsible div.
    let pTsDivId = conditionsIDs.addID(cDiv.id, xml_conditions_1.PTs.tagName);
    let pTsDiv = (0, html_1.createDiv)(pTsDivId);
    let pTscDivId = conditionsIDs.addID(cDiv.id, pTsDivId, app_1.s_container);
    let pTscDiv = (0, html_1.getCollapsibleDiv)(pTscDivId, cDiv, null, pTsDiv, xml_conditions_1.PTs.tagName, app_1.boundary1, app_1.level1);
    let pTs = new xml_conditions_1.PTs(new Map());
    if (xml_conditions) {
        let xml_PTss = xml_conditions.getElementsByTagName(xml_conditions_1.PTs.tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) {
                throw new Error("Expecting 1 " + xml_conditions_1.PTs.tagName + " but finding " + xml_PTss.length + "!");
            }
            let attributes = (0, xml_1.getAttributes)(xml_PTss[0]);
            let xml_PTpairs = xml_PTss[0].getElementsByTagName(xml_conditions_1.PTpair.tagName);
            if (xml_PTpairs.length == 0) {
                console.warn("Expecting 1 or more " + xml_conditions_1.PTpair.tagName + " but finding 0! Please add some PTpairs in "
                    + xml_conditions_1.Conditions.tagName + " " + conditions.id + ".");
            }
            else {
                pTs = new xml_conditions_1.PTs(attributes);
                for (let i = 0; i < xml_PTpairs.length; i++) {
                    let pTpairAttributes = (0, xml_1.getAttributes)(xml_PTpairs[i]);
                    //console.log("pTpairAttributes=" + mapToString(pTpairAttributes));
                    let pTpair = new xml_conditions_1.PTpair(pTpairAttributes);
                    pTs.add(pTpair);
                    // BathGas.
                    let xml_bathGass = xml_PTpairs[i].getElementsByTagName(xml_conditions_1.BathGas.tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) {
                            console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        }
                        pTpair.setBathGas(new xml_conditions_1.BathGas((0, xml_1.getAttributes)(xml_bathGass[0]), (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_bathGass[0]))));
                    }
                    // ExperimentRate.
                    let xml_ers = xml_PTpairs[i].getElementsByTagName(xml_conditions_1.ExperimentalRate.tagName);
                    if (xml_ers.length > 0) {
                        if (xml_ers.length > 1) {
                            console.warn("xml_experimentRates.length=" + xml_ers.length);
                        }
                        pTpair.setExperimentalRate(new xml_conditions_1.ExperimentalRate((0, xml_1.getAttributes)(xml_ers[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_ers[0])).trim())));
                    }
                    // ExperimentalYield.
                    let xml_eys = xml_PTpairs[i].getElementsByTagName(xml_conditions_1.ExperimentalYield.tagName);
                    if (xml_eys.length > 0) {
                        if (xml_eys.length > 1) {
                            console.warn("xml_experimentalYields.length=" + xml_eys.length);
                        }
                        pTpair.setExperimentalYield(new xml_conditions_1.ExperimentalYield((0, xml_1.getAttributes)(xml_eys[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_eys[0])).trim())));
                    }
                    // ExperimentalEigenvalue.
                    let xml_ees = xml_PTpairs[i].getElementsByTagName(xml_conditions_1.ExperimentalEigenvalue.tagName);
                    if (xml_ees.length > 0) {
                        if (xml_ees.length > 1) {
                            console.warn("xml_experimentalEigenvalues.length=" + xml_ees.length);
                        }
                        pTpair.setExperimentalEigenvalue(new xml_conditions_1.ExperimentalEigenvalue((0, xml_1.getAttributes)(xml_ees[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_ees[0])).trim())));
                    }
                    // Create pTpairDiv.
                    pTsDiv.appendChild(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, i, moleculeKeys, app_1.level1));
                }
            }
        }
    }
    conditions.setPTs(pTs);
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = (0, html_1.createDiv)(undefined, app_1.level1);
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton = (0, html_1.createButton)(app_1.s_Add_sy_add, undefined, app_1.boundary1);
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', () => {
        // Create a new PTpair.
        let pTpairAttributes = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair = new xml_conditions_1.PTpair(pTpairAttributes);
        let pTpairIndex = pTs.add(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, app_1.level1), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, html_1.createButton)(app_1.s_Add_from_spreadsheet, undefined, app_1.boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, html_1.createFlexDiv)(undefined, app_1.level1);
        let addFromSpreadsheetId = (0, app_1.addRID)(xml_conditions_1.PTs.tagName, "addFromSpreadsheet");
        let input = (0, html_1.createInput)("text", addFromSpreadsheetId, app_1.level1);
        div.appendChild(input);
        pTsDiv.insertBefore(div, pTsButtonsDiv);
        // Add an event listener to the inputElement.
        input.addEventListener('change', () => {
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray = input.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTpairsArray[0].split("\t").forEach((value, i) => {
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for (let i = 1; i < pTpairsArray.length; i++) {
                    let pTpairArray = pTpairsArray[i].split("\t");
                    let pIndex = index.get("P");
                    let p = new big_js_1.default(pTpairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTpairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair = new xml_conditions_1.PTpair(pTpairAttributes);
                    pTs.add(pTpair);
                    let tIndex = index.get("T");
                    let t = new big_js_1.default(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has(xml_conditions_1.PTpair.s_excessReactantConc)) {
                        let excessReactantConIndex = index.get(xml_conditions_1.PTpair.s_excessReactantConc);
                        let excessReactantConc = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set(xml_conditions_1.PTpair.s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has(xml_conditions_1.PTpair.s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex = index.get(xml_conditions_1.PTpair.s_percentExcessReactantConc);
                        let percentExcessReactantConc = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set(xml_conditions_1.PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has(xml_conditions_1.PTpair.s_precision)) {
                        console.log("index.has(PTpair.s_precision)");
                        let precisionIndex = index.get(xml_conditions_1.PTpair.s_precision);
                        let precision = pTpairArray[precisionIndex];
                        pTpairAttributes.set(xml_conditions_1.PTpair.s_precision, precision);
                        //console.log("precision=" + precision);
                    }
                    if (index.has(xml_conditions_1.BathGas.tagName)) {
                        let bathGasIndex = index.get(xml_conditions_1.BathGas.tagName);
                        let bathGas = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new xml_conditions_1.BathGas(new Map(), bathGas));
                    }
                    if (index.has(xml_conditions_1.ExperimentalRate.tagName)) {
                        let eri = index.get(xml_conditions_1.ExperimentalRate.tagName);
                        let er = pTpairArray[eri];
                        if (er.length > 0) {
                            pTpairAttributes.set(xml_conditions_1.ExperimentalRate.tagName, er);
                            pTpair.setExperimentalRate(new xml_conditions_1.ExperimentalRate(new Map(), new big_js_1.default(er)));
                            // Set the attributes of the experimentalRate.
                            // ref1.
                            let err1i = index.get(xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_ref1);
                            let err1 = pTpairArray[err1i];
                            pTpair.getExperimentalRate()?.setRef1(err1);
                            // ref2.
                            let err2i = index.get(xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_ref2);
                            let err2 = pTpairArray[err2i];
                            pTpair.getExperimentalRate()?.setRef2(err2);
                            // refReaction.
                            let errri = index.get(xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_refReaction);
                            let errr = pTpairArray[errri];
                            pTpair.getExperimentalRate()?.setRefReaction(errr);
                            // error.
                            let erei = index.get(xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_error);
                            let ere = pTpairArray[erei];
                            pTpair.getExperimentalRate()?.setError(new big_js_1.default(ere));
                        }
                    }
                    if (index.has(xml_conditions_1.ExperimentalYield.tagName)) {
                        let eyi = index.get(xml_conditions_1.ExperimentalYield.tagName);
                        let ey = pTpairArray[eyi];
                        if (ey.length > 0) {
                            pTpair.setExperimentalYield(new xml_conditions_1.ExperimentalYield(new Map(), new big_js_1.default(ey)));
                            // Set the attributes of the experimentalYield.
                            // ref.
                            let eyri = index.get(xml_conditions_1.ExperimentalYield.tagName + "_" + xml_conditions_1.ExperimentalYield.s_ref);
                            let eyr = pTpairArray[eyri];
                            pTpair.getExperimentalYield()?.setRef(eyr);
                            // yieldTime.
                            let eyyti = index.get(xml_conditions_1.ExperimentalYield.tagName + "_" + xml_conditions_1.ExperimentalYield.s_yieldTime);
                            let eyyt = pTpairArray[eyyti];
                            pTpair.getExperimentalYield()?.setYieldTime(new big_js_1.default(eyyt));
                            // error.
                            let eyei = index.get(xml_conditions_1.ExperimentalYield.tagName + "_" + xml_conditions_1.ExperimentalYield.s_error);
                            let eye = pTpairArray[eyei];
                            pTpair.getExperimentalYield()?.setError(new big_js_1.default(eye));
                        }
                    }
                    if (index.has(xml_conditions_1.ExperimentalEigenvalue.tagName)) {
                        let eei = index.get(xml_conditions_1.ExperimentalEigenvalue.tagName);
                        let ee = pTpairArray[eei];
                        if (ee.length > 0) {
                            pTpair.setExperimentalEigenvalue(new xml_conditions_1.ExperimentalEigenvalue(new Map(), new big_js_1.default(ee)));
                            // Set the attributes of the experimentalEigenvalue.
                            // EigenvalueID.
                            let eeeidi = index.get(xml_conditions_1.ExperimentalEigenvalue.tagName + "_" + xml_conditions_1.ExperimentalEigenvalue.s_EigenvalueID);
                            let eeeid = pTpairArray[eeeidi];
                            pTpair.getExperimentalEigenvalue()?.setEigenvalueID(eeeid);
                            // error.
                            let eeei = index.get(xml_conditions_1.ExperimentalEigenvalue.tagName + "_" + xml_conditions_1.ExperimentalEigenvalue.s_error);
                            let eee = pTpairArray[eeei];
                            pTpair.getExperimentalEigenvalue()?.setError(new big_js_1.default(eee));
                        }
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex = pTs.ptps.length - 1;
                    // Create a new div for the PTpair.
                    pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, app_1.level1), pTsButtonsDiv);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton = (0, html_1.createButton)("Remove All", undefined, app_1.boundary1);
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener('click', () => {
        pTs.clear();
        // Remove all elements before the pTsButtonsDiv.
        let child = pTsDiv.firstChild;
        while (child != null && child != pTsButtonsDiv) {
            let nextSibling = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
}
/**
 * Create an add conditions button and append it to conditionssDiv.
 * @param conditionssDiv The conditionss div.
 * @param conditionsDivIDs The conditions IDs.
 * @param molecules The molecules.
 * @returns The button.
 */
function createAddConditionsButton(conditionssDiv, conditionsDivIDs, molecules) {
    let button = (0, html_1.createButton)(app_1.s_Add_sy_add, undefined, app_1.level1);
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = app_1.mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        // Create collapsible div.
        let cDivID = conditionsDivIDs.addID(xml_conditions_1.Conditions.tagName, i.toString());
        let cDiv = (0, html_1.createDiv)(cDivID, app_1.boundary1);
        let ccDivID = (0, app_1.addRID)(cDivID, app_1.s_container);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_1.getID)(xml_conditions_1.Conditions.tagName, (i - 1).toString(), app_1.s_container));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) {
                    elementToInsertBefore = nextElementSibling;
                }
                else {
                    elementToInsertBefore = button;
                }
            }
            else {
                elementToInsertBefore = button;
            }
        }
        else {
            elementToInsertBefore = button;
        }
        let ccDiv = (0, html_1.getCollapsibleDiv)(ccDivID, conditionssDiv, elementToInsertBefore, cDiv, xml_conditions_1.Conditions.tagName + " " + i.toString(), app_1.boundary1, app_1.level1);
        // Add the conditions
        let conditions = addConditions(new Map(), i);
        handleBathGases(conditions, cDiv, null, conditionsDivIDs, molecules);
        handlePTs(conditions, cDiv, null, conditionsDivIDs, molecules);
        // Add a remove conditions button.
        let removeButton = (0, app_1.addRemoveButton)(cDiv, app_1.level1, app_1.mesmer.removeConditions.bind(app_1.mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the conditions.
            (0, app_1.remove)(ccDivID);
            conditionsDivIDs.removeIDs(cDivID);
        });
    });
    return button;
}
/**
 * Add and return a new conditions.
 */
function addConditions(attributes, i) {
    let conditions = new xml_conditions_1.Conditions(attributes, i);
    app_1.mesmer.addConditions(conditions);
    return conditions;
}
/**
 * @param pTs The PTs.
 * @param pTsDiv The PTs div.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param pTIndex The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */
function createPTpairDiv(pTs, pTsDiv, pTpair, cDivID, pTIndex, moleculeKeys, level) {
    let pTpairDiv = (0, html_1.createFlexDiv)((0, app_1.addRID)(pTsDiv.id, pTIndex), level);
    addPorT(pTpairDiv, xml_conditions_1.PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    (0, app_1.addAnyUnits)(xml_mesmer_1.Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, null, xml_conditions_1.PTpair.tagName, xml_conditions_1.PTpair.tagName, app_1.boundary1, app_1.level1);
    addPorT(pTpairDiv, xml_conditions_1.PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    //let id: string = conditionsIDs.addID(cDivID, pTsDiv.id, pTIndex.toString());
    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, addID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, xml_conditions_1.PTpair.s_excessReactantConc, createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    addPercentExcessReactantConc(pTpairDiv, pTpair);
    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, addID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, xml_conditions_1.PTpair.s_precision, createPrecisionSelectElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_precision, createPrecisionSelectElement,
    //    (pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // BathGas.
    //addButtonWithToggle(pTpairDiv, pTpair, BathGas.tagName, addID(id, BathGas.tagName),
    //    [pTpair, moleculeKeys, true], createBathGasSelectElement);
    addBathGas(pTpairDiv, pTpair, moleculeKeys);
    /*
    addAttribute(pTpairDiv, pTpair, pTIndex, BathGas.tagName, createBathGasSelectElement,
        (pTpair, attribute) => pTpair.getBathGas() !== undefined,  (pTpair, attribute) => pTpair.getBathGas(), moleculeKeys
    );
    */
    // ExperimentalRate.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalRate.tagName, addID(id, ExperimentalRate.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalRateDetails);
    //addExperimentalRate(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, xml_conditions_1.ExperimentalRate.tagName, (pTpair) => pTpair.getExperimentalRate(), createExperimentalRateDetails);
    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, addID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, xml_conditions_1.ExperimentalYield.tagName, (pTpair) => pTpair.getExperimentalYield(), createExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, addID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, xml_conditions_1.ExperimentalEigenvalue.tagName, (pTpair) => pTpair.getExperimentalEigenvalue(), createExperimentalEigenvalueDetails);
    // Function to be used to remove a PTpair.
    let removePTpair = (pTpairDiv, i, pTpair) => {
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) {
            pTs.remove(i);
        }
        pTpair.removeBathGas();
    };
    (0, app_1.addRemoveButton)(pTpairDiv, app_1.boundary1, removePTpair, pTpairDiv, pTIndex, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */
function addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, html_1.createLabelWithInput)("text", xml_conditions_1.PTpair.tagName + "_" + name, app_1.boundary1, app_1.level0, (event) => {
        let target = event.target;
        try {
            setter(new big_js_1.default(target.value));
            console.log(`Set ${name} to ${target.value}`);
        }
        catch (e) {
            alert("Invalid input, resetting...");
            input.value = getValue(getter);
        }
        (0, html_1.resizeInputElement)(target);
    }, getValue(getter), name);
    let input = lwi.querySelector('input');
    input.value = getValue(getter);
    (0, html_1.resizeInputElement)(input);
    pTpairDiv.appendChild(lwi);
}
function getValue(getter) {
    let value = getter();
    if (value !== undefined) {
        return value.toString();
    }
    else {
        return "";
    }
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 */
function addPercentExcessReactantConc(pTpairDiv, pTpair) {
    let id = (0, app_1.addRID)(pTpairDiv.id, xml_conditions_1.PTpair.s_percentExcessReactantConc);
    let div = (0, html_1.createDiv)(id, app_1.boundary1);
    pTpairDiv.appendChild(div);
    let attribute = xml_conditions_1.PTpair.s_percentExcessReactantConc;
    let buttonTextContentSelected = attribute + app_1.sy_selected;
    let buttonTextContentDeselected = attribute + app_1.sy_deselected;
    let button = (0, html_1.createButton)(buttonTextContentDeselected, (0, app_1.addRID)(id, html_1.s_button), app_1.boundary1);
    div.appendChild(button);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle(app_1.s_optionOff);
        button.textContent = buttonTextContentSelected;
    }
    else {
        button.classList.toggle(app_1.s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
        }
        else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param conditionsIndex The conditions index.
 * @param pTIndex The pTindex.
 * @param attribute The attribute.
 * @param createInputElement The function to create the input element.
 */
function addAttribute(pTpairDiv, pTpair, attribute, createInputElement) {
    let id = (0, app_1.addRID)(pTpairDiv.id, attribute);
    let div = (0, html_1.createDiv)(id, app_1.boundary1);
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = attribute + app_1.sy_selected;
    let buttonTextContentDeselected = attribute + app_1.sy_deselected;
    let button = (0, html_1.createButton)(buttonTextContentDeselected, (0, app_1.addRID)(id, html_1.s_button), app_1.boundary1);
    div.appendChild(button);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    let iid = (0, app_1.addRID)(id, app_1.s_input);
    if (pTpair.attributes.has(attribute)) {
        button.classList.toggle(app_1.s_optionOff);
        button.textContent = buttonTextContentSelected;
        let input = createInputElement(iid, pTpair);
        div.insertBefore(input, button.nextSibling);
    }
    else {
        button.classList.toggle(app_1.s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = createInputElement(iid, pTpair);
            div.insertBefore(input, button.nextSibling);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            (0, app_1.remove)(iid);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */
function addBathGas(pTpairDiv, pTpair, moleculeKeys) {
    let id = (0, app_1.addRID)(pTpairDiv.id, xml_conditions_1.BathGas.tagName);
    let div = (0, html_1.createDiv)(id, app_1.boundary1);
    pTpairDiv.appendChild(div);
    let tagName = xml_conditions_1.BathGas.tagName;
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(buttonTextContentDeselected, (0, app_1.addRID)(id, html_1.s_button), app_1.boundary1);
    div.appendChild(button);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    let iid = (0, app_1.addRID)(id, app_1.s_input);
    let bathGas = pTpair.getBathGas();
    if (bathGas == undefined) {
        button.classList.toggle(app_1.s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    else {
        button.classList.toggle(app_1.s_optionOff);
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) {
            console.warn("moleculeKeys does not contain " + bathGas.value);
        }
        div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            (0, app_1.remove)(iid);
        }
    });
}
/**
 *
 * @param pTpairDiv
 * @param pTpair
 * @param conditionsIndex
 * @param pTIndex
 * @param tagName
 * @param getAttribute
 * @param createElement
 */
function addExperimentalElement(pTpairDiv, pTpair, pTIndex, tagName, getAttribute, createElement) {
    let id = (0, app_1.addRID)(pTpairDiv.id, tagName);
    let div = (0, html_1.createDiv)(id, app_1.boundary1);
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(buttonTextContentDeselected, (0, app_1.addRID)(id, html_1.s_button), app_1.boundary1);
    div.appendChild(button);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    let iid = (0, app_1.addRID)(id, app_1.s_input);
    if (getAttribute(pTpair) == undefined) {
        button.classList.toggle(app_1.s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    else {
        button.classList.toggle(app_1.s_optionOff);
        button.textContent = buttonTextContentSelected;
        div.appendChild(createElement(iid, pTpair, pTIndex));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createElement(iid, pTpair, pTIndex));
        }
        else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            (0, app_1.remove)(iid);
        }
    });
}
/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */
function createPrecisionSelectElement(id, pTpair) {
    let value;
    if (pTpair.attributes.has(xml_conditions_1.PTpair.s_precision)) {
        value = pTpair.attributes.get(xml_conditions_1.PTpair.s_precision);
    }
    else {
        value = xml_mesmer_1.Mesmer.precisionOptions[0];
    }
    let select = (0, html_1.createSelectElement)(xml_mesmer_1.Mesmer.precisionOptions, xml_conditions_1.PTpair.s_precision, value, id, app_1.boundary1);
    select.addEventListener('change', (event) => {
        let target = event.target;
        pTpair.setPrecision(target.value);
        console.log("Set " + xml_conditions_1.PTpair.s_precision + " to " + target.value);
        (0, html_1.resizeSelectElement)(target);
    });
    (0, html_1.resizeSelectElement)(select);
    return select;
}
/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */
function createExcessReactantConcInputElement(id, pTpair) {
    let input = (0, html_1.createInput)("number", id, app_1.boundary1);
    let value;
    if (pTpair.attributes.has(xml_conditions_1.PTpair.s_excessReactantConc)) {
        value = pTpair.attributes.get(xml_conditions_1.PTpair.s_excessReactantConc);
    }
    else {
        value = NaN.toString();
    }
    console.log(xml_conditions_1.PTpair.s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener('change', (event) => {
        let target = event.target;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + xml_conditions_1.PTpair.s_excessReactantConc + " to " + target.value);
        (0, html_1.resizeInputElement)(target);
    });
    (0, html_1.resizeInputElement)(input);
    return input;
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */
function createBathGasSelectElement(id, pTpair, bathGas, first, moleculeKeys) {
    //console.log("createBathGasSelectElement");
    //console.log("pTpair " + pTpair.toString());
    let select = createSelectElementBathGas(Array.from(moleculeKeys), bathGas, first, id);
    //select.id = id;
    select.addEventListener('change', (event) => {
        let target = event.target;
        pTpair.setBathGas(new xml_conditions_1.BathGas(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        (0, html_1.resizeSelectElement)(target);
    });
    (0, html_1.resizeSelectElement)(select);
    return select;
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 * @param first True if this is the first selection, flase otherwise?
 * @param id The id used to generate other ids.
 */
function createSelectElementBathGas(options, bathGas, first, id) {
    let value;
    if (first) {
        options.push(app_1.s_selectOption);
    }
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(app_1.s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    if (bathGas == undefined) {
        bathGas = new xml_conditions_1.BathGas(new Map(), app_1.s_selectOption);
        value = app_1.s_selectOption;
    }
    else {
        value = bathGas.value;
    }
    let select = (0, html_1.createSelectElement)(options, xml_conditions_1.BathGas.tagName, value, (0, app_1.addRID)(id, html_1.s_select), app_1.boundary1);
    select.classList.add(xml_conditions_1.BathGas.tagName);
    (0, app_1.selectAnotherOptionEventListener)(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event) => {
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as " + xml_conditions_1.BathGas.tagName);
        (0, html_1.resizeSelectElement)(target);
    });
    select.value = value;
    (0, html_1.resizeSelectElement)(select);
    return select;
}
/**
 * Create a div for the experimental rate details.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */
function createExperimentalRateDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, pTpair => pTpair.getExperimentalRate(), (pTpair, value) => pTpair.setExperimentalRate(value), xml_conditions_1.ExperimentalRate, [
        {
            tagName: xml_conditions_1.ExperimentalRate.tagName, type: "number",
            eventHandler: (event, target) => (0, app_1.setNumberNode)(pTpair.getExperimentalRate(), target),
            valueGetter: () => pTpair.getExperimentalRate().value.toString()
        },
        {
            tagName: xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_ref1, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef1(target.value),
            valueGetter: () => pTpair.getExperimentalRate().getRef1()
        },
        {
            tagName: xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_ref2, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef2(target.value),
            valueGetter: () => pTpair.getExperimentalRate().getRef2()
        },
        {
            tagName: xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_refReaction, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRefReaction(target.value),
            valueGetter: () => pTpair.getExperimentalRate().getRefReaction()
        },
        {
            tagName: xml_conditions_1.ExperimentalRate.tagName + "_" + xml_conditions_1.ExperimentalRate.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalRate()?.setError(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalRate().getError().toString()
        }
    ]);
}
/**
 * Create a div for the experimental yield details.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */
function createExperimentalYieldDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, pTpair => pTpair.getExperimentalYield(), (pTpair, value) => pTpair.setExperimentalYield(value), xml_conditions_1.ExperimentalYield, [
        {
            tagName: xml_conditions_1.ExperimentalYield.tagName, type: "number",
            eventHandler: (event, target) => (0, app_1.setNumberNode)(pTpair.getExperimentalYield(), target),
            valueGetter: () => pTpair.getExperimentalYield().value.toString()
        },
        {
            tagName: xml_conditions_1.ExperimentalYield.tagName + "_" + xml_conditions_1.ExperimentalYield.s_ref, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setRef(target.value),
            valueGetter: () => pTpair.getExperimentalYield().getRef()
        },
        {
            tagName: xml_conditions_1.ExperimentalYield.tagName + "_" + xml_conditions_1.ExperimentalYield.s_yieldTime, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setYieldTime(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalYield().getYieldTime().toString()
        },
        {
            tagName: xml_conditions_1.ExperimentalYield.tagName + "_" + xml_conditions_1.ExperimentalYield.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalYield()?.setError(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalYield().getError().toString()
        }
    ]);
}
/**
 * Create a div for the experimental eigenvalue.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */
function createExperimentalEigenvalueDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, pTpair => pTpair.getExperimentalEigenvalue(), (pTpair, value) => pTpair.setExperimentalEigenvalue(value), xml_conditions_1.ExperimentalEigenvalue, [
        {
            tagName: xml_conditions_1.ExperimentalEigenvalue.tagName, type: "number",
            eventHandler: (event, target) => (0, app_1.setNumberNode)(pTpair.getExperimentalEigenvalue(), target),
            valueGetter: () => pTpair.getExperimentalEigenvalue().value.toString()
        },
        {
            tagName: xml_conditions_1.ExperimentalEigenvalue.tagName + "_" + xml_conditions_1.ExperimentalEigenvalue.s_EigenvalueID, type: "text",
            eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
            valueGetter: () => pTpair.getExperimentalEigenvalue().getEigenvalueID()
        },
        {
            tagName: xml_conditions_1.ExperimentalEigenvalue.tagName + "_" + xml_conditions_1.ExperimentalEigenvalue.s_error, type: "number",
            eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setError(new big_js_1.default(target.value)),
            valueGetter: () => pTpair.getExperimentalEigenvalue().getError().toString()
        }
    ]);
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
function addExperimentalDetails(pTpair, id, getExperimental, setExperimental, ExperimentalClass, details) {
    let div = (0, html_1.createDiv)(undefined, app_1.boundary1);
    div.id = id;
    let experimental = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), app_1.big0);
        setExperimental(pTpair, experimental);
    }
    for (let detail of details) {
        let detailId = id + "_" + detail.tagName;
        div.appendChild((0, html_1.createLabelWithInput)(detail.type, detailId, app_1.boundary1, app_1.level0, (event) => {
            let target = event.target;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            (0, html_1.resizeInputElement)(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}
//# sourceMappingURL=gui_ConditionsList.js.map