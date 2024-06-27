import Big from "big.js";
import { boundary1, addRID, s_container, level1, addRemoveButton, mesmer, remove, s_Add_sy_add, s_selectOption, 
    getMoleculeKeys, addAnyUnits, level0, sy_selected, sy_deselected, s_optionOn, s_optionOff, s_input, 
    selectAnotherOptionEventListener, setNumberNode, IDManager, s_Add_from_spreadsheet, big0 } from "./app";
import { Conditions, BathGas, PTs, PTpair, ExperimentalRate, ExperimentalYield, ExperimentalEigenvalue } from "./xml_conditions";
import { createDiv, getCollapsibleDiv, createButton, s_button, createFlexDiv, createInput, createLabelWithInput, 
    resizeInputElement, createSelectElement, resizeSelectElement, s_select } from "./html";
import { Mesmer } from "./xml_mesmer";
import { Molecule } from "./xml_molecule";
import { getID } from "./util";
import { getAttributes, getNodeValue, getFirstChildNode } from "./xml";

/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */
export function processConditions(xml: XMLDocument, conditionsIDs: IDManager, molecules: Map<string, Molecule>): HTMLDivElement {
    console.log(Conditions.tagName);
    // Create a div for the conditionss.
    let conditionssDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "me:conditions" element.
    let xml_conditionss: HTMLCollectionOf<Element> = xml.getElementsByTagName(Conditions.tagName);
    for (let i = 0; i < xml_conditionss.length; i++) {
        let xml_conditions: Element = xml_conditionss[i];
        // Create a collapsible div for each conditions.
        let cDivID: string = addRID(Conditions.tagName, i.toString());
        let cDiv: HTMLDivElement = createDiv(cDivID, boundary1);
        let ccDivID = addRID(cDivID, s_container);
        let ccDiv: HTMLDivElement = getCollapsibleDiv(ccDivID, conditionssDiv, null, cDiv, Conditions.tagName + " " + i.toString(),
            boundary1, level1);
        let conditions: Conditions = addConditions(getAttributes(xml_conditions), i);
        handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        // Add a remove conditions button.
        let removeButton: HTMLButtonElement = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the conditions.
            remove(ccDivID);
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
function handleBathGases(conditions: Conditions, cDiv: HTMLDivElement, xml_conditions: Element | null, conditionsIDs: IDManager,
    molecules: Map<string, Molecule> ): void {
    // Bath Gases
    // Create a collapsible div.
    let bsDivID: string = conditionsIDs.addID(cDiv.id, BathGas.tagName);
    let bsDiv: HTMLDivElement = createDiv(bsDivID);
    let bscDivID = conditionsIDs.addID(cDiv.id, BathGas.tagName, s_container);
    let bscDiv: HTMLDivElement = getCollapsibleDiv(bscDivID, cDiv, null, bsDiv, BathGas.tagName, boundary1, level1);
    // Add add button.
    let addBathGasButton: HTMLButtonElement = createButton(s_Add_sy_add, conditionsIDs.addID(cDiv.id, BathGas.tagName, s_button), level1);
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', () => {
        let bathGas: BathGas = new BathGas(new Map(), s_selectOption);
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div: HTMLDivElement = createFlexDiv(undefined, level1);
        let id: string = conditionsIDs.addID(cDiv.id, BathGas.tagName, bathGasIndex.toString());
        let select: HTMLSelectElement = createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), bathGas, true, id);
        select.classList.add(BathGas.tagName);
        div.appendChild(select);
        addRemoveButton(div, boundary1, (bathGas) => {
            bsDiv.removeChild(div);
            conditionsIDs.removeID(id),
                conditions.removeBathGas(bathGas);
        });
        bsDiv.insertBefore(div, addBathGasButton);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases: Element[] = Array.from(xml_conditions.children).filter(child => child.tagName === BathGas.tagName);
        if (xml_bathGases.length > 0) {
            for (let i = 0; i < xml_bathGases.length; i++) {
                let attributes: Map<string, string> = getAttributes(xml_bathGases[i]);
                let moleculeID: string = getNodeValue(getFirstChildNode(xml_bathGases[i]));
                let bathGas: BathGas = new BathGas(attributes, moleculeID);
                //console.log("bathGas " + bathGas.toString());
                let bathGasIndex = conditions.addBathGas(bathGas);
                let id: string = conditionsIDs.addID(cDiv.id, BathGas.tagName, bathGasIndex.toString());
                let div: HTMLDivElement = createFlexDiv(id, level1);
                div.appendChild(createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), bathGas, false, id));
                addRemoveButton(div, boundary1, (bathGas) => {
                    bsDiv.removeChild(div);
                    conditionsIDs.removeID(id);
                    conditions.removeBathGas(bathGas);
                });
                bsDiv.insertBefore(div, addBathGasButton);
            }
        } else {
            let div: HTMLDivElement = createFlexDiv(undefined, level1);
            let id: string = conditionsIDs.addID(cDiv.id, BathGas.tagName, 0);
            div.appendChild(createSelectElementBathGas(Array.from(getMoleculeKeys(molecules)), undefined, false, id));
            addRemoveButton(div, boundary1, (bathGas) => {
                bsDiv.removeChild(div);
                conditionsIDs.removeID(id);
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
function handlePTs(conditions: Conditions, cDiv: HTMLDivElement, xml_conditions: Element | null, 
    conditionsIDs: IDManager, molecules: Map<string, Molecule>): void {
    // PTs
    let moleculeKeys: Set<string> = getMoleculeKeys(molecules);
    // Create collapsible div.
    let pTsDivId: string = conditionsIDs.addID(cDiv.id, PTs.tagName);
    let pTsDiv: HTMLDivElement = createDiv(pTsDivId);
    let pTscDivId = conditionsIDs.addID(cDiv.id, pTsDivId, s_container);
    let pTscDiv: HTMLDivElement = getCollapsibleDiv(pTscDivId, cDiv, null, pTsDiv, PTs.tagName, boundary1, level1);
    let pTs: PTs = new PTs(new Map());
    if (xml_conditions) {
        let xml_PTss: HTMLCollectionOf<Element> = xml_conditions.getElementsByTagName(PTs.tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) {
                throw new Error("Expecting 1 " + PTs.tagName + " but finding " + xml_PTss.length + "!");
            }
            let attributes: Map<string, string> = getAttributes(xml_PTss[0]);
            let xml_PTpairs: HTMLCollectionOf<Element> = xml_PTss[0].getElementsByTagName(PTpair.tagName);
            if (xml_PTpairs.length == 0) {
                console.warn("Expecting 1 or more " + PTpair.tagName + " but finding 0! Please add some PTpairs in "
                + Conditions.tagName + " " + conditions.id + ".");
            } else {
                pTs = new PTs(attributes);
                for (let i = 0; i < xml_PTpairs.length; i++) {
                    let pTpairAttributes: Map<string, string> = getAttributes(xml_PTpairs[i]);
                    //console.log("pTpairAttributes=" + mapToString(pTpairAttributes));
                    let pTpair = new PTpair(pTpairAttributes);
                    pTs.add(pTpair);
                    // BathGas.
                    let xml_bathGass: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(BathGas.tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) {
                            console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        }
                        pTpair.setBathGas(new BathGas(getAttributes(xml_bathGass[0]),
                            getNodeValue(getFirstChildNode(xml_bathGass[0]))));
                    }
                    // ExperimentRate.
                    let xml_ers: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalRate.tagName);
                    if (xml_ers.length > 0) {
                        if (xml_ers.length > 1) {
                            console.warn("xml_experimentRates.length=" + xml_ers.length);
                        }
                        pTpair.setExperimentalRate(new ExperimentalRate(getAttributes(xml_ers[0]),
                            new Big(getNodeValue(getFirstChildNode(xml_ers[0])).trim())));
                    }
                    // ExperimentalYield.
                    let xml_eys: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalYield.tagName);
                    if (xml_eys.length > 0) {
                        if (xml_eys.length > 1) {
                            console.warn("xml_experimentalYields.length=" + xml_eys.length);
                        }
                        pTpair.setExperimentalYield(new ExperimentalYield(getAttributes(xml_eys[0]),
                            new Big(getNodeValue(getFirstChildNode(xml_eys[0])).trim())));
                    }
                    // ExperimentalEigenvalue.
                    let xml_ees: HTMLCollectionOf<Element> = xml_PTpairs[i].getElementsByTagName(ExperimentalEigenvalue.tagName);
                    if (xml_ees.length > 0) {
                        if (xml_ees.length > 1) {
                            console.warn("xml_experimentalEigenvalues.length=" + xml_ees.length);
                        }
                        pTpair.setExperimentalEigenvalue(new ExperimentalEigenvalue(getAttributes(xml_ees[0]),
                            new Big(getNodeValue(getFirstChildNode(xml_ees[0])).trim())));
                    }
                    // Create pTpairDiv.
                    pTsDiv.appendChild(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, i, moleculeKeys, level1));
                }
            }
        }
    }
    conditions.setPTs(pTs);
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = createDiv(undefined, level1);
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton: HTMLButtonElement = createButton(s_Add_sy_add, undefined, boundary1);
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', () => {
        // Create a new PTpair.
        let pTpairAttributes: Map<string, string> = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair: PTpair = new PTpair(pTpairAttributes);
        let pTpairIndex: number = pTs.add(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton: HTMLButtonElement = createButton(s_Add_from_spreadsheet, undefined, boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', () => {
        // Add a new text input for the user to paste the PTPairs.
        let div: HTMLDivElement = createFlexDiv(undefined, level1);
        let addFromSpreadsheetId = addRID(PTs.tagName, "addFromSpreadsheet");
        let input: HTMLInputElement = createInput("text", addFromSpreadsheetId, level1);
        div.appendChild(input);
        pTsDiv.insertBefore(div, pTsButtonsDiv);
        // Add an event listener to the inputElement.
        input.addEventListener('change', () => {
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray: string[] = input.value.split(" ");
                // Is there a header?
                let index: Map<string, number> = new Map();
                pTpairsArray[0].split("\t").forEach((value, i) => {
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for (let i = 1; i < pTpairsArray.length; i++) {
                    let pTpairArray: string[] = pTpairsArray[i].split("\t");
                    let pIndex: number = index.get("P") as number;
                    let p: Big = new Big(pTpairArray[pIndex]);
                    let unitsIndex: number = index.get("units") as number;
                    let pTpairAttributes: Map<string, string> = new Map();
                    if (index.has("units")) {
                        let units: string = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair: PTpair = new PTpair(pTpairAttributes);
                    pTs.add(pTpair);
                    let tIndex: number = index.get("T") as number;
                    let t: Big = new Big(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has(PTpair.s_excessReactantConc)) {
                        let excessReactantConIndex: number = index.get(PTpair.s_excessReactantConc) as number;
                        let excessReactantConc: string = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set(PTpair.s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has(PTpair.s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex: number = index.get(PTpair.s_percentExcessReactantConc) as number;
                        let percentExcessReactantConc: string = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set(PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has(PTpair.s_precision)) {
                        console.log("index.has(PTpair.s_precision)");
                        let precisionIndex: number = index.get(PTpair.s_precision) as number;
                        let precision: string = pTpairArray[precisionIndex];
                        pTpairAttributes.set(PTpair.s_precision, precision);
                        //console.log("precision=" + precision);
                    }
                    if (index.has(BathGas.tagName)) {
                        let bathGasIndex: number = index.get(BathGas.tagName) as number;
                        let bathGas: string = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new BathGas(new Map(), bathGas));
                    }
                    if (index.has(ExperimentalRate.tagName)) {
                        let eri: number = index.get(ExperimentalRate.tagName) as number;
                        let er: string = pTpairArray[eri];
                        if (er.length > 0) {
                            pTpairAttributes.set(ExperimentalRate.tagName, er);
                            pTpair.setExperimentalRate(new ExperimentalRate(new Map(), new Big(er)));
                            // Set the attributes of the experimentalRate.
                            // ref1.
                            let err1i = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref1) as number;
                            let err1 = pTpairArray[err1i];
                            pTpair.getExperimentalRate()?.setRef1(err1);
                            // ref2.
                            let err2i = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref2) as number;
                            let err2 = pTpairArray[err2i];
                            pTpair.getExperimentalRate()?.setRef2(err2);
                            // refReaction.
                            let errri = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_refReaction) as number;
                            let errr = pTpairArray[errri];
                            pTpair.getExperimentalRate()?.setRefReaction(errr);
                            // error.
                            let erei = index.get(ExperimentalRate.tagName + "_" + ExperimentalRate.s_error) as number;
                            let ere = pTpairArray[erei];
                            pTpair.getExperimentalRate()?.setError(new Big(ere));
                        }
                    }
                    if (index.has(ExperimentalYield.tagName)) {
                        let eyi: number = index.get(ExperimentalYield.tagName) as number;
                        let ey: string = pTpairArray[eyi];
                        if (ey.length > 0) {
                            pTpair.setExperimentalYield(new ExperimentalYield(new Map(), new Big(ey)));
                            // Set the attributes of the experimentalYield.
                            // ref.
                            let eyri = index.get(ExperimentalYield.tagName + "_" + ExperimentalYield.s_ref) as number;
                            let eyr = pTpairArray[eyri];
                            pTpair.getExperimentalYield()?.setRef(eyr);
                            // yieldTime.
                            let eyyti = index.get(ExperimentalYield.tagName + "_" + ExperimentalYield.s_yieldTime) as number;
                            let eyyt = pTpairArray[eyyti];
                            pTpair.getExperimentalYield()?.setYieldTime(new Big(eyyt));
                            // error.
                            let eyei = index.get(ExperimentalYield.tagName + "_" + ExperimentalYield.s_error) as number;
                            let eye = pTpairArray[eyei];
                            pTpair.getExperimentalYield()?.setError(new Big(eye));
                        }
                    }
                    if (index.has(ExperimentalEigenvalue.tagName)) {
                        let eei: number = index.get(ExperimentalEigenvalue.tagName) as number;
                        let ee: string = pTpairArray[eei];
                        if (ee.length > 0) {
                            pTpair.setExperimentalEigenvalue(new ExperimentalEigenvalue(new Map(), new Big(ee)));
                            // Set the attributes of the experimentalEigenvalue.
                            // EigenvalueID.
                            let eeeidi = index.get(ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_EigenvalueID) as number;
                            let eeeid = pTpairArray[eeeidi];
                            pTpair.getExperimentalEigenvalue()?.setEigenvalueID(eeeid);
                            // error.
                            let eeei = index.get(ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_error) as number;
                            let eee = pTpairArray[eeei];
                            pTpair.getExperimentalEigenvalue()?.setError(new Big(eee));
                        }
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex: number = pTs.ptps.length - 1;
                    // Create a new div for the PTpair.
                    pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, level1), pTsButtonsDiv);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton: HTMLButtonElement = createButton("Remove All", undefined, boundary1);
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener('click', () => {
        pTs.clear();
        // Remove all elements before the pTsButtonsDiv.
        let child: Node | null = pTsDiv.firstChild;
        while (child != null && child != pTsButtonsDiv) {
            let nextSibling: Node | null = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
}

/**
 * Create an add conditions button and append it to conditionssDiv.
 * @param conditionssDiv The conditionss div.
 * @param conditionsIDs The conditions IDs.
 * @param molecules The molecules.
 * @returns The button.
 */
export function createAddConditionsButton(conditionssDiv: HTMLDivElement, conditionsIDs: IDManager,
    molecules: Map<string, Molecule>): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event: MouseEvent) => {
        let i: number = mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        // Create collapsible div.
        let cDivID: string = addRID(Conditions.tagName, i.toString());
        let cDiv: HTMLDivElement = createDiv(cDivID, boundary1);
        let ccDivID = addRID(cDivID, s_container);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore: Element | null;
        if (i > 0) {
            let aboveElement = document.getElementById(getID(Conditions.tagName, (i - 1).toString(), s_container)) as Element;
            let nextElementSibling: Element | null = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) {
                    elementToInsertBefore = nextElementSibling;
                } else {
                    elementToInsertBefore = button;
                }
            } else {
                elementToInsertBefore = button;
            }
        } else {
            elementToInsertBefore = button;
        }
        let ccDiv: HTMLDivElement = getCollapsibleDiv(ccDivID, conditionssDiv, elementToInsertBefore, cDiv,
            Conditions.tagName + " " + i.toString(), boundary1, level1);
        // Add the conditions
        let conditions: Conditions = addConditions(new Map(), i);
        handleBathGases(conditions, cDiv, null, conditionsIDs, molecules);
        handlePTs(conditions, cDiv, null, conditionsIDs, molecules);
        // Add a remove conditions button.
        let removeButton: HTMLButtonElement = addRemoveButton(cDiv, level1, mesmer.removeConditions.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the conditions.
            remove(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    });
    return button;
}

/**
 * Add and return a new conditions.
 */
function addConditions(attributes: Map<string, string>, i: number): Conditions {
    let conditions: Conditions = new Conditions(attributes, i);
    mesmer.addConditions(conditions);
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
function createPTpairDiv(pTs: PTs, pTsDiv: HTMLDivElement, pTpair: PTpair, cDivID: string, pTIndex: number,
    moleculeKeys: Set<string>,
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let pTpairDiv: HTMLDivElement = createFlexDiv(addRID(pTsDiv.id, pTIndex), level);
    addPorT(pTpairDiv, PTpair.s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits(Mesmer.pressureUnits, pTpair.attributes, pTpairDiv, null, PTpair.tagName, PTpair.tagName, boundary1, level1);
    addPorT(pTpairDiv, PTpair.s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    //let id: string = conditionsIDs.addID(cDivID, pTsDiv.id, pTIndex.toString());

    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, addID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, PTpair.s_excessReactantConc, createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);

    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    addPercentExcessReactantConc(pTpairDiv, pTpair);

    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, addID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, PTpair.s_precision, createPrecisionSelectElement);
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
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, ExperimentalRate.tagName,
        (pTpair) => pTpair.getExperimentalRate(), createExperimentalRateDetails);

    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, addID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, ExperimentalYield.tagName,
        (pTpair) => pTpair.getExperimentalYield(), createExperimentalYieldDetails
    );

    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, addID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, ExperimentalEigenvalue.tagName,
        (pTpair) => pTpair.getExperimentalEigenvalue(), createExperimentalEigenvalueDetails
    );

    // Function to be used to remove a PTpair.
    let removePTpair: (pTpairDiv: HTMLDivElement, i: number | undefined, pTpair: PTpair) => void = (pTpairDiv, i, pTpair) => {
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) {
            pTs.remove(i);
        }
        pTpair.removeBathGas();
    };
    addRemoveButton(pTpairDiv, boundary1, removePTpair, pTpairDiv, pTIndex, pTpair);
    return pTpairDiv;
}

/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */
function addPorT(pTpairDiv: HTMLDivElement, name: string, getter: () => Big | undefined, setter: (value: Big) => void): void {
    let lwi: HTMLDivElement = createLabelWithInput("text", PTpair.tagName + "_" + name,
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            try {
                setter(new Big(target.value));
                console.log(`Set ${name} to ${target.value}`);
            } catch (e) {
                alert("Invalid input, resetting...");
                input.value = getValue(getter);
            }
            resizeInputElement(target);
        }, getValue(getter), name);
    let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
    input.value = getValue(getter);
    resizeInputElement(input);
    pTpairDiv.appendChild(lwi);
}

function getValue(getter: () => Big | undefined): string {
    let value: Big | undefined = getter();
    if (value !== undefined) {
        return value.toString();
    } else {
        return "";
    }
}

/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 */
function addPercentExcessReactantConc(pTpairDiv: HTMLDivElement, pTpair: PTpair): void {
    let id: string = addRID(pTpairDiv.id, PTpair.s_percentExcessReactantConc);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.appendChild(div);
    let attribute: string = PTpair.s_percentExcessReactantConc;
    let buttonTextContentSelected: string = attribute + sy_selected;
    let buttonTextContentDeselected: string = attribute + sy_deselected;
    let button = createButton(buttonTextContentDeselected, addRID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
        } else {
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
function addAttribute(pTpairDiv: HTMLDivElement, pTpair: PTpair, attribute: string,
    createInputElement: (id: string, pTpair: PTpair) => HTMLInputElement | HTMLSelectElement): void {
    let id: string = addRID(pTpairDiv.id, attribute);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected: string = attribute + sy_selected;
    let buttonTextContentDeselected: string = attribute + sy_deselected;
    let button = createButton(buttonTextContentDeselected, addRID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = addRID(id, s_input);
    if (pTpair.attributes.has(attribute)) {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        let input = createInputElement(iid, pTpair);
        div.insertBefore(input, button.nextSibling);
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = createInputElement(iid, pTpair);
            div.insertBefore(input, button.nextSibling);
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            remove(iid);
        }
    });
}

/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */
function addBathGas(pTpairDiv: HTMLDivElement, pTpair: PTpair, moleculeKeys: Set<string>): void {
    let id: string = addRID(pTpairDiv.id, BathGas.tagName);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.appendChild(div);
    let tagName: string = BathGas.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, addRID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = addRID(id, s_input);
    let bathGas: BathGas | undefined = pTpair.getBathGas();
    if (bathGas == undefined) {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) {
            console.warn("moleculeKeys does not contain " + bathGas.value);
        }
        div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            remove(iid);
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
function addExperimentalElement(pTpairDiv: HTMLDivElement, pTpair: PTpair, pTIndex: number, tagName: string,
    getAttribute: (pTpair: PTpair) => any, createElement: (id: string, pTpair: PTpair, i: number) => HTMLElement): void {
    let id: string = addRID(pTpairDiv.id, tagName);
    let div: HTMLDivElement = createDiv(id, boundary1);
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, addRID(id, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let iid = addRID(id, s_input);
    if (getAttribute(pTpair) == undefined) {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle(s_optionOff);
        button.textContent = buttonTextContentSelected;
        div.appendChild(createElement(iid, pTpair, pTIndex));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createElement(iid, pTpair, pTIndex));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            remove(iid);
        }
    });
}

/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */
function createPrecisionSelectElement(id: string, pTpair: PTpair): HTMLSelectElement {
    let value: string;
    if (pTpair.attributes.has(PTpair.s_precision)) {
        value = pTpair.attributes.get(PTpair.s_precision) as string;
    } else {
        value = Mesmer.precisionOptions[0];
    }
    let select: HTMLSelectElement = createSelectElement(Mesmer.precisionOptions, PTpair.s_precision, value, id, boundary1);
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        pTpair.setPrecision(target.value);
        console.log("Set " + PTpair.s_precision + " to " + target.value);
        resizeSelectElement(target);
    });
    resizeSelectElement(select);
    return select;
}

