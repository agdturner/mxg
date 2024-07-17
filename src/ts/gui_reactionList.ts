import Big from "big.js";
import {
    s_Add_sy_add, addRID, level1, s_container, boundary1, getMoleculeKeys, addAnyUnits,
    addSaveAsCSVButton, s_input, s_table, setNumberNode, addRemoveButton, IDManager, mesmer, s_Reactants, s_Products, s_Transition_States, s_Tunneling, big0, defaults, redrawReactionsDiagram
} from "./app.js";
import {
    createButton, s_button, createDiv, getCollapsibleDiv, createSelectElement, s_select,
    addTableRow, createLabel, createLabelWithInput, createLabelWithSelect, createTable,
    resizeInputElement, resizeSelectElement, createFlexDiv
} from "./html.js";
import { ReactionList, Description, T } from "./xml_mesmer.js";
import { Molecule } from "./xml_molecule.js";
import {
    Reaction, Reactant, ActivationEnergy, CanonicalRateList, ExcessReactantConc, Keq, Kinf,
    MCRCMethod, MesmerILT, NInfinity, PreExponential, Product, ReactionMolecule, Rev, TInfinity,
    TransitionState, Tunneling, Val
} from "./xml_reaction.js";
import { getID, mapToString } from "./util.js";
import {
    getFirstElement, getFirstChildNode, getNodeValue, getInputString, getAttributes,
    getSingularElement
} from './xml.js';
import { BathGas } from "./xml_conditions.js";

/**
 * Create an add reaction button.
 */
