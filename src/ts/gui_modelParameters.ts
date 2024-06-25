import Big from "big.js";
import { boundary1, addRID, s_container, level1, addRemoveButton, mesmer, remove, sy_selected, sy_deselected, s_optionOn, s_optionOff, s_input, defaults, big0, setNumberNode, addAnyUnits, s_Add_sy_add, IDManager, s_units } from "./app";
import { AutomaticallySetMaxEne } from "./control";
import { createDiv, getCollapsibleDiv, createFlexDiv, createButton, s_button, resizeInputElement, createInput } from "./html";
import { Mesmer } from "./mesmer";
import { ModelParameters, EnergyAboveTheTopHill, MaxTemperature, GrainSize } from "./modelParameters";
import { getID } from "./util";
import { getAttributes, getNodeValue, getFirstChildNode } from "./xml";

/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */
export function processModelParameters(xml: XMLDocument, modelParametersIDs: IDManager): HTMLDivElement {
    console.log(ModelParameters.tagName);
    // Create a div for the modelParameterss.
    let mpsDiv: HTMLDivElement = createDiv(undefined, boundary1);
    let xml_mps: HTMLCollectionOf<Element> = xml.getElementsByTagName(ModelParameters.tagName);
    for (let i = 0; i < xml_mps.length; i++) {
        // Create a collapsible div for the model parameters.
        let mpDivID: string = addRID(ModelParameters.tagName, i.toString());
        let mpDiv: HTMLDivElement = createDiv(mpDivID, boundary1);
        let mpcDivID = addRID(mpDivID, s_container);
        let mpcDiv: HTMLDivElement = getCollapsibleDiv(mpcDivID, mpsDiv, null, mpDiv,
            ModelParameters.tagName + " " + i.toString(), boundary1, level1);
        let mp: ModelParameters = addModelParameters(getAttributes(xml_mps[i]), i);
        processGrainSize(mp, xml_mps[i], mpDiv, modelParametersIDs);
        //setGrainSize(mp, xml_mps[i], mpDiv);
        processModelParametersN(mp, modelParametersIDs, xml_mps[i], mpDiv, AutomaticallySetMaxEne,
            mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne.bind(mp));
        processModelParametersN(mp, modelParametersIDs, xml_mps[i], mpDiv, EnergyAboveTheTopHill,
            mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill.bind(mp));
        processModelParametersN(mp, modelParametersIDs, xml_mps[i], mpDiv, MaxTemperature,
            mp.setMaxTemperature, mp.removeMaxTemperature.bind(mp));
        // Add a remove modelParameters button.
        let removeButton: HTMLButtonElement = addRemoveButton(mpDiv, level1, mesmer.removeModelParameters.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the modelParameters.
            remove(mpcDivID);
            modelParametersIDs.removeIDs(mpDivID);
        });
    }
    // Create an add button to add a modelParameters.
    createAddModelParametersButton(mpsDiv, modelParametersIDs);
    return mpsDiv;
}

/**
 * Add and return a new modelParameters.
 */
function addModelParameters(attributes: Map<string, string>, i: number): ModelParameters {
    let mp: ModelParameters = new ModelParameters(attributes, i);
    mesmer.addModelParameters(mp);
    return mp;
}

