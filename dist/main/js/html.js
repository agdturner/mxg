"use strict";
/**
 * Get a heading.
 * @param text The text.
 * @param type The heading type (i.e. 'h1', 'h2', 'h3', 'h4', 'h5', or 'h6').
 * @param id The id of the div.
 * @param className The class of the div.
 */
/*
export function getH3(text: string, type: string, id?: string, className?: string): HTMLHeadingElement {
    //let heading: HTMLHeadingElement = document.createElement(type);
    let heading: HTMLHeadingElement = document.createElement("h3");
    heading.innerHTML = text;
    if (id != undefined) {
        heading.id = id;
    }
    if (className != undefined) {
        heading.className = className;
    }

    return heading + ">" + text + "</h" + level + ">";
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeInput = exports.getSelfClosingTag = exports.getInput = exports.makeCollapsible = exports.getCollapsibleDiv = void 0;
/**
 * @deprecated There is no need for this method - simply use HTMLButtonElement.
 * Create a button.
 * @param text The text.
 * @param id The id of the button.
 * @param  _class The class of the button.
 * @param  func The function called on a click.
 * @returns The button.
 */
/*
export function getButton(text: string, id?: string, _class?: string, func?: string): HTMLButtonElement {
    let button: HTMLButtonElement = new HTMLButtonElement();
    button.innerHTML = text;
    button.type = "button";
    button.onclick = function () {

    if (id) {
        button += " id=\"" + id + "\"";
    }
    if (_class) {
        button += " class=\"" + _class + "\"";
    }
    if (func) {
        button += " onclick=\"" + func + "\"";
    }
    return button + ">" + text + "</button>";
}
*/
/**
 * Create a table cell.
 * @param x A cell for a table row.
 * @param contentEditable If true then the cell is set to be editable.
 * @returns x wrapped in td tags.
 */
/*
export function getTD(x: string, contentEditable: boolean = false): HTMLTableCellElement {
    let td: HTMLTableCellElement = document.createElement('td');
    if (contentEditable) {
        td.contentEditable = "true";
    }
    td.innerHTML = x;
    return td;
}
*/
/**
 * @deprecated There is no need for this method - simply use HTMLTableRowElement.
 * Create a table row.
 * @param x A row for a table.
 * @returns x wrapped in tr tags.
 */
/*
export function getTR(x: string): HTMLTableRowElement {
    let tr: HTMLTableRowElement = document.createElement('tr');
    tr.innerHTML = x;
    return tr;
}
*/
/**
 * @deprecated There is no need for this method - simply use HTMLTableElement.
 * Create a table.
 * @param {string} x Table rows for a table.
 * @returns {string} x wrapped in table tags.
 */
/*
export function getTable(x: string): HTMLTableElement {
    let table: HTMLTableElement = document.createElement('table');
    table.innerHTML = x;
    return table;
}
*/
/**
 * Create a collapsible div.
 * @param buttonId The id of the button.
 * @param buttonLabel The label of the button.
 * @param content The content that will be collapsible.
 * @param contentDivId The id of the content div.
 * @param contentDivClassName The class of the content div.
 * @returns A collapsible div.
 */
function getCollapsibleDiv(buttonId, buttonLabel, content, contentDivId, contentDivClassName) {
    let contentDiv = document.createElement('div');
    contentDiv.id = contentDivId;
    if (contentDivClassName != undefined) {
        contentDiv.className = contentDivClassName;
    }
    let button = document.createElement('button');
    button.id = buttonId;
    button.className = 'collapsible';
    button.innerText = buttonLabel;
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
 * For resizing an input to the width of what it contains.
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */
function resizeInput(input, minSize) {
    if (minSize == undefined) {
        minSize = 4;
    }
    input.style.width = (input.value.length + minSize) + "ch";
}
exports.resizeInput = resizeInput;
//# sourceMappingURL=html.js.map