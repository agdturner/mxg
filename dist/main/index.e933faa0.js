/**
 * Thow an error if the key is not in the map otherwise return the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */ function $e83075ae9d5bc9c2$export$3988ae62b71be9a3(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function $e83075ae9d5bc9c2$export$bd2782c820638828(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}


/**
 * Get the attribute of an xml element.
 * @param xml The xml element to search in.
 * @param name The name of the attribute to search for.
 * @returns The value of the attribute.
 * @throws An error if the attribute is not found.
 */ function $3b8751d27ddf0746$export$735ee1799fd02602(xml, name) {
    let v = xml.getAttribute(name);
    if (!v) throw new Error(name + " attribute not found");
    return v;
}
function $3b8751d27ddf0746$export$91e73a91db22e6a2(element, tagName) {
    let el = element.getElementsByTagName(tagName)[0];
    if (el == null) throw new Error(tagName + " element not found");
    return el;
}
function $3b8751d27ddf0746$export$4e07613bf412feb7(element) {
    let cn = element.childNodes;
    if (cn == null) throw new Error("Element has no childNodes");
    return cn[0];
}
function $3b8751d27ddf0746$export$13cb40e9b656ab9e(node) {
    let nodeValue = node.nodeValue;
    if (nodeValue == null) throw new Error("nodeValue is null");
    return nodeValue;
}
function $3b8751d27ddf0746$export$2cd488e9ab180ce2(tagName, attributes, attributeName, attributeValue, padding) {
    let s = "";
    if (padding != undefined) s += "\n" + padding;
    s += "<" + tagName;
    if (attributes) for (let [k, v] of attributes)s += " " + k + '="' + v.toString() + '"';
    if (attributeName && attributeValue) s += " " + attributeName + '="' + attributeValue.toString() + '"';
    return s + ">";
}
function $3b8751d27ddf0746$export$34b7e1ae786b72b0(tagName, padding, padValue) {
    let s = "";
    if (padValue) {
        if (padding != undefined) s += "\n" + padding;
    }
    return s + "</" + tagName + ">";
}
function $3b8751d27ddf0746$export$dad497fe1f6e27c0(content, tagName, attributes, attributeName, attributeValue, padding, padValue) {
    let startTag = $3b8751d27ddf0746$export$2cd488e9ab180ce2(tagName, attributes, attributeName, attributeValue, padding);
    let endTag = $3b8751d27ddf0746$export$34b7e1ae786b72b0(tagName, padding, padValue);
    return startTag + content + endTag;
}
function $3b8751d27ddf0746$export$fe94072fee8a6976(element) {
    let attributeNames = element.getAttributeNames();
    let attributes = new Map();
    attributeNames.forEach(function(attributeName) {
        let attributeValue = element.getAttribute(attributeName);
        if (attributeValue != null) attributes.set(attributeName, attributeValue);
    });
    return attributes;
}
function $3b8751d27ddf0746$export$b7531b8ff18dc588(xml, tagName) {
    let e = xml.getElementsByTagName(tagName);
    if (e.length != 1) throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    return e[0];
}
function $3b8751d27ddf0746$export$438fa7935f716bdf(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;");
}


/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */ function $e9e1b51eab61e3b9$export$3359980f21752184(headings) {
    var th = "";
    for(let i = 0; i < headings.length; i++)th += "<th>" + headings[i] + "</th>";
    return $e9e1b51eab61e3b9$export$b5ad96d32b19f99(th);
}
function $e9e1b51eab61e3b9$export$983f4376b55e6517(x, contentEditable = false) {
    let r = "<td";
    if (contentEditable) r += ' contenteditable="true"';
    r += ">" + x + "</td>";
    return r;
}
function $e9e1b51eab61e3b9$export$b5ad96d32b19f99(x) {
    return "<tr>" + x + "</tr>\n";
}
function $e9e1b51eab61e3b9$export$71b553ef914ccf29(x) {
    return "<table>" + x + "</table>";
}
function $e9e1b51eab61e3b9$export$d0a97d36ec56002f(x, id, html_class) {
    let r = "<div";
    if (id !== null) r += ' id="' + id + '"';
    if (html_class !== null) r += ' class="' + html_class + '"';
    return r + ">" + x + "</div>";
}
function $e9e1b51eab61e3b9$export$7c112ceec8941e67(type, id, func, value) {
    let r = '<input type="' + type + '"';
    if (id !== null) r += ' id="' + id + '"';
    if (func !== null) r += ' onchange="' + func + '"';
    if (value !== null) r += ' value="' + value + '"';
    return r + ">";
}
function $e9e1b51eab61e3b9$export$ff083c49da8fe0f9(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}



class $4831903fcafd8482$export$21991851b0bb231f {
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        this.attributes = attributes;
    }
    /**
     * @returns The name in lower case.
     */ /*
    get name(): string {
        return this.constructor.name.toLowerCase().trim();
    }
    */ /**
     * @returns A string representation.
     */ toString() {
        let r = this.constructor.name + `(`;
        this.attributes.forEach((value, key)=>{
            r += `${key}(${value}), `;
        });
        return r;
    }
    /**
     * Get the tag representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns A tag representation.
     */ toTag(tagName, padding) {
        let s = (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(this.attributes, tagName);
        if (padding) return "\n" + padding + s;
        return "\n" + s;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)("", tagName, this.attributes, undefined, undefined, padding, false);
    }
}
class $4831903fcafd8482$export$bf6a5b951c66187b extends $4831903fcafd8482$export$21991851b0bb231f {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value.
     */ constructor(attributes, value){
        super(attributes);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.value.toString().trim(), tagName, this.attributes, undefined, undefined, padding, false);
    }
}
class $4831903fcafd8482$export$a66b3a80833b522b extends $4831903fcafd8482$export$21991851b0bb231f {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number[]} values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes);
        /**
     * The delimiter of the values.
     */ this.delimiter = ",";
        this.values = values;
        if (delimiter) this.delimiter = delimiter;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param {string} delimiter The delimiter.
     */ setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.values.toString().replaceAll(",", this.delimiter), tagName, this.attributes, undefined, undefined, padding, false);
    }
}


