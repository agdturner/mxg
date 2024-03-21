"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabel = exports.createFlexDiv = exports.createDiv = exports.createButton = exports.createLabelWithSelectElement = exports.createSelectElement = exports.resizeSelectElement = exports.resizeInputElement = exports.getSelfClosingTag = exports.createInput = exports.createInputWithFunction = exports.createLabelWithInput = exports.makeCollapsible = exports.getCollapsibleDiv = exports.remove = void 0;
/**
 * Remove a top level element.
 * @param id The id of the element to remove.
 */
function remove(id) {
    let e = document.getElementById(id);
    if (e != null) {
        e.parentNode?.removeChild(e);
        //} else {
        //    console.warn("remove: id=" + id + " not found.");
    }
}
exports.remove = remove;
/**
 * Create a collapsible div.
 * @param options The options for creating the collapsible div.
 * @returns A collapsible div.
 */
function getCollapsibleDiv({ content, buttonLabel, buttonFontSize = '', boundary = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' }, level = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' }, contentDivId = '', contentDivClassName = '' }) {
    let contentDiv = createDiv(boundary);
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
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelText The label text.
 * @param inputFontsize The font size of the input.
 * @param labelFontsize The font size of the label.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
function createLabelWithInput(type, id, boundary, level, func, value, labelContent, inputFontsize, labelFontsize) {
    let input = createInputWithFunction(type, id, boundary, func, value, inputFontsize);
    Object.assign(input.style, boundary);
    let label = createLabel(labelContent, boundary, labelFontsize);
    label.htmlFor = id;
    Object.assign(label.style, boundary);
    let container = createFlexDiv(level);
    container.appendChild(label);
    container.appendChild(input);
    return container;
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
 * @returns A HTMLInputElement.
 */
function createInput(type, id, boundary) {
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    Object.assign(input.style, boundary);
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
 * @param name The name.
 * @param id The id.
 * @returns An HTMLSelectElement.
 */
function createSelectElement(options, name, id, boundary) {
    let selectElement = document.createElement('select');
    options.forEach(option => {
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    Object.assign(selectElement.style, boundary);
    return selectElement;
}
exports.createSelectElement = createSelectElement;
/**
 * Create and return an HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 *
 * @param textContent The text content of the label.
 * @param options The options for the HTMLSelectElement.
 * @param name The name for the HTMLSelectElement.
 * @param id The id.
 * @param boundary The boundary to go around the HTMLLabelElement and HTMLSelectElement.
 * @returns A HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 */
function createLabelWithSelectElement(textContent, options, name, id, boundary) {
    let div = document.createElement('div');
    let label = createLabel(textContent, boundary);
    div.appendChild(label);
    let selectElement = document.createElement('select');
    div.appendChild(selectElement);
    options.forEach(option => {
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    Object.assign(selectElement.style, boundary);
    return div;
}
exports.createLabelWithSelectElement = createLabelWithSelectElement;
/**
 * Create and return an HTMLButtonElement.
 *
 * @param textContent The text content of the button.
 * @param marginLeft The left margin.
 * @param marginTop The top margin.
 * @param marginBottom The bottom margin.
 * @param marginRight The right margin
 * @returns An HTMLButtonElement with the textContent and specified boundary.
 */
function createButton(textContent, boundary) {
    let button = document.createElement('button');
    button.textContent = textContent;
    Object.assign(button.style, boundary);
    return button;
}
exports.createButton = createButton;
/**
 * Create and return HTMLDivElement with a 'flex' display style.
 *
 * @param marginLeft The left margin.
 * @param marginTop The top margin.
 * @param marginBottom The bottom margin.
 * @param marginRight The right margin.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */
function createDiv(boundary) {
    let div = document.createElement("div");
    Object.assign(div.style, boundary);
    return div;
}
exports.createDiv = createDiv;
/**
 * Create and return HTMLDivElement with a 'flex' display style.
 *
 * @param marginLeft The left margin.
 * @param marginTop The top margin.
 * @param marginBottom The bottom margin.
 * @param marginRight The right margin.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */
function createFlexDiv(boundary) {
    let div = createDiv(boundary);
    div.style.display = 'flex';
    return div;
}
exports.createFlexDiv = createFlexDiv;
/**
 * Create and return HTMLLabelElement.
 *
 * @param textContent The text content of the label.
 * @param marginLeft The left margin.
 * @param marginTop The top margin.
 * @param marginBottom The bottom margin.
 * @param marginRight The right margin.
 * @param fontsize The font size.
 * @returns An HTMLLabelElement with specified boundary.
 */
function createLabel(textContent, boundary, fontsize) {
    let label = document.createElement("label");
    Object.assign(label.style, boundary);
    label.textContent = textContent;
    if (fontsize != undefined) {
        //console.log("fontsize=" + fontsize);
        label.style.fontSize = fontsize;
    }
    return label;
}
exports.createLabel = createLabel;
//# sourceMappingURL=html.js.map