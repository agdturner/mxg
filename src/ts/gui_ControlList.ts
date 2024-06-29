import Big from "big.js";
import { boundary1, s_container, level1, addRemoveButton, mesmer, remove, s_Add_sy_add, setNumberNode, 
    sy_selected, sy_deselected, s_optionOn, s_optionOff, s_input, s_selectOption, level0, big0, 
    selectAnotherOptionEventListener, IDManager } from "./app";
import { Control, ForceMacroDetailedBalance, CalculateRateCoefficientsOnly, PrintCellDOS, 
    PrintCellTransitionStateFlux, PrintReactionOperatorColumnSums, PrintGrainBoltzmann, PrintGrainDOS, 
    PrintGrainkbE, PrintGrainkfE, PrintTSsos, PrintGrainedSpeciesProfile, PrintGrainTransitionStateFlux, 
    PrintReactionOperatorSize, PrintSpeciesProfile, PrintPhenomenologicalEvolution, 
    PrintTunnelingCoefficients, PrintCrossingCoefficients, TestDOS, TestRateConstant, 
    UseTheSameCellNumberForAllConditions, Eigenvalues, ShortestTimeOfInterest, MaximumEvolutionTime, 
    AutomaticallySetMaxEne, DiagramEnergyOffset, CalcMethod, TestMicroRates, Tmax, Tmin, Tstep, 
    CalcMethodSimpleCalc, CalcMethodGridSearch, CalcMethodFitting, FittingIterations, CalcMethodMarquardt, 
    MarquardtIterations, MarquardtTolerance, MarquardtDerivDelta, CalcMethodAnalyticalRepresentation, 
    Format, Precision, ChebNumTemp, ChebNumConc, ChebMaxTemp, ChebMinTemp, ChebMaxConc, ChebMinConc, 
    ChebTExSize, ChebPExSize, CalcMethodThermodynamicTable, Tmid, CalcMethodSensitivityAnalysis, 
    SensitivityAnalysisSamples, SensitivityAnalysisOrder, SensitivityNumVarRedIters, 
    SensitivityVarRedMethod } from "./xml_control";
import { createDiv, getCollapsibleDiv, createFlexDiv, createLabel, createButton, createInput, 
    resizeInputElement, s_button, createLabelWithInput, createLabelWithSelect, resizeSelectElement, 
    createSelectElement } from "./html";
import { Mesmer } from "./xml_mesmer";
import { mapToString, getID, isNumeric } from "./util";
import { getAttributes, getNodeValue, getFirstChildNode } from "./xml";

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
export function processControl(xml: XMLDocument, controlIDM: IDManager): HTMLDivElement {
    console.log(Control.tagName);
    // Create a div for the controls.
    let controlsDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "me:control" element.
    let xml_controls: HTMLCollectionOf<Element> = xml.getElementsByTagName(Control.tagName);
    for (let i = 0; i < xml_controls.length; i++) {
        //console.log("Control " + i);
        let xml_control: Element = xml_controls[i];
        // Create a collapsible divfor the control.
        let cDivID: string = controlIDM.addID(Control.tagName, i.toString());
        let cDiv: HTMLDivElement = createDiv(cDivID, boundary1);
        controlsDiv.appendChild(cDiv);
        let ccDivID = controlIDM.addID(cDivID, s_container);
        let ccDiv: HTMLDivElement = getCollapsibleDiv(ccDivID, controlsDiv, null, cDiv, Control.tagName + " " + i.toString(),
            boundary1, level1);
        let control: Control = addControl(getAttributes(xml_control), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls: Map<string, HTMLButtonElement> = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, controlIDM, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv: HTMLDivElement = createFlexDiv(undefined, level1);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button: HTMLButtonElement) => {
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, controlIDM, null, level1);
        handleCalcMethod(control, cDiv, controlIDM, xml_control, level1);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, controlIDM, onOffControls, xml_control, level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // me:ForceMacroDetailedBalance
        let xml_fdb: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(ForceMacroDetailedBalance.tagName);
        if (xml_fdb.length == 1) {
            let fdb: ForceMacroDetailedBalance = new ForceMacroDetailedBalance();
            control.setForceMacroDetailedBalance(fdb);
            let fdbDiv: HTMLDivElement = createFlexDiv(controlIDM.addID(cDivID, ForceMacroDetailedBalance.tagName), level1);
            cDiv.appendChild(fdbDiv);
            let fdbl: HTMLLabelElement = createLabel(ForceMacroDetailedBalance.tagName, boundary1);
            fdbDiv.appendChild(fdbl);
        }
        // Add a remove control button.
        let removeButton: HTMLButtonElement = addRemoveButton(cDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the control.
            remove(ccDivID);
            controlIDM.removeIDs(cDivID);
            let divCmId = getID(cDivID, CalcMethod.tagName);
            controlIDM.removeIDs(divCmId);
            let divCmDetailsId = getID(divCmId, "details");
            controlIDM.removeIDs(divCmDetailsId);
            let divCmDetailsSelectId = getID(divCmDetailsId, "select");
            controlIDM.removeIDs(divCmDetailsSelectId);
        });
    }
    // Create an add button to add a control.
    createAddControlButton(controlsDiv, controlIDM);
    return controlsDiv;
}

