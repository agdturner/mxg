import {
    getSelfClosingTag
} from "./html";

/**
 * Get the attribute of an xml element.
 * @param xml The xml element to search in.
 * @param name The name of the attribute to search for.
 * @returns The value of the attribute.
 * @throws An error if the attribute is not found.
 */
export function getAttribute(xml: Element, name: string): string {
    let v: string | null = xml.getAttribute(name);
    if (!v) {
        throw new Error(name + ' attribute not found');
    }
    return v;
}

/**
 * Get the first element in element with a tag name tagName.
 * @param element The xml element to search in.
 * @param tagName The tag name of the elements to search for.
 * @returns The first element in element with a tag name tagName.
 * @throws An error if the element is not found.
 */
export function getFirstElement(element: Element, tagName: string): Element {
    let el: Element | null = element.getElementsByTagName(tagName)[0];
    if (el == null) {
        throw new Error(tagName + ' element not found');
    }
    return el;
}

/**
 * Get the first childNode.
 * @param element The xml element to search in.
 * @returns The first ChildNode if there is one.
 * @throws An error if the element has no childNodes.
 */
export function getFirstChildNode(element: Element): ChildNode {
    let cn: NodeListOf<ChildNode> = element.childNodes;
    if (cn == null) {
        throw new Error('Element has no childNodes');
    }
    return cn[0];
}

/**
 * Get the nodeValue of a Node throwing an Error if this is null.
 * @param node The node to get the nodeValue of.
 * @returns The nodeValue of the node.
 * @throws An error if the nodeValue is null.
 */
export function getNodeValue(node: Node): string {
    let nodeValue: string | null = node.nodeValue;
    if (nodeValue == null) {
        throw new Error('nodeValue is null');
    }
    return nodeValue;
}

/**
 * For convenience and to cope with when there is no node value as there is a blank.
 * @param e The Element
 * @returns The node value of the first child or "".
 */
export function getInputString(e: Element) {
    let s: string;
    let firstChildNode = getFirstChildNode(e);
    if (firstChildNode) {
        s = getNodeValue(firstChildNode).trim();
    } else {
        s = "";
    }
    return s;
}

/**
 * A class for a tag.
 */
export class Tag {

    /**
     * The tag name.
     */
    tagName: string;

    /**
     * @param tagName The tag name.
     */
    constructor(tagName: string) {
        this.tagName = tagName;
    }

    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param padding The padding (optional).
     * @returns A self closing tag.
     */
    toXML(padding?: string | undefined): string {
        let s = getSelfClosingTag(undefined, this.tagName);
        if (padding) {
            return "\n" + padding + s;
        }
        return s;
    }
}

/**
 * A class for representing A Tag with attributes.
 */
export class TagWithAttributes extends Tag {

    /**
     * The attributes.
     */
    attributes: Map<string, string>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, tagName: string) {
        super(tagName);
        this.attributes = attributes;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        let r = this.tagName + `(`;
        if (this.attributes) {
            this.attributes.forEach((value, key) => {
                r += `${key}(${value}), `;
            });
        }
        return r;
    }

    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * These are allowed and perhaps expected in MESMER XML format.
     * @param {string} padding The padding (Optional).
     * @returns An XML like representation.
     */
    toXML(padding?: string): string {
        let s: string = "";
        if (padding != undefined) {
            s += "\n" + padding;
        }
        s += '<' + this.tagName;
            for (let [k, v] of this.attributes) {
                s += ' ' + k + '="' + v.toString() + '"';
            }
        return s + ' />';
    }
}

/**
 * A class for representing a TagWithAttributes with a string as a value.
 */
export class StringNode extends TagWithAttributes {

    /**
     * The value.
     */
    value: string;

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, tagName: string, value: string) {
        super(attributes, tagName);
        this.value = value;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return super.toString() + `, ${this.value.toString()})`;
    }

    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    override toXML(padding?: string): string {
        return getTag(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}

/**
 * A class for representing a TagWithAttributes with a number as a value.
 */
export class NumberNode extends TagWithAttributes {

    /**
     * The value.
     */
    value: number;

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, tagName: string, value: number) {
        super(attributes, tagName);
        this.value = value;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return super.toString() + `, ${this.value.toString()})`;
    }

    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    override toXML(padding?: string): string {
        return getTag(this.value.toString().trim(), this.tagName, this.attributes, padding, false);
    }
}

/**
 * A class for representing a TagWithAttributes with an array of numbers as a value.
 */
export class NumberArrayNode extends TagWithAttributes {

    /**
     * The values.
     */
    values: number[];

