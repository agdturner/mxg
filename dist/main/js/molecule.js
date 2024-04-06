"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Molecule = exports.ReservoirSize = exports.ExtraDOSCMethod = exports.Periodicity = exports.HinderedRotorPotential = exports.PotentialPoint = exports.BondRef = exports.DOSCMethod = exports.EnergyTransferModel = exports.DeltaEDownLinEne = exports.DeltaEDownTExponent = exports.DeltaEDown2 = exports.DeltaEDown = exports.PropertyList = exports.ImFreqs = exports.MW = exports.RotConsts = exports.VibFreqs = exports.FrequenciesScaleFactor = exports.ZPE = exports.Property = exports.PropertyMatrix = exports.PropertyArray = exports.PropertyScalar = exports.BondArray = exports.Bond = exports.AtomArray = exports.Atom = void 0;
const range_js_1 = require("./range.js");
const util_js_1 = require("./util.js");
const xml_js_1 = require("./xml.js");
/**
 * Atom data.
 * The examples can be used to compile this.
 * It is likely that only a small subset of atoms in the periodic table are of interest...
 */
/**
 * Molecule data.
 * The examples can be used to compile this.
 * It would be good to use, have, provide ways of sharing and to be able to specify/edit molecules...
 * This would include data about atoms, bonds, molecule properties and other things...
 */
/**
 * Atom instances must have an "elementType" attribute.
 * The attributes may include:
 * "id"
 * "x3", "y3", "z3" - coordinates used to depict a molecule containing the atom.
 * "spinMultiplicity" - the spin multiplicity of the atom.
 * In the XML, an "atom" node is typically a child of an "atomArray" parent node.
 * If there is only one atom, it may be a child of a "molecule" parent node.
 */
class Atom extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "atom";
    /**
     * The key for the id attribute.
     */
    static s_id = "id";
    /**
     * The key for the elementType attribute.
     */
    static s_elementType = "elementType";
    /**
     * The key for the x3 attribute.
     */
    static s_x3 = "x3";
    /**
     * The key for the y3 attribute.
     */
    static s_y3 = "y3";
    /**
     * The key for the z3 attribute.
     */
    static s_z3 = "z3";
    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     */
    constructor(attributes) {
        super(attributes, Atom.tagName);
        let elementType = attributes.get(Atom.s_elementType);
        if (elementType == undefined) {
            throw new Error(Atom.s_elementType + ' is undefined');
        }
    }
    /**
     * @returns True if the atom has coordinates.
     */
    hasCoordinates() {
        if (this.attributes.get(Atom.s_x3) != undefined &&
            this.attributes.get(Atom.s_y3) != undefined &&
            this.attributes.get(Atom.s_z3) != undefined) {
            return true;
        }
        return false;
    }
    /**
     * @returns The id.
     */
    getId() {
        return this.attributes.get(Atom.s_id);
    }
    /**
     * @param id The id.
     */
    setId(id) {
        this.attributes.set(Atom.s_id, id);
    }
    /**
     * @returns The element type.
     */
    getElementType() {
        return this.attributes.get(Atom.s_elementType);
    }
    /**
     * @param elementType The element type.
     */
    setElementType(elementType) {
        this.attributes.set(Atom.s_elementType, elementType);
    }
    /**
     * @returns The x3 attribute value as a number or undefined.
     */
    getX3() {
        let x3 = this.attributes.get(Atom.s_x3);
        if (x3 != undefined) {
            return parseFloat(x3);
        }
    }
    /**
     * @param x3 The x3 attribute value.
     */
    setX3(x3) {
        this.attributes.set(Atom.s_x3, x3.toString());
    }
    /**
     * Removes the x3 attribute.
     */
    removeX3() {
        this.attributes.delete(Atom.s_x3);
    }
    /**
     * @returns The y3 attribute value as a number or undefined.
     */
    getY3() {
        let y3 = this.attributes.get(Atom.s_y3);
        if (y3 != undefined) {
            return parseFloat(y3);
        }
    }
    /**
     * @param y3 The y3 attribute value.
     */
    setY3(y3) {
        this.attributes.set(Atom.s_y3, y3.toString());
    }
    /**
     * Removes the y3 attribute.
     */
    removeY3() {
        this.attributes.delete(Atom.s_y3);
    }
    /**
     * @returns The z3 attribute value as a number or undefined.
     */
    getZ3() {
        let z3 = this.attributes.get(Atom.s_z3);
        if (z3 != undefined) {
            return parseFloat(z3);
        }
    }
    /**
     * @param z3 The z3 attribute value.
     */
    setZ3(z3) {
        this.attributes.set("z3", z3.toString());
    }
    /**
     * Removes the x3 attribute.
     */
    removeZ3() {
        this.attributes.delete("z3");
    }
}
exports.Atom = Atom;
/**
 * A class for representing an atomArray.
 * There are no attributes.
 * In the XML, an "atomArray" node is a child of a "molecule" parent node and has "atom" node children.
 */
