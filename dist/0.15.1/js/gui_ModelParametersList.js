"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processModelParameters = processModelParameters;
exports.createAddModelParametersButton = createAddModelParametersButton;
const big_js_1 = __importDefault(require("big.js"));
const app_1 = require("./app");
const xml_control_1 = require("./xml_control");
const html_1 = require("./html");
const xml_mesmer_1 = require("./xml_mesmer");
const xml_modelParameters_1 = require("./xml_modelParameters");
const util_1 = require("./util");
const xml_1 = require("./xml");
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
function processModelParameters(xml, mpIDM) {
    console.log(xml_modelParameters_1.ModelParameters.tagName);
    // Create a div for the modelParameterss.
    let mpsDiv = (0, html_1.createDiv)(undefined, app_1.boundary1);
    let xml_mps = xml.getElementsByTagName(xml_modelParameters_1.ModelParameters.tagName);
    for (let i = 0; i < xml_mps.length; i++) {
        // Create a collapsible div for the model parameters.
        let mpDivID = mpIDM.addID(xml_modelParameters_1.ModelParameters.tagName, i.toString());
        let mpDiv = (0, html_1.createDiv)(mpDivID, app_1.boundary1);
        let mpcDivID = mpIDM.addID(mpDivID, app_1.s_container);
        let mpcDiv = (0, html_1.getCollapsibleDiv)(mpcDivID, mpsDiv, null, mpDiv, xml_modelParameters_1.ModelParameters.tagName + " " + i.toString(), app_1.boundary1, app_1.level1);
        let mp = addModelParameters((0, xml_1.getAttributes)(xml_mps[i]), i);
        processGrainSize(mp, xml_mps[i], mpDiv, mpIDM);
        //setGrainSize(mp, xml_mps[i], mpDiv);
        processModelParametersN(mp, mpIDM, xml_mps[i], mpDiv, xml_control_1.AutomaticallySetMaxEne, mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne.bind(mp));
        processModelParametersN(mp, mpIDM, xml_mps[i], mpDiv, xml_modelParameters_1.EnergyAboveTheTopHill, mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill.bind(mp));
        processModelParametersN(mp, mpIDM, xml_mps[i], mpDiv, xml_modelParameters_1.MaxTemperature, mp.setMaxTemperature, mp.removeMaxTemperature.bind(mp));
        // Add a remove modelParameters button.
        let removeButton = (0, app_1.addRemoveButton)(mpDiv, app_1.level1, app_1.mesmer.removeModelParameters.bind(app_1.mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the modelParameters.
            (0, app_1.remove)(mpcDivID);
            mpIDM.removeIDs(mpDivID);
        });
    }
    // Create an add button to add a modelParameters.
    createAddModelParametersButton(mpsDiv, mpIDM);
    return mpsDiv;
}
/**
 * Add and return a new modelParameters.
 */
function addModelParameters(attributes, i) {
    let mp = new xml_modelParameters_1.ModelParameters(attributes, i);
    app_1.mesmer.addModelParameters(mp);
    return mp;
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function processGrainSize(mps, xml_mps, mpsDiv, modelParametersIDs) {
    let tagName = xml_modelParameters_1.GrainSize.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, html_1.createFlexDiv)(id, app_1.level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, html_1.s_button), app_1.boundary1);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, app_1.s_input);
    let gs;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml[0]));
            let value = new big_js_1.default(Number(valueString));
            gs = new xml_modelParameters_1.GrainSize((0, xml_1.getAttributes)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, xml_mesmer_1.Mesmer.energyUnits);
            button.classList.toggle(app_1.s_optionOff);
        }
        else {
            gs = getDefaultGrainsize(tagName);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(app_1.s_optionOn);
        }
    }
    else {
        gs = getDefaultGrainsize(tagName);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_1.s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!mps.index.has(xml_modelParameters_1.GrainSize.tagName)) {
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, xml_mesmer_1.Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        }
        else {
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, util_1.getID)(idi, app_1.s_units))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
    });
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function setGrainSize(mps, xml_mps, mpsDiv, modelParametersIDs) {
    let tagName = xml_modelParameters_1.GrainSize.tagName;
    let div = addGrainSize(mps, mpsDiv, modelParametersIDs);
    // Save the current display style of the div
    let originalDisplay = div.style.display;
    // Make the div visible
    div.style.display = "block";
    let input = div.querySelector('input');
    // restore the original display style
    div.style.display = originalDisplay;
    //let input: HTMLInputElement = document.getElementById(getID(mpsDiv.id, tagName, s_input)) as HTMLInputElement;
    let xml = xml_mps.getElementsByTagName(tagName);
    if (xml.length > 0) {
        if (xml.length > 1) {
            console.warn("More than one GrainSize found in XML. The first is used!");
        }
        let valueString = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml[0]));
        let value = new big_js_1.default(valueString);
        mps.getGrainSize().value = value;
        if (input !== null) {
            input.value = valueString;
            (0, html_1.resizeInputElement)(input);
        }
        else {
            console.warn("GrainSize input element not found.");
        }
    }
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function addGrainSize(mps, mpsDiv, modelParametersIDs) {
    let tagName = xml_modelParameters_1.GrainSize.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, html_1.createFlexDiv)(id, app_1.level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, html_1.s_button), app_1.boundary1);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, app_1.s_input);
    let gs;
    button.textContent = buttonTextContentDeselected;
    button.classList.toggle(app_1.s_optionOn);
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!mps.index.has(xml_modelParameters_1.GrainSize.tagName)) {
            console.log("Adding GrainSize input");
            gs = getDefaultGrainsize(tagName);
            mps.setGrainSize(gs);
            createInputModelParameters(mps, div, gs, idi, gs.value.toString(), mps.setGrainSize, xml_mesmer_1.Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        }
        else {
            console.log("Removing GrainSize input");
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, util_1.getID)(idi, app_1.s_units))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
    });
    //button.click();
    return div;
}
function getDefaultGrainsize(tagName) {
    let value;
    let attributes;
    if (app_1.defaults != undefined) {
        let valueString = app_1.defaults.values.get(tagName) ?? "";
        if (valueString == "") {
            value = app_1.big0;
        }
        else {
            value = new big_js_1.default(valueString);
        }
        attributes = app_1.defaults.attributess.get(tagName) ?? new Map();
    }
    else {
        console.log(tagName + " set using hardcoded default.");
        value = new big_js_1.default(101);
        attributes = new Map();
        attributes.set(app_1.s_units, "cm-1");
    }
    return new xml_modelParameters_1.GrainSize(attributes, value);
}
/**
 * Process numerical modelParameters.
 * @param mps The ModelParameters.
 * @param mpsDiv The modelParameters div.
 * @param xml_mps The xml modelParameters.
 */
