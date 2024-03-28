//import { openDB } from 'idb';
//import * as $3Dmol from '3dmol';
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
 * Remove a top level element.
 * @param id The id of the element to remove.
 */ function $f0396edd0a5c99f7$export$cd7f480d6b8286c3(id) {
    let e = document.getElementById(id);
    if (e != null) e.parentNode?.removeChild(e);
}
function $f0396edd0a5c99f7$export$8b2cd46c11844202({ content: content, buttonLabel: buttonLabel, buttonFontSize: buttonFontSize = "", boundary: boundary = {
    marginLeft: "",
    marginTop: "",
    marginBottom: "",
    marginRight: ""
}, level: level = {
    marginLeft: "",
    marginTop: "",
    marginBottom: "",
    marginRight: ""
}, contentDivId: contentDivId = "", contentDivClassName: contentDivClassName = "" }) {
    let contentDiv = $f0396edd0a5c99f7$export$331ff980f0d45cff(boundary);
    contentDiv.id = contentDivId;
    contentDiv.className = contentDivClassName;
    let button = document.createElement("button");
    button.id = contentDivId + "Button";
    button.className = "collapsible";
    button.innerText = `${buttonLabel} \u{25BC}`;
    button.addEventListener("click", function() {
        button.innerText = button.innerText.includes("\u25BC") ? `${buttonLabel} \u{25B2}` : `${buttonLabel} \u{25BC}`;
    });
    button.style.fontSize = buttonFontSize;
    Object.assign(button.style, level);
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
function $f0396edd0a5c99f7$export$4e9ec2b27757d9dd(type, id, boundary, level, func, value, labelContent, inputFontsize) {
    let input = $f0396edd0a5c99f7$export$cef1adc173ab7099(type, id, boundary, func, value, inputFontsize);
    Object.assign(input.style, boundary);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labelContent, boundary);
    label.htmlFor = id;
    Object.assign(label.style, boundary);
    let container = $f0396edd0a5c99f7$export$78253536c0178a32(level);
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
function $f0396edd0a5c99f7$export$cef1adc173ab7099(type, id, boundary, func, value, inputFontsize) {
    let input = $f0396edd0a5c99f7$export$d80fffb1deb3b97e(type, id, boundary);
    input.onchange = func;
    input.value = value;
    if (inputFontsize != undefined) input.style.fontSize = inputFontsize;
    $f0396edd0a5c99f7$export$d43d96a9a8ad3e51(input);
    return input;
}
function $f0396edd0a5c99f7$export$d80fffb1deb3b97e(type, id, margin) {
    let input = document.createElement("input");
    input.type = type;
    input.id = id;
    Object.assign(input.style, margin);
    input.classList.add("auto-width");
    return input;
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
function $f0396edd0a5c99f7$export$b89bf4b169286865(options, name, id, margin) {
    let selectElement = document.createElement("select");
    options.forEach((option)=>{
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    selectElement.style.fontSize = "1em"; // Set the font size with a relative unit.
    selectElement.classList.add("auto-width");
    Object.assign(selectElement.style, margin);
    return selectElement;
}
function $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4(textContent, options, name, id, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$331ff980f0d45cff(divMargin);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(textContent, componentMargin);
    div.appendChild(label);
    let selectElement = document.createElement("select");
    div.appendChild(selectElement);
    options.forEach((option)=>{
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return div;
}
function $f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, boundary) {
    let button = document.createElement("button");
    button.textContent = textContent;
    Object.assign(button.style, boundary);
    button.style.fontSize = "1em"; // Set the font size with a relative unit.
    return button;
}
function $f0396edd0a5c99f7$export$717b1c3df34dc89e(labeltext, textContent, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(divMargin);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labeltext, componentMargin);
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild($f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, componentMargin));
    return div;
}
function $f0396edd0a5c99f7$export$e9d85a17345c2f11(labeltext, textContent, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(divMargin);
    div.appendChild($f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, componentMargin));
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labeltext, componentMargin);
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    return div;
}
function $f0396edd0a5c99f7$export$331ff980f0d45cff(margin) {
    let div = document.createElement("div");
    Object.assign(div.style, margin);
    return div;
}
function $f0396edd0a5c99f7$export$78253536c0178a32(margin) {
    let div = $f0396edd0a5c99f7$export$331ff980f0d45cff(margin);
    div.style.display = "flex";
    div.style.flexWrap = "wrap";
    return div;
}
function $f0396edd0a5c99f7$export$f2839682b8c07f35(textContent, margin) {
    let label = document.createElement("label");
    Object.assign(label.style, margin);
    label.textContent = textContent;
    label.style.fontSize = "1em"; // Set the font size with a relative unit.
    return label;
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
        for (let [k, v] of this.attributes)s += " " + k + '="' + v.toString() + '"';
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
    static{
        /**
     * The key for the atomRefs2 attribute.
     */ this.s_atomRefs2 = "atomRefs2";
    }
    static{
        /**
     * The key for the id attribute.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the order attribute.
     */ this.s_order = "order";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$153327fc99ac0c53.tagName);
        let atomRefs2 = attributes.get($ef5b9341e5193b70$export$153327fc99ac0c53.s_atomRefs2);
        if (atomRefs2 == undefined) throw new Error($ef5b9341e5193b70$export$153327fc99ac0c53.s_atomRefs2 + " is undefined!");
        this.atomRefs2 = atomRefs2;
    }
    /**
     * @param atomRefs2 The atomRefs2 to set.
     */ setAtomRefs2(atomRefs2) {
        this.atomRefs2 = atomRefs2;
        this.attributes.set($ef5b9341e5193b70$export$153327fc99ac0c53.s_atomRefs2, atomRefs2);
    }
    /**
     * @returns The attribute value referred to by "id" or undefined.
     */ getId() {
        return this.attributes.get($ef5b9341e5193b70$export$153327fc99ac0c53.s_id);
    }
    /**
     * @param id The id to set the attribute value referred to by "id".
     */ setId(id) {
        this.attributes.set($ef5b9341e5193b70$export$153327fc99ac0c53.s_id, id);
    }
    /**
     * @returns The attribute value referred to by "order" as a number or undefined.
     */ getOrder() {
        let order = this.attributes.get($ef5b9341e5193b70$export$153327fc99ac0c53.s_order);
        if (order != undefined) return parseFloat(order);
    }
    /**
     * @param order The order to set the attribute value referred to by "order".
     */ setOrder(order) {
        this.attributes.set($ef5b9341e5193b70$export$153327fc99ac0c53.s_order, order.toString());
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
        this.bonds = bonds;
        bonds.forEach((bond)=>{
            this.nodes.set(this.nodes.size, bond);
        });
    }
    /**
     * @param i The index of the bond.
     * @returns The bond at the given index.
     * @throws Error if this.bonds has no such index.
     */ getBond(i) {
        return this.bonds[i];
    }
    /**
     * @returns The bonds.
     */ getBonds() {
        return this.bonds;
    }
    /**
     * Set the bond at the given index.
     * @param i The index.
     * @param bond The bond.
     * @throws Error if this.bonds has no such index.
     */ setBond(i, bond) {
        this.bonds[i] = bond;
        this.nodes.set(i, bond);
    }
    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     */ addBond(bond) {
        this.bonds.push(bond);
        this.nodes.set(this.nodes.size, bond);
    }
    /**
     * @param i The index of the bond to remove.
     */ removeBond(i) {
        this.bonds.splice(i, 1);
        this.nodes.delete(i);
    }
    /**
     * Get a set of all the bond ids.
     */ getBondIds() {
        let bondIds = new Set();
        this.bonds.forEach((bond)=>{
            bondIds.add(bond.getId());
        });
        return bondIds;
    }
}
class $ef5b9341e5193b70$export$d29b345ea2be5072 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
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
            let existingUnits = this.attributes.get($ef5b9341e5193b70$export$d29b345ea2be5072.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) //console.log('Units are not the same, changing units...');
                this.attributes.set($ef5b9341e5193b70$export$d29b345ea2be5072.s_units, units);
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
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
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
            let existingUnits = this.attributes.get($ef5b9341e5193b70$export$9f93a3fdf2490572.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set($ef5b9341e5193b70$export$9f93a3fdf2490572.s_units, units);
                    console.log("Units changed from " + existingUnits + " to " + units);
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
    static{
        /**
     * The key for the dictRef attribute.
     */ this.s_dictRef = "dictRef";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, $ef5b9341e5193b70$export$41b04b3a73e7216d.tagName);
        let dictRef = attributes.get($ef5b9341e5193b70$export$41b04b3a73e7216d.s_dictRef);
        if (dictRef == undefined) throw new Error($ef5b9341e5193b70$export$41b04b3a73e7216d.s_dictRef + " is undefined!");
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
        /**
     * The dictionary reference.
     */ this.dictRef = "me:ZPE";
    }
    static{
        /**
     * The possible units.
     */ this.units = [
            "kJ/mol",
            "cm-1",
            "kcal/mol",
            "Hartree"
        ];
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
        /**
     * The dictionary reference.
     */ this.dictRef = "me:frequenciesScaleFactor";
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
        /**
     * The dictionary reference.
     */ this.dictRef = "me:vibFreqs";
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
        /**
     * The dictionary reference.
     */ this.dictRef = "me:rotConsts";
    }
    static{
        /**
     * The possible units.
     */ this.units = [
            "cm-1",
            "GHz"
        ];
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
        /**
     * The dictionary reference.
     */ this.dictRef = "me:MW";
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
        /**
     * The dictionary reference.
     */ this.dictRef = "me:imFreqs";
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
        if (properties != undefined) properties.forEach((property)=>{
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
    static{
        /**
     * The key for the bathGas attribute.
     */ this.s_bathGas = "bathGas";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    static{
        /**
     * The key for the lower attribute.
     */ this.s_lower = "lower";
    }
    static{
        /**
     * The key for the upper attribute.
     */ this.s_upper = "upper";
    }
    static{
        /**
     * The key for the stepsize attribute.
     */ this.s_stepsize = "stepsize";
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
        return this.attributes.get($ef5b9341e5193b70$export$16fc56ab40b12b45.s_bathGas);
    }
    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */ setBathGas(bathGas) {
        this.attributes.set($ef5b9341e5193b70$export$16fc56ab40b12b45.s_bathGas, bathGas);
    }
    /**
     * @returns The units of the DeltaEDown.
     */ getUnits() {
        return this.attributes.get($ef5b9341e5193b70$export$16fc56ab40b12b45.s_units);
    }
    /**
     * @param units The units of the DeltaEDown.
     */ setUnits(units) {
        this.attributes.set($ef5b9341e5193b70$export$16fc56ab40b12b45.s_units, units);
    }
    /**
     * @returns The lower of the DeltaEDown.
     */ getLower() {
        return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, $ef5b9341e5193b70$export$16fc56ab40b12b45.s_lower));
    }
    /**
     * @param lower The lower of the DeltaEDown.
     */ setLower(lower) {
        this.attributes.set($ef5b9341e5193b70$export$16fc56ab40b12b45.s_lower, lower.toString());
    }
    /**
     * @returns The upper of the DeltaEDown.
     */ getUpper() {
        return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, $ef5b9341e5193b70$export$16fc56ab40b12b45.s_upper));
    }
    /**
     * @param upper The upper of the DeltaEDown.
     */ setUpper(upper) {
        this.attributes.set($ef5b9341e5193b70$export$16fc56ab40b12b45.s_upper, upper.toString());
    }
    /**
     * @returns The stepsize of the DeltaEDown.
     */ getStepsize() {
        return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, $ef5b9341e5193b70$export$16fc56ab40b12b45.s_stepsize));
    }
    /**
     * @param stepsize The stepsize of the DeltaEDown.
     */ setStepsize(stepsize) {
        this.attributes.set($ef5b9341e5193b70$export$16fc56ab40b12b45.s_stepsize, stepsize.toString());
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
    static{
        /**
     * The key for the "xsi:type" attribute value.
     */ this.s_xsi_type = "xsi:type";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$bbdce6c921702068.tagName);
        if (attributes.get($ef5b9341e5193b70$export$bbdce6c921702068.s_xsi_type) == undefined) {
            let name = attributes.get("name");
            if (name == undefined) throw new Error("Neither xsi:type or name are defined.");
            else attributes.set($ef5b9341e5193b70$export$bbdce6c921702068.s_xsi_type, name);
        }
    }
    /**
     * @returns The xsi:type.
     */ getXsiType() {
        return this.attributes.get($ef5b9341e5193b70$export$bbdce6c921702068.s_xsi_type);
    }
    /**
     * @param xsiType The xsi:type.
     */ setXsiType(xsiType) {
        this.attributes.set($ef5b9341e5193b70$export$bbdce6c921702068.s_xsi_type, xsiType);
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
        /**
     * The tag name.
     */ this.tagName = "me:PotentialPoint";
    }
    static{
        /**
     * The key angle attribute.
     */ this.s_angle = "angle";
    }
    static{
        /**
     * The key potential attribute.
     */ this.s_potential = "potential";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$86ca5149fcde8feb.tagName);
        let angle = attributes.get($ef5b9341e5193b70$export$86ca5149fcde8feb.s_angle);
        if (angle == undefined) throw new Error($ef5b9341e5193b70$export$86ca5149fcde8feb.s_potential + " is undefined!");
        this.angle = parseFloat(angle);
        let potential = attributes.get($ef5b9341e5193b70$export$86ca5149fcde8feb.s_potential);
        if (potential == undefined) throw new Error($ef5b9341e5193b70$export$86ca5149fcde8feb.s_potential + " is undefined!");
        this.potential = parseFloat(potential);
    }
    /**
     * @returns The angle.
     */ getAngle() {
        return this.angle;
    }
    /**
     * @param angle The angle of the PotentialPoint.
     */ setAngle(angle) {
        this.angle = angle;
        this.attributes.set($ef5b9341e5193b70$export$86ca5149fcde8feb.s_angle, angle.toString());
    }
    /**
     * @returns The potential.
     */ getPotential() {
        return this.potential;
    }
    /**
     * @param potential The potential of the PotentialPoint.
     */ setPotential(potential) {
        this.potential = potential;
        this.attributes.set($ef5b9341e5193b70$export$86ca5149fcde8feb.s_potential, potential.toString());
    }
}
class $ef5b9341e5193b70$export$9b8e857b9a081d2 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:HinderedRotorPotential";
    }
    static{
        /**
     * The permitted formats.
     */ this.formats = [
            "numerical",
            "analytical"
        ];
    }
    static{
        /**
     * The permitted units.
     */ this.units = [
            "kJ/mol",
            "cm-1",
            "Hartree"
        ];
    }
    static{
        /**
     * The key for the format attribute value.
     */ this.s_format = "format";
    }
    static{
        /**
     * The key for the units attribute value.
     */ this.s_units = "units";
    }
    static{
        /**
     * The key for the expansionSize attribute value.
     */ this.s_expansionSize = "expansionSize";
    }
    static{
        /**
     * The key for the useSineTerms attribute value.
     */ this.s_useSineTerms = "useSineTerms";
    }
    /**
     * @param attributes The attributes.
     * @param potentialPoints The PotentialPoints.
     */ constructor(attributes, potentialPoints){
        super(attributes, $ef5b9341e5193b70$export$9b8e857b9a081d2.tagName);
        let format = attributes.get($ef5b9341e5193b70$export$9b8e857b9a081d2.s_format);
        if (format == undefined) throw new Error($ef5b9341e5193b70$export$9b8e857b9a081d2.s_format + " is undefined!");
        this.format = format;
        let units = attributes.get($ef5b9341e5193b70$export$9b8e857b9a081d2.s_units);
        if (units == undefined) throw new Error($ef5b9341e5193b70$export$9b8e857b9a081d2.s_units + " is undefined!");
        this.units = units;
        if (potentialPoints != undefined) potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
        let expansionSize = attributes.get($ef5b9341e5193b70$export$9b8e857b9a081d2.s_expansionSize);
        if (expansionSize == undefined) throw new Error($ef5b9341e5193b70$export$9b8e857b9a081d2.s_expansionSize + " is undefined!");
        this.expansionSize = parseFloat(expansionSize);
        let useSineTerms = attributes.get($ef5b9341e5193b70$export$9b8e857b9a081d2.s_useSineTerms);
        if (useSineTerms == undefined) throw new Error($ef5b9341e5193b70$export$9b8e857b9a081d2.s_useSineTerms + " is undefined!");
        this.useSineTerms = useSineTerms == "yes";
    }
    /**
     * @returns The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */ getFormat() {
        return this.format;
    }
    /**
     * @param format The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */ setFormat(format) {
        this.format = format;
        this.attributes.set($ef5b9341e5193b70$export$9b8e857b9a081d2.s_format, format);
    }
    /**
     * @returns The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */ getUnits() {
        return this.units;
    }
    /**
     * @param units The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */ setUnits(units) {
        this.units = units;
        this.attributes.set($ef5b9341e5193b70$export$9b8e857b9a081d2.s_units, units);
    }
    /**
     * @returns The expansionSize of the HinderedRotorPotential.
     */ getExpansionSize() {
        return this.expansionSize;
    }
    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */ setExpansionSize(expansionSize) {
        this.expansionSize = expansionSize;
        this.attributes.set($ef5b9341e5193b70$export$9b8e857b9a081d2.s_expansionSize, expansionSize.toString());
    }
    /**
     * @returns The useSineTerms of the HinderedRotorPotential.
     */ getUseSineTerms() {
        return this.useSineTerms;
    }
    /**
     * @param useSineTerms The useSineTerms of the HinderedRotorPotential.
     */ setUseSineTerms(useSineTerms) {
        this.useSineTerms = useSineTerms;
        this.attributes.set($ef5b9341e5193b70$export$9b8e857b9a081d2.s_useSineTerms, useSineTerms ? "yes" : "no");
    }
    /**
     * @returns The potential point with the given index.
     */ getPotentialPoint(i) {
        return this.nodes.get(i);
    }
    /**
     * Set the potential point at the given index.
     * @param i The index to set the potential point at.
     * @param p The potential point to set at the index.
     */ setPotentialPoint(i, p) {
        this.nodes.set(i, p);
    }
    /**
     * Sets the potential points.
     * @param potentialPoints The potential points.
     */ setPotentialPoints(potentialPoints) {
        this.nodes.clear();
        potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
    }
    /**
     * Add the potential point.
     * @param p The potential point.
     * @returns The index of the potential point added.
     */ addPotentialPoint(p) {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
    }
    /**
     * @param i The index of the potential point to remove.
     */ removePotentialPoint(i) {
        this.nodes.delete(i);
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
    static{
        /**
     * The key for the id attribute value.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the description attribute value.
     */ this.s_description = "description";
    }
    static{
        /**
     * The key for the active attribute value.
     */ this.s_active = "active";
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
        let id = attributes.get($ef5b9341e5193b70$export$3da9759ad07746a3.s_id);
        if (id == undefined) throw new Error($ef5b9341e5193b70$export$3da9759ad07746a3.s_id + " is undefined");
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
        return this.attributes.get($ef5b9341e5193b70$export$3da9759ad07746a3.s_description);
    }
    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */ setDescription(description) {
        this.attributes.set($ef5b9341e5193b70$export$3da9759ad07746a3.s_description, description);
    }
    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        let active = this.attributes.get($ef5b9341e5193b70$export$3da9759ad07746a3.s_active);
        if (active != undefined) {
            if (active == "true") return true;
            else return false;
        }
    }
    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */ setActive(active) {
        this.attributes.set($ef5b9341e5193b70$export$3da9759ad07746a3.s_active, active.toString());
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
        if (active) label += " (" + $ef5b9341e5193b70$export$3da9759ad07746a3.s_active + ")";
        return label;
    }
    /**
     * @returns A comma and space separated string of the attributes of the molecule.
     */ getAttributesAsString() {
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
        if (i != undefined) return this.nodes.get(i);
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
            throw new Error($ef5b9341e5193b70$export$95174cf0748f45cd.dictRef + " property not found!");
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
    static{
        /**
     * The key to the name attribute value.
     */ this.s_name = "name";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, $6f7aa7a716962086$export$c3cf6f96dac11421.tagName);
    }
    /**
     * @returns The name of the tunneling method.
     */ getName() {
        return this.attributes.get($6f7aa7a716962086$export$c3cf6f96dac11421.s_name);
    }
    /**
     * @param The name of the tunneling method.
     */ setName(name) {
        this.attributes.set($6f7aa7a716962086$export$c3cf6f96dac11421.s_name, name);
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
    static{
        /**
     * The key to the id attribute value.
     */ this.s_id = "id";
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
        let id = attributes.get($6f7aa7a716962086$export$d2ae4167a30cf6bb.s_id);
        if (id == undefined) throw new Error($6f7aa7a716962086$export$d2ae4167a30cf6bb.s_id + " is undefined!");
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
 * @param x1 The end x-coordinate of the line.
 * @param y1 The end y-coordinate of the line.
 * @param font The font to use.
 * @param th The height of the text in pixels.
 * @param label The label.
 * @param energyString The energy.
 */ function $e5f7ab5c40db3f0e$export$479ac392a7fb4419(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + (x1 - x0) / 2;
    $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, energyString, font, strokeStyle, $e5f7ab5c40db3f0e$var$getTextStartX(ctx, energyString, font, x_centre), y1 + th);
    $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, label, font, strokeStyle, $e5f7ab5c40db3f0e$var$getTextStartX(ctx, label, font, x_centre), y1 + 3 * th);
    $e5f7ab5c40db3f0e$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x0, y0, x1, y1);
}
/**
 * @param ctx The context to use.
 * @param text The text to get the start x-coordinate of.
 * @paramfont The font to use.  
 * @param x_centre The x-coordinate of the centre of the text.
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
    static{
        /**
     * The key to the ref1 attribute value.
     */ this.s_ref1 = "ref1";
    }
    static{
        /**
     * The key to the ref2 attribute value.
     */ this.s_ref2 = "ref2";
    }
    static{
        /**
     * The key to the refReaction attribute value.
     */ this.s_refReaction = "refReaction";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */ constructor(attributes, value){
        super(attributes, $ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, value);
    }
    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */ getRef1() {
        return this.attributes.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_ref1);
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */ setRef1(ref1) {
        this.attributes.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_ref1, ref1);
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */ getRef2() {
        return this.attributes.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_ref2);
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */ setRef2(ref2) {
        this.attributes.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_ref2, ref2);
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */ getRefReaction() {
        return this.attributes.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_refReaction);
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */ setRefReaction(refReaction) {
        this.attributes.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_refReaction, refReaction);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        let error = this.attributes.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_error);
        if (error != undefined) return parseFloat(error);
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.s_error, error.toString());
    }
}
class $ae74a7b44a6504a1$export$c291f4faacd745a6 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentalYield";
    }
    static{
        /**
     * The key to the ref attribute value.
     */ this.s_ref = "ref";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    static{
        /**
     * The key to the yieldTime attribute value.
     */ this.s_yieldTime = "yieldTime";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ae74a7b44a6504a1$export$c291f4faacd745a6.tagName, value);
    }
    /**
     * @returns The ref attribute or undefined if there is no ref attribute.
     */ getRef() {
        return this.attributes.get($ae74a7b44a6504a1$export$c291f4faacd745a6.s_ref);
    }
    /**
     * Set the ref attribute.
     * @param ref The ref.
     */ setRef(ref) {
        this.attributes.set($ae74a7b44a6504a1$export$c291f4faacd745a6.s_ref, ref);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        let error = this.attributes.get($ae74a7b44a6504a1$export$c291f4faacd745a6.s_error);
        if (error != undefined) return parseFloat(error);
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($ae74a7b44a6504a1$export$c291f4faacd745a6.s_error, error.toString());
    }
    /**
     * @returns The yieldTime attribute or undefined if there is no yieldTime attribute.
     */ getYieldTime() {
        let yieldTime = this.attributes.get($ae74a7b44a6504a1$export$c291f4faacd745a6.s_yieldTime);
        if (yieldTime) return parseFloat(yieldTime);
    }
    /**
     * Set the yieldTime attribute.
     * @param yieldTime The yieldTime.
     */ setYieldTime(yieldTime) {
        this.attributes.set($ae74a7b44a6504a1$export$c291f4faacd745a6.s_yieldTime, yieldTime.toString());
    }
}
class $ae74a7b44a6504a1$export$ed9dfbc127680fd1 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:experimentalEigenvalue";
    }
    static{
        /**
     * The key to the EigenvalueID attribute value.
     */ this.s_EigenvalueID = "EigenvalueID";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName, value);
    }
    /**
     * @returns The EigenvalueID attribute or undefined if there is no EigenvalueID attribute.
     */ getEigenvalueID() {
        return this.attributes.get($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_EigenvalueID);
    }
    /**
     * Set the EigenvalueID attribute.
     * @param EigenvalueID The EigenvalueID.
     */ setEigenvalueID(EigenvalueID) {
        this.attributes.set($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_EigenvalueID, EigenvalueID);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        let error = this.attributes.get($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_error);
        if (error != undefined) return parseFloat(error);
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_error, error.toString());
    }
}
class $ae74a7b44a6504a1$export$284227145ed02b04 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    static{
        /**
     * The key to the percent attribute value.
     */ this.s_percent = "percent";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ae74a7b44a6504a1$export$284227145ed02b04.tagName, value);
    }
    /**
     * @returns The percent attribute or undefined if there is no percent attribute.
     */ getPercent() {
        return this.attributes.get($ae74a7b44a6504a1$export$284227145ed02b04.s_percent);
    }
    /**
     * Set the percent attribute.
     * @param percent The percent.
     */ setPercent(percent) {
        this.attributes.set($ae74a7b44a6504a1$export$284227145ed02b04.s_percent, percent);
    }
}
class $ae74a7b44a6504a1$export$3fe97ecb6b172244 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    static{
        /**
     * The precision attribute potential values.
     */ this.precisions = [
            "d",
            "dd",
            "qd",
            "double",
            "double-double",
            "quad-double"
        ];
    }
    static{
        /**
     * The choice of units.
     */ this.pressureUnits = [
            "Torr",
            "PPCC",
            "atm",
            "mbar",
            "psi",
            "mols/cc"
        ];
    }
    static{
        /**
     * The key to the P attribute value.
     */ this.s_P = "P";
    }
    static{
        /**
     * The key to the T attribute value.
     */ this.s_T = "T";
    }
    static{
        /**
     * The key to the precision attribute value.
     */ this.s_precision = "precision";
    }
    static{
        /**
     * The key to the excessReactantConc attribute value.
     */ this.s_excessReactantConc = "excessReactantConc";
    }
    static{
        /**
     * The key to the percentExcessReactantConc attribute value.
     */ this.s_percentExcessReactantConc = "percentExcessReactantConc";
    }
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */ constructor(attributes, bathGas, experimentRate, excessReactantConc, experimentalEigenvalue){
        super(attributes, $ae74a7b44a6504a1$export$3fe97ecb6b172244.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (excessReactantConc != undefined) {
            this.index.set($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
        if (experimentalEigenvalue != undefined) {
            this.index.set($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        let p = this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_P);
        if (p != undefined) return parseFloat(p);
        return NaN;
    }
    /**
     * Set The Pressure
     */ setP(p) {
        this.attributes.set($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_P, p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        let t = this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_T);
        if (t != undefined) return parseFloat(t);
        return NaN;
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        this.attributes.set($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_T, t.toString());
    }
    /**
     * @returns The precision attribute or undefined if there is no precision attribute.
     */ getPrecision() {
        return this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_precision);
    }
    /**
     * Set the precision attribute.
     * @param precision The precision.
     */ setPrecision(precision) {
        this.attributes.set($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_precision, precision);
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
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
     * Remove the bath gas.
     */ removeBathGas() {
        let i = this.index.get($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($ae74a7b44a6504a1$export$b33a132661f4be58.tagName);
        }
    }
    /**
     * @returns The experiment rate.
     */ getExperimentRate() {
        let i = this.index.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentRate(experimentRate) {
        let i = this.index.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        if (i != undefined) this.nodes.set(i, experimentRate);
        else {
            this.index.set($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * Remove the experiment rate.
     */ removeExperimentRate() {
        let i = this.index.get($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($ae74a7b44a6504a1$export$ea088383ce76fc5a.tagName);
        }
    }
    /**
     * @returns this.attributes.get("excessReactantConc").
     */ getExcessReactantConc() {
        return this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_excessReactantConc);
    }
    /**
     * this.attributes.set("excessReactantConc", excessReactantConc).
     */ setExcessReactantConc(excessReactantConc) {
        this.attributes.set($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_excessReactantConc, excessReactantConc);
    }
    /**
     * @returns this.attributes.get("percentExcessReactantConc").
     */ getPercentExcessReactantConc() {
        return this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_percentExcessReactantConc);
    }
    /**
     * this.attributes.set("percentExcessReactantConc", percentExcessReactantConc).
     */ setPercentExcessReactantConc(percentExcessReactantConc) {
        this.attributes.set($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_percentExcessReactantConc, percentExcessReactantConc);
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
     */ constructor(attributes, pTpairs){
        super(attributes, $ae74a7b44a6504a1$export$3be0efe793283834.tagName);
        if (pTpairs != undefined) {
            pTpairs.forEach((pTpair)=>{
                this.addNode(pTpair);
            });
            this.pTpairs = pTpairs;
        } else this.pTpairs = [];
    }
    /**
     * @param i The index of the PTpair to return. 
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */ getPTpair(i) {
        return this.pTpairs[i];
    }
    /**
     * Set the PT at the given index.
     * @param i The index.
     * @returns The PT pairs.
     */ setPTpair(i, pTpair) {
        this.nodes.set(i, pTpair);
        this.pTpairs[i] = pTpair;
    }
    /**
     * Add a PTpair.
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */ addPTpair(pTpair) {
        this.addNode(pTpair);
        this.pTpairs.push(pTpair);
        return this.nodes.size - 1;
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */ setPTpairs(pTpairs) {
        this.nodes.clear();
        pTpairs.forEach((pTpair)=>{
            this.addNode(pTpair);
            this.pTpairs.push(pTpair);
        });
    }
    /**
     * Remove the PT at the given index.
     * @param i The index.
     */ removePTpair(i) {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
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
     * @param bathGases The bath gases.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */ constructor(attributes, bathGases, pTs){
        super(attributes, $ae74a7b44a6504a1$export$363c7374d425f4ad.tagName);
        this.index = new Map();
        this.bathGasesIndex = new Map();
        this.bathGases = new Set();
        if (bathGases != undefined) {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            bathGases.forEach((bathGas)=>{
                this.bathGasesIndex.set(bathGas.value, this.nodes.size);
                this.addNode(bathGas);
                this.bathGases.add(bathGas);
            });
        }
        if (pTs != undefined) {
            this.index.set($ae74a7b44a6504a1$export$3be0efe793283834.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
    /**
     * @returns The bath gases.
     */ getBathGases() {
        return this.bathGases;
    }
    /**
     * @param bathGas The bath gas to add.
     */ addBathGas(bathGas) {
        if (!this.bathGases.has(bathGas)) {
            this.bathGases.add(bathGas);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @param bathGas The bath gas to remove.
     */ removeBathGas(bathGas) {
        if (this.bathGases.has(bathGas)) {
            this.bathGases.delete(bathGas);
            this.nodes.delete(this.bathGasesIndex.get(bathGas.value));
        } else console.warn("Conditions.removeBathGas: bathGas not found to remove.");
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
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $8883b31bd809eb64$export$26e33f0df9ce919d.tagName, value);
    }
}
class $8883b31bd809eb64$export$576b56ca6e34780b extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:automaticallySetMaxEne";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $8883b31bd809eb64$export$576b56ca6e34780b.tagName, value);
    }
}
class $8883b31bd809eb64$export$aa73446724166cdb extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyAboveTheTopHill";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $8883b31bd809eb64$export$aa73446724166cdb.tagName, value);
    }
}
class $8883b31bd809eb64$export$f9c72965e4ddfc8e extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:maxTemperature";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName, value);
    }
}
class $8883b31bd809eb64$export$77f098867dc64198 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:modelParameters";
    }
    /**
     * @param attributes The attributes.
     * @param grainSize The grain size.
     * @param automaticallySetMaxEne The automatically set max energy.
     * @param energyAboveTheTopHill The energy above the top hill.
     * @param maxTemperature The max temperature.
     */ constructor(attributes, grainSize, automaticallySetMaxEne, energyAboveTheTopHill, maxTemperature){
        super(attributes, $8883b31bd809eb64$export$77f098867dc64198.tagName);
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set($8883b31bd809eb64$export$26e33f0df9ce919d.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (automaticallySetMaxEne != undefined) {
            this.index.set($8883b31bd809eb64$export$576b56ca6e34780b.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set($8883b31bd809eb64$export$aa73446724166cdb.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
        if (maxTemperature != undefined) {
            this.index.set($8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName, this.nodes.size);
            this.addNode(maxTemperature);
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
     * Removes the grain size.
     */ removeGrainSize() {
        let i = this.index.get($8883b31bd809eb64$export$26e33f0df9ce919d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($8883b31bd809eb64$export$26e33f0df9ce919d.tagName);
        }
    }
    /**
     * @returns The automatically set max energy or undefined.
     */ getAutomaticallySetMaxEne() {
        let i = this.index.get($8883b31bd809eb64$export$576b56ca6e34780b.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param automaticallySetMaxEne The automatically set max energy.
     */ setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get($8883b31bd809eb64$export$576b56ca6e34780b.tagName);
        if (i) this.nodes.set(i, automaticallySetMaxEne);
        else {
            this.index.set($8883b31bd809eb64$export$576b56ca6e34780b.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }
    /**
     * Removes the automatically set max energy.
     */ removeAutomaticallySetMaxEne() {
        let i = this.index.get($8883b31bd809eb64$export$576b56ca6e34780b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($8883b31bd809eb64$export$576b56ca6e34780b.tagName);
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
    /**
     * Removes the energy above the top hill.
     */ removeEnergyAboveTheTopHill() {
        let i = this.index.get($8883b31bd809eb64$export$aa73446724166cdb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($8883b31bd809eb64$export$aa73446724166cdb.tagName);
        }
    }
    /**
     * @returns The max temperature or undefined.
     */ getMaxTemperature() {
        let i = this.index.get($8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param maxTemperature The max temperature.
     */ setMaxTemperature(maxTemperature) {
        let i = this.index.get($8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName);
        if (i) this.nodes.set(i, maxTemperature);
        else {
            this.index.set($8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
    /**
     * Removes the max temperature.
     */ removeMaxTemperature() {
        let i = this.index.get($8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($8883b31bd809eb64$export$f9c72965e4ddfc8e.tagName);
        }
    }
}



class $b6873406fb778c0b$export$7d9247c9879133fb extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:calculateRateCoefficientsOnly";
    }
    constructor(){
        super($b6873406fb778c0b$export$7d9247c9879133fb.tagName);
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
class $b6873406fb778c0b$export$7e63e5104be309ff extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:printCellTransitionStateFlux";
    }
    constructor(){
        super($b6873406fb778c0b$export$7e63e5104be309ff.tagName);
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
class $b6873406fb778c0b$export$3627f2b606ffd3cb extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:printTSsos";
    }
    constructor(){
        super($b6873406fb778c0b$export$3627f2b606ffd3cb.tagName);
    }
}
class $b6873406fb778c0b$export$c5481d114fddc81c extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainedSpeciesProfile";
    }
    constructor(){
        super($b6873406fb778c0b$export$c5481d114fddc81c.tagName);
    }
}
class $b6873406fb778c0b$export$ec7c00ae1b17b2ab extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainTransitionStateFlux";
    }
    constructor(){
        super($b6873406fb778c0b$export$ec7c00ae1b17b2ab.tagName);
    }
}
class $b6873406fb778c0b$export$8420ab6988728a65 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printReactionOperatorSize";
    }
    constructor(){
        super($b6873406fb778c0b$export$8420ab6988728a65.tagName);
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
class $b6873406fb778c0b$export$9f7939759d8efd9f extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printPhenomenologicalEvolution";
    }
    constructor(){
        super($b6873406fb778c0b$export$9f7939759d8efd9f.tagName);
    }
}
class $b6873406fb778c0b$export$fc99460819e23ac5 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printTunnelingCoefficients";
    }
    constructor(){
        super($b6873406fb778c0b$export$fc99460819e23ac5.tagName);
    }
}
class $b6873406fb778c0b$export$2f2eaac8983031ef extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printCrossingCoefficients";
    }
    constructor(){
        super($b6873406fb778c0b$export$2f2eaac8983031ef.tagName);
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
class $b6873406fb778c0b$export$724a5a49739f4b4a extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testRateConstants";
    }
    constructor(){
        super($b6873406fb778c0b$export$724a5a49739f4b4a.tagName);
    }
}
class $b6873406fb778c0b$export$5d7dbeba4bf49655 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:useTheSameCellNumberForAllConditions";
    }
    constructor(){
        super($b6873406fb778c0b$export$5d7dbeba4bf49655.tagName);
    }
}
class $b6873406fb778c0b$export$6ffea14bdffd427f extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:ForceMacroDetailedBalance";
    }
    constructor(){
        super($b6873406fb778c0b$export$6ffea14bdffd427f.tagName);
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
class $b6873406fb778c0b$export$f0bfd84d03c3a22d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:calcMethod";
    }
    static{
        /**
     * The possible values.
     */ this.options = [
            "simpleCalc",
            "gridSearch",
            "fitting",
            "marquardt",
            "analyticalRepresentation",
            "ThermodynamicTable",
            "sensitivityAnalysis",
            "me:simpleCalc",
            "me:gridSearch",
            "me:fitting",
            "me:marquardt",
            "me:analyticalRepresentation",
            "me:ThermodynamicTable",
            "me:sensitivityAnalysis"
        ];
    }
    /**
     * @param value The value.
     */ constructor(attributes){
        super(attributes, $b6873406fb778c0b$export$f0bfd84d03c3a22d.tagName);
    }
}
class $b6873406fb778c0b$export$afd374542f6f3da6 extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
     * The xsi_type.
     */ this.xsi_type = "me:simpleCalc";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "simpleCalc";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class $b6873406fb778c0b$export$271191b096a55e63 extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
    * The xsi_type.
    */ this.xsi_type = "me:gridSearch";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "gridSearch";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class $b6873406fb778c0b$export$830a50cd13af6e84 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:fittingIterations";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$830a50cd13af6e84.tagName, value);
    }
}
class $b6873406fb778c0b$export$654b70df01671c79 extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
     * The xsi_type.
     */ this.xsi_type = "me:fitting";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "fitting";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, fittingIterations){
        super(attributes);
        if (fittingIterations != undefined) this.addNode(fittingIterations);
    }
    /**
     * @returns The fittingIterations or undefined.
     */ getFittingIterations() {
        return this.nodes.get(0);
    }
    /**
     * @param fittingIterations The fittingIterations.
     */ setFittingIterations(fittingIterations) {
        this.nodes.set(0, fittingIterations);
    }
    /**
     * Remove the fittingIterations.
     */ removeFittingIterations() {
        this.nodes.delete(0);
    }
}
class $b6873406fb778c0b$export$9f699e98369d9591 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtIterations";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$9f699e98369d9591.tagName, value);
    }
}
class $b6873406fb778c0b$export$ca1e6c3ff9fd3627 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtTolerance";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName, value);
    }
}
class $b6873406fb778c0b$export$d3887b529debf19d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtDerivDelta";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$d3887b529debf19d.tagName, value);
    }
}
class $b6873406fb778c0b$export$7968aa666bcf62fa extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:marquardt";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "marquardt";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, marquardtIterations, marquardtTolerance, marquardtDerivDelta){
        super(attributes);
        this.index = new Map();
        if (marquardtIterations != undefined) {
            this.index.set($b6873406fb778c0b$export$9f699e98369d9591.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
        if (marquardtTolerance != undefined) {
            this.index.set($b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
        if (marquardtDerivDelta != undefined) {
            this.index.set($b6873406fb778c0b$export$d3887b529debf19d.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }
    /**
     * @returns The marquardtIterations or undefined.
     */ getMarquardtIterations() {
        let i = this.index.get($b6873406fb778c0b$export$9f699e98369d9591.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtIterations The marquardtIterations.
     */ setMarquardtIterations(marquardtIterations) {
        let i = this.index.get($b6873406fb778c0b$export$9f699e98369d9591.tagName);
        if (i != undefined) this.nodes.set(i, marquardtIterations);
        else {
            this.index.set($b6873406fb778c0b$export$9f699e98369d9591.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
    }
    /**
     * Remove the marquardtIterations.
     */ removeMarquardtIterations() {
        let i = this.index.get($b6873406fb778c0b$export$9f699e98369d9591.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$9f699e98369d9591.tagName);
        }
    }
    /**
     * @returns The marquardtTolerance or undefined.
     */ getMarquardtTolerance() {
        let i = this.index.get($b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtTolerance The marquardtTolerance.
     */ setMarquardtTolerance(marquardtTolerance) {
        let i = this.index.get($b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName);
        if (i != undefined) this.nodes.set(i, marquardtTolerance);
        else {
            this.index.set($b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
    }
    /**
     * Remove the marquardtTolerance.
     */ removeMarquardtTolerance() {
        let i = this.index.get($b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$ca1e6c3ff9fd3627.tagName);
        }
    }
    /**
     * @returns The marquardtDerivDelta or undefined.
     */ getMarquardtDerivDelta() {
        let i = this.index.get($b6873406fb778c0b$export$d3887b529debf19d.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtDerivDelta The marquardtDerivDelta.
     */ setMarquardtDerivDelta(marquardtDerivDelta) {
        let i = this.index.get($b6873406fb778c0b$export$d3887b529debf19d.tagName);
        if (i != undefined) this.nodes.set(i, marquardtDerivDelta);
        else {
            this.index.set($b6873406fb778c0b$export$d3887b529debf19d.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }
    /**
     * Remove the marquardtDerivDelta.
     */ removeMarquardtDerivDelta() {
        let i = this.index.get($b6873406fb778c0b$export$d3887b529debf19d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$d3887b529debf19d.tagName);
        }
    }
}
class $b6873406fb778c0b$export$85eca882ff5fb66 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:useTraceWeighting";
    }
    constructor(){
        super($b6873406fb778c0b$export$85eca882ff5fb66.tagName);
    }
}
class $b6873406fb778c0b$export$93514d28bd18d75a extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:format";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$be201676156f3e60 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:format";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$19d20f3642d82681 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebNumTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$906be0805438fd80 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebNumConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$6ab4fe1621c91452 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMaxTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$e9853d49316ae9ae extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMinTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$39eacc768d7e9bb extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMaxConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
    /**
     * @returns The units.
     */ getUnits() {
        return this.attributes.get("units");
    }
    /**
     * @param units The units.
     */ setUnits(units) {
        this.attributes.set("units", units);
    }
}
class $b6873406fb778c0b$export$78194e57ce26d99a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMinConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$96094ac7e31a750e extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebTExSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$ae695595d3952700 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebPExSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
}
class $b6873406fb778c0b$export$fe9781900d201bdf extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:analyticalRepresentation";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "analyticalRepresentation";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, format, precision, chebNumTemp, chebNumConc, chebMaxTemp, chebMinTemp, chebMaxConc, chebMinConc, chebTExSize, chebPExSize){
        super(attributes);
        this.index = new Map();
        if (format != undefined) {
            this.index.set($b6873406fb778c0b$export$93514d28bd18d75a.tagName, this.nodes.size);
            this.addNode(format);
        }
        if (precision != undefined) {
            this.index.set($b6873406fb778c0b$export$be201676156f3e60.tagName, this.nodes.size);
            this.addNode(precision);
        }
        if (chebNumTemp != undefined) {
            this.index.set($b6873406fb778c0b$export$19d20f3642d82681.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
        if (chebNumConc != undefined) {
            this.index.set($b6873406fb778c0b$export$906be0805438fd80.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
        if (chebMaxTemp != undefined) {
            this.index.set($b6873406fb778c0b$export$6ab4fe1621c91452.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
        if (chebMinTemp != undefined) {
            this.index.set($b6873406fb778c0b$export$e9853d49316ae9ae.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
        if (chebMaxConc != undefined) {
            this.index.set($b6873406fb778c0b$export$39eacc768d7e9bb.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
        if (chebMinConc != undefined) {
            this.index.set($b6873406fb778c0b$export$78194e57ce26d99a.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
        if (chebTExSize != undefined) {
            this.index.set($b6873406fb778c0b$export$96094ac7e31a750e.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
        if (chebPExSize != undefined) {
            this.index.set($b6873406fb778c0b$export$ae695595d3952700.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }
    /**
     * @returns The format or undefined.
     */ getFormat() {
        let i = this.index.get($b6873406fb778c0b$export$93514d28bd18d75a.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param format The format.
     */ setFormat(format) {
        let i = this.index.get($b6873406fb778c0b$export$93514d28bd18d75a.tagName);
        if (i != undefined) this.nodes.set(i, format);
        else {
            this.index.set($b6873406fb778c0b$export$93514d28bd18d75a.tagName, this.nodes.size);
            this.addNode(format);
        }
    }
    /**
     * Remove the format.
     */ removeFormat() {
        let i = this.index.get($b6873406fb778c0b$export$93514d28bd18d75a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$93514d28bd18d75a.tagName);
        }
    }
    /**
     * @returns The precision or undefined.
     */ getPrecision() {
        let i = this.index.get($b6873406fb778c0b$export$be201676156f3e60.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param precision The precision.
     */ setPrecision(precision) {
        let i = this.index.get($b6873406fb778c0b$export$be201676156f3e60.tagName);
        if (i != undefined) this.nodes.set(i, precision);
        else {
            this.index.set($b6873406fb778c0b$export$be201676156f3e60.tagName, this.nodes.size);
            this.addNode(precision);
        }
    }
    /**
     * Remove the precision.
     */ removePrecision() {
        let i = this.index.get($b6873406fb778c0b$export$be201676156f3e60.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$be201676156f3e60.tagName);
        }
    }
    /**
     * @returns The chebNumTemp or undefined.
     */ getChebNumTemp() {
        let i = this.index.get($b6873406fb778c0b$export$19d20f3642d82681.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebNumTemp The chebNumTemp.
     */ setChebNumTemp(chebNumTemp) {
        let i = this.index.get($b6873406fb778c0b$export$19d20f3642d82681.tagName);
        if (i != undefined) this.nodes.set(i, chebNumTemp);
        else {
            this.index.set($b6873406fb778c0b$export$19d20f3642d82681.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
    }
    /**
     * Remove the chebNumTemp.
     */ removeChebNumTemp() {
        let i = this.index.get($b6873406fb778c0b$export$19d20f3642d82681.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$19d20f3642d82681.tagName);
        }
    }
    /**
     * @returns The chebNumConc or undefined.
     */ getChebNumConc() {
        let i = this.index.get($b6873406fb778c0b$export$906be0805438fd80.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebNumConc The chebNumConc.
     */ setChebNumConc(chebNumConc) {
        let i = this.index.get($b6873406fb778c0b$export$906be0805438fd80.tagName);
        if (i != undefined) this.nodes.set(i, chebNumConc);
        else {
            this.index.set($b6873406fb778c0b$export$906be0805438fd80.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
    }
    /**
     * Remove the chebNumConc.
     */ removeChebNumConc() {
        let i = this.index.get($b6873406fb778c0b$export$906be0805438fd80.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$906be0805438fd80.tagName);
        }
    }
    /**
     * @returns The chebMaxTemp or undefined.
     */ getChebMaxTemp() {
        let i = this.index.get($b6873406fb778c0b$export$6ab4fe1621c91452.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMaxTemp The chebMaxTemp.
     */ setChebMaxTemp(chebMaxTemp) {
        let i = this.index.get($b6873406fb778c0b$export$6ab4fe1621c91452.tagName);
        if (i != undefined) this.nodes.set(i, chebMaxTemp);
        else {
            this.index.set($b6873406fb778c0b$export$6ab4fe1621c91452.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
    }
    /**
     * Remove the chebMaxTemp.
     */ removeChebMaxTemp() {
        let i = this.index.get($b6873406fb778c0b$export$6ab4fe1621c91452.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$6ab4fe1621c91452.tagName);
        }
    }
    /**
     * @returns The chebMinTemp or undefined.
     */ getChebMinTemp() {
        let i = this.index.get($b6873406fb778c0b$export$e9853d49316ae9ae.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMinTemp The chebMinTemp.
     */ setChebMinTemp(chebMinTemp) {
        let i = this.index.get($b6873406fb778c0b$export$e9853d49316ae9ae.tagName);
        if (i != undefined) this.nodes.set(i, chebMinTemp);
        else {
            this.index.set($b6873406fb778c0b$export$e9853d49316ae9ae.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
    }
    /**
     * Remove the chebMinTemp.
     */ removeChebMinTemp() {
        let i = this.index.get($b6873406fb778c0b$export$e9853d49316ae9ae.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$e9853d49316ae9ae.tagName);
        }
    }
    /**
     * @returns The chebMaxConc or undefined.
     */ getChebMaxConc() {
        let i = this.index.get($b6873406fb778c0b$export$39eacc768d7e9bb.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMaxConc The chebMaxConc.
     */ setChebMaxConc(chebMaxConc) {
        let i = this.index.get($b6873406fb778c0b$export$39eacc768d7e9bb.tagName);
        if (i != undefined) this.nodes.set(i, chebMaxConc);
        else {
            this.index.set($b6873406fb778c0b$export$39eacc768d7e9bb.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
    }
    /**
     * Remove the chebMaxConc.
     */ removeChebMaxConc() {
        let i = this.index.get($b6873406fb778c0b$export$39eacc768d7e9bb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$39eacc768d7e9bb.tagName);
        }
    }
    /**
     * @returns The chebMinConc or undefined.
     */ getChebMinConc() {
        let i = this.index.get($b6873406fb778c0b$export$78194e57ce26d99a.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMinConc The chebMinConc.
     */ setChebMinConc(chebMinConc) {
        let i = this.index.get($b6873406fb778c0b$export$78194e57ce26d99a.tagName);
        if (i != undefined) this.nodes.set(i, chebMinConc);
        else {
            this.index.set($b6873406fb778c0b$export$78194e57ce26d99a.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
    }
    /**
     * Remove the chebMinConc.
     */ removeChebMinConc() {
        let i = this.index.get($b6873406fb778c0b$export$78194e57ce26d99a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$78194e57ce26d99a.tagName);
        }
    }
    /**
     * @returns The chebTExSize or undefined.
     */ getChebTExSize() {
        let i = this.index.get($b6873406fb778c0b$export$96094ac7e31a750e.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebTExSize The chebTExSize.
     */ setChebTExSize(chebTExSize) {
        let i = this.index.get($b6873406fb778c0b$export$96094ac7e31a750e.tagName);
        if (i != undefined) this.nodes.set(i, chebTExSize);
        else {
            this.index.set($b6873406fb778c0b$export$96094ac7e31a750e.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
    }
    /**
     * Remove the chebTExSize.
     */ removeChebTExSize() {
        let i = this.index.get($b6873406fb778c0b$export$96094ac7e31a750e.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$96094ac7e31a750e.tagName);
        }
    }
    /**
     * @returns The chebPExSize or undefined.
     */ getChebPExSize() {
        let i = this.index.get($b6873406fb778c0b$export$ae695595d3952700.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebPExSize The chebPExSize.
     */ setChebPExSize(chebPExSize) {
        let i = this.index.get($b6873406fb778c0b$export$ae695595d3952700.tagName);
        if (i != undefined) this.nodes.set(i, chebPExSize);
        else {
            this.index.set($b6873406fb778c0b$export$ae695595d3952700.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }
    /**
     * Remove the chebPExSize.
     */ removeChebPExSize() {
        let i = this.index.get($b6873406fb778c0b$export$ae695595d3952700.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$ae695595d3952700.tagName);
        }
    }
}
class $b6873406fb778c0b$export$7be1a36e1f74dbc7 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmin";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName, value);
    }
}
class $b6873406fb778c0b$export$ac2eb7df727f506d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmid";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$ac2eb7df727f506d.tagName, value);
    }
}
class $b6873406fb778c0b$export$58c8f4b7ec654137 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmax";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$58c8f4b7ec654137.tagName, value);
    }
}
class $b6873406fb778c0b$export$7b8cfe3a6a460886 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tstep";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName, value);
    }
}
class $b6873406fb778c0b$export$16ef3f79998b60b4 extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:ThermodynamicTable";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "ThermodynamicTable";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, tmin, tmid, tmax, tstep){
        super(attributes);
        this.index = new Map();
        if (tmin != undefined) {
            this.index.set($b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName, this.nodes.size);
            this.addNode(tmin);
        }
        if (tmid != undefined) {
            this.index.set($b6873406fb778c0b$export$ac2eb7df727f506d.tagName, this.nodes.size);
            this.addNode(tmid);
        }
        if (tmax != undefined) {
            this.index.set($b6873406fb778c0b$export$58c8f4b7ec654137.tagName, this.nodes.size);
            this.addNode(tmax);
        }
        if (tstep != undefined) {
            this.index.set($b6873406fb778c0b$export$7b8cfe3a6a460886.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }
    /**
     * @returns The tmin or undefined.
     */ getTmin() {
        let i = this.index.get($b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmin The tmin.
     */ setTmin(tmin) {
        let i = this.index.get($b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName);
        if (i != undefined) this.nodes.set(i, tmin);
        else {
            this.index.set($b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName, this.nodes.size);
            this.addNode(tmin);
        }
    }
    /**
     * Remove the tmin.
     */ removeTmin() {
        let i = this.index.get($b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$7be1a36e1f74dbc7.tagName);
        }
    }
    /**
     * @returns The tmid or undefined.
     */ getTmid() {
        let i = this.index.get($b6873406fb778c0b$export$ac2eb7df727f506d.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmid The tmid.
     */ setTmid(tmid) {
        let i = this.index.get($b6873406fb778c0b$export$ac2eb7df727f506d.tagName);
        if (i != undefined) this.nodes.set(i, tmid);
        else {
            this.index.set($b6873406fb778c0b$export$ac2eb7df727f506d.tagName, this.nodes.size);
            this.addNode(tmid);
        }
    }
    /**
     * Remove the tmid.
     */ removeTmid() {
        let i = this.index.get($b6873406fb778c0b$export$ac2eb7df727f506d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$ac2eb7df727f506d.tagName);
        }
    }
    /**
     * @returns The tmax or undefined.
     */ getTmax() {
        let i = this.index.get($b6873406fb778c0b$export$58c8f4b7ec654137.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmax The tmax.
     */ setTmax(tmax) {
        let i = this.index.get($b6873406fb778c0b$export$58c8f4b7ec654137.tagName);
        if (i != undefined) this.nodes.set(i, tmax);
        else {
            this.index.set($b6873406fb778c0b$export$58c8f4b7ec654137.tagName, this.nodes.size);
            this.addNode(tmax);
        }
    }
    /**
     * Remove the tmax.
     */ removeTmax() {
        let i = this.index.get($b6873406fb778c0b$export$58c8f4b7ec654137.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$58c8f4b7ec654137.tagName);
        }
    }
    /**
     * @returns The tstep or undefined.
     */ getTstep() {
        let i = this.index.get($b6873406fb778c0b$export$7b8cfe3a6a460886.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tstep The tstep.
     */ setTstep(tstep) {
        let i = this.index.get($b6873406fb778c0b$export$7b8cfe3a6a460886.tagName);
        if (i != undefined) this.nodes.set(i, tstep);
        else {
            this.index.set($b6873406fb778c0b$export$7b8cfe3a6a460886.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }
    /**
     * Remove the tstep.
     */ removeTstep() {
        let i = this.index.get($b6873406fb778c0b$export$7b8cfe3a6a460886.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$7b8cfe3a6a460886.tagName);
        }
    }
}
class $b6873406fb778c0b$export$37d0520a9fac7849 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityAnalysisSamples";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$37d0520a9fac7849.tagName, value);
    }
}
class $b6873406fb778c0b$export$9a832710e54827ea extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityAnalysisOrder";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$9a832710e54827ea.tagName, value);
    }
}
class $b6873406fb778c0b$export$b43b57458ce8fb96 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityNumVarRedIters";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$b43b57458ce8fb96.tagName, value);
    }
}
class $b6873406fb778c0b$export$e98aeac6c6b1df09 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityVarRedMethod";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$e98aeac6c6b1df09.tagName, value);
    }
}
class $b6873406fb778c0b$export$a532500cc43efbef extends $b6873406fb778c0b$export$f0bfd84d03c3a22d {
    static{
        /**
    * The xsi_type.
    */ this.xsi_type = "me:sensitivityAnalysis";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "sensitivityAnalysis";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, sensitivityAnalysisSamples, sensitivityAnalysisOrder, sensitivityNumVarRedIters, sensitivityVarRedMethod){
        super(attributes);
        this.index = new Map();
        if (sensitivityAnalysisSamples != undefined) {
            this.index.set($b6873406fb778c0b$export$37d0520a9fac7849.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
        if (sensitivityAnalysisOrder != undefined) {
            this.index.set($b6873406fb778c0b$export$9a832710e54827ea.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
        if (sensitivityNumVarRedIters != undefined) {
            this.index.set($b6873406fb778c0b$export$b43b57458ce8fb96.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
        if (sensitivityVarRedMethod != undefined) {
            this.index.set($b6873406fb778c0b$export$e98aeac6c6b1df09.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }
    /**
     * @returns The sensitivityAnalysisSamples or undefined.
     */ getSensitivityAnalysisSamples() {
        let i = this.index.get($b6873406fb778c0b$export$37d0520a9fac7849.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityAnalysisSamples The sensitivityAnalysisSamples.
     */ setSensitivityAnalysisSamples(sensitivityAnalysisSamples) {
        let i = this.index.get($b6873406fb778c0b$export$37d0520a9fac7849.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityAnalysisSamples);
        else {
            this.index.set($b6873406fb778c0b$export$37d0520a9fac7849.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
    }
    /**
     * Remove the sensitivityAnalysisSamples.
     */ removeSensitivityAnalysisSamples() {
        let i = this.index.get($b6873406fb778c0b$export$37d0520a9fac7849.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$37d0520a9fac7849.tagName);
        }
    }
    /**
     * @returns The sensitivityAnalysisOrder or undefined.
     */ getSensitivityAnalysisOrder() {
        let i = this.index.get($b6873406fb778c0b$export$9a832710e54827ea.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityAnalysisOrder The sensitivityAnalysisOrder.
     */ setSensitivityAnalysisOrder(sensitivityAnalysisOrder) {
        let i = this.index.get($b6873406fb778c0b$export$9a832710e54827ea.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityAnalysisOrder);
        else {
            this.index.set($b6873406fb778c0b$export$9a832710e54827ea.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
    }
    /**
     * Remove the sensitivityAnalysisOrder.
     */ removeSensitivityAnalysisOrder() {
        let i = this.index.get($b6873406fb778c0b$export$9a832710e54827ea.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$9a832710e54827ea.tagName);
        }
    }
    /**
     * @returns The sensitivityNumVarRedIters or undefined.
     */ getSensitivityNumVarRedIters() {
        let i = this.index.get($b6873406fb778c0b$export$b43b57458ce8fb96.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityNumVarRedIters The sensitivityNumVarRedIters.
     */ setSensitivityNumVarRedIters(sensitivityNumVarRedIters) {
        let i = this.index.get($b6873406fb778c0b$export$b43b57458ce8fb96.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityNumVarRedIters);
        else {
            this.index.set($b6873406fb778c0b$export$b43b57458ce8fb96.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
    }
    /**
     * Remove the sensitivityNumVarRedIters.
     */ removeSensitivityNumVarRedIters() {
        let i = this.index.get($b6873406fb778c0b$export$b43b57458ce8fb96.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$b43b57458ce8fb96.tagName);
        }
    }
    /**
     * @returns The sensitivityVarRedMethod or undefined.
     */ getSensitivityVarRedMethod() {
        let i = this.index.get($b6873406fb778c0b$export$e98aeac6c6b1df09.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityVarRedMethod The sensitivityVarRedMethod.
     */ setSensitivityVarRedMethod(sensitivityVarRedMethod) {
        let i = this.index.get($b6873406fb778c0b$export$e98aeac6c6b1df09.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityVarRedMethod);
        else {
            this.index.set($b6873406fb778c0b$export$e98aeac6c6b1df09.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }
    /**
     * Remove the sensitivityVarRedMethod.
     */ removeSensitivityVarRedMethod() {
        let i = this.index.get($b6873406fb778c0b$export$e98aeac6c6b1df09.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$e98aeac6c6b1df09.tagName);
        }
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
class $b6873406fb778c0b$export$421603058c6718db extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:shortestTimeOfInterest";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$421603058c6718db.tagName, value);
    }
}
class $b6873406fb778c0b$export$b51d7314540831ed extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MaximumEvolutionTime";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$b51d7314540831ed.tagName, value);
    }
}
class $b6873406fb778c0b$export$576b56ca6e34780b extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:automaticallySetMaxEne";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$576b56ca6e34780b.tagName, value);
    }
}
class $b6873406fb778c0b$export$159b5d3263f1049a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:diagramEnergyOffset";
    }
    /**
      * @param attributes The attributes.
      * @param value The value.
      */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$159b5d3263f1049a.tagName, value);
    }
}
class $b6873406fb778c0b$export$1f37c7c73e401f31 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testMicroRates";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $b6873406fb778c0b$export$1f37c7c73e401f31.tagName);
        this.tMin = parseFloat(attributes.get("Tmin"));
        this.tMax = parseFloat(attributes.get("Tmax"));
        this.tStep = parseFloat(attributes.get("Tstep"));
    }
    /**
     * @returns The maximum temperature.
     */ getTmin() {
        return this.tMin;
    }
    /**
     * @param tMin The minimum temperature.
     */ setTmin(tMin) {
        this.tMin = tMin;
        this.attributes?.set("Tmin", tMin.toString());
    }
    /**
     * @returns The maximum temperature.
     */ getTmax() {
        return this.tMax;
    }
    /**
     * @param tMax The maximum temperature.
     */ setTmax(tMax) {
        this.tMax = tMax;
        this.attributes?.set("Tmax", tMax.toString());
    }
    /**
     * @returns The temperature step.
     */ getTstep() {
        return this.tStep;
    }
    /**
     * @param tStep The temperature step.
     */ setTstep(tStep) {
        this.tStep = tStep;
        this.attributes?.set("Tstep", tStep.toString());
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
     */ constructor(attributes){
        super(attributes, $b6873406fb778c0b$export$7a7fa4424cb20976.tagName);
        this.index = new Map();
    }
    /**
     * @returns The calculateRateCoefficientsOnly or undefined.
     */ getCalculateRateCoefficientsOnly() {
        let i = this.index.get($b6873406fb778c0b$export$7d9247c9879133fb.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param calculateRateCoefficientsOnly The calculateRateCoefficientsOnly.
     */ setCalculateRateCoefficientsOnly(calculateRateCoefficientsOnly) {
        let i = this.index.get($b6873406fb778c0b$export$7d9247c9879133fb.tagName);
        if (i != undefined) this.nodes.set(i, calculateRateCoefficientsOnly);
        else {
            this.index.set($b6873406fb778c0b$export$7d9247c9879133fb.tagName, this.nodes.size);
            this.addNode(calculateRateCoefficientsOnly);
        }
    }
    /**
     * Remove the calculateRateCoefficientsOnly.
     */ removeCalculateRateCoefficientsOnly() {
        let i = this.index.get($b6873406fb778c0b$export$7d9247c9879133fb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$7d9247c9879133fb.tagName);
        }
    }
    /**
     * @returns The printCellDOS or undefined.
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
     * @returns The printCellTransitionStateFlux or undefined.
     */ getPrintCellTransitionStateFlux() {
        let i = this.index.get($b6873406fb778c0b$export$7e63e5104be309ff.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCellTransitionStateFlux The printCellTransitionStateFlux.
     */ setPrintCellTransitionStateFlux(printCellTransitionStateFlux) {
        let i = this.index.get($b6873406fb778c0b$export$7e63e5104be309ff.tagName);
        if (i != undefined) this.nodes.set(i, printCellTransitionStateFlux);
        else {
            this.index.set($b6873406fb778c0b$export$7e63e5104be309ff.tagName, this.nodes.size);
            this.addNode(printCellTransitionStateFlux);
        }
    }
    /**
     * Remove the printCellTransitionStateFlux.
     */ removePrintCellTransitionStateFlux() {
        let i = this.index.get($b6873406fb778c0b$export$7e63e5104be309ff.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$7e63e5104be309ff.tagName);
        }
    }
    /**
     * @returns The printReactionOperatorColumnSums or undefined.
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
     * @returns The printGrainBoltzmann or undefined.
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
     * @returns The printGrainDOS or undefined.
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
     * @returns The printGrainkbE or undefined.
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
     * @returns The printGrainkfE or undefined.
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
     * @returns The printTSsos or undefined.
     */ getPrintTSsos() {
        let i = this.index.get($b6873406fb778c0b$export$3627f2b606ffd3cb.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTSsos The printTSsos.
     */ setPrintTSsos(printTSsos) {
        let i = this.index.get($b6873406fb778c0b$export$3627f2b606ffd3cb.tagName);
        if (i != undefined) this.nodes.set(i, printTSsos);
        else {
            this.index.set($b6873406fb778c0b$export$3627f2b606ffd3cb.tagName, this.nodes.size);
            this.addNode(printTSsos);
        }
    }
    /**
     * Remove the printTSsos.
     */ removePrintTSsos() {
        let i = this.index.get($b6873406fb778c0b$export$3627f2b606ffd3cb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$3627f2b606ffd3cb.tagName);
        }
    }
    /**
     * @returns The printGrainedSpeciesProfile or undefined.
     */ getPrintGrainedSpeciesProfile() {
        let i = this.index.get($b6873406fb778c0b$export$c5481d114fddc81c.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainedSpeciesProfile The printGrainedSpeciesProfile.
     */ setPrintGrainedSpeciesProfile(printGrainedSpeciesProfile) {
        let i = this.index.get($b6873406fb778c0b$export$c5481d114fddc81c.tagName);
        if (i != undefined) this.nodes.set(i, printGrainedSpeciesProfile);
        else {
            this.index.set($b6873406fb778c0b$export$c5481d114fddc81c.tagName, this.nodes.size);
            this.addNode(printGrainedSpeciesProfile);
        }
    }
    /**
     * Remove the printGrainedSpeciesProfile.
     */ removePrintGrainedSpeciesProfile() {
        let i = this.index.get($b6873406fb778c0b$export$c5481d114fddc81c.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$c5481d114fddc81c.tagName);
        }
    }
    /**
     * @returns The printGrainTransitionStateFlux or undefined.
     */ getPrintGrainTransitionStateFlux() {
        let i = this.index.get($b6873406fb778c0b$export$ec7c00ae1b17b2ab.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainTransitionStateFlux The printGrainTransitionStateFlux.
     */ setPrintGrainTransitionStateFlux(printGrainTransitionStateFlux) {
        let i = this.index.get($b6873406fb778c0b$export$ec7c00ae1b17b2ab.tagName);
        if (i != undefined) this.nodes.set(i, printGrainTransitionStateFlux);
        else {
            this.index.set($b6873406fb778c0b$export$ec7c00ae1b17b2ab.tagName, this.nodes.size);
            this.addNode(printGrainTransitionStateFlux);
        }
    }
    /**
     * Remove the printGrainTransitionStateFlux.
     */ removePrintGrainTransitionStateFlux() {
        let i = this.index.get($b6873406fb778c0b$export$ec7c00ae1b17b2ab.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$ec7c00ae1b17b2ab.tagName);
        }
    }
    /**
     * @returns The printReactionOperatorSize or undefined.
     */ getPrintReactionOperatorSize() {
        let i = this.index.get($b6873406fb778c0b$export$8420ab6988728a65.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printReactionOperatorSize The printReactionOperatorSize.
     */ setPrintReactionOperatorSize(printReactionOperatorSize) {
        let i = this.index.get($b6873406fb778c0b$export$8420ab6988728a65.tagName);
        if (i != undefined) this.nodes.set(i, printReactionOperatorSize);
        else {
            this.index.set($b6873406fb778c0b$export$8420ab6988728a65.tagName, this.nodes.size);
            this.addNode(printReactionOperatorSize);
        }
    }
    /**
     * Remove the printReactionOperatorSize.
     */ removePrintReactionOperatorSize() {
        let i = this.index.get($b6873406fb778c0b$export$8420ab6988728a65.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$8420ab6988728a65.tagName);
        }
    }
    /**
     * @returns The printSpeciesProfile or undefined.
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
     * @returns The printPhenomenologicalEvolution or undefined.
     */ getPrintPhenomenologicalEvolution() {
        let i = this.index.get($b6873406fb778c0b$export$9f7939759d8efd9f.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printPhenomenologicalEvolution The printPhenomenologicalEvolution.
     */ setPrintPhenomenologicalEvolution(printPhenomenologicalEvolution) {
        let i = this.index.get($b6873406fb778c0b$export$9f7939759d8efd9f.tagName);
        if (i != undefined) this.nodes.set(i, printPhenomenologicalEvolution);
        else {
            this.index.set($b6873406fb778c0b$export$9f7939759d8efd9f.tagName, this.nodes.size);
            this.addNode(printPhenomenologicalEvolution);
        }
    }
    /**
     * Remove the printPhenomenologicalEvolution.
     */ removePrintPhenomenologicalEvolution() {
        let i = this.index.get($b6873406fb778c0b$export$9f7939759d8efd9f.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$9f7939759d8efd9f.tagName);
        }
    }
    /**
     * @returns The printTunnelingCoefficients or undefined.
     */ getPrintTunnelingCoefficients() {
        let i = this.index.get($b6873406fb778c0b$export$fc99460819e23ac5.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTunnelingCoefficients The printTunnelingCoefficients.
     */ setPrintTunnelingCoefficients(printTunnelingCoefficients) {
        let i = this.index.get($b6873406fb778c0b$export$fc99460819e23ac5.tagName);
        if (i != undefined) this.nodes.set(i, printTunnelingCoefficients);
        else {
            this.index.set($b6873406fb778c0b$export$fc99460819e23ac5.tagName, this.nodes.size);
            this.addNode(printTunnelingCoefficients);
        }
    }
    /**
     * Remove the printTunnelingCoefficients.
     */ removePrintTunnelingCoefficients() {
        let i = this.index.get($b6873406fb778c0b$export$fc99460819e23ac5.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$fc99460819e23ac5.tagName);
        }
    }
    /**
     * @returns The printCrossingCoefficients or undefined.
     */ getPrintCrossingCoefficients() {
        let i = this.index.get($b6873406fb778c0b$export$2f2eaac8983031ef.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCrossingCoefficients The printCrossingCoefficients.
     */ setPrintCrossingCoefficients(printCrossingCoefficients) {
        let i = this.index.get($b6873406fb778c0b$export$2f2eaac8983031ef.tagName);
        if (i != undefined) this.nodes.set(i, printCrossingCoefficients);
        else {
            this.index.set($b6873406fb778c0b$export$2f2eaac8983031ef.tagName, this.nodes.size);
            this.addNode(printCrossingCoefficients);
        }
    }
    /**
     * Remove the printCrossingCoefficients.
     */ removePrintCrossingCoefficients() {
        let i = this.index.get($b6873406fb778c0b$export$2f2eaac8983031ef.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$2f2eaac8983031ef.tagName);
        }
    }
    /**
     * @returns The testDOS or undefined.
     */ getTestDOS() {
        let i = this.index.get($b6873406fb778c0b$export$a3d7e677521f681f.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
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
     * @returns The testRateConstant or undefined.
     */ getTestRateConstants() {
        let i = this.index.get($b6873406fb778c0b$export$724a5a49739f4b4a.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstants(testRateConstant) {
        let i = this.index.get($b6873406fb778c0b$export$724a5a49739f4b4a.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set($b6873406fb778c0b$export$724a5a49739f4b4a.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstants() {
        let i = this.index.get($b6873406fb778c0b$export$724a5a49739f4b4a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$724a5a49739f4b4a.tagName);
        }
    }
    /**
     * @returns The useTheSameCellNumberForAllConditions or undefined.
     */ getUseTheSameCellNumberForAllConditions() {
        let i = this.index.get($b6873406fb778c0b$export$5d7dbeba4bf49655.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param useTheSameCellNumberForAllConditions The useTheSameCellNumberForAllConditions.
     */ setUseTheSameCellNumberForAllConditions(useTheSameCellNumberForAllConditions) {
        let i = this.index.get($b6873406fb778c0b$export$5d7dbeba4bf49655.tagName);
        if (i != undefined) this.nodes.set(i, useTheSameCellNumberForAllConditions);
        else {
            this.index.set($b6873406fb778c0b$export$5d7dbeba4bf49655.tagName, this.nodes.size);
            this.addNode(useTheSameCellNumberForAllConditions);
        }
    }
    /**
     * Remove the useTheSameCellNumberForAllConditions.
     */ removeUseTheSameCellNumberForAllConditions() {
        let i = this.index.get($b6873406fb778c0b$export$5d7dbeba4bf49655.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$5d7dbeba4bf49655.tagName);
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
     * @returns The ForceMacroDetailedBalance or undefined.
     */ getForceMacroDetailedBalance() {
        let i = this.index.get($b6873406fb778c0b$export$6ffea14bdffd427f.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param forceMacroDetailedBalance The forceMacroDetailedBalance.
     */ setForceMacroDetailedBalance(forceMacroDetailedBalance) {
        let i = this.index.get($b6873406fb778c0b$export$6ffea14bdffd427f.tagName);
        if (i != undefined) this.nodes.set(i, forceMacroDetailedBalance);
        else {
            this.index.set($b6873406fb778c0b$export$6ffea14bdffd427f.tagName, this.nodes.size);
            this.addNode(forceMacroDetailedBalance);
        }
    }
    /**
     * Remove the forceMacroDetailedBalance.
     */ removeForceMacroDetailedBalance() {
        let i = this.index.get($b6873406fb778c0b$export$6ffea14bdffd427f.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$6ffea14bdffd427f.tagName);
        }
    }
    /**
     * @returns The calcMethod or undefined.
     */ getCalcMethod() {
        let i = this.index.get($b6873406fb778c0b$export$f0bfd84d03c3a22d.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param calcMethod The calcMethod.
     */ setCalcMethod(calcMethod) {
        let i = this.index.get($b6873406fb778c0b$export$f0bfd84d03c3a22d.tagName);
        if (i != undefined) this.nodes.set(i, calcMethod);
        else {
            this.index.set($b6873406fb778c0b$export$f0bfd84d03c3a22d.tagName, this.nodes.size);
            this.addNode(calcMethod);
        }
    }
    /**
     * Remove the calcMethod.
     */ removeCalcMethod() {
        let i = this.index.get($b6873406fb778c0b$export$f0bfd84d03c3a22d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$f0bfd84d03c3a22d.tagName);
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
     * @returns The shortestTimeOfInterest.
     */ getShortestTimeOfInterest() {
        let i = this.index.get($b6873406fb778c0b$export$421603058c6718db.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param shortestTimeOfInterest The shortestTimeOfInterest.
     */ setShortestTimeOfInterest(shortestTimeOfInterest) {
        let i = this.index.get($b6873406fb778c0b$export$421603058c6718db.tagName);
        if (i != undefined) this.nodes.set(i, shortestTimeOfInterest);
        else {
            this.index.set($b6873406fb778c0b$export$421603058c6718db.tagName, this.nodes.size);
            this.addNode(shortestTimeOfInterest);
        }
    }
    /**
     * Remove the shortestTimeOfInterest.
     */ removeShortestTimeOfInterest() {
        let i = this.index.get($b6873406fb778c0b$export$421603058c6718db.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$421603058c6718db.tagName);
        }
    }
    /**
     * @returns The MaximumEvolutionTime.
     */ getMaximumEvolutionTime() {
        let i = this.index.get($b6873406fb778c0b$export$b51d7314540831ed.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param MaximumEvolutionTime The MaximumEvolutionTime.
     */ setMaximumEvolutionTime(MaximumEvolutionTime) {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) this.nodes.set(i, MaximumEvolutionTime);
        else {
            this.index.set(MaximumEvolutionTime.tagName, this.nodes.size);
            this.addNode(MaximumEvolutionTime);
        }
    }
    /**
     * Remove the MaximumEvolutionTime.
     */ removeMaximumEvolutionTime() {
        let i = this.index.get($b6873406fb778c0b$export$b51d7314540831ed.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$b51d7314540831ed.tagName);
        }
    }
    /**
     * @returns The automaticallySetMaxEne.
     */ getAutomaticallySetMaxEne() {
        let i = this.index.get($b6873406fb778c0b$export$576b56ca6e34780b.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param automaticallySetMaxEne The automaticallySetMaxEne.
     */ setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get($b6873406fb778c0b$export$576b56ca6e34780b.tagName);
        if (i != undefined) this.nodes.set(i, automaticallySetMaxEne);
        else {
            this.index.set($b6873406fb778c0b$export$576b56ca6e34780b.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }
    /**
     * Remove the automaticallySetMaxEne.
     */ removeAutomaticallySetMaxEne() {
        let i = this.index.get($b6873406fb778c0b$export$576b56ca6e34780b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$576b56ca6e34780b.tagName);
        }
    }
    /**
     * @returns The diagramEnergyOffset.
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
    /**
     * @returns The testMicroRates or undefined.
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
 * MXG.
 */ let $7e68913db756e51f$var$mxg_url = "https://github.com/agdturner/mxg-pwa";
let $7e68913db756e51f$var$mxg_a = document.createElement("a");
$7e68913db756e51f$var$mxg_a.href = $7e68913db756e51f$var$mxg_url;
$7e68913db756e51f$var$mxg_a.textContent = $7e68913db756e51f$var$mxg_url;
/**
 * MESMER.
 */ let $7e68913db756e51f$var$mesmer_url = "https://sourceforge.net/projects/mesmer/";
let $7e68913db756e51f$var$memser_a = document.createElement("a");
$7e68913db756e51f$var$memser_a.href = $7e68913db756e51f$var$mesmer_url;
$7e68913db756e51f$var$memser_a.textContent = $7e68913db756e51f$var$mesmer_url;
/**
 * The font sizes for different levels of the GUI.
 */ let $7e68913db756e51f$var$fontSize1 = "1.5em";
let $7e68913db756e51f$var$fontSize2 = "1.25em";
let $7e68913db756e51f$var$fontSize3 = "1.0em";
let $7e68913db756e51f$var$fontSize4 = "0.75em";
/**
 * Margins for spacing GUI components.
 */ //let margin0: string = "0px";
let $7e68913db756e51f$var$margin1 = "1px";
let $7e68913db756e51f$var$margin2 = "2px";
let $7e68913db756e51f$var$margin3 = "3px";
let $7e68913db756e51f$var$margin5 = "5px";
let $7e68913db756e51f$var$margin25 = "25px";
let $7e68913db756e51f$var$margin50 = "50px";
let $7e68913db756e51f$var$margin75 = "75px";
let $7e68913db756e51f$var$margin100 = "100px";
let $7e68913db756e51f$var$margin125 = "125px";
let $7e68913db756e51f$var$level0 = {
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$level1 = {
    marginLeft: $7e68913db756e51f$var$margin25,
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$level2 = {
    marginLeft: $7e68913db756e51f$var$margin50,
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$level3 = {
    marginLeft: $7e68913db756e51f$var$margin75,
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$level4 = {
    marginLeft: $7e68913db756e51f$var$margin100,
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$level5 = {
    marginLeft: $7e68913db756e51f$var$margin125,
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$boundary1 = {
    marginLeft: $7e68913db756e51f$var$margin1,
    marginTop: $7e68913db756e51f$var$margin1,
    marginBottom: $7e68913db756e51f$var$margin1,
    marginRight: $7e68913db756e51f$var$margin1
};
let $7e68913db756e51f$var$boundary3 = {
    marginLeft: $7e68913db756e51f$var$margin3,
    marginTop: $7e68913db756e51f$var$margin3,
    marginBottom: $7e68913db756e51f$var$margin3,
    marginRight: $7e68913db756e51f$var$margin3
};
/**
 * Symbology for the GUI.
 */ let $7e68913db756e51f$var$addString = "add";
let $7e68913db756e51f$var$addSymbol = "\uFF0B";
let $7e68913db756e51f$var$removeString = "remove";
let $7e68913db756e51f$var$removeSymbol = "\u2715";
let $7e68913db756e51f$var$s_Add_from_spreadsheet = "Add from spreadsheet";
// Selected and deselected symbology.
let $7e68913db756e51f$var$selected = " \u2713";
let $7e68913db756e51f$var$deselected = " \u2717";
let $7e68913db756e51f$var$selectedLoadedText1 = ", change using input:";
let $7e68913db756e51f$var$selectedLoadedText2 = ", change using inputs:";
let $7e68913db756e51f$var$deselectedText1 = ", then specify using input.";
let $7e68913db756e51f$var$deselectedText2 = ", then specify using inputs.";
//let specifyText1: string = ". Click then specify using the input.";
//let specifyText2: string = ". Click then specify using the inputs.";
let $7e68913db756e51f$var$selectAnotherOption = "Action/select another option...";
let $7e68913db756e51f$var$dark;
/*
const db = await openDB('my-db', 1, {
    upgrade(db) {
        db.createObjectStore('keyval');
    },
});

let darkModePreference = await db.get('keyval', 'darkMode');
dark = (darkModePreference === 'true');
console.log("dark=" + dark);
*/ /**
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
 * The reactions diagram ids.
 */ let $7e68913db756e51f$var$rdDivId = "reactionsDiagram";
let $7e68913db756e51f$var$rdCanvasId = "reactionsDiagramCanvas";
//let rd_canvas_width: number = 800;
let $7e68913db756e51f$var$rdCanvasHeight = 400;
let $7e68913db756e51f$var$rd_lw = 4;
let $7e68913db756e51f$var$rd_lwc = 2;
let $7e68913db756e51f$var$rd_font = "1em SensSerif";
let $7e68913db756e51f$var$popWindow;
/**
 * Once the DOM is loaded, add a load button.
 */ document.addEventListener("DOMContentLoaded", ()=>{
    // Update the page styles based on the user's preference.
    document.body.className = $7e68913db756e51f$var$dark ? "dark-mode" : "light-mode";
    /* It is not allowed to use localStorage with a Service Worker!
    let darkModePreference = localStorage.getItem('darkMode');
    dark = (darkModePreference === 'true');
    console.log("dark=" + dark);
    */ // Update the page styles based on the user's preference.
    document.body.className = $7e68913db756e51f$var$dark ? "dark-mode" : "light-mode";
    // Create a menu for the GUI.
    let menuDiv = document.getElementById("menu");
    menuDiv.style.display = "flex";
    menuDiv.style.justifyContent = "center";
    menuDiv.style.margin = "5px";
    menuDiv.style.padding = "5px";
    menuDiv.style.border = "1px solid black";
    menuDiv.style.backgroundColor = "lightgrey";
    // Create Load button.
    let loadButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Load", $7e68913db756e51f$var$boundary1);
    loadButton.addEventListener("click", (event)=>{
        $7e68913db756e51f$var$load();
        loadButton.textContent = "Load";
    });
    loadButton.style.fontSize = "1em"; // Set the font size with a relative unit.
    menuDiv.appendChild(loadButton);
    /*
    // Create GitHub repository URL button.
    let gitHubRepositoryButtonId = 'gitHubRepositoryButtonId';
    remove(gitHubRepositoryButtonId);
    let gitHubRepositoryButton = createButton(gitHubRepositoryURL, boundary1);
    gitHubRepositoryButton.id = gitHubRepositoryButtonId;
    gitHubRepositoryButton.addEventListener('click', () => {
        window.open(gitHubRepositoryURL, '_blank');
    });
    menuDiv.appendChild(gitHubRepositoryButton);
    */ // Create style/theme option buttons.
    // Create button to increase the font size.
    let increaseFontSizeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Increase Font Size", $7e68913db756e51f$var$boundary1);
    increaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize + 1 + "px";
        if ($7e68913db756e51f$var$popWindow != null) //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
        $7e68913db756e51f$var$popWindow.document.body.style.fontSize = fontSize + 1 + "px";
        $7e68913db756e51f$var$redrawReactionsDiagram();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let decreaseFontSizeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Decrease Font Size", $7e68913db756e51f$var$boundary1);
    decreaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize - 1 + "px";
        if ($7e68913db756e51f$var$popWindow != null) //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
        $7e68913db756e51f$var$popWindow.document.body.style.fontSize = fontSize - 1 + "px";
        $7e68913db756e51f$var$redrawReactionsDiagram();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Create a light/dark mode button.
    let lightDarkModeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Light/Dark Mode", $7e68913db756e51f$var$boundary1);
    lightDarkModeButton.addEventListener("click", ()=>{
        $7e68913db756e51f$var$dark = !$7e68913db756e51f$var$dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if ($7e68913db756e51f$var$dark) document.body.className = "dark-mode";
        else document.body.className = "light-mode";
        $7e68913db756e51f$var$redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    // Create Save button.
    let saveButtonId = "saveButtonId";
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(saveButtonId);
    let saveButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Save", $7e68913db756e51f$var$boundary1);
    saveButton.id = saveButtonId;
    saveButton.addEventListener("click", $7e68913db756e51f$var$saveXML);
    saveButton.style.fontSize = "1em"; // Set the font size with a relative unit.
    menuDiv.appendChild(saveButton);
    let welcomeDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    // Create text for welcome.
    let p1 = document.createElement("p");
    welcomeDiv.appendChild(p1);
    p1.textContent = "Welcome to MXG - a Graphical User Interface (GUI) program to assist MEMSER users in creating, editing     and visualising MESMER data. MESMER is the Master Equation Solver for Multi Energy-well Reactions, details can be found     at: ";
    p1.appendChild($7e68913db756e51f$var$memser_a);
    p1.style.alignContent = "center";
    let p2 = document.createElement("p");
    welcomeDiv.appendChild(p2);
    p2.textContent = "MXG development is being funded by the UK Engineering and Physical Sciences Research Council (EPSRC).";
    let p3 = document.createElement("p");
    welcomeDiv.appendChild(p3);
    p3.textContent = "There is a menu above containing buttons. Use the Load button to select a MESMER file to load (the file         will not be modified). MXG reads the file and presents the data it contains so that the user can make changes and use         the Save button to generate a new MESMER file. The saved file should have the same content as was loaded except it         will contain no comments, values will be trimmed of white space, and number formats will be in a standard         scientific notation if they were not already. The saved file will also reflect any changes specified using the GUI.";
    let p4 = document.createElement("p");
    welcomeDiv.appendChild(p4);
    p4.textContent = "MXG is designed to be user-friendly and accessible. Between the Load and Save buttons are buttons to         increase or decrease the font size. It is planned to have themes selectable to provide a dark mode rendering and to         support users without normal colour vision.The development is in an alpha release phase, is undergoing testing, and         is not recommended for general use. A community release with ongoing support from MESMER developers is scheduled for         the end of April 2024. MXG is free and open source software based and free and open source software. The main         development GitHub repository is: ";
    p4.appendChild($7e68913db756e51f$var$mxg_a);
    let p5 = document.createElement("p");
    p5.textContent += "Please feel free to explore the code and have a play with MXG.";
    welcomeDiv.appendChild(p5);
    let p6 = document.createElement("p");
    welcomeDiv.appendChild(p6);
    p6.textContent = "MXG can be installed locally as a Progressive Web App (PWA). A PWA is a type of application software     that works on any platform with a standards-compliant Web browser. PWA installation varies by Web browser/device.     Some details to help with installation of the MXG PWA are in the GitHub Repository README. Please refer to that     README for further details. Below the menu is a section for instructions on how to use MXG.";
    let p7 = document.createElement("p");
    welcomeDiv.appendChild(p7);
    p7.textContent = 'The MESMER file loaded is expected to contain the following child elements of the parent "me:mesmer"     element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a     child element is missing or there are multiple of the same, an Error is currently thrown. MXG should support files     loaded with multiple "me:contol" sections soon...';
    document.body.appendChild(welcomeDiv);
    // Create div for instructions.
    let instructionsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    document.body.appendChild(instructionsDiv);
    let p8 = document.createElement("p");
    instructionsDiv.appendChild(p8);
    p8.textContent = 'Upon loading a MESMER file, an input containing the "me:title" value should appear along side a label.         The value can be changed using the input. The "me:title" value is used to compose the filename for data saved using         the Save button. Characters that are unsuitable for filenames will be replaced with the underscore character "_" in         the filename.';
    let p9 = document.createElement("p");
    instructionsDiv.appendChild(p9);
    p9.textContent = 'The "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" details         are presented below the "me:title" in a series of buttons. A canvas depicts a well diagram for the reactions. The         diagram redraws if an "me:ZPE" property value of a molecule a listed reaction are changed. Below all this is a text         representation of the file loaded.';
    let p10 = document.createElement("p");
    instructionsDiv.appendChild(p10);
    p10.textContent = 'The "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" buttons contain         a triangular symbol which indicate a collapsed (triangle orientated with a point down: \u25BC) or expanded (triangle with a point         up: \u25B2) state. Actioning these buttons will either expand or collapse content that should appear or be present below the button.';
});
/**
 *  Redraw the reactions diagram.
 */ function $7e68913db756e51f$var$redrawReactionsDiagram() {
    if ($7e68913db756e51f$var$popWindow == null) {
        let rdCanvas = document.getElementById($7e68913db756e51f$var$rdCanvasId);
        $7e68913db756e51f$var$drawReactionDiagram(rdCanvas, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
    } else {
        let c = $7e68913db756e51f$var$popWindow.document.getElementById($7e68913db756e51f$var$rdCanvasId);
        $7e68913db756e51f$var$drawReactionDiagram(c, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
    }
}
/**
 * Prompts the user for a MESMER XML file, initiates the parsing of the chosen file, and 
 * creates a save button for saving a new XML file.
 */ function $7e68913db756e51f$var$load() {
    let inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.onchange = function() {
        if (inputElement.files) {
            for(let i = 0; i < inputElement.files.length; i++)console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            let file = inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            let inputFilename = file.name;
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
                        $7e68913db756e51f$var$displayXML(inputFilename, contents);
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
    };
    inputElement.click();
}
/**
 * Parse an XMLDocument and create the mesmer object.
 * @param xml The XML.
 */ function $7e68913db756e51f$var$parse(xml) {
    console.log("parse: " + xml);
    // Process the XML.
    let xml_mesmer = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8677001474399221$export$692079bb871c6039).tagName);
    $7e68913db756e51f$var$mesmer = new (0, $8677001474399221$export$692079bb871c6039)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName((0, $8677001474399221$export$f99233281efd08a0).tagName);
    if (xml_title.length != 1) throw new Error("Multiple " + (0, $8677001474399221$export$f99233281efd08a0).tagName + " tags found");
    else {
        let title = xml_title[0].childNodes[0].nodeValue.trim();
        let titleNode = new (0, $8677001474399221$export$f99233281efd08a0)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_title[0]), title);
        $7e68913db756e51f$var$mesmer.setTitle(titleNode);
        let titleId = "title";
        let titleDiv = document.getElementById(titleId);
        let lwiId = "titleDiv";
        // If the lwi div already exists, remove it.
        (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(lwiId);
        // Create input element.
        let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", lwiId + "Input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
            let target = event.target;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, title, (0, $8677001474399221$export$f99233281efd08a0).tagName, $7e68913db756e51f$var$fontSize1);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }
    // Molecules.
    let moleculesDivId = "molecules";
    let moleculesDiv = document.getElementById(moleculesDivId);
    let moleculesListDivId = "moleculesList";
    // If the moleculeListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(moleculesListDivId);
    let moleculeListDiv = $7e68913db756e51f$var$processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    moleculesDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: moleculeListDiv,
        buttonLabel: "Molecules",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: moleculeListDiv.id
    }));
    $7e68913db756e51f$var$mesmer.setMoleculeList(new (0, $8677001474399221$export$19d70f3647dee606)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(moleculeListDiv), Array.from($7e68913db756e51f$var$molecules.values())));
    // Reactions.
    let reactionsDivId = "reactions";
    let reactionsDiv = document.getElementById(reactionsDivId);
    let reactionsListDivId = "reactionsList";
    // If the reactionsListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(reactionsListDivId);
    let reactionsListDiv = $7e68913db756e51f$var$processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    reactionsDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: reactionsListDiv,
        buttonLabel: "Reactions",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: reactionsListDiv.id
    }));
    $7e68913db756e51f$var$mesmer.setReactionList(new (0, $8677001474399221$export$44466a39ca846289)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(reactionsDiv), Array.from($7e68913db756e51f$var$reactions.values())));
    // Add the reactions diagram canvas.
    // Destroy any existing reactions diagram.
    // Check for popWindow.
    if ($7e68913db756e51f$var$popWindow != null) {
        $7e68913db756e51f$var$popWindow.close();
        $7e68913db756e51f$var$popWindow = null;
    }
    // If rdDiv already exists, remove it.
    let rdDiv = document.getElementById($7e68913db756e51f$var$rdDivId);
    if (rdDiv != null) rdDiv.parentNode?.removeChild(rdDiv);
    // Create a new rdDiv and append it.
    rdDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    rdDiv.id = $7e68913db756e51f$var$rdDivId;
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = "popButtonDivId";
    // If the popButtonDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(popButtonDivId);
    let popButtonDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    popButtonDiv.id = popButtonDivId;
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = "popButtonId";
    // If the popButton already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(popButtonID);
    let popButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Pop out diagram into a new window", $7e68913db756e51f$var$boundary1);
    popButton.id = popButtonID;
    popButtonDiv.appendChild(popButton);
    let rdCanvas = document.getElementById($7e68913db756e51f$var$rdCanvasId);
    // If the canvas already exists, remove it.
    if (rdCanvas != null) rdCanvas.remove();
    rdCanvas = document.createElement("canvas");
    rdCanvas.id = $7e68913db756e51f$var$rdCanvasId;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = $7e68913db756e51f$var$rdCanvasHeight;
    rdCanvas.style.border = "1px solid black";
    $7e68913db756e51f$var$drawReactionDiagram(rdCanvas, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener("click", ()=>{
        if ($7e68913db756e51f$var$popWindow == null) {
            /**
             * Cloning is necessary for Chrome.
             */ (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)($7e68913db756e51f$var$rdCanvasId);
            let c = rdCanvas.cloneNode(true);
            c.id = $7e68913db756e51f$var$rdCanvasId + "clone";
            $7e68913db756e51f$var$popWindow = window.open("", "Reactions Diagram", "width=" + c.width + ", height=" + c.height);
            $7e68913db756e51f$var$popWindow.document.body.appendChild(c);
            $7e68913db756e51f$var$drawReactionDiagram(c, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
            popButton.textContent = "Pop back reaction diagram";
        } else {
            /**
             * Cloning is necessary for Chrome.
             */ let c = $7e68913db756e51f$var$popWindow.document.getElementById($7e68913db756e51f$var$rdCanvasId);
            let rd_canvas = c.cloneNode(true);
            rd_canvas.id = $7e68913db756e51f$var$rdCanvasId;
            if (rdDiv != null) rdDiv.appendChild(rd_canvas);
            $7e68913db756e51f$var$drawReactionDiagram(rd_canvas, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
            $7e68913db756e51f$var$popWindow.close();
            $7e68913db756e51f$var$popWindow = null;
            popButton.textContent = "Pop out reaction diagram to a new window";
        }
    });
    // Conditions
    let conditionsDivId = "conditions";
    let conditionsDiv = document.getElementById(conditionsDivId);
    let conditionsListDivId = "conditionsList";
    // If the conditionsListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(conditionsListDivId);
    let conditionsListDiv = $7e68913db756e51f$var$processConditions(xml);
    conditionsListDiv.id = conditionsListDivId;
    conditionsDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: conditionsListDiv,
        buttonLabel: "Conditions",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: conditionsListDiv.id
    }));
    // Model Parameters.
    let modelParametersDivId = "modelParameters";
    let modelParametersDiv = document.getElementById(modelParametersDivId);
    let modelParametersListDiv = $7e68913db756e51f$var$processModelParameters(xml);
    modelParametersListDiv.id = "modelParametersList";
    // If the modelParametersListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(modelParametersListDiv.id);
    modelParametersDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: modelParametersListDiv,
        buttonLabel: "Model Parameters",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: modelParametersListDiv.id
    }));
    // Control.
    let controlDivId = "control";
    let controlDiv = document.getElementById(controlDivId);
    let controlListDiv = $7e68913db756e51f$var$processControl(xml);
    controlListDiv.id = "controlList";
    // If the controlListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(controlListDiv.id);
    controlDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: controlListDiv,
        buttonLabel: "Control",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: controlListDiv.id
    }));
    // Initiate action listeners for collapsible content.
    (0, $f0396edd0a5c99f7$export$2883f21c1f82e07d)();
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ function $7e68913db756e51f$var$processMoleculeList(xml) {
    // Create div to contain the molecules list.
    let moleculeListDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
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
            let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "_";
            let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                content: plDiv,
                buttonLabel: (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName,
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl = new (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            for(let j = 0; j < xml_Ps.length; j++){
                let p = new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) $7e68913db756e51f$var$processProperty(p, (0, $ef5b9341e5193b70$export$95174cf0748f45cd).units, molecule, xml_Ps[j], plDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
                else if (p.dictRef == (0, $ef5b9341e5193b70$export$984abe26ded13ee0).dictRef) $7e68913db756e51f$var$processProperty(p, (0, $ef5b9341e5193b70$export$984abe26ded13ee0).units, molecule, xml_Ps[j], plDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
                else $7e68913db756e51f$var$processProperty(p, undefined, molecule, xml_Ps[j], plDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
            }
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            if (xml_Ps.length != 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "?");
            // Create a new Property.
            let p = new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Ps[0]));
            molecule.setProperties(p);
            if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) $7e68913db756e51f$var$processProperty(p, (0, $ef5b9341e5193b70$export$95174cf0748f45cd).units, molecule, xml_Ps[0], moleculeDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2);
            else if (p.dictRef == (0, $ef5b9341e5193b70$export$984abe26ded13ee0).dictRef) $7e68913db756e51f$var$processProperty(p, (0, $ef5b9341e5193b70$export$984abe26ded13ee0).units, molecule, xml_Ps[0], moleculeDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2);
            else $7e68913db756e51f$var$processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2);
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
            $7e68913db756e51f$var$processDOSCMethod(dOSCMethod, molecule, moleculeDiv);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            //console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");
            let extraDOSCMethod = new (0, $ef5b9341e5193b70$export$ae98b7db6376163d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName + "_";
            let extraDOSCMethodCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                content: extraDOSCMethodDiv,
                buttonLabel: (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName,
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(extraDOSCMethodCollapsibleDiv);
            // Read bondRef.
            let xml_bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                let container = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level3);
                let label = document.createElement("label");
                label.textContent = (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName + ": ";
                container.appendChild(label);
                let bondRef = new (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bondRefs[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
                // Create a HTMLSelectElement to select the bondRef.
                let bondIds = molecule.getBonds().getBondIds();
                let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(bondIds, bondRef.value, molecule.id + "_" + (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName, $7e68913db756e51f$var$boundary1);
                selectElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    bondRef.value = target.value;
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                });
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
                container.appendChild(selectElement);
                extraDOSCMethodDiv.appendChild(container);
            }
            // Read hinderedRotorPotential.
            let xml_hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName);
            if (xml_hinderedRotorPotentials.length > 0) {
                if (xml_hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hinderedRotorPotentials.length);
                let hinderedRotorPotentialAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_hinderedRotorPotentials[0]);
                let hinderedRotorPotential = new (0, $ef5b9341e5193b70$export$9b8e857b9a081d2)(hinderedRotorPotentialAttributes);
                // Create a new collapsible div for the HinderedRotorPotential.
                let hinderedRotorPotentialDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$boundary1);
                let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName;
                let hinderedRotorPotentialCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName,
                    buttonFontSize: $7e68913db756e51f$var$fontSize3,
                    boundary: $7e68913db756e51f$var$boundary1,
                    level: $7e68913db756e51f$var$level3,
                    contentDivId: contentDivId
                });
                extraDOSCMethodDiv.appendChild(hinderedRotorPotentialCollapsibleDiv);
                // Formats
                let formatLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("Format:", $7e68913db756e51f$var$level4);
                hinderedRotorPotentialDiv.appendChild(formatLabel);
                let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).formats, hinderedRotorPotential.format, molecule.id + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName, $7e68913db756e51f$var$boundary1);
                selectElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    hinderedRotorPotential.format = target.value;
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                });
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
                hinderedRotorPotentialDiv.appendChild(selectElement);
                // Add any units.
                let unitsLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("Units:", $7e68913db756e51f$var$boundary1);
                hinderedRotorPotentialDiv.appendChild(unitsLabel);
                $7e68913db756e51f$var$addAnyUnits((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).units, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, molecule.id + "_" + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName, (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName, $7e68913db756e51f$var$boundary1);
                // Add expansionSize.
                let expansionSizeLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("Expansion size:", $7e68913db756e51f$var$boundary1);
                hinderedRotorPotentialDiv.appendChild(expansionSizeLabel);
                let expansionSizeInputElementId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName + "_expansionSize";
                let expansionSizeInputElement = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", expansionSizeInputElementId, $7e68913db756e51f$var$boundary1);
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                expansionSizeInputElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                    else {
                        // Reset the input to the current value.
                        alert("Expansion size input is not a number, resetting...");
                        expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                    }
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(expansionSizeInputElement);
                });
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toExponential();
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(expansionSizeInputElement);
                hinderedRotorPotentialDiv.appendChild(expansionSizeInputElement);
                // Add useSineTerms.
                let useSineTermsLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("Use sine terms:", $7e68913db756e51f$var$boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName + "_useSineTerms";
                let useSineTermsInput = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("checkbox", useSineTermsInputId, $7e68913db756e51f$var$boundary1);
                useSineTermsInput.checked = hinderedRotorPotential.getUseSineTerms();
                useSineTermsInput.addEventListener("change", (event)=>{
                    let target = event.target;
                    hinderedRotorPotential.setUseSineTerms(target.checked);
                });
                hinderedRotorPotentialDiv.appendChild(useSineTermsInput);
                // Load PotentialPoints.
                // Create a new collapsible div for the potential points.
                let potentialPointsDiv = document.createElement("div");
                let potentialPointContentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName + "_" + (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName;
                let potentialPointCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                    content: potentialPointsDiv,
                    buttonLabel: (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName,
                    buttonFontSize: $7e68913db756e51f$var$fontSize3,
                    boundary: $7e68913db756e51f$var$boundary1,
                    level: $7e68913db756e51f$var$level4,
                    contentDivId: potentialPointContentDivId
                });
                hinderedRotorPotentialDiv.appendChild(potentialPointCollapsibleDiv);
                let potentialPoints = [];
                let xml_potentialPoints = xml_hinderedRotorPotentials[0].getElementsByTagName((0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName);
                for(let k = 0; k < xml_potentialPoints.length; k++){
                    let potentialPoint = new (0, $ef5b9341e5193b70$export$86ca5149fcde8feb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_potentialPoints[k]));
                    potentialPoints.push(potentialPoint);
                    let potentialPointDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("Angle:", $7e68913db756e51f$var$boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName + "_angle";
                    let angleInputElement = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", angleInputElementId, $7e68913db756e51f$var$boundary1);
                    angleInputElement.addEventListener("change", (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            let value = parseFloat(target.value);
                            potentialPoint.setAngle(value);
                        } else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            angleInputElement.value = potentialPoint.getAngle().toExponential();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(angleInputElement);
                    });
                    angleInputElement.value = potentialPoint.getAngle().toExponential();
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("Potential:", $7e68913db756e51f$var$boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName + "_potential";
                    let potentialInputElement = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", potentialInputElementId, $7e68913db756e51f$var$boundary1);
                    potentialInputElement.addEventListener("change", (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            let value = parseFloat(target.value);
                            potentialPoint.setPotential(value);
                            console.log("Set " + (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName + " to " + value.toExponential());
                        } else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = potentialPoint.getPotential().toExponential();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(potentialInputElement);
                    });
                    potentialInputElement.value = potentialPoint.getPotential().toExponential();
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(potentialInputElement);
                    potentialPointDiv.appendChild(potentialInputElement);
                    potentialPointsDiv.appendChild(potentialPointDiv);
                }
                potentialPointCollapsibleDiv.appendChild(potentialPointsDiv);
                hinderedRotorPotential.setPotentialPoints(potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }
            // Read periodicities.
            let xml_periodicities = xml_DOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9513c16afdf7d852).tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_periodicities[0]));
                let periodicity = new (0, $ef5b9341e5193b70$export$9513c16afdf7d852)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_periodicities[0]), parseFloat(valueString));
                extraDOSCMethod.setPeriodicity(periodicity);
                let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", molecule.id + "_" + (0, $ef5b9341e5193b70$export$9513c16afdf7d852).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
                    let target = event.target;
                    valueString = target.value;
                    if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(valueString)) {
                        let value = parseFloat(valueString);
                        periodicity.value = value;
                        extraDOSCMethod.getPeriodicity().value = value;
                        console.log("Set " + (0, $ef5b9341e5193b70$export$9513c16afdf7d852).tagName + " to " + value);
                    } else {
                        // Reset the input to the current value.
                        alert("Periodicity input is not a number, resetting...");
                        target.value = periodicity.value.toExponential();
                    }
                }, valueString, (0, $ef5b9341e5193b70$export$9513c16afdf7d852).tagName);
                extraDOSCMethodDiv.appendChild(inputDiv);
            }
            molecule.setExtraDOSCMethod(extraDOSCMethod);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
        let xml_ReservoirSize = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ReservoirSize[0]));
            let value = parseFloat(valueString);
            let reservoirSizeAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ReservoirSize[0]);
            let reservoirSize = new (0, $ef5b9341e5193b70$export$97850fe2f2906f00)(reservoirSizeAttributes, value);
            molecule.setReservoirSize(reservoirSize);
            let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", molecule.id + "_" + (0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2, (event)=>{
                let target = event.target;
                reservoirSize.value = parseFloat(target.value);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
            }, valueString, (0, $ef5b9341e5193b70$export$97850fe2f2906f00).tagName);
            moleculeDiv.appendChild(inputDiv);
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        // Create a molstar molecule visualisation
        let molstarDiv = document.createElement("div");
        molstarDiv.id = molecule.id + "_molstar";
        moleculeDiv.appendChild(molstarDiv);
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: $7e68913db756e51f$var$fontSize2,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level1,
            contentDivId: molecule.tagName + "_" + molecule.id
        });
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function $7e68913db756e51f$var$displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById("xml");
    // xmlHeading
    let xmlHeadingId = "xmlHeading";
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(xmlHeadingId);
    let xmlHeading = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId = "xmlParagraph";
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(xmlParagraphId);
    let xmlPre = document.createElement("pre");
    xmlPre.textContent = xml;
    xmlDiv.appendChild(xmlPre);
}
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */ function $7e68913db756e51f$var$processProperty(p, units, molecule, element, moleculeDiv, boundary, level) {
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
        let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", molecule.id + "_" + p.dictRef, $7e68913db756e51f$var$boundary1, level, (event)=>{
            let target = event.target;
            $7e68913db756e51f$export$b1e4cbf5b56e0e21(ps, target);
        }, inputString, label);
        let inputElement = inputDiv.querySelector("input");
        //inputElement.value = inputString;
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
        inputElement.addEventListener("change", (event)=>{
            let target = event.target;
            inputString = target.value;
            ps = p.getProperty();
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) {
                // Update the min and max molecule energy.
                if (value < $7e68913db756e51f$var$minMoleculeEnergy) $7e68913db756e51f$var$minMoleculeEnergy = value;
                if (value > $7e68913db756e51f$var$maxMoleculeEnergy) $7e68913db756e51f$var$maxMoleculeEnergy = value;
                // Update the molecule energy diagram.
                $7e68913db756e51f$var$redrawReactionsDiagram();
            }
        });
        $7e68913db756e51f$var$addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
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
            let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", molecule.id + "_" + p.dictRef, boundary, level, (event)=>{
                let target = event.target;
                $7e68913db756e51f$export$819b5ff7dff3652c(pa, target);
            }, inputString, label);
            let inputElement = inputDiv.querySelector("input");
            inputElement.value = inputString;
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            inputElement.addEventListener("change", (event)=>{
                let target = event.target;
                inputString = target.value;
                pa = p.getProperty();
                values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
            });
            $7e68913db756e51f$var$addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
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
 */ function $7e68913db756e51f$var$addAnyUnits(units, attributes, inputDiv, id, tagOrDictRef, boundary) {
    if (units != undefined) {
        let unitsSelectElement = $7e68913db756e51f$var$getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            Object.assign(unitsSelectElement.style, boundary);
            inputDiv.appendChild(unitsSelectElement);
        }
    } else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(attributesUnits, boundary);
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
        let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(units, "Units", id, $7e68913db756e51f$var$boundary1);
        // Set the initial value to the units.
        selectElement.value = psUnits;
        // Add event listener to selectElement.
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
        selectElement.addEventListener("change", (event)=>{
            let target = event.target;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
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
 */ function $7e68913db756e51f$var$processDOSCMethod(dOSCMethod, molecule, moleculeDiv) {
    let label = document.createElement("label");
    label.textContent = (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + ": ";
    let container = document.createElement("div");
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options = [
        "ClassicalRotors",
        "me:QMRotors",
        "QMRotors"
    ];
    let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, "DOSCMethod", molecule.id + "_" + "Select_DOSCMethod", $7e68913db756e51f$var$boundary1);
    // Set the initial value to the DOSCMethod.
    selectElement.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    selectElement.addEventListener("change", (event)=>{
        let target = event.target;
        dOSCMethod.setXsiType(target.value);
        console.log("Set DOSCMethod to " + target.value);
    });
    molecule.setDOSCMethod(dOSCMethod);
    container.appendChild(selectElement);
    Object.assign(container.style, $7e68913db756e51f$var$level2);
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
        let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName;
        let collapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            content: etmDiv,
            buttonLabel: (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName,
            buttonFontSize: $7e68913db756e51f$var$fontSize3,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level2,
            contentDivId: contentDivId
        });
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
            let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
                let target = event.target;
                $7e68913db756e51f$export$b1e4cbf5b56e0e21(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel = document.createElement("label");
            unitsLabel.textContent = "cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
function $7e68913db756e51f$export$819b5ff7dff3652c(node, input) {
    let inputString = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
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
        input.value = (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) console.log("Changed " + node.tagName + ' from: "' + inputString + '" to: "' + (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ") + '"');
    else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        input.value = (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ");
    }
}
window.setNumberArrayNode = $7e68913db756e51f$export$819b5ff7dff3652c;
function $7e68913db756e51f$export$b1e4cbf5b56e0e21(node, input) {
    if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log(node.tagName + " value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        input.value = node.value.toExponential();
    }
}
window.set = $7e68913db756e51f$export$b1e4cbf5b56e0e21;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$processReactionList(xml) {
    // Create div to contain the reaction list.
    let reactionListDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
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
        let reactionDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
        // Set attributes.
        let reactionAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactions[i]);
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
        let reaction = new (0, $6f7aa7a716962086$export$d2ae4167a30cf6bb)(reactionAttributes);
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
                let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, "Role", molecule.ref + "_" + "Select_Role", $7e68913db756e51f$var$boundary1);
                // Set the initial value.
                selectElement.value = molecule.role;
                // Add event listener to selectElement.
                selectElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                });
                container.appendChild(selectElement);
                Object.assign(container.style, $7e68913db756e51f$var$level3);
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName;
            let reactantCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                content: reactantsDiv,
                buttonLabel: "Reactants",
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(reactantCollapsibleDiv);
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
                let options = [
                    "modelled",
                    "sink"
                ];
                let container = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(molecule.ref + " role:", options, molecule.ref + "_" + "Select_Role", "Role", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
                let selectElement = container.querySelector("select");
                selectElement.value = molecule.role;
                selectElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                });
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$264ad599d7cef668).tagName;
            let productCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                content: productsDiv,
                buttonLabel: "Products",
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(productCollapsibleDiv);
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
            let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, "Tunneling", reaction.id + "_" + "Select_Tunneling", $7e68913db756e51f$var$boundary1);
            // Set the initial value.
            selectElement.value = tunneling.getName();
            // Add event listener to selectElement.
            selectElement.addEventListener("change", (event)=>{
                let target = event.target;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
            });
            container.appendChild(selectElement);
            Object.assign(container.style, $7e68913db756e51f$var$level2);
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
                let label = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(molecule.ref + " role: transitionState", $7e68913db756e51f$var$level3);
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$145c1ed87b1a2216).tagName;
            let transitionStatesCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                content: transitionStatesDiv,
                buttonLabel: "Transition States",
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(transitionStatesCollapsibleDiv);
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
                                let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
                                    let target = event.target;
                                    $7e68913db756e51f$export$b1e4cbf5b56e0e21(preExponential, target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName, (0, $6f7aa7a716962086$export$38ce90ac8b004d85).tagName, $7e68913db756e51f$var$boundary1);
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
                                let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
                                    let target = event.target;
                                    $7e68913db756e51f$export$b1e4cbf5b56e0e21(activationEnergy, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName, (0, $6f7aa7a716962086$export$1bdc69d2439d749d).tagName, $7e68913db756e51f$var$boundary1);
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
                                let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
                                    let target = event.target;
                                    $7e68913db756e51f$export$b1e4cbf5b56e0e21(tInfinity, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName, (0, $6f7aa7a716962086$export$8d95dd32819bc86c).tagName, $7e68913db756e51f$var$boundary1);
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
                                let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
                                    let target = event.target;
                                    $7e68913db756e51f$export$b1e4cbf5b56e0e21(nInfinity, target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                                });
                                $7e68913db756e51f$var$addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + (0, $6f7aa7a716962086$export$191e95ebb11cc88).xsiType + "_" + (0, $6f7aa7a716962086$export$d08982dd841d496f).tagName, (0, $6f7aa7a716962086$export$d08982dd841d496f).tagName, $7e68913db756e51f$var$boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName;
                        let mCRCMethodCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                            content: mCRCMethodDiv,
                            buttonLabel: (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName,
                            buttonFontSize: $7e68913db756e51f$var$fontSize3,
                            boundary: $7e68913db756e51f$var$boundary1,
                            level: $7e68913db756e51f$var$level2,
                            contentDivId: contentDivId
                        });
                        reactionDiv.appendChild(mCRCMethodCollapsibleDiv);
                    } else throw new Error("Unexpected xsi:type=" + type);
                } else {
                    mCRCMethod = new (0, $6f7aa7a716962086$export$6fa70ee10f356b6)(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement("label");
                    mCRCMethodLabel.textContent = (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName + ": " + mCRCMethodAttributes.get("name");
                    Object.assign(mCRCMethodLabel.style, $7e68913db756e51f$var$level2);
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
            let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_excessReactantConc[0])));
            let excessReactantConc = new (0, $6f7aa7a716962086$export$284227145ed02b04)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
            let id = reaction.id + "_" + (0, $6f7aa7a716962086$export$284227145ed02b04).tagName;
            let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2, (event)=>{
                let target = event.target;
                $7e68913db756e51f$export$b1e4cbf5b56e0e21(excessReactantConc, target);
            }, value.toExponential(), (0, $6f7aa7a716962086$export$284227145ed02b04).tagName);
            reactionDiv.appendChild(inputDiv);
        }
        // Create a new collapsible div for the reaction.
        let reactionCollapsibleDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            content: reactionDiv,
            buttonLabel: reaction.id + "(" + reaction.getLabel() + ")",
            buttonFontSize: $7e68913db756e51f$var$fontSize2,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level1,
            contentDivId: reaction.tagName + "_" + reaction.id
        });
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(reactionCollapsibleDiv);
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
    let conditionsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    // Get the XML "moleculeList" element.
    let xml_conditions = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    let conditions = new (0, $ae74a7b44a6504a1$export$363c7374d425f4ad)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_conditions));
    $7e68913db756e51f$var$mesmer.setConditions(conditions);
    // Bath Gases
    let bathGasesDiv = document.createElement("div");
    conditionsDiv.appendChild(bathGasesDiv);
    // Add collapsible div.
    conditionsDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: bathGasesDiv,
        buttonLabel: (0, $ae74a7b44a6504a1$export$b33a132661f4be58).name,
        buttonFontSize: $7e68913db756e51f$var$fontSize2,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level1,
        contentDivId: (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName
    }));
    // Add add button.
    let addBathGasButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, $7e68913db756e51f$var$level2);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener("click", ()=>{
        let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), "");
        conditions.addBathGas(bathGas);
        let containerDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level2);
        let bathGasLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs = new Set($7e68913db756e51f$var$molecules.keys());
        let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(Array.from(moleculeIDs), (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, (0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName + "_" + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener("change", (event)=>{
            let target = event.target;
            bathGas.value = target.value;
            console.log("Added " + target.value + " as a " + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        selectElement.style.marginLeft = $7e68913db756e51f$var$margin2;
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
        containerDiv.appendChild(selectElement);
        // Add a remove button.
        let removeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$removeString, $7e68913db756e51f$var$boundary1);
        removeButton.addEventListener("click", ()=>{
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
        containerDiv.appendChild(removeButton);
        bathGasesDiv.appendChild(containerDiv);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    let xml_bathGases = Array.from(xml_conditions.children).filter((child)=>child.tagName === (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
    if (xml_bathGases.length > 0) for(let i = 0; i < xml_bathGases.length; i++){
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGases[i]);
        let moleculeID = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGases[i]));
        let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(attributes, moleculeID);
        console.log("bathGas" + bathGas.toString());
        conditions.addBathGas(bathGas);
        let containerDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level2);
        let bathGasLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs = new Set($7e68913db756e51f$var$molecules.keys());
        let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(Array.from(moleculeIDs), (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, (0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName + "_" + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener("change", (event)=>{
            let target = event.target;
            bathGas.value = target.value;
            console.log("Set " + (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + " to " + target.value);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
        containerDiv.appendChild(selectElement);
        // Add a remove button.
        let removeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$removeString, $7e68913db756e51f$var$boundary1);
        removeButton.addEventListener("click", ()=>{
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
        containerDiv.appendChild(removeButton);
        bathGasesDiv.appendChild(containerDiv);
    }
    // PTs
    let pTsDiv = document.createElement("div");
    conditionsDiv.appendChild(pTsDiv);
    let pTs = new (0, $ae74a7b44a6504a1$export$3be0efe793283834)(new Map());
    // Add collapsible div.
    conditionsDiv.appendChild((0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        content: pTsDiv,
        buttonLabel: (0, $ae74a7b44a6504a1$export$3be0efe793283834).name,
        buttonFontSize: $7e68913db756e51f$var$fontSize2,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level1,
        contentDivId: (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName
    }));
    // Create an add button to add a new PTpair.
    let addButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, $7e68913db756e51f$var$level2);
    pTsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener("click", ()=>{
        // Create a new PTpair.
        let pTPairAttributes = new Map();
        pTPairAttributes.set("units", "Torr");
        let pTPair = new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)(pTPairAttributes);
        let pTPairIndex = pTs.addPTpair(pTPair);
        let pTPairDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level2);
        $7e68913db756e51f$var$addP(pTPairDiv, pTPair);
        $7e68913db756e51f$var$addT(pTPairDiv, pTPair);
        $7e68913db756e51f$var$addAnyUnits(undefined, pTPairAttributes, pTPairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, $7e68913db756e51f$var$boundary1);
        // Create an add button for adding details.
        let addDetailsButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString + " details", $7e68913db756e51f$var$boundary1);
        pTPairDiv.appendChild(addDetailsButton);
        // Add event listener to the addDetailsButton.
        addDetailsButton.addEventListener("click", ()=>{
            let detailsDiv = document.createElement("div");
            $7e68913db756e51f$var$addExcessReactantConc(pTPairDiv, pTPair);
            $7e68913db756e51f$var$addPercentExcessReactantConc(pTPairDiv, pTPair);
            $7e68913db756e51f$var$addPrecision(pTPairDiv, pTPair);
            $7e68913db756e51f$var$addBathGas(pTPairDiv, pTPair);
            $7e68913db756e51f$var$addExperimentRateButton(pTPairDiv, pTPair);
            pTPairDiv.insertBefore(detailsDiv, addDetailsButton);
            pTPairDiv.removeChild(addDetailsButton);
        });
        /*
        addExperimentRateButton.addEventListener('click', () => {
            let experimentRateDiv: HTMLDivElement = document.createElement("div");
            let experimentRate: ExperimentRate = new ExperimentRate(new Map(), NaN);
            pTPair.setExperimentRate(experimentRate);
            let experimentRateLabel: HTMLLabelElement = document.createElement('label');
            experimentRateLabel.textContent = ExperimentRate.tagName + ": ";
            experimentRateDiv.appendChild(experimentRateLabel);
            pTPairDiv.insertBefore(experimentRateDiv, addExperimentRateButton);
            pTPairDiv.removeChild(addExperimentRateButton);
        });
        pTPairDiv.appendChild(addExperimentRateDiv);
        */ // Add a remove button.
        let removeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$removeString, $7e68913db756e51f$var$boundary1);
        removeButton.addEventListener("click", ()=>{
            pTsDiv.removeChild(pTPairDiv);
            pTs.removePTpair(pTPairIndex);
            pTPair.removeBathGas();
        });
        pTPairDiv.appendChild(removeButton);
        pTsDiv.appendChild(pTPairDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$s_Add_from_spreadsheet, $7e68913db756e51f$var$boundary1);
    pTsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener("click", ()=>{
        // Add a new text input for the user to paste the PTPairs.
        let inputDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level2);
        let addFromSpreadsheetId = (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName + "_" + "addFromSpreadsheet";
        let inputElement = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", addFromSpreadsheetId, $7e68913db756e51f$var$level2);
        inputDiv.appendChild(inputElement);
        pTsDiv.insertBefore(inputDiv, addButton);
        // Add an event listener to the inputElement.
        inputElement.addEventListener("change", ()=>{
            console.log("inputElement.value=" + inputElement.value);
            console.log("inputElement.value.length=" + inputElement.value.length);
            if (inputElement.value.length > 0) {
                let pTPairsArray = inputElement.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTPairsArray[0].split("	").forEach((value, i)=>{
                    index.set(value, i);
                });
                console.log("pTPairsArray.length=" + pTPairsArray.length);
                for(let i = 1; i < pTPairsArray.length; i++){
                    let pTPairAttributes = new Map();
                    pTPairAttributes.set("units", "Torr");
                    let pTPair = new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)(pTPairAttributes);
                    let pTPairArray = pTPairsArray[i].split("	");
                    let pIndex = index.get("P");
                    let tIndex = index.get("T");
                    let bathGasIndex = index.get("me:bathGas");
                    let p = parseFloat(pTPairArray[pIndex]);
                    let t = parseFloat(pTPairArray[tIndex]);
                    pTPair.setP(p);
                    pTPair.setT(t);
                    if (index.has("me:bathGas")) {
                        let bathGas = pTPairArray[bathGasIndex];
                        pTPair.setBathGas(new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), bathGas));
                    }
                    console.log("pTPair=" + pTPair);
                    let pTPairDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level2);
                    $7e68913db756e51f$var$addP(pTPairDiv, pTPair);
                    $7e68913db756e51f$var$addT(pTPairDiv, pTPair);
                    $7e68913db756e51f$var$addAnyUnits(undefined, pTPairAttributes, pTPairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, $7e68913db756e51f$var$boundary1);
                    $7e68913db756e51f$var$addExcessReactantConc(pTPairDiv, pTPair);
                    $7e68913db756e51f$var$addPercentExcessReactantConc(pTPairDiv, pTPair);
                    $7e68913db756e51f$var$addPrecision(pTPairDiv, pTPair);
                    $7e68913db756e51f$var$addBathGas(pTPairDiv, pTPair);
                    console.log(addButton); // Check the value of addButton
                    console.log(pTsDiv); // Check the value of pTsDiv
                    pTsDiv.insertBefore(pTPairDiv, addButton);
                    pTs.addPTpair(pTPair);
                }
                //pTs.addPTpairs(pTPairs);
                pTsDiv.removeChild(inputDiv);
            }
        });
    });
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
                // Create a container div for P, T and units.
                let pTPairDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level2);
                pTsDiv.appendChild(pTPairDiv);
                // Add any optional BathGas
                let xml_bathGass = xml_PTPairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    // Add a label for the BathGas.
                    let bathGasLabel = document.createElement("label");
                    bathGasLabel.textContent = (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + ": ";
                    pTPairDiv.appendChild(bathGasLabel);
                    let bathGasValue = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGass[0]));
                    let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGass[0]), bathGasValue);
                    pTPair.setBathGas(bathGas);
                    // Create a HTMLSelectInput for the BathGas.
                    // Get the ids of all the molecules.
                    let moleculeIDs = new Set($7e68913db756e51f$var$molecules.keys());
                    let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(Array.from(moleculeIDs), (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
                    // Set the initial value.
                    selectElement.value = bathGas.value;
                    // Add event listener to selectElement.
                    selectElement.addEventListener("change", (event)=>{
                        let target = event.target;
                        bathGas.value = target.value;
                        console.log("Set " + (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + " to " + target.value);
                        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                    });
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
                    pTPairDiv.appendChild(selectElement);
                }
                // Add any optional ExperimentRate
                let xml_experimentRates = xml_PTPairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_experimentRates[0]));
                    let experimentRate = new (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_experimentRates[0]), parseFloat(valueString));
                    pTPair.setExperimentRate(experimentRate);
                    // Create a new div for the ExperimentRate.
                    let id = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName;
                    let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        $7e68913db756e51f$export$b1e4cbf5b56e0e21(experimentRate, target);
                    }, experimentRate.value.toExponential(), (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName);
                    pTPairDiv.appendChild(inputDiv);
                }
                $7e68913db756e51f$var$addP(pTPairDiv, pTPair);
                $7e68913db756e51f$var$addT(pTPairDiv, pTPair);
                $7e68913db756e51f$var$addAnyUnits(undefined, (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTPairs[i]), pTPairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, $7e68913db756e51f$var$boundary1);
                $7e68913db756e51f$var$addExcessReactantConc(pTPairDiv, pTPair);
                $7e68913db756e51f$var$addPercentExcessReactantConc(pTPairDiv, pTPair);
                $7e68913db756e51f$var$addPrecision(pTPairDiv, pTPair);
                $7e68913db756e51f$var$addBathGas(pTPairDiv, pTPair);
                pTs.addPTpair(pTPair);
                // Add the pTPairDiv to the pTsDiv.
                pTsDiv.appendChild(pTPairDiv);
            }
            conditions.setPTs(pTs);
        }
    }
    return conditionsDiv;
}
/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addP(containerDiv, pTPair) {
    let pInputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + "P", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            pTPair.setP(parseFloat(target.value));
            console.log("Set P to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = pTPair.getP().toExponential();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, pTPair.getP().toExponential(), "P");
    let pInputElement = pInputDiv.querySelector("input");
    pInputElement.value = pTPair.getP().toExponential();
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(pInputElement);
    containerDiv.appendChild(pInputDiv);
}
/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addT(containerDiv, pTPair) {
    let tInputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + "T", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            pTPair.setT(parseFloat(target.value));
            console.log("Set T to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = pTPair.getT().toExponential();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, pTPair.getT().toExponential(), "T");
    let tInputElement = tInputDiv.querySelector("input");
    tInputElement.value = pTPair.getT().toExponential();
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tInputElement);
    containerDiv.appendChild(tInputDiv);
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addExcessReactantConc(pTPairDiv, pTPair) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString + " " + (0, $6f7aa7a716962086$export$284227145ed02b04).tagName, $7e68913db756e51f$var$boundary1);
    pTPairDiv.append(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let excessReactantConcLabel = document.createElement("label");
        excessReactantConcLabel.textContent = "excessReactantConc: ";
        pTPairDiv.appendChild(excessReactantConcLabel);
        let excessReactantConcInput = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $6f7aa7a716962086$export$284227145ed02b04).tagName, $7e68913db756e51f$var$boundary1);
        excessReactantConcInput.value = NaN.toString();
        excessReactantConcInput.addEventListener("change", (event)=>{
            let target = event.target;
            pTPair.setExcessReactantConc(target.value);
            console.log("Set excessReactantConc to " + target.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        });
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(excessReactantConcInput);
        pTPairDiv.appendChild(excessReactantConcInput);
        // Add a remove button.
        let removeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$removeSymbol, $7e68913db756e51f$var$boundary1);
        removeButton.addEventListener("click", ()=>{
            pTPairDiv.removeChild(excessReactantConcLabel);
            pTPairDiv.removeChild(excessReactantConcInput);
            pTPairDiv.removeChild(removeButton);
            $7e68913db756e51f$var$addExcessReactantConc(pTPairDiv, pTPair);
        });
        pTPairDiv.appendChild(removeButton);
        // Remove the add button.
        pTPairDiv.removeChild(button);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addPercentExcessReactantConc(pTPairDiv, pTPair) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString + " percentExcessReactantConc", $7e68913db756e51f$var$boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let percentExcessReactantConcLabel = document.createElement("label");
        percentExcessReactantConcLabel.textContent = "percentExcessReactantConc: ";
        pTPairDiv.appendChild(percentExcessReactantConcLabel);
        let percentExcessReactantConcInput = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + "percentExcessReactantConc", $7e68913db756e51f$var$boundary1);
        percentExcessReactantConcInput.value = NaN.toString();
        percentExcessReactantConcInput.addEventListener("change", (event)=>{
            let target = event.target;
            pTPair.setPercentExcessReactantConc(target.value);
            console.log("Set percentExcessReactantConc to " + target.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        });
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(percentExcessReactantConcInput);
        pTPairDiv.appendChild(percentExcessReactantConcInput);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addPrecision(pTPairDiv, pTPair) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString + " " + "precision", $7e68913db756e51f$var$boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let precisionLabel = document.createElement("label");
        precisionLabel.textContent = "Precision: ";
        pTPairDiv.appendChild(precisionLabel);
        let precisionInput = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + "precision", $7e68913db756e51f$var$boundary1);
        precisionInput.value = NaN.toString();
        precisionInput.addEventListener("change", (event)=>{
            let target = event.target;
            pTPair.setPrecision(target.value);
            console.log("Set Precision to " + target.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        });
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(precisionInput);
        pTPairDiv.appendChild(precisionInput);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addBathGas(pTPairDiv, pTPair) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString + " " + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let bathGasDiv = document.createElement("div");
        let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), "");
        pTPair.setBathGas(bathGas);
        let bathGasLabel = document.createElement("label");
        bathGasLabel.textContent = (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName + ": ";
        bathGasDiv.appendChild(bathGasLabel);
        pTPairDiv.insertBefore(bathGasDiv, button);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs = new Set($7e68913db756e51f$var$molecules.keys());
        let selectElement = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(Array.from(moleculeIDs), (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName + "_" + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, $7e68913db756e51f$var$boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener("change", (event)=>{
            let target = event.target;
            bathGas.value = target.value;
            console.log("Added " + target.value + " as a " + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(selectElement);
        bathGasDiv.appendChild(selectElement);
        pTPairDiv.insertBefore(bathGasDiv, button);
        pTPairDiv.removeChild(button);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function $7e68913db756e51f$var$addExperimentRateButton(pTPairDiv, pTPair) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString + " " + (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName, $7e68913db756e51f$var$boundary1);
    //let addExperimentRateDiv: HTMLDivElement = document.createElement("div");
    //addExperimentRateDiv.appendChild(addExperimentRateButton);
    // Add event listener to the addExperimentRateButton.
    button.addEventListener("click", ()=>{
        let experimentRateDiv = document.createElement("div");
        experimentRateDiv.style.marginLeft = $7e68913db756e51f$var$margin5;
        let experimentRate = new (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a)(new Map(), NaN);
        pTPair.setExperimentRate(experimentRate);
        // Create a new div element for the input.
        let id = (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName;
        let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, (event)=>{
            let target = event.target;
            $7e68913db756e51f$export$b1e4cbf5b56e0e21(experimentRate, target);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, "", (0, $ae74a7b44a6504a1$export$ea088383ce76fc5a).tagName);
        experimentRateDiv.appendChild(inputDiv);
        pTPairDiv.insertBefore(experimentRateDiv, button);
        pTPairDiv.removeChild(button);
    });
/*
    pTsDiv.appendChild(button);
    pTPairDiv.appendChild(button);
    // Add the pTPairDiv to the pTsDiv.
    pTsDiv.insertBefore(pTPairDiv, addButton);
    */ }
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ function $7e68913db756e51f$var$processModelParameters(xml) {
    console.log((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    let modelParametersDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    let xml_modelParameters = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    let modelParameters = new (0, $8883b31bd809eb64$export$77f098867dc64198)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_modelParameters));
    $7e68913db756e51f$var$mesmer.setModelParameters(modelParameters);
    $7e68913db756e51f$var$processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    $7e68913db756e51f$var$processAutomaticallySetMaxEneModelParameters(modelParameters, xml_modelParameters, modelParametersDiv);
    $7e68913db756e51f$var$processEnergyAboveTheTopHill(modelParameters, xml_modelParameters, modelParametersDiv);
    $7e68913db756e51f$var$processMaxTemperature(modelParameters, xml_modelParameters, modelParametersDiv);
    return modelParametersDiv;
}
/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */ function $7e68913db756e51f$var$processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    modelParametersDiv.appendChild(div);
    let xml = xml_modelParameters.getElementsByTagName((0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName);
    let lwb = (0, $f0396edd0a5c99f7$export$e9d85a17345c2f11)((0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName, "", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName + "_input";
    let ids = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName + "_select";
    let gs;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        gs = new (0, $8883b31bd809eb64$export$26e33f0df9ce919d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
        $7e68913db756e51f$var$createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        gs = new (0, $8883b31bd809eb64$export$26e33f0df9ce919d)(new Map(), NaN);
        button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the GrainSize already exists
        if (!modelParameters.index.has((0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName)) {
            $7e68913db756e51f$var$createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
            button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param gs The grain size.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createGrainSizeInput(modelParameters, div, gs, id, ids, valueString) {
    modelParameters.setGrainSize(gs);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            $7e68913db756e51f$export$b1e4cbf5b56e0e21(gs, event.target);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(event.target);
        }
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
    $7e68913db756e51f$var$addAnyUnits((0, $ef5b9341e5193b70$export$95174cf0748f45cd).units, gs.attributes, div, ids, (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName, $7e68913db756e51f$var$boundary1);
}
/**
 * Process "me:automaticallySetMaxEne".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function $7e68913db756e51f$var$processAutomaticallySetMaxEneModelParameters(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    modelParametersDiv.appendChild(div);
    let xml = xml_modelParameters.getElementsByTagName((0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName);
    let lwb = (0, $f0396edd0a5c99f7$export$e9d85a17345c2f11)((0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName, "", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName + "_input";
    let ids = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName + "_select";
    let asme;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        asme = new (0, $b6873406fb778c0b$export$576b56ca6e34780b)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
        $7e68913db756e51f$var$createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        asme = new (0, $b6873406fb778c0b$export$576b56ca6e34780b)(new Map(), NaN);
        button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the AutomaticallySetMaxEne already exists
        if (!modelParameters.index.has((0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName)) {
            $7e68913db756e51f$var$createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
            button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = asme.value.toExponential();
            modelParameters.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The ModelParameters.
 * @param div The div.
 * @param asme The automatically set max energy.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString) {
    modelParameters.setAutomaticallySetMaxEne(asme);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(asme, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
    $7e68913db756e51f$var$addAnyUnits((0, $ef5b9341e5193b70$export$95174cf0748f45cd).units, asme.attributes, div, ids, (0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName, $7e68913db756e51f$var$boundary1);
}
/**
 * Process "me:energyAboveTheTopHill".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function $7e68913db756e51f$var$processEnergyAboveTheTopHill(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    modelParametersDiv.appendChild(div);
    let xml = xml_modelParameters.getElementsByTagName((0, $8883b31bd809eb64$export$aa73446724166cdb).tagName);
    let lwb = (0, $f0396edd0a5c99f7$export$e9d85a17345c2f11)((0, $8883b31bd809eb64$export$aa73446724166cdb).tagName, "", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName + "_input";
    let ids = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName + "_select";
    let eatth;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        eatth = new (0, $8883b31bd809eb64$export$aa73446724166cdb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
        $7e68913db756e51f$var$createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        eatth = new (0, $8883b31bd809eb64$export$aa73446724166cdb)(new Map(), NaN);
        button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the EnergyAboveTheTopHill already exists
        if (!modelParameters.index.has((0, $8883b31bd809eb64$export$aa73446724166cdb).tagName)) {
            $7e68913db756e51f$var$createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
            button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = eatth.value.toExponential();
            modelParameters.removeEnergyAboveTheTopHill();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param eatth The energy above the top hill.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString) {
    modelParameters.setEnergyAboveTheTopHill(eatth);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(eatth, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
    $7e68913db756e51f$var$addAnyUnits((0, $ef5b9341e5193b70$export$95174cf0748f45cd).units, eatth.attributes, div, ids, (0, $8883b31bd809eb64$export$aa73446724166cdb).tagName, $7e68913db756e51f$var$boundary1);
}
/**
 * Process "me:maxTemperature".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function $7e68913db756e51f$var$processMaxTemperature(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    modelParametersDiv.appendChild(div);
    let xml = xml_modelParameters.getElementsByTagName((0, $8883b31bd809eb64$export$f9c72965e4ddfc8e).tagName);
    let lwb = (0, $f0396edd0a5c99f7$export$e9d85a17345c2f11)((0, $8883b31bd809eb64$export$f9c72965e4ddfc8e).tagName, "", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$f9c72965e4ddfc8e).tagName + "_input";
    let ids = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + (0, $8883b31bd809eb64$export$f9c72965e4ddfc8e).tagName + "_select";
    let mt;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        mt = new (0, $8883b31bd809eb64$export$f9c72965e4ddfc8e)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
        $7e68913db756e51f$var$createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        mt = new (0, $8883b31bd809eb64$export$f9c72965e4ddfc8e)(new Map(), NaN);
        button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the MaxTemperature already exists
        if (!modelParameters.index.has((0, $8883b31bd809eb64$export$f9c72965e4ddfc8e).tagName)) {
            $7e68913db756e51f$var$createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
            button.textContent = $7e68913db756e51f$var$selected + $7e68913db756e51f$var$selectedLoadedText1;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = mt.value.toExponential();
            modelParameters.removeMaxTemperature();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = $7e68913db756e51f$var$deselected + $7e68913db756e51f$var$deselectedText1;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param mt The max temperature.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString) {
    modelParameters.setMaxTemperature(mt);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(mt, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
    $7e68913db756e51f$var$addAnyUnits(undefined, mt.attributes, div, ids, (0, $8883b31bd809eb64$export$f9c72965e4ddfc8e).tagName, $7e68913db756e51f$var$boundary1);
}
/**
 * Parses xml to initialise controls.
 * @param xml The XML document.
 * @returns The controls div.
 * 
 * Tag control options:
 * me:calculateRateCoefficientsOnly
 * me:printCellDOS
 * me:printCellTransitionStateFlux
 * me:printReactionOperatorColumnSums
 * me:printGrainBoltzmann
 * me:printGrainDOS
 * me:printGrainkbE
 * me:printGrainkfE
 * me:printTSsos
 * me:printGrainedSpeciesProfile
 * me:printGrainTransitionStateFlux
 * me:printReactionOperatorSize
 * me:printSpeciesProfile
 * me:printPhenomenologicalEvolution
 * me:printTunnelingCoefficients
 * me:printCrossingCoefficients
 * me:testDOS
 * me:testRateConstants
 * me:useTheSameCellNumberForAllConditions
 * me:hideInactive
 * me:ForceMacroDetailedBalance
 * 
 * TagWithAttribute control options:
 * me:testMicroRates
 * 
 * StringNode control options:
 * me:calcMethod "simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation", "ThermodynamicTable", "sensitivityAnalysis"
 * 
 * NumberNode control options:
 * me:eigenvalues
 * me:shortestTimeOfInterest
 * me:MaximumEvolutionTime
 * me:automaticallySetMaxEne
 * me:diagramEnergyOffset
 */ function $7e68913db756e51f$var$processControl(xml) {
    console.log((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    // Create div to contain the controls.
    let controlsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$boundary1);
    // Get the XML "me:control" element.
    let xml_control = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    let control = new (0, $b6873406fb778c0b$export$7a7fa4424cb20976)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_control));
    $7e68913db756e51f$var$mesmer.setControl(control);
    // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
    let onOffControls = new Map();
    $7e68913db756e51f$var$processCalculateRateCoefficientsOnly(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintCellDOS(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintCellTransitionStateFlux(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintReactionOperatorColumnSums(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintGrainBoltzmann(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintGrainDOS(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintGrainkbE(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintGrainkfE(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintTSsos(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintGrainedSpeciesProfile(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintGrainTransitionStateFlux(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintReactionOperatorSize(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintSpeciesProfile(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintPhenomenologicalEvolution(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintTunnelingCoefficients(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processPrintCrossingCoefficients(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processTestDOS(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processTestRateConstants(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processUseTheSameCellNumberForAllConditions(control, onOffControls, xml_control);
    $7e68913db756e51f$var$processForceMacroDetailedBalance(control, onOffControls, xml_control);
    // Create a div for the on/off controls.
    let onOffControlsDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    let orderedOnOffControls = new Map([
        ...onOffControls.entries()
    ].sort());
    orderedOnOffControls.forEach((button)=>{
        onOffControlsDiv.appendChild(button);
    });
    controlsDiv.appendChild(onOffControlsDiv);
    // Controls with additional things to set.
    $7e68913db756e51f$var$processTestMicroRates(control, controlsDiv, xml_control);
    $7e68913db756e51f$var$processCalcMethod(control, controlsDiv, xml_control);
    $7e68913db756e51f$var$processEigenvalues(control, controlsDiv, xml_control);
    $7e68913db756e51f$var$processShortestTimeOfInterest(control, controlsDiv, xml_control);
    $7e68913db756e51f$var$processMaximumEvolutionTime(control, controlsDiv, xml_control);
    $7e68913db756e51f$var$processAutomaticallySetMaxEneControl(control, controlsDiv, xml_control);
    $7e68913db756e51f$var$processDiagramEnergyOffset(control, controlsDiv, xml_control);
    return controlsDiv;
}
/**
 * Process "me:calculateRateCoefficientsOnly".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processCalculateRateCoefficientsOnly(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$7d9247c9879133fb).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let crco = new (0, $b6873406fb778c0b$export$7d9247c9879133fb)();
    if (xml.length == 1) {
        control.setCalculateRateCoefficientsOnly(crco);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the CalculateRateCoefficientsOnly already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$7d9247c9879133fb).tagName)) {
            control.setCalculateRateCoefficientsOnly(crco);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeCalculateRateCoefficientsOnly();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printCellDOS".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintCellDOS(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$60b233651e162b60).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pcd = new (0, $b6873406fb778c0b$export$60b233651e162b60)();
    if (xml.length == 1) {
        control.setPrintCellDOS(pcd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintCellDOS already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$60b233651e162b60).tagName)) {
            control.setPrintCellDOS(pcd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintCellDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printCellTransitionStateFlux".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintCellTransitionStateFlux(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$7e63e5104be309ff).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pctsf = new (0, $b6873406fb778c0b$export$7e63e5104be309ff)();
    if (xml.length == 1) {
        control.setPrintCellTransitionStateFlux(pctsf);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintCellTransitionStateFlux already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$7e63e5104be309ff).tagName)) {
            control.setPrintCellTransitionStateFlux(pctsf);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintCellTransitionStateFlux();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printReactionOperatorColumnSums".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintReactionOperatorColumnSums(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$a915db169f144f37).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let proc = new (0, $b6873406fb778c0b$export$a915db169f144f37)();
    if (xml.length == 1) {
        control.setPrintReactionOperatorColumnSums(proc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintReactionOperatorColumnSums already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$a915db169f144f37).tagName)) {
            control.setPrintReactionOperatorColumnSums(proc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintReactionOperatorColumnSums();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printGrainBoltzmann".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintGrainBoltzmann(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$e7fff349901f700d).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pgb = new (0, $b6873406fb778c0b$export$e7fff349901f700d)();
    if (xml.length == 1) {
        control.setPrintGrainBoltzmann(pgb);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintGrainBoltzmann already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$e7fff349901f700d).tagName)) {
            control.setPrintGrainBoltzmann(pgb);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintGrainBoltzmann();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printGrainDOS".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintGrainDOS(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pgd = new (0, $b6873406fb778c0b$export$d23243bda4dfae2b)();
    if (xml.length == 1) {
        control.setPrintGrainDOS(pgd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintGrainDOS already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$d23243bda4dfae2b).tagName)) {
            control.setPrintGrainDOS(pgd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintGrainDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printGrainkbE".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintGrainkbE(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pgkbE = new (0, $b6873406fb778c0b$export$55888ef4e813a34d)();
    if (xml.length == 1) {
        control.setPrintGrainkbE(pgkbE);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintGrainkbE already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$55888ef4e813a34d).tagName)) {
            control.setPrintGrainkbE(pgkbE);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintGrainkbE();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printGrainkfE".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintGrainkfE(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pgkfE = new (0, $b6873406fb778c0b$export$f8d814a406a0ff5b)();
    if (xml.length == 1) {
        control.setPrintGrainkfE(pgkfE);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintGrainkfE already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$f8d814a406a0ff5b).tagName)) {
            control.setPrintGrainkfE(pgkfE);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintGrainkfE();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printTSsos".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintTSsos(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$3627f2b606ffd3cb).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pts = new (0, $b6873406fb778c0b$export$3627f2b606ffd3cb)();
    if (xml.length == 1) {
        control.setPrintTSsos(pts);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintTSsos already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$3627f2b606ffd3cb).tagName)) {
            control.setPrintTSsos(pts);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintTSsos();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printGrainedSpeciesProfile".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintGrainedSpeciesProfile(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$c5481d114fddc81c).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pgsp = new (0, $b6873406fb778c0b$export$c5481d114fddc81c)();
    if (xml.length == 1) {
        control.setPrintGrainedSpeciesProfile(pgsp);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintGrainedSpeciesProfile already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$c5481d114fddc81c).tagName)) {
            control.setPrintGrainedSpeciesProfile(pgsp);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintGrainedSpeciesProfile();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printGrainTransitionStateFlux".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintGrainTransitionStateFlux(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$ec7c00ae1b17b2ab).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pgtsf = new (0, $b6873406fb778c0b$export$ec7c00ae1b17b2ab)();
    if (xml.length == 1) {
        control.setPrintGrainTransitionStateFlux(pgtsf);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintGrainTransitionStateFlux already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$ec7c00ae1b17b2ab).tagName)) {
            control.setPrintGrainTransitionStateFlux(pgtsf);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintGrainTransitionStateFlux();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printReactionOperatorSize".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintReactionOperatorSize(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$8420ab6988728a65).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pros = new (0, $b6873406fb778c0b$export$8420ab6988728a65)();
    if (xml.length == 1) {
        control.setPrintReactionOperatorSize(pros);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintReactionOperatorSize already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$8420ab6988728a65).tagName)) {
            control.setPrintReactionOperatorSize(pros);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintReactionOperatorSize();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printSpeciesProfile".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintSpeciesProfile(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let psp = new (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1)();
    if (xml.length == 1) {
        control.setPrintSpeciesProfile(psp);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintSpeciesProfile already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1).tagName)) {
            control.setPrintSpeciesProfile(psp);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintSpeciesProfile();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printPhenomenologicalEvolution".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintPhenomenologicalEvolution(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$9f7939759d8efd9f).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let ppe = new (0, $b6873406fb778c0b$export$9f7939759d8efd9f)();
    if (xml.length == 1) {
        control.setPrintPhenomenologicalEvolution(ppe);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintPhenomenologicalEvolution already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$9f7939759d8efd9f).tagName)) {
            control.setPrintPhenomenologicalEvolution(ppe);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintPhenomenologicalEvolution();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printTunnelingCoefficients".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintTunnelingCoefficients(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$fc99460819e23ac5).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let ptc = new (0, $b6873406fb778c0b$export$fc99460819e23ac5)();
    if (xml.length == 1) {
        control.setPrintTunnelingCoefficients(ptc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintTunnelingCoefficients already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$fc99460819e23ac5).tagName)) {
            control.setPrintTunnelingCoefficients(ptc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintTunnelingCoefficients();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:printCrossingCoefficients".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processPrintCrossingCoefficients(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$2f2eaac8983031ef).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let pcc = new (0, $b6873406fb778c0b$export$2f2eaac8983031ef)();
    if (xml.length == 1) {
        control.setPrintCrossingCoefficients(pcc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the PrintCrossingCoefficients already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$2f2eaac8983031ef).tagName)) {
            control.setPrintCrossingCoefficients(pcc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removePrintCrossingCoefficients();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:testDOS".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processTestDOS(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let tdos = new (0, $b6873406fb778c0b$export$a3d7e677521f681f)();
    if (xml.length == 1) {
        control.setTestDOS(tdos);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the TestDOS already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$a3d7e677521f681f).tagName)) {
            control.setTestDOS(tdos);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeTestDOS();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:testRateConstants".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processTestRateConstants(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$724a5a49739f4b4a).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let trc = new (0, $b6873406fb778c0b$export$724a5a49739f4b4a)();
    if (xml.length == 1) {
        control.setTestRateConstants(trc);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the TestRateConstants already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$724a5a49739f4b4a).tagName)) {
            control.setTestRateConstants(trc);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeTestRateConstants();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:useTheSameCellNumberForAllConditions".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processUseTheSameCellNumberForAllConditions(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$5d7dbeba4bf49655).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let utsnfac = new (0, $b6873406fb778c0b$export$5d7dbeba4bf49655)();
    if (xml.length == 1) {
        control.setUseTheSameCellNumberForAllConditions(utsnfac);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the UseTheSameCellNumberForAllConditions already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$5d7dbeba4bf49655).tagName)) {
            control.setUseTheSameCellNumberForAllConditions(utsnfac);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeUseTheSameCellNumberForAllConditions();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:forceMacroDetailedBalance".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processForceMacroDetailedBalance(control, onOffControls, xml_control) {
    let tagName = (0, $b6873406fb778c0b$export$6ffea14bdffd427f).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let fmd = new (0, $b6873406fb778c0b$export$6ffea14bdffd427f)();
    if (xml.length == 1) {
        control.setForceMacroDetailedBalance(fmd);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the ForceMacroDetailedBalance already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$6ffea14bdffd427f).tagName)) {
            control.setForceMacroDetailedBalance(fmd);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeForceMacroDetailedBalance();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processTestMicroRates(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_input";
    let idTmax = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_Tmax";
    let idTmin = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_Tmin";
    let idTstep = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_Tstep";
    let tmr;
    if (xml.length == 1) {
        tmr = new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]));
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
        button.classList.toggle("optionOff");
    } else {
        tmr = new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the TestMicroRates already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName)) {
            $7e68913db756e51f$var$createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeTestMicroRates();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            // Remove any existing Tmax.
            e: HTMLDivElement;
            e = document.getElementById(idTmax);
            if (e != null) e.remove();
            // Remove any existing Tmin.
            e = document.getElementById(idTmin);
            if (e != null) e.remove();
            // Remove any existing Tstep.
            e = document.getElementById(idTstep);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 */ function $7e68913db756e51f$var$createTestMicroRates(control, div, xml_tmr, idTmax, idTmin, idTstep) {
    let attributes;
    let tmr;
    if (xml_tmr.length == 1) {
        attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tmr[0]);
        tmr = new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)(attributes);
    } else {
        attributes = new Map();
        attributes.set("Tmax", "");
        attributes.set("Tmin", "");
        attributes.set("Tstep", "");
        tmr = new (0, $b6873406fb778c0b$export$1f37c7c73e401f31)(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idTmax + "_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            tmr.setTmax(parseFloat(target.value));
            console.log("Set Tmax to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, tMax.toExponential(), "Tmax");
    tMaxlwi.id = idTmax;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tMaxlwi.querySelector("input"));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idTmin + "_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            tmr.setTmin(parseFloat(target.value));
            console.log("Set Tmin to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, tMin.toExponential(), "Tmin");
    tMinlwi.id = idTmin;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tMinlwi.querySelector("input"));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idTstep + "_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            tmr.setTstep(parseFloat(target.value));
            console.log("Set Tstep to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, tStep.toExponential(), "Tstep");
    tSteplwi.id = idTstep;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tSteplwi.querySelector("input"));
    div.appendChild(tSteplwi);
}
/**
 * Process "me:calcMethod".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processCalcMethod(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$f0bfd84d03c3a22d).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let cm;
    //cm = loadCalcMethod(xml);
    let options = (0, $b6873406fb778c0b$export$f0bfd84d03c3a22d).options;
    let ids = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_select";
    let idcm = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_cm";
    let first = true;
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the CalcMethod already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$f0bfd84d03c3a22d).tagName)) {
            if (first) options.push($7e68913db756e51f$var$selectAnotherOption);
            let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, tagName, ids, $7e68913db756e51f$var$boundary1);
            div.appendChild(select);
            select.addEventListener("click", (event)=>{
                if (options[options.length - 1] == $7e68913db756e51f$var$selectAnotherOption) options.pop();
                let lastIndex = select.options.length - 1;
                if (select.options[lastIndex].value == $7e68913db756e51f$var$selectAnotherOption) select.remove(lastIndex);
            });
            select.addEventListener("change", (event)=>{
                // Remove any existing div.
                let cmDiv = document.getElementById(idcm);
                if (cmDiv != null) cmDiv.remove();
                cmDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$boundary1);
                div.appendChild(cmDiv);
                cmDiv.id = idcm;
                let target = event.target;
                let value = target.value;
                if (value == (0, $b6873406fb778c0b$export$afd374542f6f3da6).xsi_type || value == (0, $b6873406fb778c0b$export$afd374542f6f3da6).xsi_type2) {
                    // "me:simpleCalc", "simpleCalc".
                    let cmsc = new (0, $b6873406fb778c0b$export$afd374542f6f3da6)(new Map());
                    cm = cmsc;
                } else if (value == (0, $b6873406fb778c0b$export$271191b096a55e63).xsi_type || value == (0, $b6873406fb778c0b$export$271191b096a55e63).xsi_type2) {
                    // "me:gridSearch", "gridSearch".
                    let cmgs = new (0, $b6873406fb778c0b$export$271191b096a55e63)(new Map());
                    // upper
                    // lower
                    cm = cmgs;
                } else if (value == (0, $b6873406fb778c0b$export$654b70df01671c79).xsi_type || value == (0, $b6873406fb778c0b$export$654b70df01671c79).xsi_type2) {
                    // "me:fitting", "fitting".
                    let cmf = new (0, $b6873406fb778c0b$export$654b70df01671c79)(new Map());
                    // "me:fittingIterations".
                    let fiwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_FittingIterations_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmf.setFittingIterations(new (0, $b6873406fb778c0b$export$830a50cd13af6e84)(new Map(), parseFloat(target.value)));
                            console.log("Set FittingIterations to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$830a50cd13af6e84).tagName);
                    cmDiv.appendChild(fiwi);
                } else if (value == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type || value == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type2) {
                    // "me:marquardt", "marquardt".
                    let cmm = new (0, $b6873406fb778c0b$export$7968aa666bcf62fa)(new Map());
                    // MarquardtIterations.
                    let milwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_MarquardtIterations_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmm.setMarquardtIterations(new (0, $b6873406fb778c0b$export$9f699e98369d9591)(new Map(), parseFloat(target.value)));
                            console.log("Set MarquardtIterations to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$9f699e98369d9591).tagName);
                    cmDiv.appendChild(milwi);
                    // MarquardtTolerance.
                    let mtlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_MarquardtTolerance_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmm.setMarquardtTolerance(new (0, $b6873406fb778c0b$export$ca1e6c3ff9fd3627)(new Map(), parseFloat(target.value)));
                            console.log("Set MarquardtTolerance to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$ca1e6c3ff9fd3627).tagName);
                    cmDiv.appendChild(mtlwi);
                    // MarquardtDerivDelta.
                    let mddlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_MarquardtDerivDelta_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmm.setMarquardtDerivDelta(new (0, $b6873406fb778c0b$export$d3887b529debf19d)(new Map(), parseFloat(target.value)));
                            console.log("Set MarquardtDerivDelta to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$d3887b529debf19d).tagName);
                    cmDiv.appendChild(mddlwi);
                    cm = cmm;
                } else if (value == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type || value == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type2) {
                    // "me:analyticalRepresentation", "analyticalRepresentation".
                    let cmar = new (0, $b6873406fb778c0b$export$fe9781900d201bdf)(new Map());
                    // "me:format".
                    let formatlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", idcm + "_Format_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        cmar.setFormat(new (0, $b6873406fb778c0b$export$93514d28bd18d75a)(new Map(), target.value));
                        console.log("Set Format to " + target.value);
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, "", (0, $b6873406fb778c0b$export$93514d28bd18d75a).tagName);
                    cmDiv.appendChild(formatlwi);
                    // "me:precision".
                    let precisionlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", idcm + "_Precision_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        cmar.setPrecision(new (0, $b6873406fb778c0b$export$be201676156f3e60)(new Map(), target.value));
                        console.log("Set Precision to " + target.value);
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, "", (0, $b6873406fb778c0b$export$be201676156f3e60).tagName);
                    cmDiv.appendChild(precisionlwi);
                    // "me:chebNumTemp".
                    let chebNumTemplwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebNumTemp_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebNumTemp(new (0, $b6873406fb778c0b$export$19d20f3642d82681)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebNumTemp to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$19d20f3642d82681).tagName);
                    cmDiv.appendChild(chebNumTemplwi);
                    // "me:chebNumConc".
                    let chebNumConclwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebNumConc_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebNumConc(new (0, $b6873406fb778c0b$export$906be0805438fd80)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebNumConc to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$906be0805438fd80).tagName);
                    cmDiv.appendChild(chebNumConclwi);
                    // "me:chebMaxTemp".
                    let chebMaxTemplwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebMaxTemp_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebMaxTemp(new (0, $b6873406fb778c0b$export$6ab4fe1621c91452)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebMaxTemp to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$6ab4fe1621c91452).tagName);
                    cmDiv.appendChild(chebMaxTemplwi);
                    // "me:chebMinTemp".
                    let chebMinTemplwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebMinTemp_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebMinTemp(new (0, $b6873406fb778c0b$export$e9853d49316ae9ae)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebMinTemp to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$e9853d49316ae9ae).tagName);
                    cmDiv.appendChild(chebMinTemplwi);
                    // "me:chebMaxConc".
                    let chebMaxConclwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebMaxConc_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebMaxConc(new (0, $b6873406fb778c0b$export$39eacc768d7e9bb)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebMaxConc to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$39eacc768d7e9bb).tagName);
                    cmDiv.appendChild(chebMaxConclwi);
                    // "me:chebMinConc".
                    let chebMinConclwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebMinConc_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebMinConc(new (0, $b6873406fb778c0b$export$78194e57ce26d99a)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebMinConc to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$78194e57ce26d99a).tagName);
                    cmDiv.appendChild(chebMinConclwi);
                    // "me:chebTExSize".
                    let chebTExSizelwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebTExSize_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebTExSize(new (0, $b6873406fb778c0b$export$96094ac7e31a750e)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebTExSize to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$96094ac7e31a750e).tagName);
                    cmDiv.appendChild(chebTExSizelwi);
                    // "me:chebPExSize".
                    let chebPExSizelwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_ChebPExSize_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmar.setChebPExSize(new (0, $b6873406fb778c0b$export$ae695595d3952700)(new Map(), parseFloat(target.value)));
                            console.log("Set ChebPExSize to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$ae695595d3952700).tagName);
                    cmDiv.appendChild(chebPExSizelwi);
                    cm = cmar;
                } else if (value == (0, $b6873406fb778c0b$export$16ef3f79998b60b4).xsi_type || value == (0, $b6873406fb778c0b$export$16ef3f79998b60b4).xsi_type2) {
                    // "me:ThermodynamicTable", "ThermodynamicTable".
                    let cmtt = new (0, $b6873406fb778c0b$export$16ef3f79998b60b4)(new Map());
                    // "me:Tmin".
                    let tminlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_Tmin_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmtt.setTmin(new (0, $b6873406fb778c0b$export$7be1a36e1f74dbc7)(new Map(), parseFloat(target.value)));
                            console.log("Set Tmin to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$7be1a36e1f74dbc7).tagName);
                    cmDiv.appendChild(tminlwi);
                    // "me:Tmid".
                    let tmidlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_Tmid_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmtt.setTmid(new (0, $b6873406fb778c0b$export$ac2eb7df727f506d)(new Map(), parseFloat(target.value)));
                            console.log("Set Tmid to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$ac2eb7df727f506d).tagName);
                    cmDiv.appendChild(tmidlwi);
                    // "me:Tmax".
                    let tmaxlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_Tmax_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmtt.setTmax(new (0, $b6873406fb778c0b$export$58c8f4b7ec654137)(new Map(), parseFloat(target.value)));
                            console.log("Set Tmax to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$58c8f4b7ec654137).tagName);
                    cmDiv.appendChild(tmaxlwi);
                    // "me:Tstep".
                    let tsteplwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_Tstep_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmtt.setTstep(new (0, $b6873406fb778c0b$export$7b8cfe3a6a460886)(new Map(), parseFloat(target.value)));
                            console.log("Set Tstep to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$7b8cfe3a6a460886).tagName);
                    cmDiv.appendChild(tsteplwi);
                    cm = cmtt;
                } else if (value == (0, $b6873406fb778c0b$export$a532500cc43efbef).xsi_type || value == (0, $b6873406fb778c0b$export$a532500cc43efbef).xsi_type2) {
                    // "me:sensitivityAnalysis", "sensitivityAnalysis".
                    let cmsa = new (0, $b6873406fb778c0b$export$a532500cc43efbef)(new Map());
                    // "me:sensitivityAnalysisSamples".
                    let saslwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_SensitivityAnalysisSamples_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmsa.setSensitivityAnalysisSamples(new (0, $b6873406fb778c0b$export$37d0520a9fac7849)(new Map(), parseFloat(target.value)));
                            console.log("Set SensitivityAnalysisSamples to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$37d0520a9fac7849).tagName);
                    cmDiv.appendChild(saslwi);
                    // "me:sensitivityAnalysisOrder".
                    let saolwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_SensitivityAnalysisOrder_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmsa.setSensitivityAnalysisOrder(new (0, $b6873406fb778c0b$export$9a832710e54827ea)(new Map(), parseFloat(target.value)));
                            console.log("Set SensitivityAnalysisOrder to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$9a832710e54827ea).tagName);
                    cmDiv.appendChild(saolwi);
                    // "me:sensitivityNumVarRedIters".
                    let snvriwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idcm + "_SensitivityNumVarRedIters_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        // Check the value is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            cmsa.setSensitivityNumVarRedIters(new (0, $b6873406fb778c0b$export$b43b57458ce8fb96)(new Map(), parseFloat(target.value)));
                            console.log("Set SensitivityNumVarRedIters to " + target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            target.value = NaN.toString();
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, NaN.toString(), (0, $b6873406fb778c0b$export$b43b57458ce8fb96).tagName);
                    cmDiv.appendChild(snvriwi);
                    // "me:sensitivityVarRedMethod".
                    let svrmiwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", idcm + "_SensitivityVarRedMethod_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
                        let target = event.target;
                        cmsa.setSensitivityVarRedMethod(new (0, $b6873406fb778c0b$export$e98aeac6c6b1df09)(new Map(), target.value));
                        console.log("Set SensitivityVarRedMethod to " + target.value);
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, "", (0, $b6873406fb778c0b$export$e98aeac6c6b1df09).tagName);
                    cmDiv.appendChild(svrmiwi);
                } else throw new Error("Unknown CalcMethod type.");
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
            });
            select.value = tagName;
            console.log("Value: " + tagName);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeCalcMethod();
            // Remove any existing div.
            let e = document.getElementById(ids);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param xml The xml containing the CalcMethod.
 * @returns CalcMethod
 */ function $7e68913db756e51f$var$loadCalcMethod(xml) {
    let cm;
    let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]);
    let xsi_type = attributes.get("xsi:type");
    if (xsi_type == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type) {
        let cmm = new (0, $b6873406fb778c0b$export$7968aa666bcf62fa)(attributes);
        // MarquardtIterations.
        let mi_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$9f699e98369d9591).tagName);
        if (mi_xml.length > 0) {
            if (mi_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(mi_xml[0])));
                let marquardtIterations = new (0, $b6873406fb778c0b$export$9f699e98369d9591)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(mi_xml[0]), value);
                cmm.setMarquardtIterations(marquardtIterations);
            } else throw new Error("More than one MarquardtIterations element.");
        }
        // MarquardtTolerance.
        let mt_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$ca1e6c3ff9fd3627).tagName);
        if (mt_xml.length > 0) {
            if (mt_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(mt_xml[0])));
                let marquardtTolerance = new (0, $b6873406fb778c0b$export$ca1e6c3ff9fd3627)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(mt_xml[0]), value);
                cmm.setMarquardtTolerance(marquardtTolerance);
            } else throw new Error("More than one MarquardtTolerance element.");
        }
        // MarquardtDerivDelta.
        let mdd_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$d3887b529debf19d).tagName);
        if (mdd_xml.length > 0) {
            if (mdd_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(mdd_xml[0])));
                let marquardtDerivDelta = new (0, $b6873406fb778c0b$export$d3887b529debf19d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(mdd_xml[0]), value);
                cmm.setMarquardtDerivDelta(marquardtDerivDelta);
            } else throw new Error("More than one MarquardtDerivDelta element.");
        }
        cm = cmm;
    } else if (xsi_type == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type) {
        let cmar = new (0, $b6873406fb778c0b$export$fe9781900d201bdf)(attributes);
        cm = cmar;
        // Format.
        let format_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$93514d28bd18d75a).tagName);
        if (format_xml.length > 0) {
            if (format_xml.length == 1) {
                let value = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(format_xml[0]));
                let format = new (0, $b6873406fb778c0b$export$93514d28bd18d75a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(format_xml[0]), value);
                cmar.setFormat(format);
            } else throw new Error("More than one Format element.");
        }
        // Precision.
        let precision_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$be201676156f3e60).tagName);
        if (precision_xml.length > 0) {
            if (precision_xml.length == 1) {
                let value = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(precision_xml[0]));
                let precision = new (0, $b6873406fb778c0b$export$be201676156f3e60)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(precision_xml[0]), value);
                cmar.setPrecision(precision);
            } else throw new Error("More than one Precision element.");
        }
        // ChebNumTemp.
        let chebNumTemp_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$19d20f3642d82681).tagName);
        if (chebNumTemp_xml.length > 0) {
            if (chebNumTemp_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebNumTemp_xml[0])));
                let chebNumTemp = new (0, $b6873406fb778c0b$export$19d20f3642d82681)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebNumTemp_xml[0]), value);
                cmar.setChebNumTemp(chebNumTemp);
            } else throw new Error("More than one ChebNumTemp element.");
        }
        // ChebNumConc.
        let chebNumConc_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$906be0805438fd80).tagName);
        if (chebNumConc_xml.length > 0) {
            if (chebNumConc_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebNumConc_xml[0])));
                let chebNumConc = new (0, $b6873406fb778c0b$export$906be0805438fd80)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebNumConc_xml[0]), value);
                cmar.setChebNumConc(chebNumConc);
            } else throw new Error("More than one ChebNumConc element.");
        }
        // ChebMaxTemp.
        let chebMaxTemp_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$6ab4fe1621c91452).tagName);
        if (chebMaxTemp_xml.length > 0) {
            if (chebMaxTemp_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebMaxTemp_xml[0])));
                let chebMaxTemp = new (0, $b6873406fb778c0b$export$6ab4fe1621c91452)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebMaxTemp_xml[0]), value);
                cmar.setChebMaxTemp(chebMaxTemp);
            } else throw new Error("More than one ChebMaxTemp element.");
        }
        // ChebMinTemp.
        let chebMinTemp_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$e9853d49316ae9ae).tagName);
        if (chebMinTemp_xml.length > 0) {
            if (chebMinTemp_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebMinTemp_xml[0])));
                let chebMinTemp = new (0, $b6873406fb778c0b$export$e9853d49316ae9ae)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebMinTemp_xml[0]), value);
                cmar.setChebMinTemp(chebMinTemp);
            } else throw new Error("More than one ChebMinTemp element.");
        }
        // ChebMaxConc.
        let chebMaxConc_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$39eacc768d7e9bb).tagName);
        if (chebMaxConc_xml.length > 0) {
            if (chebMaxConc_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebMaxConc_xml[0])));
                let chebMaxConc = new (0, $b6873406fb778c0b$export$39eacc768d7e9bb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebMaxConc_xml[0]), value);
                cmar.setChebMaxConc(chebMaxConc);
            } else throw new Error("More than one ChebMaxConc element.");
        }
        // ChebMinConc.
        let chebMinConc_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$78194e57ce26d99a).tagName);
        if (chebMinConc_xml.length > 0) {
            if (chebMinConc_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebMinConc_xml[0])));
                let chebMinConc = new (0, $b6873406fb778c0b$export$78194e57ce26d99a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebMinConc_xml[0]), value);
                cmar.setChebMinConc(chebMinConc);
            } else throw new Error("More than one ChebMinConc element.");
        }
        // ChebTExSize.
        let chebTExSize_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$96094ac7e31a750e).tagName);
        if (chebTExSize_xml.length > 0) {
            if (chebTExSize_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebTExSize_xml[0])));
                let chebTExSize = new (0, $b6873406fb778c0b$export$96094ac7e31a750e)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebTExSize_xml[0]), value);
                cmar.setChebTExSize(chebTExSize);
            } else throw new Error("More than one ChebTExSize element.");
        }
        // ChebPExSize.
        let chebPExSize_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$ae695595d3952700).tagName);
        if (chebPExSize_xml.length > 0) {
            if (chebPExSize_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(chebPExSize_xml[0])));
                let chebPExSize = new (0, $b6873406fb778c0b$export$ae695595d3952700)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(chebPExSize_xml[0]), value);
                cmar.setChebPExSize(chebPExSize);
            } else throw new Error("More than one ChebPExSize element.");
        }
        cm = cmar;
    } else throw new Error("Unknown xsi:type: " + xsi_type);
    return cm;
}
/**
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processEigenvalues(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_input";
    let eigenvalues;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        eigenvalues = new (0, $b6873406fb778c0b$export$2453e311f702d9c7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createEigenValuesInput(control, div, eigenvalues, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        eigenvalues = new (0, $b6873406fb778c0b$export$2453e311f702d9c7)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the Eigenvalues already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$2453e311f702d9c7).tagName)) {
            $7e68913db756e51f$var$createEigenValuesInput(control, div, eigenvalues, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = eigenvalues.value.toExponential();
            control.removeEigenvalues();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param eigenvalues The eigenvalues.
 * @param id The id.
 * @param valueString The value string. 
 */ function $7e68913db756e51f$var$createEigenValuesInput(control, div, eigenvalues, id, valueString) {
    control.setEigenvalues(eigenvalues);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(eigenvalues, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Process "me:shortestTimeOfInterest".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processShortestTimeOfInterest(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$421603058c6718db).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_input";
    let stoi;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        stoi = new (0, $b6873406fb778c0b$export$421603058c6718db)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createShortestTimeOfInterest(control, div, stoi, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        stoi = new (0, $b6873406fb778c0b$export$421603058c6718db)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the ShortestTimeOfInterest already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$421603058c6718db).tagName)) {
            $7e68913db756e51f$var$createShortestTimeOfInterest(control, div, stoi, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = stoi.value.toExponential();
            control.removeShortestTimeOfInterest();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param stoi The shortest time of interest.
 * @param id The id.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createShortestTimeOfInterest(control, div, stoi, id, valueString) {
    control.setShortestTimeOfInterest(stoi);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(stoi, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Process "me:MaximumEvolutionTime".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processMaximumEvolutionTime(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$b51d7314540831ed).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_input";
    let met;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        met = new (0, $b6873406fb778c0b$export$b51d7314540831ed)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createMaximumEvolutionTimeInput(control, div, met, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        met = new (0, $b6873406fb778c0b$export$b51d7314540831ed)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the MaximumEvolutionTime already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$b51d7314540831ed).tagName)) {
            $7e68913db756e51f$var$createMaximumEvolutionTimeInput(control, div, met, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = met.value.toExponential();
            control.removeMaximumEvolutionTime();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param met The maximum evolution time.
 * @param id The id.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createMaximumEvolutionTimeInput(control, div, met, id, valueString) {
    control.setMaximumEvolutionTime(met);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(met, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Process "me:automaticallySetMaxEne".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processAutomaticallySetMaxEneControl(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_input";
    let asme;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        asme = new (0, $b6873406fb778c0b$export$576b56ca6e34780b)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        asme = new (0, $b6873406fb778c0b$export$576b56ca6e34780b)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the AutomaticallySetMaxEne already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$576b56ca6e34780b).tagName)) {
            $7e68913db756e51f$var$createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = asme.value.toExponential();
            control.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param asme The automatically set max energy.
 * @param id The id.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createAutomaticallySetMaxEneInputControl(control, div, asme, id, valueString) {
    control.setAutomaticallySetMaxEne(asme);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(asme, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Process me:diagramEnergyOffset.
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function $7e68913db756e51f$var$processDiagramEnergyOffset(control, controlsDiv, xml_control) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)($7e68913db756e51f$var$level1);
    controlsDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_input";
    let deo;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        deo = new (0, $b6873406fb778c0b$export$159b5d3263f1049a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        deo = new (0, $b6873406fb778c0b$export$159b5d3263f1049a)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the DiagramEnergyOffset already exists
        if (!control.index.has((0, $b6873406fb778c0b$export$159b5d3263f1049a).tagName)) {
            $7e68913db756e51f$var$createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = deo.value.toExponential();
            control.removeDiagramEnergyOffset();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param deo The diagram energy offset.
 * @param id The id.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createDiagramEnergyOffsetInput(control, div, deo, id, valueString) {
    control.setDiagramEnergyOffset(deo);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(deo, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Create a diagram.
 * @param canvas The canvas.
 * @param dark True for dark mode.
 * @param fontSize The fontSize to use.
 * @param lw The line width of reactants, transition states and products.
 * @param lwc The line width color to use.
 */ function $7e68913db756e51f$var$drawReactionDiagram(canvas, dark, font, lw, lwc) {
    console.log("drawReactionDiagram");
    if (canvas != null) {
        // Set foreground and background colors.
        let foreground;
        let background;
        let blue;
        let orange;
        if (dark) {
            foreground = "lightgrey";
            background = "darkgrey";
            blue = "lightblue";
            orange = "orange";
        } else {
            foreground = "darkgrey";
            background = "lightgrey";
            blue = "blue";
            orange = "darkorange";
        }
        let green = "green";
        let red = "red";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
        //ctx.fillStyle = background;
        // Make font bold.
        ctx.font = "bold " + font;
        // Get text height for font size.
        let th = (0, $e5f7ab5c40db3f0e$export$c398604a09be5382)(ctx, "Aj", ctx.font);
        //console.log("th=" + th);
        // Go through reactions:
        // 1. Create sets of reactants, end products, intermediate products and transition states.
        // 2. Create maps of orders and energies.
        // 3. Calculate maximum energy.
        let reactants = [];
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
                reactants.push(reactantsLabel);
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
            let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin, energyRange, 0, $7e68913db756e51f$var$rdCanvasHeight, energy);
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
        let canvasHeightWithBorder = $7e68913db756e51f$var$rdCanvasHeight + 4 * th + 2 * lw;
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = $7e68913db756e51f$var$rdCanvasHeight;
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
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, foreground, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            });
            else (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
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
}
/**
 * Save to XML file.
 */ function $7e68913db756e51f$var$saveXML() {
    console.log("saveXML");
    const pad = "  ";
    // Create a Blob object from the data
    let blob = new Blob([
        (0, $8677001474399221$export$692079bb871c6039).header,
        $7e68913db756e51f$var$mesmer.toXML(pad, pad)
    ], {
        type: "text/plain"
    });
    // Create a new object URL for the blob
    let url = URL.createObjectURL(blob);
    // Create a new 'a' element
    let a = document.createElement("a");
    // Set the href and download attributes for the 'a' element
    a.href = url;
    let title = $7e68913db756e51f$var$mesmer.getTitle()?.value;
    a.download = title.replace(/[^a-z0-9]/gi, "_") + ".xml";
    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();
    // Remove the 'a' element after the download starts
    document.body.removeChild(a);
}


export {$7e68913db756e51f$export$b1e4cbf5b56e0e21 as setNumberNode, $7e68913db756e51f$export$819b5ff7dff3652c as setNumberArrayNode};
//# sourceMappingURL=index.62ceb743.js.map
