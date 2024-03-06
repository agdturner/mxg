/**
 * Create a heading.
 * @param {string} text The text.
 * @param {number} level The level of the heading e.g. 1 for h1.
 * @param {string | undefined} id The id of the div.
 * @param {string | undefined} _class The class of the div.
 * @returns {string} Heading element.
 */
export function getHeading(text: string, level: number, id?: string, _class?: string): string {
    let heading: string = "<h" + level;
    if (id) {
        heading += " id=\"" + id + "\"";
    }
    if (_class) {
        heading += " class=\"" + _class + "\"";
    }
    return heading + ">" + text + "</h" + level + ">";
}

/**
 * @param {string} text The text.
 * @param {string | undefined} id The id of the button.
 * @param {string | undefined} _class The class of the button.
 * @param {string | undefined} func The function called on a click.
 * @returns The button.
 */
export function getButton(text: string, id?: string, _class?: string, func?: string): string {
    let button: string = "<button";
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

/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */
export function getTH(headings: string[]): string {
    var th = "";
    for (let i = 0; i < headings.length; i++) {
        th += "<th>" + headings[i] + "</th>";
    }
    return getTR(th);
}

/**
 * Create a table cell.
 * @param {string} x A cell for a table row.
 * @param {boolean} contentEditable If true then the cell is set to be editable.  
 * @returns {string} x wrapped in td tags.
 */
export function getTD(x: string, contentEditable: boolean = false): string {
    let r: string = "<td";
    if (contentEditable) {
        r += " contenteditable=\"true\"";
    }
    r += ">" + x + "</td>";
    return r;
}

/**
 * Create a table row.
 * @param {string} x A row for a table.
 * @returns {string} x wrapped in tr tags.
 */
export function getTR(x: string): string {
    return "<tr>" + x + "</tr>\n";
}

/**
 * Create a table.
 * @param {string} x Table rows for a table.
 * @returns {string} x wrapped in table tags.
 */
export function getTable(x: string): string {
    return "<table>" + x + "</table>";
}

/**
 * Create a collapsible div.
 * @param content The content of the div.
 * @param id The id of the div.
 * @param className The class of the div.
 * @returns A collapsible div.
 */
export function getCollapsibleDiv(content: HTMLElement, buttonLabel?: string, id?: string, className?: string): HTMLDivElement {
    let div: HTMLDivElement = document.createElement('div');
    if (id) {
        div.id = id;
    }
    if (className) {
        div.className = className;
    }
    // Create a button.
    let button: HTMLButtonElement = document.createElement('button');
    button.className = 'collapsible';
    if (buttonLabel) {
        button.innerText = buttonLabel;
    } else {
        button.innerText = 'Show/Hide Details';
    }
    // Append the button and the content.
    div.appendChild(button);
    div.appendChild(content);

    makeCollapsible();
    return div;
}

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

    //return input;
    return container;
}

/**
 * Create a self closing tag.
 * @param {Map<string, string> | null} attributes The attributes.
 * @param {string} tagName The tag name.
 */
export function getSelfClosingTag(attributes: Map<string, string> | null, tagName: string): string {
    let s: string = "<" + tagName;
    if (attributes) {
        for (let [key, value] of attributes) {
            s += " " + key + "=\"" + value + "\"";
        }
    }
    return s + " />";
}

/**
 * For making elements with the class "collapsible" collapsible.
 */
export function makeCollapsible(): void {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        // Remove existing event listener
        coll[i].removeEventListener("click", toggleCollapsible);
        // Add new event listener
        coll[i].addEventListener("click", toggleCollapsible);
    }
}

/**
 * For toggling the collapsible content.
 */
function toggleCollapsible(this: HTMLElement): void {
    this.classList.toggle("active");
    var content = this.nextElementSibling as HTMLElement;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}