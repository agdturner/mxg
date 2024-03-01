"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoleculeRef = exports.Molecule = exports.ExtraDOSCMethod = exports.HinderedRotorPotential = exports.PotentialPoint = exports.BondRef = exports.DOSCMethod = exports.EnergyTransferModel = exports.DeltaEDown = exports.Property = exports.Bond = exports.Atom = void 0;
const xml_js_1 = require("./xml.js");
const util_js_1 = require("./util.js");
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
            throw new Error('id is undefined');
        }
        let elementType = attributes.get("elementType");
        if (elementType == undefined) {
            throw new Error('elementType is undefined');
        }
    }
    /**
     * @returns A string representation.
     */
    toString() {
        let s = super.toString();
        return s + `)`;
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
    /**
     * @returns A string representation.
     */
    toString() {
        let s = super.toString();
        return s + `)`;
    }
}
exports.Bond = Bond;
/**
 * A class for representing a property.
 */
class Property extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "property";
    /**
     * The property value.
     */
    property;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {NumberNode | NumberArrayWithAttributes} property The property.
     */
    constructor(attributes, property) {
        super(attributes, Property.tagName);
        this.property = property;
    }
    /**
     * @returns A string representation.
     */
    toString() {
        return super.toString() + ` (${this.property.toString()}))`;
    }
    /**
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad, padding) {
        let padding1 = undefined;
        if (pad != undefined) {
            if (padding != undefined) {
                padding1 = padding + pad;
            }
        }
        return (0, xml_js_1.getTag)(this.property.toXML(padding1), Property.tagName, this.attributes, padding, true);
    }
}
exports.Property = Property;
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
class EnergyTransferModel extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:energyTransferModel";
    /**
     * The DeltaEDown.
     */
    deltaEDowns;
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown[]} deltaEDowns The DeltaEDowns.
     */
    constructor(attributes, deltaEDowns) {
        super(attributes, EnergyTransferModel.tagName);
        this.deltaEDowns = deltaEDowns;
    }
    /**
     * @param padding - Optional padding string for formatting the XML output.
     * @returns An XML representation.
     */
    toXML(pad, padding) {
        let padding1 = "";
        if (padding != undefined) {
            if (pad != undefined) {
                padding1 = padding + pad;
            }
        }
        // deltaEDowns
        let deltaEDowns_xml = "";
        this.deltaEDowns.forEach(d => {
            deltaEDowns_xml += d.toXML(padding1);
        });
        if (pad == undefined) {
            return (0, xml_js_1.getTag)(deltaEDowns_xml, EnergyTransferModel.tagName, this.attributes, padding, false);
        }
        else {
            return (0, xml_js_1.getTag)(deltaEDowns_xml, EnergyTransferModel.tagName, this.attributes, padding, true);
        }
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
class BondRef extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static xmlTagName = "me:bondRef";
    /**
     * For storing the bondRef.
     */
    bondRef;
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */
    constructor(attributes, bondRef) {
        super(attributes, BondRef.xmlTagName);
        this.bondRef = bondRef;
    }
    /**
     * @returns A string representation.
     */
    toString() {
        return super.toString + ` (${this.bondRef}))`;
    }
    /**
     * @param padding The padding (Optional).
     * @returns A tag representation.
     */
    toXML(padding) {
        let s = (0, xml_js_1.getStartTag)(BondRef.xmlTagName);
        if (padding) {
            return "\n" + padding + s;
        }
        s += this.bondRef;
        return s + (0, xml_js_1.getEndTag)(BondRef.xmlTagName);
    }
}
exports.BondRef = BondRef;
/**
 * A class for representing a PotentialPoint.
 */
class PotentialPoint extends xml_js_1.TagWithAttributes {
    static xmlTagName = "me:PotentialPoint";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, PotentialPoint.xmlTagName);
    }
}
exports.PotentialPoint = PotentialPoint;
/**
 * A class for representing a HinderedRotorPotential.
 */
class HinderedRotorPotential extends xml_js_1.TagWithAttributes {
    static xmlTagName = "me:HinderedRotorPotential";
    PotentialPoint;
    /**
     * @param attributes The attributes.
     * @param PotentialPoint The PotentialPoint.
     */
    constructor(attributes, PotentialPoint) {
        super(attributes, HinderedRotorPotential.xmlTagName);
        this.PotentialPoint = PotentialPoint;
    }
}
exports.HinderedRotorPotential = HinderedRotorPotential;
/**
 * A class for representing the extra DOSC method.
 */