/**
 * @param control The control.
 * @return An array of the on/off control options.
 */
function getControlOptionsSimple(control: Control): { class: any, setMethod: (value: any) => void, removeMethod: () => void }[] {
    return [
        { class: CalculateRateCoefficientsOnly, setMethod: control.setCalculateRateCoefficientsOnly, removeMethod: control.removeCalculateRateCoefficientsOnly },
        { class: PrintCellDOS, setMethod: control.setPrintCellDOS, removeMethod: control.removePrintCellDOS },
        { class: PrintCellTransitionStateFlux, setMethod: control.setPrintCellTransitionStateFlux, removeMethod: control.removePrintCellTransitionStateFlux },
        { class: PrintReactionOperatorColumnSums, setMethod: control.setPrintReactionOperatorColumnSums, removeMethod: control.removePrintReactionOperatorColumnSums },
        { class: PrintGrainBoltzmann, setMethod: control.setPrintGrainBoltzmann, removeMethod: control.removePrintGrainBoltzmann },
        { class: PrintGrainDOS, setMethod: control.setPrintGrainDOS, removeMethod: control.removePrintGrainDOS },
        { class: PrintGrainkbE, setMethod: control.setPrintGrainkbE, removeMethod: control.removePrintGrainkbE },
        { class: PrintGrainkfE, setMethod: control.setPrintGrainkfE, removeMethod: control.removePrintGrainkfE },
        { class: PrintTSsos, setMethod: control.setPrintTSsos, removeMethod: control.removePrintTSsos },
        { class: PrintGrainedSpeciesProfile, setMethod: control.setPrintGrainedSpeciesProfile, removeMethod: control.removePrintGrainedSpeciesProfile },
        { class: PrintGrainTransitionStateFlux, setMethod: control.setPrintGrainTransitionStateFlux, removeMethod: control.removePrintGrainTransitionStateFlux },
        { class: PrintReactionOperatorSize, setMethod: control.setPrintReactionOperatorSize, removeMethod: control.removePrintReactionOperatorSize },
        { class: PrintSpeciesProfile, setMethod: control.setPrintSpeciesProfile, removeMethod: control.removePrintSpeciesProfile },
        { class: PrintPhenomenologicalEvolution, setMethod: control.setPrintPhenomenologicalEvolution, removeMethod: control.removePrintPhenomenologicalEvolution },
        { class: PrintTunnelingCoefficients, setMethod: control.setPrintTunnelingCoefficients, removeMethod: control.removePrintTunnelingCoefficients },
        { class: PrintCrossingCoefficients, setMethod: control.setPrintCrossingCoefficients, removeMethod: control.removePrintCrossingCoefficients },
        { class: TestDOS, setMethod: control.setTestDOS, removeMethod: control.removeTestDOS },
        { class: TestRateConstant, setMethod: control.setTestRateConstants, removeMethod: control.removeTestRateConstants },
        { class: UseTheSameCellNumberForAllConditions, setMethod: control.setUseTheSameCellNumberForAllConditions, removeMethod: control.removeUseTheSameCellNumberForAllConditions },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        { class: ForceMacroDetailedBalance, setMethod: control.setForceMacroDetailedBalance, removeMethod: control.removeForceMacroDetailedBalance },
    ];
}

/**
 * @param control The control.
 * @return An array of the control items.
 */

