"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWithNodes = exports.NumberArrayNode = exports.NumberNode = exports.TagWithAttributes = void 0;
const xml_1 = require("./xml");
/**
 * A class for representing A Tag with attributes.
 * @param {Map<string, string>} attributes The attributes.
 */
class TagWithAttributes extends xml_1.Tag {
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
        this.attributes.forEach((value, key) => {
            r += `${key}(${value}), `;
        });
        return r;
    }
    /**
     * Get the XML representation.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding) {
        return (0, xml_1.getTag)("", this.tagName, this.attributes, padding, false);
    }
}
exports.TagWithAttributes = TagWithAttributes;
/**
 * A class for representing a TagWithAttributes with a number as a value.
 */
class NumberNode extends TagWithAttributes {
    /**
     * The value.
     */
    value;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value.
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
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding) {
        return (0, xml_1.getTag)(this.value.toString().trim(), this.tagName, this.attributes, padding, false);
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
    delimiter = ",";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {number[]} values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes, tagName, values, delimiter) {
        super(attributes, tagName);
        this.values = values;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }
    /**
     * @returns A string representation.
     */
    toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param {string} delimiter The delimiter.
     */
    setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(padding) {
        return (0, xml_1.getTag)(this.values.toString().replaceAll(",", this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
exports.NumberArrayNode = NumberArrayNode;
/**
 * A class for representing attributes with attributes.
 */
class NodeWithNodes extends TagWithAttributes {
    /**
     * The index contains the positions of values. If index[0] = 0 means that values[0] is the first thing to appear.
     * If index[1] = 4 would mean that the second and thrid things must be nodes[0] and nodes[1] respectively and that
     * values[1] is the second thing to appear.
     */
    nodes;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     */
    constructor(attributes, tagName) {
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {TagWithAttributes | NodeWithNodes} node The node.
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
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad, padding) {
        let padding1;
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s = "";
        this.nodes.forEach((v) => {
            if (v instanceof TagWithAttributes) {
                s += v.toXML(padding1);
            }
            else {
                s += v.toXML(pad, padding1);
            }
            s += v.toXML(padding1);
        });
        return (0, xml_1.getTag)(s, this.tagName, this.attributes, padding, false);
    }
}
exports.NodeWithNodes = NodeWithNodes;
//# sourceMappingURL=classes.js.map