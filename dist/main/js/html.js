"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectElement = exports.resizeSelectElement = exports.resizeInputElement = exports.getSelfClosingTag = exports.getInput = exports.makeCollapsible = exports.getCollapsibleDiv = void 0;
/**
 * Create a collapsible div.
 * @param content The content that will be collapsible.
 * @param buttonLabel The label of the button.
 * @param buttonId The id of the button.
 * @param buttonFontSize The font size of the button.
 * @param marginLeft The margin left of the button.
 * @param marginTop The margin top of the button.
 * @param marginBottom The margin bottom of the button.
 * @param contentDivId The id of the content div.
 * @param contentDivClassName The class of the content div.
 * @returns A collapsible div.
 */
function getCollapsibleDiv(content, buttonLabel, buttonId, buttonFontSize, marginLeft, marginTop, marginBottom, contentDivId, contentDivClassName) {
    let contentDiv = document.createElement('div');
    if (contentDivId != undefined) {
        contentDiv.id = contentDivId;
    }
    if (contentDivClassName != undefined) {
        contentDiv.className = contentDivClassName;
    }
    let button = document.createElement('button');
    if (buttonId != undefined) {
        button.id = buttonId;
    }
    button.className = 'collapsible';
    button.innerText = buttonLabel;
    if (buttonFontSize != undefined) {
        button.style.fontSize = buttonFontSize;
    }
    if (marginLeft != undefined) {
        button.style.marginLeft = marginLeft;
    }
    if (marginTop != undefined) {
        button.style.marginTop = marginTop;
    }
    if (marginBottom != undefined) {
        button.style.marginBottom = marginBottom;
    }
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
function getInput(type, id, func, value, labelText) {
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
    let container = document.createElement('div');
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
exports.getInput = getInput;
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
function getSelectElement(options, name, id) {
    let selectElement = document.createElement('select');
    options.forEach(option => {
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return selectElement;
}
exports.getSelectElement = getSelectElement;
//# sourceMappingURL=html.js.map