function getControlItems(control: Control): { class: any, setMethod: (value: any) => void, removeMethod: () => void }[] {
    return [
        { class: Eigenvalues, setMethod: control.setEigenvalues, removeMethod: control.removeEigenvalues },
        { class: ShortestTimeOfInterest, setMethod: control.setShortestTimeOfInterest, removeMethod: control.removeShortestTimeOfInterest },
        { class: MaximumEvolutionTime, setMethod: control.setMaximumEvolutionTime, removeMethod: control.removeMaximumEvolutionTime },
        { class: AutomaticallySetMaxEne, setMethod: control.setAutomaticallySetMaxEne, removeMethod: control.removeAutomaticallySetMaxEne },
        { class: DiagramEnergyOffset, setMethod: control.setDiagramEnergyOffset, removeMethod: control.removeDiagramEnergyOffset },
    ];
}

/**
 * Create an add control button and append to controlsDiv.
 * @param controlsDiv The controls div.
 * @param controlIDM The control IDs.
 * @returns A button.
 */
export function createAddControlButton(controlsDiv: HTMLDivElement, controlIDM: IDManager): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    controlsDiv.appendChild(button);
    button.addEventListener('click', (event: MouseEvent) => {
        let i: number = mesmer.getNextControlID();
        console.log("Add Control " + i.toString());
        let cDivID: string = controlIDM.addID(Control.tagName, i.toString());
        let cDiv: HTMLDivElement = createDiv(cDivID, boundary1);
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore: Element | null;
        if (i > 0) {
            let aboveElement = document.getElementById(getID(Control.tagName, (i - 1).toString(), s_container)) as Element;
            let nextElementSibling: Element | null = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) {
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
        // Create a collapsible div for each conditions.
        let ccDivID = controlIDM.addID(cDivID, s_container);
        let ccDiv: HTMLDivElement = getCollapsibleDiv(ccDivID, controlsDiv, elementToInsertBefore, cDiv, Control.tagName + " " + i.toString(),
            boundary1, level1);
        // Add the control
        let control: Control = addControl(new Map(), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls: Map<string, HTMLButtonElement> = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, controlIDM, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv: HTMLDivElement = createFlexDiv(undefined, level1);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button: HTMLButtonElement) => {
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, controlIDM, null, level1);
        handleCalcMethod(control, cDiv, controlIDM, null, level1);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, controlIDM, onOffControls, null, level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton: HTMLButtonElement = addRemoveButton(cDiv, level1, mesmer.removeControl.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the control.
            remove(ccDivID);
            controlIDM.removeIDs(cDivID);
            let divCmId = getID(cDivID, CalcMethod.tagName);
            controlIDM.removeIDs(divCmId);
            let divCmDetailsId = getID(divCmId, "details");
            controlIDM.removeIDs(divCmDetailsId);
            let divCmDetailsSelectId = getID(divCmDetailsId, "select");
            controlIDM.removeIDs(divCmDetailsSelectId);
        });
    });
    return button;
}

/**
 * Add and return a new control.
 */
function addControl(attributes: Map<string, string>, i: number): Control {
    let control: Control = new Control(attributes, i);
    mesmer.addControl(control);
    return control;
}

/**
 * @param control The control.
 * @param div The div.
 * @param obj The object.
 * @param setControlMethod The set control method. 
 * @param id The id for the input.
 * @param valueString The value string.
 */