/**
 * For convertina a map to a string.
 * @param map The map to convert to a string.
 * @returns A string representation of all the entries in the map.
 */ function $f512479db9727ac6$export$dc22ec7f8e0b9ac(map) {
    if (map == null) return "";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(", ");
}
function $f512479db9727ac6$export$4323cc4280d5be7(array, delimiter) {
    if (array == null) return "";
    if (delimiter == null) delimiter = ", ";
    return array.map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function $f512479db9727ac6$export$8cfbaad830aa9e0a(s) {
    let r = [];
    for(let i = 0; i < s.length; i++)r.push(parseFloat(s[i]));
    return r;
}
function $f512479db9727ac6$export$e90fb89750dba83f(s) {
    return !isNaN(parseFloat(s));
}



class $78e2bc6c20f9f192$export$80986e6afdd7e0cb extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */ constructor(attributes){
        super(attributes);
        let id = attributes.get("id");
        if (id == undefined) throw new Error("id is undefined");
        let elementType = attributes.get("elementType");
        if (elementType == undefined) throw new Error("elementType is undefined");
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        return s + `)`;
    }
    /**
     * @returns The id of the atom.
     */ get id() {
        return this.attributes.get("id");
    }
    /**
     * @returns The element type of the atom.
     */ get elementType() {
        return this.attributes.get("elementType");
    }
}
class $78e2bc6c20f9f192$export$153327fc99ac0c53 extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        return s + `)`;
    }
}
class $78e2bc6c20f9f192$export$41b04b3a73e7216d extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {NumberWithAttributes | NumberArrayWithAttributes} property The property.
     */ constructor(attributes, property){
        super(attributes);
        this.property = property;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + ` property(${this.property.toString()}))`;
    }
    /**
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1 = undefined;
        if (pad != undefined) {
            if (padding != undefined) padding1 = padding + pad;
        }
        if (this.property instanceof (0, $4831903fcafd8482$export$bf6a5b951c66187b)) return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.property.toXML("scalar", padding1), "property", this.attributes, undefined, undefined, padding, true);
        else return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.property.toXML("array", padding1), "property", this.attributes, undefined, undefined, padding, true);
    }
}
class $78e2bc6c20f9f192$export$16fc56ab40b12b45 extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $78e2bc6c20f9f192$export$499950da20810ac9 extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown} deltaEDown The DeltaEDown.
     */ constructor(attributes, deltaEDown){
        super(attributes);
        this.deltaEDown = deltaEDown;
    }
    /**
     * @param padding - Optional padding string for formatting the XML output.
     * @returns An XML representation.
     */ toXML(pad, padding) {
        if (pad == undefined) return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.deltaEDown.toXML("me.deltaEDown", padding), "me:energyTransferModel", this.attributes, undefined, undefined, padding, false);
        else return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.deltaEDown.toXML("me.deltaEDown", padding), "energyTransferModel", undefined, undefined, undefined, padding, true);
    }
}
class $78e2bc6c20f9f192$export$bbdce6c921702068 {
    constructor(type){
        this.type = type;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return `DOSCMethod(type(${this.type}))`;
    }
    /**
     * @param padding The padding (Optional).
     * @returns A tag representation.
     */ toTag(padding) {
        let s = `<me.DOSCMethod xsi:type="${this.type}"/>`;
        if (padding) return "\n" + padding + s;
        return "\n" + s;
    }
}
class $78e2bc6c20f9f192$export$3da9759ad07746a3 extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes known about are "description" and "active", but these do not exist for all molecules
     * in Mesmer XML input/output files.
     * @param {Map<string, Atom>} atoms A Map of atoms with keys as ids.
     * @param {Map<string, Bond>} bonds A Map of bonds with. The keys combine the ids of the two bonded atoms.
     * @param {Map<string, Property>} properties A map of properties.
     * @param {EnergyTransferModel | null} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | null} dOSCMethod The method for calculating density of states.
     */ constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod){
        super(attributes);
        let id = this.attributes.get("id");
        if (id == undefined) throw new Error("id is undefined");
        this.id = id;
        this.atoms = atoms;
        this.bonds = bonds;
        this.properties = properties;
        this.energyTransferModel = energyTransferModel;
        this.dOSCMethod = dOSCMethod;
    }
    /** 
     * @returns A string representation.
     */ toString() {
        let r = `Molecule(id(${this.getID()}), `;
        let description = this.getDescription();
        if (description != undefined) r += `description(${description}), `;
        let active = this.getActive();
        if (active != undefined) r += `active(${active}), `;
        if (this.atoms.size > 0) r += `atoms(${(0, $f512479db9727ac6$export$dc22ec7f8e0b9ac)(this.atoms)}), `;
        if (this.bonds.size > 0) r += `bonds(${(0, $f512479db9727ac6$export$dc22ec7f8e0b9ac)(this.bonds)}), `;
        if (this.properties.size > 0) r += `properties(${(0, $f512479db9727ac6$export$dc22ec7f8e0b9ac)(this.properties)}), `;
        if (this.energyTransferModel) r += `energyTransferModel(${this.energyTransferModel.toString()}), `;
        if (this.dOSCMethod) r += `dOSCMethod(${this.dOSCMethod.toString()}), `;
        return r + `)`;
    }
    /**
     * @return The id of the molecule.
     */ getID() {
        return this.attributes.get("id");
    }
    /**
     * Gets the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */ getDescription() {
        return this.attributes.get("description");
    }
    /**
     * Gets the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        let active = this.attributes.get("active");
        if (active != undefined) return true;
        return active;
    }
    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set.
     * @throws An error if "me.ZPE" is a property, but is not mapped to a PropertyScalar.
     */ getEnergy() {
        let zpe = this.properties.get("me:ZPE");
        if (zpe == undefined) return 0;
        if (zpe.property instanceof (0, $4831903fcafd8482$export$bf6a5b951c66187b)) return zpe.property.value;
        else throw new Error("Expected a PropertyScalar but got a PropertyArray and not sure how to handle that.");
    }
    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */ setEnergy(energy) {
        let property = this.properties.get("me:ZPE");
        if (property == undefined) throw new Error("No me.ZPE property found");
        if (property.property instanceof (0, $4831903fcafd8482$export$a66b3a80833b522b)) throw new Error("Expected a NumberWithAttributes but got a NumberArrayWithAttributes and not sure how to handle that.");
        else property.property.value = energy;
    }
    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */ getRotationConstants() {
        let property = this.properties.get("me:rotConsts");
        if (property != undefined) {
            if (property.property != null) {
                if (property.property instanceof (0, $4831903fcafd8482$export$bf6a5b951c66187b)) return [
                    property.property.value
                ];
                else return property.property.values;
            } else return undefined;
        }
        return property;
    }
    /**
     * Get the VibrationFrequencies of the molecule.
     * @returns The VibrationFrequencies of the molecule.
     */ getVibrationFrequencies() {
        let property = this.properties.get("me:vibFreqs");
        if (property != undefined) {
            if (property.property instanceof (0, $4831903fcafd8482$export$bf6a5b951c66187b)) return [
                property.property.value
            ];
            else if (property.property instanceof (0, $4831903fcafd8482$export$a66b3a80833b522b)) return property.property.values;
            else return undefined;
        }
        return property;
    }
    /**
     * @param {string} tagName The tag name.
     * @param {string} pad The pad (Optional).
     * @param {number} level The level of padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, pad, level) {
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
        for (let atom of this.atoms.values())atoms_xml += atom.toTag("atom", padding2);
        if (this.atoms.size > 1) {
            if (atoms_xml != "") atoms_xml = (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(atoms_xml, "atomArray", undefined, undefined, undefined, padding1, true);
        }
        // Bonds
        let bonds_xml = "";
        for (let bond of this.bonds.values())bonds_xml += bond.toTag("bond", padding2);
        if (bonds_xml != "") bonds_xml = (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(bonds_xml, "bondArray", undefined, undefined, undefined, padding1, true);
        // Properties
        let properties_xml = "";
        this.properties.forEach((property)=>{
            let property_xml = "";
            if (property.property instanceof (0, $4831903fcafd8482$export$bf6a5b951c66187b)) property_xml += property.property.toXML("scalar", padding3);
            else property_xml += property.property.toXML("array", padding3);
            properties_xml += (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(property_xml, "property", property.attributes, undefined, undefined, padding2, true);
        });
        if (this.properties.size > 1) {
            if (properties_xml != "") properties_xml = (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(properties_xml, "propertyList", undefined, undefined, undefined, padding1, true);
        }
        // EnergyTransferModel
        let energyTransferModel_xml = "";
        if (this.energyTransferModel) energyTransferModel_xml = this.energyTransferModel.toXML(pad, padding1);
        // DOSCMethod
        let dOSCMethod_xml = "";
        if (this.dOSCMethod) dOSCMethod_xml = this.dOSCMethod.toTag(padding1);
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(atoms_xml + bonds_xml + properties_xml + energyTransferModel_xml + dOSCMethod_xml, tagName, this.attributes, undefined, undefined, padding0, true);
    }
}





class $12a3b21d146eb8ae$export$e8a062bb2fc9e2ba extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes);
        this.molecule = molecule;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} pad The pad for an extra level of padding (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = this.toTag("molecule", padding1);
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(s, tagName, undefined, undefined, undefined, padding, true);
    }
}
class $12a3b21d146eb8ae$export$dcfd4302d04b7fb6 extends $12a3b21d146eb8ae$export$e8a062bb2fc9e2ba {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes, molecule);
    }
}
class $12a3b21d146eb8ae$export$264ad599d7cef668 extends $12a3b21d146eb8ae$export$e8a062bb2fc9e2ba {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes, molecule);
    }
}
class $12a3b21d146eb8ae$export$145c1ed87b1a2216 extends $12a3b21d146eb8ae$export$e8a062bb2fc9e2ba {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes, molecule);
    }
    /**
     * A convenience method to get the ref (the molecule ID) of the transition state.
     * @returns The ref of the transition state.
     */ getRef() {
        let s = this.attributes.get("ref");
        if (s == null) throw new Error('Attribute "ref" is undefined.');
        return s;
    }
}
class $12a3b21d146eb8ae$export$38ce90ac8b004d85 extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $12a3b21d146eb8ae$export$1bdc69d2439d749d extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $12a3b21d146eb8ae$export$8d95dd32819bc86c extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $12a3b21d146eb8ae$export$d08982dd841d496f extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $12a3b21d146eb8ae$export$c3cf6f96dac11421 extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class $12a3b21d146eb8ae$export$6fa70ee10f356b6 extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} name The name or xsi:type of the method.
     */ constructor(attributes, name){
        super(attributes);
        this.mCRCMethodName = name;
    }
    toString() {
        return `MCRCMethod(name(${this.mCRCMethodName}))`;
    }
}
class $12a3b21d146eb8ae$export$191e95ebb11cc88 extends $12a3b21d146eb8ae$export$6fa70ee10f356b6 {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */ constructor(attributes, preExponential, activationEnergy, tInfinity, nInfinity){
        super(attributes, "MesmerILT");
        this.preExponential = preExponential;
        this.activationEnergy = activationEnergy;
        this.tInfinity = tInfinity;
        this.nInfinity = nInfinity;
    }
    toString() {
        return `MesmerILT(${super.toString()}, ` + `preExponential(${this.preExponential}), ` + `activationEnergy(${this.activationEnergy}), ` + `TInfinity(${this.tInfinity}), ` + `nInfinity(${this.nInfinity}))`;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        let padding1 = "";
        if (padding != undefined) padding1 = padding + "  ";
        let preExponential_xml = "";
        if (this.preExponential != undefined) preExponential_xml = this.preExponential.toXML("me.preExponential", padding1);
        let activationEnergy_xml = "";
        if (this.activationEnergy != undefined) activationEnergy_xml = this.activationEnergy.toXML("me.activationEnergy", padding1);
        let tInfinity_xml = "";
        if (this.tInfinity != undefined) tInfinity_xml = this.tInfinity.toXML("me.nInfinity", padding1);
        let nInfinity_xml = "";
        if (this.nInfinity != undefined) nInfinity_xml = this.nInfinity.toXML("me.nInfinity", padding1);
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(preExponential_xml + activationEnergy_xml + tInfinity_xml + nInfinity_xml, tagName, this.attributes, undefined, undefined, padding, true);
    }
}
class $12a3b21d146eb8ae$export$1dd2ea318727eda extends $12a3b21d146eb8ae$export$6fa70ee10f356b6 {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} harmonicReactantDiabat_FC The harmonic reactant diabatic FC.
     * @param {number} harmonicReactantDiabat_XO The harmonic reactant diabatic XO.
     * @param {number} harmonicProductDiabat_DE The harmonic product diabatic DE.
     * @param {number} exponentialProductDiabat_A The exponential product diabatic A.
     * @param {number} exponentialProductDiabat_B The exponential product diabatic B.
     * @param {number} exponentialProductDiabat_DE The exponential product diabatic DE.
     */ constructor(attributes, harmonicReactantDiabat_FC, harmonicReactantDiabat_XO, harmonicProductDiabat_DE, exponentialProductDiabat_A, exponentialProductDiabat_B, exponentialProductDiabat_DE){
        super(attributes, "ZhuNakamuraCrossing");
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
    toString() {
        return `ZhuNakamuraCrossing(${super.toString()}, ` + `harmonicReactantDiabat_FC(${this.harmonicReactantDiabat_FC.toString()}), ` + `harmonicReactantDiabat_XO(${this.harmonicReactantDiabat_XO.toString()}), ` + `harmonicProductDiabat_DE(${this.harmonicProductDiabat_DE.toString()}), ` + `exponentialProductDiabat_A(${this.exponentialProductDiabat_A.toString()}), ` + `exponentialProductDiabat_B(${this.exponentialProductDiabat_B.toString()}), ` + `exponentialProductDiabat_DE(${this.exponentialProductDiabat_DE.toString()}))`;
    }
}
class $12a3b21d146eb8ae$export$d2ae4167a30cf6bb extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant>} reactants The reactants in the reaction.
     * @param {Map<string, Product>} products The products of the reaction.
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {TransitionState | undefined} transitionState The transition state (optional).
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     */ constructor(attributes, id, reactants, products, mCRCMethod, transitionState, tunneling){
        super(attributes);
        this.id = id;
        this.reactants = reactants;
        this.products = products;
        this.mCRCMethod = mCRCMethod;
        this.transitionState = transitionState;
        this.tunneling = tunneling;
    }
    /**
     * Convert the product to a string.
     * @returns String representation of the product.
     */ toString() {
        let s = super.toString();
        return super.toString() + `id(${this.id}), ` + `reactants(${(0, $f512479db9727ac6$export$dc22ec7f8e0b9ac)(this.reactants)}), ` + `products(${(0, $f512479db9727ac6$export$dc22ec7f8e0b9ac)(this.products)}), ` + `mCRCMethod(${this.mCRCMethod?.toString()}), ` + `transitionState(${this.transitionState?.toString()}), ` + `tunneling(${this.tunneling?.toString()}))`;
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        return Array.from(this.reactants.values()).map((reactant)=>reactant.molecule.id).join(" + ");
    }
    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */ getReactantsEnergy() {
        return Array.from(this.reactants.values()).map((reactant)=>reactant.molecule.getEnergy()).reduce((a, b)=>a + b, 0);
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        return Array.from(this.products.values()).map((product)=>product.molecule.id).join(" + ");
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy() {
        return Array.from(this.products.values()).map((product)=>product.molecule.getEnergy()).reduce((a, b)=>a + b, 0);
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
    }
    /**
     * @param {string} tagName The tag name.
     * @param {string} pad The pad (Optional).
     * @param {number} level The level of padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, pad, level) {
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
        // Reactants
        let reactants_xml = "";
        this.reactants.forEach((reactant)=>{
            reactants_xml += reactant.toXML("reactant", pad, padding1);
        });
        // Products
        let products_xml = "";
        this.products.forEach((product)=>{
            products_xml += product.toXML("product", pad, padding1);
        });
        // Tunneling
        let tunneling_xml = "";
        if (this.tunneling != undefined) tunneling_xml = this.tunneling.toTag("me.tunneling", padding1);
        // TransitionState
        let transitionState_xml = "";
        if (this.transitionState != undefined) transitionState_xml = this.transitionState.toXML("transitionState", pad, padding1);
        // MCRCMethod
        let mCRCMethod_xml = "";
        if (this.mCRCMethod != undefined) {
            if (this.mCRCMethod instanceof $12a3b21d146eb8ae$export$191e95ebb11cc88) mCRCMethod_xml = this.mCRCMethod.toXML("mCRCMethod", padding1);
            else mCRCMethod_xml = this.mCRCMethod.toTag("mCRCMethod", padding1);
        }
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(reactants_xml + products_xml + tunneling_xml + transitionState_xml + mCRCMethod_xml, tagName, this.attributes, undefined, undefined, padding0, true);
    }
}




/**
 * Draw a horizontal line and add labels.
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} strokeStyle The name of a style to use for the line.
 * @param {number} strokewidth The width of the line.
 * @param {number} x0 The start x-coordinate of the line.
 * @param {number} y0 The start y-coordinate of the line. Also used for an energy label.
 * @param {number} x1 The end x-coordinate of the line.
 * @param {number} y1 The end y-coordinate of the line.
 * @param {string} font The font to use.
 * @param {number} th The height of the text in pixels.
 * @param {string} label The label.
 * @param {string} energyString The energy.
 */ function $0eec2e41a240a451$export$479ac392a7fb4419(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + (x1 - x0) / 2;
    $0eec2e41a240a451$export$bec150f75a9b8f11(ctx, energyString, font, strokeStyle, $0eec2e41a240a451$var$getTextStartX(ctx, energyString, font, x_centre), y1 + th);
    $0eec2e41a240a451$export$bec150f75a9b8f11(ctx, label, font, strokeStyle, $0eec2e41a240a451$var$getTextStartX(ctx, label, font, x_centre), y1 + 3 * th);
    $0eec2e41a240a451$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x0, y0, x1, y1);
}
/**
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} text The text to get the start x-coordinate of.
 * @param {string} font The font to use.  
 * @param {number} x_centre The x-coordinate of the centre of the text.
 * @returns The x-coordinate of the start of the text.
 */ function $0eec2e41a240a451$var$getTextStartX(ctx, text, font, x_centre) {
    let tw = $0eec2e41a240a451$export$37827d046293d309(ctx, text, font);
    return x_centre - tw / 2;
}
function $0eec2e41a240a451$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokewidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function $0eec2e41a240a451$export$bec150f75a9b8f11(ctx, text, font, colour, x, y) {
    // Save the context (to restore after).
    ctx.save();
    // Translate to the point where text is to be added.
    ctx.translate(x, y);
    // Invert Y-axis.
    ctx.scale(1, -1);
    // Set the text font.
    ctx.font = font;
    // Set the text colour.
    ctx.fillStyle = colour;
    // Write the text.
    ctx.fillText(text, 0, 0);
    // Restore the context.
    ctx.restore();
}
function $0eec2e41a240a451$export$c398604a09be5382(ctx, text, font) {
    ctx.font = font;
    var fontMetric = ctx.measureText(text);
    return fontMetric.actualBoundingBoxAscent + fontMetric.actualBoundingBoxDescent;
}
function $0eec2e41a240a451$export$37827d046293d309(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
}






