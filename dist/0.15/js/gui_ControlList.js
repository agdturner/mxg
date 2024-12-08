"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processControl = processControl;
exports.createAddControlButton = createAddControlButton;
const big_js_1 = __importDefault(require("big.js"));
const app_1 = require("./app");
const xml_control_1 = require("./xml_control");
const html_1 = require("./html");
const xml_mesmer_1 = require("./xml_mesmer");
const util_1 = require("./util");
const xml_1 = require("./xml");
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
function processControl(xml, controlIDM) {
    console.log(xml_control_1.Control.tagName);
    // Create a div for the controls.
    let controlsDiv = (0, html_1.createDiv)(undefined, app_1.boundary1);
    // Get the XML "me:control" element.
    let xml_controls = xml.getElementsByTagName(xml_control_1.Control.tagName);
    for (let i = 0; i < xml_controls.length; i++) {
        //console.log("Control " + i);
        let xml_control = xml_controls[i];
        // Create a collapsible divfor the control.
        let cDivID = controlIDM.addID(xml_control_1.Control.tagName, i.toString());
        let cDiv = (0, html_1.createDiv)(cDivID, app_1.boundary1);
        controlsDiv.appendChild(cDiv);
        let ccDivID = controlIDM.addID(cDivID, app_1.s_container);
        let ccDiv = (0, html_1.getCollapsibleDiv)(ccDivID, controlsDiv, null, cDiv, xml_control_1.Control.tagName + " " + i.toString(), app_1.boundary1, app_1.level1);
        let control = addControl((0, xml_1.getAttributes)(xml_control), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, controlIDM, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, html_1.createFlexDiv)(undefined, app_1.level1);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button) => {
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, controlIDM, null, app_1.level1);
        handleCalcMethod(control, cDiv, controlIDM, xml_control, app_1.level1);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, controlIDM, onOffControls, xml_control, app_1.level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // me:ForceMacroDetailedBalance
        let xml_fdb = xml_control.getElementsByTagName(xml_control_1.ForceMacroDetailedBalance.tagName);
        if (xml_fdb.length == 1) {
            let fdb = new xml_control_1.ForceMacroDetailedBalance();
            control.setForceMacroDetailedBalance(fdb);
            let fdbDiv = (0, html_1.createFlexDiv)(controlIDM.addID(cDivID, xml_control_1.ForceMacroDetailedBalance.tagName), app_1.level1);
            cDiv.appendChild(fdbDiv);
            let fdbl = (0, html_1.createLabel)(xml_control_1.ForceMacroDetailedBalance.tagName, app_1.boundary1);
            fdbDiv.appendChild(fdbl);
        }
        // Add a remove control button.
        let removeButton = (0, app_1.addRemoveButton)(cDiv, app_1.level1, app_1.mesmer.removeControl.bind(app_1.mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, app_1.remove)(ccDivID);
            controlIDM.removeIDs(cDivID);
            let divCmId = (0, util_1.getID)(cDivID, xml_control_1.CalcMethod.tagName);
            controlIDM.removeIDs(divCmId);
            let divCmDetailsId = (0, util_1.getID)(divCmId, "details");
            controlIDM.removeIDs(divCmDetailsId);
            let divCmDetailsSelectId = (0, util_1.getID)(divCmDetailsId, "select");
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
function getControlOptionsSimple(control) {
    return [
        { class: xml_control_1.CalculateRateCoefficientsOnly, setMethod: control.setCalculateRateCoefficientsOnly, removeMethod: control.removeCalculateRateCoefficientsOnly },
        { class: xml_control_1.PrintCellDOS, setMethod: control.setPrintCellDOS, removeMethod: control.removePrintCellDOS },
        { class: xml_control_1.PrintCellTransitionStateFlux, setMethod: control.setPrintCellTransitionStateFlux, removeMethod: control.removePrintCellTransitionStateFlux },
        { class: xml_control_1.PrintReactionOperatorColumnSums, setMethod: control.setPrintReactionOperatorColumnSums, removeMethod: control.removePrintReactionOperatorColumnSums },
        { class: xml_control_1.PrintGrainBoltzmann, setMethod: control.setPrintGrainBoltzmann, removeMethod: control.removePrintGrainBoltzmann },
        { class: xml_control_1.PrintGrainDOS, setMethod: control.setPrintGrainDOS, removeMethod: control.removePrintGrainDOS },
        { class: xml_control_1.PrintGrainkbE, setMethod: control.setPrintGrainkbE, removeMethod: control.removePrintGrainkbE },
        { class: xml_control_1.PrintGrainkfE, setMethod: control.setPrintGrainkfE, removeMethod: control.removePrintGrainkfE },
        { class: xml_control_1.PrintTSsos, setMethod: control.setPrintTSsos, removeMethod: control.removePrintTSsos },
        { class: xml_control_1.PrintGrainedSpeciesProfile, setMethod: control.setPrintGrainedSpeciesProfile, removeMethod: control.removePrintGrainedSpeciesProfile },
        { class: xml_control_1.PrintGrainTransitionStateFlux, setMethod: control.setPrintGrainTransitionStateFlux, removeMethod: control.removePrintGrainTransitionStateFlux },
        { class: xml_control_1.PrintReactionOperatorSize, setMethod: control.setPrintReactionOperatorSize, removeMethod: control.removePrintReactionOperatorSize },
        { class: xml_control_1.PrintSpeciesProfile, setMethod: control.setPrintSpeciesProfile, removeMethod: control.removePrintSpeciesProfile },
        { class: xml_control_1.PrintPhenomenologicalEvolution, setMethod: control.setPrintPhenomenologicalEvolution, removeMethod: control.removePrintPhenomenologicalEvolution },
        { class: xml_control_1.PrintTunnelingCoefficients, setMethod: control.setPrintTunnelingCoefficients, removeMethod: control.removePrintTunnelingCoefficients },
        { class: xml_control_1.PrintCrossingCoefficients, setMethod: control.setPrintCrossingCoefficients, removeMethod: control.removePrintCrossingCoefficients },
        { class: xml_control_1.TestDOS, setMethod: control.setTestDOS, removeMethod: control.removeTestDOS },
        { class: xml_control_1.TestRateConstant, setMethod: control.setTestRateConstants, removeMethod: control.removeTestRateConstants },
        { class: xml_control_1.UseTheSameCellNumberForAllConditions, setMethod: control.setUseTheSameCellNumberForAllConditions, removeMethod: control.removeUseTheSameCellNumberForAllConditions },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        { class: xml_control_1.ForceMacroDetailedBalance, setMethod: control.setForceMacroDetailedBalance, removeMethod: control.removeForceMacroDetailedBalance },
    ];
}
/**
 * @param control The control.
 * @return An array of the control items.
 */
function getControlItems(control) {
    return [
        { class: xml_control_1.Eigenvalues, setMethod: control.setEigenvalues, removeMethod: control.removeEigenvalues },
        { class: xml_control_1.ShortestTimeOfInterest, setMethod: control.setShortestTimeOfInterest, removeMethod: control.removeShortestTimeOfInterest },
        { class: xml_control_1.MaximumEvolutionTime, setMethod: control.setMaximumEvolutionTime, removeMethod: control.removeMaximumEvolutionTime },
        { class: xml_control_1.AutomaticallySetMaxEne, setMethod: control.setAutomaticallySetMaxEne, removeMethod: control.removeAutomaticallySetMaxEne },
        { class: xml_control_1.DiagramEnergyOffset, setMethod: control.setDiagramEnergyOffset, removeMethod: control.removeDiagramEnergyOffset },
    ];
}
/**
 * Create an add control button and append to controlsDiv.
 * @param controlsDiv The controls div.
 * @param controlIDM The control IDs.
 * @returns A button.
 */
function createAddControlButton(controlsDiv, controlIDM) {
    let button = (0, html_1.createButton)(app_1.s_Add_sy_add, undefined, app_1.level1);
    controlsDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = app_1.mesmer.getNextControlID();
        console.log("Add Control " + i.toString());
        let cDivID = controlIDM.addID(xml_control_1.Control.tagName, i.toString());
        let cDiv = (0, html_1.createDiv)(cDivID, app_1.boundary1);
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_1.getID)(xml_control_1.Control.tagName, (i - 1).toString(), app_1.s_container));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) {
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
        // Create a collapsible div for each conditions.
        let ccDivID = controlIDM.addID(cDivID, app_1.s_container);
        let ccDiv = (0, html_1.getCollapsibleDiv)(ccDivID, controlsDiv, elementToInsertBefore, cDiv, xml_control_1.Control.tagName + " " + i.toString(), app_1.boundary1, app_1.level1);
        // Add the control
        let control = addControl(new Map(), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach(option => {
            handleControl(control, cDiv, controlIDM, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, html_1.createFlexDiv)(undefined, app_1.level1);
        let orderedOnOffControls = new Map([...onOffControls.entries()].sort());
        orderedOnOffControls.forEach((button) => {
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, controlIDM, null, app_1.level1);
        handleCalcMethod(control, cDiv, controlIDM, null, app_1.level1);
        getControlItems(control).forEach(item => {
            handleControl(control, cDiv, controlIDM, onOffControls, null, app_1.level1, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = (0, app_1.addRemoveButton)(cDiv, app_1.level1, app_1.mesmer.removeControl.bind(app_1.mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the control.
            (0, app_1.remove)(ccDivID);
            controlIDM.removeIDs(cDivID);
            let divCmId = (0, util_1.getID)(cDivID, xml_control_1.CalcMethod.tagName);
            controlIDM.removeIDs(divCmId);
            let divCmDetailsId = (0, util_1.getID)(divCmId, "details");
            controlIDM.removeIDs(divCmDetailsId);
            let divCmDetailsSelectId = (0, util_1.getID)(divCmDetailsId, "select");
            controlIDM.removeIDs(divCmDetailsSelectId);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */
function addControl(attributes, i) {
    let control = new xml_control_1.Control(attributes, i);
    app_1.mesmer.addControl(control);
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
function createInputControlItem(control, div, obj, setControlMethod, id, valueString) {
    setControlMethod.call(control, obj);
    let input = (0, html_1.createInput)("number", id, app_1.boundary1);
    input.addEventListener('change', (event) => {
        let target = event.target;
        (0, app_1.setNumberNode)(obj, target);
        (0, html_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_1.resizeInputElement)(input);
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
function handleControl(control, cDiv, controlIDs, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
    let tagName = ControlClass.tagName;
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(buttonTextContentDeselected, undefined, app_1.boundary1);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    if (onOffControls) {
        onOffControls.set(tagName, button);
    }
    let controlInstance;
    let div;
    let id;
    if (level) {
        id = controlIDs.addID(cDiv.id, tagName);
        div = (0, html_1.createFlexDiv)(id, level);
        cDiv.appendChild(div);
        div.appendChild(button);
        id = controlIDs.addID(cDiv.id, id, app_1.s_input);
    }
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml[0]));
                let value;
                // Deal with the special case of eigenvalues, which can take either numerical or string values.
                value = (valueString == "all") ? new big_js_1.default(0) : new big_js_1.default(valueString);
                controlInstance = new ControlClass((0, xml_1.getAttributes)(xml[0]), value);
                createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
            }
            else {
                controlInstance = new ControlClass((0, xml_1.getAttributes)(xml[0]));
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(app_1.s_optionOff);
        }
        else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(app_1.s_optionOn);
        }
    }
    else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_1.s_optionOn);
    }
    button.addEventListener('click', (event) => {
        if (!control.index.has(tagName)) {
            if (handleInput) {
                createInputControlItem(control, div, controlInstance, setControlMethod, id, "");
            }
            else {
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
        }
        else {
            if (handleInput) {
                (0, app_1.remove)(id);
            }
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
    });
}
/**
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */
function handleCalcMethod(control, cDiv, controlIDM, xml_control, level) {
    //console.log("handleCalcMethod " + (xml_control == null));
    let div = (0, html_1.createFlexDiv)(undefined, level);
    cDiv.appendChild(div);
    let tagName = xml_control_1.CalcMethod.tagName;
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(buttonTextContentDeselected, undefined, app_1.boundary1);
    div.appendChild(button);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = controlIDM.addID(cDiv.id, tagName);
    let divCm = (0, html_1.createFlexDiv)(divCmId, app_1.boundary1);
    div.appendChild(divCm);
    let options = xml_control_1.CalcMethod.options;
    let divCmDetailsId = controlIDM.addID(divCmId, "details");
    let divCmDetailsSelectId = controlIDM.addID(divCmDetailsId, "select");
    let cm;
    let first = true;
    if (xml_control != null) {
        //let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagNameNS("http://www.chem.leeds.ac.uk/mesmer", "calcMethod");
        let xml = xml_control.getElementsByTagName(tagName);
        //console.log("xml.length " + xml.length);
        if (xml.length > 0) {
            if (xml.length > 1) {
                throw new Error("More than one CalcMethod element.");
            }
            let attributes = (0, xml_1.getAttributes)(xml[0]);
            let xsi_type = attributes.get("xsi:type");
            cm = getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle(app_1.s_optionOff);
            button.textContent = buttonTextContentSelected;
        }
        else {
            button.classList.toggle(app_1.s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    }
    else {
        button.classList.toggle(app_1.s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                if (options[options.length - 1] != app_1.s_selectOption) {
                    options.push(app_1.s_selectOption);
                }
            }
            // Remove select.
            //remove(divCmId);
            controlIDM.removeIDs(divCmDetailsId);
            controlIDM.removeIDs(divCmDetailsSelectId);
            // Create the select element.
            let select = createSelectElementCalcMethod(controlIDM, control, div, options, tagName, app_1.s_selectOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle(app_1.s_optionOn);
            button.classList.toggle(app_1.s_optionOff);
        }
        else {
            if (control.getCalcMethod() != null) {
                control.removeCalcMethod();
                // Remove any existing div.
                //remove(divCmId);
                controlIDM.removeIDs(divCmDetailsId);
                //console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
                //console.log("button.textContent " + button.textContent);
                controlIDM.removeIDs(divCmDetailsSelectId);
                button.textContent = buttonTextContentDeselected;
                button.classList.toggle(app_1.s_optionOn);
                button.classList.toggle(app_1.s_optionOff);
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
function handleTestMicroRates(control, cDiv, controlIDM, xml_control, level) {
    let tagName = xml_control_1.TestMicroRates.tagName;
    let divID = controlIDM.addID(cDiv.id, tagName);
    let div = (0, html_1.createFlexDiv)(divID, level);
    cDiv.appendChild(div);
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(tagName, controlIDM.addID(cDiv.id, tagName, html_1.s_button), app_1.boundary1);
    div.appendChild(button);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    let idTmax = controlIDM.addID(cDiv.id, tagName, xml_control_1.Tmax.tagName);
    let idTmin = controlIDM.addID(cDiv.id, tagName, xml_control_1.Tmin.tagName);
    let idTstep = controlIDM.addID(cDiv.id, tagName, xml_control_1.Tstep.tagName);
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle(app_1.s_optionOff);
            button.textContent = buttonTextContentSelected;
        }
        else {
            button.classList.toggle(app_1.s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    }
    else {
        button.classList.toggle(app_1.s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event) => {
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        }
        else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
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
function createTestMicroRates(control, div, xml_tmr, idTmax, idTmin, idTstep) {
    let attributes;
    let tmr;
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) {
            throw new Error("More than one TestMicroRates element.");
        }
        attributes = (0, xml_1.getAttributes)(xml_tmr[0]);
        tmr = new xml_control_1.TestMicroRates(attributes);
    }
    else {
        attributes = new Map();
        // Set some default values.
        attributes.set(xml_control_1.TestMicroRates.s_Tmax, "2000"); // These should load from some kind of default...
        attributes.set(xml_control_1.TestMicroRates.s_Tmin, "100");
        attributes.set(xml_control_1.TestMicroRates.s_Tstep, "100");
        tmr = new xml_control_1.TestMicroRates(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, html_1.createLabelWithInput)("text", (0, util_1.getID)(idTmax, "input"), app_1.boundary1, app_1.level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        try {
            tmr.setTmax(new big_js_1.default(target.value));
            console.log("Set " + xml_control_1.TestMicroRates.s_Tmax + " to " + target.value);
        }
        catch (e) {
            alert("Invalid input, resetting...");
            target.value = tMax.toString();
        }
        (0, html_1.resizeInputElement)(target);
    }, tMax.toString(), xml_control_1.TestMicroRates.s_Tmax);
    tMaxlwi.id = idTmax;
    (0, html_1.resizeInputElement)(tMaxlwi.querySelector('input'));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, html_1.createLabelWithInput)("number", (0, util_1.getID)(idTmin + "input"), app_1.boundary1, app_1.level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_1.isNumeric)(target.value)) {
            tmr.setTmin(new big_js_1.default(target.value));
            console.log("Set " + xml_control_1.TestMicroRates.s_Tmin + " to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tMin.toString();
        }
        (0, html_1.resizeInputElement)(target);
    }, tMin.toString(), xml_control_1.TestMicroRates.s_Tmin);
    tMinlwi.id = idTmin;
    (0, html_1.resizeInputElement)(tMinlwi.querySelector('input'));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, html_1.createLabelWithInput)("text", (0, util_1.getID)(idTstep + "input"), app_1.boundary1, app_1.level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_1.isNumeric)(target.value)) {
            tmr.setTstep(new big_js_1.default(target.value));
            console.log("Set " + xml_control_1.TestMicroRates.s_Tstep + " to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = tStep.toString();
        }
        (0, html_1.resizeInputElement)(target);
    }, tStep.toString(), xml_control_1.TestMicroRates.s_Tstep);
    tSteplwi.id = idTstep;
    (0, html_1.resizeInputElement)(tSteplwi.querySelector('input'));
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
function getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId) {
    //console.log("getCalcMethod");
    let cm;
    // Create the select element.
    let select = createSelectElementCalcMethod(controlIDM, control, divCm, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails = (0, html_1.createFlexDiv)(divCmDetailsId, app_1.boundary1);
    divCm.appendChild(divCmDetails);
    if (xsi_type == xml_control_1.CalcMethodSimpleCalc.xsi_type || xsi_type == xml_control_1.CalcMethodSimpleCalc.xsi_type2) {
        //console.log("CalcMethodSimpleCalc");
        cm = new xml_control_1.CalcMethodSimpleCalc(attributes);
    }
    else if (xsi_type == xml_control_1.CalcMethodGridSearch.xsi_type || xsi_type == xml_control_1.CalcMethodGridSearch.xsi_type2) {
        cm = new xml_control_1.CalcMethodGridSearch(attributes);
    }
    else if (xsi_type == xml_control_1.CalcMethodFitting.xsi_type || xsi_type == xml_control_1.CalcMethodFitting.xsi_type2) {
        let cmf = new xml_control_1.CalcMethodFitting(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml = xml[0].getElementsByTagName(xml_control_1.FittingIterations.tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value = new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(fi_xml[0])));
                let fittingIterations = new xml_control_1.FittingIterations((0, xml_1.getAttributes)(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            }
            else {
                throw new Error("More than one FittingIterations element.");
            }
        }
        processCalcMethodFitting(divCmDetails, cmf);
    }
    else if (xsi_type == xml_control_1.CalcMethodMarquardt.xsi_type || xsi_type == xml_control_1.CalcMethodMarquardt.xsi_type2) {
        let cmm = new xml_control_1.CalcMethodMarquardt(attributes);
        cm = cmm;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = xml_control_1.MarquardtIterations.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(elementXml[0])));
                    let instance = new ClassConstructor((0, xml_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, xml_control_1.MarquardtIterations, cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, xml_control_1.MarquardtTolerance, cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, xml_control_1.MarquardtDerivDelta, cmm.setMarquardtDerivDelta.bind(cmm));
        processCalcMethodMarquardt(divCmDetails, cmm);
    }
    else if (xsi_type == xml_control_1.CalcMethodAnalyticalRepresentation.xsi_type || xsi_type == xml_control_1.CalcMethodAnalyticalRepresentation.xsi_type2) {
        let cmar = new xml_control_1.CalcMethodAnalyticalRepresentation(attributes);
        cm = cmar;
        function processElement(xml, ClassConstructor, setterMethod, isNumber) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(elementXml[0]));
                    if (isNumber) {
                        if (value != undefined) {
                            if (value != "" && value != "NaN") {
                                value = new big_js_1.default(value);
                            }
                        }
                    }
                    let instance = new ClassConstructor((0, xml_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, xml_control_1.Format, cmar.setFormat.bind(cmar), false);
        processElement(xml, xml_control_1.Precision, cmar.setPrecision.bind(cmar), false);
        processElement(xml, xml_control_1.ChebNumTemp, cmar.setChebNumTemp.bind(cmar), true);
        processElement(xml, xml_control_1.ChebNumConc, cmar.setChebNumConc.bind(cmar), true);
        processElement(xml, xml_control_1.ChebMaxTemp, cmar.setChebMaxTemp.bind(cmar), true);
        processElement(xml, xml_control_1.ChebMinTemp, cmar.setChebMinTemp.bind(cmar), true);
        processElement(xml, xml_control_1.ChebMaxConc, cmar.setChebMaxConc.bind(cmar), true);
        processElement(xml, xml_control_1.ChebMinConc, cmar.setChebMinConc.bind(cmar), true);
        processElement(xml, xml_control_1.ChebTExSize, cmar.setChebTExSize.bind(cmar), true);
        processElement(xml, xml_control_1.ChebPExSize, cmar.setChebPExSize.bind(cmar), true);
        processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    }
    else if (xsi_type == xml_control_1.CalcMethodThermodynamicTable.xsi_type || xsi_type == xml_control_1.CalcMethodThermodynamicTable.xsi_type2) {
        let cmtt = new xml_control_1.CalcMethodThermodynamicTable(attributes);
        cm = cmtt;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(elementXml[0])));
                    let instance = new ClassConstructor((0, xml_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, xml_control_1.Tmin, cmtt.setTmin.bind(cmtt));
        processElement(xml, xml_control_1.Tmid, cmtt.setTmid.bind(cmtt));
        processElement(xml, xml_control_1.Tmax, cmtt.setTmax.bind(cmtt));
        processElement(xml, xml_control_1.Tstep, cmtt.setTstep.bind(cmtt));
        processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    }
    else if (xsi_type == xml_control_1.CalcMethodSensitivityAnalysis.xsi_type || xsi_type == xml_control_1.CalcMethodSensitivityAnalysis.xsi_type2) {
        let cmsa = new xml_control_1.CalcMethodSensitivityAnalysis(attributes);
        cm = cmsa;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(elementXml[0]));
                    if (value != undefined) {
                        value = new big_js_1.default(value);
                    }
                    let instance = new ClassConstructor((0, xml_1.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                }
                else {
                    throw new Error(`More than one ${tagName} element.`);
                }
            }
        }
        processElement(xml, xml_control_1.SensitivityAnalysisSamples, cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement(xml, xml_control_1.SensitivityAnalysisOrder, cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement(xml, xml_control_1.SensitivityNumVarRedIters, cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement(xml, xml_control_1.SensitivityVarRedMethod, cmsa.setSensitivityVarRedMethod.bind(cmsa));
        processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    }
    else {
        // If there is a name attribute instead, try this in place of the xsi:type.
        let name = attributes.get("name");
        if (name != undefined && name !== xsi_type) {
            attributes.set("xsi:type", name);
            console.warn(`Using name attribute as xsi:type: ${name}`);
            return getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, name, divCmDetailsId, divCmDetailsSelectId);
        }
        else {
            throw new Error(`Unable to determine calculation method for xsi_type: ${xsi_type}`);
        }
    }
    return cm;
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */
function processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fi = cm.getFittingIterations() || new xml_control_1.FittingIterations(new Map(), app_1.big0);
    cm.setFittingIterations(fi);
    divCmDetails.appendChild((0, html_1.createLabelWithInput)("number", (0, util_1.getID)(divCmDetails.id, xml_control_1.FittingIterations.tagName, app_1.s_input), app_1.boundary1, app_1.level0, (event) => {
        let target = event.target;
        // Check the value is a number.
        if ((0, util_1.isNumeric)(target.value)) {
            fi.value = new big_js_1.default(target.value);
            console.log("Set FittingIterations to " + target.value);
        }
        else {
            alert("Value is not numeric, resetting...");
            target.value = fi.value.toString();
        }
        (0, html_1.resizeInputElement)(target);
    }, fi.value.toString(), xml_control_1.FittingIterations.tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */
function processCalcMethodMarquardt(divCmDetails, cm) {
    function createLabelWithInputForObject(obj, divCmDetails, boundary, level) {
        let id = (0, util_1.getID)(divCmDetails.id, obj.tagName, app_1.s_input);
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event) => {
            let target = event.target;
            // Check the value is a number.
            if ((0, util_1.isNumeric)(target.value)) {
                obj.value = new big_js_1.default(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            }
            else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            (0, html_1.resizeInputElement)(target);
        };
        divCmDetails.appendChild((0, html_1.createLabelWithInput)("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let mi = cm.getMarquardtIterations() || new xml_control_1.MarquardtIterations(new Map(), app_1.big0);
    cm.setMarquardtIterations(mi);
    createLabelWithInputForObject(mi, divCmDetails, app_1.boundary1, app_1.level0);
    // MarquardtTolerance.
    let mt = cm.getMarquardtTolerance() || new xml_control_1.MarquardtTolerance(new Map(), app_1.big0);
    cm.setMarquardtTolerance(mt);
    createLabelWithInputForObject(mt, divCmDetails, app_1.boundary1, app_1.level0);
    // MarquardtDerivDelta.
    let mdd = cm.getMarquardtDerivDelta() || new xml_control_1.MarquardtDerivDelta(new Map(), app_1.big0);
    cm.setMarquardtDerivDelta(mdd);
    createLabelWithInputForObject(mdd, divCmDetails, app_1.boundary1, app_1.level0);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */
function processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new xml_control_1.Format(new Map(), xml_control_1.Format.options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor, getter, setter, tagName, options) {
        let element = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement = (0, html_1.createLabelWithSelect)(tagName, options, tagName, element.value, divCmDetails.id, app_1.boundary1, app_1.boundary1);
        lwsElement.querySelector('select')?.addEventListener('change', (event) => {
            let target = event.target;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            (0, html_1.resizeSelectElement)(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement(xml_control_1.Format, cm.getFormat.bind(cm), cm.setFormat.bind(cm), xml_control_1.Format.tagName, xml_control_1.Format.options);
    processSelectElement(xml_control_1.Format, () => format.getRateUnits(), format.setRateUnits.bind(format), xml_control_1.Format.rateUnits, xml_control_1.Format.rateUnitsOptions);
    processSelectElement(xml_control_1.Precision, cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), xml_control_1.Precision.tagName, xml_mesmer_1.Mesmer.precisionOptions);
    // "me:chebNumTemp", "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_1.createLabelWithInput)("text", divCmDetails.id + `_${tagName}_input`, app_1.boundary1, app_1.level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement(xml_control_1.ChebNumTemp, cm.getChebNumTemp.bind(cm), cm.setChebNumTemp.bind(cm), xml_control_1.ChebNumTemp.tagName);
    processElement(xml_control_1.ChebNumConc, cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), xml_control_1.ChebNumConc.tagName);
    processElement(xml_control_1.ChebMaxTemp, cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), xml_control_1.ChebMaxTemp.tagName);
    processElement(xml_control_1.ChebMinTemp, cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), xml_control_1.ChebMinTemp.tagName);
    processElement(xml_control_1.ChebMaxConc, cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), xml_control_1.ChebMaxConc.tagName);
    processElement(xml_control_1.ChebMinConc, cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), xml_control_1.ChebMinConc.tagName);
    processElement(xml_control_1.ChebTExSize, cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), xml_control_1.ChebTExSize.tagName);
    processElement(xml_control_1.ChebPExSize, cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), xml_control_1.ChebPExSize.tagName);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */
function processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_1.createLabelWithInput)("text", divCmDetails.id + `_${tagName}_input`, app_1.boundary1, app_1.level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement(xml_control_1.Tmin, cm.getTmin.bind(cm), cm.setTmin.bind(cm), xml_control_1.Tmin.tagName);
    processElement(xml_control_1.Tmid, cm.getTmid.bind(cm), cm.setTmid.bind(cm), xml_control_1.Tmid.tagName);
    processElement(xml_control_1.Tmax, cm.getTmax.bind(cm), cm.setTmax.bind(cm), xml_control_1.Tmax.tagName);
    processElement(xml_control_1.Tstep, cm.getTstep.bind(cm), cm.setTstep.bind(cm), xml_control_1.Tstep.tagName);
}
function handleEvent(element, tagName) {
    return (event) => {
        let target = event.target;
        try {
            element.value = new big_js_1.default(target.value);
        }
        catch (e) {
            alert("Invalid input value " + target.value + " , resetting...");
            target.value = element.value.toString();
        }
        (0, html_1.resizeInputElement)(target);
    };
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */
function processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, html_1.createLabelWithInput)("text", (0, util_1.getID)(divCmDetails.id, tagName, app_1.s_input), app_1.boundary1, app_1.level0, handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processNumberElement(xml_control_1.SensitivityAnalysisSamples, cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), xml_control_1.SensitivityAnalysisSamples.tagName);
    processNumberElement(xml_control_1.SensitivityAnalysisOrder, cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), xml_control_1.SensitivityAnalysisOrder.tagName);
    processNumberElement(xml_control_1.SensitivityNumVarRedIters, cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), xml_control_1.SensitivityNumVarRedIters.tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new xml_control_1.SensitivityVarRedMethod(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName = xml_control_1.SensitivityVarRedMethod.tagName;
    divCmDetails.appendChild((0, html_1.createLabelWithSelect)(tagName, xml_control_1.SensitivityVarRedMethod.options, tagName, xml_control_1.SensitivityVarRedMethod.options[0], (0, util_1.getID)(divCmDetails.id, tagName, 'select'), app_1.boundary1, app_1.boundary1));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector('select');
    select?.addEventListener('change', (event) => {
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log(tagName + " set to " + target.value);
        (0, html_1.resizeSelectElement)(target);
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
function createSelectElementCalcMethod(controlIDM, control, div, options, tagName, value, divCmDetailsId, divCmDetailsSelectId) {
    let select = (0, html_1.createSelectElement)(options, tagName, value, divCmDetailsSelectId, app_1.boundary1);
    div.appendChild(select);
    (0, app_1.selectAnotherOptionEventListener)(options, select);
    select.addEventListener('change', (event) => {
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) {
            divCmDetails.remove();
            controlIDM.removeIDs(divCmDetailsId);
        }
        divCmDetails = (0, html_1.createFlexDiv)(divCmDetailsId, app_1.boundary1);
        div.appendChild(divCmDetails);
        let target = event.target;
        let value = target.value;
        let attributes = new Map();
        attributes.set("xsi:type", value);
        if (value == xml_control_1.CalcMethodSimpleCalc.xsi_type || value == xml_control_1.CalcMethodSimpleCalc.xsi_type2) {
            // "me:simpleCalc", "simpleCalc".
            control.setCalcMethod(new xml_control_1.CalcMethodSimpleCalc(attributes));
        }
        else if (value == xml_control_1.CalcMethodGridSearch.xsi_type || value == xml_control_1.CalcMethodGridSearch.xsi_type2) {
            // "me:gridSearch", "gridSearch".
            control.setCalcMethod(new xml_control_1.CalcMethodGridSearch(attributes));
        }
        else if (value == xml_control_1.CalcMethodFitting.xsi_type || value == xml_control_1.CalcMethodFitting.xsi_type2) {
            let cm = new xml_control_1.CalcMethodFitting(attributes);
            control.setCalcMethod(cm);
            processCalcMethodFitting(divCmDetails, cm);
        }
        else if (value == xml_control_1.CalcMethodMarquardt.xsi_type || value == xml_control_1.CalcMethodMarquardt.xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm = new xml_control_1.CalcMethodMarquardt(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(divCmDetails, cm);
        }
        else if (value == xml_control_1.CalcMethodAnalyticalRepresentation.xsi_type || value == xml_control_1.CalcMethodAnalyticalRepresentation.xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm = new xml_control_1.CalcMethodAnalyticalRepresentation(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        }
        else if (value == xml_control_1.CalcMethodThermodynamicTable.xsi_type || value == xml_control_1.CalcMethodThermodynamicTable.xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm = new xml_control_1.CalcMethodThermodynamicTable(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(divCmDetails, cm);
        }
        else if (value == xml_control_1.CalcMethodSensitivityAnalysis.xsi_type || value == xml_control_1.CalcMethodSensitivityAnalysis.xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm = new xml_control_1.CalcMethodSensitivityAnalysis(new Map());
            control.setCalcMethod(cm);
            processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        }
        else {
            throw new Error("Unknown CalcMethod type.");
        }
        (0, html_1.resizeSelectElement)(target);
    });
    return select;
}
//# sourceMappingURL=gui_ControlList.js.map