//import { openDB } from 'idb';
/**
 * Get the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */ function $134d19e749bf0414$export$3988ae62b71be9a3(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function $134d19e749bf0414$export$3205c97bcf96f7dc(...parts) {
    let id = parts.join("-");
    // Replace any character that is not a letter (upper or lower case), a digit, a hyphen, or an underscore 
    // with an underscore. 
    let validId = id.replace(/[^a-zA-Z-_0-9]/g, "_");
    // If the first character is a digit, two hyphens, or a hyphen followed by a digit, add an underscore to 
    // the beginning of the ID.
    if (/^[0-9]|^--|-^[0-9]/.test(validId)) validId = "_" + validId;
    return validId;
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
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 * @param ids The set of ids to remove the id from.
 */ function $f0396edd0a5c99f7$export$cd7f480d6b8286c3(id, ids) {
    let e = document.getElementById(id);
    if (e != null) e.remove();
    if (ids != undefined) ids.delete(id);
}
function $f0396edd0a5c99f7$export$8b2cd46c11844202({ divToAddTo: divToAppendTo, elementToInsertBefore: elementToInsertBefore, content: content, buttonLabel: buttonLabel, buttonFontSize: buttonFontSize = "", boundary: boundary = {
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
    let div = $f0396edd0a5c99f7$export$331ff980f0d45cff(contentDivId, boundary);
    div.className = contentDivClassName;
    let button = document.createElement("button");
    button.id = contentDivId + "Button";
    button.className = "collapsible";
    button.innerText = `${buttonLabel} \u{25BC}`;
    button.addEventListener("click", function() {
        button.innerText = button.innerText.includes("\u25BC") ? `${buttonLabel} \u{25B2}` : `${buttonLabel} \u{25BC}`;
    });
    button.style.fontSize = buttonFontSize;
    Object.assign(button.style, level);
    div.appendChild(button);
    div.appendChild(content);
    if (elementToInsertBefore != null) divToAppendTo.insertBefore(div, elementToInsertBefore);
    else divToAppendTo.appendChild(div);
    $f0396edd0a5c99f7$var$setCollapsibleEventListener(button);
    return div;
}
/**
 * For setting the event listener for a collapsible element.
 * @param e The element to add the event listener to.
 */ function $f0396edd0a5c99f7$var$setCollapsibleEventListener(e) {
    // Remove any existing event listener.
    e.removeEventListener("click", $f0396edd0a5c99f7$var$toggleCollapsible);
    // Add new event listener.
    e.addEventListener("click", $f0396edd0a5c99f7$var$toggleCollapsible);
}
/**
 * For toggling the collapsible content.
 */ function $f0396edd0a5c99f7$var$toggleCollapsible() {
    this.classList.toggle("active");
    let nes = this.nextElementSibling;
    if (nes != null) {
        if (nes instanceof HTMLDivElement) {
            if (nes.style.display === "block") nes.style.display = "none";
            else nes.style.display = "block";
        } else console.log("toggleCollapsible: nextElementSibling is not an HTMLDivElement");
    } else console.log("toggleCollapsible: nextElementSibling is null");
}
function $f0396edd0a5c99f7$export$4e9ec2b27757d9dd(type, id, componentMargin, divMargin, func, value, labelTextContent, inputFontsize) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(undefined, divMargin);
    let input = $f0396edd0a5c99f7$export$cef1adc173ab7099(type, id, componentMargin, func, value, inputFontsize);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(input);
    return div;
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
function $f0396edd0a5c99f7$export$b89bf4b169286865(options, name, value, id, margin) {
    let select = document.createElement("select");
    options.forEach((option)=>{
        select.name = name;
        select.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
    select.value = value;
    select.style.fontSize = "1em"; // Set the font size with a relative unit.
    select.classList.add("auto-width");
    $f0396edd0a5c99f7$export$fdd146df37959fe8(select);
    Object.assign(select.style, margin);
    return select;
}
function $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4(textContent, options, name, value, id, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(undefined, divMargin);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(textContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild($f0396edd0a5c99f7$export$b89bf4b169286865(options, name, value, id, componentMargin));
    return div;
}
function $f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, id, boundary) {
    let button = document.createElement("button");
    button.textContent = textContent;
    if (id != undefined) button.id = id;
    if (boundary != undefined) Object.assign(button.style, boundary);
    button.style.fontSize = "1em"; // Set the font size with a relative unit.
    return button;
}
function $f0396edd0a5c99f7$export$717b1c3df34dc89e(labeltext, textContent, id, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(undefined, divMargin);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labeltext, componentMargin);
    label.htmlFor = id;
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild($f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, id, componentMargin));
    return div;
}
function $f0396edd0a5c99f7$export$331ff980f0d45cff(id, margin) {
    let div = document.createElement("div");
    if (id != undefined) div.id = id;
    if (margin != undefined) Object.assign(div.style, margin);
    return div;
}
function $f0396edd0a5c99f7$export$78253536c0178a32(id, margin) {
    let div = $f0396edd0a5c99f7$export$331ff980f0d45cff(id, margin);
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
        let stringValue = this.value.toString().trim();
        let c;
        if (this.value < 0) c = 7;
        else c = 6;
        if (stringValue.length > c) stringValue = this.value.toExponential().trim();
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(stringValue, this.tagName, this.attributes, padding, false);
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
            let i = 0;
            this.nodes.forEach((v)=>{
                if (v == undefined) console.warn("Node " + i.toString() + " is undefined this.nodes.size = " + this.nodes.size);
                else {
                    if (v instanceof $cc8c7201a9bad777$export$bd431b64ad3b0433) s += v.toXML(pad, padding1);
                    else if (v instanceof $cc8c7201a9bad777$export$ca4ceee82ec565dc) s += v.toXML(padding1);
                    else s += v.toXML(padding1);
                }
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



class $eb0e80bd8405358c$export$d0e9917d83c120a0 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
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
     * @param tagName The tag name.
     * @param value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName, value);
    }
    /**
     * @param value The value of the Range.
     */ setValue(value) {
        this.value = value;
    }
    /**
     * @returns The units of the Range.
     */ getUnits() {
        return this.attributes.get($eb0e80bd8405358c$export$d0e9917d83c120a0.s_units);
    }
    /**
     * @param units The units of the Range.
     */ setUnits(units) {
        this.attributes.set($eb0e80bd8405358c$export$d0e9917d83c120a0.s_units, units);
    }
    /**
     * Remove the units attribute.
     */ removeUnits() {
        this.attributes.delete($eb0e80bd8405358c$export$d0e9917d83c120a0.s_units);
    }
    /**
     * @returns The lower of the Range.
     */ getLower() {
        let lower = this.attributes.get($eb0e80bd8405358c$export$d0e9917d83c120a0.s_lower);
        if (lower != undefined) return parseFloat(lower);
    }
    /**
     * @param lower The lower of the Range.
     */ setLower(lower) {
        this.attributes.set($eb0e80bd8405358c$export$d0e9917d83c120a0.s_lower, lower.toString());
    }
    /**
     * Remove the lower attribute.
     */ removeLower() {
        this.attributes.delete($eb0e80bd8405358c$export$d0e9917d83c120a0.s_lower);
    }
    /**
     * @returns The upper of the Range.
     */ getUpper() {
        let upper = this.attributes.get($eb0e80bd8405358c$export$d0e9917d83c120a0.s_upper);
        if (upper != undefined) return parseFloat(upper);
    }
    /**
     * @param upper The upper of the Range.
     */ setUpper(upper) {
        this.attributes.set($eb0e80bd8405358c$export$d0e9917d83c120a0.s_upper, upper.toString());
    }
    /**
     * Remove the upper attribute.
     */ removeUpper() {
        this.attributes.delete($eb0e80bd8405358c$export$d0e9917d83c120a0.s_upper);
    }
    /**
     * @returns The stepsize of the Range.
     */ getStepsize() {
        let stepsize = this.attributes.get($eb0e80bd8405358c$export$d0e9917d83c120a0.s_stepsize);
        if (stepsize != undefined) return parseFloat(stepsize);
    }
    /**
     * @param stepsize The stepsize of the Range.
     */ setStepsize(stepsize) {
        this.attributes.set($eb0e80bd8405358c$export$d0e9917d83c120a0.s_stepsize, stepsize.toString());
    }
    /**
     * Remove the stepsize attribute.
     */ removeStepsize() {
        this.attributes.delete($eb0e80bd8405358c$export$d0e9917d83c120a0.s_stepsize);
    }
}




class $ef5b9341e5193b70$export$80986e6afdd7e0cb extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "atom";
    }
    static{
        /**
     * The atoms with 1 to 118 protons inclusive. (source: https://query.wikidata.org/#SELECT%20%3Felement%20%3Fsymbol%20%20%3Fprotons%0AWHERE%0A%7B%0A%20%20%3Felement%20wdt%3AP31%20wd%3AQ11344%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP1086%20%3Fprotons%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP246%20%3Fsymbol%20.%0A%7D%0A%0AORDER%20BY%20%3Fprotons)
     */ this.elementTypes = [
            "H",
            "He",
            "Li",
            "Be",
            "B",
            "C",
            "N",
            "O",
            "F",
            "Ne",
            "Na",
            "Mg",
            "Al",
            "Si",
            "P",
            "S",
            "Cl",
            "Ar",
            "K",
            "Ca",
            "Sc",
            "Ti",
            "V",
            "Cr",
            "Mn",
            "Fe",
            "Co",
            "Ni",
            "Cu",
            "Zn",
            "Ga",
            "Ge",
            "As",
            "Se",
            "Br",
            "Kr",
            "Rb",
            "Sr",
            "Y",
            "Zr",
            "Nb",
            "Mo",
            "Tc",
            "Ru",
            "Rh",
            "Pd",
            "Ag",
            "Cd",
            "In",
            "Sn",
            "Sb",
            "Te",
            "I",
            "Xe",
            "Cs",
            "Ba",
            "La",
            "Ce",
            "Pr",
            "Nd",
            "Pm",
            "Sm",
            "Eu",
            "Gd",
            "Tb",
            "Dy",
            "Ho",
            "Er",
            "Tm",
            "Yb",
            "Lu",
            "Hf",
            "Ta",
            "W",
            "Re",
            "Os",
            "Ir",
            "Pt",
            "Au",
            "Hg",
            "Tl",
            "Pb",
            "Bi",
            "Po",
            "At",
            "Rn",
            "Fr",
            "Ra",
            "Ac",
            "Th",
            "Pa",
            "U",
            "Np",
            "Pu",
            "Am",
            "Cm",
            "Bk",
            "Cf",
            "Es",
            "Fm",
            "Md",
            "No",
            "Lr",
            "Rf",
            "Db",
            "Sg",
            "Bh",
            "Hs",
            "Mt",
            "Ds",
            "Rg",
            "Cn",
            "Nh",
            "Fl",
            "Mc",
            "Lv",
            "Ts",
            "Og"
        ];
    }
    static{
        /**
     * The key for the id attribute.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the elementType attribute.
     */ this.s_elementType = "elementType";
    }
    static{
        /**
     * The key for the x3 attribute.
     */ this.s_x3 = "x3";
    }
    static{
        /**
     * The key for the y3 attribute.
     */ this.s_y3 = "y3";
    }
    static{
        /**
     * The key for the z3 attribute.
     */ this.s_z3 = "z3";
    }
    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     */ constructor(attributes){
        super(attributes, $ef5b9341e5193b70$export$80986e6afdd7e0cb.tagName);
    }
    /**
     * @returns True if the atom has coordinates.
     */ hasCoordinates() {
        if (this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_x3) != undefined && this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_y3) != undefined && this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_z3) != undefined) return true;
        return false;
    }
    /**
     * @returns The id.
     */ getId() {
        return this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_id);
    }
    /**
     * @param id The id.
     */ setId(id) {
        this.attributes.set($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_id, id);
    }
    /**
     * @returns The element type.
     */ getElementType() {
        return this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_elementType);
    }
    /**
     * @param elementType The element type.
     */ setElementType(elementType) {
        this.attributes.set($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_elementType, elementType);
    }
    /**
     * @returns The x3 attribute value as a number or undefined.
     */ getX3() {
        let x3 = this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_x3);
        if (x3 != undefined) return parseFloat(x3);
    }
    /**
     * @param x3 The x3 attribute value.
     */ setX3(x3) {
        this.attributes.set($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_x3, x3.toString());
    }
    /**
     * Removes the x3 attribute.
     */ removeX3() {
        this.attributes.delete($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_x3);
    }
    /**
     * @returns The y3 attribute value as a number or undefined.
     */ getY3() {
        let y3 = this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_y3);
        if (y3 != undefined) return parseFloat(y3);
    }
    /**
     * @param y3 The y3 attribute value.
     */ setY3(y3) {
        this.attributes.set($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_y3, y3.toString());
    }
    /**
     * Removes the y3 attribute.
     */ removeY3() {
        this.attributes.delete($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_y3);
    }
    /**
     * @returns The z3 attribute value as a number or undefined.
     */ getZ3() {
        let z3 = this.attributes.get($ef5b9341e5193b70$export$80986e6afdd7e0cb.s_z3);
        if (z3 != undefined) return parseFloat(z3);
    }
    /**
     * @param z3 The z3 attribute value.
     */ setZ3(z3) {
        this.attributes.set("z3", z3.toString());
    }
    /**
     * Removes the x3 attribute.
     */ removeZ3() {
        this.attributes.delete("z3");
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
        this.index = new Map();
        this.reverseIndex = new Map();
        if (atoms == undefined) this.atoms = new Map();
        else {
            this.atoms = atoms;
            atoms.forEach((atom, id)=>{
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, atom);
            });
        }
    }
    /**
     * @param id The id of the atom to get.
     * @returns The atom with the given id.
     */ getAtom(id) {
        return this.atoms.get(id);
    }
    /**
     * @param atom The atom to add.
     * @returns The id of the atom.
     */ addAtom(atom) {
        //console.log('Adding atom...');
        let id = atom.getId();
        if (id == undefined) {
            id = this.getNextAtomID();
            atom.setId(id);
        } else if (this.atoms.has(id)) {
            let newID = this.getNextAtomID();
            console.warn("Atom with id " + id + " already exists, adding with id " + newID);
            atom.setId(newID);
            id = newID;
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
        */ return id;
    }
    /**
     * @returns The atomId.
     */ getNextAtomID() {
        let i = 1;
        let id = "a" + i.toString();
        if (this.atoms.has(id)) while(this.atoms.has(id)){
            i++;
            id = "a" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeAtom(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error("Atom with id " + id + " does not exist!");
        console.log("Removing atom with id " + id);
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
        */ }
    /**
     * @param i The index of the atom to remove.
     * @param id The id of the atom to remove.
     */ deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key)=>{
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            } else {
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
    static{
        /**
     * The order options.
     */ this.orderOptions = [
            "1",
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5",
            "5.5",
            "6"
        ];
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
     * @returns The id.
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
     * @param bonds The bonds.
     */ constructor(attributes, bonds){
        super(attributes, $ef5b9341e5193b70$export$746fba2e30d93fe6.tagName);
        this.index = new Map();
        this.reverseIndex = new Map();
        if (bonds == undefined) this.bonds = new Map();
        else {
            this.bonds = bonds;
            bonds.forEach((bond, id)=>{
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, bond);
            });
        }
    }
    /**
     * @returns The bond ids.
     */ getBondIds() {
        return Array.from(this.bonds.keys());
    }
    /**
     * @param id The id of the bond to get.
     * @returns The bond with the given id.
     */ getBond(id) {
        return this.bonds.get(id);
    }
    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     */ addBond(bond) {
        //console.log('Add ' + bond.tagName + '...');
        let id = bond.getId();
        if (id == undefined) {
            id = this.getNextBondID();
            bond.setId(id);
        } else if (this.bonds.has(id)) {
            let newID = this.getNextBondID();
            console.log("Bond with id " + id + " already exists, adding with id " + newID);
            bond.setId(newID);
            id = newID;
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
        */ return id;
    }
    /**
     * @returns The atomId.
     */ getNextBondID() {
        let i = 1;
        let id = "b" + i.toString();
        while(this.bonds.has(id)){
            i++;
            id = "b" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeBond(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error("Bond with id " + id + " does not exist!");
        console.log("Removing bond with id " + id);
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
        */ }
    /**
     * @param i The index of the bond to remove.
     * @param id The id of the bond to remove.
     */ deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key)=>{
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            } else {
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
class $ef5b9341e5193b70$export$a5a2be813176eb0e extends (0, $cc8c7201a9bad777$export$38d8ebe2767f8865) {
    static{
        /**
     * The tag name.
     */ this.tagName = "matrix";
    }
    static{
        /**
     * The key for the rows attribute.
     */ this.s_rows = "rows";
    }
    static{
        /**
     * The key for the matrixType attribute.
     */ this.s_matrixType = "matrixType";
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
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
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
     * The units.
     */ this.unitOptions = [
            "cm-1",
            "GHz",
            "amuA^2"
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
class $ef5b9341e5193b70$export$16fc56ab40b12b45 extends (0, $eb0e80bd8405358c$export$d0e9917d83c120a0) {
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
}
class $ef5b9341e5193b70$export$1aede585378507cb extends $ef5b9341e5193b70$export$16fc56ab40b12b45 {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown2";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $ef5b9341e5193b70$export$f8ecc5f7f62d6fbf extends (0, $eb0e80bd8405358c$export$d0e9917d83c120a0) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDownTExponent";
    }
    static{
        /**
     * The referenceTemperature attribute key.
     */ this.s_referenceTemperature = "referenceTemperature";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ef5b9341e5193b70$export$f8ecc5f7f62d6fbf.tagName, value);
    }
    /**
     * @returns The referenceTemperature.
     */ getReferenceTemperature() {
        return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, $ef5b9341e5193b70$export$f8ecc5f7f62d6fbf.s_referenceTemperature));
    }
    /**
     * @param referenceTemperature The referenceTemperature.
     */ setReferenceTemperature(referenceTemperature) {
        this.attributes.set($ef5b9341e5193b70$export$f8ecc5f7f62d6fbf.s_referenceTemperature, referenceTemperature.toString());
    }
}
class $ef5b9341e5193b70$export$fbea747a02da7eb8 extends (0, $eb0e80bd8405358c$export$d0e9917d83c120a0) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDownLinEne";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $ef5b9341e5193b70$export$fbea747a02da7eb8.tagName, value);
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
     * The options for the "xsi:type" or "name" attribute value.
     */ this.xsi_typeOptions = [
            "ClassicalRotors",
            "QMRotors",
            "me:ClassicalRotors",
            "me:QMRotors"
        ];
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
     */ this.formats = new Set([
            "numerical",
            "analytical"
        ]);
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
        if (useSineTerms == undefined) this.useSineTerms = false;
        else this.useSineTerms = true;
    //this.useSineTerms = (useSineTerms == "yes");
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
     * Should be one of Mesmer.energyUnits.
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
     * @param attributes The attributes. This will also include an "id".
     * Additional attributes may include: "description" and "active" (and possibly others), but these do not exist for all molecules.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethod The extra method for calculating density of states.
     * @param reservoirSize The reservoir size.
     */ constructor(attributes, id, //atoms?: Atom | AtomArray,
    atoms, //bonds?: Bond | BondArray,
    bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize){
        super(attributes, $ef5b9341e5193b70$export$3da9759ad07746a3.tagName);
        this.index = new Map();
        this.id = id;
        let i = 0;
        // Atoms
        if (!atoms) atoms = new $ef5b9341e5193b70$export$9cea715eceba39a0(new Map());
        this.nodes.set(i, atoms);
        this.index.set($ef5b9341e5193b70$export$9cea715eceba39a0.tagName, i);
        i++;
        // Bonds
        if (!bonds) bonds = new $ef5b9341e5193b70$export$746fba2e30d93fe6(new Map());
        this.nodes.set(i, bonds);
        this.index.set($ef5b9341e5193b70$export$746fba2e30d93fe6.tagName, i);
        i++;
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
     * Get the description or the id of the molecule.
     * @returns The description of the molecule, or the id if it is not set.
     */ getDescription() {
        let description = this.attributes.get($ef5b9341e5193b70$export$3da9759ad07746a3.s_description);
        if (description != undefined) return description;
        return this.id;
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
     * @param atomId The id of the atom.
     * @returns The atom for the given atomId.
     */ getAtom(atomId) {
        return this.getAtoms().getAtom(atomId);
    }
    /**
     * @returns The atoms of the molecule.
     */ getAtoms() {
        let i = this.index.get($ef5b9341e5193b70$export$9cea715eceba39a0.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param atoms The atoms.
     */ setAtoms(atoms) {
        this.index.set($ef5b9341e5193b70$export$9cea715eceba39a0.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, atoms);
    }
    /**
     * @param bondId The id of the bond.
     * @returns The bond for the given bondId.
     */ getBond(bondId) {
        return this.getBonds().getBond(bondId);
    }
    /**
     * @returns The bonds of the molecule.
     */ getBonds() {
        let i = this.index.get($ef5b9341e5193b70$export$746fba2e30d93fe6.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param bonds The bonds.
     */ setBonds(bonds) {
        this.index.set($ef5b9341e5193b70$export$746fba2e30d93fe6.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, bonds);
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
    static{
        /**
     * The role options.
     */ this.roleOptions = [
            "deficientReactant",
            "excessReactant",
            "modelled"
        ];
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
    static{
        /**
     * The role options.
     */ this.roleOptions = [
            "modelled",
            "sink"
        ];
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
     * The options.
     */ this.options = [
            "Eckart",
            "WKB"
        ];
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
class $ae74a7b44a6504a1$export$cdeafdd1d936ed5b extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentalRate";
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
        super(attributes, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName, value);
        if (!this.attributes.has($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_ref1)) console.error("ExperimentalRate.constructor: ref1 attribute is missing.");
        if (!this.attributes.has($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_ref2)) console.error("ExperimentalRate.constructor: ref2 attribute is missing.");
        if (!this.attributes.has($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_refReaction)) console.error("ExperimentalRate.constructor: refReaction attribute is missing.");
        if (!this.attributes.has($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_error)) console.error("ExperimentalRate.constructor: error attribute is missing.");
    }
    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */ getRef1() {
        return this.attributes.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_ref1);
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */ setRef1(ref1) {
        this.attributes.set($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_ref1, ref1);
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */ getRef2() {
        return this.attributes.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_ref2);
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */ setRef2(ref2) {
        this.attributes.set($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_ref2, ref2);
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */ getRefReaction() {
        return this.attributes.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_refReaction);
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */ setRefReaction(refReaction) {
        this.attributes.set($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_refReaction, refReaction);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        return parseFloat(this.attributes.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.s_error, error.toString());
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
        return parseFloat(this.attributes.get($ae74a7b44a6504a1$export$c291f4faacd745a6.s_error));
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
        return parseFloat(this.attributes.get($ae74a7b44a6504a1$export$c291f4faacd745a6.s_yieldTime));
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
        if (!this.attributes.has($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_EigenvalueID)) console.error("ExperimentalEigenvalue.constructor: EigenvalueID attribute is missing.");
        if (!this.attributes.has($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_error)) console.error("ExperimentalEigenvalue.constructor: error attribute is missing.");
    }
    /**
     * @returns The EigenvalueID attribute.
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
        return parseFloat(this.attributes.get($ae74a7b44a6504a1$export$ed9dfbc127680fd1.s_error));
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
     */ constructor(attributes, bathGas, experimentRate, experimentalYield, experimentalEigenvalue){
        super(attributes, $ae74a7b44a6504a1$export$3fe97ecb6b172244.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set($ae74a7b44a6504a1$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (experimentalYield != undefined) {
            this.index.set($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
        if (experimentalEigenvalue != undefined) {
            this.index.set($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        //if (this !== undefined) {
        let p = this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_P);
        if (p !== undefined) return parseFloat(p);
        //}
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
        //if (this !== undefined) {
        let t = this.attributes.get($ae74a7b44a6504a1$export$3fe97ecb6b172244.s_T);
        if (t !== undefined) return parseFloat(t);
        //}
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
     */ getExperimentalRate() {
        let i = this.index.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentalRate(experimentRate) {
        let i = this.index.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName);
        if (i != undefined) this.nodes.set(i, experimentRate);
        else {
            this.index.set($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * Remove the experiment rate.
     */ removeExperimentalRate() {
        let i = this.index.get($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($ae74a7b44a6504a1$export$cdeafdd1d936ed5b.tagName);
        }
    }
    /**
     * @returns The experimental yield.
     */ getExperimentalYield() {
        let i = this.index.get($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentalYield The experimental yield.
     */ setExperimentalYield(experimentalYield) {
        let i = this.index.get($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName);
        if (i != undefined) this.nodes.set(i, experimentalYield);
        else {
            this.index.set($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
    }
    /**
     * Remove the experimental yield.
     */ removeExperimentalYield() {
        let i = this.index.get($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($ae74a7b44a6504a1$export$c291f4faacd745a6.tagName);
        }
    }
    /**
     * @returns The experimental eigenvalue.
     */ getExperimentalEigenvalue() {
        let i = this.index.get($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentalEigenvalue The experimental eigenvalue.
     */ setExperimentalEigenvalue(experimentalEigenvalue) {
        let i = this.index.get($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName);
        if (i != undefined) this.nodes.set(i, experimentalEigenvalue);
        else {
            this.index.set($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * Remove the experimental eigenvalue.
     */ removeExperimentalEigenvalue() {
        let i = this.index.get($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($ae74a7b44a6504a1$export$ed9dfbc127680fd1.tagName);
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
     * Remove the PT at the given index.
     * @param i The index.
     */ removePTpair(i) {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
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
     * Remove all PT pairs.
     */ removePTpairs() {
        this.nodes.clear();
        this.pTpairs = [];
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
     */ constructor(attributes, id, bathGases, pTs){
        super(attributes, $ae74a7b44a6504a1$export$363c7374d425f4ad.tagName);
        this.id = id;
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
    static{
        /**
     * The options.
     */ this.options = [
            "cantera",
            "chemkin"
        ];
    }
    static{
        /**
     * The rateUnits.
     */ this.rateUnits = "rateUnits";
    }
    static{
        /**
     * The rateUnits options.
     */ this.rateUnitsOptions = [
            "cm3mole-1s-1",
            "cm3molecule-1s-1"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$93514d28bd18d75a.tagName, value);
    }
    /**
     * @returns The value of the "rateUnits" attribute or undefined.
     */ getRateUnits() {
        return this.attributes.get($b6873406fb778c0b$export$93514d28bd18d75a.rateUnits);
    }
    /**
     * @param rateUnits The value of the "rateUnits" attribute.
     */ setRateUnits(rateUnits) {
        this.attributes.set($b6873406fb778c0b$export$93514d28bd18d75a.rateUnits, rateUnits);
    }
    /**
     * Remove the "rateUnits" attribute.
     */ removeRateUnits() {
        this.attributes.delete($b6873406fb778c0b$export$93514d28bd18d75a.rateUnits);
    }
}
class $b6873406fb778c0b$export$be201676156f3e60 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:precision";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $b6873406fb778c0b$export$be201676156f3e60.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$19d20f3642d82681.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$906be0805438fd80.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$6ab4fe1621c91452.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$e9853d49316ae9ae.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$39eacc768d7e9bb.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$78194e57ce26d99a.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$96094ac7e31a750e.tagName, value);
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
        super(attributes, $b6873406fb778c0b$export$ae695595d3952700.tagName, value);
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
    static{
        /**
     * The options.
     */ this.options = [
            "AdditiveControl",
            "RatioControl"
        ];
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
     */ constructor(attributes, id){
        super(attributes, $b6873406fb778c0b$export$7a7fa4424cb20976.tagName);
        this.id = id;
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
        let i = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstants(testRateConstant) {
        let i = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set($b6873406fb778c0b$export$980e5abe9a459423.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstants() {
        let i = this.index.get($b6873406fb778c0b$export$980e5abe9a459423.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($b6873406fb778c0b$export$980e5abe9a459423.tagName);
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
     * @param maximumEvolutionTime The MaximumEvolutionTime.
     */ setMaximumEvolutionTime(maximumEvolutionTime) {
        let i = this.index.get($b6873406fb778c0b$export$b51d7314540831ed.tagName);
        if (i != undefined) this.nodes.set(i, maximumEvolutionTime);
        else {
            this.index.set($b6873406fb778c0b$export$b51d7314540831ed.tagName, this.nodes.size);
            this.addNode(maximumEvolutionTime);
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
class $8677001474399221$export$3139ebae3f570365 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "conditionsList";
    }
    /**
     * @param attributes The attributes.
     * @param conditionss The conditions.
     */ constructor(attributes, conditionss){
        super(attributes, $8677001474399221$export$2be1c851e287a6b1.tagName);
        this.index = new Map();
        if (conditionss != undefined) conditionss.forEach((conditions)=>{
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the control.
     * @returns The conditions.
     */ getConditions(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */ removeConditions(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a conditions.
     * @param conditions The conditions.
     */ addConditions(conditions) {
        let index = this.index.get(conditions.id);
        if (index != undefined) {
            this.nodes.set(index, conditions);
            console.log("Replaced conditions with id " + conditions.id);
        } else {
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        }
    }
}
class $8677001474399221$export$2be1c851e287a6b1 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "controlList";
    }
    /**
     * @param attributes The attributes.
     * @param controls The controls.
     */ constructor(attributes, controls){
        super(attributes, $8677001474399221$export$2be1c851e287a6b1.tagName);
        this.index = new Map();
        if (controls != undefined) controls.forEach((control)=>{
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the control.
     * @returns The control.
     */ getControl(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */ removeControl(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a control.
     * @param control The control.
     */ addControl(control) {
        let index = this.index.get(control.id);
        if (index !== undefined) {
            this.nodes.set(index, control);
            console.log("Replaced control with id " + control.id);
        } else {
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        }
    }
}
class $8677001474399221$export$692079bb871c6039 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        this.tagName = "me:mesmer";
    }
    static{
        /**
     * Precision options.
     */ this.precisionOptions = [
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
     * Pressure units.
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
     * Energy units.
     */ this.energyUnits = [
            "kJ/mol",
            "cm-1",
            "wavenumber",
            "kcal/mol",
            "Hartree",
            "au"
        ];
    }
    static{
        /**
     * Frequency units.
     */ this.frequencyUnits = [
            "cm-1",
            "GHz",
            "amuA^2"
        ];
    }
    static{
        /**
     * Atomic mass map for atoms. The keys are element symbols, the values are the atomic mass according to a periodic table.
     * (This is initialised in the constructor.)
     */ this.atomMasses = new Map();
    }
    static{
        /**
     * Atomic radius map for atoms. The keys are element symbols, the values are the atomic radii according to a periodic table.
     * (This is initialised in the constructor.)
     */ this.atomRadii = new Map();
    }
    static{
        /**
     * Colour map for atoms. The keys are element symbols, the values are the colours the element is assigned.
     * (This is initialised in the constructor.)
     */ this.atomColors = new Map();
    }
    static{
        /**
     * Colour map for bonds. The keys are bond order, the values are the colours the bond order is assigned.
     * (This is initialised in the constructor.)
     */ this.bondColors = new Map();
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
     * @param controls The controls.
     */ constructor(attributes, title, moleculeList, reactionList, conditionss, modelParameters, controls){
        super(attributes, $8677001474399221$export$692079bb871c6039.tagName);
        let elements = [
            "H",
            "O",
            "C",
            "N",
            "Cl",
            "S",
            "Ph",
            "Fe"
        ];
        let colors = [
            "White",
            "Red",
            "DarkGrey",
            "Blue",
            "Green",
            "Yellow",
            "Orange",
            "Brown"
        ];
        for(let i = 0; i < elements.length; i++)$8677001474399221$export$692079bb871c6039.atomColors.set(elements[i], colors[i]);
        // Atomic mass units (amu)
        let masses = [
            1.00784,
            15.999,
            12.011,
            14.007,
            35.453,
            32.06,
            77.845,
            55.845
        ]; // Atomic masses (see https://en.wikipedia.org/wiki/Periodic_table).
        for(let i = 0; i < elements.length; i++)$8677001474399221$export$692079bb871c6039.atomMasses.set(elements[i], masses[i]);
        // Picometers (pm),
        let radii = [
            37,
            66,
            67,
            56,
            99,
            102,
            110,
            124
        ]; // Calculated radii between two atoms of the same type in a molecule (https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)).
        for(let i = 0; i < elements.length; i++)$8677001474399221$export$692079bb871c6039.atomRadii.set(elements[i], radii[i]);
        let bondOrders = [
            1,
            1.5,
            2,
            2.5,
            3,
            3.5,
            4,
            4.5,
            5,
            5.5,
            6
        ];
        colors = [
            "Black",
            "Red",
            "DarkRed",
            "Blue",
            "DarkBlue",
            "Green",
            "DarkGreen",
            "Yellow",
            "DarkYellow",
            "Orange",
            "DarkOrange"
        ];
        for(let i = 0; i < bondOrders.length; i++)$8677001474399221$export$692079bb871c6039.bondColors.set(bondOrders[i], colors[i]);
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
        this.conditionsIndex = new Map();
        if (conditionss != undefined) conditionss.forEach((conditions)=>{
            this.index.set((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName + conditions.id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        });
        if (modelParameters != undefined) {
            this.index.set((0, $8883b31bd809eb64$export$77f098867dc64198).tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
        this.controlIndex = new Map();
        if (controls != undefined) controls.forEach((control)=>{
            this.index.set((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + control.id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        });
    }
    /**
     * @returns The title.
     */ getTitle() {
        let i = this.index.get($8677001474399221$export$f99233281efd08a0.tagName);
        if (i != undefined) return this.nodes.get(i);
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
        if (i != undefined) return this.nodes.get(i);
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
        if (i != undefined) return this.nodes.get(i);
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
     * Add a Conditions.
     * @param conditions The Conditions.
     */ addConditions(conditions) {
        let id = (0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName + conditions.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, conditions);
        else {
            this.index.set(id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        }
    }
    /**
     * @param conditionsID The id of the conditions.
     * @returns The conditions for the conditionsID.
     */ getConditions(conditionsID) {
        let i = this.conditionsIndex.get(conditionsID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The next control id.
     */ getNextConditionsID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.conditionsIndex.keys()).sort((a, b)=>a - b);
        console.log("sortedKeys " + (0, $134d19e749bf0414$export$4323cc4280d5be7)(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a conditions.
     * @param conditionsID The id of the conditions to remove.
     */ removeConditions(conditionsID) {
        let i = this.conditionsIndex.get(conditionsID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName + conditionsID);
            this.conditionsIndex.delete(conditionsID);
        }
    }
    /**
     * @returns The model parameters.
     */ getModelParameters() {
        let i = this.index.get((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
        if (i != undefined) return this.nodes.get(i);
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
     * Add a Control.
     * @param control The Control.
     */ addControl(control) {
        let id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + control.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, control);
        else {
            this.index.set(id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        }
    }
    /**
     * @returns The control.
     */ getControl(controlID) {
        let i = this.controlIndex.get(controlID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The next control id.
     */ getNextControlID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.controlIndex.keys()).sort((a, b)=>a - b);
        console.log("sortedKeys " + (0, $134d19e749bf0414$export$4323cc4280d5be7)(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a control.
     * @param controlID The id of the control to remove.
     */ removeControl(controlID) {
        let i = this.controlIndex.get(controlID);
        console.log("removeControl " + controlID + " " + i);
        console.log("controlIndex " + (0, $134d19e749bf0414$export$4323cc4280d5be7)(Array.from(this.controlIndex.keys())));
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + controlID);
            this.controlIndex.delete(controlID);
        }
    }
}


//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library
/**
 * MXG.
 */ let $7e68913db756e51f$var$mxg_url = "https://github.com/agdturner/mxg-pwa";
let $7e68913db756e51f$var$mxg_a = document.createElement("a");
$7e68913db756e51f$var$mxg_a.href = $7e68913db756e51f$var$mxg_url;
$7e68913db756e51f$var$mxg_a.textContent = $7e68913db756e51f$var$mxg_url;
/**
 * Example data.
 */ let $7e68913db756e51f$var$mxgDataExamples_url = "https://github.com/agdturner/mxg-pwa/tree/main/data/examples";
let $7e68913db756e51f$var$mxgDataExamples_a = document.createElement("a");
$7e68913db756e51f$var$mxgDataExamples_a.href = $7e68913db756e51f$var$mxgDataExamples_url;
$7e68913db756e51f$var$mxgDataExamples_a.textContent = $7e68913db756e51f$var$mxgDataExamples_url;
/**
 * MESMER.
 */ let $7e68913db756e51f$var$mesmer_url = "https://sourceforge.net/projects/mesmer/";
let $7e68913db756e51f$var$memser_a = document.createElement("a");
$7e68913db756e51f$var$memser_a.href = $7e68913db756e51f$var$mesmer_url;
$7e68913db756e51f$var$memser_a.textContent = $7e68913db756e51f$var$mesmer_url;
/**
 * 3DMol.
 */ let $7e68913db756e51f$var$t3Dmol_url = "https://github.com/3dmol/3Dmol.js";
let $7e68913db756e51f$var$t3Dmol_a = document.createElement("a");
$7e68913db756e51f$var$t3Dmol_a.href = $7e68913db756e51f$var$t3Dmol_url;
$7e68913db756e51f$var$t3Dmol_a.textContent = $7e68913db756e51f$var$t3Dmol_url;
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
 */ let $7e68913db756e51f$var$addSymbol = "\uFF0B";
let $7e68913db756e51f$var$addString = "add " + $7e68913db756e51f$var$addSymbol;
let $7e68913db756e51f$var$removeSymbol = "\u2715";
let $7e68913db756e51f$var$removeString = "remove " + $7e68913db756e51f$var$removeSymbol;
let $7e68913db756e51f$var$refreshSymbol = "\u27F3";
let $7e68913db756e51f$var$refreshString = "refresh " + $7e68913db756e51f$var$refreshSymbol;
let $7e68913db756e51f$var$s_Add_from_spreadsheet = "Add " + $7e68913db756e51f$var$addSymbol + " from spreadsheet";
// Selected and deselected symbology.
let $7e68913db756e51f$var$selected = " \u2713";
let $7e68913db756e51f$var$deselected = " \u2717";
let $7e68913db756e51f$var$selectOption = "Select an option (use keys to cycle through options)...";
// HTML IDs
let $7e68913db756e51f$var$menuDivId = "menu";
let $7e68913db756e51f$var$titleDivId = "title";
let $7e68913db756e51f$var$moleculesDivId = "molecules";
let $7e68913db756e51f$var$reactionsDivId = "reactions";
let $7e68913db756e51f$var$conditionsDivId = "conditions";
let $7e68913db756e51f$var$modelParametersDivId = "modelParameters";
let $7e68913db756e51f$var$controlDivId = "control";
let $7e68913db756e51f$var$xmlDivId = "xml";
// Strings for the GUI.
let $7e68913db756e51f$var$s_Input = "Input";
let $7e68913db756e51f$var$s_optionOn = "optionOn";
let $7e68913db756e51f$var$s_optionOff = "optionOff";
// For dark/light mode.
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
 */ let $7e68913db756e51f$var$molecules;
/**
 * For storing the maximum molecule energy in a reaction.
 */ let $7e68913db756e51f$var$maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */ let $7e68913db756e51f$var$minMoleculeEnergy = Infinity;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let $7e68913db756e51f$var$reactions;
/**
 * The Mesmer ids.
 */ let $7e68913db756e51f$var$ids = new Set();
/**
 * Add an id to the set of ids.
 * @param parts The parts of the id.
 */ function $7e68913db756e51f$var$addID(...parts) {
    let validID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(...parts);
    if ($7e68913db756e51f$var$ids.has(validID)) throw new Error(validID + " already exists!");
    $7e68913db756e51f$var$ids.add(validID);
    return validID;
}
// IDs for the reactions diagram.
let $7e68913db756e51f$var$rdDivId = $7e68913db756e51f$var$addID("reactionsDiagram");
let $7e68913db756e51f$var$rdCanvasId = $7e68913db756e51f$var$addID("reactionsDiagramCanvas");
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
    let menuDiv = document.getElementById($7e68913db756e51f$var$menuDivId);
    menuDiv.style.display = "flex";
    menuDiv.style.justifyContent = "center";
    menuDiv.style.margin = "5px";
    menuDiv.style.padding = "5px";
    menuDiv.style.border = "1px solid black";
    menuDiv.style.backgroundColor = "lightgrey";
    // Create Load button.
    let s_Load = "Load";
    let loadButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Load, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(s_Load), $7e68913db756e51f$var$boundary1);
    loadButton.addEventListener("click", (event)=>{
        $7e68913db756e51f$var$load();
        loadButton.textContent = s_Load;
    });
    menuDiv.appendChild(loadButton);
    // Create style/theme option buttons.
    // Create button to increase the font size.
    let s_Increase_fontsize = "Increase fontsize";
    let increaseFontSizeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Increase_fontsize, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(s_Increase_fontsize), $7e68913db756e51f$var$boundary1);
    increaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize + 1 + "px";
        if ($7e68913db756e51f$var$popWindow != null) //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
        $7e68913db756e51f$var$popWindow.document.body.style.fontSize = fontSize + 1 + "px";
        $7e68913db756e51f$var$redrawReactionsDiagram();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let s_Decrease_fontsize = "Decrease fontsize";
    let decreaseFontSizeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Decrease_fontsize, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(s_Decrease_fontsize), $7e68913db756e51f$var$boundary1);
    decreaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize - 1 + "px";
        if ($7e68913db756e51f$var$popWindow != null) //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
        $7e68913db756e51f$var$popWindow.document.body.style.fontSize = fontSize - 1 + "px";
        $7e68913db756e51f$var$redrawReactionsDiagram();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Create a light/dark mode button.
    let s_Light_Dark_Mode = "Light/Dark Mode";
    let lightDarkModeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Light_Dark_Mode, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(s_Light_Dark_Mode), $7e68913db756e51f$var$boundary1);
    lightDarkModeButton.addEventListener("click", ()=>{
        $7e68913db756e51f$var$dark = !$7e68913db756e51f$var$dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if ($7e68913db756e51f$var$dark) document.body.className = "dark-mode";
        else document.body.className = "light-mode";
        $7e68913db756e51f$var$redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    // Create Save button.
    let s_Save = "Save";
    let saveButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Save, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(s_Save), $7e68913db756e51f$var$boundary1);
    saveButton.addEventListener("click", $7e68913db756e51f$var$saveXML);
    menuDiv.appendChild(saveButton);
    let welcomeDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)((0, $134d19e749bf0414$export$3205c97bcf96f7dc)("Welcome"), $7e68913db756e51f$var$boundary1);
    // Create text for welcome.
    let p1 = document.createElement("p");
    welcomeDiv.appendChild(p1);
    p1.textContent = "Welcome to MXG - a Graphical User Interface (GUI) program to assist MEMSER users in creating, editing         and visualising MESMER data. MESMER is the Master Equation Solver for Multi Energy-well Reactions, details can be found         at: ";
    p1.appendChild($7e68913db756e51f$var$memser_a);
    p1.style.alignContent = "center";
    let p2 = document.createElement("p");
    welcomeDiv.appendChild(p2);
    p2.textContent = "MXG development is funded by the UK Engineering and Physical Sciences Research Council (EPSRC) from January     to April 2024.";
    let p3 = document.createElement("p");
    welcomeDiv.appendChild(p3);
    p3.textContent = "The menu Load button is to be used to select a MESMER file to load (the file loaded will not be modified).         MXG reads the file and presents the data it contains so that the user can make changes and use the Save button to generate         a new MESMER file. The saved file should have the same content as was loaded except it will contain no comments or blank         lines, values will be trimmed of white space, and some numbers may be output in a standard scientific notation if they were         not already. The saved file will also reflect any changes specified using the GUI.";
    let p4 = document.createElement("p");
    welcomeDiv.appendChild(p4);
    p4.textContent = "Between the Load and Save buttons are buttons to increase or decrease the font size. In addition to changing the         text size of any text components, this will also redraw the reaction diagram so that the text rendered onto the canvas reflects         this change. It is planned to have themes selectable to provide a dark mode rendering and to support users that struggle to         distinguish between certain colours.";
    let p5 = document.createElement("p");
    p5.textContent += "The development is in an alpha release phase and is not recommended for general use. A community release that         is to be supported by the MESMER community is scheduled for the end of April 2024. MXG is free and open source software based on         free and open source software. The main development GitHub repository is: ";
    p5.appendChild($7e68913db756e51f$var$mxg_a);
    welcomeDiv.appendChild(p5);
    let p6 = document.createElement("p");
    welcomeDiv.appendChild(p6);
    p6.textContent = "MXG can be used online or installed locally as a Progressive Web App (PWA). A PWA is a type of application         software that should work on platforms with a standard-compliant Web browser. PWA installation varies by Web browser/device.         Some details to help with installation of the MXG PWA are in the GitHub Repository README.";
    let p7 = document.createElement("p");
    welcomeDiv.appendChild(p7);
    p7.textContent = 'The MESMER file loaded is expected to contain the following child elements of the parent "me:mesmer"         element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a         child element is missing or there are multiple "me:title", "moleculeList", "reactionList", "me:conditions", or         "me:modelParameters" elements, an Error is currently thrown. In the future, the loading and creation of files with         multiple "me:conditions" sections will be supported... If you do not have a MESMER file, then feel free to download and         use the examples: ';
    p7.appendChild($7e68913db756e51f$var$mxgDataExamples_a);
    document.body.appendChild(welcomeDiv);
    // Create div for instructions.
    let instructionsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)((0, $134d19e749bf0414$export$3205c97bcf96f7dc)("Instructions"), $7e68913db756e51f$var$boundary1);
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
    let p11 = document.createElement("p");
    instructionsDiv.appendChild(p11);
    p10.textContent = "Rendering of molecules with coordinates is provded by 3DMol.js which incorporates code from GLmol,         Three.js, and jQuery and is licensed under a BSD-3-Clause license. For more details on 3DMol.js please visit the GitHub         repository: ";
    p10.appendChild($7e68913db756e51f$var$t3Dmol_a);
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
    // Before loading a new file, remove any existing content.
    $7e68913db756e51f$var$ids.forEach((id)=>{
        (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(id, $7e68913db756e51f$var$ids);
    });
    if ($7e68913db756e51f$var$molecules != null) $7e68913db756e51f$var$molecules.clear();
    if ($7e68913db756e51f$var$reactions != null) $7e68913db756e51f$var$reactions.clear();
    $7e68913db756e51f$var$maxMoleculeEnergy = -Infinity;
    $7e68913db756e51f$var$minMoleculeEnergy = Infinity;
    // Create a file input element to prompt the user to select a file.
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = function() {
        if (input.files) {
            for(let i = 0; i < input.files.length; i++)console.log("inputElement.files[" + i + "]=" + input.files[i]);
            let file = input.files[0];
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
    input.click();
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
        let titleDiv = document.getElementById($7e68913db756e51f$var$titleDivId);
        let lwiId = $7e68913db756e51f$var$addID("titleDiv");
        // Create input element.
        let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", $7e68913db756e51f$var$addID(lwiId, "Input"), $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
            let target = event.target;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, title, (0, $8677001474399221$export$f99233281efd08a0).tagName, $7e68913db756e51f$var$fontSize1);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }
    // Molecules.
    let moleculesDiv = document.getElementById($7e68913db756e51f$var$moleculesDivId);
    let moleculesListDivId = $7e68913db756e51f$var$addID("moleculesList");
    // If the moleculesListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(moleculesListDivId, $7e68913db756e51f$var$ids);
    let moleculeListDiv = $7e68913db756e51f$var$processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: moleculesDiv,
        elementToInsertBefore: null,
        content: moleculeListDiv,
        buttonLabel: "Molecules",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: moleculeListDiv.id
    });
    //mesmer.setMoleculeList(new MoleculeList(getAttributes(moleculeListDiv), Array.from(molecules.values())));
    $7e68913db756e51f$var$mesmer.setMoleculeList(new (0, $8677001474399221$export$19d70f3647dee606)(new Map(), Array.from($7e68913db756e51f$var$molecules.values())));
    // Reactions.
    let reactionsDiv = document.getElementById($7e68913db756e51f$var$reactionsDivId);
    let reactionsListDivId = $7e68913db756e51f$var$addID("reactionsList");
    // If the reactionsListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(reactionsListDivId, $7e68913db756e51f$var$ids);
    let reactionsListDiv = $7e68913db756e51f$var$processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: reactionsDiv,
        elementToInsertBefore: null,
        content: reactionsListDiv,
        buttonLabel: "Reactions",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: reactionsListDiv.id
    });
    //mesmer.setReactionList(new ReactionList(getAttributes(reactionsDiv), Array.from(reactions.values())));
    $7e68913db756e51f$var$mesmer.setReactionList(new (0, $8677001474399221$export$44466a39ca846289)(new Map(), Array.from($7e68913db756e51f$var$reactions.values())));
    // Add the reactions diagram canvas.
    // Destroy any existing reactions diagram.
    // Check for popWindow.
    if ($7e68913db756e51f$var$popWindow != null) {
        $7e68913db756e51f$var$popWindow.close();
        $7e68913db756e51f$var$popWindow = null;
    }
    // If rdDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)($7e68913db756e51f$var$rdDivId);
    // Create a new rdDiv and append it.
    let rdDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$var$rdDivId, $7e68913db756e51f$var$boundary1);
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = $7e68913db756e51f$var$addID("popButtonDivId");
    //remove(popButtonDivId);
    let popButtonDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(popButtonDivId, $7e68913db756e51f$var$boundary1);
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = $7e68913db756e51f$var$addID("popButtonId");
    // If the popButton already exists, remove it.
    //remove(popButtonID);
    let popButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Pop out diagram into a new window", popButtonID, $7e68913db756e51f$var$boundary1);
    popButtonDiv.appendChild(popButton);
    // If the canvas already exists, remove it.
    //remove(rdCanvasId);
    let rdCanvas = document.createElement("canvas");
    rdCanvas.id = $7e68913db756e51f$var$rdCanvasId;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = $7e68913db756e51f$var$rdCanvasHeight;
    rdCanvas.style.border = "1px solid black";
    $7e68913db756e51f$var$drawReactionDiagram(rdCanvas, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener("click", ()=>{
        if ($7e68913db756e51f$var$popWindow == null) {
            let popWindowRDCanvas = document.createElement("canvas");
            popWindowRDCanvas.id = $7e68913db756e51f$var$rdCanvasId;
            $7e68913db756e51f$var$popWindow = window.open("", "Reactions Diagram", "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            $7e68913db756e51f$var$popWindow.document.body.appendChild(popWindowRDCanvas);
            $7e68913db756e51f$var$drawReactionDiagram(popWindowRDCanvas, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)($7e68913db756e51f$var$rdCanvasId, $7e68913db756e51f$var$ids);
            popButton.textContent = "Pop back reaction diagram";
        } else {
            rdCanvas = document.createElement("canvas");
            rdCanvas.id = $7e68913db756e51f$var$rdCanvasId;
            rdDiv.appendChild(rdCanvas);
            $7e68913db756e51f$var$drawReactionDiagram(rdCanvas, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc);
            $7e68913db756e51f$var$popWindow.close();
            $7e68913db756e51f$var$popWindow = null;
            popButton.textContent = "Pop out reaction diagram to a new window";
        }
    });
    // Conditions.
    let conditionsDiv = document.getElementById($7e68913db756e51f$var$conditionsDivId);
    let conditionssDivId = $7e68913db756e51f$var$addID($7e68913db756e51f$var$conditionsDivId, "conditionss");
    // If the conditionssDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(conditionssDivId);
    let conditionssDiv = $7e68913db756e51f$var$processConditions(xml);
    conditionssDiv.id = conditionssDivId;
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: conditionssDiv,
        buttonLabel: "Conditions",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: conditionssDiv.id
    });
    // Model Parameters.
    let modelParametersDiv = document.getElementById($7e68913db756e51f$var$modelParametersDivId);
    let modelParametersListDivId = $7e68913db756e51f$var$addID("modelParametersList");
    // If the modelParametersListDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(modelParametersListDivId);
    let modelParametersListDiv = $7e68913db756e51f$var$processModelParameters(xml);
    modelParametersListDiv.id = "modelParametersList";
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: modelParametersDiv,
        elementToInsertBefore: null,
        content: modelParametersListDiv,
        buttonLabel: "Model Parameters",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: modelParametersListDiv.id
    });
    // Control.
    let controlDiv = document.getElementById($7e68913db756e51f$var$controlDivId);
    let controlsDivId = $7e68913db756e51f$var$addID($7e68913db756e51f$var$controlDivId, "controls");
    // If the controlsDiv already exists, remove it.
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(controlsDivId);
    let controlsDiv = $7e68913db756e51f$var$processControl(xml);
    controlsDiv.id = controlsDivId;
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: controlDiv,
        elementToInsertBefore: null,
        content: controlsDiv,
        buttonLabel: "Controls",
        buttonFontSize: $7e68913db756e51f$var$fontSize1,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level0,
        contentDivId: controlsDiv.id
    });
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ function $7e68913db756e51f$var$processMoleculeList(xml) {
    // Initialise molecules.
    $7e68913db756e51f$var$molecules = new Map();
    // Create div to contain the molecules list.
    let moleculeListDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
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
        // Get the molecule id.
        let moleculeId = attributes.get((0, $ef5b9341e5193b70$export$3da9759ad07746a3).s_id);
        if (moleculeId == undefined) throw new Error((0, $ef5b9341e5193b70$export$3da9759ad07746a3).s_id + " is undefined");
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
        // Create molecule.
        let molecule = new (0, $ef5b9341e5193b70$export$3da9759ad07746a3)(attributes, moleculeId);
        $7e68913db756e51f$var$molecules.set(moleculeId, molecule);
        // Init atoms.
        let atomArray = new (0, $ef5b9341e5193b70$export$9cea715eceba39a0)(new Map()); // This will be replaced if there is an AtomArray.
        // Function to be used to remove an atom.
        let removeAtom = (id)=>molecule.getAtoms().removeAtom(id);
        // There can be an individual atom not in an atom array, or an atom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName);
        if (xml_atomArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName + " but finding " + xml_atomArrays.length + "!");
        // Create a new collapsible div for the AtomArray.
        let atomArrayDiv = $7e68913db756e51f$var$getCollapsibleContentDiv(moleculeId, moleculeDiv, null, (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName, (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$fontSize3);
        //let atomArrayDiv: HTMLDivElement = createAtomArrayDiv(moleculeId, moleculeDiv, boundary1, level2);
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms = xml_atomArray.getElementsByTagName((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName);
            if (xml_atoms.length < 2) throw new Error("Expecting 2 or more atoms in " + (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName + ", but finding " + xml_atoms.length + "!");
            atomArray = new (0, $ef5b9341e5193b70$export$9cea715eceba39a0)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_atomArray));
            molecule.setAtoms(atomArray);
            for(let j = 0; j < xml_atoms.length; j++){
                // Create a new Atom.
                let atom = new (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_atoms[j]));
                let atomId = atomArray.addAtom(atom);
                //console.log("atomId=" + atomId);
                // Add the atomDiv to the atomArrayDiv.
                let atomDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$level3);
                atomArrayDiv.appendChild(atomDiv);
                let inputId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, atomId);
                atomDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(atomId, $7e68913db756e51f$var$boundary1));
                // elementType.
                $7e68913db756e51f$var$processElementType(inputId, atom, atomDiv, false, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
                // coordinates.
                $7e68913db756e51f$var$processCoordinates(inputId, atom, atomDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
                $7e68913db756e51f$var$addRemoveButton(atomDiv, $7e68913db756e51f$var$boundary1, removeAtom, atomId);
            }
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName);
        } else {
            let xml_atoms = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName);
            if (xml_atoms.length == 1) {
                atomArray = new (0, $ef5b9341e5193b70$export$9cea715eceba39a0)(new Map());
                atomArray.addAtom(new (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_atoms[0])));
                molecule.setAtoms(atomArray);
            } else if (xml_atoms.length > 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName + " but finding " + xml_atoms.length + ". Should these be in an " + (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName + "?");
        }
        atomArrayDiv.appendChild($7e68913db756e51f$var$getAddAtomButton(molecule, moleculeId, atomArrayDiv, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3, $7e68913db756e51f$var$fontSize4));
        //console.log("atomsNode=" + atomsNode);
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName);
        // Init bondsNode.
        let bondArray = new (0, $ef5b9341e5193b70$export$746fba2e30d93fe6)(new Map()); // This will be replaced if there is an BondArray.
        // Function to be used to remove an bond.
        let removeBond = (id)=>molecule.getBonds().removeBond(id);
        // There can be an individual bond not in a bond array, or a bond array.
        // There may be only 1 bond in a BondArray.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName);
        // Create a new collapsible div for the BondArray.
        let bondArrayDiv = $7e68913db756e51f$var$getCollapsibleContentDiv(moleculeId, moleculeDiv, null, (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName, (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$fontSize3);
        if (xml_bondArrays.length > 0) {
            if (xml_bondArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName + " but finding " + xml_bondArrays.length + "!");
            let xml_bonds = xml_bondArrays[0].getElementsByTagName((0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName);
            bondArray = new (0, $ef5b9341e5193b70$export$746fba2e30d93fe6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bondArrays[0]));
            for(let j = 0; j < xml_bonds.length; j++){
                // Create a new Bond.
                let bond = new (0, $ef5b9341e5193b70$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bonds[j]));
                let bondId = bondArray.addBond(bond);
                // Add the bondDiv to the bondArrayDiv.
                let bondDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$level3);
                bondArrayDiv.appendChild(bondDiv);
                let inputId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, bondId);
                bondDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(bondId, $7e68913db756e51f$var$boundary1));
                // atomRefs2.
                $7e68913db756e51f$var$processAtomRefs2(molecule, bondDiv, bond, inputId, $7e68913db756e51f$var$boundary1);
                // order.
                $7e68913db756e51f$var$processOrder(bondDiv, bond, inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_order, $7e68913db756e51f$var$boundary1);
                $7e68913db756e51f$var$addRemoveButton(bondDiv, $7e68913db756e51f$var$boundary1, removeBond, bondId);
                $7e68913db756e51f$var$addRefreshButton(molecule, bondDiv, inputId, $7e68913db756e51f$var$boundary1);
            }
            molecule.setBonds(bondArray);
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName);
        } else {
            let xml_bonds = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName);
            if (xml_bonds.length > 0) {
                if (xml_bonds.length > 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName + " but finding " + xml_bonds.length + ". Should these be in a " + (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName + "?");
                bondArray = new (0, $ef5b9341e5193b70$export$746fba2e30d93fe6)(new Map());
                bondArray.addBond(new (0, $ef5b9341e5193b70$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bonds[0])));
                molecule.setBonds(bondArray);
            }
        }
        bondArrayDiv.appendChild($7e68913db756e51f$var$getAddBondButton(molecule, moleculeId, bondArrayDiv, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3));
        moleculeTagNames.delete((0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName);
        $7e68913db756e51f$var$create3DViewer(molecule, moleculeDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2);
        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_PLs = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        if (xml_PLs.length > 1) throw new Error("Expecting 1 or 0 " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + " but finding " + xml_PLs.length + "!");
        if (xml_PLs.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "_";
            (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                divToAddTo: moleculeDiv,
                elementToInsertBefore: null,
                content: plDiv,
                buttonLabel: (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName,
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            // Create a new PropertyList.
            let pl = new (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            for(let j = 0; j < xml_Ps.length; j++){
                // Create a new Property.
                let p = $7e68913db756e51f$var$createProperty(xml_Ps[j], plDiv, molecule, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
                pl.setProperty(p);
            }
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName);
            if (xml_Ps.length != 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, $ef5b9341e5193b70$export$4e0d1ad7ad6a0802).tagName + "?");
            // Create a new Property.
            let p = $7e68913db756e51f$var$createProperty(xml_Ps[0], moleculeDiv, molecule, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2);
            molecule.setProperties(p);
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
            moleculeDiv.appendChild((0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName, (0, $ef5b9341e5193b70$export$bbdce6c921702068).xsi_typeOptions, (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName, dOSCMethod.getXsiType(), molecule.id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2));
            moleculeTagNames.delete((0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName((0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            let extraDOSCMethod = new (0, $ef5b9341e5193b70$export$ae98b7db6376163d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName + "_";
            (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                divToAddTo: moleculeDiv,
                elementToInsertBefore: null,
                content: extraDOSCMethodDiv,
                buttonLabel: (0, $ef5b9341e5193b70$export$ae98b7db6376163d).tagName,
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
            // Read bondRef.
            let xml_bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                let bondIds = molecule.getBonds().getBondIds();
                let bondRef = new (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bondRefs[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bondRefs[0])));
                extraDOSCMethodDiv.appendChild((0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName, bondIds, (0, $ef5b9341e5193b70$export$aef8e5ad5552fd72).tagName, bondRef.value, molecule.id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3));
            }
            // Read hinderedRotorPotential.
            let xml_hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName);
            if (xml_hinderedRotorPotentials.length > 0) {
                if (xml_hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hinderedRotorPotentials.length);
                let hinderedRotorPotentialAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_hinderedRotorPotentials[0]);
                let hinderedRotorPotential = new (0, $ef5b9341e5193b70$export$9b8e857b9a081d2)(hinderedRotorPotentialAttributes);
                // Create a new collapsible div for the HinderedRotorPotential.
                let hinderedRotorPotentialDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$level4);
                let contentDivId = molecule.id + "_" + (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName;
                (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                    divToAddTo: extraDOSCMethodDiv,
                    elementToInsertBefore: null,
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName,
                    buttonFontSize: $7e68913db756e51f$var$fontSize3,
                    boundary: $7e68913db756e51f$var$boundary1,
                    level: $7e68913db756e51f$var$level3,
                    contentDivId: contentDivId
                });
                // Format.
                hinderedRotorPotentialDiv.appendChild((0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).s_format, (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).formats, (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName, hinderedRotorPotential.getFormat(), contentDivId, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1));
                // Units.
                $7e68913db756e51f$var$addAnyUnits((0, $8677001474399221$export$692079bb871c6039).energyUnits, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, contentDivId, (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName, $7e68913db756e51f$var$boundary1);
                // ExpansionSize.
                hinderedRotorPotentialDiv.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", contentDivId + "_" + (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).s_expansionSize, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1, (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                    else {
                        // Reset the input to the current value.
                        alert((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).s_expansionSize + " input is not a number, resetting...");
                        target.value = hinderedRotorPotential.getExpansionSize().toExponential();
                    }
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                }, hinderedRotorPotential.getExpansionSize().toExponential(), (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).s_expansionSize));
                // Add useSineTerms.
                let useSineTermsLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $ef5b9341e5193b70$export$9b8e857b9a081d2).s_useSineTerms, $7e68913db756e51f$var$boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(molecule.id, (0, $ef5b9341e5193b70$export$bbdce6c921702068).tagName, (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).tagName, (0, $ef5b9341e5193b70$export$9b8e857b9a081d2).s_useSineTerms);
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
                    divToAddTo: hinderedRotorPotentialDiv,
                    elementToInsertBefore: null,
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
                    let potentialPointDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $ef5b9341e5193b70$export$86ca5149fcde8feb).s_angle, $7e68913db756e51f$var$boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(molecule.id, (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName, (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).s_angle);
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
                    let potentialLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $ef5b9341e5193b70$export$86ca5149fcde8feb).s_potential, $7e68913db756e51f$var$boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(molecule.id, (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).tagName, (0, $ef5b9341e5193b70$export$86ca5149fcde8feb).s_potential);
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
        (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            divToAddTo: moleculeListDiv,
            elementToInsertBefore: null,
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: $7e68913db756e51f$var$fontSize2,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level1,
            contentDivId: molecule.tagName + "_" + molecule.id
        });
    }
    // Create an add molecule button.
    let addMoleculeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, undefined, $7e68913db756e51f$var$level1);
    moleculeListDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener("click", ()=>{
        // Ask the user to specify the molecule ID.
        let moleculeId = prompt("Please enter the chemical formular:", "IDNotSpecified");
        let molecule = new (0, $ef5b9341e5193b70$export$3da9759ad07746a3)(new Map(), moleculeId);
        $7e68913db756e51f$var$molecules.set(moleculeId, molecule);
        let moleculeDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(moleculeId, $7e68913db756e51f$var$level1);
        moleculeListDiv.insertBefore(moleculeDiv, addMoleculeButton);
        // Create a new collapsible div for the molecule.
        (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            divToAddTo: moleculeListDiv,
            elementToInsertBefore: addMoleculeButton,
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: $7e68913db756e51f$var$fontSize2,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level1,
            contentDivId: molecule.tagName + "_" + moleculeId
        });
        // Atoms.
        let atomArrayDiv = $7e68913db756e51f$var$getCollapsibleContentDiv(moleculeId, moleculeDiv, null, (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName, (0, $ef5b9341e5193b70$export$9cea715eceba39a0).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level1, $7e68913db756e51f$var$fontSize2);
        atomArrayDiv.appendChild($7e68913db756e51f$var$getAddAtomButton(molecule, moleculeId, atomArrayDiv, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$fontSize2));
        // Bonds.
        let bondArrayDiv = $7e68913db756e51f$var$getCollapsibleContentDiv(moleculeId, moleculeDiv, null, (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName, (0, $ef5b9341e5193b70$export$746fba2e30d93fe6).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level1, $7e68913db756e51f$var$fontSize2);
        bondArrayDiv.appendChild($7e68913db756e51f$var$getAddBondButton(molecule, moleculeId, bondArrayDiv, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2));
        $7e68913db756e51f$var$create3DViewer(molecule, moleculeDiv, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level2);
        // Properties.
        let propertiesDiv = $7e68913db756e51f$var$getCollapsibleContentDiv(moleculeId, moleculeDiv, null, (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName, (0, $ef5b9341e5193b70$export$41b04b3a73e7216d).tagName, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level1, $7e68913db756e51f$var$fontSize2);
    //propertiesDiv.appendChild(getAddPropertyButton(molecule, moleculeId!, propertiesDiv, Property.tagName, boundary1, level2, fontSize2));    
    });
    return moleculeListDiv;
}
/**
 * Creates and returns a new div which is the content expanded or collapsed by a button.
 * 
 * @param moleculeId The molecule id.
 * @param divToAddTo The div to add to.
 * @param elementToInsertBefore The element to insert before.
 * @param buttonLabel The button label.
 * @param typeID The type (used to compile an id along with moleculeId).
 * @param boundary The boundary.
 * @param level The level.
 * @param buttonFontSize The button font size.
 * @returns The content div.
 */ function $7e68913db756e51f$var$getCollapsibleContentDiv(moleculeId, divToAddTo, elementToInsertBefore, buttonLabel, typeID, boundary, level, buttonFontSize) {
    let div = document.createElement("div");
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: divToAddTo,
        elementToInsertBefore: elementToInsertBefore,
        content: div,
        buttonLabel: buttonLabel,
        buttonFontSize: buttonFontSize,
        boundary: boundary,
        level: level,
        contentDivId: (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, typeID)
    });
    return div;
}
/**
 * Creates and returns a button for adding a new bond div to the bondArrayDiv. The bond div added
 * will have: a bond id label; editable details for atomRefs2 and order; and, remove and refresh buttons.
 * 
 * @param molecule The molecule.
 * @param moleculeId The molecule id.
 * @param bondArrayDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */ function $7e68913db756e51f$var$getAddAtomButton(molecule, moleculeId, atomArrayDiv, typeID, boundary, level, fontSize) {
    // Create an add atom button.
    let addAtomButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, "Add" + typeID + "Button"), level);
    addAtomButton.addEventListener("click", ()=>{
        let attributes = new Map();
        let atom = new (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb)(attributes);
        let atomId = molecule.getAtoms().addAtom(atom);
        let atomDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        let inputId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, atomId);
        atomDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(atomId, boundary));
        // elementType.
        $7e68913db756e51f$var$processElementType(inputId, atom, atomDiv, true, boundary, boundary);
        // Coordinates.
        $7e68913db756e51f$var$processCoordinates(inputId, atom, atomDiv, boundary, boundary);
        let removeAtom = (id)=>molecule.getAtoms().removeAtom(id);
        $7e68913db756e51f$var$addRemoveButton(atomDiv, boundary, removeAtom, atomId);
        atomArrayDiv.insertBefore(atomDiv, addAtomButton);
    });
    return addAtomButton;
}
/**
 * Creates and returns a button for adding a new bond div to the bondArrayDiv. The bond div added
 * will have: a bond id label; editable details for atomRefs2 and order; and, remove and refresh buttons.
 * 
 * @param molecule The molecule.
 * @param moleculeId The molecule id.
 * @param bondArrayDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */ function $7e68913db756e51f$var$getAddBondButton(molecule, moleculeId, bondArrayDiv, typeID, boundary, level) {
    // Create an add button.
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, "Add" + typeID + "Button"), level);
    button.addEventListener("click", ()=>{
        let attributes = new Map();
        attributes.set((0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2, "Please specify " + (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2);
        let bond = new (0, $ef5b9341e5193b70$export$153327fc99ac0c53)(attributes);
        let bondId = molecule.getBonds().addBond(bond);
        let bondDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        bondArrayDiv.insertBefore(bondDiv, button);
        let inputId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, bondId);
        bondDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(bondId, boundary));
        // atomRefs2.
        $7e68913db756e51f$var$processAtomRefs2(molecule, bondDiv, bond, inputId, boundary);
        // order.
        $7e68913db756e51f$var$processOrder(bondDiv, bond, inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_order, boundary);
        let removeBond = (id)=>molecule.getBonds().removeBond(id);
        $7e68913db756e51f$var$addRemoveButton(bondDiv, boundary, removeBond, bondId);
        $7e68913db756e51f$var$addRefreshButton(molecule, bondDiv, inputId, $7e68913db756e51f$var$boundary1);
    });
    bondArrayDiv.appendChild(button);
    return button;
}
/**
 * For processing the atomRefs2 of a Bond.
 * 
 * @param molecule The molecule.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param inputId The input id.
 * @param margin The margin for the components.
 */ function $7e68913db756e51f$var$processAtomRefs2(molecule, bondDiv, bond, inputId, margin) {
    let atomRefs2 = bond.atomRefs2;
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    let alws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2 + "[0]", atomRefOptions, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName, atomRefs[0], (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2, "0"), margin, margin);
    let aselect = alws.querySelector("select");
    aselect.addEventListener("change", (event)=>{
        let target = event.target;
        bond.setAtomRefs2(target.value + " " + atomRefs[1]);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    aselect.value = atomRefs[0];
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(aselect);
    bondDiv.appendChild(alws);
    // blws.
    let blws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2 + "[1]", atomRefOptions, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).tagName, atomRefs[1], (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2, "1"), margin, margin);
    let bselect = blws.querySelector("select");
    bselect.addEventListener("change", (event)=>{
        let target = event.target;
        bond.setAtomRefs2(atomRefs[0] + " " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    bselect.value = atomRefs[1];
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(bselect);
    bondDiv.appendChild(blws);
}
/**
 * If an atom is added since the bond array was created, then the select elements need updating to allow for these 
 * new atoms to be selected.
 * 
 * @param molecule The molecule. 
 * @param inputId The input id.
 */ function $7e68913db756e51f$var$reprocessAtomRefs2(molecule, inputId) {
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    function updateSelectElement(id, atomRefOptions) {
        let select = document.getElementById(id);
        let v = "";
        if (select != null) {
            v = select.value;
            select.innerHTML = "";
        }
        atomRefOptions.forEach((option)=>{
            let oe = document.createElement("option");
            oe.value = option;
            oe.text = option;
            if (select != null) select.add(oe);
        });
        if (select != null) select.value = v;
    }
    // Update each select element
    for(let i = 0; i < 2; i++){
        let id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2, i.toString());
        updateSelectElement(id, atomRefOptions);
    }
}
function $7e68913db756e51f$var$getAddProperty(molecule, moleculeId, bondArrayDiv, typeID, boundary, level, fontSize) {
    // Create an add button.
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, "Add" + typeID + "Button"), level);
    button.addEventListener("click", ()=>{
        let attributes = new Map();
        attributes.set((0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2, "Please specify " + (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_atomRefs2);
        let bond = new (0, $ef5b9341e5193b70$export$153327fc99ac0c53)(attributes);
        let bondId = molecule.getBonds().addBond(bond);
        let bondDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        bondArrayDiv.insertBefore(bondDiv, button);
        let inputId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(moleculeId, bondId);
        bondDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(bondId, boundary));
        // atomRefs2.
        $7e68913db756e51f$var$processAtomRefs2(molecule, bondDiv, bond, inputId, boundary);
        // order.
        $7e68913db756e51f$var$processOrder(bondDiv, bond, inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_order, boundary);
        let removeBond = (id)=>molecule.getBonds().removeBond(id);
        $7e68913db756e51f$var$addRemoveButton(bondDiv, boundary, removeBond, bondId);
        $7e68913db756e51f$var$addRefreshButton(molecule, bondDiv, inputId, boundary);
    });
    bondArrayDiv.appendChild(button);
    return button;
}
/**
 * @param xml The xml element.
 * @param div The div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */ function $7e68913db756e51f$var$createProperty(xml, div, molecule, boundary, level) {
    let p = new (0, $ef5b9341e5193b70$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml));
    if (p.dictRef == (0, $ef5b9341e5193b70$export$95174cf0748f45cd).dictRef) $7e68913db756e51f$var$processProperty(p, (0, $8677001474399221$export$692079bb871c6039).energyUnits, molecule, xml, div, boundary, level);
    else if (p.dictRef == (0, $ef5b9341e5193b70$export$984abe26ded13ee0).dictRef) $7e68913db756e51f$var$processProperty(p, (0, $8677001474399221$export$692079bb871c6039).frequencyUnits, molecule, xml, div, boundary, level);
    else $7e68913db756e51f$var$processProperty(p, undefined, molecule, xml, div, boundary, level);
    return p;
}
function $7e68913db756e51f$var$processElementType(inputId, atom, atomDiv, first, boundary, level) {
    let elementType = atom.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = $7e68913db756e51f$var$selectOption;
        selectTypes = $7e68913db756e51f$var$doSelectOption((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).elementTypes, first);
    //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_elementType, selectTypes, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_elementType, elementType, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(inputId, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_elementType), boundary, level);
    let select = lws.querySelector("select");
    select.addEventListener("change", (event)=>{
        let target = event.target;
        atom.setElementType(target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    select.value = elementType;
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    $7e68913db756e51f$var$selectAnotherOptionEventListener(selectTypes, select);
    atomDiv.appendChild(lws);
    return lws;
}
function $7e68913db756e51f$var$doSelectOption(options, first) {
    if (first) options.push($7e68913db756e51f$var$selectOption);
    else {
        // remove selectOption if present.
        let index = options.indexOf($7e68913db756e51f$var$selectOption);
        if (index > -1) options.splice(index, 1);
    }
    return options;
}
/**
 * Process atom coordinates.
 * @param inputId The input id.
 * @param atom The atom.
 * @param atomDiv The atom div.
 */ function $7e68913db756e51f$var$processCoordinates(inputId, atom, atomDiv, boundary, level) {
    let x3id = inputId + "_" + (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_x3;
    $7e68913db756e51f$var$processCoordinate(atom, atomDiv, x3id, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_x3, atom.getX3.bind(atom), atom.setX3.bind(atom), boundary, level);
    let y3id = inputId + "_" + (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_y3;
    $7e68913db756e51f$var$processCoordinate(atom, atomDiv, y3id, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_y3, atom.getY3.bind(atom), atom.setY3.bind(atom), boundary, level);
    let z3id = inputId + "_" + (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_z3;
    $7e68913db756e51f$var$processCoordinate(atom, atomDiv, z3id, (0, $ef5b9341e5193b70$export$80986e6afdd7e0cb).s_z3, atom.getZ3.bind(atom), atom.setZ3.bind(atom), boundary, level);
}
/**
 * Process a coordinate.
 * @param atom The atom.
 * @param atomDiv The atom div.
 * @param id The id for the coordinate.
 * @param coordinate The coordinate name.
 * @param getter The getter function to call on the atom.
 * @param setter The setter function to call on the atom.
 * @param logMessage The message to log when the value changes.
 */ function $7e68913db756e51f$var$processCoordinate(atom, atomDiv, id, coordinate, getter, setter, boundary, level) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, boundary);
    atomDiv.appendChild(div);
    let buttonTextContentSelected = coordinate + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = coordinate + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, boundary);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
    } else {
        $7e68913db756e51f$var$addCoordinate(div, atom, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, "Input"), value, setter, coordinate, boundary);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the AtomArray already exists
        if (document.getElementById(id) == null) {
            $7e68913db756e51f$var$addCoordinate(div, atom, id, NaN, setter, coordinate, boundary);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * @param div The div to add the input to.
 * @param atom The atom.
 * @param id The id.
 * @param value The coordinate value.
 * @param setter The setter function to call on the atom.
 * @param coordinate The coordinate name.
 * @param boundary The boundary.
 * @param level The level.
 */ function $7e68913db756e51f$var$addCoordinate(div, atom, id, value, setter, coordinate, boundary) {
    let valueString = (value || NaN).toString();
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", id, boundary);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setter(parseFloat(target.value));
        console.log(coordinate + " has changed from " + value + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */ function $7e68913db756e51f$var$addRemoveButton(div, margin, removeFunction, ...args) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$removeString, undefined, margin);
    div.appendChild(button);
    button.addEventListener("click", ()=>{
        removeFunction(...args);
        div.remove();
    });
    return button;
}
function $7e68913db756e51f$var$addRefreshButton(molecule, bondDiv, inputId, margin) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$refreshString, undefined, margin);
    bondDiv.appendChild(button);
    button.addEventListener("click", ()=>{
        $7e68913db756e51f$var$reprocessAtomRefs2(molecule, inputId);
    });
}
/**
 * Process an order.
 * @param bond The bond.
 * @param bondDiv The bond div.
 * @param inputId The input id.
 * @param order The order name.
 */ function $7e68913db756e51f$var$processOrder(bondDiv, bond, inputId, order, margin) {
    let orderId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(inputId, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_order);
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = order + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = order + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
    } else {
        $7e68913db756e51f$var$addOrder(div, bond, orderId, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (document.getElementById(orderId) == null) {
            $7e68913db756e51f$var$addOrder(div, bond, orderId, 1, margin);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove any existing div.
            document.getElementById(orderId)?.remove();
            console.log("Removed " + orderId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * @param div The div to add the input to.
 * @param bond The bond.
 * @param id The id.
 * @param value The order value.
 * @param boundary The boundary.
 */ function $7e68913db756e51f$var$addOrder(div, bond, id, value, boundary) {
    let valueString = value.toString();
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)((0, $ef5b9341e5193b70$export$153327fc99ac0c53).orderOptions, (0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_order, valueString, id, boundary);
    select.addEventListener("change", (event)=>{
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log((0, $ef5b9341e5193b70$export$153327fc99ac0c53).s_order + " changed from " + valueString + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    select.value = valueString;
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    select.id = id;
    div.appendChild(select);
}
function $7e68913db756e51f$var$create3DViewer(molecule, moleculeDiv, boundary, level) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(molecule.id, "viewerContainer");
    let viewerContainerDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(molecule.id, "viewer");
    // Create the viewer.
    function createViewer() {
        let viewerDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(viewerDivID, boundary);
        viewerDiv.className = "mol-container";
        viewerContainerDiv.appendChild(viewerDiv);
        let config = {
            backgroundColor: "grey"
        };
        let viewer = $3Dmol.createViewer(viewerDiv, config);
        // Set the viewer style to stick and ball.
        viewer.setStyle({
            stick: {}
        });
        // Create a 3Dmol viewer control to turn labels on and off.
        molecule.getAtoms().atoms.forEach(function(atom) {
            let et = atom.getElementType();
            let color;
            if (et == undefined) color = "Purple";
            else color = (0, $8677001474399221$export$692079bb871c6039).atomColors.get(et) || "Purple";
            //let am: number = Mesmer.atomMasses.get(atom.getElementType()) || 1;
            let radius;
            if (et == undefined) radius = 100;
            else radius = (0, $8677001474399221$export$692079bb871c6039).atomRadii.get(atom.getElementType()) || 100;
            let ax = atom.getX3() || 0;
            let ay = atom.getY3() || 0;
            let az = atom.getZ3() || 0;
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: 0.3 * am / 10.0, color: color });
            viewer.addSphere({
                center: {
                    x: ax,
                    y: ay,
                    z: az
                },
                radius: radius / 110.0,
                color: color
            });
        //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: (radius * (am ** (1 / 3.0))) / 275.0, color: color });
        //viewer.addLabel(atom.getElementType(), { position: { x: ax, y: ay, z: az } });
        });
        molecule.getBonds().bonds.forEach(function(bond) {
            let atomIds = bond.atomRefs2.split(" ");
            let atomArray = molecule.getAtoms();
            let atom1 = atomArray.getAtom(atomIds[0]);
            let atom2 = atomArray.getAtom(atomIds[1]);
            let order = bond.getOrder() || 1;
            let color = (0, $8677001474399221$export$692079bb871c6039).bondColors.get(order) || "Purple";
            let a1x = atom1.getX3() || 0;
            let a1y = atom1.getY3() || 0;
            let a1z = atom1.getZ3() || 0;
            let a2x = atom2.getX3() || 0;
            let a2y = atom2.getY3() || 0;
            let a2z = atom2.getZ3() || 0;
            viewer.addCylinder({
                start: {
                    x: a1x,
                    y: a1y,
                    z: a1z
                },
                end: {
                    x: a2x,
                    y: a2y,
                    z: a2z
                },
                radius: 0.06 * order,
                color: color
            });
        });
        viewer.zoomTo();
        viewer.render();
        viewer.zoom(0.8, 2000);
    }
    // Add a redraw button.
    let redrawButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Draw/Redraw", undefined);
    redrawButton.addEventListener("click", ()=>{
        (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(viewerDivID, $7e68913db756e51f$var$ids);
        createViewer();
    });
    viewerContainerDiv.appendChild(redrawButton);
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function $7e68913db756e51f$var$displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById($7e68913db756e51f$var$xmlDivId);
    // xmlHeading
    let xmlHeadingId = "xmlHeading";
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(xmlHeadingId, $7e68913db756e51f$var$ids);
    let xmlHeading = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId = "xmlParagraph";
    (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(xmlParagraphId, $7e68913db756e51f$var$ids);
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
 * @param div The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */ function $7e68913db756e51f$var$processProperty(p, units, molecule, element, div, boundary, level) {
    // PropertyScalar.
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
        div.appendChild(inputDiv);
    } else {
        // PropertyArray.
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
            div.appendChild(inputDiv);
        } else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName((0, $ef5b9341e5193b70$export$a5a2be813176eb0e).tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) throw new Error("Expecting 1 " + (0, $ef5b9341e5193b70$export$a5a2be813176eb0e).tagName + " but finding " + matrixNodes.length + "!");
                let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(matrixNodes[0]);
                let values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                let pmAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(matrixNodes[0]);
                let pm = new (0, $ef5b9341e5193b70$export$a5a2be813176eb0e)(pmAttributes, values);
                p.setProperty(pm);
                let label = p.dictRef;
                // Create a new div element for the input.
                let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", molecule.id + "_" + p.dictRef, boundary, level, (event)=>{
                    let target = event.target;
                    $7e68913db756e51f$export$819b5ff7dff3652c(pm, target);
                }, inputString, label);
                let inputElement = inputDiv.querySelector("input");
                inputElement.value = inputString;
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                inputElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                });
                $7e68913db756e51f$var$addAnyUnits(units, pmAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
                div.appendChild(inputDiv);
            } else throw new Error("Expecting " + (0, $ef5b9341e5193b70$export$d29b345ea2be5072).tagName + ", " + (0, $ef5b9341e5193b70$export$9f93a3fdf2490572).tagName + " or " + (0, $ef5b9341e5193b70$export$a5a2be813176eb0e).tagName + " but finding none!");
        }
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
        let lws = $7e68913db756e51f$var$getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef);
        if (lws != undefined) inputDiv.appendChild(lws);
    } else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("units " + attributesUnits, boundary);
            inputDiv.appendChild(label);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */ function $7e68913db756e51f$var$getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)("units", units, "units", psUnits, id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
        let select = lws.querySelector("select");
        // Set the initial value to the units.
        select.value = psUnits;
        // Add event listener to selectElement.
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
        select.addEventListener("change", (event)=>{
            let target = event.target;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        return lws;
    }
    return undefined;
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
        (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            divToAddTo: moleculeDiv,
            elementToInsertBefore: null,
            content: etmDiv,
            buttonLabel: (0, $ef5b9341e5193b70$export$499950da20810ac9).tagName,
            buttonFontSize: $7e68913db756e51f$var$fontSize3,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level2,
            contentDivId: contentDivId
        });
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
            unitsLabel.textContent = "units cm-1";
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
//(window as any).set = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */ function $7e68913db756e51f$var$processReactionList(xml) {
    // Initialise reactions.
    $7e68913db756e51f$var$reactions = new Map();
    // Create div to contain the reaction list.
    let reactionListDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
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
        let reactionDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
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
                let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(molecule.ref + " role", (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).roleOptions, "Role", molecule.role, molecule.ref, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
                lws.querySelector("select")?.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                });
                reactantsDiv.appendChild(lws);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$dcfd4302d04b7fb6).tagName;
            (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                divToAddTo: reactionDiv,
                elementToInsertBefore: null,
                content: reactantsDiv,
                buttonLabel: "Reactants",
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
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
                let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(molecule.ref + " role", (0, $6f7aa7a716962086$export$264ad599d7cef668).roleOptions, molecule.role, molecule.ref, "Role", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
                let select = lws.querySelector("select");
                select.value = molecule.role;
                select.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                });
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
                productsDiv.appendChild(lws);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$264ad599d7cef668).tagName;
            (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                divToAddTo: reactionDiv,
                elementToInsertBefore: null,
                content: productsDiv,
                buttonLabel: "Products",
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
        }
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName((0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName + " but finding " + xml_tunneling.length + "!");
            let tunneling = new (0, $6f7aa7a716962086$export$c3cf6f96dac11421)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $6f7aa7a716962086$export$c3cf6f96dac11421).tagName, (0, $6f7aa7a716962086$export$c3cf6f96dac11421).options, "Tunneling", tunneling.getName(), reaction.id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level3);
            lws.querySelector("select")?.addEventListener("change", (event)=>{
                let target = event.target;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
            });
            reactionDiv.appendChild(lws);
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
                let label = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(molecule.ref + " role transitionState", $7e68913db756e51f$var$level3);
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let contentDivId = reaction.id + "_" + (0, $6f7aa7a716962086$export$145c1ed87b1a2216).tagName;
            (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                divToAddTo: reactionDiv,
                elementToInsertBefore: null,
                content: transitionStatesDiv,
                buttonLabel: "Transition States",
                buttonFontSize: $7e68913db756e51f$var$fontSize3,
                boundary: $7e68913db756e51f$var$boundary1,
                level: $7e68913db756e51f$var$level2,
                contentDivId: contentDivId
            });
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
                        (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
                            divToAddTo: reactionDiv,
                            elementToInsertBefore: null,
                            content: mCRCMethodDiv,
                            buttonLabel: (0, $6f7aa7a716962086$export$6fa70ee10f356b6).tagName,
                            buttonFontSize: $7e68913db756e51f$var$fontSize3,
                            boundary: $7e68913db756e51f$var$boundary1,
                            level: $7e68913db756e51f$var$level2,
                            contentDivId: contentDivId
                        });
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
        // Create a new collapsible div for the reaction and append to the reactionListDiv.
        (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
            divToAddTo: reactionListDiv,
            elementToInsertBefore: null,
            content: reactionDiv,
            buttonLabel: reaction.id + "(" + reaction.getLabel() + ")",
            buttonFontSize: $7e68913db756e51f$var$fontSize2,
            boundary: $7e68913db756e51f$var$boundary1,
            level: $7e68913db756e51f$var$level1,
            contentDivId: reaction.tagName + "_" + reaction.id
        });
    }
    return reactionListDiv;
}
/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */ function $7e68913db756e51f$var$processConditions(xml) {
    console.log((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    // Create a div for the conditionss.
    let conditionssDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
    // Get the XML "me:conditions" element.
    let xml_conditionss = xml.getElementsByTagName((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName);
    for(let i = 0; i < xml_conditionss.length; i++){
        let xml_conditions = xml_conditionss[i];
        // Create div to contain the conditions.
        let conditionsID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName, i.toString());
        let conditionsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(conditionsID, $7e68913db756e51f$var$boundary1);
        let conditions = $7e68913db756e51f$var$addConditions((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_conditions), conditionsDiv, null, conditionssDiv, i);
        let level = $7e68913db756e51f$var$level2;
        let nextLevel = $7e68913db756e51f$var$level3;
        $7e68913db756e51f$var$handleBathGases(conditions, conditionsDiv, xml_conditions, level, nextLevel);
        $7e68913db756e51f$var$handlePTs(conditions, conditionsDiv, xml_conditions, level, nextLevel);
        // Add a remove conditions button.
        let removeButton = $7e68913db756e51f$var$addRemoveButton(conditionsDiv, level, $7e68913db756e51f$var$mesmer.removeConditions.bind($7e68913db756e51f$var$mesmer), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the conditions.
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(conditionsID, $7e68913db756e51f$var$ids);
        });
    }
    // Create an add button to add a conditions.
    $7e68913db756e51f$var$createAddConditionsButton(conditionssDiv, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$level3);
    return conditionssDiv;
}
function $7e68913db756e51f$var$handleBathGases(conditions, conditionsDiv, xml_conditions, level, nextLevel) {
    // Bath Gases
    let bathGasesDiv = document.createElement("div");
    conditionsDiv.appendChild(bathGasesDiv);
    // Add collapsible div.
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: bathGasesDiv,
        buttonLabel: (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName,
        buttonFontSize: $7e68913db756e51f$var$fontSize2,
        boundary: $7e68913db756e51f$var$boundary1,
        level: level,
        contentDivId: (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName
    });
    // Add add button.
    let addBathGasButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, undefined, nextLevel);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener("click", ()=>{
        let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), $7e68913db756e51f$var$selectOption);
        conditions.addBathGas(bathGas);
        let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, nextLevel);
        div.appendChild($7e68913db756e51f$var$createSelectElementBathGas(Array.from(new Set($7e68913db756e51f$var$molecules.keys())), bathGas, true));
        $7e68913db756e51f$var$addRemoveButton(div, $7e68913db756e51f$var$boundary1, (bathGas)=>{
            bathGasesDiv.removeChild(div);
            conditions.removeBathGas(bathGas);
        });
        bathGasesDiv.insertBefore(div, addBathGasButton);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases = Array.from(xml_conditions.children).filter((child)=>child.tagName === (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
        if (xml_bathGases.length > 0) for(let i = 0; i < xml_bathGases.length; i++){
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGases[i]);
            let moleculeID = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGases[i]));
            let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(attributes, moleculeID);
            console.log("bathGas" + bathGas.toString());
            conditions.addBathGas(bathGas);
            let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, nextLevel);
            div.appendChild($7e68913db756e51f$var$createSelectElementBathGas(Array.from(new Set($7e68913db756e51f$var$molecules.keys())), bathGas, false));
            $7e68913db756e51f$var$addRemoveButton(div, $7e68913db756e51f$var$boundary1, (bathGas)=>{
                bathGasesDiv.removeChild(div);
                conditions.removeBathGas(bathGas);
            });
            bathGasesDiv.insertBefore(div, addBathGasButton);
        }
        else {
            let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, nextLevel);
            div.appendChild($7e68913db756e51f$var$createSelectElementBathGas(Array.from(new Set($7e68913db756e51f$var$molecules.keys())), undefined, true));
            $7e68913db756e51f$var$addRemoveButton(div, $7e68913db756e51f$var$boundary1, (bathGas)=>{
                bathGasesDiv.removeChild(div);
                conditions.removeBathGas(bathGas);
            });
            bathGasesDiv.insertBefore(div, addBathGasButton);
        }
    }
}
function $7e68913db756e51f$var$handlePTs(conditions, conditionsDiv, xml_conditions, level, nextLevel) {
    // PTs
    let moleculeKeys = new Set($7e68913db756e51f$var$molecules.keys());
    // Create a new div for the PTs.
    let pTsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
    conditionsDiv.appendChild(pTsDiv);
    let pTs;
    if (xml_conditions) {
        let xml_PTss = xml_conditions.getElementsByTagName((0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) throw new Error("Expecting 1 " + (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName + " but finding " + xml_PTss.length + "!");
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTss[0]);
            let xml_PTpairs = xml_PTss[0].getElementsByTagName((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName);
            if (xml_PTpairs.length == 0) throw new Error("Expecting 1 or more " + (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + " but finding 0!");
            else {
                pTs = new (0, $ae74a7b44a6504a1$export$3be0efe793283834)(attributes);
                for(let i = 0; i < xml_PTpairs.length; i++){
                    let pTpairAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTpairs[i]);
                    console.log("pTpairAttributes=" + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(pTpairAttributes));
                    let pTpair = new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)(pTpairAttributes);
                    pTs.addPTpair(pTpair);
                    // BathGas.
                    let xml_bathGass = xml_PTpairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        let bathGasValue = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGass[0]));
                        let bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGass[0]), bathGasValue);
                        pTpair.setBathGas(bathGas);
                    }
                    // ExperimentRate.
                    let xml_experimentRates = xml_PTpairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName);
                    if (xml_experimentRates.length > 0) {
                        if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                        let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_experimentRates[0]));
                        let experimentRate = new (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_experimentRates[0]), parseFloat(valueString));
                        pTpair.setExperimentalRate(experimentRate);
                    }
                    // ExperimentalYield.
                    let xml_experimentalYields = xml_PTpairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName);
                    if (xml_experimentalYields.length > 0) {
                        if (xml_experimentalYields.length > 1) console.warn("xml_experimentalYields.length=" + xml_experimentalYields.length);
                        let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_experimentalYields[0]));
                        let experimentalYield = new (0, $ae74a7b44a6504a1$export$c291f4faacd745a6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_experimentalYields[0]), parseFloat(valueString));
                        pTpair.setExperimentalYield(experimentalYield);
                    }
                    // ExperimentalEigenvalue.
                    let xml_experimentalEigenvalues = xml_PTpairs[i].getElementsByTagName((0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName);
                    if (xml_experimentalEigenvalues.length > 0) {
                        if (xml_experimentalEigenvalues.length > 1) console.warn("xml_experimentalEigenvalues.length=" + xml_experimentalEigenvalues.length);
                        let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_experimentalEigenvalues[0]));
                        let experimentalEigenvalue = new (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_experimentalEigenvalues[0]), parseFloat(valueString));
                        pTpair.setExperimentalEigenvalue(experimentalEigenvalue);
                    }
                    // Create pTpairDiv.
                    $7e68913db756e51f$var$createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, i, moleculeKeys, nextLevel);
                }
            }
        } else pTs = new (0, $ae74a7b44a6504a1$export$3be0efe793283834)(new Map());
    } else pTs = new (0, $ae74a7b44a6504a1$export$3be0efe793283834)(new Map());
    conditions.setPTs(pTs);
    // Add collapsible div.
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: conditionsDiv,
        elementToInsertBefore: null,
        content: pTsDiv,
        buttonLabel: (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName,
        buttonFontSize: $7e68913db756e51f$var$fontSize2,
        boundary: $7e68913db756e51f$var$boundary1,
        level: level,
        contentDivId: (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName
    });
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, nextLevel);
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$addString, undefined, $7e68913db756e51f$var$boundary1);
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener("click", ()=>{
        // Create a new PTpair.
        let pTpairAttributes = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair = new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)(pTpairAttributes);
        let pTpairIndex = pTs.addPTpair(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        $7e68913db756e51f$var$createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, pTpairIndex, moleculeKeys, nextLevel);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$var$s_Add_from_spreadsheet, undefined, $7e68913db756e51f$var$boundary1);
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener("click", ()=>{
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, nextLevel);
        let addFromSpreadsheetId = (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName + "_" + "addFromSpreadsheet";
        let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", addFromSpreadsheetId, nextLevel);
        div.appendChild(input);
        pTsDiv.insertBefore(div, addButton);
        // Add an event listener to the inputElement.
        input.addEventListener("change", ()=>{
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray = input.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTpairsArray[0].split("	").forEach((value, i)=>{
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for(let i = 1; i < pTpairsArray.length; i++){
                    let pTpairArray = pTpairsArray[i].split("	");
                    let pIndex = index.get("P");
                    let p = parseFloat(pTpairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTpairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair = new (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244)(pTpairAttributes);
                    pTs.addPTpair(pTpair);
                    let tIndex = index.get("T");
                    let t = parseFloat(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc)) {
                        let excessReactantConIndex = index.get((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc);
                        let excessReactantConc = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex = index.get((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_percentExcessReactantConc);
                        let percentExcessReactantConc = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision)) {
                        let precisionIndex = index.get((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision);
                        let precision = pTpairArray[precisionIndex];
                        pTpairAttributes.set((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision, precision);
                    //console.log("precision=" + precision);
                    }
                    if (index.has((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName)) {
                        let bathGasIndex = index.get((0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
                        let bathGas = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), bathGas));
                    }
                    if (index.has((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName)) {
                        let experimentalRateIndex = index.get((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName);
                        let experimentalRate = pTpairArray[experimentalRateIndex];
                        pTpairAttributes.set((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName, experimentalRate);
                        pTpair.setExperimentalRate(new (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b)(new Map(), parseFloat(experimentalRate)));
                        // Set the attributes of the experimentalRate.
                        // ref1.
                        let experimentalRateRef1Index = index.get((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_ref1);
                        let experimentalRateRef1 = pTpairArray[experimentalRateRef1Index];
                        pTpair.getExperimentalRate()?.setRef1(experimentalRateRef1);
                        // ref2.
                        let experimentalRateRef2Index = index.get((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_ref2);
                        let experimentalRateRef2 = pTpairArray[experimentalRateRef2Index];
                        pTpair.getExperimentalRate()?.setRef2(experimentalRateRef2);
                        // refReaction.
                        let experimentalRateRefReactionIndex = index.get((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_refReaction);
                        let experimentalRateRefReaction = pTpairArray[experimentalRateRefReactionIndex];
                        pTpair.getExperimentalRate()?.setRefReaction(experimentalRateRefReaction);
                        // error.
                        let experimentalRateErrorIndex = index.get((0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_error);
                        let experimentalRateError = pTpairArray[experimentalRateErrorIndex];
                        pTpair.getExperimentalRate()?.setError(parseFloat(experimentalRateError));
                    }
                    if (index.has((0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName)) {
                        let experimentalYieldIndex = index.get((0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName);
                        let experimentalYield = pTpairArray[experimentalYieldIndex];
                        pTpair.setExperimentalYield(new (0, $ae74a7b44a6504a1$export$c291f4faacd745a6)(new Map(), parseFloat(experimentalYield)));
                        // Set the attributes of the experimentalYield.
                        // ref.
                        let experimentalYieldRefIndex = index.get((0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).s_ref);
                        let experimentalYieldRef = pTpairArray[experimentalYieldRefIndex];
                        pTpair.getExperimentalYield()?.setRef(experimentalYieldRef);
                        // yieldTime.
                        let experimentalYieldYieldTimeIndex = index.get((0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).s_yieldTime);
                        let experimentalYieldYieldTime = pTpairArray[experimentalYieldYieldTimeIndex];
                        pTpair.getExperimentalYield()?.setYieldTime(parseFloat(experimentalYieldYieldTime));
                        // error.
                        let experimentalYieldErrorIndex = index.get((0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).s_error);
                        let experimentalYieldError = pTpairArray[experimentalYieldErrorIndex];
                        pTpair.getExperimentalYield()?.setError(parseFloat(experimentalYieldError));
                    }
                    if (index.has((0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName)) {
                        let experimentalEigenvalueIndex = index.get((0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName);
                        let experimentalEigenvalue = pTpairArray[experimentalEigenvalueIndex];
                        pTpair.setExperimentalEigenvalue(new (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1)(new Map(), parseFloat(experimentalEigenvalue)));
                        // Set the attributes of the experimentalEigenvalue.
                        // EigenvalueID.
                        let experimentalEigenvalueEigenvalueIDIndex = index.get((0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName + "_" + (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).s_EigenvalueID);
                        let experimentalEigenvalueEigenvalueID = pTpairArray[experimentalEigenvalueEigenvalueIDIndex];
                        pTpair.getExperimentalEigenvalue()?.setEigenvalueID(experimentalEigenvalueEigenvalueID);
                        // error.
                        let experimentalEigenvalueErrorIndex = index.get((0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName + "_" + (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).s_error);
                        let experimentalEigenvalueError = pTpairArray[experimentalEigenvalueErrorIndex];
                        pTpair.getExperimentalEigenvalue()?.setError(parseFloat(experimentalEigenvalueError));
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex = pTs.pTpairs.length - 1;
                    // Create a new div for the PTpair.
                    $7e68913db756e51f$var$createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDiv.id, pTpairIndex, moleculeKeys, nextLevel);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Remove All", undefined, $7e68913db756e51f$var$boundary1);
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener("click", ()=>{
        pTs.removePTpairs();
        // Remove all elements before the pTsButtonsDiv.
        let child = pTsDiv.firstChild;
        while(child != null && child != pTsButtonsDiv){
            let nextSibling = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
}
/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */ function $7e68913db756e51f$var$createAddConditionsButton(conditionssDiv, level, nextLevel) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Add Conditions", undefined, $7e68913db756e51f$var$level1);
    conditionssDiv.appendChild(button);
    button.addEventListener("click", (event)=>{
        let i = $7e68913db756e51f$var$mesmer.getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        let conditionsID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName, i.toString());
        let conditionsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(conditionsID, $7e68913db756e51f$var$boundary1);
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $ae74a7b44a6504a1$export$363c7374d425f4ad).tagName, (i - 1).toString()));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        // Add the conditions
        let conditions = $7e68913db756e51f$var$addConditions(new Map(), conditionsDiv, elementToInsertBefore, conditionssDiv, i);
        $7e68913db756e51f$var$handleBathGases(conditions, conditionsDiv, null, level, nextLevel);
        $7e68913db756e51f$var$handlePTs(conditions, conditionsDiv, null, level, nextLevel);
        // Add a remove conditions button.
        let removeButton = $7e68913db756e51f$var$addRemoveButton(conditionsDiv, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$mesmer.removeConditions.bind($7e68913db756e51f$var$mesmer), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the control.
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(conditionsID, $7e68913db756e51f$var$ids);
        });
    });
    return button;
}
/**
 * Add and return a new conditions.
 */ function $7e68913db756e51f$var$addConditions(attributes, conditionsDiv, elementToInsertBefore, conditionssDiv, i) {
    let conditions = new (0, $ae74a7b44a6504a1$export$363c7374d425f4ad)(attributes, i);
    $7e68913db756e51f$var$mesmer.addConditions(conditions);
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: conditionssDiv,
        elementToInsertBefore: elementToInsertBefore,
        content: conditionsDiv,
        buttonLabel: "Conditions " + i.toString(),
        buttonFontSize: $7e68913db756e51f$var$fontSize2,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level1,
        contentDivId: conditionsDiv.id
    });
    return conditions;
}
/**
 * @param pTs The PTs.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param pTIndex The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */ function $7e68913db756e51f$var$createPTpairDiv(pTs, pTsDiv, pTpair, conditionsDivId, pTIndex, moleculeKeys, level) {
    let pTpairDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
    pTsDiv.append(pTpairDiv);
    $7e68913db756e51f$var$addPorT(pTpairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    $7e68913db756e51f$var$addAnyUnits((0, $8677001474399221$export$692079bb871c6039).pressureUnits, pTpair.attributes, pTpairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, $7e68913db756e51f$var$boundary1);
    $7e68913db756e51f$var$addPorT(pTpairDiv, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    let id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(conditionsDivId, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName, pTIndex.toString());
    // ExcessReactantConc.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc), [
        pTpair
    ], $7e68913db756e51f$var$createExcessReactantConcInputElement);
    // PercentExcessReactantConc.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_percentExcessReactantConc);
    // Precision.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision), [
        pTpair
    ], $7e68913db756e51f$var$createPrecisionSelectElement);
    // BathGas.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName), [
        pTpair,
        moleculeKeys,
        true
    ], $7e68913db756e51f$var$createBathGasSelectElement);
    // ExperimentalRate.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName), [
        undefined,
        pTpair,
        pTIndex
    ], $7e68913db756e51f$var$addExperimentalRateDetails);
    // ExperimentalYield.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName), [
        undefined,
        pTpair,
        pTIndex
    ], $7e68913db756e51f$var$addExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName), [
        undefined,
        pTpair,
        pTIndex
    ], $7e68913db756e51f$var$addExperimentalEigenvalueDetails);
    // Function to be used to remove a PTpair.
    let removePTpair = (pTpairDiv, i, pTpair)=>{
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) pTs.removePTpair(i);
        pTpair.removeBathGas();
    };
    $7e68913db756e51f$var$addRemoveButton(pTpairDiv, $7e68913db756e51f$var$boundary1, removePTpair, pTpairDiv, pTIndex, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */ function $7e68913db756e51f$var$addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + name, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            setter(parseFloat(target.value));
            console.log(`Set ${name} to ${target.value}`);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = getter().toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, getter().toExponential(), name);
    let input = lwi.querySelector("input");
    input.value = getter().toString();
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    pTpairDiv.appendChild(lwi);
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param attribute The attribute.
 * @param id The id for any created element.
 * @param handlerArgs The arguments for the handler.
 * @param handler The handler function that creates any element.
 */ function $7e68913db756e51f$var$addButtonWithToggle(pTpairDiv, pTpair, attribute, id, handlerArgs, handler) {
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected = attribute + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = attribute + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
        button.textContent = buttonTextContentSelected;
    } else {
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
            if (handler) {
                if (id != undefined && handlerArgs != undefined) {
                    if (handler == $7e68913db756e51f$var$createBathGasSelectElement) {
                        let bathGas = pTpair.getBathGas();
                        if (bathGas == undefined) button.textContent = buttonTextContentDeselected;
                        else {
                            button.textContent = buttonTextContentSelected;
                            if (handlerArgs[1].has(bathGas.value) == false) console.warn("moleculeKeys does not contain " + bathGas.value);
                            div.appendChild(handler(id, bathGas, true));
                        }
                        let input = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    } else {
                        let input = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    }
                }
            }
        } else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
            if (id) // Remove the element.
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(id, $7e68913db756e51f$var$ids);
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */ function $7e68913db756e51f$var$createExcessReactantConcInputElement(id, pTpair) {
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    let value;
    if (pTpair.attributes.has((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc)) value = pTpair.attributes.get((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc);
    else value = NaN.toString();
    console.log((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_excessReactantConc + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    return input;
}
/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */ function $7e68913db756e51f$var$createPrecisionSelectElement(id, pTpair) {
    let value;
    if (pTpair.attributes.has((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision)) {
        value = pTpair.attributes.get((0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision);
        console.log("precision value=" + value);
        console.log("pTpair.attributes" + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(pTpair.attributes));
    } else value = (0, $8677001474399221$export$692079bb871c6039).precisionOptions[0];
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)((0, $8677001474399221$export$692079bb871c6039).precisionOptions, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision, value, id, $7e68913db756e51f$var$boundary1);
    select.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setPrecision(target.value);
        console.log("Set " + (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).s_precision + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    return select;
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */ function $7e68913db756e51f$var$createBathGasSelectElement(id, pTpair, bathGas, first) {
    console.log("createBathGasSelectElement");
    console.log("pTpair " + pTpair.toString());
    let select = $7e68913db756e51f$var$createSelectElementBathGas(Array.from(new Set($7e68913db756e51f$var$molecules.keys())), bathGas, first);
    select.id = id;
    select.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setBathGas(new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    return select;
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 */ function $7e68913db756e51f$var$createSelectElementBathGas(options, bathGas, first) {
    let value;
    if (first) options.push($7e68913db756e51f$var$selectOption);
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf($7e68913db756e51f$var$selectOption);
        if (index > -1) options.splice(index, 1);
    }
    if (bathGas == undefined) {
        bathGas = new (0, $ae74a7b44a6504a1$export$b33a132661f4be58)(new Map(), $7e68913db756e51f$var$selectOption);
        value = $7e68913db756e51f$var$selectOption;
    } else value = bathGas.value;
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName, value, (0, $ae74a7b44a6504a1$export$3be0efe793283834).tagName, $7e68913db756e51f$var$boundary1);
    $7e68913db756e51f$var$selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener("change", (event)=>{
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as a " + (0, $ae74a7b44a6504a1$export$b33a132661f4be58).tagName);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    select.value = value;
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    return select;
}
function $7e68913db756e51f$var$addExperimentalRateDetails(id, pTpair, index) {
    console.log("addExperimentalRateDetails");
    console.log("pTpair " + pTpair.toString());
    return $7e68913db756e51f$var$addExperimentalDetails(pTpair, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + index, (pTpair)=>pTpair.getExperimentalRate(), (pTpair, value)=>pTpair.setExperimentalRate(value), (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b), [
        {
            tagName: (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName,
            type: "number",
            eventHandler: (event, target)=>$7e68913db756e51f$export$b1e4cbf5b56e0e21(pTpair.getExperimentalRate(), target),
            valueGetter: ()=>pTpair.getExperimentalRate().value.toString()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_ref1,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRef1(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRef1()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_ref2,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRef2(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRef2()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_refReaction,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRefReaction(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRefReaction()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).tagName + "_" + (0, $ae74a7b44a6504a1$export$cdeafdd1d936ed5b).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setError(parseFloat(target.value)),
            valueGetter: ()=>pTpair.getExperimentalRate().getError().toString()
        }
    ]);
}
function $7e68913db756e51f$var$addExperimentalYieldDetails(id, pTpair, index) {
    return $7e68913db756e51f$var$addExperimentalDetails(pTpair, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + index, (pTpair)=>pTpair.getExperimentalYield(), (pTpair, value)=>pTpair.setExperimentalYield(value), (0, $ae74a7b44a6504a1$export$c291f4faacd745a6), [
        {
            tagName: (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName,
            type: "number",
            eventHandler: (event, target)=>$7e68913db756e51f$export$b1e4cbf5b56e0e21(pTpair.getExperimentalYield(), target),
            valueGetter: ()=>pTpair.getExperimentalYield().value.toString()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).s_ref,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setRef(target.value),
            valueGetter: ()=>pTpair.getExperimentalYield().getRef()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).s_yieldTime,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setYieldTime(parseFloat(target.value)),
            valueGetter: ()=>pTpair.getExperimentalYield().getYieldTime().toString()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).tagName + "_" + (0, $ae74a7b44a6504a1$export$c291f4faacd745a6).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setError(parseFloat(target.value)),
            valueGetter: ()=>pTpair.getExperimentalYield().getError().toString()
        }
    ]);
}
function $7e68913db756e51f$var$addExperimentalEigenvalueDetails(id, pTpair, index) {
    return $7e68913db756e51f$var$addExperimentalDetails(pTpair, (0, $ae74a7b44a6504a1$export$3fe97ecb6b172244).tagName + "_" + (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName + "_" + index, (pTpair)=>pTpair.getExperimentalEigenvalue(), (pTpair, value)=>pTpair.setExperimentalEigenvalue(value), (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1), [
        {
            tagName: (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName,
            type: "number",
            eventHandler: (event, target)=>$7e68913db756e51f$export$b1e4cbf5b56e0e21(pTpair.getExperimentalEigenvalue(), target),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().value.toString()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName + "_" + (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).s_EigenvalueID,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().getEigenvalueID()
        },
        {
            tagName: (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).tagName + "_" + (0, $ae74a7b44a6504a1$export$ed9dfbc127680fd1).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalEigenvalue()?.setError(parseFloat(target.value)),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().getError().toString()
        }
    ]);
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param getExperimental The getter.
 * @param setExperimental The setter.
 * @param ExperimentalClass The class.
 * @param details The details.
 * @returns HTMLDivElement.
 */ function $7e68913db756e51f$var$addExperimentalDetails(pTpair, id, getExperimental, setExperimental, ExperimentalClass, details) {
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
    div.id = id;
    let experimental = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), NaN);
        setExperimental(pTpair, experimental);
    }
    for (let detail of details){
        let detailId = id + "_" + detail.tagName;
        div.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)(detail.type, detailId, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
            let target = event.target;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ function $7e68913db756e51f$var$processModelParameters(xml) {
    console.log((0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    let modelParametersDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
    let xml_modelParameters = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $8883b31bd809eb64$export$77f098867dc64198).tagName);
    let modelParameters = new (0, $8883b31bd809eb64$export$77f098867dc64198)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_modelParameters));
    $7e68913db756e51f$var$mesmer.setModelParameters(modelParameters);
    $7e68913db756e51f$var$processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    $7e68913db756e51f$var$processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, (0, $b6873406fb778c0b$export$576b56ca6e34780b), modelParameters.setAutomaticallySetMaxEne, modelParameters.removeAutomaticallySetMaxEne);
    $7e68913db756e51f$var$processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, (0, $8883b31bd809eb64$export$aa73446724166cdb), modelParameters.setEnergyAboveTheTopHill, modelParameters.removeEnergyAboveTheTopHill);
    $7e68913db756e51f$var$processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, (0, $8883b31bd809eb64$export$f9c72965e4ddfc8e), modelParameters.setMaxTemperature, modelParameters.removeMaxTemperature);
    return modelParametersDiv;
}
/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */ function $7e68913db756e51f$var$processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$level1);
    modelParametersDiv.appendChild(div);
    let tagName = (0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName;
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, undefined, $7e68913db756e51f$var$boundary1);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    div.appendChild(button);
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + tagName + "_input";
    let ids = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + tagName + "_select";
    let gs;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        gs = new (0, $8883b31bd809eb64$export$26e33f0df9ce919d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, (0, $8677001474399221$export$692079bb871c6039).energyUnits);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    } else {
        valueString = "";
        gs = new (0, $8883b31bd809eb64$export$26e33f0df9ce919d)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the GrainSize already exists
        if (!modelParameters.index.has((0, $8883b31bd809eb64$export$26e33f0df9ce919d).tagName)) {
            $7e68913db756e51f$var$createInputModelParameters(modelParameters, div, gs, id, ids, valueString, modelParameters.setGrainSize, (0, $8677001474399221$export$692079bb871c6039).energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            document.getElementById(id)?.remove();
            document.getElementById(ids)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * Process numerical modelParameters.
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function $7e68913db756e51f$var$processModelParametersN(modelParameters, xml_modelParameters, modelParametersDiv, ModelParameterType, setModelParameter, removeModelParameter) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$level1);
    modelParametersDiv.appendChild(div);
    let tagName = ModelParameterType.tagName;
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, undefined, $7e68913db756e51f$var$boundary1);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    div.appendChild(button);
    let id = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + tagName + "_input";
    let ids = (0, $8883b31bd809eb64$export$77f098867dc64198).tagName + "_" + tagName + "_select";
    let mp;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = parseFloat(valueString);
        mp = new ModelParameterType((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        $7e68913db756e51f$var$createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    } else {
        valueString = "";
        mp = new ModelParameterType(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the ModelParameter already exists
        if (!modelParameters.index.has(tagName)) {
            $7e68913db756e51f$var$createInputModelParameters(modelParameters, div, mp, id, ids, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        } else {
            valueString = mp.value.toExponential();
            removeModelParameter();
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param element The element.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 * @param setElementMethod The method to set the element.
 * @param units The units.
 */ function $7e68913db756e51f$var$createInputModelParameters(modelParameters, div, element, id, ids, valueString, setElementMethod, units) {
    setElementMethod.call(modelParameters, element);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(element, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
    $7e68913db756e51f$var$addAnyUnits(units, element.attributes, div, ids, element.constructor.tagName, $7e68913db756e51f$var$boundary1);
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
    // Create a div for the controls.
    let controlsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$var$boundary1);
    // Get the XML "me:control" element.
    let xml_controls = xml.getElementsByTagName((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName);
    for(let i = 0; i < xml_controls.length; i++){
        let xml_control = xml_controls[i];
        // Create div to contain the control.
        let controlID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, i.toString());
        let controlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(controlID, $7e68913db756e51f$var$boundary1);
        let control = $7e68913db756e51f$var$addControl((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_control), controlDiv, null, controlsDiv, i);
        let level = $7e68913db756e51f$var$level2;
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        $7e68913db756e51f$var$getControlOptionsSimple(control).forEach((option)=>{
            $7e68913db756e51f$var$handleControl(control, controlDiv, i, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        $7e68913db756e51f$var$handleTestMicroRates(control, controlDiv, null, level);
        $7e68913db756e51f$var$handleCalcMethod(control, controlDiv, i, xml_control, level);
        $7e68913db756e51f$var$getControlItems(control).forEach((item)=>{
            $7e68913db756e51f$var$handleControl(control, controlDiv, i, onOffControls, xml_control, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = $7e68913db756e51f$var$addRemoveButton(controlDiv, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$mesmer.removeControl.bind($7e68913db756e51f$var$mesmer), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the control.
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(controlID, $7e68913db756e51f$var$ids);
        });
    }
    // Create an add button to add a control.
    $7e68913db756e51f$var$createAddControlButton(controlsDiv, $7e68913db756e51f$var$level2);
    return controlsDiv;
}
/**
 * @param control The control.
 * @return An array of the on/off control options.
 */ function $7e68913db756e51f$var$getControlOptionsSimple(control) {
    return [
        {
            class: (0, $b6873406fb778c0b$export$7d9247c9879133fb),
            setMethod: control.setCalculateRateCoefficientsOnly,
            removeMethod: control.removeCalculateRateCoefficientsOnly
        },
        {
            class: (0, $b6873406fb778c0b$export$60b233651e162b60),
            setMethod: control.setPrintCellDOS,
            removeMethod: control.removePrintCellDOS
        },
        {
            class: (0, $b6873406fb778c0b$export$7e63e5104be309ff),
            setMethod: control.setPrintCellTransitionStateFlux,
            removeMethod: control.removePrintCellTransitionStateFlux
        },
        {
            class: (0, $b6873406fb778c0b$export$a915db169f144f37),
            setMethod: control.setPrintReactionOperatorColumnSums,
            removeMethod: control.removePrintReactionOperatorColumnSums
        },
        {
            class: (0, $b6873406fb778c0b$export$e7fff349901f700d),
            setMethod: control.setPrintGrainBoltzmann,
            removeMethod: control.removePrintGrainBoltzmann
        },
        {
            class: (0, $b6873406fb778c0b$export$d23243bda4dfae2b),
            setMethod: control.setPrintGrainDOS,
            removeMethod: control.removePrintGrainDOS
        },
        {
            class: (0, $b6873406fb778c0b$export$55888ef4e813a34d),
            setMethod: control.setPrintGrainkbE,
            removeMethod: control.removePrintGrainkbE
        },
        {
            class: (0, $b6873406fb778c0b$export$f8d814a406a0ff5b),
            setMethod: control.setPrintGrainkfE,
            removeMethod: control.removePrintGrainkfE
        },
        {
            class: (0, $b6873406fb778c0b$export$3627f2b606ffd3cb),
            setMethod: control.setPrintTSsos,
            removeMethod: control.removePrintTSsos
        },
        {
            class: (0, $b6873406fb778c0b$export$c5481d114fddc81c),
            setMethod: control.setPrintGrainedSpeciesProfile,
            removeMethod: control.removePrintGrainedSpeciesProfile
        },
        {
            class: (0, $b6873406fb778c0b$export$ec7c00ae1b17b2ab),
            setMethod: control.setPrintGrainTransitionStateFlux,
            removeMethod: control.removePrintGrainTransitionStateFlux
        },
        {
            class: (0, $b6873406fb778c0b$export$8420ab6988728a65),
            setMethod: control.setPrintReactionOperatorSize,
            removeMethod: control.removePrintReactionOperatorSize
        },
        {
            class: (0, $b6873406fb778c0b$export$ed9b9e07e51c2ac1),
            setMethod: control.setPrintSpeciesProfile,
            removeMethod: control.removePrintSpeciesProfile
        },
        {
            class: (0, $b6873406fb778c0b$export$9f7939759d8efd9f),
            setMethod: control.setPrintPhenomenologicalEvolution,
            removeMethod: control.removePrintPhenomenologicalEvolution
        },
        {
            class: (0, $b6873406fb778c0b$export$fc99460819e23ac5),
            setMethod: control.setPrintTunnelingCoefficients,
            removeMethod: control.removePrintTunnelingCoefficients
        },
        {
            class: (0, $b6873406fb778c0b$export$2f2eaac8983031ef),
            setMethod: control.setPrintCrossingCoefficients,
            removeMethod: control.removePrintCrossingCoefficients
        },
        {
            class: (0, $b6873406fb778c0b$export$a3d7e677521f681f),
            setMethod: control.setTestDOS,
            removeMethod: control.removeTestDOS
        },
        {
            class: (0, $b6873406fb778c0b$export$980e5abe9a459423),
            setMethod: control.setTestRateConstants,
            removeMethod: control.removeTestRateConstants
        },
        {
            class: (0, $b6873406fb778c0b$export$5d7dbeba4bf49655),
            setMethod: control.setUseTheSameCellNumberForAllConditions,
            removeMethod: control.removeUseTheSameCellNumberForAllConditions
        },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        {
            class: (0, $b6873406fb778c0b$export$6ffea14bdffd427f),
            setMethod: control.setForceMacroDetailedBalance,
            removeMethod: control.removeForceMacroDetailedBalance
        }
    ];
}
/**
 * @param control The control.
 * @return An array of the control items.
 */ function $7e68913db756e51f$var$getControlItems(control) {
    return [
        {
            class: (0, $b6873406fb778c0b$export$2453e311f702d9c7),
            setMethod: control.setEigenvalues,
            removeMethod: control.removeEigenvalues
        },
        {
            class: (0, $b6873406fb778c0b$export$421603058c6718db),
            setMethod: control.setShortestTimeOfInterest,
            removeMethod: control.removeShortestTimeOfInterest
        },
        {
            class: (0, $b6873406fb778c0b$export$b51d7314540831ed),
            setMethod: control.setMaximumEvolutionTime,
            removeMethod: control.removeMaximumEvolutionTime
        },
        {
            class: (0, $b6873406fb778c0b$export$576b56ca6e34780b),
            setMethod: control.setAutomaticallySetMaxEne,
            removeMethod: control.removeAutomaticallySetMaxEne
        },
        {
            class: (0, $b6873406fb778c0b$export$159b5d3263f1049a),
            setMethod: control.setDiagramEnergyOffset,
            removeMethod: control.removeDiagramEnergyOffset
        }
    ];
}
/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */ function $7e68913db756e51f$var$createAddControlButton(controlsDiv, level) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Add Control", undefined, $7e68913db756e51f$var$level1);
    controlsDiv.appendChild(button);
    button.addEventListener("click", (event)=>{
        let i = $7e68913db756e51f$var$mesmer.getNextControlID();
        console.log("Add Control " + i.toString());
        let controlID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, i.toString());
        let controlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(controlID, $7e68913db756e51f$var$boundary1);
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, (i - 1).toString()));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        // Add the control
        let control = $7e68913db756e51f$var$addControl(new Map(), controlDiv, elementToInsertBefore, controlsDiv, i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        $7e68913db756e51f$var$getControlOptionsSimple(control).forEach((option)=>{
            $7e68913db756e51f$var$handleControl(control, controlDiv, i, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        $7e68913db756e51f$var$handleTestMicroRates(control, controlDiv, null, level);
        $7e68913db756e51f$var$handleCalcMethod(control, controlDiv, i, null, level);
        $7e68913db756e51f$var$getControlItems(control).forEach((item)=>{
            $7e68913db756e51f$var$handleControl(control, controlDiv, i, onOffControls, null, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = $7e68913db756e51f$var$addRemoveButton(controlDiv, $7e68913db756e51f$var$level2, $7e68913db756e51f$var$mesmer.removeControl.bind($7e68913db756e51f$var$mesmer), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the control.
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(controlID, $7e68913db756e51f$var$ids);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */ function $7e68913db756e51f$var$addControl(attributes, controlDiv, elementToInsertBefore, controlsDiv, i) {
    let control = new (0, $b6873406fb778c0b$export$7a7fa4424cb20976)(attributes, i);
    $7e68913db756e51f$var$mesmer.addControl(control);
    (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)({
        divToAddTo: controlsDiv,
        elementToInsertBefore: elementToInsertBefore,
        content: controlDiv,
        buttonLabel: "Control " + i.toString(),
        buttonFontSize: $7e68913db756e51f$var$fontSize2,
        boundary: $7e68913db756e51f$var$boundary1,
        level: $7e68913db756e51f$var$level1,
        contentDivId: controlDiv.id
    });
    return control;
}
/**
 * @param control The control.
 * @param div The div.
 * @param obj The object.
 * @param setControlMethod The set control method. 
 * @param id The id for the input.
 * @param valueString The value string.
 */ function $7e68913db756e51f$var$createInputControlItem(control, div, obj, setControlMethod, id, valueString) {
    setControlMethod.call(control, obj);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, $7e68913db756e51f$var$boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$b1e4cbf5b56e0e21(obj, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * 
 * @param control The control.
 * @param controlDiv The control div.
 * @param index The index.
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */ function $7e68913db756e51f$var$handleControl(control, controlDiv, index, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
    let tagName = ControlClass.tagName;
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, $7e68913db756e51f$var$boundary1);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    if (onOffControls) onOffControls.set(tagName, button);
    let controlInstance;
    let div;
    let id;
    if (level) {
        div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        controlDiv.appendChild(div);
        div.appendChild(button);
        id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, index.toString(), $7e68913db756e51f$var$s_Input);
    }
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
                let value = parseFloat(valueString);
                controlInstance = new ControlClass((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
                $7e68913db756e51f$var$createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
            } else setControlMethod.call(control, controlInstance);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle($7e68913db756e51f$var$s_optionOff);
        } else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        }
    } else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
    }
    button.addEventListener("click", (event)=>{
        if (!control.index.has(tagName)) {
            if (handleInput) $7e68913db756e51f$var$createInputControlItem(control, div, controlInstance, setControlMethod, id, "");
            else setControlMethod.call(control, controlInstance);
            button.textContent = buttonTextContentSelected;
        } else {
            if (handleInput) (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(id);
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * @param control The control.
 * @param controlDiv The control div.
 * @param i The index.
 * @param xml_control The xml control. 
 * @param level The level.
 */ function $7e68913db756e51f$var$handleCalcMethod(control, controlDiv, i, xml_control, level) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
    controlDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$f0bfd84d03c3a22d).tagName;
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, $7e68913db756e51f$var$boundary1);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    // Add the div for the CalcMethod.
    let divCmId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName, (0, $b6873406fb778c0b$export$f0bfd84d03c3a22d).tagName, i.toString());
    let divCm = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(divCmId, $7e68913db756e51f$var$boundary1);
    div.appendChild(divCm);
    let options = (0, $b6873406fb778c0b$export$f0bfd84d03c3a22d).options;
    let divCmDetailsId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmId, "details");
    let divCmDetailsSelectId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmDetailsId, "select");
    let cm;
    let first = true;
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length > 0) {
            if (xml.length > 1) throw new Error("More than one CalcMethod element.");
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]);
            let xsi_type = attributes.get("xsi:type");
            cm = $7e68913db756e51f$var$getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle($7e68913db756e51f$var$s_optionOff);
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle($7e68913db756e51f$var$s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) options.push($7e68913db756e51f$var$selectOption);
            // Remove select.
            //remove(divCmId);
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(divCmDetailsId);
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(divCmDetailsSelectId);
            // Create the select element.
            let select = $7e68913db756e51f$var$createSelectElementCalcMethod(control, div, options, tagName, $7e68913db756e51f$var$selectOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeCalcMethod();
            // Remove any existing div.
            //remove(divCmId);
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(divCmDetailsId);
            (0, $f0396edd0a5c99f7$export$cd7f480d6b8286c3)(divCmDetailsSelectId);
            button.textContent = buttonTextContentDeselected;
        }
        console.log("button.classList " + button.classList);
        console.log("button.className " + button.className);
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
    });
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param controlDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */ function $7e68913db756e51f$var$handleTestMicroRates(control, controlDiv, xml_control, level) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
    controlDiv.appendChild(div);
    let tagName = (0, $b6873406fb778c0b$export$1f37c7c73e401f31).tagName;
    let buttonTextContentSelected = tagName + $7e68913db756e51f$var$selected;
    let buttonTextContentDeselected = tagName + $7e68913db756e51f$var$deselected;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, undefined, $7e68913db756e51f$var$boundary1);
    button.id = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName;
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$var$s_optionOn);
    button.classList.add($7e68913db756e51f$var$s_optionOff);
    let idTmax = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_Tmax";
    let idTmin = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_Tmin";
    let idTstep = (0, $b6873406fb778c0b$export$7a7fa4424cb20976).tagName + "_" + tagName + "_Tstep";
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            $7e68913db756e51f$var$createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle($7e68913db756e51f$var$s_optionOff);
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle($7e68913db756e51f$var$s_optionOn);
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            $7e68913db756e51f$var$createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$var$s_optionOn);
        button.classList.toggle($7e68913db756e51f$var$s_optionOff);
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
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) throw new Error("More than one TestMicroRates element.");
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
 * Get the CalcMethod from the XML.
 * @param control The control.
 * @param divCm The div cm.
 * @param xml The xml.
 * @param options The options.
 * @param attributes The attributes.
 * @param tagName The tag name.
 * @param xsi_type The xsi:type.
 * @param divCmDetailsId The div cm details id.
 * @param divCmDetailsSelectId The div cm details select id.
 * @returns The CalcMethod.
 */ function $7e68913db756e51f$var$getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId) {
    let cm;
    // Create the select element.
    let select = $7e68913db756e51f$var$createSelectElementCalcMethod(control, divCm, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, $7e68913db756e51f$var$boundary1);
    divCmDetails.id = divCmDetailsId;
    divCm.appendChild(divCmDetails);
    if (xsi_type == (0, $b6873406fb778c0b$export$afd374542f6f3da6).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$afd374542f6f3da6).xsi_type2) cm = new (0, $b6873406fb778c0b$export$afd374542f6f3da6)(attributes);
    else if (xsi_type == (0, $b6873406fb778c0b$export$271191b096a55e63).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$271191b096a55e63).xsi_type2) cm = new (0, $b6873406fb778c0b$export$271191b096a55e63)(attributes);
    else if (xsi_type == (0, $b6873406fb778c0b$export$654b70df01671c79).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$654b70df01671c79).xsi_type2) {
        let cmf = new (0, $b6873406fb778c0b$export$654b70df01671c79)(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml = xml[0].getElementsByTagName((0, $b6873406fb778c0b$export$830a50cd13af6e84).tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(fi_xml[0])));
                let fittingIterations = new (0, $b6873406fb778c0b$export$830a50cd13af6e84)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            } else throw new Error("More than one FittingIterations element.");
        }
        $7e68913db756e51f$var$processCalcMethodFitting(divCmDetails, cmf);
    } else if (xsi_type == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type2) {
        let cmm = new (0, $b6873406fb778c0b$export$7968aa666bcf62fa)(attributes);
        cm = cmm;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = (0, $b6873406fb778c0b$export$9f699e98369d9591).tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0])));
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $b6873406fb778c0b$export$9f699e98369d9591), cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, (0, $b6873406fb778c0b$export$ca1e6c3ff9fd3627), cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, (0, $b6873406fb778c0b$export$d3887b529debf19d), cmm.setMarquardtDerivDelta.bind(cmm));
        $7e68913db756e51f$var$processCalcMethodMarquardt(divCmDetails, cmm);
    } else if (xsi_type == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type2) {
        let cmar = new (0, $b6873406fb778c0b$export$fe9781900d201bdf)(attributes);
        cm = cmar;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0]));
                    if (!isNaN(parseFloat(value))) value = parseFloat(value);
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $b6873406fb778c0b$export$93514d28bd18d75a), cmar.setFormat.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$be201676156f3e60), cmar.setPrecision.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$19d20f3642d82681), cmar.setChebNumTemp.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$906be0805438fd80), cmar.setChebNumConc.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$6ab4fe1621c91452), cmar.setChebMaxTemp.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$e9853d49316ae9ae), cmar.setChebMinTemp.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$39eacc768d7e9bb), cmar.setChebMaxConc.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$78194e57ce26d99a), cmar.setChebMinConc.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$96094ac7e31a750e), cmar.setChebTExSize.bind(cmar));
        processElement(xml, (0, $b6873406fb778c0b$export$ae695595d3952700), cmar.setChebPExSize.bind(cmar));
        $7e68913db756e51f$var$processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    } else if (xsi_type == (0, $b6873406fb778c0b$export$16ef3f79998b60b4).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$16ef3f79998b60b4).xsi_type2) {
        let cmtt = new (0, $b6873406fb778c0b$export$16ef3f79998b60b4)(attributes);
        cm = cmtt;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = parseFloat((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0])));
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $b6873406fb778c0b$export$7be1a36e1f74dbc7), cmtt.setTmin.bind(cmtt));
        processElement(xml, (0, $b6873406fb778c0b$export$ac2eb7df727f506d), cmtt.setTmid.bind(cmtt));
        processElement(xml, (0, $b6873406fb778c0b$export$58c8f4b7ec654137), cmtt.setTmax.bind(cmtt));
        processElement(xml, (0, $b6873406fb778c0b$export$7b8cfe3a6a460886), cmtt.setTstep.bind(cmtt));
        $7e68913db756e51f$var$processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    } else if (xsi_type == (0, $b6873406fb778c0b$export$a532500cc43efbef).xsi_type || xsi_type == (0, $b6873406fb778c0b$export$a532500cc43efbef).xsi_type2) {
        let cmsa = new (0, $b6873406fb778c0b$export$a532500cc43efbef)(attributes);
        cm = cmsa;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0]));
                    if (!isNaN(parseFloat(value))) value = parseFloat(value);
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $b6873406fb778c0b$export$37d0520a9fac7849), cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement(xml, (0, $b6873406fb778c0b$export$9a832710e54827ea), cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement(xml, (0, $b6873406fb778c0b$export$b43b57458ce8fb96), cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement(xml, (0, $b6873406fb778c0b$export$e98aeac6c6b1df09), cmsa.setSensitivityVarRedMethod.bind(cmsa));
        $7e68913db756e51f$var$processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    } else throw new Error("Unknown xsi:type: " + xsi_type);
    return cm;
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */ function $7e68913db756e51f$var$processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fittingIterations = cm.getFittingIterations() || new (0, $b6873406fb778c0b$export$830a50cd13af6e84)(new Map(), NaN);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", divCmDetails.id + "_FittingIterations_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            fittingIterations.value = parseInt(target.value);
            console.log("Set FittingIterations to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = fittingIterations.value.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, fittingIterations.value.toString(), (0, $b6873406fb778c0b$export$830a50cd13af6e84).tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */ function $7e68913db756e51f$var$processCalcMethodMarquardt(divCmDetails, cm) {
    function createLabelWithInputForObject(obj, divCmDetails, boundary, level) {
        let id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmDetails.id, obj.tagName, "Input");
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event)=>{
            let target = event.target;
            // Check the value is a number.
            if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                obj.value = parseFloat(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        };
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let marquardtIterations = cm.getMarquardtIterations() || new (0, $b6873406fb778c0b$export$9f699e98369d9591)(new Map(), NaN);
    cm.setMarquardtIterations(marquardtIterations);
    createLabelWithInputForObject(marquardtIterations, divCmDetails, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0);
    // MarquardtTolerance.
    let marquardtTolerance = cm.getMarquardtTolerance() || new (0, $b6873406fb778c0b$export$ca1e6c3ff9fd3627)(new Map(), NaN);
    cm.setMarquardtTolerance(marquardtTolerance);
    createLabelWithInputForObject(marquardtTolerance, divCmDetails, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0);
    // MarquardtDerivDelta.
    let marquardtDerivDelta = cm.getMarquardtDerivDelta() || new (0, $b6873406fb778c0b$export$d3887b529debf19d)(new Map(), NaN);
    cm.setMarquardtDerivDelta(marquardtDerivDelta);
    createLabelWithInputForObject(marquardtDerivDelta, divCmDetails, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */ function $7e68913db756e51f$var$processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new (0, $b6873406fb778c0b$export$93514d28bd18d75a)(new Map(), (0, $b6873406fb778c0b$export$93514d28bd18d75a).options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor, getter, setter, tagName, options) {
        let element = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(tagName, options, tagName, element.value, divCmDetails.id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1);
        lwsElement.querySelector("select")?.addEventListener("change", (event)=>{
            let target = event.target;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement((0, $b6873406fb778c0b$export$93514d28bd18d75a), cm.getFormat.bind(cm), cm.setFormat.bind(cm), (0, $b6873406fb778c0b$export$93514d28bd18d75a).tagName, (0, $b6873406fb778c0b$export$93514d28bd18d75a).options);
    processSelectElement((0, $b6873406fb778c0b$export$93514d28bd18d75a), ()=>format.getRateUnits(), format.setRateUnits.bind(format), (0, $b6873406fb778c0b$export$93514d28bd18d75a).rateUnits, (0, $b6873406fb778c0b$export$93514d28bd18d75a).rateUnitsOptions);
    processSelectElement((0, $b6873406fb778c0b$export$be201676156f3e60), cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), (0, $b6873406fb778c0b$export$be201676156f3e60).tagName, (0, $8677001474399221$export$692079bb871c6039).precisionOptions);
    // "me:chebNumTemp".
    let chebNumTemp = cm.getChebNumTemp() || new (0, $b6873406fb778c0b$export$19d20f3642d82681)(new Map(), NaN);
    cm.setChebNumTemp(chebNumTemp);
    divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", divCmDetails.id + "_ChebNumTemp_input", $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            chebNumTemp.value = parseFloat(target.value);
            console.log("Set ChebNumTemp to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, chebNumTemp.value.toString(), (0, $b6873406fb778c0b$export$19d20f3642d82681).tagName));
    // "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", divCmDetails.id + `_${tagName}_input`, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
            let target = event.target;
            // Check the value is a number.
            if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                element.value = parseFloat(target.value);
                console.log(`Set ${tagName} to ` + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, element.value.toString(), tagName));
    }
    processElement((0, $b6873406fb778c0b$export$906be0805438fd80), cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), (0, $b6873406fb778c0b$export$906be0805438fd80).tagName);
    processElement((0, $b6873406fb778c0b$export$6ab4fe1621c91452), cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), (0, $b6873406fb778c0b$export$6ab4fe1621c91452).tagName);
    processElement((0, $b6873406fb778c0b$export$e9853d49316ae9ae), cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), (0, $b6873406fb778c0b$export$e9853d49316ae9ae).tagName);
    processElement((0, $b6873406fb778c0b$export$39eacc768d7e9bb), cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), (0, $b6873406fb778c0b$export$39eacc768d7e9bb).tagName);
    processElement((0, $b6873406fb778c0b$export$78194e57ce26d99a), cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), (0, $b6873406fb778c0b$export$78194e57ce26d99a).tagName);
    processElement((0, $b6873406fb778c0b$export$96094ac7e31a750e), cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), (0, $b6873406fb778c0b$export$96094ac7e31a750e).tagName);
    processElement((0, $b6873406fb778c0b$export$ae695595d3952700), cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), (0, $b6873406fb778c0b$export$ae695595d3952700).tagName);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */ function $7e68913db756e51f$var$processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", divCmDetails.id + `_${tagName}_input`, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
            let target = event.target;
            // Check the value is a number.
            if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                element.value = parseFloat(target.value);
                console.log(`Set ${tagName} to ` + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, element.value.toString(), tagName));
    }
    processElement((0, $b6873406fb778c0b$export$7be1a36e1f74dbc7), cm.getTmin.bind(cm), cm.setTmin.bind(cm), (0, $b6873406fb778c0b$export$7be1a36e1f74dbc7).tagName);
    processElement((0, $b6873406fb778c0b$export$ac2eb7df727f506d), cm.getTmid.bind(cm), cm.setTmid.bind(cm), (0, $b6873406fb778c0b$export$ac2eb7df727f506d).tagName);
    processElement((0, $b6873406fb778c0b$export$58c8f4b7ec654137), cm.getTmax.bind(cm), cm.setTmax.bind(cm), (0, $b6873406fb778c0b$export$58c8f4b7ec654137).tagName);
    processElement((0, $b6873406fb778c0b$export$7b8cfe3a6a460886), cm.getTstep.bind(cm), cm.setTstep.bind(cm), (0, $b6873406fb778c0b$export$7b8cfe3a6a460886).tagName);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */ function $7e68913db756e51f$var$processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", divCmDetails.id + `_${tagName}_input`, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$level0, (event)=>{
            let target = event.target;
            // Check the value is a number.
            if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                element.value = parseFloat(target.value);
                console.log(`Set ${tagName} to ` + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = NaN.toString();
            }
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, element.value.toString(), tagName));
    }
    processNumberElement((0, $b6873406fb778c0b$export$37d0520a9fac7849), cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), (0, $b6873406fb778c0b$export$37d0520a9fac7849).tagName);
    processNumberElement((0, $b6873406fb778c0b$export$9a832710e54827ea), cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), (0, $b6873406fb778c0b$export$9a832710e54827ea).tagName);
    processNumberElement((0, $b6873406fb778c0b$export$b43b57458ce8fb96), cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), (0, $b6873406fb778c0b$export$b43b57458ce8fb96).tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new (0, $b6873406fb778c0b$export$e98aeac6c6b1df09)(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $b6873406fb778c0b$export$e98aeac6c6b1df09).tagName, (0, $b6873406fb778c0b$export$e98aeac6c6b1df09).options, (0, $b6873406fb778c0b$export$e98aeac6c6b1df09).tagName, (0, $b6873406fb778c0b$export$e98aeac6c6b1df09).options[0], divCmDetails.id, $7e68913db756e51f$var$boundary1, $7e68913db756e51f$var$boundary1));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector("select");
    select?.addEventListener("change", (event)=>{
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log("Set SensitivityVarRedMethod to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
}
/**
 * @param options The options.
 * @param select The select element.
 */ function $7e68913db756e51f$var$selectAnotherOptionEventListener(options, select) {
    select.addEventListener("click", (event)=>{
        if (options[options.length - 1] == $7e68913db756e51f$var$selectOption) options.pop();
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == $7e68913db756e51f$var$selectOption) select.remove(lastIndex);
    });
}
/**
 * @param control The control.
 * @param div The div. 
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param id The id for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */ function $7e68913db756e51f$var$createSelectElementCalcMethod(control, div, options, tagName, value, divCmDetailsId, divCmDetailsSelectId) {
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, tagName, value, divCmDetailsSelectId, $7e68913db756e51f$var$boundary1);
    div.appendChild(select);
    $7e68913db756e51f$var$selectAnotherOptionEventListener(options, select);
    select.addEventListener("change", (event)=>{
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) divCmDetails.remove();
        divCmDetails = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(divCmDetails.id, $7e68913db756e51f$var$boundary1);
        div.appendChild(divCmDetails);
        let target = event.target;
        let value = target.value;
        let attributes = new Map();
        attributes.set("xsi:type", value);
        if (value == (0, $b6873406fb778c0b$export$afd374542f6f3da6).xsi_type || value == (0, $b6873406fb778c0b$export$afd374542f6f3da6).xsi_type2) // "me:simpleCalc", "simpleCalc".
        control.setCalcMethod(new (0, $b6873406fb778c0b$export$afd374542f6f3da6)(attributes));
        else if (value == (0, $b6873406fb778c0b$export$271191b096a55e63).xsi_type || value == (0, $b6873406fb778c0b$export$271191b096a55e63).xsi_type2) // "me:gridSearch", "gridSearch".
        control.setCalcMethod(new (0, $b6873406fb778c0b$export$271191b096a55e63)(attributes));
        else if (value == (0, $b6873406fb778c0b$export$654b70df01671c79).xsi_type || value == (0, $b6873406fb778c0b$export$654b70df01671c79).xsi_type2) {
            let cm = new (0, $b6873406fb778c0b$export$654b70df01671c79)(attributes);
            control.setCalcMethod(cm);
            $7e68913db756e51f$var$processCalcMethodFitting(divCmDetails, cm);
        } else if (value == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type || value == (0, $b6873406fb778c0b$export$7968aa666bcf62fa).xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm = new (0, $b6873406fb778c0b$export$7968aa666bcf62fa)(attributes);
            control.setCalcMethod(cm);
            $7e68913db756e51f$var$processCalcMethodMarquardt(divCmDetails, cm);
        } else if (value == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type || value == (0, $b6873406fb778c0b$export$fe9781900d201bdf).xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm = new (0, $b6873406fb778c0b$export$fe9781900d201bdf)(attributes);
            control.setCalcMethod(cm);
            $7e68913db756e51f$var$processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        } else if (value == (0, $b6873406fb778c0b$export$16ef3f79998b60b4).xsi_type || value == (0, $b6873406fb778c0b$export$16ef3f79998b60b4).xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm = new (0, $b6873406fb778c0b$export$16ef3f79998b60b4)(attributes);
            control.setCalcMethod(cm);
            $7e68913db756e51f$var$processCalcMethodThermodynamicTable(divCmDetails, cm);
        } else if (value == (0, $b6873406fb778c0b$export$a532500cc43efbef).xsi_type || value == (0, $b6873406fb778c0b$export$a532500cc43efbef).xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm = new (0, $b6873406fb778c0b$export$a532500cc43efbef)(new Map());
            control.setCalcMethod(cm);
            $7e68913db756e51f$var$processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        } else throw new Error("Unknown CalcMethod type.");
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    return select;
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
    if ($7e68913db756e51f$var$mesmer == null) {
        alert("No Mesmer object to save.");
        return;
    } else {
        console.log("saveXML");
        const pad = "  ";
        // Create a Blob object from the data
        let blob = new Blob([
            (0, $8677001474399221$export$692079bb871c6039).header,
            $7e68913db756e51f$var$mesmer.toXML(pad, "")
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
}


export {$7e68913db756e51f$export$b1e4cbf5b56e0e21 as setNumberNode, $7e68913db756e51f$export$819b5ff7dff3652c as setNumberArrayNode};
//# sourceMappingURL=index.9972b8bb.js.map
