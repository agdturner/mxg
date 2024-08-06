"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.States = exports.DensityOfStatesList = exports.DensityOfStates = exports.Sumg = exports.Sumc = exports.Qtot = exports.ReservoirSize = exports.ExtraDOSCMethod = exports.Periodicity = exports.HinderedRotorPotential = exports.ThermoTable = exports.ThermoValue = exports.DistributionCalcMethod = exports.PotentialPoint = exports.BondRef = exports.DOSCMethod = exports.EnergyTransferModel = exports.DeltaEDownLinEne = exports.DeltaEDownTExponent = exports.DeltaEDown2 = exports.DeltaEDown = exports.PropertyList = exports.ImFreqs = exports.ElectronicExcitation = exports.EinsteinBij = exports.EinsteinAij = exports.Hessian = exports.Sigma = exports.Epsilon = exports.SpinMultiplicity = exports.MW = exports.VibFreqs = exports.FrequenciesScaleFactor = exports.TSOpticalSymmetryNumber = exports.SymmetryNumber = exports.RotConsts = exports.Hf298 = exports.HfAT0 = exports.Hf0 = exports.ZPE = exports.Property = exports.PropertyMatrix = exports.PropertyArray = exports.PropertyScalarNumber = exports.PropertyScalarString = exports.BondArray = exports.Bond = exports.AtomArray = exports.Atom = void 0;
exports.Molecule = void 0;
const big_js_1 = require("big.js");
const xml_range_js_1 = require("./xml_range.js");
const util_js_1 = require("./util.js");
const xml_js_1 = require("./xml.js");
const xml_mesmer_js_1 = require("./xml_mesmer.js");
const xml_metadata_js_1 = require("./xml_metadata.js");
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
 * Atom attributes may include:
 * "elementType" - the element type of the atom. This should be a known element types.
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
     * A reference to any molecule that the atom is a part of.
     */
    molecule;
    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     */
    constructor(attributes, molecule) {
        super(attributes, Atom.tagName);
        this.molecule = molecule;
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
    getID() {
        return this.attributes.get(Atom.s_id);
    }
    /**
     * @param id The id.
     */
    setID(id) {
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
     * @returns The x3 attribute value as a Big or undefined.
     */
    getX3() {
        let x3 = this.attributes.get(Atom.s_x3);
        if (x3 != undefined) {
            return new big_js_1.Big(x3);
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
     * @returns The y3 attribute value as a Big or undefined.
     */
    getY3() {
        let y3 = this.attributes.get(Atom.s_y3);
        if (y3 != undefined) {
            return new big_js_1.Big(y3);
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
     * @returns The z3 attribute value as a Big or undefined.
     */
    getZ3() {
        let z3 = this.attributes.get(Atom.s_z3);
        if (z3 != undefined) {
            return new big_js_1.Big(z3);
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
    addAtom(atom, aID) {
        //console.log('Adding atom...');
        if (aID == undefined) {
            let id = atom.getID();
            if (id == undefined) {
                id = this.getNextAtomID();
                atom.setID(id);
            }
            else {
                if (this.atoms.has(id)) {
                    let newID = this.getNextAtomID();
                    console.warn('Atom with id ' + id + ' already exists, adding with id ' + newID);
                    atom.setID(newID);
                    id = newID;
                }
            }
            aID = id;
        }
        else {
            if (this.atoms.has(aID)) {
                //let newID: string = this.getNextAtomID();
                console.warn('Atom with id ' + aID + ' will be replaced');
                let i = this.index.get(aID);
                this.nodes.set(i, atom);
                this.atoms.set(aID, atom);
                return aID;
            }
        }
        //console.log('Atom id: ' + id);
        this.index.set(aID, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, aID);
        this.nodes.set(this.nodes.size, atom);
        this.atoms.set(aID, atom);
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
        return aID;
    }
    /**
     * @returns The atomId.
     */
    getNextAtomID() {
        let i = 1;
        let id = "a" + i.toString();
        if (this.atoms.has(id)) {
            while (this.atoms.has(id)) {
                i++;
                id = "a" + i.toString();
            }
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
     * The order options.
     */
    static orderOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6"];
    /**
     * A reference to the molecule that the bond is a part of.
     */
    molecule;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, molecule) {
        super(attributes, Bond.tagName);
        this.molecule = molecule;
    }
    /**
     * @returns The atomRefs2.
     */
    getAtomRefs2() {
        let atomRefs2 = this.attributes.get(Bond.s_atomRefs2);
        let atomRefs = atomRefs2?.split(" ") || [];
        if (atomRefs2 == undefined) {
            return "a1 a1";
        }
        return atomRefs2;
    }
    /**
     * @param atomRefs2 The atomRefs2 to set.
     */
    setAtomRefs2(atomRefs2) {
        this.attributes.set(Bond.s_atomRefs2, atomRefs2);
    }
    /**
     * @returns The id.
     */
    getID() {
        return this.attributes.get(Bond.s_id);
    }
    /**
     * @param id The id to set the attribute value referred to by "id".
     */
    setID(id) {
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
     * @param bID The id of the bond to add if it already exists.
     * @returns The id of the bond.
     */
    addBond(bond, bID) {
        if (bID == undefined) {
            let id = bond.getID();
            if (id == undefined) {
                id = this.getNextBondID();
                bond.setID(id);
            }
            else {
                if (this.bonds.has(id)) {
                    let newID = this.getNextBondID();
                    console.log('Bond with id ' + id + ' already exists, adding with id ' + newID);
                    bond.setID(newID);
                    id = newID;
                }
            }
            bID = id;
        }
        else {
            if (this.bonds.has(bID)) {
                //let newID: string = this.getNextBondID();
                console.log('Bond with id ' + bID + ' will be replaced');
                let i = this.index.get(bID);
                this.nodes.set(i, bond);
                this.bonds.set(bID, bond);
                return bID;
            }
        }
        //console.log('Bond id: ' + id);
        this.index.set(bID, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, bID);
        this.nodes.set(this.nodes.size, bond);
        this.bonds.set(bID, bond);
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
        return bID;
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
 * This is for representing an unknown type of property that might be present in some loaded XML.
 */
class PropertyScalarString extends xml_js_1.StringNode {
    /**
     * The tag name.
     */
    static tagName = "scalar";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, PropertyScalarString.tagName, value);
    }
    /**
     * @returns The value.
     */
    getValue() {
        return this.value;
    }
    /**
     * Sets the value.
     * @param val The value.
     */
    setValue(val) {
        this.value = val;
    }
}
exports.PropertyScalarString = PropertyScalarString;
/**
 * In the XML, a "scalar" node has a "property" node parent.
 * The attributes may contain "units".
 */
class PropertyScalarNumber extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "scalar";
    /**
     * The key for the units attribute.
     */
    static s_units = "units";
    /**
     * The property dictionary references.
     */
    static propertyDictRefs = new Set(["me:ZPE", "me:Hf0", "me:HfAT0", "me:Hf298",
        "me:symmetryNumber", "me:TSOpticalSymmetryNumber", "me:frequenciesScaleFactor", "me:MW",
        "me:spinMultiplicity", "me:epsilon", "me:sigma"]);
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, PropertyScalarNumber.tagName, value);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */
    updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyScalarNumber.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    //console.log('Units are not the same, changing units...');
                    this.attributes.set(PropertyScalarNumber.s_units, units);
                }
            }
        }
    }
    /**
     * @returns The value.
     */
    getValue() {
        return this.value;
    }
    /**
     * Sets the value.
     * @param val The value.
     */
    setValue(val) {
        this.value = val;
    }
}
exports.PropertyScalarNumber = PropertyScalarNumber;
/**
 * In the XML, an "array" node has a "property" node parent.
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
     * The property dictionary references.
     */
    static propertyDictRefs = new Set(["me:rotConsts", "me:vibFreqs", "me:EinsteinAij", "me:EinsteinBij"]);
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
    /**
     * Sets the size of the array.
     * @param size The size of the array.
     */
    setSize(size) {
        let values = [];
        for (let i = 0; i < size; i++) {
            values.push(new big_js_1.Big(0));
        }
        this.setValues(values);
    }
}
exports.PropertyArray = PropertyArray;
/**
 * In the XML, a "matrix" node has a "property" node parent.
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
     * The property dictionary references.
     */
    static propertyDictRefs = new Set(["me:hessian"]);
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
    /**
     * Sets the size of the array.
     * @param rows The number of rows in the matrix.
     * @param columns The number of columns in the matrix.
     */
    setSize(rows, columns) {
        let values = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                values.push(new big_js_1.Big(0));
            }
        }
        this.setValues(values);
    }
}
exports.PropertyMatrix = PropertyMatrix;
/**
 * In the XML, a "property" node has a "propertyList" parent and has either a "scalar", "array", "matrix"
 * or other not yet implemented child node type).
 * So, the "property" nodes of a PropertyArray may be a "scalar", "array", or "matrix" type.
 * The attributes must contain "dictRef" which is a dictionary reference for a type of property.
 * The different kinds of "property" nodes are listed below from Table 1 of the Mesmer User Manual:
 * dictRef, value, units, Inserted from defaults.xml if absent
 * "me:ZPE", scalar, Mesmer.energyUnits, No
 * "me:Hf0", scalar, Mesmer.energyUnits, No
 * "me:HfAT0", scalar, Mesmer.energyUnits, No
 * "me:Hf298", scalar, Mesmer.energyUnits, No
 * "me:rotConsts", array, Mesmer.frequencyUnits, No
 * "me:symmetryNumber", scalar, No units, Yes (1)
 * "me:TSOpticalSymmetryNumber", scalar, No units, Yes (1)
 * "me:frequenciesScaleFactor", scalar, No units, Yes (1.0)
 * "me:vibFreqs", array, cm-1, No
 * "me:MW", scalar, amu, No
 * "me:spinMultiplicity", scalar, No units, Yes (1)
 * "me:epsilon", scalar, K (fixed), Yes (50)
 * "me:sigma", scalar, Å (fixed), Yes (5)
 * "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2, No
 * "me:EinsteinAij", array, s-1 (fixed), No
 * "me:EinsteinBij", array, m3/J/s2 (fixed), No
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
            // If there is no dictRef, then try setting this from the "title" attribute.
            let title = attributes.get("title");
            if (title == undefined) {
                throw new Error(Property.s_dictRef + ' and title are undefined!');
            }
            else {
                if (title == "MW") {
                    dictRef = "me:MW";
                }
                else if (title == "Hf298") {
                    dictRef = "me:Hf298";
                }
                else if (title == "Hf0") {
                    dictRef = "me:Hf0";
                }
                else if (title == "program") { // examples/AnalyticalRepresentation/Chebyshev.xml
                    dictRef = "program";
                }
                else if (title == "basis") { // examples/AnalyticalRepresentation/Chebyshev.xml
                    dictRef = "basis";
                }
                else if (title == "method") { // examples/AnalyticalRepresentation/Chebyshev.xml
                    dictRef = "method";
                }
                else if (title == "File Format") { // examples/AnalyticalRepresentation/Chebyshev.xml
                    dictRef = "File Format";
                }
                else {
                    throw new Error('Title ' + title + 'not recognised!');
                }
            }
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
 * The Heat of Formation at 0K.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */
