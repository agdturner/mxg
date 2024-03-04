"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoleculeRef = exports.Molecule = exports.ExtraDOSCMethod = exports.Periodicity = exports.HinderedRotorPotential = exports.PotentialPoint = exports.BondRef = exports.DOSCMethod = exports.EnergyTransferModel = exports.DeltaEDown = exports.PropertyList = exports.Property = exports.PropertyArray = exports.PropertyScalar = exports.BondArray = exports.Bond = exports.AtomArray = exports.Atom = void 0;
const xml_js_1 = require("./xml.js");
/**
 * A class for representing an atom.
 * @param {Map<string, string>} attributes The attributes.
 * If there is no "id" or "elementType" key an error will be thrown.
 */
class Atom extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "atom";
    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */
    constructor(attributes) {
        super(attributes, Atom.tagName);
        let id = attributes.get("id");
        if (id == undefined) {
            console.warn('id is undefined');
        }
        let elementType = attributes.get("elementType");
        if (elementType == undefined) {
            console.warn('elementType is undefined');
        }
    }
    /**
     * @returns The id of the atom.
     */
    get id() {
        return this.attributes.get("id");
    }
    /**
     * @returns The element type of the atom.
     */
    get elementType() {
        return this.attributes.get("elementType");
    }
}
exports.Atom = Atom;
/**
 * A class for representing an atomArray.
 */
class AtomArray extends xml_js_1.NodeWithNodes {
    /**
    * The tag name.
    */
    static tagName = "atomArray";
    /**
     *
     * @param {Map<string, string>} attributes The attributes.
     * @param {Atom[]} atoms The atoms.
     */
    constructor(attributes, atoms) {
        super(attributes, AtomArray.tagName);
        atoms.forEach(atom => {
            this.nodes.set(this.nodes.size, atom);
        });
    }
}
exports.AtomArray = AtomArray;
/**
 * A class for representing an atomic bond - a bond beteen two atoms.
 * @param {Map<string, string>} attributes The attributes.
 * @param {Atom} atomA One atom.
 * @param {Atom} atomB Another atom.
 * @param {string} order The order of the bond.
 */
class Bond extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "bond";
    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, Bond.tagName);
    }
}
exports.Bond = Bond;
/**
 * A class for representing a bondArray.
 */
class BondArray extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "bondArray";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Bond>} bonds A Map of bonds with keys as ids.
     */
    constructor(attributes, bonds) {
        super(attributes, BondArray.tagName);
        bonds.forEach(bond => {
            this.nodes.set(this.nodes.size, bond);
        });
    }
}
exports.BondArray = BondArray;
/**
 * A class for representing a property scalar.
 */
class PropertyScalar extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "scalar";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, PropertyScalar.tagName, value);
    }
}
exports.PropertyScalar = PropertyScalar;
/**
 * A class for representing an property array.
 */
class PropertyArray extends xml_js_1.NumberArrayNode {
    /**
     * The tag name.
     */
    static tagName = "array";
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes, values, delimiter) {
        super(attributes, PropertyArray.tagName, values, delimiter);
    }
}
exports.PropertyArray = PropertyArray;
/**
 * A class for representing a property.
 */
class Property extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "property";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PropertyScalar | PropertyArray} property The property.
     */
    constructor(attributes, property) {
        super(attributes, Property.tagName);
        this.nodes.set(0, property);
    }
    /**
     * @returns The property.
     */
    getProperty() {
        return this.nodes.get(0);
    }
}
exports.Property = Property;
/**
 * A class for representing a propertyArray.
 */
class PropertyList extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "propertyList";
    /**
     * The properties.
     */
    properties;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Property>} properties A Map of properties with keys as dictRefs.
     */
    constructor(attributes, properties) {
        super(attributes, PropertyList.tagName);
        this.properties = properties;
        properties.forEach(property => {
            this.nodes.set(this.nodes.size, property);
        });
    }
}
exports.PropertyList = PropertyList;
/**
 * Represents the deltaEDown class.
 */
class DeltaEDown extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:deltaEDown";
    /**
     * @param attributes The attributes.
     * @param units The units.
     */
    constructor(attributes, value) {
        super(attributes, DeltaEDown.tagName, value);
    }
}
exports.DeltaEDown = DeltaEDown;
/**
 * A class for representing an energy transfer model.
 */