export function getAddReactionButton(rIDM: IDManager, rlDiv: HTMLDivElement, reactions: Map<string, Reaction>,
    molecules: Map<string, Molecule>): HTMLButtonElement {
    let rb: HTMLButtonElement = createButton(s_Add_sy_add, addRID(Reaction.tagName, "add", s_button), level1);
    rlDiv.appendChild(rb);
    rb.addEventListener('click', () => {
        let reactionAttributes: Map<string, string> = new Map();
        // Get Reaction ID.
        let rl: ReactionList = mesmer.getReactionList();
        let i: number = rl.getNextReactionID();
        console.log("Next Reaction ID=" + i);
        reactionAttributes.set(Reaction.s_id, "R" + i);
        let r: Reaction = new Reaction(reactionAttributes);
        reactions.set(r.id, r);
        // Add to mesmer.
        rl.addReaction(r);
        let rDivID: string = rIDM.addID(Reaction.tagName, r.id);
        let rDiv: HTMLDivElement = createDiv(rDivID);
        rlDiv.appendChild(rDiv);
        // Create collapsible content.
        let rcDivID: string = rIDM.addID(rDivID, s_container);
        let rcDiv: HTMLDivElement = getCollapsibleDiv(rcDivID, rlDiv, rb, rDiv, r.getLabel(), boundary1, level1);
        let rcb: HTMLButtonElement = rcDiv.querySelector('button') as HTMLButtonElement;
        // Create collapsible content for reactants.
        let rsDivID: string = rIDM.addID(rDivID, Reactant.tagName);
        let rsDiv: HTMLDivElement = createDiv(rsDivID);
        let rscDivID = rIDM.addID(rsDivID, s_container);
        let rscDiv: HTMLDivElement = getCollapsibleDiv(rscDivID, rDiv, null, rsDiv, s_Reactants, boundary1, level1);
        let reactants: Map<string, Reactant> = new Map();
        r.setReactants(reactants);
        addAddReactantButton(r, rcb, rIDM, rDivID, rsDiv, molecules, reactants);
        // Create collapsible content for products.
        let psDivID: string = rIDM.addID(rDivID, Product.tagName);
        let psDiv: HTMLDivElement = createDiv(psDivID);
        let pscDivID = rIDM.addID(psDivID, s_container);
        let pscDiv: HTMLDivElement = getCollapsibleDiv(pscDivID, rDiv, null, psDiv, s_Products, boundary1, level1);
        let products: Map<string, Product> = new Map();
        r.setProducts(products);
        addAddProductButton(r, rcb, rIDM, rDivID, psDiv, molecules, products);
        // Create collapsible content for transition states.
        let tsDivID: string = rIDM.addID(rDivID, TransitionState.tagName);
        let tsDiv: HTMLDivElement = createDiv(tsDivID);
        let tscDivID = rIDM.addID(tsDivID, s_container);
        let tscDiv: HTMLDivElement = getCollapsibleDiv(tscDivID, rDiv, null, tsDiv, s_Transition_States, boundary1, level1);
        let transitionStates: Map<string, TransitionState> = new Map();
        r.setTransitionStates(transitionStates);
        addAddTransitionStateButton(rIDM, rDivID, tsDiv, molecules, transitionStates);
        // Create collapsible content for MCRCMethod.
        let mmDivId: string = rIDM.addID(rDivID, MCRCMethod.tagName);
        let mmDiv: HTMLDivElement = createDiv(mmDivId);
        let mmcDivId = rIDM.addID(mmDivId, s_container);
        let mmcDiv: HTMLDivElement = getCollapsibleDiv(mmcDivId, rDiv, null, mmDiv, MCRCMethod.tagName, boundary1, level1);
        //rDiv.appendChild(mmcDiv);
        let mmAttributes: Map<string, string> = new Map();
        mmAttributes.set("xsi:type", MesmerILT.xsiType);
        let mm: MCRCMethod = new MesmerILT(mmAttributes);
        r.setMCRCMethod(mm);
        let inputString: string;
        let value: Big; 
        // PreExponential.
        if (true) {
            // Get value from defaults.
            if (defaults != undefined) {
                inputString = defaults.values.get(PreExponential.tagName) ?? "";
                if (inputString == "") {
                    inputString= "6.00e-12";
                }
            } else {
                inputString= "6.00e-12";
            }
            value = new Big(inputString);
            let peAttributes: Map<string, string> = new Map();
            let pe: PreExponential = new PreExponential(peAttributes, value);
            (mm as MesmerILT).setPreExponential(pe);
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
        // ActivationEnergy.
        if (true) {
            // Get value from defaults.
            if (defaults != undefined) {
                inputString = defaults.values.get(ActivationEnergy.tagName) ?? "";
                if (inputString == "") {
                    inputString = "0.0";
                }
            } else {
                inputString= "0.0";
            }
            value = new Big(inputString);
            let aeAttributes: Map<string, string> = new Map();
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
        // TInfinity.
        if (true) {
            // Get value from defaults.
            if (defaults != undefined) {
                inputString = defaults.values.get(TInfinity.tagName) ?? "";
                if (inputString == "") {
                    inputString = "298";
                }
            } else {
                inputString= "298";
            }
            value = new Big(inputString);
            let tiAttributes: Map<string, string> = new Map();
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
        // NInfininty.
        if (true) {
            // Get value from defaults.
            if (defaults != undefined) {
                inputString = defaults.values.get(NInfinity.tagName) ?? "";
                if (inputString == "") {
                    inputString = "0.08";
                }
            } else {
                inputString= "0.08";
            }
            value = new Big(inputString);
            let niAttributes: Map<string, string> = new Map();
            let ni: NInfinity = new NInfinity(niAttributes, value);
            (mm as MesmerILT).setNInfinity(ni);
            // Create a new div element for the input.
            let lwi: HTMLDivElement = createLabelWithInput("number", addRID(mmDivId, NInfinity.tagName, s_input), boundary1, level1,
                (event: Event) => {
                    let target = event.target as HTMLInputElement;
                    setNumberNode(ni, target);
                }, inputString, NInfinity.tagName);
            mmDiv.appendChild(lwi);
            let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
            input.value = inputString;
            resizeInputElement(input);
            input.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLInputElement;
                inputString = target.value;
                ni.value = new Big(inputString);
                console.log(NInfinity.tagName + " set to " + inputString);
                resizeInputElement(input);
            });
            addAnyUnits(undefined, niAttributes, lwi, null, addRID(mmDivId, NInfinity.tagName), NInfinity.tagName,
                boundary1, boundary1);
            mmDiv.appendChild(lwi);
        }
        // ExcessReactantConc.
        let ercDivId: string = rIDM.addID(rDivID, ExcessReactantConc.tagName);
        let ercDiv: HTMLDivElement = createDiv(ercDivId);
        // Get default value.
        if (defaults != undefined) {
            inputString = defaults.values.get(ExcessReactantConc.tagName) ?? "";
            if (inputString == "") {
                inputString = "2.25e+16";
            }
        } else {
            inputString= "2.25e+16";
        }
        value = new Big(inputString);
        let erc: ExcessReactantConc = new ExcessReactantConc(new Map(), value);
        r.setExcessReactantConc(erc);
        // Create a new div element for the input.
        let lwi: HTMLDivElement = createLabelWithInput("number", addRID(ercDivId, ExcessReactantConc.tagName, s_input), boundary1, level1,
            (event: Event) => {
                let target = event.target as HTMLInputElement;
                setNumberNode(erc, target);
            }, inputString, ExcessReactantConc.tagName);
        let input: HTMLInputElement = lwi.querySelector('input') as HTMLInputElement;
        input.value = inputString;
        resizeInputElement(input);
        input.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLInputElement;
            let inputString = target.value;
            erc.value = new Big(inputString);
            console.log(ExcessReactantConc.tagName + " changed to " + inputString);
            resizeInputElement(input);
        });
        addAnyUnits(undefined, new Map(), lwi, null, addRID(ercDivId, ExcessReactantConc.tagName), ExcessReactantConc.tagName, boundary1, boundary1);
        ercDiv.appendChild(lwi);
        rDiv.appendChild(ercDiv);
        
        // Add a remove reaction button.
        addRemoveButton(rDiv, level1, () => {
            removeReaction(rlDiv, rcDiv, rIDM, rDivID, reactions, r);
        });

    });
    return rb;
}

