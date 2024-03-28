import { get } from './util.js';
import {
    TagWithAttributes, NodeWithNodes, NumberArrayNode, NumberNode, StringNode
} from './xml.js';


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
export class Atom extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "atom";

    /**
     * The id if specified, or the elementType.
     */
    id: string;

    /**
     * The element type.
     */
    elementType: string;

    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     * If there is no "id" then "this.id" is set to the "elementType".
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Atom.tagName);
        let elementType: string | undefined = attributes.get("elementType");
        if (elementType == undefined) {
            throw new Error('elementType is undefined');
        }
        this.elementType = elementType;
        let id: string | undefined = attributes.get("id");
        if (id == undefined) {
            id = this.elementType;
        }
        this.id = id;
    }
}

/**
 * A class for representing an atomArray.
 * There can be no attributes.
 * In the XML, a "atomArray" node is typically a child of a "molecule" parent node and has "atom" node children.
 */
export class AtomArray extends NodeWithNodes {

    /**
    * The tag name.
    */
    static readonly tagName: string = "atomArray";

    /**
     * @param attributes The attributes.
     * @param atoms The atoms.
     */
    constructor(attributes: Map<string, string>, atoms: Atom[]) {
        super(attributes, AtomArray.tagName);
        atoms.forEach(atom => {
            this.nodes.set(this.nodes.size, atom);
        });
    }
}

/**
 * An atomic bond between two atoms in a molecule.
 * Instances must have a "atomRefs2" attribute - a space separated list of two atom ids.
 * The attributes may include "order" - presumed to be the order of the bond. Generally:
 *  order = (the number of bonding electrons) - ((the number of non-bonding electrons) / 2).
 * In the XML, a "bond" node is typically a child of a "bondArray" parent node.
 */
export class Bond extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "bond";

    /**
     * The key for the atomRefs2 attribute.
     */
    static readonly s_atomRefs2: string = "atomRefs2";

    /**
     * The key for the id attribute.
     */
    static readonly s_id: string = "id";

    /**
     * The key for the order attribute.
     */
    static readonly s_order: string = "order";

    /**
     * The atomRefs2 stored for convenience, this is also stored as an attribute.
     */
    atomRefs2: string;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, Bond.tagName);
        let atomRefs2: string | undefined = attributes.get(Bond.s_atomRefs2);
        if (atomRefs2 == undefined) {
            throw new Error(Bond.s_atomRefs2 + ' is undefined!');
        }
        this.atomRefs2 = atomRefs2;
    }

    /**
     * @param atomRefs2 The atomRefs2 to set.
     */
    setAtomRefs2(atomRefs2: string): void {
        this.atomRefs2 = atomRefs2;
        this.attributes.set(Bond.s_atomRefs2, atomRefs2);
    }

    /**
     * @returns The attribute value referred to by "id" or undefined.
     */
    getId(): string | undefined {
        return this.attributes.get(Bond.s_id);
    }

    /**
     * @param id The id to set the attribute value referred to by "id".
     */
    setId(id: string): void {
        this.attributes.set(Bond.s_id, id);
    }

    /**
     * @returns The attribute value referred to by "order" as a number or undefined.
     */
    getOrder(): number | undefined {
        let order: string | undefined = this.attributes.get(Bond.s_order);
        if (order != undefined) {
            return parseFloat(order);
        }
    }

    /**
     * @param order The order to set the attribute value referred to by "order".
     */
    setOrder(order: number): void {
        this.attributes.set(Bond.s_order, order.toString());
    }

}

/**
 * There can be no attributes.
 * In the XML, a "bondArray" node is typically a child of a "molecule" parent node and has "bond" node children.
 */