class EnergyTransferModel extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:energyTransferModel";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown[]} deltaEDowns The DeltaEDowns.
     */
    constructor(attributes, deltaEDowns) {
        super(attributes, EnergyTransferModel.tagName);
        deltaEDowns.forEach(deltaEDown => {
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
}
exports.EnergyTransferModel = EnergyTransferModel;
/**
 * A class for representing a method for calculating the density of states.
 */
class DOSCMethod extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:DOSCMethod";
    constructor(attributes) {
        super(attributes, DOSCMethod.tagName);
    }
}
exports.DOSCMethod = DOSCMethod;
/**
 * A class for representing a bondRef.
 */
class BondRef extends xml_js_1.StringNode {
    /**
     * The tag name.
     */
    static tagName = "me:bondRef";
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */
    constructor(attributes, bondRef) {
        super(attributes, BondRef.tagName, bondRef);
    }
}
exports.BondRef = BondRef;
/**
 * A class for representing a PotentialPoint.
 */
class PotentialPoint extends xml_js_1.TagWithAttributes {
    static tagName = "me:PotentialPoint";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, PotentialPoint.tagName);
    }
}
exports.PotentialPoint = PotentialPoint;
/**
 * A class for representing a HinderedRotorPotential.
 */
class HinderedRotorPotential extends xml_js_1.NodeWithNodes {
    static tagName = "me:HinderedRotorPotential";
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PotentialPoint[]} potentialPoints The PotentialPoints.
     */
    constructor(attributes, potentialPoints) {
        super(attributes, HinderedRotorPotential.tagName);
        potentialPoints.forEach(p => {
            this.nodes.set(this.nodes.size, p);
        });
    }
}
exports.HinderedRotorPotential = HinderedRotorPotential;
/**
 * A class for representing a Periodicity.
 */
class Periodicity extends xml_js_1.NumberNode {
    static tagName = "me:periodicity";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Periodicity.tagName, value);
    }
}
exports.Periodicity = Periodicity;
/**
 * A class for representing the extra DOSC method.
 */
class ExtraDOSCMethod extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:ExtraDOSCMethod";
    /**
     * @param attributes The attributes.
     * @param {BondRef | undefined} bondRef The bondRef.
     * @param {HinderedRotorPotential | undefined} hinderedRotorPotential The HinderedRotorPotential.
     * @param {Periodicity | undefined} periodicity The Periodicity.
     */
    constructor(attributes, bondRef, hinderedRotorPotential, periodicity) {
        super(attributes, ExtraDOSCMethod.tagName);
        if (bondRef) {
            this.nodes.set(this.nodes.size, bondRef);
        }
        if (hinderedRotorPotential) {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
        }
        if (periodicity) {
            this.nodes.set(this.nodes.size, periodicity);
        }
    }
}
exports.ExtraDOSCMethod = ExtraDOSCMethod;
/**
 * A class for representing a molecule.
 */
