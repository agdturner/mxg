import {
    get, rescale, setToString
} from './util.js';

import {
    getAttribute, getFirstElement, getFirstChildNode, getNodeValue, getTag, getEndTag,
    getAttributes, toHTML, getSingularElement, TagWithAttributes
} from './xml.js';

import {
    Molecule, Atom, Bond, EnergyTransferModel, DeltaEDown, DOSCMethod, Property, MoleculeRef, AtomArray, BondArray, PropertyList, PropertyScalar, PropertyArray, ExtraDOSCMethod, BondRef, HinderedRotorPotential, PotentialPoint, Periodicity, ReservoirSize
} from './molecule.js';

import {
    Reaction, TransitionState, Reactant, Product, MCRCMethod, MesmerILT,
    PreExponential, ActivationEnergy, NInfinity, ZhuNakamuraCrossing, Tunneling, TInfinity, ExcessReactantConc
} from './reaction.js';

import {
    arrayToString, toNumberArray, isNumeric
} from './util.js';

import {
    getTD, getTH, getTR, getInput
} from './html.js';

import {
    drawLevel, drawLine, getTextHeight, getTextWidth
} from './canvas.js';

import {
    BathGas, Conditions, ExperimentRate, PTpair, PTs
} from './conditions.js';

import {
    EnergyAboveTheTopHill, GrainSize, ModelParameters
} from './modelParameters.js';

import {
    Control, DiagramEnergyOffset, Eigenvalues, HideInactive, TestDOS, PrintSpeciesProfile,
    TestMicroRates, TestRateConstant, PrintGrainDOS, PrintCellDOS, PrintReactionOperatorColumnSums,
    PrintTunnellingCoefficients, PrintGrainkfE, PrintGrainBoltzmann, PrintGrainkbE
} from './control.js';

/*
// Code for service worker for Progressive Web App (PWA).
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        //const swUrl = new URL('../../../sw.js', import.meta.url);
        const swUrl = new URL('../../../sw.js', document.baseURI);
        navigator.serviceWorker.register(swUrl);
    });
}
*/
/*  
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../../../sw.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
*/

//declare var global: any;
//const globalScope = (typeof global !== 'undefined') ? global : window;

//if (typeof global === 'undefined') {
//    (window as any).global = window;
//}

declare global {
    interface Window {
        loadXML(): void;
        saveXML(): void;
    }
}

// Expected XML tags strings.
let me_title_s: string = 'me:title';

/**
 * For storing me.title.
 */
let title: string;

/**
 * For storing the XML root start tag.
 */
let mesmerStartTag: string;

/**
 * For storing the XML root end tag.
 */
let mesmerEndTag: string;

/**
 * A map of molecules with Molecule.id as key and Molecules as values.
 */
let molecules: Map<string, Molecule> = new Map();

/**
 * For storing the maximum molecule energy in a reaction.
 */
let maxMoleculeEnergy: number = -Infinity;

/**
 * For storing the minimum molecule energy in a reaction.
 */
let minMoleculeEnergy: number = Infinity;

/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */
let reactions: Map<string, Reaction> = new Map();

/**
 * The header of the XML file.
 */
const header: string = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;

/**
 * The filename of the mesmer input file loaded.
 */
let input_xml_filename: string;

/**
 * The load button.
 */
let loadButton: HTMLElement | null;

/**
 * The save button.
 */
let saveButton: HTMLElement | null;

/**
 * The XML text element.
 */
let me_title: HTMLCollectionOf<Element> | null;
let molecules_title: HTMLElement | null;
let molecules_table: HTMLElement | null;
let reactions_title: HTMLElement | null;
let reactions_table: HTMLElement | null;
let reactions_diagram_title: HTMLElement | null;
let conditions_title: HTMLElement | null;
let conditions_table: HTMLElement | null;
let modelParameters_title: HTMLElement | null;
let modelParameters_table: HTMLElement | null;
let xml_title: HTMLElement | null;
let xml_text: HTMLElement | null;

/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */
function displayXML(xml: string) {
    //console.log("xml=" + xml);
    if (xml_title != null) {
        xml_title.innerHTML = input_xml_filename;
    }
    if (xml_text != null) {
        xml_text.innerHTML = toHTML(xml);
    }
}

/**
 * Parses xml to initilise molecules.
 * @param {XMLDocument} xml The XML document.
 */