/**
 * For adding an add reactant button.
 * @param r The reaction.
 * @param rIDM The IDManager for the reaction list.
 * @param rDivID The reaction div ID.
 * @param rsDiv The reactants div.
 * @param molecules The molecules map.
 * @param reactants The reactants map.
 */
function addAddReactantButton(r: Reaction, rcb: HTMLButtonElement, rIDM: IDManager, rDivID: string, rsDiv: HTMLDivElement,
    molecules: Map<string, Molecule>, reactants: Map<string, Reactant>): void {
    // Add an add button to add a reactant.
    let addReactantButton: HTMLButtonElement = createButton(s_Add_sy_add,
        rIDM.addID(rDivID, Reactant.tagName, s_button), level1);
    rsDiv.appendChild(addReactantButton);
    addReactantButton.addEventListener('click', () => {
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        //let reactantDivID: string = rIDM.addID(rDivID, Reactant.tagName, mid);
        //let reactantDiv: HTMLDivElement = createDiv(reactantDivID);
        let reactantDiv: HTMLDivElement = createFlexDiv(undefined);
        rsDiv.insertBefore(reactantDiv, addReactantButton);
        // Create a selector to select a molecule as a reactant.
        let selectReactant: HTMLSelectElement = createSelectElement(getMoleculeKeys(molecules), s_select, "",
            getID(rDivID, Reactant.tagName, s_select), level1);
        // Have the select element update options if new molecules are added.
        selectReactant.classList.add(BathGas.tagName);
        reactantDiv.appendChild(selectReactant);
        // Add an event listener to the select element.
        selectReactant.addEventListener('click', (event: Event) => {
            if (selectReactant.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectReactant.selectedIndex = 0;
                selectReactant.dispatchEvent(new Event('change'));
            }
        });
        selectReactant.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            let molecule: Molecule = molecules.get(target.value) as Molecule;
            let rmAttributes: Map<string, string> = new Map();
            let mid: string = molecule.getID();
            if (reactants.has(mid)) {
                alert("Molecule already selected as a reactant. Please select a different molecule \
                (you may want to add more molecules to the moleculeList).");
                // Remove the select element.
                reactantDiv.removeChild(selectReactant);
                return;
            }
            reactantDiv.id = rIDM.addID(rDivID, Reactant.tagName, mid);
            rmAttributes.set(ReactionMolecule.s_ref, mid);
            let rm: ReactionMolecule = new ReactionMolecule(rmAttributes);
            let reactant: Reactant = new Reactant(new Map(), rm);
            reactants.set(mid, reactant);
            r.addReactant(reactant);
            // Update the collapsible button label with the molecule name.
            rcb.textContent = r.getLabel();
            console.log("ReactionLabel=" + r.getLabel());
            // Create a new div for the role selector.
            let lws: HTMLDivElement = createLabelWithSelect(rm.getRef() + " role", Reactant.roleOptions, "Role",
                rm.getRole(), getID(rDivID, s_select), boundary1, level1);
            let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
            select?.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLSelectElement;
                rm.setRole(target.value);
                console.log("Set Role to " + target.value);
                resizeSelectElement(target);
            });
            reactantDiv.appendChild(lws);
            // Remove the select element.
            reactantDiv.removeChild(selectReactant);
            // Add a remove button to remove the reactant.
            let rrb: HTMLButtonElement = addRemoveButton(reactantDiv, boundary1, () => {
                rsDiv.removeChild(reactantDiv);
                reactants.delete(mid);
                r.removeReactant(mid);
                // Redraw the reaction diagram.
                redrawReactionsDiagram();
            });
            // Redraw the reaction diagram.
            redrawReactionsDiagram();
        });
        if (selectReactant.options.length === 1) {
            // If there is only one option then select it.
            selectReactant.selectedIndex = 0;
            selectReactant.dispatchEvent(new Event('change'));
        }
    });
}

