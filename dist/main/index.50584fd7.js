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
//import * as $3Dmol from '3dmol';
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Set a molecule property array when the input value is changed.
 * @param dictRef The dictionary reference of the property.
 * @param input The input element.
 */ parcelHelpers.export(exports, "setNumberArrayNode", ()=>setNumberArrayNode);
/**
 * Set a molecule number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */ parcelHelpers.export(exports, "setNumberNode", ()=>setNumberNode);
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
var _moleculeJs = require("./molecule.js");
var _reactionJs = require("./reaction.js");
var _htmlJs = require("./html.js");
var _canvasJs = require("./canvas.js");
var _conditionsJs = require("./conditions.js");
var _modelParametersJs = require("./modelParameters.js");
var _controlJs = require("./control.js");
var _mesmerJs = require("./mesmer.js");
/**
 * MXG.
 */ let mxg_url = "https://github.com/agdturner/mxg-pwa";
let mxg_a = document.createElement("a");
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;
/**
 * MESMER.
 */ let mesmer_url = "https://sourceforge.net/projects/mesmer/";
let memser_a = document.createElement("a");
memser_a.href = mesmer_url;
memser_a.textContent = mesmer_url;
/**
 * The font sizes for different levels of the GUI.
 */ let fontSize1 = "1.5em";
let fontSize2 = "1.25em";
let fontSize3 = "1.0em";
let fontSize4 = "0.75em";
/**
 * Margins for spacing GUI components.
 */ //let margin0: string = "0px";
let margin1 = "1px";
let margin2 = "2px";
let margin3 = "3px";
let margin5 = "5px";
let margin25 = "25px";
let margin50 = "50px";
let margin75 = "75px";
let margin100 = "100px";
let margin125 = "125px";
let level0 = {
    marginTop: margin1,
    marginBottom: margin1
};
let level1 = {
    marginLeft: margin25,
    marginTop: margin1,
    marginBottom: margin1
};
let level2 = {
    marginLeft: margin50,
    marginTop: margin1,
    marginBottom: margin1
};
let level3 = {
    marginLeft: margin75,
    marginTop: margin1,
    marginBottom: margin1
};
let level4 = {
    marginLeft: margin100,
    marginTop: margin1,
    marginBottom: margin1
};
let level5 = {
    marginLeft: margin125,
    marginTop: margin1,
    marginBottom: margin1
};
let boundary1 = {
    marginLeft: margin1,
    marginTop: margin1,
    marginBottom: margin1,
    marginRight: margin1
};
let boundary3 = {
    marginLeft: margin3,
    marginTop: margin3,
    marginBottom: margin3,
    marginRight: margin3
};
/**
 * Symbology for the GUI.
 */ let addString = "add";
let addSymbol = "\uFF0B";
let removeString = "remove";
let removeSymbol = "\u2715";
let s_Add_from_spreadsheet = "Add from spreadsheet";
let selected = "\u2713 [SELECTED] Action to unselect.";
let notSelected = "\u2717 [NOT SELECTED] Action to select.";
let selectedLoadedValueText = " Change the specification if desired:";
let unselectedText = " Then specify using input(s) that appear.";
let selectedValueText = " Or specify using input(s):";
let selectAnotherOption = "Action/select another option...";
let specifyNumberText = "Click then specify a number in the input that will appear.";
/**
 * For mesmer.
 */ let mesmer;
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
 * The reactions diagram id.
 */ let reactionsDiagramId = "reactionsDiagram";