export class BondArray extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "bondArray";


    /**
     * The bonds stored for convenience.
     */
    bonds: Bond[];

    /**
     * @param attributes The attributes.
     * @param bonds A Map of bonds with keys as ids.
     */
    constructor(attributes: Map<string, string>, bonds: Bond[]) {
        super(attributes, BondArray.tagName);
        this.bonds = bonds;
        bonds.forEach(bond => {
            this.nodes.set(this.nodes.size, bond);
        });
    }

    /**
     * @param i The index of the bond.
     * @returns The bond at the given index.
     * @throws Error if this.bonds has no such index.
     */
    getBond(i: number): Bond | undefined {
        return this.bonds[i];
    }

    /**
     * @returns The bonds.
     */
    getBonds(): Bond[] {
        return this.bonds;
    }

    /**
     * Set the bond at the given index.
     * @param i The index.
     * @param bond The bond.
     * @throws Error if this.bonds has no such index.
     */
    setBond(i: number, bond: Bond): void {
        this.bonds[i] = bond;
        this.nodes.set(i, bond);
    }

    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     */
    addBond(bond: Bond): void {
        this.bonds.push(bond);
        this.nodes.set(this.nodes.size, bond);
    }

    /**
     * @param i The index of the bond to remove.
     */
    removeBond(i: number): void {
        this.bonds.splice(i, 1);
        this.nodes.delete(i);
    }

    /**
     * Get a set of all the bond ids.
     */
    getBondIds(): Set<string> {
        let bondIds: Set<string> = new Set();
        this.bonds.forEach((bond) => {
            bondIds.add(bond.getId() as string);
        });
        return bondIds;
    }
}

/**
 * The attributes may contain "units".
 * In the XML, a "scalar" node is a child of a "property" node.
 */
export class PropertyScalar extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "scalar";

    /**
     * The key for the units attribute.
     */
    static readonly s_units: string = "units";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, PropertyScalar.tagName, value);
    }

    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */
    updateUnits(units: string | undefined): void {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits: string | undefined = this.attributes.get(PropertyScalar.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    //console.log('Units are not the same, changing units...');
                    this.attributes.set(PropertyScalar.s_units, units);
                }
            }
        }
    }
}

/**
 * The attributes may contain "units".
 * In the XML, an "array" node is a child of a "property" node.
 */
export class PropertyArray extends NumberArrayNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "array";

    /**
     * The key for the units attribute.
     */
    static readonly s_units: string = "units";

    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */
    constructor(attributes: Map<string, string>, values: number[], delimiter?: string) {
        super(attributes, PropertyArray.tagName, values, delimiter);
    }

    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */
    updateUnits(units: string | undefined): void {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits: string | undefined = this.attributes.get(PropertyArray.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set(PropertyArray.s_units, units);
                    console.log('Units changed from ' + existingUnits + ' to ' + units);
                }
            }
        }
    }
}

/**
 * The attributes must contain "dictRef" which is a dictionary reference for a type of property.
 * In the XML, a "property" node has a "propertyList" parent and either a "scalar" or "array" or another type of child not yet implemented (there could be a "matrix" type).
 */
export class Property extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "property";

    /**
     * The key for the dictRef attribute.
     */
    static readonly s_dictRef: string = "dictRef";

    /**
     * The dictRef.
     */
    dictRef: string;

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property?: PropertyScalar | PropertyArray) {
        super(attributes, Property.tagName);
        let dictRef: string | undefined = attributes.get(Property.s_dictRef);
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
    getProperty(): PropertyScalar | PropertyArray {
        return this.nodes.get(0) as PropertyScalar | PropertyArray;
    }

    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property: PropertyScalar | PropertyArray): void {
        this.nodes.set(0, property);
    }

}

/**
 * The Zero Potential Energy.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */
export class ZPE extends Property {

    /**
     * The dictionary reference.
     */
    static readonly dictRef: string = "me:ZPE";

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyScalar) {
        super(attributes, property);
    }

    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
     */
    setUnits(units: string): void {
        this.getProperty().updateUnits(units);
    }
}

/**
 * "me:frequenciesScaleFactor" property.
 */
export class FrequenciesScaleFactor extends Property {

    /**
     * The dictionary reference.
     */
    static readonly dictRef: string = "me:frequenciesScaleFactor";

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyScalar) {
        super(attributes, property);
    }
}

/**
 * The vibration frequencies.
 * The child "array" node should have a "units" attribute (known units=[cm-1]).
 */
export class VibFreqs extends Property {

    /**
     * The dictionary reference.
     */
    static readonly dictRef: string = "me:vibFreqs";

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyArray) {
        super(attributes, property);
    }
}

/**
 * The rotation constants.
 * The child "array" node should have a "units" attribute (known units=[cm-1]).
 */