function initMolecules(xml: XMLDocument): void {
    let moleculeList_s: string = 'moleculeList';
    console.log("Read and store " + moleculeList_s);
    let xml_moleculeList: Element = getSingularElement(xml, moleculeList_s);
    // Set molecules_title.
    molecules_title = document.getElementById("molecules_title");
    if (molecules_title != null) {
        molecules_title.innerHTML = "Molecules";
    }
    // xml_moleculeList should have one or more molecule elements and no other elements.
    let moleculeListTagNames: Set<string> = new Set();
    xml_moleculeList.childNodes.forEach(function (node) {
        moleculeListTagNames.add(node.nodeName);
    });
    if (moleculeListTagNames.size != 1) {
        if (!(moleculeListTagNames.size == 2 && moleculeListTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            moleculeListTagNames.forEach(x => console.error(x));
            throw new Error("Additional tag names in moleculeList:");
        }
    }
    if (!moleculeListTagNames.has(Molecule.tagName)) {
        throw new Error("Expecting tags with \"" + Molecule.tagName + "\" tagName but there are none!");
    }
    let xml_molecules: HTMLCollectionOf<Element> = xml_moleculeList.getElementsByTagName(Molecule.tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    // Process each molecule.
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf like this.
    for (let i = 0; i < xml_molecules.length; i++) {
        // Set attributes.
        let attributes: Map<string, string> = getAttributes(xml_molecules[i]);
        let moleculeTagNames: Set<string> = new Set();
        let cns: NodeListOf<ChildNode> = xml_molecules[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for (let j = 0; j < cns.length; j++) {
            let cn: ChildNode = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!moleculeTagNames.has(cn.nodeName)) {
                moleculeTagNames.add(cn.nodeName);
            } else {
                // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                if (cn.nodeName != "#text") {
                    console.warn("Another ChildNode with nodeName=" + cn.nodeName);
                    //throw new Error("cn.nodeName appears twice in molecule.");
                }
            }
            //console.log(cn.nodeName);
        }
        //});
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));

        // Init atomsNode.
        let atomsNode: AtomArray | Atom | undefined;
        // There can be an individual atom not in an atom array, or an attom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName(AtomArray.tagName);
        if (xml_atomArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + AtomArray.tagName + " but finding " + xml_atomArrays.length + "!");
        }
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms: HTMLCollectionOf<Element> = xml_atomArray.getElementsByTagName(Atom.tagName);
            if (xml_atoms.length < 2) {
                throw new Error("Expecting 2 or more atoms in " + AtomArray.tagName + ", but finding " + xml_atoms.length + "!");
            }
            let atoms: Atom[] = [];
            for (let j = 0; j < xml_atoms.length; j++) {
                atoms.push(new Atom(getAttributes(xml_atoms[j])));
            }
            atomsNode = new AtomArray(getAttributes(xml_atomArray), atoms);
            moleculeTagNames.delete(AtomArray.tagName);
        } else {
            let xml_atoms: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Atom.tagName);
            if (xml_atoms.length == 1) {
                atomsNode = new Atom(getAttributes(xml_atoms[0]));
            } else if (xml_atoms.length > 1) {
                throw new Error("Expecting 1 " + Atom.tagName + " but finding " + xml_atoms.length + ". Should these be in an " + AtomArray.tagName + "?");
            }
        }
        moleculeTagNames.delete(Atom.tagName);

        // Init bondsNode.
        let bondsNode: BondArray | Bond | undefined;

        // There can be an individual bond not in a bond array, or a bond array.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName(BondArray.tagName);
        if (xml_bondArrays.length > 1) {
            throw new Error("Expecting 1 or 0 " + BondArray.tagName + " but finding " + xml_bondArrays.length + "!");
        }
        if (xml_bondArrays.length == 1) {
            let xml_bondArray = xml_bondArrays[0];
            let xml_bonds: HTMLCollectionOf<Element> = xml_bondArray.getElementsByTagName(Bond.tagName);
            // There may be only 1 bond in a BondArray.
            let bonds: Bond[] = [];
            for (let j = 0; j < xml_bonds.length; j++) {
                bonds.push(new Bond(getAttributes(xml_bonds[j])));
            }
            bondsNode = new BondArray(getAttributes(xml_bondArray), bonds);
            moleculeTagNames.delete(BondArray.tagName);
        } else {
            let xml_bonds: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Bond.tagName);
            if (xml_bonds.length == 1) {
                bondsNode = new Bond(getAttributes(xml_bonds[0]));
            } else if (xml_bonds.length > 1) {
                throw new Error("Expecting 1 " + Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + BondArray.tagName + "?");
            }
        }
        moleculeTagNames.delete(Bond.tagName);

        // Init propertiesNode.
        let propertiesNode: PropertyList | Property | undefined;

        // There can be an individual property not in a propertyList.
        let xml_PLs = xml_molecules[i].getElementsByTagName(PropertyList.tagName);
        if (xml_PLs.length > 1) {
            throw new Error("Expecting 1 or 0 " + PropertyList.tagName + " but finding " + xml_PLs.length + "!");
        }
        if (xml_PLs.length == 1) {
            let xml_PL = xml_PLs[0];
            let xml_Ps: HTMLCollectionOf<Element> = xml_PL.getElementsByTagName(Property.tagName);
            if (xml_Ps.length < 2) {
                throw new Error("Expecting 2 or more " + Property.tagName + " in " + PropertyList.tagName + ", but finding " + xml_Ps.length + "!");
            }
            let properties: Map<string, Property> = new Map();
            for (let j = 0; j < xml_Ps.length; j++) {
                let property: Property = getProperty(xml_Ps[j]);
                let dictRef: string = property.attributes.get("dictRef") as string;
                properties.set(dictRef, property);
            }
            propertiesNode = new PropertyList(getAttributes(xml_PL), properties);
            moleculeTagNames.delete(PropertyList.tagName);
        } else {
            let xml_Ps: HTMLCollectionOf<Element> = xml_molecules[i].getElementsByTagName(Property.tagName);
            if (xml_Ps.length > 1) {
                throw new Error("Expecting 1 " + Property.tagName + " but finding " + xml_Ps.length + ". Should these be in a " + PropertyList.tagName + "?");
            }
            propertiesNode = getProperty(xml_Ps[0]);
        }
        moleculeTagNames.delete(Property.tagName);

        let els: HTMLCollectionOf<Element> | null;

        // Read energyTransferModel
        moleculeTagNames.delete(EnergyTransferModel.tagName);
        let energyTransferModel: EnergyTransferModel | undefined = undefined;
        els = xml_molecules[i].getElementsByTagName(EnergyTransferModel.tagName);
        if (els != null) {
            if (els.length > 0) {
                if (els.length != 1) {
                    throw new Error("energyTransferModel length=" + els.length);
                }
                let xml_deltaEDown: HTMLCollectionOf<Element> = els[0].getElementsByTagName(DeltaEDown.tagName);
                if (xml_deltaEDown != null) {
                    let deltaEDowns: DeltaEDown[] = [];
                    for (let k = 0; k < xml_deltaEDown.length; k++) {
                        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_deltaEDown[k])));
                        let deltaEDown: DeltaEDown = new DeltaEDown(getAttributes(xml_deltaEDown[k]), value);
                        deltaEDowns.push(deltaEDown);
                    }
                    energyTransferModel = new EnergyTransferModel(getAttributes(els[0]), deltaEDowns);
                }
            }
        }

        // Read DOSCMethod
        moleculeTagNames.delete(DOSCMethod.tagName);
        let dOSCMethod: DOSCMethod | undefined = undefined;
        els = xml_molecules[i].getElementsByTagName(DOSCMethod.tagName);
        if (els != null) {
            let el: Element | null = els[0];
            if (el != null) {
                dOSCMethod = new DOSCMethod(getAttributes(el));
            }
        }

        // Read ExtraDOSCMethod.
        moleculeTagNames.delete(ExtraDOSCMethod.tagName);
        let extraDOSCMethod: ExtraDOSCMethod | undefined = undefined;
        els = xml_molecules[i].getElementsByTagName(ExtraDOSCMethod.tagName);
        if (els.length > 0) {
            if (els.length != 1) {
                throw new Error("Expecting only 1 extra DOSCMethod, but there are " + els.length);
            }
            // Read bondRef.
            let bondRefs: HTMLCollectionOf<Element> = els[0].getElementsByTagName(BondRef.tagName);
            let bondRef: BondRef | undefined;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) {
                    throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                }
                bondRef = new BondRef(getAttributes(bondRefs[0]), getNodeValue(getFirstChildNode(bondRefs[0])));
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials: HTMLCollectionOf<Element> = els[0].getElementsByTagName(HinderedRotorPotential.tagName);
            let hinderedRotorPotential: HinderedRotorPotential | undefined;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) {
                    throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                }
                // Load PotentialPoints.
                let potentialPoints: PotentialPoint[] = [];
                let xml_potentialPoints: HTMLCollectionOf<Element> = hinderedRotorPotentials[0].getElementsByTagName(PotentialPoint.tagName);
                for (let k = 0; k < xml_potentialPoints.length; k++) {
                    potentialPoints.push(new PotentialPoint(getAttributes(xml_potentialPoints[k])));
                }
                hinderedRotorPotential = new HinderedRotorPotential(getAttributes(hinderedRotorPotentials[0]), potentialPoints);
            }
            // Read periodicities.
            let xml_periodicities: HTMLCollectionOf<Element> = els[0].getElementsByTagName(Periodicity.tagName);
            let periodicity: Periodicity | undefined;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) {
                    throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                }
                periodicity = new Periodicity(getAttributes(xml_periodicities[0]),
                    parseFloat(getNodeValue(getFirstChildNode(xml_periodicities[0]))));
            }
            extraDOSCMethod = new ExtraDOSCMethod(getAttributes(els[0]), bondRef, hinderedRotorPotential, periodicity);
        }

        // Read reservoirSize.
        moleculeTagNames.delete(ReservoirSize.tagName);
        let reservoirSize: ReservoirSize | undefined;
        els = xml_molecules[i].getElementsByTagName(ReservoirSize.tagName);
        if (els.length > 0) {
            if (els.length != 1) {
                throw new Error("Expecting only 1 reservoirSize, but there are " + els.length);
            }
            reservoirSize = new ReservoirSize(getAttributes(els[0]), parseFloat(getNodeValue(getFirstChildNode(els[0]))));
        }

        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach(x => console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
        }

        let molecule = new Molecule(attributes, atomsNode, bondsNode, propertiesNode, energyTransferModel, dOSCMethod, 
            extraDOSCMethod, reservoirSize);
        //console.log(molecule.toString());
        molecules.set(molecule.id, molecule);
    }
}

