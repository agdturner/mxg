/**
 * Create a collapsible div.
 * @param buttonId The id of the button.
 * @param buttonFontSize The font size of the button.
 * @param indent The indent of the button.
 * @param buttonLabel The label of the button.
 * @param content The content that will be collapsible.
 * @param contentDivId The id of the content div.
 * @param contentDivClassName The class of the content div.
 * @returns A collapsible div.
 */
export function getCollapsibleDiv(buttonId: string, buttonFontSize: string, indent: string, buttonLabel: string, content: HTMLElement, 
    contentDivId: string, contentDivClassName?: string): HTMLDivElement {
    let contentDiv: HTMLDivElement = document.createElement('div');
    contentDiv.id = contentDivId;
    if (contentDivClassName != undefined) {
        contentDiv.className = contentDivClassName;
    }
    let button: HTMLButtonElement = document.createElement('button');
    button.id = buttonId;
    button.className = 'collapsible';
    button.innerText = buttonLabel;
    button.style.fontSize = buttonFontSize;
    button.style.marginLeft = indent;
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
 * Create a input. This is an HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelText The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
export function getInput(type: string, id: string, func: (event: Event) => void, value: string, labelText?: string): HTMLDivElement {
        let input: HTMLInputElement = document.createElement('input');
    input.type = type;
    input.id = id;
    input.onchange = func;
    input.value = value;
    let label: HTMLLabelElement = document.createElement('label');
    label.htmlFor = id;
    if (labelText) {
        label.textContent = labelText + ": ";
    } else {
        label.textContent = "";
    }
    let container: HTMLDivElement = document.createElement('div');
    container.appendChild(label);
    container.appendChild(input);
    return container;
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
 * For resizing an input to the width of what it contains.
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */
export function resizeInput(input: HTMLInputElement, minSize?: number) {
    if (minSize == undefined) {
        minSize = 4;
    }
    input.style.width = (input.value.length + minSize) + "ch";
}