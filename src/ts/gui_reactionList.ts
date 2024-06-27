import Big from "big.js";
import {
    s_Add_sy_add, addRID, level1, s_container, boundary1, getMoleculeKeys, addAnyUnits,
    addSaveAsCSVButton, s_input, s_table, setNumberNode
} from "./app.js";
import {
    createButton, s_button, createDiv, getCollapsibleDiv, createSelectElement, s_select,
    addTableRow, createLabel, createLabelWithInput, createLabelWithSelect, createTable,
    resizeInputElement, resizeSelectElement
} from "./html.js";
import { ReactionList, Description, T } from "./xml_mesmer.js";
import { Molecule } from "./xml_molecule.js";
import {
    Reaction, Reactant, ActivationEnergy, CanonicalRateList, ExcessReactantConc, Keq, Kinf,
    MCRCMethod, MesmerILT, NInfinity, PreExponential, Product, ReactionMolecule, Rev, TInfinity,
    TransitionState, Tunneling, Val
} from "./xml_reaction.js";
import { mapToString } from "./util.js";
import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getAttributes,
    getSingularElement
} from './xml.js';

/**
 * Create an add reaction button.
 */
export function getAddReactionButton(rlDiv: HTMLDivElement, reactions: Map<string, Reaction>,
    molecules: Map<string, Molecule>): HTMLButtonElement {
    let rb: HTMLButtonElement = createButton(s_Add_sy_add, addRID(Reaction.tagName, s_button), level1);
    rlDiv.appendChild(rb);
    rb.addEventListener('click', () => {
        let reactionAttributes: Map<string, string> = new Map();
        reactionAttributes.set(Reaction.s_id, "R" + reactions.size);
        let r: Reaction = new Reaction(reactionAttributes);
        reactions.set(r.id, r);
        let rDivID: string = addRID(Reaction.tagName, r.id);
        let rDiv: HTMLDivElement = createDiv(rDivID);
        rlDiv.appendChild(rDiv);
        // Create collapsible content.
        let rcDivID: string = addRID(rDivID, s_container);
        let rcDiv: HTMLDivElement = getCollapsibleDiv(rcDivID, rlDiv, rb, rDiv, r.getLabel(), boundary1, level1);
        // Create collapsible content for reactants.
        // Add an add button to add a reactant.
        let addReactantButton: HTMLButtonElement = createButton(s_Add_sy_add + " Reactant",
            addRID(Reactant.tagName, reactions.size, s_button), level1);
        rDiv.appendChild(addReactantButton);
        addReactantButton.addEventListener('click', () => {
            // Create a selector to select a molecule as a reactant.
            let selectReactant: HTMLSelectElement = createSelectElement(getMoleculeKeys(molecules), "select", "",
                addRID(rcDivID, Reactant.tagName, s_select), level1);
            rDiv.insertBefore(selectReactant, addReactantButton);
            // Add an event listener to the select element.
            selectReactant.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLSelectElement;
                let molecule: Molecule = molecules.get(target.value) as Molecule;
                let rmAttributes: Map<string, string> = new Map();
                rmAttributes.set(ReactionMolecule.s_ref, molecule.getID());
                rmAttributes.set(ReactionMolecule.s_role, Reactant.s_deficientReactant);
                let rm = new ReactionMolecule(rmAttributes);
            });
        });

        // Create collapsible content for products.

        // Create collapsible content for transition states.

        // Create collapsible content for MCRCMethod.

        // Create collapsible content for excessReactantConc.

        // Create collapsible content for canonicalRateList.

    });
    return rb;
}

