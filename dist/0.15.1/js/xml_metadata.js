"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataList = exports.DCContributor = exports.DCDate = exports.DCCreator = exports.DCSource = exports.DCTitle = exports.Metadata = void 0;
const xml_js_1 = require("./xml.js");
/**
 * Metadata.
 * In the XML, the "metadata" element is a child of the "metadataList" element.
 * For example:
 * <metadataList>
 *  <metadata name="dc:description" content="Experimental data for OH (Hydroxyl radical)"/>
 *  <metadata name="dc:source" content="http://cccbdb.nist.gov/"/>
 *  <metadata name="dc:contributor" content="Dr Reaction Kinetics"/>
 *  <metadata name="dc:date" content="20240311_090547"/>
 * </metadataList>
 */
class Metadata extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'metadata';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, Metadata.tagName);
    }
    /**
     * Get string for label.
     */
    getLabelText() {
        let label = '';
        this.attributes.forEach((value, key) => {
            label += key + ': ' + value + ' ';
        });
        return label;
    }
}
exports.Metadata = Metadata;
/**
 * DCTitle.
 * In the XML, the "dc:title" element is a child of the "metadataList" element.
 * For example:
 * <metadataList xmlns:dc="http://purl.org/dc/elements/1.1/">
 *  <dc:title>Title</dc:title>
 *  <dc:source>file.xml</dc:source>
 *  <dc:creator>Mesmer v7.0</dc:creator>
 *  <dc:date>20240311_090547</dc:date>
 *  <dc:contributor>Dr Reaction Kinetics</dc:contributor>
 * </metadataList>
 */
class DCTitle extends xml_js_1.StringNode {
    /**
     * Tag name.
     */
    static tagName = 'dc:title';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, value) {
        super(attributes, DCTitle.tagName, value);
    }
}
exports.DCTitle = DCTitle;
/**
 * DC Source.
 */
class DCSource extends xml_js_1.StringNode {
    /**
     * Tag name.
     */
    static tagName = 'dc:source';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, value) {
        super(attributes, DCSource.tagName, value);
    }
}
exports.DCSource = DCSource;
/**
 * DC Creator.
 */
class DCCreator extends xml_js_1.StringNode {
    /**
     * Tag name.
     */
    static tagName = 'dc:creator';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, value) {
        super(attributes, DCCreator.tagName, value);
    }
}
exports.DCCreator = DCCreator;
/**
 * DC Date.
 */
class DCDate extends xml_js_1.StringNode {
    /**
     * Tag name.
     */
    static tagName = 'dc:date';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, value) {
        super(attributes, DCDate.tagName, value);
    }
}
exports.DCDate = DCDate;
/**
 * DC Contributor.
 */
class DCContributor extends xml_js_1.StringNode {
    /**
     * Tag name.
     */
    static tagName = 'dc:contributor';
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, value) {
        super(attributes, DCContributor.tagName, value);
    }
}
exports.DCContributor = DCContributor;
/**
 * In the XML, the "metadata" element is a child of the "mesmer" element.
 * Attributes include:
 * xmlns:dc
 * Child elements include:
 * dc:title
 * dc:source
 * dc:creator
 * dc:date
 * dc:contributor
 */
class MetadataList extends xml_js_1.NodeWithNodes {
    /**
     * Tag name.
     */
    static tagName = 'metadataList';
    /**
     * To look up nodes by type.
     */
    index;
    /**
     * To look up metadata nodes by index.
     */
    metadataIndex;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, title, source, creator, date, contributor) {
        super(attributes, MetadataList.tagName);
        this.index = new Map();
        this.metadataIndex = new Map();
        if (title) {
            this.index.set(DCTitle.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (source) {
            this.index.set(DCSource.tagName, this.nodes.size);
            this.addNode(source);
        }
        if (creator) {
            this.index.set(DCCreator.tagName, this.nodes.size);
            this.addNode(creator);
        }
        if (date) {
            this.index.set(DCDate.tagName, this.nodes.size);
            this.addNode(date);
        }
        if (contributor) {
            this.index.set(DCContributor.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
    /**
     * Get the title.
     */
    getTitle() {
        if (this.index.has(DCTitle.tagName)) {
            let i = this.index.get(DCTitle.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param title The title.
     */
    setTitle(title) {
        if (this.index.has(DCTitle.tagName)) {
            let i = this.index.get(DCTitle.tagName);
            this.nodes.set(i, title);
        }
        else {
            this.index.set(DCTitle.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * Get the source.
     */
    getSource() {
        if (this.index.has(DCSource.tagName)) {
            let i = this.index.get(DCSource.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param source The source.
     */
    setSource(source) {
        if (this.index.has(DCSource.tagName)) {
            let i = this.index.get(DCSource.tagName);
            this.nodes.set(i, source);
        }
        else {
            this.index.set(DCSource.tagName, this.nodes.size);
            this.addNode(source);
        }
    }
    /**
     * Get the creator.
     */
    getCreator() {
        if (this.index.has(DCCreator.tagName)) {
            let i = this.index.get(DCCreator.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param creator The creator.
     */
    setCreator(creator) {
        if (this.index.has(DCCreator.tagName)) {
            let i = this.index.get(DCCreator.tagName);
            this.nodes.set(i, creator);
        }
        else {
            this.index.set(DCCreator.tagName, this.nodes.size);
            this.addNode(creator);
        }
    }
    /**
     * Get the date.
     */
    getDate() {
        if (this.index.has(DCDate.tagName)) {
            let i = this.index.get(DCDate.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param date The date.
     */
    setDate(date) {
        if (this.index.has(DCDate.tagName)) {
            let i = this.index.get(DCDate.tagName);
            this.nodes.set(i, date);
        }
        else {
            this.index.set(DCDate.tagName, this.nodes.size);
            this.addNode(date);
        }
    }
    /**
     * Get the contributor.
     */
    getContributor() {
        if (this.index.has(DCContributor.tagName)) {
            let i = this.index.get(DCContributor.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param contributor The contributor.
     */
    setContributor(contributor) {
        if (this.index.has(DCContributor.tagName)) {
            let i = this.index.get(DCContributor.tagName);
            this.nodes.set(i, contributor);
        }
        else {
            this.index.set(DCContributor.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
    /**
     * Add metadata.
     * @param metadata The metadata.
     */
    addMetadata(metadata) {
        this.metadataIndex.set(this.metadataIndex.size, this.nodes.size);
        this.addNode(metadata);
    }
    /**
     * Get metadata.
     */
    getMetadata() {
        let metadata = [];
        for (let i = 0; i < this.metadataIndex.size; i++) {
            let j = this.metadataIndex.get(i);
            metadata.push(this.nodes.get(j));
        }
        return metadata;
    }
}
exports.MetadataList = MetadataList;
//# sourceMappingURL=xml_metadata.js.map