function addEventListenersToMoleculesTable(): void {
    // Add event listeners to molecules table.
    molecules.forEach(function (molecule, id) {
        let energyKey = id + "_energy";
        let inputElement = document.getElementById(energyKey) as HTMLInputElement;
        if (inputElement) {
            inputElement.addEventListener('change', (event) => {
                // The input is set up to call the function setEnergy(HTMLInputElement),
                // so the following commented code is not used. As the input was setup 
                // as a number type. The any non numbers were It seems that there are two 
                // ways to get and store the value of the input element.
                // Both ways have been kept for now as I don't know which way is better!
                let eventTarget = event.target as HTMLInputElement;
                let inputValue = eventTarget.value;
                if (isNumeric(inputValue)) {
                    molecule.setEnergy(parseFloat(inputValue));
                    console.log("Set energy of " + id + " to " + inputValue + " kJ/mol");
                } else {
                    alert("Energy input for " + id + " is not a number");
                    let inputElement = document.getElementById(energyKey) as HTMLInputElement;
                    inputElement.value = molecule.getEnergy().toString();
                    console.log("inputValue=" + inputValue);
                    console.log("Type of inputValue: " + typeof inputValue);
                }
            });
        }
    });
}


function getProperty(xml_property: Element): Property {
    let attribs: Map<string, string> = getAttributes(xml_property);
    let children: HTMLCollectionOf<Element> = xml_property.children;
    if (children.length != 1) {
        throw new Error("Expecting 1 child but finding " + children.length);
    }
    let nodeAttributes: Map<string, string> = getAttributes(children[0]);
    let nodeName: string = children[0].nodeName; // Expecting scalar or array
    let textContent: string | null = children[0].textContent;
    if (textContent == null) {
        console.error("nodeName");
        throw new Error('textContent is null');
    }
    textContent = textContent.trim();
    let dictRef: string | undefined = attribs.get("dictRef");
    //console.log("dictRef=" + dictRef);
    if (dictRef == null) {
        throw new Error('dictRef is null');
    }
    //console.log("fcnn=" + fcnn);
    if (nodeName == PropertyScalar.tagName) {
        let value: number = parseFloat(textContent);
        return new Property(attribs, new PropertyScalar(nodeAttributes, value));
    } else if (nodeName == PropertyArray.tagName) {
        return new Property(attribs, new PropertyArray(nodeAttributes, toNumberArray(textContent.split(/\s+/)), " "));
    } else if (nodeName == "matrix") {
        throw new Error("Unexpected nodeName: " + nodeName);
    } else {
        throw new Error("Unexpected nodeName: " + nodeName);
    }
}

let inputElement: HTMLInputElement;

