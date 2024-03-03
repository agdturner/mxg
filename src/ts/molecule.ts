import {
    getEndTag, getStartTag, getTag, TagWithAttributes, NodeWithNodes, NumberArrayNode, NumberNode
} from './xml.js';

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
            console.warn('id is undefined');
        }
        let elementType: string | undefined = attributes.get("elementType");
        if (elementType == undefined) {
            console.warn('elementType is undefined');
        }
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
 * A class for representing an atomArray.
 */
export class AtomArray extends NodeWithNodes {

    /**
    * The tag name.
    */
    static readonly tagName: string = "atomArray";

    /**
     * 
     * @param {Map<string, string>} attributes The attributes.
     * @param {Atom[]} atoms The atoms.
     */
    constructor(attributes: Map<string, string>, atoms: Atom[]) {
        super(attributes, AtomArray.tagName);
        atoms.forEach(atom => {
            this.nodes.set(this.nodes.size, atom);
        });
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
}

/**
 * A class for representing a bondArray.
 */
export class BondArray extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "bondArray";

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Bond>} bonds A Map of bonds with keys as ids.
     */
    constructor(attributes: Map<string, string>, bonds: Bond[]) {
        super(attributes, BondArray.tagName);
        bonds.forEach(bond => {
            this.nodes.set(this.nodes.size, bond);
        });
    }
}

/**
 * A class for representing a property scalar.
 */
export class PropertyScalar extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "scalar";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, PropertyScalar.tagName, value);
    }
}

/**
 * A class for representing an property array.
 */
export class PropertyArray extends NumberArrayNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "array";

    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes: Map<string, string>, values: number[], delimiter?: string) {
        super(attributes, PropertyArray.tagName, values, delimiter);
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
     * @param {Map<string, string>} attributes The attributes.
     * @param {PropertyScalar | PropertyArray} property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyScalar | PropertyArray) {
        super(attributes, Property.tagName);
        this.nodes.set(0, property);
    }

    /**
     * @returns The property.
     */
    getProperty(): PropertyScalar | PropertyArray {
        return this.nodes.get(0) as PropertyScalar | PropertyArray;
    }
}

/**
 * A class for representing a propertyArray.
 */