/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */
function createExcessReactantConcInputElement(id: string, pTpair: PTpair): HTMLInputElement {
    let input: HTMLInputElement = createInput("number", id, boundary1);
    let value: string;
    if (pTpair.attributes.has(PTpair.s_excessReactantConc)) {
        value = pTpair.attributes.get(PTpair.s_excessReactantConc) as string;
    } else {
        value = NaN.toString();
    }
    console.log(PTpair.s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + PTpair.s_excessReactantConc + " to " + target.value);
        resizeInputElement(target);
    });
    resizeInputElement(input);
    return input;
}

/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */
function createBathGasSelectElement(id: string, pTpair: PTpair, bathGas: BathGas | undefined, first: boolean,
    moleculeKeys: Set<string>): HTMLSelectElement {
    //console.log("createBathGasSelectElement");
    //console.log("pTpair " + pTpair.toString());
    let select: HTMLSelectElement = createSelectElementBathGas(Array.from(moleculeKeys), bathGas, first, id);
    //select.id = id;
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        pTpair.setBathGas(new BathGas(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        resizeSelectElement(target);
    });
    resizeSelectElement(select);
    return select;
}

/**
 * @param options The options.
 * @param bathGas The bath gas.
 * @param first True if this is the first selection, flase otherwise?
 * @param id The id used to generate other ids.
 */