class AtomArray extends xml_js_1.NodeWithNodes {
    /**
    * The tag name.
    */
    static tagName = "atomArray";
    /**
     * The atoms stored in a lookup from id to atom.
     */
    atoms;
    /**
     * The index. The keys are the atom ids and the values are the index of the atom in the nodes.
     */
    index;
    /**
     * The reverse index. The keys are the index of the atom in the nodes and the values are the atom ids.
     */
    reverseIndex;
    /**
     * @param attributes The attributes.
     * @param atoms The atoms.
     */
    constructor(attributes, atoms) {
        super(attributes, AtomArray.tagName);
        this.index = new Map();
        this.reverseIndex = new Map();
        if (atoms == undefined) {
            this.atoms = new Map();
        }
        else {
            this.atoms = atoms;
            atoms.forEach((atom, id) => {
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, atom);
            });
        }
    }
    /**
     * @param id The id of the atom to get.
     * @returns The atom with the given id.
     */
    getAtom(id) {
        return this.atoms.get(id);
    }
    /**
     * @param atom The atom to add.
     * @returns The id of the atom.
     */
    addAtom(atom) {
        //console.log('Adding atom...');
        let id = atom.getId();
        if (id == undefined) {
            id = this.getNextAtomID();
            atom.setId(id);
        }
        else {
            if (this.atoms.has(id)) {
                let newID = this.getNextAtomID();
                console.warn('Atom with id ' + id + ' already exists, adding with id ' + newID);
                atom.setId(newID);
                id = newID;
            }
        }
        //console.log('Atom id: ' + id);
        this.index.set(id, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, id);
        this.nodes.set(this.nodes.size, atom);
        this.atoms.set(id, atom);
        /*
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.reverseIndex.keys() ' + Array.from(this.reverseIndex.keys()));
        console.log('this.reverseIndex.values() ' + Array.from(this.reverseIndex.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */
        return id;
    }
    /**
     * @returns The atomId.
     */
    getNextAtomID() {
        let i = 1;
        let id = "a" + i.toString();
        while (this.atoms.has(id)) {
            i++;
            id = "a" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */
    removeAtom(id) {
        let i = this.index.get(id);
        if (i == undefined) {
            throw new Error('Atom with id ' + id + ' does not exist!');
        }
        console.log('Removing atom with id ' + id);
        this.atoms.delete(id);
        //this.index.delete(id);
        //this.nodes.delete(i);
        this.deleteNodeAndReindex(i, id);
        /*
        console.log('i ' + i);
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */
    }
    /**
     * @param i The index of the atom to remove.
     * @param id The id of the atom to remove.
     */
    deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key) => {
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            }
            else {
                newNodes.set(value, this.nodes.get(value));
                newIndex.set(key, value);
                newReverseIndex.set(value, key);
            }
        });
        this.nodes = newNodes;
        this.index = newIndex;
        this.reverseIndex = newReverseIndex;
    }
}
exports.AtomArray = AtomArray;
/**
 * An atomic bond between two atoms in a molecule.
 * Instances must have the following attributes:
 * "atomRefs2" - a space separated list of two atom ids.
 * The attributes may include:
 * "id" - a unique identifier for the bond.
 * "order" - the order of the bond. Generally: order = (the number of bonding electrons) - ((the number of non-bonding electrons) / 2).
 * In the XML, a "bond" node is typically a child of a "bondArray" parent node.
 */
class Bond extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "bond";
    /**
     * The key for the atomRefs2 attribute.
     */
    static s_atomRefs2 = "atomRefs2";
    /**
     * The key for the id attribute.
     */
    static s_id = "id";
    /**
     * The key for the order attribute.
     */
    static s_order = "order";
    /**
     * The atomRefs2 stored for convenience, this is also stored as an attribute.
     */
    atomRefs2;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, Bond.tagName);
        let atomRefs2 = attributes.get(Bond.s_atomRefs2);
        if (atomRefs2 == undefined) {
            throw new Error(Bond.s_atomRefs2 + ' is undefined!');
        }
        this.atomRefs2 = atomRefs2;
    }
    /**
     * @param atomRefs2 The atomRefs2 to set.
     */
    setAtomRefs2(atomRefs2) {
        this.atomRefs2 = atomRefs2;
        this.attributes.set(Bond.s_atomRefs2, atomRefs2);
    }
    /**
     * @returns The id.
     */
    getId() {
        return this.attributes.get(Bond.s_id);
    }
    /**
     * @param id The id to set the attribute value referred to by "id".
     */
    setId(id) {
        this.attributes.set(Bond.s_id, id);
    }
    /**
     * @returns The attribute value referred to by "order" as a number or undefined.
     */
    getOrder() {
        let order = this.attributes.get(Bond.s_order);
        if (order != undefined) {
            return parseFloat(order);
        }
    }
    /**
     * @param order The order to set the attribute value referred to by "order".
     */
    setOrder(order) {
        this.attributes.set(Bond.s_order, order.toString());
    }
}
exports.Bond = Bond;
/**
 * There can be no attributes.
 * In the XML, a "bondArray" node is typically a child of a "molecule" parent node and has "bond" node children.
 */