class ExtraDOSCMethod extends xml_js_1.TagWithAttributes {
    static xmlTagName = "me:ExtraDOSCMethod";
    /**
     * The bondRef.
     */
    bondRef;
    /**
     * The HinderedRotorPotential.
     */
    hinderedRotorPotential;
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     * @param HinderedRotorPotential The HinderedRotorPotential.
     */
    constructor(attributes, bondRef, HinderedRotorPotential) {
        super(attributes, ExtraDOSCMethod.xmlTagName);
        this.bondRef = bondRef;
        this.hinderedRotorPotential = HinderedRotorPotential;
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
    // The molecule ID.
    id;
    // Atoms
    atoms;
    // Bonds
    bonds;
    // Properties
    properties;
    // EnergyTransferModel
    energyTransferModel;
    // DOSCMethod
    dOSCMethod;
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
    constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod) {
        super(attributes, Molecule.tagName);
        let id = this.attributes.get("id");
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
    toString() {
        let r = `Molecule(id(${this.getID()}), `;
        let description = this.getDescription();
        if (description != undefined) {
            r += `description(${description}), `;
        }
        let active = this.getActive();
        if (active != undefined) {
            r += `active(${active}), `;
        }
        if (this.atoms.size > 0) {
            r += `atoms(${(0, util_js_1.mapToString)(this.atoms)}), `;
        }
        if (this.bonds.size > 0) {
            r += `bonds(${(0, util_js_1.mapToString)(this.bonds)}), `;
        }
        if (this.properties.size > 0) {
            r += `properties(${(0, util_js_1.mapToString)(this.properties)}), `;
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
     * @returns {number} The energy of the molecule or zero if the energy is not set.
     * @throws An error if "me.ZPE" is a property, but is not mapped to a PropertyScalar.
     */
    getEnergy() {
        let zpe = this.properties.get('me:ZPE');
        if (zpe == undefined) {
            return 0;
        }
        if (zpe.property instanceof xml_js_1.NumberNode) {
            return zpe.property.value;
        }
        else {
            throw new Error("Expected a PropertyScalar but got a PropertyArray and not sure how to handle that.");
        }
    }
    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */
    setEnergy(energy) {
        let property = this.properties.get('me:ZPE');
        if (property == undefined) {
            throw new Error("No me.ZPE property found");
        }
        if (property.property instanceof xml_js_1.NumberArrayNode) {
            throw new Error("Unexpected NumberArrayNode.");
        }
        else {
            property.property.value = energy;
        }
    }
    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */
    getRotationConstants() {
        let property = this.properties.get('me:rotConsts');
        if (property != undefined) {
            if (property.property != null) {
                if (property.property instanceof xml_js_1.NumberNode) {
                    return [property.property.value];
                }
                else {
                    return property.property.values;
                }
            }
            else {
                return undefined;
            }
        }
        return property;
    }
    /**
     * Get the VibrationFrequencies of the molecule.
     * @returns The VibrationFrequencies of the molecule.
     */
    getVibrationFrequencies() {
        let property = this.properties.get('me:vibFreqs');
        if (property != undefined) {
            if (property.property instanceof xml_js_1.NumberNode) {
                return [property.property.value];
            }
            else if (property.property instanceof xml_js_1.NumberArrayNode) {
                return property.property.values;
            }
            else {
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
    toXML(tagName, pad, level) {
        // Padding
        let padding0 = "";
        let padding1 = "";
        let padding2 = "";
        let padding3 = "";
        if (pad != undefined && level != undefined) {
            padding0 = pad.repeat(level);
            padding1 = padding0 + pad;
            padding2 = padding1 + pad;
            padding3 = padding2 + pad;
        }
        // Atoms
        let atoms_xml = "";
        for (let atom of this.atoms.values()) {
            atoms_xml += atom.toXML(padding2);
        }
        if (this.atoms.size > 1) {
            if (atoms_xml != "") {
                atoms_xml = (0, xml_js_1.getTag)(atoms_xml, "atomArray", undefined, padding1, true);
            }
        }
        // Bonds
        let bonds_xml = "";
        for (let bond of this.bonds.values()) {
            bonds_xml += bond.toXML(padding2);
        }
        if (bonds_xml != "") {
            bonds_xml = (0, xml_js_1.getTag)(bonds_xml, "bondArray", undefined, padding1, true);
        }
        // Properties
        let properties_xml = "";
        this.properties.forEach(property => {
            let property_xml = property.property.toXML(padding3);
            properties_xml += (0, xml_js_1.getTag)(property_xml, Property.tagName, property.attributes, padding2, true);
        });
        if (this.properties.size > 1) {
            if (properties_xml != "") {
                properties_xml = (0, xml_js_1.getTag)(properties_xml, "propertyList", undefined, padding1, true);
            }
        }
        // EnergyTransferModel
        let energyTransferModel_xml = "";
        if (this.energyTransferModel) {
            energyTransferModel_xml = this.energyTransferModel.toXML(pad, padding1);
        }
        // DOSCMethod
        let dOSCMethod_xml = "";
        if (this.dOSCMethod) {
            dOSCMethod_xml = this.dOSCMethod.toXML(padding1);
        }
        return (0, xml_js_1.getTag)(atoms_xml + bonds_xml + properties_xml + energyTransferModel_xml + dOSCMethod_xml, tagName, this.attributes, padding0, true);
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
    getMoleculeAbb() {
        return this.nodes.get(0);
    }
    /**
     * A convenience method to get the ref (the molecule ID) of the transition state.
     * @returns The ref of the transition state.
     */
    getRef() {
        let s = this.getMoleculeAbb().attributes.get("ref");
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