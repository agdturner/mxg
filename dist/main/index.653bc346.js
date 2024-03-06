/**
 * Thow an error if the key is not in the map otherwise return the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */ function $134d19e749bf0414$export$3988ae62b71be9a3(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function $134d19e749bf0414$export$bd2782c820638828(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}
function $134d19e749bf0414$export$dc22ec7f8e0b9ac(map) {
    if (map == null) return "";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(", ");
}
function $134d19e749bf0414$export$4323cc4280d5be7(array, delimiter) {
    if (delimiter == undefined) delimiter = ", ";
    return array.map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function $134d19e749bf0414$export$736cc24a423eb64d(set, delimiter) {
    if (delimiter == undefined) delimiter = ", ";
    return Array.from(set).map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function $134d19e749bf0414$export$8cfbaad830aa9e0a(s) {
    let r = [];
    for(let i = 0; i < s.length; i++)r.push(parseFloat(s[i]));
    return r;
}
function $134d19e749bf0414$export$e90fb89750dba83f(s) {
    return !isNaN(parseFloat(s));
}


/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */ function $f0396edd0a5c99f7$export$3359980f21752184(headings) {
    var th = "";
    for(let i = 0; i < headings.length; i++)th += "<th>" + headings[i] + "</th>";
    return $f0396edd0a5c99f7$export$b5ad96d32b19f99(th);
}
function $f0396edd0a5c99f7$export$983f4376b55e6517(x, contentEditable = false) {
    let r = "<td";
    if (contentEditable) r += ' contenteditable="true"';
    r += ">" + x + "</td>";
    return r;
}
function $f0396edd0a5c99f7$export$b5ad96d32b19f99(x) {
    return "<tr>" + x + "</tr>\n";
}
function $f0396edd0a5c99f7$export$71b553ef914ccf29(x) {
    return "<table>" + x + "</table>";
}
function $f0396edd0a5c99f7$export$d0a97d36ec56002f(x, id, html_class) {
    let r = "<div";
    if (id !== null) r += ' id="' + id + '"';
    if (html_class !== null) r += ' class="' + html_class + '"';
    return r + ">" + x + "</div>";
}
function $f0396edd0a5c99f7$export$7c112ceec8941e67(type, id, func, value) {
    let r = '<input type="' + type + '"';
    if (id !== null) r += ' id="' + id + '"';
    if (func !== null) r += ' onchange="' + func + '"';
    if (value !== null) r += ' value="' + value + '"';
    return r + ">";
}
function $f0396edd0a5c99f7$export$ff083c49da8fe0f9(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}


function $cc8c7201a9bad777$export$735ee1799fd02602(xml, name) {
    let v = xml.getAttribute(name);
    if (!v) throw new Error(name + " attribute not found");
    return v;
}
function $cc8c7201a9bad777$export$91e73a91db22e6a2(element, tagName) {
    let el = element.getElementsByTagName(tagName)[0];
    if (el == null) throw new Error(tagName + " element not found");
    return el;
}
function $cc8c7201a9bad777$export$4e07613bf412feb7(element) {
    let cn = element.childNodes;
    if (cn == null) throw new Error("Element has no childNodes");
    return cn[0];
}
function $cc8c7201a9bad777$export$13cb40e9b656ab9e(node) {
    let nodeValue = node.nodeValue;
    if (nodeValue == null) throw new Error("nodeValue is null");
    return nodeValue;
}
class $cc8c7201a9bad777$export$3288d34c523a1192 {
    /**
     * @param {string} tagName The tag name.
     */ constructor(tagName){
        this.tagName = tagName;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param {string | undefined} padding The padding (optional).
     * @returns A self closing tag.
     */ toXML(padding) {
        let s = (0, $f0396edd0a5c99f7$export$ff083c49da8fe0f9)(null, this.tagName);
        if (padding) return "\n" + padding + s;
        return s;
    }
}
class $cc8c7201a9bad777$export$ca4ceee82ec565dc extends $cc8c7201a9bad777$export$3288d34c523a1192 {
    /**
     * @param attributes The attributes.
     */ constructor(attributes, tagName){
        super(tagName);
        this.attributes = attributes;
    }
    /**
     * @returns A string representation.
     */ toString() {
        let r = this.tagName + `(`;
        this.attributes.forEach((value, key)=>{
            r += `${key}(${value}), `;
        });
        return r;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * These are allowed and perhaps expected in MESMER XML format.
     * @param {string} padding The padding (Optional).
     * @returns An XML like representation.
     */ toXML(padding) {
        let s = "";
        if (padding != undefined) s += "\n" + padding;
        s += "<" + this.tagName;
        if (this.attributes) for (let [k, v] of this.attributes)s += " " + k + '="' + v.toString() + '"';
        return s + " />";
    }
}
class $cc8c7201a9bad777$export$8f67221c6fb2ad09 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$82583fad49645fc9 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.value.toString().trim(), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$38d8ebe2767f8865 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {number[]} values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, tagName, values, delimiter){
        super(attributes, tagName);
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
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.values.toString().replaceAll(",", this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$bd431b64ad3b0433 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     */ constructor(attributes, tagName){
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     */ addNode(node) {
        this.nodes.set(this.nodes.size, node);
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        this.nodes.forEach((v, k)=>{
            s += `, ${v.toString()}`;
        });
        return s + ")";
    }
    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1;
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = "";
        if (this.nodes.size > 0) {
            this.nodes.forEach((v)=>{
                if (v instanceof $cc8c7201a9bad777$export$bd431b64ad3b0433) s += v.toXML(pad, padding1);
                else if (v instanceof $cc8c7201a9bad777$export$ca4ceee82ec565dc) s += v.toXML(padding1);
                else s += v.toXML(padding1);
            });
            return $cc8c7201a9bad777$export$dad497fe1f6e27c0(s, this.tagName, this.attributes, padding, true);
        } else {
            let s = (0, $f0396edd0a5c99f7$export$ff083c49da8fe0f9)(this.attributes, this.tagName);
            if (padding != undefined) return "\n" + padding + s;
            return s;
        }
    }
}
function $cc8c7201a9bad777$export$2cd488e9ab180ce2(tagName, attributes, padding) {
    let s = "";
    if (padding != undefined) s += "\n" + padding;
    s += "<" + tagName;
    if (attributes) for (let [k, v] of attributes)s += " " + k + '="' + v.toString() + '"';
    return s + ">";
}
function $cc8c7201a9bad777$export$34b7e1ae786b72b0(tagName, padding, padValue) {
    let s = "";
    if (padValue) {
        if (padding != undefined) s += "\n" + padding;
    }
    return s + "</" + tagName + ">";
}
function $cc8c7201a9bad777$export$dad497fe1f6e27c0(content, tagName, attributes, padding, padValue) {
    let startTag = $cc8c7201a9bad777$export$2cd488e9ab180ce2(tagName, attributes, padding);
    let endTag = $cc8c7201a9bad777$export$34b7e1ae786b72b0(tagName, padding, padValue);
    return startTag + content + endTag;
}
function $cc8c7201a9bad777$export$fe94072fee8a6976(element) {
    let attributeNames = element.getAttributeNames();
    let attributes = new Map();
    attributeNames.forEach(function(attributeName) {
        let attributeValue = element.getAttribute(attributeName);
        if (attributeValue != null) attributes.set(attributeName, attributeValue);
    });
    return attributes;
}
function $cc8c7201a9bad777$export$b7531b8ff18dc588(xml, tagName) {
    let e = xml.getElementsByTagName(tagName);
    if (e.length != 1) throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    return e[0];
}
function $cc8c7201a9bad777$export$438fa7935f716bdf(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;");
}



class $ef5b9341e5193b70$export$80986e6afdd7e0cb extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "atom";
    }
    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName);
        let id = attributes.get("id");
        if (id == undefined) console.warn($ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName + " id attribute is undefined");
        let elementType = attributes.get("elementType");
        if (elementType == undefined) console.warn($ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName + " elementType attribute is undefined");
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
class $ef5b9341e5193b70$export$9cea715eceba39a0 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
    * The tag name.
    */ this.tagName = "atomArray";
    }
    /**
     * 
     * @param {Map<string, string>} attributes The attributes.
     * @param {Atom[]} atoms The atoms.
     */ constructor(attributes, atoms){
        super(attributes, $ef5b9341e5193b70$export$9cea715eceba39a0.tagName);
        atoms.forEach((atom)=>{
            this.nodes.set(this.nodes.size, atom);
        });
    }
}
class $ef5b9341e5193b70$export$153327fc99ac0c53 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bond";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$153327fc99ac0c53.tagName);
    }
}
class $ef5b9341e5193b70$export$746fba2e30d93fe6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bondArray";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Bond>} bonds A Map of bonds with keys as ids.
     */ constructor(attributes, bonds){
        super(attributes, $ef5b9341e5193b70$export$746fba2e30d93fe6.tagName);
        bonds.forEach((bond)=>{
            this.nodes.set(this.nodes.size, bond);
        });
    }
}
class $ef5b9341e5193b70$export$d29b345ea2be5072 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ef5b9341e5193b70$export$d29b345ea2be5072.tagName, value);
    }
}
class $ef5b9341e5193b70$export$9f93a3fdf2490572 extends (0, $cc8c7201a9bad777$export$38d8ebe2767f8865) {
    static{
        /**
     * The tag name.
     */ this.tagName = "array";
    }
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes, $ef5b9341e5193b70$export$9f93a3fdf2490572.tagName, values, delimiter);
    }
}
class $ef5b9341e5193b70$export$41b04b3a73e7216d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "property";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PropertyScalar | PropertyArray} property The property.
     */ constructor(attributes, property){
        super(attributes, $ef5b9341e5193b70$export$41b04b3a73e7216d.tagName);
        this.nodes.set(0, property);
    }
    /**
     * @returns The property.
     */ getProperty() {
        return this.nodes.get(0);
    }
}
class $ef5b9341e5193b70$export$4e0d1ad7ad6a0802 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "propertyList";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Property>} properties A Map of properties with keys as dictRefs.
     */ constructor(attributes, properties){
        super(attributes, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName);
        this.properties = properties;
        properties.forEach((property)=>{
            this.nodes.set(this.nodes.size, property);
        });
    }
}
class $ef5b9341e5193b70$export$16fc56ab40b12b45 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown";
    }
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, $ef5b9341e5193b70$export$16fc56ab40b12b45.tagName, value);
    }
}
class $ef5b9341e5193b70$export$499950da20810ac9 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyTransferModel";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown[]} deltaEDowns The DeltaEDowns.
     */ constructor(attributes, deltaEDowns){
        super(attributes, $ef5b9341e5193b70$export$499950da20810ac9.tagName);
        deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
}
class $ef5b9341e5193b70$export$bbdce6c921702068 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DOSCMethod";
    }
    constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$bbdce6c921702068.tagName);
    }
}
class $ef5b9341e5193b70$export$aef8e5ad5552fd72 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:bondRef";
    }
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */ constructor(attributes, bondRef){
        super(attributes, $ef5b9341e5193b70$export$aef8e5ad5552fd72.tagName, bondRef);
    }
}
class $ef5b9341e5193b70$export$86ca5149fcde8feb extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        this.tagName = "me:PotentialPoint";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$86ca5149fcde8feb.tagName);
    }
}
class $ef5b9341e5193b70$export$9b8e857b9a081d2 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        this.tagName = "me:HinderedRotorPotential";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PotentialPoint[]} potentialPoints The PotentialPoints.
     */ constructor(attributes, potentialPoints){
        super(attributes, $ef5b9341e5193b70$export$9b8e857b9a081d2.tagName);
        potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
    }
}
class $ef5b9341e5193b70$export$9513c16afdf7d852 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        this.tagName = "me:periodicity";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ef5b9341e5193b70$export$9513c16afdf7d852.tagName, value);
    }
}
class $ef5b9341e5193b70$export$ae98b7db6376163d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:ExtraDOSCMethod";
    }
    /**
     * @param attributes The attributes.
     * @param {BondRef | undefined} bondRef The bondRef.
     * @param {HinderedRotorPotential | undefined} hinderedRotorPotential The HinderedRotorPotential.
     * @param {Periodicity | undefined} periodicity The Periodicity.
     */ constructor(attributes, bondRef, hinderedRotorPotential, periodicity){
        super(attributes, $ef5b9341e5193b70$export$ae98b7db6376163d.tagName);
        if (bondRef) this.nodes.set(this.nodes.size, bondRef);
        if (hinderedRotorPotential) this.nodes.set(this.nodes.size, hinderedRotorPotential);
        if (periodicity) this.nodes.set(this.nodes.size, periodicity);
    }
}
class $ef5b9341e5193b70$export$97850fe2f2906f00 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:reservoirSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ef5b9341e5193b70$export$97850fe2f2906f00.tagName, value);
    }
}
class $ef5b9341e5193b70$export$3da9759ad07746a3 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    static{
        /**
     * The energy dictRef.
     */ this.energyDictRef = "me:ZPE";
    }
    static{
        /**
     * The rotation constants dictRef.
     */ this.rotConstsDictRef = "me:rotConsts";
    }
    static{
        /**
     * The vibration frequencies dictRef.
     */ this.vibFreqsDictRef = "me:vibFreqs";
    }
    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes may include "description" and "active" (and posibly others), but these do not exist for all molecules.
     * @param {Atom | AtomArray | undefined} atoms The atoms.
     * @param {Bond | undefined} bonds The bonds.
     * @param {PropertyList | Property | undefined} properties The properties.
     * @param {EnergyTransferModel | undefined} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | undefined} dOSCMethod The method for calculating density of states.
     * @param {ExtraDOSCMethod | undefined} extraDOSCMethod The extra method for calculating density of states.
     * @param {ReservoirSize | undefined} reservoirSize The reservoir size.
     */ constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize){
        super(attributes, $ef5b9341e5193b70$export$3da9759ad07746a3.tagName);
        /**
     * The index.
     */ this.index = new Map();
        let id = this.attributes.get("id");
        if (id == undefined) throw new Error("id is undefined");
        this.id = id;
        let i = 0;
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            if (atoms instanceof $ef5b9341e5193b70$export$80986e6afdd7e0cb) this.index.set($ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName, i);
            else this.index.set($ef5b9341e5193b70$export$9cea715eceba39a0.tagName, i);
            i++;
        }
        // Bonds
        if (bonds) {
            this.nodes.set(i, bonds);
            this.index.set($ef5b9341e5193b70$export$746fba2e30d93fe6.tagName, i);
            i++;
        }
        // Properties
        if (properties == undefined) throw new Error("properties is undefined");
        this.nodes.set(i, properties);
        this.index.set($ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName, i);
        i++;
        // EnergyTransferModel
        if (energyTransferModel) {
            this.nodes.set(i, energyTransferModel);
            this.index.set($ef5b9341e5193b70$export$499950da20810ac9.tagName, i);
            i++;
        }
        // DOSCMethod
        if (dOSCMethod) {
            this.nodes.set(i, dOSCMethod);
            this.index.set($ef5b9341e5193b70$export$bbdce6c921702068.tagName, i);
        }
        // ExtraDOSCMethod
        if (extraDOSCMethod) {
            this.nodes.set(i, extraDOSCMethod);
            this.index.set($ef5b9341e5193b70$export$ae98b7db6376163d.tagName, i);
        }
        // ReservoirSize
        if (reservoirSize) {
            this.nodes.set(i, reservoirSize);
            this.index.set($ef5b9341e5193b70$export$97850fe2f2906f00.tagName, i);
        }
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
     * @returns The properties of the molecule.
     */ getProperties() {
        let i = this.index.get($ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName);
        if (i == undefined) {
            i = this.index.get($ef5b9341e5193b70$export$41b04b3a73e7216d.tagName);
            if (i == undefined) return undefined;
            else return this.nodes.get(i);
        } else return this.nodes.get(i);
    }
    /**
     * Get a property scalar.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number | undefined} The scalar property.
     */ getPropertyScalar(dictRef) {
        let properties = this.getProperties();
        if (properties == undefined) return undefined;
        else if (properties instanceof $ef5b9341e5193b70$export$4e0d1ad7ad6a0802) {
            let property = properties.properties.get(dictRef);
            if (property == undefined) return undefined;
            return property.getProperty().value;
        } else {
            let scalar = properties.getProperty();
            if (scalar == undefined) return undefined;
            return scalar.value;
        }
    }
    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set or defined.
     */ getEnergy() {
        let energy = this.getPropertyScalar($ef5b9341e5193b70$export$3da9759ad07746a3.energyDictRef);
        if (energy == undefined) return 0;
        return energy;
    }
    /**
     * Set the scalar property.
     * @param {string} dictRef The dictRef of the property.
     * @param {number} value The value of the property.
     * @param {string} units The units of the property.
     */ setPropertyScalar(dictRef, value, units) {
        let properties = this.getProperties();
        if (properties == undefined) {
            this.nodes.set(this.nodes.size, this.createPropertyScalar(dictRef, value, units));
            this.index.set($ef5b9341e5193b70$export$41b04b3a73e7216d.tagName, this.nodes.size);
        } else if (properties instanceof $ef5b9341e5193b70$export$41b04b3a73e7216d) {
            if (properties.getProperty().attributes.get(dictRef)) properties.getProperty().value = value;
            else {
                let plmap = new Map();
                plmap.set(dictRef, properties);
                plmap.set(dictRef, this.createPropertyScalar(dictRef, value, units));
                properties = new $ef5b9341e5193b70$export$4e0d1ad7ad6a0802(new Map(), plmap);
            }
        } else {
            let scalarProperty = properties.properties.get(dictRef);
            if (scalarProperty == undefined) properties.properties.set(dictRef, this.createPropertyScalar(dictRef, value, units));
            else scalarProperty.getProperty().value = value;
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     * @param value The value of the property.
     * @param units The units of the property.
     * @returns A scalar property.
     */ createPropertyScalar(dictRef, value, units) {
        let propertyAttributes = new Map();
        propertyAttributes.set("dictRef", $ef5b9341e5193b70$export$3da9759ad07746a3.energyDictRef);
        let scalarAttributes = new Map();
        if (units) scalarAttributes.set("units", units);
        return new $ef5b9341e5193b70$export$41b04b3a73e7216d(propertyAttributes, new $ef5b9341e5193b70$export$d29b345ea2be5072(scalarAttributes, value));
    }
    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */ setEnergy(energy) {
        this.setPropertyScalar($ef5b9341e5193b70$export$3da9759ad07746a3.energyDictRef, energy);
    }
    /**
     * Get a property array.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number[] | undefined} The array property.
     */ getPropertyArray(dictRef) {
        let properties = this.getProperties();
        if (properties == undefined) return undefined;
        else if (properties instanceof $ef5b9341e5193b70$export$4e0d1ad7ad6a0802) {
            let property = properties.properties.get(dictRef);
            if (property == undefined) return undefined;
            return property.getProperty().values;
        } else {
            if (properties.getProperty().tagName == dictRef) {
                let rotConsts = properties.getProperty();
                if (rotConsts == undefined) return undefined;
                return rotConsts.values;
            } else return undefined;
        }
    }
    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */ getRotConsts() {
        return this.getPropertyArray($ef5b9341e5193b70$export$3da9759ad07746a3.rotConstsDictRef);
    }
    /**
     * Get the vibration frequencies of the molecule.
     * @returns The vibration frequencies of the molecule.
     */ getVibFreqs() {
        return this.getPropertyArray($ef5b9341e5193b70$export$3da9759ad07746a3.vibFreqsDictRef);
    }
}
class $ef5b9341e5193b70$export$954a71e3ba0cc2 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, tagName, molecule, molecules){
        super(attributes, tagName);
        this.nodes.set(0, molecule);
        this.molecules = molecules;
    }
    /**
     * A convenience method to get the molecule abbreviation.
     * @returns The molecule abbreviation.
     */ getMoleculeAbb() {
        return this.nodes.get(0);
    }
    /**
     * A convenience method to get the ref (the molecule ID) of the molecule.
     * @returns The ref of the molecule.
     */ getRef() {
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
     */ getMolecule() {
        let ref = this.getRef();
        let molecule = this.molecules.get(ref);
        if (molecule == null) throw new Error(`Molecule with ref ${ref} not found in molecules`);
        return molecule;
    }
}