class BondArray extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "bondArray";
    /**
     * The bonds stored in a lookup from id to bond.
     */
    bonds;
    /**
     * The index. The keys are the bond ids and the values are the index of the bond in the nodes.
     */
    index;
    /**
     * The reverse index. The keys are the index of the bond in the nodes and the values are the bond ids.
     */
    reverseIndex;
    /**
     * @param attributes The attributes.
     * @param bonds The bonds.
     */
    constructor(attributes, bonds) {
        super(attributes, BondArray.tagName);
        this.index = new Map();
        this.reverseIndex = new Map();
        if (bonds == undefined) {
            this.bonds = new Map();
        }
        else {
            this.bonds = bonds;
            bonds.forEach((bond, id) => {
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, bond);
            });
        }
    }
    /**
     * @returns The bond ids.
     */
    getBondIds() {
        return Array.from(this.bonds.keys());
    }
    /**
     * @param id The id of the bond to get.
     * @returns The bond with the given id.
     */
    getBond(id) {
        return this.bonds.get(id);
    }
    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     */
    addBond(bond) {
        //console.log('Add ' + bond.tagName + '...');
        let id = bond.getId();
        if (id == undefined) {
            id = this.getNextBondID();
            bond.setId(id);
        }
        else {
            if (this.bonds.has(id)) {
                let newID = this.getNextBondID();
                console.log('Bond with id ' + id + ' already exists, adding with id ' + newID);
                bond.setId(newID);
                id = newID;
            }
        }
        //console.log('Bond id: ' + id);
        this.index.set(id, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, id);
        this.nodes.set(this.nodes.size, bond);
        this.bonds.set(id, bond);
        /*
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.reverseIndex.keys() ' + Array.from(this.reverseIndex.keys()));
        console.log('this.reverseIndex.values() ' + Array.from(this.reverseIndex.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */
        return id;
    }
    /**
     * @returns The atomId.
     */
    getNextBondID() {
        let i = 1;
        let id = "b" + i.toString();
        while (this.bonds.has(id)) {
            i++;
            id = "b" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */
    removeBond(id) {
        let i = this.index.get(id);
        if (i == undefined) {
            throw new Error('Bond with id ' + id + ' does not exist!');
        }
        console.log('Removing bond with id ' + id);
        this.bonds.delete(id);
        //this.index.delete(id);
        //this.nodes.delete(i);
        this.deleteNodeAndReindex(i, id);
        /*
        console.log('i ' + i);
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */
    }
    /**
     * @param i The index of the bond to remove.
     * @param id The id of the bond to remove.
     */
    deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key) => {
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            }
            else {
                newNodes.set(value, this.nodes.get(value));
                newIndex.set(key, value);
                newReverseIndex.set(value, key);
            }
        });
        this.nodes = newNodes;
        this.index = newIndex;
        this.reverseIndex = newReverseIndex;
    }
}
exports.BondArray = BondArray;
/**
 * The attributes may contain "units".
 * In the XML, a "scalar" node is a child of a "property" node.
 */
class PropertyScalar extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "scalar";
    /**
     * The key for the units attribute.
     */
    static s_units = "units";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, PropertyScalar.tagName, value);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */
    updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyScalar.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    //console.log('Units are not the same, changing units...');
                    this.attributes.set(PropertyScalar.s_units, units);
                }
            }
        }
    }
}
exports.PropertyScalar = PropertyScalar;
/**
 * The attributes may contain "units".
 * In the XML, an "array" node is a child of a "property" node.
 */
class PropertyArray extends xml_js_1.NumberArrayNode {
    /**
     * The tag name.
     */
    static tagName = "array";
    /**
     * The key for the units attribute.
     */
    static s_units = "units";
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes, values, delimiter) {
        super(attributes, PropertyArray.tagName, values, delimiter);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */
    updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyArray.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set(PropertyArray.s_units, units);
                    console.log('Units changed from ' + existingUnits + ' to ' + units);
                }
            }
        }
    }
}
exports.PropertyArray = PropertyArray;
/**
 * The attributes may contain:
 * "rows"
 * "matrixType" with known values [quareSymmetricLT].
 * "units" with known values [Hartree/Bohr2].
 * In the XML, an "array" node is a child of a "property" node.
 */
class PropertyMatrix extends xml_js_1.NumberArrayNode {
    /**
     * The tag name.
     */
    static tagName = "matrix";
    /**
     * The key for the rows attribute.
     */
    static s_rows = "rows";
    /**
     * The key for the matrixType attribute.
     */
    static s_matrixType = "matrixType";
    /**
     * The key for the units attribute.
     */
    static s_units = "units";
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes, values, delimiter) {
        super(attributes, PropertyArray.tagName, values, delimiter);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */
    updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyArray.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set(PropertyArray.s_units, units);
                    console.log('Units changed from ' + existingUnits + ' to ' + units);
                }
            }
        }
    }
}
exports.PropertyMatrix = PropertyMatrix;
/**
 * The attributes must contain "dictRef" which is a dictionary reference for a type of property.
 * In the XML, a "property" node has a "propertyList" parent and either a "scalar" or "array" or another type of child not yet implemented (there could be a "matrix" type).
 */
class Property extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "property";
    /**
     * The key for the dictRef attribute.
     */
    static s_dictRef = "dictRef";
    /**
     * The dictRef.
     */
    dictRef;
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, Property.tagName);
        let dictRef = attributes.get(Property.s_dictRef);
        if (dictRef == undefined) {
            throw new Error(Property.s_dictRef + ' is undefined!');
        }
        this.dictRef = dictRef;
        if (property) {
            this.nodes.set(0, property);
        }
    }
    /**
     * @returns The property.
     */
    getProperty() {
        return this.nodes.get(0);
    }
    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property) {
        this.nodes.set(0, property);
    }
}
exports.Property = Property;
/**
 * The Zero Potential Energy.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */
