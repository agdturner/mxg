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
})({"8AHG6":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "3bddbeb250584fd7";
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
/**
 * Set the rotation constants of a molecule when the rotation constants input value is changed.
 * @param input The input element. 
 */ parcelHelpers.export(exports, "setRotConst", ()=>setRotConst);
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
var _moleculeJs = require("./molecule.js");
var _reactionJs = require("./reaction.js");
var _htmlJs = require("./html.js");
var _canvasJs = require("./canvas.js");
var _conditionsJs = require("./conditions.js");
var _modelParametersJs = require("./modelParameters.js");
var _controlJs = require("./control.js");
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
 */ let molecules = new Map();
/**
 * For storing the maximum molecule energy in a reaction.
 */ let maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */ let minMoleculeEnergy = Infinity;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let reactions = new Map();
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
let moleculesDiv;
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
    console.log("Read and store " + moleculeList_s);
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
    if (!moleculeListTagNames.has((0, _moleculeJs.Molecule).tagName)) throw new Error('Expecting tags with "' + (0, _moleculeJs.Molecule).tagName + '" tagName but there are none!');
    let xml_molecules = xml_moleculeList.getElementsByTagName((0, _moleculeJs.Molecule).tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    // Process each molecule.
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf like this.
    for(let i = 0; i < xml_molecules.length; i++){
        // Set attributes.
        let attributes = (0, _xmlJs.getAttributes)(xml_molecules[i]);
        let moleculeTagNames = new Set();
        let cns = xml_molecules[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for(let j = 0; j < cns.length; j++){
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!moleculeTagNames.has(cn.nodeName)) moleculeTagNames.add(cn.nodeName);
            else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
            if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
        //console.log(cn.nodeName);
        }
        //});
        //console.log("moleculeTagNames:");
        //moleculeTagNames.forEach(x => console.log(x));
        // Init atomsNode.
        let atomsNode;
        // There can be an individual atom not in an atom array, or an attom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName((0, _moleculeJs.AtomArray).tagName);
        if (xml_atomArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.AtomArray).tagName + " but finding " + xml_atomArrays.length + "!");
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms = xml_atomArray.getElementsByTagName((0, _moleculeJs.Atom).tagName);
            if (xml_atoms.length < 2) throw new Error("Expecting 2 or more atoms in " + (0, _moleculeJs.AtomArray).tagName + ", but finding " + xml_atoms.length + "!");
            let atoms = [];
            for(let j = 0; j < xml_atoms.length; j++)atoms.push(new (0, _moleculeJs.Atom)((0, _xmlJs.getAttributes)(xml_atoms[j])));
            atomsNode = new (0, _moleculeJs.AtomArray)((0, _xmlJs.getAttributes)(xml_atomArray), atoms);
            moleculeTagNames.delete((0, _moleculeJs.AtomArray).tagName);
        } else {
            let xml_atoms = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Atom).tagName);
            if (xml_atoms.length == 1) atomsNode = new (0, _moleculeJs.Atom)((0, _xmlJs.getAttributes)(xml_atoms[0]));
            else if (xml_atoms.length > 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Atom).tagName + " but finding " + xml_atoms.length + ". Should these be in an " + (0, _moleculeJs.AtomArray).tagName + "?");
        }
        moleculeTagNames.delete((0, _moleculeJs.Atom).tagName);
        // Init bondsNode.
        let bondsNode;
        // There can be an individual bond not in a bond array, or a bond array.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName((0, _moleculeJs.BondArray).tagName);
        if (xml_bondArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.BondArray).tagName + " but finding " + xml_bondArrays.length + "!");
        if (xml_bondArrays.length == 1) {
            let xml_bondArray = xml_bondArrays[0];
            let xml_bonds = xml_bondArray.getElementsByTagName((0, _moleculeJs.Bond).tagName);
            // There may be only 1 bond in a BondArray.
            let bonds = [];
            for(let j = 0; j < xml_bonds.length; j++)bonds.push(new (0, _moleculeJs.Bond)((0, _xmlJs.getAttributes)(xml_bonds[j])));
            bondsNode = new (0, _moleculeJs.BondArray)((0, _xmlJs.getAttributes)(xml_bondArray), bonds);
            moleculeTagNames.delete((0, _moleculeJs.BondArray).tagName);
        } else {
            let xml_bonds = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Bond).tagName);
            if (xml_bonds.length == 1) bondsNode = new (0, _moleculeJs.Bond)((0, _xmlJs.getAttributes)(xml_bonds[0]));
            else if (xml_bonds.length > 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Bond).tagName + " but finding " + xml_bonds.length + ". Should these be in a " + (0, _moleculeJs.BondArray).tagName + "?");
        }
        moleculeTagNames.delete((0, _moleculeJs.Bond).tagName);
        // Init propertiesNode.
        let propertiesNode;
        // There can be an individual property not in a propertyList.
        let xml_PLs = xml_molecules[i].getElementsByTagName((0, _moleculeJs.PropertyList).tagName);
        if (xml_PLs.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.PropertyList).tagName + " but finding " + xml_PLs.length + "!");
        if (xml_PLs.length == 1) {
            let xml_PL = xml_PLs[0];
            let xml_Ps = xml_PL.getElementsByTagName((0, _moleculeJs.Property).tagName);
            if (xml_Ps.length < 2) throw new Error("Expecting 2 or more " + (0, _moleculeJs.Property).tagName + " in " + (0, _moleculeJs.PropertyList).tagName + ", but finding " + xml_Ps.length + "!");
            let properties = new Map();
            for(let j = 0; j < xml_Ps.length; j++){
                let property = getProperty(xml_Ps[j]);
                let dictRef = property.attributes.get("dictRef");
                properties.set(dictRef, property);
            }
            propertiesNode = new (0, _moleculeJs.PropertyList)((0, _xmlJs.getAttributes)(xml_PL), properties);
            moleculeTagNames.delete((0, _moleculeJs.PropertyList).tagName);
        } else {
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Property).tagName);
            if (xml_Ps.length > 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Property).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, _moleculeJs.PropertyList).tagName + "?");
            propertiesNode = getProperty(xml_Ps[0]);
        }
        moleculeTagNames.delete((0, _moleculeJs.Property).tagName);
        let els;
        // Read energyTransferModel
        moleculeTagNames.delete((0, _moleculeJs.EnergyTransferModel).tagName);
        let energyTransferModel = undefined;
        els = xml_molecules[i].getElementsByTagName((0, _moleculeJs.EnergyTransferModel).tagName);
        if (els != null) {
            if (els.length > 0) {
                if (els.length != 1) throw new Error("energyTransferModel length=" + els.length);
                let xml_deltaEDown = els[0].getElementsByTagName((0, _moleculeJs.DeltaEDown).tagName);
                if (xml_deltaEDown != null) {
                    let deltaEDowns = [];
                    for(let k = 0; k < xml_deltaEDown.length; k++){
                        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_deltaEDown[k])));
                        let deltaEDown = new (0, _moleculeJs.DeltaEDown)((0, _xmlJs.getAttributes)(xml_deltaEDown[k]), value);
                        deltaEDowns.push(deltaEDown);
                    }
                    energyTransferModel = new (0, _moleculeJs.EnergyTransferModel)((0, _xmlJs.getAttributes)(els[0]), deltaEDowns);
                }
            }
        }
        // Read DOSCMethod
        moleculeTagNames.delete((0, _moleculeJs.DOSCMethod).tagName);
        let dOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName((0, _moleculeJs.DOSCMethod).tagName);
        if (els != null) {
            let el = els[0];
            if (el != null) dOSCMethod = new (0, _moleculeJs.DOSCMethod)((0, _xmlJs.getAttributes)(el));
        }
        // Read ExtraDOSCMethod.
        moleculeTagNames.delete((0, _moleculeJs.ExtraDOSCMethod).tagName);
        let extraDOSCMethod = undefined;
        els = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ExtraDOSCMethod).tagName);
        if (els.length > 0) {
            if (els.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + els.length);
            // Read bondRef.
            let bondRefs = els[0].getElementsByTagName((0, _moleculeJs.BondRef).tagName);
            let bondRef;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                bondRef = new (0, _moleculeJs.BondRef)((0, _xmlJs.getAttributes)(bondRefs[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(bondRefs[0])));
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials = els[0].getElementsByTagName((0, _moleculeJs.HinderedRotorPotential).tagName);
            let hinderedRotorPotential;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                // Load PotentialPoints.
                let potentialPoints = [];
                let xml_potentialPoints = hinderedRotorPotentials[0].getElementsByTagName((0, _moleculeJs.PotentialPoint).tagName);
                for(let k = 0; k < xml_potentialPoints.length; k++)potentialPoints.push(new (0, _moleculeJs.PotentialPoint)((0, _xmlJs.getAttributes)(xml_potentialPoints[k])));
                hinderedRotorPotential = new (0, _moleculeJs.HinderedRotorPotential)((0, _xmlJs.getAttributes)(hinderedRotorPotentials[0]), potentialPoints);
            }
            // Read periodicities.
            let xml_periodicities = els[0].getElementsByTagName((0, _moleculeJs.Periodicity).tagName);
            let periodicity;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                periodicity = new (0, _moleculeJs.Periodicity)((0, _xmlJs.getAttributes)(xml_periodicities[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_periodicities[0]))));
            }
            extraDOSCMethod = new (0, _moleculeJs.ExtraDOSCMethod)((0, _xmlJs.getAttributes)(els[0]), bondRef, hinderedRotorPotential, periodicity);
        }
        // Read reservoirSize.
        moleculeTagNames.delete((0, _moleculeJs.ReservoirSize).tagName);
        let reservoirSize;
        els = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ReservoirSize).tagName);
        if (els.length > 0) {
            if (els.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + els.length);
            reservoirSize = new (0, _moleculeJs.ReservoirSize)((0, _xmlJs.getAttributes)(els[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(els[0]))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        let molecule = new (0, _moleculeJs.Molecule)(attributes, atomsNode, bondsNode, propertiesNode, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize);
        //console.log(molecule.toString());
        molecules.set(molecule.id, molecule);
    }
}
function addEventListenersToMolecules() {
    // Add event listeners to molecules.
    molecules.forEach(function(molecule, id) {
        // Energy input.
        let energyKey = id + "_energy";
        let energyInput = document.getElementById(energyKey);
        if (energyInput) energyInput.addEventListener("change", (event)=>{
            let eventTarget = event.target;
            let inputValue = eventTarget.value;
            //if (isNumeric(inputValue)) {
            molecule.setEnergy(parseFloat(inputValue));
            console.log("Set energy of " + id + " to " + inputValue + " kJ/mol");
        //} else {
        //    alert("Energy input for " + id + " is not a number");
        //    let inputElement = document.getElementById(energyKey) as HTMLInputElement;
        //    inputElement.value = molecule.getEnergy().toString();
        //    console.log("inputValue=" + inputValue);
        //    console.log("Type of inputValue: " + typeof inputValue);
        //}
        });
        // RotConsts input.
        let rotConstsKey = id + "_rotConsts";
        let rotConstsInput = document.getElementById(rotConstsKey);
        if (rotConstsInput) rotConstsInput.addEventListener("change", (event)=>{
            let eventTarget = event.target;
            let inputValue = eventTarget.value;
            let rotConsts = [];
            let values = inputValue.split(/\s+/);
            //let nRotConsts = molecule.getRotConsts()?.length ?? 0;
            //console.log("nRotConsts=" + nRotConsts);
            //if (values.length != nRotConsts) {
            //    alert("Expecting " + nRotConsts + " rotation constant values for " + id + " but finding " + values.length);
            // }
            values.forEach(function(value) {
                //if (!isNumeric(value)) {
                //    alert("A rotation constant for " + id + " is not a number");
                //}
                rotConsts.push(parseFloat(value));
            });
            molecule.setRotConsts(rotConsts);
            console.log("Set rotConsts of " + id + " to " + inputValue);
        });
    });
}
function getProperty(xml_property) {
    let attribs = (0, _xmlJs.getAttributes)(xml_property);
    let children = xml_property.children;
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
    if (nodeName == (0, _moleculeJs.PropertyScalar).tagName) {
        let value = parseFloat(textContent);
        return new (0, _moleculeJs.Property)(attribs, new (0, _moleculeJs.PropertyScalar)(nodeAttributes, value));
    } else if (nodeName == (0, _moleculeJs.PropertyArray).tagName) return new (0, _moleculeJs.Property)(attribs, new (0, _moleculeJs.PropertyArray)(nodeAttributes, (0, _utilJs.toNumberArray)(textContent.split(/\s+/)), " "));
    else if (nodeName == "matrix") throw new Error("Unexpected nodeName: " + nodeName);
    else throw new Error("Unexpected nodeName: " + nodeName);
}
//function reload() {
function loadXML() {
    let inputElement = document.createElement("input");
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
                            */ }
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
    displayMolecules();
    addEventListenersToMolecules();
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
    console.log((0, _conditionsJs.Conditions).tagName);
    let xml_conditions = (0, _xmlJs.getSingularElement)(xml, (0, _conditionsJs.Conditions).tagName);
    // Set conditions_title.
    conditions_title = document.getElementById("conditions_title");
    if (conditions_title != null) conditions_title.innerHTML = "Conditions";
    // BathGas
    let xml_bathGas = (0, _xmlJs.getFirstElement)(xml_conditions, (0, _conditionsJs.BathGas).tagName);
    let attributes = (0, _xmlJs.getAttributes)(xml_bathGas);
    let moleculeID = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGas));
    let bathGas = new (0, _conditionsJs.BathGas)(attributes, moleculeID, molecules);
    // PTs
    let xml_PTs = (0, _xmlJs.getSingularElement)(xml_conditions, "me:PTs");
    let xml_PTPairs = xml_PTs.getElementsByTagName((0, _conditionsJs.PTpair).tagName);
    // Process each PTpair.
    let pTs = [];
    for(let i = 0; i < xml_PTPairs.length; i++){
        // Add optional BathGas
        let xml_bathGass = xml_PTPairs[i].getElementsByTagName((0, _conditionsJs.BathGas).tagName);
        let pTBathGas;
        if (xml_bathGass.length > 0) {
            if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
            pTBathGas = new (0, _conditionsJs.BathGas)((0, _xmlJs.getAttributes)(xml_bathGass[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGass[0])), molecules);
            console.log("pTBathGas" + pTBathGas.toString());
        }
        // Add optional ExperimentRate
        let xml_experimentRates = xml_PTPairs[i].getElementsByTagName((0, _conditionsJs.ExperimentRate).tagName);
        let experimentRate;
        if (xml_experimentRates.length > 0) {
            if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
            experimentRate = new (0, _conditionsJs.ExperimentRate)((0, _xmlJs.getAttributes)(xml_experimentRates[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_experimentRates[0]))));
            console.log("experimentRate" + experimentRate.toString());
        }
        pTs.push(new (0, _conditionsJs.PTpair)((0, _xmlJs.getAttributes)(xml_PTPairs[i]), pTBathGas, experimentRate));
    //console.log(pTs[i].toString()); // For debugging.
    }
    conditions = new (0, _conditionsJs.Conditions)((0, _xmlJs.getAttributes)(xml_conditions), bathGas, new (0, _conditionsJs.PTs)((0, _xmlJs.getAttributes)(xml_PTs), pTs));
}
let modelParameters;
/**
 * Parses xml to initialise modelParameters.
 * @param {XMLDocument} xml The XML document.
 */ function initModelParameters(xml) {
    console.log((0, _modelParametersJs.ModelParameters).tagName);
    let xml_modelParameters = (0, _xmlJs.getSingularElement)(xml, (0, _modelParametersJs.ModelParameters).tagName);
    // Set modelParameters_title.
    modelParameters_title = document.getElementById("modelParameters_title");
    if (modelParameters_title != null) modelParameters_title.innerHTML = "Model Parameters";
    // GrainSize
    let xml_grainSize = (0, _xmlJs.getSingularElement)(xml_modelParameters, (0, _modelParametersJs.GrainSize).tagName);
    let attributes = (0, _xmlJs.getAttributes)(xml_grainSize);
    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_grainSize)));
    let grainSize = new (0, _modelParametersJs.GrainSize)(attributes, value);
    // EnergyAboveTheTopHill
    let xml_energyAboveTheTopHill = (0, _xmlJs.getSingularElement)(xml_modelParameters, (0, _modelParametersJs.EnergyAboveTheTopHill).tagName);
    let energyAboveTheTopHill = new (0, _modelParametersJs.EnergyAboveTheTopHill)((0, _xmlJs.getAttributes)(xml_energyAboveTheTopHill), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_energyAboveTheTopHill))));
    modelParameters = new (0, _modelParametersJs.ModelParameters)(grainSize, energyAboveTheTopHill);
}
let control;
/**
 * Parses xml to initialise control.
 * @param {XMLDocument} xml The XML document.
 */ function initControl(xml) {
    console.log((0, _controlJs.Control).tagName);
    let xml_control = (0, _xmlJs.getSingularElement)(xml, (0, _controlJs.Control).tagName);
    // Set control_title.
    let control_title = document.getElementById("control_title");
    if (control_title != null) control_title.innerHTML = "Control";
    // me:testDOS
    let xml_testDOS = xml_control.getElementsByTagName((0, _controlJs.TestDOS).tagName);
    let testDOS;
    if (xml_testDOS.length == 1) testDOS = new (0, _controlJs.TestDOS)();
    else if (xml_testDOS.length > 1) console.warn("testDOS.length=" + xml_testDOS.length);
    // me:printSpeciesProfile
    let xml_printSpeciesProfile = xml_control.getElementsByTagName((0, _controlJs.PrintSpeciesProfile).tagName);
    let printSpeciesProfile;
    if (xml_printSpeciesProfile.length == 1) printSpeciesProfile = new (0, _controlJs.PrintSpeciesProfile)();
    else if (xml_printSpeciesProfile.length > 1) console.warn("printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
    // me:testMicroRates
    let xml_testMicroRates = xml_control.getElementsByTagName((0, _controlJs.TestMicroRates).tagName);
    let testMicroRates;
    if (xml_testMicroRates.length == 1) testMicroRates = new (0, _controlJs.TestMicroRates)();
    else if (xml_testMicroRates.length > 1) console.warn("testMicroRates.length=" + xml_testMicroRates.length);
    // me:testRateConstant
    let xml_testRateConstant = xml_control.getElementsByTagName((0, _controlJs.TestRateConstant).tagName);
    let testRateConstant;
    if (xml_testRateConstant.length == 1) testRateConstant = new (0, _controlJs.TestRateConstant)();
    else if (xml_testRateConstant.length > 1) console.warn("testRateConstant.length=" + xml_testRateConstant.length);
    // me:printGrainDOS
    let xml_printGrainDOS = xml_control.getElementsByTagName((0, _controlJs.PrintGrainDOS).tagName);
    let printGrainDOS;
    if (xml_printGrainDOS.length == 1) printGrainDOS = new (0, _controlJs.PrintGrainDOS)();
    else if (xml_printGrainDOS.length > 1) console.warn("printGrainDOS.length=" + xml_printGrainDOS.length);
    // me:printCellDOS
    let xml_printCellDOS = xml_control.getElementsByTagName((0, _controlJs.PrintCellDOS).tagName);
    let printCellDOS;
    if (xml_printCellDOS.length == 1) printCellDOS = new (0, _controlJs.PrintCellDOS)();
    else if (xml_printCellDOS.length > 1) console.warn("printCellDOS.length=" + xml_printCellDOS.length);
    // me:printReactionOperatorColumnSums
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName((0, _controlJs.PrintReactionOperatorColumnSums).tagName);
    let printReactionOperatorColumnSums;
    if (xml_printReactionOperatorColumnSums.length == 1) printReactionOperatorColumnSums = new (0, _controlJs.PrintReactionOperatorColumnSums)();
    else if (xml_printReactionOperatorColumnSums.length > 1) console.warn("printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
    // me:printTunnellingCoefficients
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName((0, _controlJs.PrintTunnellingCoefficients).tagName);
    let printTunnellingCoefficients;
    if (xml_printTunnellingCoefficients.length == 1) printTunnellingCoefficients = new (0, _controlJs.PrintTunnellingCoefficients)();
    else if (xml_printTunnellingCoefficients.length > 1) console.warn("printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
    // me:printGrainkfE
    let xml_printGrainkfE = xml_control.getElementsByTagName((0, _controlJs.PrintGrainkfE).tagName);
    let printGrainkfE;
    if (xml_printGrainkfE.length == 1) printGrainkfE = new (0, _controlJs.PrintGrainkfE)();
    else if (xml_printGrainkfE.length > 1) console.warn("printGrainkfE.length=" + xml_printGrainkfE.length);
    // me:printGrainBoltzmann
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName((0, _controlJs.PrintGrainBoltzmann).tagName);
    let printGrainBoltzmann;
    if (xml_printGrainBoltzmann.length == 1) printGrainBoltzmann = new (0, _controlJs.PrintGrainBoltzmann)();
    else if (xml_printGrainBoltzmann.length > 1) console.warn("printGrainBoltzmann.length=" + xml_printGrainBoltzmann.length);
    // me:printGrainkbE
    let xml_printGrainkbE = xml_control.getElementsByTagName((0, _controlJs.PrintGrainkbE).tagName);
    let printGrainkbE;
    if (xml_printGrainkbE.length == 1) printGrainkbE = new (0, _controlJs.PrintGrainkbE)();
    else if (xml_printGrainkbE.length > 1) console.warn("printGrainkbE.length=" + xml_printGrainkbE.length);
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName((0, _controlJs.Eigenvalues).tagName);
    let eigenvalues;
    if (xml_eigenvalues.length == 1) eigenvalues = new (0, _controlJs.Eigenvalues)((0, _xmlJs.getAttributes)(xml_eigenvalues[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_eigenvalues[0]))));
    else console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    // me:hideInactive
    let xml_hideInactive = xml_control.getElementsByTagName((0, _controlJs.HideInactive).tagName);
    let hideInactive;
    if (xml_hideInactive.length == 1) hideInactive = new (0, _controlJs.HideInactive)();
    else console.warn("hideInactive.length=" + xml_hideInactive.length);
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName((0, _controlJs.DiagramEnergyOffset).tagName);
    let diagramEnergyOffset;
    if (xml_diagramEnergyOffset.length == 1) {
        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_diagramEnergyOffset[0])));
        diagramEnergyOffset = new (0, _controlJs.DiagramEnergyOffset)((0, _xmlJs.getAttributes)(xml_diagramEnergyOffset[0]), value);
    } else console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    control = new (0, _controlJs.Control)((0, _xmlJs.getAttributes)(xml_control), testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset);
}
/**
 * Parses xml to initialise reactions.
 * @param {XMLDocument} xml The XML document.
 */ function initReactions(xml) {
    let reactionList_s = "reactionList";
    console.log(reactionList_s);
    let xml_reactionList = (0, _xmlJs.getSingularElement)(xml, reactionList_s);
    let xml_reactions = xml_reactionList.getElementsByTagName((0, _reactionJs.Reaction).tagName);
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
            let reactants;
            let xml_reactants = xml_reactions[i].getElementsByTagName((0, _reactionJs.Reactant).tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            if (xml_reactants.length > 0) {
                if (xml_reactants.length < 2) {
                    let xml_molecule = (0, _xmlJs.getFirstElement)(xml_reactants[0], (0, _moleculeJs.Molecule).tagName);
                    let twa = new (0, _xmlJs.TagWithAttributes)((0, _xmlJs.getAttributes)(xml_molecule), (0, _moleculeJs.Molecule).tagName);
                    reactants = new (0, _reactionJs.Reactant)((0, _xmlJs.getAttributes)(xml_reactants[0]), twa, molecules);
                } else {
                    reactants = new Map();
                    for(let j = 0; j < xml_reactants.length; j++){
                        let xml_molecule = (0, _xmlJs.getFirstElement)(xml_reactants[j], (0, _moleculeJs.Molecule).tagName);
                        let twa = new (0, _xmlJs.TagWithAttributes)((0, _xmlJs.getAttributes)(xml_molecule), (0, _moleculeJs.Molecule).tagName);
                        let reactant = new (0, _reactionJs.Reactant)((0, _xmlJs.getAttributes)(xml_reactants[j]), twa, molecules);
                        reactants.set(reactant.getRef(), reactant);
                    }
                }
            }
            // Load products.
            let products;
            let xml_products = xml_reactions[i].getElementsByTagName((0, _reactionJs.Product).tagName);
            //console.log("xml_products.length=" + xml_products.length);
            if (xml_products.length > 0) {
                if (xml_products.length < 2) {
                    let xml_molecule = (0, _xmlJs.getFirstElement)(xml_products[0], (0, _moleculeJs.Molecule).tagName);
                    let twa = new (0, _xmlJs.TagWithAttributes)((0, _xmlJs.getAttributes)(xml_molecule), (0, _moleculeJs.Molecule).tagName);
                    products = new (0, _reactionJs.Product)((0, _xmlJs.getAttributes)(xml_products[0]), twa, molecules);
                } else {
                    products = new Map();
                    for(let j = 0; j < xml_products.length; j++){
                        let xml_molecule = (0, _xmlJs.getFirstElement)(xml_products[j], (0, _moleculeJs.Molecule).tagName);
                        let twa = new (0, _xmlJs.TagWithAttributes)((0, _xmlJs.getAttributes)(xml_molecule), (0, _moleculeJs.Molecule).tagName);
                        let product = new (0, _reactionJs.Product)((0, _xmlJs.getAttributes)(xml_products[j]), twa, molecules);
                        products.set(product.getRef(), product);
                    }
                }
            }
            // Load transition states.
            //console.log("Load  transition states...");
            let xml_transitionState = xml_reactions[i].getElementsByTagName((0, _reactionJs.TransitionState).tagName);
            let transitionStates;
            if (xml_transitionState.length > 0) {
                if (xml_transitionState.length < 2) {
                    let xml_molecule = xml_transitionState[0].getElementsByTagName((0, _moleculeJs.Molecule).tagName)[0];
                    let twa = new (0, _xmlJs.TagWithAttributes)((0, _xmlJs.getAttributes)(xml_molecule), (0, _moleculeJs.Molecule).tagName);
                    transitionStates = new (0, _reactionJs.TransitionState)((0, _xmlJs.getAttributes)(xml_transitionState[0]), twa, molecules);
                } else {
                    transitionStates = new Map();
                    for(let j = 0; j < xml_transitionState.length; j++){
                        let xml_molecule = xml_transitionState[j].getElementsByTagName((0, _moleculeJs.Molecule).tagName)[0];
                        let twa = new (0, _xmlJs.TagWithAttributes)((0, _xmlJs.getAttributes)(xml_molecule), (0, _moleculeJs.Molecule).tagName);
                        let transitionState = new (0, _reactionJs.TransitionState)((0, _xmlJs.getAttributes)(xml_transitionState[j]), twa, molecules);
                        transitionStates.set(transitionState.getRef(), transitionState);
                    }
                }
            }
            //console.log("transitionStates=" + transitionStates);
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName((0, _reactionJs.Tunneling).tagName);
            let tunneling;
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, _reactionJs.Tunneling).tagName + " but finding " + xml_tunneling.length + "!");
                tunneling = new (0, _reactionJs.Tunneling)((0, _xmlJs.getAttributes)(xml_tunneling[0]));
            }
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let mCRCMethod;
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName((0, _reactionJs.MCRCMethod).tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) throw new Error("Expecting 1 " + (0, _reactionJs.MCRCMethod).tagName + " but finding " + xml_MCRCMethod.length + "!");
                else {
                    let mCRCMethodAttributes = (0, _xmlJs.getAttributes)(xml_MCRCMethod[0]);
                    let name = mCRCMethodAttributes.get("name");
                    //console.log(MCRCMethod.tagName + " name=" + name);
                    if (name == undefined || name == (0, _reactionJs.MesmerILT).xsiType2) {
                        let type = mCRCMethodAttributes.get("xsi:type");
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        if (type != undefined) {
                            if (type == (0, _reactionJs.MesmerILT).xsiType || type == (0, _reactionJs.MesmerILT).xsiType2) {
                                let preExponential;
                                let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.PreExponential).tagName);
                                if (xml_preExponential != null) {
                                    if (xml_preExponential[0] != null) {
                                        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_preExponential[0])));
                                        preExponential = new (0, _reactionJs.PreExponential)((0, _xmlJs.getAttributes)(xml_preExponential[0]), value);
                                    }
                                }
                                //console.log("preExponential " + preExponential);
                                let activationEnergy;
                                let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.ActivationEnergy).tagName);
                                if (xml_activationEnergy != null) {
                                    if (xml_activationEnergy[0] != null) {
                                        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_activationEnergy[0])));
                                        activationEnergy = new (0, _reactionJs.ActivationEnergy)((0, _xmlJs.getAttributes)(xml_activationEnergy[0]), value);
                                    }
                                }
                                //console.log("activationEnergy " + activationEnergy);
                                let tInfinity;
                                let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.TInfinity).tagName);
                                if (xml_tInfinity != null) {
                                    if (xml_tInfinity[0] != null) {
                                        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_tInfinity[0])));
                                        tInfinity = new (0, _reactionJs.NInfinity)((0, _xmlJs.getAttributes)(xml_tInfinity[0]), value);
                                    }
                                }
                                //console.log("tInfinity " + tInfinity);
                                let nInfinity;
                                let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.NInfinity).tagName);
                                if (xml_nInfinity != null) {
                                    if (xml_nInfinity[0] != null) {
                                        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_nInfinity[0])));
                                        nInfinity = new (0, _reactionJs.NInfinity)((0, _xmlJs.getAttributes)(xml_nInfinity[0]), value);
                                    }
                                }
                                //console.log("nInfinity " + nInfinity);
                                mCRCMethod = new (0, _reactionJs.MesmerILT)(mCRCMethodAttributes, preExponential, activationEnergy, tInfinity, nInfinity);
                            }
                        }
                    } else mCRCMethod = new (0, _reactionJs.MCRCMethod)(mCRCMethodAttributes);
                }
            }
            // Load excessReactantConc
            let xml_excessReactantConc = xml_reactions[i].getElementsByTagName((0, _reactionJs.ExcessReactantConc).tagName);
            let excessReactantConc;
            if (xml_excessReactantConc.length > 0) {
                if (xml_excessReactantConc.length > 1) throw new Error("Expecting 1 " + (0, _reactionJs.ExcessReactantConc).tagName + " but finding " + xml_excessReactantConc.length + "!");
                let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_excessReactantConc[0])));
                excessReactantConc = new (0, _reactionJs.ExcessReactantConc)((0, _xmlJs.getAttributes)(xml_excessReactantConc[0]), value);
            }
            // Create reaction.
            let reaction = new (0, _reactionJs.Reaction)(attributes, reactionID, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc);
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
        // Get TransitionStates.
        let reactionTransitionStates = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.add(reactantsLabel);
            if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
            let energy = reaction.getReactantsEnergy();
            energyMin = Math.min(energyMin, energy);
            energyMax = Math.max(energyMax, energy);
            energies.set(reactantsLabel, energy);
            if (!orders.has(reactantsLabel)) {
                orders.set(reactantsLabel, i);
                i++;
            }
        }
        let productsLabel = reaction.getProductsLabel();
        if (productsLabel != undefined) {
            products.add(productsLabel);
            let energy = reaction.getProductsEnergy();
            energyMin = Math.min(energyMin, energy);
            energyMax = Math.max(energyMax, energy);
            energies.set(productsLabel, energy);
            if (orders.has(productsLabel)) {
                i--;
                let j = (0, _utilJs.get)(orders, productsLabel);
                // Move product to end and shift everything back.
                orders.forEach(function(value, key) {
                    if (value > j) orders.set(key, value - 1);
                });
                // Insert transition states.
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) reactionTransitionStates.forEach(function(ts, id) {
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    });
                    else {
                        let ts = reactionTransitionStates;
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    }
                    orders.set(productsLabel, i);
                    i++;
                }
            } else {
                if (reactionTransitionStates != undefined) {
                    if (reactionTransitionStates instanceof Map) reactionTransitionStates.forEach(function(ts, id) {
                        let tsn = ts.getRef();
                        transitionStates.add(tsn);
                        orders.set(tsn, i);
                        energy = ts.getMolecule().getEnergy();
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(tsn, energy);
                        i++;
                    });
                    else {
                        let ts = reactionTransitionStates;
                        let tsn = ts.getRef();
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
        let reactionTransitionStates = reaction.transitionStates;
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, _utilJs.get)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, _utilJs.get)(productsInXY, productsLabel);
        if (reactionTransitionStates != undefined) {
            if (reactionTransitionStates instanceof Map) reactionTransitionStates.forEach(function(ts, id) {
                let transitionState = ts;
                let transitionStateLabel = transitionState.getRef();
                let transitionStateInXY = (0, _utilJs.get)(transitionStatesInXY, transitionStateLabel);
                (0, _canvasJs.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, _utilJs.get)(transitionStatesOutXY, transitionStateLabel);
                (0, _canvasJs.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            });
            else {
                let transitionState = reactionTransitionStates;
                let transitionStateLabel = transitionState.getRef();
                let transitionStateInXY = (0, _utilJs.get)(transitionStatesInXY, transitionStateLabel);
                (0, _canvasJs.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, _utilJs.get)(transitionStatesOutXY, transitionStateLabel);
                (0, _canvasJs.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            }
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
 * Display molecules.
 */ function displayMolecules() {
    if (molecules.size == 0) return;
    // Prepare table headings.
    molecules.forEach(function(molecule, id) {
        let moleculeDiv = "";
        //console.log("id=" + id);
        //console.log("molecule=" + molecule);
        let energyNumber = molecule.getEnergy();
        let energy;
        if (energyNumber == null) energy = "";
        else energy = energyNumber.toString();
        //console.log("energy=" + energy);
        let rotationConstants = "";
        let rotConsts = molecule.getRotConsts();
        if (rotConsts != undefined) rotationConstants = (0, _utilJs.arrayToString)(rotConsts, " ");
        let vibrationFrequencies = "";
        let vibFreqs = molecule.getVibFreqs();
        if (vibFreqs != undefined) vibrationFrequencies = (0, _utilJs.arrayToString)(vibFreqs, " ");
        let energyInputDiv = (0, _htmlJs.getInput)("number", id + "_energy", (event)=>{
            if (event.target instanceof HTMLInputElement) setEnergy(event.target);
        }, energy, "Energy");
        let rotConstsDiv = (0, _htmlJs.getInput)("text", id + "_rotConst", (event)=>{
            if (event.target instanceof HTMLInputElement) setRotConst(event.target);
        }, rotationConstants, "Rotation Constants");
        let div = document.createElement("div");
        div.appendChild(energyInputDiv);
        div.appendChild(rotConstsDiv);
        //let moleculeDetailDiv = getCollapsibleDiv(energyInputDiv, id + "_details", "collapsible");
        //moleculeDetailDiv.appendChild(energyInputDiv);
        let moleculeDetailDiv = (0, _htmlJs.getCollapsibleDiv)(div, id + "_details", "collapsible");
        moleculeDetailDiv.appendChild(div);
        //moleculeDiv += moleculeDetailDiv.innerHTML;
        moleculesDiv = document.getElementById("moleculesList");
        if (moleculesDiv !== null) {
            let parentElement = document.getElementById("molecules");
            if (parentElement) parentElement.appendChild(moleculeDetailDiv);
        }
    /*
        moleculesDiv += getTR(getTD(id)
            + getTD(getInput("number", id + "_energy", "setEnergy(this)", energy))
            + getTD(rotationConstants, true)
            + getTD(vibrationFrequencies, true));
        */ });
    (0, _htmlJs.makeCollapsible)();
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
        let reactants = reaction.getReactantsLabel() || "";
        let products = reaction.getProductsLabel() || "";
        let transitionState = "";
        let preExponential = "";
        let activationEnergy = "";
        let tInfinity = "";
        let nInfinity = "";
        let tSs = reaction.transitionStates;
        //console.log("tSs=" + tSs);
        if (tSs != undefined) {
            if (tSs instanceof Map) // Join all names together.
            tSs.forEach(function(ts) {
                let name = ts.getRef();
                if (name != null) transitionState = name + " ";
            });
            else {
                let ts = tSs;
                let name = ts.getRef();
                if (name != null) transitionState = name;
            }
        }
        let mCRCMethod = reaction.getMCRCMethod();
        //console.log("mCRCMethod=" + mCRCMethod);
        //console.log("typeof mCRCMethod=" + typeof mCRCMethod);
        if (mCRCMethod != undefined) {
            if (mCRCMethod instanceof (0, _reactionJs.MesmerILT)) {
                let mp = mCRCMethod.getPreExponential();
                if (mp != undefined) preExponential = mp.value.toString() + " " + mp.attributes.get("units");
                let ae = mCRCMethod.getActivationEnergy();
                if (ae != undefined) activationEnergy = ae.value.toString() + " " + ae.attributes.get("units");
                let ti = mCRCMethod.getTInfinity();
                if (ti != undefined) tInfinity = ti.value.toString();
                let ni = mCRCMethod.getNInfinity();
                if (ni != undefined) nInfinity = ni.value.toString();
            } else {
                if (mCRCMethod.attributes.get("name") == "RRKM") ;
                else {
                    console.log("Unexpected mCRCMethod: " + mCRCMethod);
                    throw new Error("Unexpected mCRCMethod: " + mCRCMethod);
                }
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
    if (bathGas_element != null) bathGas_element.innerHTML = "Bath Gas " + conditions.getBathGas().value;
    let pTs_element = document.getElementById("PT_table");
    let th = [
        "P",
        "T"
    ];
    // If PTs contain BathGas
    let hasBathGas = conditions.getPTs().pTpairs.some((pair)=>{
        return pair.getBathGas() != undefined;
    });
    if (hasBathGas) th.push("BathGas");
    // Check if PTs contain ExperimentRate
    let hasExperimentRate = conditions.getPTs().pTpairs.some((pair)=>{
        return pair.getExperimentRate() != undefined;
    });
    if (hasExperimentRate) th.push("ExperimentRate");
    let table = (0, _htmlJs.getTH)(th);
    if (pTs_element != null) {
        conditions.getPTs().pTpairs.forEach(function(pTpair) {
            table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)(pTpair.getP().toString()) + (0, _htmlJs.getTD)(pTpair.getT().toString()));
            if (hasBathGas) table += (0, _htmlJs.getTD)(pTpair.getBathGas()?.toString() ?? "");
            if (hasExperimentRate) table += (0, _htmlJs.getTD)(pTpair.getExperimentRate()?.toString() ?? "");
        });
        pTs_element.innerHTML = table;
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
    table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("Grain Size") + (0, _htmlJs.getTD)(modelParameters.getGrainSize().value.toString()));
    table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)("Energy Above The Top Hill") + (0, _htmlJs.getTD)(modelParameters.getEnergyAboveTheTopHill().value.toString()));
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
    // TestDOS
    let testDOS = control.getTestDOS();
    if (testDOS != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.TestDOS).tagName) + (0, _htmlJs.getTD)(""));
    // PrintSpeciesProfile
    let printSpeciesProfile = control.getPrintSpeciesProfile();
    if (printSpeciesProfile != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintSpeciesProfile).tagName) + (0, _htmlJs.getTD)(""));
    // TestMicroRates
    let testMicroRates = control.getTestMicroRates();
    if (testMicroRates != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.TestMicroRates).tagName) + (0, _htmlJs.getTD)(""));
    // TestRateConstant
    let testRateConstant = control.getTestRateConstant();
    if (testRateConstant != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.TestRateConstant).tagName) + (0, _htmlJs.getTD)(""));
    // PrintGrainDOS
    let printGrainDOS = control.getPrintGrainDOS();
    if (printGrainDOS != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintGrainDOS).tagName) + (0, _htmlJs.getTD)(""));
    // PrintCellDOS
    let printCellDOS = control.getPrintCellDOS();
    if (printCellDOS != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintCellDOS).tagName) + (0, _htmlJs.getTD)(""));
    // PrintReactionOperatorColumnSums
    let printReactionOperatorColumnSums = control.getPrintReactionOperatorColumnSums();
    if (printReactionOperatorColumnSums != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintReactionOperatorColumnSums).tagName) + (0, _htmlJs.getTD)(""));
    // PrintTunnellingCoefficients
    let printTunnellingCoefficients = control.getPrintTunnellingCoefficients();
    if (printTunnellingCoefficients != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintTunnellingCoefficients).tagName) + (0, _htmlJs.getTD)(""));
    // PrintGrainkfE
    let printGrainkfE = control.getPrintGrainkfE();
    if (printGrainkfE != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintGrainkfE).tagName) + (0, _htmlJs.getTD)(""));
    // PrintGrainBoltzmann
    let printGrainBoltzmann = control.getPrintGrainBoltzmann();
    if (printGrainBoltzmann != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintGrainBoltzmann).tagName) + (0, _htmlJs.getTD)(""));
    // PrintGrainkbE
    let printGrainkbE = control.getPrintGrainkbE();
    if (printGrainkbE != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.PrintGrainkbE).tagName) + (0, _htmlJs.getTD)(""));
    // Eigenvalues
    let eigenvalues = control.getEigenvalues();
    if (eigenvalues != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.Eigenvalues).tagName) + (0, _htmlJs.getTD)(eigenvalues.value.toString()));
    // HideInactive
    let hideInactive = control.getHideInactive();
    if (hideInactive != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.HideInactive).tagName) + (0, _htmlJs.getTD)(""));
    // DiagramEnergyOffset
    let diagramEnergyOffset = control.getDiagramEnergyOffset();
    if (diagramEnergyOffset != undefined) table += (0, _htmlJs.getTR)((0, _htmlJs.getTD)((0, _controlJs.DiagramEnergyOffset).tagName) + (0, _htmlJs.getTD)(diagramEnergyOffset.value.toString()));
    // Set the table.
    if (control_table_element != null) control_table_element.innerHTML = table;
}
function setEnergy(input) {
    let id_energy = input.id;
    let moleculeID = id_energy.split("_")[0];
    let molecule = molecules.get(moleculeID);
    if (molecule) {
        let inputNumber = parseFloat(input.value);
        if (!isNaN(inputNumber)) {
            molecule.setEnergy(inputNumber);
            console.log("Energy of " + moleculeID + " set to " + inputNumber);
        } else {
            alert("Energy input for " + moleculeID + " is not a number");
            let inputElement = document.getElementById(id_energy);
            inputElement.value = molecule.getEnergy().toString();
        }
    //console.log("molecule=" + molecule);
    }
}
window.setEnergy = setEnergy;
function setRotConst(input) {
    let id_rotConst = input.id;
    let moleculeID = id_rotConst.split("_")[0];
    let molecule = molecules.get(moleculeID);
    if (molecule) {
        let inputString = input.value;
        let values = inputString.split(/\s+/);
        let rotConsts = molecule.getRotConsts();
        //console.log("rotConsts=" + rotConsts);
        if (rotConsts) {
            let nRotConsts = rotConsts.length;
            let success = true;
            values.forEach(function(value) {
                let inputNumber = parseFloat(value);
                if (!isNaN(inputNumber)) success = false;
                else console.log("value=" + value);
            });
            if (!success) {
                alert("A rotation constant for " + moleculeID + " is not a number, resetting...");
                let inputElement = document.getElementById(id_rotConst);
                inputElement.value = (0, _utilJs.arrayToString)(rotConsts, " ");
                return;
            }
            if (values.length == nRotConsts) {
                let rotConstsNew = inputString.split(" ").map(Number);
                molecule.setRotConsts(rotConstsNew);
                console.log("Rotation constants of " + moleculeID + " changed from: " + rotConsts + " to: " + rotConstsNew);
            //console.log("molecule=" + molecule);
            } else {
                alert("Expecting " + nRotConsts + " rotation constants for " + moleculeID + " but finding " + values.length + " resetting...");
                let inputElement = document.getElementById(id_rotConst);
                inputElement.value = (0, _utilJs.arrayToString)(rotConsts, " ");
            }
        }
    }
}
window.setRotConst = setRotConst;
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
        moleculeList += molecule.toXML(pad, padding2);
    //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = (0, _xmlJs.getTag)(moleculeList, "moleculeList", undefined, pad, true);
    // Create reactionList.
    level = 2;
    let reactionList = "";
    reactions.forEach(function(reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
    //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = (0, _xmlJs.getTag)(reactionList, "reactionList", undefined, pad, true);
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

},{"./util.js":"f0Rnl","./xml.js":"7znDa","./molecule.js":"ahQNx","./reaction.js":"8grVN","./html.js":"aLPSL","./canvas.js":"hoJRr","./conditions.js":"aksKl","./modelParameters.js":"kQHfz","./control.js":"Qx5gu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0Rnl":[function(require,module,exports) {
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
/**
 * For convertina a map to a string.
 * @param map The map to convert to a string.
 * @returns A string representation of all the entries in the map.
 */ parcelHelpers.export(exports, "mapToString", ()=>mapToString);
/**
 * For converting an array to a string.
 * @param {any[]} array The array to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */ parcelHelpers.export(exports, "arrayToString", ()=>arrayToString);
/**
 * For converting an array to a string.
 * @param {any[]} set The set to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */ parcelHelpers.export(exports, "setToString", ()=>setToString);
/**
 * For converting a string array to a number array.
 * @param {string[]} s The string to convert to a number array.
 * @returns A number array.
 */ parcelHelpers.export(exports, "toNumberArray", ()=>toNumberArray);
function get(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function rescale(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}
function mapToString(map) {
    if (map == null) return "";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(", ");
}
function arrayToString(array, delimiter) {
    if (delimiter == undefined) delimiter = ", ";
    return array.map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function setToString(set, delimiter) {
    if (delimiter == undefined) delimiter = ", ";
    return Array.from(set).map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function toNumberArray(s) {
    let r = [];
    for(let i = 0; i < s.length; i++)r.push(parseFloat(s[i]));
    return r;
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
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Get the attribute of an xml element.
 * @param xml The xml element to search in.
 * @param name The name of the attribute to search for.
 * @returns The value of the attribute.
 * @throws An error if the attribute is not found.
 */ parcelHelpers.export(exports, "getAttribute", ()=>getAttribute);
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
 * A class for a tag.
 */ parcelHelpers.export(exports, "Tag", ()=>Tag);
/**
 * A class for representing A Tag with attributes.
 * @param {Map<string, string>} attributes The attributes.
 */ parcelHelpers.export(exports, "TagWithAttributes", ()=>TagWithAttributes);
/**
 * A class for representing a TagWithAttributes with a string as a value.
 */ parcelHelpers.export(exports, "StringNode", ()=>StringNode);
/**
 * A class for representing a TagWithAttributes with a number as a value.
 */ parcelHelpers.export(exports, "NumberNode", ()=>NumberNode);
/**
 * A class for representing a TagWithAttributes with an array of numbers as a value.
 */ parcelHelpers.export(exports, "NumberArrayNode", ()=>NumberArrayNode);
/**
 * A class for representing attributes with attributes.
 */ parcelHelpers.export(exports, "NodeWithNodes", ()=>NodeWithNodes);
/**
 * Create and return a XML start tag. For multiple attributes, pass them in a map.
 * If there is only one, then pass the name and value as separate parameters.
 * @param tagName The tag name.
 * @param {Map<string, any>} attributes The attributes (optional).
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
 * @param {Map<string, any>} attributes The attributes (optional).
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
var _html = require("./html");
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
class Tag {
    /**
     * @param {string} tagName The tag name.
     */ constructor(tagName){
        this.tagName = tagName;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param {string | undefined} padding The padding (optional).
     * @returns A self closing tag.
     */ toXML(padding) {
        let s = (0, _html.getSelfClosingTag)(null, this.tagName);
        if (padding) return "\n" + padding + s;
        return s;
    }
}
class TagWithAttributes extends Tag {
    /**
     * @param attributes The attributes.
     */ constructor(attributes, tagName){
        super(tagName);
        this.attributes = attributes;
    }
    /**
     * @returns A string representation.
     */ toString() {
        let r = this.tagName + `(`;
        this.attributes.forEach((value, key)=>{
            r += `${key}(${value}), `;
        });
        return r;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * These are allowed and perhaps expected in MESMER XML format.
     * @param {string} padding The padding (Optional).
     * @returns An XML like representation.
     */ toXML(padding) {
        let s = "";
        if (padding != undefined) s += "\n" + padding;
        s += "<" + this.tagName;
        if (this.attributes) for (let [k, v] of this.attributes)s += " " + k + '="' + v.toString() + '"';
        return s + " />";
    }
}
class StringNode extends TagWithAttributes {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return getTag(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}
class NumberNode extends TagWithAttributes {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return getTag(this.value.toString().trim(), this.tagName, this.attributes, padding, false);
    }
}
class NumberArrayNode extends TagWithAttributes {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {number[]} values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, tagName, values, delimiter){
        super(attributes, tagName);
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
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return getTag(this.values.toString().replaceAll(",", this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
class NodeWithNodes extends TagWithAttributes {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     */ constructor(attributes, tagName){
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     */ addNode(node) {
        this.nodes.set(this.nodes.size, node);
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        this.nodes.forEach((v, k)=>{
            s += `, ${v.toString()}`;
        });
        return s + ")";
    }
    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1;
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = "";
        if (this.nodes.size > 0) {
            this.nodes.forEach((v)=>{
                if (v instanceof NodeWithNodes) s += v.toXML(pad, padding1);
                else if (v instanceof TagWithAttributes) s += v.toXML(padding1);
                else s += v.toXML(padding1);
            });
            return getTag(s, this.tagName, this.attributes, padding, true);
        } else {
            let s = (0, _html.getSelfClosingTag)(this.attributes, this.tagName);
            if (padding != undefined) return "\n" + padding + s;
            return s;
        }
    }
}
function getStartTag(tagName, attributes, padding) {
    let s = "";
    if (padding != undefined) s += "\n" + padding;
    s += "<" + tagName;
    if (attributes) for (let [k, v] of attributes)s += " " + k + '="' + v.toString() + '"';
    return s + ">";
}
function getEndTag(tagName, padding, padValue) {
    let s = "";
    if (padValue) {
        if (padding != undefined) s += "\n" + padding;
    }
    return s + "</" + tagName + ">";
}
function getTag(content, tagName, attributes, padding, padValue) {
    let startTag = getStartTag(tagName, attributes, padding);
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

},{"./html":"aLPSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aLPSL":[function(require,module,exports) {
/**
 * Create a heading.
 * @param {string} text The text.
 * @param {number} level The level of the heading e.g. 1 for h1.
 * @param {string | undefined} id The id of the div.
 * @param {string | undefined} _class The class of the div.
 * @returns {string} Heading element.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getHeading", ()=>getHeading);
/**
 * @param {string} text The text.
 * @param {string | undefined} id The id of the button.
 * @param {string | undefined} _class The class of the button.
 * @param {string | undefined} func The function called on a click.
 * @returns The button.
 */ parcelHelpers.export(exports, "getButton", ()=>getButton);
/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */ parcelHelpers.export(exports, "getTH", ()=>getTH);
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
 * Create a collapsible div.
 * @param content The content of the div.
 * @param id The id of the div.
 * @param className The class of the div.
 * @returns A collapsible div.
 */ parcelHelpers.export(exports, "getCollapsibleDiv", ()=>getCollapsibleDiv);
/**
 * Create a input.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change.
 * @param value The value of the input.
 * @param labelText The label text.
 * @returns An input HTML element.
 */ //export function getInput(type: string, id: string, func: (event: Event) => void, value: string, labelText?: string): HTMLInputElement {
parcelHelpers.export(exports, "getInput", ()=>getInput);
/**
 * Create a self closing tag.
 * @param {Map<string, string> | null} attributes The attributes.
 * @param {string} tagName The tag name.
 */ parcelHelpers.export(exports, "getSelfClosingTag", ()=>getSelfClosingTag);
/**
 * For making elements with the class "collapsible" collapsible.
 */ parcelHelpers.export(exports, "makeCollapsible", ()=>makeCollapsible);
function getHeading(text, level, id, _class) {
    let heading = "<h" + level;
    if (id) heading += ' id="' + id + '"';
    if (_class) heading += ' class="' + _class + '"';
    return heading + ">" + text + "</h" + level + ">";
}
function getButton(text, id, _class, func) {
    let button = "<button";
    if (id) button += ' id="' + id + '"';
    if (_class) button += ' class="' + _class + '"';
    if (func) button += ' onclick="' + func + '"';
    return button + ">" + text + "</button>";
}
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
function getCollapsibleDiv(content, buttonLabel, id, className) {
    let div = document.createElement("div");
    if (id) div.id = id;
    if (className) div.className = className;
    // Create a button.
    let button = document.createElement("button");
    button.className = "collapsible";
    if (buttonLabel) button.innerText = buttonLabel;
    else button.innerText = "Show/Hide Details";
    // Append the button and the content.
    div.appendChild(button);
    div.appendChild(content);
    makeCollapsible();
    return div;
}
function getInput(type, id, func, value, labelText) {
    let input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.onchange = func;
    input.value = value;
    let label = document.createElement("label");
    label.htmlFor = id;
    if (labelText) label.textContent = labelText + ": ";
    else label.textContent = "";
    let container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(input);
    //return input;
    return container;
}
function getSelfClosingTag(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}
function makeCollapsible() {
    var coll = document.getElementsByClassName("collapsible");
    for(var i = 0; i < coll.length; i++){
        // Remove existing event listener
        coll[i].removeEventListener("click", toggleCollapsible);
        // Add new event listener
        coll[i].addEventListener("click", toggleCollapsible);
    }
}
/**
 * For toggling the collapsible content.
 */ function toggleCollapsible() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") content.style.display = "none";
    else content.style.display = "block";
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
 * A class for representing an atomArray.
 */ parcelHelpers.export(exports, "AtomArray", ()=>AtomArray);
/**
 * A class for representing an atomic bond - a bond beteen two atoms.
 * @param {Map<string, string>} attributes The attributes.
 * @param {Atom} atomA One atom.
 * @param {Atom} atomB Another atom.
 * @param {string} order The order of the bond.
 */ parcelHelpers.export(exports, "Bond", ()=>Bond);
/**
 * A class for representing a bondArray.
 */ parcelHelpers.export(exports, "BondArray", ()=>BondArray);
/**
 * A class for representing a property scalar.
 */ parcelHelpers.export(exports, "PropertyScalar", ()=>PropertyScalar);
/**
 * A class for representing an property array.
 */ parcelHelpers.export(exports, "PropertyArray", ()=>PropertyArray);
/**
 * A class for representing a property.
 */ parcelHelpers.export(exports, "Property", ()=>Property);
/**
 * A class for representing a propertyArray.
 */ parcelHelpers.export(exports, "PropertyList", ()=>PropertyList);
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
 * A class for representing a bondRef.
 */ parcelHelpers.export(exports, "BondRef", ()=>BondRef);
/**
 * A class for representing a PotentialPoint.
 */ parcelHelpers.export(exports, "PotentialPoint", ()=>PotentialPoint);
/**
 * A class for representing a HinderedRotorPotential.
 */ parcelHelpers.export(exports, "HinderedRotorPotential", ()=>HinderedRotorPotential);
/**
 * A class for representing a Periodicity.
 */ parcelHelpers.export(exports, "Periodicity", ()=>Periodicity);
/**
 * A class for representing the extra DOSC method.
 */ parcelHelpers.export(exports, "ExtraDOSCMethod", ()=>ExtraDOSCMethod);
/**
 * A class for representing a reservoir size.
 */ parcelHelpers.export(exports, "ReservoirSize", ()=>ReservoirSize);
/**
 * A class for representing a molecule.
 */ parcelHelpers.export(exports, "Molecule", ()=>Molecule);
/**
 * A class for representing a MoleculeRef.
 */ parcelHelpers.export(exports, "MoleculeRef", ()=>MoleculeRef);
var _xmlJs = require("./xml.js");
class Atom extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "atom";
    }
    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */ constructor(attributes){
        super(attributes, Atom.tagName);
        let id = attributes.get("id");
        if (id == undefined) console.warn(Atom.tagName + " id attribute is undefined");
        let elementType = attributes.get("elementType");
        if (elementType == undefined) console.warn(Atom.tagName + " elementType attribute is undefined");
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
class AtomArray extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
    * The tag name.
    */ this.tagName = "atomArray";
    }
    /**
     * 
     * @param {Map<string, string>} attributes The attributes.
     * @param {Atom[]} atoms The atoms.
     */ constructor(attributes, atoms){
        super(attributes, AtomArray.tagName);
        atoms.forEach((atom)=>{
            this.nodes.set(this.nodes.size, atom);
        });
    }
}
class Bond extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bond";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, Bond.tagName);
    }
}
class BondArray extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bondArray";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Bond>} bonds A Map of bonds with keys as ids.
     */ constructor(attributes, bonds){
        super(attributes, BondArray.tagName);
        bonds.forEach((bond)=>{
            this.nodes.set(this.nodes.size, bond);
        });
    }
}
class PropertyScalar extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, PropertyScalar.tagName, value);
    }
}
class PropertyArray extends (0, _xmlJs.NumberArrayNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "array";
    }
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param {string} delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes, PropertyArray.tagName, values, delimiter);
    }
}
class Property extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "property";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PropertyScalar | PropertyArray} property The property.
     */ constructor(attributes, property){
        super(attributes, Property.tagName);
        this.nodes.set(0, property);
    }
    /**
     * @returns The property.
     */ getProperty() {
        return this.nodes.get(0);
    }
}
class PropertyList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "propertyList";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Map<string, Property>} properties A Map of properties with keys as dictRefs.
     */ constructor(attributes, properties){
        super(attributes, PropertyList.tagName);
        this.properties = properties;
        properties.forEach((property)=>{
            this.nodes.set(this.nodes.size, property);
        });
    }
}
class DeltaEDown extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown";
    }
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, DeltaEDown.tagName, value);
    }
}
class EnergyTransferModel extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyTransferModel";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown[]} deltaEDowns The DeltaEDowns.
     */ constructor(attributes, deltaEDowns){
        super(attributes, EnergyTransferModel.tagName);
        deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
}
class DOSCMethod extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DOSCMethod";
    }
    constructor(attributes){
        super(attributes, DOSCMethod.tagName);
    }
}
class BondRef extends (0, _xmlJs.StringNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:bondRef";
    }
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */ constructor(attributes, bondRef){
        super(attributes, BondRef.tagName, bondRef);
    }
}
class PotentialPoint extends (0, _xmlJs.TagWithAttributes) {
    static{
        this.tagName = "me:PotentialPoint";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, PotentialPoint.tagName);
    }
}
class HinderedRotorPotential extends (0, _xmlJs.NodeWithNodes) {
    static{
        this.tagName = "me:HinderedRotorPotential";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PotentialPoint[]} potentialPoints The PotentialPoints.
     */ constructor(attributes, potentialPoints){
        super(attributes, HinderedRotorPotential.tagName);
        potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
    }
}
class Periodicity extends (0, _xmlJs.NumberNode) {
    static{
        this.tagName = "me:periodicity";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Periodicity.tagName, value);
    }
}
class ExtraDOSCMethod extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:ExtraDOSCMethod";
    }
    /**
     * @param attributes The attributes.
     * @param {BondRef | undefined} bondRef The bondRef.
     * @param {HinderedRotorPotential | undefined} hinderedRotorPotential The HinderedRotorPotential.
     * @param {Periodicity | undefined} periodicity The Periodicity.
     */ constructor(attributes, bondRef, hinderedRotorPotential, periodicity){
        super(attributes, ExtraDOSCMethod.tagName);
        if (bondRef) this.nodes.set(this.nodes.size, bondRef);
        if (hinderedRotorPotential) this.nodes.set(this.nodes.size, hinderedRotorPotential);
        if (periodicity) this.nodes.set(this.nodes.size, periodicity);
    }
}
class ReservoirSize extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:reservoirSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ReservoirSize.tagName, value);
    }
}
class Molecule extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    static{
        /**
     * The energy dictRef.
     */ this.energyDictRef = "me:ZPE";
    }
    static{
        /**
     * The rotation constants dictRef.
     */ this.rotConstsDictRef = "me:rotConsts";
    }
    static{
        /**
     * The vibration frequencies dictRef.
     */ this.vibFreqsDictRef = "me:vibFreqs";
    }
    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes may include "description" and "active" (and posibly others), but these do not exist for all molecules.
     * @param {Atom | AtomArray | undefined} atoms The atoms.
     * @param {Bond | undefined} bonds The bonds.
     * @param {PropertyList | Property | undefined} properties The properties.
     * @param {EnergyTransferModel | undefined} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | undefined} dOSCMethod The method for calculating density of states.
     * @param {ExtraDOSCMethod | undefined} extraDOSCMethod The extra method for calculating density of states.
     * @param {ReservoirSize | undefined} reservoirSize The reservoir size.
     */ constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize){
        super(attributes, Molecule.tagName);
        /**
     * The index.
     */ this.index = new Map();
        let id = this.attributes.get("id");
        if (id == undefined) throw new Error("id is undefined");
        this.id = id;
        let i = 0;
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            if (atoms instanceof Atom) this.index.set(Atom.tagName, i);
            else this.index.set(AtomArray.tagName, i);
            i++;
        }
        // Bonds
        if (bonds) {
            this.nodes.set(i, bonds);
            this.index.set(BondArray.tagName, i);
            i++;
        }
        // Properties
        if (properties == undefined) throw new Error("properties is undefined");
        this.nodes.set(i, properties);
        this.index.set(PropertyList.tagName, i);
        i++;
        // EnergyTransferModel
        if (energyTransferModel) {
            this.nodes.set(i, energyTransferModel);
            this.index.set(EnergyTransferModel.tagName, i);
            i++;
        }
        // DOSCMethod
        if (dOSCMethod) {
            this.nodes.set(i, dOSCMethod);
            this.index.set(DOSCMethod.tagName, i);
        }
        // ExtraDOSCMethod
        if (extraDOSCMethod) {
            this.nodes.set(i, extraDOSCMethod);
            this.index.set(ExtraDOSCMethod.tagName, i);
        }
        // ReservoirSize
        if (reservoirSize) {
            this.nodes.set(i, reservoirSize);
            this.index.set(ReservoirSize.tagName, i);
        }
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
     * @returns The properties of the molecule.
     */ getProperties() {
        let i = this.index.get(PropertyList.tagName);
        if (i == undefined) {
            i = this.index.get(Property.tagName);
            if (i == undefined) return undefined;
            else return this.nodes.get(i);
        } else return this.nodes.get(i);
    }
    /**
     * Get a property scalar.
     * @param {string} dictRef The dictRef of the property.
     * @returns {number | undefined} The scalar property.
     */ getPropertyScalar(dictRef) {
        let properties = this.getProperties();
        if (properties == undefined) return undefined;
        else if (properties instanceof PropertyList) {
            let property = properties.properties.get(dictRef);
            if (property == undefined) return undefined;
            return property.getProperty().value;
        } else {
            let scalar = properties.getProperty();
            if (scalar == undefined) return undefined;
            return scalar.value;
        }
    }
    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set or defined.
     */ getEnergy() {
        let p = this.getPropertyScalar(Molecule.energyDictRef);
        if (p == undefined) return 0;
        return p;
    }
    /**
     * Set the scalar property.
     * @param dictRef The dictRef of the property.
     * @param value The value of the property.
     * @param units The units of the property (optional).
     */ setPropertyScalar(dictRef, value, units) {
        let properties = this.getProperties();
        if (properties == undefined) {
            this.nodes.set(this.nodes.size, this.createPropertyScalar(dictRef, value, units));
            this.index.set(Property.tagName, this.nodes.size);
        } else if (properties instanceof Property) {
            if (properties.getProperty().attributes.get(dictRef)) properties.getProperty().value = value;
            else {
                let plmap = new Map();
                plmap.set(dictRef, properties);
                plmap.set(dictRef, this.createPropertyScalar(dictRef, value, units));
                properties = new PropertyList(new Map(), plmap);
            }
        } else {
            let scalarProperty = properties.properties.get(dictRef);
            if (scalarProperty == undefined) properties.properties.set(dictRef, this.createPropertyScalar(dictRef, value, units));
            else scalarProperty.getProperty().value = value;
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     * @param value The value of the property.
     * @param units The units of the property.
     * @returns A scalar property.
     */ createPropertyScalar(dictRef, value, units) {
        let propertyAttributes = new Map();
        propertyAttributes.set("dictRef", dictRef);
        let attribs = new Map();
        if (units) attribs.set("units", units);
        return new Property(propertyAttributes, new PropertyScalar(attribs, value));
    }
    /**
      * Set the scalar property.
      * @param dictRef The dictRef of the property.
      * @param values The values of the property.
      * @param units The units of the property.
      */ setPropertyArray(dictRef, values, units) {
        let properties = this.getProperties();
        if (properties == undefined) {
            this.nodes.set(this.nodes.size, this.createPropertyArray(dictRef, values, units));
            this.index.set(Property.tagName, this.nodes.size);
        } else if (properties instanceof Property) {
            if (properties.getProperty().attributes.get(dictRef)) properties.getProperty().values = values;
            else {
                let plmap = new Map();
                plmap.set(dictRef, properties);
                plmap.set(dictRef, this.createPropertyArray(dictRef, values, units));
                properties = new PropertyList(new Map(), plmap);
            }
        } else {
            let scalarProperty = properties.properties.get(dictRef);
            if (scalarProperty == undefined) properties.properties.set(dictRef, this.createPropertyArray(dictRef, values, units));
            else scalarProperty.getProperty().values = values;
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     * @param values The values of the property.
     * @param units The units of the property.
     * @returns A scalar property.
     */ createPropertyArray(dictRef, values, units) {
        let propertyAttributes = new Map();
        propertyAttributes.set("dictRef", dictRef);
        let attribs = new Map();
        if (units) attribs.set("units", units);
        return new Property(propertyAttributes, new PropertyArray(attribs, values));
    }
    /**
     * Set the Energy of the molecule.
     * @param energy The energy of the molecule in kcal/mol.
     */ setEnergy(energy) {
        this.setPropertyScalar(Molecule.energyDictRef, energy);
    }
    /**
     * Set the RotationConstants of the molecule.
     * @param rotConsts The rotation constants of the molecule.
     */ setRotConsts(rotConsts) {
        this.setPropertyArray(Molecule.rotConstsDictRef, rotConsts);
    }
    /**
     * Get a property array.
     * @param dictRef The dictRef of the property.
     * @returns The array property.
     */ getPropertyArray(dictRef) {
        let properties = this.getProperties();
        if (properties == undefined) return undefined;
        else if (properties instanceof PropertyList) {
            let property = properties.properties.get(dictRef);
            if (property == undefined) return undefined;
            return property.getProperty().values;
        } else {
            if (properties.getProperty().tagName == dictRef) {
                let rotConsts = properties.getProperty();
                if (rotConsts == undefined) return undefined;
                return rotConsts.values;
            } else return undefined;
        }
    }
    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */ getRotConsts() {
        return this.getPropertyArray(Molecule.rotConstsDictRef);
    }
    /**
     * Get the vibration frequencies of the molecule.
     * @returns The vibration frequencies of the molecule.
     */ getVibFreqs() {
        return this.getPropertyArray(Molecule.vibFreqsDictRef);
    }
}
class MoleculeRef extends (0, _xmlJs.NodeWithNodes) {
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} tagName The tag name.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, tagName, molecule, molecules){
        super(attributes, tagName);
        this.nodes.set(0, molecule);
        this.molecules = molecules;
    }
    /**
     * A convenience method to get the molecule abbreviation.
     * @returns The molecule abbreviation.
     */ getMoleculeAbb() {
        return this.nodes.get(0);
    }
    /**
     * A convenience method to get the ref (the molecule ID) of the molecule.
     * @returns The ref of the molecule.
     */ getRef() {
        let s = this.getMoleculeAbb().attributes.get("ref");
        if (s == null) {
            console.log(this.getMoleculeAbb().toString());
            throw new Error('Attribute "ref" is undefined.');
        }
        return s;
    }
    /**
     * A convenience method to get the molecule.
     * @returns {Molecule} The molecule.
     * @throws An error if the molecule is not found.
     */ getMolecule() {
        let ref = this.getRef();
        let molecule = this.molecules.get(ref);
        if (molecule == null) throw new Error(`Molecule with ref ${ref} not found in molecules`);
        return molecule;
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8grVN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for representing a reactant - a molecule that reacts in a reaction.
 */ parcelHelpers.export(exports, "Reactant", ()=>Reactant);
/**
 * A class for representing a product - a molecule produced in a reaction.
 */ parcelHelpers.export(exports, "Product", ()=>Product);
/**
 * A class for representing a transition state - a molecule that is a transition state in a reaction.
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
*/ parcelHelpers.export(exports, "ExcessReactantConc", ()=>ExcessReactantConc);
/**
 * A class for representing a reaction.
 */ parcelHelpers.export(exports, "Reaction", ()=>Reaction);
var _moleculeJs = require("./molecule.js");
var _xmlJs = require("./xml.js");
class Reactant extends (0, _moleculeJs.MoleculeRef) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactant";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, molecule, molecules){
        super(attributes, Reactant.tagName, molecule, molecules);
    }
}
class Product extends (0, _moleculeJs.MoleculeRef) {
    static{
        /**
     * The tag name.
     */ this.tagName = "product";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, molecule, molecules){
        super(attributes, Product.tagName, molecule, molecules);
    }
}
class TransitionState extends (0, _moleculeJs.MoleculeRef) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:transitionState";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {TagWithAttributes} molecule The molecule (an abbreviated molecule).
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, molecule, molecules){
        super(attributes, TransitionState.tagName, molecule, molecules);
    }
}
class PreExponential extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:preExponential";
    }
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, PreExponential.tagName, value);
    }
}
class ActivationEnergy extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:activationEnergy";
    }
    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, ActivationEnergy.tagName, value);
    }
}
class TInfinity extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:TInfinity";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, TInfinity.tagName, value);
    }
}
class NInfinity extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:nInfinity";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, NInfinity.tagName, value);
    }
}
class Tunneling extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:tunneling";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, Tunneling.tagName);
    }
}
class MCRCMethod extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MCRCMethod";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, MCRCMethod.tagName);
    }
}
class MesmerILT extends MCRCMethod {
    static{
        /**
     * The xsiType.
     */ this.xsiType = "me:MesmerILT";
    }
    static{
        /**
     * The tag name.
     */ this.xsiType2 = "MesmerILT";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */ constructor(attributes, preExponential, activationEnergy, tInfinity, nInfinity){
        super(attributes);
        this.index = new Map();
        if (preExponential != undefined) {
            this.index.set(PreExponential.tagName, this.index.size);
            this.addNode(preExponential);
        }
        if (activationEnergy != undefined) {
            this.index.set(ActivationEnergy.tagName, this.index.size);
            this.addNode(activationEnergy);
        }
        if (tInfinity != undefined) {
            this.index.set(TInfinity.tagName, this.index.size);
            this.addNode(tInfinity);
        }
        if (nInfinity != undefined) {
            this.index.set(NInfinity.tagName, this.index.size);
            this.addNode(nInfinity);
        }
    }
    /**
     * @returns The pre-exponential factor or undefined if it does not exist.
     */ getPreExponential() {
        let i = this.index.get(PreExponential.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The activation energy or undefined if it does not exist.
     */ getActivationEnergy() {
        let i = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The TInfinity or undefined if it does not exist.
     */ getTInfinity() {
        let i = this.index.get(TInfinity.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The NInfinity or undefined if it does not exist.
     */ getNInfinity() {
        let i = this.index.get(NInfinity.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
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
        super(attributes);
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
}
class ExcessReactantConc extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, ExcessReactantConc.tagName, value);
    }
}
class Reaction extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reaction";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant> | Reactant | undefined} reactants The reactants in the reaction.
     * @param {Map<string, Product> | Product | undefined} products The products of the reaction.
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     * @param {Map<string, TransitionState> | TransitionState | undefined} transitionStates The transition states (optional).
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {ExcessReactantConc | undefined} excessReactantConc The excess reactant concentration (optional).
     */ constructor(attributes, id, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc){
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.reactants = reactants;
        //console.log("Construct reaction:");
        if (reactants instanceof Map) //console.log("Map of reactants");
        reactants.forEach((reactant)=>{
            this.addToIndex(Reactant.tagName, reactant);
            this.addNode(reactant);
        //console.log("Added reactant " + reactant);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        });
        else //console.log("Individual reactant");
        if (reactants != undefined) {
            //this.addToIndex(Reactant.tagName, reactants);
            this.index.set(Reactant.tagName, this.nodes.size);
            this.addNode(reactants);
        //console.log("Added reactant " + reactants);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        }
        this.products = products;
        if (products instanceof Map) //console.log("Map of products");
        products.forEach((product)=>{
            this.addToIndex(Product.tagName, product);
            this.addNode(product);
        //console.log("Added product " + product);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        });
        else if (products != undefined) {
            //console.log("Individual product");
            //this.addToIndex(Product.tagName, products);
            this.index.set(Product.tagName, this.nodes.size);
            this.addNode(products);
        //console.log("Added product " + products);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        }
        if (tunneling) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        this.transitionStates = transitionStates;
        if (transitionStates instanceof Map) //console.log("Map of transition states");
        transitionStates.forEach((transitionState)=>{
            this.addToIndex(TransitionState.tagName, transitionState);
            this.addNode(transitionState);
        //console.log("Added transition state " + transitionState);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        });
        else if (transitionStates != undefined) {
            //console.log("Individual transition state");
            //this.addToIndex(TransitionState.tagName, transitionStates);
            this.index.set(TransitionState.tagName, this.nodes.size);
            this.addNode(transitionStates);
        //console.log("Added transition state " + transitionStates);
        //console.log("index.size: " + this.index.size);
        //console.log("nodes.size: " + this.nodes.size);
        }
        if (mCRCMethod != undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
    }
    /**
     * Add a node to the index.
     * @returns 0 or 1 depeding on if the index has a new entry.
     */ addToIndex(tagName, moleculeRef) {
        let value0 = this.index.get(tagName);
        if (value0 == undefined) this.index.set(tagName, this.nodes.size);
        else if (value0 instanceof Map) value0.set(moleculeRef.getRef(), this.nodes.size);
        else {
            let map = new Map();
            map.set(this.nodes.get(value0).getRef(), value0);
            map.set(moleculeRef.getRef(), this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The id of the reaction.
     */ getID() {
        return this.attributes.get("id");
    }
    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */ getMCRCMethod() {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The tunneling node or undefined if it does not exist.
     */ getTunneling() {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */ getExcessReactantConc() {
        let i = this.index.get(ExcessReactantConc.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        if (this.reactants == undefined) return undefined;
        else if (this.reactants instanceof Map) return Array.from(this.reactants.keys()).join(" + ");
        else return this.reactants.getRef();
    }
    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */ getReactantsEnergy() {
        if (this.reactants instanceof Map) return Array.from(this.reactants.values()).map((reactant)=>reactant.getMolecule().getEnergy()).reduce((a, b)=>a + b, 0);
        return 0;
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        if (this.products == undefined) return undefined;
        else if (this.products instanceof Map) return Array.from(this.products.keys()).join(" + ");
        else return this.products.getRef();
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy() {
        if (this.products instanceof Map) return Array.from(this.products.values()).map((product)=>product.getMolecule().getEnergy()).reduce((a, b)=>a + b, 0);
        return 0;
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
    }
}

},{"./molecule.js":"ahQNx","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hoJRr":[function(require,module,exports) {
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
 * A class for representing a bath gas reaction molecule.
 */ parcelHelpers.export(exports, "BathGas", ()=>BathGas);
/**
 * A class for representing an experiment rate.
 */ parcelHelpers.export(exports, "ExperimentRate", ()=>ExperimentRate);
/**
 * A class for representing a Pressure and Temperature pair.
 */ parcelHelpers.export(exports, "PTpair", ()=>PTpair);
/**
 * A class for representing a set of Pressure and Temperature pairs.
 */ parcelHelpers.export(exports, "PTs", ()=>PTs);
/**
 * A class for representing the experiment conditions.
 */ parcelHelpers.export(exports, "Conditions", ()=>Conditions);
var _xmlJs = require("./xml.js");
class BathGas extends (0, _xmlJs.StringNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:bathGas";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} moleculeID The moleculeID.
     * @param {Map<string, Molecule>} molecules The molecules.
     */ constructor(attributes, moleculeID, molecules){
        super(attributes, BathGas.tagName, moleculeID);
        this.molecules = molecules;
    }
    getMolecule() {
        return this.molecules.get(this.value);
    }
}
class ExperimentRate extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentRate";
    }
    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value. 
     */ constructor(attributes, value){
        super(attributes, ExperimentRate.tagName, value);
    }
}
class PTpair extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {BathGas | undefined} bathGas The bath gas.
     * @param {ExperimentRate | undefined} experimentRate The experiment rate.
     */ constructor(attributes, bathGas, experimentRate){
        super(attributes, PTpair.tagName);
        this.index = new Map();
        if (bathGas) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate) {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        let p = this.attributes.get("P");
        if (p) return parseFloat(p);
        else throw new Error("P is undefined");
    }
    /**
     * Set The Pressure
     */ setP(p) {
        this.attributes.set("P", p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        let t = this.attributes.get("T");
        if (t) return parseFloat(t);
        else throw new Error("T is undefined");
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        this.attributes.set("T", t.toString());
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @returns The experiment rate.
     */ getExperimentRate() {
        let i = this.index.get(ExperimentRate.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
}
class PTs extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTs";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PTpair[]} pTpairs The PT pairs.
     */ constructor(attributes, pTpairs){
        super(attributes, PTs.tagName);
        pTpairs.forEach((pTpair)=>{
            this.addNode(pTpair);
        });
        this.pTpairs = pTpairs;
    }
}
class Conditions extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:conditions";
    }
    /**
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */ constructor(attributes, bathGas, pTs){
        super(attributes, Conditions.tagName);
        this.addNode(bathGas);
        this.addNode(pTs);
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        return this.nodes.get(0);
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */ getPTs() {
        return this.nodes.get(1);
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kQHfz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for measures of grain size.
 */ parcelHelpers.export(exports, "GrainSize", ()=>GrainSize);
/**
 * A class for measures of grain size.
 */ parcelHelpers.export(exports, "EnergyAboveTheTopHill", ()=>EnergyAboveTheTopHill);
/**
 * A class for model parameters.
 */ parcelHelpers.export(exports, "ModelParameters", ()=>ModelParameters);
var _xmlJs = require("./xml.js");
class GrainSize extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:grainSize";
    }
    /**
     * @param {string} value The value.
     */ constructor(attributes, value){
        super(attributes, GrainSize.tagName, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}
class EnergyAboveTheTopHill extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyAboveTheTopHill";
    }
    /**
     * @param {string} value The value.
     */ constructor(attributes, value){
        super(attributes, EnergyAboveTheTopHill.tagName, value);
    }
}
class ModelParameters extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:modelParameters";
    }
    constructor(grainSize, energyAboveTheTopHill){
        super(new Map(), ModelParameters.tagName);
        this.addNode(grainSize);
        this.addNode(energyAboveTheTopHill);
    }
    /**
     * @returns The grain size.
     */ getGrainSize() {
        return this.nodes.get(0);
    }
    /**
     * @returns The energy above the top hill.
     */ getEnergyAboveTheTopHill() {
        return this.nodes.get(1);
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Qx5gu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for me:testDOS.
 */ parcelHelpers.export(exports, "TestDOS", ()=>TestDOS);
/**
 * A class for me:printSpeciesProfile.
 */ parcelHelpers.export(exports, "PrintSpeciesProfile", ()=>PrintSpeciesProfile);
/**
 * A class for me:testMicroRates.
 */ parcelHelpers.export(exports, "TestMicroRates", ()=>TestMicroRates);
/**
 * A class for me:testRateConstant.
 */ parcelHelpers.export(exports, "TestRateConstant", ()=>TestRateConstant);
/**
 * A class for me:printGrainDOS.
 */ parcelHelpers.export(exports, "PrintGrainDOS", ()=>PrintGrainDOS);
/**
 * A class for me:printCellDOS.
 */ parcelHelpers.export(exports, "PrintCellDOS", ()=>PrintCellDOS);
/**
 * A class for me:printReactionOperatorColumnSums.
 */ parcelHelpers.export(exports, "PrintReactionOperatorColumnSums", ()=>PrintReactionOperatorColumnSums);
/**
 * A class for me:printTunnellingCoefficients.
 */ parcelHelpers.export(exports, "PrintTunnellingCoefficients", ()=>PrintTunnellingCoefficients);
/**
 * A class for me:printGrainkfE.
 */ parcelHelpers.export(exports, "PrintGrainkfE", ()=>PrintGrainkfE);
/**
 * A class for me:printGrainBoltzmann.
 */ parcelHelpers.export(exports, "PrintGrainBoltzmann", ()=>PrintGrainBoltzmann);
/**
 * A class for me:printGrainkbE.
 */ parcelHelpers.export(exports, "PrintGrainkbE", ()=>PrintGrainkbE);
/**
 * A class for me:eigenvalues.
 */ parcelHelpers.export(exports, "Eigenvalues", ()=>Eigenvalues);
/**
 * A class for me:hideInactive.
 */ parcelHelpers.export(exports, "HideInactive", ()=>HideInactive);
/**
 * A class for me:diagramEnergyOffset.
 */ parcelHelpers.export(exports, "DiagramEnergyOffset", ()=>DiagramEnergyOffset);
/**
 * A class for the control.
 */ parcelHelpers.export(exports, "Control", ()=>Control);
var _xml = require("./xml");
class TestDOS extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testDOS";
    }
    constructor(){
        super(TestDOS.tagName);
    }
}
class PrintSpeciesProfile extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printSpeciesProfile";
    }
    constructor(){
        super(PrintSpeciesProfile.tagName);
    }
}
class TestMicroRates extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testMicroRates";
    }
    constructor(){
        super(TestMicroRates.tagName);
    }
}
class TestRateConstant extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testRateConstant";
    }
    constructor(){
        super(TestRateConstant.tagName);
    }
}
class PrintGrainDOS extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainDOS";
    }
    constructor(){
        super(PrintGrainDOS.tagName);
    }
}
class PrintCellDOS extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printCellDOS";
    }
    constructor(){
        super(PrintCellDOS.tagName);
    }
}
class PrintReactionOperatorColumnSums extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printReactionOperatorColumnSums";
    }
    constructor(){
        super(PrintReactionOperatorColumnSums.tagName);
    }
}
class PrintTunnellingCoefficients extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printTunnellingCoefficients";
    }
    constructor(){
        super(PrintTunnellingCoefficients.tagName);
    }
}
class PrintGrainkfE extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainkfE";
    }
    constructor(){
        super(PrintGrainkfE.tagName);
    }
}
class PrintGrainBoltzmann extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainBoltzmann";
    }
    constructor(){
        super(PrintGrainBoltzmann.tagName);
    }
}
class PrintGrainkbE extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainkbE";
    }
    constructor(){
        super(PrintGrainkbE.tagName);
    }
}
class Eigenvalues extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:eigenvalues";
    }
    constructor(attributes, value){
        super(attributes, Eigenvalues.tagName, value);
    }
}
class HideInactive extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:hideInactive";
    }
    constructor(){
        super(HideInactive.tagName);
    }
}
class DiagramEnergyOffset extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:diagramEnergyOffset";
    }
    constructor(attributes, value){
        super(attributes, DiagramEnergyOffset.tagName, value);
    }
}
class Control extends (0, _xml.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:control";
    }
    /**
     * @param attributes The attributes.
     * @param testDOS The testDOS.
     * @param printSpeciesProfile The printSpeciesProfile.
     * @param testMicroRates The testMicroRates.
     * @param testRateConstant T
     * @param printGrainDOS The printGrainDOS.
     * @param printCellDOS The printCellDOS.
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     * @param printGrainkfE The printGrainkfE.
     * @param printGrainBoltzmann The printGrainBoltzmann.
     * @param printGrainkbE The printGrainkbE.
     * @param eigenvalues The eigenvalues.
     * @param hideInactive The hideInactive.
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */ constructor(attributes, testDOS, printSpeciesProfile, testMicroRates, testRateConstant, printGrainDOS, printCellDOS, printReactionOperatorColumnSums, printTunnellingCoefficients, printGrainkfE, printGrainBoltzmann, printGrainkbE, eigenvalues, hideInactive, diagramEnergyOffset){
        super(attributes, Control.tagName);
        this.index = new Map();
        if (testDOS != undefined) {
            this.addNode(testDOS);
            this.index.set(TestDOS.tagName, this.index.size);
        }
        if (printSpeciesProfile != undefined) {
            this.addNode(printSpeciesProfile);
            this.index.set(PrintSpeciesProfile.tagName, this.index.size);
        }
        if (testMicroRates != undefined) {
            this.addNode(testMicroRates);
            this.index.set(TestMicroRates.tagName, this.index.size);
        }
        if (testRateConstant != undefined) {
            this.addNode(testRateConstant);
            this.index.set(TestRateConstant.tagName, this.index.size);
        }
        if (printGrainDOS != undefined) {
            this.addNode(printGrainDOS);
            this.index.set(PrintGrainDOS.tagName, this.index.size);
        }
        if (printCellDOS != undefined) {
            this.addNode(printCellDOS);
            this.index.set(PrintCellDOS.tagName, this.index.size);
        }
        if (printReactionOperatorColumnSums != undefined) {
            this.addNode(printReactionOperatorColumnSums);
            this.index.set(PrintReactionOperatorColumnSums.tagName, this.index.size);
        }
        if (printTunnellingCoefficients != undefined) {
            this.addNode(printTunnellingCoefficients);
            this.index.set(PrintTunnellingCoefficients.tagName, this.index.size);
        }
        if (printGrainkfE != undefined) {
            this.addNode(printGrainkfE);
            this.index.set(PrintGrainkfE.tagName, this.index.size);
        }
        if (printGrainBoltzmann != undefined) {
            this.addNode(printGrainBoltzmann);
            this.index.set(PrintGrainBoltzmann.tagName, this.index.size);
        }
        if (printGrainkbE != undefined) {
            this.addNode(printGrainkbE);
            this.index.set(PrintGrainkbE.tagName, this.index.size);
        }
        if (eigenvalues != undefined) {
            this.addNode(eigenvalues);
            this.index.set(Eigenvalues.tagName, this.index.size);
        }
        if (hideInactive != undefined) {
            this.addNode(hideInactive);
            this.index.set(HideInactive.tagName, this.index.size);
        }
        if (diagramEnergyOffset != undefined) {
            this.addNode(diagramEnergyOffset);
            this.index.set(DiagramEnergyOffset.tagName, this.index.size);
        }
    }
    getTestDOS() {
        const index = this.index.get(TestDOS.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintSpeciesProfile() {
        const index = this.index.get(PrintSpeciesProfile.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getTestMicroRates() {
        const index = this.index.get(TestMicroRates.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getTestRateConstant() {
        const index = this.index.get(TestRateConstant.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainDOS() {
        const index = this.index.get(PrintGrainDOS.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintCellDOS() {
        const index = this.index.get(PrintCellDOS.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintReactionOperatorColumnSums() {
        const index = this.index.get(PrintReactionOperatorColumnSums.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintTunnellingCoefficients() {
        const index = this.index.get(PrintTunnellingCoefficients.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainkfE() {
        const index = this.index.get(PrintGrainkfE.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainBoltzmann() {
        const index = this.index.get(PrintGrainBoltzmann.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getPrintGrainkbE() {
        const index = this.index.get(PrintGrainkbE.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getEigenvalues() {
        const index = this.index.get(Eigenvalues.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getHideInactive() {
        const index = this.index.get(HideInactive.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
    getDiagramEnergyOffset() {
        const index = this.index.get(DiagramEnergyOffset.tagName) ?? -1;
        if (index !== -1) return this.nodes.get(index);
        return undefined;
    }
}

},{"./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8AHG6","dPB9w"], "dPB9w", "parcelRequire1c89")

//# sourceMappingURL=index.50584fd7.js.map
