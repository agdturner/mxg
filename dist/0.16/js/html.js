"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s_select = exports.sy_upTriangle = exports.sy_downTriangle = exports.s_collapsible = exports.s_button = void 0;
exports.getCollapsibleDiv = getCollapsibleDiv;
exports.createLabelWithInput = createLabelWithInput;
exports.createInputWithFunction = createInputWithFunction;
exports.createInput = createInput;
exports.createLabelWithTextArea = createLabelWithTextArea;
exports.createTextAreaWithFunction = createTextAreaWithFunction;
exports.createTextArea = createTextArea;
exports.getSelfClosingTag = getSelfClosingTag;
exports.resizeInputElement = resizeInputElement;
exports.resizeSelectElement = resizeSelectElement;
exports.resizeTextAreaElement = resizeTextAreaElement;
exports.createSelectElement = createSelectElement;
exports.createLabelWithSelect = createLabelWithSelect;
exports.createButton = createButton;
exports.createLabelWithButton = createLabelWithButton;
exports.createDiv = createDiv;
exports.createFlexDiv = createFlexDiv;
exports.createLabel = createLabel;
exports.createTable = createTable;
exports.addTableHeaderRow = addTableHeaderRow;
exports.addTableRow = addTableRow;
const util_1 = require("./util");
exports.s_button = "button";
exports.s_collapsible = "collapsible";
exports.sy_downTriangle = "\u25BC"; // ▼
exports.sy_upTriangle = "\u25B2"; // ▲
exports.s_select = "select";
/**
 * Create a HTMLDivElement containing a HTMLButtonElement and a HTMLDivElement which display is toggled as the button is actioned.
 * By default the content is not displayed. Then if the button is actioned the content is diplayed, then if actioned again it is
 * not diplayed and so on...
 *
 * @param id The id of the HTMLDivElement returned which is also used to generate ids of components.
 * @param divToAppendTo The div to append to.
 * @param elementToInsertBefore The element to insert before. (If null then the content will be appended to the div.)
 * @param content The content to expand/collapse.
 * @param buttonLabel The label for the button.
 * @param componentMargin The margin for the button.
 * @param margin The margin for HTMLDivElement created.
 * @returns A HTMLDivElement containing a HTMLButtonElement and the content.
 */
function getCollapsibleDiv(id, divToAddTo, elementToInsertBefore, content, buttonLabel, componentMargin, margin) {
    let div = createDiv(id, margin);
    let bid = (0, util_1.getID)(id, exports.s_button);
    let b = createButton(buttonLabel + " " + exports.sy_downTriangle, bid, componentMargin);
    b.className = exports.s_collapsible;
    b.addEventListener('click', function () {
        let parts = b.textContent.split(' ');
        parts[parts.length - 1] = parts[parts.length - 1] === exports.sy_downTriangle ? exports.sy_upTriangle : exports.sy_downTriangle;
        b.textContent = parts.join(' ');
    });
    // Add the button and content to the div.
    div.appendChild(b);
    div.appendChild(content);
    if (elementToInsertBefore != null) {
        divToAddTo.insertBefore(div, elementToInsertBefore);
    }
    else {
        divToAddTo.appendChild(div);
    }
    setCollapsibleEventListener(b);
    return div;
}
/**
 * For setting the event listener for a collapsible element.
 * @param e The element to add the event listener to.
 */
function setCollapsibleEventListener(e) {
    // Remove any existing event listener.
    e.removeEventListener("click", toggleCollapsible);
    // Add new event listener.
    e.addEventListener("click", toggleCollapsible);
}
/**
 * For toggling the collapsible content.
 */
function toggleCollapsible() {
    this.classList.toggle("active");
    let nes = this.nextElementSibling;
    if (nes != null) {
        if (nes instanceof HTMLDivElement) {
            if (nes.style.display === "block") {
                nes.style.display = "none";
            }
            else {
                nes.style.display = "block";
            }
        }
        else {
            console.log("toggleCollapsible: nextElementSibling is not an HTMLDivElement");
        }
    }
    else {
        console.log("toggleCollapsible: nextElementSibling is null");
    }
}
/**
 * Create and return HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelTextContent The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
function createLabelWithInput(type, id, componentMargin, divMargin, func, value, labelTextContent) {
    let div = createFlexDiv(undefined, divMargin);
    let input = createInputWithFunction(type, id, componentMargin, func, value);
    let label = createLabel(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(input);
    return div;
}
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the HTMLInputElement.
 * @param margin The margin for the HTMLInputElement.
 * @param func The function called on a change to the input.
 * @returns A HTMLInputElement.
 */
