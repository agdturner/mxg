"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWithNodes = exports.NumberArrayNode = exports.NumberNode = exports.StringNode = exports.TagWithAttributes = exports.Tag = void 0;
exports.getAttribute = getAttribute;
exports.getFirstElement = getFirstElement;
exports.getFirstChildNode = getFirstChildNode;
exports.getNodeValue = getNodeValue;
exports.getInputString = getInputString;
exports.getStartTag = getStartTag;
exports.getEndTag = getEndTag;
exports.getTag = getTag;
exports.getAttributes = getAttributes;
exports.getSingularElement = getSingularElement;
const html_js_1 = require("./html.js");
const util_js_1 = require("./util.js");
/**
 * Get the attribute of an xml element.
 * @param xml The xml element to search in.
 * @param name The name of the attribute to search for.
 * @returns The value of the attribute.
 * @throws An error if the attribute is not found.
 */
function getAttribute(xml, name) {
    let v = xml.getAttribute(name);
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
function getFirstElement(element, tagName) {
    let el = element.getElementsByTagName(tagName)[0];
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
function getFirstChildNode(element) {
    let cn = element.childNodes;
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
function getNodeValue(node) {
    let nodeValue = node.nodeValue;
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
function getInputString(e) {
    let s;
    let firstChildNode = getFirstChildNode(e);
    if (firstChildNode) {
        s = getNodeValue(firstChildNode).trim();
    }
    else {
        s = "";
    }
    return s;
}
/**
 * A class for a tag.
 */
class Tag {
    /**
     * The tag name.
     */
    tagName;
    /**
     * @param tagName The tag name.
     */
    constructor(tagName) {
        this.tagName = tagName;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param padding The padding (optional).
     * @returns A self closing tag.
     */
    toXML(padding) {
        let s = (0, html_js_1.getSelfClosingTag)(undefined, this.tagName);
        if (padding) {
            return "\n" + padding + s;
        }
        return s;
    }
}
exports.Tag = Tag;
/**
 * A class for representing A Tag with attributes.
 * <mytag id="1">
 */
class TagWithAttributes extends Tag {
    /**
     * The attributes.
     */
    attributes;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, tagName) {
        super(tagName);
        this.attributes = attributes;
    }
    /**
     * @returns A string representation.
     */
    toString() {
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
    toXML(padding) {
        let s = "";
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
exports.TagWithAttributes = TagWithAttributes;
/**
 * A class for representing a TagWithAttributes with a string as a value.
 */
class StringNode extends TagWithAttributes {
    /**
     * The value.
     */
    value;
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, tagName, value) {
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */
    toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding) {
        return getTag(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}
exports.StringNode = StringNode;
/**
 * A class for representing a TagWithAttributes with a number as a value.
 */
class NumberNode extends TagWithAttributes {
    /**
     * The value.
     */
    value;
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, tagName, value) {
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */
    toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding) {
        return getTag(this.value.toString(), this.tagName, this.attributes, padding, false);
    }
}
exports.NumberNode = NumberNode;
/**
 * A class for representing a TagWithAttributes with an array of numbers as a value.
 */
class NumberArrayNode extends TagWithAttributes {
    /**
     * The values.
     */
    values;
    /**
     * The delimiter of the values.
     */
    delimiter = " ";
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes, tagName, values, delimiter) {
        super(attributes, tagName);
        this.values = values;
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }
    /**
     * @returns The values.
     */
    getValues() {
        return this.values;
    }
    /**
     * @returns A string representation.
     */
    setValues(values) {
        this.values = values;
    }
    /**
     * @returns A string representation.
     */
    toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param delimiter The delimiter.
     */
    setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding) {
        return getTag((0, util_js_1.bigArrayToString)(this.values, this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
exports.NumberArrayNode = NumberArrayNode;
/**
 * A class for representing attributes with attributes.
 */
class NodeWithNodes extends TagWithAttributes {
    /**
     * The contents.
     */
    nodes;
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     */
    constructor(attributes, tagName) {
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     * @returns The index of the node added.
     */
    addNode(node) {
        this.nodes.set(this.nodes.size, node);
    }
    /**
     * @returns A string representation.
     */
    toString() {
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
    toXML(pad, padding) {
        let padding1;
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s = "";
        if (this.nodes.size > 0) {
            let i = 0;
            this.nodes.forEach((v) => {
                if (v == undefined) {
                    console.warn("Node " + i.toString() + " is undefined this.nodes.size = " + this.nodes.size);
                }
                else {
                    if (v instanceof NodeWithNodes) {
                        s += v.toXML(pad, padding1);
                    }
                    else if (v instanceof TagWithAttributes) {
                        s += v.toXML(padding1);
                    }
                    else {
                        s += v.toXML(padding1);
                    }
                }
                i++;
            });
            return getTag(s, this.tagName, this.attributes, padding, true);
        }
        else {
            let s = (0, html_js_1.getSelfClosingTag)(this.attributes, this.tagName);
            if (padding != undefined) {
                return "\n" + padding + s;
            }
            return s;
        }
    }
}
exports.NodeWithNodes = NodeWithNodes;
/**
 * Create and return a XML start tag. For multiple attributes, pass them in a map.
 * If there is only one, then pass the name and value as separate parameters.
 * @param tagName The tag name.
 * @param attributes The attributes (optional).
 * @param padding The padding (optional).
 * @returns The XML start tag.
 */
function getStartTag(tagName, attributes, padding) {
    let s = "";
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
function getEndTag(tagName, padding, padValue) {
    let s = "";
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
function getTag(content, tagName, attributes, padding, padValue) {
    let startTag = getStartTag(tagName, attributes, padding);
    let endTag = getEndTag(tagName, padding, padValue);
    return startTag + content + endTag;
}
/**
 * Get the attributes of an element.
 * @param element The element to get the attributes of.
 * @returns The attributes of the element.
 */
function getAttributes(element) {
    let attributeNames = element.getAttributeNames();
    let attributes = new Map();
    attributeNames.forEach(function (attributeName) {
        let attributeValue = element.getAttribute(attributeName);
        if (attributeValue != null) {
            attributes.set(attributeName.trim(), attributeValue.trim());
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
function getSingularElement(xml, tagName) {
    let e = xml.getElementsByTagName(tagName);
    if (e.length != 1) {
        throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    }
    return e[0];
}
//# sourceMappingURL=xml.js.map