export class RotConsts extends Property {

    /**
     * The dictionary reference.
     */
    static readonly dictRef: string = "me:rotConsts";

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyArray) {
        super(attributes, property);
    }
}

/**
 * The Molecular Weight.
 * The child "scalar" node should have a "units" attribute (known units=[amu]).
 */
export class MW extends Property {

    /**
     * The dictionary reference.
     */
    static readonly dictRef: string = "me:MW";

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyScalar) {
        super(attributes, property);
    }
}

/**
 * "me:imFreqs"
 */
export class ImFreqs extends Property {

    /**
     * The dictionary reference.
     */
    static readonly dictRef: string = "me:imFreqs";

    /**
     * @param attributes The attributes.
     * @param property The property.
     */
    constructor(attributes: Map<string, string>, property: PropertyArray) {
        super(attributes, property);
    }
}

/**
 * In the XML, a "propertyList" node is a child node of a "molecule" node and has one or more "property" child node.
 * There can be no attributes.
 */
export class PropertyList extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "propertyList";

    /**
     * The index.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param properties The properties (optional).
     */
    constructor(attributes: Map<string, string>, properties?: Property[]) {
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
    getProperty(dictRef: string): Property | undefined {
        let i: number | undefined = this.index.get(dictRef);
        if (i != undefined) {
            return this.nodes.get(i) as Property;
        } else {
            throw new Error('Property ' + dictRef + ' does not exist');
        }
    }

    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property: Property): void {
        let i: number | undefined = this.index.get(property.dictRef);
        if (i == undefined) {
            //console.log('Property ' + property.dictRef + ' does not exist, adding...');
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        } else {
            console.log('Property ' + property.dictRef + ' already exists, updating...');
            this.nodes.set(i, property);
        }
    }
}

/**
 * In the XML, a "me:deltaEDown" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include "bathGas", "units", "lower", "upper", and "stepsize".
 */
export class DeltaEDown extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:deltaEDown";

    /**
     * The key for the bathGas attribute.
     */
    static readonly s_bathGas: string = "bathGas";

    /**
     * The key for the units attribute.
     */
    static readonly s_units: string = "units";

    /**
     * The key for the lower attribute.
     */
    static readonly s_lower: string = "lower";

    /**
     * The key for the upper attribute.
     */
    static readonly s_upper: string = "upper";

    /**
     * The key for the stepsize attribute.
     */
    static readonly s_stepsize: string = "stepsize";

    /**
     * @param attributes The attributes.
     * @param units The units.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, DeltaEDown.tagName, value);
    }

    /**
     * @returns The bath gas of the DeltaEDown.
     */
    getBathGas(): string | undefined {
        return this.attributes.get(DeltaEDown.s_bathGas);
    }

    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */
    setBathGas(bathGas: string): void {
        this.attributes.set(DeltaEDown.s_bathGas, bathGas);
    }

    /**
     * @returns The units of the DeltaEDown.
     */
    getUnits(): string | undefined {
        return this.attributes.get(DeltaEDown.s_units);
    }

    /**
     * @param units The units of the DeltaEDown.
     */
    setUnits(units: string): void {
        this.attributes.set(DeltaEDown.s_units, units);
    }

    /**
     * @returns The lower of the DeltaEDown.
     */
    getLower(): number | undefined {
        return parseFloat(get(this.attributes, DeltaEDown.s_lower));
    }

    /**
     * @param lower The lower of the DeltaEDown.
     */
    setLower(lower: number): void {
        this.attributes.set(DeltaEDown.s_lower, lower.toString());
    }

    /**
     * @returns The upper of the DeltaEDown.
     */
    getUpper(): number | undefined {
        return parseFloat(get(this.attributes, DeltaEDown.s_upper));
    }

    /**
     * @param upper The upper of the DeltaEDown.
     */
    setUpper(upper: number): void {
        this.attributes.set(DeltaEDown.s_upper, upper.toString());
    }

    /**
     * @returns The stepsize of the DeltaEDown.
     */
    getStepsize(): number | undefined {
        return parseFloat(get(this.attributes, DeltaEDown.s_stepsize));
    }

    /**
     * @param stepsize The stepsize of the DeltaEDown.
     */
    setStepsize(stepsize: number): void {
        this.attributes.set(DeltaEDown.s_stepsize, stepsize.toString());
    }

    /**
     * @param value The value of the DeltaEDown.
     */
    setValue(value: number): void {
        this.value = value;
    }
}