function createInputWithFunction(type, id, margin, func, value) {
    let input = createInput(type, id, margin);
    input.onchange = func;
    input.value = value;
    resizeInputElement(input);
    return input;
}
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number", "checkbox").
 * @param id The id of the HTMLInputElement.
 * @param margin The margin for the HTMLInputElement.
 * @returns A HTMLInputElement.
 */
function createInput(type, id, margin) {
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    Object.assign(input.style, margin);
    input.style.fontSize = '1em'; // Set the font size with a relative unit.
    input.classList.add('auto-width');
    return input;
}
/**
 * Create and return HTMLDivElement that contains an HTMLLabelElement and a HTMLTextAreaElement.
 * @param id The id of the HTMLTextAreaElement.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelTextContent The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLTextAreaElement.
 */
function createLabelWithTextArea(id, componentMargin, divMargin, func, value, labelTextContent) {
    let div = createFlexDiv(undefined, divMargin);
    let ta = createTextAreaWithFunction(id, componentMargin, func, value);
    let label = createLabel(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(ta);
    return div;
}
/**
 * Create and return a HTMLTextAreaElement.
 * @param id The id of the HTMLTextAreaElement.
 * @param margin The margin for the HTMLInputElement.
 * @param func The function called on a change to the HTMLTextAreaElement.
 * @returns A HTMLInputElement.
 */
function createTextAreaWithFunction(id, margin, func, value) {
    let ta = createTextArea(id, margin);
    ta.onchange = func;
    ta.value = value;
    resizeTextAreaElement(ta);
    return ta;
}
/**
 * Create and return a HTMLTextAreaElement.
 * @param id The id of the HTMLTextAreaElement.
 * @param margin The margin for the HTMLTextAreaElement.
 * @returns A HTMLTextAreaElement.
 */
function createTextArea(id, margin) {
    let ta = document.createElement('textarea');
    ta.id = id;
    Object.assign(ta.style, margin);
    ta.style.fontSize = '1em'; // Set the font size with a relative unit.
    ta.classList.add('auto-width');
    return ta;
}
/**
 * Create a self closing tag.
 * @param attributes The attributes.
 * @param tagName The tag name.
 */
function getSelfClosingTag(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) {
        for (let [key, value] of attributes) {
            s += " " + key + "=\"" + value + "\"";
        }
    }
    return s + " />";
}
/**
 * For resizing an HTMLInputElement to the width of what it contains.
 * @param i The HTMLInputElement to resize.
 * @param minSize The minimum size of the input.
 */
function resizeInputElement(i, minSize) {
    if (minSize == undefined) {
        minSize = 4;
    }
    i.style.width = (i.value.length + minSize) + "ch";
}
/**
 * For resizing an HTMLSelectElement to the width of what it contains.
 *
 * @param s The HTMLSelectElement to resize.
 * @param minSize The minimum size of the input.
 */
function resizeSelectElement(s, minSize) {
    if (minSize == undefined) {
        minSize = 6;
    }
    s.style.width = (s.value.length + minSize) + "ch";
}
/**
 * For resizing an HTMLTextAreaElement to the width of what it contains.
 *
 * @param ta The HTMLTextAreaElement to resize.
 * @param minSize The minimum size of the input.
 */
function resizeTextAreaElement(ta, minSize) {
    if (minSize == undefined) {
        minSize = 6;
    }
    ta.style.width = (ta.value.length + minSize) + "ch";
}
/**
 * Create and return an HTMLSelectElement.
 *
 * @param options The options.
 * @param name The name for the select.
 * @param value The value for the select.
 * @param id id + "_" + name will be the select element ID.
 * @param margin The margin for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */
