
import { NodeWithNodes, StringNode } from './xml.js';

/**
 * DC Title.
 */
export class Title extends StringNode {

    /**
     * Tag name.
     */
    public static tagName = 'dc:title';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Title.tagName, value);
    }
}

/**
 * DC Source.
 */
export class Source extends StringNode {

    /**
     * Tag name.
     */
    public static tagName = 'dc:source';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Source.tagName, value);
    }
}

/**
 * DC Creator.
 */
export class Creator extends StringNode {

    /**
     * Tag name.
     */
    public static tagName = 'dc:creator';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Creator.tagName, value);
    }
}

/**
 * DC Date.
 */
export class Date extends StringNode {

    /**
     * Tag name.
     */
    public static tagName = 'dc:date';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Date.tagName, value);
    }
}

/**
 * DC Contributor.
 */
export class Contributor extends StringNode {

    /**
     * Tag name.
     */
    public static tagName = 'dc:contributor';

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, value: string) {
        super(attributes, Contributor.tagName, value);
    }
}

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
export class MetadataList extends NodeWithNodes {

    /**
     * Tag name.
     */
    public static tagName = 'metadataList';

    /**
     * To look up nodes by type.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>, title?: Title, source?: Source, creator?: Creator, date?: Date, 
        contributor?: Contributor) {
        super(attributes, MetadataList.tagName);
        this.index = new Map<string, number>();
        if (title) {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (source) {
            this.index.set(Source.tagName, this.nodes.size);
            this.addNode(source);
        }
        if (creator) {
            this.index.set(Creator.tagName, this.nodes.size);
            this.addNode(creator);
        }
        if (date) {
            this.index.set(Date.tagName, this.nodes.size);
            this.addNode(date);
        }
        if (contributor) {
            this.index.set(Contributor.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }

    /**
     * Get the title.
     */
    public getTitle(): Title | undefined {
        if (this.index.has(Title.tagName)) {
            let i: number = this.index.get(Title.tagName)!;
            return this.nodes.get(i) as Title;
        }
    }

    /**
     * @param title The title.
     */
    setTitle(title: Title) {
        if (this.index.has(Title.tagName)) {
            let i: number = this.index.get(Title.tagName)!;
            this.nodes.set(i, title);
        } else {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
    }

    /**
     * Get the source.
     */
    public getSource(): Source | undefined {
        if (this.index.has(Source.tagName)) {
            let i: number = this.index.get(Source.tagName)!;
            return this.nodes.get(i) as Source;
        }
    }

    /**
     * @param source The source.
     */
    setSource(source: Source) {
        if (this.index.has(Source.tagName)) {
            let i: number = this.index.get(Source.tagName)!;
            this.nodes.set(i, source);
        } else {
            this.index.set(Source.tagName, this.nodes.size);
            this.addNode(source);
        }
    }

    /**
     * Get the creator.
     */
    public getCreator(): Creator | undefined {
        if (this.index.has(Creator.tagName)) {
            let i: number = this.index.get(Creator.tagName)!;
            return this.nodes.get(i) as Creator;
        }
    }

    /**
     * @param creator The creator.
     */
    setCreator(creator: Creator) {
        if (this.index.has(Creator.tagName)) {
            let i: number = this.index.get(Creator.tagName)!;
            this.nodes.set(i, creator);
        } else {
            this.index.set(Creator.tagName, this.nodes.size);
            this.addNode(creator);
        }
    }

    /**
     * Get the date.
     */
    public getDate(): Date | undefined {
        if (this.index.has(Date.tagName)) {
            let i: number = this.index.get(Date.tagName)!;
            return this.nodes.get(i) as Date;
        }
    }

    /**
     * @param date The date.
     */
    setDate(date: Date) {
        if (this.index.has(Date.tagName)) {
            let i: number = this.index.get(Date.tagName)!;
            this.nodes.set(i, date);
        } else {
            this.index.set(Date.tagName, this.nodes.size);
            this.addNode(date);
        }
    }

    /**
     * Get the contributor.
     */
    public getContributor(): Contributor | undefined {
        if (this.index.has(Contributor.tagName)) {
            let i: number = this.index.get(Contributor.tagName)!;
            return this.nodes.get(i) as Contributor;
        }
    }

    /**
     * @param contributor The contributor.
     */
    setContributor(contributor: Contributor) {
        if (this.index.has(Contributor.tagName)) {
            let i: number = this.index.get(Contributor.tagName)!;
            this.nodes.set(i, contributor);
        } else {
            this.index.set(Contributor.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
}