/**
 * For adding an add product button.
 * @param rcb The reaction button.
 * @param rIDM The IDManager for the reaction list.
 * @param rDivID The reaction div ID.
 * @param psDiv The products div.
 * @param molecules The molecules map.
 * @param products The products map.
 */
function addAddProductButton(r: Reaction, rcb: HTMLButtonElement, rIDM: IDManager, rDivID: string,
    psDiv: HTMLDivElement, molecules: Map<string, Molecule>, products: Map<string, Product>) {
    // Add an add button to add a product.
    let addProductButton: HTMLButtonElement = createButton(s_Add_sy_add,
        rIDM.addID(rDivID, Product.tagName, s_button), level1);
    psDiv.appendChild(addProductButton);
    addProductButton.addEventListener('click', () => {
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        //let productDivID: string = rIDM.addID(rDivID, Product.tagName, mid);
        //let productDiv: HTMLDivElement = createDiv(productDivID);
        let productDiv: HTMLDivElement = createFlexDiv(undefined);
        psDiv.insertBefore(productDiv, addProductButton);
        // Create a selector to select a molecule as a product.
        let selectProduct: HTMLSelectElement = createSelectElement(getMoleculeKeys(molecules), s_select, "",
            getID(rDivID, Product.tagName, s_select), level1);
        // Have the select element update options if new molecules are added.
        selectProduct.classList.add(BathGas.tagName);
        productDiv.appendChild(selectProduct);
        // Add an event listener to the select element.
        selectProduct.addEventListener('click', (event: Event) => {
            if (selectProduct.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectProduct.selectedIndex = 0;
                selectProduct.dispatchEvent(new Event('change'));
            }
        });
        selectProduct.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            let molecule: Molecule = molecules.get(target.value) as Molecule;
            let rmAttributes: Map<string, string> = new Map();
            let mid: string = molecule.getID();
            if (products.has(mid)) {
                alert("Molecule already selected as a product. Please select a different molecule (you may want to add more molecules to the moleculeList).");
                // Remove the select element.
                productDiv.removeChild(selectProduct);
                //r.removeProduct(target.value);
                return;
            }
            productDiv.id = rIDM.addID(rDivID, Product.tagName, mid);
            rmAttributes.set(ReactionMolecule.s_ref, mid);
            let rm: ReactionMolecule = new ReactionMolecule(rmAttributes);
            let product: Product = new Product(new Map(), rm);
            products.set(mid, product);
            r.addProduct(product);
            // Update the collapsible button label with the molecule name.
            rcb.textContent = r.getLabel();
            console.log("ReactionLabel=" + r.getLabel());
            // Create a new div for the role selector.
            let lws: HTMLDivElement = createLabelWithSelect(rm.getRef() + " role", Product.roleOptions, "Role",
                rm.getRole(), getID(rDivID, s_select), boundary1, level1);
            let select: HTMLSelectElement = lws.querySelector('select') as HTMLSelectElement;
            select?.addEventListener('change', (event: Event) => {
                let target = event.target as HTMLSelectElement;
                rm.setRole(target.value);
                console.log("Set Role to " + target.value);
                resizeSelectElement(target);
            });
            productDiv.appendChild(lws);
            // Remove the select element.
            productDiv.removeChild(selectProduct);
            // Add a remove button to remove the product.
            let prb: HTMLButtonElement = addRemoveButton(productDiv, boundary1, () => {
                psDiv.removeChild(productDiv);
                products.delete(mid);
                r.removeProduct(mid);
                // Redraw the reaction diagram.
                redrawReactionsDiagram();
            });
            // Redraw the reaction diagram.
            redrawReactionsDiagram();
        });
        if (selectProduct.options.length === 1) {
            // If there is only one option then select it.
            selectProduct.selectedIndex = 0;
            selectProduct.dispatchEvent(new Event('change'));
        }
    });
}

