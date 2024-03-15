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
function $134d19e749bf0414$export$dc22ec7f8e0b9ac(map, delimiter) {
    if (map == null) return "";
    if (delimiter == undefined) delimiter = ", ";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(delimiter);
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
    for(let i = 0; i < s.length; i++)if ($134d19e749bf0414$export$e90fb89750dba83f(s[i])) r.push(parseFloat(s[i]));
    return r;
}
function $134d19e749bf0414$export$e90fb89750dba83f(s) {
    if (s === "") return false;
    return !isNaN(Number(s));
}


/**
 * Create a collapsible div.
 * @param content The content that will be collapsible.
 * @param buttonLabel The label of the button.
 * @param buttonId The id of the button.
 * @param buttonFontSize The font size of the button.
 * @param marginLeft The margin left of the button.
 * @param marginTop The margin top of the button.
 * @param marginBottom The margin bottom of the button.
 * @param contentDivId The id of the content div.
 * @param contentDivClassName The class of the content div.
 * @returns A collapsible div.
 */ function $f0396edd0a5c99f7$export$8b2cd46c11844202(content, buttonLabel, buttonId, buttonFontSize, marginLeft, marginTop, marginBottom, contentDivId, contentDivClassName) {
    let contentDiv = document.createElement("div");
    if (contentDivId != undefined) contentDiv.id = contentDivId;
    if (contentDivClassName != undefined) contentDiv.className = contentDivClassName;
    let button = document.createElement("button");
    if (buttonId != undefined) button.id = buttonId;
    button.className = "collapsible";
    button.innerText = buttonLabel + " \u25BC";
    button.addEventListener("click", function() {
        if (button.innerText.includes("\u25BC")) button.innerText = buttonLabel + " \u25B2"; // Change to up content is expanded
        else button.innerText = buttonLabel + " \u25BC"; // Change to down arrow when content is collapsed
    });
    if (buttonFontSize != undefined) button.style.fontSize = buttonFontSize;
    if (marginLeft != undefined) button.style.marginLeft = marginLeft;
    if (marginTop != undefined) button.style.marginTop = marginTop;
    if (marginBottom != undefined) button.style.marginBottom = marginBottom;
    contentDiv.appendChild(button);
    contentDiv.appendChild(content);
    return contentDiv;
}
function $f0396edd0a5c99f7$export$2883f21c1f82e07d() {
    var collapsibleElements = document.getElementsByClassName("collapsible");
    for(var i = 0; i < collapsibleElements.length; i++){
        // Remove existing event listener
        collapsibleElements[i].removeEventListener("click", $f0396edd0a5c99f7$var$toggleCollapsible);
        // Add new event listener
        collapsibleElements[i].addEventListener("click", $f0396edd0a5c99f7$var$toggleCollapsible);
    }
}
/**
 * For toggling the collapsible content.
 */ function $f0396edd0a5c99f7$var$toggleCollapsible() {
    this.classList.toggle("active");
    let contentDiv = this.nextElementSibling;
    if (contentDiv.style.display === "block") contentDiv.style.display = "none";
    else contentDiv.style.display = "block";
}
function $f0396edd0a5c99f7$export$7c112ceec8941e67(type, id, func, value, labelText) {
    let input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.onchange = func;
    input.value = value;
    let label = document.createElement("label");
    label.htmlFor = id;
    if (labelText) label.textContent = labelText + ": ";
    else label.textContent = "";
    let container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
function $f0396edd0a5c99f7$export$ff083c49da8fe0f9(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}
function $f0396edd0a5c99f7$export$d43d96a9a8ad3e51(input, minSize) {
    if (minSize == undefined) minSize = 4;
    input.style.width = input.value.length + minSize + "ch";
}
function $f0396edd0a5c99f7$export$fdd146df37959fe8(input, minSize) {
    if (minSize == undefined) minSize = 6;
    input.style.width = input.value.length + minSize + "ch";
}
function $f0396edd0a5c99f7$export$16861bfc2f6300b2(options, name, id) {
    let selectElement = document.createElement("select");
    options.forEach((option)=>{
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return selectElement;
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
function $cc8c7201a9bad777$export$433c819efd6b1ea5(e) {
    let s;
    let firstChildNode = $cc8c7201a9bad777$export$4e07613bf412feb7(e);
    if (firstChildNode) s = $cc8c7201a9bad777$export$13cb40e9b656ab9e(firstChildNode).trim();
    else s = "";
    return s;
}
class $cc8c7201a9bad777$export$3288d34c523a1192 {
    /**
     * @param tagName The tag name.
     */ constructor(tagName){
        this.tagName = tagName;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param padding The padding (optional).
     * @returns A self closing tag.
     */ toXML(padding) {
        let s = (0, $f0396edd0a5c99f7$export$ff083c49da8fe0f9)(undefined, this.tagName);
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
        if (this.attributes) this.attributes.forEach((value, key)=>{
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
     * @param attributes The attributes.
     * @param value The value.
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
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$82583fad49645fc9 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param value The value.
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
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.value.toString().trim(), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$38d8ebe2767f8865 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, tagName, values, delimiter){
        super(attributes, tagName);
        /**
     * The delimiter of the values.
     */ this.delimiter = ",";
        this.values = values;
        if (delimiter != undefined) this.delimiter = delimiter;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param delimiter The delimiter.
     */ setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.values.toString().replaceAll(",", this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$bd431b64ad3b0433 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     */ constructor(attributes, tagName){
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     * @returns The index of the node added.
     */ addNode(node) {
        this.nodes.set(this.nodes.size, node);
        return this.nodes.size - 1;
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
     * @param pad The pad (Optional).
     * @param padding The padding (Optional).
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
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     * If there is no "id" then "this.id" is set to the "elementType".
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName);
        let elementType = attributes.get("elementType");
        if (elementType == undefined) throw new Error("elementType is undefined");
        this.elementType = elementType;
        let id = attributes.get("id");
        if (id == undefined) id = this.elementType;
        this.id = id;
    }
}
class $ef5b9341e5193b70$export$9cea715eceba39a0 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
    * The tag name.
    */ this.tagName = "atomArray";
    }
    /**
     * @param attributes The attributes.
     * @param atoms The atoms.
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
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$153327fc99ac0c53.tagName);
        let atomRefs2 = attributes.get("atomRefs2");
        if (atomRefs2 == undefined) throw new Error("atomRefs2 is undefined");
        this.atomRefs2 = atomRefs2;
    }
}
class $ef5b9341e5193b70$export$746fba2e30d93fe6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bondArray";
    }
    /**
     * @param attributes The attributes.
     * @param bonds A Map of bonds with keys as ids.
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
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            if (this.attributes != undefined) {
                let existingUnits = this.attributes.get("units");
                if (existingUnits != undefined) {
                    if (existingUnits != units) //console.log('Units are not the same, changing units...');
                    this.attributes.set("units", units);
                }
            }
        }
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
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes, $ef5b9341e5193b70$export$9f93a3fdf2490572.tagName, values, delimiter);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            if (this.attributes != undefined) {
                let existingUnits = this.attributes.get("units");
                if (existingUnits != undefined) {
                    if (existingUnits != units) //console.log('Units are not the same, changing units...');
                    this.attributes.set("units", units);
                }
            }
        }
    }
}
class $ef5b9341e5193b70$export$41b04b3a73e7216d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "property";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, $ef5b9341e5193b70$export$41b04b3a73e7216d.tagName);
        let dictRef = attributes.get("dictRef");
        if (dictRef == undefined) throw new Error("dictRef is undefined");
        this.dictRef = dictRef;
        if (property) this.nodes.set(0, property);
    }
    /**
     * @returns The property.
     */ getProperty() {
        return this.nodes.get(0);
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        this.nodes.set(0, property);
    }
}
class $ef5b9341e5193b70$export$95174cf0748f45cd extends $ef5b9341e5193b70$export$41b04b3a73e7216d {
    static{
        this.dictRef = "me:ZPE";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of ["kJ/mol", "cm-1", "wavenumber", "kcal/mol", "Hartree", "au"].
     */ setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
class $ef5b9341e5193b70$export$1288989e9be37590 extends $ef5b9341e5193b70$export$41b04b3a73e7216d {
    static{
        this.dictRef = "me:frequenciesScaleFactor";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $ef5b9341e5193b70$export$2762c8fbc03043ca extends $ef5b9341e5193b70$export$41b04b3a73e7216d {
    static{
        this.dictRef = "me:vibFreqs";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $ef5b9341e5193b70$export$984abe26ded13ee0 extends $ef5b9341e5193b70$export$41b04b3a73e7216d {
    static{
        this.dictRef = "me:rotConsts";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $ef5b9341e5193b70$export$a3772f6eb527275b extends $ef5b9341e5193b70$export$41b04b3a73e7216d {
    static{
        this.dictRef = "me:MW";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $ef5b9341e5193b70$export$22995ecd2bdeb2 extends $ef5b9341e5193b70$export$41b04b3a73e7216d {
    static{
        this.dictRef = "me:imFreqs";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $ef5b9341e5193b70$export$4e0d1ad7ad6a0802 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "propertyList";
    }
    /**
     * @param attributes The attributes.
     * @param properties The properties (optional).
     */ constructor(attributes, properties){
        super(attributes, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName);
        this.index = new Map();
        if (properties) properties.forEach((property)=>{
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        });
    }
    /**
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) return this.nodes.get(i);
        else throw new Error("Property " + dictRef + " does not exist");
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        let i = this.index.get(property.dictRef);
        if (i == undefined) {
            //console.log('Property ' + property.dictRef + ' does not exist, adding...');
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        } else {
            console.log("Property " + property.dictRef + " already exists, updating...");
            this.nodes.set(i, property);
        }
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
    /**
     * @returns The bath gas of the DeltaEDown.
     */ getBathGas() {
        if (this.attributes != undefined) return this.attributes.get("bathGas");
    }
    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */ setBathGas(bathGas) {
        if (this.attributes != undefined) this.attributes.set("bathGas", bathGas);
    }
    /**
     * @returns The units of the DeltaEDown.
     */ getUnits() {
        if (this.attributes != undefined) return this.attributes.get("units");
    }
    /**
     * @returns The lower of the DeltaEDown.
     */ getLower() {
        if (this.attributes != undefined) return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, "lower"));
    }
    /**
     * @param lower The lower of the DeltaEDown.
     */ setLower(lower) {
        if (this.attributes != undefined) this.attributes.set("lower", lower.toString());
    }
    /**
     * @returns The upper of the DeltaEDown.
     */ getUpper() {
        if (this.attributes != undefined) return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, "upper"));
    }
    /**
     * @param upper The upper of the DeltaEDown.
     */ setUpper(upper) {
        if (this.attributes != undefined) this.attributes.set("upper", upper.toString());
    }
    /**
     * @returns The stepsize of the DeltaEDown.
     */ getStepsize() {
        if (this.attributes != undefined) return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, "stepsize"));
    }
    /**
     * @param stepsize The stepsize of the DeltaEDown.
     */ setStepsize(stepsize) {
        if (this.attributes != undefined) this.attributes.set("stepsize", stepsize.toString());
    }
    /**
     * @param value The value of the DeltaEDown.
     */ setValue(value) {
        this.value = value;
    }
}
class $ef5b9341e5193b70$export$499950da20810ac9 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyTransferModel";
    }
    /**
     * @param attributes The attributes.
     * @param deltaEDowns The DeltaEDowns.
     */ constructor(attributes, deltaEDowns){
        super(attributes, $ef5b9341e5193b70$export$499950da20810ac9.tagName);
        if (deltaEDowns != undefined) deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @returns The DeltaEDowns.
     */ getDeltaEDowns() {
        let deltaEDowns = [];
        this.nodes.forEach((node)=>{
            if (node instanceof $ef5b9341e5193b70$export$16fc56ab40b12b45) deltaEDowns.push(node);
        });
        return deltaEDowns;
    }
    /**
     * @param deltaEDowns The DeltaEDowns.
     */ setDeltaEDowns(deltaEDowns) {
        this.nodes.clear();
        deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @param index The index of the DeltaEDown to return.
     * @returns The DeltaEDown at the given index.
     */ getDeltaEDown(index) {
        if (index < 0 || index >= this.nodes.size) throw new Error("index out of range");
        return this.nodes.get(index);
    }
    /**
     * Set the DeltaEDown at the given index.
     * @param index The index to set the DeltaEDown at.
     * @param deltaEDown The DeltaEDown to set at the index.
     */ setDeltaEDown(index, deltaEDown) {
        this.nodes.set(index, deltaEDown);
    }
    /**
     * Add the DeltaEDowns.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */ addDeltaEDown(deltaEDown) {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
}
class $ef5b9341e5193b70$export$bbdce6c921702068 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DOSCMethod";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$bbdce6c921702068.tagName);
        if (attributes.get("xsi:type") == undefined) throw new Error("xsi:type is undefined");
    }
    /**
     * @returns The xsi type of the DOSCMethod.
     */ getXsiType() {
        if (this.attributes == undefined) throw new Error("attributes is undefined");
        return this.attributes.get("xsi:type");
    }
    /**
     * @param xsiType The xsi type of the DOSCMethod.
     */ setXsiType(xsiType) {
        if (this.attributes == undefined) throw new Error("attributes is undefined");
        this.attributes.set("xsi:type", xsiType);
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
    /**
     * @returns The potential point with the given index.
     */ getPotentialPoint(index) {
        return this.nodes.get(index);
    }
    /**
     * Set the potential point at the given index.
     * @param index The index to set the potential point at.
     * @param p The potential point to set at the index.
     */ setPotentialPoints(index, p) {
        this.nodes.set(index, p);
    }
    /**
     * Add the potential point.
     * @param p The potential point.
     * @returns The index of the potential point added.
     */ addPotentialPoint(p) {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
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
     * @param bondRef The bondRef.
     * @param hinderedRotorPotential The HinderedRotorPotential.
     * @param periodicity The Periodicity.
     */ constructor(attributes, bondRef, hinderedRotorPotential, periodicity){
        super(attributes, $ef5b9341e5193b70$export$ae98b7db6376163d.tagName);
        this.index = new Map();
        if (bondRef) {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set($ef5b9341e5193b70$export$aef8e5ad5552fd72.tagName, this.nodes.size - 1);
        }
        if (hinderedRotorPotential) {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set($ef5b9341e5193b70$export$9b8e857b9a081d2.tagName, this.nodes.size - 1);
        }
        if (periodicity) {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set($ef5b9341e5193b70$export$9513c16afdf7d852.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The bondRef.
     */ getBondRef() {
        let i = this.index.get($ef5b9341e5193b70$export$aef8e5ad5552fd72.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the bondRef.
     * @param bondRef The bondRef.
     */ setBondRef(bondRef) {
        let i = this.index.get($ef5b9341e5193b70$export$aef8e5ad5552fd72.tagName);
        if (i != undefined) this.nodes.set(i, bondRef);
        else {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set($ef5b9341e5193b70$export$aef8e5ad5552fd72.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The hindered rotor potential of the molecule.
     */ getHinderedRotorPotential() {
        let i = this.index.get($ef5b9341e5193b70$export$9b8e857b9a081d2.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the hindered rotor potential.
     * @param hinderedRotorPotential The hindered rotor potential.
     */ setHinderedRotorPotential(hinderedRotorPotential) {
        let i = this.index.get($ef5b9341e5193b70$export$9b8e857b9a081d2.tagName);
        if (i != undefined) this.nodes.set(i, hinderedRotorPotential);
        else {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set($ef5b9341e5193b70$export$9b8e857b9a081d2.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The periodicity of the molecule.
     */ getPeriodicity() {
        let i = this.index.get($ef5b9341e5193b70$export$9513c16afdf7d852.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the periodicity.
     * @param periodicity The periodicity.
     */ setPeriodicity(periodicity) {
        let i = this.index.get($ef5b9341e5193b70$export$9513c16afdf7d852.tagName);
        if (i != undefined) this.nodes.set(i, periodicity);
        else {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set($ef5b9341e5193b70$export$9513c16afdf7d852.tagName, this.nodes.size - 1);
        }
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
     */ constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize){
        super(attributes, $ef5b9341e5193b70$export$3da9759ad07746a3.tagName);
        this.index = new Map();
        let id = attributes.get("id");
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
        if (properties) {
            this.nodes.set(i, properties);
            this.index.set($ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName, i);
            i++;
        }
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
     * Get the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */ getDescription() {
        if (this.attributes != undefined) return this.attributes.get("description");
    }
    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */ setDescription(description) {
        if (this.attributes != undefined) this.attributes.set("description", description);
    }
    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        if (this.attributes != undefined) {
            let active = this.attributes.get("active");
            if (active != undefined) {
                if (active == "true") return true;
                else return false;
            }
        }
    }
    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */ setActive(active) {
        if (this.attributes != undefined) this.attributes.set("active", active.toString());
    }
    /**
     * Get a label for the molecule which includes the is and any description and whether active.
     * @returns A label for the molecule detailing the attributes of the XML element (including id, 
     * and possibly including description and whether active).
     */ getLabel() {
        let label = this.id;
        let description = this.getDescription();
        if (description != undefined) label += " (" + description + ")";
        let active = this.getActive();
        if (active) label += " (active)";
        return label;
    }
    /**
     * @returns A comma and space separated string of the attributes of the molecule.
     */ getAttributesAsString() {
        if (this.attributes == undefined) return "";
        return Array.from(this.attributes, ([key, value])=>`${key}=\"${value}\"`).join(", ");
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
     * @param properties The properties.
     */ setProperties(properties) {
        let i = this.index.get($ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName);
        if (i == undefined) {
            this.index.set($ef5b9341e5193b70$export$4e0d1ad7ad6a0802.tagName, this.nodes.size);
            this.addNode(properties);
        } else this.nodes.set(i, properties);
    }
    /**
     * Get a property.
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let properties = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof $ef5b9341e5193b70$export$4e0d1ad7ad6a0802) //console.log('PropertyList');
            return properties.getProperty(dictRef);
            else //console.log('Property');
            return properties;
        }
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        let properties = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof $ef5b9341e5193b70$export$4e0d1ad7ad6a0802) properties.setProperty(property);
            else this.setProperties(properties);
        } else this.setProperties(property);
    }
    /**
     * @returns The atoms of the molecule.
     */ getAtoms() {
        let i = this.index.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName);
        if (i == undefined) {
            i = this.index.get($ef5b9341e5193b70$export$9cea715eceba39a0.tagName);
            if (i == undefined) return undefined;
            else return this.nodes.get(i);
        } else return this.nodes.get(i);
    }
    /**
     * @returns The bonds of the molecule.
     */ getBonds() {
        let i = this.index.get($ef5b9341e5193b70$export$746fba2e30d93fe6.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * @returns The energy transfer model of the molecule.
     */ getEnergyTransferModel() {
        let i = this.index.get($ef5b9341e5193b70$export$499950da20810ac9.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the energy transfer model.
     * @param energyTransferModel The energy transfer model.
     */ setEnergyTransferModel(energyTransferModel) {
        let i = this.index.get($ef5b9341e5193b70$export$499950da20810ac9.tagName);
        if (i == undefined) {
            this.index.set($ef5b9341e5193b70$export$499950da20810ac9.tagName, this.nodes.size);
            this.addNode(energyTransferModel);
        } else this.nodes.set(i, energyTransferModel);
    }
    /**
     * @returns The DOSC method of the molecule.
     */ getDOSCMethod() {
        let i = this.index.get($ef5b9341e5193b70$export$bbdce6c921702068.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the DOSC method.
     * @param dOSCMethod The DOSC method.
     */ setDOSCMethod(dOSCMethod) {
        let i = this.index.get($ef5b9341e5193b70$export$bbdce6c921702068.tagName);
        if (i == undefined) {
            this.index.set($ef5b9341e5193b70$export$bbdce6c921702068.tagName, this.nodes.size);
            this.addNode(dOSCMethod);
        } else this.nodes.set(i, dOSCMethod);
    }
    /**
     * @returns The extra DOSC method of the molecule.
     */ getExtraDOSCMethod() {
        let i = this.index.get($ef5b9341e5193b70$export$ae98b7db6376163d.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */ setExtraDOSCMethod(extraDOSCMethod) {
        let i = this.index.get($ef5b9341e5193b70$export$ae98b7db6376163d.tagName);
        if (i == undefined) {
            this.index.set($ef5b9341e5193b70$export$ae98b7db6376163d.tagName, this.nodes.size);
            this.addNode(extraDOSCMethod);
        } else this.nodes.set(i, extraDOSCMethod);
    }
    /**
     * @returns The reservoir size of the molecule.
     */ getReservoirSize() {
        let i = this.index.get($ef5b9341e5193b70$export$97850fe2f2906f00.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the reservoir size.
     * @param reservoirSize The reservoir size.
     */ setReservoirSize(reservoirSize) {
        let i = this.index.get($ef5b9341e5193b70$export$97850fe2f2906f00.tagName);
        if (i == undefined) {
            this.index.set($ef5b9341e5193b70$export$97850fe2f2906f00.tagName, this.nodes.size);
            this.addNode(reservoirSize);
        } else this.nodes.set(i, reservoirSize);
    }
    /**
     * Get the ZPE value of the molecule.
     */ getEnergy() {
        let p = this.getProperty($ef5b9341e5193b70$export$95174cf0748f45cd.dictRef);
        if (p == undefined) {
            console.log(this.toString());
            throw new Error("ZPE property not found");
        //return 0;
        }
        return p.getProperty().value;
    }
}



class $6f7aa7a716962086$export$e8a062bb2fc9e2ba extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */ constructor(attributes){
        super(attributes, $6f7aa7a716962086$export$e8a062bb2fc9e2ba.tagName);
        this.ref = attributes.get("ref");
        this.role = attributes.get("role");
    }
    /**
     * @param role The role of the molecule in the reaction.
     */ setRole(role) {
        this.role = role;
    }
}
class $6f7aa7a716962086$export$dcfd4302d04b7fb6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactant";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, $6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class $6f7aa7a716962086$export$264ad599d7cef668 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "product";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, $6f7aa7a716962086$export$264ad599d7cef668.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class $6f7aa7a716962086$export$145c1ed87b1a2216 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:transitionState";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, $6f7aa7a716962086$export$145c1ed87b1a2216.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class $6f7aa7a716962086$export$38ce90ac8b004d85 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:preExponential";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $6f7aa7a716962086$export$d08982dd841d496f.tagName, value);
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
     * Should any parameters be specified as being optional?
     * @param attributes The attributes.
     * @param preExponential The pre-exponential factor (optional).
     * @param activationEnergy The activation energy (optional).
     * @param tInfinity The TInfinity (optional).
     * @param nInfinity The nInfinity (optional).
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
     * @param preExponential The pre-exponential factor.
     */ setPreExponential(preExponential) {
        let i = this.index.get($6f7aa7a716962086$export$38ce90ac8b004d85.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$38ce90ac8b004d85.tagName, this.nodes.size);
            this.addNode(preExponential);
        } else this.nodes.set(i, preExponential);
    }
    /**
     * @returns The activation energy or undefined if it does not exist.
     */ getActivationEnergy() {
        let i = this.index.get($6f7aa7a716962086$export$1bdc69d2439d749d.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param activationEnergy The activation energy.
     */ setActivationEnergy(activationEnergy) {
        let i = this.index.get($6f7aa7a716962086$export$1bdc69d2439d749d.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$1bdc69d2439d749d.tagName, this.nodes.size);
            this.addNode(activationEnergy);
        } else this.nodes.set(i, activationEnergy);
    }
    /**
     * @returns The TInfinity or undefined if it does not exist.
     */ getTInfinity() {
        let i = this.index.get($6f7aa7a716962086$export$8d95dd32819bc86c.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param tInfinity The TInfinity.
     */ setTInfinity(tInfinity) {
        let i = this.index.get($6f7aa7a716962086$export$8d95dd32819bc86c.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$8d95dd32819bc86c.tagName, this.nodes.size);
            this.addNode(tInfinity);
        } else this.nodes.set(i, tInfinity);
    }
    /**
     * @returns The NInfinity or undefined if it does not exist.
     */ getNInfinity() {
        let i = this.index.get($6f7aa7a716962086$export$d08982dd841d496f.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param nInfinity The NInfinity.
     */ setNInfinity(nInfinity) {
        let i = this.index.get($6f7aa7a716962086$export$d08982dd841d496f.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$d08982dd841d496f.tagName, this.nodes.size);
            this.addNode(nInfinity);
        } else this.nodes.set(i, nInfinity);
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
    /**
     * @returns The name of the tunneling method.
     */ getName() {
        if (this.attributes != undefined) return this.attributes.get("name");
        return "";
    }
    /**
     * @param The name of the tunneling method.
     */ setName(name) {
        if (this.attributes != undefined) this.attributes.set("name", name);
    }
}
class $6f7aa7a716962086$export$284227145ed02b04 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes.
     * @param id The id of the reaction.
     * @param reactants The reactants in the reaction.
     * @param products The products of the reaction.
     * @param tunneling The tunneling (optional).
     * @param transitionStates The transition states (optional).
     * @param mCRCMethod The MCRCMethod (optional).
     * @param excessReactantConc The excess reactant concentration (optional).
     */ constructor(attributes, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc){
        super(attributes, $6f7aa7a716962086$export$d2ae4167a30cf6bb.tagName);
        this.index = new Map();
        this.reactantsIndex = new Map();
        this.productsIndex = new Map();
        this.transitionStatesIndex = new Map();
        let id = attributes.get("id");
        if (id == undefined) throw new Error("Reaction id is undefined");
        this.id = id;
        if (reactants != undefined) {
            reactants.forEach((reactant)=>{
                this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
                this.addNode(reactant);
            });
            this.index.set($6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName, this.reactantsIndex);
        }
        if (products != undefined) {
            products.forEach((product)=>{
                this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
                this.addNode(product);
            });
            this.index.set($6f7aa7a716962086$export$264ad599d7cef668.tagName, this.productsIndex);
        }
        if (tunneling != undefined) {
            this.index.set($6f7aa7a716962086$export$c3cf6f96dac11421.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach((transitionState)=>{
                this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
                this.addNode(transitionState);
            });
            this.index.set($6f7aa7a716962086$export$145c1ed87b1a2216.tagName, this.transitionStatesIndex);
        }
        if (mCRCMethod != undefined) {
            this.index.set($6f7aa7a716962086$export$6fa70ee10f356b6.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc != undefined) {
            this.index.set($6f7aa7a716962086$export$284227145ed02b04.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
    }
    /**
     * Add a node to the index.
     */ addToIndex(tagName, node) {
        let v = this.index.get(tagName);
        if (v == undefined) this.index.set(tagName, this.nodes.size);
        else if (v instanceof Map) v.set(node.tagName, this.nodes.size);
        else {
            let map = new Map();
            map.set(this.nodes.get(v).ref, v);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The reactants.
     */ getReactants() {
        let i = this.index.get($6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the reactants.
     */ setReactants(reactants) {
        reactants.forEach((reactant)=>{
            this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
            this.addNode(reactant);
        });
        this.index.set($6f7aa7a716962086$export$dcfd4302d04b7fb6.tagName, this.reactantsIndex);
    }
    /**
     * @returns A particular Reactant.
     * @param ref The ref of the reactant to return.
     * @returns The reactant at the given index.
     */ getReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) throw new Error(`Reactant with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param reactant The reactant to add.
     */ addReactant(reactant) {
        this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
        this.addNode(reactant);
    }
    /**
     * @param ref The ref of the reactant to remove.
     */ removeReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) throw new Error(`Reactant with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.reactantsIndex.delete(ref);
        }
    }
    /**
     * @returns The products.
     */ getProducts() {
        let i = this.index.get($6f7aa7a716962086$export$264ad599d7cef668.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the products.
     */ setProducts(products) {
        products.forEach((product)=>{
            this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
            this.addNode(product);
        });
        this.index.set($6f7aa7a716962086$export$264ad599d7cef668.tagName, this.productsIndex);
    }
    /**
     * @returns A particular Product.
     * @param ref The ref of the product to return.
     * @returns The product at the given index.
     */ getProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) throw new Error(`Product with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param product The product to add.
     */ addProduct(product) {
        this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
        this.addNode(product);
    }
    /**
     * @param ref The ref of the product to remove.
     */ removeProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) throw new Error(`Product with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.productsIndex.delete(ref);
        }
    }
    /**
     * @returns The tunneling node or undefined if it does not exist.
     */ getTunneling() {
        let i = this.index.get($6f7aa7a716962086$export$c3cf6f96dac11421.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the tunneling node or create it if it is undefined.
     */ setTunneling(tunneling) {
        let i = this.index.get($6f7aa7a716962086$export$c3cf6f96dac11421.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$c3cf6f96dac11421.tagName, this.nodes.size);
            this.addNode(tunneling);
        } else {
            if (i instanceof Map) throw new Error("Tunneling is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, tunneling);
        }
    }
    /**
     * @returns The transition states.
     */ getTransitionStates() {
        let i = this.index.get($6f7aa7a716962086$export$145c1ed87b1a2216.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the transition states.
     */ setTransitionStates(transitionStates) {
        transitionStates.forEach((transitionState)=>{
            this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
            this.addNode(transitionState);
        });
        this.index.set($6f7aa7a716962086$export$145c1ed87b1a2216.tagName, this.transitionStatesIndex);
    }
    /**
     * @returns A particular TransitionState.
     * @param ref The ref of the transition state to return.
     * @returns The transition state at the given index.
     */ getTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) throw new Error(`Transition state with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param transitionState The transition state to add.
     */ addTransitionState(transitionState) {
        this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
        this.addNode(transitionState);
    }
    /**
     * @param ref The ref of the transition state to remove.
     */ removeTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) throw new Error(`Transition State with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.transitionStatesIndex.delete(ref);
        }
    }
    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */ getMCRCMethod() {
        let i = this.index.get($6f7aa7a716962086$export$6fa70ee10f356b6.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the MCRCMethod node or create it if it is undefined.
     */ setMCRCMethod(mCRCMethod) {
        let i = this.index.get($6f7aa7a716962086$export$6fa70ee10f356b6.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$6fa70ee10f356b6.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        } else {
            if (i instanceof Map) throw new Error("MCRCMethod is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, mCRCMethod);
        }
    }
    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */ getExcessReactantConc() {
        let i = this.index.get($6f7aa7a716962086$export$284227145ed02b04.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the excess reactant concentration or create it if it is undefined.
     */ setExcessReactantConc(excessReactantConc) {
        let i = this.index.get($6f7aa7a716962086$export$284227145ed02b04.tagName);
        if (i == undefined) {
            this.index.set($6f7aa7a716962086$export$284227145ed02b04.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        } else {
            if (i instanceof Map) throw new Error("ExcessReactantConc is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, excessReactantConc);
        }
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        return this.getReactants().map((reactant)=>reactant.getMolecule().ref).join(" + ");
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        return this.getProducts().map((product)=>product.getMolecule().ref).join(" + ");
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
    }
    /**
     * Returns the total energy of all reactants.
     * @returns The total energy of all reactants.
     */ getReactantsEnergy(molecules) {
        // Sum up the energy values of all the reactants in the reaction
        return Array.from(this.getReactants()).map((reactant)=>{
            let molecule = molecules.get(reactant.getMolecule().ref);
            if (molecule == undefined) throw new Error(`Molecule with ref ${reactant.getMolecule().ref} not found`);
            return molecule.getEnergy();
        }).reduce((a, b)=>a + b, 0);
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy(molecules) {
        // Sum up the energy values of all the products in the reaction
        return Array.from(this.getProducts()).map((product)=>{
            let molecule = molecules.get(product.getMolecule().ref);
            if (molecule == undefined) throw new Error(`Molecule with ref ${product.getMolecule().ref} not found`);
            return molecule.getEnergy();
        }).reduce((a, b)=>a + b, 0);
    }
    /**
     * @param tagName The tag name.
     * @param dictRef The dictRef.
     * @returns The node with the tag name and dictRef or undefined if it does not exist.
     */ get(tagName, dictRef) {
        if (this.index.has(tagName)) {
            let i = this.index.get(tagName);
            if (i != undefined) {
                if (i instanceof Map) {
                    let nodeIndex = i.get(dictRef);
                    if (nodeIndex != undefined) return this.nodes.get(nodeIndex);
                } else return this.nodes.get(i);
            }
        }
    }
}



/**
 * Draw a horizontal line and add labels.
 * @param ctx The context to use.
 * @param strokeStyle The name of a style to use for the line.
 * @param strokewidth The width of the line.
 * @param x0 The start x-coordinate of the line.
 * @param y0 The start y-coordinate of the line. Also used for an energy label.
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
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     */ constructor(attributes, moleculeID){
        super(attributes, $ae74a7b44a6504a1$export$b33a132661f4be58.tagName, moleculeID);
    }
}
class $ae74a7b44a6504a1$export$ea088383ce76fc5a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentRate";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */ constructor(attributes, value){
        super(attributes, $ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, value);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        if (this.attributes != undefined) {
            let error = this.attributes.get("error");
            if (error) return parseFloat(error);
        }
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        if (this.attributes != undefined) this.attributes.set("error", error.toString());
    }
}
class $ae74a7b44a6504a1$export$3fe97ecb6b172244 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
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
        if (this.attributes != undefined) {
            let p = this.attributes.get("P");
            if (p) return parseFloat(p);
            else throw new Error("P is undefined");
        }
        return NaN;
    }
    /**
     * Set The Pressure
     */ setP(p) {
        if (this.attributes != undefined) this.attributes.set("P", p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        if (this.attributes != undefined) {
            let t = this.attributes.get("T");
            if (t) return parseFloat(t);
            else throw new Error("T is undefined");
        }
        return NaN;
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        if (this.attributes != undefined) this.attributes.set("T", t.toString());
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param bathGas The bath gas.
     */ setBathGas(bathGas) {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i) this.nodes.set(i, bathGas);
        else {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @returns The experiment rate.
     */ getExperimentRate() {
        let i = this.index.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentRate(experimentRate) {
        let i = this.index.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        if (i) this.nodes.set(i, experimentRate);
        else {
            this.index.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
}
class $ae74a7b44a6504a1$export$3be0efe793283834 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTs";
    }
    /**
     * @param attributes The attributes.
     * @param pTs The PTs.
     */ constructor(attributes, pTs){
        super(attributes, $ae74a7b44a6504a1$export$3be0efe793283834.tagName);
        if (pTs) pTs.forEach((pTpair)=>{
            this.addNode(pTpair);
        });
    }
    /**
     * @param index 
     * @returns The PT pair at the given index or undefined if the index is out of range.
     */ getPTpair(index) {
        return this.nodes.get(index);
    }
    /**
     * Set the PT at the given index.
     * @returns The PT pairs.
     */ setPTpair(index, pT) {
        this.nodes.set(index, pT);
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     * @returns The index of the PT added.
     */ addPTpair(pT) {
        return this.addNode(pT);
    }
}
class $ae74a7b44a6504a1$export$363c7374d425f4ad extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:conditions";
    }
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */ constructor(attributes, bathGas, pTs){
        super(attributes, $ae74a7b44a6504a1$export$363c7374d425f4ad.tagName);
        this.index = new Map();
        if (bathGas) {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (pTs) {
            this.index.set($ae74a7b44a6504a1$export$3be0efe793283834.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param bathGas The bath gas.
     */ setBathGas(bathGas) {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i != undefined) this.nodes.set(i, bathGas);
        else {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */ getPTs() {
        let i = this.index.get($ae74a7b44a6504a1$export$3be0efe793283834.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param pTs The PTs.
     */ setPTs(pTs) {
        let i = this.index.get($ae74a7b44a6504a1$export$3be0efe793283834.tagName);
        if (i != undefined) this.nodes.set(i, pTs);
        else {
            this.index.set($ae74a7b44a6504a1$export$3be0efe793283834.tagName, this.nodes.size);
            this.addNode(pTs);
        }
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
    constructor(attributes, grainSize, energyAboveTheTopHill){
        super(attributes, $8883b31bd809eb64$export$77f098867dc64198.tagName);
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set($8883b31bd809eb64$export$26e33f0df9ce919d.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set($8883b31bd809eb64$export$aa73446724166cdb.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }
    /**
     * @returns The grain size or undefined.
     */ getGrainSize() {
        let i = this.index.get($8883b31bd809eb64$export$26e33f0df9ce919d.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param grainSize The grain size.
     */ setGrainSize(grainSize) {
        let i = this.index.get($8883b31bd809eb64$export$26e33f0df9ce919d.tagName);
        if (i) this.nodes.set(i, grainSize);
        else {
            this.index.set($8883b31bd809eb64$export$26e33f0df9ce919d.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
    }
    /**
     * @returns The energy above the top hill or undefined.
     */ getEnergyAboveTheTopHill() {
        let i = this.index.get($8883b31bd809eb64$export$aa73446724166cdb.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param energyAboveTheTopHill The energy above the top hill.
     */ setEnergyAboveTheTopHill(energyAboveTheTopHill) {
        let i = this.index.get($8883b31bd809eb64$export$aa73446724166cdb.tagName);
        if (i) this.nodes.set(i, energyAboveTheTopHill);
        else {
            this.index.set($8883b31bd809eb64$export$aa73446724166cdb.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
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
    /**
     * @returns The testDOS or undefined.
     */ getTestDOS() {
        let i = this.index.get($b6873406fb778c0b$export$a3d7e677521f681f.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param testDOS The testDOS.
     */ setTestDOS(testDOS) {
        let i = this.index.get($b6873406fb778c0b$export$a3d7e677521f681f.tagName);
        if (i != undefined) this.nodes.set(i, testDOS);
        else {
            this.index.set($b6873406fb778c0b$export$a3d7e677521f681f.tagName, this.nodes.size);
            this.addNode(testDOS);
        }
    }
    /**
     * Remove the testDOS.
     */ removeTestDOS() {
        let i = this.index.get($b6873406fb778c0b$export$a3d7e677521f681f.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$a3d7e677521f681f.tagName);
        }
    }
    /**
     * @returns The PrintSpeciesProfile or undefined.
     */ getPrintSpeciesProfile() {
        let i = this.index.get($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printSpeciesProfile The printSpeciesProfile.
     */ setPrintSpeciesProfile(printSpeciesProfile) {
        let i = this.index.get($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName);
        if (i != undefined) this.nodes.set(i, printSpeciesProfile);
        else {
            this.index.set($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName, this.nodes.size);
            this.addNode(printSpeciesProfile);
        }
    }
    /**
     * Remove the printSpeciesProfile.
     */ removePrintSpeciesProfile() {
        let i = this.index.get($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$ed9b9e07e51c2ac1.tagName);
        }
    }
    /**
     * @returns The TestMicroRates or undefined.
     */ getTestMicroRates() {
        let i = this.index.get($b6873406fb778c0b$export$1f37c7c73e401f31.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testMicroRates The testMicroRates.
     */ setTestMicroRates(testMicroRates) {
        let i = this.index.get($b6873406fb778c0b$export$1f37c7c73e401f31.tagName);
        if (i != undefined) this.nodes.set(i, testMicroRates);
        else {
            this.index.set($b6873406fb778c0b$export$1f37c7c73e401f31.tagName, this.nodes.size);
            this.addNode(testMicroRates);
        }
    }
    /**
     * Remove the testMicroRates.
     */ removeTestMicroRates() {
        let i = this.index.get($b6873406fb778c0b$export$1f37c7c73e401f31.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$1f37c7c73e401f31.tagName);
        }
    }
    /**
     * @returns The TestRateConstant or undefined.
     */ getTestRateConstant() {
        let i = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstant(testRateConstant) {
        let i = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set($b6873406fb778c0b$export$980e5abe9a459423.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstant() {
        let i = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        }
    }
    /**
     * @returns The PrintGrainDOS or undefined.
     */ getPrintGrainDOS() {
        let i = this.index.get($b6873406fb778c0b$export$d23243bda4dfae2b.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainDOS The printGrainDOS.
     */ setPrintGrainDOS(printGrainDOS) {
        let i = this.index.get($b6873406fb778c0b$export$d23243bda4dfae2b.tagName);
        if (i != undefined) this.nodes.set(i, printGrainDOS);
        else {
            this.index.set($b6873406fb778c0b$export$d23243bda4dfae2b.tagName, this.nodes.size);
            this.addNode(printGrainDOS);
        }
    }
    /**
     * Remove the printGrainDOS.
     */ removePrintGrainDOS() {
        let i = this.index.get($b6873406fb778c0b$export$d23243bda4dfae2b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$d23243bda4dfae2b.tagName);
        }
    }
    /**
     * @returns The PrintCellDOS or undefined.
     */ getPrintCellDOS() {
        let i = this.index.get($b6873406fb778c0b$export$60b233651e162b60.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCellDOS The printCellDOS.
     */ setPrintCellDOS(printCellDOS) {
        let i = this.index.get($b6873406fb778c0b$export$60b233651e162b60.tagName);
        if (i != undefined) this.nodes.set(i, printCellDOS);
        else {
            this.index.set($b6873406fb778c0b$export$60b233651e162b60.tagName, this.nodes.size);
            this.addNode(printCellDOS);
        }
    }
    /**
     * Remove the printCellDOS.
     */ removePrintCellDOS() {
        let i = this.index.get($b6873406fb778c0b$export$60b233651e162b60.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$60b233651e162b60.tagName);
        }
    }
    /**
     * @returns The PrintReactionOperatorColumnSums or undefined.
     */ getPrintReactionOperatorColumnSums() {
        let i = this.index.get($b6873406fb778c0b$export$a915db169f144f37.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     */ setPrintReactionOperatorColumnSums(printReactionOperatorColumnSums) {
        let i = this.index.get($b6873406fb778c0b$export$a915db169f144f37.tagName);
        if (i != undefined) this.nodes.set(i, printReactionOperatorColumnSums);
        else {
            this.index.set($b6873406fb778c0b$export$a915db169f144f37.tagName, this.nodes.size);
            this.addNode(printReactionOperatorColumnSums);
        }
    }
    /**
     * Remove the printReactionOperatorColumnSums.
     */ removePrintReactionOperatorColumnSums() {
        let i = this.index.get($b6873406fb778c0b$export$a915db169f144f37.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$a915db169f144f37.tagName);
        }
    }
    /**
     * @returns The PrintTunnellingCoefficients or undefined.
     */ getPrintTunnellingCoefficients() {
        let i = this.index.get($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     */ setPrintTunnellingCoefficients(printTunnellingCoefficients) {
        let i = this.index.get($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName);
        if (i != undefined) this.nodes.set(i, printTunnellingCoefficients);
        else {
            this.index.set($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName, this.nodes.size);
            this.addNode(printTunnellingCoefficients);
        }
    }
    /**
     * Remove the printTunnellingCoefficients.
     */ removePrintTunnellingCoefficients() {
        let i = this.index.get($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$8a58e03b7b3f0f47.tagName);
        }
    }
    /**
     * @returns The PrintGrainkfE or undefined.
     */ getPrintGrainkfE() {
        let i = this.index.get($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainkfE The printGrainkfE.
     */ setPrintGrainkfE(printGrainkfE) {
        let i = this.index.get($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName);
        if (i != undefined) this.nodes.set(i, printGrainkfE);
        else {
            this.index.set($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName, this.nodes.size);
            this.addNode(printGrainkfE);
        }
    }
    /**
     * Remove the printGrainkfE.
     */ removePrintGrainkfE() {
        let i = this.index.get($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$f8d814a406a0ff5b.tagName);
        }
    }
    /**
     * @returns The PrintGrainBoltzmann or undefined.
     */ getPrintGrainBoltzmann() {
        let i = this.index.get($b6873406fb778c0b$export$e7fff349901f700d.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainBoltzmann The printGrainBoltzmann.
     */ setPrintGrainBoltzmann(printGrainBoltzmann) {
        let i = this.index.get($b6873406fb778c0b$export$e7fff349901f700d.tagName);
        if (i != undefined) this.nodes.set(i, printGrainBoltzmann);
        else {
            this.index.set($b6873406fb778c0b$export$e7fff349901f700d.tagName, this.nodes.size);
            this.addNode(printGrainBoltzmann);
        }
    }
    /**
     * Remove the printGrainBoltzmann.
     */ removePrintGrainBoltzmann() {
        let i = this.index.get($b6873406fb778c0b$export$e7fff349901f700d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$e7fff349901f700d.tagName);
        }
    }
    /**
     * @returns The PrintGrainkbE or undefined.
     */ getPrintGrainkbE() {
        let i = this.index.get($b6873406fb778c0b$export$55888ef4e813a34d.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainkbE The printGrainkbE.
     */ setPrintGrainkbE(printGrainkbE) {
        let i = this.index.get($b6873406fb778c0b$export$55888ef4e813a34d.tagName);
        if (i != undefined) this.nodes.set(i, printGrainkbE);
        else {
            this.index.set($b6873406fb778c0b$export$55888ef4e813a34d.tagName, this.nodes.size);
            this.addNode(printGrainkbE);
        }
    }
    /**
     * Remove the printGrainkbE.
     */ removePrintGrainkbE() {
        let i = this.index.get($b6873406fb778c0b$export$55888ef4e813a34d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$55888ef4e813a34d.tagName);
        }
    }
    /**
     * @returns The eigenvalues or undefined.
     */ getEigenvalues() {
        let i = this.index.get($b6873406fb778c0b$export$2453e311f702d9c7.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param eigenvalues The eigenvalues.
     */ setEigenvalues(eigenvalues) {
        let i = this.index.get($b6873406fb778c0b$export$2453e311f702d9c7.tagName);
        if (i != undefined) this.nodes.set(i, eigenvalues);
        else {
            this.index.set($b6873406fb778c0b$export$2453e311f702d9c7.tagName, this.nodes.size);
            this.addNode(eigenvalues);
        }
    }
    /**
     * Remove the eigenvalues.
     */ removeEigenvalues() {
        let i = this.index.get($b6873406fb778c0b$export$2453e311f702d9c7.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$2453e311f702d9c7.tagName);
        }
    }
    /**
     * @returns The hideInactive or undefined.
     */ getHideInactive() {
        let i = this.index.get($b6873406fb778c0b$export$9d51752a8549e2d6.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param hideInactive The hideInactive.
     */ setHideInactive(hideInactive) {
        let i = this.index.get($b6873406fb778c0b$export$9d51752a8549e2d6.tagName);
        if (i != undefined) this.nodes.set(i, hideInactive);
        else {
            this.index.set($b6873406fb778c0b$export$9d51752a8549e2d6.tagName, this.nodes.size);
            this.addNode(hideInactive);
        }
    }
    /**
     * Remove the hideInactive.
     */ removeHideInactive() {
        let i = this.index.get($b6873406fb778c0b$export$9d51752a8549e2d6.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$9d51752a8549e2d6.tagName);
        }
    }
    /**
     * @returns The diagramEnergyOffset or undefined.
     */ getDiagramEnergyOffset() {
        let i = this.index.get($b6873406fb778c0b$export$159b5d3263f1049a.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */ setDiagramEnergyOffset(diagramEnergyOffset) {
        let i = this.index.get($b6873406fb778c0b$export$159b5d3263f1049a.tagName);
        if (i != undefined) this.nodes.set(i, diagramEnergyOffset);
        else {
            this.index.set($b6873406fb778c0b$export$159b5d3263f1049a.tagName, this.nodes.size);
            this.addNode(diagramEnergyOffset);
        }
    }
    /**
     * Remove the diagramEnergyOffset.
     */ removeDiagramEnergyOffset() {
        let i = this.index.get($b6873406fb778c0b$export$159b5d3263f1049a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$159b5d3263f1049a.tagName);
        }
    }
}






class $8677001474399221$export$f99233281efd08a0 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        this.tagName = "me:title";
    }
    /**
     * @param value 
     */ constructor(attributes, value){
        super(attributes, $8677001474399221$export$f99233281efd08a0.tagName, value);
    }
}
class $8677001474399221$export$19d70f3647dee606 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "moleculeList";
    }
    /**
     * @param attributes The attributes.
     * @param molecules The molecules.
     */ constructor(attributes, molecules){
        super(attributes, $8677001474399221$export$19d70f3647dee606.tagName);
        this.index = new Map();
        if (molecules != undefined) molecules.forEach((molecule)=>{
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the molecule.
     * @returns The molecule.
     */ getMolecule(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a molecule.
     * @param id The id of the molecule to remove.
     */ removeMolecule(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a molecule.
     * @param molecule The molecule.
     */ addMolecule(molecule) {
        let index = this.index.get(molecule.id);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log("Replaced molecule with id " + molecule.id);
        } else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.id, this.nodes.size - 1);
        }
    }
}
class $8677001474399221$export$44466a39ca846289 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactionList";
    }
    /**
     * @param attributes The attributes.
     * @param reactions The reactions.
     */ constructor(attributes, reactions){
        super(attributes, $8677001474399221$export$44466a39ca846289.tagName);
        this.index = new Map();
        if (reactions != undefined) reactions.forEach((reaction)=>{
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the reaction.
     * @returns The reaction.
     */ getReaction(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a reaction.
     * @param id The id of the reaction to remove.
     */ removeReaction(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a reaction.
     * @param reaction The reaction.
     */ addReaction(reaction) {
        let index = this.index.get(reaction.id);
        if (index !== undefined) {
            this.nodes.set(index, reaction);
            console.log("Replaced reaction with id " + reaction.id);
        } else {
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        }
    }
}
class $8677001474399221$export$692079bb871c6039 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        this.tagName = "me:mesmer";
    }
    static{
        /**
     * The header of the XML file.
     */ this.header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
    }
    /**
     * @param attributes The attributes.
     * @param moleculeList The molecule list.
     * @param reactionList The reaction list.
     * @param conditions The conditions.
     * @param modelParameters The model parameters.
     * @param control The control.
     */ constructor(attributes, title, moleculeList, reactionList, conditions, modelParameters, control){
        super(attributes, $8677001474399221$export$692079bb871c6039.tagName);
        this.index = new Map();
        if (title != undefined) {
            this.index.set($8677001474399221$export$f99233281efd08a0.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (moleculeList != undefined) {
            this.index.set($8677001474399221$export$19d70f3647dee606.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
        if (reactionList != undefined) {
            this.index.set($8677001474399221$export$44466a39ca846289.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
        if (conditions != undefined) {
            this.index.set((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName, this.nodes.size);
            this.addNode(conditions);
        }
        if (modelParameters != undefined) {
            this.index.set((0, $8883b31bd809eb64$export$77f098867dc64198).tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
        if (control != undefined) {
            this.index.set((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, this.nodes.size);
            this.addNode(control);
        }
    }
    /**
     * @returns The title.
     */ getTitle() {
        let i = this.index.get($8677001474399221$export$f99233281efd08a0.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the title.
     * @param title The title.
     */ setTitle(title) {
        let i = this.index.get($8677001474399221$export$f99233281efd08a0.tagName);
        if (i != undefined) this.nodes.set(i, title);
        else {
            this.index.set($8677001474399221$export$f99233281efd08a0.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * @returns The molecule list.
     */ getMoleculeList() {
        let i = this.index.get($8677001474399221$export$19d70f3647dee606.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the molecule list.
     * @param moleculeList The molecule list.
     */ setMoleculeList(moleculeList) {
        let i = this.index.get($8677001474399221$export$19d70f3647dee606.tagName);
        if (i != undefined) this.nodes.set(i, moleculeList);
        else {
            this.index.set($8677001474399221$export$19d70f3647dee606.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
    }
    /**
     * @returns The reaction list.
     */ getReactionList() {
        let i = this.index.get($8677001474399221$export$44466a39ca846289.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the reaction list.
     * @param reactionList The reaction list.
     */ setReactionList(reactionList) {
        let i = this.index.get($8677001474399221$export$44466a39ca846289.tagName);
        if (i != undefined) this.nodes.set(i, reactionList);
        else {
            this.index.set($8677001474399221$export$44466a39ca846289.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
    }
    /**
     * @returns The conditions.
     */ getConditions() {
        let i = this.index.get((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the conditions.
     * @param conditions The conditions.
     */ setConditions(conditions) {
        let i = this.index.get((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
        if (i != undefined) this.nodes.set(i, conditions);
        else {
            this.index.set((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName, this.nodes.size);
            this.addNode(conditions);
        }
    }
    /**
     * @returns The model parameters.
     */ getModelParameters() {
        let i = this.index.get((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the model parameters.
     * @param modelParameters The model parameters.
     */ setModelParameters(modelParameters) {
        let i = this.index.get((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
        if (i != undefined) this.nodes.set(i, modelParameters);
        else {
            this.index.set((0, $8883b31bd809eb64$export$77f098867dc64198).tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
    }
    /**
     * @returns The control.
     */ getControl() {
        let i = this.index.get((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the control.
     * @param control The control.
     */ setControl(control) {
        let i = this.index.get((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
        if (i != undefined) this.nodes.set(i, control);
        else {
            this.index.set((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, this.nodes.size);
            this.addNode(control);
        }
    }
}


/**
 * The font sizes for different levels of the GUI.
 */ let $7e68913db756e51f$var$fontSize1 = "1.5em";
let $7e68913db756e51f$var$fontSize2 = "1.25em";
let $7e68913db756e51f$var$fontSize3 = "1.0em";
let $7e68913db756e51f$var$fontSize4 = "0.75em";
/**
 * Margins for spacing GUI components.
 */ let $7e68913db756e51f$var$margin0 = "0px";
let $7e68913db756e51f$var$margin1 = "1px";
let $7e68913db756e51f$var$margin2 = "2px";
let $7e68913db756e51f$var$margin5 = "5px";
let $7e68913db756e51f$var$margin25 = "25px";
let $7e68913db756e51f$var$margin50 = "50px";
let $7e68913db756e51f$var$margin75 = "75px";
/**
 * Units for different things.
 */ let $7e68913db756e51f$var$unitsEnergy = [
    "kJ/mol",
    "cm-1",
    "kcal/mol",
    "Hartree"
];
let $7e68913db756e51f$var$unitsRotConsts = [
    "cm-1",
    "GHz"
];
/**
 * For mesmer.
 */ let $7e68913db756e51f$var$mesmer;
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
 * The conditions.
 */ let $7e68913db756e51f$var$conditions;
/**
 * The model parameters.
 */ let $7e68913db756e51f$var$modelParameters;
/**
 * The control.
 */ let $7e68913db756e51f$var$control;
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
 * The XML title and text elements.
 */ let $7e68913db756e51f$var$xml_title;
let $7e68913db756e51f$var$xml_text;
/**
 * Load the XML file.
 */ function $7e68913db756e51f$var$loadXML() {
    let inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.onchange = function() {
        if (inputElement.files) {
            for(let i = 0; i < inputElement.files.length; i++)console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            let file = inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            $7e68913db756e51f$var$input_xml_filename = file.name;
            if ($7e68913db756e51f$var$xml_text != null) {
                let reader = new FileReader();
                let chunkSize = 1048576; // 1MB
                let start = 0;
                let contents = "";
                reader.onload = function(e) {
                    if (e.target == null) throw new Error("Event target is null");
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
    inputElement.click();
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
    // Set up for XML loading.
    window.loadXML = function() {
        $7e68913db756e51f$var$loadXML();
    //reload();
    };
});
/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */ function $7e68913db756e51f$var$parse(xml) {
    // Process the XML.
    let xml_mesmer = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8677001474399221$export$692079bb871c6039).tagName);
    $7e68913db756e51f$var$mesmer = new (0, $8677001474399221$export$692079bb871c6039)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName((0, $8677001474399221$export$f99233281efd08a0).tagName);
    if (xml_title.length != 1) throw new Error("Multiple " + (0, $8677001474399221$export$f99233281efd08a0).tagName + " tags found");
    else {
        let title = xml_title[0].childNodes[0].nodeValue.trim();
        let titleNode = new (0, $8677001474399221$export$f99233281efd08a0)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_title[0]), title);
        let titleElement = document.getElementById("title");
        $7e68913db756e51f$var$mesmer.setTitle(titleNode);
        // Create a new div element for the input.
        let divElement = document.createElement("div");
        divElement.style.marginTop = $7e68913db756e51f$var$margin1;
        divElement.style.marginBottom = $7e68913db756e51f$var$margin1;
        // Create a text node.
        let textNode = document.createTextNode("Title: ");
        divElement.appendChild(textNode);
        // Create a new input element.
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = title;
        inputElement.style.fontSize = $7e68913db756e51f$var$fontSize1;
        divElement.appendChild(inputElement);
        // Add the new div element to the parent of the titleElement.
        titleElement.parentNode?.insertBefore(divElement, titleElement);
        // Remove the original titleElement.
        titleElement.parentNode?.removeChild(titleElement);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement, 0);
        console.log("inputElement.value=" + inputElement.value);
        // Add event listener to inputElement.
        inputElement.addEventListener("change", function() {
            if (inputElement.value != title) titleNode.value = inputElement.value;
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement, 0);
        });
        // Create a collapsible div for molecules
        let moleculesElement = document.getElementById("molecules");
        if (moleculesElement == null) ;
        else {
            let moleculeListElement = $7e68913db756e51f$var$processMoleculeList(xml);
            moleculesElement.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(moleculeListElement, "Molecules", "molecules_button", $7e68913db756e51f$var$fontSize1, $7e68913db756e51f$var$margin0, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, "moleculesList"));
            $7e68913db756e51f$var$mesmer.setMoleculeList(new (0, $8677001474399221$export$19d70f3647dee606)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(moleculeListElement), Array.from($7e68913db756e51f$var$molecules.values())));
        }
        // Create a collapsible div for reactions
        let reactionsElement = document.getElementById("reactions");
        if (reactionsElement == null) ;
        else {
            let reactionListElement = $7e68913db756e51f$var$processReactionList(xml);
            reactionsElement.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(reactionListElement, "Reactions", "reactions_button", $7e68913db756e51f$var$fontSize1, $7e68913db756e51f$var$margin0, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, "reactionsList"));
            $7e68913db756e51f$var$mesmer.setReactionList(new (0, $8677001474399221$export$44466a39ca846289)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(reactionListElement), Array.from($7e68913db756e51f$var$reactions.values())));
        }
        // Display reaction diagram. 
        $7e68913db756e51f$var$displayReactionsDiagram();
        // Create a collapsible div for conditions
        let conditionsElement = document.getElementById("conditions");
        if (conditionsElement == null) ;
        else {
            let conditionsListElement = $7e68913db756e51f$var$processConditions(xml);
            conditionsElement.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(conditionsListElement, "Conditions", "conditions_button", $7e68913db756e51f$var$fontSize1, $7e68913db756e51f$var$margin0, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, "conditionsList"));
            $7e68913db756e51f$var$mesmer.setConditions($7e68913db756e51f$var$conditions);
        }
        // Create a collapsible div for model parameters
        let modelParametersElement = document.getElementById("modelParameters");
        if (modelParametersElement == null) ;
        else {
            let modelParametersListElement = $7e68913db756e51f$var$processModelParameters(xml);
            modelParametersElement.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(modelParametersListElement, "Model Parameters", "modelParameters_button", $7e68913db756e51f$var$fontSize1, $7e68913db756e51f$var$margin0, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, "modelParametersList"));
            $7e68913db756e51f$var$mesmer.setModelParameters($7e68913db756e51f$var$modelParameters);
        }
        // Create a collapsible div for control
        let controlElement = document.getElementById("control");
        if (controlElement == null) ;
        else {
            let controlListElement = $7e68913db756e51f$var$processControl(xml);
            controlElement.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(controlListElement, "Control", "control_button", $7e68913db756e51f$var$fontSize1, $7e68913db756e51f$var$margin0, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, "controlList"));
            $7e68913db756e51f$var$mesmer.setControl($7e68913db756e51f$var$control);
        }
        // Collapse and set up action listeners for all collapsible content.
        (0, $f0396edd0a5c99f7$export$2883f21c1f82e07d)();
    }
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ function $7e68913db756e51f$var$processMoleculeList(xml) {
    // Create div to contain the molecules list.
    let moleculeListDiv = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_moleculeList = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8677001474399221$export$19d70f3647dee606).tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
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
    // Process the XML "molecule" elements.
    let xml_molecules = xml_moleculeList.getElementsByTagName((0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_molecules.length; i++){
        let moleculeDiv = document.createElement("div");
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
        //console.log("atomsNode=" + atomsNode);
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
        // Create molecule.
        let molecule = new (0, $ef5b9341e5193b70$export$3da9759ad07746a3)(attributes, atomsNode, bondsNode);
        $7e68913db756e51f$var$molecules.set(molecule.id, molecule);
        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_PLs = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        if (xml_PLs.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + " but finding " + xml_PLs.length + "!");
        if (xml_PLs.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDiv = document.createElement("div");
            let buttonId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName;
            let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "_";
            let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(plDiv, (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName, buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl = new (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            for(let j = 0; j < xml_Ps.length; j++){
                let p = new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) $7e68913db756e51f$var$processProperty(p, $7e68913db756e51f$var$unitsEnergy, molecule, xml_Ps[j], plDiv, $7e68913db756e51f$var$margin75);
                else if (p.dictRef == (0, $ef5b9341e5193b70$export$984abe26ded13ee0).dictRef) $7e68913db756e51f$var$processProperty(p, $7e68913db756e51f$var$unitsRotConsts, molecule, xml_Ps[j], plDiv, $7e68913db756e51f$var$margin75);
                else $7e68913db756e51f$var$processProperty(p, undefined, molecule, xml_Ps[j], plDiv, $7e68913db756e51f$var$margin75);
            }
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            if (xml_Ps.length != 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "?");
            // Create a new Property.
            let p = new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Ps[0]));
            molecule.setProperties(p);
            if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) $7e68913db756e51f$var$processProperty(p, $7e68913db756e51f$var$unitsEnergy, molecule, xml_Ps[0], moleculeDiv, $7e68913db756e51f$var$margin75);
            else if (p.dictRef == (0, $ef5b9341e5193b70$export$984abe26ded13ee0).dictRef) $7e68913db756e51f$var$processProperty(p, $7e68913db756e51f$var$unitsRotConsts, molecule, xml_Ps[0], moleculeDiv, $7e68913db756e51f$var$margin75);
            else $7e68913db756e51f$var$processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, $7e68913db756e51f$var$margin75);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
        }
        // Organise EnergyTransferModel.
        let xml_ETMs = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$499950da20810ac9).tagName);
        if (xml_ETMs.length > 0) {
            if (xml_ETMs.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName + " but finding " + xml_ETMs.length + "!");
            let etm = new (0, $ef5b9341e5193b70$export$499950da20810ac9)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ETMs[0]));
            $7e68913db756e51f$var$processEnergyTransferModel(etm, molecule, xml_ETMs[0], moleculeDiv, $7e68913db756e51f$var$margin75);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$499950da20810ac9).tagName);
        }
        // Organise DOSCMethod.
        let xml_DOSCMethod = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + " but finding " + xml_DOSCMethod.length + "!");
            let dOSCMethod = new (0, $ef5b9341e5193b70$export$bbdce6c921702068)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_DOSCMethod[0]));
            $7e68913db756e51f$var$processDOSCMethod(dOSCMethod, molecule, $7e68913db756e51f$var$margin50, moleculeDiv);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");
            let extraDOSCMethod = new (0, $ef5b9341e5193b70$export$ae98b7db6376163d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let buttonId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName;
            let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName + "_";
            let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(extraDOSCMethodDiv, (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName, buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
            moleculeDiv.appendChild(collapsibleDiv);
            // Read bondRef.
            let bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName);
            let bondRef;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                bondRef = new (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(bondRefs[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName);
            let hinderedRotorPotential;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                // Load PotentialPoints.
                let potentialPoints = [];
                let xml_potentialPoints = hinderedRotorPotentials[0].getElementsByTagName((0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName);
                for(let k = 0; k < xml_potentialPoints.length; k++)potentialPoints.push(new (0, $ef5b9341e5193b70$export$86ca5149fcde8feb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_potentialPoints[k])));
                hinderedRotorPotential = new (0, $ef5b9341e5193b70$export$9b8e857b9a081d2)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(hinderedRotorPotentials[0]), potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }
            // Read periodicities.
            let xml_periodicities = xml_DOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9513c16afdf7d852).tagName);
            let periodicity;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                periodicity = new (0, $ef5b9341e5193b70$export$9513c16afdf7d852)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_periodicities[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_periodicities[0]))));
                extraDOSCMethod.setPeriodicity(periodicity);
            }
            molecule.setExtraDOSCMethod(extraDOSCMethod);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
        let xml_ReservoirSize = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            console.warn("ReservoirSize detected: This is not displayed in the GUI - more coding needed!");
            molecule.setReservoirSize(new (0, $ef5b9341e5193b70$export$97850fe2f2906f00)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ReservoirSize[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ReservoirSize[0])))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(moleculeDiv, molecule.getLabel(), molecule.tagName + "_" + molecule.id + "_button", $7e68913db756e51f$var$fontSize2, $7e68913db756e51f$var$margin25, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, molecule.tagName + "_" + molecule.id);
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function $7e68913db756e51f$var$displayXML(xml) {
    //console.log("xml=" + xml);
    if ($7e68913db756e51f$var$xml_title != null) $7e68913db756e51f$var$xml_title.innerHTML = $7e68913db756e51f$var$input_xml_filename;
    if ($7e68913db756e51f$var$xml_text != null) $7e68913db756e51f$var$xml_text.innerHTML = (0, $cc8c7201a9bad777$export$438fa7935f716bdf)(xml);
}
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 * @param margin The margin.
 */ function $7e68913db756e51f$var$processProperty(p, units, molecule, element, moleculeDiv, margin) {
    // Handle scalar or array property
    let scalarNodes = element.getElementsByTagName((0, $ef5b9341e5193b70$export$d29b345ea2be5072).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$d29b345ea2be5072).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(scalarNodes[0]);
        let value = parseFloat(inputString);
        let psAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(scalarNodes[0]);
        let ps = new (0, $ef5b9341e5193b70$export$d29b345ea2be5072)(psAttributes, value);
        p.setProperty(ps);
        let label = p.dictRef;
        // Create a new div element for the input.
        let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", molecule.id + "_" + p.dictRef, (event)=>{
            if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(ps, event.target);
        }, inputString, label);
        inputDiv.style.marginLeft = margin;
        inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
        inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
        let inputElement = inputDiv.querySelector("input");
        inputElement.value = inputString;
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
        inputElement.addEventListener("change", (event)=>{
            let eventTarget = event.target;
            inputString = eventTarget.value;
            ps = p.getProperty();
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) {
                // Update the min and max molecule energy.
                if (value < $7e68913db756e51f$var$minMoleculeEnergy) $7e68913db756e51f$var$minMoleculeEnergy = value;
                if (value > $7e68913db756e51f$var$maxMoleculeEnergy) $7e68913db756e51f$var$maxMoleculeEnergy = value;
                // Update the molecule energy diagram.
                $7e68913db756e51f$var$displayReactionsDiagram();
            }
        });
        $7e68913db756e51f$var$addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
        moleculeDiv.appendChild(inputDiv);
    } else {
        let arrayNodes = element.getElementsByTagName((0, $ef5b9341e5193b70$export$9f93a3fdf2490572).tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$9f93a3fdf2490572).tagName + " but finding " + arrayNodes.length + "!");
            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(arrayNodes[0]);
            let values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
            let paAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(arrayNodes[0]);
            let pa = new (0, $ef5b9341e5193b70$export$9f93a3fdf2490572)(paAttributes, values);
            p.setProperty(pa);
            let label = p.dictRef;
            // Create a new div element for the input.
            let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("text", molecule.id + "_" + p.dictRef, (event)=>{
                if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$819b5ff7dff3652c(pa, event.target);
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
            inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
            let inputElement = inputDiv.querySelector("input");
            inputElement.value = inputString;
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            inputElement.addEventListener("change", (event)=>{
                let eventTarget = event.target;
                inputString = eventTarget.value;
                pa = p.getProperty();
                values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            });
            $7e68913db756e51f$var$addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
            moleculeDiv.appendChild(inputDiv);
        } else throw new Error("Expecting " + (0, $ef5b9341e5193b70$export$d29b345ea2be5072).tagName + " or " + (0, $ef5b9341e5193b70$export$9f93a3fdf2490572).tagName);
    }
}
/**
 * If there are a choice of units, then add a new select element to display/select them.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param inputDiv The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 */ function $7e68913db756e51f$var$addAnyUnits(units, attributes, inputDiv, id, tagOrDictRef, marginLeft, marginTop, marginBottom) {
    if (units != undefined) {
        let unitsSelectElement = $7e68913db756e51f$var$getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            unitsSelectElement.style.marginLeft = marginLeft;
            unitsSelectElement.style.marginTop = marginTop;
            unitsSelectElement.style.marginBottom = marginBottom;
            inputDiv.appendChild(unitsSelectElement);
        }
    } else {
        let units = attributes.get("units");
        if (units != undefined) {
            let label = document.createElement("label");
            label.textContent = units;
            label.style.marginLeft = marginLeft;
            label.style.marginTop = marginTop;
            label.style.marginBottom = marginBottom;
            inputDiv.appendChild(label);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */ function $7e68913db756e51f$var$getUnitsSelectElement(units, attributes, id, tagOrDictRef) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let selectElement = (0, $f0396edd0a5c99f7$export$16861bfc2f6300b2)(units, "Units", id);
        // Set the initial value to the units.
        selectElement.value = psUnits;
        // Add event listener to selectElement.
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
        selectElement.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLSelectElement) {
                attributes.set("units", event.target.value);
                console.log("Set " + tagOrDictRef + " units to " + event.target.value);
            }
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
        });
        return selectElement;
    }
    return undefined;
}
/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param margin The margin.
 * @param moleculeDiv The molecule div.
 */ function $7e68913db756e51f$var$processDOSCMethod(dOSCMethod, molecule, margin, moleculeDiv) {
    let label = document.createElement("label");
    label.textContent = (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + ": ";
    let container = document.createElement("div");
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options = [
        "ClassicalRotors",
        "QMRotors"
    ];
    let selectElement = (0, $f0396edd0a5c99f7$export$16861bfc2f6300b2)(options, "DOSCMethod", molecule.id + "_" + "Select_DOSCMethod");
    // Set the initial value to the DOSCMethod.
    selectElement.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    selectElement.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLSelectElement) {
            dOSCMethod.setXsiType(event.target.value);
            console.log("Set DOSCMethod to " + event.target.value);
        }
    });
    molecule.setDOSCMethod(dOSCMethod);
    container.appendChild(selectElement);
    container.style.marginLeft = margin;
    container.style.marginTop = $7e68913db756e51f$var$margin1;
    container.style.marginBottom = $7e68913db756e51f$var$margin1;
    moleculeDiv.appendChild(container);
}
/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */ function $7e68913db756e51f$var$processEnergyTransferModel(etm, molecule, element, moleculeDiv, margin) {
    let xml_deltaEDowns = element.getElementsByTagName((0, $ef5b9341e5193b70$export$16fc56ab40b12b45).tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmDiv = document.createElement("div");
        let buttonId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName;
        let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName + "_";
        let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(etmDiv, (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName, buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
        moleculeDiv.appendChild(collapsibleDiv);
        let deltaEDowns = [];
        for(let k = 0; k < xml_deltaEDowns.length; k++){
            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_deltaEDowns[k]);
            let value = parseFloat(inputString);
            let deltaEDownAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_deltaEDowns[k]);
            let deltaEDown = new (0, $ef5b9341e5193b70$export$16fc56ab40b12b45)(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = (0, $ef5b9341e5193b70$export$16fc56ab40b12b45).tagName;
            // Create a new div element for the input.
            let id = molecule.id + "_" + (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName + "_" + (0, $ef5b9341e5193b70$export$16fc56ab40b12b45).tagName + "_" + k;
            let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
                if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(deltaEDown, event.target);
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
            inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
            etmDiv.appendChild(inputDiv);
            let inputElement = inputDiv.querySelector("input");
            inputElement.value = inputString;
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            inputElement.addEventListener("change", (event)=>{
                let eventTarget = event.target;
                inputString = eventTarget.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            });
            let unitsLabel = document.createElement("label");
            unitsLabel.textContent = "cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
function $7e68913db756e51f$export$819b5ff7dff3652c(node, input) {
    let inputId = input.id;
    let inputString = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        let input = document.getElementById(inputId);
        input.value = (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ");
        return;
    }
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function(value) {
        if (!(0, $134d19e749bf0414$export$e90fb89750dba83f)(value)) success = false;
        values.push(parseFloat(value));
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        let input = document.getElementById(inputId);
        input.value = (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) console.log("Changed " + node.tagName + ' from: "' + inputString + '" to: "' + (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ") + '"');
    else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        let input = document.getElementById(inputId);
        input.value = (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ");
    }
}
window.setNumberArrayNode = $7e68913db756e51f$export$819b5ff7dff3652c;
function $7e68913db756e51f$export$b1e4cbf5b56e0e21(node, input) {
    let inputId = input.id;
    //let moleculeID: string = inputId.split("_")[0];
    //let molecule: Molecule | undefined = molecules.get(moleculeID);
    //if (molecule != undefined) {
    if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log("Value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        let inputElement = document.getElementById(inputId);
        inputElement.value = node.value.toString();
    }
//console.log("molecule=" + molecule);
//}
}
window.set = $7e68913db756e51f$export$b1e4cbf5b56e0e21;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$processReactionList(xml) {
    // Create div to contain the reaction list.
    let reactionListDiv = document.createElement("div");
    reactionListDiv.style.marginTop = $7e68913db756e51f$var$margin1;
    reactionListDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
    // Get the XML "reactionList" element.
    let xml_reactionList = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8677001474399221$export$44466a39ca846289).tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames = new Set();
    xml_reactionList.childNodes.forEach(function(node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size != 1) {
        if (!(reactionListTagNames.size == 2 && reactionListTagNames.has("#text"))) {
            console.error("reactionListTagNames:");
            reactionListTagNames.forEach((x)=>console.error(x));
            throw new Error("Additional tag names in reactionList:");
        }
    }
    if (!reactionListTagNames.has((0, $6f7aa7a716962086$export$d2ae4167a30cf6bb).tagName)) throw new Error('Expecting tags with "' + (0, $6f7aa7a716962086$export$d2ae4167a30cf6bb).tagName + '" tagName but there are none!');
    // Process the XML "reaction" elements.
    let xml_reactions = xml_reactionList.getElementsByTagName((0, $6f7aa7a716962086$export$d2ae4167a30cf6bb).tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_reactions.length; i++){
        let reactionDiv = document.createElement("div");
        // Set attributes.
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactions[i]);
        let reactionTagNames = new Set();
        let cns = xml_reactions[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for(let j = 0; j < cns.length; j++){
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!reactionTagNames.has(cn.nodeName)) reactionTagNames.add(cn.nodeName);
            else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
            if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
        //console.log(cn.nodeName);
        }
        // Create reaction.
        let reaction = new (0, $6f7aa7a716962086$export$d2ae4167a30cf6bb)(attributes);
        $7e68913db756e51f$var$reactions.set(reaction.id, reaction);
        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName);
        reactionTagNames.delete((0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new div for the reactants.
            let reactantsDiv = document.createElement("div");
            let reactants = [];
            for(let j = 0; j < xml_reactants.length; j++){
                let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_reactants[j], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                let molecule = new (0, $6f7aa7a716962086$export$e8a062bb2fc9e2ba)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule));
                let reactant = new (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let container = document.createElement("div");
                let label = document.createElement("label");
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options = [
                    "deficientReactant",
                    "excessReactant",
                    "modelled"
                ];
                let selectElement = (0, $f0396edd0a5c99f7$export$16861bfc2f6300b2)(options, "Role", molecule.ref + "_" + "Select_Role");
                // Set the initial value.
                selectElement.value = molecule.role;
                // Add event listener to selectElement.
                selectElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
                });
                container.appendChild(selectElement);
                container.style.marginLeft = $7e68913db756e51f$var$margin75;
                container.style.marginTop = $7e68913db756e51f$var$margin1;
                container.style.marginBottom = $7e68913db756e51f$var$margin1;
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let buttonId = reaction.id + "_" + (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName;
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName + "_";
            let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(reactantsDiv, "Reactants", buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
        }
        // Load products.
        let xml_products = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$264ad599d7cef668).tagName);
        reactionTagNames.delete((0, $6f7aa7a716962086$export$264ad599d7cef668).tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            let productsDiv = document.createElement("div");
            let products = [];
            for(let j = 0; j < xml_products.length; j++){
                let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_products[j], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                let molecule = new (0, $6f7aa7a716962086$export$e8a062bb2fc9e2ba)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule));
                let product = new (0, $6f7aa7a716962086$export$264ad599d7cef668)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_products[j]), molecule);
                products.push(product);
                // Create a new div for the role.
                let container = document.createElement("div");
                let label = document.createElement("label");
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options = [
                    "modelled",
                    "sink"
                ];
                let selectElement = (0, $f0396edd0a5c99f7$export$16861bfc2f6300b2)(options, "Role", molecule.ref + "_" + "Select_Role");
                // Set the initial value.
                selectElement.value = molecule.role;
                // Add event listener to selectElement.
                selectElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
                });
                container.appendChild(selectElement);
                container.style.marginLeft = $7e68913db756e51f$var$margin75;
                container.style.marginTop = $7e68913db756e51f$var$margin1;
                container.style.marginBottom = $7e68913db756e51f$var$margin1;
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create a new collapsible div for the products.
            let buttonId = reaction.id + "_" + (0, $6f7aa7a716962086$export$264ad599d7cef668).tagName;
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$264ad599d7cef668).tagName + "_";
            let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(productsDiv, "Products", buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
        }
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName + " but finding " + xml_tunneling.length + "!");
            let tunneling = new (0, $6f7aa7a716962086$export$c3cf6f96dac11421)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            // Create a new div for the tunneling.
            let container = document.createElement("div");
            let label = document.createElement("label");
            label.textContent = (0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName + ": ";
            container.appendChild(label);
            // Create a HTMLSelectElement to select the Tunneling.
            let options = [
                "Eckart",
                "WKB"
            ];
            let selectElement = (0, $f0396edd0a5c99f7$export$16861bfc2f6300b2)(options, "Tunneling", reaction.id + "_" + "Select_Tunneling");
            // Set the initial value.
            selectElement.value = tunneling.getName();
            // Add event listener to selectElement.
            selectElement.addEventListener("change", (event)=>{
                if (event.target instanceof HTMLSelectElement) {
                    tunneling.setName(event.target.value);
                    console.log("Set Tunneling to " + event.target.value);
                }
            });
            container.appendChild(selectElement);
            container.style.marginLeft = $7e68913db756e51f$var$margin50;
            container.style.marginTop = $7e68913db756e51f$var$margin1;
            container.style.marginBottom = $7e68913db756e51f$var$margin1;
            reactionDiv.appendChild(container);
        }
        // Load transition states.
        let xml_transitionStates = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$145c1ed87b1a2216).tagName);
        //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
        if (xml_transitionStates.length > 0) {
            let transitionStatesDiv = document.createElement("div");
            let transitionStates = [];
            for(let j = 0; j < xml_transitionStates.length; j++){
                let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_transitionStates[j], (0, $ef5b9341e5193b70$export$3da9759ad07746a3).tagName);
                let molecule = new (0, $6f7aa7a716962086$export$e8a062bb2fc9e2ba)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule));
                let transitionState = new (0, $6f7aa7a716962086$export$145c1ed87b1a2216)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label = document.createElement("label");
                label.textContent = molecule.ref + " role: transitionState";
                label.style.marginLeft = $7e68913db756e51f$var$margin75;
                label.style.marginTop = $7e68913db756e51f$var$margin1;
                label.style.marginBottom = $7e68913db756e51f$var$margin1;
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let buttonId = reaction.id + "_" + (0, $6f7aa7a716962086$export$145c1ed87b1a2216).tagName;
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$145c1ed87b1a2216).tagName + "_";
            let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(transitionStatesDiv, "Transition States", buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
        }
        // Load MCRCMethod.
        //console.log("Load MCRCMethod...");
        let xml_MCRCMethod = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName);
        //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
        //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
        if (xml_MCRCMethod.length > 0) {
            if (xml_MCRCMethod.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName + " but finding " + xml_MCRCMethod.length + "!");
            else {
                let mCRCMethodDiv = document.createElement("div");
                let mCRCMethod;
                let mCRCMethodAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_MCRCMethod[0]);
                let name = mCRCMethodAttributes.get("name");
                //console.log(MCRCMethod.tagName + " name=" + name);
                if (name == undefined || name == (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType2) {
                    let type = mCRCMethodAttributes.get("xsi:type");
                    mCRCMethod = new (0, $6f7aa7a716962086$export$191e95ebb11cc88)(mCRCMethodAttributes);
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    if (type == (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType || type == (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType2) {
                        let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_preExponential[0]);
                                let value = parseFloat(inputString);
                                let preExponentialAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_preExponential[0]);
                                let preExponential = new (0, $6f7aa7a716962086$export$38ce90ac8b004d85)(preExponentialAttributes, value);
                                mCRCMethod.setPreExponential(preExponential);
                                let label = (0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).tagName + "_" + (0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName;
                                let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(preExponential, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = $7e68913db756e51f$var$margin75;
                                inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                                inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName, (0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_activationEnergy[0]);
                                let value = parseFloat(inputString);
                                let activationEnergyAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_activationEnergy[0]);
                                let activationEnergy = new (0, $6f7aa7a716962086$export$1bdc69d2439d749d)(activationEnergyAttributes, value);
                                mCRCMethod.setActivationEnergy(activationEnergy);
                                let label = (0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).tagName + "_" + (0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName;
                                let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(activationEnergy, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = $7e68913db756e51f$var$margin75;
                                inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                                inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName, (0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_tInfinity[0]);
                                let value = parseFloat(inputString);
                                let tInfinityAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tInfinity[0]);
                                let tInfinity = new (0, $6f7aa7a716962086$export$8d95dd32819bc86c)(tInfinityAttributes, value);
                                mCRCMethod.setTInfinity(tInfinity);
                                let label = (0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).tagName + "_" + (0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName;
                                let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(tInfinity, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = $7e68913db756e51f$var$margin75;
                                inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                                inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName, (0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName((0, $6f7aa7a716962086$export$d08982dd841d496f).tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_nInfinity[0]);
                                let value = parseFloat(inputString);
                                let nInfinityAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_nInfinity[0]);
                                let nInfinity = new (0, $6f7aa7a716962086$export$d08982dd841d496f)(nInfinityAttributes, value);
                                mCRCMethod.setNInfinity(nInfinity);
                                let label = (0, $6f7aa7a716962086$export$d08982dd841d496f).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).tagName + "_" + (0, $6f7aa7a716962086$export$d08982dd841d496f).tagName;
                                let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(nInfinity, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = $7e68913db756e51f$var$margin75;
                                inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                                inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$d08982dd841d496f).tagName, (0, $6f7aa7a716962086$export$d08982dd841d496f).tagName, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let buttonId = reaction.id + "_" + (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName;
                        let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName + "_";
                        let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mCRCMethodDiv, (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName, buttonId, $7e68913db756e51f$var$fontSize3, $7e68913db756e51f$var$margin50, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
                        reactionDiv.appendChild(collapsibleDiv);
                    } else throw new Error("Unexpected xsi:type=" + type);
                } else {
                    mCRCMethod = new (0, $6f7aa7a716962086$export$6fa70ee10f356b6)(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement("label");
                    mCRCMethodLabel.textContent = (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName + ": " + mCRCMethodAttributes.get("name");
                    mCRCMethodLabel.style.marginLeft = $7e68913db756e51f$var$margin50;
                    mCRCMethodLabel.style.marginTop = $7e68913db756e51f$var$margin1;
                    mCRCMethodLabel.style.marginBottom = $7e68913db756e51f$var$margin1;
                    mCRCMethodDiv.appendChild(mCRCMethodLabel);
                    reactionDiv.appendChild(mCRCMethodDiv);
                }
                reaction.setMCRCMethod(mCRCMethod);
            }
        }
        // Load excessReactantConc
        let xml_excessReactantConc = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$284227145ed02b04).tagName);
        if (xml_excessReactantConc.length > 0) {
            if (xml_excessReactantConc.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$284227145ed02b04).tagName + " but finding " + xml_excessReactantConc.length + "!");
            let excessReactantConc;
            let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_excessReactantConc[0])));
            excessReactantConc = new (0, $6f7aa7a716962086$export$284227145ed02b04)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
        }
        // Create a new collapsible div for the reaction.
        let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(reactionDiv, reaction.id + "(" + reaction.getLabel() + ")", reaction.tagName + "_" + reaction.id + "_button", $7e68913db756e51f$var$fontSize2, $7e68913db756e51f$var$margin25, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, reaction.tagName + "_" + reaction.id);
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(collapsibleDiv);
    }
    return reactionListDiv;
}
/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */ function $7e68913db756e51f$var$processConditions(xml) {
    console.log((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    // Create div to contain the conditions.
    let conditionsDiv = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_conditions = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    $7e68913db756e51f$var$conditions = new (0, $ae74a7b44a6504a1$export$363c7374d425f4ad)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_conditions));
    // Process any "bathGas" element.
    let xml_bathGases = xml_conditions.getElementsByTagName((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
    if (xml_bathGases.length > 0) {
        if (xml_bathGases.length > 1) throw new Error("Expecting 1 " + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + " but finding " + xml_bathGases.length + "!");
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGases[0]);
        let moleculeID = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGases[0]));
        let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(attributes, moleculeID);
        console.log("bathGas" + bathGas.toString());
        $7e68913db756e51f$var$conditions.setBathGas(bathGas);
        let bathGasLabel = document.createElement("label");
        bathGasLabel.textContent = (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + ": " + bathGas.value;
        bathGasLabel.style.marginLeft = $7e68913db756e51f$var$margin25;
        bathGasLabel.style.marginTop = $7e68913db756e51f$var$margin1;
        bathGasLabel.style.marginBottom = $7e68913db756e51f$var$margin1;
        conditionsDiv.appendChild(bathGasLabel);
    }
    // PTs
    let xml_PTss = xml_conditions.getElementsByTagName((0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName);
    if (xml_PTss.length > 0) {
        if (xml_PTss.length > 1) throw new Error("Expecting 1 " + (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName + " but finding " + xml_PTss.length + "!");
        let pTsDiv = document.createElement("div");
        conditionsDiv.appendChild(pTsDiv);
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTss[0]);
        let xml_PTPairs = xml_PTss[0].getElementsByTagName((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName);
        if (xml_PTPairs.length == 0) throw new Error("Expecting 1 or more " + (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + " but finding 0!");
        else {
            let pTs = new (0, $ae74a7b44a6504a1$export$3be0efe793283834)(attributes);
            for(let i = 0; i < xml_PTPairs.length; i++){
                let pTPair = new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTPairs[i]));
                // Create div for the pTPair.
                let pTPairDiv = document.createElement("div");
                pTPairDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
                pTPairDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                pTPairDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                pTsDiv.appendChild(pTPairDiv);
                // Add optional BathGas
                let xml_bathGass = xml_PTPairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGass[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGass[0])));
                    pTPair.setBathGas(bathGas);
                    // Create HTMLLabelElement for the BathGas.
                    let bathGasLabel = document.createElement("label");
                    bathGasLabel.textContent = (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + ": " + bathGas.value;
                    bathGasLabel.style.marginLeft = $7e68913db756e51f$var$margin50;
                    bathGasLabel.style.marginTop = $7e68913db756e51f$var$margin1;
                    bathGasLabel.style.marginBottom = $7e68913db756e51f$var$margin1;
                    pTPairDiv.appendChild(bathGasLabel);
                }
                // Add optional ExperimentRate
                let xml_experimentRates = xml_PTPairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    let experimentRate = new (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_experimentRates[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_experimentRates[0]))));
                    pTPair.setExperimentRate(experimentRate);
                    // Create a new div for the ExperimentRate.
                    let id = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName;
                    let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
                        if (event.target instanceof HTMLInputElement) $7e68913db756e51f$export$b1e4cbf5b56e0e21(experimentRate, event.target);
                    }, experimentRate.value.toString(), (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName);
                    inputDiv.style.marginLeft = $7e68913db756e51f$var$margin50;
                    inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                    inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                    pTPairDiv.appendChild(inputDiv);
                }
                // Create a new input element for the P.
                let p = pTPair.getP();
                let pId = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + "P";
                let t = pTPair.getT();
                let tId = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + "T";
                // Create a container div for P, T and units.
                let containerDiv = document.createElement("div");
                containerDiv.style.display = "flex";
                // Add the P input element to the container.
                let pInputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", pId, (event)=>{
                    if (event.target instanceof HTMLInputElement) {
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(event.target.value)) {
                            pTPair.setP(parseFloat(event.target.value));
                            console.log("Set P to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            let inputElement = document.getElementById(pId);
                            inputElement.value = pTPair.getP().toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(event.target);
                    }
                }, p.toString(), "P");
                let pInputElement = pInputDiv.querySelector("input");
                pInputElement.value = p.toString();
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(pInputElement);
                pInputDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
                pInputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                pInputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                containerDiv.appendChild(pInputDiv);
                // Add the T input element to the container.
                let tInputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", tId, (event)=>{
                    if (event.target instanceof HTMLInputElement) {
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(event.target.value)) {
                            pTPair.setT(parseFloat(event.target.value));
                            console.log("Set T to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            let inputElement = document.getElementById(tId);
                            inputElement.value = pTPair.getT().toString();
                        }
                    }
                }, t.toString(), "T");
                let tInputElement = tInputDiv.querySelector("input");
                tInputElement.value = t.toString();
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tInputElement);
                tInputDiv.style.marginLeft = $7e68913db756e51f$var$margin5;
                tInputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
                tInputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
                containerDiv.appendChild(tInputDiv);
                // Add any units to the container.
                $7e68913db756e51f$var$addAnyUnits(undefined, (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTPairs[i]), containerDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
                // Append the container div to the pTPairDiv.
                pTPairDiv.appendChild(containerDiv);
                // Create a collapsible container for the pTPairs.
                let buttonId = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + i;
                let contentDivId = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + i + "_";
                let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(pTPairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, buttonId, $7e68913db756e51f$var$fontSize2, $7e68913db756e51f$var$margin25, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1, contentDivId);
                pTsDiv.appendChild(collapsibleDiv);
                pTs.addPTpair(pTPair);
            }
            $7e68913db756e51f$var$conditions.setPTs(pTs);
        }
    }
    return conditionsDiv;
}
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ function $7e68913db756e51f$var$processModelParameters(xml) {
    console.log((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    // Create div to contain the modelParameters.
    let modelParametersDiv = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_modelParameters = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    $7e68913db756e51f$var$modelParameters = new (0, $8883b31bd809eb64$export$77f098867dc64198)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_modelParameters));
    // Process any "me:grainSize" elements.
    let xml_grainSizess = xml_modelParameters.getElementsByTagName((0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName);
    if (xml_grainSizess.length > 0) {
        if (xml_grainSizess.length > 1) throw new Error("Expecting 1 " + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + " but finding " + xml_grainSizess.length + "!");
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_grainSizess[0]);
        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_grainSizess[0])));
        let grainSize = new (0, $8883b31bd809eb64$export$26e33f0df9ce919d)(attributes, value);
        $7e68913db756e51f$var$modelParameters.setGrainSize(grainSize);
        let grainSizeDiv = document.createElement("div");
        grainSizeDiv.style.display = "flex";
        // Create a new div for the grainSize.
        let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName;
        let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                $7e68913db756e51f$export$b1e4cbf5b56e0e21(grainSize, event.target);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(event.target);
            }
        }, value.toString(), (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputDiv.querySelector("input"));
        inputDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
        inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
        inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
        grainSizeDiv.appendChild(inputDiv);
        // Add any units
        $7e68913db756e51f$var$addAnyUnits(undefined, attributes, grainSizeDiv, (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName, (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName, $7e68913db756e51f$var$margin2, $7e68913db756e51f$var$margin1, $7e68913db756e51f$var$margin1);
        modelParametersDiv.appendChild(grainSizeDiv);
    }
    // Process any "me:energyAboveTheTopHill" elements.
    let xml_energyAboveTheTopHill = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml_modelParameters, (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName);
    let energyAboveTheTopHill = new (0, $8883b31bd809eb64$export$aa73446724166cdb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_energyAboveTheTopHill), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_energyAboveTheTopHill))));
    $7e68913db756e51f$var$modelParameters.setEnergyAboveTheTopHill(energyAboveTheTopHill);
    // Create a new div for the energyAboveTheTopHill.
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName;
    let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            $7e68913db756e51f$export$b1e4cbf5b56e0e21(energyAboveTheTopHill, event.target);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(event.target);
        }
    }, energyAboveTheTopHill.value.toString(), (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName);
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputDiv.querySelector("input"));
    inputDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
    inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
    modelParametersDiv.appendChild(inputDiv);
    return modelParametersDiv;
}
/**
 * Parses xml to initialise controls.
 * @param xml The XML document.
 * @returns The controls div.
 */ function $7e68913db756e51f$var$processControl(xml) {
    console.log((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    // Create div to contain the controls.
    let controlsDiv = document.createElement("div");
    // Get the XML "me:control" element.
    let xml_control = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    $7e68913db756e51f$var$control = new (0, $b6873406fb778c0b$export$7a7fa4424cb20976)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_control));
    // me:testDOS
    let testDOSDiv = document.createElement("div");
    testDOSDiv.style.display = "flex";
    testDOSDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(testDOSDiv);
    let xml_testDOS = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName);
    // Create a input checkbox for the TestDOS.
    let testDOSLabel = document.createElement("label");
    testDOSDiv.appendChild(testDOSLabel);
    testDOSLabel.textContent = (0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName;
    let testDOSInput = document.createElement("input");
    testDOSDiv.appendChild(testDOSInput);
    testDOSInput.type = "checkbox";
    testDOSInput.id = (0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName;
    testDOSInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setTestDOS(new (0, $b6873406fb778c0b$export$a3d7e677521f681f)());
            else $7e68913db756e51f$var$control.removeTestDOS();
        }
    });
    if (xml_testDOS.length == 1) {
        testDOSInput.checked = true;
        $7e68913db756e51f$var$control.setTestDOS(new (0, $b6873406fb778c0b$export$a3d7e677521f681f)());
    } else if (xml_testDOS.length > 1) console.warn("xml_testDOS.length=" + xml_testDOS.length);
    // me:printSpeciesProfile
    let printSpeciesProfileDiv = document.createElement("div");
    printSpeciesProfileDiv.style.display = "flex";
    printSpeciesProfileDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printSpeciesProfileDiv);
    let xml_printSpeciesProfile = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName);
    // Create a input checkbox for the PrintSpeciesProfile.
    let printSpeciesProfileLabel = document.createElement("label");
    printSpeciesProfileDiv.appendChild(printSpeciesProfileLabel);
    printSpeciesProfileLabel.textContent = (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName;
    let printSpeciesProfileInput = document.createElement("input");
    printSpeciesProfileDiv.appendChild(printSpeciesProfileInput);
    printSpeciesProfileInput.type = "checkbox";
    printSpeciesProfileInput.id = (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName;
    printSpeciesProfileInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintSpeciesProfile(new (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1)());
            else $7e68913db756e51f$var$control.removePrintSpeciesProfile();
        }
    });
    if (xml_printSpeciesProfile.length == 1) {
        printSpeciesProfileInput.checked = true;
        $7e68913db756e51f$var$control.setTestDOS(new (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1)());
    } else if (xml_testDOS.length > 1) console.warn("xml_printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
    // me:testMicroRates
    let testMicroRatesDiv = document.createElement("div");
    testMicroRatesDiv.style.display = "flex";
    testMicroRatesDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(testMicroRatesDiv);
    let xml_testMicroRates = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName);
    // Create a input checkbox for the TestMicroRates.
    let testMicroRatesLabel = document.createElement("label");
    testMicroRatesDiv.appendChild(testMicroRatesLabel);
    testMicroRatesLabel.textContent = (0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName;
    let testMicroRatesInput = document.createElement("input");
    testMicroRatesDiv.appendChild(testMicroRatesInput);
    testMicroRatesInput.type = "checkbox";
    testMicroRatesInput.id = (0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName;
    testMicroRatesInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setTestMicroRates(new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)());
            else $7e68913db756e51f$var$control.removeTestMicroRates();
        }
    });
    if (xml_testMicroRates.length == 1) {
        testMicroRatesInput.checked = true;
        $7e68913db756e51f$var$control.setTestMicroRates(new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)());
    } else if (xml_testMicroRates.length > 1) console.warn("xml_testMicroRates.length=" + xml_testMicroRates.length);
    // me:testRateConstant
    let testRateConstantDiv = document.createElement("div");
    testRateConstantDiv.style.display = "flex";
    testRateConstantDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(testRateConstantDiv);
    let xml_testRateConstant = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$980e5abe9a459423).tagName);
    // Create a input checkbox for the TestRateConstant.
    let testRateConstantLabel = document.createElement("label");
    testRateConstantDiv.appendChild(testRateConstantLabel);
    testRateConstantLabel.textContent = (0, $b6873406fb778c0b$export$980e5abe9a459423).tagName;
    let testRateConstantInput = document.createElement("input");
    testRateConstantDiv.appendChild(testRateConstantInput);
    testRateConstantInput.type = "checkbox";
    testRateConstantInput.id = (0, $b6873406fb778c0b$export$980e5abe9a459423).tagName;
    testRateConstantInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setTestRateConstant(new (0, $b6873406fb778c0b$export$980e5abe9a459423)());
            else $7e68913db756e51f$var$control.removeTestRateConstant();
        }
    });
    if (xml_testRateConstant.length == 1) {
        testRateConstantInput.checked = true;
        $7e68913db756e51f$var$control.setTestRateConstant(new (0, $b6873406fb778c0b$export$980e5abe9a459423)());
    } else if (xml_testRateConstant.length > 1) console.warn("xml_testRateConstant.length=" + xml_testRateConstant.length);
    // me:printGrainDOS
    let printGrainDOSDiv = document.createElement("div");
    printGrainDOSDiv.style.display = "flex";
    printGrainDOSDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printGrainDOSDiv);
    let xml_printGrainDOS = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName);
    // Create a input checkbox for the PrintGrainDOS.
    let printGrainDOSLabel = document.createElement("label");
    printGrainDOSDiv.appendChild(printGrainDOSLabel);
    printGrainDOSLabel.textContent = (0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName;
    let printGrainDOSInput = document.createElement("input");
    printGrainDOSDiv.appendChild(printGrainDOSInput);
    printGrainDOSInput.type = "checkbox";
    printGrainDOSInput.id = (0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName;
    printGrainDOSInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintGrainDOS(new (0, $b6873406fb778c0b$export$d23243bda4dfae2b)());
            else $7e68913db756e51f$var$control.removePrintGrainDOS();
        }
    });
    if (xml_printGrainDOS.length == 1) {
        printGrainDOSInput.checked = true;
        $7e68913db756e51f$var$control.setPrintGrainDOS(new (0, $b6873406fb778c0b$export$d23243bda4dfae2b)());
    } else if (xml_printGrainDOS.length > 1) console.warn("xml_printGrainDOS.length=" + xml_printGrainDOS.length);
    // me:printCellDOS
    let printCellDOSDiv = document.createElement("div");
    printCellDOSDiv.style.display = "flex";
    printCellDOSDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printCellDOSDiv);
    let xml_printCellDOS = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$60b233651e162b60).tagName);
    // Create a input checkbox for the PrintCellDOS.
    let printCellDOSLabel = document.createElement("label");
    printCellDOSDiv.appendChild(printCellDOSLabel);
    printCellDOSLabel.textContent = (0, $b6873406fb778c0b$export$60b233651e162b60).tagName;
    let printCellDOSInput = document.createElement("input");
    printCellDOSDiv.appendChild(printCellDOSInput);
    printCellDOSInput.type = "checkbox";
    printCellDOSInput.id = (0, $b6873406fb778c0b$export$60b233651e162b60).tagName;
    printCellDOSInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintCellDOS(new (0, $b6873406fb778c0b$export$60b233651e162b60)());
            else $7e68913db756e51f$var$control.removePrintCellDOS();
        }
    });
    if (xml_printCellDOS.length == 1) {
        printCellDOSInput.checked = true;
        $7e68913db756e51f$var$control.setPrintCellDOS(new (0, $b6873406fb778c0b$export$60b233651e162b60)());
    } else if (xml_printCellDOS.length > 1) console.warn("xml_printCellDOS.length=" + xml_printCellDOS.length);
    // me:printReactionOperatorColumnSums
    let printReactionOperatorColumnSumsDiv = document.createElement("div");
    printReactionOperatorColumnSumsDiv.style.display = "flex";
    printReactionOperatorColumnSumsDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printReactionOperatorColumnSumsDiv);
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$a915db169f144f37).tagName);
    // Create a input checkbox for the PrintReactionOperatorColumnSums.
    let printReactionOperatorColumnSumsLabel = document.createElement("label");
    printReactionOperatorColumnSumsDiv.appendChild(printReactionOperatorColumnSumsLabel);
    printReactionOperatorColumnSumsLabel.textContent = (0, $b6873406fb778c0b$export$a915db169f144f37).tagName;
    let printReactionOperatorColumnSumsInput = document.createElement("input");
    printReactionOperatorColumnSumsDiv.appendChild(printReactionOperatorColumnSumsInput);
    printReactionOperatorColumnSumsInput.type = "checkbox";
    printReactionOperatorColumnSumsInput.id = (0, $b6873406fb778c0b$export$a915db169f144f37).tagName;
    printReactionOperatorColumnSumsInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintReactionOperatorColumnSums(new (0, $b6873406fb778c0b$export$a915db169f144f37)());
            else $7e68913db756e51f$var$control.removePrintReactionOperatorColumnSums();
        }
    });
    if (xml_printReactionOperatorColumnSums.length == 1) {
        printReactionOperatorColumnSumsInput.checked = true;
        $7e68913db756e51f$var$control.setPrintReactionOperatorColumnSums(new (0, $b6873406fb778c0b$export$a915db169f144f37)());
    } else if (xml_printReactionOperatorColumnSums.length > 1) console.warn("xml_printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
    // me:printTunnellingCoefficients
    let printTunnellingCoefficientsDiv = document.createElement("div");
    printTunnellingCoefficientsDiv.style.display = "flex";
    printTunnellingCoefficientsDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printTunnellingCoefficientsDiv);
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$8a58e03b7b3f0f47).tagName);
    // Create a input checkbox for the PrintTunnellingCoefficients.
    let printTunnellingCoefficientsLabel = document.createElement("label");
    printTunnellingCoefficientsDiv.appendChild(printTunnellingCoefficientsLabel);
    printTunnellingCoefficientsLabel.textContent = (0, $b6873406fb778c0b$export$8a58e03b7b3f0f47).tagName;
    let printTunnellingCoefficientsInput = document.createElement("input");
    printTunnellingCoefficientsDiv.appendChild(printTunnellingCoefficientsInput);
    printTunnellingCoefficientsInput.type = "checkbox";
    printTunnellingCoefficientsInput.id = (0, $b6873406fb778c0b$export$8a58e03b7b3f0f47).tagName;
    printTunnellingCoefficientsInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintTunnellingCoefficients(new (0, $b6873406fb778c0b$export$8a58e03b7b3f0f47)());
            else $7e68913db756e51f$var$control.removePrintTunnellingCoefficients();
        }
    });
    if (xml_printTunnellingCoefficients.length == 1) {
        printTunnellingCoefficientsInput.checked = true;
        $7e68913db756e51f$var$control.setPrintTunnellingCoefficients(new (0, $b6873406fb778c0b$export$8a58e03b7b3f0f47)());
    } else if (xml_printTunnellingCoefficients.length > 1) console.warn("xml_printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
    // me:printGrainkfE
    let printGrainkfEDiv = document.createElement("div");
    printGrainkfEDiv.style.display = "flex";
    printGrainkfEDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printGrainkfEDiv);
    let xml_printGrainkfE = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName);
    // Create a input checkbox for the PrintGrainkfE.
    let printGrainkfELabel = document.createElement("label");
    printGrainkfEDiv.appendChild(printGrainkfELabel);
    printGrainkfELabel.textContent = (0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName;
    let printGrainkfEInput = document.createElement("input");
    printGrainkfEDiv.appendChild(printGrainkfEInput);
    printGrainkfEInput.type = "checkbox";
    printGrainkfEInput.id = (0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName;
    printGrainkfEInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintGrainkfE(new (0, $b6873406fb778c0b$export$f8d814a406a0ff5b)());
            else $7e68913db756e51f$var$control.removePrintGrainkfE();
        }
    });
    // me:printGrainBoltzmann
    let printGrainBoltzmannDiv = document.createElement("div");
    printGrainBoltzmannDiv.style.display = "flex";
    printGrainBoltzmannDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printGrainBoltzmannDiv);
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$e7fff349901f700d).tagName);
    // Create a input checkbox for the PrintGrainBoltzmann.
    let printGrainBoltzmannLabel = document.createElement("label");
    printGrainBoltzmannDiv.appendChild(printGrainBoltzmannLabel);
    printGrainBoltzmannLabel.textContent = (0, $b6873406fb778c0b$export$e7fff349901f700d).tagName;
    let printGrainBoltzmannInput = document.createElement("input");
    printGrainBoltzmannDiv.appendChild(printGrainBoltzmannInput);
    printGrainBoltzmannInput.type = "checkbox";
    printGrainBoltzmannInput.id = (0, $b6873406fb778c0b$export$e7fff349901f700d).tagName;
    printGrainBoltzmannInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintGrainBoltzmann(new (0, $b6873406fb778c0b$export$e7fff349901f700d)());
            else $7e68913db756e51f$var$control.removePrintGrainBoltzmann();
        }
    });
    // me:printGrainkbE
    let printGrainkbEDiv = document.createElement("div");
    printGrainkbEDiv.style.display = "flex";
    printGrainkbEDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
    controlsDiv.appendChild(printGrainkbEDiv);
    let xml_printGrainkbE = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName);
    // Create a input checkbox for the PrintGrainkbE.
    let printGrainkbELabel = document.createElement("label");
    printGrainkbEDiv.appendChild(printGrainkbELabel);
    printGrainkbELabel.textContent = (0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName;
    let printGrainkbEInput = document.createElement("input");
    printGrainkbEDiv.appendChild(printGrainkbEInput);
    printGrainkbEInput.type = "checkbox";
    printGrainkbEInput.id = (0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName;
    printGrainkbEInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) $7e68913db756e51f$var$control.setPrintGrainkbE(new (0, $b6873406fb778c0b$export$55888ef4e813a34d)());
            else $7e68913db756e51f$var$control.removePrintGrainkbE();
        }
    });
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName);
    if (xml_eigenvalues.length == 1) {
        let eigenvalues = new (0, $b6873406fb778c0b$export$2453e311f702d9c7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_eigenvalues[0]), parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_eigenvalues[0]))));
        $7e68913db756e51f$var$control.setEigenvalues(eigenvalues);
        // Create a new div for the eigenvalues.
        let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + (0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName;
        let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                $7e68913db756e51f$export$b1e4cbf5b56e0e21(eigenvalues, event.target);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(event.target);
            }
        }, eigenvalues.value.toString(), (0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputDiv.querySelector("input"));
        inputDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
        inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
        inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
        controlsDiv.appendChild(inputDiv);
    } else console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName((0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName);
    if (xml_diagramEnergyOffset.length == 1) {
        let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_diagramEnergyOffset[0])));
        let diagramEnergyOffset = new (0, $b6873406fb778c0b$export$159b5d3263f1049a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_diagramEnergyOffset[0]), value);
        $7e68913db756e51f$var$control.setDiagramEnergyOffset(diagramEnergyOffset);
        // Create a new div for the diagramEnergyOffset.
        let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + (0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName;
        let inputDiv = (0, $f0396edd0a5c99f7$export$7c112ceec8941e67)("number", id, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                $7e68913db756e51f$export$b1e4cbf5b56e0e21(diagramEnergyOffset, event.target);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(event.target);
            }
        }, value.toString(), (0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputDiv.querySelector("input"));
        inputDiv.style.marginLeft = $7e68913db756e51f$var$margin25;
        inputDiv.style.marginTop = $7e68913db756e51f$var$margin1;
        inputDiv.style.marginBottom = $7e68913db756e51f$var$margin1;
        controlsDiv.appendChild(inputDiv);
    } else console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    return controlsDiv;
}
/**
 * Create a diagram.
 * @param canvas The canvas.
 * @param dark True for dark mode.
 * @param font The font to use.
 * @param lw The line width of reactants, transition states and products.
 * @param lwc The line width color to use.
 */ function $7e68913db756e51f$var$drawReactionDiagram(canvas, dark, font, lw, lwc) {
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
    $7e68913db756e51f$var$reactions.forEach(function(reaction, id) {
        // Get TransitionStates.
        let reactionTransitionStates = reaction.getTransitionStates();
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.add(reactantsLabel);
            if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
            let energy = reaction.getReactantsEnergy($7e68913db756e51f$var$molecules);
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
            let energy = reaction.getProductsEnergy($7e68913db756e51f$var$molecules);
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
                    reactionTransitionStates.forEach(function(ts) {
                        let ref = ts.getMolecule().ref;
                        transitionStates.add(ref);
                        orders.set(ref, i);
                        energy = $7e68913db756e51f$var$molecules.get(ref)?.getEnergy() ?? 0;
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(ref, energy);
                        i++;
                    });
                    orders.set(productsLabel, i);
                    i++;
                }
            } else {
                if (reactionTransitionStates != undefined) reactionTransitionStates.forEach(function(ts) {
                    let ref = ts.getMolecule().ref;
                    transitionStates.add(ref);
                    orders.set(ref, i);
                    energy = $7e68913db756e51f$var$molecules.get(ref)?.getEnergy() ?? 0;
                    energyMin = Math.min(energyMin, energy);
                    energyMax = Math.max(energyMax, energy);
                    energies.set(ref, energy);
                    i++;
                });
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
        // (The drawing is now not done here but done later so labels are on top of lines, but
        // the code is left here commented out for code comprehension.)
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
    $7e68913db756e51f$var$reactions.forEach(function(reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        // Get TransitionState if there is one.
        let reactionTransitionStates = reaction.getTransitionStates();
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsInXY, productsLabel);
        if (reactionTransitionStates.length > 0) reactionTransitionStates.forEach(function(ts) {
            let transitionStateLabel = ts.getMolecule().ref;
            let transitionStateInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesInXY, transitionStateLabel);
            (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
            let transitionStateOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, transitionStateLabel);
            (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
        });
        else (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
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
 * Display reactions diagram.
 */ function $7e68913db756e51f$var$displayReactionsDiagram() {
    if ($7e68913db756e51f$var$reactions.size > 0) {
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            $7e68913db756e51f$var$drawReactionDiagram(canvas, dark, font, lw, lwc);
        }
    }
}
/**
 * Save to XML file.
 */ window.saveXML = function() {
    console.log("saveXML");
    const pad = "  ";
    /*
    const padding2: string = pad.repeat(2);

    // Create moleculeList.
    let moleculeList: string = "";
    molecules.forEach(function (molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
        //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = getTag(moleculeList, "moleculeList", undefined, pad, true);

    // Create reactionList.
    let reactionList: string = "";
    reactions.forEach(function (reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
        //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = getTag(reactionList, "reactionList", undefined, pad, true);

    // Create me.Conditions
    let xml_conditions: string = conditions.toXML(pad, pad);

    // Create modelParameters
    let xml_modelParameters: string = modelParameters.toXML(pad, pad);

    // create me.control
    let xml_control: string = control.toXML(pad, pad);
*/ // Create a new Blob object from the data
    let blob = new Blob([
        (0, $8677001474399221$export$692079bb871c6039).header,
        $7e68913db756e51f$var$mesmer.toXML(pad, pad)
    ], {
        type: "text/plain"
    });
    //     let blob = new Blob([moleculeList, reactionList,
    //         xml_conditions, xml_modelParameters, xml_control],
    //         { type: "text/plain" });
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


export {$7e68913db756e51f$export$b1e4cbf5b56e0e21 as setNumberNode, $7e68913db756e51f$export$819b5ff7dff3652c as setNumberArrayNode};
//# sourceMappingURL=index.fd52ebe3.js.map