class $eb2684c350976919$export$3fe97ecb6b172244 extends (0, $4831903fcafd8482$export$21991851b0bb231f) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes);
        let p = attributes.get("P");
        if (p) this.P = parseFloat(p);
        else throw new Error("P is undefined");
        let t = attributes.get("T");
        if (t) this.T = parseFloat(t);
        else throw new Error("T is undefined");
    }
}
class $eb2684c350976919$export$b33a132661f4be58 extends (0, $12a3b21d146eb8ae$export$e8a062bb2fc9e2ba) {
    constructor(attributes, molecule){
        super(attributes, molecule);
    }
}
class $eb2684c350976919$export$363c7374d425f4ad {
    /**
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */ constructor(bathGas, pTs){
        this.bathGas = bathGas;
        this.pTs = pTs;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return `Conditions(` + `bathGas(${this.bathGas.toString()}), ` + `pTs(${this.pTs.toString()}))`;
    }
    /**
     * @param padding The padding (optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = this.bathGas.toXML("bathGas", pad, padding1);
        this.pTs.forEach((pt)=>{
            s += pt.toTag("PTpair", padding1);
        });
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(s, "conditions", undefined, undefined, undefined, padding, true);
    }
}




class $2d856c09e0501474$export$26e33f0df9ce919d extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * @param {string} units The units.
     */ constructor(attributes, value){
        super(attributes, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}
class $2d856c09e0501474$export$77f098867dc64198 {
    /**
     * @param {GrainSize} grainSize The grain size.
     * @param {number} energyAboveTheTopHill The energy above the top hill.
     */ constructor(grainSize, energyAboveTheTopHill){
        this.grainSize = grainSize;
        this.energyAboveTheTopHill = energyAboveTheTopHill;
    }
    toString() {
        return `ModelParameters(` + `grainSize(${this.grainSize.toString()}), ` + `energyAboveTheTopHill(${this.energyAboveTheTopHill.toString()}))`;
    }
    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding2 = "";
        if (pad != undefined && padding != undefined) padding2 = padding + pad;
        let s = this.grainSize.toXML("me:GrainSize", padding2);
        s += (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(this.energyAboveTheTopHill.toString(), "me:EnergyAboveTheTopHill", undefined, undefined, undefined, padding2, false);
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(s, "me:modelParameters", undefined, undefined, undefined, padding, true);
    }
}





class $1fbd06547c155a38$export$159b5d3263f1049a extends (0, $4831903fcafd8482$export$bf6a5b951c66187b) {
    /**
     * @param {Map<string, string>} attributes The attributes (ref refers to a particular reaction). 
     * @param {number} value The value.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $1fbd06547c155a38$export$7a7fa4424cb20976 {
    constructor(testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset){
        this.testDOS = testDOS;
        this.printSpeciesProfile = printSpeciesProfile;
        this.testMicroRates = testMicroRates;
        this.testRateConstant = testRateConstant;
        this.printGrainDOS = printGrainDOS;
        this.printCellDOS = printCellDOS;
        this.printReactionOperatorColumnSums = printReactionOperatorColumnSums;
        this.printTunnellingCoefficients = printTunnellingCoefficients;
        this.printGrainkfE = printGrainkfE;
        this.printGrainBoltzmann = printGrainBoltzmann;
        this.printGrainkbE = printGrainkbE;
        this.eigenvalues = eigenvalues;
        this.hideInactive = hideInactive;
        this.diagramEnergyOffset = diagramEnergyOffset;
    }
    toString() {
        return `Control(` + `testDOS(${this.testDOS?.toString()}), ` + `printSpeciesProfile(${this.printSpeciesProfile?.toString()}), ` + `testMicroRates(${this.testMicroRates?.toString()}), ` + `testRateConstant(${this.testRateConstant?.toString()}), ` + `printGrainDOS(${this.printGrainDOS?.toString()}), ` + `printCellDOS(${this.printCellDOS?.toString()}), ` + `printReactionOperatorColumnSums(${this.printReactionOperatorColumnSums?.toString()}), ` + `printTunnellingCoefficients(${this.printTunnellingCoefficients?.toString()}), ` + `printGrainkfE(${this.printGrainkfE?.toString()}), ` + `printGrainBoltzmann(${this.printGrainBoltzmann?.toString()}), ` + `printGrainkbE(${this.printGrainkbE?.toString()}), ` + `eigenvalues(${this.eigenvalues?.toString()}), ` + `hideInactive(${this.hideInactive?.toString()}))`;
    }
    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:testDOS") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printSpeciesProfile") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:testMicroRates") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:testRateConstant") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printGrainDOS") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printCellDOS") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printReactionOperatorColumnSums") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printTunnellingCoefficients") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printGrainkfE") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printGrainBoltzmann") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:printGrainkbE") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:eigenvalues") + "\n";
        s += padding1 + (0, $e9e1b51eab61e3b9$export$ff083c49da8fe0f9)(null, "me:hideInactive");
        s += this.diagramEnergyOffset?.toXML("me:diagramEnergyOffset", padding1);
        return (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(s, "control", undefined, undefined, null, padding, true);
    }
}


// Expected XML tags strings.
let $496eced55b7d3f1a$var$me_title_s = "me:title";
/**
 * For storing me.title.
 */ let $496eced55b7d3f1a$var$title;
/**
 * For storing the XML root start tag.
 */ let $496eced55b7d3f1a$var$mesmerStartTag;
/**
 * For storing the XML root end tag.
 */ let $496eced55b7d3f1a$var$mesmerEndTag;
/**
 * A map of molecules with Molecule.id as key and Molecules as values.
 */ let $496eced55b7d3f1a$var$molecules = new Map([]);
/**
 * For storing the maximum molecule energy in a reaction.
 */ let $496eced55b7d3f1a$var$maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */ let $496eced55b7d3f1a$var$minMoleculeEnergy = Infinity;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let $496eced55b7d3f1a$var$reactions = new Map([]);
/**
 * The header of the XML file.
 */ const $496eced55b7d3f1a$var$header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
/**
 * The filename of the mesmer input file loaded.
 */ let $496eced55b7d3f1a$var$input_xml_filename;
/**
 * The load button.
 */ let $496eced55b7d3f1a$var$loadButton;
/**
 * The save button.
 */ let $496eced55b7d3f1a$var$saveButton;
/**
 * The XML text element.
 */ let $496eced55b7d3f1a$var$me_title;
let $496eced55b7d3f1a$var$molecules_title;
let $496eced55b7d3f1a$var$molecules_table;
let $496eced55b7d3f1a$var$reactions_title;
let $496eced55b7d3f1a$var$reactions_table;
let $496eced55b7d3f1a$var$reactions_diagram_title;
let $496eced55b7d3f1a$var$conditions_title;
let $496eced55b7d3f1a$var$conditions_table;
let $496eced55b7d3f1a$var$modelParameters_title;
let $496eced55b7d3f1a$var$modelParameters_table;
let $496eced55b7d3f1a$var$xml_title;
let $496eced55b7d3f1a$var$xml_text;
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function $496eced55b7d3f1a$var$displayXML(xml) {
    //console.log("xml=" + xml);
    if ($496eced55b7d3f1a$var$xml_title != null) $496eced55b7d3f1a$var$xml_title.innerHTML = $496eced55b7d3f1a$var$input_xml_filename;
    if ($496eced55b7d3f1a$var$xml_text != null) $496eced55b7d3f1a$var$xml_text.innerHTML = (0, $3b8751d27ddf0746$export$438fa7935f716bdf)(xml);
}
/**
 * Parses xml to initilise molecules.
 * @param {XMLDocument} xml The XML document.
 */ function $496eced55b7d3f1a$var$initMolecules(xml) {
    let moleculeList_s = "moleculeList";
    console.log(moleculeList_s);
    let xml_moleculeList = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml, moleculeList_s);
    // Set molecules_title.
    $496eced55b7d3f1a$var$molecules_title = document.getElementById("molecules_title");
    if ($496eced55b7d3f1a$var$molecules_title != null) $496eced55b7d3f1a$var$molecules_title.innerHTML = "Molecules";
    // xml_moleculeList should have one or more molecule elements and no other elements.
    let moleculeListTagNames = new Set();
    xml_moleculeList.childNodes.forEach(function(node) {
        moleculeListTagNames.add(node.nodeName);
    });
    if (moleculeListTagNames.size != 1) {
        if (!(moleculeListTagNames.size == 2 && moleculeListTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            moleculeListTagNames.forEach((x)=>console.error(x));
            throw new Error("Additional tag names in moleculeList:");
        }
    }
    if (!moleculeListTagNames.has("molecule")) throw new Error("Expecting molecule tagName but it is not present!");
    let xml_molecules = xml_moleculeList.getElementsByTagName("molecule");
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    // Process each molecule.
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf like this.
    for(let i = 0; i < xml_molecules.length; i++){
        // Set attributes.
        let attributes = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_molecules[i]);
        let moleculeTagNames = new Set();
        let cns = xml_molecules[i].childNodes;
        cns.forEach(function(node) {
            moleculeTagNames.add(node.nodeName);
        });
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));
        // Set atoms.
        const atoms = new Map();
        // Sometimes there is an individual atom not in an atomArray.
        //let xml_atomArray = xml_molecules[i].getElementsByTagName("atomArray")[0];
        //if (xml_atomArray != null) {
        moleculeTagNames.delete("atom");
        moleculeTagNames.delete("atomArray");
        let xml_atoms = xml_molecules[i].getElementsByTagName("atom");
        for(let j = 0; j < xml_atoms.length; j++){
            let attribs = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_atoms[j]);
            let id = attribs.get("id");
            if (id != undefined) {
                let atom = new (0, $78e2bc6c20f9f192$export$80986e6afdd7e0cb)(attribs);
                //console.log(atom.toString());
                atoms.set(id, atom);
            }
        }
        //}
        // Read bondArray.
        moleculeTagNames.delete("bond");
        moleculeTagNames.delete("bondArray");
        const bonds = new Map();
        let xml_bonds = xml_molecules[i].getElementsByTagName("bond");
        for(let j = 0; j < xml_bonds.length; j++){
            let attribs = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_bonds[j]);
            let id = attribs.get("atomRefs2");
            if (id != undefined) {
                let bond = new (0, $78e2bc6c20f9f192$export$153327fc99ac0c53)(attribs);
                //console.log(bond.toString());
                bonds.set(id, bond);
            }
        }
        // Read propertyList.
        const properties = new Map();
        // Sometimes there is a single property not in propertyList!
        //let xml_propertyList = xml_molecules[i].getElementsByTagName("propertyList")[0];
        //if (xml_propertyList != null) {
        //    let xml_properties = xml_propertyList.getElementsByTagName("property");
        moleculeTagNames.delete("property");
        moleculeTagNames.delete("propertyList");
        let xml_properties = xml_molecules[i].getElementsByTagName("property");
        for(let j = 0; j < xml_properties.length; j++){
            let attribs = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_properties[j]);
            let children = xml_properties[j].children;
            if (children.length != 1) throw new Error("Expecting 1 child but finding " + children.length);
            let nodeAttributes = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(children[0]);
            let nodeName = children[0].nodeName; // Expecting scalar or array
            let textContent = children[0].textContent;
            if (textContent == null) {
                console.error("nodeName");
                throw new Error("textContent is null");
            }
            textContent = textContent.trim();
            let dictRef = attribs.get("dictRef");
            //console.log("dictRef=" + dictRef);
            if (dictRef == null) throw new Error("dictRef is null");
            //console.log("fcnn=" + fcnn);
            if (nodeName == "scalar") {
                moleculeTagNames.delete("scalar");
                let value = parseFloat(textContent);
                properties.set(dictRef, new (0, $78e2bc6c20f9f192$export$41b04b3a73e7216d)(attribs, new (0, $4831903fcafd8482$export$bf6a5b951c66187b)(nodeAttributes, value)));
                if (dictRef === "me:ZPE") {
                    $496eced55b7d3f1a$var$minMoleculeEnergy = Math.min($496eced55b7d3f1a$var$minMoleculeEnergy, value);
                    $496eced55b7d3f1a$var$maxMoleculeEnergy = Math.max($496eced55b7d3f1a$var$maxMoleculeEnergy, value);
                }
            } else if (nodeName == "array") {
                moleculeTagNames.delete("array");
                properties.set(dictRef, new (0, $78e2bc6c20f9f192$export$41b04b3a73e7216d)(attribs, new (0, $4831903fcafd8482$export$a66b3a80833b522b)(nodeAttributes, (0, $f512479db9727ac6$export$8cfbaad830aa9e0a)(textContent.split(/\s+/)), " ")));
            } else if (nodeName == "matrix") ;
            else throw new Error("Unexpected nodeName: " + nodeName);
        }
        let els;
        // Read energyTransferModel
        moleculeTagNames.delete("me:energyTransferModel");
        let energyTransferModel = undefined;
        els = xml_molecules[i].getElementsByTagName("me:energyTransferModel");
        if (els != null) {
            if (els.length > 0) {
                if (els.length != 1) throw new Error("energyTransferModel length=" + els.length);
                let xml_deltaEDown = els[0].getElementsByTagName("me:deltaEDown");
                if (xml_deltaEDown != null) {
                    if (xml_deltaEDown.length != 1) throw new Error("deltaEDown length=" + xml_deltaEDown.length);
                    let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_deltaEDown[0])));
                    let deltaEDown = new (0, $78e2bc6c20f9f192$export$16fc56ab40b12b45)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_deltaEDown[0]), value);
                    energyTransferModel = new (0, $78e2bc6c20f9f192$export$499950da20810ac9)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(els[0]), deltaEDown);
                }
            }
        }
        // Read DOSCMethod
        moleculeTagNames.delete("me:DOSCMethod");
        let dOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName("me:DOSCMethod");
        if (els != null) {
            let el = els[0];
            if (el != null) {
                if (el != null) {
                    let type = el.getAttribute("xsi:type");
                    if (type != null) dOSCMethod = new (0, $78e2bc6c20f9f192$export$bbdce6c921702068)(type);
                }
            }
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.error("Remaining moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.error(x));
            throw new Error("Unexpected tags in molecule.");
        }
        let molecule = new (0, $78e2bc6c20f9f192$export$3da9759ad07746a3)(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod);
        //console.log(molecule.toString());
        $496eced55b7d3f1a$var$molecules.set(molecule.id, molecule);
    }
    // Add event listeners to molecules table.
    $496eced55b7d3f1a$var$molecules.forEach(function(molecule, id) {
        let energyKey = id + "_energy";
        let inputElement = document.getElementById(energyKey);
        if (inputElement) inputElement.addEventListener("change", (event)=>{
            // The input is set up to call the function setEnergy(HTMLInputElement),
            // so the following commented code is not used. As the input was setup 
            // as a number type. The any non numbers were It seems that there are two 
            // ways to get and store the value of the input element.
            // Both ways have been kept for now as I don't know which way is better!
            let eventTarget = event.target;
            let inputValue = eventTarget.value;
            if ((0, $f512479db9727ac6$export$e90fb89750dba83f)(inputValue)) {
                molecule.setEnergy(parseFloat(inputValue));
                console.log("Set energy of " + id + " to " + inputValue + " kJ/mol");
            } else {
                alert("Energy input for " + id + " is not a number");
                let inputElement = document.getElementById(energyKey);
                inputElement.value = molecule.getEnergy().toString();
                console.log("inputValue=" + inputValue);
                console.log("Type of inputValue: " + typeof inputValue);
            }
        });
    });
}
let $496eced55b7d3f1a$var$inputElement;
//function reload() {
function $496eced55b7d3f1a$var$loadXML() {
    $496eced55b7d3f1a$var$inputElement = document.createElement("input");
    $496eced55b7d3f1a$var$inputElement.type = "file";
    $496eced55b7d3f1a$var$inputElement.onchange = function() {
        if ($496eced55b7d3f1a$var$inputElement.files) {
            for(let i = 0; i < $496eced55b7d3f1a$var$inputElement.files.length; i++)console.log("inputElement.files[" + i + "]=" + $496eced55b7d3f1a$var$inputElement.files[i]);
            let file = $496eced55b7d3f1a$var$inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            $496eced55b7d3f1a$var$input_xml_filename = file.name;
            if ($496eced55b7d3f1a$var$xml_text != null) {
                let reader = new FileReader();
                let chunkSize = 1048576; // 1MB
                let start = 0;
                let contents = "";
                reader.onload = function(e) {
                    if (!e.target) throw new Error("Event target is null");
                    contents += e.target.result;
                    if (file != null) {
                        if (start < file.size) {
                            // Read the next chunk
                            let blob = file.slice(start, start + chunkSize);
                            reader.readAsText(blob);
                            start += chunkSize;
                        } else {
                            // All chunks have been read
                            contents = contents.trim();
                            $496eced55b7d3f1a$var$displayXML(contents);
                            let parser = new DOMParser();
                            let xml = parser.parseFromString(contents, "text/xml");
                            $496eced55b7d3f1a$var$parse(xml);
                            // Send XML to the server
                            fetch("http://localhost:1234/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "text/xml"
                                },
                                body: contents
                            }).then((response)=>{
                                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                                return response.text();
                            }).then((data)=>{
                                console.log("Server response:", data);
                            }).catch((error)=>{
                                console.error("There was a problem with the fetch operation:", error);
                            });
                        }
                    }
                };
                // Read the first chunk
                let blob = file.slice(start, start + chunkSize);
                reader.readAsText(blob);
                start += chunkSize;
            }
        }
    };
    $496eced55b7d3f1a$var$inputElement.click();
    // Add event listener to load button.
    $496eced55b7d3f1a$var$loadButton = document.getElementById("load_button");
    if ($496eced55b7d3f1a$var$loadButton != null) //loadButton.addEventListener('click', reload);
    $496eced55b7d3f1a$var$loadButton.addEventListener("click", $496eced55b7d3f1a$var$loadXML);
    // Ensure save button is displayed.
    $496eced55b7d3f1a$var$saveButton = document.getElementById("saveButton");
    if ($496eced55b7d3f1a$var$saveButton != null) $496eced55b7d3f1a$var$saveButton.style.display = "inline";
}
/**
 * Once the DOM is loaded, set up the elements.
 */ document.addEventListener("DOMContentLoaded", (event)=>{
    // Initialise elements
    $496eced55b7d3f1a$var$xml_title = document.getElementById("xml_title");
    $496eced55b7d3f1a$var$xml_text = document.getElementById("xml_text");
    window.loadXML = function() {
        $496eced55b7d3f1a$var$loadXML();
    //reload();
    };
});
/**
 * Set the title.
 * @param {XMLDocument} xml The XML document.
 */ function $496eced55b7d3f1a$var$setTitle(xml) {
    $496eced55b7d3f1a$var$me_title = xml.getElementsByTagName($496eced55b7d3f1a$var$me_title_s);
    if ($496eced55b7d3f1a$var$me_title == null) throw new Error($496eced55b7d3f1a$var$me_title_s + " not found");
    else {
        if ($496eced55b7d3f1a$var$me_title.length != 1) throw new Error("Multiple " + $496eced55b7d3f1a$var$me_title_s + " elements found");
        else {
            $496eced55b7d3f1a$var$title = $496eced55b7d3f1a$var$me_title[0].childNodes[0].nodeValue;
            $496eced55b7d3f1a$var$title = $496eced55b7d3f1a$var$title.trim();
            console.log("Title=" + $496eced55b7d3f1a$var$title);
            let e = document.getElementById("title");
            if (e != null) e.innerHTML = $496eced55b7d3f1a$var$title;
        }
    }
}
/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */ function $496eced55b7d3f1a$var$parse(xml) {
    /**
     * Set mesmer_xml start tag.
     */ $496eced55b7d3f1a$var$mesmerStartTag = "\n";
    let documentElement = xml.documentElement;
    if (documentElement == null) throw new Error("Document element not found");
    else {
        let tagName = documentElement.tagName;
        $496eced55b7d3f1a$var$mesmerStartTag += "<" + tagName;
        console.log(tagName);
        $496eced55b7d3f1a$var$mesmerEndTag = (0, $3b8751d27ddf0746$export$34b7e1ae786b72b0)(tagName, "", true);
        let first = true;
        let pad = " ".repeat(tagName.length + 2);
        let names = documentElement.getAttributeNames();
        names.forEach(function(name) {
            let attribute = documentElement.getAttribute(name);
            let na = `${name}="${attribute}"`;
            if (first) {
                first = false;
                $496eced55b7d3f1a$var$mesmerStartTag += " " + na;
            } else $496eced55b7d3f1a$var$mesmerStartTag += "\n" + pad + na;
        });
        $496eced55b7d3f1a$var$mesmerStartTag += ">";
    //console.log(mesmerStartTag);
    }
    /**
     *  Set title.
     */ $496eced55b7d3f1a$var$setTitle(xml);
    /**
     * Generate molecules table.
     */ $496eced55b7d3f1a$var$initMolecules(xml);
    $496eced55b7d3f1a$var$displayMoleculesTable();
    /**
     * Generate reactions table.
     */ $496eced55b7d3f1a$var$initReactions(xml);
    $496eced55b7d3f1a$var$displayReactionsTable();
    $496eced55b7d3f1a$var$displayReactionsDiagram();
    /**
     * Generate conditions table.
     */ $496eced55b7d3f1a$var$initConditions(xml);
    $496eced55b7d3f1a$var$displayConditions();
    /**
     * Generate parameters table.
     */ $496eced55b7d3f1a$var$initModelParameters(xml);
    $496eced55b7d3f1a$var$displayModelParameters();
    /**
     * Generate control table.
     */ $496eced55b7d3f1a$var$initControl(xml);
    $496eced55b7d3f1a$var$displayControl();
}
let $496eced55b7d3f1a$var$conditions;
/**
 * Parse xml to initialise conditions.
 * @param {XMLDocument} xml The XML document.
 */ function $496eced55b7d3f1a$var$initConditions(xml) {
    let me_conditions_s = "me:conditions";
    console.log(me_conditions_s);
    let xml_conditions = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml, me_conditions_s);
    // Set conditions_title.
    $496eced55b7d3f1a$var$conditions_title = document.getElementById("conditions_title");
    if ($496eced55b7d3f1a$var$conditions_title != null) $496eced55b7d3f1a$var$conditions_title.innerHTML = "Conditions";
    // BathGas
    let xml_bathGas = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml_conditions, "me:bathGas");
    let attributes = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_bathGas);
    let bathGas = new (0, $eb2684c350976919$export$b33a132661f4be58)(attributes, (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)($496eced55b7d3f1a$var$molecules, xml_bathGas.childNodes[0].nodeValue));
    // PTs
    let xml_PTs = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml_conditions, "me:PTs");
    let xml_PTPairs = xml_PTs.getElementsByTagName("me:PTpair");
    // Process each PTpair.
    let PTs = [];
    for(let i = 0; i < xml_PTPairs.length; i++)PTs.push(new (0, $eb2684c350976919$export$3fe97ecb6b172244)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_PTPairs[i])));
    $496eced55b7d3f1a$var$conditions = new (0, $eb2684c350976919$export$363c7374d425f4ad)(bathGas, PTs);
}
let $496eced55b7d3f1a$var$modelParameters;
/**
 * Parses xml to initialise modelParameters.
 * @param {XMLDocument} xml The XML document.
 */ function $496eced55b7d3f1a$var$initModelParameters(xml) {
    let me_modelParameters_s = "me:modelParameters";
    console.log(me_modelParameters_s);
    let xml_modelParameters = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml, me_modelParameters_s);
    // Set modelParameters_title.
    $496eced55b7d3f1a$var$modelParameters_title = document.getElementById("modelParameters_title");
    if ($496eced55b7d3f1a$var$modelParameters_title != null) $496eced55b7d3f1a$var$modelParameters_title.innerHTML = "Model Parameters";
    // GrainSize
    let xml_grainSize = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml_modelParameters, "me:grainSize");
    let attributes = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_grainSize);
    let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_grainSize)));
    let grainSize = new (0, $2d856c09e0501474$export$26e33f0df9ce919d)(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml_modelParameters, "me:energyAboveTheTopHill");
    let energyAboveTheTopHill = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_energyAboveTheTopHill)));
    $496eced55b7d3f1a$var$modelParameters = new (0, $2d856c09e0501474$export$77f098867dc64198)(grainSize, energyAboveTheTopHill);
}
let $496eced55b7d3f1a$var$control;
/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */ function $496eced55b7d3f1a$var$initControl(xml) {
    let me_control_s = "me:control";
    console.log(me_control_s);
    let xml_control = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml, me_control_s);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) control_title.innerHTML = "Control";
    // me:testDOS
    let xml_testDOS = xml_control.getElementsByTagName("me:testDOS");
    let testDOS;
    if (xml_testDOS.length > 0) testDOS = true;
    // me:printSpeciesProfile
    let xml_printSpeciesProfile = xml_control.getElementsByTagName("me:printSpeciesProfile");
    let printSpeciesProfile;
    if (xml_printSpeciesProfile.length > 0) printSpeciesProfile = true;
    // me:testMicroRates
    let xml_testMicroRates = xml_control.getElementsByTagName("me:testMicroRates");
    let testMicroRates;
    if (xml_testMicroRates.length > 0) testMicroRates = true;
    // me:testRateConstant
    let xml_testRateConstant = xml_control.getElementsByTagName("me:testRateConstant");
    let testRateConstant;
    if (xml_testRateConstant.length > 0) testRateConstant = true;
    // me:printGrainDOS
    let xml_printGrainDOS = xml_control.getElementsByTagName("me:printGrainDOS");
    let printGrainDOS;
    if (xml_printGrainDOS.length > 0) printGrainDOS = true;
    // me:printCellDOS
    let xml_printCellDOS = xml_control.getElementsByTagName("me:printCellDOS");
    let printCellDOS;
    if (xml_printCellDOS.length > 0) printCellDOS = true;
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName("me:printReactionOperatorColumnSums");
    let printReactionOperatorColumnSums;
    if (xml_printReactionOperatorColumnSums.length > 0) printReactionOperatorColumnSums = true;
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName("me:printTunnellingCoefficients");
    let printTunnellingCoefficients;
    if (xml_printTunnellingCoefficients.length > 0) printTunnellingCoefficients = true;
    // me:printGrainkfE
    let xml_printGrainkfE = xml_control.getElementsByTagName("me:printGrainkfE");
    let printGrainkfE;
    if (xml_printGrainkfE.length > 0) printGrainkfE = true;
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName("me:printGrainBoltzmann");
    let printGrainBoltzmann;
    if (xml_printGrainBoltzmann.length > 0) printGrainBoltzmann = true;
    // me:printGrainkbE
    let xml_printGrainkbE = xml_control.getElementsByTagName("me:printGrainkbE");
    let printGrainkbE;
    if (xml_printGrainkbE.length > 0) printGrainkbE = true;
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName("me:eigenvalues");
    let eigenvalues;
    if (xml_eigenvalues.length > 0) eigenvalues = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_eigenvalues[0])));
    // me:hideInactive
    let xml_hideInactive = xml_control.getElementsByTagName("me:hideInactive");
    let hideInactive;
    if (xml_hideInactive.length > 0) hideInactive = true;
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName("me:diagramEnergyOffset");
    let diagramEnergyOffset;
    if (xml_diagramEnergyOffset.length > 0) {
        let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new (0, $1fbd06547c155a38$export$159b5d3263f1049a)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_diagramEnergyOffset[0]), value);
    }
    $496eced55b7d3f1a$var$control = new (0, $1fbd06547c155a38$export$7a7fa4424cb20976)(testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
}
/**
 * Parses xml to initialise reactions.
 * @param {XMLDocument} xml The XML document.
 */ function $496eced55b7d3f1a$var$initReactions(xml) {
    let reactionList_s = "reactionList";
    console.log(reactionList_s);
    let xml_reactionList = (0, $3b8751d27ddf0746$export$b7531b8ff18dc588)(xml, reactionList_s);
    let xml_reactions = xml_reactionList.getElementsByTagName("reaction");
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    // Process each reaction.
    if (xml_reactions_length == 0) //return;
    throw new Error("No reactions: There should be at least 1!");
    // Set reactions_title.
    $496eced55b7d3f1a$var$reactions_title = document.getElementById("reactions_title");
    if ($496eced55b7d3f1a$var$reactions_title != null) $496eced55b7d3f1a$var$reactions_title.innerHTML = "Reactions";
    for(let i = 0; i < xml_reactions_length; i++){
        let attributes = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_reactions[i]);
        let reactionID = attributes.get("id");
        if (reactionID == null) throw new Error("reactionID is null");
        if (reactionID != null) {
            console.log("id=" + reactionID);
            // Load reactants.
            let reactants = new Map([]);
            let xml_reactants = xml_reactions[i].getElementsByTagName("reactant");
            //console.log("xml_reactants.length=" + xml_reactants.length);
            for(let j = 0; j < xml_reactants.length; j++){
                let xml_molecule = (0, $3b8751d27ddf0746$export$91e73a91db22e6a2)(xml_reactants[j], "molecule");
                let moleculeID = (0, $3b8751d27ddf0746$export$735ee1799fd02602)(xml_molecule, "ref");
                reactants.set(moleculeID, new (0, $12a3b21d146eb8ae$export$dcfd4302d04b7fb6)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_molecule), (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)($496eced55b7d3f1a$var$molecules, moleculeID)));
            }
            // Load products.
            let products = new Map([]);
            let xml_products = xml_reactions[i].getElementsByTagName("product");
            //console.log("xml_products.length=" + xml_products.length);
            for(let j = 0; j < xml_products.length; j++){
                let xml_molecule = (0, $3b8751d27ddf0746$export$91e73a91db22e6a2)(xml_products[j], "molecule");
                let moleculeID = (0, $3b8751d27ddf0746$export$735ee1799fd02602)(xml_molecule, "ref");
                products.set(moleculeID, new (0, $12a3b21d146eb8ae$export$264ad599d7cef668)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_molecule), (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)($496eced55b7d3f1a$var$molecules, moleculeID)));
            }
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let mCRCMethod;
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName("me:MCRCMethod");
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                let attributes = (0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_MCRCMethod[0]);
                let name = attributes.get("name");
                if (name == null) {
                    let type = attributes.get("xsi:type");
                    if (type != null) {
                        if (type === "me:MesmerILT") {
                            let preExponential;
                            let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName("me:preExponential");
                            if (xml_preExponential != null) {
                                if (xml_preExponential[0] != null) {
                                    let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_preExponential[0])));
                                    preExponential = new (0, $12a3b21d146eb8ae$export$38ce90ac8b004d85)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_preExponential[0]), value);
                                }
                            }
                            let activationEnergy;
                            let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName("me:activationEnergy");
                            if (xml_activationEnergy != null) {
                                if (xml_activationEnergy[0] != null) {
                                    let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_activationEnergy[0])));
                                    activationEnergy = new (0, $12a3b21d146eb8ae$export$1bdc69d2439d749d)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_activationEnergy[0]), value);
                                }
                            }
                            let tInfinity;
                            let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName("me:TInfinity");
                            if (xml_tInfinity != null) {
                                if (xml_tInfinity[0] != null) {
                                    let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_tInfinity[0])));
                                    tInfinity = new (0, $12a3b21d146eb8ae$export$d08982dd841d496f)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_tInfinity[0]), value);
                                }
                            }
                            let nInfinity;
                            let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName("me:nInfinity");
                            if (xml_nInfinity != null) {
                                if (xml_nInfinity[0] != null) {
                                    let value = parseFloat((0, $3b8751d27ddf0746$export$13cb40e9b656ab9e)((0, $3b8751d27ddf0746$export$4e07613bf412feb7)(xml_nInfinity[0])));
                                    nInfinity = new (0, $12a3b21d146eb8ae$export$d08982dd841d496f)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_nInfinity[0]), value);
                                }
                            }
                            mCRCMethod = new (0, $12a3b21d146eb8ae$export$191e95ebb11cc88)(attributes, preExponential, activationEnergy, tInfinity, nInfinity);
                        }
                    }
                } else mCRCMethod = new (0, $12a3b21d146eb8ae$export$6fa70ee10f356b6)(attributes, name);
            }
            // Load transition state.
            //console.log("Load  transition state...");
            let xml_transitionState = xml_reactions[i].getElementsByTagName("me:transitionState");
            let transitionState;
            if (xml_transitionState.length > 0) {
                let xml_molecule = xml_transitionState[0].getElementsByTagName("molecule")[0];
                let moleculeID = xml_molecule.getAttribute("ref");
                transitionState = new (0, $12a3b21d146eb8ae$export$145c1ed87b1a2216)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_molecule), (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)($496eced55b7d3f1a$var$molecules, moleculeID));
            //console.log("transitionState moleculeID=" + transitionState.molecule.getID());
            //console.log("transitionState role=" + transitionState.attributes.get("role"));
            }
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName("me:tunneling");
            let tunneling;
            if (xml_tunneling.length > 0) tunneling = new (0, $12a3b21d146eb8ae$export$c3cf6f96dac11421)((0, $3b8751d27ddf0746$export$fe94072fee8a6976)(xml_tunneling[0]));
            let reaction = new (0, $12a3b21d146eb8ae$export$d2ae4167a30cf6bb)(attributes, reactionID, reactants, products, mCRCMethod, transitionState, tunneling);
            $496eced55b7d3f1a$var$reactions.set(reactionID, reaction);
        //console.log("reaction=" + reaction);
        }
    }
}
/**
 * Create a diagram.
 * @param {Map<string, Molecule>} molecules The molecules.
 * @param {Map<string, Reaction>} reactions The reactions.
 * @param {boolean} dark True for dark mode.
 * @returns {HTMLCanvasElement} The diagram.
 * @param {string} font The font to use.
 * @param {number} lw The line width of reactants, transition states and products.
 * @param {string} lwc The line width color to use.
 */ function $496eced55b7d3f1a$var$drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc) {
    console.log("drawReactionDiagram");
    // TODO: Set styles depending on dark/light mode settings of users browser and not hard code.
    //let white = "white";
    let black = "black";
    let green = "green";
    let red = "red";
    let blue = "blue";
    //let yellow = "yellow";
    let orange = "orange";
    let background = "black";
    let foreground = "white";
    const ctx = canvas.getContext("2d");
    //ctx.fillStyle = background;
    // Get text height for font size.
    let th = (0, $0eec2e41a240a451$export$c398604a09be5382)(ctx, "Aj", font);
    //console.log("th=" + th);
    // Go through reactions:
    // 1. Create sets of reactants, end products, intermediate products and transition states.
    // 2. Create maps of orders and energies.
    // 3. Calculate maximum energy.
    let reactants = new Set();
    let products = new Set();
    let intProducts = new Set();
    let transitionStates = new Set();
    let orders = new Map();
    let energies = new Map();
    let i = 0;
    let energyMin = Number.MAX_VALUE;
    let energyMax = Number.MIN_VALUE;
    reactions.forEach(function(reaction, id) {
        // Get TransitionState if there is one.
        let transitionState = reaction.transitionState;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        reactants.add(reactantsLabel);
        if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
        let energy = reaction.getReactantsEnergy();
        energyMin = Math.min(energyMin, energy);
        energyMax = Math.max(energyMax, energy);
        energies.set(reactantsLabel, energy);
        let productsLabel = reaction.getProductsLabel();
        products.add(productsLabel);
        energy = reaction.getProductsEnergy();
        energyMin = Math.min(energyMin, energy);
        energyMax = Math.max(energyMax, energy);
        energies.set(productsLabel, energy);
        if (!orders.has(reactantsLabel)) {
            orders.set(reactantsLabel, i);
            i++;
        }
        if (orders.has(productsLabel)) {
            i--;
            let j = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(orders, productsLabel);
            // Move product to end and shift everything back.
            orders.forEach(function(value, key) {
                if (value > j) orders.set(key, value - 1);
            });
            // Insert transition state.
            if (transitionState != undefined) {
                let tsn = transitionState.getRef();
                transitionStates.add(tsn);
                orders.set(tsn, i);
                energy = transitionState.molecule.getEnergy();
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
                energies.set(tsn, energy);
                i++;
            }
            orders.set(productsLabel, i);
            i++;
        } else {
            if (transitionState != undefined) {
                let tsn = transitionState.getRef();
                transitionStates.add(tsn);
                orders.set(tsn, i);
                energy = transitionState.molecule.getEnergy();
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
                energies.set(tsn, energy);
                i++;
            }
            orders.set(productsLabel, i);
            i++;
        }
    });
    //console.log("orders=" + mapToString(orders));
    //console.log("energies=" + mapToString(energies));
    //console.log("energyMax=" + energyMax);
    //console.log("energyMin=" + energyMin);
    let energyRange = energyMax - energyMin;
    //console.log("energyRange=" + energyRange);
    //console.log("reactants=" + reactants);
    //console.log("products=" + products);
    //console.log("transitionStates=" + transitionStates);
    // Create a lookup from order to label.
    let reorders = [];
    orders.forEach(function(value, key) {
        reorders[value] = key;
    });
    //console.log("reorders=" + arrayToString(reorders));
    // Iterate through the reorders:
    // 1. Capture coordinates for connecting lines.
    // 2. Store maximum x.
    let x0 = 0;
    let y0;
    let x1;
    let y1;
    let xmax = 0;
    let tw;
    let textSpacing = 5; // Spacing between end of line and start of text.
    let stepSpacing = 10; // Spacing between steps.
    let reactantsInXY = new Map();
    let reactantsOutXY = new Map();
    let productsInXY = new Map();
    let productsOutXY = new Map();
    let transitionStatesInXY = new Map();
    let transitionStatesOutXY = new Map();
    reorders.forEach(function(value) {
        //console.log("value=" + value + ".");
        //console.log("energies=" + mapToString(energies));
        let energy = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $e83075ae9d5bc9c2$export$bd2782c820638828)(energyMin, energyRange, 0, canvas.height, energy);
        // Get text width.
        tw = Math.max((0, $0eec2e41a240a451$export$37827d046293d309)(ctx, energy.toString(), font), (0, $0eec2e41a240a451$export$37827d046293d309)(ctx, value, font));
        x1 = x0 + tw + textSpacing;
        y0 = energyRescaled + lw;
        y1 = y0;
        // Draw horizontal line and add label.
        // (The drawing is now not done here but done later so labels are on top of lines.)
        // The code is left here commented out for reference.
        //drawLevel(ctx, green, 4, x0, y0, x1, y1, th, value);
        reactantsInXY.set(value, [
            x0,
            y0
        ]);
        reactantsOutXY.set(value, [
            x1,
            y1
        ]);
        if (products.has(value)) {
            productsInXY.set(value, [
                x0,
                y0
            ]);
            productsOutXY.set(value, [
                x1,
                y1
            ]);
        }
        if (transitionStates.has(value)) {
            transitionStatesInXY.set(value, [
                x0,
                y0
            ]);
            transitionStatesOutXY.set(value, [
                x1,
                y1
            ]);
        }
        x0 = x1 + stepSpacing;
        xmax = x1;
    });
    // Set canvas width to maximum x.
    canvas.width = xmax;
    //console.log("canvas.width=" + canvas.width);
    // Set canvas height to maximum energy plus the label.
    let canvasHeightWithBorder = canvas.height + 4 * th + 2 * lw;
    //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
    let originalCanvasHeight = canvas.height;
    // Update the canvas height.
    canvas.height = canvasHeightWithBorder;
    // Set the transformation matrix.
    //ctx.transform(1, 0, 0, 1, 0, canvasHeightWithBorder);
    ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder);
    // Go through reactions and draw connecting lines.
    reactions.forEach(function(reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        // Get TransitionState if there is one.
        let transitionState = reaction.transitionState;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(productsInXY, productsLabel);
        if (transitionState != undefined) {
            let transitionStateLabel = transitionState.getRef();
            let transitionStateInXY = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(transitionStatesInXY, transitionStateLabel);
            (0, $0eec2e41a240a451$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
            let transitionStateOutXY = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(transitionStatesOutXY, transitionStateLabel);
            (0, $0eec2e41a240a451$export$819db45aec5fcbe5)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
        } else (0, $0eec2e41a240a451$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
    });
    // Draw horizontal lines and labels.
    // (This is done last so that the labels are on top of the vertical lines.)
    reactants.forEach(function(value) {
        let energy = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $e83075ae9d5bc9c2$export$bd2782c820638828)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(reactantsInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(reactantsOutXY, value)[0];
        let energyString = energy.toString();
        (0, $0eec2e41a240a451$export$479ac392a7fb4419)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
    });
    products.forEach(function(value) {
        let energy = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $e83075ae9d5bc9c2$export$bd2782c820638828)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(productsInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(productsOutXY, value)[0];
        let energyString = energy.toString();
        if (intProducts.has(value)) (0, $0eec2e41a240a451$export$479ac392a7fb4419)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
        else (0, $0eec2e41a240a451$export$479ac392a7fb4419)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
    });
    transitionStates.forEach(function(value) {
        let v;
        let energy = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $e83075ae9d5bc9c2$export$bd2782c820638828)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(transitionStatesInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, $e83075ae9d5bc9c2$export$3988ae62b71be9a3)(transitionStatesOutXY, value)[0];
        let energyString = energy.toString();
        (0, $0eec2e41a240a451$export$479ac392a7fb4419)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
    });
}
/**
 * Display molecules table.
 */ function $496eced55b7d3f1a$var$displayMoleculesTable() {
    if ($496eced55b7d3f1a$var$molecules.size == 0) return;
    // Prepare table headings.
    let moleculesTable = (0, $e9e1b51eab61e3b9$export$3359980f21752184)([
        "Name",
        "Energy<br>kJ/mol",
        "Rotation constants<br>cm<sup>-1</sup>",
        "Vibration frequencies<br>cm<sup>-1</sup>"
    ]);
    $496eced55b7d3f1a$var$molecules.forEach(function(molecule, id) {
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        let energyNumber = molecule.getEnergy();
        let energy;
        if (energyNumber == null) energy = "";
        else energy = energyNumber.toString();
        //console.log("energy=" + energy);
        let rotationConstants = "";
        let rotConsts = molecule.getRotationConstants();
        if (rotConsts != undefined) rotationConstants = (0, $f512479db9727ac6$export$4323cc4280d5be7)(rotConsts, " ");
        let vibrationFrequencies = "";
        let vibFreqs = molecule.getVibrationFrequencies();
        if (vibFreqs != undefined) vibrationFrequencies = (0, $f512479db9727ac6$export$4323cc4280d5be7)(vibFreqs, " ");
        moleculesTable += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(id) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)((0, $e9e1b51eab61e3b9$export$7c112ceec8941e67)("number", id + "_energy", "setEnergy(this)", energy)) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(rotationConstants, true) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(vibrationFrequencies, true));
    });
    $496eced55b7d3f1a$var$molecules_table = document.getElementById("molecules_table");
    if ($496eced55b7d3f1a$var$molecules_table !== null) $496eced55b7d3f1a$var$molecules_table.innerHTML = moleculesTable;
}
/**
 * Display reactions table.
 */ function $496eced55b7d3f1a$var$displayReactionsTable() {
    if ($496eced55b7d3f1a$var$reactions.size == 0) return;
    // Prepare table headings.
    let reactionsTable = (0, $e9e1b51eab61e3b9$export$3359980f21752184)([
        "ID",
        "Reactants",
        "Products",
        "Transition State",
        "PreExponential",
        "Activation Energy",
        "TInfinity",
        "NInfinity"
    ]);
    $496eced55b7d3f1a$var$reactions.forEach(function(reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        let reactants = (0, $f512479db9727ac6$export$4323cc4280d5be7)(Array.from(reaction.reactants.keys()), " ");
        let products = (0, $f512479db9727ac6$export$4323cc4280d5be7)(Array.from(reaction.products.keys()), " ");
        let transitionState = "";
        let preExponential = "";
        let activationEnergy = "";
        let tInfinity = "";
        let nInfinity = "";
        if (reaction.transitionState != undefined) {
            let name = reaction.transitionState.attributes.get("name");
            if (name != null) transitionState = name;
        }
        if (reaction.mCRCMethod != undefined) {
            if (reaction.mCRCMethod instanceof (0, $12a3b21d146eb8ae$export$191e95ebb11cc88)) {
                if (reaction.mCRCMethod.preExponential != null) preExponential = reaction.mCRCMethod.preExponential.value.toString() + " " + reaction.mCRCMethod.preExponential.attributes.get("units");
                if (reaction.mCRCMethod.activationEnergy != null) activationEnergy = reaction.mCRCMethod.activationEnergy.value.toString() + " " + reaction.mCRCMethod.activationEnergy.attributes.get("units");
                if (reaction.mCRCMethod.tInfinity != null) tInfinity = reaction.mCRCMethod.tInfinity.toString();
                if (reaction.mCRCMethod.nInfinity != null) nInfinity = reaction.mCRCMethod.nInfinity.value.toString();
            } else {
                if (reaction.mCRCMethod.attributes.get("name") == "RRKM") ;
                else throw new Error("Unexpected mCRCMethod: " + reaction.mCRCMethod);
            }
        }
        reactionsTable += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(id) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(reactants) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(products) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(transitionState) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(preExponential, true) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(activationEnergy, true) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(tInfinity, true) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(nInfinity, true));
        $496eced55b7d3f1a$var$reactions_table = document.getElementById("reactions_table");
        if ($496eced55b7d3f1a$var$reactions_table !== null) $496eced55b7d3f1a$var$reactions_table.innerHTML = reactionsTable;
    });
}
/**
 * Display reactions diagram.
 */ function $496eced55b7d3f1a$var$displayReactionsDiagram() {
    if ($496eced55b7d3f1a$var$reactions.size > 1) {
        // Set reactions_diagram_title.
        $496eced55b7d3f1a$var$reactions_diagram_title = document.getElementById("reactions_diagram_title");
        if ($496eced55b7d3f1a$var$reactions_diagram_title != null) $496eced55b7d3f1a$var$reactions_diagram_title.innerHTML = "Diagram";
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            $496eced55b7d3f1a$var$drawReactionDiagram(canvas, $496eced55b7d3f1a$var$molecules, $496eced55b7d3f1a$var$reactions, dark, font, lw, lwc);
        }
    }
}
/**
 * Display conditions.
 */ function $496eced55b7d3f1a$var$displayConditions() {
    let bathGas_element = document.getElementById("bathGas");
    if (bathGas_element != null) bathGas_element.innerHTML = "Bath Gas " + $496eced55b7d3f1a$var$conditions.bathGas.molecule.getID();
    let PTs_element = document.getElementById("PT_table");
    let table = (0, $e9e1b51eab61e3b9$export$3359980f21752184)([
        "P",
        "T"
    ]);
    if (PTs_element != null) {
        $496eced55b7d3f1a$var$conditions.pTs.forEach(function(pTpair) {
            table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(pTpair.P.toString()) + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(pTpair.T.toString()));
        });
        PTs_element.innerHTML = table;
    }
}
/**
 * Display modelParameters.
 */ function $496eced55b7d3f1a$var$displayModelParameters() {
    let modelParameters_element = document.getElementById("modelParameters_table");
    let table = (0, $e9e1b51eab61e3b9$export$3359980f21752184)([
        "Parameter",
        "Value"
    ]);
    table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("Grain Size") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)($496eced55b7d3f1a$var$modelParameters.grainSize.value.toString()));
    table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("Energy Above The Top Hill") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)($496eced55b7d3f1a$var$modelParameters.energyAboveTheTopHill.toString()));
    if (modelParameters_element != null) modelParameters_element.innerHTML = table;
}
/**
 * Display control.
 */ function $496eced55b7d3f1a$var$displayControl() {
    let control_table_element = document.getElementById("control_table");
    let table = (0, $e9e1b51eab61e3b9$export$3359980f21752184)([
        "Control",
        "Value"
    ]);
    if ($496eced55b7d3f1a$var$control.testDOS != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.testDOS") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printSpeciesProfile != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printSpeciesProfile") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.testMicroRates != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.testMicroRates") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.testRateConstant != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.testRateConstant") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printGrainDOS != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printGrainDOS") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printCellDOS != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printCellDOS") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printReactionOperatorColumnSums != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printReactionOperatorColumnSums") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printTunnellingCoefficients != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printTunnellingCoefficients") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printGrainkfE != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printGrainkfE") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printGrainBoltzmann != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printGrainBoltzmann") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.printGrainkbE != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.printGrainkbE") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.eigenvalues != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.eigenvalues") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)($496eced55b7d3f1a$var$control.eigenvalues.toString()));
    if ($496eced55b7d3f1a$var$control.hideInactive != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.hideInactive") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)(""));
    if ($496eced55b7d3f1a$var$control.diagramEnergyOffset != undefined) table += (0, $e9e1b51eab61e3b9$export$b5ad96d32b19f99)((0, $e9e1b51eab61e3b9$export$983f4376b55e6517)("me.diagramEnergyOffset") + (0, $e9e1b51eab61e3b9$export$983f4376b55e6517)($496eced55b7d3f1a$var$control.diagramEnergyOffset.value.toString()));
    if (control_table_element != null) control_table_element.innerHTML = table;
}
function $496eced55b7d3f1a$export$afc96e5ea6df45fd(input) {
    let id_energy = input.id;
    let moleculeID = id_energy.split("_")[0];
    let molecule = $496eced55b7d3f1a$var$molecules.get(moleculeID);
    if (molecule != undefined) {
        let inputValue = parseFloat(input.value);
        if (!isNaN(inputValue)) {
            molecule.setEnergy(inputValue);
            console.log("Energy of " + moleculeID + " set to " + inputValue);
        } else {
            alert("Energy input for " + moleculeID + " is not a number");
            let inputElement = document.getElementById(id_energy);
            inputElement.value = molecule.getEnergy().toString();
        }
    //console.log("molecule=" + molecule);
    }
}
window.setEnergy = $496eced55b7d3f1a$export$afc96e5ea6df45fd;
/**
 * Save to XML file.
 */ window.saveXML = function() {
    console.log("saveXML");
    const pad = "  ";
    let level;
    const padding2 = pad.repeat(2);
    // Create me.title.
    let title_xml = "\n" + pad + (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)($496eced55b7d3f1a$var$title, "me:title");
    // Create moleculeList.
    level = 2;
    let moleculeList = "";
    $496eced55b7d3f1a$var$molecules.forEach(function(molecule, id) {
        moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(moleculeList, "moleculeList", undefined, undefined, undefined, pad, true);
    // Create reactionList.
    level = 2;
    let reactionList = "";
    $496eced55b7d3f1a$var$reactions.forEach(function(reaction, id) {
        reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = (0, $3b8751d27ddf0746$export$dad497fe1f6e27c0)(reactionList, "reactionList", undefined, undefined, undefined, pad, true);
    // Create me.Conditions
    let xml_conditions = $496eced55b7d3f1a$var$conditions.toXML(pad, pad);
    // Create modelParameters
    let xml_modelParameters = $496eced55b7d3f1a$var$modelParameters.toXML(pad, pad);
    // create me.control
    let xml_control = $496eced55b7d3f1a$var$control.toXML(pad, pad);
    // Create a new Blob object from the data
    let blob = new Blob([
        $496eced55b7d3f1a$var$header,
        $496eced55b7d3f1a$var$mesmerStartTag,
        title_xml,
        moleculeList,
        reactionList,
        xml_conditions,
        xml_modelParameters,
        xml_control,
        $496eced55b7d3f1a$var$mesmerEndTag
    ], {
        type: "text/plain"
    });
    // Create a new object URL for the blob
    let url = URL.createObjectURL(blob);
    // Create a new 'a' element
    let a = document.createElement("a");
    // Set the href and download attributes for the 'a' element
    a.href = url;
    a.download = $496eced55b7d3f1a$var$input_xml_filename; // Replace with your desired filename
    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();
    // Remove the 'a' element after the download starts
    document.body.removeChild(a);
};


export {$496eced55b7d3f1a$export$afc96e5ea6df45fd as setEnergy};
//# sourceMappingURL=index.e933faa0.js.map
