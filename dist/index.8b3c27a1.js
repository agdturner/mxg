// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kWWpk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d00c71a58b3c27a1";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"dPB9w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Set the energy of a molecule when the energy input value is changed.
 * @param input The input element. 
 */ parcelHelpers.export(exports, "setEnergy", ()=>setEnergy);
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
var _moleculeJs = require("./molecule.js");
var _reactionJs = require("./reaction.js");
var _functionsJs = require("./functions.js");
var _htmlJs = require("./html.js");
var _canvasJs = require("./canvas.js");
var _classesJs = require("./classes.js");
var _conditionsJs = require("./conditions.js");
var _modelParametersJs = require("./modelParameters.js");
var _controlJs = require("./control.js");
// Code for service worker for Progressive Web App (PWA).
if ("serviceWorker" in navigator) window.addEventListener("load", function() {
    //const swUrl = new URL('../../../sw.js', import.meta.url);
    const swUrl = new URL("../../../sw.js", document.baseURI);
    navigator.serviceWorker.register(swUrl);
});
// Expected XML tags strings.
let me_title_s = "me:title";
/**
 * For storing me.title.
 */ let title;
/**
 * For storing the XML root start tag.
 */ let mesmerStartTag;
/**
 * For storing the XML root end tag.
 */ let mesmerEndTag;
/**
 * A map of molecules with Molecule.id as key and Molecules as values.
 */ let molecules = new Map([]);
/**
 * For storing the maximum molecule energy in a reaction.
 */ let maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */ let minMoleculeEnergy = Infinity;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let reactions = new Map([]);
/**
 * The header of the XML file.
 */ const header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
/**
 * The filename of the mesmer input file loaded.
 */ let input_xml_filename;
/**
 * The load button.
 */ let loadButton;
/**
 * The save button.
 */ let saveButton;
/**
 * The XML text element.
 */ let me_title;