class Hf0 extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:Hf0";
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
exports.Hf0 = Hf0;
/**
 * Is this different to Hf0?
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */
class HfAT0 extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:HfAT0";
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
exports.HfAT0 = HfAT0;
/**
 * The Heat of Formation at 298K.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */
class Hf298 extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:Hf298";
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
exports.Hf298 = Hf298;
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
 * Rotational symmetry number.
 */
class SymmetryNumber extends Property {
    /**
    * The dictionary reference.
    */
    static dictRef = "me:symmetryNumber";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.SymmetryNumber = SymmetryNumber;
/**
 * Transition state optical symmetry number.
 */
class TSOpticalSymmetryNumber extends Property {
    /**
    * The dictionary reference.
    */
    static dictRef = "me:TSOpticalSymmetryNumber";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.TSOpticalSymmetryNumber = TSOpticalSymmetryNumber;
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
 * The Spin Multiplicity.
 */
class SpinMultiplicity extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:spinMultiplicity";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.SpinMultiplicity = SpinMultiplicity;
/**
 * The Epsilon.
 * The child "scalar" node should have a "units" attribute K (fixed).
 */
class Epsilon extends Property {
    /**
    * The dictionary reference.
    */
    static dictRef = "me:epsilon";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.Epsilon = Epsilon;
/**
 * The Sigma.
 * The child "scalar" node should have a "units" attribute Å (fixed).
 */
class Sigma extends Property {
    /**
    * The dictionary reference.
    */
    static dictRef = "me:sigma";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.Sigma = Sigma;
/**
 * The Hessian.
 * The child "matrix" node should have a "units" attribute with options [kJ/mol/Å2, kcal/mol/Å2, Hartree/Å2]
 */
class Hessian extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:hessian";
    /**
     * The units.
     */
    static unitOptions = ["kJ/mol/Å2", "kcal/mol/Å2", "Hartree/Å2"];
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.Hessian = Hessian;
/**
 * The Einstein Aij.
 * The child "array" node should have a "units" attribute s-1 (fixed).
 */
class EinsteinAij extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:EinsteinAij";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.EinsteinAij = EinsteinAij;
/**
 * The Einstein Bij.
 * The child "array" node should have a "units" attribute m3/J/s2 (fixed).
 */
class EinsteinBij extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:EinsteinBij";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.EinsteinBij = EinsteinBij;
/**
 * The electronic excitation.
 * The child "scalar" node should have a "units" attribute (Mesmer.frequencyUnits?).
 */
class ElectronicExcitation extends Property {
    /**
     * The dictionary reference.
     */
    static dictRef = "me:electronicExcitation";
    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes, property) {
        super(attributes, property);
    }
}
exports.ElectronicExcitation = ElectronicExcitation;
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
     * @returns The properties as a Map<string, Property> where each key is the dictRef of the Property value.
     */
    getProperties() {
        let properties = new Map();
        this.nodes.forEach(node => {
            let p = node;
            properties.set(p.dictRef, p);
        });
        return properties;
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
            //throw new Error('Property ' + dictRef + ' does not exist');
            return undefined;
        }
    }
    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property) {
        let i = this.index.get(property.dictRef);
        if (i == undefined) {
            console.log('Property ' + property.dictRef + ' does not exist, adding...');
            //console.log('property.toString() ' + property.toString());
            //console.log('property.getProperty().toString() ' + property.getProperty().toString());
            //console.log('mapToString(property.attributes) ' + mapToString(property.attributes));
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        }
        else {
            console.log('Property ' + property.dictRef + ' already exists, updating...');
            this.nodes.set(i, property);
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     */
    removeProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(dictRef);
            let newIndex = new Map();
            this.index.forEach((value, key) => {
                if (value > i) {
                    newIndex.set(key, value - 1);
                }
                else {
                    newIndex.set(key, value);
                }
            });
            this.index = newIndex;
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
class DeltaEDown extends xml_range_js_1.RangeNode {
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
class DeltaEDownTExponent extends xml_range_js_1.RangeNode {
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
class DeltaEDownLinEne extends xml_range_js_1.RangeNode {
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
     * Add a DeltaEDown.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */
    addDeltaEDown(deltaEDown) {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
    /**
     * Remove a DeltaEDown.
     * @param index The index of the DeltaEDown to remove.
     */
    removeDeltaEDown(index) {
        this.nodes.delete(index);
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
    static xsi_typeOptions = ["ClassicalRotors", "QMRotors", "DefinedStatesRotors",
        "me:ClassicalRotors", "me:QMRotors", "me:DefinedStatesRotors"];
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
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, PotentialPoint.tagName);
    }
    /**
     * @returns The angle.
     */
    getAngle() {
        return this.attributes.get(PotentialPoint.s_angle);
    }
    /**
     * @param angle The angle of the PotentialPoint.
     */
    setAngle(angle) {
        this.attributes.set(PotentialPoint.s_angle, angle.toString());
    }
    /**
     * @returns The potential.
     */
    getPotential() {
        return this.attributes.get(PotentialPoint.s_potential);
    }
    /**
     * @param potential The potential of the PotentialPoint.
     */
    setPotential(potential) {
        this.attributes.set(PotentialPoint.s_potential, potential.toString());
    }
}
exports.PotentialPoint = PotentialPoint;
/**
 * In the XML, a "me:DistributionCalcMethod" node is a child node of a "molecule" node.
 * Attributes may include:
 * default (string)
 * name (string)
 */
class DistributionCalcMethod extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:DistributionCalcMethod";
    /**
     * The key for the default attribute.
     */
    static s_default = "default";
    /**
     * The key for the name attribute.
     */
    static s_name = "name";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, DistributionCalcMethod.tagName);
    }
    /**
     * @returns The default.
     */
    getDefault() {
        return this.attributes.get(DistributionCalcMethod.s_default);
    }
    /**
     * @param default The default.
     *
    setDefault(defaultValue: string): void {
        this.attributes.set(DistributionCalcMethod.s_default, defaultValue);
    }
    */
    /**
     * @returns The name.
     */
    getName() {
        return this.attributes.get(DistributionCalcMethod.s_name);
    }
}
exports.DistributionCalcMethod = DistributionCalcMethod;
/**
 * For representing a "me:thermoValue"
 * T, H, S, G, Cp
 */
class ThermoValue extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:thermoValue";
    /**
     * The key for the T attribute.
     */
    static s_T = "T";
    /**
     * The key for the H attribute.
     */
    static s_H = "H";
    /**
     * The key for the S attribute.
     */
    static s_S = "S";
    /**
     * The key for the G attribute.
     */
    static s_G = "G";
    /**
     * The key for the Cp attribute.
     */
    static s_Cp = "Cp";
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, Atom.tagName);
    }
    /**
     * @returns The temperature.
     */
    getT() {
        return new big_js_1.Big(this.attributes.get(ThermoValue.s_T));
    }
    /**
     * @param T The temperature.
     *
    setT(T: Big): void {
        this.attributes.set(ThermoValue.s_T, T.toString());
    }

    /**
     * @returns The enthalpy.
     */
    getH() {
        return new big_js_1.Big(this.attributes.get(ThermoValue.s_H));
    }
    /**
     * @param H The enthalpy.
     *
    setH(H: Big): void {
        this.attributes.set(ThermoValue.s_H, H.toString());
    }

    /**
     * @returns The entropy.
     */
    getS() {
        return new big_js_1.Big(this.attributes.get(ThermoValue.s_S));
    }
    /**
     * @param S The entropy.
     *
    setS(S: Big): void {
        this.attributes.set(ThermoValue.s_S, S.toString());
    }

    /**
     * @returns The Gibbs free energy.
     */
    getG() {
        return new big_js_1.Big(this.attributes.get(ThermoValue.s_G));
    }
    /**
     * @param G The Gibbs free energy.
     *
    setG(G: Big): void {
        this.attributes.set(ThermoValue.s_G, G.toString());
    }

    /**
     * @returns The heat capacity.
     */
    getCp() {
        return new big_js_1.Big(this.attributes.get(ThermoValue.s_Cp));
    }
    /**
     * @param Cp The heat capacity.
     *
    setCp(Cp: Big): void {
        this.attributes.set(ThermoValue.s_Cp, Cp.toString());
    }

    /**
     * @returns The ThermoValue as a string array.
     */
    toStringArray() {
        return [this.getT().toString(), this.getH().toString(), this.getS().toString(), this.getG().toString(),
            this.getCp().toString()];
    }
    /**
     * @returns The ThermoValue as a CSV string.
     */
    toCSV() {
        //console.log(this.toStringArray());
        //console.log(this.toStringArray().join(","));
        return this.toStringArray().join(",");
    }
}
exports.ThermoValue = ThermoValue;
/**
 * For representing a "me:thermoTable"
 * attributes:
 * unitsT="K" unitsH="kJ/mol" unitsS="J/mol/K" unitsG="kJ/mol" unitsCp="J/mol/K"
 */