class ZPE extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:ZPE";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
     */
    setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
exports.ZPE = ZPE;
/**
 * "me:frequenciesScaleFactor" property.
 */
class FrequenciesScaleFactor extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:frequenciesScaleFactor";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.FrequenciesScaleFactor = FrequenciesScaleFactor;
/**
 * The vibration frequencies.
 * The child "array" node should have a "units" attribute (known units=[cm-1]).
 */
class VibFreqs extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:vibFreqs";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.VibFreqs = VibFreqs;
/**
 * The rotation constants.
 * The child "array" node should have a "units" attribute with options ["cm-1", "GHz", "amuA^2"]
 */
class RotConsts extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:rotConsts";
    /**
     * The units.
     */
    static unitOptions = ["cm-1", "GHz", "amuA^2"];
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.RotConsts = RotConsts;
/**
 * The Molecular Weight.
 * The child "scalar" node should have a "units" attribute (known units=[amu]).
 */
class MW extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:MW";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.MW = MW;
/**
 * "me:imFreqs"
 */
class ImFreqs extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:imFreqs";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.ImFreqs = ImFreqs;
/**
 * In the XML, a "propertyList" node is a child node of a "molecule" node and has one or more "property" child node.
 * There can be no attributes.
 */
class PropertyList extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "propertyList";
    /**
     * The index.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param properties The properties (optional).
     */
    constructor(attributes, properties) {
        super(attributes, PropertyList.tagName);
        this.index = new Map();
        if (properties != undefined) {
            properties.forEach(property => {
                this.nodes.set(this.nodes.size, property);
                this.index.set(property.dictRef, this.nodes.size - 1);
            });
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */
    getProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) {
            return this.nodes.get(i);
        }
        else {
            throw new Error('Property ' + dictRef + ' does not exist');
        }
    }
    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property) {
        let i = this.index.get(property.dictRef);
        if (i == undefined) {
            //console.log('Property ' + property.dictRef + ' does not exist, adding...');
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        }
        else {
            console.log('Property ' + property.dictRef + ' already exists, updating...');
            this.nodes.set(i, property);
        }
    }
}
exports.PropertyList = PropertyList;
/**
 * In the XML, a "me:deltaEDown" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include:
 * "bathGas";
 * and other attributes of a RangeNode.
 */
class DeltaEDown extends range_js_1.RangeNode {
    /**
     * The tag name.
     */
    static tagName = "me:deltaEDown";
    /**
     * The key for the bathGas attribute.
     */
    static s_bathGas = "bathGas";
    /**
     * @param attributes The attributes.
     * @param units The units.
     */
    constructor(attributes, value) {
        super(attributes, DeltaEDown.tagName, value);
    }
    /**
     * @returns The bath gas of the DeltaEDown.
     */
    getBathGas() {
        return this.attributes.get(DeltaEDown.s_bathGas);
    }
    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */
    setBathGas(bathGas) {
        this.attributes.set(DeltaEDown.s_bathGas, bathGas);
    }
}
exports.DeltaEDown = DeltaEDown;
/**
 * In the XML, a "me:deltaEDown2" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include:
 * "bathGas";
 * and other attributes of a RangeNode.
 */
class DeltaEDown2 extends DeltaEDown {
    /**
     * The tag name.
     */
    static tagName = "me:deltaEDown2";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, value);
    }
}
exports.DeltaEDown2 = DeltaEDown2;
/**
 * In the XML, a "me:deltaEDownLinEne" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include:
 * "referenceTemperature";
 * and other attributes of a RangeNode.
 */
class DeltaEDownTExponent extends range_js_1.RangeNode {
    /**
     * The tag name.
     */
    static tagName = "me:deltaEDownTExponent";
    /**
     * The referenceTemperature attribute key.
     */
    static s_referenceTemperature = "referenceTemperature";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, DeltaEDownTExponent.tagName, value);
    }
    /**
     * @returns The referenceTemperature.
     */
    getReferenceTemperature() {
        return parseFloat((0, util_js_1.get)(this.attributes, DeltaEDownTExponent.s_referenceTemperature));
    }
    /**
     * @param referenceTemperature The referenceTemperature.
     */
    setReferenceTemperature(referenceTemperature) {
        this.attributes.set(DeltaEDownTExponent.s_referenceTemperature, referenceTemperature.toString());
    }
}
exports.DeltaEDownTExponent = DeltaEDownTExponent;
/**
 * In the XML, a "me:deltaEDownLinEne" node is a child node of a "me:energyTransferModel" node.
 */
