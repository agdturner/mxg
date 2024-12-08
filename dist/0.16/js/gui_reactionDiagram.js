"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReactionDiagram = createReactionDiagram;
exports.drawReactionDiagram = drawReactionDiagram;
const app_1 = require("./app");
const canvas_1 = require("./canvas");
const html_1 = require("./html");
const util_1 = require("./util");
/**
 * Create the reaction diagram.
 * @param rdDiv The reaction diagram div.
 * @param rdcID The reaction diagram canvas ID.
 * @param rdcHeight The reaction diagram canvas height.
 * @param dark Whether to use dark mode.
 * @param rd_font The font to use.
 * @param rd_lw The line width of reactants, transition states and products.
 * @param rd_lwc The line width of connector lines.
 * @param rdWindow The window to pop the diagram into.
 * @param draw Whether to draw the reaction diagram.
 */
//export function createReactionDiagram(rdDiv: HTMLDivElement, rdcID: string, rdcHeight: number, dark: boolean,
function createReactionDiagram(rdcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, draw) {
    // Destroy any existing rdWindow.
    if (rdWindow != null) {
        rdWindow.close();
        rdWindow = null;
    }
    let rddDiv = document.getElementById(app_1.reactionsDiagramDivID);
    let rdDivID = (0, app_1.addRID)(app_1.s_Reactions_Diagram);
    // If rdDiv already exists, remove it.
    (0, app_1.remove)(rdDivID);
    // Create collapsible content.
    let rdDiv = (0, html_1.createDiv)(rdDivID, app_1.level1);
    rddDiv.appendChild(rdDiv);
    // Create collapsible content.
    let rdcDiv = (0, html_1.getCollapsibleDiv)(rdDivID, rddDiv, null, rdDiv, app_1.s_Reactions_Diagram, app_1.boundary1, app_1.level0);
    // Create a pop diagram button in its own div.
    let bDivId = (0, app_1.addRID)(rdDiv.id, html_1.s_button + 's');
    let bDiv = (0, html_1.createDiv)(bDivId);
    rdDiv.appendChild(bDiv);
    let pbID = (0, app_1.addRID)(bDivId, html_1.s_button);
    let popOutText = "Pop into a new Window";
    let pb = (0, html_1.createButton)(popOutText, pbID);
    bDiv.appendChild(pb);
    let rdCanvas = document.createElement('canvas');
    rdCanvas.id = rdcID;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdcHeight;
    rdCanvas.style.border = "1px solid black";
    //rdCanvas.style.margin = "1px";
    if (draw) {
        drawReactionDiagram(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    }
    // Add action listener to the pop diagram button.
    pb.addEventListener('click', () => {
        //if (rdWindow == null || rdWindow.closed) {
        if (rdWindow == null) {
            let popWindowRDCanvas = document.createElement('canvas');
            popWindowRDCanvas.id = rdcID;
            rdWindow = window.open("", app_1.s_Reactions_Diagram, "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            rdWindow.document.body.appendChild(popWindowRDCanvas);
            if (draw) {
                drawReactionDiagram(popWindowRDCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
            }
            (0, app_1.remove)(rdcID);
            pb.textContent = "Pop into this Window";
        }
        else {
            rdCanvas = document.createElement('canvas');
            rdCanvas.id = rdcID;
            rdDiv.appendChild(rdCanvas);
            rdCanvas.height = rdcHeight;
            rdCanvas.style.border = "1px solid black";
            if (draw) {
                drawReactionDiagram(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
            }
            rdWindow.close();
            rdWindow = null;
            pb.textContent = popOutText;
        }
    });
    (0, app_1.addSaveAsPNGButton)(rdCanvas, bDiv, null, app_1.s_Reactions_Diagram);
}
/**
 * Create a diagram.
 * @param canvas The canvas.
 * @param rdcHeight The reaction diagram canvas height.
 * @param dark True for dark mode.
 * @param font The font to use.
 * @param lw The line width of reactants, transition states and products.
 * @param lwc The line width of connector lines.
 * @param molecules The molecules.
 * @param reactions The reactions.
 */
function drawReactionDiagram(canvas, rdcHeight, dark, font, lw, lwc, molecules, reactions) {
    console.log("drawReactionDiagram");
    let units = "kJ/mol"; // Default units for energy. To be replaced with a true value.
    if (canvas != null && reactions.size > 0) {
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
        }
        else {
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
        let th = (0, canvas_1.getTextHeight)(ctx, "Aj", ctx.font);
        //console.log("th=" + th);
        // Go through reactions:
        // 1. Create sets of reactants, end products, intermediate products and transition states.
        // 2. Create maps of orders and energies.
        // 3. Calculate maximum energy.
        let reactants = [];
        let products = new Set();
        let intProducts = new Set();
        let tss = new Set();
        let orders = new Map();
        let energies = new Map();
        let i = 0;
        let energyMin;
        let energyMax;
        reactions.forEach(function (reaction, id) {
            // Get TransitionStates.
            //let reactionTransitionStates: TransitionState[] = reaction.getTransitionStates();
            let rtss = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            if (reactantsLabel != undefined) {
                reactants.push(reactantsLabel);
                if (products.has(reactantsLabel)) {
                    intProducts.add(reactantsLabel);
                }
                let energy = reaction.getReactantsEnergy(app_1.getMolecule, molecules);
                console.log("energy=" + energy.toString());
                units = reaction.getEnergyUnits(app_1.getMolecule, molecules, reaction.getReactants());
                console.log("units=" + units);
                energyMin = (0, util_1.min)(energyMin, energy);
                energyMax = (0, util_1.max)(energyMax, energy);
                energies.set(reactantsLabel, energy);
                if (!orders.has(reactantsLabel)) {
                    orders.set(reactantsLabel, i);
                    i++;
                }
            }
            let productsLabel = reaction.getProductsLabel();
            if (productsLabel != undefined) {
                products.add(productsLabel);
                let energy = reaction.getProductsEnergy(app_1.getMolecule, molecules);
                console.log("energy=" + energy.toString());
                units = reaction.getEnergyUnits(app_1.getMolecule, molecules, reaction.getProducts());
                console.log("units=" + units);
                energyMin = (0, util_1.min)(energyMin, energy);
                energyMax = (0, util_1.max)(energyMax, energy);
                energies.set(productsLabel, energy);
                if (orders.has(productsLabel)) {
                    i--;
                    let j = (0, util_1.get)(orders, productsLabel);
                    // Move product to end and shift everything back.
                    orders.forEach(function (value, key) {
                        if (value > j) {
                            orders.set(key, value - 1);
                        }
                    });
                    // Insert transition states.
                    if (rtss != undefined) {
                        rtss.forEach(function (ts, ref) {
                            let moleculeRef = ts.getMolecule().getRef();
                            tss.add(moleculeRef);
                            orders.set(moleculeRef, i);
                            energy = (0, app_1.getMolecule)(moleculeRef, molecules).getEnergy() ?? app_1.big0;
                            console.log("energy=" + energy.toString());
                            units = reaction.getEnergyUnits(app_1.getMolecule, molecules, reaction.getTransitionStates());
                            console.log("units=" + units);
                            energyMin = (0, util_1.min)(energyMin, energy);
                            energyMax = (0, util_1.max)(energyMax, energy);
                            energies.set(moleculeRef, energy);
                            i++;
                        });
                        orders.set(productsLabel, i);
                        i++;
                    }
                }
                else {
                    if (rtss != undefined) {
                        rtss.forEach(function (ts, ref) {
                            let moleculeRef = ts.getMolecule().getRef();
                            tss.add(moleculeRef);
                            orders.set(moleculeRef, i);
                            energy = (0, app_1.getMolecule)(moleculeRef, molecules).getEnergy() ?? app_1.big0;
                            console.log("energy=" + energy.toString());
                            energyMin = (0, util_1.min)(energyMin, energy);
                            energyMax = (0, util_1.max)(energyMax, energy);
                            energies.set(moleculeRef, energy);
                            i++;
                        });
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
        let energyRange = (energyMax.minus(energyMin)).toNumber();
        //console.log("energyRange=" + energyRange);
        //console.log("reactants=" + reactants);
        //console.log("products=" + products);
        //console.log("transitionStates=" + transitionStates);
        // Create a lookup from order to label.
        let reorders = [];
        orders.forEach(function (value, key) {
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
        let tssInXY = new Map();
        let tssOutXY = new Map();
        reorders.forEach(function (value) {
            //console.log("value=" + value + ".");
            //console.log("energies=" + mapToString(energies));
            let energy = (0, util_1.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, util_1.rescale)(energyMin.toNumber(), energyRange, 0, rdcHeight, energy);
            // Get text width.
            tw = Math.max((0, canvas_1.getTextWidth)(ctx, energy.toString(), font), (0, canvas_1.getTextWidth)(ctx, value, font));
            x1 = x0 + tw + textSpacing;
            y0 = energyRescaled + lw;
            y1 = y0;
            // Draw horizontal line and add label.
            // (The drawing is now not done here but done later so labels are on top of lines, but
            // the code is left here commented out for code comprehension.)
            //drawLevel(ctx, green, 4, x0, y0, x1, y1, th, value);
            reactantsInXY.set(value, [x0, y0]);
            reactantsOutXY.set(value, [x1, y1]);
            if (products.has(value)) {
                productsInXY.set(value, [x0, y0]);
                productsOutXY.set(value, [x1, y1]);
            }
            if (tss.has(value)) {
                tssInXY.set(value, [x0, y0]);
                tssOutXY.set(value, [x1, y1]);
            }
            x0 = x1 + stepSpacing;
            xmax = x1;
        });
        // Set canvas width to maximum x.
        canvas.width = xmax;
        //console.log("canvas.width=" + canvas.width);
        // Set canvas height to maximum energy plus the label.
        let canvasHeightWithBorder = rdcHeight + (4 * th) + (2 * lw);
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdcHeight;
        // Update the canvas height.
        canvas.height = canvasHeightWithBorder;
        // Set the transformation matrix.
        //ctx.transform(1, 0, 0, 1, 0, canvasHeightWithBorder);
        ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder);
        // Go through reactions and draw connecting lines.
        reactions.forEach(function (reaction, id) {
            //console.log("id=" + id);
            //console.log("reaction=" + reaction);
            // Get TransitionState if there is one.
            //let tss: TransitionState[] = reaction.getTransitionStates();
            let rtss = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            let productsLabel = reaction.getProductsLabel();
            let reactantOutXY = (0, util_1.get)(reactantsOutXY, reactantsLabel);
            let productInXY = (0, util_1.get)(productsInXY, productsLabel);
            if (rtss.size > 0) {
                //tss.forEach(function (ts, ref) {
                rtss.forEach(function (ts, ref) {
                    let tsInXY = (0, util_1.get)(tssInXY, ref);
                    (0, canvas_1.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], tsInXY[0], tsInXY[1]);
                    let tsOutXY = (0, util_1.get)(tssOutXY, ref);
                    (0, canvas_1.drawLine)(ctx, foreground, lwc, tsOutXY[0], tsOutXY[1], productInXY[0], productInXY[1]);
                });
            }
            else {
                (0, canvas_1.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
            }
        });
        // Plot units on the Y-axis.
        ctx.save();
        ctx.translate(20, originalCanvasHeight / 2); // Move to the center of the Y-axis
        ctx.rotate(-Math.PI / 2); // Rotate the context by -90 degrees
        //ctx.scale(1, -1); // Flip the context vertically
        ctx.scale(-1, 1); // Flip the context vertically
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "16px Arial"; // Set the font size and family
        ctx.fillText("Energy " + units, 0, 0); // Draw the label
        ctx.restore(); // Restore the context to its original state
        // Draw horizontal lines and labels.
        // (This is done last so that the labels are on top of the vertical lines.)
        reactants.forEach(function (value) {
            let energy = (0, util_1.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, util_1.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            console.log("energyRescaled=" + energyRescaled.toString());
            let x0 = (0, util_1.get)(reactantsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_1.get)(reactantsOutXY, value)[0];
            let energyString = energy.toString();
            (0, canvas_1.drawLevel)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function (value) {
            let energy = (0, util_1.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, util_1.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            console.log("energyRescaled=" + energyRescaled.toString());
            let x0 = (0, util_1.get)(productsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_1.get)(productsOutXY, value)[0];
            let energyString = energy.toString();
            if (intProducts.has(value)) {
                (0, canvas_1.drawLevel)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
            }
            else {
                (0, canvas_1.drawLevel)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
            }
        });
        tss.forEach(function (value) {
            let energy = (0, util_1.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, util_1.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            console.log("energyRescaled=" + energyRescaled.toString());
            let x0 = (0, util_1.get)(tssInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, util_1.get)(tssOutXY, value)[0];
            let energyString = energy.toString();
            (0, canvas_1.drawLevel)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
        });
    }
}
//# sourceMappingURL=gui_reactionDiagram.js.map