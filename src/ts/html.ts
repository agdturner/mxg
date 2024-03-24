/**
 * Remove a top level element.
 * @param id The id of the element to remove.
 */
export function remove(id: string) {
    let e: HTMLElement | null = document.getElementById(id);
    if (e != null) {
        e.parentNode?.removeChild(e);
        //} else {
        //    console.warn("remove: id=" + id + " not found.");
    }
}

/**
 * Create a collapsible div.
 * @param options The options for creating the collapsible div.
 * @returns A collapsible div.
 */
export function getCollapsibleDiv(
    { content, buttonLabel, buttonFontSize = '',
        boundary = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' },
        level = { marginLeft: '', marginTop: '', marginBottom: '', marginRight: '' },
        contentDivId = '',
        contentDivClassName = ''
    }: {
        content: HTMLElement,
        buttonLabel: string,
        buttonFontSize?: string,
        boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
        level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
        contentDivId?: string,
        contentDivClassName?: string
    }): HTMLDivElement {
    let contentDiv: HTMLDivElement = createDiv(boundary);
    contentDiv.id = contentDivId;
    contentDiv.className = contentDivClassName;
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
    contentDiv.appendChild(button);
    contentDiv.appendChild(content);
    return contentDiv;
}

/**
 * For making elements with the class "collapsible" collapsible.
 */
export function makeCollapsible(): void {
    var collapsibleElements = document.getElementsByClassName("collapsible");
    for (var i = 0; i < collapsibleElements.length; i++) {
        // Remove existing event listener
        collapsibleElements[i].removeEventListener("click", toggleCollapsible);
        // Add new event listener
        collapsibleElements[i].addEventListener("click", toggleCollapsible);
    }
}

/**
 * For toggling the collapsible content.
 */
function toggleCollapsible(this: HTMLElement): void {
    this.classList.toggle("active");
    let contentDiv = this.nextElementSibling as HTMLElement;
    if (contentDiv.style.display === "block") {
        contentDiv.style.display = "none";
    } else {
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
export function createLabelWithInput(type: string, id: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    level: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    func: (event: Event) => any, value: string, labelContent: string, inputFontsize?: string): HTMLDivElement {
    let input: HTMLInputElement = createInputWithFunction(type, id, boundary, func, value, inputFontsize);
    Object.assign(input.style, boundary);
    let label: HTMLLabelElement = createLabel(labelContent, boundary);
    label.htmlFor = id;
    Object.assign(label.style, boundary);
    let container: HTMLDivElement = createFlexDiv(level);
    container.appendChild(label);
    container.appendChild(input);
    return container;
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
 * @param name The name.
 * @param id The id.
 * @param margin The margin for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */
export function createSelectElement(options: string[] | Set<string>, name: string, id: string,
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }):
    HTMLSelectElement {
    let selectElement: HTMLSelectElement = document.createElement('select');
    options.forEach(option => {
        selectElement.name = name;
        selectElement.id = id;
        let optionElement: HTMLOptionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    selectElement.style.fontSize = '1em'; // Set the font size with a relative unit.
    selectElement.classList.add('auto-width');
    Object.assign(selectElement.style, margin);
    return selectElement;
}

/**
 * Create and return an HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 * 
 * @param textContent The text content of the label.
 * @param options The options for the HTMLSelectElement.
 * @param name The name for the HTMLSelectElement.
 * @param id The id.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns A HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 */
export function createLabelWithSelectElement(textContent: string, options: string[] | Set<string>,
    name: string, id: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createDiv(divMargin);
    let label: HTMLLabelElement = createLabel(textContent, componentMargin);
    div.appendChild(label);
    let selectElement: HTMLSelectElement = document.createElement('select');
    div.appendChild(selectElement);
    options.forEach(option => {
        selectElement.name = name;
        selectElement.id = id;
        let optionElement: HTMLOptionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return div;
}

/**
 * Create and return an HTMLButtonElement.
 * 
 * @param textContent The text content of the HTMLButtonElement.
 * @param margin The margin to go around the HTMLButtonElement.
 * @returns An HTMLButtonElement with the textContent and specified margin.
 */
export function createButton(textContent: string,
    boundary: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLButtonElement {
    let button: HTMLButtonElement = document.createElement('button');
    button.textContent = textContent;
    Object.assign(button.style, boundary);
    button.style.fontSize = '1em'; // Set the font size with a relative unit.
    return button;
}

/**
 * Create and return an HTMLDivElement containing an HTMLLabelElement and a HTMLButtonElement.
 * 
 * @param textContent The text content of the button.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLButtonElement.
 * @param divMargin The margin for the HTMLDivElement.
 * 
 * @returns An HTMLDivElement with the level margin containing an HTMLLabelElement and a HTMLButtonElement.
 */
export function createLabelWithButton(labeltext: string, textContent: string,
    componentMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
    divMargin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string },
): HTMLDivElement {
    let div: HTMLDivElement = createFlexDiv(divMargin);
    let label: HTMLLabelElement = createLabel(labeltext, componentMargin);
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild(createButton(textContent, componentMargin));
    return div;
}

/**
 * Create and return HTMLDivElement.
 * @param margin The margin to go around the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */
export function createDiv(
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = document.createElement("div");
    Object.assign(div.style, margin);
    return div;
}

/**
 * Create and return HTMLDivElement with a 'flex' display style.
 *
 * @param margin The margin to go around the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */
export function createFlexDiv(
    margin: { marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string }): HTMLDivElement {
    let div: HTMLDivElement = createDiv(margin);
    div.style.display = 'flex';
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