class DeltaEDownLinEne extends range_js_1.RangeNode {
    /**
     * The tag name.
     */
    static tagName = "me:deltaEDownLinEne";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, DeltaEDownLinEne.tagName, value);
    }
}
exports.DeltaEDownLinEne = DeltaEDownLinEne;
/**
 * In the XML, a "me:energyTransferModel" node is a child node of a "molecule" node.
 * The attributes are expected to include:
 * "xsi:type" with expected values ["me:ExponentialDown", "me:BiExponentialDown"].
 * It may have:
 * One or multiple child nodes of the following types:
 * "me:deltaEDown"
 * "me:deltaEDown2" (for "me:BiExponentialDown")
 * "me:deltaEDownTExponent"
 * "me:deltaEDownLinEne"
 * "me:deltaEDownTActivation"
 * Examples:
 * <moleculeList>
 *   <molecule id="Isomer1">
 *     <me:energyTransferModel xsi:type="me:ExponentialDown">
 *       <me:deltaEDown units="cm-1" lower="100" upper="400" stepsize="10">174</me:deltaEDown>
 *     </me:energyTransferModel>
 *   </molecule>
 *   <molecule id="Isomer2">
 *     <me:energyTransferModel xsi:type="me:ExponentialDown">
 *       <me:deltaEDown units="cm-1" derivedFrom="Isomer1:deltaEDown">174</me:deltaEDown>
 *     </me:energyTransferModel>
 *   </molecule>
 * </moleculeList>
 * <me:energyTransferModel xsi:type="me:ExponentialDown">
 *   <me:deltaEDown units="cm-1" lower="140.0" upper="220." stepsize="10.0">210.0</me:deltaEDown>
 *   <me:deltaEDownTExponent lower="0.0" upper="1.0" stepsize="0.01">0.6</me:deltaEDownTExponent>
 *   <me:deltaEDownLinEne lower="1.e-06" upper="1.0" stepsize="1.e-06">0.0006</me:deltaEDownLinEne>
 * </me:energyTransferModel>
 * <me:energyTransferModel xsi:type="me:ExponentialDown">
 *   <me:deltaEDown bathGas="Ar" units="cm-1" lower="20" upper="400" stepsize="10.0">47.9654</me:deltaEDown>
 *   <me:deltaEDownTExponent bathGas="Ar" referenceTemperature="298" lower="0" upper="2" stepsize="0.02" >1.37982</me:deltaEDownTExponent>
 *   <me:deltaEDownTActivation bathGas="Ar" units="K-1" lower="-1.0" upper="1.0" stepsize="1e-5" >-7.95961e-05 </me:deltaEDownTActivation>
 * </me:energyTransferModel>
 * <me:energyTransferModel xsi:type="me:BiExponentialDown">
 *  <me:deltaEDown units="cm-1">210.0</me:deltaEDown>
 *  <me:deltaEDown2 units="cm-1">500.0</me:deltaEDown2>
 *  <me:ratio>0.5</me:ratio>
 * </me:energyTransferModel>
 */
class EnergyTransferModel extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:energyTransferModel";
    /**
     * @param attributes The attributes.
     * @param deltaEDowns The DeltaEDowns.
     */
    constructor(attributes, deltaEDowns) {
        super(attributes, EnergyTransferModel.tagName);
        if (deltaEDowns != undefined) {
            deltaEDowns.forEach(deltaEDown => {
                this.nodes.set(this.nodes.size, deltaEDown);
            });
        }
    }
    /**
     * @returns The DeltaEDowns.
     */
    getDeltaEDowns() {
        let deltaEDowns = [];
        this.nodes.forEach(node => {
            if (node instanceof DeltaEDown) {
                deltaEDowns.push(node);
            }
        });
        return deltaEDowns;
    }
    /**
     * @param deltaEDowns The DeltaEDowns.
     */
    setDeltaEDowns(deltaEDowns) {
        this.nodes.clear();
        deltaEDowns.forEach(deltaEDown => {
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @param index The index of the DeltaEDown to return.
     * @returns The DeltaEDown at the given index.
     */
    getDeltaEDown(index) {
        if (index < 0 || index >= this.nodes.size) {
            throw new Error('index out of range');
        }
        return this.nodes.get(index);
    }
    /**
     * Set the DeltaEDown at the given index.
     * @param index The index to set the DeltaEDown at.
     * @param deltaEDown The DeltaEDown to set at the index.
     */
    setDeltaEDown(index, deltaEDown) {
        this.nodes.set(index, deltaEDown);
    }
    /**
     * Add the DeltaEDowns.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */
    addDeltaEDown(deltaEDown) {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
}
exports.EnergyTransferModel = EnergyTransferModel;
/**
 * In the XML, a "me:DOSCMethod" node is a child node of a "molecule" node.
 * The attributes are expected to include either "xsi:type" or "name" - expected values include ["ClassicalRotors",
 * "QMRotors", "me:ClassicalRotors", "me:QMRotors"].
 */
class DOSCMethod extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:DOSCMethod";
    /**
     * The options for the "xsi:type" or "name" attribute value.
     */
    static xsi_typeOptions = ["ClassicalRotors", "QMRotors", "me:ClassicalRotors", "me:QMRotors"];
    /**
     * The key for the "xsi:type" attribute value.
     */
    static s_xsi_type = "xsi:type";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, DOSCMethod.tagName);
        if (attributes.get(DOSCMethod.s_xsi_type) == undefined) {
            let name = attributes.get("name");
            if (name == undefined) {
                throw new Error('Neither xsi:type or name are defined.');
            }
            else {
                attributes.set(DOSCMethod.s_xsi_type, name);
            }
        }
    }
    /**
     * @returns The xsi:type.
     */
    getXsiType() {
        return this.attributes.get(DOSCMethod.s_xsi_type);
    }
    /**
     * @param xsiType The xsi:type.
     */
    setXsiType(xsiType) {
        this.attributes.set(DOSCMethod.s_xsi_type, xsiType);
    }
}
exports.DOSCMethod = DOSCMethod;
/**
 * In the XML, a "me:bondRef" node is a child node of a "me:ExtraDOSCMethod" node.
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
 * In the XML, a "me:PotentialPoint" node is a child node of a "me:HinderedRotorPotential" node.
 * The attributes must include "angle" and "potential".
 */
