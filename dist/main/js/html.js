"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabel = exports.createFlexDiv = exports.createDiv = exports.createLabelWithButton = exports.createButton = exports.createLabelWithSelect = exports.createSelectElement = exports.resizeSelectElement = exports.resizeInputElement = exports.getSelfClosingTag = exports.createInput = exports.createInputWithFunction = exports.createLabelWithInput = exports.makeCollapsible = exports.getCollapsibleDiv = exports.remove = void 0;
/**
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 * @param ids The set of ids to remove the id from.
 */
function remove(id, ids) {
    let e = document.getElementById(id);
    if (e != null) {
        e.remove();
    }
    if (ids != undefined) {
        ids.delete(id);
    }
}
exports.remove = remove;
/**
 * Create a collapsible div.
 * @param options The options for creating the collapsible div.
 * @returns A collapsible div.
 */
function getCollapsibleDiv({ content, buttonLabel, buttonFontSize = '', boundary = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' }, level = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' }, contentDivId = '', contentDivClassName = '' }) {
    let contentDiv = createDiv(undefined, boundary);
    contentDiv.id = contentDivId;
    contentDiv.className = contentDivClassName;
    let button = document.createElement('button');
    button.id = contentDivId + 'Button';
    button.className = 'collapsible';
    button.innerText = `${buttonLabel} ▼`;
    button.addEventListener('click', function () {
        button.innerText = button.innerText.includes('▼')
            ? `${buttonLabel} ▲`
            : `${buttonLabel} ▼`;
    });
    button.style.fontSize = buttonFontSize;
    Object.assign(button.style, level);
    contentDiv.appendChild(button);
    contentDiv.appendChild(content);
    return contentDiv;
}
exports.getCollapsibleDiv = getCollapsibleDiv;
/**
 * For making elements with the class "collapsible" collapsible.
 */
function makeCollapsible() {
    var collapsibleElements = document.getElementsByClassName("collapsible");
    for (var i = 0; i < collapsibleElements.length; i++) {
        // Remove existing event listener
        collapsibleElements[i].removeEventListener("click", toggleCollapsible);
        // Add new event listener
        collapsibleElements[i].addEventListener("click", toggleCollapsible);
    }
}
exports.makeCollapsible = makeCollapsible;
/**
 * For toggling the collapsible content.
 */
function toggleCollapsible() {
    this.classList.toggle("active");
    let contentDiv = this.nextElementSibling;
    if (contentDiv.style.display === "block") {
        contentDiv.style.display = "none";
    }
    else {
        contentDiv.style.display = "block";
    }
}
/**
 * Create and return HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param boundary The boundary to go around the HTMLLabelElement and HTMLInputElement.
 * @param level The level to go around the HTMLLabelElement and HTMLInputElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelTextContent The label text.
 * @param inputFontsize The font size of the input.
 * @param labelFontsize The font size of the label.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
function createLabelWithInput(type, id, boundary, level, func, value, labelTextContent, inputFontsize) {
    let input = createInputWithFunction(type, id, boundary, func, value, inputFontsize);
    Object.assign(input.style, boundary);
    let label = createLabel(labelTextContent, boundary);
    label.htmlFor = id;
    Object.assign(label.style, boundary);
    let div = createFlexDiv(undefined, level);
    div.appendChild(label);
    div.appendChild(input);
    return div;
}
exports.createLabelWithInput = createLabelWithInput;
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change to the input.
 * @returns A HTMLInputElement.
 */
function createInputWithFunction(type, id, boundary, func, value, inputFontsize) {
    let input = createInput(type, id, boundary);
    input.onchange = func;
    input.value = value;
    if (inputFontsize != undefined) {
        input.style.fontSize = inputFontsize;
    }
    resizeInputElement(input);
    return input;
}
exports.createInputWithFunction = createInputWithFunction;
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number", "checkbox").
 * @param id The id of the input.
 * @param margin The margin for the HTMLInputElement.
 * @returns A HTMLInputElement.
 */
function createInput(type, id, margin) {
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    Object.assign(input.style, margin);
    input.classList.add('auto-width');
    return input;
}
exports.createInput = createInput;
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
exports.getSelfClosingTag = getSelfClosingTag;
/**
 * For resizing an HTMLInputElement to the width of what it contains.
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */
function resizeInputElement(input, minSize) {
    if (minSize == undefined) {
        minSize = 4;
    }
    input.style.width = (input.value.length + minSize) + "ch";
}
exports.resizeInputElement = resizeInputElement;
/**
 * For resizing an HTMLSelectElement to the width of what it contains.
 *
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */
function resizeSelectElement(input, minSize) {
    if (minSize == undefined) {
        minSize = 6;
    }
    input.style.width = (input.value.length + minSize) + "ch";
}
exports.resizeSelectElement = resizeSelectElement;
/**
 * Create and return an HTMLSelectElement.
 *
 * @param options The options.
 * @param name The name for the select.
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
exports.createSelectElement = createSelectElement;
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
    let div = createDiv(undefined, divMargin);
    let label = createLabel(textContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(createSelectElement(options, name, value, id, componentMargin));
    return div;
}
exports.createLabelWithSelect = createLabelWithSelect;
/**
 * Create and return an HTMLButtonElement.
 *
 * @param textContent The text content of the HTMLButtonElement.
 * @param id The id of the button.
 * @param margin The margin to go around the HTMLButtonElement.
 * @returns An HTMLButtonElement with the textContent and specified margin.
 */
function createButton(textContent, id, boundary) {
    let button = document.createElement('button');
    button.textContent = textContent;
    if (id != undefined) {
        button.id = id;
    }
    if (boundary != undefined) {
        Object.assign(button.style, boundary);
    }
    button.style.fontSize = '1em'; // Set the font size with a relative unit.
    return button;
}
exports.createButton = createButton;
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
exports.createLabelWithButton = createLabelWithButton;
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
exports.createDiv = createDiv;
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
    return div;
}
exports.createFlexDiv = createFlexDiv;
/**
 * Create and return HTMLLabelElement.
 *
 * @param textContent The text content of the HTMLLabelElement.
 * @param margin The margin to go around the HTMLLabelElement.
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
exports.createLabel = createLabel;
//# sourceMappingURL=html.js.map