class ThermoTable extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:thermoTable";
    /**
     * The key for the unitsT attribute.
     */
    static s_unitsT = "unitsT";
    /**
     * The key for the unitsH attribute.
     */
    static s_unitsH = "unitsH";
    /**
     * The key for the unitsS attribute.
     */
    static s_unitsS = "unitsS";
    /**
     * The key for the unitsG attribute.
     */
    static s_unitsG = "unitsG";
    /**
     * The key for the unitsCp attribute.
     */
    static s_unitsCp = "unitsCp";
    /**
     * The ThermoValues
     */
    tvs;
    /**
     * @param attributes The attributes.
     * @param tvs The ThermoValue array.
     */
    constructor(attributes, tvs) {
        super(attributes, ThermoTable.tagName);
        if (tvs != undefined) {
            tvs.forEach((tv) => {
                this.addNode(tv);
            });
            this.tvs = tvs;
        }
        else {
            this.tvs = [];
        }
    }
    /**
     * Retrieves a ThermoValue from the tvs array at a specific index.
     *
     * @param i The index of the ThermoValue to return.
     * @returns The ThermoValue at the given index.
     * @throws IndexError if i is out of the bounds of the tvs array.
     * @throws TypeError if tvs is null or undefined.
     */
    get(i) {
        return this.tvs[i];
    }
    /**
     * Set the ThermoValue in t.
     *
     * @param i The index of the ThermoValue to set.
     * @returns The PT pairs.
     */
    set(i, tv) {
        this.nodes.set(i, tv);
        this.tvs[i] = tv;
    }
    /**
     * Add a ThermoValue.
     *
     * @param tv The ThermoValue to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */
    add(tv) {
        this.addNode(tv);
        this.tvs.push(tv);
        return this.nodes.size - 1;
    }
    /**
     * Remove the ThermoValue at the given index.
     *
     * @param i The index.
     */
    remove(i) {
        this.nodes.delete(i);
        this.tvs.splice(i, 1);
    }
    /**
     * Initialise tvs.
     *
     * @param tvs The tvs to be set.
     */
    init(tvs) {
        this.clear();
        tvs.forEach((tv) => {
            this.addNode(tv);
            this.tvs.push(tv);
        });
    }
    /**
     * Clear.
     */
    clear() {
        this.nodes.clear();
        this.tvs = [];
    }
    /**
     * @returns The ThermoTable header as a string array.
     */
    getHeader() {
        return ["T (" + (this.attributes.get(ThermoTable.s_unitsT)) + ")",
            "H(T)-H(0) (" + (this.attributes.get(ThermoTable.s_unitsH)) + ")",
            "S(T) (" + (this.attributes.get(ThermoTable.s_unitsS)) + ")",
            "G(T) (" + (this.attributes.get(ThermoTable.s_unitsG)) + ")",
            "Cp(T) (" + (this.attributes.get(ThermoTable.s_unitsCp)) + ")"];
    }
    /**
     * @returns The ThermoTable as a CSV string.
     */
    toCSV() {
        let csv = this.getHeader().join(",") + "\n";
        this.tvs.forEach((tv) => {
            csv += tv.toCSV() + "\n";
        });
        return csv;
    }
}
exports.ThermoTable = ThermoTable;
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
        return this.attributes.get(HinderedRotorPotential.s_expansionSize);
    }
    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */
    setExpansionSize(expansionSize) {
        console.log(expansionSize.toString());
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
 * In the XML, a "me:qtot" node is a child node of a "me:densityOfStates" node.
 */
class Qtot extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:qtot";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Qtot.tagName, value);
    }
}
exports.Qtot = Qtot;
/**
 * In the XML, a "me:sumc" node is a child node of a "me:densityOfStates" node.
 */