function createSelectElementBathGas(options: string[], bathGas: BathGas | undefined, first: boolean, id: string): HTMLSelectElement {
    let value: string;
    if (first) {
        options.push(s_selectOption);
    } else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(s_selectOption);
        if (index > -1) {
            options.splice(index, 1);
        }
    }
    if (bathGas == undefined) {
        bathGas = new BathGas(new Map(), s_selectOption);
        value = s_selectOption;
    } else {
        value = bathGas.value;
    }
    let select: HTMLSelectElement = createSelectElement(options, BathGas.tagName, value, addRID(id, s_select), boundary1);
    select.classList.add(BathGas.tagName);
    selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        (bathGas as BathGas).value = target.value;
        console.log("Added " + target.value + " as " + BathGas.tagName);
        resizeSelectElement(target);
    });
    select.value = value;
    resizeSelectElement(select);
    return select;
}

/**
 * Create a div for the experimental rate details.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */
function createExperimentalRateDetails(id: string, pTpair: PTpair): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        id,
        pTpair => pTpair.getExperimentalRate(),
        (pTpair, value) => pTpair.setExperimentalRate(value),
        ExperimentalRate,
        [
            {
                tagName: ExperimentalRate.tagName, type: "number",
                eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalRate() as ExperimentalRate, target),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).value.toString()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref1, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef1(target.value),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getRef1()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_ref2, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRef2(target.value),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getRef2()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_refReaction, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setRefReaction(target.value),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getRefReaction()
            },
            {
                tagName: ExperimentalRate.tagName + "_" + ExperimentalRate.s_error, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalRate()?.setError(new Big(target.value)),
                valueGetter: () => (pTpair.getExperimentalRate() as ExperimentalRate).getError().toString()
            }
        ]
    );
}