function createInputControlItem(control: Control, div: HTMLDivElement, obj: any,
    setControlMethod: (value: any) => void, id: string, valueString: string) {
    setControlMethod.call(control, obj);
    let input: HTMLInputElement = createInput("number", id, boundary1);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(obj, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    div.appendChild(input);
}

/**
 * 
 * @param control The control.
 * @param cDiv The control div.
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */
function handleControl(control: Control, cDiv: HTMLDivElement, controlIDs: IDManager, onOffControls: Map<string, HTMLButtonElement> | null,
    xml_control: Element | null, level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string } | null,
    ControlClass: any, setControlMethod: (value: any) => void, removeControlMethod: () => void, handleInput: boolean = false): void {
    let tagName: string = ControlClass.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    if (onOffControls) {
        onOffControls.set(tagName, button);
    }
    let controlInstance: any;
    let div: HTMLDivElement;
    let id: string;

    if (level) {
        id = controlIDs.addID(cDiv.id, tagName);
        div = createFlexDiv(id, level);
        cDiv.appendChild(div);
        div.appendChild(button);
        id = controlIDs.addID(cDiv.id, id, s_input);
    }

    if (xml_control) {
        let xml: HTMLCollectionOf<Element> = xml_control!.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = getNodeValue(getFirstChildNode(xml[0]));
                let value: Big;
                // Deal with the special case of eigenvalues, which can take either numerical or string values.
                value = (valueString == "all") ? new Big(0) : new Big(valueString);
                controlInstance = new ControlClass(getAttributes(xml[0]), value);
                createInputControlItem(control, div!, controlInstance, setControlMethod, id!, valueString);
            } else {
                controlInstance = new ControlClass(getAttributes(xml[0]));
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(s_optionOff);
        } else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    } else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }

    button.addEventListener('click', (event: MouseEvent) => {
        if (!control.index.has(tagName)) {
            if (handleInput) {
                createInputControlItem(control, div!, controlInstance, setControlMethod, id!, "");
            } else {
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
        } else {
            if (handleInput) {
                remove(id!);
            }
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
}

/**
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control. 
 * @param level The level.
 */
function handleCalcMethod(control: Control, cDiv: HTMLDivElement, controlIDM: IDManager, xml_control: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {
    //console.log("handleCalcMethod " + (xml_control == null));
    let div: HTMLDivElement = createFlexDiv(undefined, level);
    cDiv.appendChild(div);
    let tagName: string = CalcMethod.tagName;
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = controlIDM.addID(cDiv.id, tagName);
    let divCm: HTMLDivElement = createFlexDiv(divCmId, boundary1);
    div.appendChild(divCm);
    let options: string[] = CalcMethod.options;
    let divCmDetailsId = controlIDM.addID(divCmId, "details");
    let divCmDetailsSelectId = controlIDM.addID(divCmDetailsId, "select");
    let cm: CalcMethod;
    let first: boolean = true;
    if (xml_control != null) {
        //let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagNameNS("http://www.chem.leeds.ac.uk/mesmer", "calcMethod");
        let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
        //console.log("xml.length " + xml.length);
        if (xml.length > 0) {
            if (xml.length > 1) {
                throw new Error("More than one CalcMethod element.");
            }
            let attributes: Map<string, string> = getAttributes(xml[0]);
            let xsi_type: string = attributes.get("xsi:type") as string;
            cm = getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }

    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                if (options[options.length - 1] != s_selectOption) {
                    options.push(s_selectOption);
                }
            }
            // Remove select.
            //remove(divCmId);
            controlIDM.removeIDs(divCmDetailsId);
            controlIDM.removeIDs(divCmDetailsSelectId);
            // Create the select element.
            let select: HTMLSelectElement = createSelectElementCalcMethod(controlIDM, control, div, options, tagName, s_selectOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(s_optionOn)
            button.classList.toggle(s_optionOff);
        } else {
            if (control.getCalcMethod() != null) {
                control.removeCalcMethod();
                // Remove any existing div.
                //remove(divCmId);
                controlIDM.removeIDs(divCmDetailsId);
                //console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
                //console.log("button.textContent " + button.textContent);
                controlIDM.removeIDs(divCmDetailsSelectId);
                button.textContent = buttonTextContentDeselected;
                button.classList.toggle(s_optionOn)
                button.classList.toggle(s_optionOff);
            }
        }
    });
}

/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */
function handleTestMicroRates(control: Control, cDiv: HTMLDivElement, controlIDM: IDManager, xml_control: Element | null,
    level: { marginLeft?: string; marginTop?: string; marginBottom?: string; marginRight?: string }): void {
    let tagName: string = TestMicroRates.tagName;
    let divID = controlIDM.addID(cDiv.id, tagName);
    let div: HTMLDivElement = createFlexDiv(divID, level);
    cDiv.appendChild(div);
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(tagName, controlIDM.addID(cDiv.id, tagName, s_button), boundary1);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let idTmax = controlIDM.addID(cDiv.id, tagName, Tmax.tagName);
    let idTmin = controlIDM.addID(cDiv.id, tagName, Tmin.tagName);
    let idTstep = controlIDM.addID(cDiv.id, tagName, Tstep.tagName);
    if (xml_control) {
        let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle(s_optionOff);
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle(s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle(s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
}

/**
 * @param control The control.
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 */
function createTestMicroRates(control: Control, div: HTMLDivElement, xml_tmr: HTMLCollectionOf<Element> | null,
    idTmax: string, idTmin: string, idTstep: string): void {
    let attributes: Map<string, string>;
    let tmr: TestMicroRates;
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) {
            throw new Error("More than one TestMicroRates element.");
        }
        attributes = getAttributes(xml_tmr[0]);
        tmr = new TestMicroRates(attributes);
    } else {
        attributes = new Map<string, string>();
        attributes.set("Tmax", "0"); // These should load from some kind of default...
        attributes.set("Tmin", "0");
        attributes.set("Tstep", "0");
        tmr = new TestMicroRates(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax: Big = tmr.getTmax();
    let tMaxlwi: HTMLDivElement = createLabelWithInput("text", idTmax + "_input",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            try {
                tmr.setTmax(new Big(target.value));
                console.log("Set Tmax to " + target.value);
            } catch (e) {
                alert("Invalid input, resetting...");
                target.value = tMax.toString();
            }
            resizeInputElement(target);
        }, tMax.toString(), "Tmax");
    tMaxlwi.id = idTmax;
    resizeInputElement(tMaxlwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin: Big = tmr.getTmin();
    let tMinlwi: HTMLDivElement = createLabelWithInput("number", idTmin + "_input",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmr.setTmin(new Big(target.value));
                console.log("Set Tmin to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = tMin.toString();
            }
            resizeInputElement(target);
        }, tMin.toString(), "Tmin");
    tMinlwi.id = idTmin;
    resizeInputElement(tMinlwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep: Big = tmr.getTstep();
    let tSteplwi: HTMLDivElement = createLabelWithInput("text", idTstep + "_input",
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                tmr.setTstep(new Big(target.value));
                console.log("Set Tstep to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = tStep.toString();
            }
            resizeInputElement(target);
        }, tStep.toString(), "Tstep");
    tSteplwi.id = idTstep;
    resizeInputElement(tSteplwi.querySelector('input') as HTMLInputElement);
    div.appendChild(tSteplwi);
}

/**
 * Get the CalcMethod from the XML.
 * @param control The control.
 * @param divCm The div cm.
 * @param xml The xml.
 * @param options The options.
 * @param attributes The attributes.
 * @param tagName The tag name.
 * @param xsi_type The xsi:type.
 * @param divCmDetailsId The div cm details id.
 * @param divCmDetailsSelectId The div cm details select id.
 * @returns The CalcMethod.
 */
function getCalcMethod(controlIDM: IDManager, control: Control, divCm: HTMLDivElement, xml: HTMLCollectionOf<Element>, options: string[],
    attributes: Map<string, string>, tagName: string, xsi_type: string,
    divCmDetailsId: string, divCmDetailsSelectId: string): CalcMethod {
    //console.log("getCalcMethod");
    let cm: CalcMethod;
    // Create the select element.
    let select: HTMLSelectElement = createSelectElementCalcMethod(controlIDM, control, divCm, options, tagName, xsi_type, divCmDetailsId,
        divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails: HTMLDivElement = createFlexDiv(divCmDetailsId, boundary1);
    divCm.appendChild(divCmDetails);
    if (xsi_type == CalcMethodSimpleCalc.xsi_type || xsi_type == CalcMethodSimpleCalc.xsi_type2) {
        //console.log("CalcMethodSimpleCalc");
        cm = new CalcMethodSimpleCalc(attributes);
    } else if (xsi_type == CalcMethodGridSearch.xsi_type || xsi_type == CalcMethodGridSearch.xsi_type2) {
        cm = new CalcMethodGridSearch(attributes);
    } else if (xsi_type == CalcMethodFitting.xsi_type || xsi_type == CalcMethodFitting.xsi_type2) {
        let cmf: CalcMethodFitting = new CalcMethodFitting(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(FittingIterations.tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value: Big = new Big(getNodeValue(getFirstChildNode(fi_xml[0])));
                let fittingIterations: FittingIterations = new FittingIterations(getAttributes(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            } else {
                throw new Error("More than one FittingIterations element.");
            }
        }
        processCalcMethodFitting(divCmDetails, cmf);
    } else if (xsi_type == CalcMethodMarquardt.xsi_type || xsi_type == CalcMethodMarquardt.xsi_type2) {
        let cmm: CalcMethodMarquardt = new CalcMethodMarquardt(attributes);
        cm = cmm;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = MarquardtIterations.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: Big = new Big(getNodeValue(getFirstChildNode(elementXml[0])));
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, MarquardtIterations, cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, MarquardtTolerance, cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, MarquardtDerivDelta, cmm.setMarquardtDerivDelta.bind(cmm));
        processCalcMethodMarquardt(divCmDetails, cmm);
    } else if (xsi_type == CalcMethodAnalyticalRepresentation.xsi_type || xsi_type == CalcMethodAnalyticalRepresentation.xsi_type2) {
        let cmar: CalcMethodAnalyticalRepresentation = new CalcMethodAnalyticalRepresentation(attributes);
        cm = cmar;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void, isNumber: boolean) {
            let tagName: string = ClassConstructor.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: any = getNodeValue(getFirstChildNode(elementXml[0]));
                    if (isNumber) {
                        if (value != undefined) {
                            if (value != "" && value != "NaN") {
                                value = new Big(value);
                            }
                        }
                    }
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, Format, cmar.setFormat.bind(cmar), false);
        processElement(xml, Precision, cmar.setPrecision.bind(cmar), false);
        processElement(xml, ChebNumTemp, cmar.setChebNumTemp.bind(cmar), true);
        processElement(xml, ChebNumConc, cmar.setChebNumConc.bind(cmar), true);
        processElement(xml, ChebMaxTemp, cmar.setChebMaxTemp.bind(cmar), true);
        processElement(xml, ChebMinTemp, cmar.setChebMinTemp.bind(cmar), true);
        processElement(xml, ChebMaxConc, cmar.setChebMaxConc.bind(cmar), true);
        processElement(xml, ChebMinConc, cmar.setChebMinConc.bind(cmar), true);
        processElement(xml, ChebTExSize, cmar.setChebTExSize.bind(cmar), true);
        processElement(xml, ChebPExSize, cmar.setChebPExSize.bind(cmar), true);
        processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    } else if (xsi_type == CalcMethodThermodynamicTable.xsi_type || xsi_type == CalcMethodThermodynamicTable.xsi_type2) {
        let cmtt: CalcMethodThermodynamicTable = new CalcMethodThermodynamicTable(attributes);
        cm = cmtt;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = ClassConstructor.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: Big = new Big(getNodeValue(getFirstChildNode(elementXml[0])));
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, Tmin, cmtt.setTmin.bind(cmtt));
        processElement(xml, Tmid, cmtt.setTmid.bind(cmtt));
        processElement(xml, Tmax, cmtt.setTmax.bind(cmtt));
        processElement(xml, Tstep, cmtt.setTstep.bind(cmtt));
        processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    } else if (xsi_type == CalcMethodSensitivityAnalysis.xsi_type || xsi_type == CalcMethodSensitivityAnalysis.xsi_type2) {
        let cmsa: CalcMethodSensitivityAnalysis = new CalcMethodSensitivityAnalysis(attributes);
        cm = cmsa;
        function processElement(xml: HTMLCollectionOf<Element>, ClassConstructor: any, setterMethod: (value: any) => void) {
            let tagName: string = ClassConstructor.tagName;
            let elementXml: HTMLCollectionOf<Element> = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value: any = getNodeValue(getFirstChildNode(elementXml[0]));
                    if (value != undefined) {
                        value = new Big(value);
                    }
                    let instance = new ClassConstructor(getAttributes(elementXml[0]), value);
                    setterMethod(instance);
                } else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, SensitivityAnalysisSamples, cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement(xml, SensitivityAnalysisOrder, cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement(xml, SensitivityNumVarRedIters, cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement(xml, SensitivityVarRedMethod, cmsa.setSensitivityVarRedMethod.bind(cmsa));
        processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    } else {
        // If there is a name attribute instead, try this in place of the xsi:type.
        let name: string | undefined = attributes.get("name");
        if (name != undefined && name !== xsi_type) {
            attributes.set("xsi:type", name);
            console.warn(`Using name attribute as xsi:type: ${name}`);
            return getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, name, divCmDetailsId,
                divCmDetailsSelectId);
        } else {
            throw new Error(`Unable to determine calculation method for xsi_type: ${xsi_type}`);
        }
    }
    return cm;
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */
function processCalcMethodFitting(divCmDetails: HTMLDivElement, cm: CalcMethodFitting) {
    // FittingIterations.
    let fi: MarquardtIterations = cm.getFittingIterations() || new FittingIterations(new Map(), big0);
    cm.setFittingIterations(fi);
    divCmDetails.appendChild(createLabelWithInput("number", getID(divCmDetails.id, FittingIterations.tagName, s_input),
        boundary1, level0, (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                fi.value = new Big(target.value);
                console.log("Set FittingIterations to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = fi.value.toString();
            }
            resizeInputElement(target);
        }, fi.value.toString(), FittingIterations.tagName));
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */
function processCalcMethodMarquardt(divCmDetails: HTMLDivElement, cm: CalcMethodMarquardt) {
    function createLabelWithInputForObject(obj: { value: Big, tagName: string }, divCmDetails: HTMLElement,
        boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
        level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }) {
        let id = getID(divCmDetails.id, obj.tagName, s_input);
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event: Event) => {
            let target = event.target as HTMLInputElement;
            // Check the value is a number.
            if (isNumeric(target.value)) {
                obj.value = new Big(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            resizeInputElement(target);
        };
        divCmDetails.appendChild(createLabelWithInput("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let mi: MarquardtIterations = cm.getMarquardtIterations() || new MarquardtIterations(new Map(), big0);
    cm.setMarquardtIterations(mi);
    createLabelWithInputForObject(mi, divCmDetails, boundary1, level0);
    // MarquardtTolerance.
    let mt: MarquardtTolerance = cm.getMarquardtTolerance() || new MarquardtTolerance(new Map(), big0);
    cm.setMarquardtTolerance(mt);
    createLabelWithInputForObject(mt, divCmDetails, boundary1, level0);
    // MarquardtDerivDelta.
    let mdd: MarquardtDerivDelta = cm.getMarquardtDerivDelta() || new MarquardtDerivDelta(new Map(), big0);
    cm.setMarquardtDerivDelta(mdd);
    createLabelWithInputForObject(mdd, divCmDetails, boundary1, level0);
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */
function processCalcMethodAnalyticalRepresentation(divCmDetails: HTMLDivElement, cm: CalcMethodAnalyticalRepresentation) {
    // "me:format".
    let format: Format = cm.getFormat() || new Format(new Map(), Format.options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string, options: string[]) {
        let element: any = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement: HTMLDivElement = createLabelWithSelect(tagName, options, tagName, element.value,
            divCmDetails.id, boundary1, boundary1);
        lwsElement.querySelector('select')?.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            resizeSelectElement(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement(Format, cm.getFormat.bind(cm), cm.setFormat.bind(cm), Format.tagName, Format.options);
    processSelectElement(Format, () => format.getRateUnits(), format.setRateUnits.bind(format), Format.rateUnits, Format.rateUnitsOptions);
    processSelectElement(Precision, cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), Precision.tagName, Mesmer.precisionOptions);
    // "me:chebNumTemp", "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string) {
        let element: any = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild(createLabelWithInput("text", divCmDetails.id + `_${tagName}_input`, boundary1, level0,
            handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement(ChebNumTemp, cm.getChebNumTemp.bind(cm), cm.setChebNumTemp.bind(cm), ChebNumTemp.tagName);
    processElement(ChebNumConc, cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), ChebNumConc.tagName);
    processElement(ChebMaxTemp, cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), ChebMaxTemp.tagName);
    processElement(ChebMinTemp, cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), ChebMinTemp.tagName);
    processElement(ChebMaxConc, cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), ChebMaxConc.tagName);
    processElement(ChebMinConc, cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), ChebMinConc.tagName);
    processElement(ChebTExSize, cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), ChebTExSize.tagName);
    processElement(ChebPExSize, cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), ChebPExSize.tagName);
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */
function processCalcMethodThermodynamicTable(divCmDetails: HTMLDivElement, cm: CalcMethodThermodynamicTable) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string) {
        let element: any = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild(createLabelWithInput("text", divCmDetails.id + `_${tagName}_input`, boundary1, level0,
            handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement(Tmin, cm.getTmin.bind(cm), cm.setTmin.bind(cm), Tmin.tagName);
    processElement(Tmid, cm.getTmid.bind(cm), cm.setTmid.bind(cm), Tmid.tagName);
    processElement(Tmax, cm.getTmax.bind(cm), cm.setTmax.bind(cm), Tmax.tagName);
    processElement(Tstep, cm.getTstep.bind(cm), cm.setTstep.bind(cm), Tstep.tagName);
}

function handleEvent(element: any, tagName: string): (event: Event) => void {
    return (event: Event) => {
        let target = event.target as HTMLInputElement;
        try {
            element.value = new Big(target.value);
        } catch (e) {
            alert("Invalid input value " + target.value + " , resetting...");
            target.value = element.value.toString();
        }
        resizeInputElement(target);
    };
}

/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */
function processCalcMethodSensitivityAnalysis(divCmDetails: HTMLDivElement, cm: CalcMethodSensitivityAnalysis) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor: any, getter: () => any, setter: (value: any) => void, tagName: string) {
        let element: any = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild(createLabelWithInput("text", getID(divCmDetails.id, tagName, s_input), boundary1, level0,
            handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processNumberElement(SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), SensitivityAnalysisSamples.tagName);
    processNumberElement(SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), SensitivityAnalysisOrder.tagName);
    processNumberElement(SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod: SensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName: string = SensitivityVarRedMethod.tagName;
    divCmDetails.appendChild(createLabelWithSelect(tagName, SensitivityVarRedMethod.options, tagName, SensitivityVarRedMethod.options[0],
        getID(divCmDetails.id, tagName, 'select'), boundary1, boundary1));
    // Add event listener for the select element.
    let select: HTMLSelectElement = divCmDetails.querySelector('select') as HTMLSelectElement;
    select?.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLSelectElement;
        sensitivityVarRedMethod.value = target.value;
        console.log(tagName + " set to " + target.value);
        resizeSelectElement(target);
    });
}

/**
 * @param control The control.
 * @param div The div. 
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param id The id for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */
function createSelectElementCalcMethod(controlIDM: IDManager, control: Control, div: HTMLDivElement, options: string[],
    tagName: string, value: string, divCmDetailsId: string, divCmDetailsSelectId: string): HTMLSelectElement {
    let select: HTMLSelectElement = createSelectElement(options, tagName, value, divCmDetailsSelectId, boundary1);
    div.appendChild(select);
    selectAnotherOptionEventListener(options, select);
    select.addEventListener('change', (event: Event) => {
        // Remove any existing div.
        let divCmDetails: HTMLDivElement = document.getElementById(divCmDetailsId) as HTMLDivElement;
        if (divCmDetails != null) {
            divCmDetails.remove();
            controlIDM.removeIDs(divCmDetailsId);
        }
        divCmDetails = createFlexDiv(divCmDetailsId, boundary1);
        div.appendChild(divCmDetails);
        let target = event.target as HTMLSelectElement;
        let value: string = target.value;
        let attributes: Map<string, string> = new Map();
        attributes.set("xsi:type", value);
        if (value == CalcMethodSimpleCalc.xsi_type || value == CalcMethodSimpleCalc.xsi_type2) {
            // "me:simpleCalc", "simpleCalc".
            control.setCalcMethod(new CalcMethodSimpleCalc(attributes));
        } else if (value == CalcMethodGridSearch.xsi_type || value == CalcMethodGridSearch.xsi_type2) {
            // "me:gridSearch", "gridSearch".
            control.setCalcMethod(new CalcMethodGridSearch(attributes));
        } else if (value == CalcMethodFitting.xsi_type || value == CalcMethodFitting.xsi_type2) {
            let cm: CalcMethodFitting = new CalcMethodFitting(attributes);
            control.setCalcMethod(cm);
            processCalcMethodFitting(divCmDetails, cm);
        } else if (value == CalcMethodMarquardt.xsi_type || value == CalcMethodMarquardt.xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm: CalcMethodMarquardt = new CalcMethodMarquardt(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(divCmDetails, cm);
        } else if (value == CalcMethodAnalyticalRepresentation.xsi_type || value == CalcMethodAnalyticalRepresentation.xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm: CalcMethodAnalyticalRepresentation = new CalcMethodAnalyticalRepresentation(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        } else if (value == CalcMethodThermodynamicTable.xsi_type || value == CalcMethodThermodynamicTable.xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm: CalcMethodThermodynamicTable = new CalcMethodThermodynamicTable(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(divCmDetails, cm);
        } else if (value == CalcMethodSensitivityAnalysis.xsi_type || value == CalcMethodSensitivityAnalysis.xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm: CalcMethodSensitivityAnalysis = new CalcMethodSensitivityAnalysis(new Map());
            control.setCalcMethod(cm);
            processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        } else {
            throw new Error("Unknown CalcMethod type.");
        }
        resizeSelectElement(target);
    });
    return select;
}