function processModelParametersN(mps, modelParametersIDs, xml_mps, mpsDiv, mpt, setModelParameter, removeModelParameter) {
    let tagName = mpt.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, html_1.createFlexDiv)(id, app_1.level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + app_1.sy_selected;
    let buttonTextContentDeselected = tagName + app_1.sy_deselected;
    let button = (0, html_1.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, html_1.s_button), app_1.boundary1);
    button.classList.add(app_1.s_optionOn);
    button.classList.add(app_1.s_optionOff);
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, app_1.s_input);
    let mp;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml[0]));
            let value = new big_js_1.default(valueString);
            mp = new mpt((0, xml_1.getAttributes)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.classList.toggle(app_1.s_optionOff);
        }
        else {
            valueString = "";
            mp = new mpt(new Map(), app_1.big0);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(app_1.s_optionOn);
        }
    }
    else {
        valueString = "";
        mp = new mpt(new Map(), app_1.big0);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(app_1.s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the ModelParameter already exists
        if (!mps.index.has(tagName)) {
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        }
        else {
            //valueString = mp.value.toExponential();
            removeModelParameter();
            (0, app_1.remove)(idi);
            modelParametersIDs.removeIDs(idi);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(app_1.s_optionOn);
        button.classList.toggle(app_1.s_optionOff);
    });
}
/**
 * @param mps The model parameters.
 * @param div The div.
 * @param element The element.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 * @param setElementMethod The method to set the element.
 * @param units The units.
 */
function createInputModelParameters(mps, div, element, id, valueString, setElementMethod, units) {
    setElementMethod.call(mps, element);
    let input = (0, html_1.createInput)("text", id, app_1.boundary1);
    div.appendChild(input);
    input.addEventListener('change', (event) => {
        let target = event.target;
        (0, app_1.setNumberNode)(element, target);
        (0, html_1.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, html_1.resizeInputElement)(input);
    (0, app_1.addAnyUnits)(units, element.attributes, div, input, (0, util_1.getID)(id, app_1.s_units), element.constructor.tagName, app_1.boundary1, app_1.boundary1);
}
/**
 * Create an add modelParameters button.
 * @param mpsDiv The modelParameters div.
 * @param mpIDM The modelParameters IDs.
 * @returns A button.
 */
function createAddModelParametersButton(mpsDiv, mpIDM) {
    let button = (0, html_1.createButton)(app_1.s_Add_sy_add, undefined, app_1.level1);
    let tn = xml_modelParameters_1.ModelParameters.tagName;
    mpsDiv.appendChild(button);
    button.addEventListener('click', (event) => {
        let i = app_1.mesmer.getNextModelParametersID();
        console.log("Add " + tn + i.toString());
        // Create collapsible div.
        let mpDivID = (0, app_1.addRID)(tn, i.toString());
        let mpDiv = (0, html_1.createDiv)(mpDivID, app_1.boundary1);
        let mpcDivID = (0, app_1.addRID)(mpDivID, app_1.s_container);
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, util_1.getID)(tn, (i - 1).toString(), app_1.s_container));
            let nextElementSibling = aboveElement.nextElementSibling;
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == mpsDiv) {
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
        let mpcDiv = (0, html_1.getCollapsibleDiv)(mpcDivID, mpsDiv, elementToInsertBefore, mpDiv, tn + " " + i.toString(), app_1.boundary1, app_1.level1);
        // Add the modelParameters.
        let mp = addModelParameters(new Map(), i);
        addGrainSize(mp, mpDiv, mpIDM);
        processModelParametersN(mp, mpIDM, null, mpDiv, xml_control_1.AutomaticallySetMaxEne, mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne);
        processModelParametersN(mp, mpIDM, null, mpDiv, xml_modelParameters_1.EnergyAboveTheTopHill, mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill);
        processModelParametersN(mp, mpIDM, null, mpDiv, xml_modelParameters_1.MaxTemperature, mp.setMaxTemperature, mp.removeMaxTemperature);
        // Add a remove modelParameters button.
        let removeButton = (0, app_1.addRemoveButton)(mpDiv, app_1.level1, app_1.mesmer.removeModelParameters.bind(app_1.mesmer), i);
        removeButton.addEventListener('click', (event) => {
            // Remove the modelParameters.
            (0, app_1.remove)(mpcDivID);
            mpIDM.removeIDs(mpDivID);
        });
    });
    return button;
}
//# sourceMappingURL=gui_ModelParametersList.js.map