/**
 * In the XML, a "me:energyTransferModel" node is a child node of a "molecule" node.
 * It may have:
 * One or more "me:deltaEDown" child nodes.
 * Additional child nodes might include "me:deltaEDownTExponent".
 */
export class EnergyTransferModel extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:energyTransferModel";

    /**
     * @param attributes The attributes.
     * @param deltaEDowns The DeltaEDowns.
     */
    constructor(attributes: Map<string, string>, deltaEDowns?: DeltaEDown[]) {
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
    getDeltaEDowns(): DeltaEDown[] {
        let deltaEDowns: DeltaEDown[] = [];
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
    setDeltaEDowns(deltaEDowns: DeltaEDown[]): void {
        this.nodes.clear();
        deltaEDowns.forEach(deltaEDown => {
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }

    /**
     * @param index The index of the DeltaEDown to return.
     * @returns The DeltaEDown at the given index.
     */
    getDeltaEDown(index: number): DeltaEDown {
        if (index < 0 || index >= this.nodes.size) {
            throw new Error('index out of range');
        }
        return this.nodes.get(index) as DeltaEDown;
    }

    /**
     * Set the DeltaEDown at the given index.
     * @param index The index to set the DeltaEDown at.
     * @param deltaEDown The DeltaEDown to set at the index.
     */
    setDeltaEDown(index: number, deltaEDown: DeltaEDown): void {
        this.nodes.set(index, deltaEDown);
    }

    /**
     * Add the DeltaEDowns.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */
    addDeltaEDown(deltaEDown: DeltaEDown): number {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
}

/**
 * In the XML, a "me:DOSCMethod" node is a child node of a "molecule" node.
 * The attributes are expected to include either "xsi:type" or "name" - expected values include ["ClassicalRotors", 
 * "QMRotors", "me:ClassicalRotors", "me:QMRotors"].
 */
export class DOSCMethod extends TagWithAttributes {
    
    /**
     * The tag name.
     */
    static readonly tagName: string = "me:DOSCMethod";

    /**
     * The options for the "xsi:type" or "name" attribute value.
     */
    static readonly xsi_typeOptions: string[] = ["ClassicalRotors", "QMRotors", "me:ClassicalRotors", "me:QMRotors"];

    /**
     * The key for the "xsi:type" attribute value.
     */
    static readonly s_xsi_type = "xsi:type";

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, DOSCMethod.tagName);
        if (attributes.get(DOSCMethod.s_xsi_type) == undefined) {
            let name: string | undefined = attributes.get("name");
            if (name == undefined) {
                throw new Error('Neither xsi:type or name are defined.');
            } else {
                attributes.set(DOSCMethod.s_xsi_type, name);
            }
        }
    }

    /**
     * @returns The xsi:type.
     */
    getXsiType(): string {
        return this.attributes.get(DOSCMethod.s_xsi_type) as string;
    }

    /**
     * @param xsiType The xsi:type.
     */
    setXsiType(xsiType: string): void {
        this.attributes.set(DOSCMethod.s_xsi_type, xsiType);
    }
}

/**
 * In the XML, a "me:bondRef" node is a child node of a "me:ExtraDOSCMethod" node.
 */
export class BondRef extends StringNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:bondRef";

    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */
    constructor(attributes: Map<string, string>, bondRef: string) {
        super(attributes, BondRef.tagName, bondRef);
    }
}

/**
 * In the XML, a "me:PotentialPoint" node is a child node of a "me:HinderedRotorPotential" node.
 * The attributes must include "angle" and "potential".
 */
export class PotentialPoint extends TagWithAttributes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:PotentialPoint";

    /**
     * The key angle attribute.
     */
    static readonly s_angle: string = "angle";

    /**
     * The key potential attribute.
     */
    static readonly s_potential: string = "potential";

    /**
     * The angle stored for convenience, this is also an attribute.
     */
    angle: number;

    /**
     * The potential stored for convenience, this is also an attribute.
     */
    potential: number;

    /**
     * @param attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes, PotentialPoint.tagName);
        let angle: string | undefined = attributes.get(PotentialPoint.s_angle);
        if (angle == undefined) {
            throw new Error(PotentialPoint.s_potential + ' is undefined!');
        }
        this.angle = parseFloat(angle);
        let potential: string | undefined = attributes.get(PotentialPoint.s_potential);
        if (potential == undefined) {
            throw new Error(PotentialPoint.s_potential + ' is undefined!');
        }
        this.potential = parseFloat(potential);
    }

    /**
     * @returns The angle.
     */
    getAngle(): number {
        return this.angle;
    }

    /**
     * @param angle The angle of the PotentialPoint.
     */
    setAngle(angle: number): void {
        this.angle = angle;
        this.attributes.set(PotentialPoint.s_angle, angle.toString());
    }

    /**
     * @returns The potential.
     */
    getPotential(): number {
        return this.potential;
    }

    /**
     * @param potential The potential of the PotentialPoint.
     */
    setPotential(potential: number): void {
        this.potential = potential;
        this.attributes.set(PotentialPoint.s_potential, potential.toString());
    }

}

