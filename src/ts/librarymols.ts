import Big from "big.js";
import { Description, MoleculeList, T } from "./mesmer";
import { Metadata, MetadataList } from "./metadata";
import { Atom, AtomArray, Bond, BondArray, DOSCMethod, DensityOfStates, DensityOfStatesList, DistributionCalcMethod, EnergyTransferModel, Molecule, Property, PropertyList, Qtot, Sumc, Sumg } from "./molecule";
import { getAttributes, getFirstChildNode, getNodeValue, getSingularElement } from "./xml";
import { getID } from "./util";
import { createFlexDiv } from "./html";

export class LibraryMolecules {

    /**
     * @param defaults The defaults.
     */
    constructor() { }

    /**
     * @returns 
     */
    readFile(): Promise<Map<string, Molecule>> {
        return new Promise((resolve, reject) => {
            let input: HTMLInputElement = document.createElement('input');
            input.type = 'file';
            let self = this;

            input.onchange = function () {
                if (input.files) {
                    let file: File | null = input.files[0];
                    let inputFilename: string = file.name;
                    let reader = new FileReader();
                    let chunkSize = 1024 * 1024; // 1MB
                    let start = 0;
                    let contents = '';

                    reader.onload = function (e) {
                        if (e.target == null) {
                            reject(new Error('Event target is null'));
                            return;
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
                                let parser = new DOMParser();
                                let xml: Document = parser.parseFromString(contents, "text/xml");
                                resolve(self.parse(xml));
                            }
                        }
                    };

                    // Read the first chunk
                    let blob = file.slice(start, start + chunkSize);
                    reader.readAsText(blob);
                    start += chunkSize;
                }
            };

            input.click();
        });
    }

    /**
     * Parse the XML.
     */
    parse(xml: Document): Map<string, Molecule> {
        /**
         * The molecules.
         */
        let molecules: Map<string, Molecule> = new Map();
        // Get the XML "moleculeList" element.
        let xml_ml: Element = getSingularElement(xml, MoleculeList.tagName);
        // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
        let mlTagNames: Set<string> = new Set();
        xml_ml.childNodes.forEach(function (node) {
            mlTagNames.add(node.nodeName);
        });
        /*
        if (mlTagNames.size != 1) {
            if (!(mlTagNames.size >= 2 && mlTagNames.has("#text")) ||
                !(mlTagNames.size == 3 && mlTagNames.has('#comment'))) {
                console.error("moleculeListTagNames:");
                mlTagNames.forEach(x => console.error(x));
                //throw new Error("Additional tag names in moleculeList:");
            }
        }
        if (!mlTagNames.has(Molecule.tagName)) {
            throw new Error("Expecting tags with \"" + Molecule.tagName + "\" tagName but there are none!");
        }
        */
        // Process the XML "molecule" elements.
        let xml_ms: HTMLCollectionOf<Element> = xml_ml.getElementsByTagName(Molecule.tagName);
        let xml_msl = xml_ms.length;
        console.log("Number of molecules=" + xml_msl);
        let naliases: number = 0;
        //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for (let i = 0; i < xml_msl; i++) {
            // console.log("i=" + i);
            // Create a new Molecule.
            let attributes: Map<string, string> = getAttributes(xml_ms[i]);
            let mID: string | undefined = attributes.get(Molecule.s_id);
            //console.log("mID=" + mID);
            if (mID == undefined) {
                throw new Error(Molecule.s_id + ' is undefined');
            }
            let cns: NodeListOf<ChildNode> = xml_ms[i].childNodes;
            //console.log("cns.length=" + cns.length);
            // Check if there are any child elements. If not, then this molecule is an alias.
            if (cns.length == 0) {
                naliases++;
                //console.log("This molecule is an alias.");
                let ref: string | undefined = attributes.get("ref");
                if (ref == undefined) {
                    throw new Error("ref is undefined");
                }
                continue;
            }
            let m = new Molecule(attributes, mID);
            molecules.set(mID, m);
            // Create a set of molecule tag names.
            let moleculeTagNames: Set<string> = new Set();
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
            // Init metadataList.
            //console.log("Init metadataList.");
            let xml_mls: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(MetadataList.tagName);
            if (xml_mls.length > 0) {
                if (xml_mls.length > 1) {
                    throw new Error("Expecting 1 or 0 " + MetadataList.tagName + " but finding " + xml_mls.length + "!");
                }
                let ml: MetadataList = new MetadataList(getAttributes(xml_mls[0]));
                m.setMetadataList(ml);
                let xml_ms: HTMLCollectionOf<Element> = xml_mls[0].getElementsByTagName(Metadata.tagName);
                for (let j = 0; j < xml_ms.length; j++) {
                    // Create a new Metadata.
                    let md: Metadata = new Metadata(getAttributes(xml_ms[j]));
                    ml.addMetadata(md);
                }
                moleculeTagNames.delete(MetadataList.tagName);
            }

            // Init atoms.
            //console.log("Init atoms.");
            // There can be an individual atom not in an atom array, or an atom array.
            let xml_aas: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(AtomArray.tagName);
            if (xml_aas.length > 1) {
                throw new Error("Expecting 1 or 0 " + AtomArray.tagName + " but finding " + xml_aas.length + "!");
            }
            if (xml_aas.length == 1) {
                let xml_aa = xml_aas[0];
                let xml_as: HTMLCollectionOf<Element> = xml_aa.getElementsByTagName(Atom.tagName);
                if (xml_as.length == 0) {
                    throw new Error("Expecting 1 or more atoms in " + AtomArray.tagName + ", but finding 0!");
                }
                let aa: AtomArray = new AtomArray(getAttributes(xml_aa));
                m.setAtoms(aa);
                for (let j = 0; j < xml_as.length; j++) {
                    aa.addAtom(new Atom(getAttributes(xml_as[j]), m));
                }
                moleculeTagNames.delete(AtomArray.tagName);
            } else {
                let xml_as: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(Atom.tagName);
                if (xml_as.length == 1) {
                    let aa: AtomArray = new AtomArray(new Map());
                    aa.addAtom(new Atom(getAttributes(xml_as[0]), m));
                    m.setAtoms(aa);
                } else if (xml_as.length > 1) {
                    throw new Error("Expecting 1 " + Atom.tagName + " but finding " + xml_as.length
                        + ". Should these be in an " + AtomArray.tagName + "?");
                }
            }
            //console.log("atomsNode=" + atomsNode);
            moleculeTagNames.delete(Atom.tagName);
            // Init bonds.
            // There can be an individual bond not in a bond array, or a bond array.
            // There may be only 1 bond in a BondArray.
            let xml_bas: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(BondArray.tagName);
            if (xml_bas.length > 0) {
                if (xml_bas.length > 1) {
                    throw new Error("Expecting 1 or 0 " + BondArray.tagName + " but finding " + xml_bas.length + "!");
                }
                let xml_bs: HTMLCollectionOf<Element> = xml_bas[0].getElementsByTagName(Bond.tagName);
                let ba: BondArray = new BondArray(getAttributes(xml_bas[0]));
                for (let j = 0; j < xml_bs.length; j++) {
                    ba.addBond(new Bond(getAttributes(xml_bs[j]), m));
                }
                m.setBonds(ba);
                moleculeTagNames.delete(BondArray.tagName);
            } else {
                let xml_bonds: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(Bond.tagName);
                if (xml_bonds.length > 0) {
                    if (xml_bonds.length > 1) {
                        throw new Error("Expecting 1 " + Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + BondArray.tagName + "?");
                    }
                    let ba: BondArray = new BondArray(new Map());
                    ba.addBond(new Bond(getAttributes(xml_bonds[0]), m));
                    m.setBonds(ba);
                }
            }
            moleculeTagNames.delete(Bond.tagName);

            // Organise PropertyList or individual Property.
            // (There can be an individual property not in a propertyList?)
            // If there is a PropertyList, then create a property list.
            let xml_pls: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(PropertyList.tagName);
            if (xml_pls.length > 1) {
                throw new Error("Expecting 1 or 0 " + PropertyList.tagName + " but finding " + xml_pls.length + "!");
            }
            if (xml_pls.length == 1) {
                // Create a new PropertyList.
                let pl: PropertyList = new PropertyList(getAttributes(xml_pls[0]));
                m.setPropertyList(pl);
                let xml_ps: HTMLCollectionOf<Element> = xml_pls[0].getElementsByTagName(Property.tagName);
                for (let j = 0; j < xml_ps.length; j++) {
                    // Create a new Property.
                    pl.setProperty(new Property(getAttributes(xml_ps[j])));
                }
                moleculeTagNames.delete(PropertyList.tagName);
            } else {
                // There is a Property on its own. For simplicity, this will be stored in a PropertyList.
                // Create a new PropertyList.
                let pl: PropertyList = new PropertyList(new Map());
                m.setPropertyList(pl);
                let xml_ps: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(Property.tagName);
                if (xml_ps.length != 1) {
                    throw new Error("Expecting 1 " + Property.tagName + " but finding " + xml_ps.length
                        + ". Should these be in a " + PropertyList.tagName + "?");
                }
                // Create a new Property.
                pl.setProperty(new Property(getAttributes(xml_ps[0])));
                moleculeTagNames.delete(Property.tagName);
            }
            // Organise EnergyTransferModel.
            let xml_etms: HTMLCollectionOf<Element> | null = xml_ms[i].getElementsByTagName(EnergyTransferModel.tagName);
            if (xml_etms.length > 0) {
                if (xml_etms.length > 1) {
                    throw new Error("Expecting 1 or 0 " + EnergyTransferModel.tagName + " but finding " + xml_etms.length + "!");
                }
                let etm = new EnergyTransferModel(getAttributes(xml_etms[0]));
                m.setEnergyTransferModel(etm);
                moleculeTagNames.delete(EnergyTransferModel.tagName);
            }
            // Organise DOSCMethod.
            let xml_dms: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(DOSCMethod.tagName);
            if (xml_dms.length > 0) {
                if (xml_dms.length > 1) {
                    throw new Error("Expecting 1 or 0 " + DOSCMethod.tagName + " but finding " + xml_dms.length + "!");
                }
                let doscm = new DOSCMethod(getAttributes(xml_dms[0]));
                m.setDOSCMethod(doscm);
                moleculeTagNames.delete(DOSCMethod.tagName);
            }
            // Organise DistributionCalcMethod. (Output only)
            let xml_dcms: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(DistributionCalcMethod.tagName);
            if (xml_dcms.length > 0) {
                if (xml_dcms.length > 1) {
                    throw new Error("Expecting 1 or 0 " + DistributionCalcMethod.tagName + " but finding " + xml_dcms.length + "!");
                }
                let dcmAttributes: Map<string, string> = getAttributes(xml_dcms[0]);
                let dcm = new DistributionCalcMethod(dcmAttributes);
                m.setDistributionCalcMethod(dcm);
                moleculeTagNames.delete(DistributionCalcMethod.tagName);
            }
            // Organise DensityOfStatesList. (Output only)
            let xml_dosl: HTMLCollectionOf<Element> = xml_ms[i].getElementsByTagName(DensityOfStatesList.tagName);
            if (xml_dosl.length > 0) {
                if (xml_dosl.length > 1) {
                    throw new Error("Expecting 1 or 0 " + DensityOfStatesList.tagName + " but finding " + xml_dosl.length + "!");
                }
                let dosl = new DensityOfStatesList(getAttributes(xml_dosl[0]));
                m.setDensityOfStatesList(dosl);
                let xml_dos: HTMLCollectionOf<Element> = xml_dosl[0].getElementsByTagName(DensityOfStates.tagName);
                // Organise Description.
                let xml_ds: HTMLCollectionOf<Element> = xml_dosl[0].getElementsByTagName(Description.tagName);
                if (xml_ds.length > 0) {
                    if (xml_ds.length > 1) {
                        throw new Error("Expecting 1 or 0 " + Description.tagName + " but finding " + xml_ds.length + "!");
                    }
                    let ds = new Description(getAttributes(xml_ds[0]), getNodeValue(getFirstChildNode(xml_ds[0])));
                    dosl.setDescription(ds);
                }
                // Organise DensityOfStates.
                //console.log("xml_dos.length=" + xml_dos.length);
                if (xml_dos.length == 0) {
                    throw new Error("Expecting 1 or more " + DensityOfStates.tagName + " but finding 0!");
                } else {
                    for (let j = 0; j < xml_dos.length; j++) {
                        //console.log("j=" + j);
                        let dos = new DensityOfStates(getAttributes(xml_dos[j]));
                        dosl.addDensityOfStates(dos);
                        // T.
                        let xml_t: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(T.tagName);
                        if (xml_t.length != 1) {
                            throw new Error("Expecting 1 " + T.tagName + " but finding " + xml_t.length + "!");
                        } else {
                            let t = new T(getAttributes(xml_t[0]), new Big(getNodeValue(getFirstChildNode(xml_t[0]))));
                            dos.setT(t);
                            //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                        }
                        // qtot.
                        let xml_qtot: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(Qtot.tagName);
                        if (xml_qtot.length != 1) {
                            throw new Error("Expecting 1 " + Qtot.tagName + " but finding " + xml_qtot.length + "!");
                        } else {
                            let qtot = new Qtot(getAttributes(xml_qtot[0]), new Big(getNodeValue(getFirstChildNode(xml_qtot[0]))));
                            dos.setQtot(qtot);
                            //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                        }
                        // sumc.
                        let xml_sumc: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(Sumc.tagName);
                        if (xml_sumc.length != 1) {
                            throw new Error("Expecting 1 " + Sumc.tagName + " but finding " + xml_sumc.length + "!");
                        } else {
                            let sumc = new Sumc(getAttributes(xml_sumc[0]), new Big(getNodeValue(getFirstChildNode(xml_sumc[0]))));
                            dos.setSumc(sumc);
                            //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                        }
                        // sumg.
                        let xml_sumg: HTMLCollectionOf<Element> = xml_dos[j].getElementsByTagName(Sumg.tagName);
                        if (xml_sumg.length != 1) {
                            throw new Error("Expecting 1 " + Sumg.tagName + " but finding " + xml_sumg.length + "!");
                        } else {
                            let sumg = new Sumg(getAttributes(xml_sumg[0]), new Big(getNodeValue(getFirstChildNode(xml_sumg[0]))));
                            dos.setSumg(sumg);
                            //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                        }
                    }
                }
                moleculeTagNames.delete(DensityOfStatesList.tagName);
            }
            // Check for unexpected tags.
            moleculeTagNames.delete("#text");
            if (moleculeTagNames.size > 0) {
                console.warn("There are additional unexpected moleculeTagNames:");
                moleculeTagNames.forEach(x => console.warn(x));
                //throw new Error("Unexpected tags in molecule.");
            }
        }
        console.log("Number of molecules=" + molecules.size);
        console.log("Number of alias molecules=" + naliases.toString());
        return molecules;
    }
}