/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */
export function processReactionList(xml: XMLDocument, reactions: Map<string, Reaction>, 
    molecules: Map<string, Molecule>): HTMLDivElement {
    // Create div to contain the reaction list.
    let reactionListDiv: HTMLDivElement = createDiv(undefined, boundary1);
    // Get the XML "reactionList" element.
    let xml_reactionList: Element = getSingularElement(xml, ReactionList.tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames: Set<string> = new Set();
    xml_reactionList.childNodes.forEach(function (node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size > 0) {
        if (reactionListTagNames.size != 1) {
            if (!(reactionListTagNames.size == 2 && reactionListTagNames.has("#text"))) {
                console.error("reactionListTagNames:");
                reactionListTagNames.forEach(x => console.error(x));
                throw new Error("Additional tag names in reactionList:");
            }
        }
        if (!reactionListTagNames.has(Reaction.tagName)) {
            throw new Error("Expecting tags with \"" + Reaction.tagName + "\" tagName but there are none!");
        }
        // Process the XML "reaction" elements.
        let xml_reactions: HTMLCollectionOf<Element> = xml_reactionList.getElementsByTagName(Reaction.tagName);
        let xml_reactions_length = xml_reactions.length;
        console.log("Number of reactions=" + xml_reactions_length);
        //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for (let i = 0; i < xml_reactions.length; i++) {
            // Set attributes.
            let reactionAttributes: Map<string, string> = getAttributes(xml_reactions[i]);
            // Create reaction.
            let reaction = new Reaction(reactionAttributes);
            reactions.set(reaction.id, reaction);
            let reactionTagNames: Set<string> = new Set();
            let cns: NodeListOf<ChildNode> = xml_reactions[i].childNodes;
            // Create a new div for the reaction.
            let reactionDivID: string = addRID(Reaction.tagName, i);
            let reactionDiv: HTMLDivElement = createDiv(reactionDivID);
            //console.log("cns.length=" + cns.length);
            //cns.forEach(function (cn) {
            for (let j = 0; j < cns.length; j++) {
                let cn: ChildNode = cns[j];
                // Check for nodeName repeats that are not #text.
                if (!reactionTagNames.has(cn.nodeName)) {
                    reactionTagNames.add(cn.nodeName);
                } else {
                    // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                    if (cn.nodeName != "#text") {
                        console.warn("Another ChildNode with nodeName=" + cn.nodeName);
                        //throw new Error("cn.nodeName appears twice in molecule.");
                    }
                }
                //console.log(cn.nodeName);
            }

            // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
            // Load reactants.
            let xml_reactants: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Reactant.tagName);
            reactionTagNames.delete(Reactant.tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            if (xml_reactants.length > 0) {
                // Create a new collapsible div for the reactants.
                let rsDivID: string = addRID(reactionDivID, Reactant.tagName);
                let rsDiv: HTMLDivElement = createDiv(rsDivID);
                let rscDivID = addRID(rsDivID, s_container);
                let rscDiv: HTMLDivElement = getCollapsibleDiv(rscDivID, reactionDiv, null, rsDiv, "Reactants", boundary1, level1);
                let reactants: Reactant[] = [];
                for (let j = 0; j < xml_reactants.length; j++) {
                    let reactantDivID = addRID(rsDivID, Reactant.tagName, j);
                    let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                    let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                    let reactant: Reactant = new Reactant(getAttributes(xml_reactants[j]), molecule);
                    reactants.push(reactant);
                    // Create a new div for the role.
                    let lws: HTMLDivElement = createLabelWithSelect(molecule.getRef() + " role", Reactant.roleOptions, "Role",
                        molecule.getRole(), addRID(reactantDivID, s_select), boundary1, level1);
                    lws.querySelector('select')?.addEventListener('change', (event: Event) => {
                        let target = event.target as HTMLSelectElement;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        resizeSelectElement(target);
                    });
                    rsDiv.appendChild(lws);
                }
                reaction.setReactants(reactants);
            }
            // Load products.
            let xml_products: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Product.tagName);
            reactionTagNames.delete(Product.tagName);
            //console.log("xml_products.length=" + xml_products.length);
            if (xml_products.length > 0) {
                // Create collapsible div for the products.
                let psDivID: string = addRID(reactionDivID, Product.tagName);
                let psDiv: HTMLDivElement = createDiv(psDivID);
                let pscDivID = addRID(psDivID, s_container);
                let pscDiv: HTMLDivElement = getCollapsibleDiv(pscDivID, reactionDiv, null, psDiv,
                    "Products", boundary1, level1);
                let products: Product[] = [];
                for (let j = 0; j < xml_products.length; j++) {
                    let xml_molecule: Element = getFirstElement(xml_products[j], Molecule.tagName);
                    let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                    let product: Product = new Product(getAttributes(xml_products[j]), molecule);
                    products.push(product);
                    let lws: HTMLDivElement = createLabelWithSelect(molecule.getRef() + " role", Product.roleOptions, molecule.getRole(),
                        molecule.getRef(), addRID(psDivID, j, "Role"), boundary1, level1);
                    let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
                    select.value = molecule.getRole();
                    select.addEventListener('change', (event: Event) => {
                        let target = event.target as HTMLSelectElement;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        resizeSelectElement(target);
                    });
                    resizeSelectElement(select);
                    psDiv.appendChild(lws);
                }
                reaction.setProducts(products);
            }
            // Create a new collapsible div for the reaction.
            let reactioncDivID = addRID(reactionDivID, s_container);
            let reactioncDiv: HTMLDivElement = getCollapsibleDiv(reactioncDivID, reactionListDiv, null, reactionDiv,
                reaction.id + " (" + reaction.getLabel() + ")", boundary1, level1);

            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) {
                    throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
                }
                let tunneling: Tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
                reaction.setTunneling(tunneling);
                let lws: HTMLDivElement = createLabelWithSelect(Tunneling.tagName, Tunneling.options, "Tunneling", tunneling.getName(),
                    addRID(reactionDivID, Tunneling.tagName), boundary1, level1);
                lws.querySelector('select')?.addEventListener('change', (event: Event) => {
                    let target = event.target as HTMLSelectElement;
                    tunneling.setName(target.value);
                    console.log("Set Tunneling to " + target.value);
                    resizeSelectElement(target);
                });
                reactionDiv.appendChild(lws);
            }
            // Load transition states.
            let xml_transitionStates: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(TransitionState.tagName);
            //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
            if (xml_transitionStates.length > 0) {
                // Create collapsible div.
                let tsDivID: string = addRID(reactionDivID, TransitionState.tagName);
                let tsDiv: HTMLDivElement = createDiv(tsDivID);
                let tscDivID = addRID(tsDivID, s_container);
                let tscDiv: HTMLDivElement = getCollapsibleDiv(tscDivID, reactionDiv, null, tsDiv,
                    "Transition States", boundary1, level1);
                let transitionStates: TransitionState[] = [];
                for (let j = 0; j < xml_transitionStates.length; j++) {
                    let xml_molecule: Element = getFirstElement(xml_transitionStates[j], Molecule.tagName);
                    let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                    let transitionState: TransitionState = new TransitionState(getAttributes(xml_transitionStates[j]), molecule);
                    transitionStates.push(transitionState);
                    // Create a label for the Transition State.
                    let label: HTMLLabelElement = createLabel(molecule.getRef() + " role transitionState", level1);
                    tsDiv.appendChild(label);
                }
                reaction.setTransitionStates(transitionStates);
            }
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let xml_MCRCMethod: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(MCRCMethod.tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) {
                    throw new Error("Expecting 1 " + MCRCMethod.tagName + " but finding " + xml_MCRCMethod.length + "!");
                } else {
                    let mm: MCRCMethod;
                    let mmAttributes: Map<string, string> = getAttributes(xml_MCRCMethod[0]);
                    let type: string | undefined = mmAttributes.get("xsi:type") as string;
                    if (type == undefined) {
                        // If there is no xsi:type search for a name.
                        type = mmAttributes.get("name");
                    }
                    let mmDivId: string = addRID(reactionDivID, MCRCMethod.tagName);
                    let mmDiv: HTMLDivElement = createDiv(mmDivId);
                    if (type == MesmerILT.xsiType || type == MesmerILT.xsiType2) {
                        // Create a collapsible div.
                        let mmcDivId = addRID(mmDivId, s_container);
                        let mmcDiv: HTMLDivElement = getCollapsibleDiv(mmcDivId, reactionDiv, null, mmDiv, MCRCMethod.tagName, boundary1, level1);
                        reactionDiv.appendChild(mmcDiv);
                        //console.log(MCRCMethod.tagName + " name=" + name);
                        mm = new MesmerILT(mmAttributes);
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        let xml_pe: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(PreExponential.tagName);
                        if (xml_pe != null) {
                            if (xml_pe[0] != null) {
                                let inputString: string = getInputString(xml_pe[0]);
                                let value: Big = new Big(inputString);
                                let peAttributes: Map<string, string> = getAttributes(xml_pe[0]);
                                let pe: PreExponential = new PreExponential(peAttributes, value);
                                (mm as MesmerILT).setPreExponential(pe);
                                // Create a new div element for the input.
                                let lwi: HTMLDivElement = createLabelWithInput("number", addRID(mmDivId, PreExponential.tagName, s_input),
                                    boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(pe, target);
                                    }, inputString, PreExponential.tagName);
                                mmDiv.appendChild(lwi);
                                let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
                                input.value = inputString;
                                resizeInputElement(input);
                                input.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    pe.value = new Big(inputString);
                                    console.log(PreExponential.tagName + " changed to " + inputString);
                                    resizeInputElement(input);
                                });
                                addAnyUnits(undefined, peAttributes, lwi, null, addRID(mmDivId, PreExponential.tagName),
                                    PreExponential.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_ae: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(ActivationEnergy.tagName);
                        if (xml_ae != null) {
                            if (xml_ae[0] != null) {
                                let inputString: string = getInputString(xml_ae[0]);
                                let value: Big = new Big(inputString);
                                let aeAttributes: Map<string, string> = getAttributes(xml_ae[0]);
                                let ae: ActivationEnergy = new ActivationEnergy(aeAttributes, value);
                                (mm as MesmerILT).setActivationEnergy(ae);
                                // Create a new div element for the input.
                                let lwi: HTMLDivElement = createLabelWithInput("number", addRID(mmDivId, ActivationEnergy.tagName, s_input), boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(ae, target);
                                    }, inputString, ActivationEnergy.tagName);
                                let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
                                input.value = inputString;
                                resizeInputElement(input);
                                input.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    ae.value = new Big(inputString);
                                    console.log(ActivationEnergy.tagName + " changed to " + inputString);
                                    resizeInputElement(input);
                                });
                                addAnyUnits(undefined, aeAttributes, lwi, null, addRID(mmDivId, ActivationEnergy.tagName),
                                    ActivationEnergy.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_ti: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(TInfinity.tagName);
                        if (xml_ti != null) {
                            if (xml_ti[0] != null) {
                                let inputString: string = getInputString(xml_ti[0]);
                                let value: Big = new Big(inputString);
                                let tiAttributes: Map<string, string> = getAttributes(xml_ti[0]);
                                let ti: TInfinity = new TInfinity(tiAttributes, value);
                                (mm as MesmerILT).setTInfinity(ti);
                                // Create a new div element for the input.
                                let lwi: HTMLDivElement = createLabelWithInput("number", addRID(mmDivId, TInfinity.tagName, s_input),
                                    boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(ti, target);
                                    }, inputString, TInfinity.tagName);
                                let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
                                input.value = inputString;
                                resizeInputElement(input);
                                input.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    ti.value = new Big(inputString);
                                    console.log(TInfinity.tagName + " changed to " + inputString);
                                    resizeInputElement(input);
                                });
                                addAnyUnits(undefined, tiAttributes, lwi, null, addRID(mmDivId, TInfinity.tagName), TInfinity.tagName, boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_ni: HTMLCollectionOf<Element> = xml_MCRCMethod[0].getElementsByTagName(NInfinity.tagName);
                        if (xml_ni != null) {
                            if (xml_ni[0] != null) {
                                let inputString: string = getInputString(xml_ni[0]);
                                let value: Big = new Big(inputString);
                                let niAttributes: Map<string, string> = getAttributes(xml_ni[0]);
                                let ni: NInfinity = new NInfinity(niAttributes, value);
                                (mm as MesmerILT).setNInfinity(ni);
                                // Create a new div element for the input.
                                let lwi: HTMLDivElement = createLabelWithInput("number", addRID(mmDivId, NInfinity.tagName, s_input), boundary1, level1,
                                    (event: Event) => {
                                        let target = event.target as HTMLInputElement;
                                        setNumberNode(ni, target);
                                    }, inputString, NInfinity.tagName);
                                mmDiv.appendChild(lwi);
                                let inputElement: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
                                inputElement.value = inputString;
                                resizeInputElement(inputElement);
                                inputElement.addEventListener('change', (event: Event) => {
                                    let target = event.target as HTMLInputElement;
                                    inputString = target.value;
                                    ni.value = new Big(inputString);
                                    console.log(NInfinity.tagName + " set to " + inputString);
                                    resizeInputElement(inputElement);
                                });
                                addAnyUnits(undefined, niAttributes, lwi, null, addRID(mmDivId, NInfinity.tagName), NInfinity.tagName,
                                    boundary1, boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                    } else {
                        mm = new MCRCMethod(mmAttributes);
                        let mCRCMethodLabel: HTMLLabelElement = document.createElement('label');
                        mCRCMethodLabel.textContent = MCRCMethod.tagName + ": " + type;
                        Object.assign(mCRCMethodLabel.style, level1);
                        mmDiv.appendChild(mCRCMethodLabel);
                        reactionDiv.appendChild(mmDiv);
                    }
                    reaction.setMCRCMethod(mm);
                }
            }
            // me:excessReactantConc
            let xml_erc = xml_reactions[i].getElementsByTagName(ExcessReactantConc.tagName);
            //console.log("n_me:excessReactantConc=" + xml_erc.length);
            if (xml_erc.length > 0) {
                if (xml_erc.length > 1) {
                    throw new Error("Expecting 1 " + ExcessReactantConc.tagName + " but finding " + xml_erc.length + "!");
                }
                let value: Big = new Big(getNodeValue(getFirstChildNode(xml_erc[0])));
                let erc: ExcessReactantConc = new ExcessReactantConc(getAttributes(xml_erc[0]), value);
                reaction.setExcessReactantConc(erc);
                let id = addRID(reactionDivID, ExcessReactantConc.tagName);
                let lwi: HTMLDivElement = createLabelWithInput("number", id, boundary1, level1,
                    (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        setNumberNode(erc, target);
                    }, value.toExponential(), ExcessReactantConc.tagName);
                reactionDiv.appendChild(lwi);
            }
            // me:canonicalRateList
            let xml_crl = xml_reactions[i].getElementsByTagName(CanonicalRateList.tagName);
            //console.log("n_me:canonicalRateList=" + xml_crl.length);
            if (xml_crl.length > 0) {
                if (xml_crl.length > 1) {
                    throw new Error("Expecting 1 " + CanonicalRateList.tagName + " but finding " + xml_crl.length + "!");
                }
                let clr_attributes: Map<string, string> = getAttributes(xml_crl[0]);
                let crl: CanonicalRateList = new CanonicalRateList(clr_attributes);
                reaction.setCanonicalRateList(crl);
                // Create a new collapsible div for the canonicalRateList.
                let crlDivID: string = addRID(reactionDivID, CanonicalRateList.tagName);
                let crlDiv: HTMLDivElement = createDiv(crlDivID);
                let crlcDivID = addRID(crlDivID, s_container);
                let crlcDiv: HTMLDivElement = getCollapsibleDiv(crlcDivID, reactionDiv, null, crlDiv, CanonicalRateList.tagName, boundary1, level1);
                reactionDiv.appendChild(crlcDiv);
                //let id = addID(reaction.id, CanonicalRateList.tagName);
                // me:description.
                let xml_d: HTMLCollectionOf<Element> = xml_crl[0].getElementsByTagName(Description.tagName);
                //console.log("xml_d.length=" + xml_d.length);
                if (xml_d.length > 0) {
                    if (xml_d.length > 1) {
                        throw new Error("Expecting 1 " + Description.tagName + " but finding " + xml_d.length + "!");
                    }
                    let description: string = getNodeValue(getFirstChildNode(xml_d[0]));
                    //console.log("description=" + description);
                    crl.setDescription(new Description(getAttributes(xml_d[0]), description));
                    let l: HTMLLabelElement = createLabel(description + " (" + mapToString(clr_attributes) + ")", boundary1);
                    let ldiv = createDiv(undefined, level1);
                    ldiv.appendChild(l);
                    crlDiv.appendChild(ldiv);
                }
                // me:kinf.
                let xml_k: HTMLCollectionOf<Element> = xml_crl[0].getElementsByTagName(Kinf.tagName);
                //console.log("xml_k.length=" + xml_k.length);
                if (xml_k.length > 0) {
                    // Create a table for the kinf.
                    let t: HTMLTableElement = createTable(addRID(crlDivID, Kinf.tagName, s_table), level1);
                    crlDiv.appendChild(t);
                    for (let j = 0; j < xml_k.length; j++) {
                        let k: Kinf = new Kinf(getAttributes(xml_k[j]));
                        crl.addKinf(k);
                        // T.
                        let xml_T: HTMLCollectionOf<Element> = xml_k[j].getElementsByTagName(T.tagName);
                        //console.log("xml_T.length=" + xml_T.length);
                        if (xml_T.length > 0) {
                            if (xml_T.length > 1) {
                                throw new Error("Expecting 1 " + T.tagName + " but finding " + xml_T.length + "!");
                            }
                            let value: Big = new Big(getNodeValue(getFirstChildNode(xml_T[0])));
                            k.setT(new T(getAttributes(xml_T[0]), value));
                        }
                        // Val.
                        let xml_Val: HTMLCollectionOf<Element> = xml_k[j].getElementsByTagName(Val.tagName);
                        //console.log("xml_Val.length=" + xml_Val.length);
                        if (xml_Val.length > 0) {
                            if (xml_Val.length > 1) {
                                throw new Error("Expecting 1 " + Val.tagName + " but finding " + xml_Val.length + "!");
                            }
                            let value: Big = new Big(getNodeValue(getFirstChildNode(xml_Val[0])));
                            k.setVal(new Val(getAttributes(xml_Val[0]), value));
                        }
                        // Rev.
                        let xml_Rev: HTMLCollectionOf<Element> = xml_k[j].getElementsByTagName(Rev.tagName);
                        //console.log("xml_Rev.length=" + xml_Rev.length);
                        if (xml_Rev.length > 0) {
                            if (xml_Rev.length > 1) {
                                throw new Error("Expecting 1 " + Rev.tagName + " but finding " + xml_Rev.length + "!");
                            }
                            let value: Big = new Big(getNodeValue(getFirstChildNode(xml_Rev[0])));
                            k.setRev(new Rev(getAttributes(xml_Rev[0]), value));
                        }
                        // Keq.
                        let xml_Keq: HTMLCollectionOf<Element> = xml_k[j].getElementsByTagName(Keq.tagName);
                        //console.log("xml_Keq.length=" + xml_Keq.length);
                        if (xml_Keq.length > 0) {
                            if (xml_Keq.length > 1) {
                                throw new Error("Expecting 1 " + Keq.tagName + " but finding " + xml_Keq.length + "!");
                            }
                            let value: Big = new Big(getNodeValue(getFirstChildNode(xml_Keq[0])));
                            k.setKeq(new Keq(getAttributes(xml_Keq[0]), value));
                        }
                        if (j == 0) {
                            // It maybe that only the first kinf contains unit details!
                            addTableRow(t, k.getHeader());
                        }
                        addTableRow(t, k.toStringArray());
                    }
                    addSaveAsCSVButton(crl.toCSV.bind(crl), crlDiv, t, reaction.id + "_" + CanonicalRateList.tagName, level1);
                }
            }
        }
    } else {
        console.warn("No reaction elements found! Please add a reaction in reactionList.");
    }
    // Add a button to add a reaction.
    getAddReactionButton(reactionListDiv, reactions, molecules);
    return reactionListDiv;
}