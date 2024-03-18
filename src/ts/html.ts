/**
 * Create a collapsible div.
 * @param options The options for creating the collapsible div.
 * @returns A collapsible div.
 */
export function getCollapsibleDiv({
    content,
    buttonLabel,
    buttonFontSize = '',
    marginLeft = '',
    marginTop = '',
    marginBottom = '',
    contentDivId = '',
    contentDivClassName = ''
}: {
    content: HTMLElement,
    buttonLabel: string,
    buttonFontSize?: string,
    marginLeft?: string,
    marginTop?: string,
    marginBottom?: string,
    contentDivId?: string,
    contentDivClassName?: string
}): HTMLDivElement {
    let contentDiv: HTMLDivElement = document.createElement('div');
    contentDiv.id = contentDivId;
    contentDiv.className = contentDivClassName;

    let button: HTMLButtonElement = document.createElement('button');
    button.id = contentDivId + 'Button';
    button.className = 'collapsible';
    button.innerText = `${buttonLabel} ▼`;
    button.addEventListener('click', function() {
        button.innerText = button.innerText.includes('▼') 
            ? `${buttonLabel} ▲` 
            : `${buttonLabel} ▼`;
    });
    button.style.fontSize = buttonFontSize;
    button.style.marginLeft = marginLeft;
    button.style.marginTop = marginTop;
    button.style.marginBottom = marginBottom;

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
export function getInput(type: string, id: string, func: (event: Event) => any, value: string, labelText?: string): HTMLDivElement {
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
 * @param type The input type e.g. "text", "number".
 * @param id The id of the input.
 * @param onchange The function called on a change to the input.
 * @param inputString The value of the input.
 * @param label The label text.
 * @param marginLeft The margin left.
 * @param marginTop The margin top.
 * @param marginBottom The margin bottom.
 * @returns An HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */
export function createInputDiv(type: string, id: string, onchange: (event: Event) => any, inputString: string, label: string, 
    marginLeft: string, marginTop: string, marginBottom: string): HTMLDivElement {
    let inputDiv: HTMLDivElement = getInput(type, id, onchange, inputString, label);
    inputDiv.style.marginLeft = marginLeft;
    inputDiv.style.marginTop = marginTop;
    inputDiv.style.marginBottom = marginBottom;
    let inputElement: HTMLInputElement = inputDiv.querySelector('input') as HTMLInputElement;
    inputElement.value = inputString;
    resizeInputElement(inputElement);
    return inputDiv;
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
 * @param options The options.
 * @param name The name.
 * @param id The id.
 * @returns An HTMLSelectElement.
 */
export function getSelectElement(options: string[] | Set<string>, name: string, id: string): HTMLSelectElement {
    let selectElement: HTMLSelectElement = document.createElement('select');
    options.forEach(option => {
        selectElement.name = name;
        selectElement.id = id;
        let optionElement: HTMLOptionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return selectElement;
}

/**
 * @param marginLeft The margin left.
 * @param marginTop The margin top.
 * @param marginBottom The margin bottom.
 * @param marginRight The margin right.
 * @returns An HTMLDivElement with a 'flex' display style.
 */
export function createFlexDiv(marginLeft?: string, marginTop?: string, marginBottom?: string, marginRight?: string): HTMLDivElement {
    let div: HTMLDivElement = document.createElement("div");
    div.style.display = 'flex';
    if (marginLeft) {
        div.style.marginLeft = marginLeft;
    }
    if (marginTop) {
        div.style.marginTop = marginTop;
    }
    if (marginBottom) {
        div.style.marginBottom = marginBottom;
    }
    if (marginRight) {
        div.style.marginRight = marginRight;
    }
    return div;
}