let molecules_title;
let molecules_table;
let reactions_title;
let reactions_table;
let reactions_diagram_title;
let conditions_title;
let conditions_table;
let modelParameters_title;
let modelParameters_table;
let xml_title;
let xml_text;
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function displayXML(xml) {
    //console.log("xml=" + xml);
    if (xml_title != null) xml_title.innerHTML = input_xml_filename;
    if (xml_text != null) xml_text.innerHTML = (0, _xmlJs.toHTML)(xml);
}
/**
 * Parses xml to initilise molecules.
 * @param {XMLDocument} xml The XML document.
 */ function initMolecules(xml) {
    let moleculeList_s = "moleculeList";
    console.log(moleculeList_s);
    let xml_moleculeList = (0, _xmlJs.getSingularElement)(xml, moleculeList_s);
    // Set molecules_title.
    molecules_title = document.getElementById("molecules_title");
    if (molecules_title != null) molecules_title.innerHTML = "Molecules";
    // xml_moleculeList should have one or more molecule elements and no other elements.
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
    if (!moleculeListTagNames.has("molecule")) throw new Error("Expecting molecule tagName but it is not present!");
    let xml_molecules = xml_moleculeList.getElementsByTagName("molecule");
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    // Process each molecule.
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf like this.
    for(let i = 0; i < xml_molecules.length; i++){
        // Set attributes.
        let attributes = (0, _xmlJs.getAttributes)(xml_molecules[i]);
        let moleculeTagNames = new Set();
        let cns = xml_molecules[i].childNodes;
        cns.forEach(function(node) {
            moleculeTagNames.add(node.nodeName);
        });
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));
        // Set atoms.
        const atoms = new Map();
        // Sometimes there is an individual atom not in an atomArray.
        //let xml_atomArray = xml_molecules[i].getElementsByTagName("atomArray")[0];
        //if (xml_atomArray != null) {
        moleculeTagNames.delete("atom");
        moleculeTagNames.delete("atomArray");
        let xml_atoms = xml_molecules[i].getElementsByTagName("atom");
        for(let j = 0; j < xml_atoms.length; j++){
            let attribs = (0, _xmlJs.getAttributes)(xml_atoms[j]);
            let id = attribs.get("id");
            if (id != undefined) {
                let atom = new (0, _moleculeJs.Atom)(attribs);
                //console.log(atom.toString());
                atoms.set(id, atom);
            }
        }
        //}
        // Read bondArray.
        moleculeTagNames.delete("bond");
        moleculeTagNames.delete("bondArray");
        const bonds = new Map();
        let xml_bonds = xml_molecules[i].getElementsByTagName("bond");
        for(let j = 0; j < xml_bonds.length; j++){
            let attribs = (0, _xmlJs.getAttributes)(xml_bonds[j]);
            let id = attribs.get("atomRefs2");
            if (id != undefined) {
                let bond = new (0, _moleculeJs.Bond)(attribs);
                //console.log(bond.toString());
                bonds.set(id, bond);
            }
        }
        // Read propertyList.
        const properties = new Map();
        // Sometimes there is a single property not in propertyList!
        //let xml_propertyList = xml_molecules[i].getElementsByTagName("propertyList")[0];
        //if (xml_propertyList != null) {
        //    let xml_properties = xml_propertyList.getElementsByTagName("property");
        moleculeTagNames.delete("property");
        moleculeTagNames.delete("propertyList");
        let xml_properties = xml_molecules[i].getElementsByTagName("property");
        for(let j = 0; j < xml_properties.length; j++){
            let attribs = (0, _xmlJs.getAttributes)(xml_properties[j]);
            let children = xml_properties[j].children;
            if (children.length != 1) throw new Error("Expecting 1 child but finding " + children.length);
            let nodeAttributes = (0, _xmlJs.getAttributes)(children[0]);
            let nodeName = children[0].nodeName; // Expecting scalar or array
            let textContent = children[0].textContent;
            if (textContent == null) {
                console.error("nodeName");
                throw new Error("textContent is null");
            }
            textContent = textContent.trim();
            let dictRef = attribs.get("dictRef");
            //console.log("dictRef=" + dictRef);
            if (dictRef == null) throw new Error("dictRef is null");
            //console.log("fcnn=" + fcnn);
            if (nodeName == "scalar") {
                moleculeTagNames.delete("scalar");
                let value = parseFloat(textContent);
                properties.set(dictRef, new (0, _moleculeJs.Property)(attribs, new (0, _classesJs.NumberWithAttributes)(nodeAttributes, value)));
                if (dictRef === "me:ZPE") {
                    minMoleculeEnergy = Math.min(minMoleculeEnergy, value);
                    maxMoleculeEnergy = Math.max(maxMoleculeEnergy, value);
                }
            } else if (nodeName == "array") {
                moleculeTagNames.delete("array");
                properties.set(dictRef, new (0, _moleculeJs.Property)(attribs, new (0, _classesJs.NumberArrayWithAttributes)(nodeAttributes, (0, _functionsJs.toNumberArray)(textContent.split(/\s+/)), " ")));
            } else if (nodeName == "matrix") ;
            else throw new Error("Unexpected nodeName: " + nodeName);
        }
        let els;
        // Read energyTransferModel
        moleculeTagNames.delete("me:energyTransferModel");
        let energyTransferModel = undefined;
        els = xml_molecules[i].getElementsByTagName("me:energyTransferModel");
        if (els != null) {
            if (els.length > 0) {
                if (els.length != 1) throw new Error("energyTransferModel length=" + els.length);
                let xml_deltaEDown = els[0].getElementsByTagName("me:deltaEDown");
                if (xml_deltaEDown != null) {
                    if (xml_deltaEDown.length != 1) throw new Error("deltaEDown length=" + xml_deltaEDown.length);
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_deltaEDown[0])));
                    let deltaEDown = new (0, _moleculeJs.DeltaEDown)((0, _xmlJs.getAttributes)(xml_deltaEDown[0]), value);
                    energyTransferModel = new (0, _moleculeJs.EnergyTransferModel)((0, _xmlJs.getAttributes)(els[0]), deltaEDown);
                }
            }
        }
        // Read DOSCMethod
        moleculeTagNames.delete("me:DOSCMethod");
        let dOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName("me:DOSCMethod");
        if (els != null) {
            let el = els[0];
            if (el != null) {
                if (el != null) {
                    let type = el.getAttribute("xsi:type");
                    if (type != null) dOSCMethod = new (0, _moleculeJs.DOSCMethod)(type);
                }
            }
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.error("Remaining moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.error(x));
            throw new Error("Unexpected tags in molecule.");
        }
        let molecule = new (0, _moleculeJs.Molecule)(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod);
        //console.log(molecule.toString());
        molecules.set(molecule.id, molecule);
    }
    // Add event listeners to molecules table.
    molecules.forEach(function(molecule, id) {
        let energyKey = id + "_energy";
        let inputElement = document.getElementById(energyKey);
        if (inputElement) inputElement.addEventListener("change", (event)=>{
            // The input is set up to call the function setEnergy(HTMLInputElement),
            // so the following commented code is not used. As the input was setup 
            // as a number type. The any non numbers were It seems that there are two 
            // ways to get and store the value of the input element.
            // Both ways have been kept for now as I don't know which way is better!
            let eventTarget = event.target;
            let inputValue = eventTarget.value;
            if ((0, _functionsJs.isNumeric)(inputValue)) {
                molecule.setEnergy(parseFloat(inputValue));
                console.log("Set energy of " + id + " to " + inputValue + " kJ/mol");
            } else {
                alert("Energy input for " + id + " is not a number");
                let inputElement = document.getElementById(energyKey);
                inputElement.value = molecule.getEnergy().toString();
                console.log("inputValue=" + inputValue);
                console.log("Type of inputValue: " + typeof inputValue);
            }
        });
    });
}
let inputElement;
//function reload() {
function loadXML() {
    inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.onchange = function() {
        if (inputElement.files) {
            for(let i = 0; i < inputElement.files.length; i++)console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            let file = inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            input_xml_filename = file.name;
            if (xml_text != null) {
                let reader = new FileReader();
                let chunkSize = 1048576; // 1MB
                let start = 0;
                let contents = "";
                reader.onload = function(e) {
                    if (!e.target) throw new Error("Event target is null");
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
                            displayXML(contents);
                            let parser = new DOMParser();
                            let xml = parser.parseFromString(contents, "text/xml");
                            parse(xml);
                            // Send XML to the server
                            fetch("http://localhost:1234/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "text/xml"
                                },
                                body: contents
                            }).then((response)=>{
                                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                                return response.text();
                            }).then((data)=>{
                                console.log("Server response:", data);
                            }).catch((error)=>{
                                console.error("There was a problem with the fetch operation:", error);
                            });
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
    loadButton = document.getElementById("load_button");
    if (loadButton != null) //loadButton.addEventListener('click', reload);
    loadButton.addEventListener("click", loadXML);
    // Ensure save button is displayed.
    saveButton = document.getElementById("saveButton");
    if (saveButton != null) saveButton.style.display = "inline";
}
/**
 * Once the DOM is loaded, set up the elements.
 */ document.addEventListener("DOMContentLoaded", (event)=>{
    // Initialise elements
    xml_title = document.getElementById("xml_title");
    xml_text = document.getElementById("xml_text");
    window.loadXML = function() {
        loadXML();
    //reload();
    };
});
/**
 * Set the title.
 * @param {XMLDocument} xml The XML document.
 */ function setTitle(xml) {
    me_title = xml.getElementsByTagName(me_title_s);
    if (me_title == null) throw new Error(me_title_s + " not found");
    else {
        if (me_title.length != 1) throw new Error("Multiple " + me_title_s + " elements found");
        else {
            title = me_title[0].childNodes[0].nodeValue;
            title = title.trim();
            console.log("Title=" + title);
            let e = document.getElementById("title");
            if (e != null) e.innerHTML = title;
        }
    }
}
/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */ function parse(xml) {
    /**
     * Set mesmer_xml start tag.
     */ mesmerStartTag = "\n";
    let documentElement = xml.documentElement;
    if (documentElement == null) throw new Error("Document element not found");
    else {
        let tagName = documentElement.tagName;
        mesmerStartTag += "<" + tagName;
        console.log(tagName);
        mesmerEndTag = (0, _xmlJs.getEndTag)(tagName, "", true);
        let first = true;
        let pad = " ".repeat(tagName.length + 2);
        let names = documentElement.getAttributeNames();
        names.forEach(function(name) {
            let attribute = documentElement.getAttribute(name);
            let na = `${name}="${attribute}"`;
            if (first) {
                first = false;
                mesmerStartTag += " " + na;
            } else mesmerStartTag += "\n" + pad + na;
        });
        mesmerStartTag += ">";
    //console.log(mesmerStartTag);
    }
    /**
     *  Set title.
     */ setTitle(xml);
    /**
     * Generate molecules table.
     */ initMolecules(xml);
    displayMoleculesTable();
    /**
     * Generate reactions table.
     */ initReactions(xml);
    displayReactionsTable();
    displayReactionsDiagram();
    /**
     * Generate conditions table.
     */ initConditions(xml);
    displayConditions();
    /**
     * Generate parameters table.
     */ initModelParameters(xml);
    displayModelParameters();
    /**
     * Generate control table.
     */ initControl(xml);
    displayControl();
}
let conditions;
/**
 * Parse xml to initialise conditions.
 * @param {XMLDocument} xml The XML document.
 */ function initConditions(xml) {
    let me_conditions_s = "me:conditions";
    console.log(me_conditions_s);
    let xml_conditions = (0, _xmlJs.getSingularElement)(xml, me_conditions_s);
    // Set conditions_title.
    conditions_title = document.getElementById("conditions_title");
    if (conditions_title != null) conditions_title.innerHTML = "Conditions";
    // BathGas
    let xml_bathGas = (0, _xmlJs.getSingularElement)(xml_conditions, "me:bathGas");
    let attributes = (0, _xmlJs.getAttributes)(xml_bathGas);
    let bathGas = new (0, _conditionsJs.BathGas)(attributes, (0, _utilJs.get)(molecules, xml_bathGas.childNodes[0].nodeValue));
    // PTs
    let xml_PTs = (0, _xmlJs.getSingularElement)(xml_conditions, "me:PTs");
    let xml_PTPairs = xml_PTs.getElementsByTagName("me:PTpair");
    // Process each PTpair.
    let PTs = [];
    for(let i = 0; i < xml_PTPairs.length; i++)PTs.push(new (0, _conditionsJs.PTpair)((0, _xmlJs.getAttributes)(xml_PTPairs[i])));
    conditions = new (0, _conditionsJs.Conditions)(bathGas, PTs);
}
let modelParameters;
/**
 * Parses xml to initialise modelParameters.
 * @param {XMLDocument} xml The XML document.
 */ function initModelParameters(xml) {
    let me_modelParameters_s = "me:modelParameters";
    console.log(me_modelParameters_s);
    let xml_modelParameters = (0, _xmlJs.getSingularElement)(xml, me_modelParameters_s);
    // Set modelParameters_title.
    modelParameters_title = document.getElementById("modelParameters_title");
    if (modelParameters_title != null) modelParameters_title.innerHTML = "Model Parameters";
    // GrainSize
    let xml_grainSize = (0, _xmlJs.getSingularElement)(xml_modelParameters, "me:grainSize");
    let attributes = (0, _xmlJs.getAttributes)(xml_grainSize);
    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_grainSize)));
    let grainSize = new (0, _modelParametersJs.GrainSize)(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill = (0, _xmlJs.getSingularElement)(xml_modelParameters, "me:energyAboveTheTopHill");
    let energyAboveTheTopHill = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_energyAboveTheTopHill)));
    modelParameters = new (0, _modelParametersJs.ModelParameters)(grainSize, energyAboveTheTopHill);
}
let control;
/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */ function initControl(xml) {
    let me_control_s = "me:control";
    console.log(me_control_s);
    let xml_control = (0, _xmlJs.getSingularElement)(xml, me_control_s);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) control_title.innerHTML = "Control";
    // me:testDOS
    let xml_testDOS = xml_control.getElementsByTagName("me:testDOS");
    let testDOS;
    if (xml_testDOS.length > 0) testDOS = true;
    // me:printSpeciesProfile
    let xml_printSpeciesProfile = xml_control.getElementsByTagName("me:printSpeciesProfile");
    let printSpeciesProfile;
    if (xml_printSpeciesProfile.length > 0) printSpeciesProfile = true;
    // me:testMicroRates
    let xml_testMicroRates = xml_control.getElementsByTagName("me:testMicroRates");
    let testMicroRates;
    if (xml_testMicroRates.length > 0) testMicroRates = true;
    // me:testRateConstant
    let xml_testRateConstant = xml_control.getElementsByTagName("me:testRateConstant");
    let testRateConstant;
    if (xml_testRateConstant.length > 0) testRateConstant = true;
    // me:printGrainDOS
    let xml_printGrainDOS = xml_control.getElementsByTagName("me:printGrainDOS");
    let printGrainDOS;
    if (xml_printGrainDOS.length > 0) printGrainDOS = true;
    // me:printCellDOS
    let xml_printCellDOS = xml_control.getElementsByTagName("me:printCellDOS");
    let printCellDOS;
    if (xml_printCellDOS.length > 0) printCellDOS = true;
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName("me:printReactionOperatorColumnSums");
    let printReactionOperatorColumnSums;
    if (xml_printReactionOperatorColumnSums.length > 0) printReactionOperatorColumnSums = true;
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName("me:printTunnellingCoefficients");
    let printTunnellingCoefficients;
    if (xml_printTunnellingCoefficients.length > 0) printTunnellingCoefficients = true;
    // me:printGrainkfE
    let xml_printGrainkfE = xml_control.getElementsByTagName("me:printGrainkfE");
    let printGrainkfE;
    if (xml_printGrainkfE.length > 0) printGrainkfE = true;
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName("me:printGrainBoltzmann");
    let printGrainBoltzmann;
    if (xml_printGrainBoltzmann.length > 0) printGrainBoltzmann = true;
    // me:printGrainkbE
    let xml_printGrainkbE = xml_control.getElementsByTagName("me:printGrainkbE");
    let printGrainkbE;
    if (xml_printGrainkbE.length > 0) printGrainkbE = true;
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName("me:eigenvalues");
    let eigenvalues;
    if (xml_eigenvalues.length > 0) eigenvalues = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_eigenvalues[0])));
    // me:hideInactive
    let xml_hideInactive = xml_control.getElementsByTagName("me:hideInactive");
    let hideInactive;
    if (xml_hideInactive.length > 0) hideInactive = true;
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName("me:diagramEnergyOffset");
    let diagramEnergyOffset;
    if (xml_diagramEnergyOffset.length > 0) {
        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new (0, _controlJs.DiagramEnergyOffset)((0, _xmlJs.getAttributes)(xml_diagramEnergyOffset[0]), value);
    }
    control = new (0, _controlJs.Control)(testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
}
/**
 * Parses xml to initialise reactions.
 * @param {XMLDocument} xml The XML document.
 */ function initReactions(xml) {
    let reactionList_s = "reactionList";
    console.log(reactionList_s);
    let xml_reactionList = (0, _xmlJs.getSingularElement)(xml, reactionList_s);
    let xml_reactions = xml_reactionList.getElementsByTagName("reaction");
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    // Process each reaction.
    if (xml_reactions_length == 0) //return;
    throw new Error("No reactions: There should be at least 1!");
    // Set reactions_title.
    reactions_title = document.getElementById("reactions_title");
    if (reactions_title != null) reactions_title.innerHTML = "Reactions";
    for(let i = 0; i < xml_reactions_length; i++){
        let attributes = (0, _xmlJs.getAttributes)(xml_reactions[i]);
        let reactionID = attributes.get("id");
        if (reactionID == null) throw new Error("reactionID is null");
        if (reactionID != null) {
            console.log("id=" + reactionID);
            // Load reactants.
            let reactants = new Map([]);
            let xml_reactants = xml_reactions[i].getElementsByTagName("reactant");
            //console.log("xml_reactants.length=" + xml_reactants.length);
            for(let j = 0; j < xml_reactants.length; j++){
                let xml_molecule = (0, _xmlJs.getFirstElement)(xml_reactants[j], "molecule");
                let moleculeID = (0, _xmlJs.getAttribute)(xml_molecule, "ref");
                reactants.set(moleculeID, new (0, _reactionJs.Reactant)((0, _xmlJs.getAttributes)(xml_molecule), (0, _utilJs.get)(molecules, moleculeID)));
            }
            // Load products.
            let products = new Map([]);
            let xml_products = xml_reactions[i].getElementsByTagName("product");
            //console.log("xml_products.length=" + xml_products.length);
            for(let j = 0; j < xml_products.length; j++){
                let xml_molecule = (0, _xmlJs.getFirstElement)(xml_products[j], "molecule");
                let moleculeID = (0, _xmlJs.getAttribute)(xml_molecule, "ref");
                products.set(moleculeID, new (0, _reactionJs.Product)((0, _xmlJs.getAttributes)(xml_molecule), (0, _utilJs.get)(molecules, moleculeID)));
            }
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let mCRCMethod;
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName("me:MCRCMethod");
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                let attributes = (0, _xmlJs.getAttributes)(xml_MCRCMethod[0]);
                let name = attributes.get("name");
                if (name == null) {
                    let type = attributes.get("xsi:type");
                    if (type != null) {
                        if (type === "me:MesmerILT") {
                            let preExponential;
                            let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName("me:preExponential");
                            if (xml_preExponential != null) {
                                if (xml_preExponential[0] != null) {
                                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_preExponential[0])));
                                    preExponential = new (0, _reactionJs.PreExponential)((0, _xmlJs.getAttributes)(xml_preExponential[0]), value);
                                }
                            }
                            let activationEnergy;
                            let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName("me:activationEnergy");
                            if (xml_activationEnergy != null) {
                                if (xml_activationEnergy[0] != null) {
                                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_activationEnergy[0])));
                                    activationEnergy = new (0, _reactionJs.ActivationEnergy)((0, _xmlJs.getAttributes)(xml_activationEnergy[0]), value);
                                }
                            }
                            let tInfinity;
                            let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName("me:TInfinity");
                            if (xml_tInfinity != null) {
                                if (xml_tInfinity[0] != null) {
                                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_tInfinity[0])));
                                    tInfinity = new (0, _reactionJs.NInfinity)((0, _xmlJs.getAttributes)(xml_tInfinity[0]), value);
                                }
                            }
                            let nInfinity;
                            let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName("me:nInfinity");
                            if (xml_nInfinity != null) {
                                if (xml_nInfinity[0] != null) {
                                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_nInfinity[0])));
                                    nInfinity = new (0, _reactionJs.NInfinity)((0, _xmlJs.getAttributes)(xml_nInfinity[0]), value);
                                }
                            }
                            mCRCMethod = new (0, _reactionJs.MesmerILT)(attributes, preExponential, activationEnergy, tInfinity, nInfinity);
                        }
                    }
                } else mCRCMethod = new (0, _reactionJs.MCRCMethod)(attributes, name);
            }
            // Load transition state.
            //console.log("Load  transition state...");
            let xml_transitionState = xml_reactions[i].getElementsByTagName("me:transitionState");
            let transitionState;
            if (xml_transitionState.length > 0) {
                let xml_molecule = xml_transitionState[0].getElementsByTagName("molecule")[0];
                let moleculeID = xml_molecule.getAttribute("ref");
                transitionState = new (0, _reactionJs.TransitionState)((0, _xmlJs.getAttributes)(xml_molecule), (0, _utilJs.get)(molecules, moleculeID));
            //console.log("transitionState moleculeID=" + transitionState.molecule.getID());
            //console.log("transitionState role=" + transitionState.attributes.get("role"));
            }
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName("me:tunneling");
            let tunneling;
            if (xml_tunneling.length > 0) tunneling = new (0, _reactionJs.Tunneling)((0, _xmlJs.getAttributes)(xml_tunneling[0]));
            let reaction = new (0, _reactionJs.Reaction)(attributes, reactionID, reactants, products, mCRCMethod, transitionState, tunneling);
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
 */ function drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc) {
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
    const ctx = canvas.getContext("2d");
    //ctx.fillStyle = background;
    // Get text height for font size.
    let th = (0, _canvasJs.getTextHeight)(ctx, "Aj", font);
    //console.log("th=" + th);
    // Go through reactions:
    // 1. Create sets of reactants, end products, intermediate products and transition states.
    // 2. Create maps of orders and energies.
    // 3. Calculate maximum energy.
    let reactants = new Set();
    let products = new Set();
    let intProducts = new Set();
    let transitionStates = new Set();
    let orders = new Map();
    let energies = new Map();
    let i = 0;
    let energyMin = Number.MAX_VALUE;
    let energyMax = Number.MIN_VALUE;
    reactions.forEach(function(reaction, id) {
        // Get TransitionState if there is one.
        let transitionState = reaction.transitionState;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        reactants.add(reactantsLabel);
        if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
        let energy = reaction.getReactantsEnergy();
        energyMin = Math.min(energyMin, energy);
        energyMax = Math.max(energyMax, energy);
        energies.set(reactantsLabel, energy);
        let productsLabel = reaction.getProductsLabel();
        products.add(productsLabel);
        energy = reaction.getProductsEnergy();
        energyMin = Math.min(energyMin, energy);
        energyMax = Math.max(energyMax, energy);
        energies.set(productsLabel, energy);
        if (!orders.has(reactantsLabel)) {
            orders.set(reactantsLabel, i);
            i++;
        }
        if (orders.has(productsLabel)) {
            i--;
            let j = (0, _utilJs.get)(orders, productsLabel);
            // Move product to end and shift everything back.
            orders.forEach(function(value, key) {
                if (value > j) orders.set(key, value - 1);
            });
            // Insert transition state.
            if (transitionState != undefined) {
                let tsn = transitionState.getRef();
                transitionStates.add(tsn);
                orders.set(tsn, i);
                energy = transitionState.molecule.getEnergy();
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
                energies.set(tsn, energy);
                i++;
            }
            orders.set(productsLabel, i);
            i++;
        } else {
            if (transitionState != undefined) {
                let tsn = transitionState.getRef();
                transitionStates.add(tsn);
                orders.set(tsn, i);
                energy = transitionState.molecule.getEnergy();
                energyMin = Math.min(energyMin, energy);
                energyMax = Math.max(energyMax, energy);
                energies.set(tsn, energy);
                i++;
            }
            orders.set(productsLabel, i);
            i++;
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
        let energy = (0, _utilJs.get)(energies, value);
        let energyRescaled = (0, _utilJs.rescale)(energyMin, energyRange, 0, canvas.height, energy);
        // Get text width.
        tw = Math.max((0, _canvasJs.getTextWidth)(ctx, energy.toString(), font), (0, _canvasJs.getTextWidth)(ctx, value, font));
        x1 = x0 + tw + textSpacing;
        y0 = energyRescaled + lw;
        y1 = y0;
        // Draw horizontal line and add label.
        // (The drawing is now not done here but done later so labels are on top of lines.)
        // The code is left here commented out for reference.
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
    let canvasHeightWithBorder = canvas.height + 4 * th + 2 * lw;
    //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
    let originalCanvasHeight = canvas.height;
    // Update the canvas height.
    canvas.height = canvasHeightWithBorder;
    // Set the transformation matrix.
    //ctx.transform(1, 0, 0, 1, 0, canvasHeightWithBorder);
    ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder);
    // Go through reactions and draw connecting lines.
    reactions.forEach(function(reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        // Get TransitionState if there is one.
        let transitionState = reaction.transitionState;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, _utilJs.get)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, _utilJs.get)(productsInXY, productsLabel);
        if (transitionState != undefined) {
            let transitionStateLabel = transitionState.getRef();
            let transitionStateInXY = (0, _utilJs.get)(transitionStatesInXY, transitionStateLabel);
            (0, _canvasJs.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
            let transitionStateOutXY = (0, _utilJs.get)(transitionStatesOutXY, transitionStateLabel);
            (0, _canvasJs.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
        } else (0, _canvasJs.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
    });
    // Draw horizontal lines and labels.
    // (This is done last so that the labels are on top of the vertical lines.)
    reactants.forEach(function(value) {
        let energy = (0, _utilJs.get)(energies, value);
        let energyRescaled = (0, _utilJs.rescale)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, _utilJs.get)(reactantsInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, _utilJs.get)(reactantsOutXY, value)[0];
        let energyString = energy.toString();
        (0, _canvasJs.drawLevel)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
    });
    products.forEach(function(value) {
        let energy = (0, _utilJs.get)(energies, value);
        let energyRescaled = (0, _utilJs.rescale)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, _utilJs.get)(productsInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, _utilJs.get)(productsOutXY, value)[0];
        let energyString = energy.toString();
        if (intProducts.has(value)) (0, _canvasJs.drawLevel)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
        else (0, _canvasJs.drawLevel)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
    });
    transitionStates.forEach(function(value) {
        let v;
        let energy = (0, _utilJs.get)(energies, value);
        let energyRescaled = (0, _utilJs.rescale)(energyMin, energyRange, 0, originalCanvasHeight, energy);
        let x0 = (0, _utilJs.get)(transitionStatesInXY, value)[0];
        let y = energyRescaled + lw;
        let x1 = (0, _utilJs.get)(transitionStatesOutXY, value)[0];
        let energyString = energy.toString();
        (0, _canvasJs.drawLevel)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
    });
}
/**
 * Display molecules table.
 */ function displayMoleculesTable() {
    if (molecules.size == 0) return;
    // Prepare table headings.
    let moleculesTable = (0, _htmlJs.getTH)([
        "Name",
        "Energy<br>kJ/mol",
        "Rotation constants<br>cm<sup>-1</sup>",
        "Vibration frequencies<br>cm<sup>-1</sup>"
    ]);
    molecules.forEach(function(molecule, id) {
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        let energyNumber = molecule.getEnergy();
        let energy;
        if (energyNumber == null) energy = "";
        else energy = energyNumber.toString();
        //console.log("energy=" + energy);
        let rotationConstants = "";
        let rotConsts = molecule.getRotationConstants();
        if (rotConsts != undefined) rotationConstants = (0, _functionsJs.arrayToString)(rotConsts, " ");
        let vibrationFrequencies = "";
        let vibFreqs = molecule.getVibrationFrequencies();
        if (vibFreqs != undefined) vibrationFrequencies = (0, _functionsJs.arrayToString)(vibFreqs, " ");
        moleculesTable += (0, _htmlJs.getTR)((0, _htmlJs.getTD)(id) + (0, _htmlJs.getTD)((0, _htmlJs.getInput)("number", id + "_energy", "setEnergy(this)", energy)) + (0, _htmlJs.getTD)(rotationConstants, true) + (0, _htmlJs.getTD)(vibrationFrequencies, true));
    });
    molecules_table = document.getElementById("molecules_table");
    if (molecules_table !== null) molecules_table.innerHTML = moleculesTable;
}
/**
 * Display reactions table.
 */ function displayReactionsTable() {
    if (reactions.size == 0) return;
    // Prepare table headings.
    let reactionsTable = (0, _htmlJs.getTH)([
        "ID",
        "Reactants",
        "Products",
        "Transition State",
        "PreExponential",
        "Activation Energy",
        "TInfinity",
        "NInfinity"
    ]);
    reactions.forEach(function(reaction, id) {
        //console.log("id=" + id);
        //console.log("reaction=" + reaction);
        let reactants = (0, _functionsJs.arrayToString)(Array.from(reaction.reactants.keys()), " ");
        let products = (0, _functionsJs.arrayToString)(Array.from(reaction.products.keys()), " ");
        let transitionState = "";
        let preExponential = "";
        let activationEnergy = "";
        let tInfinity = "";
        let nInfinity = "";
        if (reaction.transitionState != undefined) {
            let name = reaction.transitionState.attributes.get("name");
            if (name != null) transitionState = name;
        }
        if (reaction.mCRCMethod != undefined) {
            if (reaction.mCRCMethod instanceof (0, _reactionJs.MesmerILT)) {
                if (reaction.mCRCMethod.preExponential != null) preExponential = reaction.mCRCMethod.preExponential.value.toString() + " " + reaction.mCRCMethod.preExponential.attributes.get("units");
                if (reaction.mCRCMethod.activationEnergy != null) activationEnergy = reaction.mCRCMethod.activationEnergy.value.toString() + " " + reaction.mCRCMethod.activationEnergy.attributes.get("units");
                if (reaction.mCRCMethod.tInfinity != null) tInfinity = reaction.mCRCMethod.tInfinity.toString();
                if (reaction.mCRCMethod.nInfinity != null) nInfinity = reaction.mCRCMethod.nInfinity.value.toString();
            } else {
                if (reaction.mCRCMethod.attributes.get("name") == "RRKM") ;
                else throw new Error("Unexpected mCRCMethod: " + reaction.mCRCMethod);
            }
        }
        reactionsTable += (0, _htmlJs.getTR)((0, _htmlJs.getTD)(id) + (0, _htmlJs.getTD)(reactants) + (0, _htmlJs.getTD)(products) + (0, _htmlJs.getTD)(transitionState) + (0, _htmlJs.getTD)(preExponential, true) + (0, _htmlJs.getTD)(activationEnergy, true) + (0, _htmlJs.getTD)(tInfinity, true) + (0, _htmlJs.getTD)(nInfinity, true));
        reactions_table = document.getElementById("reactions_table");
        if (reactions_table !== null) reactions_table.innerHTML = reactionsTable;
    });
}
/**
 * Display reactions diagram.
 */ function displayReactionsDiagram() {
    if (reactions.size > 1) {
        // Set reactions_diagram_title.
        reactions_diagram_title = document.getElementById("reactions_diagram_title");
        if (reactions_diagram_title != null) reactions_diagram_title.innerHTML = "Diagram";
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, molecules, reactions, dark, font, lw, lwc);
        }
    }
}
/**
 * Display conditions.
 */ function displayConditions() {
    let bathGas_element = document.getElementById("bathGas");
    if (bathGas_element != null) bathGas_element.innerHTML = "Bath Gas " + conditions.bathGas.molecule.getID();
    let PTs_element = document.getElementById("PT_table");
    let table = (0, _htmlJs.getTH)([
        "P",
        "T"
    ]);
    if (PTs_element != null) {
        conditions.pTs.forEach(function(pTpair) {
            table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)(pTpair.P.toString()) + (0, _htmlJs.getTD)(pTpair.T.toString()));
        });
        PTs_element.innerHTML = table;
    }
}
/**
 * Display modelParameters.
 */ function displayModelParameters() {
    let modelParameters_element = document.getElementById("modelParameters_table");
    let table = (0, _htmlJs.getTH)([
        "Parameter",
        "Value"
    ]);
    table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("Grain Size") + (0, _htmlJs.getTD)(modelParameters.grainSize.value.toString()));
    table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("Energy Above The Top Hill") + (0, _htmlJs.getTD)(modelParameters.energyAboveTheTopHill.toString()));
    if (modelParameters_element != null) modelParameters_element.innerHTML = table;
}
/**
 * Display control.
 */ function displayControl() {
    let control_table_element = document.getElementById("control_table");
    let table = (0, _htmlJs.getTH)([
        "Control",
        "Value"
    ]);
    if (control.testDOS != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.testDOS") + (0, _htmlJs.getTD)(""));
    if (control.printSpeciesProfile != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printSpeciesProfile") + (0, _htmlJs.getTD)(""));
    if (control.testMicroRates != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.testMicroRates") + (0, _htmlJs.getTD)(""));
    if (control.testRateConstant != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.testRateConstant") + (0, _htmlJs.getTD)(""));
    if (control.printGrainDOS != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printGrainDOS") + (0, _htmlJs.getTD)(""));
    if (control.printCellDOS != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printCellDOS") + (0, _htmlJs.getTD)(""));
    if (control.printReactionOperatorColumnSums != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printReactionOperatorColumnSums") + (0, _htmlJs.getTD)(""));
    if (control.printTunnellingCoefficients != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printTunnellingCoefficients") + (0, _htmlJs.getTD)(""));
    if (control.printGrainkfE != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printGrainkfE") + (0, _htmlJs.getTD)(""));
    if (control.printGrainBoltzmann != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printGrainBoltzmann") + (0, _htmlJs.getTD)(""));
    if (control.printGrainkbE != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.printGrainkbE") + (0, _htmlJs.getTD)(""));
    if (control.eigenvalues != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.eigenvalues") + (0, _htmlJs.getTD)(control.eigenvalues.toString()));
    if (control.hideInactive != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.hideInactive") + (0, _htmlJs.getTD)(""));
    if (control.diagramEnergyOffset != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("me.diagramEnergyOffset") + (0, _htmlJs.getTD)(control.diagramEnergyOffset.value.toString()));
    if (control_table_element != null) control_table_element.innerHTML = table;
}
function setEnergy(input) {
    let id_energy = input.id;
    let moleculeID = id_energy.split("_")[0];
    let molecule = molecules.get(moleculeID);
    if (molecule != undefined) {
        let inputValue = parseFloat(input.value);
        if (!isNaN(inputValue)) {
            molecule.setEnergy(inputValue);
            console.log("Energy of " + moleculeID + " set to " + inputValue);
        } else {
            alert("Energy input for " + moleculeID + " is not a number");
            let inputElement = document.getElementById(id_energy);
            inputElement.value = molecule.getEnergy().toString();
        }
    //console.log("molecule=" + molecule);
    }
}
window.setEnergy = setEnergy;
/**
 * Save to XML file.
 */ window.saveXML = function() {
    console.log("saveXML");
    const pad = "  ";
    let level;
    const padding2 = pad.repeat(2);
    // Create me.title.
    let title_xml = "\n" + pad + (0, _xmlJs.getTag)(title, "me:title");
    // Create moleculeList.
    level = 2;
    let moleculeList = "";
    molecules.forEach(function(molecule, id) {
        moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = (0, _xmlJs.getTag)(moleculeList, "moleculeList", undefined, undefined, undefined, pad, true);
    // Create reactionList.
    level = 2;
    let reactionList = "";
    reactions.forEach(function(reaction, id) {
        reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = (0, _xmlJs.getTag)(reactionList, "reactionList", undefined, undefined, undefined, pad, true);
    // Create me.Conditions
    let xml_conditions = conditions.toXML(pad, pad);
    // Create modelParameters
    let xml_modelParameters = modelParameters.toXML(pad, pad);
    // create me.control
    let xml_control = control.toXML(pad, pad);
    // Create a new Blob object from the data
    let blob = new Blob([
        header,
        mesmerStartTag,
        title_xml,
        moleculeList,
        reactionList,
        xml_conditions,
        xml_modelParameters,
        xml_control,
        mesmerEndTag
    ], {
        type: "text/plain"
    });
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
};

},{"./util.js":"f0Rnl","./xml.js":"7znDa","./molecule.js":"ahQNx","./reaction.js":"8grVN","./functions.js":"dxSxr","./html.js":"aLPSL","./canvas.js":"hoJRr","./classes.js":"ikp7x","./conditions.js":"aksKl","./modelParameters.js":"kQHfz","./control.js":"Qx5gu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0Rnl":[function(require,module,exports) {
/**
 * Thow an error if the key is not in the map otherwise return the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "get", ()=>get);
/**
 * Linearly rescale a value from one range to another.
 * @param min The minimum value of the original range.
 * @param range The original range.
 * @param newMin The minimum value of the new range.
 * @param newRange The new range.
 * @param value The value to rescale.
 * @returns The rescaled value.
 */ parcelHelpers.export(exports, "rescale", ()=>rescale);
function get(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function rescale(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7znDa":[function(require,module,exports) {
/**
 * Get the attribute of an xml element.
 * @param xml The xml element to search in.
 * @param name The name of the attribute to search for.
 * @returns The value of the attribute.
 * @throws An error if the attribute is not found.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getAttribute", ()=>getAttribute);
/**
 * Get the first element in element with a tag name tagName.
 * @param element The xml element to search in.
 * @param tagName The tag name of the elements to search for.
 * @returns The first element in element with a tag name tagName.
 * @throws An error if the element is not found.
 */ parcelHelpers.export(exports, "getFirstElement", ()=>getFirstElement);
/**
 * Get the first childNode.
 * @param {Element} element The xml element to search in.
 * @returns {ChildNode} The first ChildNode if there is one.
 * @throws An error if the element has no childNodes.
 */ parcelHelpers.export(exports, "getFirstChildNode", ()=>getFirstChildNode);
/**
 * Get the nodeValue of a ChildNode.
 * @param {ChildNode} node The node to get the nodeValue of.
 * @returns {string} The nodeValue of the node.
 * @throws An error if the nodeValue is null.
 */ parcelHelpers.export(exports, "getNodeValue", ()=>getNodeValue);
/**
 * Create and return a XML start tag. For multiple attributes, pass them in a map.
 * If there is only one, then pass the name and value as separate parameters.
 * @param tagName The tag name.
 * @param {Map<string, any>} attributes The attributes (optional).
 * @param {string} attributeName The name of the attribute (optional).
 * @param {any} attributeValue The value of the attribute (optional).
 * @param {string} padding The padding (optional).
 * @returns The XML start tag.
 */ parcelHelpers.export(exports, "getStartTag", ()=>getStartTag);
/**
 * Create and return an XML end tag.
 * @param tagName The tag name.
 * @param padding The padding (optional).
 * @param padValue Whether to pad the value (optional).
 * @returns The XML end tag.
 */ parcelHelpers.export(exports, "getEndTag", ()=>getEndTag);
/**
 * Create and return an XML tag with content. For multiple attributes, pass them in a map.
 * If there is only one, then pass the name and value as separate parameters.
 * @param content The content of the tag.
 * @param tagName The tag name.
 * @param delimeter Whether values are delimeted.
 * @param {Map<string, any>} attributes The attributes (optional).
 * @param {string} attributeName The name of the attribute (optional).
 * @param {any} attributeValue The value of the attribute (optional).
 * @param {string} padding The padding (optional).
 * @param {boolean} padValue Whether to pad the value (optional).
 * @returns The XML tag with content.
 */ parcelHelpers.export(exports, "getTag", ()=>getTag);
/**
 * Get the attributes of an element.
 * @param {Element} element The element to get the attributes of.
 * @returns {Map<string, string>} The attributes of the element.
 */ parcelHelpers.export(exports, "getAttributes", ()=>getAttributes);
/**
 * Get an XML element checking that it is the only one with a given tagName.
 * @param {XMLDocument | Element} xml The XML document or element.
 * @param {string} tagName The tag name.
 * @returns {Element} The element.
 * @throws An error if there is not exactly one element with the given tag name.
 */ parcelHelpers.export(exports, "getSingularElement", ()=>getSingularElement);
/**
 * Convert XML to HTML.
 * @param {string} text The XML text.
 */ parcelHelpers.export(exports, "toHTML", ()=>toHTML);
function getAttribute(xml, name) {
    let v = xml.getAttribute(name);
    if (!v) throw new Error(name + " attribute not found");
    return v;
}
function getFirstElement(element, tagName) {
    let el = element.getElementsByTagName(tagName)[0];
    if (el == null) throw new Error(tagName + " element not found");
    return el;
}
function getFirstChildNode(element) {
    let cn = element.childNodes;
    if (cn == null) throw new Error("Element has no childNodes");
    return cn[0];
}
function getNodeValue(node) {
    let nodeValue = node.nodeValue;
    if (nodeValue == null) throw new Error("nodeValue is null");
    return nodeValue;
}
function getStartTag(tagName, attributes, attributeName, attributeValue, padding) {
    let s = "";
    if (padding != undefined) s += "\n" + padding;
    s += "<" + tagName;
    if (attributes) for (let [k, v] of attributes)s += " " + k + '="' + v.toString() + '"';
    if (attributeName && attributeValue) s += " " + attributeName + '="' + attributeValue.toString() + '"';
    return s + ">";
}
function getEndTag(tagName, padding, padValue) {
    let s = "";
    if (padValue) {
        if (padding != undefined) s += "\n" + padding;
    }
    return s + "</" + tagName + ">";
}
function getTag(content, tagName, attributes, attributeName, attributeValue, padding, padValue) {
    let startTag = getStartTag(tagName, attributes, attributeName, attributeValue, padding);
    let endTag = getEndTag(tagName, padding, padValue);
    return startTag + content + endTag;
}
function getAttributes(element) {
    let attributeNames = element.getAttributeNames();
    let attributes = new Map();
    attributeNames.forEach(function(attributeName) {
        let attributeValue = element.getAttribute(attributeName);
        if (attributeValue != null) attributes.set(attributeName, attributeValue);
    });
    return attributes;
}
function getSingularElement(xml, tagName) {
    let e = xml.getElementsByTagName(tagName);
    if (e.length != 1) throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    return e[0];
}
function toHTML(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ahQNx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for representing an atom.
 * @param {Map<string, string>} attributes The attributes.
 * If there is no "id" or "elementType" key an error will be thrown.
 */ parcelHelpers.export(exports, "Atom", ()=>Atom);
/**
 * A class for representing an atomic bond - a bond beteen two atoms.
 * @param {Map<string, string>} attributes The attributes.
 * @param {Atom} atomA One atom.
 * @param {Atom} atomB Another atom.
 * @param {string} order The order of the bond.
 */ parcelHelpers.export(exports, "Bond", ()=>Bond);
/**
 * A class for representing a property.
 */ parcelHelpers.export(exports, "Property", ()=>Property);
/**
 * Represents the deltaEDown class.
 */ parcelHelpers.export(exports, "DeltaEDown", ()=>DeltaEDown);
/**
 * A class for representing an energy transfer model.
 */ parcelHelpers.export(exports, "EnergyTransferModel", ()=>EnergyTransferModel);
/**
 * A class for representing a method for calculating the density of states.
 */ parcelHelpers.export(exports, "DOSCMethod", ()=>DOSCMethod);
/**
 * A class for representing a molecule.
 * @param {string} id The id of the molecule.
 * @param {string} description The description of the molecule.
 * @param {boolean} active Indicates if the molecule is active.
 * @param {Map<string, Atom>} atoms A Map of atoms with keys as string atom ids and values as Atoms.
 * @param {Map<string, Bond>} bonds A Map of bonds with keys as string atom ids and values as Bonds.
 * @param {Map<string, Property>} properties A map of properties.
 * @param {EnergyTransferModel | null} energyTransferModel The energy transfer model.
 * @param {DOSCMethod | null} dOSCMethod The method for calculating density of states.
 */ parcelHelpers.export(exports, "Molecule", ()=>Molecule);
var _classesJs = require("./classes.js");
var _functionsJs = require("./functions.js");
var _xmlJs = require("./xml.js");
class Atom extends (0, _classesJs.Attributes) {
    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */ constructor(attributes){
        super(attributes);
        let id = attributes.get("id");
        if (id == undefined) throw new Error("id is undefined");
        let elementType = attributes.get("elementType");
        if (elementType == undefined) throw new Error("elementType is undefined");
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        return s + `)`;
    }
    /**
     * @returns The id of the atom.
     */ get id() {
        return this.attributes.get("id");
    }
    /**
     * @returns The element type of the atom.
     */ get elementType() {
        return this.attributes.get("elementType");
    }
}
class Bond extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        return s + `)`;
    }
}
class Property extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {NumberWithAttributes | NumberArrayWithAttributes} property The property.
     */ constructor(attributes, property){
        super(attributes);
        this.property = property;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + ` property(${this.property.toString()}))`;
    }
    /**
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1 = undefined;
        if (pad != undefined) {
            if (padding != undefined) padding1 = padding + pad;
        }
        if (this.property instanceof (0, _classesJs.NumberWithAttributes)) return (0, _xmlJs.getTag)(this.property.toXML("scalar", padding1), "property", this.attributes, undefined, undefined, padding, true);
        else return (0, _xmlJs.getTag)(this.property.toXML("array", padding1), "property", this.attributes, undefined, undefined, padding, true);
    }
}
class DeltaEDown extends (0, _classesJs.NumberWithAttributes) {
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class EnergyTransferModel extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown} deltaEDown The DeltaEDown.
     */ constructor(attributes, deltaEDown){
        super(attributes);
        this.deltaEDown = deltaEDown;
    }
    /**
     * @param padding - Optional padding string for formatting the XML output.
     * @returns An XML representation.
     */ toXML(pad, padding) {
        if (pad == undefined) return (0, _xmlJs.getTag)(this.deltaEDown.toXML("me.deltaEDown", padding), "me:energyTransferModel", this.attributes, undefined, undefined, padding, false);
        else return (0, _xmlJs.getTag)(this.deltaEDown.toXML("me.deltaEDown", padding), "energyTransferModel", undefined, undefined, undefined, padding, true);
    }
}
class DOSCMethod {
    constructor(type){
        this.type = type;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return `DOSCMethod(type(${this.type}))`;
    }
    /**
     * @param padding The padding (Optional).
     * @returns A tag representation.
     */ toTag(padding) {
        let s = `<me.DOSCMethod xsi:type="${this.type}"/>`;
        if (padding) return "\n" + padding + s;
        return "\n" + s;
    }
}
class Molecule extends (0, _classesJs.Attributes) {
    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes known about are "description" and "active", but these do not exist for all molecules
     * in Mesmer XML input/output files.
     * @param {Map<string, Atom>} atoms A Map of atoms with keys as ids.
     * @param {Map<string, Bond>} bonds A Map of bonds with. The keys combine the ids of the two bonded atoms.
     * @param {Map<string, Property>} properties A map of properties.
     * @param {EnergyTransferModel | null} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | null} dOSCMethod The method for calculating density of states.
     */ constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod){
        super(attributes);
        let id = this.attributes.get("id");
        if (id == undefined) throw new Error("id is undefined");
        this.id = id;
        this.atoms = atoms;
        this.bonds = bonds;
        this.properties = properties;
        this.energyTransferModel = energyTransferModel;
        this.dOSCMethod = dOSCMethod;
    }
    /** 
     * @returns A string representation.
     */ toString() {
        let r = `Molecule(id(${this.getID()}), `;
        let description = this.getDescription();
        if (description != undefined) r += `description(${description}), `;
        let active = this.getActive();
        if (active != undefined) r += `active(${active}), `;
        if (this.atoms.size > 0) r += `atoms(${(0, _functionsJs.mapToString)(this.atoms)}), `;
        if (this.bonds.size > 0) r += `bonds(${(0, _functionsJs.mapToString)(this.bonds)}), `;
        if (this.properties.size > 0) r += `properties(${(0, _functionsJs.mapToString)(this.properties)}), `;
        if (this.energyTransferModel) r += `energyTransferModel(${this.energyTransferModel.toString()}), `;
        if (this.dOSCMethod) r += `dOSCMethod(${this.dOSCMethod.toString()}), `;
        return r + `)`;
    }
    /**
     * @return The id of the molecule.
     */ getID() {
        return this.attributes.get("id");
    }
    /**
     * Gets the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */ getDescription() {
        return this.attributes.get("description");
    }
    /**
     * Gets the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        let active = this.attributes.get("active");
        if (active != undefined) return true;
        return active;
    }
    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set.
     * @throws An error if "me.ZPE" is a property, but is not mapped to a PropertyScalar.
     */ getEnergy() {
        let zpe = this.properties.get("me:ZPE");
        if (zpe == undefined) return 0;
        if (zpe.property instanceof (0, _classesJs.NumberWithAttributes)) return zpe.property.value;
        else throw new Error("Expected a PropertyScalar but got a PropertyArray and not sure how to handle that.");
    }
    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */ setEnergy(energy) {
        let property = this.properties.get("me:ZPE");
        if (property == undefined) throw new Error("No me.ZPE property found");
        if (property.property instanceof (0, _classesJs.NumberArrayWithAttributes)) throw new Error("Expected a NumberWithAttributes but got a NumberArrayWithAttributes and not sure how to handle that.");
        else property.property.value = energy;
    }
    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */ getRotationConstants() {
        let property = this.properties.get("me:rotConsts");
        if (property != undefined) {
            if (property.property != null) {
                if (property.property instanceof (0, _classesJs.NumberWithAttributes)) return [
                    property.property.value
                ];
                else return property.property.values;
            } else return undefined;
        }
        return property;
    }
    /**
     * Get the VibrationFrequencies of the molecule.
     * @returns The VibrationFrequencies of the molecule.
     */ getVibrationFrequencies() {
        let property = this.properties.get("me:vibFreqs");
        if (property != undefined) {
            if (property.property instanceof (0, _classesJs.NumberWithAttributes)) return [
                property.property.value
            ];
            else if (property.property instanceof (0, _classesJs.NumberArrayWithAttributes)) return property.property.values;
            else return undefined;
        }
        return property;
    }
    /**
     * @param {string} tagName The tag name.
     * @param {string} pad The pad (Optional).
     * @param {number} level The level of padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, pad, level) {
        // Padding
        let padding0 = "";
        let padding1 = "";
        let padding2 = "";
        let padding3 = "";
        if (pad != undefined && level != undefined) {
            padding0 = pad.repeat(level);
            padding1 = padding0 + pad;
            padding2 = padding1 + pad;
            padding3 = padding2 + pad;
        }
        // Atoms
        let atoms_xml = "";
        for (let atom of this.atoms.values())atoms_xml += atom.toTag("atom", padding2);
        if (this.atoms.size > 1) {
            if (atoms_xml != "") atoms_xml = (0, _xmlJs.getTag)(atoms_xml, "atomArray", undefined, undefined, undefined, padding1, true);
        }
        // Bonds
        let bonds_xml = "";
        for (let bond of this.bonds.values())bonds_xml += bond.toTag("bond", padding2);
        if (bonds_xml != "") bonds_xml = (0, _xmlJs.getTag)(bonds_xml, "bondArray", undefined, undefined, undefined, padding1, true);
        // Properties
        let properties_xml = "";
        this.properties.forEach((property)=>{
            let property_xml = "";
            if (property.property instanceof (0, _classesJs.NumberWithAttributes)) property_xml += property.property.toXML("scalar", padding3);
            else property_xml += property.property.toXML("array", padding3);
            properties_xml += (0, _xmlJs.getTag)(property_xml, "property", property.attributes, undefined, undefined, padding2, true);
        });
        if (this.properties.size > 1) {
            if (properties_xml != "") properties_xml = (0, _xmlJs.getTag)(properties_xml, "propertyList", undefined, undefined, undefined, padding1, true);
        }
        // EnergyTransferModel
        let energyTransferModel_xml = "";
        if (this.energyTransferModel) energyTransferModel_xml = this.energyTransferModel.toXML(pad, padding1);
        // DOSCMethod
        let dOSCMethod_xml = "";
        if (this.dOSCMethod) dOSCMethod_xml = this.dOSCMethod.toTag(padding1);
        return (0, _xmlJs.getTag)(atoms_xml + bonds_xml + properties_xml + energyTransferModel_xml + dOSCMethod_xml, tagName, this.attributes, undefined, undefined, padding0, true);
    }
}

},{"./classes.js":"ikp7x","./functions.js":"dxSxr","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ikp7x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for representing things with attributes.
 * @param {Map<string, string>} attributes The attributes.
 */ parcelHelpers.export(exports, "Attributes", ()=>Attributes);
/**
 * A class for representing a number with attributes.
 * e.g. A value with units and measurement/uncertainty information.
 */ parcelHelpers.export(exports, "NumberWithAttributes", ()=>NumberWithAttributes);
/**
 * A class for representing numerical values with a shared attributes.
 * e.g. An array values sharing the same units and measurement details.
 */ parcelHelpers.export(exports, "NumberArrayWithAttributes", ()=>NumberArrayWithAttributes);
var _html = require("./html");
var _xml = require("./xml");
class Attributes {
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        this.attributes = attributes;
    }
    /**
     * @returns The name in lower case.
     */ /*
    get name(): string {
        return this.constructor.name.toLowerCase().trim();
    }
    */ /**
     * @returns A string representation.
     */ toString() {
        let r = this.constructor.name + `(`;
        this.attributes.forEach((value, key)=>{
            r += `${key}(${value}), `;
        });
        return r;
    }
    /**
     * Get the tag representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns A tag representation.
     */ toTag(tagName, padding) {
        let s = (0, _html.getSelfClosingTag)(this.attributes, tagName);
        if (padding) return "\n" + padding + s;
        return "\n" + s;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        return (0, _xml.getTag)("", tagName, this.attributes, undefined, undefined, padding, false);
    }
}
class NumberWithAttributes extends Attributes {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value.
     */ constructor(attributes, value){
        super(attributes);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        return (0, _xml.getTag)(this.value.toString().trim(), tagName, this.attributes, undefined, undefined, padding, false);
    }
}
class NumberArrayWithAttributes extends Attributes {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number[]} values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes);
        /**
     * The delimiter of the values.
     */ this.delimiter = ",";
        this.values = values;
        if (delimiter) this.delimiter = delimiter;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param {string} delimiter The delimiter.
     */ setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        return (0, _xml.getTag)(this.values.toString().replaceAll(",", this.delimiter), tagName, this.attributes, undefined, undefined, padding, false);
    }
}

},{"./html":"aLPSL","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aLPSL":[function(require,module,exports) {
/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getTH", ()=>getTH);
/**
 * Create a table cell.
 * @param {string} x A cell for a table row.
 * @param {boolean} contentEditable If true then the cell is set to be editable.  
 * @returns {string} x wrapped in td tags.
 */ parcelHelpers.export(exports, "getTD", ()=>getTD);
/**
 * Create a table row.
 * @param {string} x A row for a table.
 * @returns {string} x wrapped in tr tags.
 */ parcelHelpers.export(exports, "getTR", ()=>getTR);
/**
 * Create a table.
 * @param {string} x Table rows for a table.
 * @returns {string} x wrapped in table tags.
 */ parcelHelpers.export(exports, "getTable", ()=>getTable);
/**
 * Create a div.
 * @param {string} x The content of the div.
 * @param {string | null} id The id of the div.
 * @param {string | null} html_class The class of the div.
 * @returns {string} x wrapped in div tags.
 */ parcelHelpers.export(exports, "getDiv", ()=>getDiv);
/**
 * Create a input.
 * @param {string} type The input type (e.g. text, number).
 * @param {string | null} id The id of the button.
 * @param {string | null} func The function called on a change.
 * @param {string | null} value The value of the input.
 * @returns {string} An input HTML element.
 */ parcelHelpers.export(exports, "getInput", ()=>getInput);
/**
 * Create a self closing tag.
 * @param {Map<string, string> | null} attributes The attributes.
 * @param {string} tagName The tag name.
 */ parcelHelpers.export(exports, "getSelfClosingTag", ()=>getSelfClosingTag);
function getTH(headings) {
    var th = "";
    for(let i = 0; i < headings.length; i++)th += "<th>" + headings[i] + "</th>";
    return getTR(th);
}
function getTD(x, contentEditable = false) {
    let r = "<td";
    if (contentEditable) r += ' contenteditable="true"';
    r += ">" + x + "</td>";
    return r;
}
function getTR(x) {
    return "<tr>" + x + "</tr>\n";
}
function getTable(x) {
    return "<table>" + x + "</table>";
}
function getDiv(x, id, html_class) {
    let r = "<div";
    if (id !== null) r += ' id="' + id + '"';
    if (html_class !== null) r += ' class="' + html_class + '"';
    return r + ">" + x + "</div>";
}
function getInput(type, id, func, value) {
    let r = '<input type="' + type + '"';
    if (id !== null) r += ' id="' + id + '"';
    if (func !== null) r += ' onchange="' + func + '"';
    if (value !== null) r += ' value="' + value + '"';
    return r + ">";
}
function getSelfClosingTag(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dxSxr":[function(require,module,exports) {
/**
 * For convertina a map to a string.
 * @param map The map to convert to a string.
 * @returns A string representation of all the entries in the map.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "mapToString", ()=>mapToString);
/**
 * For converting an array to a string.
 * @param {any[]} array The array to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */ parcelHelpers.export(exports, "arrayToString", ()=>arrayToString);
/**
 * For converting a string array to a number array.
 * @param {string[]} s The string to convert to a number array.
 * @returns A number array.
 */ parcelHelpers.export(exports, "toNumberArray", ()=>toNumberArray);
/**
 * Is the string numeric in that it can be parsed as a float that is not a NaN?
 * @param {string} s The string.
 * @returns True if the string can be parsed as a float that is not a NaN and false otherwise.
 */ parcelHelpers.export(exports, "isNumeric", ()=>isNumeric);
function mapToString(map) {
    if (map == null) return "";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(", ");
}
function arrayToString(array, delimiter) {
    if (array == null) return "";
    if (delimiter == null) delimiter = ", ";
    return array.map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function toNumberArray(s) {
    let r = [];
    for(let i = 0; i < s.length; i++)r.push(parseFloat(s[i]));
    return r;
}
function isNumeric(s) {
    return !isNaN(parseFloat(s));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8grVN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for representing a Reaction Molecule.
 */ parcelHelpers.export(exports, "ReactionMolecule", ()=>ReactionMolecule);
/**
 * A class for representing a reactant.
 * This is a molecule often with a role in a reaction.
 */ parcelHelpers.export(exports, "Reactant", ()=>Reactant);
/**
 * A class for representing a product.
 * This is a molecule produced in a reaction.
 */ parcelHelpers.export(exports, "Product", ()=>Product);
/**
 * A class for representing a transition state.
 */ parcelHelpers.export(exports, "TransitionState", ()=>TransitionState);
/**
 * A class for representing the Arrhenius pre-exponential factor.
 */ parcelHelpers.export(exports, "PreExponential", ()=>PreExponential);
/**
 * A class for representing the Arrhenius activation energy factor.
 */ parcelHelpers.export(exports, "ActivationEnergy", ()=>ActivationEnergy);
/**
 * A class for representing the reference temperature.
 */ parcelHelpers.export(exports, "TInfinity", ()=>TInfinity);
/**
 * A class for representing the modified Arrhenius parameter factor.
 */ parcelHelpers.export(exports, "NInfinity", ()=>NInfinity);
/**
 * A class for representing tunneling.
 */ parcelHelpers.export(exports, "Tunneling", ()=>Tunneling);
/**
 * A class for representing the MCRCMethod specifications.
 * Extended classes indicate how microcanonical rate constant is to be treated.
 */ parcelHelpers.export(exports, "MCRCMethod", ()=>MCRCMethod);
/**
 * A class for representing the inverse Laplace transform (ILT) type of microcanonical rate constant.
 */ parcelHelpers.export(exports, "MesmerILT", ()=>MesmerILT);
/**
 * A class for representing the Zhu-Nakamura crossing MCRCMethod.
 */ parcelHelpers.export(exports, "ZhuNakamuraCrossing", ()=>ZhuNakamuraCrossing);
/**
 * A class for representing the sum of states.
 * @param {string} units The units of energy.
 * @param {boolean} angularMomentum The angular momentum attribute.
 * @param {boolean} noLogSpline The no log spline attribute.
 * @param {SumOfStatesPoint[]} sumOfStatesPoints The sum of states points.
 */ /*
export class SumOfStates extends NumberWithAttributes {
    units: string;
    angularMomentum: boolean;
    noLogSpline: boolean;
    sumOfStatesPoints: SumOfStatesPoint[];
    constructor(units: string, angularMomentum: boolean, noLogSpline: boolean, sumOfStatesPoints: SumOfStatesPoint[]) {
        this.units = units;
        this.angularMomentum = angularMomentum;
        this.noLogSpline = noLogSpline;
        this.sumOfStatesPoints = sumOfStatesPoints;
    }
    toString() {
        return `SumOfStates(` +
            `units(${this.units}), ` +
            `angularMomentum(${this.angularMomentum.toString()}), ` +
            `noLogSpline(${this.noLogSpline.toString()}), ` +
            `sumOfStatesPoints(${arrayToString(this.sumOfStatesPoints, " ")}))`;
    }
}
*/ /**
 * A class for representing a sum of states point.
 * @param {number} value The value of the point.
 * @param {number} energy The energy of the point.
 * @param {number} angMomMag The angular momentum magnitude of the point.
 */ /*
export class SumOfStatesPoint {
    value: number;
    energy: number;
    angMomMag: number;
    constructor(value: number, energy: number, angMomMag: number) {
        this.value = value;
        this.energy = energy;
        this.angMomMag = angMomMag;
    }
    toString() {
        return `SumOfStatesPoint(` +
            `value(${this.value}), ` +
            `energy(${this.energy.toString()}), ` +
            `angMomMag(${this.angMomMag.toString()}))`;
    }
}
*/ /**
 * A class for representing the DefinedSumOfStates MCRCMethod.
 * @param {string} name The name or xsi:type of the method.
 * @param {SumOfStates} sumOfStates The sum of states.
 */ /*
export class DefinedSumOfStates extends MCRCMethod {
    sumOfStates: SumOfStates;

    constructor(name: string, sumOfStates: SumOfStates) {
        super(name);
        this.sumOfStates = sumOfStates;
    }
    toString() {
        return `DefinedSumOfStates(${super.toString()}, ` +
            `sumOfStates(${this.sumOfStates.toString()}))`;
    }
}
*/ /**
 * A class for representing a reaction.
 */ parcelHelpers.export(exports, "Reaction", ()=>Reaction);
var _functionsJs = require("./functions.js");
var _classesJs = require("./classes.js");
var _xmlJs = require("./xml.js");
class ReactionMolecule extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes);
        this.molecule = molecule;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} pad The pad for an extra level of padding (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = this.toTag("molecule", padding1);
        return (0, _xmlJs.getTag)(s, tagName, undefined, undefined, undefined, padding, true);
    }
}
class Reactant extends ReactionMolecule {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes, molecule);
    }
}
class Product extends ReactionMolecule {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes, molecule);
    }
}
class TransitionState extends ReactionMolecule {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */ constructor(attributes, molecule){
        super(attributes, molecule);
    }
    /**
     * A convenience method to get the ref (the molecule ID) of the transition state.
     * @returns The ref of the transition state.
     */ getRef() {
        let s = this.attributes.get("ref");
        if (s == null) throw new Error('Attribute "ref" is undefined.');
        return s;
    }
}
class PreExponential extends (0, _classesJs.NumberWithAttributes) {
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class ActivationEnergy extends (0, _classesJs.NumberWithAttributes) {
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class TInfinity extends (0, _classesJs.NumberWithAttributes) {
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class NInfinity extends (0, _classesJs.NumberWithAttributes) {
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class Tunneling extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class MCRCMethod extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} name The name or xsi:type of the method.
     */ constructor(attributes, name){
        super(attributes);
        this.mCRCMethodName = name;
    }
    toString() {
        return `MCRCMethod(name(${this.mCRCMethodName}))`;
    }
}
class MesmerILT extends MCRCMethod {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */ constructor(attributes, preExponential, activationEnergy, tInfinity, nInfinity){
        super(attributes, "MesmerILT");
        this.preExponential = preExponential;
        this.activationEnergy = activationEnergy;
        this.tInfinity = tInfinity;
        this.nInfinity = nInfinity;
    }
    toString() {
        return `MesmerILT(${super.toString()}, ` + `preExponential(${this.preExponential}), ` + `activationEnergy(${this.activationEnergy}), ` + `TInfinity(${this.tInfinity}), ` + `nInfinity(${this.nInfinity}))`;
    }
    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, padding) {
        let padding1 = "";
        if (padding != undefined) padding1 = padding + "  ";
        let preExponential_xml = "";
        if (this.preExponential != undefined) preExponential_xml = this.preExponential.toXML("me.preExponential", padding1);
        let activationEnergy_xml = "";
        if (this.activationEnergy != undefined) activationEnergy_xml = this.activationEnergy.toXML("me.activationEnergy", padding1);
        let tInfinity_xml = "";
        if (this.tInfinity != undefined) tInfinity_xml = this.tInfinity.toXML("me.nInfinity", padding1);
        let nInfinity_xml = "";
        if (this.nInfinity != undefined) nInfinity_xml = this.nInfinity.toXML("me.nInfinity", padding1);
        return (0, _xmlJs.getTag)(preExponential_xml + activationEnergy_xml + tInfinity_xml + nInfinity_xml, tagName, this.attributes, undefined, undefined, padding, true);
    }
}
class ZhuNakamuraCrossing extends MCRCMethod {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} harmonicReactantDiabat_FC The harmonic reactant diabatic FC.
     * @param {number} harmonicReactantDiabat_XO The harmonic reactant diabatic XO.
     * @param {number} harmonicProductDiabat_DE The harmonic product diabatic DE.
     * @param {number} exponentialProductDiabat_A The exponential product diabatic A.
     * @param {number} exponentialProductDiabat_B The exponential product diabatic B.
     * @param {number} exponentialProductDiabat_DE The exponential product diabatic DE.
     */ constructor(attributes, harmonicReactantDiabat_FC, harmonicReactantDiabat_XO, harmonicProductDiabat_DE, exponentialProductDiabat_A, exponentialProductDiabat_B, exponentialProductDiabat_DE){
        super(attributes, "ZhuNakamuraCrossing");
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
    toString() {
        return `ZhuNakamuraCrossing(${super.toString()}, ` + `harmonicReactantDiabat_FC(${this.harmonicReactantDiabat_FC.toString()}), ` + `harmonicReactantDiabat_XO(${this.harmonicReactantDiabat_XO.toString()}), ` + `harmonicProductDiabat_DE(${this.harmonicProductDiabat_DE.toString()}), ` + `exponentialProductDiabat_A(${this.exponentialProductDiabat_A.toString()}), ` + `exponentialProductDiabat_B(${this.exponentialProductDiabat_B.toString()}), ` + `exponentialProductDiabat_DE(${this.exponentialProductDiabat_DE.toString()}))`;
    }
}
class Reaction extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant>} reactants The reactants in the reaction.
     * @param {Map<string, Product>} products The products of the reaction.
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {TransitionState | undefined} transitionState The transition state (optional).
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     */ constructor(attributes, id, reactants, products, mCRCMethod, transitionState, tunneling){
        super(attributes);
        this.id = id;
        this.reactants = reactants;
        this.products = products;
        this.mCRCMethod = mCRCMethod;
        this.transitionState = transitionState;
        this.tunneling = tunneling;
    }
    /**
     * Convert the product to a string.
     * @returns String representation of the product.
     */ toString() {
        let s = super.toString();
        return super.toString() + `id(${this.id}), ` + `reactants(${(0, _functionsJs.mapToString)(this.reactants)}), ` + `products(${(0, _functionsJs.mapToString)(this.products)}), ` + `mCRCMethod(${this.mCRCMethod?.toString()}), ` + `transitionState(${this.transitionState?.toString()}), ` + `tunneling(${this.tunneling?.toString()}))`;
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        return Array.from(this.reactants.values()).map((reactant)=>reactant.molecule.id).join(" + ");
    }
    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */ getReactantsEnergy() {
        return Array.from(this.reactants.values()).map((reactant)=>reactant.molecule.getEnergy()).reduce((a, b)=>a + b, 0);
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        return Array.from(this.products.values()).map((product)=>product.molecule.id).join(" + ");
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy() {
        return Array.from(this.products.values()).map((product)=>product.molecule.getEnergy()).reduce((a, b)=>a + b, 0);
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
    }
    /**
     * @param {string} tagName The tag name.
     * @param {string} pad The pad (Optional).
     * @param {number} level The level of padding (Optional).
     * @returns An XML representation.
     */ toXML(tagName, pad, level) {
        // Padding
        let padding0 = "";
        let padding1 = "";
        let padding2 = "";
        let padding3 = "";
        if (pad != undefined && level != undefined) {
            padding0 = pad.repeat(level);
            padding1 = padding0 + pad;
            padding2 = padding1 + pad;
            padding3 = padding2 + pad;
        }
        // Reactants
        let reactants_xml = "";
        this.reactants.forEach((reactant)=>{
            reactants_xml += reactant.toXML("reactant", pad, padding1);
        });
        // Products
        let products_xml = "";
        this.products.forEach((product)=>{
            products_xml += product.toXML("product", pad, padding1);
        });
        // Tunneling
        let tunneling_xml = "";
        if (this.tunneling != undefined) tunneling_xml = this.tunneling.toTag("me.tunneling", padding1);
        // TransitionState
        let transitionState_xml = "";
        if (this.transitionState != undefined) transitionState_xml = this.transitionState.toXML("transitionState", pad, padding1);
        // MCRCMethod
        let mCRCMethod_xml = "";
        if (this.mCRCMethod != undefined) {
            if (this.mCRCMethod instanceof MesmerILT) mCRCMethod_xml = this.mCRCMethod.toXML("mCRCMethod", padding1);
            else mCRCMethod_xml = this.mCRCMethod.toTag("mCRCMethod", padding1);
        }
        return (0, _xmlJs.getTag)(reactants_xml + products_xml + tunneling_xml + transitionState_xml + mCRCMethod_xml, tagName, this.attributes, undefined, undefined, padding0, true);
    }
}

},{"./functions.js":"dxSxr","./classes.js":"ikp7x","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hoJRr":[function(require,module,exports) {
/**
 * Draw a horizontal line and add labels.
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} strokeStyle The name of a style to use for the line.
 * @param {number} strokewidth The width of the line.
 * @param {number} x0 The start x-coordinate of the line.
 * @param {number} y0 The start y-coordinate of the line. Also used for an energy label.
 * @param {number} x1 The end x-coordinate of the line.
 * @param {number} y1 The end y-coordinate of the line.
 * @param {string} font The font to use.
 * @param {number} th The height of the text in pixels.
 * @param {string} label The label.
 * @param {string} energyString The energy.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawLevel", ()=>drawLevel);
/**
 * Draw a line (segment) on the canvas.
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} strokeStyle The name of a style to use for the line.
 * @param {Integer} x1 The start x-coordinate of the line.
 * @param {Integer} y1 The start y-coordinate of the line.
 * @param {Integer} x2 The end x-coordinate of the line.
 * @param {Integer} y2 The end y-coordinate of the line.
 */ parcelHelpers.export(exports, "drawLine", ()=>drawLine);
/**
 * Writes text to the canvas. (It is probably better to write all the labels in one go.)
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} text The text to write.
 * @param {string} font The font to use.
 * @param {string} colour The colour of the text.
 * @param {number} x The horizontal position of the text.
 * @param {number} y The vertical position of the text.
 */ parcelHelpers.export(exports, "writeText", ()=>writeText);
/**
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} text The text to get the height of.
 * @param {string} font The font to use.
 * @returns {number} The height of the text in pixels.
 */ parcelHelpers.export(exports, "getTextHeight", ()=>getTextHeight);
/**
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} text The text to get the width of.
 * @param {string} font The font to use.
 * @returns {number} The width of the text in pixels.
 */ parcelHelpers.export(exports, "getTextWidth", ()=>getTextWidth);
function drawLevel(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + (x1 - x0) / 2;
    writeText(ctx, energyString, font, strokeStyle, getTextStartX(ctx, energyString, font, x_centre), y1 + th);
    writeText(ctx, label, font, strokeStyle, getTextStartX(ctx, label, font, x_centre), y1 + 3 * th);
    drawLine(ctx, strokeStyle, strokewidth, x0, y0, x1, y1);
}
/**
 * @param {CanvasRenderingContext2D} ctx The context to use.
 * @param {string} text The text to get the start x-coordinate of.
 * @param {string} font The font to use.  
 * @param {number} x_centre The x-coordinate of the centre of the text.
 * @returns The x-coordinate of the start of the text.
 */ function getTextStartX(ctx, text, font, x_centre) {
    let tw = getTextWidth(ctx, text, font);
    return x_centre - tw / 2;
}
function drawLine(ctx, strokeStyle, strokewidth, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokewidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
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
function getTextHeight(ctx, text, font) {
    ctx.font = font;
    var fontMetric = ctx.measureText(text);
    return fontMetric.actualBoundingBoxAscent + fontMetric.actualBoundingBoxDescent;
}
function getTextWidth(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aksKl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for representing a Pressure and Temperature pair.
 */ parcelHelpers.export(exports, "PTpair", ()=>PTpair);
/**
 * A class for representing a bath gas reaction molecule.
 */ parcelHelpers.export(exports, "BathGas", ()=>BathGas);
/**
 * A class for representing the experiment conditions.
 */ parcelHelpers.export(exports, "Conditions", ()=>Conditions);
var _classesJs = require("./classes.js");
var _reactionJs = require("./reaction.js");
var _xmlJs = require("./xml.js");
class PTpair extends (0, _classesJs.Attributes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes);
        let p = attributes.get("P");
        if (p) this.P = parseFloat(p);
        else throw new Error("P is undefined");
        let t = attributes.get("T");
        if (t) this.T = parseFloat(t);
        else throw new Error("T is undefined");
    }
}
class BathGas extends (0, _reactionJs.ReactionMolecule) {
    constructor(attributes, molecule){
        super(attributes, molecule);
    }
}
class Conditions {
    /**
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */ constructor(bathGas, pTs){
        this.bathGas = bathGas;
        this.pTs = pTs;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return `Conditions(` + `bathGas(${this.bathGas.toString()}), ` + `pTs(${this.pTs.toString()}))`;
    }
    /**
     * @param padding The padding (optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = this.bathGas.toXML("bathGas", pad, padding1);
        this.pTs.forEach((pt)=>{
            s += pt.toTag("PTpair", padding1);
        });
        return (0, _xmlJs.getTag)(s, "conditions", undefined, undefined, undefined, padding, true);
    }
}

},{"./classes.js":"ikp7x","./reaction.js":"8grVN","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kQHfz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for measures of grain size.
 */ parcelHelpers.export(exports, "GrainSize", ()=>GrainSize);
/**
 * A class for model parameters.
 */ parcelHelpers.export(exports, "ModelParameters", ()=>ModelParameters);
var _classes = require("./classes");
var _xml = require("./xml");
class GrainSize extends (0, _classes.NumberWithAttributes) {
    /**
     * @param {string} units The units.
     */ constructor(attributes, value){
        super(attributes, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}
class ModelParameters {
    /**
     * @param {GrainSize} grainSize The grain size.
     * @param {number} energyAboveTheTopHill The energy above the top hill.
     */ constructor(grainSize, energyAboveTheTopHill){
        this.grainSize = grainSize;
        this.energyAboveTheTopHill = energyAboveTheTopHill;
    }
    toString() {
        return `ModelParameters(` + `grainSize(${this.grainSize.toString()}), ` + `energyAboveTheTopHill(${this.energyAboveTheTopHill.toString()}))`;
    }
    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding2 = "";
        if (pad != undefined && padding != undefined) padding2 = padding + pad;
        let s = this.grainSize.toXML("me:GrainSize", padding2);
        s += (0, _xml.getTag)(this.energyAboveTheTopHill.toString(), "me:EnergyAboveTheTopHill", undefined, undefined, undefined, padding2, false);
        return (0, _xml.getTag)(s, "me:modelParameters", undefined, undefined, undefined, padding, true);
    }
}

},{"./classes":"ikp7x","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Qx5gu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for the diagram energy offset.
 */ parcelHelpers.export(exports, "DiagramEnergyOffset", ()=>DiagramEnergyOffset);
/**
 * A class for the control.
 */ parcelHelpers.export(exports, "Control", ()=>Control);
var _classes = require("./classes");
var _html = require("./html");
var _xml = require("./xml");
class DiagramEnergyOffset extends (0, _classes.NumberWithAttributes) {
    /**
     * @param {Map<string, string>} attributes The attributes (ref refers to a particular reaction). 
     * @param {number} value The value.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class Control {
    constructor(testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset){
        this.testDOS = testDOS;
        this.printSpeciesProfile = printSpeciesProfile;
        this.testMicroRates = testMicroRates;
        this.testRateConstant = testRateConstant;
        this.printGrainDOS = printGrainDOS;
        this.printCellDOS = printCellDOS;
        this.printReactionOperatorColumnSums = printReactionOperatorColumnSums;
        this.printTunnellingCoefficients = printTunnellingCoefficients;
        this.printGrainkfE = printGrainkfE;
        this.printGrainBoltzmann = printGrainBoltzmann;
        this.printGrainkbE = printGrainkbE;
        this.eigenvalues = eigenvalues;
        this.hideInactive = hideInactive;
        this.diagramEnergyOffset = diagramEnergyOffset;
    }
    toString() {
        return `Control(` + `testDOS(${this.testDOS?.toString()}), ` + `printSpeciesProfile(${this.printSpeciesProfile?.toString()}), ` + `testMicroRates(${this.testMicroRates?.toString()}), ` + `testRateConstant(${this.testRateConstant?.toString()}), ` + `printGrainDOS(${this.printGrainDOS?.toString()}), ` + `printCellDOS(${this.printCellDOS?.toString()}), ` + `printReactionOperatorColumnSums(${this.printReactionOperatorColumnSums?.toString()}), ` + `printTunnellingCoefficients(${this.printTunnellingCoefficients?.toString()}), ` + `printGrainkfE(${this.printGrainkfE?.toString()}), ` + `printGrainBoltzmann(${this.printGrainBoltzmann?.toString()}), ` + `printGrainkbE(${this.printGrainkbE?.toString()}), ` + `eigenvalues(${this.eigenvalues?.toString()}), ` + `hideInactive(${this.hideInactive?.toString()}))`;
    }
    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1 = "";
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:testDOS") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printSpeciesProfile") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:testMicroRates") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:testRateConstant") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printGrainDOS") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printCellDOS") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printReactionOperatorColumnSums") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printTunnellingCoefficients") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printGrainkfE") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printGrainBoltzmann") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:printGrainkbE") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:eigenvalues") + "\n";
        s += padding1 + (0, _html.getSelfClosingTag)(null, "me:hideInactive");
        s += this.diagramEnergyOffset?.toXML("me:diagramEnergyOffset", padding1);
        return (0, _xml.getTag)(s, "control", undefined, undefined, null, padding, true);
    }
}

},{"./classes":"ikp7x","./html":"aLPSL","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["kWWpk","dPB9w"], "dPB9w", "parcelRequire8ad3")

//# sourceMappingURL=index.8b3c27a1.js.map