export class PropertyList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "propertyList";

    /**
     * The properties.
     */
    properties: Map<string, Property>;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Property>} properties A Map of properties with keys as dictRefs.
     */
    constructor(attributes: Map<string, string>, properties: Map<string, Property>) {
        super(attributes, PropertyList.tagName);
        this.properties = properties;
        properties.forEach(property => {
            this.nodes.set(this.nodes.size, property);
        });
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
export class EnergyTransferModel extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:energyTransferModel";

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown[]} deltaEDowns The DeltaEDowns.
     */
    constructor(attributes: Map<string, string>, deltaEDowns: DeltaEDown[]) {
        super(attributes, EnergyTransferModel.tagName);
        deltaEDowns.forEach(deltaEDown => {
            this.nodes.set(this.nodes.size, deltaEDown);
        });
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
export class HinderedRotorPotential extends NodeWithNodes {

    static readonly xmlTagName: string = "me:HinderedRotorPotential";

    /**
     * @param attributes The attributes.
     * @param PotentialPoint The PotentialPoint.
     */
    constructor(attributes: Map<string, string>, PotentialPoint: PotentialPoint[]) {
        super(attributes, HinderedRotorPotential.xmlTagName);
        PotentialPoint.forEach(PotentialPoint => {
            this.nodes.set(this.nodes.size, PotentialPoint);
        });
    }

}


/**
 * A class for representing the extra DOSC method.
 */
export class ExtraDOSCMethod extends NodeWithNodes {

    static readonly xmlTagName: string = "me:ExtraDOSCMethod";

    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     * @param HinderedRotorPotential The HinderedRotorPotential.
     */
    constructor(attributes: Map<string, string>, bondRef: BondRef, HinderedRotorPotential: HinderedRotorPotential) {
        super(attributes, ExtraDOSCMethod.xmlTagName);
        this.nodes.set(0, bondRef);
        this.nodes.set(1, HinderedRotorPotential);
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

    /**
     * The energy dictRef.
     */
    static readonly energyDictRef: string = "me:ZPE";

    /**
     * The rotation constants dictRef.
     */
    static readonly rotConstsDictRef: string = 'me:rotConsts';

    /**
     * The vibration frequencies dictRef.
     */
    static readonly vibFreqsDictRef: string = 'me:vibFreqs';

    /**
     * The index.
     */
    index: Map<string, number> = new Map();

    // The molecule ID.
    id: string;

    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes may include "description" and "active" (and posibly others), but these do not exist for all molecules.
     * @param {Atom | AtomArray | undefined} atoms The atoms.
     * @param {Bond | undefined} bonds The bonds.
     * @param {PropertyList | Property | undefined} properties The properties.
     * @param {EnergyTransferModel | undefined} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | undefined} dOSCMethod The method for calculating density of states.
     */
    constructor(
        attributes: Map<string, string>,
        atoms: Atom | AtomArray | undefined,
        bonds: Bond | undefined,
        properties: PropertyList | Property | undefined,
        energyTransferModel?: EnergyTransferModel,
        dOSCMethod?: DOSCMethod) {
        super(attributes, Molecule.tagName);
        let id: string | undefined = this.attributes.get("id");
        if (id == undefined) {
            throw new Error('id is undefined');
        }
        this.id = id;
        let i: number = 0;
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            if (atoms instanceof Atom) {
                this.index.set(Atom.tagName, i);
            } else {
                this.index.set(AtomArray.tagName, i);
            }
            i++;
        }
        // Bonds
        if (bonds) {
            this.nodes.set(i, bonds);
            this.index.set(BondArray.tagName, i);
            i++;
        }
        // Properties
        if (properties == undefined) {
            throw new Error('properties is undefined');
        }
        this.nodes.set(i, properties);
        this.index.set(PropertyList.tagName, i);
        i++;
        // EnergyTransferModel
        if (energyTransferModel) {
            this.nodes.set(i, energyTransferModel);
            this.index.set(EnergyTransferModel.tagName, i);
            i++;
        }
        // DOSCMethod
        if (dOSCMethod) {
            this.nodes.set(i, dOSCMethod);
            this.index.set(DOSCMethod.tagName, i);
        }
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
     * @returns The properties of the molecule.
     */
    getProperties(): PropertyList | Property | undefined {
        let i: number | undefined = this.index.get(PropertyList.tagName);
        if (i == undefined) {
            i = this.index.get(Property.tagName);
            if (i == undefined) {
                return undefined;
            } else {
                return this.nodes.get(i) as Property;
            }
        } else {
            return this.nodes.get(i) as PropertyList;
        }
    }

    /**
     * Get a property scalar.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number | undefined} The scalar property.
     */
    getPropertyScalar(dictRef: string): number | undefined {
        let properties: PropertyList | Property | undefined = this.getProperties();
        if (properties == undefined) {
            return undefined;
        } else if (properties instanceof PropertyList) {
            let property: Property | undefined = properties.properties.get(dictRef);
            if (property == undefined) {
                return undefined;
            }
            return (property.getProperty() as PropertyScalar).value;
        } else {
            let scalar: PropertyScalar | undefined = (properties as Property).getProperty() as PropertyScalar;
            if (scalar == undefined) {
                return undefined;
            }
            return scalar.value;
        }
    }

    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set or defined.
     */
    getEnergy(): number {
        let energy: number | undefined = this.getPropertyScalar(Molecule.energyDictRef);
        if (energy == undefined) {
            return 0;
        }
        return energy;
    }

    /**
     * Set the scalar property.
     * @param {string} dictRef The dictRef of the property.
     * @param {number} value The value of the property.
     * @param {string} units The units of the property.
     */
    setPropertyScalar(dictRef: string, value: number, units?: string) {
        let properties: PropertyList | Property | undefined = this.getProperties();
        if (properties == undefined) {
            this.nodes.set(this.nodes.size, this.createPropertyScalar(dictRef, value, units));
            this.index.set(Property.tagName, this.nodes.size);
        } else if (properties instanceof Property) {
            if (properties.getProperty().attributes.get(dictRef)) {
                (properties.getProperty() as PropertyScalar).value = value;
            } else {
                let plmap: Map<string, Property> = new Map();
                plmap.set(dictRef, properties);
                plmap.set(dictRef, this.createPropertyScalar(dictRef, value, units));
                properties = new PropertyList(new Map(), plmap);
            }
        } else {
            let scalarProperty: Property | undefined = properties.properties.get(dictRef)
            if (scalarProperty == undefined) {
                properties.properties.set(dictRef, this.createPropertyScalar(dictRef, value, units));
            } else {
                (scalarProperty.getProperty() as PropertyScalar).value = value;
            }
        }
    }

    /**
     * @param dictRef The dictRef of the property.
     * @param value The value of the property.
     * @param units The units of the property.
     * @returns A scalar property.
     */
    createPropertyScalar(dictRef: string, value: number, units?: string): Property {
        let propertyAttributes: Map<string, string> = new Map();
        propertyAttributes.set("dictRef", Molecule.energyDictRef);
        let scalarAttributes: Map<string, string> = new Map();
        if (units) {
            scalarAttributes.set("units", units);
        }
        return new Property(propertyAttributes, new PropertyScalar(scalarAttributes, value));
    }

    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */
    setEnergy(energy: number) {
        this.setPropertyScalar(Molecule.energyDictRef, energy);
    }

    /**
     * Get a property array.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number[] | undefined} The array property.
     */
    getPropertyArray(dictRef: string): number[] | undefined {
        let properties: PropertyList | Property | undefined = this.getProperties();
        if (properties == undefined) {
            return undefined;
        } else if (properties instanceof PropertyList) {
            let property: Property | undefined = properties.properties.get(dictRef);
            if (property == undefined) {
                return undefined;
            }
            return (property.getProperty() as PropertyArray).values;
        } else {
            if ((properties as Property).getProperty().tagName == dictRef) {
                let rotConsts: PropertyArray | undefined = (properties as Property).getProperty() as PropertyArray;
                if (rotConsts == undefined) {
                    return undefined;
                }
                return rotConsts.values;
            } else {
                return undefined;
            }
        }
    }

    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */
    getRotConsts(): number[] | undefined {
        return this.getPropertyArray(Molecule.rotConstsDictRef);
    }

    /**
     * Get the vibration frequencies of the molecule.
     * @returns The vibration frequencies of the molecule.
     */
    getVibFreqs(): number[] | undefined {
        return this.getPropertyArray(Molecule.vibFreqsDictRef);
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
            console.log(this.getMoleculeAbb().toString());
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