//function reload() {
function loadXML() {
    inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.onchange = function () {
        if (inputElement.files) {
            for (let i = 0; i < inputElement.files.length; i++) {
                console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            }
            let file: File | null = inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            input_xml_filename = file.name;
            if (xml_text != null) {
                let reader = new FileReader();
                let chunkSize = 1024 * 1024; // 1MB
                let start = 0;
                let contents = '';
                reader.onload = function (e) {
                    if (!e.target) {
                        throw new Error('Event target is null');
                    }
                    contents += (e.target as FileReader).result as string;
                    if (file != null) {
                        if (start < file.size) {
                            // Read the next chunk
                            let blob = file.slice(start, start + chunkSize);
                            reader.readAsText(blob);
                            start += chunkSize;
                        } else {
                            // All chunks have been read
                            contents = contents.trim();
                            displayXML(contents);
                            let parser = new DOMParser();
                            let xml = parser.parseFromString(contents, "text/xml");
                            parse(xml);
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
                            */
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
    inputElement.click();
    // Add event listener to load button.
    loadButton = document.getElementById('load_button');
    if (loadButton != null) {
        //loadButton.addEventListener('click', reload);
        loadButton.addEventListener('click', loadXML);
    }

    // Ensure save button is displayed.
    saveButton = document.getElementById('saveButton');
    if (saveButton != null) {
        saveButton.style.display = 'inline';
    }
}

/**
 * Once the DOM is loaded, set up the elements.
 */
document.addEventListener('DOMContentLoaded', (event) => {

    // Initialise elements
    xml_title = document.getElementById("xml_title");
    xml_text = document.getElementById("xml_text");


    window.loadXML = function () {
        loadXML();
        //reload();
    }
});

/**
 * Set the title.
 * @param {XMLDocument} xml The XML document.
 */
function setTitle(xml: XMLDocument) {
    me_title = xml.getElementsByTagName(me_title_s);
    if (me_title == null) {
        throw new Error(me_title_s + ' not found');
    } else {
        if (me_title.length != 1) {
            throw new Error('Multiple ' + me_title_s + ' elements found');
        } else {
            title = me_title[0].childNodes[0].nodeValue as string;
            title = title.trim();
            console.log("Title=" + title);
            let e: HTMLElement | null = document.getElementById("title");
            if (e != null) {
                e.innerHTML = title;
            }
        }
    }
}

/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */
function parse(xml: XMLDocument) {

    /**
     * Set mesmer_xml start tag.
     */
    mesmerStartTag = "\n";
    let documentElement: HTMLElement = xml.documentElement;
    if (documentElement == null) {
        throw new Error("Document element not found");
    } else {
        let tagName: string = documentElement.tagName;
        mesmerStartTag += "<" + tagName;
        console.log(tagName);
        mesmerEndTag = getEndTag(tagName, "", true);
        let first: boolean = true;
        let pad = " ".repeat(tagName.length + 2);
        let names: string[] = documentElement.getAttributeNames();
        names.forEach(function (name) {
            let attribute = documentElement.getAttribute(name);
            let na = `${name}="${attribute}"`;
            if (first) {
                first = false;
                mesmerStartTag += " " + na;
            } else {
                mesmerStartTag += "\n" + pad + na;
            }
        });
        mesmerStartTag += ">";
        //console.log(mesmerStartTag);
    }

    /**
     *  Set title.
     */
    setTitle(xml);

    /**
     * Generate molecules table.
     */
    initMolecules(xml);
    addEventListenersToMoleculesTable();
    displayMoleculesTable();

    /**
     * Generate reactions table.
     */
    initReactions(xml);
    displayReactionsTable();
    displayReactionsDiagram();

    /**
     * Generate conditions table.
     */
    initConditions(xml);
    displayConditions();

    /**
     * Generate parameters table.
     */
    initModelParameters(xml);
    displayModelParameters();

    /**
     * Generate control table.
     */
    initControl(xml);
    displayControl();
}

let conditions: Conditions;

/**
 * Parse xml to initialise conditions.
 * @param {XMLDocument} xml The XML document.
 */
function initConditions(xml: XMLDocument): void {
    console.log(Conditions.tagName);
    let xml_conditions: Element = getSingularElement(xml, Conditions.tagName);
    // Set conditions_title.
    conditions_title = document.getElementById("conditions_title");
    if (conditions_title != null) {
        conditions_title.innerHTML = "Conditions";
    }
    // BathGas
    let xml_bathGas: Element = getFirstElement(xml_conditions, BathGas.tagName);
    let attributes: Map<string, string> = getAttributes(xml_bathGas);
    let moleculeID: string = getNodeValue(getFirstChildNode(xml_bathGas));
    let bathGas: BathGas = new BathGas(attributes, moleculeID, molecules);
    // PTs
    let xml_PTs: Element = getSingularElement(xml_conditions, 'me:PTs');
    let xml_PTPairs: HTMLCollectionOf<Element> = xml_PTs.getElementsByTagName(PTpair.tagName);
    // Process each PTpair.
    let pTs: PTpair[] = [];
    for (let i = 0; i < xml_PTPairs.length; i++) {
        // Add optional BathGas
        let xml_bathGass: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(BathGas.tagName);
        let pTBathGas: BathGas | undefined; 
        if (xml_bathGass.length > 0) {
            if (xml_bathGass.length > 1) {
                console.warn("xml_bathGass.length=" + xml_bathGass.length);
            }
            pTBathGas = new BathGas(getAttributes(xml_bathGass[0]), getNodeValue(getFirstChildNode(xml_bathGass[0])), molecules);
            console.log("pTBathGas" + pTBathGas.toString());
        }
        // Add optional ExperimentRate
        let xml_experimentRates: HTMLCollectionOf<Element> = xml_PTPairs[i].getElementsByTagName(ExperimentRate.tagName);
        let experimentRate: ExperimentRate | undefined;
        if (xml_experimentRates.length > 0) {
            if (xml_experimentRates.length > 1) {
                console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
            }
            experimentRate = new ExperimentRate(getAttributes(xml_experimentRates[0]), parseFloat(getNodeValue(getFirstChildNode(xml_experimentRates[0]))));
            console.log("experimentRate" + experimentRate.toString());
        }
        pTs.push(new PTpair(getAttributes(xml_PTPairs[i]), pTBathGas, experimentRate));
        //console.log(pTs[i].toString()); // For debugging.
    }
    conditions = new Conditions(getAttributes(xml_conditions), bathGas, new PTs(getAttributes(xml_PTs), pTs));
}

let modelParameters: ModelParameters;

/**
 * Parses xml to initialise modelParameters.
 * @param {XMLDocument} xml The XML document.
 */
function initModelParameters(xml: XMLDocument): void {
    console.log(ModelParameters.tagName);
    let xml_modelParameters: Element = getSingularElement(xml, ModelParameters.tagName);
    // Set modelParameters_title.
    modelParameters_title = document.getElementById("modelParameters_title");
    if (modelParameters_title != null) {
        modelParameters_title.innerHTML = "Model Parameters";
    }
    // GrainSize
    let xml_grainSize: Element = getSingularElement(xml_modelParameters, GrainSize.tagName);
    let attributes: Map<string, string> = getAttributes(xml_grainSize);
    let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_grainSize)));
    let grainSize: GrainSize = new GrainSize(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill: Element = getSingularElement(xml_modelParameters, EnergyAboveTheTopHill.tagName);
    let energyAboveTheTopHill: EnergyAboveTheTopHill = new EnergyAboveTheTopHill(getAttributes(xml_energyAboveTheTopHill),
        parseFloat(getNodeValue(getFirstChildNode(xml_energyAboveTheTopHill))));

    modelParameters = new ModelParameters(grainSize, energyAboveTheTopHill);
}

let control: Control;

/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */
function initControl(xml: XMLDocument): void {
    console.log(Control.tagName);
    let xml_control: Element = getSingularElement(xml, Control.tagName);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) {
        control_title.innerHTML = "Control";
    }
    // me:testDOS
    let xml_testDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestDOS.tagName);
    let testDOS: TestDOS | undefined;
    if (xml_testDOS.length == 1) {
        testDOS = new TestDOS();
    } else {
        if (xml_testDOS.length > 1) {
            console.warn("testDOS.length=" + xml_testDOS.length);
        }
    }
    // me:printSpeciesProfile
    let xml_printSpeciesProfile: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintSpeciesProfile.tagName);
    let printSpeciesProfile: PrintSpeciesProfile | undefined;
    if (xml_printSpeciesProfile.length == 1) {
        printSpeciesProfile = new PrintSpeciesProfile();
    } else {
        if (xml_printSpeciesProfile.length > 1) {
            console.warn("printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
        }
    }
    // me:testMicroRates
    let xml_testMicroRates: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestMicroRates.tagName);
    let testMicroRates: TestMicroRates | undefined;
    if (xml_testMicroRates.length == 1) {
        testMicroRates = new TestMicroRates();
    } else {
        if (xml_testMicroRates.length > 1) {
            console.warn("testMicroRates.length=" + xml_testMicroRates.length);
        }
    }
    // me:testRateConstant
    let xml_testRateConstant: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(TestRateConstant.tagName);
    let testRateConstant: TestRateConstant | undefined;
    if (xml_testRateConstant.length == 1) {
        testRateConstant = new TestRateConstant();
    } else {
        if (xml_testRateConstant.length > 1) {
            console.warn("testRateConstant.length=" + xml_testRateConstant.length);
        }
    }
    // me:printGrainDOS
    let xml_printGrainDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainDOS.tagName);
    let printGrainDOS: PrintGrainDOS | undefined;
    if (xml_printGrainDOS.length == 1) {
        printGrainDOS = new PrintGrainDOS();
    } else {
        if (xml_printGrainDOS.length > 1) {
            console.warn("printGrainDOS.length=" + xml_printGrainDOS.length);
        }
    }
    // me:printCellDOS
    let xml_printCellDOS: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintCellDOS.tagName);
    let printCellDOS: PrintCellDOS | undefined;
    if (xml_printCellDOS.length == 1) {
        printCellDOS = new PrintCellDOS();
    } else {
        if (xml_printCellDOS.length > 1) {
            console.warn("printCellDOS.length=" + xml_printCellDOS.length);
        }
    }
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintReactionOperatorColumnSums.tagName);
    let printReactionOperatorColumnSums: PrintReactionOperatorColumnSums | undefined;
    if (xml_printReactionOperatorColumnSums.length == 1) {
        printReactionOperatorColumnSums = new PrintReactionOperatorColumnSums();
    } else {
        if (xml_printReactionOperatorColumnSums.length > 1) {
            console.warn("printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
        }
    }
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintTunnellingCoefficients.tagName);
    let printTunnellingCoefficients: PrintTunnellingCoefficients | undefined;
    if (xml_printTunnellingCoefficients.length == 1) {
        printTunnellingCoefficients = new PrintTunnellingCoefficients();
    } else {
        if (xml_printTunnellingCoefficients.length > 1) {
            console.warn("printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
        }
    }
    // me:printGrainkfE
    let xml_printGrainkfE: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainkfE.tagName);
    let printGrainkfE: PrintGrainkfE | undefined;
    if (xml_printGrainkfE.length == 1) {
        printGrainkfE = new PrintGrainkfE();
    } else {
        if (xml_printGrainkfE.length > 1) {
            console.warn("printGrainkfE.length=" + xml_printGrainkfE.length);
        }
    }
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainBoltzmann.tagName);
    let printGrainBoltzmann: PrintGrainBoltzmann | undefined;
    if (xml_printGrainBoltzmann.length == 1) {
        printGrainBoltzmann = new PrintGrainBoltzmann();
    } else {
        if (xml_printGrainBoltzmann.length > 1) {
            console.warn("printGrainBoltzmann.length=" + xml_printGrainBoltzmann.length);
        }
    }
    // me:printGrainkbE
    let xml_printGrainkbE: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(PrintGrainkbE.tagName);
    let printGrainkbE: PrintGrainkbE | undefined;
    if (xml_printGrainkbE.length == 1) {
        printGrainkbE = new PrintGrainkbE();
    } else {
        if (xml_printGrainkbE.length > 1) {
            console.warn("printGrainkbE.length=" + xml_printGrainkbE.length);
        }
    }
    // me:eigenvalues
    let xml_eigenvalues: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(Eigenvalues.tagName);
    let eigenvalues: Eigenvalues | undefined;
    if (xml_eigenvalues.length == 1) {
        eigenvalues = new Eigenvalues(getAttributes(xml_eigenvalues[0]), parseFloat(getNodeValue(getFirstChildNode(xml_eigenvalues[0]))));
    } else {
        console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    }
    // me:hideInactive
    let xml_hideInactive: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(HideInactive.tagName);
    let hideInactive: HideInactive | undefined;
    if (xml_hideInactive.length == 1) {
        hideInactive = new HideInactive();
    } else {
        console.warn("hideInactive.length=" + xml_hideInactive.length);
    }
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(DiagramEnergyOffset.tagName);
    let diagramEnergyOffset: DiagramEnergyOffset | undefined;
    if (xml_diagramEnergyOffset.length == 1) {
        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new DiagramEnergyOffset(getAttributes(xml_diagramEnergyOffset[0]), value);
    } else {
        console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    }
    control = new Control(getAttributes(xml_control), testDOS, printSpeciesProfile, testMicroRates, testRateConstant,
        printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE,
        printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
}

