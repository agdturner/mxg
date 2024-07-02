"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryMolecules = void 0;
const big_js_1 = __importDefault(require("big.js"));
const xml_mesmer_1 = require("./xml_mesmer");
const xml_metadata_1 = require("./xml_metadata");
const xml_molecule_1 = require("./xml_molecule");
const xml_1 = require("./xml");
const gui_moleculeList_1 = require("./gui_moleculeList");
class LibraryMolecules {
    /**
     * @param defaults The defaults.
     */
    constructor() { }
    /**
     * Read molecules from file.
     * @returns A promise that resolves to a map of molecules.
     */
    readFile() {
        return new Promise((resolve, reject) => {
            let input = document.createElement('input');
            input.type = 'file';
            let self = this;
            input.onchange = function () {
                if (input.files) {
                    let file = input.files[0];
                    let inputFilename = file.name;
                    let reader = new FileReader();
                    let chunkSize = 1024 * 1024; // 1MB
                    let start = 0;
                    let contents = '';
                    reader.onload = function (e) {
                        if (e.target == null) {
                            reject(new Error('Event target is null'));
                            return;
                        }
                        contents += e.target.result;
                        if (file != null) {
                            if (start < file.size) {
                                // Read the next chunk
                                let blob = file.slice(start, start + chunkSize);
                                reader.readAsText(blob);
                                start += chunkSize;
                            }
                            else {
                                // All chunks have been read
                                contents = contents.trim();
                                let parser = new DOMParser();
                                let xml = parser.parseFromString(contents, "text/xml");
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
    parse(xml) {
        /**
         * The molecules.
         */
        let molecules = new Map();
        // Get the XML "moleculeList" element.
        let xml_ml = (0, xml_1.getSingularElement)(xml, xml_mesmer_1.MoleculeList.tagName);
        // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
        let mlTagNames = new Set();
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
        let xml_ms = xml_ml.getElementsByTagName(xml_molecule_1.Molecule.tagName);
        let xml_msl = xml_ms.length;
        console.log("Number of molecules=" + xml_msl);
        let naliases = 0;
        //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for (let i = 0; i < xml_msl; i++) {
            // console.log("i=" + i);
            // Create a new Molecule.
            let attributes = (0, xml_1.getAttributes)(xml_ms[i]);
            let mid = attributes.get(xml_molecule_1.Molecule.s_id);
            //console.log("mID=" + mID);
            if (mid == undefined) {
                throw new Error(xml_molecule_1.Molecule.s_id + ' is undefined');
            }
            let cns = xml_ms[i].childNodes;
            //console.log("cns.length=" + cns.length);
            // Check if there are any child elements. If not, then this molecule is an alias.
            if (cns.length == 0) {
                naliases++;
                //console.log("This molecule is an alias.");
                let ref = attributes.get("ref");
                if (ref == undefined) {
                    throw new Error("ref is undefined");
                }
                continue;
            }
            let id = (0, gui_moleculeList_1.setMoleculeID)(false, mid, undefined, molecules);
            let m = new xml_molecule_1.Molecule(attributes, id);
            molecules.set(id, m);
            // Create a set of molecule tag names.
            let moleculeTagNames = new Set();
            //cns.forEach(function (cn) {
            for (let j = 0; j < cns.length; j++) {
                let cn = cns[j];
                // Check for nodeName repeats that are not #text.
                if (!moleculeTagNames.has(cn.nodeName)) {
                    moleculeTagNames.add(cn.nodeName);
                }
                else {
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
            let xml_mls = xml_ms[i].getElementsByTagName(xml_metadata_1.MetadataList.tagName);
            if (xml_mls.length > 0) {
                if (xml_mls.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_metadata_1.MetadataList.tagName + " but finding " + xml_mls.length + "!");
                }
                let ml = new xml_metadata_1.MetadataList((0, xml_1.getAttributes)(xml_mls[0]));
                m.setMetadataList(ml);
                let xml_ms = xml_mls[0].getElementsByTagName(xml_metadata_1.Metadata.tagName);
                for (let j = 0; j < xml_ms.length; j++) {
                    // Create a new Metadata.
                    let md = new xml_metadata_1.Metadata((0, xml_1.getAttributes)(xml_ms[j]));
                    ml.addMetadata(md);
                }
                moleculeTagNames.delete(xml_metadata_1.MetadataList.tagName);
            }
            // Init atoms.
            //console.log("Init atoms.");
            // There can be an individual atom not in an atom array, or an atom array.
            let xml_aas = xml_ms[i].getElementsByTagName(xml_molecule_1.AtomArray.tagName);
            if (xml_aas.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_1.AtomArray.tagName + " but finding " + xml_aas.length + "!");
            }
            if (xml_aas.length == 1) {
                let xml_aa = xml_aas[0];
                let xml_as = xml_aa.getElementsByTagName(xml_molecule_1.Atom.tagName);
                if (xml_as.length == 0) {
                    throw new Error("Expecting 1 or more atoms in " + xml_molecule_1.AtomArray.tagName + ", but finding 0!");
                }
                let aa = new xml_molecule_1.AtomArray((0, xml_1.getAttributes)(xml_aa));
                m.setAtoms(aa);
                for (let j = 0; j < xml_as.length; j++) {
                    aa.addAtom(new xml_molecule_1.Atom((0, xml_1.getAttributes)(xml_as[j]), m));
                }
                moleculeTagNames.delete(xml_molecule_1.AtomArray.tagName);
            }
            else {
                let xml_as = xml_ms[i].getElementsByTagName(xml_molecule_1.Atom.tagName);
                if (xml_as.length == 1) {
                    let aa = new xml_molecule_1.AtomArray(new Map());
                    aa.addAtom(new xml_molecule_1.Atom((0, xml_1.getAttributes)(xml_as[0]), m));
                    m.setAtoms(aa);
                }
                else if (xml_as.length > 1) {
                    throw new Error("Expecting 1 " + xml_molecule_1.Atom.tagName + " but finding " + xml_as.length
                        + ". Should these be in an " + xml_molecule_1.AtomArray.tagName + "?");
                }
            }
            //console.log("atomsNode=" + atomsNode);
            moleculeTagNames.delete(xml_molecule_1.Atom.tagName);
            // Init bonds.
            // There can be an individual bond not in a bond array, or a bond array.
            // There may be only 1 bond in a BondArray.
            let xml_bas = xml_ms[i].getElementsByTagName(xml_molecule_1.BondArray.tagName);
            if (xml_bas.length > 0) {
                if (xml_bas.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_molecule_1.BondArray.tagName + " but finding " + xml_bas.length + "!");
                }
                let xml_bs = xml_bas[0].getElementsByTagName(xml_molecule_1.Bond.tagName);
                let ba = new xml_molecule_1.BondArray((0, xml_1.getAttributes)(xml_bas[0]));
                for (let j = 0; j < xml_bs.length; j++) {
                    ba.addBond(new xml_molecule_1.Bond((0, xml_1.getAttributes)(xml_bs[j]), m));
                }
                m.setBonds(ba);
                moleculeTagNames.delete(xml_molecule_1.BondArray.tagName);
            }
            else {
                let xml_bonds = xml_ms[i].getElementsByTagName(xml_molecule_1.Bond.tagName);
                if (xml_bonds.length > 0) {
                    if (xml_bonds.length > 1) {
                        throw new Error("Expecting 1 " + xml_molecule_1.Bond.tagName + " but finding " + xml_bonds.length + ". Should these be in a " + xml_molecule_1.BondArray.tagName + "?");
                    }
                    let ba = new xml_molecule_1.BondArray(new Map());
                    ba.addBond(new xml_molecule_1.Bond((0, xml_1.getAttributes)(xml_bonds[0]), m));
                    m.setBonds(ba);
                }
            }
            moleculeTagNames.delete(xml_molecule_1.Bond.tagName);
            // Organise PropertyList or individual Property.
            // (There can be an individual property not in a propertyList?)
            // If there is a PropertyList, then create a property list.
            let xml_pls = xml_ms[i].getElementsByTagName(xml_molecule_1.PropertyList.tagName);
            if (xml_pls.length > 1) {
                throw new Error("Expecting 1 or 0 " + xml_molecule_1.PropertyList.tagName + " but finding " + xml_pls.length + "!");
            }
            if (xml_pls.length == 1) {
                // Create a new PropertyList.
                let pl = new xml_molecule_1.PropertyList((0, xml_1.getAttributes)(xml_pls[0]));
                m.setPropertyList(pl);
                let xml_ps = xml_pls[0].getElementsByTagName(xml_molecule_1.Property.tagName);
                for (let j = 0; j < xml_ps.length; j++) {
                    // Create a new Property.
                    pl.setProperty(new xml_molecule_1.Property((0, xml_1.getAttributes)(xml_ps[j])));
                }
                moleculeTagNames.delete(xml_molecule_1.PropertyList.tagName);
            }
            else {
                // There is a Property on its own. For simplicity, this will be stored in a PropertyList.
                // Create a new PropertyList.
                let pl = new xml_molecule_1.PropertyList(new Map());
                m.setPropertyList(pl);
                let xml_ps = xml_ms[i].getElementsByTagName(xml_molecule_1.Property.tagName);
                if (xml_ps.length != 1) {
                    throw new Error("Expecting 1 " + xml_molecule_1.Property.tagName + " but finding " + xml_ps.length
                        + ". Should these be in a " + xml_molecule_1.PropertyList.tagName + "?");
                }
                // Create a new Property.
                pl.setProperty(new xml_molecule_1.Property((0, xml_1.getAttributes)(xml_ps[0])));
                moleculeTagNames.delete(xml_molecule_1.Property.tagName);
            }
            // Organise EnergyTransferModel.
            let xml_etms = xml_ms[i].getElementsByTagName(xml_molecule_1.EnergyTransferModel.tagName);
            if (xml_etms.length > 0) {
                if (xml_etms.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_molecule_1.EnergyTransferModel.tagName + " but finding " + xml_etms.length + "!");
                }
                let etm = new xml_molecule_1.EnergyTransferModel((0, xml_1.getAttributes)(xml_etms[0]));
                m.setEnergyTransferModel(etm);
                moleculeTagNames.delete(xml_molecule_1.EnergyTransferModel.tagName);
            }
            // Organise DOSCMethod.
            let xml_dms = xml_ms[i].getElementsByTagName(xml_molecule_1.DOSCMethod.tagName);
            if (xml_dms.length > 0) {
                if (xml_dms.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_molecule_1.DOSCMethod.tagName + " but finding " + xml_dms.length + "!");
                }
                let doscm = new xml_molecule_1.DOSCMethod((0, xml_1.getAttributes)(xml_dms[0]));
                m.setDOSCMethod(doscm);
                moleculeTagNames.delete(xml_molecule_1.DOSCMethod.tagName);
            }
            // Organise DistributionCalcMethod. (Output only)
            let xml_dcms = xml_ms[i].getElementsByTagName(xml_molecule_1.DistributionCalcMethod.tagName);
            if (xml_dcms.length > 0) {
                if (xml_dcms.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_molecule_1.DistributionCalcMethod.tagName + " but finding " + xml_dcms.length + "!");
                }
                let dcmAttributes = (0, xml_1.getAttributes)(xml_dcms[0]);
                let dcm = new xml_molecule_1.DistributionCalcMethod(dcmAttributes);
                m.setDistributionCalcMethod(dcm);
                moleculeTagNames.delete(xml_molecule_1.DistributionCalcMethod.tagName);
            }
            // Organise DensityOfStatesList. (Output only)
            let xml_dosl = xml_ms[i].getElementsByTagName(xml_molecule_1.DensityOfStatesList.tagName);
            if (xml_dosl.length > 0) {
                if (xml_dosl.length > 1) {
                    throw new Error("Expecting 1 or 0 " + xml_molecule_1.DensityOfStatesList.tagName + " but finding " + xml_dosl.length + "!");
                }
                let dosl = new xml_molecule_1.DensityOfStatesList((0, xml_1.getAttributes)(xml_dosl[0]));
                m.setDensityOfStatesList(dosl);
                let xml_dos = xml_dosl[0].getElementsByTagName(xml_molecule_1.DensityOfStates.tagName);
                // Organise Description.
                let xml_ds = xml_dosl[0].getElementsByTagName(xml_mesmer_1.Description.tagName);
                if (xml_ds.length > 0) {
                    if (xml_ds.length > 1) {
                        throw new Error("Expecting 1 or 0 " + xml_mesmer_1.Description.tagName + " but finding " + xml_ds.length + "!");
                    }
                    let ds = new xml_mesmer_1.Description((0, xml_1.getAttributes)(xml_ds[0]), (0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_ds[0])));
                    dosl.setDescription(ds);
                }
                // Organise DensityOfStates.
                //console.log("xml_dos.length=" + xml_dos.length);
                if (xml_dos.length == 0) {
                    throw new Error("Expecting 1 or more " + xml_molecule_1.DensityOfStates.tagName + " but finding 0!");
                }
                else {
                    for (let j = 0; j < xml_dos.length; j++) {
                        //console.log("j=" + j);
                        let dos = new xml_molecule_1.DensityOfStates((0, xml_1.getAttributes)(xml_dos[j]));
                        dosl.addDensityOfStates(dos);
                        // T.
                        let xml_t = xml_dos[j].getElementsByTagName(xml_mesmer_1.T.tagName);
                        if (xml_t.length != 1) {
                            throw new Error("Expecting 1 " + xml_mesmer_1.T.tagName + " but finding " + xml_t.length + "!");
                        }
                        else {
                            let t = new xml_mesmer_1.T((0, xml_1.getAttributes)(xml_t[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_t[0]))));
                            dos.setT(t);
                            //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                        }
                        // qtot.
                        let xml_qtot = xml_dos[j].getElementsByTagName(xml_molecule_1.Qtot.tagName);
                        if (xml_qtot.length != 1) {
                            throw new Error("Expecting 1 " + xml_molecule_1.Qtot.tagName + " but finding " + xml_qtot.length + "!");
                        }
                        else {
                            let qtot = new xml_molecule_1.Qtot((0, xml_1.getAttributes)(xml_qtot[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_qtot[0]))));
                            dos.setQtot(qtot);
                            //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                        }
                        // sumc.
                        let xml_sumc = xml_dos[j].getElementsByTagName(xml_molecule_1.Sumc.tagName);
                        if (xml_sumc.length != 1) {
                            throw new Error("Expecting 1 " + xml_molecule_1.Sumc.tagName + " but finding " + xml_sumc.length + "!");
                        }
                        else {
                            let sumc = new xml_molecule_1.Sumc((0, xml_1.getAttributes)(xml_sumc[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_sumc[0]))));
                            dos.setSumc(sumc);
                            //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                        }
                        // sumg.
                        let xml_sumg = xml_dos[j].getElementsByTagName(xml_molecule_1.Sumg.tagName);
                        if (xml_sumg.length != 1) {
                            throw new Error("Expecting 1 " + xml_molecule_1.Sumg.tagName + " but finding " + xml_sumg.length + "!");
                        }
                        else {
                            let sumg = new xml_molecule_1.Sumg((0, xml_1.getAttributes)(xml_sumg[0]), new big_js_1.default((0, xml_1.getNodeValue)((0, xml_1.getFirstChildNode)(xml_sumg[0]))));
                            dos.setSumg(sumg);
                            //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                        }
                    }
                }
                moleculeTagNames.delete(xml_molecule_1.DensityOfStatesList.tagName);
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
exports.LibraryMolecules = LibraryMolecules;
//# sourceMappingURL=librarymols.js.map