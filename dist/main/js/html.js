"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeInput = exports.makeCollapsible = exports.getSelfClosingTag = exports.getInput = exports.getCollapsibleDiv = exports.getTable = exports.getTR = exports.getTD = exports.getTH = exports.getButton = exports.getHeading = void 0;
/**
 * Create a heading.
 * @param {string} text The text.
 * @param {number} level The level of the heading e.g. 1 for h1.
 * @param {string | undefined} id The id of the div.
 * @param {string | undefined} _class The class of the div.
 * @returns {string} Heading element.
 */
function getHeading(text, level, id, _class) {
    let heading = "<h" + level;
    if (id) {
        heading += " id=\"" + id + "\"";
    }
    if (_class) {
        heading += " class=\"" + _class + "\"";
    }
    return heading + ">" + text + "</h" + level + ">";
}
exports.getHeading = getHeading;
/**
 * @param {string} text The text.
 * @param {string | undefined} id The id of the button.
 * @param {string | undefined} _class The class of the button.
 * @param {string | undefined} func The function called on a click.
 * @returns The button.
 */
function getButton(text, id, _class, func) {
    let button = "<button";
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
exports.getButton = getButton;
/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */
function getTH(headings) {
    var th = "";
    for (let i = 0; i < headings.length; i++) {
        th += "<th>" + headings[i] + "</th>";
    }
    return getTR(th);
}
exports.getTH = getTH;
/**
 * Create a table cell.
 * @param {string} x A cell for a table row.
 * @param {boolean} contentEditable If true then the cell is set to be editable.
 * @returns {string} x wrapped in td tags.
 */
function getTD(x, contentEditable = false) {
    let r = "<td";
    if (contentEditable) {
        r += " contenteditable=\"true\"";
    }
    r += ">" + x + "</td>";
    return r;
}
exports.getTD = getTD;
/**
 * Create a table row.
 * @param {string} x A row for a table.
 * @returns {string} x wrapped in tr tags.
 */
function getTR(x) {
    return "<tr>" + x + "</tr>\n";
}
exports.getTR = getTR;
/**
 * Create a table.
 * @param {string} x Table rows for a table.
 * @returns {string} x wrapped in table tags.
 */
function getTable(x) {
    return "<table>" + x + "</table>";
}
exports.getTable = getTable;
/**
 * Create a collapsible div.
 * @param content The content of the div.
 * @param id The id of the div.
 * @param className The class of the div.
 * @returns A collapsible div.
 */
function getCollapsibleDiv(content, buttonLabel, id, className) {
    let div = document.createElement('div');
    if (id) {
        div.id = id;
    }
    if (className) {
        div.className = className;
    }
    // Create a button.
    let button = document.createElement('button');
    button.className = 'collapsible';
    if (buttonLabel) {
        button.innerText = buttonLabel;
    }
    else {
        button.innerText = 'Show/Hide Details';
    }
    // Append the button and the content.
    div.appendChild(button);
    div.appendChild(content);
    makeCollapsible();
    return div;
}
exports.getCollapsibleDiv = getCollapsibleDiv;
/**
 * Create a input.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change.
 * @param value The value of the input.
 * @param labelText The label text.
 * @returns An input HTML element.
 */
//export function getInput(type: string, id: string, func: (event: Event) => void, value: string, labelText?: string): HTMLInputElement {
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
    //return input;
    return container;
}
exports.getInput = getInput;
/**
 * Create a self closing tag.
 * @param {Map<string, string> | null} attributes The attributes.
 * @param {string} tagName The tag name.
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
 * For making elements with the class "collapsible" collapsible.
 */
function makeCollapsible() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        // Remove existing event listener
        coll[i].removeEventListener("click", toggleCollapsible);
        // Add new event listener
        coll[i].addEventListener("click", toggleCollapsible);
    }
}
exports.makeCollapsible = makeCollapsible;
/**
 * For toggling the collapsible content.
 */
function toggleCollapsible() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    }
    else {
        content.style.display = "block";
    }
}
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