/**
 * For adding an add transition state button.
 * @param rIDM The IDManager for the reaction list.
 * @param rDivID The reaction div ID.
 * @param tsDiv The transition state div.
 * @param molecules The molecules map.
 * @param transitionStates The transition states map.
 */
function addAddTransitionStateButton(rIDM: IDManager, rDivID: string, tsDiv: HTMLDivElement, molecules: Map<string, Molecule>,
    transitionStates: Map<string, TransitionState>) {
    // Add an add button to add a transition state.
    let addTSButton: HTMLButtonElement = createButton(s_Add_sy_add,
        rIDM.addID(rDivID, TransitionState.tagName, s_button), level1);
    tsDiv.appendChild(addTSButton);
    addTSButton.addEventListener('click', () => {
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        let ts2Div: HTMLDivElement = createFlexDiv(undefined);
        tsDiv.insertBefore(ts2Div, addTSButton);
        // Create a selector to select a molecule as a reactant.
        let selectTS: HTMLSelectElement = createSelectElement(getMoleculeKeys(molecules), s_select, "",
            getID(rDivID, TransitionState.tagName, s_select), level1);
        // Have the select element update options if new molecules are added.
        selectTS.classList.add(BathGas.tagName);
        ts2Div.appendChild(selectTS);
        // Add an event listener to the select element.
        selectTS.addEventListener('click', (event: Event) => {
            if (selectTS.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectTS.selectedIndex = 0;
                selectTS.dispatchEvent(new Event('change'));
            }
        });
        selectTS.addEventListener('change', (event: Event) => {
            let target = event.target as HTMLSelectElement;
            let molecule: Molecule = molecules.get(target.value) as Molecule;
            let rmAttributes: Map<string, string> = new Map();
            let mid: string = molecule.getID();
            if (transitionStates.has(mid)) {
                alert("Molecule already selected as a transitionState. Please select a different molecule (you may want to add more molecules to the moleculeList).");
                // Remove the select element.
                tsDiv.removeChild(selectTS);
                return;
            }
            ts2Div.id = rIDM.addID(rDivID, TransitionState.tagName, mid);
            rmAttributes.set(ReactionMolecule.s_ref, mid);
            let rm: ReactionMolecule = new ReactionMolecule(rmAttributes);
            let reactant: TransitionState = new TransitionState(new Map(), rm);
            transitionStates.set(mid, reactant);
            // Create a label for the Transition State role.
            let label: HTMLLabelElement = createLabel(rm.getRef() + " role " + TransitionState.role, level1);
            ts2Div.appendChild(label);
            // Remove the select element.
            ts2Div.removeChild(selectTS);
            // Add a remove button to remove the transition state.
            let rrb: HTMLButtonElement = addRemoveButton(ts2Div, boundary1, () => {
                ts2Div.removeChild(tsDiv);
                transitionStates.delete(mid);
            });
        });
        if (selectTS.options.length === 1) {
            // If there is only one option then select it.
            selectTS.selectedIndex = 0;
            selectTS.dispatchEvent(new Event('change'));
        }
    });
}

