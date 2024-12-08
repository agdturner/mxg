"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawLevel = drawLevel;
exports.drawLine = drawLine;
exports.writeText = writeText;
exports.getTextHeight = getTextHeight;
exports.getTextWidth = getTextWidth;
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
 */
function drawLevel(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + ((x1 - x0) / 2);
    writeText(ctx, energyString, font, strokeStyle, getTextStartX(ctx, energyString, font, x_centre), y1 + th);
    writeText(ctx, label, font, strokeStyle, getTextStartX(ctx, label, font, x_centre), y1 + 3 * th);
    drawLine(ctx, strokeStyle, strokewidth, x0, y0, x1, y1);
}
/**
 * @param ctx The context to use.
 * @param text The text to get the start x-coordinate of.
 * @paramfont The font to use.
 * @param x_centre The x-coordinate of the centre of the text.
 * @returns The x-coordinate of the start of the text.
 */
function getTextStartX(ctx, text, font, x_centre) {
    let tw = getTextWidth(ctx, text, font);
    return x_centre - (tw / 2);
}
/**
 * Draw a line (segment) on the canvas.
 * @param ctx The context to use.
 * @param strokeStyle The name of a style to use for the line.
 * @param x1 The start x-coordinate of the line.
 * @param y1 The start y-coordinate of the line.
 * @param x2 The end x-coordinate of the line.
 * @param y2 The end y-coordinate of the line.
 */
function drawLine(ctx, strokeStyle, strokewidth, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokewidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
/**
 * Writes text to the canvas. (It is probably better to write all the labels in one go.)
 * @param ctx The context to use.
 * @param text The text to write.
 * @param font The font to use.
 * @param colour The colour of the text.
 * @param x The horizontal position of the text.
 * @param y The vertical position of the text.
 */
function writeText(ctx, text, font, colour, x, y) {
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
/**
 * @param ctx The context to use.
 * @param text The text to get the height of.
 * @param font The font to use.
 * @returns The height of the text in pixels.
 */
function getTextHeight(ctx, text, font) {
    ctx.font = font;
    var fontMetric = ctx.measureText(text);
    return fontMetric.actualBoundingBoxAscent + fontMetric.actualBoundingBoxDescent;
}
/**
 * @param ctx The context to use.
 * @param text The text to get the width of.
 * @param font The font to use.
 * @returns The width of the text in pixels.
 */
function getTextWidth(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
}
//# sourceMappingURL=canvas.js.map