/**
 * In the XML, a "me:HinderedRotorPotential" node is a child node of a "me:ExtraDOSCMethod" node.
 * It may have one or more "me:PotentialPoint" child nodes.
 * The attributes must include "format" (with a value from ["numerical", "analytical"]) and "units" (Mesmer.energyUnits).
 */
export class HinderedRotorPotential extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:HinderedRotorPotential";

    /**
     * The permitted formats.
     */
    static readonly formats: string[] = ["numerical", "analytical"];

    /**
     * The key for the format attribute value.
     */
    static readonly s_format: string = "format";

    /**
     * The key for the units attribute value.
     */
    static readonly s_units: string = "units";

    /**
     * The key for the expansionSize attribute value.
     */
    static readonly s_expansionSize: string = "expansionSize";

    /**
     * The key for the useSineTerms attribute value.
     */
    static readonly s_useSineTerms: string = "useSineTerms";

    /**
     * The format stored for convenience, this is also an attribute.
     */
    format: string;

    /**
     * The units stored for convenience, this is also an attribute.
     */
    units: string;

    /**
     * The expansionSize stored for convenience, this is also an attribute.
     */
    expansionSize: number;

    /**
     * The useSineTerms stored for convenience, this is also an attribute.
     */
    useSineTerms: boolean;

    /**
     * @param attributes The attributes.
     * @param potentialPoints The PotentialPoints.
     */
    constructor(attributes: Map<string, string>, potentialPoints?: PotentialPoint[]) {
        super(attributes, HinderedRotorPotential.tagName);
        let format: string | undefined = attributes.get(HinderedRotorPotential.s_format);
        if (format == undefined) {
            throw new Error(HinderedRotorPotential.s_format + ' is undefined!');
        }
        this.format = format;
        let units: string | undefined = attributes.get(HinderedRotorPotential.s_units);
        if (units == undefined) {
            throw new Error(HinderedRotorPotential.s_units + ' is undefined!');
        }
        this.units = units;
        if (potentialPoints != undefined) {
            potentialPoints.forEach(p => {
                this.nodes.set(this.nodes.size, p);
            });
        }
        let expansionSize: string | undefined = attributes.get(HinderedRotorPotential.s_expansionSize);
        if (expansionSize == undefined) {
            throw new Error(HinderedRotorPotential.s_expansionSize + ' is undefined!');
        }
        this.expansionSize = parseFloat(expansionSize);
        let useSineTerms: string | undefined = attributes.get(HinderedRotorPotential.s_useSineTerms);
        if (useSineTerms == undefined) {
            throw new Error(HinderedRotorPotential.s_useSineTerms + ' is undefined!');
        }
        this.useSineTerms = (useSineTerms == "yes");
    }

    /**
     * @returns The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */
    getFormat(): string {
        return this.format;
    }

    /**
     * @param format The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */
    setFormat(format: string): void {
        this.format = format;
        this.attributes.set(HinderedRotorPotential.s_format, format);
    }

    /**
     * @returns The units of the HinderedRotorPotential.
     * Should be one of Mesmer.energyUnits.
     */
    getUnits(): string {
        return this.units;
    }

    /**
     * @param units The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */
    setUnits(units: string): void {
        this.units = units;
        this.attributes.set(HinderedRotorPotential.s_units, units);
    }

    /**
     * @returns The expansionSize of the HinderedRotorPotential.
     */
    getExpansionSize(): number {
        return this.expansionSize;
    }

    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */
    setExpansionSize(expansionSize: number): void {
        this.expansionSize = expansionSize;
        this.attributes.set(HinderedRotorPotential.s_expansionSize, expansionSize.toString());
    }

    /**
     * @returns The useSineTerms of the HinderedRotorPotential.
     */
    getUseSineTerms(): boolean {
        return this.useSineTerms;
    }

    /**
     * @param useSineTerms The useSineTerms of the HinderedRotorPotential.
     */
    setUseSineTerms(useSineTerms: boolean): void {
        this.useSineTerms = useSineTerms;
        this.attributes.set(HinderedRotorPotential.s_useSineTerms, useSineTerms ? "yes" : "no");
    }

    /**
     * @returns The potential point with the given index.
     */
    getPotentialPoint(i: number): PotentialPoint {
        return this.nodes.get(i) as PotentialPoint;
    }

    /**
     * Set the potential point at the given index.
     * @param i The index to set the potential point at.
     * @param p The potential point to set at the index.
     */
    setPotentialPoint(i: number, p: PotentialPoint): void {
        this.nodes.set(i, p);
    }

    /**
     * Sets the potential points.
     * @param potentialPoints The potential points.
     */
    setPotentialPoints(potentialPoints: PotentialPoint[]): void {
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
    addPotentialPoint(p: PotentialPoint): number {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
    }

    /**
     * @param i The index of the potential point to remove.
     */
    removePotentialPoint(i: number): void {
        this.nodes.delete(i);
    }
}