/**
 * Remove a reaction.
 * @param rlDiv The reaction list div.
 * @param rcDiv The reaction collapsible div.
 * @param rIDM The reaction list IDManager.
 * @param rDivID The reaction div ID.
 * @param reactions The reactions map.
 * @param r The reaction to remove.
 */
function removeReaction(rlDiv: HTMLDivElement, rcDiv: HTMLDivElement, rIDM: IDManager, rDivID: string,
    reactions: Map<string, Reaction>, r: Reaction) {
    rlDiv.removeChild(rcDiv);
    rIDM.removeIDs(rDivID);
    rIDM.removeIDs(getID(rDivID, s_container));
    rIDM.removeIDs(getID(rDivID, Reactant.tagName));
    reactions.delete(r.id);
    mesmer.getReactionList().removeReaction(r.id);
}

/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param xml The XML document.
 * @param rIDM The IDManager for the reaction list.
 * @param rb The reaction button.
 * @param reactions The reactions map.
 * @param molecules The molecules map.
 */
export function processReactionList(xml: XMLDocument, rIDM: IDManager, rsDivID: string,
    reactions: Map<string, Reaction>,
    molecules: Map<string, Molecule>): HTMLDivElement {
    let bid: string = getID(rsDivID, s_button);
    let rcb: HTMLButtonElement = document.querySelector(bid) as HTMLButtonElement;
    // Create div to contain the reaction list.
    let rlDiv: HTMLDivElement = createDiv(undefined, boundary1);
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
            // Create a new collapsible div for the reactants.
            let rsDivID: string = rIDM.addID(reactionDivID, Reactant.tagName);
            let rsDiv: HTMLDivElement = createDiv(rsDivID);
            let rscDivID = getID(rsDivID, s_container);
            let rscDiv: HTMLDivElement = getCollapsibleDiv(rscDivID, reactionDiv, null, rsDiv, s_Reactants, boundary1, level1);
            let reactants: Map<string, Reactant> = new Map();
            if (xml_reactants.length > 0) {
                for (let j = 0; j < xml_reactants.length; j++) {
                    let reactantDivID = getID(rsDivID, Reactant.tagName, j);
                    let reactantDiv: HTMLDivElement = createFlexDiv(reactantDivID);
                    rsDiv.appendChild(reactantDiv);
                    let xml_molecule: Element = getFirstElement(xml_reactants[j], Molecule.tagName);
                    let rmAttributes: Map<string, string> = getAttributes(xml_molecule);
                    let molecule: ReactionMolecule = new ReactionMolecule(rmAttributes);
                    let reactant: Reactant = new Reactant(getAttributes(xml_reactants[j]), molecule);
                    reactants.set(molecule.getRef(), reactant);
                    // Create a new div for the role.
                    let lws: HTMLDivElement = createLabelWithSelect(molecule.getRef() + " role", Reactant.roleOptions, "Role",
                        molecule.getRole(), rIDM.addID(reactantDivID, s_select), boundary1, level1);
                    lws.querySelector('select')?.addEventListener('change', (event: Event) => {
                        let target = event.target as HTMLSelectElement;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        resizeSelectElement(target);
                    });
                    reactantDiv.appendChild(lws);
                    // Add a remove button to remove the reactant.
                    let rrb: HTMLButtonElement = addRemoveButton(reactantDiv, boundary1, () => {
                        rsDiv.removeChild(reactantDiv);
                        rIDM.removeIDs(reactantDivID);
                        reactants.delete(molecule.getRef());
                    });
                }
                reaction.setReactants(reactants);
            }
            addAddReactantButton(reaction, rcb, rIDM, reactionDivID, rsDiv, molecules, reactants);
            // Load products.
            let xml_products: HTMLCollectionOf<Element> = xml_reactions[i].getElementsByTagName(Product.tagName);
            reactionTagNames.delete(Product.tagName);
            //console.log("xml_products.length=" + xml_products.length);
            // Create collapsible div for the products.
            let psDivID: string = rIDM.addID(reactionDivID, Product.tagName);
            let psDiv: HTMLDivElement = createFlexDiv(psDivID);
            let pscDivID = getID(psDivID, s_container);
            let pscDiv: HTMLDivElement = getCollapsibleDiv(pscDivID, reactionDiv, null, psDiv,
                s_Products, boundary1, level1);
            //let products: Product[] = [];
            let products: Map<string, Product> = new Map();
            if (xml_products.length > 0) {
                for (let j = 0; j < xml_products.length; j++) {
                    let xml_molecule: Element = getFirstElement(xml_products[j], Molecule.tagName);
                    let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                    let product: Product = new Product(getAttributes(xml_products[j]), molecule);
                    //products.push(product);
                    products.set(molecule.getRef(), product);
                    let lws: HTMLDivElement = createLabelWithSelect(molecule.getRef() + " role", Product.roleOptions, molecule.getRole(),
                        molecule.getRef(), rIDM.addID(psDivID, j, "Role"), boundary1, level1);
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
                    // Add a remove button to remove the product.
                    let prb: HTMLButtonElement = addRemoveButton(psDiv, boundary1, () => {
                        psDiv.removeChild(lws);
                        rIDM.removeIDs(psDivID);
                        products.delete(molecule.getRef());
                    });
                }
                reaction.setProducts(products);
            }
            addAddProductButton(reaction, rcb, rIDM, reactionDivID, psDiv, molecules, products);
            // Create a new collapsible div for the reaction.
            let reactioncDivID = addRID(reactionDivID, s_container);
            let reactioncDiv: HTMLDivElement = getCollapsibleDiv(reactioncDivID, rlDiv, null, reactionDiv,
                reaction.getLabel(), boundary1, level1);

            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName(Tunneling.tagName);
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) {
                    throw new Error("Expecting 1 " + Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
                }
                let tunneling: Tunneling = new Tunneling(getAttributes(xml_tunneling[0]));
                reaction.setTunneling(tunneling);
                let lws: HTMLDivElement = createLabelWithSelect(Tunneling.tagName, Tunneling.options, s_Tunneling, tunneling.getName(),
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
            // Create collapsible div.
            let tsDivID: string = addRID(reactionDivID, TransitionState.tagName);
            let tsDiv: HTMLDivElement = createDiv(tsDivID);
            let tscDivID = addRID(tsDivID, s_container);
            let tscDiv: HTMLDivElement = getCollapsibleDiv(tscDivID, reactionDiv, null, tsDiv,
                s_Transition_States, boundary1, level1);
            let transitionStates: Map<string, TransitionState> = new Map();
            if (xml_transitionStates.length > 0) {
                for (let j = 0; j < xml_transitionStates.length; j++) {
                    let xml_molecule: Element = getFirstElement(xml_transitionStates[j], Molecule.tagName);
                    let molecule: ReactionMolecule = new ReactionMolecule(getAttributes(xml_molecule));
                    let transitionState: TransitionState = new TransitionState(getAttributes(xml_transitionStates[j]), molecule);
                    transitionStates.set(molecule.getRef(), transitionState);
                    // Create a label for the Transition State role.
                    let label: HTMLLabelElement = createLabel(molecule.getRef() + " role " + TransitionState.role, level1);
                    tsDiv.appendChild(label);
                }
                reaction.setTransitionStates(transitionStates);
            }
            addAddTransitionStateButton(rIDM, reactionDivID, tsDiv, molecules, transitionStates);
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
            // Add a remove reaction button.
            addRemoveButton(reactionDiv, level1, () => {
                removeReaction(rlDiv, reactioncDiv, rIDM, reactionDivID, reactions, reaction);
            });
        }
    } else {
        console.warn("No reaction elements found! Please add a reaction in reactionList.");
    }
    // Add a button to add a reaction.
    getAddReactionButton(rIDM, rlDiv, reactions, molecules);
    return rlDiv;
}