class $6f7aa7a716962086$export$dcfd4302d04b7fb6 extends (0, $ef5b9341e5193b70$export$954a71e3ba0cc2) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactant";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, molecule, molecules){
        super(attributes, $6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName, molecule, molecules);
    }
}
class $6f7aa7a716962086$export$264ad599d7cef668 extends (0, $ef5b9341e5193b70$export$954a71e3ba0cc2) {
    static{
        /**
     * The tag name.
     */ this.tagName = "product";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, molecule, molecules){
        super(attributes, $6f7aa7a716962086$export$264ad599d7cef668.tagName, molecule, molecules);
    }
}
class $6f7aa7a716962086$export$145c1ed87b1a2216 extends (0, $ef5b9341e5193b70$export$954a71e3ba0cc2) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:transitionState";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, molecule, molecules){
        super(attributes, $6f7aa7a716962086$export$145c1ed87b1a2216.tagName, molecule, molecules);
    }
}
class $6f7aa7a716962086$export$38ce90ac8b004d85 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:preExponential";
    }
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $6f7aa7a716962086$export$38ce90ac8b004d85.tagName, value);
    }
}
class $6f7aa7a716962086$export$1bdc69d2439d749d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:activationEnergy";
    }
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $6f7aa7a716962086$export$1bdc69d2439d749d.tagName, value);
    }
}
class $6f7aa7a716962086$export$8d95dd32819bc86c extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:TInfinity";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $6f7aa7a716962086$export$8d95dd32819bc86c.tagName, value);
    }
}
class $6f7aa7a716962086$export$d08982dd841d496f extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:nInfinity";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $6f7aa7a716962086$export$d08982dd841d496f.tagName, value);
    }
}
class $6f7aa7a716962086$export$c3cf6f96dac11421 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:tunneling";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, $6f7aa7a716962086$export$c3cf6f96dac11421.tagName);
    }
}
class $6f7aa7a716962086$export$6fa70ee10f356b6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MCRCMethod";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, $6f7aa7a716962086$export$6fa70ee10f356b6.tagName);
    }
}
class $6f7aa7a716962086$export$191e95ebb11cc88 extends $6f7aa7a716962086$export$6fa70ee10f356b6 {
    static{
        /**
     * The xsiType.
     */ this.xsiType = "me:MesmerILT";
    }
    static{
        /**
     * The tag name.
     */ this.xsiType2 = "MesmerILT";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */ constructor(attributes, preExponential, activationEnergy, tInfinity, nInfinity){
        super(attributes);
        this.index = new Map();
        if (preExponential != undefined) {
            this.index.set($6f7aa7a716962086$export$38ce90ac8b004d85.tagName, this.index.size);
            this.addNode(preExponential);
        }
        if (activationEnergy != undefined) {
            this.index.set($6f7aa7a716962086$export$1bdc69d2439d749d.tagName, this.index.size);
            this.addNode(activationEnergy);
        }
        if (tInfinity != undefined) {
            this.index.set($6f7aa7a716962086$export$8d95dd32819bc86c.tagName, this.index.size);
            this.addNode(tInfinity);
        }
        if (nInfinity != undefined) {
            this.index.set($6f7aa7a716962086$export$d08982dd841d496f.tagName, this.index.size);
            this.addNode(nInfinity);
        }
    }
    /**
     * @returns The pre-exponential factor or undefined if it does not exist.
     */ getPreExponential() {
        let i = this.index.get($6f7aa7a716962086$export$38ce90ac8b004d85.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The activation energy or undefined if it does not exist.
     */ getActivationEnergy() {
        let i = this.index.get($6f7aa7a716962086$export$1bdc69d2439d749d.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The TInfinity or undefined if it does not exist.
     */ getTInfinity() {
        let i = this.index.get($6f7aa7a716962086$export$8d95dd32819bc86c.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The NInfinity or undefined if it does not exist.
     */ getNInfinity() {
        let i = this.index.get($6f7aa7a716962086$export$d08982dd841d496f.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
}
class $6f7aa7a716962086$export$1dd2ea318727eda extends $6f7aa7a716962086$export$6fa70ee10f356b6 {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} harmonicReactantDiabat_FC The harmonic reactant diabatic FC.
     * @param {number} harmonicReactantDiabat_XO The harmonic reactant diabatic XO.
     * @param {number} harmonicProductDiabat_DE The harmonic product diabatic DE.
     * @param {number} exponentialProductDiabat_A The exponential product diabatic A.
     * @param {number} exponentialProductDiabat_B The exponential product diabatic B.
     * @param {number} exponentialProductDiabat_DE The exponential product diabatic DE.
     */ constructor(attributes, harmonicReactantDiabat_FC, harmonicReactantDiabat_XO, harmonicProductDiabat_DE, exponentialProductDiabat_A, exponentialProductDiabat_B, exponentialProductDiabat_DE){
        super(attributes);
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
}
class $6f7aa7a716962086$export$284227145ed02b04 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $6f7aa7a716962086$export$284227145ed02b04.tagName, value);
    }
}
class $6f7aa7a716962086$export$d2ae4167a30cf6bb extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reaction";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant> | Reactant | undefined} reactants The reactants in the reaction.
     * @param {Map<string, Product> | Product | undefined} products The products of the reaction.
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     * @param {Map<string, TransitionState> | TransitionState | undefined} transitionStates The transition states (optional).
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {ExcessReactantConc | undefined} excessReactantConc The excess reactant concentration (optional).
     */ constructor(attributes, id, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc){
        super(attributes, $6f7aa7a716962086$export$d2ae4167a30cf6bb.tagName);
        this.index = new Map();
        this.reactants = reactants;
        //console.log("Construct reaction:");
        if (reactants instanceof Map) //console.log("Map of reactants");
        reactants.forEach((reactant)=>{
            this.addToIndex($6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName, reactant);
            this.addNode(reactant);
        //console.log("Added reactant " + reactant);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        });
        else //console.log("Individual reactant");
        if (reactants != undefined) {
            //this.addToIndex(Reactant.tagName, reactants);
            this.index.set($6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName, this.nodes.size);
            this.addNode(reactants);
        //console.log("Added reactant " + reactants);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        }
        this.products = products;
        if (products instanceof Map) //console.log("Map of products");
        products.forEach((product)=>{
            this.addToIndex($6f7aa7a716962086$export$264ad599d7cef668.tagName, product);
            this.addNode(product);
        //console.log("Added product " + product);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        });
        else if (products != undefined) {
            //console.log("Individual product");
            //this.addToIndex(Product.tagName, products);
            this.index.set($6f7aa7a716962086$export$264ad599d7cef668.tagName, this.nodes.size);
            this.addNode(products);
        //console.log("Added product " + products);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        }
        if (tunneling) {
            this.index.set($6f7aa7a716962086$export$c3cf6f96dac11421.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        this.transitionStates = transitionStates;
        if (transitionStates instanceof Map) //console.log("Map of transition states");
        transitionStates.forEach((transitionState)=>{
            this.addToIndex($6f7aa7a716962086$export$145c1ed87b1a2216.tagName, transitionState);
            this.addNode(transitionState);
        //console.log("Added transition state " + transitionState);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        });
        else if (transitionStates != undefined) {
            //console.log("Individual transition state");
            //this.addToIndex(TransitionState.tagName, transitionStates);
            this.index.set($6f7aa7a716962086$export$145c1ed87b1a2216.tagName, this.nodes.size);
            this.addNode(transitionStates);
        //console.log("Added transition state " + transitionStates);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        }
        if (mCRCMethod != undefined) {
            this.index.set($6f7aa7a716962086$export$6fa70ee10f356b6.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc) {
            this.index.set($6f7aa7a716962086$export$284227145ed02b04.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
    }
    /**
     * Add a node to the index.
     * @returns 0 or 1 depeding on if the index has a new entry.
     */ addToIndex(tagName, moleculeRef) {
        let value0 = this.index.get(tagName);
        if (value0 == undefined) this.index.set(tagName, this.nodes.size);
        else if (value0 instanceof Map) value0.set(moleculeRef.getRef(), this.nodes.size);
        else {
            let map = new Map();
            map.set(this.nodes.get(value0).getRef(), value0);
            map.set(moleculeRef.getRef(), this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The id of the reaction.
     */ getID() {
        return this.attributes.get("id");
    }
    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */ getMCRCMethod() {
        let i = this.index.get($6f7aa7a716962086$export$6fa70ee10f356b6.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The tunneling node or undefined if it does not exist.
     */ getTunneling() {
        let i = this.index.get($6f7aa7a716962086$export$c3cf6f96dac11421.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */ getExcessReactantConc() {
        let i = this.index.get($6f7aa7a716962086$export$284227145ed02b04.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        if (this.reactants == undefined) return undefined;
        else if (this.reactants instanceof Map) return Array.from(this.reactants.keys()).join(" + ");
        else return this.reactants.getRef();
    }
    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */ getReactantsEnergy() {
        if (this.reactants instanceof Map) return Array.from(this.reactants.values()).map((reactant)=>reactant.getMolecule().getEnergy()).reduce((a, b)=>a + b, 0);
        return 0;
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        if (this.products == undefined) return undefined;
        else if (this.products instanceof Map) return Array.from(this.products.keys()).join(" + ");
        else return this.products.getRef();
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy() {
        if (this.products instanceof Map) return Array.from(this.products.values()).map((product)=>product.getMolecule().getEnergy()).reduce((a, b)=>a + b, 0);
        return 0;
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
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
 */ function $e5f7ab5c40db3f0e$export$479ac392a7fb4419(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + (x1 - x0) / 2;
    $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, energyString, font, strokeStyle, $e5f7ab5c40db3f0e$var$getTextStartX(ctx, energyString, font, x_centre), y1 + th);
    $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, label, font, strokeStyle, $e5f7ab5c40db3f0e$var$getTextStartX(ctx, label, font, x_centre), y1 + 3 * th);
    $e5f7ab5c40db3f0e$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x0, y0, x1, y1);
}
/**
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} text The text to get the start x-coordinate of.
 * @param {string} font The font to use.  
 * @param {number} x_centre The x-coordinate of the centre of the text.
 * @returns The x-coordinate of the start of the text.
 */ function $e5f7ab5c40db3f0e$var$getTextStartX(ctx, text, font, x_centre) {
    let tw = $e5f7ab5c40db3f0e$export$37827d046293d309(ctx, text, font);
    return x_centre - tw / 2;
}
function $e5f7ab5c40db3f0e$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokewidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, text, font, colour, x, y) {
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
function $e5f7ab5c40db3f0e$export$c398604a09be5382(ctx, text, font) {
    ctx.font = font;
    var fontMetric = ctx.measureText(text);
    return fontMetric.actualBoundingBoxAscent + fontMetric.actualBoundingBoxDescent;
}
function $e5f7ab5c40db3f0e$export$37827d046293d309(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
}



class $ae74a7b44a6504a1$export$b33a132661f4be58 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:bathGas";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} moleculeID The moleculeID.
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, moleculeID, molecules){
        super(attributes, $ae74a7b44a6504a1$export$b33a132661f4be58.tagName, moleculeID);
        this.molecules = molecules;
    }
    getMolecule() {
        return this.molecules.get(this.value);
    }
}
class $ae74a7b44a6504a1$export$ea088383ce76fc5a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentRate";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value. 
     */ constructor(attributes, value){
        super(attributes, $ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, value);
    }
}
class $ae74a7b44a6504a1$export$3fe97ecb6b172244 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {BathGas | undefined} bathGas The bath gas.
     * @param {ExperimentRate | undefined} experimentRate The experiment rate.
     */ constructor(attributes, bathGas, experimentRate){
        super(attributes, $ae74a7b44a6504a1$export$3fe97ecb6b172244.tagName);
        this.index = new Map();
        if (bathGas) {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate) {
            this.index.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        let p = this.attributes.get("P");
        if (p) return parseFloat(p);
        else throw new Error("P is undefined");
    }
    /**
     * Set The Pressure
     */ setP(p) {
        this.attributes.set("P", p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        let t = this.attributes.get("T");
        if (t) return parseFloat(t);
        else throw new Error("T is undefined");
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        this.attributes.set("T", t.toString());
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @returns The experiment rate.
     */ getExperimentRate() {
        let i = this.index.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
}
class $ae74a7b44a6504a1$export$3be0efe793283834 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTs";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PTpair[]} pTpairs The PT pairs.
     */ constructor(attributes, pTpairs){
        super(attributes, $ae74a7b44a6504a1$export$3be0efe793283834.tagName);
        pTpairs.forEach((pTpair)=>{
            this.addNode(pTpair);
        });
        this.pTpairs = pTpairs;
    }
}
class $ae74a7b44a6504a1$export$363c7374d425f4ad extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:conditions";
    }
    /**
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */ constructor(attributes, bathGas, pTs){
        super(attributes, $ae74a7b44a6504a1$export$363c7374d425f4ad.tagName);
        this.addNode(bathGas);
        this.addNode(pTs);
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        return this.nodes.get(0);
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */ getPTs() {
        return this.nodes.get(1);
    }
}



class $8883b31bd809eb64$export$26e33f0df9ce919d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:grainSize";
    }
    /**
     * @param {string} value The value.
     */ constructor(attributes, value){
        super(attributes, $8883b31bd809eb64$export$26e33f0df9ce919d.tagName, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}
class $8883b31bd809eb64$export$aa73446724166cdb extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyAboveTheTopHill";
    }
    /**
     * @param {string} value The value.
     */ constructor(attributes, value){
        super(attributes, $8883b31bd809eb64$export$aa73446724166cdb.tagName, value);
    }
}
class $8883b31bd809eb64$export$77f098867dc64198 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:modelParameters";
    }
    constructor(grainSize, energyAboveTheTopHill){
        super(new Map(), $8883b31bd809eb64$export$77f098867dc64198.tagName);
        this.addNode(grainSize);
        this.addNode(energyAboveTheTopHill);
    }
    /**
     * @returns The grain size.
     */ getGrainSize() {
        return this.nodes.get(0);
    }
    /**
     * @returns The energy above the top hill.
     */ getEnergyAboveTheTopHill() {
        return this.nodes.get(1);
    }
}



class $b6873406fb778c0b$export$a3d7e677521f681f extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testDOS";
    }
    constructor(){
        super($b6873406fb778c0b$export$a3d7e677521f681f.tagName);
    }
}
class $b6873406fb778c0b$export$ed9b9e07e51c2ac1 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printSpeciesProfile";
    }
    constructor(){
        super($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName);
    }
}
class $b6873406fb778c0b$export$1f37c7c73e401f31 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testMicroRates";
    }
    constructor(){
        super($b6873406fb778c0b$export$1f37c7c73e401f31.tagName);
    }
}
class $b6873406fb778c0b$export$980e5abe9a459423 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testRateConstant";
    }
    constructor(){
        super($b6873406fb778c0b$export$980e5abe9a459423.tagName);
    }
}
class $b6873406fb778c0b$export$d23243bda4dfae2b extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainDOS";
    }
    constructor(){
        super($b6873406fb778c0b$export$d23243bda4dfae2b.tagName);
    }
}
class $b6873406fb778c0b$export$60b233651e162b60 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printCellDOS";
    }
    constructor(){
        super($b6873406fb778c0b$export$60b233651e162b60.tagName);
    }
}
class $b6873406fb778c0b$export$a915db169f144f37 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printReactionOperatorColumnSums";
    }
    constructor(){
        super($b6873406fb778c0b$export$a915db169f144f37.tagName);
    }
}
class $b6873406fb778c0b$export$8a58e03b7b3f0f47 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printTunnellingCoefficients";
    }
    constructor(){
        super($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName);
    }
}
class $b6873406fb778c0b$export$f8d814a406a0ff5b extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainkfE";
    }
    constructor(){
        super($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName);
    }
}
class $b6873406fb778c0b$export$e7fff349901f700d extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainBoltzmann";
    }
    constructor(){
        super($b6873406fb778c0b$export$e7fff349901f700d.tagName);
    }
}
class $b6873406fb778c0b$export$55888ef4e813a34d extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainkbE";
    }
    constructor(){
        super($b6873406fb778c0b$export$55888ef4e813a34d.tagName);
    }
}
class $b6873406fb778c0b$export$2453e311f702d9c7 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:eigenvalues";
    }
    constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$2453e311f702d9c7.tagName, value);
    }
}
class $b6873406fb778c0b$export$9d51752a8549e2d6 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:hideInactive";
    }
    constructor(){
        super($b6873406fb778c0b$export$9d51752a8549e2d6.tagName);
    }
}
class $b6873406fb778c0b$export$159b5d3263f1049a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:diagramEnergyOffset";
    }
    constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$159b5d3263f1049a.tagName, value);
    }
}
class $b6873406fb778c0b$export$7a7fa4424cb20976 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:control";
    }
    /**
     * @param attributes The attributes.
     * @param testDOS The testDOS.
     * @param printSpeciesProfile The printSpeciesProfile.
     * @param testMicroRates The testMicroRates.
     * @param testRateConstant T
     * @param printGrainDOS The printGrainDOS.
     * @param printCellDOS The printCellDOS.
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     * @param printGrainkfE The printGrainkfE.
     * @param printGrainBoltzmann The printGrainBoltzmann.
     * @param printGrainkbE The printGrainkbE.
     * @param eigenvalues The eigenvalues.
     * @param hideInactive The hideInactive.
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */ constructor(attributes, testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset){
        super(attributes, $b6873406fb778c0b$export$7a7fa4424cb20976.tagName);
        this.index = new Map();
        if (testDOS != undefined) {
            this.addNode(testDOS);
            this.index.set($b6873406fb778c0b$export$a3d7e677521f681f.tagName, this.index.size);
        }
        if (printSpeciesProfile != undefined) {
            this.addNode(printSpeciesProfile);
            this.index.set($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName, this.index.size);
        }
        if (testMicroRates != undefined) {
            this.addNode(testMicroRates);
            this.index.set($b6873406fb778c0b$export$1f37c7c73e401f31.tagName, this.index.size);
        }
        if (testRateConstant != undefined) {
            this.addNode(testRateConstant);
            this.index.set($b6873406fb778c0b$export$980e5abe9a459423.tagName, this.index.size);
        }
        if (printGrainDOS != undefined) {
            this.addNode(printGrainDOS);
            this.index.set($b6873406fb778c0b$export$d23243bda4dfae2b.tagName, this.index.size);
        }
        if (printCellDOS != undefined) {
            this.addNode(printCellDOS);
            this.index.set($b6873406fb778c0b$export$60b233651e162b60.tagName, this.index.size);
        }
        if (printReactionOperatorColumnSums != undefined) {
            this.addNode(printReactionOperatorColumnSums);
            this.index.set($b6873406fb778c0b$export$a915db169f144f37.tagName, this.index.size);
        }
        if (printTunnellingCoefficients != undefined) {
            this.addNode(printTunnellingCoefficients);
            this.index.set($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName, this.index.size);
        }
        if (printGrainkfE != undefined) {
            this.addNode(printGrainkfE);
            this.index.set($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName, this.index.size);
        }
        if (printGrainBoltzmann != undefined) {
            this.addNode(printGrainBoltzmann);
            this.index.set($b6873406fb778c0b$export$e7fff349901f700d.tagName, this.index.size);
        }
        if (printGrainkbE != undefined) {
            this.addNode(printGrainkbE);
            this.index.set($b6873406fb778c0b$export$55888ef4e813a34d.tagName, this.index.size);
        }
        if (eigenvalues != undefined) {
            this.addNode(eigenvalues);
            this.index.set($b6873406fb778c0b$export$2453e311f702d9c7.tagName, this.index.size);
        }
        if (hideInactive != undefined) {
            this.addNode(hideInactive);
            this.index.set($b6873406fb778c0b$export$9d51752a8549e2d6.tagName, this.index.size);
        }
        if (diagramEnergyOffset != undefined) {
            this.addNode(diagramEnergyOffset);
            this.index.set($b6873406fb778c0b$export$159b5d3263f1049a.tagName, this.index.size);
        }
    }
    getTestDOS() {
        const index = this.index.get($b6873406fb778c0b$export$a3d7e677521f681f.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintSpeciesProfile() {
        const index = this.index.get($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getTestMicroRates() {
        const index = this.index.get($b6873406fb778c0b$export$1f37c7c73e401f31.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getTestRateConstant() {
        const index = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainDOS() {
        const index = this.index.get($b6873406fb778c0b$export$d23243bda4dfae2b.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintCellDOS() {
        const index = this.index.get($b6873406fb778c0b$export$60b233651e162b60.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintReactionOperatorColumnSums() {
        const index = this.index.get($b6873406fb778c0b$export$a915db169f144f37.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintTunnellingCoefficients() {
        const index = this.index.get($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainkfE() {
        const index = this.index.get($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainBoltzmann() {
        const index = this.index.get($b6873406fb778c0b$export$e7fff349901f700d.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainkbE() {
        const index = this.index.get($b6873406fb778c0b$export$55888ef4e813a34d.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getEigenvalues() {
        const index = this.index.get($b6873406fb778c0b$export$2453e311f702d9c7.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getHideInactive() {
        const index = this.index.get($b6873406fb778c0b$export$9d51752a8549e2d6.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getDiagramEnergyOffset() {
        const index = this.index.get($b6873406fb778c0b$export$159b5d3263f1049a.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
}


// Expected XML tags strings.
let $7e68913db756e51f$var$me_title_s = "me:title";
/**
 * For storing me.title.
 */ let $7e68913db756e51f$var$title;
/**
 * For storing the XML root start tag.
 */ let $7e68913db756e51f$var$mesmerStartTag;
/**
 * For storing the XML root end tag.
 */ let $7e68913db756e51f$var$mesmerEndTag;
/**
 * A map of molecules with Molecule.id as key and Molecules as values.
 */ let $7e68913db756e51f$var$molecules = new Map();
/**
 * For storing the maximum molecule energy in a reaction.
 */ let $7e68913db756e51f$var$maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */ let $7e68913db756e51f$var$minMoleculeEnergy = Infinity;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let $7e68913db756e51f$var$reactions = new Map();
/**
 * The header of the XML file.
 */ const $7e68913db756e51f$var$header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
/**
 * The filename of the mesmer input file loaded.
 */ let $7e68913db756e51f$var$input_xml_filename;
/**
 * The load button.
 */ let $7e68913db756e51f$var$loadButton;
/**
 * The save button.
 */ let $7e68913db756e51f$var$saveButton;
/**
 * The XML text element.
 */ let $7e68913db756e51f$var$me_title;
let $7e68913db756e51f$var$molecules_title;
let $7e68913db756e51f$var$molecules_table;
let $7e68913db756e51f$var$reactions_title;
let $7e68913db756e51f$var$reactions_table;
let $7e68913db756e51f$var$reactions_diagram_title;
let $7e68913db756e51f$var$conditions_title;
let $7e68913db756e51f$var$conditions_table;
let $7e68913db756e51f$var$modelParameters_title;
let $7e68913db756e51f$var$modelParameters_table;
let $7e68913db756e51f$var$xml_title;
let $7e68913db756e51f$var$xml_text;
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function $7e68913db756e51f$var$displayXML(xml) {
    //console.log("xml=" + xml);
    if ($7e68913db756e51f$var$xml_title != null) $7e68913db756e51f$var$xml_title.innerHTML = $7e68913db756e51f$var$input_xml_filename;
    if ($7e68913db756e51f$var$xml_text != null) $7e68913db756e51f$var$xml_text.innerHTML = (0, $cc8c7201a9bad777$export$438fa7935f716bdf)(xml);
}
/**
 * Parses xml to initilise molecules.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$initMolecules(xml) {
    let moleculeList_s = "moleculeList";
    console.log("Read and store " + moleculeList_s);
    let xml_moleculeList = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, moleculeList_s);
    // Set molecules_title.
    $7e68913db756e51f$var$molecules_title = document.getElementById("molecules_title");
    if ($7e68913db756e51f$var$molecules_title != null) $7e68913db756e51f$var$molecules_title.innerHTML = "Molecules";
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
    if (!moleculeListTagNames.has((0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName)) throw new Error('Expecting tags with "' + (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName + '" tagName but there are none!');
    let xml_molecules = xml_moleculeList.getElementsByTagName((0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    // Process each molecule.
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf like this.
    for(let i = 0; i < xml_molecules.length; i++){
        // Set attributes.
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecules[i]);
        let moleculeTagNames = new Set();
        let cns = xml_molecules[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for(let j = 0; j < cns.length; j++){
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!moleculeTagNames.has(cn.nodeName)) moleculeTagNames.add(cn.nodeName);
            else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
            if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
        //console.log(cn.nodeName);
        }
        //});
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));
        // Init atomsNode.
        let atomsNode;
        // There can be an individual atom not in an atom array, or an attom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName);
        if (xml_atomArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName + " but finding " + xml_atomArrays.length + "!");
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms = xml_atomArray.getElementsByTagName((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName);
            if (xml_atoms.length < 2) throw new Error("Expecting 2 or more atoms in " + (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName + ", but finding " + xml_atoms.length + "!");
            let atoms = [];
            for(let j = 0; j < xml_atoms.length; j++)atoms.push(new (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_atoms[j])));
            atomsNode = new (0, $ef5b9341e5193b70$export$9cea715eceba39a0)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_atomArray), atoms);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName);
        } else {
            let xml_atoms = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName);
            if (xml_atoms.length == 1) atomsNode = new (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_atoms[0]));
            else if (xml_atoms.length > 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName + " but finding " + xml_atoms.length + ". Should these be in an " + (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName + "?");
        }
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName);
        // Init bondsNode.
        let bondsNode;
        // There can be an individual bond not in a bond array, or a bond array.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName);
        if (xml_bondArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName + " but finding " + xml_bondArrays.length + "!");
        if (xml_bondArrays.length == 1) {
            let xml_bondArray = xml_bondArrays[0];
            let xml_bonds = xml_bondArray.getElementsByTagName((0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName);
            // There may be only 1 bond in a BondArray.
            let bonds = [];
            for(let j = 0; j < xml_bonds.length; j++)bonds.push(new (0, $ef5b9341e5193b70$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bonds[j])));
            bondsNode = new (0, $ef5b9341e5193b70$export$746fba2e30d93fe6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bondArray), bonds);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName);
        } else {
            let xml_bonds = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName);
            if (xml_bonds.length == 1) bondsNode = new (0, $ef5b9341e5193b70$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bonds[0]));
            else if (xml_bonds.length > 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName + " but finding " + xml_bonds.length + ". Should these be in a " + (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName + "?");
        }
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName);
        // Init propertiesNode.
        let propertiesNode;
        // There can be an individual property not in a propertyList.
        let xml_PLs = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        if (xml_PLs.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + " but finding " + xml_PLs.length + "!");
        if (xml_PLs.length == 1) {
            let xml_PL = xml_PLs[0];
            let xml_Ps = xml_PL.getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            if (xml_Ps.length < 2) throw new Error("Expecting 2 or more " + (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName + " in " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + ", but finding " + xml_Ps.length + "!");
            let properties = new Map();
            for(let j = 0; j < xml_Ps.length; j++){
                let property = $7e68913db756e51f$var$getProperty(xml_Ps[j]);
                let dictRef = property.attributes.get("dictRef");
                properties.set(dictRef, property);
            }
            propertiesNode = new (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PL), properties);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        } else {
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            if (xml_Ps.length > 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "?");
            propertiesNode = $7e68913db756e51f$var$getProperty(xml_Ps[0]);
        }
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
        let els;
        // Read energyTransferModel
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$499950da20810ac9).tagName);
        let energyTransferModel = undefined;
        els = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$499950da20810ac9).tagName);
        if (els != null) {
            if (els.length > 0) {
                if (els.length != 1) throw new Error("energyTransferModel length=" + els.length);
                let xml_deltaEDown = els[0].getElementsByTagName((0, $ef5b9341e5193b70$export$16fc56ab40b12b45).tagName);
                if (xml_deltaEDown != null) {
                    let deltaEDowns = [];
                    for(let k = 0; k < xml_deltaEDown.length; k++){
                        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_deltaEDown[k])));
                        let deltaEDown = new (0, $ef5b9341e5193b70$export$16fc56ab40b12b45)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_deltaEDown[k]), value);
                        deltaEDowns.push(deltaEDown);
                    }
                    energyTransferModel = new (0, $ef5b9341e5193b70$export$499950da20810ac9)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(els[0]), deltaEDowns);
                }
            }
        }
        // Read DOSCMethod
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName);
        let dOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName);
        if (els != null) {
            let el = els[0];
            if (el != null) dOSCMethod = new (0, $ef5b9341e5193b70$export$bbdce6c921702068)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(el));
        }
        // Read ExtraDOSCMethod.
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        let extraDOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        if (els.length > 0) {
            if (els.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + els.length);
            // Read bondRef.
            let bondRefs = els[0].getElementsByTagName((0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName);
            let bondRef;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                bondRef = new (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(bondRefs[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(bondRefs[0])));
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials = els[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName);
            let hinderedRotorPotential;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                // Load PotentialPoints.
                let potentialPoints = [];
                let xml_potentialPoints = hinderedRotorPotentials[0].getElementsByTagName((0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName);
                for(let k = 0; k < xml_potentialPoints.length; k++)potentialPoints.push(new (0, $ef5b9341e5193b70$export$86ca5149fcde8feb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_potentialPoints[k])));
                hinderedRotorPotential = new (0, $ef5b9341e5193b70$export$9b8e857b9a081d2)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(hinderedRotorPotentials[0]), potentialPoints);
            }
            // Read periodicities.
            let xml_periodicities = els[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9513c16afdf7d852).tagName);
            let periodicity;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                periodicity = new (0, $ef5b9341e5193b70$export$9513c16afdf7d852)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_periodicities[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_periodicities[0]))));
            }
            extraDOSCMethod = new (0, $ef5b9341e5193b70$export$ae98b7db6376163d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(els[0]), bondRef, hinderedRotorPotential, periodicity);
        }
        // Read reservoirSize.
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
        let reservoirSize;
        els = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
        if (els.length > 0) {
            if (els.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + els.length);
            reservoirSize = new (0, $ef5b9341e5193b70$export$97850fe2f2906f00)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(els[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(els[0]))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        let molecule = new (0, $ef5b9341e5193b70$export$3da9759ad07746a3)(attributes, atomsNode, bondsNode, propertiesNode, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize);
        //console.log(molecule.toString());
        $7e68913db756e51f$var$molecules.set(molecule.id, molecule);
    }
}
function $7e68913db756e51f$var$addEventListenersToMoleculesTable() {
    // Add event listeners to molecules table.
    $7e68913db756e51f$var$molecules.forEach(function(molecule, id) {
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
            if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(inputValue)) {
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
function $7e68913db756e51f$var$getProperty(xml_property) {
    let attribs = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_property);
    let children = xml_property.children;
    if (children.length != 1) throw new Error("Expecting 1 child but finding " + children.length);
    let nodeAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(children[0]);
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
    if (nodeName == (0, $ef5b9341e5193b70$export$d29b345ea2be5072).tagName) {
        let value = parseFloat(textContent);
        return new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)(attribs, new (0, $ef5b9341e5193b70$export$d29b345ea2be5072)(nodeAttributes, value));
    } else if (nodeName == (0, $ef5b9341e5193b70$export$9f93a3fdf2490572).tagName) return new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)(attribs, new (0, $ef5b9341e5193b70$export$9f93a3fdf2490572)(nodeAttributes, (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(textContent.split(/\s+/)), " "));
    else if (nodeName == "matrix") throw new Error("Unexpected nodeName: " + nodeName);
    else throw new Error("Unexpected nodeName: " + nodeName);
}
let $7e68913db756e51f$var$inputElement;
//function reload() {
function $7e68913db756e51f$var$loadXML() {
    $7e68913db756e51f$var$inputElement = document.createElement("input");
    $7e68913db756e51f$var$inputElement.type = "file";
    $7e68913db756e51f$var$inputElement.onchange = function() {
        if ($7e68913db756e51f$var$inputElement.files) {
            for(let i = 0; i < $7e68913db756e51f$var$inputElement.files.length; i++)console.log("inputElement.files[" + i + "]=" + $7e68913db756e51f$var$inputElement.files[i]);
            let file = $7e68913db756e51f$var$inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            $7e68913db756e51f$var$input_xml_filename = file.name;
            if ($7e68913db756e51f$var$xml_text != null) {
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
                            $7e68913db756e51f$var$displayXML(contents);
                            let parser = new DOMParser();
                            let xml = parser.parseFromString(contents, "text/xml");
                            $7e68913db756e51f$var$parse(xml);
                        /*
                            // Sending to the server for validation is no longer implemented as there is currently no server.
                            // Send XML to the server
                            fetch('http://localhost:1234/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'text/xml',
                                },
                                body: contents,
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    return response.text();
                                })
                                .then(data => {
                                    console.log('Server response:', data);
                                })
                                .catch(error => {
                                    console.error('There was a problem with the fetch operation:', error);
                                });
                            */ }
                    }
                };
                // Read the first chunk
                let blob = file.slice(start, start + chunkSize);
                reader.readAsText(blob);
                start += chunkSize;
            }
        }
    };
    $7e68913db756e51f$var$inputElement.click();
    // Add event listener to load button.
    $7e68913db756e51f$var$loadButton = document.getElementById("load_button");
    if ($7e68913db756e51f$var$loadButton != null) //loadButton.addEventListener('click', reload);
    $7e68913db756e51f$var$loadButton.addEventListener("click", $7e68913db756e51f$var$loadXML);
    // Ensure save button is displayed.
    $7e68913db756e51f$var$saveButton = document.getElementById("saveButton");
    if ($7e68913db756e51f$var$saveButton != null) $7e68913db756e51f$var$saveButton.style.display = "inline";
}
/**
 * Once the DOM is loaded, set up the elements.
 */ document.addEventListener("DOMContentLoaded", (event)=>{
    // Initialise elements
    $7e68913db756e51f$var$xml_title = document.getElementById("xml_title");
    $7e68913db756e51f$var$xml_text = document.getElementById("xml_text");
    window.loadXML = function() {
        $7e68913db756e51f$var$loadXML();
    //reload();
    };
});
/**
 * Set the title.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$setTitle(xml) {
    $7e68913db756e51f$var$me_title = xml.getElementsByTagName($7e68913db756e51f$var$me_title_s);
    if ($7e68913db756e51f$var$me_title == null) throw new Error($7e68913db756e51f$var$me_title_s + " not found");
    else {
        if ($7e68913db756e51f$var$me_title.length != 1) throw new Error("Multiple " + $7e68913db756e51f$var$me_title_s + " elements found");
        else {
            $7e68913db756e51f$var$title = $7e68913db756e51f$var$me_title[0].childNodes[0].nodeValue;
            $7e68913db756e51f$var$title = $7e68913db756e51f$var$title.trim();
            console.log("Title=" + $7e68913db756e51f$var$title);
            let e = document.getElementById("title");
            if (e != null) e.innerHTML = $7e68913db756e51f$var$title;
        }
    }
}
/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */ function $7e68913db756e51f$var$parse(xml) {
    /**
     * Set mesmer_xml start tag.
     */ $7e68913db756e51f$var$mesmerStartTag = "\n";
    let documentElement = xml.documentElement;
    if (documentElement == null) throw new Error("Document element not found");
    else {
        let tagName = documentElement.tagName;
        $7e68913db756e51f$var$mesmerStartTag += "<" + tagName;
        console.log(tagName);
        $7e68913db756e51f$var$mesmerEndTag = (0, $cc8c7201a9bad777$export$34b7e1ae786b72b0)(tagName, "", true);
        let first = true;
        let pad = " ".repeat(tagName.length + 2);
        let names = documentElement.getAttributeNames();
        names.forEach(function(name) {
            let attribute = documentElement.getAttribute(name);
            let na = `${name}="${attribute}"`;
            if (first) {
                first = false;
                $7e68913db756e51f$var$mesmerStartTag += " " + na;
            } else $7e68913db756e51f$var$mesmerStartTag += "\n" + pad + na;
        });
        $7e68913db756e51f$var$mesmerStartTag += ">";
    //console.log(mesmerStartTag);
    }
    /**
     *  Set title.
     */ $7e68913db756e51f$var$setTitle(xml);
    /**
     * Generate molecules table.
     */ $7e68913db756e51f$var$initMolecules(xml);
    $7e68913db756e51f$var$addEventListenersToMoleculesTable();
    $7e68913db756e51f$var$displayMoleculesTable();
    /**
     * Generate reactions table.
     */ $7e68913db756e51f$var$initReactions(xml);
    $7e68913db756e51f$var$displayReactionsTable();
    $7e68913db756e51f$var$displayReactionsDiagram();
    /**
     * Generate conditions table.
     */ $7e68913db756e51f$var$initConditions(xml);
    $7e68913db756e51f$var$displayConditions();
    /**
     * Generate parameters table.
     */ $7e68913db756e51f$var$initModelParameters(xml);
    $7e68913db756e51f$var$displayModelParameters();
    /**
     * Generate control table.
     */ $7e68913db756e51f$var$initControl(xml);
    $7e68913db756e51f$var$displayControl();
}
let $7e68913db756e51f$var$conditions;
/**
 * Parse xml to initialise conditions.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$initConditions(xml) {
    console.log((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    let xml_conditions = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    // Set conditions_title.
    $7e68913db756e51f$var$conditions_title = document.getElementById("conditions_title");
    if ($7e68913db756e51f$var$conditions_title != null) $7e68913db756e51f$var$conditions_title.innerHTML = "Conditions";
    // BathGas
    let xml_bathGas = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_conditions, (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
    let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGas);
    let moleculeID = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGas));
    let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(attributes, moleculeID, $7e68913db756e51f$var$molecules);
    // PTs
    let xml_PTs = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml_conditions, "me:PTs");
    let xml_PTPairs = xml_PTs.getElementsByTagName((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName);
    // Process each PTpair.
    let pTs = [];
    for(let i = 0; i < xml_PTPairs.length; i++){
        // Add optional BathGas
        let xml_bathGass = xml_PTPairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
        let pTBathGas;
        if (xml_bathGass.length > 0) {
            if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
            pTBathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGass[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGass[0])), $7e68913db756e51f$var$molecules);
            console.log("pTBathGas" + pTBathGas.toString());
        }
        // Add optional ExperimentRate
        let xml_experimentRates = xml_PTPairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName);
        let experimentRate;
        if (xml_experimentRates.length > 0) {
            if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
            experimentRate = new (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_experimentRates[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_experimentRates[0]))));
            console.log("experimentRate" + experimentRate.toString());
        }
        pTs.push(new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTPairs[i]), pTBathGas, experimentRate));
    //console.log(pTs[i].toString()); // For debugging.
    }
    $7e68913db756e51f$var$conditions = new (0, $ae74a7b44a6504a1$export$363c7374d425f4ad)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_conditions), bathGas, new (0, $ae74a7b44a6504a1$export$3be0efe793283834)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTs), pTs));
}
let $7e68913db756e51f$var$modelParameters;
/**
 * Parses xml to initialise modelParameters.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$initModelParameters(xml) {
    console.log((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    let xml_modelParameters = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    // Set modelParameters_title.
    $7e68913db756e51f$var$modelParameters_title = document.getElementById("modelParameters_title");
    if ($7e68913db756e51f$var$modelParameters_title != null) $7e68913db756e51f$var$modelParameters_title.innerHTML = "Model Parameters";
    // GrainSize
    let xml_grainSize = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml_modelParameters, (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName);
    let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_grainSize);
    let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_grainSize)));
    let grainSize = new (0, $8883b31bd809eb64$export$26e33f0df9ce919d)(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml_modelParameters, (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName);
    let energyAboveTheTopHill = new (0, $8883b31bd809eb64$export$aa73446724166cdb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_energyAboveTheTopHill), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_energyAboveTheTopHill))));
    $7e68913db756e51f$var$modelParameters = new (0, $8883b31bd809eb64$export$77f098867dc64198)(grainSize, energyAboveTheTopHill);
}
let $7e68913db756e51f$var$control;
/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$initControl(xml) {
    console.log((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    let xml_control = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) control_title.innerHTML = "Control";
    // me:testDOS
    let xml_testDOS = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName);
    let testDOS;
    if (xml_testDOS.length == 1) testDOS = new (0, $b6873406fb778c0b$export$a3d7e677521f681f)();
    else if (xml_testDOS.length > 1) console.warn("testDOS.length=" + xml_testDOS.length);
    // me:printSpeciesProfile
    let xml_printSpeciesProfile = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName);
    let printSpeciesProfile;
    if (xml_printSpeciesProfile.length == 1) printSpeciesProfile = new (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1)();
    else if (xml_printSpeciesProfile.length > 1) console.warn("printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
    // me:testMicroRates
    let xml_testMicroRates = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName);
    let testMicroRates;
    if (xml_testMicroRates.length == 1) testMicroRates = new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)();
    else if (xml_testMicroRates.length > 1) console.warn("testMicroRates.length=" + xml_testMicroRates.length);
    // me:testRateConstant
    let xml_testRateConstant = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$980e5abe9a459423).tagName);
    let testRateConstant;
    if (xml_testRateConstant.length == 1) testRateConstant = new (0, $b6873406fb778c0b$export$980e5abe9a459423)();
    else if (xml_testRateConstant.length > 1) console.warn("testRateConstant.length=" + xml_testRateConstant.length);
    // me:printGrainDOS
    let xml_printGrainDOS = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName);
    let printGrainDOS;
    if (xml_printGrainDOS.length == 1) printGrainDOS = new (0, $b6873406fb778c0b$export$d23243bda4dfae2b)();
    else if (xml_printGrainDOS.length > 1) console.warn("printGrainDOS.length=" + xml_printGrainDOS.length);
    // me:printCellDOS
    let xml_printCellDOS = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$60b233651e162b60).tagName);
    let printCellDOS;
    if (xml_printCellDOS.length == 1) printCellDOS = new (0, $b6873406fb778c0b$export$60b233651e162b60)();
    else if (xml_printCellDOS.length > 1) console.warn("printCellDOS.length=" + xml_printCellDOS.length);
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$a915db169f144f37).tagName);
    let printReactionOperatorColumnSums;
    if (xml_printReactionOperatorColumnSums.length == 1) printReactionOperatorColumnSums = new (0, $b6873406fb778c0b$export$a915db169f144f37)();
    else if (xml_printReactionOperatorColumnSums.length > 1) console.warn("printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$8a58e03b7b3f0f47).tagName);
    let printTunnellingCoefficients;
    if (xml_printTunnellingCoefficients.length == 1) printTunnellingCoefficients = new (0, $b6873406fb778c0b$export$8a58e03b7b3f0f47)();
    else if (xml_printTunnellingCoefficients.length > 1) console.warn("printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
    // me:printGrainkfE
    let xml_printGrainkfE = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName);
    let printGrainkfE;
    if (xml_printGrainkfE.length == 1) printGrainkfE = new (0, $b6873406fb778c0b$export$f8d814a406a0ff5b)();
    else if (xml_printGrainkfE.length > 1) console.warn("printGrainkfE.length=" + xml_printGrainkfE.length);
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$e7fff349901f700d).tagName);
    let printGrainBoltzmann;
    if (xml_printGrainBoltzmann.length == 1) printGrainBoltzmann = new (0, $b6873406fb778c0b$export$e7fff349901f700d)();
    else if (xml_printGrainBoltzmann.length > 1) console.warn("printGrainBoltzmann.length=" + xml_printGrainBoltzmann.length);
    // me:printGrainkbE
    let xml_printGrainkbE = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName);
    let printGrainkbE;
    if (xml_printGrainkbE.length == 1) printGrainkbE = new (0, $b6873406fb778c0b$export$55888ef4e813a34d)();
    else if (xml_printGrainkbE.length > 1) console.warn("printGrainkbE.length=" + xml_printGrainkbE.length);
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName);
    let eigenvalues;
    if (xml_eigenvalues.length == 1) eigenvalues = new (0, $b6873406fb778c0b$export$2453e311f702d9c7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_eigenvalues[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_eigenvalues[0]))));
    else console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    // me:hideInactive
    let xml_hideInactive = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$9d51752a8549e2d6).tagName);
    let hideInactive;
    if (xml_hideInactive.length == 1) hideInactive = new (0, $b6873406fb778c0b$export$9d51752a8549e2d6)();
    else console.warn("hideInactive.length=" + xml_hideInactive.length);
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName);
    let diagramEnergyOffset;
    if (xml_diagramEnergyOffset.length == 1) {
        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new (0, $b6873406fb778c0b$export$159b5d3263f1049a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_diagramEnergyOffset[0]), value);
    } else console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    $7e68913db756e51f$var$control = new (0, $b6873406fb778c0b$export$7a7fa4424cb20976)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_control), testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
}
/**
 * Parses xml to initialise reactions.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$initReactions(xml) {
    let reactionList_s = "reactionList";
    console.log(reactionList_s);
    let xml_reactionList = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, reactionList_s);
    let xml_reactions = xml_reactionList.getElementsByTagName((0, $6f7aa7a716962086$export$d2ae4167a30cf6bb).tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    // Process each reaction.
    if (xml_reactions_length == 0) //return;
    throw new Error("No reactions: There should be at least 1!");
    // Set reactions_title.
    $7e68913db756e51f$var$reactions_title = document.getElementById("reactions_title");
    if ($7e68913db756e51f$var$reactions_title != null) $7e68913db756e51f$var$reactions_title.innerHTML = "Reactions";
    for(let i = 0; i < xml_reactions_length; i++){
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactions[i]);
        let reactionID = attributes.get("id");
        if (reactionID == null) throw new Error("reactionID is null");
        if (reactionID != null) {
            console.log("id=" + reactionID);
            // Load reactants.
            let reactants;
            let xml_reactants = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            if (xml_reactants.length > 0) {
                if (xml_reactants.length < 2) {
                    let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_reactants[0], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                    let twa = new (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule), (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                    reactants = new (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactants[0]), twa, $7e68913db756e51f$var$molecules);
                } else {
                    reactants = new Map();
                    for(let j = 0; j < xml_reactants.length; j++){
                        let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_reactants[j], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                        let twa = new (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule), (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                        let reactant = new (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactants[j]), twa, $7e68913db756e51f$var$molecules);
                        reactants.set(reactant.getRef(), reactant);
                    }
                }
            }
            // Load products.
            let products;
            let xml_products = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$264ad599d7cef668).tagName);
            //console.log("xml_products.length=" + xml_products.length);
            if (xml_products.length > 0) {
                if (xml_products.length < 2) {
                    let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_products[0], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                    let twa = new (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule), (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                    products = new (0, $6f7aa7a716962086$export$264ad599d7cef668)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_products[0]), twa, $7e68913db756e51f$var$molecules);
                } else {
                    products = new Map();
                    for(let j = 0; j < xml_products.length; j++){
                        let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_products[j], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                        let twa = new (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule), (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                        let product = new (0, $6f7aa7a716962086$export$264ad599d7cef668)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_products[j]), twa, $7e68913db756e51f$var$molecules);
                        products.set(product.getRef(), product);
                    }
                }
            }
            // Load transition states.
            //console.log("Load  transition states...");
            let xml_transitionState = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$145c1ed87b1a2216).tagName);
            let transitionStates;
            if (xml_transitionState.length > 0) {
                if (xml_transitionState.length < 2) {
                    let xml_molecule = xml_transitionState[0].getElementsByTagName((0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName)[0];
                    let twa = new (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule), (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                    transitionStates = new (0, $6f7aa7a716962086$export$145c1ed87b1a2216)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_transitionState[0]), twa, $7e68913db756e51f$var$molecules);
                } else {
                    transitionStates = new Map();
                    for(let j = 0; j < xml_transitionState.length; j++){
                        let xml_molecule = xml_transitionState[j].getElementsByTagName((0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName)[0];
                        let twa = new (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule), (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                        let transitionState = new (0, $6f7aa7a716962086$export$145c1ed87b1a2216)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_transitionState[j]), twa, $7e68913db756e51f$var$molecules);
                        transitionStates.set(transitionState.getRef(), transitionState);
                    }
                }
            }
            //console.log("transitionStates=" + transitionStates);
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName);
            let tunneling;
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName + " but finding " + xml_tunneling.length + "!");
                tunneling = new (0, $6f7aa7a716962086$export$c3cf6f96dac11421)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tunneling[0]));
            }
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let mCRCMethod;
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName + " but finding " + xml_MCRCMethod.length + "!");
                else {
                    let mCRCMethodAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_MCRCMethod[0]);
                    let name = mCRCMethodAttributes.get("name");
                    //console.log(MCRCMethod.tagName + " name=" + name);
                    if (name == undefined || name == (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType2) {
                        let type = mCRCMethodAttributes.get("xsi:type");
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        if (type != undefined) {
                            if (type == (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType || type == (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType2) {
                                let preExponential;
                                let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName);
                                if (xml_preExponential != null) {
                                    if (xml_preExponential[0] != null) {
                                        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_preExponential[0])));
                                        preExponential = new (0, $6f7aa7a716962086$export$38ce90ac8b004d85)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_preExponential[0]), value);
                                    }
                                }
                                //console.log("preExponential " + preExponential);
                                let activationEnergy;
                                let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName);
                                if (xml_activationEnergy != null) {
                                    if (xml_activationEnergy[0] != null) {
                                        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_activationEnergy[0])));
                                        activationEnergy = new (0, $6f7aa7a716962086$export$1bdc69d2439d749d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_activationEnergy[0]), value);
                                    }
                                }
                                //console.log("activationEnergy " + activationEnergy);
                                let tInfinity;
                                let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName);
                                if (xml_tInfinity != null) {
                                    if (xml_tInfinity[0] != null) {
                                        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_tInfinity[0])));
                                        tInfinity = new (0, $6f7aa7a716962086$export$d08982dd841d496f)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tInfinity[0]), value);
                                    }
                                }
                                //console.log("tInfinity " + tInfinity);
                                let nInfinity;
                                let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$d08982dd841d496f).tagName);
                                if (xml_nInfinity != null) {
                                    if (xml_nInfinity[0] != null) {
                                        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_nInfinity[0])));
                                        nInfinity = new (0, $6f7aa7a716962086$export$d08982dd841d496f)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_nInfinity[0]), value);
                                    }
                                }
                                //console.log("nInfinity " + nInfinity);
                                mCRCMethod = new (0, $6f7aa7a716962086$export$191e95ebb11cc88)(mCRCMethodAttributes, preExponential, activationEnergy, tInfinity, nInfinity);
                            }
                        }
                    } else mCRCMethod = new (0, $6f7aa7a716962086$export$6fa70ee10f356b6)(mCRCMethodAttributes);
                }
            }
            // Load excessReactantConc
            let xml_excessReactantConc = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$284227145ed02b04).tagName);
            let excessReactantConc;
            if (xml_excessReactantConc.length > 0) {
                if (xml_excessReactantConc.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$284227145ed02b04).tagName + " but finding " + xml_excessReactantConc.length + "!");
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_excessReactantConc[0])));
                excessReactantConc = new (0, $6f7aa7a716962086$export$284227145ed02b04)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_excessReactantConc[0]), value);
            }
            // Create reaction.
            let reaction = new (0, $6f7aa7a716962086$export$d2ae4167a30cf6bb)(attributes, reactionID, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc);
            $7e68913db756e51f$var$reactions.set(reactionID, reaction);
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
 */ function $7e68913db756e51f$var$drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc) {
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
    let th = (0, $e5f7ab5c40db3f0e$export$c398604a09be5382)(ctx, "Aj", font);
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
        // Get TransitionStates.
        let reactionTransitionStates = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.add(reactantsLabel);
            if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
            let energy = reaction.getReactantsEnergy();
            energyMin = Math.min(energyMin, energy);
            energyMax = Math.max(energyMax, energy);
            energies.set(reactantsLabel, energy);
            if (!orders.has(reactantsLabel)) {
                orders.set(reactantsLabel, i);
                i++;
            }
        }
        let productsLabel = reaction.getProductsLabel();
        if (productsLabel != undefined) {
            products.add(productsLabel);
            let energy = reaction.getProductsEnergy();
            energyMin = Math.min(energyMin, energy);
            energyMax = Math.max(energyMax, energy);
            energies.set(productsLabel, energy);
            if (orders.has(productsLabel)) {
                i--;
                let j = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(orders, productsLabel);
                // Move product to end and shift everything back.
                orders.forEach(function(value, key) {
                    if (value > j) orders.set(key, value - 1);
                });
                // Insert transition states.
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) reactionTransitionStates.forEach(function(ts, id) {
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    });
                    else {
                        let ts = reactionTransitionStates;
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    }
                    orders.set(productsLabel, i);
                    i++;
                }
            } else {
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) reactionTransitionStates.forEach(function(ts, id) {
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    });
                    else {
                        let ts = reactionTransitionStates;
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    }
                }
                orders.set(productsLabel, i);
                i++;
            }
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
        let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin, energyRange, 0, canvas.height, energy);
        // Get text width.
        tw = Math.max((0, $e5f7ab5c40db3f0e$export$37827d046293d309)(ctx, energy.toString(), font), (0, $e5f7ab5c40db3f0e$export$37827d046293d309)(ctx, value, font));
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
        let reactionTransitionStates = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsInXY, productsLabel);
        if (reactionTransitionStates != undefined) {
            if (reactionTransitionStates instanceof Map) reactionTransitionStates.forEach(function(ts, id) {
                let transitionState = ts;
                let transitionStateLabel = transitionState.getRef();
                let transitionStateInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesInXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            });
            else {
                let transitionState = reactionTransitionStates;
                let transitionStateLabel = transitionState.getRef();
                let transitionStateInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesInXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            }
        } else (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
    });
    // Draw horizontal lines and labels.
    // (This is done last so that the labels are on top of the vertical lines.)
    reactants.forEach(function(value) {
        let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsOutXY, value)[0];
        let energyString = energy.toString();
        (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
    });
    products.forEach(function(value) {
        let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsOutXY, value)[0];
        let energyString = energy.toString();
        if (intProducts.has(value)) (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
        else (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
    });
    transitionStates.forEach(function(value) {
        let v;
        let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
        let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, value)[0];
        let energyString = energy.toString();
        (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
    });
}
/**
 * Display molecules table.
 */ function $7e68913db756e51f$var$displayMoleculesTable() {
    if ($7e68913db756e51f$var$molecules.size == 0) return;
    // Prepare table headings.
    let th = "";
    let attributeKeys = new Set();
    $7e68913db756e51f$var$molecules.forEach(function(molecule, id) {
        molecule.attributes.forEach(function(value, key) {
            attributeKeys.add(key);
        });
    });
    console.log("attributeKeys=" + (0, $134d19e749bf0414$export$736cc24a423eb64d)(attributeKeys, " "));
    let moleculesTable = (0, $f0396edd0a5c99f7$export$3359980f21752184)([
        "Name",
        "Energy<br>kJ/mol",
        "Rotation constants<br>cm<sup>-1</sup>",
        "Vibration frequencies<br>cm<sup>-1</sup>"
    ]);
    $7e68913db756e51f$var$molecules.forEach(function(molecule, id) {
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        let energyNumber = molecule.getEnergy();
        let energy;
        if (energyNumber == null) energy = "";
        else energy = energyNumber.toString();
        //console.log("energy=" + energy);
        let rotationConstants = "";
        let rotConsts = molecule.getRotConsts();
        if (rotConsts != undefined) rotationConstants = (0, $134d19e749bf0414$export$4323cc4280d5be7)(rotConsts, " ");
        let vibrationFrequencies = "";
        let vibFreqs = molecule.getVibFreqs();
        if (vibFreqs != undefined) vibrationFrequencies = (0, $134d19e749bf0414$export$4323cc4280d5be7)(vibFreqs, " ");
        moleculesTable += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)(id) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id + "_energy", "setEnergy(this)", energy)) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(rotationConstants, true) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(vibrationFrequencies, true));
    });
    $7e68913db756e51f$var$molecules_table = document.getElementById("molecules_table");
    if ($7e68913db756e51f$var$molecules_table !== null) $7e68913db756e51f$var$molecules_table.innerHTML = moleculesTable;
}
/**
 * Display reactions table.
 */ function $7e68913db756e51f$var$displayReactionsTable() {
    if ($7e68913db756e51f$var$reactions.size == 0) return;
    // Prepare table headings.
    let reactionsTable = (0, $f0396edd0a5c99f7$export$3359980f21752184)([
        "ID",
        "Reactants",
        "Products",
        "Transition State",
        "PreExponential",
        "Activation Energy",
        "TInfinity",
        "NInfinity"
    ]);
    $7e68913db756e51f$var$reactions.forEach(function(reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        let reactants = reaction.getReactantsLabel() || "";
        let products = reaction.getProductsLabel() || "";
        let transitionState = "";
        let preExponential = "";
        let activationEnergy = "";
        let tInfinity = "";
        let nInfinity = "";
        let tSs = reaction.transitionStates;
        //console.log("tSs=" + tSs);
        if (tSs != undefined) {
            if (tSs instanceof Map) // Join all names together.
            tSs.forEach(function(ts) {
                let name = ts.getRef();
                if (name != null) transitionState = name + " ";
            });
            else {
                let ts = tSs;
                let name = ts.getRef();
                if (name != null) transitionState = name;
            }
        }
        let mCRCMethod = reaction.getMCRCMethod();
        //console.log("mCRCMethod=" + mCRCMethod);
        //console.log("typeof mCRCMethod=" + typeof mCRCMethod);
        if (mCRCMethod != undefined) {
            if (mCRCMethod instanceof (0, $6f7aa7a716962086$export$191e95ebb11cc88)) {
                let mp = mCRCMethod.getPreExponential();
                if (mp != undefined) preExponential = mp.value.toString() + " " + mp.attributes.get("units");
                let ae = mCRCMethod.getActivationEnergy();
                if (ae != undefined) activationEnergy = ae.value.toString() + " " + ae.attributes.get("units");
                let ti = mCRCMethod.getTInfinity();
                if (ti != undefined) tInfinity = ti.value.toString();
                let ni = mCRCMethod.getNInfinity();
                if (ni != undefined) nInfinity = ni.value.toString();
            } else {
                if (mCRCMethod.attributes.get("name") == "RRKM") ;
                else {
                    console.log("Unexpected mCRCMethod: " + mCRCMethod);
                    throw new Error("Unexpected mCRCMethod: " + mCRCMethod);
                }
            }
        }
        reactionsTable += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)(id) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(reactants) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(products) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(transitionState) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(preExponential, true) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(activationEnergy, true) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(tInfinity, true) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(nInfinity, true));
        $7e68913db756e51f$var$reactions_table = document.getElementById("reactions_table");
        if ($7e68913db756e51f$var$reactions_table !== null) $7e68913db756e51f$var$reactions_table.innerHTML = reactionsTable;
    });
}
/**
 * Display reactions diagram.
 */ function $7e68913db756e51f$var$displayReactionsDiagram() {
    if ($7e68913db756e51f$var$reactions.size > 1) {
        // Set reactions_diagram_title.
        $7e68913db756e51f$var$reactions_diagram_title = document.getElementById("reactions_diagram_title");
        if ($7e68913db756e51f$var$reactions_diagram_title != null) $7e68913db756e51f$var$reactions_diagram_title.innerHTML = "Diagram";
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            $7e68913db756e51f$var$drawReactionDiagram(canvas, $7e68913db756e51f$var$molecules, $7e68913db756e51f$var$reactions, dark, font, lw, lwc);
        }
    }
}
/**
 * Display conditions.
 */ function $7e68913db756e51f$var$displayConditions() {
    let bathGas_element = document.getElementById("bathGas");
    if (bathGas_element != null) bathGas_element.innerHTML = "Bath Gas " + $7e68913db756e51f$var$conditions.getBathGas().value;
    let pTs_element = document.getElementById("PT_table");
    let th = [
        "P",
        "T"
    ];
    // If PTs contain BathGas
    let hasBathGas = $7e68913db756e51f$var$conditions.getPTs().pTpairs.some((pair)=>{
        return pair.getBathGas() != undefined;
    });
    if (hasBathGas) th.push("BathGas");
    // Check if PTs contain ExperimentRate
    let hasExperimentRate = $7e68913db756e51f$var$conditions.getPTs().pTpairs.some((pair)=>{
        return pair.getExperimentRate() != undefined;
    });
    if (hasExperimentRate) th.push("ExperimentRate");
    let table = (0, $f0396edd0a5c99f7$export$3359980f21752184)(th);
    if (pTs_element != null) {
        $7e68913db756e51f$var$conditions.getPTs().pTpairs.forEach(function(pTpair) {
            table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)(pTpair.getP().toString()) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(pTpair.getT().toString()));
            if (hasBathGas) table += (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(pTpair.getBathGas()?.toString() ?? "");
            if (hasExperimentRate) table += (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(pTpair.getExperimentRate()?.toString() ?? "");
        });
        pTs_element.innerHTML = table;
    }
}
/**
 * Display modelParameters.
 */ function $7e68913db756e51f$var$displayModelParameters() {
    let modelParameters_element = document.getElementById("modelParameters_table");
    let table = (0, $f0396edd0a5c99f7$export$3359980f21752184)([
        "Parameter",
        "Value"
    ]);
    table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)("Grain Size") + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)($7e68913db756e51f$var$modelParameters.getGrainSize().value.toString()));
    table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)("Energy Above The Top Hill") + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)($7e68913db756e51f$var$modelParameters.getEnergyAboveTheTopHill().value.toString()));
    if (modelParameters_element != null) modelParameters_element.innerHTML = table;
}
/**
 * Display control.
 */ function $7e68913db756e51f$var$displayControl() {
    let control_table_element = document.getElementById("control_table");
    let table = (0, $f0396edd0a5c99f7$export$3359980f21752184)([
        "Control",
        "Value"
    ]);
    // TestDOS
    let testDOS = $7e68913db756e51f$var$control.getTestDOS();
    if (testDOS != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintSpeciesProfile
    let printSpeciesProfile = $7e68913db756e51f$var$control.getPrintSpeciesProfile();
    if (printSpeciesProfile != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // TestMicroRates
    let testMicroRates = $7e68913db756e51f$var$control.getTestMicroRates();
    if (testMicroRates != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // TestRateConstant
    let testRateConstant = $7e68913db756e51f$var$control.getTestRateConstant();
    if (testRateConstant != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$980e5abe9a459423).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintGrainDOS
    let printGrainDOS = $7e68913db756e51f$var$control.getPrintGrainDOS();
    if (printGrainDOS != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintCellDOS
    let printCellDOS = $7e68913db756e51f$var$control.getPrintCellDOS();
    if (printCellDOS != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$60b233651e162b60).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintReactionOperatorColumnSums
    let printReactionOperatorColumnSums = $7e68913db756e51f$var$control.getPrintReactionOperatorColumnSums();
    if (printReactionOperatorColumnSums != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$a915db169f144f37).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintTunnellingCoefficients
    let printTunnellingCoefficients = $7e68913db756e51f$var$control.getPrintTunnellingCoefficients();
    if (printTunnellingCoefficients != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$8a58e03b7b3f0f47).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintGrainkfE
    let printGrainkfE = $7e68913db756e51f$var$control.getPrintGrainkfE();
    if (printGrainkfE != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintGrainBoltzmann
    let printGrainBoltzmann = $7e68913db756e51f$var$control.getPrintGrainBoltzmann();
    if (printGrainBoltzmann != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$e7fff349901f700d).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // PrintGrainkbE
    let printGrainkbE = $7e68913db756e51f$var$control.getPrintGrainkbE();
    if (printGrainkbE != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // Eigenvalues
    let eigenvalues = $7e68913db756e51f$var$control.getEigenvalues();
    if (eigenvalues != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(eigenvalues.value.toString()));
    // HideInactive
    let hideInactive = $7e68913db756e51f$var$control.getHideInactive();
    if (hideInactive != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$9d51752a8549e2d6).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(""));
    // DiagramEnergyOffset
    let diagramEnergyOffset = $7e68913db756e51f$var$control.getDiagramEnergyOffset();
    if (diagramEnergyOffset != undefined) table += (0, $f0396edd0a5c99f7$export$b5ad96d32b19f99)((0, $f0396edd0a5c99f7$export$983f4376b55e6517)((0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName) + (0, $f0396edd0a5c99f7$export$983f4376b55e6517)(diagramEnergyOffset.value.toString()));
    // Set the table.
    if (control_table_element != null) control_table_element.innerHTML = table;
}
function $7e68913db756e51f$export$afc96e5ea6df45fd(input) {
    let id_energy = input.id;
    let moleculeID = id_energy.split("_")[0];
    let molecule = $7e68913db756e51f$var$molecules.get(moleculeID);
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
window.setEnergy = $7e68913db756e51f$export$afc96e5ea6df45fd;
/**
 * Save to XML file.
 */ window.saveXML = function() {
    console.log("saveXML");
    const pad = "  ";
    let level;
    const padding2 = pad.repeat(2);
    // Create me.title.
    let title_xml = "\n" + pad + (0, $cc8c7201a9bad777$export$dad497fe1f6e27c0)($7e68913db756e51f$var$title, "me:title");
    // Create moleculeList.
    level = 2;
    let moleculeList = "";
    $7e68913db756e51f$var$molecules.forEach(function(molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
    //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = (0, $cc8c7201a9bad777$export$dad497fe1f6e27c0)(moleculeList, "moleculeList", undefined, pad, true);
    // Create reactionList.
    level = 2;
    let reactionList = "";
    $7e68913db756e51f$var$reactions.forEach(function(reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
    //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = (0, $cc8c7201a9bad777$export$dad497fe1f6e27c0)(reactionList, "reactionList", undefined, pad, true);
    // Create me.Conditions
    let xml_conditions = $7e68913db756e51f$var$conditions.toXML(pad, pad);
    // Create modelParameters
    let xml_modelParameters = $7e68913db756e51f$var$modelParameters.toXML(pad, pad);
    // create me.control
    let xml_control = $7e68913db756e51f$var$control.toXML(pad, pad);
    // Create a new Blob object from the data
    let blob = new Blob([
        $7e68913db756e51f$var$header,
        $7e68913db756e51f$var$mesmerStartTag,
        title_xml,
        moleculeList,
        reactionList,
        xml_conditions,
        xml_modelParameters,
        xml_control,
        $7e68913db756e51f$var$mesmerEndTag
    ], {
        type: "text/plain"
    });
    // Create a new object URL for the blob
    let url = URL.createObjectURL(blob);
    // Create a new 'a' element
    let a = document.createElement("a");
    // Set the href and download attributes for the 'a' element
    a.href = url;
    a.download = $7e68913db756e51f$var$input_xml_filename; // Replace with your desired filename
    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();
    // Remove the 'a' element after the download starts
    document.body.removeChild(a);
};


export {$7e68913db756e51f$export$afc96e5ea6df45fd as setEnergy};
//# sourceMappingURL=index.653bc346.js.map