class PotentialPoint extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:PotentialPoint";
    /**
     * The key angle attribute.
     */
    static s_angle = "angle";
    /**
     * The key potential attribute.
     */
    static s_potential = "potential";
    /**
     * The angle stored for convenience, this is also an attribute.
     */
    angle;
    /**
     * The potential stored for convenience, this is also an attribute.
     */
    potential;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, PotentialPoint.tagName);
        let angle = attributes.get(PotentialPoint.s_angle);
        if (angle == undefined) {
            throw new Error(PotentialPoint.s_potential + ' is undefined!');
        }
        this.angle = parseFloat(angle);
        let potential = attributes.get(PotentialPoint.s_potential);
        if (potential == undefined) {
            throw new Error(PotentialPoint.s_potential + ' is undefined!');
        }
        this.potential = parseFloat(potential);
    }
    /**
     * @returns The angle.
     */
    getAngle() {
        return this.angle;
    }
    /**
     * @param angle The angle of the PotentialPoint.
     */
    setAngle(angle) {
        this.angle = angle;
        this.attributes.set(PotentialPoint.s_angle, angle.toString());
    }
    /**
     * @returns The potential.
     */
    getPotential() {
        return this.potential;
    }
    /**
     * @param potential The potential of the PotentialPoint.
     */
    setPotential(potential) {
        this.potential = potential;
        this.attributes.set(PotentialPoint.s_potential, potential.toString());
    }
}
exports.PotentialPoint = PotentialPoint;
/**
 * In the XML, a "me:HinderedRotorPotential" node is a child node of a "me:ExtraDOSCMethod" node.
 * It may have one or more "me:PotentialPoint" child nodes.
 * The attributes must include "format" (with a value from ["numerical", "analytical"]) and "units" (Mesmer.energyUnits).
 */
class HinderedRotorPotential extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:HinderedRotorPotential";
    /**
     * The permitted formats.
     */
    static formats = new Set(["numerical", "analytical"]);
    /**
     * The key for the format attribute value.
     */
    static s_format = "format";
    /**
     * The key for the units attribute value.
     */
    static s_units = "units";
    /**
     * The key for the expansionSize attribute value.
     */
    static s_expansionSize = "expansionSize";
    /**
     * The key for the useSineTerms attribute value.
     */
    static s_useSineTerms = "useSineTerms";
    /**
     * The format stored for convenience, this is also an attribute.
     */
    format;
    /**
     * The units stored for convenience, this is also an attribute.
     */
    units;
    /**
     * The expansionSize stored for convenience, this is also an attribute.
     */
    expansionSize;
    /**
     * The useSineTerms stored for convenience, this is also an attribute.
     */
    useSineTerms;
    /**
     * @param attributes The attributes.
     * @param potentialPoints The PotentialPoints.
     */
    constructor(attributes, potentialPoints) {
        super(attributes, HinderedRotorPotential.tagName);
        let format = attributes.get(HinderedRotorPotential.s_format);
        if (format == undefined) {
            throw new Error(HinderedRotorPotential.s_format + ' is undefined!');
        }
        this.format = format;
        let units = attributes.get(HinderedRotorPotential.s_units);
        if (units == undefined) {
            throw new Error(HinderedRotorPotential.s_units + ' is undefined!');
        }
        this.units = units;
        if (potentialPoints != undefined) {
            potentialPoints.forEach(p => {
                this.nodes.set(this.nodes.size, p);
            });
        }
        let expansionSize = attributes.get(HinderedRotorPotential.s_expansionSize);
        if (expansionSize == undefined) {
            throw new Error(HinderedRotorPotential.s_expansionSize + ' is undefined!');
        }
        this.expansionSize = parseFloat(expansionSize);
        let useSineTerms = attributes.get(HinderedRotorPotential.s_useSineTerms);
        if (useSineTerms == undefined) {
            this.useSineTerms = false;
            //throw new Error(HinderedRotorPotential.s_useSineTerms + ' is undefined!');
        }
        else {
            this.useSineTerms = true;
        }
        //this.useSineTerms = (useSineTerms == "yes");
    }
    /**
     * @returns The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */
    getFormat() {
        return this.format;
    }
    /**
     * @param format The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */
    setFormat(format) {
        this.format = format;
        this.attributes.set(HinderedRotorPotential.s_format, format);
    }
    /**
     * @returns The units of the HinderedRotorPotential.
     * Should be one of Mesmer.energyUnits.
     */
    getUnits() {
        return this.units;
    }
    /**
     * @param units The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */
    setUnits(units) {
        this.units = units;
        this.attributes.set(HinderedRotorPotential.s_units, units);
    }
    /**
     * @returns The expansionSize of the HinderedRotorPotential.
     */
    getExpansionSize() {
        return this.expansionSize;
    }
    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */
    setExpansionSize(expansionSize) {
        this.expansionSize = expansionSize;
        this.attributes.set(HinderedRotorPotential.s_expansionSize, expansionSize.toString());
    }
    /**
     * @returns The useSineTerms of the HinderedRotorPotential.
     */
    getUseSineTerms() {
        return this.useSineTerms;
    }
    /**
     * @param useSineTerms The useSineTerms of the HinderedRotorPotential.
     */
    setUseSineTerms(useSineTerms) {
        this.useSineTerms = useSineTerms;
        this.attributes.set(HinderedRotorPotential.s_useSineTerms, useSineTerms ? "yes" : "no");
    }
    /**
     * @returns The potential point with the given index.
     */
    getPotentialPoint(i) {
        return this.nodes.get(i);
    }
    /**
     * Set the potential point at the given index.
     * @param i The index to set the potential point at.
     * @param p The potential point to set at the index.
     */
    setPotentialPoint(i, p) {
        this.nodes.set(i, p);
    }
    /**
     * Sets the potential points.
     * @param potentialPoints The potential points.
     */
    setPotentialPoints(potentialPoints) {
        this.nodes.clear();
        potentialPoints.forEach(p => {
            this.nodes.set(this.nodes.size, p);
        });
    }
    /**
     * Add the potential point.
     * @param p The potential point.
     * @returns The index of the potential point added.
     */
    addPotentialPoint(p) {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
    }
    /**
     * @param i The index of the potential point to remove.
     */
    removePotentialPoint(i) {
        this.nodes.delete(i);
    }
}
exports.HinderedRotorPotential = HinderedRotorPotential;
/**
 * In the XML, a "me:periodicity" node is a child node of a "me:ExtraDOSCMethod" node.
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
 * In the XML, a "me:ExtraDOSCMethod" node is a child node of a "molecule" node.
 */
