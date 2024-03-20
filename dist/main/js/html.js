"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlexDiv = exports.createButton = exports.getSelectElement = exports.resizeSelectElement = exports.resizeInputElement = exports.getSelfClosingTag = exports.createInputDiv = exports.createInput = exports.makeCollapsible = exports.getCollapsibleDiv = exports.remove = void 0;
/**
 * Remove a top level element.
 * @param id The id of the element to remove.
 */
function remove(id) {
    let e = document.getElementById(id);
    if (e != null) {
        e.parentNode?.removeChild(e);
    }
    else {
        console.warn("remove: id=" + id + " not found.");
    }
}
exports.remove = remove;
/**
 * Create a collapsible div.
 * @param options The options for creating the collapsible div.
 * @returns A collapsible div.
 */
function getCollapsibleDiv({ content, buttonLabel, buttonFontSize = '', level = { marginLeft: '', marginTop: '', marginBottom: '' }, contentDivId = '', contentDivClassName = '' }) {
    let contentDiv = document.createElement('div');
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
 * Create a input. This is an HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelText The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
function createInput(type, id, boundary, func, value, labelText) {
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.onchange = func;
    input.value = value;
    let label = document.createElement('label');
    label.htmlFor = id;
    if (labelText) {
        label.textContent = labelText + ": ";
    }
    else {
        label.textContent = "";
    }
    Object.assign(label.style, boundary);
    Object.assign(input.style, boundary);
    let container = document.createElement('div');
    container.appendChild(label);
    container.appendChild(input);
    Object.assign(container, boundary);
    return container;
}
exports.createInput = createInput;
/**
 * @param type The input type e.g. "text", "number".
 * @param id The id of the input.
 * @param onchange The function called on a change to the input.
 * @param inputString The value of the input.
 * @param label The label text.
 * @param marginLeft The margin left.
 * @param marginTop The margin top.
 * @param marginBottom The margin bottom.
 * @param marginRight The margin right.
 * @returns An HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
function createInputDiv(type, id, boundary, onchange, inputString, label) {
    let inputDiv = createInput(type, id, boundary, onchange, inputString, label);
    let inputElement = inputDiv.querySelector('input');
    inputElement.value = inputString;
    resizeInputElement(inputElement);
    return inputDiv;
}
exports.createInputDiv = createInputDiv;
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
 * @param options The options.
 * @param name The name.
 * @param id The id.
 * @returns An HTMLSelectElement.
 */
function getSelectElement(options, name, id, boundary) {
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
exports.getSelectElement = getSelectElement;
/**
 * Creates and returns an HTMLButtonElement.
 *
 * @param textContent The text content of the button.
 * @param marginLeft The left margin.
 * @param marginTop The top margin.
 * @param marginBottom The bottom margin.
 * @param marginRight The right margin
 * @returns An HTMLButtonElement with the textContent and the specified margins.
 */
function createButton(textContent, boundary) {
    let button = document.createElement('button');
    button.textContent = textContent;
    Object.assign(button.style, boundary);
    return button;
}
exports.createButton = createButton;
/**
 * Creates and returns an HTMLDivElement with a 'flex' display style.
 *
 * @param marginLeft The left margin.
 * @param marginTop The top margin.
 * @param marginBottom The bottom margin.
 * @param marginRight The right margin.
 * @returns An HTMLDivElement with a 'flex' display style and the specified margins.
 */
function createFlexDiv(boundary) {
    let div = document.createElement("div");
    div.style.display = 'flex';
    Object.assign(div.style, boundary);
    return div;
}
exports.createFlexDiv = createFlexDiv;
//# sourceMappingURL=html.js.map