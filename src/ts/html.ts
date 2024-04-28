import { getID } from "./util";

export const s_button: string = "button";
export const s_collapsible: string = "collapsible";
export const sy_downTriangle: string = "\u25BC"; // ▼
export const sy_upTriangle: string = "\u25B2"; // ▲
export const s_select: string = "select";

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
 * @param buttonMargin The margin for the button.
 * @param margin The margin for HTMLDivElement created. 
 * @returns A HTMLDivElement containing a HTMLButtonElement and the content.
 */
export function getCollapsibleDiv(id: string, divToAddTo: HTMLDivElement, elementToInsertBefore: Element | null,
            content: HTMLElement, 
            buttonLabel: string, 
            componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
            margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createDiv(id, margin);
    let buttonId: string = getID(id, s_button);
    let button: HTMLButtonElement = createButton(buttonLabel + " " + sy_downTriangle, buttonId, componentMargin);
    button.className = s_collapsible;
    button.addEventListener('click', function () {
        let parts = button.textContent!.split(' ');
        parts[parts.length - 1] = parts[parts.length - 1] === sy_downTriangle ? sy_upTriangle : sy_downTriangle;
        button.textContent = parts.join(' ');
    });
    div.appendChild(button);
    div.appendChild(content);
    if (elementToInsertBefore != null) {
        divToAddTo.insertBefore(div, elementToInsertBefore);
    } else {
        divToAddTo.appendChild(div);
    }
    setCollapsibleEventListener(button);
    return div;
}

/**
 * For setting the event listener for a collapsible element.
 * @param e The element to add the event listener to.
 */
function setCollapsibleEventListener(e: Element): void {
    // Remove any existing event listener.
    e.removeEventListener("click", toggleCollapsible);
    // Add new event listener.
    e.addEventListener("click", toggleCollapsible);
}

/**
 * For toggling the collapsible content.
 */
function toggleCollapsible(this: HTMLElement): void {
    this.classList.toggle("active");
    let nes: Element | null = this.nextElementSibling;
    if (nes != null) {
        if (nes instanceof HTMLDivElement) {
            if (nes.style.display === "block") {
                nes.style.display = "none";
            } else {
                nes.style.display = "block";
            }
        } else {
            console.log("toggleCollapsible: nextElementSibling is not an HTMLDivElement");
        }
    } else {
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
export function createLabelWithInput(type: string, id: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    func: (event: Event) => any, value: string, labelTextContent: string): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, divMargin);
    let input: HTMLInputElement = createInputWithFunction(type, id, componentMargin, func, value);
    let label: HTMLLabelElement = createLabel(labelTextContent, componentMargin);
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
export function createInputWithFunction(type: string, id: string, 
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    func: (event: Event) => any, value: string): HTMLInputElement {
    let input: HTMLInputElement = createInput(type, id, margin);
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
export function createInput(type: string, id: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string })
    : HTMLInputElement {
    let input: HTMLInputElement = document.createElement('input');
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
export function createLabelWithTextArea(id: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    func: (event: Event) => any, value: string, labelTextContent: string): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, divMargin);
    let ta: HTMLTextAreaElement = createTextAreaWithFunction(id, componentMargin, func, value);
    let label: HTMLLabelElement = createLabel(labelTextContent, componentMargin);
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
export function createTextAreaWithFunction(id: string, 
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    func: (event: Event) => any, value: string): HTMLTextAreaElement {
    let ta: HTMLTextAreaElement = createTextArea(id, margin);
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
export function createTextArea(id: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string })
    : HTMLTextAreaElement {
    let ta: HTMLTextAreaElement = document.createElement('textarea');
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
export function getSelfClosingTag(attributes: Map<string, string> | undefined, tagName: string): string {
    let s: string = "<" + tagName;
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
export function resizeInputElement(i: HTMLInputElement, minSize?: number) {
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
export function resizeSelectElement(s: HTMLSelectElement, minSize?: number) {
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
export function resizeTextAreaElement(ta: HTMLTextAreaElement, minSize?: number) {
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
export function createSelectElement(options: string[] | Set<string>, name: string, value: string, id: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLSelectElement {
    let select: HTMLSelectElement = document.createElement('select');
    options.forEach(option => {
        select.name = name;
        select.id = id;
        let optionElement: HTMLOptionElement = document.createElement('option');
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
export function createLabelWithSelect(textContent: string, options: string[] | Set<string>,
    name: string, value: string, id: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(id, divMargin);
    let label: HTMLLabelElement = createLabel(textContent, componentMargin);
    div.appendChild(label);
    div.appendChild(createSelectElement(options, name, value, getID(id, s_select), componentMargin));
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
export function createButton(textContent: string, id?: string,
    boundary?: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    let button: HTMLButtonElement = document.createElement('button');
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

/**
 * Create and return an HTMLDivElement containing an HTMLLabelElement and a HTMLButtonElement.
 * @param labeltext The text content of the label.
 * @param textContent The text content of the button.
 * @param id The id of the button.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLButtonElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns An HTMLDivElement with the level margin containing an HTMLLabelElement and a HTMLButtonElement.
 */
export function createLabelWithButton(labeltext: string, textContent: string, id: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, divMargin);
    let label: HTMLLabelElement = createLabel(labeltext, componentMargin);
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
export function createDiv(id?: string,
    margin?: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = document.createElement("div");
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
export function createFlexDiv(id?: string,
    margin?: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createDiv(id, margin);
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    //div.classList.add('auto-width-flex');
    return div;
}

/**
 * Create and return HTMLLabelElement.
 *
 * @param textContent The text content of the HTMLLabelElement.
 * @param margin The margin to go around the HTMLLabelElement.
 * @param fontsize The font size for the label.
 * @returns An HTMLLabelElement with specified boundary.
 */
export function createLabel(textContent: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLLabelElement {
    let label: HTMLLabelElement = document.createElement("label");
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
export function createTable(id: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLTableElement {
    let table: HTMLTableElement = document.createElement('table');
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
export function addTableRow(table: HTMLTableElement, content: string[]): HTMLTableRowElement {
    let row: HTMLTableRowElement = table.insertRow();
    content.forEach(c => {
        row.insertCell().textContent = c;
    });
    return row;
}