/**
 * Create a div for the experimental yield details.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */
function createExperimentalYieldDetails(id: string, pTpair: PTpair): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        id,
        pTpair => pTpair.getExperimentalYield(),
        (pTpair, value) => pTpair.setExperimentalYield(value),
        ExperimentalYield,
        [
            {
                tagName: ExperimentalYield.tagName, type: "number",
                eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalYield() as ExperimentalYield, target),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).value.toString()
            },
            {
                tagName: ExperimentalYield.tagName + "_" + ExperimentalYield.s_ref, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalYield()?.setRef(target.value),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).getRef()
            },
            {
                tagName: ExperimentalYield.tagName + "_" + ExperimentalYield.s_yieldTime, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalYield()?.setYieldTime(new Big(target.value)),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).getYieldTime().toString()
            },
            {
                tagName: ExperimentalYield.tagName + "_" + ExperimentalYield.s_error, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalYield()?.setError(new Big(target.value)),
                valueGetter: () => (pTpair.getExperimentalYield() as ExperimentalYield).getError().toString()
            }
        ]
    );
}

/**
 * Create a div for the experimental eigenvalue.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */
function createExperimentalEigenvalueDetails(id: string, pTpair: PTpair): HTMLDivElement {
    return addExperimentalDetails(
        pTpair,
        id,
        pTpair => pTpair.getExperimentalEigenvalue(),
        (pTpair, value) => pTpair.setExperimentalEigenvalue(value),
        ExperimentalEigenvalue,
        [
            {
                tagName: ExperimentalEigenvalue.tagName, type: "number",
                eventHandler: (event, target) => setNumberNode(pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue, target),
                valueGetter: () => (pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue).value.toString()
            },
            {
                tagName: ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_EigenvalueID, type: "text",
                eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
                valueGetter: () => (pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue).getEigenvalueID()
            },
            {
                tagName: ExperimentalEigenvalue.tagName + "_" + ExperimentalEigenvalue.s_error, type: "number",
                eventHandler: (event, target) => pTpair.getExperimentalEigenvalue()?.setError(new Big(target.value)),
                valueGetter: () => (pTpair.getExperimentalEigenvalue() as ExperimentalEigenvalue).getError().toString()
            }
        ]
    );
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
function addExperimentalDetails<T extends ExperimentalRate | ExperimentalYield | ExperimentalEigenvalue>(
    pTpair: PTpair,
    id: string,
    getExperimental: (pTpair: PTpair) => T | undefined,
    setExperimental: (pTpair: PTpair, value: T) => void,
    ExperimentalClass: { new(attributes: Map<string, any>, value: Big): T },
    details: {
        tagName: string, type: string, eventHandler: (event: Event, target: HTMLInputElement) => void,
        valueGetter: () => string, label?: string
    }[]): HTMLDivElement {
    let div = createDiv(undefined, boundary1);
    div.id = id;
    let experimental: T | undefined = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), big0);
        setExperimental(pTpair, experimental);
    }
    for (let detail of details) {
        let detailId = id + "_" + detail.tagName;
        div.appendChild(createLabelWithInput(detail.type, detailId, boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            resizeInputElement(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}