/**
 * Parses xml to initialise reactions.
 * @param {XMLDocument} xml The XML document.
 */
function initReactions(xml: XMLDocument): void {
    let reactionList_s: string = 'reactionList';
    console.log(reactionList_s);
    let xml_reactionList: Element = getSingularElement(xml, reactionList_s);
    let xml_reactions: HTMLCollectionOf<Element> = xml_reactionList.getElementsByTagName(Reaction.tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    // Process each reaction.
    if (xml_reactions_length == 0) {
        //return;
        throw new Error("No reactions: There should be at least 1!");
    }
    // Set reactions_title.
    reactions_title = document.getElementById("reactions_title");
    if (reactions_title != null) {
        reactions_title.innerHTML = "Reactions";
    }
    for (let i = 0; i < xml_reactions_length; i++) {
        let attributes: Map<string, string> = getAttributes(xml_reactions[i]);
        let reactionID = attributes.get("id");
        if (reactionID == null) {
            throw new Error("reactionID is null");
        }
        if (reactionID != null) {
            console.log("id=" + reactionID);

            // Load reactants.
            let reactants: Map<string, Reactant> | Reactant | undefined;
            let xml_reactants: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Reactant.tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            if (xml_reactants.length > 0) {
                if (xml_reactants.length < 2) {
                    let xml_molecule: Element = getFirstElement(xml_reactants[0], Molecule.tagName);
                    let twa = new TagWithAttributes(getAttributes(xml_molecule), Molecule.tagName);
                    reactants = new Reactant(getAttributes(xml_reactants[0]), twa, molecules);
                } else {
                    reactants = new Map();
                    for (let j = 0; j < xml_reactants.length; j++) {
                        let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                        let twa = new TagWithAttributes(getAttributes(xml_molecule), Molecule.tagName);
                        let reactant = new Reactant(getAttributes(xml_reactants[j]), twa, molecules);
                        reactants.set(reactant.getRef(), reactant);
                    }
                }
            }

            // Load products.
            let products: Map<string, Product> | Product | undefined;
            let xml_products: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Product.tagName);
            //console.log("xml_products.length=" + xml_products.length);
            if (xml_products.length > 0) {
                if (xml_products.length < 2) {
                    let xml_molecule: Element = getFirstElement(xml_products[0], Molecule.tagName);
                    let twa = new TagWithAttributes(getAttributes(xml_molecule), Molecule.tagName);
                    products = new Product(getAttributes(xml_products[0]), twa, molecules);
                } else {
                    products = new Map();
                    for (let j = 0; j < xml_products.length; j++) {
                        let xml_molecule: Element = getFirstElement(xml_products[j], Molecule.tagName);
                        let twa = new TagWithAttributes(getAttributes(xml_molecule), Molecule.tagName);
                        let product = new Product(getAttributes(xml_products[j]), twa, molecules);
                        products.set(product.getRef(), product);
                    }
                }
            }

            // Load transition states.
            //console.log("Load  transition states...");
            let xml_transitionState: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(TransitionState.tagName);
            let transitionStates: Map<string, TransitionState> | TransitionState | undefined;
            if (xml_transitionState.length > 0) {
                if (xml_transitionState.length < 2) {
                    let xml_molecule: Element = xml_transitionState[0].getElementsByTagName(Molecule.tagName)[0];
                    let twa = new TagWithAttributes(getAttributes(xml_molecule), Molecule.tagName);
                    transitionStates = new TransitionState(getAttributes(xml_transitionState[0]), twa, molecules);
                } else {
                    transitionStates = new Map();
                    for (let j = 0; j < xml_transitionState.length; j++) {
                        let xml_molecule: Element = xml_transitionState[j].getElementsByTagName(Molecule.tagName)[0];
                        let twa = new TagWithAttributes(getAttributes(xml_molecule), Molecule.tagName);
                        let transitionState = new TransitionState(getAttributes(xml_transitionState[j]), twa, molecules);
                        transitionStates.set(transitionState.getRef(), transitionState);
                    }
                }
            }
            //console.log("transitionStates=" + transitionStates);

            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
            let tunneling: Tunneling | undefined;
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) {
                    throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
                }
                tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
            }

            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let mCRCMethod: MCRCMethod | undefined;
            let xml_MCRCMethod: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(MCRCMethod.tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) {
                    throw new Error("Expecting 1 " + MCRCMethod.tagName + " but finding " + xml_MCRCMethod.length + "!");
                } else {
                    let mCRCMethodAttributes: Map<string, string> = getAttributes(xml_MCRCMethod[0]);
                    let name: string | undefined = mCRCMethodAttributes.get("name");
                    //console.log(MCRCMethod.tagName + " name=" + name);
                    if (name == undefined || name == MesmerILT.xsiType2) {
                        let type: string | undefined = mCRCMethodAttributes.get("xsi:type");
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        if (type != undefined) {
                            if (type == MesmerILT.xsiType || type == MesmerILT.xsiType2) {
                                let preExponential: PreExponential | undefined;
                                let xml_preExponential: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(PreExponential.tagName);
                                if (xml_preExponential != null) {
                                    if (xml_preExponential[0] != null) {
                                        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_preExponential[0])));
                                        preExponential = new PreExponential(getAttributes(xml_preExponential[0]), value);
                                    }
                                }
                                //console.log("preExponential " + preExponential);
                                let activationEnergy: ActivationEnergy | undefined;
                                let xml_activationEnergy: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(ActivationEnergy.tagName);
                                if (xml_activationEnergy != null) {
                                    if (xml_activationEnergy[0] != null) {
                                        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_activationEnergy[0])));
                                        activationEnergy = new ActivationEnergy(getAttributes(xml_activationEnergy[0]), value);
                                    }
                                }
                                //console.log("activationEnergy " + activationEnergy);
                                let tInfinity: TInfinity | undefined;
                                let xml_tInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(TInfinity.tagName);
                                if (xml_tInfinity != null) {
                                    if (xml_tInfinity[0] != null) {
                                        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_tInfinity[0])));
                                        tInfinity = new NInfinity(getAttributes(xml_tInfinity[0]), value);
                                    }
                                }
                                //console.log("tInfinity " + tInfinity);
                                let nInfinity: NInfinity | undefined;
                                let xml_nInfinity: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(NInfinity.tagName);
                                if (xml_nInfinity != null) {
                                    if (xml_nInfinity[0] != null) {
                                        let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_nInfinity[0])));
                                        nInfinity = new NInfinity(getAttributes(xml_nInfinity[0]), value);
                                    }
                                }
                                //console.log("nInfinity " + nInfinity);
                                mCRCMethod = new MesmerILT(mCRCMethodAttributes, preExponential, activationEnergy, tInfinity, nInfinity);
                            }
                        }
                    } else {
                        mCRCMethod = new MCRCMethod(mCRCMethodAttributes);
                    }
                }
            }

            // Load excessReactantConc
            let xml_excessReactantConc = xml_reactions[i].getElementsByTagName(ExcessReactantConc.tagName);
            let excessReactantConc: ExcessReactantConc | undefined;
            if (xml_excessReactantConc.length > 0) {
                if (xml_excessReactantConc.length > 1) {
                    throw new Error("Expecting 1 " + ExcessReactantConc.tagName + " but finding " + xml_excessReactantConc.length + "!");
                }
                let value: number = parseFloat(getNodeValue(getFirstChildNode(xml_excessReactantConc[0])));
                excessReactantConc = new ExcessReactantConc(getAttributes(xml_excessReactantConc[0]), value);
            }

            // Create reaction.
            let reaction = new Reaction(attributes, reactionID, reactants, products, tunneling, transitionStates,
                mCRCMethod, excessReactantConc);
            reactions.set(reactionID, reaction);
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
 */