/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function processGrainSize(mps: ModelParameters, xml_mps: Element | null, mpsDiv: HTMLDivElement, modelParametersIDs: IDManager) {
    let tagName: string = GrainSize.tagName;
    let id: string = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div: HTMLDivElement = createFlexDiv(id, level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, s_button), boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let idi: string = modelParametersIDs.addID(mpsDiv.id, tagName, s_input);
    let gs: GrainSize;
    let valueString: string;
    if (xml_mps != null) {
        let xml: HTMLCollectionOf<Element> = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = getNodeValue(getFirstChildNode(xml[0]));
            let value: Big = new Big(valueString);
            gs = new GrainSize(getAttributes(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, Mesmer.energyUnits);
            button.classList.toggle(s_optionOff);
        } else {
            gs = getDefaultGrainsize(tagName);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    } else {
        gs = getDefaultGrainsize(tagName);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!mps.index.has(GrainSize.tagName)) {
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById(getID(idi, s_units))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
}

/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function setGrainSize(mps: ModelParameters, xml_mps: Element, mpsDiv: HTMLDivElement, modelParametersIDs: IDManager) {
    let tagName: string = GrainSize.tagName;

    let div: HTMLDivElement = addGrainSize(mps, mpsDiv, modelParametersIDs);


    // Save the current display style of the div
    let originalDisplay = div.style.display;
    // Make the div visible
    div.style.display = "block";
    let input: HTMLInputElement = div.querySelector('input') as HTMLInputElement;
    // restore the original display style
    div.style.display = originalDisplay;


    //let input: HTMLInputElement = document.getElementById(getID(mpsDiv.id, tagName, s_input)) as HTMLInputElement;

    let xml: HTMLCollectionOf<Element> = xml_mps.getElementsByTagName(tagName);
    if (xml.length > 0) {
        if (xml.length > 1) {
            console.warn("More than one GrainSize found in XML. The first is used!");
        }
        let valueString: string = getNodeValue(getFirstChildNode(xml[0]));
        let value: Big = new Big(valueString);
        (mps.getGrainSize() as GrainSize).value = value;
        if (input !== null) {
            input.value = valueString;
            resizeInputElement(input);
        } else {
            console.warn("GrainSize input element not found.");
        }
    }
}

/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */
function addGrainSize(mps: ModelParameters, mpsDiv: HTMLDivElement, modelParametersIDs: IDManager): HTMLDivElement {
    let tagName: string = GrainSize.tagName;
    let id: string = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div: HTMLDivElement = createFlexDiv(id, level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, s_button), boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let idi: string = modelParametersIDs.addID(mpsDiv.id, tagName, s_input);
    let gs: GrainSize;
    button.textContent = buttonTextContentDeselected;
    button.classList.toggle(s_optionOn);
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the GrainSize already exists
        if (!mps.index.has(GrainSize.tagName)) {
            console.log("Adding GrainSize input");
            gs = getDefaultGrainsize(tagName);
            mps.setGrainSize(gs);
            createInputModelParameters(mps, div, gs, idi, gs.value.toString(), mps.setGrainSize, Mesmer.energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            console.log("Removing GrainSize input");
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById(getID(idi, s_units))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
    });
    //button.click();
    return div;
}

function getDefaultGrainsize(tagName: string): GrainSize {
    let value: Big;
    let attributes: Map<string, string>;
    if (defaults != undefined) {
        let valueString: string = defaults.values.get(tagName) ?? "";
        if (valueString == "") {
            value = big0;
        } else {
            value = new Big(valueString);
        }
        attributes = defaults.attributess.get(tagName) ?? new Map();
    } else {
        console.log(tagName + " set using hardcoded default.");
        value = new Big(101);
        attributes = new Map();
        attributes.set(s_units, "cm-1");
    }
    return new GrainSize(attributes, value);
}

/**
 * Process numerical modelParameters.
 * @param mps The ModelParameters.
 * @param mpsDiv The modelParameters div.
 * @param xml_mps The xml modelParameters.
 */
function processModelParametersN<T extends { new(attributes: Map<string, string>, value: Big): any; tagName: string }>(
    mps: ModelParameters, modelParametersIDs: IDManager, xml_mps: Element | null, mpsDiv: HTMLDivElement, mpt: T,
    setModelParameter: (mp: InstanceType<T>) => void, removeModelParameter: () => void): void {
    let tagName: string = mpt.tagName;
    let id: string = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div: HTMLDivElement = createFlexDiv(id, level1);
    mpsDiv.appendChild(div);
    let buttonTextContentSelected: string = tagName + sy_selected;
    let buttonTextContentDeselected: string = tagName + sy_deselected;
    let button = createButton(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, s_button), boundary1);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    div.appendChild(button);
    let idi: string = modelParametersIDs.addID(mpsDiv.id, tagName, s_input);
    let mp: InstanceType<T>;
    let valueString: string;
    if (xml_mps != null) {
        let xml: HTMLCollectionOf<Element> = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = getNodeValue(getFirstChildNode(xml[0]));
            let value: Big = new Big(valueString);
            mp = new mpt(getAttributes(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.classList.toggle(s_optionOff);
        } else {
            valueString = "";
            mp = new mpt(new Map(), big0);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle(s_optionOn);
        }
    } else {
        valueString = "";
        mp = new mpt(new Map(), big0);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener('click', () => {
        // Check if the ModelParameter already exists
        if (!mps.index.has(tagName)) {
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        } else {
            //valueString = mp.value.toExponential();
            removeModelParameter();
            remove(idi);
            modelParametersIDs.removeID(idi);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn)
        button.classList.toggle(s_optionOff);
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
function createInputModelParameters(mps: ModelParameters, div: HTMLDivElement, element: any,
    id: string, valueString: string, setElementMethod: (value: any) => void, units: any): void {
    setElementMethod.call(mps, element);
    let input: HTMLInputElement = createInput("text", id, boundary1);
    div.appendChild(input);
    input.addEventListener('change', (event: Event) => {
        let target = event.target as HTMLInputElement;
        setNumberNode(element, target);
        resizeInputElement(target);
    });
    input.value = valueString;
    resizeInputElement(input);
    addAnyUnits(units, element.attributes, div, input, getID(id, s_units), element.constructor.tagName, boundary1, boundary1);
}

/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */
function createAddModelParametersButton(mpsDiv: HTMLDivElement, modelParametersIDs: IDManager): HTMLButtonElement {
    let button: HTMLButtonElement = createButton(s_Add_sy_add, undefined, level1);
    let tn: string = ModelParameters.tagName;
    mpsDiv.appendChild(button);
    button.addEventListener('click', (event: MouseEvent) => {
        let i: number = mesmer.getNextModelParametersID();
        console.log("Add " + tn + i.toString());
        // Create collapsible div.
        let mpDivID: string = addRID(tn, i.toString());
        let mpDiv: HTMLDivElement = createDiv(mpDivID, boundary1);
        let mpcDivID = addRID(mpDivID, s_container);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore: Element | null;
        if (i > 0) {
            let aboveElement = document.getElementById(getID(tn, (i - 1).toString(), s_container)) as Element;
            let nextElementSibling: Element | null = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == mpsDiv) {
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
        let mpcDiv: HTMLDivElement = getCollapsibleDiv(mpcDivID, mpsDiv, elementToInsertBefore, mpDiv,
            tn + " " + i.toString(), boundary1, level1);
        // Add the modelParameters.
        let mp: ModelParameters = addModelParameters(new Map(), i);
        addGrainSize(mp, mpDiv, modelParametersIDs);
        processModelParametersN(mp, modelParametersIDs, null, mpDiv, AutomaticallySetMaxEne,
            mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne);
        processModelParametersN(mp, modelParametersIDs, null, mpDiv, EnergyAboveTheTopHill,
            mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill);
        processModelParametersN(mp, modelParametersIDs, null, mpDiv, MaxTemperature,
            mp.setMaxTemperature, mp.removeMaxTemperature);
        // Add a remove modelParameters button.
        let removeButton: HTMLButtonElement = addRemoveButton(mpDiv, level1, mesmer.removeModelParameters.bind(mesmer), i);
        removeButton.addEventListener('click', (event: MouseEvent) => {
            // Remove the modelParameters.
            remove(mpcDivID);
            modelParametersIDs.removeIDs(mpDivID);
        });
    });
    return button;
}