    /**
     * The delimiter of the values.
     */
    delimiter: string = ",";

    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes: Map<string, string>, tagName: string, values: number[], delimiter?: string) {
        super(attributes, tagName);
        this.values = values;
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return super.toString() + `, ${this.values.toString()})`;
    }

    /**
     * Set the delimiter.
     * @param delimiter The delimiter.
     */
    setDelimiter(delimiter: string) {
        this.delimiter = delimiter;
    }

    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding?: string): string {
        return getTag(this.values.toString().replaceAll(",", this.delimiter), this.tagName, this.attributes, padding, false);
    }
}

/**
 * A class for representing attributes with attributes.
 */
export class NodeWithNodes extends TagWithAttributes {

    /**
     * The contents.
     */
    nodes: Map<number, Tag | TagWithAttributes | NodeWithNodes>;

    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     */
    constructor(attributes: Map<string, string>, tagName: string) {
        super(attributes, tagName);
        this.nodes = new Map();
    }

    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     * @returns The index of the node added.
     */
    addNode(node: Tag | TagWithAttributes | NodeWithNodes): void {
        this.nodes.set(this.nodes.size, node);
    }

    /**
     * @returns A string representation.
     */
    override toString(): string {
        let s = super.toString();
        this.nodes.forEach((v, k) => {
            s += `, ${v.toString()}`;
        });
        return s + ")";
    }

    /**
     * Get the XML representation.
     * @param pad The pad (Optional).
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        let padding1: string;
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s: string = "";
        if (this.nodes.size > 0) {
            this.nodes.forEach((v) => {
                if (v instanceof NodeWithNodes) {
                    s += (v as NodeWithNodes).toXML(pad, padding1);
                } else if (v instanceof TagWithAttributes) {
                    s += (v as TagWithAttributes).toXML(padding1);
                } else {
                    s += (v as Tag).toXML(padding1);
                }
            });
            return getTag(s, this.tagName, this.attributes, padding, true);
        } else {
            let s: string = getSelfClosingTag(this.attributes, this.tagName);
            if (padding != undefined) {
                return "\n" + padding + s;
            }
            return s;
        }
    }
}

/**
 * Create and return a XML start tag. For multiple attributes, pass them in a map.
 * If there is only one, then pass the name and value as separate parameters.
 * @param tagName The tag name.
 * @param attributes The attributes (optional).
 * @param padding The padding (optional).
 * @returns The XML start tag.
 */
export function getStartTag(tagName: string, attributes?: Map<string, any>, padding?: string): string {
    let s: string = "";
    if (padding != undefined) {
        s += "\n" + padding;
    }
    s += '<' + tagName;
    if (attributes) {
        for (let [k, v] of attributes) {
            s += ' ' + k + '="' + v.toString() + '"';
        }
    }
    return s + '>';
}

/**
 * Create and return an XML end tag.
 * @param tagName The tag name.
 * @param padding The padding (optional).
 * @param padValue Whether to pad the value (optional).
 * @returns The XML end tag.
 */
export function getEndTag(tagName: string, padding?: string, padValue?: boolean): string {
    let s: string = "";
    if (padValue) {
        if (padding != undefined) {
            s += "\n" + padding;
        }
    }
    return s + '</' + tagName + '>';
}

/**
 * Create and return an XML tag with content. For multiple attributes, pass them in a map.
 * If there is only one, then pass the name and value as separate parameters.
 * @param content The content of the tag.
 * @param tagName The tag name.
 * @param attributes The attributes (optional).
 * @param padding The padding (optional).
 * @param padValue Whether to pad the value (optional).
 * @returns The XML tag with content.
 */
export function getTag(content: string, tagName: string, attributes?: Map<string, any>,
    padding?: string, padValue?: boolean): string {
    let startTag: string = getStartTag(tagName, attributes, padding);
    let endTag: string = getEndTag(tagName, padding, padValue);
    return startTag + content + endTag;
}

/**
 * Get the attributes of an element.
 * @param element The element to get the attributes of.
 * @returns The attributes of the element.
 */
export function getAttributes(element: Element): Map<string, string> {
    let attributeNames: string[] = element.getAttributeNames();
    let attributes: Map<string, string> = new Map();
    attributeNames.forEach(function (attributeName) {
        let attributeValue: string | null = element.getAttribute(attributeName);
        if (attributeValue != null) {
            attributes.set(attributeName, attributeValue);
            //console.log("attributeName=" + attributeName + " attributeValue=" + attributeValue);
        }
    });
    return attributes;
}

/**
 * Get an XML element checking that it is the only one with a given tagName.
 * @param xml The XML document or element.
 * @param tagName The tag name.
 * @returns The element.
 * @throws An error if there is not exactly one element with the given tag name.
 */
export function getSingularElement(xml: XMLDocument | Element, tagName: string): Element {
    let e: HTMLCollectionOf<Element> = xml.getElementsByTagName(tagName);
    if (e.length != 1) {
        throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    }
    return e[0];
}