class Molecule extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "molecule";
    /**
     * The energy dictRef.
     */
    static energyDictRef = "me:ZPE";
    /**
     * The rotation constants dictRef.
     */
    static rotConstsDictRef = 'me:rotConsts';
    /**
     * The vibration frequencies dictRef.
     */
    static vibFreqsDictRef = 'me:vibFreqs';
    /**
     * The index.
     */
    index = new Map();
    // The molecule ID.
    id;
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
    constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod) {
        super(attributes, Molecule.tagName);
        let id = this.attributes.get("id");
        if (id == undefined) {
            throw new Error('id is undefined');
        }
        this.id = id;
        let i = 0;
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            if (atoms instanceof Atom) {
                this.index.set(Atom.tagName, i);
            }
            else {
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
    getID() {
        return this.attributes.get("id");
    }
    /**
     * Gets the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */
    getDescription() {
        return this.attributes.get("description");
    }
    /**
     * Gets the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */
    getActive() {
        let active = this.attributes.get("active");
        if (active != undefined) {
            return true;
        }
        return active;
    }
    /**
     * @returns The properties of the molecule.
     */
    getProperties() {
        let i = this.index.get(PropertyList.tagName);
        if (i == undefined) {
            i = this.index.get(Property.tagName);
            if (i == undefined) {
                return undefined;
            }
            else {
                return this.nodes.get(i);
            }
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Get a property scalar.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number | undefined} The scalar property.
     */
    getPropertyScalar(dictRef) {
        let properties = this.getProperties();
        if (properties == undefined) {
            return undefined;
        }
        else if (properties instanceof PropertyList) {
            let property = properties.properties.get(dictRef);
            if (property == undefined) {
                return undefined;
            }
            return property.getProperty().value;
        }
        else {
            let scalar = properties.getProperty();
            if (scalar == undefined) {
                return undefined;
            }
            return scalar.value;
        }
    }
    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set or defined.
     */
    getEnergy() {
        let energy = this.getPropertyScalar(Molecule.energyDictRef);
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
    setPropertyScalar(dictRef, value, units) {
        let properties = this.getProperties();
        if (properties == undefined) {
            this.nodes.set(this.nodes.size, this.createPropertyScalar(dictRef, value, units));
            this.index.set(Property.tagName, this.nodes.size);
        }
        else if (properties instanceof Property) {
            if (properties.getProperty().attributes.get(dictRef)) {
                properties.getProperty().value = value;
            }
            else {
                let plmap = new Map();
                plmap.set(dictRef, properties);
                plmap.set(dictRef, this.createPropertyScalar(dictRef, value, units));
                properties = new PropertyList(new Map(), plmap);
            }
        }
        else {
            let scalarProperty = properties.properties.get(dictRef);
            if (scalarProperty == undefined) {
                properties.properties.set(dictRef, this.createPropertyScalar(dictRef, value, units));
            }
            else {
                scalarProperty.getProperty().value = value;
            }
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     * @param value The value of the property.
     * @param units The units of the property.
     * @returns A scalar property.
     */
    createPropertyScalar(dictRef, value, units) {
        let propertyAttributes = new Map();
        propertyAttributes.set("dictRef", Molecule.energyDictRef);
        let scalarAttributes = new Map();
        if (units) {
            scalarAttributes.set("units", units);
        }
        return new Property(propertyAttributes, new PropertyScalar(scalarAttributes, value));
    }
    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */
    setEnergy(energy) {
        this.setPropertyScalar(Molecule.energyDictRef, energy);
    }
    /**
     * Get a property array.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number[] | undefined} The array property.
     */
    getPropertyArray(dictRef) {
        let properties = this.getProperties();
        if (properties == undefined) {
            return undefined;
        }
        else if (properties instanceof PropertyList) {
            let property = properties.properties.get(dictRef);
            if (property == undefined) {
                return undefined;
            }
            return property.getProperty().values;
        }
        else {
            if (properties.getProperty().tagName == dictRef) {
                let rotConsts = properties.getProperty();
                if (rotConsts == undefined) {
                    return undefined;
                }
                return rotConsts.values;
            }
            else {
                return undefined;
            }
        }
    }
    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */
    getRotConsts() {
        return this.getPropertyArray(Molecule.rotConstsDictRef);
    }
    /**
     * Get the vibration frequencies of the molecule.
     * @returns The vibration frequencies of the molecule.
     */
    getVibFreqs() {
        return this.getPropertyArray(Molecule.vibFreqsDictRef);
    }
}
exports.Molecule = Molecule;
/**
 * A class for representing a MoleculeRef.
 */
class MoleculeRef extends xml_js_1.NodeWithNodes {
    /**
     * A reference to the molecules.
     */
    molecules;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */
    constructor(attributes, tagName, molecule, molecules) {
        super(attributes, tagName);
        this.nodes.set(0, molecule);
        this.molecules = molecules;
    }
    /**
     * A convenience method to get the molecule abbreviation.
     * @returns The molecule abbreviation.
     */
    getMoleculeAbb() {
        return this.nodes.get(0);
    }
    /**
     * A convenience method to get the ref (the molecule ID) of the molecule.
     * @returns The ref of the molecule.
     */
    getRef() {
        let s = this.getMoleculeAbb().attributes.get("ref");
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
    getMolecule() {
        let ref = this.getRef();
        let molecule = this.molecules.get(ref);
        if (molecule == null) {
            throw new Error(`Molecule with ref ${ref} not found in molecules`);
        }
        return molecule;
    }
}
exports.MoleculeRef = MoleculeRef;
//# sourceMappingURL=molecule.js.map