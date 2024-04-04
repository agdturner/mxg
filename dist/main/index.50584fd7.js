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
//import { openDB } from 'idb';
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Set a molecule property array when the input value is changed.
 * @param node The NumberArayNode.
 * @param input The input element.
 */ parcelHelpers.export(exports, "setNumberArrayNode", ()=>setNumberArrayNode);
//(window as any).setNumberArrayNode = setNumberArrayNode;
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
//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library
/**
 * MXG.
 */ let mxg_url = "https://github.com/agdturner/mxg-pwa";
let mxg_a = document.createElement("a");
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;
/**
 * Example data.
 */ let mxgDataExamples_url = "https://github.com/agdturner/mxg-pwa/tree/main/data/examples";
let mxgDataExamples_a = document.createElement("a");
mxgDataExamples_a.href = mxgDataExamples_url;
mxgDataExamples_a.textContent = mxgDataExamples_url;
/**
 * MESMER.
 */ let mesmer_url = "https://sourceforge.net/projects/mesmer/";
let memser_a = document.createElement("a");
memser_a.href = mesmer_url;
memser_a.textContent = mesmer_url;
/**
 * 3DMol.
 */ let t3Dmol_url = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement("a");
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;
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
 */ let addSymbol = "\uFF0B";
let addString = "add " + addSymbol;
let removeSymbol = "\u2715";
let removeString = "remove " + removeSymbol;
let s_Add_from_spreadsheet = "Add " + addSymbol + " from spreadsheet";
// Selected and deselected symbology.
let selected = " \u2713";
let deselected = " \u2717";
let selectAnotherOption = "Action/select another option...";
// HTML IDs
let menuDivId = "menu";
let titleDivId = "title";
let moleculesDivId = "molecules";
let reactionsDivId = "reactions";
let conditionsDivId = "conditions";
let modelParametersDivId = "modelParameters";
let controlDivId = "control";
let xmlDivId = "xml";
// For dark/light mode.
let dark;
// Strings for the GUI.
let s_Input = "Input";
/*
const db = await openDB('my-db', 1, {
    upgrade(db) {
        db.createObjectStore('keyval');
    },
});

let darkModePreference = await db.get('keyval', 'darkMode');
dark = (darkModePreference === 'true');
console.log("dark=" + dark);
*/ /**
 * For mesmer.
 */ let mesmer;
/**
 * A map of molecules with Molecule.id as key and Molecules as values.
 */ let molecules;
/**
 * For storing the maximum molecule energy in a reaction.
 */ let maxMoleculeEnergy = -Infinity;
/**
 * For storing the minimum molecule energy in a reaction.
 */ let minMoleculeEnergy = Infinity;
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let reactions;
/**
 * The Mesmer ids.
 */ let ids = new Set();