function createSelectElement(options, name, value, id, margin) {
    let select = document.createElement('select');
    options.forEach(option => {
        select.name = name;
        select.id = id;
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
    select.value = value;
    select.style.fontSize = '1em'; // Set the font size with a relative unit.
    select.classList.add('auto-width');
    resizeSelectElement(select);
    Object.assign(select.style, margin);
    return select;
}
/**
 * Create and return an HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 *
 * @param textContent The text content of the label.
 * @param options The options for the HTMLSelectElement.
 * @param name The name for the HTMLSelectElement.
 * @param value The value for the HTMLSelectElement.
 * @param id The id for the select.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns A HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 */
function createLabelWithSelect(textContent, options, name, value, id, componentMargin, divMargin) {
    let div = createFlexDiv(id, divMargin);
    let label = createLabel(textContent, componentMargin);
    div.appendChild(label);
    div.appendChild(createSelectElement(options, name, value, (0, util_1.getID)(id, exports.s_select), componentMargin));
    return div;
}
/**
 * Create and return an HTMLButtonElement.
 *
 * @param textContent The text content of the HTMLButtonElement.
 * @param id The id of the button.
 * @param margin The margin to go around the HTMLButtonElement.
 * @returns An HTMLButtonElement with the textContent and specified margin.
 */
function createButton(textContent, id, margin) {
    let button = document.createElement('button');
    button.textContent = textContent;
    if (id != undefined) {
        button.id = id;
    }
    if (margin != undefined) {
        Object.assign(button.style, margin);
    }
    button.style.fontSize = '1em'; // Set the font size with a relative unit.
    return button;
}
/**
 * Create and return an HTMLDivElement containing an HTMLLabelElement and a HTMLButtonElement.
 * @param labeltext The text content of the label.
 * @param textContent The text content of the button.
 * @param id The id of the button.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLButtonElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns An HTMLDivElement with the level margin containing an HTMLLabelElement and a HTMLButtonElement.
 */
function createLabelWithButton(labeltext, textContent, id, componentMargin, divMargin) {
    let div = createFlexDiv(undefined, divMargin);
    let label = createLabel(labeltext, componentMargin);
    label.htmlFor = id;
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild(createButton(textContent, id, componentMargin));
    return div;
}
/**
 * Create and return HTMLDivElement.
 * @param id The id of the HTMLDivElement.
 * @param margin The margin for the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */
function createDiv(id, margin) {
    let div = document.createElement("div");
    if (id != undefined) {
        div.id = id;
    }
    if (margin != undefined) {
        Object.assign(div.style, margin);
    }
    return div;
}
/**
 * Create and return HTMLDivElement style.display = 'flex' and style.flexWrap = 'wrap'.
 *
 * @param id The id of the HTMLDivElement.
 * @param margin The margin for the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */
function createFlexDiv(id, margin) {
    let div = createDiv(id, margin);
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    //div.classList.add('auto-width-flex');
    return div;
}
/**
 * Create and return HTMLLabelElement.
 *
 * @param textContent The text content of the HTMLLabelElement.
 * @param margin The margin for the HTMLLabelElement.
 * @param fontsize The font size for the label.
 * @returns An HTMLLabelElement with specified boundary.
 */
function createLabel(textContent, margin) {
    let label = document.createElement("label");
    Object.assign(label.style, margin);
    label.textContent = textContent;
    label.style.fontSize = '1em'; // Set the font size with a relative unit.
    return label;
}
/**
 * Create and return a HTMLTableElement.
 * @param id The id of the HTMLTableElement.
 * @param margin The margin for the HTMLTableElement.
 * @returns A HTMLTableElement.
 */
function createTable(id, margin) {
    let table = document.createElement('table');
    table.id = id;
    Object.assign(table.style, margin);
    return table;
}
/**
 * Create and return a HTMLTableRowElement.
 * @param id The id of the HTMLTableRowElement.
 * @param margin The margin for the HTMLTableRowElement.
 * @returns A HTMLTableRowElement.
 */
function addTableHeaderRow(table, content) {
    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    content.forEach(c => {
        let th = document.createElement("th");
        th.textContent = c;
        headerRow.appendChild(th);
    });
    return headerRow;
}
/**
 * Create and return a HTMLTableRowElement.
 * @param id The id of the HTMLTableRowElement.
 * @param margin The margin for the HTMLTableRowElement.
 * @returns A HTMLTableRowElement.
 */
function addTableRow(table, content) {
    let row = table.insertRow();
    content.forEach(c => {
        row.insertCell().textContent = c;
    });
    return row;
}
//# sourceMappingURL=html.js.map