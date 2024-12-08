"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddReactionButton = getAddReactionButton;
exports.processReactionList = processReactionList;
const big_js_1 = __importDefault(require("big.js"));
const app_js_1 = require("./app.js");
const html_js_1 = require("./html.js");
const xml_mesmer_js_1 = require("./xml_mesmer.js");
const xml_molecule_js_1 = require("./xml_molecule.js");
const xml_reaction_js_1 = require("./xml_reaction.js");
const util_js_1 = require("./util.js");
const xml_js_1 = require("./xml.js");
const xml_conditions_js_1 = require("./xml_conditions.js");
/**
 * Create an add reaction button.
 */
function getAddReactionButton(rIDM, rlDiv, reactions, molecules) {
    let rb = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, (0, app_js_1.addRID)(xml_reaction_js_1.Reaction.tagName, "add", html_js_1.s_button), app_js_1.level1);
    rlDiv.appendChild(rb);
    rb.addEventListener('click', () => {
        let reactionAttributes = new Map();
        // Get Reaction ID.
        let rl = app_js_1.mesmer.getReactionList();
        let i = rl.getNextReactionID();
        console.log("Next Reaction ID=" + i);
        reactionAttributes.set(xml_reaction_js_1.Reaction.s_id, "R" + i);
        let r = new xml_reaction_js_1.Reaction(reactionAttributes);
        reactions.set(r.id, r);
        // Add to mesmer.
        rl.addReaction(r);
        let rDivID = rIDM.addID(xml_reaction_js_1.Reaction.tagName, r.id);
        let rDiv = (0, html_js_1.createDiv)(rDivID);
        rlDiv.appendChild(rDiv);
        // Create collapsible content.
        let rcDivID = rIDM.addID(rDivID, app_js_1.s_container);
        let rcDiv = (0, html_js_1.getCollapsibleDiv)(rcDivID, rlDiv, rb, rDiv, r.getLabel(), app_js_1.boundary1, app_js_1.level1);
        let rcb = rcDiv.querySelector('button');
        // Create collapsible content for reactants.
        let rsDivID = rIDM.addID(rDivID, xml_reaction_js_1.Reactant.tagName);
        let rsDiv = (0, html_js_1.createDiv)(rsDivID);
        let rscDivID = rIDM.addID(rsDivID, app_js_1.s_container);
        let rscDiv = (0, html_js_1.getCollapsibleDiv)(rscDivID, rDiv, null, rsDiv, app_js_1.s_Reactants, app_js_1.boundary1, app_js_1.level1);
        let reactants = new Map();
        r.setReactants(reactants);
        addAddReactantButton(r, rcb, rIDM, rDivID, rsDiv, molecules, reactants);
        // Create collapsible content for products.
        let psDivID = rIDM.addID(rDivID, xml_reaction_js_1.Product.tagName);
        let psDiv = (0, html_js_1.createDiv)(psDivID);
        let pscDivID = rIDM.addID(psDivID, app_js_1.s_container);
        let pscDiv = (0, html_js_1.getCollapsibleDiv)(pscDivID, rDiv, null, psDiv, app_js_1.s_Products, app_js_1.boundary1, app_js_1.level1);
        let products = new Map();
        r.setProducts(products);
        addAddProductButton(r, rcb, rIDM, rDivID, psDiv, molecules, products);
        // Create collapsible content for transition states.
        let tsDivID = rIDM.addID(rDivID, xml_reaction_js_1.TransitionState.tagName);
        let tsDiv = (0, html_js_1.createDiv)(tsDivID);
        let tscDivID = rIDM.addID(tsDivID, app_js_1.s_container);
        let tscDiv = (0, html_js_1.getCollapsibleDiv)(tscDivID, rDiv, null, tsDiv, app_js_1.s_Transition_States, app_js_1.boundary1, app_js_1.level1);
        let transitionStates = new Map();
        r.setTransitionStates(transitionStates);
        addAddTransitionStateButton(rIDM, rDivID, tsDiv, molecules, transitionStates);
        // Create collapsible content for MCRCMethod.
        let mmDivId = rIDM.addID(rDivID, xml_reaction_js_1.MCRCMethod.tagName);
        let mmDiv = (0, html_js_1.createDiv)(mmDivId);
        let mmcDivId = rIDM.addID(mmDivId, app_js_1.s_container);
        let mmcDiv = (0, html_js_1.getCollapsibleDiv)(mmcDivId, rDiv, null, mmDiv, xml_reaction_js_1.MCRCMethod.tagName, app_js_1.boundary1, app_js_1.level1);
        //rDiv.appendChild(mmcDiv);
        let mmAttributes = new Map();
        mmAttributes.set("xsi:type", xml_reaction_js_1.MesmerILT.xsiType);
        let mm = new xml_reaction_js_1.MesmerILT(mmAttributes);
        r.setMCRCMethod(mm);
        let inputString;
        let value;
        // PreExponential.
        if (true) {
            // Get value from defaults.
            if (app_js_1.defaults != undefined) {
                inputString = app_js_1.defaults.values.get(xml_reaction_js_1.PreExponential.tagName) ?? "";
                if (inputString == "") {
                    inputString = "6.00e-12";
                }
            }
            else {
                inputString = "6.00e-12";
            }
            value = new big_js_1.default(inputString);
            let peAttributes = new Map();
            let pe = new xml_reaction_js_1.PreExponential(peAttributes, value);
            mm.setPreExponential(pe);
            let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.PreExponential.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                (0, app_js_1.setNumberNode)(pe, target);
            }, inputString, xml_reaction_js_1.PreExponential.tagName);
            mmDiv.appendChild(lwi);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, html_js_1.resizeInputElement)(input);
            input.addEventListener('change', (event) => {
                let target = event.target;
                inputString = target.value;
                pe.value = new big_js_1.default(inputString);
                console.log(xml_reaction_js_1.PreExponential.tagName + " changed to " + inputString);
                (0, html_js_1.resizeInputElement)(input);
            });
            (0, app_js_1.addAnyUnits)(undefined, peAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.PreExponential.tagName), xml_reaction_js_1.PreExponential.tagName, app_js_1.boundary1, app_js_1.boundary1);
            mmDiv.appendChild(lwi);
        }
        // ActivationEnergy.
        if (true) {
            // Get value from defaults.
            if (app_js_1.defaults != undefined) {
                inputString = app_js_1.defaults.values.get(xml_reaction_js_1.ActivationEnergy.tagName) ?? "";
                if (inputString == "") {
                    inputString = "0.0";
                }
            }
            else {
                inputString = "0.0";
            }
            value = new big_js_1.default(inputString);
            let aeAttributes = new Map();
            let ae = new xml_reaction_js_1.ActivationEnergy(aeAttributes, value);
            mm.setActivationEnergy(ae);
            // Create a new div element for the input.
            let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.ActivationEnergy.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                (0, app_js_1.setNumberNode)(ae, target);
            }, inputString, xml_reaction_js_1.ActivationEnergy.tagName);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, html_js_1.resizeInputElement)(input);
            input.addEventListener('change', (event) => {
                let target = event.target;
                inputString = target.value;
                ae.value = new big_js_1.default(inputString);
                console.log(xml_reaction_js_1.ActivationEnergy.tagName + " changed to " + inputString);
                (0, html_js_1.resizeInputElement)(input);
            });
            (0, app_js_1.addAnyUnits)(undefined, aeAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.ActivationEnergy.tagName), xml_reaction_js_1.ActivationEnergy.tagName, app_js_1.boundary1, app_js_1.boundary1);
            mmDiv.appendChild(lwi);
        }
        // TInfinity.
        if (true) {
            // Get value from defaults.
            if (app_js_1.defaults != undefined) {
                inputString = app_js_1.defaults.values.get(xml_reaction_js_1.TInfinity.tagName) ?? "";
                if (inputString == "") {
                    inputString = "298";
                }
            }
            else {
                inputString = "298";
            }
            value = new big_js_1.default(inputString);
            let tiAttributes = new Map();
            let ti = new xml_reaction_js_1.TInfinity(tiAttributes, value);
            mm.setTInfinity(ti);
            // Create a new div element for the input.
            let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.TInfinity.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                (0, app_js_1.setNumberNode)(ti, target);
            }, inputString, xml_reaction_js_1.TInfinity.tagName);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, html_js_1.resizeInputElement)(input);
            input.addEventListener('change', (event) => {
                let target = event.target;
                inputString = target.value;
                ti.value = new big_js_1.default(inputString);
                console.log(xml_reaction_js_1.TInfinity.tagName + " changed to " + inputString);
                (0, html_js_1.resizeInputElement)(input);
            });
            (0, app_js_1.addAnyUnits)(undefined, tiAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.TInfinity.tagName), xml_reaction_js_1.TInfinity.tagName, app_js_1.boundary1, app_js_1.boundary1);
            mmDiv.appendChild(lwi);
        }
        // NInfininty.
        if (true) {
            // Get value from defaults.
            if (app_js_1.defaults != undefined) {
                inputString = app_js_1.defaults.values.get(xml_reaction_js_1.NInfinity.tagName) ?? "";
                if (inputString == "") {
                    inputString = "0.08";
                }
            }
            else {
                inputString = "0.08";
            }
            value = new big_js_1.default(inputString);
            let niAttributes = new Map();
            let ni = new xml_reaction_js_1.NInfinity(niAttributes, value);
            mm.setNInfinity(ni);
            // Create a new div element for the input.
            let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.NInfinity.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                let target = event.target;
                (0, app_js_1.setNumberNode)(ni, target);
            }, inputString, xml_reaction_js_1.NInfinity.tagName);
            mmDiv.appendChild(lwi);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, html_js_1.resizeInputElement)(input);
            input.addEventListener('change', (event) => {
                let target = event.target;
                inputString = target.value;
                ni.value = new big_js_1.default(inputString);
                console.log(xml_reaction_js_1.NInfinity.tagName + " set to " + inputString);
                (0, html_js_1.resizeInputElement)(input);
            });
            (0, app_js_1.addAnyUnits)(undefined, niAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.NInfinity.tagName), xml_reaction_js_1.NInfinity.tagName, app_js_1.boundary1, app_js_1.boundary1);
            mmDiv.appendChild(lwi);
        }
        // ExcessReactantConc.
        let ercDivId = rIDM.addID(rDivID, xml_reaction_js_1.ExcessReactantConc.tagName);
        let ercDiv = (0, html_js_1.createDiv)(ercDivId);
        // Get default value.
        if (app_js_1.defaults != undefined) {
            inputString = app_js_1.defaults.values.get(xml_reaction_js_1.ExcessReactantConc.tagName) ?? "";
            if (inputString == "") {
                inputString = "2.25e+16";
            }
        }
        else {
            inputString = "2.25e+16";
        }
        value = new big_js_1.default(inputString);
        let erc = new xml_reaction_js_1.ExcessReactantConc(new Map(), value);
        r.setExcessReactantConc(erc);
        // Create a new div element for the input.
        let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(ercDivId, xml_reaction_js_1.ExcessReactantConc.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
            let target = event.target;
            (0, app_js_1.setNumberNode)(erc, target);
        }, inputString, xml_reaction_js_1.ExcessReactantConc.tagName);
        let input = lwi.querySelector('input');
        input.value = inputString;
        (0, html_js_1.resizeInputElement)(input);
        input.addEventListener('change', (event) => {
            let target = event.target;
            let inputString = target.value;
            erc.value = new big_js_1.default(inputString);
            console.log(xml_reaction_js_1.ExcessReactantConc.tagName + " changed to " + inputString);
            (0, html_js_1.resizeInputElement)(input);
        });
        (0, app_js_1.addAnyUnits)(undefined, new Map(), lwi, null, (0, app_js_1.addRID)(ercDivId, xml_reaction_js_1.ExcessReactantConc.tagName), xml_reaction_js_1.ExcessReactantConc.tagName, app_js_1.boundary1, app_js_1.boundary1);
        ercDiv.appendChild(lwi);
        rDiv.appendChild(ercDiv);
        // Add a remove reaction button.
        (0, app_js_1.addRemoveButton)(rDiv, app_js_1.level1, () => {
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
function addAddReactantButton(r, rcb, rIDM, rDivID, rsDiv, molecules, reactants) {
    // Add an add button to add a reactant.
    let addReactantButton = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, rIDM.addID(rDivID, xml_reaction_js_1.Reactant.tagName, html_js_1.s_button), app_js_1.level1);
    rsDiv.appendChild(addReactantButton);
    addReactantButton.addEventListener('click', () => {
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        //let reactantDivID: string = rIDM.addID(rDivID, Reactant.tagName, mid);
        //let reactantDiv: HTMLDivElement = createDiv(reactantDivID);
        let reactantDiv = (0, html_js_1.createFlexDiv)(undefined);
        rsDiv.insertBefore(reactantDiv, addReactantButton);
        // Create a selector to select a molecule as a reactant.
        let selectReactant = (0, html_js_1.createSelectElement)((0, app_js_1.getMoleculeKeys)(molecules), html_js_1.s_select, "", (0, util_js_1.getID)(rDivID, xml_reaction_js_1.Reactant.tagName, html_js_1.s_select), app_js_1.level1);
        // Have the select element update options if new molecules are added.
        selectReactant.classList.add(xml_conditions_js_1.BathGas.tagName);
        reactantDiv.appendChild(selectReactant);
        // Add an event listener to the select element.
        selectReactant.addEventListener('click', (event) => {
            if (selectReactant.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectReactant.selectedIndex = 0;
                selectReactant.dispatchEvent(new Event('change'));
            }
        });
        selectReactant.addEventListener('change', (event) => {
            let target = event.target;
            let molecule = molecules.get(target.value);
            let rmAttributes = new Map();
            let mid = molecule.getID();
            if (reactants.has(mid)) {
                alert("Molecule already selected as a reactant. Please select a different molecule \
                (you may want to add more molecules to the moleculeList).");
                // Remove the select element.
                reactantDiv.removeChild(selectReactant);
                return;
            }
            reactantDiv.id = rIDM.addID(rDivID, xml_reaction_js_1.Reactant.tagName, mid);
            rmAttributes.set(xml_reaction_js_1.ReactionMolecule.s_ref, mid);
            let rm = new xml_reaction_js_1.ReactionMolecule(rmAttributes);
            let reactant = new xml_reaction_js_1.Reactant(new Map(), rm);
            reactants.set(mid, reactant);
            r.addReactant(reactant);
            // Update the collapsible button label with the molecule name.
            rcb.textContent = r.getLabel();
            console.log("ReactionLabel=" + r.getLabel());
            // Create a new div for the role selector.
            let lws = (0, html_js_1.createLabelWithSelect)(rm.getRef() + " role", xml_reaction_js_1.Reactant.roleOptions, "Role", rm.getRole(), (0, util_js_1.getID)(rDivID, html_js_1.s_select), app_js_1.boundary1, app_js_1.level1);
            let select = lws.querySelector('select');
            select?.addEventListener('change', (event) => {
                let target = event.target;
                rm.setRole(target.value);
                console.log("Set Role to " + target.value);
                (0, html_js_1.resizeSelectElement)(target);
            });
            reactantDiv.appendChild(lws);
            // Remove the select element.
            reactantDiv.removeChild(selectReactant);
            // Add a remove button to remove the reactant.
            let rrb = (0, app_js_1.addRemoveButton)(reactantDiv, app_js_1.boundary1, () => {
                rsDiv.removeChild(reactantDiv);
                reactants.delete(mid);
                r.removeReactant(mid);
                // Redraw the reaction diagram.
                (0, app_js_1.redrawReactionsDiagram)();
            });
            // Redraw the reaction diagram.
            (0, app_js_1.redrawReactionsDiagram)();
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
function addAddProductButton(r, rcb, rIDM, rDivID, psDiv, molecules, products) {
    // Add an add button to add a product.
    let addProductButton = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, rIDM.addID(rDivID, xml_reaction_js_1.Product.tagName, html_js_1.s_button), app_js_1.level1);
    psDiv.appendChild(addProductButton);
    addProductButton.addEventListener('click', () => {
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        //let productDivID: string = rIDM.addID(rDivID, Product.tagName, mid);
        //let productDiv: HTMLDivElement = createDiv(productDivID);
        let productDiv = (0, html_js_1.createFlexDiv)(undefined);
        psDiv.insertBefore(productDiv, addProductButton);
        // Create a selector to select a molecule as a product.
        let selectProduct = (0, html_js_1.createSelectElement)((0, app_js_1.getMoleculeKeys)(molecules), html_js_1.s_select, "", (0, util_js_1.getID)(rDivID, xml_reaction_js_1.Product.tagName, html_js_1.s_select), app_js_1.level1);
        // Have the select element update options if new molecules are added.
        selectProduct.classList.add(xml_conditions_js_1.BathGas.tagName);
        productDiv.appendChild(selectProduct);
        // Add an event listener to the select element.
        selectProduct.addEventListener('click', (event) => {
            if (selectProduct.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectProduct.selectedIndex = 0;
                selectProduct.dispatchEvent(new Event('change'));
            }
        });
        selectProduct.addEventListener('change', (event) => {
            let target = event.target;
            let molecule = molecules.get(target.value);
            let rmAttributes = new Map();
            let mid = molecule.getID();
            if (products.has(mid)) {
                alert("Molecule already selected as a product. Please select a different molecule (you may want to add more molecules to the moleculeList).");
                // Remove the select element.
                productDiv.removeChild(selectProduct);
                //r.removeProduct(target.value);
                return;
            }
            productDiv.id = rIDM.addID(rDivID, xml_reaction_js_1.Product.tagName, mid);
            rmAttributes.set(xml_reaction_js_1.ReactionMolecule.s_ref, mid);
            let rm = new xml_reaction_js_1.ReactionMolecule(rmAttributes);
            let product = new xml_reaction_js_1.Product(new Map(), rm);
            products.set(mid, product);
            r.addProduct(product);
            // Update the collapsible button label with the molecule name.
            rcb.textContent = r.getLabel();
            console.log("ReactionLabel=" + r.getLabel());
            // Create a new div for the role selector.
            let lws = (0, html_js_1.createLabelWithSelect)(rm.getRef() + " role", xml_reaction_js_1.Product.roleOptions, "Role", rm.getRole(), (0, util_js_1.getID)(rDivID, html_js_1.s_select), app_js_1.boundary1, app_js_1.level1);
            let select = lws.querySelector('select');
            select?.addEventListener('change', (event) => {
                let target = event.target;
                rm.setRole(target.value);
                console.log("Set Role to " + target.value);
                (0, html_js_1.resizeSelectElement)(target);
            });
            productDiv.appendChild(lws);
            // Remove the select element.
            productDiv.removeChild(selectProduct);
            // Add a remove button to remove the product.
            let prb = (0, app_js_1.addRemoveButton)(productDiv, app_js_1.boundary1, () => {
                psDiv.removeChild(productDiv);
                products.delete(mid);
                r.removeProduct(mid);
                // Redraw the reaction diagram.
                (0, app_js_1.redrawReactionsDiagram)();
            });
            // Redraw the reaction diagram.
            (0, app_js_1.redrawReactionsDiagram)();
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
function addAddTransitionStateButton(rIDM, rDivID, tsDiv, molecules, transitionStates) {
    // Add an add button to add a transition state.
    let addTSButton = (0, html_js_1.createButton)(app_js_1.s_Add_sy_add, rIDM.addID(rDivID, xml_reaction_js_1.TransitionState.tagName, html_js_1.s_button), app_js_1.level1);
    tsDiv.appendChild(addTSButton);
    addTSButton.addEventListener('click', () => {
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        let ts2Div = (0, html_js_1.createFlexDiv)(undefined);
        tsDiv.insertBefore(ts2Div, addTSButton);
        // Create a selector to select a molecule as a reactant.
        let selectTS = (0, html_js_1.createSelectElement)((0, app_js_1.getMoleculeKeys)(molecules), html_js_1.s_select, "", (0, util_js_1.getID)(rDivID, xml_reaction_js_1.TransitionState.tagName, html_js_1.s_select), app_js_1.level1);
        // Have the select element update options if new molecules are added.
        selectTS.classList.add(xml_conditions_js_1.BathGas.tagName);
        ts2Div.appendChild(selectTS);
        // Add an event listener to the select element.
        selectTS.addEventListener('click', (event) => {
            if (selectTS.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectTS.selectedIndex = 0;
                selectTS.dispatchEvent(new Event('change'));
            }
        });
        selectTS.addEventListener('change', (event) => {
            let target = event.target;
            let molecule = molecules.get(target.value);
            let rmAttributes = new Map();
            let mid = molecule.getID();
            if (transitionStates.has(mid)) {
                alert("Molecule already selected as a transitionState. Please select a different molecule (you may want to add more molecules to the moleculeList).");
                // Remove the select element.
                tsDiv.removeChild(selectTS);
                return;
            }
            ts2Div.id = rIDM.addID(rDivID, xml_reaction_js_1.TransitionState.tagName, mid);
            rmAttributes.set(xml_reaction_js_1.ReactionMolecule.s_ref, mid);
            let rm = new xml_reaction_js_1.ReactionMolecule(rmAttributes);
            let reactant = new xml_reaction_js_1.TransitionState(new Map(), rm);
            transitionStates.set(mid, reactant);
            // Create a label for the Transition State role.
            let label = (0, html_js_1.createLabel)(rm.getRef() + " role " + xml_reaction_js_1.TransitionState.role, app_js_1.level1);
            ts2Div.appendChild(label);
            // Remove the select element.
            ts2Div.removeChild(selectTS);
            // Add a remove button to remove the transition state.
            let rrb = (0, app_js_1.addRemoveButton)(ts2Div, app_js_1.boundary1, () => {
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
function removeReaction(rlDiv, rcDiv, rIDM, rDivID, reactions, r) {
    rlDiv.removeChild(rcDiv);
    rIDM.removeIDs(rDivID);
    rIDM.removeIDs((0, util_js_1.getID)(rDivID, app_js_1.s_container));
    rIDM.removeIDs((0, util_js_1.getID)(rDivID, xml_reaction_js_1.Reactant.tagName));
    reactions.delete(r.id);
    app_js_1.mesmer.getReactionList().removeReaction(r.id);
}
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param xml The XML document.
 * @param rIDM The IDManager for the reaction list.
 * @param rb The reaction button.
 * @param reactions The reactions map.
 * @param molecules The molecules map.
 */
function processReactionList(xml, rIDM, rsDivID, reactions, molecules) {
    let bid = (0, util_js_1.getID)(rsDivID, html_js_1.s_button);
    let rcb = document.querySelector(bid);
    // Create div to contain the reaction list.
    let rlDiv = (0, html_js_1.createDiv)(undefined, app_js_1.boundary1);
    // Get the XML "reactionList" element.
    let xml_reactionList = (0, xml_js_1.getSingularElement)(xml, xml_mesmer_js_1.ReactionList.tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames = new Set();
    xml_reactionList.childNodes.forEach(function (node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size > 0) {
        if (reactionListTagNames.size != 1) {
            if (!((reactionListTagNames.size == 2 && reactionListTagNames.has("#text")) ||
                ((reactionListTagNames.size == 3 && reactionListTagNames.has("#text") && reactionListTagNames.has("#comment"))))) {
                console.error("reactionListTagNames:");
                reactionListTagNames.forEach(x => console.error(x));
                throw new Error("Additional tag names in reactionList:");
            }
        }
        if (!reactionListTagNames.has(xml_reaction_js_1.Reaction.tagName)) {
            throw new Error("Expecting tags with \"" + xml_reaction_js_1.Reaction.tagName + "\" tagName but there are none!");
        }
        // Process the XML "reaction" elements.
        let xml_reactions = xml_reactionList.getElementsByTagName(xml_reaction_js_1.Reaction.tagName);
        let xml_reactions_length = xml_reactions.length;
        console.log("Number of reactions=" + xml_reactions_length);
        //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for (let i = 0; i < xml_reactions.length; i++) {
            // Set attributes.
            let reactionAttributes = (0, xml_js_1.getAttributes)(xml_reactions[i]);
            // Create reaction.
            let reaction = new xml_reaction_js_1.Reaction(reactionAttributes);
            reactions.set(reaction.id, reaction);
            let reactionTagNames = new Set();
            let cns = xml_reactions[i].childNodes;
            // Create a new div for the reaction.
            let reactionDivID = (0, app_js_1.addRID)(xml_reaction_js_1.Reaction.tagName, i);
            let reactionDiv = (0, html_js_1.createDiv)(reactionDivID);
            //console.log("cns.length=" + cns.length);
            //cns.forEach(function (cn) {
            for (let j = 0; j < cns.length; j++) {
                let cn = cns[j];
                // Check for nodeName repeats that are not #text.
                if (!reactionTagNames.has(cn.nodeName)) {
                    reactionTagNames.add(cn.nodeName);
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
            // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
            // Load reactants.
            let xml_reactants = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.Reactant.tagName);
            reactionTagNames.delete(xml_reaction_js_1.Reactant.tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            // Create a new collapsible div for the reactants.
            let rsDivID = rIDM.addID(reactionDivID, xml_reaction_js_1.Reactant.tagName);
            let rsDiv = (0, html_js_1.createDiv)(rsDivID);
            let rscDivID = (0, util_js_1.getID)(rsDivID, app_js_1.s_container);
            let rscDiv = (0, html_js_1.getCollapsibleDiv)(rscDivID, reactionDiv, null, rsDiv, app_js_1.s_Reactants, app_js_1.boundary1, app_js_1.level1);
            let reactants = new Map();
            if (xml_reactants.length > 0) {
                for (let j = 0; j < xml_reactants.length; j++) {
                    let reactantDivID = (0, util_js_1.getID)(rsDivID, xml_reaction_js_1.Reactant.tagName, j);
                    let reactantDiv = (0, html_js_1.createFlexDiv)(reactantDivID);
                    rsDiv.appendChild(reactantDiv);
                    let xml_molecule = (0, xml_js_1.getFirstElement)(xml_reactants[j], xml_molecule_js_1.Molecule.tagName);
                    let rmAttributes = (0, xml_js_1.getAttributes)(xml_molecule);
                    let molecule = new xml_reaction_js_1.ReactionMolecule(rmAttributes);
                    let reactant = new xml_reaction_js_1.Reactant((0, xml_js_1.getAttributes)(xml_reactants[j]), molecule);
                    reactants.set(molecule.getRef(), reactant);
                    // Create a new div for the role.
                    let lws = (0, html_js_1.createLabelWithSelect)(molecule.getRef() + " role", xml_reaction_js_1.Reactant.roleOptions, "Role", molecule.getRole(), rIDM.addID(reactantDivID, html_js_1.s_select), app_js_1.boundary1, app_js_1.level1);
                    lws.querySelector('select')?.addEventListener('change', (event) => {
                        let target = event.target;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        (0, html_js_1.resizeSelectElement)(target);
                    });
                    reactantDiv.appendChild(lws);
                    // Add a remove button to remove the reactant.
                    let rrb = (0, app_js_1.addRemoveButton)(reactantDiv, app_js_1.boundary1, () => {
                        rsDiv.removeChild(reactantDiv);
                        rIDM.removeIDs(reactantDivID);
                        reactants.delete(molecule.getRef());
                    });
                }
                reaction.setReactants(reactants);
            }
            addAddReactantButton(reaction, rcb, rIDM, reactionDivID, rsDiv, molecules, reactants);
            // Load products.
            let xml_products = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.Product.tagName);
            reactionTagNames.delete(xml_reaction_js_1.Product.tagName);
            //console.log("xml_products.length=" + xml_products.length);
            // Create collapsible div for the products.
            let psDivID = rIDM.addID(reactionDivID, xml_reaction_js_1.Product.tagName);
            let psDiv = (0, html_js_1.createFlexDiv)(psDivID);
            let pscDivID = (0, util_js_1.getID)(psDivID, app_js_1.s_container);
            let pscDiv = (0, html_js_1.getCollapsibleDiv)(pscDivID, reactionDiv, null, psDiv, app_js_1.s_Products, app_js_1.boundary1, app_js_1.level1);
            //let products: Product[] = [];
            let products = new Map();
            if (xml_products.length > 0) {
                for (let j = 0; j < xml_products.length; j++) {
                    let xml_molecule = (0, xml_js_1.getFirstElement)(xml_products[j], xml_molecule_js_1.Molecule.tagName);
                    let molecule = new xml_reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                    let product = new xml_reaction_js_1.Product((0, xml_js_1.getAttributes)(xml_products[j]), molecule);
                    //products.push(product);
                    products.set(molecule.getRef(), product);
                    let lws = (0, html_js_1.createLabelWithSelect)(molecule.getRef() + " role", xml_reaction_js_1.Product.roleOptions, molecule.getRole(), molecule.getRef(), rIDM.addID(psDivID, j, "Role"), app_js_1.boundary1, app_js_1.level1);
                    let select = lws.querySelector('select');
                    select.value = molecule.getRole();
                    select.addEventListener('change', (event) => {
                        let target = event.target;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        (0, html_js_1.resizeSelectElement)(target);
                    });
                    (0, html_js_1.resizeSelectElement)(select);
                    psDiv.appendChild(lws);
                    // Add a remove button to remove the product.
                    let prb = (0, app_js_1.addRemoveButton)(psDiv, app_js_1.boundary1, () => {
                        psDiv.removeChild(lws);
                        rIDM.removeIDs(psDivID);
                        products.delete(molecule.getRef());
                    });
                }
                reaction.setProducts(products);
            }
            addAddProductButton(reaction, rcb, rIDM, reactionDivID, psDiv, molecules, products);
            // Create a new collapsible div for the reaction.
            let reactioncDivID = (0, app_js_1.addRID)(reactionDivID, app_js_1.s_container);
            let reactioncDiv = (0, html_js_1.getCollapsibleDiv)(reactioncDivID, rlDiv, null, reactionDiv, reaction.getLabel(), app_js_1.boundary1, app_js_1.level1);
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.Tunneling.tagName);
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) {
                    throw new Error("Expecting 1 " + xml_reaction_js_1.Tunneling.tagName + " but finding " + xml_tunneling.length + "!");
                }
                let tunneling = new xml_reaction_js_1.Tunneling((0, xml_js_1.getAttributes)(xml_tunneling[0]));
                reaction.setTunneling(tunneling);
                let lws = (0, html_js_1.createLabelWithSelect)(xml_reaction_js_1.Tunneling.tagName, xml_reaction_js_1.Tunneling.options, app_js_1.s_Tunneling, tunneling.getName(), (0, app_js_1.addRID)(reactionDivID, xml_reaction_js_1.Tunneling.tagName), app_js_1.boundary1, app_js_1.level1);
                lws.querySelector('select')?.addEventListener('change', (event) => {
                    let target = event.target;
                    tunneling.setName(target.value);
                    console.log("Set Tunneling to " + target.value);
                    (0, html_js_1.resizeSelectElement)(target);
                });
                reactionDiv.appendChild(lws);
            }
            // Load transition states.
            let xml_transitionStates = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.TransitionState.tagName);
            //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
            // Create collapsible div.
            let tsDivID = (0, app_js_1.addRID)(reactionDivID, xml_reaction_js_1.TransitionState.tagName);
            let tsDiv = (0, html_js_1.createDiv)(tsDivID);
            let tscDivID = (0, app_js_1.addRID)(tsDivID, app_js_1.s_container);
            let tscDiv = (0, html_js_1.getCollapsibleDiv)(tscDivID, reactionDiv, null, tsDiv, app_js_1.s_Transition_States, app_js_1.boundary1, app_js_1.level1);
            let transitionStates = new Map();
            if (xml_transitionStates.length > 0) {
                for (let j = 0; j < xml_transitionStates.length; j++) {
                    let xml_molecule = (0, xml_js_1.getFirstElement)(xml_transitionStates[j], xml_molecule_js_1.Molecule.tagName);
                    let molecule = new xml_reaction_js_1.ReactionMolecule((0, xml_js_1.getAttributes)(xml_molecule));
                    let transitionState = new xml_reaction_js_1.TransitionState((0, xml_js_1.getAttributes)(xml_transitionStates[j]), molecule);
                    transitionStates.set(molecule.getRef(), transitionState);
                    // Create a label for the Transition State role.
                    let label = (0, html_js_1.createLabel)(molecule.getRef() + " role " + xml_reaction_js_1.TransitionState.role, app_js_1.level1);
                    tsDiv.appendChild(label);
                }
                reaction.setTransitionStates(transitionStates);
            }
            addAddTransitionStateButton(rIDM, reactionDivID, tsDiv, molecules, transitionStates);
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.MCRCMethod.tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) {
                    throw new Error("Expecting 1 " + xml_reaction_js_1.MCRCMethod.tagName + " but finding " + xml_MCRCMethod.length + "!");
                }
                else {
                    let mm;
                    let mmAttributes = (0, xml_js_1.getAttributes)(xml_MCRCMethod[0]);
                    let type = mmAttributes.get("xsi:type");
                    if (type == undefined) {
                        // If there is no xsi:type search for a name.
                        type = mmAttributes.get("name");
                    }
                    let mmDivId = (0, app_js_1.addRID)(reactionDivID, xml_reaction_js_1.MCRCMethod.tagName);
                    let mmDiv = (0, html_js_1.createDiv)(mmDivId);
                    if (type == xml_reaction_js_1.MesmerILT.xsiType || type == xml_reaction_js_1.MesmerILT.xsiType2) {
                        // Create a collapsible div.
                        let mmcDivId = (0, app_js_1.addRID)(mmDivId, app_js_1.s_container);
                        let mmcDiv = (0, html_js_1.getCollapsibleDiv)(mmcDivId, reactionDiv, null, mmDiv, xml_reaction_js_1.MCRCMethod.tagName, app_js_1.boundary1, app_js_1.level1);
                        reactionDiv.appendChild(mmcDiv);
                        //console.log(MCRCMethod.tagName + " name=" + name);
                        mm = new xml_reaction_js_1.MesmerILT(mmAttributes);
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        let xml_pe = xml_MCRCMethod[0].getElementsByTagName(xml_reaction_js_1.PreExponential.tagName);
                        if (xml_pe != null) {
                            if (xml_pe[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_pe[0]);
                                let value = new big_js_1.default(inputString);
                                let peAttributes = (0, xml_js_1.getAttributes)(xml_pe[0]);
                                let pe = new xml_reaction_js_1.PreExponential(peAttributes, value);
                                mm.setPreExponential(pe);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.PreExponential.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                                    let target = event.target;
                                    (0, app_js_1.setNumberNode)(pe, target);
                                }, inputString, xml_reaction_js_1.PreExponential.tagName);
                                mmDiv.appendChild(lwi);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, html_js_1.resizeInputElement)(input);
                                input.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    pe.value = new big_js_1.default(inputString);
                                    console.log(xml_reaction_js_1.PreExponential.tagName + " changed to " + inputString);
                                    (0, html_js_1.resizeInputElement)(input);
                                });
                                (0, app_js_1.addAnyUnits)(undefined, peAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.PreExponential.tagName), xml_reaction_js_1.PreExponential.tagName, app_js_1.boundary1, app_js_1.boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_ae = xml_MCRCMethod[0].getElementsByTagName(xml_reaction_js_1.ActivationEnergy.tagName);
                        if (xml_ae != null) {
                            if (xml_ae[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_ae[0]);
                                let value = new big_js_1.default(inputString);
                                let aeAttributes = (0, xml_js_1.getAttributes)(xml_ae[0]);
                                let ae = new xml_reaction_js_1.ActivationEnergy(aeAttributes, value);
                                mm.setActivationEnergy(ae);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.ActivationEnergy.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                                    let target = event.target;
                                    (0, app_js_1.setNumberNode)(ae, target);
                                }, inputString, xml_reaction_js_1.ActivationEnergy.tagName);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, html_js_1.resizeInputElement)(input);
                                input.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    ae.value = new big_js_1.default(inputString);
                                    console.log(xml_reaction_js_1.ActivationEnergy.tagName + " changed to " + inputString);
                                    (0, html_js_1.resizeInputElement)(input);
                                });
                                (0, app_js_1.addAnyUnits)(undefined, aeAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.ActivationEnergy.tagName), xml_reaction_js_1.ActivationEnergy.tagName, app_js_1.boundary1, app_js_1.boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_ti = xml_MCRCMethod[0].getElementsByTagName(xml_reaction_js_1.TInfinity.tagName);
                        if (xml_ti != null) {
                            if (xml_ti[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_ti[0]);
                                let value = new big_js_1.default(inputString);
                                let tiAttributes = (0, xml_js_1.getAttributes)(xml_ti[0]);
                                let ti = new xml_reaction_js_1.TInfinity(tiAttributes, value);
                                mm.setTInfinity(ti);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.TInfinity.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                                    let target = event.target;
                                    (0, app_js_1.setNumberNode)(ti, target);
                                }, inputString, xml_reaction_js_1.TInfinity.tagName);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, html_js_1.resizeInputElement)(input);
                                input.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    ti.value = new big_js_1.default(inputString);
                                    console.log(xml_reaction_js_1.TInfinity.tagName + " changed to " + inputString);
                                    (0, html_js_1.resizeInputElement)(input);
                                });
                                (0, app_js_1.addAnyUnits)(undefined, tiAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.TInfinity.tagName), xml_reaction_js_1.TInfinity.tagName, app_js_1.boundary1, app_js_1.boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_ni = xml_MCRCMethod[0].getElementsByTagName(xml_reaction_js_1.NInfinity.tagName);
                        if (xml_ni != null) {
                            if (xml_ni[0] != null) {
                                let inputString = (0, xml_js_1.getInputString)(xml_ni[0]);
                                let value = new big_js_1.default(inputString);
                                let niAttributes = (0, xml_js_1.getAttributes)(xml_ni[0]);
                                let ni = new xml_reaction_js_1.NInfinity(niAttributes, value);
                                mm.setNInfinity(ni);
                                // Create a new div element for the input.
                                let lwi = (0, html_js_1.createLabelWithInput)("number", (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.NInfinity.tagName, app_js_1.s_input), app_js_1.boundary1, app_js_1.level1, (event) => {
                                    let target = event.target;
                                    (0, app_js_1.setNumberNode)(ni, target);
                                }, inputString, xml_reaction_js_1.NInfinity.tagName);
                                mmDiv.appendChild(lwi);
                                let inputElement = lwi.querySelector('input');
                                inputElement.value = inputString;
                                (0, html_js_1.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event) => {
                                    let target = event.target;
                                    inputString = target.value;
                                    ni.value = new big_js_1.default(inputString);
                                    console.log(xml_reaction_js_1.NInfinity.tagName + " set to " + inputString);
                                    (0, html_js_1.resizeInputElement)(inputElement);
                                });
                                (0, app_js_1.addAnyUnits)(undefined, niAttributes, lwi, null, (0, app_js_1.addRID)(mmDivId, xml_reaction_js_1.NInfinity.tagName), xml_reaction_js_1.NInfinity.tagName, app_js_1.boundary1, app_js_1.boundary1);
                                mmDiv.appendChild(lwi);
                            }
                        }
                    }
                    else {
                        mm = new xml_reaction_js_1.MCRCMethod(mmAttributes);
                        let mCRCMethodLabel = document.createElement('label');
                        mCRCMethodLabel.textContent = xml_reaction_js_1.MCRCMethod.tagName + ": " + type;
                        Object.assign(mCRCMethodLabel.style, app_js_1.level1);
                        mmDiv.appendChild(mCRCMethodLabel);
                        reactionDiv.appendChild(mmDiv);
                    }
                    reaction.setMCRCMethod(mm);
                }
            }
            // me:excessReactantConc
            let xml_erc = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.ExcessReactantConc.tagName);
            //console.log("n_me:excessReactantConc=" + xml_erc.length);
            if (xml_erc.length > 0) {
                if (xml_erc.length > 1) {
                    throw new Error("Expecting 1 " + xml_reaction_js_1.ExcessReactantConc.tagName + " but finding " + xml_erc.length + "!");
                }
                let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_erc[0])));
                let erc = new xml_reaction_js_1.ExcessReactantConc((0, xml_js_1.getAttributes)(xml_erc[0]), value);
                reaction.setExcessReactantConc(erc);
                let id = (0, app_js_1.addRID)(reactionDivID, xml_reaction_js_1.ExcessReactantConc.tagName);
                let lwi = (0, html_js_1.createLabelWithInput)("number", id, app_js_1.boundary1, app_js_1.level1, (event) => {
                    let target = event.target;
                    (0, app_js_1.setNumberNode)(erc, target);
                }, value.toExponential(), xml_reaction_js_1.ExcessReactantConc.tagName);
                reactionDiv.appendChild(lwi);
            }
            // me:canonicalRateList
            let xml_crl = xml_reactions[i].getElementsByTagName(xml_reaction_js_1.CanonicalRateList.tagName);
            //console.log("n_me:canonicalRateList=" + xml_crl.length);
            if (xml_crl.length > 0) {
                if (xml_crl.length > 1) {
                    throw new Error("Expecting 1 " + xml_reaction_js_1.CanonicalRateList.tagName + " but finding " + xml_crl.length + "!");
                }
                let clr_attributes = (0, xml_js_1.getAttributes)(xml_crl[0]);
                let crl = new xml_reaction_js_1.CanonicalRateList(clr_attributes);
                reaction.setCanonicalRateList(crl);
                // Create a new collapsible div for the canonicalRateList.
                let crlDivID = (0, app_js_1.addRID)(reactionDivID, xml_reaction_js_1.CanonicalRateList.tagName);
                let crlDiv = (0, html_js_1.createDiv)(crlDivID);
                let crlcDivID = (0, app_js_1.addRID)(crlDivID, app_js_1.s_container);
                let crlcDiv = (0, html_js_1.getCollapsibleDiv)(crlcDivID, reactionDiv, null, crlDiv, xml_reaction_js_1.CanonicalRateList.tagName, app_js_1.boundary1, app_js_1.level1);
                reactionDiv.appendChild(crlcDiv);
                //let id = addID(reaction.id, CanonicalRateList.tagName);
                // me:description.
                let xml_d = xml_crl[0].getElementsByTagName(xml_mesmer_js_1.Description.tagName);
                //console.log("xml_d.length=" + xml_d.length);
                if (xml_d.length > 0) {
                    if (xml_d.length > 1) {
                        throw new Error("Expecting 1 " + xml_mesmer_js_1.Description.tagName + " but finding " + xml_d.length + "!");
                    }
                    let description = (0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_d[0]));
                    //console.log("description=" + description);
                    crl.setDescription(new xml_mesmer_js_1.Description((0, xml_js_1.getAttributes)(xml_d[0]), description));
                    let l = (0, html_js_1.createLabel)(description + " (" + (0, util_js_1.mapToString)(clr_attributes) + ")", app_js_1.boundary1);
                    let ldiv = (0, html_js_1.createDiv)(undefined, app_js_1.level1);
                    ldiv.appendChild(l);
                    crlDiv.appendChild(ldiv);
                }
                // me:kinf.
                let xml_k = xml_crl[0].getElementsByTagName(xml_reaction_js_1.Kinf.tagName);
                //console.log("xml_k.length=" + xml_k.length);
                if (xml_k.length > 0) {
                    // Create a table for the kinf.
                    let t = (0, html_js_1.createTable)((0, app_js_1.addRID)(crlDivID, xml_reaction_js_1.Kinf.tagName, app_js_1.s_table), app_js_1.level1);
                    crlDiv.appendChild(t);
                    for (let j = 0; j < xml_k.length; j++) {
                        let k = new xml_reaction_js_1.Kinf((0, xml_js_1.getAttributes)(xml_k[j]));
                        crl.addKinf(k);
                        // T.
                        let xml_T = xml_k[j].getElementsByTagName(xml_mesmer_js_1.T.tagName);
                        //console.log("xml_T.length=" + xml_T.length);
                        if (xml_T.length > 0) {
                            if (xml_T.length > 1) {
                                throw new Error("Expecting 1 " + xml_mesmer_js_1.T.tagName + " but finding " + xml_T.length + "!");
                            }
                            let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_T[0])));
                            k.setT(new xml_mesmer_js_1.T((0, xml_js_1.getAttributes)(xml_T[0]), value));
                        }
                        // Val.
                        let xml_Val = xml_k[j].getElementsByTagName(xml_reaction_js_1.Val.tagName);
                        //console.log("xml_Val.length=" + xml_Val.length);
                        if (xml_Val.length > 0) {
                            if (xml_Val.length > 1) {
                                throw new Error("Expecting 1 " + xml_reaction_js_1.Val.tagName + " but finding " + xml_Val.length + "!");
                            }
                            let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_Val[0])));
                            k.setVal(new xml_reaction_js_1.Val((0, xml_js_1.getAttributes)(xml_Val[0]), value));
                        }
                        // Rev.
                        let xml_Rev = xml_k[j].getElementsByTagName(xml_reaction_js_1.Rev.tagName);
                        //console.log("xml_Rev.length=" + xml_Rev.length);
                        if (xml_Rev.length > 0) {
                            if (xml_Rev.length > 1) {
                                throw new Error("Expecting 1 " + xml_reaction_js_1.Rev.tagName + " but finding " + xml_Rev.length + "!");
                            }
                            let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_Rev[0])));
                            k.setRev(new xml_reaction_js_1.Rev((0, xml_js_1.getAttributes)(xml_Rev[0]), value));
                        }
                        // Keq.
                        let xml_Keq = xml_k[j].getElementsByTagName(xml_reaction_js_1.Keq.tagName);
                        //console.log("xml_Keq.length=" + xml_Keq.length);
                        if (xml_Keq.length > 0) {
                            if (xml_Keq.length > 1) {
                                throw new Error("Expecting 1 " + xml_reaction_js_1.Keq.tagName + " but finding " + xml_Keq.length + "!");
                            }
                            let value = new big_js_1.default((0, xml_js_1.getNodeValue)((0, xml_js_1.getFirstChildNode)(xml_Keq[0])));
                            k.setKeq(new xml_reaction_js_1.Keq((0, xml_js_1.getAttributes)(xml_Keq[0]), value));
                        }
                        if (j == 0) {
                            // It maybe that only the first kinf contains unit details!
                            (0, html_js_1.addTableHeaderRow)(t, k.getHeader());
                        }
                        (0, html_js_1.addTableRow)(t, k.toStringArray());
                    }
                    (0, app_js_1.addSaveAsCSVButton)(crl.toCSV.bind(crl), crlDiv, t, reaction.id + "_" + xml_reaction_js_1.CanonicalRateList.tagName, app_js_1.level1);
                }
            }
            // Add a remove reaction button.
            (0, app_js_1.addRemoveButton)(reactionDiv, app_js_1.level1, () => {
                removeReaction(rlDiv, reactioncDiv, rIDM, reactionDivID, reactions, reaction);
            });
        }
    }
    else {
        console.warn("No reaction elements found! Please add a reaction in reactionList.");
    }
    // Add a button to add a reaction.
    //getAddReactionButton(rIDM, rlDiv, reactions, molecules);
    return rlDiv;
}
//# sourceMappingURL=gui_reactionList.js.map