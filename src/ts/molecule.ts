import {
    getEndTag, getStartTag, getTag, TagWithAttributes, NodeWithNodes, NumberArrayNode, NumberNode
} from './xml.js';

import {
    mapToString
} from './util.js';

/**
 * A class for representing an atom.
 * @param {Map<string, string>} attributes The attributes.
 * If there is no "id" or "elementType" key an error will be thrown.
 */
export class Atom extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "atom";

    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Atom.tagName);
        let id: string | undefined = attributes.get("id");
        if (id == undefined) {
            throw new Error('id is undefined');
        }
        let elementType: string | undefined = attributes.get("elementType");
        if (elementType == undefined) {
            throw new Error('elementType is undefined');
        }
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        let s = super.toString();
        return s + `)`;
    }

    /**
     * @returns The id of the atom.
     */
    get id(): string {
        return this.attributes.get("id") as string;
    }

    /**
     * @returns The element type of the atom.
     */
    get elementType(): string {
        return this.attributes.get("elementType") as string;
    }
}

/**
 * A class for representing an atomic bond - a bond beteen two atoms.
 * @param {Map<string, string>} attributes The attributes.
 * @param {Atom} atomA One atom.
 * @param {Atom} atomB Another atom.
 * @param {string} order The order of the bond.
 */
export class Bond extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "bond";

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Bond.tagName);
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        let s = super.toString();
        return s + `)`;
    }
}


/**
 * A class for representing a property.
 */
export class Property extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "property";

    /**
     * The property value.
     */
    property: NumberNode | NumberArrayNode;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {NumberNode | NumberArrayWithAttributes} property The property.
     */
    constructor(attributes: Map<string, string>, property: NumberNode | NumberArrayNode) {
        super(attributes, Property.tagName);
        this.property = property;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return super.toString() + ` (${this.property.toString()}))`;
    }

    /**
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        let padding1: string | undefined = undefined;
        if (pad != undefined) {
            if (padding != undefined) {
                padding1 = padding + pad;
            }
        }
        return getTag(this.property.toXML(padding1), Property.tagName, this.attributes, padding, true);
    }
}

/**
 * Represents the deltaEDown class.
 */
export class DeltaEDown extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:deltaEDown";

    /**
     * @param attributes The attributes.
     * @param units The units.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, DeltaEDown.tagName, value);
    }
}

/**
 * A class for representing an energy transfer model.
 */
export class EnergyTransferModel extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:energyTransferModel";

    /**
     * The DeltaEDown.
     */
    deltaEDowns: DeltaEDown[];

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown[]} deltaEDowns The DeltaEDowns.
     */
    constructor(attributes: Map<string, string>, deltaEDowns: DeltaEDown[]) {
        super(attributes, EnergyTransferModel.tagName);
        this.deltaEDowns = deltaEDowns;
    }

    /**
     * @param padding - Optional padding string for formatting the XML output.
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        let padding1: string = "";
        if (padding != undefined) {
            if (pad != undefined) {
                padding1 = padding + pad;
            }
        }
        // deltaEDowns
        let deltaEDowns_xml: string = "";
        this.deltaEDowns.forEach(d => {
            deltaEDowns_xml += d.toXML(padding1);
        });
        if (pad == undefined) {
            return getTag(deltaEDowns_xml, EnergyTransferModel.tagName,
                this.attributes, padding, false);
        } else {
            return getTag(deltaEDowns_xml, EnergyTransferModel.tagName,
                this.attributes, padding, true);
        }
    }
}

/**
 * A class for representing a method for calculating the density of states.
 */
export class DOSCMethod extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:DOSCMethod";

    constructor(attributes: Map<string, string>) {
        super(attributes, DOSCMethod.tagName);
    }
}

/**
 * A class for representing a bondRef.
 */
export class BondRef extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly xmlTagName: string = "me:bondRef";

    /**
     * For storing the bondRef.
     */
    bondRef: string;

    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */
    constructor(attributes: Map<string, string>, bondRef: string) {
        super(attributes, BondRef.xmlTagName);
        this.bondRef = bondRef;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return super.toString + ` (${this.bondRef}))`;
    }

    /**
     * @param padding The padding (Optional).
     * @returns A tag representation.
     */
    toXML(padding?: string): string {
        let s: string = getStartTag(BondRef.xmlTagName);
        if (padding) {
            return "\n" + padding + s;
        }
        s += this.bondRef;
        return s + getEndTag(BondRef.xmlTagName);
    }
}

/**
 * A class for representing a PotentialPoint.
 */
export class PotentialPoint extends TagWithAttributes {

    static readonly xmlTagName: string = "me:PotentialPoint";

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, PotentialPoint.xmlTagName);
    }
}