function drawReactionDiagram(canvas: HTMLCanvasElement, molecules: Map<string, Molecule>,
    reactions: Map<string, Reaction>, dark: boolean, font: string, lw: number, lwc: number): void {
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
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    //ctx.fillStyle = background;

    // Get text height for font size.
    let th = getTextHeight(ctx, "Aj", font);
    //console.log("th=" + th);

    // Go through reactions:
    // 1. Create sets of reactants, end products, intermediate products and transition states.
    // 2. Create maps of orders and energies.
    // 3. Calculate maximum energy.
    let reactants: Set<string> = new Set();
    let products: Set<string> = new Set();
    let intProducts: Set<string> = new Set();
    let transitionStates: Set<string> = new Set();
    let orders: Map<string, number> = new Map();
    let energies: Map<string, number> = new Map();
    let i: number = 0;
    let energyMin: number = Number.MAX_VALUE;
    let energyMax: number = Number.MIN_VALUE;
    reactions.forEach(function (reaction, id) {
        // Get TransitionStates.
        let reactionTransitionStates: Map<string, TransitionState> | TransitionState | undefined = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel: string | undefined = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.add(reactantsLabel);
            if (products.has(reactantsLabel)) {
                intProducts.add(reactantsLabel);
            }
            let energy: number = reaction.getReactantsEnergy();
            energyMin = Math.min(energyMin, energy);
            energyMax = Math.max(energyMax, energy);
            energies.set(reactantsLabel, energy);
            if (!orders.has(reactantsLabel)) {
                orders.set(reactantsLabel, i);
                i++;
            }
        }
        let productsLabel: string | undefined = reaction.getProductsLabel();
        if (productsLabel != undefined) {
            products.add(productsLabel);
            let energy = reaction.getProductsEnergy();
            energyMin = Math.min(energyMin, energy);
            energyMax = Math.max(energyMax, energy);
            energies.set(productsLabel, energy);
            if (orders.has(productsLabel)) {
                i--;
                let j: number = get(orders, productsLabel);
                // Move product to end and shift everything back.
                orders.forEach(function (value, key) {
                    if (value > j) {
                        orders.set(key, value - 1);
                    }
                });
                // Insert transition states.
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) {
                        reactionTransitionStates.forEach(function (ts, id) {
                            let tsn: string = ts.getRef();
                            transitionStates.add(tsn);
                            orders.set(tsn, i);
                            energy = ts.getMolecule().getEnergy();
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
                            energies.set(tsn, energy);
                            i++;
                        });
                    } else {
                        let ts: TransitionState = reactionTransitionStates as TransitionState;
                        let tsn: string = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    }
                    orders.set(productsLabel, i);
                    i++
                }
            } else {
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) {
                        reactionTransitionStates.forEach(function (ts, id) {
                            let tsn: string = ts.getRef();
                            transitionStates.add(tsn);
                            orders.set(tsn, i);
                            energy = ts.getMolecule().getEnergy();
                            energyMin = Math.min(energyMin, energy);
                            energyMax = Math.max(energyMax, energy);
                            energies.set(tsn, energy);
                            i++;
                        });
                    } else {
                        let ts: TransitionState = reactionTransitionStates as TransitionState;
                        let tsn: string = ts.getRef();
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
    let energyRange: number = energyMax - energyMin;
    //console.log("energyRange=" + energyRange);
    //console.log("reactants=" + reactants);
    //console.log("products=" + products);
    //console.log("transitionStates=" + transitionStates);

    // Create a lookup from order to label.
    let reorders: string[] = [];
    orders.forEach(function (value, key) {
        reorders[value] = key;
    });
    //console.log("reorders=" + arrayToString(reorders));

    // Iterate through the reorders:
    // 1. Capture coordinates for connecting lines.
    // 2. Store maximum x.
    let x0: number = 0;
    let y0: number;
    let x1: number;
    let y1: number;
    let xmax: number = 0;
    let tw: number;
    let textSpacing: number = 5; // Spacing between end of line and start of text.
    let stepSpacing: number = 10; // Spacing between steps.
    let reactantsInXY: Map<string, number[]> = new Map();
    let reactantsOutXY: Map<string, number[]> = new Map();
    let productsInXY: Map<string, number[]> = new Map();
    let productsOutXY: Map<string, number[]> = new Map();
    let transitionStatesInXY: Map<string, number[]> = new Map();
    let transitionStatesOutXY: Map<string, number[]> = new Map();
    reorders.forEach(function (value) {
        //console.log("value=" + value + ".");
        //console.log("energies=" + mapToString(energies));
        let energy: number = get(energies, value);
        let energyRescaled: number = rescale(energyMin, energyRange, 0, canvas.height, energy);
        // Get text width.
        tw = Math.max(getTextWidth(ctx, energy.toString(), font), getTextWidth(ctx, value, font));
        x1 = x0 + tw + textSpacing;
        y0 = energyRescaled + lw;
        y1 = y0;
        // Draw horizontal line and add label.
        // (The drawing is now not done here but done later so labels are on top of lines.)
        // The code is left here commented out for reference.
        //drawLevel(ctx, green, 4, x0, y0, x1, y1, th, value);
        reactantsInXY.set(value, [x0, y0]);
        reactantsOutXY.set(value, [x1, y1]);
        if (products.has(value)) {
            productsInXY.set(value, [x0, y0]);
            productsOutXY.set(value, [x1, y1]);
        }
        if (transitionStates.has(value)) {
            transitionStatesInXY.set(value, [x0, y0]);
            transitionStatesOutXY.set(value, [x1, y1]);
        }
        x0 = x1 + stepSpacing;
        xmax = x1;
    });

    // Set canvas width to maximum x.
    canvas.width = xmax;
    //console.log("canvas.width=" + canvas.width);

    // Set canvas height to maximum energy plus the label.
    let canvasHeightWithBorder = canvas.height + (4 * th) + (2 * lw);
    //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);

    let originalCanvasHeight = canvas.height;

    // Update the canvas height.
    canvas.height = canvasHeightWithBorder;

    // Set the transformation matrix.
    //ctx.transform(1, 0, 0, 1, 0, canvasHeightWithBorder);
    ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder)


    // Go through reactions and draw connecting lines.
    reactions.forEach(function (reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        // Get TransitionState if there is one.
        let reactionTransitionStates: Map<string, TransitionState> | TransitionState | undefined = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel: string | undefined = reaction.getReactantsLabel();
        let productsLabel: string | undefined = reaction.getProductsLabel();
        let reactantOutXY: number[] = get(reactantsOutXY, reactantsLabel);
        let productInXY: number[] = get(productsInXY, productsLabel);
        if (reactionTransitionStates != undefined) {
            if (reactionTransitionStates instanceof Map) {
                reactionTransitionStates.forEach(function (ts, id) {
                    let transitionState: TransitionState = ts;
                    let transitionStateLabel: string = transitionState.getRef();
                    let transitionStateInXY: number[] = get(transitionStatesInXY, transitionStateLabel);
                    drawLine(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0],
                        transitionStateInXY[1]);
                    let transitionStateOutXY: number[] = get(transitionStatesOutXY, transitionStateLabel);
                    drawLine(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1],
                        productInXY[0], productInXY[1]);
                });
            } else {
                let transitionState: TransitionState = reactionTransitionStates as TransitionState;
                let transitionStateLabel: string = transitionState.getRef();
                let transitionStateInXY: number[] = get(transitionStatesInXY, transitionStateLabel);
                drawLine(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0],
                    transitionStateInXY[1]);
                let transitionStateOutXY: number[] = get(transitionStatesOutXY, transitionStateLabel);
                drawLine(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1],
                    productInXY[0], productInXY[1]);
            }
        } else {
            drawLine(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1],
                productInXY[0], productInXY[1]);
        }
    });

    // Draw horizontal lines and labels.
    // (This is done last so that the labels are on top of the vertical lines.)
    reactants.forEach(function (value) {
        let energy: number = get(energies, value);
        let energyRescaled: number = rescale(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0: number = get(reactantsInXY, value)[0];
        let y: number = energyRescaled + lw;
        let x1: number = get(reactantsOutXY, value)[0];
        let energyString: string = energy.toString();
        drawLevel(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
    });
    products.forEach(function (value) {
        let energy: number = get(energies, value);
        let energyRescaled: number = rescale(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0: number = get(productsInXY, value)[0];
        let y: number = energyRescaled + lw;
        let x1: number = get(productsOutXY, value)[0];
        let energyString: string = energy.toString();
        if (intProducts.has(value)) {
            drawLevel(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
        } else {
            drawLevel(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
        }
    });
    transitionStates.forEach(function (value) {
        let v: any;
        let energy: number = get(energies, value);
        let energyRescaled: number = rescale(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0: number = get(transitionStatesInXY, value)[0];
        let y: number = energyRescaled + lw;
        let x1: number = get(transitionStatesOutXY, value)[0];
        let energyString: string = energy.toString();
        drawLevel(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
    });
}

/**
 * Display molecules table.
 */
function displayMoleculesTable(): void {
    if (molecules.size == 0) {
        return;
    }
    // Prepare table headings.
    let th: string = "";
    let attributeKeys: Set<string> = new Set();
    molecules.forEach(function (molecule, id) {
        molecule.attributes.forEach(function (value, key) {
            attributeKeys.add(key);
        });
    });

    console.log("attributeKeys=" + setToString(attributeKeys, " "));


    let moleculesTable = getTH([
        "Name",
        "Energy<br>kJ/mol",
        "Rotation constants<br>cm<sup>-1</sup>",
        "Vibration frequencies<br>cm<sup>-1</sup>"]);
    molecules.forEach(function (molecule, id) {
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        let energyNumber: number = molecule.getEnergy();
        let energy: string;
        if (energyNumber == null) {
            energy = "";
        } else {
            energy = energyNumber.toString();
        }
        //console.log("energy=" + energy);
        let rotationConstants: string = "";
        let rotConsts: number[] | undefined = molecule.getRotConsts();
        if (rotConsts != undefined) {
            rotationConstants = arrayToString(rotConsts, " ");
        }
        let vibrationFrequencies: string = "";
        let vibFreqs: number[] | undefined = molecule.getVibFreqs();
        if (vibFreqs != undefined) {
            vibrationFrequencies = arrayToString(vibFreqs, " ");
        }
        moleculesTable += getTR(getTD(id)
            + getTD(getInput("number", id + "_energy", "setEnergy(this)", energy))
            + getTD(rotationConstants, true)
            + getTD(vibrationFrequencies, true));
    });
    molecules_table = document.getElementById("molecules_table");
    if (molecules_table !== null) {
        molecules_table.innerHTML = moleculesTable;
    }
}

/**
 * Display reactions table.
 */
function displayReactionsTable(): void {
    if (reactions.size == 0) {
        return;
    }
    // Prepare table headings.
    let reactionsTable = getTH(["ID", "Reactants", "Products", "Transition State",
        "PreExponential", "Activation Energy", "TInfinity", "NInfinity"]);
    reactions.forEach(function (reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        let reactants: string = reaction.getReactantsLabel() || "";
        let products: string = reaction.getProductsLabel() || "";
        let transitionState: string = "";
        let preExponential: string = "";
        let activationEnergy: string = "";
        let tInfinity: string = "";
        let nInfinity: string = "";
        let tSs: Map<string, TransitionState> | TransitionState | undefined = reaction.transitionStates;
        //console.log("tSs=" + tSs);
        if (tSs != undefined) {
            if (tSs instanceof Map) {
                // Join all names together.
                tSs.forEach(function (ts) {
                    let name: string | undefined = ts.getRef();
                    if (name != null) {
                        transitionState = name + " ";
                    }
                });
            } else {
                let ts: TransitionState = tSs as TransitionState;
                let name: string | undefined = ts.getRef();
                if (name != null) {
                    transitionState = name;
                }
            }
        }
        let mCRCMethod: MCRCMethod | undefined = reaction.getMCRCMethod();
        //console.log("mCRCMethod=" + mCRCMethod);
        //console.log("typeof mCRCMethod=" + typeof mCRCMethod);
        if (mCRCMethod != undefined) {
            if (mCRCMethod instanceof MesmerILT) {
                let mp: PreExponential | undefined = mCRCMethod.getPreExponential();
                if (mp != undefined) {
                    preExponential = mp.value.toString() + " "
                        + mp.attributes.get("units");
                }
                let ae: ActivationEnergy | undefined = mCRCMethod.getActivationEnergy();
                if (ae != undefined) {
                    activationEnergy = ae.value.toString() + " "
                        + ae.attributes.get("units");
                }
                let ti: TInfinity | undefined = mCRCMethod.getTInfinity();
                if (ti != undefined) {
                    tInfinity = ti.value.toString();
                }
                let ni: NInfinity | undefined = mCRCMethod.getNInfinity();
                if (ni != undefined) {
                    nInfinity = ni.value.toString();
                }
            } else {
                if (mCRCMethod.attributes.get("name") == "RRKM") {
                } else {
                    console.log("Unexpected mCRCMethod: " + mCRCMethod);
                    throw new Error("Unexpected mCRCMethod: " + mCRCMethod);
                }
            }
        }

        reactionsTable += getTR(getTD(id) + getTD(reactants) + getTD(products) + getTD(transitionState)
            + getTD(preExponential, true) + getTD(activationEnergy, true) + getTD(tInfinity, true)
            + getTD(nInfinity, true));
        reactions_table = document.getElementById("reactions_table");
        if (reactions_table !== null) {
            reactions_table.innerHTML = reactionsTable;
        }
    });
}

/**
 * Display reactions diagram.
 */
function displayReactionsDiagram(): void {
    if (reactions.size > 1) {
        // Set reactions_diagram_title.
        reactions_diagram_title = document.getElementById("reactions_diagram_title");
        if (reactions_diagram_title != null) {
            reactions_diagram_title.innerHTML = "Diagram";
        }
        // Display the diagram.
        let canvas: HTMLCanvasElement | null = document.getElementById("reactions_diagram") as HTMLCanvasElement;
        let font: string = "14px Arial";
        let dark: boolean = true;
        let lw: number = 4;
        let lwc: number = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc);
        }
    }
}

/**
 * Display conditions.
 */
function displayConditions(): void {
    let bathGas_element: HTMLElement | null = document.getElementById("bathGas");
    if (bathGas_element != null) {
        bathGas_element.innerHTML = "Bath Gas " + conditions.getBathGas().value;
    }
    let pTs_element: HTMLElement | null = document.getElementById("PT_table");
    let th: string[] = ["P", "T"];
    // If PTs contain BathGas
    let hasBathGas: boolean = conditions.getPTs().pTpairs.some(pair => {
        return pair.getBathGas() != undefined;
    });
    if (hasBathGas) {
        th.push("BathGas");
    }    
    // Check if PTs contain ExperimentRate
    let hasExperimentRate: boolean = conditions.getPTs().pTpairs.some(pair => {
        return pair.getExperimentRate() != undefined;
    });
    if (hasExperimentRate) {
        th.push("ExperimentRate");
    }
    let table: string = getTH(th);
    if (pTs_element != null) {
        conditions.getPTs().pTpairs.forEach(function (pTpair) {
            table += getTR(getTD(pTpair.getP().toString()) + getTD(pTpair.getT().toString()));
            if (hasBathGas) {
                table += getTD(pTpair.getBathGas()?.toString() ?? '');
            }
            if (hasExperimentRate) {
                table += getTD(pTpair.getExperimentRate()?.toString() ?? '');
            }
        });
        pTs_element.innerHTML = table;
    }
}

/**
 * Display modelParameters.
 */
function displayModelParameters(): void {
    let modelParameters_element: HTMLElement | null = document.getElementById("modelParameters_table");
    let table: string = getTH(["Parameter", "Value"]);
    table += getTR(getTD("Grain Size") + getTD(modelParameters.getGrainSize().value.toString()));
    table += getTR(getTD("Energy Above The Top Hill") + getTD(modelParameters.getEnergyAboveTheTopHill().value.toString()));

    if (modelParameters_element != null) {
        modelParameters_element.innerHTML = table;
    }
}

/**
 * Display control.
 */
function displayControl(): void {
    let control_table_element: HTMLElement | null = document.getElementById("control_table");
    let table: string = getTH(["Control", "Value"]);
    // TestDOS
    let testDOS: TestDOS | undefined = control.getTestDOS();
    if (testDOS != undefined) {
        table += getTR(getTD(TestDOS.tagName) + getTD(""));
    }
    // PrintSpeciesProfile
    let printSpeciesProfile: PrintSpeciesProfile | undefined = control.getPrintSpeciesProfile();
    if (printSpeciesProfile != undefined) {
        table += getTR(getTD(PrintSpeciesProfile.tagName) + getTD(""));
    }
    // TestMicroRates
    let testMicroRates: TestMicroRates | undefined = control.getTestMicroRates();
    if (testMicroRates != undefined) {
        table += getTR(getTD(TestMicroRates.tagName) + getTD(""));
    }
    // TestRateConstant
    let testRateConstant: TestRateConstant | undefined = control.getTestRateConstant();
    if (testRateConstant != undefined) {
        table += getTR(getTD(TestRateConstant.tagName) + getTD(""));
    }
    // PrintGrainDOS
    let printGrainDOS: PrintGrainDOS | undefined = control.getPrintGrainDOS();
    if (printGrainDOS != undefined) {
        table += getTR(getTD(PrintGrainDOS.tagName) + getTD(""));
    }
    // PrintCellDOS
    let printCellDOS: PrintCellDOS | undefined = control.getPrintCellDOS();
    if (printCellDOS != undefined) {
        table += getTR(getTD(PrintCellDOS.tagName) + getTD(""));
    }
    // PrintReactionOperatorColumnSums
    let printReactionOperatorColumnSums: PrintReactionOperatorColumnSums | undefined = control.getPrintReactionOperatorColumnSums();
    if (printReactionOperatorColumnSums != undefined) {
        table += getTR(getTD(PrintReactionOperatorColumnSums.tagName) + getTD(""));
    }
    // PrintTunnellingCoefficients
    let printTunnellingCoefficients: PrintTunnellingCoefficients | undefined = control.getPrintTunnellingCoefficients();
    if (printTunnellingCoefficients != undefined) {
        table += getTR(getTD(PrintTunnellingCoefficients.tagName) + getTD(""));
    }
    // PrintGrainkfE
    let printGrainkfE: PrintGrainkfE | undefined = control.getPrintGrainkfE();
    if (printGrainkfE != undefined) {
        table += getTR(getTD(PrintGrainkfE.tagName) + getTD(""));
    }
    // PrintGrainBoltzmann
    let printGrainBoltzmann: PrintGrainBoltzmann | undefined = control.getPrintGrainBoltzmann();
    if (printGrainBoltzmann != undefined) {
        table += getTR(getTD(PrintGrainBoltzmann.tagName) + getTD(""));
    }
    // PrintGrainkbE
    let printGrainkbE: PrintGrainkbE | undefined = control.getPrintGrainkbE();
    if (printGrainkbE != undefined) {
        table += getTR(getTD(PrintGrainkbE.tagName) + getTD(""));
    }
    // Eigenvalues
    let eigenvalues: Eigenvalues | undefined = control.getEigenvalues();
    if (eigenvalues != undefined) {
        table += getTR(getTD(Eigenvalues.tagName) + getTD(eigenvalues.value.toString()));
    }
    // HideInactive
    let hideInactive: HideInactive | undefined = control.getHideInactive();
    if (hideInactive != undefined) {
        table += getTR(getTD(HideInactive.tagName) + getTD(""));
    }
    // DiagramEnergyOffset
    let diagramEnergyOffset: DiagramEnergyOffset | undefined = control.getDiagramEnergyOffset();
    if (diagramEnergyOffset != undefined) {
        table += getTR(getTD(DiagramEnergyOffset.tagName) + getTD(diagramEnergyOffset.value.toString()));
    }
    // Set the table.
    if (control_table_element != null) {
        control_table_element.innerHTML = table;
    }
}

/**
 * Set the energy of a molecule when the energy input value is changed.
 * @param input The input element. 
 */
export function setEnergy(input: HTMLInputElement): void {
    let id_energy: string = input.id;
    let moleculeID: string = id_energy.split("_")[0];
    let molecule: Molecule | undefined = molecules.get(moleculeID);
    if (molecule != undefined) {
        let inputValue: number = parseFloat(input.value);
        if (!isNaN(inputValue)) {
            molecule.setEnergy(inputValue);
            console.log("Energy of " + moleculeID + " set to " + inputValue);
        } else {
            alert("Energy input for " + moleculeID + " is not a number");
            let inputElement = document.getElementById(id_energy) as HTMLInputElement;
            inputElement.value = molecule.getEnergy().toString();
        }
        //console.log("molecule=" + molecule);
    }
}

(window as any).setEnergy = setEnergy;

/**
 * Save to XML file.
 */
window.saveXML = function () {
    console.log("saveXML");

    const pad: string = "  ";
    let level: number;
    const padding2: string = pad.repeat(2);

    // Create me.title.
    let title_xml = "\n" + pad + getTag(title, "me:title");

    // Create moleculeList.
    level = 2;
    let moleculeList: string = "";
    molecules.forEach(function (molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
        //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = getTag(moleculeList, "moleculeList", undefined, pad, true);

    // Create reactionList.
    level = 2;
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

    // Create a new Blob object from the data
    let blob = new Blob([header, mesmerStartTag, title_xml, moleculeList, reactionList,
        xml_conditions, xml_modelParameters, xml_control, mesmerEndTag],
        { type: "text/plain" });

    // Create a new object URL for the blob
    let url = URL.createObjectURL(blob);

    // Create a new 'a' element
    let a = document.createElement("a");

    // Set the href and download attributes for the 'a' element
    a.href = url;
    a.download = input_xml_filename; // Replace with your desired filename

    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();

    // Remove the 'a' element after the download starts
    document.body.removeChild(a);

}