/**
 * In the XML, a "me:periodicity" node is a child node of a "me:ExtraDOSCMethod" node.
 */
export class Periodicity extends NumberNode {

    static readonly tagName: string = "me:periodicity";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, Periodicity.tagName, value);
    }
}

/**
 * In the XML, a "me:ExtraDOSCMethod" node is a child node of a "molecule" node.
 */
export class ExtraDOSCMethod extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:ExtraDOSCMethod";

    /**
     * The index.
     */
    index: Map<string, number>;

    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     * @param hinderedRotorPotential The HinderedRotorPotential.
     * @param periodicity The Periodicity.
     */
    constructor(attributes: Map<string, string>, bondRef?: BondRef,
        hinderedRotorPotential?: HinderedRotorPotential,
        periodicity?: Periodicity) {
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
    getBondRef(): BondRef | undefined {
        let i = this.index.get(BondRef.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as BondRef;
        }
    }

    /**
     * Set the bondRef.
     * @param bondRef The bondRef.
     */
    setBondRef(bondRef: BondRef) {
        let i = this.index.get(BondRef.tagName);
        if (i != undefined) {
            this.nodes.set(i, bondRef);
        } else {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set(BondRef.tagName, this.nodes.size - 1);
        }
    }

    /**
     * @returns The hindered rotor potential of the molecule.
     */
    getHinderedRotorPotential(): HinderedRotorPotential | undefined {
        let i = this.index.get(HinderedRotorPotential.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as HinderedRotorPotential;
        }
    }

    /**
     * Set the hindered rotor potential.
     * @param hinderedRotorPotential The hindered rotor potential.
     */
    setHinderedRotorPotential(hinderedRotorPotential: HinderedRotorPotential) {
        let i = this.index.get(HinderedRotorPotential.tagName);
        if (i != undefined) {
            this.nodes.set(i, hinderedRotorPotential);
        } else {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set(HinderedRotorPotential.tagName, this.nodes.size - 1);
        }
    }

    /**
     * @returns The periodicity of the molecule.
     */
    getPeriodicity(): Periodicity | undefined {
        let i = this.index.get(Periodicity.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as Periodicity;
        }
    }

    /**
     * Set the periodicity.
     * @param periodicity The periodicity.
     */
    setPeriodicity(periodicity: Periodicity) {
        let i = this.index.get(Periodicity.tagName);
        if (i != undefined) {
            this.nodes.set(i, periodicity);
        } else {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set(Periodicity.tagName, this.nodes.size - 1);
        }
    }

}