/**
 * A class for representing a HinderedRotorPotential.
 */
export class HinderedRotorPotential extends TagWithAttributes {

    static readonly xmlTagName: string = "me:HinderedRotorPotential";

    PotentialPoint: PotentialPoint[];

    /**
     * @param attributes The attributes.
     * @param PotentialPoint The PotentialPoint.
     */
    constructor(attributes: Map<string, string>, PotentialPoint: PotentialPoint[]) {
        super(attributes, HinderedRotorPotential.xmlTagName);
        this.PotentialPoint = PotentialPoint;
    }

}


/**
 * A class for representing the extra DOSC method.
 */
export class ExtraDOSCMethod extends TagWithAttributes {

    static readonly xmlTagName: string = "me:ExtraDOSCMethod";

    /**
     * The bondRef.
     */
    bondRef: BondRef;

    /**
     * The HinderedRotorPotential.
     */
    hinderedRotorPotential: HinderedRotorPotential;

    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     * @param HinderedRotorPotential The HinderedRotorPotential.
     */
    constructor(attributes: Map<string, string>, bondRef: BondRef, HinderedRotorPotential: HinderedRotorPotential) {
        super(attributes, ExtraDOSCMethod.xmlTagName);
        this.bondRef = bondRef;
        this.hinderedRotorPotential = HinderedRotorPotential;
    }
}


/**
 * A class for representing a molecule.
 */