/**
 * Once the DOM is loaded, add a load button.
 */ document.addEventListener("DOMContentLoaded", ()=>{
    // Create a menu for the GUI.
    let menuDiv = document.getElementById("menu");
    menuDiv.style.display = "flex";
    menuDiv.style.justifyContent = "center";
    menuDiv.style.margin = "5px";
    menuDiv.style.padding = "5px";
    menuDiv.style.border = "1px solid black";
    menuDiv.style.backgroundColor = "lightgrey";
    // Create Load button.
    let loadButton = (0, _htmlJs.createButton)("Load", boundary1);
    loadButton.addEventListener("click", ()=>{
        load();
        loadButton.textContent = "Load";
    });
    loadButton.style.fontSize = "1em"; // Set the font size with a relative unit.
    menuDiv.appendChild(loadButton);
    /*
    // Create GitHub repository URL button.
    let gitHubRepositoryButtonId = 'gitHubRepositoryButtonId';
    remove(gitHubRepositoryButtonId);
    let gitHubRepositoryButton = createButton(gitHubRepositoryURL, boundary1);
    gitHubRepositoryButton.id = gitHubRepositoryButtonId;
    gitHubRepositoryButton.addEventListener('click', () => {
        window.open(gitHubRepositoryURL, '_blank');
    });
    menuDiv.appendChild(gitHubRepositoryButton);
    */ // Create style/theme option buttons.
    // Create button to increase the font size.
    let increaseFontSizeButton = (0, _htmlJs.createButton)("Increase Font Size", boundary1);
    increaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize + 1 + "px";
        // Redraw the reactions diagram.
        displayReactionsDiagram(reactionsDiagramId);
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let decreaseFontSizeButton = (0, _htmlJs.createButton)("Decrease Font Size", boundary1);
    decreaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize - 1 + "px";
        // Redraw the reactions diagram.
        displayReactionsDiagram(reactionsDiagramId);
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Create Save button.
    let saveButtonId = "saveButtonId";
    (0, _htmlJs.remove)(saveButtonId);
    let saveButton = (0, _htmlJs.createButton)("Save", boundary1);
    saveButton.id = saveButtonId;
    saveButton.addEventListener("click", saveXML);
    saveButton.style.fontSize = "1em"; // Set the font size with a relative unit.
    menuDiv.appendChild(saveButton);
    let welcomeDiv = (0, _htmlJs.createDiv)(boundary1);
    // Create text for welcome.
    let p1 = document.createElement("p");
    welcomeDiv.appendChild(p1);
    p1.textContent = "Welcome to MXG - a Graphical User Interface (GUI) program to assist MEMSER users in creating, editing     and visualising MESMER data. MESMER is the Master Equation Solver for Multi Energy-well Reactions, details can be found     at: ";
    p1.appendChild(memser_a);
    p1.style.alignContent = "center";
    let p2 = document.createElement("p");
    welcomeDiv.appendChild(p2);
    p2.textContent = "MXG development is being funded by the UK Engineering and Physical Sciences Research Council (EPSRC).";
    let p3 = document.createElement("p");
    welcomeDiv.appendChild(p3);
    p3.textContent = "There is a menu above containing buttons. Use the Load button to select a MESMER file to load (the file         will not be modified). MXG reads the file and presents the data it contains so that the user can make changes and use         the Save button to generate a new MESMER file. The saved file should have the same content as was loaded except it         will contain no comments, values will be trimmed of white space, and number formats will be in a standard         scientific notation if they were not already. The saved file will also reflect any changes specified using the GUI.";
    let p4 = document.createElement("p");
    welcomeDiv.appendChild(p4);
    p4.textContent = "MXG is designed to be user-friendly and accessible. Between the Load and Save buttons are buttons to         increase or decrease the font size. It is planned to have themes selectable to provide a dark mode rendering and to         support users without normal colour vision.The development is in an alpha release phase, is undergoing testing, and         is not recommended for general use. A community release with ongoing support from MESMER developers is scheduled for         the end of April 2024. MXG is free and open source software based and free and open source software. The main         development GitHub repository is: ";
    p4.appendChild(mxg_a);
    let p5 = document.createElement("p");
    p5.textContent += "Please feel free to explore the code and have a play with MXG.";
    welcomeDiv.appendChild(p5);
    let p6 = document.createElement("p");
    welcomeDiv.appendChild(p6);
    p6.textContent = "MXG can be installed locally as a Progressive Web App (PWA). A PWA is a type of application software     that works on any platform with a standards-compliant Web browser. PWA installation varies by Web browser/device.     Some details to help with installation of the MXG PWA are in the GitHub Repository README. Please refer to that     README for further details. Below the menu is a section for instructions on how to use MXG.";
    let p7 = document.createElement("p");
    welcomeDiv.appendChild(p7);
    p7.textContent = 'The MESMER file loaded is expected to contain the following child elements of the parent "me:mesmer"     element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a     child element is missing or there are multiple of the same, an Error is currently thrown. MXG should support files     loaded with multiple "me:contol" sections soon...';
    document.body.appendChild(welcomeDiv);
    // Create div for instructions.
    let instructionsDiv = (0, _htmlJs.createDiv)(boundary1);
    document.body.appendChild(instructionsDiv);
    let p8 = document.createElement("p");
    instructionsDiv.appendChild(p8);
    p8.textContent = 'Upon loading a MESMER file, an input containing the "me:title" value should appear along side a label.         The value can be changed using the input. The "me:title" value is used to compose the filename for data saved using         the Save button. Characters that are unsuitable for filenames will be replaced with the underscore character "_" in         the filename.';
    let p9 = document.createElement("p");
    instructionsDiv.appendChild(p9);
    p9.textContent = 'The "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" details         are presented below the "me:title" in a series of buttons. A canvas depicts a well diagram for the reactions. The         diagram redraws if an "me:ZPE" property value of a molecule a listed reaction are changed. Below all this is a text         representation of the file loaded.';
    let p10 = document.createElement("p");
    instructionsDiv.appendChild(p10);
    p10.textContent = 'The "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" buttons contain         a triangular symbol which indicate a collapsed (triangle orientated with a point down: \u25BC) or expanded (triangle with a point         up: \u25B2) state. Actioning these buttons will either expand or collapse content that should appear or be present below the button.';
});
/**
 * Prompts the user for a MESMER XML file, initiates the parsing of the chosen file, and 
 * creates a save button for saving a new XML file.
 */ function load() {
    let inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.onchange = function() {
        if (inputElement.files) {
            for(let i = 0; i < inputElement.files.length; i++)console.log("inputElement.files[" + i + "]=" + inputElement.files[i]);
            let file = inputElement.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            let inputFilename = file.name;
            let reader = new FileReader();
            let chunkSize = 1048576; // 1MB
            let start = 0;
            let contents = "";
            reader.onload = function(e) {
                if (e.target == null) throw new Error("Event target is null");
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
                        displayXML(inputFilename, contents);
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
    };
    inputElement.click();
}
/**
 * Parse an XMLDocument and create the mesmer object.
 * @param xml The XML.
 */ function parse(xml) {
    console.log("parse: " + xml);
    // Process the XML.
    let xml_mesmer = (0, _xmlJs.getSingularElement)(xml, (0, _mesmerJs.Mesmer).tagName);
    mesmer = new (0, _mesmerJs.Mesmer)((0, _xmlJs.getAttributes)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName((0, _mesmerJs.Title).tagName);
    if (xml_title.length != 1) throw new Error("Multiple " + (0, _mesmerJs.Title).tagName + " tags found");
    else {
        let title = xml_title[0].childNodes[0].nodeValue.trim();
        let titleNode = new (0, _mesmerJs.Title)((0, _xmlJs.getAttributes)(xml_title[0]), title);
        let titleElement = document.getElementById("title");
        let titleString = titleNode.value;
        mesmer.setTitle(titleNode);
        let titleId = "titleId";
        // Remove any existing titleDiv.
        (0, _htmlJs.remove)(titleId);
        // Create input element.
        let titleDiv = (0, _htmlJs.createDiv)(boundary1);
        let lwi = (0, _htmlJs.createLabelWithInput)("text", titleId + "Input", boundary1, level0, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                titleNode.value = event.target.value;
                console.log(titleNode.tagName + " changed to " + titleNode.value);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, titleString, (0, _mesmerJs.Title).tagName, fontSize1);
        titleDiv.appendChild(lwi);
        titleDiv.id = titleId;
        titleElement.parentNode?.insertBefore(titleDiv, titleElement);
    }
    // Molecules.
    let moleculesElement = document.getElementById("molecules");
    let moleculesDivId = "moleculesDivId";
    // If there is an existing moleculesDiv remove it.
    (0, _htmlJs.remove)(moleculesDivId);
    if (moleculesElement == null) ;
    else {
        let moleculesDiv = (0, _htmlJs.createFlexDiv)(boundary1);
        moleculesElement.appendChild(moleculesDiv);
        let moleculeListDiv = processMoleculeList(xml);
        moleculeListDiv.id = "moleculesListDivId";
        moleculeListDiv.style.maxWidth = "50vw"; // Add this line
        moleculesDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: moleculeListDiv,
            buttonLabel: "Molecules",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: moleculeListDiv.id
        }));
        mesmer.setMoleculeList(new (0, _mesmerJs.MoleculeList)((0, _xmlJs.getAttributes)(moleculeListDiv), Array.from(molecules.values())));
        // Add the reactions diagram canvas. 
        let reactionsDiagramDiv = (0, _htmlJs.createDiv)(boundary1);
        moleculesDiv.append(reactionsDiagramDiv);
        // Create a new canvas.
        let canvas = document.createElement("canvas");
        canvas.id = reactionsDiagramId;
        reactionsDiagramDiv.appendChild(canvas);
    }
    // Reactions.
    let reactionsElement = document.getElementById("reactions");
    let reactionsDivId = "reactionsDivId";
    // If there is an existing reactionsDiv remove it.
    (0, _htmlJs.remove)(reactionsDivId);
    if (reactionsElement == null) ;
    else {
        let reactionsDiv = processReactionList(xml);
        reactionsDiv.id = reactionsDivId;
        reactionsElement.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: reactionsDiv,
            buttonLabel: "Reactions",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: reactionsDivId
        }));
        mesmer.setReactionList(new (0, _mesmerJs.ReactionList)((0, _xmlJs.getAttributes)(reactionsDiv), Array.from(reactions.values())));
    }
    // Display reaction diagram. 
    displayReactionsDiagram(reactionsDiagramId);
    // Conditions
    let conditionsElement = document.getElementById("conditions");
    let conditionsDivId = "conditionsDivId";
    // If there is an existing conditionsDiv remove it.
    (0, _htmlJs.remove)(conditionsDivId);
    if (conditionsElement == null) ;
    else {
        let conditionsDiv = processConditions(xml);
        conditionsDiv.id = conditionsDivId;
        conditionsElement.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: conditionsDiv,
            buttonLabel: "Conditions",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: conditionsDivId
        }));
    }
    // Model Parameters.
    let modelParametersElement = document.getElementById("modelParameters");
    let modelParametersDivId = "modelParametersDivId";
    // If there is an existing modelParametersDiv remove it.
    (0, _htmlJs.remove)(modelParametersDivId);
    if (modelParametersElement == null) ;
    else {
        let modelParametersDiv = processModelParameters(xml);
        modelParametersDiv.id = modelParametersDivId;
        modelParametersElement.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: modelParametersDiv,
            buttonLabel: "Model Parameters",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: modelParametersDivId
        }));
    }
    // Control.
    let controlElement = document.getElementById("control");
    let controlDivId = "controlDivId";
    // If there is an existing controlDiv remove it.
    (0, _htmlJs.remove)(controlDivId);
    if (controlElement == null) ;
    else {
        let controlDiv = processControl(xml);
        controlDiv.id = controlDivId;
        controlElement.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: controlDiv,
            buttonLabel: "Control",
            buttonFontSize: fontSize1,
            boundary: boundary1,
            level: level0,
            contentDivId: controlDivId
        }));
    }
    // Initiate action listeners for collapsible content.
    (0, _htmlJs.makeCollapsible)();
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ function processMoleculeList(xml) {
    // Create div to contain the molecules list.
    let moleculeListDiv = (0, _htmlJs.createDiv)(boundary1);
    // Get the XML "moleculeList" element.
    let xml_moleculeList = (0, _xmlJs.getSingularElement)(xml, (0, _mesmerJs.MoleculeList).tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
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
    // Process the XML "molecule" elements.
    let xml_molecules = xml_moleculeList.getElementsByTagName((0, _moleculeJs.Molecule).tagName);
    let xml_molecules_length = xml_molecules.length;
    console.log("Number of molecules=" + xml_molecules_length);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_molecules.length; i++){
        let moleculeDiv = document.createElement("div");
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
        //console.log("atomsNode=" + atomsNode);
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
        // Create molecule.
        let molecule = new (0, _moleculeJs.Molecule)(attributes, atomsNode, bondsNode);
        molecules.set(molecule.id, molecule);
        // Organise PropertyList or individual Property.
        // (There can be an individual property not in a propertyList?)
        // If there is a PropertyList, then create a property list.
        let xml_PLs = xml_molecules[i].getElementsByTagName((0, _moleculeJs.PropertyList).tagName);
        if (xml_PLs.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.PropertyList).tagName + " but finding " + xml_PLs.length + "!");
        if (xml_PLs.length == 1) {
            // Create a new collapsible div for the PropertyList.
            let plDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + (0, _moleculeJs.PropertyList).tagName + "_";
            let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                content: plDiv,
                buttonLabel: (0, _moleculeJs.PropertyList).tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl = new (0, _moleculeJs.PropertyList)((0, _xmlJs.getAttributes)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName((0, _moleculeJs.Property).tagName);
            for(let j = 0; j < xml_Ps.length; j++){
                let p = new (0, _moleculeJs.Property)((0, _xmlJs.getAttributes)(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) processProperty(p, (0, _moleculeJs.ZPE).units, molecule, xml_Ps[j], plDiv, boundary1, level3);
                else if (p.dictRef == (0, _moleculeJs.RotConsts).dictRef) processProperty(p, (0, _moleculeJs.RotConsts).units, molecule, xml_Ps[j], plDiv, boundary1, level3);
                else processProperty(p, undefined, molecule, xml_Ps[j], plDiv, boundary1, level3);
            }
            moleculeTagNames.delete((0, _moleculeJs.PropertyList).tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Property).tagName);
            if (xml_Ps.length != 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Property).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, _moleculeJs.PropertyList).tagName + "?");
            // Create a new Property.
            let p = new (0, _moleculeJs.Property)((0, _xmlJs.getAttributes)(xml_Ps[0]));
            molecule.setProperties(p);
            if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) processProperty(p, (0, _moleculeJs.ZPE).units, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            else if (p.dictRef == (0, _moleculeJs.RotConsts).dictRef) processProperty(p, (0, _moleculeJs.RotConsts).units, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            else processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, boundary1, level2);
            moleculeTagNames.delete((0, _moleculeJs.Property).tagName);
        }
        // Organise EnergyTransferModel.
        let xml_ETMs = xml_molecules[i].getElementsByTagName((0, _moleculeJs.EnergyTransferModel).tagName);
        if (xml_ETMs.length > 0) {
            if (xml_ETMs.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.EnergyTransferModel).tagName + " but finding " + xml_ETMs.length + "!");
            let etm = new (0, _moleculeJs.EnergyTransferModel)((0, _xmlJs.getAttributes)(xml_ETMs[0]));
            processEnergyTransferModel(etm, molecule, xml_ETMs[0], moleculeDiv, margin75);
            moleculeTagNames.delete((0, _moleculeJs.EnergyTransferModel).tagName);
        }
        // Organise DOSCMethod.
        let xml_DOSCMethod = xml_molecules[i].getElementsByTagName((0, _moleculeJs.DOSCMethod).tagName);
        if (xml_DOSCMethod.length > 0) {
            if (xml_DOSCMethod.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.DOSCMethod).tagName + " but finding " + xml_DOSCMethod.length + "!");
            let dOSCMethod = new (0, _moleculeJs.DOSCMethod)((0, _xmlJs.getAttributes)(xml_DOSCMethod[0]));
            processDOSCMethod(dOSCMethod, molecule, moleculeDiv);
            moleculeTagNames.delete((0, _moleculeJs.DOSCMethod).tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ExtraDOSCMethod).tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            //console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");
            let extraDOSCMethod = new (0, _moleculeJs.ExtraDOSCMethod)((0, _xmlJs.getAttributes)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let contentDivId = molecule.id + "_" + (0, _moleculeJs.ExtraDOSCMethod).tagName + "_";
            let extraDOSCMethodCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                content: extraDOSCMethodDiv,
                buttonLabel: (0, _moleculeJs.ExtraDOSCMethod).tagName,
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            moleculeDiv.appendChild(extraDOSCMethodCollapsibleDiv);
            // Read bondRef.
            let xml_bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName((0, _moleculeJs.BondRef).tagName);
            if (xml_bondRefs.length > 0) {
                if (xml_bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + xml_bondRefs.length);
                let container = (0, _htmlJs.createFlexDiv)(level3);
                let label = document.createElement("label");
                label.textContent = (0, _moleculeJs.BondRef).tagName + ": ";
                container.appendChild(label);
                let bondRef = new (0, _moleculeJs.BondRef)((0, _xmlJs.getAttributes)(xml_bondRefs[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
                // Create a HTMLSelectElement to select the bondRef.
                let bondIds = molecule.getBonds().getBondIds();
                let selectElement = (0, _htmlJs.createSelectElement)(bondIds, bondRef.value, molecule.id + "_" + (0, _moleculeJs.BondRef).tagName, boundary1);
                selectElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLSelectElement) {
                        bondRef.value = event.target.value;
                        (0, _htmlJs.resizeSelectElement)(event.target);
                    }
                });
                (0, _htmlJs.resizeSelectElement)(selectElement);
                container.appendChild(selectElement);
                extraDOSCMethodDiv.appendChild(container);
            }
            // Read hinderedRotorPotential.
            let xml_hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName((0, _moleculeJs.HinderedRotorPotential).tagName);
            if (xml_hinderedRotorPotentials.length > 0) {
                if (xml_hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hinderedRotorPotentials.length);
                let hinderedRotorPotentialAttributes = (0, _xmlJs.getAttributes)(xml_hinderedRotorPotentials[0]);
                let hinderedRotorPotential = new (0, _moleculeJs.HinderedRotorPotential)(hinderedRotorPotentialAttributes);
                // Create a new collapsible div for the HinderedRotorPotential.
                let hinderedRotorPotentialDiv = (0, _htmlJs.createFlexDiv)(boundary1);
                let contentDivId = molecule.id + "_" + (0, _moleculeJs.DOSCMethod).tagName + "_" + (0, _moleculeJs.HinderedRotorPotential).tagName;
                let hinderedRotorPotentialCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                    content: hinderedRotorPotentialDiv,
                    buttonLabel: (0, _moleculeJs.HinderedRotorPotential).tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level3,
                    contentDivId: contentDivId
                });
                extraDOSCMethodDiv.appendChild(hinderedRotorPotentialCollapsibleDiv);
                // Formats
                let formatLabel = (0, _htmlJs.createLabel)("Format:", level4);
                hinderedRotorPotentialDiv.appendChild(formatLabel);
                let selectElement = (0, _htmlJs.createSelectElement)((0, _moleculeJs.HinderedRotorPotential).formats, hinderedRotorPotential.format, molecule.id + "_" + (0, _moleculeJs.HinderedRotorPotential).tagName, boundary1);
                selectElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLSelectElement) {
                        hinderedRotorPotential.format = event.target.value;
                        (0, _htmlJs.resizeSelectElement)(event.target);
                    }
                });
                (0, _htmlJs.resizeSelectElement)(selectElement);
                hinderedRotorPotentialDiv.appendChild(selectElement);
                // Add any units.
                let unitsLabel = (0, _htmlJs.createLabel)("Units:", boundary1);
                hinderedRotorPotentialDiv.appendChild(unitsLabel);
                addAnyUnits((0, _moleculeJs.HinderedRotorPotential).units, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, molecule.id + "_" + (0, _moleculeJs.DOSCMethod).tagName + "_" + (0, _moleculeJs.HinderedRotorPotential).tagName, (0, _moleculeJs.HinderedRotorPotential).tagName, boundary1);
                // Add expansionSize.
                let expansionSizeLabel = (0, _htmlJs.createLabel)("Expansion size:", boundary1);
                hinderedRotorPotentialDiv.appendChild(expansionSizeLabel);
                let expansionSizeInputElementId = molecule.id + "_" + (0, _moleculeJs.DOSCMethod).tagName + "_" + (0, _moleculeJs.HinderedRotorPotential).tagName + "_expansionSize";
                let expansionSizeInputElement = (0, _htmlJs.createInput)("number", expansionSizeInputElementId, boundary1);
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                expansionSizeInputElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLInputElement) {
                        // Check the input is a number.
                        if ((0, _utilJs.isNumeric)(event.target.value)) hinderedRotorPotential.setExpansionSize(parseInt(event.target.value));
                        else {
                            // Reset the input to the current value.
                            alert("Expansion size input is not a number, resetting...");
                            expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                        }
                        (0, _htmlJs.resizeInputElement)(expansionSizeInputElement);
                    }
                });
                expansionSizeInputElement.value = hinderedRotorPotential.getExpansionSize().toString();
                (0, _htmlJs.resizeInputElement)(expansionSizeInputElement);
                hinderedRotorPotentialDiv.appendChild(expansionSizeInputElement);
                // Add useSineTerms.
                let useSineTermsLabel = (0, _htmlJs.createLabel)("Use sine terms:", boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId = molecule.id + "_" + (0, _moleculeJs.DOSCMethod).tagName + "_" + (0, _moleculeJs.HinderedRotorPotential).tagName + "_useSineTerms";
                let useSineTermsInput = (0, _htmlJs.createInput)("checkbox", useSineTermsInputId, boundary1);
                useSineTermsInput.checked = hinderedRotorPotential.getUseSineTerms();
                useSineTermsInput.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLInputElement) hinderedRotorPotential.setUseSineTerms(event.target.checked);
                });
                hinderedRotorPotentialDiv.appendChild(useSineTermsInput);
                // Load PotentialPoints.
                // Create a new collapsible div for the potential points.
                let potentialPointsDiv = document.createElement("div");
                let potentialPointContentDivId = molecule.id + "_" + (0, _moleculeJs.DOSCMethod).tagName + "_" + (0, _moleculeJs.HinderedRotorPotential).tagName + "_" + (0, _moleculeJs.PotentialPoint).tagName;
                let potentialPointCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                    content: potentialPointsDiv,
                    buttonLabel: (0, _moleculeJs.PotentialPoint).tagName,
                    buttonFontSize: fontSize3,
                    boundary: boundary1,
                    level: level4,
                    contentDivId: potentialPointContentDivId
                });
                hinderedRotorPotentialDiv.appendChild(potentialPointCollapsibleDiv);
                let potentialPoints = [];
                let xml_potentialPoints = xml_hinderedRotorPotentials[0].getElementsByTagName((0, _moleculeJs.PotentialPoint).tagName);
                for(let k = 0; k < xml_potentialPoints.length; k++){
                    let potentialPoint = new (0, _moleculeJs.PotentialPoint)((0, _xmlJs.getAttributes)(xml_potentialPoints[k]));
                    potentialPoints.push(potentialPoint);
                    let potentialPointDiv = (0, _htmlJs.createFlexDiv)(level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel = (0, _htmlJs.createLabel)("Angle:", boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId = molecule.id + "_" + (0, _moleculeJs.PotentialPoint).tagName + "_angle";
                    let angleInputElement = (0, _htmlJs.createInput)("number", angleInputElementId, boundary1);
                    angleInputElement.addEventListener("change", (event)=>{
                        if (event.target instanceof HTMLInputElement) {
                            // Check the input is a number.
                            if ((0, _utilJs.isNumeric)(event.target.value)) {
                                let value = parseFloat(event.target.value);
                                potentialPoint.setAngle(parseFloat(event.target.value));
                            } else {
                                // Reset the input to the current value.
                                alert("Angle input is not a number, resetting...");
                                angleInputElement.value = potentialPoint.getAngle().toString();
                            }
                            (0, _htmlJs.resizeInputElement)(angleInputElement);
                        }
                    });
                    angleInputElement.value = potentialPoint.getAngle().toString();
                    (0, _htmlJs.resizeInputElement)(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, _htmlJs.createLabel)("Potential:", boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = molecule.id + "_" + (0, _moleculeJs.PotentialPoint).tagName + "_potential";
                    let potentialInputElement = (0, _htmlJs.createInput)("number", potentialInputElementId, boundary1);
                    potentialInputElement.addEventListener("change", (event)=>{
                        if (event.target instanceof HTMLInputElement) {
                            // Check the input is a number.
                            if ((0, _utilJs.isNumeric)(event.target.value)) {
                                let value = parseFloat(event.target.value);
                                potentialPoint.setPotential(value);
                                console.log("Set " + (0, _moleculeJs.PotentialPoint).tagName + " to " + value.toString());
                            } else {
                                // Reset the input to the current value.
                                alert("Potential input is not a number, resetting...");
                                potentialInputElement.value = potentialPoint.getPotential().toString();
                            }
                            (0, _htmlJs.resizeInputElement)(potentialInputElement);
                        }
                    });
                    potentialInputElement.value = potentialPoint.getPotential().toString();
                    (0, _htmlJs.resizeInputElement)(potentialInputElement);
                    potentialPointDiv.appendChild(potentialInputElement);
                    potentialPointsDiv.appendChild(potentialPointDiv);
                }
                potentialPointCollapsibleDiv.appendChild(potentialPointsDiv);
                hinderedRotorPotential.setPotentialPoints(potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }
            // Read periodicities.
            let xml_periodicities = xml_DOSCMethod[0].getElementsByTagName((0, _moleculeJs.Periodicity).tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_periodicities[0]));
                let periodicity = new (0, _moleculeJs.Periodicity)((0, _xmlJs.getAttributes)(xml_periodicities[0]), parseFloat(valueString));
                extraDOSCMethod.setPeriodicity(periodicity);
                let inputDiv = (0, _htmlJs.createLabelWithInput)("number", molecule.id + "_" + (0, _moleculeJs.Periodicity).tagName, boundary1, level3, (event)=>{
                    if (event.target instanceof HTMLInputElement) {
                        valueString = event.target.value;
                        if ((0, _utilJs.isNumeric)(valueString)) {
                            let value = parseFloat(valueString);
                            periodicity.value = value;
                            extraDOSCMethod.getPeriodicity().value = value;
                            console.log("Set " + (0, _moleculeJs.Periodicity).tagName + " to " + value);
                        } else {
                            // Reset the input to the current value.
                            alert("Periodicity input is not a number, resetting...");
                            event.target.value = periodicity.value.toString();
                        }
                    }
                }, valueString, (0, _moleculeJs.Periodicity).tagName);
                extraDOSCMethodDiv.appendChild(inputDiv);
            }
            molecule.setExtraDOSCMethod(extraDOSCMethod);
            moleculeTagNames.delete((0, _moleculeJs.ExtraDOSCMethod).tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete((0, _moleculeJs.ReservoirSize).tagName);
        let xml_ReservoirSize = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ReservoirSize).tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_ReservoirSize[0]));
            let value = parseFloat(valueString);
            let reservoirSizeAttributes = (0, _xmlJs.getAttributes)(xml_ReservoirSize[0]);
            let reservoirSize = new (0, _moleculeJs.ReservoirSize)(reservoirSizeAttributes, value);
            molecule.setReservoirSize(reservoirSize);
            let inputDiv = (0, _htmlJs.createLabelWithInput)("number", molecule.id + "_" + (0, _moleculeJs.ReservoirSize).tagName, boundary1, level2, (event)=>{
                if (event.target instanceof HTMLInputElement) {
                    reservoirSize.value = parseFloat(event.target.value);
                    (0, _htmlJs.resizeInputElement)(event.target);
                }
            }, valueString, (0, _moleculeJs.ReservoirSize).tagName);
            moleculeDiv.appendChild(inputDiv);
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        // Create a molstar molecule visualisation
        let molstarDiv = document.createElement("div");
        molstarDiv.id = molecule.id + "_molstar";
        moleculeDiv.appendChild(molstarDiv);
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
            content: moleculeDiv,
            buttonLabel: molecule.getLabel(),
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: molecule.tagName + "_" + molecule.id
        });
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById("xml");
    // xmlHeading
    let xmlHeadingId = "xmlHeading";
    (0, _htmlJs.remove)(xmlHeadingId);
    let xmlHeading = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId = "xmlParagraph";
    (0, _htmlJs.remove)(xmlParagraphId);
    let xmlPre = document.createElement("pre");
    xmlPre.textContent = xml;
    xmlDiv.appendChild(xmlPre);
}
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */ function processProperty(p, units, molecule, element, moleculeDiv, boundary, level) {
    // Handle scalar or array property
    let scalarNodes = element.getElementsByTagName((0, _moleculeJs.PropertyScalar).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, _moleculeJs.PropertyScalar).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, _xmlJs.getInputString)(scalarNodes[0]);
        let value = parseFloat(inputString);
        let psAttributes = (0, _xmlJs.getAttributes)(scalarNodes[0]);
        let ps = new (0, _moleculeJs.PropertyScalar)(psAttributes, value);
        p.setProperty(ps);
        let label = p.dictRef;
        // Create a new div element for the input.
        let inputDiv = (0, _htmlJs.createLabelWithInput)("number", molecule.id + "_" + p.dictRef, boundary1, level, (event)=>{
            if (event.target instanceof HTMLInputElement) setNumberNode(ps, event.target);
        }, inputString, label);
        let inputElement = inputDiv.querySelector("input");
        //inputElement.value = inputString;
        (0, _htmlJs.resizeInputElement)(inputElement);
        inputElement.addEventListener("change", (event)=>{
            let eventTarget = event.target;
            inputString = eventTarget.value;
            ps = p.getProperty();
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            (0, _htmlJs.resizeInputElement)(inputElement);
            if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) {
                // Update the min and max molecule energy.
                if (value < minMoleculeEnergy) minMoleculeEnergy = value;
                if (value > maxMoleculeEnergy) maxMoleculeEnergy = value;
                // Update the molecule energy diagram.
                displayReactionsDiagram(reactionsDiagramId);
            }
        });
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
        moleculeDiv.appendChild(inputDiv);
    } else {
        let arrayNodes = element.getElementsByTagName((0, _moleculeJs.PropertyArray).tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) throw new Error("Expecting 1 " + (0, _moleculeJs.PropertyArray).tagName + " but finding " + arrayNodes.length + "!");
            let inputString = (0, _xmlJs.getInputString)(arrayNodes[0]);
            let values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
            let paAttributes = (0, _xmlJs.getAttributes)(arrayNodes[0]);
            let pa = new (0, _moleculeJs.PropertyArray)(paAttributes, values);
            p.setProperty(pa);
            let label = p.dictRef;
            // Create a new div element for the input.
            let inputDiv = (0, _htmlJs.createLabelWithInput)("text", molecule.id + "_" + p.dictRef, boundary, level, (event)=>{
                if (event.target instanceof HTMLInputElement) setNumberArrayNode(pa, event.target);
            }, inputString, label);
            let inputElement = inputDiv.querySelector("input");
            inputElement.value = inputString;
            (0, _htmlJs.resizeInputElement)(inputElement);
            inputElement.addEventListener("change", (event)=>{
                let eventTarget = event.target;
                inputString = eventTarget.value;
                pa = p.getProperty();
                values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                (0, _htmlJs.resizeInputElement)(inputElement);
            });
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
            moleculeDiv.appendChild(inputDiv);
        } else throw new Error("Expecting " + (0, _moleculeJs.PropertyScalar).tagName + " or " + (0, _moleculeJs.PropertyArray).tagName);
    }
}
/**
 * If there are a choice of units, then add a new select element to display/select them.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param inputDiv The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 */ function addAnyUnits(units, attributes, inputDiv, id, tagOrDictRef, boundary) {
    if (units != undefined) {
        let unitsSelectElement = getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            Object.assign(unitsSelectElement.style, boundary);
            inputDiv.appendChild(unitsSelectElement);
        }
    } else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, _htmlJs.createLabel)(attributesUnits, boundary);
            inputDiv.appendChild(label);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */ function getUnitsSelectElement(units, attributes, id, tagOrDictRef) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let selectElement = (0, _htmlJs.createSelectElement)(units, "Units", id, boundary1);
        // Set the initial value to the units.
        selectElement.value = psUnits;
        // Add event listener to selectElement.
        (0, _htmlJs.resizeSelectElement)(selectElement);
        selectElement.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLSelectElement) {
                attributes.set("units", event.target.value);
                console.log("Set " + tagOrDictRef + " units to " + event.target.value);
            }
            (0, _htmlJs.resizeSelectElement)(selectElement);
        });
        return selectElement;
    }
    return undefined;
}
/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param margin The margin.
 * @param moleculeDiv The molecule div.
 */ function processDOSCMethod(dOSCMethod, molecule, moleculeDiv) {
    let label = document.createElement("label");
    label.textContent = (0, _moleculeJs.DOSCMethod).tagName + ": ";
    let container = document.createElement("div");
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options = [
        "ClassicalRotors",
        "me:QMRotors",
        "QMRotors"
    ];
    let selectElement = (0, _htmlJs.createSelectElement)(options, "DOSCMethod", molecule.id + "_" + "Select_DOSCMethod", boundary1);
    // Set the initial value to the DOSCMethod.
    selectElement.value = dOSCMethod.getXsiType();
    // Add event listener to selectElement.
    selectElement.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLSelectElement) {
            dOSCMethod.setXsiType(event.target.value);
            console.log("Set DOSCMethod to " + event.target.value);
        }
    });
    molecule.setDOSCMethod(dOSCMethod);
    container.appendChild(selectElement);
    Object.assign(container.style, level2);
    moleculeDiv.appendChild(container);
}
/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */ function processEnergyTransferModel(etm, molecule, element, moleculeDiv, margin) {
    let xml_deltaEDowns = element.getElementsByTagName((0, _moleculeJs.DeltaEDown).tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmDiv = document.createElement("div");
        let contentDivId = molecule.id + "_" + (0, _moleculeJs.EnergyTransferModel).tagName;
        let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
            content: etmDiv,
            buttonLabel: (0, _moleculeJs.EnergyTransferModel).tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        moleculeDiv.appendChild(collapsibleDiv);
        let deltaEDowns = [];
        for(let k = 0; k < xml_deltaEDowns.length; k++){
            let inputString = (0, _xmlJs.getInputString)(xml_deltaEDowns[k]);
            let value = parseFloat(inputString);
            let deltaEDownAttributes = (0, _xmlJs.getAttributes)(xml_deltaEDowns[k]);
            let deltaEDown = new (0, _moleculeJs.DeltaEDown)(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = (0, _moleculeJs.DeltaEDown).tagName;
            // Create a new div element for the input.
            let id = molecule.id + "_" + (0, _moleculeJs.EnergyTransferModel).tagName + "_" + (0, _moleculeJs.DeltaEDown).tagName + "_" + k;
            let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level3, (event)=>{
                if (event.target instanceof HTMLInputElement) {
                    setNumberNode(deltaEDown, event.target);
                    inputString = event.target.value;
                    deltaEDowns[k].setValue(parseFloat(inputString));
                    console.log("Set " + id + " to " + inputString);
                    (0, _htmlJs.resizeInputElement)(event.target);
                }
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel = document.createElement("label");
            unitsLabel.textContent = "cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
function setNumberArrayNode(node, input) {
    let inputString = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        input.value = (0, _utilJs.arrayToString)(node.values, " ");
        return;
    }
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function(value) {
        if (!(0, _utilJs.isNumeric)(value)) success = false;
        values.push(parseFloat(value));
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        input.value = (0, _utilJs.arrayToString)(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) console.log("Changed " + node.tagName + ' from: "' + inputString + '" to: "' + (0, _utilJs.arrayToString)(node.values, " ") + '"');
    else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        input.value = (0, _utilJs.arrayToString)(node.values, " ");
    }
}
window.setNumberArrayNode = setNumberArrayNode;
function setNumberNode(node, input) {
    if ((0, _utilJs.isNumeric)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log(node.tagName + " value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        input.value = node.value.toString();
    }
}
window.set = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */ function processReactionList(xml) {
    // Create div to contain the reaction list.
    let reactionListDiv = (0, _htmlJs.createDiv)(boundary1);
    // Get the XML "reactionList" element.
    let xml_reactionList = (0, _xmlJs.getSingularElement)(xml, (0, _mesmerJs.ReactionList).tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames = new Set();
    xml_reactionList.childNodes.forEach(function(node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size != 1) {
        if (!(reactionListTagNames.size == 2 && reactionListTagNames.has("#text"))) {
            console.error("reactionListTagNames:");
            reactionListTagNames.forEach((x)=>console.error(x));
            throw new Error("Additional tag names in reactionList:");
        }
    }
    if (!reactionListTagNames.has((0, _reactionJs.Reaction).tagName)) throw new Error('Expecting tags with "' + (0, _reactionJs.Reaction).tagName + '" tagName but there are none!');
    // Process the XML "reaction" elements.
    let xml_reactions = xml_reactionList.getElementsByTagName((0, _reactionJs.Reaction).tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_reactions.length; i++){
        let reactionDiv = (0, _htmlJs.createDiv)(boundary1);
        // Set attributes.
        let reactionAttributes = (0, _xmlJs.getAttributes)(xml_reactions[i]);
        let reactionTagNames = new Set();
        let cns = xml_reactions[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for(let j = 0; j < cns.length; j++){
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!reactionTagNames.has(cn.nodeName)) reactionTagNames.add(cn.nodeName);
            else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
            if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
        //console.log(cn.nodeName);
        }
        // Create reaction.
        let reaction = new (0, _reactionJs.Reaction)(reactionAttributes);
        reactions.set(reaction.id, reaction);
        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants = xml_reactions[i].getElementsByTagName((0, _reactionJs.Reactant).tagName);
        reactionTagNames.delete((0, _reactionJs.Reactant).tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new div for the reactants.
            let reactantsDiv = document.createElement("div");
            let reactants = [];
            for(let j = 0; j < xml_reactants.length; j++){
                let xml_molecule = (0, _xmlJs.getFirstElement)(xml_reactants[j], (0, _moleculeJs.Molecule).tagName);
                let molecule = new (0, _reactionJs.ReactionMolecule)((0, _xmlJs.getAttributes)(xml_molecule));
                let reactant = new (0, _reactionJs.Reactant)((0, _xmlJs.getAttributes)(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let container = document.createElement("div");
                let label = document.createElement("label");
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options = [
                    "deficientReactant",
                    "excessReactant",
                    "modelled"
                ];
                let selectElement = (0, _htmlJs.createSelectElement)(options, "Role", molecule.ref + "_" + "Select_Role", boundary1);
                // Set the initial value.
                selectElement.value = molecule.role;
                // Add event listener to selectElement.
                selectElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
                });
                container.appendChild(selectElement);
                Object.assign(container.style, level3);
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let contentDivId = reaction.id + "_" + (0, _reactionJs.Reactant).tagName;
            let reactantCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                content: reactantsDiv,
                buttonLabel: "Reactants",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(reactantCollapsibleDiv);
        }
        // Load products.
        let xml_products = xml_reactions[i].getElementsByTagName((0, _reactionJs.Product).tagName);
        reactionTagNames.delete((0, _reactionJs.Product).tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            let productsDiv = document.createElement("div");
            let products = [];
            for(let j = 0; j < xml_products.length; j++){
                let xml_molecule = (0, _xmlJs.getFirstElement)(xml_products[j], (0, _moleculeJs.Molecule).tagName);
                let molecule = new (0, _reactionJs.ReactionMolecule)((0, _xmlJs.getAttributes)(xml_molecule));
                let product = new (0, _reactionJs.Product)((0, _xmlJs.getAttributes)(xml_products[j]), molecule);
                products.push(product);
                let options = [
                    "modelled",
                    "sink"
                ];
                let container = (0, _htmlJs.createLabelWithSelectElement)(molecule.ref + " role:", options, molecule.ref + "_" + "Select_Role", "Role", boundary1, level3);
                let selectElement = container.querySelector("select");
                selectElement.value = molecule.role;
                selectElement.addEventListener("change", (event)=>{
                    if (event.target instanceof HTMLSelectElement) {
                        molecule.setRole(event.target.value);
                        console.log("Set Role to " + event.target.value);
                    }
                });
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create collapsible div for the products.
            let contentDivId = reaction.id + "_" + (0, _reactionJs.Product).tagName;
            let productCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                content: productsDiv,
                buttonLabel: "Products",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(productCollapsibleDiv);
        }
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName((0, _reactionJs.Tunneling).tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, _reactionJs.Tunneling).tagName + " but finding " + xml_tunneling.length + "!");
            let tunneling = new (0, _reactionJs.Tunneling)((0, _xmlJs.getAttributes)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            // Create a new div for the tunneling.
            let container = document.createElement("div");
            let label = document.createElement("label");
            label.textContent = (0, _reactionJs.Tunneling).tagName + ": ";
            container.appendChild(label);
            // Create a HTMLSelectElement to select the Tunneling.
            let options = [
                "Eckart",
                "WKB"
            ];
            let selectElement = (0, _htmlJs.createSelectElement)(options, "Tunneling", reaction.id + "_" + "Select_Tunneling", boundary1);
            // Set the initial value.
            selectElement.value = tunneling.getName();
            // Add event listener to selectElement.
            selectElement.addEventListener("change", (event)=>{
                if (event.target instanceof HTMLSelectElement) {
                    tunneling.setName(event.target.value);
                    console.log("Set Tunneling to " + event.target.value);
                }
            });
            container.appendChild(selectElement);
            Object.assign(container.style, level2);
            reactionDiv.appendChild(container);
        }
        // Load transition states.
        let xml_transitionStates = xml_reactions[i].getElementsByTagName((0, _reactionJs.TransitionState).tagName);
        //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
        if (xml_transitionStates.length > 0) {
            let transitionStatesDiv = document.createElement("div");
            let transitionStates = [];
            for(let j = 0; j < xml_transitionStates.length; j++){
                let xml_molecule = (0, _xmlJs.getFirstElement)(xml_transitionStates[j], (0, _moleculeJs.Molecule).tagName);
                let molecule = new (0, _reactionJs.ReactionMolecule)((0, _xmlJs.getAttributes)(xml_molecule));
                let transitionState = new (0, _reactionJs.TransitionState)((0, _xmlJs.getAttributes)(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label = (0, _htmlJs.createLabel)(molecule.ref + " role: transitionState", level3);
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let contentDivId = reaction.id + "_" + (0, _reactionJs.TransitionState).tagName;
            let transitionStatesCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                content: transitionStatesDiv,
                buttonLabel: "Transition States",
                buttonFontSize: fontSize3,
                boundary: boundary1,
                level: level2,
                contentDivId: contentDivId
            });
            reactionDiv.appendChild(transitionStatesCollapsibleDiv);
        }
        // Load MCRCMethod.
        //console.log("Load MCRCMethod...");
        let xml_MCRCMethod = xml_reactions[i].getElementsByTagName((0, _reactionJs.MCRCMethod).tagName);
        //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
        //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
        if (xml_MCRCMethod.length > 0) {
            if (xml_MCRCMethod.length > 1) throw new Error("Expecting 1 " + (0, _reactionJs.MCRCMethod).tagName + " but finding " + xml_MCRCMethod.length + "!");
            else {
                let mCRCMethodDiv = document.createElement("div");
                let mCRCMethod;
                let mCRCMethodAttributes = (0, _xmlJs.getAttributes)(xml_MCRCMethod[0]);
                let name = mCRCMethodAttributes.get("name");
                //console.log(MCRCMethod.tagName + " name=" + name);
                if (name == undefined || name == (0, _reactionJs.MesmerILT).xsiType2) {
                    let type = mCRCMethodAttributes.get("xsi:type");
                    mCRCMethod = new (0, _reactionJs.MesmerILT)(mCRCMethodAttributes);
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    if (type == (0, _reactionJs.MesmerILT).xsiType || type == (0, _reactionJs.MesmerILT).xsiType2) {
                        let xml_preExponential = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.PreExponential).tagName);
                        if (xml_preExponential != null) {
                            if (xml_preExponential[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_preExponential[0]);
                                let value = parseFloat(inputString);
                                let preExponentialAttributes = (0, _xmlJs.getAttributes)(xml_preExponential[0]);
                                let preExponential = new (0, _reactionJs.PreExponential)(preExponentialAttributes, value);
                                mCRCMethod.setPreExponential(preExponential);
                                let label = (0, _reactionJs.PreExponential).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, _reactionJs.MesmerILT).tagName + "_" + (0, _reactionJs.PreExponential).tagName;
                                let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level3, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(preExponential, event.target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    preExponential.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.PreExponential).tagName, (0, _reactionJs.PreExponential).tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_activationEnergy = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.ActivationEnergy).tagName);
                        if (xml_activationEnergy != null) {
                            if (xml_activationEnergy[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_activationEnergy[0]);
                                let value = parseFloat(inputString);
                                let activationEnergyAttributes = (0, _xmlJs.getAttributes)(xml_activationEnergy[0]);
                                let activationEnergy = new (0, _reactionJs.ActivationEnergy)(activationEnergyAttributes, value);
                                mCRCMethod.setActivationEnergy(activationEnergy);
                                let label = (0, _reactionJs.ActivationEnergy).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, _reactionJs.MesmerILT).tagName + "_" + (0, _reactionJs.ActivationEnergy).tagName;
                                let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level3, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(activationEnergy, event.target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    activationEnergy.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.ActivationEnergy).tagName, (0, _reactionJs.ActivationEnergy).tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_tInfinity = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.TInfinity).tagName);
                        if (xml_tInfinity != null) {
                            if (xml_tInfinity[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_tInfinity[0]);
                                let value = parseFloat(inputString);
                                let tInfinityAttributes = (0, _xmlJs.getAttributes)(xml_tInfinity[0]);
                                let tInfinity = new (0, _reactionJs.TInfinity)(tInfinityAttributes, value);
                                mCRCMethod.setTInfinity(tInfinity);
                                let label = (0, _reactionJs.TInfinity).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, _reactionJs.MesmerILT).tagName + "_" + (0, _reactionJs.TInfinity).tagName;
                                let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level3, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(tInfinity, event.target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    tInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.TInfinity).tagName, (0, _reactionJs.TInfinity).tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_nInfinity = xml_MCRCMethod[0].getElementsByTagName((0, _reactionJs.NInfinity).tagName);
                        if (xml_nInfinity != null) {
                            if (xml_nInfinity[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_nInfinity[0]);
                                let value = parseFloat(inputString);
                                let nInfinityAttributes = (0, _xmlJs.getAttributes)(xml_nInfinity[0]);
                                let nInfinity = new (0, _reactionJs.NInfinity)(nInfinityAttributes, value);
                                mCRCMethod.setNInfinity(nInfinity);
                                let label = (0, _reactionJs.NInfinity).tagName;
                                // Create a new div element for the input.
                                let id = reaction.id + "_" + (0, _reactionJs.MesmerILT).tagName + "_" + (0, _reactionJs.NInfinity).tagName;
                                let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level3, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(nInfinity, event.target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let eventTarget = event.target;
                                    inputString = eventTarget.value;
                                    nInfinity.value = parseFloat(inputString);
                                    console.log("Set " + id + " to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(inputElement);
                                });
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.NInfinity).tagName, (0, _reactionJs.NInfinity).tagName, boundary1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let contentDivId = reaction.id + "_" + (0, _reactionJs.MCRCMethod).tagName;
                        let mCRCMethodCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
                            content: mCRCMethodDiv,
                            buttonLabel: (0, _reactionJs.MCRCMethod).tagName,
                            buttonFontSize: fontSize3,
                            boundary: boundary1,
                            level: level2,
                            contentDivId: contentDivId
                        });
                        reactionDiv.appendChild(mCRCMethodCollapsibleDiv);
                    } else throw new Error("Unexpected xsi:type=" + type);
                } else {
                    mCRCMethod = new (0, _reactionJs.MCRCMethod)(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement("label");
                    mCRCMethodLabel.textContent = (0, _reactionJs.MCRCMethod).tagName + ": " + mCRCMethodAttributes.get("name");
                    Object.assign(mCRCMethodLabel.style, level2);
                    mCRCMethodDiv.appendChild(mCRCMethodLabel);
                    reactionDiv.appendChild(mCRCMethodDiv);
                }
                reaction.setMCRCMethod(mCRCMethod);
            }
        }
        // Load excessReactantConc
        let xml_excessReactantConc = xml_reactions[i].getElementsByTagName((0, _reactionJs.ExcessReactantConc).tagName);
        if (xml_excessReactantConc.length > 0) {
            if (xml_excessReactantConc.length > 1) throw new Error("Expecting 1 " + (0, _reactionJs.ExcessReactantConc).tagName + " but finding " + xml_excessReactantConc.length + "!");
            let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_excessReactantConc[0])));
            let excessReactantConc = new (0, _reactionJs.ExcessReactantConc)((0, _xmlJs.getAttributes)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
            let id = reaction.id + "_" + (0, _reactionJs.ExcessReactantConc).tagName;
            let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level2, (event)=>{
                if (event.target instanceof HTMLInputElement) setNumberNode(excessReactantConc, event.target);
            }, value.toString(), (0, _reactionJs.ExcessReactantConc).tagName);
            reactionDiv.appendChild(inputDiv);
        }
        // Create a new collapsible div for the reaction.
        let reactionCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
            content: reactionDiv,
            buttonLabel: reaction.id + "(" + reaction.getLabel() + ")",
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: reaction.tagName + "_" + reaction.id
        });
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(reactionCollapsibleDiv);
    }
    return reactionListDiv;
}
/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */ function processConditions(xml) {
    console.log((0, _conditionsJs.Conditions).tagName);
    // Create div to contain the conditions.
    let conditionsDiv = (0, _htmlJs.createDiv)(boundary1);
    // Get the XML "moleculeList" element.
    let xml_conditions = (0, _xmlJs.getSingularElement)(xml, (0, _conditionsJs.Conditions).tagName);
    let conditions = new (0, _conditionsJs.Conditions)((0, _xmlJs.getAttributes)(xml_conditions));
    mesmer.setConditions(conditions);
    // Bath Gases
    let bathGasesDiv = document.createElement("div");
    conditionsDiv.appendChild(bathGasesDiv);
    // Add collapsible div.
    conditionsDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: bathGasesDiv,
        buttonLabel: (0, _conditionsJs.BathGas).name,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: (0, _conditionsJs.BathGas).tagName
    }));
    // Add add button.
    let addBathGasButton = (0, _htmlJs.createButton)(addString, level2);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener("click", ()=>{
        let bathGas = new (0, _conditionsJs.BathGas)(new Map(), "");
        conditions.addBathGas(bathGas);
        let containerDiv = (0, _htmlJs.createFlexDiv)(level2);
        let bathGasLabel = (0, _htmlJs.createLabel)((0, _conditionsJs.BathGas).tagName, boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs = new Set(molecules.keys());
        let selectElement = (0, _htmlJs.createSelectElement)(Array.from(moleculeIDs), (0, _conditionsJs.BathGas).tagName, (0, _conditionsJs.Conditions).tagName + "_" + (0, _conditionsJs.BathGas).tagName, boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLSelectElement) {
                bathGas.value = event.target.value;
                console.log("Added " + event.target.value + " as a " + (0, _conditionsJs.BathGas).tagName);
                (0, _htmlJs.resizeSelectElement)(event.target);
            }
        });
        selectElement.style.marginLeft = margin2;
        (0, _htmlJs.resizeSelectElement)(selectElement);
        containerDiv.appendChild(selectElement);
        // Add a remove button.
        let removeButton = (0, _htmlJs.createButton)(removeString, boundary1);
        removeButton.addEventListener("click", ()=>{
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
        containerDiv.appendChild(removeButton);
        bathGasesDiv.appendChild(containerDiv);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    let xml_bathGases = Array.from(xml_conditions.children).filter((child)=>child.tagName === (0, _conditionsJs.BathGas).tagName);
    if (xml_bathGases.length > 0) for(let i = 0; i < xml_bathGases.length; i++){
        let attributes = (0, _xmlJs.getAttributes)(xml_bathGases[i]);
        let moleculeID = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGases[i]));
        let bathGas = new (0, _conditionsJs.BathGas)(attributes, moleculeID);
        console.log("bathGas" + bathGas.toString());
        conditions.addBathGas(bathGas);
        let containerDiv = (0, _htmlJs.createFlexDiv)(level2);
        let bathGasLabel = (0, _htmlJs.createLabel)((0, _conditionsJs.BathGas).tagName, boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs = new Set(molecules.keys());
        let selectElement = (0, _htmlJs.createSelectElement)(Array.from(moleculeIDs), (0, _conditionsJs.BathGas).tagName, (0, _conditionsJs.Conditions).tagName + "_" + (0, _conditionsJs.BathGas).tagName, boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLSelectElement) {
                bathGas.value = event.target.value;
                console.log("Set " + (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.BathGas).tagName + " to " + event.target.value);
                (0, _htmlJs.resizeSelectElement)(event.target);
            }
        });
        (0, _htmlJs.resizeSelectElement)(selectElement);
        containerDiv.appendChild(selectElement);
        // Add a remove button.
        let removeButton = (0, _htmlJs.createButton)(removeString, boundary1);
        removeButton.addEventListener("click", ()=>{
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
        containerDiv.appendChild(removeButton);
        bathGasesDiv.appendChild(containerDiv);
    }
    // PTs
    let pTsDiv = document.createElement("div");
    conditionsDiv.appendChild(pTsDiv);
    let pTs = new (0, _conditionsJs.PTs)(new Map());
    // Add collapsible div.
    conditionsDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: pTsDiv,
        buttonLabel: (0, _conditionsJs.PTs).name,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: (0, _conditionsJs.BathGas).tagName
    }));
    // Create an add button to add a new PTpair.
    let addButton = (0, _htmlJs.createButton)(addString, level2);
    pTsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener("click", ()=>{
        // Create a new PTpair.
        let pTPairAttributes = new Map();
        pTPairAttributes.set("units", "Torr");
        let pTPair = new (0, _conditionsJs.PTpair)(pTPairAttributes);
        let pTPairIndex = pTs.addPTpair(pTPair);
        let pTPairDiv = (0, _htmlJs.createFlexDiv)(level2);
        addP(pTPairDiv, pTPair);
        addT(pTPairDiv, pTPair);
        addAnyUnits(undefined, pTPairAttributes, pTPairDiv, (0, _conditionsJs.PTpair).tagName, (0, _conditionsJs.PTpair).tagName, boundary1);
        // Create an add button for adding details.
        let addDetailsButton = (0, _htmlJs.createButton)(addString + " details", boundary1);
        pTPairDiv.appendChild(addDetailsButton);
        // Add event listener to the addDetailsButton.
        addDetailsButton.addEventListener("click", ()=>{
            let detailsDiv = document.createElement("div");
            addExcessReactantConc(pTPairDiv, pTPair);
            addPercentExcessReactantConc(pTPairDiv, pTPair);
            addPrecision(pTPairDiv, pTPair);
            addBathGas(pTPairDiv, pTPair);
            addExperimentRateButton(pTPairDiv, pTPair);
            pTPairDiv.insertBefore(detailsDiv, addDetailsButton);
            pTPairDiv.removeChild(addDetailsButton);
        });
        /*
        addExperimentRateButton.addEventListener('click', () => {
            let experimentRateDiv: HTMLDivElement = document.createElement("div");
            let experimentRate: ExperimentRate = new ExperimentRate(new Map(), NaN);
            pTPair.setExperimentRate(experimentRate);
            let experimentRateLabel: HTMLLabelElement = document.createElement('label');
            experimentRateLabel.textContent = ExperimentRate.tagName + ": ";
            experimentRateDiv.appendChild(experimentRateLabel);
            pTPairDiv.insertBefore(experimentRateDiv, addExperimentRateButton);
            pTPairDiv.removeChild(addExperimentRateButton);
        });
        pTPairDiv.appendChild(addExperimentRateDiv);
        */ // Add a remove button.
        let removeButton = (0, _htmlJs.createButton)(removeString, boundary1);
        removeButton.addEventListener("click", ()=>{
            pTsDiv.removeChild(pTPairDiv);
            pTs.removePTpair(pTPairIndex);
            pTPair.removeBathGas();
        });
        pTPairDiv.appendChild(removeButton);
        pTsDiv.appendChild(pTPairDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, _htmlJs.createButton)(s_Add_from_spreadsheet, boundary1);
    pTsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener("click", ()=>{
        // Add a new text input for the user to paste the PTPairs.
        let inputDiv = (0, _htmlJs.createFlexDiv)(level2);
        let addFromSpreadsheetId = (0, _conditionsJs.PTs).tagName + "_" + "addFromSpreadsheet";
        let inputElement = (0, _htmlJs.createInput)("text", addFromSpreadsheetId, level2);
        inputDiv.appendChild(inputElement);
        pTsDiv.insertBefore(inputDiv, addButton);
        // Add an event listener to the inputElement.
        inputElement.addEventListener("change", ()=>{
            console.log("inputElement.value=" + inputElement.value);
            console.log("inputElement.value.length=" + inputElement.value.length);
            if (inputElement.value.length > 0) {
                let pTPairsArray = inputElement.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTPairsArray[0].split("	").forEach((value, i)=>{
                    index.set(value, i);
                });
                console.log("pTPairsArray.length=" + pTPairsArray.length);
                for(let i = 1; i < pTPairsArray.length; i++){
                    let pTPairAttributes = new Map();
                    pTPairAttributes.set("units", "Torr");
                    let pTPair = new (0, _conditionsJs.PTpair)(pTPairAttributes);
                    let pTPairArray = pTPairsArray[i].split("	");
                    let pIndex = index.get("P");
                    let tIndex = index.get("T");
                    let bathGasIndex = index.get("me:bathGas");
                    let p = parseFloat(pTPairArray[pIndex]);
                    let t = parseFloat(pTPairArray[tIndex]);
                    pTPair.setP(p);
                    pTPair.setT(t);
                    if (index.has("me:bathGas")) {
                        let bathGas = pTPairArray[bathGasIndex];
                        pTPair.setBathGas(new (0, _conditionsJs.BathGas)(new Map(), bathGas));
                    }
                    console.log("pTPair=" + pTPair);
                    let pTPairDiv = (0, _htmlJs.createFlexDiv)(level2);
                    addP(pTPairDiv, pTPair);
                    addT(pTPairDiv, pTPair);
                    addAnyUnits(undefined, pTPairAttributes, pTPairDiv, (0, _conditionsJs.PTpair).tagName, (0, _conditionsJs.PTpair).tagName, boundary1);
                    addExcessReactantConc(pTPairDiv, pTPair);
                    addPercentExcessReactantConc(pTPairDiv, pTPair);
                    addPrecision(pTPairDiv, pTPair);
                    addBathGas(pTPairDiv, pTPair);
                    console.log(addButton); // Check the value of addButton
                    console.log(pTsDiv); // Check the value of pTsDiv
                    pTsDiv.insertBefore(pTPairDiv, addButton);
                    pTs.addPTpair(pTPair);
                }
                //pTs.addPTpairs(pTPairs);
                pTsDiv.removeChild(inputDiv);
            }
        });
    });
    let xml_PTss = xml_conditions.getElementsByTagName((0, _conditionsJs.PTs).tagName);
    if (xml_PTss.length > 0) {
        if (xml_PTss.length > 1) throw new Error("Expecting 1 " + (0, _conditionsJs.PTs).tagName + " but finding " + xml_PTss.length + "!");
        let pTsDiv = document.createElement("div");
        conditionsDiv.appendChild(pTsDiv);
        let attributes = (0, _xmlJs.getAttributes)(xml_PTss[0]);
        let xml_PTPairs = xml_PTss[0].getElementsByTagName((0, _conditionsJs.PTpair).tagName);
        if (xml_PTPairs.length == 0) throw new Error("Expecting 1 or more " + (0, _conditionsJs.PTpair).tagName + " but finding 0!");
        else {
            let pTs = new (0, _conditionsJs.PTs)(attributes);
            for(let i = 0; i < xml_PTPairs.length; i++){
                let pTPair = new (0, _conditionsJs.PTpair)((0, _xmlJs.getAttributes)(xml_PTPairs[i]));
                // Create a container div for P, T and units.
                let pTPairDiv = (0, _htmlJs.createFlexDiv)(level2);
                pTsDiv.appendChild(pTPairDiv);
                // Add any optional BathGas
                let xml_bathGass = xml_PTPairs[i].getElementsByTagName((0, _conditionsJs.BathGas).tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    // Add a label for the BathGas.
                    let bathGasLabel = document.createElement("label");
                    bathGasLabel.textContent = (0, _conditionsJs.BathGas).tagName + ": ";
                    pTPairDiv.appendChild(bathGasLabel);
                    let bathGasValue = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGass[0]));
                    let bathGas = new (0, _conditionsJs.BathGas)((0, _xmlJs.getAttributes)(xml_bathGass[0]), bathGasValue);
                    pTPair.setBathGas(bathGas);
                    // Create a HTMLSelectInput for the BathGas.
                    // Get the ids of all the molecules.
                    let moleculeIDs = new Set(molecules.keys());
                    let selectElement = (0, _htmlJs.createSelectElement)(Array.from(moleculeIDs), (0, _conditionsJs.BathGas).tagName, (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.BathGas).tagName, boundary1);
                    // Set the initial value.
                    selectElement.value = bathGas.value;
                    // Add event listener to selectElement.
                    selectElement.addEventListener("change", (event)=>{
                        if (event.target instanceof HTMLSelectElement) {
                            bathGas.value = event.target.value;
                            console.log("Set " + (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.BathGas).tagName + " to " + event.target.value);
                            (0, _htmlJs.resizeSelectElement)(event.target);
                        }
                    });
                    (0, _htmlJs.resizeSelectElement)(selectElement);
                    pTPairDiv.appendChild(selectElement);
                }
                // Add any optional ExperimentRate
                let xml_experimentRates = xml_PTPairs[i].getElementsByTagName((0, _conditionsJs.ExperimentRate).tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_experimentRates[0]));
                    let experimentRate = new (0, _conditionsJs.ExperimentRate)((0, _xmlJs.getAttributes)(xml_experimentRates[0]), parseFloat(valueString));
                    pTPair.setExperimentRate(experimentRate);
                    // Create a new div for the ExperimentRate.
                    let id = (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.ExperimentRate).tagName;
                    let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level0, (event)=>{
                        if (event.target instanceof HTMLInputElement) setNumberNode(experimentRate, event.target);
                    }, experimentRate.value.toString(), (0, _conditionsJs.ExperimentRate).tagName);
                    pTPairDiv.appendChild(inputDiv);
                }
                addP(pTPairDiv, pTPair);
                addT(pTPairDiv, pTPair);
                addAnyUnits(undefined, (0, _xmlJs.getAttributes)(xml_PTPairs[i]), pTPairDiv, (0, _conditionsJs.PTpair).tagName, (0, _conditionsJs.PTpair).tagName, boundary1);
                addExcessReactantConc(pTPairDiv, pTPair);
                addPercentExcessReactantConc(pTPairDiv, pTPair);
                addPrecision(pTPairDiv, pTPair);
                addBathGas(pTPairDiv, pTPair);
                pTs.addPTpair(pTPair);
                // Add the pTPairDiv to the pTsDiv.
                pTsDiv.appendChild(pTPairDiv);
            }
            conditions.setPTs(pTs);
        }
    }
    return conditionsDiv;
}
/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */ function addP(containerDiv, pTPair) {
    let pInputDiv = (0, _htmlJs.createLabelWithInput)("number", (0, _conditionsJs.PTpair).tagName + "_" + "P", boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if ((0, _utilJs.isNumeric)(event.target.value)) {
                pTPair.setP(parseFloat(event.target.value));
                console.log("Set P to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = pTPair.getP().toString();
            }
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    }, pTPair.getP().toString(), "P");
    let pInputElement = pInputDiv.querySelector("input");
    pInputElement.value = pTPair.getP().toString();
    (0, _htmlJs.resizeInputElement)(pInputElement);
    containerDiv.appendChild(pInputDiv);
}
/**
 * @param containerDiv The container div.
 * @param pTPair The PTpair.
 */ function addT(containerDiv, pTPair) {
    let tInputDiv = (0, _htmlJs.createLabelWithInput)("number", (0, _conditionsJs.PTpair).tagName + "_" + "T", boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if ((0, _utilJs.isNumeric)(event.target.value)) {
                pTPair.setT(parseFloat(event.target.value));
                console.log("Set T to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = pTPair.getT().toString();
            }
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    }, pTPair.getT().toString(), "T");
    let tInputElement = tInputDiv.querySelector("input");
    tInputElement.value = pTPair.getT().toString();
    (0, _htmlJs.resizeInputElement)(tInputElement);
    containerDiv.appendChild(tInputDiv);
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function addExcessReactantConc(pTPairDiv, pTPair) {
    let button = (0, _htmlJs.createButton)(addString + " " + (0, _reactionJs.ExcessReactantConc).tagName, boundary1);
    pTPairDiv.append(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let excessReactantConcLabel = document.createElement("label");
        excessReactantConcLabel.textContent = "excessReactantConc: ";
        pTPairDiv.appendChild(excessReactantConcLabel);
        let excessReactantConcInput = (0, _htmlJs.createInput)("number", (0, _conditionsJs.PTpair).tagName + "_" + (0, _reactionJs.ExcessReactantConc).tagName, boundary1);
        excessReactantConcInput.value = NaN.toString();
        excessReactantConcInput.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLInputElement) {
                pTPair.setExcessReactantConc(event.target.value);
                console.log("Set excessReactantConc to " + event.target.value);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        });
        (0, _htmlJs.resizeInputElement)(excessReactantConcInput);
        pTPairDiv.appendChild(excessReactantConcInput);
        // Add a remove button.
        let removeButton = (0, _htmlJs.createButton)(removeSymbol, boundary1);
        removeButton.addEventListener("click", ()=>{
            pTPairDiv.removeChild(excessReactantConcLabel);
            pTPairDiv.removeChild(excessReactantConcInput);
            pTPairDiv.removeChild(removeButton);
            addExcessReactantConc(pTPairDiv, pTPair);
        });
        pTPairDiv.appendChild(removeButton);
        // Remove the add button.
        pTPairDiv.removeChild(button);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function addPercentExcessReactantConc(pTPairDiv, pTPair) {
    let button = (0, _htmlJs.createButton)(addString + " percentExcessReactantConc", boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let percentExcessReactantConcLabel = document.createElement("label");
        percentExcessReactantConcLabel.textContent = "percentExcessReactantConc: ";
        pTPairDiv.appendChild(percentExcessReactantConcLabel);
        let percentExcessReactantConcInput = (0, _htmlJs.createInput)("number", (0, _conditionsJs.PTpair).tagName + "_" + "percentExcessReactantConc", boundary1);
        percentExcessReactantConcInput.value = NaN.toString();
        percentExcessReactantConcInput.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLInputElement) {
                pTPair.setPercentExcessReactantConc(event.target.value);
                console.log("Set percentExcessReactantConc to " + event.target.value);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        });
        (0, _htmlJs.resizeInputElement)(percentExcessReactantConcInput);
        pTPairDiv.appendChild(percentExcessReactantConcInput);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function addPrecision(pTPairDiv, pTPair) {
    let button = (0, _htmlJs.createButton)(addString + " " + "precision", boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let precisionLabel = document.createElement("label");
        precisionLabel.textContent = "Precision: ";
        pTPairDiv.appendChild(precisionLabel);
        let precisionInput = (0, _htmlJs.createInput)("number", (0, _conditionsJs.PTpair).tagName + "_" + "precision", boundary1);
        precisionInput.value = NaN.toString();
        precisionInput.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLInputElement) {
                pTPair.setPrecision(event.target.value);
                console.log("Set Precision to " + event.target.value);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        });
        (0, _htmlJs.resizeInputElement)(precisionInput);
        pTPairDiv.appendChild(precisionInput);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function addBathGas(pTPairDiv, pTPair) {
    let button = (0, _htmlJs.createButton)(addString + " " + (0, _conditionsJs.BathGas).tagName, boundary1);
    pTPairDiv.appendChild(button);
    // Add event listener to the addBathGasButton.
    button.addEventListener("click", ()=>{
        let bathGasDiv = document.createElement("div");
        let bathGas = new (0, _conditionsJs.BathGas)(new Map(), "");
        pTPair.setBathGas(bathGas);
        let bathGasLabel = document.createElement("label");
        bathGasLabel.textContent = (0, _conditionsJs.BathGas).tagName + ": ";
        bathGasDiv.appendChild(bathGasLabel);
        pTPairDiv.insertBefore(bathGasDiv, button);
        // Create a HTMLSelectInput for the BathGas.
        // Get the ids of all the molecules.
        let moleculeIDs = new Set(molecules.keys());
        let selectElement = (0, _htmlJs.createSelectElement)(Array.from(moleculeIDs), (0, _conditionsJs.BathGas).tagName, (0, _conditionsJs.PTs).tagName + "_" + (0, _conditionsJs.BathGas).tagName, boundary1);
        // Set the initial value.
        selectElement.value = bathGas.value;
        // Add event listener to selectElement.
        selectElement.addEventListener("change", (event)=>{
            if (event.target instanceof HTMLSelectElement) {
                bathGas.value = event.target.value;
                console.log("Added " + event.target.value + " as a " + (0, _conditionsJs.BathGas).tagName);
                (0, _htmlJs.resizeSelectElement)(event.target);
            }
        });
        (0, _htmlJs.resizeSelectElement)(selectElement);
        bathGasDiv.appendChild(selectElement);
        pTPairDiv.insertBefore(bathGasDiv, button);
        pTPairDiv.removeChild(button);
    });
}
/**
 * @param pTPairDiv The PTpair div.
 * @param pTPair The PTpair.
 */ function addExperimentRateButton(pTPairDiv, pTPair) {
    let button = (0, _htmlJs.createButton)(addString + " " + (0, _conditionsJs.ExperimentRate).tagName, boundary1);
    //let addExperimentRateDiv: HTMLDivElement = document.createElement("div");
    //addExperimentRateDiv.appendChild(addExperimentRateButton);
    // Add event listener to the addExperimentRateButton.
    button.addEventListener("click", ()=>{
        let experimentRateDiv = document.createElement("div");
        experimentRateDiv.style.marginLeft = margin5;
        let experimentRate = new (0, _conditionsJs.ExperimentRate)(new Map(), NaN);
        pTPair.setExperimentRate(experimentRate);
        // Create a new div element for the input.
        let id = (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.ExperimentRate).tagName;
        let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, boundary1, level3, (event)=>{
            if (event.target instanceof HTMLInputElement) setNumberNode(experimentRate, event.target);
        }, "", (0, _conditionsJs.ExperimentRate).tagName);
        pTPairDiv.insertBefore(experimentRateDiv, button);
        pTPairDiv.removeChild(button);
    });
/*
    pTsDiv.appendChild(button);
    pTPairDiv.appendChild(button);
    // Add the pTPairDiv to the pTsDiv.
    pTsDiv.insertBefore(pTPairDiv, addButton);
    */ }
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ function processModelParameters(xml) {
    console.log((0, _modelParametersJs.ModelParameters).tagName);
    let modelParametersDiv = (0, _htmlJs.createDiv)(boundary1);
    let xml_modelParameters = (0, _xmlJs.getSingularElement)(xml, (0, _modelParametersJs.ModelParameters).tagName);
    let modelParameters = new (0, _modelParametersJs.ModelParameters)((0, _xmlJs.getAttributes)(xml_modelParameters));
    mesmer.setModelParameters(modelParameters);
    processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    // Process any "me:automaticallySetMaxEne" element.
    let xml_automaticallySetMaxEnes = xml_modelParameters.getElementsByTagName((0, _controlJs.AutomaticallySetMaxEne).tagName);
    if (xml_automaticallySetMaxEnes.length > 0) {
        if (xml_automaticallySetMaxEnes.length > 1) throw new Error("Expecting 1 " + (0, _controlJs.AutomaticallySetMaxEne).tagName + " but finding " + xml_automaticallySetMaxEnes.length + "!");
        let automaticallySetMaxEneAttributes = (0, _xmlJs.getAttributes)(xml_automaticallySetMaxEnes[0]);
        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_automaticallySetMaxEnes[0])));
        let automaticallySetMaxEne = new (0, _controlJs.AutomaticallySetMaxEne)(automaticallySetMaxEneAttributes, value);
        modelParameters.setAutomaticallySetMaxEne(automaticallySetMaxEne);
        // Create a new div for the automaticallySetMaxEne.
        let automaticallySetMaxEneId = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _controlJs.AutomaticallySetMaxEne).tagName;
        let lwi = (0, _htmlJs.createLabelWithInput)("number", automaticallySetMaxEneId, boundary1, level1, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(automaticallySetMaxEne, event.target);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, value.toString(), (0, _controlJs.AutomaticallySetMaxEne).tagName);
        // Add any units. 
        addAnyUnits(undefined, automaticallySetMaxEneAttributes, lwi, (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _controlJs.AutomaticallySetMaxEne).tagName, (0, _controlJs.AutomaticallySetMaxEne).tagName, boundary1);
        modelParametersDiv.appendChild(lwi);
    }
    // Process any "me:energyAboveTheTopHill" element.
    let xml_energyAboveTheTopHills = xml_modelParameters.getElementsByTagName((0, _modelParametersJs.EnergyAboveTheTopHill).tagName);
    if (xml_energyAboveTheTopHills.length > 0) {
        if (xml_energyAboveTheTopHills.length > 1) throw new Error("Expecting 1 " + (0, _modelParametersJs.EnergyAboveTheTopHill).tagName + " but finding " + xml_energyAboveTheTopHills.length + "!");
        let energyAboveTheTopHillAttributes = (0, _xmlJs.getAttributes)(xml_energyAboveTheTopHills[0]);
        let energyAboveTheTopHillValue = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_energyAboveTheTopHills[0])));
        let energyAboveTheTopHill = new (0, _modelParametersJs.EnergyAboveTheTopHill)(energyAboveTheTopHillAttributes, energyAboveTheTopHillValue);
        modelParameters.setEnergyAboveTheTopHill(energyAboveTheTopHill);
        // Create a new div for the energyAboveTheTopHill.
        let energyAboveTheTopHillId = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.EnergyAboveTheTopHill).tagName;
        let lwi = (0, _htmlJs.createLabelWithInput)("number", energyAboveTheTopHillId, boundary1, level1, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(energyAboveTheTopHill, event.target);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, energyAboveTheTopHill.value.toString(), (0, _modelParametersJs.EnergyAboveTheTopHill).tagName);
        // Add any units. The default units are "kT".
        addAnyUnits([
            "kT"
        ], energyAboveTheTopHillAttributes, lwi, (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.EnergyAboveTheTopHill).tagName, (0, _modelParametersJs.EnergyAboveTheTopHill).tagName, boundary1);
        modelParametersDiv.appendChild(lwi);
    }
    // Process any "me:maxTemperature" element.
    let xml_maxTemperatures = xml_modelParameters.getElementsByTagName((0, _modelParametersJs.MaxTemperature).tagName);
    if (xml_maxTemperatures.length > 0) {
        if (xml_maxTemperatures.length > 1) throw new Error("Expecting 1 " + (0, _modelParametersJs.MaxTemperature).tagName + " but finding " + xml_maxTemperatures.length + "!");
        let maxTemperatureAttributes = (0, _xmlJs.getAttributes)(xml_maxTemperatures[0]);
        let maxTemperatureValue = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_maxTemperatures[0])));
        let maxTemperature = new (0, _modelParametersJs.MaxTemperature)(maxTemperatureAttributes, maxTemperatureValue);
        modelParameters.setMaxTemperature(maxTemperature);
        // Create a new div for the maxTemperature.
        let maxTemperatureId = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.MaxTemperature).tagName;
        let lwi = (0, _htmlJs.createLabelWithInput)("number", maxTemperatureId, boundary1, level1, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(maxTemperature, event.target);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, maxTemperature.value.toString(), (0, _modelParametersJs.MaxTemperature).tagName);
        // Add any units
        addAnyUnits(undefined, maxTemperatureAttributes, lwi, (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.MaxTemperature).tagName, (0, _modelParametersJs.MaxTemperature).tagName, boundary1);
        modelParametersDiv.appendChild(lwi);
    }
    return modelParametersDiv;
}
/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */ function processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, _htmlJs.createFlexDiv)(level1);
    modelParametersDiv.appendChild(div);
    let xml = xml_modelParameters.getElementsByTagName((0, _modelParametersJs.GrainSize).tagName);
    let gs;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        gs = new (0, _modelParametersJs.GrainSize)((0, _xmlJs.getAttributes)(xml[0]), value);
        modelParameters.setGrainSize(gs);
    } else {
        valueString = "";
        gs = new (0, _modelParametersJs.GrainSize)(new Map(), NaN);
    }
    // Create a input checkbox for the DiagramEnergyOffset.
    let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.GrainSize).tagName + "_checkbox";
    let idI = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.GrainSize).tagName + "_input";
    let idS = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.GrainSize).tagName + "_SelectUnits";
    let lwi = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) createGrainSizeInput(modelParameters, div, gs, idI, idS, valueString);
            else {
                modelParameters.removeGrainSize();
                // Remove any existing div.
                let e = document.getElementById(idI);
                if (e != null) e.remove();
                e = document.getElementById(idS);
                if (e != null) e.remove();
            }
        }
    }, "", (0, _modelParametersJs.GrainSize).tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) createGrainSizeInput(modelParameters, div, gs, idI, idS, valueString);
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param gs The grain size.
 * @param id The id.
 * @param idS The id for the select units.
 * @param valueString The value string.
 */ function createGrainSizeInput(modelParameters, div, gs, id, idS, valueString) {
    modelParameters.setGrainSize(gs);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(gs, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits((0, _moleculeJs.ZPE).units, gs.attributes, div, idS, (0, _modelParametersJs.GrainSize).tagName, boundary1);
}
/**
 * Parses xml to initialise controls.
 * @param xml The XML document.
 * @returns The controls div.
 * 
 * Tag control options:
 * me:calculateRateCoefficientsOnly
 * me:printCellDOS
 * me:printCellTransitionStateFlux
 * me:printReactionOperatorColumnSums
 * me:printGrainBoltzmann
 * me:printGrainDOS
 * me:printGrainkbE
 * me:printGrainkfE
 * me:printTSsos
 * me:printGrainedSpeciesProfile
 * me:printGrainTransitionStateFlux
 * me:printReactionOperatorSize
 * me:printSpeciesProfile
 * me:printPhenomenologicalEvolution
 * me:printTunnelingCoefficients
 * me:printCrossingCoefficients
 * me:testDOS
 * me:testRateConstants
 * me:useTheSameCellNumberForAllConditions
 * me:hideInactive
 * me:ForceMacroDetailedBalance
 * 
 * TagWithAttribute control options:
 * me:testMicroRates
 * 
 * StringNode control options:
 * me:calcMethod "simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation", "ThermodynamicTable", "sensitivityAnalysis"
 * 
 * NumberNode control options:
 * me:eigenvalues
 * me:shortestTimeOfInterest
 * me:MaximumEvolutionTime
 * me:automaticallySetMaxEne
 * me:diagramEnergyOffset
 */ function processControl(xml) {
    console.log((0, _controlJs.Control).tagName);
    // Create div to contain the controls.
    let controlsDiv = (0, _htmlJs.createDiv)(boundary1);
    // Get the XML "me:control" element.
    let xml_control = (0, _xmlJs.getSingularElement)(xml, (0, _controlJs.Control).tagName);
    let control = new (0, _controlJs.Control)((0, _xmlJs.getAttributes)(xml_control));
    mesmer.setControl(control);
    processCalculateRateCoefficientsOnly(control, controlsDiv, xml_control);
    processPrintCellDOS(control, controlsDiv, xml_control);
    processPrintCellTransitionStateFlux(control, controlsDiv, xml_control);
    processPrintReactionOperatorColumnSums(control, controlsDiv, xml_control);
    processPrintGrainBoltzmann(control, controlsDiv, xml_control);
    processPrintGrainDOS(control, controlsDiv, xml_control);
    processPrintGrainkbE(control, controlsDiv, xml_control);
    processPrintGrainkfE(control, controlsDiv, xml_control);
    processPrintTSsos(control, controlsDiv, xml_control);
    processPrintGrainedSpeciesProfile(control, controlsDiv, xml_control);
    processPrintGrainTransitionStateFlux(control, controlsDiv, xml_control);
    processPrintReactionOperatorSize(control, controlsDiv, xml_control);
    processPrintSpeciesProfile(control, controlsDiv, xml_control);
    processPrintPhenomenologicalEvolution(control, controlsDiv, xml_control);
    processPrintTunnelingCoefficients(control, controlsDiv, xml_control);
    processPrintCrossingCoefficients(control, controlsDiv, xml_control);
    processTestDOS(control, controlsDiv, xml_control);
    processTestRateConstants(control, controlsDiv, xml_control);
    processUseTheSameCellNumberForAllConditions(control, controlsDiv, xml_control);
    processHideInactive(control, controlsDiv, xml_control);
    processForceMacroDetailedBalance(control, controlsDiv, xml_control);
    processTestMicroRates(control, controlsDiv, xml_control);
    processCalcMethod(control, controlsDiv, xml_control);
    processEigenvalues(control, controlsDiv, xml_control);
    processShortestTimeOfInterest(control, controlsDiv, xml_control);
    processMaximumEvolutionTime(control, controlsDiv, xml_control);
    processAutomaticallySetMaxEne(control, controlsDiv, xml_control);
    processDiagramEnergyOffset(control, controlsDiv, xml_control);
    return controlsDiv;
}
/**
 * Set the check box.
 * @param input The input div.
 * @param xml_control The xml.
 */ function setCheck(input, xml) {
    let cb = input.querySelector("input");
    if (xml.length > 0) {
        if (xml.length > 1) console.error("xml.length=" + xml.length);
        cb.checked = true;
        return true;
    }
    return false;
}
/**
 * Process "me:calculateRateCoefficientsOnly".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processCalculateRateCoefficientsOnly(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.CalculateRateCoefficientsOnly).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setCalculateRateCoefficientsOnly(new (0, _controlJs.CalculateRateCoefficientsOnly)());
            else control.removeCalculateRateCoefficientsOnly();
        }
    }, "", (0, _controlJs.CalculateRateCoefficientsOnly).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.CalculateRateCoefficientsOnly).tagName))) control.setCalculateRateCoefficientsOnly(new (0, _controlJs.CalculateRateCoefficientsOnly)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printCellDOS".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintCellDOS(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintCellDOS).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintCellDOS(new (0, _controlJs.PrintCellDOS)());
            else control.removePrintCellDOS();
        }
    }, "", (0, _controlJs.PrintCellDOS).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintCellDOS).tagName))) control.setPrintCellDOS(new (0, _controlJs.PrintCellDOS)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printCellTransitionStateFlux".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintCellTransitionStateFlux(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintCellTransitionStateFlux).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintCellTransitionStateFlux(new (0, _controlJs.PrintCellTransitionStateFlux)());
            else control.removePrintCellTransitionStateFlux();
        }
    }, "", (0, _controlJs.PrintCellTransitionStateFlux).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintCellTransitionStateFlux).tagName))) control.setPrintCellTransitionStateFlux(new (0, _controlJs.PrintCellTransitionStateFlux)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printReactionOperatorColumnSums".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintReactionOperatorColumnSums(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintReactionOperatorColumnSums).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintReactionOperatorColumnSums(new (0, _controlJs.PrintReactionOperatorColumnSums)());
            else control.removePrintReactionOperatorColumnSums();
        }
    }, "", (0, _controlJs.PrintReactionOperatorColumnSums).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintReactionOperatorColumnSums).tagName))) control.setPrintReactionOperatorColumnSums(new (0, _controlJs.PrintReactionOperatorColumnSums)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printGrainBoltzmann".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintGrainBoltzmann(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintGrainBoltzmann).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainBoltzmann(new (0, _controlJs.PrintGrainBoltzmann)());
            else control.removePrintGrainBoltzmann();
        }
    }, "", (0, _controlJs.PrintGrainBoltzmann).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintGrainBoltzmann).tagName))) control.setPrintGrainBoltzmann(new (0, _controlJs.PrintGrainBoltzmann)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printGrainDOS".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintGrainDOS(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintGrainDOS).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainDOS(new (0, _controlJs.PrintGrainDOS)());
            else control.removePrintGrainDOS();
        }
    }, "", (0, _controlJs.PrintGrainDOS).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintGrainDOS).tagName))) control.setPrintGrainDOS(new (0, _controlJs.PrintGrainDOS)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printGrainkbE".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintGrainkbE(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintGrainkbE).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainkbE(new (0, _controlJs.PrintGrainkbE)());
            else control.removePrintGrainkbE();
        }
    }, "", (0, _controlJs.PrintGrainkbE).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintGrainkbE).tagName))) control.setPrintGrainkbE(new (0, _controlJs.PrintGrainkbE)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printGrainkfE".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintGrainkfE(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintGrainkfE).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainkfE(new (0, _controlJs.PrintGrainkfE)());
            else control.removePrintGrainkfE();
        }
    }, "", (0, _controlJs.PrintGrainkfE).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintGrainkfE).tagName))) control.setPrintGrainkfE(new (0, _controlJs.PrintGrainkfE)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printTSsos".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintTSsos(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintTSsos).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintTSsos(new (0, _controlJs.PrintTSsos)());
            else control.removePrintTSsos();
        }
    }, "", (0, _controlJs.PrintTSsos).tagName);
    setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintTSsos).tagName));
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintTSsos).tagName))) control.setPrintTSsos(new (0, _controlJs.PrintTSsos)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printGrainedSpeciesProfile".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintGrainedSpeciesProfile(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintGrainedSpeciesProfile).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainedSpeciesProfile(new (0, _controlJs.PrintGrainedSpeciesProfile)());
            else control.removePrintGrainedSpeciesProfile();
        }
    }, "", (0, _controlJs.PrintGrainedSpeciesProfile).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintGrainedSpeciesProfile).tagName))) control.setPrintGrainedSpeciesProfile(new (0, _controlJs.PrintGrainedSpeciesProfile)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printGrainTransitionStateFlux".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintGrainTransitionStateFlux(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintGrainTransitionStateFlux).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainTransitionStateFlux(new (0, _controlJs.PrintGrainTransitionStateFlux)());
            else control.removePrintGrainTransitionStateFlux();
        }
    }, "", (0, _controlJs.PrintGrainTransitionStateFlux).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintGrainTransitionStateFlux).tagName))) control.setPrintGrainTransitionStateFlux(new (0, _controlJs.PrintGrainTransitionStateFlux)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printReactionOperatorSize".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintReactionOperatorSize(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintReactionOperatorSize).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintReactionOperatorSize(new (0, _controlJs.PrintReactionOperatorSize)());
            else control.removePrintReactionOperatorSize();
        }
    }, "", (0, _controlJs.PrintReactionOperatorSize).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintReactionOperatorSize).tagName))) control.setPrintReactionOperatorSize(new (0, _controlJs.PrintReactionOperatorSize)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printSpeciesProfile".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintSpeciesProfile(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintSpeciesProfile).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintSpeciesProfile(new (0, _controlJs.PrintSpeciesProfile)());
            else control.removePrintSpeciesProfile();
        }
    }, "", (0, _controlJs.PrintSpeciesProfile).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintSpeciesProfile).tagName))) control.setPrintSpeciesProfile(new (0, _controlJs.PrintSpeciesProfile)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printPhenomenologicalEvolution".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintPhenomenologicalEvolution(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintPhenomenologicalEvolution).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintPhenomenologicalEvolution(new (0, _controlJs.PrintPhenomenologicalEvolution)());
            else control.removePrintPhenomenologicalEvolution();
        }
    }, "", (0, _controlJs.PrintPhenomenologicalEvolution).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintPhenomenologicalEvolution).tagName))) control.setPrintPhenomenologicalEvolution(new (0, _controlJs.PrintPhenomenologicalEvolution)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printTunnelingCoefficients".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintTunnelingCoefficients(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintTunnelingCoefficients).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintTunnelingCoefficients(new (0, _controlJs.PrintTunnelingCoefficients)());
            else control.removePrintTunnelingCoefficients();
        }
    }, "", (0, _controlJs.PrintTunnelingCoefficients).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintTunnelingCoefficients).tagName))) control.setPrintTunnelingCoefficients(new (0, _controlJs.PrintTunnelingCoefficients)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:printCrossingCoefficients".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processPrintCrossingCoefficients(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.PrintCrossingCoefficients).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintCrossingCoefficients(new (0, _controlJs.PrintCrossingCoefficients)());
            else control.removePrintCrossingCoefficients();
        }
    }, "", (0, _controlJs.PrintCrossingCoefficients).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.PrintCrossingCoefficients).tagName))) control.setPrintCrossingCoefficients(new (0, _controlJs.PrintCrossingCoefficients)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:testDOS".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processTestDOS(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.TestDOS).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setTestDOS(new (0, _controlJs.TestDOS)());
            else control.removeTestDOS();
        }
    }, "", (0, _controlJs.TestDOS).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.TestDOS).tagName))) control.setTestDOS(new (0, _controlJs.TestDOS)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:testRateConstants".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processTestRateConstants(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.TestRateConstants).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setTestRateConstants(new (0, _controlJs.TestRateConstants)());
            else control.removeTestRateConstants();
        }
    }, "", (0, _controlJs.TestRateConstants).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.TestRateConstants).tagName))) control.setTestRateConstants(new (0, _controlJs.TestRateConstants)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:useTheSameCellNumberForAllConditions".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processUseTheSameCellNumberForAllConditions(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.UseTheSameCellNumberForAllConditions).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setUseTheSameCellNumberForAllConditions(new (0, _controlJs.UseTheSameCellNumberForAllConditions)());
            else control.removeUseTheSameCellNumberForAllConditions();
        }
    }, "", (0, _controlJs.UseTheSameCellNumberForAllConditions).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.UseTheSameCellNumberForAllConditions).tagName))) control.setUseTheSameCellNumberForAllConditions(new (0, _controlJs.UseTheSameCellNumberForAllConditions)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:hideInactive".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processHideInactive(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.HideInactive).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setHideInactive(new (0, _controlJs.HideInactive)());
            else control.removeHideInactive();
        }
    }, "", (0, _controlJs.HideInactive).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.HideInactive).tagName))) control.setHideInactive(new (0, _controlJs.HideInactive)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:forceMacroDetailedBalance".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processForceMacroDetailedBalance(control, controlsDiv, xml_control) {
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.ForceMacroDetailedBalance).tagName + "_checkbox";
    let input = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level1, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setForceMacroDetailedBalance(new (0, _controlJs.ForceMacroDetailedBalance)());
            else control.removeForceMacroDetailedBalance();
        }
    }, "", (0, _controlJs.ForceMacroDetailedBalance).tagName);
    if (setCheck(input, xml_control.getElementsByTagName((0, _controlJs.ForceMacroDetailedBalance).tagName))) control.setForceMacroDetailedBalance(new (0, _controlJs.ForceMacroDetailedBalance)());
    controlsDiv.appendChild(input);
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processTestMicroRates(control, controlsDiv, xml_control) {
    let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.TestMicroRates).tagName + "_checkbox";
    let idTmax = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.TestMicroRates).tagName + "_Tmax";
    let idTmin = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.TestMicroRates).tagName + "_Tmin";
    let idTstep = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.TestMicroRates).tagName + "_Tstep";
    let xml_tmr = xml_control.getElementsByTagName((0, _controlJs.TestMicroRates).tagName);
    let lwi = (0, _htmlJs.createLabelWithInput)("checkbox", id, boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) createTestMicroRates(div, xml_tmr, idTmax, idTmin, idTstep, control);
            else {
                control.removeTestMicroRates();
                // Remove any existing Tmax.
                let e;
                e = document.getElementById(idTmax);
                if (e != null) e.remove();
                // Remove any existing Tmin.
                e = document.getElementById(idTmin);
                if (e != null) e.remove();
                // Remove any existing Tstep.
                e = document.getElementById(idTstep);
                if (e != null) e.remove();
            }
        }
    }, "", (0, _controlJs.TestMicroRates).tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml_tmr)) createTestMicroRates(div, xml_tmr, idTmax, idTmin, idTstep, control);
}
/**
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 * @param control The control.
 */ function createTestMicroRates(div, xml_tmr, idTmax, idTmin, idTstep, control) {
    let attributes;
    let tmr;
    if (xml_tmr.length == 1) {
        attributes = (0, _xmlJs.getAttributes)(xml_tmr[0]);
        tmr = new (0, _controlJs.TestMicroRates)(attributes);
    } else {
        attributes = new Map();
        attributes.set("Tmax", "");
        attributes.set("Tmin", "");
        attributes.set("Tstep", "");
        tmr = new (0, _controlJs.TestMicroRates)(attributes);
    }
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, _htmlJs.createLabelWithInput)("number", idTmax + "_input", boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            // Check the value is a number.
            if ((0, _utilJs.isNumeric)(event.target.value)) {
                tmr.setTmax(parseFloat(event.target.value));
                console.log("Set Tmax to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = tMax.toString();
            }
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    }, tMax.toString(), "Tmax");
    tMaxlwi.id = idTmax;
    (0, _htmlJs.resizeInputElement)(tMaxlwi.querySelector("input"));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, _htmlJs.createLabelWithInput)("number", idTmin + "_input", boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            // Check the value is a number.
            if ((0, _utilJs.isNumeric)(event.target.value)) {
                tmr.setTmin(parseFloat(event.target.value));
                console.log("Set Tmin to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = tMax.toString();
            }
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    }, tMin.toString(), "Tmin");
    tMinlwi.id = idTmin;
    (0, _htmlJs.resizeInputElement)(tMinlwi.querySelector("input"));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, _htmlJs.createLabelWithInput)("number", idTstep + "_input", boundary1, level0, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            // Check the value is a number.
            if ((0, _utilJs.isNumeric)(event.target.value)) {
                tmr.setTstep(parseFloat(event.target.value));
                console.log("Set Tstep to " + event.target.value);
            } else {
                alert("Value is not numeric, resetting...");
                event.target.value = tMax.toString();
            }
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    }, tStep.toString(), "Tstep");
    tSteplwi.id = idTstep;
    (0, _htmlJs.resizeInputElement)(tSteplwi.querySelector("input"));
    div.appendChild(tSteplwi);
    control.setTestMicroRates(tmr);
}
/**
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processCalcMethod(control, controlsDiv, xml_control) {
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let id = Control.tagName + "_" + CalcMethod.tagName + "_checkbox";
    let idI = Control.tagName + "_" + CalcMethod.tagName + "_input";
    let xml_cm: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(CalcMethod.tagName);
    let cm: CalcMethod;
    if (xml_cm.length == 1) {
        cm = new CalcMethod(getAttributes(xml_cm[0]), getNodeValue(getFirstChildNode(xml_cm[0])));
    } else {
        cm = new CalcMethod(new Map(), "");
    }
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createCalcMethodInput(control, div, cm, idI, cm.value);
            } else {
                control.removeTestMicroRates();
                // Remove any existing CalcMethod select.
                let e: HTMLDivElement;
                e = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", CalcMethod.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml_cm)) {
        createCalcMethodInput(control, div, cm, idI, cm.value);
    }
    */ let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName((0, _controlJs.CalcMethod).tagName);
    let lwb = (0, _htmlJs.createLabelWithButton)((0, _controlJs.CalcMethod).tagName, "", boundary1, boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let options = (0, _controlJs.CalcMethod).options;
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.CalcMethod).tagName + "_input";
    let cm;
    let first = true;
    if (xml.length == 1) {
        let value = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        cm = new (0, _controlJs.CalcMethod)((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = selected + selectedLoadedValueText;
        first = createCalcMethodInput(control, options, div, cm, id, value, first);
        button.classList.toggle("optionOff");
    } else {
        cm = new (0, _controlJs.CalcMethod)(new Map(), selectAnotherOption);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle("optionOn");
    }
    let valueString = cm.value;
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the CalcMethod already exists
        if (!control.index.has((0, _controlJs.CalcMethod).tagName)) {
            if (first) options.push(selectAnotherOption);
            first = createCalcMethodInput(control, options, div, cm, id, valueString, first);
            button.textContent = selected + selectedValueText;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = cm.value;
            control.removeCalcMethod();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = notSelected + unselectedText;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param eigenvalues The eigenvalues.
 * @param id The id.
 * @param valueString The value string. 
 */ function createCalcMethodInput(control, options, div, cm, id, valueString, first) {
    let select = (0, _htmlJs.createSelectElement)(options, valueString, id, boundary1);
    select.addEventListener("click", ()=>{
        if (options[options.length - 1] == selectAnotherOption) options.pop();
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == selectAnotherOption) select.remove(lastIndex);
    });
    select.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLSelectElement) {
            cm.value = event.target.value;
            (0, _htmlJs.resizeSelectElement)(event.target);
        }
    });
    select.value = valueString;
    console.log("Value: " + valueString);
    (0, _htmlJs.resizeSelectElement)(select);
    div.appendChild(select);
    control.setCalcMethod(cm);
    return false;
}
/**
 * Process "me:eigenvalues".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processEigenvalues(control, controlsDiv, xml_control) {
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(Eigenvalues.tagName);
    let eigenvalues: Eigenvalues;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        eigenvalues = new Eigenvalues(getAttributes(xml[0]), value);
        control.setEigenvalues(eigenvalues);
    } else {
        valueString = "";
        eigenvalues = new Eigenvalues(new Map(), NaN);
    }
    // Create a input checkbox for the Eigenvalues.
    let id = Control.tagName + "_" + Eigenvalues.tagName + "_checkbox";
    let idI = Control.tagName + "_" + Eigenvalues.tagName + "_input";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createEigenValuesInput(control, div, eigenvalues, idI, valueString);
            } else {
                control.removeEigenvalues();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", Eigenvalues.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createEigenValuesInput(control, div, eigenvalues, idI, valueString);
    }
    */ let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName((0, _controlJs.Eigenvalues).tagName);
    let lwb = (0, _htmlJs.createLabelWithButton)((0, _controlJs.Eigenvalues).tagName, "", boundary1, boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.Eigenvalues).tagName + "_input";
    let eigenvalues;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        eigenvalues = new (0, _controlJs.Eigenvalues)((0, _xmlJs.getAttributes)(xml[0]), value);
        control.setEigenvalues(eigenvalues);
        button.textContent = selected + selectedLoadedValueText;
        createEigenValuesInput(control, div, eigenvalues, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        eigenvalues = new (0, _controlJs.Eigenvalues)(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        //let idIB = Control.tagName + "_" + Eigenvalues.tagName + "_input_infoButton";
        let infoButton = (0, _htmlJs.createButton)(specifyNumberText, boundary1);
        //infoButton.id = idIB;
        div.appendChild(infoButton);
        infoButton.addEventListener("click", (event)=>{
            div.removeChild(infoButton);
        });
        // Check if the Eigenvalues already exists
        if (!control.index.has((0, _controlJs.Eigenvalues).tagName)) {
            createEigenValuesInput(control, div, eigenvalues, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = eigenvalues.value.toString();
            control.removeEigenvalues();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = notSelected + unselectedText;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param eigenvalues The eigenvalues.
 * @param id The id.
 * @param valueString The value string. 
 */ function createEigenValuesInput(control, div, eigenvalues, id, valueString) {
    control.setEigenvalues(eigenvalues);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(eigenvalues, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:shortestTimeOfInterest".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processShortestTimeOfInterest(control, controlsDiv, xml_control) {
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(ShortestTimeOfInterest.tagName);
    let stoi: ShortestTimeOfInterest;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        stoi = new ShortestTimeOfInterest(getAttributes(xml[0]), value);
        control.setShortestTimeOfInterest(stoi);
    } else {
        valueString = "";
        stoi = new ShortestTimeOfInterest(new Map(), NaN);
    }
    // Create a input checkbox for the ShortestTimeOfInterest.
    let id = Control.tagName + "_" + ShortestTimeOfInterest.tagName + "_checkbox";
    let idI = Control.tagName + "_" + ShortestTimeOfInterest.tagName + "_input";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createShortestTimeOfInterest(control, div, stoi, idI, valueString);
            } else {
                control.removeShortestTimeOfInterest();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", ShortestTimeOfInterest.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createShortestTimeOfInterest(control, div, stoi, idI, valueString);
    }
    */ let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName((0, _controlJs.ShortestTimeOfInterest).tagName);
    let lwb = (0, _htmlJs.createLabelWithButton)((0, _controlJs.ShortestTimeOfInterest).tagName, "", boundary1, boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.ShortestTimeOfInterest).tagName + "_input";
    let stoi;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        stoi = new (0, _controlJs.ShortestTimeOfInterest)((0, _xmlJs.getAttributes)(xml[0]), value);
        control.setShortestTimeOfInterest(stoi);
        button.textContent = selected + selectedLoadedValueText;
        createShortestTimeOfInterest(control, div, stoi, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        stoi = new (0, _controlJs.ShortestTimeOfInterest)(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the ShortestTimeOfInterest already exists
        if (!control.index.has((0, _controlJs.ShortestTimeOfInterest).tagName)) {
            createShortestTimeOfInterest(control, div, stoi, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = stoi.value.toString();
            control.removeShortestTimeOfInterest();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = notSelected + unselectedText;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param stoi The shortest time of interest.
 * @param id The id.
 * @param valueString The value string.
 */ function createShortestTimeOfInterest(control, div, stoi, id, valueString) {
    control.setShortestTimeOfInterest(stoi);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(stoi, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:MaximumEvolutionTime".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processMaximumEvolutionTime(control, controlsDiv, xml_control) {
    /*
    let div: HTMLDivElement = createFlexDiv(level1);
    controlsDiv.appendChild(div);
    let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagName(MaximumEvolutionTime.tagName);
    let met: MaximumEvolutionTime;
    let valueString: string;
    if (xml.length == 1) {
        valueString = getNodeValue(getFirstChildNode(xml[0]));
        let value: number = parseFloat(valueString);
        met = new MaximumEvolutionTime(getAttributes(xml[0]), value);
        control.setMaximumEvolutionTime(met);
    } else {
        valueString = "";
        met = new MaximumEvolutionTime(new Map(), NaN);
    }
    // Create a input checkbox for the MaximumEvolutionTime.
    let id = Control.tagName + "_" + MaximumEvolutionTime.tagName + "_checkbox";
    let idI = Control.tagName + "_" + MaximumEvolutionTime.tagName + "_input";
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createMaximumEvolutionTimeInput(control, div, met, idI, valueString);
            } else {
                control.removeMaximumEvolutionTime();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", MaximumEvolutionTime.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createMaximumEvolutionTimeInput(control, div, met, idI, valueString);
    }
    */ let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName((0, _controlJs.MaximumEvolutionTime).tagName);
    let lwb = (0, _htmlJs.createLabelWithButton)((0, _controlJs.MaximumEvolutionTime).tagName, "", boundary1, boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.MaximumEvolutionTime).tagName + "_input";
    let met;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        met = new (0, _controlJs.MaximumEvolutionTime)((0, _xmlJs.getAttributes)(xml[0]), value);
        control.setMaximumEvolutionTime(met);
        button.textContent = selected + selectedLoadedValueText;
        createMaximumEvolutionTimeInput(control, div, met, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        met = new (0, _controlJs.MaximumEvolutionTime)(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the MaximumEvolutionTime already exists
        if (!control.index.has((0, _controlJs.MaximumEvolutionTime).tagName)) {
            createMaximumEvolutionTimeInput(control, div, met, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = met.value.toString();
            control.removeMaximumEvolutionTime();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = notSelected + unselectedText;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param met The maximum evolution time.
 * @param id The id.
 * @param valueString The value string.
 */ function createMaximumEvolutionTimeInput(control, div, met, id, valueString) {
    control.setMaximumEvolutionTime(met);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(met, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:automaticallySetMaxEne".
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processAutomaticallySetMaxEne(control, controlsDiv, xml_control) {
    let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName((0, _controlJs.AutomaticallySetMaxEne).tagName);
    let lwb = (0, _htmlJs.createLabelWithButton)((0, _controlJs.AutomaticallySetMaxEne).tagName, "", boundary1, boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.AutomaticallySetMaxEne).tagName + "_input";
    let asme;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        asme = new (0, _controlJs.AutomaticallySetMaxEne)((0, _xmlJs.getAttributes)(xml[0]), value);
        control.setAutomaticallySetMaxEne(asme);
        button.textContent = selected + selectedLoadedValueText;
        createAutomaticallySetMaxEneInput(control, div, asme, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        asme = new (0, _controlJs.AutomaticallySetMaxEne)(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the AutomaticallySetMaxEne already exists
        if (!control.index.has((0, _controlJs.AutomaticallySetMaxEne).tagName)) {
            createAutomaticallySetMaxEneInput(control, div, asme, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = asme.value.toString();
            control.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = notSelected + unselectedText;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param asme The automatically set max energy.
 * @param id The id.
 * @param valueString The value string.
 */ function createAutomaticallySetMaxEneInput(control, div, asme, id, valueString) {
    control.setAutomaticallySetMaxEne(asme);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(asme, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process me:diagramEnergyOffset.
 * @param control The control.
 * @param controlsDiv The controls div.
 * @param xml_control The xml control.
 */ function processDiagramEnergyOffset(control, controlsDiv, xml_control) {
    let div = (0, _htmlJs.createFlexDiv)(level1);
    controlsDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName((0, _controlJs.DiagramEnergyOffset).tagName);
    let lwb = (0, _htmlJs.createLabelWithButton)((0, _controlJs.DiagramEnergyOffset).tagName, "", boundary1, boundary1);
    let button = lwb.querySelector("button");
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(lwb);
    let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.DiagramEnergyOffset).tagName + "_input";
    let deo;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        deo = new (0, _controlJs.DiagramEnergyOffset)((0, _xmlJs.getAttributes)(xml[0]), value);
        control.setDiagramEnergyOffset(deo);
        button.textContent = selected + selectedLoadedValueText;
        createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        deo = new (0, _controlJs.DiagramEnergyOffset)(new Map(), NaN);
        button.textContent = notSelected + unselectedText;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the DiagramEnergyOffset already exists
        if (!control.index.has((0, _controlJs.DiagramEnergyOffset).tagName)) {
            createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
            button.textContent = selected + selectedValueText;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = deo.value.toString();
            control.removeDiagramEnergyOffset();
            // Remove any existing div.
            let e = document.getElementById(id);
            if (e != null) e.remove();
            button.textContent = notSelected + unselectedText;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
/*
    // Checkbox to toggle the DiagramEnergyOffset.
    let lwi: HTMLDivElement = createLabelWithInput("checkbox", id, boundary1, level0, (event) => {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                createDiagramEnergyOffsetInput(control, div, deo, idI, valueString);
            } else {
                control.removeDiagramEnergyOffset();
                // Remove any existing div.
                let e: HTMLDivElement = document.getElementById(idI) as HTMLDivElement;
                if (e != null) {
                    e.remove();
                }
            }
        }
    }, "", DiagramEnergyOffset.tagName);
    div.appendChild(lwi);
    if (setCheck(lwi, xml)) {
        createDiagramEnergyOffsetInput(control, div, deo, id, valueString);
        lwi.textContent = "Hide Diagram Energy Offset";
    }
    */ }
/**
 * @param control The control.
 * @param div The div.
 * @param deo The diagram energy offset.
 * @param id The id.
 * @param valueString The value string.
 */ function createDiagramEnergyOffsetInput(control, div, deo, id, valueString) {
    control.setDiagramEnergyOffset(deo);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(deo, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Create a diagram.
 * @param canvas The canvas.
 * @param dark True for dark mode.
 * @param fontSize The fontSize to use.
 * @param lw The line width of reactants, transition states and products.
 * @param lwc The line width color to use.
 */ function drawReactionDiagram(canvas, dark, font, lw, lwc) {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
    //ctx.fillStyle = background;
    ctx.font = font;
    // Get text height for font size.
    let th = (0, _canvasJs.getTextHeight)(ctx, "Aj", ctx.font);
    //console.log("th=" + th);
    // Go through reactions:
    // 1. Create sets of reactants, end products, intermediate products and transition states.
    // 2. Create maps of orders and energies.
    // 3. Calculate maximum energy.
    let reactants = [];
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
        let reactionTransitionStates = reaction.getTransitionStates();
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.push(reactantsLabel);
            if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
            let energy = reaction.getReactantsEnergy(molecules);
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
            let energy = reaction.getProductsEnergy(molecules);
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
                    reactionTransitionStates.forEach(function(ts) {
                        let ref = ts.getMolecule().ref;
                        transitionStates.add(ref);
                        orders.set(ref, i);
                        energy = molecules.get(ref)?.getEnergy() ?? 0;
                        energyMin = Math.min(energyMin, energy);
                        energyMax = Math.max(energyMax, energy);
                        energies.set(ref, energy);
                        i++;
                    });
                    orders.set(productsLabel, i);
                    i++;
                }
            } else {
                if (reactionTransitionStates != undefined) reactionTransitionStates.forEach(function(ts) {
                    let ref = ts.getMolecule().ref;
                    transitionStates.add(ref);
                    orders.set(ref, i);
                    energy = molecules.get(ref)?.getEnergy() ?? 0;
                    energyMin = Math.min(energyMin, energy);
                    energyMax = Math.max(energyMax, energy);
                    energies.set(ref, energy);
                    i++;
                });
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
        // (The drawing is now not done here but done later so labels are on top of lines, but
        // the code is left here commented out for code comprehension.)
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
        let reactionTransitionStates = reaction.getTransitionStates();
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        let productsLabel = reaction.getProductsLabel();
        let reactantOutXY = (0, _utilJs.get)(reactantsOutXY, reactantsLabel);
        let productInXY = (0, _utilJs.get)(productsInXY, productsLabel);
        if (reactionTransitionStates.length > 0) reactionTransitionStates.forEach(function(ts) {
            let transitionStateLabel = ts.getMolecule().ref;
            let transitionStateInXY = (0, _utilJs.get)(transitionStatesInXY, transitionStateLabel);
            (0, _canvasJs.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
            let transitionStateOutXY = (0, _utilJs.get)(transitionStatesOutXY, transitionStateLabel);
            (0, _canvasJs.drawLine)(ctx, black, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
        });
        else (0, _canvasJs.drawLine)(ctx, black, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
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
 * Display reactions diagram.
 */ function displayReactionsDiagram(id) {
    if (reactions.size > 0) {
        let canvas = document.getElementById(id);
        if (canvas != null) {
            canvas.width = 800;
            canvas.height = 400;
            canvas.style.border = "1px solid black";
            let font = document.body.style.fontSize + " SensSerif";
            let dark = true;
            let lw = 4;
            let lwc = 2;
            if (canvas != null) {
                canvas.style.display = "block";
                canvas.id = id;
                canvas.style.margin = "auto";
                canvas.style.marginRight = "10px";
                drawReactionDiagram(canvas, dark, font, lw, lwc);
            }
        }
    }
}
/**
 * Save to XML file.
 */ function saveXML() {
    console.log("saveXML");
    const pad = "  ";
    // Create a Blob object from the data
    let blob = new Blob([
        (0, _mesmerJs.Mesmer).header,
        mesmer.toXML(pad, pad)
    ], {
        type: "text/plain"
    });
    // Create a new object URL for the blob
    let url = URL.createObjectURL(blob);
    // Create a new 'a' element
    let a = document.createElement("a");
    // Set the href and download attributes for the 'a' element
    a.href = url;
    let title = mesmer.getTitle()?.value;
    a.download = title.replace(/[^a-z0-9]/gi, "_") + ".xml";
    // Append the 'a' element to the body and click it to start the download
    document.body.appendChild(a);
    a.click();
    // Remove the 'a' element after the download starts
    document.body.removeChild(a);
}

},{"./util.js":"f0Rnl","./xml.js":"7znDa","./molecule.js":"ahQNx","./reaction.js":"8grVN","./html.js":"aLPSL","./canvas.js":"hoJRr","./conditions.js":"aksKl","./modelParameters.js":"kQHfz","./control.js":"Qx5gu","./mesmer.js":"kMp4Q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0Rnl":[function(require,module,exports) {
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
 * @param delimiter The (optional) delimiter.
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
/**
 * @param s The string to check.
 * @returns true iff s is a number.
 */ parcelHelpers.export(exports, "isNumeric", ()=>isNumeric);
function get(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function rescale(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}
function mapToString(map, delimiter) {
    if (map == null) return "";
    if (delimiter == undefined) delimiter = ", ";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(delimiter);
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
    for(let i = 0; i < s.length; i++)if (isNumeric(s[i])) r.push(parseFloat(s[i]));
    return r;
}
function isNumeric(s) {
    if (s === "") return false;
    return !isNaN(Number(s));
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
 * @param element The xml element to search in.
 * @returns The first ChildNode if there is one.
 * @throws An error if the element has no childNodes.
 */ parcelHelpers.export(exports, "getFirstChildNode", ()=>getFirstChildNode);
/**
 * Get the nodeValue of a Node throwing an Error if this is null.
 * @param node The node to get the nodeValue of.
 * @returns The nodeValue of the node.
 * @throws An error if the nodeValue is null.
 */ parcelHelpers.export(exports, "getNodeValue", ()=>getNodeValue);
/**
 * For convenience and to cope with when there is no node value as there is a blank.
 * @param e The Element
 * @returns The node value of the first child or "".
 */ parcelHelpers.export(exports, "getInputString", ()=>getInputString);
/**
 * A class for a tag.
 */ parcelHelpers.export(exports, "Tag", ()=>Tag);
/**
 * A class for representing A Tag with attributes.
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
 * @param attributes The attributes (optional).
 * @param padding The padding (optional).
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
 * @param attributes The attributes (optional).
 * @param padding The padding (optional).
 * @param padValue Whether to pad the value (optional).
 * @returns The XML tag with content.
 */ parcelHelpers.export(exports, "getTag", ()=>getTag);
/**
 * Get the attributes of an element.
 * @param element The element to get the attributes of.
 * @returns The attributes of the element.
 */ parcelHelpers.export(exports, "getAttributes", ()=>getAttributes);
/**
 * Get an XML element checking that it is the only one with a given tagName.
 * @param xml The XML document or element.
 * @param tagName The tag name.
 * @returns The element.
 * @throws An error if there is not exactly one element with the given tag name.
 */ parcelHelpers.export(exports, "getSingularElement", ()=>getSingularElement);
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
function getInputString(e) {
    let s;
    let firstChildNode = getFirstChildNode(e);
    if (firstChildNode) s = getNodeValue(firstChildNode).trim();
    else s = "";
    return s;
}
class Tag {
    /**
     * @param tagName The tag name.
     */ constructor(tagName){
        this.tagName = tagName;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param padding The padding (optional).
     * @returns A self closing tag.
     */ toXML(padding) {
        let s = (0, _html.getSelfClosingTag)(undefined, this.tagName);
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
        if (this.attributes) this.attributes.forEach((value, key)=>{
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
        for (let [k, v] of this.attributes)s += " " + k + '="' + v.toString() + '"';
        return s + " />";
    }
}
class StringNode extends TagWithAttributes {
    /**
     * @param attributes The attributes.
     * @param value The value.
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
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return getTag(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}
class NumberNode extends TagWithAttributes {
    /**
     * @param attributes The attributes.
     * @param value The value.
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
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return getTag(this.value.toString().trim(), this.tagName, this.attributes, padding, false);
    }
}
class NumberArrayNode extends TagWithAttributes {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, tagName, values, delimiter){
        super(attributes, tagName);
        /**
     * The delimiter of the values.
     */ this.delimiter = ",";
        this.values = values;
        if (delimiter != undefined) this.delimiter = delimiter;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param delimiter The delimiter.
     */ setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return getTag(this.values.toString().replaceAll(",", this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
class NodeWithNodes extends TagWithAttributes {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     */ constructor(attributes, tagName){
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     * @returns The index of the node added.
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
     * @param pad The pad (Optional).
     * @param padding The padding (Optional).
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

},{"./html":"aLPSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aLPSL":[function(require,module,exports) {
/**
 * Remove a top level element.
 * @param id The id of the element to remove.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "remove", ()=>remove);
/**
 * Create a collapsible div.
 * @param options The options for creating the collapsible div.
 * @returns A collapsible div.
 */ parcelHelpers.export(exports, "getCollapsibleDiv", ()=>getCollapsibleDiv);
/**
 * For making elements with the class "collapsible" collapsible.
 */ parcelHelpers.export(exports, "makeCollapsible", ()=>makeCollapsible);
/**
 * Create and return HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param boundary The boundary to go around the HTMLLabelElement and HTMLInputElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelText The label text.
 * @param inputFontsize The font size of the input.
 * @param labelFontsize The font size of the label.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */ parcelHelpers.export(exports, "createLabelWithInput", ()=>createLabelWithInput);
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change to the input.
 * @returns A HTMLInputElement.
 */ parcelHelpers.export(exports, "createInputWithFunction", ()=>createInputWithFunction);
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number", "checkbox").
 * @param id The id of the input.
 * @param margin The margin for the HTMLInputElement.
 * @returns A HTMLInputElement.
 */ parcelHelpers.export(exports, "createInput", ()=>createInput);
/**
 * Create a self closing tag.
 * @param attributes The attributes.
 * @param tagName The tag name.
 */ parcelHelpers.export(exports, "getSelfClosingTag", ()=>getSelfClosingTag);
/**
 * For resizing an HTMLInputElement to the width of what it contains.
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */ parcelHelpers.export(exports, "resizeInputElement", ()=>resizeInputElement);
/**
 * For resizing an HTMLSelectElement to the width of what it contains.
 * 
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */ parcelHelpers.export(exports, "resizeSelectElement", ()=>resizeSelectElement);
/**
 * Create and return an HTMLSelectElement.
 * 
 * @param options The options.
 * @param name The name.
 * @param id The id.
 * @param margin The margin for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */ parcelHelpers.export(exports, "createSelectElement", ()=>createSelectElement);
/**
 * Create and return an HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 * 
 * @param textContent The text content of the label.
 * @param options The options for the HTMLSelectElement.
 * @param name The name for the HTMLSelectElement.
 * @param id The id.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns A HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 */ parcelHelpers.export(exports, "createLabelWithSelectElement", ()=>createLabelWithSelectElement);
/**
 * Create and return an HTMLButtonElement.
 * 
 * @param textContent The text content of the HTMLButtonElement.
 * @param margin The margin to go around the HTMLButtonElement.
 * @returns An HTMLButtonElement with the textContent and specified margin.
 */ parcelHelpers.export(exports, "createButton", ()=>createButton);
/**
 * Create and return an HTMLDivElement containing an HTMLLabelElement and a HTMLButtonElement.
 * 
 * @param textContent The text content of the button.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLButtonElement.
 * @param divMargin The margin for the HTMLDivElement.
 * 
 * @returns An HTMLDivElement with the level margin containing an HTMLLabelElement and a HTMLButtonElement.
 */ parcelHelpers.export(exports, "createLabelWithButton", ()=>createLabelWithButton);
/**
 * Create and return HTMLDivElement.
 * @param margin The margin to go around the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */ parcelHelpers.export(exports, "createDiv", ()=>createDiv);
/**
 * Create and return HTMLDivElement with a 'flex' display style.
 *
 * @param margin The margin to go around the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */ parcelHelpers.export(exports, "createFlexDiv", ()=>createFlexDiv);
/**
 * Create and return HTMLLabelElement.
 *
 * @param textContent The text content of the HTMLLabelElement.
 * @param margin The margin to go around the HTMLLabelElement.
 * @param fontsize The font size for the label.
 * @returns An HTMLLabelElement with specified boundary.
 */ parcelHelpers.export(exports, "createLabel", ()=>createLabel);
function remove(id) {
    let e = document.getElementById(id);
    if (e != null) e.parentNode?.removeChild(e);
}
function getCollapsibleDiv({ content, buttonLabel, buttonFontSize = "", boundary = {
    marginLeft: "",
    marginTop: "",
    marginBottom: "",
    marginRight: ""
}, level = {
    marginLeft: "",
    marginTop: "",
    marginBottom: "",
    marginRight: ""
}, contentDivId = "", contentDivClassName = "" }) {
    let contentDiv = createDiv(boundary);
    contentDiv.id = contentDivId;
    contentDiv.className = contentDivClassName;
    let button = document.createElement("button");
    button.id = contentDivId + "Button";
    button.className = "collapsible";
    button.innerText = `${buttonLabel} \u{25BC}`;
    button.addEventListener("click", function() {
        button.innerText = button.innerText.includes("\u25BC") ? `${buttonLabel} \u{25B2}` : `${buttonLabel} \u{25BC}`;
    });
    button.style.fontSize = buttonFontSize;
    Object.assign(button.style, level);
    contentDiv.appendChild(button);
    contentDiv.appendChild(content);
    return contentDiv;
}
function makeCollapsible() {
    var collapsibleElements = document.getElementsByClassName("collapsible");
    for(var i = 0; i < collapsibleElements.length; i++){
        // Remove existing event listener
        collapsibleElements[i].removeEventListener("click", toggleCollapsible);
        // Add new event listener
        collapsibleElements[i].addEventListener("click", toggleCollapsible);
    }
}
/**
 * For toggling the collapsible content.
 */ function toggleCollapsible() {
    this.classList.toggle("active");
    let contentDiv = this.nextElementSibling;
    if (contentDiv.style.display === "block") contentDiv.style.display = "none";
    else contentDiv.style.display = "block";
}
function createLabelWithInput(type, id, boundary, level, func, value, labelContent, inputFontsize) {
    let input = createInputWithFunction(type, id, boundary, func, value, inputFontsize);
    Object.assign(input.style, boundary);
    let label = createLabel(labelContent, boundary);
    label.htmlFor = id;
    Object.assign(label.style, boundary);
    let container = createFlexDiv(level);
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
function createInputWithFunction(type, id, boundary, func, value, inputFontsize) {
    let input = createInput(type, id, boundary);
    input.onchange = func;
    input.value = value;
    if (inputFontsize != undefined) input.style.fontSize = inputFontsize;
    resizeInputElement(input);
    return input;
}
function createInput(type, id, margin) {
    let input = document.createElement("input");
    input.type = type;
    input.id = id;
    Object.assign(input.style, margin);
    input.classList.add("auto-width");
    return input;
}
function getSelfClosingTag(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}
function resizeInputElement(input, minSize) {
    if (minSize == undefined) minSize = 4;
    input.style.width = input.value.length + minSize + "ch";
}
function resizeSelectElement(input, minSize) {
    if (minSize == undefined) minSize = 6;
    input.style.width = input.value.length + minSize + "ch";
}
function createSelectElement(options, name, id, margin) {
    let selectElement = document.createElement("select");
    options.forEach((option)=>{
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    selectElement.style.fontSize = "1em"; // Set the font size with a relative unit.
    selectElement.classList.add("auto-width");
    Object.assign(selectElement.style, margin);
    return selectElement;
}
function createLabelWithSelectElement(textContent, options, name, id, componentMargin, divMargin) {
    let div = createDiv(divMargin);
    let label = createLabel(textContent, componentMargin);
    div.appendChild(label);
    let selectElement = document.createElement("select");
    div.appendChild(selectElement);
    options.forEach((option)=>{
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return div;
}
function createButton(textContent, boundary) {
    let button = document.createElement("button");
    button.textContent = textContent;
    Object.assign(button.style, boundary);
    button.style.fontSize = "1em"; // Set the font size with a relative unit.
    return button;
}
function createLabelWithButton(labeltext, textContent, componentMargin, divMargin) {
    let div = createFlexDiv(divMargin);
    let label = createLabel(labeltext, componentMargin);
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild(createButton(textContent, componentMargin));
    return div;
}
function createDiv(margin) {
    let div = document.createElement("div");
    Object.assign(div.style, margin);
    return div;
}
function createFlexDiv(margin) {
    let div = createDiv(margin);
    div.style.display = "flex";
    return div;
}
function createLabel(textContent, margin) {
    let label = document.createElement("label");
    Object.assign(label.style, margin);
    label.textContent = textContent;
    label.style.fontSize = "1em"; // Set the font size with a relative unit.
    return label;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ahQNx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Atom data.
 * The examples can be used to compile this.
 * It is likely that only a small subset of atoms in the periodic table are of interest...
 */ /**
 * Molecule data.
 * The examples can be used to compile this.
 * It would be good to use, have, provide ways of sharing and to be able to specify/edit molecules...
 * This would include data about atoms, bonds, molecule properties and other things...
 */ /**
 * Atom instances must have an "elementType" attribute.
 * The attributes may include:
 * "id"
 * "x3", "y3", "z3" - coordinates used to depict a molecule containing the atom.
 * "spinMultiplicity" - the spin multiplicity of the atom.
 * In the XML, an "atom" node is typically a child of an "atomArray" parent node.
 * If there is only one atom, it may be a child of a "molecule" parent node.
 */ parcelHelpers.export(exports, "Atom", ()=>Atom);
/**
 * A class for representing an atomArray.
 * There can be no attributes.
 * In the XML, a "atomArray" node is typically a child of a "molecule" parent node and has "atom" node children.
 */ parcelHelpers.export(exports, "AtomArray", ()=>AtomArray);
/**
 * An atomic bond between two atoms in a molecule.
 * Instances must have a "atomRefs2" attribute - a space separated list of two atom ids.
 * The attributes may include "order" - presumed to be the order of the bond. Generally:
 *  order = (the number of bonding electrons) - ((the number of non-bonding electrons) / 2).
 * In the XML, a "bond" node is typically a child of a "bondArray" parent node.
 */ parcelHelpers.export(exports, "Bond", ()=>Bond);
/**
 * There can be no attributes.
 * In the XML, a "bondArray" node is typically a child of a "molecule" parent node and has "bond" node children.
 */ parcelHelpers.export(exports, "BondArray", ()=>BondArray);
/**
 * The attributes may contain "units".
 * In the XML, a "scalar" node is a child of a "property" node.
 */ parcelHelpers.export(exports, "PropertyScalar", ()=>PropertyScalar);
/**
 * The attributes may contain "units".
 * In the XML, an "array" node is a child of a "property" node.
 */ parcelHelpers.export(exports, "PropertyArray", ()=>PropertyArray);
/**
 * The attributes must contain "dictRef" which is a dictionary reference for a type of property.
 * In the XML, a "property" node has a "propertyList" parent and either a "scalar" or "array" or another type of child not yet implemented (there could be a "matrix" type).
 */ parcelHelpers.export(exports, "Property", ()=>Property);
/**
 * The Zero Potential Energy.
 * The child "scalar" node should have a "units" attribute (known units=[kJ/mol]).
 */ parcelHelpers.export(exports, "ZPE", ()=>ZPE);
/**
 * "me:frequenciesScaleFactor" property.
 */ parcelHelpers.export(exports, "FrequenciesScaleFactor", ()=>FrequenciesScaleFactor);
/**
 * The vibration frequencies.
 * The child "array" node should have a "units" attribute (known units=[cm-1]).
 */ parcelHelpers.export(exports, "VibFreqs", ()=>VibFreqs);
/**
 * The rotation constants.
 * The child "array" node should have a "units" attribute (known units=[cm-1]).
 */ parcelHelpers.export(exports, "RotConsts", ()=>RotConsts);
/**
 * The Molecular Weight.
 * The child "scalar" node should have a "units" attribute (known units=[amu]).
 */ parcelHelpers.export(exports, "MW", ()=>MW);
/**
 * "me:imFreqs"
 */ parcelHelpers.export(exports, "ImFreqs", ()=>ImFreqs);
/**
 * In the XML, a "propertyList" node is a child node of a "molecule" node and has one or more "property" child node.
 * There can be no attributes.
 */ parcelHelpers.export(exports, "PropertyList", ()=>PropertyList);
/**
 * In the XML, a "me:deltaEDown" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include "bathGas", "units", "lower", "upper", and "stepsize".
 */ parcelHelpers.export(exports, "DeltaEDown", ()=>DeltaEDown);
/**
 * In the XML, a "me:energyTransferModel" node is a child node of a "molecule" node.
 * It may have:
 * One or more "me:deltaEDown" child nodes.
 * Additional child nodes might include "me:deltaEDownTExponent".
 */ parcelHelpers.export(exports, "EnergyTransferModel", ()=>EnergyTransferModel);
/**
 * In the XML, a "me:DOSCMethod" node is a child node of a "molecule" node.
 * The attributes are expected to include either "xsi:type" or "name" - expected values are either "ClassicalRotors" or "QMRotors".
 */ parcelHelpers.export(exports, "DOSCMethod", ()=>DOSCMethod);
/**
 * In the XML, a "me:bondRef" node is a child node of a "me:ExtraDOSCMethod" node.
 */ parcelHelpers.export(exports, "BondRef", ()=>BondRef);
/**
 * In the XML, a "me:PotentialPoint" node is a child node of a "me:HinderedRotorPotential" node.
 * The attributes must include "angle" and "potential".
 */ parcelHelpers.export(exports, "PotentialPoint", ()=>PotentialPoint);
/**
 * In the XML, a "me:HinderedRotorPotential" node is a child node of a "me:ExtraDOSCMethod" node.
 * It may have one or more "me:PotentialPoint" child nodes.
 * The attributes must include "format" (with a value from ["numerical", "analytical"]) and "units" (with a value from ["kJ/mol", "cm-1", "Hartree"]).
 */ parcelHelpers.export(exports, "HinderedRotorPotential", ()=>HinderedRotorPotential);
/**
 * In the XML, a "me:periodicity" node is a child node of a "me:ExtraDOSCMethod" node.
 */ parcelHelpers.export(exports, "Periodicity", ()=>Periodicity);
/**
 * In the XML, a "me:ExtraDOSCMethod" node is a child node of a "molecule" node.
 */ parcelHelpers.export(exports, "ExtraDOSCMethod", ()=>ExtraDOSCMethod);
/**
 * The attributes may include "units".
 * In the XML, a "me:reservoirSize" node is a child node of a "molecule" node.
 */ parcelHelpers.export(exports, "ReservoirSize", ()=>ReservoirSize);
/**
 * The attributes may include "description" and "active" (and possibly others).
 * In the XML, a "molecule" node is a child node of a "moleculeList" node.
 */ parcelHelpers.export(exports, "Molecule", ()=>Molecule);
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
class Atom extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "atom";
    }
    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     * If there is no "id" then "this.id" is set to the "elementType".
     */ constructor(attributes){
        super(attributes, Atom.tagName);
        let elementType = attributes.get("elementType");
        if (elementType == undefined) throw new Error("elementType is undefined");
        this.elementType = elementType;
        let id = attributes.get("id");
        if (id == undefined) id = this.elementType;
        this.id = id;
    }
}
class AtomArray extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
    * The tag name.
    */ this.tagName = "atomArray";
    }
    /**
     * @param attributes The attributes.
     * @param atoms The atoms.
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
    static{
        /**
     * The key for the atomRefs2 attribute.
     */ this.s_atomRefs2 = "atomRefs2";
    }
    static{
        /**
     * The key for the id attribute.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the order attribute.
     */ this.s_order = "order";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, Bond.tagName);
        let atomRefs2 = attributes.get(Bond.s_atomRefs2);
        if (atomRefs2 == undefined) throw new Error(Bond.s_atomRefs2 + " is undefined!");
        this.atomRefs2 = atomRefs2;
    }
    /**
     * @param atomRefs2 The atomRefs2 to set.
     */ setAtomRefs2(atomRefs2) {
        this.atomRefs2 = atomRefs2;
        this.attributes.set(Bond.s_atomRefs2, atomRefs2);
    }
    /**
     * @returns The attribute value referred to by "id" or undefined.
     */ getId() {
        return this.attributes.get(Bond.s_id);
    }
    /**
     * @param id The id to set the attribute value referred to by "id".
     */ setId(id) {
        this.attributes.set(Bond.s_id, id);
    }
    /**
     * @returns The attribute value referred to by "order" as a number or undefined.
     */ getOrder() {
        let order = this.attributes.get(Bond.s_order);
        if (order != undefined) return parseFloat(order);
    }
    /**
     * @param order The order to set the attribute value referred to by "order".
     */ setOrder(order) {
        this.attributes.set(Bond.s_order, order.toString());
    }
}
class BondArray extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bondArray";
    }
    /**
     * @param attributes The attributes.
     * @param bonds A Map of bonds with keys as ids.
     */ constructor(attributes, bonds){
        super(attributes, BondArray.tagName);
        this.bonds = bonds;
        bonds.forEach((bond)=>{
            this.nodes.set(this.nodes.size, bond);
        });
    }
    /**
     * @param i The index of the bond.
     * @returns The bond at the given index.
     * @throws Error if this.bonds has no such index.
     */ getBond(i) {
        return this.bonds[i];
    }
    /**
     * @returns The bonds.
     */ getBonds() {
        return this.bonds;
    }
    /**
     * Set the bond at the given index.
     * @param i The index.
     * @param bond The bond.
     * @throws Error if this.bonds has no such index.
     */ setBond(i, bond) {
        this.bonds[i] = bond;
        this.nodes.set(i, bond);
    }
    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     */ addBond(bond) {
        this.bonds.push(bond);
        this.nodes.set(this.nodes.size, bond);
    }
    /**
     * @param i The index of the bond to remove.
     */ removeBond(i) {
        this.bonds.splice(i, 1);
        this.nodes.delete(i);
    }
    /**
     * Get a set of all the bond ids.
     */ getBondIds() {
        let bondIds = new Set();
        this.bonds.forEach((bond)=>{
            bondIds.add(bond.getId());
        });
        return bondIds;
    }
}
class PropertyScalar extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, PropertyScalar.tagName, value);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyScalar.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) //console.log('Units are not the same, changing units...');
                this.attributes.set(PropertyScalar.s_units, units);
            }
        }
    }
}
class PropertyArray extends (0, _xmlJs.NumberArrayNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "array";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes, PropertyArray.tagName, values, delimiter);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyArray.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set(PropertyArray.s_units, units);
                    console.log("Units changed from " + existingUnits + " to " + units);
                }
            }
        }
    }
}
class Property extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "property";
    }
    static{
        /**
     * The key for the dictRef attribute.
     */ this.s_dictRef = "dictRef";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, Property.tagName);
        let dictRef = attributes.get(Property.s_dictRef);
        if (dictRef == undefined) throw new Error(Property.s_dictRef + " is undefined!");
        this.dictRef = dictRef;
        if (property) this.nodes.set(0, property);
    }
    /**
     * @returns The property.
     */ getProperty() {
        return this.nodes.get(0);
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        this.nodes.set(0, property);
    }
}
class ZPE extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:ZPE";
    }
    static{
        /**
     * The possible units.
     */ this.units = [
            "kJ/mol",
            "cm-1",
            "kcal/mol",
            "Hartree"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of ["kJ/mol", "cm-1", "wavenumber", "kcal/mol", "Hartree", "au"].
     */ setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
class FrequenciesScaleFactor extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:frequenciesScaleFactor";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class VibFreqs extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:vibFreqs";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class RotConsts extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:rotConsts";
    }
    static{
        /**
     * The possible units.
     */ this.units = [
            "cm-1",
            "GHz"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class MW extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:MW";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class ImFreqs extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:imFreqs";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class PropertyList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "propertyList";
    }
    /**
     * @param attributes The attributes.
     * @param properties The properties (optional).
     */ constructor(attributes, properties){
        super(attributes, PropertyList.tagName);
        this.index = new Map();
        if (properties != undefined) properties.forEach((property)=>{
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        });
    }
    /**
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) return this.nodes.get(i);
        else throw new Error("Property " + dictRef + " does not exist");
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        let i = this.index.get(property.dictRef);
        if (i == undefined) {
            //console.log('Property ' + property.dictRef + ' does not exist, adding...');
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        } else {
            console.log("Property " + property.dictRef + " already exists, updating...");
            this.nodes.set(i, property);
        }
    }
}
class DeltaEDown extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown";
    }
    static{
        /**
     * The key for the bathGas attribute.
     */ this.s_bathGas = "bathGas";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    static{
        /**
     * The key for the lower attribute.
     */ this.s_lower = "lower";
    }
    static{
        /**
     * The key for the upper attribute.
     */ this.s_upper = "upper";
    }
    static{
        /**
     * The key for the stepsize attribute.
     */ this.s_stepsize = "stepsize";
    }
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, DeltaEDown.tagName, value);
    }
    /**
     * @returns The bath gas of the DeltaEDown.
     */ getBathGas() {
        return this.attributes.get(DeltaEDown.s_bathGas);
    }
    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */ setBathGas(bathGas) {
        this.attributes.set(DeltaEDown.s_bathGas, bathGas);
    }
    /**
     * @returns The units of the DeltaEDown.
     */ getUnits() {
        return this.attributes.get(DeltaEDown.s_units);
    }
    /**
     * @param units The units of the DeltaEDown.
     */ setUnits(units) {
        this.attributes.set(DeltaEDown.s_units, units);
    }
    /**
     * @returns The lower of the DeltaEDown.
     */ getLower() {
        return parseFloat((0, _utilJs.get)(this.attributes, DeltaEDown.s_lower));
    }
    /**
     * @param lower The lower of the DeltaEDown.
     */ setLower(lower) {
        this.attributes.set(DeltaEDown.s_lower, lower.toString());
    }
    /**
     * @returns The upper of the DeltaEDown.
     */ getUpper() {
        return parseFloat((0, _utilJs.get)(this.attributes, DeltaEDown.s_upper));
    }
    /**
     * @param upper The upper of the DeltaEDown.
     */ setUpper(upper) {
        this.attributes.set(DeltaEDown.s_upper, upper.toString());
    }
    /**
     * @returns The stepsize of the DeltaEDown.
     */ getStepsize() {
        return parseFloat((0, _utilJs.get)(this.attributes, DeltaEDown.s_stepsize));
    }
    /**
     * @param stepsize The stepsize of the DeltaEDown.
     */ setStepsize(stepsize) {
        this.attributes.set(DeltaEDown.s_stepsize, stepsize.toString());
    }
    /**
     * @param value The value of the DeltaEDown.
     */ setValue(value) {
        this.value = value;
    }
}
class EnergyTransferModel extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyTransferModel";
    }
    /**
     * @param attributes The attributes.
     * @param deltaEDowns The DeltaEDowns.
     */ constructor(attributes, deltaEDowns){
        super(attributes, EnergyTransferModel.tagName);
        if (deltaEDowns != undefined) deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @returns The DeltaEDowns.
     */ getDeltaEDowns() {
        let deltaEDowns = [];
        this.nodes.forEach((node)=>{
            if (node instanceof DeltaEDown) deltaEDowns.push(node);
        });
        return deltaEDowns;
    }
    /**
     * @param deltaEDowns The DeltaEDowns.
     */ setDeltaEDowns(deltaEDowns) {
        this.nodes.clear();
        deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @param index The index of the DeltaEDown to return.
     * @returns The DeltaEDown at the given index.
     */ getDeltaEDown(index) {
        if (index < 0 || index >= this.nodes.size) throw new Error("index out of range");
        return this.nodes.get(index);
    }
    /**
     * Set the DeltaEDown at the given index.
     * @param index The index to set the DeltaEDown at.
     * @param deltaEDown The DeltaEDown to set at the index.
     */ setDeltaEDown(index, deltaEDown) {
        this.nodes.set(index, deltaEDown);
    }
    /**
     * Add the DeltaEDowns.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */ addDeltaEDown(deltaEDown) {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
}
class DOSCMethod extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DOSCMethod";
    }
    static{
        /**
     * The key for the "xsi:type" attribute value.
     */ this.s_xsi_type = "xsi:type";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, DOSCMethod.tagName);
        if (attributes.get(DOSCMethod.s_xsi_type) == undefined) {
            let name = attributes.get("name");
            if (name == undefined) throw new Error("Neither xsi:type or name are defined.");
            else attributes.set(DOSCMethod.s_xsi_type, name);
        }
    }
    /**
     * @returns The xsi:type.
     */ getXsiType() {
        return this.attributes.get(DOSCMethod.s_xsi_type);
    }
    /**
     * @param xsiType The xsi:type.
     */ setXsiType(xsiType) {
        this.attributes.set(DOSCMethod.s_xsi_type, xsiType);
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
        /**
     * The tag name.
     */ this.tagName = "me:PotentialPoint";
    }
    static{
        /**
     * The key angle attribute.
     */ this.s_angle = "angle";
    }
    static{
        /**
     * The key potential attribute.
     */ this.s_potential = "potential";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, PotentialPoint.tagName);
        let angle = attributes.get(PotentialPoint.s_angle);
        if (angle == undefined) throw new Error(PotentialPoint.s_potential + " is undefined!");
        this.angle = parseFloat(angle);
        let potential = attributes.get(PotentialPoint.s_potential);
        if (potential == undefined) throw new Error(PotentialPoint.s_potential + " is undefined!");
        this.potential = parseFloat(potential);
    }
    /**
     * @returns The angle.
     */ getAngle() {
        return this.angle;
    }
    /**
     * @param angle The angle of the PotentialPoint.
     */ setAngle(angle) {
        this.angle = angle;
        this.attributes.set(PotentialPoint.s_angle, angle.toString());
    }
    /**
     * @returns The potential.
     */ getPotential() {
        return this.potential;
    }
    /**
     * @param potential The potential of the PotentialPoint.
     */ setPotential(potential) {
        this.potential = potential;
        this.attributes.set(PotentialPoint.s_potential, potential.toString());
    }
}
class HinderedRotorPotential extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:HinderedRotorPotential";
    }
    static{
        /**
     * The permitted formats.
     */ this.formats = [
            "numerical",
            "analytical"
        ];
    }
    static{
        /**
     * The permitted units.
     */ this.units = [
            "kJ/mol",
            "cm-1",
            "Hartree"
        ];
    }
    static{
        /**
     * The key for the format attribute value.
     */ this.s_format = "format";
    }
    static{
        /**
     * The key for the units attribute value.
     */ this.s_units = "units";
    }
    static{
        /**
     * The key for the expansionSize attribute value.
     */ this.s_expansionSize = "expansionSize";
    }
    static{
        /**
     * The key for the useSineTerms attribute value.
     */ this.s_useSineTerms = "useSineTerms";
    }
    /**
     * @param attributes The attributes.
     * @param potentialPoints The PotentialPoints.
     */ constructor(attributes, potentialPoints){
        super(attributes, HinderedRotorPotential.tagName);
        let format = attributes.get(HinderedRotorPotential.s_format);
        if (format == undefined) throw new Error(HinderedRotorPotential.s_format + " is undefined!");
        this.format = format;
        let units = attributes.get(HinderedRotorPotential.s_units);
        if (units == undefined) throw new Error(HinderedRotorPotential.s_units + " is undefined!");
        this.units = units;
        if (potentialPoints != undefined) potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
        let expansionSize = attributes.get(HinderedRotorPotential.s_expansionSize);
        if (expansionSize == undefined) throw new Error(HinderedRotorPotential.s_expansionSize + " is undefined!");
        this.expansionSize = parseFloat(expansionSize);
        let useSineTerms = attributes.get(HinderedRotorPotential.s_useSineTerms);
        if (useSineTerms == undefined) throw new Error(HinderedRotorPotential.s_useSineTerms + " is undefined!");
        this.useSineTerms = useSineTerms == "yes";
    }
    /**
     * @returns The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */ getFormat() {
        return this.format;
    }
    /**
     * @param format The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */ setFormat(format) {
        this.format = format;
        this.attributes.set(HinderedRotorPotential.s_format, format);
    }
    /**
     * @returns The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */ getUnits() {
        return this.units;
    }
    /**
     * @param units The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */ setUnits(units) {
        this.units = units;
        this.attributes.set(HinderedRotorPotential.s_units, units);
    }
    /**
     * @returns The expansionSize of the HinderedRotorPotential.
     */ getExpansionSize() {
        return this.expansionSize;
    }
    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */ setExpansionSize(expansionSize) {
        this.expansionSize = expansionSize;
        this.attributes.set(HinderedRotorPotential.s_expansionSize, expansionSize.toString());
    }
    /**
     * @returns The useSineTerms of the HinderedRotorPotential.
     */ getUseSineTerms() {
        return this.useSineTerms;
    }
    /**
     * @param useSineTerms The useSineTerms of the HinderedRotorPotential.
     */ setUseSineTerms(useSineTerms) {
        this.useSineTerms = useSineTerms;
        this.attributes.set(HinderedRotorPotential.s_useSineTerms, useSineTerms ? "yes" : "no");
    }
    /**
     * @returns The potential point with the given index.
     */ getPotentialPoint(i) {
        return this.nodes.get(i);
    }
    /**
     * Set the potential point at the given index.
     * @param i The index to set the potential point at.
     * @param p The potential point to set at the index.
     */ setPotentialPoint(i, p) {
        this.nodes.set(i, p);
    }
    /**
     * Sets the potential points.
     * @param potentialPoints The potential points.
     */ setPotentialPoints(potentialPoints) {
        this.nodes.clear();
        potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
    }
    /**
     * Add the potential point.
     * @param p The potential point.
     * @returns The index of the potential point added.
     */ addPotentialPoint(p) {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
    }
    /**
     * @param i The index of the potential point to remove.
     */ removePotentialPoint(i) {
        this.nodes.delete(i);
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
     * @param bondRef The bondRef.
     * @param hinderedRotorPotential The HinderedRotorPotential.
     * @param periodicity The Periodicity.
     */ constructor(attributes, bondRef, hinderedRotorPotential, periodicity){
        super(attributes, ExtraDOSCMethod.tagName);
        this.index = new Map();
        if (bondRef) {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set(BondRef.tagName, this.nodes.size - 1);
        }
        if (hinderedRotorPotential) {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set(HinderedRotorPotential.tagName, this.nodes.size - 1);
        }
        if (periodicity) {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set(Periodicity.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The bondRef.
     */ getBondRef() {
        let i = this.index.get(BondRef.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the bondRef.
     * @param bondRef The bondRef.
     */ setBondRef(bondRef) {
        let i = this.index.get(BondRef.tagName);
        if (i != undefined) this.nodes.set(i, bondRef);
        else {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set(BondRef.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The hindered rotor potential of the molecule.
     */ getHinderedRotorPotential() {
        let i = this.index.get(HinderedRotorPotential.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the hindered rotor potential.
     * @param hinderedRotorPotential The hindered rotor potential.
     */ setHinderedRotorPotential(hinderedRotorPotential) {
        let i = this.index.get(HinderedRotorPotential.tagName);
        if (i != undefined) this.nodes.set(i, hinderedRotorPotential);
        else {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set(HinderedRotorPotential.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The periodicity of the molecule.
     */ getPeriodicity() {
        let i = this.index.get(Periodicity.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the periodicity.
     * @param periodicity The periodicity.
     */ setPeriodicity(periodicity) {
        let i = this.index.get(Periodicity.tagName);
        if (i != undefined) this.nodes.set(i, periodicity);
        else {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set(Periodicity.tagName, this.nodes.size - 1);
        }
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
     * The key for the id attribute value.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the description attribute value.
     */ this.s_description = "description";
    }
    static{
        /**
     * The key for the active attribute value.
     */ this.s_active = "active";
    }
    /**
     * Create a molecule.
     * @param attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes may include "description" and "active" (and posibly others), but these do not exist for all molecules.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethod The extra method for calculating density of states.
     * @param reservoirSize The reservoir size.
     */ constructor(attributes, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize){
        super(attributes, Molecule.tagName);
        this.index = new Map();
        let id = attributes.get(Molecule.s_id);
        if (id == undefined) throw new Error(Molecule.s_id + " is undefined");
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
        if (properties) {
            this.nodes.set(i, properties);
            this.index.set(PropertyList.tagName, i);
            i++;
        }
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
     * Get the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */ getDescription() {
        return this.attributes.get(Molecule.s_description);
    }
    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */ setDescription(description) {
        this.attributes.set(Molecule.s_description, description);
    }
    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        let active = this.attributes.get(Molecule.s_active);
        if (active != undefined) {
            if (active == "true") return true;
            else return false;
        }
    }
    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */ setActive(active) {
        this.attributes.set(Molecule.s_active, active.toString());
    }
    /**
     * Get a label for the molecule which includes the is and any description and whether active.
     * @returns A label for the molecule detailing the attributes of the XML element (including id, 
     * and possibly including description and whether active).
     */ getLabel() {
        let label = this.id;
        let description = this.getDescription();
        if (description != undefined) label += " (" + description + ")";
        let active = this.getActive();
        if (active) label += " (" + Molecule.s_active + ")";
        return label;
    }
    /**
     * @returns A comma and space separated string of the attributes of the molecule.
     */ getAttributesAsString() {
        return Array.from(this.attributes, ([key, value])=>`${key}=\"${value}\"`).join(", ");
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
     * @param properties The properties.
     */ setProperties(properties) {
        let i = this.index.get(PropertyList.tagName);
        if (i == undefined) {
            this.index.set(PropertyList.tagName, this.nodes.size);
            this.addNode(properties);
        } else this.nodes.set(i, properties);
    }
    /**
     * Get a property.
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let properties = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof PropertyList) //console.log('PropertyList');
            return properties.getProperty(dictRef);
            else //console.log('Property');
            return properties;
        }
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        let properties = this.getProperties();
        if (properties != undefined) {
            if (properties instanceof PropertyList) properties.setProperty(property);
            else this.setProperties(properties);
        } else this.setProperties(property);
    }
    /**
     * @returns The atoms of the molecule.
     */ getAtoms() {
        let i = this.index.get(Atom.tagName);
        if (i == undefined) {
            i = this.index.get(AtomArray.tagName);
            if (i == undefined) return undefined;
            else return this.nodes.get(i);
        } else return this.nodes.get(i);
    }
    /**
     * @returns The bonds of the molecule.
     */ getBonds() {
        let i = this.index.get(BondArray.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The energy transfer model of the molecule.
     */ getEnergyTransferModel() {
        let i = this.index.get(EnergyTransferModel.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the energy transfer model.
     * @param energyTransferModel The energy transfer model.
     */ setEnergyTransferModel(energyTransferModel) {
        let i = this.index.get(EnergyTransferModel.tagName);
        if (i == undefined) {
            this.index.set(EnergyTransferModel.tagName, this.nodes.size);
            this.addNode(energyTransferModel);
        } else this.nodes.set(i, energyTransferModel);
    }
    /**
     * @returns The DOSC method of the molecule.
     */ getDOSCMethod() {
        let i = this.index.get(DOSCMethod.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the DOSC method.
     * @param dOSCMethod The DOSC method.
     */ setDOSCMethod(dOSCMethod) {
        let i = this.index.get(DOSCMethod.tagName);
        if (i == undefined) {
            this.index.set(DOSCMethod.tagName, this.nodes.size);
            this.addNode(dOSCMethod);
        } else this.nodes.set(i, dOSCMethod);
    }
    /**
     * @returns The extra DOSC method of the molecule.
     */ getExtraDOSCMethod() {
        let i = this.index.get(ExtraDOSCMethod.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */ setExtraDOSCMethod(extraDOSCMethod) {
        let i = this.index.get(ExtraDOSCMethod.tagName);
        if (i == undefined) {
            this.index.set(ExtraDOSCMethod.tagName, this.nodes.size);
            this.addNode(extraDOSCMethod);
        } else this.nodes.set(i, extraDOSCMethod);
    }
    /**
     * @returns The reservoir size of the molecule.
     */ getReservoirSize() {
        let i = this.index.get(ReservoirSize.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the reservoir size.
     * @param reservoirSize The reservoir size.
     */ setReservoirSize(reservoirSize) {
        let i = this.index.get(ReservoirSize.tagName);
        if (i == undefined) {
            this.index.set(ReservoirSize.tagName, this.nodes.size);
            this.addNode(reservoirSize);
        } else this.nodes.set(i, reservoirSize);
    }
    /**
     * Get the ZPE value of the molecule.
     */ getEnergy() {
        let p = this.getProperty(ZPE.dictRef);
        if (p == undefined) {
            console.log(this.toString());
            throw new Error(ZPE.dictRef + " property not found!");
        //return 0;
        }
        return p.getProperty().value;
    }
}

},{"./util.js":"f0Rnl","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8grVN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A reference to a molecule, not to be confused with a Molecule.
 * The attribute "ref" is the same as a Molecule ID for a molecule in the XML "moleculeList".
 * The attribute "role" is the role of the molecule in the reaction. Expected values are:
 * ["deficientReactant", "excessReactant", "modelled", "transitionState", "sink"], but this may depend on whether the molecule is a reactant, product or transition state.
 * In the XML, a "molecule" node is a child of a "reactant", "product" or "me:transitionState" node.
 */ parcelHelpers.export(exports, "ReactionMolecule", ()=>ReactionMolecule);
/**
 * A molecule that reacts in a reaction.
 * In the XML, a "reactant" node is a child of the "reaction" node and has a child "molecule" node.
 */ parcelHelpers.export(exports, "Reactant", ()=>Reactant);
/**
 * A molecule produced in a reaction.
 * In the XML, a "product" node is a child of the "reaction" node and has a child "molecule" node.
 */ parcelHelpers.export(exports, "Product", ()=>Product);
/**
 * A molecule that is a transition state in a reaction.
 * In the XML, a "me:transitionState" node is a child of the "reaction" node and has a child "molecule" node.
 */ parcelHelpers.export(exports, "TransitionState", ()=>TransitionState);
/**
 * In the XML, a "me:preExponential" node is a child of a "me:MCRCMethod" node.
 */ parcelHelpers.export(exports, "PreExponential", ()=>PreExponential);
/**
 * In the XML, a "me:activationEnergy" node is a child of a "me:MCRCMethod" node.
 */ parcelHelpers.export(exports, "ActivationEnergy", ()=>ActivationEnergy);
/**
 * In the XML, a "me:TInfinity" node is a child of a "me:MCRCMethod" node.
 */ parcelHelpers.export(exports, "TInfinity", ()=>TInfinity);
/**
 * In the XML, a "me:nInfinity" node is a child of a "me:MCRCMethod" node.
 */ parcelHelpers.export(exports, "NInfinity", ()=>NInfinity);
/**
 * Extended classes indicate how microcanonical rate constant is to be treated.
 * In the XML, a "me:MCRCMethod" node is a child of a "reaction" node.
 * A simple MCRCMethod has an attribute name="RRKM".
 * There are extended classed representing more complicated MCRCMethods:
 * "me:MesmerILT"
 * "LandauZenerCrossing"
 * "ZhuNakamuraCrossing"
 * "me:CanonicalRateCoefficient"
 * "DefinedSumOfStates"
 */ parcelHelpers.export(exports, "MCRCMethod", ()=>MCRCMethod);
/**
 * The Inverse Laplace Transform (ILT) type of microcanonical rate constant.
 */ parcelHelpers.export(exports, "MesmerILT", ()=>MesmerILT);
/**
 * In the XML, the "me:tunneling" node is a child of a "reaction" node.
 * The "name" attribute is one of: [Eckart, WKB].
 */ parcelHelpers.export(exports, "Tunneling", ()=>Tunneling);
/**
 * In the XML, the "me:excessReactantConc" node is a child of a "reaction" node.
 */ parcelHelpers.export(exports, "ExcessReactantConc", ()=>ExcessReactantConc);
/**
 * A class for representing a reaction.
 */ parcelHelpers.export(exports, "Reaction", ()=>Reaction);
var _xmlJs = require("./xml.js");
class ReactionMolecule extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */ constructor(attributes){
        super(attributes, ReactionMolecule.tagName);
        this.ref = attributes.get("ref");
        this.role = attributes.get("role");
    }
    /**
     * @param role The role of the molecule in the reaction.
     */ setRole(role) {
        this.role = role;
    }
}
class Reactant extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactant";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, Reactant.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class Product extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "product";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, Product.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class TransitionState extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:transitionState";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, TransitionState.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class PreExponential extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:preExponential";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, NInfinity.tagName, value);
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
     * Should any parameters be specified as being optional?
     * @param attributes The attributes.
     * @param preExponential The pre-exponential factor (optional).
     * @param activationEnergy The activation energy (optional).
     * @param tInfinity The TInfinity (optional).
     * @param nInfinity The nInfinity (optional).
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
     * @param preExponential The pre-exponential factor.
     */ setPreExponential(preExponential) {
        let i = this.index.get(PreExponential.tagName);
        if (i == undefined) {
            this.index.set(PreExponential.tagName, this.nodes.size);
            this.addNode(preExponential);
        } else this.nodes.set(i, preExponential);
    }
    /**
     * @returns The activation energy or undefined if it does not exist.
     */ getActivationEnergy() {
        let i = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param activationEnergy The activation energy.
     */ setActivationEnergy(activationEnergy) {
        let i = this.index.get(ActivationEnergy.tagName);
        if (i == undefined) {
            this.index.set(ActivationEnergy.tagName, this.nodes.size);
            this.addNode(activationEnergy);
        } else this.nodes.set(i, activationEnergy);
    }
    /**
     * @returns The TInfinity or undefined if it does not exist.
     */ getTInfinity() {
        let i = this.index.get(TInfinity.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param tInfinity The TInfinity.
     */ setTInfinity(tInfinity) {
        let i = this.index.get(TInfinity.tagName);
        if (i == undefined) {
            this.index.set(TInfinity.tagName, this.nodes.size);
            this.addNode(tInfinity);
        } else this.nodes.set(i, tInfinity);
    }
    /**
     * @returns The NInfinity or undefined if it does not exist.
     */ getNInfinity() {
        let i = this.index.get(NInfinity.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param nInfinity The NInfinity.
     */ setNInfinity(nInfinity) {
        let i = this.index.get(NInfinity.tagName);
        if (i == undefined) {
            this.index.set(NInfinity.tagName, this.nodes.size);
            this.addNode(nInfinity);
        } else this.nodes.set(i, nInfinity);
    }
}
class Tunneling extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:tunneling";
    }
    static{
        /**
     * The key to the name attribute value.
     */ this.s_name = "name";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, Tunneling.tagName);
    }
    /**
     * @returns The name of the tunneling method.
     */ getName() {
        return this.attributes.get(Tunneling.s_name);
    }
    /**
     * @param The name of the tunneling method.
     */ setName(name) {
        this.attributes.set(Tunneling.s_name, name);
    }
}
class ExcessReactantConc extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
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
    static{
        /**
     * The key to the id attribute value.
     */ this.s_id = "id";
    }
    /**
     * @param attributes The attributes.
     * @param id The id of the reaction.
     * @param reactants The reactants in the reaction.
     * @param products The products of the reaction.
     * @param tunneling The tunneling (optional).
     * @param transitionStates The transition states (optional).
     * @param mCRCMethod The MCRCMethod (optional).
     * @param excessReactantConc The excess reactant concentration (optional).
     */ constructor(attributes, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc){
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.reactantsIndex = new Map();
        this.productsIndex = new Map();
        this.transitionStatesIndex = new Map();
        let id = attributes.get(Reaction.s_id);
        if (id == undefined) throw new Error(Reaction.s_id + " is undefined!");
        this.id = id;
        if (reactants != undefined) {
            reactants.forEach((reactant)=>{
                this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
                this.addNode(reactant);
            });
            this.index.set(Reactant.tagName, this.reactantsIndex);
        }
        if (products != undefined) {
            products.forEach((product)=>{
                this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
                this.addNode(product);
            });
            this.index.set(Product.tagName, this.productsIndex);
        }
        if (tunneling != undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach((transitionState)=>{
                this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
                this.addNode(transitionState);
            });
            this.index.set(TransitionState.tagName, this.transitionStatesIndex);
        }
        if (mCRCMethod != undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc != undefined) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
    }
    /**
     * Add a node to the index.
     */ addToIndex(tagName, node) {
        let v = this.index.get(tagName);
        if (v == undefined) this.index.set(tagName, this.nodes.size);
        else if (v instanceof Map) v.set(node.tagName, this.nodes.size);
        else {
            let map = new Map();
            map.set(this.nodes.get(v).ref, v);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The reactants.
     */ getReactants() {
        let i = this.index.get(Reactant.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the reactants.
     */ setReactants(reactants) {
        reactants.forEach((reactant)=>{
            this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
            this.addNode(reactant);
        });
        this.index.set(Reactant.tagName, this.reactantsIndex);
    }
    /**
     * @returns A particular Reactant.
     * @param ref The ref of the reactant to return.
     * @returns The reactant at the given index.
     */ getReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) throw new Error(`Reactant with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param reactant The reactant to add.
     */ addReactant(reactant) {
        this.reactantsIndex.set(reactant.getMolecule().ref, this.nodes.size);
        this.addNode(reactant);
    }
    /**
     * @param ref The ref of the reactant to remove.
     */ removeReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) throw new Error(`Reactant with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.reactantsIndex.delete(ref);
        }
    }
    /**
     * @returns The products.
     */ getProducts() {
        let i = this.index.get(Product.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the products.
     */ setProducts(products) {
        products.forEach((product)=>{
            this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
            this.addNode(product);
        });
        this.index.set(Product.tagName, this.productsIndex);
    }
    /**
     * @returns A particular Product.
     * @param ref The ref of the product to return.
     * @returns The product at the given index.
     */ getProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) throw new Error(`Product with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param product The product to add.
     */ addProduct(product) {
        this.productsIndex.set(product.getMolecule().ref, this.nodes.size);
        this.addNode(product);
    }
    /**
     * @param ref The ref of the product to remove.
     */ removeProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) throw new Error(`Product with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.productsIndex.delete(ref);
        }
    }
    /**
     * @returns The tunneling node or undefined if it does not exist.
     */ getTunneling() {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the tunneling node or create it if it is undefined.
     */ setTunneling(tunneling) {
        let i = this.index.get(Tunneling.tagName);
        if (i == undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        } else {
            if (i instanceof Map) throw new Error("Tunneling is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, tunneling);
        }
    }
    /**
     * @returns The transition states.
     */ getTransitionStates() {
        let i = this.index.get(TransitionState.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the transition states.
     */ setTransitionStates(transitionStates) {
        transitionStates.forEach((transitionState)=>{
            this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
            this.addNode(transitionState);
        });
        this.index.set(TransitionState.tagName, this.transitionStatesIndex);
    }
    /**
     * @returns A particular TransitionState.
     * @param ref The ref of the transition state to return.
     * @returns The transition state at the given index.
     */ getTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) throw new Error(`Transition state with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param transitionState The transition state to add.
     */ addTransitionState(transitionState) {
        this.transitionStatesIndex.set(transitionState.getMolecule().ref, this.nodes.size);
        this.addNode(transitionState);
    }
    /**
     * @param ref The ref of the transition state to remove.
     */ removeTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) throw new Error(`Transition State with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.transitionStatesIndex.delete(ref);
        }
    }
    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */ getMCRCMethod() {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the MCRCMethod node or create it if it is undefined.
     */ setMCRCMethod(mCRCMethod) {
        let i = this.index.get(MCRCMethod.tagName);
        if (i == undefined) {
            this.index.set(MCRCMethod.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        } else {
            if (i instanceof Map) throw new Error("MCRCMethod is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, mCRCMethod);
        }
    }
    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */ getExcessReactantConc() {
        let i = this.index.get(ExcessReactantConc.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the excess reactant concentration or create it if it is undefined.
     */ setExcessReactantConc(excessReactantConc) {
        let i = this.index.get(ExcessReactantConc.tagName);
        if (i == undefined) {
            this.index.set(ExcessReactantConc.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        } else {
            if (i instanceof Map) throw new Error("ExcessReactantConc is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, excessReactantConc);
        }
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        return this.getReactants().map((reactant)=>reactant.getMolecule().ref).join(" + ");
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        return this.getProducts().map((product)=>product.getMolecule().ref).join(" + ");
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
    }
    /**
     * Returns the total energy of all reactants.
     * @returns The total energy of all reactants.
     */ getReactantsEnergy(molecules) {
        // Sum up the energy values of all the reactants in the reaction
        return Array.from(this.getReactants()).map((reactant)=>{
            let molecule = molecules.get(reactant.getMolecule().ref);
            if (molecule == undefined) throw new Error(`Molecule with ref ${reactant.getMolecule().ref} not found`);
            return molecule.getEnergy();
        }).reduce((a, b)=>a + b, 0);
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy(molecules) {
        // Sum up the energy values of all the products in the reaction
        return Array.from(this.getProducts()).map((product)=>{
            let molecule = molecules.get(product.getMolecule().ref);
            if (molecule == undefined) throw new Error(`Molecule with ref ${product.getMolecule().ref} not found`);
            return molecule.getEnergy();
        }).reduce((a, b)=>a + b, 0);
    }
    /**
     * @param tagName The tag name.
     * @param dictRef The dictRef.
     * @returns The node with the tag name and dictRef or undefined if it does not exist.
     */ get(tagName, dictRef) {
        if (this.index.has(tagName)) {
            let i = this.index.get(tagName);
            if (i != undefined) {
                if (i instanceof Map) {
                    let nodeIndex = i.get(dictRef);
                    if (nodeIndex != undefined) return this.nodes.get(nodeIndex);
                } else return this.nodes.get(i);
            }
        }
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hoJRr":[function(require,module,exports) {
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
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawLevel", ()=>drawLevel);
/**
 * Draw a line (segment) on the canvas.
 * @param ctx The context to use.
 * @param strokeStyle The name of a style to use for the line.
 * @param x1 The start x-coordinate of the line.
 * @param y1 The start y-coordinate of the line.
 * @param x2 The end x-coordinate of the line.
 * @param y2 The end y-coordinate of the line.
 */ parcelHelpers.export(exports, "drawLine", ()=>drawLine);
/**
 * Writes text to the canvas. (It is probably better to write all the labels in one go.)
 * @param ctx The context to use.
 * @param text The text to write.
 * @param font The font to use.
 * @param colour The colour of the text.
 * @param x The horizontal position of the text.
 * @param y The vertical position of the text.
 */ parcelHelpers.export(exports, "writeText", ()=>writeText);
/**
 * @param ctx The context to use.
 * @param text The text to get the height of.
 * @param font The font to use.
 * @returns The height of the text in pixels.
 */ parcelHelpers.export(exports, "getTextHeight", ()=>getTextHeight);
/**
 * @param ctx The context to use.
 * @param text The text to get the width of.
 * @param font The font to use.
 * @returns The width of the text in pixels.
 */ parcelHelpers.export(exports, "getTextWidth", ()=>getTextWidth);
function drawLevel(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + (x1 - x0) / 2;
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
 * A class for "me:bathGas".
 */ parcelHelpers.export(exports, "BathGas", ()=>BathGas);
/**
 * A class for "me:experimentRate".
 * The attributes may include ref1, ref2, refReaction, and error.
 */ parcelHelpers.export(exports, "ExperimentRate", ()=>ExperimentRate);
/**
 * A class for "me:experimentalYield".
 * The attributes may include:
 * ref:string
 * error: number
 * yieldTime: number.
 */ parcelHelpers.export(exports, "ExperimentalYield", ()=>ExperimentalYield);
/**
 * A class for "me:experimentalEigenvalue".
 * The attributes may include:
 * EigenvalueID:string
 * error: number
 */ parcelHelpers.export(exports, "ExperimentalEigenvalue", ()=>ExperimentalEigenvalue);
/**
 * A class for "me:excessReactantConc".
 * The attributes may include:
 * percent: string ("true" or "false")
 */ parcelHelpers.export(exports, "ExcessReactantConc", ()=>ExcessReactantConc);
/**
 * A class for representing a Pressure and Temperature pair with optional additional things: BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
 * The attributes include:
 * units: string
 * P: number
 * T: number
 * And optionally:
 * percentExcessReactantConc: number
 * excessReactantConc: string
 * precision: number
 * bathGas: string
 * If excessReactantConc="true" then the node contains a node of type "me:excessReactantConc".
 * 
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
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     */ constructor(attributes, moleculeID){
        super(attributes, BathGas.tagName, moleculeID);
    }
}
class ExperimentRate extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentRate";
    }
    static{
        /**
     * The key to the ref1 attribute value.
     */ this.s_ref1 = "ref1";
    }
    static{
        /**
     * The key to the ref2 attribute value.
     */ this.s_ref2 = "ref2";
    }
    static{
        /**
     * The key to the refReaction attribute value.
     */ this.s_refReaction = "refReaction";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */ constructor(attributes, value){
        super(attributes, ExperimentRate.tagName, value);
    }
    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */ getRef1() {
        return this.attributes.get(ExperimentRate.s_ref1);
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */ setRef1(ref1) {
        this.attributes.set(ExperimentRate.s_ref1, ref1);
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */ getRef2() {
        return this.attributes.get(ExperimentRate.s_ref2);
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */ setRef2(ref2) {
        this.attributes.set(ExperimentRate.s_ref2, ref2);
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */ getRefReaction() {
        return this.attributes.get(ExperimentRate.s_refReaction);
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */ setRefReaction(refReaction) {
        this.attributes.set(ExperimentRate.s_refReaction, refReaction);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        let error = this.attributes.get(ExperimentRate.s_error);
        if (error != undefined) return parseFloat(error);
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set(ExperimentRate.s_error, error.toString());
    }
}
class ExperimentalYield extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentalYield";
    }
    static{
        /**
     * The key to the ref attribute value.
     */ this.s_ref = "ref";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    static{
        /**
     * The key to the yieldTime attribute value.
     */ this.s_yieldTime = "yieldTime";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ExperimentalYield.tagName, value);
    }
    /**
     * @returns The ref attribute or undefined if there is no ref attribute.
     */ getRef() {
        return this.attributes.get(ExperimentalYield.s_ref);
    }
    /**
     * Set the ref attribute.
     * @param ref The ref.
     */ setRef(ref) {
        this.attributes.set(ExperimentalYield.s_ref, ref);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        let error = this.attributes.get(ExperimentalYield.s_error);
        if (error != undefined) return parseFloat(error);
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set(ExperimentalYield.s_error, error.toString());
    }
    /**
     * @returns The yieldTime attribute or undefined if there is no yieldTime attribute.
     */ getYieldTime() {
        let yieldTime = this.attributes.get(ExperimentalYield.s_yieldTime);
        if (yieldTime) return parseFloat(yieldTime);
    }
    /**
     * Set the yieldTime attribute.
     * @param yieldTime The yieldTime.
     */ setYieldTime(yieldTime) {
        this.attributes.set(ExperimentalYield.s_yieldTime, yieldTime.toString());
    }
}
class ExperimentalEigenvalue extends (0, _xmlJs.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:experimentalEigenvalue";
    }
    static{
        /**
     * The key to the EigenvalueID attribute value.
     */ this.s_EigenvalueID = "EigenvalueID";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ExperimentalEigenvalue.tagName, value);
    }
    /**
     * @returns The EigenvalueID attribute or undefined if there is no EigenvalueID attribute.
     */ getEigenvalueID() {
        return this.attributes.get(ExperimentalEigenvalue.s_EigenvalueID);
    }
    /**
     * Set the EigenvalueID attribute.
     * @param EigenvalueID The EigenvalueID.
     */ setEigenvalueID(EigenvalueID) {
        this.attributes.set(ExperimentalEigenvalue.s_EigenvalueID, EigenvalueID);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        let error = this.attributes.get(ExperimentalEigenvalue.s_error);
        if (error != undefined) return parseFloat(error);
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set(ExperimentalEigenvalue.s_error, error.toString());
    }
}
class ExcessReactantConc extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    static{
        /**
     * The key to the percent attribute value.
     */ this.s_percent = "percent";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ExcessReactantConc.tagName, value);
    }
    /**
     * @returns The percent attribute or undefined if there is no percent attribute.
     */ getPercent() {
        return this.attributes.get(ExcessReactantConc.s_percent);
    }
    /**
     * Set the percent attribute.
     * @param percent The percent.
     */ setPercent(percent) {
        this.attributes.set(ExcessReactantConc.s_percent, percent);
    }
}
class PTpair extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    static{
        /**
     * The precision attribute potential values.
     */ this.precisions = [
            "d",
            "dd",
            "qd",
            "double",
            "double-double",
            "quad-double"
        ];
    }
    static{
        /**
     * The choice of units.
     */ this.pressureUnits = [
            "Torr",
            "PPCC",
            "atm",
            "mbar",
            "psi",
            "mols/cc"
        ];
    }
    static{
        /**
     * The key to the P attribute value.
     */ this.s_P = "P";
    }
    static{
        /**
     * The key to the T attribute value.
     */ this.s_T = "T";
    }
    static{
        /**
     * The key to the precision attribute value.
     */ this.s_precision = "precision";
    }
    static{
        /**
     * The key to the excessReactantConc attribute value.
     */ this.s_excessReactantConc = "excessReactantConc";
    }
    static{
        /**
     * The key to the percentExcessReactantConc attribute value.
     */ this.s_percentExcessReactantConc = "percentExcessReactantConc";
    }
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */ constructor(attributes, bathGas, experimentRate, excessReactantConc, experimentalEigenvalue){
        super(attributes, PTpair.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (excessReactantConc != undefined) {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
        if (experimentalEigenvalue != undefined) {
            this.index.set(ExperimentalEigenvalue.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        let p = this.attributes.get(PTpair.s_P);
        if (p != undefined) return parseFloat(p);
        return NaN;
    }
    /**
     * Set The Pressure
     */ setP(p) {
        this.attributes.set(PTpair.s_P, p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        let t = this.attributes.get(PTpair.s_T);
        if (t != undefined) return parseFloat(t);
        return NaN;
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        this.attributes.set(PTpair.s_T, t.toString());
    }
    /**
     * @returns The precision attribute or undefined if there is no precision attribute.
     */ getPrecision() {
        return this.attributes.get(PTpair.s_precision);
    }
    /**
     * Set the precision attribute.
     * @param precision The precision.
     */ setPrecision(precision) {
        this.attributes.set(PTpair.s_precision, precision);
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param bathGas The bath gas.
     */ setBathGas(bathGas) {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) this.nodes.set(i, bathGas);
        else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * Remove the bath gas.
     */ removeBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(BathGas.tagName);
        }
    }
    /**
     * @returns The experiment rate.
     */ getExperimentRate() {
        let i = this.index.get(ExperimentRate.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentRate(experimentRate) {
        let i = this.index.get(ExperimentRate.tagName);
        if (i != undefined) this.nodes.set(i, experimentRate);
        else {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * Remove the experiment rate.
     */ removeExperimentRate() {
        let i = this.index.get(ExperimentRate.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentRate.tagName);
        }
    }
    /**
     * @returns this.attributes.get("excessReactantConc").
     */ getExcessReactantConc() {
        return this.attributes.get(PTpair.s_excessReactantConc);
    }
    /**
     * this.attributes.set("excessReactantConc", excessReactantConc).
     */ setExcessReactantConc(excessReactantConc) {
        this.attributes.set(PTpair.s_excessReactantConc, excessReactantConc);
    }
    /**
     * @returns this.attributes.get("percentExcessReactantConc").
     */ getPercentExcessReactantConc() {
        return this.attributes.get(PTpair.s_percentExcessReactantConc);
    }
    /**
     * this.attributes.set("percentExcessReactantConc", percentExcessReactantConc).
     */ setPercentExcessReactantConc(percentExcessReactantConc) {
        this.attributes.set(PTpair.s_percentExcessReactantConc, percentExcessReactantConc);
    }
}
class PTs extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTs";
    }
    /**
     * @param attributes The attributes.
     * @param pTs The PTs.
     */ constructor(attributes, pTpairs){
        super(attributes, PTs.tagName);
        if (pTpairs != undefined) {
            pTpairs.forEach((pTpair)=>{
                this.addNode(pTpair);
            });
            this.pTpairs = pTpairs;
        } else this.pTpairs = [];
    }
    /**
     * @param i The index of the PTpair to return. 
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */ getPTpair(i) {
        return this.pTpairs[i];
    }
    /**
     * Set the PT at the given index.
     * @param i The index.
     * @returns The PT pairs.
     */ setPTpair(i, pTpair) {
        this.nodes.set(i, pTpair);
        this.pTpairs[i] = pTpair;
    }
    /**
     * Add a PTpair.
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */ addPTpair(pTpair) {
        this.addNode(pTpair);
        this.pTpairs.push(pTpair);
        return this.nodes.size - 1;
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     */ setPTpairs(pTpairs) {
        this.nodes.clear();
        pTpairs.forEach((pTpair)=>{
            this.addNode(pTpair);
            this.pTpairs.push(pTpair);
        });
    }
    /**
     * Remove the PT at the given index.
     * @param i The index.
     */ removePTpair(i) {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
    }
}
class Conditions extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:conditions";
    }
    /**
     * @param attributes The attributes.
     * @param bathGases The bath gases.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */ constructor(attributes, bathGases, pTs){
        super(attributes, Conditions.tagName);
        this.index = new Map();
        this.bathGasesIndex = new Map();
        this.bathGases = new Set();
        if (bathGases != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            bathGases.forEach((bathGas)=>{
                this.bathGasesIndex.set(bathGas.value, this.nodes.size);
                this.addNode(bathGas);
                this.bathGases.add(bathGas);
            });
        }
        if (pTs != undefined) {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
    /**
     * @returns The bath gases.
     */ getBathGases() {
        return this.bathGases;
    }
    /**
     * @param bathGas The bath gas to add.
     */ addBathGas(bathGas) {
        if (!this.bathGases.has(bathGas)) {
            this.bathGases.add(bathGas);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @param bathGas The bath gas to remove.
     */ removeBathGas(bathGas) {
        if (this.bathGases.has(bathGas)) {
            this.bathGases.delete(bathGas);
            this.nodes.delete(this.bathGasesIndex.get(bathGas.value));
        } else console.warn("Conditions.removeBathGas: bathGas not found to remove.");
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */ getPTs() {
        let i = this.index.get(PTs.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param pTs The PTs.
     */ setPTs(pTs) {
        let i = this.index.get(PTs.tagName);
        if (i != undefined) this.nodes.set(i, pTs);
        else {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kQHfz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for "me:grainSize".
 */ parcelHelpers.export(exports, "GrainSize", ()=>GrainSize);
/**
 * A class for "me:automaticallySetMaxEne".
 */ parcelHelpers.export(exports, "AutomaticallySetMaxEne", ()=>AutomaticallySetMaxEne);
/**
 * A class for "me:energyAboveTheTopHill".
 */ parcelHelpers.export(exports, "EnergyAboveTheTopHill", ()=>EnergyAboveTheTopHill);
/**
 * A class for "me:maxTemperature".
 */ parcelHelpers.export(exports, "MaxTemperature", ()=>MaxTemperature);
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
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, GrainSize.tagName, value);
    }
}
class AutomaticallySetMaxEne extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:automaticallySetMaxEne";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, AutomaticallySetMaxEne.tagName, value);
    }
}
class EnergyAboveTheTopHill extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyAboveTheTopHill";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, EnergyAboveTheTopHill.tagName, value);
    }
}
class MaxTemperature extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:maxTemperature";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, MaxTemperature.tagName, value);
    }
}
class ModelParameters extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:modelParameters";
    }
    /**
     * @param attributes The attributes.
     * @param grainSize The grain size.
     * @param automaticallySetMaxEne The automatically set max energy.
     * @param energyAboveTheTopHill The energy above the top hill.
     * @param maxTemperature The max temperature.
     */ constructor(attributes, grainSize, automaticallySetMaxEne, energyAboveTheTopHill, maxTemperature){
        super(attributes, ModelParameters.tagName);
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (automaticallySetMaxEne != undefined) {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
        if (maxTemperature != undefined) {
            this.index.set(MaxTemperature.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
    /**
     * @returns The grain size or undefined.
     */ getGrainSize() {
        let i = this.index.get(GrainSize.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param grainSize The grain size.
     */ setGrainSize(grainSize) {
        let i = this.index.get(GrainSize.tagName);
        if (i) this.nodes.set(i, grainSize);
        else {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
    }
    /**
     * Removes the grain size.
     */ removeGrainSize() {
        let i = this.index.get(GrainSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(GrainSize.tagName);
        }
    }
    /**
     * @returns The automatically set max energy or undefined.
     */ getAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param automaticallySetMaxEne The automatically set max energy.
     */ setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i) this.nodes.set(i, automaticallySetMaxEne);
        else {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }
    /**
     * Removes the automatically set max energy.
     */ removeAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(AutomaticallySetMaxEne.tagName);
        }
    }
    /**
     * @returns The energy above the top hill or undefined.
     */ getEnergyAboveTheTopHill() {
        let i = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param energyAboveTheTopHill The energy above the top hill.
     */ setEnergyAboveTheTopHill(energyAboveTheTopHill) {
        let i = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i) this.nodes.set(i, energyAboveTheTopHill);
        else {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }
    /**
     * Removes the energy above the top hill.
     */ removeEnergyAboveTheTopHill() {
        let i = this.index.get(EnergyAboveTheTopHill.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(EnergyAboveTheTopHill.tagName);
        }
    }
    /**
     * @returns The max temperature or undefined.
     */ getMaxTemperature() {
        let i = this.index.get(MaxTemperature.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param maxTemperature The max temperature.
     */ setMaxTemperature(maxTemperature) {
        let i = this.index.get(MaxTemperature.tagName);
        if (i) this.nodes.set(i, maxTemperature);
        else {
            this.index.set(MaxTemperature.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
    /**
     * Removes the max temperature.
     */ removeMaxTemperature() {
        let i = this.index.get(MaxTemperature.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MaxTemperature.tagName);
        }
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Qx5gu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for "me:calculateRateCoefficientsOnly".
 */ parcelHelpers.export(exports, "CalculateRateCoefficientsOnly", ()=>CalculateRateCoefficientsOnly);
/**
 * A class for "me:printCellDOS".
 */ parcelHelpers.export(exports, "PrintCellDOS", ()=>PrintCellDOS);
/**
 * A class for "me:printCellTransitionStateFlux".
 */ parcelHelpers.export(exports, "PrintCellTransitionStateFlux", ()=>PrintCellTransitionStateFlux);
/**
 * A class for "me:printReactionOperatorColumnSums".
 */ parcelHelpers.export(exports, "PrintReactionOperatorColumnSums", ()=>PrintReactionOperatorColumnSums);
/**
 * A class for "me:printGrainBoltzmann".
 */ parcelHelpers.export(exports, "PrintGrainBoltzmann", ()=>PrintGrainBoltzmann);
/**
 * A class for "me:printGrainDOS".
 */ parcelHelpers.export(exports, "PrintGrainDOS", ()=>PrintGrainDOS);
/**
 * A class for "me:printGrainkbE".
 */ parcelHelpers.export(exports, "PrintGrainkbE", ()=>PrintGrainkbE);
/**
 * A class for "me:printGrainkfE".
 */ parcelHelpers.export(exports, "PrintGrainkfE", ()=>PrintGrainkfE);
/**
 * A class for "me:printTSsos".
 */ parcelHelpers.export(exports, "PrintTSsos", ()=>PrintTSsos);
/**
 * A class for "me:printGrainedSpeciesProfile".
 */ parcelHelpers.export(exports, "PrintGrainedSpeciesProfile", ()=>PrintGrainedSpeciesProfile);
/**
 * A class for "me:printGrainTransitionStateFlux".
 */ parcelHelpers.export(exports, "PrintGrainTransitionStateFlux", ()=>PrintGrainTransitionStateFlux);
/**
 * A class for "me:printReactionOperatorSize".
 */ parcelHelpers.export(exports, "PrintReactionOperatorSize", ()=>PrintReactionOperatorSize);
/**
 * A class for "me:printSpeciesProfile".
 */ parcelHelpers.export(exports, "PrintSpeciesProfile", ()=>PrintSpeciesProfile);
/**
 * A class for "me:printPhenomenologicalEvolution".
 */ parcelHelpers.export(exports, "PrintPhenomenologicalEvolution", ()=>PrintPhenomenologicalEvolution);
/**
 * A class for "me:printTunnelingCoefficients".
 */ parcelHelpers.export(exports, "PrintTunnelingCoefficients", ()=>PrintTunnelingCoefficients);
/**
 * A class for "me:printCrossingCoefficients".
 */ parcelHelpers.export(exports, "PrintCrossingCoefficients", ()=>PrintCrossingCoefficients);
/**
 * A class for "me:testDOS".
 */ parcelHelpers.export(exports, "TestDOS", ()=>TestDOS);
/**
 * A class for "me:testRateConstant".
 */ parcelHelpers.export(exports, "TestRateConstants", ()=>TestRateConstants);
/**
 * A class for "me:useTheSameCellNumberForAllConditions.
 */ parcelHelpers.export(exports, "UseTheSameCellNumberForAllConditions", ()=>UseTheSameCellNumberForAllConditions);
/**
 * A class for "me:ForceMacroDetailedBalance".
 */ parcelHelpers.export(exports, "ForceMacroDetailedBalance", ()=>ForceMacroDetailedBalance);
/**
 * A class for "me:hideInactive".
 */ parcelHelpers.export(exports, "HideInactive", ()=>HideInactive);
/**
 * A class for "me:calcMethod".
 */ parcelHelpers.export(exports, "CalcMethod", ()=>CalcMethod);
/**
 * A class for "me:eigenvalues".
 */ parcelHelpers.export(exports, "Eigenvalues", ()=>Eigenvalues);
/**
 * A class for "me:shortestTimeOfInterest".
 */ parcelHelpers.export(exports, "ShortestTimeOfInterest", ()=>ShortestTimeOfInterest);
/**
 * A class for "me:MaximumEvolutionTime".
 */ parcelHelpers.export(exports, "MaximumEvolutionTime", ()=>MaximumEvolutionTime);
/**
 * A class for "me:automaticallySetMaxEne".
 */ parcelHelpers.export(exports, "AutomaticallySetMaxEne", ()=>AutomaticallySetMaxEne);
/**
 * A class for "me:diagramEnergyOffset".
 */ parcelHelpers.export(exports, "DiagramEnergyOffset", ()=>DiagramEnergyOffset);
/**
 * A class for "me:testMicroRates".
 * Expected numerical attributes: Tmin, Tmax, Tstep.
 */ parcelHelpers.export(exports, "TestMicroRates", ()=>TestMicroRates);
/**
 * A class for the control.
 */ parcelHelpers.export(exports, "Control", ()=>Control);
var _xml = require("./xml");
class CalculateRateCoefficientsOnly extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:calculateRateCoefficientsOnly";
    }
    constructor(){
        super(CalculateRateCoefficientsOnly.tagName);
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
class PrintCellTransitionStateFlux extends (0, _xml.Tag) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:printCellTransitionStateFlux";
    }
    constructor(){
        super(PrintCellTransitionStateFlux.tagName);
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
class PrintTSsos extends (0, _xml.Tag) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:printTSsos";
    }
    constructor(){
        super(PrintTSsos.tagName);
    }
}
class PrintGrainedSpeciesProfile extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainedSpeciesProfile";
    }
    constructor(){
        super(PrintGrainedSpeciesProfile.tagName);
    }
}
class PrintGrainTransitionStateFlux extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainTransitionStateFlux";
    }
    constructor(){
        super(PrintGrainTransitionStateFlux.tagName);
    }
}
class PrintReactionOperatorSize extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printReactionOperatorSize";
    }
    constructor(){
        super(PrintReactionOperatorSize.tagName);
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
class PrintPhenomenologicalEvolution extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printPhenomenologicalEvolution";
    }
    constructor(){
        super(PrintPhenomenologicalEvolution.tagName);
    }
}
class PrintTunnelingCoefficients extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printTunnelingCoefficients";
    }
    constructor(){
        super(PrintTunnelingCoefficients.tagName);
    }
}
class PrintCrossingCoefficients extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printCrossingCoefficients";
    }
    constructor(){
        super(PrintCrossingCoefficients.tagName);
    }
}
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
class TestRateConstants extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testRateConstants";
    }
    constructor(){
        super(TestRateConstants.tagName);
    }
}
class UseTheSameCellNumberForAllConditions extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:useTheSameCellNumberForAllConditions";
    }
    constructor(){
        super(UseTheSameCellNumberForAllConditions.tagName);
    }
}
class ForceMacroDetailedBalance extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:ForceMacroDetailedBalance";
    }
    constructor(){
        super(ForceMacroDetailedBalance.tagName);
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
class CalcMethod extends (0, _xml.StringNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:calcMethod";
    }
    static{
        /**
     * The possible values.
     */ this.options = [
            "simpleCalc",
            "gridSearch",
            "fitting",
            "marquardt",
            "analyticalRepresentation",
            "ThermodynamicTable",
            "sensitivityAnalysis"
        ];
    }
    /**
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, CalcMethod.tagName, value);
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
class ShortestTimeOfInterest extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:shortestTimeOfInterest";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ShortestTimeOfInterest.tagName, value);
    }
}
class MaximumEvolutionTime extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MaximumEvolutionTime";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, MaximumEvolutionTime.tagName, value);
    }
}
class AutomaticallySetMaxEne extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:automaticallySetMaxEne";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, AutomaticallySetMaxEne.tagName, value);
    }
}
class DiagramEnergyOffset extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:diagramEnergyOffset";
    }
    /**
      * @param attributes The attributes.
      * @param value The value.
      */ constructor(attributes, value){
        super(attributes, DiagramEnergyOffset.tagName, value);
    }
}
class TestMicroRates extends (0, _xml.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testMicroRates";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, TestMicroRates.tagName);
        this.tMin = parseFloat(attributes.get("Tmin"));
        this.tMax = parseFloat(attributes.get("Tmax"));
        this.tStep = parseFloat(attributes.get("Tstep"));
    }
    /**
     * @returns The maximum temperature.
     */ getTmin() {
        return this.tMin;
    }
    /**
     * @param tMin The minimum temperature.
     */ setTmin(tMin) {
        this.tMin = tMin;
        this.attributes?.set("Tmin", tMin.toString());
    }
    /**
     * @returns The maximum temperature.
     */ getTmax() {
        return this.tMax;
    }
    /**
     * @param tMax The maximum temperature.
     */ setTmax(tMax) {
        this.tMax = tMax;
        this.attributes?.set("Tmax", tMax.toString());
    }
    /**
     * @returns The temperature step.
     */ getTstep() {
        return this.tStep;
    }
    /**
     * @param tStep The temperature step.
     */ setTstep(tStep) {
        this.tStep = tStep;
        this.attributes?.set("Tstep", tStep.toString());
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
     */ constructor(attributes){
        super(attributes, Control.tagName);
        this.index = new Map();
    }
    /**
     * @returns The calculateRateCoefficientsOnly or undefined.
     */ getCalculateRateCoefficientsOnly() {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param calculateRateCoefficientsOnly The calculateRateCoefficientsOnly.
     */ setCalculateRateCoefficientsOnly(calculateRateCoefficientsOnly) {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) this.nodes.set(i, calculateRateCoefficientsOnly);
        else {
            this.index.set(CalculateRateCoefficientsOnly.tagName, this.nodes.size);
            this.addNode(calculateRateCoefficientsOnly);
        }
    }
    /**
     * Remove the calculateRateCoefficientsOnly.
     */ removeCalculateRateCoefficientsOnly() {
        let i = this.index.get(CalculateRateCoefficientsOnly.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(CalculateRateCoefficientsOnly.tagName);
        }
    }
    /**
     * @returns The printCellDOS or undefined.
     */ getPrintCellDOS() {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCellDOS The printCellDOS.
     */ setPrintCellDOS(printCellDOS) {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) this.nodes.set(i, printCellDOS);
        else {
            this.index.set(PrintCellDOS.tagName, this.nodes.size);
            this.addNode(printCellDOS);
        }
    }
    /**
     * Remove the printCellDOS.
     */ removePrintCellDOS() {
        let i = this.index.get(PrintCellDOS.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintCellDOS.tagName);
        }
    }
    /**
     * @returns The printCellTransitionStateFlux or undefined.
     */ getPrintCellTransitionStateFlux() {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCellTransitionStateFlux The printCellTransitionStateFlux.
     */ setPrintCellTransitionStateFlux(printCellTransitionStateFlux) {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) this.nodes.set(i, printCellTransitionStateFlux);
        else {
            this.index.set(PrintCellTransitionStateFlux.tagName, this.nodes.size);
            this.addNode(printCellTransitionStateFlux);
        }
    }
    /**
     * Remove the printCellTransitionStateFlux.
     */ removePrintCellTransitionStateFlux() {
        let i = this.index.get(PrintCellTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintCellTransitionStateFlux.tagName);
        }
    }
    /**
     * @returns The printReactionOperatorColumnSums or undefined.
     */ getPrintReactionOperatorColumnSums() {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     */ setPrintReactionOperatorColumnSums(printReactionOperatorColumnSums) {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) this.nodes.set(i, printReactionOperatorColumnSums);
        else {
            this.index.set(PrintReactionOperatorColumnSums.tagName, this.nodes.size);
            this.addNode(printReactionOperatorColumnSums);
        }
    }
    /**
     * Remove the printReactionOperatorColumnSums.
     */ removePrintReactionOperatorColumnSums() {
        let i = this.index.get(PrintReactionOperatorColumnSums.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintReactionOperatorColumnSums.tagName);
        }
    }
    /**
     * @returns The printGrainBoltzmann or undefined.
     */ getPrintGrainBoltzmann() {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainBoltzmann The printGrainBoltzmann.
     */ setPrintGrainBoltzmann(printGrainBoltzmann) {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) this.nodes.set(i, printGrainBoltzmann);
        else {
            this.index.set(PrintGrainBoltzmann.tagName, this.nodes.size);
            this.addNode(printGrainBoltzmann);
        }
    }
    /**
     * Remove the printGrainBoltzmann.
     */ removePrintGrainBoltzmann() {
        let i = this.index.get(PrintGrainBoltzmann.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainBoltzmann.tagName);
        }
    }
    /**
     * @returns The printGrainDOS or undefined.
     */ getPrintGrainDOS() {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainDOS The printGrainDOS.
     */ setPrintGrainDOS(printGrainDOS) {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) this.nodes.set(i, printGrainDOS);
        else {
            this.index.set(PrintGrainDOS.tagName, this.nodes.size);
            this.addNode(printGrainDOS);
        }
    }
    /**
     * Remove the printGrainDOS.
     */ removePrintGrainDOS() {
        let i = this.index.get(PrintGrainDOS.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainDOS.tagName);
        }
    }
    /**
     * @returns The printGrainkbE or undefined.
     */ getPrintGrainkbE() {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainkbE The printGrainkbE.
     */ setPrintGrainkbE(printGrainkbE) {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) this.nodes.set(i, printGrainkbE);
        else {
            this.index.set(PrintGrainkbE.tagName, this.nodes.size);
            this.addNode(printGrainkbE);
        }
    }
    /**
     * Remove the printGrainkbE.
     */ removePrintGrainkbE() {
        let i = this.index.get(PrintGrainkbE.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainkbE.tagName);
        }
    }
    /**
     * @returns The printGrainkfE or undefined.
     */ getPrintGrainkfE() {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainkfE The printGrainkfE.
     */ setPrintGrainkfE(printGrainkfE) {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) this.nodes.set(i, printGrainkfE);
        else {
            this.index.set(PrintGrainkfE.tagName, this.nodes.size);
            this.addNode(printGrainkfE);
        }
    }
    /**
     * Remove the printGrainkfE.
     */ removePrintGrainkfE() {
        let i = this.index.get(PrintGrainkfE.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainkfE.tagName);
        }
    }
    /**
     * @returns The printTSsos or undefined.
     */ getPrintTSsos() {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTSsos The printTSsos.
     */ setPrintTSsos(printTSsos) {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) this.nodes.set(i, printTSsos);
        else {
            this.index.set(PrintTSsos.tagName, this.nodes.size);
            this.addNode(printTSsos);
        }
    }
    /**
     * Remove the printTSsos.
     */ removePrintTSsos() {
        let i = this.index.get(PrintTSsos.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintTSsos.tagName);
        }
    }
    /**
     * @returns The printGrainedSpeciesProfile or undefined.
     */ getPrintGrainedSpeciesProfile() {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainedSpeciesProfile The printGrainedSpeciesProfile.
     */ setPrintGrainedSpeciesProfile(printGrainedSpeciesProfile) {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) this.nodes.set(i, printGrainedSpeciesProfile);
        else {
            this.index.set(PrintGrainedSpeciesProfile.tagName, this.nodes.size);
            this.addNode(printGrainedSpeciesProfile);
        }
    }
    /**
     * Remove the printGrainedSpeciesProfile.
     */ removePrintGrainedSpeciesProfile() {
        let i = this.index.get(PrintGrainedSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainedSpeciesProfile.tagName);
        }
    }
    /**
     * @returns The printGrainTransitionStateFlux or undefined.
     */ getPrintGrainTransitionStateFlux() {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainTransitionStateFlux The printGrainTransitionStateFlux.
     */ setPrintGrainTransitionStateFlux(printGrainTransitionStateFlux) {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) this.nodes.set(i, printGrainTransitionStateFlux);
        else {
            this.index.set(PrintGrainTransitionStateFlux.tagName, this.nodes.size);
            this.addNode(printGrainTransitionStateFlux);
        }
    }
    /**
     * Remove the printGrainTransitionStateFlux.
     */ removePrintGrainTransitionStateFlux() {
        let i = this.index.get(PrintGrainTransitionStateFlux.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintGrainTransitionStateFlux.tagName);
        }
    }
    /**
     * @returns The printReactionOperatorSize or undefined.
     */ getPrintReactionOperatorSize() {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printReactionOperatorSize The printReactionOperatorSize.
     */ setPrintReactionOperatorSize(printReactionOperatorSize) {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) this.nodes.set(i, printReactionOperatorSize);
        else {
            this.index.set(PrintReactionOperatorSize.tagName, this.nodes.size);
            this.addNode(printReactionOperatorSize);
        }
    }
    /**
     * Remove the printReactionOperatorSize.
     */ removePrintReactionOperatorSize() {
        let i = this.index.get(PrintReactionOperatorSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintReactionOperatorSize.tagName);
        }
    }
    /**
     * @returns The printSpeciesProfile or undefined.
     */ getPrintSpeciesProfile() {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printSpeciesProfile The printSpeciesProfile.
     */ setPrintSpeciesProfile(printSpeciesProfile) {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) this.nodes.set(i, printSpeciesProfile);
        else {
            this.index.set(PrintSpeciesProfile.tagName, this.nodes.size);
            this.addNode(printSpeciesProfile);
        }
    }
    /**
     * Remove the printSpeciesProfile.
     */ removePrintSpeciesProfile() {
        let i = this.index.get(PrintSpeciesProfile.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintSpeciesProfile.tagName);
        }
    }
    /**
     * @returns The printPhenomenologicalEvolution or undefined.
     */ getPrintPhenomenologicalEvolution() {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printPhenomenologicalEvolution The printPhenomenologicalEvolution.
     */ setPrintPhenomenologicalEvolution(printPhenomenologicalEvolution) {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) this.nodes.set(i, printPhenomenologicalEvolution);
        else {
            this.index.set(PrintPhenomenologicalEvolution.tagName, this.nodes.size);
            this.addNode(printPhenomenologicalEvolution);
        }
    }
    /**
     * Remove the printPhenomenologicalEvolution.
     */ removePrintPhenomenologicalEvolution() {
        let i = this.index.get(PrintPhenomenologicalEvolution.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintPhenomenologicalEvolution.tagName);
        }
    }
    /**
     * @returns The printTunnelingCoefficients or undefined.
     */ getPrintTunnelingCoefficients() {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTunnelingCoefficients The printTunnelingCoefficients.
     */ setPrintTunnelingCoefficients(printTunnelingCoefficients) {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) this.nodes.set(i, printTunnelingCoefficients);
        else {
            this.index.set(PrintTunnelingCoefficients.tagName, this.nodes.size);
            this.addNode(printTunnelingCoefficients);
        }
    }
    /**
     * Remove the printTunnelingCoefficients.
     */ removePrintTunnelingCoefficients() {
        let i = this.index.get(PrintTunnelingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintTunnelingCoefficients.tagName);
        }
    }
    /**
     * @returns The printCrossingCoefficients or undefined.
     */ getPrintCrossingCoefficients() {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCrossingCoefficients The printCrossingCoefficients.
     */ setPrintCrossingCoefficients(printCrossingCoefficients) {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) this.nodes.set(i, printCrossingCoefficients);
        else {
            this.index.set(PrintCrossingCoefficients.tagName, this.nodes.size);
            this.addNode(printCrossingCoefficients);
        }
    }
    /**
     * Remove the printCrossingCoefficients.
     */ removePrintCrossingCoefficients() {
        let i = this.index.get(PrintCrossingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintCrossingCoefficients.tagName);
        }
    }
    /**
     * @returns The testDOS or undefined.
     */ getTestDOS() {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testDOS The testDOS.
     */ setTestDOS(testDOS) {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) this.nodes.set(i, testDOS);
        else {
            this.index.set(TestDOS.tagName, this.nodes.size);
            this.addNode(testDOS);
        }
    }
    /**
     * Remove the testDOS.
     */ removeTestDOS() {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestDOS.tagName);
        }
    }
    /**
     * @returns The testRateConstant or undefined.
     */ getTestRateConstants() {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstants(testRateConstant) {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set(TestRateConstants.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstants() {
        let i = this.index.get(TestRateConstants.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestRateConstants.tagName);
        }
    }
    /**
     * @returns The useTheSameCellNumberForAllConditions or undefined.
     */ getUseTheSameCellNumberForAllConditions() {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param useTheSameCellNumberForAllConditions The useTheSameCellNumberForAllConditions.
     */ setUseTheSameCellNumberForAllConditions(useTheSameCellNumberForAllConditions) {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) this.nodes.set(i, useTheSameCellNumberForAllConditions);
        else {
            this.index.set(UseTheSameCellNumberForAllConditions.tagName, this.nodes.size);
            this.addNode(useTheSameCellNumberForAllConditions);
        }
    }
    /**
     * Remove the useTheSameCellNumberForAllConditions.
     */ removeUseTheSameCellNumberForAllConditions() {
        let i = this.index.get(UseTheSameCellNumberForAllConditions.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(UseTheSameCellNumberForAllConditions.tagName);
        }
    }
    /**
     * @returns The hideInactive or undefined.
     */ getHideInactive() {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param hideInactive The hideInactive.
     */ setHideInactive(hideInactive) {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) this.nodes.set(i, hideInactive);
        else {
            this.index.set(HideInactive.tagName, this.nodes.size);
            this.addNode(hideInactive);
        }
    }
    /**
     * Remove the hideInactive.
     */ removeHideInactive() {
        let i = this.index.get(HideInactive.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(HideInactive.tagName);
        }
    }
    /**
     * @returns The ForceMacroDetailedBalance or undefined.
     */ getForceMacroDetailedBalance() {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param forceMacroDetailedBalance The forceMacroDetailedBalance.
     */ setForceMacroDetailedBalance(forceMacroDetailedBalance) {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) this.nodes.set(i, forceMacroDetailedBalance);
        else {
            this.index.set(ForceMacroDetailedBalance.tagName, this.nodes.size);
            this.addNode(forceMacroDetailedBalance);
        }
    }
    /**
     * Remove the forceMacroDetailedBalance.
     */ removeForceMacroDetailedBalance() {
        let i = this.index.get(ForceMacroDetailedBalance.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ForceMacroDetailedBalance.tagName);
        }
    }
    /**
     * @returns The calcMethod or undefined.
     */ getCalcMethod() {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param calcMethod The calcMethod.
     */ setCalcMethod(calcMethod) {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) this.nodes.set(i, calcMethod);
        else {
            this.index.set(CalcMethod.tagName, this.nodes.size);
            this.addNode(calcMethod);
        }
    }
    /**
     * Remove the calcMethod.
     */ removeCalcMethod() {
        let i = this.index.get(CalcMethod.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(CalcMethod.tagName);
        }
    }
    /**
     * @returns The eigenvalues or undefined.
     */ getEigenvalues() {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param eigenvalues The eigenvalues.
     */ setEigenvalues(eigenvalues) {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) this.nodes.set(i, eigenvalues);
        else {
            this.index.set(Eigenvalues.tagName, this.nodes.size);
            this.addNode(eigenvalues);
        }
    }
    /**
     * Remove the eigenvalues.
     */ removeEigenvalues() {
        let i = this.index.get(Eigenvalues.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Eigenvalues.tagName);
        }
    }
    /**
     * @returns The shortestTimeOfInterest.
     */ getShortestTimeOfInterest() {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param shortestTimeOfInterest The shortestTimeOfInterest.
     */ setShortestTimeOfInterest(shortestTimeOfInterest) {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) this.nodes.set(i, shortestTimeOfInterest);
        else {
            this.index.set(ShortestTimeOfInterest.tagName, this.nodes.size);
            this.addNode(shortestTimeOfInterest);
        }
    }
    /**
     * Remove the shortestTimeOfInterest.
     */ removeShortestTimeOfInterest() {
        let i = this.index.get(ShortestTimeOfInterest.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ShortestTimeOfInterest.tagName);
        }
    }
    /**
     * @returns The MaximumEvolutionTime.
     */ getMaximumEvolutionTime() {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param MaximumEvolutionTime The MaximumEvolutionTime.
     */ setMaximumEvolutionTime(MaximumEvolutionTime) {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) this.nodes.set(i, MaximumEvolutionTime);
        else {
            this.index.set(MaximumEvolutionTime.tagName, this.nodes.size);
            this.addNode(MaximumEvolutionTime);
        }
    }
    /**
     * Remove the MaximumEvolutionTime.
     */ removeMaximumEvolutionTime() {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MaximumEvolutionTime.tagName);
        }
    }
    /**
     * @returns The automaticallySetMaxEne.
     */ getAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param automaticallySetMaxEne The automaticallySetMaxEne.
     */ setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) this.nodes.set(i, automaticallySetMaxEne);
        else {
            this.index.set(AutomaticallySetMaxEne.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }
    /**
     * Remove the automaticallySetMaxEne.
     */ removeAutomaticallySetMaxEne() {
        let i = this.index.get(AutomaticallySetMaxEne.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(AutomaticallySetMaxEne.tagName);
        }
    }
    /**
     * @returns The diagramEnergyOffset.
     */ getDiagramEnergyOffset() {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */ setDiagramEnergyOffset(diagramEnergyOffset) {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) this.nodes.set(i, diagramEnergyOffset);
        else {
            this.index.set(DiagramEnergyOffset.tagName, this.nodes.size);
            this.addNode(diagramEnergyOffset);
        }
    }
    /**
     * Remove the diagramEnergyOffset.
     */ removeDiagramEnergyOffset() {
        let i = this.index.get(DiagramEnergyOffset.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(DiagramEnergyOffset.tagName);
        }
    }
    /**
     * @returns The testMicroRates or undefined.
     */ getTestMicroRates() {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testMicroRates The testMicroRates.
     */ setTestMicroRates(testMicroRates) {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) this.nodes.set(i, testMicroRates);
        else {
            this.index.set(TestMicroRates.tagName, this.nodes.size);
            this.addNode(testMicroRates);
        }
    }
    /**
     * Remove the testMicroRates.
     */ removeTestMicroRates() {
        let i = this.index.get(TestMicroRates.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestMicroRates.tagName);
        }
    }
}

},{"./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kMp4Q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * The title.
 */ parcelHelpers.export(exports, "Title", ()=>Title);
/**
 * A class for representing a "moleculeList".
 * In the XML, a "moleculeList" node is a child node of the "me:mesmer" node and has "molecule" node children.
 */ parcelHelpers.export(exports, "MoleculeList", ()=>MoleculeList);
/**
 * A class for representing a "reactionList".
 * In the XML, a "reactionList" node is a child node of a "me:mesmer" node and has "reaction" node children.
 */ parcelHelpers.export(exports, "ReactionList", ()=>ReactionList);
/**
 * The "me:mesmer" node contains a "me:title", "moleculeList", "reactionList", "me:conditions", 
 * "me:modelParameters" and "me:control".
 */ parcelHelpers.export(exports, "Mesmer", ()=>Mesmer);
var _conditionsJs = require("./conditions.js");
var _controlJs = require("./control.js");
var _modelParametersJs = require("./modelParameters.js");
var _xmlJs = require("./xml.js");
class Title extends (0, _xmlJs.StringNode) {
    static{
        this.tagName = "me:title";
    }
    /**
     * @param value 
     */ constructor(attributes, value){
        super(attributes, Title.tagName, value);
    }
}
class MoleculeList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "moleculeList";
    }
    /**
     * @param attributes The attributes.
     * @param molecules The molecules.
     */ constructor(attributes, molecules){
        super(attributes, MoleculeList.tagName);
        this.index = new Map();
        if (molecules != undefined) molecules.forEach((molecule)=>{
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the molecule.
     * @returns The molecule.
     */ getMolecule(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a molecule.
     * @param id The id of the molecule to remove.
     */ removeMolecule(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a molecule.
     * @param molecule The molecule.
     */ addMolecule(molecule) {
        let index = this.index.get(molecule.id);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log("Replaced molecule with id " + molecule.id);
        } else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.id, this.nodes.size - 1);
        }
    }
}
class ReactionList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactionList";
    }
    /**
     * @param attributes The attributes.
     * @param reactions The reactions.
     */ constructor(attributes, reactions){
        super(attributes, ReactionList.tagName);
        this.index = new Map();
        if (reactions != undefined) reactions.forEach((reaction)=>{
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the reaction.
     * @returns The reaction.
     */ getReaction(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a reaction.
     * @param id The id of the reaction to remove.
     */ removeReaction(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a reaction.
     * @param reaction The reaction.
     */ addReaction(reaction) {
        let index = this.index.get(reaction.id);
        if (index !== undefined) {
            this.nodes.set(index, reaction);
            console.log("Replaced reaction with id " + reaction.id);
        } else {
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        }
    }
}
class Mesmer extends (0, _xmlJs.NodeWithNodes) {
    static{
        this.tagName = "me:mesmer";
    }
    static{
        /**
     * The header of the XML file.
     */ this.header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
    }
    /**
     * @param attributes The attributes.
     * @param moleculeList The molecule list.
     * @param reactionList The reaction list.
     * @param conditions The conditions.
     * @param modelParameters The model parameters.
     * @param control The control.
     */ constructor(attributes, title, moleculeList, reactionList, conditions, modelParameters, control){
        super(attributes, Mesmer.tagName);
        this.index = new Map();
        if (title != undefined) {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (moleculeList != undefined) {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
        if (reactionList != undefined) {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
        if (conditions != undefined) {
            this.index.set((0, _conditionsJs.Conditions).tagName, this.nodes.size);
            this.addNode(conditions);
        }
        if (modelParameters != undefined) {
            this.index.set((0, _modelParametersJs.ModelParameters).tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
        if (control != undefined) {
            this.index.set((0, _controlJs.Control).tagName, this.nodes.size);
            this.addNode(control);
        }
    }
    /**
     * @returns The title.
     */ getTitle() {
        let i = this.index.get(Title.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the title.
     * @param title The title.
     */ setTitle(title) {
        let i = this.index.get(Title.tagName);
        if (i != undefined) this.nodes.set(i, title);
        else {
            this.index.set(Title.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * @returns The molecule list.
     */ getMoleculeList() {
        let i = this.index.get(MoleculeList.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the molecule list.
     * @param moleculeList The molecule list.
     */ setMoleculeList(moleculeList) {
        let i = this.index.get(MoleculeList.tagName);
        if (i != undefined) this.nodes.set(i, moleculeList);
        else {
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
    }
    /**
     * @returns The reaction list.
     */ getReactionList() {
        let i = this.index.get(ReactionList.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the reaction list.
     * @param reactionList The reaction list.
     */ setReactionList(reactionList) {
        let i = this.index.get(ReactionList.tagName);
        if (i != undefined) this.nodes.set(i, reactionList);
        else {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
    }
    /**
     * @returns The conditions.
     */ getConditions() {
        let i = this.index.get((0, _conditionsJs.Conditions).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the conditions.
     * @param conditions The conditions.
     */ setConditions(conditions) {
        let i = this.index.get((0, _conditionsJs.Conditions).tagName);
        if (i != undefined) this.nodes.set(i, conditions);
        else {
            this.index.set((0, _conditionsJs.Conditions).tagName, this.nodes.size);
            this.addNode(conditions);
        }
    }
    /**
     * @returns The model parameters.
     */ getModelParameters() {
        let i = this.index.get((0, _modelParametersJs.ModelParameters).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the model parameters.
     * @param modelParameters The model parameters.
     */ setModelParameters(modelParameters) {
        let i = this.index.get((0, _modelParametersJs.ModelParameters).tagName);
        if (i != undefined) this.nodes.set(i, modelParameters);
        else {
            this.index.set((0, _modelParametersJs.ModelParameters).tagName, this.nodes.size);
            this.addNode(modelParameters);
        }
    }
    /**
     * @returns The control.
     */ getControl() {
        let i = this.index.get((0, _controlJs.Control).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the control.
     * @param control The control.
     */ setControl(control) {
        let i = this.index.get((0, _controlJs.Control).tagName);
        if (i != undefined) this.nodes.set(i, control);
        else {
            this.index.set((0, _controlJs.Control).tagName, this.nodes.size);
            this.addNode(control);
        }
    }
}

},{"./conditions.js":"aksKl","./control.js":"Qx5gu","./modelParameters.js":"kQHfz","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8AHG6","dPB9w"], "dPB9w", "parcelRequire1c89")

//# sourceMappingURL=index.50584fd7.js.map
