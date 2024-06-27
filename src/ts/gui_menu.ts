import { createButton, sy_downTriangle, sy_upTriangle } from "./html.js";
import { addID, addMolecule, boundary1, defaults, libmols, load, menuDivID, saveXML } from "./app.js";
import { LibraryMolecules } from './librarymols.js';
import { Molecule } from "./xml_molecule.js";
import { Defaults } from './defaults.js';


let mk_url: string = "https://github.com/MESMER-kinetics";
/**
 * MXG.
 */
let mxg_url: string = mk_url + "/mxg";
let mxg_a = document.createElement('a');
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;

/**
 * Example data.
 */
let mxgDataExamples_url: string = mxg_url + "/tree/main/data/examples";
let mxgDataExamples_a = document.createElement('a');
mxgDataExamples_a.href = mxgDataExamples_url;
mxgDataExamples_a.textContent = mxgDataExamples_url;

/**
 * MESMER.
 */
let mesmer_url: string = mk_url + "/MESMER-code";
let mesmer_a = document.createElement('a');
mesmer_a.href = mesmer_url;
mesmer_a.textContent = mesmer_url;

/**
 * EPSRC.
 */
let epsrc_url: string = "https://epsrc.ukri.org/";
let epsrc_a = document.createElement('a');
epsrc_a.href = epsrc_url;
epsrc_a.textContent = "The UK Engineering and Physical Sciences Research Council (EPSRC)";

/**
 * University of Leeds
 */
let uol_url: string = "https://www.leeds.ac.uk/";
let uol_a = document.createElement('a');
uol_a.href = uol_url;
uol_a.textContent = "The University of Leeds";

/**
 * 3DMol.
 */
let t3Dmol_url: string = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement('a');
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;
let t3Dmol_citation_url: string = "http://doi.org/10.1093/bioinformatics/btu829";
let t3Dmol_citation_a = document.createElement('a');
t3Dmol_citation_a.href = t3Dmol_citation_url;
t3Dmol_citation_a.textContent = "doi:10.1093/bioinformatics/btu829";

/**
 * Big.js.
 */
let bigjs_url: string = "https://mikemcl.github.io/big.js/";
let bigjs_a = document.createElement('a');
bigjs_a.href = bigjs_url;
bigjs_a.textContent = bigjs_url;

/**
 * Get a div with details about MXG.
 */
function about(w: Window | null) {
    if (w == null) {
        return;
    }
    w.document.title = "About MXG";
    // Welcome Text.
    let wDiv: HTMLDivElement = document.createElement('div');
    w.document.body.appendChild(wDiv);
    // p1.
    let p1 = w.document.createElement('p');
    wDiv.appendChild(p1);
    p1.appendChild(w.document.createTextNode('MXG is a free and open source program to assist in creating, editing and \
        visualising MESMER XML data. The MXG development repository is: '));
    p1.appendChild(mxg_a);
    p1.appendChild(w.document.createTextNode('. Details of MESMER - the Master Equation Solver for Multi Energy-well Reactions \
        can be found at: '));
    p1.appendChild(mesmer_a);
    p1.appendChild(w.document.createTextNode('.'));
    // p2.
    let p2 = document.createElement('p');
    wDiv.appendChild(p2);
    p2.appendChild(w.document.createTextNode('MXG is being developed by a team based at '));
    p2.appendChild(uol_a);
    p2.appendChild(w.document.createTextNode(' funded by '));
    p2.appendChild(epsrc_a);
    p2.appendChild(w.document.createTextNode('Like MESMER, MXG development aims to be driven in part by users reporting issues, \
        submitting feature requests, and getting involved in development.'));
    // p3.
    let p3 = w.document.createElement('p');
    wDiv.appendChild(p3);
    p3.appendChild(w.document.createTextNode('MXG runs on the latest Firefox, Chrome, Edge or Safari Web browsers. It can \
        be used offline if installed as a Progressive Web App (PWA). PWA installation varies by Web browser and device, it \
        should only require user permission and is effectively a form of Web browser bookmark. For guidance please see the \
        MXG main development repository README: '));
    p3.appendChild(mxg_a.cloneNode(true));
    p3.appendChild(w.document.createTextNode('. MXG may work on small screen devices, but it is recommended to use a device \
        with at least a standard laptop sized screen.'));
    // p4.
    let p4 = document.createElement('p');
    wDiv.appendChild(p4);
    p4.appendChild(w.document.createTextNode('The Menu contains 5 buttons. The Load MESMER File button is for loading a \
        MESMER XML data file with a "me:mesmer" tag containing: "me:title", "moleculeList", "reactionList", \
        "me:conditions", "me:modelParameters", and "me:control" tags containing further details. A MESMER XML output \
        data file will also have "me:metadataList" and "me:analysis" tags as children of the "me:mesmer" tag. Additional \
        output is located in "moleculeList" and "reactionList" tags. The Load Molecules button is for loading molecule \
        data for selection, modification and for inclusion in saved MESMER files. The Load Defaults button is to load \
        default values. Whilst not necessary, loading defaults is for convenience, as often similar values and the same \
        units as defaults are wanted for specified variables. The Save MESMER File button is for saving a new MESMER XML \
        data file. The file should be saved to the Web browser downloads location. It should contain no comments or extra \
        white space between XML tags with the exception of new lines, tag values should be trimmed of white space, \
        numbers should be output in a particular format (decimals - where numbers with more than 8 digits are output in \
        scientific notation format). There should be: a single "atomArray" tag containing all "atom" tags (each atom \
        should have a unique id attribute); a single "bondArray" tag containing any "bond" tags (each bond should have a \
        unique id attribute); and, a single "propertyList" tag containing all "property" tags for each "molecule" tag in \
        the "moleculeList". The saved file should reflect what is specified via the interface.'));
    /* Between the Load and Save \
    buttons are buttons to increase or decrease the fontsize and to change between a light and dark theme. In \
    addition to increasing or decreasing the fontsize of text elements, the fontsize buttons can be actioned to \
    redraw the reaction diagram and any species plots with a larger or smaller fontsize respectively.'));*/
    // p5.
    let p5 = w.document.createElement('p');
    wDiv.appendChild(p5);
    p5.appendChild(w.document.createTextNode('The "me:title" value is presented in an input alongside an associated label. \
        The input can be used to change the value which is also used to compose filenames for files saved from MXG. \
        Details are presented via buttons which contain a triangular symbol. A triangle orientated with a point down: '
        + sy_downTriangle + ' can be actioned to show more details (if there are any). A triangle orientated with a point \
        up: ' + sy_upTriangle + ' can be actioned to hide those details again.'));
    // p6.
    let p6 = w.document.createElement('p');
    wDiv.appendChild(p6);
    p6.textContent = 'The Reaction Diagram button shows/hides a reaction well diagram which is redrawn if molecule "me:ZPE" \
        property values are changed. The diagram can be opened in a new Window and saved to a PNG format file.';
    // p7.
    let p7 = w.document.createElement('p');
    wDiv.appendChild(p7);
    p7.textContent = 'MXG uses 3DMol.js under a BSD-3-Clause licence to visualise molecules with coordinates. For details \
        of 3DMol.js please see the GitHub repository: ';
    p7.appendChild(t3Dmol_a);
    p7.appendChild(w.document.createTextNode('. If you use the 3DMol.js visualisations, please cite: Nicholas Rego and \
        David Koes 3Dmol.js: molecular visualization with WebGL Bioinformatics (2015) 31 (8): 1322-1324 '));
    p7.appendChild(t3Dmol_citation_a);
    p7.appendChild(w.document.createTextNode('.'));
    // p8.
    let p8 = w.document.createElement('p');
    wDiv.appendChild(p8);
    p8.textContent = 'MXG uses Big.js under an MIT licence to handle numbers. For details of Big.js please see the GitHub \
        repository: ';
    p8.appendChild(bigjs_a);
    p8.appendChild(w.document.createTextNode('.'));
}