/**
 * The attributes may include "units".
 * In the XML, a "me:reservoirSize" node is a child node of a "molecule" node.
 */
export class ReservoirSize extends NumberNode {

    /**
     * The tag name.
     */
    static readonly tagName: string = "me:reservoirSize";

    /**
     * @param attributes The attributes.
     * @param value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, ReservoirSize.tagName, value);
    }
}


/**
 * The attributes may include "description" and "active" (and possibly others).
 * In the XML, a "molecule" node is a child node of a "moleculeList" node.
 */
export class Molecule extends NodeWithNodes {

    /**
     * The tag name.
     */
    static readonly tagName: string = "molecule";

    /**
     * The key for the id attribute value.
     */
    static readonly s_id = "id";

    /**
     * The key for the description attribute value.
     */
    static readonly s_description = "description";

    /**
     * The key for the active attribute value.
     */
    static readonly s_active = "active";

    /**
     * The index. The keys are the tag names and the values are the node indexes.
     */
    index: Map<string, number>;

    // The molecule ID.
    id: string;

    /**
     * Create a molecule.
     * @param attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes may include "description" and "active" (and posibly others), but these do not exist for all molecules.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethod The extra method for calculating density of states.
     * @param reservoirSize The reservoir size.
     */
    constructor(
        attributes: Map<string, string>,
        atoms?: Atom | AtomArray,
        bonds?: Bond | BondArray,
        properties?: PropertyList | Property,
        energyTransferModel?: EnergyTransferModel,
        dOSCMethod?: DOSCMethod,
        extraDOSCMethod?: ExtraDOSCMethod,
        reservoirSize?: ReservoirSize) {
        super(attributes, Molecule.tagName);
        this.index = new Map();
        let id: string | undefined = attributes.get(Molecule.s_id);
        if (id == undefined) {
            throw new Error(Molecule.s_id + ' is undefined');
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
    getDescription(): string | undefined {
        return this.attributes.get(Molecule.s_description);
    }

    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */
    setDescription(description: string): void {
        this.attributes.set(Molecule.s_description, description);
    }

    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */
    getActive(): boolean | undefined {
        let active = this.attributes.get(Molecule.s_active);
        if (active != undefined) {
            if (active == "true") {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */
    setActive(active: boolean): void {
        this.attributes.set(Molecule.s_active, active.toString());
    }

    /**
     * Get a label for the molecule which includes the is and any description and whether active.
     * @returns A label for the molecule detailing the attributes of the XML element (including id, 
     * and possibly including description and whether active).
     */
    getLabel(): string {
        let label: string = this.id;
        let description: string | undefined = this.getDescription();
        if (description != undefined) {
            label += " (" + description + ")";
        }
        let active: boolean | undefined = this.getActive();
        if (active) {
            label += " (" + Molecule.s_active + ")";
        }
        return label;
    }

    /**
     * @returns A comma and space separated string of the attributes of the molecule.
     */
    getAttributesAsString(): string {
        return Array.from(this.attributes, ([key, value]) => `${key}=\"${value}\"`).join(', ');
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
     * @param properties The properties.
     */
    setProperties(properties: PropertyList | Property) {
        let i: number | undefined = this.index.get(PropertyList.tagName);
        if (i == undefined) {
            this.index.set(PropertyList.tagName, this.nodes.size);
            this.addNode(properties);
        } else {
            this.nodes.set(i, properties);
        }
    }

    /**
     * Get a property.
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */
    getProperty(dictRef: string): Property | undefined {
        let properties: PropertyList | Property | undefined = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof PropertyList) {
                //console.log('PropertyList');
                return properties.getProperty(dictRef);
            } else {
                //console.log('Property');
                return properties;
            }
        }
    }

    /**
     * Set the property.
     * @param property The property.
     */
    setProperty(property: Property): void {
        let properties: PropertyList | Property | undefined = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof PropertyList) {
                properties.setProperty(property);
            } else {
                this.setProperties(properties);
            }
        } else {
            this.setProperties(property);
        }
    }

    /**
     * @returns The atoms of the molecule.
     */
    getAtoms(): Atom | AtomArray | undefined {
        let i: number | undefined = this.index.get(Atom.tagName);
        if (i == undefined) {
            i = this.index.get(AtomArray.tagName);
            if (i == undefined) {
                return undefined;
            } else {
                return this.nodes.get(i) as AtomArray;
            }
        } else {
            return this.nodes.get(i) as Atom;
        }
    }

    /**
     * @returns The bonds of the molecule.
     */
    getBonds(): BondArray | undefined {
        let i: number | undefined = this.index.get(BondArray.tagName);
        if (i != undefined) {
            return this.nodes.get(i) as BondArray;
        }
    }

    /**
     * @returns The energy transfer model of the molecule.
     */
    getEnergyTransferModel(): EnergyTransferModel | undefined {
        let i: number | undefined = this.index.get(EnergyTransferModel.tagName);
        if (i == undefined) {
            return undefined;
        } else {
            return this.nodes.get(i) as EnergyTransferModel;
        }
    }

    /**
     * Set the energy transfer model.
     * @param energyTransferModel The energy transfer model.
     */
    setEnergyTransferModel(energyTransferModel: EnergyTransferModel) {
        let i: number | undefined = this.index.get(EnergyTransferModel.tagName);
        if (i == undefined) {
            this.index.set(EnergyTransferModel.tagName, this.nodes.size);
            this.addNode(energyTransferModel);
        } else {
            this.nodes.set(i, energyTransferModel);
        }
    }

    /**
     * @returns The DOSC method of the molecule.
     */
    getDOSCMethod(): DOSCMethod | undefined {
        let i: number | undefined = this.index.get(DOSCMethod.tagName);
        if (i == undefined) {
            return undefined;
        } else {
            return this.nodes.get(i) as DOSCMethod;
        }
    }

    /**
     * Set the DOSC method.
     * @param dOSCMethod The DOSC method.
     */
    setDOSCMethod(dOSCMethod: DOSCMethod) {
        let i: number | undefined = this.index.get(DOSCMethod.tagName);
        if (i == undefined) {
            this.index.set(DOSCMethod.tagName, this.nodes.size);
            this.addNode(dOSCMethod);
        } else {
            this.nodes.set(i, dOSCMethod);
        }
    }

    /**
     * @returns The extra DOSC method of the molecule.
     */
    getExtraDOSCMethod(): ExtraDOSCMethod | undefined {
        let i: number | undefined = this.index.get(ExtraDOSCMethod.tagName);
        if (i == undefined) {
            return undefined;
        } else {
            return this.nodes.get(i) as ExtraDOSCMethod;
        }
    }

    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */
    setExtraDOSCMethod(extraDOSCMethod: ExtraDOSCMethod) {
        let i: number | undefined = this.index.get(ExtraDOSCMethod.tagName);
        if (i == undefined) {
            this.index.set(ExtraDOSCMethod.tagName, this.nodes.size);
            this.addNode(extraDOSCMethod);
        } else {
            this.nodes.set(i, extraDOSCMethod);
        }
    }

    /**
     * @returns The reservoir size of the molecule.
     */
    getReservoirSize(): ReservoirSize | undefined {
        let i: number | undefined = this.index.get(ReservoirSize.tagName);
        if (i == undefined) {
            return undefined;
        } else {
            return this.nodes.get(i) as ReservoirSize;
        }
    }

    /**
     * Set the reservoir size.
     * @param reservoirSize The reservoir size.
     */
    setReservoirSize(reservoirSize: ReservoirSize) {
        let i: number | undefined = this.index.get(ReservoirSize.tagName);
        if (i == undefined) {
            this.index.set(ReservoirSize.tagName, this.nodes.size);
            this.addNode(reservoirSize);
        } else {
            this.nodes.set(i, reservoirSize);
        }
    }

    /**
     * Get the ZPE value of the molecule.
     */
    getEnergy(): number {
        let p: Property | undefined = this.getProperty(ZPE.dictRef);
        if (p == undefined) {
            console.log(this.toString());
            throw new Error(ZPE.dictRef + ' property not found!');
            //return 0;
        }
        return (p.getProperty() as PropertyScalar).value;
    }
}