class Sumc extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:sumc";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Sumc.tagName, value);
    }
}
exports.Sumc = Sumc;
/**
 * In the XML, a "me:sumg" node is a child node of a "me:densityOfStates" node.
 */
class Sumg extends xml_js_1.NumberNode {
    /**
     * The tag name.
     */
    static tagName = "me:sumg";
    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes, value) {
        super(attributes, Sumg.tagName, value);
    }
}
exports.Sumg = Sumg;
/**
 * In the XML, a "me:densityOfStates" node is a child node of a "me:densityOfStatesList" node.
 * It is expected to contain the following child nodes:
 * me:t
 * me:qtot
 * me:sumc
 * me:sumg
 */
class DensityOfStates extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:densityOfStates";
    /**
     * The header.
     */
    static header = [xml_mesmer_js_1.T.tagName, Qtot.tagName, Sumc.tagName, Sumg.tagName];
    /**
     * The index.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes) {
        super(attributes, DensityOfStates.tagName);
        this.index = new Map();
    }
    /**
     * @returns The T.
     */
    getT() {
        let i = this.index.get(xml_mesmer_js_1.T.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the T.
     * @param T The T.
     */
    setT(T) {
        let i = this.index.get(T.tagName);
        if (i != undefined) {
            this.nodes.set(i, T);
        }
        else {
            this.nodes.set(this.nodes.size, T);
            this.index.set(T.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Qtot.
     */
    getQtot() {
        let i = this.index.get(Qtot.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the Qtot.
     * @param Qtot The Qtot.
     */
    setQtot(Qtot) {
        let i = this.index.get(Qtot.tagName);
        if (i != undefined) {
            this.nodes.set(i, Qtot);
        }
        else {
            this.nodes.set(this.nodes.size, Qtot);
            this.index.set(Qtot.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Sumc.
     */
    getSumc() {
        let i = this.index.get(Sumc.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the Sumc.
     * @param Sumc The Sumc.
     */
    setSumc(Sumc) {
        let i = this.index.get(Sumc.tagName);
        if (i != undefined) {
            this.nodes.set(i, Sumc);
        }
        else {
            this.nodes.set(this.nodes.size, Sumc);
            this.index.set(Sumc.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Sumg.
     */
    getSumg() {
        let i = this.index.get(Sumg.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the Sumg.
     * @param Sumg The Sumg.
     */
    setSumg(Sumg) {
        let i = this.index.get(Sumg.tagName);
        if (i != undefined) {
            this.nodes.set(i, Sumg);
        }
        else {
            this.nodes.set(this.nodes.size, Sumg);
            this.index.set(Sumg.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The density of states as a string array.
     */
    toStringArray() {
        return [this.getT().value.toString(), this.getQtot().value.toString(),
            this.getSumc().value.toString(), this.getSumg().value.toString()];
    }
}
exports.DensityOfStates = DensityOfStates;
/**
 * In the XML, a "me:densityOfStatesList" node is a child node of a "molecule" node.
 * It is expected to contain the following child nodes:
 * me:description
 * one or more "me:densityOfStates".
 * The attributes may include:
 * "calculated" which appears to be a date and time of calculation e.g. 20240311_090547.
 */
class DensityOfStatesList extends xml_js_1.NodeWithNodes {
    /**
    * The tag name.
    */
    static tagName = "me:densityOfStatesList";
    /**
     * The index.
     * The keys are the tag names and the values are the node indexes.
     */
    index;
    /**
     * The dosIndex.
     * The keys are the densityOfStates indexes and the values are the node indexes.
     */
    dosIndex;
    /**
     * @param attributes The attributes.
     * @param description The description.
     * @param densityOfStates The densityOfStates.
     */
    constructor(attributes, description, densityOfStates) {
        super(attributes, DensityOfStatesList.tagName);
        this.index = new Map();
        this.dosIndex = new Map();
        if (description) {
            this.nodes.set(this.nodes.size, description);
            this.index.set(xml_mesmer_js_1.Description.tagName, this.nodes.size - 1);
        }
        if (densityOfStates) {
            let i = 0;
            densityOfStates.forEach(dos => {
                this.dosIndex.set(i, this.nodes.size);
                this.nodes.set(this.nodes.size, dos);
                i++;
            });
        }
    }
    /**
     * @returns The description.
     */
    getDescription() {
        let i = this.index.get(xml_mesmer_js_1.Description.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the description.
     * @param description The description.
     */
    setDescription(description) {
        let i = this.index.get(xml_mesmer_js_1.Description.tagName);
        if (i != undefined) {
            this.nodes.set(i, description);
        }
        else {
            this.nodes.set(this.nodes.size, description);
            this.index.set(xml_mesmer_js_1.Description.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The density of states at the given index.
     */
    getDensityOfStates(i) {
        let j = this.dosIndex.get(i);
        if (j != undefined) {
            return this.nodes.get(j);
        }
    }
    /**
     * Set the density of states at the given index.
     * @param i The index.
     * @param dos The density of states.
     */
    setDensityOfStates(i, dos) {
        let j = this.dosIndex.get(i);
        if (j != undefined) {
            this.nodes.set(j, dos);
        }
        else {
            this.nodes.set(this.nodes.size, dos);
            this.dosIndex.set(i, this.nodes.size - 1);
        }
    }
    /**
     * Add the density of states.
     * @param dos The density of states.
     * @returns The index of the density of states added.
     */
    addDensityOfStates(dos) {
        this.nodes.set(this.nodes.size, dos);
        let i = this.nodes.size - 1;
        this.dosIndex.set(i, this.nodes.size - 1);
        return i;
    }
    /**
     * Remove the density of states at the given index.
     * @param i The index.
     */
    removeDensityOfStates(i) {
        let j = this.dosIndex.get(i);
        if (j != undefined) {
            this.nodes.delete(j);
        }
    }
    /**
     * @returns The density of states list as a CSV string.
     */
    toCSV() {
        let csv = "";
        let header = DensityOfStates.header;
        csv += header.join(",") + "\n";
        this.nodes.forEach((dos) => {
            csv += dos.toStringArray().join(",") + "\n";
        });
        return csv;
    }
}
exports.DensityOfStatesList = DensityOfStatesList;
/**
 * The attributes may include "units".
 * In the XML, a "me:States" node is a child node of a "molecule" node
 */
class States extends xml_js_1.NodeWithNodes {
    /**
     * The tag name.
     */
    static tagName = "me:States";
    /**
     * The index.
     * The keys are the id of the states and the values are the node indexes.
     */
    index;
    /**
     * @param attributes The attributes.
     */
    constructor(attributes, states) {
        super(attributes, States.tagName);
        this.index = new Map();
        if (states) {
            let i = 0;
            states.forEach((state) => {
                this.nodes.set(this.nodes.size, state); // Add the state to the nodes.
                this.index.set(state.id, i); // Add the index of the state to the index.
                i++;
            });
        }
    }
    /**
     * @returns The next id.
     */
    getNextId() {
        let i = 0;
        while (this.index.has(i)) {
            i++;
        }
        return i;
    }
    /**
     * @returns The states.
     */
    getStates() {
        let states = [];
        this.nodes.forEach((node) => {
            states.push(node);
        });
        return states;
    }
    /**
     * @param id The id of the state.
     * @returns The state at the given index.
     */
    getState(id) {
        return this.nodes.get(this.index.get(id));
    }
    /**
     * Set the state at the given index.
     * @param i The index.
     * @param state The state.
     */
    setState(i, state) {
        this.nodes.set(this.index.get(state.id), state);
    }
    /**
     * Add the state.
     * @param state The state.
     * @returns The index of the state added.
     */
    addState(state) {
        let i;
        if (this.index.has(state.id)) {
            // A state with this id already exists, replace it.
            i = this.index.get(state.id);
            this.nodes.set(i, state);
        }
        else {
            // Add the state to the nodes.
            i = this.nodes.size;
            this.index.set(state.id, i);
            this.nodes.set(i, state);
        }
        return this.nodes.size - 1;
    }
    /**
     * Remove the state at the given index.
     * @param id The id of the state to remove.
     */
    removeState(id) {
        console.log("Removing state with id " + id);
        let i = this.index.get(id);
        console.log("Removing state at index " + i);
        this.nodes.delete(i);
    }
}
exports.States = States;
/**
 * <me:State energy="0.0" degeneracy="4"/>
 * In the XML, a "me:State" node is a child node of a "me:States" node.
 */
class State extends xml_js_1.TagWithAttributes {
    /**
     * The tag name.
     */
    static tagName = "me:State";
    /**
     * The key for the energy attribute value.
     */
    static s_energy = "energy";
    /**
     * The key for the degeneracy attribute value.
     */
    static s_degeneracy = "degeneracy";
    /**
     * The id of the state.
     */
    id;
    /**
     * @param attributes The attributes.
     * @param id The index.
     */
    constructor(attributes, id) {
        super(attributes, State.tagName);
        this.id = id;
    }
    /**
     * @returns The energy of the state.
     */
    getEnergy() {
        return new big_js_1.Big(this.attributes.get(State.s_energy));
    }
    /**
     * @param energy The energy of the state.
     */
    setEnergy(energy) {
        this.attributes.set(State.s_energy, energy.toString());
    }
    /**
     * Remove the energy attribute.
     */
    removeEnergy() {
        this.attributes.delete(State.s_energy);
    }
    /**
     * @returns The degeneracy of the state.
     */
    getDegeneracy() {
        return new big_js_1.Big(this.attributes.get(State.s_degeneracy));
    }
    /**
     * @param degeneracy The degeneracy of the state.
     */
    setDegeneracy(degeneracy) {
        this.attributes.set(State.s_degeneracy, degeneracy.toString());
    }
    /**
     * Remove the degeneracy attribute.
     */
    removeDegeneracy() {
        this.attributes.delete(State.s_degeneracy);
    }
}
exports.State = State;
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
    /**
     * An index for Extra DOSCMethods. Key are index of the extraDOSCMethod in the array. The value is the index of the node.
     */
    edmindex;
    /**
     * This is the molecule ID which is to be unique. It may have the same value as the attribute id.
     */
    id;
    /**
     * This is either just the attribute id, or a composite of the attribute id and the molecule id.
     */
    //label: string;
    /**
     * Create a molecule.
     * @param attributes The attributes. This will also include an "id".
     * Additional attributes may include: "description" and "active" (and possibly others), but these do not exist for all molecules.
     * @param id The molecule ID which is to be unique.
     * @param metadataList The metadata list.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethods The extra DOSC methods for calculating density of states.
     * @param reservoirSize The reservoir size.
     * @param tt The thermo table.
     */
    constructor(attributes, id, metadataList, atoms, bonds, properties, energyTransferModel, dOSCMethod, distributionCalcMethod, extraDOSCMethods, reservoirSize, tt, states) {
        super(attributes, Molecule.tagName);
        //this.label = this.getID();
        this.index = new Map();
        this.edmindex = new Map();
        this.id = id;
        let i = 0;
        // MetadataList
        if (metadataList) {
            this.nodes.set(i, metadataList);
            this.index.set(xml_metadata_js_1.MetadataList.tagName, i);
            i++;
        }
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            this.index.set(AtomArray.tagName, i);
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
            i++;
        }
        // DistributionCalcMethod
        if (distributionCalcMethod) {
            this.nodes.set(i, distributionCalcMethod);
            this.index.set(DistributionCalcMethod.tagName, i);
            i++;
        }
        // ExtraDOSCMethod
        if (extraDOSCMethods) {
            extraDOSCMethods.forEach((edm) => {
                this.nodes.set(i, edm);
                this.edmindex.set(i, i);
                i++;
            });
        }
        // ReservoirSize
        if (reservoirSize) {
            this.nodes.set(i, reservoirSize);
            this.index.set(ReservoirSize.tagName, i);
            i++;
        }
        // ThermoTable
        if (tt) {
            this.nodes.set(i, tt);
            this.index.set(ThermoTable.tagName, i);
        }
        // States
        if (states) {
            this.nodes.set(i, states);
            this.index.set(States.tagName, i);
        }
    }
    /**
     * @returns The id of the molecule.
     */
    getLabel() {
        //return this.getID() + " " + this.id.toString();
        return this.getID();
    }
    /**
     * @returns The id of the molecule.
     */
    getID() {
        return this.attributes.get(Molecule.s_id);
    }
    /**
     * @param id The id of the molecule.
     */
    setID(id) {
        this.attributes.set(Molecule.s_id, id);
    }
    /**
     * Get the description or the id of the molecule.
     * @returns The description of the molecule, or the id if it is not set.
     */
    getDescription() {
        let description = this.attributes.get(Molecule.s_description);
        if (description != undefined) {
            return description;
        }
        return this.getID();
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
     * @returns The metadata list of the molecule.
     */
    getMetadataList() {
        let i = this.index.get(xml_metadata_js_1.MetadataList.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the metadata list.
     * @param metadataList The metadata list.
     */
    setMetadataList(metadataList) {
        let i = this.index.get(xml_metadata_js_1.MetadataList.tagName);
        if (i == undefined) {
            this.index.set(xml_metadata_js_1.MetadataList.tagName, this.nodes.size);
            this.addNode(metadataList);
        }
        else {
            this.nodes.set(i, metadataList);
        }
    }
    /**
     * @returns The properties of the molecule.
     */
    getPropertyList() {
        let i = this.index.get(PropertyList.tagName);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * @param properties The properties.
     */
    setPropertyList(properties) {
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
        let pl = this.getPropertyList();
        if (pl != undefined) {
            return pl.getProperty(dictRef);
        }
    }
    /**
     * Set the property.
     * @param p The property.
     *
    setProperty(p: Property): void {
        console.log("setProperty " + p.toString() + " in Molecule.");
        this.getPropertyList()!.setProperty(p);
    }*/
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
     * @returns The distribution calculation method of the molecule.
     */
    getDistributionCalcMethod() {
        let i = this.index.get(DistributionCalcMethod.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the distribution calculation method.
     * @param distributionCalcMethod The distribution calculation method.
     */
    setDistributionCalcMethod(distributionCalcMethod) {
        let i = this.index.get(DistributionCalcMethod.tagName);
        if (i == undefined) {
            this.index.set(DistributionCalcMethod.tagName, this.nodes.size);
            this.addNode(distributionCalcMethod);
        }
        else {
            this.nodes.set(i, distributionCalcMethod);
        }
    }
    /**
     * @returns The extra DOSC method of the molecule.
     */
    getExtraDOSCMethod(index) {
        let i = this.edmindex.get(index);
        if (i != undefined) {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */
    setExtraDOSCMethod(index, extraDOSCMethod) {
        let i = this.edmindex.get(index);
        if (i == undefined) {
            this.edmindex.set(index, this.nodes.size);
            this.nodes.set(this.nodes.size, extraDOSCMethod);
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
     * @returns The density of states list of the molecule.
     */
    getDensityOfStatesList() {
        let i = this.index.get(DensityOfStatesList.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the density of states list.
     * @param densityOfStatesList The density of states list.
     */
    setDensityOfStatesList(densityOfStatesList) {
        let i = this.index.get(DensityOfStatesList.tagName);
        if (i == undefined) {
            this.index.set(DensityOfStatesList.tagName, this.nodes.size);
            this.addNode(densityOfStatesList);
        }
        else {
            this.nodes.set(i, densityOfStatesList);
        }
    }
    /**
     * @returns The thermo table of the molecule.
     */
    getThermoTable() {
        let i = this.index.get(ThermoTable.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the thermo table.
     * @param tt The thermo table.
     */
    setThermoTable(tt) {
        let i = this.index.get(ThermoTable.tagName);
        if (i == undefined) {
            this.index.set(ThermoTable.tagName, this.nodes.size);
            this.addNode(tt);
        }
        else {
            this.nodes.set(i, tt);
        }
    }
    /**
     * @returns The states of the molecule.
     */
    getStates() {
        let i = this.index.get(States.tagName);
        if (i == undefined) {
            return undefined;
        }
        else {
            return this.nodes.get(i);
        }
    }
    /**
     * Set the states.
     * @param states The states.
     */
    setStates(states) {
        let i = this.index.get(States.tagName);
        if (i == undefined) {
            this.index.set(States.tagName, this.nodes.size);
            this.addNode(states);
        }
        else {
            this.nodes.set(i, states);
        }
    }
    /**
     * Get the ZPE value of the molecule.
     */
    getEnergy() {
        let p;
        p = this.getProperty(ZPE.dictRef);
        if (p == undefined) {
            p = this.getProperty(Hf0.dictRef);
            if (p == undefined) {
                p = this.getProperty(HfAT0.dictRef);
                if (p == undefined) {
                    p = this.getProperty(Hf298.dictRef);
                    if (p == undefined) {
                        return (0, big_js_1.Big)(0);
                    }
                }
            }
        }
        return p.getProperty().value;
    }
}
exports.Molecule = Molecule;
//# sourceMappingURL=xml_molecule.js.map