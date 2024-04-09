/**
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 * @param ids The set of ids to remove the id from.
 */
export function remove(id: string, ids?: Set<string>) {
    let e: HTMLElement | null = document.getElementById(id);
    if (e != null) {
        e.remove();
    }
    if (ids != undefined) {
        ids.delete(id);
    }
}

/**
 * Create a collapsible div.
 * @param divToAppendTo The div to append to.
 * @param content The content to be collapsible.
 * @param buttonLabel The label for the button.
 * @param buttonFontSize The font size for the button.
 * @param boundary The boundary for the div.
 * @param level The level for the div.
 * @param contentDivId The id for the content div.
 * @returns A div with collapsible content.
 */
export function getCollapsibleDiv(
    { divToAddTo: divToAppendTo, elementToInsertBefore, content, buttonLabel, buttonFontSize = '',
        boundary = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' },
        level = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' },
        contentDivId = '',
        contentDivClassName = '' }:
        {
            divToAddTo: HTMLDivElement,
            elementToInsertBefore: Element | null,
            content: HTMLElement,
            buttonLabel: string,
            buttonFontSize?: string,
            boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
            level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
            contentDivId?: string,
            contentDivClassName?: string
        }): HTMLDivElement {
    let div: HTMLDivElement = createDiv(contentDivId, boundary);
    div.className = contentDivClassName;
    let button: HTMLButtonElement = document.createElement('button');
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
    div.appendChild(button);
    div.appendChild(content);
    if (elementToInsertBefore != null) {
        divToAppendTo.insertBefore(div, elementToInsertBefore);
    } else {
        divToAppendTo.appendChild(div);
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
 * @param inputFontsize The font size of the input.
 * @param labelFontsize The font size of the label.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
export function createLabelWithInput(type: string, id: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    func: (event: Event) => any, value: string, labelTextContent: string, inputFontsize?: string): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(undefined, divMargin);
    let input: HTMLInputElement = createInputWithFunction(type, id, componentMargin, func, value, inputFontsize);
    let label: HTMLLabelElement = createLabel(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(input);
    return div;
}

/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change to the input.
 * @returns A HTMLInputElement.
 */
export function createInputWithFunction(type: string, id: string, boundary: {
    marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string
},
    func: (event: Event) => any, value: string, inputFontsize?: string): HTMLInputElement {
    let input: HTMLInputElement = createInput(type, id, boundary);
    input.onchange = func;
    input.value = value;
    if (inputFontsize != undefined) {
        input.style.fontSize = inputFontsize;
    }
    resizeInputElement(input);
    return input;
}

/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number", "checkbox").
 * @param id The id of the input.
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
    input.classList.add('auto-width');
    return input;
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
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */
export function resizeInputElement(input: HTMLInputElement, minSize?: number) {
    if (minSize == undefined) {
        minSize = 4;
    }
    input.style.width = (input.value.length + minSize) + "ch";
}

/**
 * For resizing an HTMLSelectElement to the width of what it contains.
 * 
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */
export function resizeSelectElement(input: HTMLSelectElement, minSize?: number) {
    if (minSize == undefined) {
        minSize = 6;
    }
    input.style.width = (input.value.length + minSize) + "ch";
}

/**
 * Create and return an HTMLSelectElement.
 * 
 * @param options The options.
 * @param name The name for the select.
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
    let div: HTMLDivElement = createFlexDiv(undefined, divMargin);
    let label: HTMLLabelElement = createLabel(textContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(createSelectElement(options, name, value, id, componentMargin));
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