export function createMenu(): HTMLDivElement {
    // Create Menu.
    let menuDiv: HTMLDivElement = document.getElementById(menuDivID) as HTMLDivElement;
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';

    // Add About MXG button.
    let s_About: string = 'About';
    let ab: HTMLButtonElement = createButton(s_About, addID(s_About), boundary1);
    menuDiv.appendChild(ab);
    ab.addEventListener('click', async (event: MouseEvent) => {
        let aw = window.open("", "", "width=600,height=400");
        about(aw);
    });

    // Add Load Molecules button.
    let s_Load_Molecules: string = 'Load Molecules';
    let lmb: HTMLButtonElement = createButton(s_Load_Molecules, addID(s_Load_Molecules), boundary1);
    menuDiv.appendChild(lmb);
    let lm: LibraryMolecules = new LibraryMolecules();
    lmb.addEventListener('click', async (event: MouseEvent) => {
        let ms: Map<number, Molecule> = await lm.readFile();
        // Add the molecules to the libmols map.
        ms.forEach((v, k) => {
            addMolecule(v, libmols);
        });
    });

    // Add Load Defaults button.
    let s_Load_Defaults: string = 'Load Defaults';
    let ldb: HTMLButtonElement = createButton(s_Load_Defaults, addID(s_Load_Defaults), boundary1);
    ldb.addEventListener('click', (event: MouseEvent) => {
        defaults.readFile();
    });
    menuDiv.appendChild(ldb);

    // Add Load MESMER File button.
    let s_Load: string = 'Load MESMER File';
    let lb = createButton(s_Load, addID(s_Load), boundary1);
    lb.addEventListener('click', (event: MouseEvent) => {
        load();
    });
    menuDiv.appendChild(lb);

    /* Add style/theme option buttons.
    // Add Increase Fontsize button.
    let s_Increase_Fontsize: string = 'Increase Fontsize';
    let increaseFontSizeButton = createButton(s_Increase_Fontsize, addID(s_Increase_Fontsize), boundary1);
    increaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
        }
        redrawReactionsDiagram();
        redrawScatterPlots();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Add Decrease Fontsize button.
    let s_Decrease_Fontsize: string = 'Decrease Fontsize';
    let decreaseFontSizeButton = createButton(s_Decrease_Fontsize, addID(s_Decrease_Fontsize), boundary1);
    decreaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize - 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
        }
        redrawReactionsDiagram();
        redrawScatterPlots();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Add Light/Dark Mode button.
    let s_Light_Dark_Mode = 'Light/Dark Mode';
    let lightDarkModeButton = createButton(s_Light_Dark_Mode, addID(s_Light_Dark_Mode), boundary1);
    lightDarkModeButton.addEventListener('click', () => {
        dark = !dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if (dark) {
            document.body.className = 'dark-mode';
        } else {
            document.body.className = 'light-mode';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    */

    // Add Save To MESMER File button.
    let s_Save_MESMER_File: string = 'Save MESMER File';
    let saveButton = createButton(s_Save_MESMER_File, addID(s_Save_MESMER_File), boundary1);
    saveButton.addEventListener('click', saveXML);
    menuDiv.appendChild(saveButton);
    return menuDiv;
}