class ExtraDOSCMethod extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:ExtraDOSCMethod";
    /**
     * The index.
     */
    index;
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     * @param hinderedRotorPotential The HinderedRotorPotential.
     * @param periodicity The Periodicity.
     */
    constructor(attributes, bondRef, hinderedRotorPotential, periodicity) {
        super(attributes, ExtraDOSCMethod.tagName);
        this.index = new Map();
        if (bondRef) {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set(BondRef.tagName, this.nodes.size - 1);
        }
        if (hinderedRotorPotential) {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set(HinderedRotorPotential.tagName, this.nodes.size - 1);
        }
        if (periodicity) {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set(Periodicity.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The bondRef.
     */
    getBondRef() {
        let i = this.index.get(BondRef.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the bondRef.
     * @param bondRef The bondRef.
     */
    setBondRef(bondRef) {
        let i = this.index.get(BondRef.tagName);
        if (i != undefined) {
            this.nodes.set(i, bondRef);
        }
        else {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set(BondRef.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The hindered rotor potential of the molecule.
     */
    getHinderedRotorPotential() {
        let i = this.index.get(HinderedRotorPotential.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the hindered rotor potential.
     * @param hinderedRotorPotential The hindered rotor potential.
     */
    setHinderedRotorPotential(hinderedRotorPotential) {
        let i = this.index.get(HinderedRotorPotential.tagName);
        if (i != undefined) {
            this.nodes.set(i, hinderedRotorPotential);
        }
        else {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set(HinderedRotorPotential.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The periodicity of the molecule.
     */
    getPeriodicity() {
        let i = this.index.get(Periodicity.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the periodicity.
     * @param periodicity The periodicity.
     */
    setPeriodicity(periodicity) {
        let i = this.index.get(Periodicity.tagName);
        if (i != undefined) {
            this.nodes.set(i, periodicity);
        }
        else {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set(Periodicity.tagName, this.nodes.size - 1);
        }
    }
}
exports.ExtraDOSCMethod = ExtraDOSCMethod;
/**
 * The attributes may include "units".
 * In the XML, a "me:reservoirSize" node is a child node of a "molecule" node.
 */
class ReservoirSize extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:reservoirSize";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, ReservoirSize.tagName, value);
    }
}
exports.ReservoirSize = ReservoirSize;
/**
 * The attributes may include "description" and "active" (and possibly others).
 * In the XML, a "molecule" node is a child node of a "moleculeList" node.
 */
class Molecule extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "molecule";
    /**
     * The key for the id attribute value.
     */
    static s_id = "id";
    /**
     * The key for the description attribute value.
     */
    static s_description = "description";
    /**
     * The key for the active attribute value.
     */
    static s_active = "active";
    /**
     * The index. The keys are the tag names and the values are the node indexes.
     */
    index;
    // The molecule ID.
    id;
    /**
     * Create a molecule.
     * @param attributes The attributes. This will also include an "id".
     * Additional attributes may include: "description" and "active" (and possibly others), but these do not exist for all molecules.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethod The extra method for calculating density of states.
     * @param reservoirSize The reservoir size.
     */
    constructor(attributes, id, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize) {
        super(attributes, Molecule.tagName);
        this.index = new Map();
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
        if (properties) {
            this.nodes.set(i, properties);
            this.index.set(PropertyList.tagName, i);
            i++;
        }
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
        // ExtraDOSCMethod
        if (extraDOSCMethod) {
            this.nodes.set(i, extraDOSCMethod);
            this.index.set(ExtraDOSCMethod.tagName, i);
        }
        // ReservoirSize
        if (reservoirSize) {
            this.nodes.set(i, reservoirSize);
            this.index.set(ReservoirSize.tagName, i);
        }
    }
    /**
     * Get the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */
    getDescription() {
        return this.attributes.get(Molecule.s_description);
    }
    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */
    setDescription(description) {
        this.attributes.set(Molecule.s_description, description);
    }
    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */
    getActive() {
        let active = this.attributes.get(Molecule.s_active);
        if (active != undefined) {
            if (active == "true") {
                return true;
            }
            else {
                return false;
            }
        }
    }
    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */
    setActive(active) {
        this.attributes.set(Molecule.s_active, active.toString());
    }
    /**
     * Get a label for the molecule which includes the is and any description and whether active.
     * @returns A label for the molecule detailing the attributes of the XML element (including id,
     * and possibly including description and whether active).
     */
    getLabel() {
        let label = this.id;
        let description = this.getDescription();
        if (description != undefined) {
            label += " (" + description + ")";
        }
        let active = this.getActive();
        if (active) {
            label += " (" + Molecule.s_active + ")";
        }
        return label;
    }
    /**
     * @returns A comma and space separated string of the attributes of the molecule.
     */
    getAttributesAsString() {
        return Array.from(this.attributes, ([key, value]) => `${key}=\"${value}\"`).join(', ');
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
     * @param properties The properties.
     */
    setProperties(properties) {
        let i = this.index.get(PropertyList.tagName);
        if (i == undefined) {
            this.index.set(PropertyList.tagName, this.nodes.size);
            this.addNode(properties);
        }
        else {
            this.nodes.set(i, properties);
        }
    }
    /**
     * Get a property.
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */
    getProperty(dictRef) {
        let properties = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof PropertyList) {
                //console.log('PropertyList');
                return properties.getProperty(dictRef);
            }
            else {
                //console.log('Property');
                return properties;
            }
        }
    }
    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property) {
        let properties = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof PropertyList) {
                properties.setProperty(property);
            }
            else {
                this.setProperties(properties);
            }
        }
        else {
            this.setProperties(property);
        }
    }
    /**
     * @param atomId The id of the atom.
     * @returns The atom for the given atomId.
     */
    getAtom(atomId) {
        return this.getAtoms().getAtom(atomId);
    }
    /**
     * @returns The atoms of the molecule.
     */
    getAtoms() {
        let i = this.index.get(AtomArray.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param atoms The atoms.
     */
    setAtoms(atoms) {
        this.index.set(AtomArray.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, atoms);
    }
    /**
     * @param bondId The id of the bond.
     * @returns The bond for the given bondId.
     */
    getBond(bondId) {
        return this.getBonds().getBond(bondId);
    }
    /**
     * @returns The bonds of the molecule.
     */
    getBonds() {
        let i = this.index.get(BondArray.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param bonds The bonds.
     */
    setBonds(bonds) {
        this.index.set(BondArray.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, bonds);
    }
    /**
     * @returns The energy transfer model of the molecule.
     */
    getEnergyTransferModel() {
        let i = this.index.get(EnergyTransferModel.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the energy transfer model.
     * @param energyTransferModel The energy transfer model.
     */
    setEnergyTransferModel(energyTransferModel) {
        let i = this.index.get(EnergyTransferModel.tagName);
        if (i == undefined) {
            this.index.set(EnergyTransferModel.tagName, this.nodes.size);
            this.addNode(energyTransferModel);
        }
        else {
            this.nodes.set(i, energyTransferModel);
        }
    }
    /**
     * @returns The DOSC method of the molecule.
     */
    getDOSCMethod() {
        let i = this.index.get(DOSCMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the DOSC method.
     * @param dOSCMethod The DOSC method.
     */
    setDOSCMethod(dOSCMethod) {
        let i = this.index.get(DOSCMethod.tagName);
        if (i == undefined) {
            this.index.set(DOSCMethod.tagName, this.nodes.size);
            this.addNode(dOSCMethod);
        }
        else {
            this.nodes.set(i, dOSCMethod);
        }
    }
    /**
     * @returns The extra DOSC method of the molecule.
     */
    getExtraDOSCMethod() {
        let i = this.index.get(ExtraDOSCMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */
    setExtraDOSCMethod(extraDOSCMethod) {
        let i = this.index.get(ExtraDOSCMethod.tagName);
        if (i == undefined) {
            this.index.set(ExtraDOSCMethod.tagName, this.nodes.size);
            this.addNode(extraDOSCMethod);
        }
        else {
            this.nodes.set(i, extraDOSCMethod);
        }
    }
    /**
     * @returns The reservoir size of the molecule.
     */
    getReservoirSize() {
        let i = this.index.get(ReservoirSize.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the reservoir size.
     * @param reservoirSize The reservoir size.
     */
    setReservoirSize(reservoirSize) {
        let i = this.index.get(ReservoirSize.tagName);
        if (i == undefined) {
            this.index.set(ReservoirSize.tagName, this.nodes.size);
            this.addNode(reservoirSize);
        }
        else {
            this.nodes.set(i, reservoirSize);
        }
    }
    /**
     * Get the ZPE value of the molecule.
     */
    getEnergy() {
        let p = this.getProperty(ZPE.dictRef);
        if (p == undefined) {
            console.log(this.toString());
            throw new Error(ZPE.dictRef + ' property not found!');
            //return 0;
        }
        return p.getProperty().value;
    }
}
exports.Molecule = Molecule;
//# sourceMappingURL=molecule.js.map