export class Molecule extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "molecule";

    // The molecule ID.
    id: string;
    // Atoms
    atoms: Map<string, Atom>;
    // Bonds
    bonds: Map<string, Bond>;
    // Properties
    properties: Map<string, Property>;
    // EnergyTransferModel
    energyTransferModel?: EnergyTransferModel;
    // DOSCMethod
    dOSCMethod?: DOSCMethod;

    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes may include "description" and "active" (and posibly others), but these do not exist for all molecules.
     * @param {Map<string, Atom>} atoms A Map of atoms with keys as ids.
     * @param {Map<string, Bond>} bonds A Map of bonds with. The keys combine the ids of the two bonded atoms.
     * @param {Map<string, Property>} properties A map of properties.
     * @param {EnergyTransferModel | null} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | null} dOSCMethod The method for calculating density of states.
     */
    constructor(
        attributes: Map<string, string>,
        atoms: Map<string, Atom>,
        bonds: Map<string, Bond>,
        properties: Map<string, Property>,
        energyTransferModel?: EnergyTransferModel,
        dOSCMethod?: DOSCMethod) {
        super(attributes, Molecule.tagName);
        let id: string | undefined = this.attributes.get("id");
        if (id == undefined) {
            throw new Error('id is undefined');
        }
        this.id = id;
        this.atoms = atoms;
        this.bonds = bonds;
        this.properties = properties;
        this.energyTransferModel = energyTransferModel;
        this.dOSCMethod = dOSCMethod;
    }

    /** 
     * @returns A string representation.
     */
    toString(): string {
        let r = `Molecule(id(${this.getID()}), `;
        let description: string | undefined = this.getDescription();
        if (description != undefined) {
            r += `description(${description}), `;
        }
        let active: boolean | undefined = this.getActive();
        if (active != undefined) {
            r += `active(${active}), `;
        }
        if (this.atoms.size > 0) {
            r += `atoms(${mapToString(this.atoms)}), `;
        }
        if (this.bonds.size > 0) {
            r += `bonds(${mapToString(this.bonds)}), `;
        }
        if (this.properties.size > 0) {
            r += `properties(${mapToString(this.properties)}), `;
        }
        if (this.energyTransferModel) {
            r += `energyTransferModel(${this.energyTransferModel.toString()}), `;
        }
        if (this.dOSCMethod) {
            r += `dOSCMethod(${this.dOSCMethod.toString()}), `;
        }
        return r + `)`;
    }

    /**
     * @return The id of the molecule.
     */
    getID(): string {
        return this.attributes.get("id") as string;
    }

    /**
     * Gets the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */
    getDescription(): string | undefined {
        return this.attributes.get("description");
    }

    /**
     * Gets the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */
    getActive(): boolean | undefined {
        let active = this.attributes.get("active");
        if (active != undefined) {
            return true;
        }
        return active;
    }

    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set.
     * @throws An error if "me.ZPE" is a property, but is not mapped to a PropertyScalar.
     */
    getEnergy(): number {
        let zpe: Property | undefined = this.properties.get('me:ZPE');
        if (zpe == undefined) {
            return 0;
        }
        if (zpe.property instanceof NumberNode) {
            return zpe.property.value;
        } else {
            throw new Error("Expected a PropertyScalar but got a PropertyArray and not sure how to handle that.");
        }
    }

    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */
    setEnergy(energy: number) {
        let property: Property | undefined = this.properties.get('me:ZPE');
        if (property == undefined) {
            throw new Error("No me.ZPE property found");
        }
        if (property.property instanceof NumberArrayNode) {
            throw new Error("Unexpected NumberArrayNode.");
        } else {
            property.property.value = energy;
        }
    }

    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */
    getRotationConstants(): number[] | undefined {
        let property: Property | undefined = this.properties.get('me:rotConsts');
        if (property != undefined) {
            if (property.property != null) {
                if (property.property instanceof NumberNode) {
                    return [property.property.value];
                } else {
                    return property.property.values;
                }
            } else {
                return undefined;
            }
        }
        return property;
    }

    /**
     * Get the VibrationFrequencies of the molecule.
     * @returns The VibrationFrequencies of the molecule.
     */
    getVibrationFrequencies(): number[] | undefined {
        let property: Property | undefined = this.properties.get('me:vibFreqs');
        if (property != undefined) {
            if (property.property instanceof NumberNode) {
                return [property.property.value];
            } else if (property.property instanceof NumberArrayNode) {
                return property.property.values;
            } else {
                return undefined;
            }
        }
        return property;
    }

    /**
     * @param {string} tagName The tag name.
     * @param {string} pad The pad (Optional).
     * @param {number} level The level of padding (Optional).
     * @returns An XML representation.
     */
    toXML(tagName: string, pad?: string, level?: number): string {
        // Padding
        let padding0: string = "";
        let padding1: string = "";
        let padding2: string = "";
        let padding3: string = "";
        if (pad != undefined && level != undefined) {
            padding0 = pad.repeat(level);
            padding1 = padding0 + pad;
            padding2 = padding1 + pad;
            padding3 = padding2 + pad;
        }
        // Atoms
        let atoms_xml: string = "";
        for (let atom of this.atoms.values()) {
            atoms_xml += atom.toXML(padding2);
        }
        if (this.atoms.size > 1) {
            if (atoms_xml != "") {
                atoms_xml = getTag(atoms_xml, "atomArray", undefined, padding1, true);
            }
        }
        // Bonds
        let bonds_xml: string = "";
        for (let bond of this.bonds.values()) {
            bonds_xml += bond.toXML(padding2);
        }
        if (bonds_xml != "") {
            bonds_xml = getTag(bonds_xml, "bondArray", undefined, padding1, true);
        }
        // Properties
        let properties_xml: string = "";
        this.properties.forEach(property => {
            let property_xml: string = property.property.toXML(padding3);
            properties_xml += getTag(property_xml, Property.tagName, property.attributes, padding2, true);
        });
        if (this.properties.size > 1) {
            if (properties_xml != "") {
                properties_xml = getTag(properties_xml, "propertyList", undefined, padding1, true);
            }
        }
        // EnergyTransferModel
        let energyTransferModel_xml: string = "";
        if (this.energyTransferModel) {
            energyTransferModel_xml = this.energyTransferModel.toXML(pad, padding1);
        }
        // DOSCMethod
        let dOSCMethod_xml: string = "";
        if (this.dOSCMethod) {
            dOSCMethod_xml = this.dOSCMethod.toXML(padding1);
        }
        return getTag(atoms_xml + bonds_xml + properties_xml + energyTransferModel_xml + dOSCMethod_xml,
            tagName, this.attributes, padding0, true);
    }
}

/**
 * A class for representing a MoleculeRef.
 */
export class MoleculeRef extends NodeWithNodes {

    /**
     * A reference to the molecules.
     */
    molecules: Map<string, Molecule>

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes: Map<string, string>, tagName: string, molecule: TagWithAttributes,
        molecules: Map<string, Molecule>) {
        super(attributes, tagName);
        this.nodes.set(0, molecule);
        this.molecules = molecules;
    }

    getMoleculeAbb(): TagWithAttributes {
        return this.nodes.get(0) as TagWithAttributes;
    }

    /**
     * A convenience method to get the ref (the molecule ID) of the transition state.
     * @returns The ref of the transition state.
     */
    getRef(): string {
        let s: string | undefined = this.getMoleculeAbb().attributes.get("ref");
        if (s == null) {
            throw new Error('Attribute "ref" is undefined.');
        }
        return s;
    }

    /**
     * A convenience method to get the molecule.
     * @returns {Molecule} The molecule.
     * @throws An error if the molecule is not found.
     */
    getMolecule(): Molecule {
        let ref: string = this.getRef();
        let molecule: Molecule | undefined = this.molecules.get(ref);
        if (molecule == null) {
            throw new Error(`Molecule with ref ${ref} not found in molecules`);
        }
        return molecule;
    }
}