/**
 * Add an id to the set of ids.
 * @param parts The parts of the id.
 */ function addId(...parts) {
    let validId = (0, _utilJs.getID)(...parts);
    if (ids.has(validId)) throw new Error(validId + " already exists!");
    ids.add(validId);
    return validId;
}
// IDs for the reactions diagram.
let rdDivId = addId("reactionsDiagram");
let rdCanvasId = addId("reactionsDiagramCanvas");
//let rd_canvas_width: number = 800;
let rdCanvasHeight = 400;
let rd_lw = 4;
let rd_lwc = 2;
let rd_font = "1em SensSerif";
let popWindow;
/**
 * Once the DOM is loaded, add a load button.
 */ document.addEventListener("DOMContentLoaded", ()=>{
    // Update the page styles based on the user's preference.
    document.body.className = dark ? "dark-mode" : "light-mode";
    /* It is not allowed to use localStorage with a Service Worker!
    let darkModePreference = localStorage.getItem('darkMode');
    dark = (darkModePreference === 'true');
    console.log("dark=" + dark);
    */ // Update the page styles based on the user's preference.
    document.body.className = dark ? "dark-mode" : "light-mode";
    // Create a menu for the GUI.
    let menuDiv = document.getElementById("menu");
    menuDiv.style.display = "flex";
    menuDiv.style.justifyContent = "center";
    menuDiv.style.margin = "5px";
    menuDiv.style.padding = "5px";
    menuDiv.style.border = "1px solid black";
    menuDiv.style.backgroundColor = "lightgrey";
    // Create Load button.
    let s_Load = "Load";
    let loadButton = (0, _htmlJs.createButton)(s_Load, addId(s_Load), boundary1);
    loadButton.addEventListener("click", (event)=>{
        load();
        loadButton.textContent = s_Load;
    });
    menuDiv.appendChild(loadButton);
    // Create style/theme option buttons.
    // Create button to increase the font size.
    let s_Increase_fontsize = "Increase fontsize";
    let increaseFontSizeButton = (0, _htmlJs.createButton)(s_Increase_fontsize, addId(s_Increase_fontsize), boundary1);
    increaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize + 1 + "px";
        if (popWindow != null) //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
        popWindow.document.body.style.fontSize = fontSize + 1 + "px";
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Create button to increase the font size.
    let s_Decrease_fontsize = "Decrease fontsize";
    let decreaseFontSizeButton = (0, _htmlJs.createButton)(s_Decrease_fontsize, (0, _utilJs.getID)(s_Decrease_fontsize), boundary1);
    decreaseFontSizeButton.addEventListener("click", ()=>{
        let fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = fontSize - 1 + "px";
        if (popWindow != null) //let fontSize = parseFloat(getComputedStyle(popWindow.document.body).fontSize);
        popWindow.document.body.style.fontSize = fontSize - 1 + "px";
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Create a light/dark mode button.
    let s_Light_Dark_Mode = "Light/Dark Mode";
    let lightDarkModeButton = (0, _htmlJs.createButton)(s_Light_Dark_Mode, (0, _utilJs.getID)(s_Light_Dark_Mode), boundary1);
    lightDarkModeButton.addEventListener("click", ()=>{
        dark = !dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if (dark) document.body.className = "dark-mode";
        else document.body.className = "light-mode";
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    // Create Save button.
    let s_Save = "Save";
    let saveButton = (0, _htmlJs.createButton)(s_Save, addId(s_Save), boundary1);
    saveButton.addEventListener("click", saveXML);
    menuDiv.appendChild(saveButton);
    let welcomeDiv = (0, _htmlJs.createDiv)(addId("Welcome"), boundary1);
    // Create text for welcome.
    let p1 = document.createElement("p");
    welcomeDiv.appendChild(p1);
    p1.textContent = "Welcome to MXG - a Graphical User Interface (GUI) program to assist MEMSER users in creating, editing         and visualising MESMER data. MESMER is the Master Equation Solver for Multi Energy-well Reactions, details can be found         at: ";
    p1.appendChild(memser_a);
    p1.style.alignContent = "center";
    let p2 = document.createElement("p");
    welcomeDiv.appendChild(p2);
    p2.textContent = "MXG development is funded by the UK Engineering and Physical Sciences Research Council (EPSRC) from January     to April 2024.";
    let p3 = document.createElement("p");
    welcomeDiv.appendChild(p3);
    p3.textContent = "The menu Load button is to be used to select a MESMER file to load (the file loaded will not be modified).         MXG reads the file and presents the data it contains so that the user can make changes and use the Save button to generate         a new MESMER file. The saved file should have the same content as was loaded except it will contain no comments or blank         lines, values will be trimmed of white space, and some numbers may be output in a standard scientific notation if they were         not already. The saved file will also reflect any changes specified using the GUI.";
    let p4 = document.createElement("p");
    welcomeDiv.appendChild(p4);
    p4.textContent = "Between the Load and Save buttons are buttons to increase or decrease the font size. In addition to changing the         text size of any text components, this will also redraw the reaction diagram so that the text rendered onto the canvas reflects         this change. It is planned to have themes selectable to provide a dark mode rendering and to support users that struggle to         distinguish between certain colours.";
    let p5 = document.createElement("p");
    p5.textContent += "The development is in an alpha release phase and is not recommended for general use. A community release that         is to be supported by the MESMER community is scheduled for the end of April 2024. MXG is free and open source software based on         free and open source software. The main development GitHub repository is: ";
    p5.appendChild(mxg_a);
    welcomeDiv.appendChild(p5);
    let p6 = document.createElement("p");
    welcomeDiv.appendChild(p6);
    p6.textContent = "MXG can be used online or installed locally as a Progressive Web App (PWA). A PWA is a type of application         software that should work on platforms with a standard-compliant Web browser. PWA installation varies by Web browser/device.         Some details to help with installation of the MXG PWA are in the GitHub Repository README.";
    let p7 = document.createElement("p");
    welcomeDiv.appendChild(p7);
    p7.textContent = 'The MESMER file loaded is expected to contain the following child elements of the parent "me:mesmer"         element: "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control". If a         child element is missing or there are multiple "me:title", "moleculeList", "reactionList", "me:conditions", or         "me:modelParameters" elements, an Error is currently thrown. In the future, the loading and creation of files with         multiple "me:conditions" sections will be supported... If you want to try using MXG and do not have an exisitng MESMER         file, then please download the example data: ';
    p7.appendChild(mxgDataExamples_a);
    document.body.appendChild(welcomeDiv);
    // Create div for instructions.
    let instructionsDiv = (0, _htmlJs.createDiv)(addId("Instructions"), boundary1);
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
    let p11 = document.createElement("p");
    instructionsDiv.appendChild(p11);
    p10.textContent = "Rendering of molecules with coordinates is provded by 3DMol.js which incorporates code from GLmol,         Three.js, and jQuery and is licensed under a BSD-3-Clause license. For more details on 3DMol.js please visit the GitHub         repository: ";
    p10.appendChild(t3Dmol_a);
});
/**
 *  Redraw the reactions diagram.
 */ function redrawReactionsDiagram() {
    if (popWindow == null) {
        let rdCanvas = document.getElementById(rdCanvasId);
        drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    } else {
        let c = popWindow.document.getElementById(rdCanvasId);
        drawReactionDiagram(c, dark, rd_font, rd_lw, rd_lwc);
    }
}
/**
 * Prompts the user for a MESMER XML file, initiates the parsing of the chosen file, and 
 * creates a save button for saving a new XML file.
 */ function load() {
    // Before loading a new file, remove any existing content.
    ids.forEach((id)=>{
        (0, _htmlJs.remove)(id, ids);
    });
    if (molecules != null) molecules.clear();
    if (reactions != null) reactions.clear();
    maxMoleculeEnergy = -Infinity;
    minMoleculeEnergy = Infinity;
    // Create a file input element to prompt the user to select a file.
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = function() {
        if (input.files) {
            for(let i = 0; i < input.files.length; i++)console.log("inputElement.files[" + i + "]=" + input.files[i]);
            let file = input.files[0];
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
    input.click();
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
        mesmer.setTitle(titleNode);
        let titleDiv = document.getElementById("title");
        let lwiId = addId("titleDiv");
        // Create input element.
        let lwi = (0, _htmlJs.createLabelWithInput)("text", addId(lwiId, "Input"), boundary1, level0, (event)=>{
            let target = event.target;
            titleNode.value = target.value;
            console.log(titleNode.tagName + " changed to " + titleNode.value);
            (0, _htmlJs.resizeInputElement)(target);
        }, title, (0, _mesmerJs.Title).tagName, fontSize1);
        lwi.id = lwiId;
        titleDiv.appendChild(lwi);
    }
    // Molecules.
    let moleculesDiv = document.getElementById(moleculesDivId);
    let moleculesListDivId = addId("moleculesList");
    let moleculeListDiv = processMoleculeList(xml);
    moleculeListDiv.id = moleculesListDivId;
    moleculesDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: moleculeListDiv,
        buttonLabel: "Molecules",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: moleculeListDiv.id
    }));
    mesmer.setMoleculeList(new (0, _mesmerJs.MoleculeList)((0, _xmlJs.getAttributes)(moleculeListDiv), Array.from(molecules.values())));
    // Reactions.
    let reactionsDiv = document.getElementById(reactionsDivId);
    let reactionsListDivId = addId("reactionsList");
    // If the reactionsListDiv already exists, remove it.
    (0, _htmlJs.remove)(reactionsListDivId, ids);
    let reactionsListDiv = processReactionList(xml);
    reactionsListDiv.id = reactionsListDivId;
    reactionsDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: reactionsListDiv,
        buttonLabel: "Reactions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: reactionsListDiv.id
    }));
    mesmer.setReactionList(new (0, _mesmerJs.ReactionList)((0, _xmlJs.getAttributes)(reactionsDiv), Array.from(reactions.values())));
    // Add the reactions diagram canvas.
    // Destroy any existing reactions diagram.
    // Check for popWindow.
    if (popWindow != null) {
        popWindow.close();
        popWindow = null;
    }
    // If rdDiv already exists, remove it.
    (0, _htmlJs.remove)(rdDivId);
    // Create a new rdDiv and append it.
    let rdDiv = (0, _htmlJs.createDiv)(rdDivId, boundary1);
    reactionsDiv.append(rdDiv);
    // Create a pop diagram button in its own div.
    let popButtonDivId = addId("popButtonDivId");
    //remove(popButtonDivId);
    let popButtonDiv = (0, _htmlJs.createDiv)(popButtonDivId, boundary1);
    rdDiv.appendChild(popButtonDiv);
    let popButtonID = addId("popButtonId");
    // If the popButton already exists, remove it.
    //remove(popButtonID);
    let popButton = (0, _htmlJs.createButton)("Pop out diagram into a new window", popButtonID, boundary1);
    popButtonDiv.appendChild(popButton);
    // If the canvas already exists, remove it.
    //remove(rdCanvasId);
    let rdCanvas = document.createElement("canvas");
    rdCanvas.id = rdCanvasId;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdCanvasHeight;
    rdCanvas.style.border = "1px solid black";
    drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
    // Add action listener to the pop diagram button.
    popButton.addEventListener("click", ()=>{
        if (popWindow == null) {
            let popWindowRDCanvas = document.createElement("canvas");
            popWindowRDCanvas.id = rdCanvasId;
            popWindow = window.open("", "Reactions Diagram", "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            popWindow.document.body.appendChild(popWindowRDCanvas);
            drawReactionDiagram(popWindowRDCanvas, dark, rd_font, rd_lw, rd_lwc);
            (0, _htmlJs.remove)(rdCanvasId, ids);
            popButton.textContent = "Pop back reaction diagram";
        } else {
            rdCanvas = document.createElement("canvas");
            rdCanvas.id = rdCanvasId;
            rdDiv.appendChild(rdCanvas);
            drawReactionDiagram(rdCanvas, dark, rd_font, rd_lw, rd_lwc);
            popWindow.close();
            popWindow = null;
            popButton.textContent = "Pop out reaction diagram to a new window";
        }
    });
    // Conditions
    let conditionsDiv = document.getElementById("conditions");
    let conditionsListDivId = addId("conditionsList");
    // If the conditionsListDiv already exists, remove it.
    (0, _htmlJs.remove)(conditionsListDivId);
    let conditionsListDiv = processConditions(xml);
    conditionsListDiv.id = conditionsListDivId;
    conditionsDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: conditionsListDiv,
        buttonLabel: "Conditions",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: conditionsListDiv.id
    }));
    // Model Parameters.
    let modelParametersDivId = "modelParameters";
    let modelParametersDiv = document.getElementById(modelParametersDivId);
    let modelParametersListDiv = processModelParameters(xml);
    modelParametersListDiv.id = "modelParametersList";
    // If the modelParametersListDiv already exists, remove it.
    (0, _htmlJs.remove)(modelParametersListDiv.id, ids);
    modelParametersDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: modelParametersListDiv,
        buttonLabel: "Model Parameters",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: modelParametersListDiv.id
    }));
    // Control.
    let controlDivId = "control";
    let controlDiv = document.getElementById(controlDivId);
    let controlsDiv = processControl(xml);
    controlsDiv.id = "controls";
    // If the controlsDiv already exists, remove it.
    (0, _htmlJs.remove)(controlsDiv.id, ids);
    controlDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
        content: controlsDiv,
        buttonLabel: "Controls",
        buttonFontSize: fontSize1,
        boundary: boundary1,
        level: level0,
        contentDivId: controlsDiv.id
    }));
    // Initiate action listeners for collapsible content.
    (0, _htmlJs.makeCollapsible)();
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ function processMoleculeList(xml) {
    // Initialise molecules.
    molecules = new Map();
    // Create div to contain the molecules list.
    let moleculeListDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
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
        // Get the molecule id.
        let moleculeId = attributes.get((0, _moleculeJs.Molecule).s_id);
        if (moleculeId == undefined) throw new Error((0, _moleculeJs.Molecule).s_id + " is undefined");
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
        // Create molecule.
        let molecule = new (0, _moleculeJs.Molecule)(attributes, moleculeId);
        molecules.set(moleculeId, molecule);
        // Molecule characteristics.
        let moleculeHasCoordinates = false;
        // Init atoms.
        let atomArray = new (0, _moleculeJs.AtomArray)(new Map()); // This will be replaced if there is an AtomArray.
        // Function to be used to remove an atom.
        let removeAtom = (id)=>molecule.getAtoms().removeAtom(id);
        // There can be an individual atom not in an atom array, or an atom array.
        let xml_atomArrays = xml_molecules[i].getElementsByTagName((0, _moleculeJs.AtomArray).tagName);
        if (xml_atomArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.AtomArray).tagName + " but finding " + xml_atomArrays.length + "!");
        // Create a new collapsible div for the AtomArray.
        let atomArrayDiv = document.createElement("div");
        let contentDivId = moleculeId + "_" + (0, _moleculeJs.AtomArray).tagName;
        let atomArrayCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
            content: atomArrayDiv,
            buttonLabel: (0, _moleculeJs.AtomArray).tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: contentDivId
        });
        moleculeDiv.appendChild(atomArrayCollapsibleDiv);
        if (xml_atomArrays.length == 1) {
            let xml_atomArray = xml_atomArrays[0];
            let xml_atoms = xml_atomArray.getElementsByTagName((0, _moleculeJs.Atom).tagName);
            if (xml_atoms.length < 2) throw new Error("Expecting 2 or more atoms in " + (0, _moleculeJs.AtomArray).tagName + ", but finding " + xml_atoms.length + "!");
            atomArray = new (0, _moleculeJs.AtomArray)((0, _xmlJs.getAttributes)(xml_atomArray));
            molecule.setAtoms(atomArray);
            for(let j = 0; j < xml_atoms.length; j++){
                // Create a new Atom.
                let atom = new (0, _moleculeJs.Atom)((0, _xmlJs.getAttributes)(xml_atoms[j]));
                let atomId = atomArray.addAtom(atom);
                //console.log("atomId=" + atomId);
                // Add the atomDiv to the atomArrayDiv.
                let atomDiv = (0, _htmlJs.createFlexDiv)(undefined, level3);
                atomArrayDiv.appendChild(atomDiv);
                let inputId = moleculeId + "_" + atomId;
                /**
                let atomIdlwi: HTMLDivElement = createLabelWithInput("text", inputId + "_" + Atom.s_id, boundary1, boundary1,
                    (event: Event) => {
                        let target = event.target as HTMLInputElement;
                        let newAtomId: string = target.value;
                        if (atomArray.atoms.has(target.value)) {
                            console.warn("Atom with id " + target.value + " already exists!");
                            newAtomId = atomArray.getNextAtomID();
                        }
                        atom.setId(newAtomId);
                        atomArray.atoms.set(newAtomId, atom);
                        atomArray.index.set(newAtomId, atomArray.index.get(atomId) as number);
                        atomArray.index.delete(atomId);
                        console.log("The id has changed from " + atomId + " to " + newAtomId);
                        resizeInputElement(target);
                    }, atomId, Atom.s_id, fontSize3);
                atomDiv.appendChild(atomIdlwi);
                **/ atomDiv.appendChild((0, _htmlJs.createLabel)((0, _moleculeJs.Atom).s_id + " " + atomId, boundary1));
                // elementType.
                let elementType = atom.getElementType();
                let elementTypelwi = (0, _htmlJs.createLabelWithInput)("text", inputId + "_" + (0, _moleculeJs.Atom).s_elementType, boundary1, boundary1, (event)=>{
                    let target = event.target;
                    atom.setElementType(target.value);
                    console.log("The elementType has changed from " + elementType + " to " + target.value);
                    (0, _htmlJs.resizeInputElement)(target);
                }, elementType, (0, _moleculeJs.Atom).s_elementType, fontSize3);
                atomDiv.appendChild(elementTypelwi);
                // Coordinates.
                moleculeHasCoordinates = processCoordinates(inputId, atom, atomDiv);
                addRemoveButton(atomDiv, boundary1, removeAtom, atomId);
            }
            moleculeTagNames.delete((0, _moleculeJs.AtomArray).tagName);
        } else {
            let xml_atoms = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Atom).tagName);
            if (xml_atoms.length == 1) {
                atomArray = new (0, _moleculeJs.AtomArray)(new Map());
                atomArray.addAtom(new (0, _moleculeJs.Atom)((0, _xmlJs.getAttributes)(xml_atoms[0])));
                molecule.setAtoms(atomArray);
            } else if (xml_atoms.length > 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Atom).tagName + " but finding " + xml_atoms.length + ". Should these be in an " + (0, _moleculeJs.AtomArray).tagName + "?");
        }
        // Create an add atom button.
        let addAtomButton = (0, _htmlJs.createButton)(addString, undefined, level3);
        addAtomButton.style.fontSize = fontSize4;
        addAtomButton.addEventListener("click", ()=>{
            let attributes = new Map();
            attributes.set((0, _moleculeJs.Atom).s_elementType, "Please specify an " + (0, _moleculeJs.Atom).s_elementType);
            let atom = new (0, _moleculeJs.Atom)(attributes);
            //let atomId: string = atomArray.addAtom(atom);
            let atomId = molecule.getAtoms().addAtom(atom);
            let atomDiv = (0, _htmlJs.createFlexDiv)(undefined, level3);
            let inputId = moleculeId + "_" + atomId;
            atomDiv.appendChild((0, _htmlJs.createLabel)((0, _moleculeJs.Atom).s_id + " " + atomId, boundary1));
            let elementType = atom.getElementType();
            let elementTypelwi = (0, _htmlJs.createLabelWithInput)("text", inputId + "_" + (0, _moleculeJs.Atom).s_elementType, boundary1, boundary1, (event)=>{
                let target = event.target;
                atom.setElementType(target.value);
                console.log("The elementType has changed to " + target.value);
                (0, _htmlJs.resizeInputElement)(target);
            }, elementType, (0, _moleculeJs.Atom).s_elementType, fontSize3);
            atomDiv.appendChild(elementTypelwi);
            // Coordinates.
            moleculeHasCoordinates = processCoordinates(inputId, atom, atomDiv);
            addRemoveButton(atomDiv, boundary1, removeAtom, atomId);
            atomArrayDiv.insertBefore(atomDiv, addAtomButton);
        });
        atomArrayDiv.appendChild(addAtomButton);
        //console.log("atomsNode=" + atomsNode);
        moleculeTagNames.delete((0, _moleculeJs.Atom).tagName);
        // Init bondsNode.
        let bondArray = new (0, _moleculeJs.BondArray)(new Map()); // This will be replaced if there is an BondArray.
        // Function to be used to remove an bond.
        let removeBond = (id)=>molecule.getBonds().removeBond(id);
        // There can be an individual bond not in a bond array, or a bond array.
        // There may be only 1 bond in a BondArray.
        let xml_bondArrays = xml_molecules[i].getElementsByTagName((0, _moleculeJs.BondArray).tagName);
        // Create a new collapsible div for the BondArray.
        let bondArrayDiv = document.createElement("div");
        let bondArrayContentDivId = moleculeId + "_" + (0, _moleculeJs.BondArray).tagName;
        let bondArrayCollapsibleDiv = (0, _htmlJs.getCollapsibleDiv)({
            content: bondArrayDiv,
            buttonLabel: (0, _moleculeJs.BondArray).tagName,
            buttonFontSize: fontSize3,
            boundary: boundary1,
            level: level2,
            contentDivId: bondArrayContentDivId
        });
        moleculeDiv.appendChild(bondArrayCollapsibleDiv);
        if (xml_bondArrays.length > 0) {
            if (xml_bondArrays.length > 1) throw new Error("Expecting 1 or 0 " + (0, _moleculeJs.BondArray).tagName + " but finding " + xml_bondArrays.length + "!");
            let xml_bonds = xml_bondArrays[0].getElementsByTagName((0, _moleculeJs.Bond).tagName);
            bondArray = new (0, _moleculeJs.BondArray)((0, _xmlJs.getAttributes)(xml_bondArrays[0]));
            for(let j = 0; j < xml_bonds.length; j++){
                // Create a new Bond.
                let bond = new (0, _moleculeJs.Bond)((0, _xmlJs.getAttributes)(xml_bonds[j]));
                let bondId = bondArray.addBond(bond);
                // Add the bondDiv to the bondArrayDiv.
                let bondDiv = (0, _htmlJs.createFlexDiv)(undefined, level3);
                bondArrayDiv.appendChild(bondDiv);
                let inputId = moleculeId + "_" + bondId;
                bondDiv.appendChild((0, _htmlJs.createLabel)((0, _moleculeJs.Bond).s_id + " " + bondId, boundary1));
                // atomRefs2.
                let atomRefs2 = bond.atomRefs2;
                let atomRefs2lwi = (0, _htmlJs.createLabelWithInput)("text", inputId + "_" + (0, _moleculeJs.Bond).s_atomRefs2, boundary1, boundary1, (event)=>{
                    let target = event.target;
                    bond.setAtomRefs2(target.value);
                    console.log("The " + (0, _moleculeJs.Bond).s_atomRefs2 + " has changed from " + atomRefs2 + " to " + target.value);
                    (0, _htmlJs.resizeInputElement)(target);
                }, atomRefs2, (0, _moleculeJs.Bond).s_atomRefs2, fontSize3);
                bondDiv.appendChild(atomRefs2lwi);
                // order.
                let orderId = inputId + "_" + (0, _moleculeJs.Bond).s_order;
                processOrder(bond, bondDiv, orderId, (0, _moleculeJs.Bond).s_order);
                addRemoveButton(bondDiv, boundary1, removeBond, bondId);
            }
            molecule.setBonds(bondArray);
            moleculeTagNames.delete((0, _moleculeJs.BondArray).tagName);
        } else {
            let xml_bonds = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Bond).tagName);
            if (xml_bonds.length > 0) {
                if (xml_bonds.length > 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Bond).tagName + " but finding " + xml_bonds.length + ". Should these be in a " + (0, _moleculeJs.BondArray).tagName + "?");
                bondArray = new (0, _moleculeJs.BondArray)(new Map());
                bondArray.addBond(new (0, _moleculeJs.Bond)((0, _xmlJs.getAttributes)(xml_bonds[0])));
                molecule.setBonds(bondArray);
            }
        }
        moleculeTagNames.delete((0, _moleculeJs.Bond).tagName);
        // Add a 3Dmol.js viewer.
        // Create a new div for the viewer.
        if (moleculeHasCoordinates) {
            let viewerDiv = (0, _htmlJs.createDiv)(undefined, level2);
            let viewerDivId = moleculeId + "_viewer";
            viewerDiv.id = viewerDivId;
            viewerDiv.className = "mol-container";
            moleculeDiv.appendChild(viewerDiv);
            let config = {
                backgroundColor: "grey"
            };
            let viewer = $3Dmol.createViewer(viewerDiv, config);
            // Set the viewer style to stick and ball.
            viewer.setStyle({
                stick: {}
            });
            // Create a 3Dmol viewer control to turn labels on and off.
            //viewer.addControl();
            atomArray.atoms.forEach(function(atom) {
                let color = (0, _mesmerJs.Mesmer).atomColors.get(atom.getElementType()) || "Purple";
                let am = (0, _mesmerJs.Mesmer).atomMasses.get(atom.getElementType()) || 1;
                let radius = (0, _mesmerJs.Mesmer).atomRadii.get(atom.getElementType()) || 1;
                //viewer.addSphere({ center: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() }, radius: 0.3 * am / 10.0, color: color });
                //viewer.addSphere({ center: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() }, radius: radius / 110.0, color: color });
                viewer.addSphere({
                    center: {
                        x: atom.getX3(),
                        y: atom.getY3(),
                        z: atom.getZ3()
                    },
                    radius: radius * am ** (1 / 3.0) / 275.0,
                    color: color
                });
            //viewer.addLabel(atom.getElementType(), { position: { x: atom.getX3(), y: atom.getY3(), z: atom.getZ3() } });
            });
            bondArray.bonds.forEach(function(bond) {
                let atomIds = bond.atomRefs2.split(" ");
                let atom1 = atomArray.getAtom(atomIds[0]);
                let atom2 = atomArray.getAtom(atomIds[1]);
                let order = bond.getOrder() || 1;
                let color = (0, _mesmerJs.Mesmer).bondColors.get(order) || "Purple";
                viewer.addCylinder({
                    start: {
                        x: atom1.getX3(),
                        y: atom1.getY3(),
                        z: atom1.getZ3()
                    },
                    end: {
                        x: atom2.getX3(),
                        y: atom2.getY3(),
                        z: atom2.getZ3()
                    },
                    radius: 0.02 * order,
                    color: color
                });
            });
            viewer.zoomTo();
            viewer.render();
            viewer.zoom(0.8, 2000);
        }
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
                // Create a new Property.
                let p = createProperty(xml_Ps[j], plDiv, molecule, boundary1, level3);
                pl.setProperty(p);
            }
            moleculeTagNames.delete((0, _moleculeJs.PropertyList).tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Property).tagName);
            if (xml_Ps.length != 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Property).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, _moleculeJs.PropertyList).tagName + "?");
            // Create a new Property.
            let p = createProperty(xml_Ps[0], moleculeDiv, molecule, boundary1, level2);
            molecule.setProperties(p);
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
            moleculeDiv.appendChild((0, _htmlJs.createLabelWithSelect)((0, _moleculeJs.DOSCMethod).tagName, (0, _moleculeJs.DOSCMethod).xsi_typeOptions, (0, _moleculeJs.DOSCMethod).tagName, dOSCMethod.getXsiType(), molecule.id, boundary1, level2));
            moleculeTagNames.delete((0, _moleculeJs.DOSCMethod).tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ExtraDOSCMethod).tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
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
                let bondIds = molecule.getBonds().getBondIds();
                let bondRef = new (0, _moleculeJs.BondRef)((0, _xmlJs.getAttributes)(xml_bondRefs[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bondRefs[0])));
                extraDOSCMethodDiv.appendChild((0, _htmlJs.createLabelWithSelect)((0, _moleculeJs.BondRef).tagName, bondIds, (0, _moleculeJs.BondRef).tagName, bondRef.value, molecule.id, boundary1, level3));
            }
            // Read hinderedRotorPotential.
            let xml_hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName((0, _moleculeJs.HinderedRotorPotential).tagName);
            if (xml_hinderedRotorPotentials.length > 0) {
                if (xml_hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hinderedRotorPotentials.length);
                let hinderedRotorPotentialAttributes = (0, _xmlJs.getAttributes)(xml_hinderedRotorPotentials[0]);
                let hinderedRotorPotential = new (0, _moleculeJs.HinderedRotorPotential)(hinderedRotorPotentialAttributes);
                // Create a new collapsible div for the HinderedRotorPotential.
                let hinderedRotorPotentialDiv = (0, _htmlJs.createFlexDiv)(undefined, level4);
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
                // Format.
                hinderedRotorPotentialDiv.appendChild((0, _htmlJs.createLabelWithSelect)((0, _moleculeJs.HinderedRotorPotential).s_format, (0, _moleculeJs.HinderedRotorPotential).formats, (0, _moleculeJs.HinderedRotorPotential).tagName, hinderedRotorPotential.getFormat(), contentDivId, boundary1, boundary1));
                // Units.
                addAnyUnits((0, _mesmerJs.Mesmer).energyUnits, hinderedRotorPotentialAttributes, hinderedRotorPotentialDiv, contentDivId, (0, _moleculeJs.HinderedRotorPotential).tagName, boundary1);
                // ExpansionSize.
                hinderedRotorPotentialDiv.appendChild((0, _htmlJs.createLabelWithInput)("number", contentDivId + "_" + (0, _moleculeJs.HinderedRotorPotential).s_expansionSize, boundary1, boundary1, (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, _utilJs.isNumeric)(target.value)) hinderedRotorPotential.setExpansionSize(parseInt(target.value));
                    else {
                        // Reset the input to the current value.
                        alert((0, _moleculeJs.HinderedRotorPotential).s_expansionSize + " input is not a number, resetting...");
                        target.value = hinderedRotorPotential.getExpansionSize().toExponential();
                    }
                    (0, _htmlJs.resizeInputElement)(target);
                }, hinderedRotorPotential.getExpansionSize().toExponential(), (0, _moleculeJs.HinderedRotorPotential).s_expansionSize));
                // Add useSineTerms.
                let useSineTermsLabel = (0, _htmlJs.createLabel)("Use sine terms:", boundary1);
                hinderedRotorPotentialDiv.appendChild(useSineTermsLabel);
                let useSineTermsInputId = (0, _utilJs.getID)(molecule.id, (0, _moleculeJs.DOSCMethod).tagName, (0, _moleculeJs.HinderedRotorPotential).tagName, (0, _moleculeJs.HinderedRotorPotential).s_useSineTerms);
                let useSineTermsInput = (0, _htmlJs.createInput)("checkbox", useSineTermsInputId, boundary1);
                useSineTermsInput.checked = hinderedRotorPotential.getUseSineTerms();
                useSineTermsInput.addEventListener("change", (event)=>{
                    let target = event.target;
                    hinderedRotorPotential.setUseSineTerms(target.checked);
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
                    let potentialPointDiv = (0, _htmlJs.createFlexDiv)(undefined, level5);
                    potentialPointCollapsibleDiv.appendChild(potentialPointDiv);
                    // Process angle
                    let angleLabel = (0, _htmlJs.createLabel)("Angle:", boundary1);
                    potentialPointDiv.appendChild(angleLabel);
                    let angleInputElementId = molecule.id + "_" + (0, _moleculeJs.PotentialPoint).tagName + "_angle";
                    let angleInputElement = (0, _htmlJs.createInput)("number", angleInputElementId, boundary1);
                    angleInputElement.addEventListener("change", (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, _utilJs.isNumeric)(target.value)) {
                            let value = parseFloat(target.value);
                            potentialPoint.setAngle(value);
                        } else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            angleInputElement.value = potentialPoint.getAngle().toExponential();
                        }
                        (0, _htmlJs.resizeInputElement)(angleInputElement);
                    });
                    angleInputElement.value = potentialPoint.getAngle().toExponential();
                    (0, _htmlJs.resizeInputElement)(angleInputElement);
                    potentialPointDiv.appendChild(angleInputElement);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, _htmlJs.createLabel)("Potential:", boundary1);
                    potentialPointDiv.appendChild(potentialLabel);
                    let potentialInputElementId = molecule.id + "_" + (0, _moleculeJs.PotentialPoint).tagName + "_potential";
                    let potentialInputElement = (0, _htmlJs.createInput)("number", potentialInputElementId, boundary1);
                    potentialInputElement.addEventListener("change", (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, _utilJs.isNumeric)(target.value)) {
                            let value = parseFloat(target.value);
                            potentialPoint.setPotential(value);
                            console.log("Set " + (0, _moleculeJs.PotentialPoint).tagName + " to " + value.toExponential());
                        } else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = potentialPoint.getPotential().toExponential();
                        }
                        (0, _htmlJs.resizeInputElement)(potentialInputElement);
                    });
                    potentialInputElement.value = potentialPoint.getPotential().toExponential();
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
                    let target = event.target;
                    valueString = target.value;
                    if ((0, _utilJs.isNumeric)(valueString)) {
                        let value = parseFloat(valueString);
                        periodicity.value = value;
                        extraDOSCMethod.getPeriodicity().value = value;
                        console.log("Set " + (0, _moleculeJs.Periodicity).tagName + " to " + value);
                    } else {
                        // Reset the input to the current value.
                        alert("Periodicity input is not a number, resetting...");
                        target.value = periodicity.value.toExponential();
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
                let target = event.target;
                reservoirSize.value = parseFloat(target.value);
                (0, _htmlJs.resizeInputElement)(target);
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
 * @param xml The xml element.
 * @param div The div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */ function createProperty(xml, div, molecule, boundary, level) {
    let p = new (0, _moleculeJs.Property)((0, _xmlJs.getAttributes)(xml));
    if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) processProperty(p, (0, _mesmerJs.Mesmer).energyUnits, molecule, xml, div, boundary, level);
    else if (p.dictRef == (0, _moleculeJs.RotConsts).dictRef) processProperty(p, (0, _mesmerJs.Mesmer).frequencyUnits, molecule, xml, div, boundary, level);
    else processProperty(p, undefined, molecule, xml, div, boundary, level);
    return p;
}
/**
 * Process atom coordinates.
 * @param inputId The input id.
 * @param atom The atom.
 * @param atomDiv The atom div.
 */ function processCoordinates(inputId, atom, atomDiv) {
    let x3id = inputId + "_" + (0, _moleculeJs.Atom).s_x3;
    processCoordinate(atom, atomDiv, x3id, (0, _moleculeJs.Atom).s_x3, atom.getX3.bind(atom), atom.setX3.bind(atom));
    let y3id = inputId + "_" + (0, _moleculeJs.Atom).s_y3;
    processCoordinate(atom, atomDiv, y3id, (0, _moleculeJs.Atom).s_y3, atom.getY3.bind(atom), atom.setY3.bind(atom));
    let z3id = inputId + "_" + (0, _moleculeJs.Atom).s_z3;
    processCoordinate(atom, atomDiv, z3id, (0, _moleculeJs.Atom).s_z3, atom.getZ3.bind(atom), atom.setZ3.bind(atom));
    // If the atom has coordinates, set moleculeHasCoordinates to true.
    if (atom.hasCoordinates()) return true;
    return false;
}
/**
 * Process a coordinate.
 * @param atom The atom.
 * @param atomDiv The atom div.
 * @param id The id for the coordinate.
 * @param coordinate The coordinate name.
 * @param getter The getter function to call on the atom.
 * @param setter The setter function to call on the atom.
 * @param logMessage The message to log when the value changes.
 */ function processCoordinate(atom, atomDiv, id, coordinate, getter, setter) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, boundary1);
    atomDiv.appendChild(div);
    let buttonTextContentSelected = coordinate + selected;
    let buttonTextContentDeselected = coordinate + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    } else {
        addCoordinate(div, atom, id + "_input", value, setter, coordinate, boundary1);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the AtomArray already exists
        if (document.getElementById(id) == null) {
            addCoordinate(div, atom, id, NaN, setter, coordinate, boundary1);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param div The div to add the input to.
 * @param atom The atom.
 * @param id The id.
 * @param value The coordinate value.
 * @param setter The setter function to call on the atom.
 * @param coordinate The coordinate name.
 * @param boundary The boundary.
 * @param level The level.
 */ function addCoordinate(div, atom, id, value, setter, coordinate, boundary) {
    let valueString = (value || NaN).toExponential();
    let input = (0, _htmlJs.createInput)("text", id, boundary);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setter(parseFloat(target.value));
        console.log(coordinate + " has changed from " + value + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */ function addRemoveButton(div, margin, removeFunction, ...args) {
    let button = (0, _htmlJs.createButton)(removeString, undefined, margin);
    div.appendChild(button);
    button.style.fontSize = fontSize4;
    button.addEventListener("click", ()=>{
        removeFunction(...args);
        div.remove();
    });
    return button;
}
/**
 * Process an order.
 * @param bond The bond.
 * @param bondDiv The bond div.
 * @param orderId The order id.
 * @param order The order name.
 */ function processOrder(bond, bondDiv, orderId, order) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, boundary1);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = order + selected;
    let buttonTextContentDeselected = order + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    } else {
        addOrder(div, bond, orderId, value, boundary1);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the AtomArray already exists
        if (document.getElementById(orderId) == null) {
            addOrder(div, bond, orderId, NaN, boundary1);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            // Remove any existing div.
            document.getElementById(orderId)?.remove();
            console.log("Removed " + orderId);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param div The div to add the input to.
 * @param bond The bond.
 * @param id The id.
 * @param value The order value.
 * @param boundary The boundary.
 */ function addOrder(div, bond, id, value, boundary) {
    let valueString = (value || NaN).toExponential();
    let input = (0, _htmlJs.createInput)("text", id + "_input", boundary);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log("Bond order changed from " + value + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    input.id = id;
    div.appendChild(input);
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById("xml");
    // xmlHeading
    let xmlHeadingId = "xmlHeading";
    (0, _htmlJs.remove)(xmlHeadingId, ids);
    let xmlHeading = document.createElement("h2");
    xmlHeading.textContent = xmlFilename;
    xmlDiv.appendChild(xmlHeading);
    // xmlParagraph
    let xmlParagraphId = "xmlParagraph";
    (0, _htmlJs.remove)(xmlParagraphId, ids);
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
 * @param div The molecule div.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */ function processProperty(p, units, molecule, element, div, boundary, level) {
    // PropertyScalar.
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
            let target = event.target;
            setNumberNode(ps, target);
        }, inputString, label);
        let inputElement = inputDiv.querySelector("input");
        //inputElement.value = inputString;
        (0, _htmlJs.resizeInputElement)(inputElement);
        inputElement.addEventListener("change", (event)=>{
            let target = event.target;
            inputString = target.value;
            ps = p.getProperty();
            ps.value = parseFloat(inputString);
            console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
            (0, _htmlJs.resizeInputElement)(inputElement);
            if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) {
                // Update the min and max molecule energy.
                if (value < minMoleculeEnergy) minMoleculeEnergy = value;
                if (value > maxMoleculeEnergy) maxMoleculeEnergy = value;
                // Update the molecule energy diagram.
                redrawReactionsDiagram();
            }
        });
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
        div.appendChild(inputDiv);
    } else {
        // PropertyArray.
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
                let target = event.target;
                setNumberArrayNode(pa, target);
            }, inputString, label);
            let inputElement = inputDiv.querySelector("input");
            inputElement.value = inputString;
            (0, _htmlJs.resizeInputElement)(inputElement);
            inputElement.addEventListener("change", (event)=>{
                let target = event.target;
                inputString = target.value;
                pa = p.getProperty();
                values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
                pa.values = values;
                console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                (0, _htmlJs.resizeInputElement)(inputElement);
            });
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
            div.appendChild(inputDiv);
        } else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName((0, _moleculeJs.PropertyMatrix).tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) throw new Error("Expecting 1 " + (0, _moleculeJs.PropertyMatrix).tagName + " but finding " + matrixNodes.length + "!");
                let inputString = (0, _xmlJs.getInputString)(matrixNodes[0]);
                let values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
                let pmAttributes = (0, _xmlJs.getAttributes)(matrixNodes[0]);
                let pm = new (0, _moleculeJs.PropertyMatrix)(pmAttributes, values);
                p.setProperty(pm);
                let label = p.dictRef;
                // Create a new div element for the input.
                let inputDiv = (0, _htmlJs.createLabelWithInput)("text", molecule.id + "_" + p.dictRef, boundary, level, (event)=>{
                    let target = event.target;
                    setNumberArrayNode(pm, target);
                }, inputString, label);
                let inputElement = inputDiv.querySelector("input");
                inputElement.value = inputString;
                (0, _htmlJs.resizeInputElement)(inputElement);
                inputElement.addEventListener("change", (event)=>{
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.id + " to " + inputString);
                    (0, _htmlJs.resizeInputElement)(inputElement);
                });
                addAnyUnits(units, pmAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, boundary);
                div.appendChild(inputDiv);
            } else throw new Error("Expecting " + (0, _moleculeJs.PropertyScalar).tagName + ", " + (0, _moleculeJs.PropertyArray).tagName + " or " + (0, _moleculeJs.PropertyMatrix).tagName + " but finding none!");
        }
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
        let lws = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef);
        if (lws != undefined) inputDiv.appendChild(lws);
    } else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, _htmlJs.createLabel)("units " + attributesUnits, boundary);
            inputDiv.appendChild(label);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */ function getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws = (0, _htmlJs.createLabelWithSelect)("units", units, "units", psUnits, id, boundary1, boundary1);
        let select = lws.querySelector("select");
        // Set the initial value to the units.
        select.value = psUnits;
        // Add event listener to selectElement.
        (0, _htmlJs.resizeSelectElement)(select);
        select.addEventListener("change", (event)=>{
            let target = event.target;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
            (0, _htmlJs.resizeSelectElement)(target);
        });
        return lws;
    }
    return undefined;
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
                let target = event.target;
                setNumberNode(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, _htmlJs.resizeInputElement)(target);
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel = document.createElement("label");
            unitsLabel.textContent = "units cm-1";
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
function setNumberNode(node, input) {
    if ((0, _utilJs.isNumeric)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log(node.tagName + " value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        input.value = node.value.toExponential();
    }
}
//(window as any).set = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */ function processReactionList(xml) {
    // Initialise reactions.
    reactions = new Map();
    // Create div to contain the reaction list.
    let reactionListDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
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
        let reactionDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
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
                let lws = (0, _htmlJs.createLabelWithSelect)(molecule.ref + " role", (0, _reactionJs.Reactant).roleOptions, "Role", molecule.role, molecule.ref, boundary1, level3);
                lws.querySelector("select")?.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, _htmlJs.resizeSelectElement)(target);
                });
                reactantsDiv.appendChild(lws);
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
                let lws = (0, _htmlJs.createLabelWithSelect)(molecule.ref + " role", (0, _reactionJs.Product).roleOptions, molecule.role, molecule.ref, "Role", boundary1, level3);
                let select = lws.querySelector("select");
                select.value = molecule.role;
                select.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, _htmlJs.resizeSelectElement)(target);
                });
                (0, _htmlJs.resizeSelectElement)(select);
                productsDiv.appendChild(lws);
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
            let lws = (0, _htmlJs.createLabelWithSelect)((0, _reactionJs.Tunneling).tagName, (0, _reactionJs.Tunneling).options, "Tunneling", tunneling.getName(), reaction.id, boundary1, level3);
            lws.querySelector("select")?.addEventListener("change", (event)=>{
                let target = event.target;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
                (0, _htmlJs.resizeSelectElement)(target);
            });
            reactionDiv.appendChild(lws);
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
                                    let target = event.target;
                                    setNumberNode(preExponential, target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
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
                                    let target = event.target;
                                    setNumberNode(activationEnergy, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
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
                                    let target = event.target;
                                    setNumberNode(tInfinity, target);
                                }, inputString, label);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
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
                                    let target = event.target;
                                    setNumberNode(nInfinity, target);
                                }, inputString, label);
                                mCRCMethodDiv.appendChild(inputDiv);
                                let inputElement = inputDiv.querySelector("input");
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener("change", (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
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
                let target = event.target;
                setNumberNode(excessReactantConc, target);
            }, value.toExponential(), (0, _reactionJs.ExcessReactantConc).tagName);
            reactionDiv.appendChild(inputDiv);
        }
        // Create a new collapsible div for the reaction and append to the reactionListDiv.
        reactionListDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: reactionDiv,
            buttonLabel: reaction.id + "(" + reaction.getLabel() + ")",
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: reaction.tagName + "_" + reaction.id
        }));
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
    let conditionsDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
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
        buttonLabel: (0, _conditionsJs.BathGas).tagName,
        buttonFontSize: fontSize2,
        boundary: boundary1,
        level: level1,
        contentDivId: (0, _conditionsJs.BathGas).tagName
    }));
    // Add add button.
    let addBathGasButton = (0, _htmlJs.createButton)(addString, undefined, level2);
    bathGasesDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener("click", ()=>{
        let bathGas = new (0, _conditionsJs.BathGas)(new Map(), selectAnotherOption);
        conditions.addBathGas(bathGas);
        let containerDiv = (0, _htmlJs.createFlexDiv)(undefined, level2);
        let bathGasLabel = (0, _htmlJs.createLabel)((0, _conditionsJs.BathGas).tagName, boundary1);
        containerDiv.appendChild(bathGasLabel);
        // Add HTMLSelectInput for the BathGas.
        containerDiv.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true));
        // Add a remove button.
        addRemoveButton(containerDiv, boundary1, (bathGas)=>{
            bathGasesDiv.removeChild(containerDiv);
            conditions.removeBathGas(bathGas);
        });
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
        let div = (0, _htmlJs.createFlexDiv)(undefined, level2);
        //let bathGasLabel: HTMLLabelElement = createLabel(BathGas.tagName, boundary1);
        //div.appendChild(bathGasLabel);
        div.appendChild(createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, true));
        // Add a remove button.
        let removeButton = (0, _htmlJs.createButton)(removeString, undefined, boundary1);
        removeButton.addEventListener("click", ()=>{
            bathGasesDiv.removeChild(div);
            conditions.removeBathGas(bathGas);
        });
        div.appendChild(removeButton);
        bathGasesDiv.appendChild(div);
    }
    // PTs
    let moleculeKeys = new Set(molecules.keys());
    // Create a new div for the PTs.
    let pTsDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
    conditionsDiv.appendChild(pTsDiv);
    let pTs;
    let xml_PTss = xml_conditions.getElementsByTagName((0, _conditionsJs.PTs).tagName);
    if (xml_PTss.length > 0) {
        if (xml_PTss.length > 1) throw new Error("Expecting 1 " + (0, _conditionsJs.PTs).tagName + " but finding " + xml_PTss.length + "!");
        let attributes = (0, _xmlJs.getAttributes)(xml_PTss[0]);
        let xml_PTpairs = xml_PTss[0].getElementsByTagName((0, _conditionsJs.PTpair).tagName);
        if (xml_PTpairs.length == 0) throw new Error("Expecting 1 or more " + (0, _conditionsJs.PTpair).tagName + " but finding 0!");
        else {
            pTs = new (0, _conditionsJs.PTs)(attributes);
            for(let i = 0; i < xml_PTpairs.length; i++){
                let pTpairAttributes = (0, _xmlJs.getAttributes)(xml_PTpairs[i]);
                console.log("pTpairAttributes=" + (0, _utilJs.mapToString)(pTpairAttributes));
                let pTpair = new (0, _conditionsJs.PTpair)(pTpairAttributes);
                pTs.addPTpair(pTpair);
                // BathGas.
                let xml_bathGass = xml_PTpairs[i].getElementsByTagName((0, _conditionsJs.BathGas).tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    let bathGasValue = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGass[0]));
                    let bathGas = new (0, _conditionsJs.BathGas)((0, _xmlJs.getAttributes)(xml_bathGass[0]), bathGasValue);
                    pTpair.setBathGas(bathGas);
                }
                // ExperimentRate.
                let xml_experimentRates = xml_PTpairs[i].getElementsByTagName((0, _conditionsJs.ExperimentalRate).tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_experimentRates[0]));
                    let experimentRate = new (0, _conditionsJs.ExperimentalRate)((0, _xmlJs.getAttributes)(xml_experimentRates[0]), parseFloat(valueString));
                    pTpair.setExperimentalRate(experimentRate);
                }
                // ExperimentalYield.
                let xml_experimentalYields = xml_PTpairs[i].getElementsByTagName((0, _conditionsJs.ExperimentalYield).tagName);
                if (xml_experimentalYields.length > 0) {
                    if (xml_experimentalYields.length > 1) console.warn("xml_experimentalYields.length=" + xml_experimentalYields.length);
                    let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_experimentalYields[0]));
                    let experimentalYield = new (0, _conditionsJs.ExperimentalYield)((0, _xmlJs.getAttributes)(xml_experimentalYields[0]), parseFloat(valueString));
                    pTpair.setExperimentalYield(experimentalYield);
                }
                // ExperimentalEigenvalue.
                let xml_experimentalEigenvalues = xml_PTpairs[i].getElementsByTagName((0, _conditionsJs.ExperimentalEigenvalue).tagName);
                if (xml_experimentalEigenvalues.length > 0) {
                    if (xml_experimentalEigenvalues.length > 1) console.warn("xml_experimentalEigenvalues.length=" + xml_experimentalEigenvalues.length);
                    let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_experimentalEigenvalues[0]));
                    let experimentalEigenvalue = new (0, _conditionsJs.ExperimentalEigenvalue)((0, _xmlJs.getAttributes)(xml_experimentalEigenvalues[0]), parseFloat(valueString));
                    pTpair.setExperimentalEigenvalue(experimentalEigenvalue);
                }
                // Create pTpairDiv.
                createPTpairDiv(pTs, pTsDiv, pTpair, i, moleculeKeys);
            }
        }
    } else pTs = new (0, _conditionsJs.PTs)(new Map());
    conditions.setPTs(pTs);
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
    let addButton = (0, _htmlJs.createButton)(addString, undefined, level2);
    pTsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener("click", ()=>{
        // Create a new PTpair.
        let pTpairAttributes = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair = new (0, _conditionsJs.PTpair)(pTpairAttributes);
        let pTpairIndex = pTs.addPTpair(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        createPTpairDiv(pTs, pTsDiv, pTpair, pTpairIndex, moleculeKeys);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, _htmlJs.createButton)(s_Add_from_spreadsheet, undefined, boundary1);
    pTsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener("click", ()=>{
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, _htmlJs.createFlexDiv)(undefined, level2);
        let addFromSpreadsheetId = (0, _conditionsJs.PTs).tagName + "_" + "addFromSpreadsheet";
        let inputElement = (0, _htmlJs.createInput)("text", addFromSpreadsheetId, level2);
        div.appendChild(inputElement);
        pTsDiv.insertBefore(div, addButton);
        // Add an event listener to the inputElement.
        inputElement.addEventListener("change", ()=>{
            console.log("inputElement.value=" + inputElement.value);
            console.log("inputElement.value.length=" + inputElement.value.length);
            if (inputElement.value.length > 0) {
                let pTpairsArray = inputElement.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTpairsArray[0].split("	").forEach((value, i)=>{
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for(let i = 1; i < pTpairsArray.length; i++){
                    let pTpairArray = pTpairsArray[i].split("	");
                    let pIndex = index.get("P");
                    let p = parseFloat(pTpairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTpairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair = new (0, _conditionsJs.PTpair)(pTpairAttributes);
                    pTs.addPTpair(pTpair);
                    let tIndex = index.get("T");
                    let t = parseFloat(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has((0, _conditionsJs.PTpair).s_excessReactantConc)) {
                        let excessReactantConIndex = index.get((0, _conditionsJs.PTpair).s_excessReactantConc);
                        let excessReactantConc = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set((0, _conditionsJs.PTpair).s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has((0, _conditionsJs.PTpair).s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex = index.get((0, _conditionsJs.PTpair).s_percentExcessReactantConc);
                        let percentExcessReactantConc = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set((0, _conditionsJs.PTpair).s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has((0, _conditionsJs.PTpair).s_precision)) {
                        let precisionIndex = index.get((0, _conditionsJs.PTpair).s_precision);
                        let precision = pTpairArray[precisionIndex];
                        pTpairAttributes.set((0, _conditionsJs.PTpair).s_precision, precision);
                    //console.log("precision=" + precision);
                    }
                    if (index.has((0, _conditionsJs.BathGas).tagName)) {
                        let bathGasIndex = index.get((0, _conditionsJs.BathGas).tagName);
                        let bathGas = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new (0, _conditionsJs.BathGas)(new Map(), bathGas));
                    }
                    if (index.has((0, _conditionsJs.ExperimentalRate).tagName)) {
                        let experimentalRateIndex = index.get((0, _conditionsJs.ExperimentalRate).tagName);
                        let experimentalRate = pTpairArray[experimentalRateIndex];
                        pTpairAttributes.set((0, _conditionsJs.ExperimentalRate).tagName, experimentalRate);
                        pTpair.setExperimentalRate(new (0, _conditionsJs.ExperimentalRate)(new Map(), parseFloat(experimentalRate)));
                        // Set the attributes of the experimentalRate.
                        // ref1.
                        let experimentalRateRef1Index = index.get((0, _conditionsJs.ExperimentalRate).tagName + "_" + (0, _conditionsJs.ExperimentalRate).s_ref1);
                        let experimentalRateRef1 = pTpairArray[experimentalRateRef1Index];
                        pTpair.getExperimentalRate()?.setRef1(experimentalRateRef1);
                        // ref2.
                        let experimentalRateRef2Index = index.get((0, _conditionsJs.ExperimentalRate).tagName + "_" + (0, _conditionsJs.ExperimentalRate).s_ref2);
                        let experimentalRateRef2 = pTpairArray[experimentalRateRef2Index];
                        pTpair.getExperimentalRate()?.setRef2(experimentalRateRef2);
                        // refReaction.
                        let experimentalRateRefReactionIndex = index.get((0, _conditionsJs.ExperimentalRate).tagName + "_" + (0, _conditionsJs.ExperimentalRate).s_refReaction);
                        let experimentalRateRefReaction = pTpairArray[experimentalRateRefReactionIndex];
                        pTpair.getExperimentalRate()?.setRefReaction(experimentalRateRefReaction);
                        // error.
                        let experimentalRateErrorIndex = index.get((0, _conditionsJs.ExperimentalRate).tagName + "_" + (0, _conditionsJs.ExperimentalRate).s_error);
                        let experimentalRateError = pTpairArray[experimentalRateErrorIndex];
                        pTpair.getExperimentalRate()?.setError(parseFloat(experimentalRateError));
                    }
                    if (index.has((0, _conditionsJs.ExperimentalYield).tagName)) {
                        let experimentalYieldIndex = index.get((0, _conditionsJs.ExperimentalYield).tagName);
                        let experimentalYield = pTpairArray[experimentalYieldIndex];
                        pTpair.setExperimentalYield(new (0, _conditionsJs.ExperimentalYield)(new Map(), parseFloat(experimentalYield)));
                        // Set the attributes of the experimentalYield.
                        // ref.
                        let experimentalYieldRefIndex = index.get((0, _conditionsJs.ExperimentalYield).tagName + "_" + (0, _conditionsJs.ExperimentalYield).s_ref);
                        let experimentalYieldRef = pTpairArray[experimentalYieldRefIndex];
                        pTpair.getExperimentalYield()?.setRef(experimentalYieldRef);
                        // yieldTime.
                        let experimentalYieldYieldTimeIndex = index.get((0, _conditionsJs.ExperimentalYield).tagName + "_" + (0, _conditionsJs.ExperimentalYield).s_yieldTime);
                        let experimentalYieldYieldTime = pTpairArray[experimentalYieldYieldTimeIndex];
                        pTpair.getExperimentalYield()?.setYieldTime(parseFloat(experimentalYieldYieldTime));
                        // error.
                        let experimentalYieldErrorIndex = index.get((0, _conditionsJs.ExperimentalYield).tagName + "_" + (0, _conditionsJs.ExperimentalYield).s_error);
                        let experimentalYieldError = pTpairArray[experimentalYieldErrorIndex];
                        pTpair.getExperimentalYield()?.setError(parseFloat(experimentalYieldError));
                    }
                    if (index.has((0, _conditionsJs.ExperimentalEigenvalue).tagName)) {
                        let experimentalEigenvalueIndex = index.get((0, _conditionsJs.ExperimentalEigenvalue).tagName);
                        let experimentalEigenvalue = pTpairArray[experimentalEigenvalueIndex];
                        pTpair.setExperimentalEigenvalue(new (0, _conditionsJs.ExperimentalEigenvalue)(new Map(), parseFloat(experimentalEigenvalue)));
                        // Set the attributes of the experimentalEigenvalue.
                        // EigenvalueID.
                        let experimentalEigenvalueEigenvalueIDIndex = index.get((0, _conditionsJs.ExperimentalEigenvalue).tagName + "_" + (0, _conditionsJs.ExperimentalEigenvalue).s_EigenvalueID);
                        let experimentalEigenvalueEigenvalueID = pTpairArray[experimentalEigenvalueEigenvalueIDIndex];
                        pTpair.getExperimentalEigenvalue()?.setEigenvalueID(experimentalEigenvalueEigenvalueID);
                        // error.
                        let experimentalEigenvalueErrorIndex = index.get((0, _conditionsJs.ExperimentalEigenvalue).tagName + "_" + (0, _conditionsJs.ExperimentalEigenvalue).s_error);
                        let experimentalEigenvalueError = pTpairArray[experimentalEigenvalueErrorIndex];
                        pTpair.getExperimentalEigenvalue()?.setError(parseFloat(experimentalEigenvalueError));
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex = pTs.pTpairs.length - 1;
                    // Create a new div for the PTpair.
                    createPTpairDiv(pTs, pTsDiv, pTpair, pTpairIndex, moleculeKeys);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton = (0, _htmlJs.createButton)("Remove All", undefined, boundary1);
    pTsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener("click", ()=>{
        pTs.removePTpairs();
        // Remove all elements before the add button.
        let child = pTsDiv.firstChild;
        while(child != null && child != addButton){
            let nextSibling = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
    return conditionsDiv;
}
/**
 * @param pTs The PTs.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param index The index.
 * @param moleculeKeys The molecule keys.
 * @param removePTpair The removePTpair function.
 */ function createPTpairDiv(pTs, pTsDiv, pTpair, index, moleculeKeys) {
    let pTpairDiv = (0, _htmlJs.createFlexDiv)(undefined, level2);
    pTsDiv.appendChild(pTpairDiv);
    addPorT(pTpairDiv, (0, _conditionsJs.PTpair).s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    addAnyUnits((0, _mesmerJs.Mesmer).pressureUnits, pTpair.attributes, pTpairDiv, (0, _conditionsJs.PTpair).tagName, (0, _conditionsJs.PTpair).tagName, boundary1);
    addPorT(pTpairDiv, (0, _conditionsJs.PTpair).s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    // ExcessReactantConc.
    addButtonWithToggle(pTpairDiv, pTpair, (0, _conditionsJs.PTpair).s_excessReactantConc, (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.PTpair).s_excessReactantConc + index, [
        pTpair
    ], createExcessReactantConcInputElement);
    // PercentExcessReactantConc.
    addButtonWithToggle(pTpairDiv, pTpair, (0, _conditionsJs.PTpair).s_percentExcessReactantConc);
    // Precision.
    addButtonWithToggle(pTpairDiv, pTpair, (0, _conditionsJs.PTpair).s_precision, (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.PTpair).s_precision + index, [
        pTpair
    ], createPrecisionSelectElement);
    // BathGas.
    addButtonWithToggle(pTpairDiv, pTpair, (0, _conditionsJs.BathGas).tagName, (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.BathGas).tagName + index, [
        pTpair,
        moleculeKeys,
        true
    ], createBathGasSelectElement);
    // ExperimentalRate
    //addExperimentalRate(pTpairDiv, pTpair, index);
    addExperimentalYield(pTpairDiv, pTpair, index);
    addExperimentalEigenvalue(pTpairDiv, pTpair, index);
    // Function to be used to remove an PTpair.
    let removePTpair = (pTpairDiv, i, pTpair)=>{
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) pTs.removePTpair(i);
        pTpair.removeBathGas();
    };
    addRemoveButton(pTpairDiv, boundary1, removePTpair, pTpairDiv, index, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */ function addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _conditionsJs.PTpair).tagName + "_" + name, boundary1, level0, (event)=>{
        let target = event.target;
        if ((0, _utilJs.isNumeric)(target.value)) {
            setter(parseFloat(target.value));
            console.log(`Set ${name} to ${target.value}`);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = getter().toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, getter().toExponential(), name);
    let input = lwi.querySelector("input");
    input.value = getter().toString();
    (0, _htmlJs.resizeInputElement)(input);
    pTpairDiv.appendChild(lwi);
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param attribute The attribute.
 * @param id The id for any created element.
 * @param handlerArgs The arguments for the handler.
 * @param handler The handler function that creates any element.
 */ function addButtonWithToggle(pTpairDiv, pTpair, attribute, id, handlerArgs, handler) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    pTpairDiv.append(div);
    let buttonTextContentSelected = attribute + selected;
    let buttonTextContentDeselected = attribute + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle("optionOff");
        button.textContent = buttonTextContentSelected;
    } else {
        button.classList.toggle("optionOn");
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle("optionOn");
        button.classList.toggle("optionOff");
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
            if (handler) {
                if (id != undefined && handlerArgs != undefined) {
                    if (handler == createBathGasSelectElement) {
                        let bathGas = pTpair.getBathGas();
                        if (bathGas == undefined) {
                            button.classList.toggle("optionOn");
                            button.textContent = buttonTextContentDeselected;
                        } else {
                            button.classList.toggle("optionOff");
                            button.textContent = buttonTextContentSelected;
                            if (handlerArgs[1].has(bathGas.value) == false) console.warn("moleculeKeys does not contain " + bathGas.value);
                            div.appendChild(handler(id, bathGas, true));
                        }
                        let input = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    } else {
                        let input = handler(id, ...handlerArgs);
                        div.insertBefore(input, button.nextSibling);
                    }
                }
            }
        } else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
            if (id) // Remove the element.
            (0, _htmlJs.remove)(id, ids);
        }
    });
}
/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */ function createExcessReactantConcInputElement(id, pTpair) {
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    let value;
    if (pTpair.attributes.has((0, _conditionsJs.PTpair).s_excessReactantConc)) value = pTpair.attributes.get((0, _conditionsJs.PTpair).s_excessReactantConc);
    else value = NaN.toString();
    console.log((0, _conditionsJs.PTpair).s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + (0, _conditionsJs.PTpair).s_excessReactantConc + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    });
    (0, _htmlJs.resizeInputElement)(input);
    return input;
}
/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */ function createPrecisionSelectElement(id, pTpair) {
    let value;
    if (pTpair.attributes.has((0, _conditionsJs.PTpair).s_precision)) value = pTpair.attributes.get((0, _conditionsJs.PTpair).s_precision);
    else value = (0, _mesmerJs.Mesmer).precisionOptions[0];
    let select = (0, _htmlJs.createSelectElement)((0, _mesmerJs.Mesmer).precisionOptions, (0, _conditionsJs.PTpair).s_precision, value, id, boundary1);
    select.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setPrecision(target.value);
        console.log("Set " + (0, _conditionsJs.PTpair).s_precision + " to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    (0, _htmlJs.resizeSelectElement)(select);
    return select;
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 
function addBathGas(pTpairDiv: HTMLDivElement, pTpair: PTpair, i: number, moleculeKeys: Set<string>): void {
    let div: HTMLDivElement = createDiv(boundary1);
    pTpairDiv.append(div);
    let tagName: string = BathGas.tagName;
    let buttonTextContentSelected: string = tagName + selected;
    let buttonTextContentDeselected: string = tagName + deselected;
    let button = createButton(buttonTextContentDeselected, boundary1);
    div.appendChild(button);
    button.classList.add('optionOn');
    button.classList.add('optionOff');
    let bathGas: BathGas | undefined = pTpair.getBathGas();
    let id = PTpair.tagName + "_" + tagName + "_select" + "_" + i;
    if (bathGas == undefined) {
        button.classList.toggle('optionOn');
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle('optionOff');
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) {
            console.warn("moleculeKeys does not contain " + bathGas.value);
        }
        div.appendChild(getBathGasSelectElement(pTpair, id, bathGas, true));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event: MouseEvent) => {
        button.classList.toggle('optionOn');
        button.classList.toggle('optionOff');
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(getBathGasSelectElement(pTpair, id, bathGas, true));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            remove(id);
        }
    });
}

/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */ function createBathGasSelectElement(id, pTpair, bathGas, first) {
    let select = createSelectElementBathGas(Array.from(new Set(molecules.keys())), bathGas, first);
    select.id = id;
    select.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setBathGas(new (0, _conditionsJs.BathGas)(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    (0, _htmlJs.resizeSelectElement)(select);
    return select;
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 */ function createSelectElementBathGas(options, bathGas, first) {
    let value;
    if (first) options.push(selectAnotherOption);
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf(selectAnotherOption);
        if (index > -1) options.splice(index, 1);
    }
    if (bathGas == undefined) {
        bathGas = new (0, _conditionsJs.BathGas)(new Map(), selectAnotherOption);
        value = selectAnotherOption;
    } else value = bathGas.value;
    let select = (0, _htmlJs.createSelectElement)(options, (0, _conditionsJs.BathGas).tagName, value, (0, _conditionsJs.PTs).tagName, boundary1);
    selectAnotherOptionEventListener(options, select);
    // Add event listener to selectElement.
    select.addEventListener("change", (event)=>{
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as a " + (0, _conditionsJs.BathGas).tagName);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    select.value = value;
    (0, _htmlJs.resizeSelectElement)(select);
    return select;
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 */ function addExperimentalRate(pTpairDiv, pTpair, i) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    pTpairDiv.append(div);
    let tagName = (0, _conditionsJs.ExperimentalRate).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, _conditionsJs.PTpair).tagName + "_" + tagName + "_" + i;
    if (pTpair.getExperimentalRate() == undefined) {
        button.classList.toggle("optionOn");
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle("optionOff");
        button.textContent = buttonTextContentSelected;
        div.appendChild(addExperimentalRateDetails(pTpair, id));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle("optionOn");
        button.classList.toggle("optionOff");
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(addExperimentalRateDetails(pTpair, id));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            (0, _htmlJs.remove)(id, ids);
        }
    });
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 */ function addExperimentalRateDetails(pTpair, id) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    div.id = id;
    let experimentalRate = pTpair.getExperimentalRate();
    if (experimentalRate == undefined) {
        experimentalRate = new (0, _conditionsJs.ExperimentalRate)(new Map(), NaN);
        pTpair.setExperimentalRate(experimentalRate);
    }
    // value.
    let rateId = id + "_" + (0, _conditionsJs.ExperimentalRate).tagName;
    let ratelwi = (0, _htmlJs.createLabelWithInput)("number", rateId, boundary1, level0, (event)=>{
        let target = event.target;
        setNumberNode(experimentalRate, target);
        console.log("Set " + (0, _conditionsJs.ExperimentalRate).tagName + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalRate.value.toString(), "");
    div.appendChild(ratelwi);
    // ref1.
    let ref1Id = id + (0, _conditionsJs.ExperimentalRate).s_ref1;
    let ref1lwi = (0, _htmlJs.createLabelWithInput)("string", ref1Id, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalRate()?.setRef1(target.value);
        console.log("Set " + (0, _conditionsJs.ExperimentalRate).s_ref1 + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalRate.getRef1(), (0, _conditionsJs.ExperimentalRate).s_ref1);
    div.appendChild(ref1lwi);
    // ref2.
    let ref2Id = id + (0, _conditionsJs.ExperimentalRate).s_ref2;
    let ref2lwi = (0, _htmlJs.createLabelWithInput)("string", ref2Id, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalRate()?.setRef2(target.value);
        console.log("Set " + (0, _conditionsJs.ExperimentalRate).s_ref2 + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalRate.getRef2(), (0, _conditionsJs.ExperimentalRate).s_ref2);
    div.appendChild(ref2lwi);
    // refReaction.
    let refReactionId = id + (0, _conditionsJs.ExperimentalRate).s_refReaction;
    let refReactionlwi = (0, _htmlJs.createLabelWithInput)("string", refReactionId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalRate()?.setRefReaction(target.value);
        console.log("Set " + (0, _conditionsJs.ExperimentalRate).s_refReaction + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalRate.getRefReaction(), (0, _conditionsJs.ExperimentalRate).s_refReaction);
    div.appendChild(refReactionlwi);
    // Error.
    let errorId = id + (0, _conditionsJs.ExperimentalRate).s_error;
    let errorlwi = (0, _htmlJs.createLabelWithInput)("number", errorId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalRate()?.setError(parseFloat(target.value));
        console.log("Set " + (0, _conditionsJs.ExperimentalRate).s_error + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalRate.getError().toExponential(), (0, _conditionsJs.ExperimentalRate).s_error);
    div.appendChild(errorlwi);
    return div;
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 */ function addExperimentalYield(pTpairDiv, pTpair, i) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    pTpairDiv.append(div);
    let tagName = (0, _conditionsJs.ExperimentalYield).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, _conditionsJs.PTpair).tagName + "_" + tagName + "_" + i;
    if (pTpair.getExperimentalYield() == undefined) {
        button.classList.toggle("optionOn");
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle("optionOff");
        button.textContent = buttonTextContentSelected;
        div.appendChild(addExperimentalYieldDetails(pTpair, id));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle("optionOn");
        button.classList.toggle("optionOff");
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(addExperimentalYieldDetails(pTpair, id));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            (0, _htmlJs.remove)(id, ids);
        }
    });
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 */ function addExperimentalYieldDetails(pTpair, id) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    div.id = id;
    let experimentalYield = pTpair.getExperimentalYield();
    if (experimentalYield == undefined) {
        experimentalYield = new (0, _conditionsJs.ExperimentalYield)(new Map(), NaN);
        pTpair.setExperimentalYield(experimentalYield);
    }
    // value.
    let yieldId = id + "_" + (0, _conditionsJs.ExperimentalYield).tagName;
    let yieldlwi = (0, _htmlJs.createLabelWithInput)("number", yieldId, boundary1, level0, (event)=>{
        let target = event.target;
        setNumberNode(experimentalYield, target);
        console.log("Set " + (0, _conditionsJs.ExperimentalYield).tagName + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalYield.value.toString(), "");
    div.appendChild(yieldlwi);
    // ref.
    let refId = id + (0, _conditionsJs.ExperimentalYield).s_ref;
    let reflwi = (0, _htmlJs.createLabelWithInput)("string", refId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalYield()?.setRef(target.value);
        console.log("Set " + (0, _conditionsJs.ExperimentalYield).s_ref + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalYield.getRef(), (0, _conditionsJs.ExperimentalYield).s_ref);
    div.appendChild(reflwi);
    // yieldTime.
    let yieldTimeId = id + (0, _conditionsJs.ExperimentalYield).s_yieldTime;
    let yieldTimelwi = (0, _htmlJs.createLabelWithInput)("number", yieldTimeId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalYield()?.setYieldTime(parseFloat(target.value));
        console.log("Set " + (0, _conditionsJs.ExperimentalYield).s_yieldTime + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalYield.getYieldTime().toString(), (0, _conditionsJs.ExperimentalYield).s_yieldTime);
    div.appendChild(yieldTimelwi);
    // Error.
    let errorId = id + (0, _conditionsJs.ExperimentalYield).s_error;
    let errorlwi = (0, _htmlJs.createLabelWithInput)("number", errorId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalYield()?.setError(parseFloat(target.value));
        console.log("Set " + (0, _conditionsJs.ExperimentalYield).s_error + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalYield.getError().toExponential(), (0, _conditionsJs.ExperimentalYield).s_error);
    div.appendChild(errorlwi);
    return div;
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */ function addExperimentalEigenvalue(pTpairDiv, pTpair, i) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    pTpairDiv.append(div);
    let tagName = (0, _conditionsJs.ExperimentalEigenvalue).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, _conditionsJs.PTpair).tagName + "_" + tagName + "_" + i;
    if (pTpair.getExperimentalEigenvalue() == undefined) {
        button.classList.toggle("optionOn");
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle("optionOff");
        button.textContent = buttonTextContentSelected;
        div.appendChild(addExperimentalEigenvalueDetails(pTpair, id));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle("optionOn");
        button.classList.toggle("optionOff");
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(addExperimentalEigenvalueDetails(pTpair, id));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            (0, _htmlJs.remove)(id, ids);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 */ function addExperimentalEigenvalueDetails(pTpair, id) {
    let div = (0, _htmlJs.createDiv)(undefined, boundary1);
    div.id = id;
    let experimentalEigenvalue = pTpair.getExperimentalEigenvalue();
    if (experimentalEigenvalue == undefined) {
        experimentalEigenvalue = new (0, _conditionsJs.ExperimentalEigenvalue)(new Map(), NaN);
        pTpair.setExperimentalEigenvalue(experimentalEigenvalue);
    }
    // value.
    let eigenvalueId = id + "_" + (0, _conditionsJs.ExperimentalEigenvalue).tagName;
    let eigenvaluelwi = (0, _htmlJs.createLabelWithInput)("number", eigenvalueId, boundary1, level0, (event)=>{
        let target = event.target;
        setNumberNode(experimentalEigenvalue, target);
        console.log("Set " + (0, _conditionsJs.ExperimentalEigenvalue).tagName + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalEigenvalue.value.toString(), "");
    div.appendChild(eigenvaluelwi);
    // EigenvalueID.
    let eigenvalueIDId = id + "_" + (0, _conditionsJs.ExperimentalEigenvalue).s_EigenvalueID;
    let eigenvalueIDlwi = (0, _htmlJs.createLabelWithInput)("string", eigenvalueIDId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value);
        console.log("Set " + (0, _conditionsJs.ExperimentalEigenvalue).s_EigenvalueID + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalEigenvalue.getEigenvalueID(), (0, _conditionsJs.ExperimentalEigenvalue).s_EigenvalueID);
    div.appendChild(eigenvalueIDlwi);
    // Error.
    let errorId = id + (0, _conditionsJs.ExperimentalEigenvalue).s_error;
    let errorlwi = (0, _htmlJs.createLabelWithInput)("number", errorId, boundary1, level0, (event)=>{
        let target = event.target;
        pTpair.getExperimentalEigenvalue()?.setError(parseFloat(target.value));
        console.log("Set " + (0, _conditionsJs.ExperimentalEigenvalue).s_error + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, experimentalEigenvalue.getError().toExponential(), (0, _conditionsJs.ExperimentalEigenvalue).s_error);
    div.appendChild(errorlwi);
    return div;
}
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ function processModelParameters(xml) {
    console.log((0, _modelParametersJs.ModelParameters).tagName);
    let modelParametersDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
    let xml_modelParameters = (0, _xmlJs.getSingularElement)(xml, (0, _modelParametersJs.ModelParameters).tagName);
    let modelParameters = new (0, _modelParametersJs.ModelParameters)((0, _xmlJs.getAttributes)(xml_modelParameters));
    mesmer.setModelParameters(modelParameters);
    processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv);
    processAutomaticallySetMaxEneModelParameters(modelParameters, xml_modelParameters, modelParametersDiv);
    processEnergyAboveTheTopHill(modelParameters, xml_modelParameters, modelParametersDiv);
    processMaxTemperature(modelParameters, xml_modelParameters, modelParametersDiv);
    return modelParametersDiv;
}
/**
 * @param modelParameters The model parameters.
 * @param xml_modelParameters The XML model parameters.
 * @param modelParametersDiv The model parameters div.
 */ function processGrainSize(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName = (0, _modelParametersJs.GrainSize).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, _htmlJs.createButton)(tagName, undefined, boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(button);
    let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_input";
    let ids = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_select";
    let gs;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        gs = new (0, _modelParametersJs.GrainSize)((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        gs = new (0, _modelParametersJs.GrainSize)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the GrainSize already exists
        if (!modelParameters.index.has((0, _modelParametersJs.GrainSize).tagName)) {
            createGrainSizeInput(modelParameters, div, gs, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = gs.value.toExponential();
            modelParameters.removeGrainSize();
            document.getElementById(id)?.remove();
            document.getElementById(ids)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param gs The grain size.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function createGrainSizeInput(modelParameters, div, gs, id, ids, valueString) {
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
    addAnyUnits((0, _mesmerJs.Mesmer).energyUnits, gs.attributes, div, ids, (0, _modelParametersJs.GrainSize).tagName, boundary1);
}
/**
 * Process "me:automaticallySetMaxEne".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function processAutomaticallySetMaxEneModelParameters(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName = (0, _controlJs.AutomaticallySetMaxEne).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, _htmlJs.createButton)(tagName, undefined, boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(button);
    let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_input";
    let ids = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_select";
    let asme;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        asme = new (0, _controlJs.AutomaticallySetMaxEne)((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        asme = new (0, _controlJs.AutomaticallySetMaxEne)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the AutomaticallySetMaxEne already exists
        if (!modelParameters.index.has((0, _controlJs.AutomaticallySetMaxEne).tagName)) {
            createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = asme.value.toExponential();
            modelParameters.removeAutomaticallySetMaxEne();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The ModelParameters.
 * @param div The div.
 * @param asme The automatically set max energy.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function createAutomaticallySetMaxEneInputModelParameters(modelParameters, div, asme, id, ids, valueString) {
    modelParameters.setAutomaticallySetMaxEne(asme);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setNumberNode(asme, target);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits((0, _mesmerJs.Mesmer).energyUnits, asme.attributes, div, ids, (0, _controlJs.AutomaticallySetMaxEne).tagName, boundary1);
}
/**
 * Process "me:energyAboveTheTopHill".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function processEnergyAboveTheTopHill(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName = (0, _modelParametersJs.EnergyAboveTheTopHill).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, _htmlJs.createButton)(tagName, undefined, boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(button);
    let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_input";
    let ids = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_select";
    let eatth;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        eatth = new (0, _modelParametersJs.EnergyAboveTheTopHill)((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        eatth = new (0, _modelParametersJs.EnergyAboveTheTopHill)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the EnergyAboveTheTopHill already exists
        if (!modelParameters.index.has((0, _modelParametersJs.EnergyAboveTheTopHill).tagName)) {
            createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = eatth.value.toExponential();
            modelParameters.removeEnergyAboveTheTopHill();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param eatth The energy above the top hill.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function createEnergyAboveTheTopHillInput(modelParameters, div, eatth, id, ids, valueString) {
    modelParameters.setEnergyAboveTheTopHill(eatth);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setNumberNode(eatth, target);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits((0, _mesmerJs.Mesmer).energyUnits, eatth.attributes, div, ids, (0, _modelParametersJs.EnergyAboveTheTopHill).tagName, boundary1);
}
/**
 * Process "me:maxTemperature".
 * @param modelParameters The ModelParameters.
 * @param modelParametersDiv The modelParameters div.
 * @param xml_modelParameters The xml modelParameters.
 */ function processMaxTemperature(modelParameters, xml_modelParameters, modelParametersDiv) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level1);
    modelParametersDiv.appendChild(div);
    let tagName = (0, _modelParametersJs.MaxTemperature).tagName;
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let xml = xml_modelParameters.getElementsByTagName(tagName);
    let button = (0, _htmlJs.createButton)(tagName, undefined, boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    div.appendChild(button);
    let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_input";
    let ids = (0, _modelParametersJs.ModelParameters).tagName + "_" + tagName + "_select";
    let mt;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        mt = new (0, _modelParametersJs.MaxTemperature)((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        mt = new (0, _modelParametersJs.MaxTemperature)(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the MaxTemperature already exists
        if (!modelParameters.index.has((0, _modelParametersJs.MaxTemperature).tagName)) {
            createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = mt.value.toExponential();
            modelParameters.removeMaxTemperature();
            // Remove any existing div.
            document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param modelParameters The model parameters.
 * @param div The div.
 * @param mt The max temperature.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 */ function createMaxTemperatureInput(modelParameters, div, mt, id, ids, valueString) {
    modelParameters.setMaxTemperature(mt);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setNumberNode(mt, target);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
    addAnyUnits(undefined, mt.attributes, div, ids, (0, _modelParametersJs.MaxTemperature).tagName, boundary1);
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
    // Get the XML "me:control" element.
    let xml_controls = xml.getElementsByTagName((0, _controlJs.Control).tagName);
    let controlsDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
    for(let i = 0; i < xml_controls.length; i++){
        let xml_control = xml_controls[i];
        // Create div to contain the control.
        let controlDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
        controlDiv.id = "control" + i.toString();
        let control = new (0, _controlJs.Control)((0, _xmlJs.getAttributes)(xml_control), i);
        mesmer.addControl(control);
        // Create a collapsible div for control.
        controlsDiv.appendChild((0, _htmlJs.getCollapsibleDiv)({
            content: controlDiv,
            buttonLabel: "Control " + i.toString(),
            buttonFontSize: fontSize2,
            boundary: boundary1,
            level: level1,
            contentDivId: controlDiv.id
        }));
        let level = level2;
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        processControlOptionSimple(control, onOffControls, xml_control, (0, _controlJs.CalculateRateCoefficientsOnly).tagName, (0, _controlJs.CalculateRateCoefficientsOnly), control.setCalculateRateCoefficientsOnly, control.removeCalculateRateCoefficientsOnly);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.CalculateRateCoefficientsOnly).tagName, (0, _controlJs.CalculateRateCoefficientsOnly), control.setCalculateRateCoefficientsOnly, control.removeCalculateRateCoefficientsOnly);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintCellDOS).tagName, (0, _controlJs.PrintCellDOS), control.setPrintCellDOS, control.removePrintCellDOS);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintCellTransitionStateFlux).tagName, (0, _controlJs.PrintCellTransitionStateFlux), control.setPrintCellTransitionStateFlux, control.removePrintCellTransitionStateFlux);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintReactionOperatorColumnSums).tagName, (0, _controlJs.PrintReactionOperatorColumnSums), control.setPrintReactionOperatorColumnSums, control.removePrintReactionOperatorColumnSums);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintGrainBoltzmann).tagName, (0, _controlJs.PrintGrainBoltzmann), control.setPrintGrainBoltzmann, control.removePrintGrainBoltzmann);
        //processControlOption(control, controlDiv, onOffControls, xml_control, level, PrintGrainDOS.tagName,
        //    PrintGrainDOS, control.setPrintGrainDOS, control.removePrintGrainDOS);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintGrainkbE).tagName, (0, _controlJs.PrintGrainkbE), control.setPrintGrainkbE, control.removePrintGrainkbE);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintGrainkfE).tagName, (0, _controlJs.PrintGrainkfE), control.setPrintGrainkfE, control.removePrintGrainkfE);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintTSsos).tagName, (0, _controlJs.PrintTSsos), control.setPrintTSsos, control.removePrintTSsos);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintGrainedSpeciesProfile).tagName, (0, _controlJs.PrintGrainedSpeciesProfile), control.setPrintGrainedSpeciesProfile, control.removePrintGrainedSpeciesProfile);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintGrainTransitionStateFlux).tagName, (0, _controlJs.PrintGrainTransitionStateFlux), control.setPrintGrainTransitionStateFlux, control.removePrintGrainTransitionStateFlux);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintReactionOperatorSize).tagName, (0, _controlJs.PrintReactionOperatorSize), control.setPrintReactionOperatorSize, control.removePrintReactionOperatorSize);
        //processControlOption(control, controlDiv, onOffControls, xml_control, level, PrintSpeciesProfile.tagName,
        //    PrintSpeciesProfile, control.setPrintSpeciesProfile, control.removePrintSpeciesProfile);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintPhenomenologicalEvolution).tagName, (0, _controlJs.PrintPhenomenologicalEvolution), control.setPrintPhenomenologicalEvolution, control.removePrintPhenomenologicalEvolution);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintTunnelingCoefficients).tagName, (0, _controlJs.PrintTunnelingCoefficients), control.setPrintTunnelingCoefficients, control.removePrintTunnelingCoefficients);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.PrintCrossingCoefficients).tagName, (0, _controlJs.PrintCrossingCoefficients), control.setPrintCrossingCoefficients, control.removePrintCrossingCoefficients);
        //processControlOption(control, controlDiv, onOffControls, xml_control, level, TestDOS.tagName,
        //    TestDOS, control.setTestDOS, control.removeTestDOS);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.TestRateConstants).tagName, (0, _controlJs.TestRateConstants), control.setTestRateConstants, control.removeTestRateConstants);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.UseTheSameCellNumberForAllConditions).tagName, (0, _controlJs.UseTheSameCellNumberForAllConditions), control.setUseTheSameCellNumberForAllConditions, control.removeUseTheSameCellNumberForAllConditions);
        //processControlOption(control, controlDiv, onOffControls, xml_control, level, HideInactive.tagName,
        //    HideInactive, control.setHideInactive, control.removeHideInactive);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.ForceMacroDetailedBalance).tagName, (0, _controlJs.ForceMacroDetailedBalance), control.setForceMacroDetailedBalance, control.removeForceMacroDetailedBalance);
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, _htmlJs.createFlexDiv)(undefined, level);
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        controlDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        processTestMicroRates(control, controlDiv, xml_control, level);
        processCalcMethod(control, controlDiv, i, xml_control, level);
        // Controls with items to set.
        processControlItem(control, controlDiv, xml_control, level, (0, _controlJs.Eigenvalues).tagName, (0, _controlJs.Eigenvalues), control.setEigenvalues, control.removeEigenvalues);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.Eigenvalues).tagName, (0, _controlJs.Eigenvalues), control.setEigenvalues, control.removeEigenvalues, true);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.ShortestTimeOfInterest).tagName, (0, _controlJs.ShortestTimeOfInterest), control.setShortestTimeOfInterest, control.removeShortestTimeOfInterest, true);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.MaximumEvolutionTime).tagName, (0, _controlJs.MaximumEvolutionTime), control.setMaximumEvolutionTime, control.removeMaximumEvolutionTime, true);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.AutomaticallySetMaxEne).tagName, (0, _controlJs.AutomaticallySetMaxEne), control.setAutomaticallySetMaxEne, control.removeAutomaticallySetMaxEne, true);
        processControlOption(control, controlDiv, onOffControls, xml_control, level, (0, _controlJs.DiagramEnergyOffset).tagName, (0, _controlJs.DiagramEnergyOffset), control.setDiagramEnergyOffset, control.removeDiagramEnergyOffset, true);
    }
    return controlsDiv;
}
function processControlOption(control, controlDiv, onOffControls, xml_control, level, tagName, ControlClass, setControlMethod, removeControlMethod, isItem = false) {
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id;
    let controlInstance;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        controlInstance = new ControlClass((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        if (isItem) {
            let { div, newid } = createInputControl(control, controlInstance, setControlMethod, valueString, tagName, level);
            id = newid;
            controlDiv.appendChild(div);
            div.appendChild(button);
        } else onOffControls.set(tagName, button);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        controlInstance = new ControlClass(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the control already exists
        if (!control.index.has(tagName)) {
            if (isItem) {
                let { div, newid } = createInputControl(control, controlInstance, setControlMethod, valueString, tagName, level);
                id = newid;
                controlDiv.appendChild(div);
                div.appendChild(button);
            } else setControlMethod.call(control, controlInstance);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            if (isItem) {
                valueString = controlInstance.value.toExponential();
                (0, _htmlJs.remove)(id);
            }
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param controlInstance The control instance.
 * @param setControlMethod The set control method.
 * @param valueString The value string. 
 * @param tagName The tag name.
 * @param level The level.
 * @returns The div and id.
 */ function createInputControl(control, controlInstance, setControlMethod, valueString, tagName, level) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level);
    let newid = addId((0, _controlJs.Control).tagName, tagName, "input");
    let input = document.createElement("input");
    input.id = newid;
    input.type = "text";
    input.value = valueString;
    input.addEventListener("change", (event)=>{
        let value = parseFloat(event.target.value);
        controlInstance.value = value;
        setControlMethod.call(control, controlInstance);
    });
    div.appendChild(input);
    return {
        div,
        newid
    };
}
/**
 * Process "me:calculateRateCoefficientsOnly".
 * @param control The control.
 * @param onOffControls The on/off controls map.
 * @param xml_control The xml control.
 * @param tagName The tag name.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 * @param level The level.
 * @param boundary The boundary.
 */ function processControlOptionSimple(control, onOffControls, xml_control, tagName, ControlClass, setControlMethod, removeControlMethod) {
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    onOffControls.set(tagName, button);
    let controlInstance = new ControlClass();
    if (xml.length == 1) {
        setControlMethod.call(control, controlInstance);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the control already exists
        if (!control.index.has(tagName)) {
            setControlMethod.call(control, controlInstance);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * Process "me:calcMethod".
 * @param control The control.
 * @param controlDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */ function processControlItem(control, controlDiv, xml_control, level, tagName, ControlClass, setControlMethod, removeControlMethod) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level);
    controlDiv.appendChild(div);
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let id = (0, _controlJs.Control).tagName + "_" + tagName + "_input";
    let controlInstance;
    let valueString;
    if (xml.length == 1) {
        valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml[0]));
        let value = parseFloat(valueString);
        controlInstance = new ControlClass((0, _xmlJs.getAttributes)(xml[0]), value);
        button.textContent = buttonTextContentSelected;
        createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
        button.classList.toggle("optionOff");
    } else {
        valueString = "";
        controlInstance = new ControlClass(new Map(), NaN);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the control already exists
        if (!control.index.has(tagName)) {
            createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            valueString = controlInstance.value.toExponential();
            removeControlMethod.call(control);
            // Remove any existing div.
            (0, _htmlJs.remove)(id);
            //document.getElementById(id)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
function createInputControlItem(control, div, obj, setControlMethod, id, valueString) {
    setControlMethod.call(control, obj);
    let input = (0, _htmlJs.createInput)("number", id, boundary1);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setNumberNode(obj, target);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param controlDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */ function processTestMicroRates(control, controlDiv, xml_control, level) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level);
    controlDiv.appendChild(div);
    let tagName = (0, _controlJs.TestMicroRates).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(tagName, undefined, boundary1);
    button.id = (0, _controlJs.Control).tagName + "_" + tagName;
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    let idTmax = (0, _controlJs.Control).tagName + "_" + tagName + "_Tmax";
    let idTmin = (0, _controlJs.Control).tagName + "_" + tagName + "_Tmin";
    let idTstep = (0, _controlJs.Control).tagName + "_" + tagName + "_Tstep";
    if (xml.length == 1) {
        button.textContent = buttonTextContentSelected;
        createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
        button.classList.toggle("optionOff");
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle("optionOn");
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 */ function createTestMicroRates(control, div, xml_tmr, idTmax, idTmin, idTstep) {
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
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, _htmlJs.createLabelWithInput)("number", idTmax + "_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tmr.setTmax(parseFloat(target.value));
            console.log("Set Tmax to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tMax.toExponential(), "Tmax");
    tMaxlwi.id = idTmax;
    (0, _htmlJs.resizeInputElement)(tMaxlwi.querySelector("input"));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, _htmlJs.createLabelWithInput)("number", idTmin + "_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tmr.setTmin(parseFloat(target.value));
            console.log("Set Tmin to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tMin.toExponential(), "Tmin");
    tMinlwi.id = idTmin;
    (0, _htmlJs.resizeInputElement)(tMinlwi.querySelector("input"));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, _htmlJs.createLabelWithInput)("number", idTstep + "_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tmr.setTstep(parseFloat(target.value));
            console.log("Set Tstep to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMax.toExponential();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tStep.toExponential(), "Tstep");
    tSteplwi.id = idTstep;
    (0, _htmlJs.resizeInputElement)(tSteplwi.querySelector("input"));
    div.appendChild(tSteplwi);
}
/**
 * Process "me:calcMethod".
 * @param control The control.
 * @param controlDiv The controls div.
 * @param i The index of the control.
 * @param xml_control The xml control.
 * @param level The level.
 */ function processCalcMethod(control, controlDiv, i, xml_control, level) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, level);
    controlDiv.appendChild(div);
    let tagName = (0, _controlJs.CalcMethod).tagName;
    let xml = xml_control.getElementsByTagName(tagName);
    let buttonTextContentSelected = tagName + selected;
    let buttonTextContentDeselected = tagName + deselected;
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, boundary1);
    div.appendChild(button);
    button.classList.add("optionOn");
    button.classList.add("optionOff");
    // Add the div for the CalcMethod.
    let divCmId = addId((0, _controlJs.Control).tagName, (0, _controlJs.CalcMethod).tagName, i.toString());
    let divCm = (0, _htmlJs.createFlexDiv)(divCmId, boundary1);
    div.appendChild(divCm);
    let options = (0, _controlJs.CalcMethod).options;
    let divCmDetailsId = addId(divCmId, "details");
    let divCmDetailsSelectId = addId(divCmDetailsId, "select");
    let cm;
    if (xml.length > 0) {
        if (xml.length > 1) throw new Error("More than one CalcMethod element.");
        button.classList.toggle("optionOff");
        button.textContent = buttonTextContentSelected;
        let attributes = (0, _xmlJs.getAttributes)(xml[0]);
        let xsi_type = attributes.get("xsi:type");
        // Create the select element.
        let select = createSelectElementCalcMethod(control, div, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
        // Set the select element to the correct value.
        select.value = xsi_type;
        divCm.appendChild(select);
        // Add the details div.
        let divCmDetails = (0, _htmlJs.createFlexDiv)(undefined, boundary1);
        divCmDetails.id = divCmDetailsId;
        divCm.appendChild(divCmDetails);
        if (xsi_type == (0, _controlJs.CalcMethodSimpleCalc).xsi_type || xsi_type == (0, _controlJs.CalcMethodSimpleCalc).xsi_type2) cm = new (0, _controlJs.CalcMethodSimpleCalc)(attributes);
        else if (xsi_type == (0, _controlJs.CalcMethodGridSearch).xsi_type || xsi_type == (0, _controlJs.CalcMethodGridSearch).xsi_type2) cm = new (0, _controlJs.CalcMethodGridSearch)(attributes);
        else if (xsi_type == (0, _controlJs.CalcMethodFitting).xsi_type || xsi_type == (0, _controlJs.CalcMethodFitting).xsi_type2) {
            let cmf = new (0, _controlJs.CalcMethodFitting)(attributes);
            cm = cmf;
            // FittingIterations.
            let fi_xml = xml[0].getElementsByTagName((0, _controlJs.FittingIterations).tagName);
            if (fi_xml.length > 0) {
                if (fi_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(fi_xml[0])));
                    let fittingIterations = new (0, _controlJs.FittingIterations)((0, _xmlJs.getAttributes)(fi_xml[0]), value);
                    cmf.setFittingIterations(fittingIterations);
                } else throw new Error("More than one FittingIterations element.");
            }
            processCalcMethodFitting(divCmDetails, cmf);
        } else if (xsi_type == (0, _controlJs.CalcMethodMarquardt).xsi_type || xsi_type == (0, _controlJs.CalcMethodMarquardt).xsi_type2) {
            let cmm = new (0, _controlJs.CalcMethodMarquardt)(attributes);
            cm = cmm;
            // MarquardtIterations.
            let mi_xml = xml[0].getElementsByTagName((0, _controlJs.MarquardtIterations).tagName);
            if (mi_xml.length > 0) {
                if (mi_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(mi_xml[0])));
                    let marquardtIterations = new (0, _controlJs.MarquardtIterations)((0, _xmlJs.getAttributes)(mi_xml[0]), value);
                    cmm.setMarquardtIterations(marquardtIterations);
                } else throw new Error("More than one MarquardtIterations element.");
            }
            // MarquardtTolerance.
            let mt_xml = xml[0].getElementsByTagName((0, _controlJs.MarquardtTolerance).tagName);
            if (mt_xml.length > 0) {
                if (mt_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(mt_xml[0])));
                    let marquardtTolerance = new (0, _controlJs.MarquardtTolerance)((0, _xmlJs.getAttributes)(mt_xml[0]), value);
                    cmm.setMarquardtTolerance(marquardtTolerance);
                } else throw new Error("More than one MarquardtTolerance element.");
            }
            // MarquardtDerivDelta.
            let mdd_xml = xml[0].getElementsByTagName((0, _controlJs.MarquardtDerivDelta).tagName);
            if (mdd_xml.length > 0) {
                if (mdd_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(mdd_xml[0])));
                    let marquardtDerivDelta = new (0, _controlJs.MarquardtDerivDelta)((0, _xmlJs.getAttributes)(mdd_xml[0]), value);
                    cmm.setMarquardtDerivDelta(marquardtDerivDelta);
                } else throw new Error("More than one MarquardtDerivDelta element.");
            }
            processCalcMethodMarquardt(divCmDetails, cmm);
        } else if (xsi_type == (0, _controlJs.CalcMethodAnalyticalRepresentation).xsi_type || xsi_type == (0, _controlJs.CalcMethodAnalyticalRepresentation).xsi_type2) {
            let cmar = new (0, _controlJs.CalcMethodAnalyticalRepresentation)(attributes);
            cm = cmar;
            // Format.
            let format_xml = xml[0].getElementsByTagName((0, _controlJs.Format).tagName);
            if (format_xml.length > 0) {
                if (format_xml.length == 1) {
                    let value = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(format_xml[0]));
                    let format = new (0, _controlJs.Format)((0, _xmlJs.getAttributes)(format_xml[0]), value);
                    cmar.setFormat(format);
                } else throw new Error("More than one Format element.");
            }
            // Precision.
            let precision_xml = xml[0].getElementsByTagName((0, _controlJs.Precision).tagName);
            if (precision_xml.length > 0) {
                if (precision_xml.length == 1) {
                    let value = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(precision_xml[0]));
                    let precision = new (0, _controlJs.Precision)((0, _xmlJs.getAttributes)(precision_xml[0]), value);
                    cmar.setPrecision(precision);
                } else throw new Error("More than one Precision element.");
            }
            // ChebNumTemp.
            let chebNumTemp_xml = xml[0].getElementsByTagName((0, _controlJs.ChebNumTemp).tagName);
            if (chebNumTemp_xml.length > 0) {
                if (chebNumTemp_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebNumTemp_xml[0])));
                    let chebNumTemp = new (0, _controlJs.ChebNumTemp)((0, _xmlJs.getAttributes)(chebNumTemp_xml[0]), value);
                    cmar.setChebNumTemp(chebNumTemp);
                } else throw new Error("More than one ChebNumTemp element.");
            }
            // ChebNumConc.
            let chebNumConc_xml = xml[0].getElementsByTagName((0, _controlJs.ChebNumConc).tagName);
            if (chebNumConc_xml.length > 0) {
                if (chebNumConc_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebNumConc_xml[0])));
                    let chebNumConc = new (0, _controlJs.ChebNumConc)((0, _xmlJs.getAttributes)(chebNumConc_xml[0]), value);
                    cmar.setChebNumConc(chebNumConc);
                } else throw new Error("More than one ChebNumConc element.");
            }
            // ChebMaxTemp.
            let chebMaxTemp_xml = xml[0].getElementsByTagName((0, _controlJs.ChebMaxTemp).tagName);
            if (chebMaxTemp_xml.length > 0) {
                if (chebMaxTemp_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebMaxTemp_xml[0])));
                    let chebMaxTemp = new (0, _controlJs.ChebMaxTemp)((0, _xmlJs.getAttributes)(chebMaxTemp_xml[0]), value);
                    cmar.setChebMaxTemp(chebMaxTemp);
                } else throw new Error("More than one ChebMaxTemp element.");
            }
            // ChebMinTemp.
            let chebMinTemp_xml = xml[0].getElementsByTagName((0, _controlJs.ChebMinTemp).tagName);
            if (chebMinTemp_xml.length > 0) {
                if (chebMinTemp_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebMinTemp_xml[0])));
                    let chebMinTemp = new (0, _controlJs.ChebMinTemp)((0, _xmlJs.getAttributes)(chebMinTemp_xml[0]), value);
                    cmar.setChebMinTemp(chebMinTemp);
                } else throw new Error("More than one ChebMinTemp element.");
            }
            // ChebMaxConc.
            let chebMaxConc_xml = xml[0].getElementsByTagName((0, _controlJs.ChebMaxConc).tagName);
            if (chebMaxConc_xml.length > 0) {
                if (chebMaxConc_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebMaxConc_xml[0])));
                    let chebMaxConc = new (0, _controlJs.ChebMaxConc)((0, _xmlJs.getAttributes)(chebMaxConc_xml[0]), value);
                    cmar.setChebMaxConc(chebMaxConc);
                } else throw new Error("More than one ChebMaxConc element.");
            }
            // ChebMinConc.
            let chebMinConc_xml = xml[0].getElementsByTagName((0, _controlJs.ChebMinConc).tagName);
            if (chebMinConc_xml.length > 0) {
                if (chebMinConc_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebMinConc_xml[0])));
                    let chebMinConc = new (0, _controlJs.ChebMinConc)((0, _xmlJs.getAttributes)(chebMinConc_xml[0]), value);
                    cmar.setChebMinConc(chebMinConc);
                } else throw new Error("More than one ChebMinConc element.");
            }
            // ChebTExSize.
            let chebTExSize_xml = xml[0].getElementsByTagName((0, _controlJs.ChebTExSize).tagName);
            if (chebTExSize_xml.length > 0) {
                if (chebTExSize_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebTExSize_xml[0])));
                    let chebTExSize = new (0, _controlJs.ChebTExSize)((0, _xmlJs.getAttributes)(chebTExSize_xml[0]), value);
                    cmar.setChebTExSize(chebTExSize);
                } else throw new Error("More than one ChebTExSize element.");
            }
            // ChebPExSize.
            let chebPExSize_xml = xml[0].getElementsByTagName((0, _controlJs.ChebPExSize).tagName);
            if (chebPExSize_xml.length > 0) {
                if (chebPExSize_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(chebPExSize_xml[0])));
                    let chebPExSize = new (0, _controlJs.ChebPExSize)((0, _xmlJs.getAttributes)(chebPExSize_xml[0]), value);
                    cmar.setChebPExSize(chebPExSize);
                } else throw new Error("More than one ChebPExSize element.");
            }
            processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
        } else if (xsi_type == (0, _controlJs.CalcMethodThermodynamicTable).xsi_type || xsi_type == (0, _controlJs.CalcMethodThermodynamicTable).xsi_type2) {
            let cmtt = new (0, _controlJs.CalcMethodThermodynamicTable)(attributes);
            cm = cmtt;
            // Tmin.
            let tmin_xml = xml[0].getElementsByTagName((0, _controlJs.Tmin).tagName);
            if (tmin_xml.length > 0) {
                if (tmin_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(tmin_xml[0])));
                    let tmin = new (0, _controlJs.Tmin)((0, _xmlJs.getAttributes)(tmin_xml[0]), value);
                    cmtt.setTmin(tmin);
                } else throw new Error("More than one Tmin element.");
            }
            // Tmid.
            let tmid_xml = xml[0].getElementsByTagName((0, _controlJs.Tmid).tagName);
            if (tmid_xml.length > 0) {
                if (tmid_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(tmid_xml[0])));
                    let tmid = new (0, _controlJs.Tmid)((0, _xmlJs.getAttributes)(tmid_xml[0]), value);
                    cmtt.setTmid(tmid);
                } else throw new Error("More than one Tmid element.");
            }
            // Tmax.
            let tmax_xml = xml[0].getElementsByTagName((0, _controlJs.Tmax).tagName);
            if (tmax_xml.length > 0) {
                if (tmax_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(tmax_xml[0])));
                    let tmax = new (0, _controlJs.Tmax)((0, _xmlJs.getAttributes)(tmax_xml[0]), value);
                    cmtt.setTmax(tmax);
                } else throw new Error("More than one Tmax element.");
            }
            // Tstep.
            let tstep_xml = xml[0].getElementsByTagName((0, _controlJs.Tstep).tagName);
            if (tstep_xml.length > 0) {
                if (tstep_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(tstep_xml[0])));
                    let tstep = new (0, _controlJs.Tstep)((0, _xmlJs.getAttributes)(tstep_xml[0]), value);
                    cmtt.setTstep(tstep);
                } else throw new Error("More than one Tstep element.");
            }
            processCalcMethodThermodynamicTable(divCmDetails, cmtt);
        } else if (xsi_type == (0, _controlJs.CalcMethodSensitivityAnalysis).xsi_type || xsi_type == (0, _controlJs.CalcMethodSensitivityAnalysis).xsi_type2) {
            let cmsa = new (0, _controlJs.CalcMethodSensitivityAnalysis)(attributes);
            cm = cmsa;
            // SensitivityAnalysisSamples.
            let sas_xml = xml[0].getElementsByTagName((0, _controlJs.SensitivityAnalysisSamples).tagName);
            if (sas_xml.length > 0) {
                if (sas_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(sas_xml[0])));
                    let sensitivityAnalysisSamples = new (0, _controlJs.SensitivityAnalysisSamples)((0, _xmlJs.getAttributes)(sas_xml[0]), value);
                    cmsa.setSensitivityAnalysisSamples(sensitivityAnalysisSamples);
                } else throw new Error("More than one SensitivityAnalysisSamples element.");
            }
            // SensitivityAnalysisOrder.
            let sao_xml = xml[0].getElementsByTagName((0, _controlJs.SensitivityAnalysisOrder).tagName);
            if (sao_xml.length > 0) {
                if (sao_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(sao_xml[0])));
                    let sensitivityAnalysisOrder = new (0, _controlJs.SensitivityAnalysisOrder)((0, _xmlJs.getAttributes)(sao_xml[0]), value);
                    cmsa.setSensitivityAnalysisOrder(sensitivityAnalysisOrder);
                } else throw new Error("More than one SensitivityAnalysisOrder element.");
            }
            // SensitivityNumVarRedIters.
            let snvri_xml = xml[0].getElementsByTagName((0, _controlJs.SensitivityNumVarRedIters).tagName);
            if (snvri_xml.length > 0) {
                if (snvri_xml.length == 1) {
                    let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(snvri_xml[0])));
                    let sensitivityNumVarRedIters = new (0, _controlJs.SensitivityNumVarRedIters)((0, _xmlJs.getAttributes)(snvri_xml[0]), value);
                    cmsa.setSensitivityNumVarRedIters(sensitivityNumVarRedIters);
                } else throw new Error("More than one SensitivityNumVarRedIters element.");
            }
            // SensitivityVarRedMethod.
            let svrm_xml = xml[0].getElementsByTagName((0, _controlJs.SensitivityVarRedMethod).tagName);
            if (svrm_xml.length > 0) {
                if (svrm_xml.length == 1) {
                    let value = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(svrm_xml[0]));
                    let sensitivityVarRedMethod = new (0, _controlJs.SensitivityVarRedMethod)((0, _xmlJs.getAttributes)(svrm_xml[0]), value);
                    cmsa.setSensitivityVarRedMethod(sensitivityVarRedMethod);
                }
            }
            processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
        } else throw new Error("Unknown xsi:type: " + xsi_type);
        control.setCalcMethod(cm);
    // The select element should have 
    } else {
        button.classList.toggle("optionOn");
        button.textContent = buttonTextContentDeselected;
    }
    let first = true;
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) options.push(selectAnotherOption);
            // Remove any existing select.
            (0, _htmlJs.remove)(divCmDetailsSelectId);
            (0, _htmlJs.remove)(divCmDetailsId);
            // Create the select element.
            let select = createSelectElementCalcMethod(control, div, options, tagName, selectAnotherOption, divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle("optionOff");
            button.classList.toggle("optionOn");
        } else {
            control.removeCalcMethod();
            // Remove any existing div.
            (0, _htmlJs.remove)(divCmDetailsSelectId);
            (0, _htmlJs.remove)(divCmDetailsId);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle("optionOn");
            button.classList.toggle("optionOff");
        }
    });
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */ function processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fittingIterations = cm.getFittingIterations() || new (0, _controlJs.FittingIterations)(new Map(), NaN);
    cm.setFittingIterations(fittingIterations);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_FittingIterations_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            fittingIterations.value = parseInt(target.value);
            console.log("Set FittingIterations to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = fittingIterations.value.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, fittingIterations.value.toString(), (0, _controlJs.FittingIterations).tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */ function processCalcMethodMarquardt(divCmDetails, cm) {
    // MarquardtIterations.
    let marquardtIterations = cm.getMarquardtIterations() || new (0, _controlJs.MarquardtIterations)(new Map(), NaN);
    cm.setMarquardtIterations(marquardtIterations);
    createLabelWithInputForObject(marquardtIterations, divCmDetails, boundary1, level0);
    // MarquardtTolerance.
    let marquardtTolerance = cm.getMarquardtTolerance() || new (0, _controlJs.MarquardtTolerance)(new Map(), NaN);
    cm.setMarquardtTolerance(marquardtTolerance);
    createLabelWithInputForObject(marquardtTolerance, divCmDetails, boundary1, level0);
    // MarquardtDerivDelta.
    let marquardtDerivDelta = cm.getMarquardtDerivDelta() || new (0, _controlJs.MarquardtDerivDelta)(new Map(), NaN);
    cm.setMarquardtDerivDelta(marquardtDerivDelta);
    createLabelWithInputForObject(marquardtDerivDelta, divCmDetails, boundary1, level0);
}
/**
 * @param obj The object.
 * @param divCmDetails The details div.
 * @param boundary The boundary to go around the HTMLLabelElement and HTMLInputElement.
 * @param level The level to go around the HTMLLabelElement and HTMLInputElement.
 */ function createLabelWithInputForObject(obj, divCmDetails, boundary, level) {
    let id = addId(divCmDetails.id, obj.tagName, "Input");
    let value = obj.value.toString();
    let labelTextContent = obj.tagName;
    let inputHandler = (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            obj.value = parseFloat(target.value);
            console.log("Set " + obj.tagName + " to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = obj.value.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    };
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", id, boundary, level, inputHandler, value, labelTextContent));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */ function processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new (0, _controlJs.Format)(new Map(), (0, _controlJs.Format).options[0]);
    // Format value.
    cm.setFormat(format);
    let lwsFormat = (0, _htmlJs.createLabelWithSelect)((0, _controlJs.Format).tagName, (0, _controlJs.Format).options, (0, _controlJs.Format).tagName, format.value, divCmDetails.id, boundary1, boundary1);
    lwsFormat.querySelector("select")?.addEventListener("change", (event)=>{
        let target = event.target;
        format.value = target.value;
        console.log("Set Format to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    divCmDetails.appendChild(lwsFormat);
    // Format rateUnits.
    let value = (0, _controlJs.Format).rateUnitsOptions[0];
    format.setRateUnits(value);
    let lwsFormatRateUnits = (0, _htmlJs.createLabelWithSelect)((0, _controlJs.Format).rateUnits, (0, _controlJs.Format).rateUnitsOptions, (0, _controlJs.Format).rateUnits, value, divCmDetails.id, boundary1, boundary1);
    lwsFormatRateUnits.querySelector("select")?.addEventListener("change", (event)=>{
        let target = event.target;
        format.setRateUnits(target.value);
        console.log("Set Format rateUnits to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    divCmDetails.appendChild(lwsFormatRateUnits);
    // "me:precision".
    let precision = cm.getPrecision() || new (0, _controlJs.Precision)(new Map(), (0, _mesmerJs.Mesmer).precisionOptions[0]);
    cm.setPrecision(precision);
    let lwsPrecision = (0, _htmlJs.createLabelWithSelect)((0, _controlJs.Precision).tagName, (0, _mesmerJs.Mesmer).precisionOptions, (0, _controlJs.Precision).tagName, precision.value, divCmDetails.id, boundary1, boundary1);
    lwsPrecision.querySelector("select")?.addEventListener("change", (event)=>{
        let target = event.target;
        precision.value = target.value;
        console.log("Set Precision to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    divCmDetails.appendChild(lwsPrecision);
    // "me:chebNumTemp".
    let chebNumTemp = cm.getChebNumTemp() || new (0, _controlJs.ChebNumTemp)(new Map(), NaN);
    cm.setChebNumTemp(chebNumTemp);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebNumTemp_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebNumTemp.value = parseFloat(target.value);
            console.log("Set ChebNumTemp to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebNumTemp.value.toString(), (0, _controlJs.ChebNumTemp).tagName));
    // "me:chebNumConc".
    let chebNumConc = cm.getChebNumConc() || new (0, _controlJs.ChebNumConc)(new Map(), NaN);
    cm.setChebNumConc(chebNumConc);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebNumConc_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebNumConc.value = parseFloat(target.value);
            console.log("Set ChebNumConc to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebNumConc.value.toString(), (0, _controlJs.ChebNumConc).tagName));
    // "me:chebMaxTemp".
    let chebMaxTemp = cm.getChebMaxTemp() || new (0, _controlJs.ChebMaxTemp)(new Map(), NaN);
    cm.setChebMaxTemp(chebMaxTemp);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebMaxTemp_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebMaxTemp.value = parseFloat(target.value);
            console.log("Set ChebMaxTemp to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebMaxTemp.value.toString(), (0, _controlJs.ChebMaxTemp).tagName));
    // "me:chebMinTemp".
    let chebMinTemp = cm.getChebMinTemp() || new (0, _controlJs.ChebMinTemp)(new Map(), NaN);
    cm.setChebMinTemp(chebMinTemp);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebMinTemp_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebMinTemp.value = parseFloat(target.value);
            console.log("Set ChebMinTemp to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebMinTemp.value.toString(), (0, _controlJs.ChebMinTemp).tagName));
    // "me:chebMaxConc".
    let chebMaxConc = cm.getChebMaxConc() || new (0, _controlJs.ChebMaxConc)(new Map(), NaN);
    cm.setChebMaxConc(chebMaxConc);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebMaxConc_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebMaxConc.value = parseFloat(target.value);
            console.log("Set ChebMaxConc to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebMaxConc.value.toString(), (0, _controlJs.ChebMaxConc).tagName));
    // "me:chebMinConc".
    let chebMinConc = cm.getChebMinConc() || new (0, _controlJs.ChebMinConc)(new Map(), NaN);
    cm.setChebMinConc(chebMinConc);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebMinConc_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebMinConc.value = parseFloat(target.value);
            console.log("Set ChebMinConc to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebMinConc.value.toString(), (0, _controlJs.ChebMinConc).tagName));
    // "me:chebTExSize".
    let chebTExSize = cm.getChebTExSize() || new (0, _controlJs.ChebTExSize)(new Map(), NaN);
    cm.setChebTExSize(chebTExSize);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebTExSize_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebTExSize.value = parseFloat(target.value);
            console.log("Set ChebTExSize to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebTExSize.value.toString(), (0, _controlJs.ChebTExSize).tagName));
    // "me:chebPExSize".
    let chebPExSize = cm.getChebPExSize() || new (0, _controlJs.ChebPExSize)(new Map(), NaN);
    cm.setChebPExSize(chebPExSize);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_ChebPExSize_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            chebPExSize.value = parseFloat(target.value);
            console.log("Set ChebPExSize to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, chebPExSize.value.toString(), (0, _controlJs.ChebPExSize).tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */ function processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin".
    let tmin = cm.getTmin() || new (0, _controlJs.Tmin)(new Map(), NaN);
    cm.setTmin(tmin);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_Tmin_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tmin.value = parseFloat(target.value);
            console.log("Set Tmin to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tmin.value.toString(), (0, _controlJs.Tmin).tagName));
    // "me:Tmid".
    let tmid = cm.getTmid() || new (0, _controlJs.Tmid)(new Map(), NaN);
    cm.setTmid(tmid);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_Tmid_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tmid.value = parseFloat(target.value);
            console.log("Set Tmid to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tmid.value.toString(), (0, _controlJs.Tmid).tagName));
    // "me:Tmax".
    let tmax = cm.getTmax() || new (0, _controlJs.Tmax)(new Map(), NaN);
    cm.setTmax(tmax);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_Tmax_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tmax.value = parseFloat(target.value);
            console.log("Set Tmax to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tmax.value.toString(), (0, _controlJs.Tmax).tagName));
    // "me:Tstep".
    let tstep = cm.getTstep() || new (0, _controlJs.Tstep)(new Map(), NaN);
    cm.setTstep(tstep);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_Tstep_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            tstep.value = parseFloat(target.value);
            console.log("Set Tstep to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, tstep.value.toString(), (0, _controlJs.Tstep).tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */ function processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples".
    let sensitivityAnalysisSamples = cm.getSensitivityAnalysisSamples() || new (0, _controlJs.SensitivityAnalysisSamples)(new Map(), NaN);
    cm.setSensitivityAnalysisSamples(sensitivityAnalysisSamples);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_SensitivityAnalysisSamples_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            sensitivityAnalysisSamples.value = parseFloat(target.value);
            console.log("Set SensitivityAnalysisSamples to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, sensitivityAnalysisSamples.value.toString(), (0, _controlJs.SensitivityAnalysisSamples).tagName));
    // "me:sensitivityAnalysisOrder".
    let sensitivityAnalysisOrder = cm.getSensitivityAnalysisOrder() || new (0, _controlJs.SensitivityAnalysisOrder)(new Map(), NaN);
    cm.setSensitivityAnalysisOrder(sensitivityAnalysisOrder);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_SensitivityAnalysisOrder_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            sensitivityAnalysisOrder.value = parseFloat(target.value);
            console.log("Set SensitivityAnalysisOrder to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, sensitivityAnalysisOrder.value.toString(), (0, _controlJs.SensitivityAnalysisOrder).tagName));
    // "me:sensitivityNumVarRedIters".
    let sensitivityNumVarRedIters = cm.getSensitivityNumVarRedIters() || new (0, _controlJs.SensitivityNumVarRedIters)(new Map(), NaN);
    cm.setSensitivityNumVarRedIters(sensitivityNumVarRedIters);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithInput)("number", divCmDetails.id + "_SensitivityNumVarRedIters_input", boundary1, level0, (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _utilJs.isNumeric)(target.value)) {
            sensitivityNumVarRedIters.value = parseFloat(target.value);
            console.log("Set SensitivityNumVarRedIters to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = NaN.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    }, sensitivityNumVarRedIters.value.toString(), (0, _controlJs.SensitivityNumVarRedIters).tagName));
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new (0, _controlJs.SensitivityVarRedMethod)(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    divCmDetails.appendChild((0, _htmlJs.createLabelWithSelect)((0, _controlJs.SensitivityVarRedMethod).tagName, (0, _controlJs.SensitivityVarRedMethod).options, (0, _controlJs.SensitivityVarRedMethod).tagName, (0, _controlJs.SensitivityVarRedMethod).options[0], divCmDetails.id, boundary1, boundary1));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector("select");
    select?.addEventListener("change", (event)=>{
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log("Set SensitivityVarRedMethod to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
}
/**
 * @param options The options.
 * @param select The select element.
 */ function selectAnotherOptionEventListener(options, select) {
    select.addEventListener("click", (event)=>{
        if (options[options.length - 1] == selectAnotherOption) options.pop();
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == selectAnotherOption) select.remove(lastIndex);
    });
}
/**
 * @param control The control.
 * @param div The div. 
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param id The id for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */ function createSelectElementCalcMethod(control, div, options, tagName, value, divCmDetailsId, divCmDetailsSelectId) {
    let select = (0, _htmlJs.createSelectElement)(options, tagName, value, divCmDetailsSelectId, boundary1);
    div.appendChild(select);
    selectAnotherOptionEventListener(options, select);
    select.addEventListener("change", (event)=>{
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) divCmDetails.remove();
        divCmDetails = (0, _htmlJs.createFlexDiv)(undefined, boundary1);
        divCmDetails.id = divCmDetails.id;
        div.appendChild(divCmDetails);
        let target = event.target;
        let value = target.value;
        let attributes = new Map();
        attributes.set("xsi:type", value);
        if (value == (0, _controlJs.CalcMethodSimpleCalc).xsi_type || value == (0, _controlJs.CalcMethodSimpleCalc).xsi_type2) // "me:simpleCalc", "simpleCalc".
        control.setCalcMethod(new (0, _controlJs.CalcMethodSimpleCalc)(attributes));
        else if (value == (0, _controlJs.CalcMethodGridSearch).xsi_type || value == (0, _controlJs.CalcMethodGridSearch).xsi_type2) // "me:gridSearch", "gridSearch".
        control.setCalcMethod(new (0, _controlJs.CalcMethodGridSearch)(attributes));
        else if (value == (0, _controlJs.CalcMethodFitting).xsi_type || value == (0, _controlJs.CalcMethodFitting).xsi_type2) {
            let cm = new (0, _controlJs.CalcMethodFitting)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodFitting(divCmDetails, cm);
        } else if (value == (0, _controlJs.CalcMethodMarquardt).xsi_type || value == (0, _controlJs.CalcMethodMarquardt).xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm = new (0, _controlJs.CalcMethodMarquardt)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(divCmDetails, cm);
        } else if (value == (0, _controlJs.CalcMethodAnalyticalRepresentation).xsi_type || value == (0, _controlJs.CalcMethodAnalyticalRepresentation).xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm = new (0, _controlJs.CalcMethodAnalyticalRepresentation)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        } else if (value == (0, _controlJs.CalcMethodThermodynamicTable).xsi_type || value == (0, _controlJs.CalcMethodThermodynamicTable).xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm = new (0, _controlJs.CalcMethodThermodynamicTable)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(divCmDetails, cm);
        } else if (value == (0, _controlJs.CalcMethodSensitivityAnalysis).xsi_type || value == (0, _controlJs.CalcMethodSensitivityAnalysis).xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm = new (0, _controlJs.CalcMethodSensitivityAnalysis)(new Map());
            control.setCalcMethod(cm);
            processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        } else throw new Error("Unknown CalcMethod type.");
        (0, _htmlJs.resizeSelectElement)(target);
    });
    return select;
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
    if (canvas != null) {
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
        } else {
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
            let energyRescaled = (0, _utilJs.rescale)(energyMin, energyRange, 0, rdCanvasHeight, energy);
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
        let canvasHeightWithBorder = rdCanvasHeight + 4 * th + 2 * lw;
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdCanvasHeight;
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
                (0, _canvasJs.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, _utilJs.get)(transitionStatesOutXY, transitionStateLabel);
                (0, _canvasJs.drawLine)(ctx, foreground, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            });
            else (0, _canvasJs.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
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
}
/**
 * Save to XML file.
 */ function saveXML() {
    if (mesmer == null) {
        alert("No Mesmer object to save.");
        return;
    } else {
        console.log("saveXML");
        const pad = "  ";
        // Create a Blob object from the data
        let blob = new Blob([
            (0, _mesmerJs.Mesmer).header,
            mesmer.toXML(pad, "")
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
}

},{"./util.js":"f0Rnl","./xml.js":"7znDa","./molecule.js":"ahQNx","./reaction.js":"8grVN","./html.js":"aLPSL","./canvas.js":"hoJRr","./conditions.js":"aksKl","./modelParameters.js":"kQHfz","./control.js":"Qx5gu","./mesmer.js":"kMp4Q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0Rnl":[function(require,module,exports) {
/**
 * Get the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "get", ()=>get);
/**
 * For getting a valid HTML id. HTML id attribute values must contain at least one character and must not 
 * contain any space characters. They also cannot start with a digit, two hyphens, or a hyphen followed by
 * a digit.
 * @param parts The parts of the ID.
 * @return A string ID composed of the parts joined by the delimiter.
 */ parcelHelpers.export(exports, "getID", ()=>getID);
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
function getID(...parts) {
    let id = parts.join("-");
    // Replace any character that is not a letter (upper or lower case), a digit, a hyphen, or an underscore 
    // with an underscore. 
    let validId = id.replace(/[^a-zA-Z-_0-9]/g, "_");
    // If the first character is a digit, two hyphens, or a hyphen followed by a digit, add an underscore to 
    // the beginning of the ID.
    if (/^[0-9]|^--|-^[0-9]/.test(validId)) validId = "_" + validId;
    return validId;
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
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 * @param ids The set of ids to remove the id from.
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
 * @param level The level to go around the HTMLLabelElement and HTMLInputElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelTextContent The label text.
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
 * @param name The name for the select.
 * @param id id + "_" + name will be the select element ID.
 * @param margin The margin for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */ parcelHelpers.export(exports, "createSelectElement", ()=>createSelectElement);
/**
 * Create and return an HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 * 
 * @param textContent The text content of the label.
 * @param options The options for the HTMLSelectElement.
 * @param name The name for the HTMLSelectElement.
 * @param value The value for the HTMLSelectElement.
 * @param id The id for the select.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns A HTMLDivElement containing a HTMLLabelElement and HTMLSelectElement.
 */ parcelHelpers.export(exports, "createLabelWithSelect", ()=>createLabelWithSelect);
/**
 * Create and return an HTMLButtonElement.
 * 
 * @param textContent The text content of the HTMLButtonElement.
 * @param id The id of the button.
 * @param margin The margin to go around the HTMLButtonElement.
 * @returns An HTMLButtonElement with the textContent and specified margin.
 */ parcelHelpers.export(exports, "createButton", ()=>createButton);
/**
 * Create and return an HTMLDivElement containing an HTMLLabelElement and a HTMLButtonElement.
 * @param labeltext The text content of the label.
 * @param textContent The text content of the button.
 * @param id The id of the button.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLButtonElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @returns An HTMLDivElement with the level margin containing an HTMLLabelElement and a HTMLButtonElement.
 */ parcelHelpers.export(exports, "createLabelWithButton", ()=>createLabelWithButton);
/**
 * Create and return HTMLDivElement.
 * @param id The id of the HTMLDivElement.
 * @param margin The margin for the HTMLDivElement.
 * @returns An HTMLDivElement with a 'flex' display style and specified boundary.
 */ parcelHelpers.export(exports, "createDiv", ()=>createDiv);
/**
 * Create and return HTMLDivElement style.display = 'flex' and style.flexWrap = 'wrap'.
 *
 * @param id The id of the HTMLDivElement.
 * @param margin The margin for the HTMLDivElement.
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
function remove(id, ids) {
    let e = document.getElementById(id);
    if (e != null) e.remove();
    if (ids != undefined) ids.delete(id);
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
    let contentDiv = createDiv(undefined, boundary);
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
function createLabelWithInput(type, id, boundary, level, func, value, labelTextContent, inputFontsize) {
    let input = createInputWithFunction(type, id, boundary, func, value, inputFontsize);
    Object.assign(input.style, boundary);
    let label = createLabel(labelTextContent, boundary);
    label.htmlFor = id;
    Object.assign(label.style, boundary);
    let div = createFlexDiv(undefined, level);
    div.appendChild(label);
    div.appendChild(input);
    return div;
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
function createSelectElement(options, name, value, id, margin) {
    let select = document.createElement("select");
    options.forEach((option)=>{
        select.name = name;
        select.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
    select.value = value;
    select.style.fontSize = "1em"; // Set the font size with a relative unit.
    select.classList.add("auto-width");
    resizeSelectElement(select);
    Object.assign(select.style, margin);
    return select;
}
function createLabelWithSelect(textContent, options, name, value, id, componentMargin, divMargin) {
    let div = createDiv(undefined, divMargin);
    let label = createLabel(textContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(createSelectElement(options, name, value, id, componentMargin));
    return div;
}
function createButton(textContent, id, boundary) {
    let button = document.createElement("button");
    button.textContent = textContent;
    if (id != undefined) button.id = id;
    if (boundary != undefined) Object.assign(button.style, boundary);
    button.style.fontSize = "1em"; // Set the font size with a relative unit.
    return button;
}
function createLabelWithButton(labeltext, textContent, id, componentMargin, divMargin) {
    let div = createFlexDiv(undefined, divMargin);
    let label = createLabel(labeltext, componentMargin);
    label.htmlFor = id;
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild(createButton(textContent, id, componentMargin));
    return div;
}
function createDiv(id, margin) {
    let div = document.createElement("div");
    if (id != undefined) div.id = id;
    if (margin != undefined) Object.assign(div.style, margin);
    return div;
}
function createFlexDiv(id, margin) {
    let div = createDiv(id, margin);
    div.style.display = "flex";
    div.style.flexWrap = "wrap";
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
 * There are no attributes.
 * In the XML, an "atomArray" node is a child of a "molecule" parent node and has "atom" node children.
 */ parcelHelpers.export(exports, "AtomArray", ()=>AtomArray);
/**
 * An atomic bond between two atoms in a molecule.
 * Instances must have the following attributes:
 * "atomRefs2" - a space separated list of two atom ids.
 * The attributes may include:
 * "id" - a unique identifier for the bond.
 * "order" - the order of the bond. Generally: order = (the number of bonding electrons) - ((the number of non-bonding electrons) / 2).
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
 * The attributes may contain:
 * "rows"
 * "matrixType" with known values [quareSymmetricLT].
 * "units" with known values [Hartree/Bohr2].
 * In the XML, an "array" node is a child of a "property" node.
 */ parcelHelpers.export(exports, "PropertyMatrix", ()=>PropertyMatrix);
/**
 * The attributes must contain "dictRef" which is a dictionary reference for a type of property.
 * In the XML, a "property" node has a "propertyList" parent and either a "scalar" or "array" or another type of child not yet implemented (there could be a "matrix" type).
 */ parcelHelpers.export(exports, "Property", ()=>Property);
/**
 * The Zero Potential Energy.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
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
 * The child "array" node should have a "units" attribute with options ["cm-1", "GHz", "amuA^2"]
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
 * The attributes are expected to include either "xsi:type" or "name" - expected values include ["ClassicalRotors", 
 * "QMRotors", "me:ClassicalRotors", "me:QMRotors"].
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
 * The attributes must include "format" (with a value from ["numerical", "analytical"]) and "units" (Mesmer.energyUnits).
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
    static{
        /**
     * The key for the id attribute.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the elementType attribute.
     */ this.s_elementType = "elementType";
    }
    static{
        /**
     * The key for the x3 attribute.
     */ this.s_x3 = "x3";
    }
    static{
        /**
     * The key for the y3 attribute.
     */ this.s_y3 = "y3";
    }
    static{
        /**
     * The key for the z3 attribute.
     */ this.s_z3 = "z3";
    }
    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     */ constructor(attributes){
        super(attributes, Atom.tagName);
        let elementType = attributes.get(Atom.s_elementType);
        if (elementType == undefined) throw new Error(Atom.s_elementType + " is undefined");
    }
    /**
     * @returns True if the atom has coordinates.
     */ hasCoordinates() {
        if (this.attributes.get(Atom.s_x3) != undefined && this.attributes.get(Atom.s_y3) != undefined && this.attributes.get(Atom.s_z3) != undefined) return true;
        return false;
    }
    /**
     * @returns The id.
     */ getId() {
        return this.attributes.get(Atom.s_id);
    }
    /**
     * @param id The id.
     */ setId(id) {
        this.attributes.set(Atom.s_id, id);
    }
    /**
     * @returns The element type.
     */ getElementType() {
        return this.attributes.get(Atom.s_elementType);
    }
    /**
     * @param elementType The element type.
     */ setElementType(elementType) {
        this.attributes.set(Atom.s_elementType, elementType);
    }
    /**
     * @returns The x3 attribute value as a number or undefined.
     */ getX3() {
        let x3 = this.attributes.get(Atom.s_x3);
        if (x3 != undefined) return parseFloat(x3);
    }
    /**
     * @param x3 The x3 attribute value.
     */ setX3(x3) {
        this.attributes.set(Atom.s_x3, x3.toString());
    }
    /**
     * Removes the x3 attribute.
     */ removeX3() {
        this.attributes.delete(Atom.s_x3);
    }
    /**
     * @returns The y3 attribute value as a number or undefined.
     */ getY3() {
        let y3 = this.attributes.get(Atom.s_y3);
        if (y3 != undefined) return parseFloat(y3);
    }
    /**
     * @param y3 The y3 attribute value.
     */ setY3(y3) {
        this.attributes.set(Atom.s_y3, y3.toString());
    }
    /**
     * Removes the y3 attribute.
     */ removeY3() {
        this.attributes.delete(Atom.s_y3);
    }
    /**
     * @returns The z3 attribute value as a number or undefined.
     */ getZ3() {
        let z3 = this.attributes.get(Atom.s_z3);
        if (z3 != undefined) return parseFloat(z3);
    }
    /**
     * @param z3 The z3 attribute value.
     */ setZ3(z3) {
        this.attributes.set("z3", z3.toString());
    }
    /**
     * Removes the x3 attribute.
     */ removeZ3() {
        this.attributes.delete("z3");
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
        this.index = new Map();
        this.reverseIndex = new Map();
        if (atoms == undefined) this.atoms = new Map();
        else {
            this.atoms = atoms;
            atoms.forEach((atom, id)=>{
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, atom);
            });
        }
    }
    /**
     * @param id The id of the atom to get.
     * @returns The atom with the given id.
     */ getAtom(id) {
        return this.atoms.get(id);
    }
    /**
     * @param atom The atom to add.
     * @returns The id of the atom.
     */ addAtom(atom) {
        //console.log('Adding atom...');
        let id = atom.getId();
        if (id == undefined) {
            id = this.getNextAtomID();
            atom.setId(id);
        } else if (this.atoms.has(id)) {
            let newID = this.getNextAtomID();
            console.warn("Atom with id " + id + " already exists, adding with id " + newID);
            atom.setId(newID);
            id = newID;
        }
        //console.log('Atom id: ' + id);
        this.index.set(id, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, id);
        this.nodes.set(this.nodes.size, atom);
        this.atoms.set(id, atom);
        /*
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.reverseIndex.keys() ' + Array.from(this.reverseIndex.keys()));
        console.log('this.reverseIndex.values() ' + Array.from(this.reverseIndex.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ return id;
    }
    /**
     * @returns The atomId.
     */ getNextAtomID() {
        let i = 1;
        let id = "a" + i.toString();
        while(this.atoms.has(id)){
            i++;
            id = "a" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeAtom(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error("Atom with id " + id + " does not exist!");
        console.log("Removing atom with id " + id);
        this.atoms.delete(id);
        //this.index.delete(id);
        //this.nodes.delete(i);
        this.deleteNodeAndReindex(i, id);
    /*
        console.log('i ' + i);
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ }
    /**
     * @param i The index of the atom to remove.
     * @param id The id of the atom to remove.
     */ deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key)=>{
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            } else {
                newNodes.set(value, this.nodes.get(value));
                newIndex.set(key, value);
                newReverseIndex.set(value, key);
            }
        });
        this.nodes = newNodes;
        this.index = newIndex;
        this.reverseIndex = newReverseIndex;
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
     * @returns The id.
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
     * @param bonds The bonds.
     */ constructor(attributes, bonds){
        super(attributes, BondArray.tagName);
        this.index = new Map();
        this.reverseIndex = new Map();
        if (bonds == undefined) this.bonds = new Map();
        else {
            this.bonds = bonds;
            bonds.forEach((bond, id)=>{
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, bond);
            });
        }
    }
    /**
     * @returns The bond ids.
     */ getBondIds() {
        return Array.from(this.bonds.keys());
    }
    /**
     * @param id The id of the bond to get.
     * @returns The bond with the given id.
     */ getBond(id) {
        return this.bonds.get(id);
    }
    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     */ addBond(bond) {
        //console.log('Add ' + bond.tagName + '...');
        let id = bond.getId();
        if (id == undefined) {
            id = this.getNextBondID();
            bond.setId(id);
        } else if (this.bonds.has(id)) {
            let newID = this.getNextBondID();
            console.log("Bond with id " + id + " already exists, adding with id " + newID);
            bond.setId(newID);
            id = newID;
        }
        //console.log('Bond id: ' + id);
        this.index.set(id, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, id);
        this.nodes.set(this.nodes.size, bond);
        this.bonds.set(id, bond);
        /*
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.reverseIndex.keys() ' + Array.from(this.reverseIndex.keys()));
        console.log('this.reverseIndex.values() ' + Array.from(this.reverseIndex.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ return id;
    }
    /**
     * @returns The atomId.
     */ getNextBondID() {
        let i = 1;
        let id = "b" + i.toString();
        while(this.bonds.has(id)){
            i++;
            id = "b" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeBond(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error("Bond with id " + id + " does not exist!");
        console.log("Removing bond with id " + id);
        this.bonds.delete(id);
        //this.index.delete(id);
        //this.nodes.delete(i);
        this.deleteNodeAndReindex(i, id);
    /*
        console.log('i ' + i);
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ }
    /**
     * @param i The index of the bond to remove.
     * @param id The id of the bond to remove.
     */ deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key)=>{
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            } else {
                newNodes.set(value, this.nodes.get(value));
                newIndex.set(key, value);
                newReverseIndex.set(value, key);
            }
        });
        this.nodes = newNodes;
        this.index = newIndex;
        this.reverseIndex = newReverseIndex;
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
class PropertyMatrix extends (0, _xmlJs.NumberArrayNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "matrix";
    }
    static{
        /**
     * The key for the rows attribute.
     */ this.s_rows = "rows";
    }
    static{
        /**
     * The key for the matrixType attribute.
     */ this.s_matrixType = "matrixType";
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
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
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
     * The units.
     */ this.unitOptions = [
            "cm-1",
            "GHz",
            "amuA^2"
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
     * The options for the "xsi:type" or "name" attribute value.
     */ this.xsi_typeOptions = [
            "ClassicalRotors",
            "QMRotors",
            "me:ClassicalRotors",
            "me:QMRotors"
        ];
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
     */ this.formats = new Set([
            "numerical",
            "analytical"
        ]);
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
        if (useSineTerms == undefined) this.useSineTerms = false;
        else this.useSineTerms = true;
    //this.useSineTerms = (useSineTerms == "yes");
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
     * Should be one of Mesmer.energyUnits.
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
     * @param attributes The attributes. This will also include an "id".
     * Additional attributes may include: "description" and "active" (and possibly others), but these do not exist for all molecules.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethod The extra method for calculating density of states.
     * @param reservoirSize The reservoir size.
     */ constructor(attributes, id, atoms, bonds, properties, energyTransferModel, dOSCMethod, extraDOSCMethod, reservoirSize){
        super(attributes, Molecule.tagName);
        this.index = new Map();
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
     * @param atomId The id of the atom.
     * @returns The atom for the given atomId.
     */ getAtom(atomId) {
        return this.getAtoms().getAtom(atomId);
    }
    /**
     * @returns The atoms of the molecule.
     */ getAtoms() {
        let i = this.index.get(AtomArray.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param atoms The atoms.
     */ setAtoms(atoms) {
        this.index.set(AtomArray.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, atoms);
    }
    /**
     * @param bondId The id of the bond.
     * @returns The bond for the given bondId.
     */ getBond(bondId) {
        return this.getBonds().getBond(bondId);
    }
    /**
     * @returns The bonds of the molecule.
     */ getBonds() {
        let i = this.index.get(BondArray.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param bonds The bonds.
     */ setBonds(bonds) {
        this.index.set(BondArray.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, bonds);
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
    static{
        /**
     * The role options.
     */ this.roleOptions = [
            "deficientReactant",
            "excessReactant",
            "modelled"
        ];
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
    static{
        /**
     * The role options.
     */ this.roleOptions = [
            "modelled",
            "sink"
        ];
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
     * The options.
     */ this.options = [
            "Eckart",
            "WKB"
        ];
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
 * A class for "me:experimentalRate".
 * The attributes must include:
 * "ref1" string
 * "ref2" string
 * "refReaction" string
 * "error".
 */ parcelHelpers.export(exports, "ExperimentalRate", ()=>ExperimentalRate);
/**
 * A class for "me:experimentalYield".
 * The attributes must include:
 * "ref" string
 * "error" number
 * "yieldTime" number.
 */ parcelHelpers.export(exports, "ExperimentalYield", ()=>ExperimentalYield);
/**
 * A class for "me:experimentalEigenvalue".
 * The attributes must include:
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
class ExperimentalRate extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentalRate";
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
        super(attributes, ExperimentalRate.tagName, value);
        if (!this.attributes.has(ExperimentalRate.s_ref1)) console.error("ExperimentalRate.constructor: ref1 attribute is missing.");
        if (!this.attributes.has(ExperimentalRate.s_ref2)) console.error("ExperimentalRate.constructor: ref2 attribute is missing.");
        if (!this.attributes.has(ExperimentalRate.s_refReaction)) console.error("ExperimentalRate.constructor: refReaction attribute is missing.");
        if (!this.attributes.has(ExperimentalRate.s_error)) console.error("ExperimentalRate.constructor: error attribute is missing.");
    }
    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */ getRef1() {
        return this.attributes.get(ExperimentalRate.s_ref1);
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */ setRef1(ref1) {
        this.attributes.set(ExperimentalRate.s_ref1, ref1);
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */ getRef2() {
        return this.attributes.get(ExperimentalRate.s_ref2);
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */ setRef2(ref2) {
        this.attributes.set(ExperimentalRate.s_ref2, ref2);
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */ getRefReaction() {
        return this.attributes.get(ExperimentalRate.s_refReaction);
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */ setRefReaction(refReaction) {
        this.attributes.set(ExperimentalRate.s_refReaction, refReaction);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        return parseFloat(this.attributes.get(ExperimentalRate.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set(ExperimentalRate.s_error, error.toString());
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
        return parseFloat(this.attributes.get(ExperimentalYield.s_error));
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
        return parseFloat(this.attributes.get(ExperimentalYield.s_yieldTime));
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
        if (!this.attributes.has(ExperimentalEigenvalue.s_EigenvalueID)) console.error("ExperimentalEigenvalue.constructor: EigenvalueID attribute is missing.");
        if (!this.attributes.has(ExperimentalEigenvalue.s_error)) console.error("ExperimentalEigenvalue.constructor: error attribute is missing.");
    }
    /**
     * @returns The EigenvalueID attribute.
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
        return parseFloat(this.attributes.get(ExperimentalEigenvalue.s_error));
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
     */ constructor(attributes, bathGas, experimentRate, experimentalYield, experimentalEigenvalue){
        super(attributes, PTpair.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set(ExperimentalRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (experimentalYield != undefined) {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
        if (experimentalEigenvalue != undefined) {
            this.index.set(ExperimentalEigenvalue.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        //if (this !== undefined) {
        let p = this.attributes.get(PTpair.s_P);
        if (p !== undefined) return parseFloat(p);
        //}
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
        //if (this !== undefined) {
        let t = this.attributes.get(PTpair.s_T);
        if (t !== undefined) return parseFloat(t);
        //}
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
     */ getExperimentalRate() {
        let i = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentalRate(experimentRate) {
        let i = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) this.nodes.set(i, experimentRate);
        else {
            this.index.set(ExperimentalRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * Remove the experiment rate.
     */ removeExperimentalRate() {
        let i = this.index.get(ExperimentalRate.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalRate.tagName);
        }
    }
    /**
     * @returns The experimental yield.
     */ getExperimentalYield() {
        let i = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentalYield The experimental yield.
     */ setExperimentalYield(experimentalYield) {
        let i = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) this.nodes.set(i, experimentalYield);
        else {
            this.index.set(ExperimentalYield.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
    }
    /**
     * Remove the experimental yield.
     */ removeExperimentalYield() {
        let i = this.index.get(ExperimentalYield.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalYield.tagName);
        }
    }
    /**
     * @returns The experimental eigenvalue.
     */ getExperimentalEigenvalue() {
        let i = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentalEigenvalue The experimental eigenvalue.
     */ setExperimentalEigenvalue(experimentalEigenvalue) {
        let i = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) this.nodes.set(i, experimentalEigenvalue);
        else {
            this.index.set(ExperimentalEigenvalue.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * Remove the experimental eigenvalue.
     */ removeExperimentalEigenvalue() {
        let i = this.index.get(ExperimentalEigenvalue.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ExperimentalEigenvalue.tagName);
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
     * Remove the PT at the given index.
     * @param i The index.
     */ removePTpair(i) {
        this.nodes.delete(i);
        this.pTpairs.splice(i, 1);
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
     * Remove all PT pairs.
     */ removePTpairs() {
        this.nodes.clear();
        this.pTpairs = [];
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
 * Expected to have an attribute "xsi_type" with one of the following values:
 * "simpleCalc", "gridSearch", "fitting", "marquardt", "analyticalRepresentation", "ThermodynamicTable", "sensitivityAnalysis",
 * "me:simpleCalc", "me:gridSearch", "me:fitting", "me:marquardt", "me:analyticalRepresentation", "me:ThermodynamicTable", "me:sensitivityAnalysis".
 */ parcelHelpers.export(exports, "CalcMethod", ()=>CalcMethod);
/**
 * A class for "me:SimpleCalc" CalcMethod.
 */ parcelHelpers.export(exports, "CalcMethodSimpleCalc", ()=>CalcMethodSimpleCalc);
/**
 * A class for "me:GridSearch" CalcMethod.
 */ parcelHelpers.export(exports, "CalcMethodGridSearch", ()=>CalcMethodGridSearch);
/**
 * A class for "me:fittingIterations".
 */ parcelHelpers.export(exports, "FittingIterations", ()=>FittingIterations);
/**
 * A class for "me:Fitting" CalcMethod.
 * Nodes:
 * "me:fittingIterations"
 */ parcelHelpers.export(exports, "CalcMethodFitting", ()=>CalcMethodFitting);
/**
 * A class for "me:MarquardtIterations".
 */ parcelHelpers.export(exports, "MarquardtIterations", ()=>MarquardtIterations);
/**
 * A class for "me:MarquardtTolerance".
 */ parcelHelpers.export(exports, "MarquardtTolerance", ()=>MarquardtTolerance);
/**
 * A class for "me:MarquardtDerivDelta".
 */ parcelHelpers.export(exports, "MarquardtDerivDelta", ()=>MarquardtDerivDelta);
parcelHelpers.export(exports, "CalcMethodMarquardt", ()=>CalcMethodMarquardt);
/**
 * A class for "me:useTraceWeighting".
 */ parcelHelpers.export(exports, "UseTraceWeighting", ()=>UseTraceWeighting);
/**
 * A class for "me:format".
 * The attributes may have the following keys:
 * "representation" (with known value: "Plog")
 * "rateUnits" (with known values: "cm3mole-1s-1", "cm3molecule-1s-1")
 * Values include:
 * "cantera", "chemkin"
 */ parcelHelpers.export(exports, "Format", ()=>Format);
/**
 * A class for "me:precision".
 * Known values include:
 * "d", "dd", "qd", "double", "double-double" or "quad-double"
 */ parcelHelpers.export(exports, "Precision", ()=>Precision);
/**
 * A class for "me:chebNumTemp".
 */ parcelHelpers.export(exports, "ChebNumTemp", ()=>ChebNumTemp);
/**
 * A class for "me:chebNumConc".
 */ parcelHelpers.export(exports, "ChebNumConc", ()=>ChebNumConc);
/**
 * A class for "me:chebMaxTemp".
 */ parcelHelpers.export(exports, "ChebMaxTemp", ()=>ChebMaxTemp);
/**
 * A class for "me:chebMinTemp".
 */ parcelHelpers.export(exports, "ChebMinTemp", ()=>ChebMinTemp);
/**
 * A class for "me:chebMaxConc".
 * Known attributes include:
 * "units" (known values include "atm").
 */ parcelHelpers.export(exports, "ChebMaxConc", ()=>ChebMaxConc);
/**
 * A class for "me:chebMinConc".
 */ parcelHelpers.export(exports, "ChebMinConc", ()=>ChebMinConc);
/**
 * A class for "me:chebTExSize".
 */ parcelHelpers.export(exports, "ChebTExSize", ()=>ChebTExSize);
/**
 * A class for "me:chebPExSize".
 */ parcelHelpers.export(exports, "ChebPExSize", ()=>ChebPExSize);
/**
 * A class for "me:analyticalRepresentation" CalcMethod.
 * Expected to have attributes:
 * "xsi_type" with the value "me:analyticalRepresentation".
 * Nodes:
 * "me:format"
 * If the "me:format" attribute "representation" is "Plog" then the following nodes are expected:
 * "me:plogNumTemp"
 * "me:plogMaxTemp"
 * "me:plogMinTemp"
 * "me:plogConcs" which may have multiple "me:plogConc" values.
 * If the "me:format" attribute "representation" is not specified, then the following nodes are expected:
 * "me:precision"
 * "me:chebNumTemp"
 * "me:chebNumConc"
 * "me:chebMaxTemp"
 * "me:chebMinTemp"
 * "me:chebMaxConc"
 * "me:chebMinConc"
 * "me:chebTExSize"
 * "me:chebPExSize"
 */ parcelHelpers.export(exports, "CalcMethodAnalyticalRepresentation", ()=>CalcMethodAnalyticalRepresentation);
/**
 * A class for "me:Tmin" CalcMethod.
 */ parcelHelpers.export(exports, "Tmin", ()=>Tmin);
/**
 * A class for "me:Tmid" CalcMethod.
 */ parcelHelpers.export(exports, "Tmid", ()=>Tmid);
/**
 * A class for "me:Tmax" CalcMethod.
 */ parcelHelpers.export(exports, "Tmax", ()=>Tmax);
/**
 * A class for "me:Tstep" CalcMethod.
 */ parcelHelpers.export(exports, "Tstep", ()=>Tstep);
/**
 * A class for "me:ThermodynamicTable" CalcMethod.
 * Expected to have attributes:
 * "xsi_type" with the value "me:ThermodynamicTable";
 * "units" with known values "kJ/mol".
 * Nodes:
 * "me:Tmin", "me:Tmid", "me:Tmax", "me:Tstep".
 */ parcelHelpers.export(exports, "CalcMethodThermodynamicTable", ()=>CalcMethodThermodynamicTable);
/**
 * A class for "me:sensitivityAnalysisSamples".
 */ parcelHelpers.export(exports, "SensitivityAnalysisSamples", ()=>SensitivityAnalysisSamples);
/**
 * A class for "me:sensitivityAnalysisOrder".
 */ parcelHelpers.export(exports, "SensitivityAnalysisOrder", ()=>SensitivityAnalysisOrder);
/**
 * A class for "me:sensitivityNumVarRedIters".
 */ parcelHelpers.export(exports, "SensitivityNumVarRedIters", ()=>SensitivityNumVarRedIters);
/**
 * A class for "sensitivityVarRedMethod".
 */ parcelHelpers.export(exports, "SensitivityVarRedMethod", ()=>SensitivityVarRedMethod);
/**
 * A class for "me:sensitivityAnalysis".
 * Nodes:
 * "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters", "me:sensitivityVarRedMethod".
 */ parcelHelpers.export(exports, "CalcMethodSensitivityAnalysis", ()=>CalcMethodSensitivityAnalysis);
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
class CalcMethod extends (0, _xml.NodeWithNodes) {
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
            "sensitivityAnalysis",
            "me:simpleCalc",
            "me:gridSearch",
            "me:fitting",
            "me:marquardt",
            "me:analyticalRepresentation",
            "me:ThermodynamicTable",
            "me:sensitivityAnalysis"
        ];
    }
    /**
     * @param value The value.
     */ constructor(attributes){
        super(attributes, CalcMethod.tagName);
    }
}
class CalcMethodSimpleCalc extends CalcMethod {
    static{
        /**
     * The xsi_type.
     */ this.xsi_type = "me:simpleCalc";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "simpleCalc";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class CalcMethodGridSearch extends CalcMethod {
    static{
        /**
    * The xsi_type.
    */ this.xsi_type = "me:gridSearch";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "gridSearch";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class FittingIterations extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:fittingIterations";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, FittingIterations.tagName, value);
    }
}
class CalcMethodFitting extends CalcMethod {
    static{
        /**
     * The xsi_type.
     */ this.xsi_type = "me:fitting";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "fitting";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, fittingIterations){
        super(attributes);
        if (fittingIterations != undefined) this.addNode(fittingIterations);
    }
    /**
     * @returns The fittingIterations or undefined.
     */ getFittingIterations() {
        return this.nodes.get(0);
    }
    /**
     * @param fittingIterations The fittingIterations.
     */ setFittingIterations(fittingIterations) {
        this.nodes.set(0, fittingIterations);
    }
    /**
     * Remove the fittingIterations.
     */ removeFittingIterations() {
        this.nodes.delete(0);
    }
}
class MarquardtIterations extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtIterations";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, MarquardtIterations.tagName, value);
    }
}
class MarquardtTolerance extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtTolerance";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, MarquardtTolerance.tagName, value);
    }
}
class MarquardtDerivDelta extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtDerivDelta";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, MarquardtDerivDelta.tagName, value);
    }
}
class CalcMethodMarquardt extends CalcMethod {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:marquardt";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "marquardt";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, marquardtIterations, marquardtTolerance, marquardtDerivDelta){
        super(attributes);
        this.index = new Map();
        if (marquardtIterations != undefined) {
            this.index.set(MarquardtIterations.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
        if (marquardtTolerance != undefined) {
            this.index.set(MarquardtTolerance.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
        if (marquardtDerivDelta != undefined) {
            this.index.set(MarquardtDerivDelta.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }
    /**
     * @returns The marquardtIterations or undefined.
     */ getMarquardtIterations() {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtIterations The marquardtIterations.
     */ setMarquardtIterations(marquardtIterations) {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) this.nodes.set(i, marquardtIterations);
        else {
            this.index.set(MarquardtIterations.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
    }
    /**
     * Remove the marquardtIterations.
     */ removeMarquardtIterations() {
        let i = this.index.get(MarquardtIterations.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MarquardtIterations.tagName);
        }
    }
    /**
     * @returns The marquardtTolerance or undefined.
     */ getMarquardtTolerance() {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtTolerance The marquardtTolerance.
     */ setMarquardtTolerance(marquardtTolerance) {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) this.nodes.set(i, marquardtTolerance);
        else {
            this.index.set(MarquardtTolerance.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
    }
    /**
     * Remove the marquardtTolerance.
     */ removeMarquardtTolerance() {
        let i = this.index.get(MarquardtTolerance.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MarquardtTolerance.tagName);
        }
    }
    /**
     * @returns The marquardtDerivDelta or undefined.
     */ getMarquardtDerivDelta() {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtDerivDelta The marquardtDerivDelta.
     */ setMarquardtDerivDelta(marquardtDerivDelta) {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) this.nodes.set(i, marquardtDerivDelta);
        else {
            this.index.set(MarquardtDerivDelta.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }
    /**
     * Remove the marquardtDerivDelta.
     */ removeMarquardtDerivDelta() {
        let i = this.index.get(MarquardtDerivDelta.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(MarquardtDerivDelta.tagName);
        }
    }
}
class UseTraceWeighting extends (0, _xml.Tag) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:useTraceWeighting";
    }
    constructor(){
        super(UseTraceWeighting.tagName);
    }
}
class Format extends (0, _xml.StringNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:format";
    }
    static{
        /**
     * The options.
     */ this.options = [
            "cantera",
            "chemkin"
        ];
    }
    static{
        /**
     * The rateUnits.
     */ this.rateUnits = "rateUnits";
    }
    static{
        /**
     * The rateUnits options.
     */ this.rateUnitsOptions = [
            "cm3mole-1s-1",
            "cm3molecule-1s-1"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Format.tagName, value);
    }
    /**
     * @returns The value of the "rateUnits" attribute or undefined.
     */ getRateUnits() {
        return this.attributes.get(Format.rateUnits);
    }
    /**
     * @param rateUnits The value of the "rateUnits" attribute.
     */ setRateUnits(rateUnits) {
        this.attributes.set(Format.rateUnits, rateUnits);
    }
    /**
     * Remove the "rateUnits" attribute.
     */ removeRateUnits() {
        this.attributes.delete(Format.rateUnits);
    }
}
class Precision extends (0, _xml.StringNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:precision";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Precision.tagName, value);
    }
}
class ChebNumTemp extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebNumTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebNumTemp.tagName, value);
    }
}
class ChebNumConc extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebNumConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebNumConc.tagName, value);
    }
}
class ChebMaxTemp extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMaxTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebMaxTemp.tagName, value);
    }
}
class ChebMinTemp extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMinTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebMinTemp.tagName, value);
    }
}
class ChebMaxConc extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMaxConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebMaxConc.tagName, value);
    }
    /**
     * @returns The units.
     */ getUnits() {
        return this.attributes.get("units");
    }
    /**
     * @param units The units.
     */ setUnits(units) {
        this.attributes.set("units", units);
    }
}
class ChebMinConc extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMinConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebMinConc.tagName, value);
    }
}
class ChebTExSize extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebTExSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebTExSize.tagName, value);
    }
}
class ChebPExSize extends (0, _xml.NumberNode) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebPExSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, ChebPExSize.tagName, value);
    }
}
class CalcMethodAnalyticalRepresentation extends CalcMethod {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:analyticalRepresentation";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "analyticalRepresentation";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, format, precision, chebNumTemp, chebNumConc, chebMaxTemp, chebMinTemp, chebMaxConc, chebMinConc, chebTExSize, chebPExSize){
        super(attributes);
        this.index = new Map();
        if (format != undefined) {
            this.index.set(Format.tagName, this.nodes.size);
            this.addNode(format);
        }
        if (precision != undefined) {
            this.index.set(Precision.tagName, this.nodes.size);
            this.addNode(precision);
        }
        if (chebNumTemp != undefined) {
            this.index.set(ChebNumTemp.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
        if (chebNumConc != undefined) {
            this.index.set(ChebNumConc.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
        if (chebMaxTemp != undefined) {
            this.index.set(ChebMaxTemp.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
        if (chebMinTemp != undefined) {
            this.index.set(ChebMinTemp.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
        if (chebMaxConc != undefined) {
            this.index.set(ChebMaxConc.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
        if (chebMinConc != undefined) {
            this.index.set(ChebMinConc.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
        if (chebTExSize != undefined) {
            this.index.set(ChebTExSize.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
        if (chebPExSize != undefined) {
            this.index.set(ChebPExSize.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }
    /**
     * @returns The format or undefined.
     */ getFormat() {
        let i = this.index.get(Format.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param format The format.
     */ setFormat(format) {
        let i = this.index.get(Format.tagName);
        if (i != undefined) this.nodes.set(i, format);
        else {
            this.index.set(Format.tagName, this.nodes.size);
            this.addNode(format);
        }
    }
    /**
     * Remove the format.
     */ removeFormat() {
        let i = this.index.get(Format.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Format.tagName);
        }
    }
    /**
     * @returns The precision or undefined.
     */ getPrecision() {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param precision The precision.
     */ setPrecision(precision) {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) this.nodes.set(i, precision);
        else {
            this.index.set(Precision.tagName, this.nodes.size);
            this.addNode(precision);
        }
    }
    /**
     * Remove the precision.
     */ removePrecision() {
        let i = this.index.get(Precision.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Precision.tagName);
        }
    }
    /**
     * @returns The chebNumTemp or undefined.
     */ getChebNumTemp() {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebNumTemp The chebNumTemp.
     */ setChebNumTemp(chebNumTemp) {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) this.nodes.set(i, chebNumTemp);
        else {
            this.index.set(ChebNumTemp.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
    }
    /**
     * Remove the chebNumTemp.
     */ removeChebNumTemp() {
        let i = this.index.get(ChebNumTemp.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebNumTemp.tagName);
        }
    }
    /**
     * @returns The chebNumConc or undefined.
     */ getChebNumConc() {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebNumConc The chebNumConc.
     */ setChebNumConc(chebNumConc) {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) this.nodes.set(i, chebNumConc);
        else {
            this.index.set(ChebNumConc.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
    }
    /**
     * Remove the chebNumConc.
     */ removeChebNumConc() {
        let i = this.index.get(ChebNumConc.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebNumConc.tagName);
        }
    }
    /**
     * @returns The chebMaxTemp or undefined.
     */ getChebMaxTemp() {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMaxTemp The chebMaxTemp.
     */ setChebMaxTemp(chebMaxTemp) {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) this.nodes.set(i, chebMaxTemp);
        else {
            this.index.set(ChebMaxTemp.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
    }
    /**
     * Remove the chebMaxTemp.
     */ removeChebMaxTemp() {
        let i = this.index.get(ChebMaxTemp.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMaxTemp.tagName);
        }
    }
    /**
     * @returns The chebMinTemp or undefined.
     */ getChebMinTemp() {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMinTemp The chebMinTemp.
     */ setChebMinTemp(chebMinTemp) {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) this.nodes.set(i, chebMinTemp);
        else {
            this.index.set(ChebMinTemp.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
    }
    /**
     * Remove the chebMinTemp.
     */ removeChebMinTemp() {
        let i = this.index.get(ChebMinTemp.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMinTemp.tagName);
        }
    }
    /**
     * @returns The chebMaxConc or undefined.
     */ getChebMaxConc() {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMaxConc The chebMaxConc.
     */ setChebMaxConc(chebMaxConc) {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) this.nodes.set(i, chebMaxConc);
        else {
            this.index.set(ChebMaxConc.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
    }
    /**
     * Remove the chebMaxConc.
     */ removeChebMaxConc() {
        let i = this.index.get(ChebMaxConc.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMaxConc.tagName);
        }
    }
    /**
     * @returns The chebMinConc or undefined.
     */ getChebMinConc() {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMinConc The chebMinConc.
     */ setChebMinConc(chebMinConc) {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) this.nodes.set(i, chebMinConc);
        else {
            this.index.set(ChebMinConc.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
    }
    /**
     * Remove the chebMinConc.
     */ removeChebMinConc() {
        let i = this.index.get(ChebMinConc.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebMinConc.tagName);
        }
    }
    /**
     * @returns The chebTExSize or undefined.
     */ getChebTExSize() {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebTExSize The chebTExSize.
     */ setChebTExSize(chebTExSize) {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) this.nodes.set(i, chebTExSize);
        else {
            this.index.set(ChebTExSize.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
    }
    /**
     * Remove the chebTExSize.
     */ removeChebTExSize() {
        let i = this.index.get(ChebTExSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebTExSize.tagName);
        }
    }
    /**
     * @returns The chebPExSize or undefined.
     */ getChebPExSize() {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebPExSize The chebPExSize.
     */ setChebPExSize(chebPExSize) {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) this.nodes.set(i, chebPExSize);
        else {
            this.index.set(ChebPExSize.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }
    /**
     * Remove the chebPExSize.
     */ removeChebPExSize() {
        let i = this.index.get(ChebPExSize.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(ChebPExSize.tagName);
        }
    }
}
class Tmin extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmin";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Tmin.tagName, value);
    }
}
class Tmid extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmid";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Tmid.tagName, value);
    }
}
class Tmax extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmax";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Tmax.tagName, value);
    }
}
class Tstep extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tstep";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Tmin.tagName, value);
    }
}
class CalcMethodThermodynamicTable extends CalcMethod {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:ThermodynamicTable";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "ThermodynamicTable";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, tmin, tmid, tmax, tstep){
        super(attributes);
        this.index = new Map();
        if (tmin != undefined) {
            this.index.set(Tmin.tagName, this.nodes.size);
            this.addNode(tmin);
        }
        if (tmid != undefined) {
            this.index.set(Tmid.tagName, this.nodes.size);
            this.addNode(tmid);
        }
        if (tmax != undefined) {
            this.index.set(Tmax.tagName, this.nodes.size);
            this.addNode(tmax);
        }
        if (tstep != undefined) {
            this.index.set(Tstep.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }
    /**
     * @returns The tmin or undefined.
     */ getTmin() {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmin The tmin.
     */ setTmin(tmin) {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) this.nodes.set(i, tmin);
        else {
            this.index.set(Tmin.tagName, this.nodes.size);
            this.addNode(tmin);
        }
    }
    /**
     * Remove the tmin.
     */ removeTmin() {
        let i = this.index.get(Tmin.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tmin.tagName);
        }
    }
    /**
     * @returns The tmid or undefined.
     */ getTmid() {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmid The tmid.
     */ setTmid(tmid) {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) this.nodes.set(i, tmid);
        else {
            this.index.set(Tmid.tagName, this.nodes.size);
            this.addNode(tmid);
        }
    }
    /**
     * Remove the tmid.
     */ removeTmid() {
        let i = this.index.get(Tmid.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tmid.tagName);
        }
    }
    /**
     * @returns The tmax or undefined.
     */ getTmax() {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmax The tmax.
     */ setTmax(tmax) {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) this.nodes.set(i, tmax);
        else {
            this.index.set(Tmax.tagName, this.nodes.size);
            this.addNode(tmax);
        }
    }
    /**
     * Remove the tmax.
     */ removeTmax() {
        let i = this.index.get(Tmax.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tmax.tagName);
        }
    }
    /**
     * @returns The tstep or undefined.
     */ getTstep() {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tstep The tstep.
     */ setTstep(tstep) {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) this.nodes.set(i, tstep);
        else {
            this.index.set(Tstep.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }
    /**
     * Remove the tstep.
     */ removeTstep() {
        let i = this.index.get(Tstep.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Tstep.tagName);
        }
    }
}
class SensitivityAnalysisSamples extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityAnalysisSamples";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, SensitivityAnalysisSamples.tagName, value);
    }
}
class SensitivityAnalysisOrder extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityAnalysisOrder";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, SensitivityAnalysisOrder.tagName, value);
    }
}
class SensitivityNumVarRedIters extends (0, _xml.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityNumVarRedIters";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, SensitivityNumVarRedIters.tagName, value);
    }
}
class SensitivityVarRedMethod extends (0, _xml.StringNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityVarRedMethod";
    }
    static{
        /**
     * The options.
     */ this.options = [
            "AdditiveControl",
            "RatioControl"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, SensitivityVarRedMethod.tagName, value);
    }
}
class CalcMethodSensitivityAnalysis extends CalcMethod {
    static{
        /**
    * The xsi_type.
    */ this.xsi_type = "me:sensitivityAnalysis";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "sensitivityAnalysis";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, sensitivityAnalysisSamples, sensitivityAnalysisOrder, sensitivityNumVarRedIters, sensitivityVarRedMethod){
        super(attributes);
        this.index = new Map();
        if (sensitivityAnalysisSamples != undefined) {
            this.index.set(SensitivityAnalysisSamples.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
        if (sensitivityAnalysisOrder != undefined) {
            this.index.set(SensitivityAnalysisOrder.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
        if (sensitivityNumVarRedIters != undefined) {
            this.index.set(SensitivityNumVarRedIters.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
        if (sensitivityVarRedMethod != undefined) {
            this.index.set(SensitivityVarRedMethod.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }
    /**
     * @returns The sensitivityAnalysisSamples or undefined.
     */ getSensitivityAnalysisSamples() {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityAnalysisSamples The sensitivityAnalysisSamples.
     */ setSensitivityAnalysisSamples(sensitivityAnalysisSamples) {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityAnalysisSamples);
        else {
            this.index.set(SensitivityAnalysisSamples.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
    }
    /**
     * Remove the sensitivityAnalysisSamples.
     */ removeSensitivityAnalysisSamples() {
        let i = this.index.get(SensitivityAnalysisSamples.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityAnalysisSamples.tagName);
        }
    }
    /**
     * @returns The sensitivityAnalysisOrder or undefined.
     */ getSensitivityAnalysisOrder() {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityAnalysisOrder The sensitivityAnalysisOrder.
     */ setSensitivityAnalysisOrder(sensitivityAnalysisOrder) {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityAnalysisOrder);
        else {
            this.index.set(SensitivityAnalysisOrder.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
    }
    /**
     * Remove the sensitivityAnalysisOrder.
     */ removeSensitivityAnalysisOrder() {
        let i = this.index.get(SensitivityAnalysisOrder.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityAnalysisOrder.tagName);
        }
    }
    /**
     * @returns The sensitivityNumVarRedIters or undefined.
     */ getSensitivityNumVarRedIters() {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityNumVarRedIters The sensitivityNumVarRedIters.
     */ setSensitivityNumVarRedIters(sensitivityNumVarRedIters) {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityNumVarRedIters);
        else {
            this.index.set(SensitivityNumVarRedIters.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
    }
    /**
     * Remove the sensitivityNumVarRedIters.
     */ removeSensitivityNumVarRedIters() {
        let i = this.index.get(SensitivityNumVarRedIters.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityNumVarRedIters.tagName);
        }
    }
    /**
     * @returns The sensitivityVarRedMethod or undefined.
     */ getSensitivityVarRedMethod() {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityVarRedMethod The sensitivityVarRedMethod.
     */ setSensitivityVarRedMethod(sensitivityVarRedMethod) {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityVarRedMethod);
        else {
            this.index.set(SensitivityVarRedMethod.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }
    /**
     * Remove the sensitivityVarRedMethod.
     */ removeSensitivityVarRedMethod() {
        let i = this.index.get(SensitivityVarRedMethod.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(SensitivityVarRedMethod.tagName);
        }
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
     */ constructor(attributes, id){
        super(attributes, Control.tagName);
        this.id = id;
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
 * A class for representing a "controlList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "control" node is a child node of a "me:mesmer" node and there is no "controlList".
 */ parcelHelpers.export(exports, "ControlList", ()=>ControlList);
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
class ControlList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "controlList";
    }
    /**
     * @param attributes The attributes.
     * @param controls The controls.
     */ constructor(attributes, controls){
        super(attributes, ControlList.tagName);
        this.index = new Map();
        if (controls != undefined) controls.forEach((control)=>{
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the control.
     * @returns The control.
     */ getControl(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */ removeControl(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a control.
     * @param control The control.
     */ addControl(control) {
        let index = this.index.get(control.id);
        if (index !== undefined) {
            this.nodes.set(index, control);
            console.log("Replaced control with id " + control.id);
        } else {
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        }
    }
}
class Mesmer extends (0, _xmlJs.NodeWithNodes) {
    static{
        this.tagName = "me:mesmer";
    }
    static{
        /**
     * Precision options.
     */ this.precisionOptions = [
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
     * Pressure units.
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
     * Energy units.
     */ this.energyUnits = [
            "kJ/mol",
            "cm-1",
            "wavenumber",
            "kcal/mol",
            "Hartree",
            "au"
        ];
    }
    static{
        /**
     * Frequency units.
     */ this.frequencyUnits = [
            "cm-1",
            "GHz",
            "amuA^2"
        ];
    }
    static{
        /**
     * Atomic mass map for atoms. The keys are element symbols, the values are the atomic mass according to a periodic table.
     * (This is initialised in the constructor.)
     */ this.atomMasses = new Map();
    }
    static{
        /**
     * Atomic radius map for atoms. The keys are element symbols, the values are the atomic radii according to a periodic table.
     * (This is initialised in the constructor.)
     */ this.atomRadii = new Map();
    }
    static{
        /**
     * Colour map for atoms. The keys are element symbols, the values are the colours the element is assigned.
     * (This is initialised in the constructor.)
     */ this.atomColors = new Map();
    }
    static{
        /**
     * Colour map for bonds. The keys are bond order, the values are the colours the bond order is assigned.
     * (This is initialised in the constructor.)
     */ this.bondColors = new Map();
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
     * @param controls The controls.
     */ constructor(attributes, title, moleculeList, reactionList, conditions, modelParameters, controls){
        super(attributes, Mesmer.tagName);
        let elements = [
            "H",
            "O",
            "C",
            "N",
            "Cl",
            "S",
            "Ph",
            "Fe"
        ];
        let colors = [
            "White",
            "Red",
            "DarkGrey",
            "Blue",
            "Green",
            "Yellow",
            "Orange",
            "Brown"
        ];
        for(let i = 0; i < elements.length; i++)Mesmer.atomColors.set(elements[i], colors[i]);
        // Atomic mass units (amu)
        let masses = [
            1.00784,
            15.999,
            12.011,
            14.007,
            35.453,
            32.06,
            77.845,
            55.845
        ]; // Atomic masses (see https://en.wikipedia.org/wiki/Periodic_table).
        for(let i = 0; i < elements.length; i++)Mesmer.atomMasses.set(elements[i], masses[i]);
        // Picometers (pm),
        let radii = [
            37,
            66,
            67,
            56,
            99,
            102,
            110,
            124
        ]; // Calculated radii between two atoms of the same type in a molecule (https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)).
        for(let i = 0; i < elements.length; i++)Mesmer.atomRadii.set(elements[i], radii[i]);
        let bondOrders = [
            1,
            1.5,
            2,
            2.5,
            3,
            3.5,
            4,
            4.5,
            5,
            5.5,
            6
        ];
        colors = [
            "Black",
            "Red",
            "DarkRed",
            "Blue",
            "DarkBlue",
            "Green",
            "DarkGreen",
            "Yellow",
            "DarkYellow",
            "Orange",
            "DarkOrange"
        ];
        for(let i = 0; i < bondOrders.length; i++)Mesmer.bondColors.set(bondOrders[i], colors[i]);
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
        if (controls != undefined) {
            this.index.set((0, _modelParametersJs.ModelParameters).tagName, this.nodes.size);
            controls.forEach((control)=>{
                this.addNode(control);
            });
        }
    /*
        if (controlList != undefined) {
            this.index.set(ControlList.tagName, this.nodes.size);
            this.addNode(controlList);
        }
        */ }
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
     * @returns The control list.
     */ /*
    getControlList() {
        let i: number | undefined = this.index.get(ControlList.tagName);
        if (i == undefined) {
            return undefined;
        }
        return this.nodes.get(i) as ControlList;
    }
    */ /**
     * Set the control list.
     * @param controlList The control list.
     */ /*
    setControlList(controlList: ControlList) {
        let i: number | undefined = this.index.get(ControlList.tagName);
        if (i != undefined) {
            this.nodes.set(i, controlList);
        } else {
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(controlList);
        }
    }
    */ /**
     * Add a control.
     * @param control The control.
     */ addControl(control) {
        let i = this.index.get((0, _controlJs.Control).tagName + control.id);
        if (i != undefined) this.nodes.set(i, control);
        else {
            this.index.set((0, _controlJs.Control).tagName, this.nodes.size);
            this.addNode(control);
        }
    }
}

},{"./conditions.js":"aksKl","./control.js":"Qx5gu","./modelParameters.js":"kQHfz","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8AHG6","dPB9w"], "dPB9w", "parcelRequire1c89")

//# sourceMappingURL=index.50584fd7.js.map
